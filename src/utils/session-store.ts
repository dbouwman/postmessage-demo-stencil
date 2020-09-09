import { EmbeddedUserSession } from './EmbededUserSession';


const STORAGE_KEY = '__ARCGIS_REST_USER_SESSION__';
/**
 * Serialize session into local storage
 * @param session UserSession
 */
export function storeSession (
  session: EmbeddedUserSession
  ) : void {
    localStorage.setItem(STORAGE_KEY, session.serialize());
  }

/**
 * Load session from local storage
 */
export function loadSession () : EmbeddedUserSession {
  const serializedSession = localStorage.getItem(STORAGE_KEY);
  if (serializedSession !== null && serializedSession !== "undefined") {
    // If there is a serialized session, parse it and create a new session object.
    let parsed = JSON.parse(serializedSession);
    // Cast the tokenExpires property back into a date.
    parsed.tokenExpires = new Date(parsed.tokenExpires);
    // Create the new session object.
    return new EmbeddedUserSession(parsed);
  } else {
    return null;
  }
}

/**
 * Clear session
 */
export function clearSession () : void {
  localStorage.removeItem(STORAGE_KEY);
}