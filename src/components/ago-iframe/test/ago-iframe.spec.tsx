import { newSpecPage } from '@stencil/core/testing';
import { AgoIframe } from '../ago-iframe';

describe('ago-iframe', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AgoIframe],
      html: `<ago-iframe></ago-iframe>`,
    });
    expect(page.root).toEqualHtml(`
      <ago-iframe>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ago-iframe>
    `);
  });
});
