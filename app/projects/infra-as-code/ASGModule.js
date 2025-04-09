import React from "react";
import CodeContainer from "../../components/util/CodeContainer";
import {
  webServerLaunchTemplateCode,
  webServerAutoscalingGroupCode,
  webServerSecurityGroupCode,
} from "./codeSnippets";

export default function ASGModule() {
  return (
    <div id="asg-module" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        ASG Module
      </h1>
      <p>
        The ASG (Auto Scaling Group) module is designed to automatically manage
        the scaling of EC2 instances based on demand. This module ensures that
        the application remains available and can handle varying levels of
        traffic by dynamically adjusting the number of instances in response to
        load.
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Features
      </h2>
      <ul className="list-disc pl-5">
        <li className="mb-2">
          <strong>Lauching template: </strong>Configures a launch template to
          define the instance configuration.
        </li>
        <li className="mb-2">
          <strong>Auto Scaling Group: </strong>Manages the scaling of instances
          to maintain desired performance.
        </li>
        <li className="mb-2">
          <strong>Security Groups: </strong>Establishes security groups to
          control inbound and outbound traffic for the instances.
        </li>
      </ul>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Resources
      </h2>
      <p>1. Launch Template</p>
      <ul className="list-disc pl-5">
        <li>
          <strong>Resource: </strong>
          <span className="text-[#6e5da9]">aws_launch_template</span>
        </li>
        <ul className="list-disc pl-5">
          <li>
            <span className="text-[#6e5da9]">name</span>: The name of the launch
            template.
          </li>
          <li>
            <span className="text-[#6e5da9]">image_id</span>: The ID of the AMI
            to use for the instances.
          </li>
          <li>
            <span className="text-[#6e5da9]">instance_type</span>: The type of
            instance to use.
          </li>
          <li>
            <span className="text-[#6e5da9]">key_name</span>: The name of the
            key for SSH access.
          </li>
          <li>
            <span className="text-[#6e5da9]">network_interface</span>:
            <ul className="list-disc pl-5 ml-5">
              <li>
                <span className="text-[#6e5da9]">
                  associate_public_ip_address
                </span>
                : Whether to associate a public IP address with the instance, set
                to
                <code className="text-[#EC585D]"> false</code>.
              </li>
              <li>
                <span className="text-[#6e5da9]">security_groups</span>: List of
                security group IDs to associate with the instance.
              </li>
            </ul>
          </li>
          <li>
            <span className="text-[#6e5da9]">user_data</span>: Base64-encoded
            script to initialize the instance.
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="asg/main.tf">
        {webServerLaunchTemplateCode}
      </CodeContainer>
      <p>2. Auto Scaling Group</p>
      <ul className="list-disc pl-5">
        <li>
          <strong>Resource: </strong>
          <span className="text-[#6e5da9]">aws_autoscaling_group</span>
        </li>
        <ul className="list-disc pl-5">
          <li>
            <span className="text-[#6e5da9]">name</span>: The name of the auto
            scaling group.
          </li>
          <li>
            <span className="text-[#6e5da9]">max_size</span>: Maximum number of
            instances.
          </li>
          <li>
            <span className="text-[#6e5da9]">min_size</span>: Minimum number of
            instances.
          </li>
          <li>
            <span className="text-[#6e5da9]">desired_capacity</span>: Desired
            number of instances.
          </li>
          <li>
            <span className="text-[#6e5da9]">vpc_zone_identifier</span>: List of
            subnet IDs to associate with the auto scaling group.
          </li>
          <li>
            <span className="text-[#6e5da9]">target_group_arns</span>: List of
            target group ARNs for load balancing.
          </li>
        </ul>
      </ul>
      <CodeContainer fileName="asg/main.tf">
        {webServerAutoscalingGroupCode}
      </CodeContainer>
      <p>3. Security Group</p>
      <ul className="list-disc pl-5">
        <li>
          <strong>Web Server Security Group</strong>
          <ul>
            <li>
              <strong>Resource: </strong>
              <span className="text-[#6e5da9]">aws_security_group</span>
              <ul className="list-disc pl-5 ml-5">
                <li>
                  <span className="text-[#6e5da9]">name</span>: The name of the
                  security group.
                </li>

                <li>
                  <span className="text-[#6e5da9]">vpc_id</span>: The ID of the
                  VPC where the security group is deployed.
                </li>
                <li>
                  <span className="text-[#6e5da9]">ingress</span>: Allows HTTP
                  on port code
                  <code className="text-[#02A8EF]"> 8080</code> from the ALB.
                </li>
                <li>
                  <span className="text-[#6e5da9]">egress</span>: Allows egress
                  to RDS.
                </li>
              </ul>
            </li>
          </ul>

          <ul>
            <li>
              <strong>RDS Security Group</strong>
            </li>
            <li>
              <strong>Resource: </strong>
              <span className="text-[#6e5da9]">aws_security_group</span>
              <ul className="list-disc pl-5 ml-5">
                <li>
                  <span className="text-[#6e5da9]">name</span>: The name of the
                  security group.
                </li>
                <li>
                  <span className="text-[#6e5da9]">vpc_id</span>: The ID of the
                  VPC where the security group is deployed.
                </li>
                <li>
                  <span className="text-[#6e5da9]">ingress</span>: Allows
                  traffic from the web server security group.
                </li>
                <li>
                  <span className="text-[#6e5da9]">egress</span>: Allows
                  outbound traffic to any destination.
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <CodeContainer fileName="asg/main.tf">
        {webServerSecurityGroupCode}
      </CodeContainer>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Variables and Outputs
      </h2>
      <p>
        The module uses several input variables to customize the deployment,
        such as <span className="text-[#6e5da9]">launch_template_name</span>,{" "}
        <span className="text-[#6e5da9]">image_id</span>,{" "}
        <span className="text-[#6e5da9]">instance_type</span>, and others. These
        variables are defined in the{" "}
        <code className="text-[#EC585D]">variables.tf</code> file and allow for
        flexible configuration of the ASG and its components. The module also
        provides outputs for the auto scaling group name and RDS security group
        ID in the <code className="text-[#EC585D]">outputs.tf</code> file, which
        can be used by other modules or resources within the infrastructure.
      </p>
    </div>
  );
}
