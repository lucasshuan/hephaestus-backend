export type GoogleOAuthUser = {
  provider: 'google';
  providerAccountId: string;
  email: string;
  name?: string;
  image?: string;
};
