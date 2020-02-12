#!/usr/bin/env node

const prompts = require('prompts');
const jet = require('../dist')
var moment = require('moment');

const now = moment();

require('yargs')
  .scriptName("jet-key")
  .usage('$0 <cmd> [args]')
  .command('payload', 'generate an unsigned payload', (yargs) => {
    yargs.option('name', {
      type: 'string',
      describe: 'full name of the registrant'
    })
    .option('email', {
      type: 'string',
      describe: 'email address of the registrant'
    })
    .option('org', {
      type: 'string',
      describe: 'email address of the registrant'
    })
    .option('sub', {
      type: 'string',
      describe: 'unique identity of the registrant'
    })
    .group(['name','email','org', 'sub'], 'Registrant info:')

    .option('pub', {
      type: 'string',
      describe: 'full name of the application publisher'
    })
    .option('aud', {
      type: 'string',
      describe: 'publisher/application that will receive the key'
    })
    .option('ver', {
      type: 'string',
      describe: 'semver range of the valid application versions'
    })
    .option('scope', {
      type: 'string',
      describe: 'application specific grants unlocked by the key'
    })
    .option('nbf', {
      type: 'string',
      describe: 'moment before the key becomes valid (ISO 8601 date)'
    }).coerce('nbf', (arg) => moment(arg).toDate())
    .option('exp', {
      type: 'string',
      describe: 'moment when the key becomes invalid (ISO 8601 date)'
    })
    .group(['pub', 'aud', 'ver', 'scope', 'nbf', 'exp'], 'Application info:')
    .option('extension', )
  }, function (argv) {
    prompts.override(argv);
 
      (async () => {
        const response = await prompts([
          {
            type: 'text',
            name: 'iss',
            message: 'Organization issuing this key',
            validate: s => jet.isStringOrUri(s) ? true : 'Either a plain string or a URI'
          },
          {
            type: 'text',
            name: 'pub',
            initial: prev => prev,
            message: `Who is the application publisher?`,
            validate: s => jet.isStringOrUri(s) ? true : 'Either a plain string or a URI'
          },
          {
            type: 'text',
            name: 'aud',
            message: `What is the application identifier?`,
            validate: s => (s.length > 0)
          },
          {
            type: 'text',
            name: 'ver',
            initial: prev => '1.x',
            message: `What is the semver range of the applcation version?`,
            validate: ver => jet.isSemverRange(ver) ? true : 'Invalid semver'
          },
          {
            type: 'text',
            name: 'name',
            message: `What's the registrant's full name?`,
            validate: s => (s.length > 0)
          },
          {
            type: 'text',
            name: 'email',
            message: `What's the registrant's email address?`,
            validate: email => jet.isEmail(email) ? true : 'Invalid email',
          },
          {
            type: 'text',
            name: 'sub',
            message: `What is the registrant's unique user id?`,
            validte: sub => jet.isPipedString(sub) ? true : 'Should look like "twitter|akollegger'
          },
          {
            type: 'text',
            name: 'org',
            message: `What's the registrant's organization?`,
            validate: s => jet.isStringOrUri(s) ? true : 'Either a plain string or a URI'
          },
          {
            type: 'date',
            name: 'nbf',
            message: 'Not valid before',
            initial: new Date(),
            mask: "YYYY-MM-DD",
            validate: date => now.isBefore(date) ? true : 'Not in the past',
            format: date => moment(date).unix()
          },
          {
            type: 'date',
            name: 'exp',
            message: 'Expires after',
            initial: moment().add(1, 'y').toDate(),
            mask: "YYYY-MM-DD",
            validate: date => now.add(1, 'day').isBefore(date) ? true : 'At least 1 day',
            format: date => moment(date).unix()
          }
        ]);
      
        const payload = jet.registration(response);
        console.dir(payload);
      })();
  })
  .help()
  .argv
