import React, { useState } from "react";
import "./styles.scss"; // Đảm bảo bạn có CSS riêng
const ImageZoom: React.FC<{ src: string }> = ({ src }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = target as HTMLDivElement;

    // Giảm độ nhạy khi tính toán vùng focus
    const smoothFactor = 0.3; // Tăng giá trị này để làm cho chuyển động mượt hơn
    const newX = (offsetX / offsetWidth) * 100;
    const newY = (offsetY / offsetHeight) * 100;

    setMousePosition((prev) => ({
      x: prev.x + (newX - prev.x) * smoothFactor,
      y: prev.y + (newY - prev.y) * smoothFactor,
    }));
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false); // Quay về trạng thái ban đầu
  };

  return (
    <div
      className={`image-container ${isZoomed ? "zoomed" : ""}`}
      onMouseMove={isZoomed ? handleMouseMove : undefined}
      onClick={toggleZoom}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        alt="Zoomable"
        style={
          isZoomed
            ? {
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
              }
            : undefined
        }
      />
    </div>
  );
};

export default ImageZoom;