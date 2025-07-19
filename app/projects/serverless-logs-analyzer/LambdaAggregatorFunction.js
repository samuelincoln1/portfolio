"use client";
import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
// import { useTranslation } from "next-i18next";
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
  // const { t } = useTranslation("iac");
  return (
    <div
      id="lambda-aggregator-function"
      className="flex flex-col gap-4 lg:max-w-full"
    >
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        Lambda Aggregator Function
      </h1>
      <p>
        The Lambda Aggregator is a Python 3.11 serverless function designed to
        consolidate multiple CloudTrail log files from a single day into one
        aggregated file. This function is triggered by EventBridge every 12
        hours and performs log consolidation, compression, and cleanup
        operations to optimize storage and prepare data for analysis.
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        {/* {t("iac.vpcModule.featuresTitle")} */} Purpose
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Consolidate </strong>
          {/* {t("iac.vpcModule.igwDescription")} */} multiple daily CloudTrail
          log files into a single aggregated file.
        </li>
        <li className="mb-2">
          <strong>Reduce </strong>
          {/* {t("iac.vpcModule.vpcDescription")} */} the number of individual
          files for efficient processing.
        </li>
        <li className="mb-2">
          <strong>Cleanup </strong>
          {/* {t("iac.vpcModule.igwDescription")} */} original log files to
          optimize storage costs.
        </li>
        <li className="mb-2">
          <strong>Prepare </strong>
          {/* {t("iac.vpcModule.igwDescription")} */} data for the Lambda
          Analyzer function.
        </li>
      </ul>
      <p className="font-bold">Full code:</p>
      <CodeContainer fileName="lambda-aggregator/handler.py" language="python">
        {aggregatorFullCode}
      </CodeContainer>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Function workflow
      </h2>
      <p className="font-bold">1. Trigger and Initialization</p>
      <CodeContainer fileName="lambda-aggregator/handler.py" language="python">
        {aggregatorCodeTrigger}
      </CodeContainer>
      <p>
        The function is triggered by EventBridge every 12 hours and the target
        bucket is defined.
      </p>
      <p className="font-bold">2. Dynamic Path Construction</p>
      <CodeContainer fileName="lambda-aggregator/handler.py" language="python">
        {aggregatorCodeDynamicPath}
      </CodeContainer>
      <p>
        Calculates the current date and creates a dynamic prefix for the log
        files, in the format of
        AWSLogs/[AccountID]/CloudTrail/us-east-1/YYYY/MM/DD/
      </p>
      <p className="font-bold">3. File Discovery and Filtering</p>
      <CodeContainer fileName="lambda-aggregator/handler.py" language="python">
        {aggregatorCodeFileDiscovery}
      </CodeContainer>
      <p>
        Lists all objects in the current day's folder, filters for .json.gz
        files only, and excludes already aggregated files to prevent
        reprocessing.
      </p>
      <p className="font-bold">4. Data Aggregation</p>
      <CodeContainer fileName="lambda-aggregator/handler.py" language="python">
        {aggregatorCodeDataAggregation}
      </CodeContainer>
      <p>
        Downloads each individual log file, decompresses gzip content in memory,
        extracts Records array from each file, and consolidates all records into
        a single array.
      </p>
      <p className="font-bold">5. Output File Creation</p>
      <CodeContainer fileName="lambda-aggregator/handler.py" language="python">
        {aggregatorCodeOutputFile}
      </CodeContainer>
      <p>
        Generates a timestamp-based filename, compresses aggregated data using
        gzip, and uploads the consolidated file to S3 in the format
        YYYY-MM-DD-HH:MM-aggregated.json.gz.
      </p>
      <p className="font-bold">6. Cleanup Operations</p>
      <CodeContainer fileName="lambda-aggregator/handler.py" language="python">
        {aggregatorCleanupCode}
      </CodeContainer>
      <p>
        Deletes original individual log files while preserving the new
        aggregated file, optimizing storage costs and organization.
      </p>
      <p className="font-bold">7. Results</p>
      <p>
        The function completes successfully, consolidating logs and optimizing
        storage.
      </p>
      <p>Before the aggregation, the files are as follows:</p>
      <CodeContainer fileName="AWS S3" language="text">
        {aggregatorResultsBefore}
      </CodeContainer>
      <p>After the aggregation, the files are as follows:</p>
      <CodeContainer fileName="AWS S3" language="text">
        {aggregatorResultsAfter}
      </CodeContainer>
    </div>
  );
}
