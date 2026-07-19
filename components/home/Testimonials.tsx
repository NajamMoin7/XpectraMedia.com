"use client";

import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/Icon";
import { Rating } from "@/components/ui/Rating";
import { testimonials } from "@/lib/content";

/**
 * Customer testimonial carousel.
 * Advances on a timer, pauses on hover or focus, and can be stepped manually.
 * On large screens three cards are visible at once.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, 5200);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, total]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Viewport. The track is duplicated so advancing never reveals a gap,
          and one step equals one card width at the current breakpoint. */}
      <div className="overflow-hidden">
        <ul
          className="flex transition-transform duration-700 ease-out [--per:1] sm:[--per:2] lg:[--per:3]"
          style={{
            transform: `translateX(calc(${-index} * (100% / var(--per))))`,
          }}
        >
          {[...testimonials, ...testimonials].map((testimonial, position) => (
            <li
              key={`${testimonial.id}-${position}`}
              className="w-full shrink-0 px-2 sm:w-1/2 lg:w-1/3"
              aria-hidden={position >= testimonials.length ? true : undefined}
            >
              <figure className="flex h-full flex-col rounded-2xl border border-line-soft bg-surface p-7 transition-colors duration-300 hover:border-brand/50">
                <Icon name="sparkle" size={22} className="text-brand" />
                <Rating value={testimonial.rating} compact className="mt-4" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-mist">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line-soft pt-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand/15 font-display text-sm font-bold text-brand">
                    {testimonial.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {testimonial.name}
                    </span>
                    <span className="block text-xs text-mist-dim">
                      {testimonial.location}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => setIndex((current) => (current - 1 + total) % total)}
          aria-label="Show previous testimonial"
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-mist transition-all hover:border-brand hover:text-white"
        >
          <Icon name="arrowLeft" size={18} />
        </button>

        <ul className="flex items-center gap-2">
          {testimonials.map((testimonial, dot) => (
            <li key={testimonial.id}>
              <button
                type="button"
                onClick={() => setIndex(dot)}
                aria-label={`Show testimonial ${dot + 1} of ${total}`}
                aria-current={dot === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  dot === index ? "w-7 bg-brand" : "w-2 bg-line hover:bg-mist-dim"
                }`}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setIndex((current) => (current + 1) % total)}
          aria-label="Show next testimonial"
          className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-mist transition-all hover:border-brand hover:text-white"
        >
          <Icon name="arrowRight" size={18} />
        </button>
      </div>
    </div>
  );
}
