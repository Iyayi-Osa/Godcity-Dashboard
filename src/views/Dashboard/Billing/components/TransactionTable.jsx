import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const TransactionTable = ({ title, captions, data }) => {
  return (
    <Box p={4} borderRadius="lg" borderWidth={1}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>{title}</Text>
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
              {row.map((cell, cellIndex) => (
                <Td key={cellIndex}>{cell}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TransactionTable;
