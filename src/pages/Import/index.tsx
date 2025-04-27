import React, { useState } from "react";
import "./styles.scss";
import ModalMain from "../../components/Modal/Modal";
// import moment from 'moment';

interface ItemsImport {
  id: string;
  link: string;
}

const Import = () => {
  const arr: ItemsImport[] = [
    {
      id: "1",
      link: "56",
    },
    {
      id: "1",
      link: "56",
    },
  ];

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleSaveModal = () => {
    setIsOpenModal(false);
  };

  const contentBody = () => {
    const formattedDate = "";
    return (
      <div style={{ width: "100%" }}>
        <div>Ngày nhập hàng: {formattedDate}</div>
        <div className="input-form-import">
          <div>Tên nhà cung cấp</div>
          <input
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Nhập tên nhà cung cấp"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="import-header">
        <div className="import-header-title">Danh sách phiếu nhập hàng</div>
        <div>
          <button className="btn-product" onClick={() => setIsOpenModal(true)}>
            Tạo phiếu
          </button>
        </div>
      </div>
      {arr.map((item: ItemsImport) => (
        <div className="import-item">{item.link}</div>
      ))}
      {isOpenModal && (
        <ModalMain
          title="Phiếu nhập hàng"
          content={contentBody()}
          btn1="Huỷ"
          btn2="Xuất file"
          onClose={handleCloseModal}
          onSave={handleSaveModal}
        />
      )}
    </div>
  );
};

export default Import;
