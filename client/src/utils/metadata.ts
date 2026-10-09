export function setPageMetadata(title: string, description: string) {
  document.title = `${title} | Haramain Hajj and Umrah Group`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", description);
}
