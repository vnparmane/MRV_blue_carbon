import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { UploadSidebar } from '@/features/upload/components/UploadSidebar';

export const RootLayout = () => {
  const location = useLocation();
  const showSidebar = location.pathname.startsWith('/upload');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {showSidebar && <UploadSidebar />}
        <main className={`flex-1 ${showSidebar ? 'md:ml-64' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};