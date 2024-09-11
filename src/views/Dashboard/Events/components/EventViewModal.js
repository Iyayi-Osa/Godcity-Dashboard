import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Image,
	AvatarGroup,
	Avatar,
	Button,
} from "@chakra-ui/react";

function EventViewModal({ isOpen, onClose, selectedEvent }) {

	console.log(selectedEvent);
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Event Details</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{selectedEvent && (
						<>
							{selectedEvent.bannerPath ? (
								<Image
									src={selectedEvent.bannerPath}
									alt={selectedEvent.title}
									boxSize="full"
									objectFit="cover"
									mb={4}
								/>
							) : (
								<Image
									src={selectedEvent.bannerUrl}
									alt={selectedEvent.title}
									boxSize="full"
									objectFit="cover"
									mb={4}
								/>
							)}
							<AvatarGroup size="sm" mb={4}>
								{selectedEvent?.members?.map((member, index) => (
									<Avatar
										name="Ryan Florence"
										key={index} // using index as a key here for simplicity
										src={member}
										_hover={{ zIndex: "3", cursor: "pointer" }}
									/>
								)) || <p>No members available</p>} {/* Fallback message */}
							</AvatarGroup>
							<FormControl id="title">
								<FormLabel>Title</FormLabel>
								<Input value={selectedEvent.title} isReadOnly />
							</FormControl>
							<FormControl id="date" mt={4}>
								<FormLabel>Date</FormLabel>
								<Input
									value={new Date(selectedEvent.date).toLocaleDateString()}
									isReadOnly
								/>
							</FormControl>
							<FormControl id="description" mt={4}>
								<FormLabel>Description</FormLabel>
								<Textarea value={selectedEvent.description} isReadOnly />
							</FormControl>
							<FormControl id="type" mt={4}>
								<FormLabel>Type</FormLabel>
								<Input value={selectedEvent.type} isReadOnly />
							</FormControl>
						</>
					)}
				</ModalBody>

				<ModalFooter>
					<Button variant="outline" onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default EventViewModal;
