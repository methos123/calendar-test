import { useMantineTheme } from "@mantine/core";
import React from "react";

export const TimelineItem = ({
  item,
  timelineContext,
  itemContext,
  getItemProps,
  getResizeProps
}) => {
  const theme = useMantineTheme();
  const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();

  const backgroundColor = itemContext.selected
    ? itemContext.dragging
      ? theme.colors.gray[4]
      : theme.colors[item.bgColor][6]
    : theme.colors[item.bgColor][8];

  const color = "white";

  const borderColor = itemContext.resizing
    ? theme.colors[item.bgColor][8]
    : theme.colors[item.bgColor][8];

  const itemProps = getItemProps({
    style: {
      backgroundColor,
      color,
      borderColor,
      borderStyle: "solid",
      borderWidth: 1,
      borderRadius: 4,
      borderLeftWidth: itemContext.selected ? 5 : 1,
      borderRightWidth: itemContext.selected ? 5 : 1
    },
    onMouseDown: () => {
      console.log("on item click", item);
    }
  });
  return (
    <div {...itemProps}>
      {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

      <div
        style={{
          height: "100%",
          paddingLeft: 3,
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          position: "relative",
          fontSize: "13px",
          lineHeight: "15px"
        }}
      >
        <div>{itemContext.title}</div>
        <div>
          {item.client} - {item.project}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 5,
            right: 8
          }}
        >
          8h
        </div>
      </div>

      {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
    </div>
  );
};

export default TimelineItem;
