/** Fixed messages for ?checkout=… on the plan page (never echo the URL value). */
export const CHECKOUT_NOTICES: Record<
  string,
  { tone: "error" | "success"; text: string }
> = {
  cancelled: {
    tone: "error",
    text: "Checkout was cancelled. You haven't been charged.",
  },
  owned: {
    tone: "success",
    text: "You already own the premium version of this plan.",
  },
  pending: {
    tone: "error",
    text: "A payment for this plan is still processing. Please check back shortly.",
  },
  not_ready: {
    tone: "error",
    text: "This plan isn't ready yet, so it can't be upgraded.",
  },
  unavailable: {
    tone: "error",
    text: "Premium checkout isn't available right now. Please try again later.",
  },
  error: {
    tone: "error",
    text: "We couldn't start checkout. You haven't been charged. Please try again.",
  },
};
