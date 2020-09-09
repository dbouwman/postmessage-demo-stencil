import { newSpecPage } from '@stencil/core/testing';
import { AppEmbed } from '../app-embed';

describe('app-embed', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppEmbed],
      html: `<app-embed></app-embed>`,
    });
    expect(page.root).toEqualHtml(`
      <app-embed>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-embed>
    `);
  });
});
