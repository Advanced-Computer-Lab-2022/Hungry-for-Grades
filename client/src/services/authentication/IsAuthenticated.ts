/* import JWTPars from './JWTPars';
export default function isAuthenticated() {
  /// This is a helper function that returns true if the user is authenticated.
  let exp;
  const token = localStorage.getItem('token');
  if (token) {
    exp = localStorage.getItem('token') ? JWTPars(token).exp : null;
    const excludedRoutes = [
      '/NotFound',
      '/auth/login',
      '/auth/logout',
      '/auth/register/',
      '/auth/forgot-password',
      '/auth/reset-password'
    ];
    if (
      Date.now() >= exp * 1000 &&
      !excludedRoutes.includes(window.location.pathname)
    ) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
  } else {
  }
}
 */
