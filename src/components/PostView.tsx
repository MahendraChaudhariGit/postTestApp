import React, { useState } from "react";
import { TextField, Typography, Button, Box, Alert, Grid } from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "./config";

const PostView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ type: "success", message: "Success" });
  const postStates = location ? location.state : {};
  const [postData, setPostData] = useState(postStates.data);
  const [comments, setCommentsData] = useState(postStates.comments);

  console.log("final :", postData, comments);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };
  const editPost = () => {
    axios
      .put(BASE_URL + "/posts/" + postData.id, postData.data)
      .then((res) => {
        console.log("res :", res);
        const alert = document.getElementById("alert-show");
        if (res.status === 200) {
          console.log("added new post :", res);
          if (alert) {
            alert.style.display = "block";
            setAlert({
              type: "success",
              message: "Successfully updated post.",
            });
          }
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          if (alert) {
            alert.style.display = "block";
            setAlert({ type: "error", message: "Failed to update post." });
          }
        }
      })
      .catch((err) => {
        console.log("Post insert error :", err);
        setAlert({ type: "error", message: "Failed to update post." });
      });
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display: "flex",
        flexDirection: "column",
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div
            style={{
              marginTop: "50px",
              marginLeft: "50px",
              marginRight: "50px",
              display: "none",
            }}
            id="alert-show"
          >
            <Alert severity={`${alert.type}` as any}>{alert.message}</Alert>
          </div>
          <div
            style={{
              marginTop: "100px",
              marginLeft: "50px",
            }}
          >
            <Typography variant="h5" align="left" gutterBottom>
              Post View
            </Typography>
          </div>
          <div style={{ textAlign: "left", marginLeft: "50px" }}>
            <TextField
              id="outlined-multiline-static"
              label="Post Title"
              name="title"
              value={postData.title}
              onChange={handleChange}
              multiline
              rows={4}
            />
            <TextField
              id="outlined-multiline-static"
              label="Post Body"
              name="body"
              value={postData.body}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </div>
          <div
            style={{
              marginTop: "50px",
              marginLeft: "50px",
            }}
          >
            <Button variant="contained" onClick={editPost}>
              Submit
            </Button>
            <Button
              variant="contained"
              style={{ marginLeft: "10px" }}
              onClick={() => navigate("/")}
            >
              Back
            </Button>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div
            style={{
              marginTop: "100px",
              marginLeft: "50px",
            }}
          >
            <Typography variant="h5" align="left" gutterBottom>
              Comments
            </Typography>
          </div>
          <div
            style={{
              marginLeft: "50px",
            }}
          >
            {comments.length > 0 &&
              comments.map((item: any) => {
                return (
                  <div key={item.id}>
                    <div>
                      <Typography
                        variant="subtitle2"
                        gutterBottom
                        style={{ marginTop: "10px" }}
                      >
                        <span style={{ fontWeight: "bold" }}>{item.name}</span>
                        <span style={{ fontSize: "0.7rem", marginLeft: "5px" }}>
                          ({item.email})
                        </span>
                      </Typography>
                    </div>
                    <Typography
                      variant="caption"
                      gutterBottom
                      style={{ marginLeft: "10px" }}
                    >
                      {item.body}
                    </Typography>
                  </div>
                );
              })}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
export default PostView;
