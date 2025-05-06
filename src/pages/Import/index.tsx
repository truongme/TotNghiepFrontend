import React, { useEffect, useState } from "react";
import "./styles.scss";
import axios from "axios";
import { WebUrl } from "../../constants";

interface ItemsImport {
  id: string;
  link: string;
}

const Import = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [listProduct, setListProduct] = useState<any[]>([]);

  const [items, setItems] = useState<any>([
    {
      id: 0,
      product: "",
      color: "",
      size: "",
      quantity: "",
    },
  ]);

  const handleSelect =
    (index: number, field: string) =>
    (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const newItems = [...items];
      newItems[index][field] = e.target.value;
      setItems(newItems);
    };

  const handleAddItems = () => {
    const newItem = {
      id: items.length,
      product: "",
      color: "",
      size: "",
      quantity: "",
    };
    setItems([...items, newItem]);
  };

  const handleSave = () => {
    console.log("items", items);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_: any, i: number) => i !== index);
    setItems(newItems);
  };

  const fetchListProduct = async () => {
    try {
      const response = await axios.get(`${WebUrl}/api/v1/products/all`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      });
      const data = response.data.data.map((e: any) => ({
        id: e.productId,
        name: e.name,
        price: e.price,
        img: e?.images?.[0]?.imageURL,
        category: e.categoryId,
        subCategory: e.subCategoryId,
        quantity: e.quantity,
      }));
      setListProduct(data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchListProduct();
  }, []);

  return (
    <div className="container">
      <div className="import-header mb-3">
        <div className="import-header-title">Danh sách phiếu nhập hàng</div>
        <div>
          <button className="btn-product" onClick={() => setIsOpenModal(true)}>
            Tạo phiếu
          </button>
        </div>
      </div>

      {isOpenModal && (
        <div>
          <h5 className="my-3">Tạo mới phiếu nhập</h5>
          <table className="table table-striped table-bordered">
            <thead className="table-primary">
              <tr>
                <th>Sản phẩm nhập</th>
                <th style={{ width: "15%" }}>Màu sắc</th>
                <th style={{ width: "10%" }}>Size</th>
                <th style={{ width: "10%" }}>Số lượng</th>
                <th style={{ width: "10%" }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item: any, index: number) => (
                <tr key={index}>
                  <td>
                    <select
                      className="form-select"
                      value={item.product}
                      onChange={handleSelect(index, "product")}
                    >
                      <option value="" disabled>
                        Chọn sản phẩm
                      </option>
                      {listProduct?.map((e: any) => (
                        <option value={e.id}>{e.name}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className="form-select"
                      value={item.color}
                      onChange={handleSelect(index, "color")}
                    >
                      <option value="" disabled>
                        Chọn màu
                      </option>
                      <option value="Đỏ">Đỏ</option>
                      <option value="Vàng">Vàng</option>
                      <option value="Xanh">Xanh</option>
                    </select>
                  </td>
                  <td>
                    <select
                      className="form-select"
                      value={item.size}
                      onChange={handleSelect(index, "size")}
                    >
                      <option value="" disabled>
                        Chọn size
                      </option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={item.quantity}
                      onChange={handleSelect(index, "quantity")}
                      min="1"
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveItem(index)}
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between mb-3">
            <button
              style={{ width: "49%" }}
              className="btn btn-primary"
              onClick={handleAddItems}
            >
              Thêm sản phẩm nhập
            </button>

            <button
              style={{ width: "49%" }}
              className="btn btn-secondary"
              onClick={() => handleSave()}
            >
              Xuất phiếu nhập hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Import;
