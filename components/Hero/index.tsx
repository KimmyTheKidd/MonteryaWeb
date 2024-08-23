'use client';
import { motion } from 'framer-motion'; // Import Framer Motion

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

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px] bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage: "url('/rabbit_nobg.png')",
        backgroundSize: 'cover', // Adjust this property
        backgroundRepeat: 'no-repeat', // Ensure image is not repeated
        backgroundPosition: 'center center', // Center the image
        height: '1000px', // Set a specific height if needed
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex justify-center items-center min-h-screen"
      >
        <div className="container relative z-20 text-center max-w-[800px]">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mx-auto text-center"
                data-wow-delay=".2s"
              >
                <motion.div variants={itemVariants} className="mt-2 mb-4">
                  <h1 className="mb-5 text-3xl font-bold leading-tight text-white sm:text-4xl sm:leading-tight md:text-8xl md:leading-tight">
                    Welcome to Monterya
                  </h1>
                </motion.div>
                <p className="text-white mb-12 text-base leading-relaxed sm:text-lg md:text-2xl">
                  Join us for the adventure that is coming this year - The
                  Monterya Official 2024!
                </p>
                {/* Action buttons or additional content here */}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
