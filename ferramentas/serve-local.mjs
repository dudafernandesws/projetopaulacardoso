import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const publicRoot = resolve(projectRoot, 'site/web');
const args = process.argv.slice(2);
const portFlag = args.indexOf('--port');
const portValue = portFlag >= 0 ? args[portFlag + 1] : process.env.PORT || '4173';
const port = Number(portValue);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error(`Porta inválida: ${portValue}`);
  process.exit(1);
}

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.webp': 'image/webp',
};

function sendText(response, status, message) {
  response.writeHead(status, {
    'Cache-Control': 'no-store',
    'Content-Type': 'text/plain; charset=utf-8',
  });
  response.end(message);
}

const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method ?? '')) {
    response.setHeader('Allow', 'GET, HEAD');
    sendText(response, 405, 'Método não permitido.');
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
  } catch {
    sendText(response, 400, 'Endereço inválido.');
    return;
  }

  const relativePath = pathname === '/' ? 'index.html' : `.${pathname}`;
  let filePath = resolve(publicRoot, relativePath);

  if (filePath !== publicRoot && !filePath.startsWith(`${publicRoot}${sep}`)) {
    sendText(response, 403, 'Acesso negado.');
    return;
  }

  try {
    const metadata = await stat(filePath);
    if (metadata.isDirectory()) {
      filePath = resolve(filePath, 'index.html');
    }
    const fileMetadata = await stat(filePath);
    if (!fileMetadata.isFile()) {
      throw new Error('not-file');
    }

    response.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Length': fileMetadata.size,
      'Content-Type': contentTypes[extname(filePath).toLowerCase()] ?? 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
    });

    if (request.method === 'HEAD') {
      response.end();
      return;
    }

    createReadStream(filePath).pipe(response);
  } catch {
    sendText(response, 404, 'Arquivo não encontrado.');
  }
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`A porta ${port} já está em uso. Tente: npm run dev -- --port 8080`);
  } else {
    console.error(`Não foi possível iniciar o servidor: ${error.message}`);
  }
  process.exit(1);
});

server.listen(port, '127.0.0.1', () => {
  console.log('PaulaFoto disponível localmente:');
  console.log(`- Site: http://localhost:${port}/`);
  console.log(`- CRM:  http://localhost:${port}/admin.html`);
  console.log('Pressione Ctrl+C para encerrar.');
});
