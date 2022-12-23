import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Box, Checkbox, createStyles, Modal, Text } from '@mantine/core'

import Notes from '../components/Notes';
import FilterNotes from '../components/FilterNotes';

const useStyles = createStyles((theme, _params) => ({
  entry: {
    color: theme.colors.blue[5],
    fontSize: '2rem',
  }
}));

export default function Home({ setIsEditable }) {
  const { classes } = useStyles();
  const [notes, setNotes] = useState([])
  const [storedFilteredNotes, setStoredFilteredNotes] = useState([])

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes'))
    setNotes(storedNotes)
    setIsEditable(false)
  }, [])

  return (
    <div>
      <Head>
        <title>Note Taking App</title>
        <meta name="description" content="Note taking app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {notes ?
          <>
            <FilterNotes notes={notes} setStoredFilteredNotes={setStoredFilteredNotes} storedFilteredNotes={storedFilteredNotes}/>
            <Notes notes={notes} storedFilteredNotes={storedFilteredNotes}/>
          </> :
          <Box sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            textAlign: 'center',
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            marginTop: 20
          })}>
          <Text className={classes.entry}>
            Create, update or delete your notes!
          </Text>
        </Box>
      }
    </div>
  )
}
