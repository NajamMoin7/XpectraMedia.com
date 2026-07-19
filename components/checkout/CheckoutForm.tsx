"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { OrderSummary } from "@/components/cart/OrderSummary";
import { Button } from "@/components/ui/Button";
import { EmptyState, LoadingSpinner, Skeleton } from "@/components/ui/Feedback";
import { Icon } from "@/components/ui/Icon";
import { useCart } from "@/lib/cart-context";
import { generateOrderNumber } from "@/lib/format";
import { PROVINCES, STORAGE_KEYS, site } from "@/lib/site";
import type { OrderDetails } from "@/lib/types";

/** Accepts the common address shapes without being needlessly strict. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/** Minimum number of digits accepted for a Pakistani mobile or landline. */
const MIN_PHONE_DIGITS = 10;

/** Minimum characters required so a courier can actually find the address. */
const MIN_ADDRESS_LENGTH = 10;

type FieldName =
  | "fullName"
  | "email"
  | "phone"
  | "altPhone"
  | "province"
  | "city"
  | "address"
  | "landmark"
  | "postalCode"
  | "notes";

type FormValues = Record<FieldName, string>;

type FormErrors = Partial<Record<FieldName, string>>;

/** Focus order used when jumping to the first field that needs attention. */
const FIELD_ORDER: FieldName[] = [
  "fullName",
  "email",
  "phone",
  "altPhone",
  "province",
  "city",
  "address",
  "landmark",
  "postalCode",
  "notes",
];

const EMPTY_VALUES: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  altPhone: "",
  province: "",
  city: "",
  address: "",
  landmark: "",
  postalCode: "",
  notes: "",
};

/** Counts only the digits so spaces and plus signs never break the check. */
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

  if (!values.province) {
    errors.province = "Please choose your province.";
  }

  const city = values.city.trim();
  if (!city) {
    errors.city = "Please enter your city.";
  }

  const address = values.address.trim();
  if (!address) {
    errors.address = "Please enter your complete delivery address.";
  } else if (address.length < MIN_ADDRESS_LENGTH) {
    errors.address = `Please add house number, street and area, at least ${MIN_ADDRESS_LENGTH} characters.`;
  }

  return errors;
}

const FIELD_BASE =
  "w-full rounded-2xl border bg-surface px-4 py-3 text-sm text-white " +
  "placeholder:text-mist-dim transition-colors focus:outline-none focus:ring-2 focus:ring-brand/50";

