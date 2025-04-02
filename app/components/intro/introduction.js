import Image from "next/image";
import Button from "../util/button";
export default function Introduction() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-[106px] lg:items-start px-4 lg:px-0 ">
      <div className="flex flex-col md:gap-[40px] gap-[20px]">
        <div className="flex flex-col gap-[1px]">
          <p className="text-[24px] md:text-[55px] font-bold text-center md:text-left mt-5 md:mt-0 md:block hidden">
            Olá, meu nome é Samuel e eu sou um{" "}
          </p>
          <p className="text-[24px] md:text-[55px] font-bold text-center md:text-left md:block hidden">
            Engenheiro Cloud
          </p>
          <p className="text-[24px] md:hidden font-bold mt-5">
            Meu nome é Samuel e eu sou um engenheiro cloud
          </p>
        </div>

        <div className="flex flex-col md:items-start gap-5">
          <p className="text-[18px] max-w-[300px] md:max-w-[700px] md:text-left">
            Sou um engenheiro de cloud apaixonado por criar soluções escaláveis
            e eficientes. Trabalho com AWS, infraestrutura como código e
            automação para otimizar aplicações e reduzir custos. Meu foco é
            construir ambientes seguros, resilientes e preparados para alto
            desempenho e operação contínua.
          </p>
          <p className="text-[18px] max-w-[300px] md:max-w-[700px] md:text-left">
            Este portfólio está hospedado na AWS, utilizando o Amazon S3 para
            armazenamento e com distribuição global via CloudFront.
          </p>
          <Button className=" bg-[#77B2E9] text-white text-[24px] px-10 py-3 rounded-md hover:bg-[#5c9ee0] transition-colors md:self-start">
            <p>Baixar curriculo</p>
          </Button>
        </div>
      </div>
      <div className="self-center md:self-start mt-8 md:mt-0">
        <Image
          src="/images/cloud-removebg-preview.png"
          alt="cloud"
          width={700}
          height={700}
          className="rounded-full -mt-30 w-[300px] h-[300px] md:w-[630px] md:h-[630px]"
        />
      </div>
    </div>
  );
}
