'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'spooky-rentals',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    api: {
      host: 'https://spooky-rentals-api.herokuapp.com',
      namespace: 'api',
    },

    // MAPBOX STUFF
    // ensure this token has the STYLES:TILES scope
    // ensure the access URL is configured in mapbox properly (e.x: patrickmccartney.dev to only allow requests from this domain)
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    // SENTRY_DSN: process.env.SENTRY_DSN,
  };

  if (environment === 'development') {
    ENV.api.host = 'http://localhost:8000';
    ENV['ember-cli-mirage'] = {
      enabled: false,
    };
    ENV['@sentry/ember'] = {
      sentry: {},
    };
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    ENV['@sentry/ember'] = {
      sentry: {},
    };

    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    ENV['@sentry/ember'] = {
      sentry: {
        dsn: process.env.SENTRY_DSN,
        tracesSampleRate: 1.0,
      },
    };
  }

  return ENV;
};
