import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface EnquiryRecord {
  id: string;
  name: string;
  phone: string;
  branch: string;
  goal: string;
  message: string;
  createdAt: string;
}

const DATA_DIR = path.join(__dirname, 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

function readEnquiries(): EnquiryRecord[] {
  try {
    if (!fs.existsSync(ENQUIRIES_FILE)) {
      return [];
    }
    const raw = fs.readFileSync(ENQUIRIES_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveEnquiries(enquiries: EnquiryRecord[]): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(enquiries, null, 2), 'utf-8');
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    const enquiries = readEnquiries();
    res.json({
      status: 'ok',
      service: 'XFITNESS Backend API',
      branches: ['Branch 01 - Saibrakatte', 'Branch 02 - Kokkarne'],
      totalEnquiries: enquiries.length,
      timestamp: new Date().toISOString(),
    });
  });

  // Get all enquiries
  app.get('/api/enquiries', (_req, res) => {
    const enquiries = readEnquiries();
    res.json({ enquiries });
  });

  // Submit a new membership / coaching enquiry
  app.post('/api/enquiries', (req, res) => {
    const { name, phone, branch, goal, message } = req.body || {};

    if (!name || typeof name !== 'string' || !name.trim()) {
      res.status(400).json({ error: 'Please enter your full name.' });
      return;
    }

    if (!phone || typeof phone !== 'string' || phone.trim().replace(/\D/g, '').length < 10) {
      res.status(400).json({ error: 'Please enter a valid 10-digit phone number.' });
      return;
    }

    const enquiries = readEnquiries();
    const newRecord: EnquiryRecord = {
      id: `XF-${Date.now().toString().slice(-6)}`,
      name: name.trim(),
      phone: phone.trim(),
      branch: (branch || 'Branch 01 - Saibrakatte').trim(),
      goal: (goal || 'Gym Membership').trim(),
      message: typeof message === 'string' ? message.trim() : '',
      createdAt: new Date().toISOString(),
    };

    enquiries.unshift(newRecord);
    saveEnquiries(enquiries);

    res.status(201).json({
      success: true,
      message: `Thank you ${newRecord.name}! Your enquiry (${newRecord.id}) for ${newRecord.branch} has been saved.`,
      enquiry: newRecord,
    });
  });

  // Vite middleware for development vs static dist for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`XFITNESS server running on http://localhost:${PORT}`);
  });
}

startServer();
