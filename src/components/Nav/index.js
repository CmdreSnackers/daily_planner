import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Nav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color=""
        sx={{ color: "black", marginBottom: "30px", backgroundColor: "white" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            align="center"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Daily Planner
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
