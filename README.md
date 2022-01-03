Since Magnolia 6.2.14 please use [External SPA](https://docs.magnolia-cms.com/product-docs/6.2/Releases/Release-notes-for-Magnolia-CMS-6.2.14.html#_external_spa).

External SPA capability makes it possible for SPA project to be running on a remote server.

Next.js demo can be found [here](https://git.magnolia-cms.com/projects/DEMOS/repos/minimal-headless-spa-demos/browse).

# mgnl-spa-next-js

Basic setup for **Magnolia** with WYSIWYG authoring and server side rendering with **Next.js**.

## Prerequisites

- Magnolia DX Core (due to CORS setup minimum version 6.2.5)
- SPA renderer extended ([git](https://git.magnolia-cms.com/projects/INCUBATOR/repos/spa-rendering-extended/browse/readme.md))  
  Incubator module that extends the SPA renderer and offers remote loading for templateScript.  
  In this case loading from Next.js server.
- magnolia-services-licence ([jar](https://nexus.magnolia-cms.com/service/local/artifact/maven/redirect?r=magnolia.incubator.releases&g=info.magnolia&a=magnolia-services-licence&v=1.0.2&e=jar))  
  Module required by SPA renderer extended.
- Node.js

## Overview

- `/spa-lm`  
  Magnolia Light Module.
- `/spa`  
  Basic Next.js project with page.

## Installation

### Next.js

1. Navigate to `/spa` folder.
2. Install all dependencies with `npm i`.
3. Build page with `npm run build`.
4. Start Next.js server with `npm run start`.

### Magnolia

1. Add `spa-lm` Light Module to Magnolia.
2. In `Configuration` app replace `/server/filters/cors` with [cors](https://gist.githubusercontent.com/bartoszstaryga/4265e52d4284654b22b598f73d91e1e8/raw/c13d73b86d10d187bf63840853851cc22b997896/config.server.filters.cors.yaml).
3. In `Security` app:

- Go to tab `Roles`.
- Open `rest-anonymous` role.
- In tab `Access control lists` find `Website` workspace and add `Read-only` for `Selected and sub nodes` for root node `/`.
- In tab `Web access` add `Get` for `/.rest/template-annotations/v1*`.

4. In `Pages` app:

- Create new page with:
  - First dialog:
    - Page name `spa-home`.
      The root node name is hardcoded in `/spa/pages/[[...pathname]].js`.
    - Template `SPA Home`.
  - Second dialog:
    - Title of your choice.
- You can edit it in Magnolia and add some components. You should see that `http://localhost:3000/` renders page with content added via Magnolia's WYSIWYG.
- Create new page child page under `spa-home` with:
  - First dialog:
    - Page name of your choice.  
      E.g. `contact`.
    - Template `SPA Basic`.
  - Second dialog:
    - Title of your choice.
- You can edit it in Magnolia and add some components. You should see that `http://localhost:3000/contact` renders page with content added via Magnolia's WYSIWYG.

## Magnolia x spaExtended x SSR with Next.js tweaks/issues

1. Notice in `/spa/next.config.js` the `assetPrefix` that points to Next.js server.  
   For WYSIWYG editor `spaExtended` fetches page provided in `Template script` then renders it in iframe. This iframe source is in Magnolia's domain, hence need for full url for assets to ensure they are loaded from Next.js server.
2. Current implementation of `@magnolia/react-editor` adds placeholders for `Template Annotations`. Placeholders are empty `divs`. Those placeholder are removed in Magnolia's WYSIWYG, but the currently implemented check does not take into account SSR.  
   Generated page includes as many empty `div` elements as areas and components in the page. It needs to be taken into account when styling the page.
