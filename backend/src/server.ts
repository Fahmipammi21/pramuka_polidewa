import app from './app.js';
import { config } from './config/env.js';

app.listen(config.port, () => {
  console.log(`[Pramuka Polidewa API] Server berjalan di http://localhost:${config.port}`);
  console.log(`[Pramuka Polidewa API] Lingkungan: ${config.nodeEnv}`);
});
