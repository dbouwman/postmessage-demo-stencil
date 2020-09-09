## Passing Platform Authentication Information into IFrame Applications

Scenario:

- A private Hub Site is running at https://internal.mycounty.gov
- User visits the site, and authenticates via oAuth.
- The site then renders it's layout and embeds a private StoryMap
- How do we securely get authentication information from the "host" (the Site) into the embedded StoryMap?


Solution:
- The Host and Embedded apps utilize the ArcGIS REST Js `UserSession` class to communicate between the frames via the [postMessage]() API that's built into browsers.

## Proposed API

### For Host Apps
- host app handles auth via normal oAuth processes and has a `UserSession` instance
- when it is preparing to embed another app via an iframe it instructs the UserSession instance to enable post message authentication

```js
  // app must have a list of valid "origins" that auth will be passed to
  // i.e. https://storymaps.arcgis.com, https://experience.arcgis.com etc
  // validOrigins is intentionally *not* using a regexp as that opens exploits
  this.session.enablePostMessageAuth(validOrigins);
```

Behind the scenes, `UserSession` will attach a `message` event listener on the window, and when it gets message with `type === 'ago:auth:requestCredential` and the requesting origin is in the list of `validOrigins` it will send back a serialized `ICredential`. 

When the Host app transitions to another route, it must detach this event handler to prevent memory leaks

```js
  // use a framework lifecycle hook that is called 
  // when the component is being destroyed
  disconnectedCallback () {
    this.session.disablePostMessageAuth();
  }
```


### For Embedded Apps
- app must inspect the query string for the `embed` and `parentOrigin` parameters

```js
  // vanilla js example
  // if using a framework, use it's built in capabilities
  let params = new URLSearchParams(document.location.search.substring(1));
  const embed = params.get('embed');
  const parentOrigin = params.get('parentOrigin');
```

- app creates a `UserSession` by requesting credentials from the parent app

```js
// other code parsing url etc
if (embed === 'iframe') {
  UserSession.fromParent(parentOrigin)
    .then((session) => {
      // hold the session for use later
    })
}
```

Behind the scenes, `UserSession` is using `postMessage` to send a request for credential `{type: 'ago:auth:requestCredential'}`. It also listens for returning messages, and if passed a credential (`type === 'ago:auth:credential'`) it creates an instance of a `UserSession` from the `ICredential`.

## Post Message Types
Messages send via `postMessage` can be any object, but by convention usually have a `type` property that describes what sort of message it is.

| Type | Description |
| -- | -- |
| `ago:auth:requestCredential` | Request credential from host app. Request will be rejected if the `event.origin` is not in the `validOrigins` list |
| `ago:auth:credential` | Returning the credential in `event.credential` |
| `ago:auth:rejected` | Returned if the host declines to send credentials. `event.message` will contain the reason |


## Demo Application

This repo contains a simple Stencil App to explore/validate proposed extensions to the ArcGIS Rest Js [UserSession](https://esri.github.io/arcgis-rest-js/api/auth/UserSession/) class to support two scenarios:

As a "host" application, register handlers that will pass credentials to iframed "child" applications

As a "child" application, register handlers that request and process credentials from the parent application.



## Before you start
In order to explore cross domain scenarios, we need to load things from different hosts. To do this locally, we need to add entries to your host file.

```
127.0.0.1 www.fakegis.com
127.0.0.1 site-org.fakehub.fakegis.com
127.0.0.1 dashapp.fakegis.com
127.0.0.1 storyapp.fakegis.com
127.0.0.1 evilcorp.com
```

## Starting the Demo

```sh
$ npm start
```

This will build the app and start the development server. 

Visit http://site-org.fakehub.fakegis.com in your browser

Click sign-in, enter credentials in the pop-up, then use the example link on the homepage.


## Backing Items
- works against QAEXT
- "postMessage Demo App" item: `2e7ca57a0788411a8ea30fab374d538d`
- clientKey `Hp3vQRuRj8JBB8xS`

## TODO
- [ ] Drop bootstrap and use shadowdom styles
- [ ] setup example item on prod