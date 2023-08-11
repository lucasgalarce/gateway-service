import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET', // Nuevamente, no hardcodees esto
    });
  }

  async validate(payload: any) {
    // Aquí puedes agregar lógica adicional de validación si es necesario
    // Por ejemplo, podrías verificar si el usuario en el payload aún existe en la base de datos

    return payload; // Si todo va bien, devuelve el payload o parte de él
  }
}
