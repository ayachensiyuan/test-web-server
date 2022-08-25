import presetWind from "@unocss/preset-wind.ts";
import type { UserConfig } from "@unocss/core.ts";


// @ref https://github.com/unocss/unocss#configurations
export default <UserConfig> {
  presets: [presetWind({
    // dark: "media",
  })],


  rules: [
    ['bg-banner', { 'background-image': 'url(https://user-images.githubusercontent.com/19292210/60553863-044dd200-9cea-11e9-987e-7db84449f215.png)' }],
  ],
  shortcuts: {
    'bg-success': 'bg-lime-300 ',
    'bg-warning': 'bg-yellow-300 ',
    'bg-danger': 'bg-orange-300 ',
    'bg-error': 'bg-red-400 ',
    'success': 'text-lime-500 ',
    'warning': 'text-yellow-500 ',
    'danger': 'text-orange-500 ',
    'error': 'text-red-600 ',
    'link': 'text-blue-500 underline ',
  }
};
