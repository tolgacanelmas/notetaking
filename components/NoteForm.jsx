import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Group, MultiSelect, Textarea, TextInput } from "@mantine/core";

export default function NoteForm({ selectedNote, selectedId }) {
    const [note, setNote] = useState({})
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const router = useRouter()

    const onSubmit = (e) => {
        e.preventDefault()
        if(title && tags.length && body) {
            if(selectedId === undefined) {
                const newNote = { title, id:crypto.randomUUID(), tags, body }
                setNote(newNote)
            } else {
                const prevNotes = JSON.parse(localStorage.getItem('notes'))
                prevNotes.map((prevNote,i) => {
                    if(prevNote.id === selectedId) {
                        const newNote = {title, id: selectedId, tags, body}
                        prevNotes.splice(i, 1, newNote);
                        localStorage.setItem('notes', JSON.stringify(prevNotes))
                    }
                })
            }
            router.push("/")
        } else {
            alert("Please fill the options")
        }
    }

    useEffect(() => {
        if(Object.keys(note).length > 0) {
            const storedNotes = JSON.parse(localStorage.getItem('notes')) || []
            const notes = [note, ...storedNotes];
            localStorage.setItem('notes', JSON.stringify(notes))
        }
    }, [note])

    useEffect(() => {
        if(selectedNote !== undefined) {
            setTitle(selectedNote.title)
            setBody(selectedNote.body)
            setTags(selectedNote.tags)
        }
    }, [selectedNote])

    return(
        <form>
            <Group position='apart' grow mb='lg'>
                <TextInput
                    placeholder="Title"
                    label="Title"
                    withAsterisk
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <MultiSelect
                    label="Tags"
                    data={selectedNote?.tags || tags}
                    defaultValue={
                        selectedNote?.tags.map((tag) => {
                            return tag.label
                        })
                    }
                    placeholder="Select or create tags"
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Create ${query}`}
                    onCreate={(query) => {
                        const item = { value: query, label: query };
                        setTags((current) => [...current, item]);
                        return item;
                    }}
                />
            </Group>
            <Textarea
                placeholder="Body"
                label="Body"
                autosize
                minRows={5}
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <Button onClick={onSubmit} type="submit" sx={{marginLeft: 'auto', display: 'block', marginTop: '20px'}}>
                Save
            </Button>
        </form>
    )
}