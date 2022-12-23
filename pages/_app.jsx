import Head from 'next/head';
import { ColorSchemeProvider, Container, MantineProvider } from '@mantine/core';
import Layout from '../components/Layout';
import { useState } from 'react';

export default function App(props) {
  const { Component, pageProps } = props;
  const [isEditable, setIsEditable] = useState(false);
  const [colorScheme, setColorScheme] = useState('dark');

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const handleEditNote = () => {
    setIsEditable(!isEditable)
  }

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            globalStyles: (theme) => ({
              '*, *::before, *::after': {
                boxSizing: 'border-box',
              },

              'a': {
                textDecoration: 'none',
              },
            }),
          }}
        >
          <Container>
            <Layout handleEditNote={handleEditNote} isEditable={isEditable}>
                <Component {...pageProps} isEditable={isEditable} setIsEditable={setIsEditable}/>
            </Layout>
          </Container>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}