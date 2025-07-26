'use client'
import ProjectCard from "./ProjectCard";
import { useTranslation } from 'next-i18next'
const Projects = () => {
  const { t } = useTranslation('common')
  const projects = [
    {
      imageUrl: "/images/terraform.jpg",
      title: "Infra as Code",
      description:
        t('projects.descriptionTerraform'),
      projectUrl: "/projects/infra-as-code",
      stack: ["Terraform","DynamoDB", "AWS ", "EC2", "RDS","S3" ],
    },
    {
      imageUrl: "/images/lambda.png",
      title: "Serverless Logs Analyzer",
      description:
        t('projects.descriptionLambda'),
      projectUrl: "/projects/serverless-logs-analyzer",
      stack: [
        "AWS CloudTrail",
        "AWS Lambda",
        "AWS EventBridge",
        "Pyhton",
        "S3",
      ],
    },
    {
      imageUrl: "/images/cicd.png",
      title: "Portfolio Website - CodeFlow",
      description:
        t('projects.descriptionCodeFlow'),
      projectUrl: "/projects/codeflow",
      stack: ["S3", "CloudFront", "GitHub Actions", "Next.js", "React", "Tailwind CSS"],
    },
  ];

  return (
    <div id="projects" >
      <div className="flex flex-col gap-8 py-6 md:pt-8 md:pb-4 px-4 md:px-0" id="projects">
        <p className="text-center text-white text-sm md:text-xl max-w-[300px] md:mt-30 md:mb-10 mt-20 md:max-w-[1500px] mx-auto ">
          <em>{t('projects.subtitle')}</em>
        </p>
        <div>
          <h2 className="text-white md:text-[48px] text-[36px] font-bold  ">
            {t('nav.projects')}
          </h2>
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
      
    </div>
  );
};

export default Projects;
