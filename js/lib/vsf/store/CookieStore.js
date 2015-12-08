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
 * CookieStore to manipulate browser cookie, implement Store interface.
 *
 * Inspired by http://www.quirksmode.org/js/cookies.html
 */
(function (vsf) {
  //the maximum length supported by firefox, chrome, opera
  var MAX_SIZE = 4086;

  var CookieStore = function() {

  };

  CookieStore.prototype = new vsf.store.Store();

  // Inspired from: http://www.javascriptkit.com/javatutors/cookiedetect.shtml
  CookieStore.prototype.isSupported = function() {
    var cookieEnabled = navigator.cookieEnabled ? true : false;

    //if not IE4+ nor NS6+
    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
      this.setItem('testcookie', 'testcookie');
      cookieEnabled = this.getItem('testcookie') !== undefined;
      this.removeItem('testcookie');
    }

    //make sure to check this on iframe under safari, a very special case
    if (cookieEnabled) {
      this.setItem('testcookie', 'testcookie');
      var got = this.getItem('testcookie');
      if (!got) {
        cookieEnabled = false;
      }
      this.removeItem('testcookie');
    }

    return cookieEnabled;
  };

  CookieStore.prototype.setItem = function(key, value, expiredDays) {
    if (value === undefined || value === null) {
      return;
    }
    if (!this.isAllowed(key, value)) {
      throw new Error('CookieStore#setItem: not allowed');
    }

    value = encodeURIComponent(value);

    var expires = "";

    if (expiredDays) {
      var date = new Date();
      date.setTime(date.getTime() + (expiredDays * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    }

    document.cookie = key + "=" + value + expires + "; path=/";
  };

  CookieStore.prototype.getItem = function(key) {
    key = key.replace(/\s/g, '\\s');

    var regExp = new RegExp('^' + key + '=');

    var entries = document.cookie.split('; ');

    for (var i = 0, len = entries.length; i < len; i++) {
      var entry = entries[i];
      if (regExp.test(entry)) {
        return decodeURIComponent(entry.replace(regExp, ''));
      }
    }

    return undefined;
  };


  CookieStore.prototype.removeItem = function(key) {
    this.setItem(key, "", -1);
  };

  CookieStore.prototype.findByKey = function(keyRegExp) {
    var originSource = new RegExp(keyRegExp).source;
    keyRegExp = new RegExp(originSource + '=');

    var results = [];

    var entries = document.cookie.split('; ');

    for (var i = 0, len = entries.length; i < len; i++) {
      var entry = entries[i];
      if (keyRegExp.test(entry)) {
        results.push(entry);
      }
    }

    return results;
  };

  CookieStore.prototype.sizeByKey = function(keyRegExp) {
    var count = 0;

    var originSource = new RegExp(keyRegExp).source;
    keyRegExp = new RegExp(originSource + '=');

    var entries = document.cookie.split('; ');

    for (var i = 0, len = entries.length; i < len; i++) {
      if (keyRegExp.test(entries[i])) {
        count += 1;
      }
    }

    return count;
  };

  CookieStore.prototype.size = function() {
    if (document.cookie === '') {
      return 0;
    }
    return document.cookie.split('; ').length;
  };

  CookieStore.prototype.isAllowed = function(key, value) {
    return key.length <= MAX_SIZE && encodeURIComponent(value).length <= MAX_SIZE;
  };

  CookieStore.prototype.clear = function() {
    var entries = document.cookie.split('; ');
    for (var i = 0, len = entries.length; i < len; i++) {
      this.removeItem(entries[i].split("=")[0]);
    }
  };


  vsf.provide('vsf.store.CookieStore', CookieStore);

}).call(this, vsf);