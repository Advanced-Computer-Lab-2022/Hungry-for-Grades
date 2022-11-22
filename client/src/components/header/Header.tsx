import { Helmet, HelmetProvider } from 'react-helmet-async';

const helmetContext = {};

function Header() {
  const author = import.meta.env.VITE_APP_AUTHOR;
  const title = import.meta.env.VITE_APP_TITLE_NAME;
  const description = import.meta.env.VITE_APP_DESCRIPTION;
  const keywords = import.meta.env.VITE_APP_KEYWORDS;
	const COMPANY_LOGO = import.meta.env.VITE_APP_LOGO_URL;


  return (
    <HelmetProvider context={helmetContext}>
      <Helmet>
        <meta content={description} name='description' />
        <meta content={author} name='author' />
        <meta content='#000000' name='theme-color' />
        <meta content={keywords} name='keywords' />
				<link href={COMPANY_LOGO} rel="icon" type="image/x-icon"/>

        <title>{title}</title>
      </Helmet>
    </HelmetProvider>
  );
}

export default Header;
