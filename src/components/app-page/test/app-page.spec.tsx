import { newSpecPage } from '@stencil/core/testing';
import { AppPage } from '../app-page';

describe('app-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppPage],
      html: `<app-page></app-page>`,
    });
    expect(page.root).toEqualHtml(`
      <app-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-page>
    `);
  });
});
