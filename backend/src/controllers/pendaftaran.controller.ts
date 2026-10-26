import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database.js';
import { createPendaftaranSchema } from '../validators/pendaftaran.validator.js';

export const submitPendaftaran = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createPendaftaranSchema.parse(req.body);

    const pendaftaran = await prisma.pendaftaran.create({
      data: {
        namaLengkap: validatedData.namaLengkap,
        nim: validatedData.nim,
        programStudi: validatedData.programStudi,
        angkatan: validatedData.angkatan,
        jenisKelamin: validatedData.jenisKelamin,
        nomorTelepon: validatedData.nomorTelepon,
        email: validatedData.email,
        motivasi: validatedData.motivasi,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Pendaftaran berhasil dikirim. Tim kami akan menghubungi Anda.',
      data: {
        id: pendaftaran.id,
        namaLengkap: pendaftaran.namaLengkap,
        createdAt: pendaftaran.createdAt,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const getPendaftaranList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const status = req.query.status as string | undefined;
    const search = req.query.search as string | undefined;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { namaLengkap: { contains: search } },
        { nim: { contains: search } },
        { programStudi: { contains: search } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.pendaftaran.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.pendaftaran.count({ where }),
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
    return next(error);
  }
};

export const updatePendaftaranStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { status } = req.body;

    if (!['baru', 'terverifikasi', 'ditolak'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status harus salah satu dari: baru, terverifikasi, ditolak',
      });
    }

    const updated = await prisma.pendaftaran.update({
      where: { id },
      data: { status },
    });

    return res.json({
      success: true,
      message: 'Status pendaftaran berhasil diperbarui',
      data: updated,
    });
  } catch (error) {
    return next(error);
  }
};

export const getDashboardStats = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const [totalPendaftaran, pendingPendaftaran, totalBerita, totalPengurus] = await Promise.all([
      prisma.pendaftaran.count(),
      prisma.pendaftaran.count({ where: { status: 'baru' } }),
      prisma.berita.count(),
      prisma.pengurus.count(),
    ]);

    return res.json({
      success: true,
      data: {
        pab: {
          total: totalPendaftaran,
          pending: pendingPendaftaran,
          verified: totalPendaftaran - pendingPendaftaran,
        },
        anggotaAktif: {
          total: totalPengurus || 48,
          putra: 26,
          putri: 22,
        },
        wartaBerita: {
          total: totalBerita || 24,
          draft: 2,
        },
        inventaris: {
          total: 142,
          siapPakaiPercent: 98,
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};
