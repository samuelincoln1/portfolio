"use client";
import { useEffect, useState } from "react";

export default function MermaidDiagram({ chart, id = "mermaid-diagram" }) {
  const [svgContent, setSvgContent] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    let isMounted = true;

    const renderMermaid = async () => {
      try {
        if (!isMounted) return;

        setStatus("loading");

        const mermaid = (await import("mermaid")).default;

        if (!isMounted) return;

        mermaid.mermaidAPI.reset();

        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          themeVariables: {
            primaryColor: "#1e293b",
            primaryTextColor: "#f1f5f9",
            primaryBorderColor: "#64748b",
            lineColor: "#94a3b8",
            secondaryColor: "#334155",
            tertiaryColor: "#475569",
            background: "transparent",
            mainBkg: "#1e293b",
            secondaryColor: "#334155",
            tertiaryColor: "#475569",
            primaryBorderColor: "#64748b",
            primaryTextColor: "#f1f5f9",
            lineColor: "#94a3b8",
            sectionBkgColor: "transparent",
            altSectionBkgColor: "transparent",
            gridColor: "#475569",
            clusterBkg: "transparent",
            clusterBorder: "#64748b",
            defaultLinkColor: "#94a3b8",
            titleColor: "#f1f5f9",
            edgeLabelBackground: "transparent",
            nodeTextColor: "#f1f5f9",
          },
        });

        if (!isMounted) return;

        const uniqueId = `${id}-${Date.now()}`;

        const { svg } = await mermaid.render(uniqueId, chart);

        if (!isMounted) return;

        setSvgContent(svg);
        setStatus("success");
      } catch (error) {
        console.error("❌ Error:", error);
        if (!isMounted) return;

        setError(error.message);
        setStatus("error");
        setSvgContent(`
          <div class="text-red-500 p-4">
            <h3 class="font-bold">Error rendering diagram:</h3>
            <p>${error.message}</p>
            <details class="mt-2">
              <summary class="cursor-pointer">View details</summary>
              <pre class="text-xs mt-2 bg-gray-100 p-2 rounded">${
                error.stack || "no stack trace"
              }</pre>
            </details>
          </div>
        `);
      }
    };

    const timer = setTimeout(renderMermaid, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [chart, id]);

  return (
    <div
      className=""
      style={{ minHeight: "300px", backgroundColor: "transparent" }}
    >
      {status === "loading" && (
        <div className="text-center text-slate-300 py-8">
          <div className="animate-spin h-8 w-8 border-b-2 border-blue-400 mx-auto mb-2"></div>
          <p className="text-sm">Loading diagram...</p>
        </div>
      )}
      {status === "success" && svgContent && (
        <div dangerouslySetInnerHTML={{ __html: svgContent }} />
      )}
      {status === "error" && svgContent && (
        <div dangerouslySetInnerHTML={{ __html: svgContent }} />
      )}
    </div>
  );
}
