import { type RouteConfig, route } from '@react-router/dev/routes';

export default [
  route('/', '../pages/HomePage.tsx'),
  route('/editor', '../pages/EditorPage.tsx'),
  route('/about', '../pages/AboutPage.tsx'),
  route('/pricing', '../pages/PricingPage.tsx'),
  route('/login', '../pages/LoginPage.tsx'),
  route('/faq', '../pages/FAQPage.tsx'),
  route('/contact', '../pages/ContactPage.tsx'),
  route('/terms', '../pages/TermsPage.tsx'),
  route('/privacy', '../pages/PrivacyPage.tsx'),
  route('*', '../pages/NotFoundPage.tsx'),
] satisfies RouteConfig; 