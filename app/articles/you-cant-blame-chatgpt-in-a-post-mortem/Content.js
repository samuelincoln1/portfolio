"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const K = "articles.aiPostMortem";

// Thin bar under the top edge that fills as the reader moves through the text.
function ReadingProgress({ targetRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = null;
    const update = () => {
      frame = null;
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const value = total > 0 ? -rect.top / total : 1;
      setProgress(Math.min(1, Math.max(0, value)));
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [targetRef]);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[150] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-400 origin-left"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

function Paragraph({ children, dropCap = false }) {
  return (
    <p
      className={
        dropCap
          ? "first-letter:float-left first-letter:text-[68px] first-letter:leading-[0.85] first-letter:font-bold first-letter:text-purple-400 first-letter:mr-3 first-letter:mt-[6px]"
          : undefined
      }
    >
      {children}
    </p>
  );
}

function PullQuote({ children }) {
  return (
    <blockquote className="relative my-6 md:my-10 md:-mx-10 border-l-4 border-purple-500 pl-6 md:pl-10 py-2">
      <p
        className="text-[24px] md:text-[30px] leading-snug text-white italic"
        style={{
          fontFamily: "var(--font-article-serif), Georgia, 'Times New Roman', serif",
        }}
      >
        {children}
      </p>
    </blockquote>
  );
}

function SplitCard({ title, items, accent }) {
  return (
    <div
      className={`rounded-xl border p-6 ${
        accent
          ? "border-purple-500/40 bg-purple-500/[0.07]"
          : "border-[#2a2d35] bg-[#15181e]"
      }`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-[0.14em] mb-4 ${
          accent ? "text-purple-300" : "text-[#8b8f98]"
        }`}
      >
        {title}
      </p>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[16px] leading-relaxed text-[#d5d7db]">
            <span
              aria-hidden="true"
              className={`mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full ${
                accent ? "bg-purple-400" : "bg-[#6b6f78]"
              }`}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DivisionFigure({ split }) {
  return (
    <figure className="my-4 md:my-8 md:-mx-10">
      <div className="grid gap-4 md:grid-cols-2">
        <SplitCard title={split.aiTitle} items={split.aiItems} />
        <SplitCard title={split.meTitle} items={split.meItems} accent />
      </div>
      <figcaption className="mt-4 text-center text-[15px] text-[#8b8f98]">
        {split.caption}
      </figcaption>
    </figure>
  );
}

export default function Content() {
  const { t } = useTranslation("articles");
  const articleRef = useRef(null);

  const paragraphs = t(`${K}.paragraphs`, { returnObjects: true });
  const split = t(`${K}.split`, { returnObjects: true });
  const p = Array.isArray(paragraphs) ? paragraphs : [];

  return (
    <>
      <ReadingProgress targetRef={articleRef} />

      <article ref={articleRef} className="mx-auto w-full">
        {/* Header */}
        <header className="mx-auto max-w-[700px]">
          <Link
            href="/#articles"
            className="inline-flex items-center gap-2 text-sm text-[#8b8f98] transition-colors hover:text-purple-400"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t(`${K}.back`)}
          </Link>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-purple-400">
            {t(`${K}.tag`)}
          </p>
          <h1 className="mt-4 text-[34px] md:text-[54px] font-bold leading-[1.1] tracking-tight text-white">
            {t(`${K}.title`)}
          </h1>
          <p className="mt-5 text-[19px] md:text-[22px] leading-relaxed text-[#9ea3ad]">
            {t(`${K}.subtitle`)}
          </p>

          <div className="mt-8 flex items-center gap-4 border-t border-[#24272e] pt-6">
            <Image
              src="/images/eu.jpeg"
              alt={t(`${K}.author`)}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-purple-500/40"
            />
            <div className="flex flex-col">
              <span className="font-medium text-white">{t(`${K}.author`)}</span>
              <span className="text-sm text-[#8b8f98]">
                {t(`${K}.date`)} · {t(`${K}.readingTime`)}
              </span>
            </div>
          </div>
        </header>

        {/* Cover */}
        <div className="mx-auto mt-10 md:mt-14 max-w-[1000px] overflow-hidden rounded-2xl border border-[#24272e]">
          <Image
            src="/images/ai-post-mortem.jpg"
            alt=""
            width={1600}
            height={893}
            priority
            className="h-auto w-full"
          />
        </div>

        {/* Body */}
        <div className="mx-auto mt-12 md:mt-16 flex max-w-[700px] flex-col gap-7 text-[18px] md:text-[19px] leading-[1.8] text-[#c9ccd3]">
          <Paragraph dropCap>{p[0]}</Paragraph>
          <Paragraph>{p[1]}</Paragraph>

          <PullQuote>{t(`${K}.quote1`)}</PullQuote>

          <Paragraph>{p[2]}</Paragraph>
          <Paragraph>{p[3]}</Paragraph>
          <Paragraph>{p[4]}</Paragraph>
          <Paragraph>{p[5]}</Paragraph>

          {split && split.aiItems && <DivisionFigure split={split} />}

          <Paragraph>{p[6]}</Paragraph>
          <Paragraph>{p[7]}</Paragraph>

          <PullQuote>{t(`${K}.quote2`)}</PullQuote>

          {p.slice(8).map((text, i) => (
            <Paragraph key={i}>{text}</Paragraph>
          ))}

          <div aria-hidden="true" className="flex justify-center gap-3 pt-4 text-purple-400/70">
            <span>●</span>
            <span>●</span>
            <span>●</span>
          </div>

          {/* Author card */}
          <aside className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-2xl border border-[#24272e] bg-[#15181e] p-6">
            <Image
              src="/images/eu.jpeg"
              alt={t(`${K}.author`)}
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-purple-500/40"
            />
            <div className="flex flex-col gap-2">
              <span className="text-lg font-semibold text-white">{t(`${K}.author`)}</span>
              <span className="text-[16px] leading-relaxed text-[#9ea3ad]">{t(`${K}.bio`)}</span>
              <div className="flex gap-5 text-[15px]">
                <a
                  href="https://www.linkedin.com/in/samuel-lincoln-213429209/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:underline"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/samuelincoln1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:underline"
                >
                  GitHub
                </a>
                <Link href="/#articles" className="text-purple-400 hover:underline">
                  {t(`${K}.back`)}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
