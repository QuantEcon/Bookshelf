"use strict";
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
function _classCallCheck(e, t) {
    if (!(e instanceof t))throw new TypeError("Cannot call a class as a function")
}
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
!function (e, t) {
    "object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && "object" === _typeof(module.exports) ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document)throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : void 0, function (e, t) {
    function n(e) {
        var t = !!e && "length" in e && e.length, n = se.type(e);
        return "function" !== n && !se.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }

    function i(e, t, n) {
        if (se.isFunction(t))return se.grep(e, function (e, i) {
            return !!t.call(e, i, e) !== n
        });
        if (t.nodeType)return se.grep(e, function (e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if (me.test(t))return se.filter(t, e, n);
            t = se.filter(t, e)
        }
        return se.grep(e, function (e) {
            return J.call(t, e) > -1 !== n
        })
    }

    function o(e, t) {
        for (; (e = e[t]) && 1 !== e.nodeType;);
        return e
    }

    function s(e) {
        var t = {};
        return se.each(e.match(Ce) || [], function (e, n) {
            t[n] = !0
        }), t
    }

    function r() {
        K.removeEventListener("DOMContentLoaded", r), e.removeEventListener("load", r), se.ready()
    }

    function a() {
        this.expando = se.expando + a.uid++
    }

    function l(e, t, n) {
        var i;
        if (void 0 === n && 1 === e.nodeType)if (i = "data-" + t.replace(ze, "-$&").toLowerCase(), n = e.getAttribute(i), "string" == typeof n) {
            try {
                n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Te.test(n) ? se.parseJSON(n) : n)
            } catch (o) {
            }
            _e.set(e, t, n)
        } else n = void 0;
        return n
    }

    function u(e, t, n, i) {
        var o, s = 1, r = 20, a = i ? function () {
                return i.cur()
            } : function () {
                return se.css(e, t, "")
            }, l = a(), u = n && n[3] || (se.cssNumber[t] ? "" : "px"),
            d = (se.cssNumber[t] || "px" !== u && +l) && Ae.exec(se.css(e, t));
        if (d && d[3] !== u) {
            u = u || d[3], n = n || [], d = +l || 1;
            do s = s || ".5", d /= s, se.style(e, t, d + u); while (s !== (s = a() / l) && 1 !== s && --r)
        }
        return n && (d = +d || +l || 0, o = n[1] ? d + (n[1] + 1) * n[2] : +n[2], i && (i.unit = u, i.start = d, i.end = o)), o
    }

    function d(e, t) {
        var n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && se.nodeName(e, t) ? se.merge([e], n) : n
    }

    function c(e, t) {
        for (var n = 0, i = e.length; n < i; n++)Fe.set(e[n], "globalEval", !t || Fe.get(t[n], "globalEval"))
    }

    function h(e, t, n, i, o) {
        for (var s, r, a, l, u, h, f = t.createDocumentFragment(), p = [], m = 0, g = e.length; m < g; m++)if (s = e[m], s || 0 === s)if ("object" === se.type(s)) se.merge(p, s.nodeType ? [s] : s); else if (Re.test(s)) {
            for (r = r || f.appendChild(t.createElement("div")), a = (Pe.exec(s) || ["", ""])[1].toLowerCase(), l = He[a] || He._default, r.innerHTML = l[1] + se.htmlPrefilter(s) + l[2], h = l[0]; h--;)r = r.lastChild;
            se.merge(p, r.childNodes), r = f.firstChild, r.textContent = ""
        } else p.push(t.createTextNode(s));
        for (f.textContent = "", m = 0; s = p[m++];)if (i && se.inArray(s, i) > -1) o && o.push(s); else if (u = se.contains(s.ownerDocument, s), r = d(f.appendChild(s), "script"), u && c(r), n)for (h = 0; s = r[h++];)Le.test(s.type || "") && n.push(s);
        return f
    }

    function f() {
        return !0
    }

    function p() {
        return !1
    }

    function m() {
        try {
            return K.activeElement
        } catch (e) {
        }
    }

    function g(e, t, n, i, o, s) {
        var r, a;
        if ("object" === ("undefined" == typeof t ? "undefined" : _typeof(t))) {
            "string" != typeof n && (i = i || n, n = void 0);
            for (a in t)g(e, a, n, i, t[a], s);
            return e
        }
        if (null == i && null == o ? (o = n, i = n = void 0) : null == o && ("string" == typeof n ? (o = i, i = void 0) : (o = i, i = n, n = void 0)), o === !1) o = p; else if (!o)return e;
        return 1 === s && (r = o, o = function (e) {
            return se().off(e), r.apply(this, arguments)
        }, o.guid = r.guid || (r.guid = se.guid++)), e.each(function () {
            se.event.add(this, t, o, i, n)
        })
    }

    function v(e, t) {
        return se.nodeName(e, "table") && se.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function y(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function b(e) {
        var t = We.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function w(e, t) {
        var n, i, o, s, r, a, l, u;
        if (1 === t.nodeType) {
            if (Fe.hasData(e) && (s = Fe.access(e), r = Fe.set(t, s), u = s.events)) {
                delete r.handle, r.events = {};
                for (o in u)for (n = 0, i = u[o].length; n < i; n++)se.event.add(t, o, u[o][n])
            }
            _e.hasData(e) && (a = _e.access(e), l = se.extend({}, a), _e.set(t, l))
        }
    }

    function C(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && De.test(e.type) ? t.checked = e.checked : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
    }

    function k(e, t, n, i) {
        t = Z.apply([], t);
        var o, s, r, a, l, u, c = 0, f = e.length, p = f - 1, m = t[0], g = se.isFunction(m);
        if (g || f > 1 && "string" == typeof m && !ie.checkClone && Be.test(m))return e.each(function (o) {
            var s = e.eq(o);
            g && (t[0] = m.call(this, o, s.html())), k(s, t, n, i)
        });
        if (f && (o = h(t, e[0].ownerDocument, !1, e, i), s = o.firstChild, 1 === o.childNodes.length && (o = s), s || i)) {
            for (r = se.map(d(o, "script"), y), a = r.length; c < f; c++)l = o, c !== p && (l = se.clone(l, !0, !0), a && se.merge(r, d(l, "script"))), n.call(e[c], l, c);
            if (a)for (u = r[r.length - 1].ownerDocument, se.map(r, b), c = 0; c < a; c++)l = r[c], Le.test(l.type || "") && !Fe.access(l, "globalEval") && se.contains(u, l) && (l.src ? se._evalUrl && se._evalUrl(l.src) : se.globalEval(l.textContent.replace(Ue, "")))
        }
        return e
    }

    function $(e, t, n) {
        for (var i, o = t ? se.filter(t, e) : e, s = 0; null != (i = o[s]); s++)n || 1 !== i.nodeType || se.cleanData(d(i)), i.parentNode && (n && se.contains(i.ownerDocument, i) && c(d(i, "script")), i.parentNode.removeChild(i));
        return e
    }

    function x(e, t) {
        var n = se(t.createElement(e)).appendTo(t.body), i = se.css(n[0], "display");
        return n.detach(), i
    }

    function F(e) {
        var t = K, n = Ge[e];
        return n || (n = x(e, t), "none" !== n && n || (Qe = (Qe || se("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = Qe[0].contentDocument, t.write(), t.close(), n = x(e, t), Qe.detach()), Ge[e] = n), n
    }

    function _(e, t, n) {
        var i, o, s, r, a = e.style;
        return n = n || Xe(e), r = n ? n.getPropertyValue(t) || n[t] : void 0, "" !== r && void 0 !== r || se.contains(e.ownerDocument, e) || (r = se.style(e, t)), n && !ie.pixelMarginRight() && Ke.test(r) && Ye.test(t) && (i = a.width, o = a.minWidth, s = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = n.width, a.width = i, a.minWidth = o, a.maxWidth = s), void 0 !== r ? r + "" : r
    }

    function T(e, t) {
        return {
            get: function () {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function z(e) {
        if (e in it)return e;
        for (var t = e[0].toUpperCase() + e.slice(1), n = nt.length; n--;)if (e = nt[n] + t, e in it)return e
    }

    function E(e, t, n) {
        var i = Ae.exec(t);
        return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t
    }

    function A(e, t, n, i, o) {
        for (var s = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, r = 0; s < 4; s += 2)"margin" === n && (r += se.css(e, n + Oe[s], !0, o)), i ? ("content" === n && (r -= se.css(e, "padding" + Oe[s], !0, o)), "margin" !== n && (r -= se.css(e, "border" + Oe[s] + "Width", !0, o))) : (r += se.css(e, "padding" + Oe[s], !0, o), "padding" !== n && (r += se.css(e, "border" + Oe[s] + "Width", !0, o)));
        return r
    }

    function O(e, t, n) {
        var i = !0, o = "width" === t ? e.offsetWidth : e.offsetHeight, s = Xe(e),
            r = "border-box" === se.css(e, "boxSizing", !1, s);
        if (o <= 0 || null == o) {
            if (o = _(e, t, s), (o < 0 || null == o) && (o = e.style[t]), Ke.test(o))return o;
            i = r && (ie.boxSizingReliable() || o === e.style[t]), o = parseFloat(o) || 0
        }
        return o + A(e, t, n || (r ? "border" : "content"), i, s) + "px"
    }

    function S(e, t) {
        for (var n, i, o, s = [], r = 0, a = e.length; r < a; r++)i = e[r], i.style && (s[r] = Fe.get(i, "olddisplay"), n = i.style.display, t ? (s[r] || "none" !== n || (i.style.display = ""), "" === i.style.display && Se(i) && (s[r] = Fe.access(i, "olddisplay", F(i.nodeName)))) : (o = Se(i), "none" === n && o || Fe.set(i, "olddisplay", o ? n : se.css(i, "display"))));
        for (r = 0; r < a; r++)i = e[r], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? s[r] || "" : "none"));
        return e
    }

    function D(e, t, n, i, o) {
        return new D.prototype.init(e, t, n, i, o)
    }

    function P() {
        return e.setTimeout(function () {
            ot = void 0
        }), ot = se.now()
    }

    function L(e, t) {
        var n, i = 0, o = {height: e};
        for (t = t ? 1 : 0; i < 4; i += 2 - t)n = Oe[i], o["margin" + n] = o["padding" + n] = e;
        return t && (o.opacity = o.width = e), o
    }

    function H(e, t, n) {
        for (var i, o = (M.tweeners[t] || []).concat(M.tweeners["*"]), s = 0, r = o.length; s < r; s++)if (i = o[s].call(n, t, e))return i
    }

    function R(e, t, n) {
        var i, o, s, r, a, l, u, d, c = this, h = {}, f = e.style, p = e.nodeType && Se(e), m = Fe.get(e, "fxshow");
        n.queue || (a = se._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function () {
            a.unqueued || l()
        }), a.unqueued++, c.always(function () {
            c.always(function () {
                a.unqueued--, se.queue(e, "fx").length || a.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], u = se.css(e, "display"), d = "none" === u ? Fe.get(e, "olddisplay") || F(e.nodeName) : u, "inline" === d && "none" === se.css(e, "float") && (f.display = "inline-block")), n.overflow && (f.overflow = "hidden", c.always(function () {
            f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2]
        }));
        for (i in t)if (o = t[i], rt.exec(o)) {
            if (delete t[i], s = s || "toggle" === o, o === (p ? "hide" : "show")) {
                if ("show" !== o || !m || void 0 === m[i])continue;
                p = !0
            }
            h[i] = m && m[i] || se.style(e, i)
        } else u = void 0;
        if (se.isEmptyObject(h)) "inline" === ("none" === u ? F(e.nodeName) : u) && (f.display = u); else {
            m ? "hidden" in m && (p = m.hidden) : m = Fe.access(e, "fxshow", {}), s && (m.hidden = !p), p ? se(e).show() : c.done(function () {
                se(e).hide()
            }), c.done(function () {
                var t;
                Fe.remove(e, "fxshow");
                for (t in h)se.style(e, t, h[t])
            });
            for (i in h)r = H(p ? m[i] : 0, i, c), i in m || (m[i] = r.start, p && (r.end = r.start, r.start = "width" === i || "height" === i ? 1 : 0))
        }
    }

    function q(e, t) {
        var n, i, o, s, r;
        for (n in e)if (i = se.camelCase(n), o = t[i], s = e[n], se.isArray(s) && (o = s[1], s = e[n] = s[0]), n !== i && (e[i] = s, delete e[n]), r = se.cssHooks[i], r && "expand" in r) {
            s = r.expand(s), delete e[i];
            for (n in s)n in e || (e[n] = s[n], t[n] = o)
        } else t[i] = o
    }

    function M(e, t, n) {
        var i, o, s = 0, r = M.prefilters.length, a = se.Deferred().always(function () {
            delete l.elem
        }), l = function () {
            if (o)return !1;
            for (var t = ot || P(), n = Math.max(0, u.startTime + u.duration - t), i = n / u.duration || 0, s = 1 - i, r = 0, l = u.tweens.length; r < l; r++)u.tweens[r].run(s);
            return a.notifyWith(e, [u, s, n]), s < 1 && l ? n : (a.resolveWith(e, [u]), !1)
        }, u = a.promise({
            elem: e,
            props: se.extend({}, t),
            opts: se.extend(!0, {specialEasing: {}, easing: se.easing._default}, n),
            originalProperties: t,
            originalOptions: n,
            startTime: ot || P(),
            duration: n.duration,
            tweens: [],
            createTween: function (t, n) {
                var i = se.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                return u.tweens.push(i), i
            },
            stop: function (t) {
                var n = 0, i = t ? u.tweens.length : 0;
                if (o)return this;
                for (o = !0; n < i; n++)u.tweens[n].run(1);
                return t ? (a.notifyWith(e, [u, 1, 0]), a.resolveWith(e, [u, t])) : a.rejectWith(e, [u, t]), this
            }
        }), d = u.props;
        for (q(d, u.opts.specialEasing); s < r; s++)if (i = M.prefilters[s].call(u, e, d, u.opts))return se.isFunction(i.stop) && (se._queueHooks(u.elem, u.opts.queue).stop = se.proxy(i.stop, i)), i;
        return se.map(d, H, u), se.isFunction(u.opts.start) && u.opts.start.call(e, u), se.fx.timer(se.extend(l, {
            elem: e,
            anim: u,
            queue: u.opts.queue
        })), u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }

    function N(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }

    function I(e) {
        return function (t, n) {
            "string" != typeof t && (n = t, t = "*");
            var i, o = 0, s = t.toLowerCase().match(Ce) || [];
            if (se.isFunction(n))for (; i = s[o++];)"+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
        }
    }

    function j(e, t, n, i) {
        function o(a) {
            var l;
            return s[a] = !0, se.each(e[a] || [], function (e, a) {
                var u = a(t, n, i);
                return "string" != typeof u || r || s[u] ? r ? !(l = u) : void 0 : (t.dataTypes.unshift(u), o(u), !1)
            }), l
        }

        var s = {}, r = e === _t;
        return o(t.dataTypes[0]) || !s["*"] && o("*")
    }

    function B(e, t) {
        var n, i, o = se.ajaxSettings.flatOptions || {};
        for (n in t)void 0 !== t[n] && ((o[n] ? e : i || (i = {}))[n] = t[n]);
        return i && se.extend(!0, e, i), e
    }

    function W(e, t, n) {
        for (var i, o, s, r, a = e.contents, l = e.dataTypes; "*" === l[0];)l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
        if (i)for (o in a)if (a[o] && a[o].test(i)) {
            l.unshift(o);
            break
        }
        if (l[0] in n) s = l[0]; else {
            for (o in n) {
                if (!l[0] || e.converters[o + " " + l[0]]) {
                    s = o;
                    break
                }
                r || (r = o)
            }
            s = s || r
        }
        if (s)return s !== l[0] && l.unshift(s), n[s]
    }

    function U(e, t, n, i) {
        var o, s, r, a, l, u = {}, d = e.dataTypes.slice();
        if (d[1])for (r in e.converters)u[r.toLowerCase()] = e.converters[r];
        for (s = d.shift(); s;)if (e.responseFields[s] && (n[e.responseFields[s]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = s, s = d.shift())if ("*" === s) s = l; else if ("*" !== l && l !== s) {
            if (r = u[l + " " + s] || u["* " + s], !r)for (o in u)if (a = o.split(" "), a[1] === s && (r = u[l + " " + a[0]] || u["* " + a[0]])) {
                r === !0 ? r = u[o] : u[o] !== !0 && (s = a[0], d.unshift(a[1]));
                break
            }
            if (r !== !0)if (r && e["throws"]) t = r(t); else try {
                t = r(t)
            } catch (c) {
                return {state: "parsererror", error: r ? c : "No conversion from " + l + " to " + s}
            }
        }
        return {state: "success", data: t}
    }

    function Q(e, t, n, i) {
        var o;
        if (se.isArray(t)) se.each(t, function (t, o) {
            n || At.test(e) ? i(e, o) : Q(e + "[" + ("object" === ("undefined" == typeof o ? "undefined" : _typeof(o)) && null != o ? t : "") + "]", o, n, i)
        }); else if (n || "object" !== se.type(t)) i(e, t); else for (o in t)Q(e + "[" + o + "]", t[o], n, i)
    }

    function G(e) {
        return se.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }

    var Y = [], K = e.document, X = Y.slice, Z = Y.concat, V = Y.push, J = Y.indexOf, ee = {}, te = ee.toString,
        ne = ee.hasOwnProperty, ie = {}, oe = "2.2.4", se = function It(e, t) {
            return new It.fn.init(e, t)
        }, re = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ae = /^-ms-/, le = /-([\da-z])/gi, ue = function (e, t) {
            return t.toUpperCase()
        };
    se.fn = se.prototype = {
        jquery: oe, constructor: se, selector: "", length: 0, toArray: function () {
            return X.call(this)
        }, get: function (e) {
            return null != e ? e < 0 ? this[e + this.length] : this[e] : X.call(this)
        }, pushStack: function (e) {
            var t = se.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        }, each: function (e) {
            return se.each(this, e)
        }, map: function (e) {
            return this.pushStack(se.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        }, slice: function () {
            return this.pushStack(X.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (e) {
            var t = this.length, n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        }, end: function () {
            return this.prevObject || this.constructor()
        }, push: V, sort: Y.sort, splice: Y.splice
    }, se.extend = se.fn.extend = function () {
        var e, t, n, i, o, s, r = arguments[0] || {}, a = 1, l = arguments.length, u = !1;
        for ("boolean" == typeof r && (u = r, r = arguments[a] || {}, a++), "object" === ("undefined" == typeof r ? "undefined" : _typeof(r)) || se.isFunction(r) || (r = {}), a === l && (r = this, a--); a < l; a++)if (null != (e = arguments[a]))for (t in e)n = r[t], i = e[t], r !== i && (u && i && (se.isPlainObject(i) || (o = se.isArray(i))) ? (o ? (o = !1, s = n && se.isArray(n) ? n : []) : s = n && se.isPlainObject(n) ? n : {}, r[t] = se.extend(u, s, i)) : void 0 !== i && (r[t] = i));
        return r
    }, se.extend({
        expando: "jQuery" + (oe + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
            throw new Error(e)
        }, noop: function () {
        }, isFunction: function (e) {
            return "function" === se.type(e)
        }, isArray: Array.isArray, isWindow: function (e) {
            return null != e && e === e.window
        }, isNumeric: function (e) {
            var t = e && e.toString();
            return !se.isArray(e) && t - parseFloat(t) + 1 >= 0
        }, isPlainObject: function (e) {
            var t;
            if ("object" !== se.type(e) || e.nodeType || se.isWindow(e))return !1;
            if (e.constructor && !ne.call(e, "constructor") && !ne.call(e.constructor.prototype || {}, "isPrototypeOf"))return !1;
            for (t in e);
            return void 0 === t || ne.call(e, t)
        }, isEmptyObject: function (e) {
            var t;
            for (t in e)return !1;
            return !0
        }, type: function (e) {
            return null == e ? e + "" : "object" === ("undefined" == typeof e ? "undefined" : _typeof(e)) || "function" == typeof e ? ee[te.call(e)] || "object" : "undefined" == typeof e ? "undefined" : _typeof(e)
        }, globalEval: function (e) {
            var t, n = eval;
            e = se.trim(e), e && (1 === e.indexOf("use strict") ? (t = K.createElement("script"), t.text = e, K.head.appendChild(t).parentNode.removeChild(t)) : n(e))
        }, camelCase: function (e) {
            return e.replace(ae, "ms-").replace(le, ue)
        }, nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }, each: function (e, t) {
            var i, o = 0;
            if (n(e))for (i = e.length; o < i && t.call(e[o], o, e[o]) !== !1; o++); else for (o in e)if (t.call(e[o], o, e[o]) === !1)break;
            return e
        }, trim: function (e) {
            return null == e ? "" : (e + "").replace(re, "")
        }, makeArray: function (e, t) {
            var i = t || [];
            return null != e && (n(Object(e)) ? se.merge(i, "string" == typeof e ? [e] : e) : V.call(i, e)), i
        }, inArray: function (e, t, n) {
            return null == t ? -1 : J.call(t, e, n)
        }, merge: function (e, t) {
            for (var n = +t.length, i = 0, o = e.length; i < n; i++)e[o++] = t[i];
            return e.length = o, e
        }, grep: function (e, t, n) {
            for (var i, o = [], s = 0, r = e.length, a = !n; s < r; s++)i = !t(e[s], s), i !== a && o.push(e[s]);
            return o
        }, map: function (e, t, i) {
            var o, s, r = 0, a = [];
            if (n(e))for (o = e.length; r < o; r++)s = t(e[r], r, i), null != s && a.push(s); else for (r in e)s = t(e[r], r, i), null != s && a.push(s);
            return Z.apply([], a)
        }, guid: 1, proxy: function jt(e, t) {
            var n, i, jt;
            if ("string" == typeof t && (n = e[t], t = e, e = n), se.isFunction(e))return i = X.call(arguments, 2), jt = function () {
                return e.apply(t || this, i.concat(X.call(arguments)))
            }, jt.guid = e.guid = e.guid || se.guid++, jt
        }, now: Date.now, support: ie
    }), "function" == typeof Symbol && (se.fn[Symbol.iterator] = Y[Symbol.iterator]), se.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
        ee["[object " + t + "]"] = t.toLowerCase()
    });
    var de = function (e) {
        function t(e, t, n, i) {
            var o, s, r, a, l, u, c, f, p = t && t.ownerDocument, m = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== m && 9 !== m && 11 !== m)return n;
            if (!i && ((t ? t.ownerDocument || t : N) !== S && O(t), t = t || S, P)) {
                if (11 !== m && (u = ve.exec(e)))if (o = u[1]) {
                    if (9 === m) {
                        if (!(r = t.getElementById(o)))return n;
                        if (r.id === o)return n.push(r), n
                    } else if (p && (r = p.getElementById(o)) && q(t, r) && r.id === o)return n.push(r), n
                } else {
                    if (u[2])return V.apply(n, t.getElementsByTagName(e)), n;
                    if ((o = u[3]) && C.getElementsByClassName && t.getElementsByClassName)return V.apply(n, t.getElementsByClassName(o)), n
                }
                if (C.qsa && !U[e + " "] && (!L || !L.test(e))) {
                    if (1 !== m) p = t, f = e; else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((a = t.getAttribute("id")) ? a = a.replace(be, "\\$&") : t.setAttribute("id", a = M), c = F(e), s = c.length, l = he.test(a) ? "#" + a : "[id='" + a + "']"; s--;)c[s] = l + " " + h(c[s]);
                        f = c.join(","), p = ye.test(e) && d(t.parentNode) || t
                    }
                    if (f)try {
                        return V.apply(n, p.querySelectorAll(f)), n
                    } catch (g) {
                    } finally {
                        a === M && t.removeAttribute("id")
                    }
                }
            }
            return T(e.replace(ae, "$1"), t, n, i)
        }

        function n() {
            function e(n, i) {
                return t.push(n + " ") > k.cacheLength && delete e[t.shift()], e[n + " "] = i
            }

            var t = [];
            return e
        }

        function i(e) {
            return e[M] = !0, e
        }

        function o(e) {
            var t = S.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function s(e, t) {
            for (var n = e.split("|"), i = n.length; i--;)k.attrHandle[n[i]] = t
        }

        function r(e, t) {
            var n = t && e,
                i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || G) - (~e.sourceIndex || G);
            if (i)return i;
            if (n)for (; n = n.nextSibling;)if (n === t)return -1;
            return e ? 1 : -1
        }

        function a(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function l(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function u(e) {
            return i(function (t) {
                return t = +t, i(function (n, i) {
                    for (var o, s = e([], n.length, t), r = s.length; r--;)n[o = s[r]] && (n[o] = !(i[o] = n[o]))
                })
            })
        }

        function d(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }

        function c() {
        }

        function h(e) {
            for (var t = 0, n = e.length, i = ""; t < n; t++)i += e[t].value;
            return i
        }

        function f(e, t, n) {
            var i = t.dir, o = n && "parentNode" === i, s = j++;
            return t.first ? function (t, n, s) {
                for (; t = t[i];)if (1 === t.nodeType || o)return e(t, n, s)
            } : function (t, n, r) {
                var a, l, u, d = [I, s];
                if (r) {
                    for (; t = t[i];)if ((1 === t.nodeType || o) && e(t, n, r))return !0
                } else for (; t = t[i];)if (1 === t.nodeType || o) {
                    if (u = t[M] || (t[M] = {}), l = u[t.uniqueID] || (u[t.uniqueID] = {}), (a = l[i]) && a[0] === I && a[1] === s)return d[2] = a[2];
                    if (l[i] = d, d[2] = e(t, n, r))return !0
                }
            }
        }

        function p(e) {
            return e.length > 1 ? function (t, n, i) {
                for (var o = e.length; o--;)if (!e[o](t, n, i))return !1;
                return !0
            } : e[0]
        }

        function m(e, n, i) {
            for (var o = 0, s = n.length; o < s; o++)t(e, n[o], i);
            return i
        }

        function g(e, t, n, i, o) {
            for (var s, r = [], a = 0, l = e.length, u = null != t; a < l; a++)(s = e[a]) && (n && !n(s, i, o) || (r.push(s), u && t.push(a)));
            return r
        }

        function v(e, t, n, o, s, r) {
            return o && !o[M] && (o = v(o)), s && !s[M] && (s = v(s, r)), i(function (i, r, a, l) {
                var u, d, c, h = [], f = [], p = r.length, v = i || m(t || "*", a.nodeType ? [a] : a, []),
                    y = !e || !i && t ? v : g(v, h, e, a, l), b = n ? s || (i ? e : p || o) ? [] : r : y;
                if (n && n(y, b, a, l), o)for (u = g(b, f), o(u, [], a, l), d = u.length; d--;)(c = u[d]) && (b[f[d]] = !(y[f[d]] = c));
                if (i) {
                    if (s || e) {
                        if (s) {
                            for (u = [], d = b.length; d--;)(c = b[d]) && u.push(y[d] = c);
                            s(null, b = [], u, l)
                        }
                        for (d = b.length; d--;)(c = b[d]) && (u = s ? ee(i, c) : h[d]) > -1 && (i[u] = !(r[u] = c))
                    }
                } else b = g(b === r ? b.splice(p, b.length) : b), s ? s(null, r, b, l) : V.apply(r, b)
            })
        }

        function y(e) {
            for (var t, n, i, o = e.length, s = k.relative[e[0].type], r = s || k.relative[" "], a = s ? 1 : 0, l = f(function (e) {
                return e === t
            }, r, !0), u = f(function (e) {
                return ee(t, e) > -1
            }, r, !0), d = [function (e, n, i) {
                var o = !s && (i || n !== z) || ((t = n).nodeType ? l(e, n, i) : u(e, n, i));
                return t = null, o
            }]; a < o; a++)if (n = k.relative[e[a].type]) d = [f(p(d), n)]; else {
                if (n = k.filter[e[a].type].apply(null, e[a].matches), n[M]) {
                    for (i = ++a; i < o && !k.relative[e[i].type]; i++);
                    return v(a > 1 && p(d), a > 1 && h(e.slice(0, a - 1).concat({value: " " === e[a - 2].type ? "*" : ""})).replace(ae, "$1"), n, a < i && y(e.slice(a, i)), i < o && y(e = e.slice(i)), i < o && h(e))
                }
                d.push(n)
            }
            return p(d)
        }

        function b(e, n) {
            var o = n.length > 0, s = e.length > 0, r = function (i, r, a, l, u) {
                var d, c, h, f = 0, p = "0", m = i && [], v = [], y = z, b = i || s && k.find.TAG("*", u),
                    w = I += null == y ? 1 : Math.random() || .1, C = b.length;
                for (u && (z = r === S || r || u); p !== C && null != (d = b[p]); p++) {
                    if (s && d) {
                        for (c = 0, r || d.ownerDocument === S || (O(d), a = !P); h = e[c++];)if (h(d, r || S, a)) {
                            l.push(d);
                            break
                        }
                        u && (I = w)
                    }
                    o && ((d = !h && d) && f--, i && m.push(d))
                }
                if (f += p, o && p !== f) {
                    for (c = 0; h = n[c++];)h(m, v, r, a);
                    if (i) {
                        if (f > 0)for (; p--;)m[p] || v[p] || (v[p] = X.call(l));
                        v = g(v)
                    }
                    V.apply(l, v), u && !i && v.length > 0 && f + n.length > 1 && t.uniqueSort(l)
                }
                return u && (I = w, z = y), m
            };
            return o ? i(r) : r
        }

        var w, C, k, $, x, F, _, T, z, E, A, O, S, D, P, L, H, R, q, M = "sizzle" + 1 * new Date, N = e.document, I = 0,
            j = 0, B = n(), W = n(), U = n(), Q = function (e, t) {
                return e === t && (A = !0), 0
            }, G = 1 << 31, Y = {}.hasOwnProperty, K = [], X = K.pop, Z = K.push, V = K.push, J = K.slice,
            ee = function (e, t) {
                for (var n = 0, i = e.length; n < i; n++)if (e[n] === t)return n;
                return -1
            },
            te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ne = "[\\x20\\t\\r\\n\\f]", ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            oe = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]",
            se = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)",
            re = new RegExp(ne + "+", "g"), ae = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
            le = new RegExp("^" + ne + "*," + ne + "*"), ue = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
            de = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"), ce = new RegExp(se),
            he = new RegExp("^" + ie + "$"), fe = {
                ID: new RegExp("^#(" + ie + ")"),
                CLASS: new RegExp("^\\.(" + ie + ")"),
                TAG: new RegExp("^(" + ie + "|[*])"),
                ATTR: new RegExp("^" + oe),
                PSEUDO: new RegExp("^" + se),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + te + ")$", "i"),
                needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
            }, pe = /^(?:input|select|textarea|button)$/i, me = /^h\d$/i, ge = /^[^{]+\{\s*\[native \w/,
            ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ye = /[+~]/, be = /'|\\/g,
            we = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"), Ce = function (e, t, n) {
                var i = "0x" + t - 65536;
                return i !== i || n ? t : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
            }, ke = function () {
                O()
            };
        try {
            V.apply(K = J.call(N.childNodes), N.childNodes), K[N.childNodes.length].nodeType
        } catch ($e) {
            V = {
                apply: K.length ? function (e, t) {
                    Z.apply(e, J.call(t))
                } : function (e, t) {
                    for (var n = e.length, i = 0; e[n++] = t[i++];);
                    e.length = n - 1
                }
            }
        }
        C = t.support = {}, x = t.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }, O = t.setDocument = function (e) {
            var t, n, i = e ? e.ownerDocument || e : N;
            return i !== S && 9 === i.nodeType && i.documentElement ? (S = i, D = S.documentElement, P = !x(S), (n = S.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", ke, !1) : n.attachEvent && n.attachEvent("onunload", ke)), C.attributes = o(function (e) {
                return e.className = "i", !e.getAttribute("className")
            }), C.getElementsByTagName = o(function (e) {
                return e.appendChild(S.createComment("")), !e.getElementsByTagName("*").length
            }), C.getElementsByClassName = ge.test(S.getElementsByClassName), C.getById = o(function (e) {
                return D.appendChild(e).id = M, !S.getElementsByName || !S.getElementsByName(M).length
            }), C.getById ? (k.find.ID = function (e, t) {
                if ("undefined" != typeof t.getElementById && P) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }, k.filter.ID = function (e) {
                var t = e.replace(we, Ce);
                return function (e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete k.find.ID, k.filter.ID = function (e) {
                var t = e.replace(we, Ce);
                return function (e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), k.find.TAG = C.getElementsByTagName ? function (e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : C.qsa ? t.querySelectorAll(e) : void 0
            } : function (e, t) {
                var n, i = [], o = 0, s = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = s[o++];)1 === n.nodeType && i.push(n);
                    return i
                }
                return s
            }, k.find.CLASS = C.getElementsByClassName && function (e, t) {
                    if ("undefined" != typeof t.getElementsByClassName && P)return t.getElementsByClassName(e)
                }, H = [], L = [], (C.qsa = ge.test(S.querySelectorAll)) && (o(function (e) {
                D.appendChild(e).innerHTML = "<a id='" + M + "'></a><select id='" + M + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && L.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || L.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + M + "-]").length || L.push("~="), e.querySelectorAll(":checked").length || L.push(":checked"), e.querySelectorAll("a#" + M + "+*").length || L.push(".#.+[+~]")
            }), o(function (e) {
                var t = S.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && L.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || L.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), L.push(",.*:")
            })), (C.matchesSelector = ge.test(R = D.matches || D.webkitMatchesSelector || D.mozMatchesSelector || D.oMatchesSelector || D.msMatchesSelector)) && o(function (e) {
                C.disconnectedMatch = R.call(e, "div"), R.call(e, "[s!='']:x"), H.push("!=", se)
            }), L = L.length && new RegExp(L.join("|")), H = H.length && new RegExp(H.join("|")), t = ge.test(D.compareDocumentPosition), q = t || ge.test(D.contains) ? function (e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, i = t && t.parentNode;
                return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
            } : function (e, t) {
                if (t)for (; t = t.parentNode;)if (t === e)return !0;
                return !1
            }, Q = t ? function (e, t) {
                if (e === t)return A = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !C.sortDetached && t.compareDocumentPosition(e) === n ? e === S || e.ownerDocument === N && q(N, e) ? -1 : t === S || t.ownerDocument === N && q(N, t) ? 1 : E ? ee(E, e) - ee(E, t) : 0 : 4 & n ? -1 : 1)
            } : function (e, t) {
                if (e === t)return A = !0, 0;
                var n, i = 0, o = e.parentNode, s = t.parentNode, a = [e], l = [t];
                if (!o || !s)return e === S ? -1 : t === S ? 1 : o ? -1 : s ? 1 : E ? ee(E, e) - ee(E, t) : 0;
                if (o === s)return r(e, t);
                for (n = e; n = n.parentNode;)a.unshift(n);
                for (n = t; n = n.parentNode;)l.unshift(n);
                for (; a[i] === l[i];)i++;
                return i ? r(a[i], l[i]) : a[i] === N ? -1 : l[i] === N ? 1 : 0
            }, S) : S
        }, t.matches = function (e, n) {
            return t(e, null, null, n)
        }, t.matchesSelector = function (e, n) {
            if ((e.ownerDocument || e) !== S && O(e), n = n.replace(de, "='$1']"), C.matchesSelector && P && !U[n + " "] && (!H || !H.test(n)) && (!L || !L.test(n)))try {
                var i = R.call(e, n);
                if (i || C.disconnectedMatch || e.document && 11 !== e.document.nodeType)return i
            } catch (o) {
            }
            return t(n, S, null, [e]).length > 0
        }, t.contains = function (e, t) {
            return (e.ownerDocument || e) !== S && O(e), q(e, t)
        }, t.attr = function (e, t) {
            (e.ownerDocument || e) !== S && O(e);
            var n = k.attrHandle[t.toLowerCase()],
                i = n && Y.call(k.attrHandle, t.toLowerCase()) ? n(e, t, !P) : void 0;
            return void 0 !== i ? i : C.attributes || !P ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }, t.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, t.uniqueSort = function (e) {
            var t, n = [], i = 0, o = 0;
            if (A = !C.detectDuplicates, E = !C.sortStable && e.slice(0), e.sort(Q), A) {
                for (; t = e[o++];)t === e[o] && (i = n.push(o));
                for (; i--;)e.splice(n[i], 1)
            }
            return E = null, e
        }, $ = t.getText = function (e) {
            var t, n = "", i = 0, o = e.nodeType;
            if (o) {
                if (1 === o || 9 === o || 11 === o) {
                    if ("string" == typeof e.textContent)return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)n += $(e)
                } else if (3 === o || 4 === o)return e.nodeValue
            } else for (; t = e[i++];)n += $(t);
            return n
        }, k = t.selectors = {
            cacheLength: 50,
            createPseudo: i,
            match: fe,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (e) {
                    return e[1] = e[1].replace(we, Ce), e[3] = (e[3] || e[4] || e[5] || "").replace(we, Ce), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                }, CHILD: function (e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                }, PSEUDO: function (e) {
                    var t, n = !e[6] && e[2];
                    return fe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && ce.test(n) && (t = F(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function (e) {
                    var t = e.replace(we, Ce).toLowerCase();
                    return "*" === e ? function () {
                        return !0
                    } : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                }, CLASS: function (e) {
                    var t = B[e + " "];
                    return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && B(e, function (e) {
                            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                        })
                }, ATTR: function (e, n, i) {
                    return function (o) {
                        var s = t.attr(o, e);
                        return null == s ? "!=" === n : !n || (s += "", "=" === n ? s === i : "!=" === n ? s !== i : "^=" === n ? i && 0 === s.indexOf(i) : "*=" === n ? i && s.indexOf(i) > -1 : "$=" === n ? i && s.slice(-i.length) === i : "~=" === n ? (" " + s.replace(re, " ") + " ").indexOf(i) > -1 : "|=" === n && (s === i || s.slice(0, i.length + 1) === i + "-"))
                    }
                }, CHILD: function (e, t, n, i, o) {
                    var s = "nth" !== e.slice(0, 3), r = "last" !== e.slice(-4), a = "of-type" === t;
                    return 1 === i && 0 === o ? function (e) {
                        return !!e.parentNode
                    } : function (t, n, l) {
                        var u, d, c, h, f, p, m = s !== r ? "nextSibling" : "previousSibling", g = t.parentNode,
                            v = a && t.nodeName.toLowerCase(), y = !l && !a, b = !1;
                        if (g) {
                            if (s) {
                                for (; m;) {
                                    for (h = t; h = h[m];)if (a ? h.nodeName.toLowerCase() === v : 1 === h.nodeType)return !1;
                                    p = m = "only" === e && !p && "nextSibling"
                                }
                                return !0
                            }
                            if (p = [r ? g.firstChild : g.lastChild], r && y) {
                                for (h = g, c = h[M] || (h[M] = {}), d = c[h.uniqueID] || (c[h.uniqueID] = {}), u = d[e] || [], f = u[0] === I && u[1], b = f && u[2],
                                         h = f && g.childNodes[f]; h = ++f && h && h[m] || (b = f = 0) || p.pop();)if (1 === h.nodeType && ++b && h === t) {
                                    d[e] = [I, f, b];
                                    break
                                }
                            } else if (y && (h = t, c = h[M] || (h[M] = {}), d = c[h.uniqueID] || (c[h.uniqueID] = {}), u = d[e] || [], f = u[0] === I && u[1], b = f), b === !1)for (; (h = ++f && h && h[m] || (b = f = 0) || p.pop()) && ((a ? h.nodeName.toLowerCase() !== v : 1 !== h.nodeType) || !++b || (y && (c = h[M] || (h[M] = {}), d = c[h.uniqueID] || (c[h.uniqueID] = {}), d[e] = [I, b]), h !== t)););
                            return b -= o, b === i || b % i === 0 && b / i >= 0
                        }
                    }
                }, PSEUDO: function (e, n) {
                    var o, s = k.pseudos[e] || k.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    return s[M] ? s(n) : s.length > 1 ? (o = [e, e, "", n], k.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function (e, t) {
                        for (var i, o = s(e, n), r = o.length; r--;)i = ee(e, o[r]), e[i] = !(t[i] = o[r])
                    }) : function (e) {
                        return s(e, 0, o)
                    }) : s
                }
            },
            pseudos: {
                not: i(function (e) {
                    var t = [], n = [], o = _(e.replace(ae, "$1"));
                    return o[M] ? i(function (e, t, n, i) {
                        for (var s, r = o(e, null, i, []), a = e.length; a--;)(s = r[a]) && (e[a] = !(t[a] = s))
                    }) : function (e, i, s) {
                        return t[0] = e, o(t, null, s, n), t[0] = null, !n.pop()
                    }
                }), has: i(function (e) {
                    return function (n) {
                        return t(e, n).length > 0
                    }
                }), contains: i(function (e) {
                    return e = e.replace(we, Ce), function (t) {
                        return (t.textContent || t.innerText || $(t)).indexOf(e) > -1
                    }
                }), lang: i(function (e) {
                    return he.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(we, Ce).toLowerCase(), function (t) {
                        var n;
                        do if (n = P ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }), target: function (t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                }, root: function (e) {
                    return e === D
                }, focus: function (e) {
                    return e === S.activeElement && (!S.hasFocus || S.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                }, enabled: function (e) {
                    return e.disabled === !1
                }, disabled: function (e) {
                    return e.disabled === !0
                }, checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                }, selected: function (e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                }, empty: function (e) {
                    for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeType < 6)return !1;
                    return !0
                }, parent: function (e) {
                    return !k.pseudos.empty(e)
                }, header: function (e) {
                    return me.test(e.nodeName)
                }, input: function (e) {
                    return pe.test(e.nodeName)
                }, button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                }, text: function (e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                }, first: u(function () {
                    return [0]
                }), last: u(function (e, t) {
                    return [t - 1]
                }), eq: u(function (e, t, n) {
                    return [n < 0 ? n + t : n]
                }), even: u(function (e, t) {
                    for (var n = 0; n < t; n += 2)e.push(n);
                    return e
                }), odd: u(function (e, t) {
                    for (var n = 1; n < t; n += 2)e.push(n);
                    return e
                }), lt: u(function (e, t, n) {
                    for (var i = n < 0 ? n + t : n; --i >= 0;)e.push(i);
                    return e
                }), gt: u(function (e, t, n) {
                    for (var i = n < 0 ? n + t : n; ++i < t;)e.push(i);
                    return e
                })
            }
        }, k.pseudos.nth = k.pseudos.eq;
        for (w in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})k.pseudos[w] = a(w);
        for (w in{submit: !0, reset: !0})k.pseudos[w] = l(w);
        return c.prototype = k.filters = k.pseudos, k.setFilters = new c, F = t.tokenize = function (e, n) {
            var i, o, s, r, a, l, u, d = W[e + " "];
            if (d)return n ? 0 : d.slice(0);
            for (a = e, l = [], u = k.preFilter; a;) {
                i && !(o = le.exec(a)) || (o && (a = a.slice(o[0].length) || a), l.push(s = [])), i = !1, (o = ue.exec(a)) && (i = o.shift(), s.push({
                    value: i,
                    type: o[0].replace(ae, " ")
                }), a = a.slice(i.length));
                for (r in k.filter)!(o = fe[r].exec(a)) || u[r] && !(o = u[r](o)) || (i = o.shift(), s.push({
                    value: i,
                    type: r,
                    matches: o
                }), a = a.slice(i.length));
                if (!i)break
            }
            return n ? a.length : a ? t.error(e) : W(e, l).slice(0)
        }, _ = t.compile = function (e, t) {
            var n, i = [], o = [], s = U[e + " "];
            if (!s) {
                for (t || (t = F(e)), n = t.length; n--;)s = y(t[n]), s[M] ? i.push(s) : o.push(s);
                s = U(e, b(o, i)), s.selector = e
            }
            return s
        }, T = t.select = function (e, t, n, i) {
            var o, s, r, a, l, u = "function" == typeof e && e, c = !i && F(e = u.selector || e);
            if (n = n || [], 1 === c.length) {
                if (s = c[0] = c[0].slice(0), s.length > 2 && "ID" === (r = s[0]).type && C.getById && 9 === t.nodeType && P && k.relative[s[1].type]) {
                    if (t = (k.find.ID(r.matches[0].replace(we, Ce), t) || [])[0], !t)return n;
                    u && (t = t.parentNode), e = e.slice(s.shift().value.length)
                }
                for (o = fe.needsContext.test(e) ? 0 : s.length; o-- && (r = s[o], !k.relative[a = r.type]);)if ((l = k.find[a]) && (i = l(r.matches[0].replace(we, Ce), ye.test(s[0].type) && d(t.parentNode) || t))) {
                    if (s.splice(o, 1), e = i.length && h(s), !e)return V.apply(n, i), n;
                    break
                }
            }
            return (u || _(e, c))(i, t, !P, n, !t || ye.test(e) && d(t.parentNode) || t), n
        }, C.sortStable = M.split("").sort(Q).join("") === M, C.detectDuplicates = !!A, O(), C.sortDetached = o(function (e) {
            return 1 & e.compareDocumentPosition(S.createElement("div"))
        }), o(function (e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || s("type|href|height|width", function (e, t, n) {
            if (!n)return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), C.attributes && o(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || s("value", function (e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase())return e.defaultValue
        }), o(function (e) {
            return null == e.getAttribute("disabled")
        }) || s(te, function (e, t, n) {
            var i;
            if (!n)return e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
        }), t
    }(e);
    se.find = de, se.expr = de.selectors, se.expr[":"] = se.expr.pseudos, se.uniqueSort = se.unique = de.uniqueSort, se.text = de.getText, se.isXMLDoc = de.isXML, se.contains = de.contains;
    var ce = function (e, t, n) {
        for (var i = [], o = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;)if (1 === e.nodeType) {
            if (o && se(e).is(n))break;
            i.push(e)
        }
        return i
    }, he = function (e, t) {
        for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
        return n
    }, fe = se.expr.match.needsContext, pe = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, me = /^.[^:#\[\.,]*$/;
    se.filter = function (e, t, n) {
        var i = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? se.find.matchesSelector(i, e) ? [i] : [] : se.find.matches(e, se.grep(t, function (e) {
            return 1 === e.nodeType
        }))
    }, se.fn.extend({
        find: function (e) {
            var t, n = this.length, i = [], o = this;
            if ("string" != typeof e)return this.pushStack(se(e).filter(function () {
                for (t = 0; t < n; t++)if (se.contains(o[t], this))return !0
            }));
            for (t = 0; t < n; t++)se.find(e, o[t], i);
            return i = this.pushStack(n > 1 ? se.unique(i) : i), i.selector = this.selector ? this.selector + " " + e : e, i
        }, filter: function (e) {
            return this.pushStack(i(this, e || [], !1))
        }, not: function (e) {
            return this.pushStack(i(this, e || [], !0))
        }, is: function (e) {
            return !!i(this, "string" == typeof e && fe.test(e) ? se(e) : e || [], !1).length
        }
    });
    var ge, ve = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ye = se.fn.init = function (e, t, n) {
        var i, o;
        if (!e)return this;
        if (n = n || ge, "string" == typeof e) {
            if (i = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : ve.exec(e), !i || !i[1] && t)return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (i[1]) {
                if (t = t instanceof se ? t[0] : t, se.merge(this, se.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : K, !0)), pe.test(i[1]) && se.isPlainObject(t))for (i in t)se.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
                return this
            }
            return o = K.getElementById(i[2]), o && o.parentNode && (this.length = 1, this[0] = o), this.context = K, this.selector = e, this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : se.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(se) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), se.makeArray(e, this))
    };
    ye.prototype = se.fn, ge = se(K);
    var be = /^(?:parents|prev(?:Until|All))/, we = {children: !0, contents: !0, next: !0, prev: !0};
    se.fn.extend({
        has: function (e) {
            var t = se(e, this), n = t.length;
            return this.filter(function () {
                for (var e = 0; e < n; e++)if (se.contains(this, t[e]))return !0
            })
        }, closest: function (e, t) {
            for (var n, i = 0, o = this.length, s = [], r = fe.test(e) || "string" != typeof e ? se(e, t || this.context) : 0; i < o; i++)for (n = this[i]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (r ? r.index(n) > -1 : 1 === n.nodeType && se.find.matchesSelector(n, e))) {
                s.push(n);
                break
            }
            return this.pushStack(s.length > 1 ? se.uniqueSort(s) : s)
        }, index: function (e) {
            return e ? "string" == typeof e ? J.call(se(e), this[0]) : J.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (e, t) {
            return this.pushStack(se.uniqueSort(se.merge(this.get(), se(e, t))))
        }, addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), se.each({
        parent: function Bt(e) {
            var Bt = e.parentNode;
            return Bt && 11 !== Bt.nodeType ? Bt : null
        }, parents: function (e) {
            return ce(e, "parentNode")
        }, parentsUntil: function (e, t, n) {
            return ce(e, "parentNode", n)
        }, next: function (e) {
            return o(e, "nextSibling")
        }, prev: function (e) {
            return o(e, "previousSibling")
        }, nextAll: function (e) {
            return ce(e, "nextSibling")
        }, prevAll: function (e) {
            return ce(e, "previousSibling")
        }, nextUntil: function (e, t, n) {
            return ce(e, "nextSibling", n)
        }, prevUntil: function (e, t, n) {
            return ce(e, "previousSibling", n)
        }, siblings: function (e) {
            return he((e.parentNode || {}).firstChild, e)
        }, children: function (e) {
            return he(e.firstChild)
        }, contents: function (e) {
            return e.contentDocument || se.merge([], e.childNodes)
        }
    }, function (e, t) {
        se.fn[e] = function (n, i) {
            var o = se.map(this, t, n);
            return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (o = se.filter(i, o)), this.length > 1 && (we[e] || se.uniqueSort(o), be.test(e) && o.reverse()), this.pushStack(o)
        }
    });
    var Ce = /\S+/g;
    se.Callbacks = function (e) {
        e = "string" == typeof e ? s(e) : se.extend({}, e);
        var t, n, i, o, r = [], a = [], l = -1, u = function () {
            for (o = e.once, i = t = !0; a.length; l = -1)for (n = a.shift(); ++l < r.length;)r[l].apply(n[0], n[1]) === !1 && e.stopOnFalse && (l = r.length, n = !1);
            e.memory || (n = !1), t = !1, o && (r = n ? [] : "")
        }, d = {
            add: function () {
                return r && (n && !t && (l = r.length - 1, a.push(n)), function i(t) {
                    se.each(t, function (t, n) {
                        se.isFunction(n) ? e.unique && d.has(n) || r.push(n) : n && n.length && "string" !== se.type(n) && i(n)
                    })
                }(arguments), n && !t && u()), this
            }, remove: function () {
                return se.each(arguments, function (e, t) {
                    for (var n; (n = se.inArray(t, r, n)) > -1;)r.splice(n, 1), n <= l && l--
                }), this
            }, has: function (e) {
                return e ? se.inArray(e, r) > -1 : r.length > 0
            }, empty: function () {
                return r && (r = []), this
            }, disable: function () {
                return o = a = [], r = n = "", this
            }, disabled: function () {
                return !r
            }, lock: function () {
                return o = a = [], n || (r = n = ""), this
            }, locked: function () {
                return !!o
            }, fireWith: function (e, n) {
                return o || (n = n || [], n = [e, n.slice ? n.slice() : n], a.push(n), t || u()), this
            }, fire: function () {
                return d.fireWith(this, arguments), this
            }, fired: function () {
                return !!i
            }
        };
        return d
    }, se.extend({
        Deferred: function (e) {
            var t = [["resolve", "done", se.Callbacks("once memory"), "resolved"], ["reject", "fail", se.Callbacks("once memory"), "rejected"], ["notify", "progress", se.Callbacks("memory")]],
                n = "pending", i = {
                    state: function () {
                        return n
                    }, always: function () {
                        return o.done(arguments).fail(arguments), this
                    }, then: function () {
                        var e = arguments;
                        return se.Deferred(function (n) {
                            se.each(t, function (t, s) {
                                var r = se.isFunction(e[t]) && e[t];
                                o[s[1]](function () {
                                    var e = r && r.apply(this, arguments);
                                    e && se.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[s[0] + "With"](this === i ? n.promise() : this, r ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    }, promise: function (e) {
                        return null != e ? se.extend(e, i) : i
                    }
                }, o = {};
            return i.pipe = i.then, se.each(t, function (e, s) {
                var r = s[2], a = s[3];
                i[s[1]] = r.add, a && r.add(function () {
                    n = a
                }, t[1 ^ e][2].disable, t[2][2].lock), o[s[0]] = function () {
                    return o[s[0] + "With"](this === o ? i : this, arguments), this
                }, o[s[0] + "With"] = r.fireWith
            }), i.promise(o), e && e.call(o, o), o
        }, when: function (e) {
            var t, n, i, o = 0, s = X.call(arguments), r = s.length,
                a = 1 !== r || e && se.isFunction(e.promise) ? r : 0, l = 1 === a ? e : se.Deferred(),
                u = function (e, n, i) {
                    return function (o) {
                        n[e] = this, i[e] = arguments.length > 1 ? X.call(arguments) : o, i === t ? l.notifyWith(n, i) : --a || l.resolveWith(n, i)
                    }
                };
            if (r > 1)for (t = new Array(r), n = new Array(r), i = new Array(r); o < r; o++)s[o] && se.isFunction(s[o].promise) ? s[o].promise().progress(u(o, n, t)).done(u(o, i, s)).fail(l.reject) : --a;
            return a || l.resolveWith(i, s), l.promise()
        }
    });
    var ke;
    se.fn.ready = function (e) {
        return se.ready.promise().done(e), this
    }, se.extend({
        isReady: !1, readyWait: 1, holdReady: function (e) {
            e ? se.readyWait++ : se.ready(!0)
        }, ready: function (e) {
            (e === !0 ? --se.readyWait : se.isReady) || (se.isReady = !0, e !== !0 && --se.readyWait > 0 || (ke.resolveWith(K, [se]), se.fn.triggerHandler && (se(K).triggerHandler("ready"), se(K).off("ready"))))
        }
    }), se.ready.promise = function (t) {
        return ke || (ke = se.Deferred(), "complete" === K.readyState || "loading" !== K.readyState && !K.documentElement.doScroll ? e.setTimeout(se.ready) : (K.addEventListener("DOMContentLoaded", r), e.addEventListener("load", r))), ke.promise(t)
    }, se.ready.promise();
    var $e = function Wt(e, t, n, i, o, s, r) {
        var a = 0, l = e.length, u = null == n;
        if ("object" === se.type(n)) {
            o = !0;
            for (a in n)Wt(e, t, a, n[a], !0, s, r)
        } else if (void 0 !== i && (o = !0, se.isFunction(i) || (r = !0), u && (r ? (t.call(e, i), t = null) : (u = t, t = function (e, t, n) {
                return u.call(se(e), n)
            })), t))for (; a < l; a++)t(e[a], n, r ? i : i.call(e[a], a, t(e[a], n)));
        return o ? e : u ? t.call(e) : l ? t(e[0], n) : s
    }, xe = function (e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    };
    a.uid = 1, a.prototype = {
        register: function (e, t) {
            var n = t || {};
            return e.nodeType ? e[this.expando] = n : Object.defineProperty(e, this.expando, {
                value: n,
                writable: !0,
                configurable: !0
            }), e[this.expando]
        }, cache: function (e) {
            if (!xe(e))return {};
            var t = e[this.expando];
            return t || (t = {}, xe(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        }, set: function (e, t, n) {
            var i, o = this.cache(e);
            if ("string" == typeof t) o[t] = n; else for (i in t)o[i] = t[i];
            return o
        }, get: function (e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][t]
        }, access: function (e, t, n) {
            var i;
            return void 0 === t || t && "string" == typeof t && void 0 === n ? (i = this.get(e, t), void 0 !== i ? i : this.get(e, se.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t)
        }, remove: function (e, t) {
            var n, i, o, s = e[this.expando];
            if (void 0 !== s) {
                if (void 0 === t) this.register(e); else {
                    se.isArray(t) ? i = t.concat(t.map(se.camelCase)) : (o = se.camelCase(t), t in s ? i = [t, o] : (i = o, i = i in s ? [i] : i.match(Ce) || [])), n = i.length;
                    for (; n--;)delete s[i[n]]
                }
                (void 0 === t || se.isEmptyObject(s)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        }, hasData: function (e) {
            var t = e[this.expando];
            return void 0 !== t && !se.isEmptyObject(t)
        }
    };
    var Fe = new a, _e = new a, Te = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, ze = /[A-Z]/g;
    se.extend({
        hasData: function (e) {
            return _e.hasData(e) || Fe.hasData(e)
        }, data: function (e, t, n) {
            return _e.access(e, t, n)
        }, removeData: function (e, t) {
            _e.remove(e, t)
        }, _data: function (e, t, n) {
            return Fe.access(e, t, n)
        }, _removeData: function (e, t) {
            Fe.remove(e, t)
        }
    }), se.fn.extend({
        data: function Ut(e, t) {
            var n, i, Ut, o = this[0], s = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (Ut = _e.get(o), 1 === o.nodeType && !Fe.get(o, "hasDataAttrs"))) {
                    for (n = s.length; n--;)s[n] && (i = s[n].name, 0 === i.indexOf("data-") && (i = se.camelCase(i.slice(5)), l(o, i, Ut[i])));
                    Fe.set(o, "hasDataAttrs", !0)
                }
                return Ut
            }
            return "object" === ("undefined" == typeof e ? "undefined" : _typeof(e)) ? this.each(function () {
                _e.set(this, e)
            }) : $e(this, function (t) {
                var n, i;
                if (o && void 0 === t) {
                    if (n = _e.get(o, e) || _e.get(o, e.replace(ze, "-$&").toLowerCase()), void 0 !== n)return n;
                    if (i = se.camelCase(e), n = _e.get(o, i), void 0 !== n)return n;
                    if (n = l(o, i, void 0), void 0 !== n)return n
                } else i = se.camelCase(e), this.each(function () {
                    var n = _e.get(this, i);
                    _e.set(this, i, t), e.indexOf("-") > -1 && void 0 !== n && _e.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        }, removeData: function (e) {
            return this.each(function () {
                _e.remove(this, e)
            })
        }
    }), se.extend({
        queue: function Qt(e, t, n) {
            var Qt;
            if (e)return t = (t || "fx") + "queue", Qt = Fe.get(e, t), n && (!Qt || se.isArray(n) ? Qt = Fe.access(e, t, se.makeArray(n)) : Qt.push(n)), Qt || []
        }, dequeue: function (e, t) {
            t = t || "fx";
            var n = se.queue(e, t), i = n.length, o = n.shift(), s = se._queueHooks(e, t), r = function () {
                se.dequeue(e, t)
            };
            "inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), delete s.stop, o.call(e, r, s)), !i && s && s.empty.fire()
        }, _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return Fe.get(e, n) || Fe.access(e, n, {
                    empty: se.Callbacks("once memory").add(function () {
                        Fe.remove(e, [t + "queue", n])
                    })
                })
        }
    }), se.fn.extend({
        queue: function (e, t) {
            var n = 2;
            return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? se.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                var n = se.queue(this, e, t);
                se._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && se.dequeue(this, e)
            })
        }, dequeue: function (e) {
            return this.each(function () {
                se.dequeue(this, e)
            })
        }, clearQueue: function (e) {
            return this.queue(e || "fx", [])
        }, promise: function (e, t) {
            var n, i = 1, o = se.Deferred(), s = this, r = this.length, a = function () {
                --i || o.resolveWith(s, [s])
            };
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; r--;)n = Fe.get(s[r], e + "queueHooks"), n && n.empty && (i++, n.empty.add(a));
            return a(), o.promise(t)
        }
    });
    var Ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Ae = new RegExp("^(?:([+-])=|)(" + Ee + ")([a-z%]*)$", "i"),
        Oe = ["Top", "Right", "Bottom", "Left"], Se = function (e, t) {
            return e = t || e, "none" === se.css(e, "display") || !se.contains(e.ownerDocument, e)
        }, De = /^(?:checkbox|radio)$/i, Pe = /<([\w:-]+)/, Le = /^$|\/(?:java|ecma)script/i, He = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    He.optgroup = He.option, He.tbody = He.tfoot = He.colgroup = He.caption = He.thead, He.th = He.td;
    var Re = /<|&#?\w+;/;
    !function () {
        var e = K.createDocumentFragment(), t = e.appendChild(K.createElement("div")), n = K.createElement("input");
        n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), ie.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", ie.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
    }();
    var qe = /^key/, Me = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, Ne = /^([^.]*)(?:\.(.+)|)/;
    se.event = {
        global: {},
        add: function (e, t, n, i, o) {
            var s, r, a, l, u, d, c, h, f, p, m, g = Fe.get(e);
            if (g)for (n.handler && (s = n, n = s.handler, o = s.selector), n.guid || (n.guid = se.guid++), (l = g.events) || (l = g.events = {}), (r = g.handle) || (r = g.handle = function (t) {
                return "undefined" != typeof se && se.event.triggered !== t.type ? se.event.dispatch.apply(e, arguments) : void 0
            }), t = (t || "").match(Ce) || [""], u = t.length; u--;)a = Ne.exec(t[u]) || [], f = m = a[1], p = (a[2] || "").split(".").sort(), f && (c = se.event.special[f] || {}, f = (o ? c.delegateType : c.bindType) || f, c = se.event.special[f] || {}, d = se.extend({
                type: f,
                origType: m,
                data: i,
                handler: n,
                guid: n.guid,
                selector: o,
                needsContext: o && se.expr.match.needsContext.test(o),
                namespace: p.join(".")
            }, s), (h = l[f]) || (h = l[f] = [], h.delegateCount = 0, c.setup && c.setup.call(e, i, p, r) !== !1 || e.addEventListener && e.addEventListener(f, r)), c.add && (c.add.call(e, d), d.handler.guid || (d.handler.guid = n.guid)), o ? h.splice(h.delegateCount++, 0, d) : h.push(d), se.event.global[f] = !0)
        },
        remove: function (e, t, n, i, o) {
            var s, r, a, l, u, d, c, h, f, p, m, g = Fe.hasData(e) && Fe.get(e);
            if (g && (l = g.events)) {
                for (t = (t || "").match(Ce) || [""], u = t.length; u--;)if (a = Ne.exec(t[u]) || [], f = m = a[1], p = (a[2] || "").split(".").sort(), f) {
                    for (c = se.event.special[f] || {}, f = (i ? c.delegateType : c.bindType) || f, h = l[f] || [], a = a[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), r = s = h.length; s--;)d = h[s], !o && m !== d.origType || n && n.guid !== d.guid || a && !a.test(d.namespace) || i && i !== d.selector && ("**" !== i || !d.selector) || (h.splice(s, 1), d.selector && h.delegateCount--, c.remove && c.remove.call(e, d));
                    r && !h.length && (c.teardown && c.teardown.call(e, p, g.handle) !== !1 || se.removeEvent(e, f, g.handle), delete l[f])
                } else for (f in l)se.event.remove(e, f + t[u], n, i, !0);
                se.isEmptyObject(l) && Fe.remove(e, "handle events")
            }
        },
        dispatch: function (e) {
            e = se.event.fix(e);
            var t, n, i, o, s, r = [], a = X.call(arguments), l = (Fe.get(this, "events") || {})[e.type] || [],
                u = se.event.special[e.type] || {};
            if (a[0] = e, e.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, e) !== !1) {
                for (r = se.event.handlers.call(this, e, l), t = 0; (o = r[t++]) && !e.isPropagationStopped();)for (e.currentTarget = o.elem, n = 0; (s = o.handlers[n++]) && !e.isImmediatePropagationStopped();)e.rnamespace && !e.rnamespace.test(s.namespace) || (e.handleObj = s, e.data = s.data, i = ((se.event.special[s.origType] || {}).handle || s.handler).apply(o.elem, a), void 0 !== i && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, e), e.result
            }
        },
        handlers: function (e, t) {
            var n, i, o, s, r = [], a = t.delegateCount, l = e.target;
            if (a && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))for (; l !== this; l = l.parentNode || this)if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                for (i = [], n = 0; n < a; n++)s = t[n], o = s.selector + " ", void 0 === i[o] && (i[o] = s.needsContext ? se(o, this).index(l) > -1 : se.find(o, this, null, [l]).length), i[o] && i.push(s);
                i.length && r.push({elem: l, handlers: i})
            }
            return a < t.length && r.push({elem: this, handlers: t.slice(a)}), r
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, t) {
                var n, i, o, s = t.button;
                return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || K, i = n.documentElement, o = n.body, e.pageX = t.clientX + (i && i.scrollLeft || o && o.scrollLeft || 0) - (i && i.clientLeft || o && o.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || o && o.scrollTop || 0) - (i && i.clientTop || o && o.clientTop || 0)), e.which || void 0 === s || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
            }
        },
        fix: function (e) {
            if (e[se.expando])return e;
            var t, n, i, o = e.type, s = e, r = this.fixHooks[o];
            for (r || (this.fixHooks[o] = r = Me.test(o) ? this.mouseHooks : qe.test(o) ? this.keyHooks : {}), i = r.props ? this.props.concat(r.props) : this.props, e = new se.Event(s), t = i.length; t--;)n = i[t], e[n] = s[n];
            return e.target || (e.target = K), 3 === e.target.nodeType && (e.target = e.target.parentNode), r.filter ? r.filter(e, s) : e
        },
        special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    if (this !== m() && this.focus)return this.focus(), !1
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    if (this === m() && this.blur)return this.blur(), !1
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    if ("checkbox" === this.type && this.click && se.nodeName(this, "input"))return this.click(), !1
                }, _default: function (e) {
                    return se.nodeName(e.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, se.removeEvent = function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, se.Event = function (e, t) {
        return this instanceof se.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? f : p) : this.type = e, t && se.extend(this, t), this.timeStamp = e && e.timeStamp || se.now(), void(this[se.expando] = !0)) : new se.Event(e, t)
    }, se.Event.prototype = {
        constructor: se.Event,
        isDefaultPrevented: p,
        isPropagationStopped: p,
        isImmediatePropagationStopped: p,
        isSimulated: !1,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = f, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = f, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = f, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, se.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (e, t) {
        se.event.special[e] = {
            delegateType: t, bindType: t, handle: function (e) {
                var n, i = this, o = e.relatedTarget, s = e.handleObj;
                return o && (o === i || se.contains(i, o)) || (e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), se.fn.extend({
        on: function (e, t, n, i) {
            return g(this, e, t, n, i)
        }, one: function (e, t, n, i) {
            return g(this, e, t, n, i, 1)
        }, off: function (e, t, n) {
            var i, o;
            if (e && e.preventDefault && e.handleObj)return i = e.handleObj, se(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if ("object" === ("undefined" == typeof e ? "undefined" : _typeof(e))) {
                for (o in e)this.off(o, t, e[o]);
                return this
            }
            return t !== !1 && "function" != typeof t || (n = t, t = void 0), n === !1 && (n = p), this.each(function () {
                se.event.remove(this, e, n, t)
            })
        }
    });
    var Ie = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, je = /<script|<style|<link/i,
        Be = /checked\s*(?:[^=]|=\s*.checked.)/i, We = /^true\/(.*)/, Ue = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    se.extend({
        htmlPrefilter: function (e) {
            return e.replace(Ie, "<$1></$2>")
        }, clone: function Gt(e, t, n) {
            var i, o, s, r, Gt = e.cloneNode(!0), a = se.contains(e.ownerDocument, e);
            if (!(ie.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || se.isXMLDoc(e)))for (r = d(Gt), s = d(e), i = 0, o = s.length; i < o; i++)C(s[i], r[i]);
            if (t)if (n)for (s = s || d(e), r = r || d(Gt), i = 0, o = s.length; i < o; i++)w(s[i], r[i]); else w(e, Gt);
            return r = d(Gt, "script"), r.length > 0 && c(r, !a && d(e, "script")), Gt
        }, cleanData: function (e) {
            for (var t, n, i, o = se.event.special, s = 0; void 0 !== (n = e[s]); s++)if (xe(n)) {
                if (t = n[Fe.expando]) {
                    if (t.events)for (i in t.events)o[i] ? se.event.remove(n, i) : se.removeEvent(n, i, t.handle);
                    n[Fe.expando] = void 0
                }
                n[_e.expando] && (n[_e.expando] = void 0)
            }
        }
    }), se.fn.extend({
        domManip: k, detach: function (e) {
            return $(this, e, !0)
        }, remove: function (e) {
            return $(this, e)
        }, text: function (e) {
            return $e(this, function (e) {
                return void 0 === e ? se.text(this) : this.empty().each(function () {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        }, append: function () {
            return k(this, arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = v(this, e);
                    t.appendChild(e)
                }
            })
        }, prepend: function () {
            return k(this, arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = v(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        }, before: function () {
            return k(this, arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        }, after: function () {
            return k(this, arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        }, empty: function () {
            for (var e, t = 0; null != (e = this[t]); t++)1 === e.nodeType && (se.cleanData(d(e, !1)), e.textContent = "");
            return this
        }, clone: function (e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function () {
                return se.clone(this, e, t)
            })
        }, html: function (e) {
            return $e(this, function (e) {
                var t = this[0] || {}, n = 0, i = this.length;
                if (void 0 === e && 1 === t.nodeType)return t.innerHTML;
                if ("string" == typeof e && !je.test(e) && !He[(Pe.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = se.htmlPrefilter(e);
                    try {
                        for (; n < i; n++)t = this[n] || {}, 1 === t.nodeType && (se.cleanData(d(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (o) {
                    }
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        }, replaceWith: function () {
            var e = [];
            return k(this, arguments, function (t) {
                var n = this.parentNode;
                se.inArray(this, e) < 0 && (se.cleanData(d(this)), n && n.replaceChild(t, this))
            }, e)
        }
    }), se.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        se.fn[e] = function (e) {
            for (var n, i = [], o = se(e), s = o.length - 1, r = 0; r <= s; r++)n = r === s ? this : this.clone(!0), se(o[r])[t](n), V.apply(i, n.get());
            return this.pushStack(i)
        }
    });
    var Qe, Ge = {HTML: "block", BODY: "block"}, Ye = /^margin/, Ke = new RegExp("^(" + Ee + ")(?!px)[a-z%]+$", "i"),
        Xe = function (t) {
            var n = t.ownerDocument.defaultView;
            return n && n.opener || (n = e), n.getComputedStyle(t)
        }, Ze = function (e, t, n, i) {
            var o, s, r = {};
            for (s in t)r[s] = e.style[s], e.style[s] = t[s];
            o = n.apply(e, i || []);
            for (s in t)e.style[s] = r[s];
            return o
        }, Ve = K.documentElement;
    !function () {
        function t() {
            a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", a.innerHTML = "", Ve.appendChild(r);
            var t = e.getComputedStyle(a);
            n = "1%" !== t.top, s = "2px" === t.marginLeft, i = "4px" === t.width, a.style.marginRight = "50%", o = "4px" === t.marginRight, Ve.removeChild(r)
        }

        var n, i, o, s, r = K.createElement("div"), a = K.createElement("div");
        a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", ie.clearCloneStyle = "content-box" === a.style.backgroundClip, r.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", r.appendChild(a), se.extend(ie, {
            pixelPosition: function () {
                return t(), n
            }, boxSizingReliable: function () {
                return null == i && t(), i
            }, pixelMarginRight: function () {
                return null == i && t(), o
            }, reliableMarginLeft: function () {
                return null == i && t(), s
            }, reliableMarginRight: function () {
                var t, n = a.appendChild(K.createElement("div"));
                return n.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", a.style.width = "1px", Ve.appendChild(r), t = !parseFloat(e.getComputedStyle(n).marginRight), Ve.removeChild(r), a.removeChild(n), t
            }
        }))
    }();
    var Je = /^(none|table(?!-c[ea]).+)/, et = {position: "absolute", visibility: "hidden", display: "block"},
        tt = {letterSpacing: "0", fontWeight: "400"}, nt = ["Webkit", "O", "Moz", "ms"],
        it = K.createElement("div").style;
    se.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = _(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": "cssFloat"},
        style: function Yt(e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, s, r, a = se.camelCase(t), Yt = e.style;
                return t = se.cssProps[a] || (se.cssProps[a] = z(a) || a), r = se.cssHooks[t] || se.cssHooks[a], void 0 === n ? r && "get" in r && void 0 !== (o = r.get(e, !1, i)) ? o : Yt[t] : (s = "undefined" == typeof n ? "undefined" : _typeof(n), "string" === s && (o = Ae.exec(n)) && o[1] && (n = u(e, t, o), s = "number"), null != n && n === n && ("number" === s && (n += o && o[3] || (se.cssNumber[a] ? "" : "px")), ie.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (Yt[t] = "inherit"), r && "set" in r && void 0 === (n = r.set(e, n, i)) || (Yt[t] = n)), void 0)
            }
        },
        css: function (e, t, n, i) {
            var o, s, r, a = se.camelCase(t);
            return t = se.cssProps[a] || (se.cssProps[a] = z(a) || a), r = se.cssHooks[t] || se.cssHooks[a], r && "get" in r && (o = r.get(e, !0, n)), void 0 === o && (o = _(e, t, i)), "normal" === o && t in tt && (o = tt[t]), "" === n || n ? (s = parseFloat(o), n === !0 || isFinite(s) ? s || 0 : o) : o
        }
    }), se.each(["height", "width"], function (e, t) {
        se.cssHooks[t] = {
            get: function (e, n, i) {
                if (n)return Je.test(se.css(e, "display")) && 0 === e.offsetWidth ? Ze(e, et, function () {
                    return O(e, t, i)
                }) : O(e, t, i)
            }, set: function (e, n, i) {
                var o, s = i && Xe(e), r = i && A(e, t, i, "border-box" === se.css(e, "boxSizing", !1, s), s);
                return r && (o = Ae.exec(n)) && "px" !== (o[3] || "px") && (e.style[t] = n, n = se.css(e, t)), E(e, n, r)
            }
        }
    }), se.cssHooks.marginLeft = T(ie.reliableMarginLeft, function (e, t) {
        if (t)return (parseFloat(_(e, "marginLeft")) || e.getBoundingClientRect().left - Ze(e, {marginLeft: 0}, function () {
                return e.getBoundingClientRect().left
            })) + "px"
    }), se.cssHooks.marginRight = T(ie.reliableMarginRight, function (e, t) {
        if (t)return Ze(e, {display: "inline-block"}, _, [e, "marginRight"])
    }), se.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        se.cssHooks[e + t] = {
            expand: function (n) {
                for (var i = 0, o = {}, s = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++)o[e + Oe[i] + t] = s[i] || s[i - 2] || s[0];
                return o
            }
        }, Ye.test(e) || (se.cssHooks[e + t].set = E)
    }), se.fn.extend({
        css: function (e, t) {
            return $e(this, function (e, t, n) {
                var i, o, s = {}, r = 0;
                if (se.isArray(t)) {
                    for (i = Xe(e), o = t.length; r < o; r++)s[t[r]] = se.css(e, t[r], !1, i);
                    return s
                }
                return void 0 !== n ? se.style(e, t, n) : se.css(e, t)
            }, e, t, arguments.length > 1)
        }, show: function () {
            return S(this, !0)
        }, hide: function () {
            return S(this)
        }, toggle: function (e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                Se(this) ? se(this).show() : se(this).hide()
            })
        }
    }), se.Tween = D, D.prototype = {
        constructor: D, init: function (e, t, n, i, o, s) {
            this.elem = e, this.prop = n, this.easing = o || se.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = s || (se.cssNumber[n] ? "" : "px")
        }, cur: function () {
            var e = D.propHooks[this.prop];
            return e && e.get ? e.get(this) : D.propHooks._default.get(this)
        }, run: function (e) {
            var t, n = D.propHooks[this.prop];
            return this.options.duration ? this.pos = t = se.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : D.propHooks._default.set(this), this
        }
    }, D.prototype.init.prototype = D.prototype, D.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = se.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0)
            }, set: function (e) {
                se.fx.step[e.prop] ? se.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[se.cssProps[e.prop]] && !se.cssHooks[e.prop] ? e.elem[e.prop] = e.now : se.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }, D.propHooks.scrollTop = D.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        }
    }, se.easing = {
        linear: function (e) {
            return e
        }, swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }, _default: "swing"
    }, se.fx = D.prototype.init, se.fx.step = {};
    var ot, st, rt = /^(?:toggle|show|hide)$/, at = /queueHooks$/;
    se.Animation = se.extend(M, {
        tweeners: {
            "*": [function (e, t) {
                var n = this.createTween(e, t);
                return u(n.elem, e, Ae.exec(t), n), n
            }]
        }, tweener: function (e, t) {
            se.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(Ce);
            for (var n, i = 0, o = e.length; i < o; i++)n = e[i], M.tweeners[n] = M.tweeners[n] || [], M.tweeners[n].unshift(t)
        }, prefilters: [R], prefilter: function (e, t) {
            t ? M.prefilters.unshift(e) : M.prefilters.push(e)
        }
    }), se.speed = function (e, t, n) {
        var i = e && "object" === ("undefined" == typeof e ? "undefined" : _typeof(e)) ? se.extend({}, e) : {
            complete: n || !n && t || se.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !se.isFunction(t) && t
        };
        return i.duration = se.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in se.fx.speeds ? se.fx.speeds[i.duration] : se.fx.speeds._default, null != i.queue && i.queue !== !0 || (i.queue = "fx"), i.old = i.complete, i.complete = function () {
            se.isFunction(i.old) && i.old.call(this), i.queue && se.dequeue(this, i.queue)
        }, i
    }, se.fn.extend({
        fadeTo: function (e, t, n, i) {
            return this.filter(Se).css("opacity", 0).show().end().animate({opacity: t}, e, n, i)
        }, animate: function (e, t, n, i) {
            var o = se.isEmptyObject(e), s = se.speed(t, n, i), r = function () {
                var t = M(this, se.extend({}, e), s);
                (o || Fe.get(this, "finish")) && t.stop(!0)
            };
            return r.finish = r, o || s.queue === !1 ? this.each(r) : this.queue(s.queue, r)
        }, stop: function (e, t, n) {
            var i = function (e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                var t = !0, o = null != e && e + "queueHooks", s = se.timers, r = Fe.get(this);
                if (o) r[o] && r[o].stop && i(r[o]); else for (o in r)r[o] && r[o].stop && at.test(o) && i(r[o]);
                for (o = s.length; o--;)s[o].elem !== this || null != e && s[o].queue !== e || (s[o].anim.stop(n), t = !1, s.splice(o, 1));
                !t && n || se.dequeue(this, e)
            })
        }, finish: function (e) {
            return e !== !1 && (e = e || "fx"), this.each(function () {
                var t, n = Fe.get(this), i = n[e + "queue"], o = n[e + "queueHooks"], s = se.timers,
                    r = i ? i.length : 0;
                for (n.finish = !0, se.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = s.length; t--;)s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0), s.splice(t, 1));
                for (t = 0; t < r; t++)i[t] && i[t].finish && i[t].finish.call(this);
                delete n.finish
            })
        }
    }), se.each(["toggle", "show", "hide"], function (e, t) {
        var n = se.fn[t];
        se.fn[t] = function (e, i, o) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(L(t, !0), e, i, o)
        }
    }), se.each({
        slideDown: L("show"),
        slideUp: L("hide"),
        slideToggle: L("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (e, t) {
        se.fn[e] = function (e, n, i) {
            return this.animate(t, e, n, i)
        }
    }), se.timers = [], se.fx.tick = function () {
        var e, t = 0, n = se.timers;
        for (ot = se.now(); t < n.length; t++)e = n[t], e() || n[t] !== e || n.splice(t--, 1);
        n.length || se.fx.stop(), ot = void 0
    }, se.fx.timer = function (e) {
        se.timers.push(e), e() ? se.fx.start() : se.timers.pop()
    }, se.fx.interval = 13, se.fx.start = function () {
        st || (st = e.setInterval(se.fx.tick, se.fx.interval))
    }, se.fx.stop = function () {
        e.clearInterval(st), st = null
    }, se.fx.speeds = {slow: 600, fast: 200, _default: 400}, se.fn.delay = function (t, n) {
        return t = se.fx ? se.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function (n, i) {
            var o = e.setTimeout(n, t);
            i.stop = function () {
                e.clearTimeout(o)
            }
        })
    }, function () {
        var e = K.createElement("input"), t = K.createElement("select"), n = t.appendChild(K.createElement("option"));
        e.type = "checkbox", ie.checkOn = "" !== e.value, ie.optSelected = n.selected, t.disabled = !0, ie.optDisabled = !n.disabled, e = K.createElement("input"), e.value = "t", e.type = "radio", ie.radioValue = "t" === e.value
    }();
    var lt, ut = se.expr.attrHandle;
    se.fn.extend({
        attr: function (e, t) {
            return $e(this, se.attr, e, t, arguments.length > 1)
        }, removeAttr: function (e) {
            return this.each(function () {
                se.removeAttr(this, e)
            })
        }
    }), se.extend({
        attr: function (e, t, n) {
            var i, o, s = e.nodeType;
            if (3 !== s && 8 !== s && 2 !== s)return "undefined" == typeof e.getAttribute ? se.prop(e, t, n) : (1 === s && se.isXMLDoc(e) || (t = t.toLowerCase(), o = se.attrHooks[t] || (se.expr.match.bool.test(t) ? lt : void 0)), void 0 !== n ? null === n ? void se.removeAttr(e, t) : o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : o && "get" in o && null !== (i = o.get(e, t)) ? i : (i = se.find.attr(e, t), null == i ? void 0 : i))
        }, attrHooks: {
            type: {
                set: function (e, t) {
                    if (!ie.radioValue && "radio" === t && se.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        }, removeAttr: function (e, t) {
            var n, i, o = 0, s = t && t.match(Ce);
            if (s && 1 === e.nodeType)for (; n = s[o++];)i = se.propFix[n] || n, se.expr.match.bool.test(n) && (e[i] = !1), e.removeAttribute(n)
        }
    }), lt = {
        set: function (e, t, n) {
            return t === !1 ? se.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, se.each(se.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var n = ut[t] || se.find.attr;
        ut[t] = function (e, t, i) {
            var o, s;
            return i || (s = ut[t], ut[t] = o, o = null != n(e, t, i) ? t.toLowerCase() : null, ut[t] = s), o
        }
    });
    var dt = /^(?:input|select|textarea|button)$/i, ct = /^(?:a|area)$/i;
    se.fn.extend({
        prop: function (e, t) {
            return $e(this, se.prop, e, t, arguments.length > 1)
        }, removeProp: function (e) {
            return this.each(function () {
                delete this[se.propFix[e] || e]
            })
        }
    }), se.extend({
        prop: function (e, t, n) {
            var i, o, s = e.nodeType;
            if (3 !== s && 8 !== s && 2 !== s)return 1 === s && se.isXMLDoc(e) || (t = se.propFix[t] || t, o = se.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : e[t] = n : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t]
        }, propHooks: {
            tabIndex: {
                get: function (e) {
                    var t = se.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : dt.test(e.nodeName) || ct.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        }, propFix: {"for": "htmlFor", "class": "className"}
    }), ie.optSelected || (se.propHooks.selected = {
        get: function (e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        }, set: function (e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), se.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        se.propFix[this.toLowerCase()] = this
    });
    var ht = /[\t\r\n\f]/g;
    se.fn.extend({
        addClass: function (e) {
            var t, n, i, o, s, r, a, l = 0;
            if (se.isFunction(e))return this.each(function (t) {
                se(this).addClass(e.call(this, t, N(this)))
            });
            if ("string" == typeof e && e)for (t = e.match(Ce) || []; n = this[l++];)if (o = N(n), i = 1 === n.nodeType && (" " + o + " ").replace(ht, " ")) {
                for (r = 0; s = t[r++];)i.indexOf(" " + s + " ") < 0 && (i += s + " ");
                a = se.trim(i), o !== a && n.setAttribute("class", a)
            }
            return this
        }, removeClass: function (e) {
            var t, n, i, o, s, r, a, l = 0;
            if (se.isFunction(e))return this.each(function (t) {
                se(this).removeClass(e.call(this, t, N(this)))
            });
            if (!arguments.length)return this.attr("class", "");
            if ("string" == typeof e && e)for (t = e.match(Ce) || []; n = this[l++];)if (o = N(n), i = 1 === n.nodeType && (" " + o + " ").replace(ht, " ")) {
                for (r = 0; s = t[r++];)for (; i.indexOf(" " + s + " ") > -1;)i = i.replace(" " + s + " ", " ");
                a = se.trim(i), o !== a && n.setAttribute("class", a)
            }
            return this
        }, toggleClass: function (e, t) {
            var n = "undefined" == typeof e ? "undefined" : _typeof(e);
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : se.isFunction(e) ? this.each(function (n) {
                se(this).toggleClass(e.call(this, n, N(this), t), t)
            }) : this.each(function () {
                var t, i, o, s;
                if ("string" === n)for (i = 0, o = se(this), s = e.match(Ce) || []; t = s[i++];)o.hasClass(t) ? o.removeClass(t) : o.addClass(t); else void 0 !== e && "boolean" !== n || (t = N(this), t && Fe.set(this, "__className__", t), this.setAttribute && this.setAttribute("class", t || e === !1 ? "" : Fe.get(this, "__className__") || ""))
            })
        }, hasClass: function (e) {
            var t, n, i = 0;
            for (t = " " + e + " "; n = this[i++];)if (1 === n.nodeType && (" " + N(n) + " ").replace(ht, " ").indexOf(t) > -1)return !0;
            return !1
        }
    });
    var ft = /\r/g, pt = /[\x20\t\r\n\f]+/g;
    se.fn.extend({
        val: function (e) {
            var t, n, i, o = this[0];
            {
                if (arguments.length)return i = se.isFunction(e), this.each(function (n) {
                    var o;
                    1 === this.nodeType && (o = i ? e.call(this, n, se(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : se.isArray(o) && (o = se.map(o, function (e) {
                            return null == e ? "" : e + ""
                        })), t = se.valHooks[this.type] || se.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o))
                });
                if (o)return t = se.valHooks[o.type] || se.valHooks[o.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : (n = o.value, "string" == typeof n ? n.replace(ft, "") : null == n ? "" : n)
            }
        }
    }), se.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = se.find.attr(e, "value");
                    return null != t ? t : se.trim(se.text(e)).replace(pt, " ")
                }
            }, select: {
                get: function (e) {
                    for (var t, n, i = e.options, o = e.selectedIndex, s = "select-one" === e.type || o < 0, r = s ? null : [], a = s ? o + 1 : i.length, l = o < 0 ? a : s ? o : 0; l < a; l++)if (n = i[l], (n.selected || l === o) && (ie.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !se.nodeName(n.parentNode, "optgroup"))) {
                        if (t = se(n).val(), s)return t;
                        r.push(t)
                    }
                    return r
                }, set: function (e, t) {
                    for (var n, i, o = e.options, s = se.makeArray(t), r = o.length; r--;)i = o[r], (i.selected = se.inArray(se.valHooks.option.get(i), s) > -1) && (n = !0);
                    return n || (e.selectedIndex = -1), s
                }
            }
        }
    }), se.each(["radio", "checkbox"], function () {
        se.valHooks[this] = {
            set: function (e, t) {
                if (se.isArray(t))return e.checked = se.inArray(se(e).val(), t) > -1
            }
        }, ie.checkOn || (se.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var mt = /^(?:focusinfocus|focusoutblur)$/;
    se.extend(se.event, {
        trigger: function (t, n, i, o) {
            var s, r, a, l, u, d, c, h = [i || K], f = ne.call(t, "type") ? t.type : t,
                p = ne.call(t, "namespace") ? t.namespace.split(".") : [];
            if (r = a = i = i || K, 3 !== i.nodeType && 8 !== i.nodeType && !mt.test(f + se.event.triggered) && (f.indexOf(".") > -1 && (p = f.split("."), f = p.shift(), p.sort()), u = f.indexOf(":") < 0 && "on" + f, t = t[se.expando] ? t : new se.Event(f, "object" === ("undefined" == typeof t ? "undefined" : _typeof(t)) && t), t.isTrigger = o ? 2 : 3, t.namespace = p.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : se.makeArray(n, [t]), c = se.event.special[f] || {}, o || !c.trigger || c.trigger.apply(i, n) !== !1)) {
                if (!o && !c.noBubble && !se.isWindow(i)) {
                    for (l = c.delegateType || f, mt.test(l + f) || (r = r.parentNode); r; r = r.parentNode)h.push(r), a = r;
                    a === (i.ownerDocument || K) && h.push(a.defaultView || a.parentWindow || e)
                }
                for (s = 0; (r = h[s++]) && !t.isPropagationStopped();)t.type = s > 1 ? l : c.bindType || f, d = (Fe.get(r, "events") || {})[t.type] && Fe.get(r, "handle"), d && d.apply(r, n), d = u && r[u], d && d.apply && xe(r) && (t.result = d.apply(r, n), t.result === !1 && t.preventDefault());
                return t.type = f, o || t.isDefaultPrevented() || c._default && c._default.apply(h.pop(), n) !== !1 || !xe(i) || u && se.isFunction(i[f]) && !se.isWindow(i) && (a = i[u], a && (i[u] = null), se.event.triggered = f, i[f](), se.event.triggered = void 0, a && (i[u] = a)), t.result
            }
        }, simulate: function (e, t, n) {
            var i = se.extend(new se.Event, n, {type: e, isSimulated: !0});
            se.event.trigger(i, null, t)
        }
    }), se.fn.extend({
        trigger: function (e, t) {
            return this.each(function () {
                se.event.trigger(e, t, this)
            })
        }, triggerHandler: function (e, t) {
            var n = this[0];
            if (n)return se.event.trigger(e, t, n, !0)
        }
    }), se.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        se.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), se.fn.extend({
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), ie.focusin = "onfocusin" in e, ie.focusin || se.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        var n = function (e) {
            se.event.simulate(t, e.target, se.event.fix(e))
        };
        se.event.special[t] = {
            setup: function () {
                var i = this.ownerDocument || this, o = Fe.access(i, t);
                o || i.addEventListener(e, n, !0), Fe.access(i, t, (o || 0) + 1)
            }, teardown: function () {
                var i = this.ownerDocument || this, o = Fe.access(i, t) - 1;
                o ? Fe.access(i, t, o) : (i.removeEventListener(e, n, !0), Fe.remove(i, t))
            }
        }
    });
    var gt = e.location, vt = se.now(), yt = /\?/;
    se.parseJSON = function (e) {
        return JSON.parse(e + "")
    }, se.parseXML = function (t) {
        var n;
        if (!t || "string" != typeof t)return null;
        try {
            n = (new e.DOMParser).parseFromString(t, "text/xml")
        } catch (i) {
            n = void 0
        }
        return n && !n.getElementsByTagName("parsererror").length || se.error("Invalid XML: " + t), n
    };
    var bt = /#.*$/, wt = /([?&])_=[^&]*/, Ct = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        kt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, $t = /^(?:GET|HEAD)$/, xt = /^\/\//, Ft = {},
        _t = {}, Tt = "*/".concat("*"), zt = K.createElement("a");
    zt.href = gt.href, se.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: gt.href,
            type: "GET",
            isLocal: kt.test(gt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Tt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": se.parseJSON, "text xml": se.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (e, t) {
            return t ? B(B(e, se.ajaxSettings), t) : B(se.ajaxSettings, e)
        },
        ajaxPrefilter: I(Ft),
        ajaxTransport: I(_t),
        ajax: function (t, n) {
            function i(t, n, i, a) {
                var u, c, y, b, C, $ = n;
                2 !== w && (w = 2, l && e.clearTimeout(l), o = void 0, r = a || "", k.readyState = t > 0 ? 4 : 0, u = t >= 200 && t < 300 || 304 === t, i && (b = W(h, k, i)), b = U(h, b, k, u), u ? (h.ifModified && (C = k.getResponseHeader("Last-Modified"), C && (se.lastModified[s] = C), C = k.getResponseHeader("etag"), C && (se.etag[s] = C)), 204 === t || "HEAD" === h.type ? $ = "nocontent" : 304 === t ? $ = "notmodified" : ($ = b.state, c = b.data, y = b.error, u = !y)) : (y = $, !t && $ || ($ = "error", t < 0 && (t = 0))), k.status = t, k.statusText = (n || $) + "", u ? m.resolveWith(f, [c, $, k]) : m.rejectWith(f, [k, $, y]), k.statusCode(v), v = void 0, d && p.trigger(u ? "ajaxSuccess" : "ajaxError", [k, h, u ? c : y]), g.fireWith(f, [k, $]), d && (p.trigger("ajaxComplete", [k, h]), --se.active || se.event.trigger("ajaxStop")))
            }

            "object" === ("undefined" == typeof t ? "undefined" : _typeof(t)) && (n = t, t = void 0), n = n || {};
            var o, s, r, a, l, u, d, c, h = se.ajaxSetup({}, n), f = h.context || h,
                p = h.context && (f.nodeType || f.jquery) ? se(f) : se.event, m = se.Deferred(),
                g = se.Callbacks("once memory"), v = h.statusCode || {}, y = {}, b = {}, w = 0, C = "canceled", k = {
                    readyState: 0, getResponseHeader: function (e) {
                        var t;
                        if (2 === w) {
                            if (!a)for (a = {}; t = Ct.exec(r);)a[t[1].toLowerCase()] = t[2];
                            t = a[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    }, getAllResponseHeaders: function () {
                        return 2 === w ? r : null
                    }, setRequestHeader: function (e, t) {
                        var n = e.toLowerCase();
                        return w || (e = b[n] = b[n] || e, y[e] = t), this
                    }, overrideMimeType: function (e) {
                        return w || (h.mimeType = e), this
                    }, statusCode: function (e) {
                        var t;
                        if (e)if (w < 2)for (t in e)v[t] = [v[t], e[t]]; else k.always(e[k.status]);
                        return this
                    }, abort: function (e) {
                        var t = e || C;
                        return o && o.abort(t), i(0, t), this
                    }
                };
            if (m.promise(k).complete = g.add, k.success = k.done, k.error = k.fail, h.url = ((t || h.url || gt.href) + "").replace(bt, "").replace(xt, gt.protocol + "//"), h.type = n.method || n.type || h.method || h.type, h.dataTypes = se.trim(h.dataType || "*").toLowerCase().match(Ce) || [""], null == h.crossDomain) {
                u = K.createElement("a");
                try {
                    u.href = h.url, u.href = u.href, h.crossDomain = zt.protocol + "//" + zt.host != u.protocol + "//" + u.host
                } catch ($) {
                    h.crossDomain = !0
                }
            }
            if (h.data && h.processData && "string" != typeof h.data && (h.data = se.param(h.data, h.traditional)), j(Ft, h, n, k), 2 === w)return k;
            d = se.event && h.global, d && 0 === se.active++ && se.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !$t.test(h.type), s = h.url, h.hasContent || (h.data && (s = h.url += (yt.test(s) ? "&" : "?") + h.data, delete h.data), h.cache === !1 && (h.url = wt.test(s) ? s.replace(wt, "$1_=" + vt++) : s + (yt.test(s) ? "&" : "?") + "_=" + vt++)), h.ifModified && (se.lastModified[s] && k.setRequestHeader("If-Modified-Since", se.lastModified[s]), se.etag[s] && k.setRequestHeader("If-None-Match", se.etag[s])), (h.data && h.hasContent && h.contentType !== !1 || n.contentType) && k.setRequestHeader("Content-Type", h.contentType), k.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + Tt + "; q=0.01" : "") : h.accepts["*"]);
            for (c in h.headers)k.setRequestHeader(c, h.headers[c]);
            if (h.beforeSend && (h.beforeSend.call(f, k, h) === !1 || 2 === w))return k.abort();
            C = "abort";
            for (c in{success: 1, error: 1, complete: 1})k[c](h[c]);
            if (o = j(_t, h, n, k)) {
                if (k.readyState = 1, d && p.trigger("ajaxSend", [k, h]), 2 === w)return k;
                h.async && h.timeout > 0 && (l = e.setTimeout(function () {
                    k.abort("timeout")
                }, h.timeout));
                try {
                    w = 1, o.send(y, i)
                } catch ($) {
                    if (!(w < 2))throw $;
                    i(-1, $)
                }
            } else i(-1, "No Transport");
            return k
        },
        getJSON: function (e, t, n) {
            return se.get(e, t, n, "json")
        },
        getScript: function (e, t) {
            return se.get(e, void 0, t, "script")
        }
    }), se.each(["get", "post"], function (e, t) {
        se[t] = function (e, n, i, o) {
            return se.isFunction(n) && (o = o || i, i = n, n = void 0), se.ajax(se.extend({
                url: e,
                type: t,
                dataType: o,
                data: n,
                success: i
            }, se.isPlainObject(e) && e))
        }
    }), se._evalUrl = function (e) {
        return se.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    }, se.fn.extend({
        wrapAll: function (e) {
            var t;
            return se.isFunction(e) ? this.each(function (t) {
                se(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = se(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                for (var e = this; e.firstElementChild;)e = e.firstElementChild;
                return e
            }).append(this)), this)
        }, wrapInner: function (e) {
            return se.isFunction(e) ? this.each(function (t) {
                se(this).wrapInner(e.call(this, t))
            }) : this.each(function () {
                var t = se(this), n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        }, wrap: function (e) {
            var t = se.isFunction(e);
            return this.each(function (n) {
                se(this).wrapAll(t ? e.call(this, n) : e)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                se.nodeName(this, "body") || se(this).replaceWith(this.childNodes)
            }).end()
        }
    }), se.expr.filters.hidden = function (e) {
        return !se.expr.filters.visible(e)
    }, se.expr.filters.visible = function (e) {
        return e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0
    };
    var Et = /%20/g, At = /\[\]$/, Ot = /\r?\n/g, St = /^(?:submit|button|image|reset|file)$/i,
        Dt = /^(?:input|select|textarea|keygen)/i;
    se.param = function (e, t) {
        var n, i = [], o = function (e, t) {
            t = se.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (void 0 === t && (t = se.ajaxSettings && se.ajaxSettings.traditional), se.isArray(e) || e.jquery && !se.isPlainObject(e)) se.each(e, function () {
            o(this.name, this.value)
        }); else for (n in e)Q(n, e[n], t, o);
        return i.join("&").replace(Et, "+")
    }, se.fn.extend({
        serialize: function () {
            return se.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var e = se.prop(this, "elements");
                return e ? se.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !se(this).is(":disabled") && Dt.test(this.nodeName) && !St.test(e) && (this.checked || !De.test(e))
            }).map(function (e, t) {
                var n = se(this).val();
                return null == n ? null : se.isArray(n) ? se.map(n, function (e) {
                    return {name: t.name, value: e.replace(Ot, "\r\n")}
                }) : {name: t.name, value: n.replace(Ot, "\r\n")}
            }).get()
        }
    }), se.ajaxSettings.xhr = function () {
        try {
            return new e.XMLHttpRequest
        } catch (t) {
        }
    };
    var Pt = {0: 200, 1223: 204}, Lt = se.ajaxSettings.xhr();
    ie.cors = !!Lt && "withCredentials" in Lt, ie.ajax = Lt = !!Lt, se.ajaxTransport(function (t) {
        var n, i;
        if (ie.cors || Lt && !t.crossDomain)return {
            send: function (o, s) {
                var r, a = t.xhr();
                if (a.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)for (r in t.xhrFields)a[r] = t.xhrFields[r];
                t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType), t.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest");
                for (r in o)a.setRequestHeader(r, o[r]);
                n = function (e) {
                    return function () {
                        n && (n = i = a.onload = a.onerror = a.onabort = a.onreadystatechange = null, "abort" === e ? a.abort() : "error" === e ? "number" != typeof a.status ? s(0, "error") : s(a.status, a.statusText) : s(Pt[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {binary: a.response} : {text: a.responseText}, a.getAllResponseHeaders()))
                    }
                }, a.onload = n(), i = a.onerror = n("error"), void 0 !== a.onabort ? a.onabort = i : a.onreadystatechange = function () {
                    4 === a.readyState && e.setTimeout(function () {
                        n && i()
                    })
                }, n = n("abort");
                try {
                    a.send(t.hasContent && t.data || null)
                } catch (l) {
                    if (n)throw l
                }
            }, abort: function () {
                n && n()
            }
        }
    }), se.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /\b(?:java|ecma)script\b/},
        converters: {
            "text script": function (e) {
                return se.globalEval(e), e
            }
        }
    }), se.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), se.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function (i, o) {
                    t = se("<script>").prop({charset: e.scriptCharset, src: e.url}).on("load error", n = function (e) {
                        t.remove(), n = null, e && o("error" === e.type ? 404 : 200, e.type)
                    }), K.head.appendChild(t[0])
                }, abort: function () {
                    n && n()
                }
            }
        }
    });
    var Ht = [], Rt = /(=)\?(?=&|$)|\?\?/;
    se.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var e = Ht.pop() || se.expando + "_" + vt++;
            return this[e] = !0, e
        }
    }), se.ajaxPrefilter("json jsonp", function (t, n, i) {
        var o, s, r,
            a = t.jsonp !== !1 && (Rt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Rt.test(t.data) && "data");
        if (a || "jsonp" === t.dataTypes[0])return o = t.jsonpCallback = se.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, a ? t[a] = t[a].replace(Rt, "$1" + o) : t.jsonp !== !1 && (t.url += (yt.test(t.url) ? "&" : "?") + t.jsonp + "=" + o), t.converters["script json"] = function () {
            return r || se.error(o + " was not called"), r[0]
        }, t.dataTypes[0] = "json", s = e[o], e[o] = function () {
            r = arguments
        }, i.always(function () {
            void 0 === s ? se(e).removeProp(o) : e[o] = s, t[o] && (t.jsonpCallback = n.jsonpCallback, Ht.push(o)), r && se.isFunction(s) && s(r[0]), r = s = void 0
        }), "script"
    }), se.parseHTML = function (e, t, n) {
        if (!e || "string" != typeof e)return null;
        "boolean" == typeof t && (n = t, t = !1), t = t || K;
        var i = pe.exec(e), o = !n && [];
        return i ? [t.createElement(i[1])] : (i = h([e], t, o), o && o.length && se(o).remove(), se.merge([], i.childNodes))
    };
    var qt = se.fn.load;
    se.fn.load = function (e, t, n) {
        if ("string" != typeof e && qt)return qt.apply(this, arguments);
        var i, o, s, r = this, a = e.indexOf(" ");
        return a > -1 && (i = se.trim(e.slice(a)), e = e.slice(0, a)), se.isFunction(t) ? (n = t, t = void 0) : t && "object" === ("undefined" == typeof t ? "undefined" : _typeof(t)) && (o = "POST"), r.length > 0 && se.ajax({
            url: e,
            type: o || "GET",
            dataType: "html",
            data: t
        }).done(function (e) {
            s = arguments, r.html(i ? se("<div>").append(se.parseHTML(e)).find(i) : e)
        }).always(n && function (e, t) {
                r.each(function () {
                    n.apply(this, s || [e.responseText, t, e])
                })
            }), this
    }, se.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        se.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), se.expr.filters.animated = function (e) {
        return se.grep(se.timers, function (t) {
            return e === t.elem
        }).length
    }, se.offset = {
        setOffset: function (e, t, n) {
            var i, o, s, r, a, l, u, d = se.css(e, "position"), c = se(e), h = {};
            "static" === d && (e.style.position = "relative"), a = c.offset(), s = se.css(e, "top"), l = se.css(e, "left"), u = ("absolute" === d || "fixed" === d) && (s + l).indexOf("auto") > -1, u ? (i = c.position(), r = i.top, o = i.left) : (r = parseFloat(s) || 0, o = parseFloat(l) || 0), se.isFunction(t) && (t = t.call(e, n, se.extend({}, a))), null != t.top && (h.top = t.top - a.top + r), null != t.left && (h.left = t.left - a.left + o), "using" in t ? t.using.call(e, h) : c.css(h)
        }
    }, se.fn.extend({
        offset: function (e) {
            if (arguments.length)return void 0 === e ? this : this.each(function (t) {
                se.offset.setOffset(this, e, t)
            });
            var t, n, i = this[0], o = {top: 0, left: 0}, s = i && i.ownerDocument;
            if (s)return t = s.documentElement, se.contains(t, i) ? (o = i.getBoundingClientRect(), n = G(s), {
                top: o.top + n.pageYOffset - t.clientTop,
                left: o.left + n.pageXOffset - t.clientLeft
            }) : o
        }, position: function () {
            if (this[0]) {
                var e, t, n = this[0], i = {top: 0, left: 0};
                return "fixed" === se.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), se.nodeName(e[0], "html") || (i = e.offset()), i.top += se.css(e[0], "borderTopWidth", !0), i.left += se.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - i.top - se.css(n, "marginTop", !0),
                    left: t.left - i.left - se.css(n, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                for (var e = this.offsetParent; e && "static" === se.css(e, "position");)e = e.offsetParent;
                return e || Ve
            })
        }
    }), se.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
        var n = "pageYOffset" === t;
        se.fn[e] = function (i) {
            return $e(this, function (e, i, o) {
                var s = G(e);
                return void 0 === o ? s ? s[t] : e[i] : void(s ? s.scrollTo(n ? s.pageXOffset : o, n ? o : s.pageYOffset) : e[i] = o)
            }, e, i, arguments.length)
        }
    }), se.each(["top", "left"], function (e, t) {
        se.cssHooks[t] = T(ie.pixelPosition, function (e, n) {
            if (n)return n = _(e, t), Ke.test(n) ? se(e).position()[t] + "px" : n
        })
    }), se.each({Height: "height", Width: "width"}, function (e, t) {
        se.each({padding: "inner" + e, content: t, "": "outer" + e}, function (n, i) {
            se.fn[i] = function (i, o) {
                var s = arguments.length && (n || "boolean" != typeof i),
                    r = n || (i === !0 || o === !0 ? "margin" : "border");
                return $e(this, function (t, n, i) {
                    var o;
                    return se.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (o = t.documentElement, Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e])) : void 0 === i ? se.css(t, n, r) : se.style(t, n, i, r)
                }, t, s ? i : void 0, s, null)
            }
        })
    }), se.fn.extend({
        bind: function (e, t, n) {
            return this.on(e, null, t, n)
        }, unbind: function (e, t) {
            return this.off(e, null, t)
        }, delegate: function (e, t, n, i) {
            return this.on(t, e, n, i)
        }, undelegate: function (e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }, size: function () {
            return this.length
        }
    }), se.fn.andSelf = se.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return se
    });
    var Mt = e.jQuery, Nt = e.$;
    return se.noConflict = function (t) {
        return e.$ === se && (e.$ = Nt), t && e.jQuery === se && (e.jQuery = Mt), se
    }, t || (e.jQuery = e.$ = se), se
}), function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("whatInput", [], t) : "object" == typeof exports ? exports.whatInput = t() : e.whatInput = t()
}(this, function () {
    return function (e) {
        function t(i) {
            if (n[i])return n[i].exports;
            var o = n[i] = {exports: {}, id: i, loaded: !1};
            return e[i].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
        }

        var n = {};
        return t.m = e, t.c = n, t.p = "", t(0)
    }([function (e, t) {
        e.exports = function () {
            var e = document.documentElement, t = "initial", n = null, i = ["input", "select", "textarea"],
                o = [16, 17, 18, 91, 93], s = {
                    keyup: "keyboard",
                    mousedown: "mouse",
                    mousemove: "mouse",
                    MSPointerDown: "pointer",
                    MSPointerMove: "pointer",
                    pointerdown: "pointer",
                    pointermove: "pointer",
                    touchstart: "touch"
                }, r = [], a = !1, l = {2: "touch", 3: "touch", 4: "mouse"}, u = null, d = function () {
                    s[v()] = "mouse", c(), f()
                }, c = function () {
                    window.PointerEvent ? (e.addEventListener("pointerdown", h), e.addEventListener("pointermove", p)) : window.MSPointerEvent ? (e.addEventListener("MSPointerDown", h), e.addEventListener("MSPointerMove", p)) : (e.addEventListener("mousedown", h), e.addEventListener("mousemove", p), "ontouchstart" in window && e.addEventListener("touchstart", m)), e.addEventListener(v(), p), e.addEventListener("keydown", h), e.addEventListener("keyup", h)
                }, h = function (e) {
                    if (!a) {
                        var r = e.which, l = s[e.type];
                        if ("pointer" === l && (l = g(e)), t !== l || n !== l) {
                            var u = document.activeElement,
                                d = !(!u || !u.nodeName || i.indexOf(u.nodeName.toLowerCase()) !== -1);
                            ("touch" === l || "mouse" === l && o.indexOf(r) === -1 || "keyboard" === l && d) && (t = n = l, f())
                        }
                    }
                }, f = function () {
                    e.setAttribute("data-whatinput", t), e.setAttribute("data-whatintent", t), r.indexOf(t) === -1 && (r.push(t), e.className += " whatinput-types-" + t)
                }, p = function (t) {
                    if (!a) {
                        var i = s[t.type];
                        "pointer" === i && (i = g(t)), n !== i && (n = i, e.setAttribute("data-whatintent", n))
                    }
                }, m = function (e) {
                    window.clearTimeout(u), h(e), a = !0, u = window.setTimeout(function () {
                        a = !1
                    }, 200)
                }, g = function (e) {
                    return "number" == typeof e.pointerType ? l[e.pointerType] : "pen" === e.pointerType ? "touch" : e.pointerType
                }, v = function () {
                    return "onwheel" in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll"
                };
            return "addEventListener" in window && Array.prototype.indexOf && d(), {
                ask: function (e) {
                    return "loose" === e ? n : t
                }, types: function () {
                    return r
                }
            }
        }()
    }])
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
!function (e) {
    function t(e) {
        if (void 0 === Function.prototype.name) {
            var t = /function\s([^(]{1,})\(/, n = t.exec(e.toString());
            return n && n.length > 1 ? n[1].trim() : ""
        }
        return void 0 === e.prototype ? e.constructor.name : e.prototype.constructor.name
    }

    function n(e) {
        return "true" === e || "false" !== e && (isNaN(1 * e) ? e : parseFloat(e))
    }

    function i(e) {
        return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
    }

    var o = "6.3.0", s = {
        version: o, _plugins: {}, _uuids: [], rtl: function () {
            return "rtl" === e("html").attr("dir")
        }, plugin: function (e, n) {
            var o = n || t(e), s = i(o);
            this._plugins[s] = this[o] = e
        }, registerPlugin: function (e, n) {
            var o = n ? i(n) : t(e.constructor).toLowerCase();
            e.uuid = this.GetYoDigits(6, o), e.$element.attr("data-" + o) || e.$element.attr("data-" + o, e.uuid), e.$element.data("zfPlugin") || e.$element.data("zfPlugin", e), e.$element.trigger("init.zf." + o), this._uuids.push(e.uuid)
        }, unregisterPlugin: function (e) {
            var n = i(t(e.$element.data("zfPlugin").constructor));
            this._uuids.splice(this._uuids.indexOf(e.uuid), 1), e.$element.removeAttr("data-" + n).removeData("zfPlugin").trigger("destroyed.zf." + n);
            for (var o in e)e[o] = null
        }, reInit: function (t) {
            var n = t instanceof e;
            try {
                if (n) t.each(function () {
                    e(this).data("zfPlugin")._init()
                }); else {
                    var o = "undefined" == typeof t ? "undefined" : _typeof(t), s = this, r = {
                        object: function (t) {
                            t.forEach(function (t) {
                                t = i(t), e("[data-" + t + "]").foundation("_init")
                            })
                        }, string: function () {
                            t = i(t), e("[data-" + t + "]").foundation("_init")
                        }, undefined: function () {
                            this.object(Object.keys(s._plugins))
                        }
                    };
                    r[o](t)
                }
            } catch (a) {
                console.error(a)
            } finally {
                return t
            }
        }, GetYoDigits: function (e, t) {
            return e = e || 6, Math.round(Math.pow(36, e + 1) - Math.random() * Math.pow(36, e)).toString(36).slice(1) + (t ? "-" + t : "")
        }, reflow: function (t, i) {
            "undefined" == typeof i ? i = Object.keys(this._plugins) : "string" == typeof i && (i = [i]);
            var o = this;
            e.each(i, function (i, s) {
                var r = o._plugins[s], a = e(t).find("[data-" + s + "]").addBack("[data-" + s + "]");
                a.each(function () {
                    var t = e(this), i = {};
                    if (t.data("zfPlugin"))return void console.warn("Tried to initialize " + s + " on an element that already has a Foundation plugin.");
                    if (t.attr("data-options")) {
                        t.attr("data-options").split(";").forEach(function (e, t) {
                            var o = e.split(":").map(function (e) {
                                return e.trim()
                            });
                            o[0] && (i[o[0]] = n(o[1]))
                        })
                    }
                    try {
                        t.data("zfPlugin", new r(e(this), i))
                    } catch (o) {
                        console.error(o)
                    } finally {
                        return
                    }
                })
            })
        }, getFnName: t, transitionend: function (e) {
            var t, n = {
                transition: "transitionend",
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend"
            }, i = document.createElement("div");
            for (var o in n)"undefined" != typeof i.style[o] && (t = n[o]);
            return t ? t : (t = setTimeout(function () {
                e.triggerHandler("transitionend", [e])
            }, 1), "transitionend")
        }
    };
    s.util = {
        throttle: function (e, t) {
            var n = null;
            return function () {
                var i = this, o = arguments;
                null === n && (n = setTimeout(function () {
                    e.apply(i, o), n = null
                }, t))
            }
        }
    };
    var r = function (n) {
        var i = "undefined" == typeof n ? "undefined" : _typeof(n), o = e("meta.foundation-mq"), r = e(".no-js");
        if (o.length || e('<meta class="foundation-mq">').appendTo(document.head), r.length && r.removeClass("no-js"), "undefined" === i) s.MediaQuery._init(), s.reflow(this); else {
            if ("string" !== i)throw new TypeError("We're sorry, " + i + " is not a valid parameter. You must use a string representing the method you wish to invoke.");
            var a = Array.prototype.slice.call(arguments, 1), l = this.data("zfPlugin");
            if (void 0 === l || void 0 === l[n])throw new ReferenceError("We're sorry, '" + n + "' is not an available method for " + (l ? t(l) : "this element") + ".");
            1 === this.length ? l[n].apply(l, a) : this.each(function (t, i) {
                l[n].apply(e(i).data("zfPlugin"), a)
            })
        }
        return this
    };
    window.Foundation = s, e.fn.foundation = r, function () {
        Date.now && window.Date.now || (window.Date.now = Date.now = function () {
            return (new Date).getTime()
        });
        for (var e = ["webkit", "moz"], t = 0; t < e.length && !window.requestAnimationFrame; ++t) {
            var n = e[t];
            window.requestAnimationFrame = window[n + "RequestAnimationFrame"], window.cancelAnimationFrame = window[n + "CancelAnimationFrame"] || window[n + "CancelRequestAnimationFrame"]
        }
        if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
            var i = 0;
            window.requestAnimationFrame = function (e) {
                var t = Date.now(), n = Math.max(i + 16, t);
                return setTimeout(function () {
                    e(i = n)
                }, n - t)
            }, window.cancelAnimationFrame = clearTimeout
        }
        window.performance && window.performance.now || (window.performance = {
            start: Date.now(), now: function () {
                return Date.now() - this.start
            }
        })
    }(), Function.prototype.bind || (Function.prototype.bind = function (e) {
        if ("function" != typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var t = Array.prototype.slice.call(arguments, 1), n = this, i = function () {
        }, o = function () {
            return n.apply(this instanceof i ? this : e, t.concat(Array.prototype.slice.call(arguments)));
        };
        return this.prototype && (i.prototype = this.prototype), o.prototype = new i, o
    })
}(jQuery), !function (e) {
    function t(e, t, i, o) {
        var s, r, a, l, u = n(e);
        if (t) {
            var d = n(t);
            r = u.offset.top + u.height <= d.height + d.offset.top, s = u.offset.top >= d.offset.top, a = u.offset.left >= d.offset.left, l = u.offset.left + u.width <= d.width + d.offset.left
        } else r = u.offset.top + u.height <= u.windowDims.height + u.windowDims.offset.top, s = u.offset.top >= u.windowDims.offset.top, a = u.offset.left >= u.windowDims.offset.left, l = u.offset.left + u.width <= u.windowDims.width;
        var c = [r, s, a, l];
        return i ? a === l == !0 : o ? s === r == !0 : c.indexOf(!1) === -1
    }

    function n(e, t) {
        if (e = e.length ? e[0] : e, e === window || e === document)throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
        var n = e.getBoundingClientRect(), i = e.parentNode.getBoundingClientRect(),
            o = document.body.getBoundingClientRect(), s = window.pageYOffset, r = window.pageXOffset;
        return {
            width: n.width,
            height: n.height,
            offset: {top: n.top + s, left: n.left + r},
            parentDims: {width: i.width, height: i.height, offset: {top: i.top + s, left: i.left + r}},
            windowDims: {width: o.width, height: o.height, offset: {top: s, left: r}}
        }
    }

    function i(e, t, i, o, s, r) {
        var a = n(e), l = t ? n(t) : null;
        switch (i) {
            case"top":
                return {
                    left: Foundation.rtl() ? l.offset.left - a.width + l.width : l.offset.left,
                    top: l.offset.top - (a.height + o)
                };
            case"left":
                return {left: l.offset.left - (a.width + s), top: l.offset.top};
            case"right":
                return {left: l.offset.left + l.width + s, top: l.offset.top};
            case"center top":
                return {left: l.offset.left + l.width / 2 - a.width / 2, top: l.offset.top - (a.height + o)};
            case"center bottom":
                return {left: r ? s : l.offset.left + l.width / 2 - a.width / 2, top: l.offset.top + l.height + o};
            case"center left":
                return {left: l.offset.left - (a.width + s), top: l.offset.top + l.height / 2 - a.height / 2};
            case"center right":
                return {left: l.offset.left + l.width + s + 1, top: l.offset.top + l.height / 2 - a.height / 2};
            case"center":
                return {
                    left: a.windowDims.offset.left + a.windowDims.width / 2 - a.width / 2,
                    top: a.windowDims.offset.top + a.windowDims.height / 2 - a.height / 2
                };
            case"reveal":
                return {left: (a.windowDims.width - a.width) / 2, top: a.windowDims.offset.top + o};
            case"reveal full":
                return {left: a.windowDims.offset.left, top: a.windowDims.offset.top};
            case"left bottom":
                return {left: l.offset.left, top: l.offset.top + l.height + o};
            case"right bottom":
                return {left: l.offset.left + l.width + s - a.width, top: l.offset.top + l.height + o};
            default:
                return {
                    left: Foundation.rtl() ? l.offset.left - a.width + l.width : l.offset.left + s,
                    top: l.offset.top + l.height + o
                }
        }
    }

    Foundation.Box = {ImNotTouchingYou: t, GetDimensions: n, GetOffsets: i}
}(jQuery), !function (e) {
    function t(e) {
        var t = {};
        for (var n in e)t[e[n]] = e[n];
        return t
    }

    var n = {
        9: "TAB",
        13: "ENTER",
        27: "ESCAPE",
        32: "SPACE",
        37: "ARROW_LEFT",
        38: "ARROW_UP",
        39: "ARROW_RIGHT",
        40: "ARROW_DOWN"
    }, i = {}, o = {
        keys: t(n), parseKey: function (e) {
            var t = n[e.which || e.keyCode] || String.fromCharCode(e.which).toUpperCase();
            return t = t.replace(/\W+/, ""), e.shiftKey && (t = "SHIFT_" + t), e.ctrlKey && (t = "CTRL_" + t), e.altKey && (t = "ALT_" + t), t = t.replace(/_$/, "")
        }, handleKey: function (t, n, o) {
            var s, r, a, l = i[n], u = this.parseKey(t);
            if (!l)return console.warn("Component not defined!");
            if (s = "undefined" == typeof l.ltr ? l : Foundation.rtl() ? e.extend({}, l.ltr, l.rtl) : e.extend({}, l.rtl, l.ltr), r = s[u], a = o[r], a && "function" == typeof a) {
                var d = a.apply();
                (o.handled || "function" == typeof o.handled) && o.handled(d)
            } else(o.unhandled || "function" == typeof o.unhandled) && o.unhandled()
        }, findFocusable: function (t) {
            return !!t && t.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(function () {
                    return !(!e(this).is(":visible") || e(this).attr("tabindex") < 0)
                })
        }, register: function (e, t) {
            i[e] = t
        }, trapFocus: function (e) {
            var t = Foundation.Keyboard.findFocusable(e), n = t.eq(0), i = t.eq(-1);
            e.on("keydown.zf.trapfocus", function (e) {
                e.target === i[0] && "TAB" === Foundation.Keyboard.parseKey(e) ? (e.preventDefault(), n.focus()) : e.target === n[0] && "SHIFT_TAB" === Foundation.Keyboard.parseKey(e) && (e.preventDefault(), i.focus())
            })
        }, releaseFocus: function (e) {
            e.off("keydown.zf.trapfocus")
        }
    };
    Foundation.Keyboard = o
}(jQuery);
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
!function (e) {
    function t(e) {
        var t = {};
        return "string" != typeof e ? t : (e = e.trim().slice(1, -1)) ? t = e.split("&").reduce(function (e, t) {
            var n = t.replace(/\+/g, " ").split("="), i = n[0], o = n[1];
            return i = decodeURIComponent(i), o = void 0 === o ? null : decodeURIComponent(o), e.hasOwnProperty(i) ? Array.isArray(e[i]) ? e[i].push(o) : e[i] = [e[i], o] : e[i] = o, e
        }, {}) : t
    }

    var n = {
        queries: [], current: "", _init: function () {
            var n, i = this, o = e(".foundation-mq").css("font-family");
            n = t(o);
            for (var s in n)n.hasOwnProperty(s) && i.queries.push({
                name: s,
                value: "only screen and (min-width: " + n[s] + ")"
            });
            this.current = this._getCurrentSize(), this._watcher()
        }, atLeast: function (e) {
            var t = this.get(e);
            return !!t && window.matchMedia(t).matches
        }, is: function (e) {
            return e = e.trim().split(" "), e.length > 1 && "only" === e[1] ? e[0] === this._getCurrentSize() : this.atLeast(e[0])
        }, get: function (e) {
            for (var t in this.queries)if (this.queries.hasOwnProperty(t)) {
                var n = this.queries[t];
                if (e === n.name)return n.value
            }
            return null
        }, _getCurrentSize: function () {
            for (var e, t = 0; t < this.queries.length; t++) {
                var n = this.queries[t];
                window.matchMedia(n.value).matches && (e = n)
            }
            return "object" === ("undefined" == typeof e ? "undefined" : _typeof(e)) ? e.name : e
        }, _watcher: function () {
            var t = this;
            e(window).on("resize.zf.mediaquery", function () {
                var n = t._getCurrentSize(), i = t.current;
                n !== i && (t.current = n, e(window).trigger("changed.zf.mediaquery", [n, i]))
            })
        }
    };
    Foundation.MediaQuery = n, window.matchMedia || (window.matchMedia = function () {
        var e = window.styleMedia || window.media;
        if (!e) {
            var t = document.createElement("style"), n = document.getElementsByTagName("script")[0], i = null;
            t.type = "text/css", t.id = "matchmediajs-test", n && n.parentNode && n.parentNode.insertBefore(t, n), i = "getComputedStyle" in window && window.getComputedStyle(t, null) || t.currentStyle, e = {
                matchMedium: function (e) {
                    var n = "@media " + e + "{ #matchmediajs-test { width: 1px; } }";
                    return t.styleSheet ? t.styleSheet.cssText = n : t.textContent = n, "1px" === i.width
                }
            }
        }
        return function (t) {
            return {matches: e.matchMedium(t || "all"), media: t || "all"}
        }
    }()), Foundation.MediaQuery = n
}(jQuery), !function (e) {
    function t(e, t, n) {
        function i(a) {
            r || (r = a), s = a - r, n.apply(t), s < e ? o = window.requestAnimationFrame(i, t) : (window.cancelAnimationFrame(o), t.trigger("finished.zf.animate", [t]).triggerHandler("finished.zf.animate", [t]))
        }

        var o, s, r = null;
        return 0 === e ? (n.apply(t), void t.trigger("finished.zf.animate", [t]).triggerHandler("finished.zf.animate", [t])) : void(o = window.requestAnimationFrame(i))
    }

    function n(t, n, s, r) {
        function a() {
            t || n.hide(), l(), r && r.apply(n)
        }

        function l() {
            n[0].style.transitionDuration = 0, n.removeClass(u + " " + d + " " + s)
        }

        if (n = e(n).eq(0), n.length) {
            var u = t ? i[0] : i[1], d = t ? o[0] : o[1];
            l(), n.addClass(s).css("transition", "none"), requestAnimationFrame(function () {
                n.addClass(u), t && n.show()
            }), requestAnimationFrame(function () {
                n[0].offsetWidth, n.css("transition", "").addClass(d)
            }), n.one(Foundation.transitionend(n), a)
        }
    }

    var i = ["mui-enter", "mui-leave"], o = ["mui-enter-active", "mui-leave-active"], s = {
        animateIn: function (e, t, i) {
            n(!0, e, t, i)
        }, animateOut: function (e, t, i) {
            n(!1, e, t, i)
        }
    };
    Foundation.Move = t, Foundation.Motion = s
}(jQuery), !function (e) {
    var t = {
        Feather: function (t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "zf";
            t.attr("role", "menubar");
            var i = t.find("li").attr({role: "menuitem"}), o = "is-" + n + "-submenu", s = o + "-item",
                r = "is-" + n + "-submenu-parent";
            i.each(function () {
                var t = e(this), i = t.children("ul");
                i.length && (t.addClass(r).attr({
                    "aria-haspopup": !0,
                    "aria-label": t.children("a:first").text()
                }), "drilldown" === n && t.attr({"aria-expanded": !1}), i.addClass("submenu " + o).attr({
                    "data-submenu": "",
                    role: "menu"
                }), "drilldown" === n && i.attr({"aria-hidden": !0})), t.parent("[data-submenu]").length && t.addClass("is-submenu-item " + s)
            })
        }, Burn: function (e, t) {
            var n = "is-" + t + "-submenu", i = n + "-item", o = "is-" + t + "-submenu-parent";
            e.find(">li, .menu, .menu > li").removeClass(n + " " + i + " " + o + " is-submenu-item submenu is-active").removeAttr("data-submenu").css("display", "")
        }
    };
    Foundation.Nest = t
}(jQuery), !function (e) {
    function t(e, t, n) {
        var i, o, s = this, r = t.duration, a = Object.keys(e.data())[0] || "timer", l = -1;
        this.isPaused = !1, this.restart = function () {
            l = -1, clearTimeout(o), this.start()
        }, this.start = function () {
            this.isPaused = !1, clearTimeout(o), l = l <= 0 ? r : l, e.data("paused", !1), i = Date.now(), o = setTimeout(function () {
                t.infinite && s.restart(), n && "function" == typeof n && n()
            }, l), e.trigger("timerstart.zf." + a)
        }, this.pause = function () {
            this.isPaused = !0, clearTimeout(o), e.data("paused", !0);
            var t = Date.now();
            l -= t - i, e.trigger("timerpaused.zf." + a)
        }
    }

    function n(t, n) {
        function i() {
            o--, 0 === o && n()
        }

        var o = t.length;
        0 === o && n(), t.each(function () {
            if (this.complete || 4 === this.readyState || "complete" === this.readyState) i(); else {
                var t = e(this).attr("src");
                e(this).attr("src", t + "?" + (new Date).getTime()), e(this).one("load", function () {
                    i()
                })
            }
        })
    }

    Foundation.Timer = t, Foundation.onImagesLoaded = n
}(jQuery), function (e) {
    function t() {
        this.removeEventListener("touchmove", n), this.removeEventListener("touchend", t), u = !1
    }

    function n(n) {
        if (e.spotSwipe.preventDefault && n.preventDefault(), u) {
            var i, o = n.touches[0].pageX, r = (n.touches[0].pageY, s - o);
            l = (new Date).getTime() - a, Math.abs(r) >= e.spotSwipe.moveThreshold && l <= e.spotSwipe.timeThreshold && (i = r > 0 ? "left" : "right"), i && (n.preventDefault(), t.call(this), e(this).trigger("swipe", i).trigger("swipe" + i))
        }
    }

    function i(e) {
        1 == e.touches.length && (s = e.touches[0].pageX, r = e.touches[0].pageY, u = !0, a = (new Date).getTime(), this.addEventListener("touchmove", n, !1), this.addEventListener("touchend", t, !1))
    }

    function o() {
        this.addEventListener && this.addEventListener("touchstart", i, !1)
    }

    e.spotSwipe = {
        version: "1.0.0",
        enabled: "ontouchstart" in document.documentElement,
        preventDefault: !1,
        moveThreshold: 75,
        timeThreshold: 200
    };
    var s, r, a, l, u = !1;
    e.event.special.swipe = {setup: o}, e.each(["left", "up", "down", "right"], function () {
        e.event.special["swipe" + this] = {
            setup: function () {
                e(this).on("swipe", e.noop)
            }
        }
    })
}(jQuery), !function (e) {
    e.fn.addTouch = function () {
        this.each(function (n, i) {
            e(i).bind("touchstart touchmove touchend touchcancel", function () {
                t(event)
            })
        });
        var t = function (e) {
            var t, n = e.changedTouches, i = n[0],
                o = {touchstart: "mousedown", touchmove: "mousemove", touchend: "mouseup"}, s = o[e.type];
            "MouseEvent" in window && "function" == typeof window.MouseEvent ? t = new window.MouseEvent(s, {
                bubbles: !0,
                cancelable: !0,
                screenX: i.screenX,
                screenY: i.screenY,
                clientX: i.clientX,
                clientY: i.clientY
            }) : (t = document.createEvent("MouseEvent"), t.initMouseEvent(s, !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null)), i.target.dispatchEvent(t)
        }
    }
}(jQuery);
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
!function (e) {
    function t() {
        r(), i(), o(), s(), n()
    }

    function n(t) {
        var n = e("[data-yeti-box]"), i = ["dropdown", "tooltip", "reveal"];
        if (t && ("string" == typeof t ? i.push(t) : "object" === ("undefined" == typeof t ? "undefined" : _typeof(t)) && "string" == typeof t[0] ? i.concat(t) : console.error("Plugin names must be strings")), n.length) {
            var o = i.map(function (e) {
                return "closeme.zf." + e
            }).join(" ");
            e(window).off(o).on(o, function (t, n) {
                var i = t.namespace.split(".")[0], o = e("[data-" + i + "]").not('[data-yeti-box="' + n + '"]');
                o.each(function () {
                    var t = e(this);
                    t.triggerHandler("close.zf.trigger", [t])
                })
            })
        }
    }

    function i(t) {
        var n = void 0, i = e("[data-resize]");
        i.length && e(window).off("resize.zf.trigger").on("resize.zf.trigger", function (o) {
            n && clearTimeout(n), n = setTimeout(function () {
                a || i.each(function () {
                    e(this).triggerHandler("resizeme.zf.trigger")
                }), i.attr("data-events", "resize")
            }, t || 10)
        })
    }

    function o(t) {
        var n = void 0, i = e("[data-scroll]");
        i.length && e(window).off("scroll.zf.trigger").on("scroll.zf.trigger", function (o) {
            n && clearTimeout(n), n = setTimeout(function () {
                a || i.each(function () {
                    e(this).triggerHandler("scrollme.zf.trigger")
                }), i.attr("data-events", "scroll")
            }, t || 10)
        })
    }

    function s(t) {
        var n = e("[data-mutate]");
        n.length && a && n.each(function () {
            e(this).triggerHandler("mutateme.zf.trigger")
        })
    }

    function r() {
        if (!a)return !1;
        var t = document.querySelectorAll("[data-resize], [data-scroll], [data-mutate]"), n = function (t) {
            var n = e(t[0].target);
            switch (t[0].type) {
                case"attributes":
                    "scroll" === n.attr("data-events") && "data-events" === t[0].attributeName && n.triggerHandler("scrollme.zf.trigger", [n, window.pageYOffset]), "resize" === n.attr("data-events") && "data-events" === t[0].attributeName && n.triggerHandler("resizeme.zf.trigger", [n]), "style" === t[0].attributeName && (n.closest("[data-mutate]").attr("data-events", "mutate"), n.closest("[data-mutate]").triggerHandler("mutateme.zf.trigger", [n.closest("[data-mutate]")]));
                    break;
                case"childList":
                    n.closest("[data-mutate]").attr("data-events", "mutate"), n.closest("[data-mutate]").triggerHandler("mutateme.zf.trigger", [n.closest("[data-mutate]")]);
                    break;
                default:
                    return !1
            }
        };
        if (t.length)for (var i = 0; i <= t.length - 1; i++) {
            var o = new a(n);
            o.observe(t[i], {
                attributes: !0,
                childList: !0,
                characterData: !1,
                subtree: !0,
                attributeFilter: ["data-events", "style"]
            })
        }
    }

    var a = function () {
        for (var e = ["WebKit", "Moz", "O", "Ms", ""], t = 0; t < e.length; t++)if (e[t] + "MutationObserver" in window)return window[e[t] + "MutationObserver"];
        return !1
    }(), l = function (t, n) {
        t.data(n).split(" ").forEach(function (i) {
            e("#" + i)["close" === n ? "trigger" : "triggerHandler"](n + ".zf.trigger", [t])
        })
    };
    e(document).on("click.zf.trigger", "[data-open]", function () {
        l(e(this), "open")
    }), e(document).on("click.zf.trigger", "[data-close]", function () {
        var t = e(this).data("close");
        t ? l(e(this), "close") : e(this).trigger("close.zf.trigger")
    }), e(document).on("click.zf.trigger", "[data-toggle]", function () {
        var t = e(this).data("toggle");
        t ? l(e(this), "toggle") : e(this).trigger("toggle.zf.trigger")
    }), e(document).on("close.zf.trigger", "[data-closable]", function (t) {
        t.stopPropagation();
        var n = e(this).data("closable");
        "" !== n ? Foundation.Motion.animateOut(e(this), n, function () {
            e(this).trigger("closed.zf")
        }) : e(this).fadeOut().trigger("closed.zf")
    }), e(document).on("focus.zf.trigger blur.zf.trigger", "[data-toggle-focus]", function () {
        var t = e(this).data("toggle-focus");
        e("#" + t).triggerHandler("toggle.zf.trigger", [e(this)])
    }), e(window).on("load", function () {
        t()
    }), Foundation.IHearYou = t
}(jQuery);
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
!function (e) {
    var t = function () {
        function t(n) {
            var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            _classCallCheck(this, t), this.$element = n, this.options = e.extend({}, t.defaults, this.$element.data(), i), this._init(), Foundation.registerPlugin(this, "Abide")
        }

        return _createClass(t, [{
            key: "_init", value: function () {
                this.$inputs = this.$element.find("input, textarea, select"), this._events()
            }
        }, {
            key: "_events", value: function () {
                var t = this;
                this.$element.off(".abide").on("reset.zf.abide", function () {
                    t.resetForm()
                }).on("submit.zf.abide", function () {
                    return t.validateForm()
                }), "fieldChange" === this.options.validateOn && this.$inputs.off("change.zf.abide").on("change.zf.abide", function (n) {
                    t.validateInput(e(n.target))
                }), this.options.liveValidate && this.$inputs.off("input.zf.abide").on("input.zf.abide", function (n) {
                    t.validateInput(e(n.target))
                }), this.options.validateOnBlur && this.$inputs.off("blur.zf.abide").on("blur.zf.abide", function (n) {
                    t.validateInput(e(n.target))
                })
            }
        }, {
            key: "_reflow", value: function () {
                this._init()
            }
        }, {
            key: "requiredCheck", value: function (e) {
                if (!e.attr("required"))return !0;
                var t = !0;
                switch (e[0].type) {
                    case"checkbox":
                        t = e[0].checked;
                        break;
                    case"select":
                    case"select-one":
                    case"select-multiple":
                        var n = e.find("option:selected");
                        n.length && n.val() || (t = !1);
                        break;
                    default:
                        e.val() && e.val().length || (t = !1)
                }
                return t
            }
        }, {
            key: "findFormError", value: function (e) {
                var t = e.siblings(this.options.formErrorSelector);
                return t.length || (t = e.parent().find(this.options.formErrorSelector)), t
            }
        }, {
            key: "findLabel", value: function (e) {
                var t = e[0].id, n = this.$element.find('label[for="' + t + '"]');
                return n.length ? n : e.closest("label")
            }
        }, {
            key: "findRadioLabels", value: function (t) {
                var n = this, i = t.map(function (t, i) {
                    var o = i.id, s = n.$element.find('label[for="' + o + '"]');
                    return s.length || (s = e(i).closest("label")), s[0]
                });
                return e(i)
            }
        }, {
            key: "addErrorClasses", value: function (e) {
                var t = this.findLabel(e), n = this.findFormError(e);
                t.length && t.addClass(this.options.labelErrorClass), n.length && n.addClass(this.options.formErrorClass), e.addClass(this.options.inputErrorClass).attr("data-invalid", "")
            }
        }, {
            key: "removeRadioErrorClasses", value: function (e) {
                var t = this.$element.find(':radio[name="' + e + '"]'), n = this.findRadioLabels(t),
                    i = this.findFormError(t);
                n.length && n.removeClass(this.options.labelErrorClass), i.length && i.removeClass(this.options.formErrorClass), t.removeClass(this.options.inputErrorClass).removeAttr("data-invalid")
            }
        }, {
            key: "removeErrorClasses", value: function (e) {
                if ("radio" == e[0].type)return this.removeRadioErrorClasses(e.attr("name"));
                var t = this.findLabel(e), n = this.findFormError(e);
                t.length && t.removeClass(this.options.labelErrorClass), n.length && n.removeClass(this.options.formErrorClass), e.removeClass(this.options.inputErrorClass).removeAttr("data-invalid")
            }
        }, {
            key: "validateInput", value: function (t) {
                var n = this.requiredCheck(t), i = !1, o = !0, s = t.attr("data-validator"), r = !0;
                if (t.is("[data-abide-ignore]") || t.is('[type="hidden"]'))return !0;
                switch (t[0].type) {
                    case"radio":
                        i = this.validateRadio(t.attr("name"));
                        break;
                    case"checkbox":
                        i = n;
                        break;
                    case"select":
                    case"select-one":
                    case"select-multiple":
                        i = n;
                        break;
                    default:
                        i = this.validateText(t)
                }
                s && (o = this.matchValidation(t, s, t.attr("required"))), t.attr("data-equalto") && (r = this.options.validators.equalTo(t));
                var a = [n, i, o, r].indexOf(!1) === -1, l = (a ? "valid" : "invalid") + ".zf.abide";
                if (a) {
                    var u = this.$element.find('[data-equalto="' + t.attr("id") + '"]');
                    if (u.length) {
                        var d = this;
                        u.each(function () {
                            e(this).val() && d.validateInput(e(this))
                        })
                    }
                }
                return this[a ? "removeErrorClasses" : "addErrorClasses"](t), t.trigger(l, [t]), a
            }
        }, {
            key: "validateForm", value: function () {
                var t = [], n = this;
                this.$inputs.each(function () {
                    t.push(n.validateInput(e(this)))
                });
                var i = t.indexOf(!1) === -1;
                return this.$element.find("[data-abide-error]").css("display", i ? "none" : "block"), this.$element.trigger((i ? "formvalid" : "forminvalid") + ".zf.abide", [this.$element]), i
            }
        }, {
            key: "validateText", value: function (e, t) {
                t = t || e.attr("pattern") || e.attr("type");
                var n = e.val(), i = !1;
                return n.length ? i = this.options.patterns.hasOwnProperty(t) ? this.options.patterns[t].test(n) : t === e.attr("type") || new RegExp(t).test(n) : e.prop("required") || (i = !0), i
            }
        }, {
            key: "validateRadio", value: function (t) {
                var n = this.$element.find(':radio[name="' + t + '"]'), i = !1, o = !1;
                return n.each(function (t, n) {
                    e(n).attr("required") && (o = !0)
                }), o || (i = !0), i || n.each(function (t, n) {
                    e(n).prop("checked") && (i = !0)
                }), i
            }
        }, {
            key: "matchValidation", value: function (e, t, n) {
                var i = this;
                n = !!n;
                var o = t.split(" ").map(function (t) {
                    return i.options.validators[t](e, n, e.parent())
                });
                return o.indexOf(!1) === -1
            }
        }, {
            key: "resetForm", value: function () {
                var t = this.$element, n = this.options;
                e("." + n.labelErrorClass, t).not("small").removeClass(n.labelErrorClass), e("." + n.inputErrorClass, t).not("small").removeClass(n.inputErrorClass), e(n.formErrorSelector + "." + n.formErrorClass).removeClass(n.formErrorClass), t.find("[data-abide-error]").css("display", "none"), e(":input", t).not(":button, :submit, :reset, :hidden, :radio, :checkbox, [data-abide-ignore]").val("").removeAttr("data-invalid"), e(":input:radio", t).not("[data-abide-ignore]").prop("checked", !1).removeAttr("data-invalid"), e(":input:checkbox", t).not("[data-abide-ignore]").prop("checked", !1).removeAttr("data-invalid"), t.trigger("formreset.zf.abide", [t])
            }
        }, {
            key: "destroy", value: function () {
                var t = this;
                this.$element.off(".abide").find("[data-abide-error]").css("display", "none"), this.$inputs.off(".abide").each(function () {
                    t.removeErrorClasses(e(this))
                }), Foundation.unregisterPlugin(this)
            }
        }]), t
    }();
    t.defaults = {
        validateOn: "fieldChange",
        labelErrorClass: "is-invalid-label",
        inputErrorClass: "is-invalid-input",
        formErrorSelector: ".form-error",
        formErrorClass: "is-visible",
        liveValidate: !1,
        validateOnBlur: !1,
        patterns: {
            alpha: /^[a-zA-Z]+$/,
            alpha_numeric: /^[a-zA-Z0-9]+$/,
            integer: /^[-+]?\d+$/,
            number: /^[-+]?\d*(?:[\.\,]\d+)?$/,
            card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
            cvv: /^([0-9]){3,4}$/,
            email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
            url: /^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
            domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,
            datetime: /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
            date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
            time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
            dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
            month_day_year: /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
            day_month_year: /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,
            color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
        },
        validators: {
            equalTo: function (t, n, i) {
                return e("#" + t.attr("data-equalto")).val() === t.val()
            }
        }
    }, Foundation.plugin(t, "Abide")
}(jQuery);
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
!function (e) {
    var t = function () {
        function t(n, i) {
            _classCallCheck(this, t), this.$element = n, this.options = e.extend({}, t.defaults, this.$element.data(), i), this._init(), Foundation.registerPlugin(this, "Accordion"), Foundation.Keyboard.register("Accordion", {
                ENTER: "toggle",
                SPACE: "toggle",
                ARROW_DOWN: "next",
                ARROW_UP: "previous"
            })
        }

        return _createClass(t, [{
            key: "_init", value: function () {
                this.$element.attr("role", "tablist"), this.$tabs = this.$element.children("[data-accordion-item]"), this.$tabs.each(function (t, n) {
                    var i = e(n), o = i.children("[data-tab-content]"),
                        s = o[0].id || Foundation.GetYoDigits(6, "accordion"), r = n.id || s + "-label";
                    i.find("a:first").attr({
                        "aria-controls": s,
                        role: "tab",
                        id: r,
                        "aria-expanded": !1,
                        "aria-selected": !1
                    }), o.attr({role: "tabpanel", "aria-labelledby": r, "aria-hidden": !0, id: s})
                });
                var t = this.$element.find(".is-active").children("[data-tab-content]");
                t.length && this.down(t, !0), this._events()
            }
        }, {
            key: "_events", value: function () {
                var t = this;
                this.$tabs.each(function () {
                    var n = e(this), i = n.children("[data-tab-content]");
                    i.length && n.children("a").off("click.zf.accordion keydown.zf.accordion").on("click.zf.accordion", function (e) {
                        e.preventDefault(), t.toggle(i)
                    }).on("keydown.zf.accordion", function (e) {
                        Foundation.Keyboard.handleKey(e, "Accordion", {
                            toggle: function () {
                                t.toggle(i)
                            }, next: function () {
                                var e = n.next().find("a").focus();
                                t.options.multiExpand || e.trigger("click.zf.accordion")
                            }, previous: function () {
                                var e = n.prev().find("a").focus();
                                t.options.multiExpand || e.trigger("click.zf.accordion")
                            }, handled: function () {
                                e.preventDefault(), e.stopPropagation()
                            }
                        })
                    })
                })
            }
        }, {
            key: "toggle", value: function (e) {
                e.parent().hasClass("is-active") ? this.up(e) : this.down(e)
            }
        }, {
            key: "down", value: function (t, n) {
                var i = this;
                if (t.attr("aria-hidden", !1).parent("[data-tab-content]").addBack().parent().addClass("is-active"), !this.options.multiExpand && !n) {
                    var o = this.$element.children(".is-active").children("[data-tab-content]");
                    o.length && this.up(o.not(t))
                }
                t.slideDown(this.options.slideSpeed, function () {
                    i.$element.trigger("down.zf.accordion", [t])
                }), e("#" + t.attr("aria-labelledby")).attr({"aria-expanded": !0, "aria-selected": !0})
            }
        }, {
            key: "up", value: function (t) {
                var n = t.parent().siblings(), i = this;
                (this.options.allowAllClosed || n.hasClass("is-active")) && t.parent().hasClass("is-active") && (t.slideUp(i.options.slideSpeed, function () {
                    i.$element.trigger("up.zf.accordion", [t])
                }), t.attr("aria-hidden", !0).parent().removeClass("is-active"), e("#" + t.attr("aria-labelledby")).attr({
                    "aria-expanded": !1,
                    "aria-selected": !1
                }))
            }
        }, {
            key: "destroy", value: function () {
                this.$element.find("[data-tab-content]").stop(!0).slideUp(0).css("display", ""), this.$element.find("a").off(".zf.accordion"), Foundation.unregisterPlugin(this)
            }
        }]), t
    }();
    t.defaults = {slideSpeed: 250, multiExpand: !1, allowAllClosed: !1}, Foundation.plugin(t, "Accordion")
}(jQuery);
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
!function (e) {
    var t = function () {
        function t(n, i) {
            _classCallCheck(this, t), this.$element = n, this.options = e.extend({}, t.defaults, this.$element.data(), i), Foundation.Nest.Feather(this.$element, "accordion"), this._init(), Foundation.registerPlugin(this, "AccordionMenu"), Foundation.Keyboard.register("AccordionMenu", {
                ENTER: "toggle",
                SPACE: "toggle",
                ARROW_RIGHT: "open",
                ARROW_UP: "up",
                ARROW_DOWN: "down",
                ARROW_LEFT: "close",
                ESCAPE: "closeAll"
            })
        }

        return _createClass(t, [{
            key: "_init", value: function () {
                this.$element.find("[data-submenu]").not(".is-active").slideUp(0), this.$element.attr({
                    role: "menu",
                    "aria-multiselectable": this.options.multiOpen
                }), this.$menuLinks = this.$element.find(".is-accordion-submenu-parent"), this.$menuLinks.each(function () {
                    var t = this.id || Foundation.GetYoDigits(6, "acc-menu-link"), n = e(this),
                        i = n.children("[data-submenu]"), o = i[0].id || Foundation.GetYoDigits(6, "acc-menu"),
                        s = i.hasClass("is-active");
                    n.attr({"aria-controls": o, "aria-expanded": s, role: "menuitem", id: t}), i.attr({
                        "aria-labelledby": t,
                        "aria-hidden": !s,
                        role: "menu",
                        id: o
                    })
                });
                var t = this.$element.find(".is-active");
                if (t.length) {
                    var n = this;
                    t.each(function () {
                        n.down(e(this))
                    })
                }
                this._events()
            }
        }, {
            key: "_events", value: function () {
                var t = this;
                this.$element.find("li").each(function () {
                    var n = e(this).children("[data-submenu]");
                    n.length && e(this).children("a").off("click.zf.accordionMenu").on("click.zf.accordionMenu", function (e) {
                        e.preventDefault(), t.toggle(n)
                    })
                }).on("keydown.zf.accordionmenu", function (n) {
                    var i, o, s = e(this), r = s.parent("ul").children("li"), a = s.children("[data-submenu]");
                    r.each(function (t) {
                        if (e(this).is(s))return i = r.eq(Math.max(0, t - 1)).find("a").first(), o = r.eq(Math.min(t + 1, r.length - 1)).find("a").first(), e(this).children("[data-submenu]:visible").length && (o = s.find("li:first-child").find("a").first()), e(this).is(":first-child") ? i = s.parents("li").first().find("a").first() : i.parents("li").first().children("[data-submenu]:visible").length && (i = i.parents("li").find("li:last-child").find("a").first()), void(e(this).is(":last-child") && (o = s.parents("li").first().next("li").find("a").first()))
                    }), Foundation.Keyboard.handleKey(n, "AccordionMenu", {
                        open: function () {
                            a.is(":hidden") && (t.down(a), a.find("li").first().find("a").first().focus())
                        }, close: function () {
                            a.length && !a.is(":hidden") ? t.up(a) : s.parent("[data-submenu]").length && (t.up(s.parent("[data-submenu]")), s.parents("li").first().find("a").first().focus())
                        }, up: function () {
                            return i.focus(), !0
                        }, down: function () {
                            return o.focus(), !0
                        }, toggle: function () {
                            s.children("[data-submenu]").length && t.toggle(s.children("[data-submenu]"))
                        }, closeAll: function () {
                            t.hideAll()
                        }, handled: function (e) {
                            e && n.preventDefault(), n.stopImmediatePropagation()
                        }
                    })
                })
            }
        }, {
            key: "hideAll", value: function () {
                this.up(this.$element.find("[data-submenu]"))
            }
        }, {
            key: "showAll", value: function () {
                this.down(this.$element.find("[data-submenu]"))
            }
        }, {
            key: "toggle", value: function (e) {
                e.is(":animated") || (e.is(":hidden") ? this.down(e) : this.up(e))
            }
        }, {
            key: "down", value: function (e) {
                var t = this;
                this.options.multiOpen || this.up(this.$element.find(".is-active").not(e.parentsUntil(this.$element).add(e))), e.addClass("is-active").attr({"aria-hidden": !1}).parent(".is-accordion-submenu-parent").attr({"aria-expanded": !0}), e.slideDown(t.options.slideSpeed, function () {
                    t.$element.trigger("down.zf.accordionMenu", [e])
                })
            }
        }, {
            key: "up", value: function (e) {
                var t = this;
                e.slideUp(t.options.slideSpeed, function () {
                    t.$element.trigger("up.zf.accordionMenu", [e])
                });
                var n = e.find("[data-submenu]").slideUp(0).addBack().attr("aria-hidden", !0);
                n.parent(".is-accordion-submenu-parent").attr("aria-expanded", !1)
            }
        }, {
            key: "destroy", value: function () {
                this.$element.find("[data-submenu]").slideDown(0).css("display", ""), this.$element.find("a").off("click.zf.accordionMenu"), Foundation.Nest.Burn(this.$element, "accordion"), Foundation.unregisterPlugin(this)
            }
        }]), t
    }();
    t.defaults = {slideSpeed: 250, multiOpen: !0}, Foundation.plugin(t, "AccordionMenu")
}(jQuery);
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
!function (e) {
    var t = function () {
        function t(n, i) {
            _classCallCheck(this, t), this.$element = n, this.options = e.extend({}, t.defaults, this.$element.data(), i), Foundation.Nest.Feather(this.$element, "drilldown"), this._init(), Foundation.registerPlugin(this, "Drilldown"), Foundation.Keyboard.register("Drilldown", {
                ENTER: "open",
                SPACE: "open",
                ARROW_RIGHT: "next",
                ARROW_UP: "up",
                ARROW_DOWN: "down",
                ARROW_LEFT: "previous",
                ESCAPE: "close",
                TAB: "down",
                SHIFT_TAB: "up"
            })
        }

        return _createClass(t, [{
            key: "_init", value: function () {
                this.$submenuAnchors = this.$element.find("li.is-drilldown-submenu-parent").children("a"), this.$submenus = this.$submenuAnchors.parent("li").children("[data-submenu]"), this.$menuItems = this.$element.find("li").not(".js-drilldown-back").attr("role", "menuitem").find("a"), this.$element.attr("data-mutate", this.$element.attr("data-drilldown") || Foundation.GetYoDigits(6, "drilldown")), this._prepareMenu(), this._registerEvents(), this._keyboardEvents()
            }
        }, {
            key: "_prepareMenu", value: function () {
                var t = this;
                this.$submenuAnchors.each(function () {
                    var n = e(this), i = n.parent();
                    t.options.parentLink && n.clone().prependTo(i.children("[data-submenu]")).wrap('<li class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="menu-item"></li>'), n.data("savedHref", n.attr("href")).removeAttr("href").attr("tabindex", 0), n.children("[data-submenu]").attr({
                        "aria-hidden": !0,
                        tabindex: 0,
                        role: "menu"
                    }), t._events(n)
                }), this.$submenus.each(function () {
                    var n = e(this), i = n.find(".js-drilldown-back");
                    if (!i.length)switch (t.options.backButtonPosition) {
                        case"bottom":
                            n.append(t.options.backButton);
                            break;
                        case"top":
                            n.prepend(t.options.backButton);
                            break;
                        default:
                            console.error("Unsupported backButtonPosition value '" + t.options.backButtonPosition + "'")
                    }
                    t._back(n)
                }), this.options.autoHeight || this.$submenus.addClass("drilldown-submenu-cover-previous"), this.$element.parent().hasClass("is-drilldown") || (this.$wrapper = e(this.options.wrapper).addClass("is-drilldown"), this.options.animateHeight && this.$wrapper.addClass("animate-height"), this.$wrapper = this.$element.wrap(this.$wrapper).parent().css(this._getMaxDims()))
            }
        }, {
            key: "_resize", value: function () {
                this.$wrapper.css({"max-width": "none", "min-height": "none"}),
                    this.$wrapper.css(this._getMaxDims())
            }
        }, {
            key: "_events", value: function (t) {
                var n = this;
                t.off("click.zf.drilldown").on("click.zf.drilldown", function (i) {
                    if (e(i.target).parentsUntil("ul", "li").hasClass("is-drilldown-submenu-parent") && (i.stopImmediatePropagation(), i.preventDefault()), n._show(t.parent("li")), n.options.closeOnClick) {
                        var o = e("body");
                        o.off(".zf.drilldown").on("click.zf.drilldown", function (t) {
                            t.target === n.$element[0] || e.contains(n.$element[0], t.target) || (t.preventDefault(), n._hideAll(), o.off(".zf.drilldown"))
                        })
                    }
                }), this.$element.on("mutateme.zf.trigger", this._resize.bind(this))
            }
        }, {
            key: "_registerEvents", value: function () {
                this.options.scrollTop && (this._bindHandler = this._scrollTop.bind(this), this.$element.on("open.zf.drilldown hide.zf.drilldown closed.zf.drilldown", this._bindHandler))
            }
        }, {
            key: "_scrollTop", value: function () {
                var t = this, n = "" != t.options.scrollTopElement ? e(t.options.scrollTopElement) : t.$element,
                    i = parseInt(n.offset().top + t.options.scrollTopOffset);
                e("html, body").stop(!0).animate({scrollTop: i}, t.options.animationDuration, t.options.animationEasing, function () {
                    this === e("html")[0] && t.$element.trigger("scrollme.zf.drilldown")
                })
            }
        }, {
            key: "_keyboardEvents", value: function () {
                var t = this;
                this.$menuItems.add(this.$element.find(".js-drilldown-back > a, .is-submenu-parent-item > a")).on("keydown.zf.drilldown", function (n) {
                    var i, o, s = e(this), r = s.parent("li").parent("ul").children("li").children("a");
                    r.each(function (t) {
                        if (e(this).is(s))return i = r.eq(Math.max(0, t - 1)), void(o = r.eq(Math.min(t + 1, r.length - 1)))
                    }), Foundation.Keyboard.handleKey(n, "Drilldown", {
                        next: function () {
                            if (s.is(t.$submenuAnchors))return t._show(s.parent("li")), s.parent("li").one(Foundation.transitionend(s), function () {
                                s.parent("li").find("ul li a").filter(t.$menuItems).first().focus()
                            }), !0
                        }, previous: function () {
                            return t._hide(s.parent("li").parent("ul")), s.parent("li").parent("ul").one(Foundation.transitionend(s), function () {
                                setTimeout(function () {
                                    s.parent("li").parent("ul").parent("li").children("a").first().focus()
                                }, 1)
                            }), !0
                        }, up: function () {
                            return i.focus(), !0
                        }, down: function () {
                            return o.focus(), !0
                        }, close: function () {
                            t._back()
                        }, open: function () {
                            return s.is(t.$menuItems) ? s.is(t.$submenuAnchors) ? (t._show(s.parent("li")), s.parent("li").one(Foundation.transitionend(s), function () {
                                s.parent("li").find("ul li a").filter(t.$menuItems).first().focus()
                            }), !0) : void 0 : (t._hide(s.parent("li").parent("ul")), s.parent("li").parent("ul").one(Foundation.transitionend(s), function () {
                                setTimeout(function () {
                                    s.parent("li").parent("ul").parent("li").children("a").first().focus()
                                }, 1)
                            }), !0)
                        }, handled: function (e) {
                            e && n.preventDefault(), n.stopImmediatePropagation()
                        }
                    })
                })
            }
        }, {
            key: "_hideAll", value: function () {
                var e = this.$element.find(".is-drilldown-submenu.is-active").addClass("is-closing");
                this.options.autoHeight && this.$wrapper.css({height: e.parent().closest("ul").data("calcHeight")}), e.one(Foundation.transitionend(e), function (t) {
                    e.removeClass("is-active is-closing")
                }), this.$element.trigger("closed.zf.drilldown")
            }
        }, {
            key: "_back", value: function (e) {
                var t = this;
                e.off("click.zf.drilldown"), e.children(".js-drilldown-back").on("click.zf.drilldown", function (n) {
                    n.stopImmediatePropagation(), t._hide(e);
                    var i = e.parent("li").parent("ul").parent("li");
                    i.length && t._show(i)
                })
            }
        }, {
            key: "_menuLinkEvents", value: function () {
                var e = this;
                this.$menuItems.not(".is-drilldown-submenu-parent").off("click.zf.drilldown").on("click.zf.drilldown", function (t) {
                    setTimeout(function () {
                        e._hideAll()
                    }, 0)
                })
            }
        }, {
            key: "_show", value: function (e) {
                this.options.autoHeight && this.$wrapper.css({height: e.children("[data-submenu]").data("calcHeight")}), e.attr("aria-expanded", !0), e.children("[data-submenu]").addClass("is-active").attr("aria-hidden", !1), this.$element.trigger("open.zf.drilldown", [e])
            }
        }, {
            key: "_hide", value: function (e) {
                this.options.autoHeight && this.$wrapper.css({height: e.parent().closest("ul").data("calcHeight")});
                e.parent("li").attr("aria-expanded", !1), e.attr("aria-hidden", !0).addClass("is-closing"), e.addClass("is-closing").one(Foundation.transitionend(e), function () {
                    e.removeClass("is-active is-closing"), e.blur()
                }), e.trigger("hide.zf.drilldown", [e])
            }
        }, {
            key: "_getMaxDims", value: function () {
                var t = 0, n = {}, i = this;
                return this.$submenus.add(this.$element).each(function () {
                    var o = (e(this).children("li").length, Foundation.Box.GetDimensions(this).height);
                    t = o > t ? o : t, i.options.autoHeight && (e(this).data("calcHeight", o), e(this).hasClass("is-drilldown-submenu") || (n.height = o))
                }), this.options.autoHeight || (n["min-height"] = t + "px"), n["max-width"] = this.$element[0].getBoundingClientRect().width + "px", n
            }
        }, {
            key: "destroy", value: function () {
                this.options.scrollTop && this.$element.off(".zf.drilldown", this._bindHandler), this._hideAll(), this.$element.off("mutateme.zf.trigger"), Foundation.Nest.Burn(this.$element, "drilldown"), this.$element.unwrap().find(".js-drilldown-back, .is-submenu-parent-item").remove().end().find(".is-active, .is-closing, .is-drilldown-submenu").removeClass("is-active is-closing is-drilldown-submenu").end().find("[data-submenu]").removeAttr("aria-hidden tabindex role"), this.$submenuAnchors.each(function () {
                    e(this).off(".zf.drilldown")
                }), this.$submenus.removeClass("drilldown-submenu-cover-previous"), this.$element.find("a").each(function () {
                    var t = e(this);
                    t.removeAttr("tabindex"), t.data("savedHref") && t.attr("href", t.data("savedHref")).removeData("savedHref")
                }), Foundation.unregisterPlugin(this)
            }
        }]), t
    }();
    t.defaults = {
        backButton: '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>',
        backButtonPosition: "top",
        wrapper: "<div></div>",
        parentLink: !1,
        closeOnClick: !1,
        autoHeight: !1,
        animateHeight: !1,
        scrollTop: !1,
        scrollTopElement: "",
        scrollTopOffset: 0,
        animationDuration: 500,
        animationEasing: "swing"
    }, Foundation.plugin(t, "Drilldown")
}(jQuery);
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
!function (e) {
    var t = function () {
        function t(n, i) {
            _classCallCheck(this, t), this.$element = n, this.options = e.extend({}, t.defaults, this.$element.data(), i), this._init(), Foundation.registerPlugin(this, "Dropdown"), Foundation.Keyboard.register("Dropdown", {
                ENTER: "open",
                SPACE: "open",
                ESCAPE: "close"
            })
        }

        return _createClass(t, [{
            key: "_init", value: function () {
                var t = this.$element.attr("id");
                this.$anchor = e(e('[data-toggle="' + t + '"]').length ? '[data-toggle="' + t + '"]' : '[data-open="' + t + '"]'), this.$anchor.attr({
                    "aria-controls": t,
                    "data-is-focus": !1,
                    "data-yeti-box": t,
                    "aria-haspopup": !0,
                    "aria-expanded": !1
                }), this.options.parentClass ? this.$parent = this.$element.parents("." + this.options.parentClass) : this.$parent = null, this.options.positionClass = this.getPositionClass(), this.counter = 4, this.usedPositions = [], this.$element.attr({
                    "aria-hidden": "true",
                    "data-yeti-box": t,
                    "data-resize": t,
                    "aria-labelledby": this.$anchor[0].id || Foundation.GetYoDigits(6, "dd-anchor")
                }), this._events()
            }
        }, {
            key: "getPositionClass", value: function () {
                var e = this.$element[0].className.match(/(top|left|right|bottom)/g);
                e = e ? e[0] : "";
                var t = /float-(\S+)/.exec(this.$anchor[0].className);
                t = t ? t[1] : "";
                var n = t ? t + " " + e : e;
                return n
            }
        }, {
            key: "_reposition", value: function (e) {
                this.usedPositions.push(e ? e : "bottom"), !e && this.usedPositions.indexOf("top") < 0 ? this.$element.addClass("top") : "top" === e && this.usedPositions.indexOf("bottom") < 0 ? this.$element.removeClass(e) : "left" === e && this.usedPositions.indexOf("right") < 0 ? this.$element.removeClass(e).addClass("right") : "right" === e && this.usedPositions.indexOf("left") < 0 ? this.$element.removeClass(e).addClass("left") : !e && this.usedPositions.indexOf("top") > -1 && this.usedPositions.indexOf("left") < 0 ? this.$element.addClass("left") : "top" === e && this.usedPositions.indexOf("bottom") > -1 && this.usedPositions.indexOf("left") < 0 ? this.$element.removeClass(e).addClass("left") : "left" === e && this.usedPositions.indexOf("right") > -1 && this.usedPositions.indexOf("bottom") < 0 ? this.$element.removeClass(e) : "right" === e && this.usedPositions.indexOf("left") > -1 && this.usedPositions.indexOf("bottom") < 0 ? this.$element.removeClass(e) : this.$element.removeClass(e), this.classChanged = !0, this.counter--
            }
        }, {
            key: "_setPosition", value: function () {
                if ("false" === this.$anchor.attr("aria-expanded"))return !1;
                var e = this.getPositionClass(), t = Foundation.Box.GetDimensions(this.$element),
                    n = (Foundation.Box.GetDimensions(this.$anchor), "left" === e ? "left" : "right" === e ? "left" : "top"),
                    i = "top" === n ? "height" : "width";
                "height" === i ? this.options.vOffset : this.options.hOffset;
                if (t.width >= t.windowDims.width || !this.counter && !Foundation.Box.ImNotTouchingYou(this.$element, this.$parent)) {
                    var o = t.windowDims.width, s = 0;
                    if (this.$parent) {
                        var r = Foundation.Box.GetDimensions(this.$parent), s = r.offset.left;
                        r.width < o && (o = r.width)
                    }
                    return this.$element.offset(Foundation.Box.GetOffsets(this.$element, this.$anchor, "center bottom", this.options.vOffset, this.options.hOffset + s, !0)).css({
                        width: o - 2 * this.options.hOffset,
                        height: "auto"
                    }), this.classChanged = !0, !1
                }
                for (this.$element.offset(Foundation.Box.GetOffsets(this.$element, this.$anchor, e, this.options.vOffset, this.options.hOffset)); !Foundation.Box.ImNotTouchingYou(this.$element, this.$parent, !0) && this.counter;)this._reposition(e), this._setPosition()
            }
        }, {
            key: "_events", value: function () {
                var t = this;
                this.$element.on({
                    "open.zf.trigger": this.open.bind(this),
                    "close.zf.trigger": this.close.bind(this),
                    "toggle.zf.trigger": this.toggle.bind(this),
                    "resizeme.zf.trigger": this._setPosition.bind(this)
                }), this.options.hover && (this.$anchor.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown", function () {
                    var n = e("body").data();
                    "undefined" != typeof n.whatinput && "mouse" !== n.whatinput || (clearTimeout(t.timeout), t.timeout = setTimeout(function () {
                        t.open(), t.$anchor.data("hover", !0)
                    }, t.options.hoverDelay))
                }).on("mouseleave.zf.dropdown", function () {
                    clearTimeout(t.timeout), t.timeout = setTimeout(function () {
                        t.close(), t.$anchor.data("hover", !1)
                    }, t.options.hoverDelay)
                }), this.options.hoverPane && this.$element.off("mouseenter.zf.dropdown mouseleave.zf.dropdown").on("mouseenter.zf.dropdown", function () {
                    clearTimeout(t.timeout)
                }).on("mouseleave.zf.dropdown", function () {
                    clearTimeout(t.timeout), t.timeout = setTimeout(function () {
                        t.close(), t.$anchor.data("hover", !1)
                    }, t.options.hoverDelay)
                })), this.$anchor.add(this.$element).on("keydown.zf.dropdown", function (n) {
                    var i = e(this);
                    Foundation.Keyboard.findFocusable(t.$element);
                    Foundation.Keyboard.handleKey(n, "Dropdown", {
                        open: function () {
                            i.is(t.$anchor) && (t.open(), t.$element.attr("tabindex", -1).focus(), n.preventDefault())
                        }, close: function () {
                            t.close(), t.$anchor.focus()
                        }
                    })
                })
            }
        }, {
            key: "_addBodyHandler", value: function () {
                var t = e(document.body).not(this.$element), n = this;
                t.off("click.zf.dropdown").on("click.zf.dropdown", function (e) {
                    n.$anchor.is(e.target) || n.$anchor.find(e.target).length || n.$element.find(e.target).length || (n.close(), t.off("click.zf.dropdown"))
                })
            }
        }, {
            key: "open", value: function () {
                if (this.$element.trigger("closeme.zf.dropdown", this.$element.attr("id")), this.$anchor.addClass("hover").attr({"aria-expanded": !0}), this._setPosition(), this.$element.addClass("is-open").attr({"aria-hidden": !1}), this.options.autoFocus) {
                    var e = Foundation.Keyboard.findFocusable(this.$element);
                    e.length && e.eq(0).focus()
                }
                this.options.closeOnClick && this._addBodyHandler(), this.options.trapFocus && Foundation.Keyboard.trapFocus(this.$element), this.$element.trigger("show.zf.dropdown", [this.$element])
            }
        }, {
            key: "close", value: function () {
                if (!this.$element.hasClass("is-open"))return !1;
                if (this.$element.removeClass("is-open").attr({"aria-hidden": !0}), this.$anchor.removeClass("hover").attr("aria-expanded", !1), this.classChanged) {
                    var e = this.getPositionClass();
                    e && this.$element.removeClass(e), this.$element.addClass(this.options.positionClass).css({
                        height: "",
                        width: ""
                    }), this.classChanged = !1, this.counter = 4, this.usedPositions.length = 0
                }
                this.$element.trigger("hide.zf.dropdown", [this.$element]), this.options.trapFocus && Foundation.Keyboard.releaseFocus(this.$element)
            }
        }, {
            key: "toggle", value: function () {
                if (this.$element.hasClass("is-open")) {
                    if (this.$anchor.data("hover"))return;
                    this.close()
                } else this.open()
            }
        }, {
            key: "destroy", value: function () {
                this.$element.off(".zf.trigger").hide(), this.$anchor.off(".zf.dropdown"), Foundation.unregisterPlugin(this)
            }
        }]), t
    }();
    t.defaults = {
        parentClass: null,
        hoverDelay: 250,
        hover: !1,
        hoverPane: !1,
        vOffset: 1,
        hOffset: 1,
        positionClass: "",
        trapFocus: !1,
        autoFocus: !1,
        closeOnClick: !1
    }, Foundation.plugin(t, "Dropdown")
}(jQuery);
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
!function (e) {
    var t = function () {
        function t(n, i) {
            _classCallCheck(this, t), this.$element = n, this.options = e.extend({}, t.defaults, this.$element.data(), i), Foundation.Nest.Feather(this.$element, "dropdown"), this._init(), Foundation.registerPlugin(this, "DropdownMenu"), Foundation.Keyboard.register("DropdownMenu", {
                ENTER: "open",
                SPACE: "open",
                ARROW_RIGHT: "next",
                ARROW_UP: "up",
                ARROW_DOWN: "down",
                ARROW_LEFT: "previous",
                ESCAPE: "close"
            })
        }

        return _createClass(t, [{
            key: "_init", value: function () {
                var e = this.$element.find("li.is-dropdown-submenu-parent");
                this.$element.children(".is-dropdown-submenu-parent").children(".is-dropdown-submenu").addClass("first-sub"), this.$menuItems = this.$element.find('[role="menuitem"]'), this.$tabs = this.$element.children('[role="menuitem"]'), this.$tabs.find("ul.is-dropdown-submenu").addClass(this.options.verticalClass), this.$element.hasClass(this.options.rightClass) || "right" === this.options.alignment || Foundation.rtl() || this.$element.parents(".top-bar-right").is("*") ? (this.options.alignment = "right", e.addClass("opens-left")) : e.addClass("opens-right"), this.changed = !1, this._events()
            }
        }, {
            key: "_isVertical", value: function () {
                return "block" === this.$tabs.css("display")
            }
        }, {
            key: "_events", value: function () {
                var t = this, n = "ontouchstart" in window || "undefined" != typeof window.ontouchstart,
                    i = "is-dropdown-submenu-parent", o = function (o) {
                        var s = e(o.target).parentsUntil("ul", "." + i), r = s.hasClass(i),
                            a = "true" === s.attr("data-is-click"), l = s.children(".is-dropdown-submenu");
                        if (r)if (a) {
                            if (!t.options.closeOnClick || !t.options.clickOpen && !n || t.options.forceFollow && n)return;
                            o.stopImmediatePropagation(), o.preventDefault(), t._hide(s)
                        } else o.preventDefault(), o.stopImmediatePropagation(), t._show(l), s.add(s.parentsUntil(t.$element, "." + i)).attr("data-is-click", !0)
                    };
                (this.options.clickOpen || n) && this.$menuItems.on("click.zf.dropdownmenu touchstart.zf.dropdownmenu", o), t.options.closeOnClickInside && this.$menuItems.on("click.zf.dropdownmenu touchend.zf.dropdownmenu", function (n) {
                    var o = e(this), s = o.hasClass(i);
                    s || t._hide()
                }), this.options.disableHover || this.$menuItems.on("mouseenter.zf.dropdownmenu", function (n) {
                    var o = e(this), s = o.hasClass(i);
                    s && (clearTimeout(o.data("_delay")), o.data("_delay", setTimeout(function () {
                        t._show(o.children(".is-dropdown-submenu"))
                    }, t.options.hoverDelay)))
                }).on("mouseleave.zf.dropdownmenu", function (n) {
                    var o = e(this), s = o.hasClass(i);
                    if (s && t.options.autoclose) {
                        if ("true" === o.attr("data-is-click") && t.options.clickOpen)return !1;
                        clearTimeout(o.data("_delay")), o.data("_delay", setTimeout(function () {
                            t._hide(o)
                        }, t.options.closingTime))
                    }
                }), this.$menuItems.on("keydown.zf.dropdownmenu", function (n) {
                    var i, o, s = e(n.target).parentsUntil("ul", '[role="menuitem"]'), r = t.$tabs.index(s) > -1,
                        a = r ? t.$tabs : s.siblings("li").add(s);
                    a.each(function (t) {
                        if (e(this).is(s))return i = a.eq(t - 1), void(o = a.eq(t + 1))
                    });
                    var l = function () {
                        s.is(":last-child") || (o.children("a:first").focus(), n.preventDefault())
                    }, u = function () {
                        i.children("a:first").focus(), n.preventDefault()
                    }, d = function () {
                        var e = s.children("ul.is-dropdown-submenu");
                        e.length && (t._show(e), s.find("li > a:first").focus(), n.preventDefault())
                    }, c = function () {
                        var e = s.parent("ul").parent("li");
                        e.children("a:first").focus(), t._hide(e), n.preventDefault()
                    }, h = {
                        open: d, close: function () {
                            t._hide(t.$element), t.$menuItems.find("a:first").focus(), n.preventDefault()
                        }, handled: function () {
                            n.stopImmediatePropagation()
                        }
                    };
                    r ? t._isVertical() ? Foundation.rtl() ? e.extend(h, {
                        down: l,
                        up: u,
                        next: c,
                        previous: d
                    }) : e.extend(h, {down: l, up: u, next: d, previous: c}) : Foundation.rtl() ? e.extend(h, {
                        next: u,
                        previous: l,
                        down: d,
                        up: c
                    }) : e.extend(h, {next: l, previous: u, down: d, up: c}) : Foundation.rtl() ? e.extend(h, {
                        next: c,
                        previous: d,
                        down: l,
                        up: u
                    }) : e.extend(h, {
                        next: d,
                        previous: c,
                        down: l,
                        up: u
                    }), Foundation.Keyboard.handleKey(n, "DropdownMenu", h)
                })
            }
        }, {
            key: "_addBodyHandler", value: function () {
                var t = e(document.body), n = this;
                t.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu").on("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu", function (e) {
                    var i = n.$element.find(e.target);
                    i.length || (n._hide(), t.off("mouseup.zf.dropdownmenu touchend.zf.dropdownmenu"))
                })
            }
        }, {
            key: "_show", value: function (t) {
                var n = this.$tabs.index(this.$tabs.filter(function (n, i) {
                    return e(i).find(t).length > 0
                })), i = t.parent("li.is-dropdown-submenu-parent").siblings("li.is-dropdown-submenu-parent");
                this._hide(i, n), t.css("visibility", "hidden").addClass("js-dropdown-active").parent("li.is-dropdown-submenu-parent").addClass("is-active");
                var o = Foundation.Box.ImNotTouchingYou(t, null, !0);
                if (!o) {
                    var s = "left" === this.options.alignment ? "-right" : "-left",
                        r = t.parent(".is-dropdown-submenu-parent");
                    r.removeClass("opens" + s).addClass("opens-" + this.options.alignment), o = Foundation.Box.ImNotTouchingYou(t, null, !0), o || r.removeClass("opens-" + this.options.alignment).addClass("opens-inner"), this.changed = !0
                }
                t.css("visibility", ""), this.options.closeOnClick && this._addBodyHandler(), this.$element.trigger("show.zf.dropdownmenu", [t])
            }
        }, {
            key: "_hide", value: function (e, t) {
                var n;
                n = e && e.length ? e : void 0 !== t ? this.$tabs.not(function (e, n) {
                    return e === t
                }) : this.$element;
                var i = n.hasClass("is-active") || n.find(".is-active").length > 0;
                if (i) {
                    if (n.find("li.is-active").add(n).attr({"data-is-click": !1}).removeClass("is-active"), n.find("ul.js-dropdown-active").removeClass("js-dropdown-active"), this.changed || n.find("opens-inner").length) {
                        var o = "left" === this.options.alignment ? "right" : "left";
                        n.find("li.is-dropdown-submenu-parent").add(n).removeClass("opens-inner opens-" + this.options.alignment).addClass("opens-" + o), this.changed = !1
                    }
                    this.$element.trigger("hide.zf.dropdownmenu", [n])
                }
            }
        }, {
            key: "destroy", value: function () {
                this.$menuItems.off(".zf.dropdownmenu").removeAttr("data-is-click").removeClass("is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner"), e(document.body).off(".zf.dropdownmenu"), Foundation.Nest.Burn(this.$element, "dropdown"), Foundation.unregisterPlugin(this)
            }
        }]), t
    }();
    t.defaults = {
        disableHover: !1,
        autoclose: !0,
        hoverDelay: 50,
        clickOpen: !1,
        closingTime: 500,
        alignment: "left",
        closeOnClick: !0,
        closeOnClickInside: !0,
        verticalClass: "vertical",
        rightClass: "align-right",
        forceFollow: !0
    }, Foundation.plugin(t, "DropdownMenu")
}(jQuery);
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
!function (e) {
    var t = function () {
        function t(n, i) {
            _classCallCheck(this, t), this.$element = n, this.options = e.extend({}, t.defaults, this.$element.data(), i), this._init(), Foundation.registerPlugin(this, "Equalizer")
        }

        return _createClass(t, [{
            key: "_init", value: function () {
                var t = this.$element.attr("data-equalizer") || "",
                    n = this.$element.find('[data-equalizer-watch="' + t + '"]');
                this.$watched = n.length ? n : this.$element.find("[data-equalizer-watch]"), this.$element.attr("data-resize", t || Foundation.GetYoDigits(6, "eq")), this.$element.attr("data-mutate", t || Foundation.GetYoDigits(6, "eq")), this.hasNested = this.$element.find("[data-equalizer]").length > 0, this.isNested = this.$element.parentsUntil(document.body, "[data-equalizer]").length > 0, this.isOn = !1, this._bindHandler = {
                    onResizeMeBound: this._onResizeMe.bind(this),
                    onPostEqualizedBound: this._onPostEqualized.bind(this)
                };
                var i, o = this.$element.find("img");
                this.options.equalizeOn ? (i = this._checkMQ(), e(window).on("changed.zf.mediaquery", this._checkMQ.bind(this))) : this._events(), (void 0 !== i && i === !1 || void 0 === i) && (o.length ? Foundation.onImagesLoaded(o, this._reflow.bind(this)) : this._reflow())
            }
        }, {
            key: "_pauseEvents", value: function () {
                this.isOn = !1, this.$element.off({
                    ".zf.equalizer": this._bindHandler.onPostEqualizedBound,
                    "resizeme.zf.trigger": this._bindHandler.onResizeMeBound,
                    "mutateme.zf.trigger": this._bindHandler.onResizeMeBound
                })
            }
        }, {
            key: "_onResizeMe", value: function (e) {
                this._reflow()
            }
        }, {
            key: "_onPostEqualized", value: function (e) {
                e.target !== this.$element[0] && this._reflow()
            }
        }, {
            key: "_events", value: function () {
                this._pauseEvents(), this.hasNested ? this.$element.on("postequalized.zf.equalizer", this._bindHandler.onPostEqualizedBound) : (this.$element.on("resizeme.zf.trigger", this._bindHandler.onResizeMeBound), this.$element.on("mutateme.zf.trigger", this._bindHandler.onResizeMeBound)), this.isOn = !0
            }
        }, {
            key: "_checkMQ", value: function () {
                var e = !Foundation.MediaQuery.is(this.options.equalizeOn);
                return e ? this.isOn && (this._pauseEvents(), this.$watched.css("height", "auto")) : this.isOn || this._events(), e
            }
        }, {
            key: "_killswitch", value: function () {
            }
        }, {
            key: "_reflow", value: function () {
                return !this.options.equalizeOnStack && this._isStacked() ? (this.$watched.css("height", "auto"), !1) : void(this.options.equalizeByRow ? this.getHeightsByRow(this.applyHeightByRow.bind(this)) : this.getHeights(this.applyHeight.bind(this)))
            }
        }, {
            key: "_isStacked", value: function () {
                return !this.$watched[0] || !this.$watched[1] || this.$watched[0].getBoundingClientRect().top !== this.$watched[1].getBoundingClientRect().top
            }
        }, {
            key: "getHeights", value: function (e) {
                for (var t = [], n = 0, i = this.$watched.length; n < i; n++)this.$watched[n].style.height = "auto", t.push(this.$watched[n].offsetHeight);
                e(t)
            }
        }, {
            key: "getHeightsByRow", value: function (t) {
                var n = this.$watched.length ? this.$watched.first().offset().top : 0, i = [], o = 0;
                i[o] = [];
                for (var s = 0, r = this.$watched.length; s < r; s++) {
                    this.$watched[s].style.height = "auto";
                    var a = e(this.$watched[s]).offset().top;
                    a != n && (o++, i[o] = [], n = a), i[o].push([this.$watched[s], this.$watched[s].offsetHeight])
                }
                for (var l = 0, u = i.length; l < u; l++) {
                    var d = e(i[l]).map(function () {
                        return this[1]
                    }).get(), c = Math.max.apply(null, d);
                    i[l].push(c)
                }
                t(i)
            }
        }, {
            key: "applyHeight", value: function (e) {
                var t = Math.max.apply(null, e);
                this.$element.trigger("preequalized.zf.equalizer"), this.$watched.css("height", t), this.$element.trigger("postequalized.zf.equalizer")
            }
        }, {
            key: "applyHeightByRow", value: function (t) {
                this.$element.trigger("preequalized.zf.equalizer");
                for (var n = 0, i = t.length; n < i; n++) {
                    var o = t[n].length, s = t[n][o - 1];
                    if (o <= 2) e(t[n][0][0]).css({height: "auto"}); else {
                        this.$element.trigger("preequalizedrow.zf.equalizer");
                        for (var r = 0, a = o - 1; r < a; r++)e(t[n][r][0]).css({height: s});
                        this.$element.trigger("postequalizedrow.zf.equalizer")
                    }
                }
                this.$element.trigger("postequalized.zf.equalizer")
            }
        }, {
            key: "destroy", value: function () {
                this._pauseEvents(), this.$watched.css("height", "auto"), Foundation.unregisterPlugin(this)
            }
        }]), t
    }();
    t.defaults = {equalizeOnStack: !1, equalizeByRow: !1, equalizeOn: ""}, Foundation.plugin(t, "Equalizer")
}(jQuery);
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
!function (e) {
    var t = function () {
        function t(n, i) {
            _classCallCheck(this, t), this.$element = n, this.options = e.extend({}, t.defaults, i), this.rules = [], this.currentPath = "", this._init(), this._events(), Foundation.registerPlugin(this, "Interchange")
        }

        return _createClass(t, [{
            key: "_init", value: function () {
                this._addBreakpoints(), this._generateRules(), this._reflow()
            }
        }, {
            key: "_events", value: function () {
                var t = this;
                e(window).on("resize.zf.interchange", Foundation.util.throttle(function () {
                    t._reflow()
                }, 50))
            }
        }, {
            key: "_reflow", value: function () {
                var e;
                for (var t in this.rules)if (this.rules.hasOwnProperty(t)) {
                    var n = this.rules[t];
                    window.matchMedia(n.query).matches && (e = n)
                }
                e && this.replace(e.path)
            }
        }, {
            key: "_addBreakpoints", value: function () {
                for (var e in Foundation.MediaQuery.queries)if (Foundation.MediaQuery.queries.hasOwnProperty(e)) {
                    var n = Foundation.MediaQuery.queries[e];
                    t.SPECIAL_QUERIES[n.name] = n.value
                }
            }
        }, {
            key: "_generateRules", value: function (e) {
                var n, i = [];
                n = this.options.rules ? this.options.rules : this.$element.data("interchange").match(/\[.*?\]/g);
                for (var o in n)if (n.hasOwnProperty(o)) {
                    var s = n[o].slice(1, -1).split(", "), r = s.slice(0, -1).join(""), a = s[s.length - 1];
                    t.SPECIAL_QUERIES[a] && (a = t.SPECIAL_QUERIES[a]), i.push({path: r, query: a})
                }
                this.rules = i
            }
        }, {
            key: "replace", value: function (t) {
                if (this.currentPath !== t) {
                    var n = this, i = "replaced.zf.interchange";
                    "IMG" === this.$element[0].nodeName ? this.$element.attr("src", t).on("load", function () {
                        n.currentPath = t
                    }).trigger(i) : t.match(/\.(gif|jpg|jpeg|png|svg|tiff)([?#].*)?/i) ? this.$element.css({"background-image": "url(" + t + ")"}).trigger(i) : e.get(t, function (o) {
                        n.$element.html(o).trigger(i), e(o).foundation(), n.currentPath = t
                    })
                }
            }
        }, {
            key: "destroy", value: function () {
            }
        }]), t
    }();
    t.defaults = {rules: null}, t.SPECIAL_QUERIES = {
        landscape: "screen and (orientation: landscape)",
        portrait: "screen and (orientation: portrait)",
        retina: "only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)"
    }, Foundation.plugin(t, "Interchange")
}(jQuery);
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
!function (e) {
    var t = function () {
        function t(n, i) {
            _classCallCheck(this, t), this.$element = n, this.options = e.extend({}, t.defaults, this.$element.data(), i), this._init(), this.calcPoints(), Foundation.registerPlugin(this, "Magellan")
        }

        return _createClass(t, [{
            key: "_init", value: function () {
                var t = this.$element[0].id || Foundation.GetYoDigits(6, "magellan");
                this.$targets = e("[data-magellan-target]"), this.$links = this.$element.find("a"), this.$element.attr({
                    "data-resize": t,
                    "data-scroll": t,
                    id: t
                }), this.$active = e(), this.scrollPos = parseInt(window.pageYOffset, 10), this._events()
            }
        }, {
            key: "calcPoints", value: function () {
                var t = this, n = document.body, i = document.documentElement;
                this.points = [], this.winHeight = Math.round(Math.max(window.innerHeight, i.clientHeight)), this.docHeight = Math.round(Math.max(n.scrollHeight, n.offsetHeight, i.clientHeight, i.scrollHeight, i.offsetHeight)), this.$targets.each(function () {
                    var n = e(this), i = Math.round(n.offset().top - t.options.threshold);
                    n.targetPoint = i, t.points.push(i)
                })
            }
        }, {
            key: "_events", value: function () {
                var t = this;
                e("html, body"), {duration: t.options.animationDuration, easing: t.options.animationEasing};
                e(window).one("load", function () {
                    t.options.deepLinking && location.hash && t.scrollToLoc(location.hash), t.calcPoints(), t._updateActive()
                }), this.$element.on({
                    "resizeme.zf.trigger": this.reflow.bind(this),
                    "scrollme.zf.trigger": this._updateActive.bind(this)
                }).on("click.zf.magellan", 'a[href^="#"]', function (e) {
                    e.preventDefault();
                    var n = this.getAttribute("href");
                    t.scrollToLoc(n)
                }), e(window).on("popstate", function (e) {
                    t.options.deepLinking && t.scrollToLoc(window.location.hash)
                })
            }
        }, {
            key: "scrollToLoc", value: function (t) {
                if (!e(t).length)return !1;
                this._inTransition = !0;
                var n = this, i = Math.round(e(t).offset().top - this.options.threshold / 2 - this.options.barOffset);
                e("html, body").stop(!0).animate({scrollTop: i}, this.options.animationDuration, this.options.animationEasing, function () {
                    n._inTransition = !1, n._updateActive()
                })
            }
        }, {
            key: "reflow", value: function () {
                this.calcPoints(), this._updateActive()
            }
        }, {
            key: "_updateActive", value: function () {
                if (!this._inTransition) {
                    var e, t = parseInt(window.pageYOffset, 10);
                    if (t + this.winHeight === this.docHeight) e = this.points.length - 1; else if (t < this.points[0]) e = void 0; else {
                        var n = this.scrollPos < t, i = this, o = this.points.filter(function (e, o) {
                            return n ? e - i.options.barOffset <= t : e - i.options.barOffset - i.options.threshold <= t
                        });
                        e = o.length ? o.length - 1 : 0
                    }
                    if (this.$active.removeClass(this.options.activeClass), this.$active = this.$links.filter('[href="#' + this.$targets.eq(e).data("magellan-target") + '"]').addClass(this.options.activeClass), this.options.deepLinking) {
                        var s = "";
                        void 0 != e && (s = this.$active[0].getAttribute("href")), s !== window.location.hash && (window.history.pushState ? window.history.pushState(null, null, s) : window.location.hash = s)
                    }
                    this.scrollPos = t, this.$element.trigger("update.zf.magellan", [this.$active])
                }
            }
        }, {
            key: "destroy", value: function () {
                if (this.$element.off(".zf.trigger .zf.magellan").find("." + this.options.activeClass).removeClass(this.options.activeClass), this.options.deepLinking) {
                    var e = this.$active[0].getAttribute("href");
                    window.location.hash.replace(e, "")
                }
                Foundation.unregisterPlugin(this)
            }
        }]), t
    }();
    t.defaults = {
        animationDuration: 500,
        animationEasing: "linear",
        threshold: 50,
        activeClass: "active",
        deepLinking: !1,
        barOffset: 0
    }, Foundation.plugin(t, "Magellan")
}(jQuery);
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
!function (e) {
    var t = function () {
        function t(n, i) {
            _classCallCheck(this, t), this.$element = n, this.options = e.extend({}, t.defaults, this.$element.data(), i), this.$lastTrigger = e(), this.$triggers = e(), this._init(), this._events(), Foundation.registerPlugin(this, "OffCanvas"), Foundation.Keyboard.register("OffCanvas", {ESCAPE: "close"})
        }

        return _createClass(t, [{
            key: "_init", value: function () {
                var t = this.$element.attr("id");
                if (this.$element.attr("aria-hidden", "true"), this.$element.addClass("is-transition-" + this.options.transition), this.$triggers = e(document).find('[data-open="' + t + '"], [data-close="' + t + '"], [data-toggle="' + t + '"]').attr("aria-expanded", "false").attr("aria-controls", t), this.options.contentOverlay === !0) {
                    var n = document.createElement("div"),
                        i = "fixed" === e(this.$element).css("position") ? "is-overlay-fixed" : "is-overlay-absolute";
                    n.setAttribute("class", "js-off-canvas-overlay " + i), this.$overlay = e(n), "is-overlay-fixed" === i ? e("body").append(this.$overlay) : this.$element.siblings("[data-off-canvas-content]").append(this.$overlay)
                }
                this.options.isRevealed = this.options.isRevealed || new RegExp(this.options.revealClass, "g").test(this.$element[0].className), this.options.isRevealed === !0 && (this.options.revealOn = this.options.revealOn || this.$element[0].className.match(/(reveal-for-medium|reveal-for-large)/g)[0].split("-")[2], this._setMQChecker()), !this.options.transitionTime == !0 && (this.options.transitionTime = 1e3 * parseFloat(window.getComputedStyle(e("[data-off-canvas]")[0]).transitionDuration))
            }
        }, {
            key: "_events", value: function () {
                if (this.$element.off(".zf.trigger .zf.offcanvas").on({
                        "open.zf.trigger": this.open.bind(this),
                        "close.zf.trigger": this.close.bind(this),
                        "toggle.zf.trigger": this.toggle.bind(this),
                        "keydown.zf.offcanvas": this._handleKeyboard.bind(this)
                    }), this.options.closeOnClick === !0) {
                    var t = this.options.contentOverlay ? this.$overlay : e("[data-off-canvas-content]");
                    t.on({"click.zf.offcanvas": this.close.bind(this)})
                }
            }
        }, {
            key: "_setMQChecker", value: function () {
                var t = this;
                e(window).on("changed.zf.mediaquery", function () {
                    Foundation.MediaQuery.atLeast(t.options.revealOn) ? t.reveal(!0) : t.reveal(!1)
                }).one("load.zf.offcanvas", function () {
                    Foundation.MediaQuery.atLeast(t.options.revealOn) && t.reveal(!0)
                })
            }
        }, {
            key: "reveal", value: function (e) {
                var t = this.$element.find("[data-close]");
                e ? (this.close(), this.isRevealed = !0, this.$element.attr("aria-hidden", "false"), this.$element.off("open.zf.trigger toggle.zf.trigger"), t.length && t.hide()) : (this.isRevealed = !1, this.$element.attr("aria-hidden", "true"), this.$element.on({
                    "open.zf.trigger": this.open.bind(this),
                    "toggle.zf.trigger": this.toggle.bind(this)
                }), t.length && t.show())
            }
        }, {
            key: "_stopScrolling", value: function (e) {
                return !1
            }
        }, {
            key: "open", value: function (t, n) {
                if (!this.$element.hasClass("is-open") && !this.isRevealed) {
                    var i = this;
                    n && (this.$lastTrigger = n), "top" === this.options.forceTo ? window.scrollTo(0, 0) : "bottom" === this.options.forceTo && window.scrollTo(0, document.body.scrollHeight), i.$element.addClass("is-open"), this.$triggers.attr("aria-expanded", "true"),
                        this.$element.attr("aria-hidden", "false").trigger("opened.zf.offcanvas"), this.options.contentScroll === !1 && e("body").addClass("is-off-canvas-open").on("touchmove", this._stopScrolling), this.options.contentOverlay === !0 && this.$overlay.addClass("is-visible"), this.options.closeOnClick === !0 && this.options.contentOverlay === !0 && this.$overlay.addClass("is-closable"), this.options.autoFocus === !0 && this.$element.one(Foundation.transitionend(this.$element), function () {
                        i.$element.find("a, button").eq(0).focus()
                    }), this.options.trapFocus === !0 && (this.$element.siblings("[data-off-canvas-content]").attr("tabindex", "-1"), Foundation.Keyboard.trapFocus(this.$element))
                }
            }
        }, {
            key: "close", value: function (t) {
                if (this.$element.hasClass("is-open") && !this.isRevealed) {
                    var n = this;
                    n.$element.removeClass("is-open"), this.$element.attr("aria-hidden", "true").trigger("closed.zf.offcanvas"), this.options.contentScroll === !1 && e("body").removeClass("is-off-canvas-open").off("touchmove", this._stopScrolling), this.options.contentOverlay === !0 && this.$overlay.removeClass("is-visible"), this.options.closeOnClick === !0 && this.options.contentOverlay === !0 && this.$overlay.removeClass("is-closable"), this.$triggers.attr("aria-expanded", "false"), this.options.trapFocus === !0 && (this.$element.siblings("[data-off-canvas-content]").removeAttr("tabindex"), Foundation.Keyboard.releaseFocus(this.$element))
                }
            }
        }, {
            key: "toggle", value: function (e, t) {
                this.$element.hasClass("is-open") ? this.close(e, t) : this.open(e, t)
            }
        }, {
            key: "_handleKeyboard", value: function (e) {
                var t = this;
                Foundation.Keyboard.handleKey(e, "OffCanvas", {
                    close: function () {
                        return t.close(), t.$lastTrigger.focus(), !0
                    }, handled: function () {
                        e.stopPropagation(), e.preventDefault()
                    }
                })
            }
        }, {
            key: "destroy", value: function () {
                this.close(), this.$element.off(".zf.trigger .zf.offcanvas"), this.$overlay.off(".zf.offcanvas"), Foundation.unregisterPlugin(this)
            }
        }]), t
    }();
    t.defaults = {
        closeOnClick: !0,
        contentOverlay: !0,
        contentScroll: !0,
        transitionTime: 0,
        transition: "push",
        forceTo: null,
        isRevealed: !1,
        revealOn: null,
        autoFocus: !0,
        revealClass: "reveal-for-",
        trapFocus: !1
    }, Foundation.plugin(t, "OffCanvas")
}(jQuery);
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
!function (e) {
    var t = function () {
        function t(n, i) {
            _classCallCheck(this, t), this.$element = n, this.options = e.extend({}, t.defaults, this.$element.data(), i), this._init(), Foundation.registerPlugin(this, "Orbit"), Foundation.Keyboard.register("Orbit", {
                ltr: {
                    ARROW_RIGHT: "next",
                    ARROW_LEFT: "previous"
                }, rtl: {ARROW_LEFT: "next", ARROW_RIGHT: "previous"}
            })
        }

        return _createClass(t, [{
            key: "_init", value: function () {
                this._reset(), this.$wrapper = this.$element.find("." + this.options.containerClass), this.$slides = this.$element.find("." + this.options.slideClass);
                var e = this.$element.find("img"), t = this.$slides.filter(".is-active"),
                    n = this.$element[0].id || Foundation.GetYoDigits(6, "orbit");
                this.$element.attr({
                    "data-resize": n,
                    id: n
                }), t.length || this.$slides.eq(0).addClass("is-active"), this.options.useMUI || this.$slides.addClass("no-motionui"), e.length ? Foundation.onImagesLoaded(e, this._prepareForOrbit.bind(this)) : this._prepareForOrbit(), this.options.bullets && this._loadBullets(), this._events(), this.options.autoPlay && this.$slides.length > 1 && this.geoSync(), this.options.accessible && this.$wrapper.attr("tabindex", 0)
            }
        }, {
            key: "_loadBullets", value: function () {
                this.$bullets = this.$element.find("." + this.options.boxOfBullets).find("button")
            }
        }, {
            key: "geoSync", value: function () {
                var e = this;
                this.timer = new Foundation.Timer(this.$element, {
                    duration: this.options.timerDelay,
                    infinite: !1
                }, function () {
                    e.changeSlide(!0)
                }), this.timer.start()
            }
        }, {
            key: "_prepareForOrbit", value: function () {
                this._setWrapperHeight()
            }
        }, {
            key: "_setWrapperHeight", value: function (t) {
                var n, i = 0, o = 0, s = this;
                this.$slides.each(function () {
                    n = this.getBoundingClientRect().height, e(this).attr("data-slide", o), s.$slides.filter(".is-active")[0] !== s.$slides.eq(o)[0] && e(this).css({
                        position: "relative",
                        display: "none"
                    }), i = n > i ? n : i, o++
                }), o === this.$slides.length && (this.$wrapper.css({height: i}), t && t(i))
            }
        }, {
            key: "_setSlideHeight", value: function (t) {
                this.$slides.each(function () {
                    e(this).css("max-height", t)
                })
            }
        }, {
            key: "_events", value: function () {
                var t = this;
                if (this.$element.off(".resizeme.zf.trigger").on({"resizeme.zf.trigger": this._prepareForOrbit.bind(this)}), this.$slides.length > 1) {
                    if (this.options.swipe && this.$slides.off("swipeleft.zf.orbit swiperight.zf.orbit").on("swipeleft.zf.orbit", function (e) {
                            e.preventDefault(), t.changeSlide(!0)
                        }).on("swiperight.zf.orbit", function (e) {
                            e.preventDefault(), t.changeSlide(!1)
                        }), this.options.autoPlay && (this.$slides.on("click.zf.orbit", function () {
                            t.$element.data("clickedOn", !t.$element.data("clickedOn")), t.timer[t.$element.data("clickedOn") ? "pause" : "start"]()
                        }), this.options.pauseOnHover && this.$element.on("mouseenter.zf.orbit", function () {
                            t.timer.pause()
                        }).on("mouseleave.zf.orbit", function () {
                            t.$element.data("clickedOn") || t.timer.start()
                        })), this.options.navButtons) {
                        var n = this.$element.find("." + this.options.nextClass + ", ." + this.options.prevClass);
                        n.attr("tabindex", 0).on("click.zf.orbit touchend.zf.orbit", function (n) {
                            n.preventDefault(), t.changeSlide(e(this).hasClass(t.options.nextClass))
                        })
                    }
                    this.options.bullets && this.$bullets.on("click.zf.orbit touchend.zf.orbit", function () {
                        if (/is-active/g.test(this.className))return !1;
                        var n = e(this).data("slide"), i = n > t.$slides.filter(".is-active").data("slide"),
                            o = t.$slides.eq(n);
                        t.changeSlide(i, o, n)
                    }), this.options.accessible && this.$wrapper.add(this.$bullets).on("keydown.zf.orbit", function (n) {
                        Foundation.Keyboard.handleKey(n, "Orbit", {
                            next: function () {
                                t.changeSlide(!0)
                            }, previous: function () {
                                t.changeSlide(!1)
                            }, handled: function () {
                                e(n.target).is(t.$bullets) && t.$bullets.filter(".is-active").focus()
                            }
                        })
                    })
                }
            }
        }, {
            key: "_reset", value: function () {
                "undefined" != typeof this.$slides && this.$slides.length > 1 && (this.$element.off(".zf.orbit").find("*").off(".zf.orbit"), this.options.autoPlay && this.timer.restart(), this.$slides.each(function (t) {
                    e(t).removeClass("is-active is-active is-in").removeAttr("aria-live").hide()
                }), this.$slides.first().addClass("is-active").show(), this.$element.trigger("slidechange.zf.orbit", [this.$slides.first()]), this.options.bullets && this._updateBullets(0))
            }
        }, {
            key: "changeSlide", value: function (e, t, n) {
                if (this.$slides) {
                    var i = this.$slides.filter(".is-active").eq(0);
                    if (/mui/g.test(i[0].className))return !1;
                    var o, s = this.$slides.first(), r = this.$slides.last(), a = e ? "Right" : "Left",
                        l = e ? "Left" : "Right", u = this;
                    o = t ? t : e ? this.options.infiniteWrap ? i.next("." + this.options.slideClass).length ? i.next("." + this.options.slideClass) : s : i.next("." + this.options.slideClass) : this.options.infiniteWrap ? i.prev("." + this.options.slideClass).length ? i.prev("." + this.options.slideClass) : r : i.prev("." + this.options.slideClass), o.length && (this.$element.trigger("beforeslidechange.zf.orbit", [i, o]), this.options.bullets && (n = n || this.$slides.index(o), this._updateBullets(n)), this.options.useMUI && !this.$element.is(":hidden") ? (Foundation.Motion.animateIn(o.addClass("is-active").css({
                        position: "absolute",
                        top: 0
                    }), this.options["animInFrom" + a], function () {
                        o.css({position: "relative", display: "block"}).attr("aria-live", "polite")
                    }), Foundation.Motion.animateOut(i.removeClass("is-active"), this.options["animOutTo" + l], function () {
                        i.removeAttr("aria-live"), u.options.autoPlay && !u.timer.isPaused && u.timer.restart()
                    })) : (i.removeClass("is-active is-in").removeAttr("aria-live").hide(), o.addClass("is-active is-in").attr("aria-live", "polite").show(), this.options.autoPlay && !this.timer.isPaused && this.timer.restart()), this.$element.trigger("slidechange.zf.orbit", [o]))
                }
            }
        }, {
            key: "_updateBullets", value: function (e) {
                var t = this.$element.find("." + this.options.boxOfBullets).find(".is-active").removeClass("is-active").blur(),
                    n = t.find("span:last").detach();
                this.$bullets.eq(e).addClass("is-active").append(n)
            }
        }, {
            key: "destroy", value: function () {
                this.$element.off(".zf.orbit").find("*").off(".zf.orbit").end().hide(), Foundation.unregisterPlugin(this)
            }
        }]), t
    }();
    t.defaults = {
        bullets: !0,
        navButtons: !0,
        animInFromRight: "slide-in-right",
        animOutToRight: "slide-out-right",
        animInFromLeft: "slide-in-left",
        animOutToLeft: "slide-out-left",
        autoPlay: !0,
        timerDelay: 5e3,
        infiniteWrap: !0,
        swipe: !0,
        pauseOnHover: !0,
        accessible: !0,
        containerClass: "orbit-container",
        slideClass: "orbit-slide",
        boxOfBullets: "orbit-bullets",
        nextClass: "orbit-next",
        prevClass: "orbit-previous",
        useMUI: !0
    }, Foundation.plugin(t, "Orbit")
}(jQuery);
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
!function (e) {
    var t = function () {
        function t(n, i) {
            _classCallCheck(this, t), this.$element = e(n), this.rules = this.$element.data("responsive-menu"), this.currentMq = null, this.currentPlugin = null, this._init(), this._events(), Foundation.registerPlugin(this, "ResponsiveMenu")
        }

        return _createClass(t, [{
            key: "_init", value: function () {
                if ("string" == typeof this.rules) {
                    for (var t = {}, i = this.rules.split(" "), o = 0; o < i.length; o++) {
                        var s = i[o].split("-"), r = s.length > 1 ? s[0] : "small", a = s.length > 1 ? s[1] : s[0];
                        null !== n[a] && (t[r] = n[a])
                    }
                    this.rules = t
                }
                e.isEmptyObject(this.rules) || this._checkMediaQueries(), this.$element.attr("data-mutate", this.$element.attr("data-mutate") || Foundation.GetYoDigits(6, "responsive-menu"))
            }
        }, {
            key: "_events", value: function () {
                var t = this;
                e(window).on("changed.zf.mediaquery", function () {
                    t._checkMediaQueries()
                })
            }
        }, {
            key: "_checkMediaQueries", value: function () {
                var t, i = this;
                e.each(this.rules, function (e) {
                    Foundation.MediaQuery.atLeast(e) && (t = e)
                }), t && (this.currentPlugin instanceof this.rules[t].plugin || (e.each(n, function (e, t) {
                    i.$element.removeClass(t.cssClass)
                }), this.$element.addClass(this.rules[t].cssClass), this.currentPlugin && this.currentPlugin.destroy(), this.currentPlugin = new this.rules[t].plugin(this.$element, {})))
            }
        }, {
            key: "destroy", value: function () {
                this.currentPlugin.destroy(), e(window).off(".zf.ResponsiveMenu"), Foundation.unregisterPlugin(this)
            }
        }]), t
    }();
    t.defaults = {};
    var n = {
        dropdown: {cssClass: "dropdown", plugin: Foundation._plugins["dropdown-menu"] || null},
        drilldown: {cssClass: "drilldown", plugin: Foundation._plugins.drilldown || null},
        accordion: {cssClass: "accordion-menu", plugin: Foundation._plugins["accordion-menu"] || null}
    };
    Foundation.plugin(t, "ResponsiveMenu")
}(jQuery);
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
!function (e) {
    var t = function () {
        function t(n, i) {
            _classCallCheck(this, t), this.$element = e(n), this.options = e.extend({}, t.defaults, this.$element.data(), i), this._init(), this._events(), Foundation.registerPlugin(this, "ResponsiveToggle")
        }

        return _createClass(t, [{
            key: "_init", value: function () {
                var t = this.$element.data("responsive-toggle");
                if (t || console.error("Your tab bar needs an ID of a Menu as the value of data-tab-bar."), this.$targetMenu = e("#" + t), this.$toggler = this.$element.find("[data-toggle]"), this.options = e.extend({}, this.options, this.$targetMenu.data()), this.options.animate) {
                    var n = this.options.animate.split(" ");
                    this.animationIn = n[0], this.animationOut = n[1] || null
                }
                this._update()
            }
        }, {
            key: "_events", value: function () {
                this._updateMqHandler = this._update.bind(this), e(window).on("changed.zf.mediaquery", this._updateMqHandler), this.$toggler.on("click.zf.responsiveToggle", this.toggleMenu.bind(this))
            }
        }, {
            key: "_update", value: function () {
                Foundation.MediaQuery.atLeast(this.options.hideFor) ? (this.$element.hide(), this.$targetMenu.show()) : (this.$element.show(), this.$targetMenu.hide())
            }
        }, {
            key: "toggleMenu", value: function () {
                var e = this;
                Foundation.MediaQuery.atLeast(this.options.hideFor) || (this.options.animate ? this.$targetMenu.is(":hidden") ? Foundation.Motion.animateIn(this.$targetMenu, this.animationIn, function () {
                    e.$element.trigger("toggled.zf.responsiveToggle"), e.$targetMenu.find("[data-mutate]").triggerHandler("mutateme.zf.trigger")
                }) : Foundation.Motion.animateOut(this.$targetMenu, this.animationOut, function () {
                    e.$element.trigger("toggled.zf.responsiveToggle")
                }) : (this.$targetMenu.toggle(0), this.$targetMenu.find("[data-mutate]").trigger("mutateme.zf.trigger"), this.$element.trigger("toggled.zf.responsiveToggle")))
            }
        }, {
            key: "destroy", value: function () {
                this.$element.off(".zf.responsiveToggle"), this.$toggler.off(".zf.responsiveToggle"), e(window).off("changed.zf.mediaquery", this._updateMqHandler), Foundation.unregisterPlugin(this)
            }
        }]), t
    }();
    t.defaults = {hideFor: "medium", animate: !1}, Foundation.plugin(t, "ResponsiveToggle")
}(jQuery);
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
!function (e) {
    function t() {
        return /iP(ad|hone|od).*OS/.test(window.navigator.userAgent)
    }

    function n() {
        return /Android/.test(window.navigator.userAgent)
    }

    function i() {
        return t() || n()
    }

    var o = function () {
        function t(n, i) {
            _classCallCheck(this, t), this.$element = n, this.options = e.extend({}, t.defaults, this.$element.data(), i), this._init(), Foundation.registerPlugin(this, "Reveal"), Foundation.Keyboard.register("Reveal", {
                ENTER: "open",
                SPACE: "open",
                ESCAPE: "close"
            })
        }

        return _createClass(t, [{
            key: "_init", value: function () {
                this.id = this.$element.attr("id"), this.isActive = !1, this.cached = {mq: Foundation.MediaQuery.current}, this.isMobile = i(), this.$anchor = e(e('[data-open="' + this.id + '"]').length ? '[data-open="' + this.id + '"]' : '[data-toggle="' + this.id + '"]'), this.$anchor.attr({
                    "aria-controls": this.id,
                    "aria-haspopup": !0,
                    tabindex: 0
                }), (this.options.fullScreen || this.$element.hasClass("full")) && (this.options.fullScreen = !0, this.options.overlay = !1), this.options.overlay && !this.$overlay && (this.$overlay = this._makeOverlay(this.id)), this.$element.attr({
                    role: "dialog",
                    "aria-hidden": !0,
                    "data-yeti-box": this.id,
                    "data-resize": this.id
                }), this.$overlay ? this.$element.detach().appendTo(this.$overlay) : (this.$element.detach().appendTo(e(this.options.appendTo)), this.$element.addClass("without-overlay")), this._events(), this.options.deepLink && window.location.hash === "#" + this.id && e(window).one("load.zf.reveal", this.open.bind(this))
            }
        }, {
            key: "_makeOverlay", value: function () {
                return e("<div></div>").addClass("reveal-overlay").appendTo(this.options.appendTo)
            }
        }, {
            key: "_updatePosition", value: function () {
                var t, n, i = this.$element.outerWidth(), o = e(window).width(), s = this.$element.outerHeight(),
                    r = e(window).height();
                t = "auto" === this.options.hOffset ? parseInt((o - i) / 2, 10) : parseInt(this.options.hOffset, 10), n = "auto" === this.options.vOffset ? s > r ? parseInt(Math.min(100, r / 10), 10) : parseInt((r - s) / 4, 10) : parseInt(this.options.vOffset, 10), this.$element.css({top: n + "px"}), this.$overlay && "auto" === this.options.hOffset || (this.$element.css({left: t + "px"}), this.$element.css({margin: "0px"}))
            }
        }, {
            key: "_events", value: function () {
                var t = this, n = this;
                this.$element.on({
                    "open.zf.trigger": this.open.bind(this), "close.zf.trigger": function (i, o) {
                        if (i.target === n.$element[0] || e(i.target).parents("[data-closable]")[0] === o)return t.close.apply(t)
                    }, "toggle.zf.trigger": this.toggle.bind(this), "resizeme.zf.trigger": function () {
                        n._updatePosition()
                    }
                }), this.$anchor.length && this.$anchor.on("keydown.zf.reveal", function (e) {
                    13 !== e.which && 32 !== e.which || (e.stopPropagation(), e.preventDefault(), n.open())
                }), this.options.closeOnClick && this.options.overlay && this.$overlay.off(".zf.reveal").on("click.zf.reveal", function (t) {
                    t.target !== n.$element[0] && !e.contains(n.$element[0], t.target) && e.contains(document, t.target) && n.close()
                }), this.options.deepLink && e(window).on("popstate.zf.reveal:" + this.id, this._handleState.bind(this))
            }
        }, {
            key: "_handleState", value: function (e) {
                window.location.hash !== "#" + this.id || this.isActive ? this.close() : this.open()
            }
        }, {
            key: "open", value: function () {
                function t() {
                    o.isMobile ? (o.originalScrollPos || (o.originalScrollPos = window.pageYOffset), e("html, body").addClass("is-reveal-open")) : e("body").addClass("is-reveal-open")
                }

                var n = this;
                if (this.options.deepLink) {
                    var i = "#" + this.id;
                    window.history.pushState ? window.history.pushState(null, null, i) : window.location.hash = i
                }
                this.isActive = !0, this.$element.css({visibility: "hidden"}).show().scrollTop(0), this.options.overlay && this.$overlay.css({visibility: "hidden"}).show(), this._updatePosition(), this.$element.hide().css({visibility: ""}), this.$overlay && (this.$overlay.css({visibility: ""}).hide(), this.$element.hasClass("fast") ? this.$overlay.addClass("fast") : this.$element.hasClass("slow") && this.$overlay.addClass("slow")), this.options.multipleOpened || this.$element.trigger("closeme.zf.reveal", this.id);
                var o = this;
                if (this.options.animationIn) {
                    var s = function () {
                        o.$element.attr({
                            "aria-hidden": !1,
                            tabindex: -1
                        }).focus(), t(), Foundation.Keyboard.trapFocus(o.$element)
                    };
                    this.options.overlay && Foundation.Motion.animateIn(this.$overlay, "fade-in"), Foundation.Motion.animateIn(this.$element, this.options.animationIn, function () {
                        n.$element && (n.focusableElements = Foundation.Keyboard.findFocusable(n.$element), s())
                    })
                } else this.options.overlay && this.$overlay.show(0), this.$element.show(this.options.showDelay);
                this.$element.attr({
                    "aria-hidden": !1,
                    tabindex: -1
                }).focus(), Foundation.Keyboard.trapFocus(this.$element), this.$element.trigger("open.zf.reveal"), t(), setTimeout(function () {
                    n._extraHandlers()
                }, 0)
            }
        }, {
            key: "_extraHandlers", value: function () {
                var t = this;
                this.$element && (this.focusableElements = Foundation.Keyboard.findFocusable(this.$element), this.options.overlay || !this.options.closeOnClick || this.options.fullScreen || e("body").on("click.zf.reveal", function (n) {
                    n.target !== t.$element[0] && !e.contains(t.$element[0], n.target) && e.contains(document, n.target) && t.close()
                }), this.options.closeOnEsc && e(window).on("keydown.zf.reveal", function (e) {
                    Foundation.Keyboard.handleKey(e, "Reveal", {
                        close: function () {
                            t.options.closeOnEsc && (t.close(), t.$anchor.focus())
                        }
                    })
                }), this.$element.on("keydown.zf.reveal", function (n) {
                    var i = e(this);
                    Foundation.Keyboard.handleKey(n, "Reveal", {
                        open: function () {
                            t.$element.find(":focus").is(t.$element.find("[data-close]")) ? setTimeout(function () {
                                t.$anchor.focus()
                            }, 1) : i.is(t.focusableElements) && t.open()
                        }, close: function () {
                            t.options.closeOnEsc && (t.close(), t.$anchor.focus())
                        }, handled: function (e) {
                            e && n.preventDefault()
                        }
                    })
                }))
            }
        }, {
            key: "close", value: function () {
                function t() {
                    n.isMobile ? (e("html, body").removeClass("is-reveal-open"), n.originalScrollPos && (e("body").scrollTop(n.originalScrollPos), n.originalScrollPos = null)) : e("body").removeClass("is-reveal-open"), Foundation.Keyboard.releaseFocus(n.$element), n.$element.attr("aria-hidden", !0), n.$element.trigger("closed.zf.reveal")
                }

                if (!this.isActive || !this.$element.is(":visible"))return !1;
                var n = this;
                this.options.animationOut ? (this.options.overlay ? Foundation.Motion.animateOut(this.$overlay, "fade-out", t) : t(), Foundation.Motion.animateOut(this.$element, this.options.animationOut)) : (this.options.overlay ? this.$overlay.hide(0, t) : t(), this.$element.hide(this.options.hideDelay)), this.options.closeOnEsc && e(window).off("keydown.zf.reveal"), !this.options.overlay && this.options.closeOnClick && e("body").off("click.zf.reveal"), this.$element.off("keydown.zf.reveal"), this.options.resetOnClose && this.$element.html(this.$element.html()), this.isActive = !1, n.options.deepLink && (window.history.replaceState ? window.history.replaceState("", document.title, window.location.href.replace("#" + this.id, "")) : window.location.hash = "")
            }
        }, {
            key: "toggle", value: function () {
                this.isActive ? this.close() : this.open()
            }
        }, {
            key: "destroy", value: function () {
                this.options.overlay && (this.$element.appendTo(e(this.options.appendTo)), this.$overlay.hide().off().remove()), this.$element.hide().off(), this.$anchor.off(".zf"), e(window).off(".zf.reveal:" + this.id), Foundation.unregisterPlugin(this)
            }
        }]), t
    }();
    o.defaults = {
        animationIn: "",
        animationOut: "",
        showDelay: 0,
        hideDelay: 0,
        closeOnClick: !0,
        closeOnEsc: !0,
        multipleOpened: !1,
        vOffset: "auto",
        hOffset: "auto",
        fullScreen: !1,
        btmOffsetPct: 10,
        overlay: !0,
        resetOnClose: !1,
        deepLink: !1,
        appendTo: "body"
    }, Foundation.plugin(o, "Reveal")
}(jQuery);
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
!function (e) {
    function t(e, t) {
        return e / t
    }

    function n(e, t, n, i) {
        return Math.abs(e.position()[t] + e[i]() / 2 - n)
    }

    function i(e, t) {
        return Math.log(t) / Math.log(e)
    }

    var o = function () {
        function o(t, n) {
            _classCallCheck(this, o), this.$element = t, this.options = e.extend({}, o.defaults, this.$element.data(), n), this._init(), Foundation.registerPlugin(this, "Slider"), Foundation.Keyboard.register("Slider", {
                ltr: {
                    ARROW_RIGHT: "increase",
                    ARROW_UP: "increase",
                    ARROW_DOWN: "decrease",
                    ARROW_LEFT: "decrease",
                    SHIFT_ARROW_RIGHT: "increase_fast",
                    SHIFT_ARROW_UP: "increase_fast",
                    SHIFT_ARROW_DOWN: "decrease_fast",
                    SHIFT_ARROW_LEFT: "decrease_fast"
                },
                rtl: {
                    ARROW_LEFT: "increase",
                    ARROW_RIGHT: "decrease",
                    SHIFT_ARROW_LEFT: "increase_fast",
                    SHIFT_ARROW_RIGHT: "decrease_fast"
                }
            })
        }

        return _createClass(o, [{
            key: "_init", value: function () {
                this.inputs = this.$element.find("input"), this.handles = this.$element.find("[data-slider-handle]"), this.$handle = this.handles.eq(0), this.$input = this.inputs.length ? this.inputs.eq(0) : e("#" + this.$handle.attr("aria-controls")), this.$fill = this.$element.find("[data-slider-fill]").css(this.options.vertical ? "height" : "width", 0);
                var t = !1;
                (this.options.disabled || this.$element.hasClass(this.options.disabledClass)) && (this.options.disabled = !0, this.$element.addClass(this.options.disabledClass)), this.inputs.length || (this.inputs = e().add(this.$input), this.options.binding = !0), this._setInitAttr(0), this.handles[1] && (this.options.doubleSided = !0, this.$handle2 = this.handles.eq(1), this.$input2 = this.inputs.length > 1 ? this.inputs.eq(1) : e("#" + this.$handle2.attr("aria-controls")), this.inputs[1] || (this.inputs = this.inputs.add(this.$input2)), t = !0, this._setInitAttr(1)), this.setHandles(), this._events()
            }
        }, {
            key: "setHandles", value: function () {
                var e = this;
                this.handles[1] ? this._setHandlePos(this.$handle, this.inputs.eq(0).val(), !0, function () {
                    e._setHandlePos(e.$handle2, e.inputs.eq(1).val(), !0)
                }) : this._setHandlePos(this.$handle, this.inputs.eq(0).val(), !0)
            }
        }, {
            key: "_reflow", value: function () {
                this.setHandles()
            }
        }, {
            key: "_pctOfBar", value: function (e) {
                var n = t(e - this.options.start, this.options.end - this.options.start);
                switch (this.options.positionValueFunction) {
                    case"pow":
                        n = this._logTransform(n);
                        break;
                    case"log":
                        n = this._powTransform(n)
                }
                return n.toFixed(2)
            }
        }, {
            key: "_value", value: function (e) {
                switch (this.options.positionValueFunction) {
                    case"pow":
                        e = this._powTransform(e);
                        break;
                    case"log":
                        e = this._logTransform(e)
                }
                var t = (this.options.end - this.options.start) * e + this.options.start;
                return t
            }
        }, {
            key: "_logTransform", value: function (e) {
                return i(this.options.nonLinearBase, e * (this.options.nonLinearBase - 1) + 1)
            }
        }, {
            key: "_powTransform", value: function (e) {
                return (Math.pow(this.options.nonLinearBase, e) - 1) / (this.options.nonLinearBase - 1)
            }
        }, {
            key: "_setHandlePos", value: function (e, n, i, o) {
                if (!this.$element.hasClass(this.options.disabledClass)) {
                    n = parseFloat(n), n < this.options.start ? n = this.options.start : n > this.options.end && (n = this.options.end);
                    var s = this.options.doubleSided;
                    if (s)if (0 === this.handles.index(e)) {
                        var r = parseFloat(this.$handle2.attr("aria-valuenow"));
                        n = n >= r ? r - this.options.step : n
                    } else {
                        var a = parseFloat(this.$handle.attr("aria-valuenow"));
                        n = n <= a ? a + this.options.step : n
                    }
                    this.options.vertical && !i && (n = this.options.end - n);
                    var l = this, u = this.options.vertical, d = u ? "height" : "width", c = u ? "top" : "left",
                        h = e[0].getBoundingClientRect()[d], f = this.$element[0].getBoundingClientRect()[d],
                        p = this._pctOfBar(n), m = (f - h) * p, g = (100 * t(m, f)).toFixed(this.options.decimal);
                    n = parseFloat(n.toFixed(this.options.decimal));
                    var v = {};
                    if (this._setValues(e, n), s) {
                        var y, b = 0 === this.handles.index(e), w = ~~(100 * t(h, f));
                        if (b) v[c] = g + "%", y = parseFloat(this.$handle2[0].style[c]) - g + w, o && "function" == typeof o && o(); else {
                            var C = parseFloat(this.$handle[0].style[c]);
                            y = g - (isNaN(C) ? (this.options.initialStart - this.options.start) / ((this.options.end - this.options.start) / 100) : C) + w
                        }
                        v["min-" + d] = y + "%"
                    }
                    this.$element.one("finished.zf.animate", function () {
                        l.$element.trigger("moved.zf.slider", [e])
                    });
                    var k = this.$element.data("dragging") ? 1e3 / 60 : this.options.moveTime;
                    Foundation.Move(k, e, function () {
                        isNaN(g) ? e.css(c, 100 * p + "%") : e.css(c, g + "%"), l.options.doubleSided ? l.$fill.css(v) : l.$fill.css(d, 100 * p + "%")
                    }), clearTimeout(l.timeout), l.timeout = setTimeout(function () {
                        l.$element.trigger("changed.zf.slider", [e])
                    }, l.options.changedDelay)
                }
            }
        }, {
            key: "_setInitAttr", value: function (e) {
                var t = 0 === e ? this.options.initialStart : this.options.initialEnd,
                    n = this.inputs.eq(e).attr("id") || Foundation.GetYoDigits(6, "slider");
                this.inputs.eq(e).attr({
                    id: n,
                    max: this.options.end,
                    min: this.options.start,
                    step: this.options.step
                }), this.inputs.eq(e).val(t), this.handles.eq(e).attr({
                    role: "slider",
                    "aria-controls": n,
                    "aria-valuemax": this.options.end,
                    "aria-valuemin": this.options.start,
                    "aria-valuenow": t,
                    "aria-orientation": this.options.vertical ? "vertical" : "horizontal",
                    tabindex: 0
                })
            }
        }, {
            key: "_setValues", value: function (e, t) {
                var n = this.options.doubleSided ? this.handles.index(e) : 0;
                this.inputs.eq(n).val(t), e.attr("aria-valuenow", t)
            }
        }, {
            key: "_handleEvent", value: function (i, o, s) {
                var r, a;
                if (s) r = this._adjustValue(null, s), a = !0; else {
                    i.preventDefault();
                    var l = this, u = this.options.vertical, d = u ? "height" : "width", c = u ? "top" : "left",
                        h = u ? i.pageY : i.pageX,
                        f = (this.$handle[0].getBoundingClientRect()[d] / 2, this.$element[0].getBoundingClientRect()[d]),
                        p = u ? e(window).scrollTop() : e(window).scrollLeft(), m = this.$element.offset()[c];
                    i.clientY === i.pageY && (h += p);
                    var g, v = h - m;
                    g = v < 0 ? 0 : v > f ? f : v;
                    var y = t(g, f);
                    if (r = this._value(y), Foundation.rtl() && !this.options.vertical && (r = this.options.end - r), r = l._adjustValue(null, r), a = !1, !o) {
                        var b = n(this.$handle, c, g, d), w = n(this.$handle2, c, g, d);
                        o = b <= w ? this.$handle : this.$handle2
                    }
                }
                this._setHandlePos(o, r, a)
            }
        }, {
            key: "_adjustValue", value: function (e, t) {
                var n, i, o, s, r = this.options.step, a = parseFloat(r / 2);
                return n = e ? parseFloat(e.attr("aria-valuenow")) : t, i = n % r, o = n - i, s = o + r, 0 === i ? n : n = n >= o + a ? s : o
            }
        }, {
            key: "_events", value: function () {
                this._eventsForHandle(this.$handle), this.handles[1] && this._eventsForHandle(this.$handle2)
            }
        }, {
            key: "_eventsForHandle", value: function (t) {
                var n, i = this;
                if (this.inputs.off("change.zf.slider").on("change.zf.slider", function (t) {
                        var n = i.inputs.index(e(this));
                        i._handleEvent(t, i.handles.eq(n), e(this).val())
                    }), this.options.clickSelect && this.$element.off("click.zf.slider").on("click.zf.slider", function (t) {
                        return !i.$element.data("dragging") && void(e(t.target).is("[data-slider-handle]") || (i.options.doubleSided ? i._handleEvent(t) : i._handleEvent(t, i.$handle)))
                    }), this.options.draggable) {
                    this.handles.addTouch();
                    var o = e("body");
                    t.off("mousedown.zf.slider").on("mousedown.zf.slider", function (s) {
                        t.addClass("is-dragging"), i.$fill.addClass("is-dragging"), i.$element.data("dragging", !0), n = e(s.currentTarget), o.on("mousemove.zf.slider", function (e) {
                            e.preventDefault(), i._handleEvent(e, n)
                        }).on("mouseup.zf.slider", function (e) {
                            i._handleEvent(e, n), t.removeClass("is-dragging"), i.$fill.removeClass("is-dragging"), i.$element.data("dragging", !1), o.off("mousemove.zf.slider mouseup.zf.slider")
                        })
                    }).on("selectstart.zf.slider touchmove.zf.slider", function (e) {
                        e.preventDefault()
                    })
                }
                t.off("keydown.zf.slider").on("keydown.zf.slider", function (t) {
                    var n, o = e(this), s = i.options.doubleSided ? i.handles.index(o) : 0,
                        r = parseFloat(i.inputs.eq(s).val());
                    Foundation.Keyboard.handleKey(t, "Slider", {
                        decrease: function () {
                            n = r - i.options.step
                        }, increase: function () {
                            n = r + i.options.step
                        }, decrease_fast: function () {
                            n = r - 10 * i.options.step
                        }, increase_fast: function () {
                            n = r + 10 * i.options.step
                        }, handled: function () {
                            t.preventDefault(), i._setHandlePos(o, n, !0)
                        }
                    })
                })
            }
        }, {
            key: "destroy", value: function () {
                this.handles.off(".zf.slider"), this.inputs.off(".zf.slider"), this.$element.off(".zf.slider"), clearTimeout(this.timeout), Foundation.unregisterPlugin(this)
            }
        }]), o
    }();
    o.defaults = {
        start: 0,
        end: 100,
        step: 1,
        initialStart: 0,
        initialEnd: 100,
        binding: !1,
        clickSelect: !0,
        vertical: !1,
        draggable: !0,
        disabled: !1,
        doubleSided: !1,
        decimal: 2,
        moveTime: 200,
        disabledClass: "disabled",
        invertVertical: !1,
        changedDelay: 500,
        nonLinearBase: 5,
        positionValueFunction: "linear"
    }, Foundation.plugin(o, "Slider")
}(jQuery);
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
!function (e) {
    function t(e) {
        return parseInt(window.getComputedStyle(document.body, null).fontSize, 10) * e
    }

    var n = function () {
        function n(t, i) {
            _classCallCheck(this, n), this.$element = t, this.options = e.extend({}, n.defaults, this.$element.data(), i), this._init(), Foundation.registerPlugin(this, "Sticky")
        }

        return _createClass(n, [{
            key: "_init", value: function () {
                var t = this.$element.parent("[data-sticky-container]"),
                    n = this.$element[0].id || Foundation.GetYoDigits(6, "sticky"), i = this;
                t.length || (this.wasWrapped = !0), this.$container = t.length ? t : e(this.options.container).wrapInner(this.$element), this.$container.addClass(this.options.containerClass), this.$element.addClass(this.options.stickyClass).attr({"data-resize": n}), this.scrollCount = this.options.checkEvery, this.isStuck = !1, e(window).one("load.zf.sticky", function () {
                    i.containerHeight = "none" == i.$element.css("display") ? 0 : i.$element[0].getBoundingClientRect().height, i.$container.css("height", i.containerHeight), i.elemHeight = i.containerHeight, "" !== i.options.anchor ? i.$anchor = e("#" + i.options.anchor) : i._parsePoints(), i._setSizes(function () {
                        var e = window.pageYOffset;
                        i._calc(!1, e), i.isStuck || i._removeSticky(!(e >= i.topPoint))
                    }), i._events(n.split("-").reverse().join("-"))
                })
            }
        }, {
            key: "_parsePoints", value: function () {
                for (var t = "" == this.options.topAnchor ? 1 : this.options.topAnchor, n = "" == this.options.btmAnchor ? document.documentElement.scrollHeight : this.options.btmAnchor, i = [t, n], o = {}, s = 0, r = i.length; s < r && i[s]; s++) {
                    var a;
                    if ("number" == typeof i[s]) a = i[s]; else {
                        var l = i[s].split(":"), u = e("#" + l[0]);
                        a = u.offset().top, l[1] && "bottom" === l[1].toLowerCase() && (a += u[0].getBoundingClientRect().height)
                    }
                    o[s] = a
                }
                this.points = o
            }
        }, {
            key: "_events", value: function (t) {
                var n = this, i = this.scrollListener = "scroll.zf." + t;
                this.isOn || (this.canStick && (this.isOn = !0, e(window).off(i).on(i, function (e) {
                    0 === n.scrollCount ? (n.scrollCount = n.options.checkEvery, n._setSizes(function () {
                        n._calc(!1, window.pageYOffset)
                    })) : (n.scrollCount--, n._calc(!1, window.pageYOffset))
                })), this.$element.off("resizeme.zf.trigger").on("resizeme.zf.trigger", function (e, o) {
                    n._setSizes(function () {
                        n._calc(!1), n.canStick ? n.isOn || n._events(t) : n.isOn && n._pauseListeners(i)
                    })
                }))
            }
        }, {
            key: "_pauseListeners", value: function (t) {
                this.isOn = !1, e(window).off(t), this.$element.trigger("pause.zf.sticky")
            }
        }, {
            key: "_calc", value: function (e, t) {
                return e && this._setSizes(), this.canStick ? (t || (t = window.pageYOffset), void(t >= this.topPoint ? t <= this.bottomPoint ? this.isStuck || this._setSticky() : this.isStuck && this._removeSticky(!1) : this.isStuck && this._removeSticky(!0))) : (this.isStuck && this._removeSticky(!0), !1)
            }
        }, {
            key: "_setSticky", value: function () {
                var e = this, t = this.options.stickTo, n = "top" === t ? "marginTop" : "marginBottom",
                    i = "top" === t ? "bottom" : "top", o = {};
                o[n] = this.options[n] + "em", o[t] = 0, o[i] = "auto", this.isStuck = !0, this.$element.removeClass("is-anchored is-at-" + i).addClass("is-stuck is-at-" + t).css(o).trigger("sticky.zf.stuckto:" + t), this.$element.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function () {
                    e._setSizes()
                })
            }
        }, {
            key: "_removeSticky", value: function (e) {
                var t = this.options.stickTo, n = "top" === t, i = {},
                    o = (this.points ? this.points[1] - this.points[0] : this.anchorHeight) - this.elemHeight,
                    s = n ? "marginTop" : "marginBottom", r = e ? "top" : "bottom";
                i[s] = 0, i.bottom = "auto", e ? i.top = 0 : i.top = o, this.isStuck = !1, this.$element.removeClass("is-stuck is-at-" + t).addClass("is-anchored is-at-" + r).css(i).trigger("sticky.zf.unstuckfrom:" + r)
            }
        }, {
            key: "_setSizes", value: function (e) {
                this.canStick = Foundation.MediaQuery.is(this.options.stickyOn), this.canStick || e && "function" == typeof e && e();
                var t = this.$container[0].getBoundingClientRect().width,
                    n = window.getComputedStyle(this.$container[0]), i = parseInt(n["padding-left"], 10),
                    o = parseInt(n["padding-right"], 10);
                this.$anchor && this.$anchor.length ? this.anchorHeight = this.$anchor[0].getBoundingClientRect().height : this._parsePoints(), this.$element.css({"max-width": t - i - o + "px"});
                var s = this.$element[0].getBoundingClientRect().height || this.containerHeight;
                if ("none" == this.$element.css("display") && (s = 0), this.containerHeight = s, this.$container.css({height: s}), this.elemHeight = s, !this.isStuck && this.$element.hasClass("is-at-bottom")) {
                    var r = (this.points ? this.points[1] - this.$container.offset().top : this.anchorHeight) - this.elemHeight;
                    this.$element.css("top", r)
                }
                this._setBreakPoints(s, function () {
                    e && "function" == typeof e && e()
                })
            }
        }, {
            key: "_setBreakPoints", value: function (e, n) {
                if (!this.canStick) {
                    if (!n || "function" != typeof n)return !1;
                    n()
                }
                var i = t(this.options.marginTop), o = t(this.options.marginBottom),
                    s = this.points ? this.points[0] : this.$anchor.offset().top,
                    r = this.points ? this.points[1] : s + this.anchorHeight, a = window.innerHeight;
                "top" === this.options.stickTo ? (s -= i, r -= e + i) : "bottom" === this.options.stickTo && (s -= a - (e + o), r -= a - o), this.topPoint = s, this.bottomPoint = r, n && "function" == typeof n && n()
            }
        }, {
            key: "destroy", value: function () {
                this._removeSticky(!0), this.$element.removeClass(this.options.stickyClass + " is-anchored is-at-top").css({
                    height: "",
                    top: "",
                    bottom: "",
                    "max-width": ""
                }).off("resizeme.zf.trigger"), this.$anchor && this.$anchor.length && this.$anchor.off("change.zf.sticky"), e(window).off(this.scrollListener), this.wasWrapped ? this.$element.unwrap() : this.$container.removeClass(this.options.containerClass).css({height: ""}), Foundation.unregisterPlugin(this)
            }
        }]), n
    }();
    n.defaults = {
        container: "<div data-sticky-container></div>",
        stickTo: "top",
        anchor: "",
        topAnchor: "",
        btmAnchor: "",
        marginTop: 1,
        marginBottom: 1,
        stickyOn: "medium",
        stickyClass: "sticky",
        containerClass: "sticky-container",
        checkEvery: -1
    }, Foundation.plugin(n, "Sticky")
}(jQuery);
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
}, _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
!function (e) {
    var t = function () {
        function t(n, i) {
            _classCallCheck(this, t), this.$element = n, this.options = e.extend({}, t.defaults, this.$element.data(), i), this._init(), Foundation.registerPlugin(this, "Tabs"), Foundation.Keyboard.register("Tabs", {
                ENTER: "open",
                SPACE: "open",
                ARROW_RIGHT: "next",
                ARROW_UP: "previous",
                ARROW_DOWN: "next",
                ARROW_LEFT: "previous"
            })
        }

        return _createClass(t, [{
            key: "_init", value: function () {
                var t = this;
                if (this.$element.attr({role: "tablist"}), this.$tabTitles = this.$element.find("." + this.options.linkClass), this.$tabContent = e('[data-tabs-content="' + this.$element[0].id + '"]'), this.$tabTitles.each(function () {
                        var n = e(this), i = n.find("a"), o = n.hasClass("" + t.options.linkActiveClass),
                            s = i[0].hash.slice(1), r = i[0].id ? i[0].id : s + "-label", a = e("#" + s);
                        if (n.attr({role: "presentation"}), i.attr({
                                role: "tab",
                                "aria-controls": s,
                                "aria-selected": o,
                                id: r
                            }), a.attr({
                                role: "tabpanel",
                                "aria-hidden": !o,
                                "aria-labelledby": r
                            }), o && t.options.autoFocus && e(window).load(function () {
                                e("html, body").animate({scrollTop: n.offset().top}, t.options.deepLinkSmudgeDelay, function () {
                                    i.focus()
                                })
                            }), t.options.deepLink) {
                            var l = window.location.hash;
                            if (l.length) {
                                var i = n.find('[href="' + l + '"]');
                                i.length && (t.selectTab(e(l)), t.options.deepLinkSmudge && e(window).load(function () {
                                    var i = n.offset();
                                    e("html, body").animate({scrollTop: i.top}, t.options.deepLinkSmudgeDelay)
                                }), n.trigger("deeplink.zf.tabs", [i, e(l)]))
                            }
                        }
                    }), this.options.matchHeight) {
                    var n = this.$tabContent.find("img");
                    n.length ? Foundation.onImagesLoaded(n, this._setHeight.bind(this)) : this._setHeight()
                }
                this._events()
            }
        }, {
            key: "_events", value: function () {
                this._addKeyHandler(), this._addClickHandler(), this._setHeightMqHandler = null, this.options.matchHeight && (this._setHeightMqHandler = this._setHeight.bind(this), e(window).on("changed.zf.mediaquery", this._setHeightMqHandler))
            }
        }, {
            key: "_addClickHandler", value: function () {
                var t = this;
                this.$element.off("click.zf.tabs").on("click.zf.tabs", "." + this.options.linkClass, function (n) {
                    n.preventDefault(), n.stopPropagation(), t._handleTabChange(e(this))
                })
            }
        }, {
            key: "_addKeyHandler", value: function () {
                var t = this;
                this.$tabTitles.off("keydown.zf.tabs").on("keydown.zf.tabs", function (n) {
                    if (9 !== n.which) {
                        var i, o, s = e(this), r = s.parent("ul").children("li");
                        r.each(function (n) {
                            if (e(this).is(s))return void(t.options.wrapOnKeys ? (i = 0 === n ? r.last() : r.eq(n - 1), o = n === r.length - 1 ? r.first() : r.eq(n + 1)) : (i = r.eq(Math.max(0, n - 1)), o = r.eq(Math.min(n + 1, r.length - 1))))
                        }), Foundation.Keyboard.handleKey(n, "Tabs", {
                            open: function () {
                                s.find('[role="tab"]').focus(), t._handleTabChange(s)
                            }, previous: function () {
                                i.find('[role="tab"]').focus(), t._handleTabChange(i)
                            }, next: function () {
                                o.find('[role="tab"]').focus(), t._handleTabChange(o)
                            }, handled: function () {
                                n.stopPropagation(), n.preventDefault()
                            }
                        })
                    }
                })
            }
        }, {
            key: "_handleTabChange", value: function (e) {
                if (e.hasClass("" + this.options.linkActiveClass))return void(this.options.activeCollapse && (this._collapseTab(e), this.$element.trigger("collapse.zf.tabs", [e])));
                var t = this.$element.find("." + this.options.linkClass + "." + this.options.linkActiveClass),
                    n = e.find('[role="tab"]'), i = n[0].hash, o = this.$tabContent.find(i);
                if (this._collapseTab(t), this._openTab(e), this.options.deepLink) {
                    var s = e.find("a").attr("href");
                    this.options.updateHistory ? history.pushState({}, "", s) : history.replaceState({}, "", s)
                }
                this.$element.trigger("change.zf.tabs", [e, o]), o.find("[data-mutate]").trigger("mutateme.zf.trigger")
            }
        }, {
            key: "_openTab", value: function (e) {
                var t = e.find('[role="tab"]'), n = t[0].hash, i = this.$tabContent.find(n);
                e.addClass("" + this.options.linkActiveClass), t.attr({"aria-selected": "true"}), i.addClass("" + this.options.panelActiveClass).attr({"aria-hidden": "false"})
            }
        }, {
            key: "_collapseTab", value: function (t) {
                var n = t.removeClass("" + this.options.linkActiveClass).find('[role="tab"]').attr({"aria-selected": "false"});
                e("#" + n.attr("aria-controls")).removeClass("" + this.options.panelActiveClass).attr({"aria-hidden": "true"})
            }
        }, {
            key: "selectTab", value: function (e) {
                var t;
                t = "object" === ("undefined" == typeof e ? "undefined" : _typeof(e)) ? e[0].id : e, t.indexOf("#") < 0 && (t = "#" + t);
                var n = this.$tabTitles.find('[href="' + t + '"]').parent("." + this.options.linkClass);
                this._handleTabChange(n)
            }
        }, {
            key: "_setHeight", value: function () {
                var t = 0;
                this.$tabContent.find("." + this.options.panelClass).css("height", "").each(function () {
                    var n = e(this), i = n.hasClass("" + this.options.panelActiveClass);
                    i || n.css({visibility: "hidden", display: "block"});
                    var o = this.getBoundingClientRect().height;
                    i || n.css({visibility: "", display: ""}), t = o > t ? o : t
                }).css("height", t + "px")
            }
        }, {
            key: "destroy", value: function () {
                this.$element.find("." + this.options.linkClass).off(".zf.tabs").hide().end().find("." + this.options.panelClass).hide(), this.options.matchHeight && null != this._setHeightMqHandler && e(window).off("changed.zf.mediaquery", this._setHeightMqHandler), Foundation.unregisterPlugin(this)
            }
        }]), t
    }();
    t.defaults = {
        deepLink: !1,
        deepLinkSmudge: !1,
        deepLinkSmudgeDelay: 300,
        updateHistory: !1,
        autoFocus: !1,
        wrapOnKeys: !0,
        matchHeight: !1,
        activeCollapse: !1,
        linkClass: "tabs-title",
        linkActiveClass: "is-active",
        panelClass: "tabs-panel",
        panelActiveClass: "is-active"
    }, Foundation.plugin(t, "Tabs")
}(jQuery);
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
!function (e) {
    var t = function () {
        function t(n, i) {
            _classCallCheck(this, t), this.$element = n, this.options = e.extend({}, t.defaults, n.data(), i), this.className = "", this._init(), this._events(), Foundation.registerPlugin(this, "Toggler")
        }

        return _createClass(t, [{
            key: "_init", value: function () {
                var t;
                this.options.animate ? (t = this.options.animate.split(" "), this.animationIn = t[0], this.animationOut = t[1] || null) : (t = this.$element.data("toggler"), this.className = "." === t[0] ? t.slice(1) : t);
                var n = this.$element[0].id;
                e('[data-open="' + n + '"], [data-close="' + n + '"], [data-toggle="' + n + '"]').attr("aria-controls", n), this.$element.attr("aria-expanded", !this.$element.is(":hidden"))
            }
        }, {
            key: "_events", value: function () {
                this.$element.off("toggle.zf.trigger").on("toggle.zf.trigger", this.toggle.bind(this))
            }
        }, {
            key: "toggle", value: function () {
                this[this.options.animate ? "_toggleAnimate" : "_toggleClass"]()
            }
        }, {
            key: "_toggleClass", value: function () {
                this.$element.toggleClass(this.className);
                var e = this.$element.hasClass(this.className);
                e ? this.$element.trigger("on.zf.toggler") : this.$element.trigger("off.zf.toggler"), this._updateARIA(e), this.$element.find("[data-mutate]").trigger("mutateme.zf.trigger")
            }
        }, {
            key: "_toggleAnimate", value: function () {
                var e = this;
                this.$element.is(":hidden") ? Foundation.Motion.animateIn(this.$element, this.animationIn, function () {
                    e._updateARIA(!0), this.trigger("on.zf.toggler"), this.find("[data-mutate]").trigger("mutateme.zf.trigger")
                }) : Foundation.Motion.animateOut(this.$element, this.animationOut, function () {
                    e._updateARIA(!1), this.trigger("off.zf.toggler"), this.find("[data-mutate]").trigger("mutateme.zf.trigger")
                })
            }
        }, {
            key: "_updateARIA", value: function (e) {
                this.$element.attr("aria-expanded", !!e)
            }
        }, {
            key: "destroy", value: function () {
                this.$element.off(".zf.toggler"), Foundation.unregisterPlugin(this)
            }
        }]), t
    }();
    t.defaults = {animate: !1}, Foundation.plugin(t, "Toggler")
}(jQuery);
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
!function (e) {
    var t = function () {
        function t(n, i) {
            _classCallCheck(this, t), this.$element = n, this.options = e.extend({}, t.defaults, this.$element.data(), i), this.isActive = !1, this.isClick = !1, this._init(), Foundation.registerPlugin(this, "Tooltip")
        }

        return _createClass(t, [{
            key: "_init", value: function () {
                var t = this.$element.attr("aria-describedby") || Foundation.GetYoDigits(6, "tooltip");
                this.options.positionClass = this.options.positionClass || this._getPositionClass(this.$element), this.options.tipText = this.options.tipText || this.$element.attr("title"), this.template = this.options.template ? e(this.options.template) : this._buildTemplate(t), this.options.allowHtml ? this.template.appendTo(document.body).html(this.options.tipText).hide() : this.template.appendTo(document.body).text(this.options.tipText).hide(), this.$element.attr({
                    title: "",
                    "aria-describedby": t,
                    "data-yeti-box": t,
                    "data-toggle": t,
                    "data-resize": t
                }).addClass(this.options.triggerClass), this.usedPositions = [], this.counter = 4, this.classChanged = !1, this._events()
            }
        }, {
            key: "_getPositionClass", value: function (e) {
                if (!e)return "";
                var t = e[0].className.match(/\b(top|left|right)\b/g);
                return t = t ? t[0] : ""
            }
        }, {
            key: "_buildTemplate", value: function (t) {
                var n = (this.options.tooltipClass + " " + this.options.positionClass + " " + this.options.templateClasses).trim(),
                    i = e("<div></div>").addClass(n).attr({
                        role: "tooltip",
                        "aria-hidden": !0,
                        "data-is-active": !1,
                        "data-is-focus": !1,
                        id: t
                    });
                return i
            }
        }, {
            key: "_reposition", value: function (e) {
                this.usedPositions.push(e ? e : "bottom"), !e && this.usedPositions.indexOf("top") < 0 ? this.template.addClass("top") : "top" === e && this.usedPositions.indexOf("bottom") < 0 ? this.template.removeClass(e) : "left" === e && this.usedPositions.indexOf("right") < 0 ? this.template.removeClass(e).addClass("right") : "right" === e && this.usedPositions.indexOf("left") < 0 ? this.template.removeClass(e).addClass("left") : !e && this.usedPositions.indexOf("top") > -1 && this.usedPositions.indexOf("left") < 0 ? this.template.addClass("left") : "top" === e && this.usedPositions.indexOf("bottom") > -1 && this.usedPositions.indexOf("left") < 0 ? this.template.removeClass(e).addClass("left") : "left" === e && this.usedPositions.indexOf("right") > -1 && this.usedPositions.indexOf("bottom") < 0 ? this.template.removeClass(e) : "right" === e && this.usedPositions.indexOf("left") > -1 && this.usedPositions.indexOf("bottom") < 0 ? this.template.removeClass(e) : this.template.removeClass(e), this.classChanged = !0, this.counter--
            }
        }, {
            key: "_setPosition", value: function () {
                var e = this._getPositionClass(this.template), t = Foundation.Box.GetDimensions(this.template),
                    n = Foundation.Box.GetDimensions(this.$element),
                    i = "left" === e ? "left" : "right" === e ? "left" : "top", o = "top" === i ? "height" : "width";
                "height" === o ? this.options.vOffset : this.options.hOffset;
                if (t.width >= t.windowDims.width || !this.counter && !Foundation.Box.ImNotTouchingYou(this.template))return this.template.offset(Foundation.Box.GetOffsets(this.template, this.$element, "center bottom", this.options.vOffset, this.options.hOffset, !0)).css({
                    width: n.windowDims.width - 2 * this.options.hOffset,
                    height: "auto"
                }), !1;
                for (this.template.offset(Foundation.Box.GetOffsets(this.template, this.$element, "center " + (e || "bottom"), this.options.vOffset, this.options.hOffset)); !Foundation.Box.ImNotTouchingYou(this.template) && this.counter;)this._reposition(e), this._setPosition()
            }
        }, {
            key: "show", value: function () {
                if ("all" !== this.options.showOn && !Foundation.MediaQuery.is(this.options.showOn))return !1;
                var e = this;
                this.template.css("visibility", "hidden").show(), this._setPosition(), this.$element.trigger("closeme.zf.tooltip", this.template.attr("id")), this.template.attr({
                    "data-is-active": !0,
                    "aria-hidden": !1
                }), e.isActive = !0, this.template.stop().hide().css("visibility", "").fadeIn(this.options.fadeInDuration, function () {
                }), this.$element.trigger("show.zf.tooltip")
            }
        }, {
            key: "hide", value: function () {
                var e = this;
                this.template.stop().attr({
                    "aria-hidden": !0,
                    "data-is-active": !1
                }).fadeOut(this.options.fadeOutDuration, function () {
                    e.isActive = !1, e.isClick = !1, e.classChanged && (e.template.removeClass(e._getPositionClass(e.template)).addClass(e.options.positionClass), e.usedPositions = [], e.counter = 4, e.classChanged = !1)
                }), this.$element.trigger("hide.zf.tooltip")
            }
        }, {
            key: "_events", value: function () {
                var e = this, t = (this.template, !1);
                this.options.disableHover || this.$element.on("mouseenter.zf.tooltip", function (t) {
                    e.isActive || (e.timeout = setTimeout(function () {
                        e.show()
                    }, e.options.hoverDelay))
                }).on("mouseleave.zf.tooltip", function (n) {
                    clearTimeout(e.timeout), (!t || e.isClick && !e.options.clickOpen) && e.hide()
                }), this.options.clickOpen ? this.$element.on("mousedown.zf.tooltip", function (t) {
                    t.stopImmediatePropagation(), e.isClick || (e.isClick = !0, !e.options.disableHover && e.$element.attr("tabindex") || e.isActive || e.show())
                }) : this.$element.on("mousedown.zf.tooltip", function (t) {
                    t.stopImmediatePropagation(), e.isClick = !0
                }), this.options.disableForTouch || this.$element.on("tap.zf.tooltip touchend.zf.tooltip", function (t) {
                    e.isActive ? e.hide() : e.show()
                }), this.$element.on({"close.zf.trigger": this.hide.bind(this)}), this.$element.on("focus.zf.tooltip", function (n) {
                    return t = !0, e.isClick ? (e.options.clickOpen || (t = !1), !1) : void e.show()
                }).on("focusout.zf.tooltip", function (n) {
                    t = !1, e.isClick = !1, e.hide()
                }).on("resizeme.zf.trigger", function () {
                    e.isActive && e._setPosition()
                })
            }
        }, {
            key: "toggle", value: function () {
                this.isActive ? this.hide() : this.show()
            }
        }, {
            key: "destroy", value: function () {
                this.$element.attr("title", this.template.text()).off(".zf.trigger .zf.tooltip").removeClass("has-tip top right left").removeAttr("aria-describedby aria-haspopup data-disable-hover data-resize data-toggle data-tooltip data-yeti-box"), this.template.remove(), Foundation.unregisterPlugin(this)
            }
        }]), t
    }();
    t.defaults = {
        disableForTouch: !1,
        hoverDelay: 200,
        fadeInDuration: 150,
        fadeOutDuration: 150,
        disableHover: !1,
        templateClasses: "",
        tooltipClass: "tooltip",
        triggerClass: "has-tip",
        showOn: "small",
        template: "",
        tipText: "",
        touchCloseText: "Tap to close.",
        clickOpen: !0,
        positionClass: "",
        vOffset: 10,
        hOffset: 12,
        allowHtml: !1
    }, Foundation.plugin(t, "Tooltip")
}(jQuery);
var _createClass = function () {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
    }
}();
!function (e) {
    var t = function () {
        function t(n, i) {
            _classCallCheck(this, t), this.$element = e(n), this.options = e.extend({}, this.$element.data(), i), this.rules = this.$element.data("responsive-accordion-tabs"), this.currentMq = null, this.currentPlugin = null, this.$element.attr("id") || this.$element.attr("id", Foundation.GetYoDigits(6, "responsiveaccordiontabs")), this._init(), this._events(), Foundation.registerPlugin(this, "ResponsiveAccordionTabs")
        }

        return _createClass(t, [{
            key: "_init", value: function () {
                if ("string" == typeof this.rules) {
                    for (var t = {}, i = this.rules.split(" "), o = 0; o < i.length; o++) {
                        var s = i[o].split("-"), r = s.length > 1 ? s[0] : "small", a = s.length > 1 ? s[1] : s[0];
                        null !== n[a] && (t[r] = n[a])
                    }
                    this.rules = t
                }
                this._getAllOptions(), e.isEmptyObject(this.rules) || this._checkMediaQueries()
            }
        }, {
            key: "_getAllOptions", value: function () {
                var t = this;
                t.allOptions = {};
                for (var i in n)if (n.hasOwnProperty(i)) {
                    var o = n[i];
                    try {
                        var s = e("<ul></ul>"), r = new o.plugin(s, t.options);
                        for (var a in r.options)if (r.options.hasOwnProperty(a) && "zfPlugin" !== a) {
                            var l = r.options[a];
                            t.allOptions[a] = l
                        }
                        r.destroy()
                    } catch (u) {
                    }
                }
            }
        }, {
            key: "_events", value: function () {
                var t = this;
                e(window).on("changed.zf.mediaquery", function () {
                    t._checkMediaQueries()
                })
            }
        }, {
            key: "_checkMediaQueries", value: function () {
                var t, i = this;
                e.each(this.rules, function (e) {
                    Foundation.MediaQuery.atLeast(e) && (t = e)
                }), t && (this.currentPlugin instanceof this.rules[t].plugin || (e.each(n, function (e, t) {
                    i.$element.removeClass(t.cssClass)
                }), this.$element.addClass(this.rules[t].cssClass), this.currentPlugin && (!this.currentPlugin.$element.data("zfPlugin") && this.storezfData && this.currentPlugin.$element.data("zfPlugin", this.storezfData), this.currentPlugin.destroy()), this._handleMarkup(this.rules[t].cssClass), this.currentPlugin = new this.rules[t].plugin(this.$element, {}), this.storezfData = this.currentPlugin.$element.data("zfPlugin")))
            }
        }, {
            key: "_handleMarkup", value: function (t) {
                var n = this, i = "accordion", o = e("[data-tabs-content=" + this.$element.attr("id") + "]");
                if (o.length && (i = "tabs"), i !== t) {
                    var s = n.allOptions.linkClass ? n.allOptions.linkClass : "tabs-title",
                        r = n.allOptions.panelClass ? n.allOptions.panelClass : "tabs-panel";
                    this.$element.removeAttr("role");
                    var a = this.$element.children("." + s + ",[data-accordion-item]").removeClass(s).removeClass("accordion-item").removeAttr("data-accordion-item"),
                        l = a.children("a").removeClass("accordion-title");
                    if ("tabs" === i ? (o = o.children("." + r).removeClass(r).removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby"), o.children("a").removeAttr("role").removeAttr("aria-controls").removeAttr("aria-selected")) : o = a.children("[data-tab-content]").removeClass("accordion-content"), o.css({
                            display: "",
                            visibility: ""
                        }), a.css({display: "", visibility: ""}), "accordion" === t) o.each(function (t, i) {
                        e(i).appendTo(a.get(t)).addClass("accordion-content").attr("data-tab-content", "").removeClass("is-active").css({height: ""}), e("[data-tabs-content=" + n.$element.attr("id") + "]").after('<div id="tabs-placeholder-' + n.$element.attr("id") + '"></div>').remove(), a.addClass("accordion-item").attr("data-accordion-item", ""), l.addClass("accordion-title")
                    }); else if ("tabs" === t) {
                        var u = e("[data-tabs-content=" + n.$element.attr("id") + "]"),
                            d = e("#tabs-placeholder-" + n.$element.attr("id"));
                        d.length ? (u = e('<div class="tabs-content"></div>').insertAfter(d).attr("data-tabs-content", n.$element.attr("id")), d.remove()) : u = e('<div class="tabs-content"></div>').insertAfter(n.$element).attr("data-tabs-content", n.$element.attr("id")), o.each(function (t, n) {
                            var i = e(n).appendTo(u).addClass(r), o = l.get(t).hash.slice(1),
                                s = e(n).attr("id") || Foundation.GetYoDigits(6, "accordion");
                            o !== s && ("" !== o ? e(n).attr("id", o) : (o = s, e(n).attr("id", o), e(l.get(t)).attr("href", e(l.get(t)).attr("href").replace("#", "") + "#" + o)));
                            var d = e(a.get(t)).hasClass("is-active");
                            d && i.addClass("is-active")
                        }), a.addClass(s)
                    }
                }
            }
        }, {
            key: "destroy", value: function () {
                this.currentPlugin && this.currentPlugin.destroy(), e(window).off(".zf.ResponsiveAccordionTabs"), Foundation.unregisterPlugin(this)
            }
        }]), t
    }();
    t.defaults = {};
    var n = {
        tabs: {cssClass: "tabs", plugin: Foundation._plugins.tabs || null},
        accordion: {cssClass: "accordion", plugin: Foundation._plugins.accordion || null}
    };
    Foundation.plugin(t, "ResponsiveAccordionTabs")
}(jQuery), function () {
    var e, t, n, i, o, s, r, a, l = [].slice, u = {}.hasOwnProperty, d = function (e, t) {
        function n() {
            this.constructor = e
        }

        for (var i in t)u.call(t, i) && (e[i] = t[i]);
        return n.prototype = t.prototype, e.prototype = new n, e.__super__ = t.prototype, e
    };
    r = function () {
    }, t = function () {
        function e() {
        }

        return e.prototype.addEventListener = e.prototype.on, e.prototype.on = function (e, t) {
            return this._callbacks = this._callbacks || {}, this._callbacks[e] || (this._callbacks[e] = []), this._callbacks[e].push(t), this
        }, e.prototype.emit = function () {
            var e, t, n, i, o, s;
            if (i = arguments[0], e = 2 <= arguments.length ? l.call(arguments, 1) : [], this._callbacks = this._callbacks || {}, n = this._callbacks[i])for (o = 0, s = n.length; o < s; o++)t = n[o], t.apply(this, e);
            return this
        }, e.prototype.removeListener = e.prototype.off, e.prototype.removeAllListeners = e.prototype.off, e.prototype.removeEventListener = e.prototype.off, e.prototype.off = function (e, t) {
            var n, i, o, s, r;
            if (!this._callbacks || 0 === arguments.length)return this._callbacks = {}, this;
            if (i = this._callbacks[e], !i)return this;
            if (1 === arguments.length)return delete this._callbacks[e], this;
            for (o = s = 0, r = i.length; s < r; o = ++s)if (n = i[o], n === t) {
                i.splice(o, 1);
                break
            }
            return this
        }, e
    }(), e = function (e) {
        function n(e, t) {
            var o, s, r;
            if (this.element = e, this.version = n.version, this.defaultOptions.previewTemplate = this.defaultOptions.previewTemplate.replace(/\n*/g, ""), this.clickableElements = [], this.listeners = [], this.files = [], "string" == typeof this.element && (this.element = document.querySelector(this.element)), !this.element || null == this.element.nodeType)throw new Error("Invalid dropzone element.");
            if (this.element.dropzone)throw new Error("Dropzone already attached.");
            if (n.instances.push(this), this.element.dropzone = this, o = null != (r = n.optionsForElement(this.element)) ? r : {}, this.options = i({}, this.defaultOptions, o, null != t ? t : {}), this.options.forceFallback || !n.isBrowserSupported())return this.options.fallback.call(this);
            if (null == this.options.url && (this.options.url = this.element.getAttribute("action")), !this.options.url)throw new Error("No URL provided.");
            if (this.options.acceptedFiles && this.options.acceptedMimeTypes)throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
            this.options.acceptedMimeTypes && (this.options.acceptedFiles = this.options.acceptedMimeTypes, delete this.options.acceptedMimeTypes), this.options.method = this.options.method.toUpperCase(), (s = this.getExistingFallback()) && s.parentNode && s.parentNode.removeChild(s), this.options.previewsContainer !== !1 && (this.options.previewsContainer ? this.previewsContainer = n.getElement(this.options.previewsContainer, "previewsContainer") : this.previewsContainer = this.element), this.options.clickable && (this.options.clickable === !0 ? this.clickableElements = [this.element] : this.clickableElements = n.getElements(this.options.clickable, "clickable")), this.init()
        }

        var i, o;
        return d(n, e), n.prototype.Emitter = t, n.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "addedfiles", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached", "queuecomplete"], n.prototype.defaultOptions = {
            url: null,
            method: "post",
            withCredentials: !1,
            parallelUploads: 2,
            uploadMultiple: !1,
            maxFilesize: 256,
            paramName: "file",
            createImageThumbnails: !0,
            maxThumbnailFilesize: 10,
            thumbnailWidth: 120,
            thumbnailHeight: 120,
            filesizeBase: 1e3,
            maxFiles: null,
            params: {},
            clickable: !0,
            ignoreHiddenFiles: !0,
            acceptedFiles: null,
            acceptedMimeTypes: null,
            autoProcessQueue: !0,
            autoQueue: !0,
            addRemoveLinks: !1,
            previewsContainer: null,
            hiddenInputContainer: "body",
            capture: null,
            renameFilename: null,
            dictDefaultMessage: "Drop files here to upload",
            dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
            dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
            dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
            dictInvalidFileType: "You can't upload files of this type.",
            dictResponseError: "Server responded with {{statusCode}} code.",
            dictCancelUpload: "Cancel upload",
            dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
            dictRemoveFile: "Remove file",
            dictRemoveFileConfirmation: null,
            dictMaxFilesExceeded: "You can not upload any more files.",
            accept: function (e, t) {
                return t()
            },
            init: function () {
                return r
            },
            forceFallback: !1,
            fallback: function () {
                var e, t, i, o, s, r;
                for (this.element.className = "" + this.element.className + " dz-browser-not-supported", r = this.element.getElementsByTagName("div"), o = 0, s = r.length; o < s; o++)e = r[o], /(^| )dz-message($| )/.test(e.className) && (t = e, e.className = "dz-message");
                return t || (t = n.createElement('<div class="dz-message"><span></span></div>'), this.element.appendChild(t)), i = t.getElementsByTagName("span")[0], i && (null != i.textContent ? i.textContent = this.options.dictFallbackMessage : null != i.innerText && (i.innerText = this.options.dictFallbackMessage)), this.element.appendChild(this.getFallbackForm())
            },
            resize: function (e) {
                var t, n, i;
                return t = {
                    srcX: 0,
                    srcY: 0,
                    srcWidth: e.width,
                    srcHeight: e.height
                }, n = e.width / e.height, t.optWidth = this.options.thumbnailWidth, t.optHeight = this.options.thumbnailHeight, null == t.optWidth && null == t.optHeight ? (t.optWidth = t.srcWidth, t.optHeight = t.srcHeight) : null == t.optWidth ? t.optWidth = n * t.optHeight : null == t.optHeight && (t.optHeight = 1 / n * t.optWidth), i = t.optWidth / t.optHeight, e.height < t.optHeight || e.width < t.optWidth ? (t.trgHeight = t.srcHeight, t.trgWidth = t.srcWidth) : n > i ? (t.srcHeight = e.height, t.srcWidth = t.srcHeight * i) : (t.srcWidth = e.width, t.srcHeight = t.srcWidth / i), t.srcX = (e.width - t.srcWidth) / 2, t.srcY = (e.height - t.srcHeight) / 2, t
            },
            drop: function (e) {
                return this.element.classList.remove("dz-drag-hover")
            },
            dragstart: r,
            dragend: function (e) {
                return this.element.classList.remove("dz-drag-hover")
            },
            dragenter: function (e) {
                return this.element.classList.add("dz-drag-hover")
            },
            dragover: function (e) {
                return this.element.classList.add("dz-drag-hover")
            },
            dragleave: function (e) {
                return this.element.classList.remove("dz-drag-hover")
            },
            paste: r,
            reset: function () {
                return this.element.classList.remove("dz-started")
            },
            addedfile: function (e) {
                var t, i, o, s, r, a, l, u, d, c, h, f, p;
                if (this.element === this.previewsContainer && this.element.classList.add("dz-started"), this.previewsContainer) {
                    for (e.previewElement = n.createElement(this.options.previewTemplate.trim()), e.previewTemplate = e.previewElement, this.previewsContainer.appendChild(e.previewElement), c = e.previewElement.querySelectorAll("[data-dz-name]"), s = 0, l = c.length; s < l; s++)t = c[s], t.textContent = this._renameFilename(e.name);
                    for (h = e.previewElement.querySelectorAll("[data-dz-size]"), r = 0, u = h.length; r < u; r++)t = h[r], t.innerHTML = this.filesize(e.size);
                    for (this.options.addRemoveLinks && (e._removeLink = n.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>' + this.options.dictRemoveFile + "</a>"), e.previewElement.appendChild(e._removeLink)), i = function (t) {
                        return function (i) {
                            return i.preventDefault(), i.stopPropagation(), e.status === n.UPLOADING ? n.confirm(t.options.dictCancelUploadConfirmation, function () {
                                return t.removeFile(e)
                            }) : t.options.dictRemoveFileConfirmation ? n.confirm(t.options.dictRemoveFileConfirmation, function () {
                                return t.removeFile(e)
                            }) : t.removeFile(e)
                        }
                    }(this), f = e.previewElement.querySelectorAll("[data-dz-remove]"), p = [], a = 0, d = f.length; a < d; a++)o = f[a], p.push(o.addEventListener("click", i));
                    return p
                }
            },
            removedfile: function (e) {
                var t;
                return e.previewElement && null != (t = e.previewElement) && t.parentNode.removeChild(e.previewElement), this._updateMaxFilesReachedClass()
            },
            thumbnail: function (e, t) {
                var n, i, o, s;
                if (e.previewElement) {
                    for (e.previewElement.classList.remove("dz-file-preview"), s = e.previewElement.querySelectorAll("[data-dz-thumbnail]"), i = 0, o = s.length; i < o; i++)n = s[i], n.alt = e.name, n.src = t;
                    return setTimeout(function (t) {
                        return function () {
                            return e.previewElement.classList.add("dz-image-preview")
                        }
                    }(this), 1)
                }
            },
            error: function (e, t) {
                var n, i, o, s, r;
                if (e.previewElement) {
                    for (e.previewElement.classList.add("dz-error"), "String" != typeof t && t.error && (t = t.error), s = e.previewElement.querySelectorAll("[data-dz-errormessage]"), r = [], i = 0, o = s.length; i < o; i++)n = s[i], r.push(n.textContent = t);
                    return r
                }
            },
            errormultiple: r,
            processing: function (e) {
                if (e.previewElement && (e.previewElement.classList.add("dz-processing"), e._removeLink))return e._removeLink.textContent = this.options.dictCancelUpload
            },
            processingmultiple: r,
            uploadprogress: function (e, t, n) {
                var i, o, s, r, a;
                if (e.previewElement) {
                    for (r = e.previewElement.querySelectorAll("[data-dz-uploadprogress]"), a = [], o = 0, s = r.length; o < s; o++)i = r[o], "PROGRESS" === i.nodeName ? a.push(i.value = t) : a.push(i.style.width = "" + t + "%");
                    return a
                }
            },
            totaluploadprogress: r,
            sending: r,
            sendingmultiple: r,
            success: function (e) {
                if (e.previewElement)return e.previewElement.classList.add("dz-success")
            },
            successmultiple: r,
            canceled: function (e) {
                return this.emit("error", e, "Upload canceled.")
            },
            canceledmultiple: r,
            complete: function (e) {
                if (e._removeLink && (e._removeLink.textContent = this.options.dictRemoveFile), e.previewElement)return e.previewElement.classList.add("dz-complete")
            },
            completemultiple: r,
            maxfilesexceeded: r,
            maxfilesreached: r,
            queuecomplete: r,
            addedfiles: r,
            previewTemplate: '<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><img data-dz-thumbnail /></div>\n  <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Check</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Error</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <g id="Check-+-Oval-2" sketch:type="MSLayerGroup" stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" sketch:type="MSShapeGroup"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>'
        }, i = function () {
            var e, t, n, i, o, s, r;
            for (i = arguments[0], n = 2 <= arguments.length ? l.call(arguments, 1) : [], s = 0, r = n.length; s < r; s++) {
                t = n[s];
                for (e in t)o = t[e], i[e] = o
            }
            return i
        }, n.prototype.getAcceptedFiles = function () {
            var e, t, n, i, o;
            for (i = this.files, o = [], t = 0, n = i.length; t < n; t++)e = i[t], e.accepted && o.push(e);
            return o
        }, n.prototype.getRejectedFiles = function () {
            var e, t, n, i, o;
            for (i = this.files, o = [], t = 0, n = i.length; t < n; t++)e = i[t], e.accepted || o.push(e);
            return o
        }, n.prototype.getFilesWithStatus = function (e) {
            var t, n, i, o, s;
            for (o = this.files, s = [], n = 0, i = o.length; n < i; n++)t = o[n], t.status === e && s.push(t);
            return s
        }, n.prototype.getQueuedFiles = function () {
            return this.getFilesWithStatus(n.QUEUED)
        }, n.prototype.getUploadingFiles = function () {
            return this.getFilesWithStatus(n.UPLOADING)
        }, n.prototype.getAddedFiles = function () {
            return this.getFilesWithStatus(n.ADDED)
        }, n.prototype.getActiveFiles = function () {
            var e, t, i, o, s;
            for (o = this.files, s = [], t = 0, i = o.length; t < i; t++)e = o[t], e.status !== n.UPLOADING && e.status !== n.QUEUED || s.push(e);
            return s
        }, n.prototype.init = function () {
            var e, t, i, o, s, r, a;
            for ("form" === this.element.tagName && this.element.setAttribute("enctype", "multipart/form-data"), this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message") && this.element.appendChild(n.createElement('<div class="dz-default dz-message"><span>' + this.options.dictDefaultMessage + "</span></div>")), this.clickableElements.length && (i = function (e) {
                return function () {
                    return e.hiddenFileInput && e.hiddenFileInput.parentNode.removeChild(e.hiddenFileInput), e.hiddenFileInput = document.createElement("input"), e.hiddenFileInput.setAttribute("type", "file"), (null == e.options.maxFiles || e.options.maxFiles > 1) && e.hiddenFileInput.setAttribute("multiple", "multiple"), e.hiddenFileInput.className = "dz-hidden-input", null != e.options.acceptedFiles && e.hiddenFileInput.setAttribute("accept", e.options.acceptedFiles), null != e.options.capture && e.hiddenFileInput.setAttribute("capture", e.options.capture), e.hiddenFileInput.style.visibility = "hidden", e.hiddenFileInput.style.position = "absolute", e.hiddenFileInput.style.top = "0", e.hiddenFileInput.style.left = "0", e.hiddenFileInput.style.height = "0", e.hiddenFileInput.style.width = "0", document.querySelector(e.options.hiddenInputContainer).appendChild(e.hiddenFileInput), e.hiddenFileInput.addEventListener("change", function () {
                        var t, n, o, s;
                        if (n = e.hiddenFileInput.files, n.length)for (o = 0, s = n.length; o < s; o++)t = n[o], e.addFile(t);
                        return e.emit("addedfiles", n), i()
                    })
                }
            }(this))(), this.URL = null != (r = window.URL) ? r : window.webkitURL, a = this.events, o = 0, s = a.length; o < s; o++)e = a[o], this.on(e, this.options[e]);
            return this.on("uploadprogress", function (e) {
                return function () {
                    return e.updateTotalUploadProgress()
                }
            }(this)), this.on("removedfile", function (e) {
                return function () {
                    return e.updateTotalUploadProgress()
                }
            }(this)), this.on("canceled", function (e) {
                return function (t) {
                    return e.emit("complete", t)
                }
            }(this)), this.on("complete", function (e) {
                return function (t) {
                    if (0 === e.getAddedFiles().length && 0 === e.getUploadingFiles().length && 0 === e.getQueuedFiles().length)return setTimeout(function () {
                        return e.emit("queuecomplete")
                    }, 0)
                }
            }(this)), t = function (e) {
                return e.stopPropagation(), e.preventDefault ? e.preventDefault() : e.returnValue = !1
            }, this.listeners = [{
                element: this.element, events: {
                    dragstart: function (e) {
                        return function (t) {
                            return e.emit("dragstart", t)
                        }
                    }(this), dragenter: function (e) {
                        return function (n) {
                            return t(n), e.emit("dragenter", n)
                        }
                    }(this), dragover: function (e) {
                        return function (n) {
                            var i;
                            try {
                                i = n.dataTransfer.effectAllowed
                            } catch (o) {
                            }
                            return n.dataTransfer.dropEffect = "move" === i || "linkMove" === i ? "move" : "copy", t(n), e.emit("dragover", n)
                        }
                    }(this), dragleave: function (e) {
                        return function (t) {
                            return e.emit("dragleave", t)
                        }
                    }(this), drop: function (e) {
                        return function (n) {
                            return t(n), e.drop(n)
                        }
                    }(this), dragend: function (e) {
                        return function (t) {
                            return e.emit("dragend", t)
                        }
                    }(this)
                }
            }], this.clickableElements.forEach(function (e) {
                return function (t) {
                    return e.listeners.push({
                        element: t, events: {
                            click: function (i) {
                                return (t !== e.element || i.target === e.element || n.elementInside(i.target, e.element.querySelector(".dz-message"))) && e.hiddenFileInput.click(), !0
                            }
                        }
                    })
                }
            }(this)), this.enable(), this.options.init.call(this)
        }, n.prototype.destroy = function () {
            var e;
            return this.disable(), this.removeAllFiles(!0), (null != (e = this.hiddenFileInput) ? e.parentNode : void 0) && (this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput), this.hiddenFileInput = null), delete this.element.dropzone, n.instances.splice(n.instances.indexOf(this), 1)
        }, n.prototype.updateTotalUploadProgress = function () {
            var e, t, n, i, o, s, r, a;
            if (i = 0, n = 0, e = this.getActiveFiles(), e.length) {
                for (a = this.getActiveFiles(), s = 0, r = a.length; s < r; s++)t = a[s], i += t.upload.bytesSent, n += t.upload.total;
                o = 100 * i / n
            } else o = 100;
            return this.emit("totaluploadprogress", o, n, i)
        }, n.prototype._getParamName = function (e) {
            return "function" == typeof this.options.paramName ? this.options.paramName(e) : "" + this.options.paramName + (this.options.uploadMultiple ? "[" + e + "]" : "")
        }, n.prototype._renameFilename = function (e) {
            return "function" != typeof this.options.renameFilename ? e : this.options.renameFilename(e)
        }, n.prototype.getFallbackForm = function () {
            var e, t, i, o;
            return (e = this.getExistingFallback()) ? e : (i = '<div class="dz-fallback">', this.options.dictFallbackText && (i += "<p>" + this.options.dictFallbackText + "</p>"), i += '<input type="file" name="' + this._getParamName(0) + '" ' + (this.options.uploadMultiple ? 'multiple="multiple"' : void 0) + ' /><input type="submit" value="Upload!"></div>', t = n.createElement(i), "FORM" !== this.element.tagName ? (o = n.createElement('<form action="' + this.options.url + '" enctype="multipart/form-data" method="' + this.options.method + '"></form>'), o.appendChild(t)) : (this.element.setAttribute("enctype", "multipart/form-data"), this.element.setAttribute("method", this.options.method)), null != o ? o : t)
        }, n.prototype.getExistingFallback = function () {
            var e, t, n, i, o, s;
            for (t = function (e) {
                var t, n, i;
                for (n = 0, i = e.length; n < i; n++)if (t = e[n], /(^| )fallback($| )/.test(t.className))return t
            }, s = ["div", "form"], i = 0, o = s.length; i < o; i++)if (n = s[i], e = t(this.element.getElementsByTagName(n)))return e
        }, n.prototype.setupEventListeners = function () {
            var e, t, n, i, o, s, r;
            for (s = this.listeners, r = [], i = 0, o = s.length; i < o; i++)e = s[i], r.push(function () {
                var i, o;
                i = e.events, o = [];
                for (t in i)n = i[t], o.push(e.element.addEventListener(t, n, !1));
                return o
            }());
            return r
        }, n.prototype.removeEventListeners = function () {
            var e, t, n, i, o, s, r;
            for (s = this.listeners, r = [], i = 0, o = s.length; i < o; i++)e = s[i], r.push(function () {
                var i, o;
                i = e.events, o = [];
                for (t in i)n = i[t], o.push(e.element.removeEventListener(t, n, !1));
                return o
            }());
            return r
        }, n.prototype.disable = function () {
            var e, t, n, i, o;
            for (this.clickableElements.forEach(function (e) {
                return e.classList.remove("dz-clickable")
            }), this.removeEventListeners(), i = this.files, o = [], t = 0, n = i.length; t < n; t++)e = i[t], o.push(this.cancelUpload(e));
            return o
        }, n.prototype.enable = function () {
            return this.clickableElements.forEach(function (e) {
                return e.classList.add("dz-clickable")
            }), this.setupEventListeners()
        }, n.prototype.filesize = function (e) {
            var t, n, i, o, s, r, a, l;
            if (i = 0, o = "b", e > 0) {
                for (r = ["TB", "GB", "MB", "KB", "b"], n = a = 0, l = r.length; a < l; n = ++a)if (s = r[n], t = Math.pow(this.options.filesizeBase, 4 - n) / 10, e >= t) {
                    i = e / Math.pow(this.options.filesizeBase, 4 - n), o = s;
                    break
                }
                i = Math.round(10 * i) / 10
            }
            return "<strong>" + i + "</strong> " + o
        }, n.prototype._updateMaxFilesReachedClass = function () {
            return null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (this.getAcceptedFiles().length === this.options.maxFiles && this.emit("maxfilesreached", this.files), this.element.classList.add("dz-max-files-reached")) : this.element.classList.remove("dz-max-files-reached")
        }, n.prototype.drop = function (e) {
            var t, n;
            e.dataTransfer && (this.emit("drop", e), t = e.dataTransfer.files, this.emit("addedfiles", t), t.length && (n = e.dataTransfer.items, n && n.length && null != n[0].webkitGetAsEntry ? this._addFilesFromItems(n) : this.handleFiles(t)))
        }, n.prototype.paste = function (e) {
            var t, n;
            if (null != (null != e && null != (n = e.clipboardData) ? n.items : void 0))return this.emit("paste", e), t = e.clipboardData.items, t.length ? this._addFilesFromItems(t) : void 0
        }, n.prototype.handleFiles = function (e) {
            var t, n, i, o;
            for (o = [], n = 0, i = e.length; n < i; n++)t = e[n], o.push(this.addFile(t));
            return o
        }, n.prototype._addFilesFromItems = function (e) {
            var t, n, i, o, s;
            for (s = [], i = 0, o = e.length; i < o; i++)n = e[i], null != n.webkitGetAsEntry && (t = n.webkitGetAsEntry()) ? t.isFile ? s.push(this.addFile(n.getAsFile())) : t.isDirectory ? s.push(this._addFilesFromDirectory(t, t.name)) : s.push(void 0) : null != n.getAsFile && (null == n.kind || "file" === n.kind) ? s.push(this.addFile(n.getAsFile())) : s.push(void 0);
            return s
        }, n.prototype._addFilesFromDirectory = function (e, t) {
            var n, i, o;
            return n = e.createReader(), i = function (e) {
                return "undefined" != typeof console && null !== console && "function" == typeof console.log ? console.log(e) : void 0
            }, (o = function (e) {
                return function () {
                    return n.readEntries(function (n) {
                        var i, s, r;
                        if (n.length > 0) {
                            for (s = 0, r = n.length; s < r; s++)i = n[s], i.isFile ? i.file(function (n) {
                                if (!e.options.ignoreHiddenFiles || "." !== n.name.substring(0, 1))return n.fullPath = "" + t + "/" + n.name, e.addFile(n)
                            }) : i.isDirectory && e._addFilesFromDirectory(i, "" + t + "/" + i.name);
                            o()
                        }
                        return null
                    }, i)
                }
            }(this))()
        }, n.prototype.accept = function (e, t) {
            return e.size > 1024 * this.options.maxFilesize * 1024 ? t(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(e.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize)) : n.isValidFile(e, this.options.acceptedFiles) ? null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (t(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles)), this.emit("maxfilesexceeded", e)) : this.options.accept.call(this, e, t) : t(this.options.dictInvalidFileType)
        }, n.prototype.addFile = function (e) {
            return e.upload = {
                progress: 0,
                total: e.size,
                bytesSent: 0
            }, this.files.push(e), e.status = n.ADDED, this.emit("addedfile", e), this._enqueueThumbnail(e), this.accept(e, function (t) {
                return function (n) {
                    return n ? (e.accepted = !1, t._errorProcessing([e], n)) : (e.accepted = !0, t.options.autoQueue && t.enqueueFile(e)), t._updateMaxFilesReachedClass()
                }
            }(this))
        }, n.prototype.enqueueFiles = function (e) {
            var t, n, i;
            for (n = 0, i = e.length; n < i; n++)t = e[n], this.enqueueFile(t);
            return null
        }, n.prototype.enqueueFile = function (e) {
            if (e.status !== n.ADDED || e.accepted !== !0)throw new Error("This file can't be queued because it has already been processed or was rejected.");
            if (e.status = n.QUEUED, this.options.autoProcessQueue)return setTimeout(function (e) {
                return function () {
                    return e.processQueue()
                }
            }(this), 0)
        }, n.prototype._thumbnailQueue = [], n.prototype._processingThumbnail = !1, n.prototype._enqueueThumbnail = function (e) {
            if (this.options.createImageThumbnails && e.type.match(/image.*/) && e.size <= 1024 * this.options.maxThumbnailFilesize * 1024)return this._thumbnailQueue.push(e), setTimeout(function (e) {
                return function () {
                    return e._processThumbnailQueue()
                }
            }(this), 0)
        }, n.prototype._processThumbnailQueue = function () {
            if (!this._processingThumbnail && 0 !== this._thumbnailQueue.length)return this._processingThumbnail = !0, this.createThumbnail(this._thumbnailQueue.shift(), function (e) {
                return function () {
                    return e._processingThumbnail = !1, e._processThumbnailQueue()
                }
            }(this))
        }, n.prototype.removeFile = function (e) {
            if (e.status === n.UPLOADING && this.cancelUpload(e), this.files = a(this.files, e), this.emit("removedfile", e), 0 === this.files.length)return this.emit("reset")
        }, n.prototype.removeAllFiles = function (e) {
            var t, i, o, s;
            for (null == e && (e = !1), s = this.files.slice(), i = 0, o = s.length; i < o; i++)t = s[i], (t.status !== n.UPLOADING || e) && this.removeFile(t);
            return null
        }, n.prototype.createThumbnail = function (e, t) {
            var n;
            return n = new FileReader, n.onload = function (i) {
                return function () {
                    return "image/svg+xml" === e.type ? (i.emit("thumbnail", e, n.result), void(null != t && t())) : i.createThumbnailFromUrl(e, n.result, t)
                }
            }(this), n.readAsDataURL(e)
        }, n.prototype.createThumbnailFromUrl = function (e, t, n, i) {
            var o;
            return o = document.createElement("img"), i && (o.crossOrigin = i), o.onload = function (t) {
                return function () {
                    var i, r, a, l, u, d, c, h;
                    if (e.width = o.width, e.height = o.height, a = t.options.resize.call(t, e), null == a.trgWidth && (a.trgWidth = a.optWidth), null == a.trgHeight && (a.trgHeight = a.optHeight), i = document.createElement("canvas"), r = i.getContext("2d"), i.width = a.trgWidth, i.height = a.trgHeight, s(r, o, null != (u = a.srcX) ? u : 0, null != (d = a.srcY) ? d : 0, a.srcWidth, a.srcHeight, null != (c = a.trgX) ? c : 0, null != (h = a.trgY) ? h : 0, a.trgWidth, a.trgHeight), l = i.toDataURL("image/png"), t.emit("thumbnail", e, l), null != n)return n()
                }
            }(this), null != n && (o.onerror = n), o.src = t
        }, n.prototype.processQueue = function () {
            var e, t, n, i;
            if (t = this.options.parallelUploads, n = this.getUploadingFiles().length, e = n, !(n >= t) && (i = this.getQueuedFiles(), i.length > 0)) {
                if (this.options.uploadMultiple)return this.processFiles(i.slice(0, t - n));
                for (; e < t;) {
                    if (!i.length)return;
                    this.processFile(i.shift()), e++
                }
            }
        }, n.prototype.processFile = function (e) {
            return this.processFiles([e])
        }, n.prototype.processFiles = function (e) {
            var t, i, o;
            for (i = 0, o = e.length; i < o; i++)t = e[i], t.processing = !0, t.status = n.UPLOADING, this.emit("processing", t);
            return this.options.uploadMultiple && this.emit("processingmultiple", e), this.uploadFiles(e)
        }, n.prototype._getFilesWithXhr = function (e) {
            var t, n;
            return n = function () {
                var n, i, o, s;
                for (o = this.files, s = [], n = 0, i = o.length; n < i; n++)t = o[n], t.xhr === e && s.push(t);
                return s
            }.call(this)
        }, n.prototype.cancelUpload = function (e) {
            var t, i, o, s, r, a, l;
            if (e.status === n.UPLOADING) {
                for (i = this._getFilesWithXhr(e.xhr), o = 0, r = i.length; o < r; o++)t = i[o], t.status = n.CANCELED;
                for (e.xhr.abort(), s = 0, a = i.length; s < a; s++)t = i[s], this.emit("canceled", t);
                this.options.uploadMultiple && this.emit("canceledmultiple", i)
            } else(l = e.status) !== n.ADDED && l !== n.QUEUED || (e.status = n.CANCELED, this.emit("canceled", e), this.options.uploadMultiple && this.emit("canceledmultiple", [e]));
            if (this.options.autoProcessQueue)return this.processQueue()
        }, o = function () {
            var e, t;
            return t = arguments[0], e = 2 <= arguments.length ? l.call(arguments, 1) : [], "function" == typeof t ? t.apply(this, e) : t
        }, n.prototype.uploadFile = function (e) {
            return this.uploadFiles([e])
        }, n.prototype.uploadFiles = function (e) {
            var t, s, r, a, l, u, d, c, h, f, p, m, g, v, y, b, w, C, k, $, x, F, _, T, z, E, A, O, S, D, P, L, H, R;
            for (k = new XMLHttpRequest, $ = 0, T = e.length; $ < T; $++)t = e[$], t.xhr = k;
            m = o(this.options.method, e), w = o(this.options.url, e), k.open(m, w, !0), k.withCredentials = !!this.options.withCredentials, y = null, r = function (n) {
                return function () {
                    var i, o, s;
                    for (s = [], i = 0, o = e.length; i < o; i++)t = e[i], s.push(n._errorProcessing(e, y || n.options.dictResponseError.replace("{{statusCode}}", k.status), k));
                    return s
                }
            }(this), b = function (n) {
                return function (i) {
                    var o, s, r, a, l, u, d, c, h;
                    if (null != i)for (s = 100 * i.loaded / i.total, r = 0, u = e.length; r < u; r++)t = e[r], t.upload = {
                        progress: s,
                        total: i.total,
                        bytesSent: i.loaded
                    }; else {
                        for (o = !0, s = 100, a = 0, d = e.length; a < d; a++)t = e[a], 100 === t.upload.progress && t.upload.bytesSent === t.upload.total || (o = !1), t.upload.progress = s, t.upload.bytesSent = t.upload.total;
                        if (o)return
                    }
                    for (h = [], l = 0, c = e.length; l < c; l++)t = e[l], h.push(n.emit("uploadprogress", t, s, t.upload.bytesSent));
                    return h
                }
            }(this), k.onload = function (t) {
                return function (i) {
                    var o;
                    if (e[0].status !== n.CANCELED && 4 === k.readyState) {
                        if (y = k.responseText, k.getResponseHeader("content-type") && ~k.getResponseHeader("content-type").indexOf("application/json"))try {
                            y = JSON.parse(y)
                        } catch (s) {
                            i = s, y = "Invalid JSON response from server."
                        }
                        return b(), 200 <= (o = k.status) && o < 300 ? t._finished(e, y, i) : r()
                    }
                }
            }(this), k.onerror = function (t) {
                return function () {
                    if (e[0].status !== n.CANCELED)return r()
                }
            }(this), v = null != (S = k.upload) ? S : k, v.onprogress = b, u = {
                Accept: "application/json",
                "Cache-Control": "no-cache",
                "X-Requested-With": "XMLHttpRequest"
            }, this.options.headers && i(u, this.options.headers);
            for (a in u)l = u[a], l && k.setRequestHeader(a, l);
            if (s = new FormData, this.options.params) {
                D = this.options.params;
                for (p in D)C = D[p], s.append(p, C)
            }
            for (x = 0, z = e.length; x < z; x++)t = e[x], this.emit("sending", t, k, s);
            if (this.options.uploadMultiple && this.emit("sendingmultiple", e, k, s), "FORM" === this.element.tagName)for (P = this.element.querySelectorAll("input, textarea, select, button"), F = 0, E = P.length; F < E; F++)if (c = P[F], h = c.getAttribute("name"), f = c.getAttribute("type"), "SELECT" === c.tagName && c.hasAttribute("multiple"))for (L = c.options, _ = 0, A = L.length; _ < A; _++)g = L[_], g.selected && s.append(h, g.value); else(!f || "checkbox" !== (H = f.toLowerCase()) && "radio" !== H || c.checked) && s.append(h, c.value);
            for (d = O = 0, R = e.length - 1; 0 <= R ? O <= R : O >= R; d = 0 <= R ? ++O : --O)s.append(this._getParamName(d), e[d], this._renameFilename(e[d].name));
            return this.submitRequest(k, s, e)
        }, n.prototype.submitRequest = function (e, t, n) {
            return e.send(t)
        }, n.prototype._finished = function (e, t, i) {
            var o, s, r;
            for (s = 0, r = e.length; s < r; s++)o = e[s], o.status = n.SUCCESS, this.emit("success", o, t, i), this.emit("complete", o);
            if (this.options.uploadMultiple && (this.emit("successmultiple", e, t, i), this.emit("completemultiple", e)), this.options.autoProcessQueue)return this.processQueue()
        }, n.prototype._errorProcessing = function (e, t, i) {
            var o, s, r;
            for (s = 0, r = e.length; s < r; s++)o = e[s], o.status = n.ERROR, this.emit("error", o, t, i), this.emit("complete", o);
            if (this.options.uploadMultiple && (this.emit("errormultiple", e, t, i), this.emit("completemultiple", e)), this.options.autoProcessQueue)return this.processQueue()
        }, n
    }(t), e.version = "4.3.0", e.options = {}, e.optionsForElement = function (t) {
        return t.getAttribute("id") ? e.options[n(t.getAttribute("id"))] : void 0
    }, e.instances = [], e.forElement = function (e) {
        if ("string" == typeof e && (e = document.querySelector(e)), null == (null != e ? e.dropzone : void 0))throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
        return e.dropzone
    }, e.autoDiscover = !0, e.discover = function () {
        var t, n, i, o, s, r;
        for (document.querySelectorAll ? i = document.querySelectorAll(".dropzone") : (i = [], t = function (e) {
            var t, n, o, s;
            for (s = [], n = 0, o = e.length; n < o; n++)t = e[n], /(^| )dropzone($| )/.test(t.className) ? s.push(i.push(t)) : s.push(void 0);
            return s
        }, t(document.getElementsByTagName("div")), t(document.getElementsByTagName("form"))), r = [], o = 0, s = i.length; o < s; o++)n = i[o], e.optionsForElement(n) !== !1 ? r.push(new e(n)) : r.push(void 0);
        return r
    }, e.blacklistedBrowsers = [/opera.*Macintosh.*version\/12/i], e.isBrowserSupported = function () {
        var t, n, i, o, s;
        if (t = !0, window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector)if ("classList" in document.createElement("a"))for (s = e.blacklistedBrowsers, i = 0, o = s.length; i < o; i++)n = s[i], n.test(navigator.userAgent) && (t = !1); else t = !1; else t = !1;
        return t
    }, a = function (e, t) {
        var n, i, o, s;
        for (s = [], i = 0, o = e.length; i < o; i++)n = e[i], n !== t && s.push(n);
        return s
    }, n = function (e) {
        return e.replace(/[\-_](\w)/g, function (e) {
            return e.charAt(1).toUpperCase()
        })
    }, e.createElement = function (e) {
        var t;
        return t = document.createElement("div"), t.innerHTML = e, t.childNodes[0]
    }, e.elementInside = function (e, t) {
        if (e === t)return !0;
        for (; e = e.parentNode;)if (e === t)return !0;
        return !1
    }, e.getElement = function (e, t) {
        var n;
        if ("string" == typeof e ? n = document.querySelector(e) : null != e.nodeType && (n = e), null == n)throw new Error("Invalid `" + t + "` option provided. Please provide a CSS selector or a plain HTML element.");
        return n
    }, e.getElements = function (e, t) {
        var n, i, o, s, r, a, l, u;
        if (e instanceof Array) {
            o = [];
            try {
                for (s = 0, a = e.length; s < a; s++)i = e[s], o.push(this.getElement(i, t))
            } catch (d) {
                n = d, o = null
            }
        } else if ("string" == typeof e)for (o = [], u = document.querySelectorAll(e), r = 0, l = u.length; r < l; r++)i = u[r], o.push(i); else null != e.nodeType && (o = [e]);
        if (null == o || !o.length)throw new Error("Invalid `" + t + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
        return o
    }, e.confirm = function (e, t, n) {
        return window.confirm(e) ? t() : null != n ? n() : void 0
    }, e.isValidFile = function (e, t) {
        var n, i, o, s, r;
        if (!t)return !0;
        for (t = t.split(","), i = e.type, n = i.replace(/\/.*$/, ""), s = 0, r = t.length; s < r; s++)if (o = t[s], o = o.trim(), "." === o.charAt(0)) {
            if (e.name.toLowerCase().indexOf(o.toLowerCase(), e.name.length - o.length) !== -1)return !0
        } else if (/\/\*$/.test(o)) {
            if (n === o.replace(/\/.*$/, ""))return !0
        } else if (i === o)return !0;
        return !1
    }, "undefined" != typeof jQuery && null !== jQuery && (jQuery.fn.dropzone = function (t) {
        return this.each(function () {
            return new e(this, t)
        })
    }), "undefined" != typeof module && null !== module ? module.exports = e : window.Dropzone = e, e.ADDED = "added", e.QUEUED = "queued", e.ACCEPTED = e.QUEUED, e.UPLOADING = "uploading", e.PROCESSING = e.UPLOADING, e.CANCELED = "canceled", e.ERROR = "error", e.SUCCESS = "success", o = function (e) {
        var t, n, i, o, s, r, a, l, u, d;
        for (a = e.naturalWidth, r = e.naturalHeight, n = document.createElement("canvas"), n.width = 1, n.height = r, i = n.getContext("2d"), i.drawImage(e, 0, 0), o = i.getImageData(0, 0, 1, r).data, d = 0, s = r, l = r; l > d;)t = o[4 * (l - 1) + 3], 0 === t ? s = l : d = l, l = s + d >> 1;
        return u = l / r, 0 === u ? 1 : u
    }, s = function (e, t, n, i, s, r, a, l, u, d) {
        var c;
        return c = o(t), e.drawImage(t, n, i, s, r, a, l, u, d / c)
    }, i = function (e, t) {
        var n, i, o, s, r, a, l, u, d;
        if (o = !1, d = !0, i = e.document, u = i.documentElement, n = i.addEventListener ? "addEventListener" : "attachEvent", l = i.addEventListener ? "removeEventListener" : "detachEvent", a = i.addEventListener ? "" : "on", s = function (n) {
                if ("readystatechange" !== n.type || "complete" === i.readyState)return ("load" === n.type ? e : i)[l](a + n.type, s, !1), !o && (o = !0) ? t.call(e, n.type || n) : void 0
            }, r = function () {
                var e;
                try {
                    u.doScroll("left")
                } catch (t) {
                    return e = t, void setTimeout(r, 50)
                }
                return s("poll")
            }, "complete" !== i.readyState) {
            if (i.createEventObject && u.doScroll) {
                try {
                    d = !e.frameElement
                } catch (c) {
                }
                d && r()
            }
            return i[n](a + "DOMContentLoaded", s, !1), i[n](a + "readystatechange", s, !1), e[n](a + "load", s, !1)
        }
    }, e._autoDiscoverFunction = function () {
        if (e.autoDiscover)return e.discover()
    }, i(window, e._autoDiscoverFunction)
}.call(void 0), $(document).foundation(), $(function () {
    function e() {
        $(".filters").append('<div id="floatingBarsG"> <div class="blockG" id="rotateG_01"> </div> <div class="blockG" id="rotateG_02"> </div> <div class="blockG" id="rotateG_03"> </div> <div class="blockG" id="rotateG_04"> </div> <div class="blockG" id="rotateG_05"> </div> <div class="blockG" id="rotateG_06"> </div> <div class="blockG" id="rotateG_07"> </div> <div class="blockG" id="rotateG_08"> </div> </div>'), $(".summaries").css("opacity", "0.2").delay(1e3).queue(function () {
            $(".summaries .notebook-summary").shuffle(), $("#floatingBarsG").remove(), $(this).css("opacity", "1"), $(this).dequeue()
        })
    }

    Dropzone.autoDiscover = !1, $("#dZUploadNB").dropzone({
        url: "/upload",
        addRemoveLinks: !0
    }), $(".vote a").click(function (e) {
        var t = $(".vote .fi-like").hasClass("active"), n = $(".vote .fi-dislike").hasClass("active"),
            i = $(this).hasClass("fi-like"), o = $(this).siblings(".score"), s = $(".votes .count"),
            r = parseInt(o.text());
        $(this).hasClass("active") ? ($(".vote a").removeClass("active"), t ? (o.text(r - 1), s.text(r - 1)) : (o.text(r + 1), s.text(r + 1))) : ($(".vote a").removeClass("active"), $(this).addClass("active"), t ? (o.text(r - 2), s.text(r - 2)) : n ? (o.text(r + 2), s.text(r + 2)) : i ? (o.text(r + 1), s.text(r + 1)) : i || (o.text(r - 1), s.text(r - 1)), e.preventDefault())
    }), $(".filters select").change(function () {
        e()
    }), $.fn.shuffle = function () {
        var e = this.get(), t = function (e) {
            return Math.floor(Math.random() * e)
        }, n = $.map(e, function () {
            var n = t(e.length), i = $(e[n]).clone(!0)[0];
            return e.splice(n, 1), i
        });
        return this.each(function (e) {
            $(this).replaceWith($(n[e]))
        }), $(n)
    }, $(".search-toggle a").click(function (e) {
        $(".filter-inputs").hide(), $(".search-toggle").hide(), $(".search-field").show(), $("#search-keywords").focus(), e.preventDefault()
    }), $(".search-hide").click(function (e) {
        $(".filter-inputs").show(), $(".search-field").hide(), $(".search-toggle").show(), e.preventDefault()
    })
});