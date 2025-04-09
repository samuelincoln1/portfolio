import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import {
  vpcCode,
  internetGatewayCode,
  subnetsCode,
  routeTablesCode,
  routeTableAssociationsCode,
} from "./codeSnippets";

export default function VPCModule() {
  return (
    <div id="vpc-module" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        VPC Module
      </h1>
      <p>
        This module is designed to create a Virtual Private Cloud
        (VPC) on AWS, along with associated resources such as subnets,
        internet gateways, and route tables. The architecture is
        structured to support two public and three private subnets
        across multiple availability zones, providing a robust and
        scalable network infrastructure. The two public subnets are
        used to host the ALB and the three private subnets are used to
        host the RDS and the EC2 instances.
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Features
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>VPC: </strong>Creates a VPC with DNS and hostname
          support.
        </li>
        <li className="mb-2">
          <strong>Internet Gateway: </strong>Provisions an internet
          gateway to allow inbound and outbound traffic.
        </li>
        <li className="mb-2">
          <strong>Subnets: </strong>Configures public and private
          subnets across multiple availability zones.
        </li>
        <li className="mb-2">
          <strong>Route Tables: </strong>Configures route tables to
          manage network traffic.
        </li>
        <li className="mb-2">
          <strong>Route Table Associations: </strong>Associates
          subnets with the appropriate route tables.
        </li>
      </ul>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Resources
      </h2>
      <p>1. Virtual Private Cloud (VPC)</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6183BB]">aws_vpc.main</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6183BB]">cidr_block</span>: The
            CIDR block for the VPC.
          </li>
          <li>
            <span className="text-[#6183BB]">enable_dns_hostnames</span>
            : Whether to enable DNS hostnames in the VPC.
          </li>
          <li>
            <span className="text-[#6183BB]">enable_dns_support</span>
            : Whether to enable DNS support in the VPC.
          </li>
          <li>
            <span className="text-[#6183BB]">tags</span>: Assigns a
            name tag to the VPC for identification.
          </li>
        </ul>
      </ul>
      <CodeContainer>{vpcCode}</CodeContainer>
      <p>2. Internet Gateway</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6183BB]">aws_internet_gateway</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6183BB]">vpc_id</span>: The ID of
            the VPC to which the internet gateway is attached.
          </li>
          <li>
            <span className="text-[#6183BB]">tags</span>: Assigns a
            name tag to the internet gateway.
          </li>
        </ul>
      </ul>
      <CodeContainer>{internetGatewayCode}</CodeContainer>
      <p>3. Subnets</p>
      <p>
        <strong>Public Subnets</strong>
      </p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6183BB]">aws_subnet</span>
          <ul className="list-disc pl-5 ml-5">
            <li>
              <span className="text-[#6183BB]">vpc_id</span>: The ID
              of the VPC to which the subnet is associated.
            </li>
            <li>
              <span className="text-[#6183BB]">cidr_block</span>: The
              CIDR block for the subnet.
            </li>
            <li>
              <span className="text-[#6183BB]">
                map_public_ip_on_launch
              </span>
              : Enable to assign a public IP to instances launched in
              this subnet.
            </li>
            <li>
              <span className="text-[#6183BB]">availability_zone</span>
              : The availability zone for the subnet.
            </li>
            <li>
              <span className="text-[#6183BB]">tags</span>: Assigns a
              name tag to the subnet.
            </li>
          </ul>
        </li>
      </ul>
      <p>
        <strong>Private Subnets</strong>
      </p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6183BB]">aws_subnet</span>
          <ul className="list-disc pl-5 ml-5">
            <li>
              <span className="text-[#6183BB]">vpc_id</span>: The ID
              of the VPC to which the subnet is associated.
            </li>
            <li>
              <span className="text-[#6183BB]">cidr_block</span>: The
              CIDR block for the subnet.
            </li>
            <li>
              <span className="text-[#6183BB]">
                map_public_ip_on_launch
              </span>
              : Disable to block automatic public IP assignment to
              instances launched in this subnet.
            </li>
            <li>
              <span className="text-[#6183BB]">availability_zone</span>
              : The availability zone for the subnet.
            </li>
            <li>
              <span className="text-[#6183BB]">tags</span>: Assigns a
              name tag to the subnet.
            </li>
          </ul>
        </li>
      </ul>
      <CodeContainer>{subnetsCode}</CodeContainer>
      <p>4. Route Tables</p>
      <p>
        <strong>Public Route Table</strong>
      </p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6183BB]">aws_route_table</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6183BB]">vpc_id</span>: The ID of
            the VPC to which the route table is associated.
          </li>
          <li>
            <span className="text-[#6183BB]">route</span>: includes a
            route for{" "}
            <span className="text-[#6183BB]">0.0.0.0/0</span> through
            the internet gateway. (
            <span className="text-[#6183BB]">
              aws_internet_gateway.main.id
            </span>
            )
          </li>
          <li>
            <span className="text-[#6183BB]">tags</span>: Assigns a
            name tag to the route table.
          </li>
        </ul>
      </ul>
      <p>
        <strong>Private Route Table</strong>
      </p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6183BB]">aws_route_table</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6183BB]">vpc_id</span>: The ID of
            the VPC to which the route table is associated.
          </li>
          <li>
            <span className="text-[#6183BB]">tags</span>: Assigns a
            name tag to the route table.
          </li>
        </ul>
      </ul>
      <CodeContainer>{routeTablesCode}</CodeContainer>
      <p>5. Route Table Associations</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Public Subnets: </strong>Associated with the public
          route table.
        </li>
        <li className="mb-2">
          <strong>Private Subnets: </strong>Associated with the
          private route table.
        </li>
      </ul>
      <CodeContainer>{routeTableAssociationsCode}</CodeContainer>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Variables and Outputs
      </h2>
      <p>
        The module uses several input variables to customize the
        deployment, such as{" "}
        <span className="text-[#6183BB]">cidr_block</span>,{" "}
        <span className="text-[#6183BB]">enable_dns_hostnames</span>,{" "}
        <span className="text-[#6183BB]">
          public_subnet_cidr_block_1
        </span>
        , and others. These variables are defined in the{" "}
        <code className="bg-gray-800 px-2 rounded">
          variables.tf
        </code>{" "}
        file and allow for flexible configuration of the VPC and its
        components. The module also provides outputs for the VPC ID,
        subnet IDs, and CIDR blocks in the{" "}
        <code className="bg-gray-800 px-2 rounded">outputs.tf</code>{" "}
        file, which can be used by other modules or resources within
        the infrastructure.
      </p>
    </div>
  );
}
