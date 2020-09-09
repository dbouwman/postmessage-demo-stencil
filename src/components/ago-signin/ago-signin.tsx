import { Component, Event, EventEmitter, h, Prop, State } from '@stencil/core';
import { authenticateUser } from '../../utils/authenticate-user';
import { loadSession, storeSession, clearSession } from '../../utils/session-store';

import { EmbeddedUserSession } from '../../utils/EmbededUserSession';
import state from '../../store'

/**
 * Copied from hub-component-experiments, and extended to use 
 * the Stencil Store to share the session across the app
 *
 * @export
 * @class AgoSignin
 */
@Component({
  tag: 'ago-signin',
  styleUrl: 'ago-signin.css',
  shadow: false,
})
export class AgoSignin {

  @Prop() signin:string = "Sign In"

  @Prop() signout:string = "Sign Out"

  @Prop() displaysignin: boolean = true;
  @Prop() displaysignout: boolean = true;

  @State() username:string;

   /**
   * ClientID to identify the app launching OAuth
   */
  @Prop() clientid: string;

  /**
   * url of the ArcGIS Online organization
   */
  @Prop() orgurl: string = "https://www.arcgis.com";

  /**
   * Serialized authentication information.
   */
  @Prop({ mutable: true }) session: EmbeddedUserSession;

  @Event({ 
    eventName: 'onSignin',
    composed: true,
    cancelable: true,
    bubbles: true
  }) onSignin: EventEmitter;  
  @Event({ 
    eventName: 'onSignout',
    composed: true,
    cancelable: true,
    bubbles: true
  }) onSignout: EventEmitter;    

  componentWillLoad() {
    this.session = loadSession();
    if (this.session) {
      state.session = this.session;
    }
  }  
  
  async identitySignin() {
    this.session = await authenticateUser(this.clientid, this.orgurl)
    storeSession(this.session);
    state.session = this.session;
    if(!!this.session) {
      this.onSignin.emit( this.session );
    }
  }
  async identitySignout() {
    const username = this.username
    this.session = null;
    this.username = null;
    state.session = null;
    clearSession();
    // Which user was signed out
    this.onSignout.emit( username );
  }  

  render() {
    if((this.session === undefined || this.session === null) && this.displaysignin) {
      return (
        <button class="btn btn-default navbar-btn" onClick={(_event: MouseEvent) => this.identitySignin()}>
          {this.signin}
        </button>
      )
    } else if (this.displaysignout) {
      return (
        <button class="btn btn-default navbar-btn" onClick={(_event: MouseEvent) => this.identitySignout()}>
          {`${this.signout}`}
        </button>
      )
    }    
  }

}
