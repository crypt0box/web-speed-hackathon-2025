//import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

import fastifyStatic from '@fastify/static';
//import { StoreProvider } from '@wsh-2025/client/src/app/StoreContext';
//import { createRoutes } from '@wsh-2025/client/src/app/createRoutes';
//import { createStore } from '@wsh-2025/client/src/app/createStore';
import type { FastifyInstance } from 'fastify';
//import { createStandardRequest } from 'fastify-standard-request-reply';
//import htmlescape from 'htmlescape';
//import { StrictMode } from 'react';
//import { renderToString } from 'react-dom/server';
//import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router';

//function getFiles(parent: string): string[] {
//  const dirents = readdirSync(parent, { withFileTypes: true });
//  return dirents
//    .filter((dirent) => dirent.isFile() && !dirent.name.startsWith('.'))
//    .map((dirent) => path.join(parent, dirent.name));
//}

//function getFilePaths(relativePath: string, rootDir: string): string[] {
//  const files = getFiles(path.resolve(rootDir, relativePath));
//  return files.map((file) => path.join('/', path.relative(rootDir, file)));
//}

export function registerSsr(app: FastifyInstance): void {
  app.register(fastifyStatic, {
    prefix: '/public/',
    root: [
      path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../client/dist'),
      path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../public'),
    ],
  });

  app.get('/favicon.ico', (_, reply) => {
    reply.status(404).send();
  });

  app.get('/*', async (req, reply) => {
    //// @ts-expect-error ................
    //const request = createStandardRequest(req, reply);

    //const store = createStore({});
    //const handler = createStaticHandler(createRoutes(store));
    //const context = await handler.query(request);

    //if (context instanceof Response) {
    //  return reply.send(context);
    //}

    //const router = createStaticRouter(handler.dataRoutes, context);
    //renderToString(
    //  <StrictMode>
    //    <StoreProvider createStore={() => store}>
    //      <StaticRouterProvider context={context} hydrate={false} router={router} />
    //    </StoreProvider>
    //  </StrictMode>,
    //);

    const indexHtml = await fs.promises.readFile(path.resolve(__dirname, '../../client/dist/index.html'), 'utf-8');
    reply.type('text/html').send(indexHtml);
  });
}

//${imagePaths.map((imagePath) => `<link as="image" href="${imagePath}" rel="preload" />`).join('\n')}
//<script>
//  window.__staticRouterHydrationData = ${htmlescape({
//    actionData: context.actionData,
//    loaderData: context.loaderData,
//  })};
//</script>
