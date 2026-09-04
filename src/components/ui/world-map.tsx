"use client";

import DottedMap from "dotted-map";
import Image from "next/image";

type MapPoint = {
  lat: number;
  lng: number;
  label?: string;
};

type MapRoute = {
  start: MapPoint;
  end: MapPoint;
};

type WorldMapProps = {
  dots?: MapRoute[];
  lineColor?: string;
  className?: string;
};

const map = new DottedMap({ height: 100, grid: "diagonal" });
const svgMap = map.getSVG({
  radius: 0.22,
  color: "#123A5A40",
  shape: "circle",
  backgroundColor: "transparent",
});

function projectPoint(lat: number, lng: number) {
  const x = (lng + 180) * (800 / 360);
  const y = (90 - lat) * (400 / 180);
  return { x, y };
}

function createCurvedPath(start: { x: number; y: number }, end: { x: number; y: number }) {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - 50;

  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
}

export function WorldMap({ dots = [], lineColor = "#207B68", className = "" }: WorldMapProps) {
  return (
    <div className={`relative aspect-[2/1] w-full overflow-hidden rounded-lg bg-white ${className}`}>
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="pointer-events-none h-full w-full select-none opacity-70 [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
        alt="World distribution map"
        width={1056}
        height={528}
        draggable={false}
      />
      <svg viewBox="0 0 800 400" className="pointer-events-none absolute inset-0 h-full w-full select-none" aria-hidden="true">
        <defs>
          <linearGradient id="distribution-path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="8%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="92%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, index) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);

          return (
            <g key={`${dot.start.label}-${dot.end.label}-${index}`}>
              <path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#distribution-path-gradient)"
                strokeWidth="1.4"
                strokeDasharray="4 2"
                className="opacity-90"
              />
              {[dot.start, dot.end].map((point, pIdx) => {
                const projected = projectPoint(point.lat, point.lng);

                return (
                  <g key={`${point.label}-${projected.x}-${projected.y}`}>
                    <circle cx={projected.x} cy={projected.y} r="2.5" fill={lineColor} />
                    <circle cx={projected.x} cy={projected.y} r="2.5" fill={lineColor} opacity="0.45">
                      <animate attributeName="r" from="2.5" to="9" dur="1.8s" begin={`${index * 0.18}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.45" to="0" dur="1.8s" begin={`${index * 0.18}s`} repeatCount="indefinite" />
                    </circle>
                    {point.label && (
                      <text
                        x={projected.x}
                        y={pIdx === 0 ? projected.y - 8 : projected.y + 12}
                        fill="#071321"
                        fontSize="8"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {point.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
