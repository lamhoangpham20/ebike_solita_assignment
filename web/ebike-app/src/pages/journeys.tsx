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
import { JourneyElements } from "../components/JourneyElements";
import { IconButton } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Search } from "../components/Search";
import { Filter } from "../components/Filter";

type Input = {
  depId?: string | null;
  retId?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
};

const queryClient = new QueryClient();
export default function Journeys() {
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  );
}
const drawerWidth = 256;

const fetchJourney = async (page = 0, mode = "show", input: Input) => {
  if (mode === "show") {
    const res = await fetch(`http://localhost:4000/journeys?page=${page}`);
    return res.json();
  }
  if (mode === "search") {
    if (input.depId && input.retId) {
      const res = await fetch(
        `http://localhost:4000/journeys/search?page=${page}&?depId=${input.depId}&?retId=${input.retId}`
      );
      return res.json();
    }
  }
  if (mode === "filter") {
    if (input.depId && input.retId && input.startDate && input.endDate) {
      const res = await fetch(
        `http://localhost:4000/journeys/filter?page=${page}&depId=${
          input.depId
        }&retId=${
          input.retId
        }&startDate=${input.startDate.toDateString()}&endDate=${input.endDate.toDateString()}`
      );
      return res.json();
    }
  }
};
function Content() {
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState("show");
  const [input, setInput] = useState<Input>({});
  const { isLoading, error, data, status, refetch } = useQuery(
    ["journey", page, mode, input],
    () => fetchJourney(page, mode, input),
    { keepPreviousData: true }
  );
  console.log("data", data);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const searchMode = (depId: string, retId: string) => {
    setMode("search");
    console.log(depId, retId);
    var obj = {
      depId: depId,
      retId: retId,
    };
    setInput(obj);
    setPage(1);
    refetch;
  };
  const filterMode = (
    depId: string,
    retId: string,
    startDate: Date,
    endDate: Date
  ) => {
    setMode("filter");
    var obj = {
      depId: depId,
      retId: retId,
      startDate: startDate,
      endDate: endDate,
    };
    setInput(obj);
    setPage(1);
    console.log(obj.endDate);
    refetch;
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
            <Box sx={{ display: "inline-flex" }}>
              <Search searchMode={searchMode}></Search>
            </Box>
            <Box sx={{ display: "inline-flex" }}>
              <Filter filterMode={filterMode}></Filter>
            </Box>
            {isLoading && !data ? (
              <>Loading...</>
            ) : (
              <Box>
                <JourneyElements journeys={data} />
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
                onClick={() => {
                  console.log(mode);
                  setPage(page + 1);
                }}
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
