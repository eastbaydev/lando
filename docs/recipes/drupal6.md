Drupal 6
========

[Drupal 6](https://www.drupal.org/drupal-6.0) is an open source platform and content management system for building amazing digital experiences. It's made by a dedicated community. Anyone can use it, and it will always be free.

You can easily boot up a best practices stack to run and develop Drupal 6 by adding the following to your app's `.lando.yml`.

```yml
name: myapp
recipe: drupal6
```

You can easily configure/override the Drupal 6 recipe and add in additional `.lando.yml` config such as `services`, `tooling`, and `proxy setting`.

Example
-------

{% codesnippet "./../examples/drupal6/.lando.yml" %}{% endcodesnippet %}

You will need to rebuild your app with `lando rebuild` to apply the changes to this file. You can check out the full code for this example [over here](https://github.com/kalabox/lando/tree/master/examples/drupal7-2).

Installing Drupal
-----------------

You will need to make sure you [extract Drupal 6](https://api.drupal.org/api/drupal/INSTALL.txt/6.x) into either your application root directory or the subdirectory specified by `webroot` in your recipe config.

You will also want to scope out your database credentials (see [below](#getting-service-information)) so you can be prepped to enter them during the drupal installation. You will want to use `internal_connection` information.

If you want to see an example, you can use the [example above](https://github.com/kalabox/lando/tree/master/examples/drupal6) to get started.

```bash
# Get the lando example
git clone https://github.com/kalabox/lando.git
cd lando/examples/drupal6

# Start the app up
lando start

# Get your database credentials
lando info

# Visit https://d6.lndo.site to complete your installation.

# Check the status of your site with drush
lando drush status
```

Environment Variables
---------------------

Lando will add some helpful environment variables into your `appserver` so you can get database credential information. These are in addition to the [default variables](./../config/services.md#environment) that we inject into every container. These are accessible via `php`'s [`getenv()`](http://php.net/manual/en/function.getenv.php) function.

```bash
DB_HOST=database
DB_USER=drupal6
DB_PASSWORD=drupal6
DB_NAME=drupal6
DB_PORT=3306
```

Getting Service Information
---------------------------

You can get more in-depth information about the services this recipe provides by running `lando info`.

```bash
# Navigate to the app
cd /path/to/app

# Get info (app needs to be running to get this)
lando info

{
  "appserver": {
    "type": "php",
    "version": "5.6",
    "via": "apache",
    "webroot": ".",
    "urls": [
      "https://localhost:32911",
      "http://localhost:32912",
      "http://d6.lndo.site",
      "https://d6.lndo.site"
    ]
  },
  "database": {
    "type": "mysql",
    "version": "latest",
    "creds": {
      "user": "drupal6",
      "password": "drupal6",
      "database": "drupal6"
    },
    "internal_connection": {
      "host": "database",
      "port": 3306
    },
    "external_connection": {
      "host": "localhost",
      "port": true
    }
  }
}
```

### Getting Tooling Information

You can get more in-depth information about the tooling this recipe provides by running `lando`.

```bash
# Navigate to the app
cd /path/to/app

# Get list of available commands
lando

Usage: lando <command> [args] [options] [-- global options]

Commands:
  config                   Display the lando configuration
  destroy [appname]        Destroy app in current directory or [appname]
  info [appname]           Prints info about app in current directory or [appname]
  list                     List all lando apps
  logs [appname]           Get logs for app in current directory or [appname]
  poweroff                 Spin down all lando related containers
  rebuild [appname]        Rebuilds app in current directory or [appname]
  restart [appname]        Restarts app in current directory or [appname]
  start [appname]          Start app in current directory or [appname]
  stop [appname]           Stops app in current directory or [appname]
  version                  Display the lando version
  ssh [appname] [service]  SSH into [service] in current app directory or [appname]
  composer                 Run composer commands
  php                      Run php commands
  mysql                    Drop into a MySQL shell
  drush                    Run Drush commands

Global Options:
  --help, -h  Show help
  --verbose, -v, -vv, -vvv, -vvvv  Change verbosity of output

You need at least one command before moving on
```
