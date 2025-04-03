import React from "react";
import Image from "next/image";

export default function Resume() {
  const technicalSkills = [
    "Amazon Web Services (AWS)",
    "Desenvolvimento Serverless",
    "Segurança na nuvem",
    "Arquiteturas distribuídas",
    "Bancos de Dados SQL e NoSQL",
    "Terraform",
    "CI/CD",
    "Linux",
    "Python",
    "Java",
    "Node",
    "React",
  ];

  const languages = [
    { language: "Português", level: "Fluente" },
    { language: "Inglês", level: "Avançado (leitura, escrita e comunicação)" },
  ];

  return (
    <>
    <div className="bg-gradient-to-b from-black to-purple-950 py-16">
      <div className="container mx-auto px-4">
        <div className="border border-white/20 shadow-lg backdrop-blur-sm p-8 rounded-lg mb-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-[24px] md:text-[35px] font-bold text-white mb-6">
                Competências
              </h2>
              <ul className="space-y-4">
                {technicalSkills
                  .slice(0, Math.ceil(technicalSkills.length / 2))
                  .map((skill, index) => (
                    <li
                      key={index}
                      className="flex items-center text-[14px] md:text-[20px] text-white"
                    >
                      <span className="w-2 h-2 bg-[#77B2E9] rounded-full mr-3"></span>
                      {skill}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="mt-[66px]">
              <ul className="space-y-4">
                {technicalSkills
                  .slice(Math.ceil(technicalSkills.length / 2))
                  .map((skill, index) => (
                    <li
                      key={index}
                      className="flex items-center text-[14px] md:text-[20px] text-white"
                    >
                      <span className="w-2 h-2 bg-[#77B2E9] rounded-full mr-3"></span>
                      {skill}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-[24px] md:text-[35px] font-bold text-white mb-6">
            Cursos e Certificações
          </h2>
          <div className="border border-white/20 shadow-lg backdrop-blur-sm p-8 rounded-lg">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-6 text-[14px] md:text-[20px] text-white">
                <p>
                  Atualmente, sou estudante de Engenharia de Software na PUC
                  Minas, com previsão de conclusão em 2026. Minha formação me
                  proporciona uma base sólida em arquitetura de sistemas,
                  desenvolvimento de software e práticas de engenharia
                  voltadas para a nuvem.
                </p>

                <p>
                  Também sou certificado como AWS Certified Solutions
                  Architect – Associate (SAA-C03), certificação que valida meu
                  conhecimento em design de arquiteturas escaláveis, seguras e
                  de alto desempenho na AWS.
                </p>
                <p>
                  Estou sempre em busca de aprimoramento e meu objetivo é
                  continuar expandindo minha expertise, obtendo novas
                  certificações e aprimorando minha capacidade de projetar
                  soluções eficientes, seguras e escaláveis na nuvem.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center mt-12 text-white md:text-2xl gap-4">
            <a
              href="https://www.credly.com/badges/5d8faef4-05ba-48e6-85a9-070ff8e3f201/public_url"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 z-100"
            >
              <Image
                src="/images/aws-certified-solutions-architect-associate.png"
                alt="AWS Certified Solutions Architect Associate Badge"
                width={150}
                height={150}
              />
              <p className="inline hover:underline">
                AWS Certified Solutions Architect Associate
              </p>
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-[24px] md:text-[35px] font-bold text-white mb-6">
            Idiomas
          </h2>
          <div className="border border-white/20 shadow-lg backdrop-blur-sm p-8 rounded-lg">
            <ul className="space-y-4">
              {languages.map((lang, index) => (
                <li
                  key={index}
                  className="flex items-center text-[14px] md:text-[20px] text-white"
                >
                  <span className="text-[#77B2E9] mr-3">•</span>
                  <span className="font-medium">{lang.language}</span>
                  <span className="mx-2">–</span>
                  <span>{lang.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:mt-12">
          <div className="p-8 rounded-lg">
            <div className="flex flex-col md:flex-row gap-6 md:items-center justify-center">
              <a
                href="https://github.com/samuelincoln1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[14px] md:text-[20px] hover:underline text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="35"
                  height="35"
                  fill="currentColor"
                >
                  <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                </svg>
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/samuel-gomes-213429209/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[14px] md:text-[20px] hover:underline text-white"
              >
                <svg
                  width="35"
                  height="35"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z" />
                </svg>
                LinkedIn
              </a>

              <a
                href="/curriculo.pdf"
                download
                className="flex items-center gap-2 text-[14px] md:text-[20px] hover:underline text-white"
              >
                <svg
                  width="35"
                  height="35"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M12,12.5L8,16.5H11V20H13V16.5H16L12,12.5Z" />
                </svg>
                Baixar Currículo
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <p className="text-sm text-white">
            Copyright ©2025 Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
    </>
  );
} 