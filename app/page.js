import Introduction from "./components/intro/introduction";
import Navbar from "./components/util/navbar";
import Projects from "./components/projects/projects";
export default function Index() {
  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col mt-30">
        <div className="flex  justify-center">
          <Introduction />
        </div>
        <div className=" flex flex-col gap-8 bg-[#EDF7FA] py-10 ">
          <p className="text-center">
            Uma nuvem bem projetada escala, reduz custos e melhora a
            confiabilidade. Boas práticas de arquitetura e automação fazem a
            diferença. Confira abaixo meus projetos:
          </p>
        </div>
        <div className="flex px-90 mt-3">
          <Projects />
        </div>
      </div>
    </div>
  );
}
