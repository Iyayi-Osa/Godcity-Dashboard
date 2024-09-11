import React from 'react';
import { Box, Flex, Grid, Icon, Table, Thead, Tbody, Tr, Th, Td, Text  } from '@chakra-ui/react';
import BackgroundCard1 from 'assets/img/BgSignUpg.png';
import { FaPaypal, FaWallet } from 'react-icons/fa';
import { RiMastercardFill } from 'react-icons/ri';
import CreditCard from './components/CreditCard';
import PaymentStatistics from './components/PaymentStatistics';
// import TransactionTable from './components/TransactionTable';
import { transactionTableData } from 'variables/general'; // Import the mock data


// const TransactionTable = ({ title, captions, data }) => (
//   <Box>
//     <Box>{title}</Box>
//     <Box>
//       {captions.map((caption, index) => (
//         <Box key={index}>{caption}</Box>
//       ))}
//     </Box>
//     <Box>
//       {data.map((row, index) => (
//         <Box key={index}>
//           {Object.values(row).map((cell, cellIndex) => (
//             <Box key={cellIndex}>{cell}</Box>
//           ))}
//         </Box>
//       ))}
//     </Box>
//   </Box>
// );
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
// const transactionTableData = [
//   { date: '2021-01-01', id: '1234', amount: '$100', type: 'Credit', status: 'Completed' },
//   // Add more mock data as needed
// ];


const Transaction = () => {
  return (
    <Flex direction="column" pt={{ base: '120px', md: '75px' }}>
      <Grid templateColumns={{ sm: '1fr', lg: '2fr 1.2fr' }} templateRows="1fr">
        <Box>
          <Grid
            templateColumns={{ sm: '1fr', md: '1fr 1fr', xl: '1fr 1fr 1fr 1fr' }}
            templateRows={{ sm: 'auto auto auto', md: '1fr auto', xl: '1fr' }}
            gap="26px"
          >
            <CreditCard
              backgroundImage={BackgroundCard1}
              title="Transaction Card"
              number="$500,000"
              validity={{ name: 'VALID THRU', data: '12/24' }}
              cvv={{ name: 'CVV', code: '123' }}
              icon={<Icon as={RiMastercardFill} w="48px" h="auto" color="gold.100" />}
            />
            <PaymentStatistics
              icon={<Icon h="24px" w="24px" color="white" as={FaWallet} />}
              title="Cash"
              description="Cash transactions"
              amount={300000}
            />
            <PaymentStatistics
              icon={<Icon h="24px" w="24px" color="white" as={FaPaypal} />}
              title="Paypal"
              description="Online payments"
              amount={200000}
            />
          </Grid>
        </Box>
      </Grid>

      <Flex direction="column" pt={{ base: '120px', md: '75px' }}>
        <TransactionTable
          title="Transaction Table"
          captions={['Date', 'Transaction ID', 'Amount', 'Type', 'Status']}
          data={transactionTableData}
        />
      </Flex>
    </Flex>
  );
};

export default Transaction;
