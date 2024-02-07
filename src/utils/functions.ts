export const formatTimestamp = (timestamp: any) => {
  const date = new Date(timestamp);

  const formattedDate = date.toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
};
