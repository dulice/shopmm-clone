import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const promotions = [
  {
    name: "wavepay",
    image: "https://icms-image.slatic.net/images/ims-web/f112ead1-8849-4002-b795-703aab08ebcf.jpg",
    link: "https://pages.shop.com.mm/wow/gcp/daraz/channel/mm/education-2022/wavepay-shop-8th-anniversary?spm=a2a0e.home.top.dbr4.b3a47fe4keoDjY&scm=1003.4.icms-zebra-100031612-2974964.OTHER_6502046062_7670037",
  },
  {
    name: "electronic",
    image: "https://icms-image.slatic.net/images/ims-web/edb9a8e9-754d-482f-a5fa-ca329ee3458d.jpg",
    link: "https://pages.shop.com.mm/wow/gcp/daraz/daily/mm/electronic-zone-june-nov-22/computers-and-accessories?spm=a2a0e.home.top.dbr2.b3a47fe4keoDjY&scm=1003.4.icms-zebra-100031612-2974964.OTHER_6502046060_7670037",
  },
  {
    name: "download app",
    image:
      "https://icms-image.slatic.net/images/ims-web/c58f58ec-4e4d-4552-a158-0e320a8f54c3.jpg_1200x1200.jpg",
    link: "https://linkmix.co/8884562?spm=a2a0e.home.top.dbr1.24b37fe4tqXNZu&scm=1003.4.icms-zebra-100031612-2974964.OTHER_6502046059_7670037",
  },
  {
    name: "deliver product",
    image: "https://icms-image.slatic.net/images/ims-web/a014a5a5-21e2-4c25-88be-402d0e3106ad.jpg",
    link: "https://pages.shop.com.mm/wow/gcp/daraz/channel/mm/discounts-2022/Express-Delivery?spm=a2a0e.home.top.dbr6.24b37fe4tqXNZu&scm=1003.4.icms-zebra-100031612-2974964.OTHER_6502046064_7670037",
  },
  {
    name: "Thadingyut",
    image: "https://icms-image.slatic.net/images/ims-web/27a84e2a-768a-4ed4-a5f2-b84376db62d3.jpg",
    link: "https://pages.shop.com.mm/wow/gcp/daraz/daily/mm/thadingyut-with-shop-2022/Thadingyut-with-Shop?spm=a2a0e.home.top.dbr5.24b37fe4tqXNZu&scm=1003.4.icms-zebra-100031612-2974964.OTHER_6502046063_7670037",
  },
];

const Promotion = () => {
  return (
    <div>
      <Carousel autoPlay={true} infiniteLoop={true} showArrows={false}>
        {promotions.map((promo, index) => (
          <a key={index} href={promo.link}>
                <img src={promo.image} alt="" />
          </a>
        ))}
      </Carousel>
    </div>
  );
};

export default Promotion;
