import React from "react";
import Image from "next/image";

export default function ArchitectureDiagram() {
  return (
    <div id="architecture-diagram" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        Architecture Diagram
      </h1>
      <p>The architecture diagram below shows the infrastructure, which includes:</p>
      <ul className="list-disc pl-5">
        <li>
          <strong>VPC:</strong> A Virtual Private Cloud with public
          and private subnets across two availability zones.
        </li>
        <li>
          <strong>ALB:</strong> An Application Load Balancer to
          distribute incoming traffic across multiple instances.
        </li>
        <li>
          <strong>ASG:</strong> An Auto Scaling Group to ensure the
          application scales based on demand.
        </li>
        <li>
          <strong>RDS:</strong> A managed MySQL database instance for
          persistent data storage.
        </li>
      </ul>
      <p className="mt-4">
        Users access the application via the internet through the
        public ALB DNS, which efficiently distributes traffic across
        instances within the Auto Scaling Group. This group is
        configured to dynamically adjust the number of instances based
        on demand. The RDS serves as the application&apos;s data
        storage solution. All EC2 instances reside in private subnets,
        ensuring they are not directly accessible from the internet,
        similar to the RDS.
      </p>
      <figure>
        <Image
          src="../images/projects/infra-as-code/iac-architecture-diagram.png"
          alt="Architecture Diagram"
          width={1000}
          height={1000}
          className="border-2 border-black rounded-lg shadow-lg"
        />
        <figcaption className="mt-2">
          <p>
            Diagram created with Lucidchart:{" "}
            <a
              href="https://www.lucidchart.com/pages/landing"
              target="_blank"
              className="underline text-blue-500 hover:text-blue-400"
            >
              https://www.lucidchart.com/pages/landing
            </a>
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
