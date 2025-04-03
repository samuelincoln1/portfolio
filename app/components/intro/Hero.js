import Image from "next/image";
import Button from "../util/button";
export default function Hero() {
  return (
    <div className="relative flex flex-col md:min-h-[calc(100vh-44px)] min-h-screen lg:flex-row gap-8 lg:gap-[106px] lg:items-start px-4 lg:px-0">
      <div className="flex flex-col text-center mx-auto justify-center items-center mb-auto mt-40 md:mt-56 z-50">
        <p className="text-white text-2xl">Engeheiro de cloud</p>
        <h1 className="text-[40px] md:text-[80px] font-extrabold text-white">Samuel Lincoln</h1>
        <p className="text-white text-sm md:text-lg md:max-w-[800px] max-w-[300px]">
          Sou um engenheiro de cloud apaixonado por criar soluções escaláveis e
          eficientes. Trabalho com AWS, infraestrutura como código e automação
          para otimizar aplicações e reduzir custos. Meu foco é construir
          ambientes seguros, resilientes e preparados para alto desempenho e
          operação contínua.
        </p>
        <button className="bg-white text-black px-4 py-2 rounded-md mt-6 hover:bg-gray-200 transition-colors text-2xl">
          <a href="https://www.linkedin.com/in/samuel-gomes-213429209/">
            Baixar currículo
          </a>
        </button>
      </div>
    </div>
  );
}
