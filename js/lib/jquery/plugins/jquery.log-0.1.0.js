/**
 * jQuery log plugin.
 *
 * By default, the log level is set to 'trace'. This is good for development.
 * On production mode, need to change it to 'info' with: $.log.setLevel('info').
 *
 * APIs:
 * $.log(level, msg [,msg]) or shortcut: $.trace, $.info, $.warn, $.error.
 *
 * $.log(level, msg [, msg]) in which:
 * level: one of 'trace', 'info', 'warn', 'error'.
 * msg: any javascript object
 *
 * or $(selector).log(level, msg [,msg]) or shortcut: $().trace, $().info, $().warn, $().error.
 *
 */

(function (factory) {
  'use strict';

  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(
      [
        'jquery'
      ], function ($) {
        factory($);
        return $;
      }
    );
  } else {
    // Browser globals
    factory(this.jQuery);
  }

}).call(this, function($) {

    /**
     * All supported log levels.
     *
     * @type {Object}
     */
    var LEVEL = {
      TRACE: 0,
      DEBUG: 1,
      INFO: 2,
      WARN: 3,
      ERROR: 4
    };

    /**
     * The default log level is 'TRACE'.
     *
     * @type {Number}
     */
    var allowedLevel = LEVEL.TRACE;

    /**
     * The main logging method.
     *
     * @param level
     * @param msg
     * @param obj
     * @return {*}
     */
    var log = function (level, msg, obj) {

      if (window.console) {

        var logMethod;

        if (level !== 'trace') {
          logMethod = console[level];
        }

        if (!logMethod) {
          logMethod = console.log;
        }

        //see more: http://stackoverflow.com/questions/5472938/does-ie9-support-console-log-and-is-it-a-real-function
        var logger = Function.prototype.call.bind(logMethod, console);


        if (obj) {
          logger.call(console, "[%s] %s: %o", level.toUpperCase(), msg, obj);
        } else {
          logger.call(console, "[%s] %s", level.toUpperCase(), msg);
        }

        //stack tracing for the error log
        if ((level === 'error' || level === 'warn') && console.trace) {
          console.trace();
        }
      }

      //keep chaining
      return this;
    };

    /**
     * Exposes log levels.
     *
     * @type {Object}
     */
    log.LEVEL = LEVEL;

    /**
     * Sets the log level for logging or not.
     * By default, all levels are logged.
     * On production mode, need to change it to higher level, recommended: $.log.setLevel($.log.LEVEL.INFO);
     *
     * @param newAllowedLevel recommend using constants of: $.log.LEVEL.TRACE to $.log.LEVEL.ERROR
     *                        can be string: 'TRACE', 'DEBUG', 'INFO', 'WARN' or 'ERROR'.
     *                        can be number between 0 (TRACE) to 4 (ERROR).
     */
    log.setLevel = function (newAllowedLevel) {
      if (isNaN(newAllowedLevel) && !isNaN(LEVEL[newAllowedLevel])) {
        allowedLevel = LEVEL[newAllowedLevel];
      } else if (LEVEL.TRACE <= newAllowedLevel && newAllowedLevel <= LEVEL.ERROR) {
        allowedLevel = newAllowedLevel;
      }
    };

    /**
     * The shortcut methods for logging.
     *
     * @type {Array}
     */
    var methods = ['trace', 'debug', 'info', 'warn', 'error'];

    for (var i = 0, len = methods.length; i < len; i++) {
      $[methods[i]] = $.fn[methods[i]] = (function (level) {
        return function () {
          if (LEVEL[level.toUpperCase()] >= allowedLevel) {
            var args = [].slice.call(arguments);
            args.splice(0, 0, level);
            return log.apply(this, args);
          }
        }
      })(methods[i]);
    }

    $.log = $.fn.log = log;
  }
);