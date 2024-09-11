import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Button,
} from "@chakra-ui/react";

const RequestsTable = ({ requests, onViewDetails, onDelete, role }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Category</Th>
          <Th>Status</Th>
          <Th>Attended</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {requests.length > 0 ? (
          requests.map((request) => (
            <Tr key={request._id}>
              <Td>{request.name}</Td>
              <Td>{request.category}</Td>
              <Td>{request.status}</Td>
              <Td>
                <Checkbox isChecked={request.attended} />
              </Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={() => onViewDetails(request)}
                >
                  View
                </Button>
                <Button size="sm" colorScheme="red" ml={2} onClick={() => onDelete(request._id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan="5">No requests found</Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};

export default RequestsTable;
