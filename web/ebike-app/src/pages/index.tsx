import { Box } from "@mui/material";
import React from "react";
import Content from "../components/Content";
import { Filter } from "../components/Filter";
import Header from "../components/Header";
import Paperbase from "../components/Paperbase";

export const Index = () => {
  return (
    <div>
      <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}>
        <Box color="blue">Hello</Box>
      </Box>
    </div>
  );
};

export default Index;
