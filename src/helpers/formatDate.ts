export const formatDate = (inputDate: string): string => {

  const date = new Date(inputDate);

  return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
};