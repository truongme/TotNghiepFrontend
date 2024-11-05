import React from 'react'
import './styles.scss'
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { colorSystem } from '../../helpers';

interface NewProductForm {
  name: string;
  description: string;
  category: string;
  subCategory: string;
  price: number;
  variants: NewProductVariants[];
}

interface NewProductVariants {
  color: string;
  size: string;
  quantity: number;
}

const Create = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<NewProductForm>({
    defaultValues: {
      variants: [], 
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = (data: NewProductForm) => {
    console.log("New Product Data:", data);
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>
            <div className='col-6'>
                <label className='label-new-product'>Tên sản phẩm</label>
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Product name is required" }}
                    render={({ field }) => 
                        <input {...field} className='input-new-product form-control' placeholder='Nhập tên sản phẩm...'/>
                    }
                />
                {errors.name && <p className='error'>{errors.name.message}</p>}
            </div>
            <div className='col-6'>
                <label className='label-new-product'>Giá</label>
                <Controller
                    name="price"
                    control={control}
                    rules={{ required: "Price is required" }}
                    render={({ field }) => 
                        <input {...field} className='input-new-product form-control' placeholder='Nhập giá của sản phẩm...'/>
                    }
                />
                {errors.price && <p className='error'>{errors.price.message}</p>}
            </div>
            <div className='col-12'>
                <label className='label-new-product'>Description</label>
                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Description is required" }}
                    render={({ field }) => 
                        <textarea {...field} className='input-new-product form-control' placeholder='Nhập mô tả cho sản phẩm...' ></textarea>
                    }
                />
                {errors.description && <p className='error'>{errors.description.message}</p>}
            </div>
            <div className='col-6'>
                <label className='label-new-product'>Category</label>
                <Controller
                    name="category"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                        <select {...field} className='input-new-product form-select'>
                        <option value="">Select category</option>
                        <option value="shirt">Shirt</option>
                        <option value="pants">Pants</option>
                        <option value="jacket">Jacket</option>
                        <option value="dress">Dress</option>
                        </select>
                    )}
                />
                {errors.category && <p className='error'>{errors.category.message}</p>}
            </div>

            <div className='col-6'>
                <label className='label-new-product'>Sub Category</label>
                <Controller
                    name="subCategory"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Sub Category is required" }}
                    render={({ field }) => (
                        <select {...field} className='input-new-product form-select'>
                        <option value="">Select sub-category</option>
                        <option value="casual">Casual</option>
                        <option value="formal">Formal</option>
                        <option value="sport">Sport</option>
                        </select>
                    )}
                />
                {errors.subCategory && <p className='error'>{errors.subCategory.message}</p>}
            </div>
            <div className='col-12 mb-3'>
                <label className='label-new-product'>Product Variant</label>
                <table className="table table-bordered">
                    <thead>
                        <tr className='table-primary'>
                            <th style={{ width: "25%" }}>Size</th>
                            <th style={{ width: "35%" }}>Color</th>
                            <th style={{ width: "30%" }}>Quantity</th>
                            <th style={{ width: "10%" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map((item, index) => (
                            <tr key={item.id}>
                                <td>
                                    <Controller
                                        name={`variants.${index}.size`}
                                        control={control}
                                        defaultValue="S"
                                        rules={{ required: "Size is required" }}
                                        render={({ field }) => (
                                        <select {...field} className='form-select'>
                                            <option value="">Select size</option>
                                            <option value="S">S</option>
                                            <option value="M">M</option>
                                            <option value="L">L</option>
                                            <option value="XL">XL</option>
                                        </select>
                                        )}
                                    />
                                </td>
                                <td>
                                    <Controller
                                        name={`variants.${index}.color`}
                                        control={control}
                                        defaultValue="White"
                                        rules={{ required: "Color is required" }}
                                        render={({ field }) => (
                                        <select {...field} className='form-select'>
                                            <option value="">Select color</option>
                                            {colorSystem.map((color) => (
                                                <option key={color.code} value={color.code}>
                                                    {color.name}
                                                </option>
                                            ))}
                                        </select>
                                        )}
                                    />
                                </td>
                                <td>
                                    <Controller
                                        name={`variants.${index}.quantity`}
                                        control={control}
                                        defaultValue={0}
                                        rules={{
                                            required: "Quantity is required",
                                        }}
                                        render={({ field }) => 
                                            <input
                                                {...field}
                                                className='form-control'
                                                onChange={(event) => {
                                                    const onlyNumbers = event.target.value.replace(/[^0-9]/g, '');
                                                    field.onChange(onlyNumbers);
                                                }}
                                            />
                                        }
                                    />
                                </td>
                                <td>
                                    <button type="button" className="btn btn-danger" onClick={() => remove(index)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="button" className="btn btn-primary" onClick={() => append({ size: "", color: "", quantity: 1 })}>
                    Add Variant
                </button>
            </div>
            <div className='col-12'>
                <button className='btn btn-success col-12 mb-3' type="submit">Add Product</button>
            </div>
        </div>
      </form>
    </div>
  );
}

export default Create;
