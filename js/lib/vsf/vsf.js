/**
 * The top most vsf lib
 */

(function() {
  var root = this;

  var vsf = {
    /**
     * Exports a module (literal object or class) with a name space.
     *
     * A shortcut to create a namespace and maps that namespace to a defined object (usually, a literal object or a class).
     *
     * For example:
     *
     * var Test = function() {};
     *
     * //exports Test to vsf.test namespace
     * var vsf = window.vsf || {};
     * vsf.test = vsf.test || {};
     * vsf.test.Test = Test;
     *
     * The above code will be very compact and useful by using vsf.provide:
     *
     * var Test = function() {};
     * vsf.provide('vsf.test.Test', Test);
     *
     *
     * @param namespace the namespace with x.y.z format
     * @param module the associated object with the specified namespace
     */
    provide: function(namespace, module) {
      if (!namespace || !module) {
        return;
      }

      var names = namespace.split('.');
      var tempNamespace = root;

      for (var i = 0, len = names.length; i < len; i++) {
        if (i == (len - 1)) {
          //the last one
          tempNamespace[names[i]] = module;
        } else {
          tempNamespace = tempNamespace[names[i]] = tempNamespace[names[i]] || {};
        }
      }
    },
    raiseRequiredImplementationError: function (methodName) {
      throw new Error(methodName + ' is required to be implemented!');
    },
    /**
     * Gets the registered implementation of a module.
     *
     * For example:
     *
     * var logger = vsf.require('vsf.log.Logger'); //this will provide the registered implementation of Logger.
     *
     * @param module the module.
     */
    require: function(module) {

    },
    register: function(module, impl) {

    }
  };

  root.vsf = vsf;

  //AMD
  if ( typeof define === "function") {
    define(function() {
      return vsf;
    });
  }

}).call(this);