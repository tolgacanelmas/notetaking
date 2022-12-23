import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Badge, createStyles, Group, Text, Title } from '@mantine/core'
import NoteForm from '../components/NoteForm'

const useStyles = createStyles((theme, _params) => ({
  title: {
    color: theme.colors.white,
  },
  body: {
    color: theme.colors.white,
    whiteSpace: 'pre-line'
  },
  noteContainer: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    padding: 20
  }
}));

const NoteDetail = ({isEditable}) => {
  const { classes } = useStyles();

  const [selectedNote, setSelectedNote] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
      const storedNotes = JSON.parse(localStorage.getItem('notes'))
      storedNotes.map((note) => {
          if(router.query.noteid === note.id) {
            setSelectedNote(note)
            setIsLoading(true)
          }
      })
  }, [router.query.noteid])

  if(isLoading) {
    if(isEditable) {
      return (
         <NoteForm selectedNote={selectedNote} selectedId={router.query.noteid}/>
      )
    } else {
      return (
        <div className={classes.noteContainer}>
          <Title mb={20} className={classes.title}>{selectedNote.title}</Title>
          <Group mb={20}>
            {
              selectedNote.tags.map((tag,i) => {
                return (
                  <Badge key={i} size="lg">{tag.label}</Badge>
                )
              })
            }
          </Group>
          <Text className={classes.body}>{selectedNote.body}</Text>
        </div>
      )
    }
  }
}

export default NoteDetail;
