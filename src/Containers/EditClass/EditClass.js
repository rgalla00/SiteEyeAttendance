import React from "react";
import { firebaseApp } from "../../Config/Firebase/firebase";
import { Navbar } from "../../Components";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

class EditClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let data = this.props.location.state;
    this.setState({
      end_time: data.end_time,
      name: data.name,
      professor: data.professor,
      room: data.room,
      start_time: data.start_time,
      students: data.students,
      type: data.type
    });
  }

  updateClass = () => {
    const {
      end_time,
      name,
      professor,
      room,
      start_time,
      students,
      type
    } = this.state;

    firebaseApp.database().ref("/classes/" + name).set({
      end_time,
      name,
      professor,
      room,
      start_time,
      students,
      type
    }).then(() => {
      console.log("success")
      this.props.history.push("/faculty");
    })
    .catch(function (error) {
      // An error happened.
      console.log("error", error.message)
    });
  };

  signout = () => {
    localStorage.setItem("uid", "");
    this.props.history.push("/");
    // firebaseApp
    //   .auth()
    //   .signOut()
    //   .then(function () {
    //     // Sign-out successful.
    //     this.props.history.push("/");
    //     Swal.fire({
    //       icon: "success",
    //       title: "Logout Successful",
    //       text: "Something went wrong!",
    //     });
    //   })
    //   .catch(function (error) {
    //     // An error happened.
    //   });
  };

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <Navbar
          path={() => this.props.history.push("/")}
          path1={() => this.props.history.push("/faculty")}
          home={() => this.props.history.push("/")}
          loginValue="true"
          signOut={() => this.signout()}
        />

        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <div
            style={{
              textAlign: "center",
              marginTop: "6%",
            }}
          >
            <Typography component="h1" variant="h" style={{ color: "#191817", margin: "20px" }}>
              Edit Class Details
            </Typography>

            <form className="form" noValidate>
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    variant="outlined"
                    fullWidth
                    id="name"
                    label="Name"
                    value={this.state.name}
                    onChange={(e) =>
                      this.setState({
                        name: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    autoComplete="professor"
                    name="professor"
                    variant="outlined"
                    fullWidth
                    id="professor"
                    label="Professor"
                    value={this.state.professor}
                    onChange={(e) =>
                      this.setState({
                        professor: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid container spacing={2}></Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="room"
                    label="Room"
                    name="room"
                    value={this.state.room}
                    onChange={(e) =>
                      this.setState({
                        room: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="start_time"
                    label="Start Time"
                    name="start_time"
                    autoComplete="start_time"
                    value={this.state.start_time}
                    onChange={(e) =>
                      this.setState({
                        start_time: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="end_time"
                    label="End Time"
                    name="end_time"
                    value={this.state.end_time}
                    onChange={(e) =>
                      this.setState({
                        end_time: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    disabled
                    variant="outlined"
                    fullWidth
                    id="type"
                    label="Class Type"
                    name="type"
                    value={this.state.type}
                    onChange={(e) =>
                      this.setState({
                        type: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled
                    variant="outlined"
                    fullWidth
                    name="students"
                    label="students"
                    type="text"
                    id="students"
                    value={this.state.students}
                    onChange={(e) =>
                      this.setState({
                        students: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
              <br />
              <Grid container justify="flex-end" style={{ margin: "10px 0" }}>
                <Grid item>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    style={{ color: "#fff", backgroundColor: "#3b4b70" }}
                    onClick={() => this.updateClass()}
                  >
                    Update Class
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default EditClass;
