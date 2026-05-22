"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Sliders, ShieldCheck, ShieldAlert, CheckCircle2, AlertTriangle, 
  HelpCircle, Sparkles, BarChart2, Info
} from "lucide-react";

interface Preset {
  name: string;
  amount: number;
  distance: number;
  velocity: number;
  deviceTrust: number;
  description: string;
}

const PRESETS: Preset[] = [
  {
    name: "Safe Local Grocery",
    amount: 45,
    distance: 1.2,
    velocity: 1,
    deviceTrust: 0.95,
    description: "Small dollar amount, extremely close to home, low frequency, verified mobile device."
  },
  {
    name: "Suspicious Foreign ATM",
    amount: 800,
    distance: 1420,
    velocity: 1,
    deviceTrust: 0.15,
    description: "High withdrawal amount, located thousands of miles away on an unverified legacy ATM."
  },
  {
    name: "High-Velocity Carding Spike",
    amount: 120,
    distance: 15,
    velocity: 6,
    deviceTrust: 0.40,
    description: "Rapid successions of transactions in a short timeframe, triggering network velocity locks."
  }
];

// Seed 100 validation transactions once, so they are stable
const generateValidationSet = () => {
  const dataset = [];
  for (let i = 0; i < 100; i++) {
    // 12% fraud rate
    const isFraud = i < 12 ? 1 : 0;
    
    // Generate features with correlations
    let amount = Math.random() * 100 + (isFraud ? Math.random() * 1500 + 400 : Math.random() * 50);
    let distance = Math.random() * 10 + (isFraud ? Math.random() * 400 + 50 : Math.random() * 5);
    let velocity = Math.floor(Math.random() * 2) + 1 + (isFraud ? Math.floor(Math.random() * 4) + 2 : 0);
    let deviceTrust = Math.random() * 0.4 + 0.6 - (isFraud ? Math.random() * 0.6 + 0.3 : 0);
    deviceTrust = Math.max(0.01, Math.min(1.0, deviceTrust));

    // Calculate prediction probability for this validation sample
    const amtS = Math.min(amount, 2000) / 2000;
    const distS = Math.min(distance, 500) / 500;
    const velS = Math.min(velocity, 6) / 6;
    const devS = 1 - deviceTrust;
    
    const rawProb = 0.05 + (0.15 * amtS) + (0.35 * distS) + (0.30 * velS) + (0.20 * devS);
    const probability = Math.max(0.01, Math.min(0.99, rawProb));

    dataset.push({ isFraud, probability });
  }
  return dataset;
};

