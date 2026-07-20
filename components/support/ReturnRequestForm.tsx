"use client";

import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { RETURN_WINDOW_DAYS, site } from "@/lib/site";

/** Accepts the common address shapes without being needlessly strict. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/** Largest image we will preview locally, in bytes. */
const MAX_FILE_BYTES = 5 * 1024 * 1024;

const REASONS = [
  "Wrong size received",
  "Wrong product received",
  "Product does not fit",
  "Product arrived damaged",
  "Product is faulty",
  "Missing item from the order",
  "Product is not as described",
  "Changed my mind",
  "Other reason",
] as const;

type FieldName =
  | "name"
  | "email"
  | "phone"
  | "orderNumber"
  | "productName"
  | "reason"
  | "solution";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  orderNumber: string;
  productName: string;
  reason: string;
  solution: string;
  details: string;
}

const EMPTY: FormValues = {
  name: "",
  email: "",
  phone: "",
  orderNumber: "",
  productName: "",
  reason: "",
  solution: "",
  details: "",
};

interface PickedImage {
  key: string;
  name: string;
  size: number;
}

/** Human readable file size such as "1.4 MB". */
function readableSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Frontend simulation of a return request. Nothing is sent anywhere: the
 * entries are validated in the browser, the confirmation is rendered locally
 * and any images picked are only read for their name and size.
 */
