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

export default class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.props.history.push("/dashboard");
      } else {
        // User is signed out.
        // ...
        this.props.history.push("/");
      }
    });
  }

  login = () => {
    const { email, password } = this.state;
     firebaseApp
       .auth()
       .signInWithEmailAndPassword(email, password)
       .then((res) => {
         // console.log("Document successfully written!", res);
         // console.log(res.user.uid)
         localStorage.setItem("uid", res.user.uid);
         Swal.fire("Login Succesful", "You may proceed!", "success");
        this.props.history.push("/dashboard");
       })
       .catch((error) => {
         var errorCode = error.code;
         var errorMessage = error.message;
         // console.log(errorCode, errorMessage)
         Swal.fire({
           icon: "error",
           title: "Oops...",
           text: errorCode,
         });
       });  



  // This code will add a user in firebase / you can change data
   
  //firebaseApp.database().ref("users").push({
  //    firstName: "Angie",
  //    lastName: "John",
  //    gender: "female",
  //    email: "Angie@john.com",
  //    contact: "+343454565789"
  //  }).then((res)=>{
  //    console.log("successful", res);
  //  }).catch((error)=> {
  //    console.log("unsuccessful", error);
  //  })
  };
  render() {

    return (
      <div>
        <Navbar
          path={() => this.props.history.push("/")}
          path1={() => this.props.history.push("/dashboard")}
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
            </form>
          </div>
        </Container>
      </div>
    );
  }
}
