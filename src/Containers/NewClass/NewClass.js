import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { MdAddCircle} from "react-icons/md";
import Typography from "@material-ui/core/Typography";
import { firebaseApp } from "../../Config/Firebase/firebase";
import Container from "@material-ui/core/Container";
import { Navbar } from "../../Components";
import Swal from "sweetalert2";
import "./NewClass.css";
import md5 from 'crypto-js/md5';
import emailjs from 'emailjs-com';

export default class NewClass extends React.Component {
  constructor() {
    super();
    this.state = {
      end_time: "",
      name: "",
      professor: "",
      room: "",
      start_time: "",
      students: "",
      type: "",
    };
  }

  componentDidMount() {
    //this.props.history.push("/");
  }

  newclass = () => {
    const { end_time, name, professor, room, start_time, students, type } = this.state;
    //var { type } = this.state.type;

    //All fields complete
    if (end_time === "" || name === "" || professor === "" || room === "" || start_time === "" || students === "" || type === "") {
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "All required(*) fields must be filled out..."
      });
      return;
    }

    //Create Account
    firebaseApp.database().ref("classes").push({
      end_time: end_time,
      name: name,
      professor: professor,
      room: room,
      start_time: start_time,
      students: students,
      type: type
    }).then((res) => {
      console.log("successful", res);
    }).catch((error) => {
      console.log("unsuccessful", error);
    })

    //Redirect to Faculty Page
    this.props.history.push("/faculty");
    return;
  };

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
              <MdAddCircle />
            </Avatar>

            <Typography component="h1" variant="h5">
              Create New Class
            </Typography>
            
            <form className="form" noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Class Name"
                name="name"
                //autoComplete="name"
                autoFocus
                onChange={(e) => this.setState({ name: e.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="professor"
                label="Professor"
                type="professor"
                id="professor"
               // autoComplete="current-password"
                onChange={(e) => this.setState({ professor: e.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Classroom"
                label="Classroom"
                type="room"
                id="room"
                //autoComplete="confirm-password"
                onChange={(e) => this.setState({ room: e.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="start_time"
                label="Start Time"
                name="start_time"
                //autoComplete="start_time"
                onChange={(e) => this.setState({ start_time: e.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="end_time"
                label="End Time"
                name="end_time"
               // autoComplete="end_time"
                onChange={(e) => this.setState({ end_time: e.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="type"
                label="Class Type"
                name="type"
                //autoComplete="type"
                onChange={(e) => this.setState({ type: e.target.value })}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="students"
                label="Students"
                name="students"
                //autoComplete="students"
                onChange={(e) => this.setState({ students: e.target.value })}
              />
              <br />
              <br />
              <Button
                type="button"
                fullWidth
                variant="contained"
                style={{ color: "#fff", backgroundColor: "#3b4b70" }}
                onClick={() => this.newclass()}
              >
                Create Class
              </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}
