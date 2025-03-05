// pages/about.js
'use client';
import MiniMont from '@/components/MiniMont/MiniMont';
import { motion } from 'framer-motion';

export default function MiniMonPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.4 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <>
      <section
        id="roadmap-banner"
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
          className="text-center text-blue-700"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl font-bold  text-blue-700 md:text-7xl"
            style={{
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
            }}
            variants={itemVariants}
          >
            Mini Mont
          </motion.h1>
          <motion.p
            className="mt-6 text-xl text-white md:text-2xl"
            style={{
              textShadow: '1px 1px 6px rgba(0, 0, 0, 0.7)',
            }}
            variants={itemVariants}
          >
    A relaxing game where you can farm and chill, idling at the bottom of the screen.
    </motion.p>
        </motion.div>
        {/* <Roadmap/> */}
        <MiniMont/>

      </section>
    </>
  );
}
