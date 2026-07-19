import { PageLoader } from "@/components/ui/Feedback";

/** Fallback navigation indicator for routes without their own skeleton. */
export default function Loading() {
  return <PageLoader label="Loading page" />;
}
