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
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
      className="
        mx-auto
        w-full
        max-w-7xl

        px-6
        py-8

        lg:px-8
        lg:py-10
      "
    >
      {children}
    </motion.main>
  );
}