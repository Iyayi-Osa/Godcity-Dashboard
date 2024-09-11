import React from "react";
import { Table, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { FiEye, FiEdit, FiTrash } from "react-icons/fi";

const SermonTable = ({ data, onView, onEdit, onDelete, isAdmin }) => {
	return (
		<Table variant="simple">
			<Tbody>
				{data.map((sermon) => (
					<Tr key={sermon._id}>
						<Td>{sermon.title}</Td>
						<Td>{sermon.speaker}</Td>
						<Td>{sermon.date}</Td>

						<Td>
							<IconButton
								icon={<FiEye />}
								aria-label="View"
								onClick={() => onView(sermon)}
								mr={2}
							/>
							{isAdmin && (
								<>
									<IconButton
										icon={<FiEdit />}
										aria-label="Edit"
										onClick={() => onEdit(sermon)}
										mr={2}
										colorScheme="gold"
									/>
									<IconButton
										icon={<FiTrash />}
										aria-label="Delete"
										onClick={() => onDelete(sermon._id)}
										colorScheme="red"
									/>
								</>
							)}
						</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	);
};

export default SermonTable;
