// pages/about.js
'use client';
import { motion } from 'framer-motion';
import PatchNoteList from '@/components/patches/PatchNoteList';

const containerVariants = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.5,
    },
  },
};

export default function AboutPage() {
  return (
    <>
      <section
        id="home"
        className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px] bg-cover bg-center flex flex-col items-center"
        style={{
          backgroundImage: "url('/kingforge.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          height: '980px',
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >

        </motion.div>

        <div className="overflow-y-auto max-h-[80vh] w-full">
          <PatchNoteList />
        </div>
      </section>
    </>
  );
}
