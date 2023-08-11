import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export class ProxyMiddleware implements NestMiddleware {
  private targets = {
    users: createProxyMiddleware({
      target: `http://localhost:${process.env.ADMIN_SERVICE_PORT || 3000}`,
      pathRewrite: { '^/v1/gateway-service/users': '/v1/admin-service/users' },
      secure: false,
      onProxyReq: (proxyReq, req, res) => {
        console.log(
          `[NestMiddleware]: Proxying ${req.method} request made to '${req.originalUrl}' to users route...`,
        );
      },
    }),
    tasks: createProxyMiddleware({
      target: `http://localhost:${process.env.ADMIN_SERVICE_PORT || 3000}`,
      pathRewrite: { '^/v1/gateway-service/tasks': '/v1/admin-service/tasks' },
      secure: false,
      onProxyReq: (proxyReq, req, res) => {
        console.log(
          `[NestMiddleware]: Proxying ${req.method} request made to '${req.originalUrl}' to tasks route...`,
        );
      },
    }),
  };

  use(req: Request, res: Response, next: () => void) {
    if (req.originalUrl.includes('users')) {
      this.targets.users(req, res, next);
    } else if (req.originalUrl.includes('tasks')) {
      this.targets.tasks(req, res, next);
    } else {
      next();
    }
  }
}
