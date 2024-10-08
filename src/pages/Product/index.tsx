import React from 'react'
import './styles.scss'
import imgProduct from '../../assets/images/card.webp'

const Product = () => {
  const arrSize = [
    {size: 'S'},
    {size: 'M'},
    {size: 'L'},
    {size: 'XL'}
  ]

  const tabIndex = -1
  return (
    <div className='container product-cotainer'>
      <div className='row'>
        <div className='col'>
          <div className='product-img'>
            <img src={imgProduct} alt="" />
          </div>
          <div className='product-content'>

          </div>
          <div>
            Chiếc áo thun Checkerboard Big Lux sẽ mang đến làn gió tươi trẻ, năng động cho phong cách đường phố của bạn. Nổi bật giữa gam màu hiện đại, logo các đội bóng chày cỡ lớn như bản tuyên ngôn mạnh mẽ về niềm đam mê thể thao, khẳng định cá tính riêng biệt của bạn giữa muôn vàn phong cách.
            Thương hiệu: MLB 
            Xuất xứ: Hàn Quốc 
            Giới tính: Unisex 
            Kiểu dáng: Áo thun
            Màu sắc: Off White, Black
            Chất liệu: 100% Cotton
            Cổ tròn, tay ngắn
            Hoạ tiết: Trơn một màu
            Thiết kế:

            Bo viền cổ áo tinh tế
            Nổi bật với logo bóng chày cỡ lớn in ở mặt sau áo
            Chất vải cao cấp, thoáng mát và co giãn thoải mái
            Đường may tỉ mỉ, chắc chắn
            Màu sắc hiện đại, trẻ trung dễ dàng phối với nhiều trang phục và phụ kiện khác
            Logo: Chi tiết logo bóng chày in nổi bật ở ngực trái
            Phom áo: Over fit rộng thoải mái
            Thích hợp mặc trong các dịp: Đi chơi, đi làm,....
            Xu hướng theo mùa: Sử dụng được tất cả các mùa trong năm
          </div>
        </div>
        <div className='col'>
          <div className='product-order'>
            <div className='product-name'>MLB - Chân váy bút chì denim midi Basic Small Logo</div>
            <div className='product-price'>3,000,000đ</div>
            <div>Chọn kích thước</div>
            <div className='d-flex'>
              {arrSize.map(e => (
                <div key={e.size} className='product-size'>{e.size}</div>
              ))}
            </div>
            <div className='product-order-btn'>
              <div className='btn-add-cart'>Thêm vào giỏ hàng</div>
              <div className='btn-order'>Mua ngay</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product