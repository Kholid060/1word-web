import { Model } from '@vuex-orm/core';
import shortId from 'shortid';
import Word from './Word';
import Practice from './Practice';

export default class Learn extends Model {
  static entity = 'learns';

  static fields() {
    return {
      id: this.uid(() => shortId.generate()),
      learnId: this.string(''),
      words: this.hasMany(Word, 'learnId', 'learnId'),
      practices: this.hasMany(Practice, 'learnId', 'learnId')
    };
  }

  static afterDelete(model) {
    Practice.delete((practice) => practice.learnId === model.learnId);
    Word.delete((word) => word.learnId === model.learnId);
  }
}
