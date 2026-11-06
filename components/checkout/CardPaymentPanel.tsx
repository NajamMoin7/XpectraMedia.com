"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

import { Icon } from "@/components/ui/Icon";

/**
 * Card payment fields powered by the gateway's Collect.js.
 *
 * Card number, expiry and security code are typed into iframes served by the
 * payment gateway, so the values never enter this page, its state or our
 * server. When the order is placed, Collect.js swaps them for a single use
 * payment token, which is the only thing the checkout endpoint receives.
 */

type CollectField = "ccnumber" | "ccexp" | "cvv";

interface CollectResponse {
  token: string;
  card?: { number?: string; type?: string; exp?: string };
}

interface CollectJSApi {
  configure: (config: Record<string, unknown>) => void;
  startPaymentRequest: () => void;
}

declare global {
  interface Window {
    CollectJS?: CollectJSApi;
  }
}

export interface CardToken {
  token: string;
  cardMasked: string;
  cardType: string;
}

/** Handle the checkout form uses to request a token on submit. */
export interface CardTokenizer {
  requestToken: () => Promise<CardToken>;
}

export class CardEntryError extends Error {}

const FIELDS: { id: CollectField; label: string; placeholder: string; wide?: boolean }[] = [
  { id: "ccnumber", label: "Card Number", placeholder: "0000 0000 0000 0000", wide: true },
  { id: "ccexp", label: "Expiration Date", placeholder: "MM / YY" },
  { id: "cvv", label: "Security Code", placeholder: "CVV" },
];

/** Styles applied inside the gateway iframes, matched to the site inputs. */
const IFRAME_CSS = {
  "font-family": "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  "font-size": "14px",
  color: "#0b1220",
  "background-color": "transparent",
  border: "0",
  outline: "none",
  padding: "0",
  height: "44px",
  width: "100%",
};

interface CardPaymentPanelProps {
  /** Public tokenization key. Safe to expose, it can only create tokens. */
  tokenizationKey: string;
  collectJsUrl: string;
  selected: boolean;
  onSelect: () => void;
  /** Amount shown to wallets and fraud tools, in dollars. */
  amount: number;
  tokenizerRef: RefObject<CardTokenizer | null>;
}

