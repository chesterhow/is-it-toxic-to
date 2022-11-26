export const isMacLike = /(Mac|iPhone|iPod|iPad)/i.test(
  typeof window !== "undefined" ? window.navigator.userAgent : ""
);
