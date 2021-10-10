export const convertDate = (dateText: string): string => {
  const date = new Date(dateText);
  return date.toLocaleString("RO");
  // return `${date.getHours()}:${date.getMinutes()} ${date.getDate() + 1}/${
  //   date.getMonth() + 1
  // }/${date.getFullYear()}`;
};
