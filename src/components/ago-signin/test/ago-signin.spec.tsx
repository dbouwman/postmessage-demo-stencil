import { newSpecPage } from '@stencil/core/testing';
import { AgoSignin } from '../ago-signin';

describe('ago-signin', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AgoSignin],
      html: `<ago-signin></ago-signin>`,
    });
    expect(page.root).toEqualHtml(`
      <ago-signin>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ago-signin>
    `);
  });
});
