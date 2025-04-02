import ProjectCard from "./projectCard";

const Projects = () => {
  const projects = [
    {
      imageUrl: "/images/terraform.jpg",
      title: "Infra as Code",
      description:
       "Implementação de uma infraestrutura completa e automatizada na AWS usando Terraform. O projeto inclui VPC, ALB, EC2, banco de dados, segurança e outros componentes essenciais para um ambiente escalável e seguro.",
      projectUrl: "/infra-as-code",
      stack: ["Terraform", "AWS ", "Docker", "Kubernetes"],
    },
    {
      imageUrl: "/images/lambda.png",
      title: "Serverless Logs Analyzer",
      description:
        "Aplicação serverless para análise de métricas e logs em tempo real, utilizando AWS Lambda, CloudWatch e QuickSight. Automatiza a coleta, processamento e visualização de dados, permitindo insights rápidos e eficientes sobre eventos e performance da infraestrutura.",
      projectUrl: "/serverless-logs-analyzer",
      stack: ["AWS Lambda", "Amazon CloudWatch", "Amazon QuickSight", "API Gateway", "S3"],
    },
    {
      imageUrl: "/images/cicd.png",
      title: "CodeFlow",
      description:
        "Pipeline de CI/CD automatizado utilizando AWS CodePipeline e GitHub Actions para integrar, testar e implantar aplicações de forma eficiente. O projeto garante entregas contínuas, automação de builds e deploys seguros na AWS.",
      projectUrl: "/codeflow",
      stack: ["AWS CodePipeline", "GitHub Actions"],
    },
  ];

  return (
    <div className="flex flex-col">
      {projects.map((project, index) => (
        <div key={`project-container-${index}`}>
          <ProjectCard
            key={`project-${index}`}
            imageUrl={project.imageUrl}
            title={project.title}
            description={project.description}
            projectUrl={project.projectUrl}
            stack={project.stack}
          />
          {index !== projects.length - 1 && (
            <svg 
              className="w-full"
              height="2" 
              viewBox="0 0 100 2" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path d="M0 1L100 1" stroke="#E0E0E0" strokeWidth="1" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export default Projects;
