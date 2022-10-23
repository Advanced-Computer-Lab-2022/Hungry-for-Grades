// eslint-disable-next-line import/extensions
class Cookie {
  // to check if cookie exists
  isFound(key: string) {
    return document.cookie.indexOf(key) !== -1;
  }

  // get cookie value by key name
  get(key: string) {
    if (this.isFound(key)) {
      return document.cookie
        .split(';')
        .filter(item => {
          return item.indexOf(key) !== -1;
        })
        .join(';');
    } else {
      return null;
    }
  }

  // to set cookie value
  set(key: string, value: string, expiresMonth: number) {
    if (!this.isFound(key)) {
      const date = new Date();
      date.setMonth(date.getMonth() + expiresMonth);
      document.cookie += `${key}=${value};expires=${date.toUTCString()}`;
    } else {
      this.update(key, value, expiresMonth);
    }
  }

  // update cookie value
  update(key: string, value: string, expiresMonth: number) {
    if (this.isFound(key)) {
      this.remove(key);
      this.set(key, value, expiresMonth);
    } else {
      throw new Error('Cookie not found to be updated');
    }
  }

  // to remove cookie value
  remove(key: string) {
    if (this.isFound(key)) {
      return document.cookie
        .split(';')
        .filter(item => {
          return item !== key;
        })
        .join(';');
    } else {
      throw new Error('Cookie not found to be removed');
    }
  }

  // to get cookie keys
  getKeys() {
    return document.cookie.split(';').map(item => {
      return item.split('=')[0];
    });
  }

  // to get cookie values
  getValues() {
    return document.cookie.split(';').map(item => {
      return item.split('=')[1];
    });
  }

  // to get all cookies
  getAll() {
    return document.cookie.split(';');
  }

  // to clear all cookies
  clear() {
    document.cookie = '';
  }
}

export default new Cookie();
