import imgPants from "../assets/images/pants.png";
import imgShorts from "../assets/images/shorts.png";
import imgJoggers from "../assets/images/jogger.png";
import imgBag from "../assets/images/bags.png";

export const WebUrl =
  "https://6b5a-2001-ee0-48cf-2780-755a-fa19-a81a-f24c.ngrok-free.app";
export const flaskUrl = "http://127.0.0.1:5000";
export const IMG_BB_API_KEY = "c627df5eb679876997e90f0c2dba1f44";

export const ROLE = {
  CUSTOMER: "CUSTOMER",
  ADMIN: "ADMIN",
  STAFF: "STAFF",
};

export const OrderStatus = [
  { value: "IN_CART", name: "In Cart" },
  { value: "PENDING", name: "Pending" },
  { value: "SHIPPING", name: "Shipping" },
  { value: "DELIVERED", name: "Delivered" },
  { value: "CANCELLED", name: "Cancelled" },
];

export const arrCategory = [
  {
    name: "Áo",
    id: "tops",
    img: "",
    list: [
      {
        name: "Áo phông",
        link: "t-shirts",
        img: "https://www.stussy.com/cdn/shop/articles/Stussy-_-Eric-B.-_-Rakim-Cover.jpg?v=1639436915&width=1920",
      },
      {
        name: "áo khoác",
        link: "outerwears",
        img: "https://www.stussy.com/cdn/shop/articles/Stussy-HO23---Lookbook---19.jpg?v=1698771378&width=1920",
      },
      {
        name: "áo dài tay",
        link: "sweatshirts",
        img: "https://www.stussy.com/cdn/shop/articles/Popeye-Mailer-hp-feature-image.jpg?v=1572914951&width=1920",
      },
      {
        name: " áo Hoodies",
        link: "hoodies",
        img: "https://www.stussy.com/cdn/shop/articles/1.jpg?v=1710370668&width=1920",
      },
    ],
  },
  {
    name: "Quần",
    id: "bottoms",
    img: "",
    list: [
      {
        name: "quần shorts",
        link: "shorts",
        img: imgShorts,
      },
      {
        name: "quần joggers",
        link: "joggers",
        img: imgJoggers,
      },
      {
        name: "quần jeans",
        link: "sweatpants",
        img: imgPants,
      },
    ],
  },
  {
    name: "Giày",
    id: "footwears",
    img: "footwears",
    list: [
      {
        name: "giày thể thao",
        link: "sportswears",
        img: "https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/77e060a62ca5465f8d844615ec7f3a3d_9366/giay-da-bong-firm-ground-khong-day-predator-elite.jpg",
      },
      {
        name: "giày sneaker",
        link: "sneakers",
        img: "https://www.stussy.com/cdn/shop/articles/Ari_8.jpg?v=1679412668&width=1920",
      },
    ],
  },

  {
    name: "Phụ kiện",
    id: "accessories",
    img: "",
    list: [
      {
        name: "mũ",
        link: "hats",
        img: "https://www.stussy.com/cdn/shop/articles/Harris-Tweed_Feature-Cover.jpg?v=1576698721&width=1920",
      },
      {
        name: "túi",
        link: "crossbodybags",
        img: imgBag,
      },
    ],
  },
];
