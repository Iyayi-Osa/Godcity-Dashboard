// Chakra imports
import { useState, useEffect } from "react";
import {
	Flex,
	Button,
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
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Members from "./components/Members";
import { BACKEND_URL } from "backendurl";
import members from "variables/members";

function Membership() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		role: "",
		phone: "",
		address: "",
		demographics: "",
		affiliation: "",
	});
	const [users, setUsers] = useState([]);
	const toast = useToast();

	// Fetch users data from API
	useEffect(() => {
		axios
			.get(`${BACKEND_URL}/api/members`)
			.then((response) => {
				if (response.data.responseCode === 200) {
					setUsers(response.data.data);
				} else {
					console.error("Failed to fetch member data");
					setUsers(members)
				}
			})
			.catch((error) => {
				console.error("Error fetching member data:", error);
				setUsers(members)
			});
	}, []);

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[id]: value,
		}));
	};

	const handleSubmit = () => {
		if (formData._id) {
			// Edit existing user
			axios
				.put(`${BACKEND_URL}/api/members/${formData._id}`, formData)
				.then(() => {
					setUsers(
						users.map((user) => (user._id === formData._id ? formData : user))
					);
					toast({
						title: "User updated.",
						description: `User ${formData.name} has been updated successfully.`,
						status: "success",
						duration: 5000,
						isClosable: true,
					});
				})
				.catch((error) => {
					console.error("Error updating user:", error);
					toast({
						title: "Update failed.",
						description: "There was an error updating the user.",
						status: "error",
						duration: 5000,
						isClosable: true,
					});
				});
		} else {
			// Add new user
			axios
				.post(`${BACKEND_URL}/api/auth/invite`, formData)
				.then((response) => {
					if (response.data.responseCode === 200) {
						const newUser = { ...formData, _id: response.data.data._id };
						setUsers([...users, newUser]);
						toast({
							title: "User added.",
							description: `User ${formData.name} has been added successfully.`,
							status: "success",
							duration: 5000,
							isClosable: true,
						});
					} else {
						console.error("Failed to add member");
						toast({
							title: "Add failed.",
							description: "There was an error adding the user.",
							status: "error",
							duration: 5000,
							isClosable: true,
						});
					}
				})
				.catch((error) => {
					console.error("Error adding user:", error);
					toast({
						title: "Add failed.",
						description: "There was an error adding the user.",
						status: "error",
						duration: 5000,
						isClosable: true,
					});
				});
		}

		// Reset form data
		setFormData({
			_id: null,
			name: "",
			email: "",
			role: "",
			phone: "",
			address: "",
			demographics: "",
			affiliation: "",
		});

		onClose();
	};

	const handleEdit = (user) => {
		setFormData(user);
		onOpen();
	};

	const handleDelete = (id) => {
		axios
			.delete(`${BACKEND_URL}/api/members/${id}`)
			.then(() => {
				setUsers(users.filter((user) => user._id !== id));
				toast({
					title: "User deleted.",
					description: `User has been deleted successfully.`,
					status: "success",
					duration: 5000,
					isClosable: true,
				});
			})
			.catch((error) => {
				console.error("Error deleting user:", error);
				toast({
					title: "Delete failed.",
					description: "There was an error deleting the user.",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			});
	};

	return (
		<Flex direction="column" pt={{ base: "120px", md: "75px" }}>
			<Button colorScheme="gold" mb={4} onClick={onOpen}>
				Add New User
			</Button>

			<Members
				title={"Members Table"}
				captions={[
					"Name",
					"Email",
					"Phone",
					"Address",
					"Affiliation",
					"Role",
					"",
				]}
				data={users.map((user) => ({
					...user,
					actions: (
						<Flex>
							<Button
								size="sm"
								colorScheme="gold"
								onClick={() => handleEdit(user)}
								mr={2}
							>
								Edit
							</Button>
							<Button
								size="sm"
								colorScheme="red"
								onClick={() => handleDelete(user._id)}
							>
								Delete
							</Button>
						</Flex>
					),
				}))}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						{formData._id ? "Edit User" : "Add New User"}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl id="name" isRequired>
							<FormLabel>Name</FormLabel>
							<Input
								placeholder="Enter name"
								value={formData.name}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl id="email" mt={4} isRequired>
							<FormLabel>Email</FormLabel>
							<Input
								placeholder="Enter email"
								value={formData.email}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl id="role" mt={4} isRequired>
							<FormLabel>Role</FormLabel>
							<Input
								placeholder="Enter role"
								value={formData.role}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl id="phone" mt={4} isRequired>
							<FormLabel>Phone</FormLabel>
							<Input
								placeholder="Enter phone number"
								value={formData.phone}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl id="address" mt={4} isRequired>
							<FormLabel>Address</FormLabel>
							<Input
								placeholder="Enter address"
								value={formData.address}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl id="demographics" mt={4} isRequired>
							<FormLabel>Demographics</FormLabel>
							<Input
								placeholder="Enter demographics"
								value={formData.demographics}
								onChange={handleChange}
							/>
						</FormControl>
						<FormControl id="affiliation" mt={4} isRequired>
							<FormLabel>Affiliation</FormLabel>
							<Input
								placeholder="Enter affiliation"
								value={formData.affiliation}
								onChange={handleChange}
							/>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="gold" mr={3} onClick={handleSubmit}>
							{formData._id ? "Update" : "Save"}
						</Button>
						<Button variant="ghost" onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	);
}

export default Membership;
