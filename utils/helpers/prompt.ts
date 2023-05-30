export const getAllAttributesFromPrompt = (prompt: string) => {
  const regex = /{{(.*?)}}/g;
  const matches = prompt.match(regex);
  if (matches) {
    return matches.map((match) => match.replace(/{{|}}/g, ""));
  }
};
