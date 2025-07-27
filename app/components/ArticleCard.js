'use client'
import Image from "next/image";
import Link from "next/link";

const ArticleCard = ({ image, title }) => {
  return (
    <div className="flex flex-col gap-6 py-10 ">
      <div className="w-full md:w-[500px] h-[300px] relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-lg z-10"
        />
      </div>
      <div className="flex flex-col">
        <div className="text-[20px] md:text-[28px] font-bold text-white z-50 max-w-[400px]">  
          <Link href="/" className=" hover:underline">
            {title}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
