import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import {
  albCode,
  albTargetGroupCode,
  albListenerCode,
  albSecurityGroupCode,
} from "./codeSnippets";

export default function ALBModule() {
  return (
    <div id="alb-module" className="flex flex-col gap-4 lg:max-w-full">
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        ALB Module
      </h2>
      <p>
        The ALB (Application Load Balancer) module is a key component
        of the infrastructure, designed to manage and distribute
        incoming application traffic across multiple targets, such as
        EC2 instances, in a single or multiple Availability Zones.
        This module ensures high availability, automatic scaling, and
        robust security for your applications.
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Features
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Application Load Balancer: </strong>Configures an
          ALB to distribute incoming HTTP and HTTPS traffic.
        </li>
        <li className="mb-2">
          <strong>Target Group: </strong>Manages a target group for
          routing requests to one or more registered targets.
        </li>
        <li className="mb-2">
          <strong>Listener:</strong>Sets up a listener to check for
          connection requests from clients and forwards them to the
          target group
        </li>
        <li className="mb-2">
          <strong>Security Group: </strong>Establishes a security
          group to control inbound and outbound traffic to the ALB.
        </li>
      </ul>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Resources
      </h2>
      <p>1. Application Load Balancer (ALB)</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6183BB]">aws_lb</span>
          <ul className="list-disc pl-5 ml-5">
            <li>
              <span className="text-[#6183BB]">name</span>: The name
              of the ALB.
            </li>
            <li>
              <span className="text-[#6183BB]">internal</span>:
              Specifies whether the ALB is internet-facing or
              internal, set to false.
            </li>
            <li>
              <span className="text-[#6183BB]">load_balancer_type</span>
              : Type of the load balancer, set to
              &quot;application&quot;.
            </li>
            <li>
              <span className="text-[#6183BB]">security_groups</span>:
              List of security group IDs associated with the ALB.
            </li>
            <li>
              <span className="text-[#6183BB]">subnets</span>: List of
              subnet IDs where the ALB is deployed.
            </li>
            <li>
              <span className="text-[#6183BB]">
                enable_deletion_protection
              </span>
              : Boolean to enable/disable deletion protection.
            </li>
          </ul>
        </li>
      </ul>
      <CodeContainer>{albCode}</CodeContainer>
      <p>2. Target Group</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6183BB]">aws_lb_target_group</span>
        </li>
        <ul className="list-disc pl-5 ml-5">
          <li>
            <span className="text-[#6183BB]">name</span>: The name of
            the target group.
          </li>
          <li>
            <span className="text-[#6183BB]">port</span>: The port on
            which the ALB receives traffic, set to 80.
          </li>
          <li>
            <span className="text-[#6183BB]">protocol</span>: The
            protocol to use for routing traffic to the targets, set to
            &quot;HTTP&quot;.
          </li>
          <li>
            <span className="text-[#6183BB]">vpc_id</span>: The ID of
            the VPC where the target group is deployed.
          </li>
          <li>
            <span className="text-[#6183BB]">
              Health Check Configuration:
            </span>
            <ul className="list-disc pl-5 ml-5">
              <li>
                <span className="text-[#6183BB]">path</span>: The
                destination for the health check request.
              </li>
              <li>
                <span className="text-[#6183BB]">interval</span>: Time
                between health checks.
              </li>
              <li>
                <span className="text-[#6183BB]">timeout</span>: Time
                to wait for a health check response.
              </li>
              <li>
                <span className="text-[#6183BB]">healthy_threshold</span>
                : Number of consecutive successful health checks
                required before considering a target healthy.
              </li>
              <li>
                <span className="text-[#6183BB]">unhealthy_threshold</span>
                : Number of consecutive failed health checks required
                before considering a target unhealthy.
              </li>
              <li>
                <span className="text-[#6183BB]">matcher</span>: HTTP
                codes to use when checking for a successful response.
              </li>
            </ul>
          </li>
        </ul>
      </ul>
      <CodeContainer>{albTargetGroupCode}</CodeContainer>
      <p>3. Listener</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6183BB]">aws_lb_listener</span>
          <ul className="list-disc pl-5 ml-5">
            <li>
              <span className="text-[#6183BB]">load_balancer_arn</span>
              : ARN of the load balancer.
            </li>
            <li>
              <span className="text-[#6183BB]">port</span>: Port on
              which the ALB receives traffic, set to 80.
            </li>
            <li>
              <span className="text-[#6183BB]">protocol</span>:
              Protocol to use for routing traffic to the targets, set
              to &quot;HTTP&quot;.
            </li>
            <li>
              <span className="text-[#6183BB]">default_action</span>:
              Default action to take when a request is received.
              <ul className="list-disc pl-5 ml-5">
                <li>
                  <span className="text-[#6183BB]">type</span>: Type
                  of the default action, set to &quot;forward&quot;.
                </li>
                <li>
                  <span className="text-[#6183BB]">target_group_arn</span>
                  : ARN of the target group to forward the traffic to.
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <CodeContainer>{albListenerCode}</CodeContainer>
      <p>4. Security Group</p>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Resource: </strong>{" "}
          <span className="text-[#6183BB]">aws_security_group</span>
          <ul className="list-disc pl-5 ml-5">
            <li>
              <span className="text-[#6183BB]">name</span>: Name of
              the security group.
            </li>
            <li>
              <span className="text-[#6183BB]">description</span>:
              Description of the security group.
            </li>
            <li>
              <span className="text-[#6183BB]">vpc_id</span>: ID of
              the VPC where the security group is deployed.
            </li>
            <li>
              <span className="text-[#6183BB]">ingress</span>: Allows
              HTTP (port 80) and HTTPS (port 443) from any IP.
            </li>
            <li>
              <span className="text-[#6183BB]">egress</span>: Allows
              traffic only to specified CIDR blocks, in port 8080.
            </li>
          </ul>
        </li>
      </ul>
      <CodeContainer>{albSecurityGroupCode}</CodeContainer>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Variables and Outputs
      </h2>
      <p>
        The module uses several input variables to customize the
        deployment, such as{" "}
        <span className="text-[#6183BB]">alb_name</span>,{" "}
        <span className="text-[#6183BB]">public_subnet_id</span>,{" "}
        <span className="text-[#6183BB]">alb_target_group_name</span>,
        and others. These variables are defined in the{" "}
        <code className="bg-gray-800 px-2 rounded">
          variables.tf
        </code>{" "}
        file and allow for flexible configuration of the ALB and its
        components. The module also provides outputs for the security
        group ID and target group ARN in the{" "}
        <code className="bg-gray-800 px-2 rounded">outputs.tf</code>{" "}
        file, which can be used by other modules or resources within
        the infrastructure.
      </p>
    </div>
  );
}
