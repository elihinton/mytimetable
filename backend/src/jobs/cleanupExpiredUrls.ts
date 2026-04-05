import cron from 'node-cron';
import { removeExpiredLinks } from '../controllers/share.js';

// removes expired links everyday at midnight
const startCleanupExpiredLinksJob = () => {
  cron.schedule('0 0 * * *', async () => {
    const result = await removeExpiredLinks();
    if (!result) console.log(`Failed to remove expired links ${new Date().toISOString()}`);
  })
}

export default startCleanupExpiredLinksJob;