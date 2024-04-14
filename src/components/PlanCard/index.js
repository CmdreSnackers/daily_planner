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
import useCustomSnackbar from "../../components/useCustomSnackbar";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ToggleButton from "@mui/material/ToggleButton";
import CheckIcon from "@mui/icons-material/Check";

export default function PlanCard(props) {
  const snackbar = useCustomSnackbar();
  const { plan, type = "list", deleteHandler } = props;

  const plans = JSON.parse(localStorage.getItem("plans"));

  const [open, setOpen] = React.useState(false);

  const [dark, setDark] = React.useState(false);

  const [complete, setComplete] = React.useState(
    // plans ? plans.is_completed : Boolean
    false
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleComplete = () => {
    let error = "";
    if (error !== "") {
      alert(error);
    } else {
      const setCompleted = plans.map((c) => {
        if (c.id === plan.id) {
          return {
            ...c,
            is_completed: true,
          };
        }
        // onUpdate(true);
        return c;
      });
      // setComplete(true);
      localStorage.setItem("plans", JSON.stringify(setCompleted));
    }
    setDark(!dark);
    setComplete(true);
    snackbar.showSuccess("Plan Completed");
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
    <Card
      sx={{
        backgroundColor: plan.is_completed ? "lightgrey" : "white",
        color: "black",
      }}
    >
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
        {plan.is_completed === false ? (
          <ToggleButton
            fullWidth
            value={plan.is_completed}
            // onChange={(event, newValue) => {
            //   setValue(newValue);
            // }}
            selected={complete}
            // onClick={(plan) => {
            //   const completedPlan = plans.map((i) => {
            //     if (i.id === plans.id) {
            //       return {
            //         ...i,
            //         is_complete: plan.is_complete ? false : true,
            //       };
            //     }

            //     return i;
            //   });
            //   onUpdate(completedPlan);
            //   console.log(completedPlan);
            // }}
            // onUpdate()
            // }
            onChange={handleComplete}
            // onClick={handleComplete}
          >
            <CheckIcon sx={{ width: "auto" }} />
          </ToggleButton>
        ) : (
          false
        )}
        {/* <ToggleButton
          fullWidth
          value={"value"}
          // onChange={(event, newValue) => {
          //   setValue(newValue);
          // }}
          selected={complete}
          // onClick={(plan) => {
          //   const completedPlan = plans.map((i) => {
          //     if (i.id === plans.id) {
          //       return {
          //         ...i,
          //         is_complete: plan.is_complete ? false : true,
          //       };
          //     }

          //     return i;
          //   });
          //   onUpdate(completedPlan);
          //   console.log(completedPlan);
          // }}
          // onUpdate()
          // }
          onChange={handleComplete}
          onClick={handleComplete}
        >
          <CheckIcon sx={{ width: "auto" }} />
        </ToggleButton> */}
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
