import { z } from 'zod';

export const createBeritaSchema = z.object({
  judul: z.string().min(5, 'Judul minimal 5 karakter').max(255),
  kategori: z.string().max(100).optional(),
  ringkasan: z.string().optional(),
  konten: z.string().min(20, 'Konten berita minimal 20 karakter'),
  gambarUtama: z.string().url().or(z.string()).optional(),
  captionGambar: z.string().max(255).optional(),
  status: z.enum(['draft', 'published']).default('draft'),
});
