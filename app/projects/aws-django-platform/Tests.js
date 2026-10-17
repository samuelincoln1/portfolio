"use client";
import React from "react";
import { useTranslation } from "next-i18next";
import CodeContainer from "../../components/util/CodeContainer";
import { Inline } from "./DocBlocks";
import { testsCode } from "./codeSnippets";

export default function Tests() {
  const { t } = useTranslation("platform");
  return (
    <div id="tests" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("platform.tests.title")}
      </h1>
      <p>{t("platform.tests.description")}</p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Terraform fmt
      </h2>
      <p>
        <Inline text={t("platform.tests.terraformFmt")} />
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Terraform validate
      </h2>
      <p>
        <Inline text={t("platform.tests.terraformValidate")} />
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Terraform plan
      </h2>
      <p>
        <Inline text={t("platform.tests.terraformPlan")} />
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("platform.tests.djangoTestsTitle")}
      </h2>
      <p>
        <Inline text={t("platform.tests.djangoTests")} />
      </p>
      <CodeContainer fileName="app/core/tests.py" language="python">
        {testsCode}
      </CodeContainer>
    </div>
  );
}
