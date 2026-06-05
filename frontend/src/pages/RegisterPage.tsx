import { useState } from 'react';
import { RegisterHeader } from '@/features/register/components/RegisterHeader';
import { RegisterStepper } from '@/features/register/components/RegisterStepper';
import { RegisterForm } from '@/features/register/components/RegisterForm';
import { BaselineUpload } from '@/features/register/components/BaselineUpload';
import { DocumentUpload } from '@/features/register/components/DocumentUpload';
import { Footer } from '@/components/layout/Footer';

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [createdProjectId, setCreatedProjectId] = useState<number | null>(null);

  return (
    <>
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto w-full">
        <RegisterHeader />
        <RegisterStepper currentStep={currentStep} />
        {currentStep === 1 && (
          <RegisterForm
            onStepComplete={(projectId) => {
              setCreatedProjectId(projectId ?? null);
              setCurrentStep(2);
            }}
          />
        )}
        {currentStep === 2 && (
          <BaselineUpload
            projectId={createdProjectId}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )}
        {currentStep === 3 && (
          <DocumentUpload
            projectId={createdProjectId}
            onBack={() => setCurrentStep(2)}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default RegisterPage;