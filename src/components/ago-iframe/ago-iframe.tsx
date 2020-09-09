import { Component, Prop, h } from '@stencil/core';
/**
 * Component that will render an iframe, passing along the 
 * `embed` and `parentOrigin` parameters
 *
 * @export
 * @class AgoIframe
 */
@Component({
  tag: 'ago-iframe',
  styleUrl: 'ago-iframe.css',
  shadow: true,
})
export class AgoIframe {
  @Prop() url: string;
  @Prop() parentOrigin: string;
  @Prop() iframeUrl: string;
  componentWillLoad() {
    this.parentOrigin = window.location.origin;
    this.iframeUrl = `${this.url}?embed=iframe&parentOrigin=${encodeURIComponent(this.parentOrigin)}`;
  }
  render() {
    return (
      <div>
        <p>Embedding {this.iframeUrl} </p>
        <iframe class="col-sm-12" src={this.iframeUrl} height="400px"></iframe>
      </div>
    );
  }

}