export function CardPaymentPanel({
  tokenizationKey,
  collectJsUrl,
  selected,
  onSelect,
  amount,
  tokenizerRef,
}: CardPaymentPanelProps) {
  const enabled = Boolean(tokenizationKey && collectJsUrl);
  const [ready, setReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<CollectField, string>>>({});

  const pending = useRef<{ resolve: (t: CardToken) => void; reject: (e: Error) => void } | null>(null);
  const fieldValid = useRef<Partial<Record<CollectField, boolean>>>({});
  const configured = useRef(false);
  const amountRef = useRef(amount);
  useEffect(() => {
    amountRef.current = amount;
  }, [amount]);

  const configure = useCallback(() => {
    const collect = window.CollectJS;
    if (!collect || configured.current) return;
    configured.current = true;

    collect.configure({
      variant: "inline",
      styleSniffer: false,
      customCss: IFRAME_CSS,
      placeholderCss: { color: "#8b95a5" },
      invalidCss: { color: "#d9343f" },
      validCss: { color: "#0b1220" },
      focusCss: { color: "#0b1220" },
      price: amountRef.current.toFixed(2),
      currency: "USD",
      country: "US",
      fields: Object.fromEntries(
        FIELDS.map((field) => [
          field.id,
          {
            selector: `#checkout-${field.id}`,
            title: field.label,
            placeholder: field.placeholder,
            ...(field.id === "cvv" ? { display: "show" } : {}),
          },
        ]),
      ),
      fieldsAvailableCallback: () => setReady(true),
      validationCallback: (field: CollectField, valid: boolean, message: string) => {
        fieldValid.current[field] = valid;
        setFieldErrors((current) => ({ ...current, [field]: valid ? undefined : message }));
      },
      timeoutDuration: 15000,
      timeoutCallback: () => {
        pending.current?.reject(
          new CardEntryError("Please check your card number, expiry date and security code."),
        );
        pending.current = null;
      },
      callback: (response: CollectResponse) => {
        pending.current?.resolve({
          token: response.token,
          cardMasked: response.card?.number ?? "",
          cardType: response.card?.type ?? "",
        });
        pending.current = null;
      },
    });
  }, []);

  // Returning to checkout remounts the panel with fresh refs, and Script's
  // onReady fires again for the already loaded script, so the new field
  // containers are configured each visit.
  useEffect(() => {
    tokenizerRef.current = {
      requestToken: () =>
        new Promise<CardToken>((resolve, reject) => {
          const collect = window.CollectJS;
          if (!enabled || !collect || !ready) {
            reject(new CardEntryError("Card payment is still loading. Please wait a moment and try again."));
            return;
          }
          pending.current = { resolve, reject };
          collect.startPaymentRequest();
        }),
    };
    return () => {
      tokenizerRef.current = null;
    };
  }, [enabled, ready, tokenizerRef]);

  return (
    <div className="mt-4">
      {enabled ? (
        <Script
          id="collect-js"
          src={collectJsUrl}
          data-tokenization-key={tokenizationKey}
          data-variant="inline"
          strategy="afterInteractive"
          onReady={configure}
          onError={() => setLoadFailed(true)}
        />
      ) : null}

      <label
        htmlFor="checkout-payment-card"
        className={`flex items-start gap-4 rounded-2xl border p-5 transition-colors ${
          !enabled
            ? "cursor-not-allowed border-line bg-mist"
            : selected
              ? "cursor-pointer border-brand/45 bg-brand-tint ring-2 ring-brand/20"
              : "cursor-pointer border-line bg-canvas hover:border-brand/40"
        }`}
      >
        <input
          id="checkout-payment-card"
          type="radio"
          name="paymentMethod"
          value="Credit or Debit Card"
          checked={selected}
          onChange={onSelect}
          disabled={!enabled}
          className="mt-1 h-4 w-4 shrink-0 accent-[#0d7ff2]"
        />
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <Icon name="lock" size={18} className="text-brand-deep" />
            <span className="font-display text-base font-semibold text-ink">
              Credit or Debit Card
            </span>
            {selected ? (
              <span className="rounded-full bg-brand px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-white">
                Selected
              </span>
            ) : null}
          </span>
          <span className="mt-2 block text-sm leading-relaxed text-slate">
            {enabled
              ? "Pay securely now with Visa, Mastercard, American Express or Discover. Card details are encrypted by our payment processor and never stored on our site."
              : "Card payment is currently unavailable. Please select Cash on Delivery to place your order."}
          </span>
        </span>
      </label>

      {/* Kept mounted so the gateway iframes survive switching methods. */}
      <fieldset
        hidden={!selected || !enabled}
        className="mt-4 rounded-2xl border border-line bg-canvas p-5 sm:p-6"
      >
        <legend className="px-2 font-display text-sm font-semibold text-ink">Card Details</legend>

        {loadFailed ? (
          <p role="alert" className="mb-4 rounded-2xl border border-sale/40 bg-sale/5 px-4 py-3 text-sm text-sale">
            The secure card form could not be loaded. Please check your connection, disable
            any content blockers for this page, or choose Cash on Delivery.
          </p>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          {FIELDS.map((field) => (
            <div key={field.id} className={field.wide ? "sm:col-span-2" : undefined}>
              <span id={`checkout-${field.id}-label`} className="mb-2 block text-sm font-medium text-ink">
                {field.label}
              </span>
              <div
                id={`checkout-${field.id}`}
                aria-labelledby={`checkout-${field.id}-label`}
                className={`relative h-[46px] w-full overflow-hidden rounded-2xl border bg-canvas px-4 ${
                  fieldErrors[field.id] ? "border-sale" : "border-line"
                }`}
              >
                {ready ? null : (
                  <span className="absolute inset-0 flex items-center px-4 text-sm text-muted/70">
                    {field.placeholder}
                  </span>
                )}
              </div>
              {fieldErrors[field.id] ? (
                <p role="alert" className="animate-fade-up mt-2 text-xs font-medium text-sale">
                  {fieldErrors[field.id]}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <p className="mt-5 flex items-start gap-2.5 rounded-2xl border border-line bg-mist px-4 py-3 text-xs leading-relaxed text-slate">
          <Icon name="shield" size={16} className="mt-0.5 shrink-0 text-brand" />
          <span>
            Your card is charged only when you place the order. The billing address used for
            verification is the shipping address entered above.
          </span>
        </p>
      </fieldset>
    </div>
  );
}
