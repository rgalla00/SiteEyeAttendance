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
import "./Faculty.css";

class Faculty extends React.Component {
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

  delete = (v, i) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );

          console.log(v.id);
          let { posts } = this.state;

          firebaseApp
            .database()
            .ref("/classes/" + v.id)
            .remove()
            .then(posts.splice(i, 1));
          this.setState({
            posts: posts,
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  post = () => {
    let {
      title,
      description,
      timestamp,
      author,
      authoruid,
      createdOn,
      postImage,
      fileName,
    } = this.state;

    if (title) {
      if (description) {
        firebaseApp
          .firestore()
          .collection("posts")
          .add({
            title: title,
            description: description,
            timestamp: timestamp,
            author: author,
            authoruid: authoruid,
            createdOn: createdOn,
            postImageURL: postImage,
            fileName: fileName,
          })
          .then((res) => {
            this.props.history.push("/faculty");
            this.setState({
              title: " ",
              description: " ",
            });
            // console.log("Document successfully written!", res);
            Swal.fire(
              "Post created successfully!",
              "You may proceed!",
              "success"
            );
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
            Swal.fire("Data not sent successfully...", "You may proceed!", "error");
          });
      } else {
        Swal.fire(
          "Description is missing...",
          "Please write a description...",
          "error"
        );
      }
    } else {
      Swal.fire("Title is missing!", "Please Give Title to Post", "error");
    }
  };

  render() {
    console.log(this.state.posts);

    return (
      <div className="profile">
        <Navbar
          path={() => this.props.history.push("/")}
          path1={() => this.props.history.push("/faculty")}
          home={() => this.props.history.push("/")}
          loginValue="true"
          signOut={() => this.signout()}
        />

        <div className="heading"style={{
                    textAlign: "center",
                    padding: "20px 0",
                    fontSize: "300%",
          }}>Faculty Page
        </div>

        <div>
          {this.state.loader ? (
            <div>
              {this.state.posts === undefined ||
              this.state.posts.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px 0",
                    fontSize: "300%",
                  }}
                >
                  Data Not Available
                </div>
              ) : (
                <Container>
              <Button
                type="button"
                //fullWidth
                variant="contained"
                style={{ color: "#fff", backgroundColor: "#3b4b70" }}
                onClick={() => this.props.history.push("/new-class")}
              >
                Add Class
              </Button>
              <br/>
              <br/>
                  {this.state.posts.map((v, i) => {
                    return (
                      <Grid container justify-content center>
                        <Grid item lg={12} sm={12}>
                          <Paper elevation={0} className="paper" key={i}>
                            <Grid container>

                              <Grid item lg={3} sm={12} md={6}>
                                &nbsp; &nbsp;
                                <MdSchool size={15} />
                                <span className="text">{v.name}</span>
                              </Grid>

                              <Grid item lg={3} sm={12} md={6}>
                                &nbsp; &nbsp;
                                <FaAppleAlt size={15} />
                                <span className="text">{v.professor}</span>
                              </Grid>

                              <Grid item lg={3} sm={12} md={6}>
                                &nbsp; &nbsp;
                                <MdRoom size={15} />
                                <span className="text">{v.room}</span>
                              </Grid>

                              <Grid item lg={3} sm={12} md={6}>
                                &nbsp; &nbsp;
                                <FaClock size={15} />
                                <span className="text">{v.start_time}</span>
                              </Grid>

                              <Grid item lg={12} sm={12} md={4}>
                                <div style={{ float: "right" }}>
                                  <FaRegEdit size={20} />

                                  <span
                                    className="edit-btn"
                                    onClick={() => {
                                      this.props.history.push("/edit-class", v);
                                      console.log(v);
                                    }}
                                  >
                                    Edit &nbsp;
                                  </span>
                                  <MdDelete color="#b55039" size={20} />
                                  <span
                                    className="delete-btn"
                                    onClick={() => this.delete(v, i)}
                                  >
                                    Delete &nbsp;
                                  </span>
                                  <FaUserAlt size={20} />
                                  <span
                                    className="edit-btn"
                                    onClick={() => {
                                      this.props.history.push("/list-students", v);
                                      console.log(v);
                                    }}
                                  >
                                    Students
                                  </span>
                                  <br />
                                </div>
                              </Grid>                            
                            </Grid>                           
                          </Paper>
                        </Grid>
                      </Grid>
                      
                    );
                  })}
                </Container>
                
              )}
            </div>
          ) : (
            <div style={{ margin: "auto", textAlign: "center" }}>
              <p>Loading...</p>
              <span className="spinner spinner-large"></span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Faculty;
