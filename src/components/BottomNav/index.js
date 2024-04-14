import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import { Link } from "react-router-dom";
import {
  CheckCircleRounded,
  HouseOutlined,
  PlusOne,
} from "@mui/icons-material";

export default function BottomNav() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          disableTouchRipple
          disableRipple
          sx={{
            color: "grey",
          }}
          component={Link}
          label="Completed"
          icon={<CheckCircleRounded />}
        />
        <BottomNavigationAction
          disableTouchRipple
          disableRipple
          component={Link}
          to="/new"
          variant="outlined"
          label="Add A Plan"
          icon={<PlusOne />}
        />

        <BottomNavigationAction
          disableTouchRipple
          disableRipple
          component={Link}
          to="/"
          label="Home"
          icon={<HouseOutlined />}
        />
      </BottomNavigation>
    </Box>
  );
}
