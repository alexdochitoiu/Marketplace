const WISHLIST_KEY = "wishlist";
export const addOrRemoveFromWishlist = (
  productId: string
): "added" | "removed" => {
  const wishlistRaw = localStorage.getItem(WISHLIST_KEY);
  if (!wishlistRaw) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify([productId]));
    return "added";
  }
  const wishlist = JSON.parse(wishlistRaw) as string[];
  if (wishlist.indexOf(productId) === -1) {
    localStorage.setItem(
      WISHLIST_KEY,
      JSON.stringify([...wishlist, productId])
    );
    return "added";
  }

  localStorage.setItem(
    WISHLIST_KEY,
    JSON.stringify(wishlist.filter((w) => w !== productId))
  );
  return "removed";
};

export const isAddedToWishlist = (productId: string): boolean => {
  const wishlistRaw = localStorage.getItem(WISHLIST_KEY);
  if (!wishlistRaw) {
    return false;
  }
  const wishlist = JSON.parse(wishlistRaw) as string[];
  return wishlist.indexOf(productId) !== -1;
};
