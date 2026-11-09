"use client";

import { useActionState } from "react";

import {
  removeChargeback,
  saveChargeback,
  updateOrderStatus,
  type FormState,
} from "@/app/admin/actions";
import { SubmitButton, submitWithoutReset } from "@/components/admin/SubmitButton";
import { INPUT, LABEL, Notice } from "@/components/admin/ui";
import {
  CHARGEBACK_STATUSES,
  ORDER_STATUSES,
  PAYMENT_STATUSES,
  type Chargeback,
  type OrderStatus,
  type PaymentStatus,
} from "@/lib/types";

export function OrderStatusForm({
  orderNumber,
  status,
  paymentStatus,
}: {
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(updateOrderStatus, {});

  return (
    <form onSubmit={submitWithoutReset(action)} className="space-y-4">
      <input type="hidden" name="orderNumber" value={orderNumber} />
      {state.error ? <Notice tone="error">{state.error}</Notice> : null}
      <div>
        <label htmlFor="status" className={LABEL}>
          Order status
        </label>
        <select id="status" name="status" defaultValue={status} className={INPUT}>
          {ORDER_STATUSES.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="paymentStatus" className={LABEL}>
          Payment status
        </label>
        <select id="paymentStatus" name="paymentStatus" defaultValue={paymentStatus} className={INPUT}>
          {PAYMENT_STATUSES.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <SubmitButton pending={pending}>Update Order</SubmitButton>
    </form>
  );
}

export function ChargebackForm({
  orderNumber,
  total,
  chargeback,
}: {
  orderNumber: string;
  total: number;
  chargeback?: Chargeback;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveChargeback, {});

  return (
    <div className="space-y-4">
      <form onSubmit={submitWithoutReset(action)} className="space-y-4">
        <input type="hidden" name="orderNumber" value={orderNumber} />
        {state.error ? <Notice tone="error">{state.error}</Notice> : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cb-amount" className={LABEL}>
              Amount ($)
            </label>
            <input
              id="cb-amount"
              name="amount"
              type="number"
              step="0.01"
              min="0.01"
              max={total}
              required
              defaultValue={chargeback?.amount ?? total}
              className={INPUT}
            />
          </div>
          <div>
            <label htmlFor="cb-status" className={LABEL}>
              Status
            </label>
            <select id="cb-status" name="status" defaultValue={chargeback?.status ?? "Open"} className={INPUT}>
              {CHARGEBACK_STATUSES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="cb-reason" className={LABEL}>
            Reason from the bank
          </label>
          <input
            id="cb-reason"
            name="reason"
            required
            placeholder="For example: item not received"
            defaultValue={chargeback?.reason}
            className={INPUT}
          />
        </div>
        <div>
          <label htmlFor="cb-notes" className={LABEL}>
            Notes <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea
            id="cb-notes"
            name="notes"
            rows={3}
            placeholder="Evidence sent, case number, deadlines"
            defaultValue={chargeback?.notes}
            className={INPUT}
          />
        </div>
        <SubmitButton pending={pending}>{chargeback ? "Update Chargeback" : "Record Chargeback"}</SubmitButton>
      </form>

      {chargeback ? (
        <form
          action={removeChargeback}
          onSubmit={(event) => {
            if (!window.confirm("Remove this chargeback record?")) event.preventDefault();
          }}
        >
          <input type="hidden" name="orderNumber" value={orderNumber} />
          <button type="submit" className="text-sm font-semibold text-sale hover:underline">
            Remove chargeback record
          </button>
        </form>
      ) : null}
    </div>
  );
}
