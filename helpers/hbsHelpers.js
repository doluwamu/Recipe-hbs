const hbsHelpers = {
  wordBreak: (word) => {
    if (!word || typeof word !== "string") return null;

    const wordSplit = word.split("");
    wordSplit.splice(20);
    return `${wordSplit.join("").trim()}...`;
  },

  capitalize: (word) => {
    if (!word || typeof word !== "string") return null;

    const wordSplit = word.split("");
    const a = wordSplit[0].toUpperCase();
    wordSplit.splice(0, 1);
    return a + wordSplit.join("");
  },
};

export default hbsHelpers;
