import React from 'react'
import { PrismaClient } from '@prisma/client'
import { Application } from '@/types';
import { ApplicationForm } from '@/components/ApplicationForm';

const prisma = new PrismaClient();

export async function getServerSideProps(context: any) {
  const application = await prisma.application.findFirst({
    where: {
      id: Number(context.params.applicationId)
    },
    include: {
      type: true
    }
  });

  return {
    props: {
      application
    },
  }
}

const ApplicationPage: React.FC<{
  application: Application
}> = ({ application }) =>  {
  return (
    <main>
      <div className="main-content">
        <ApplicationForm application={application} />
      </div>
    </main>
  );
}

export default ApplicationPage;
