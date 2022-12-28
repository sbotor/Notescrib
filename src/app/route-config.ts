export const routeConfig = {
  root: {
    home: '',
  },
  auth: {
    prefix: 'auth',
    login: 'login',
    resetPassword: 'password',
    activate: 'activate',
    forgotPassword: 'forgot-password'
  },
  workspaces: {
    prefix: 'workspace',
    browse: 'browse',
    search: 'search'
  },
  notes: {
    prefix: 'note',
    editor: ':id',
  },
  templates: {
    prefix: 'templates',
    search: 'search',
    editor: ':id'
  },
  users: {
    prefix: 'user'
  },
  join: (...segments: string[]) => segments.join('/'),
  joinFromRoot: (...segments: string[]) => `/${segments.join('/')}`
} as const;
