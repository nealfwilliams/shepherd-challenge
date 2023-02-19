import React from 'react'
import { Prisma, PrismaClient } from '@prisma/client'
import StartApplicationView from '@/components/StartApplicationView'
import Head from 'next/head'

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const formTypes = await prisma.formType.findMany();

  return {
    props: {
      formTypes
    }, // will be passed to the page component as props
  }
}

const Home: React.FC<{
  formTypes: Prisma.FormTypeGetPayload<{}>[]
}> = ({ formTypes }) =>  {
  return (
    <>
      <Head>
        <title>Shepherd Challenge</title>
        <meta name="description" content="Shepherd Challenge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main>
        <StartApplicationView formTypes={formTypes} />
      </main>
    </>
  )
}

export default Home;
