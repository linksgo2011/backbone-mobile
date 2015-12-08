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
 * Store interface for local or cookie storage
 */

(function() {

  var Store = function() {

  };

  Store.prototype = {
    /**
     * Checks if the implementation store is currently enabled.
     *
     * @return {Boolean}
     */
    isSupported: function() {
      return false;
    },
    /**
     * Checks if a store key is available.
     *
     * @param name the required key
     * @return {Boolean}
     */
    hasItem: function(key) {
      return this.getItem(key) !== undefined;
    },
    setItem: function(key, value) {
      vsf.raiseRequiredImplementationError('Store#setItem');
    },
    getItem: function(key) {
      vsf.raiseRequiredImplementationError('Store#getItem');
    },
    removeItem: function(key) {
      vsf.raiseRequiredImplementationError('Store#removeItem');
    },
    findByKey: function(keyRegExp) {
      vsf.raiseRequiredImplementationError('Store#findByKey');
    },
    sizeByKey: function(keyRegExp) {
      vsf.raiseRequiredImplementationError('Store#sizeByKey');
    },

    size: function() {
      vsf.raiseRequiredImplementationError('Store#size');
    },

    isAllowed: function(key, value) {
      vsf.raiseRequiredImplementationError('Store#isAllowed');
    },
    clear: function() {
      vsf.raiseRequiredImplementationError('Store#clear');
    }
  };

  vsf.provide('vsf.store.Store', Store);

}).call(this, vsf);