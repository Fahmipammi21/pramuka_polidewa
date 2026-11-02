import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database.js';
import { config } from '../config/env.js';
import fs from 'fs';
import path from 'path';

const uploadDir = path.resolve(config.uploadDir || './uploads');

export const getBeritaList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const kategori = req.query.kategori as string | undefined;
    const includeDraft = req.query.all === 'true';
    const skip = (page - 1) * limit;

    const where: any = {};
    if (!includeDraft) {
      where.status = 'published';
    }
    if (kategori && kategori !== 'Semua') {
      where.kategori = kategori;
    }

    const [items, total] = await Promise.all([
      prisma.berita.findMany({
        where,
        skip,
        take: limit,
        orderBy: { tanggalPublish: 'desc' },
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
    return res.status(200).json({
      success: true,
      data: [],
      meta: { page: 1, limit: 10, total: 0, totalPages: 0 },
      note: 'Database belum terhubung atau error.'
    });
  }
};

export const getBeritaByIdOrSlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { identifier } = req.params;
    const numId = parseInt(identifier);

    let berita = null;
    if (!isNaN(numId)) {
      berita = await prisma.berita.findUnique({
        where: { id: numId },
      });
    }

    if (!berita) {
      berita = await prisma.berita.findUnique({
        where: { slug: identifier },
      });
    }

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

export const createBerita = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      judul,
      slug,
      kategori,
      deskripsi,
      ringkasan,
      konten,
      gambarUtama,
      fotoKegiatan,
      captionGambar,
      penulis,
      status,
      tanggalPublish,
      tanggal,
    } = req.body;

    if (!judul || (!konten && !deskripsi)) {
      return res.status(400).json({
        success: false,
        message: 'Judul dan deskripsi kegiatan wajib diisi',
      });
    }

    const finalDeskripsi = konten || deskripsi || '';
    const finalRingkasan = ringkasan || (finalDeskripsi.length > 180 ? finalDeskripsi.slice(0, 180) + '...' : finalDeskripsi);
    const finalFoto = fotoKegiatan || gambarUtama || '/images/berita/hero-lkpm-photo.jpg';

    let finalSlug = slug || judul
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const existing = await prisma.berita.findUnique({
      where: { slug: finalSlug },
    });

    if (existing) {
      finalSlug = `${finalSlug}-${Date.now()}`;
    }

    let parsedDate = new Date();
    const rawDate = tanggalPublish || tanggal;
    if (rawDate) {
      const parsed = new Date(rawDate);
      if (!isNaN(parsed.getTime())) {
        parsedDate = parsed;
      }
    }

    const berita = await prisma.berita.create({
      data: {
        judul,
        slug: finalSlug,
        kategori: kategori || 'Kegiatan Racana',
        ringkasan: finalRingkasan,
        konten: finalDeskripsi,
        gambarUtama: finalFoto,
        captionGambar: captionGambar || `Dokumentasi: ${judul}`,
        penulis: penulis || 'Admin Racana',
        status: status || 'published',
        tanggalPublish: parsedDate,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Berita kegiatan berhasil ditambahkan',
      data: berita,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateBerita = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'ID berita tidak valid' });
    }

    const {
      judul,
      slug,
      kategori,
      deskripsi,
      ringkasan,
      konten,
      gambarUtama,
      fotoKegiatan,
      captionGambar,
      penulis,
      status,
      tanggalPublish,
      tanggal,
    } = req.body;

    const existing = await prisma.berita.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' });
    }

    const finalDeskripsi = konten ?? deskripsi ?? existing.konten;
    const finalRingkasan = ringkasan ?? (finalDeskripsi ? (finalDeskripsi.length > 180 ? finalDeskripsi.slice(0, 180) + '...' : finalDeskripsi) : existing.ringkasan);
    const finalFoto = fotoKegiatan ?? gambarUtama ?? existing.gambarUtama;

    let parsedDate = existing.tanggalPublish;
    const rawDate = tanggalPublish ?? tanggal;
    if (rawDate) {
      const parsed = new Date(rawDate);
      if (!isNaN(parsed.getTime())) {
        parsedDate = parsed;
      }
    }

    const updated = await prisma.berita.update({
      where: { id },
      data: {
        judul: judul ?? existing.judul,
        slug: slug ?? existing.slug,
        kategori: kategori ?? existing.kategori,
        konten: finalDeskripsi,
        ringkasan: finalRingkasan,
        gambarUtama: finalFoto,
        captionGambar: captionGambar ?? existing.captionGambar,
        penulis: penulis ?? existing.penulis,
        status: status ?? existing.status,
        tanggalPublish: parsedDate,
      },
    });

    return res.json({
      success: true,
      message: 'Berita kegiatan berhasil diperbarui',
      data: updated,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteBerita = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'ID berita tidak valid' });
    }

    const existing = await prisma.berita.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' });
    }

    await prisma.berita.delete({ where: { id } });

    return res.json({
      success: true,
      message: 'Berita kegiatan berhasil dihapus',
    });
  } catch (error) {
    return next(error);
  }
};

export const uploadFotoKegiatan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { imageBase64, filename } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ success: false, message: 'Data gambar wajib diisi' });
    }

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Match data:image/png;base64,...
    const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let buffer: Buffer;
    let ext = 'jpg';

    if (matches && matches.length === 3) {
      const mime = matches[1];
      if (mime.includes('png')) ext = 'png';
      else if (mime.includes('webp')) ext = 'webp';
      else if (mime.includes('gif')) ext = 'gif';
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(imageBase64, 'base64');
    }

    const safeName = `kegiatan-${Date.now()}-${Math.round(Math.random() * 1e4)}.${ext}`;
    const filePath = path.join(uploadDir, safeName);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `http://localhost:3000/uploads/${safeName}`;

    return res.json({
      success: true,
      message: 'Foto kegiatan berhasil diunggah',
      data: {
        url: publicUrl,
        filename: safeName,
      },
    });
  } catch (error) {
    return next(error);
  }
};
