import React, { useState } from 'react'
import { Prisma } from '@prisma/client';
import { post } from '@/utils';
import { useRouter } from 'next/router'

const StartApplicationView: React.FC<{
  formTypes: Prisma.FormTypeGetPayload<{}>[]
}> = ({ formTypes }) => {
  const router = useRouter();
  const [inProgress, setProgress] = useState(false);

  if (inProgress) {
    // TO-DO add spinner
    return <div>Loading...</div>;
  }

  const startApplication = async (formTypeId: number) => {
    setProgress(true);
    const response = await post('/api/forms', { formTypeId });

    if (response.id) {
      router.push(`/forms/${response.id}`);
    }

    // TO-DO handle error
  };

  return (
    <>
      <div role="heading" aria-level={1}>
        Start New Application
      </div>

      {formTypes.map(formType => {
        return (
          <button onClick={() => startApplication(formType.id)}>
            {formType.label}
          </button>
        );
      })}
    </>
  );
};

export default StartApplicationView;