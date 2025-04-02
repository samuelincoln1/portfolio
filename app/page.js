import Introduction from "./components/intro/introduction";
import Navbar from "./components/util/navbar";
import Projects from "./components/projects/projects";
export default function Index() {
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col mt-10 md:mt-30">
        <div className="flex justify-center">
          <Introduction />
        </div>
        <div className="flex flex-col gap-8 bg-[#EDF7FA] py-6 md:py-10 mt-3 mb-1 px-4 md:px-0">
          <p className="text-center text-sm md:text-base">
            Uma nuvem bem projetada escala, reduz custos e melhora a
            confiabilidade. Boas práticas de arquitetura e automação fazem a
            diferença. Confira abaixo meus projetos:
          </p>
        </div>
        <div className="flex px-4 md:ml-35 ml-110-3xl mt-3">
          <Projects />
        </div>
      </div>
    </div>
  );
}
