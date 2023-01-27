import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Box } from "@mui/material";
import { BASE_URL } from "./config";

const DialogBox = ({ openDialog, closeDialog, showAlert }: any)  => {
  const [postData, setPostData] = useState({ userId: 1, title: "", body: "" });
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };
  const addNewPost = () => {
    axios
      .post(BASE_URL+"/posts", postData)
      .then((res) => {
        const alert = document.getElementById("alert-show");
        if (res.status === 201) {
          console.log("added new post :", res);
          if (alert) {
            alert.style.display = "block";
            showAlert({ type: "success", message: "Successfully added post." });
          }
        } else {
          if (alert) {
            alert.style.display = "block";
            showAlert({ type: "error", message: "Failed to delete post." });
          }
        }
        closeDialog(false)
      })
      .catch((err) => console.log("Post insert error :", err));
  };
  const handleClose = () => {
    closeDialog(false);
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Add New Post</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button onClick={addNewPost} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogBox