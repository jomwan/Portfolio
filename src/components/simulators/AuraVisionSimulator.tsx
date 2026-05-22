"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Eye, 
  EyeOff, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  Database, 
  Search, 
  Terminal, 
  Settings2, 
  Activity, 
  Sparkles, 
  Plus, 
  RefreshCw, 
  UserCheck, 
  MapPin, 
  Maximize2, 
  ChevronRight,
  Play,
  Sliders
} from "lucide-react";

// Mock spatial memory database nodes (ChromaDB vectors)
interface MemoryNode {
  id: string;
  timestamp: string;
  timeAgo: string;
  category: "object" | "person" | "hazard" | "pathway";
  description: string;
  location: string;
  similarity: number;
}

const mockChromaDB: MemoryNode[] = [
  {
    id: "mem_001",
    timestamp: "10:52:14",
    timeAgo: "8 mins ago",
    category: "object",
    description: "Placed a black ceramic coffee cup on the right corner of the desk.",
    location: "Desk Area (x: 0.65, y: 0.22, z: 0.85)",
    similarity: 0.895
  },
  {
    id: "mem_002",
    timestamp: "10:48:32",
    timeAgo: "12 mins ago",
    category: "person",
    description: "Detected friend Alice entering the workspace, smiling and greeting.",
    location: "Doorway Entry (x: -1.20, y: 1.50, z: 2.10)",
    similarity: 0.724
  },
  {
    id: "mem_003",
    timestamp: "10:42:05",
    timeAgo: "18 mins ago",
    category: "hazard",
    description: "Identified loose electrical extension cord lying across the central pathway.",
    location: "Center Floor (x: 0.10, y: 0.05, z: 1.10)",
    similarity: 0.812
  },
  {
    id: "mem_004",
    timestamp: "10:35:50",
    timeAgo: "25 mins ago",
    category: "pathway",
    description: "Verified main doorway corridor is completely clear of obstacles.",
    location: "Corridor Exit (x: -0.05, y: 1.80, z: 3.50)",
    similarity: 0.654
  },
  {
    id: "mem_005",
    timestamp: "10:15:12",
    timeAgo: "45 mins ago",
    category: "object",
    description: "Set of keys placed in the left compartment of the backpack.",
    location: "Chair Hanger (x: -0.80, y: -0.40, z: 0.60)",
    similarity: 0.941
  }
];

// Preset queries for simulator interaction
interface PresetQuery {
  question: string;
  dbMatches: string[];
  response: string;
}

const presetQueries: PresetQuery[] = [
  {
    question: "Where is my coffee cup?",
    dbMatches: ["mem_001", "mem_005"],
    response: "Your coffee cup is currently located on the right-hand corner of your desk, approximately 0.8 meters away, next to your keyboard."
  },
  {
    question: "Is there any hazard in my path?",
    dbMatches: ["mem_003", "mem_004"],
    response: "Warning: There is a loose electrical extension cord lying across the floor directly in front of you, about 1.1 meters ahead. I recommend stepping slightly to the left."
  },
  {
    question: "Who is currently in the room?",
    dbMatches: ["mem_002"],
    response: "Your friend Alice is currently in the room. She entered about 12 minutes ago and is positioned near the doorway entry."
  },
  {
    question: "Where did I put my keys?",
    dbMatches: ["mem_005", "mem_001"],
    response: "The last recorded location for your keys is inside the left compartment of your backpack, which is hanging on the back of your chair."
  }
];

// Screen objects overlay simulation
interface ScreenObject {
  id: string;
  name: string;
  category: "object" | "person" | "hazard" | "pathway";
  x: number;
  y: number;
  w: number;
  h: number;
  distance: string;
  confidence: number;
  color: string;
}

