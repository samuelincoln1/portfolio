"use client";
import React from "react";

export default function Overview() {
  return (
    <div id="overview">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        Overview
      </h1>
      <div className="flex flex-col gap-4">
        
        <p>
          This project transforms a manual deployment process into a fully automated GitHub Actions 
          workflow that builds, tests, and deploys to AWS S3 + CloudFront on every code push. 
          What makes this implementation particularly interesting is that it serves both as a 
          functional solution and a live demonstration of DevOps best practices.
        </p>
        
        <p>
          <strong>The Challenge:</strong> Setting up a robust CI/CD pipeline that handles dependency 
          management, build optimization, AWS credentials security, and automated deployments while 
          ensuring reliable delivery and proper cache invalidation across the CloudFront distribution.
        </p>
        
        <p>
          <strong>Live Result:</strong> This very page you're reading was deployed automatically 
          through the implemented pipeline, demonstrating the system in action.
        </p>
      </div>
    </div>
  );
}
