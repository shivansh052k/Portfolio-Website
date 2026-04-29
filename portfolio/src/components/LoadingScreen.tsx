"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9998] bg-[#080808] flex items-center justify-center"
        >
          <div className="relative flex items-center justify-center">
            <div className="loader-orb" />
            <span className="loader-orb-text">Generating</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}