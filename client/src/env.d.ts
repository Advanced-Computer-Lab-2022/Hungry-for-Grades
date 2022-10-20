type ImportMetaEnv = {
  // server
  readonly VITE_SERVER_BASE_API_URL: string;
  readonly VITE_SERVER_PORT: string;

  // client
  readonly VITE_APP_AUTHOR: string;
  readonly VITE_APP_TITLE_NAME: string;
  readonly VITE_APP_DESCRIPTION: string;
  readonly VITE_APP_KEYWORDS: string;
  readonly VITE_TEMP_TOKEN: string;
  readonly VITE_STORAGE_KEYS_PREFIX: string;
};

type ImportMeta = {
  readonly env: ImportMetaEnv;
};
