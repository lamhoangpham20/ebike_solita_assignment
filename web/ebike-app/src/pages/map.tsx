import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navigator from "../components/Navigator";
import Header from "../components/Header";
import { theme } from "../components/theme";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { StationElements } from "../components/StationElements";
import MapElements from "../components/map/MapElements";

const queryClient = new QueryClient();
export default function Map() {
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  );
}
const drawerWidth = 256;
const fetchStations = async (page = 0) => {
  const res = await fetch(`http://localhost:4000/stations?page=${page}`);
  return res.json();
};

function Content() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [page, setPage] = useState(1);
  const { isLoading, error, data, status } = useQuery(
    ["stations", page],
    () => fetchStations(page),
    { keepPreviousData: true }
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: "block", xs: "none" } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <Box
            component="main"
            sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
          >
            <Box>
              {isLoading && !data ? (
                <div>...Loading</div>
              ) : (
                <MapElements stations={data} />
              )}
            </Box>

            <Box
              sx={{
                flexShrink: 0,
                ml: 2.5,
                justifyContent: "end",
                display: "flex",
                alignItems: "center",
                mt: 2,
                mr: 2,
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
