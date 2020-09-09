import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false,
})
export class AppRoot {
  render() {
    return (
      <div class="main">
        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route url="/embed/:id" component="app-embed" />
              <stencil-route url="/app/:id" component="app-page" />
            </stencil-route-switch>
          </stencil-router>
        </main>
        <ago-identity></ago-identity>
      </div>
    );
  }
}
