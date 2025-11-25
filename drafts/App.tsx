import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';

// Lazy loading для крупных компонентов
const TrustBar = lazy(() =>
  import('./components/TrustBar').then((module) => ({ default: module.TrustBar }))
);
const Services = lazy(() =>
  import('./components/Services').then((module) => ({ default: module.Services }))
);
const TechStack = lazy(() =>
  import('./components/TechStack').then((module) => ({ default: module.TechStack }))
);
const About = lazy(() =>
  import('./components/About').then((module) => ({ default: module.About }))
);
const Process = lazy(() =>
  import('./components/Process').then((module) => ({ default: module.Process }))
);
const ContactForm = lazy(() =>
  import('./components/ContactForm').then((module) => ({ default: module.ContactForm }))
);
const Footer = lazy(() =>
  import('./components/Footer').then((module) => ({ default: module.Footer }))
);
const PrivacyPolicy = lazy(() =>
  import('./components/PrivacyPolicy').then((module) => ({ default: module.PrivacyPolicy }))
);

// Loading fallback компонент
const LoadingFallback: React.FC = () => (
  <div className="min-h-screen bg-dark-900 flex items-center justify-center">
    <div className="animate-pulse text-slate-400">Загрузка...</div>
  </div>
);

const HomePage: React.FC = () => {
  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
      >
        Перейти к основному содержимому
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <TrustBar />
            <Services />
            <TechStack />
            <About />
            <Process />
            <ContactForm />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-dark-900 text-white overflow-x-hidden">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/privacy"
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <PrivacyPolicy />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