export function ReturnRequestForm() {
  const baseId = useId();
  const formRef = useRef<HTMLFormElement | null>(null);

  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [images, setImages] = useState<PickedImage[]>([]);
  const [fileNotice, setFileNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<string | null>(null);

  const fieldId = (name: string) => `${baseId}-${name}`;
  const errorId = (name: string) => `${baseId}-${name}-error`;

  function update(name: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!(name in current)) return current;
      const next = { ...current };
      delete next[name as FieldName];
      return next;
    });
  }

  function validate(current: FormValues) {
    const found: Partial<Record<FieldName, string>> = {};

    if (!current.name.trim()) {
      found.name = "Please enter your full name.";
    }

    const email = current.email.trim();
    if (!email) {
      found.email = "Please enter your email address.";
    } else if (!EMAIL_PATTERN.test(email)) {
      found.email = "Please enter a valid email address, for example name@example.com";
    }

    const phoneDigits = current.phone.replace(/\D/g, "");
    if (!current.phone.trim()) {
      found.phone = "Please enter your phone number.";
    } else if (phoneDigits.length < 10) {
      found.phone = "Please enter a phone number with at least 10 digits.";
    }

    if (!current.orderNumber.trim()) {
      found.orderNumber = "Please enter the order number from your confirmation.";
    }

    if (!current.productName.trim()) {
      found.productName = "Please enter the name of the product you are returning.";
    }

    if (!current.reason) {
      found.reason = "Please choose a reason for the return.";
    }

    if (!current.solution) {
      found.solution = "Please choose whether you would like a refund or a replacement.";
    }

    return found;
  }

  function onFilesChange(event: ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(event.target.files ?? []);
    if (picked.length === 0) return;

    const accepted: PickedImage[] = [];
    const rejected: string[] = [];

    picked.forEach((file, index) => {
      if (!file.type.startsWith("image/")) {
        rejected.push(`${file.name} is not an image file`);
        return;
      }
      if (file.size > MAX_FILE_BYTES) {
        rejected.push(`${file.name} is larger than 5 MB`);
        return;
      }
      accepted.push({
        key: `${file.name}-${file.size}-${file.lastModified}-${index}`,
        name: file.name,
        size: file.size,
      });
    });

    setImages(accepted);
    setFileNotice(
      rejected.length > 0
        ? `We could not accept the following: ${rejected.join(", ")}. Please choose image files under 5 MB.`
        : null,
    );
  }

  function clearImages() {
    setImages([]);
    setFileNotice(null);
    if (formRef.current) {
      const input = formRef.current.elements.namedItem("photos");
      if (input instanceof HTMLInputElement) input.value = "";
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);

    const firstInvalid = (
      [
        "name",
        "email",
        "phone",
        "orderNumber",
        "productName",
        "reason",
        "solution",
      ] as FieldName[]
    ).find((name) => found[name]);

    if (firstInvalid) {
      const target = formRef.current?.querySelector<HTMLElement>(
        firstInvalid === "solution"
          ? `#${CSS.escape(fieldId("solution-refund"))}`
          : `#${CSS.escape(fieldId(firstInvalid))}`,
      );
      target?.focus();
      return;
    }

    const orderNumber = values.orderNumber.trim();
    setBusy(true);
    // Short delay so the busy state reads as a genuine action.
    setTimeout(() => {
      setBusy(false);
      setSubmittedOrder(orderNumber);
    }, 700);
  }

  function startAnother() {
    setValues(EMPTY);
    setErrors({});
    setImages([]);
    setFileNotice(null);
    setSubmittedOrder(null);
  }

  const inputClass = (invalid: boolean) =>
    `h-12 w-full rounded-2xl border bg-canvas px-4 text-sm text-ink placeholder:text-muted transition-all duration-200 focus:outline-none focus:ring-2 ${
      invalid
        ? "border-sale focus:border-sale focus:ring-sale/25"
        : "border-line focus:border-brand focus:ring-brand/30"
    }`;

  const labelClass = "mb-2 block text-sm font-semibold text-ink";

  if (submittedOrder) {
    return (
      <div
        role="status"
        className="animate-scale-in rounded-3xl border border-brand/30 bg-card p-8 text-center shadow-[var(--shadow-lift)]"
      >
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-tint text-brand">
          <Icon name="checkCircle" size={30} />
        </span>
        <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-ink">
          Return request received
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate">
          Thank you. We have logged a return request for order{" "}
          <span className="font-semibold text-brand">{submittedOrder}</span>. Our
          customer support team reviews every request in the order it arrives and
          will reply within one business day with an approval decision and, if
          approved, the return address.
        </p>

        <div className="mx-auto mt-7 max-w-xl rounded-2xl border border-line bg-mist p-5 text-left">
          <p className="font-display text-sm font-semibold text-ink">
            While you wait
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {[
              "Keep the product unused and unwashed with its original tags attached.",
              "Keep the original packaging so the product can travel safely.",
              "Do not ship anything back until your return has been approved.",
              `Remember that returns must be requested within ${RETURN_WINDOW_DAYS} days of delivery.`,
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <Icon name="check" size={16} className="mt-0.5 shrink-0 text-brand" />
                <span className="text-sm leading-relaxed text-slate">{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted">
          This request was prepared in your browser as part of our frontend
          demonstration store. Nothing has been uploaded or sent. To raise a real
          return, please contact our team at{" "}
          <a
            href={site.contact.emailHref}
            className="font-semibold text-brand underline-offset-4 hover:underline"
          >
            {site.contact.email}
          </a>{" "}
          or call{" "}
          <a
            href={site.contact.phoneHref}
            className="font-semibold text-brand underline-offset-4 hover:underline"
          >
            {site.contact.phone}
          </a>
          .
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button type="button" onClick={startAnother} size="lg">
            <Icon name="refresh" size={18} />
            Submit Another Request
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Contact Support
            <Icon name="arrowRight" size={16} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-line bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
    >
      <div className="flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
          <Icon name="refresh" size={20} />
        </span>
        <div>
          <h3 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
            Start a return request
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate">
            Fill in the details below and our support team will review your
            request. Fields marked required must be completed.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        {/* Full name */}
        <div>
          <label htmlFor={fieldId("name")} className={labelClass}>
            Full Name <span className="text-sale">required</span>
          </label>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Your full name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? errorId("name") : undefined}
            className={inputClass(Boolean(errors.name))}
          />
          {errors.name ? (
            <p id={errorId("name")} role="alert" className="mt-2 text-xs font-medium text-sale">
              {errors.name}
            </p>
          ) : null}
        </div>

        {/* Email */}
        <div>
          <label htmlFor={fieldId("email")} className={labelClass}>
            Email Address <span className="text-sale">required</span>
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="name@example.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? errorId("email") : undefined}
            className={inputClass(Boolean(errors.email))}
          />
          {errors.email ? (
            <p id={errorId("email")} role="alert" className="mt-2 text-xs font-medium text-sale">
              {errors.email}
            </p>
          ) : null}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor={fieldId("phone")} className={labelClass}>
            Phone Number <span className="text-sale">required</span>
          </label>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="10 digit contact number"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? errorId("phone") : undefined}
            className={inputClass(Boolean(errors.phone))}
          />
          {errors.phone ? (
            <p id={errorId("phone")} role="alert" className="mt-2 text-xs font-medium text-sale">
              {errors.phone}
            </p>
          ) : null}
        </div>

        {/* Order number */}
        <div>
          <label htmlFor={fieldId("orderNumber")} className={labelClass}>
            Order Number <span className="text-sale">required</span>
          </label>
          <input
            id={fieldId("orderNumber")}
            name="orderNumber"
            type="text"
            value={values.orderNumber}
            onChange={(event) => update("orderNumber", event.target.value)}
            placeholder="For example XM4M7Q31K"
            aria-invalid={errors.orderNumber ? true : undefined}
            aria-describedby={errors.orderNumber ? errorId("orderNumber") : undefined}
            className={inputClass(Boolean(errors.orderNumber))}
          />
          {errors.orderNumber ? (
            <p
              id={errorId("orderNumber")}
              role="alert"
              className="mt-2 text-xs font-medium text-sale"
            >
              {errors.orderNumber}
            </p>
          ) : null}
        </div>

        {/* Product name */}
        <div>
          <label htmlFor={fieldId("productName")} className={labelClass}>
            Product Name <span className="text-sale">required</span>
          </label>
          <input
            id={fieldId("productName")}
            name="productName"
            type="text"
            value={values.productName}
            onChange={(event) => update("productName", event.target.value)}
            placeholder="The product you want to return"
            aria-invalid={errors.productName ? true : undefined}
            aria-describedby={errors.productName ? errorId("productName") : undefined}
            className={inputClass(Boolean(errors.productName))}
          />
          {errors.productName ? (
            <p
              id={errorId("productName")}
              role="alert"
              className="mt-2 text-xs font-medium text-sale"
            >
              {errors.productName}
            </p>
          ) : null}
        </div>

        {/* Reason */}
        <div>
          <label htmlFor={fieldId("reason")} className={labelClass}>
            Reason for Return <span className="text-sale">required</span>
          </label>
          <select
            id={fieldId("reason")}
            name="reason"
            value={values.reason}
            onChange={(event) => update("reason", event.target.value)}
            aria-invalid={errors.reason ? true : undefined}
            aria-describedby={errors.reason ? errorId("reason") : undefined}
            className={inputClass(Boolean(errors.reason))}
          >
            <option value="">Please choose a reason</option>
            {REASONS.map((reason) => (
              <option key={reason} value={reason}>
                {reason}
              </option>
            ))}
          </select>
          {errors.reason ? (
            <p id={errorId("reason")} role="alert" className="mt-2 text-xs font-medium text-sale">
              {errors.reason}
            </p>
          ) : null}
        </div>
      </div>

      {/* Preferred solution */}
      <fieldset
        className="mt-6"
        aria-invalid={errors.solution ? true : undefined}
        aria-describedby={errors.solution ? errorId("solution") : undefined}
      >
        <legend className={labelClass}>
          Preferred Solution <span className="text-sale">required</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              value: "Refund",
              id: "solution-refund",
              note: "Money returned once your product passes inspection",
            },
            {
              value: "Replacement",
              id: "solution-replacement",
              note: "The same product sent again, subject to availability",
            },
          ].map((option) => {
            const checked = values.solution === option.value;
            return (
              <label
                key={option.value}
                htmlFor={fieldId(option.id)}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all duration-200 ${
                  checked
                    ? "border-brand bg-brand-tint shadow-[var(--shadow-soft)]"
                    : "border-line bg-canvas hover:border-brand/40"
                }`}
              >
                <input
                  id={fieldId(option.id)}
                  name="solution"
                  type="radio"
                  value={option.value}
                  checked={checked}
                  onChange={(event) => update("solution", event.target.value)}
                  className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-brand)]"
                />
                <span className="min-w-0">
                  <span className="block font-display text-sm font-semibold text-ink">
                    {option.value}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted">
                    {option.note}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
        {errors.solution ? (
          <p id={errorId("solution")} role="alert" className="mt-2 text-xs font-medium text-sale">
            {errors.solution}
          </p>
        ) : null}
      </fieldset>

      {/* Additional details */}
      <div className="mt-6">
        <label htmlFor={fieldId("details")} className={labelClass}>
          Additional Details <span className="font-normal text-muted">optional</span>
        </label>
        <textarea
          id={fieldId("details")}
          name="details"
          rows={5}
          value={values.details}
          onChange={(event) => update("details", event.target.value)}
          placeholder="Tell us more about the problem, including the size and color you received and anything that will help us assess your request."
          className="w-full rounded-2xl border border-line bg-canvas px-4 py-3 text-sm leading-relaxed text-ink placeholder:text-muted transition-all duration-200 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
      </div>

      {/* Image upload */}
      <div className="mt-6 rounded-2xl border border-line bg-mist p-5">
        <label htmlFor={fieldId("photos")} className={labelClass}>
          Image Upload <span className="font-normal text-muted">optional</span>
        </label>
        <p className="mb-3 text-xs leading-relaxed text-slate">
          Photos of the problem help us reach a decision faster. Choose image
          files only, each one under 5 MB. You can select more than one.
        </p>
        <input
          id={fieldId("photos")}
          name="photos"
          type="file"
          accept="image/*"
          multiple
          onChange={onFilesChange}
          aria-describedby={fieldId("photos-note")}
          className="block w-full cursor-pointer rounded-xl border border-line bg-canvas p-3 text-sm text-slate file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-brand-tint file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-deep"
        />

        {fileNotice ? (
          <p role="alert" className="mt-3 text-xs font-medium text-sale">
            {fileNotice}
          </p>
        ) : null}

        {images.length > 0 ? (
          <div className="mt-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                Selected images
              </p>
              <button
                type="button"
                onClick={clearImages}
                className="text-xs font-semibold text-brand underline-offset-4 transition-colors hover:text-brand-deep hover:underline"
              >
                Clear selection
              </button>
            </div>
            <ul className="mt-3 flex flex-col gap-2">
              {images.map((image) => (
                <li
                  key={image.key}
                  className="flex items-center justify-between gap-3 rounded-xl border border-line bg-canvas px-4 py-3"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon name="eye" size={16} className="shrink-0 text-brand" />
                    <span className="truncate text-sm text-ink">{image.name}</span>
                  </span>
                  <span className="shrink-0 text-xs font-semibold text-muted">
                    {readableSize(image.size)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <p
          id={fieldId("photos-note")}
          className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted"
        >
          <Icon name="lock" size={14} className="mt-0.5 shrink-0 text-brand" />
          <span>
            Your images stay in your browser. Only the file name and size are
            read so they can be listed here, and nothing is uploaded anywhere.
          </span>
        </p>
      </div>

      <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted">
          Submitting this form prepares your request in the browser only. Our
          team will reply within one business day.
        </p>
        <Button type="submit" size="lg" disabled={busy} className="sm:shrink-0">
          {busy ? "Sending Request" : "Submit Return Request"}
          {busy ? null : <Icon name="arrowRight" size={16} />}
        </Button>
      </div>
    </form>
  );
}
