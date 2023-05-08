/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
:host {
  --bbva-web-progress-bar-bg-color: var(--colorsSecondary300, ${unsafeCSS(foundations.colors.secondary300)});
  display: block;
  box-sizing: border-box;
  font-size: var(--typographyTypeSmall, ${unsafeCSS(foundations.typography.typeSmall)});
  line-height: var(--lineHeightTypeSmall, ${unsafeCSS(foundations.lineHeight.typeSmall)});
}

:host([hidden]),
[hidden] {
  display: none !important;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

.mb-0-5 {
  margin-bottom: 0.5rem;
}

.ml-0-5 {
  margin-left: 0.5rem;
}

.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.row {
  display: flex;
  align-items: baseline;
}

.opacity-grey {
  color: rgba(52, 52, 52, 0.5176470588);
}
`;
