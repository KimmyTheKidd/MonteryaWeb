'use client';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import SectionTitle from '../Common/SectionTitle';
import SingleFeature from './SingleFeature';
import featuresData from './featuresData';

const Features = () => {
  const [refMapping, setRefMapping] = useState<{ [key: string]: React.RefObject<HTMLDivElement> }>({});
  const [inViewStates, setInViewStates] = useState<{ [key: string]: boolean }>({});

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    // Create refs for each feature dynamically
    const newRefMapping = featuresData.reduce((prevVal, curVal) => {
      return { ...prevVal, [curVal.id]: React.createRef<HTMLDivElement>() };
    }, {});
    setRefMapping(newRefMapping);
  }, [featuresData]);

  useEffect(() => {
    // Check visibility for each ref using useInView
    const visibilityStates = Object.entries(refMapping).reduce((prevVal, [key, ref]) => {
      const isVisible = ref.current ? useInView(ref, { amount: 0.3 }) : false;
      return { ...prevVal, [key]: isVisible };
    }, {});
    setInViewStates(visibilityStates);
  }, [refMapping]);

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
          {featuresData.map((feature) => (
            <motion.div
              key={feature.id}
              ref={refMapping[feature.id]}
              initial="hidden"
              animate={inViewStates[feature.id] ? 'visible' : 'hidden'}
              variants={itemVariants}
              className="rounded-lg bg-gray-100 p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <SingleFeature feature={feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
