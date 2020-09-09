import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-nav',
  styleUrl: 'app-nav.css',
  shadow: false,
})
export class AppNav {

  render() {
    return (
      <nav class="navbar navbar-default">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">postMessage Demo App</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
              <li><a href="/">Home</a></li>
            </ul>
            <ul class="nav navbar-right">
              <li>
               <ago-signin clientid="Hp3vQRuRj8JBB8xS" orgurl="https://dc.mapsqa.arcgis.com"></ago-signin>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    );
  }

}
