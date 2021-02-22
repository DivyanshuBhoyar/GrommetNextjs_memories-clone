import React from "react";
import { Grommet, Box, DateInput } from "grommet";
import { grommet } from "grommet/themes";

export const FormatDate = ({ memorydate, setmemorydate }) => {
  const onChange = (event) => {
    const nextmemorydate = event.value;
    console.log("onChange", nextmemorydate);
    setmemorydate(nextmemorydate);
  };

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="10px">
        <Box>
          <DateInput
            pad="small"
            calendarProps={{
              showAdjacentDays: false,
              fill: true,
              size: "small",
            }}
            format="dd/mm/yyyy"
            value={memorydate}
            onChange={onChange}
          />
        </Box>
      </Box>
    </Grommet>
  );
};
