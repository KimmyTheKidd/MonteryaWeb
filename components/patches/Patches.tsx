import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBug,
  faPlusCircle,
  faTools,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';

interface PatchNoteProps {
  note: {
    title: string;
    description: string;
    bugFixes?: string[];
    NewFeatures?: string[];
    improvements?: string[];
  };
  index: number;
}

const PatchNote = ({ note, index }: PatchNoteProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative bg-[#131D2E] p-4 rounded-lg shadow-lg text-honey-200 transition-transform transform hover:bg-[#182438] hover:shadow-xl hover:-translate-y-1"
    >
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          icon={faExclamationCircle}
          className="text-3xl mb-2 text-honey-200 cursor-pointer hover:text-honey-100 transition-colors"
          onClick={onOpen}
        />
        <h4
          className="text-lg font-semibold mb-2 cursor-pointer hover:text-honey-100 transition-colors"
          onClick={onOpen}
        >
          {note.title}
        </h4>
        <div className="transition-all duration-300 h-[60px] overflow-hidden">
          <p>{note.description}</p>
        </div>
      </div>

      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-[#131D2E] text-honey-200">
          <ModalHeader className="text-lg font-semibold text-honey-200">
            {note.title}
          </ModalHeader>
          <ModalBody className="text-honey-200">
            <p>{note.description}</p>
            {note.bugFixes && note.bugFixes.length > 0 && (
              <div className="mt-4">
                <FontAwesomeIcon icon={faBug} className="text-red-500 mr-2" />
                <span className="font-bold">Bug Fixes:</span>
                <ul className="list-disc list-inside">
                  {note.bugFixes.map((bug, idx) => (
                    <li key={idx}>{bug}</li>
                  ))}
                </ul>
              </div>
            )}
            {note.NewFeatures && note.NewFeatures.length > 0 && (
              <div className="mt-4">
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  className="text-green-500 mr-2"
                />
                <span className="font-bold">New Features:</span>
                <ul className="list-disc list-inside">
                  {note.NewFeatures.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            {note.improvements && note.improvements.length > 0 && (
              <div className="mt-4">
                <FontAwesomeIcon
                  icon={faTools}
                  className="text-yellow-500 mr-2"
                />
                <span className="font-bold">Improvements:</span>
                <ul className="list-disc list-inside">
                  {note.improvements.map((improvement, idx) => (
                    <li key={idx}>{improvement}</li>
                  ))}
                </ul>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </motion.div>
  );
};

export default PatchNote;
