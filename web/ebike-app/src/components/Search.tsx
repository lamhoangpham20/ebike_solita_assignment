import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Journey } from "../types/journey";
import { Station } from "../types/station";

interface SearchProps {
  searchMode: (
    depId: string,
    retId: string,
    startDate?: Date,
    endDate?: Date
  ) => void;
}
const searchStations = async (input = "") => {
  const res = await fetch(
    `http://localhost:4000/stations/search?name=${input}`
  );
  return res.json();
};
export const Search: React.FC<SearchProps> = ({ ...props }) => {
  const [input, setInput] = useState("");
  const [value, setValue] = useState<Journey | null>(null);
  const [returnValue, setReturnValue] = useState<Journey | null>(null);
  const submit = (event: any) => {
    event.preventDefault();
    if (value === returnValue) {
      console.log("Enter different stations");
    } else {
      if (value && returnValue) {
        props.searchMode(value?.id, returnValue?.id);
      }
    }
  };
  const { isLoading, isError, error, data, status, isFetching, refetch } =
    useQuery(["search", input], () => searchStations(input), {
      enabled: true,
    });
  return (
    <form onSubmit={(event) => submit(event)}>
      <Box sx={{ display: "inline-flex", m: 1 }}>
        <Autocomplete
          value={value}
          onChange={(event: any, newValue: Journey) => {
            setValue(newValue);
          }}
          disablePortal
          id="combo-box-demo"
          options={data ? [...data] : ([] as Array<Station>)}
          sx={{ width: 300, m: 1 }}
          getOptionLabel={(option) => (option ? option?.name : "")}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <div>{option.name}</div>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              onChange={(
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setInput(event.target.value);
                console.log(event.target.value);
                refetch;
              }}
              {...params}
              label="Departure Station"
            />
          )}
        />
        <Autocomplete
          disablePortal
          value={returnValue}
          onChange={(event: any, newValue: Journey) => setReturnValue(newValue)}
          id="combo-box-demo"
          options={data ? [...data] : ([] as Array<Station>)}
          sx={{ width: 300, m: 1 }}
          getOptionLabel={(option) => (option ? option?.name : "")}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <div>{option.name}</div>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              onChange={(
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setInput(event.target.value);
                console.log(event.target.value);
                refetch;
              }}
              {...params}
              label="Return Station"
            />
          )}
        />
        <Button
          variant="contained"
          onClick={() => {
            console.log(12);
          }}
          type="submit"
        >
          Search
        </Button>
      </Box>
    </form>
  );
};
