export const formatPrice = (number) => {
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
