import { OAuth2Client } from 'google-auth-library';
import { Request, Response } from 'express';
import { User } from '../models/Alumno';
import { generateAccessToken } from '../utils/token';
import { cache } from '../utils/cache';
import axios from 'axios';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const loginWithGoogle = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    let payload: any;

    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch (idTokenError) {
      const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`);
      payload = userInfo.data;
    }

    if (!payload || !payload.email) {
      return res.status(400).json({ message: 'Token inválido' });
    }

    const email: string = payload.email;

    // 2. Validar dominio utd.edu.mx
    if (!email.endsWith('@utd.edu.mx')) {
      return res.status(403).json({ message: 'Solo se permiten correos institucionales utd.edu.mx' });
    }

    // 3. Extraer matrícula del correo
    const match = email.match(/_(\d{10})@utd\.edu\.mx$/);
    if (!match || !match[1]) {
      return res.status(400).json({ message: 'No se pudo extraer la matrícula del correo' });
    }
    const matriculaNumber = parseInt(match[1]);

    // 4. Buscar usuario o crearlo
    let user = await User.findOne({ email });

    if (!user) {
      const names = payload.given_name || 'Nombre';
      const lastName = payload.family_name || 'Apellido';

      user = new User({
        email,
        matricula: matriculaNumber,
        names,
        middleName: '-',
        lastName,
        password: '-',
        status: true,
      });

      try {
        await user.save();
      } catch (saveError) {
        console.error("Error al guardar usuario:", saveError);
        return res.status(400).json({
          message: 'Error al crear usuario',
          details: (saveError as any)?.errors
        });
      }
    }

    const accessToken = generateAccessToken(user.matricula.toString());
    cache.set(String(user.matricula), accessToken, 60 * 15);

    return res.status(200).json({
      message: 'Inicio de sesión con Google exitoso',
      token: accessToken,
      user: {
        email: user.email,
        matricula: user.matricula,
        names: user.names,
        lastName: user.lastName,
      }
    });

  } catch (error) {
    console.error("Error general en autenticación:", error);
    return res.status(500).json({
      message: 'Error en inicio de sesión con Google',
      error: (error instanceof Error ? error.message : String(error))
    });
  }
};
