import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Navbar } from "../../Components";
import { MdDelete, MdEmail, MdContactMail, MdSchool, MdRoom } from "react-icons/md";
import { FaUserAlt, FaRegEdit, FaAppleAlt, FaClock, FaUserPlus } from "react-icons/fa";
import Paper from "@material-ui/core/Paper";
import Swal from "sweetalert2";
import { firebaseApp } from "../../Config/Firebase/firebase";
import "./Student.css";

class Student extends React.Component {
  constructor() {
    super();

    var today = new Date(),
      date =
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear();

    var timestamp = today.toUTCString();
    this.state = {
      title: "",
      description: "",
      timestamp: timestamp,
      author: "",
      login: false,
      posts: [],
      loader: false,
      createdOn: date,
      img: "",
      fileName: "",
      disabledButton: false,
      postImage: "",
    };
  }

  componentDidMount() {
    // firebaseApp.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     // console.log("user =>>>>", user.uid);
    //     this.setState({
    //       authoruid: user.uid,
    //     });
    //     this.props.history.push("/dash");
    //   } else {
    //     this.props.history.push("/");
    //   }
    // });

    let { posts } = this.state;

    firebaseApp
      .database()
      .ref("classes")
      .once("value", (res) => {
        res.forEach((v) => {
          var data = v.val();
          data.id = v.key;
          posts.push(data);
        });
        this.setState({ posts: posts, loader: true });
      });
    console.log(posts);
  }


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

}

export default Student;
