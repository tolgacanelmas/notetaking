import { Grid, Badge, Card, Group, Text } from "@mantine/core";
import Link from "next/link";

export default function Notes({ storedFilteredNotes }) {
  return (
    <>
      <Grid>
        {storedFilteredNotes.map((note,i) => (
            <Grid.Col span={4} key={i}>
                <Link href={note.id}>
                    <Card shadow="sm" p="lg" radius="md" withBorder >
                        <Text weight={600} ta="center" fz="xl" mb={10}>{note.title}</Text>

                        <Group position="center" mb={20}>
                            {note.tags.map((tag,i) => (
                                <Badge key={i} size="lg">{tag.label}</Badge>
                                ))}
                        </Group>

                        <Text size="sm" color="dimmed">
                            {note.body}
                        </Text>
                    </Card>
                </Link>
            </Grid.Col>
          ))}
      </Grid>
    </>
  )
}