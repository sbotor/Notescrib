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
  join: (...segments: string[]) => segments.join('/'),
  joinFromRoot: (...segments: string[]) => `/${segments.join('/')}`
} as const;
