"use client";

import React, { useRef, useMemo } from "react";
import DottedMap from "dotted-map";
import Image from "next/image";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  theme?: "dark" | "light";
}

export function WorldMap({
  dots = [],
  lineColor = "#00A884",
  theme = "light"
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const isDark = theme === "dark";

  // Generate dotted map SVG safely inside useMemo
  const svgMap = useMemo(() => {
    try {
      const map = new DottedMap({ height: 100, grid: "diagonal" });
      return map.getSVG({
        radius: 0.22,
        color: isDark ? "#FFFFFF35" : "#07132125",
        shape: "circle",
        backgroundColor: isDark ? "#071321" : "#FFFFFF",
      });
    } catch {
      return "";
    }
  }, [isDark]);

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 40;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className={`w-full h-full min-h-[380px] lg:min-h-[460px] rounded-3xl relative overflow-hidden font-sans border ${isDark ? 'border-white/15 bg-[#071321]' : 'border-slate-200 bg-white'} shadow-sm flex items-center justify-center`}>
      {/* Map SVG background */}
      {svgMap ? (
        <Image
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none object-cover"
          alt="Worldwide Supply 28 SL Global Trade Routes"
          height={400}
          width={800}
          draggable={false}
        />
      ) : (
        <div className="w-full h-full bg-slate-50" />
      )}

      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        <defs>
          <linearGradient id="trade-path-gradient-light" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00A884" stopOpacity="0.2" />
            <stop offset="50%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="#00A884" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Animated Curved Trade Routes */}
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#trade-path-gradient-light)"
                strokeWidth="2"
                strokeDasharray="6 3"
                className="opacity-90"
              />
            </g>
          );
        })}

        {/* Pulsing Location Markers */}
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`points-group-${i}`}>
              {/* Valencia / Origin Point */}
              {i === 0 && (
                <g key="origin-valencia">
                  <circle
                    cx={startPoint.x}
                    cy={startPoint.y}
                    r="5"
                    fill="#00A884"
                  />
                  <circle
                    cx={startPoint.x}
                    cy={startPoint.y}
                    r="5"
                    fill="#00A884"
                    opacity="0.6"
                  >
                    <animate
                      attributeName="r"
                      from="5"
                      to="16"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.8"
                      to="0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text
                    x={startPoint.x}
                    y={startPoint.y - 12}
                    fill="#00A884"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    Valencia (HQ)
                  </text>
                </g>
              )}

              {/* Destination Point */}
              <g key={`end-${i}`}>
                <circle
                  cx={endPoint.x}
                  cy={endPoint.y}
                  r="4"
                  fill={isDark ? "#FFFFFF" : "#071321"}
                />
                <circle
                  cx={endPoint.x}
                  cy={endPoint.y}
                  r="4"
                  fill="#00A884"
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    from="4"
                    to="12"
                    dur="1.8s"
                    begin={`${i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.6"
                    to="0"
                    dur="1.8s"
                    begin={`${i * 0.2}s`}
                    repeatCount="indefinite"
                  />
                </circle>
                {dot.end.label && (
                  <text
                    x={endPoint.x}
                    y={endPoint.y + 14}
                    fill={isDark ? "#FFFFFF" : "#071321"}
                    fontSize="9"
                    fontWeight="bold"
                    opacity="0.9"
                    textAnchor="middle"
                  >
                    {dot.end.label}
                  </text>
                )}
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
