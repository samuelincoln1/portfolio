"use client";
import React from "react";

export default function Result() {
  return (
    <div id="result">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        Result
      </h1>
      <div className="flex flex-col gap-4">
        <p>
          The result of this implementation is this very portfolio website
          you're currently viewing - a highly available, automatically deployed
          web application that demonstrates enterprise-grade DevOps practices in
          action. The site achieves <span className="text-[#00bd0d]">99.9% uptime</span> through AWS infrastructure,
          global performance via CloudFront edge locations, and <span className="text-[#00bd0d]">zero-downtime</span> {" "}
          deployments through the automated CI/CD pipeline. Every code change
          triggers an immediate, secure deployment process that maintains strict
          security standards through encrypted secrets management and
          least-privilege IAM policies, while delivering sub-second response
          times worldwide. This portfolio not only showcases technical projects
          but serves as a living demonstration of modern cloud architecture,
          automated deployment strategies, and professional software development
          practices.
        </p>
      </div>
    </div>
  );
}
