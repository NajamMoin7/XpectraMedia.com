"use client";

import { NavLink } from "@/components/ui/NavLink";
import { useSearchParams } from "next/navigation";
import { useMemo, useRef, useState } from "react";

import {
  MAX_SCALE,
  MIN_SCALE,
  ShirtPreview,
  clampTransform,
} from "@/components/custom/ShirtPreview";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { useCart } from "@/lib/cart-context";
import {
  ACCEPTED_UPLOAD_LABEL,
  ACCEPTED_UPLOAD_TYPES,
  CUSTOM_APPROVAL_LABEL,
  CUSTOM_PRODUCT_POLICY,
  DEFAULT_TRANSFORM,
  MAX_UPLOAD_BYTES,
  PRINT_OPTIONS,
  QUANTITY_TIERS,
  SHIRT_COLORS,
  SHIRT_SIZES,
  SHIRT_STYLES,
  priceCustomShirt,
} from "@/lib/custom-shirt";
import { formatPrice } from "@/lib/format";
import { getCustomShirts } from "@/lib/products";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/site";
import type { DesignTransform, PrintOption } from "@/lib/types";

/**
 * The shirt customization tool.
 *
 * Everything happens in the browser. The uploaded file is read with a
 * FileReader into a data URL for the live preview and is never sent to a
 * server. Before the design is written into the cart it is redrawn through a
 * canvas at a much smaller size, because a full resolution data URL would
 * overflow the localStorage quota that backs the cart.
 */

/** Longest edge, in pixels, of the copy of the artwork stored in the cart. */
const STORED_ARTWORK_EDGE = 512;

/** Product photo and identity used for the cart line, per shirt style. */
const STYLE_PRODUCT_SLUG: Record<string, string> = {
  tshirt: "classic-custom-t-shirt",
  polo: "premium-custom-polo-shirt",
  longsleeve: "custom-long-sleeve-shirt",
  sweatshirt: "custom-sweatshirt",
};

const MAX_QUANTITY = 500;

/**
 * Redraws a data URL through a canvas so the long edge is at most
 * STORED_ARTWORK_EDGE pixels, then re exports it as a data URL. JPEG sources
 * stay JPEG, everything else becomes PNG so transparency survives.
 */
function downscaleArtwork(dataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const image = new window.Image();

    image.onload = () => {
      const longEdge = Math.max(image.naturalWidth, image.naturalHeight);
      if (!longEdge) {
        resolve(dataUrl);
        return;
      }

      const ratio = longEdge > STORED_ARTWORK_EDGE ? STORED_ARTWORK_EDGE / longEdge : 1;
      const width = Math.max(1, Math.round(image.naturalWidth * ratio));
      const height = Math.max(1, Math.round(image.naturalHeight * ratio));

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");
      if (!context) {
        resolve(dataUrl);
        return;
      }

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(image, 0, 0, width, height);

      try {
        resolve(
          dataUrl.startsWith("data:image/jpeg")
            ? canvas.toDataURL("image/jpeg", 0.82)
            : canvas.toDataURL("image/png"),
        );
      } catch {
        resolve(dataUrl);
      }
    };

    image.onerror = () => resolve(dataUrl);
    image.src = dataUrl;
  });
}

