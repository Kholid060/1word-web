import { Model } from '@vuex-orm/core';
import shortId from 'shortid';
import Word from './Word';
import Practice from './Practice';

export default class Learn extends Model {
  static entity = 'languages';

  static fields() {
    return {
      id: this.uid(() => shortId.generate()),
      languageId: this.string(''),
      words: this.hasMany(Word, 'languageId', 'languageId'),
      practices: this.hasMany(Practice, 'languageId', 'languageId')
    };
  }

  static afterDelete(model) {
    Practice.delete((practice) => practice.languageId === model.languageId);
    Word.delete((word) => word.languageId === model.languageId);
  }
}
