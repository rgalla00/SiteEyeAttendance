import React from "react";
import { firebaseApp } from "../../Config/Firebase/firebase";
import { Navbar } from "../../Components";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let data = this.props.location.state;
    this.setState({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      gender: data.gender,
      contact: data.contact,
      id: data.id,
      type: data.type,
      prefName: data.prefName,
      verified: data.verified,
      password: data.password
    });
  }

  updateUser = () => {
    const {
      email,
      firstName,
      lastName,
      contact,
      gender,
      id,
      type,
      prefName,
      verified,
      password
    } = this.state;

    firebaseApp.database().ref("/users/" + id).set({
      email,
      firstName,
      lastName,
      contact,
      gender,
      type,
      prefName,
      verified,
      password
    }).then(() => {
      console.log("success")
      this.props.history.push("/dashboard");
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
          path1={() => this.props.history.push("/dashboard")}
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
              Edit Details
            </Typography>

            <form className="form" noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={this.state.firstName}
                    onChange={(e) =>
                      this.setState({
                        firstName: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    autoComplete="pname"
                    name="prefName"
                    variant="outlined"
                    fullWidth
                    id="prefName"
                    label="Preferred Name"
                    value={this.state.prefName}
                    onChange={(e) =>
                      this.setState({
                        prefName: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid container spacing={2}></Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={(e) =>
                      this.setState({
                        lastName: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    disabled
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={(e) =>
                      this.setState({
                        email: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="gender"
                    label="Gender"
                    name="gender"
                    value={this.state.gender}
                    onChange={(e) =>
                      this.setState({
                        gender: e.target.value,
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
                    label="Type"
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
                    variant="outlined"
                    fullWidth
                    name="contact"
                    label="Contact"
                    type="text"
                    id="contact"
                    value={this.state.contact}
                    onChange={(e) =>
                      this.setState({
                        contact: e.target.value,
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
                    onClick={() => this.updateUser()}
                  >
                    Update User
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

export default EditUser;
