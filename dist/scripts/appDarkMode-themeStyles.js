import { bbvaPanelProcessDarkModeThemeStyles } from '@bbva-web-components/bbva-panel-process/index.js';
import { demoAppTemplateDarkModeThemeStyles } from '@cells-demo/demo-app-template';
import { default as loginPageDarkModeThemeStyles } from '../pages/login-page/LoginPageDarkMode-themeStyles.js';

export default {
  ...bbvaPanelProcessDarkModeThemeStyles,
  ...demoAppTemplateDarkModeThemeStyles,
  ...loginPageDarkModeThemeStyles,
};