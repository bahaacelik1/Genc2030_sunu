// public/ altındaki dosyalara verilen yolları Vite base path'i ile öne kler.
// Örn. asset("photos/x.jpg") lokalde "/photos/x.jpg", canlıda "/Genc2030_sunu/photos/x.jpg" döner.
// public/ referansları HER ZAMAN bu fonksiyondan geçmeli, aksi halde canlıda 404.
export function asset(p) {
  const base = import.meta.env.BASE_URL || "/";
  return base.replace(/\/$/, "") + "/" + String(p).replace(/^\//, "");
}
