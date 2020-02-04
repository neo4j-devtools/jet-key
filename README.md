# JET-Key

A library for enabling users to access software features. 

## Similar to a JWT, but without the 

A "JSON Enablement Token" key is the shape of a JWT and signed like a JWT, but with specific fields that are
useful for software. A JWT is used to grant an authenticated user access to a protected resource. A JET is used
to verify that a particular registrant has been granted access to software features. A JWT usually lives for hours
or days. A JET lasts for a year or more. 

## Why? 

The historic battles of software publishers versus pirates are mostly over, yet sometimes the internet is not a thing and people still need to manage who gets access to what. 

This is about "enabling" people to get access to stuff. Not about enforcement or compliance. 

----

# Development

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

## Local Development

Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
