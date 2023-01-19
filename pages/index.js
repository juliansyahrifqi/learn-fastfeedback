import { Button, Heading, Text, Code } from '@chakra-ui/react';
import Head from 'next/head'

import { useAuth } from '@/lib/auth'


export default function Home() {
  const auth = useAuth();

  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main>
        <Heading>Fast Feedback</Heading>
        <Text>
          Current user: <Code>{auth.user ? auth.user.email : 'None'}</Code>
        </Text>

        {auth?.user ? (
          <Button onClick={(e) => auth.signout()}>
            Sign Out
          </Button>
        ) : (
          <Button onClick={(e)=> auth.signinWithGithub()}>
            Sign In With Github
          </Button>
        )}
      </main>
    </div>
  )
}
