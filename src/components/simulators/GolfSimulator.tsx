"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Play, RefreshCw, AlertCircle, CheckCircle, Lock, ShieldAlert } from "lucide-react";

export default function GolfSimulator() {
  const [activeTab, setActiveTab] = useState<"erd" | "sql" | "concurrency">("erd");
  const [selectedQuery, setSelectedQuery] = useState(0);
  const [isQueryRunning, setIsQueryRunning] = useState(false);
  const [queryOutput, setQueryOutput] = useState<any[] | null>(null);
  
  // Concurrency state
  const [concurrencyLevel, setConcurrencyLevel] = useState(50);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [bookingSuccess, setBookingSuccess] = useState<boolean | null>(null);
  const [animationStep, setAnimationStep] = useState<"idle" | "request" | "locked" | "done">("idle");
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [simLogs]);

  const queries = [
    {
      sql: "SELECT * FROM CourseSlots WHERE is_booked = FALSE ORDER BY time ASC;",
      desc: "Find all available tee times across courses.",
      headers: ["slot_id", "course_name", "time", "is_booked"],
      rows: [
        { slot_id: 101, course_name: "Pine Valley", time: "07:30 AM", is_booked: "FALSE" },
        { slot_id: 102, course_name: "Pine Valley", time: "09:00 AM", is_booked: "FALSE" },
        { slot_id: 204, course_name: "St Andrews", time: "08:15 AM", is_booked: "FALSE" },
        { slot_id: 301, course_name: "Augusta National", time: "10:30 AM", is_booked: "FALSE" },
      ]
    },
    {
      sql: "SELECT b.booking_id, u.name, s.course_name, s.time \nFROM Bookings b \nJOIN Users u ON b.user_id = u.user_id \nJOIN CourseSlots s ON b.slot_id = s.slot_id;",
      desc: "Retrieve details of confirmed bookings with client data.",
      headers: ["booking_id", "client_name", "course_name", "tee_time"],
      rows: [
        { booking_id: 5001, client_name: "Alica Smith", course_name: "Augusta National", tee_time: "07:00 AM" },
        { booking_id: 5002, client_name: "Sai Swam", course_name: "Pine Valley", tee_time: "08:00 AM" },
        { booking_id: 5003, client_name: "John Doe", course_name: "St Andrews", tee_time: "09:30 AM" }
      ]
    },
    {
      sql: "SELECT course_name, COUNT(*) AS total_booked_slots \nFROM CourseSlots \nWHERE is_booked = TRUE \nGROUP BY course_name;",
      desc: "Analyze booking distribution per golf course.",
      headers: ["course_name", "total_booked_slots"],
      rows: [
        { course_name: "Pine Valley", total_booked_slots: "14" },
        { course_name: "St Andrews", total_booked_slots: "22" },
        { course_name: "Augusta National", total_booked_slots: "19" }
      ]
    }
  ];

  const runQuery = () => {
    setIsQueryRunning(true);
    setQueryOutput(null);
    setTimeout(() => {
      setIsQueryRunning(false);
      setQueryOutput(queries[selectedQuery].rows);
    }, 800);
  };

  const startConcurrencySimulation = () => {
    setIsSimulating(true);
    setSimLogs([]);
    setBookingSuccess(null);
    setAnimationStep("request");

    const addLog = (msg: string, delay: number) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setSimLogs((prev) => [...prev, msg]);
          resolve();
        }, delay);
      });
    };

    // Sequence of high-fidelity transactional execution logs
    (async () => {
      await addLog(`⚡ Window Opened: Initializing booking window with ${concurrencyLevel} simulated parallel connections...`, 100);
      await addLog(`[Thread-Pool] Ingesting ${concurrencyLevel} socket requests attempting to reserve Slot #102 (09:00 AM)`, 400);
      await addLog(`[DB-Engine] Executing query: SELECT * FROM CourseSlots WHERE slot_id = 102 FOR UPDATE;`, 500);
      
      setAnimationStep("locked");
      await addLog(`🔑 [ACQUIRED] Connection #14 successfully set EXCLUSIVE ROW-LEVEL LOCK on CourseSlots(slot_id = 102).`, 600);
      await addLog(`⏳ [BLOCKED] Connections #1 to #13 and #15 to #${concurrencyLevel} queued, waiting for lock release...`, 400);
      await addLog(`[Tx-Engine] Connection #14: INSERT INTO Bookings (user_id, slot_id) VALUES (409, 102);`, 500);
      await addLog(`[Tx-Engine] Connection #14: UPDATE CourseSlots SET is_booked = TRUE WHERE slot_id = 102;`, 400);
      
      setAnimationStep("done");
      await addLog(`✅ [COMMITTED] Connection #14: Transaction successfully committed. Lock released.`, 600);
      
      await addLog(`🔓 [ACQUIRED] Connection #34 (next in queue) sets lock on CourseSlots(slot_id = 102)...`, 400);
      await addLog(`❌ [ABORTED] Connection #34: Validation failed. Slot is already booked (is_booked = TRUE). Rolling back.`, 500);
      await addLog(`⚠️ [BATCH-REJECT] Remaining ${concurrencyLevel - 1} connections validation failed. Transactions aborted safely.`, 500);
      await addLog(`🛡️ [DATA INTEGRITY] Audit check passed: 1 booking recorded, 0 double-bookings. Concurrency control 100% stable.`, 400);
      
      setBookingSuccess(true);
      setIsSimulating(false);
    })();
  };

  return (
    <div className="bg-linear-to-b from-white/[0.03] to-white/[0.01] border border-white/5 rounded-3xl p-6 h-full flex flex-col">
      {/* Tabs Menu */}
      <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl mb-6">
        <button
          onClick={() => setActiveTab("erd")}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
            activeTab === "erd" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-foreground/50 hover:text-foreground"
          }`}
        >
          Schema Mapper
        </button>
        <button
          onClick={() => setActiveTab("sql")}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
            activeTab === "sql" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-foreground/50 hover:text-foreground"
          }`}
        >
          SQL Console
        </button>
        <button
          onClick={() => setActiveTab("concurrency")}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
            activeTab === "concurrency" ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-foreground/50 hover:text-foreground"
          }`}
        >
          Concurrency Control
        </button>
      </div>

      {/* ERD View */}
      {activeTab === "erd" && (
        <div className="flex-grow flex flex-col justify-center gap-6 py-4">
          <p className="text-xs text-foreground/50 text-center max-w-md mx-auto leading-relaxed">
            The relational database schema is normalized to **3rd Normal Form (3NF)** to ensure zero update anomalies, with indexation on search keys for high-performance scheduling queries.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Table Users */}
            <div className="glass border border-white/10 rounded-2xl p-4 flex flex-col">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-3">
                <Database size={14} className="text-blue-400" />
                <span className="text-xs font-black uppercase text-blue-400">Users</span>
              </div>
              <div className="space-y-2 text-[10px] font-mono">
                <div className="flex justify-between text-primary font-bold">
                  <span>🔑 user_id</span>
                  <span>INT (PK)</span>
                </div>
                <div className="flex justify-between text-foreground/75">
                  <span>username</span>
                  <span>VARCHAR(50)</span>
                </div>
                <div className="flex justify-between text-foreground/75">
                  <span>email</span>
                  <span>VARCHAR(100)</span>
                </div>
              </div>
            </div>

            {/* Table Bookings */}
            <div className="glass border border-primary/20 rounded-2xl p-4 flex flex-col shadow-inner">
              <div className="flex items-center gap-2 border-b border-primary/10 pb-2 mb-3">
                <Database size={14} className="text-primary" />
                <span className="text-xs font-black uppercase text-primary">Bookings</span>
              </div>
              <div className="space-y-2 text-[10px] font-mono">
                <div className="flex justify-between text-primary font-bold">
                  <span>🔑 booking_id</span>
                  <span>INT (PK)</span>
                </div>
                <div className="flex justify-between text-amber-400 font-bold">
                  <span>🔗 user_id</span>
                  <span>INT (FK)</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>🔗 slot_id</span>
                  <span>INT (FK)</span>
                </div>
                <div className="flex justify-between text-foreground/75">
                  <span>created_at</span>
                  <span>TIMESTAMP</span>
                </div>
              </div>
            </div>

            {/* Table CourseSlots */}
            <div className="glass border border-white/10 rounded-2xl p-4 flex flex-col">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-3">
                <Database size={14} className="text-emerald-400" />
                <span className="text-xs font-black uppercase text-emerald-400">CourseSlots</span>
              </div>
              <div className="space-y-2 text-[10px] font-mono">
                <div className="flex justify-between text-primary font-bold">
                  <span>🔑 slot_id</span>
                  <span>INT (PK)</span>
                </div>
                <div className="flex justify-between text-foreground/75">
                  <span>course_name</span>
                  <span>VARCHAR(100)</span>
                </div>
                <div className="flex justify-between text-foreground/75">
                  <span>time</span>
                  <span>TIME</span>
                </div>
                <div className="flex justify-between text-foreground/75">
                  <span>is_booked</span>
                  <span>BOOLEAN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SQL Query Console View */}
      {activeTab === "sql" && (
        <div className="flex-grow flex flex-col gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 block">Select Query Blueprint</label>
            <select
              value={selectedQuery}
              onChange={(e) => {
                setSelectedQuery(Number(e.target.value));
                setQueryOutput(null);
              }}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-foreground/80 font-medium focus:outline-none focus:border-primary/50 transition-all"
            >
              {queries.map((q, idx) => (
                <option key={idx} value={idx} className="bg-background text-foreground/80">
                  Query {idx + 1}: {q.desc}
                </option>
              ))}
            </select>
          </div>

          {/* SQL Editor Representation */}
          <div className="bg-black/40 border border-white/5 rounded-2xl p-4 flex-grow flex flex-col font-mono text-xs">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[9px] uppercase tracking-wider text-foreground/30 font-bold">SQL Editor</span>
              <button
                onClick={runQuery}
                disabled={isQueryRunning}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg font-bold text-[10px] uppercase tracking-wider hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                {isQueryRunning ? <RefreshCw size={10} className="animate-spin" /> : <Play size={10} />}
                Run Query
              </button>
            </div>
            
            <pre className="text-primary font-bold overflow-x-auto whitespace-pre p-2 bg-white/[0.02] border border-white/5 rounded-xl leading-relaxed flex-grow">
              {queries[selectedQuery].sql}
            </pre>
          </div>

          {/* Tabular Output */}
          <div className="h-44 bg-black/40 border border-white/5 rounded-2xl p-4 overflow-y-auto font-mono text-xs flex flex-col justify-center">
            {isQueryRunning ? (
              <div className="flex flex-col items-center gap-3">
                <RefreshCw size={24} className="text-primary animate-spin" />
                <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-wider">Executing Query Plan...</span>
              </div>
            ) : queryOutput ? (
              <div className="w-full h-full overflow-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-foreground/30 text-[9px] uppercase tracking-wider">
                      {queries[selectedQuery].headers.map((header) => (
                        <th key={header} className="pb-2 font-bold">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {queryOutput.map((row, idx) => (
                      <tr key={idx} className="border-b border-white/5 text-[10px] text-foreground/80 hover:bg-white/[0.02] transition-all">
                        {queries[selectedQuery].headers.map((header) => (
                          <td key={header} className="py-2.5">
                            {row[header]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center text-foreground/30 text-[10px] font-bold uppercase tracking-widest">
                No Results. Click "Run Query" to fetch from Database.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Concurrency Simulator View */}
      {activeTab === "concurrency" && (
        <div className="flex-grow flex flex-col gap-5 h-full">
          <div className="flex items-center justify-between">
            <div className="w-2/3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 block mb-2">Simulated Parallel Clients ({concurrencyLevel})</label>
              <input
                type="range"
                min="10"
                max="100"
                value={concurrencyLevel}
                onChange={(e) => setConcurrencyLevel(Number(e.target.value))}
                disabled={isSimulating}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
            <button
              onClick={startConcurrencySimulation}
              disabled={isSimulating}
              className="px-4 py-2.5 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <Play size={12} />
              Book Tee Time
            </button>
          </div>

          {/* Core Animated Locking Canvas */}
          <div className="h-32 border border-white/5 bg-black/40 rounded-2xl relative overflow-hidden flex items-center justify-center p-4">
            <div className="flex items-center gap-16 relative">
              {/* Clients side */}
              <div className="flex flex-col gap-1.5 items-center z-10">
                <div className="text-[9px] uppercase tracking-wider text-foreground/30 font-bold mb-1">Threads</div>
                <div className="flex -space-x-2">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={animationStep === "request" ? {
                        x: [0, 100, 100],
                        opacity: i === 3 ? 1 : [1, 1, 0],
                        scale: i === 3 ? 1 : [1, 0.8, 0],
                      } : animationStep === "locked" && i === 3 ? {
                        x: 100,
                      } : animationStep === "done" ? {
                        x: 0,
                        opacity: 1,
                        scale: 1,
                      } : { x: 0 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      className={`w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[8px] font-mono font-bold ${
                        i === 3 ? "bg-primary text-white" : "bg-white/10 text-foreground/60"
                      }`}
                    >
                      T{i + 1 * 7}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Transaction Barrier (Row Lock) */}
              <div className="h-10 w-[1px] bg-white/10 relative flex items-center justify-center">
                <AnimatePresence>
                  {animationStep === "locked" && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute p-1 bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded-lg flex items-center justify-center shadow-lg"
                    >
                      <Lock size={12} />
                    </motion.div>
                  )}
                  {animationStep === "done" && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute p-1 bg-green-500/20 border border-green-500/40 text-green-400 rounded-lg flex items-center justify-center shadow-lg"
                    >
                      <CheckCircle size={12} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Database Destination */}
              <div className="flex flex-col items-center">
                <div className="text-[9px] uppercase tracking-wider text-foreground/30 font-bold mb-1">Target Slot #102</div>
                <div className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                  animationStep === "locked" ? "bg-amber-500/10 border-amber-500/30 text-amber-400" :
                  animationStep === "done" ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-white/5 border-white/10 text-foreground/60"
                }`}>
                  <Database size={16} />
                  <span className="text-xs font-mono font-bold">09:00 AM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Audit Terminal Logs */}
          <div className="flex-grow bg-black/80 rounded-2xl border border-white/5 p-4 flex flex-col font-mono text-[9px] h-32 overflow-hidden relative">
            <div className="text-foreground/30 font-bold uppercase tracking-wider mb-2 pb-1.5 border-b border-white/5 flex justify-between items-center">
              <span>Transaction Engine Logs</span>
              {bookingSuccess && (
                <span className="flex items-center gap-1 text-green-400 font-bold uppercase text-[8px] tracking-[0.15em]">
                  <CheckCircle size={10} /> Data Safe
                </span>
              )}
            </div>
            <div className="flex-grow overflow-y-auto space-y-1.5 scrollbar-thin text-foreground/80">
              {simLogs.length === 0 ? (
                <div className="h-full flex items-center justify-center text-foreground/30 font-bold uppercase tracking-widest text-[8px]">
                  Waiting to ingest transaction queue...
                </div>
              ) : (
                simLogs.map((log, idx) => (
                  <div key={idx} className={`leading-relaxed ${
                    log.includes("✅") || log.includes("committed") || log.includes("🛡️") ? "text-green-400 font-bold" :
                    log.includes("ACQUIRED") || log.includes("🔑") ? "text-amber-400 font-bold" :
                    log.includes("❌") || log.includes("⚠️") || log.includes("aborted") ? "text-red-400/80 font-medium" : "text-foreground/70"
                  }`}>
                    {log}
                  </div>
                ))
              )}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
