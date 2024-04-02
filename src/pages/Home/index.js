import { Link } from "react-router-dom";
import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Nav from "../../components/Nav";
import BottomNav from "../../components/BottomNav";
import PlanCard from "../../components/PlanCard";
export default function Home() {
  // INSTRUCTION: 1. load the plans data from local storage
  let plansData = JSON.parse(localStorage.getItem("plans"));
  if (!plansData) {
    plansData = [];
  }
  const [plans, setPlans] = useState(plansData);

  // filter by date
  const currentTimestamp = new Date().valueOf();
  const next30DaysTimestamp = currentTimestamp + 1 * 24 * 3600 * 1000;
  // upcoming plans should be within a month
  const todaysPlan = plansData.filter((p) => {
    // convert start date to timestamp
    const startDateInTimestamp = new Date(p.start_date).valueOf();
    // filter the date that is within 30 days
    if (
      startDateInTimestamp > currentTimestamp &&
      startDateInTimestamp < next30DaysTimestamp
    ) {
      return true;
    }

    return false;
  });
  return (
    <>
      <Nav />
      <Container sx={{ marginBottom: "80px" }}>
        <Typography
          variant="h3"
          sx={{ color: "#3f51b5", marginBottom: "20px" }}
        >
          Today's Plan
        </Typography>
        {todaysPlan.length > 0 ? (
          <Grid container spacing={2}>
            {todaysPlan.map((plan) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={plan.id}>
                  <PlanCard plan={plan} type="list" />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h6">No plans added yet.</Typography>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                variant="outlined"
                to="/new"
                sx={{ color: "black", border: "1px solid black" }}
              >
                Add A Plan
              </Button>
            </CardActions>
          </Card>
        )}
      </Container>

      <Container sx={{ marginBottom: "80px" }}>
        <Typography
          variant="h3"
          sx={{ color: "#3f51b5", marginBottom: "20px" }}
        >
          Tomorrow's Plan's
        </Typography>
        {plans.length > 0 ? (
          <Grid container spacing={2}>
            {plans.map((plan) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={plan.id}>
                  <PlanCard plan={plan} type="list" />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h6">No plans added yet.</Typography>
            </CardContent>
            <CardActions>
              <Button
                component={Link}
                to="/new"
                sx={{ color: "black", border: "1px solid black" }}
              >
                Add A Plan
              </Button>
            </CardActions>
          </Card>
        )}
      </Container>
      <Container sx={{ marginBottom: "100px" }}>
        <Typography
          variant="h3"
          sx={{ color: "#3f51b5", marginBottom: "20px" }}
        >
          Past Uncompleted Plan's
        </Typography>
        {plans.length > 0 ? (
          <Grid container spacing={2}>
            {plans.map((plan) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={plan.id}>
                  <PlanCard
                    plan={plan}
                    type="list"
                    deleteHandler={() => {
                      const updatePlan = plans.filter((p) => p.id !== plan.id);
                      setPlans(updatePlan);
                      localStorage.setItem("plans", JSON.stringify(updatePlan));
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Card>
            <CardContent>
              <Typography variant="h6">No previous plans yet.</Typography>
            </CardContent>
            <CardActions></CardActions>
          </Card>
        )}
      </Container>
      <BottomNav />
    </>
  );
}
