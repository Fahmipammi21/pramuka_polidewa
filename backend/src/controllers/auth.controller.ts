import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database.js';
import { config } from '../config/env.js';
import { loginSchema } from '../validators/auth.validator.js';

export const loginAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Username atau password salah',
      });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Username atau password salah',
      });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      config.jwtSecret,
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      message: 'Login berhasil',
      data: {
        token,
        admin: {
          id: admin.id,
          username: admin.username,
          namaLengkap: admin.namaLengkap,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminId = (req as any).user?.id;
    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: 'Akses ditolak. Token tidak valid.',
      });
    }

    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
      select: {
        id: true,
        username: true,
        namaLengkap: true,
        createdAt: true,
      },
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin tidak ditemukan.',
      });
    }

    return res.json({
      success: true,
      data: { admin },
    });
  } catch (error) {
    return next(error);
  }
};
