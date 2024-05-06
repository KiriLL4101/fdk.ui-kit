import { StoryFn } from "@storybook/react";

export const CenterDecorator = () => (StoryComponent: StoryFn) =>
  (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
        backgroundColor: '#121316'
      }}
    >
      <StoryComponent />
    </div>
  );
