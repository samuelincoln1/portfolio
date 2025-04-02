import Image from "next/image";
import Button from "../util/button";
export default function Introduction() {
  return (
    <div className="flex flex-row gap-[106px]">
      <div className="flex flex-col gap-[40px]">
        <div className="flex flex-col gap-[1px]">
          <p className="text-[44px] font-bold">Olá, meu nome é Samuel,</p>
          <p className="text-[44px] font-bold">Engenheiro Cloud</p>
        </div>

        <p className="text-[16px] max-w-[600px]">
          Sou um engenheiro de cloud apaixonado por criar soluções escaláveis e
          eficientes. Trabalho com AWS, infraestrutura como código e automação
          para otimizar aplicações e reduzir custos. Meu foco é construir
          ambientes seguros, resilientes e preparados para alto desempenho e
          operação contínua.
        </p>
        <Button className="w-[208px] bg-[#77B2E9] text-white text-[20px] px-5 py-2.5 rounded-md hover:bg-[#5c9ee0] transition-colors">
          <p>Baixar curriculo</p>
        </Button>
      </div>
      <div className="self-start">
        <Image
          src="/images/cloud-removebg-preview.png"
          alt="cloud"
          width={500}
          height={500}
          className="rounded-full -mt-30"
        />
      </div>
    </div>
  );
}
