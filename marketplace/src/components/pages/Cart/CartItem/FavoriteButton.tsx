import { makeStyles } from "@material-ui/styles";
import React from "react";
import { BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import SnackBar from "src/components/generic/SnackBar";
import FavoriteSnackContent from "src/components/generic/SnackContent/FavoriteSnackContent";
import { RootState } from "src/redux/types";
import useAddOrRemoveFromWishlist from "src/utils/customHooks/useAddOrRemoveFromWishlist";

const useStyles = makeStyles({
  root: {
    cursor: "pointer",
    color: "#555",
    borderBottom: "1px solid transparent",
    transition: "0.3s all ease-in",
    "&:hover": {
      color: "var(--primary)",
      borderBottom: "1px solid var(--primary)",
    },
  },
});

export default function ({ productId }) {
  const classes = useStyles();
  const [snack, setSnack] = React.useState<React.ReactNode | null>(null);
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const addOrRemoveFromWishlist = useAddOrRemoveFromWishlist();

  const handleHeartClick = () => {
    const operation = addOrRemoveFromWishlist(productId);
    setSnack(<FavoriteSnackContent operation={operation} />);
  };

  const isWishlist = wishlist.indexOf(productId) !== -1;

  return (
    <>
      <SnackBar
        message={snack}
        open={Boolean(snack)}
        onClose={() => setSnack(null)}
      />
      <h5
        style={{ margin: "0 20px" }}
        className={`flex-row ${classes.root} add-to-fav-button`}
        onClick={handleHeartClick}
      >
        {isWishlist ? (
          <>
            <FaHeart style={{ marginRight: 4 }} />
            Adăugat la favorite
          </>
        ) : (
          <>
            <BiHeart style={{ marginRight: 4 }} />
            Adaugă la favorite
          </>
        )}
      </h5>
    </>
  );
}
