import { Component, Prop } from '@stencil/core';

import { EmbeddedUserSession } from '../../utils/EmbededUserSession';
import { loadSession } from '../../utils/session-store';
import state from '../../store'

/**
 * Component that will simply load a persisted session from localStorage
 * into the state store. Intentionally has no DOM, as it is intended to 
 * be dropped into the root component/view so that the app does not need
 * to render a ago-signin
 *
 * @export
 * @class AgoIdentity
 */
@Component({
  tag: 'ago-identity',
  shadow: true,
})

export class AgoIdentity {
  @Prop({ mutable: true }) session: EmbeddedUserSession;
  componentWillLoad() {
    this.session = loadSession();
    if (this.session) {
      state.session = this.session;
    }
  }  
}
