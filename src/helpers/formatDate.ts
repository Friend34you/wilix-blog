export const formatDate = (inputDate: string): string => {

  const date = new Date(inputDate);
  const month = date.getMonth() + 1;

  return `${date.getDate()}.${month < 10 ? "0" + month : month}.${date.getFullYear()}`;
};