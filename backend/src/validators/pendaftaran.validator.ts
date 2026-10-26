import { z } from 'zod';

export const createPendaftaranSchema = z.object({
  namaLengkap: z.string().min(3, 'Nama lengkap minimal 3 karakter').max(100),
  nim: z.string().min(5, 'NIM minimal 5 karakter').max(20),
  programStudi: z.string().min(2, 'Program studi harus dipilih').max(100),
  angkatan: z.string().min(4, 'Angkatan harus diisi').max(10),
  jenisKelamin: z.enum(['Laki-laki', 'Perempuan'], {
    errorMap: () => ({ message: 'Jenis kelamin harus Laki-laki atau Perempuan' }),
  }),
  nomorTelepon: z.string().min(10, 'Nomor WhatsApp/telepon minimal 10 digit').max(20),
  email: z.string().email('Format email tidak valid').max(100),
  motivasi: z.string().optional(),
});
