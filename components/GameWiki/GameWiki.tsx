// pages/GameWikiComponent.js

import { Card } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle, // Icon for "How to Play"
  faBullseye, // Icon for "Goals"
  faUserShield, // Icon for "Classes" - represents characters or classes
  faMap, // Icon for "Map" - represents the world or map
  faScroll, // Icon for "Lore" - represents lore or story
  faGem, // Icon for "Equipment" - represents items or equipment
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const cards = [
  {
    title: "How to Play",
    description: "Learn the basics and get started with our game.",
    icon: faPlayCircle,
  },
  {
    title: "Goals",
    description: "Understand the objectives and goals within the game.",
    icon: faBullseye,
  },
  {
    title: "Classes",
    description: "Explore different character classes and their abilities.",
    icon: faUserShield,
  },
  {
    title: "Map",
    description: "Discover the vast world of our game and its regions.",
    icon: faMap,
  },
  {
    title: "Lore",
    description: "Dive into the rich lore and story of our game.",
    icon: faScroll,
  },
  {
    title: "Equipment",
    description: "Find detailed information on items and equipment.",
    icon: faGem,
  },
];

const GameWikiComponent = () => {
  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className="relative bg-[#131D2E] p-6 flex flex-col justify-between items-center duration-500 hover:bg-[#182438] text-center"
              style={{ height: "200px" }}
            >
              <div className="flex flex-col items-center space-y-4">
                <FontAwesomeIcon
                  icon={card.icon}
                  className="h-12 w-12 text-honey-200"
                />
                <p className="text-lg font-bold text-honey-200 sm:text-xl">
                  {card.title}
                </p>
                <p className="text-sm text-night-500 md:text-base md:leading-6">
                  {card.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GameWikiComponent;
