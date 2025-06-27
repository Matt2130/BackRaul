import { Request, Response } from 'express';
import { User } from "../models/Alumno";
import { generateAccessToken } from '../utils/token';
import { cache } from '../utils/cache';
import { verifyCaptcha } from './verifyCaptcha.controller';
import bcrypt from "bcrypt";

export const loginAlumnos = async (req: Request, res: Response) => {
  try {
    const { matricula, password, captcha } = req.body;

    if (!captcha) {
      return res.status(400).json({ message: "Falta el token de reCAPTCHA" });
    }

    const isHuman = await verifyCaptcha(captcha);
    if (!isHuman) {
      return res.status(403).json({ message: "reCAPTCHA inválido. Verifica que no eres un robot." });
    }

    const user = await User.findOne({ matricula });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const accessToken = generateAccessToken(matricula.toString());

    cache.set(matricula, accessToken, 60 * 15);
    return res.status(200).json({ message: "Inicio de sesión exitoso", token: accessToken });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al logear usuario" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, matricula, confirmPassword, names, middleName, lastName, status } = req.body;

    if (!email || !password || !confirmPassword || !names || !middleName || !lastName) {
      return res.status(400).json({ message: "Todos los campos obligatorios deben ser proporcionados." });
    }

    const emailRegex = /^[^\s@]+@utd\.edu\.mx$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "El correo electrónico debe pertenecer al dominio @utd.edu.mx." });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres." });
    }

    if (matricula.toString().length !== 10) {
      return res.status(400).json({ message: "La matrícula debe tener solo 10 caracteres." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden." });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { matricula }] });
    if (existingUser) {
      return res.status(409).json({ message: "El correo o matrícula ya están registrados." });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      names,
      middleName,
      lastName,
      email,
      matricula,
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    const accessToken = generateAccessToken(matricula.toString());
    cache.set(matricula.toString(), accessToken, 60 * 15);

    return res.status(201).json({ message: "Usuario creado correctamente", user: savedUser, accessToken });

  } catch (error: any) {
    console.error("Error al crear usuario:", error.message);
    return res.status(500).json({
      message: "Error interno al crear usuario.",
      error: error.message
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const userList = await User.find({ status: true });
    return res.status(200).json({ userList });
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

export const getUserByMatricula = async (req: Request, res: Response) => {
    try {
        const { matricula } = req.params;
        const userMatricula = await User.findOne({ matricula }); // Mi función para buscar por email

        if (!userMatricula) {
            return res.status(404).json({ message: "Usuario no encontrado", userMatricula });
        }

        return res.status(200).json({ userMatricula });// Si se encuentra, devolverlo

    } catch (error) {
        return res.status(500).json({ message: "Error al buscar usuario", error });
    }
};

export const deleteUser = async (req:Request, res:Response) => {
  try {
    const { matricula } = req.params;
    
    const user = await User.findById(matricula);
    if (!user){
      return res.status(404).json({ message: "Usuario no existe" });
    }

    user.status = false;

    const deleteUser = await user.save();
    return res.status(201).json({ mesagge:"Usuario dado de baja con exitó", deleteUser });
  
  } catch (error) {
      return res.status(500).json({ message: "Error al querer dar de baja al usuario", error });
  }
};