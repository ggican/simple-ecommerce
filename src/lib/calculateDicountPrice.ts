export function calculateDiscountedPrice(
  originalPrice: number,
  discountPercentage: number,
) {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  return originalPrice - discountAmount;
}
