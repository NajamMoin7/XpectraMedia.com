"use client";

import {
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { ShirtMockup } from "@/components/custom/ShirtMockup";
import { Icon } from "@/components/ui/Icon";
import { PREVIEW_DISCLAIMER } from "@/lib/custom-shirt";
import type { DesignTransform, PrintOption } from "@/lib/types";

/**
 * Live shirt preview.
 *
 * The mockup, the artwork overlay and the safe print area all render from
 * props, so every change in the customizer repaints instantly with no page
 * refresh. The artwork can be dragged with a pointer or nudged with the
 * button controls in the customizer, and both write to the same transform.
 */

/** Safe print area expressed as a percentage of the mockup stage. */
export const SAFE_AREA = { left: 31, top: 25, width: 38, height: 37 };

/** Artwork scale bounds. 1 fills the width of the safe print area. */
export const MIN_SCALE = 0.3;
export const MAX_SCALE = 2.5;

/** Offsets are a percentage of the print area, measured from its center. */
export const OFFSET_LIMIT = 50;

function clampNumber(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Keeps a transform inside the safe print area and the allowed scale range. */
export function clampTransform(next: DesignTransform): DesignTransform {
  return {
    x: Math.round(clampNumber(next.x, -OFFSET_LIMIT, OFFSET_LIMIT) * 10) / 10,
    y: Math.round(clampNumber(next.y, -OFFSET_LIMIT, OFFSET_LIMIT) * 10) / 10,
    scale: Math.round(clampNumber(next.scale, MIN_SCALE, MAX_SCALE) * 100) / 100,
    rotation: Math.round(((next.rotation % 360) + 360) % 360),
  };
}

interface ShirtPreviewProps {
  styleId: string;
  styleName: string;
  colorHex: string;
  colorName: string;
  /** Full resolution data URL held in component state, never uploaded. */
  artwork: string | null;
  artworkName: string;
  transform: DesignTransform;
  onTransformChange: (next: DesignTransform) => void;
  printOption: PrintOption;
  side: "front" | "back";
  onSideChange: (side: "front" | "back") => void;
  /** True when the shirt color needs light colored guide lines. */
  darkShirt: boolean;
}

const STAGE_ZOOM_MIN = 0.75;
const STAGE_ZOOM_MAX = 1.75;

export function ShirtPreview({
  styleId,
  styleName,
  colorHex,
  colorName,
  artwork,
  artworkName,
  transform,
  onTransformChange,
  printOption,
  side,
  onSideChange,
  darkShirt,
}: ShirtPreviewProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    origin: DesignTransform;
    width: number;
    height: number;
  } | null>(null);

  const [dragging, setDragging] = useState(false);
  const [stageZoom, setStageZoom] = useState(1);

  /** The artwork only appears on the side the customer chose to print. */
  const printsOnThisSide = printOption === "both" || printOption === side;
  const showArtwork = Boolean(artwork) && printsOnThisSide;

  const guideColor = darkShirt ? "rgba(255,255,255,0.62)" : "rgba(13,127,242,0.55)";
  const guideText = darkShirt ? "rgba(255,255,255,0.82)" : "rgba(10,14,21,0.5)";

  /* ---------------------------------------------------------------- */
  /* Pointer dragging                                                  */
  /* ---------------------------------------------------------------- */

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (!showArtwork) return;
    const stage = stageRef.current;
    if (!stage) return;

    const rect = stage.getBoundingClientRect();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: transform,
      width: rect.width,
      height: rect.height,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (drag.width === 0 || drag.height === 0) return;

    // Pixels travelled become a percentage of the stage, then a percentage
    // of the print area, which is the unit the transform is stored in.
    const movedX =
      (((event.clientX - drag.startX) / drag.width) * 100 * 100) / SAFE_AREA.width;
    const movedY =
      (((event.clientY - drag.startY) / drag.height) * 100 * 100) / SAFE_AREA.height;

    onTransformChange(
      clampTransform({
        ...drag.origin,
        x: drag.origin.x + movedX,
        y: drag.origin.y + movedY,
      }),
    );
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    setDragging(false);
  }

  /** Keyboard nudging so the artwork can be placed without a pointer. */
  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (!showArtwork) return;
    const step = event.shiftKey ? 5 : 1.5;
    const moves: Record<string, Partial<DesignTransform>> = {
      ArrowLeft: { x: transform.x - step },
      ArrowRight: { x: transform.x + step },
      ArrowUp: { y: transform.y - step },
      ArrowDown: { y: transform.y + step },
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    onTransformChange(clampTransform({ ...transform, ...move }));
  }

  /* ---------------------------------------------------------------- */
  /* Derived layout                                                    */
  /* ---------------------------------------------------------------- */

  const centerX = SAFE_AREA.left + SAFE_AREA.width / 2;
  const centerY = SAFE_AREA.top + SAFE_AREA.height / 2;
  const artLeft = centerX + (transform.x / 100) * SAFE_AREA.width;
  const artTop = centerY + (transform.y / 100) * SAFE_AREA.height;
  const artWidth = SAFE_AREA.width * transform.scale;

  return (
    <div className="flex flex-col gap-4">
      {/* Side tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Preview side"
          className="inline-flex rounded-full border border-line bg-mist p-1"
        >
          {(["front", "back"] as const).map((value) => {
            const active = side === value;
            return (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onSideChange(value)}
                className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition-all duration-300 ${
                  active
                    ? "bg-canvas text-brand shadow-[var(--shadow-soft)]"
                    : "text-slate hover:text-ink"
                }`}
              >
                {value === "front" ? "Front View" : "Back View"}
              </button>
            );
          })}
        </div>

        {/* Zoom controls */}
        <div className="inline-flex items-center gap-1 rounded-full border border-line bg-canvas p-1 shadow-[var(--shadow-soft)]">
          <button
            type="button"
            onClick={() =>
              setStageZoom((current) =>
                Math.max(STAGE_ZOOM_MIN, Math.round((current - 0.15) * 100) / 100),
              )
            }
            disabled={stageZoom <= STAGE_ZOOM_MIN}
            aria-label="Zoom out of the preview"
            className="grid h-9 w-9 place-items-center rounded-full text-slate transition-colors hover:bg-brand-tint hover:text-brand disabled:opacity-40"
          >
            <Icon name="minus" size={16} />
          </button>
          <span className="w-12 text-center text-xs font-semibold tabular-nums text-ink">
            {Math.round(stageZoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() =>
              setStageZoom((current) =>
                Math.min(STAGE_ZOOM_MAX, Math.round((current + 0.15) * 100) / 100),
              )
            }
            disabled={stageZoom >= STAGE_ZOOM_MAX}
            aria-label="Zoom into the preview"
            className="grid h-9 w-9 place-items-center rounded-full text-slate transition-colors hover:bg-brand-tint hover:text-brand disabled:opacity-40"
          >
            <Icon name="plus" size={16} />
          </button>
          <button
            type="button"
            onClick={() => setStageZoom(1)}
            aria-label="Reset the preview view"
            className="grid h-9 w-9 place-items-center rounded-full text-slate transition-colors hover:bg-brand-tint hover:text-brand"
          >
            <Icon name="refresh" size={16} />
          </button>
        </div>
      </div>

      {/* Stage */}
      <div className="relative overflow-hidden rounded-3xl border border-line bg-mist p-4 sm:p-6">
        <div
          aria-hidden="true"
          className="brand-wash pointer-events-none absolute inset-0"
        />

        <div className="relative mx-auto w-full max-w-[430px]">
          <div
            ref={stageRef}
            className="relative aspect-[520/660] w-full transition-transform duration-300 ease-out"
            style={{ transform: `scale(${stageZoom})` }}
          >
            <ShirtMockup
              styleId={styleId}
              color={colorHex}
              side={side}
              className="absolute inset-0 h-full w-full"
            />

            {/* Safe print area guide */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute rounded-lg transition-all duration-300"
              style={{
                left: `${SAFE_AREA.left}%`,
                top: `${SAFE_AREA.top}%`,
                width: `${SAFE_AREA.width}%`,
                height: `${SAFE_AREA.height}%`,
                border: `1.5px dashed ${guideColor}`,
              }}
            >
              <span
                className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap text-[0.55rem] font-semibold uppercase tracking-[0.16em]"
                style={{ color: guideText }}
              >
                Safe Print Area
              </span>
            </div>

            {/* Uploaded artwork */}
            {showArtwork && artwork ? (
              <div
                role="button"
                tabIndex={0}
                aria-label="Drag to move your design inside the safe print area"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onKeyDown={handleKeyDown}
                className={`absolute select-none rounded-sm outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-brand ${
                  dragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                style={{
                  left: `${artLeft}%`,
                  top: `${artTop}%`,
                  width: `${artWidth}%`,
                  transform: `translate(-50%, -50%) rotate(${transform.rotation}deg)`,
                  touchAction: "none",
                  transition: dragging ? "none" : "left 120ms ease-out, top 120ms ease-out, width 160ms ease-out, transform 160ms ease-out",
                }}
              >
                {/* A data URL never benefits from the image optimizer */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={artwork}
                  alt={artworkName ? `Your uploaded design, ${artworkName}` : "Your uploaded design"}
                  draggable={false}
                  className="pointer-events-none block w-full select-none"
                />
              </div>
            ) : null}
          </div>
        </div>

        {/* Empty and placement helper text */}
        <p className="relative mt-3 text-center text-xs font-medium text-muted">
          {artwork
            ? printsOnThisSide
              ? "Drag your design on the shirt to reposition it, or use the placement controls."
              : `Your design prints on the ${printOption === "front" ? "front" : "back"} only, so this side stays blank.`
            : "Upload a design to see it appear on the shirt instantly."}
        </p>
      </div>

      {/* Summary strip */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-line bg-canvas px-4 py-3 text-xs font-medium text-slate">
        <span>
          Style <span className="font-semibold text-ink">{styleName}</span>
        </span>
        <span>
          Color <span className="font-semibold text-ink">{colorName}</span>
        </span>
        <span>
          Size <span className="font-semibold text-ink">{Math.round(transform.scale * 100)}%</span>
        </span>
        <span>
          Rotation <span className="font-semibold text-ink">{transform.rotation} degrees</span>
        </span>
      </div>

      <p className="flex items-start gap-2 text-xs leading-relaxed text-muted">
        <Icon name="shield" size={14} className="mt-0.5 shrink-0 text-brand" />
        {PREVIEW_DISCLAIMER}
      </p>
    </div>
  );
}
