import { useSearchParams } from 'react-router-dom';
import { UploadHeader } from '@/features/upload/components/UploadHeader';
import { UploadGrid } from '@/features/upload/components/UploadGrid';
import { Footer } from '@/components/layout/Footer';

const UploadPage = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project_id');

  return (
    <>
      <div className="flex">
        <main className="flex-1 pt-24 pb-12 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <UploadHeader projectId={projectId} />
            <UploadGrid />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};
export default UploadPage;