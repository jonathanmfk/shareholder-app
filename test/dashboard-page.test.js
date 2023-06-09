/* eslint-disable import/no-extraneous-dependencies */
import { html, fixture, assert, fixtureCleanup } from '@open-wc/testing';
import '../app/pages/dashboard-page/dashboard-page.js';

suite('dashboard-page', () => {
  let el;
  let elementShadowRoot;

  teardown(() => fixtureCleanup());

  suite('dashboard-page - with no configuration', () => {
    setup(async () => {
      el = await fixture(
        html`
          <dashboard-page></dashboard-page>
        `,
      );
      elementShadowRoot = el.shadowRoot;
      await el.updateComplete;
    });

    test('a11y', () => assert.isAccessible(el));

    test('SHADOW DOM - Structure test', () => {
      assert.shadowDom.equalSnapshot(el);
    });

    test('LIGHT DOM - Structure test', () => {
      assert.lightDom.equalSnapshot(el);
    });
  });
});
