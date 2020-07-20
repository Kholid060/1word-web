import { Model } from '@vuex-orm/core';
import shortId from 'shortid';

export default class Practice extends Model {
  static entity = 'practices';

  static fields() {
    return {
      id: this.uid(() => shortId.generate()),
      correct: this.number(0),
      wrong: this.number(0),
      score: this.number(0),
      langId: this.attr(null),
      date: this.number(0)
    };
  }

  static beforeSelect(practices) {
    return practices.sort((a, b) => {
      if (b.date > a.date) {
        return 1;
      } else if (a.date > b.date) {
        return -1;
      }

      return 0;
    });
  }
}
