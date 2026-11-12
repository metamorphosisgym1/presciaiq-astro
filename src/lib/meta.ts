// Meta ads funnel settings (12 Nov 2026).
// META_PIXEL_ID: the PresciaIQ Meta dataset ID from Events Manager. Public value, safe in code.
// Empty = the pixel stays off (no Meta tracking at all) until the dataset exists.
// Keep it the same as the META_PIXEL_ID env var in Vercel, which the Conversions API function uses.
export const META_PIXEL_ID = '';

// Booking calendar for the AI Visibility Report call.
export const CALENDLY_URL = 'https://calendly.com/presciaiq-sales/discoverycall';

// Talking-head video for the opt-in page and the longer one for the booking page.
// Empty = the video slot is not shown. Use an embeddable URL (YouTube nocookie or Vimeo player).
export const OPTIN_VIDEO_URL = '';
export const BOOKING_VIDEO_URL = '';

// Web3Forms key used by the site forms (sends to sales@presciaiq.com.au).
export const WEB3FORMS_KEY = 'fd818bb1-e5a7-4519-873e-68ba8725be59';

export const PHONE_DISPLAY = '0400 457 006';
export const PHONE_TEL = 'tel:0400457006';
