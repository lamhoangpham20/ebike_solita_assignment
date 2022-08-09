import { Box, Button, TextField } from "@mui/material";
import {
  DateRange,
  DateRangePicker,
  LocalizationProvider,
  StaticDateRangePicker,
} from "@mui/x-date-pickers-pro";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import { Search } from "./Search";

interface FilterProps {
  filterMode: (
    depId: string,
    retId: string,
    startDate: Date,
    endDate: Date
  ) => void;
}
const queryClient = new QueryClient();
export const Filter: React.FC<FilterProps> = ({ ...props }) => {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  const searchMode = (depId: string, retId: string) => {
    if (value[0] && value[1]) {
      props.filterMode(depId, retId, value[0], value[1]);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Search searchMode={searchMode}></Search>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        localeText={{ start: "Start Date", end: "End Date" }}
      >
        <DateRangePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>
    </QueryClientProvider>
  );
};
