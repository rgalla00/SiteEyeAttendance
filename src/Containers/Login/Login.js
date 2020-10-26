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
import "./Login.css";
import md5 from 'crypto-js/md5';

export default class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      success: false,
      changed: false,
      verified: false
    };
  }

  componentDidMount() {
    var { success, changed, verified } = this.state;
    this.redirect(success, changed, verified);

    //------------Old Approach-----------
    // firebaseApp.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     // User is signed in.
    //     //TODO: redirect to the right page (Admin, Professor, or Student)
    //     this.props.history.push("/dash");
    //   } else {
    //     // User is signed out.
    //     this.props.history.push("/");
    //   }
    // });
  }

  redirect = (success, changed, verified) => {
    if (!changed)
      return;

    if (!verified) {
      Swal.fire("Unverified Email", "The email you entered has not been verified! Check your spam...", "error");
      return;
    }

    if (success) {
      //TODO: send to correct page, based on type (Professor, Student, or Admin)
      this.props.history.push("/dash");
    } else {
      Swal.fire("Login Failure", "The email or password you entered is incorrect...", "error");
      return;
    }
  }

  login = () => {
    const { email, password } = this.state;
    var { success, changed, verified } = this.state;

    //UAFS email validation 
    if (!this.isUafsEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Incorrect Email",
        text: "Email must be from a UAFS domain..."
      });
      return;
    }

    //TODO: encrypt/decrypt password
    //Email doesn't already exist confirmation
    const db = firebaseApp.database();
    const users = db.ref('users');
    const query = users.orderByChild('email').equalTo(email).limitToFirst(1);

    query.on('value', function (snap) {
      
      //Verification
      snap.forEach(function (data) {
        var user = data.val();
        var encryptedPass = md5(password);

        if (user.email === email && String(user.password) === String(encryptedPass)) {
          if (user.verified === "Y") {
            verified = true;
          }

          localStorage.setItem("uid", data.key);
          success = true;
          changed = true;
        } else {
          changed = true;
          success = false;
        }
      });
    });

    this.redirect(success, changed, verified);

    //------------Old Approach-----------
    // firebaseApp
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then((res) => {
    //     // console.log("Document successfully written!", res);
    //     // console.log(res.user.uid)
    //     localStorage.setItem("uid", res.user.uid);
    //     Swal.fire("Login Succesful", "You may proceed!", "success");
    //     this.props.history.push("/dash");
    //   })
    //   .catch((error) => {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // console.log(errorCode, errorMessage)
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: "Login failed: " + errorCode,
    //     });
    //   });
  };

  signup = () => {
    this.props.history.push("/signup");
  };

  isUafsEmail = (e) => {
    var emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(uafs.edu|g.uafs.edu)$/;
    return emailRe.test(e);
  }

  render() {
    return (
      <div>
        <Navbar
          path={() => this.props.history.push("/")}
          path1={() => this.props.history.push("/dash")}
          path2={() => this.props.history.push("/signup")}
          loginValue={this.state.loginValue}
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
              Sign in
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
              <br />
              <br />
              <Button
                type="button"
                fullWidth
                variant="contained"
                style={{ color: "#fff", backgroundColor: "#4db6ac" }}
                onClick={() => this.login()}
              >
                Sign In
                </Button>
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
