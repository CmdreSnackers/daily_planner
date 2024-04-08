import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import { Link } from "react-router-dom";
import { HouseOutlined, PlusOne } from "@mui/icons-material";

export default function BottomNav() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction
          component={Link}
          variant="outlined"
          to="/new"
          label="Add A Plan"
          icon={<PlusOne />}
        />

        <BottomNavigationAction
          component={Link}
          to="/"
          label="Home"
          icon={<HouseOutlined />}
        />
      </BottomNavigation>
    </Box>
  );
}
