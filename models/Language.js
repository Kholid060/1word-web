import { Model } from '@vuex-orm/core';
import Word from './Word';
import Practice from './Practice';

export default class Language extends Model {
  static entity = 'languages';

  static primaryKey = 'langId';

  static fields() {
    return {
      langId: this.string(''),
      words: this.hasMany(Word, 'langId', 'langId'),
      practices: this.hasMany(Practice, 'langId', 'langId'),
      retrieveWords: this.attr(false),
      retrievePractices: this.attr(false)
    };
  }

  static afterDelete(model) {
    Practice.delete((practice) => practice.langId === model.langId);
    Word.delete((word) => word.langId === model.langId);
  }
}
