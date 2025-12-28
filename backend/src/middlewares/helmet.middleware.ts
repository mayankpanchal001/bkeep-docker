import type { RequestHandler } from "express";
import helmet from "helmet";

import { env } from "@config/env";

/**
 * Helmet middleware configuration for security headers
 *
 * Features:
 * - Content Security Policy (CSP) with custom directives
 * - Cross-Origin Embedder Policy disabled for compatibility
 * - Protection against common web vulnerabilities
 */
const allowedConnect = [
  "'self'",
  env.FRONTEND_URL?.replace(/\/+$/, ""),
  `http://${env.HOST}:${env.PORT}`,
];

const helmetMiddleware: RequestHandler = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com"],
      imgSrc: ["'self'", "data:", "https:", "https://unpkg.com"],
      fontSrc: ["'self'", "https://unpkg.com"],
      connectSrc: allowedConnect,
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
});

export default helmetMiddleware;
