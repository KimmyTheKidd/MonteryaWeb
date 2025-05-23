'use client';
import { motion } from 'framer-motion';
import UserSettingCard from '@/components/userSetting/userSettingCard';

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

export default function UserSetting() {
  return (
    <>
      <section
        id="home"
        className=" relative z-10 overflow-hidden bg-white pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px] flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('/kingforge.png')",
          backgroundSize: 'cover', // Ensure the background image covers the section
          backgroundRepeat: 'no-repeat', // Ensure the image is not repeated
          backgroundPosition: 'center center', // Center the image
          height: '980px', // Set a specific height if needed
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center"
        >
          <motion.h1
            className="text-4xl font-bold text- mb-8 p-6 bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            User Setting
          </motion.h1>
        </motion.div>

        <div className="flex justify-center w-full">
          <UserSettingCard />
        </div>
      </section>
    </>
  );
}
