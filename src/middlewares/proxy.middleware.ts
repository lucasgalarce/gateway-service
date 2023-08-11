import { Injectable, NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Request, Response } from 'express';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    // Decidir a qué servicio reenviar en base a la ruta o cualquier otra lógica
    if (req.baseUrl.includes('admin')) {
      // Enrutar al microservicio administrador
      const proxy = createProxyMiddleware({
        target: 'http://admin-service-url:port', // Dirección del microservicio administrador
        changeOrigin: true,
      });
      proxy(req, res, next);
    } else {
      // Si no es para admin-service, simplemente continúa (o añade más lógica para otros servicios)
      next();
    }
  }
}
