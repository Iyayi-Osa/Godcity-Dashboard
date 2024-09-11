// Chakra imports
import {
  Flex,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import IconBox from "components/Icons/IconBox";
import React from "react";

const MiniStatistics = ({ title, amount, percentage, icon }) => {
  const icongold = useColorModeValue("primary.DEFAULT", "primary.dark");
  const textColor = useColorModeValue("gray.700", "gray.50");
  const bgColor = useColorModeValue("gray.50", "gray.700");

  return (
    <Card minH='83px' bgColor={bgColor}>
      <CardBody>
        <Flex flexDirection='row' align='center' justify='center' w='100%'>
          <Stat me='auto'>
            <StatLabel
              fontSize='sm'
              color='gray.400'
              fontWeight='bold'
              pb='.1rem'>
              {title}
            </StatLabel>
            <Flex>
              <StatNumber fontSize='lg' color={textColor}>
                {amount}
              </StatNumber>
              <StatHelpText
                alignSelf='flex-end'
                justifySelf='flex-end'
                m='0px'
                color={percentage > 0 ? "green.400" : "red.400"}
                fontWeight='bold'
                ps='3px'
                fontSize='md'>
                {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
              </StatHelpText>
            </Flex>
          </Stat>
          <IconBox as='box' h={"45px"} w={"45px"} bg={icongold}>
            {icon}
          </IconBox>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default MiniStatistics;
