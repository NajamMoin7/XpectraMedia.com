"use client";

import Link from "next/link";
import { useActionState, useMemo, useState } from "react";

import { saveProduct, type FormState } from "@/app/admin/actions";
import { SubmitButton, submitWithoutReset } from "@/components/admin/SubmitButton";
import { BUTTON_OUTLINE, Card, INPUT, LABEL, Notice } from "@/components/admin/ui";
import { categories, subcategories } from "@/lib/categories";
import type { CategorySlug, Product, ProductColor } from "@/lib/types";

const MAX_PHOTOS = 6;

/** Create and edit form for one product. Photos upload as soon as they are picked. */
export function ProductForm({ product }: { product?: Product }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveProduct, {});
  const [category, setCategory] = useState<CategorySlug>(product?.category ?? "men");
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [colors, setColors] = useState<ProductColor[]>(
    product?.colors ?? [{ name: "Black", hex: "#15181d" }],
  );
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const types = useMemo(
    () => subcategories.filter((sub) => sub.categories.includes(category)),
    [category],
  );

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setUploadError(null);
    setUploading(true);
    try {
      for (const file of Array.from(files).slice(0, MAX_PHOTOS - images.length)) {
        const body = new FormData();
        body.append("file", file);
        const response = await fetch("/api/admin/upload", { method: "POST", body });
        const result = (await response.json().catch(() => null)) as
          | { ok: true; url: string }
          | { ok: false; message: string }
          | null;
        if (!result?.ok) {
          setUploadError(result?.message ?? "The photo could not be uploaded.");
          break;
        }
        setImages((current) => [...current, result.url]);
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={submitWithoutReset(action)} className="space-y-6">
      <input type="hidden" name="id" value={product?.id ?? ""} />
      <input type="hidden" name="images" value={JSON.stringify(images)} />
      <input type="hidden" name="colors" value={JSON.stringify(colors)} />

      {state.error ? <Notice tone="error">{state.error}</Notice> : null}

      <Card title="Basic details">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className={LABEL}>
              Product name
            </label>
            <input id="name" name="name" required defaultValue={product?.name} className={INPUT} />
          </div>
          <div>
            <label htmlFor="category" className={LABEL}>
              Category
            </label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(event) => setCategory(event.target.value as CategorySlug)}
              className={INPUT}
            >
              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="subcategory" className={LABEL}>
              Product type
            </label>
            <select
              id="subcategory"
              name="subcategory"
              key={category}
              defaultValue={
                types.some((sub) => sub.slug === product?.subcategory) ? product?.subcategory : types[0]?.slug
              }
              className={INPUT}
            >
              {types.map((sub) => (
                <option key={sub.slug} value={sub.slug}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="slug" className={LABEL}>
              Page address <span className="font-normal text-muted">(optional, made from the name)</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted">/products/</span>
              <input id="slug" name="slug" defaultValue={product?.slug} className={INPUT} />
            </div>
          </div>
        </div>
      </Card>

      <Card title="Price and stock">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="price" className={LABEL}>
              Price ($)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0.01"
              required
              defaultValue={product?.price}
              className={INPUT}
            />
          </div>
          <div>
            <label htmlFor="originalPrice" className={LABEL}>
              Was price ($) <span className="font-normal text-muted">(for a sale)</span>
            </label>
            <input
              id="originalPrice"
              name="originalPrice"
              type="number"
              step="0.01"
              min="0"
              defaultValue={product?.originalPrice}
              className={INPUT}
            />
          </div>
          <div>
            <label htmlFor="stock" className={LABEL}>
              Stock
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              step="1"
              required
              defaultValue={product?.stock ?? 0}
              className={INPUT}
            />
          </div>
        </div>
      </Card>

      <Card title="Photos">
        <p className="mb-3 text-sm text-slate">The first photo is the main one. JPG, PNG or WEBP, under 4 MB.</p>
        {uploadError ? (
          <div className="mb-3">
            <Notice tone="error">{uploadError}</Notice>
          </div>
        ) : null}
        <div className="flex flex-wrap gap-3">
          {images.map((url, index) => (
            <div key={url} className="w-28">
              <div className="relative h-32 w-28 overflow-hidden rounded-xl border border-line bg-mist">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={`Photo ${index + 1}`} className="h-full w-full object-cover" />
                {index === 0 ? (
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-ink/80 px-2 py-0.5 text-[0.65rem] font-semibold text-white">
                    Main
                  </span>
                ) : null}
              </div>
              <div className="mt-1.5 flex justify-between text-xs font-semibold">
                {index > 0 ? (
                  <button
                    type="button"
                    onClick={() => setImages((current) => [url, ...current.filter((item) => item !== url)])}
                    className="text-brand hover:underline"
                  >
                    Make main
                  </button>
                ) : (
                  <span />
                )}
                <button
                  type="button"
                  onClick={() => setImages((current) => current.filter((item) => item !== url))}
                  className="text-sale hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {images.length < MAX_PHOTOS ? (
            <label className="grid h-32 w-28 cursor-pointer place-items-center rounded-xl border-2 border-dashed border-line text-center text-xs font-semibold text-slate hover:border-brand hover:text-brand">
              {uploading ? "Uploading..." : "+ Add photos"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                disabled={uploading}
                className="sr-only"
                onChange={(event) => {
                  void upload(event.target.files);
                  event.target.value = "";
                }}
              />
            </label>
          ) : null}
        </div>
      </Card>

      <Card title="Sizes and colors">
        <div className="space-y-5">
          <div>
            <label htmlFor="sizes" className={LABEL}>
              Sizes <span className="font-normal text-muted">(separate with commas)</span>
            </label>
            <input
              id="sizes"
              name="sizes"
              required
              placeholder="S, M, L, XL"
              defaultValue={product?.sizes.join(", ")}
              className={INPUT}
            />
          </div>
          <div>
            <span className={LABEL}>Colors</span>
            <div className="space-y-2">
              {colors.map((color, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="color"
                    aria-label={`Color ${index + 1} swatch`}
                    value={color.hex}
                    onChange={(event) =>
                      setColors((current) =>
                        current.map((item, i) => (i === index ? { ...item, hex: event.target.value } : item)),
                      )
                    }
                    className="h-10 w-12 cursor-pointer rounded-lg border border-line bg-canvas p-1"
                  />
                  <input
                    aria-label={`Color ${index + 1} name`}
                    value={color.name}
                    placeholder="Color name"
                    onChange={(event) =>
                      setColors((current) =>
                        current.map((item, i) => (i === index ? { ...item, name: event.target.value } : item)),
                      )
                    }
                    className={`${INPUT} max-w-xs`}
                  />
                  {colors.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => setColors((current) => current.filter((_, i) => i !== index))}
                      className="text-sm font-semibold text-sale hover:underline"
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setColors((current) => [...current, { name: "", hex: "#ffffff" }])}
              className="mt-2 text-sm font-semibold text-brand hover:underline"
            >
              + Add color
            </button>
          </div>
        </div>
      </Card>

      <Card title="Description">
        <div className="space-y-4">
          <div>
            <label htmlFor="shortDescription" className={LABEL}>
              Short description
            </label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              rows={2}
              required
              defaultValue={product?.shortDescription}
              className={INPUT}
            />
          </div>
          <div>
            <label htmlFor="detailedDescription" className={LABEL}>
              Full description <span className="font-normal text-muted">(optional)</span>
            </label>
            <textarea
              id="detailedDescription"
              name="detailedDescription"
              rows={5}
              defaultValue={product?.detailedDescription}
              className={INPUT}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="subtitle" className={LABEL}>
                Card subtitle <span className="font-normal text-muted">(optional)</span>
              </label>
              <input id="subtitle" name="subtitle" defaultValue={product?.subtitle} className={INPUT} />
            </div>
            <div>
              <label htmlFor="material" className={LABEL}>
                Material <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id="material"
                name="material"
                placeholder="100% cotton"
                defaultValue={product?.material}
                className={INPUT}
              />
            </div>
            <div>
              <label htmlFor="features" className={LABEL}>
                Features <span className="font-normal text-muted">(one per line)</span>
              </label>
              <textarea
                id="features"
                name="features"
                rows={4}
                defaultValue={product?.features.join("\n")}
                className={INPUT}
              />
            </div>
            <div>
              <label htmlFor="careInstructions" className={LABEL}>
                Care instructions <span className="font-normal text-muted">(one per line)</span>
              </label>
              <textarea
                id="careInstructions"
                name="careInstructions"
                rows={4}
                defaultValue={product?.careInstructions.join("\n")}
                className={INPUT}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card title="Show on the home page">
        <div className="flex flex-wrap gap-6 text-sm text-ink">
          {(
            [
              ["featured", "Featured", product?.featured],
              ["newArrival", "New arrival", product?.newArrival],
              ["bestSeller", "Best seller", product?.bestSeller],
            ] as const
          ).map(([name, label, checked]) => (
            <label key={name} className="flex items-center gap-2">
              <input type="checkbox" name={name} defaultChecked={checked} className="h-4 w-4 accent-[#0d7ff2]" />
              {label}
            </label>
          ))}
        </div>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton pending={pending}>{product ? "Save Changes" : "Create Product"}</SubmitButton>
        <Link href="/admin/products" className={BUTTON_OUTLINE}>
          Cancel
        </Link>
        {product ? (
          <Link
            href={`/products/${product.slug}`}
            target="_blank"
            className="text-sm font-semibold text-slate hover:text-ink"
          >
            View in store
          </Link>
        ) : null}
      </div>
    </form>
  );
}
