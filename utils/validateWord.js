export default function(word, { learnId, title }) {
  return (
    word.learnId === learnId && word.title.toLowerCase() === title.toLowerCase()
  );
}
