import { useNavigate } from 'react-router-dom';

export default function useRedirectToLogin() {
  const navigate = useNavigate();
  return () => navigate('/auth/login');
}
