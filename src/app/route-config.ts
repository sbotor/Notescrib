export const routeConfig = {
  root: {
    home: '',
  },
  auth: {
    prefix: 'auth',
    login: 'login',
    confirmEmail: 'confirm'
  },
  workspaces: {
    prefix: 'workspace',
    browse: 'browse',
  },
  notes: {
    prefix: 'note',
    editor: ':id',
  },
  join: (...segments: string[]) => segments.join('/'),
  joinFromRoot: (...segments: string[]) => `/${segments.join('/')}`
};
