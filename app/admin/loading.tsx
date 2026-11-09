import { LoadingSpinner } from "@/components/ui/Feedback";

/** Replaces the storefront skeleton while an admin page loads. */
export default function AdminLoading() {
  return (
    <div role="status" className="grid min-h-[50vh] place-items-center">
      <LoadingSpinner size={28} label="Loading" />
    </div>
  );
}
