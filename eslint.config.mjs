import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Playwright's own test files, not part of the Next.js/React app —
    // eslint-plugin-react's react-version detection (used by rules like
    // react/display-name) currently throws on ESLint 10's flat-config
    // linting context for non-React files, so exclude this dir rather
    // than working around a bug in an unrelated rule set.
    "e2e/**",
  ]),
]);

export default eslintConfig;
