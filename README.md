# Boilerplate with React, Redux, and Typescript

### Performance optimization with Webpack and React Lazy imports resulting in a Lighthouse score of 100 across all categories.

## Description

Boilerplate with a Todos app using custom hooks and redux toolkit, architecture inspired by [Mark Erikson](https://github.com/markerikson) and the [cra-template-redux-typescript](https://github.com/reduxjs/cra-template-redux-typescript) team.

Built with React, Redux, Reux Toolkit, Typescript, Node, Express and Webpack

## Deployed App

[Deployed on heroku, open app.]()

## Installation

Clone the repo:

```bash

git clone https://github.com/Shekey/react-redux-unit-cypress-ts-starter-kit.git

```

Then cd into the root directory and run `npm install`.

Once complete, run `npm run dev` to start development and your browser should open up to `http://locahost:8080`.

To build the production bundle, run `npm run build`.


#### From web app to PWA

From web app to PWA is incredibly simple; it’s just a question of opting in to offline behaviour.  If you open up the `index.tsx` file in your newly created project you'll find this code:


```ts
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

As the hint suggests, swap `serviceWorker.unregister()` for `serviceWorker.register()` and you now have a PWA.  Amazing! What does this mean?  Well to [quote the docs](https://create-react-app.dev/docs/making-a-progressive-web-app/#why-opt-in):

> - All static site assets are cached so that your page loads fast on subsequent visits, regardless of network connectivity (such as 2G or 3G). Updates are downloaded in the background.
> - Your app will work regardless of network state, even if offline. This means your users will be able to use your app at 10,000 feet and on the subway.
> 
> ... it will take care of generating a service worker file that will automatically
precache all of your local assets and keep them up to date as you deploy updates.
The service worker will use a [cache-first strategy](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)
for handling all requests for local assets, including
[navigation requests](https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading#first_what_are_navigation_requests) for your HTML, ensuring that your web app is consistently fast, even on a slow
or unreliable network.

Under the bonnet, `create-react-app` is achieving this through the use of technology called ["Workbox"](https://developers.google.com/web/tools/workbox). Workbox describes itself as:

> a set of libraries and Node modules that make it easy to cache assets and take full advantage of features used to build [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/).

The good folks of Google are aware that writing your own PWA can be tricky.  There's much new behaviour to configure and be aware of; it's easy to make mistakes.  Workbox is there to help ease the way forward by implementing default strategies for caching / offline behaviour which can be controlled through configuration.  

A downside of the usage of `Workbox` in `create-react-app` is that (as with most things `create-react-app`) there's little scope for configuration of your own if the defaults don't serve your purpose.  This may change in the future, indeed [there's an open PR that adds this support](https://github.com/facebook/create-react-app/pull/5369).

#### Icons and splash screens and A2HS, oh my!

But it's not just an offline experience that makes this a PWA.  Other important factors are:

- That the app can be added to your home screen (A2HS AKA "installed").
- That the app has a name and an icon which can be customised.
- That there's a splash screen displayed to the user as the app starts up.

All of the above is "in the box" with `create-react-app`. Let's start customizing these.

First of all, we'll give our app a name. Fire up `index.html` and replace `<title>React App</title>` with `<title>My PWA</title>`.  (Feel free to concoct a more imaginative name than the one I've suggested.)  Next open up `manifest.json` and replace:

```json
  "short_name": "React App",
  "name": "Create React App Sample",
```

with:

```json
  "short_name": "My PWA",
  "name": "My PWA",
```

Your app now has a name.  The question you might be asking is: what is this `manifest.json` file? Well to [quote the good folks of Google](https://developers.google.com/web/fundamentals/web-app-manifest):

> The [web app manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) is a simple JSON file that tells the browser about your web application and how it should behave when 'installed' on the user's mobile device or desktop. Having a manifest is required by Chrome to show the [Add to Home Screen prompt](https://developers.google.com/web/fundamentals/app-install-banners/).
> 
> A typical manifest file includes information about the app name, icons it should use, the start_url it should start at when launched, and more.

So the `manifest.json` is essentially metadata about your app.  Here's what it should look like right now:

```json
{
  "short_name": "My PWA",
  "name": "My PWA",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

You can use the above properties (and others not yet configured) to control how your app behaves.  For instance, if you want to replace icons your app uses then it's a simple matter of:

- placing new logo files in the `public` folder
- updating references to them in the `manifest.json`
- finally, for older Apple devices, updating the `<link rel="apple-touch-icon" ... />` in the `index.html`.

#### Where are we?

So far, we have a basic PWA in place.  It's installable.  You can run it locally and develop it with `yarn start`.  You can build it for deployment with `yarn build`.

What this isn't, is recognisably a web app. In the sense that it doesn't have support for different pages / URLs. We're typically going to want to break up our application this way.  Let's do that now.  We're going to use [`react-router`](https://github.com/ReactTraining/react-router); the de facto routing solution for React. To add it to our project (and the required type definitions for TypeScript) we use:

```
yarn add react-router-dom @types/react-router-dom
```

Now let's split up our app into a couple of pages.  We'll replace the existing `App.tsx` with this:

```tsx
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from "./About";
import Home from "./Home";

const App: React.FC = () => (
  <Router>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
    <Switch>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
);

export default App;
```

This will be our root page. It has the responsiblity of using `react-router` to render the pages we want to serve, and also to provide the links that allow users to navigate to those pages.  In making our changes we'll have broken our test (which checked for a link we've now deleted), so we'll fix it like so:

Replace the `App.test.tsx` with this:

```tsx
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders about link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/about/i);
  expect(linkElement).toBeInTheDocument();
});
```

You'll have noticed that in our new `App.tsx` we import two new components (or pages); `About` and `Home`.  Let's create those.  First `About.tsx`:

```tsx
import React from "react";

const About: React.FC = () => (
  <h1>This is a PWA</h1>
);

export default About;
```

Then `Home.tsx`:

```tsx
import React from "react";

const Home: React.FC = () => (
  <h1>Welcome to your PWA!</h1>
);

export default Home;
```
