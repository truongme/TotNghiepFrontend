import React, { useState, useEffect } from 'react';
import './styles.scss';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

const Address = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, detail: "272 Đ. Võ Chí Công", province: "Hà Nội", district: "Tây Hồ", commune: "Phú Thượng" },
    { id: 2, detail: "720A Điện Biên Phủ", province: "Hồ Chí Minh", district: "Bình Thạnh", commune: "Tân Cảng" }
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [communes, setCommunes] = useState([]);
  const { control, handleSubmit, reset, watch } = useForm();
  const [isAddress, setIsAddress] = useState<boolean>(false);
  const selectedProvince = watch("province");
  const selectedDistrict = watch("district");

  const fetchProvinces = async () => {
    try {
      const response = await axios.get('https://open.oapi.vn/location/provinces?size=1000');
      setProvinces(response.data.data);
    } catch (error) {
      console.error("Error fetching provinces", error);
    }
  };

  const fetchDistricts = async (provinceId: number) => {
    try {
      const response = await axios.get(`https://open.oapi.vn/location/districts/${provinceId}?size=1000`);
      setDistricts(response.data.data);
      setCommunes([]); 
    } catch (error) {
      console.error("Error fetching districts", error);
    }
  };

  const fetchCommunes = async (districtId: number) => {
    try {
      const response = await axios.get(`https://open.oapi.vn/location/wards/${districtId}?size=1000`);
      setCommunes(response.data.data);
    } catch (error) {
      console.error("Error fetching communes", error);
    }
  };

  const handleEdit = (id: number) => {
    const address = addresses.find(a => a.id === id);
    if (address) {
      reset({
        detail: address.detail,
        province: address.province,
        district: address.district,
        commune: address.commune
      });
      setEditingId(id);
    }
  };

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const onSubmit = (data: any) => {
    const updatedAddresses = addresses.map(addr =>
      addr.id === editingId
        ? { ...addr, detail: data.detail, province: data.province, district: data.district, commune: data.commune }
        : addr
    );
    setAddresses(updatedAddresses);
    setEditingId(null);
    reset();
  };

  const handleAddNew = () => {
    setIsAddress(true);
    reset();
  };

  const handleCancelAdd = () => {
    setIsAddress(false);
    reset();
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const province: any = provinces.find((p: any) => p.name === selectedProvince);
      if (province) fetchDistricts(province.id);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      const district: any = districts.find((d: any) => d.name === selectedDistrict);
      if (district) fetchCommunes(district.id);
    }
  }, [selectedDistrict]);

  return (
    <div>
      <div className='address-container p-3'>
        <div className='address-header'>
          <h5>My Addresses</h5>
          <button className='edit' onClick={() => handleAddNew()}>Add New Address</button>
        </div>
      </div>
      <div className='address-list'>
        {addresses.map(addr => (
          <div className='address-item-ctn p-3 mt-3' key={addr.id}>
            <div className='address-item'>
              <div>{addr.detail}, {addr.commune}, {addr.district}, {addr.province}</div>
              <div>
                <button className='edit' onClick={() => handleEdit(addr.id)}>Edit</button>
                <button className='delete' onClick={() => handleDelete(addr.id)}>Delete</button>
              </div>
            </div>
            {editingId === addr.id && (
              <div className='address-edit-form mt-2'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='mb-3'>
                    <label>Detail Address</label>
                    <Controller
                      name="detail"
                      control={control}
                      defaultValue={addr.detail}
                      render={({ field }) => <input {...field} className='form-control' placeholder="Enter detailed address" />}
                    />
                  </div>

                  <div className='mb-3'>
                    <label>Province</label>
                    <Controller
                      name="province"
                      control={control}
                      defaultValue={addr.province}
                      render={({ field }) => (
                        <select {...field} className='form-select'>
                          <option value="">Select Province</option>
                          {provinces.map((p: any) => (
                            <option key={p.id} value={p.name}>{p.name}</option>
                          ))}
                        </select>
                      )}
                    />
                  </div>

                  <div className='mb-3'>
                    <label>District</label>
                    <Controller
                      name="district"
                      control={control}
                      defaultValue={addr.district}
                      render={({ field }) => (
                        <select {...field} className='form-select'>
                          <option value="">Select District</option>
                          {districts.map((d: any) => (
                            <option key={d.id} value={d.name}>{d.name}</option>
                          ))}
                        </select>
                      )}
                    />
                  </div>

                  <div className='mb-3'>
                    <label>Commune</label>
                    <Controller
                      name="commune"
                      control={control}
                      defaultValue={addr.commune}
                      render={({ field }) => (
                        <select {...field} className='form-select'>
                          <option value="">Select Commune</option>
                          {communes.map((c: any) => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      )}
                    />
                  </div>

                  <div className='form-actions'>
                    <button type="submit" className='edit'>Save</button>
                    <button type="button" className='delete' onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ))}
        {isAddress && (
          <div className='address-add-form p-3 mt-3'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-3'>
              <label>Detail Address</label>
              <Controller
                name="detail"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} className='form-control' placeholder="Enter detailed address" />}
              />
            </div>

            <div className='mb-3'>
              <label>Province</label>
              <Controller
                name="province"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select {...field} className='form-select'>
                    <option value="">Select Province</option>
                    {provinces.map((p: any) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                )}
              />
            </div>

            <div className='mb-3'>
              <label>District</label>
              <Controller
                name="district"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select {...field} className='form-select'>
                    <option value="">Select District</option>
                    {districts.map((d: any) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                )}
              />
            </div>

            <div className='mb-3'>
              <label>Commune</label>
              <Controller
                name="commune"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <select {...field} className='form-select'>
                    <option value="">Select Commune</option>
                    {communes.map((c: any) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                )}
              />
            </div>

            <div className='form-actions'>
              <button type="submit" className='edit'>Save</button>
              <button type="button" className='delete' onClick={handleCancelAdd}>Cancel</button>
            </div>
          </form>
        </div>
        )}
      </div>
    </div>
  );
};

export default Address;
