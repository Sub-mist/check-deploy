import type { AnalysisResult } from "../types";

export const mockDataFallback: AnalysisResult = {
  readinessScore: 35,
  readinessSummary:
    "The project is relatively early in its journey. Security and architecture require immediate attention to prevent future bottlenecks before releasing to production.",
  projectType: "Web App",
  primaryLanguage: "React / TypeScript",
  detailedChecks: [
    {
      id: 1,
      categoryName: "1. Core Functionality",
      status: "Warn",
      findings:
        "Basic flow works, edge cases and unhandled exceptions detected.",
      items: [
        {
          title: "Unhandled Exceptions",
          description:
            "Wrap high-level routes with an ErrorBoundary to prevent crashes.",
          path: "/src/App.tsx",
          priorityOrStatus: "High",
          category: "Core Functionality",
        },
      ],
    },
    {
      id: 2,
      categoryName: "2. Security",
      status: "Fail",
      findings:
        "API keys exposed in frontend code. Needs environment variables.",
      items: [
        {
          title: "Hardcoded Secrets",
          description: "Move API keys to .env and use process.env.",
          path: "/src/config/keys.js",
          priorityOrStatus: "Critical",
          category: "Security",
        },
      ],
    },
    {
      id: 3,
      categoryName: "3. Performance",
      status: "Fail",
      findings:
        "Large bundle size leading to slow initial loads. No lazy loading implemented.",
      items: [
        {
          title: "Code Splitting",
          description: "Implement React.lazy for route splitting.",
          path: "/src/routes/index.tsx",
          priorityOrStatus: "Medium",
          category: "Performance",
        },
      ],
    },
    {
      id: 4,
      categoryName: "4. SEO",
      status: "Pass",
      findings: "Basic meta tags exist, though open graph could be improved.",
      items: [
        {
          title: "Add Open Graph",
          description: "Add og:image and og:title to helmet configuration.",
          path: "/src/components/SEO.tsx",
          priorityOrStatus: "Done",
          category: "SEO",
        },
      ],
    },
    {
      id: 5,
      categoryName: "5. Responsiveness",
      status: "Pass",
      findings: "Mobile layout is generally okay, minimal overflow issues.",
      items: [
        {
          title: "Mobile Navigation",
          description:
            "Hamburger menu functions properly on mobile dimensions.",
          path: "/src/components/Navbar.tsx",
          priorityOrStatus: "Done",
          category: "Responsiveness",
        },
      ],
    },
    {
      id: 6,
      categoryName: "6. Theming",
      status: "Pass",
      findings: "Dark mode implementation is solid and accessible.",
      items: [
        {
          title: "Contrast Check",
          description: "All primary colors pass WCAG AA contrast ratio.",
          path: "/src/tailwind.config.js",
          priorityOrStatus: "Done",
          category: "Theming",
        },
      ],
    },
    {
      id: 7,
      categoryName: "7. Testing",
      status: "Warn",
      findings:
        "A few core unit tests exist, but major features lack coverage.",
      items: [
        {
          title: "Integration Tests",
          description: "Add E2E tests for the primary checkout flow.",
          path: "/tests/e2e/checkout.spec.ts",
          priorityOrStatus: "Medium",
          category: "Testing",
        },
      ],
    },
    {
      id: 8,
      categoryName: "8. Logging & Monitoring",
      status: "Fail",
      findings: "No centralized error tracking or analytics found.",
      items: [
        {
          title: "Setup Sentry",
          description: "Initialize Sentry for frontend error capture.",
          path: "/src/main.tsx",
          priorityOrStatus: "High",
          category: "Monitoring",
        },
      ],
    },
    {
      id: 9,
      categoryName: "9. CI/CD",
      status: "Warn",
      findings: "Manual deployment only. CI pipeline missing.",
      items: [
        {
          title: "GitHub Actions",
          description: "Create workflow for automated linting and tests on PR.",
          path: "/.github/workflows/ci.yml",
          priorityOrStatus: "Medium",
          category: "CI/CD",
        },
      ],
    },
    {
      id: 10,
      categoryName: "10. Environment Management",
      status: "Fail",
      findings: "Development config artifacts leaking into production build.",
      items: [
        {
          title: "Secure Env Config",
          description:
            "Avoid importing development specific constants in prod.",
          path: "/src/config/index.ts",
          priorityOrStatus: "High",
          category: "Environment",
        },
      ],
    },
    {
      id: 11,
      categoryName: "11. UX Details",
      status: "Warn",
      findings: "Missing disabled states during data fetching.",
      items: [
        {
          title: "Button Loading States",
          description: "Disable primary buttons and show spinner during fetch.",
          path: "/src/components/ui/Button.tsx",
          priorityOrStatus: "Medium",
          category: "UX Details",
        },
      ],
    },
    {
      id: 12,
      categoryName: "12. Backend / API Readiness",
      status: "Warn",
      findings: "API validates on backend but lacks comprehensive rate limits.",
      items: [
        {
          title: "Rate Limiting",
          description:
            "Configure express-rate-limit middleware on auth routes.",
          path: "/server/index.ts",
          priorityOrStatus: "High",
          category: "Backend",
        },
      ],
    },
    {
      id: 13,
      categoryName: "13. Database",
      status: "Pass",
      findings: "Basic setup looks clean with no test data found.",
      items: [
        {
          title: "Production Migration",
          description: "Migrations successfully run against target schema.",
          path: "/scripts/migrate.js",
          priorityOrStatus: "Done",
          category: "Database",
        },
      ],
    },
    {
      id: 14,
      categoryName: "14. Deployment Infra",
      status: "Warn",
      findings: "SSL is handled by platform, but custom domain is pending.",
      items: [
        {
          title: "Custom Domain DNS",
          description:
            "Add CNAME or A records to point to production environment.",
          path: "DNS settings",
          priorityOrStatus: "Low",
          category: "Infra",
        },
      ],
    },
    {
      id: 15,
      categoryName: "15. Legal / Compliance",
      status: "Fail",
      findings: "Missing essential cookie consent and privacy policies.",
      items: [
        {
          title: "Cookie Consent",
          description:
            "Add floating widget to inform users about tracking cookies.",
          path: "/src/App.tsx",
          priorityOrStatus: "Medium",
          category: "Legal",
        },
      ],
    },
    {
      id: 16,
      categoryName: "16. Cleanup Before Deploy",
      status: "Warn",
      findings: "Several debug console logs remain in the source.",
      items: [
        {
          title: "Remove console.logs",
          description: "Clean up debug statements across all views.",
          path: "/src/views/",
          priorityOrStatus: "Low",
          category: "Cleanup",
        },
      ],
    },
    {
      id: 17,
      categoryName: "17. Analytics",
      status: "Fail",
      findings: "No analytics platform integrated.",
      items: [
        {
          title: "Setup Plausible",
          description: "Include Plausible tracking script.",
          path: "/public/index.html",
          priorityOrStatus: "Low",
          category: "Analytics",
        },
      ],
    },
    {
      id: 18,
      categoryName: "18. Failure Handling",
      status: "Fail",
      findings: "App crashes if backend goes offline. Fallback UI needed.",
      items: [
        {
          title: "Global Fallback UI",
          description:
            "Show a friendly 503 screen if API server is unreachable.",
          path: "/src/pages/Maintenance.tsx",
          priorityOrStatus: "High",
          category: "Architecture",
        },
      ],
    },
    {
      id: 19,
      categoryName: "19. Authentication Edge Cases",
      status: "Warn",
      findings: "No handling for expired tokens. User session might hang.",
      items: [
        {
          title: "Axios Interceptor",
          description: "Catch 401s and redirect to login automatically.",
          path: "/src/api/client.ts",
          priorityOrStatus: "Medium",
          category: "Security",
        },
      ],
    },
    {
      id: 20,
      categoryName: "20. Build Check",
      status: "Pass",
      findings: "Production build completes successfully without errors.",
      items: [
        {
          title: "Build Success",
          description: "Vite build runs cleanly without ts errors.",
          path: "/package.json",
          priorityOrStatus: "Done",
          category: "Build Check",
        },
      ],
    },
  ],
  features: [
    {
      title: "UX Details: Loading States",
      description: "Implement skeletons and spinners, handle empty states.",
      path: "/src/components/ui/",
      priorityOrStatus: "High",
      category: "Frontend",
    },
    {
      title: "Legal & Compliance",
      description: "Add GDPR consent banners, Privacy Policy, and TOS.",
      path: "/public/legal/",
      priorityOrStatus: "Medium",
      category: "Legal",
    },
    {
      title: "Analytics Tracking",
      description: "Set up Plausible/Google Analytics for page views.",
      path: "/src/utils/analytics.ts",
      priorityOrStatus: "Low",
      category: "Tools",
    },
  ],
  risks: [
    {
      title: "Failure Handling",
      description: "No fallback UI when the Database or API goes down.",
      path: "/src/api/client.ts",
      priorityOrStatus: "Critical",
      category: "Architecture",
    },
    {
      title: "Security: API Keys Exposed",
      description:
        "Hardcoded tokens detected. Move them to .env and use process.env.",
      path: "/src/config/keys.js",
      priorityOrStatus: "High",
      category: "Security",
    },
    {
      title: "Performance: Huge Bundle",
      description: "No lazy loading/code-splitting. Main bundle is too large.",
      path: "/dist/bundle.js",
      priorityOrStatus: "Medium",
      category: "Performance",
    },
    {
      title: "Auth Edge Cases",
      description: "Missing logic for token expiry and logging out everywhere.",
      path: "/src/auth/session.ts",
      priorityOrStatus: "Medium",
      category: "Security",
    },
  ],
  solutions: [
    {
      title: "Implement Retry Logic",
      description:
        "Use exponential backoff and show friendly error states if backend fails.",
      path: "/src/api/",
      priorityOrStatus: "High",
      category: "Architecture",
    },
    {
      title: "Code Splitting",
      description: "Use React.lazy() for routes to reduce initial load time.",
      path: "/src/App.tsx",
      priorityOrStatus: "Medium",
      category: "Performance",
    },
    {
      title: "Cleanup Console Logs",
      description:
        "Remove all debug console.warn and console.log before production.",
      path: "/src/",
      priorityOrStatus: "Low",
      category: "Cleanup",
    },
  ],
  implemented: [
    {
      title: "Core Navigation",
      description: "Responsive mobile and desktop navigation works cleanly.",
      path: "/src/components/Navbar.tsx",
      priorityOrStatus: "Done",
      category: "Frontend",
    },
    {
      title: "Theming System",
      description:
        "Dark and light modes change correctly without unreadable text.",
      path: "/src/tailwind.config.js",
      priorityOrStatus: "Done",
      category: "UI/UX",
    },
    {
      title: "SEO Basics",
      description: "robots.txt and basic meta tags exist.",
      path: "/public/index.html",
      priorityOrStatus: "Done",
      category: "SEO",
    },
  ],
};
