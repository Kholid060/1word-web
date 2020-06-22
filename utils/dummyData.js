/* eslint-disable */

export default function() {
  function randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  function wordGenerator(id, length = 13) {
    return new Array(length).fill().map((nothing) => {
      const randomText = () =>
        Math.random()
          .toString(36)
          .substring(7);
      return {
        title: randomText(),
        meaning: randomText(),
        languageId: id,
        timestamp: randomDate(new Date(2020, 4, 29), new Date()).getTime()
      };
    });
  }

  function practiceGenerator(id, length = 10) {
    const randomNumber = (min = 1, max = 20) =>
      Math.floor(Math.random() * (max - min) + min);
    return new Array(length).fill().map((nothingToo) => {
      return {
        correct: randomNumber(),
        wrong: randomNumber(5, 30),
        score: randomNumber(0, 100),
        question_length: randomNumber(10, 28),
        languageId: id,
        timestamp: randomDate(new Date(2020, 5, 1), new Date()).getTime()
      };
    });
  }
  // await dispatch('entities/create', {
  //   entity: 'languages',
  //   data: [{
  //       languageId: 'de',
  //       practices: practiceGenerator('de', 2),
  //       words: wordGenerator('de', 15)
  //     },
  //     {
  //       languageId: 'es',
  //       practices: practiceGenerator('es', 6),
  //       words: wordGenerator('es', 21)
  //     }
  //   ]
  // });
}
