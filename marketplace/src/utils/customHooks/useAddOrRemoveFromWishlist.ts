import { useDispatch, useSelector } from "react-redux";
import { doChangeWishlist } from "src/redux/actions";
import { RootState } from "src/redux/types";

export default function useAddOrRemoveFromWishlist(): (
  productId: string
) => "added" | "removed" {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist);

  return (productId: string) => {
    if (wishlist.indexOf(productId) === -1) {
      dispatch(doChangeWishlist([...wishlist, productId]));
      return "added";
    }
    dispatch(doChangeWishlist(wishlist.filter((w) => w !== productId)));
    return "removed";
  };
}
