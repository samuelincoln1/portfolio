"use client";
import { useTranslation } from "next-i18next";

export default function Hero() {
  const { t } = useTranslation("common");

  return (
    <div className="container mx-auto md:mt-auto relative flex flex-col md:min-h-[calc(100vh-44px)] min-h-screen lg:flex-row gap-8 lg:gap-[106px] px-4 lg:px-0 items-center justify-center md:items-start md:justify-start">
      <div className="flex flex-col text-center mx-auto justify-center items-center mb-auto mt-40 md:mt-80 z-50">
        <p className="text-white text-2xl">{t("hero.title")}</p>
        <h1 className="text-[40px] md:text-[80px] font-extrabold text-white">
          Samuel Lincoln
        </h1>
        <p className="text-white text-sm md:text-lg md:max-w-[800px] max-w-[300px]">
          {t("hero.description")}
        </p>
        <div className="flex flex-col md:flex-row md:gap-4">
          <button className="bg-white text-black px-4 py-2 rounded-md mt-4 hover:bg-gray-200 transition-colors md:text-xl text-sm">
            <a href="/curriculo-en.pdf">{t("hero.downloadEn")}</a>
          </button>
          <button className="bg-white text-black px-4 py-2 rounded-md mt-4 hover:bg-gray-200 transition-colors md:text-xl text-sm">
            <a href="/curriculo-pt.pdf">{t("hero.downloadPt")}</a>
          </button>
        </div>
      </div>
    </div>
  );
}
