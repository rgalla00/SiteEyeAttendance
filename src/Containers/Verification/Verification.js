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
import "./Verification.css";

export default class Verification extends React.Component {
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
      type: "",
      verified: "N",
      password: ""
    };
  }

  componentDidMount() {

  }

  isUafsEmail = (e) => {
    var emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(uafs.edu|g.uafs.edu)$/;
    return emailRe.test(e);
  }

  verify = () => {
    var {
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
    var success = false;
    var uid = "";

    //UAFS email validation 
    if (!this.isUafsEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Incorrect Email",
        text: "Email must be from a UAFS domain..."
      });
      return;
    }

    //Email doesn't already exist confirmation
    const db = firebaseApp.database();
    const users = db.ref('users');
    const query = users.orderByChild('email').equalTo(email).limitToFirst(1);

    query.on('value', function (snap) {
      
      //Verification
      snap.forEach(function (data) {
        var user = data.val();

        if (user.email === email) {
          success = true;
          uid = data.key;
          email = user.email;
          firstName = user.firstName;
          lastName = user.lastName;
          prefName = user.prefName;
          contact = user.contact;
          gender = user.gender;
          type = user.type;
          password = user.password;
          verified = "Y";
        } 
      });
    });

    if (!success) {
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: "Could not verify email! Please try again..."
      });
      return;
    }

    //Account Verified / Update
    firebaseApp.database().ref("/users/" + uid).set({
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
      this.props.history.push("/");
    })
    .catch(function (error) {
      console.log("error", error.message)
    });
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
            <Avatar className="avatar" style={{ backgroundColor: "#3b4b70" }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Verification
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
              <br />
              <br />
              <Button
                type="button"
                fullWidth
                variant="contained"
                style={{ color: "#fff", backgroundColor: "#3b4b70" }}
                onClick={() => this.verify()}
              >
                Verify Account
              </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}
