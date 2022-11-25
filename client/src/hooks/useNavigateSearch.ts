import { useNavigate } from 'react-router-dom';

function useNavigateSearch() {
  const navigate = useNavigate();
  return (pathname: string, params: Dictionary) => {
    const newSearchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      newSearchParams.set(key, value);
    });
    navigate({ pathname, search: newSearchParams.toString() });
    navigate(0);
  };
}

export type Dictionary = {
  [key: string]: string;
};
export default useNavigateSearch;
