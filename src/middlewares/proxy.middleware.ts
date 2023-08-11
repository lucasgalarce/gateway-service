import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export class ProxyMiddleware implements NestMiddleware {
  private proxy = createProxyMiddleware({
    target: `http://localhost:3000`,
    pathRewrite: { '^/v1/gateway-service/users': '/v1/admin-service/users' },
    secure: false,
    onProxyReq: (proxyReq, req, res) => {
      console.log(
        `[NestMiddleware]: Proxying ${req.method} request originally made to '${req.originalUrl}'...`,
      );
    },
  });

  use(req: Request, res: Response, next: () => void) {
    this.proxy(req, res, next);
  }
}
