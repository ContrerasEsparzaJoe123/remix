import {
  Card,
  Group,
  Flex,
  ActionIcon,
  createStyles,
  Input,
  Grid,
  Select,
  ThemeIcon,
  Tabs,
} from "@mantine/core";
import {
  IconCheckbox,
  IconChevronDown,
  IconCircleDot,
  IconEdit,
  IconGitBranch,
  IconMail,
  IconMenu,
  IconMenu2,
  IconQuestionMark,
  IconTool,
  IconTrashX,
} from "@tabler/icons-react";
import { useState } from "react";
import type { answerType } from "~/AnswerContent/AnswerContent";
import { AnswerContent } from "~/AnswerContent/AnswerContent";

const useStyles = createStyles((theme) => ({}));
export function MainCard() {
  const { classes, theme } = useStyles();
  const [value, setValue] = useState<answerType>("Radio");
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      bg="#F9FAFB"
      mih="20rem"
      w={{ xs: "100%", sm: "100%", lg: "50rem" }}
    >
      <Card.Section>
        <Group position="apart" mt="md" mb="xs" mx="md">
          <Tabs variant="pills" radius="md" defaultValue="gallery">
            <Tabs.List>
              <Tabs.Tab value="gallery" icon={<IconEdit size="0.8rem" />}>
                Edit
              </Tabs.Tab>
              <Tabs.Tab value="messages" icon={<IconTool size="0.8rem" />}>
                Options
              </Tabs.Tab>
              <Tabs.Tab value="settings" icon={<IconGitBranch size="0.8rem" />}>
                Logic
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
          <ActionIcon size="xl" radius="xl" variant="transparent">
            <IconTrashX size="1.625rem" />
          </ActionIcon>
        </Group>
      </Card.Section>

      <Card.Section>
        <Grid grow mx="xs">
          <Grid.Col span={8}>
            <Input
              icon={<IconQuestionMark />}
              placeholder="Enter your question"
              radius="md"
              size="md"
              sx={(theme) => ({
                input: {
                  borderColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[5]
                      : theme.colors.blue[5],
                },
              })}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <Select
              placeholder="Pick one"
              rightSection={<IconChevronDown size="1rem" />}
              radius="md"
              size="md"
              rightSectionWidth={30}
              styles={{ rightSection: { pointerEvents: "none" } }}
              icon={
                value ? (
                  <ThemeIcon
                    radius="xl"
                    variant="filled"
                    size="md"
                    ml="sm"
                    color={
                      value === "Radio"
                        ? theme.colors.teal[0]
                        : value === "Checkboxes"
                        ? theme.colors.indigo[0]
                        : value === "Short Answer"
                        ? theme.colors.yellow[0]
                        : value === "Long Answer"
                        ? theme.colors.red[0]
                        : value === "Email"
                        ? theme.colors.teal[0]
                        : undefined
                    }
                    mr="md"
                  >
                    {value === "Radio" ? (
                      <IconCircleDot color="black" size={16} />
                    ) : value === "Checkboxes" ? (
                      <IconCheckbox color="black" size={16} />
                    ) : value === "Short Answer" ? (
                      <IconMenu color="black" size={16} />
                    ) : value === "Long Answer" ? (
                      <IconMenu2 color="black" size={16} />
                    ) : value === "Email" ? (
                      <IconMail color="black" size={16} />
                    ) : null}
                  </ThemeIcon>
                ) : null
              }
              value={value}
              onChange={(value: answerType) => setValue(value)}
              data={[
                "Radio",
                "Checkboxes",
                "Short Answer",
                "Long Answer",
                "Email",
              ]}
            />
          </Grid.Col>
        </Grid>
      </Card.Section>
      <Card.Section>
        <AnswerContent type={value} />
      </Card.Section>
    </Card>
  );
}
