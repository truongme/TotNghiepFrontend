import React, { useEffect, useRef, useState } from "react";
import "./styles.scss";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { colorSystem, formatPrice } from "../../helpers";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import { IMG_BB_API_KEY, WebUrl } from "../../constants";
import { IoMdAdd } from "react-icons/io";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { getValue } from "@testing-library/user-event/dist/utils";

interface ProductForm {
  id?: string;
  name: string;
  images: any;
  description: string;
  category: string;
  subCategory: string;
  price: number;
  variants: ProductVariants[];
}

interface ProductVariants {
  id?: string;
  color: string;
  size: string;
  stock: number;
}

const ProductAdmin = () => {
  const { id } = useParams<{ id: string }>();
  const [previews, setPreviews] = useState<any[]>([]);
  const [arrCategory, setArrCategory] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const token = sessionStorage.getItem("token");
  const [arrColor, setArrColor] = useState<any[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProductForm>({
    defaultValues: {
      variants: [{ size: "", color: "", stock: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const handleAddClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePreview = async (files: FileList, color: string) => {
    console.log(color);
    const fileArray = Array.from(files);

    const newPreviews = fileArray.map((file) => ({
      colorName: color,
      file: URL.createObjectURL(file),
    }));

    setPreviews((prev) => [...prev, ...newPreviews]);

    try {
      const uploadPromises = fileArray.map((file: any) =>
        handleUploadFile(file)
      );
      const uploadedUrls = await Promise.all(uploadPromises);
      const newImages = uploadedUrls.map((file) => ({
        colorName: color,
        url: file,
      }));

      const newArrImages = [...watch("images"), ...newImages];
      setValue("images", newArrImages);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleUploadFile = async (file: File) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMG_BB_API_KEY}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data.url;
    } catch (error) {
      console.error("Error uploading avatar to imgBB:", error);
      throw error;
    }
  };

  const handleDeleteImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setValue(
      "images",
      watch("images").filter((_: any, i: number) => i !== index)
    );
  };

  const onSubmit = async (data: ProductForm) => {
    try {
      await axios.post(
        `${WebUrl}/api/v1/products/create-with-variants`,
        {
          name: data.name,
          description: data.description,
          price: Number(data.price),
          categoryId: data.category,
          subCategoryId: data.subCategory,
          images: data.images,
          brandId: "mlb",
          variants: data.variants.map((e) => ({
            colorId: e.color,
            sizeId: "xl",
            stock: Number(e.stock),
          })),
        },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "skip-browser-warning",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error uploading avatar to imgBB:", error);
      throw error;
    }
  };

  const getProductDetails = async () => {
    try {
      const response = await axios.get(`${WebUrl}/api/v1/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      });

      const result = response.data;
      console.log(result);

      const product: ProductForm = {
        id: result.productId,
        name: result.name,
        category: result.category.categoryId,
        subCategory: result.subCategory.subCategoryId,
        price: formatPrice(result.price),
        description: result.description,
        images: result.images.map((e: any) => e.imageURL),
        variants: result.productVariants.map((e: any) => ({
          id: e.productVariantId,
          color: e.color.hexCode[0],
          size: e.size.sizeType,
          stock: e.stock,
        })),
      };

      setValue("name", product.name);
      setValue("price", product.price);
      setValue("category", product.category);
      setValue("subCategory", product.subCategory);
      setValue("description", product.description);
      setValue("images", product.images);
      setValue("variants", product.variants);
      setPreviews(product.images);
    } catch (error) {
      console.error("Error get product details", error);
    }
  };

  const fetchAllColors = async () => {
    try {
      const reponse = await axios.get(`${WebUrl}/api/v1/colors/all?limit=12`, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "skip-browser-warning",
        },
      });
      setArrColor(reponse.data.data);
    } catch (error) {
      console.error("Error get category", error);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const reponse = await axios.get(
        `${WebUrl}/api/v1/categories/all?limit=6`,
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "skip-browser-warning",
          },
        }
      );
      setArrCategory(reponse.data.data);
    } catch (error) {
      console.error("Error get category", error);
    }
  };

  useEffect(() => {
    if (id !== "new") {
      getProductDetails();
    }
    fetchAllCategories();
    fetchAllColors();
  }, [id]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="row m-0">
          <div className="col-6">
            <label className="label-new-product">Product Name</label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Product name is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  className="input-new-product form-control"
                  placeholder="Enter product name..."
                />
              )}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
          <div className="col-6 pr-0">
            <label className="label-new-product">Price</label>
            <Controller
              name="price"
              control={control}
              rules={{ required: "Price is required" }}
              render={({ field }) => (
                <input
                  {...field}
                  className="input-new-product form-control"
                  placeholder="Enter the price of the product..."
                  onChange={(event) => {
                    const onlyNumbers = event.target.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                    field.onChange(onlyNumbers);
                  }}
                />
              )}
            />
            {errors.price && <p className="error">{errors.price.message}</p>}
          </div>
          <div className="col-12 mb-3">
            <label className="label-new-product">Product Image</label>
          </div>

          <div className="col-12">
            <label className="label-new-product">Description</label>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <ReactQuill
                  style={{ backgroundColor: "white" }}
                  {...field}
                  theme="snow"
                  className="input-new-product"
                  placeholder="Enter a description for the product..."
                  onChange={field.onChange}
                />
              )}
            />
            {errors.description && (
              <p className="error">{errors.description.message}</p>
            )}
          </div>
          <div className="col-6">
            <label className="label-new-product">Category</label>
            <Controller
              name="category"
              control={control}
              defaultValue=""
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <select
                  {...field}
                  className="input-new-product form-select text-capitalize"
                >
                  <option value="">Select category</option>
                  {arrCategory?.map((item: any) => (
                    <option className="text-capitalize" value={item.categoryId}>
                      {item.name}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.category && (
              <p className="error">{errors.category.message}</p>
            )}
          </div>

          <div className="col-6">
            <label className="label-new-product">Sub Category</label>
            <Controller
              name="subCategory"
              control={control}
              defaultValue=""
              rules={{ required: "Sub Category is required" }}
              render={({ field }) => {
                const categoriesSelected = watch("category");
                const subCategory: any = arrCategory.find(
                  (e: any) => e.categoryId === categoriesSelected
                );
                const arrSubCategory = subCategory?.subCategories;
                return (
                  <select
                    {...field}
                    className="input-new-product form-select text-capitalize"
                    disabled={!categoriesSelected}
                  >
                    <option value="">Select sub-category</option>
                    {arrSubCategory?.map((e: any) => (
                      <option
                        className="text-capitalize"
                        value={e.subCategoryId}
                      >
                        {e.name}
                      </option>
                    ))}
                  </select>
                );
              }}
            />
            {errors.subCategory && (
              <p className="error">{errors.subCategory.message}</p>
            )}
          </div>
          <div className="col-12 mb-3">
            <label className="label-new-product">Product Variant</label>
            <table className="table table-bordered">
              <thead>
                <tr className="table-primary">
                  <th style={{ width: "25%" }}>Size</th>
                  <th style={{ width: "35%" }}>Color</th>
                  <th style={{ width: "30%" }}>Quantity</th>
                  <th style={{ width: "10%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((item, index) => (
                  <>
                    <tr key={item.id}>
                      <td>
                        <Controller
                          name={`variants.${index}.size`}
                          control={control}
                          defaultValue="S"
                          rules={{ required: "Size is required" }}
                          render={({ field }) => (
                            <select {...field} className="form-select">
                              <option value="">Select size</option>
                              <option value="S">S</option>
                              <option value="M">M</option>
                              <option value="L">L</option>
                              <option value="XL">XL</option>
                            </select>
                          )}
                        />
                        {errors?.variants?.[index]?.size?.message && (
                          <p className="error">
                            {errors.variants[index]?.size?.message}
                          </p>
                        )}
                      </td>
                      <td>
                        <Controller
                          name={`variants.${index}.color`}
                          control={control}
                          defaultValue="White"
                          rules={{ required: "Color is required" }}
                          render={({ field }) => (
                            <select {...field} className="form-select">
                              <option value="">Select color</option>
                              {arrColor.map((color) => (
                                <option
                                  key={color.colorId}
                                  value={color.colorId}
                                >
                                  {color.name[0].charAt(0).toUpperCase() +
                                    color.name[0].slice(1).toLowerCase()}
                                </option>
                              ))}
                            </select>
                          )}
                        />
                        {errors?.variants?.[index]?.color?.message && (
                          <p className="error">
                            {errors.variants[index]?.color?.message}
                          </p>
                        )}
                      </td>
                      <td>
                        <Controller
                          name={`variants.${index}.stock`}
                          control={control}
                          defaultValue={0}
                          rules={{
                            required: "Quantity is required",
                          }}
                          render={({ field }) => (
                            <input
                              {...field}
                              className="form-control"
                              onChange={(event) => {
                                const onlyNumbers = event.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                                field.onChange(onlyNumbers);
                              }}
                            />
                          )}
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="delete"
                          onClick={() => remove(index)}
                          disabled={fields.length === 1}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4}>
                        <div className="col-12">
                          <Controller
                            name="images"
                            control={control}
                            defaultValue={[] as any}
                            render={({ field }) => (
                              <input
                                className="form-control"
                                ref={fileInputRef}
                                type="file"
                                multiple
                                style={{ display: "none" }}
                                accept="image/*"
                                onChange={(e) => {
                                  const files = e.target.files as FileList;
                                  handlePreview(
                                    files,
                                    watch(`variants.${index}.color`)
                                  );
                                }}
                              />
                            )}
                          />
                        </div>
                        <div className="input-img-ctn">
                          <div
                            className="input-img-import"
                            onClick={handleAddClick}
                          >
                            <IoMdAdd />
                          </div>
                          {previews
                            .filter(
                              (preview) =>
                                preview.colorName ===
                                watch(`variants.${index}.color`)
                            )
                            .map((preview, idx) => (
                              <div key={idx} className="input-img-item">
                                <img
                                  src={preview.file}
                                  alt={`Preview ${idx}`}
                                />
                                <div
                                  className="input-img-btn"
                                  onClick={() => handleDeleteImage(idx)}
                                >
                                  <MdCancel />
                                </div>
                              </div>
                            ))}
                        </div>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              className="primary"
              onClick={() => append({ size: "", color: "", stock: 1 })}
            >
              Add Variant
            </button>
          </div>
          <div className="col-12 mt-3">
            <button className="btn btn-success col-12 mb-3" type="submit">
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductAdmin;
