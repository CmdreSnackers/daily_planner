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
export default function PlanCard(props) {
  // const { planUpdates = [], onUpdate } = props;
  const { plan, type = "list", deleteHandler } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ color: "#3f51b5" }}>
          {plan.name}
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CalendarMonthIcon sx={{ color: "#3f51b5" }} />
            </ListItemIcon>
            <ListItemText primary={plan.start_date + " - " + plan.end_date} />
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
              <Button onClick={deleteHandler}>Delete Plan</Button>
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
