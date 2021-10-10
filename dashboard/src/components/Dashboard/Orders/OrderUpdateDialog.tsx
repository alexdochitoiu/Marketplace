import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import IOrder from "src/types/IOrder";

interface IProps {
  order: IOrder | null;
  onClose: () => void;
  onDone: (data: Partial<IOrder>) => void;
}

export default function ({ order, onClose, onDone }: IProps) {
  const [status, setStatus] = React.useState<IOrder["status"]>(
    order?.status || "placed"
  );

  const handleClick = () => {
    if (order?.status !== status) {
      onDone({ _id: order?._id, status });
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
