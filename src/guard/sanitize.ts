/**
 * Membersihkan input untuk mencegah serangan SQL injection dan XSS.
 *
 * @param {string} input String input yang akan dibersihkan.
 * @returns {string} String input yang sudah dibersihkan.
 */
export function sanitizeInput(input: string) {
  let sanitizedInput = input.replace(/'/g, "''");

  sanitizedInput = sanitizedInput.replace(/<[^>]*>/g, "");
  sanitizedInput = sanitizedInput.replace(
    /(\b)(on\S+)(\s*)=|javascript|(<\s*)(\/*)script/gi,
    ""
  );

  const trimmedInput = sanitizedInput.trim();

  return trimmedInput;
}
