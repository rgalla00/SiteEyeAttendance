import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Navbar } from "../../../Components";
import { MdDelete, MdEmail, MdContactMail, MdSchool, MdRoom } from "react-icons/md";
import { FaUserTag, FaRegEdit, FaAppleAlt, FaClock, FaUserPlus } from "react-icons/fa";
import Paper from "@material-ui/core/Paper";
import Swal from "sweetalert2";
import { firebaseApp } from "../../../Config/Firebase/firebase";
import "./ListClasses.css";

class ListClasses extends React.Component {
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

    let { posts } = this.state;

    firebaseApp
      .database()
      .ref("users")
      .orderByChild("type")
      .equalTo("Student")
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

}

export default ListClasses;
