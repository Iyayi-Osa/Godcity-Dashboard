import React, { useState, useEffect } from "react";
import {
	Box,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	IconButton,
	useDisclosure,
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
	useToast,
	Image,
	Radio,
	RadioGroup,
	Stack,
	Flex,
	AvatarGroup,
	Avatar,
} from "@chakra-ui/react";
import axios from "axios";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";
import { BACKEND_URL } from "backendurl";
import { dashboardTableData } from "variables/general";
import { useAuth } from "context/AuthContext";
import EventUploadModal from "./components/EventUploadModal";
import EventViewModal from "./components/EventViewModal";
import EventEditModal from "./components/EventEditModal";

function Events() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [eventData, setEventData] = useState({
		title: "",
		date: "",
		description: "",
		type: "",
		banner: null,
		bannerUrl: "",
	});
	const [bannerType, setBannerType] = useState("file");
	const [events, setEvents] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [isViewOpen, setIsViewOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const toast = useToast();
	const { isAdmin } = useAuth();

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await axios.get(`${BACKEND_URL}/api/events`);
				setEvents(response.data);
			} catch (error) {
				toast({
					title: "Error fetching events.",
					description: error.message,
					status: "error",
					duration: 5000,
					isClosable: true,
				});
				setEvents(dashboardTableData);
			}
		};

		fetchEvents();
	}, [toast]);

	const handleChange = (e) => {
		const { id, value, files } = e.target;
		setEventData((prevData) => ({
			...prevData,
			[id]: files ? files[0] : value,
		}));
	};

	const handleSubmit = async () => {
		const formData = new FormData();
		formData.append("title", eventData.title);
		formData.append("date", eventData.date);
		formData.append("description", eventData.description);
		formData.append("type", eventData.type);

		if (bannerType === "file") {
			formData.append("banner", eventData.banner);
		} else {
			formData.append("bannerUrl", eventData.bannerUrl);
		}

		try {
			const response = await axios.post(`${BACKEND_URL}/api/events`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			toast({
				title: "Event created.",
				description: `Event "${eventData.title}" on ${eventData.date} has been created successfully.`,
				status: "success",
				duration: 5000,
				isClosable: true,
			});

			setEvents([...events, response.data]);
			setEventData({
				title: "",
				date: "",
				description: "",
				type: "",
				banner: null,
				bannerUrl: "",
			});

			onClose();
		} catch (error) {
			toast({
				title: "Error creating event.",
				description: error.response?.data?.message || error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const handleViewDetails = (event) => {
		setSelectedEvent(event);
		setIsViewOpen(true);
	};

	const handleEditEvent = (event) => {
		setEventData({
			title: event.title,
			date: event.date.split("T")[0], // Format date for input field
			description: event.description,
			type: event.type,
			banner: null,
			bannerUrl: event.bannerUrl || "",
		});
		setBannerType(event.banner ? "file" : "url");
		setIsEditOpen(true);
	};

	const handleCloseEdit = () => {
		setIsEditOpen(false);
		setEventData({
			title: "",
			date: "",
			description: "",
			type: "",
			banner: null,
			bannerUrl: "",
		});
	};

	const handleDeleteEvent = async (eventId) => {
		try {
			await axios.delete(`${BACKEND_URL}/api/events/${eventId}`);
			toast({
				title: "Event deleted.",
				description: "The event has been deleted successfully.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			setEvents(events.filter((event) => event._id !== eventId));
		} catch (error) {
			toast({
				title: "Error deleting event.",
				description: error.response?.data?.message || error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const handleCloseView = () => {
		setIsViewOpen(false);
		setSelectedEvent(null);
	};

	return (
		<Flex direction="column" pt={{ base: "120px", md: "75px" }}>
			{isAdmin && (
				<Button colorScheme="gold" mb={4} w="sm" onClick={onOpen}>
					Upload Event
				</Button>
			)}

			<Table variant="simple">
				<Thead>
					<Tr>
						<Th>Title</Th>
						<Th>Date</Th>
						<Th>Description</Th>
						<Th>Action</Th>
					</Tr>
				</Thead>
				<Tbody>
					{events.map((event) => (
						<Tr key={event._id}>
							<Td>{event.title}</Td>
							<Td>{new Date(event.date).toLocaleDateString()}</Td>
							<Td>{event.description}</Td>
							<Td>
								<IconButton
									colorScheme="gold"
									aria-label="View Details"
									icon={<FiEye />}
									onClick={() => handleViewDetails(event)}
								/>
								{isAdmin && (
									<>
										<IconButton
											colorScheme="blue"
											aria-label="Edit"
											icon={<FiEdit />}
											onClick={() => handleEditEvent(event)}
											ml={2}
										/>
										<IconButton
											colorScheme="red"
											aria-label="Delete"
											icon={<FiTrash />}
											onClick={() => handleDeleteEvent(event._id)}
											ml={2}
										/>
									</>
								)}
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>

			<EventUploadModal
				isOpen={isOpen}
				onClose={onClose}
				eventData={eventData}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				bannerType={bannerType}
				setBannerType={setBannerType}
			/>

			<EventEditModal
				isOpen={isEditOpen}
				onClose={handleCloseEdit}
				eventData={eventData}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				bannerType={bannerType}
				setBannerType={setBannerType}
			/>

			<EventViewModal
				isOpen={isViewOpen}
				onClose={handleCloseView}
				selectedEvent={selectedEvent}
			/>
		</Flex>
	);
}

export default Events;
