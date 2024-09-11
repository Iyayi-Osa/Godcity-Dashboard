// components/RequestModal.jsx
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
  } from "@chakra-ui/react";
  import React from "react";
  
  function RequestModal({ isOpen, onClose, request }) {
    if (!request) return null;
  
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <p><strong>Name:</strong> {request.name}</p>
              <p><strong>Unit:</strong> {request.unit}</p>
              <p><strong>Status:</strong> {request.status}</p>
              <p><strong>Community:</strong> {request.community}</p>
              <p><strong>Description:</strong> {request.description}</p>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gold" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  
  export default RequestModal;
  