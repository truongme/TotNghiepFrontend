export const WebUrl =
  "https://a009-2001-ee0-8205-3cef-168-3ee2-9329-a8b1.ngrok-free.app";

export const ROLE = {
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
  STAFF: "STAFF",
};

export const OrderStatus = [
  { value: 'IN_CART', name: 'In Cart'},
  { value: 'PENDING', name: 'Pending' },
  { value: 'SHIPPING', name: 'Shipping' },
  { value: 'DELIVERED', name: 'Delivered' },
  { value: 'CANCELLED', name: 'Cancelled' },
]

export const getSelectColor = (status) => {
  switch (status) {
    case 'IN_CART':
      return '#DCE4C9';
    case 'PENDING':
      return '#FA812F';
    case 'SHIPPING':
      return '#C2FFC7';
    case 'DELIVERED':
      return '#4CC9FE';
    case 'CANCELLED':
      return '#F95454';
    default:
      return 'white';
  }
};