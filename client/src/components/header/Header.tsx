import { Helmet } from 'react-helmet';

function Header() {
  const author = import.meta.env.VITE_APP_AUTHOR;
  const title = import.meta.env.VITE_APP_TITLE_NAME;
  const description = import.meta.env.VITE_APP_DESCRIPTION;
  const keywords = import.meta.env.VITE_APP_KEYWORDS;

  return (
    <Helmet>
      <meta content={description} name='description' />
      <meta content={author} name='author' />
      <meta content='#000000' name='theme-color' />
      <meta content={keywords} name='keywords' />
      <title>{title}</title>
    </Helmet>
  );
}

export default Header;
