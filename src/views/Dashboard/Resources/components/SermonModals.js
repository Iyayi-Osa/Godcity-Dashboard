import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import SermonForm from "./SermonForm";

const SermonModals = ({
  isOpen,
  onClose,
  handleSubmit,
  sermonData,
  handleChange,
  filePreview,
  modalType,
  selectedSermon,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {modalType === "upload" ? "Upload Sermon" : modalType === "edit" ? "Edit Sermon" : "Sermon Details"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {modalType === "view" && selectedSermon ? (
            <>
              <Text fontWeight="bold">Title:</Text>
              <Text>{selectedSermon.title}</Text>
              <Text fontWeight="bold">Speaker:</Text>
              <Text>{selectedSermon.speaker}</Text>
              <Text fontWeight="bold">Date:</Text>
              <Text>{selectedSermon.date}</Text>
              <Text fontWeight="bold">Description:</Text>
              <Text>{selectedSermon.description}</Text>
              {selectedSermon.file && (
                <Box mt={2}>
                  {selectedSermon.fileType.startsWith("audio/") ? (
                    <audio controls>
                      <source src={selectedSermon.file} type={selectedSermon.fileType} />
                      Your browser does not support the audio element.
                    </audio>
                  ) : selectedSermon.fileType.startsWith("video/") ? (
                    <video width="100%" controls>
                      <source src={selectedSermon.file} type={selectedSermon.fileType} />
                      Your browser does not support the video element.
                    </video>
                  ) : (
                    <Text>No preview available</Text>
                  )}
                </Box>
              )}
            </>
          ) : (
            <SermonForm
              sermonData={sermonData}
              handleChange={handleChange}
              filePreview={filePreview}
            />
          )}
        </ModalBody>
        <ModalFooter>
          {modalType !== "view" && (
            <Button colorScheme="gold" mr={3} onClick={handleSubmit}>
              {modalType === "upload" ? "Upload" : "Update"}
            </Button>
          )}
          <Button variant="ghost" onClick={onClose}>
            {modalType === "view" ? "Close" : "Cancel"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SermonModals;
