import {
  Search,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import {
  Box,
  CssBaseline,
  IconButton,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Filter } from "../components/Filter";
import Header from "../components/Header";
import { JourneyElements } from "../components/JourneyElements";
import Navigator from "../components/Navigator";
import { theme } from "../components/theme";

const drawerWidth = 256;
const queryClient = new QueryClient();
export const Index = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <QueryClientProvider client={queryClient}>
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
            ></Box>
          </Box>
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Index;
