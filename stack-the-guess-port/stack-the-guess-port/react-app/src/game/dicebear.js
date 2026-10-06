export async function fetchAvatarSVG(seed, style) {
  const url = `https://api.dicebear.com/9.x/${encodeURIComponent(style)}/svg?seed=${encodeURIComponent(seed)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch avatar: ${response.status} ${response.statusText}`,
    );
  }

  return await response.text();
}
