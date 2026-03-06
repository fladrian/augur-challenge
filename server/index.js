import express from 'express';
import cors from 'cors';
import { generateIndicators } from './data.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Logging for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Fixed dataset
const indicators = generateIndicators(500);

const router = express.Router();

router.get('/indicators', (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
  const severity = req.query.severity?.toLowerCase();
  const type = req.query.type?.toLowerCase();
  const source = req.query.source?.toLowerCase();
  const search = req.query.search?.toLowerCase();

  let filtered = [...indicators];

  if (severity && ['critical', 'high', 'medium', 'low'].includes(severity)) {
    filtered = filtered.filter((i) => i.severity === severity);
  }

  if (type && ['ip', 'domain', 'hash', 'url'].includes(type)) {
    filtered = filtered.filter((i) => i.type === type);
  }

  if (source && source !== 'all') {
    filtered = filtered.filter((i) => i.source.toLowerCase().trim() === source.toLowerCase().trim());
  }

  if (search) {
    filtered = filtered.filter(
      (i) =>
        i.value.toLowerCase().includes(search) ||
        i.source.toLowerCase().includes(search) ||
        i.tags.some((t) => t.toLowerCase().includes(search))
    );
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  const delay = 200 + Math.random() * 400;
  setTimeout(() => {
    res.json({ data, total, page, totalPages });
  }, delay);
});

router.get('/indicators/:id', (req, res) => {
  const indicator = indicators.find((i) => i.id === req.params.id);
  if (!indicator) {
    return res.status(404).json({ error: 'Indicator not found', id: req.params.id });
  }
  const delay = 100 + Math.random() * 200;
  setTimeout(() => {
    res.json(indicator);
  }, delay);
});

router.get('/stats', (_req, res) => {
  const stats = {
    total: indicators.length,
    critical: indicators.filter((i) => i.severity === 'critical').length,
    high: indicators.filter((i) => i.severity === 'high').length,
    medium: indicators.filter((i) => i.severity === 'medium').length,
    low: indicators.filter((i) => i.severity === 'low').length,
    byType: {
      ip: indicators.filter((i) => i.type === 'ip').length,
      domain: indicators.filter((i) => i.type === 'domain').length,
      hash: indicators.filter((i) => i.type === 'hash').length,
      url: indicators.filter((i) => i.type === 'url').length,
    },
  };
  res.json(stats);
});

app.use('/api', router);
app.use('/', router);

// Catch-all
app.use((req, res) => {
  console.warn(`404 NOT FOUND: ${req.method} ${req.url}`);
  res.status(404).json({ error: 'Not Found', path: req.url });
});

if (process.env.NODE_ENV !== 'production' && import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`\n  🛡  Mock Threat Intel API running at http://localhost:${PORT}`);
  });
}

export { app };
export default app;
