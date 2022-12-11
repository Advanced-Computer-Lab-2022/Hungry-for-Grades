import LocalStorage from '../localStorage/LocalStorage';
import SessionStorage from '../sessionStorage/SessionStorage';

export function removeInfo() {
  LocalStorage.remove('token');
  LocalStorage.remove('role');
  LocalStorage.remove('user');
  SessionStorage.remove('cart');
  SessionStorage.remove('wishlist');
  SessionStorage.remove('user');
  SessionStorage.remove('accessToken');
  LocalStorage.remove('refreshToken');
  LocalStorage.remove('role');
  document.cookie = '';
}
