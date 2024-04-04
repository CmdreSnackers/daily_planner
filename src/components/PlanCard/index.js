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

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToggleButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function PlanCard(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const { planUpdates = [], onUpdate } = props;
  const { plan, type = "list", deleteHandler } = props;
  return (
    <Card>
      <ToggleButton
        value="check"
        // selected={selected}
        onChange={() => {
          // setSelected(!selected);
        }}
      >
        <CheckIcon />
      </ToggleButton>
      <CardContent>
        <Typography variant="h6" sx={{ color: "#3f51b5" }}>
          {plan.name}
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon>
              <CalendarMonthIcon sx={{ color: "#3f51b5" }} />
            </ListItemIcon>
            <ListItemText primary={plan.start_date} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccessAlarmIcon sx={{ color: "#3f51b5" }} />
            </ListItemIcon>
            <ListItemText primary={plan.start_time + " - " + plan.end_time} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <DescriptionIcon sx={{ color: "#3f51b5" }} />
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
              <Button component={Link} to={`/plan/${plan.id}`}>
                View Plan
              </Button>
              <Button onClick={handleClickOpen}>Delete Plan</Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title" sx={{ color: "#3f51b5" }}>
                  {"Are you sure you want to delete this plan?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText
                    id="alert-dialog-description"
                    sx={{ color: "#3f51b5" }}
                  >
                    This action is not reversible.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} sx={{ color: "#3f51b5" }}>
                    Cancel
                  </Button>
                  <Button
                    onClick={deleteHandler}
                    sx={{ color: "#3f51b5" }}
                    autoFocus
                  >
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          ) : (
            <Button component={Link} to={`/plan/${plan.id}/edit`}>
              Edit Plan
            </Button>
          )}
        </Box>
      </CardActions>
    </Card>
  );
}
