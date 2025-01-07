import React, { useEffect, useState } from "react";
import { formatPrice } from "../../helpers";
import { Link, useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin2Fill } from "react-icons/ri";
import "./styles.scss";
import axios from "axios";
import { WebUrl } from "../../constants";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

interface TableProduct {
  id: string;
  name: string;
  img: string;
  price: number;
  quantity: number;
  category: string;
  subCategory: string;
}

const ProductManagement = () => {
  const [listProduct, setListProduct] = useState<TableProduct[]>([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const totalPages = Math.ceil(totalProduct / limit);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchListProduct = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${WebUrl}/api/v1/products/all?limit=${limit}&page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "skip-browser-warning",
          },
        }
      );
      const data = response.data.data.map((e: any) => ({
        id: e.productId,
        name: e.name,
        price: e.price,
        img: e?.images?.[0]?.imageURL,
        category: e.categoryId,
        subCategory: e.subCategoryId,
        quantity: e.quantity,
      }));
      setTotalProduct(response.data.meta.total);
      setListProduct(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching products", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${WebUrl}/api/v1/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "skip-browser-warning",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchListProduct(currentPage);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchListProduct(currentPage);
  }, [currentPage]);

  return (
    <div className="container pt-3 pb-3">
      <div className="product-management-header">
        <div className="product-table-header">Product</div>
        <div className="d-flex align-items-center">
          <div className="btn-product" onClick={() => navigate("/product/new")}>
            Add Product
          </div>
        </div>
      </div>
      <table className="table-product-header">
        <thead>
          <tr>
            <th style={{ width: "50%" }}>Product Name</th>
            <th style={{ width: "20%" }}>Price</th>
            <th style={{ width: "20%" }}>Products</th>
            <th style={{ width: "10%", textAlign: "right" }}>Action</th>
          </tr>
        </thead>
      </table>
      <table className="table-product">
        <tbody>
          {isLoading ? (
            <tr aria-colspan={4}>
              <div>
                <div className="loading-container">
                  <div className="loader"></div>
                </div>
              </div>
            </tr>
          ) : (
            <>
              {listProduct.map((e: TableProduct, index: number) => (
                <tr key={e.id}>
                  <td style={{ width: "50%" }}>
                    <div className="product-img">
                      <img src={e.img} alt="" />
                      <div>{e.name}</div>
                    </div>
                  </td>
                  <td style={{ width: "20%" }}>{formatPrice(e.price)}</td>
                  <td style={{ width: "20%" }}>
                    {e.category.charAt(0).toUpperCase() + e.category.slice(1)}
                  </td>
                  <td style={{ width: "10%" }}>
                    <div className="d-flex justify-content-around">
                      <Link to={`/product/${e.id}`}>
                        <div className="icon-product edit">
                          <MdModeEdit />
                        </div>
                      </Link>
                      <div
                        className="icon-product delete"
                        onClick={() => handleDelete(e.id)}
                      >
                        <RiDeleteBin2Fill />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      <div className="pagination-container">
        <nav>
          <ul className="pagination-list">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <GrFormPrevious />
              </button>
            </li>

            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <MdNavigateNext />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProductManagement;
