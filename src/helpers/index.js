export const formatPrice = (number) => {
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};


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
      "#000080": "Navy"
  };

  return colors[hex] || "Unknown Color";
}

