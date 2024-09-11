// Chakra imports
import {
	Button,
	Flex,
	Grid,
	Icon,
	Text,
	useColorModeValue,
	useDisclosure, // Import for managing modal state
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";
import { FaPlus } from "react-icons/fa";
import ProjectCard from "./ProjectCard";
import { requests } from "variables/request";
import CreateRequest from "./CreateRequest";

// A utility function to filter requests based on role
const filterRequests = (requests, isAdmin, userId) => {
	if (isAdmin) {
		return requests; // Admin sees all requests
	} else {
		// Filter requests based on user ID (or other criteria)
		return requests.filter((request) => request.userId === userId);
	}
};

const Projects = ({ title, description, isAdmin, userId }) => {
	// Chakra color mode
	const textColor = useColorModeValue("gray.700", "white");

	const filteredRequests = filterRequests(requests, isAdmin, userId);

	// Manage modal state
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Card p="16px" my="24px">
			<CardHeader p="12px 5px" mb="12px">
				<Flex direction="column">
					<Text fontSize="lg" color={textColor} fontWeight="bold">
						{title}
					</Text>
					<Text fontSize="sm" color="gray.500" fontWeight="400">
						{description}
					</Text>
				</Flex>
			</CardHeader>
			<CardBody px="5px">
				<Grid
					templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
					templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
					gap="24px"
				>
					{filteredRequests.map((request, index) => (
						<ProjectCard
							key={index}
							image={request.image}
							name={request.name}
							category={request.category}
							description={request.description}
							avatars={request.avatars}
						/>
					))}
					<Button
						p="0px"
						bg="transparent"
						color="gray.500"
						border="1px solid lightgray"
						borderRadius="15px"
						minHeight={{ sm: "200px", md: "100%" }}
						onClick={onOpen}
					>
						<Flex
							direction="row"
							justifyContent="center"
							align="center"
							p="32px"
						>
							<Icon as={FaPlus} fontSize="lg" mr="8px" />
							<Text fontSize="sm" fontWeight="bold" className="p-4">
								Create a New Request
							</Text>
						</Flex>
					</Button>
				</Grid>
			</CardBody>
			{/* Modal for creating a new request */}
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent
					bg="white" // Background color for modal content
					borderRadius="24px" // Custom border radius
					boxShadow="lg" // Box shadow for the modal
					p="24px" // Padding inside the modal
					maxWidth="500px" // Maximum width of the modal
				>
					<ModalCloseButton
						color="gray.600" // Color of the close button
						_hover={{ color: "red.500" }} // Hover effect for close button
						borderRadius="full"
					/>
					<ModalBody>
						<CreateRequest onClose={onClose} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</Card>
	);
};

export default Projects;
