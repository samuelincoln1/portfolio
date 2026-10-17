"use client";
import React from "react";
import { useTranslation } from "next-i18next";
import CodeContainer from "../../components/util/CodeContainer";
import { FeatureList, useList } from "./DocBlocks";
import {
  dockerfileCode,
  middlewareCode,
  staticSettingsCode,
  securitySettingsCode,
} from "./codeSnippets";

export default function Application() {
  const { t } = useTranslation("platform");
  return (
    <div id="application" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("platform.application.title")}
      </h1>
      <p>{t("platform.application.description")}</p>
      <FeatureList items={useList(t, "platform.application.features")} />
      <p>{t("platform.application.dockerfileDescription")}</p>
      <CodeContainer fileName="app/Dockerfile" language="docker">
        {dockerfileCode}
      </CodeContainer>
      <p>{t("platform.application.middlewareDescription")}</p>
      <CodeContainer fileName="app/app/middleware.py" language="python">
        {middlewareCode}
      </CodeContainer>
      <p>{t("platform.application.staticDescription")}</p>
      <CodeContainer fileName="app/app/settings.py" language="python">
        {staticSettingsCode}
      </CodeContainer>
      <p>{t("platform.application.securityDescription")}</p>
      <CodeContainer fileName="app/app/settings.py" language="python">
        {securitySettingsCode}
      </CodeContainer>
    </div>
  );
}
