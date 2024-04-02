import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Nav from "../../components/Nav";
import PlanCard from "../../components/PlanCard";
export default function Home() {
  // INSTRUCTION: 1. load the plans data from local storage
  let plans = JSON.parse(localStorage.getItem("plans"));
  if (!plans) {
    plans = [];
  }
  return (
    <>
      <Nav />
      <Container sx={{ marginBottom: "100px" }}>
        <Typography
          variant="h3"
          sx={{ color: "#3f51b5", marginBottom: "20px" }}
        >
          Today's Plan
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

      <Container>
        <Typography
          variant="h3"
          sx={{ color: "#3f51b5", marginBottom: "20px" }}
        >
          Upcoming Plan's
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
    </>
  );
}