export function ShirtCustomizer() {
  const searchParams = useSearchParams();
  const { addItem } = useCart();

  const presetStyle = searchParams.get("style");
  const initialStyle = SHIRT_STYLES.some((style) => style.id === presetStyle)
    ? (presetStyle as string)
    : SHIRT_STYLES[0].id;

  const [styleId, setStyleId] = useState(initialStyle);
  const [colorName, setColorName] = useState(SHIRT_COLORS[0].name);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [printOption, setPrintOption] = useState<PrintOption>("front");

  const [artwork, setArtwork] = useState<string | null>(null);
  const [artworkName, setArtworkName] = useState("");
  const [transform, setTransform] = useState<DesignTransform>(DEFAULT_TRANSFORM);
  const [side, setSide] = useState<"front" | "back">("front");

  const [approved, setApproved] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [added, setAdded] = useState(false);
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const style = SHIRT_STYLES.find((item) => item.id === styleId) ?? SHIRT_STYLES[0];
  const color = SHIRT_COLORS.find((item) => item.name === colorName) ?? SHIRT_COLORS[0];
  const print = PRINT_OPTIONS.find((item) => item.id === printOption) ?? PRINT_OPTIONS[0];

  const pricing = useMemo(
    () => priceCustomShirt(styleId, printOption, quantity),
    [styleId, printOption, quantity],
  );

  const product = useMemo(() => {
    const slug = STYLE_PRODUCT_SLUG[styleId] ?? STYLE_PRODUCT_SLUG.tshirt;
    return getCustomShirts().find((item) => item.slug === slug) ?? getCustomShirts()[0];
  }, [styleId]);

  /** Per shirt price after the volume discount, so cart totals stay correct. */
  const discountedUnitPrice =
    Math.round(pricing.unitTotal * ((100 - pricing.discountPercent) / 100) * 100) / 100;

  /* ---------------------------------------------------------------- */
  /* Upload                                                            */
  /* ---------------------------------------------------------------- */

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;

    setUploadError(null);
    setAdded(false);

    if (!ACCEPTED_UPLOAD_TYPES.includes(file.type)) {
      setUploadError(
        `That file type is not supported. Please upload a ${ACCEPTED_UPLOAD_LABEL} image.`,
      );
      return;
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      const limit = Math.round(MAX_UPLOAD_BYTES / (1024 * 1024));
      setUploadError(
        `That file is ${(file.size / (1024 * 1024)).toFixed(1)} MB. Please upload an image under ${limit} MB.`,
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        setUploadError("We could not read that file. Please try a different image.");
        return;
      }
      setArtwork(result);
      setArtworkName(file.name);
      setTransform(DEFAULT_TRANSFORM);
      setErrors([]);
    };
    reader.onerror = () => {
      setUploadError("We could not read that file. Please try a different image.");
    };
    reader.readAsDataURL(file);
  }

  function removeArtwork() {
    setArtwork(null);
    setArtworkName("");
    setTransform(DEFAULT_TRANSFORM);
    setUploadError(null);
    setAdded(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function resetEverything() {
    setStyleId(initialStyle);
    setColorName(SHIRT_COLORS[0].name);
    setSize("");
    setQuantity(1);
    setPrintOption("front");
    setSide("front");
    setApproved(false);
    setErrors([]);
    removeArtwork();
  }

  /* ---------------------------------------------------------------- */
  /* Design placement controls                                         */
  /* ---------------------------------------------------------------- */

  function nudge(patch: Partial<DesignTransform>) {
    setTransform((current) => clampTransform({ ...current, ...patch }));
    setAdded(false);
  }

  function changePrintOption(next: PrintOption) {
    setPrintOption(next);
    setAdded(false);
    // Keep the preview on a side that actually carries the print.
    if (next === "front") setSide("front");
    if (next === "back") setSide("back");
  }

  /* ---------------------------------------------------------------- */
  /* Validation and add to cart                                        */
  /* ---------------------------------------------------------------- */

  function validate(): string[] {
    const missing: string[] = [];
    if (!artwork) missing.push("Upload a design file before adding this shirt to your cart.");
    if (!styleId) missing.push("Choose a shirt style.");
    if (!colorName) missing.push("Choose a shirt color.");
    if (!size) missing.push("Choose a shirt size.");
    if (!printOption) missing.push("Choose a print placement.");
    if (!quantity || quantity < 1) missing.push("Enter a quantity of at least one shirt.");
    if (!approved) missing.push("Confirm that you have reviewed your design details.");
    return missing;
  }

  async function handleAddToCart() {
    const missing = validate();
    setErrors(missing);
    if (missing.length > 0 || !artwork) return;

    setSaving(true);
    try {
      // Only the downscaled copy is persisted. The full resolution version
      // stays in component state for the on screen preview.
      const storedArtwork = await downscaleArtwork(artwork);

      addItem({
        productId: product.id,
        slug: product.slug,
        name: `Custom ${style.name}`,
        image: product.images[0],
        price: discountedUnitPrice,
        size,
        color: color.name,
        quantity,
        custom: {
          styleId: style.id,
          styleName: style.name,
          colorName: color.name,
          colorHex: color.hex,
          printOption,
          printLabel: print.label,
          artwork: storedArtwork,
          artworkName,
          transform,
          unitPrice: pricing.unitPrice,
          printCharge: pricing.printCharge,
          discountPercent: pricing.discountPercent,
        },
      });

      setAdded(true);
      setErrors([]);
    } finally {
      setSaving(false);
    }
  }

  /* ---------------------------------------------------------------- */
  /* Shared styles                                                     */
  /* ---------------------------------------------------------------- */

  const panel =
    "rounded-3xl border border-line bg-card p-5 shadow-[var(--shadow-soft)] sm:p-6";
  const legend =
    "font-display text-base font-semibold tracking-tight text-ink";
  const controlButton =
    "inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-line-strong bg-canvas px-3 text-xs font-semibold text-slate transition-all duration-200 hover:border-brand hover:text-brand active:scale-95 disabled:cursor-not-allowed disabled:opacity-45";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start">
      {/* ============================================================ */}
      {/* Preview column                                                */}
      {/* ============================================================ */}
      <div className="lg:sticky lg:top-24">
        <ShirtPreview
          styleId={style.id}
          styleName={style.name}
          colorHex={color.hex}
          colorName={color.name}
          artwork={artwork}
          artworkName={artworkName}
          transform={transform}
          onTransformChange={(next) => {
            setTransform(next);
            setAdded(false);
          }}
          printOption={printOption}
          side={side}
          onSideChange={setSide}
          darkShirt={color.dark}
        />
      </div>

      {/* ============================================================ */}
      {/* Controls column                                               */}
      {/* ============================================================ */}
      <div className="flex flex-col gap-6">
        {/* -------------------------------------------------- Upload */}
        <section className={panel}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className={legend}>Step 1. Upload your design</h2>
            <NavLink
              href="/custom-shirts/upload-guidelines"
              className="text-xs font-semibold text-brand transition-colors hover:text-brand-deep"
            >
              Upload guidelines
            </NavLink>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-slate">
            Accepted formats are {ACCEPTED_UPLOAD_LABEL}, up to{" "}
            {Math.round(MAX_UPLOAD_BYTES / (1024 * 1024))} MB. Your file is read in your
            browser only and is never uploaded to a server.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_UPLOAD_TYPES.join(",")}
            onChange={(event) => handleFiles(event.target.files)}
            className="sr-only"
            id="custom-shirt-upload"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              type="button"
              variant="primary"
              onClick={() => fileInputRef.current?.click()}
            >
              <Icon name="plus" size={16} />
              {artwork ? "Replace Design" : "Upload Design"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={removeArtwork}
              disabled={!artwork}
            >
              <Icon name="trash" size={16} />
              Remove Image
            </Button>
            <Button type="button" variant="ghost" onClick={resetEverything}>
              <Icon name="refresh" size={16} />
              Reset Customization
            </Button>
          </div>

          {uploadError ? (
            <p
              role="alert"
              className="animate-fade-up mt-4 flex items-start gap-2 rounded-2xl border border-sale/30 bg-sale/5 px-4 py-3 text-sm font-medium text-sale"
            >
              <Icon name="close" size={15} className="mt-0.5 shrink-0" />
              {uploadError}
            </p>
          ) : null}

          {artwork ? (
            <p className="animate-fade-up mt-4 flex items-center gap-2 rounded-2xl border border-success/30 bg-success/5 px-4 py-3 text-sm font-medium text-success">
              <Icon name="checkCircle" size={15} className="shrink-0" />
              <span className="truncate">
                {artworkName || "Your design"} is loaded and showing on the preview.
              </span>
            </p>
          ) : null}
        </section>

        {/* ------------------------------------------- Shirt options */}
        <section className={panel}>
          <h2 className={legend}>Step 2. Choose your shirt</h2>

          {/* Style */}
          <fieldset className="mt-5">
            <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Shirt Style
            </legend>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {SHIRT_STYLES.map((option) => {
                const active = option.id === styleId;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setStyleId(option.id);
                      setAdded(false);
                    }}
                    aria-pressed={active}
                    className={`rounded-2xl border p-3.5 text-left transition-all duration-300 ${
                      active
                        ? "border-brand bg-brand-tint shadow-[var(--shadow-soft)]"
                        : "border-line bg-canvas hover:border-brand/50 hover:bg-mist"
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span
                        className={`text-sm font-semibold ${active ? "text-brand-deep" : "text-ink"}`}
                      >
                        {option.name}
                      </span>
                      <span className="text-sm font-bold tabular-nums text-ink">
                        {formatPrice(option.price)}
                      </span>
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted">
                      {option.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Color */}
          <fieldset className="mt-6">
            <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Shirt Color
            </legend>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {SHIRT_COLORS.map((option) => {
                const active = option.name === colorName;
                return (
                  <button
                    key={option.name}
                    type="button"
                    onClick={() => {
                      setColorName(option.name);
                      setAdded(false);
                    }}
                    aria-pressed={active}
                    aria-label={`${option.name} shirt`}
                    title={option.name}
                    className={`flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3.5 text-xs font-semibold transition-all duration-300 ${
                      active
                        ? "border-brand bg-brand-tint text-brand-deep"
                        : "border-line bg-canvas text-slate hover:border-brand/50"
                    }`}
                  >
                    <span
                      className="grid h-6 w-6 place-items-center rounded-full border border-line-strong"
                      style={{ backgroundColor: option.hex }}
                    >
                      {active ? (
                        <Icon
                          name="check"
                          size={12}
                          className={option.dark ? "text-white" : "text-ink"}
                        />
                      ) : null}
                    </span>
                    {option.name}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Size */}
          <fieldset className="mt-6">
            <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Shirt Size
            </legend>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {SHIRT_SIZES.map((option) => {
                const active = option === size;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setSize(option);
                      setAdded(false);
                    }}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                      active
                        ? "border-brand bg-brand-tint text-brand-deep"
                        : "border-line bg-canvas text-slate hover:border-brand/50 hover:text-ink"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Print placement */}
          <fieldset className="mt-6">
            <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Print Placement
            </legend>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
              {PRINT_OPTIONS.map((option) => {
                const active = option.id === printOption;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => changePrintOption(option.id)}
                    aria-pressed={active}
                    className={`rounded-2xl border p-3.5 text-left transition-all duration-300 ${
                      active
                        ? "border-brand bg-brand-tint shadow-[var(--shadow-soft)]"
                        : "border-line bg-canvas hover:border-brand/50 hover:bg-mist"
                    }`}
                  >
                    <span
                      className={`block text-sm font-semibold ${active ? "text-brand-deep" : "text-ink"}`}
                    >
                      {option.label}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted">
                      {option.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Quantity */}
          <fieldset className="mt-6">
            <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Quantity
            </legend>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <QuantitySelector
                value={quantity}
                onChange={(next) => {
                  setQuantity(next);
                  setAdded(false);
                }}
                min={1}
                max={MAX_QUANTITY}
                label="Shirt quantity"
              />
              <div className="flex flex-wrap gap-2">
                {[10, 25, 50, 100].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setQuantity(preset);
                      setAdded(false);
                    }}
                    className="rounded-full border border-line bg-canvas px-3 py-1.5 text-xs font-semibold text-slate transition-colors hover:border-brand hover:text-brand"
                  >
                    {preset} shirts
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-2 text-xs text-muted">
              Volume pricing applies automatically from ten shirts upward.
            </p>
          </fieldset>
        </section>

        {/* --------------------------------------- Design placement */}
        <section className={panel}>
          <h2 className={legend}>Step 3. Position your design</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            Drag the artwork on the shirt, or use these controls. Both stay in sync and
            the preview updates as you go.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {/* Move */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Move Design
              </p>
              <div className="mt-3 grid w-fit grid-cols-3 gap-1.5">
                <span />
                <button
                  type="button"
                  onClick={() => nudge({ y: transform.y - 4 })}
                  disabled={!artwork}
                  aria-label="Move design up"
                  className={controlButton}
                >
                  <Icon name="chevronDown" size={15} className="rotate-180" />
                </button>
                <span />
                <button
                  type="button"
                  onClick={() => nudge({ x: transform.x - 4 })}
                  disabled={!artwork}
                  aria-label="Move design left"
                  className={controlButton}
                >
                  <Icon name="arrowLeft" size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => nudge({ x: 0, y: 0 })}
                  disabled={!artwork}
                  aria-label="Center the design"
                  className={controlButton}
                >
                  <Icon name="grid" size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => nudge({ x: transform.x + 4 })}
                  disabled={!artwork}
                  aria-label="Move design right"
                  className={controlButton}
                >
                  <Icon name="arrowRight" size={15} />
                </button>
                <span />
                <button
                  type="button"
                  onClick={() => nudge({ y: transform.y + 4 })}
                  disabled={!artwork}
                  aria-label="Move design down"
                  className={controlButton}
                >
                  <Icon name="chevronDown" size={15} />
                </button>
                <span />
              </div>
            </div>

            {/* Size and rotation */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  Design Size
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => nudge({ scale: transform.scale - 0.1 })}
                    disabled={!artwork || transform.scale <= MIN_SCALE}
                    className={controlButton}
                  >
                    <Icon name="minus" size={14} />
                    Smaller
                  </button>
                  <button
                    type="button"
                    onClick={() => nudge({ scale: transform.scale + 0.1 })}
                    disabled={!artwork || transform.scale >= MAX_SCALE}
                    className={controlButton}
                  >
                    <Icon name="plus" size={14} />
                    Larger
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  Rotation
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => nudge({ rotation: transform.rotation - 15 })}
                    disabled={!artwork}
                    className={controlButton}
                  >
                    <Icon name="refresh" size={14} className="scale-x-[-1]" />
                    Left 15
                  </button>
                  <button
                    type="button"
                    onClick={() => nudge({ rotation: transform.rotation + 15 })}
                    disabled={!artwork}
                    className={controlButton}
                  >
                    <Icon name="refresh" size={14} />
                    Right 15
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setTransform(DEFAULT_TRANSFORM);
                setAdded(false);
              }}
              disabled={!artwork}
            >
              <Icon name="refresh" size={14} />
              Reset Design Position
            </Button>
            <span className="text-xs text-muted">
              Currently at {Math.round(transform.scale * 100)} percent size and{" "}
              {transform.rotation} degrees rotation.
            </span>
          </div>
        </section>

        {/* ------------------------------------------ Pricing panel */}
        <section className={panel}>
          <h2 className={legend}>Live price</h2>

          <dl className="mt-5 flex flex-col gap-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate">Shirt price, {style.name}</dt>
              <dd className="font-semibold tabular-nums text-ink">
                {formatPrice(pricing.unitPrice)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate">Printing charge, {print.label}</dt>
              <dd className="font-semibold tabular-nums text-ink">
                {pricing.printCharge > 0 ? formatPrice(pricing.printCharge) : "Included"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-line pt-3">
              <dt className="text-slate">
                Per shirt total, times {pricing.quantity}
              </dt>
              <dd className="font-semibold tabular-nums text-ink">
                {formatPrice(pricing.unitTotal)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate">
                Quantity discount
                {pricing.discountPercent > 0 ? ` at ${pricing.discountPercent} percent` : ""}
              </dt>
              <dd
                className={`font-semibold tabular-nums ${
                  pricing.discountAmount > 0 ? "text-success" : "text-muted"
                }`}
              >
                {pricing.discountAmount > 0
                  ? `Less ${formatPrice(pricing.discountAmount)}`
                  : "None yet"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-line pt-3">
              <dt className="text-slate">Estimated subtotal</dt>
              <dd className="font-semibold tabular-nums text-ink">
                {formatPrice(pricing.subtotal)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate">Shipping charge</dt>
              <dd
                className={`font-semibold tabular-nums ${
                  pricing.shipping === 0 ? "text-success" : "text-ink"
                }`}
              >
                {pricing.shipping === 0 ? "Free" : formatPrice(pricing.shipping)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 rounded-2xl bg-mist px-4 py-3.5">
              <dt className="font-display text-base font-semibold text-ink">
                Estimated total
              </dt>
              <dd className="font-display text-xl font-bold tabular-nums text-brand">
                {formatPrice(pricing.total)}
              </dd>
            </div>
          </dl>

          <p className="mt-3 text-xs text-muted">
            Standard shipping is free once your subtotal reaches{" "}
            {formatPrice(FREE_SHIPPING_THRESHOLD)}.
          </p>

          {/* Discount tiers */}
          <div className="mt-5 rounded-2xl border border-line bg-mist-2 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Volume Discounts
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {[...QUANTITY_TIERS]
                .sort((a, b) => a.min - b.min)
                .map((tier) => {
                  const active = pricing.discountPercent === tier.percent;
                  return (
                    <li
                      key={tier.min}
                      className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                        active ? "bg-brand-tint text-brand-deep" : "text-slate"
                      }`}
                    >
                      <span className="font-medium">
                        {tier.min} shirts or more
                      </span>
                      <span className="flex items-center gap-1.5 font-semibold tabular-nums">
                        {active ? <Icon name="check" size={14} /> : null}
                        {tier.percent} percent off
                      </span>
                    </li>
                  );
                })}
            </ul>
            <p className="mt-3 text-xs text-muted">
              Ordering for a large team?{" "}
              <NavLink
                href="/custom-shirts/bulk-orders"
                className="font-semibold text-brand hover:text-brand-deep"
              >
                See bulk order details
              </NavLink>
              .
            </p>
          </div>
        </section>

        {/* ----------------------------------- Approval and checkout */}
        <section className={panel}>
          <h2 className={legend}>Step 4. Approve and add to cart</h2>

          <p className="mt-3 rounded-2xl border border-line bg-mist px-4 py-3.5 text-sm leading-relaxed text-slate">
            {CUSTOM_PRODUCT_POLICY}
          </p>

          <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-canvas p-4 transition-colors hover:border-brand/50">
            <input
              type="checkbox"
              checked={approved}
              onChange={(event) => {
                setApproved(event.target.checked);
                setAdded(false);
              }}
              className="mt-0.5 h-5 w-5 shrink-0 accent-brand"
            />
            <span className="text-sm leading-relaxed text-slate">
              {CUSTOM_APPROVAL_LABEL}
            </span>
          </label>

          {errors.length > 0 ? (
            <div
              role="alert"
              className="animate-fade-up mt-4 rounded-2xl border border-sale/30 bg-sale/5 p-4"
            >
              <p className="flex items-center gap-2 text-sm font-semibold text-sale">
                <Icon name="close" size={15} />
                Please finish these steps first
              </p>
              <ul className="mt-2 flex list-disc flex-col gap-1 pl-8 text-sm text-sale">
                {errors.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {added ? (
            <div
              role="status"
              className="animate-fade-up mt-4 rounded-2xl border border-success/30 bg-success/5 p-4"
            >
              <p className="flex items-center gap-2 text-sm font-semibold text-success">
                <Icon name="checkCircle" size={16} />
                Your custom {style.name.toLowerCase()} was added to your cart
              </p>
              <p className="mt-1.5 text-sm text-slate">
                {pricing.quantity} shirt{pricing.quantity === 1 ? "" : "s"} in{" "}
                {color.name}, size {size}, with {print.label.toLowerCase()}.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <Button href="/cart" variant="primary" size="sm">
                  View Cart
                  <Icon name="arrowRight" size={15} />
                </Button>
                <Button href="/checkout" variant="outline" size="sm">
                  Go to Checkout
                </Button>
              </div>
            </div>
          ) : null}

          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            className="mt-5"
            onClick={handleAddToCart}
            disabled={saving}
          >
            <Icon name="cart" size={18} />
            {saving
              ? "Preparing your design"
              : `Add ${pricing.quantity} Custom Shirt${pricing.quantity === 1 ? "" : "s"} to Cart`}
          </Button>

          <p className="mt-3 text-center text-xs text-muted">
            Your artwork stays in your browser. Nothing is uploaded to a server at any
            point.
          </p>
        </section>
      </div>
    </div>
  );
}
