import { Feature } from "@/types/feature";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import {
  faGlobe,
  faUsers,
  faGem,
  faShieldAlt,
  faCog,
  faHandsHelping,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: <FontAwesomeIcon icon={faGlobe} size="2x" />,
    title: "Global Gameplay",
    paragraph:
      "Explore a vast and interconnected world with endless adventures and surprises around every corner.",
  },
  {
    id: 2,
    icon: <FontAwesomeIcon icon={faUsers} size="2x" />,
    title: "Community Interaction",
    paragraph:
      "Engage with a thriving community of players, forge alliances, and compete in massive multiplayer events.",
  },
  {
    id: 3,
    icon: <FontAwesomeIcon icon={faGem} size="2x" />,
    title: "Valuable Rewards",
    paragraph:
      "Earn valuable in-game rewards, including rare items and currencies, through quests and achievements.",
  },
  {
    id: 4,
    icon: <FontAwesomeIcon icon={faShieldAlt} size="2x" />,
    title: "Player Protection",
    paragraph:
      "Ensure your account's safety with advanced security measures and proactive community moderation.",
  },
  {
    id: 5,
    icon: <FontAwesomeIcon icon={faCog} size="2x" />,
    title: "Customizable Experience",
    paragraph:
      "Tailor your gameplay with customizable characters, skills, and gameplay preferences to suit your style.",
  },
  {
    id: 6,
    icon: <FontAwesomeIcon icon={faHandsHelping} size="2x" />,
    title: "Supportive Community",
    paragraph:
      "Receive help and guidance from a supportive community and dedicated customer service team.",
  },
];
export default featuresData;
