"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
// import { useTranslation } from "next-i18next";
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
  // const { t } = useTranslation("iac");
  return (
    <div
      id="lambda-analyzer-function"
      className="flex flex-col gap-4 lg:max-w-full"
    >
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        Lambda Analyzer Function
      </h1>
      <p>
        The Lambda Analyzer is a Python 3.11 serverless function designed to
        process aggregated CloudTrail log files and generate comprehensive
        statistical insights about AWS account activities. This function is
        triggered automatically by S3 ObjectCreated events when aggregated log
        files are uploaded, and it produces detailed reports in both JSON and
        CSV formats for further analysis.
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {/* {t("iac.vpcModule.featuresTitle")} */} Purpose
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Process </strong>
          {/* {t("iac.vpcModule.igwDescription")} */} aggregated CloudTrail log
          files to extract meaningful insights.
        </li>
        <li className="mb-2">
          <strong>Analyze </strong>
          {/* {t("iac.vpcModule.vpcDescription")} */} AWS account activities and
          usage patterns.
        </li>
        <li className="mb-2">
          <strong>Generate </strong>
          {/* {t("iac.vpcModule.igwDescription")} */} statistical reports on
          events, resources, regions, and user activities.
        </li>
        <li className="mb-2">
          <strong>Export </strong>
          {/* {t("iac.vpcModule.igwDescription")} */} results in multiple
          formats (JSON and CSV) for dashboard integration.
        </li>
      </ul>
      <p className="font-bold">Handler code:</p>
      <CodeContainer fileName="lambda-analyzer/handler.py" language="python">
        {analyzerHandlerCode}
      </CodeContainer>
      <p className="font-bold">Analyzer code:</p>
      <CodeContainer fileName="lambda-analyzer/analyzer.py" language="python">
        {analyzerAnalyzerCode}
      </CodeContainer>
      <p className="font-bold">Exporter code:</p>
      <CodeContainer fileName="lambda-analyzer/exporter.py" language="python">
        {analyzerExporterCode}
      </CodeContainer>

      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Function workflow
      </h2>
      <p className="font-bold">1.Trigger and S3 Event Processing</p>
      <CodeContainer fileName="lambda-analyzer/handler.py" language="python">
        {analyzerHandlerTriggerCode}
      </CodeContainer>
      <p>
        The function is triggered automatically by S3 ObjectCreated events when
        new files are uploaded to the input bucket. It extracts bucket name and
        object key from the S3 event payload.
      </p>
      <p className="font-bold">2. File Download and Path Setup</p>
      <CodeContainer fileName="lambda-analyzer/handler.py" language="python">
        {analyzerDownloadCode}
      </CodeContainer>
      <p>
        Downloads the triggered file from S3 to the Lambda's /tmp directory for
        local processing, and extracts the base filename for future use
      </p>
      <p className="font-bold">3. File Decompression</p>
      <CodeContainer fileName="lambda-analyzer/handler.py" language="python">
        {analyzerDecompressionCode}
      </CodeContainer>
      <p>
        Decompresses the gzipped log file to extract the JSON content, creating
        a readable JSON file in the Lambda's temporary storage
      </p>
      <p className="font-bold">4. Aggregated File Validation and Processing</p>
      <CodeContainer fileName="lambda-analyzer/handler.py" language="python">
        {analyzerValidationCode}
      </CodeContainer>
      <p>
        Validates that the file is an aggregated log file before processing. If
        valid, calls the analyzer module to process the logs and defines output
        paths for the insights files.
      </p>
      <p className="font-bold">5. Data Analysis and Insights Generation</p>
      <CodeContainer fileName="lambda-analyzer/analyzer.py" language="python">
        {analyzerAnalysisCode}
      </CodeContainer>
      <p>
        Processes the JSON log file to extract and count various metrics
        including event names, resource types, regions, source IPs, event types,
        event categories, and user identity types.
      </p>
      <p className="font-bold">6. Data Export and Format Conversion</p>
      <CodeContainer fileName="lambda-analyzer/exporter.py" language="python">
        {analyzerExportCode}
      </CodeContainer>
      <p>
        Exports the generated insights to both JSON (complete data structure)
        and CSV (event counts only) formats for different use cases and
        integrations.
      </p>
      <p className="font-bold">7. Output Upload to S3</p>
      <CodeContainer fileName="lambda-analyzer/handler.py" language="python">
        {analyzerUploadCode}
      </CodeContainer>
      <p>
        Uploads the generated insights to the output S3 bucket in the specified
        paths, completing the analysis process.
      </p>
      <p className="font-bold">8. Results</p>
      <p>The output files are structured as follows:</p>
      <CodeContainer fileName="2025-07-15-14:30-insights.json" language="json">
        {analyzerOutputExample}
      </CodeContainer>
      <CodeContainer fileName="AWS S3" language="text">
        {analyzerOutputStructure}
      </CodeContainer>
    </div>
  );
}
