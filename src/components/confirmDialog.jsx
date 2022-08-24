import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ConfirmDialog = (prop) => {
  return (
    <div>
      <Dialog
        open={prop.open}
        onClose={prop.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">¿{prop.title}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {prop.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={prop.close}>Cancelar</Button>
          <Button onClick={prop.func} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
