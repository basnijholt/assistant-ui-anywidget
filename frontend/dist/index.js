import * as C from "react";
import ke, { useState as Oe, useEffect as hr } from "react";
import yr from "react-dom";
var Q = { exports: {} }, W = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var we;
function br() {
  if (we) return W;
  we = 1;
  var s = ke, f = Symbol.for("react.element"), E = Symbol.for("react.fragment"), b = Object.prototype.hasOwnProperty, h = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, d = { key: !0, ref: !0, __self: !0, __source: !0 };
  function R(O, v, k) {
    var m, x = {}, w = null, L = null;
    k !== void 0 && (w = "" + k), v.key !== void 0 && (w = "" + v.key), v.ref !== void 0 && (L = v.ref);
    for (m in v) b.call(v, m) && !d.hasOwnProperty(m) && (x[m] = v[m]);
    if (O && O.defaultProps) for (m in v = O.defaultProps, v) x[m] === void 0 && (x[m] = v[m]);
    return { $$typeof: f, type: O, key: w, ref: L, props: x, _owner: h.current };
  }
  return W.Fragment = E, W.jsx = R, W.jsxs = R, W;
}
var Y = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pe;
function mr() {
  return Pe || (Pe = 1, process.env.NODE_ENV !== "production" && function() {
    var s = ke, f = Symbol.for("react.element"), E = Symbol.for("react.portal"), b = Symbol.for("react.fragment"), h = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), R = Symbol.for("react.provider"), O = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), x = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), L = Symbol.for("react.offscreen"), re = Symbol.iterator, Fe = "@@iterator";
    function Ae(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = re && e[re] || e[Fe];
      return typeof r == "function" ? r : null;
    }
    var D = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function p(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        Ie("error", e, t);
      }
    }
    function Ie(e, r, t) {
      {
        var n = D.ReactDebugCurrentFrame, i = n.getStackAddendum();
        i !== "" && (r += "%s", t = t.concat([i]));
        var u = t.map(function(o) {
          return String(o);
        });
        u.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, u);
      }
    }
    var $e = !1, We = !1, Ye = !1, Le = !1, Me = !1, te;
    te = Symbol.for("react.module.reference");
    function Ve(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === b || e === d || Me || e === h || e === k || e === m || Le || e === L || $e || We || Ye || typeof e == "object" && e !== null && (e.$$typeof === w || e.$$typeof === x || e.$$typeof === R || e.$$typeof === O || e.$$typeof === v || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === te || e.getModuleId !== void 0));
    }
    function Ne(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var i = r.displayName || r.name || "";
      return i !== "" ? t + "(" + i + ")" : t;
    }
    function ne(e) {
      return e.displayName || "Context";
    }
    function S(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && p("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case b:
          return "Fragment";
        case E:
          return "Portal";
        case d:
          return "Profiler";
        case h:
          return "StrictMode";
        case k:
          return "Suspense";
        case m:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case O:
            var r = e;
            return ne(r) + ".Consumer";
          case R:
            var t = e;
            return ne(t._context) + ".Provider";
          case v:
            return Ne(e, e.render, "ForwardRef");
          case x:
            var n = e.displayName || null;
            return n !== null ? n : S(e.type) || "Memo";
          case w: {
            var i = e, u = i._payload, o = i._init;
            try {
              return S(o(u));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var P = Object.assign, I = 0, ae, oe, ie, ue, se, le, fe;
    function ce() {
    }
    ce.__reactDisabledLog = !0;
    function Ue() {
      {
        if (I === 0) {
          ae = console.log, oe = console.info, ie = console.warn, ue = console.error, se = console.group, le = console.groupCollapsed, fe = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ce,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        I++;
      }
    }
    function Be() {
      {
        if (I--, I === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: P({}, e, {
              value: ae
            }),
            info: P({}, e, {
              value: oe
            }),
            warn: P({}, e, {
              value: ie
            }),
            error: P({}, e, {
              value: ue
            }),
            group: P({}, e, {
              value: se
            }),
            groupCollapsed: P({}, e, {
              value: le
            }),
            groupEnd: P({}, e, {
              value: fe
            })
          });
        }
        I < 0 && p("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var J = D.ReactCurrentDispatcher, q;
    function M(e, r, t) {
      {
        if (q === void 0)
          try {
            throw Error();
          } catch (i) {
            var n = i.stack.trim().match(/\n( *(at )?)/);
            q = n && n[1] || "";
          }
        return `
` + q + e;
      }
    }
    var K = !1, V;
    {
      var Je = typeof WeakMap == "function" ? WeakMap : Map;
      V = new Je();
    }
    function de(e, r) {
      if (!e || K)
        return "";
      {
        var t = V.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      K = !0;
      var i = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var u;
      u = J.current, J.current = null, Ue();
      try {
        if (r) {
          var o = function() {
            throw Error();
          };
          if (Object.defineProperty(o.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(o, []);
            } catch (y) {
              n = y;
            }
            Reflect.construct(e, [], o);
          } else {
            try {
              o.call();
            } catch (y) {
              n = y;
            }
            e.call(o.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (y) {
            n = y;
          }
          e();
        }
      } catch (y) {
        if (y && n && typeof y.stack == "string") {
          for (var a = y.stack.split(`
`), g = n.stack.split(`
`), l = a.length - 1, c = g.length - 1; l >= 1 && c >= 0 && a[l] !== g[c]; )
            c--;
          for (; l >= 1 && c >= 0; l--, c--)
            if (a[l] !== g[c]) {
              if (l !== 1 || c !== 1)
                do
                  if (l--, c--, c < 0 || a[l] !== g[c]) {
                    var _ = `
` + a[l].replace(" at new ", " at ");
                    return e.displayName && _.includes("<anonymous>") && (_ = _.replace("<anonymous>", e.displayName)), typeof e == "function" && V.set(e, _), _;
                  }
                while (l >= 1 && c >= 0);
              break;
            }
        }
      } finally {
        K = !1, J.current = u, Be(), Error.prepareStackTrace = i;
      }
      var A = e ? e.displayName || e.name : "", j = A ? M(A) : "";
      return typeof e == "function" && V.set(e, j), j;
    }
    function qe(e, r, t) {
      return de(e, !1);
    }
    function Ke(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function N(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return de(e, Ke(e));
      if (typeof e == "string")
        return M(e);
      switch (e) {
        case k:
          return M("Suspense");
        case m:
          return M("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case v:
            return qe(e.render);
          case x:
            return N(e.type, r, t);
          case w: {
            var n = e, i = n._payload, u = n._init;
            try {
              return N(u(i), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var $ = Object.prototype.hasOwnProperty, ve = {}, pe = D.ReactDebugCurrentFrame;
    function U(e) {
      if (e) {
        var r = e._owner, t = N(e.type, e._source, r ? r.type : null);
        pe.setExtraStackFrame(t);
      } else
        pe.setExtraStackFrame(null);
    }
    function ze(e, r, t, n, i) {
      {
        var u = Function.call.bind($);
        for (var o in e)
          if (u(e, o)) {
            var a = void 0;
            try {
              if (typeof e[o] != "function") {
                var g = Error((n || "React class") + ": " + t + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw g.name = "Invariant Violation", g;
              }
              a = e[o](r, o, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (l) {
              a = l;
            }
            a && !(a instanceof Error) && (U(i), p("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, o, typeof a), U(null)), a instanceof Error && !(a.message in ve) && (ve[a.message] = !0, U(i), p("Failed %s type: %s", t, a.message), U(null));
          }
      }
    }
    var Ge = Array.isArray;
    function z(e) {
      return Ge(e);
    }
    function Xe(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function He(e) {
      try {
        return ge(e), !1;
      } catch {
        return !0;
      }
    }
    function ge(e) {
      return "" + e;
    }
    function he(e) {
      if (He(e))
        return p("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Xe(e)), ge(e);
    }
    var ye = D.ReactCurrentOwner, Ze = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, be, me;
    function Qe(e) {
      if ($.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function er(e) {
      if ($.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function rr(e, r) {
      typeof e.ref == "string" && ye.current;
    }
    function tr(e, r) {
      {
        var t = function() {
          be || (be = !0, p("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function nr(e, r) {
      {
        var t = function() {
          me || (me = !0, p("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var ar = function(e, r, t, n, i, u, o) {
      var a = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: f,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: o,
        // Record the component responsible for creating this element.
        _owner: u
      };
      return a._store = {}, Object.defineProperty(a._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(a, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(a, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: i
      }), Object.freeze && (Object.freeze(a.props), Object.freeze(a)), a;
    };
    function or(e, r, t, n, i) {
      {
        var u, o = {}, a = null, g = null;
        t !== void 0 && (he(t), a = "" + t), er(r) && (he(r.key), a = "" + r.key), Qe(r) && (g = r.ref, rr(r, i));
        for (u in r)
          $.call(r, u) && !Ze.hasOwnProperty(u) && (o[u] = r[u]);
        if (e && e.defaultProps) {
          var l = e.defaultProps;
          for (u in l)
            o[u] === void 0 && (o[u] = l[u]);
        }
        if (a || g) {
          var c = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          a && tr(o, c), g && nr(o, c);
        }
        return ar(e, a, g, i, n, ye.current, o);
      }
    }
    var G = D.ReactCurrentOwner, Ee = D.ReactDebugCurrentFrame;
    function F(e) {
      if (e) {
        var r = e._owner, t = N(e.type, e._source, r ? r.type : null);
        Ee.setExtraStackFrame(t);
      } else
        Ee.setExtraStackFrame(null);
    }
    var X;
    X = !1;
    function H(e) {
      return typeof e == "object" && e !== null && e.$$typeof === f;
    }
    function _e() {
      {
        if (G.current) {
          var e = S(G.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function ir(e) {
      return "";
    }
    var Re = {};
    function ur(e) {
      {
        var r = _e();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function xe(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = ur(r);
        if (Re[t])
          return;
        Re[t] = !0;
        var n = "";
        e && e._owner && e._owner !== G.current && (n = " It was passed a child from " + S(e._owner.type) + "."), F(e), p('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), F(null);
      }
    }
    function Se(e, r) {
      {
        if (typeof e != "object")
          return;
        if (z(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            H(n) && xe(n, r);
          }
        else if (H(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var i = Ae(e);
          if (typeof i == "function" && i !== e.entries)
            for (var u = i.call(e), o; !(o = u.next()).done; )
              H(o.value) && xe(o.value, r);
        }
      }
    }
    function sr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === v || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === x))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = S(r);
          ze(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !X) {
          X = !0;
          var i = S(r);
          p("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", i || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && p("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function lr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            F(e), p("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), F(null);
            break;
          }
        }
        e.ref !== null && (F(e), p("Invalid attribute `ref` supplied to `React.Fragment`."), F(null));
      }
    }
    var Te = {};
    function Ce(e, r, t, n, i, u) {
      {
        var o = Ve(e);
        if (!o) {
          var a = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (a += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var g = ir();
          g ? a += g : a += _e();
          var l;
          e === null ? l = "null" : z(e) ? l = "array" : e !== void 0 && e.$$typeof === f ? (l = "<" + (S(e.type) || "Unknown") + " />", a = " Did you accidentally export a JSX literal instead of a component?") : l = typeof e, p("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", l, a);
        }
        var c = or(e, r, t, i, u);
        if (c == null)
          return c;
        if (o) {
          var _ = r.children;
          if (_ !== void 0)
            if (n)
              if (z(_)) {
                for (var A = 0; A < _.length; A++)
                  Se(_[A], e);
                Object.freeze && Object.freeze(_);
              } else
                p("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Se(_, e);
        }
        if ($.call(r, "key")) {
          var j = S(e), y = Object.keys(r).filter(function(gr) {
            return gr !== "key";
          }), Z = y.length > 0 ? "{key: someKey, " + y.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Te[j + Z]) {
            var pr = y.length > 0 ? "{" + y.join(": ..., ") + ": ...}" : "{}";
            p(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Z, j, pr, j), Te[j + Z] = !0;
          }
        }
        return e === b ? lr(c) : sr(c), c;
      }
    }
    function fr(e, r, t) {
      return Ce(e, r, t, !0);
    }
    function cr(e, r, t) {
      return Ce(e, r, t, !1);
    }
    var dr = cr, vr = fr;
    Y.Fragment = b, Y.jsx = dr, Y.jsxs = vr;
  }()), Y;
}
process.env.NODE_ENV === "production" ? Q.exports = br() : Q.exports = mr();
var T = Q.exports, ee, B = yr;
if (process.env.NODE_ENV === "production")
  ee = B.createRoot, B.hydrateRoot;
else {
  var je = B.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  ee = function(s, f) {
    je.usingClientEntryPoint = !0;
    try {
      return B.createRoot(s, f);
    } finally {
      je.usingClientEntryPoint = !1;
    }
  };
}
let De = C.createContext(
  /** @type {any} */
  null
);
function Er() {
  let s = C.useContext(De);
  if (!s) throw new Error("RenderContext not found");
  return s;
}
function _r() {
  return Er().model;
}
function Rr(s) {
  let f = _r(), [E, b] = C.useState(f.get(s));
  return C.useEffect(() => {
    let h = () => b(f.get(s));
    return f.on(`change:${s}`, h), () => f.off(`change:${s}`, h);
  }, [f, s]), [
    E,
    (h) => {
      f.set(s, h), f.save_changes();
    }
  ];
}
function xr(s) {
  return ({ el: f, model: E, experimental: b }) => {
    let h = ee(f);
    return h.render(
      C.createElement(
        C.StrictMode,
        null,
        C.createElement(
          De.Provider,
          { value: { model: E, experimental: b } },
          C.createElement(s)
        )
      )
    ), () => h.unmount();
  };
}
function Sr() {
  const [s, f] = Oe([]), [E, b] = Oe("");
  Rr("message"), hr(() => {
    typeof model < "u" && model.on("msg:custom", (d) => {
      d.type === "assistant_message" && f((R) => [...R, { role: "assistant", content: d.text }]);
    });
  }, []);
  const h = (d) => {
    d.preventDefault(), E.trim() && (f((R) => [...R, { role: "user", content: E }]), typeof model < "u" && model.send({ type: "user_message", text: E }), b(""));
  };
  return /* @__PURE__ */ T.jsxs("div", { style: {
    width: "100%",
    height: "400px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    fontFamily: "system-ui, sans-serif"
  }, children: [
    /* @__PURE__ */ T.jsx("div", { style: {
      flex: 1,
      padding: "16px",
      overflowY: "auto",
      backgroundColor: "#f9f9f9"
    }, children: s.length === 0 ? /* @__PURE__ */ T.jsx("div", { style: { color: "#666", fontStyle: "italic" }, children: "Start a conversation..." }) : s.map((d, R) => /* @__PURE__ */ T.jsxs("div", { style: {
      marginBottom: "12px",
      padding: "8px 12px",
      backgroundColor: d.role === "user" ? "#007bff" : "#fff",
      color: d.role === "user" ? "white" : "black",
      borderRadius: "8px",
      alignSelf: d.role === "user" ? "flex-end" : "flex-start",
      maxWidth: "80%"
    }, children: [
      /* @__PURE__ */ T.jsxs("strong", { children: [
        d.role === "user" ? "You" : "Assistant",
        ":"
      ] }),
      " ",
      d.content
    ] }, R)) }),
    /* @__PURE__ */ T.jsxs("form", { onSubmit: h, style: {
      padding: "16px",
      borderTop: "1px solid #eee",
      display: "flex",
      gap: "8px"
    }, children: [
      /* @__PURE__ */ T.jsx(
        "input",
        {
          type: "text",
          value: E,
          onChange: (d) => b(d.target.value),
          placeholder: "Type a message...",
          style: {
            flex: 1,
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "14px"
          }
        }
      ),
      /* @__PURE__ */ T.jsx(
        "button",
        {
          type: "submit",
          style: {
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px"
          },
          children: "Send"
        }
      )
    ] })
  ] });
}
const Or = { render: xr(Sr) };
export {
  Or as default
};
