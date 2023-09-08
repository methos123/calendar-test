import {
  ActionIcon,
  useMantineColorScheme,
  Box,
  Card,
  Grid,
  Group,
  Badge,
  List,
  SegmentedControl,
  Button,
  Avatar,
  Text
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader
} from "react-calendar-timeline";
import { Sun, MoonStars } from "tabler-icons-react";
import dayjs from "./dayjsConfig";
import { FilterMenu } from "./FilterMenu";
import { TimelineItem } from "./TimelineItem";
import "./styles.css";

const groups = [
  {
    id: 1,
    title: "Aldo Baglio",
    team: "Frontend",
    role: "Senior Developer",
    langs: ["React", "Typescript"],
    picture: "https://randomuser.me/api/portraits/men/58.jpg"
  },
  {
    id: 2,
    title: "Giovanni Storti",
    team: "Backend",
    role: "Junior Developer",
    langs: ["Java", "jHipster", "Liferay"],
    picture: "https://randomuser.me/api/portraits/men/57.jpg"
  },
  {
    id: 3,
    title: "Giacomo Poretti",
    team: "Mobile",
    role: "Mid Developer",
    langs: ["Android", "iOs"],
    picture: "https://randomuser.me/api/portraits/men/56.jpg"
  }
];

const items = [
  {
    id: 1,
    group: 1,
    title: "ABCLEAD-1234 - Aggiungere una descrizione al task",
    start_time: dayjs("2022-08-02 09:00"),
    end_time: dayjs("2022-08-12 18:00"),
    bgColor: "red",
    client: "ABC Client",
    project: "Progetto 1"
  },
  {
    id: 2,
    group: 2,
    title: "ABCLEAD-2345",
    start_time: dayjs("2022-08-01 09:00"),
    end_time: dayjs("2022-08-05 18:00"),
    bgColor: "green",
    client: "ABC Client",
    project: "Progetto 1"
  },
  {
    id: 4,
    group: 2,
    title: "ABCLEAD-4432 - Aggiungere un task",
    start_time: dayjs("2022-08-05 09:00"),
    end_time: dayjs("2022-08-10 18:00"),
    bgColor: "blue",
    client: "ABC Client",
    project: "Progetto 1"
  },
  {
    id: 5,
    group: 2,
    title: "LEAD-333 - Fix UI",
    start_time: dayjs("2022-08-08 09:00"),
    end_time: dayjs("2022-08-12 18:00"),
    bgColor: "teal",
    client: "Other Client",
    project: "Progetto Bello"
  },
  {
    id: 3,
    group: 3,
    title: "item 3",
    start_time: dayjs("2022-08-08 09:00"),
    end_time: dayjs("2022-08-12 18:00"),
    bgColor: "violet",
    client: "ABC Client",
    project: "Progetto 1"
  }
];

const getTimeEnd = (start, duration) => {
  return dayjs(start).add(duration, "d").valueOf();
};

const viewToAmountInDays = (view, date) => {
  switch (view) {
    case "month":
      return dayjs(date).daysInMonth();
    default:
    case "week":
      return 7;
    case "day":
      return 1;
  }
};

const sortGroups = (group, groupSorter) =>
  [...group].sort((a, b) => {
    if (a[groupSorter.prop] === b[groupSorter.prop]) {
      return 0;
    }

    const firstIsGreater = a[groupSorter.prop] > b[groupSorter.prop];

    if (groupSorter.direction === "asc") {
      return firstIsGreater ? 1 : -1;
    } else {
      return firstIsGreater ? -1 : 1;
    }
  });

