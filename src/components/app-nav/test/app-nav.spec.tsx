import { newSpecPage } from '@stencil/core/testing';
import { AppNav } from '../app-nav';

describe('app-nav', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppNav],
      html: `<app-nav></app-nav>`,
    });
    expect(page.root).toEqualHtml(`
      <app-nav>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </app-nav>
    `);
  });
});
