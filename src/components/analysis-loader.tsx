"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";

const stages = [
  "Mapping business processes...",
  "Analyzing repetitive workflows...",
  "Identifying automation potential...",
  "Scoring AI opportunities...",
  "Generating recommendations...",
];

interface AnalysisLoaderProps {
  onComplete: () => void;
}

export function AnalysisLoader({ onComplete }: AnalysisLoaderProps) {
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setStageIndex((i) => Math.min(i + 1, stages.length - 1));
    }, 600);

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          clearInterval(stageInterval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + 2;
      });
    }, 50);

    return () => {
      clearInterval(stageInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative mb-12"
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 ring-1 ring-indigo-500/30">
          <Sparkles className="h-10 w-10 text-indigo-400" />
        </div>
        <motion.div
          className="absolute -inset-4 rounded-[2rem] border border-indigo-500/20"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <Loader2 className="absolute -right-1 -top-1 h-6 w-6 animate-spin text-cyan-400" />
      </motion.div>

      <h2 className="mb-2 text-2xl font-semibold">Analyzing your organization</h2>
      <p className="mb-8 text-muted-foreground">
        Our AI engine is evaluating implementation opportunities
      </p>

      <div className="w-full max-w-md">
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={stageIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-center text-sm text-muted-foreground"
          >
            {stages[stageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
