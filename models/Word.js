import { Model } from '@vuex-orm/core';
import shortid from 'shortid';

export default class Word extends Model {
  static entity = 'words';

  static fields() {
    return {
      id: this.uid(() => shortid.generate()),
      title: this.string(''),
      meaning: this.attr(''),
      learnId: this.attr(null),
      timestamp: this.attr(0)
    };
  }

  static beforeSelect(words) {
    return words.sort((a, b) => {
      if (b.timestamp > a.timestamp) {
        return 1;
      } else if (a.timestamp > b.timestamp) {
        return -1;
      }

      return 0;
    });
  }
}
