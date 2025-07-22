"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import { useTranslation } from "next-i18next";
import {
  analyzerHandlerCode,
  analyzerExporterCode,
  analyzerAnalyzerCode,
  analyzerHandlerTriggerCode,
  analyzerDownloadCode,
  analyzerDecompressionCode,
  analyzerValidationCode,
  analyzerAnalysisCode,
  analyzerExportCode,
  analyzerUploadCode,
  analyzerOutputExample,
  analyzerOutputStructure
} from "./codeSnippets";

export default function LambdaAnalyzerFunction() {
  const { t } = useTranslation("analyzer");
  return (
    <div
      id="lambda-analyzer-function"
      className="flex flex-col gap-4 lg:max-w-full"
    >
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        {t("analyzer.lambdaAnalyzerFunction.title")}
      </h1>
      <p>
        {t("analyzer.lambdaAnalyzerFunction.description")}
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("analyzer.lambdaAnalyzerFunction.purposeTitle")}
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>{t("analyzer.lambdaAnalyzerFunction.purposes.processTitle")}</strong>
          {t("analyzer.lambdaAnalyzerFunction.purposes.processDescription")}
        </li>
        <li className="mb-2">
          <strong>
            {t("analyzer.lambdaAnalyzerFunction.purposes.analyzeTitle")}
          </strong>
          {t("analyzer.lambdaAnalyzerFunction.purposes.analyzeDescription")}
        </li>
        <li className="mb-2">
          <strong>
            {t("analyzer.lambdaAnalyzerFunction.purposes.generateTitle")}
          </strong>
          {t("analyzer.lambdaAnalyzerFunction.purposes.generateDescription")}
        </li>
        <li className="mb-2">
          <strong>
            {t("analyzer.lambdaAnalyzerFunction.purposes.exportTitle")}
          </strong>
          {t("analyzer.lambdaAnalyzerFunction.purposes.exportDescription")}
        </li>
      </ul>
      <p className="font-bold">
        {t("analyzer.lambdaAnalyzerFunction.handlerCode")}
      </p>
      <CodeContainer fileName="lambda-analyzer/handler.py" language="python">
        {analyzerHandlerCode}
      </CodeContainer>
      <p className="font-bold">
        {t("analyzer.lambdaAnalyzerFunction.analyzerCode")}
      </p>
      <CodeContainer fileName="lambda-analyzer/analyzer.py" language="python">
        {analyzerAnalyzerCode}
      </CodeContainer>
      <p className="font-bold">
        {t("analyzer.lambdaAnalyzerFunction.exportCode")}
      </p>
      <CodeContainer fileName="lambda-analyzer/exporter.py" language="python">
        {analyzerExporterCode}
      </CodeContainer>

      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {t("analyzer.lambdaAnalyzerFunction.functionWorkflow")}
      </h2>
      <p className="font-bold">
        {t("analyzer.lambdaAnalyzerFunction.trigger.title")}
      </p>
      <CodeContainer fileName="lambda-analyzer/handler.py" language="python">
        {analyzerHandlerTriggerCode}
      </CodeContainer>
      <p>
        {t("analyzer.lambdaAnalyzerFunction.trigger.description")}
      </p>
      <p className="font-bold">
        {t("analyzer.lambdaAnalyzerFunction.fileDownload.title")}
      </p>
      <CodeContainer fileName="lambda-analyzer/handler.py" language="python">
        {analyzerDownloadCode}
      </CodeContainer>
      <p>
        {t("analyzer.lambdaAnalyzerFunction.fileDownload.description")}
      </p>
      <p className="font-bold">
        {t("analyzer.lambdaAnalyzerFunction.fileDecompression.title")}
      </p>
      <CodeContainer fileName="lambda-analyzer/handler.py" language="python">
        {analyzerDecompressionCode}
      </CodeContainer>
      <p>
        {t("analyzer.lambdaAnalyzerFunction.fileDecompression.description")}
      </p>
      <p className="font-bold">
        {t("analyzer.lambdaAnalyzerFunction.fileValidation.title")}
      </p>
      <CodeContainer fileName="lambda-analyzer/handler.py" language="python">
        {analyzerValidationCode}
      </CodeContainer>
      <p>
        {t("analyzer.lambdaAnalyzerFunction.fileValidation.description")}
      </p>
      <p className="font-bold">
        {t("analyzer.lambdaAnalyzerFunction.dataAnalysis.title")}
      </p>
      <CodeContainer fileName="lambda-analyzer/analyzer.py" language="python">
        {analyzerAnalysisCode}
      </CodeContainer>
      <p>
        {t("analyzer.lambdaAnalyzerFunction.dataAnalysis.description")}
      </p>
      <p className="font-bold">
        {t("analyzer.lambdaAnalyzerFunction.dataExport.title")}
      </p>
      <CodeContainer fileName="lambda-analyzer/exporter.py" language="python">
        {analyzerExportCode}
      </CodeContainer>
      <p>
        {t("analyzer.lambdaAnalyzerFunction.dataExport.description")}
      </p>
      <p className="font-bold">
        {t("analyzer.lambdaAnalyzerFunction.output.title")}
      </p>
      <CodeContainer fileName="lambda-analyzer/handler.py" language="python">
        {analyzerUploadCode}
      </CodeContainer>
      <p>
        {t("analyzer.lambdaAnalyzerFunction.output.description")}
      </p>
      <p className="font-bold">
        {t("analyzer.lambdaAnalyzerFunction.results.title")}
      </p>
      <p>
        {t("analyzer.lambdaAnalyzerFunction.results.description")}
      </p>
      <CodeContainer fileName="2025-07-15-14:30-insights.json" language="json">
        {analyzerOutputExample}
      </CodeContainer>
      <CodeContainer fileName="AWS S3" language="text">
        {analyzerOutputStructure}
      </CodeContainer>
    </div>
  );
}
