import {UserSession} from '@esri/arcgis-rest-auth';
/**
 * Container to expore the shape of the api we will
 * add to UserSession
 */
export class EmbeddedUserSession extends UserSession {
  
  /**
   * Return a function that can be used as an event handler
   * for the `message` event
   * @param validOrigins Array of valid origins
   */
  private createPostMessageHandler (
    validOrigins: string[]
  ): any {
    // return a function that closes over the validOrigins and
    // has access to the credential
    return (event) => {
      if (validOrigins.indexOf(event.origin) > -1) {
        const credential = this.toCredential();
        event.source.postMessage({type: 'arcgis:auth:credential', credential}, event.origin);
      } else {
        event.source.postMessage({type: 'arcgis:auth:rejected', message: `Rejected authentication request.`}, event.origin);
      }
    }
  }
  private hostHandler: any;

  /**
   * 
   * @param validChildOrigins Array of origins that are allowed to request authentication from the host app
   */
  public enablePostMessageAuth (validChildOrigins: string[]): any {
    this.hostHandler = this.createPostMessageHandler(validChildOrigins);
    window.addEventListener('message',this.hostHandler , false);
  }

  /**
   * Detach the 
   */
  public disablePostMessageAuth () {
    window.removeEventListener('message', this.hostHandler, false);
  }

  /**
   * Request session information from the parent application
   * 
   * @param parentOrigin origin of the parent frame. Passed into the embedded application as `parentOrigin` query param
   */
  public static fromParent (parentOrigin:string, clientId:string): Promise<any> {
    // Declar handler outside of promise scope so we can detach it
    let handler;
    // return a promise...
    return new Promise((resolve, reject) => {
      // create an event handler that just wraps the parentMessageHandler
      handler = (event) => {
        try {
          return resolve(EmbeddedUserSession.parentMessageHandler(event));
        } catch (err) {
          return reject(err);
        }
        
      };
      // add listener
      window.addEventListener('message', handler, false);
      window.parent.postMessage({type: 'arcgis:auth:requestCredential'}, parentOrigin);
    })
    .then((session) => {
      window.removeEventListener('message', handler, false);
      return session;
    });
  }

  /**
   * Handle the response from the parent
   * @param event DOM Event
   */
  private static parentMessageHandler (event):UserSession {
    if (event.data.type === 'arcgis:auth:credential') {
      // TODO: see if we can exchange token for one tied to the app itself (will need appId/clientId)
      // Note: exchance token may fail if user lacks access to the application via licensing
      return EmbeddedUserSession.fromCredential(event.data.credential);
    }
    if (event.data.type === 'arcgis:auth:rejected') {
      throw new Error(event.data.message);
    }
  }

}