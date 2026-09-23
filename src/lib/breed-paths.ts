import { regionUrlKey, regionUrlSido } from "./korea-regions";

export function breedPath(breedSlug: string, sido?: string, sigungu?: string, dong?: string): string {
  const parts = [`/${encodeURIComponent(breedSlug)}`];
  if (sido && sigungu) {
    parts.push(`/${encodeURIComponent(regionUrlKey(sido, sigungu))}`);
    if (dong) parts.push(`/${encodeURIComponent(dong)}`);
  } else if (sido) {
    parts.push(`/${encodeURIComponent(regionUrlSido(sido))}`);
  }
  return parts.join("");
}

export function bunyangPath(): string {
  return "/bunyang";
}

export function breedTopicPath(breedSlug: string, topicSlug: string): string {
  return `/${encodeURIComponent(breedSlug)}/${encodeURIComponent(topicSlug)}`;
}
