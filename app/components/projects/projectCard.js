import Link from 'next/link';
import Image from 'next/image';

const ProjectCard = ({ imageUrl, title, description, projectUrl, stack }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 py-10">
      <div className="w-full md:w-[400px] h-[225px] relative">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      
      <div className="flex flex-col">
        <Link 
          href={projectUrl}
          className="text-[22px] md:text-[38px] font-bold hover:underline text-white"
        >
          {title}
        </Link>
        
        <p className="mt-[10px] text-sm md:text-[18px] md:max-w-[1000px] text-white">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {stack.map((tech) => (
            <span key={tech} className="bg-gray-200 px-2 py-1 rounded-full md:text-[16px] text-[14px]">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
