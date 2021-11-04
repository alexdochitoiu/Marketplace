import React from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@material-ui/core";
import IOrder from "src/types/IOrder";
import clsx from "clsx";
import DescriptionIcon from "@material-ui/icons/Description";
import CloseIcon from "@material-ui/icons/Close";

interface IProps {
  order: IOrder | null;
  onClose: () => void;
  onDone: (data: any) => void;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  addImage: {
    cursor: "pointer",
    "&:hover": {
      opacity: 0.9,
    },
  },
});

export default function ({ order, onClose, onDone }: IProps) {
  const classes = useStyles();
  const [status, setStatus] = React.useState<IOrder["status"]>(
    order?.status || "placed"
  );
  const [awb, setAwb] = React.useState("");
  const [invoice, setInvoice] = React.useState<any>(null);
  const pdfRef = React.useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (order?.status !== status) {
      onDone({ _id: order?._id, status, awb, invoice });
      onClose();
    }
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setInvoice(files[0]);
    }
  };

  return (
    <Dialog open={Boolean(order)} onClose={onClose} fullWidth={true}>
      <DialogTitle style={{ textAlign: "center" }}>
        Modificare comandă
      </DialogTitle>
      <DialogContent style={{ display: "flex", flexDirection: "column" }}>
        <FormControl component="fieldset">
          <FormLabel>Status comandă</FormLabel>
          <RadioGroup
            value={status}
            onChange={(e: any) => setStatus(e.target.value)}
          >
            <FormControlLabel
              value="placed"
              control={<Radio />}
              label="Plasată"
            />
            <FormControlLabel
              value="preparing"
              control={<Radio />}
              label="Procesată"
            />
            <FormControlLabel
              value="sent"
              control={<Radio />}
              label="Trimisă"
            />
          </RadioGroup>
        </FormControl>
        {status === "sent" && (
          <div style={{ marginTop: 15 }}>
            <TextField
              variant="outlined"
              fullWidth={true}
              label="Adaugă AWB"
              value={awb}
              onChange={(e) => setAwb(e.target.value)}
            />
            <input
              accept="application/pdf"
              style={{ display: "none" }}
              name="pdf"
              type="file"
              ref={pdfRef}
              onChange={handleFileChange}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 15,
              }}
            >
              <Tooltip placement="top" title="Selecteaza factura">
                <Avatar
                  className={clsx(classes.avatar, classes.addImage)}
                  style={{
                    backgroundColor: invoice ? "steelblue" : "lightgrey",
                  }}
                  children={
                    <DescriptionIcon style={{ width: 45, height: 45 }} />
                  }
                  onClick={() => pdfRef?.current?.click()}
                />
              </Tooltip>
              {invoice && (
                <div>
                  <b style={{ marginTop: 7 }}>{invoice.name}</b>
                  <IconButton size="small" onClick={() => setInvoice(null)}>
                    <CloseIcon />
                  </IconButton>
                </div>
              )}
            </div>
          </div>
        )}
        <Button
          style={{ marginTop: 20, marginBottom: 10 }}
          color="primary"
          variant="contained"
          onClick={handleClick}
        >
          Modifica
        </Button>
      </DialogContent>
    </Dialog>
  );
}
