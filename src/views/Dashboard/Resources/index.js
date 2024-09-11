import React, { useState, useEffect } from "react";
import { Flex, Button, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import SermonTable from "./components/SermonTable";
import SermonModals from "./components/SermonModals";
import { BACKEND_URL } from "backendurl";
import mockSermons from "variables/sermons";
import { useAuth } from "context/AuthContext";

function Sermons() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [sermonData, setSermonData] = useState({
		title: "",
		speaker: "",
		date: "",
		description: "",
		file: null,
		fileType: "",
		url: "",
	});
	const [sermons, setSermons] = useState([]);
	const [selectedSermon, setSelectedSermon] = useState(null);
	const [modalType, setModalType] = useState("upload");
	const [filePreview, setFilePreview] = useState("");
	const toast = useToast();
  const {isAdmin} = useAuth()

	useEffect(() => {
		const fetchSermons = async () => {
			try {
				const response = await axios.get(`${BACKEND_URL}/api/resources/all`);
				setSermons(response.data.data);
			} catch (error) {
				toast({
					title: "Error fetching sermons.",
					description: error.message,
					status: "error",
					duration: 5000,
					isClosable: true,
				});
				setSermons(mockSermons);
			}
		};
		fetchSermons();
	}, []);

	useEffect(() => {
		if (sermonData.file) {
			const previewUrl = URL.createObjectURL(sermonData.file);
			setFilePreview(previewUrl);

			return () => URL.revokeObjectURL(previewUrl);
		}
	}, [sermonData.file]);

	const handleChange = (e) => {
		const { id, value, files } = e.target;
		setSermonData((prevData) => ({
			...prevData,
			[id]: files ? files[0] : value,
			fileType: files ? files[0].type : prevData.fileType,
		}));
	};

	const handleSubmit = async () => {
		const formData = new FormData();
		Object.keys(sermonData).forEach((key) => {
			formData.append(key, sermonData[key]);
		});

		try {
			if (modalType === "upload") {
				await axios.post(`${BACKEND_URL}/api/resources/upload`, formData);
				toast({
					title: "Sermon uploaded successfully.",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
			} else if (modalType === "edit") {
				await axios.put(
					`${BACKEND_URL}/api/resources/${selectedSermon._id}`,
					formData
				);
				toast({
					title: "Sermon updated successfully.",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
			}
			setSermonData({
				title: "",
				speaker: "",
				date: "",
				description: "",
				file: null,
				fileType: "",
				url: "",
			});
			onClose();
		} catch (error) {
			toast({
				title: "Error submitting form.",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const handleView = (sermon) => {
		setSelectedSermon(sermon);
		setModalType("view");
		onOpen();
	};

	const handleEdit = (sermon) => {
		setSelectedSermon(sermon);
		setSermonData({
			title: sermon.title,
			speaker: sermon.speaker,
			date: sermon.date,
			description: sermon.description,
			file: null,
			fileType: sermon.fileType,
			url: sermon.url,
		});
		setModalType("edit");
		onOpen();
	};

	const handleDelete = async (sermonId) => {
		try {
			await axios.delete(`${BACKEND_URL}/api/sermons/${sermonId}`);
			setSermons(sermons.filter((sermon) => sermon._id !== sermonId));
			toast({
				title: "Sermon deleted successfully.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		} catch (error) {
			toast({
				title: "Error deleting sermon.",
				description: error.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
		<Flex direction="column" p={6} pt={{ base: "120px", md: "75px" }}>
			<Flex justifyContent="space-between" mb={4}>
				<Button
					colorScheme="gold"
					p="24px"
					onClick={() => {
						setModalType("upload");
						onOpen();
					}}
				>
					Upload New Sermon
				</Button>
			</Flex>
			<SermonTable
				data={sermons}
				onView={handleView}
				onEdit={handleEdit}
				onDelete={handleDelete}
				isAdmin={isAdmin}
			/>
			<SermonModals
				isOpen={isOpen}
				onClose={onClose}
				handleSubmit={handleSubmit}
				sermonData={sermonData}
				handleChange={handleChange}
				filePreview={filePreview}
				modalType={modalType}
				selectedSermon={selectedSermon}
			/>
		</Flex>
	);
}

export default Sermons;
