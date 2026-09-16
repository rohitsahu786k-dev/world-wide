declare module "next/navigation" {
  export function usePathname(): string;
  // Declared as `never` so TypeScript narrows away the null branch after a
  // `if (!post) notFound()` guard, the way the real Next.js types do.
  export function notFound(): never;
  export function redirect(url: string): never;
}
