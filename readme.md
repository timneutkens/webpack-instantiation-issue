# Module intance sharing in webpack 4

[Next.js](https://github.com/zeit/next.js) uses a pattern where every route is defined in the `pages` directory. An app can have many pages, for example:

```
- pages
-- page1.js // maps to the /page1 route
-- page2.js // maps to the /page2 route
```

We use webpack to bundle every page as a webpack entrypoint (simplified example):

```
module.exports = {
  entry: {
    'pages/page1': './pages/page1',
    'pages/page2': './pages/page2',
  },
}
```

So every `page` gets their own `page bundle` in the output directory.

When rendering a page we add 3 script tags:

- The Next.js core runtime
- The App component runtime
- The page bundle, for example, when requesting `/page1` the `pages/page1.js` is added as a script tag

All these import the same module called `next/router`, this is the client side router Next.js uses to do client side transitions of pages. For example when you open https://zeit.co and click around the top menu we'll load the next page bundle (script tag) on demand

The `next/router` module expects to be a singleton instance.

When using webpack 3 we implement the `CommonsChunkPlugin` to bundle modules used in 50% of all pages, which includes `next/router`. This all works fine and the same instance is provided when requiring `next/router`.

After upgrading to webpack 4 we obviously had to remove the `CommonsChunkPlugin` and implement `splitChunks`. Copying the configuration was relatively easy and the modules got bundled correctly, except our singleton router got instantiated multiple times.

I started by tracking down why the module got loaded multiple times and came to the conclusion that the loaded modules cache, namely `var installedModules =` is being included into every entrypoint in webpack 4, whereas in webpack 3 that specific bit of common runtime code got sent into the `CommonsChunkPlugin` bundle, making instances only load once instead of multiple times.

My main question being: is this expected? Should we bind the "singleton" instance to `window` so that it will be the same across multiple module instances, or is this a regression/bug?

I can imagine that there are more applications having multiple entrypoints on one page that are using the same module in both bundles, for example React components etc. Which could lead to unexpected results.
