// Meta Conversions API (server side) for the ad funnel pages (12 Nov 2026).
// The browser pixel sends the same event with the same event_id, so Meta counts it once.
// Needs Vercel env vars: META_PIXEL_ID and META_CAPI_TOKEN (token from Events Manager, dataset Settings,
// "Generate access token"). Optional: META_TEST_EVENT_CODE (shows events in Test events), META_GRAPH_VERSION.
// With no token set it does nothing and answers 204, so the pages work before Meta is set up.
import crypto from 'node:crypto';

const ALLOWED_EVENTS = new Set(['Lead', 'Schedule']);
const ALLOWED_HOSTS = new Set(['www.presciaiq.com.au']);

const sha = (v) => crypto.createHash('sha256').update(v).digest('hex');
const clean = (v) => (typeof v === 'string' ? v.trim().toLowerCase() : '');

function phoneE164Digits(raw) {
  let d = String(raw || '').replace(/\D/g, '');
  if (!d) return '';
  if (d.startsWith('0')) d = '61' + d.slice(1); // Australian local format
  return d;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });

  const pixelId = process.env.META_PIXEL_ID || '1089409557257136'; // dataset PresciaIQ 2026-11 (public ID)
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) return res.status(204).end();

  let b = req.body || {};
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = {}; } }

  if (!ALLOWED_EVENTS.has(b.event_name) || typeof b.event_id !== 'string' || b.event_id.length > 80) {
    return res.status(400).json({ error: 'event' });
  }
  let source;
  try { source = new URL(b.event_source_url); } catch { return res.status(400).json({ error: 'url' }); }
  if (!ALLOWED_HOSTS.has(source.hostname)) return res.status(400).json({ error: 'host' });

  const user = {};
  const em = clean(b.email); if (em.includes('@')) user.em = [sha(em)];
  const ph = phoneE164Digits(b.phone); if (ph.length >= 8) user.ph = [sha(ph)];
  const fn = clean(b.first_name); if (fn) user.fn = [sha(fn)];
  const ln = clean(b.last_name); if (ln) user.ln = [sha(ln)];
  const ct = clean(b.city).replace(/[^a-z]/g, ''); if (ct) user.ct = [sha(ct)];
  user.country = [sha('au')];
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  if (ip) user.client_ip_address = ip;
  if (req.headers['user-agent']) user.client_user_agent = String(req.headers['user-agent']);
  if (typeof b.fbp === 'string' && b.fbp.startsWith('fb.')) user.fbp = b.fbp;
  if (typeof b.fbc === 'string' && b.fbc.startsWith('fb.')) user.fbc = b.fbc;

  const payload = {
    data: [{
      event_name: b.event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_id: b.event_id,
      action_source: 'website',
      event_source_url: source.href,
      user_data: user,
      custom_data: { content_name: 'AI Visibility Report' },
    }],
  };
  if (process.env.META_TEST_EVENT_CODE) payload.test_event_code = process.env.META_TEST_EVENT_CODE;

  const version = process.env.META_GRAPH_VERSION || 'v24.0';
  try {
    const r = await fetch(`https://graph.facebook.com/${version}/${pixelId}/events?access_token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const out = await r.json().catch(() => ({}));
    if (!r.ok) console.error('meta-capi', r.status, JSON.stringify(out).slice(0, 300));
    return res.status(r.ok ? 200 : 502).json({ ok: r.ok, events_received: out.events_received || 0 });
  } catch (e) {
    console.error('meta-capi fetch failed', String(e).slice(0, 200));
    return res.status(502).json({ ok: false });
  }
}
