'use client'
import ProjectCard from "./projectCard";
import { useTranslation } from 'next-i18next'
const Projects = () => {
  const { t } = useTranslation('common')
  const projects = [
    {
      imageUrl: "/images/terraform.jpg",
      title: "Infra as Code",
      description:
        t('projects.descriptionTerraform'),
      projectUrl: "/infra-as-code",
      stack: ["Terraform", "AWS ", "Ansible", "S3", "DynamoDB"],
    },
    {
      imageUrl: "/images/lambda.png",
      title: "Serverless Logs Analyzer",
      description:
        t('projects.descriptionLambda'),
      projectUrl: "/serverless-logs-analyzer",
      stack: [
        "AWS Lambda",
        "Amazon CloudWatch",
        "Amazon QuickSight",
        "API Gateway",
        "S3",
      ],
    },
    {
      imageUrl: "/images/cicd.png",
      title: "CodeFlow",
      description:
        t('projects.descriptionCodeFlow'),
      projectUrl: "/codeflow",
      stack: ["AWS CodePipeline", "GitHub Actions"],
    },
  ];

  return (
    <div className="md:px-30 px-6 relative flex flex-col bg-gradient-to-b from-black to-purple-950">
      <div className="flex flex-col gap-8 py-6 md:py-13 px-4 md:px-0">
        <p className="text-center text-white text-sm md:text-xl max-w-[300px] md:my-30 mt-20 md:max-w-[1500px] mx-auto">
          {t('projects.subtitle')}
        </p>
        <div>
          {projects.map((project, index) => (
            <div key={`project-container-${index}`} className="py-4">
              <ProjectCard
                key={`project-${index}`}
                imageUrl={project.imageUrl}
                title={project.title}
                description={project.description}
                projectUrl={project.projectUrl}
                stack={project.stack}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-10 gap-2 md:mt-10">
        <div className="flex flex-row gap-7 items-center">
          <a
            href="https://www.linkedin.com/in/samuel-gomes-213429209/"
            target="_blank"
            rel="noopener noreferrer"
            className="z-100"
          >
            <svg
              width="35"
              height="35"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.6055 0H4.39453C1.97159 0 0 1.97159 0 4.39453V25.6055C0 28.0284 1.97159 30 4.39453 30H25.6055C28.0284 30 30 28.0284 30 25.6055V4.39453C30 1.97159 28.0284 0 25.6055 0ZM10.6055 23.7891H7.08984V11.4844H10.6055V23.7891ZM10.6055 9.72656H7.08984V6.21094H10.6055V9.72656ZM22.9102 23.7891H19.3945V16.7578C19.3945 15.7887 18.6058 15 17.6367 15C16.6676 15 15.8789 15.7887 15.8789 16.7578V23.7891H12.3633V11.4844H15.8789V12.147C16.7999 11.8607 17.3982 11.4844 18.5156 11.4844C20.8999 11.4869 22.9102 13.6258 22.9102 16.1536V23.7891Z"
                fill="white"
              />
            </svg>
          </a>

          <a
            href="https://github.com/samuelincoln1"
            target="_blank"
            rel="noopener noreferrer"
            className="z-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              width="43"
              height="43"
              fill="white"
            >
              <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
            </svg>
          </a>
        </div>
        <p className="text-sm text-white text-center">
          {t('projects.copyright')}
        </p>
      </div>
    </div>
  );
};

export default Projects;
