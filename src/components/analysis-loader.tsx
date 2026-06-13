"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/language-provider";

const stages = ["stage1", "stage2", "stage3", "stage4", "stage5"];

export function AnalysisLoader({ onComplete }: { onComplete: () => void }) {
  const { t } = useLanguage();
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stageInterval = setInterval(
      () => setStageIndex((i) => Math.min(i + 1, stages.length - 1)),
      600
    );
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          clearInterval(stageInterval);
          setTimeout(onComplete, 350);
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
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6">
      <p className="eyebrow mb-8">{t("preparingAnalysis")}</p>
      <AnimatePresence mode="wait">
        <motion.h1
          key={stageIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="max-w-3xl text-5xl font-semibold leading-[1.03] tracking-[-0.06em] md:text-7xl"
        >
          {t(stages[stageIndex])}.
        </motion.h1>
      </AnimatePresence>
      <div className="mt-16 h-px w-full bg-border">
        <motion.div className="h-px bg-foreground" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-4 text-xs text-muted-foreground">{progress}% {t("complete")}</p>
    </div>
  );
}
