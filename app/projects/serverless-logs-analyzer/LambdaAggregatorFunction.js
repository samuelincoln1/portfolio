"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import { useTranslation } from "next-i18next";
import {
  aggregatorCodeTrigger,
  aggregatorCodeDynamicPath,
  aggregatorCodeFileDiscovery,
  aggregatorCodeDataAggregation,
  aggregatorCodeOutputFile,
  aggregatorCleanupCode,
  aggregatorFullCode,
  aggregatorResultsBefore,
  aggregatorResultsAfter
} from "./codeSnippets";

export default function LambdaAggregatorFunction() {
  const { t } = useTranslation("analyzer");
  return (
    <div
      id="lambda-aggregator-function"
      className="flex flex-col gap-4 lg:max-w-full"
    >
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("analyzer.lambdaAggregatorFunction.title")}
      </h1>
      <p>
        {t("analyzer.lambdaAggregatorFunction.description")}
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("analyzer.lambdaAggregatorFunction.purposeTitle")}
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>
            {t("analyzer.lambdaAggregatorFunction.purposes.consolidateTitle")}{" "}
          </strong>
          {t("analyzer.lambdaAggregatorFunction.purposes.consolidateDescription")}
        </li>
        <li className="mb-2">
          <strong>
            {t("analyzer.lambdaAggregatorFunction.purposes.reduceTitle")}{" "}
          </strong>
          {t("analyzer.lambdaAggregatorFunction.purposes.reduceDescription")}
        </li>
        <li className="mb-2">
          <strong>
            {t("analyzer.lambdaAggregatorFunction.purposes.cleanupTitle")}{" "}
          </strong>
          {t("analyzer.lambdaAggregatorFunction.purposes.cleanupDescription")}
        </li>
        <li className="mb-2">
          <strong>
            {t("analyzer.lambdaAggregatorFunction.purposes.prepareTitle")}{" "}
          </strong>
          {t("analyzer.lambdaAggregatorFunction.purposes.prepareDescription")}
        </li>
      </ul>
      <p className="font-bold">
        {t("analyzer.lambdaAggregatorFunction.fullCode")}:
      </p>
      <CodeContainer fileName="lambda-aggregator/handler.py" language="python">
        {aggregatorFullCode}
      </CodeContainer>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("analyzer.lambdaAggregatorFunction.functionWorkflow")}
      </h2>
      <p className="font-bold">
        {t("analyzer.lambdaAggregatorFunction.triggerAndInitialization.title")}
      </p>
      <CodeContainer fileName="lambda-aggregator/handler.py" language="python">
        {aggregatorCodeTrigger}
      </CodeContainer>
      <p>
        {t("analyzer.lambdaAggregatorFunction.triggerAndInitialization.description")}
      </p>
      <p className="font-bold">
        {t("analyzer.lambdaAggregatorFunction.dynamicPath.title")}
      </p>
      <CodeContainer fileName="lambda-aggregator/handler.py" language="python">
        {aggregatorCodeDynamicPath}
      </CodeContainer>
      <p>
        {t("analyzer.lambdaAggregatorFunction.dynamicPath.description")}
      </p>
      <p className="font-bold">
        {t("analyzer.lambdaAggregatorFunction.fileDiscovery.title")}
      </p>
      <CodeContainer fileName="lambda-aggregator/handler.py" language="python">
        {aggregatorCodeFileDiscovery}
      </CodeContainer>
      <p>
        {t("analyzer.lambdaAggregatorFunction.fileDiscovery.description")}
      </p>
      <p className="font-bold">
        {t("analyzer.lambdaAggregatorFunction.dataAggregation.title")}
      </p>
      <CodeContainer fileName="lambda-aggregator/handler.py" language="python">
        {aggregatorCodeDataAggregation}
      </CodeContainer>
      <p>
        {t("analyzer.lambdaAggregatorFunction.dataAggregation.description")}
      </p>
      <p className="font-bold">
        {t("analyzer.lambdaAggregatorFunction.outputFile.title")}
      </p>
      <CodeContainer fileName="lambda-aggregator/handler.py" language="python">
        {aggregatorCodeOutputFile}
      </CodeContainer>
      <p>
        {t("analyzer.lambdaAggregatorFunction.outputFile.description")}
      </p>
      <p className="font-bold">
        {t("analyzer.lambdaAggregatorFunction.cleanup.title")}
      </p>
      <CodeContainer fileName="lambda-aggregator/handler.py" language="python">
        {aggregatorCleanupCode}
      </CodeContainer>
      <p>
        {t("analyzer.lambdaAggregatorFunction.cleanup.description")}
      </p>
      <p className="font-bold">
        {t("analyzer.lambdaAggregatorFunction.results.title")}
      </p>
      <p>
        {t("analyzer.lambdaAggregatorFunction.results.description1")}
      </p>
      <p>
        {t("analyzer.lambdaAggregatorFunction.results.description2")}
      </p>
      <CodeContainer fileName="AWS S3" language="text">
        {aggregatorResultsBefore}
      </CodeContainer>
      <p>
        {t("analyzer.lambdaAggregatorFunction.results.description3")}
      </p>
      <CodeContainer fileName="AWS S3" language="text">
        {aggregatorResultsAfter}
      </CodeContainer>
    </div>
  );
}
