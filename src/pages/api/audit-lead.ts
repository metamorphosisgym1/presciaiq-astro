import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { url, name, email, industry } = body as {
      url: string;
      name: string;
      email: string;
      industry: string;
    };

    if (!url || !name || !email || !industry) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ── 1. Notify PresciaIQ team ──────────────────────────────────────────
    await resend.emails.send({
      from: "PresciaIQ Leads <leads@presciaiq.com.au>",
      to: ["hello@presciaiq.com.au"],
      subject: `🔍 New Audit Request — ${name} (${url})`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0f0a; color: #ffffff; padding: 32px; border-radius: 12px;">
          <div style="border-bottom: 1px solid rgba(74,222,128,0.3); padding-bottom: 20px; margin-bottom: 24px;">
            <h1 style="color: #4ade80; font-size: 22px; margin: 0 0 4px;">New Audit Request</h1>
            <p style="color: rgba(255,255,255,0.5); margin: 0; font-size: 14px;">via presciaiq.com.au pop-up</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 13px; width: 120px;">Name</td>
              <td style="padding: 10px 0; color: #ffffff; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Email</td>
              <td style="padding: 10px 0; color: #4ade80; font-size: 14px;"><a href="mailto:${email}" style="color: #4ade80;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Website</td>
              <td style="padding: 10px 0; color: #22d3ee; font-size: 14px;"><a href="${url.startsWith("http") ? url : "https://" + url}" target="_blank" style="color: #22d3ee;">${url}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Industry</td>
              <td style="padding: 10px 0; color: #ffffff; font-size: 14px;">${industry}</td>
            </tr>
          </table>

          <div style="margin-top: 28px; padding: 16px; background: rgba(74,222,128,0.08); border: 1px solid rgba(74,222,128,0.2); border-radius: 8px;">
            <p style="margin: 0 0 12px; color: rgba(255,255,255,0.7); font-size: 13px;">Run the audit in the dashboard, then reply to ${name} within 24 hours with their Digital Health Score.</p>
            <a href="https://backlinkdash-9wienkvu.manus.space" 
               style="display: inline-block; background: linear-gradient(135deg, #4ade80, #22d3ee); color: #000; font-weight: 700; font-size: 13px; padding: 10px 20px; border-radius: 8px; text-decoration: none;">
              Open Dashboard →
            </a>
          </div>
        </div>
      `,
    });

    // ── 2. Confirmation email to the lead ─────────────────────────────────
    await resend.emails.send({
      from: "PresciaIQ <hello@presciaiq.com.au>",
      to: [email],
      subject: `Your Digital Health Score is being prepared — PresciaIQ`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0f0a; color: #ffffff; padding: 32px; border-radius: 12px;">
          <div style="margin-bottom: 28px;">
            <h1 style="color: #4ade80; font-size: 22px; margin: 0 0 8px;">Hi ${name},</h1>
            <p style="color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.6; margin: 0;">
              We've received your audit request for <strong style="color: #22d3ee;">${url}</strong> and we're running your Digital Health Score now.
            </p>
          </div>

          <div style="padding: 20px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; margin-bottom: 24px;">
            <p style="color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 12px;">What we're auditing</p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="color: #4ade80; font-size: 16px;">📈</span>
                <div>
                  <p style="margin: 0; color: #fff; font-size: 13px; font-weight: 600;">Organic Search Visibility</p>
                  <p style="margin: 0; color: rgba(255,255,255,0.4); font-size: 12px;">Are people finding you on Google?</p>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="color: #a78bfa; font-size: 16px;">🤖</span>
                <div>
                  <p style="margin: 0; color: #fff; font-size: 13px; font-weight: 600;">AI Engine Readiness</p>
                  <p style="margin: 0; color: rgba(255,255,255,0.4); font-size: 12px;">Are you showing up in ChatGPT, Perplexity & Google AI?</p>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="color: #fbbf24; font-size: 16px;">⚡</span>
                <div>
                  <p style="margin: 0; color: #fff; font-size: 13px; font-weight: 600;">Lead Generation Efficiency</p>
                  <p style="margin: 0; color: rgba(255,255,255,0.4); font-size: 12px;">Is your site converting visitors into enquiries?</p>
                </div>
              </div>
            </div>
          </div>

          <p style="color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
            Expect your results within <strong style="color: #fff;">24 hours</strong>. In the meantime, if you'd like to discuss your results live and get a personalised action plan, you can book a free discovery call below.
          </p>

          <a href="https://calendly.com/app/scheduling/meeting_types/user/me"
             style="display: block; text-align: center; background: linear-gradient(135deg, #4ade80, #22d3ee); color: #000; font-weight: 700; font-size: 14px; padding: 14px 24px; border-radius: 10px; text-decoration: none; margin-bottom: 28px;">
            Book a Free Discovery Call →
          </a>

          <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px;">
            <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">
              PresciaIQ — Australia's Predictive AI Company<br>
              <a href="https://www.presciaiq.com.au" style="color: rgba(74,222,128,0.6);">presciaiq.com.au</a>
            </p>
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Audit lead error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
