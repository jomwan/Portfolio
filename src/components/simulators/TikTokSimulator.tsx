"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Sliders, Info, Flame, Users, TrendingUp } from "lucide-react";

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  state: "unaware" | "exposed" | "viral";
  exposedTicks: number;
}

interface Edge {
  source: number;
  target: number;
}

export default function TikTokSimulator() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recommendationBias, setRecommendationBias] = useState(0.6); // density/clustering
  const [viralityRate, setViralityRate] = useState(0.4); // infection rate
  const [seedSize, setSeedSize] = useState(3); // starting infected
  
  // Simulation statistics
  const [epoch, setEpoch] = useState(0);
  const [unawareCount, setUnawareCount] = useState(50);
  const [exposedCount, setExposedCount] = useState(0);
  const [viralCount, setViralCount] = useState(0);
  const [history, setHistory] = useState<number[]>([]);

  // Simulation persistent data
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const animationFrameId = useRef<number | null>(null);

  // Initialize network nodes & clustering based on recommendation bias
  const initializeNetwork = () => {
    const nodeCount = 50;
    const nodes: Node[] = [];
    const width = 600;
    const height = 300;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        id: i,
        x: Math.random() * (width - 40) + 20,
        y: Math.random() * (height - 40) + 20,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        state: "unaware",
        exposedTicks: 0,
      });
    }

    // Seed initial infected nodes
    for (let i = 0; i < seedSize; i++) {
      if (nodes[i]) nodes[i].state = "viral";
    }

    // Generate edges: higher bias creates denser clusters (algorithmic echo chambers)
    const edges: Edge[] = [];
    const connectionRadius = 70 + recommendationBias * 60; // scale based on bias

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Algorithmic mapping: denser links among close coordinates or probabilistic selection
        if (dist < connectionRadius && Math.random() < 0.2 + recommendationBias * 0.4) {
          edges.push({ source: i, target: j });
        }
      }
    }

    nodesRef.current = nodes;
    edgesRef.current = edges;
    setEpoch(0);
    setHistory([seedSize]);
    setIsPlaying(false);
  };

  useEffect(() => {
    initializeNetwork();
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [recommendationBias, seedSize]);

  // Main Simulation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const edges = edgesRef.current;

      // Update positions and handle boundary collision
      nodes.forEach((node) => {
        if (isPlaying) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 10 || node.x > canvas.width - 10) node.vx *= -1;
          if (node.y < 10 || node.y > canvas.height - 10) node.vy *= -1;
        }

        // Draw node aura based on its state
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        if (node.state === "viral") {
          ctx.fillStyle = "rgba(236, 72, 153, 0.8)"; // pink
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#ec4899";
        } else if (node.state === "exposed") {
          ctx.fillStyle = "rgba(168, 85, 247, 0.6)"; // purple
          ctx.shadowBlur = 5;
          ctx.shadowColor = "#a855f7";
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.15)"; // dark gray
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // reset
        ctx.strokeStyle = "rgba(255,255,255,0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw network links
      ctx.lineWidth = 0.5;
      edges.forEach((edge) => {
        const source = nodes[edge.source];
        const target = nodes[edge.target];
        if (!source || !target) return;

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);

        if (source.state === "viral" && target.state === "viral") {
          ctx.strokeStyle = "rgba(236, 72, 153, 0.4)"; // active hot link
        } else if (source.state === "exposed" || target.state === "exposed") {
          ctx.strokeStyle = "rgba(168, 85, 247, 0.2)";
        } else {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"; // cold link
        }
        ctx.stroke();
      });

      // Perform Agent state transactions
      if (isPlaying && Math.random() < 0.1) {
        let stateChanged = false;
        
        // Agent transmission step
        edges.forEach((edge) => {
          const source = nodes[edge.source];
          const target = nodes[edge.target];

          if (source.state === "viral" && target.state === "unaware") {
            if (Math.random() < viralityRate) {
              target.state = "exposed";
              stateChanged = true;
            }
          }
          if (target.state === "viral" && source.state === "unaware") {
            if (Math.random() < viralityRate) {
              source.state = "exposed";
              stateChanged = true;
            }
          }
        });

        // Conversion step: exposed becomes viral
        nodes.forEach((node) => {
          if (node.state === "exposed") {
            node.exposedTicks++;
            if (node.exposedTicks > 3) {
              node.state = "viral";
              stateChanged = true;
            }
          }
        });

        if (stateChanged || Math.random() < 0.05) {
          setEpoch((prev) => {
            const next = prev + 1;
            
            // Recompute node proportions
            let unaware = 0, exposed = 0, viral = 0;
            nodes.forEach((n) => {
              if (n.state === "unaware") unaware++;
              else if (n.state === "exposed") exposed++;
              else if (n.state === "viral") viral++;
            });

            setUnawareCount(unaware);
            setExposedCount(exposed);
            setViralCount(viral);

            setHistory((prevH) => {
              const nextH = [...prevH, viral];
              if (nextH.length > 50) nextH.shift(); // sliding window of 50 epochs
              return nextH;
            });

            return next;
          });
        }
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [isPlaying, viralityRate]);

  return (
    <div className="bg-linear-to-b from-white/[0.03] to-white/[0.01] border border-white/5 rounded-3xl p-6 h-full flex flex-col gap-5">
      
      {/* Simulation Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass p-3 rounded-2xl border border-white/5 flex items-center gap-3">
          <RotateCcw size={16} className="text-primary animate-spin-slow" />
          <div>
            <div className="text-[14px] font-black">{epoch}</div>
            <div className="text-[8px] uppercase tracking-widest text-foreground/40 font-bold">Epochs</div>
          </div>
        </div>
        <div className="glass p-3 rounded-2xl border border-white/5 flex items-center gap-3">
          <Users size={16} className="text-foreground/40" />
          <div>
            <div className="text-[14px] font-black">{unawareCount}</div>
            <div className="text-[8px] uppercase tracking-widest text-foreground/40 font-bold">Unaware</div>
          </div>
        </div>
        <div className="glass p-3 rounded-2xl border border-white/5 flex items-center gap-3">
          <Info size={16} className="text-purple-400" />
          <div>
            <div className="text-[14px] font-black text-purple-400">{exposedCount}</div>
            <div className="text-[8px] uppercase tracking-widest text-foreground/40 font-bold">Exposed</div>
          </div>
        </div>
        <div className="glass p-3 rounded-2xl border border-white/5 flex items-center gap-3 animate-pulse-slow">
          <Flame size={16} className="text-pink-500" />
          <div>
            <div className="text-[14px] font-black text-pink-500">{viralCount}</div>
            <div className="text-[8px] uppercase tracking-widest text-foreground/40 font-bold">Viral</div>
          </div>
        </div>
      </div>

      {/* Main Graph Network Visualization */}
      <div className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden relative h-56">
        <canvas
          ref={canvasRef}
          width={600}
          height={220}
          className="w-full h-full object-contain"
        />
        <div className="absolute top-4 left-4 text-[8px] font-mono uppercase tracking-widest text-foreground/30 font-bold">
          Active Agent Graph
        </div>
      </div>

      {/* Controls & Mini Chart Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
        {/* Param Sliders */}
        <div className="space-y-4">
          <div className="text-[9px] uppercase tracking-wider text-foreground/30 font-bold flex items-center gap-2">
            <Sliders size={10} /> Configuration Panel
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[10px] text-foreground/60 mb-1 font-bold">
                <span>Recommendation Bias</span>
                <span className="font-mono">{recommendationBias.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={recommendationBias}
                onChange={(e) => setRecommendationBias(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-foreground/60 mb-1 font-bold">
                <span>Virality Rate</span>
                <span className="font-mono">{(viralityRate * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={viralityRate}
                onChange={(e) => setViralityRate(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border ${
                isPlaying ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : "bg-primary text-white border-transparent"
              }`}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
              {isPlaying ? "Pause" : "Start Simulation"}
            </button>
            <button
              onClick={initializeNetwork}
              className="px-4 py-2.5 bg-white/5 border border-white/10 text-foreground/80 hover:bg-white/10 transition-all rounded-xl flex items-center justify-center"
              title="Reset"
            >
              <RotateCcw size={12} />
            </button>
          </div>
        </div>

        {/* Real-time Virality S-Curve Mini Chart */}
        <div className="bg-black/20 border border-white/5 rounded-2xl p-4 flex flex-col">
          <div className="text-[9px] uppercase tracking-wider text-foreground/30 font-bold mb-3 flex items-center gap-1.5">
            <TrendingUp size={10} /> Logistic S-Curve (Growth over Epochs)
          </div>
          
          {/* Custom SVG Mini Curve Plotter */}
          <div className="flex-grow flex items-end relative border-b border-l border-white/5 h-20 w-full px-2">
            {history.length > 1 ? (
              <svg className="w-full h-full overflow-visible">
                <polyline
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="2"
                  points={history.map((val, idx) => {
                    const x = (idx / (history.length - 1)) * 240; // width bounds
                    const y = 80 - (val / 50) * 75; // height bounds (inverse)
                    return `${x},${y}`;
                  }).join(" ")}
                />
              </svg>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-[8px] uppercase tracking-widest text-foreground/20 font-bold">
                Start simulation to plot growth...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
