import { ThemeProvider } from "@emotion/react";
import {
  createTheme,
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Input,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

interface IFormInput {
  id: number;
  name: string;
  address: string;
  capacities: number;
  longitude: number;
  latitude: number;
}

const theme = createTheme();
const queryClient = new QueryClient();
export default function createStation() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <CreateForm />
    </QueryClientProvider>
  );
}

function CreateForm() {
  const { control, handleSubmit } = useForm<IFormInput>();
  const queryClient = useQueryClient();
  const postStation = async (data: IFormInput) => {
    const res = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/stations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error("Error create Station");
  };
  const mutation = useMutation(postStation, {
    onSuccess: () => {
      // Invalidate and refetch
      console.log("success");
    },
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    data.id = Math.floor(Math.random() * 10000) + 1
    mutation.mutate(data);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Name" type="text" {...field} />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Address" type="text" {...field} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="capacities"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Capacities" type="number" {...field} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="longitude"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Longitude" type="number" {...field} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="latitude"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Latitude" type="number" {...field} />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Post
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
