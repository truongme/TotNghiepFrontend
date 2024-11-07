import React, { useEffect, useRef, useState } from 'react'
import './styles.scss'
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { colorSystem } from '../../helpers';
import { MdCancel } from "react-icons/md";
import axios from 'axios';
import { WebUrl } from '../../constants';
import { IoMdAdd } from "react-icons/io";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface NewProductForm {
    name: string;
    images: File[];
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

    const [previews, setPreviews] = useState<string[]>([]);
    const [arrCategory, setArrCategory] = useState<any[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm<NewProductForm>({
        defaultValues: {
            variants: [{ size: "", color: "", quantity: 1 }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "variants",
    });
    
    const handlePreview = (files: FileList) => {
        const fileArray = Array.from(files);
        const newPreviews = fileArray.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
        const newArrImages = [...watch("images"), ...fileArray]
        setValue("images", newArrImages);
    };

    const handleDeleteImage = (index: number) => {
        setPreviews(prev => prev.filter((_, i) => i !== index));
        setValue("images", watch("images").filter((_, i) => i !== index));
    }

    const onSubmit = (data: NewProductForm) => {
        console.log("New Product Data:", data);
    };
    const handleAddClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const fetchAllCategories = async () =>{
        try {
            const reponse = await axios.get(`${WebUrl}/api/v1/categories/all?limit=6`, {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'skip-browser-warning'
                }
            }) 
            setArrCategory(reponse.data.data)
        } catch (error) {
            console.error("Error get category", error)
        }
    }

    useEffect(() => {
        fetchAllCategories()
    },[])

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
                        <input {...field} 
                            className='input-new-product form-control' 
                            placeholder='Nhập giá của sản phẩm...'
                            onChange={(event) => {
                                const onlyNumbers = event.target.value.replace(/[^0-9]/g, '');
                                field.onChange(onlyNumbers);
                            }}
                        />
                    }
                />
                {errors.price && <p className='error'>{errors.price.message}</p>}
            </div>
            <div className='col-12 mb-3'>
                <label className='label-new-product'>Hình ảnh sản phẩm</label>
                <div className='input-img-ctn'>
                    <div className="input-img-import" onClick={handleAddClick}>
                        <IoMdAdd  />
                    </div>
                    {previews.map((preview, index) => (
                        <div key={index} className="input-img-item">
                            <img src={preview} alt={`Preview ${index}`} />
                            <div className='input-img-btn' onClick={() => handleDeleteImage(index)}>
                                <MdCancel />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='col-12'>
                <Controller
                    name="images"
                    control={control}
                    defaultValue={[] as any}
                    render={({ field }) =>
                        <input
                            className="form-control"
                            ref={fileInputRef}
                            type="file"
                            multiple
                            style={{display:'none'}}
                            accept="image/*"
                            onChange={(e) => {
                                const files = e.target.files as FileList;
                                handlePreview(files); 
                            }}
                        />
                    }
                />
            </div>
            <div className='col-12'>
                <label className='label-new-product'>Description</label>
                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Description is required" }}
                        render={({ field }) =>
                            <ReactQuill
                                {...field}
                                theme="snow"
                                className='input-new-product'
                                placeholder='Nhập mô tả cho sản phẩm...'
                                onChange={field.onChange} 
                            />
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
                        <select {...field} className='input-new-product form-select text-capitalize'>
                            <option value="">Select category</option>
                            {arrCategory?.map((item: any) => (
                                <option className='text-capitalize' value={item.categoryId}>{item.name}</option>
                            ))}
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
                    render={({ field }) => {
                        const categoriesSelected = watch("category")
                        const subCategory: any = arrCategory.find((e: any) => e.categoryId === categoriesSelected)
                        const arrSubCategory = subCategory?.subCategories
                        return (
                            <select 
                                {...field} 
                                className='input-new-product form-select text-capitalize'
                                disabled={!categoriesSelected} 
                            >
                                <option value="">Select sub-category</option>
                                {arrSubCategory?.map((e: any) => (
                                    <option className='text-capitalize' value={e.subCategoryId}>{e.name}</option>
                                ))}
                            </select>
                    )}}
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
                                    {errors?.variants?.[index]?.size?.message && (
                                        <p className='error'>{errors.variants[index]?.size?.message}</p>
                                    )}
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
                                    {errors?.variants?.[index]?.color?.message && (
                                        <p className='error'>{errors.variants[index]?.color?.message}</p>
                                    )}
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
                                    <button type="button" className="btn btn-danger" onClick={() => remove(index)} disabled={fields.length === 1}>Remove</button>
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
