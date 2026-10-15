"use client";

import Link from "next/link";
import { useTranslation } from "next-i18next";
import { TimelineDot, CurrentBadge } from "./about/Experience";

// Compact timeline for the home page: one line per role, linking to the full
// experience section on /about. Reads the same translation data as that section.
export default function ExperienceSummary() {
  const { t } = useTranslation("common");
  const companies = t("experience.companies", { returnObjects: true });
  const roles = Array.isArray(companies)
    ? companies.flatMap((company) => company.roles.map((role) => ({ ...role, company: company.name })))
    : [];

  return (
    <div id="experience-summary" className="relative z-10 px-4 md:px-0 mt-20 md:mt-30 scroll-mt-24">
      <h2 className="text-white md:text-[48px] text-[36px] font-bold">
        {t("experience.title")}
      </h2>
      <div className="mt-6 border border-white/20 shadow-lg backdrop-blur-[3px] rounded-lg p-6 md:p-10">
        <ol className="relative border-l border-white/20 ml-1.5 space-y-6">
          {roles.map((role) => (
            <li key={role.title} className="relative pl-6 md:pl-8">
              <TimelineDot current={role.current} />
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="text-[16px] md:text-[20px] text-white">
                    <span className="font-semibold">{role.title}</span>
                    <span className="block md:inline text-white/60">
                      <span className="hidden md:inline"> · </span>
                      {role.company}
                    </span>
                  </p>
                  {role.current && <CurrentBadge label={t("experience.current")} />}
                </div>
                <p className="text-[14px] md:text-[16px] text-white/60 shrink-0">{role.period}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex justify-end">
          <Link
            href="/about#experience"
            className="group inline-flex items-center gap-2 text-[16px] md:text-[18px] text-white transition-colors hover:text-purple-500"
          >
            {t("experience.seeFull")}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
