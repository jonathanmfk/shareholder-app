/* eslint-disable no-unused-expressions */
import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';
import { bbvaInfo } from '@bbva-web-components/bbva-foundations-icons';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';

import styles from './login-page-styles.js';

import '@cells-components/cells-template-paper-drawer-panel/cells-template-paper-drawer-panel.js';
import '@bbva-web-components/bbva-web-notification-contextual/bbva-web-notification-contextual.js';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@gema-dm/shareholder-dm/shareholder-dm.js';
import '@gema-ui/shareholder-list-ui/shareholder-list-ui.js';
import { EVENT_NAMES, PATHS } from '../../elements/_commons/parameters.const.js';

/* eslint-disable new-cap */
class LoginPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'login-page';
  }

  static get properties() {
    return {};
  }

  static get styles() {
    return [ styles ];
  }

  constructor() {
    super();
  }

  onPageEnter() {
    const shareholderDm = this.shadowRoot.querySelector('#api-dm');
    shareholderDm.nameEventSuccess = EVENT_NAMES.shareholderListSuccess;
    shareholderDm.path = PATHS.shareholderList;
    shareholderDm.getDataService();
  }

  goToDetail(e) {
    this.publish(EVENT_NAMES.detailPageData, e.detail);
    this.navigate('detail');
  }

  apiResponseListSuccess(e) {
    this.shareholderList(e);
  }

  apiResponseError(e) {
    console.log(e);
  }

  shareholderList(e) {
    const { detail } = e;
    const list = this.shadowRoot.querySelector('#list-ui');
    delete detail.headers;
    delete detail.responseHeaders;
    list.shareholders = Object.values(detail);
    list.isRender = true;
  }

  render() {
    return html`
      <cells-template-paper-drawer-panel page-title="Login">
        <div slot="app__main"><div class="container">${this._shareholderListRender}</div></div>
        <div slot="app__transactional">${this._apiShareholderDmRender}</div>
      </cells-template-paper-drawer-panel>
    `;
  }

  get _shareholderListRender() {
    return html`
    <div>
      <div class="row">
        <h2>Accionistas</h2>
        <div class="ml-0-5">
          <h4 class="opacity-grey">(2 of 5)</h4>
        </div>
      </div>
      <h4>Esta es la información sobre los accionistas de tu empresa</h4>
      <shareholder-list-ui id="list-ui"
        @go-to-next="${this.goToDetail}">
      </shareholder-list-ui>
      ${this.notificationRender}
    </div>
    `;
  }

  get _apiShareholderDmRender() {
    return html`
      <shareholder-dm id="api-dm"
        @response-shareholder-list-success="${this.apiResponseListSuccess}"
        @response-error="${this.apiResponseError}"
      ></shareholder-dm>
    `;
  }

  get notificationRender() {
    return html`
    <bbva-web-notification-contextual heading-icon="${bbvaInfo()}">
      <p><b>Recuerda que si deseas actualizar la información de los accionistas, deberás dirigirte a tu oficina o canal web</b></p>
    </bbva-web-notification-contextual>
    <div class="container">
      <bbva-web-button-default>Continuar</bbva-web-button-default>
    </div>
    `;
  }
}

window.customElements.define(LoginPage.is, LoginPage);
