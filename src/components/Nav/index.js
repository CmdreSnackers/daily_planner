import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Daily Planner
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
