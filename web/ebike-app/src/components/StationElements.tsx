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
import { Station } from "../types/station";
import NextLink from "next/link";
import Link from "@mui/material/Link";

interface StationsProps {
  stations: Array<Station>;
}

const StationElements: React.FC<StationsProps> = (props: StationsProps) => {
  const { stations } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Capacity</TableCell>
            <TableCell align="right">Longitude</TableCell>
            <TableCell align="right">Latitude</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stations.map((row: Station) => (
            <NextLink key={row.id} href={`/station/${row.id}`}>
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell aria-label="simple row" component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">{row.capacities}</TableCell>
                <TableCell align="right">{row.longitude}</TableCell>
                <TableCell align="right">{row.latitude}</TableCell>
              </TableRow>
            </NextLink>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StationElements;
