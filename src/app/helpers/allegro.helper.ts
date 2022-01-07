export default function convertToBase64(
  clientId: string,
  clientSecret: string,
): string {
  return btoa(`${clientId}:${clientSecret}`);
}
