'use client'
import Image from "next/image";
import Link from "next/link";

const ArticleCard = ({ image, title, link }) => {
  return (
    <div className="flex flex-col gap-4 py-6 xl:gap-5 xl:py-8 2xl:gap-4 2xl:py-6">
      <div className="w-full md:w-[500px] h-[300px] md:h-[300px] relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-lg z-10"
        />
      </div>
      <div className="flex flex-col">
        <div className="text-[20px] md:text-[28px] font-bold text-white z-50 max-w-[400px] underline">  
          <Link href={link} className=" hover:text-gray-200">
            {title}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
