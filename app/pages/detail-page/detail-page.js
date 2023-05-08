/* eslint-disable no-unused-expressions */
import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import { bbvaClose, bbvaBuilding } from '@bbva-web-components/bbva-foundations-icons';
import styles from './detail-page-styles.js';

import '@cells-components/cells-template-paper-drawer-panel/cells-template-paper-drawer-panel.js';
import '@gema-dm/shareholder-dm/shareholder-dm.js';
import '@gema-ui/shareholder-list-ui/shareholder-list-ui.js';
import '@bbva-web-components/bbva-header-main/bbva-header-main.js';
import '@gema-ui/shareholder-detail-ui/shareholder-detail-ui.js';
import '@bbva-web-components/bbva-web-template-modal/bbva-web-template-modal.js';

import { EVENT_NAMES, PATHS, PARAMETERS_GLOBAL } from '../../elements/_commons/parameters.const.js';

/* eslint-disable new-cap */
class DetailPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'detail-page';
  }

  static get properties() {
    return {
      infoRow: {
        type: Object
      },
      isCantidadAccionitas: {
        type: Boolean
      }
    };
  }

  static get styles() {
    return [ styles ];
  }

  constructor() {
    super();
    this.infoRow = {};
    this.isCantidadAccionitas = false;
  }

  onPageEnter() {
    const shareholderDm = this.shadowRoot.querySelector('#api-dm');
    this.subscribe(EVENT_NAMES.detailPageData, (element) => (this.infoRow = element.row));
    const { CantidadAccionitas } = this.infoRow;
    this.isCantidadAccionitas = !!CantidadAccionitas;
    shareholderDm.path = this.isCantidadAccionitas
      ? `${PATHS.shareholderDetail}?NIT=${this.infoRow.NIT}`
      : `${PATHS.shareholderDetail}?Documento=${this.infoRow.Documento}&TipoDocumento=${this.infoRow.TipoDocumento}`;
    shareholderDm.nameEventSuccess = EVENT_NAMES.shareholderDetailSuccess;
    shareholderDm.getDataService();
  }

  goToDetail(e) {
    if (this.countMembers >= PARAMETERS_GLOBAL.countMembersLvl) {
      this.publish(EVENT_NAMES.detailPageData, e.detail);
      this.onPageEnter();
    }
  }

  apiResponseDetailSuccess(e) {
    this.shareholderDetail();
    this.isCantidadAccionitas ? this.shareholderList(e) : '';
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

  onClickButtonHelp() {
    this.showModal();
  }

  shareholderDetail() {
    const infoForm = this.shadowRoot.querySelector('#info-form');
    infoForm.setDataForm({
      isMember: this.isCantidadAccionitas,
      selectDocumentType: this.infoRow.TipoDocumento,
      inputIdentificationNumber: this.infoRow.Documento,
      name: this.infoRow.Nombre,
      inputParticipationPercentage: this.infoRow.Porcentaje
    });
  }

  showModal() {
    const modal = this.shadowRoot.querySelector('#modal');
    modal.visible = true;
    modal.button = 'Salir';
  }

  closedModal() {
    const modal = this.shadowRoot.querySelector('#modal');
    modal.visible = false;
  }

  render() {
    return html`
      <cells-template-paper-drawer-panel page-title="Login">
        <div slot="app__header">${this._headersRender}</div>
        <div slot="app__main">${this._infoForm}</div>
        <div slot="app__overlay" class="container">${this.modalRender}</div>
        <div slot="app__transactional">${this._apiShareholderDmRender}</div>
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
      <shareholder-detail-ui id="info-form"
        @on-click-button-help="${this.onClickButtonHelp}">
        <div slot="list">${this.isCantidadAccionitas ? this._shareholderListRender : html``}</div>
      </shareholder-detail-ui>
    `;
  }

  get _shareholderListRender() {
    return html`
      <shareholder-list-ui id="list-ui"
        .isMember="${this.isCantidadAccionitas}"
        @go-to-next="${this.goToDetail}">
      </shareholder-list-ui>
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

  get modalRender() {
    return html`
    <bbva-web-template-modal id="modal" size="s" @button-click="${this.closedModal}">
    <img src="resources/images/bbvabranch.svg" width="120" height="120" alt="My Happy SVG" wi/>
    <h2>Es necesario que vayas a una oficina</h2>
    <p class="p-tag">Acércate a una oficina para validar tu información y continuar con la solicitud.</p>
    </bbva-web-template-modal>
    `;
  }
}

window.customElements.define(DetailPage.is, DetailPage);
