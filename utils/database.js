function queryBuilder(option = {}) {
  if (typeof option === 'string') return option;
  else if (typeof option === 'object' && option !== null) {
    return Object.keys(option)
      .map((key) => `${key}=${encodeURIComponent(option[key])}`)
      .join('&');
  }
}

class Reference {
  constructor(path, db) {
    this.db = db;
    this.path = path;
  }

  endpoint(query = '') {
    return `${this.db.databaseUrl}/${this.path}.json${query}`;
  }

  set(data) {
    return this.db.fetch({
      path: this.path,
      init: {
        method: 'PUT',
        body: JSON.stringify(data)
      }
    });
  }

  add(data) {
    return this.db.fetch({
      path: this.path,
      init: {
        method: 'POST',
        body: JSON.stringify(data)
      }
    });
  }

  remove() {
    return this.db.fetch({
      path: this.path,
      init: {
        method: 'DELETE'
      }
    });
  }

  update(data) {
    return this.db.fetch({
      path: this.path,
      init: {
        method: 'PATCH',
        body: JSON.stringify(data)
      }
    });
  }

  get(option) {
    return this.db.fetch({
      path: this.path,
      query: queryBuilder(option)
    });
  }
}

export class Database {
  constructor({ databaseUrl, auth }) {
    if (typeof databaseUrl !== 'string')
      throw new Error('The argument "databaseUrl" is required');

    Object.assign(this, {
      databaseUrl,
      auth
    });
  }

  async refreshToken() {
    if (Date.now() < this.auth.user.tokenManager.expiresAt)
      await this.auth.refreshIdToken();
  }

  async authorizedRequest({ path, init, query = '' }) {
    const baseURL = `${this.databaseUrl}/${path}.json`;

    if (this.auth.user) {
      await this.refreshToken();
      const user = localStorage.getItem(this.auth.sKey('User'));
      const { tokenManager } = JSON.parse(user);

      return fetch(`${baseURL}?auth=${tokenManager.idToken}&${query}`, init);
    }

    return fetch(`${baseURL}?${query}`, init);
  }

  fetch(request) {
    const arrayPath = request.path.split('/');
    const notGetMethod = request.init && request.init.method !== 'GET';

    if (arrayPath.includes('words') && notGetMethod) {
      this.authorizedRequest({
        path: `users/${this.auth.user.localId}/words/update`,
        init: {
          method: 'PUT',
          body: JSON.stringify(Date.now())
        }
      });
    }

    return this.authorizedRequest(request).then((response) => response.json());
  }

  ref(path = '') {
    if (typeof path !== 'string')
      throw new Error('The "path" argument should be a string');

    return new Reference(path, this);
  }
}
