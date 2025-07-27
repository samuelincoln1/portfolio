"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function Content() {
  const { t } = useTranslation("articles");
  return (
    <div id="content">
      <div className="mb-10">
        <h1 className="text-[22px] lg:text-[40px] font-bold text-white text-center">
          Leveraging Microservices and Serverless Architectures on AWS
        </h1>
        <div>
          <p className="text-white text-center mt-6">
            Samuel Lincoln - July 27, 2025
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4 mb-6">
          <Image
            src="/images/mono.png"
            alt="trasitioning legacy applications to the cloud"
            width={1100}
            height={1100}
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-4 ">
          <p>
            Microservices architecture is an approach where an application is
            decomposed into a set of smaller, independent services, each
            responsible for a specific business capability. Instead of having a
            single, monolithic codebase and shared database, each microservice
            maintains its own code, database and lifecycle, which improves
            scalability and maintainability. In practice, applying this
            architecture means splitting the system along business domains to
            create loosely coupled services. Communication between them can
            happen through REST APIs — typically managed by an API Gateway — or
            via messaging systems such as Amazon SNS or SQS, which help to
            decouple services and add resilience to the overall architecture.
            This model also enables teams to work on different services
            independently, deploy them separately and scale only the parts of
            the system that actually need more capacity.
          </p>
          <h2 className="text-[20px] lg:text-[28px] font-bold text-white">
            Serverless architecture
          </h2>
          <p>
            "Serverless" is a cloud computing model where you write and deploy
            functions that run in response to events, without provisioning or
            managing servers directly. In this architecture, the cloud provider
            automatically handles scaling, availability and infrastructure
            maintenance. On AWS, serverless is most commonly implemented with
            services like AWS Lambda, which execute code on-demand when
            triggered by events such as API requests, file uploads or message
            queues. A practical way to use serverless alongside microservices is
            to run core services in containers, while offloading asynchronous or
            event-driven tasks — like background data processing or
            notifications — to serverless functions. This approach combines the
            flexibility and fine-grained scaling of serverless with the
            structure and control offered by containerized microservices.
          </p>
          <h2 className="text-[20px] lg:text-[28px] font-bold text-white">
            Observability and Performance Monitoring
          </h2>
          <p>
            To ensure continuous monitoring and quickly detect issues, it’s
            important to implement centralized logging and observability across
            all services. In AWS, this can be done using CloudWatch to collect
            and aggregate logs, along with tools like Grafana to visualize key
            metrics in real time. Additionally, using AWS X-Ray to collect
            distributed traces helps identify performance bottlenecks and
            understand how requests flow through different microservices and
            serverless components. This end-to-end visibility is critical for
            maintaining reliability and optimizing the system over time.{" "}
          </p>
          <h2 className="text-[20px] lg:text-[28px] font-bold text-white">
            Conclusion
          </h2>
          <p>
            This design keeps each service independent and highly scalable,
            enabling the system to handle changes in demand with elasticity. By
            combining microservices and serverless components, and implementing
            centralized logging and tracing, the architecture maintains strong
            observability and resilience — ensuring the application remains
            robust, maintainable and ready to adapt to future business needs.
          </p>
        </div>
      </div>
    </div>
  );
}
