import React from 'react'
import { PrismaClient } from '@prisma/client'
import { StartApplicationView } from '@/components/StartApplicationView';
import { ApplicationType } from '@/types';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const applicationTypes = await prisma.applicationType.findMany();

  return {
    props: {
      applicationTypes
    }
  }
}

const Home: React.FC<{
  applicationTypes: ApplicationType[]
}> = ({ applicationTypes }) =>  {
  return (
    <main>
      <div className="main-content">
        <StartApplicationView applicationTypes={applicationTypes} />
      </div>
    </main>
  )
}

export default Home;
