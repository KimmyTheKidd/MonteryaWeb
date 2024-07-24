import { motion } from "framer-motion";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

interface PatchNoteProps {
  note: {
    title: string;
    description: string;
  };
  index: number;
}

const PatchNote = ({ note, index }: PatchNoteProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }} // Stagger the delay
      className="relative bg-gray-800 shadow-xl p-6 text-white transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:bg-gray-900"
    >
      <div className="flex flex-col items-center">
        <FontAwesomeIcon
          icon={faCog} // Replace with your chosen icon
          className="text-blue-300 hover:text-white cursor-pointer transition-colors text-3xl mb-4"
          onClick={onOpen} // Open modal on icon click
        />
        <h4
          className="text-xl font-bold mb-2 cursor-pointer hover:text-blue-400 transition-colors"
          onClick={onOpen}
        >
          {note.title}
        </h4>
        <div className="transition-all duration-300 h-[60px] overflow-hidden">
          <p>{note.description}</p>
        </div>
      </div>

      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="text-xl font-semibold text-white">
            {note.title}
          </ModalHeader>
          <ModalBody className="text-white">
            <p>{note.description}</p>
            {/* You can add more details or dynamic content here */}
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
