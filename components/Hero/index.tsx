'use client';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

export default function RoadMapPage() {
  return (
    <section
      id="roadmap"
      className="dark:bg-gray-dark relative z-10 overflow-hidden bg-white pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px] bg-cover bg-center flex flex-col justify-center items-center text-center"
      style={{
        backgroundImage: "url('/rabbit_nobg.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        height: '1000px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-4xl"
      >
        <h1
          className="text-5xl font-bold text-white md:text-7xl"
          style={{
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
          }}
        >
          Embark on the Ultimate Adventure In{' '}
          <span className="text-blue-700">Monterya</span>!
        </h1>

        <p
          className="mt-6 text-xl text-white md:text-2xl"
          style={{
            textShadow: '1px 1px 6px rgba(0, 0, 0, 0.7)',
          }}
        >
          Explore a breathtaking open world, collect rare Veras, and earn
          rewards from our $50M treasure vault. The journey of discovery and
          fortune awaits—are you ready to take the leap?
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 rounded-full bg-blue-600 px-8 py-4 text-2xl font-semibold text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          <FaPlay className="inline-block mr-3" />
          Play Now
        </motion.button>
      </motion.div>
    </section>
  );
}
