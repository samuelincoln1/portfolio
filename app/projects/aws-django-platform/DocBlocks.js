"use client";
import React from "react";
import { useTranslation } from "next-i18next";
import CodeContainer from "../../components/util/CodeContainer";

// Translations mark inline code with backticks: "the `main.tf` file"
export function Inline({ text }) {
  if (typeof text !== "string") return null;
  return (
    <>
      {text.split(/(`[^`]+`)/).map((part, index) =>
        part.length > 2 && part.startsWith("`") && part.endsWith("`") ? (
          <code key={index} className="text-[#EC585D]">
            {part.slice(1, -1)}
          </code>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

export function useList(t, key) {
  const value = t(key, { returnObjects: true });
  return Array.isArray(value) ? value : [];
}

export function FeatureList({ items, ordered = false, separator = "" }) {
  return (
    <ul className={`${ordered ? "list-decimal" : "list-disc"} pl-5`}>
      {items.map((item) => (
        <li key={item.name} className="mb-2">
          <strong>
            {item.name}
            {separator}
          </strong>
          <Inline text={item.description} />
        </li>
      ))}
    </ul>
  );
}

export function ResourceBlock({ number, resource, label, code, fileName, language }) {
  return (
    <>
      <p>
        {number}. {resource.title}
      </p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>{label} </strong>
          <span className="text-[#6e5da9]">{resource.resource}</span>
          <ul className="list-disc pl-5 ml-5">
            {resource.attributes.map((attribute) => (
              <li key={attribute.name}>
                <span className="text-[#6e5da9]">{attribute.name}</span>:{" "}
                <Inline text={attribute.description} />
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <CodeContainer fileName={fileName} language={language}>
        {code}
      </CodeContainer>
    </>
  );
}

// Layout shared by the Terraform module sections: description, features,
// numbered resources with their code, and variables/outputs.
export function ModuleSection({ id, section, snippets, children }) {
  const { t } = useTranslation("platform");
  const resources = useList(t, `platform.${section}.resources`);

  return (
    <div id={id} className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t(`platform.${section}.title`)}
      </h1>
      <p>
        <Inline text={t(`platform.${section}.description`)} />
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("platform.common.features")}
      </h2>
      <FeatureList items={useList(t, `platform.${section}.features`)} />
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("platform.common.resources")}
      </h2>
      {resources.map((resource, index) => (
        <ResourceBlock
          key={resource.title}
          number={index + 1}
          resource={resource}
          label={t("platform.common.resource")}
          {...snippets[index]}
        />
      ))}
      {children}
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("platform.common.variablesAndOutputs")}
      </h2>
      <p>
        <Inline text={t(`platform.${section}.variablesAndOutputs`)} />
      </p>
    </div>
  );
}
