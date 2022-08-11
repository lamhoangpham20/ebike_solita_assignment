import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navigator from "../../components/Navigator";
import Header from "../../components/Header";
import { theme } from "../../components/theme";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import { StationElements } from "../../components/StationElements";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import MapElements from "../../components/map/MapElements";

const queryClient = new QueryClient();
export default function Journeys() {
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  );
}
const drawerWidth = 256;

function Content() {
  const router = useRouter();
  const { id }  = router.query;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  console.log(id);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const fetchStations = async (id: any) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/stations/test?id=${id}`
    );
    return res.json();
  };
  const { isLoading, error, data, status, refetch, isFetching } = useQuery(
    ["station", id],
    () => fetchStations(id),
    { keepPreviousData: true }
  );
  if (data?.station?.id !== id) {
    console.log("cong ly", data?.station?.name);
    refetch;
    console.log(isFetching, isLoading);
  }
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
            ) : isFetching ? (
              <>Fetching</>
            ) : (
              <Box>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell align="right">{id}</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          name
                        </TableCell>
                        <TableCell align="right">
                          {data?.station?.name}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          address
                        </TableCell>
                        <TableCell align="right">
                          {data?.station?.address}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Capacities
                        </TableCell>
                        <TableCell align="right">
                          {data?.station?.capacities}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Departure Journey
                        </TableCell>
                        <TableCell align="right">
                          {data?.station?.departureCount}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Return Journey
                        </TableCell>
                        <TableCell align="right">
                          {data?.station?.returnCount}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Average Departure Distance
                        </TableCell>
                        <TableCell align="right">
                          {data?.avgDepart[0]?.avg}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          Average return Distance
                        </TableCell>
                        <TableCell align="right">
                          {data?.avgDepart[1]?.avg}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <div>Top5 Return Stations:</div>
                <ul>
                  {data?.top5Depart?.map((i: any) => (
                    <li key={i.name}>
                      {i.name} : {i.count} journeys
                    </li>
                  ))}
                </ul>
                <div>Top5 Depart Stations:</div>
                <ul>
                  {data?.top5return?.map((i: any) => (
                    <li key={i.name}>
                      {i.name} : {i.count} journeys
                    </li>
                  ))}
                </ul>
                <MapElements stations={data.station} />;
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
