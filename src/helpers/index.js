export const formatPrice = (number) => {
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

export const colorSystem = [
  { code: "#ffffff", name: "White" },
  { code: "#000000", name: "Black" },
  { code: "#ff0000", name: "Red" },
  { code: "#00ff00", name: "Lime" },
  { code: "#0000ff", name: "Blue" },
  { code: "#ffff00", name: "Yellow" },
  { code: "#00ffff", name: "Cyan" },
  { code: "#ff00ff", name: "Magenta" },
  { code: "#c0c0c0", name: "Silver" },
  { code: "#808080", name: "Gray" },
  { code: "#800000", name: "Maroon" },
  { code: "#808000", name: "Olive" },
  { code: "#008000", name: "Green" },
  { code: "#800080", name: "Purple" },
  { code: "#008080", name: "Teal" },
  { code: "#000080", name: "Navy" },
];

export const hexToColorName = (hex) => {
  hex = hex.toLowerCase();

  const colors = {
    "#ffffff": "White",
    "#000000": "Black",
    "#ff0000": "Red",
    "#00ff00": "Lime",
    "#0000ff": "Blue",
    "#ffff00": "Yellow",
    "#00ffff": "Cyan",
    "#ff00ff": "Magenta",
    "#c0c0c0": "Silver",
    "#808080": "Gray",
    "#800000": "Maroon",
    "#808000": "Olive",
    "#008000": "Green",
    "#800080": "Purple",
    "#008080": "Teal",
    "#000080": "Navy",
  };

  return colors[hex] || "Unknown Color";
};

export const getSelectColor = (status) => {
  switch (status) {
    case "IN_CART":
      return "lightblue";
    case "PENDING":
      return "orange";
    case "SHIPPING":
      return "yellow";
    case "DELIVERED":
      return "lightgreen";
    case "CANCELLED":
      return "lightcoral";
    default:
      return "white";
  }
};

export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return isoDate ? date.toLocaleDateString("en-GB") : "";
};
