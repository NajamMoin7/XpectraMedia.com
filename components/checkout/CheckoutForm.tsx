"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { OrderSummary } from "@/components/cart/OrderSummary";
import { Button } from "@/components/ui/Button";
import { EmptyState, LoadingSpinner, Skeleton } from "@/components/ui/Feedback";
import { Icon } from "@/components/ui/Icon";
import { useCart } from "@/lib/cart-context";
import { generateOrderNumber } from "@/lib/format";
import { STATES, STORAGE_KEYS, site } from "@/lib/site";
import type { OrderDetails } from "@/lib/types";

/** Accepts the common address shapes without being needlessly strict. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/** Five digit ZIP, optionally followed by the four digit extension. */
const ZIP_PATTERN = /^\d{5}(-\d{4})?$/;

/** Minimum number of digits accepted for a United States phone number. */
const MIN_PHONE_DIGITS = 10;

/** Minimum characters required so a carrier can actually find the address. */
const MIN_STREET_LENGTH = 5;

/** The store only ships within the United States. */
const LOCKED_COUNTRY = "United States";

type FieldName =
  | "fullName"
  | "email"
  | "phone"
  | "altPhone"
  | "street"
  | "apartment"
  | "city"
  | "state"
  | "zipCode"
  | "country"
  | "notes";

type FormValues = Record<FieldName, string>;

type FormErrors = Partial<Record<FieldName, string>>;

/** Focus order used when jumping to the first field that needs attention. */
const FIELD_ORDER: FieldName[] = [
  "fullName",
  "email",
  "phone",
  "altPhone",
  "street",
  "apartment",
  "city",
  "state",
  "zipCode",
  "country",
  "notes",
];

const EMPTY_VALUES: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  altPhone: "",
  street: "",
  apartment: "",
  city: "",
  state: "",
  zipCode: "",
  country: LOCKED_COUNTRY,
  notes: "",
};

/** Counts only the digits so spaces, parentheses and plus signs are ignored. */
function countDigits(value: string): number {
  return (value.match(/\d/g) ?? []).length;
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  const fullName = values.fullName.trim();
  if (!fullName) {
    errors.fullName = "Please enter your full name.";
  } else if (fullName.length < 3) {
    errors.fullName = "Please enter at least three characters.";
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address, for example name@example.com";
  }

  const phone = values.phone.trim();
  if (!phone) {
    errors.phone = "Please enter your phone number.";
  } else if (countDigits(phone) < MIN_PHONE_DIGITS) {
    errors.phone = `Please enter a complete phone number with at least ${MIN_PHONE_DIGITS} digits.`;
  }

  const altPhone = values.altPhone.trim();
  if (altPhone && countDigits(altPhone) < MIN_PHONE_DIGITS) {
    errors.altPhone = `Please enter a complete phone number with at least ${MIN_PHONE_DIGITS} digits, or leave this field empty.`;
  }

  const street = values.street.trim();
  if (!street) {
    errors.street = "Please enter your street address.";
  } else if (street.length < MIN_STREET_LENGTH) {
    errors.street = `Please include the house number and street name, at least ${MIN_STREET_LENGTH} characters.`;
  }

  if (!values.city.trim()) {
    errors.city = "Please enter your city.";
  }

  if (!values.state) {
    errors.state = "Please choose your state.";
  }

  const zipCode = values.zipCode.trim();
  if (!zipCode) {
    errors.zipCode = "Please enter your ZIP code.";
  } else if (!ZIP_PATTERN.test(zipCode)) {
    errors.zipCode = "Please enter a valid 5 digit ZIP code, for example 94518.";
  }

  return errors;
}

const FIELD_BASE =
  "w-full rounded-2xl border bg-canvas px-4 py-3 text-sm text-ink " +
  "placeholder:text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-brand/35";

function fieldClass(hasError: boolean): string {
  return `${FIELD_BASE} ${
    hasError ? "border-sale" : "border-line focus:border-brand"
  }`;
}

const CARD =
  "rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8";
const LABEL = "mb-2 block text-sm font-medium text-ink";
const HINT = "mt-2 text-xs text-muted";
const ERROR = "animate-fade-up mt-2 text-xs font-medium text-sale";

/**
 * Single page checkout. There is no backend, so the order is validated in the
 * browser, saved to localStorage and then read back by the confirmation page.
 */