const initialScreenObjects: ScreenObject[] = [
  {
    id: "obj_1",
    name: "Coffee Cup",
    category: "object",
    x: 65,
    y: 55,
    w: 12,
    h: 15,
    distance: "0.8m",
    confidence: 97.4,
    color: "rgba(59, 130, 246, 0.4)" // Blue
  },
  {
    id: "obj_2",
    name: "Alice (Friend)",
    category: "person",
    x: 22,
    y: 25,
    w: 24,
    h: 55,
    distance: "2.1m",
    confidence: 94.2,
    color: "rgba(168, 85, 247, 0.4)" // Purple
  },
  {
    id: "obj_3",
    name: "Electrical Cord",
    category: "hazard",
    x: 42,
    y: 75,
    w: 30,
    h: 8,
    distance: "1.1m",
    confidence: 89.8,
    color: "rgba(239, 68, 68, 0.4)" // Red
  },
  {
    id: "obj_4",
    name: "Clear Doorway",
    category: "pathway",
    x: 5,
    y: 10,
    w: 15,
    h: 70,
    distance: "3.5m",
    confidence: 92.1,
    color: "rgba(16, 185, 129, 0.4)" // Emerald
  }
];

export default function AuraVisionSimulator() {
  // Perception settings
  const [segEnabled, setSegEnabled] = useState(true);
  const [faceEnabled, setFaceEnabled] = useState(true);
  const [gridEnabled, setGridEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [hazardAlerts, setHazardAlerts] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);

  // Simulation states
  const [currentObjects, setCurrentObjects] = useState<ScreenObject[]>(initialScreenObjects);
  const [logs, setLogs] = useState<string[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [customQuery, setCustomQuery] = useState("");
  const [isQuerying, setIsQuerying] = useState(false);
  const [queryStep, setQueryStep] = useState(0);
  const [ragMatches, setRagMatches] = useState<MemoryNode[]>([]);
  const [synthesisResponse, setSynthesisResponse] = useState("");
  const [typedResponse, setTypedResponse] = useState("");

  const canvasRef = useRef<HTMLDivElement>(null);

  // Add system logs
  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString("en-GB", { hour12: false });
    setLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 19)]);
  };

  // Simulate real-time perception scan updates
  useEffect(() => {
    addLog("System initialized. YOLOE-26N-seg active on feed.");
    addLog("ChromaDB vector store loaded with 1,248 temporal records.");
    addLog("FaceNet pipeline connected successfully. Reference set loaded.");

    const interval = setInterval(() => {
      // Randomly tweak confidence or coordinates slightly to look alive
      setCurrentObjects((prev) => 
        prev.map((obj) => {
          if (Math.random() > 0.6) {
            const shiftX = (Math.random() - 0.5) * 1.5;
            const shiftY = (Math.random() - 0.5) * 1.5;
            const confShift = (Math.random() - 0.5) * 0.8;
            return {
              ...obj,
              x: Math.max(2, Math.min(85, obj.x + shiftX)),
              y: Math.max(2, Math.min(85, obj.y + shiftY)),
              confidence: parseFloat(Math.max(80, Math.min(99.9, obj.confidence + confShift)).toFixed(1))
            };
          }
          return obj;
        })
      );

      // Random background events in logs
      const events = [
        "LiDAR baseline scan refreshed. No new dynamic obstacles.",
        "FaceNet: Confirmed Alice tracking node at (dist: 2.1m).",
        "YOLOE-seg: Tracking Coffee Cup with 97.4% precision.",
        "RAG Synapse: Background spatial indexing to ChromaDB successful.",
        "System telemetry stable: VRAM 2.41GB, Latency 24ms."
      ];
      if (Math.random() > 0.7) {
        const randomMsg = events[Math.floor(Math.random() * events.length)];
        addLog(randomMsg);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Filter objects based on confidence threshold
  const filteredObjects = currentObjects.filter(
    (obj) => obj.confidence >= confidenceThreshold
  );

  // RAG query execution simulation
  const handleQuery = async (queryText: string, presetIndex: number | null) => {
    if (!queryText.trim() || isQuerying) return;

    setIsQuerying(true);
    setQueryStep(1);
    setRagMatches([]);
    setSynthesisResponse("");
    setTypedResponse("");
    addLog(`Ingesting RAG Request: "${queryText}"`);

    // Step 1: Ingestion & Vector Embeddings Generation (1200ms)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setQueryStep(2);
    addLog("ChromaDB Query Embeddings created. Searching vector store...");

    // Step 2: Cosine Similarity Vector Search (1200ms)
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setQueryStep(3);

    // Retrieve matching database items based on preset or simulate close matches
    let matches: MemoryNode[] = [];
    let answer = "";

    if (presetIndex !== null) {
      const preset = presetQueries[presetIndex];
      matches = mockChromaDB.filter((node) => preset.dbMatches.includes(node.id));
      answer = preset.response;
    } else {
      // Simulate general search match
      matches = [mockChromaDB[0], mockChromaDB[4]];
      answer = `ChromaDB vector matching retrieved context of your desk space. Your coffee cup is near the workspace coordinates, and your keys are in your bag.`;
    }

    setRagMatches(matches);
    addLog(`ChromaDB matched ${matches.length} relevant context vectors.`);

    // Step 3: LLM Context Synthesis (Gemini 3 Flash) (1200ms)
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setQueryStep(4);
    setSynthesisResponse(answer);
    addLog("Gemini 3 Flash completed response synthesis.");

    // Step 4: Text Generation Simulation (Typing effect)
    let index = 0;
    const typingInterval = setInterval(() => {
      setTypedResponse((prev) => prev + answer.charAt(index));
      index++;
      if (index >= answer.length) {
        clearInterval(typingInterval);
        setIsQuerying(false);
        setQueryStep(5);
        if (audioEnabled) {
          addLog("System voice assistant response spoken.");
        }
      }
    }, 15);
  };

  const handlePresetClick = (index: number) => {
    if (isQuerying) return;
    setSelectedPreset(index);
    setCustomQuery(presetQueries[index].question);
    handleQuery(presetQueries[index].question, index);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim() || isQuerying) return;
    setSelectedPreset(null);
    handleQuery(customQuery, null);
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row bg-background text-foreground text-sm overflow-hidden select-none">
      
      {/* 1. Left Section: Spatial Perception Camera Sandbox */}
      <div className="flex-grow flex flex-col p-6 lg:p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
              <Activity size={18} className="text-primary animate-pulse" />
              Spatial Perception Stream
            </h2>
            <p className="text-xs text-foreground/40 mt-1">Simulated camera view from the smart glasses feed</p>
          </div>
          
          {/* Audio voice mute */}
          <button 
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`p-3 rounded-full border transition-all duration-300 ${
              audioEnabled 
                ? "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20" 
                : "bg-white/5 border-white/10 text-foreground/30 hover:bg-white/10"
            }`}
          >
            {audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>

        {/* Viewfinder Canvas Frame */}
        <div 
          ref={canvasRef}
          className="relative w-full aspect-video rounded-3xl overflow-hidden glass border border-white/5 bg-black/40 shadow-2xl flex items-center justify-center min-h-[280px]"
        >
          {/* Grid Overlay */}
          {gridEnabled && (
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
          )}

          {/* Abstract spatial mesh visualizer representing LiDAR scanning */}
          <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
            <div className="w-[85%] h-[80%] border border-primary/20 rounded-full animate-pulse flex items-center justify-center">
              <div className="w-[70%] h-[70%] border border-secondary/15 rounded-full animate-ping" />
              <div className="w-[50%] h-[50%] border border-primary/10 rounded-full" />
            </div>
            {/* Center target crosshair */}
            <div className="absolute w-8 h-8 flex items-center justify-center">
              <div className="w-4 h-[1px] bg-white/30" />
              <div className="h-4 w-[1px] bg-white/30 absolute" />
            </div>
          </div>

          {/* Segmented object tags floating inside frame */}
          <AnimatePresence>
            {filteredObjects.map((obj) => {
              const showOutline = (obj.category === "object" && segEnabled) || 
                                  (obj.category === "person" && faceEnabled) || 
                                  (obj.category === "hazard" && hazardAlerts) ||
                                  (obj.category === "pathway" && segEnabled);

              if (!showOutline) return null;

              return (
                <motion.div
                  key={obj.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute rounded-xl overflow-hidden border border-white/10 shadow-lg select-none pointer-events-auto"
                  style={{
                    left: `${obj.x}%`,
                    top: `${obj.y}%`,
                    width: `${obj.w}%`,
                    height: `${obj.h}%`,
                    backgroundColor: obj.color,
                    borderColor: obj.category === "hazard" ? "rgba(239,68,68,0.7)" : "rgba(255,255,255,0.3)"
                  }}
                >
                  {/* Glowing neon aura */}
                  <div className={`absolute inset-0 ${
                    obj.category === "hazard" ? "animate-pulse border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" :
                    obj.category === "person" ? "border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]" :
                    obj.category === "pathway" ? "border-2 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]" :
                    "border border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                  }`} />

                  {/* Object Label details */}
                  <div className="absolute top-2 left-2 right-2 flex flex-col pointer-events-none select-none text-[9px] font-bold uppercase tracking-wider text-white bg-black/60 backdrop-blur-md rounded-md p-1.5 border border-white/5 space-y-0.5">
                    <span className="flex items-center gap-1">
                      {obj.category === "hazard" && <ShieldAlert size={10} className="text-red-400" />}
                      {obj.category === "person" && <UserCheck size={10} className="text-purple-400" />}
                      {obj.name}
                    </span>
                    <div className="flex justify-between text-[7px] text-white/50 pt-0.5 border-t border-white/5 mt-0.5">
                      <span>Conf: {obj.confidence}%</span>
                      <span>Dist: {obj.distance}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Bottom telemetry overlay inside camera */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[9px] uppercase tracking-widest font-bold text-white/60 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>LiDAR Grid: {gridEnabled ? "Active" : "Bypassed"}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>YOLOE-seg: {segEnabled ? "30 FPS" : "Muted"}</span>
              <span>FaceNet: {faceEnabled ? "Online" : "Muted"}</span>
            </div>
          </div>
        </div>

        {/* 2. Middle Section: ChromaDB Memory Console & RAG Playground */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-grow min-h-0">
          
          {/* Presets and Custom query (8 cols) */}
          <div className="md:col-span-7 flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <Database size={16} className="text-primary" />
              <h3 className="font-bold text-foreground">Alice AI (RAGsurrounds) Sandbox</h3>
            </div>
            
            <div className="glass rounded-3xl p-5 border border-white/5 space-y-4 flex-grow flex flex-col justify-between">
              {/* Presets list */}
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-bold tracking-widest text-foreground/40">Select Preset Memory Query</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {presetQueries.map((q, idx) => (
                    <button
                      key={idx}
                      disabled={isQuerying}
                      onClick={() => handlePresetClick(idx)}
                      className={`text-left p-3 rounded-2xl border text-xs font-medium transition-all cursor-pointer ${
                        selectedPreset === idx 
                          ? "bg-primary/10 border-primary/30 text-primary" 
                          : "bg-white/[0.01] border-white/5 hover:border-white/10 text-foreground/70 hover:text-white"
                      }`}
                    >
                      {q.question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom input */}
              <form onSubmit={handleCustomSubmit} className="space-y-2 pt-4 border-t border-white/5 mt-4">
                <p className="text-[10px] uppercase font-bold tracking-widest text-foreground/40">Or Ask Custom Surrounding Query</p>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    disabled={isQuerying}
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    placeholder="Where are my keys? / What obstacles lie ahead? ..."
                    className="w-full bg-black/40 border border-white/5 hover:border-white/10 focus:border-primary/30 focus:ring-1 focus:ring-primary/20 rounded-2xl py-3.5 pl-4 pr-12 text-xs text-foreground placeholder-foreground/30 focus:outline-none transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={isQuerying || !customQuery.trim()}
                    className="absolute right-2 p-2 bg-primary hover:bg-primary/95 text-white rounded-xl transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Search size={14} />
                  </button>
                </div>
              </form>

              {/* RAG response timeline area */}
              {queryStep > 0 && (
                <div className="mt-4 p-4 rounded-2xl bg-black/50 border border-white/5 space-y-3 flex-grow flex flex-col">
                  {/* Sequence mapping steps */}
                  <div className="flex items-center justify-between text-[8px] uppercase tracking-widest font-black text-foreground/30 pb-2 border-b border-white/5">
                    <span className={queryStep >= 1 ? "text-primary" : ""}>1. Embed</span>
                    <ChevronRight size={10} />
                    <span className={queryStep >= 2 ? "text-primary" : ""}>2. ChromaDB</span>
                    <ChevronRight size={10} />
                    <span className={queryStep >= 3 ? "text-primary" : ""}>3. Gemini</span>
                    <ChevronRight size={10} />
                    <span className={queryStep >= 4 ? "text-primary" : ""}>4. Synthesize</span>
                  </div>

                  {/* Dynamic loader state */}
                  {isQuerying && (
                    <div className="flex items-center gap-2 text-xs text-primary animate-pulse py-1">
                      <RefreshCw size={12} className="animate-spin" />
                      <span>
                        {queryStep === 1 && "Ingesting & Creating Embeddings Vector..."}
                        {queryStep === 2 && "Searching ChromaDB indexes (k=2 similarity)..."}
                        {queryStep === 3 && "Injecting context to Gemini 3 Flash model..."}
                        {queryStep === 4 && "Voice synthesized response mapping..."}
                      </span>
                    </div>
                  )}

                  {/* Typing Response output */}
                  {typedResponse && (
                    <div className="text-xs text-foreground/80 leading-relaxed bg-primary/[0.02] border border-primary/10 p-3 rounded-xl flex-grow font-display flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-widest text-primary mb-1">
                          <Sparkles size={10} className="animate-pulse" />
                          System Speech Output
                        </div>
                        <p>{typedResponse}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ChromaDB Vector Retrieval Feed (5 cols) */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <Database size={16} className="text-secondary" />
              <h3 className="font-bold text-foreground">Vector Retrieval Match (ChromaDB)</h3>
            </div>
            
            <div className="glass rounded-3xl p-5 border border-white/5 space-y-3 flex-grow overflow-y-auto max-h-[300px] md:max-h-none">
              <AnimatePresence>
                {ragMatches.length > 0 ? (
                  ragMatches.map((node, idx) => (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-white/10 transition-colors"
                    >
                      <div className="flex justify-between items-center text-[9px] uppercase tracking-wider font-bold">
                        <span className={`px-2 py-0.5 rounded-full ${
                          node.category === "hazard" ? "bg-red-500/10 text-red-400" :
                          node.category === "person" ? "bg-purple-500/10 text-purple-400" :
                          node.category === "pathway" ? "bg-emerald-500/10 text-emerald-400" :
                          "bg-blue-500/10 text-blue-400"
                        }`}>
                          {node.category}
                        </span>
                        <span className="text-foreground/40 font-display">{node.timeAgo}</span>
                      </div>
                      
                      <p className="text-xs text-foreground/80 leading-relaxed font-display">
                        "{node.description}"
                      </p>

                      <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[7px] text-foreground/30 font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          <MapPin size={9} />
                          {node.location}
                        </span>
                        <span className="text-secondary">Sim: {node.similarity.toFixed(3)}</span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-foreground/30 space-y-2">
                    <Database size={24} className="stroke-[1.5]" />
                    <p className="text-xs">No vector retrieved. Ingest a RAG query to pull local spatial memories from ChromaDB.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Right Sidebar: Perception Controls & Log Streams */}
      <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-white/5 bg-black/20 backdrop-blur-md flex flex-col shrink-0 overflow-y-auto">
        
        {/* Toggle Toggles */}
        <div className="p-6 lg:p-8 border-b border-white/5 space-y-6">
          <div className="flex items-center gap-2 text-foreground/80 font-bold">
            <Settings2 size={16} className="text-primary" />
            <h3>Spatial Telemetry Controls</h3>
          </div>

          <div className="space-y-4">
            {/* Segmentation Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-foreground">YOLOE-seg Segmentation</div>
                <div className="text-[10px] text-foreground/40">Draw object boundary masks</div>
              </div>
              <button
                onClick={() => {
                  setSegEnabled(!segEnabled);
                  addLog(`YOLOE-seg segmentation ${!segEnabled ? "enabled" : "disabled"}.`);
                }}
                className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 relative cursor-pointer ${
                  segEnabled ? "bg-primary" : "bg-white/10"
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                  segEnabled ? "translate-x-5" : "translate-x-0"
                }`} />
              </button>
            </div>

            {/* FaceNet Tracking Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-foreground">FaceNet Recognition</div>
                <div className="text-[10px] text-foreground/40">Biometric reference comparison</div>
              </div>
              <button
                onClick={() => {
                  setFaceEnabled(!faceEnabled);
                  addLog(`FaceNet Face tracking pipeline ${!faceEnabled ? "enabled" : "disabled"}.`);
                }}
                className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 relative cursor-pointer ${
                  faceEnabled ? "bg-primary" : "bg-white/10"
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                  faceEnabled ? "translate-x-5" : "translate-x-0"
                }`} />
              </button>
            </div>

            {/* LiDAR grid overlay */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-foreground">LiDAR Depth Grid</div>
                <div className="text-[10px] text-foreground/40">3D spatial coordinate projection</div>
              </div>
              <button
                onClick={() => {
                  setGridEnabled(!gridEnabled);
                  addLog(`LiDAR depth mesh projections ${!gridEnabled ? "drawn" : "bypassed"}.`);
                }}
                className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 relative cursor-pointer ${
                  gridEnabled ? "bg-primary" : "bg-white/10"
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                  gridEnabled ? "translate-x-5" : "translate-x-0"
                }`} />
              </button>
            </div>

            {/* Warning Alarm systems */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-foreground">Audio Hazard Alerts</div>
                <div className="text-[10px] text-foreground/40">Alarm speaker for proximity obstacles</div>
              </div>
              <button
                onClick={() => {
                  setHazardAlerts(!hazardAlerts);
                  addLog(`Audio hazard alert trigger thresholds ${!hazardAlerts ? "engaged" : "halted"}.`);
                }}
                className={`w-11 h-6 rounded-full p-1 transition-colors duration-300 relative cursor-pointer ${
                  hazardAlerts ? "bg-primary" : "bg-white/10"
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                  hazardAlerts ? "translate-x-5" : "translate-x-0"
                }`} />
              </button>
            </div>
          </div>

          {/* Slider Confidence threshold */}
          <div className="space-y-3 pt-6 border-t border-white/5">
            <div className="flex justify-between text-xs font-bold text-foreground">
              <span>Object Confidence Filter</span>
              <span className="text-primary">{confidenceThreshold}%</span>
            </div>
            <input
              type="range"
              min="80"
              max="95"
              step="1"
              value={confidenceThreshold}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setConfidenceThreshold(val);
                addLog(`Confidence filter adjusted to >= ${val}%.`);
              }}
              className="w-full h-1 bg-white/10 accent-primary rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-foreground/30 font-bold uppercase tracking-wider">
              <span>Loose (80%)</span>
              <span>Rigorous (95%)</span>
            </div>
          </div>
        </div>

        {/* Real-time system log stdout (Terminal style) */}
        <div className="p-6 lg:p-8 flex-grow flex flex-col space-y-4 min-h-[250px]">
          <div className="flex items-center justify-between text-foreground/80 font-bold">
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-primary" />
              <h3>Spatial Kernel Log stdout</h3>
            </div>
            
            <button 
              onClick={() => {
                setLogs([]);
                addLog("Log stream flushed.");
              }}
              className="text-[9px] uppercase tracking-widest text-foreground/40 hover:text-white cursor-pointer transition-colors"
            >
              Clear Logs
            </button>
          </div>

          <div className="flex-grow bg-black/50 border border-white/5 rounded-2xl p-4 font-mono text-[10px] text-foreground/75 leading-relaxed overflow-y-auto max-h-[300px] lg:max-h-none flex flex-col-reverse justify-end space-y-1.5 space-y-reverse select-text">
            {logs.map((log, i) => {
              const isHighlight = log.includes("Warning") || log.includes("hazard") || log.includes("Hazard");
              return (
                <div 
                  key={i} 
                  className={`border-l-2 pl-2 ${
                    isHighlight 
                      ? "border-red-500/80 text-red-300 bg-red-500/5 py-0.5" 
                      : log.includes("RAG") || log.includes("Query")
                      ? "border-blue-500/60 text-blue-300"
                      : "border-white/10"
                  }`}
                >
                  {log}
                </div>
              );
            })}
            {logs.length === 0 && (
              <div className="text-foreground/30 text-center py-8">Log stream empty. Telemetry awaiting cycle triggers.</div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
