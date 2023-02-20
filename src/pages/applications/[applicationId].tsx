import React from 'react'
import { Prisma, PrismaClient } from '@prisma/client'
import { Application } from '@/types';
import { ApplicationForm } from '@/components/ApplicationForm';
import { NoticeBanner, NoticeProvider } from '@/components/Notice';

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
      <NoticeProvider>
        <ApplicationForm application={application} />
        <NoticeBanner />
      </NoticeProvider>

    </main>
  );
}

export default ApplicationPage;
