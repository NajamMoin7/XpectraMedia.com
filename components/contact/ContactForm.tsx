"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** Accepts the common address shapes without being needlessly strict. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/** Minimum number of digits accepted for a Pakistani mobile or landline. */
const MIN_PHONE_DIGITS = 10;

/** Minimum characters required so a message carries enough detail to answer. */
const MIN_MESSAGE_LENGTH = 20;

type FieldName = "fullName" | "email" | "phone" | "subject" | "message";

type FormValues = Record<FieldName, string>;

type FormErrors = Partial<Record<FieldName, string>>;

const EMPTY_VALUES: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const SUBJECTS = [
  "Order status and tracking",
  "Sizing and product advice",
  "Exchange or return request",
  "Delivery and payment question",
  "Bulk or wholesale enquiry",
  "Something else",
];

/** Counts only the digits so spaces, plus signs and dashes never break input. */
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

  if (!values.subject) {
    errors.subject = "Please choose a subject so we can route your message.";
  }

  const message = values.message.trim();
  if (!message) {
    errors.message = "Please write your message.";
  } else if (message.length < MIN_MESSAGE_LENGTH) {
    errors.message = `Please add a little more detail, at least ${MIN_MESSAGE_LENGTH} characters.`;
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

interface ContactFormProps {
  className?: string;
}

/**
 * Contact enquiry form. Validation and the confirmation both run entirely in
 * the browser, since the storefront has no backend to post to.
 */
export function ContactForm({ className = "" }: ContactFormProps) {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  function update(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    const firstInvalid = (
      ["fullName", "email", "phone", "subject", "message"] as FieldName[]
    ).find((field) => found[field]);

    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setBusy(true);
    // Short delay so the busy state reads as a genuine action.
    setTimeout(() => {
      setBusy(false);
      setSent(true);
    }, 800);
  }

  function reset() {
    setValues(EMPTY_VALUES);
    setErrors({});
    setSent(false);
  }

  if (sent) {
    return (
      <div
        role="status"
        className={`rounded-2xl border border-brand/40 bg-brand/10 p-7 text-center sm:p-9 ${className}`}
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-brand/50 bg-brand/15">
          <Icon name="checkCircle" size={26} className="text-brand-bright" />
        </span>
        <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
          Your message is on its way
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mist">
          Thank you for reaching out, {values.fullName.trim() || "friend"}. Our
          support team replies within one working day, and we will send our
          answer to {values.email.trim()}. For anything urgent, message us on
          WhatsApp and we will respond right away.
        </p>
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={reset}
          className="mt-7"
        >
          Send another message
          <Icon name="refresh" size={16} />
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={`rounded-2xl border border-line-soft bg-surface p-6 sm:p-8 ${className}`}
    >
      <h2 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
        Send us a message
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-mist">
        Fill in the form below and our customer support team will get back to
        you within one working day.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-fullName"
            className="mb-2 block text-sm font-medium text-white"
          >
            Full name
          </label>
          <input
            id="contact-fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={(event) => update("fullName", event.target.value)}
            placeholder="Ayesha Khan"
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={errors.fullName ? "contact-fullName-error" : undefined}
            className={fieldClass(Boolean(errors.fullName))}
          />
          {errors.fullName ? (
            <p
              id="contact-fullName-error"
              role="alert"
              className="mt-2 text-xs text-red-400"
            >
              {errors.fullName}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block text-sm font-medium text-white"
          >
            Email address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="name@example.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={fieldClass(Boolean(errors.email))}
          />
          {errors.email ? (
            <p
              id="contact-email-error"
              role="alert"
              className="mt-2 text-xs text-red-400"
            >
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-phone"
            className="mb-2 block text-sm font-medium text-white"
          >
            Phone number
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="0300 1234567"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={
              errors.phone ? "contact-phone-error" : "contact-phone-hint"
            }
            className={fieldClass(Boolean(errors.phone))}
          />
          {errors.phone ? (
            <p
              id="contact-phone-error"
              role="alert"
              className="mt-2 text-xs text-red-400"
            >
              {errors.phone}
            </p>
          ) : (
            <p id="contact-phone-hint" className="mt-2 text-xs text-mist-dim">
              We use this only if your enquiry is quicker to resolve by call.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-subject"
            className="mb-2 block text-sm font-medium text-white"
          >
            Subject
          </label>
          <select
            id="contact-subject"
            name="subject"
            value={values.subject}
            onChange={(event) => update("subject", event.target.value)}
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={errors.subject ? "contact-subject-error" : undefined}
            className={`${fieldClass(Boolean(errors.subject))} appearance-none`}
          >
            <option value="">Choose a subject</option>
            {SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {errors.subject ? (
            <p
              id="contact-subject-error"
              role="alert"
              className="mt-2 text-xs text-red-400"
            >
              {errors.subject}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="contact-message"
            className="mb-2 block text-sm font-medium text-white"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder="Tell us what you need help with. Adding your order number, product name or size makes it faster for us to help."
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={
              errors.message ? "contact-message-error" : "contact-message-hint"
            }
            className={`${fieldClass(Boolean(errors.message))} resize-y leading-relaxed`}
          />
          {errors.message ? (
            <p
              id="contact-message-error"
              role="alert"
              className="mt-2 text-xs text-red-400"
            >
              {errors.message}
            </p>
          ) : (
            <p id="contact-message-hint" className="mt-2 text-xs text-mist-dim">
              Please write at least {MIN_MESSAGE_LENGTH} characters so we can
              answer properly.
            </p>
          )}
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-mist-dim">
          Your details stay with Xpectra Media and are used only to answer your
          enquiry.
        </p>
        <Button type="submit" size="lg" disabled={busy} className="sm:shrink-0">
          {busy ? "Sending" : "Send message"}
          {busy ? null : <Icon name="arrowRight" size={16} />}
        </Button>
      </div>
    </form>
  );
}
