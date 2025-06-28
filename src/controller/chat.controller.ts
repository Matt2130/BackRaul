import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ACCESS_SECRET } from "../utils/token";
import { Message  } from "../models/Chat";
import { User } from "../models/Alumno";

export const chatSend = async (req: Request, res: Response) => {
  const { receptor, mensaje } = req.body;

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado." });
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, ACCESS_SECRET);
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado." });
  }

  const emisor = decoded.matriculaId;

  const receptorExistente = await User.findOne({ matricula: receptor });
  if (!receptorExistente) {
    return res.status(404).json({ message: "El receptor no existe en la base de datos." });
  }

  try {
    const newMessage = new Message({
      emisor,
      receptor,
      mensaje
    });

    await newMessage.save();

    return res.status(201).json({ message: "Mensaje enviado correctamente." });
  } catch (error: any) {
    console.error("Error al enviar mensaje:", error.message);
    return res.status(500).json({ message: "Error al enviar mensaje.", error: error.message });
  }
};

export const getMisMensajes = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado." });
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, ACCESS_SECRET);
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado." });
  }

  const emisor = decoded.matriculaId;

  try {
    const mensajes = await Message.find({ emisor });

    if (mensajes.length === 0) {
      return res.status(404).json({ message: "No se encontraron mensajes enviados." });
    }

    return res.status(200).json(mensajes);
  } catch (error: any) {
    console.error("Error al obtener mensajes:", error.message);
    return res.status(500).json({ message: "Error al obtener mensajes.", error: error.message });
  }
};