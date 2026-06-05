import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { RootLayout } from '@/components/layout/RootLayout';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('@/pages/HomePage'));
const RegistryPage = lazy(() => import('@/pages/RegistryPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const UploadPage = lazy(() => import('@/pages/UploadPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));

// Loading fallback
const PageLoader = () => (
    <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
    </div>
);

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <HomePage />
                    </Suspense>
                ),
            },
            {
                path: 'registry',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <RegistryPage />
                    </Suspense>
                ),
            },
            {
                path: 'dashboard',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <DashboardPage />
                    </Suspense>
                ),
            },
            {
                path: 'upload',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <UploadPage />
                    </Suspense>
                ),
            },
            {
                path: 'register',
                element: (
                    <Suspense fallback={<PageLoader />}>
                        <RegisterPage />
                    </Suspense>
                ),
            },
            {
                path: '*',
                element: <Navigate to="/" replace />,
            },
        ],
    },
]);