export default function AppContent() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const [viewAmount, setViewAmount] = useState("week");
  const [visibleTimeStart, setVisibleTimeStart] = useState(
    dayjs().startOf("week").valueOf()
  );
  const [groupSorter, setGroupSorter] = useState({
    prop: "title",
    direction: "asc"
  });

  const [sortedGroups, setSortedGroups] = useState(
    sortGroups(groups, groupSorter)
  );

  const itemRenderer = ({ ...props }) => <TimelineItem {...props} />;
  const groupRenderer = ({ group }) => {
    return (
      <Box p={5} style={{ lineHeight: "1em" }}>
        <Group spacing="sm">
          <Avatar
            size={50}
            src={group.picture ? group.picture : group.title.substring(0, 2)}
            radius={50}
          />
          <div>
            <Text size="sm" weight={500}>
              {group.title}
            </Text>
            <Text color="dimmed" size="xs">
              {group.team}
            </Text>
            <Text color="dimmed" size="xs">
              {group.role}
            </Text>
            <Group spacing={5} mt={5}>
              {group.langs.map((lang) => (
                <Badge color="gray" size={"xs"} variant="outline">
                  {lang}
                </Badge>
              ))}
            </Group>
          </div>
        </Group>
      </Box>
    );
  };

  const changeViewAmountHandler = (value) => {
    setViewAmount(value);

    setVisibleTimeStart(dayjs(visibleTimeStart).startOf(value).valueOf());
  };

  const handlePrevClickHandler = () => {
    setVisibleTimeStart(
      dayjs(visibleTimeStart).add(-1, viewAmount).startOf(viewAmount).valueOf()
    );
  };
  const handleNextClickHandler = () => {
    setVisibleTimeStart(
      dayjs(visibleTimeStart).add(1, viewAmount).startOf(viewAmount).valueOf()
    );
  };
  const todayClickHandler = () => {
    setVisibleTimeStart(dayjs().startOf(viewAmount).valueOf());
  };

  useEffect(() => {
    setSortedGroups(sortGroups(groups, groupSorter));
  }, [groupSorter, setSortedGroups]);

  const sortChangeHandler = (sorter) => {
    setGroupSorter(sorter);
  };

  return (
    <Box className="App" p="md">
      <Grid>
        <Grid.Col>
          <Card>
            <Group mb="md" position="apart">
              <ActionIcon
                color={dark ? "yellow" : "blue"}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
              >
                {dark ? <Sun size={18} /> : <MoonStars size={18} />}
              </ActionIcon>
              <Group position="right">
                <Group spacing={1}>
                  <Button
                    color="gray"
                    variant="subtle"
                    onClick={handlePrevClickHandler}
                  >
                    &lt;
                  </Button>
                  <Button
                    color="gray"
                    variant="subtle"
                    onClick={handleNextClickHandler}
                  >
                    &gt;
                  </Button>
                </Group>
                <Button color="blue" onClick={todayClickHandler}>
                  Oggi
                </Button>
                <SegmentedControl
                  value={viewAmount}
                  onChange={changeViewAmountHandler}
                  data={[
                    { label: "Giorno", value: "day" },
                    { label: "Settimana", value: "week" },
                    { label: "Mese", value: "month" }
                  ]}
                />
              </Group>
            </Group>

            <Timeline
              groups={sortedGroups}
              items={items}
              itemHeightRatio={0.8}
              showCursorLine={true}
              stackItems={true}
              sidebarWidth={320}
              visibleTimeStart={visibleTimeStart}
              visibleTimeEnd={getTimeEnd(
                visibleTimeStart,
                viewToAmountInDays(viewAmount, visibleTimeStart)
              )}
              defaultTimeStart={visibleTimeStart}
              defaultTimeEnd={getTimeEnd(
                visibleTimeStart,
                viewToAmountInDays(viewAmount, visibleTimeStart)
              )}
              timeSteps={{
                hour: 1,
                day: 1,
                month: 1,
                year: 1
              }}
              buffer={1}
              itemRenderer={itemRenderer}
              groupRenderer={groupRenderer}
              lineHeight={100}
            >
              <TimelineHeaders>
                <SidebarHeader>
                  {({ getRootProps }) => {
                    return (
                      <div
                        {...getRootProps({
                          style: {
                            backgroundColor: "#eee",
                            position: "relative"
                          }
                        })}
                      >
                        <Group
                          position="apart"
                          p={5}
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            width: "100%"
                          }}
                        >
                          <FilterMenu
                            activeSorter={groupSorter}
                            onSortChange={sortChangeHandler}
                          />
                          <Group>
                            <div>Drop</div>
                            <div>32h</div>
                          </Group>
                        </Group>
                      </div>
                    );
                  }}
                </SidebarHeader>

                <DateHeader unit="primaryHeader" />
                <DateHeader />
              </TimelineHeaders>
            </Timeline>
            <Box mt="xl">
              Docs:
              <List>
                <List.Item>
                  <a href="https://github.com/namespace-ee/react-calendar-timeline">
                    react-calendar-timeline Docs
                  </a>
                </List.Item>
              </List>
            </Box>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
