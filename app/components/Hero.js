"use client";
import { useTranslation, Trans } from "next-i18next";

export default function Hero() {
  const { t, i18n } = useTranslation("common");

  return (
    <div className="container mx-auto md:mt-auto relative flex flex-col md:min-h-[calc(100vh-44px)] min-h-screen lg:flex-row gap-8 lg:gap-[106px] px-4 lg:px-0 items-center justify-center md:items-start md:justify-start">
      <div className="flex flex-col text-center mx-auto justify-center items-center mb-auto mt-40 md:mt-80 z-50 ">
        <p className="text-white text-2xl">{t("hero.title")}</p>
        <h1 className="text-[40px] md:text-[80px] font-extrabold text-white">
          Samuel Lincoln
        </h1>
        <p className="text-white text-sm md:text-lg md:max-w-[800px] max-w-[300px]">
          <Trans
            t={t}
            i18nKey="hero.description"
            components={{
              company: (
                <a
                  href="https://www.senior.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#06bd94] font-semibold hover:underline"
                />
              ),
            }}
          />
        </p>
        {/* Opens the resume in the language currently selected on the site. */}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`/samuel-lincoln-resume-${i18n.language === "pt" ? "pt" : "en"}.pdf`}
          className="bg-[#d5d7db] text-black px-4 py-2 rounded-md mt-4 hover:bg-white transition-colors md:text-xl text-sm"
        >
          {t("hero.viewResume")}
        </a>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 z-20">
        <button
          onClick={() => {
            const el = document.getElementById("experience-summary");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
          aria-label="Scroll down"
          className="p-2 hover:bg-black/80 transition mb-0 lg:mb-4"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
      </div>
    </div>
  );
}
