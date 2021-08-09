import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import React from "react";
import * as categoryService from "src/services/category";
import IProduct, { IProductModel } from "src/types/IProduct";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ICategory from "src/types/ICategory";
import SizesPicker from "./SizesPicker";
import ProductImages from "./ProductImages";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: "center",
  },
  btn: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  removeImageButton: {
    cursor: "pointer",
    width: 15,
    height: 15,
    color: "red",
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "#fff",
    borderRadius: "50%",
    opacity: 0.8,
    "&:hover": {
      opacity: 1,
    },
  },
}));

interface IProps {
  mode: "create" | "update" | null;
  onClose: () => void;
  onDone: (product: IProductModel) => void;
  product?: IProduct;
}

type FieldType = keyof IProductModel;

const isProduct = (p: any): p is IProduct => !!p._id;

export default function ({ mode, onClose, onDone, product }: IProps) {
  const classes = useStyles();
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [productDetails, setProductDetails] = React.useState<
    IProduct | IProductModel
  >(
    product || {
      title: "",
      description: "",
      images: [],
      price: 0,
      promoPrice: undefined,
      quantity: 0,
      sizes: ["Universala"],
    }
  );

  React.useEffect(() => {
    categoryService.getAll().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = isProduct(productDetails)
      ? {
          ...productDetails,
          category: productDetails.category?._id,
        }
      : productDetails;
    onDone(data);
  };

  const handleChange =
    (field: FieldType) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setProductDetails({
        ...productDetails,
        [field]: e.target.value,
      });
    };

  const handleAddImage = (img: any[]) => {
    setProductDetails({
      ...productDetails,
      images: [...productDetails.images, ...img].slice(0, 4),
    });
  };

  const handleRemoveImage = (index: number) => {
    setProductDetails({
      ...productDetails,
      images: productDetails.images.filter((_, i) => i !== index),
    });
  };

  const handleChangeSizes = (sizes: string[]) => {
    setProductDetails({
      ...productDetails,
      sizes,
    });
  };

  const handleChangeCategory = (
    event: React.ChangeEvent<{}>,
    value: ICategory | null
  ) => {
    if (value) {
      setProductDetails({
        ...productDetails,
        category: value._id,
      });
    }
  };

  return (
    <Dialog open={Boolean(mode)} onClose={onClose} fullWidth={true}>
      <DialogTitle className={classes.title}>
        {mode === "create" ? "Creeaza articol" : "Modifica articol"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth={true}
            value={productDetails.title}
            onChange={handleChange("title")}
            size="small"
            variant="outlined"
            required={true}
            label="Titlu"
          />
          <TextField
            margin="normal"
            fullWidth={true}
            value={productDetails.description}
            onChange={handleChange("description")}
            size="small"
            variant="outlined"
            label="Descriere"
            required={true}
            multiline={true}
            minRows={2}
            maxRows={4}
          />
          <div style={{ display: "flex" }}>
            <Autocomplete
              fullWidth={true}
              options={categories}
              getOptionLabel={(option) => option.title}
              onChange={handleChangeCategory}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  size="small"
                  label="Categorie"
                  variant="outlined"
                  style={{ marginRight: 8 }}
                />
              )}
            />
            <TextField
              margin="normal"
              value={productDetails.quantity}
              onChange={handleChange("quantity")}
              size="small"
              variant="outlined"
              required={true}
              label="Stoc"
              style={{ marginLeft: 8, width: 150 }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <TextField
              margin="normal"
              fullWidth={true}
              value={productDetails.price}
              onChange={handleChange("price")}
              size="small"
              variant="outlined"
              required={true}
              label="Pret"
              style={{ marginRight: 8 }}
            />
            <TextField
              margin="normal"
              fullWidth={true}
              value={productDetails.promoPrice || ""}
              onChange={handleChange("promoPrice")}
              size="small"
              variant="outlined"
              label="Pret promotional"
              style={{ marginLeft: 8 }}
            />
          </div>
          <Divider />
          <SizesPicker
            sizes={productDetails.sizes}
            onChange={handleChangeSizes}
          />
          <Divider />
          <ProductImages
            images={productDetails.images}
            onAddImages={handleAddImage}
            onRemoveImage={handleRemoveImage}
          />
          <Button
            fullWidth={true}
            variant="contained"
            type="submit"
            color="primary"
            className={classes.btn}
          >
            {mode === "create" ? "Creeaza" : "Modifica"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
