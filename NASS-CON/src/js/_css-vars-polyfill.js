/*!
 * css-vars-ponyfill
 * v1.9.0
 * https://github.com/jhildenbiddle/css-vars-ponyfill
 * (c) 2018 John Hildenbiddle <http://hildenbiddle.com>
 * MIT license
 */
! function (e, n) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : e.cssVars = n()
}(this, function () {
  "use strict";

  function e(e) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      t = {
        mimeType: n.mimeType || null,
        onBeforeSend: n.onBeforeSend || Function.prototype,
        onSuccess: n.onSuccess || Function.prototype,
        onError: n.onError || Function.prototype,
        onComplete: n.onComplete || Function.prototype
      },
      r = Array.isArray(e) ? e : [e],
      o = Array.apply(null, Array(r.length)).map(function (e) {
        return null
      });

    function s(e, n) {
      t.onError(e, r[n], n)
    }

    function a(e, n) {
      var s = t.onSuccess(e, r[n], n);
      e = !1 === s ? "" : s || e, o[n] = e, -1 === o.indexOf(null) && t.onComplete(o)
    }
    r.forEach(function (e, n) {
      var r = document.createElement("a");
      r.setAttribute("href", e), r.href = r.href;
      var o = r.host !== location.host,
        i = r.protocol === location.protocol;
      if (o && "undefined" != typeof XDomainRequest)
        if (i) {
          var u = new XDomainRequest;
          u.open("GET", e), u.timeout = 0, u.onprogress = Function.prototype, u.ontimeout = Function.prototype, u.onload = function () {
            a(u.responseText, n)
          }, u.onerror = function (e) {
            s(u, n)
          }, setTimeout(function () {
            u.send()
          }, 0)
        } else console.log("Internet Explorer 9 Cross-Origin (CORS) requests must use the same protocol"), s(null, n);
      else {
        var c = new XMLHttpRequest;
        c.open("GET", e), t.mimeType && c.overrideMimeType && c.overrideMimeType(t.mimeType), t.onBeforeSend(c, e, n), c.onreadystatechange = function () {
          4 === c.readyState && (200 === c.status ? a(c.responseText, n) : s(c, n))
        }, c.send()
      }
    })
  }

  function n(n) {
    var r = {
        cssComments: /\/\*[\s\S]+?\*\//g,
        cssImports: /(?:@import\s*)(?:url\(\s*)?(?:['"])([^'"]*)(?:['"])(?:\s*\))?(?:[^;]*;)/g
      },
      o = {
        include: n.include || 'style,link[rel="stylesheet"]',
        exclude: n.exclude || null,
        filter: n.filter || null,
        onBeforeSend: n.onBeforeSend || Function.prototype,
        onSuccess: n.onSuccess || Function.prototype,
        onError: n.onError || Function.prototype,
        onComplete: n.onComplete || Function.prototype
      },
      s = Array.apply(null, document.querySelectorAll(o.include)).filter(function (e) {
        return n = e, t = o.exclude, !(n.matches || n.matchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector || n.msMatchesSelector || n.oMatchesSelector).call(n, t);
        var n, t
      }),
      a = Array.apply(null, Array(s.length)).map(function (e) {
        return null
      });

    function i() {
      if (-1 === a.indexOf(null)) {
        var e = a.join("");
        o.onComplete(e, a, s)
      }
    }

    function u(n, t, r, s) {
      var u = o.onSuccess(n, r, s);
      (function n(t, r, s, a) {
        var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : [];
        var u = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : [];
        var l = c(t, s, u);
        l.rules.length ? e(l.absoluteUrls, {
          onBeforeSend: function (e, n, t) {
            o.onBeforeSend(e, r, n)
          },
          onSuccess: function (e, n, t) {
            var s = o.onSuccess(e, r, n),
              a = c(e = !1 === s ? "" : s || e, n, u);
            return a.rules.forEach(function (n, t) {
              e = e.replace(n, a.absoluteRules[t])
            }), e
          },
          onError: function (e, o, c) {
            i.push({
              xhr: e,
              url: o
            }), u.push(l.rules[c]), n(t, r, s, a, i, u)
          },
          onComplete: function (e) {
            e.forEach(function (e, n) {
              t = t.replace(l.rules[n], e)
            }), n(t, r, s, a, i, u)
          }
        }) : a(t, i)
      })(n = !1 === u ? "" : u || n, r, s, function (e, n) {
        null === a[t] && (n.forEach(function (e) {
          return o.onError(e.xhr, r, e.url)
        }), !o.filter || o.filter.test(e) ? a[t] = e : a[t] = "", i())
      })
    }

    function c(e, n) {
      var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [],
        s = {};
      return s.rules = (e.replace(r.cssComments, "").match(r.cssImports) || []).filter(function (e) {
        return -1 === o.indexOf(e)
      }), s.urls = s.rules.map(function (e) {
        return e.replace(r.cssImports, "$1")
      }), s.absoluteUrls = s.urls.map(function (e) {
        return t(e, n)
      }), s.absoluteRules = s.rules.map(function (e, r) {
        var o = s.urls[r],
          a = t(s.absoluteUrls[r], n);
        return e.replace(o, a)
      }), s
    }
    s.length ? s.forEach(function (n, r) {
      var s = n.getAttribute("href"),
        c = n.getAttribute("rel"),
        l = "LINK" === n.nodeName && s && c && "stylesheet" === c.toLowerCase(),
        f = "STYLE" === n.nodeName;
      l ? e(s, {
        mimeType: "text/css",
        onBeforeSend: function (e, t, r) {
          o.onBeforeSend(e, n, t)
        },
        onSuccess: function (e, o, a) {
          var i = t(s, location.href);
          u(e, r, n, i)
        },
        onError: function (e, t, s) {
          a[r] = "", o.onError(e, n, t), i()
        }
      }) : f ? u(n.textContent, r, n, location.href) : (a[r] = "", i())
    }) : o.onComplete("", [])
  }

  function t(e) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : location.href,
      t = document.implementation.createHTMLDocument(""),
      r = t.createElement("base"),
      o = t.createElement("a");
    return t.head.appendChild(r), t.body.appendChild(o), r.href = n, o.href = e, o.href
  }

  function r() {
    for (var e = function (e) {
        return e instanceof Object && e.constructor === Object
      }, n = arguments.length, t = Array(n), o = 0; o < n; o++) t[o] = arguments[o];
    return t.reduce(function (n, t) {
      return Object.keys(t).forEach(function (o) {
        var s = n[o],
          a = t[o];
        e(s) && e(a) ? n[o] = r(s, a) : n[o] = a
      }), n
    }, {})
  }
  var o = s;

  function s(e, n, t) {
    e instanceof RegExp && (e = a(e, t)), n instanceof RegExp && (n = a(n, t));
    var r = i(e, n, t);
    return r && {
      start: r[0],
      end: r[1],
      pre: t.slice(0, r[0]),
      body: t.slice(r[0] + e.length, r[1]),
      post: t.slice(r[1] + n.length)
    }
  }

  function a(e, n) {
    var t = n.match(e);
    return t ? t[0] : null
  }

  function i(e, n, t) {
    var r, o, s, a, i, u = t.indexOf(e),
      c = t.indexOf(n, u + 1),
      l = u;
    if (u >= 0 && c > 0) {
      for (r = [], s = t.length; l >= 0 && !i;) l == u ? (r.push(l), u = t.indexOf(e, l + 1)) : 1 == r.length ? i = [r.pop(), c] : ((o = r.pop()) < s && (s = o, a = c), c = t.indexOf(n, l + 1)), l = u < c && u >= 0 ? u : c;
      r.length && (i = [s, a])
    }
    return i
  }

  function u(e) {
    function n(e) {
      throw new Error("CSS parse error: " + e)
    }

    function t(n) {
      var t = n.exec(e);
      if (t) return e = e.slice(t[0].length), t
    }

    function r() {
      t(/^\s*/)
    }

    function o() {
      return t(/^{\s*/)
    }

    function s() {
      return t(/^}/)
    }

    function a() {
      if (r(), "/" === e[0] && "*" === e[1]) {
        for (var t = 2; e[t] && ("*" !== e[t] || "/" !== e[t + 1]);) t++;
        if (!e[t]) return n("end of comment is missing");
        var o = e.slice(2, t);
        return e = e.slice(t + 2), {
          type: "comment",
          comment: o
        }
      }
    }

    function i() {
      for (var e = [], n = void 0; n = a();) e.push(n);
      return e
    }

    function u() {
      for (r();
        "}" === e[0];) n("extra closing bracket");
      var o = t(/^(("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^{])+)/);
      if (o) return o[0].trim().replace(/\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*\/+/g, "").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g, function (e) {
        return e.replace(/,/g, "‌")
      }).split(/\s*(?![^(]*\)),\s*/).map(function (e) {
        return e.replace(/\u200C/g, ",")
      })
    }

    function c() {
      t(/^([;\s]*)+/);
      var e = /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//g,
        r = t(/^(\*?[-#\/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);
      if (r) {
        if (r = r[0].trim(), !t(/^:\s*/)) return n("property missing ':'");
        var o = t(/^((?:\/\*.*?\*\/|'(?:\\'|.)*?'|"(?:\\"|.)*?"|\((\s*'(?:\\'|.)*?'|"(?:\\"|.)*?"|[^)]*?)\s*\)|[^};])+)/),
          s = {
            type: "declaration",
            property: r.replace(e, ""),
            value: o ? o[0].replace(e, "").trim() : ""
          };
        return t(/^[;\s]*/), s
      }
    }

    function l() {
      if (!o()) return n("missing '{'");
      for (var e = void 0, t = i(); e = c();) t.push(e), t = t.concat(i());
      return s() ? t : n("missing '}'")
    }

    function f() {
      r();
      for (var e = [], n = void 0; n = t(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/);) e.push(n[1]), t(/^,\s*/);
      if (e.length) return {
        type: "keyframe",
        values: e,
        declarations: l()
      }
    }

    function p() {
      if (r(), "@" === e[0]) return function () {
        var e = t(/^@([-\w]+)?keyframes\s*/);
        if (e) {
          var r = e[1];
          if (!(e = t(/^([-\w]+)\s*/))) return n("@keyframes missing name");
          var a = e[1];
          if (!o()) return n("@keyframes missing '{'");
          for (var u = void 0, c = i(); u = f();) c.push(u), c = c.concat(i());
          return s() ? {
            type: "keyframes",
            name: a,
            vendor: r,
            keyframes: c
          } : n("@keyframes missing '}'")
        }
      }() || function () {
        var e = t(/^@supports *([^{]+)/);
        if (e) return {
          type: "supports",
          supports: e[1].trim(),
          rules: d()
        }
      }() || function () {
        if (t(/^@host\s*/)) return {
          type: "host",
          rules: d()
        }
      }() || function () {
        var e = t(/^@media *([^{]+)/);
        if (e) return {
          type: "media",
          media: e[1].trim(),
          rules: d()
        }
      }() || function () {
        var e = t(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);
        if (e) return {
          type: "custom-media",
          name: e[1].trim(),
          media: e[2].trim()
        }
      }() || function () {
        if (t(/^@page */)) return {
          type: "page",
          selectors: u() || [],
          declarations: l()
        }
      }() || function () {
        var e = t(/^@([-\w]+)?document *([^{]+)/);
        if (e) return {
          type: "document",
          document: e[2].trim(),
          vendor: e[1] ? e[1].trim() : null,
          rules: d()
        }
      }() || function () {
        if (t(/^@font-face\s*/)) return {
          type: "font-face",
          declarations: l()
        }
      }() || function () {
        var e = t(/^@(import|charset|namespace)\s*([^;]+);/);
        if (e) return {
          type: e[1],
          name: e[2].trim()
        }
      }()
    }

    function d(t) {
      if (!t && !o()) return n("missing '{'");
      for (var r, a = void 0, c = i(); e.length && (t || "}" !== e[0]) && (a = p() || (void 0, (r = u() || []).length || n("selector missing"), {
          type: "rule",
          selectors: r,
          declarations: l()
        }));) c.push(a), c = c.concat(i());
      return t || s() ? c : n("missing '}'")
    }
    return {
      type: "stylesheet",
      stylesheet: {
        rules: d(!0),
        errors: []
      }
    }
  }
  s.range = i;
  var c = {},
    l = "--",
    f = "var";

  function p(e) {
    var n, t, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      a = {},
      i = r({
        fixNestedCalc: !0,
        onlyVars: !0,
        persist: !1,
        preserve: !1,
        variables: {},
        onWarning: function () {}
      }, s),
      p = i.persist ? c : i.variables,
      m = u(e);
    if (i.onlyVars && (m.stylesheet.rules = function e(n) {
        return n.filter(function (n) {
          if (n.declarations) {
            var t = n.declarations.filter(function (e) {
              var n = e.property && 0 === e.property.indexOf(l),
                t = e.value && e.value.indexOf(f + "(") > -1;
              return n || t
            });
            return "font-face" !== n.type && (n.declarations = t), Boolean(t.length)
          }
          return n.keyframes ? Boolean(n.keyframes.filter(function (e) {
            return Boolean(e.declarations.filter(function (e) {
              var n = e.property && 0 === e.property.indexOf(l),
                t = e.value && e.value.indexOf(f + "(") > -1;
              return n || t
            }).length)
          }).length) : !n.rules || (n.rules = e(n.rules).filter(function (e) {
            return e.declarations && e.declarations.length
          }), Boolean(n.rules.length))
        })
      }(m.stylesheet.rules)), m.stylesheet.rules.forEach(function (e) {
        var n = [];
        if ("rule" === e.type && 1 === e.selectors.length && ":root" === e.selectors[0] && (e.declarations.forEach(function (e, t) {
            var r = e.property,
              o = e.value;
            r && 0 === r.indexOf(l) && (a[r] = o, n.push(t))
          }), !i.preserve))
          for (var t = n.length - 1; t >= 0; t--) e.declarations.splice(n[t], 1)
      }), Object.keys(i.variables).forEach(function (e) {
        var n = "--" + e.replace(/^-+/, ""),
          t = i.variables[e];
        e !== n && (i.variables[n] = t, delete i.variables[e]), i.persist && (c[n] = t)
      }), Object.keys(p).length) {
      var v = {
        declarations: [],
        selectors: [":root"],
        type: "rule"
      };
      Object.keys(p).forEach(function (e) {
        a[e] = p[e], v.declarations.push({
          type: "declaration",
          property: e,
          value: p[e]
        }), i.persist && (c[e] = p[e])
      }), i.preserve && m.stylesheet.rules.push(v)
    }
    return function e(n, t) {
        n.rules.forEach(function (r) {
          r.rules ? e(r, t) : r.keyframes ? r.keyframes.forEach(function (e) {
            "keyframe" === e.type && t(e.declarations, r)
          }) : r.declarations && t(r.declarations, n)
        })
      }(m.stylesheet, function (e, n) {
        for (var t = void 0, r = void 0, o = void 0, s = 0; s < e.length; s++) o = (t = e[s]).value, "declaration" === t.type && o && -1 !== o.indexOf(f + "(") && (r = d(o, a, i)) !== t.value && (i.preserve ? (e.splice(s, 0, {
          type: t.type,
          property: t.property,
          value: r
        }), s++) : t.value = r)
      }), i.fixNestedCalc && (n = m.stylesheet.rules, t = /(-[a-z]+-)?calc\(/, n.forEach(function (e) {
        e.declarations && e.declarations.forEach(function (e) {
          for (var n = e.value, r = ""; t.test(n);) {
            var s = o("calc(", ")", n || "");
            for (n = n.slice(s.end); t.test(s.body);) {
              var a = o(t, ")", s.body);
              s.body = a.pre + "(" + a.body + ")" + a.post
            }
            r += s.pre + "calc(" + s.body, r += t.test(n) ? "" : ")" + s.post
          }
          e.value = r || e.value
        })
      })),
      function (e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
          t = arguments[2],
          r = {
            charset: function (e) {
              return "@charset " + e.name + ";"
            },
            comment: function (e) {
              return 0 === e.comment.indexOf("__CSSVARSPONYFILL") ? "/*" + e.comment + "*/" : ""
            },
            "custom-media": function (e) {
              return "@custom-media " + e.name + " " + e.media + ";"
            },
            declaration: function (e) {
              return e.property + ":" + e.value + ";"
            },
            document: function (e) {
              return "@" + (e.vendor || "") + "document " + e.document + "{" + o(e.rules) + "}"
            },
            "font-face": function (e) {
              return "@font-face{" + o(e.declarations) + "}"
            },
            host: function (e) {
              return "@host{" + o(e.rules) + "}"
            },
            import: function (e) {
              return "@import " + e.name + ";"
            },
            keyframe: function (e) {
              return e.values.join(",") + "{" + o(e.declarations) + "}"
            },
            keyframes: function (e) {
              return "@" + (e.vendor || "") + "keyframes " + e.name + "{" + o(e.keyframes) + "}"
            },
            media: function (e) {
              return "@media " + e.media + "{" + o(e.rules) + "}"
            },
            namespace: function (e) {
              return "@namespace " + e.name + ";"
            },
            page: function (e) {
              return "@page " + (e.selectors.length ? e.selectors.join(", ") : "") + "{" + o(e.declarations) + "}"
            },
            rule: function (e) {
              var n = e.declarations;
              if (n.length) return e.selectors.join(",") + "{" + o(n) + "}"
            },
            supports: function (e) {
              return "@supports " + e.supports + "{" + o(e.rules) + "}"
            }
          };

        function o(e) {
          for (var o = "", s = 0; s < e.length; s++) {
            var a = e[s];
            t && t(a);
            var i = r[a.type](a);
            i && (o += i, i.length && a.selectors && (o += n))
          }
          return o
        }
        return o(e.stylesheet.rules)
      }(m)
  }

  function d(e, n) {
    var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
      r = arguments[3],
      s = o("var(", ")", e),
      a = "CSS transform warning:";
    return s ? 0 === s.body.trim().length ? (t.onWarning(a + " var() must contain a non-whitespace string"), e) : s.pre + function (e) {
      var o = e.split(",")[0],
        s = (e.match(/(?:\s*,\s*){1}(.*)?/) || [])[1],
        i = n.hasOwnProperty(o) ? String(n[o]) : void 0,
        u = i || (s ? String(s) : void 0),
        c = r || e;
      return i || t.onWarning(a + ' variable "' + o + '" is undefined'), u && "undefined" !== u && u.length > 0 ? d(u, n, t, c) : "var(" + c + ")"
    }(s.body) + d(s.post, n, t) : (-1 !== e.indexOf("var(") && t.onWarning(a + ' missing closing ")" in the value "' + e + '"'), e)
  }
  var m = "css-vars-ponyfill",
    v = {
      include: "style,link[rel=stylesheet]",
      exclude: "",
      fixNestedCalc: !0,
      onlyLegacy: !0,
      onlyVars: !1,
      preserve: !1,
      silent: !1,
      updateDOM: !0,
      updateURLs: !0,
      variables: {},
      watch: !1,
      onBeforeSend: function () {},
      onSuccess: function () {},
      onWarning: function () {},
      onError: function () {},
      onComplete: function () {}
    },
    y = "undefined" != typeof window,
    h = y && window.CSS && window.CSS.supports && window.CSS.supports("(--a: 0)"),
    g = {
      cssComments: /\/\*[\s\S]+?\*\//g,
      cssKeyframes: /@(?:-\w*-)?keyframes/,
      cssUrls: /url\((?!['"]?(?:data|http|\/\/):)['"]?([^'")]*)['"]?\)/g,
      cssVars: /(?:(?::root\s*{\s*[^;]*;*\s*)|(?:var\(\s*))(--[^:)]+)(?:\s*[:)])/
    },
    S = null;

  function b() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      t = r(v, e);

    function o(e, n, r, o) {
      t.silent || console.error(e + "\n", n), t.onError(e, n, r, o)
    }

    function s(e) {
      t.silent || console.warn(e), t.onWarning(e)
    }
    if (y)
      if ("loading" !== document.readyState)
        if (h && t.onlyLegacy) h && t.updateDOM && Object.keys(t.variables).forEach(function (e) {
          var n = "--" + e.replace(/^-+/, ""),
            r = t.variables[e];
          document.documentElement.style.setProperty(n, r)
        });
        else {
          var a = m;
          t.watch && function (e, n) {
            if (window.MutationObserver && !S) {
              var t = function (e) {
                  return "LINK" === e.tagName && -1 !== (e.getAttribute("rel") || "").indexOf("stylesheet")
                },
                r = function (e) {
                  return "STYLE" === e.tagName && (!n || e.id !== n)
                },
                o = null;
              (S = new MutationObserver(function (n) {
                var s = !1;
                n.forEach(function (n) {
                  if ("attributes" === n.type) s = t(n.target) || r(n.target);
                  else if ("childList" === n.type) {
                    var a = Array.apply(null, n.addedNodes),
                      i = Array.apply(null, n.removedNodes);
                    s = [].concat(a, i).some(function (e) {
                      var n = t(e) && !e.disabled,
                        o = r(e) && !e.disabled && g.cssVars.test(e.textContent);
                      return n || o
                    })
                  }
                  s && (clearTimeout(o), o = setTimeout(function () {
                    b(e)
                  }, 1))
                })
              })).observe(document.documentElement, {
                attributes: !0,
                attributeFilter: ["disabled", "href"],
                childList: !0,
                subtree: !0
              })
            }
          }(t, a), n({
            include: t.include,
            exclude: "#" + a + (t.exclude ? "," + t.exclude : ""),
            filter: t.onlyVars ? g.cssVars : null,
            onBeforeSend: t.onBeforeSend,
            onSuccess: function (e, n, r) {
              var o = t.onSuccess(e, n, r);
              (e = !1 === o ? "" : o || e, t.updateURLs) && (e.replace(g.cssComments, "").match(g.cssUrls) || []).forEach(function (n) {
                var t = n.replace(g.cssUrls, "$1"),
                  o = E(t, r);
                e = e.replace(n, n.replace(t, o))
              });
              return e
            },
            onError: function (e, n, t) {
              var r = e.responseURL || E(t, location.href),
                s = e.statusText ? "(" + e.statusText + ")" : "Unspecified Error" + (0 === e.status ? " (possibly CORS related)" : "");
              o("CSS XHR Error: " + r + " " + e.status + " " + s, n, e, r)
            },
            onComplete: function (e, n, r) {
              var i = null;
              e = n.map(function (e, n) {
                return g.cssVars.test(e) ? e : "/*__CSSVARSPONYFILL-" + n + "__*/"
              }).join("");
              try {
                e = p(e, {
                  fixNestedCalc: t.fixNestedCalc,
                  onlyVars: t.onlyVars,
                  persist: t.updateDOM,
                  preserve: t.preserve,
                  variables: t.variables,
                  onWarning: s
                });
                var u = g.cssKeyframes.test(e);
                if (e = e.replace(/\/\*__CSSVARSPONYFILL-(\d+)__\*\//g, function (e, t) {
                    return n[t]
                  }), t.updateDOM && r && r.length) {
                  var c = r[r.length - 1];
                  (i = document.querySelector("#" + a) || document.createElement("style")).setAttribute("id", a), i.textContent !== e && (i.textContent = e), c.nextSibling !== i && c.parentNode && c.parentNode.insertBefore(i, c.nextSibling), u && function () {
                    var e = ["animation-name", "-moz-animation-name", "-webkit-animation-name"].filter(function (e) {
                      return getComputedStyle(document.body)[e]
                    })[0];
                    if (e) {
                      for (var n = document.body.getElementsByTagName("*"), t = [], r = 0, o = n.length; r < o; r++) {
                        var s = n[r],
                          a = getComputedStyle(s)[e];
                        "none" !== a && (s.style[e] += "__CSSVARSPONYFILL-KEYFRAMES__", t.push(s))
                      }
                      document.body.offsetHeight;
                      for (var i = 0, u = t.length; i < u; i++) {
                        var c = t[i].style;
                        c[e] = c[e].replace("__CSSVARSPONYFILL-KEYFRAMES__", "")
                      }
                    }
                  }()
                }
              } catch (e) {
                var l = !1;
                n.forEach(function (e, n) {
                  try {
                    e = p(e, t)
                  } catch (e) {
                    var s = r[n - 0];
                    l = !0, o(e.message, s)
                  }
                }), l || o(e.message || e)
              }
              t.onComplete(e, i)
            }
          })
        } else document.addEventListener("DOMContentLoaded", function n(t) {
      b(e), document.removeEventListener("DOMContentLoaded", n)
    })
  }

  function E(e) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : location.href,
      t = document.implementation.createHTMLDocument(""),
      r = t.createElement("base"),
      o = t.createElement("a");
    return t.head.appendChild(r), t.body.appendChild(o), r.href = n, o.href = e, o.href
  }
  return b
});
//# sourceMappingURL=css-vars-ponyfill.min.js.map
