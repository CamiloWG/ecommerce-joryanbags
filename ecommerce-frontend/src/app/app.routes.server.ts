import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'producto/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'catalogo',
    renderMode: RenderMode.Server
  },
  {
    path: 'admin',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
