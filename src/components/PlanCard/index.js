import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import DescriptionIcon from "@mui/icons-material/Description";
import LightModeIcon from "@mui/icons-material/LightMode";

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function PlanCard(props) {
  const { plan, type = "list", deleteHandler } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let todayDay = new Date(plan.start_date);
  let showDay = todayDay.getDay();
  let answerDay = "";
  // console.log(showDay);

  if (showDay === 0) {
    answerDay = "Sunday";
  } else if (showDay === 1) {
    answerDay = "Monday";
  } else if (showDay === 2) {
    answerDay = "Tuesday";
  } else if (showDay === 3) {
    answerDay = "Wednesday";
  } else if (showDay === 4) {
    answerDay = "Thursday";
  } else if (showDay === 5) {
    answerDay("Friday");
  } else if (showDay === 6) {
    answerDay = "Saturday";
  }

  return (
    <Card sx={{ backgroundColor: "white", color: "black" }}>
      <CardContent>
        <Typography variant="h6">{plan.name}</Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <LightModeIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary={answerDay} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CalendarMonthIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary={plan.start_date} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccessAlarmIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary={plan.start_time + " - " + plan.end_time} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <DescriptionIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary={plan.description} />
          </ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Box display="flex" justifyContent="center" width="100%">
          {/* conditional rendering */}
          {type === "list" ? (
            <>
              <Button
                component={Link}
                to={`/plan/${plan.id}`}
                sx={{ color: "black" }}
              >
                View Plan
              </Button>
              <Button onClick={handleClickOpen} sx={{ color: "black" }}>
                Delete Plan
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title" sx={{ color: "black" }}>
                  {"Are you sure you want to delete this plan?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText
                    id="alert-dialog-description"
                    sx={{ color: "black" }}
                  >
                    This action is not reversible.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} sx={{ color: "black" }}>
                    Cancel
                  </Button>
                  <Button
                    onClick={deleteHandler}
                    sx={{ color: "black" }}
                    autoFocus
                  >
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          ) : (
            <Button
              component={Link}
              to={`/plan/${plan.id}/edit`}
              color="inherit"
            >
              Edit Plan
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  );
}
