import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DialogBox from "./DialogBox.tsx";
import { BASE_URL } from "./config";
import styles from "./Posts.style.ts";

export default function DataTable() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [alert, setAlert] = useState({ type: "success", message: "Success" });
  const [selected, setSelected] = useState([]);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "title", headerName: "Post Title", width: 460 },
    { field: "body", headerName: "Post Body", width: 460 },
  ];

  useEffect(() => {
    listAllPost();
  }, []);

  const listAllPost = () => {
    axios
      .get(BASE_URL + "/posts")
      .then((res) => {
        if (res && res.data) {
          console.log("res :", res.data);
          setPosts(res.data);
        }
      })
      .catch((err) => console.log("Post fetch error :", err));
  };
  const selectionPost = (data: any) => {
    setSelected(data);
  };
  const deletePost = () => {
    selected.length > 0 &&
      selected.map((item: number) => {
        axios
          .delete(`${BASE_URL}/posts/${item}`)
          .then((res) => {
            const alert = document.getElementById("alert-show");
            if (res.status === 200) {
              if (alert) {
                alert.style.display = "block";
                setAlert({
                  type: "success",
                  message: "Successfully deleted post.",
                });
              }
              console.log("deleted post :", item, res.status);
            } else {
              if (alert) {
                alert.style.display = "block";
                setAlert({ type: "error", message: "Failed to delete post." });
              }
            }
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          })
          .catch((err) => console.log("Post insert error :", err));
      });
  };
  const handleEdit = (data: any) => {
    axios
      .get(BASE_URL + "/posts/" + data.id + "/comments")
      .then((res) => {
        if (res && res.data) {
          console.log("res :", res.data);
          navigate("/post/view", {
            state: { data: data.row, comments: res.data },
          });
        }
      })
      .catch((err) => console.log("Post fetch error :", err));
  };
  return (
    <React.Fragment>
      <div style={styles.alertSection} id="alert-show">
        <Alert severity={alert.type as any}>{alert.message}</Alert>
      </div>
      <div style={styles.addNewPost}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add New Post
        </Button>
        <Button
          variant="outlined"
          onClick={deletePost}
          style={{ marginLeft: "10px" }}
        >
          Delete
        </Button>
      </div>

      <div style={styles.postTable}>
        <DataGrid
          onRowClick={handleEdit}
          rows={posts}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(ids) => selectionPost(ids)}
        />
      </div>
      <DialogBox
        openDialog={open}
        closeDialog={() => setOpen(false)}
        showAlert={(data: any) => setAlert(data)}
      />
    </React.Fragment>
  );
}
