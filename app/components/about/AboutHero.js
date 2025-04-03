import React from "react";
import Image from "next/image";

export default function AboutHero() {
  return (
    <>
      <div className="container mx-auto 2xl:my-10 px-4 py-16 relative z-10 md:mt-20 min-h-screen flex items-center justify-center">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[106px] items-center justify-center lg:items-start mb-20">
          <div className="flex flex-col gap-[20px] mx-auto md:mx-0 text-center lg:text-left">
            <h1 className="text-[40px] md:text-[80px] font-extrabold text-white">
              Sobre Mim
            </h1>
            <div className="text-[14px] md:text-[18px] max-w-[300px] md:max-w-[750px] text-white space-y-6">
              <p>
                Sou engenheiro de cloud especializado em AWS, automação e
                infraestrutura como código. Gosto de transformar desafios
                complexos em soluções eficientes, utilizando boas práticas
                para garantir performance, segurança e confiabilidade.
              </p>
              <p>
                Estou sempre disposto a aprender e acredito que,
                independentemente da tecnologia, é possível dominar qualquer
                ferramenta ou conceito com dedicação e prática. Para mim, a
                capacidade de adaptação e o aprendizado contínuo são
                essenciais na área de tecnologia.
              </p>
              <p>
                Além da tecnologia, sou fascinado por viagens e por explorar
                lugares menos conhecidos, adoro ler e sou fã de gatinhos.
              </p>
            </div>
          </div>
          <div className="self-center md:self-start mt-8 md:mt-0 hidden xl:block">
            <Image
              src="/images/profile.jpg"
              alt="Samuel Gomes"
              width={500}
              height={500}
              className="rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
} 