import { Model } from '@vuex-orm/core';
import Word from './Word';
import Practice from './Practice';

export default class Learn extends Model {
  static entity = 'languages';

  static primaryKey = 'languageId';

  static fields() {
    return {
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
