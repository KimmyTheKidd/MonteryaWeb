import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faBug,
  faLevelUpAlt,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const roadmapData = [
  {
    date: '2024-06-14',
    title: 'Version 1.0.0 Release',
    description: 'Initial release with basic features.',
    image: '/images/release.jpg',
    type: 'release',
  },
  {
    date: '2024-06-18',
    title: 'Version 1.0.2 Update',
    description: 'Bug fixes and performance improvements.',
    image: '/images/update.jpg',
    type: 'bugfix',
  },
  {
    date: '2024-06-28',
    title: 'Version 1.1.0 New Features',
    description: 'Added new levels and challenges.',
    image: '/images/new-features.jpg',
    type: 'newfeatures',
  },
  {
    date: '2024-07-18',
    title: 'Version 1.2.0 Expansion',
    description: 'Major expansion with new content.',
    image: '/images/expansion.jpg',
    type: 'newfeatures',
  },
  {
    date: '2024-08-10',
    title: 'Version 1.3.0 Major Update',
    description: 'Significant update with new features and improvements.',
    image: '/images/major-update.jpg',
    type: 'newfeatures',
  },
  {
    date: '2024-08-10',
    title: 'Version 1.3.0 Major Update',
    description: 'Significant update with new features and improvements.',
    image: '/images/major-update.jpg',
    type: 'newfeatures',
  },
  {
    date: '2024-08-10',
    title: 'Version 1.3.0 Major Update',
    description: 'Significant update with new features and improvements.',
    image: '/images/major-update.jpg',
    type: 'newfeatures',
  },
];

const RoadmapItem = ({ item, isCompleted }: any) => {
  let icon, iconColor;

  switch (item.type) {
    case 'release':
      icon = faStar;
      iconColor = 'text-yellow-400';
      break;
    case 'bugfix':
      icon = faBug;
      iconColor = 'text-red-500';
      break;
    case 'newfeatures':
      icon = faLevelUpAlt;
      iconColor = 'text-green-400';
      break;
    default:
      icon = faStar;
      iconColor = 'text-yellow-400';
  }

  return (
    <div className="flex flex-col items-center text-center p-4">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${isCompleted ? 'bg-blue-500' : 'bg-gray-700'} border-4 border-white`}
      >
        <FontAwesomeIcon icon={icon} className={`text-2xl ${iconColor}`} />
      </div>
      <div className="mt-2 text-white">
        <p className="text-lg font-bold">{item.title}</p>
        <p className="text-gray-400">{item.date}</p>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

const Roadmap = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [itemWidth, setItemWidth] = useState(300); // Default item width including margin/padding
  const nodesVisible = 4; // Number of nodes to show on screen
  const nodesCount = roadmapData.length;

  useEffect(() => {
    const updateItemWidth = () => {
      if (scrollRef.current) {
        const containerWidth = scrollRef.current.offsetWidth;
        setItemWidth(containerWidth / nodesVisible);
      }
    };

    updateItemWidth();
    window.addEventListener('resize', updateItemWidth);

    return () => window.removeEventListener('resize', updateItemWidth);
  }, [nodesVisible]);

  const scrollLeft = () => {
    setScrollPosition((prev) => Math.max(prev - 1, 0));
  };

  const scrollRight = () => {
    setScrollPosition((prev) => Math.min(prev + 1, nodesCount - nodesVisible));
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollPosition * itemWidth,
        behavior: 'smooth',
      });
    }
  }, [scrollPosition, itemWidth]);

  return (
    <div className="relative bg-slate-600/60 flex flex-col items-center p-4">
      <div className="relative w-full flex items-center">
        <button
          onClick={scrollLeft}
          className="absolute left-0 p-2 bg-gray-800 rounded-full text-white shadow-lg"
          style={{ zIndex: 10 }}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-2xl" />
        </button>
        <div
          ref={scrollRef}
          className="flex items-center space-x-6 overflow-x-scroll scrollbar-hide w-full"
        >
          {roadmapData.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{ width: itemWidth }}
            >
              <RoadmapItem item={item} isCompleted={index < 3} />
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 p-2 bg-gray-800 rounded-full text-white shadow-lg"
          style={{ zIndex: 10 }}
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Roadmap;
