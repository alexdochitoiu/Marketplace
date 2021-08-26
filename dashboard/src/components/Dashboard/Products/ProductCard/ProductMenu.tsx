import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IProduct from "src/types/IProduct";

interface IProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
  product: IProduct;
  onDuplicate: (product: IProduct) => void;
}

export default function ({ product, anchorEl, onClose, onDuplicate }: IProps) {
  return (
    <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
      <MenuItem
        onClick={() => {
          onClose();
          onDuplicate(product);
        }}
      >
        Duplică
      </MenuItem>
    </Menu>
  );
}
