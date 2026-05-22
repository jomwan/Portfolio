"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Server, Database, Activity, Play, RotateCcw, 
  AlertTriangle, CheckCircle2, Heart, ShieldAlert, Cpu
} from "lucide-react";

interface DataNode {
  id: string;
  name: string;
  rack: string;
  status: "online" | "offline";
  blocks: string[]; // block IDs stored on this node
  ip: string;
}

interface Block {
  id: string;
  name: string;
  color: string;
}

interface LogEntry {
  timestamp: string;
  message: string;
  type: "info" | "success" | "warn" | "error";
}

export default function HDFSSimulator() {
  const [dataNodes, setDataNodes] = useState<DataNode[]>([
    { id: "dn1", name: "DataNode 1", rack: "Rack 1", status: "online", blocks: [], ip: "192.168.1.10" },
    { id: "dn2", name: "DataNode 2", rack: "Rack 1", status: "online", blocks: [], ip: "192.168.1.11" },
    { id: "dn3", name: "DataNode 3", rack: "Rack 2", status: "online", blocks: [], ip: "192.168.2.10" },
  ]);

  const [nameNodeStatus, setNameNodeStatus] = useState<"active" | "standby">("active");
  const [fileSize, setFileSize] = useState<number>(128); // MB
  const [isIngesting, setIsIngesting] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeBlocks, setActiveBlocks] = useState<Block[]>([]);
  
  // For animating floating block packets
  const [blockPackets, setBlockPackets] = useState<{
    id: string;
    blockName: string;
    color: string;
    from: "namenode" | string;
    to: string;
  }[]>([]);

  const logsEndRef = useRef<HTMLDivElement | null>(null);

  // Add system logs
  const addLog = (message: string, type: LogEntry["type"] = "info") => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs((prev) => [...prev, { timestamp: time, message, type }].slice(-50)); // cap at 50 logs
  };

  useEffect(() => {
    addLog("HDFS Cluster Initialized. Active NameNode listening on hdfs://namenode-active:9000", "info");
    addLog("Standby NameNode configured for high availability (HA). Synced with EditLog.", "info");
    addLog("DataNodes registered successfully: DN1 (Rack 1), DN2 (Rack 1), DN3 (Rack 2).", "success");
  }, []);

  // Scroll logs to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Handle file ingestion and Rack Awareness replication
  const handleIngest = async () => {
    if (isIngesting) return;
    setIsIngesting(true);
    setBlockPackets([]);

    // Clear previous blocks to make simulation clear
    setDataNodes(prev => prev.map(dn => ({ ...dn, blocks: [] })));

    // Calculate blocks based on 64MB HDFS block size
    const numBlocks = Math.ceil(fileSize / 64);
    addLog(`Initiating write for ${fileSize}MB file. Partitioning into ${numBlocks} block(s) of 64MB...`, "info");

    const blockColors = ["#3b82f6", "#10b981", "#8b5cf6", "#ec4899"];
    const blocks: Block[] = Array.from({ length: numBlocks }, (_, i) => ({
      id: `blk-${i}`,
      name: `Block_${i}`,
      color: blockColors[i % blockColors.length],
    }));

    setActiveBlocks(blocks);

    // Run block placements one by one
    for (let index = 0; index < blocks.length; index++) {
      const block = blocks[index];
      await new Promise((resolve) => setTimeout(resolve, 600));

      addLog(`NameNode computing Rack-Aware block placement for ${block.name}...`, "info");
      
      // Rack Awareness Placement Rules:
      // 1. Replica 1: Local DataNode (we'll start with DN1 on Rack 1)
      // 2. Replica 2: Remote Rack node (DN3 on Rack 2)
      // 3. Replica 3: Same remote rack node, or another local rack node (DN2 on Rack 1, since Rack 2 has only DN3)
      const targets = ["dn1", "dn3", "dn2"];
      
      // Let's filter targets to only online ones
      const onlineTargets = targets.filter(tId => {
        const node = dataNodes.find(dn => dn.id === tId);
        return node && node.status === "online";
      });

      if (onlineTargets.length === 0) {
        addLog(`Write failed for ${block.name}: No online DataNodes available!`, "error");
        continue;
      }

      addLog(`NameNode pipelines write: Client ➔ ${onlineTargets.join(" ➔ ")}`, "info");

      // Send animation packet from NameNode to target nodes
      const packets = onlineTargets.map((targetId, pIdx) => ({
        id: `${block.id}-packet-${pIdx}-${Date.now()}`,
        blockName: block.name,
        color: block.color,
        from: "namenode" as const,
        to: targetId,
      }));

      setBlockPackets(prev => [...prev, ...packets]);

      // Delay to simulate replication transfer time
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Actually place the blocks on DataNodes
      setDataNodes(prev => prev.map(dn => {
        if (onlineTargets.includes(dn.id)) {
          return {
            ...dn,
            blocks: [...new Set([...dn.blocks, block.id])]
          };
        }
        return dn;
      }));

      setBlockPackets(prev => prev.filter(p => !packets.some(ap => ap.id === p.id)));
      addLog(`${block.name} successfully replicated (Factor: ${onlineTargets.length}x). Ack received.`, "success");
    }

    setIsIngesting(false);
  };

  // Toggle node failover / crash
  const toggleNodeStatus = (nodeId: string) => {
    setDataNodes(prev => prev.map(dn => {
      if (dn.id === nodeId) {
        const nextStatus = dn.status === "online" ? "offline" : "online";
        
        if (nextStatus === "offline") {
          addLog(`CRITICAL: Heartbeat lost from ${dn.name} (${dn.ip})!`, "error");
          
          // Trigger replication check after node crash
          setTimeout(() => {
            triggerSelfHealing(nodeId, dn.blocks);
          }, 1500);

        } else {
          addLog(`${dn.name} registered back online. Initiating block handshake...`, "success");
          addLog(`${dn.name} reporting ${dn.blocks.length} active blocks in block report.`, "info");
        }
        
        return {
          ...dn,
          status: nextStatus
        };
      }
      return dn;
    }));
  };

  // Re-replicate blocks if a node fails
  const triggerSelfHealing = (failedNodeId: string, lostBlocks: string[]) => {
    if (lostBlocks.length === 0) {
      addLog("No active blocks were hosted on the crashed node. Cluster remains healthy.", "info");
      return;
    }

    addLog(`NameNode checking health of blocks: ${lostBlocks.map(bId => activeBlocks.find(b => b.id === bId)?.name).join(", ")}`, "warn");

    lostBlocks.forEach(async (blockId) => {
      const block = activeBlocks.find(b => b.id === blockId);
      if (!block) return;

      // Find surviving nodes holding this block
      const survivorsWithBlock = dataNodes.filter(dn => dn.id !== failedNodeId && dn.status === "online" && dn.blocks.includes(blockId));
      
      if (survivorsWithBlock.length === 0) {
        addLog(`CRITICAL DAMAGE: ${block.name} has 0 replicas remaining! Data is lost.`, "error");
        return;
      }

      // Find nodes that don't have the block and are online
      const destinationNodes = dataNodes.filter(dn => dn.status === "online" && !dn.blocks.includes(blockId));

      if (destinationNodes.length === 0) {
        addLog(`Under-replication detected for ${block.name} (Replicas: ${survivorsWithBlock.length}x). No free DataNodes for reconstruction!`, "warn");
        return;
      }

      const sourceNode = survivorsWithBlock[0];
      const targetNode = destinationNodes[0];

      addLog(`Under-replication detected for ${block.name}. Scheduled self-healing reconstruction: ${sourceNode.name} ➔ ${targetNode.name}`, "warn");

      // Animate packet flowing between surviving DataNodes
      const selfHealingPacket = {
        id: `healing-${blockId}-${Date.now()}`,
        blockName: block.name,
        color: block.color,
        from: sourceNode.id,
        to: targetNode.id,
      };

      setBlockPackets(prev => [...prev, selfHealingPacket]);

      await new Promise(resolve => setTimeout(resolve, 1500));

      setDataNodes(prev => prev.map(dn => {
        if (dn.id === targetNode.id) {
          return {
            ...dn,
            blocks: [...new Set([...dn.blocks, blockId])]
          };
        }
        return dn;
      }));

      setBlockPackets(prev => prev.filter(p => p.id !== selfHealingPacket.id));
      addLog(`Self-healing completed for ${block.name}. Replicated from ${sourceNode.name} to ${targetNode.name}. Status: Healthy (3x)`, "success");
    });
  };

  const resetCluster = () => {
    setDataNodes([
      { id: "dn1", name: "DataNode 1", rack: "Rack 1", status: "online", blocks: [], ip: "192.168.1.10" },
      { id: "dn2", name: "DataNode 2", rack: "Rack 1", status: "online", blocks: [], ip: "192.168.1.11" },
      { id: "dn3", name: "DataNode 3", rack: "Rack 2", status: "online", blocks: [], ip: "192.168.2.10" },
    ]);
    setActiveBlocks([]);
    setBlockPackets([]);
    setIsIngesting(false);
    setLogs([]);
    addLog("Cluster state reset. All blocks purged.", "info");
  };

  return (
    <div className="bg-linear-to-b from-white/[0.03] to-white/[0.01] border border-white/5 rounded-3xl p-6 h-full flex flex-col gap-6 text-foreground">
      
      {/* NameNode Controller / Cluster Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* NameNode Panel */}
        <div className="glass p-4 rounded-2xl border border-white/5 relative flex flex-col gap-2 md:col-span-2 overflow-hidden">
          <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-bold text-emerald-400 uppercase tracking-widest">
            <Heart size={8} className="animate-pulse" /> Active NameNode
          </div>

          <div className="flex items-center gap-3">
            <Cpu size={24} className="text-primary" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/80">Cluster Management (Metadata)</h4>
              <p className="text-[10px] text-foreground/40 font-mono">hdfs://namenode-active:9000 (Standby HA Synced)</p>
            </div>
          </div>

          {/* Mini Status Metrics */}
          <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-white/5">
            <div className="text-center bg-black/20 rounded-lg p-1.5">
              <span className="block text-[12px] font-mono font-bold text-emerald-400">
                {dataNodes.filter(n => n.status === "online").length}/3
              </span>
              <span className="block text-[8px] uppercase tracking-wider text-foreground/30 font-bold">DataNodes</span>
            </div>
            <div className="text-center bg-black/20 rounded-lg p-1.5">
              <span className="block text-[12px] font-mono font-bold text-primary">
                {activeBlocks.length}
              </span>
              <span className="block text-[8px] uppercase tracking-wider text-foreground/30 font-bold">Files Blocks</span>
            </div>
            <div className="text-center bg-black/20 rounded-lg p-1.5">
              <span className="block text-[12px] font-mono font-bold text-indigo-400">
                3x
              </span>
              <span className="block text-[8px] uppercase tracking-wider text-foreground/30 font-bold">Replication</span>
            </div>
          </div>
        </div>

        {/* Configuration Action Panel */}
        <div className="glass p-4 rounded-2xl border border-white/5 flex flex-col justify-between gap-3">
          <div>
            <div className="flex justify-between items-center text-[10px] text-foreground/50 mb-1 font-bold">
              <span>FILE SIZE TO INGEST</span>
              <span className="font-mono text-primary">{fileSize} MB</span>
            </div>
            <input
              type="range"
              min="64"
              max="256"
              step="64"
              value={fileSize}
              onChange={(e) => setFileSize(Number(e.target.value))}
              disabled={isIngesting}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary disabled:opacity-50"
            />
            <span className="text-[7.5px] text-foreground/30 font-mono block mt-1">
              *HDFS Block Size: 64MB. Results in {Math.ceil(fileSize / 64)} blocks.
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleIngest}
              disabled={isIngesting || dataNodes.filter(n => n.status === "online").length === 0}
              className="flex-1 py-2 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
            >
              <Play size={10} /> Ingest File
            </button>
            <button
              onClick={resetCluster}
              disabled={isIngesting}
              className="px-3 py-2 bg-white/5 border border-white/10 text-foreground/80 hover:bg-white/10 transition-all rounded-xl flex items-center justify-center"
              title="Reset Cluster"
            >
              <RotateCcw size={11} />
            </button>
          </div>
        </div>
      </div>

      {/* Cluster Map Visual Area */}
      <div className="bg-black/40 border border-white/5 rounded-2xl p-6 relative min-h-64 flex flex-col justify-between overflow-hidden">
        <div className="absolute top-4 left-4 text-[8px] font-mono uppercase tracking-widest text-foreground/30 font-bold">
          Active HDFS Network Diagram
        </div>

        {/* Floating Animation Packets */}
        <AnimatePresence>
          {blockPackets.map((packet) => {
            // Find coordinate calculations based on target nodes
            const isToDN1 = packet.to === "dn1";
            const isToDN2 = packet.to === "dn2";
            const isToDN3 = packet.to === "dn3";

            // Map from names to CSS percentages coordinates inside the block diagram
            let fromX = "50%";
            let fromY = "10%";
            let toX = "16%";
            let toY = "75%";

            if (packet.from !== "namenode") {
              const srcNode = packet.from;
              if (srcNode === "dn1") { fromX = "16%"; fromY = "75%"; }
              else if (srcNode === "dn2") { fromX = "50%"; fromY = "75%"; }
              else if (srcNode === "dn3") { fromX = "84%"; fromY = "75%"; }
            }

            if (isToDN1) { toX = "16%"; toY = "75%"; }
            else if (isToDN2) { toX = "50%"; toY = "75%"; }
            else if (isToDN3) { toX = "84%"; toY = "75%"; }

            return (
              <motion.div
                key={packet.id}
                initial={{ left: fromX, top: fromY, scale: 0, opacity: 0 }}
                animate={{ left: toX, top: toY, scale: 1.2, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute w-5 h-5 rounded-lg border border-white/20 shadow-lg flex items-center justify-center text-[7px] font-black z-20"
                style={{ backgroundColor: packet.color }}
              >
                {packet.blockName.split("_")[1]}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Top Node representation */}
        <div className="flex justify-center mb-6">
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary relative">
              <Server size={18} />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black animate-ping" />
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black" />
            </div>
            <span className="text-[8px] font-mono tracking-wider font-bold">NAME_NODE</span>
          </div>
        </div>

        {/* Connection pipeline wires */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
          <line x1="50%" y1="20%" x2="16%" y2="70%" stroke="white" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="50%" y1="20%" x2="50%" y2="70%" stroke="white" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="50%" y1="20%" x2="84%" y2="70%" stroke="white" strokeWidth="1" strokeDasharray="3,3" />
          
          {/* Inter-rack path */}
          <path d="M 16% 70% Q 50% 90% 84% 70%" fill="none" stroke="white" strokeWidth="1" strokeDasharray="2,2" />
        </svg>

        {/* Racks and DataNodes representation */}
        <div className="grid grid-cols-2 gap-8 z-10">
          
          {/* Rack 1 */}
          <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-3 flex flex-col gap-2 relative">
            <span className="absolute top-1 right-2 text-[7px] uppercase tracking-widest text-foreground/30 font-bold">Rack 1</span>
            
            <div className="grid grid-cols-2 gap-2 mt-1">
              {dataNodes.slice(0, 2).map((dn) => (
                <div 
                  key={dn.id}
                  onClick={() => !isIngesting && toggleNodeStatus(dn.id)}
                  className={`cursor-pointer rounded-xl p-2.5 border transition-all flex flex-col justify-between min-h-24 ${
                    dn.status === "online" 
                      ? "bg-black/40 border-white/5 hover:border-primary/20" 
                      : "bg-red-500/5 border-red-500/20 hover:border-red-500/30 grayscale-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <Database size={14} className={dn.status === "online" ? "text-foreground/60" : "text-red-500"} />
                    <div className={`w-1.5 h-1.5 rounded-full ${dn.status === "online" ? "bg-emerald-500 shadow-xs shadow-emerald-400" : "bg-red-500"}`} />
                  </div>
                  
                  <div className="my-1.5">
                    <span className={`block text-[8px] font-bold ${dn.status === "online" ? "text-foreground" : "text-red-400 line-through"}`}>{dn.name}</span>
                    <span className="block text-[6.5px] font-mono text-foreground/30">{dn.ip}</span>
                  </div>

                  {/* Display blocks residing on this node */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {dn.status === "online" && dn.blocks.map((bId) => {
                      const blk = activeBlocks.find(b => b.id === bId);
                      if (!blk) return null;
                      return (
                        <div 
                          key={bId} 
                          className="px-1 py-0.5 rounded-sm text-[6px] font-black text-white"
                          style={{ backgroundColor: blk.color }}
                        >
                          {blk.name.split("_")[1]}
                        </div>
                      );
                    })}
                    {dn.status === "offline" && (
                      <span className="text-[6.5px] font-bold text-red-500 uppercase tracking-widest">OFFLINE</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rack 2 */}
          <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-3 flex flex-col gap-2 relative">
            <span className="absolute top-1 right-2 text-[7px] uppercase tracking-widest text-foreground/30 font-bold">Rack 2</span>
            
            <div className="flex justify-center mt-1">
              {dataNodes.slice(2).map((dn) => (
                <div 
                  key={dn.id}
                  onClick={() => !isIngesting && toggleNodeStatus(dn.id)}
                  className={`cursor-pointer w-full rounded-xl p-2.5 border transition-all flex flex-col justify-between min-h-24 ${
                    dn.status === "online" 
                      ? "bg-black/40 border-white/5 hover:border-primary/20" 
                      : "bg-red-500/5 border-red-500/20 hover:border-red-500/30 grayscale-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <Database size={14} className={dn.status === "online" ? "text-foreground/60" : "text-red-500"} />
                    <div className={`w-1.5 h-1.5 rounded-full ${dn.status === "online" ? "bg-emerald-500 shadow-xs shadow-emerald-400" : "bg-red-500"}`} />
                  </div>
                  
                  <div className="my-1.5">
                    <span className={`block text-[8px] font-bold ${dn.status === "online" ? "text-foreground" : "text-red-400 line-through"}`}>{dn.name}</span>
                    <span className="block text-[6.5px] font-mono text-foreground/30">{dn.ip}</span>
                  </div>

                  {/* Display blocks residing on this node */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {dn.status === "online" && dn.blocks.map((bId) => {
                      const blk = activeBlocks.find(b => b.id === bId);
                      if (!blk) return null;
                      return (
                        <div 
                          key={bId} 
                          className="px-1 py-0.5 rounded-sm text-[6px] font-black text-white"
                          style={{ backgroundColor: blk.color }}
                        >
                          {blk.name.split("_")[1]}
                        </div>
                      );
                    })}
                    {dn.status === "offline" && (
                      <span className="text-[6.5px] font-bold text-red-500 uppercase tracking-widest">OFFLINE</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Terminal Log Output */}
      <div className="bg-black/60 border border-white/5 rounded-2xl p-4 flex flex-col font-mono text-[9px] h-40">
        <div className="text-[8px] uppercase tracking-wider text-foreground/30 font-bold mb-2 flex items-center gap-1.5 border-b border-white/5 pb-1">
          <Activity size={10} /> Cluster Activity Log Output
        </div>
        
        <div className="flex-grow overflow-y-auto space-y-1.5 custom-scrollbar">
          {logs.map((log, idx) => (
            <div key={idx} className="flex gap-2 leading-relaxed">
              <span className="text-foreground/30 select-none">[{log.timestamp}]</span>
              <span className={`
                ${log.type === "success" ? "text-emerald-400" : ""}
                ${log.type === "warn" ? "text-amber-400" : ""}
                ${log.type === "error" ? "text-red-400 font-bold" : ""}
                ${log.type === "info" ? "text-foreground/75" : ""}
              `}>
                {log.message}
              </span>
            </div>
          ))}
          <div ref={logsEndRef} />
        </div>
      </div>

    </div>
  );
}
