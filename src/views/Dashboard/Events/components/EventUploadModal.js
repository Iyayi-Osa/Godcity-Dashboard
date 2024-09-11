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
	Button,
	Radio,
	RadioGroup,
	Stack,
} from "@chakra-ui/react";

function EventUploadModal({
	isOpen,
	onClose,
	eventData,
	handleChange,
	handleSubmit,
	bannerType,
	setBannerType,
}) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Upload New Event</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl id="title" isRequired>
						<FormLabel>Title</FormLabel>
						<Input
							placeholder="Enter event title"
							value={eventData.title}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl id="date" mt={4} isRequired>
						<FormLabel>Date</FormLabel>
						<Input
							type="date"
							placeholder="Enter date"
							value={eventData.date}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl id="description" mt={4} isRequired>
						<FormLabel>Description</FormLabel>
						<Textarea
							placeholder="Enter description"
							value={eventData.description}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl id="type" mt={4} isRequired>
						<FormLabel>Type</FormLabel>
						<Input
							placeholder="Enter event type"
							value={eventData.type}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl as="fieldset" mt={4} isRequired>
						<FormLabel as="legend">Banner Type</FormLabel>
						<RadioGroup value={bannerType} onChange={setBannerType}>
							<Stack direction="row">
								<Radio value="file">Upload File</Radio>
								<Radio value="url">Image URL</Radio>
							</Stack>
						</RadioGroup>
					</FormControl>
					{bannerType === "file" ? (
						<FormControl id="banner" mt={4} isRequired>
							<FormLabel>Upload Banner</FormLabel>
							<Input type="file" onChange={handleChange} />
						</FormControl>
					) : (
						<FormControl id="bannerUrl" mt={4} isRequired>
							<FormLabel>Banner URL</FormLabel>
							<Input
								placeholder="Enter image URL"
								value={eventData.bannerUrl}
								onChange={handleChange}
							/>
						</FormControl>
					)}
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="gold" mr={3} onClick={handleSubmit}>
						Submit
					</Button>
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default EventUploadModal;
