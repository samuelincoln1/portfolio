"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ArticleCard from "./ArticleCard";
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Articles.css";

export default function Articles() {
  const { t } = useTranslation("common");
  const articles = [
    {
      title: t("articles.transitioning"),
      image: "/images/On-premise-to-Cloud.png",
      link: "/articles/transitioning-legacy-applications-to-the-cloud",
    },
    {
      title: t("articles.microservices"),
      image: "/images/serverless.png",
      link: "/articles/leveraging-microservices-and-serverless-architectures-on-aws",
    },
    {
      title: "Implementing CI/CD pipelines with modern tools",
      image: "/images/cicd2.png",
      link: "/articles/implementing-ci-cd-pipelines-with-modern-tools",
    },
  ];
  return (
    <div id="articles" className="py-0">
      <h2 className="text-white md:text-[48px] text-[36px] font-bold ">
        {t("articles.title")}
      </h2>

      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            2200: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          className="articles-swiper"
        >
          {articles.map((article, idx) => (
            <SwiperSlide key={idx}>
              <ArticleCard
                image={article.image}
                title={article.title}
                link={article.link}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-button-prev-custom absolute right-20 -top-16 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all duration-300 group">
          <svg
            className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>

        <div className="swiper-button-next-custom absolute right-4 -top-16 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all duration-300 group">
          <svg
            className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
