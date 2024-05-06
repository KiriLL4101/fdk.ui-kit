import type { StorybookConfig } from "@storybook/react-vite";
import svgr from "vite-plugin-svgr";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  viteFinal: async (config) => {
    config.plugins?.unshift(
      svgr({
        include: "**/*.svg",
        svgrOptions: {
          exportType: "named",
          ref: true,
          svgo: false,
          titleProp: true,
        },
      })
    );

    return config;
  },
};
export default config;
