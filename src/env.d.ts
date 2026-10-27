/// <reference types="astro/client" />

declare module "astro" {
  interface AstroClientDirectives {
    "client:paint"?: boolean | { rootMargin?: string };
  }
}

export {};
