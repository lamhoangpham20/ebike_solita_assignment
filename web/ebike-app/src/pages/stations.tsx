import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Navigator from "../components/Navigator";
import Header from "../components/Header";
import Paperbase from "../components/Paperbase";
import { theme } from "../components/theme";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Journey } from "../types/journey";
import { useState } from "react";
import { JourneyElements } from "../components/JourneyElements";
import { IconButton } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { StationElements } from "../components/StationElements";

const queryClient = new QueryClient();
export default function Journeys() {
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
  const [page, setPage] = useState(1);
  const { isLoading, error, data, status } = useQuery(
    ["stations", page],
    () => fetchStations(page),
    { keepPreviousData: true }
  );
  console.log("data", data);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (error) {
    console.log(error);
    return <div>An error has occurred: {status} </div>;
  }
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
            {isLoading && !data ? (
              <>Loading...</>
            ) : (
              <Box>
                <StationElements stations={data} />
              </Box>
            )}
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
            >
              <IconButton
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                aria-label="previous page"
              >
                <KeyboardArrowLeft />
              </IconButton>
              {page}
              <IconButton
                onClick={() => setPage(page + 1)}
                disabled={page === 100}
                aria-label="next page"
              >
                <KeyboardArrowRight />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
