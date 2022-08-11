import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import PermMediaOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActual";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Station } from "../types/station";

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const searchStations = async (input = "") => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/stations/search?name=${input}`
  );
  return res.json();
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;
  const [input, setInput] = useState("");
  const { isLoading, isError, error, data, status, isFetching, refetch } =
    useQuery(["search", input], () => searchStations(input), {
      enabled: true,
    });

  return (
    <Drawer style={{ backgroundColor: "white" }} variant="permanent" {...other}>
      <List disablePadding>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            style={{ backgroundColor: "white" }}
            id="outlined-basic"
            color="primary"
            label="Outlined"
            variant="outlined"
            onChange={(event) => {
              setInput(event.target.value);
              refetch();
              console.log(data);
            }}
          />
        </Box>
      </List>
      <Box>
        {isLoading ? (
          <span style={{ color: "white" }}></span>
        ) : isFetching ? (
          <span style={{ color: "white" }}></span>
        ) : (
          <>
            {data.map((i: Station) => (
              <NextLink key={i.id} href={`/station/${i.id}`}>
                <Link>
                  <ListItem disablePadding key={i.id}>
                    <ListItemButton sx={item}>
                      <ListItemIcon>{<HomeIcon />}</ListItemIcon>
                      <ListItemText>{i.name}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
              </NextLink>
            ))}
          </>
        )}
      </Box>
    </Drawer>
  );
}
