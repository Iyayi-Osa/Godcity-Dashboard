// components/Members.js
import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const Members = ({ title, captions, data, onEdit, onDelete }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          {captions.map((caption, index) => (
            <Th key={index}>{caption}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, index) => (
          <Tr key={index}>
            <Td>{row.name}</Td>
            <Td>{row.email}</Td>
            <Td>{row.phone}</Td>
            <Td>{row.address}</Td>
            <Td>{row.affiliation}</Td>
            <Td>{row.role}</Td>
            <Td>{row.actions}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Members;
