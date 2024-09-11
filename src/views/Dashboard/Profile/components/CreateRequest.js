import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Select,
	Text,
	Textarea,
	useColorModeValue,
	Checkbox,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuth } from "context/AuthContext";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique IDs
import defaultImage from "assets/img/avatars/avatar6.png";
import defaultAvatar from "assets/img/ImageArchitect1.png";

const CreateRequest = ({ onClose }) => {
	const { user } = useAuth();
	const textColor = useColorModeValue("gray.700", "white");

	const [requestName, setRequestName] = useState("");
	const [requestCategory, setRequestCategory] = useState("");
	const [requestDescription, setRequestDescription] = useState("");
	const [requestImage, setRequestImage] = useState(null); // State for image upload
	const [unit, setUnit] = useState("");
	const [community, setCommunity] = useState("");
	const [attended, setAttended] = useState(false);

	// Handle image upload
	const handleImageChange = (e) => {
		if (e.target.files[0]) {
			setRequestImage(URL.createObjectURL(e.target.files[0]));
		}
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		const newRequest = {
			id: uuidv4(), // Generate a unique ID
			userId: user?.userId || "defaultUserId",
			name: requestName,
			category: requestCategory,
			description: requestDescription,
			avatars: [user?.avatar || defaultAvatar], // Add user avatar here
			image: requestImage || defaultImage, // Use uploaded image or default
			unit,
			community,
			status: "Pending",
			attended,
		};

		try {
			const response = await fetch(`http://52.87.197.214:5000/api/requests`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newRequest),
			});

			if (!response.ok) {
				throw new Error('Failed to create request');
			}

			// Optionally handle the response
			const result = await response.json();
			console.log('Request created:', result);

			// Reset form
			setRequestName("");
			setRequestCategory("");
			setRequestDescription("");
			setRequestImage(null);
			setUnit("");
			setCommunity("");
			setAttended(false);
			onClose(); // Close the modal or form after submission
		} catch (error) {
			console.error('Error creating request:', error);
			// Optionally show an error message to the user
		}
	};

	return (
		<Flex
			direction="column"
			p="16px"
			my="24px"
			bg={useColorModeValue("white", "gray.700")}
			borderRadius="15px"
			boxShadow="lg"
		>
			<Text fontSize="lg" color={textColor} fontWeight="bold" mb="12px">
				Create a New Request
			</Text>
			<form onSubmit={handleSubmit}>
				<FormControl mb="16px">
					<FormLabel color={textColor}>Request Name</FormLabel>
					<Input
						placeholder="Enter the request name"
						value={requestName}
						onChange={(e) => setRequestName(e.target.value)}
						required
					/>
				</FormControl>

				<FormControl mb="16px">
					<FormLabel color={textColor}>Category</FormLabel>
					<Select
						placeholder="Select category"
						value={requestCategory}
						onChange={(e) => setRequestCategory(e.target.value)}
						required
					>
						<option value="Urgent">Urgent</option>
						<option value="Healing">Healing</option>
						<option value="Guidance">Guidance</option>
						<option value="Other">Other</option>
					</Select>
				</FormControl>

				<FormControl mb="16px">
					<FormLabel color={textColor}>Description</FormLabel>
					<Textarea
						placeholder="Enter the request description"
						value={requestDescription}
						onChange={(e) => setRequestDescription(e.target.value)}
						required
					/>
				</FormControl>

				<FormControl mb="16px">
					<FormLabel color={textColor}>Unit</FormLabel>
					<Select
						placeholder="Select unit"
						value={unit}
						onChange={(e) => setUnit(e.target.value)}
						required
					>
						<option value="Choir">Choir</option>
						<option value="Usher">Usher</option>
						<option value="Technical">Technical</option>
						<option value="Other">Other</option>
					</Select>
				</FormControl>

				<FormControl mb="16px">
					<FormLabel color={textColor}>Community</FormLabel>
					<Select
						placeholder="Select community"
						value={community}
						onChange={(e) => setCommunity(e.target.value)}
						required
					>
						<option value="North">North</option>
						<option value="South">South</option>
						<option value="East">East</option>
						<option value="West">West</option>
					</Select>
				</FormControl>

				<FormControl mb="16px">
					<FormLabel color={textColor}>Upload Image</FormLabel>
					<Input type="file" accept="image/*" onChange={handleImageChange} />
				</FormControl>

				<Button type="submit" colorScheme="gold" width="100%" mb="16px">
					Submit Request
				</Button>
				<Button
					onClick={onClose}
					variant="outline"
					colorScheme="gray"
					width="100%"
				>
					Cancel
				</Button>
			</form>
		</Flex>
	);
};

export default CreateRequest;
