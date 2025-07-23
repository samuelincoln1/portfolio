"use client";
import React from "react";

export default function WebApp() {
  return (
    <div id="portfolio-website">
      <h1 className="text-[22px] lg:text-[40px] font-bold text-white">
        Portfolio Website
      </h1>
      <div className="flex flex-col gap-4">
        <p>
          This portfolio website is implemented using the CI/CD pipeline
          described in this project. Built with <span className="text-[#00b3ff]">Next.js 15</span> and <span className="text-[#00b3ff]">React 19</span>, the
          site showcases technical projects through interactive documentation,
          code examples, and visual diagrams. The application uses <span className="text-[#00b3ff]">Tailwind CSS</span> {" "}
          for responsive styling and leverages static site generation for
          optimal performance and SEO.
        </p>

        <p>
          The portfolio demonstrates modern web development practices with
          client-side components, custom hooks, and modular architecture. Key
          features include Mermaid diagram rendering, syntax-highlighted code
          blocks, and responsive design across all devices. The site is hosted
          on <span className="text-[#00b3ff]">AWS S3</span> with <span className="text-[#00b3ff]">CloudFront CDN</span> for global content delivery, making it
          the perfect candidate to showcase the automated deployment pipeline
          that builds, optimizes, and deploys every code change automatically
          through <span className="text-[#00b3ff]">GitHub Actions</span>.
        </p>

        <p>
          <strong>Repository:</strong>{" "}
          <a
            href="https://github.com/samuelincoln1/portfolio"
            target="_blank"
            className="underline text-blue-500 hover:text-blue-400"
          >
            https://github.com/samuelincoln1/portfolio
          </a>
        </p>
      </div>
    </div>
  );
}
