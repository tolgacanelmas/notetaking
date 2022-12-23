import { useState } from 'react';
import { Button, Group, Title, createStyles, Modal, Text, ActionIcon, useMantineColorScheme } from '@mantine/core'
import Link from 'next/link';
import { useRouter } from 'next/router';

import { IconSun, IconMoonStars } from '@tabler/icons';

const useStyles = createStyles((theme, _params) => ({
  title: {
    color: theme.colors.blue[5]
  },
  headerContainer: {
    height: '80px'
  }
}));

export default function Header({ handleEditNote, isEditable }) {
  const { classes } = useStyles();
  const router = useRouter()
  const [opened, setOpened] = useState(false);

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const handleDeleteModal = () => {
    setOpened(true)
  }

  const handleDeleteNote = () => {
    const notes =  JSON.parse(localStorage.getItem('notes'))
    const storedNotes = [...notes];
    storedNotes.map((note,i) => {
      if(note.id === router.query.noteid) {
        if(storedNotes.length === 1) {
          localStorage.removeItem('notes')
        } else {
          storedNotes.splice(i,1);
          localStorage.setItem('notes', JSON.stringify(storedNotes))
        }
      }
    })
    setOpened(false)
    router.push('/')
  }

  return (
    <>
     <Group position='apart' align='center' className={classes.headerContainer}>
        <Link href="/">
          <Title className={classes.title}>
            Notes
          </Title>
        </Link>

        <Group>
          <Group>
            {router.query.noteid &&
              <>
                <Button variant="outline" color="red" onClick={handleDeleteModal}>
                  Delete
                </Button>
                <Button variant="outline" onClick={handleEditNote} hidden={isEditable}>
                  Edit
                </Button>
                <Button variant="outline" onClick={handleEditNote} hidden={!isEditable}>
                  Cancel
                </Button>
              </>
            }
            {!router.query.noteid &&
            <Link href="/create-note">
                  <Button variant="outline">
                    Create Note
                  </Button>
              </Link>
            }
          </Group>

          <ActionIcon
              variant="outline"
              size={'lg'}
              color={'blue'}
              onClick={() => toggleColorScheme()}
              title="Toggle color mode"
            >
              {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
            </ActionIcon>
        </Group>
      </Group>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <Text ta={'center'} mb={40}>
          Are you sure want to delete this note
        </Text>

        <Group position={'center'} pb={40}>
          <Button color="green" onClick={handleDeleteNote}>
            Delete
          </Button>
          <Button variant="outline" color="red" onClick={() => setOpened(false)}>
            Cancel
          </Button>
        </Group>
      </Modal>
    </>
  );
}