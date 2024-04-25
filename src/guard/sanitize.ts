/**
 * Membersihkan input untuk mencegah serangan SQL injection dan XSS.
 *
 * @param {string} input String input yang akan dibersihkan.
 * @returns {string} String input yang sudah dibersihkan.
 */
export function sanitizeInput(input: string) {
  // Mengganti satu tanda kutip dengan dua tanda kutip
  let sanitizedInput = input.replace(/'/g, "''");

  // Menghilangkan tag HTML dan atributnya
  sanitizedInput = sanitizedInput.replace(/<[^>]+>/g, "");

  // Menghilangkan potensi serangan XSS dan injection
  sanitizedInput = sanitizedInput.replace(
    /(\b)(on\S+)(\s*)=|javascript|(<\s*)(\/*)script/gi,
    ""
  );

  // Menghapus spasi kosong di awal dan akhir string
  const trimmedInput = sanitizedInput.trim();

  return trimmedInput;
}
