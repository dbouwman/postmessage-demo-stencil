import { Component, Prop, h } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { getItemData } from '@esri/arcgis-rest-portal';
import state from '../../store'

@Component({
  tag: 'app-embed',
  styleUrl: 'app-embed.css',
  shadow: false,
})
export class AppEmbed {
  @Prop() match: MatchResults;
  @Prop() embeds: string[];
  @Prop() validOrigins: string[];

  componentWillLoad() {
    if (this.match && this.match.params.id) {
      const itemId = this.match.params.id;
      const session = state.session;
      if (session) {
        return getItemData(itemId, {authentication: session})
          .then((data) => {
            console.log(`Got data for ${itemId}`);
            this.embeds = data.embeds;
            // typically your application will derive the list of valid origins
            // instead of having them listed in the app's configuration
            this.validOrigins = data.validOrigins;
            // start listening for requests from children
            session.enablePostMessageAuth(this.validOrigins);
          });
      }
      
    }
  }

  disconnectedCallback () {
    // stop listening for requests from children
    state.session.disablePostMessageAuth();
  }

  render() {
    if (this.embeds) {
      return (
        <div class="app-embed">
          <app-nav></app-nav>
          <div class="container">
            <h2>Item {this.match.params.id}</h2>
            {this.embeds.map((url) => 
              <ago-iframe url={url}></ago-iframe>
            )}
          </div>
          
        </div>
      );
    } else {
      return (
        <div class="app-embed">
          <app-nav></app-nav>
          <div class="container">
            <h2>Item {this.match.params.id}</h2>
            <p>No Embeds found</p>
          </div>
        </div>
      )
    }
  }
}
