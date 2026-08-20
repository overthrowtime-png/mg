import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./server/_core/oauth";
import { registerStorageProxy } from "./server/_core/storageProxy";
import { appRouter } from "./server/routers";
import { createContext } from "./server/_core/context";

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use((req, _res, next) => {
  if (
    !req.path.startsWith("/api/") &&
    (req.path === "/trpc" ||
      req.path.startsWith("/trpc/") ||
      req.path.startsWith("/oauth/") ||
      req.path.startsWith("/storage/"))
  ) {
    req.url = `/api${req.url}`;
  }
  next();
});

registerStorageProxy(app);
registerOAuthRoutes(app);

app.use(
  ["/api/trpc", "/trpc"],
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.get(["/health", "/api/health"], (_req, res) => {
  res.status(200).json({ status: "ok" });
});

if (process.env.VERCEL !== "1") {
  app.listen(Number(process.env.PORT ?? 3000));
}

export default app;
