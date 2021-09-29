import {
  Avatar,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  makeStyles,
  Switch,
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
import ColorPicker from "src/components/shared/ColorPicker";
import SizeTable from "./SizeTable";
import SectionRadio from "../../Categories/CategoryDialog/SectionRadio";

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
  onDone: (product: IProductModel, operation: "create" | "update") => void;
  product?: IProduct;
}

type FieldType = keyof IProductModel;

const isProduct = (p: any): p is IProduct => !!p._id;

export default function ({ mode, onClose, onDone, product }: IProps) {
  const classes = useStyles();
  const [section, setSection] = React.useState<ICategory["section"]>(
    product?.category?.section || "other"
  );
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [productDetails, setProductDetails] = React.useState<
    IProduct | IProductModel
  >(
    product || {
      title: "",
      productCode: "",
      description: "",
      images: [],
      sizeType: "universal",
      sizes: [{ size: "Universala", price: 0, quantity: 0 }],
      active: true,
    }
  );
  const [color, setColor] = React.useState(!!productDetails.color);

  React.useEffect(() => {
    categoryService.getAll().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!productDetails.category) {
      return alert("Trebuie sa alegi o categorie pentru produs!");
    }
    if (isProduct(productDetails)) {
      // update
      const c = productDetails.category;
      onDone(
        {
          ...productDetails,
          category: typeof c === "string" ? c : c?._id,
        },
        "update"
      );
    } else {
      // create
      onDone(productDetails, "create");
    }
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

  const handleChangeSizes = (
    sizeType: IProductModel["sizeType"],
    sizes: string[]
  ) => {
    setProductDetails({
      ...productDetails,
      sizeType,
      sizes: sizes.map((s) => ({ size: s, price: 0, quantity: 0 })),
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

  const handleChangeActive = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductDetails({
      ...productDetails,
      active: event.target.checked,
    });
  };

  const handleAddColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setColor(checked);
    if (!checked) {
      setProductDetails({
        ...productDetails,
        color: undefined,
      });
    }
  };

  const defaultCategory =
    typeof productDetails.category === "string"
      ? undefined
      : productDetails.category;

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
          <SectionRadio
            value={section}
            onChange={(e) => setSection(e.target.value)}
          />
          <div style={{ display: "flex" }}>
            <Autocomplete
              defaultValue={defaultCategory}
              fullWidth={true}
              options={categories.filter((c) => c.section === section)}
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
              value={productDetails.productCode}
              onChange={handleChange("productCode")}
              size="small"
              variant="outlined"
              required={true}
              label="Cod produs"
              style={{ marginLeft: 8, width: 200 }}
            />
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={productDetails.active}
                  onChange={handleChangeActive}
                />
              }
              label="Articol activ"
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <FormControlLabel
                control={
                  <Checkbox checked={color} onChange={handleAddColorChange} />
                }
                label="Adauga culoare"
              />
              {color && (
                <ColorPicker
                  color={productDetails.color}
                  onChange={(color) =>
                    setProductDetails({ ...productDetails, color })
                  }
                />
              )}
            </div>
          </div>
          <SizesPicker
            sizeType={productDetails.sizeType}
            sizes={productDetails.sizes.map((s) => s.size)}
            onChange={handleChangeSizes}
          />
          <SizeTable
            sizes={productDetails.sizes}
            onChange={(sizes) =>
              setProductDetails({ ...productDetails, sizes })
            }
          />
          <Divider />
          <ProductImages
            images={productDetails.images}
            onAddImages={handleAddImage}
            onRemoveImage={handleRemoveImage}
          />
          <Divider />
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
