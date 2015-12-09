/*
 * Copyright (C) hoatle
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The logger interface
 */

(function(vsf) {

  var Logger = function() {

  };


  Logger.prototype = {
    isTraceEnabled: function() {
      vsf.raiseRequiredImplementationError('Logger#isTraceEnabled');
    },

    trace: function(msg, throwable) {
      vsf.raiseRequiredImplementationError('Logger#trace');
    },

    isDebugEnabled: function() {
      vsf.raiseRequiredImplementationError('Logger#isDebugEnabled');
    },
    debug: function(msg, throwable) {
      vsf.raiseRequiredImplementationError('Logger#debug');
    },
    isInfoEnabled: function() {
      vsf.raiseRequiredImplementationError('Logger#isInfoEnabled');
    },
    info: function(msg, throwable) {
      vsf.raiseRequiredImplementationError('Logger#info');
    },
    isWarnEnabled: function() {
      vsf.raiseRequiredImplementationError('Logger#isWarnEnabled');
    },
    warn: function(msg, throwable) {
      vsf.raiseRequiredImplementationError('Logger#warn');
    },
    isErrorEnabled: function() {
      vsf.raiseRequiredImplementationError('Logger#isErrorEnabled');
    },
    error: function(msg, throwable) {
      vsf.raiseRequiredImplementationError('Logger#error');
    }
  };


  vsf.provide('vsf.log.Logger', Logger);

}).call(this, vsf);