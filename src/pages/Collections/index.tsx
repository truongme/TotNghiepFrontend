import React, { useEffect, useState } from 'react'
import './styles.scss'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Card from '../../components/Card';
import axios from 'axios';
import { CardProps } from '../Home';
import { arrCategory, WebUrl } from '../../constants';

const Collections = () => {
    const { categoryId } = useParams();
    const [btnSort, setBtnSort] = useState<string>("popularity")
    const [isOpenPannel, setIsOpenPannel] = useState<boolean>(false)
    const [listSelectedSize, setListSelectedSize] = useState<string[]>([])
    const [listSelectedColor, setListSelectedColor] = useState<string[]>([])
    const [listSelectedPrice, setListSelectedPrice] = useState<any[]>([])
     const [listSelectedSubCategory, setListSelectedSubCategory] = useState<any[]>([])
    const [listProduct, setListProduct] = useState<any[]>([])
    const [listColor, setListColor] = useState<any[]>([])
    const [listProductPrev, setListProductPrev] = useState<any[]>([])
    const subCategory = arrCategory.find((e : any) => e.id === categoryId)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const arrSize = ["XS", "S", "M", "L", "XL", "XXL"]
    const arrFilterPrice = [
        { name: "Under 500k", min: 0, max: 500000 },
        { name: "500k - 1M", min: 500000, max: 1000000 },
        { name: "1M - 2M", min: 1000000, max: 2000000 },
        { name: "Above 2M", min: 2000000, max: Infinity },
    ];

    const handleClearAllFilter = () => {
        setListSelectedSize([])
        setListSelectedColor([])
        setListSelectedPrice([])
        setListSelectedSubCategory([])
        setListProduct(listProductPrev)
    }

    const handleSelectSize = (size: string) => {
        let updatedSelectedSizes: string[];

        if (listSelectedSize.includes(size)) {
            updatedSelectedSizes = listSelectedSize.filter(x => x !== size);
        } else {
            updatedSelectedSizes = [...listSelectedSize, size];
        }

        setListSelectedSize(updatedSelectedSizes);
        filterProducts(updatedSelectedSizes, listSelectedColor, listSelectedPrice, listSelectedSubCategory);
    };

    const handleSelectColor = (color: string) => {
        let updatedSelectedColors: string[];

        if (listSelectedColor.includes(color)) {
            updatedSelectedColors = listSelectedColor.filter(x => x !== color);
        } else {
            updatedSelectedColors = [...listSelectedColor, color];
        }

        setListSelectedColor(updatedSelectedColors);
        filterProducts(listSelectedSize, updatedSelectedColors,listSelectedPrice,listSelectedSubCategory);
    };

    const handleSelectPrice = (priceRange: any) => {
        let updatedSelectedPrices: any[];

        if (listSelectedPrice.some(p => p.min === priceRange.min && p.max === priceRange.max)) {
            updatedSelectedPrices = listSelectedPrice.filter(p => p.min !== priceRange.min || p.max !== priceRange.max);
        } else {
            updatedSelectedPrices = [...listSelectedPrice, priceRange];
        }

        setListSelectedPrice(updatedSelectedPrices);
        filterProducts(listSelectedSize, listSelectedColor, updatedSelectedPrices,listSelectedSubCategory);
    };

    const handleSelectSubCategory = (subCategory: string) => {
        let updatedSelectedSubCategory: string[];

        if (listSelectedSubCategory.includes(subCategory)) {
            updatedSelectedSubCategory = listSelectedSubCategory.filter(x => x !== subCategory);
        } else {
            updatedSelectedSubCategory = [...listSelectedSubCategory, subCategory];
        }

        setListSelectedSubCategory(updatedSelectedSubCategory);
        filterProducts(listSelectedSize, listSelectedColor,listSelectedPrice, updatedSelectedSubCategory);
    };


    const filterProducts = (selectedSizes: string[], selectedColors: string[], selectedPrices: any[], selectedSubCategory: any[]) => {
        let filteredProducts = listProductPrev;

        if (selectedSizes.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                selectedSizes.some(size => product.size.includes(size))
            );
        }

        if (selectedColors.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                selectedColors.some(color => product.color.includes(color))
            );
        }
        
        console.log(filteredProducts)

         if (selectedSubCategory.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                selectedSubCategory.some(SubCategory => product.subCategoryId === SubCategory)
            );
        }

        if (selectedPrices.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                selectedPrices.some(priceRange =>
                    product.price >= priceRange.min && product.price <= priceRange.max
                )
            );
        }

        setListProduct(filteredProducts);
    };



    const sortProducts = (criteria: string) => {
        const sortedProducts = [...listProduct];
        const sortedProductsPrev = [...listProductPrev];
        setBtnSort(criteria)

        if (criteria === 'popularity') {
            sortedProducts.sort((a, b) => b.id - a.id); 
            sortedProductsPrev.sort((a, b) => b.id - a.id); 
        } else if (criteria === 'ascending') {
            sortedProducts.sort((a, b) => a.price - b.price); 
            sortedProductsPrev.sort((a, b) => a.price - b.price); 
        } else if (criteria === 'descending') {
            sortedProducts.sort((a, b) => b.price - a.price);
            sortedProductsPrev.sort((a, b) => b.price - a.price);
        }

        setListProduct(sortedProducts); 
        setListProductPrev(sortedProductsPrev); 
    };

    const getProduct = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(`${WebUrl}/api/v1/products/all?categoryId=${categoryId}&limit=50`, {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'skip-browser-warning',
                },
            });
            const data = response.data.data.map((e: any) => ({
                id: e.productId,
                name: e.name,
                price: e.price,
                img: e?.images?.[0]?.imageURL,
                imgHover: e?.images?.[1]?.imageURL,
                color: e?.productVariants?.map((x: any) => x.color.colorId ),
                size: e?.productVariants?.map((x: any) => x.size.sizeType ),
                subCategoryId: e.subCategoryId,
            }));
            setListProduct(data);
            setListProductPrev(data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false);
            console.error("Failed to fetch products:", error);
        }
    };

    const getColor = async () => {
        try {
            const response = await axios.get(`${WebUrl}/api/v1/colors/all?limit=15`, {
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'skip-browser-warning',
                },
            });
            const data = response.data.data.map((e: any) => ({
                id: e.colorId,
                name: e.name[0],
                hexCode: e.hexCode[0],
            }));
            setListColor(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    useEffect(() => {
      getColor();
      getProduct();
    }, [categoryId]);


    return (
      <div className="collections-ctn">
        <div className="container">
          <div className="collections-breadcrumb">
            <Link to={"/"} className="link-style collections-breadcrumb-item">
              Home
            </Link>
            <div className="collections-breadcrumb-item">/</div>
            <Link to={"/"} className="link-style collections-breadcrumb-item">
              COLLECTIONS
            </Link>
            <div className="collections-breadcrumb-item">/</div>
            <div className="collections-breadcrumb-active">{categoryId}</div>
          </div>
          <div className="collections-title">{categoryId}</div>
        </div>
        {subCategory && (
          <div className="list-subcatgory">
            <div className="container d-flex">
              {subCategory.list.map((e: any) => (
                <div
                  className="list-subcatgory-item"
                  onClick={() => navigate(`/collections/${e.link}`)}
                >
                  <div className="list-subcatgory-img-ctn">
                    <img
                      src={
                        e.img ||
                        "https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/PAC_FW_23_CYBER_WEEK_MEMBERS_EA_PLP_IWP_MEN_D_d9f2721ad9.jpg"
                      }
                      alt=""
                    />
                  </div>
                  <div className="list-subcatgory-name">{e.name}</div>
                </div>
              ))}
            </div>
            <div className="list-category-bg">
              <img
                src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/01_fw23_brand_campaign_launch_plp_superstar_iwp_bg_d_2c58860564.jpg"
                alt=""
              />
            </div>
          </div>
        )}
        <div className="container">
          <div className="collections-header">
            <div
              className="collections-filter-button"
              onClick={() => setIsOpenPannel(true)}
            >
              Filter +
            </div>
            <div className="collections-actions-sort">
              <div>Sort by</div>
              <button
                className={`collections-sort-btn ${
                  btnSort === "popularity" && "active"
                }  `}
                onClick={() => sortProducts("popularity")}
              >
                Best Seller
              </button>
              <button
                className={`collections-sort-btn ${
                  btnSort === "ascending" && "active"
                }  `}
                onClick={() => sortProducts("ascending")}
              >
                Ascending
              </button>
              <button
                className={`collections-sort-btn ${
                  btnSort === "descending" && "active"
                }  `}
                onClick={() => sortProducts("descending")}
              >
                Descending
              </button>
            </div>
          </div>
          <div className="row mb-3">
            {isLoading ? (
              <div className="col-12">
                <div className='loading-container'>
                    <div className="loader"></div> 
                </div>
              </div>
            ) : (
              <div className="col-12 colections-items">
                {listProduct.map((e: CardProps) => (
                  <div>
                    <Card data={e} />
                  </div>
                ))}
              </div>
            )}
          </div>
          {isOpenPannel && (
            <div className={`pannel-filter ${isOpenPannel ? "open" : ""}`}>
              <div className="pannel-filter-container">
                <div className="pannel-filter-header">
                  <div className="pannel-filter-title">Filter</div>
                  <div onClick={() => setIsOpenPannel(false)}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="presentation"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.93942 10.3536L3.29297 16L4.00008 16.7071L9.64652 11.0607L15.293 16.7071L16.0001 16L10.3536 10.3536L16.0001 4.70711L15.293 4L9.64652 9.64645L4.00008 4L3.29297 4.70711L8.93942 10.3536Z"
                        fill="#222222"
                      ></path>
                    </svg>
                  </div>
                </div>

                <div className="pannel-filter-content">
                  {subCategory && (
                    <div>
                      <div className="pannel-filter-title">SubCategory</div>
                      <div className="pannel-filter-subCategory-ctn">
                        {subCategory.list.map((e) => (
                          <div
                            className={`pannel-filter-subCategory ${
                              listSelectedSubCategory.includes(e.link)
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => handleSelectSubCategory(e.link)}
                          >
                            {e.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="pannel-filter-title">Sizes</div>
                  <div className="pannel-filter-sizes">
                    {arrSize.map((x) => (
                      <div
                        className={
                          listSelectedSize.includes(x)
                            ? "pannel-filter-size selected"
                            : "pannel-filter-size"
                        }
                        onClick={() => handleSelectSize(x)}
                      >
                        {x}
                      </div>
                    ))}
                  </div>
                  <div className="pannel-filter-title">Color</div>
                  <div className="pannel-filter-colors">
                    {listColor.map((e) => (
                      <div
                        key={e.id}
                        className={`pannel-filter-color ${
                          listSelectedColor.includes(e.id) ? "selected" : ""
                        }`}
                        style={{ background: `${e.hexCode}` }}
                        onClick={() => handleSelectColor(e.id)}
                      ></div>
                    ))}
                  </div>
                  <div className="pannel-filter-title">Price</div>
                  <div className="pannel-filter-prices">
                    {arrFilterPrice.map((x) => (
                      <div
                        className={`pannel-filter-price ${
                          listSelectedPrice.some(
                            (p) => p.min === x.min && p.max === x.max
                          )
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => handleSelectPrice(x)}
                      >
                        {x.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pannel-filter-footer">
                  <button
                    className="btn-secondary"
                    onClick={() => handleClearAllFilter()}
                  >
                    Clear All
                  </button>
                  <button
                    className="btn-primary"
                    onClick={() => setIsOpenPannel(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export default Collections