import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { firebaseApp } from "../../Config/Firebase/firebase";
import Container from "@material-ui/core/Container";
import { Navbar } from "../../Components";
import Swal from "sweetalert2";
import "./SignUp.css";

export default class SignUp extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   email: "",
    //   password: "",
    // };
  }

  componentDidMount() {
    //this.props.history.push("/");
  }

  signup = () => {
    //const { email, password } = this.state;

    //Create Account
    // firebaseApp.database().ref("users").push({
    //   firstName: "Angie",
    //   lastName: "John",
    //   gender: "female",
    //   email: "Angie@john.com",
    //   contact: "+343454565789"
    // }).then((res) => {
    //   console.log("successful", res);
    // }).catch((error) => {
    //   console.log("unsuccessful", error);
    // })

    //Redirect to Login
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <Navbar
          path={() => this.props.history.push("/")}
          //path1={() => this.props.history.push("/login")}
          //loginValue={this.state.loginValue}
        />

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div
            style={{
              textAlign: "center",
              marginTop: "10%",
            }}
          >
            <Avatar className="avatar" style={{ backgroundColor: "red" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form className="form" noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => this.setState({ email: e.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="passwordconf"
                label="Confirm Password"
                type="password"
                id="passwordconf"
                autoComplete="current-password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
              <br />
              <br />
              <Button
                type="button"
                fullWidth
                variant="contained"
                style={{ color: "#fff", backgroundColor: "#4db6ac" }}
                onClick={() => this.signup()}
              >
                Sign Up
              </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}
