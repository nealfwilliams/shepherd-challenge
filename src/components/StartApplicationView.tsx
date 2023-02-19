import React, { useState } from 'react'
import { Prisma } from '@prisma/client';
import { post } from '@/utils';
import { useRouter } from 'next/router'
import { ApplicationType } from '@/types';

export const StartApplicationView: React.FC<{
  applicationTypes: ApplicationType[]
}> = ({ applicationTypes }) => {
  const router = useRouter();
  const [inProgress, setProgress] = useState(false);

  if (inProgress) {
    // TO-DO add spinner
    return <div>Loading...</div>;
  }

  const startApplication = async (typeId: number) => {
    setProgress(true);
    const response = await post('/api/applications', { typeId });

    if (response.id) {
      router.push(`/applications/${response.id}`);
    }

    // TO-DO handle error
  };

  return (
    <>
      <div role="heading" aria-level={1}>
        Start New Application
      </div>

      {applicationTypes.map(applicationType => {
        return (
          <button onClick={() => startApplication(applicationType.id)}>
            {applicationType.label}
          </button>
        );
      })}
    </>
  );
};