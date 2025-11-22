require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const { nanoid } = require('nanoid'); // Using nanoid v3 for CommonJS support
const validator = require('validator');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Database Connection
// Note: rejectUnauthorized: false is often required for hosted Postgres on Render/Neon
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// --- HELPER FUNCTIONS ---

// Validate Custom Code Regex: [A-Za-z0-9]{6,8}
const isValidShortCode = (code) => {
    const regex = /^[A-Za-z0-9]{6,8}$/;
    return regex.test(code);
};

// --- API ROUTES ---

// 1. Health Check (Required by Assignment)
// GET /healthz
app.get('/healthz', (req, res) => {
    res.status(200).json({ ok: true, version: "1.0" });
});

// 2. Create Link
// POST /api/links
app.post('/api/links', async (req, res) => {
    const { url, shortCode } = req.body;

    // Validate URL
    if (!url || !validator.isURL(url, { require_protocol: true })) {
        return res.status(400).json({ error: 'Invalid or missing URL (must include http:// or https://)' });
    }

    let code = shortCode;

    // If custom code provided, validate format
    if (code) {
        if (!isValidShortCode(code)) {
            return res.status(400).json({ error: 'Short code must be alphanumeric and 6-8 characters long.' });
        }
    } else {
        // Generate random 6-char code if none provided
        code = nanoid(6);
    }

    try {
        // Check if code exists (to ensure global uniqueness)
        const existing = await pool.query('SELECT id FROM links WHERE short_code = $1', [code]);
        
        if (existing.rows.length > 0) {
            // Assignment Requirement: Return 409 if code exists
            return res.status(409).json({ error: 'Short code already exists.' });
        }

        // Insert into DB
        const result = await pool.query(
            'INSERT INTO links (original_url, short_code) VALUES ($1, $2) RETURNING *',
            [url, code]
        );

        // Return created object
        res.status(201).json(result.rows[0]);

    } catch (err) {
        console.error('Error creating link:', err);
        // Handle duplicate key error if race condition occurs
        if (err.code === '23505') {
            return res.status(409).json({ error: 'Short code already exists.' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 3. List All Links (Dashboard)
// GET /api/links
app.get('/api/links', async (req, res) => {
    try {
        // Order by created_at descending (newest first)
        const result = await pool.query('SELECT * FROM links ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 4. Get Link Stats
// GET /api/links/:code
app.get('/api/links/:code', async (req, res) => {
    const { code } = req.params;
    try {
        const result = await pool.query('SELECT * FROM links WHERE short_code = $1', [code]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Link not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 5. Delete Link
// DELETE /api/links/:code
app.delete('/api/links/:code', async (req, res) => {
    const { code } = req.params;
    try {
        const result = await pool.query('DELETE FROM links WHERE short_code = $1 RETURNING id', [code]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Link not found' });
        }

        // Assignment Requirement: 204 No Content (or 200)
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 6. Redirect (Core Feature)
// GET /:code
app.get('/:code', async (req, res) => {
    const { code } = req.params;

    try {
        // Find URL
        const result = await pool.query('SELECT original_url FROM links WHERE short_code = $1', [code]);

        if (result.rows.length > 0) {
            const originalUrl = result.rows[0].original_url;

            // Async fire-and-forget update for stats (doesn't block redirect)
            pool.query(
                'UPDATE links SET clicks = clicks + 1, last_clicked_at = NOW() WHERE short_code = $1',
                [code]
            ).catch(err => console.error('Error updating stats:', err));

            return res.redirect(originalUrl);
        } else {
            return res.status(404).send('<h1>404 - Link Not Found</h1>');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`TinyLink Backend running on port ${PORT}`);
});