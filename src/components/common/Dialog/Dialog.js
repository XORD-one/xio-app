import React, { Component } from "react";
import { Dialog, DialogContent } from "@material-ui/core";

const index = ({
  isEscapeClickClose = false,
  isOnClickClose = false,
  width,
  open,
  onClose,
  children
}) => {
  return (
    <Dialog
      fullWidth={true}
      disableEscapeKeyDown={isEscapeClickClose}
      disableBackdropClick={isOnClickClose}
      maxWidth={width}
      open={open}
      onClose={onClose}
    >
      {children}
    </Dialog>
  );
};

export default index;
