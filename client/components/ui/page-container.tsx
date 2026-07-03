'use client';

import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
}

export function PageContainer({
  children,
}: Props) {
  return (
    <motion.main
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className="mx-auto w-full max-w-7xl p-8"
    >
      {children}
    </motion.main>
  );
}