export function CheckoutForm() {
  const router = useRouter();
  const { items, hydrated, subtotal, delivery, total, clearCart } = useCart();

  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [placing, setPlacing] = useState(false);

  function update(field: FieldName, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    // Once a submit has been tried, keep the field feedback live as they type.
    if (attempted) {
      const found = validate(next);
      setErrors((current) => ({ ...current, [field]: found[field] }));
    }
  }

  function onBlur(field: FieldName) {
    if (!attempted) return;
    const found = validate(values);
    setErrors((current) => ({ ...current, [field]: found[field] }));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (placing) return;

    setAttempted(true);
    const found = validate(values);
    setErrors(found);

    const firstInvalid = FIELD_ORDER.find((field) => found[field]);
    if (firstInvalid) {
      document.getElementById(`checkout-${firstInvalid}`)?.focus();
      return;
    }

    if (items.length === 0) return;

    setPlacing(true);

    const order: OrderDetails = {
      orderNumber: generateOrderNumber(),
      placedAt: new Date().toISOString(),
      fullName: values.fullName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      altPhone: values.altPhone.trim(),
      street: values.street.trim(),
      apartment: values.apartment.trim(),
      city: values.city.trim(),
      state: values.state,
      zipCode: values.zipCode.trim(),
      country: LOCKED_COUNTRY,
      notes: values.notes.trim(),
      items,
      subtotal,
      shipping: delivery,
      total,
      paymentMethod: "Cash on Delivery",
    };

    // Short delay so the processing state reads as a genuine action.
    window.setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEYS.lastOrder, JSON.stringify(order));
      } catch {
        // Storage can be unavailable in private browsing. The confirmation
        // page shows its own friendly fallback when nothing was stored.
      }
      clearCart();
      router.push("/order-confirmation");
    }, 900);
  }

  if (!hydrated) {
    return (
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
        <div className={`space-y-4 ${CARD}`}>
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-12 w-full rounded-2xl" />
          <Skeleton className="h-12 w-full rounded-2xl" />
          <Skeleton className="h-12 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
        </div>
        <div className="space-y-4 rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)]">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
    );
  }

  // While an order is being placed the cart has already been cleared, so the
  // empty state is suppressed until the confirmation route takes over.
  if (items.length === 0 && !placing) {
    return (
      <EmptyState
        icon="cart"
        title="There is nothing to check out"
        description="Your cart is empty, so there is no order to place yet. Browse the collections, add the pieces you like, then come back to complete your shipping details."
        action={{ label: "Browse Products", href: "/products" }}
        secondaryAction={{ label: "View Cart", href: "/cart" }}
      />
    );
  }

  const hasErrors = FIELD_ORDER.some((field) => errors[field]);

  const placeOrderContent = placing ? (
    <>
      <LoadingSpinner size={18} label="Placing your order" />
      Placing Order
    </>
  ) : (
    <>
      Place Order
      <Icon name="arrowRight" size={16} />
    </>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
      <form id="checkout-form" onSubmit={onSubmit} noValidate>
        {/* Contact details */}
        <section aria-labelledby="checkout-contact-heading" className={CARD}>
          <h2
            id="checkout-contact-heading"
            className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl"
          >
            Contact Details
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            We use these details to confirm your order and to share tracking
            updates once your package ships.
          </p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="checkout-fullName" className={LABEL}>
                Full Name
              </label>
              <input
                id="checkout-fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                value={values.fullName}
                onChange={(event) => update("fullName", event.target.value)}
                onBlur={() => onBlur("fullName")}
                placeholder="Jordan Ellis"
                aria-invalid={errors.fullName ? true : undefined}
                aria-describedby={errors.fullName ? "checkout-fullName-error" : undefined}
                className={fieldClass(Boolean(errors.fullName))}
              />
              {errors.fullName ? (
                <p id="checkout-fullName-error" role="alert" className={ERROR}>
                  {errors.fullName}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="checkout-email" className={LABEL}>
                Email Address
              </label>
              <input
                id="checkout-email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(event) => update("email", event.target.value)}
                onBlur={() => onBlur("email")}
                placeholder="name@example.com"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={
                  errors.email ? "checkout-email-error" : "checkout-email-hint"
                }
                className={fieldClass(Boolean(errors.email))}
              />
              {errors.email ? (
                <p id="checkout-email-error" role="alert" className={ERROR}>
                  {errors.email}
                </p>
              ) : (
                <p id="checkout-email-hint" className={HINT}>
                  Your order confirmation is sent here.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="checkout-phone" className={LABEL}>
                Phone Number
              </label>
              <input
                id="checkout-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={(event) => update("phone", event.target.value)}
                onBlur={() => onBlur("phone")}
                placeholder="(202) 350 1148"
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={
                  errors.phone ? "checkout-phone-error" : "checkout-phone-hint"
                }
                className={fieldClass(Boolean(errors.phone))}
              />
              {errors.phone ? (
                <p id="checkout-phone-error" role="alert" className={ERROR}>
                  {errors.phone}
                </p>
              ) : (
                <p id="checkout-phone-hint" className={HINT}>
                  The carrier calls this number if they need directions.
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="checkout-altPhone" className={LABEL}>
                Alternative Phone Number{" "}
                <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id="checkout-altPhone"
                name="altPhone"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                value={values.altPhone}
                onChange={(event) => update("altPhone", event.target.value)}
                onBlur={() => onBlur("altPhone")}
                placeholder="(415) 555 0132"
                aria-invalid={errors.altPhone ? true : undefined}
                aria-describedby={
                  errors.altPhone ? "checkout-altPhone-error" : "checkout-altPhone-hint"
                }
                className={fieldClass(Boolean(errors.altPhone))}
              />
              {errors.altPhone ? (
                <p id="checkout-altPhone-error" role="alert" className={ERROR}>
                  {errors.altPhone}
                </p>
              ) : (
                <p id="checkout-altPhone-hint" className={HINT}>
                  A second number helps if your main phone is unreachable on the
                  delivery day.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Shipping address */}
        <section aria-labelledby="checkout-address-heading" className={`mt-6 ${CARD}`}>
          <h2
            id="checkout-address-heading"
            className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl"
          >
            Shipping Address
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            Please give a complete address. Clear details help your package
            arrive on the first attempt.
          </p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="checkout-street" className={LABEL}>
                Street Address
              </label>
              <input
                id="checkout-street"
                name="street"
                type="text"
                autoComplete="address-line1"
                value={values.street}
                onChange={(event) => update("street", event.target.value)}
                onBlur={() => onBlur("street")}
                placeholder="785 Oak Grove Rd"
                aria-invalid={errors.street ? true : undefined}
                aria-describedby={
                  errors.street ? "checkout-street-error" : "checkout-street-hint"
                }
                className={fieldClass(Boolean(errors.street))}
              />
              {errors.street ? (
                <p id="checkout-street-error" role="alert" className={ERROR}>
                  {errors.street}
                </p>
              ) : (
                <p id="checkout-street-hint" className={HINT}>
                  Include the house or building number and the street name.
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="checkout-apartment" className={LABEL}>
                Apartment, Suite or Unit{" "}
                <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id="checkout-apartment"
                name="apartment"
                type="text"
                autoComplete="address-line2"
                value={values.apartment}
                onChange={(event) => update("apartment", event.target.value)}
                placeholder="Ste E2 #1207"
                className={fieldClass(false)}
              />
            </div>

            <div>
              <label htmlFor="checkout-city" className={LABEL}>
                City
              </label>
              <input
                id="checkout-city"
                name="city"
                type="text"
                autoComplete="address-level2"
                value={values.city}
                onChange={(event) => update("city", event.target.value)}
                onBlur={() => onBlur("city")}
                placeholder="Concord"
                aria-invalid={errors.city ? true : undefined}
                aria-describedby={errors.city ? "checkout-city-error" : undefined}
                className={fieldClass(Boolean(errors.city))}
              />
              {errors.city ? (
                <p id="checkout-city-error" role="alert" className={ERROR}>
                  {errors.city}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="checkout-state" className={LABEL}>
                State
              </label>
              <select
                id="checkout-state"
                name="state"
                autoComplete="address-level1"
                value={values.state}
                onChange={(event) => update("state", event.target.value)}
                onBlur={() => onBlur("state")}
                aria-invalid={errors.state ? true : undefined}
                aria-describedby={errors.state ? "checkout-state-error" : undefined}
                className={fieldClass(Boolean(errors.state))}
              >
                <option value="">Choose your state</option>
                {STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state ? (
                <p id="checkout-state-error" role="alert" className={ERROR}>
                  {errors.state}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="checkout-zipCode" className={LABEL}>
                ZIP Code
              </label>
              <input
                id="checkout-zipCode"
                name="zipCode"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                value={values.zipCode}
                onChange={(event) => update("zipCode", event.target.value)}
                onBlur={() => onBlur("zipCode")}
                placeholder="94518"
                aria-invalid={errors.zipCode ? true : undefined}
                aria-describedby={errors.zipCode ? "checkout-zipCode-error" : undefined}
                className={fieldClass(Boolean(errors.zipCode))}
              />
              {errors.zipCode ? (
                <p id="checkout-zipCode-error" role="alert" className={ERROR}>
                  {errors.zipCode}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="checkout-country" className={LABEL}>
                Country
              </label>
              <input
                id="checkout-country"
                name="country"
                type="text"
                value={LOCKED_COUNTRY}
                readOnly
                aria-describedby="checkout-country-hint"
                className={`${fieldClass(false)} cursor-not-allowed bg-mist text-slate`}
              />
              <p id="checkout-country-hint" className={HINT}>
                We currently ship within the United States only.
              </p>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="checkout-notes" className={LABEL}>
                Order Notes{" "}
                <span className="font-normal text-muted">(optional)</span>
              </label>
              <textarea
                id="checkout-notes"
                name="notes"
                rows={4}
                value={values.notes}
                onChange={(event) => update("notes", event.target.value)}
                placeholder="Anything our packing team should know, such as gift wrapping or a preferred delivery window."
                className={`${fieldClass(false)} resize-y leading-relaxed`}
              />
            </div>
          </div>
        </section>

        {/* Payment method */}
        <section aria-labelledby="checkout-payment-heading" className={`mt-6 ${CARD}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2
              id="checkout-payment-heading"
              className="font-display text-lg font-bold tracking-tight text-ink sm:text-xl"
            >
              Payment Method
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
              <Icon name="lock" size={14} />
              Secure Checkout
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            Xpectra Media accepts one payment method, so there is nothing to set
            up and no card details to enter.
          </p>

          <div role="radiogroup" aria-label="Payment method" className="mt-6">
            <label
              htmlFor="checkout-payment-cod"
              className="flex cursor-default items-start gap-4 rounded-2xl border border-brand/45 bg-brand-tint p-5 ring-2 ring-brand/20"
            >
              <input
                id="checkout-payment-cod"
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked
                readOnly
                className="mt-1 h-4 w-4 shrink-0 accent-[#0d7ff2]"
              />
              <span>
                <span className="flex flex-wrap items-center gap-2">
                  <Icon name="wallet" size={18} className="text-brand-deep" />
                  <span className="font-display text-base font-semibold text-ink">
                    Cash on Delivery
                  </span>
                  <span className="rounded-full bg-brand px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-white">
                    Selected
                  </span>
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-slate">
                  You pay when the order is delivered to your door. Nothing is
                  charged now, and you can check the package before you hand
                  over the payment.
                </span>
              </span>
            </label>
          </div>

          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            <li className="flex items-start gap-2.5 text-xs leading-relaxed text-slate">
              <Icon name="shield" size={15} className="mt-0.5 shrink-0 text-brand" />
              No advance transfer and no card details are ever requested.
            </li>
            <li className="flex items-start gap-2.5 text-xs leading-relaxed text-slate">
              <Icon name="refresh" size={15} className="mt-0.5 shrink-0 text-brand" />
              Easy returns within 30 days of delivery.
            </li>
          </ul>
        </section>

        {/* Customer support */}
        <section
          aria-labelledby="checkout-support-heading"
          className="mt-6 rounded-3xl border border-line bg-mist p-6 sm:p-7"
        >
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-card text-brand">
              <Icon name="headset" size={20} />
            </span>
            <div>
              <h2
                id="checkout-support-heading"
                className="font-display text-base font-semibold text-ink"
              >
                Need a hand before you order?
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-slate">
                Our support team is happy to help with sizing, shipping or
                anything else.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <a
                  href={site.contact.phoneHref}
                  className="inline-flex items-center gap-2 font-semibold text-brand transition-colors hover:text-brand-deep"
                >
                  <Icon name="phone" size={15} />
                  {site.contact.phone}
                </a>
                <a
                  href={site.contact.emailHref}
                  className="inline-flex items-center gap-2 font-semibold text-brand transition-colors hover:text-brand-deep"
                >
                  <Icon name="mail" size={15} />
                  {site.contact.email}
                </a>
              </div>
            </div>
          </div>
        </section>

        {attempted && hasErrors ? (
          <p
            role="alert"
            className="animate-fade-up mt-6 flex items-start gap-2.5 rounded-2xl border border-sale/40 bg-sale/5 px-4 py-3 text-sm leading-relaxed text-sale"
          >
            <Icon name="close" size={16} className="mt-0.5 shrink-0" />
            Some details still need your attention. Please check the fields
            marked above and try again.
          </p>
        ) : null}

        {/* Mobile action, the summary carries the desktop action */}
        <div className="mt-6 lg:hidden">
          <Button type="submit" size="lg" fullWidth disabled={placing}>
            {placeOrderContent}
          </Button>
        </div>
      </form>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <OrderSummary
          items={items}
          subtotal={subtotal}
          shipping={delivery}
          total={total}
          showItems
        >
          <div className="hidden lg:block">
            <Button
              type="submit"
              form="checkout-form"
              size="lg"
              fullWidth
              disabled={placing}
            >
              {placeOrderContent}
            </Button>
          </div>
          <p className="mt-4 text-center text-xs leading-relaxed text-muted lg:mt-0 lg:pt-4">
            By placing this order you agree to our terms and conditions. You pay
            only when the package reaches you.
          </p>
        </OrderSummary>
      </div>
    </div>
  );
}
