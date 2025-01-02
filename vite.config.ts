import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "pages/views/landing.tsx", { index: true });
          route("login", "pages/views/login.tsx");
          route("register", "pages/views/register.tsx");
          route("wiki", "pages/views/wiki.tsx");
          route("recruiting", "pages/views/recruiting.tsx");
          route("collab", "pages/views/collab.tsx");
          route("xc", "pages/views/xc/layout.tsx", () => {
            route(":communityName", "pages/views/xc/community.tsx");
            route("profile/:username", "pages/views/xc/profile.tsx");
            route(
              ":communityName/posts/:postId",
              "pages/views/xc/discussionPost.tsx"
            );
            route("feed", "pages/views/xc/dashboard.tsx");
          });
        });
      },
    }),
    tsconfigPaths(),
  ],
});
