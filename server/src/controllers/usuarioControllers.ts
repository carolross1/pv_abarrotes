// userController.ts

import { Request, Response } from 'express';
import pool from '../database'; 

// Crear un nuevo usuario
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { id_Usuario, nombre, apellido, telefono, email, contrasena, tipo_Usuario } = req.body;
  try {
    await pool.query(
      'INSERT INTO usuario (id_Usuario, nombre, apellido, telefono, email, contrasena, tipo_Usuario) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id_Usuario, nombre, apellido, telefono, email, contrasena, tipo_Usuario]
    );
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      if (error.sqlMessage.includes('email')) {
        res.status(400).json({ message: '**El correo electrónico ya está en uso**' });
      } else if (error.sqlMessage.includes('telefono')) {
        res.status(400).json({ message: '**El número de teléfono ya está en uso**' });
      } else {
        res.status(400).json({ message: '**El ID de usuario ya está en uso**' });
      }
    } else {
      res.status(500).json({ message: '**Error al crear el usuario**', error });
    }
  }
};


// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios =await pool.query('SELECT * FROM usuario');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

// Obtener un usuario por ID
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const usuarios = await pool.query('SELECT * FROM usuario WHERE id_Usuario = ?', [id]);
    if (usuarios.length > 0) {
      res.json(usuarios[0]);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

// Actualizar un usuario
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id_Usuario } = req.params;
  const { nombre, apellido, telefono, email, contrasena, tipo_Usuario } = req.body;
  try {
    const result = await pool.query(
      'UPDATE usuario SET nombre = ?, apellido = ?, telefono = ?, email = ?, contrasena = ?, tipo_Usuario = ? WHERE id_Usuario = ?',
      [nombre, apellido, telefono, email, contrasena, tipo_Usuario, id_Usuario]
    );
    if (result.affectedRows > 0) {
      res.json({ message: 'Usuario actualizado exitosamente' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      if (error.sqlMessage.includes('email')) {
        res.status(400).json({ message: 'El correo electrónico ya está en uso' });
      } else if (error.sqlMessage.includes('telefono')) {
        res.status(400).json({ message: 'El número de teléfono ya está en uso' });
      } else {
        res.status(400).json({ message: 'Error de duplicación de entrada' });
      }
    } else {
      res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
  }
};
// Eliminar un usuario
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM usuario WHERE id_Usuario = ?', [id]);
    if (result.affectedRows > 0) {
      res.json({ message: 'Usuario eliminado exitosamente' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};