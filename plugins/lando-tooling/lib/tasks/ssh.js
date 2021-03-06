/**
 * Command to destroy a lando app
 *
 * @name destroy
 */

'use strict';

module.exports = function(lando) {

  // Modules
  var _ = lando.node._;

  // The task object
  return {
    command: 'ssh [appname] [service]',
    describe: 'SSH into [service] in current app directory or [appname]',
    options: {
      command: {
        describe: 'Run a command in the service',
        alias: ['c']
      },
      user: {
        describe: 'Run as a specific user',
        alias: ['u']
      }
    },
    run: function(options) {

      // Handle our options
      if (!_.has(options, 'service') && _.has(options, 'appname')) {
        options.service = options.appname;
        options.appname = undefined;
      }

      // Try to get the app if we can
      return lando.app.get(options.appname)

      // Handle app or no app
      .then(function(app) {

        // We have an app so lets try to build a ssh exec
        if (app) {

          // Default to appserver if we have no second arg
          var service = options.service || 'appserver';

          // Build out our run
          var run = {
            id: [app.dockerName, service, '1'].join('_'),
            compose: app.compose,
            project: app.name,
            cmd: options.command || 'cd $LANDO_MOUNT && bash',
            opts: {
              app: app,
              mode: 'attach',
              user: options.user || 'root',
              services: [service]
            }
          };

          // Let's check to see if the app has been started
          return lando.app.isRunning(app)

          // If not let's make sure we start it
          .then(function(isRunning) {
            if (!isRunning) {
              return lando.app.start(app);
            }
          })

          // Exec
          .then(function() {
            return lando.engine.run(run);
          });

        }

        // Warn user we couldn't find an app
        else {
          lando.log.warn('Could not find app in this dir');
        }

      });

    }
  };

};
