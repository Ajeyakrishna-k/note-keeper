import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

const CustomizedDialogs = ({
  isOpen,
  onSubmit,
  onClose,
  children,
  actionButtonText,
  actionButtonColor = "info",
}) => {
  return (
    <>
      <Dialog onClose={onClose} open={isOpen}>
        {children}
        <DialogActions>
          <Button color={actionButtonColor} onClick={onSubmit}>
            {actionButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomizedDialogs;
