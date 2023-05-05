/* eslint-disable no-unused-expressions */
import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import { bbvaClose } from '@bbva-web-components/bbva-foundations-icons';
import { expenses, moneygraphic } from '@bbva-web-components/bbva-foundations-microillustrations';
import '@bbva-web-components/bbva-core-collapse/bbva-core-collapse.js';
import '@bbva-web-components/bbva-foundations-grid-tools-layout/bbva-foundations-grid-tools-layout.js';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@bbva-web-components/bbva-web-form-checkbox/bbva-web-form-checkbox.js';
import '@bbva-web-components/bbva-web-form-fieldset/bbva-web-form-fieldset.js';
import '@bbva-web-components/bbva-web-form-radio-button/bbva-web-form-radio-button.js';
import '@bbva-web-components/bbva-web-form-text/bbva-web-form-text.js';
import '@bbva-web-components/bbva-web-header-public-web/bbva-web-header-public-web.js';
import '@bbva-web-components/bbva-web-module-footer/bbva-web-module-footer-language-list-item.js';
import '@bbva-web-components/bbva-web-module-footer/bbva-web-module-footer.js';
import '@bbva-web-components/bbva-web-panel-outstanding-opportunity/bbva-web-panel-outstanding-opportunity.js';
import '@cells-demo/demo-data-dm/demo-data-dm.js';
import '@cells-demo/demo-web-template/demo-web-template.js';
import styles from './detail-page-styles.js';

import '@cells-components/cells-template-paper-drawer-panel/cells-template-paper-drawer-panel.js';
import '@gema-dm/shareholder-dm/shareholder-dm.js';
import '@gema-ui/shareholder-list-ui/shareholder-list-ui.js';
import '@bbva-web-components/bbva-header-main/bbva-header-main.js';
import { EVENT_NAMES, PATHS } from '../../elements/_commons/parameters.const.js';

/* eslint-disable new-cap */
class DetailPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'detail-page';
  }

  static get properties() {
    return {
      infoRow: {
        type: Object
      }
    };
  }

  static get styles() {
    return [ styles ];
  }

  constructor() {
    super();
    this.infoRow = {};
  }

  onPageEnter() {
    const shareholderDm = this.shadowRoot.querySelector('#api-dm');
    this.subscribe(EVENT_NAMES.detailPageData, (detail) => (this.infoRow = detail.row));
    const { CantidadAccionitas } = this.infoRow;
    shareholderDm.path = !!CantidadAccionitas
      ? `${PATHS.shareholderDetail}?NIT=${this.infoRow.NIT}`
      : `${PATHS.shareholderDetail}?Documento=${this.infoRow.Documento}&TipoDocumento=${this.infoRow.TipoDocumento}`;
    shareholderDm.nameEventSuccess = EVENT_NAMES.shareholderDetailSuccess;
    shareholderDm.getDataService();
  }

  goToDetail(e) {
    console.log(e.detail);
  }

  apiResponseDetailSuccess(e) {
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
    list.shareholders = Object.values(detail).filter((obj) => !obj.hasOwnProperty('CantidadAccionitas'));
    list.isRender = true;
  }

  render() {
    return html`
      <cells-template-paper-drawer-panel page-title="Login">
        <div slot="app__header">
        ${this._headersRender}
        </div>
        <div slot="app__main">
          ${this._infoForm}
          ${this._shareholderListRender}
          </div>
          <div slot="app__transactional">
          ${this._apiShareholderDmRender}
        </div>
      </cells-template-paper-drawer-panel>
    `;
  }

  get _headersRender() {
    return html`
    <bbva-header-main
    accessibility-text-icon-right-primary="Menu"
    icon-right-primary=${bbvaClose()}
    text="Accionista">
    </bbva-header-main>
    `;
  }

  get _infoForm() {
    return html`
    <shareholder-detail-ui id="info-form"></shareholder-detail-ui>
    `;
  }

  get _shareholderListRender() {
    return html`
      <shareholder-list-ui id="list-ui"
        @go-to-next="${this.goToDetail}"
      ></shareholder-list-ui>
    `;
  }

  get _apiShareholderDmRender() {
    return html`
      <shareholder-dm id="api-dm"
        @response-shareholder-detail-success="${this.apiResponseDetailSuccess}"
        @response-error="${this.apiResponseError}"
      ></shareholder-dm>
    `;
  }
}

window.customElements.define(DetailPage.is, DetailPage);
