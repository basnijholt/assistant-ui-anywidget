var Bi = { exports: {} }, el = {}, Hi = { exports: {} }, T = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xn = Symbol.for("react.element"), rf = Symbol.for("react.portal"), lf = Symbol.for("react.fragment"), uf = Symbol.for("react.strict_mode"), of = Symbol.for("react.profiler"), sf = Symbol.for("react.provider"), af = Symbol.for("react.context"), ff = Symbol.for("react.forward_ref"), cf = Symbol.for("react.suspense"), df = Symbol.for("react.memo"), pf = Symbol.for("react.lazy"), Oo = Symbol.iterator;
function mf(e) {
  return e === null || typeof e != "object" ? null : (e = Oo && e[Oo] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Wi = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Qi = Object.assign, Ki = {};
function ln(e, t, n) {
  this.props = e, this.context = t, this.refs = Ki, this.updater = n || Wi;
}
ln.prototype.isReactComponent = {};
ln.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
ln.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Yi() {
}
Yi.prototype = ln.prototype;
function ju(e, t, n) {
  this.props = e, this.context = t, this.refs = Ki, this.updater = n || Wi;
}
var Uu = ju.prototype = new Yi();
Uu.constructor = ju;
Qi(Uu, ln.prototype);
Uu.isPureReactComponent = !0;
var Do = Array.isArray, Xi = Object.prototype.hasOwnProperty, $u = { current: null }, Gi = { key: !0, ref: !0, __self: !0, __source: !0 };
function Zi(e, t, n) {
  var r, l = {}, u = null, o = null;
  if (t != null) for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (u = "" + t.key), t) Xi.call(t, r) && !Gi.hasOwnProperty(r) && (l[r] = t[r]);
  var i = arguments.length - 2;
  if (i === 1) l.children = n;
  else if (1 < i) {
    for (var s = Array(i), f = 0; f < i; f++) s[f] = arguments[f + 2];
    l.children = s;
  }
  if (e && e.defaultProps) for (r in i = e.defaultProps, i) l[r] === void 0 && (l[r] = i[r]);
  return { $$typeof: Xn, type: e, key: u, ref: o, props: l, _owner: $u.current };
}
function vf(e, t) {
  return { $$typeof: Xn, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Vu(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Xn;
}
function hf(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Io = /\/+/g;
function wl(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? hf("" + e.key) : t.toString(36);
}
function gr(e, t, n, r, l) {
  var u = typeof e;
  (u === "undefined" || u === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else switch (u) {
    case "string":
    case "number":
      o = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case Xn:
        case rf:
          o = !0;
      }
  }
  if (o) return o = e, l = l(o), e = r === "" ? "." + wl(o, 0) : r, Do(l) ? (n = "", e != null && (n = e.replace(Io, "$&/") + "/"), gr(l, t, n, "", function(f) {
    return f;
  })) : l != null && (Vu(l) && (l = vf(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(Io, "$&/") + "/") + e)), t.push(l)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", Do(e)) for (var i = 0; i < e.length; i++) {
    u = e[i];
    var s = r + wl(u, i);
    o += gr(u, t, n, s, l);
  }
  else if (s = mf(e), typeof s == "function") for (e = s.call(e), i = 0; !(u = e.next()).done; ) u = u.value, s = r + wl(u, i++), o += gr(u, t, n, s, l);
  else if (u === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function tr(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return gr(e, r, "", "", function(u) {
    return t.call(n, u, l++);
  }), r;
}
function yf(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var oe = { current: null }, wr = { transition: null }, gf = { ReactCurrentDispatcher: oe, ReactCurrentBatchConfig: wr, ReactCurrentOwner: $u };
function Ji() {
  throw Error("act(...) is not supported in production builds of React.");
}
T.Children = { map: tr, forEach: function(e, t, n) {
  tr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return tr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return tr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Vu(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
T.Component = ln;
T.Fragment = lf;
T.Profiler = of;
T.PureComponent = ju;
T.StrictMode = uf;
T.Suspense = cf;
T.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = gf;
T.act = Ji;
T.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Qi({}, e.props), l = e.key, u = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (u = t.ref, o = $u.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var i = e.type.defaultProps;
    for (s in t) Xi.call(t, s) && !Gi.hasOwnProperty(s) && (r[s] = t[s] === void 0 && i !== void 0 ? i[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = n;
  else if (1 < s) {
    i = Array(s);
    for (var f = 0; f < s; f++) i[f] = arguments[f + 2];
    r.children = i;
  }
  return { $$typeof: Xn, type: e.type, key: l, ref: u, props: r, _owner: o };
};
T.createContext = function(e) {
  return e = { $$typeof: af, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: sf, _context: e }, e.Consumer = e;
};
T.createElement = Zi;
T.createFactory = function(e) {
  var t = Zi.bind(null, e);
  return t.type = e, t;
};
T.createRef = function() {
  return { current: null };
};
T.forwardRef = function(e) {
  return { $$typeof: ff, render: e };
};
T.isValidElement = Vu;
T.lazy = function(e) {
  return { $$typeof: pf, _payload: { _status: -1, _result: e }, _init: yf };
};
T.memo = function(e, t) {
  return { $$typeof: df, type: e, compare: t === void 0 ? null : t };
};
T.startTransition = function(e) {
  var t = wr.transition;
  wr.transition = {};
  try {
    e();
  } finally {
    wr.transition = t;
  }
};
T.unstable_act = Ji;
T.useCallback = function(e, t) {
  return oe.current.useCallback(e, t);
};
T.useContext = function(e) {
  return oe.current.useContext(e);
};
T.useDebugValue = function() {
};
T.useDeferredValue = function(e) {
  return oe.current.useDeferredValue(e);
};
T.useEffect = function(e, t) {
  return oe.current.useEffect(e, t);
};
T.useId = function() {
  return oe.current.useId();
};
T.useImperativeHandle = function(e, t, n) {
  return oe.current.useImperativeHandle(e, t, n);
};
T.useInsertionEffect = function(e, t) {
  return oe.current.useInsertionEffect(e, t);
};
T.useLayoutEffect = function(e, t) {
  return oe.current.useLayoutEffect(e, t);
};
T.useMemo = function(e, t) {
  return oe.current.useMemo(e, t);
};
T.useReducer = function(e, t, n) {
  return oe.current.useReducer(e, t, n);
};
T.useRef = function(e) {
  return oe.current.useRef(e);
};
T.useState = function(e) {
  return oe.current.useState(e);
};
T.useSyncExternalStore = function(e, t, n) {
  return oe.current.useSyncExternalStore(e, t, n);
};
T.useTransition = function() {
  return oe.current.useTransition();
};
T.version = "18.3.1";
Hi.exports = T;
var me = Hi.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wf = me, Sf = Symbol.for("react.element"), kf = Symbol.for("react.fragment"), Ef = Object.prototype.hasOwnProperty, xf = wf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Cf = { key: !0, ref: !0, __self: !0, __source: !0 };
function qi(e, t, n) {
  var r, l = {}, u = null, o = null;
  n !== void 0 && (u = "" + n), t.key !== void 0 && (u = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t) Ef.call(t, r) && !Cf.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: Sf, type: e, key: u, ref: o, props: l, _owner: xf.current };
}
el.Fragment = kf;
el.jsx = qi;
el.jsxs = qi;
Bi.exports = el;
var Ge = Bi.exports, bi = { exports: {} }, ge = {}, es = { exports: {} }, ts = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(x, N) {
    var z = x.length;
    x.push(N);
    e: for (; 0 < z; ) {
      var H = z - 1 >>> 1, X = x[H];
      if (0 < l(X, N)) x[H] = N, x[z] = X, z = H;
      else break e;
    }
  }
  function n(x) {
    return x.length === 0 ? null : x[0];
  }
  function r(x) {
    if (x.length === 0) return null;
    var N = x[0], z = x.pop();
    if (z !== N) {
      x[0] = z;
      e: for (var H = 0, X = x.length, bn = X >>> 1; H < bn; ) {
        var ht = 2 * (H + 1) - 1, gl = x[ht], yt = ht + 1, er = x[yt];
        if (0 > l(gl, z)) yt < X && 0 > l(er, gl) ? (x[H] = er, x[yt] = z, H = yt) : (x[H] = gl, x[ht] = z, H = ht);
        else if (yt < X && 0 > l(er, z)) x[H] = er, x[yt] = z, H = yt;
        else break e;
      }
    }
    return N;
  }
  function l(x, N) {
    var z = x.sortIndex - N.sortIndex;
    return z !== 0 ? z : x.id - N.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var u = performance;
    e.unstable_now = function() {
      return u.now();
    };
  } else {
    var o = Date, i = o.now();
    e.unstable_now = function() {
      return o.now() - i;
    };
  }
  var s = [], f = [], v = 1, m = null, p = 3, g = !1, w = !1, S = !1, F = typeof setTimeout == "function" ? setTimeout : null, c = typeof clearTimeout == "function" ? clearTimeout : null, a = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function d(x) {
    for (var N = n(f); N !== null; ) {
      if (N.callback === null) r(f);
      else if (N.startTime <= x) r(f), N.sortIndex = N.expirationTime, t(s, N);
      else break;
      N = n(f);
    }
  }
  function h(x) {
    if (S = !1, d(x), !w) if (n(s) !== null) w = !0, hl(E);
    else {
      var N = n(f);
      N !== null && yl(h, N.startTime - x);
    }
  }
  function E(x, N) {
    w = !1, S && (S = !1, c(P), P = -1), g = !0;
    var z = p;
    try {
      for (d(N), m = n(s); m !== null && (!(m.expirationTime > N) || x && !Pe()); ) {
        var H = m.callback;
        if (typeof H == "function") {
          m.callback = null, p = m.priorityLevel;
          var X = H(m.expirationTime <= N);
          N = e.unstable_now(), typeof X == "function" ? m.callback = X : m === n(s) && r(s), d(N);
        } else r(s);
        m = n(s);
      }
      if (m !== null) var bn = !0;
      else {
        var ht = n(f);
        ht !== null && yl(h, ht.startTime - N), bn = !1;
      }
      return bn;
    } finally {
      m = null, p = z, g = !1;
    }
  }
  var C = !1, _ = null, P = -1, B = 5, L = -1;
  function Pe() {
    return !(e.unstable_now() - L < B);
  }
  function sn() {
    if (_ !== null) {
      var x = e.unstable_now();
      L = x;
      var N = !0;
      try {
        N = _(!0, x);
      } finally {
        N ? an() : (C = !1, _ = null);
      }
    } else C = !1;
  }
  var an;
  if (typeof a == "function") an = function() {
    a(sn);
  };
  else if (typeof MessageChannel < "u") {
    var Mo = new MessageChannel(), nf = Mo.port2;
    Mo.port1.onmessage = sn, an = function() {
      nf.postMessage(null);
    };
  } else an = function() {
    F(sn, 0);
  };
  function hl(x) {
    _ = x, C || (C = !0, an());
  }
  function yl(x, N) {
    P = F(function() {
      x(e.unstable_now());
    }, N);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(x) {
    x.callback = null;
  }, e.unstable_continueExecution = function() {
    w || g || (w = !0, hl(E));
  }, e.unstable_forceFrameRate = function(x) {
    0 > x || 125 < x ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : B = 0 < x ? Math.floor(1e3 / x) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return p;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(s);
  }, e.unstable_next = function(x) {
    switch (p) {
      case 1:
      case 2:
      case 3:
        var N = 3;
        break;
      default:
        N = p;
    }
    var z = p;
    p = N;
    try {
      return x();
    } finally {
      p = z;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(x, N) {
    switch (x) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        x = 3;
    }
    var z = p;
    p = x;
    try {
      return N();
    } finally {
      p = z;
    }
  }, e.unstable_scheduleCallback = function(x, N, z) {
    var H = e.unstable_now();
    switch (typeof z == "object" && z !== null ? (z = z.delay, z = typeof z == "number" && 0 < z ? H + z : H) : z = H, x) {
      case 1:
        var X = -1;
        break;
      case 2:
        X = 250;
        break;
      case 5:
        X = 1073741823;
        break;
      case 4:
        X = 1e4;
        break;
      default:
        X = 5e3;
    }
    return X = z + X, x = { id: v++, callback: N, priorityLevel: x, startTime: z, expirationTime: X, sortIndex: -1 }, z > H ? (x.sortIndex = z, t(f, x), n(s) === null && x === n(f) && (S ? (c(P), P = -1) : S = !0, yl(h, z - H))) : (x.sortIndex = X, t(s, x), w || g || (w = !0, hl(E))), x;
  }, e.unstable_shouldYield = Pe, e.unstable_wrapCallback = function(x) {
    var N = p;
    return function() {
      var z = p;
      p = N;
      try {
        return x.apply(this, arguments);
      } finally {
        p = z;
      }
    };
  };
})(ts);
es.exports = ts;
var _f = es.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pf = me, ye = _f;
function y(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ns = /* @__PURE__ */ new Set(), Rn = {};
function Lt(e, t) {
  Jt(e, t), Jt(e + "Capture", t);
}
function Jt(e, t) {
  for (Rn[e] = t, e = 0; e < t.length; e++) ns.add(t[e]);
}
var We = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ql = Object.prototype.hasOwnProperty, Nf = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Fo = {}, jo = {};
function zf(e) {
  return Ql.call(jo, e) ? !0 : Ql.call(Fo, e) ? !1 : Nf.test(e) ? jo[e] = !0 : (Fo[e] = !0, !1);
}
function Tf(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Lf(e, t, n, r) {
  if (t === null || typeof t > "u" || Tf(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t;
  }
  return !1;
}
function ie(e, t, n, r, l, u, o) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = u, this.removeEmptyString = o;
}
var b = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  b[e] = new ie(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  b[t] = new ie(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  b[e] = new ie(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  b[e] = new ie(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  b[e] = new ie(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  b[e] = new ie(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  b[e] = new ie(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  b[e] = new ie(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  b[e] = new ie(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Au = /[\-:]([a-z])/g;
function Bu(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Au,
    Bu
  );
  b[t] = new ie(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Au, Bu);
  b[t] = new ie(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Au, Bu);
  b[t] = new ie(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  b[e] = new ie(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
b.xlinkHref = new ie("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  b[e] = new ie(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Hu(e, t, n, r) {
  var l = b.hasOwnProperty(t) ? b[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Lf(t, n, l, r) && (n = null), r || l === null ? zf(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Xe = Pf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, nr = Symbol.for("react.element"), Ot = Symbol.for("react.portal"), Dt = Symbol.for("react.fragment"), Wu = Symbol.for("react.strict_mode"), Kl = Symbol.for("react.profiler"), rs = Symbol.for("react.provider"), ls = Symbol.for("react.context"), Qu = Symbol.for("react.forward_ref"), Yl = Symbol.for("react.suspense"), Xl = Symbol.for("react.suspense_list"), Ku = Symbol.for("react.memo"), Je = Symbol.for("react.lazy"), us = Symbol.for("react.offscreen"), Uo = Symbol.iterator;
function fn(e) {
  return e === null || typeof e != "object" ? null : (e = Uo && e[Uo] || e["@@iterator"], typeof e == "function" ? e : null);
}
var V = Object.assign, Sl;
function gn(e) {
  if (Sl === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Sl = t && t[1] || "";
  }
  return `
` + Sl + e;
}
var kl = !1;
function El(e, t) {
  if (!e || kl) return "";
  kl = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t) if (t = function() {
      throw Error();
    }, Object.defineProperty(t.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(t, []);
      } catch (f) {
        var r = f;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (f) {
        r = f;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (f) {
        r = f;
      }
      e();
    }
  } catch (f) {
    if (f && r && typeof f.stack == "string") {
      for (var l = f.stack.split(`
`), u = r.stack.split(`
`), o = l.length - 1, i = u.length - 1; 1 <= o && 0 <= i && l[o] !== u[i]; ) i--;
      for (; 1 <= o && 0 <= i; o--, i--) if (l[o] !== u[i]) {
        if (o !== 1 || i !== 1)
          do
            if (o--, i--, 0 > i || l[o] !== u[i]) {
              var s = `
` + l[o].replace(" at new ", " at ");
              return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
            }
          while (1 <= o && 0 <= i);
        break;
      }
    }
  } finally {
    kl = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? gn(e) : "";
}
function Rf(e) {
  switch (e.tag) {
    case 5:
      return gn(e.type);
    case 16:
      return gn("Lazy");
    case 13:
      return gn("Suspense");
    case 19:
      return gn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = El(e.type, !1), e;
    case 11:
      return e = El(e.type.render, !1), e;
    case 1:
      return e = El(e.type, !0), e;
    default:
      return "";
  }
}
function Gl(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Dt:
      return "Fragment";
    case Ot:
      return "Portal";
    case Kl:
      return "Profiler";
    case Wu:
      return "StrictMode";
    case Yl:
      return "Suspense";
    case Xl:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case ls:
      return (e.displayName || "Context") + ".Consumer";
    case rs:
      return (e._context.displayName || "Context") + ".Provider";
    case Qu:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Ku:
      return t = e.displayName || null, t !== null ? t : Gl(e.type) || "Memo";
    case Je:
      t = e._payload, e = e._init;
      try {
        return Gl(e(t));
      } catch {
      }
  }
  return null;
}
function Mf(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Gl(t);
    case 8:
      return t === Wu ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function ct(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function os(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Of(e) {
  var t = os(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, u = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(o) {
      r = "" + o, u.call(this, o);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(o) {
      r = "" + o;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function rr(e) {
  e._valueTracker || (e._valueTracker = Of(e));
}
function is(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = os(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Lr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Zl(e, t) {
  var n = t.checked;
  return V({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function $o(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = ct(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function ss(e, t) {
  t = t.checked, t != null && Hu(e, "checked", t, !1);
}
function Jl(e, t) {
  ss(e, t);
  var n = ct(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? ql(e, t.type, n) : t.hasOwnProperty("defaultValue") && ql(e, t.type, ct(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Vo(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function ql(e, t, n) {
  (t !== "number" || Lr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var wn = Array.isArray;
function Qt(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + ct(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function bl(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(y(91));
  return V({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Ao(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(y(92));
      if (wn(n)) {
        if (1 < n.length) throw Error(y(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: ct(n) };
}
function as(e, t) {
  var n = ct(t.value), r = ct(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Bo(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function fs(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function eu(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? fs(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var lr, cs = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (lr = lr || document.createElement("div"), lr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = lr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Mn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var En = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, Df = ["Webkit", "ms", "Moz", "O"];
Object.keys(En).forEach(function(e) {
  Df.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), En[t] = En[e];
  });
});
function ds(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || En.hasOwnProperty(e) && En[e] ? ("" + t).trim() : t + "px";
}
function ps(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = ds(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var If = V({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function tu(e, t) {
  if (t) {
    if (If[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(y(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(y(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(y(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(y(62));
  }
}
function nu(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var ru = null;
function Yu(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var lu = null, Kt = null, Yt = null;
function Ho(e) {
  if (e = Jn(e)) {
    if (typeof lu != "function") throw Error(y(280));
    var t = e.stateNode;
    t && (t = ul(t), lu(e.stateNode, e.type, t));
  }
}
function ms(e) {
  Kt ? Yt ? Yt.push(e) : Yt = [e] : Kt = e;
}
function vs() {
  if (Kt) {
    var e = Kt, t = Yt;
    if (Yt = Kt = null, Ho(e), t) for (e = 0; e < t.length; e++) Ho(t[e]);
  }
}
function hs(e, t) {
  return e(t);
}
function ys() {
}
var xl = !1;
function gs(e, t, n) {
  if (xl) return e(t, n);
  xl = !0;
  try {
    return hs(e, t, n);
  } finally {
    xl = !1, (Kt !== null || Yt !== null) && (ys(), vs());
  }
}
function On(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = ul(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(y(231, t, typeof n));
  return n;
}
var uu = !1;
if (We) try {
  var cn = {};
  Object.defineProperty(cn, "passive", { get: function() {
    uu = !0;
  } }), window.addEventListener("test", cn, cn), window.removeEventListener("test", cn, cn);
} catch {
  uu = !1;
}
function Ff(e, t, n, r, l, u, o, i, s) {
  var f = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, f);
  } catch (v) {
    this.onError(v);
  }
}
var xn = !1, Rr = null, Mr = !1, ou = null, jf = { onError: function(e) {
  xn = !0, Rr = e;
} };
function Uf(e, t, n, r, l, u, o, i, s) {
  xn = !1, Rr = null, Ff.apply(jf, arguments);
}
function $f(e, t, n, r, l, u, o, i, s) {
  if (Uf.apply(this, arguments), xn) {
    if (xn) {
      var f = Rr;
      xn = !1, Rr = null;
    } else throw Error(y(198));
    Mr || (Mr = !0, ou = f);
  }
}
function Rt(e) {
  var t = e, n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (n = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function ws(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Wo(e) {
  if (Rt(e) !== e) throw Error(y(188));
}
function Vf(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Rt(e), t === null) throw Error(y(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var u = l.alternate;
    if (u === null) {
      if (r = l.return, r !== null) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === u.child) {
      for (u = l.child; u; ) {
        if (u === n) return Wo(l), e;
        if (u === r) return Wo(l), t;
        u = u.sibling;
      }
      throw Error(y(188));
    }
    if (n.return !== r.return) n = l, r = u;
    else {
      for (var o = !1, i = l.child; i; ) {
        if (i === n) {
          o = !0, n = l, r = u;
          break;
        }
        if (i === r) {
          o = !0, r = l, n = u;
          break;
        }
        i = i.sibling;
      }
      if (!o) {
        for (i = u.child; i; ) {
          if (i === n) {
            o = !0, n = u, r = l;
            break;
          }
          if (i === r) {
            o = !0, r = u, n = l;
            break;
          }
          i = i.sibling;
        }
        if (!o) throw Error(y(189));
      }
    }
    if (n.alternate !== r) throw Error(y(190));
  }
  if (n.tag !== 3) throw Error(y(188));
  return n.stateNode.current === n ? e : t;
}
function Ss(e) {
  return e = Vf(e), e !== null ? ks(e) : null;
}
function ks(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = ks(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Es = ye.unstable_scheduleCallback, Qo = ye.unstable_cancelCallback, Af = ye.unstable_shouldYield, Bf = ye.unstable_requestPaint, W = ye.unstable_now, Hf = ye.unstable_getCurrentPriorityLevel, Xu = ye.unstable_ImmediatePriority, xs = ye.unstable_UserBlockingPriority, Or = ye.unstable_NormalPriority, Wf = ye.unstable_LowPriority, Cs = ye.unstable_IdlePriority, tl = null, je = null;
function Qf(e) {
  if (je && typeof je.onCommitFiberRoot == "function") try {
    je.onCommitFiberRoot(tl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Re = Math.clz32 ? Math.clz32 : Xf, Kf = Math.log, Yf = Math.LN2;
function Xf(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Kf(e) / Yf | 0) | 0;
}
var ur = 64, or = 4194304;
function Sn(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Dr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, u = e.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var i = o & ~l;
    i !== 0 ? r = Sn(i) : (u &= o, u !== 0 && (r = Sn(u)));
  } else o = n & ~l, o !== 0 ? r = Sn(o) : u !== 0 && (r = Sn(u));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, u = t & -t, l >= u || l === 16 && (u & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Re(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Gf(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Zf(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, u = e.pendingLanes; 0 < u; ) {
    var o = 31 - Re(u), i = 1 << o, s = l[o];
    s === -1 ? (!(i & n) || i & r) && (l[o] = Gf(i, t)) : s <= t && (e.expiredLanes |= i), u &= ~i;
  }
}
function iu(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function _s() {
  var e = ur;
  return ur <<= 1, !(ur & 4194240) && (ur = 64), e;
}
function Cl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Gn(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Re(t), e[t] = n;
}
function Jf(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Re(n), u = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~u;
  }
}
function Gu(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Re(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var M = 0;
function Ps(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Ns, Zu, zs, Ts, Ls, su = !1, ir = [], rt = null, lt = null, ut = null, Dn = /* @__PURE__ */ new Map(), In = /* @__PURE__ */ new Map(), be = [], qf = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Ko(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      rt = null;
      break;
    case "dragenter":
    case "dragleave":
      lt = null;
      break;
    case "mouseover":
    case "mouseout":
      ut = null;
      break;
    case "pointerover":
    case "pointerout":
      Dn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      In.delete(t.pointerId);
  }
}
function dn(e, t, n, r, l, u) {
  return e === null || e.nativeEvent !== u ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: u, targetContainers: [l] }, t !== null && (t = Jn(t), t !== null && Zu(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function bf(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return rt = dn(rt, e, t, n, r, l), !0;
    case "dragenter":
      return lt = dn(lt, e, t, n, r, l), !0;
    case "mouseover":
      return ut = dn(ut, e, t, n, r, l), !0;
    case "pointerover":
      var u = l.pointerId;
      return Dn.set(u, dn(Dn.get(u) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return u = l.pointerId, In.set(u, dn(In.get(u) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function Rs(e) {
  var t = St(e.target);
  if (t !== null) {
    var n = Rt(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = ws(n), t !== null) {
          e.blockedOn = t, Ls(e.priority, function() {
            zs(n);
          });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Sr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = au(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      ru = r, n.target.dispatchEvent(r), ru = null;
    } else return t = Jn(n), t !== null && Zu(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Yo(e, t, n) {
  Sr(e) && n.delete(t);
}
function ec() {
  su = !1, rt !== null && Sr(rt) && (rt = null), lt !== null && Sr(lt) && (lt = null), ut !== null && Sr(ut) && (ut = null), Dn.forEach(Yo), In.forEach(Yo);
}
function pn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, su || (su = !0, ye.unstable_scheduleCallback(ye.unstable_NormalPriority, ec)));
}
function Fn(e) {
  function t(l) {
    return pn(l, e);
  }
  if (0 < ir.length) {
    pn(ir[0], e);
    for (var n = 1; n < ir.length; n++) {
      var r = ir[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (rt !== null && pn(rt, e), lt !== null && pn(lt, e), ut !== null && pn(ut, e), Dn.forEach(t), In.forEach(t), n = 0; n < be.length; n++) r = be[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < be.length && (n = be[0], n.blockedOn === null); ) Rs(n), n.blockedOn === null && be.shift();
}
var Xt = Xe.ReactCurrentBatchConfig, Ir = !0;
function tc(e, t, n, r) {
  var l = M, u = Xt.transition;
  Xt.transition = null;
  try {
    M = 1, Ju(e, t, n, r);
  } finally {
    M = l, Xt.transition = u;
  }
}
function nc(e, t, n, r) {
  var l = M, u = Xt.transition;
  Xt.transition = null;
  try {
    M = 4, Ju(e, t, n, r);
  } finally {
    M = l, Xt.transition = u;
  }
}
function Ju(e, t, n, r) {
  if (Ir) {
    var l = au(e, t, n, r);
    if (l === null) Dl(e, t, r, Fr, n), Ko(e, r);
    else if (bf(l, e, t, n, r)) r.stopPropagation();
    else if (Ko(e, r), t & 4 && -1 < qf.indexOf(e)) {
      for (; l !== null; ) {
        var u = Jn(l);
        if (u !== null && Ns(u), u = au(e, t, n, r), u === null && Dl(e, t, r, Fr, n), u === l) break;
        l = u;
      }
      l !== null && r.stopPropagation();
    } else Dl(e, t, r, null, n);
  }
}
var Fr = null;
function au(e, t, n, r) {
  if (Fr = null, e = Yu(r), e = St(e), e !== null) if (t = Rt(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = ws(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Fr = e, null;
}
function Ms(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Hf()) {
        case Xu:
          return 1;
        case xs:
          return 4;
        case Or:
        case Wf:
          return 16;
        case Cs:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var tt = null, qu = null, kr = null;
function Os() {
  if (kr) return kr;
  var e, t = qu, n = t.length, r, l = "value" in tt ? tt.value : tt.textContent, u = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === l[u - r]; r++) ;
  return kr = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Er(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function sr() {
  return !0;
}
function Xo() {
  return !1;
}
function we(e) {
  function t(n, r, l, u, o) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = u, this.target = o, this.currentTarget = null;
    for (var i in e) e.hasOwnProperty(i) && (n = e[i], this[i] = n ? n(u) : u[i]);
    return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? sr : Xo, this.isPropagationStopped = Xo, this;
  }
  return V(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = sr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = sr);
  }, persist: function() {
  }, isPersistent: sr }), t;
}
var un = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, bu = we(un), Zn = V({}, un, { view: 0, detail: 0 }), rc = we(Zn), _l, Pl, mn, nl = V({}, Zn, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: eo, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== mn && (mn && e.type === "mousemove" ? (_l = e.screenX - mn.screenX, Pl = e.screenY - mn.screenY) : Pl = _l = 0, mn = e), _l);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Pl;
} }), Go = we(nl), lc = V({}, nl, { dataTransfer: 0 }), uc = we(lc), oc = V({}, Zn, { relatedTarget: 0 }), Nl = we(oc), ic = V({}, un, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), sc = we(ic), ac = V({}, un, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), fc = we(ac), cc = V({}, un, { data: 0 }), Zo = we(cc), dc = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, pc = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, mc = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function vc(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = mc[e]) ? !!t[e] : !1;
}
function eo() {
  return vc;
}
var hc = V({}, Zn, { key: function(e) {
  if (e.key) {
    var t = dc[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Er(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? pc[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: eo, charCode: function(e) {
  return e.type === "keypress" ? Er(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Er(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), yc = we(hc), gc = V({}, nl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Jo = we(gc), wc = V({}, Zn, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: eo }), Sc = we(wc), kc = V({}, un, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Ec = we(kc), xc = V({}, nl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Cc = we(xc), _c = [9, 13, 27, 32], to = We && "CompositionEvent" in window, Cn = null;
We && "documentMode" in document && (Cn = document.documentMode);
var Pc = We && "TextEvent" in window && !Cn, Ds = We && (!to || Cn && 8 < Cn && 11 >= Cn), qo = " ", bo = !1;
function Is(e, t) {
  switch (e) {
    case "keyup":
      return _c.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Fs(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var It = !1;
function Nc(e, t) {
  switch (e) {
    case "compositionend":
      return Fs(t);
    case "keypress":
      return t.which !== 32 ? null : (bo = !0, qo);
    case "textInput":
      return e = t.data, e === qo && bo ? null : e;
    default:
      return null;
  }
}
function zc(e, t) {
  if (It) return e === "compositionend" || !to && Is(e, t) ? (e = Os(), kr = qu = tt = null, It = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Ds && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Tc = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function ei(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Tc[e.type] : t === "textarea";
}
function js(e, t, n, r) {
  ms(r), t = jr(t, "onChange"), 0 < t.length && (n = new bu("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var _n = null, jn = null;
function Lc(e) {
  Xs(e, 0);
}
function rl(e) {
  var t = Ut(e);
  if (is(t)) return e;
}
function Rc(e, t) {
  if (e === "change") return t;
}
var Us = !1;
if (We) {
  var zl;
  if (We) {
    var Tl = "oninput" in document;
    if (!Tl) {
      var ti = document.createElement("div");
      ti.setAttribute("oninput", "return;"), Tl = typeof ti.oninput == "function";
    }
    zl = Tl;
  } else zl = !1;
  Us = zl && (!document.documentMode || 9 < document.documentMode);
}
function ni() {
  _n && (_n.detachEvent("onpropertychange", $s), jn = _n = null);
}
function $s(e) {
  if (e.propertyName === "value" && rl(jn)) {
    var t = [];
    js(t, jn, e, Yu(e)), gs(Lc, t);
  }
}
function Mc(e, t, n) {
  e === "focusin" ? (ni(), _n = t, jn = n, _n.attachEvent("onpropertychange", $s)) : e === "focusout" && ni();
}
function Oc(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return rl(jn);
}
function Dc(e, t) {
  if (e === "click") return rl(t);
}
function Ic(e, t) {
  if (e === "input" || e === "change") return rl(t);
}
function Fc(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Oe = typeof Object.is == "function" ? Object.is : Fc;
function Un(e, t) {
  if (Oe(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!Ql.call(t, l) || !Oe(e[l], t[l])) return !1;
  }
  return !0;
}
function ri(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function li(e, t) {
  var n = ri(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = ri(n);
  }
}
function Vs(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Vs(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function As() {
  for (var e = window, t = Lr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Lr(e.document);
  }
  return t;
}
function no(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function jc(e) {
  var t = As(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Vs(n.ownerDocument.documentElement, n)) {
    if (r !== null && no(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, u = Math.min(r.start, l);
        r = r.end === void 0 ? u : Math.min(r.end, l), !e.extend && u > r && (l = r, r = u, u = l), l = li(n, u);
        var o = li(
          n,
          r
        );
        l && o && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), u > r ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var Uc = We && "documentMode" in document && 11 >= document.documentMode, Ft = null, fu = null, Pn = null, cu = !1;
function ui(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  cu || Ft == null || Ft !== Lr(r) || (r = Ft, "selectionStart" in r && no(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Pn && Un(Pn, r) || (Pn = r, r = jr(fu, "onSelect"), 0 < r.length && (t = new bu("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Ft)));
}
function ar(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var jt = { animationend: ar("Animation", "AnimationEnd"), animationiteration: ar("Animation", "AnimationIteration"), animationstart: ar("Animation", "AnimationStart"), transitionend: ar("Transition", "TransitionEnd") }, Ll = {}, Bs = {};
We && (Bs = document.createElement("div").style, "AnimationEvent" in window || (delete jt.animationend.animation, delete jt.animationiteration.animation, delete jt.animationstart.animation), "TransitionEvent" in window || delete jt.transitionend.transition);
function ll(e) {
  if (Ll[e]) return Ll[e];
  if (!jt[e]) return e;
  var t = jt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Bs) return Ll[e] = t[n];
  return e;
}
var Hs = ll("animationend"), Ws = ll("animationiteration"), Qs = ll("animationstart"), Ks = ll("transitionend"), Ys = /* @__PURE__ */ new Map(), oi = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function pt(e, t) {
  Ys.set(e, t), Lt(t, [e]);
}
for (var Rl = 0; Rl < oi.length; Rl++) {
  var Ml = oi[Rl], $c = Ml.toLowerCase(), Vc = Ml[0].toUpperCase() + Ml.slice(1);
  pt($c, "on" + Vc);
}
pt(Hs, "onAnimationEnd");
pt(Ws, "onAnimationIteration");
pt(Qs, "onAnimationStart");
pt("dblclick", "onDoubleClick");
pt("focusin", "onFocus");
pt("focusout", "onBlur");
pt(Ks, "onTransitionEnd");
Jt("onMouseEnter", ["mouseout", "mouseover"]);
Jt("onMouseLeave", ["mouseout", "mouseover"]);
Jt("onPointerEnter", ["pointerout", "pointerover"]);
Jt("onPointerLeave", ["pointerout", "pointerover"]);
Lt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Lt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Lt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Lt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Lt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Lt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var kn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Ac = new Set("cancel close invalid load scroll toggle".split(" ").concat(kn));
function ii(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, $f(r, t, void 0, e), e.currentTarget = null;
}
function Xs(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var u = void 0;
      if (t) for (var o = r.length - 1; 0 <= o; o--) {
        var i = r[o], s = i.instance, f = i.currentTarget;
        if (i = i.listener, s !== u && l.isPropagationStopped()) break e;
        ii(l, i, f), u = s;
      }
      else for (o = 0; o < r.length; o++) {
        if (i = r[o], s = i.instance, f = i.currentTarget, i = i.listener, s !== u && l.isPropagationStopped()) break e;
        ii(l, i, f), u = s;
      }
    }
  }
  if (Mr) throw e = ou, Mr = !1, ou = null, e;
}
function D(e, t) {
  var n = t[hu];
  n === void 0 && (n = t[hu] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Gs(t, e, 2, !1), n.add(r));
}
function Ol(e, t, n) {
  var r = 0;
  t && (r |= 4), Gs(n, e, r, t);
}
var fr = "_reactListening" + Math.random().toString(36).slice(2);
function $n(e) {
  if (!e[fr]) {
    e[fr] = !0, ns.forEach(function(n) {
      n !== "selectionchange" && (Ac.has(n) || Ol(n, !1, e), Ol(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[fr] || (t[fr] = !0, Ol("selectionchange", !1, t));
  }
}
function Gs(e, t, n, r) {
  switch (Ms(t)) {
    case 1:
      var l = tc;
      break;
    case 4:
      l = nc;
      break;
    default:
      l = Ju;
  }
  n = l.bind(null, t, n, e), l = void 0, !uu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Dl(e, t, n, r, l) {
  var u = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var o = r.tag;
    if (o === 3 || o === 4) {
      var i = r.stateNode.containerInfo;
      if (i === l || i.nodeType === 8 && i.parentNode === l) break;
      if (o === 4) for (o = r.return; o !== null; ) {
        var s = o.tag;
        if ((s === 3 || s === 4) && (s = o.stateNode.containerInfo, s === l || s.nodeType === 8 && s.parentNode === l)) return;
        o = o.return;
      }
      for (; i !== null; ) {
        if (o = St(i), o === null) return;
        if (s = o.tag, s === 5 || s === 6) {
          r = u = o;
          continue e;
        }
        i = i.parentNode;
      }
    }
    r = r.return;
  }
  gs(function() {
    var f = u, v = Yu(n), m = [];
    e: {
      var p = Ys.get(e);
      if (p !== void 0) {
        var g = bu, w = e;
        switch (e) {
          case "keypress":
            if (Er(n) === 0) break e;
          case "keydown":
          case "keyup":
            g = yc;
            break;
          case "focusin":
            w = "focus", g = Nl;
            break;
          case "focusout":
            w = "blur", g = Nl;
            break;
          case "beforeblur":
          case "afterblur":
            g = Nl;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            g = Go;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            g = uc;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            g = Sc;
            break;
          case Hs:
          case Ws:
          case Qs:
            g = sc;
            break;
          case Ks:
            g = Ec;
            break;
          case "scroll":
            g = rc;
            break;
          case "wheel":
            g = Cc;
            break;
          case "copy":
          case "cut":
          case "paste":
            g = fc;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            g = Jo;
        }
        var S = (t & 4) !== 0, F = !S && e === "scroll", c = S ? p !== null ? p + "Capture" : null : p;
        S = [];
        for (var a = f, d; a !== null; ) {
          d = a;
          var h = d.stateNode;
          if (d.tag === 5 && h !== null && (d = h, c !== null && (h = On(a, c), h != null && S.push(Vn(a, h, d)))), F) break;
          a = a.return;
        }
        0 < S.length && (p = new g(p, w, null, n, v), m.push({ event: p, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (p = e === "mouseover" || e === "pointerover", g = e === "mouseout" || e === "pointerout", p && n !== ru && (w = n.relatedTarget || n.fromElement) && (St(w) || w[Qe])) break e;
        if ((g || p) && (p = v.window === v ? v : (p = v.ownerDocument) ? p.defaultView || p.parentWindow : window, g ? (w = n.relatedTarget || n.toElement, g = f, w = w ? St(w) : null, w !== null && (F = Rt(w), w !== F || w.tag !== 5 && w.tag !== 6) && (w = null)) : (g = null, w = f), g !== w)) {
          if (S = Go, h = "onMouseLeave", c = "onMouseEnter", a = "mouse", (e === "pointerout" || e === "pointerover") && (S = Jo, h = "onPointerLeave", c = "onPointerEnter", a = "pointer"), F = g == null ? p : Ut(g), d = w == null ? p : Ut(w), p = new S(h, a + "leave", g, n, v), p.target = F, p.relatedTarget = d, h = null, St(v) === f && (S = new S(c, a + "enter", w, n, v), S.target = d, S.relatedTarget = F, h = S), F = h, g && w) t: {
            for (S = g, c = w, a = 0, d = S; d; d = Mt(d)) a++;
            for (d = 0, h = c; h; h = Mt(h)) d++;
            for (; 0 < a - d; ) S = Mt(S), a--;
            for (; 0 < d - a; ) c = Mt(c), d--;
            for (; a--; ) {
              if (S === c || c !== null && S === c.alternate) break t;
              S = Mt(S), c = Mt(c);
            }
            S = null;
          }
          else S = null;
          g !== null && si(m, p, g, S, !1), w !== null && F !== null && si(m, F, w, S, !0);
        }
      }
      e: {
        if (p = f ? Ut(f) : window, g = p.nodeName && p.nodeName.toLowerCase(), g === "select" || g === "input" && p.type === "file") var E = Rc;
        else if (ei(p)) if (Us) E = Ic;
        else {
          E = Oc;
          var C = Mc;
        }
        else (g = p.nodeName) && g.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (E = Dc);
        if (E && (E = E(e, f))) {
          js(m, E, n, v);
          break e;
        }
        C && C(e, p, f), e === "focusout" && (C = p._wrapperState) && C.controlled && p.type === "number" && ql(p, "number", p.value);
      }
      switch (C = f ? Ut(f) : window, e) {
        case "focusin":
          (ei(C) || C.contentEditable === "true") && (Ft = C, fu = f, Pn = null);
          break;
        case "focusout":
          Pn = fu = Ft = null;
          break;
        case "mousedown":
          cu = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          cu = !1, ui(m, n, v);
          break;
        case "selectionchange":
          if (Uc) break;
        case "keydown":
        case "keyup":
          ui(m, n, v);
      }
      var _;
      if (to) e: {
        switch (e) {
          case "compositionstart":
            var P = "onCompositionStart";
            break e;
          case "compositionend":
            P = "onCompositionEnd";
            break e;
          case "compositionupdate":
            P = "onCompositionUpdate";
            break e;
        }
        P = void 0;
      }
      else It ? Is(e, n) && (P = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (P = "onCompositionStart");
      P && (Ds && n.locale !== "ko" && (It || P !== "onCompositionStart" ? P === "onCompositionEnd" && It && (_ = Os()) : (tt = v, qu = "value" in tt ? tt.value : tt.textContent, It = !0)), C = jr(f, P), 0 < C.length && (P = new Zo(P, e, null, n, v), m.push({ event: P, listeners: C }), _ ? P.data = _ : (_ = Fs(n), _ !== null && (P.data = _)))), (_ = Pc ? Nc(e, n) : zc(e, n)) && (f = jr(f, "onBeforeInput"), 0 < f.length && (v = new Zo("onBeforeInput", "beforeinput", null, n, v), m.push({ event: v, listeners: f }), v.data = _));
    }
    Xs(m, t);
  });
}
function Vn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function jr(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, u = l.stateNode;
    l.tag === 5 && u !== null && (l = u, u = On(e, n), u != null && r.unshift(Vn(e, u, l)), u = On(e, t), u != null && r.push(Vn(e, u, l))), e = e.return;
  }
  return r;
}
function Mt(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function si(e, t, n, r, l) {
  for (var u = t._reactName, o = []; n !== null && n !== r; ) {
    var i = n, s = i.alternate, f = i.stateNode;
    if (s !== null && s === r) break;
    i.tag === 5 && f !== null && (i = f, l ? (s = On(n, u), s != null && o.unshift(Vn(n, s, i))) : l || (s = On(n, u), s != null && o.push(Vn(n, s, i)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var Bc = /\r\n?/g, Hc = /\u0000|\uFFFD/g;
function ai(e) {
  return (typeof e == "string" ? e : "" + e).replace(Bc, `
`).replace(Hc, "");
}
function cr(e, t, n) {
  if (t = ai(t), ai(e) !== t && n) throw Error(y(425));
}
function Ur() {
}
var du = null, pu = null;
function mu(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var vu = typeof setTimeout == "function" ? setTimeout : void 0, Wc = typeof clearTimeout == "function" ? clearTimeout : void 0, fi = typeof Promise == "function" ? Promise : void 0, Qc = typeof queueMicrotask == "function" ? queueMicrotask : typeof fi < "u" ? function(e) {
  return fi.resolve(null).then(e).catch(Kc);
} : vu;
function Kc(e) {
  setTimeout(function() {
    throw e;
  });
}
function Il(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Fn(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Fn(t);
}
function ot(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function ci(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var on = Math.random().toString(36).slice(2), Fe = "__reactFiber$" + on, An = "__reactProps$" + on, Qe = "__reactContainer$" + on, hu = "__reactEvents$" + on, Yc = "__reactListeners$" + on, Xc = "__reactHandles$" + on;
function St(e) {
  var t = e[Fe];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Qe] || n[Fe]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ci(e); e !== null; ) {
        if (n = e[Fe]) return n;
        e = ci(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Jn(e) {
  return e = e[Fe] || e[Qe], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Ut(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(y(33));
}
function ul(e) {
  return e[An] || null;
}
var yu = [], $t = -1;
function mt(e) {
  return { current: e };
}
function I(e) {
  0 > $t || (e.current = yu[$t], yu[$t] = null, $t--);
}
function O(e, t) {
  $t++, yu[$t] = e.current, e.current = t;
}
var dt = {}, re = mt(dt), fe = mt(!1), _t = dt;
function qt(e, t) {
  var n = e.type.contextTypes;
  if (!n) return dt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, u;
  for (u in n) l[u] = t[u];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function ce(e) {
  return e = e.childContextTypes, e != null;
}
function $r() {
  I(fe), I(re);
}
function di(e, t, n) {
  if (re.current !== dt) throw Error(y(168));
  O(re, t), O(fe, n);
}
function Zs(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(y(108, Mf(e) || "Unknown", l));
  return V({}, n, r);
}
function Vr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || dt, _t = re.current, O(re, e), O(fe, fe.current), !0;
}
function pi(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(y(169));
  n ? (e = Zs(e, t, _t), r.__reactInternalMemoizedMergedChildContext = e, I(fe), I(re), O(re, e)) : I(fe), O(fe, n);
}
var Ve = null, ol = !1, Fl = !1;
function Js(e) {
  Ve === null ? Ve = [e] : Ve.push(e);
}
function Gc(e) {
  ol = !0, Js(e);
}
function vt() {
  if (!Fl && Ve !== null) {
    Fl = !0;
    var e = 0, t = M;
    try {
      var n = Ve;
      for (M = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ve = null, ol = !1;
    } catch (l) {
      throw Ve !== null && (Ve = Ve.slice(e + 1)), Es(Xu, vt), l;
    } finally {
      M = t, Fl = !1;
    }
  }
  return null;
}
var Vt = [], At = 0, Ar = null, Br = 0, Se = [], ke = 0, Pt = null, Ae = 1, Be = "";
function gt(e, t) {
  Vt[At++] = Br, Vt[At++] = Ar, Ar = e, Br = t;
}
function qs(e, t, n) {
  Se[ke++] = Ae, Se[ke++] = Be, Se[ke++] = Pt, Pt = e;
  var r = Ae;
  e = Be;
  var l = 32 - Re(r) - 1;
  r &= ~(1 << l), n += 1;
  var u = 32 - Re(t) + l;
  if (30 < u) {
    var o = l - l % 5;
    u = (r & (1 << o) - 1).toString(32), r >>= o, l -= o, Ae = 1 << 32 - Re(t) + l | n << l | r, Be = u + e;
  } else Ae = 1 << u | n << l | r, Be = e;
}
function ro(e) {
  e.return !== null && (gt(e, 1), qs(e, 1, 0));
}
function lo(e) {
  for (; e === Ar; ) Ar = Vt[--At], Vt[At] = null, Br = Vt[--At], Vt[At] = null;
  for (; e === Pt; ) Pt = Se[--ke], Se[ke] = null, Be = Se[--ke], Se[ke] = null, Ae = Se[--ke], Se[ke] = null;
}
var he = null, ve = null, j = !1, Le = null;
function bs(e, t) {
  var n = Ee(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function mi(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, he = e, ve = ot(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, he = e, ve = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Pt !== null ? { id: Ae, overflow: Be } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ee(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, he = e, ve = null, !0) : !1;
    default:
      return !1;
  }
}
function gu(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function wu(e) {
  if (j) {
    var t = ve;
    if (t) {
      var n = t;
      if (!mi(e, t)) {
        if (gu(e)) throw Error(y(418));
        t = ot(n.nextSibling);
        var r = he;
        t && mi(e, t) ? bs(r, n) : (e.flags = e.flags & -4097 | 2, j = !1, he = e);
      }
    } else {
      if (gu(e)) throw Error(y(418));
      e.flags = e.flags & -4097 | 2, j = !1, he = e;
    }
  }
}
function vi(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  he = e;
}
function dr(e) {
  if (e !== he) return !1;
  if (!j) return vi(e), j = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !mu(e.type, e.memoizedProps)), t && (t = ve)) {
    if (gu(e)) throw ea(), Error(y(418));
    for (; t; ) bs(e, t), t = ot(t.nextSibling);
  }
  if (vi(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(y(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ve = ot(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      ve = null;
    }
  } else ve = he ? ot(e.stateNode.nextSibling) : null;
  return !0;
}
function ea() {
  for (var e = ve; e; ) e = ot(e.nextSibling);
}
function bt() {
  ve = he = null, j = !1;
}
function uo(e) {
  Le === null ? Le = [e] : Le.push(e);
}
var Zc = Xe.ReactCurrentBatchConfig;
function vn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(y(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(y(147, e));
      var l = r, u = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === u ? t.ref : (t = function(o) {
        var i = l.refs;
        o === null ? delete i[u] : i[u] = o;
      }, t._stringRef = u, t);
    }
    if (typeof e != "string") throw Error(y(284));
    if (!n._owner) throw Error(y(290, e));
  }
  return e;
}
function pr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(y(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function hi(e) {
  var t = e._init;
  return t(e._payload);
}
function ta(e) {
  function t(c, a) {
    if (e) {
      var d = c.deletions;
      d === null ? (c.deletions = [a], c.flags |= 16) : d.push(a);
    }
  }
  function n(c, a) {
    if (!e) return null;
    for (; a !== null; ) t(c, a), a = a.sibling;
    return null;
  }
  function r(c, a) {
    for (c = /* @__PURE__ */ new Map(); a !== null; ) a.key !== null ? c.set(a.key, a) : c.set(a.index, a), a = a.sibling;
    return c;
  }
  function l(c, a) {
    return c = ft(c, a), c.index = 0, c.sibling = null, c;
  }
  function u(c, a, d) {
    return c.index = d, e ? (d = c.alternate, d !== null ? (d = d.index, d < a ? (c.flags |= 2, a) : d) : (c.flags |= 2, a)) : (c.flags |= 1048576, a);
  }
  function o(c) {
    return e && c.alternate === null && (c.flags |= 2), c;
  }
  function i(c, a, d, h) {
    return a === null || a.tag !== 6 ? (a = Hl(d, c.mode, h), a.return = c, a) : (a = l(a, d), a.return = c, a);
  }
  function s(c, a, d, h) {
    var E = d.type;
    return E === Dt ? v(c, a, d.props.children, h, d.key) : a !== null && (a.elementType === E || typeof E == "object" && E !== null && E.$$typeof === Je && hi(E) === a.type) ? (h = l(a, d.props), h.ref = vn(c, a, d), h.return = c, h) : (h = Tr(d.type, d.key, d.props, null, c.mode, h), h.ref = vn(c, a, d), h.return = c, h);
  }
  function f(c, a, d, h) {
    return a === null || a.tag !== 4 || a.stateNode.containerInfo !== d.containerInfo || a.stateNode.implementation !== d.implementation ? (a = Wl(d, c.mode, h), a.return = c, a) : (a = l(a, d.children || []), a.return = c, a);
  }
  function v(c, a, d, h, E) {
    return a === null || a.tag !== 7 ? (a = Ct(d, c.mode, h, E), a.return = c, a) : (a = l(a, d), a.return = c, a);
  }
  function m(c, a, d) {
    if (typeof a == "string" && a !== "" || typeof a == "number") return a = Hl("" + a, c.mode, d), a.return = c, a;
    if (typeof a == "object" && a !== null) {
      switch (a.$$typeof) {
        case nr:
          return d = Tr(a.type, a.key, a.props, null, c.mode, d), d.ref = vn(c, null, a), d.return = c, d;
        case Ot:
          return a = Wl(a, c.mode, d), a.return = c, a;
        case Je:
          var h = a._init;
          return m(c, h(a._payload), d);
      }
      if (wn(a) || fn(a)) return a = Ct(a, c.mode, d, null), a.return = c, a;
      pr(c, a);
    }
    return null;
  }
  function p(c, a, d, h) {
    var E = a !== null ? a.key : null;
    if (typeof d == "string" && d !== "" || typeof d == "number") return E !== null ? null : i(c, a, "" + d, h);
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case nr:
          return d.key === E ? s(c, a, d, h) : null;
        case Ot:
          return d.key === E ? f(c, a, d, h) : null;
        case Je:
          return E = d._init, p(
            c,
            a,
            E(d._payload),
            h
          );
      }
      if (wn(d) || fn(d)) return E !== null ? null : v(c, a, d, h, null);
      pr(c, d);
    }
    return null;
  }
  function g(c, a, d, h, E) {
    if (typeof h == "string" && h !== "" || typeof h == "number") return c = c.get(d) || null, i(a, c, "" + h, E);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case nr:
          return c = c.get(h.key === null ? d : h.key) || null, s(a, c, h, E);
        case Ot:
          return c = c.get(h.key === null ? d : h.key) || null, f(a, c, h, E);
        case Je:
          var C = h._init;
          return g(c, a, d, C(h._payload), E);
      }
      if (wn(h) || fn(h)) return c = c.get(d) || null, v(a, c, h, E, null);
      pr(a, h);
    }
    return null;
  }
  function w(c, a, d, h) {
    for (var E = null, C = null, _ = a, P = a = 0, B = null; _ !== null && P < d.length; P++) {
      _.index > P ? (B = _, _ = null) : B = _.sibling;
      var L = p(c, _, d[P], h);
      if (L === null) {
        _ === null && (_ = B);
        break;
      }
      e && _ && L.alternate === null && t(c, _), a = u(L, a, P), C === null ? E = L : C.sibling = L, C = L, _ = B;
    }
    if (P === d.length) return n(c, _), j && gt(c, P), E;
    if (_ === null) {
      for (; P < d.length; P++) _ = m(c, d[P], h), _ !== null && (a = u(_, a, P), C === null ? E = _ : C.sibling = _, C = _);
      return j && gt(c, P), E;
    }
    for (_ = r(c, _); P < d.length; P++) B = g(_, c, P, d[P], h), B !== null && (e && B.alternate !== null && _.delete(B.key === null ? P : B.key), a = u(B, a, P), C === null ? E = B : C.sibling = B, C = B);
    return e && _.forEach(function(Pe) {
      return t(c, Pe);
    }), j && gt(c, P), E;
  }
  function S(c, a, d, h) {
    var E = fn(d);
    if (typeof E != "function") throw Error(y(150));
    if (d = E.call(d), d == null) throw Error(y(151));
    for (var C = E = null, _ = a, P = a = 0, B = null, L = d.next(); _ !== null && !L.done; P++, L = d.next()) {
      _.index > P ? (B = _, _ = null) : B = _.sibling;
      var Pe = p(c, _, L.value, h);
      if (Pe === null) {
        _ === null && (_ = B);
        break;
      }
      e && _ && Pe.alternate === null && t(c, _), a = u(Pe, a, P), C === null ? E = Pe : C.sibling = Pe, C = Pe, _ = B;
    }
    if (L.done) return n(
      c,
      _
    ), j && gt(c, P), E;
    if (_ === null) {
      for (; !L.done; P++, L = d.next()) L = m(c, L.value, h), L !== null && (a = u(L, a, P), C === null ? E = L : C.sibling = L, C = L);
      return j && gt(c, P), E;
    }
    for (_ = r(c, _); !L.done; P++, L = d.next()) L = g(_, c, P, L.value, h), L !== null && (e && L.alternate !== null && _.delete(L.key === null ? P : L.key), a = u(L, a, P), C === null ? E = L : C.sibling = L, C = L);
    return e && _.forEach(function(sn) {
      return t(c, sn);
    }), j && gt(c, P), E;
  }
  function F(c, a, d, h) {
    if (typeof d == "object" && d !== null && d.type === Dt && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case nr:
          e: {
            for (var E = d.key, C = a; C !== null; ) {
              if (C.key === E) {
                if (E = d.type, E === Dt) {
                  if (C.tag === 7) {
                    n(c, C.sibling), a = l(C, d.props.children), a.return = c, c = a;
                    break e;
                  }
                } else if (C.elementType === E || typeof E == "object" && E !== null && E.$$typeof === Je && hi(E) === C.type) {
                  n(c, C.sibling), a = l(C, d.props), a.ref = vn(c, C, d), a.return = c, c = a;
                  break e;
                }
                n(c, C);
                break;
              } else t(c, C);
              C = C.sibling;
            }
            d.type === Dt ? (a = Ct(d.props.children, c.mode, h, d.key), a.return = c, c = a) : (h = Tr(d.type, d.key, d.props, null, c.mode, h), h.ref = vn(c, a, d), h.return = c, c = h);
          }
          return o(c);
        case Ot:
          e: {
            for (C = d.key; a !== null; ) {
              if (a.key === C) if (a.tag === 4 && a.stateNode.containerInfo === d.containerInfo && a.stateNode.implementation === d.implementation) {
                n(c, a.sibling), a = l(a, d.children || []), a.return = c, c = a;
                break e;
              } else {
                n(c, a);
                break;
              }
              else t(c, a);
              a = a.sibling;
            }
            a = Wl(d, c.mode, h), a.return = c, c = a;
          }
          return o(c);
        case Je:
          return C = d._init, F(c, a, C(d._payload), h);
      }
      if (wn(d)) return w(c, a, d, h);
      if (fn(d)) return S(c, a, d, h);
      pr(c, d);
    }
    return typeof d == "string" && d !== "" || typeof d == "number" ? (d = "" + d, a !== null && a.tag === 6 ? (n(c, a.sibling), a = l(a, d), a.return = c, c = a) : (n(c, a), a = Hl(d, c.mode, h), a.return = c, c = a), o(c)) : n(c, a);
  }
  return F;
}
var en = ta(!0), na = ta(!1), Hr = mt(null), Wr = null, Bt = null, oo = null;
function io() {
  oo = Bt = Wr = null;
}
function so(e) {
  var t = Hr.current;
  I(Hr), e._currentValue = t;
}
function Su(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function Gt(e, t) {
  Wr = e, oo = Bt = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (ae = !0), e.firstContext = null);
}
function Ce(e) {
  var t = e._currentValue;
  if (oo !== e) if (e = { context: e, memoizedValue: t, next: null }, Bt === null) {
    if (Wr === null) throw Error(y(308));
    Bt = e, Wr.dependencies = { lanes: 0, firstContext: e };
  } else Bt = Bt.next = e;
  return t;
}
var kt = null;
function ao(e) {
  kt === null ? kt = [e] : kt.push(e);
}
function ra(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, ao(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Ke(e, r);
}
function Ke(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var qe = !1;
function fo(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function la(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function He(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function it(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, R & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, Ke(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, ao(r)) : (t.next = l.next, l.next = t), r.interleaved = t, Ke(e, n);
}
function xr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Gu(e, n);
  }
}
function yi(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var l = null, u = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var o = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        u === null ? l = u = o : u = u.next = o, n = n.next;
      } while (n !== null);
      u === null ? l = u = t : u = u.next = t;
    } else l = u = t;
    n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: u, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function Qr(e, t, n, r) {
  var l = e.updateQueue;
  qe = !1;
  var u = l.firstBaseUpdate, o = l.lastBaseUpdate, i = l.shared.pending;
  if (i !== null) {
    l.shared.pending = null;
    var s = i, f = s.next;
    s.next = null, o === null ? u = f : o.next = f, o = s;
    var v = e.alternate;
    v !== null && (v = v.updateQueue, i = v.lastBaseUpdate, i !== o && (i === null ? v.firstBaseUpdate = f : i.next = f, v.lastBaseUpdate = s));
  }
  if (u !== null) {
    var m = l.baseState;
    o = 0, v = f = s = null, i = u;
    do {
      var p = i.lane, g = i.eventTime;
      if ((r & p) === p) {
        v !== null && (v = v.next = {
          eventTime: g,
          lane: 0,
          tag: i.tag,
          payload: i.payload,
          callback: i.callback,
          next: null
        });
        e: {
          var w = e, S = i;
          switch (p = t, g = n, S.tag) {
            case 1:
              if (w = S.payload, typeof w == "function") {
                m = w.call(g, m, p);
                break e;
              }
              m = w;
              break e;
            case 3:
              w.flags = w.flags & -65537 | 128;
            case 0:
              if (w = S.payload, p = typeof w == "function" ? w.call(g, m, p) : w, p == null) break e;
              m = V({}, m, p);
              break e;
            case 2:
              qe = !0;
          }
        }
        i.callback !== null && i.lane !== 0 && (e.flags |= 64, p = l.effects, p === null ? l.effects = [i] : p.push(i));
      } else g = { eventTime: g, lane: p, tag: i.tag, payload: i.payload, callback: i.callback, next: null }, v === null ? (f = v = g, s = m) : v = v.next = g, o |= p;
      if (i = i.next, i === null) {
        if (i = l.shared.pending, i === null) break;
        p = i, i = p.next, p.next = null, l.lastBaseUpdate = p, l.shared.pending = null;
      }
    } while (!0);
    if (v === null && (s = m), l.baseState = s, l.firstBaseUpdate = f, l.lastBaseUpdate = v, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        o |= l.lane, l = l.next;
      while (l !== t);
    } else u === null && (l.shared.lanes = 0);
    zt |= o, e.lanes = o, e.memoizedState = m;
  }
}
function gi(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(y(191, l));
      l.call(r);
    }
  }
}
var qn = {}, Ue = mt(qn), Bn = mt(qn), Hn = mt(qn);
function Et(e) {
  if (e === qn) throw Error(y(174));
  return e;
}
function co(e, t) {
  switch (O(Hn, t), O(Bn, e), O(Ue, qn), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : eu(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = eu(t, e);
  }
  I(Ue), O(Ue, t);
}
function tn() {
  I(Ue), I(Bn), I(Hn);
}
function ua(e) {
  Et(Hn.current);
  var t = Et(Ue.current), n = eu(t, e.type);
  t !== n && (O(Bn, e), O(Ue, n));
}
function po(e) {
  Bn.current === e && (I(Ue), I(Bn));
}
var U = mt(0);
function Kr(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var jl = [];
function mo() {
  for (var e = 0; e < jl.length; e++) jl[e]._workInProgressVersionPrimary = null;
  jl.length = 0;
}
var Cr = Xe.ReactCurrentDispatcher, Ul = Xe.ReactCurrentBatchConfig, Nt = 0, $ = null, K = null, G = null, Yr = !1, Nn = !1, Wn = 0, Jc = 0;
function ee() {
  throw Error(y(321));
}
function vo(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Oe(e[n], t[n])) return !1;
  return !0;
}
function ho(e, t, n, r, l, u) {
  if (Nt = u, $ = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Cr.current = e === null || e.memoizedState === null ? td : nd, e = n(r, l), Nn) {
    u = 0;
    do {
      if (Nn = !1, Wn = 0, 25 <= u) throw Error(y(301));
      u += 1, G = K = null, t.updateQueue = null, Cr.current = rd, e = n(r, l);
    } while (Nn);
  }
  if (Cr.current = Xr, t = K !== null && K.next !== null, Nt = 0, G = K = $ = null, Yr = !1, t) throw Error(y(300));
  return e;
}
function yo() {
  var e = Wn !== 0;
  return Wn = 0, e;
}
function Ie() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return G === null ? $.memoizedState = G = e : G = G.next = e, G;
}
function _e() {
  if (K === null) {
    var e = $.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = K.next;
  var t = G === null ? $.memoizedState : G.next;
  if (t !== null) G = t, K = e;
  else {
    if (e === null) throw Error(y(310));
    K = e, e = { memoizedState: K.memoizedState, baseState: K.baseState, baseQueue: K.baseQueue, queue: K.queue, next: null }, G === null ? $.memoizedState = G = e : G = G.next = e;
  }
  return G;
}
function Qn(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function $l(e) {
  var t = _e(), n = t.queue;
  if (n === null) throw Error(y(311));
  n.lastRenderedReducer = e;
  var r = K, l = r.baseQueue, u = n.pending;
  if (u !== null) {
    if (l !== null) {
      var o = l.next;
      l.next = u.next, u.next = o;
    }
    r.baseQueue = l = u, n.pending = null;
  }
  if (l !== null) {
    u = l.next, r = r.baseState;
    var i = o = null, s = null, f = u;
    do {
      var v = f.lane;
      if ((Nt & v) === v) s !== null && (s = s.next = { lane: 0, action: f.action, hasEagerState: f.hasEagerState, eagerState: f.eagerState, next: null }), r = f.hasEagerState ? f.eagerState : e(r, f.action);
      else {
        var m = {
          lane: v,
          action: f.action,
          hasEagerState: f.hasEagerState,
          eagerState: f.eagerState,
          next: null
        };
        s === null ? (i = s = m, o = r) : s = s.next = m, $.lanes |= v, zt |= v;
      }
      f = f.next;
    } while (f !== null && f !== u);
    s === null ? o = r : s.next = i, Oe(r, t.memoizedState) || (ae = !0), t.memoizedState = r, t.baseState = o, t.baseQueue = s, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      u = l.lane, $.lanes |= u, zt |= u, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Vl(e) {
  var t = _e(), n = t.queue;
  if (n === null) throw Error(y(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, u = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = l = l.next;
    do
      u = e(u, o.action), o = o.next;
    while (o !== l);
    Oe(u, t.memoizedState) || (ae = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), n.lastRenderedState = u;
  }
  return [u, r];
}
function oa() {
}
function ia(e, t) {
  var n = $, r = _e(), l = t(), u = !Oe(r.memoizedState, l);
  if (u && (r.memoizedState = l, ae = !0), r = r.queue, go(fa.bind(null, n, r, e), [e]), r.getSnapshot !== t || u || G !== null && G.memoizedState.tag & 1) {
    if (n.flags |= 2048, Kn(9, aa.bind(null, n, r, l, t), void 0, null), Z === null) throw Error(y(349));
    Nt & 30 || sa(n, t, l);
  }
  return l;
}
function sa(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = $.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, $.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function aa(e, t, n, r) {
  t.value = n, t.getSnapshot = r, ca(t) && da(e);
}
function fa(e, t, n) {
  return n(function() {
    ca(t) && da(e);
  });
}
function ca(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Oe(e, n);
  } catch {
    return !0;
  }
}
function da(e) {
  var t = Ke(e, 1);
  t !== null && Me(t, e, 1, -1);
}
function wi(e) {
  var t = Ie();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Qn, lastRenderedState: e }, t.queue = e, e = e.dispatch = ed.bind(null, $, e), [t.memoizedState, e];
}
function Kn(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = $.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, $.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function pa() {
  return _e().memoizedState;
}
function _r(e, t, n, r) {
  var l = Ie();
  $.flags |= e, l.memoizedState = Kn(1 | t, n, void 0, r === void 0 ? null : r);
}
function il(e, t, n, r) {
  var l = _e();
  r = r === void 0 ? null : r;
  var u = void 0;
  if (K !== null) {
    var o = K.memoizedState;
    if (u = o.destroy, r !== null && vo(r, o.deps)) {
      l.memoizedState = Kn(t, n, u, r);
      return;
    }
  }
  $.flags |= e, l.memoizedState = Kn(1 | t, n, u, r);
}
function Si(e, t) {
  return _r(8390656, 8, e, t);
}
function go(e, t) {
  return il(2048, 8, e, t);
}
function ma(e, t) {
  return il(4, 2, e, t);
}
function va(e, t) {
  return il(4, 4, e, t);
}
function ha(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function ya(e, t, n) {
  return n = n != null ? n.concat([e]) : null, il(4, 4, ha.bind(null, t, e), n);
}
function wo() {
}
function ga(e, t) {
  var n = _e();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && vo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function wa(e, t) {
  var n = _e();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && vo(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Sa(e, t, n) {
  return Nt & 21 ? (Oe(n, t) || (n = _s(), $.lanes |= n, zt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, ae = !0), e.memoizedState = n);
}
function qc(e, t) {
  var n = M;
  M = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Ul.transition;
  Ul.transition = {};
  try {
    e(!1), t();
  } finally {
    M = n, Ul.transition = r;
  }
}
function ka() {
  return _e().memoizedState;
}
function bc(e, t, n) {
  var r = at(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Ea(e)) xa(t, n);
  else if (n = ra(e, t, n, r), n !== null) {
    var l = ue();
    Me(n, e, r, l), Ca(n, t, r);
  }
}
function ed(e, t, n) {
  var r = at(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Ea(e)) xa(t, l);
  else {
    var u = e.alternate;
    if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null)) try {
      var o = t.lastRenderedState, i = u(o, n);
      if (l.hasEagerState = !0, l.eagerState = i, Oe(i, o)) {
        var s = t.interleaved;
        s === null ? (l.next = l, ao(t)) : (l.next = s.next, s.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = ra(e, t, l, r), n !== null && (l = ue(), Me(n, e, r, l), Ca(n, t, r));
  }
}
function Ea(e) {
  var t = e.alternate;
  return e === $ || t !== null && t === $;
}
function xa(e, t) {
  Nn = Yr = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Ca(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Gu(e, n);
  }
}
var Xr = { readContext: Ce, useCallback: ee, useContext: ee, useEffect: ee, useImperativeHandle: ee, useInsertionEffect: ee, useLayoutEffect: ee, useMemo: ee, useReducer: ee, useRef: ee, useState: ee, useDebugValue: ee, useDeferredValue: ee, useTransition: ee, useMutableSource: ee, useSyncExternalStore: ee, useId: ee, unstable_isNewReconciler: !1 }, td = { readContext: Ce, useCallback: function(e, t) {
  return Ie().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Ce, useEffect: Si, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, _r(
    4194308,
    4,
    ha.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return _r(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return _r(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ie();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Ie();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = bc.bind(null, $, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Ie();
  return e = { current: e }, t.memoizedState = e;
}, useState: wi, useDebugValue: wo, useDeferredValue: function(e) {
  return Ie().memoizedState = e;
}, useTransition: function() {
  var e = wi(!1), t = e[0];
  return e = qc.bind(null, e[1]), Ie().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = $, l = Ie();
  if (j) {
    if (n === void 0) throw Error(y(407));
    n = n();
  } else {
    if (n = t(), Z === null) throw Error(y(349));
    Nt & 30 || sa(r, t, n);
  }
  l.memoizedState = n;
  var u = { value: n, getSnapshot: t };
  return l.queue = u, Si(fa.bind(
    null,
    r,
    u,
    e
  ), [e]), r.flags |= 2048, Kn(9, aa.bind(null, r, u, n, t), void 0, null), n;
}, useId: function() {
  var e = Ie(), t = Z.identifierPrefix;
  if (j) {
    var n = Be, r = Ae;
    n = (r & ~(1 << 32 - Re(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Wn++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Jc++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, nd = {
  readContext: Ce,
  useCallback: ga,
  useContext: Ce,
  useEffect: go,
  useImperativeHandle: ya,
  useInsertionEffect: ma,
  useLayoutEffect: va,
  useMemo: wa,
  useReducer: $l,
  useRef: pa,
  useState: function() {
    return $l(Qn);
  },
  useDebugValue: wo,
  useDeferredValue: function(e) {
    var t = _e();
    return Sa(t, K.memoizedState, e);
  },
  useTransition: function() {
    var e = $l(Qn)[0], t = _e().memoizedState;
    return [e, t];
  },
  useMutableSource: oa,
  useSyncExternalStore: ia,
  useId: ka,
  unstable_isNewReconciler: !1
}, rd = { readContext: Ce, useCallback: ga, useContext: Ce, useEffect: go, useImperativeHandle: ya, useInsertionEffect: ma, useLayoutEffect: va, useMemo: wa, useReducer: Vl, useRef: pa, useState: function() {
  return Vl(Qn);
}, useDebugValue: wo, useDeferredValue: function(e) {
  var t = _e();
  return K === null ? t.memoizedState = e : Sa(t, K.memoizedState, e);
}, useTransition: function() {
  var e = Vl(Qn)[0], t = _e().memoizedState;
  return [e, t];
}, useMutableSource: oa, useSyncExternalStore: ia, useId: ka, unstable_isNewReconciler: !1 };
function ze(e, t) {
  if (e && e.defaultProps) {
    t = V({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function ku(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : V({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var sl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Rt(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = ue(), l = at(e), u = He(r, l);
  u.payload = t, n != null && (u.callback = n), t = it(e, u, l), t !== null && (Me(t, e, l, r), xr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = ue(), l = at(e), u = He(r, l);
  u.tag = 1, u.payload = t, n != null && (u.callback = n), t = it(e, u, l), t !== null && (Me(t, e, l, r), xr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = ue(), r = at(e), l = He(n, r);
  l.tag = 2, t != null && (l.callback = t), t = it(e, l, r), t !== null && (Me(t, e, r, n), xr(t, e, r));
} };
function ki(e, t, n, r, l, u, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, u, o) : t.prototype && t.prototype.isPureReactComponent ? !Un(n, r) || !Un(l, u) : !0;
}
function _a(e, t, n) {
  var r = !1, l = dt, u = t.contextType;
  return typeof u == "object" && u !== null ? u = Ce(u) : (l = ce(t) ? _t : re.current, r = t.contextTypes, u = (r = r != null) ? qt(e, l) : dt), t = new t(n, u), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = sl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = u), t;
}
function Ei(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && sl.enqueueReplaceState(t, t.state, null);
}
function Eu(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, fo(e);
  var u = t.contextType;
  typeof u == "object" && u !== null ? l.context = Ce(u) : (u = ce(t) ? _t : re.current, l.context = qt(e, u)), l.state = e.memoizedState, u = t.getDerivedStateFromProps, typeof u == "function" && (ku(e, t, u, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && sl.enqueueReplaceState(l, l.state, null), Qr(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function nn(e, t) {
  try {
    var n = "", r = t;
    do
      n += Rf(r), r = r.return;
    while (r);
    var l = n;
  } catch (u) {
    l = `
Error generating stack: ` + u.message + `
` + u.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Al(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function xu(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var ld = typeof WeakMap == "function" ? WeakMap : Map;
function Pa(e, t, n) {
  n = He(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    Zr || (Zr = !0, Ou = r), xu(e, t);
  }, n;
}
function Na(e, t, n) {
  n = He(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      xu(e, t);
    };
  }
  var u = e.stateNode;
  return u !== null && typeof u.componentDidCatch == "function" && (n.callback = function() {
    xu(e, t), typeof r != "function" && (st === null ? st = /* @__PURE__ */ new Set([this]) : st.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function xi(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new ld();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = gd.bind(null, e, t, n), t.then(e, e));
}
function Ci(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function _i(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = He(-1, 1), t.tag = 2, it(n, t, 1))), n.lanes |= 1), e);
}
var ud = Xe.ReactCurrentOwner, ae = !1;
function le(e, t, n, r) {
  t.child = e === null ? na(t, null, n, r) : en(t, e.child, n, r);
}
function Pi(e, t, n, r, l) {
  n = n.render;
  var u = t.ref;
  return Gt(t, l), r = ho(e, t, n, r, u, l), n = yo(), e !== null && !ae ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Ye(e, t, l)) : (j && n && ro(t), t.flags |= 1, le(e, t, r, l), t.child);
}
function Ni(e, t, n, r, l) {
  if (e === null) {
    var u = n.type;
    return typeof u == "function" && !No(u) && u.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = u, za(e, t, u, r, l)) : (e = Tr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (u = e.child, !(e.lanes & l)) {
    var o = u.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Un, n(o, r) && e.ref === t.ref) return Ye(e, t, l);
  }
  return t.flags |= 1, e = ft(u, r), e.ref = t.ref, e.return = t, t.child = e;
}
function za(e, t, n, r, l) {
  if (e !== null) {
    var u = e.memoizedProps;
    if (Un(u, r) && e.ref === t.ref) if (ae = !1, t.pendingProps = r = u, (e.lanes & l) !== 0) e.flags & 131072 && (ae = !0);
    else return t.lanes = e.lanes, Ye(e, t, l);
  }
  return Cu(e, t, n, r, l);
}
function Ta(e, t, n) {
  var r = t.pendingProps, l = r.children, u = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, O(Wt, pe), pe |= n;
  else {
    if (!(n & 1073741824)) return e = u !== null ? u.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, O(Wt, pe), pe |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = u !== null ? u.baseLanes : n, O(Wt, pe), pe |= r;
  }
  else u !== null ? (r = u.baseLanes | n, t.memoizedState = null) : r = n, O(Wt, pe), pe |= r;
  return le(e, t, l, n), t.child;
}
function La(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Cu(e, t, n, r, l) {
  var u = ce(n) ? _t : re.current;
  return u = qt(t, u), Gt(t, l), n = ho(e, t, n, r, u, l), r = yo(), e !== null && !ae ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Ye(e, t, l)) : (j && r && ro(t), t.flags |= 1, le(e, t, n, l), t.child);
}
function zi(e, t, n, r, l) {
  if (ce(n)) {
    var u = !0;
    Vr(t);
  } else u = !1;
  if (Gt(t, l), t.stateNode === null) Pr(e, t), _a(t, n, r), Eu(t, n, r, l), r = !0;
  else if (e === null) {
    var o = t.stateNode, i = t.memoizedProps;
    o.props = i;
    var s = o.context, f = n.contextType;
    typeof f == "object" && f !== null ? f = Ce(f) : (f = ce(n) ? _t : re.current, f = qt(t, f));
    var v = n.getDerivedStateFromProps, m = typeof v == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    m || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (i !== r || s !== f) && Ei(t, o, r, f), qe = !1;
    var p = t.memoizedState;
    o.state = p, Qr(t, r, o, l), s = t.memoizedState, i !== r || p !== s || fe.current || qe ? (typeof v == "function" && (ku(t, n, v, r), s = t.memoizedState), (i = qe || ki(t, n, i, r, p, s, f)) ? (m || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), o.props = r, o.state = s, o.context = f, r = i) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    o = t.stateNode, la(e, t), i = t.memoizedProps, f = t.type === t.elementType ? i : ze(t.type, i), o.props = f, m = t.pendingProps, p = o.context, s = n.contextType, typeof s == "object" && s !== null ? s = Ce(s) : (s = ce(n) ? _t : re.current, s = qt(t, s));
    var g = n.getDerivedStateFromProps;
    (v = typeof g == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (i !== m || p !== s) && Ei(t, o, r, s), qe = !1, p = t.memoizedState, o.state = p, Qr(t, r, o, l);
    var w = t.memoizedState;
    i !== m || p !== w || fe.current || qe ? (typeof g == "function" && (ku(t, n, g, r), w = t.memoizedState), (f = qe || ki(t, n, f, r, p, w, s) || !1) ? (v || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, w, s), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, w, s)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = w), o.props = r, o.state = w, o.context = s, r = f) : (typeof o.componentDidUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return _u(e, t, n, r, u, l);
}
function _u(e, t, n, r, l, u) {
  La(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return l && pi(t, n, !1), Ye(e, t, u);
  r = t.stateNode, ud.current = t;
  var i = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = en(t, e.child, null, u), t.child = en(t, null, i, u)) : le(e, t, i, u), t.memoizedState = r.state, l && pi(t, n, !0), t.child;
}
function Ra(e) {
  var t = e.stateNode;
  t.pendingContext ? di(e, t.pendingContext, t.pendingContext !== t.context) : t.context && di(e, t.context, !1), co(e, t.containerInfo);
}
function Ti(e, t, n, r, l) {
  return bt(), uo(l), t.flags |= 256, le(e, t, n, r), t.child;
}
var Pu = { dehydrated: null, treeContext: null, retryLane: 0 };
function Nu(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Ma(e, t, n) {
  var r = t.pendingProps, l = U.current, u = !1, o = (t.flags & 128) !== 0, i;
  if ((i = o) || (i = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), i ? (u = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), O(U, l & 1), e === null)
    return wu(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, u ? (r = t.mode, u = t.child, o = { mode: "hidden", children: o }, !(r & 1) && u !== null ? (u.childLanes = 0, u.pendingProps = o) : u = cl(o, r, 0, null), e = Ct(e, r, n, null), u.return = t, e.return = t, u.sibling = e, t.child = u, t.child.memoizedState = Nu(n), t.memoizedState = Pu, e) : So(t, o));
  if (l = e.memoizedState, l !== null && (i = l.dehydrated, i !== null)) return od(e, t, o, r, i, l, n);
  if (u) {
    u = r.fallback, o = t.mode, l = e.child, i = l.sibling;
    var s = { mode: "hidden", children: r.children };
    return !(o & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = ft(l, s), r.subtreeFlags = l.subtreeFlags & 14680064), i !== null ? u = ft(i, u) : (u = Ct(u, o, n, null), u.flags |= 2), u.return = t, r.return = t, r.sibling = u, t.child = r, r = u, u = t.child, o = e.child.memoizedState, o = o === null ? Nu(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, u.memoizedState = o, u.childLanes = e.childLanes & ~n, t.memoizedState = Pu, r;
  }
  return u = e.child, e = u.sibling, r = ft(u, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function So(e, t) {
  return t = cl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function mr(e, t, n, r) {
  return r !== null && uo(r), en(t, e.child, null, n), e = So(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function od(e, t, n, r, l, u, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Al(Error(y(422))), mr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (u = r.fallback, l = t.mode, r = cl({ mode: "visible", children: r.children }, l, 0, null), u = Ct(u, l, o, null), u.flags |= 2, r.return = t, u.return = t, r.sibling = u, t.child = r, t.mode & 1 && en(t, e.child, null, o), t.child.memoizedState = Nu(o), t.memoizedState = Pu, u);
  if (!(t.mode & 1)) return mr(e, t, o, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var i = r.dgst;
    return r = i, u = Error(y(419)), r = Al(u, r, void 0), mr(e, t, o, r);
  }
  if (i = (o & e.childLanes) !== 0, ae || i) {
    if (r = Z, r !== null) {
      switch (o & -o) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      l = l & (r.suspendedLanes | o) ? 0 : l, l !== 0 && l !== u.retryLane && (u.retryLane = l, Ke(e, l), Me(r, e, l, -1));
    }
    return Po(), r = Al(Error(y(421))), mr(e, t, o, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = wd.bind(null, e), l._reactRetry = t, null) : (e = u.treeContext, ve = ot(l.nextSibling), he = t, j = !0, Le = null, e !== null && (Se[ke++] = Ae, Se[ke++] = Be, Se[ke++] = Pt, Ae = e.id, Be = e.overflow, Pt = t), t = So(t, r.children), t.flags |= 4096, t);
}
function Li(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Su(e.return, t, n);
}
function Bl(e, t, n, r, l) {
  var u = e.memoizedState;
  u === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (u.isBackwards = t, u.rendering = null, u.renderingStartTime = 0, u.last = r, u.tail = n, u.tailMode = l);
}
function Oa(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, u = r.tail;
  if (le(e, t, r.children, n), r = U.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Li(e, n, t);
      else if (e.tag === 19) Li(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    r &= 1;
  }
  if (O(U, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && Kr(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Bl(t, !1, l, n, u);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && Kr(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      Bl(t, !0, n, null, u);
      break;
    case "together":
      Bl(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Pr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Ye(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), zt |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(y(153));
  if (t.child !== null) {
    for (e = t.child, n = ft(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = ft(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function id(e, t, n) {
  switch (t.tag) {
    case 3:
      Ra(t), bt();
      break;
    case 5:
      ua(t);
      break;
    case 1:
      ce(t.type) && Vr(t);
      break;
    case 4:
      co(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      O(Hr, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (O(U, U.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Ma(e, t, n) : (O(U, U.current & 1), e = Ye(e, t, n), e !== null ? e.sibling : null);
      O(U, U.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Oa(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), O(U, U.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Ta(e, t, n);
  }
  return Ye(e, t, n);
}
var Da, zu, Ia, Fa;
Da = function(e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
zu = function() {
};
Ia = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Et(Ue.current);
    var u = null;
    switch (n) {
      case "input":
        l = Zl(e, l), r = Zl(e, r), u = [];
        break;
      case "select":
        l = V({}, l, { value: void 0 }), r = V({}, r, { value: void 0 }), u = [];
        break;
      case "textarea":
        l = bl(e, l), r = bl(e, r), u = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Ur);
    }
    tu(n, r);
    var o;
    n = null;
    for (f in l) if (!r.hasOwnProperty(f) && l.hasOwnProperty(f) && l[f] != null) if (f === "style") {
      var i = l[f];
      for (o in i) i.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
    } else f !== "dangerouslySetInnerHTML" && f !== "children" && f !== "suppressContentEditableWarning" && f !== "suppressHydrationWarning" && f !== "autoFocus" && (Rn.hasOwnProperty(f) ? u || (u = []) : (u = u || []).push(f, null));
    for (f in r) {
      var s = r[f];
      if (i = l != null ? l[f] : void 0, r.hasOwnProperty(f) && s !== i && (s != null || i != null)) if (f === "style") if (i) {
        for (o in i) !i.hasOwnProperty(o) || s && s.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
        for (o in s) s.hasOwnProperty(o) && i[o] !== s[o] && (n || (n = {}), n[o] = s[o]);
      } else n || (u || (u = []), u.push(
        f,
        n
      )), n = s;
      else f === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, i = i ? i.__html : void 0, s != null && i !== s && (u = u || []).push(f, s)) : f === "children" ? typeof s != "string" && typeof s != "number" || (u = u || []).push(f, "" + s) : f !== "suppressContentEditableWarning" && f !== "suppressHydrationWarning" && (Rn.hasOwnProperty(f) ? (s != null && f === "onScroll" && D("scroll", e), u || i === s || (u = [])) : (u = u || []).push(f, s));
    }
    n && (u = u || []).push("style", n);
    var f = u;
    (t.updateQueue = f) && (t.flags |= 4);
  }
};
Fa = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function hn(e, t) {
  if (!j) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
      n === null ? e.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = e.tail;
      for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
      r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
  }
}
function te(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function sd(e, t, n) {
  var r = t.pendingProps;
  switch (lo(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return te(t), null;
    case 1:
      return ce(t.type) && $r(), te(t), null;
    case 3:
      return r = t.stateNode, tn(), I(fe), I(re), mo(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (dr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Le !== null && (Fu(Le), Le = null))), zu(e, t), te(t), null;
    case 5:
      po(t);
      var l = Et(Hn.current);
      if (n = t.type, e !== null && t.stateNode != null) Ia(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(y(166));
          return te(t), null;
        }
        if (e = Et(Ue.current), dr(t)) {
          r = t.stateNode, n = t.type;
          var u = t.memoizedProps;
          switch (r[Fe] = t, r[An] = u, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              D("cancel", r), D("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < kn.length; l++) D(kn[l], r);
              break;
            case "source":
              D("error", r);
              break;
            case "img":
            case "image":
            case "link":
              D(
                "error",
                r
              ), D("load", r);
              break;
            case "details":
              D("toggle", r);
              break;
            case "input":
              $o(r, u), D("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!u.multiple }, D("invalid", r);
              break;
            case "textarea":
              Ao(r, u), D("invalid", r);
          }
          tu(n, u), l = null;
          for (var o in u) if (u.hasOwnProperty(o)) {
            var i = u[o];
            o === "children" ? typeof i == "string" ? r.textContent !== i && (u.suppressHydrationWarning !== !0 && cr(r.textContent, i, e), l = ["children", i]) : typeof i == "number" && r.textContent !== "" + i && (u.suppressHydrationWarning !== !0 && cr(
              r.textContent,
              i,
              e
            ), l = ["children", "" + i]) : Rn.hasOwnProperty(o) && i != null && o === "onScroll" && D("scroll", r);
          }
          switch (n) {
            case "input":
              rr(r), Vo(r, u, !0);
              break;
            case "textarea":
              rr(r), Bo(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof u.onClick == "function" && (r.onclick = Ur);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = fs(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, { is: r.is }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[Fe] = t, e[An] = r, Da(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = nu(n, r), n) {
              case "dialog":
                D("cancel", e), D("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < kn.length; l++) D(kn[l], e);
                l = r;
                break;
              case "source":
                D("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  e
                ), D("load", e), l = r;
                break;
              case "details":
                D("toggle", e), l = r;
                break;
              case "input":
                $o(e, r), l = Zl(e, r), D("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = V({}, r, { value: void 0 }), D("invalid", e);
                break;
              case "textarea":
                Ao(e, r), l = bl(e, r), D("invalid", e);
                break;
              default:
                l = r;
            }
            tu(n, l), i = l;
            for (u in i) if (i.hasOwnProperty(u)) {
              var s = i[u];
              u === "style" ? ps(e, s) : u === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && cs(e, s)) : u === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && Mn(e, s) : typeof s == "number" && Mn(e, "" + s) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (Rn.hasOwnProperty(u) ? s != null && u === "onScroll" && D("scroll", e) : s != null && Hu(e, u, s, o));
            }
            switch (n) {
              case "input":
                rr(e), Vo(e, r, !1);
                break;
              case "textarea":
                rr(e), Bo(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + ct(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, u = r.value, u != null ? Qt(e, !!r.multiple, u, !1) : r.defaultValue != null && Qt(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Ur);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return te(t), null;
    case 6:
      if (e && t.stateNode != null) Fa(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(y(166));
        if (n = Et(Hn.current), Et(Ue.current), dr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Fe] = t, (u = r.nodeValue !== n) && (e = he, e !== null)) switch (e.tag) {
            case 3:
              cr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && cr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          u && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Fe] = t, t.stateNode = r;
      }
      return te(t), null;
    case 13:
      if (I(U), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (j && ve !== null && t.mode & 1 && !(t.flags & 128)) ea(), bt(), t.flags |= 98560, u = !1;
        else if (u = dr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!u) throw Error(y(318));
            if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(y(317));
            u[Fe] = t;
          } else bt(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          te(t), u = !1;
        } else Le !== null && (Fu(Le), Le = null), u = !0;
        if (!u) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || U.current & 1 ? Y === 0 && (Y = 3) : Po())), t.updateQueue !== null && (t.flags |= 4), te(t), null);
    case 4:
      return tn(), zu(e, t), e === null && $n(t.stateNode.containerInfo), te(t), null;
    case 10:
      return so(t.type._context), te(t), null;
    case 17:
      return ce(t.type) && $r(), te(t), null;
    case 19:
      if (I(U), u = t.memoizedState, u === null) return te(t), null;
      if (r = (t.flags & 128) !== 0, o = u.rendering, o === null) if (r) hn(u, !1);
      else {
        if (Y !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (o = Kr(e), o !== null) {
            for (t.flags |= 128, hn(u, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) u = n, e = r, u.flags &= 14680066, o = u.alternate, o === null ? (u.childLanes = 0, u.lanes = e, u.child = null, u.subtreeFlags = 0, u.memoizedProps = null, u.memoizedState = null, u.updateQueue = null, u.dependencies = null, u.stateNode = null) : (u.childLanes = o.childLanes, u.lanes = o.lanes, u.child = o.child, u.subtreeFlags = 0, u.deletions = null, u.memoizedProps = o.memoizedProps, u.memoizedState = o.memoizedState, u.updateQueue = o.updateQueue, u.type = o.type, e = o.dependencies, u.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return O(U, U.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        u.tail !== null && W() > rn && (t.flags |= 128, r = !0, hn(u, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = Kr(o), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), hn(u, !0), u.tail === null && u.tailMode === "hidden" && !o.alternate && !j) return te(t), null;
        } else 2 * W() - u.renderingStartTime > rn && n !== 1073741824 && (t.flags |= 128, r = !0, hn(u, !1), t.lanes = 4194304);
        u.isBackwards ? (o.sibling = t.child, t.child = o) : (n = u.last, n !== null ? n.sibling = o : t.child = o, u.last = o);
      }
      return u.tail !== null ? (t = u.tail, u.rendering = t, u.tail = t.sibling, u.renderingStartTime = W(), t.sibling = null, n = U.current, O(U, r ? n & 1 | 2 : n & 1), t) : (te(t), null);
    case 22:
    case 23:
      return _o(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? pe & 1073741824 && (te(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : te(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(y(156, t.tag));
}
function ad(e, t) {
  switch (lo(t), t.tag) {
    case 1:
      return ce(t.type) && $r(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return tn(), I(fe), I(re), mo(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return po(t), null;
    case 13:
      if (I(U), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(y(340));
        bt();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return I(U), null;
    case 4:
      return tn(), null;
    case 10:
      return so(t.type._context), null;
    case 22:
    case 23:
      return _o(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var vr = !1, ne = !1, fd = typeof WeakSet == "function" ? WeakSet : Set, k = null;
function Ht(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    A(e, t, r);
  }
  else n.current = null;
}
function Tu(e, t, n) {
  try {
    n();
  } catch (r) {
    A(e, t, r);
  }
}
var Ri = !1;
function cd(e, t) {
  if (du = Ir, e = As(), no(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var r = n.getSelection && n.getSelection();
      if (r && r.rangeCount !== 0) {
        n = r.anchorNode;
        var l = r.anchorOffset, u = r.focusNode;
        r = r.focusOffset;
        try {
          n.nodeType, u.nodeType;
        } catch {
          n = null;
          break e;
        }
        var o = 0, i = -1, s = -1, f = 0, v = 0, m = e, p = null;
        t: for (; ; ) {
          for (var g; m !== n || l !== 0 && m.nodeType !== 3 || (i = o + l), m !== u || r !== 0 && m.nodeType !== 3 || (s = o + r), m.nodeType === 3 && (o += m.nodeValue.length), (g = m.firstChild) !== null; )
            p = m, m = g;
          for (; ; ) {
            if (m === e) break t;
            if (p === n && ++f === l && (i = o), p === u && ++v === r && (s = o), (g = m.nextSibling) !== null) break;
            m = p, p = m.parentNode;
          }
          m = g;
        }
        n = i === -1 || s === -1 ? null : { start: i, end: s };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (pu = { focusedElem: e, selectionRange: n }, Ir = !1, k = t; k !== null; ) if (t = k, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, k = e;
  else for (; k !== null; ) {
    t = k;
    try {
      var w = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (w !== null) {
            var S = w.memoizedProps, F = w.memoizedState, c = t.stateNode, a = c.getSnapshotBeforeUpdate(t.elementType === t.type ? S : ze(t.type, S), F);
            c.__reactInternalSnapshotBeforeUpdate = a;
          }
          break;
        case 3:
          var d = t.stateNode.containerInfo;
          d.nodeType === 1 ? d.textContent = "" : d.nodeType === 9 && d.documentElement && d.removeChild(d.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(y(163));
      }
    } catch (h) {
      A(t, t.return, h);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, k = e;
      break;
    }
    k = t.return;
  }
  return w = Ri, Ri = !1, w;
}
function zn(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var u = l.destroy;
        l.destroy = void 0, u !== void 0 && Tu(t, n, u);
      }
      l = l.next;
    } while (l !== r);
  }
}
function al(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Lu(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function ja(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, ja(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Fe], delete t[An], delete t[hu], delete t[Yc], delete t[Xc])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Ua(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Mi(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Ua(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Ru(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Ur));
  else if (r !== 4 && (e = e.child, e !== null)) for (Ru(e, t, n), e = e.sibling; e !== null; ) Ru(e, t, n), e = e.sibling;
}
function Mu(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Mu(e, t, n), e = e.sibling; e !== null; ) Mu(e, t, n), e = e.sibling;
}
var J = null, Te = !1;
function Ze(e, t, n) {
  for (n = n.child; n !== null; ) $a(e, t, n), n = n.sibling;
}
function $a(e, t, n) {
  if (je && typeof je.onCommitFiberUnmount == "function") try {
    je.onCommitFiberUnmount(tl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      ne || Ht(n, t);
    case 6:
      var r = J, l = Te;
      J = null, Ze(e, t, n), J = r, Te = l, J !== null && (Te ? (e = J, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : J.removeChild(n.stateNode));
      break;
    case 18:
      J !== null && (Te ? (e = J, n = n.stateNode, e.nodeType === 8 ? Il(e.parentNode, n) : e.nodeType === 1 && Il(e, n), Fn(e)) : Il(J, n.stateNode));
      break;
    case 4:
      r = J, l = Te, J = n.stateNode.containerInfo, Te = !0, Ze(e, t, n), J = r, Te = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ne && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var u = l, o = u.destroy;
          u = u.tag, o !== void 0 && (u & 2 || u & 4) && Tu(n, t, o), l = l.next;
        } while (l !== r);
      }
      Ze(e, t, n);
      break;
    case 1:
      if (!ne && (Ht(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (i) {
        A(n, t, i);
      }
      Ze(e, t, n);
      break;
    case 21:
      Ze(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (ne = (r = ne) || n.memoizedState !== null, Ze(e, t, n), ne = r) : Ze(e, t, n);
      break;
    default:
      Ze(e, t, n);
  }
}
function Oi(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new fd()), t.forEach(function(r) {
      var l = Sd.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function Ne(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var u = e, o = t, i = o;
      e: for (; i !== null; ) {
        switch (i.tag) {
          case 5:
            J = i.stateNode, Te = !1;
            break e;
          case 3:
            J = i.stateNode.containerInfo, Te = !0;
            break e;
          case 4:
            J = i.stateNode.containerInfo, Te = !0;
            break e;
        }
        i = i.return;
      }
      if (J === null) throw Error(y(160));
      $a(u, o, l), J = null, Te = !1;
      var s = l.alternate;
      s !== null && (s.return = null), l.return = null;
    } catch (f) {
      A(l, t, f);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Va(t, e), t = t.sibling;
}
function Va(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Ne(t, e), De(e), r & 4) {
        try {
          zn(3, e, e.return), al(3, e);
        } catch (S) {
          A(e, e.return, S);
        }
        try {
          zn(5, e, e.return);
        } catch (S) {
          A(e, e.return, S);
        }
      }
      break;
    case 1:
      Ne(t, e), De(e), r & 512 && n !== null && Ht(n, n.return);
      break;
    case 5:
      if (Ne(t, e), De(e), r & 512 && n !== null && Ht(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Mn(l, "");
        } catch (S) {
          A(e, e.return, S);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var u = e.memoizedProps, o = n !== null ? n.memoizedProps : u, i = e.type, s = e.updateQueue;
        if (e.updateQueue = null, s !== null) try {
          i === "input" && u.type === "radio" && u.name != null && ss(l, u), nu(i, o);
          var f = nu(i, u);
          for (o = 0; o < s.length; o += 2) {
            var v = s[o], m = s[o + 1];
            v === "style" ? ps(l, m) : v === "dangerouslySetInnerHTML" ? cs(l, m) : v === "children" ? Mn(l, m) : Hu(l, v, m, f);
          }
          switch (i) {
            case "input":
              Jl(l, u);
              break;
            case "textarea":
              as(l, u);
              break;
            case "select":
              var p = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!u.multiple;
              var g = u.value;
              g != null ? Qt(l, !!u.multiple, g, !1) : p !== !!u.multiple && (u.defaultValue != null ? Qt(
                l,
                !!u.multiple,
                u.defaultValue,
                !0
              ) : Qt(l, !!u.multiple, u.multiple ? [] : "", !1));
          }
          l[An] = u;
        } catch (S) {
          A(e, e.return, S);
        }
      }
      break;
    case 6:
      if (Ne(t, e), De(e), r & 4) {
        if (e.stateNode === null) throw Error(y(162));
        l = e.stateNode, u = e.memoizedProps;
        try {
          l.nodeValue = u;
        } catch (S) {
          A(e, e.return, S);
        }
      }
      break;
    case 3:
      if (Ne(t, e), De(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Fn(t.containerInfo);
      } catch (S) {
        A(e, e.return, S);
      }
      break;
    case 4:
      Ne(t, e), De(e);
      break;
    case 13:
      Ne(t, e), De(e), l = e.child, l.flags & 8192 && (u = l.memoizedState !== null, l.stateNode.isHidden = u, !u || l.alternate !== null && l.alternate.memoizedState !== null || (xo = W())), r & 4 && Oi(e);
      break;
    case 22:
      if (v = n !== null && n.memoizedState !== null, e.mode & 1 ? (ne = (f = ne) || v, Ne(t, e), ne = f) : Ne(t, e), De(e), r & 8192) {
        if (f = e.memoizedState !== null, (e.stateNode.isHidden = f) && !v && e.mode & 1) for (k = e, v = e.child; v !== null; ) {
          for (m = k = v; k !== null; ) {
            switch (p = k, g = p.child, p.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                zn(4, p, p.return);
                break;
              case 1:
                Ht(p, p.return);
                var w = p.stateNode;
                if (typeof w.componentWillUnmount == "function") {
                  r = p, n = p.return;
                  try {
                    t = r, w.props = t.memoizedProps, w.state = t.memoizedState, w.componentWillUnmount();
                  } catch (S) {
                    A(r, n, S);
                  }
                }
                break;
              case 5:
                Ht(p, p.return);
                break;
              case 22:
                if (p.memoizedState !== null) {
                  Ii(m);
                  continue;
                }
            }
            g !== null ? (g.return = p, k = g) : Ii(m);
          }
          v = v.sibling;
        }
        e: for (v = null, m = e; ; ) {
          if (m.tag === 5) {
            if (v === null) {
              v = m;
              try {
                l = m.stateNode, f ? (u = l.style, typeof u.setProperty == "function" ? u.setProperty("display", "none", "important") : u.display = "none") : (i = m.stateNode, s = m.memoizedProps.style, o = s != null && s.hasOwnProperty("display") ? s.display : null, i.style.display = ds("display", o));
              } catch (S) {
                A(e, e.return, S);
              }
            }
          } else if (m.tag === 6) {
            if (v === null) try {
              m.stateNode.nodeValue = f ? "" : m.memoizedProps;
            } catch (S) {
              A(e, e.return, S);
            }
          } else if ((m.tag !== 22 && m.tag !== 23 || m.memoizedState === null || m === e) && m.child !== null) {
            m.child.return = m, m = m.child;
            continue;
          }
          if (m === e) break e;
          for (; m.sibling === null; ) {
            if (m.return === null || m.return === e) break e;
            v === m && (v = null), m = m.return;
          }
          v === m && (v = null), m.sibling.return = m.return, m = m.sibling;
        }
      }
      break;
    case 19:
      Ne(t, e), De(e), r & 4 && Oi(e);
      break;
    case 21:
      break;
    default:
      Ne(
        t,
        e
      ), De(e);
  }
}
function De(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Ua(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(y(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Mn(l, ""), r.flags &= -33);
          var u = Mi(e);
          Mu(e, u, l);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo, i = Mi(e);
          Ru(e, i, o);
          break;
        default:
          throw Error(y(161));
      }
    } catch (s) {
      A(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function dd(e, t, n) {
  k = e, Aa(e);
}
function Aa(e, t, n) {
  for (var r = (e.mode & 1) !== 0; k !== null; ) {
    var l = k, u = l.child;
    if (l.tag === 22 && r) {
      var o = l.memoizedState !== null || vr;
      if (!o) {
        var i = l.alternate, s = i !== null && i.memoizedState !== null || ne;
        i = vr;
        var f = ne;
        if (vr = o, (ne = s) && !f) for (k = l; k !== null; ) o = k, s = o.child, o.tag === 22 && o.memoizedState !== null ? Fi(l) : s !== null ? (s.return = o, k = s) : Fi(l);
        for (; u !== null; ) k = u, Aa(u), u = u.sibling;
        k = l, vr = i, ne = f;
      }
      Di(e);
    } else l.subtreeFlags & 8772 && u !== null ? (u.return = l, k = u) : Di(e);
  }
}
function Di(e) {
  for (; k !== null; ) {
    var t = k;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            ne || al(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !ne) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : ze(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var u = t.updateQueue;
            u !== null && gi(t, u, r);
            break;
          case 3:
            var o = t.updateQueue;
            if (o !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              gi(t, o, n);
            }
            break;
          case 5:
            var i = t.stateNode;
            if (n === null && t.flags & 4) {
              n = i;
              var s = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  s.autoFocus && n.focus();
                  break;
                case "img":
                  s.src && (n.src = s.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var f = t.alternate;
              if (f !== null) {
                var v = f.memoizedState;
                if (v !== null) {
                  var m = v.dehydrated;
                  m !== null && Fn(m);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(y(163));
        }
        ne || t.flags & 512 && Lu(t);
      } catch (p) {
        A(t, t.return, p);
      }
    }
    if (t === e) {
      k = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, k = n;
      break;
    }
    k = t.return;
  }
}
function Ii(e) {
  for (; k !== null; ) {
    var t = k;
    if (t === e) {
      k = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, k = n;
      break;
    }
    k = t.return;
  }
}
function Fi(e) {
  for (; k !== null; ) {
    var t = k;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            al(4, t);
          } catch (s) {
            A(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              A(t, l, s);
            }
          }
          var u = t.return;
          try {
            Lu(t);
          } catch (s) {
            A(t, u, s);
          }
          break;
        case 5:
          var o = t.return;
          try {
            Lu(t);
          } catch (s) {
            A(t, o, s);
          }
      }
    } catch (s) {
      A(t, t.return, s);
    }
    if (t === e) {
      k = null;
      break;
    }
    var i = t.sibling;
    if (i !== null) {
      i.return = t.return, k = i;
      break;
    }
    k = t.return;
  }
}
var pd = Math.ceil, Gr = Xe.ReactCurrentDispatcher, ko = Xe.ReactCurrentOwner, xe = Xe.ReactCurrentBatchConfig, R = 0, Z = null, Q = null, q = 0, pe = 0, Wt = mt(0), Y = 0, Yn = null, zt = 0, fl = 0, Eo = 0, Tn = null, se = null, xo = 0, rn = 1 / 0, $e = null, Zr = !1, Ou = null, st = null, hr = !1, nt = null, Jr = 0, Ln = 0, Du = null, Nr = -1, zr = 0;
function ue() {
  return R & 6 ? W() : Nr !== -1 ? Nr : Nr = W();
}
function at(e) {
  return e.mode & 1 ? R & 2 && q !== 0 ? q & -q : Zc.transition !== null ? (zr === 0 && (zr = _s()), zr) : (e = M, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Ms(e.type)), e) : 1;
}
function Me(e, t, n, r) {
  if (50 < Ln) throw Ln = 0, Du = null, Error(y(185));
  Gn(e, n, r), (!(R & 2) || e !== Z) && (e === Z && (!(R & 2) && (fl |= n), Y === 4 && et(e, q)), de(e, r), n === 1 && R === 0 && !(t.mode & 1) && (rn = W() + 500, ol && vt()));
}
function de(e, t) {
  var n = e.callbackNode;
  Zf(e, t);
  var r = Dr(e, e === Z ? q : 0);
  if (r === 0) n !== null && Qo(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Qo(n), t === 1) e.tag === 0 ? Gc(ji.bind(null, e)) : Js(ji.bind(null, e)), Qc(function() {
      !(R & 6) && vt();
    }), n = null;
    else {
      switch (Ps(r)) {
        case 1:
          n = Xu;
          break;
        case 4:
          n = xs;
          break;
        case 16:
          n = Or;
          break;
        case 536870912:
          n = Cs;
          break;
        default:
          n = Or;
      }
      n = Ga(n, Ba.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Ba(e, t) {
  if (Nr = -1, zr = 0, R & 6) throw Error(y(327));
  var n = e.callbackNode;
  if (Zt() && e.callbackNode !== n) return null;
  var r = Dr(e, e === Z ? q : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = qr(e, r);
  else {
    t = r;
    var l = R;
    R |= 2;
    var u = Wa();
    (Z !== e || q !== t) && ($e = null, rn = W() + 500, xt(e, t));
    do
      try {
        hd();
        break;
      } catch (i) {
        Ha(e, i);
      }
    while (!0);
    io(), Gr.current = u, R = l, Q !== null ? t = 0 : (Z = null, q = 0, t = Y);
  }
  if (t !== 0) {
    if (t === 2 && (l = iu(e), l !== 0 && (r = l, t = Iu(e, l))), t === 1) throw n = Yn, xt(e, 0), et(e, r), de(e, W()), n;
    if (t === 6) et(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !md(l) && (t = qr(e, r), t === 2 && (u = iu(e), u !== 0 && (r = u, t = Iu(e, u))), t === 1)) throw n = Yn, xt(e, 0), et(e, r), de(e, W()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(y(345));
        case 2:
          wt(e, se, $e);
          break;
        case 3:
          if (et(e, r), (r & 130023424) === r && (t = xo + 500 - W(), 10 < t)) {
            if (Dr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              ue(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = vu(wt.bind(null, e, se, $e), t);
            break;
          }
          wt(e, se, $e);
          break;
        case 4:
          if (et(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var o = 31 - Re(r);
            u = 1 << o, o = t[o], o > l && (l = o), r &= ~u;
          }
          if (r = l, r = W() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * pd(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = vu(wt.bind(null, e, se, $e), r);
            break;
          }
          wt(e, se, $e);
          break;
        case 5:
          wt(e, se, $e);
          break;
        default:
          throw Error(y(329));
      }
    }
  }
  return de(e, W()), e.callbackNode === n ? Ba.bind(null, e) : null;
}
function Iu(e, t) {
  var n = Tn;
  return e.current.memoizedState.isDehydrated && (xt(e, t).flags |= 256), e = qr(e, t), e !== 2 && (t = se, se = n, t !== null && Fu(t)), e;
}
function Fu(e) {
  se === null ? se = e : se.push.apply(se, e);
}
function md(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], u = l.getSnapshot;
        l = l.value;
        try {
          if (!Oe(u(), l)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function et(e, t) {
  for (t &= ~Eo, t &= ~fl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Re(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function ji(e) {
  if (R & 6) throw Error(y(327));
  Zt();
  var t = Dr(e, 0);
  if (!(t & 1)) return de(e, W()), null;
  var n = qr(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = iu(e);
    r !== 0 && (t = r, n = Iu(e, r));
  }
  if (n === 1) throw n = Yn, xt(e, 0), et(e, t), de(e, W()), n;
  if (n === 6) throw Error(y(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, wt(e, se, $e), de(e, W()), null;
}
function Co(e, t) {
  var n = R;
  R |= 1;
  try {
    return e(t);
  } finally {
    R = n, R === 0 && (rn = W() + 500, ol && vt());
  }
}
function Tt(e) {
  nt !== null && nt.tag === 0 && !(R & 6) && Zt();
  var t = R;
  R |= 1;
  var n = xe.transition, r = M;
  try {
    if (xe.transition = null, M = 1, e) return e();
  } finally {
    M = r, xe.transition = n, R = t, !(R & 6) && vt();
  }
}
function _o() {
  pe = Wt.current, I(Wt);
}
function xt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Wc(n)), Q !== null) for (n = Q.return; n !== null; ) {
    var r = n;
    switch (lo(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && $r();
        break;
      case 3:
        tn(), I(fe), I(re), mo();
        break;
      case 5:
        po(r);
        break;
      case 4:
        tn();
        break;
      case 13:
        I(U);
        break;
      case 19:
        I(U);
        break;
      case 10:
        so(r.type._context);
        break;
      case 22:
      case 23:
        _o();
    }
    n = n.return;
  }
  if (Z = e, Q = e = ft(e.current, null), q = pe = t, Y = 0, Yn = null, Eo = fl = zt = 0, se = Tn = null, kt !== null) {
    for (t = 0; t < kt.length; t++) if (n = kt[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, u = n.pending;
      if (u !== null) {
        var o = u.next;
        u.next = l, r.next = o;
      }
      n.pending = r;
    }
    kt = null;
  }
  return e;
}
function Ha(e, t) {
  do {
    var n = Q;
    try {
      if (io(), Cr.current = Xr, Yr) {
        for (var r = $.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        Yr = !1;
      }
      if (Nt = 0, G = K = $ = null, Nn = !1, Wn = 0, ko.current = null, n === null || n.return === null) {
        Y = 1, Yn = t, Q = null;
        break;
      }
      e: {
        var u = e, o = n.return, i = n, s = t;
        if (t = q, i.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
          var f = s, v = i, m = v.tag;
          if (!(v.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var p = v.alternate;
            p ? (v.updateQueue = p.updateQueue, v.memoizedState = p.memoizedState, v.lanes = p.lanes) : (v.updateQueue = null, v.memoizedState = null);
          }
          var g = Ci(o);
          if (g !== null) {
            g.flags &= -257, _i(g, o, i, u, t), g.mode & 1 && xi(u, f, t), t = g, s = f;
            var w = t.updateQueue;
            if (w === null) {
              var S = /* @__PURE__ */ new Set();
              S.add(s), t.updateQueue = S;
            } else w.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              xi(u, f, t), Po();
              break e;
            }
            s = Error(y(426));
          }
        } else if (j && i.mode & 1) {
          var F = Ci(o);
          if (F !== null) {
            !(F.flags & 65536) && (F.flags |= 256), _i(F, o, i, u, t), uo(nn(s, i));
            break e;
          }
        }
        u = s = nn(s, i), Y !== 4 && (Y = 2), Tn === null ? Tn = [u] : Tn.push(u), u = o;
        do {
          switch (u.tag) {
            case 3:
              u.flags |= 65536, t &= -t, u.lanes |= t;
              var c = Pa(u, s, t);
              yi(u, c);
              break e;
            case 1:
              i = s;
              var a = u.type, d = u.stateNode;
              if (!(u.flags & 128) && (typeof a.getDerivedStateFromError == "function" || d !== null && typeof d.componentDidCatch == "function" && (st === null || !st.has(d)))) {
                u.flags |= 65536, t &= -t, u.lanes |= t;
                var h = Na(u, i, t);
                yi(u, h);
                break e;
              }
          }
          u = u.return;
        } while (u !== null);
      }
      Ka(n);
    } catch (E) {
      t = E, Q === n && n !== null && (Q = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Wa() {
  var e = Gr.current;
  return Gr.current = Xr, e === null ? Xr : e;
}
function Po() {
  (Y === 0 || Y === 3 || Y === 2) && (Y = 4), Z === null || !(zt & 268435455) && !(fl & 268435455) || et(Z, q);
}
function qr(e, t) {
  var n = R;
  R |= 2;
  var r = Wa();
  (Z !== e || q !== t) && ($e = null, xt(e, t));
  do
    try {
      vd();
      break;
    } catch (l) {
      Ha(e, l);
    }
  while (!0);
  if (io(), R = n, Gr.current = r, Q !== null) throw Error(y(261));
  return Z = null, q = 0, Y;
}
function vd() {
  for (; Q !== null; ) Qa(Q);
}
function hd() {
  for (; Q !== null && !Af(); ) Qa(Q);
}
function Qa(e) {
  var t = Xa(e.alternate, e, pe);
  e.memoizedProps = e.pendingProps, t === null ? Ka(e) : Q = t, ko.current = null;
}
function Ka(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = ad(n, t), n !== null) {
        n.flags &= 32767, Q = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        Y = 6, Q = null;
        return;
      }
    } else if (n = sd(n, t, pe), n !== null) {
      Q = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      Q = t;
      return;
    }
    Q = t = e;
  } while (t !== null);
  Y === 0 && (Y = 5);
}
function wt(e, t, n) {
  var r = M, l = xe.transition;
  try {
    xe.transition = null, M = 1, yd(e, t, n, r);
  } finally {
    xe.transition = l, M = r;
  }
  return null;
}
function yd(e, t, n, r) {
  do
    Zt();
  while (nt !== null);
  if (R & 6) throw Error(y(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(y(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var u = n.lanes | n.childLanes;
  if (Jf(e, u), e === Z && (Q = Z = null, q = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || hr || (hr = !0, Ga(Or, function() {
    return Zt(), null;
  })), u = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || u) {
    u = xe.transition, xe.transition = null;
    var o = M;
    M = 1;
    var i = R;
    R |= 4, ko.current = null, cd(e, n), Va(n, e), jc(pu), Ir = !!du, pu = du = null, e.current = n, dd(n), Bf(), R = i, M = o, xe.transition = u;
  } else e.current = n;
  if (hr && (hr = !1, nt = e, Jr = l), u = e.pendingLanes, u === 0 && (st = null), Qf(n.stateNode), de(e, W()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (Zr) throw Zr = !1, e = Ou, Ou = null, e;
  return Jr & 1 && e.tag !== 0 && Zt(), u = e.pendingLanes, u & 1 ? e === Du ? Ln++ : (Ln = 0, Du = e) : Ln = 0, vt(), null;
}
function Zt() {
  if (nt !== null) {
    var e = Ps(Jr), t = xe.transition, n = M;
    try {
      if (xe.transition = null, M = 16 > e ? 16 : e, nt === null) var r = !1;
      else {
        if (e = nt, nt = null, Jr = 0, R & 6) throw Error(y(331));
        var l = R;
        for (R |= 4, k = e.current; k !== null; ) {
          var u = k, o = u.child;
          if (k.flags & 16) {
            var i = u.deletions;
            if (i !== null) {
              for (var s = 0; s < i.length; s++) {
                var f = i[s];
                for (k = f; k !== null; ) {
                  var v = k;
                  switch (v.tag) {
                    case 0:
                    case 11:
                    case 15:
                      zn(8, v, u);
                  }
                  var m = v.child;
                  if (m !== null) m.return = v, k = m;
                  else for (; k !== null; ) {
                    v = k;
                    var p = v.sibling, g = v.return;
                    if (ja(v), v === f) {
                      k = null;
                      break;
                    }
                    if (p !== null) {
                      p.return = g, k = p;
                      break;
                    }
                    k = g;
                  }
                }
              }
              var w = u.alternate;
              if (w !== null) {
                var S = w.child;
                if (S !== null) {
                  w.child = null;
                  do {
                    var F = S.sibling;
                    S.sibling = null, S = F;
                  } while (S !== null);
                }
              }
              k = u;
            }
          }
          if (u.subtreeFlags & 2064 && o !== null) o.return = u, k = o;
          else e: for (; k !== null; ) {
            if (u = k, u.flags & 2048) switch (u.tag) {
              case 0:
              case 11:
              case 15:
                zn(9, u, u.return);
            }
            var c = u.sibling;
            if (c !== null) {
              c.return = u.return, k = c;
              break e;
            }
            k = u.return;
          }
        }
        var a = e.current;
        for (k = a; k !== null; ) {
          o = k;
          var d = o.child;
          if (o.subtreeFlags & 2064 && d !== null) d.return = o, k = d;
          else e: for (o = a; k !== null; ) {
            if (i = k, i.flags & 2048) try {
              switch (i.tag) {
                case 0:
                case 11:
                case 15:
                  al(9, i);
              }
            } catch (E) {
              A(i, i.return, E);
            }
            if (i === o) {
              k = null;
              break e;
            }
            var h = i.sibling;
            if (h !== null) {
              h.return = i.return, k = h;
              break e;
            }
            k = i.return;
          }
        }
        if (R = l, vt(), je && typeof je.onPostCommitFiberRoot == "function") try {
          je.onPostCommitFiberRoot(tl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      M = n, xe.transition = t;
    }
  }
  return !1;
}
function Ui(e, t, n) {
  t = nn(n, t), t = Pa(e, t, 1), e = it(e, t, 1), t = ue(), e !== null && (Gn(e, 1, t), de(e, t));
}
function A(e, t, n) {
  if (e.tag === 3) Ui(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Ui(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (st === null || !st.has(r))) {
        e = nn(n, e), e = Na(t, e, 1), t = it(t, e, 1), e = ue(), t !== null && (Gn(t, 1, e), de(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function gd(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = ue(), e.pingedLanes |= e.suspendedLanes & n, Z === e && (q & n) === n && (Y === 4 || Y === 3 && (q & 130023424) === q && 500 > W() - xo ? xt(e, 0) : Eo |= n), de(e, t);
}
function Ya(e, t) {
  t === 0 && (e.mode & 1 ? (t = or, or <<= 1, !(or & 130023424) && (or = 4194304)) : t = 1);
  var n = ue();
  e = Ke(e, t), e !== null && (Gn(e, t, n), de(e, n));
}
function wd(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), Ya(e, n);
}
function Sd(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode, l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(y(314));
  }
  r !== null && r.delete(t), Ya(e, n);
}
var Xa;
Xa = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || fe.current) ae = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return ae = !1, id(e, t, n);
    ae = !!(e.flags & 131072);
  }
  else ae = !1, j && t.flags & 1048576 && qs(t, Br, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Pr(e, t), e = t.pendingProps;
      var l = qt(t, re.current);
      Gt(t, n), l = ho(null, t, r, e, l, n);
      var u = yo();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ce(r) ? (u = !0, Vr(t)) : u = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, fo(t), l.updater = sl, t.stateNode = l, l._reactInternals = t, Eu(t, r, e, n), t = _u(null, t, r, !0, u, n)) : (t.tag = 0, j && u && ro(t), le(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Pr(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = Ed(r), e = ze(r, e), l) {
          case 0:
            t = Cu(null, t, r, e, n);
            break e;
          case 1:
            t = zi(null, t, r, e, n);
            break e;
          case 11:
            t = Pi(null, t, r, e, n);
            break e;
          case 14:
            t = Ni(null, t, r, ze(r.type, e), n);
            break e;
        }
        throw Error(y(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ze(r, l), Cu(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ze(r, l), zi(e, t, r, l, n);
    case 3:
      e: {
        if (Ra(t), e === null) throw Error(y(387));
        r = t.pendingProps, u = t.memoizedState, l = u.element, la(e, t), Qr(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, u.isDehydrated) if (u = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
          l = nn(Error(y(423)), t), t = Ti(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = nn(Error(y(424)), t), t = Ti(e, t, r, n, l);
          break e;
        } else for (ve = ot(t.stateNode.containerInfo.firstChild), he = t, j = !0, Le = null, n = na(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (bt(), r === l) {
            t = Ye(e, t, n);
            break e;
          }
          le(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return ua(t), e === null && wu(t), r = t.type, l = t.pendingProps, u = e !== null ? e.memoizedProps : null, o = l.children, mu(r, l) ? o = null : u !== null && mu(r, u) && (t.flags |= 32), La(e, t), le(e, t, o, n), t.child;
    case 6:
      return e === null && wu(t), null;
    case 13:
      return Ma(e, t, n);
    case 4:
      return co(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = en(t, null, r, n) : le(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ze(r, l), Pi(e, t, r, l, n);
    case 7:
      return le(e, t, t.pendingProps, n), t.child;
    case 8:
      return le(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return le(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, u = t.memoizedProps, o = l.value, O(Hr, r._currentValue), r._currentValue = o, u !== null) if (Oe(u.value, o)) {
          if (u.children === l.children && !fe.current) {
            t = Ye(e, t, n);
            break e;
          }
        } else for (u = t.child, u !== null && (u.return = t); u !== null; ) {
          var i = u.dependencies;
          if (i !== null) {
            o = u.child;
            for (var s = i.firstContext; s !== null; ) {
              if (s.context === r) {
                if (u.tag === 1) {
                  s = He(-1, n & -n), s.tag = 2;
                  var f = u.updateQueue;
                  if (f !== null) {
                    f = f.shared;
                    var v = f.pending;
                    v === null ? s.next = s : (s.next = v.next, v.next = s), f.pending = s;
                  }
                }
                u.lanes |= n, s = u.alternate, s !== null && (s.lanes |= n), Su(
                  u.return,
                  n,
                  t
                ), i.lanes |= n;
                break;
              }
              s = s.next;
            }
          } else if (u.tag === 10) o = u.type === t.type ? null : u.child;
          else if (u.tag === 18) {
            if (o = u.return, o === null) throw Error(y(341));
            o.lanes |= n, i = o.alternate, i !== null && (i.lanes |= n), Su(o, n, t), o = u.sibling;
          } else o = u.child;
          if (o !== null) o.return = u;
          else for (o = u; o !== null; ) {
            if (o === t) {
              o = null;
              break;
            }
            if (u = o.sibling, u !== null) {
              u.return = o.return, o = u;
              break;
            }
            o = o.return;
          }
          u = o;
        }
        le(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, Gt(t, n), l = Ce(l), r = r(l), t.flags |= 1, le(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = ze(r, t.pendingProps), l = ze(r.type, l), Ni(e, t, r, l, n);
    case 15:
      return za(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : ze(r, l), Pr(e, t), t.tag = 1, ce(r) ? (e = !0, Vr(t)) : e = !1, Gt(t, n), _a(t, r, l), Eu(t, r, l, n), _u(null, t, r, !0, e, n);
    case 19:
      return Oa(e, t, n);
    case 22:
      return Ta(e, t, n);
  }
  throw Error(y(156, t.tag));
};
function Ga(e, t) {
  return Es(e, t);
}
function kd(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ee(e, t, n, r) {
  return new kd(e, t, n, r);
}
function No(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Ed(e) {
  if (typeof e == "function") return No(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Qu) return 11;
    if (e === Ku) return 14;
  }
  return 2;
}
function ft(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ee(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Tr(e, t, n, r, l, u) {
  var o = 2;
  if (r = e, typeof e == "function") No(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case Dt:
      return Ct(n.children, l, u, t);
    case Wu:
      o = 8, l |= 8;
      break;
    case Kl:
      return e = Ee(12, n, t, l | 2), e.elementType = Kl, e.lanes = u, e;
    case Yl:
      return e = Ee(13, n, t, l), e.elementType = Yl, e.lanes = u, e;
    case Xl:
      return e = Ee(19, n, t, l), e.elementType = Xl, e.lanes = u, e;
    case us:
      return cl(n, l, u, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case rs:
          o = 10;
          break e;
        case ls:
          o = 9;
          break e;
        case Qu:
          o = 11;
          break e;
        case Ku:
          o = 14;
          break e;
        case Je:
          o = 16, r = null;
          break e;
      }
      throw Error(y(130, e == null ? e : typeof e, ""));
  }
  return t = Ee(o, n, t, l), t.elementType = e, t.type = r, t.lanes = u, t;
}
function Ct(e, t, n, r) {
  return e = Ee(7, e, r, t), e.lanes = n, e;
}
function cl(e, t, n, r) {
  return e = Ee(22, e, r, t), e.elementType = us, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Hl(e, t, n) {
  return e = Ee(6, e, null, t), e.lanes = n, e;
}
function Wl(e, t, n) {
  return t = Ee(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function xd(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Cl(0), this.expirationTimes = Cl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Cl(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function zo(e, t, n, r, l, u, o, i, s) {
  return e = new xd(e, t, n, i, s), t === 1 ? (t = 1, u === !0 && (t |= 8)) : t = 0, u = Ee(3, null, null, t), e.current = u, u.stateNode = e, u.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, fo(u), e;
}
function Cd(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Ot, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function Za(e) {
  if (!e) return dt;
  e = e._reactInternals;
  e: {
    if (Rt(e) !== e || e.tag !== 1) throw Error(y(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ce(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(y(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ce(n)) return Zs(e, n, t);
  }
  return t;
}
function Ja(e, t, n, r, l, u, o, i, s) {
  return e = zo(n, r, !0, e, l, u, o, i, s), e.context = Za(null), n = e.current, r = ue(), l = at(n), u = He(r, l), u.callback = t ?? null, it(n, u, l), e.current.lanes = l, Gn(e, l, r), de(e, r), e;
}
function dl(e, t, n, r) {
  var l = t.current, u = ue(), o = at(l);
  return n = Za(n), t.context === null ? t.context = n : t.pendingContext = n, t = He(u, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = it(l, t, o), e !== null && (Me(e, l, o, u), xr(e, l, o)), o;
}
function br(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function $i(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function To(e, t) {
  $i(e, t), (e = e.alternate) && $i(e, t);
}
function _d() {
  return null;
}
var qa = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Lo(e) {
  this._internalRoot = e;
}
pl.prototype.render = Lo.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(y(409));
  dl(e, t, null, null);
};
pl.prototype.unmount = Lo.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Tt(function() {
      dl(null, e, null, null);
    }), t[Qe] = null;
  }
};
function pl(e) {
  this._internalRoot = e;
}
pl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Ts();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < be.length && t !== 0 && t < be[n].priority; n++) ;
    be.splice(n, 0, e), n === 0 && Rs(e);
  }
};
function Ro(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function ml(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Vi() {
}
function Pd(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var u = r;
      r = function() {
        var f = br(o);
        u.call(f);
      };
    }
    var o = Ja(t, r, e, 0, null, !1, !1, "", Vi);
    return e._reactRootContainer = o, e[Qe] = o.current, $n(e.nodeType === 8 ? e.parentNode : e), Tt(), o;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var i = r;
    r = function() {
      var f = br(s);
      i.call(f);
    };
  }
  var s = zo(e, 0, !1, null, null, !1, !1, "", Vi);
  return e._reactRootContainer = s, e[Qe] = s.current, $n(e.nodeType === 8 ? e.parentNode : e), Tt(function() {
    dl(t, s, n, r);
  }), s;
}
function vl(e, t, n, r, l) {
  var u = n._reactRootContainer;
  if (u) {
    var o = u;
    if (typeof l == "function") {
      var i = l;
      l = function() {
        var s = br(o);
        i.call(s);
      };
    }
    dl(t, o, e, l);
  } else o = Pd(n, t, e, l, r);
  return br(o);
}
Ns = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Sn(t.pendingLanes);
        n !== 0 && (Gu(t, n | 1), de(t, W()), !(R & 6) && (rn = W() + 500, vt()));
      }
      break;
    case 13:
      Tt(function() {
        var r = Ke(e, 1);
        if (r !== null) {
          var l = ue();
          Me(r, e, 1, l);
        }
      }), To(e, 1);
  }
};
Zu = function(e) {
  if (e.tag === 13) {
    var t = Ke(e, 134217728);
    if (t !== null) {
      var n = ue();
      Me(t, e, 134217728, n);
    }
    To(e, 134217728);
  }
};
zs = function(e) {
  if (e.tag === 13) {
    var t = at(e), n = Ke(e, t);
    if (n !== null) {
      var r = ue();
      Me(n, e, t, r);
    }
    To(e, t);
  }
};
Ts = function() {
  return M;
};
Ls = function(e, t) {
  var n = M;
  try {
    return M = e, t();
  } finally {
    M = n;
  }
};
lu = function(e, t, n) {
  switch (t) {
    case "input":
      if (Jl(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = ul(r);
            if (!l) throw Error(y(90));
            is(r), Jl(r, l);
          }
        }
      }
      break;
    case "textarea":
      as(e, n);
      break;
    case "select":
      t = n.value, t != null && Qt(e, !!n.multiple, t, !1);
  }
};
hs = Co;
ys = Tt;
var Nd = { usingClientEntryPoint: !1, Events: [Jn, Ut, ul, ms, vs, Co] }, yn = { findFiberByHostInstance: St, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, zd = { bundleType: yn.bundleType, version: yn.version, rendererPackageName: yn.rendererPackageName, rendererConfig: yn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Xe.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Ss(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: yn.findFiberByHostInstance || _d, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var yr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!yr.isDisabled && yr.supportsFiber) try {
    tl = yr.inject(zd), je = yr;
  } catch {
  }
}
ge.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Nd;
ge.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ro(t)) throw Error(y(200));
  return Cd(e, t, null, n);
};
ge.createRoot = function(e, t) {
  if (!Ro(e)) throw Error(y(299));
  var n = !1, r = "", l = qa;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = zo(e, 1, !1, null, null, n, !1, r, l), e[Qe] = t.current, $n(e.nodeType === 8 ? e.parentNode : e), new Lo(t);
};
ge.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(y(188)) : (e = Object.keys(e).join(","), Error(y(268, e)));
  return e = Ss(t), e = e === null ? null : e.stateNode, e;
};
ge.flushSync = function(e) {
  return Tt(e);
};
ge.hydrate = function(e, t, n) {
  if (!ml(t)) throw Error(y(200));
  return vl(null, e, t, !0, n);
};
ge.hydrateRoot = function(e, t, n) {
  if (!Ro(e)) throw Error(y(405));
  var r = n != null && n.hydratedSources || null, l = !1, u = "", o = qa;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = Ja(t, null, e, 1, n ?? null, l, !1, u, o), e[Qe] = t.current, $n(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new pl(t);
};
ge.render = function(e, t, n) {
  if (!ml(t)) throw Error(y(200));
  return vl(null, e, t, !1, n);
};
ge.unmountComponentAtNode = function(e) {
  if (!ml(e)) throw Error(y(40));
  return e._reactRootContainer ? (Tt(function() {
    vl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Qe] = null;
    });
  }), !0) : !1;
};
ge.unstable_batchedUpdates = Co;
ge.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!ml(n)) throw Error(y(200));
  if (e == null || e._reactInternals === void 0) throw Error(y(38));
  return vl(e, t, n, !1, r);
};
ge.version = "18.3.1-next-f1338f8080-20240426";
function ba() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ba);
    } catch (e) {
      console.error(e);
    }
}
ba(), bi.exports = ge;
var Td = bi.exports, ef, Ai = Td;
ef = Ai.createRoot, Ai.hydrateRoot;
let tf = me.createContext(
  /** @type {any} */
  null
);
function Ld() {
  let e = me.useContext(tf);
  if (!e) throw new Error("RenderContext not found");
  return e;
}
function Rd() {
  return Ld().model;
}
function Md(e) {
  let t = Rd(), [n, r] = me.useState(t.get(e));
  return me.useEffect(() => {
    let l = () => r(t.get(e));
    return t.on(`change:${e}`, l), () => t.off(`change:${e}`, l);
  }, [t, e]), [
    n,
    (l) => {
      t.set(e, l), t.save_changes();
    }
  ];
}
function Od(e) {
  return ({ el: t, model: n, experimental: r }) => {
    let l = ef(t);
    return l.render(
      me.createElement(
        me.StrictMode,
        null,
        me.createElement(
          tf.Provider,
          { value: { model: n, experimental: r } },
          me.createElement(e)
        )
      )
    ), () => l.unmount();
  };
}
function Dd() {
  const [e, t] = me.useState([]), [n, r] = me.useState("");
  Md("message"), me.useEffect(() => {
    typeof model < "u" && model.on("msg:custom", (u) => {
      u.type === "assistant_message" && t((o) => [...o, { role: "assistant", content: u.text }]);
    });
  }, []);
  const l = (u) => {
    u.preventDefault(), n.trim() && (t((o) => [...o, { role: "user", content: n }]), typeof model < "u" && model.send({ type: "user_message", text: n }), r(""));
  };
  return /* @__PURE__ */ Ge.jsxs("div", { style: {
    width: "100%",
    height: "400px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    fontFamily: "system-ui, sans-serif"
  }, children: [
    /* @__PURE__ */ Ge.jsx("div", { style: {
      flex: 1,
      padding: "16px",
      overflowY: "auto",
      backgroundColor: "#f9f9f9"
    }, children: e.length === 0 ? /* @__PURE__ */ Ge.jsx("div", { style: { color: "#666", fontStyle: "italic" }, children: "Start a conversation..." }) : e.map((u, o) => /* @__PURE__ */ Ge.jsxs("div", { style: {
      marginBottom: "12px",
      padding: "8px 12px",
      backgroundColor: u.role === "user" ? "#007bff" : "#fff",
      color: u.role === "user" ? "white" : "black",
      borderRadius: "8px",
      alignSelf: u.role === "user" ? "flex-end" : "flex-start",
      maxWidth: "80%"
    }, children: [
      /* @__PURE__ */ Ge.jsxs("strong", { children: [
        u.role === "user" ? "You" : "Assistant",
        ":"
      ] }),
      " ",
      u.content
    ] }, o)) }),
    /* @__PURE__ */ Ge.jsxs("form", { onSubmit: l, style: {
      padding: "16px",
      borderTop: "1px solid #eee",
      display: "flex",
      gap: "8px"
    }, children: [
      /* @__PURE__ */ Ge.jsx(
        "input",
        {
          type: "text",
          value: n,
          onChange: (u) => r(u.target.value),
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
      /* @__PURE__ */ Ge.jsx(
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
const Id = { render: Od(Dd) };
export {
  Id as default
};
