# DOCUMENTATION

## Scripts
- `npm run build` builds app bundles
- `npm run dev` starts webpack dev server version of app
- `npm start` starts express server with app, remember to build first
- `npm run lint --fix` fixes code semantics

## Developers hints
#### USEFUL METHODS:
- `sr/store/auth/utility`:
  - __authSafeCall__ - prevents token expiration during api request (_ADVICED!_ for simple requests) 
- `src/api/methods`:
  - gatewayWorkflow - common implementation of gateways
  - authGet, authPost - added Authorization header (if token available)


