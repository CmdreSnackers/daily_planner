import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
// import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Nav from "../../components/Nav";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import BottomNav from "../../components/BottomNav";
import useCustomSnackbar from "../../components/useCustomSnackbar";

export default function PlanAddNew() {
  const snackbar = useCustomSnackbar();

  // short method to get today's date
  const todayDate = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(todayDate);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [description, setDescription] = useState("");

  const handleFormSubmit = () => {
    // 1. validate the input fields
    let error = "";
    // make sure all fields are filled
    if (
      description === "" ||
      startDate === "" ||
      startTime === "" ||
      endTime === ""
    ) {
      return snackbar.showWarning("Please fill out all the details");
    } else {
    }

    // if (startDate > endDate) {
    //   error = "Your end date must be after the start date";
    // }
    // if error is not empty, trigger the error alert
    if (error !== "") {
      alert(error);
    } else {
      // if error is empty, meaning that everything is good to go
      // 2. create a new trip object
      const newPlan = {
        id: nanoid(),
        name: name,
        start_date: startDate,
        start_time: startTime,
        end_time: endTime,
        description,
      };
      // 3. get the latest trips data from local storage
      let latestPlans = JSON.parse(localStorage.getItem("plans"));
      // 3.1 make sure latestTrips exists. If not, _____
      if (!latestPlans) {
        latestPlans = [];
      }

      // 4. push the new trip into trips array
      latestPlans.push(newPlan);
      // 5. store the updated trips array into local storage
      localStorage.setItem("plans", JSON.stringify(latestPlans));
      // 6. redirect back to home page
      navigate("/");
      // 7. give a msg that plan has added
      snackbar.showSuccess("Plan has been successfully added.");
    }
  };

  return (
    <>
      <Nav />
      <Container maxWidth="sm">
        <Typography variant="h4" sx={{ color: "#3f51b5" }}>
          Add A Plan
        </Typography>
        <Card
          sx={{
            marginTop: "20px",
            padding: "20px",
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="date"
                  label="Date"
                  variant="outlined"
                  fullWidth
                  value={startDate}
                  onChange={(event) => {
                    setStartDate(event.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  type="time"
                  label="Start Time"
                  variant="outlined"
                  fullWidth
                  value={startTime}
                  onChange={(event) => {
                    setStartTime(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="time"
                  label="End Time"
                  variant="outlined"
                  fullWidth
                  value={endTime}
                  onChange={(event) => {
                    setEndTime(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Description"
                  placeholder="Your description here..."
                  variant="outlined"
                  fullWidth
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions
            sx={{
              paddingLeft: "15px",
              paddingRight: "15px",
            }}
          >
            <Button variant="contained" fullWidth onClick={handleFormSubmit}>
              Add New
            </Button>
          </CardActions>
        </Card>
      </Container>
      <BottomNav />
    </>
  );
}
