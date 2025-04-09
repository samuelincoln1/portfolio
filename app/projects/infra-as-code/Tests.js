import React from "react";

export default function Tests() {
  return (
    <div id="tests" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        Tests
      </h1>
      <p>
        Ensuring the integrity and correctness of your infrastructure code is
        crucial for successful deployments. Terraform provides several commands
        to help test and validate your configurations before applying them to
        your environment.
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Terraform fmt
      </h2>
      <p>
        The <code className="text-[#FFCF25]">terraform fmt</code> command is
        used to format your Terraform configuration files consistently. It
        automatically updates the files to follow the standard Terraform style
        conventions, making the code more readable and maintainable.
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Terraform validade
      </h2>
      <p>
        The <code className="text-[#FFCF25]">terraform validate</code> command
        checks the syntax and internal consistency of your Terraform
        configuration files. It ensures that the configuration is syntactically
        valid and that all required arguments are provided.
      </p>
      <h2 className="text-[22px] lg:text-[26px] font-semibold text-white">
        Terraform plan
      </h2>
      <p>
        The <code className="text-[#FFCF25]">terraform plan</code> command is a
        critical step in the Terraform workflow. It creates an execution plan,
        showing what actions Terraform will take to achieve the desired state of
        the infrastructure. This command provides a detailed preview of the
        changes that will be made, allowing you to review and confirm them
        before applying.
      </p>
    </div>
  );
}
