import React from "react";

export default function Deployment() {
  return (
    <div id="deployment" className="flex flex-col gap-4 lg:max-w-full">
      <h1 className="text-[22px] lg:text-[40px] font-semibold text-white">
        Deployment
      </h1>
      <p>
        After testing and validating your configuration, you can deploy the
        infrastructure using the{" "}
        <code className="text-[#FFCF25]">terraform apply</code> command. This
        command executes the changes defined in the Terraform configuration
        files. It applies the planned changes to the actual infrastructure,
        creating or updating the resources as specified.
      </p>
    </div>
  );
}
