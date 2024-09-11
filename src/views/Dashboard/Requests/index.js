// components/Requests.jsx
import React, { useState, useEffect } from "react";
import { Box, Flex, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import { BACKEND_URL } from "backendurl";
import { useAuth } from "context/AuthContext";
import RequestsTable from "./components/RequestsTable"; // Import the RequestsTable component
import RequestModal from "./components/RequestModal"; // Import the RequestModal component
import Projects from "../Profile/components/Projects"; // Import the Projects component

function Requests() {
	const { user, role, isAdmin } = useAuth();
	const [requests, setRequests] = useState([]);
	const [selectedRequest, setSelectedRequest] = useState(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	useEffect(() => {
		fetchRequests();
	  }, []);
	  
	  const fetchRequests = async () => {
		try {
		  const response = await axios.get(`http://52.87.197.214:5000/api/requests`);
		  console.log('Fetched Data:', response.data); // Check if this logs correctly
		  setRequests(response.data);
		} catch (error) {
		  console.error("Error fetching requests:", error);
		}
	  };

	// Handle status update for a request
	const handleUpdateStatus = async (id, newStatus) => {
		try {
			const response = await axios.post(`${BACKEND_URL}/update-status`, {
				id,
				status: newStatus,
			});

			// Update the requests state with the new status
			const updatedRequests = requests.map((request) =>
				request.id === id ? response.data.updatedRequest : request
			);
			setRequests(updatedRequests);

			toast({
				title: "Request updated.",
				description: `The request status has been updated to ${newStatus}.`,
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		} catch (error) {
			toast({
				title: "Error updating request.",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	// Handle toggle attended status for a request
	const handleToggleAttend = async (id) => {
		try {
			const updatedRequest = requests.find((request) => request.id === id);
			const response = await axios.post(`${BACKEND_URL}/update-attend-status`, {
				id,
				attended: !updatedRequest.attended,
			});

			// Update the requests state with the new attended status
			const updatedRequests = requests.map((request) =>
				request.id === id ? response.data.updatedRequest : request
			);
			setRequests(updatedRequests);

			toast({
				title: "Request updated.",
				description: `The request has been ${
					response.data.updatedRequest.attended
						? "attended to"
						: "marked as not attended"
				}.`,
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		} catch (error) {
			toast({
				title: "Error updating request.",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	// Handle viewing details of a request
	const handleViewDetails = (request) => {
		setSelectedRequest(request);
		onOpen();
	};

	// Handle deleting a request
	const handleDeleteRequest = async (id) => {
		try {
			await axios.delete(`${BACKEND_URL}/delete-request/${id}`);
			setRequests(requests.filter((request) => request.id !== id));

			toast({
				title: "Request deleted.",
				description: "The request has been deleted.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		} catch (error) {
			toast({
				title: "Error deleting request.",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	// Filter requests based on user role and ID
	const filteredRequests =
	role === "admin"
	  ? requests
	  : requests.filter((request) => request.userId === user.userId);
  
  console.log('Filtered Requests:', filteredRequests); // 
  
	return (
		<Flex direction="column" pt={{ base: "120px", md: "75px" }}>
			<Projects
				title={isAdmin ? "Prayer Requests Management" : "My Prayer Requests"}
				description={
					isAdmin
						? "Manage and review prayer requests submitted by the community. Help organize and prioritize their needs."
						: "View and submit your prayer requests. Let your community support you through prayer."
				}
				isAdmin={isAdmin}
				userId={user.userId}
			/>

			<Box overflowX="auto">
				<RequestsTable
					requests={requests} // Pass the filtered requests to the table
					onToggleAttend={handleToggleAttend} // Handle toggling attendance
					onViewDetails={handleViewDetails} // Handle viewing details
					onDelete={handleDeleteRequest} // Handle deleting requests
					role={role} // Pass user role to the table
				/>
			</Box>

			<RequestModal
				isOpen={isOpen} // Control modal open state
				onClose={onClose} // Handle modal close
				request={selectedRequest} // Pass selected request to the modal
			/>
		</Flex>
	);
}

export default Requests;
