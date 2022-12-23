import { useState, useEffect } from "react";
import { Group, Title, Checkbox } from "@mantine/core";

export default function FilterNotes({ notes, setStoredFilteredNotes }) {
    const [value, setValue] = useState([]);

    useEffect(() => {
      let filteredArray = [];

      notes.map((note) => {
          note.tags.filter((tag) => {
              value.map((v) => {
                  if(v === tag.value) {
                    filteredArray.push(note)
                  }
              })
          })
      })

      const uniqFilteredArray = filteredArray.filter((item, index) => {
        return filteredArray.some((innerItem, innerIndex) => {
          return innerIndex > index && innerItem.id === item.id;
        }) === false;
      });

      if(uniqFilteredArray.length === 0) {
        setStoredFilteredNotes(notes)
      } else {
        setStoredFilteredNotes(uniqFilteredArray)
      }
    }, [value, notes])

    const renderFilters = () => {
      let allTags = [];

      notes.map((note) => {
          return note.tags.map((tag) => {
              allTags.push(tag)
          })
      })

      const filteredTags = allTags.filter((tag, i) => {
          const _tag = JSON.stringify(tag);
          return i === allTags.findIndex(obj => {
            return JSON.stringify(obj) === _tag;
          });
      });

      return filteredTags.map((tag,i) => {
          return (
              <Checkbox
                  label={tag.label}
                  size="md"
                  key={i}
                  value={tag.value}
              />
      )})
    }

    return (
      <>
        <Title order={3} mb={10}>
            Filter your notes from tags below
        </Title>
        <Group mb={40}>
            <Checkbox.Group value={value} onChange={setValue}>
                {renderFilters()}
            </Checkbox.Group>
        </Group>
      </>
    )
}