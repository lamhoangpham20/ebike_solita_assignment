import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React from "react";
import { Journey } from "../types/journey";

interface JourneysProps {
  journeys: Array<Journey>;
}

export const JourneyElements: React.FC<JourneysProps> = (
  props: JourneysProps
) => {
  const { journeys } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Depature Date</TableCell>
            <TableCell align="right">Return Date</TableCell>
            <TableCell align="right">Departure Station</TableCell>
            <TableCell align="right">Return Station</TableCell>
            <TableCell align="right">Cover Distance</TableCell>
            <TableCell align="right">Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {journeys.map((row: Journey) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.departure_date}
              </TableCell>
              <TableCell align="right">{row.return_date}</TableCell>
              <TableCell align="right">{row.departure_station.name}</TableCell>
              <TableCell align="right">{row.return_station.name}</TableCell>
              <TableCell align="right">{row.cover_distance}</TableCell>
              <TableCell align="right">{row.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
