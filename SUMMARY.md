# Project Summary

## Product URL Routing (`/#product-url-routing`)

Product pages now use the URL format `/{Categoria}/{slug}-{id}`.

- Client-side navigation uses the History API to push the new product URL.
- `showDetail` clicks now call `navigateToProductId`.
- `goHome` resets the URL (back to the home route).
- Server-side: `app.use()` provides an SPA fallback so direct loads/refreshes of product URLs still serve the app.

## Express 5 SPA Fallback Fix (`/#express-5-spa-fallback`)

Express 5 changed route matching so the old `app.get('*')` catch-all no longer works for SPA fallbacks. The fallback must be implemented with `app.use()` middleware instead of `app.get('*')`.
