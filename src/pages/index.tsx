import React from 'react'
import { Prisma, PrismaClient } from '@prisma/client'
import Head from 'next/head'
import { StartApplicationView } from '@/components/StartApplicationView';
import { ApplicationType } from '@/types';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const applicationTypes = await prisma.applicationType.findMany();

  return {
    props: {
      applicationTypes
    }, // will be passed to the page component as props
  }
}

const Home: React.FC<{
  applicationTypes: ApplicationType[]
}> = ({ applicationTypes }) =>  {
  return (
    <>
      <main>
        <StartApplicationView applicationTypes={applicationTypes} />
      </main>
    </>
  )
}

export default Home;
