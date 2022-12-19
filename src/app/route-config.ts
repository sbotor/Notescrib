export const routeConfig = {
  root: {
    home: '',
    login: 'login',
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
