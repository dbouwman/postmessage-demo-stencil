import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: false,
})
export class AppHome {
  render() {
    return (
      <div class="app-home">
        <app-nav></app-nav>
        <div class="container">
          <div class="jumbotron">
            <h2>postMessage Auth Demo App</h2>
          </div>

          <div class="col-sm-6">
            <stencil-route-link url="/embed/2e7ca57a0788411a8ea30fab374d538d">Example</stencil-route-link>
          </div>
        </div>
      </div>
    );
  }
}
