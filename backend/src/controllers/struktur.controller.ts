import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database.js';

export const getStrukturAktif = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const periodeAktif = await prisma.periodeKepengurusan.findFirst({
      where: { isAktif: true },
      include: {
        pembina: { orderBy: { urutan: 'asc' } },
        pengurus: { orderBy: { urutan: 'asc' } },
        divisi: {
          orderBy: { urutan: 'asc' },
          include: {
            anggota: { orderBy: { urutan: 'asc' } },
            fokusTugas: { orderBy: { urutan: 'asc' } },
          },
        },
      },
    });

    if (!periodeAktif) {
      return res.json({
        success: true,
        data: null,
        message: 'Belum ada data periode kepengurusan aktif',
      });
    }

    return res.json({
      success: true,
      data: periodeAktif,
    });
  } catch (error) {
    // Graceful fallback if database is not yet ready
    return res.status(200).json({
      success: true,
      data: null,
      note: 'Database belum terhubung atau belum dimigrasi.',
    });
  }
};