export default function FraudSimulator() {
  const [amount, setAmount] = useState<number>(120);
  const [distance, setDistance] = useState<number>(15); // miles/km
  const [velocity, setVelocity] = useState<number>(2); // transactions in last hour
  const [deviceTrust, setDeviceTrust] = useState<number>(0.85); // 0 to 1
  const [threshold, setThreshold] = useState<number>(0.50);

  // Generate validation dataset memoized
  const validationSet = useMemo(() => generateValidationSet(), []);

  // Live scoring model for current parameters
  // Base value represents model bias (standard default transaction risk)
  const baseValue = 0.05;

  const shapValues = useMemo(() => {
    // Standard scaling calculations
    const amtS = Math.min(amount, 2000) / 2000;
    const distS = Math.min(distance, 500) / 500;
    const velS = Math.min(velocity, 6) / 6;
    const devS = 1 - deviceTrust;

    // Direct additive attribution (SHAP values)
    const shapAmount = 0.15 * amtS;
    const shapDistance = 0.35 * distS;
    const shapVelocity = 0.30 * velS;
    const shapDevice = 0.20 * devS - 0.10; // offset so highly trusted devices subtract risk

    return {
      amount: shapAmount,
      distance: shapDistance,
      velocity: shapVelocity,
      device: shapDevice,
    };
  }, [amount, distance, velocity, deviceTrust]);

  const riskProbability = useMemo(() => {
    const total = baseValue + shapValues.amount + shapValues.distance + shapValues.velocity + shapValues.device;
    return Math.max(0.01, Math.min(0.99, total));
  }, [shapValues]);

  // Apply presets
  const applyPreset = (preset: Preset) => {
    setAmount(preset.amount);
    setDistance(preset.distance);
    setVelocity(preset.velocity);
    setDeviceTrust(preset.deviceTrust);
  };

  // Evaluate performance on validation set using current threshold
  const metrics = useMemo(() => {
    let tp = 0; // True Positive
    let fp = 0; // False Positive
    let fn = 0; // False Negative
    let tn = 0; // True Negative

    validationSet.forEach((item) => {
      const pred = item.probability >= threshold ? 1 : 0;
      if (item.isFraud === 1 && pred === 1) tp++;
      else if (item.isFraud === 0 && pred === 1) fp++;
      else if (item.isFraud === 1 && pred === 0) fn++;
      else if (item.isFraud === 0 && pred === 0) tn++;
    });

    const precision = tp + fp > 0 ? tp / (tp + fp) : 1.0;
    const recall = tp + fn > 0 ? tp / (tp + fn) : 1.0;
    const f1 = precision + recall > 0 ? 2 * (precision * recall) / (precision + recall) : 0.0;

    return { tp, fp, fn, tn, precision, recall, f1 };
  }, [threshold, validationSet]);

  return (
    <div className="bg-linear-to-b from-white/[0.03] to-white/[0.01] border border-white/5 rounded-3xl p-6 h-full flex flex-col gap-6 text-foreground">
      
      {/* Parameter Console & Presets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Preset Profiles */}
        <div className="space-y-3">
          <div className="text-[9px] uppercase tracking-wider text-foreground/30 font-bold flex items-center gap-1.5">
            <Sparkles size={10} /> Preconfigured Transactions
          </div>
          <div className="flex flex-col gap-2">
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(preset)}
                className="text-left bg-black/20 hover:bg-white/5 border border-white/5 hover:border-white/10 rounded-xl p-3 transition-all flex flex-col gap-1"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-foreground">{preset.name}</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-foreground/50 font-mono">
                    ${preset.amount}
                  </span>
                </div>
                <p className="text-[9px] text-foreground/40 leading-relaxed font-sans">{preset.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Parameter Sliders */}
        <div className="space-y-4 bg-black/20 border border-white/5 p-4 rounded-2xl flex flex-col justify-between">
          <div className="text-[9px] uppercase tracking-wider text-foreground/30 font-bold flex items-center gap-1.5">
            <Sliders size={10} /> Custom Feature Variables
          </div>

          <div className="space-y-3 flex-grow justify-center flex flex-col">
            {/* Amount */}
            <div>
              <div className="flex justify-between text-[10px] text-foreground/60 mb-0.5 font-bold">
                <span>Transaction Amount</span>
                <span className="font-mono text-primary">${amount.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="5"
                max="2000"
                step="5"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Distance */}
            <div>
              <div className="flex justify-between text-[10px] text-foreground/60 mb-0.5 font-bold">
                <span>Distance from Billing Address</span>
                <span className="font-mono text-blue-400">{distance.toFixed(1)} miles</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="500"
                step="5"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-400"
              />
            </div>

            {/* Velocity */}
            <div>
              <div className="flex justify-between text-[10px] text-foreground/60 mb-0.5 font-bold">
                <span>Transactions (Past Hour)</span>
                <span className="font-mono text-amber-500">{velocity} trx</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                step="1"
                value={velocity}
                onChange={(e) => setVelocity(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Device Trust */}
            <div>
              <div className="flex justify-between text-[10px] text-foreground/60 mb-0.5 font-bold">
                <span>Device Trust Factor</span>
                <span className="font-mono text-emerald-400">{(deviceTrust * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={deviceTrust}
                onChange={(e) => setDeviceTrust(Number(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Model Anomaly Gauge & SHAP Explainer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* Risk Probability Gauge */}
        <div className="glass p-4 rounded-2xl border border-white/5 flex flex-col justify-between items-center text-center relative overflow-hidden">
          <div className="absolute top-2 left-2 text-[8px] uppercase tracking-widest text-foreground/30 font-bold font-mono">
            Model Inference
          </div>

          <div className="my-auto py-3">
            <div className="text-3xl font-black font-mono tracking-tighter" style={{
              color: riskProbability > threshold ? "#ef4444" : "#10b981"
            }}>
              {(riskProbability * 100).toFixed(1)}%
            </div>
            <div className="text-[8px] uppercase tracking-widest text-foreground/40 font-bold mt-1">Anomaly Probability</div>
          </div>

          <div className="w-full flex flex-col gap-1.5">
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative">
              <div 
                className="absolute top-0 bottom-0 left-0 transition-all duration-300"
                style={{ 
                  width: `${riskProbability * 100}%`,
                  backgroundColor: riskProbability > threshold ? "#ef4444" : "#10b981"
                }}
              />
              {/* Threshold pointer marker */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-white z-10" 
                style={{ left: `${threshold * 100}%` }}
                title="Threshold"
              />
            </div>
            <div className="flex justify-between text-[7.5px] font-mono text-foreground/30 uppercase">
              <span>Safe</span>
              <span>Threshold ({(threshold * 100).toFixed(0)}%)</span>
              <span>Fraud</span>
            </div>
          </div>

          <div className="w-full mt-2 pt-2 border-t border-white/5 flex items-center justify-center gap-1.5">
            {riskProbability > threshold ? (
              <>
                <ShieldAlert size={12} className="text-red-500 animate-pulse" />
                <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest">Flagged Anomaly (Block)</span>
              </>
            ) : (
              <>
                <ShieldCheck size={12} className="text-emerald-500" />
                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Approved Safe</span>
              </>
            )}
          </div>
        </div>

        {/* SHAP Feature Contributions */}
        <div className="glass p-4 rounded-2xl border border-white/5 md:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[8px] uppercase tracking-widest text-foreground/30 font-bold font-mono">
              SHAP Explainer (Local Feature Attribution)
            </span>
            <span className="text-[7.5px] px-1 bg-white/5 border border-white/10 text-foreground/40 font-mono rounded">
              Base Value: {baseValue.toFixed(2)}
            </span>
          </div>

          <div className="space-y-2.5 my-auto">
            {/* SHAP amount */}
            <div>
              <div className="flex justify-between text-[8px] font-mono text-foreground/50 mb-0.5">
                <span>Amount contribution</span>
                <span className="text-red-400 font-bold">+{shapValues.amount.toFixed(3)}</span>
              </div>
              <div className="h-2 bg-black/20 border border-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500/60 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (shapValues.amount / 0.5) * 100)}%` }}
                />
              </div>
            </div>

            {/* SHAP distance */}
            <div>
              <div className="flex justify-between text-[8px] font-mono text-foreground/50 mb-0.5">
                <span>Distance contribution</span>
                <span className="text-red-400 font-bold">+{shapValues.distance.toFixed(3)}</span>
              </div>
              <div className="h-2 bg-black/20 border border-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500/60 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (shapValues.distance / 0.5) * 100)}%` }}
                />
              </div>
            </div>

            {/* SHAP velocity */}
            <div>
              <div className="flex justify-between text-[8px] font-mono text-foreground/50 mb-0.5">
                <span>Velocity contribution</span>
                <span className="text-red-400 font-bold">+{shapValues.velocity.toFixed(3)}</span>
              </div>
              <div className="h-2 bg-black/20 border border-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500/60 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (shapValues.velocity / 0.5) * 100)}%` }}
                />
              </div>
            </div>

            {/* SHAP Device */}
            <div>
              <div className="flex justify-between text-[8px] font-mono text-foreground/50 mb-0.5">
                <span>Device Trust contribution</span>
                <span className={shapValues.device >= 0 ? "text-red-400 font-bold" : "text-emerald-400 font-bold"}>
                  {shapValues.device >= 0 ? "+" : ""}{shapValues.device.toFixed(3)}
                </span>
              </div>
              <div className="h-2 bg-black/20 border border-white/5 rounded-full overflow-hidden relative flex">
                {shapValues.device >= 0 ? (
                  <div 
                    className="h-full bg-red-500/60 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (shapValues.device / 0.5) * 100)}%` }}
                  />
                ) : (
                  <div 
                    className="h-full bg-emerald-500/60 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (Math.abs(shapValues.device) / 0.5) * 100)}%` }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Threshold, Confusion Matrix & Performance Metrics */}
      <div className="bg-black/20 border border-white/5 rounded-2xl p-4 flex flex-col gap-4">
        
        {/* Classification Slider */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div className="max-w-xs">
            <span className="text-[9px] uppercase tracking-wider text-foreground/30 font-bold flex items-center gap-1.5">
              <BarChart2 size={10} /> Classification Decision Threshold
            </span>
            <p className="text-[7.5px] text-foreground/40 leading-normal mt-0.5">
              Adjust the model cutoff boundary. Sliding down catches more fraud (high recall) but triggers false alarms (low precision).
            </p>
          </div>
          <div className="flex-grow max-w-md flex items-center gap-3">
            <span className="text-[9px] font-mono text-foreground/40">0.0</span>
            <input
              type="range"
              min="0.05"
              max="0.95"
              step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <span className="text-[9px] font-mono text-foreground/40">1.0</span>
            <div className="px-2 py-1 rounded bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] font-black min-w-10 text-center">
              {threshold.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Matrix & Score displays */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Confusion Matrix (Dynamic) */}
          <div className="space-y-2">
            <div className="text-[8px] uppercase tracking-widest text-foreground/30 font-bold font-mono">
              Confusion Matrix (N = 100 Validation Cases)
            </div>
            
            <div className="grid grid-cols-3 gap-1 text-[8px] text-center font-mono">
              {/* Labels header */}
              <div />
              <div className="text-foreground/40 font-bold uppercase py-0.5">PRED SAFE</div>
              <div className="text-foreground/40 font-bold uppercase py-0.5">PRED FRAUD</div>

              {/* Row 1: True Safe */}
              <div className="flex items-center justify-end text-foreground/40 font-bold uppercase pr-1.5 text-right">
                ACT SAFE
              </div>
              {/* True Negative */}
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-2.5 rounded-lg flex flex-col justify-center">
                <span className="text-[12px] font-black">{metrics.tn}</span>
                <span className="text-[6.5px] text-foreground/40 font-bold">True Negative</span>
              </div>
              {/* False Positive */}
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-2.5 rounded-lg flex flex-col justify-center">
                <span className="text-[12px] font-black">{metrics.fp}</span>
                <span className="text-[6.5px] text-foreground/40 font-bold">False Positive</span>
              </div>

              {/* Row 2: True Fraud */}
              <div className="flex items-center justify-end text-foreground/40 font-bold uppercase pr-1.5 text-right">
                ACT FRAUD
              </div>
              {/* False Negative */}
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-2.5 rounded-lg flex flex-col justify-center">
                <span className="text-[12px] font-black">{metrics.fn}</span>
                <span className="text-[6.5px] text-foreground/40 font-bold">False Negative</span>
              </div>
              {/* True Positive */}
              <div className="bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 p-2.5 rounded-lg flex flex-col justify-center">
                <span className="text-[12px] font-black">{metrics.tp}</span>
                <span className="text-[6.5px] text-foreground/40 font-bold">True Positive</span>
              </div>
            </div>
          </div>

          {/* Core Metrics */}
          <div className="space-y-3.5">
            <div className="text-[8px] uppercase tracking-widest text-foreground/30 font-bold font-mono">
              Model Assessment Metrics
            </div>

            <div className="space-y-2">
              {/* Precision */}
              <div>
                <div className="flex justify-between text-[9px] font-mono text-foreground/60 mb-0.5">
                  <span className="flex items-center gap-1 cursor-help" title="Proportion of flagged items that were actually fraud">
                    Precision <Info size={8} className="text-foreground/30" />
                  </span>
                  <span className="font-bold text-foreground">{(metrics.precision * 100).toFixed(0)}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${metrics.precision * 100}%` }}
                  />
                </div>
              </div>

              {/* Recall */}
              <div>
                <div className="flex justify-between text-[9px] font-mono text-foreground/60 mb-0.5">
                  <span className="flex items-center gap-1 cursor-help" title="Proportion of actual fraud that we successfully flagged">
                    Recall (Sensitivity) <Info size={8} className="text-foreground/30" />
                  </span>
                  <span className="font-bold text-foreground">{(metrics.recall * 100).toFixed(0)}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${metrics.recall * 100}%` }}
                  />
                </div>
              </div>

              {/* F1 Score */}
              <div>
                <div className="flex justify-between text-[9px] font-mono text-foreground/60 mb-0.5">
                  <span className="flex items-center gap-1 flex-row cursor-help" title="Balanced measure combining precision and recall">
                    F1-Score (Harmonic Mean) <Info size={8} className="text-foreground/30" />
                  </span>
                  <span className="font-bold text-primary">{(metrics.f1 * 100).toFixed(0)}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-linear-to-r from-primary to-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${metrics.f1 * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
