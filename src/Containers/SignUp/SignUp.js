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
    this.state = {
      email: "",
      password: "",
      passwordconf: "",
      firstName: "",
      lastName: "",
      prefName: "",
      gender: "",
      contact: "",
      type: ""
    };
  }

  componentDidMount() {
    //this.props.history.push("/");
  }

  signup = () => {
    const { email, password, passwordconf, firstName, lastName, prefName, gender, contact } = this.state;
    var { type } = this.state.type;

    //All fields complete
    if (email === "" || password === "" || passwordconf === "" || firstName === "" || lastName === "" || gender === "" || contact === "") {
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "All required(*) fields must be filled out..."
      });
      return;
    }

    //UAFS email validation / Type setting
    if (!this.isUafsEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Incorrect Email",
        text: "Email must be from a UAFS domain..."
      });
      return;
    } else {
      if (email.endsWith("g.uafs.edu"))
        type = "Student";
      else
        type = "Professor";
    }

    //Phone number validation
    if (!this.isPhoneNumber(contact)) {
      Swal.fire({
        icon: "error",
        title: "Incorrect Phone Number",
        text: "Number entered is not a phone number..."
      });
      return;
    }

    //Passwords match
    if (password != passwordconf) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Confirm that passwords match each other!"
      });
      return;
    }

    //Email doesn't already exist confirmation
    const db = firebaseApp.database();
    const users = db.ref('users');
    const query = users.orderByChild('email').equalTo(email).limitToFirst(1);

    query.on('value', function (snap) {
      snap.forEach(function (data) {
        Swal.fire({
          icon: "error",
          title: "Email Taken",
          text: "This email is already in use!"
        });
      });
      return;
    });

    //TODO: send email confirmation

    //Create Account
    // firebaseApp.database().ref("users").push({
    //   firstName: firstName,
    //   lastName: lastName,
    //   gender: gender,
    //   email: email,
    //   prefName: prefName,
    //   contact: contact,
    //   password: password,
    //   type: type,
    //   verified: "N"
    // }).then((res) => {
    //   console.log("successful", res);
    // }).catch((error) => {
    //   console.log("unsuccessful", error);
    // })

    //Verify email
    // Swal.fire({
    //   icon: "success",
    //   title: "Email Confirmation",
    //   text: "Verify the email, by clicking the link that was sent."
    // });

    //Redirect to Login
    //this.props.history.push("/");
    return;
  };

  isUafsEmail = (e) => {
    var emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(uafs.edu|g.uafs.edu)$/;
    return emailRe.test(e);
  }

  isPhoneNumber = (p) => {
    var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    var digits = p.replace(/\D/g, "");
    return phoneRe.test(digits);
  }

  render() {
    return (
      <div>
        <Navbar
          path={() => this.props.history.push("/")}
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
                autoComplete="confirm-password"
                onChange={(e) => this.setState({ passwordconf: e.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                onChange={(e) => this.setState({ firstName: e.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
                onChange={(e) => this.setState({ lastName: e.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"                
                fullWidth
                id="prefName"
                label="Preferred Name"
                name="prefName"
                autoComplete="prefName"
                onChange={(e) => this.setState({ prefName: e.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="gender"
                label="Gender"
                name="gender"
                autoComplete="gender"
                onChange={(e) => this.setState({ gender: e.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="contact"
                label="Phone Number"
                name="contact"
                autoComplete="contact"
                onChange={(e) => this.setState({ contact: e.target.value })}
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
