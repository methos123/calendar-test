import { Menu, ActionIcon } from "@mantine/core";
import React from "react";
import { Check, SortDescending } from "tabler-icons-react";

export const FilterMenu = ({ activeSorter, onSortChange }) => {
  const clickHandler = (newSorter) => () => {
    onSortChange(newSorter);
  };

  return (
    <Menu shadow="md" offset={5} position="bottom-start" withArrow>
      <Menu.Target>
        <ActionIcon variant="default">
          <SortDescending size={14} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={clickHandler({ prop: "title", direction: "asc" })}
          icon={
            activeSorter.direction === "asc" &&
            activeSorter.prop === "title" ? (
              <Check size={20} />
            ) : null
          }
        >
          <b>Name</b> A-Z
        </Menu.Item>
        <Menu.Item
          onClick={clickHandler({ prop: "title", direction: "desc" })}
          icon={
            activeSorter.direction === "desc" &&
            activeSorter.prop === "title" ? (
              <Check size={20} />
            ) : null
          }
        >
          <b>Name</b> Z-A
        </Menu.Item>
        {/*<Menu.Item
          onClick={clickHandler({prop:"xxx", direction: "asc"})}
          icon={
            activeSorter.direction === "asc" && activeSorter.prop === "xxx" ? (
              <Check size={20} />
            ) : null
          }
        >
          <b>Unscheduled</b> High-low
        </Menu.Item>
        <Menu.Item
          onClick={clickHandler({prop:"xxx", direction: "desc"})}
          icon={
            activeSorter.direction === "desc" && activeSorter.prop === "xxx" ? (
              <Check size={20} />
            ) : null
          }
        >
          <b>Unscheduled</b> Low-high
        </Menu.Item> */}
        <Menu.Item
          onClick={clickHandler({ prop: "role", direction: "asc" })}
          icon={
            activeSorter.direction === "asc" && activeSorter.prop === "role" ? (
              <Check size={20} />
            ) : null
          }
        >
          <b>Department</b> A-Z
        </Menu.Item>
        <Menu.Item
          onClick={clickHandler({ prop: "role", direction: "desc" })}
          icon={
            activeSorter.direction === "desc" &&
            activeSorter.prop === "role" ? (
              <Check size={20} />
            ) : null
          }
        >
          <b>Department</b> Z-A
        </Menu.Item>
        {/*<Menu.Item
          onClick={clickHandler({prop:"xxx", direction: "asc"})}
          icon={
            activeSorter.direction === "asc" && activeSorter.prop === "xxx" ? (
              <Check size={20} />
            ) : null
          }
        >
          <b>Job title</b> A-Z
        </Menu.Item>
        <Menu.Item
          onClick={clickHandler({prop:"xxx", direction: "desc"})}
          icon={
            activeSorter.direction === "desc" && activeSorter.prop === "xxx" ? (
              <Check size={20} />
            ) : null
          }
        >
          <b>Job title</b> Z-A
        </Menu.Item>*/}
      </Menu.Dropdown>
    </Menu>
  );
};

export default FilterMenu;
