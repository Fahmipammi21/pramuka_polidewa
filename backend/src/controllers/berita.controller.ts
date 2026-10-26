import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database.js';

export const getBeritaList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const kategori = req.query.kategori as string | undefined;
    const skip = (page - 1) * limit;

    const where = {
      status: 'published',
      ...(kategori && { kategori }),
    };

    const [items, total] = await Promise.all([
      prisma.berita.findMany({
        where,
        skip,
        take: limit,
        orderBy: { tanggalPublish: 'desc' },
        select: {
          id: true,
          judul: true,
          slug: true,
          kategori: true,
          ringkasan: true,
          gambarUtama: true,
          penulis: true,
          tanggalPublish: true,
        },
      }),
      prisma.berita.count({ where }),
    ]);

    return res.json({
      success: true,
      data: items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    // Graceful fallback if database is not yet connected/migrated
    return res.status(200).json({
      success: true,
      data: [],
      meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
      note: 'Database belum terhubung atau belum dimigrasi. Menampilkan data kosong.'
    });
  }
};

export const getBeritaBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params;
    const berita = await prisma.berita.findUnique({
      where: { slug },
    });

    if (!berita) {
      return res.status(404).json({
        success: false,
        message: 'Berita tidak ditemukan',
      });
    }

    return res.json({
      success: true,
      data: berita,
    });
  } catch (error) {
    return next(error);
  }
};
