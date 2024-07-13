var NO_ASYNC_GET_STATUS = NO_ASYNC_GET_STATUS || false;

/*	ES5 Function.prototype.bind via:

 NOTE:
 Technically, this is ES5, but browser support has been rather spotty -
 it became supported in Safari/iOS 6+, Android 4+, IE 9+ so it is
 better. to list it here, rather than besides the other ES5 polyfills
 */
if (!Function.prototype.bind) { Function.prototype.bind = function (e) { if (typeof this !== "function") { throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable") } var t = Array.prototype.slice.call(arguments, 1), n = this, r = function () { }, i = function () { return n.apply(this instanceof r && e ? this : e, t.concat(Array.prototype.slice.call(arguments))) }; r.prototype = this.prototype; i.prototype = new r; return i } }

// classList.js: element.classList polyfill by Eli Grey (mainly for IE<10) via https://developer.mozilla.org/en-US/docs/Web/API/Element.classList
if ("document" in self) { if (!("classList" in document.createElement("_"))) { (function (e) { "use strict"; if (!("Element" in e)) return; var t = "classList", n = "prototype", r = e.Element[n], i = Object, s = String[n].trim || function () { return this.replace(/^\s+|\s+$/g, "") }, o = Array[n].indexOf || function (e) { var t = 0, n = this.length; for (; t < n; t++) { if (t in this && this[t] === e) { return t } } return -1 }, u = function (e, t) { this.name = e; this.code = DOMException[e]; this.message = t }, a = function (e, t) { if (t === "") { throw new u("SYNTAX_ERR", "An invalid or illegal string was specified") } if (/\s/.test(t)) { throw new u("INVALID_CHARACTER_ERR", "String contains an invalid character") } return o.call(e, t) }, f = function (e) { var t = s.call(e.getAttribute("class") || ""), n = t ? t.split(/\s+/) : [], r = 0, i = n.length; for (; r < i; r++) { this.push(n[r]) } this._updateClassName = function () { e.setAttribute("class", this.toString()) } }, l = f[n] = [], c = function () { return new f(this) }; u[n] = Error[n]; l.item = function (e) { return this[e] || null }; l.contains = function (e) { e += ""; return a(this, e) !== -1 }; l.add = function () { var e = arguments, t = 0, n = e.length, r, i = false; do { r = e[t] + ""; if (a(this, r) === -1) { this.push(r); i = true } } while (++t < n); if (i) { this._updateClassName() } }; l.remove = function () { var e = arguments, t = 0, n = e.length, r, i = false, s; do { r = e[t] + ""; s = a(this, r); while (s !== -1) { this.splice(s, 1); i = true; s = a(this, r) } } while (++t < n); if (i) { this._updateClassName() } }; l.toggle = function (e, t) { e += ""; var n = this.contains(e), r = n ? t !== true && "remove" : t !== false && "add"; if (r) { this[r](e) } if (t === true || t === false) { return t } else { return !n } }; l.toString = function () { return this.join(" ") }; if (i.defineProperty) { var h = { get: c, enumerable: true, configurable: true }; try { i.defineProperty(r, t, h) } catch (p) { if (p.number === -2146823252) { h.enumerable = false; i.defineProperty(r, t, h) } } } else if (i[n].__defineGetter__) { r.__defineGetter__(t, c) } })(self) } else { (function () { "use strict"; var e = document.createElement("_"); e.classList.add("c1", "c2"); if (!e.classList.contains("c2")) { var t = function (e) { var t = DOMTokenList.prototype[e]; DOMTokenList.prototype[e] = function (e) { var n, r = arguments.length; for (n = 0; n < r; n++) { e = arguments[n]; t.call(this, e) } } }; t("add"); t("remove") } e.classList.toggle("c3", false); if (e.classList.contains("c3")) { var n = DOMTokenList.prototype.toggle; DOMTokenList.prototype.toggle = function (e, t) { if (1 in arguments && !this.contains(e) === !t) { return t } else { return n.call(this, e) } } } e = null })() } }

/*	ES6 Promises polyfill via: https://github.com/jakearchibald/es6-promise

 NOTE:
 Catch is a reserved word in IE<10, meaning promise.catch(func) throws a syntax error.
 To work around this, use .then instead: promise.then(undefined, function(err) {});
 */
!function () { var a, b, c, d; !function () { var e = {}, f = {}; a = function (a, b, c) { e[a] = { deps: b, callback: c } }, d = c = b = function (a) { function c(b) { if ("." !== b.charAt(0)) return b; for (var c = b.split("/"), d = a.split("/").slice(0, -1), e = 0, f = c.length; f > e; e++) { var g = c[e]; if (".." === g) d.pop(); else { if ("." === g) continue; d.push(g) } } return d.join("/") } if (d._eak_seen = e, f[a]) return f[a]; if (f[a] = {}, !e[a]) throw new Error("Could not find module " + a); for (var g, h = e[a], i = h.deps, j = h.callback, k = [], l = 0, m = i.length; m > l; l++)"exports" === i[l] ? k.push(g = {}) : k.push(b(c(i[l]))); var n = j.apply(this, k); return f[a] = g || n } }(), a("promise/all", ["./utils", "exports"], function (a, b) { "use strict"; function c(a) { var b = this; if (!d(a)) throw new TypeError("You must pass an array to all."); return new b(function (b, c) { function d(a) { return function (b) { f(a, b) } } function f(a, c) { h[a] = c, 0 === --i && b(h) } var g, h = [], i = a.length; 0 === i && b([]); for (var j = 0; j < a.length; j++)g = a[j], g && e(g.then) ? g.then(d(j), c) : f(j, g) }) } var d = a.isArray, e = a.isFunction; b.all = c }), a("promise/asap", ["exports"], function (a) { "use strict"; function b() { return function () { process.nextTick(e) } } function c() { var a = 0, b = new i(e), c = document.createTextNode(""); return b.observe(c, { characterData: !0 }), function () { c.data = a = ++a % 2 } } function d() { return function () { j.setTimeout(e, 1) } } function e() { for (var a = 0; a < k.length; a++) { var b = k[a], c = b[0], d = b[1]; c(d) } k = [] } function f(a, b) { var c = k.push([a, b]); 1 === c && g() } var g, h = "undefined" != typeof window ? window : {}, i = h.MutationObserver || h.WebKitMutationObserver, j = "undefined" != typeof global ? global : void 0 === this ? window : this, k = []; g = "undefined" != typeof process && "[object process]" === {}.toString.call(process) ? b() : i ? c() : d(), a.asap = f }), a("promise/config", ["exports"], function (a) { "use strict"; function b(a, b) { return 2 !== arguments.length ? c[a] : (c[a] = b, void 0) } var c = { instrument: !1 }; a.config = c, a.configure = b }), a("promise/polyfill", ["./promise", "./utils", "exports"], function (a, b, c) { "use strict"; function d() { var a; a = "undefined" != typeof global ? global : "undefined" != typeof window && window.document ? window : self; var b = "Promise" in a && "resolve" in a.Promise && "reject" in a.Promise && "all" in a.Promise && "race" in a.Promise && function () { var b; return new a.Promise(function (a) { b = a }), f(b) }(); b || (a.Promise = e) } var e = a.Promise, f = b.isFunction; c.polyfill = d }), a("promise/promise", ["./config", "./utils", "./all", "./race", "./resolve", "./reject", "./asap", "exports"], function (a, b, c, d, e, f, g, h) { "use strict"; function i(a) { if (!v(a)) throw new TypeError("You must pass a resolver function as the first argument to the promise constructor"); if (!(this instanceof i)) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."); this._subscribers = [], j(a, this) } function j(a, b) { function c(a) { o(b, a) } function d(a) { q(b, a) } try { a(c, d) } catch (e) { d(e) } } function k(a, b, c, d) { var e, f, g, h, i = v(c); if (i) try { e = c(d), g = !0 } catch (j) { h = !0, f = j } else e = d, g = !0; n(b, e) || (i && g ? o(b, e) : h ? q(b, f) : a === D ? o(b, e) : a === E && q(b, e)) } function l(a, b, c, d) { var e = a._subscribers, f = e.length; e[f] = b, e[f + D] = c, e[f + E] = d } function m(a, b) { for (var c, d, e = a._subscribers, f = a._detail, g = 0; g < e.length; g += 3)c = e[g], d = e[g + b], k(b, c, d, f); a._subscribers = null } function n(a, b) { var c, d = null; try { if (a === b) throw new TypeError("A promises callback cannot return that same promise."); if (u(b) && (d = b.then, v(d))) return d.call(b, function (d) { return c ? !0 : (c = !0, b !== d ? o(a, d) : p(a, d), void 0) }, function (b) { return c ? !0 : (c = !0, q(a, b), void 0) }), !0 } catch (e) { return c ? !0 : (q(a, e), !0) } return !1 } function o(a, b) { a === b ? p(a, b) : n(a, b) || p(a, b) } function p(a, b) { a._state === B && (a._state = C, a._detail = b, t.async(r, a)) } function q(a, b) { a._state === B && (a._state = C, a._detail = b, t.async(s, a)) } function r(a) { m(a, a._state = D) } function s(a) { m(a, a._state = E) } var t = a.config, u = (a.configure, b.objectOrFunction), v = b.isFunction, w = (b.now, c.all), x = d.race, y = e.resolve, z = f.reject, A = g.asap; t.async = A; var B = void 0, C = 0, D = 1, E = 2; i.prototype = { constructor: i, _state: void 0, _detail: void 0, _subscribers: void 0, then: function (a, b) { var c = this, d = new this.constructor(function () { }); if (this._state) { var e = arguments; t.async(function () { k(c._state, d, e[c._state - 1], c._detail) }) } else l(this, d, a, b); return d }, "catch": function (a) { return this.then(null, a) } }, i.all = w, i.race = x, i.resolve = y, i.reject = z, h.Promise = i }), a("promise/race", ["./utils", "exports"], function (a, b) { "use strict"; function c(a) { var b = this; if (!d(a)) throw new TypeError("You must pass an array to race."); return new b(function (b, c) { for (var d, e = 0; e < a.length; e++)d = a[e], d && "function" == typeof d.then ? d.then(b, c) : b(d) }) } var d = a.isArray; b.race = c }), a("promise/reject", ["exports"], function (a) { "use strict"; function b(a) { var b = this; return new b(function (b, c) { c(a) }) } a.reject = b }), a("promise/resolve", ["exports"], function (a) { "use strict"; function b(a) { if (a && "object" == typeof a && a.constructor === this) return a; var b = this; return new b(function (b) { b(a) }) } a.resolve = b }), a("promise/utils", ["exports"], function (a) { "use strict"; function b(a) { return c(a) || "object" == typeof a && null !== a } function c(a) { return "function" == typeof a } function d(a) { return "[object Array]" === Object.prototype.toString.call(a) } var e = Date.now || function () { return (new Date).getTime() }; a.objectOrFunction = b, a.isFunction = c, a.isArray = d, a.now = e }), b("promise/polyfill").polyfill() }();

// Deferred promise polyfill/helper
(function (P) { if (P) { P.defer = function () { p = new Promise(function (rs, rj) { return { promise: p, resolve: rs, reject: rj } }) } } })(this.Promise);

// WhatWG Fetch API polyfill 0.6.0 (2015-01-15) via github.com/github/fetch
// Avoid FormData methods if you are targeting IE<10 (& response.formData)
(function () { "use strict"; function e(t) { this.map = {}; var n = this; if (t instanceof e) { t.forEach(function (e, t) { t.forEach(function (t) { n.append(e, t) }) }) } else if (t) { Object.getOwnPropertyNames(t).forEach(function (e) { n.append(e, t[e]) }) } } function t(e) { if (e.bodyUsed) { return Promise.reject(new TypeError("Already read")) } e.bodyUsed = true } function n(e) { return new Promise(function (t, n) { e.onload = function () { t(e.result) }; e.onerror = function () { n(e.error) } }) } function r(e) { var t = new FileReader; t.readAsArrayBuffer(e); return n(t) } function i(e) { var t = new FileReader; t.readAsText(e); return n(t) } function o() { this.bodyUsed = false; if (s) { this.blob = function () { var e = t(this); return e ? e : Promise.resolve(this._bodyBlob) }; this.arrayBuffer = function () { return this.blob().then(r) }; this.text = function () { return this.blob().then(i) } } else { this.text = function () { var e = t(this); return e ? e : Promise.resolve(this._bodyText) } } if ("FormData" in self) { this.formData = function () { return this.text().then(l) } } this.json = function () { return this.text().then(JSON.parse) }; return this } function a(e) { var t = e.toUpperCase(); return u.indexOf(t) > -1 ? t : e } function f(t, n) { n = n || {}; this.url = t; this._body = n.body; this.credentials = n.credentials || "omit"; this.headers = new e(n.headers); this.method = a(n.method || "GET"); this.mode = n.mode || null; this.referrer = null } function l(e) { var t = new FormData; e.trim().split("&").forEach(function (e) { if (e) { var n = e.split("="); var r = n.shift().replace(/\+/g, " "); var i = n.join("=").replace(/\+/g, " "); t.append(decodeURIComponent(r), decodeURIComponent(i)) } }); return t } function c(t) { var n = new e; var r = t.getAllResponseHeaders().trim().split("\n"); r.forEach(function (e) { var t = e.trim().split(":"); var r = t.shift().trim(); var i = t.join(":").trim(); n.append(r, i) }); return n } function h(e, t) { if (!t) { t = {} } if (s) { if (typeof e === "string") { this._bodyBlob = new Blob([e]) } else { this._bodyBlob = e } } else { this._bodyText = e } this.type = "default"; this.url = null; this.status = t.status; this.statusText = t.statusText; this.headers = t.headers; this.url = t.url || "" } if (self.fetch) { return } e.prototype.append = function (e, t) { e = e.toLowerCase(); var n = this.map[e]; if (!n) { n = []; this.map[e] = n } n.push(t) }; e.prototype["delete"] = function (e) { delete this.map[e.toLowerCase()] }; e.prototype.get = function (e) { var t = this.map[e.toLowerCase()]; return t ? t[0] : null }; e.prototype.getAll = function (e) { return this.map[e.toLowerCase()] || [] }; e.prototype.has = function (e) { return this.map.hasOwnProperty(e.toLowerCase()) }; e.prototype.set = function (e, t) { this.map[e.toLowerCase()] = [t] }; e.prototype.forEach = function (e) { var t = this; Object.getOwnPropertyNames(this.map).forEach(function (n) { e(n, t.map[n]) }) }; var s = "FileReader" in self && "Blob" in self && function () { try { new Blob; return true } catch (e) { return false } }(); var u = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"]; f.prototype.fetch = function () { var e = this; return new Promise(function (t, n) { var r = new XMLHttpRequest; r.onload = function () { var e = r.status === 1223 ? 204 : r.status; if (e < 100 || e > 599) { n(new TypeError("Network request failed")); return } var i = { status: e, statusText: r.statusText, headers: c(r), url: r.responseURL || r.getResponseHeader("X-Request-URL") }; t(new h(s ? r.response : r.responseText, i)) }; r.onerror = function () { n(new TypeError("Network request failed")) }; r.open(e.method, e.url, true); if (s) { r.responseType = "blob" } e.headers.forEach(function (e, t) { t.forEach(function (t) { r.setRequestHeader(e, t) }) }); r.send(e._body === undefined ? null : e._body) }) }; o.call(f.prototype); o.call(h.prototype); self.Headers = e; self.Request = f; self.Response = h; self.fetch = function (e, t) { return (new f(e, t)).fetch() }; self.fetch.polyfill = true })();

var APP = (function () {

    function init() {
        if (APP.Main.init()) {
            //APP.Helpers.init(); // no init required, just here for reference
            APP.Form.init();
            APP.Text.init();
            APP.Behaviors.init(); // init custom behaviors
            APP.ListPage.init();
            APP.Overlay.init(); //Lightbox overlay
            APP.Mobile.init();
            APP.ImgAnim.init();
            APP.HeaderMenu.init();
            APP.DeezerPlaylist.init();

            APP.Flyer.init();
            APP.CookieWarning.init();

            // Pinterest integration
            APP.Pinterest.init();

            // Init add-on modules
            window.APPModules = window.APPModules || {};
            var m;
            for (m in APPModules) if (APPModules.hasOwnProperty(m) && typeof APPModules[m].init === 'function') {
                APPModules[m].init.call(APPModules[m]); // init module
            }
        }
    }

    return {
        init: init
    };

})();

APP.Main = (function () {

    function init() {
        if (typeof $ !== 'function') {
            console.log('Warning! jQuery not found, app init failed.');
            return false;
        }

        if (typeof $ !== 'function') {
            console.log('Warning! jQuery not found, app init failed.');
            return false;
        }

        $('html').removeClass('no-js');

        if ($('#carousel').length >= 1) {
            carousel(document.getElementById('carousel'));
        }

        $('.promo').each(function (i, el) {
            promo(el, $(el));
        });

        if ("hint" in $)
            $.hint('.hashint', { autoWidth: true });

        anchorFix();

        supertrialBackButton();

        callbackform();

        easygallery();

        trackLinks();

        trackWhatever();

        if ('scrollable' in $('.scrollable')) {
            $('.scrollable').scrollable();
        }

        $('[data-href]').click(function (e) {
            if ($(this).data('href').length <= 1) { return false; }
            window.location = $(this).data('href');
        });

        return true;
    }

    function trackWhatever() {
        if (typeof (ga) == 'undefined') { return false; }
        $('[data-gacategory]').click(function (e) {
            var $this = $(this);
            var gacategory = $this.data('gacategory') || '';
            var gaaction = $this.data('gaaction') || '';
            var galabel = $this.data('galabel') || '';
            if (gacategory != '') {
                ga('send', '_trackEvent', gacategory, gaaction, galabel);
            }
        });
    }

    function trackLinks() {
        // insex-refres
        $('.index-refresh .help-list a').click(function () {
            ga('send', '_trackEvent', 'Homepage', 'Direct Button Click', $(this).attr('href'));
        });

        $('.index-refresh .promo-grid a').click(function () {
            ga('send', '_trackEvent', 'Homepage', 'Promo-box Click', $(this).attr('href'));
        });

        $('a').each(function () {
            var $this = $(this);
            var href = $this.attr('href') || '';
            if (href == '') { return true; }

            if ((href.match(/^http/i)) && (!href.match(document.domain))) {
                $(this).click(function () {
                    ga('send', '_trackEvent', 'Homepage', 'Promo-box Click', $(this).attr('href'));
                });
            }
            if (href.match(/^mailto\:/i)) {
                $(this).click(function () {
                    ga('send', '_trackEvent', 'Email', 'Click', this.href.replace(/^mailto\:/i, ''));
                });
            }
            if (href.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx|mp3)$/i)) {
                $(this).click(function () {
                    ga('send', '_trackEvent', 'Download', 'Click-' + this.href.split('.').pop().toLowerCase(), this.href);
                });
            }
        });
    }

    function easygallery() {
        $('.easygallery').on('click', '.thumbs a', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var $this = $(this);
            $this.closest('.easygallery').find('.bigpic').attr('src', $this.attr('href'));
            $this.closest('.easygallery').find('.thumbs a').removeClass('current');
            $this.addClass('current');
            this.blur();
            return false;
        });
        $('.easygallery .thumbs:eq(0)').find('a:eq(0)').trigger('click');
    }

    function anchorFix() {
        var hash = String(window.location).split('#')[1] || '';
        if (hash != '') {
            try {
                var $anchor = $('#' + hash) || [];
                if ($anchor.length > 0) {
                    $anchor.closest('.openable:not(.open)').find('h3').trigger('click');
                    if ($anchor.closest('.tabs-body').length > 0) {
                        setTimeout(function () {
                            $anchor.closest('.tab').find('.tabs-header > a').eq($anchor.closest('.tabs-body').find('div').has('#' + hash).index()).trigger('click');
                        }, 133);
                    }
                    if ($anchor.closest('.collapsible-tabs').length > 0) {
                        setTimeout(function () {
                            $anchor.closest('.collapsible-tabs').find('.tab-bar > li').eq($anchor.closest('.collapsible-tabs').find('div.tab').has('#' + hash).index('div.tab')).trigger('click');
                        }, 133);
                    }
                    setTimeout(function () {
                        $('html, body').scrollTop($anchor.offset().top);
                    }, 266);
                }
            } catch (e) {
                // probably an invalid id/selector in hash
            }
        }

        $('a[href^="#"]').each(function () {
            var $this = $(this);
            var href = $this.attr('href');
            $this.attr('href', String(window.location).split('#')[0] + href);
            $this.data('href', href).addClass('watchhash');
        });

        // _preview fix
        /*if (String(window.location).indexOf('_preview') > 0) {
            $('section.text a:not([href^="#"])').each(function() {
                var $this = $(this);
                var href = $this.attr('href') || '';
                if (href != '') {
                    var url = href.split('#')[0] || '',
                        hash = href.split('#')[1] || '';
                    if (hash != "") {
                        hash = '#' + hash;
                    }
                    $this.attr('href', url + ((url.indexOf('?') < 0) ? '?' : '&') + '_preview' + hash);
                }
            });
        }*/

        $('body').on('click', 'a.watchhash, a[href^="#"]:not([data-has~="event-handler"])', function (e) {
            //e.preventDefault();
            var $this = $(this);
            var href = $this.data('href') || $this.attr('href');
            var $anchor = $(href) || [];
            //$this.attr('href', String(window.location).split('#')[0] + href);
            if ($anchor.length > 0) {
                e.preventDefault();
                $anchor.closest('.openable:not(.open)').find('h3').trigger('click');
                if ($anchor.closest('.tabs-body').length > 0) {
                    $anchor.closest('.tab').find('.tabs-header > a').eq($anchor.closest('.tabs-body').find('div').has(href).index()).trigger('click');
                }
                if ($anchor.closest('.collapsible-tabs').length > 0) {
                    setTimeout(function () {
                        $anchor.closest('.collapsible-tabs').find('.tab-bar > li').eq($anchor.closest('.collapsible-tabs').find('div.tab').has(href).index('div.tab')).trigger('click');
                    }, 133);
                }
                setTimeout(function () {
                    $('html, body').scrollTop($anchor.offset().top);
                }, 266);
            }
            this.blur();
        });
    }

    function posfix($elements) {
        $elements.each(function () {

            var $item = $(this).addClass('posfix').after('<div class="posfix-placeholder"></div>');
            var $itemph = $item.next('.posfix-placeholder');

            $item.data('y0', $item.offset().top);
            $itemph.height($item.outerHeight(false));

            var posfixItem = function () {
                $itemph.height($item.outerHeight(false));
                if ($(window).scrollTop() > $item.data('y0')) {
                    if (!$item.hasClass('posfix-fixed')) {
                        $item.addClass('posfix-fixed');
                        $itemph.addClass('posfix-fixed');
                    }
                } else {
                    if ($item.hasClass('posfix-fixed')) {
                        $item.removeClass('posfix-fixed');
                        $itemph.removeClass('posfix-fixed');
                    }
                }
            };

            posfixItem();

            $(window).scroll(function () {
                posfixItem();
            });

        });
    }

    function supertrialBackButton() {
        var $o;
        if ((String(document.referrer).indexOf('telenorproba') >= 0) && (String(window.location.href).indexOf('telenorproba') < 0)) {
            $o = $('<a href="/telenorproba" class="supertrialback">Telenor Próba</a>')
                .click(function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    history.back();
                    this.blur();
                    return false;
                });
        }
        if ((String(document.referrer).indexOf('telenorproba') > 0) && (String(window.location).indexOf('telenorproba') < 0)) {
            $('body').append($o);
        }
    }

    function callbackform() {
        var callbackResizeTid = 0;

        $('.cboxcontent .field select').each(function () {
            var $this = $(this);
            var $select = $this.closest('.field');
            $this.parent().find('.helper').remove();
            $this.before($('<span class="helper"><span>' + $this.find('option:selected').text() + '</span></span>'));
            $this.change(function () {
                var $this = $(this);
                $this.siblings('.helper').find('span').text($this.find('option:selected').text());
            });
        });

        $('.cboxcontent .field .checkbox input, .cboxcontent .field .radio input').each(function () {
            var $this = $(this);
            $this.closest('.checkbox').addClass(($this.is(':checked')) ? 'checked' : '');
            $this.closest('.radio').addClass(($this.is(':checked')) ? 'checked' : '');
            $this.click(function (e) {
                var $this = $(this);
                if ($this.attr('type') == 'radio') {
                    $this.closest('fieldset').find('input:radio[name=' + $this.attr('name') + ']').closest('.radio').removeClass('checked');
                }
                $this.closest('.checkbox').removeClass('checked').addClass(($this.is(':checked')) ? 'checked' : '');
            });
            $this.closest('fieldset').find('label').mousedown(function (e) {
                e.preventDefault();
            });
        });

        $('tr.radio input[type="radio"]').each(function () {
            var $this = $(this);
            $this.closest('tr.radio').addClass(($this.is(':checked')) ? 'checked' : '');
            $this.click(function (e) {
                var $this = $(this);
                $this.closest('tr.radio').addClass(($this.is(':checked')) ? 'checked' : '');
                $this.closest('table').find('input:radio[name=' + $this.attr('name') + ']:not(:checked)').closest('tr.radio').removeClass('checked');
            });
        });

        $('.cboxcontent .field label.labelin').each(function () {
            var $this = $(this);
            var $input = $this.closest('.field').find('input');
            if ($input.length == 0) {
                return true;
            }
            if ('' != ($input.attr('value') || $input.val())) {
                $this.addClass('hide');
            }

            $this.click(function () {
                var $this = $(this);
                var $input = $this.closest('.field').find('input');
                $input.trigger('focus');
            });
            $input.focus(function () {
                var $this = $(this);
                var $label = $this.closest('.field').find('label');
                $label.addClass('hide');
            });
            $input.blur(function () {
                var $this = $(this);
                var $label = $this.closest('.field').find('label');
                if ('' != ($this.attr('value') || $this.val())) {
                    $label.addClass('hide');
                } else {
                    $label.removeClass('hide');
                }
            });
        });

        if ('ajaxForm' in $('.cboxcontent form')) {
            $('.cboxcontent form').ajaxForm({
                dataType: 'json',
                beforeSubmit: function (arr, $form, options) {
                    $('#cboxLoadingOverlay, #cboxLoadingGraphic').show();
                    $form.find('.field').removeClass('error');
                    $form.find('.submit .button').attr('disabled', 'disabled');
                },
                success: function (response, status, xhr, $form) {
                    var success = response.ok || response.success;
                    var errors = response.fields || response.errors;
                    if (!success) {
                        for (var i in errors) {
                            $form.find('*[name="' + errors[i] + '"], *[name="' + i + '"]').closest(".field").addClass("error");
                        }
                    } else {
                        var $callbackform = $form.closest('.cboxcontent');
                        $callbackform.find('.fleft .success').addClass('show');
                        $callbackform.find('.fleft .hideonsuccess').addClass('hide');
                        if ($callbackform.data('callmenow-eventcategory') == 'netshop') {
                            ga('send', '_trackEvent', 'netshop', 'callback_form_submit', 'Visszahívást kérek! form beküldés');
                        }
                        $form.find('.submit .button').removeAttr('disabled');
                        $form.find('input[name]').each(function () {
                            var $label = $(this).closest('.field').find('label');
                            $(this).val('');
                            $label.removeClass('hide');
                        });
                        $form.find('input[type="radio"]').removeAttr('checked');
                        $form.find('input[type="checkbox"]').removeAttr('checked');
                        $form.find('select').find('option:first').attr('selected', 'selected');
                        $form.find('select').trigger('change');
                    }
                    $('#cboxLoadingOverlay, #cboxLoadingGraphic').hide();
                    $.colorbox.resize({
                        width: $('#callbackform').width(),
                        height: $('#callbackform').height()
                    });
                }
            });
        }

        $(document.body).on('click', '.opencallbackform', function (e) {
            this.blur();
            e.preventDefault();
            var $this = $(this);
            var callbackform = '#' + ($this.data('callbackform') || 'callbackform'), $callbackform;
            if ($this.data('input')) {
                var $input = $(callbackform + ' *[name="' + $this.data('input') + '"]');
                var val = $this.data('value') || 0;
                $input.val(val);
                $input.find('option[value="' + val + '"]').attr('selected', 'selected');
                $input.trigger('change');
            }

            $callbackform = $(callbackform);
            if ($this.data('callmenow-eventcategory')) {
                $.colorbox({ inline: true, href: $callbackform.attr('data-callmenow-eventcategory', $this.data('callmenow-eventcategory')) });
            } else {
                $.colorbox({ inline: true, href: $callbackform });
            }

            // Device name override
            if ($this.data('device-name')) $callbackform.find('input[name="device"]').val($this.data('device-name'));

            // Package info
            if ($this.data('package')) $callbackform.find('input[name="package"]').val($this.data('package'));
            return false;
        });

        $(window).on('resize', function () {
            window.clearTimeout(callbackResizeTid);
            callbackResizeTid = window.setTimeout(function () {
                $.colorbox.resize({
                    width: $('#callbackform').width(),
                    height: $('#callbackform').height()
                });
                APP.Form.hideErrorHint();
            }, 300);
        });

    }

    function carousel(obj) {

        var $obj = $(obj),
            $nav = $obj.find('.navigation'),
            $navUl = $nav.find('.list-wrapper ul'),
            timer = 8000,
            timerStep = true;
        direction = 'left',
            actual = 0,
            timerObj = null,
            timerStepObj = null,
            timerFirstObj = null,
            removeClasses = [],
            lastClick = 0,
            ulWidth = $navUl.outerWidth(),
            max = $obj.find('.images > a.desktop-carousel-image').length - 1,
            i = 0, count = 20;

        var firstSrc = $obj.find('.images-wrapper .images a:eq(0)').css('backgroundImage').replace('url(', '').replace(')', '').replace(/\'/g, '').replace(/\"/g, ''),
            firstImg = new Image(),
            firstFadeTimeout = 5500;

        for (i; i < count; i++) {
            removeClasses.push('active-' + i);
        }

        function initNavigation() {
            if ($navUl.width() < 900) {
                $nav.addClass('short');
            } else {
                var w = 0;
                $obj.find('.list-wrapper li').each(function (i, el) {
                    var elWidth = $(el).outerWidth();
                    $(el).attr('data-left',
                        Math.min(
                            Math.max(450 + w, 860 - ulWidth), 0));
                    w -= elWidth;
                });
            }
        }

        function next() {
            direction = 'right';
            goTo(actual < max ? actual + 1 : 0);
        }

        function back() {
            direction = 'left';
            goTo(actual > 0 ? actual - 1 : max);
        }

        function goTo(i) {
            if (timerStep) {
                actual = i;
                $obj.removeClass('left right ' + removeClasses.join(' ')).addClass('active-' + i + ' ' + direction);
                $obj.find('.list-wrapper ul')
                    .css('left', parseInt($obj.find('.list-wrapper li.index-' + i).data('left')));
                interval();

                trackImpression(actual);
            }
            clearTimeout(timerStepObj);
            timerStep = false;
            timerStepObj = setTimeout(function () { timerStep = true; }, 830);

        }

        function fixShaking() {
            //$obj.toggleClass('fix-odd', $(window).width() % 2 != 0);
        }

        function interval() {
            clearTimeout(timerObj);
            timerObj = setTimeout(next, $obj.find('.images > a:eq(' + actual + ')').data('delay') || timer);
        }

        $obj.find('.nav.next').click(function (e) {
            e.preventDefault();
            next();
        });

        $obj.find('.nav.back').click(function (e) {
            e.preventDefault();
            back();
        });

        $obj.find('.list-wrapper ul > li').click(function (e) {
            e.preventDefault();
            goTo(parseInt($(this).attr('class').replace('index-', '')));
        });

        $(window).bind('resize', function () {
            fixShaking();
        });

        fixShaking();
        initNavigation();


        function hiliteFirstUndo() {
            $('#hilitecover').animate({ opacity: 0 }, 1000);
            $('#hilitefirst').animate({ opacity: 0 }, 1000);
            setTimeout(function () {
                $('#hilitecover, #hilitefirst').hide();
            }, 1000);
        }

        firstImg.onload = function () {
            //console.log('firstimg loaded', $obj.data('hilitefirst'));
            if ($obj.data('hilitefirst') === true) {
                //console.log('hilitefirst');

                $('<div class="hilitecover" id="hilitecover"></div>').appendTo('body').animate({ opacity: 0.9 }, 1000);
                $obj.find('.images-wrapper .images a:eq(0)').clone().attr('id', 'hilitefirst').appendTo('body').animate({ opacity: 0.9 }, 1000);

                setTimeout(function () {
                    interval();
                }, Math.max(firstFadeTimeout - ($obj.find('.images-wrapper .images a:eq(0)').data('delay') || timer) + 666, 666));

                timerFirstObj = setTimeout(function () {
                    hiliteFirstUndo();
                }, firstFadeTimeout);

                $('#hilitecover').click(function (e) {
                    if (!this.clicked) {
                        this.clicked = true;
                        clearTimeout(timerFirstObj);
                        hiliteFirstUndo();
                    }
                });

            } else {
                interval();
            }
        }
        firstImg.src = firstSrc;


        
    }

    function promo(obj, hasTimer) {

        var $obj = $(obj),
            timer = 8000,
            actual = 0,
            timerObj = null,
            max = $obj.find('.wrapper > ul > li').length - 1
        IEFallback = /ie7|ie8/.test(document.documentElement.className)
        fallbackTimer = null;

        if ($obj.find('.pager a .pie').length == 0) {
            $obj.find('.pager a').empty().append('<span class="pie first"><span></span></span><span class="pie sec"><span></span></span>');
        }

        // Activate IE fallback animation for pagers
        if (IEFallback) {
            $obj.addClass("fallback").find('.pager a').empty().append('<div class="ticker"><span class="l"></span><span class="r"></span></div><div class="mask"></div>');
        }

        function next() {
            goTo(actual < max ? actual + 1 : 0);
        }

        var activeTicker, tickerLeft, tickerRight, fallbackTimerStart;
        function goTo(i) {
            actual = i;

            var i0 = parseInt($obj.attr('class').split('active-')[1] || '0', 10);
            $obj.removeClass('active-' + i0).addClass('active-' + i);

            if (IEFallback) {
                // Clean up previous
                //clearT(fallbackTimer);

                // Init new
                activeTicker = $obj.find('.index-' + i + ' .ticker')[0];


                // Has more than one elements
                if (activeTicker) {
                    tickerLeft = activeTicker.firstChild;
                    tickerRight = activeTicker.lastChild;

                    fallbackTimerStart = new Date().getTime();

                    var fallbackAnimate = function () {
                        //console.log($obj[0].textContent.replace(/\s+/g,' ').substr(0,40));
                        //console.log(activeTicker.firstChild.parentNode.parentNode.parentNode.parentNode.textContent.replace(/\s+/g,' ').substr(0,40));
                        var f = ((new Date().getTime() - fallbackTimerStart) % timer) / (timer / 200);
                        var rf = f > 100 ? 100 : f;
                        var lf = f <= 100 ? 0 : f - 100;

                        tickerLeft.style.height = (lf * .16) + 'px';
                        tickerRight.style.height = (rf * .16) + 'px';
                        fallbackTimer = setTimeout(fallbackAnimate, 100);
                    }
                    fallbackTimer = setTimeout(fallbackAnimate, 100);
                    fallbackAnimate();
                }
            }
        }

        function interval() {
            if (hasTimer) {
                clearInterval(timerObj);
                timerObj = setInterval(next, timer);
            }
        }

        $obj.find('.pager a').click(function (e) {
            e.preventDefault();
            goTo(parseInt($(this).attr('class').replace('index-', ''), 10));
            interval();
        });

        goTo(0);
        interval();
    }

    return {
        init: init,
        posfix: posfix
    };

})();

APP.Helpers = (function () {
    function dollarize(n, suffix) {
        suffix = suffix || ""; // optional

        var num = typeof n === 'undefined' ? this : n;
        num = typeof num !== 'number' ? parseInt(num, 10) : num;
        num = num.toFixed(0);

        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(num)) {
            num = num.replace(rgx, '$1 $2');
        }
        return num + suffix;
    }

    // Load and inject script into document head
    // via: http://blog.kevinchisholm.com/asynchronous-javascript/cross-browser-asynchronous-javascript-script-loading/
    function loadScript(url, callback) {
        var script;
        if (!url || !(typeof url === 'string')) return;

        script = document.createElement('script');

        // Sadly, IE8 and below do not properly implement the onload event
        if (typeof document.attachEvent === "object") {
            script.onreadystatechange = function () {
                if (script.readyState === 'loaded') {
                    if (callback) callback();
                }
            }

            // Modern(ish) browsers
        } else {
            script.onload = function () {
                if (callback) callback();
            }
        }

        // Create the script and add it to the DOM
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    // Throttle callback function
    // Makes sure the given callback does not execute more frequently,
    // than the given threshold.
    // via http://remysharp.com/2010/07/21/throttling-function-calls/
    function throttleCallback(fn, threshold, scope) {
        var last, deferTimer;
        threshold = threshold || 250;

        return function () {
            var context = scope || this;

            var now = +new Date, args = arguments;
            //if (!last) last = now;

            if (last && now < last + threshold) {
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, threshold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }

    // Make sure we only execute a function after <threshold> delay,
    // even if callback is called multiple times (last call resets delay
    // to pre-set amount
    function delayCallback(fn, threshold, scope) {
        var last, deferTimer;
        threshold = threshold || 250;

        return function () {
            var context = scope || this;

            var now = +new Date, args = arguments;

            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = null;
                fn.apply(context, args);
            }, threshold);

            last = now;
        };
    }


    return { dollarize: dollarize, loadScript: loadScript, throttleCallback: throttleCallback, delayCallback: delayCallback }
})();

APP.Form = (function () {

    function init() {
        dependencyInit();
        initCustomCheckboxes();
        initCustomRadios();
        initCustomSelects();
        initCustomFileInputs();

        initFallbacks();

        initCustomErrorHandlers();
    }

    function reinit() {
        $('.checkbox-wrapper input[type="checkbox"]').trigger('change');
        $('.radio-wrapper input[type="radio"]').trigger('change');
        initCustomSelects();
    }

    function initCustomCheckboxes() {
        $('body').on('change', '.checkbox-wrapper input[type="checkbox"]', function () {
            var $wrapper = $(this).parents('.checkbox-wrapper');
            if ($(this).prop('checked')) {
                $wrapper.addClass('checked');
            } else {
                $wrapper.removeClass('checked');
            }
        }).trigger('change');
    }

    function initCustomRadios() {
        $('.radio-wrapper.disabled').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
        $('body').on('change', '.radio-wrapper input[type="radio"]', function () {
            changeRadiogroupByName($(this).attr('name'));
        }).trigger('change');
    }

    function changeRadiogroupByName(name) {
        $('input[type="radio"][name="' + name + '"]').each(function () {
            var $wrapper = $(this).closest('.radio-wrapper');
            if ($(this).prop('checked')) {
                $wrapper.addClass('checked');
            } else {
                $wrapper.removeClass('checked');
            }
        });
    }

    function initCustomSelects() {

        function setVal($obj, val) {
            var $valuePlaceholder = $obj.siblings('span:first-child');
            var placeholder = $obj.attr('placeholder');

            if (val == '' && placeholder) {
                $valuePlaceholder.addClass('placeholder-value');
                val = placeholder;
            } else {
                if ($valuePlaceholder.hasClass('placeholder-value')) $valuePlaceholder.removeClass('placeholder-value');
            }

            $valuePlaceholder.text(val);
        }

        function initValue($obj) {
            if ($obj.val() != null) {
                setVal($obj, $obj.find('option[value="' + $obj.val() + '"]').text());
            } else {
                setVal($obj, $obj.find('[selected="selected"]').text());
            }
        }

        $('.select-wrapper select:not([data-inited])').each(function (i, el) {
            $(el).attr('data-inited', true);
            initValue($(el));
            $(el).on('change', function () {
                initValue($(el));
            });
        });
    }

    function initCustomFileInputs() {
        // Set helper text to updated contents (value) or placeholder text
        // (if a placeholder is specified and the content/value is empty)
        function setVal($obj, val) {
            var $valuePlaceholder = $obj.siblings('.helper');
            var placeholder = $obj.attr('placeholder');

            // Value should be trimmed of path elements
            val = (String(val).split(/[\/\\]/g).pop()) || val;

            // Empty value? is there a placeholder specified?
            if (val == '' && placeholder) {
                $valuePlaceholder.addClass('placeholder-value');
                val = placeholder;
            } else {
                if ($valuePlaceholder.hasClass('placeholder-value')) $valuePlaceholder.removeClass('placeholder-value');
            }

            $valuePlaceholder.text(val);
        }

        // Add event handler for updating the helper
        $('.file-wrapper').on('change', ' > input[type="file"]', function (e) {
            setVal($(this), $(this).val());
        });

        // Initialize value (or placeholder text)
        $('.file-wrapper input[type="file"]').each(function () {
            setVal($(this), $(this).val());
        });
    }

    function dependencyInit() {
        $('[data-visibility-depend]').each(allDependency);
    }

    function allDependency() {
        var $element = $(this),
            $depender = $($element.data('visibility-depend')),
            callbacks = []; // the list of callback selectors this dependency applies to

        function selectionChange() {
            var l = $depender.length, i = 0, show_element = false;
            while (i < l) {
                show_element |= $depender[i].checked; // dependency met when any of the upstream tags is checked
                ++i;
            }

            if (show_element) {
                $element.show();
            } else {
                $element.hide();
            }

        }

        $depender.each(function () {
            var $element = $(this),
                selector;

            if ($element.attr('type') === 'checkbox') {
                selector = null;
                $element.change(selectionChange);
                selectionChange.call(this);

            } else if ($element.attr('type') === 'radio') {
                selector = '[name="' + $element.attr('name') + '"]';

                // selector not yet covered
                if ($.inArray(selector, callbacks) < 0) {
                    $(selector).change(selectionChange);
                    selectionChange.call(this);
                    callbacks.push(selector);
                }
            }
        });
    }

    function initFallbacks() {
        /* IE placeholder polyfill */
        if ($('input[type="text"]').placeholder) $('input[type="text"],input[type="phone"],input[type="number"],input[type="email"]').placeholder();
    }

    // Custom error handlers hook into HTML5 form validation functionality
    // the ("oninvalid" event) and replace the in-browser error messages
    // with the ones specified in data-invalidmsg tags
    function initCustomErrorHandlers() {
        $('[data-invalidmsg]').on('input invalid', function (e) {
            var $this = $(this), l, valid = true;

            for (l in { 'badInput': 1, 'patternMismatch': 1, 'rangeOverflow': 1, 'rangeUnderflow': 1, 'stepMismatch': 1, 'tooLong': 1, 'typeMismatch': 1, 'valueMissing': 1 }) {
                if (this.validity[l] === true) {
                    valid = false;
                    break;
                }
            }

            if (!valid) {
                this.setCustomValidity($this.data('invalidmsg'));
                //console.warn && console.warn(this,this.validationMessage);
            } else {
                this.setCustomValidity('');
                e.preventDefault();
            }
        });

        $('[data-required-msg]').on('input invalid', function (e) {
            var $this = $(this), valid = true;

            // Do not override required-message!
            if (this.validity.valueMissing === true) valid = false;


            if (!valid) {
                this.setCustomValidity($this.attr('data-required-msg'));
                //console.warn && console.warn(this,this.validationMessage);
            } else {
                this.setCustomValidity('');
                e.preventDefault();
            }
        });

        $('[data-pattern-msg]').on('input invalid', function (e) {
            var $this = $(this), valid = true;

            // Do not override required-message!
            if (this.validity.valueMissing === true) return;

            if (this.validity.patternMismatch === true) valid = false;


            if (!valid) {
                this.setCustomValidity($this.attr('data-pattern-msg'));
                //console.warn && console.warn(this,this.validationMessage);
            } else {
                this.setCustomValidity('');
                e.preventDefault();
            }
        });
    }

    function showErrorHint($field, errormsg, forceshow) {
        var $o = $('<div class="errorhint"><span>' + (errormsg || '?') + '</span> <button class="button" type="button">OK</button></div>'),
            pos = { x: 0, y: 0 },
            $body = $('body'),
            $field = $field || [],
            forceshow = forceshow || false;

        if ($field.length > 1) { $field = $field.eq(0); }

        console.log($('body > .errorhint').length, forceshow);

        if (($('body > .errorhint').length > 0) && !forceshow) { return false; }

        $body.append($o);
        pos.x = - $body.offset().left + (-0.5) * $o.width() + ($field.offset().left + (1 - 0.5) * $field.innerWidth());
        pos.y = - $body.offset().top + (-1) * $o.height() + ($field.offset().top + (1 - 1) * $field.innerHeight());
        if (pos.x < 0) { pos.x = 0; }
        if (pos.x + $o.width() > $(window).width()) { pos.x = $(window).width() - $o.width(); }
        $o.css({ 'left': ~~(pos.x) + 'px', 'top': ~~(pos.y) + 'px' });

        $o.on('click', 'button', function () {
            $(this).closest('.errorhint').remove();
        });
    }

    function hideErrorHint() {
        $('body > .errorhint').remove();
    }


    return {
        init: init,
        reinit: reinit,
        initCustomRadios: initCustomRadios,
        initCustomErrorHandlers: initCustomErrorHandlers,
        showErrorHint: showErrorHint,
        hideErrorHint: hideErrorHint
    };

}());

APP.Text = (function () {

    var $cont = null;

    var init = function () {
        $cont = $('.app > section');
        opener.init();
        checkbox_opener.init();
        share.init();
        tab.init();
        ie7.init();
    };

    var opener = (function () {

        var init = function () {
            $cont.find('.openable h3').each(function (i, el) {
                $(el).on('click', function () {
                    $(el).parent('.openable').toggleClass('open');
                });
            });
        };

        return {
            init: init
        };
    })();


    var checkbox_opener = (function () {

        var init = function () {
            $cont.find('.checkbox-openable').each(function (i, el) {
                $($(el).data('open-depend')).on('change', function () {
                    if ($(this).is(':checked')) {
                        $(el).addClass('open');
                    } else {
                        $(el).removeClass('open');
                    }
                });
            });
        };

        return {
            init: init
        };

    })();

    var share = (function () {

        var init = function () {
            $cont.find('.share .share-opener').on('click', function () {
                $(this).parents('.share').toggleClass('open');
            });
        };

        return {
            init: init
        };
    })();

    var tab = (function () {

        function init() {
            $cont.find('.tab').each(initTab);

            $cont.on('click', '.tab .tabs-header a:not([data-link])', function (e) {
                var $tab = $(this).parent('.tabs-header').parent('.tab');
                e.preventDefault();
                $tab.find('.tabs-header a, .tabs-body > div').removeClass('active');
                $tab.find('.tabs-body > div:nth-of-type(' + ($(this).index() + 1) + ')').addClass('active');
                $(this).addClass('active');
            });

            /* Responsive tabs */
            $cont.on('click', '.tab-responsive .tabs-header a:not([data-link])', function (e) {
                var $tabsHeader = $(this).closest('.tabs-header');
                if ($(this).hasClass('active')) e.preventDefault();// ignore link click for active dropdown
                $tabsHeader.toggleClass('expand');
            });
        }

        function initTab(tabToInit) {
            var $tab = $(tabToInit || this),
                active = 0,
                hasActive = false;

            $tab.find('.tabs-header a').each(function (i, el) {
                if ($(el).hasClass('active')) {
                    hasActive = true;
                    active = i;
                }
            });

            if (!hasActive) {
                $tab.find('.tabs-header a:first-child').addClass('active');
                hasActive = true;
                active = 0;
            }

            $tab.find('.tabs-body > div').each(function (i, el) {
                if ($(this).index() == active) {
                    $(el).addClass('active');
                }
            });
        };

        return {
            init: init, initTab: initTab
        };

    })();

    var ie7 = (function () {

        // IE7 specific patches
        function init() {
            // "::after"-polyfill for .grid boxes
            //$('section > .content .grid').append('<div style="position: static; display: block; width: 1px; height: 1px; font-size: 1px; clear: both;"></div>');
            //proved unneccessary, already applied in fallback javascript

        }
        return { init: init };
    })();

    return {
        init: init, Tab: tab
    };

}());

APP.QueryString = (function () {
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
        } else if (typeof query_string[pair[0]] === "string") {
            query_string[pair[0]] = [query_string[pair[0]], pair[1]];
        } else {
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
}());

APP.ListPage = (function () {

    function init() {

        //global list-page toolbar select refresh functions!
        $('.list-page .toolbar').each(function () {
            setupSelectPageRefresh($(this));
        });

        //android page lightbox!
        if ($('.overlay-wrapper.androidApp').length) {
            setupLightboxAndroidListPage();
        }
    }

    function setupSelectPageRefresh($toolbar) {
        $toolbar.find('select').on('change', function () {

            if ($(this).data('action') != 'form-get') {
                window.location = this.value;
            }

        })
    }

    function setupLightboxAndroidListPage() {
        $('.itemList .item a').on('click', function (e) {
            e.preventDefault();

            var itemIndex = $(this).parents('.item').index();
            $('.overlay-wrapper.androidApp').eq(itemIndex).show();
        })
    }

    return {
        init: init
    }


}());

/*
 Custom behaviors attached to elements via data-* attributes.

 */
APP.Behaviors = (function () {
    function init() {

        /* Activate one of the child elements on click.

         When activated, parent container's data-active will point to the
         data-target of current element.

         Use an (optional) radio-button or checkbox element, if you want
         to listen to the changes in activity via e.g. visibility-depend.
         */
        $(document.body).on('click', '[data-active] [data-target]', function () {
            var $this = $(this),
                $parent = $this.closest('[data-active]'),
                target = $this.attr('data-target'),
                $radio = $parent.find('input[type="radio"][data-target]');

            // Set selection
            $parent.attr('data-active', target);

            // Update input element values
            $this.closest('input[data-active]').val(target);
            if ($radio.length > 0) {
                $radio.filter(':checked').removeAttr('checked');
                $radio.filter('[data-target="' + target + '"]').attr('checked', true).change();
            }
        });
        /* Activate highlight if there is a corresponding input element, and it
         is already checked on init.
         */
        $('input[type="radio"][data-target]:checked').each(function () {
            var $this = $(this);
            var target = $this.attr('data-target');

            $this.closest('[data-active]').attr('data-active', target);
        });

        /* Toggle class on current element on click.

         Toggles classname specified in [data-click-toggle] on current element
         when clicked. Also sets the value of corresponding child input element,
         if there is one.
         */
        $(document.body).on('click', '[data-click-toggle]', function () {
            var $this = $(this),
                label = $this.attr('data-click-toggle')
            state = $this.hasClass(label);

            // Toggle class on element
            if (state) $this.removeClass(label); else $this.addClass(label);

            // Toggle matching child input if there is any
            $this.find('input[data-click-toggle="' + label + '"]').val(state ? label : "");
        });


        /* Responsive promo disclaimer handling */
        $('.responsive-promo .disclaimer').on('click', '.opener', function (e) {
            var $disclaimer = $(this).closest('.disclaimer');
            $disclaimer.attr('data-open', $disclaimer.attr('data-open') === 'yes' ? 'no' : 'yes');
            e.preventDefault();
        });

    }

    return { init: init };
})();

/*
    Closable generic overlays
 */
APP.Overlay = function () {

    function init() {
        function dataClosableCloseHandler(e) {
            // Find close target
            var $closeTarget = $(this).closest('[data-closable]');

            // Close, if it's not already closed
            if ($closeTarget.length && $closeTarget.attr('data-closable') === 'open') {
                $closeTarget.attr('data-closable', 'closed'); // writing of data-* attributes does not occur with .data() call
            }

            e.preventDefault();
            e.stopPropagation();
        }
        /* Generic close button init for closable overlays */
        $(document.body).on('click', '[data-closable] .close', dataClosableCloseHandler);
        /* Close event for data-closable */
        $(document.body).on('close', '[data-closable]', dataClosableCloseHandler);

        $('.overlay-wrapper').each(function () {
            $(this).appendTo('body');
            $(this).find('.close').on('click', function (e) {
                e.preventDefault();
                $(this).parents('.overlay-wrapper').find('object, embed').remove();
                $(this).parents('.overlay-wrapper').hide();
            })
        });

        $('.imageList img').each(function () {
            $(this).on('click', function () {
                var bigImage = $(this).data('image');
                var $overlayWrapper = $('.overlay-wrapper');
                $overlayWrapper.find('.media-wrapper img').attr('src', bigImage);
                $overlayWrapper.show();
            })
        });

        $('body').on({
            'click': function (event) {
                var src = $(this).data('swf');
                var $overlayWrapper = $('.overlay-wrapper');
                $overlayWrapper.find('.media-wrapper').html('<div id="flashcontent"></div>');
                embedSWF(src, $(this).data('width'), $(this).data('height'));

                $overlayWrapper.show();

                event.preventDefault();
                return false;
            }
        }, '[data-swf]');

        $('body').on({
            'click': function (e) {
                e.preventDefault();
                var video = $(this).data('video');
                var $overlayWrapper = $('.overlay-wrapper');
                $overlayWrapper.find('.media-wrapper').html('<div id="flashcontent"></div>');
                embedVideoPlayer(video, $(this).attr('src'), ($(this).attr('title')), $(this).data('width'), $(this).data('height'));

                $overlayWrapper.show();
            }
        }, '[data-video]');

        $('body').on({
            'click': function () {

                var title = $(this).data('map'),
                    desc = $(this).data('city'),
                    lat = $(this).data('latitude'),
                    lng = $(this).data('longitude');

                $('.overlay-wrapper').show();
                showGoogleMaps(title, desc, lat, lng);
            }
        }, '[data-map]')

        $('.overlay-wrapper iframe').attr('allowtransparency', 'true');
        $('.overlay-wrapper.media .layer, .overlay-wrapper.yt-video .layer, .overlay-wrapper.googlemaps .layer').each(function () {
            $(this).wrap('<div class="mediacontainer"></div>');
        });
    }

    function showGoogleMaps(title, desc, lat, lng) {
        if (!title) title = 'Telenor Magyarország Zrt.';
        if (!desc) desc = 'Törökbálint, Pannon út 1.';
        if (!lat) lat = 47.43037;
        if (!lng) lng = 18.93657;

        var $info = $('.overlay-wrapper .info');
        $info.find('title').html(title);
        $info.find('desc').html(desc);

        var latlng = new google.maps.LatLng(lat, lng);
        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeId: ((lat == 47.43037) && (lng = 18.93657)) ? google.maps.MapTypeId.SATELLITE : google.maps.MapTypeId.ROADMAP
        };
        $('.overlay-wrapper .map-wrapper').empty().append('<div class="map-wrapper-content"></div>');
        var map = new google.maps.Map($('.overlay-wrapper .map-wrapper .map-wrapper-content')[0], myOptions);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(latlng.lat(), latlng.lng()),
            map: map
        });
        var infowindow = new google.maps.InfoWindow({
            content: '<b>' + title + '</b><br />' + desc
        });
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
    }

    function embedVideoPlayer(videoData, thumbData, titleData, width, height) {
        swfobject.embedSWF("swf/telenor_player.swf", "flashcontent", width || "390", height || "220", "9.0.0", "swf/expressInstall.swf", { video: videoData, thumb: thumbData, title: titleData, colors: "0B9CD5,FFFFFF", autoplay: true }, { allowfullscreen: true, wmode: "transparent", bgcolor: "#FFFFFF", menu: true }, { id: "telenor" });
    }

    function embedSWF(src, width, height) {
        swfobject.embedSWF(src, "flashcontent", width || "390", height || "220", "9.0.0", "swf/expressInstall.swf", { autoplay: true }, { allowfullscreen: true, wmode: "transparent", bgcolor: "#FFFFFF", menu: true }, { id: "telenor" });
    }

    return {
        init: init
    }

}();

APP.PhoneOverlay = (function () {

    var _tmp = null,
        _overlayTpl = '<div class="overlay"><div class="cover"></div></div>',
        _overlayDOM = null,
        _contentDOM = null,
        _directItems = [],
        _directTpl = '' +
            '<div class="content media direct">' +
            '	 <div class="top"></div>' +
            '	 <div class="inner cont">' +
            '		 <div class="media">##media##</div>' +
            '		 <div class="title">##title##</div>' +
            '		 <div class="paging">##paging##<div class="prev"></div><div class="next"></div></div>' +
            '		 <div class="close"></div>' +
            '	 </div>' +
            '	 <div class="bot"></div>' +
            '</div>',
        _mediaItems = [],
        _mediaTpl = '' +
            '<div class="overlaycontent">' +
            '	 <div class="media">' +
            '		 <div class="inner">' +
            '			 <div class="image">##media##</div>' +
            '			 <div class="zoom hidden"></div><div class="prev"></div><div class="next"></div><div class="close"></div>' +
            '		 </div>' +
            '	 </div>' +
            '	 <div class="medialarge hidden">' +
            '		 <div class="inner">' +
            '			 <div class="image">##media##</div>' +
            '			 <div class="close"></div>' +
            '		 </div>' +
            '	 </div>' +
            '</div>';

    function init() {
        _mediaItems = [],
            _tmp = 0;

        $('div.gallery div.item').each(function () {

            var _a = $(this).find('a').eq(0);
            mediaAdd(_a);

            $(this).find('a').each(function () {

                if (_a.attr('href') == $(this).attr('href')) {

                    this.index = _tmp;
                    this.ok = true;

                    if ($(this).hasClass('Magic360')) {

                        $(this).mousedown(function () {
                            this.ok = true;
                            this.down = true;
                        });

                        $(this).mouseup(function () {
                            this.down = false;
                        });

                        $(this).mousemove(function () {
                            if (this.down) {
                                this.ok = false;
                            }
                        });

                    }

                    $(this).click(function () {
                        this.blur();

                        if (!this.ok) {
                            this.ok = true;
                            return false;
                        }
                        mediaShow(this.index);
                        return false;

                    });
                }
            });

            _tmp++;

        });

        $('div.cont a.directshow').each(function () {

            $(this).click(function () {
                this.blur();
                directShow(0, [
                    {
                        href: this.href,
                        title: this.title
                    }
                ]);
                return false;
            });

        });

    }

    function directShow(objIndex, items) {
        var directHtml = _directTpl,
            directObj,
            objType,
            objVars,
            retVal = true;

        contentHide();

        if (!items || (items.length == 0)) {

            if (!_directItems || (_directItems.length == 0)) {
                retVal = false;
            }

        } else {

            if (typeof items === 'string') {
                eval('_directItems = ' + items + ';');
            } else {
                _directItems = items;
            }

        }

        if (retVal !== false) {

            objIndex = Math.max(0, Math.min(_directItems.length, objIndex));
            directObj = _directItems[objIndex].href;
            objType = String(directObj).split('&')[0].split('?')[0].split('.').pop().substr(0, 3);
            objVars = { title: _directItems[objIndex].title || '' };

            if (_directItems.length > 1) {
                directHtml = directHtml.split('class="content media direct"').join('class="content media"');
            }

            directHtml = directHtml.split('##title##').join(objVars.title);
            directHtml = (_directItems.length > 1) ? directHtml.split('##paging##').join((objIndex + 1) + ' / ' + _directItems.length) : directHtml.split('<div class="paging">##paging##<div class="prev"></div><div class="next"></div></div>').join('');

            switch (objType) {
                case 'jpg':
                case 'gif':
                case 'png':
                case 'bmp':
                    directHtml = directHtml.split('##media##').join('<img src="' + directObj + '" alt="" />');
                    break;
                case 'flv':
                    directHtml = directHtml.split('##media##').join('<embed src="swf/player-licensed.swf" width="480" height="320" flashvars="file=' + directObj + '&amp;backcolor=87A520&amp;frontcolor=000000&amp;lightcolor=ffffff&amp;screencolor=000000&amp;autostart=true" wmode="transparent" allowscriptaccess="always" allowfullscreen="true" quality="high" name="overlayvideo" id="overlayvideo" type="application/x-shockwave-flash">');
                    break;
                default:
                    directHtml = directHtml.split('##media##').join('not supported media format');
                    break;
            }

            _contentDOM = $(directHtml);

            _contentDOM.find('div.prev').addClass((objIndex == 0) ? 'hidden' : '').click(function () {
                directShow((_directItems.length + objIndex - 1) % _directItems.length);
            });

            _contentDOM.find('div.next').addClass((objIndex == _directItems.length - 1) ? 'hidden' : '').click(function () {
                directShow((objIndex + 1) % _directItems.length);
            });

            _contentDOM.find('div.close').click(function () {
                overlayHide();
            });

            contentShow();

        }

    }

    function overlayShow() {
        var $body = $('body');

        if (!_overlayDOM) {
            _overlayDOM = $(_overlayTpl);
            _overlayDOM.find('div.cover').click(function () {
                overlayHide();
            });
            $body.append(_overlayDOM);
        }
        _overlayDOM.width($body.width()).height($(document).height());
        _overlayDOM.addClass('show');
    }

    function overlayHide() {
        contentHide();
        _overlayDOM.removeClass('show');
        $(window).unbind('keyup');
    }

    function contentShow() {
        if (_contentDOM != null) {
            overlayShow();
            _overlayDOM.append(_contentDOM);
        }
    }

    function contentHide() {
        if (_contentDOM != null) {
            _contentDOM.remove();
        }
        _contentDOM = null;
    }

    function mediaAdd(obj) {
        _mediaItems.push(obj);
    }

    function mediaShow(objIndex) {
        var mediaHtml = _mediaTpl,
            mediaObj = _mediaItems[objIndex],
            objType = String(mediaObj.attr('href')).split('&')[0].split('?')[0].split('.').pop().substr(0, 3),
            objVars;

        contentHide();

        try {
            eval('var objVars = {' + String(mediaObj.attr('rel')) + '}');
        } catch (e) {
            objVars = {};
        }

        objVars.title = objVars.title || '';
        objVars.info = objVars.info || '';
        objVars.lead = objVars.lead || '';

        switch (objType) {
            case 'jpg':
            case 'jpe':
            case 'gif':
            case 'png':
            case 'bmp':
                mediaHtml = mediaHtml.split('##media##').join('<img src="' + mediaObj.attr('href') + '" alt="" />');
                break;
            case 'flv':
                mediaHtml = mediaHtml.split('##media##').join('<embed src="swf/player-licensed.swf" width="480" height="320" flashvars="file=' + mediaObj.attr('href') + '&amp;backcolor=5DA2CE&amp;frontcolor=000000&amp;lightcolor=ffffff&amp;screencolor=000000&amp;autostart=true" wmode="transparent" allowscriptaccess="always" allowfullscreen="true" quality="high" name="overlayvideo" id="overlayvideo" type="application/x-shockwave-flash">');
                break;
            case 'm3d':
                mediaHtml = mediaHtml.split('##media##').join('<a id="m3d" class="Magic360" rel="speed: 50; autospin-speed:80; columns: 72; initialize-on: load; magnify: false; filename:Large-{col}.jpg;"><img src="' + mediaObj.data('path') + 'Large-01.jpg" /></a>');
                break;
            default:
                mediaHtml = mediaHtml.split('##media##').join('not supported media format');
                break;
        }

        _contentDOM = $(mediaHtml);
        _contentDOM.find('div.prev').addClass((objIndex == 0) ? 'hidden' : '').click(function () {
            mediaShow((_mediaItems.length + objIndex - 1) % _mediaItems.length);
        });
        _contentDOM.find('div.next').addClass((objIndex == _mediaItems.length - 1) ? 'hidden' : '').click(function () {
            mediaShow((objIndex + 1) % _mediaItems.length);
        });
        _contentDOM.find('div.media div.close').click(function () {
            overlayHide();
        });

        $(window).keyup(function (e) {
            switch (e.keyCode) {
                case 37:	// left
                    mediaShow((_mediaItems.length + objIndex - 1) % _mediaItems.length);
                    break;

                case 39:	// right
                    mediaShow((objIndex + 1) % _mediaItems.length);
                    break;

                case 27:	// escape
                    overlayHide();
                    break;
            }
        });

        if (!mediaObj.hasClass('nolarge')) {
            _contentDOM.find('div.media div.inner').mousemove(function (e) {
                mediazoomPositioning(e);
            });
            _contentDOM.find('div.media div.image, div.media div.zoom').click(function (e) {
                _contentDOM.find('div.medialarge').removeClass('hidden');
                _contentDOM.find('div.media').addClass('hidden');
                medialargePositioning(e);
            });
        } else {
            _contentDOM.find('div.media div.image').addClass('nolarge');
        }

        _contentDOM.find('div.medialarge div.inner').mousemove(function (e) {
            medialargePositioning(e);
        });
        _contentDOM.find('div.medialarge div.image, div.medialarge div.close').click(function () {
            _contentDOM.find('div.medialarge').addClass('hidden');
            _contentDOM.find('div.media').removeClass('hidden');
        });

        mediaPositioning();
        $(window).resize(function () {
            mediaPositioning();
        });

        contentShow();

        if ('m3d' == objType) {
            Magic360.start('m3d');
        }

    }

    function mediaPositioning() {
        var ww = $(window).width(),
            wh = $(window).height();
        _contentDOM.find('div.media').css({ left: Math.round(ww / 2 - wh / 3) + 'px', top: '0px', width: Math.round(wh / 3 * 2) + 'px', height: wh + 'px' });
    }

    function mediazoomPositioning(e) {
        var image = _contentDOM.find('div.media div.image'),
            mx = e.pageX,
            my = e.pageY,
            x = mx - _contentDOM.find('div.media div.inner').offset().left,
            y = my - _contentDOM.find('div.media div.inner').offset().top,
            ix0 = image.offset().left,
            iy0 = image.offset().top,
            ix1 = ix0 + image.find('img').width(),
            iy1 = iy0 + image.find('img').height();

        if ((ix0 <= mx) && (mx <= ix1) && (iy0 <= my) && (my <= iy1)) {
            _contentDOM.find('div.zoom').removeClass('hidden');
        } else {
            _contentDOM.find('div.zoom').addClass('hidden');
        }

        _contentDOM.find('div.media div.inner div.zoom').css({ left: Math.min(Math.max(x, 75), image.find('img').width() - 75) + 'px', top: y + 'px' });
    }

    function medialargePositioning(e) {
        var ww = $(window).width(),
            wh = $(window).height(),
            iw = 1200,
            ih = 1800,
            x = e.pageX - _contentDOM.find('div.medialarge div.inner').offset().left,
            y = e.pageY - _contentDOM.find('div.medialarge div.inner').offset().top,
            l = (ww > iw) ? Math.round((ww - iw) / 2) : Math.round((x / ww) * (ww - iw)),
            t = (wh > ih) ? Math.round((wh - ih) / 2) : Math.round((y / wh) * (wh - ih));
        _contentDOM.find('div.medialarge').css({ width: ww + 'px', height: wh + 'px' });
        _contentDOM.find('div.medialarge div.inner div.image').css({ left: l + 'px', top: t + 'px' });
        _contentDOM.find('div.medialarge div.inner div.close').css({ left: x + 'px', top: y + 'px' });
    }

    return {
        init: init
    }

}());

APP.Mobile = (function () {

    function init() {
        eventBindings();
    }

    function eventBindings() {
        $(window).scroll(function () {
            if (window.scrollY == 0) {
                $('body>.app').addClass('top-scrolled');
            } else {
                $('body>.app').removeClass('top-scrolled');
            }
        }).trigger('scroll');
        $('.menu-opener a').on('click', function () {
            $('body>.app').toggleClass('open-menu');
        });
        $('.search-opener a').on('click', function () {
            $('body>.app').toggleClass('open-search');
        });

        $('.segment-menu .drop > a').on('click', function (e) {
            var $this = $(this).parent();

            // Close all other open dropdowns
            $this.parent().find('.drop.active').not($this).removeClass('active');

            // Open/close clicked dropdown
            $this.toggleClass('active');

            e.preventDefault();
        });
    }

    return {
        init: init
    }


}());

APP.ImgAnim = (function () {

    function init() {
        $('.imganim').each(function () {
            var $anim = $(this);
            var setting;
            eval('setting = ' + $anim.data('imganim'));
            setting.d = 1;
            setting.width = $anim.width();
            setting.height = $anim.height();
            $anim
                .data('setting', setting)
                .data('imgloaded', 0)
                .css({ left: $anim.parent().offset().left + 'px', top: ($anim.parent().offset().top) + 'px' })
                .append('<div class="frames"></div>');
            loadFrames($anim);
        });
        $(window).resize(function () {
            $('.imganim').each(function () {
                var $anim = $(this);
                $anim.css({ left: $anim.parent().offset().left + 'px', top: ($anim.parent().offset().top) + 'px' });
            });
        });
    }

    function loadFrames($anim) {
        var $frames = $anim.find('.frames');
        var setting = $anim.data('setting');

        for (var i = 0; i < Math.ceil(setting.frames / setting.fpi); i++) {
            var $img = $('<img src="' + setting.folder + ('0' + (i + 1)).slice(-2) + '.jpg" alt="">');
            if ($img.get(0).complete == true) {
                $anim.data('imgloaded', $anim.data('imgloaded') + 1);
                checkLoaded($anim);
            } else {
                $img.load(function () {
                    var $anim = $(this).closest('.imganim');
                    $anim.data('imgloaded', $anim.data('imgloaded') + 1);
                    checkLoaded($anim);
                });
            }
            $img.appendTo($frames);

        }
    }

    function checkLoaded($anim) {
        var $frames = $anim.find('.frames');
        var setting = $anim.data('setting');
        if ($anim.data('imgloaded') == Math.ceil(setting.frames / setting.fpi)) {
            setTimeout(function () {
                doanim($frames, setting, 1);
            }, 2000);
        }
    }

    function doanim($frames, setting, current) {
        if (setting.reverse && (current == setting.frames)) {
            setting.d = -1;
        }
        if (current == 1) {
            setting.d = 1;
        }
        var next = (current - 1 + setting.d) % (setting.frames) + 1;

        $frames.css('left', -(current - 1) * setting.width + 'px');

        setTimeout(function () {
            doanim($frames, setting, next);
        }, setting.delay['f' + current] || setting.delay['f']);
    }

    return {
        init: init
    };

})();

/* Handles hover change animations between header-menu (main site nav) items */
APP.HeaderMenu = (function () {

    function init() {

        $('.header-menu > li.drop > a').mouseenter(function () {
            var li = $(this.parentNode);
            li.addClass('over');
            li.parent().addClass('over'); //console.log('over');
            setTimeout(function () {
                li.removeClass('over');
                li.parent().removeClass('over'); //console.log('-');
            }, 4);
        });

    }

    return {
        init: init
    };

})();

/* deezer playlist on /zene */
APP.DeezerPlaylist = (function () {

    var $thumbs,
        $items,
        $inner,
        w,
        d = 0,
        l = 0;

    function iframePlayer(type, id, cover) {
        var dpWidth = $('#deezerplayer').parent().width();
        $('#deezerplayer iframe').attr('src', '//web.archive.org/web/20150810104514/https://www.deezer.com/hu/plugins/player?autoplay=false&playlist=true&width=' + dpWidth + '&height=240&cover=' + (cover ? 'false' : 'true') + '&type=' + type + '&format=horizontal&id=' + id + '&title=');
        if (cover) {
            $('#deezerplayer .cover').attr('src', cover);
        }
    };

    function init() {
        $thumbs = $('#deezeralbums .thumbs');
        $items = $thumbs.find('.items');
        $inner = $items.find('.inner');

        w = $inner.find('.item:eq(0)').outerWidth();

        if (0 == l) { $items.siblings('.prev').addClass('disabled'); }
        if ($items.width() - (w * $inner.find('.item').length) >= l) { $items.siblings('.next').addClass('disabled'); }

        $items
            .on('click', '.item', function () {
                var $this = $(this);
                $this.addClass('active').siblings().removeClass('active');
                iframePlayer($this.data('type'), $this.data('id'), $this.data('cover'));
            })
            .find('.item.active, .item:eq(0)').eq(0).trigger('click');

        $thumbs.find('.prev, .next')
            .mousedown(function (e) {
                e.preventDefault();
                e.stopPropagation();
            })
            .click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                var $this = $(this);
                d = ($this.hasClass('prev')) ? 1 : -1;
                l = Math.min(0, Math.max($items.width() - $inner.width(), Math.round(l + d * w)));
                $inner.css({ left: l + 'px' });

                $items.siblings('.disabled').removeClass('disabled');
                if (0 == l) { $items.siblings('.prev').addClass('disabled'); }
                if ($items.width() - $inner.width() >= l) { $items.siblings('.next').addClass('disabled'); }
            });
    }

    return {
        init: init
    };

})();

/*  Flyer handling */
APP.Flyer = (function () {
    var Overlay, $Form;
    var flyerID;

    // Load and init flyer
    function init() {
        // Restrict to main domain
        if (window.location.host !== "www.telenor.hu") return false;

        // Init flyers (on desktop only)
        if ($('body').data('mobile') || '') { return false; }

        // Add overlay
        Overlay = document.createElement('section');
        Overlay.className = 'overlay-container flyer';

        //* Query flyer overlay
        $.ajax({
            url: 'ajax_flyer.php?url=' + encodeURIComponent(window.location.pathname) + (APP.QueryString._flyer_blue ? '&blue=1' : ''),
            method: 'get'

            // Set up form
        }).done(
            setup
        );
    }

    // Set up and display flyer
    function setup(data) {
        //*DEBUG*/ console.log(data);

        // Invalid result or no flyer to present
        if (!data || !data.flyer) return;

        // Already shown
        flyerID = 'flyer_' + data.cookie_name;
        if (APP.FallbackStorage(flyerID + '_shown') && (parseInt(APP.FallbackStorage(flyerID + '_shown'), 10) > new Date().getTime())) {
            //console.log('Already shown: '+flyerID);
            return;
        }

        // Create document overlay and add flyer form contents
        document.body.appendChild(Overlay);

        Overlay.innerHTML = data.html;
        $Form = $(Overlay).find('form');

        // Display
        setTimeout(function () {
            $Form.addClass('visible');
        }, data.delay);

        // Submit logic
        $Form.on('click', 'button[value],input[type="submit"]', function (e) {
            // Selected formtarget (action button or active radio button)
            var $Selection = (this.value != "" ? $(this) : $Form.find('input:checked'));

            // GA track
            if (ga) {
                if ($Selection.data('gaAction') && $Selection.data('gaLabel')) {
                    //console.log('GA: [','_trackEvent','Flyer',$Selection.data('gaAction'),$Selection.data('gaLabel'),']');
                    ga('send', '_trackEvent', 'Flyer', $Selection.data('gaAction'), $Selection.data('gaLabel'));
                }
            }

            // Post to form target
            if ($Form.attr('action')) {
                var formdata = $Form.serialize();
                if ("name" in this) {
                    formdata = (formdata ? formdata + '&' : '') + this.name + '=' + encodeURIComponent(this.value || '');
                }

                $.ajax($Form.attr('action'), {
                    type: $Form.attr('method') || 'GET',
                    data: formdata
                }).done(function (res) {
                    var result;
                    try {
                        result = (typeof res === 'string' ? JSON.parse(res) : res);
                    } catch (e) {
                        return alert('Hiba történt, kérjük próbálkozzon később!');
                    }

                    //if (!result.ok) return alert('Hiba!'); // fail silently

                    success(data, $Selection);
                });

                // No postform
            } else {
                success(data, $Selection);
            }

            e.preventDefault();
        });
    }
    function success(data, $Selection) {
        // No multiple votes allowed (data.write_cookie uses localStorage)
        APP.FallbackStorage(flyerID + '_shown', new Date().getTime() + (data.showcookie_lifetime * 1000 * 60 * 60 * 24), data.write_cookie ? true : false);

        // Display success message
        $Form.html('<h3 class="acenter">Köszönjük válaszát!</h3>');
        $Form.addClass('fade');

        // Redirect, if needed
        if ($Selection.data('url')) setTimeout(function () {
            window.location.href = $Selection.data('url');
        }, 1000);
    }

    return { init: init }
})();

/* cookie warning */
APP.CookieWarning = (function () {
    function init() {
        // Init flyers (on desktop only)
        if ($('body').data('mobile') || '') { return false; }
        if ($('.cookiewarning').length == 0) { return false; }

        // Show on main page only
        if ($('.main>#carousel').length != 1) return false;

        $('.cookiewarning')
            .on('click', 'button.close', function (e, triggered) {
                if (!triggered) {
                    APP.FallbackStorage('cookiewarning', new Date().getTime() + 24 * 60 * 60 * 1000);
                }
            })
            .on('click', 'button.ok', function () {
                $('.cookiewarning button.close').trigger('click', true);
                APP.FallbackStorage('cookiewarning', 'ok');
            });

        if (APP.FallbackStorage('cookiewarning') && APP.FallbackStorage('cookiewarning') == 'ok') {
            return false;
        } else if (parseInt(APP.FallbackStorage('cookiewarning'), 10) > new Date().getTime()) {
            return false;
        } else {
            setTimeout(function () {
                $('.cookiewarning').addClass('visible');
            }, 1000);
        }
    }

    return { init: init }
})();

/*  Simple LocalStorage implementation, with session cookie fallbacks for older browsers
    based on https://gist.github.com/Fluidbyte/4718380

    Usage:
        SET:    APP.FallbackStorage ( <key> , <javascript-value-or-object> )
        GET:    APP.FallbackStorage ( <key> )
        REMOVE: APP.FallbackStorage ( <key> , null )

    Use third parameter to force cookie fallback:
        APP.FallbackStorage( <key> , <value>, true )
        APP.FallbackStorage( <key> , void(0), true )
 */
APP.FallbackStorage = function (key, value, use_fallback) {
    if (!use_fallback) use_fallback = !("localStorage" in window);

    // If a value is present, store it under "key"
    if (typeof value !== "undefined" && value !== null) {
        // Convert object values to JSON
        value = JSON.stringify(value);

        if (use_fallback) {
            setFallbackCookie(key, value);
        } else { // Native support
            localStorage.setItem(key, value);
        }
    }

    // Null specified, remove key
    if (value === null) {
        if (use_fallback) {
            removeFallbackCookie(key, '', -1);
        } else { // Native support
            localStorage.removeItem(key);
        }
    }

    // No value supplied, return value stored for "key"
    if (typeof value === "undefined") {
        if (use_fallback) {
            value = getFallbackCookie(key);
        } else { // Native support
            value = localStorage.getItem(key);
        }

        // Decode
        try {
            return JSON.parse(value);
        } catch (e) { }

        return null;
    }

    // Fallback functions - cookie handling (set/get/remove)
    function setFallbackCookie(key, value) {
        var date = new Date();
        date.setTime(new Date().getTime() + 365 * 24 * 60 * 60 * 1000);

        var expires = "; expires=" + date.toGMTString();
        document.cookie = "localStorage_" + key + "=" + value + expires + "; path=/";
    }

    function removeFallbackCookie(key, value, exp) {
        var date = new Date();
        date.setTime(0);

        var expires = "; expires=" + date.toGMTString();
        document.cookie = "localStorage_" + key + "=" + value + expires + "; path=/";
    }

    function getFallbackCookie(key) {
        var nameEQ = "localStorage_" + key + "=";
        var ca = document.cookie.split(';');
        for (var i = 0, max = ca.length; i < max; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

}/* APP.FallbackStorage */

/*
    Small light-weight templating lib for simple substitutions and in-content templates.
    Use it with <script type="text/template"> tags.

    Example workflow:
    var template_text = APP.TinyTemplate ("#template-selector")
        . substitute ("variable1","value 1")
        . substitute ("variable2",2)
        . toString();
 */
APP.TinyTemplate = function (object_or_source) {
    var $this;
    var source, content;

    function create(tpl) {
        var target = $(tpl);
        if (target.length) content = target.html(); else content = '' + tpl;

        source = content;

        $this = { substitute: substitute, reset: reset, toString: render };
        return $this;
    }
    function render(cleanup) {
        if (cleanup === undefined || cleanup) {
            return content.replace(new RegExp('{[^}]+}', 'g'), '');
        }

        return content;
    }
    function substitute(variable, value) {
        content = content.replace(new RegExp('{' + variable + '}', 'g'), value); // simple

        var rx = new RegExp('{([^`}]*)`' + variable + '`([^}]*)}', 'g');
        content = content.replace(rx, value ? '$1' + value + '$2' : ''); // tag with content

        return $this;
    }
    function reset() {
        content = source;

        return $this;
    }
    return create(object_or_source);
};

APP.SmoothScroll = (function () {
    var inited = false;

    function init() {
        $.extend($.easing, {
            def: 'easeOutExpo',
            swing: function (x, t, b, c, d) {
                return $.easing[$.easing.def](x, t, b, c, d);
            },

            easeOutExpo: function (x, t, b, c, d) {
                return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            }
        });

        inited = true;
    }

    function scrollTo(target, speed) {
        var target = isNaN(parseInt(target)) ? $(target).offset().top : parseInt(target);

        if (!inited) init();

        $('html, body').animate({ scrollTop: target }, speed, 'easeOutExpo');
    }

    return { init: init, scrollTo: scrollTo };
})();

APP.Pinterest = (function () {
    var pinit;

    function init() {
        if (!pinit && $('a[data-pin-do]').length) {
            pinit = document.createElement('script');
            pinit.type = 'text/javascript';
            pinit.src = '//web.archive.org/web/20150810104514/https://assets.pinterest.com/js/pinit.js';

            document.getElementsByTagName('head')[0].appendChild(pinit);
        }
    }
    return { init: init };
})();

// Init with no-jquery fallback
// Module-based loading approach for javascript app modules
try {
    $(document).ready(APP.init);

} catch (e) {
    if ("addEventListener" in window) {
        document.addEventListener("DOMContentLoaded", APP.init);

    } else if ("attachEvent" in window) {
        window.attachEvent("onload", APP.init);
    }

    console.log("[APP.js] No jQuery loaded, using fallback")
}