function fieldClass(hasError: boolean): string {
  return `${FIELD_BASE} ${
    hasError ? "border-red-500/70" : "border-line focus:border-brand"
  }`;
}

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
      province: values.province,
      city: values.city.trim(),
      address: values.address.trim(),
      landmark: values.landmark.trim(),
      postalCode: values.postalCode.trim(),
      notes: values.notes.trim(),
      items,
      subtotal,
      delivery,
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
        <div className="space-y-4 rounded-2xl border border-line-soft bg-surface p-6 sm:p-8">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-12 w-full rounded-2xl" />
          <Skeleton className="h-12 w-full rounded-2xl" />
          <Skeleton className="h-12 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-2xl" />
        </div>
        <div className="space-y-4 rounded-2xl border border-line-soft bg-surface p-6">
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
        description="Your cart is empty, so there is no order to place yet. Browse the collections, add the pieces you like, then come back to complete your delivery details."
        action={{ label: "Browse Products", href: "/products" }}
        secondaryAction={{ label: "View Cart", href: "/cart" }}
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
      <form id="checkout-form" onSubmit={onSubmit} noValidate>
        {/* Contact details */}
        <section
          aria-labelledby="checkout-contact-heading"
          className="rounded-2xl border border-line-soft bg-surface p-6 sm:p-8"
        >
          <h2
            id="checkout-contact-heading"
            className="font-display text-lg font-bold tracking-tight text-white sm:text-xl"
          >
            Contact Details
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-mist">
            We use these details to confirm your order and to share the courier
            tracking reference once your parcel is dispatched.
          </p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="checkout-fullName"
                className="mb-2 block text-sm font-medium text-white"
              >
                Full name
              </label>
              <input
                id="checkout-fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                value={values.fullName}
                onChange={(event) => update("fullName", event.target.value)}
                onBlur={() => onBlur("fullName")}
                placeholder="Ayesha Khan"
                aria-invalid={errors.fullName ? true : undefined}
                aria-describedby={errors.fullName ? "checkout-fullName-error" : undefined}
                className={fieldClass(Boolean(errors.fullName))}
              />
              {errors.fullName ? (
                <p
                  id="checkout-fullName-error"
                  role="alert"
                  className="mt-2 text-xs text-red-400"
                >
                  {errors.fullName}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="checkout-email"
                className="mb-2 block text-sm font-medium text-white"
              >
                Email address
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
                <p
                  id="checkout-email-error"
                  role="alert"
                  className="mt-2 text-xs text-red-400"
                >
                  {errors.email}
                </p>
              ) : (
                <p id="checkout-email-hint" className="mt-2 text-xs text-mist-dim">
                  Your order confirmation is sent here.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="checkout-phone"
                className="mb-2 block text-sm font-medium text-white"
              >
                Phone number
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
                placeholder="0300 1234567"
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={
                  errors.phone ? "checkout-phone-error" : "checkout-phone-hint"
                }
                className={fieldClass(Boolean(errors.phone))}
              />
              {errors.phone ? (
                <p
                  id="checkout-phone-error"
                  role="alert"
                  className="mt-2 text-xs text-red-400"
                >
                  {errors.phone}
                </p>
              ) : (
                <p id="checkout-phone-hint" className="mt-2 text-xs text-mist-dim">
                  The courier calls this number before delivery.
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="checkout-altPhone"
                className="mb-2 block text-sm font-medium text-white"
              >
                Alternative phone number{" "}
                <span className="font-normal text-mist-dim">(optional)</span>
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
                placeholder="0321 7654321"
                aria-invalid={errors.altPhone ? true : undefined}
                aria-describedby={
                  errors.altPhone ? "checkout-altPhone-error" : "checkout-altPhone-hint"
                }
                className={fieldClass(Boolean(errors.altPhone))}
              />
              {errors.altPhone ? (
                <p
                  id="checkout-altPhone-error"
                  role="alert"
                  className="mt-2 text-xs text-red-400"
                >
                  {errors.altPhone}
                </p>
              ) : (
                <p id="checkout-altPhone-hint" className="mt-2 text-xs text-mist-dim">
                  A second number helps if your main phone is unreachable on the
                  delivery day.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Delivery address */}
        <section
          aria-labelledby="checkout-address-heading"
          className="mt-6 rounded-2xl border border-line-soft bg-surface p-6 sm:p-8"
        >
          <h2
            id="checkout-address-heading"
            className="font-display text-lg font-bold tracking-tight text-white sm:text-xl"
          >
            Delivery Address
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-mist">
            Please give a complete address. Clear details help our courier reach
            you on the first attempt.
          </p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="checkout-province"
                className="mb-2 block text-sm font-medium text-white"
              >
                Province
              </label>
              <select
                id="checkout-province"
                name="province"
                value={values.province}
                onChange={(event) => update("province", event.target.value)}
                onBlur={() => onBlur("province")}
                aria-invalid={errors.province ? true : undefined}
                aria-describedby={errors.province ? "checkout-province-error" : undefined}
                className={`${fieldClass(Boolean(errors.province))} appearance-none`}
              >
                <option value="">Choose your province</option>
                {PROVINCES.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              {errors.province ? (
                <p
                  id="checkout-province-error"
                  role="alert"
                  className="mt-2 text-xs text-red-400"
                >
                  {errors.province}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="checkout-city"
                className="mb-2 block text-sm font-medium text-white"
              >
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
                placeholder="Lahore"
                aria-invalid={errors.city ? true : undefined}
                aria-describedby={errors.city ? "checkout-city-error" : undefined}
                className={fieldClass(Boolean(errors.city))}
              />
              {errors.city ? (
                <p
                  id="checkout-city-error"
                  role="alert"
                  className="mt-2 text-xs text-red-400"
                >
                  {errors.city}
                </p>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="checkout-address"
                className="mb-2 block text-sm font-medium text-white"
              >
                Complete delivery address
              </label>
              <textarea
                id="checkout-address"
                name="address"
                rows={4}
                autoComplete="street-address"
                value={values.address}
                onChange={(event) => update("address", event.target.value)}
                onBlur={() => onBlur("address")}
                placeholder="House 24, Street 7, Block C, Gulberg III"
                aria-invalid={errors.address ? true : undefined}
                aria-describedby={
                  errors.address ? "checkout-address-error" : "checkout-address-hint"
                }
                className={`${fieldClass(Boolean(errors.address))} resize-y leading-relaxed`}
              />
              {errors.address ? (
                <p
                  id="checkout-address-error"
                  role="alert"
                  className="mt-2 text-xs text-red-400"
                >
                  {errors.address}
                </p>
              ) : (
                <p id="checkout-address-hint" className="mt-2 text-xs text-mist-dim">
                  Include house or flat number, street, block and area.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="checkout-landmark"
                className="mb-2 block text-sm font-medium text-white"
              >
                Nearby landmark{" "}
                <span className="font-normal text-mist-dim">(optional)</span>
              </label>
              <input
                id="checkout-landmark"
                name="landmark"
                type="text"
                value={values.landmark}
                onChange={(event) => update("landmark", event.target.value)}
                placeholder="Opposite Aziz Bhatti Park"
                className={fieldClass(false)}
              />
            </div>

            <div>
              <label
                htmlFor="checkout-postalCode"
                className="mb-2 block text-sm font-medium text-white"
              >
                Postal code{" "}
                <span className="font-normal text-mist-dim">(optional)</span>
              </label>
              <input
                id="checkout-postalCode"
                name="postalCode"
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                value={values.postalCode}
                onChange={(event) => update("postalCode", event.target.value)}
                placeholder="54000"
                className={fieldClass(false)}
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="checkout-notes"
                className="mb-2 block text-sm font-medium text-white"
              >
                Order notes{" "}
                <span className="font-normal text-mist-dim">(optional)</span>
              </label>
              <textarea
                id="checkout-notes"
                name="notes"
                rows={4}
                value={values.notes}
                onChange={(event) => update("notes", event.target.value)}
                placeholder="Anything our packing team should know, such as gift wrapping or a preferred delivery time."
                className={`${fieldClass(false)} resize-y leading-relaxed`}
              />
            </div>
          </div>
        </section>

        {/* Payment method */}
        <section
          aria-labelledby="checkout-payment-heading"
          className="mt-6 rounded-2xl border border-line-soft bg-surface p-6 sm:p-8"
        >
          <h2
            id="checkout-payment-heading"
            className="font-display text-lg font-bold tracking-tight text-white sm:text-xl"
          >
            Payment Method
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-mist">
            Xpectra Media accepts one payment method, so there is nothing to set
            up and no card details to enter.
          </p>

          <div
            role="radiogroup"
            aria-label="Payment method"
            className="mt-6"
          >
            <label
              htmlFor="checkout-payment-cod"
              className="flex cursor-default items-start gap-4 rounded-2xl border border-brand/50 bg-brand/10 p-5 ring-2 ring-brand/30"
            >
              <input
                id="checkout-payment-cod"
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked
                readOnly
                className="mt-1 h-4 w-4 shrink-0 accent-[#1e90ff]"
              />
              <span>
                <span className="flex flex-wrap items-center gap-2">
                  <Icon name="wallet" size={18} className="text-brand-bright" />
                  <span className="font-display text-base font-semibold text-white">
                    Cash on Delivery
                  </span>
                  <span className="rounded-full border border-brand/40 bg-brand/15 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-brand-bright">
                    Selected
                  </span>
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-mist">
                  You pay the courier in cash when your order is delivered to
                  your door. Nothing is charged now, and you can check the parcel
                  before you hand over the payment.
                </span>
              </span>
            </label>
          </div>

          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            <li className="flex items-start gap-2.5 text-xs leading-relaxed text-mist">
              <Icon name="shield" size={15} className="mt-0.5 shrink-0 text-brand" />
              No advance transfer and no card details are ever requested.
            </li>
            <li className="flex items-start gap-2.5 text-xs leading-relaxed text-mist">
              <Icon name="headset" size={15} className="mt-0.5 shrink-0 text-brand" />
              Questions before you order? Call {site.contact.phone}.
            </li>
          </ul>
        </section>

        {attempted && Object.keys(errors).some((field) => errors[field as FieldName]) ? (
          <p
            role="alert"
            className="mt-6 flex items-start gap-2.5 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-red-300"
          >
            <Icon name="close" size={16} className="mt-0.5 shrink-0" />
            Some details still need your attention. Please check the fields
            marked in red above and try again.
          </p>
        ) : null}

        {/* Mobile action, the summary carries the desktop action */}
        <div className="mt-6 lg:hidden">
          <Button type="submit" size="lg" fullWidth disabled={placing}>
            {placing ? (
              <>
                <LoadingSpinner size={18} label="Placing your order" />
                Placing Order
              </>
            ) : (
              <>
                Place Order
                <Icon name="arrowRight" size={16} />
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <OrderSummary
          items={items}
          subtotal={subtotal}
          delivery={delivery}
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
              {placing ? (
                <>
                  <LoadingSpinner size={18} label="Placing your order" />
                  Placing Order
                </>
              ) : (
                <>
                  Place Order
                  <Icon name="arrowRight" size={16} />
                </>
              )}
            </Button>
          </div>
          <p className="mt-4 text-center text-xs leading-relaxed text-mist-dim lg:mt-0 lg:pt-4">
            By placing this order you agree to our terms and conditions. You pay
            only when the parcel reaches you.
          </p>
        </OrderSummary>
      </div>
    </div>
  );
}
