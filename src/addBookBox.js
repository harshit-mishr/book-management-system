import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
 
import { useDispatch } from "react-redux";
import { actions } from "./action";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

export default function AddMovieBox() {
  const [open, setOpen] = useState(false);
  const [inputBook, setInputBook] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const dispatch = useDispatch()
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAdd = () => {
    if(inputBook && inputAuthor){
      dispatch({ type : actions.ADDAVALUE , payload: { id : Math.random(),BOOK:inputBook,AUTHOR:inputAuthor}})
      handleClose()
      setInputAuthor("")
      setInputBook("")
    }
    else{
      alert("invalid details")
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        ADD BOOKS
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          BOOK DETAILS
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <span>BOOK NAME</span>{" "}
          <input
            placeholder="Book..."
            value={inputBook}
            onChange={(e) => {
              setInputBook(e.target.value);
            }}
          />
        </DialogContent>
        <DialogContent dividers>
          <span>AUTHOR NAME</span>{" "}
          <input
            placeholder="author..."
            value={inputAuthor}
            onChange={(e) => {
              setInputAuthor(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleAdd}>
            ADD
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
