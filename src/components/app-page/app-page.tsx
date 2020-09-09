import { Component, Prop, h } from '@stencil/core';
import { RouterHistory, MatchResults } from '@stencil/router';
import { EmbeddedUserSession } from '../../utils/EmbededUserSession';
import { UserSession } from '@esri/arcgis-rest-auth'; 
import { getItem } from '@esri/arcgis-rest-portal';

@Component({
  tag: 'app-page',
  styleUrl: 'app-page.css',
  shadow: false,
})
export class AppPage {

  // get query params and echo them into dom
  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;
  @Prop() parentOrigin: string;
  @Prop() loading: boolean;
  @Prop() session: UserSession;
  @Prop() targetItemId: string;
  @Prop() item: any;
  @Prop() messages: string[] = [];


  componentWillLoad () {
    this.messages.push(`componentWillLoad fired`);
    this.messages.push(`Url: ${window.location.href}`);
    this.loading = true;
    // the itemId the app should fetch
    this.targetItemId = this.match.params.id;
    // embed information
    const embed = this.history.location.query.embed;
    const parentOrigin = this.history.location.query.parentOrigin;
    if (embed === 'iframe' && parentOrigin) {
      return EmbeddedUserSession.fromParent(parentOrigin)
        .then(session => {
          this.messages.push(`Got session from parent`)
          this.session = session;
          return getItem(this.targetItemId, {authentication: this.session})
        })
        .then((item) => {
          this.messages.push(`fetched item ${item.id}`);
          this.item = item;
          this.loading = false;
        })
        .catch((err) => {
          this.messages.push(`Error getting auth ${err.message}`);
        });
    }
  }

  render() {
    if (this.loading) {
      return (
        <div class="container">
          <h2>Loading {this.targetItemId}</h2>

          <p>embed: {this.history.location.query.embed}</p>
          <p>parentOrigin: {this.history.location.query.parentOrigin}</p>
          <h5>Messages</h5>
          <ul>
          {this.messages.map((msg) => 
            <li>{msg}</li>
          )}
          </ul>
        </div>
      );
    } else {
      return (
        <div class="container">
           <h2>{this.item.title}</h2>
           <p>{this.item.description || 'No Description on item.'}</p>
           <p>Access: {this.item.access} Owner: {this.item.owner}</p>
           <h5>Messages</h5>
            <ul>
            {this.messages.map((msg) => 
              <li>{msg}</li>
            )}
            </ul>
        </div>
      );
    }
    
  }

}
