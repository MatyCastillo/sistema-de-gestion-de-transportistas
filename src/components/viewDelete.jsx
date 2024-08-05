import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import API from "../utils/const";
import Box from "@mui/material/Box";
import noImg from "../img/no-avatar.png";
import { CloudDone } from "@mui/icons-material";

function ViewDelete(props) {
  const handleImageSelect = (imageUrl) => {
    if (props.onSelectImage) {
      props.onSelectImage(imageUrl); // Llama a la función onSelectImage con la URL de la imagen seleccionada
    }
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        key={props.id + props.title}
      >
        <DialogTitle id="alert-dialog-title">{`Imagenes Eliminadas`}</DialogTitle>
        <DialogContent dividers={true}>
          {`
          Socio: ${props.userId}  |    Tipo de imagen:  ${
            props.title ? props.title : ""
          }`}
          <Stack direction="row" flexWrap="wrap" justifyContent="center">
            {props.list.length > 0 ? (
              props.list.map((i, index) => (
                <Box width={200} alignItems="center" mr={2}>
                  <Avatar
                    key={index}
                    src={`${API.imgURI}/${i}`}
                    variant="rounded"
                    sx={{ width: 200, height: 200, m: 1 }}
                    style={{ border: "0.1px solid #454545", cursor: "pointer" }}
                    onClick={() => handleImageSelect(`${i}`)}
                  />
                  <DialogContentText style={{ textAlign: "center", m: 1 }}>
                    {i}
                  </DialogContentText>
                </Box>
              ))
            ) : (
              <DialogContentText sx={{ mb: 5, mt: 5 }}>
                No hay imagenes para mostrar.
              </DialogContentText>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ViewDelete;
