'use client';
import { motion } from 'framer-motion';
import { FaMapSigns, FaRegLightbulb, FaGamepad, FaPaintBrush } from 'react-icons/fa';
import { useRef } from 'react';

// Mock roadmap data
const featuresData = [
  {
    month: 'July',
    explanation:
      'In July, we focus on introducing a new map for players to explore, with exciting new challenges and features. The map will be expansive and filled with various types of terrain, offering fresh experiences for players.',
    updates: [
      { text: 'New Map', icon: <FaMapSigns /> },
      { text: 'Bug Fixes', icon: <FaRegLightbulb /> },
    ],
  },
  {
    month: 'August',
    explanation:
      'August brings a set of improvements aimed at enhancing gameplay experience, including a major quality-of-life update. We’re also adding new mechanics that will help players enjoy the game more intuitively.',
    updates: [
      { text: 'Quality of Life Update', icon: <FaRegLightbulb /> },
      { text: 'New Cosmetic Items', icon: <FaPaintBrush /> },
    ],
  },
  {
    month: 'September',
    explanation:
      'In September, we plan to introduce mini-games and additional content to keep players entertained. Players can expect challenges, rewards, and fun gameplay in these new mini-games.',
    updates: [
      { text: 'Mini Games', icon: <FaGamepad /> },
      { text: 'New Areas to Explore', icon: <FaMapSigns /> },
    ],
  },
  {
    month: 'October',
    explanation:
      'October will see further enhancements, including new seasonal events and player customization options. Expect Halloween-themed content, special rewards, and new customization tools for personalizing characters.',
    updates: [
      { text: 'Seasonal Events', icon: <FaRegLightbulb /> },
      { text: 'Player Customization', icon: <FaPaintBrush /> },
    ],
  },
];

const Roadmap = () => {
  // Create a ref array for each item using useRef, properly typed to accept HTMLDivElement[]
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Variants for animations
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="roadmap" className="py-16 px-4">
      <div className="container mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: -30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
        >
          {/* Optional introductory content */}
        </motion.div>

        {/* Roadmap Cards */}
        <div className="flex space-x-8 justify-center">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              ref={(el) => {
                // Only assign the ref without returning anything
                itemsRef.current[index] = el;
              }}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="rounded-lg bg-gray-100 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 w-96"
            >
              {/* Card Header (Month Name) */}
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-black">{feature.month}</h3>
              </div>

              {/* Explanation */}
              <p className="text-lg text-black mb-6">{feature.explanation}</p>

              {/* Updates List */}
              <div className="space-y-3">
                {feature.updates.map((update, idx) => (
                  <div key={idx} className="flex items-center text-black">
                    <span className="text-2xl mr-3">{update.icon}</span>
                    <span className="text-lg">{update.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
