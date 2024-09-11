// Chakra imports
import { Flex } from "@chakra-ui/react";
import React from "react";
import Members from "./components/Authors";
import Projects from "./components/Projects";
import { tablesTableData, dashboardTableData } from "variables/general";

function Tables() {
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Members
        title={"Members Table"}
        captions={["Name", "Unit", "Status", "Communuity", ""]}
        data={tablesTableData}
      />
      {/* <Projects
        title={"Projects Table"}
        captions={["Name", "Unit/Family", "Status", "Completion", ""]}
        data={dashboardTableData}
      /> */}
    </Flex>
  );
}

export default Tables;
