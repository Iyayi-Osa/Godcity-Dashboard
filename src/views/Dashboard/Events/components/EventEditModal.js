import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	RadioGroup,
	Radio,
	Stack,
} from "@chakra-ui/react";

function EventEditModal({ isOpen, onClose, eventData, handleChange, handleSubmit, bannerType, setBannerType }) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Edit Event</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl>
						<FormLabel>Title</FormLabel>
						<Input
							id="title"
							value={eventData.title}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl mt={4}>
						<FormLabel>Date</FormLabel>
						<Input
							id="date"
							type="date"
							value={eventData.date}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl mt={4}>
						<FormLabel>Description</FormLabel>
						<Textarea
							id="description"
							value={eventData.description}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl mt={4}>
						<FormLabel>Type</FormLabel>
						<Input
							id="type"
							value={eventData.type}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl mt={4}>
						<FormLabel>Banner</FormLabel>
						<RadioGroup
							onChange={setBannerType}
							value={bannerType}
						>
							<Stack direction="row">
								<Radio value="file">File</Radio>
								<Radio value="url">URL</Radio>
							</Stack>
						</RadioGroup>
						{bannerType === "file" ? (
							<Input
								id="banner"
								type="file"
								mt={2}
								onChange={handleChange}
							/>
						) : (
							<Input
								id="bannerUrl"
								placeholder="Enter image URL"
								mt={2}
								value={eventData.bannerUrl}
								onChange={handleChange}
							/>
						)}
					</FormControl>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme="gold" mr={3} onClick={handleSubmit}>
						Save
					</Button>
					<Button variant="ghost" onClick={onClose}>Cancel</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default EventEditModal;
