import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./styles.scss";
import { WebUrl } from "../../constants";
import Cart from "../Cart";
import { CardProps } from "../Home";
import Card from "../../components/Card";

const Search = () => {
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const [arrResult, setArrResult] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearchImage = async (file: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${WebUrl}/search-image`,
        {
          url: "https://fearofgod.com/cdn/shop/files/125AL244301_KNICKS_ESSENTIALS_TEE-LIGHT_HEATHER_1_900x.jpg?v=1731638100",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "skip-browser-warning",
            Referrer: "",
          },
        }
      );
      const nearestImages = response.data.nearest_images;
      const data = nearestImages.map((e: any) => ({
        id: e.productId,
        name: e.name,
        price: e.price,
        img: e.url,
      }));
      setArrResult(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error uploading avatar to imgBB:", error);
    }
  };

  useEffect(() => {
    console.log("url", url);
    handleSearchImage(url);
  }, [url]);

  return (
    <div className="container mt-3">
      <div className="search-title">Input image</div>
      <div className="image-input-ctn">
        <img src={url || ""} />
      </div>
      <div className="search-title">Search results</div>
      <div className="colections-items">
        {isLoading ? (
          <div className="col-12">
            <div className="loading-container">
              <div className="loader"></div>
            </div>
          </div>
        ) : (
          <div>
            {arrResult?.length > 0 ? (
              <div>No matching products</div>
            ) : (
              <div>
                {arrResult.map((e: CardProps) => (
                  <Card data={e} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
