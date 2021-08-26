import { makeStyles, Tooltip } from "@material-ui/core";
import clsx from "clsx";
import IProduct from "src/types/IProduct";

const useStyles = makeStyles({
  root: {
    cursor: "pointer",
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: "50%",
    padding: 5,
    border: "1px solid rgb(221, 221, 221)",
    background: "#f4f4f4",
    transition: "all 0.3s ease-in-out",
  },
  selected: {
    borderColor: "#444",
  },
  swatch: {
    borderRadius: "50%",
    width: "100%",
    height: "100%",
    border: "1px solid #ccc",
    margin: -1,
  },
});

const useTooltipStyles = makeStyles({
  tooltip: {
    background: "#fefefe",
    border: "1px solid #dddd",
  },
  arrow: {
    color: "#ddd",
  },
});

interface IProps {
  product: IProduct;
  selected?: boolean;
}

export default function ({ product, selected }: IProps) {
  const classes = useStyles();
  const tooltipClasses = useTooltipStyles();
  const TooltipContent = () => (
    <div>
      <img
        width={60}
        style={{ objectFit: "contain" }}
        src={product.images[0]}
      />
    </div>
  );
  return (
    <Tooltip
      open={selected ? false : undefined}
      title={<TooltipContent />}
      placement="top"
      arrow={true}
      classes={{ tooltip: tooltipClasses.tooltip, arrow: tooltipClasses.arrow }}
    >
      <div className={clsx(classes.root, { [classes.selected]: selected })}>
        <div className={classes.swatch} style={{ background: product.color }} />
      </div>
    </Tooltip>
  );
}
