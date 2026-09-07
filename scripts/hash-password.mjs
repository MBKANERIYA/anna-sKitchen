/**
 * Generate admin credentials for the environment variables.
 *
 *   node scripts/hash-password.mjs                 # prompts, hides input
 *   node scripts/hash-password.mjs "my password"   # avoid: lands in shell history
 *
 * Prints ADMIN_PASSWORD_HASH and a fresh SESSION_SECRET. The plaintext password
 * is never written anywhere — only the scrypt hash goes into the environment.
 */
import { createRequire } from 'node:module';
import { randomBytes } from 'node:crypto';
import { createInterface } from 'node:readline';

const require = createRequire(import.meta.url);
const { hashPassword } = require('../server/auth.js');

const MIN_LENGTH = 12;

const promptHidden = (question) => new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    // Suppress echo so the password is not left on screen or in a scrollback buffer.
    const onData = (char) => {
        if (['\n', '\r', ''].includes(char.toString())) process.stdin.removeListener('data', onData);
        else process.stdout.write('\x1b[2K\x1b[200D' + question + '*'.repeat(rl.line.length));
    };
    process.stdin.on('data', onData);
    rl.question(question, (answer) => { rl.close(); process.stdout.write('\n'); resolve(answer); });
});

const password = process.argv[2] ?? await promptHidden('New admin password: ');

if (!password || password.length < MIN_LENGTH) {
    console.error(`\nPassword must be at least ${MIN_LENGTH} characters. Nothing was generated.`);
    process.exit(1);
}

console.log('\nAdd these to hPanel -> your app -> Environment variables:\n');
console.log(`ADMIN_USERNAME=admin`);
console.log(`ADMIN_PASSWORD_HASH=${hashPassword(password)}`);
console.log(`SESSION_SECRET=${randomBytes(48).toString('base64url')}`);
console.log(`
Notes:
  - Change ADMIN_USERNAME to something other than "admin" if you like.
  - SESSION_SECRET must stay secret and be at least 32 characters. Rotating it
    immediately logs out every active admin session.
  - Never commit these values. .env is gitignored.`);
