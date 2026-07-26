export const environment = {
  production: false,
  apiBaseUrl: 'https://localhost:7046/api',
  azureAd: {
    clientId: '5be7152a-bb06-4205-8b5c-f8707ef519af',
    authority: 'https://login.microsoftonline.com/30d9c07c-c053-4d81-a916-0c0529086ac5',
    redirectUri: 'http://localhost:4200',
    apiScope: 'api://6324ef59-3bcd-4e56-ad1d-e5e9ed698166/access_as_user'
  }
};
