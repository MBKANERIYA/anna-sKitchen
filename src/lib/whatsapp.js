// The business WhatsApp number, in international format with no "+" or spaces —
// this is the shape wa.me requires.
export const WHATSAPP_NUMBER = '919106780688';

// A <select> that has not been touched still reports its placeholder option, so
// those values must be treated as "not filled in".
const PLACEHOLDER_VALUES = ['-- select range --', '-- select --', ''];

const isBlank = (value) =>
    typeof value !== 'string' || PLACEHOLDER_VALUES.includes(value.trim().toLowerCase());

/**
 * Build the message body. Empty fields are dropped rather than sent as blank
 * lines, so a half-filled form still produces a tidy message.
 *
 * `note` is appended as its own block — used for the free-text Message box,
 * which reads badly squeezed onto a "Label: value" line.
 */
export const buildWhatsAppMessage = ({ intro = '', fields = {}, note = '' } = {}) => {
    const lines = Object.entries(fields)
        .filter(([, value]) => !isBlank(value))
        .map(([label, value]) => `${label}: ${value.trim()}`);

    const blocks = [];
    if (intro.trim()) blocks.push(intro.trim());
    if (lines.length) blocks.push(lines.join('\n'));
    if (!isBlank(note)) blocks.push(`Message:\n${note.trim()}`);

    return blocks.join('\n\n');
};

/** wa.me link that opens WhatsApp with the message pre-filled. */
export const buildWhatsAppUrl = ({ number = WHATSAPP_NUMBER, ...rest } = {}) =>
    `https://wa.me/${number}?text=${encodeURIComponent(buildWhatsAppMessage(rest))}`;

/**
 * Hand off to WhatsApp.
 *
 * Opens a new tab so the visitor does not lose the site. If a popup blocker
 * stops that, fall back to navigating the current tab — losing the page is far
 * better than the click appearing to do nothing, which is the bug being fixed.
 */
export const openWhatsApp = (options) => {
    const url = buildWhatsAppUrl(options);
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.href = url;
};
