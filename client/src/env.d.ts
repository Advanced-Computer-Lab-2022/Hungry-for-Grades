type ImportMetaEnv = {
  // server
  readonly VITE_SERVER_BASE_API_URL: string;
  readonly VITE_SERVER_PORT: string;
  readonly VITE_PAGINATION_LIMIT: number;

  // client
  readonly VITE_APP_AUTHOR: string;
  readonly VITE_APP_TITLE_NAME: string;
  readonly VITE_APP_DESCRIPTION: string;
  readonly VITE_APP_KEYWORDS: string;
  readonly VITE_TEMP_TOKEN: string;
  readonly VITE_STORAGE_KEYS_PREFIX: string;
  readonly VITE_APP_LOGO_URL: string;
  readonly VITE_APP_CLIENT_URL: string;

  // Company
  readonly VITE_COMPANY_NAME: string;
  readonly VITE_COMPANY_ADDRESS: string;
  readonly VITE_COMPANY_PHONE: string;
  readonly VITE_COMPANY_EMAIL: string;
  readonly VITE_COMPANY_WEBSITE: string;
  readonly VITE_COMPANY_FACEBOOK: string;
  readonly VITE_COMPANY_TWITTER: string;
  readonly VITE_COMPANY_INSTAGRAM: string;
  readonly VITE_COMPANY_YOUTUBE: string;
  readonly VITE_COMPANY_LINKEDIN: string;
  readonly VITE_COMPANY_GITHUB: string;
  readonly VITE_COMPANY_GOOGLE_PLAY: string;
  readonly VITE_COMPANY_APP_STORE: string;
  readonly VITE_COMPANY_PHONE: string;
  readonly VITE_COMPANY_END_DATE: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
