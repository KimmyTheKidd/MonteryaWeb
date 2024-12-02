'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionTitle from '../Common/SectionTitle';
import SingleFeature from './SingleFeature';
import featuresData from './featuresData';

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="features" className="py-16 md:py-20 lg:py-28 bg-white">
      <div className="container mx-auto text-black text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: -30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
        >
          <SectionTitle
            title="Main Features"
            paragraph="Explore the vast world of our MMORPG with these exciting features designed to enhance your play-to-earn experience."
            center
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3 mt-10">
          {featuresData.map((feature) => {
            const ref = useRef(null);
            const isInView = useInView(ref, { amount: 0.3 }); // Adjust the visibility threshold to 30%

            return (
              <motion.div
                key={feature.id}
                ref={ref}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'} // Animate based on visibility
                variants={itemVariants}
                className="rounded-lg bg-gray-100 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <SingleFeature feature={feature} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
