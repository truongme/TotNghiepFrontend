import React, { useState, useEffect } from "react";
import "./styles.scss";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { WebUrl } from "../../../constants";
import ModalMain from "../../../components/Modal/Modal";

const Address = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const { control, handleSubmit, reset, watch, setValue } = useForm();
  const [isAddAddress, setIsAddAddress] = useState<boolean>(false);
  const token = sessionStorage.getItem("token");
  const [arrMyAddresses, setArrMyAddresses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [idAddressDelete, setIdAddressDelete] = useState<string>("");

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        "https://open.oapi.vn/location/provinces?size=1000"
      );
      setProvinces(response.data.data);
    } catch (error) {
      console.error("Error fetching provinces", error);
    }
  };

  const fetchDistricts = async (provinceId: number) => {
    try {
      const response = await axios.get(
        `https://open.oapi.vn/location/districts/${provinceId}?size=1000`
      );
      setDistricts(response.data.data);
    } catch (error) {
      console.error("Error fetching districts", error);
    }
  };

  const fetchCommunes = async (districtId: number) => {
    try {
      const response = await axios.get(
        `https://open.oapi.vn/location/wards/${districtId}?size=1000`
      );
      setCommunes(response.data.data);
    } catch (error) {
      console.error("Error fetching communes", error);
    }
  };

  const handleEdit = (addressId: string) => {
    const address = arrMyAddresses.find((a) => a.addressId === addressId);
    if (address) {
      fetchDistricts(address.city);
      fetchCommunes(address.district);
      reset({
        detail: address.detail,
        province: address.province,
        district: address.district,
        commune: address.commune,
      });
      setEditingId(addressId);
    }
  };

  const handleDelete = (id: string) => {
    setIdAddressDelete(id);
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.put(
        `${WebUrl}/api/v1/addresses/update/${editingId}`,
        {
          addressDetail: data.detail,
          city: data.province,
          district: data.district,
          ward: data.commune,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "skip-browser-warning",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditingId("");
      fetchMyAddress();
    } catch (error) {
      console.error("Error fetching address details", error);
    }
  };

  const onSubmitAddAddress = async (data: any) => {
    try {
      const response = await axios.post(
        `${WebUrl}/api/v1/addresses/create`,
        {
          addressDetail: data.detail,
          city: data.province,
          district: data.district,
          ward: data.commune,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "skip-browser-warning",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsAddAddress(false);
      fetchMyAddress();
    } catch (error) {
      console.error("Error fetching address details", error);
    }
  };

  const handleAddNew = () => {
    setEditingId("");
    setIsAddAddress(true);
    reset();
  };

  const handleCancelAdd = () => {
    setIsAddAddress(false);
    reset();
  };

  const handleCloseModal = () => {
    setEditingId("");
    setDistricts([]);
    setCommunes([]);
  };

  const handleCloseModalAddAddress = () => {
    setIsAddAddress(false);
  };

  const handleCloseModalDelete = () => {
    setIdAddressDelete("");
  };

  const handleDeleteAddress = async () => {
    setIdAddressDelete("");
    try {
      const response = await axios.delete(
        `${WebUrl}/api/v1/addresses/delete/${idAddressDelete}`,
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "skip-browser-warning",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchMyAddress();
    } catch (error) {
      console.error("Error fetching address details", error);
    }
  };

  const fetchMyAddress = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${WebUrl}/api/v1/addresses/all`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "skip-browser-warning",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchAddressDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching address details", error);
    }
  };

  const fetchAddressDetails = async (data: any) => {
    try {
      const city = await axios.get(
        "https://open.oapi.vn/location/provinces?size=1000"
      );
      const response = await Promise.all(
        data.map(async (item: any) => {
          const arr = item.fullAddress.split(", ");
          const province = city.data.data.find(
            (city: any) => city.id == arr[3]
          )?.name;

          if (!province) return null;

          const dataDistrict = await axios.get(
            `https://open.oapi.vn/location/districts/${arr[3]}?size=1000`
          );
          const district = dataDistrict.data.data.find(
            (city: any) => city.id == arr[2]
          )?.name;

          if (!district) return null;

          const dataWard = await axios.get(
            `https://open.oapi.vn/location/wards/${arr[2]}?size=1000`
          );
          const ward = dataWard.data.data.find(
            (city: any) => city.id == arr[1]
          )?.name;

          if (!ward) return null;

          const addressDetails = `${item.addressDetail}, ${ward}, ${district}, ${province}`;
          return {
            addressDetails: addressDetails,
            ...item,
          };
        })
      );
      setArrMyAddresses(response.filter((item) => item !== null));
    } catch (error) {
      console.error("Error fetching address details", error);
    }
  };

  const modalEditAddress = () => {
    const addr = arrMyAddresses.find((a) => a.addressId === editingId);
    return (
      <div className="address-edit-form mt-2 w-100">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label>Detail Address</label>
            <Controller
              name="detail"
              control={control}
              defaultValue={addr.addressDetail}
              render={({ field }) => (
                <input
                  {...field}
                  className="form-control"
                  placeholder="Enter detailed address"
                />
              )}
            />
          </div>

          <div className="mb-3">
            <label>Province</label>
            <Controller
              name="province"
              control={control}
              defaultValue={addr.city}
              render={({ field }) => (
                <select
                  {...field}
                  className="form-select"
                  onChange={(e) => {
                    field.onChange(e);
                    setValue("commune", "");
                    fetchDistricts(Number(e.target.value));
                  }}
                >
                  <option value="">Select Province</option>
                  {provinces.map((p: any) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <div className="mb-3">
            <label>District</label>
            <Controller
              name="district"
              control={control}
              defaultValue={addr.district}
              render={({ field }) => (
                <select
                  {...field}
                  className="form-select"
                  onChange={(e) => {
                    field.onChange(e);
                    fetchCommunes(Number(e.target.value));
                  }}
                >
                  <option value="">Select District</option>
                  {districts.map((d: any) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <div className="mb-3">
            <label>Commune</label>
            <Controller
              name="commune"
              control={control}
              defaultValue={addr.ward}
              render={({ field }) => (
                <select {...field} className="form-select">
                  <option value="">Select Commune</option>
                  {communes.map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
          <div className="form-actions d-flex justify-content-between gap-2">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => handleCloseModal()}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  };

  const modalAddAddress = () => {
    return (
      <div className="address-add-form mt-3 w-100">
        <form onSubmit={handleSubmit(onSubmitAddAddress)}>
          <div className="mb-3">
            <label>Detail Address</label>
            <Controller
              name="detail"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="form-control"
                  placeholder="Enter detailed address"
                />
              )}
            />
          </div>

          <div className="mb-3">
            <label>Province</label>
            <Controller
              name="province"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select
                  {...field}
                  className="form-select"
                  onChange={(e) => {
                    field.onChange(e);
                    fetchDistricts(Number(e.target.value));
                    setValue("commune", "");
                  }}
                >
                  <option value="">Select Province</option>
                  {provinces.map((p: any) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <div className="mb-3">
            <label>District</label>
            <Controller
              name="district"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select
                  {...field}
                  className="form-select"
                  onChange={(e) => {
                    field.onChange(e);
                    fetchCommunes(Number(e.target.value));
                  }}
                >
                  <option value="">Select District</option>
                  {districts.map((d: any) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <div className="mb-3">
            <label>Commune</label>
            <Controller
              name="commune"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <select {...field} className="form-select">
                  <option value="">Select Commune</option>
                  {communes.map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <div className="form-actions w-100 d-flex justify-content-between gap-2">
            <button
              type="button"
              className="btn-secondary"
              onClick={handleCancelAdd}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  };

  useEffect(() => {
    fetchProvinces();
    fetchMyAddress();
  }, []);

  return (
    <div>
      <div className="address-container">
        <div className="address-header">
          <h5>My Addresses</h5>
          <button className="btn-primary" onClick={() => handleAddNew()}>
            Add New Address
          </button>
        </div>
      </div>
      <div className="address-list">
        {isLoading ? (
          <div className="text-center mt-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            {arrMyAddresses?.length > 0 ? (
              <div>
                {arrMyAddresses.map((addr) => (
                  <div className="address-item-ctn mt-3" key={addr.addressId}>
                    <div className="address-item">
                      <div>{addr.addressDetails}</div>
                      <div className="d-flex">
                        <button
                          style={{ width: "100px" }}
                          className="btn-primary"
                          onClick={() => handleEdit(addr.addressId)}
                        >
                          Edit
                        </button>
                        <button
                          style={{ width: "100px" }}
                          className="btn-secondary"
                          onClick={() => handleDelete(addr.addressId)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No Data</div>
            )}
          </div>
        )}
      </div>
      {editingId && (
        <ModalMain
          title="Edit Address"
          content={modalEditAddress()}
          onClose={handleCloseModal}
        />
      )}
      {isAddAddress && (
        <ModalMain
          title="Add Address"
          content={modalAddAddress()}
          onClose={handleCloseModalAddAddress}
        />
      )}
      {idAddressDelete && (
        <ModalMain
          title="Notification"
          content="Do you want to delete this address?"
          btn1="Cancel"
          btn2="Yes"
          onClose={handleCloseModalDelete}
          onSave={handleDeleteAddress}
        />
      )}
    </div>
  );
};

export default Address;
