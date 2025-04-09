import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import { rdsInstanceCode, rdsSubnetGroupCode } from "./codeSnippets";

export default function RDSModule() {
  return (
    <div id="rds-module" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        RDS Module
      </h1>
      <p>
        The RDS (Relational Database Service) module is designed to provision
        and manage a relational database instance on AWS. This module simplifies
        the deployment of a database by handling the configuration of the
        database engine, storage, networking, and security settings, ensuring a
        robust and scalable database solution.
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Features
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>RDS Instance: </strong>Provisions a database instance with
          specified engine and version.
        </li>
        <li className="mb-2">
          <strong>Subnet Group: </strong>Configures a subnet group for the RDS
          instance to ensure high availability.
        </li>
        <li className="mb-2">
          <strong>Security Group: </strong>Manages security groups to control
          access to the database.
        </li>
      </ul>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Resources
      </h2>
      <p>1. RDS Instance</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6e5da9]">aws_rds_instance</span>
          <ul className="list-disc pl-5 ml-5">
            <li>
              <span className="text-[#6e5da9]">identifier_prefix</span>: A
              unique prefix for the RDS instance identifier.
            </li>
            <li>
              <span className="text-[#6e5da9]">engine</span>: The database
              engine to use (e.g., MySQL, PostgreSQL).
            </li>
            <li>
              <span className="text-[#6e5da9]">engine_version</span>: The
              version of the database engine.
            </li>
            <li>
              <span className="text-[#6e5da9]">instance_class</span>: The
              instance type for database engine.
            </li>
            <li>
              <span className="text-[#6e5da9]">allocated_storage</span>: The
              amount of storage allocated to the database.
            </li>
            <li>
              <span className="text-[#6e5da9]">username</span>: The master
              username for the database.
            </li>
            <li>
              <span className="text-[#6e5da9]">password</span>: The master
              password for the database.
            </li>
            <li>
              <span className="text-[#6e5da9]">vpc_security_group_ids</span>:
              List of security group IDs associated with the RDS instance.
            </li>
            <li>
              <span className="text-[#6e5da9]">db_subnet_group_name</span>: The
              subnet group name for the database.
            </li>
            <li>
              <span className="text-[#6e5da9]">skip_final_snapshot</span>:
              Whether to skip the final snapshot when the database is deleted.
            </li>
          </ul>
        </li>
      </ul>
      <CodeContainer fileName="rds/main.tf">{rdsInstanceCode}</CodeContainer>
      <p>2. DB Subnet Group</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6e5da9]">aws_db_subnet_group</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6e5da9]">name</span>: The name of the DB
            subnet group.
          </li>
          <li>
            <span className="text-[#6e5da9]">subnet_ids</span>: List of subnet
            IDs for the DB subnet group.
          </li>
          <li>
            <span className="text-[#6e5da9]">tags</span>: Assigns a name tag to
            the subnet group for identification.
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="rds/main.tf">{rdsSubnetGroupCode}</CodeContainer>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Variables and Outputs
      </h2>
      <p>
        The module uses several input variables to customize the deployment,
        such as <span className="text-[#6e5da9]">engine</span>,{" "}
        <span className="text-[#6e5da9]">engine_version</span>,{" "}
        <span className="text-[#6e5da9]">instance_class</span>, and others.
        These variables are defined in the{" "}
        <code className="text-[#EC585D]">variables.tf</code> file and allow for
        flexible configuration of the RDS and its components. Additionally, the{" "}
        <span className="text-[#6e5da9]">username</span> and{" "}
        <span className="text-[#6e5da9]">password</span> variables must be
        defined as environment variables and not hardcoded, for security
        reasons.
      </p>
    </div>
  );
}
