  
// import { UserSession } from '@esri/arcgis-rest-auth';
import { EmbeddedUserSession } from './EmbededUserSession';
export function authenticateUser (
  clientId: string, 
  orgurl: string
  ):Promise<EmbeddedUserSession> {

  // construct the redirect
  const redirectUri = `${window.location.origin}/assets/redirect.html`;


  // register your own app to create a unique clientId
  return EmbeddedUserSession.beginOAuth2({
    clientId: clientId,
    portal: `${orgurl}/sharing/rest`,
    redirectUri: redirectUri,
    popup: true
  }) as Promise<EmbeddedUserSession>;
}