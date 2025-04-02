import Image from "next/image";
import Button from "../util/button";
export default function Introduction() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-[106px] items-center lg:items-start px-4 lg:px-0">
      <div className="flex flex-col gap-[30px]">
        <div className="flex flex-col gap-[1px]">
          <p className="text-[32px] md:text-[44px] font-bold text-center md:text-left">Olá, meu nome é Samuel e eu sou um</p>
          <p className="text-[32px] md:text-[44px] font-bold text-center md:text-left">Engenheiro Cloud</p>
        </div>

        <p className="text-[16px] max-w-[600px] text-center md:text-left">
          Sou um engenheiro de cloud apaixonado por criar soluções escaláveis e
          eficientes. Trabalho com AWS, infraestrutura como código e automação
          para otimizar aplicações e reduzir custos. Meu foco é construir
          ambientes seguros, resilientes e preparados para alto desempenho e
          operação contínua.
        </p>
        <p className="text-[16px] max-w-[600px] text-center md:text-left">
          Este portfólio está hospedado na AWS, utilizando o Amazon S3 para
          armazenamento e com distribuição global via CloudFront.
        </p>
        <Button className="w-[208px] bg-[#77B2E9] text-white text-[20px] px-5 py-2.5 rounded-md hover:bg-[#5c9ee0] transition-colors self-center md:self-start">
          <p>Baixar curriculo</p>
        </Button>
      </div>
      <div className="self-center md:self-start mt-8 md:mt-0">
        <Image
          src="/images/cloud-removebg-preview.png"
          alt="cloud"
          width={500}
          height={500}
          className="rounded-full -mt-30 w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
        />
      </div>
    </div>
  );
}
