# mgnl-spa-next-js

Basic setup for **Magnolia** with WYSIWYG authoring and server side rendering with **Next.js**.

## Prerequisites

- Magnolia DX Core (due to CORS setup minimum version 6.2.5)
- SPA renderer extended (1.1) ([git](https://git.magnolia-cms.com/projects/INCUBATOR/repos/spa-rendering-extended/browse/readme.md), [jar](https://nexus.magnolia-cms.com/service/local/artifact/maven/redirect?r=magnolia.incubator.releases&g=info.magnolia.pages&a=magnolia-spa-rendering-extended&v=1.1&e=jar))  
  Incubator module that extends the SPA renderer and offers remote loading for templateScript.  
  In this case loading from Next.js server.
- magnolia-services-licence ([jar](https://nexus.magnolia-cms.com/service/local/artifact/maven/redirect?r=magnolia.incubator.releases&g=info.magnolia&a=magnolia-services-licence&v=1.0.2&e=jar))  
  Module required by SPA renderer extended.
- Node.js

## Overview

- `/light-modules`  
  Folder containing Magnolia Light Module `spa-lm`.
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
2. Add CORS to you instance following [Configure CORS steps](https://git.magnolia-cms.com/projects/DEMOS/repos/website-spa-demo/browse/README-local.md).
3. In `Security` app:

- Go to tab `Roles`.
- Open `rest-anonymous` role.
- In tab `Access control lists` find `Website` workspace and add `Read-only` for `Selected and sub nodes` for root node `/`.
- In tab `Web access` add `Get` for `/.rest/template-definitions/v1/*`.

4. In `Pages` app:

- Create new page with:
  - First dialog:
    - Page name `spa-home`.
      The root node name is hardcoded in `/spa/lib/pages.js`.
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
2. ~~When creating new page in Magnolia user must provide `Template script` pointing to corresponding page on Next.js server (static or dynamic routing).  
   Possible solution would be to extend `spaExtended` so that base url could be set via configuration and rest of the pathname could be automatically resolved form page name.~~ Solved in SPA renderer extended 1.1
3. ~~In order to make sure that Next.js does not fetch `Template Definitions` outside Magnolia's WYSIWYG we use query parameter `mgnlPreview=false`. We need to remember to add it in `Template script`. Solving point `2` would solve this issue too.~~ Solved in SPA renderer extended 1.1
4. Current implementation of `@magnolia/react-editor` adds placeholders for `Template Annotations`. Placeholders are empty `divs`. Those placeholder are removed in Magnolia's WYSIWYG, but the currently implemented check does not take into account SSR.  
   Generated page includes as many empty `div` elements as areas and components in the page. It needs to be taken into account when styling the page.

## Static generation

Static generation can be used **only** on public instances.

Author instance must have real time generation for the instant preview and WYSIWYG in Pages app.

Using static generation developers must maintain 2 different version of their app. One for author instance and one for public instance.

It could be solved with help of: https://nextjs.org/docs/advanced-features/preview-mode

In order to see static generation working:

1. Follow all Next.js and Magnolia installation steps from this example.
2. Check out to **static-generation** branch.
3. In `/spa/` run `npm run export`. You should have now `out` folder with static pages.
4. Keep in mind that in order to be able to modify content you need to return to `main` branch setup and run Next.js server.

### Differences to server side rendering

1. New `pagesPaths` endpoint. Needed to generate all static paths for slug based [...pages] template.
2. **getStaticProps** used insted of **getServerSideProps**.
