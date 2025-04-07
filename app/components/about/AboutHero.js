
"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";  

export default function AboutHero() {
  const { t } = useTranslation("common");
  return (
    <>
      <div className="container mx-auto 2xl:my-10 px-4 py-16 relative z-10 md:mt-20 min-h-screen flex items-center justify-center">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[106px] items-center justify-center lg:items-start mb-20">
          <div className="flex flex-col gap-[20px] mx-auto md:mx-0 text-center lg:text-left">
            <h1 className="text-[40px] md:text-[80px] font-extrabold text-white">
            {t("about.title")}
            </h1>
            <div className="text-[14px] md:text-[18px] max-w-[300px] md:max-w-[750px] text-white space-y-6">
              <p>
                {t("about.description")} asdasdasd
              </p>
              <p>
                {t("about.description2")}
              </p>
              <p>
                {t("about.description3")}
              </p>
            </div>
          </div>
          <div className="self-center md:self-start mt-8 md:mt-0 hidden xl:block">
            <Image
              src="/images/profile.jpg"
              alt="Samuel Gomes"
              width={500}
              height={500}
              className="rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
} 