"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";

// Shared with the experience summary on the home page.
export function TimelineDot({ current }) {
  return (
    <span className="absolute -left-[7px] top-2 flex h-3 w-3">
      {current && (
        <span className="absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75 animate-ping motion-reduce:animate-none"></span>
      )}
      <span
        className={`relative inline-flex h-3 w-3 rounded-full ${
          current ? "bg-purple-500" : "bg-white/70"
        }`}
      ></span>
    </span>
  );
}

export function CurrentBadge({ label }) {
  return (
    <span className="text-[12px] md:text-[14px] text-purple-500 border border-purple-500/50 bg-purple-500/10 rounded-full px-3 py-0.5">
      {label}
    </span>
  );
}

function CompanyCard({ company, currentLabel }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`border border-white/20 hover:border-white/40 shadow-lg backdrop-blur-[3px] rounded-lg p-6 md:p-10 transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="grid md:grid-cols-[260px_1fr] gap-6 md:gap-12">
        <div>
          <h3 className="text-[22px] md:text-[30px] font-bold text-white leading-tight">
            {company.name}
          </h3>
          <p className="text-[14px] md:text-[16px] text-white/60 mt-2">
            {company.period}
          </p>
          {company.location && (
            <p className="text-[14px] md:text-[16px] text-white/60">
              {company.location}
            </p>
          )}
        </div>

        <ol className="relative border-l border-white/20 ml-1.5 space-y-10">
          {company.roles.map((role) => (
            <li key={role.title} className="relative pl-6 md:pl-8">
              <TimelineDot current={role.current} />

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h4 className="text-[18px] md:text-[24px] font-semibold text-white">
                  {role.title}
                </h4>
                {role.current && <CurrentBadge label={currentLabel} />}
              </div>
              <p className="text-[14px] md:text-[16px] text-white/60 mt-1">
                {role.period}
              </p>

              <ul className="mt-4 space-y-2">
                {role.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex text-[14px] md:text-[18px] text-white/90"
                  >
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-3 mt-[0.6em] shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mt-5">
                {role.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border border-white/20 bg-white/5 text-white/80 rounded-full px-3 py-1 text-[12px] md:text-[14px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function Experience() {
  const { t } = useTranslation("common");
  const companies = t("experience.companies", { returnObjects: true });

  return (
    <div id="experience" className="bg-black pt-16 relative">
      <div className="container mx-auto px-4 relative md:mt-12 mt-4 z-10">
        <h2 className="text-[24px] md:text-[35px] font-bold text-white">
          {t("experience.title")}
        </h2>
        <div className="flex flex-col gap-10 mt-2">
          {Array.isArray(companies) &&
            companies.map((company) => (
              <CompanyCard
                key={company.name}
                company={company}
                currentLabel={t("experience.current")}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
