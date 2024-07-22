export const truncateContents = (contents, wordLimit) => {
  const words = contents.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return contents;
};
