var fE = { exports: {} }, Kp = {}, dE = { exports: {} }, mt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qR;
function G_() {
  if (qR) return mt;
  qR = 1;
  var K = Symbol.for("react.element"), q = Symbol.for("react.portal"), A = Symbol.for("react.fragment"), Rt = Symbol.for("react.strict_mode"), Ke = Symbol.for("react.profiler"), Ye = Symbol.for("react.provider"), S = Symbol.for("react.context"), Pt = Symbol.for("react.forward_ref"), de = Symbol.for("react.suspense"), ve = Symbol.for("react.memo"), ot = Symbol.for("react.lazy"), ee = Symbol.iterator;
  function Ce(_) {
    return _ === null || typeof _ != "object" ? null : (_ = ee && _[ee] || _["@@iterator"], typeof _ == "function" ? _ : null);
  }
  var ue = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, Ie = Object.assign, yt = {};
  function pt(_, V, je) {
    this.props = _, this.context = V, this.refs = yt, this.updater = je || ue;
  }
  pt.prototype.isReactComponent = {}, pt.prototype.setState = function(_, V) {
    if (typeof _ != "object" && typeof _ != "function" && _ != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, _, V, "setState");
  }, pt.prototype.forceUpdate = function(_) {
    this.updater.enqueueForceUpdate(this, _, "forceUpdate");
  };
  function cn() {
  }
  cn.prototype = pt.prototype;
  function dt(_, V, je) {
    this.props = _, this.context = V, this.refs = yt, this.updater = je || ue;
  }
  var Qe = dt.prototype = new cn();
  Qe.constructor = dt, Ie(Qe, pt.prototype), Qe.isPureReactComponent = !0;
  var vt = Array.isArray, be = Object.prototype.hasOwnProperty, st = { current: null }, Fe = { key: !0, ref: !0, __self: !0, __source: !0 };
  function rn(_, V, je) {
    var Ue, at = {}, et = null, Ze = null;
    if (V != null) for (Ue in V.ref !== void 0 && (Ze = V.ref), V.key !== void 0 && (et = "" + V.key), V) be.call(V, Ue) && !Fe.hasOwnProperty(Ue) && (at[Ue] = V[Ue]);
    var tt = arguments.length - 2;
    if (tt === 1) at.children = je;
    else if (1 < tt) {
      for (var it = Array(tt), Vt = 0; Vt < tt; Vt++) it[Vt] = arguments[Vt + 2];
      at.children = it;
    }
    if (_ && _.defaultProps) for (Ue in tt = _.defaultProps, tt) at[Ue] === void 0 && (at[Ue] = tt[Ue]);
    return { $$typeof: K, type: _, key: et, ref: Ze, props: at, _owner: st.current };
  }
  function Ft(_, V) {
    return { $$typeof: K, type: _.type, key: V, ref: _.ref, props: _.props, _owner: _._owner };
  }
  function Kt(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === K;
  }
  function an(_) {
    var V = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(je) {
      return V[je];
    });
  }
  var xt = /\/+/g;
  function ke(_, V) {
    return typeof _ == "object" && _ !== null && _.key != null ? an("" + _.key) : V.toString(36);
  }
  function Ut(_, V, je, Ue, at) {
    var et = typeof _;
    (et === "undefined" || et === "boolean") && (_ = null);
    var Ze = !1;
    if (_ === null) Ze = !0;
    else switch (et) {
      case "string":
      case "number":
        Ze = !0;
        break;
      case "object":
        switch (_.$$typeof) {
          case K:
          case q:
            Ze = !0;
        }
    }
    if (Ze) return Ze = _, at = at(Ze), _ = Ue === "" ? "." + ke(Ze, 0) : Ue, vt(at) ? (je = "", _ != null && (je = _.replace(xt, "$&/") + "/"), Ut(at, V, je, "", function(Vt) {
      return Vt;
    })) : at != null && (Kt(at) && (at = Ft(at, je + (!at.key || Ze && Ze.key === at.key ? "" : ("" + at.key).replace(xt, "$&/") + "/") + _)), V.push(at)), 1;
    if (Ze = 0, Ue = Ue === "" ? "." : Ue + ":", vt(_)) for (var tt = 0; tt < _.length; tt++) {
      et = _[tt];
      var it = Ue + ke(et, tt);
      Ze += Ut(et, V, je, it, at);
    }
    else if (it = Ce(_), typeof it == "function") for (_ = it.call(_), tt = 0; !(et = _.next()).done; ) et = et.value, it = Ue + ke(et, tt++), Ze += Ut(et, V, je, it, at);
    else if (et === "object") throw V = String(_), Error("Objects are not valid as a React child (found: " + (V === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : V) + "). If you meant to render a collection of children, use an array instead.");
    return Ze;
  }
  function bt(_, V, je) {
    if (_ == null) return _;
    var Ue = [], at = 0;
    return Ut(_, Ue, "", "", function(et) {
      return V.call(je, et, at++);
    }), Ue;
  }
  function Dt(_) {
    if (_._status === -1) {
      var V = _._result;
      V = V(), V.then(function(je) {
        (_._status === 0 || _._status === -1) && (_._status = 1, _._result = je);
      }, function(je) {
        (_._status === 0 || _._status === -1) && (_._status = 2, _._result = je);
      }), _._status === -1 && (_._status = 0, _._result = V);
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var Ee = { current: null }, Z = { transition: null }, Re = { ReactCurrentDispatcher: Ee, ReactCurrentBatchConfig: Z, ReactCurrentOwner: st };
  function ne() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return mt.Children = { map: bt, forEach: function(_, V, je) {
    bt(_, function() {
      V.apply(this, arguments);
    }, je);
  }, count: function(_) {
    var V = 0;
    return bt(_, function() {
      V++;
    }), V;
  }, toArray: function(_) {
    return bt(_, function(V) {
      return V;
    }) || [];
  }, only: function(_) {
    if (!Kt(_)) throw Error("React.Children.only expected to receive a single React element child.");
    return _;
  } }, mt.Component = pt, mt.Fragment = A, mt.Profiler = Ke, mt.PureComponent = dt, mt.StrictMode = Rt, mt.Suspense = de, mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Re, mt.act = ne, mt.cloneElement = function(_, V, je) {
    if (_ == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + _ + ".");
    var Ue = Ie({}, _.props), at = _.key, et = _.ref, Ze = _._owner;
    if (V != null) {
      if (V.ref !== void 0 && (et = V.ref, Ze = st.current), V.key !== void 0 && (at = "" + V.key), _.type && _.type.defaultProps) var tt = _.type.defaultProps;
      for (it in V) be.call(V, it) && !Fe.hasOwnProperty(it) && (Ue[it] = V[it] === void 0 && tt !== void 0 ? tt[it] : V[it]);
    }
    var it = arguments.length - 2;
    if (it === 1) Ue.children = je;
    else if (1 < it) {
      tt = Array(it);
      for (var Vt = 0; Vt < it; Vt++) tt[Vt] = arguments[Vt + 2];
      Ue.children = tt;
    }
    return { $$typeof: K, type: _.type, key: at, ref: et, props: Ue, _owner: Ze };
  }, mt.createContext = function(_) {
    return _ = { $$typeof: S, _currentValue: _, _currentValue2: _, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, _.Provider = { $$typeof: Ye, _context: _ }, _.Consumer = _;
  }, mt.createElement = rn, mt.createFactory = function(_) {
    var V = rn.bind(null, _);
    return V.type = _, V;
  }, mt.createRef = function() {
    return { current: null };
  }, mt.forwardRef = function(_) {
    return { $$typeof: Pt, render: _ };
  }, mt.isValidElement = Kt, mt.lazy = function(_) {
    return { $$typeof: ot, _payload: { _status: -1, _result: _ }, _init: Dt };
  }, mt.memo = function(_, V) {
    return { $$typeof: ve, type: _, compare: V === void 0 ? null : V };
  }, mt.startTransition = function(_) {
    var V = Z.transition;
    Z.transition = {};
    try {
      _();
    } finally {
      Z.transition = V;
    }
  }, mt.unstable_act = ne, mt.useCallback = function(_, V) {
    return Ee.current.useCallback(_, V);
  }, mt.useContext = function(_) {
    return Ee.current.useContext(_);
  }, mt.useDebugValue = function() {
  }, mt.useDeferredValue = function(_) {
    return Ee.current.useDeferredValue(_);
  }, mt.useEffect = function(_, V) {
    return Ee.current.useEffect(_, V);
  }, mt.useId = function() {
    return Ee.current.useId();
  }, mt.useImperativeHandle = function(_, V, je) {
    return Ee.current.useImperativeHandle(_, V, je);
  }, mt.useInsertionEffect = function(_, V) {
    return Ee.current.useInsertionEffect(_, V);
  }, mt.useLayoutEffect = function(_, V) {
    return Ee.current.useLayoutEffect(_, V);
  }, mt.useMemo = function(_, V) {
    return Ee.current.useMemo(_, V);
  }, mt.useReducer = function(_, V, je) {
    return Ee.current.useReducer(_, V, je);
  }, mt.useRef = function(_) {
    return Ee.current.useRef(_);
  }, mt.useState = function(_) {
    return Ee.current.useState(_);
  }, mt.useSyncExternalStore = function(_, V, je) {
    return Ee.current.useSyncExternalStore(_, V, je);
  }, mt.useTransition = function() {
    return Ee.current.useTransition();
  }, mt.version = "18.3.1", mt;
}
var Jp = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
Jp.exports;
var XR;
function q_() {
  return XR || (XR = 1, function(K, q) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var A = "18.3.1", Rt = Symbol.for("react.element"), Ke = Symbol.for("react.portal"), Ye = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"), Pt = Symbol.for("react.profiler"), de = Symbol.for("react.provider"), ve = Symbol.for("react.context"), ot = Symbol.for("react.forward_ref"), ee = Symbol.for("react.suspense"), Ce = Symbol.for("react.suspense_list"), ue = Symbol.for("react.memo"), Ie = Symbol.for("react.lazy"), yt = Symbol.for("react.offscreen"), pt = Symbol.iterator, cn = "@@iterator";
      function dt(h) {
        if (h === null || typeof h != "object")
          return null;
        var C = pt && h[pt] || h[cn];
        return typeof C == "function" ? C : null;
      }
      var Qe = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, vt = {
        transition: null
      }, be = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, st = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, Fe = {}, rn = null;
      function Ft(h) {
        rn = h;
      }
      Fe.setExtraStackFrame = function(h) {
        rn = h;
      }, Fe.getCurrentStack = null, Fe.getStackAddendum = function() {
        var h = "";
        rn && (h += rn);
        var C = Fe.getCurrentStack;
        return C && (h += C() || ""), h;
      };
      var Kt = !1, an = !1, xt = !1, ke = !1, Ut = !1, bt = {
        ReactCurrentDispatcher: Qe,
        ReactCurrentBatchConfig: vt,
        ReactCurrentOwner: st
      };
      bt.ReactDebugCurrentFrame = Fe, bt.ReactCurrentActQueue = be;
      function Dt(h) {
        {
          for (var C = arguments.length, N = new Array(C > 1 ? C - 1 : 0), F = 1; F < C; F++)
            N[F - 1] = arguments[F];
          Z("warn", h, N);
        }
      }
      function Ee(h) {
        {
          for (var C = arguments.length, N = new Array(C > 1 ? C - 1 : 0), F = 1; F < C; F++)
            N[F - 1] = arguments[F];
          Z("error", h, N);
        }
      }
      function Z(h, C, N) {
        {
          var F = bt.ReactDebugCurrentFrame, X = F.getStackAddendum();
          X !== "" && (C += "%s", N = N.concat([X]));
          var Oe = N.map(function(re) {
            return String(re);
          });
          Oe.unshift("Warning: " + C), Function.prototype.apply.call(console[h], console, Oe);
        }
      }
      var Re = {};
      function ne(h, C) {
        {
          var N = h.constructor, F = N && (N.displayName || N.name) || "ReactClass", X = F + "." + C;
          if (Re[X])
            return;
          Ee("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", C, F), Re[X] = !0;
        }
      }
      var _ = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(h) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(h, C, N) {
          ne(h, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(h, C, N, F) {
          ne(h, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(h, C, N, F) {
          ne(h, "setState");
        }
      }, V = Object.assign, je = {};
      Object.freeze(je);
      function Ue(h, C, N) {
        this.props = h, this.context = C, this.refs = je, this.updater = N || _;
      }
      Ue.prototype.isReactComponent = {}, Ue.prototype.setState = function(h, C) {
        if (typeof h != "object" && typeof h != "function" && h != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, h, C, "setState");
      }, Ue.prototype.forceUpdate = function(h) {
        this.updater.enqueueForceUpdate(this, h, "forceUpdate");
      };
      {
        var at = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, et = function(h, C) {
          Object.defineProperty(Ue.prototype, h, {
            get: function() {
              Dt("%s(...) is deprecated in plain JavaScript React classes. %s", C[0], C[1]);
            }
          });
        };
        for (var Ze in at)
          at.hasOwnProperty(Ze) && et(Ze, at[Ze]);
      }
      function tt() {
      }
      tt.prototype = Ue.prototype;
      function it(h, C, N) {
        this.props = h, this.context = C, this.refs = je, this.updater = N || _;
      }
      var Vt = it.prototype = new tt();
      Vt.constructor = it, V(Vt, Ue.prototype), Vt.isPureReactComponent = !0;
      function kn() {
        var h = {
          current: null
        };
        return Object.seal(h), h;
      }
      var wr = Array.isArray;
      function En(h) {
        return wr(h);
      }
      function tr(h) {
        {
          var C = typeof Symbol == "function" && Symbol.toStringTag, N = C && h[Symbol.toStringTag] || h.constructor.name || "Object";
          return N;
        }
      }
      function Vn(h) {
        try {
          return Pn(h), !1;
        } catch {
          return !0;
        }
      }
      function Pn(h) {
        return "" + h;
      }
      function $r(h) {
        if (Vn(h))
          return Ee("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", tr(h)), Pn(h);
      }
      function si(h, C, N) {
        var F = h.displayName;
        if (F)
          return F;
        var X = C.displayName || C.name || "";
        return X !== "" ? N + "(" + X + ")" : N;
      }
      function ua(h) {
        return h.displayName || "Context";
      }
      function Gn(h) {
        if (h == null)
          return null;
        if (typeof h.tag == "number" && Ee("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof h == "function")
          return h.displayName || h.name || null;
        if (typeof h == "string")
          return h;
        switch (h) {
          case Ye:
            return "Fragment";
          case Ke:
            return "Portal";
          case Pt:
            return "Profiler";
          case S:
            return "StrictMode";
          case ee:
            return "Suspense";
          case Ce:
            return "SuspenseList";
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case ve:
              var C = h;
              return ua(C) + ".Consumer";
            case de:
              var N = h;
              return ua(N._context) + ".Provider";
            case ot:
              return si(h, h.render, "ForwardRef");
            case ue:
              var F = h.displayName || null;
              return F !== null ? F : Gn(h.type) || "Memo";
            case Ie: {
              var X = h, Oe = X._payload, re = X._init;
              try {
                return Gn(re(Oe));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Cn = Object.prototype.hasOwnProperty, Bn = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, yr, Ya, On;
      On = {};
      function gr(h) {
        if (Cn.call(h, "ref")) {
          var C = Object.getOwnPropertyDescriptor(h, "ref").get;
          if (C && C.isReactWarning)
            return !1;
        }
        return h.ref !== void 0;
      }
      function oa(h) {
        if (Cn.call(h, "key")) {
          var C = Object.getOwnPropertyDescriptor(h, "key").get;
          if (C && C.isReactWarning)
            return !1;
        }
        return h.key !== void 0;
      }
      function Ia(h, C) {
        var N = function() {
          yr || (yr = !0, Ee("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        N.isReactWarning = !0, Object.defineProperty(h, "key", {
          get: N,
          configurable: !0
        });
      }
      function ci(h, C) {
        var N = function() {
          Ya || (Ya = !0, Ee("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        N.isReactWarning = !0, Object.defineProperty(h, "ref", {
          get: N,
          configurable: !0
        });
      }
      function J(h) {
        if (typeof h.ref == "string" && st.current && h.__self && st.current.stateNode !== h.__self) {
          var C = Gn(st.current.type);
          On[C] || (Ee('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', C, h.ref), On[C] = !0);
        }
      }
      var Te = function(h, C, N, F, X, Oe, re) {
        var Ne = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: Rt,
          // Built-in properties that belong on the element
          type: h,
          key: C,
          ref: N,
          props: re,
          // Record the component responsible for creating this element.
          _owner: Oe
        };
        return Ne._store = {}, Object.defineProperty(Ne._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(Ne, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: F
        }), Object.defineProperty(Ne, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: X
        }), Object.freeze && (Object.freeze(Ne.props), Object.freeze(Ne)), Ne;
      };
      function nt(h, C, N) {
        var F, X = {}, Oe = null, re = null, Ne = null, ft = null;
        if (C != null) {
          gr(C) && (re = C.ref, J(C)), oa(C) && ($r(C.key), Oe = "" + C.key), Ne = C.__self === void 0 ? null : C.__self, ft = C.__source === void 0 ? null : C.__source;
          for (F in C)
            Cn.call(C, F) && !Bn.hasOwnProperty(F) && (X[F] = C[F]);
        }
        var wt = arguments.length - 2;
        if (wt === 1)
          X.children = N;
        else if (wt > 1) {
          for (var tn = Array(wt), It = 0; It < wt; It++)
            tn[It] = arguments[It + 2];
          Object.freeze && Object.freeze(tn), X.children = tn;
        }
        if (h && h.defaultProps) {
          var rt = h.defaultProps;
          for (F in rt)
            X[F] === void 0 && (X[F] = rt[F]);
        }
        if (Oe || re) {
          var Qt = typeof h == "function" ? h.displayName || h.name || "Unknown" : h;
          Oe && Ia(X, Qt), re && ci(X, Qt);
        }
        return Te(h, Oe, re, Ne, ft, st.current, X);
      }
      function At(h, C) {
        var N = Te(h.type, C, h.ref, h._self, h._source, h._owner, h.props);
        return N;
      }
      function Zt(h, C, N) {
        if (h == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + h + ".");
        var F, X = V({}, h.props), Oe = h.key, re = h.ref, Ne = h._self, ft = h._source, wt = h._owner;
        if (C != null) {
          gr(C) && (re = C.ref, wt = st.current), oa(C) && ($r(C.key), Oe = "" + C.key);
          var tn;
          h.type && h.type.defaultProps && (tn = h.type.defaultProps);
          for (F in C)
            Cn.call(C, F) && !Bn.hasOwnProperty(F) && (C[F] === void 0 && tn !== void 0 ? X[F] = tn[F] : X[F] = C[F]);
        }
        var It = arguments.length - 2;
        if (It === 1)
          X.children = N;
        else if (It > 1) {
          for (var rt = Array(It), Qt = 0; Qt < It; Qt++)
            rt[Qt] = arguments[Qt + 2];
          X.children = rt;
        }
        return Te(h.type, Oe, re, Ne, ft, wt, X);
      }
      function pn(h) {
        return typeof h == "object" && h !== null && h.$$typeof === Rt;
      }
      var ln = ".", qn = ":";
      function Jt(h) {
        var C = /[=:]/g, N = {
          "=": "=0",
          ":": "=2"
        }, F = h.replace(C, function(X) {
          return N[X];
        });
        return "$" + F;
      }
      var Bt = !1, $t = /\/+/g;
      function sa(h) {
        return h.replace($t, "$&/");
      }
      function Sr(h, C) {
        return typeof h == "object" && h !== null && h.key != null ? ($r(h.key), Jt("" + h.key)) : C.toString(36);
      }
      function Ta(h, C, N, F, X) {
        var Oe = typeof h;
        (Oe === "undefined" || Oe === "boolean") && (h = null);
        var re = !1;
        if (h === null)
          re = !0;
        else
          switch (Oe) {
            case "string":
            case "number":
              re = !0;
              break;
            case "object":
              switch (h.$$typeof) {
                case Rt:
                case Ke:
                  re = !0;
              }
          }
        if (re) {
          var Ne = h, ft = X(Ne), wt = F === "" ? ln + Sr(Ne, 0) : F;
          if (En(ft)) {
            var tn = "";
            wt != null && (tn = sa(wt) + "/"), Ta(ft, C, tn, "", function(qf) {
              return qf;
            });
          } else ft != null && (pn(ft) && (ft.key && (!Ne || Ne.key !== ft.key) && $r(ft.key), ft = At(
            ft,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            N + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (ft.key && (!Ne || Ne.key !== ft.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              sa("" + ft.key) + "/"
            ) : "") + wt
          )), C.push(ft));
          return 1;
        }
        var It, rt, Qt = 0, vn = F === "" ? ln : F + qn;
        if (En(h))
          for (var Cl = 0; Cl < h.length; Cl++)
            It = h[Cl], rt = vn + Sr(It, Cl), Qt += Ta(It, C, N, rt, X);
        else {
          var qo = dt(h);
          if (typeof qo == "function") {
            var Pi = h;
            qo === Pi.entries && (Bt || Dt("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Bt = !0);
            for (var Xo = qo.call(Pi), uu, Gf = 0; !(uu = Xo.next()).done; )
              It = uu.value, rt = vn + Sr(It, Gf++), Qt += Ta(It, C, N, rt, X);
          } else if (Oe === "object") {
            var oc = String(h);
            throw new Error("Objects are not valid as a React child (found: " + (oc === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : oc) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return Qt;
      }
      function ji(h, C, N) {
        if (h == null)
          return h;
        var F = [], X = 0;
        return Ta(h, F, "", "", function(Oe) {
          return C.call(N, Oe, X++);
        }), F;
      }
      function Zl(h) {
        var C = 0;
        return ji(h, function() {
          C++;
        }), C;
      }
      function Jl(h, C, N) {
        ji(h, function() {
          C.apply(this, arguments);
        }, N);
      }
      function dl(h) {
        return ji(h, function(C) {
          return C;
        }) || [];
      }
      function pl(h) {
        if (!pn(h))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return h;
      }
      function eu(h) {
        var C = {
          $$typeof: ve,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: h,
          _currentValue2: h,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        C.Provider = {
          $$typeof: de,
          _context: C
        };
        var N = !1, F = !1, X = !1;
        {
          var Oe = {
            $$typeof: ve,
            _context: C
          };
          Object.defineProperties(Oe, {
            Provider: {
              get: function() {
                return F || (F = !0, Ee("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), C.Provider;
              },
              set: function(re) {
                C.Provider = re;
              }
            },
            _currentValue: {
              get: function() {
                return C._currentValue;
              },
              set: function(re) {
                C._currentValue = re;
              }
            },
            _currentValue2: {
              get: function() {
                return C._currentValue2;
              },
              set: function(re) {
                C._currentValue2 = re;
              }
            },
            _threadCount: {
              get: function() {
                return C._threadCount;
              },
              set: function(re) {
                C._threadCount = re;
              }
            },
            Consumer: {
              get: function() {
                return N || (N = !0, Ee("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), C.Consumer;
              }
            },
            displayName: {
              get: function() {
                return C.displayName;
              },
              set: function(re) {
                X || (Dt("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", re), X = !0);
              }
            }
          }), C.Consumer = Oe;
        }
        return C._currentRenderer = null, C._currentRenderer2 = null, C;
      }
      var xr = -1, br = 0, nr = 1, fi = 2;
      function Qa(h) {
        if (h._status === xr) {
          var C = h._result, N = C();
          if (N.then(function(Oe) {
            if (h._status === br || h._status === xr) {
              var re = h;
              re._status = nr, re._result = Oe;
            }
          }, function(Oe) {
            if (h._status === br || h._status === xr) {
              var re = h;
              re._status = fi, re._result = Oe;
            }
          }), h._status === xr) {
            var F = h;
            F._status = br, F._result = N;
          }
        }
        if (h._status === nr) {
          var X = h._result;
          return X === void 0 && Ee(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, X), "default" in X || Ee(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, X), X.default;
        } else
          throw h._result;
      }
      function di(h) {
        var C = {
          // We use these fields to store the result.
          _status: xr,
          _result: h
        }, N = {
          $$typeof: Ie,
          _payload: C,
          _init: Qa
        };
        {
          var F, X;
          Object.defineProperties(N, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return F;
              },
              set: function(Oe) {
                Ee("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), F = Oe, Object.defineProperty(N, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return X;
              },
              set: function(Oe) {
                Ee("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), X = Oe, Object.defineProperty(N, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return N;
      }
      function pi(h) {
        h != null && h.$$typeof === ue ? Ee("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof h != "function" ? Ee("forwardRef requires a render function but was given %s.", h === null ? "null" : typeof h) : h.length !== 0 && h.length !== 2 && Ee("forwardRef render functions accept exactly two parameters: props and ref. %s", h.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), h != null && (h.defaultProps != null || h.propTypes != null) && Ee("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var C = {
          $$typeof: ot,
          render: h
        };
        {
          var N;
          Object.defineProperty(C, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return N;
            },
            set: function(F) {
              N = F, !h.name && !h.displayName && (h.displayName = F);
            }
          });
        }
        return C;
      }
      var R;
      R = Symbol.for("react.module.reference");
      function B(h) {
        return !!(typeof h == "string" || typeof h == "function" || h === Ye || h === Pt || Ut || h === S || h === ee || h === Ce || ke || h === yt || Kt || an || xt || typeof h == "object" && h !== null && (h.$$typeof === Ie || h.$$typeof === ue || h.$$typeof === de || h.$$typeof === ve || h.$$typeof === ot || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        h.$$typeof === R || h.getModuleId !== void 0));
      }
      function ae(h, C) {
        B(h) || Ee("memo: The first argument must be a component. Instead received: %s", h === null ? "null" : typeof h);
        var N = {
          $$typeof: ue,
          type: h,
          compare: C === void 0 ? null : C
        };
        {
          var F;
          Object.defineProperty(N, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return F;
            },
            set: function(X) {
              F = X, !h.name && !h.displayName && (h.displayName = X);
            }
          });
        }
        return N;
      }
      function he() {
        var h = Qe.current;
        return h === null && Ee(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), h;
      }
      function Ge(h) {
        var C = he();
        if (h._context !== void 0) {
          var N = h._context;
          N.Consumer === h ? Ee("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : N.Provider === h && Ee("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return C.useContext(h);
      }
      function Be(h) {
        var C = he();
        return C.useState(h);
      }
      function ct(h, C, N) {
        var F = he();
        return F.useReducer(h, C, N);
      }
      function lt(h) {
        var C = he();
        return C.useRef(h);
      }
      function Rn(h, C) {
        var N = he();
        return N.useEffect(h, C);
      }
      function en(h, C) {
        var N = he();
        return N.useInsertionEffect(h, C);
      }
      function un(h, C) {
        var N = he();
        return N.useLayoutEffect(h, C);
      }
      function rr(h, C) {
        var N = he();
        return N.useCallback(h, C);
      }
      function Wa(h, C) {
        var N = he();
        return N.useMemo(h, C);
      }
      function Ga(h, C, N) {
        var F = he();
        return F.useImperativeHandle(h, C, N);
      }
      function qe(h, C) {
        {
          var N = he();
          return N.useDebugValue(h, C);
        }
      }
      function Je() {
        var h = he();
        return h.useTransition();
      }
      function qa(h) {
        var C = he();
        return C.useDeferredValue(h);
      }
      function tu() {
        var h = he();
        return h.useId();
      }
      function nu(h, C, N) {
        var F = he();
        return F.useSyncExternalStore(h, C, N);
      }
      var vl = 0, Qu, hl, Yr, Io, _r, lc, uc;
      function Wu() {
      }
      Wu.__reactDisabledLog = !0;
      function ml() {
        {
          if (vl === 0) {
            Qu = console.log, hl = console.info, Yr = console.warn, Io = console.error, _r = console.group, lc = console.groupCollapsed, uc = console.groupEnd;
            var h = {
              configurable: !0,
              enumerable: !0,
              value: Wu,
              writable: !0
            };
            Object.defineProperties(console, {
              info: h,
              log: h,
              warn: h,
              error: h,
              group: h,
              groupCollapsed: h,
              groupEnd: h
            });
          }
          vl++;
        }
      }
      function ca() {
        {
          if (vl--, vl === 0) {
            var h = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: V({}, h, {
                value: Qu
              }),
              info: V({}, h, {
                value: hl
              }),
              warn: V({}, h, {
                value: Yr
              }),
              error: V({}, h, {
                value: Io
              }),
              group: V({}, h, {
                value: _r
              }),
              groupCollapsed: V({}, h, {
                value: lc
              }),
              groupEnd: V({}, h, {
                value: uc
              })
            });
          }
          vl < 0 && Ee("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Xa = bt.ReactCurrentDispatcher, Ka;
      function Gu(h, C, N) {
        {
          if (Ka === void 0)
            try {
              throw Error();
            } catch (X) {
              var F = X.stack.trim().match(/\n( *(at )?)/);
              Ka = F && F[1] || "";
            }
          return `
` + Ka + h;
        }
      }
      var ru = !1, yl;
      {
        var qu = typeof WeakMap == "function" ? WeakMap : Map;
        yl = new qu();
      }
      function Xu(h, C) {
        if (!h || ru)
          return "";
        {
          var N = yl.get(h);
          if (N !== void 0)
            return N;
        }
        var F;
        ru = !0;
        var X = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var Oe;
        Oe = Xa.current, Xa.current = null, ml();
        try {
          if (C) {
            var re = function() {
              throw Error();
            };
            if (Object.defineProperty(re.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(re, []);
              } catch (vn) {
                F = vn;
              }
              Reflect.construct(h, [], re);
            } else {
              try {
                re.call();
              } catch (vn) {
                F = vn;
              }
              h.call(re.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (vn) {
              F = vn;
            }
            h();
          }
        } catch (vn) {
          if (vn && F && typeof vn.stack == "string") {
            for (var Ne = vn.stack.split(`
`), ft = F.stack.split(`
`), wt = Ne.length - 1, tn = ft.length - 1; wt >= 1 && tn >= 0 && Ne[wt] !== ft[tn]; )
              tn--;
            for (; wt >= 1 && tn >= 0; wt--, tn--)
              if (Ne[wt] !== ft[tn]) {
                if (wt !== 1 || tn !== 1)
                  do
                    if (wt--, tn--, tn < 0 || Ne[wt] !== ft[tn]) {
                      var It = `
` + Ne[wt].replace(" at new ", " at ");
                      return h.displayName && It.includes("<anonymous>") && (It = It.replace("<anonymous>", h.displayName)), typeof h == "function" && yl.set(h, It), It;
                    }
                  while (wt >= 1 && tn >= 0);
                break;
              }
          }
        } finally {
          ru = !1, Xa.current = Oe, ca(), Error.prepareStackTrace = X;
        }
        var rt = h ? h.displayName || h.name : "", Qt = rt ? Gu(rt) : "";
        return typeof h == "function" && yl.set(h, Qt), Qt;
      }
      function Hi(h, C, N) {
        return Xu(h, !1);
      }
      function Qf(h) {
        var C = h.prototype;
        return !!(C && C.isReactComponent);
      }
      function Vi(h, C, N) {
        if (h == null)
          return "";
        if (typeof h == "function")
          return Xu(h, Qf(h));
        if (typeof h == "string")
          return Gu(h);
        switch (h) {
          case ee:
            return Gu("Suspense");
          case Ce:
            return Gu("SuspenseList");
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case ot:
              return Hi(h.render);
            case ue:
              return Vi(h.type, C, N);
            case Ie: {
              var F = h, X = F._payload, Oe = F._init;
              try {
                return Vi(Oe(X), C, N);
              } catch {
              }
            }
          }
        return "";
      }
      var kt = {}, Ku = bt.ReactDebugCurrentFrame;
      function Tt(h) {
        if (h) {
          var C = h._owner, N = Vi(h.type, h._source, C ? C.type : null);
          Ku.setExtraStackFrame(N);
        } else
          Ku.setExtraStackFrame(null);
      }
      function Qo(h, C, N, F, X) {
        {
          var Oe = Function.call.bind(Cn);
          for (var re in h)
            if (Oe(h, re)) {
              var Ne = void 0;
              try {
                if (typeof h[re] != "function") {
                  var ft = Error((F || "React class") + ": " + N + " type `" + re + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof h[re] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw ft.name = "Invariant Violation", ft;
                }
                Ne = h[re](C, re, F, N, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (wt) {
                Ne = wt;
              }
              Ne && !(Ne instanceof Error) && (Tt(X), Ee("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", F || "React class", N, re, typeof Ne), Tt(null)), Ne instanceof Error && !(Ne.message in kt) && (kt[Ne.message] = !0, Tt(X), Ee("Failed %s type: %s", N, Ne.message), Tt(null));
            }
        }
      }
      function vi(h) {
        if (h) {
          var C = h._owner, N = Vi(h.type, h._source, C ? C.type : null);
          Ft(N);
        } else
          Ft(null);
      }
      var Pe;
      Pe = !1;
      function Zu() {
        if (st.current) {
          var h = Gn(st.current.type);
          if (h)
            return `

Check the render method of \`` + h + "`.";
        }
        return "";
      }
      function ar(h) {
        if (h !== void 0) {
          var C = h.fileName.replace(/^.*[\\\/]/, ""), N = h.lineNumber;
          return `

Check your code at ` + C + ":" + N + ".";
        }
        return "";
      }
      function hi(h) {
        return h != null ? ar(h.__source) : "";
      }
      var Dr = {};
      function mi(h) {
        var C = Zu();
        if (!C) {
          var N = typeof h == "string" ? h : h.displayName || h.name;
          N && (C = `

Check the top-level render call using <` + N + ">.");
        }
        return C;
      }
      function on(h, C) {
        if (!(!h._store || h._store.validated || h.key != null)) {
          h._store.validated = !0;
          var N = mi(C);
          if (!Dr[N]) {
            Dr[N] = !0;
            var F = "";
            h && h._owner && h._owner !== st.current && (F = " It was passed a child from " + Gn(h._owner.type) + "."), vi(h), Ee('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', N, F), vi(null);
          }
        }
      }
      function Yt(h, C) {
        if (typeof h == "object") {
          if (En(h))
            for (var N = 0; N < h.length; N++) {
              var F = h[N];
              pn(F) && on(F, C);
            }
          else if (pn(h))
            h._store && (h._store.validated = !0);
          else if (h) {
            var X = dt(h);
            if (typeof X == "function" && X !== h.entries)
              for (var Oe = X.call(h), re; !(re = Oe.next()).done; )
                pn(re.value) && on(re.value, C);
          }
        }
      }
      function gl(h) {
        {
          var C = h.type;
          if (C == null || typeof C == "string")
            return;
          var N;
          if (typeof C == "function")
            N = C.propTypes;
          else if (typeof C == "object" && (C.$$typeof === ot || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          C.$$typeof === ue))
            N = C.propTypes;
          else
            return;
          if (N) {
            var F = Gn(C);
            Qo(N, h.props, "prop", F, h);
          } else if (C.PropTypes !== void 0 && !Pe) {
            Pe = !0;
            var X = Gn(C);
            Ee("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", X || "Unknown");
          }
          typeof C.getDefaultProps == "function" && !C.getDefaultProps.isReactClassApproved && Ee("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function $n(h) {
        {
          for (var C = Object.keys(h.props), N = 0; N < C.length; N++) {
            var F = C[N];
            if (F !== "children" && F !== "key") {
              vi(h), Ee("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", F), vi(null);
              break;
            }
          }
          h.ref !== null && (vi(h), Ee("Invalid attribute `ref` supplied to `React.Fragment`."), vi(null));
        }
      }
      function kr(h, C, N) {
        var F = B(h);
        if (!F) {
          var X = "";
          (h === void 0 || typeof h == "object" && h !== null && Object.keys(h).length === 0) && (X += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Oe = hi(C);
          Oe ? X += Oe : X += Zu();
          var re;
          h === null ? re = "null" : En(h) ? re = "array" : h !== void 0 && h.$$typeof === Rt ? (re = "<" + (Gn(h.type) || "Unknown") + " />", X = " Did you accidentally export a JSX literal instead of a component?") : re = typeof h, Ee("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", re, X);
        }
        var Ne = nt.apply(this, arguments);
        if (Ne == null)
          return Ne;
        if (F)
          for (var ft = 2; ft < arguments.length; ft++)
            Yt(arguments[ft], h);
        return h === Ye ? $n(Ne) : gl(Ne), Ne;
      }
      var wa = !1;
      function au(h) {
        var C = kr.bind(null, h);
        return C.type = h, wa || (wa = !0, Dt("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(C, "type", {
          enumerable: !1,
          get: function() {
            return Dt("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: h
            }), h;
          }
        }), C;
      }
      function Wo(h, C, N) {
        for (var F = Zt.apply(this, arguments), X = 2; X < arguments.length; X++)
          Yt(arguments[X], F.type);
        return gl(F), F;
      }
      function Go(h, C) {
        var N = vt.transition;
        vt.transition = {};
        var F = vt.transition;
        vt.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          h();
        } finally {
          if (vt.transition = N, N === null && F._updatedFibers) {
            var X = F._updatedFibers.size;
            X > 10 && Dt("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), F._updatedFibers.clear();
          }
        }
      }
      var Sl = !1, iu = null;
      function Wf(h) {
        if (iu === null)
          try {
            var C = ("require" + Math.random()).slice(0, 7), N = K && K[C];
            iu = N.call(K, "timers").setImmediate;
          } catch {
            iu = function(X) {
              Sl === !1 && (Sl = !0, typeof MessageChannel > "u" && Ee("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var Oe = new MessageChannel();
              Oe.port1.onmessage = X, Oe.port2.postMessage(void 0);
            };
          }
        return iu(h);
      }
      var xa = 0, Za = !1;
      function yi(h) {
        {
          var C = xa;
          xa++, be.current === null && (be.current = []);
          var N = be.isBatchingLegacy, F;
          try {
            if (be.isBatchingLegacy = !0, F = h(), !N && be.didScheduleLegacyUpdate) {
              var X = be.current;
              X !== null && (be.didScheduleLegacyUpdate = !1, El(X));
            }
          } catch (rt) {
            throw ba(C), rt;
          } finally {
            be.isBatchingLegacy = N;
          }
          if (F !== null && typeof F == "object" && typeof F.then == "function") {
            var Oe = F, re = !1, Ne = {
              then: function(rt, Qt) {
                re = !0, Oe.then(function(vn) {
                  ba(C), xa === 0 ? Ju(vn, rt, Qt) : rt(vn);
                }, function(vn) {
                  ba(C), Qt(vn);
                });
              }
            };
            return !Za && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              re || (Za = !0, Ee("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), Ne;
          } else {
            var ft = F;
            if (ba(C), xa === 0) {
              var wt = be.current;
              wt !== null && (El(wt), be.current = null);
              var tn = {
                then: function(rt, Qt) {
                  be.current === null ? (be.current = [], Ju(ft, rt, Qt)) : rt(ft);
                }
              };
              return tn;
            } else {
              var It = {
                then: function(rt, Qt) {
                  rt(ft);
                }
              };
              return It;
            }
          }
        }
      }
      function ba(h) {
        h !== xa - 1 && Ee("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), xa = h;
      }
      function Ju(h, C, N) {
        {
          var F = be.current;
          if (F !== null)
            try {
              El(F), Wf(function() {
                F.length === 0 ? (be.current = null, C(h)) : Ju(h, C, N);
              });
            } catch (X) {
              N(X);
            }
          else
            C(h);
        }
      }
      var eo = !1;
      function El(h) {
        if (!eo) {
          eo = !0;
          var C = 0;
          try {
            for (; C < h.length; C++) {
              var N = h[C];
              do
                N = N(!0);
              while (N !== null);
            }
            h.length = 0;
          } catch (F) {
            throw h = h.slice(C + 1), F;
          } finally {
            eo = !1;
          }
        }
      }
      var lu = kr, to = Wo, no = au, Ja = {
        map: ji,
        forEach: Jl,
        count: Zl,
        toArray: dl,
        only: pl
      };
      q.Children = Ja, q.Component = Ue, q.Fragment = Ye, q.Profiler = Pt, q.PureComponent = it, q.StrictMode = S, q.Suspense = ee, q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = bt, q.act = yi, q.cloneElement = to, q.createContext = eu, q.createElement = lu, q.createFactory = no, q.createRef = kn, q.forwardRef = pi, q.isValidElement = pn, q.lazy = di, q.memo = ae, q.startTransition = Go, q.unstable_act = yi, q.useCallback = rr, q.useContext = Ge, q.useDebugValue = qe, q.useDeferredValue = qa, q.useEffect = Rn, q.useId = tu, q.useImperativeHandle = Ga, q.useInsertionEffect = en, q.useLayoutEffect = un, q.useMemo = Wa, q.useReducer = ct, q.useRef = lt, q.useState = Be, q.useSyncExternalStore = nu, q.useTransition = Je, q.version = A, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(Jp, Jp.exports)), Jp.exports;
}
process.env.NODE_ENV === "production" ? dE.exports = G_() : dE.exports = q_();
var Ra = dE.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var KR;
function X_() {
  if (KR) return Kp;
  KR = 1;
  var K = Ra, q = Symbol.for("react.element"), A = Symbol.for("react.fragment"), Rt = Object.prototype.hasOwnProperty, Ke = K.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Ye = { key: !0, ref: !0, __self: !0, __source: !0 };
  function S(Pt, de, ve) {
    var ot, ee = {}, Ce = null, ue = null;
    ve !== void 0 && (Ce = "" + ve), de.key !== void 0 && (Ce = "" + de.key), de.ref !== void 0 && (ue = de.ref);
    for (ot in de) Rt.call(de, ot) && !Ye.hasOwnProperty(ot) && (ee[ot] = de[ot]);
    if (Pt && Pt.defaultProps) for (ot in de = Pt.defaultProps, de) ee[ot] === void 0 && (ee[ot] = de[ot]);
    return { $$typeof: q, type: Pt, key: Ce, ref: ue, props: ee, _owner: Ke.current };
  }
  return Kp.Fragment = A, Kp.jsx = S, Kp.jsxs = S, Kp;
}
var Zp = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ZR;
function K_() {
  return ZR || (ZR = 1, process.env.NODE_ENV !== "production" && function() {
    var K = Ra, q = Symbol.for("react.element"), A = Symbol.for("react.portal"), Rt = Symbol.for("react.fragment"), Ke = Symbol.for("react.strict_mode"), Ye = Symbol.for("react.profiler"), S = Symbol.for("react.provider"), Pt = Symbol.for("react.context"), de = Symbol.for("react.forward_ref"), ve = Symbol.for("react.suspense"), ot = Symbol.for("react.suspense_list"), ee = Symbol.for("react.memo"), Ce = Symbol.for("react.lazy"), ue = Symbol.for("react.offscreen"), Ie = Symbol.iterator, yt = "@@iterator";
    function pt(R) {
      if (R === null || typeof R != "object")
        return null;
      var B = Ie && R[Ie] || R[yt];
      return typeof B == "function" ? B : null;
    }
    var cn = K.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function dt(R) {
      {
        for (var B = arguments.length, ae = new Array(B > 1 ? B - 1 : 0), he = 1; he < B; he++)
          ae[he - 1] = arguments[he];
        Qe("error", R, ae);
      }
    }
    function Qe(R, B, ae) {
      {
        var he = cn.ReactDebugCurrentFrame, Ge = he.getStackAddendum();
        Ge !== "" && (B += "%s", ae = ae.concat([Ge]));
        var Be = ae.map(function(ct) {
          return String(ct);
        });
        Be.unshift("Warning: " + B), Function.prototype.apply.call(console[R], console, Be);
      }
    }
    var vt = !1, be = !1, st = !1, Fe = !1, rn = !1, Ft;
    Ft = Symbol.for("react.module.reference");
    function Kt(R) {
      return !!(typeof R == "string" || typeof R == "function" || R === Rt || R === Ye || rn || R === Ke || R === ve || R === ot || Fe || R === ue || vt || be || st || typeof R == "object" && R !== null && (R.$$typeof === Ce || R.$$typeof === ee || R.$$typeof === S || R.$$typeof === Pt || R.$$typeof === de || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      R.$$typeof === Ft || R.getModuleId !== void 0));
    }
    function an(R, B, ae) {
      var he = R.displayName;
      if (he)
        return he;
      var Ge = B.displayName || B.name || "";
      return Ge !== "" ? ae + "(" + Ge + ")" : ae;
    }
    function xt(R) {
      return R.displayName || "Context";
    }
    function ke(R) {
      if (R == null)
        return null;
      if (typeof R.tag == "number" && dt("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof R == "function")
        return R.displayName || R.name || null;
      if (typeof R == "string")
        return R;
      switch (R) {
        case Rt:
          return "Fragment";
        case A:
          return "Portal";
        case Ye:
          return "Profiler";
        case Ke:
          return "StrictMode";
        case ve:
          return "Suspense";
        case ot:
          return "SuspenseList";
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case Pt:
            var B = R;
            return xt(B) + ".Consumer";
          case S:
            var ae = R;
            return xt(ae._context) + ".Provider";
          case de:
            return an(R, R.render, "ForwardRef");
          case ee:
            var he = R.displayName || null;
            return he !== null ? he : ke(R.type) || "Memo";
          case Ce: {
            var Ge = R, Be = Ge._payload, ct = Ge._init;
            try {
              return ke(ct(Be));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Ut = Object.assign, bt = 0, Dt, Ee, Z, Re, ne, _, V;
    function je() {
    }
    je.__reactDisabledLog = !0;
    function Ue() {
      {
        if (bt === 0) {
          Dt = console.log, Ee = console.info, Z = console.warn, Re = console.error, ne = console.group, _ = console.groupCollapsed, V = console.groupEnd;
          var R = {
            configurable: !0,
            enumerable: !0,
            value: je,
            writable: !0
          };
          Object.defineProperties(console, {
            info: R,
            log: R,
            warn: R,
            error: R,
            group: R,
            groupCollapsed: R,
            groupEnd: R
          });
        }
        bt++;
      }
    }
    function at() {
      {
        if (bt--, bt === 0) {
          var R = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Ut({}, R, {
              value: Dt
            }),
            info: Ut({}, R, {
              value: Ee
            }),
            warn: Ut({}, R, {
              value: Z
            }),
            error: Ut({}, R, {
              value: Re
            }),
            group: Ut({}, R, {
              value: ne
            }),
            groupCollapsed: Ut({}, R, {
              value: _
            }),
            groupEnd: Ut({}, R, {
              value: V
            })
          });
        }
        bt < 0 && dt("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var et = cn.ReactCurrentDispatcher, Ze;
    function tt(R, B, ae) {
      {
        if (Ze === void 0)
          try {
            throw Error();
          } catch (Ge) {
            var he = Ge.stack.trim().match(/\n( *(at )?)/);
            Ze = he && he[1] || "";
          }
        return `
` + Ze + R;
      }
    }
    var it = !1, Vt;
    {
      var kn = typeof WeakMap == "function" ? WeakMap : Map;
      Vt = new kn();
    }
    function wr(R, B) {
      if (!R || it)
        return "";
      {
        var ae = Vt.get(R);
        if (ae !== void 0)
          return ae;
      }
      var he;
      it = !0;
      var Ge = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Be;
      Be = et.current, et.current = null, Ue();
      try {
        if (B) {
          var ct = function() {
            throw Error();
          };
          if (Object.defineProperty(ct.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(ct, []);
            } catch (qe) {
              he = qe;
            }
            Reflect.construct(R, [], ct);
          } else {
            try {
              ct.call();
            } catch (qe) {
              he = qe;
            }
            R.call(ct.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (qe) {
            he = qe;
          }
          R();
        }
      } catch (qe) {
        if (qe && he && typeof qe.stack == "string") {
          for (var lt = qe.stack.split(`
`), Rn = he.stack.split(`
`), en = lt.length - 1, un = Rn.length - 1; en >= 1 && un >= 0 && lt[en] !== Rn[un]; )
            un--;
          for (; en >= 1 && un >= 0; en--, un--)
            if (lt[en] !== Rn[un]) {
              if (en !== 1 || un !== 1)
                do
                  if (en--, un--, un < 0 || lt[en] !== Rn[un]) {
                    var rr = `
` + lt[en].replace(" at new ", " at ");
                    return R.displayName && rr.includes("<anonymous>") && (rr = rr.replace("<anonymous>", R.displayName)), typeof R == "function" && Vt.set(R, rr), rr;
                  }
                while (en >= 1 && un >= 0);
              break;
            }
        }
      } finally {
        it = !1, et.current = Be, at(), Error.prepareStackTrace = Ge;
      }
      var Wa = R ? R.displayName || R.name : "", Ga = Wa ? tt(Wa) : "";
      return typeof R == "function" && Vt.set(R, Ga), Ga;
    }
    function En(R, B, ae) {
      return wr(R, !1);
    }
    function tr(R) {
      var B = R.prototype;
      return !!(B && B.isReactComponent);
    }
    function Vn(R, B, ae) {
      if (R == null)
        return "";
      if (typeof R == "function")
        return wr(R, tr(R));
      if (typeof R == "string")
        return tt(R);
      switch (R) {
        case ve:
          return tt("Suspense");
        case ot:
          return tt("SuspenseList");
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case de:
            return En(R.render);
          case ee:
            return Vn(R.type, B, ae);
          case Ce: {
            var he = R, Ge = he._payload, Be = he._init;
            try {
              return Vn(Be(Ge), B, ae);
            } catch {
            }
          }
        }
      return "";
    }
    var Pn = Object.prototype.hasOwnProperty, $r = {}, si = cn.ReactDebugCurrentFrame;
    function ua(R) {
      if (R) {
        var B = R._owner, ae = Vn(R.type, R._source, B ? B.type : null);
        si.setExtraStackFrame(ae);
      } else
        si.setExtraStackFrame(null);
    }
    function Gn(R, B, ae, he, Ge) {
      {
        var Be = Function.call.bind(Pn);
        for (var ct in R)
          if (Be(R, ct)) {
            var lt = void 0;
            try {
              if (typeof R[ct] != "function") {
                var Rn = Error((he || "React class") + ": " + ae + " type `" + ct + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof R[ct] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Rn.name = "Invariant Violation", Rn;
              }
              lt = R[ct](B, ct, he, ae, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (en) {
              lt = en;
            }
            lt && !(lt instanceof Error) && (ua(Ge), dt("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", he || "React class", ae, ct, typeof lt), ua(null)), lt instanceof Error && !(lt.message in $r) && ($r[lt.message] = !0, ua(Ge), dt("Failed %s type: %s", ae, lt.message), ua(null));
          }
      }
    }
    var Cn = Array.isArray;
    function Bn(R) {
      return Cn(R);
    }
    function yr(R) {
      {
        var B = typeof Symbol == "function" && Symbol.toStringTag, ae = B && R[Symbol.toStringTag] || R.constructor.name || "Object";
        return ae;
      }
    }
    function Ya(R) {
      try {
        return On(R), !1;
      } catch {
        return !0;
      }
    }
    function On(R) {
      return "" + R;
    }
    function gr(R) {
      if (Ya(R))
        return dt("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", yr(R)), On(R);
    }
    var oa = cn.ReactCurrentOwner, Ia = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ci, J;
    function Te(R) {
      if (Pn.call(R, "ref")) {
        var B = Object.getOwnPropertyDescriptor(R, "ref").get;
        if (B && B.isReactWarning)
          return !1;
      }
      return R.ref !== void 0;
    }
    function nt(R) {
      if (Pn.call(R, "key")) {
        var B = Object.getOwnPropertyDescriptor(R, "key").get;
        if (B && B.isReactWarning)
          return !1;
      }
      return R.key !== void 0;
    }
    function At(R, B) {
      typeof R.ref == "string" && oa.current;
    }
    function Zt(R, B) {
      {
        var ae = function() {
          ci || (ci = !0, dt("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", B));
        };
        ae.isReactWarning = !0, Object.defineProperty(R, "key", {
          get: ae,
          configurable: !0
        });
      }
    }
    function pn(R, B) {
      {
        var ae = function() {
          J || (J = !0, dt("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", B));
        };
        ae.isReactWarning = !0, Object.defineProperty(R, "ref", {
          get: ae,
          configurable: !0
        });
      }
    }
    var ln = function(R, B, ae, he, Ge, Be, ct) {
      var lt = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: q,
        // Built-in properties that belong on the element
        type: R,
        key: B,
        ref: ae,
        props: ct,
        // Record the component responsible for creating this element.
        _owner: Be
      };
      return lt._store = {}, Object.defineProperty(lt._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(lt, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: he
      }), Object.defineProperty(lt, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Ge
      }), Object.freeze && (Object.freeze(lt.props), Object.freeze(lt)), lt;
    };
    function qn(R, B, ae, he, Ge) {
      {
        var Be, ct = {}, lt = null, Rn = null;
        ae !== void 0 && (gr(ae), lt = "" + ae), nt(B) && (gr(B.key), lt = "" + B.key), Te(B) && (Rn = B.ref, At(B, Ge));
        for (Be in B)
          Pn.call(B, Be) && !Ia.hasOwnProperty(Be) && (ct[Be] = B[Be]);
        if (R && R.defaultProps) {
          var en = R.defaultProps;
          for (Be in en)
            ct[Be] === void 0 && (ct[Be] = en[Be]);
        }
        if (lt || Rn) {
          var un = typeof R == "function" ? R.displayName || R.name || "Unknown" : R;
          lt && Zt(ct, un), Rn && pn(ct, un);
        }
        return ln(R, lt, Rn, Ge, he, oa.current, ct);
      }
    }
    var Jt = cn.ReactCurrentOwner, Bt = cn.ReactDebugCurrentFrame;
    function $t(R) {
      if (R) {
        var B = R._owner, ae = Vn(R.type, R._source, B ? B.type : null);
        Bt.setExtraStackFrame(ae);
      } else
        Bt.setExtraStackFrame(null);
    }
    var sa;
    sa = !1;
    function Sr(R) {
      return typeof R == "object" && R !== null && R.$$typeof === q;
    }
    function Ta() {
      {
        if (Jt.current) {
          var R = ke(Jt.current.type);
          if (R)
            return `

Check the render method of \`` + R + "`.";
        }
        return "";
      }
    }
    function ji(R) {
      return "";
    }
    var Zl = {};
    function Jl(R) {
      {
        var B = Ta();
        if (!B) {
          var ae = typeof R == "string" ? R : R.displayName || R.name;
          ae && (B = `

Check the top-level render call using <` + ae + ">.");
        }
        return B;
      }
    }
    function dl(R, B) {
      {
        if (!R._store || R._store.validated || R.key != null)
          return;
        R._store.validated = !0;
        var ae = Jl(B);
        if (Zl[ae])
          return;
        Zl[ae] = !0;
        var he = "";
        R && R._owner && R._owner !== Jt.current && (he = " It was passed a child from " + ke(R._owner.type) + "."), $t(R), dt('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ae, he), $t(null);
      }
    }
    function pl(R, B) {
      {
        if (typeof R != "object")
          return;
        if (Bn(R))
          for (var ae = 0; ae < R.length; ae++) {
            var he = R[ae];
            Sr(he) && dl(he, B);
          }
        else if (Sr(R))
          R._store && (R._store.validated = !0);
        else if (R) {
          var Ge = pt(R);
          if (typeof Ge == "function" && Ge !== R.entries)
            for (var Be = Ge.call(R), ct; !(ct = Be.next()).done; )
              Sr(ct.value) && dl(ct.value, B);
        }
      }
    }
    function eu(R) {
      {
        var B = R.type;
        if (B == null || typeof B == "string")
          return;
        var ae;
        if (typeof B == "function")
          ae = B.propTypes;
        else if (typeof B == "object" && (B.$$typeof === de || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        B.$$typeof === ee))
          ae = B.propTypes;
        else
          return;
        if (ae) {
          var he = ke(B);
          Gn(ae, R.props, "prop", he, R);
        } else if (B.PropTypes !== void 0 && !sa) {
          sa = !0;
          var Ge = ke(B);
          dt("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Ge || "Unknown");
        }
        typeof B.getDefaultProps == "function" && !B.getDefaultProps.isReactClassApproved && dt("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function xr(R) {
      {
        for (var B = Object.keys(R.props), ae = 0; ae < B.length; ae++) {
          var he = B[ae];
          if (he !== "children" && he !== "key") {
            $t(R), dt("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", he), $t(null);
            break;
          }
        }
        R.ref !== null && ($t(R), dt("Invalid attribute `ref` supplied to `React.Fragment`."), $t(null));
      }
    }
    var br = {};
    function nr(R, B, ae, he, Ge, Be) {
      {
        var ct = Kt(R);
        if (!ct) {
          var lt = "";
          (R === void 0 || typeof R == "object" && R !== null && Object.keys(R).length === 0) && (lt += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Rn = ji();
          Rn ? lt += Rn : lt += Ta();
          var en;
          R === null ? en = "null" : Bn(R) ? en = "array" : R !== void 0 && R.$$typeof === q ? (en = "<" + (ke(R.type) || "Unknown") + " />", lt = " Did you accidentally export a JSX literal instead of a component?") : en = typeof R, dt("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", en, lt);
        }
        var un = qn(R, B, ae, Ge, Be);
        if (un == null)
          return un;
        if (ct) {
          var rr = B.children;
          if (rr !== void 0)
            if (he)
              if (Bn(rr)) {
                for (var Wa = 0; Wa < rr.length; Wa++)
                  pl(rr[Wa], R);
                Object.freeze && Object.freeze(rr);
              } else
                dt("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              pl(rr, R);
        }
        if (Pn.call(B, "key")) {
          var Ga = ke(R), qe = Object.keys(B).filter(function(tu) {
            return tu !== "key";
          }), Je = qe.length > 0 ? "{key: someKey, " + qe.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!br[Ga + Je]) {
            var qa = qe.length > 0 ? "{" + qe.join(": ..., ") + ": ...}" : "{}";
            dt(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Je, Ga, qa, Ga), br[Ga + Je] = !0;
          }
        }
        return R === Rt ? xr(un) : eu(un), un;
      }
    }
    function fi(R, B, ae) {
      return nr(R, B, ae, !0);
    }
    function Qa(R, B, ae) {
      return nr(R, B, ae, !1);
    }
    var di = Qa, pi = fi;
    Zp.Fragment = Rt, Zp.jsx = di, Zp.jsxs = pi;
  }()), Zp;
}
process.env.NODE_ENV === "production" ? fE.exports = X_() : fE.exports = K_();
var Yo = fE.exports, pE = { exports: {} }, Ba = {}, Im = { exports: {} }, sE = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var JR;
function Z_() {
  return JR || (JR = 1, function(K) {
    function q(Z, Re) {
      var ne = Z.length;
      Z.push(Re);
      e: for (; 0 < ne; ) {
        var _ = ne - 1 >>> 1, V = Z[_];
        if (0 < Ke(V, Re)) Z[_] = Re, Z[ne] = V, ne = _;
        else break e;
      }
    }
    function A(Z) {
      return Z.length === 0 ? null : Z[0];
    }
    function Rt(Z) {
      if (Z.length === 0) return null;
      var Re = Z[0], ne = Z.pop();
      if (ne !== Re) {
        Z[0] = ne;
        e: for (var _ = 0, V = Z.length, je = V >>> 1; _ < je; ) {
          var Ue = 2 * (_ + 1) - 1, at = Z[Ue], et = Ue + 1, Ze = Z[et];
          if (0 > Ke(at, ne)) et < V && 0 > Ke(Ze, at) ? (Z[_] = Ze, Z[et] = ne, _ = et) : (Z[_] = at, Z[Ue] = ne, _ = Ue);
          else if (et < V && 0 > Ke(Ze, ne)) Z[_] = Ze, Z[et] = ne, _ = et;
          else break e;
        }
      }
      return Re;
    }
    function Ke(Z, Re) {
      var ne = Z.sortIndex - Re.sortIndex;
      return ne !== 0 ? ne : Z.id - Re.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var Ye = performance;
      K.unstable_now = function() {
        return Ye.now();
      };
    } else {
      var S = Date, Pt = S.now();
      K.unstable_now = function() {
        return S.now() - Pt;
      };
    }
    var de = [], ve = [], ot = 1, ee = null, Ce = 3, ue = !1, Ie = !1, yt = !1, pt = typeof setTimeout == "function" ? setTimeout : null, cn = typeof clearTimeout == "function" ? clearTimeout : null, dt = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Qe(Z) {
      for (var Re = A(ve); Re !== null; ) {
        if (Re.callback === null) Rt(ve);
        else if (Re.startTime <= Z) Rt(ve), Re.sortIndex = Re.expirationTime, q(de, Re);
        else break;
        Re = A(ve);
      }
    }
    function vt(Z) {
      if (yt = !1, Qe(Z), !Ie) if (A(de) !== null) Ie = !0, Dt(be);
      else {
        var Re = A(ve);
        Re !== null && Ee(vt, Re.startTime - Z);
      }
    }
    function be(Z, Re) {
      Ie = !1, yt && (yt = !1, cn(rn), rn = -1), ue = !0;
      var ne = Ce;
      try {
        for (Qe(Re), ee = A(de); ee !== null && (!(ee.expirationTime > Re) || Z && !an()); ) {
          var _ = ee.callback;
          if (typeof _ == "function") {
            ee.callback = null, Ce = ee.priorityLevel;
            var V = _(ee.expirationTime <= Re);
            Re = K.unstable_now(), typeof V == "function" ? ee.callback = V : ee === A(de) && Rt(de), Qe(Re);
          } else Rt(de);
          ee = A(de);
        }
        if (ee !== null) var je = !0;
        else {
          var Ue = A(ve);
          Ue !== null && Ee(vt, Ue.startTime - Re), je = !1;
        }
        return je;
      } finally {
        ee = null, Ce = ne, ue = !1;
      }
    }
    var st = !1, Fe = null, rn = -1, Ft = 5, Kt = -1;
    function an() {
      return !(K.unstable_now() - Kt < Ft);
    }
    function xt() {
      if (Fe !== null) {
        var Z = K.unstable_now();
        Kt = Z;
        var Re = !0;
        try {
          Re = Fe(!0, Z);
        } finally {
          Re ? ke() : (st = !1, Fe = null);
        }
      } else st = !1;
    }
    var ke;
    if (typeof dt == "function") ke = function() {
      dt(xt);
    };
    else if (typeof MessageChannel < "u") {
      var Ut = new MessageChannel(), bt = Ut.port2;
      Ut.port1.onmessage = xt, ke = function() {
        bt.postMessage(null);
      };
    } else ke = function() {
      pt(xt, 0);
    };
    function Dt(Z) {
      Fe = Z, st || (st = !0, ke());
    }
    function Ee(Z, Re) {
      rn = pt(function() {
        Z(K.unstable_now());
      }, Re);
    }
    K.unstable_IdlePriority = 5, K.unstable_ImmediatePriority = 1, K.unstable_LowPriority = 4, K.unstable_NormalPriority = 3, K.unstable_Profiling = null, K.unstable_UserBlockingPriority = 2, K.unstable_cancelCallback = function(Z) {
      Z.callback = null;
    }, K.unstable_continueExecution = function() {
      Ie || ue || (Ie = !0, Dt(be));
    }, K.unstable_forceFrameRate = function(Z) {
      0 > Z || 125 < Z ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Ft = 0 < Z ? Math.floor(1e3 / Z) : 5;
    }, K.unstable_getCurrentPriorityLevel = function() {
      return Ce;
    }, K.unstable_getFirstCallbackNode = function() {
      return A(de);
    }, K.unstable_next = function(Z) {
      switch (Ce) {
        case 1:
        case 2:
        case 3:
          var Re = 3;
          break;
        default:
          Re = Ce;
      }
      var ne = Ce;
      Ce = Re;
      try {
        return Z();
      } finally {
        Ce = ne;
      }
    }, K.unstable_pauseExecution = function() {
    }, K.unstable_requestPaint = function() {
    }, K.unstable_runWithPriority = function(Z, Re) {
      switch (Z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          Z = 3;
      }
      var ne = Ce;
      Ce = Z;
      try {
        return Re();
      } finally {
        Ce = ne;
      }
    }, K.unstable_scheduleCallback = function(Z, Re, ne) {
      var _ = K.unstable_now();
      switch (typeof ne == "object" && ne !== null ? (ne = ne.delay, ne = typeof ne == "number" && 0 < ne ? _ + ne : _) : ne = _, Z) {
        case 1:
          var V = -1;
          break;
        case 2:
          V = 250;
          break;
        case 5:
          V = 1073741823;
          break;
        case 4:
          V = 1e4;
          break;
        default:
          V = 5e3;
      }
      return V = ne + V, Z = { id: ot++, callback: Re, priorityLevel: Z, startTime: ne, expirationTime: V, sortIndex: -1 }, ne > _ ? (Z.sortIndex = ne, q(ve, Z), A(de) === null && Z === A(ve) && (yt ? (cn(rn), rn = -1) : yt = !0, Ee(vt, ne - _))) : (Z.sortIndex = V, q(de, Z), Ie || ue || (Ie = !0, Dt(be))), Z;
    }, K.unstable_shouldYield = an, K.unstable_wrapCallback = function(Z) {
      var Re = Ce;
      return function() {
        var ne = Ce;
        Ce = Re;
        try {
          return Z.apply(this, arguments);
        } finally {
          Ce = ne;
        }
      };
    };
  }(sE)), sE;
}
var cE = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var eT;
function J_() {
  return eT || (eT = 1, function(K) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var q = !1, A = 5;
      function Rt(J, Te) {
        var nt = J.length;
        J.push(Te), S(J, Te, nt);
      }
      function Ke(J) {
        return J.length === 0 ? null : J[0];
      }
      function Ye(J) {
        if (J.length === 0)
          return null;
        var Te = J[0], nt = J.pop();
        return nt !== Te && (J[0] = nt, Pt(J, nt, 0)), Te;
      }
      function S(J, Te, nt) {
        for (var At = nt; At > 0; ) {
          var Zt = At - 1 >>> 1, pn = J[Zt];
          if (de(pn, Te) > 0)
            J[Zt] = Te, J[At] = pn, At = Zt;
          else
            return;
        }
      }
      function Pt(J, Te, nt) {
        for (var At = nt, Zt = J.length, pn = Zt >>> 1; At < pn; ) {
          var ln = (At + 1) * 2 - 1, qn = J[ln], Jt = ln + 1, Bt = J[Jt];
          if (de(qn, Te) < 0)
            Jt < Zt && de(Bt, qn) < 0 ? (J[At] = Bt, J[Jt] = Te, At = Jt) : (J[At] = qn, J[ln] = Te, At = ln);
          else if (Jt < Zt && de(Bt, Te) < 0)
            J[At] = Bt, J[Jt] = Te, At = Jt;
          else
            return;
        }
      }
      function de(J, Te) {
        var nt = J.sortIndex - Te.sortIndex;
        return nt !== 0 ? nt : J.id - Te.id;
      }
      var ve = 1, ot = 2, ee = 3, Ce = 4, ue = 5;
      function Ie(J, Te) {
      }
      var yt = typeof performance == "object" && typeof performance.now == "function";
      if (yt) {
        var pt = performance;
        K.unstable_now = function() {
          return pt.now();
        };
      } else {
        var cn = Date, dt = cn.now();
        K.unstable_now = function() {
          return cn.now() - dt;
        };
      }
      var Qe = 1073741823, vt = -1, be = 250, st = 5e3, Fe = 1e4, rn = Qe, Ft = [], Kt = [], an = 1, xt = null, ke = ee, Ut = !1, bt = !1, Dt = !1, Ee = typeof setTimeout == "function" ? setTimeout : null, Z = typeof clearTimeout == "function" ? clearTimeout : null, Re = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function ne(J) {
        for (var Te = Ke(Kt); Te !== null; ) {
          if (Te.callback === null)
            Ye(Kt);
          else if (Te.startTime <= J)
            Ye(Kt), Te.sortIndex = Te.expirationTime, Rt(Ft, Te);
          else
            return;
          Te = Ke(Kt);
        }
      }
      function _(J) {
        if (Dt = !1, ne(J), !bt)
          if (Ke(Ft) !== null)
            bt = !0, On(V);
          else {
            var Te = Ke(Kt);
            Te !== null && gr(_, Te.startTime - J);
          }
      }
      function V(J, Te) {
        bt = !1, Dt && (Dt = !1, oa()), Ut = !0;
        var nt = ke;
        try {
          var At;
          if (!q) return je(J, Te);
        } finally {
          xt = null, ke = nt, Ut = !1;
        }
      }
      function je(J, Te) {
        var nt = Te;
        for (ne(nt), xt = Ke(Ft); xt !== null && !(xt.expirationTime > nt && (!J || si())); ) {
          var At = xt.callback;
          if (typeof At == "function") {
            xt.callback = null, ke = xt.priorityLevel;
            var Zt = xt.expirationTime <= nt, pn = At(Zt);
            nt = K.unstable_now(), typeof pn == "function" ? xt.callback = pn : xt === Ke(Ft) && Ye(Ft), ne(nt);
          } else
            Ye(Ft);
          xt = Ke(Ft);
        }
        if (xt !== null)
          return !0;
        var ln = Ke(Kt);
        return ln !== null && gr(_, ln.startTime - nt), !1;
      }
      function Ue(J, Te) {
        switch (J) {
          case ve:
          case ot:
          case ee:
          case Ce:
          case ue:
            break;
          default:
            J = ee;
        }
        var nt = ke;
        ke = J;
        try {
          return Te();
        } finally {
          ke = nt;
        }
      }
      function at(J) {
        var Te;
        switch (ke) {
          case ve:
          case ot:
          case ee:
            Te = ee;
            break;
          default:
            Te = ke;
            break;
        }
        var nt = ke;
        ke = Te;
        try {
          return J();
        } finally {
          ke = nt;
        }
      }
      function et(J) {
        var Te = ke;
        return function() {
          var nt = ke;
          ke = Te;
          try {
            return J.apply(this, arguments);
          } finally {
            ke = nt;
          }
        };
      }
      function Ze(J, Te, nt) {
        var At = K.unstable_now(), Zt;
        if (typeof nt == "object" && nt !== null) {
          var pn = nt.delay;
          typeof pn == "number" && pn > 0 ? Zt = At + pn : Zt = At;
        } else
          Zt = At;
        var ln;
        switch (J) {
          case ve:
            ln = vt;
            break;
          case ot:
            ln = be;
            break;
          case ue:
            ln = rn;
            break;
          case Ce:
            ln = Fe;
            break;
          case ee:
          default:
            ln = st;
            break;
        }
        var qn = Zt + ln, Jt = {
          id: an++,
          callback: Te,
          priorityLevel: J,
          startTime: Zt,
          expirationTime: qn,
          sortIndex: -1
        };
        return Zt > At ? (Jt.sortIndex = Zt, Rt(Kt, Jt), Ke(Ft) === null && Jt === Ke(Kt) && (Dt ? oa() : Dt = !0, gr(_, Zt - At))) : (Jt.sortIndex = qn, Rt(Ft, Jt), !bt && !Ut && (bt = !0, On(V))), Jt;
      }
      function tt() {
      }
      function it() {
        !bt && !Ut && (bt = !0, On(V));
      }
      function Vt() {
        return Ke(Ft);
      }
      function kn(J) {
        J.callback = null;
      }
      function wr() {
        return ke;
      }
      var En = !1, tr = null, Vn = -1, Pn = A, $r = -1;
      function si() {
        var J = K.unstable_now() - $r;
        return !(J < Pn);
      }
      function ua() {
      }
      function Gn(J) {
        if (J < 0 || J > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        J > 0 ? Pn = Math.floor(1e3 / J) : Pn = A;
      }
      var Cn = function() {
        if (tr !== null) {
          var J = K.unstable_now();
          $r = J;
          var Te = !0, nt = !0;
          try {
            nt = tr(Te, J);
          } finally {
            nt ? Bn() : (En = !1, tr = null);
          }
        } else
          En = !1;
      }, Bn;
      if (typeof Re == "function")
        Bn = function() {
          Re(Cn);
        };
      else if (typeof MessageChannel < "u") {
        var yr = new MessageChannel(), Ya = yr.port2;
        yr.port1.onmessage = Cn, Bn = function() {
          Ya.postMessage(null);
        };
      } else
        Bn = function() {
          Ee(Cn, 0);
        };
      function On(J) {
        tr = J, En || (En = !0, Bn());
      }
      function gr(J, Te) {
        Vn = Ee(function() {
          J(K.unstable_now());
        }, Te);
      }
      function oa() {
        Z(Vn), Vn = -1;
      }
      var Ia = ua, ci = null;
      K.unstable_IdlePriority = ue, K.unstable_ImmediatePriority = ve, K.unstable_LowPriority = Ce, K.unstable_NormalPriority = ee, K.unstable_Profiling = ci, K.unstable_UserBlockingPriority = ot, K.unstable_cancelCallback = kn, K.unstable_continueExecution = it, K.unstable_forceFrameRate = Gn, K.unstable_getCurrentPriorityLevel = wr, K.unstable_getFirstCallbackNode = Vt, K.unstable_next = at, K.unstable_pauseExecution = tt, K.unstable_requestPaint = Ia, K.unstable_runWithPriority = Ue, K.unstable_scheduleCallback = Ze, K.unstable_shouldYield = si, K.unstable_wrapCallback = et, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(cE)), cE;
}
var tT;
function iT() {
  return tT || (tT = 1, process.env.NODE_ENV === "production" ? Im.exports = Z_() : Im.exports = J_()), Im.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nT;
function eD() {
  if (nT) return Ba;
  nT = 1;
  var K = Ra, q = iT();
  function A(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++) r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var Rt = /* @__PURE__ */ new Set(), Ke = {};
  function Ye(n, r) {
    S(n, r), S(n + "Capture", r);
  }
  function S(n, r) {
    for (Ke[n] = r, n = 0; n < r.length; n++) Rt.add(r[n]);
  }
  var Pt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), de = Object.prototype.hasOwnProperty, ve = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ot = {}, ee = {};
  function Ce(n) {
    return de.call(ee, n) ? !0 : de.call(ot, n) ? !1 : ve.test(n) ? ee[n] = !0 : (ot[n] = !0, !1);
  }
  function ue(n, r, l, o) {
    if (l !== null && l.type === 0) return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return o ? !1 : l !== null ? !l.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function Ie(n, r, l, o) {
    if (r === null || typeof r > "u" || ue(n, r, l, o)) return !0;
    if (o) return !1;
    if (l !== null) switch (l.type) {
      case 3:
        return !r;
      case 4:
        return r === !1;
      case 5:
        return isNaN(r);
      case 6:
        return isNaN(r) || 1 > r;
    }
    return !1;
  }
  function yt(n, r, l, o, c, d, m) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = l, this.propertyName = n, this.type = r, this.sanitizeURL = d, this.removeEmptyString = m;
  }
  var pt = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    pt[n] = new yt(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    pt[r] = new yt(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    pt[n] = new yt(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    pt[n] = new yt(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    pt[n] = new yt(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    pt[n] = new yt(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    pt[n] = new yt(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    pt[n] = new yt(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    pt[n] = new yt(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var cn = /[\-:]([a-z])/g;
  function dt(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      cn,
      dt
    );
    pt[r] = new yt(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(cn, dt);
    pt[r] = new yt(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(cn, dt);
    pt[r] = new yt(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    pt[n] = new yt(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), pt.xlinkHref = new yt("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    pt[n] = new yt(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function Qe(n, r, l, o) {
    var c = pt.hasOwnProperty(r) ? pt[r] : null;
    (c !== null ? c.type !== 0 : o || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (Ie(r, l, c, o) && (l = null), o || c === null ? Ce(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : c.mustUseProperty ? n[c.propertyName] = l === null ? c.type === 3 ? !1 : "" : l : (r = c.attributeName, o = c.attributeNamespace, l === null ? n.removeAttribute(r) : (c = c.type, l = c === 3 || c === 4 && l === !0 ? "" : "" + l, o ? n.setAttributeNS(o, r, l) : n.setAttribute(r, l))));
  }
  var vt = K.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, be = Symbol.for("react.element"), st = Symbol.for("react.portal"), Fe = Symbol.for("react.fragment"), rn = Symbol.for("react.strict_mode"), Ft = Symbol.for("react.profiler"), Kt = Symbol.for("react.provider"), an = Symbol.for("react.context"), xt = Symbol.for("react.forward_ref"), ke = Symbol.for("react.suspense"), Ut = Symbol.for("react.suspense_list"), bt = Symbol.for("react.memo"), Dt = Symbol.for("react.lazy"), Ee = Symbol.for("react.offscreen"), Z = Symbol.iterator;
  function Re(n) {
    return n === null || typeof n != "object" ? null : (n = Z && n[Z] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var ne = Object.assign, _;
  function V(n) {
    if (_ === void 0) try {
      throw Error();
    } catch (l) {
      var r = l.stack.trim().match(/\n( *(at )?)/);
      _ = r && r[1] || "";
    }
    return `
` + _ + n;
  }
  var je = !1;
  function Ue(n, r) {
    if (!n || je) return "";
    je = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (r) if (r = function() {
        throw Error();
      }, Object.defineProperty(r.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(r, []);
        } catch (z) {
          var o = z;
        }
        Reflect.construct(n, [], r);
      } else {
        try {
          r.call();
        } catch (z) {
          o = z;
        }
        n.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch (z) {
          o = z;
        }
        n();
      }
    } catch (z) {
      if (z && o && typeof z.stack == "string") {
        for (var c = z.stack.split(`
`), d = o.stack.split(`
`), m = c.length - 1, E = d.length - 1; 1 <= m && 0 <= E && c[m] !== d[E]; ) E--;
        for (; 1 <= m && 0 <= E; m--, E--) if (c[m] !== d[E]) {
          if (m !== 1 || E !== 1)
            do
              if (m--, E--, 0 > E || c[m] !== d[E]) {
                var T = `
` + c[m].replace(" at new ", " at ");
                return n.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", n.displayName)), T;
              }
            while (1 <= m && 0 <= E);
          break;
        }
      }
    } finally {
      je = !1, Error.prepareStackTrace = l;
    }
    return (n = n ? n.displayName || n.name : "") ? V(n) : "";
  }
  function at(n) {
    switch (n.tag) {
      case 5:
        return V(n.type);
      case 16:
        return V("Lazy");
      case 13:
        return V("Suspense");
      case 19:
        return V("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Ue(n.type, !1), n;
      case 11:
        return n = Ue(n.type.render, !1), n;
      case 1:
        return n = Ue(n.type, !0), n;
      default:
        return "";
    }
  }
  function et(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case Fe:
        return "Fragment";
      case st:
        return "Portal";
      case Ft:
        return "Profiler";
      case rn:
        return "StrictMode";
      case ke:
        return "Suspense";
      case Ut:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case an:
        return (n.displayName || "Context") + ".Consumer";
      case Kt:
        return (n._context.displayName || "Context") + ".Provider";
      case xt:
        var r = n.render;
        return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case bt:
        return r = n.displayName || null, r !== null ? r : et(n.type) || "Memo";
      case Dt:
        r = n._payload, n = n._init;
        try {
          return et(n(r));
        } catch {
        }
    }
    return null;
  }
  function Ze(n) {
    var r = n.type;
    switch (n.tag) {
      case 24:
        return "Cache";
      case 9:
        return (r.displayName || "Context") + ".Consumer";
      case 10:
        return (r._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return n = r.render, n = n.displayName || n.name || "", r.displayName || (n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return r;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return et(r);
      case 8:
        return r === rn ? "StrictMode" : "Mode";
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
        if (typeof r == "function") return r.displayName || r.name || null;
        if (typeof r == "string") return r;
    }
    return null;
  }
  function tt(n) {
    switch (typeof n) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return n;
      case "object":
        return n;
      default:
        return "";
    }
  }
  function it(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function Vt(n) {
    var r = it(n) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), o = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var c = l.get, d = l.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return c.call(this);
      }, set: function(m) {
        o = "" + m, d.call(this, m);
      } }), Object.defineProperty(n, r, { enumerable: l.enumerable }), { getValue: function() {
        return o;
      }, setValue: function(m) {
        o = "" + m;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function kn(n) {
    n._valueTracker || (n._valueTracker = Vt(n));
  }
  function wr(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var l = r.getValue(), o = "";
    return n && (o = it(n) ? n.checked ? "true" : "false" : n.value), n = o, n !== l ? (r.setValue(n), !0) : !1;
  }
  function En(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function tr(n, r) {
    var l = r.checked;
    return ne({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function Vn(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, o = r.checked != null ? r.checked : r.defaultChecked;
    l = tt(r.value != null ? r.value : l), n._wrapperState = { initialChecked: o, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function Pn(n, r) {
    r = r.checked, r != null && Qe(n, "checked", r, !1);
  }
  function $r(n, r) {
    Pn(n, r);
    var l = tt(r.value), o = r.type;
    if (l != null) o === "number" ? (l === 0 && n.value === "" || n.value != l) && (n.value = "" + l) : n.value !== "" + l && (n.value = "" + l);
    else if (o === "submit" || o === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? ua(n, r.type, l) : r.hasOwnProperty("defaultValue") && ua(n, r.type, tt(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function si(n, r, l) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var o = r.type;
      if (!(o !== "submit" && o !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + n._wrapperState.initialValue, l || r === n.value || (n.value = r), n.defaultValue = r;
    }
    l = n.name, l !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, l !== "" && (n.name = l);
  }
  function ua(n, r, l) {
    (r !== "number" || En(n.ownerDocument) !== n) && (l == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + l && (n.defaultValue = "" + l));
  }
  var Gn = Array.isArray;
  function Cn(n, r, l, o) {
    if (n = n.options, r) {
      r = {};
      for (var c = 0; c < l.length; c++) r["$" + l[c]] = !0;
      for (l = 0; l < n.length; l++) c = r.hasOwnProperty("$" + n[l].value), n[l].selected !== c && (n[l].selected = c), c && o && (n[l].defaultSelected = !0);
    } else {
      for (l = "" + tt(l), r = null, c = 0; c < n.length; c++) {
        if (n[c].value === l) {
          n[c].selected = !0, o && (n[c].defaultSelected = !0);
          return;
        }
        r !== null || n[c].disabled || (r = n[c]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function Bn(n, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(A(91));
    return ne({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function yr(n, r) {
    var l = r.value;
    if (l == null) {
      if (l = r.children, r = r.defaultValue, l != null) {
        if (r != null) throw Error(A(92));
        if (Gn(l)) {
          if (1 < l.length) throw Error(A(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), l = r;
    }
    n._wrapperState = { initialValue: tt(l) };
  }
  function Ya(n, r) {
    var l = tt(r.value), o = tt(r.defaultValue);
    l != null && (l = "" + l, l !== n.value && (n.value = l), r.defaultValue == null && n.defaultValue !== l && (n.defaultValue = l)), o != null && (n.defaultValue = "" + o);
  }
  function On(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function gr(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function oa(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? gr(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var Ia, ci = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, l, o, c) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, l, o, c);
      });
    } : n;
  }(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = r;
    else {
      for (Ia = Ia || document.createElement("div"), Ia.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = Ia.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; r.firstChild; ) n.appendChild(r.firstChild);
    }
  });
  function J(n, r) {
    if (r) {
      var l = n.firstChild;
      if (l && l === n.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var Te = {
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
  }, nt = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Te).forEach(function(n) {
    nt.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), Te[r] = Te[n];
    });
  });
  function At(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || Te.hasOwnProperty(n) && Te[n] ? ("" + r).trim() : r + "px";
  }
  function Zt(n, r) {
    n = n.style;
    for (var l in r) if (r.hasOwnProperty(l)) {
      var o = l.indexOf("--") === 0, c = At(l, r[l], o);
      l === "float" && (l = "cssFloat"), o ? n.setProperty(l, c) : n[l] = c;
    }
  }
  var pn = ne({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function ln(n, r) {
    if (r) {
      if (pn[n] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(A(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(A(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML)) throw Error(A(61));
      }
      if (r.style != null && typeof r.style != "object") throw Error(A(62));
    }
  }
  function qn(n, r) {
    if (n.indexOf("-") === -1) return typeof r.is == "string";
    switch (n) {
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
  var Jt = null;
  function Bt(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var $t = null, sa = null, Sr = null;
  function Ta(n) {
    if (n = _e(n)) {
      if (typeof $t != "function") throw Error(A(280));
      var r = n.stateNode;
      r && (r = hn(r), $t(n.stateNode, n.type, r));
    }
  }
  function ji(n) {
    sa ? Sr ? Sr.push(n) : Sr = [n] : sa = n;
  }
  function Zl() {
    if (sa) {
      var n = sa, r = Sr;
      if (Sr = sa = null, Ta(n), r) for (n = 0; n < r.length; n++) Ta(r[n]);
    }
  }
  function Jl(n, r) {
    return n(r);
  }
  function dl() {
  }
  var pl = !1;
  function eu(n, r, l) {
    if (pl) return n(r, l);
    pl = !0;
    try {
      return Jl(n, r, l);
    } finally {
      pl = !1, (sa !== null || Sr !== null) && (dl(), Zl());
    }
  }
  function xr(n, r) {
    var l = n.stateNode;
    if (l === null) return null;
    var o = hn(l);
    if (o === null) return null;
    l = o[r];
    e: switch (r) {
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
        (o = !o.disabled) || (n = n.type, o = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !o;
        break e;
      default:
        n = !1;
    }
    if (n) return null;
    if (l && typeof l != "function") throw Error(A(231, r, typeof l));
    return l;
  }
  var br = !1;
  if (Pt) try {
    var nr = {};
    Object.defineProperty(nr, "passive", { get: function() {
      br = !0;
    } }), window.addEventListener("test", nr, nr), window.removeEventListener("test", nr, nr);
  } catch {
    br = !1;
  }
  function fi(n, r, l, o, c, d, m, E, T) {
    var z = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, z);
    } catch (I) {
      this.onError(I);
    }
  }
  var Qa = !1, di = null, pi = !1, R = null, B = { onError: function(n) {
    Qa = !0, di = n;
  } };
  function ae(n, r, l, o, c, d, m, E, T) {
    Qa = !1, di = null, fi.apply(B, arguments);
  }
  function he(n, r, l, o, c, d, m, E, T) {
    if (ae.apply(this, arguments), Qa) {
      if (Qa) {
        var z = di;
        Qa = !1, di = null;
      } else throw Error(A(198));
      pi || (pi = !0, R = z);
    }
  }
  function Ge(n) {
    var r = n, l = n;
    if (n.alternate) for (; r.return; ) r = r.return;
    else {
      n = r;
      do
        r = n, r.flags & 4098 && (l = r.return), n = r.return;
      while (n);
    }
    return r.tag === 3 ? l : null;
  }
  function Be(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function ct(n) {
    if (Ge(n) !== n) throw Error(A(188));
  }
  function lt(n) {
    var r = n.alternate;
    if (!r) {
      if (r = Ge(n), r === null) throw Error(A(188));
      return r !== n ? null : n;
    }
    for (var l = n, o = r; ; ) {
      var c = l.return;
      if (c === null) break;
      var d = c.alternate;
      if (d === null) {
        if (o = c.return, o !== null) {
          l = o;
          continue;
        }
        break;
      }
      if (c.child === d.child) {
        for (d = c.child; d; ) {
          if (d === l) return ct(c), n;
          if (d === o) return ct(c), r;
          d = d.sibling;
        }
        throw Error(A(188));
      }
      if (l.return !== o.return) l = c, o = d;
      else {
        for (var m = !1, E = c.child; E; ) {
          if (E === l) {
            m = !0, l = c, o = d;
            break;
          }
          if (E === o) {
            m = !0, o = c, l = d;
            break;
          }
          E = E.sibling;
        }
        if (!m) {
          for (E = d.child; E; ) {
            if (E === l) {
              m = !0, l = d, o = c;
              break;
            }
            if (E === o) {
              m = !0, o = d, l = c;
              break;
            }
            E = E.sibling;
          }
          if (!m) throw Error(A(189));
        }
      }
      if (l.alternate !== o) throw Error(A(190));
    }
    if (l.tag !== 3) throw Error(A(188));
    return l.stateNode.current === l ? n : r;
  }
  function Rn(n) {
    return n = lt(n), n !== null ? en(n) : null;
  }
  function en(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = en(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var un = q.unstable_scheduleCallback, rr = q.unstable_cancelCallback, Wa = q.unstable_shouldYield, Ga = q.unstable_requestPaint, qe = q.unstable_now, Je = q.unstable_getCurrentPriorityLevel, qa = q.unstable_ImmediatePriority, tu = q.unstable_UserBlockingPriority, nu = q.unstable_NormalPriority, vl = q.unstable_LowPriority, Qu = q.unstable_IdlePriority, hl = null, Yr = null;
  function Io(n) {
    if (Yr && typeof Yr.onCommitFiberRoot == "function") try {
      Yr.onCommitFiberRoot(hl, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var _r = Math.clz32 ? Math.clz32 : Wu, lc = Math.log, uc = Math.LN2;
  function Wu(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (lc(n) / uc | 0) | 0;
  }
  var ml = 64, ca = 4194304;
  function Xa(n) {
    switch (n & -n) {
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
        return n & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return n & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return n;
    }
  }
  function Ka(n, r) {
    var l = n.pendingLanes;
    if (l === 0) return 0;
    var o = 0, c = n.suspendedLanes, d = n.pingedLanes, m = l & 268435455;
    if (m !== 0) {
      var E = m & ~c;
      E !== 0 ? o = Xa(E) : (d &= m, d !== 0 && (o = Xa(d)));
    } else m = l & ~c, m !== 0 ? o = Xa(m) : d !== 0 && (o = Xa(d));
    if (o === 0) return 0;
    if (r !== 0 && r !== o && !(r & c) && (c = o & -o, d = r & -r, c >= d || c === 16 && (d & 4194240) !== 0)) return r;
    if (o & 4 && (o |= l & 16), r = n.entangledLanes, r !== 0) for (n = n.entanglements, r &= o; 0 < r; ) l = 31 - _r(r), c = 1 << l, o |= n[l], r &= ~c;
    return o;
  }
  function Gu(n, r) {
    switch (n) {
      case 1:
      case 2:
      case 4:
        return r + 250;
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
        return r + 5e3;
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
  function ru(n, r) {
    for (var l = n.suspendedLanes, o = n.pingedLanes, c = n.expirationTimes, d = n.pendingLanes; 0 < d; ) {
      var m = 31 - _r(d), E = 1 << m, T = c[m];
      T === -1 ? (!(E & l) || E & o) && (c[m] = Gu(E, r)) : T <= r && (n.expiredLanes |= E), d &= ~E;
    }
  }
  function yl(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function qu() {
    var n = ml;
    return ml <<= 1, !(ml & 4194240) && (ml = 64), n;
  }
  function Xu(n) {
    for (var r = [], l = 0; 31 > l; l++) r.push(n);
    return r;
  }
  function Hi(n, r, l) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - _r(r), n[r] = l;
  }
  function Qf(n, r) {
    var l = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var o = n.eventTimes;
    for (n = n.expirationTimes; 0 < l; ) {
      var c = 31 - _r(l), d = 1 << c;
      r[c] = 0, o[c] = -1, n[c] = -1, l &= ~d;
    }
  }
  function Vi(n, r) {
    var l = n.entangledLanes |= r;
    for (n = n.entanglements; l; ) {
      var o = 31 - _r(l), c = 1 << o;
      c & r | n[o] & r && (n[o] |= r), l &= ~c;
    }
  }
  var kt = 0;
  function Ku(n) {
    return n &= -n, 1 < n ? 4 < n ? n & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var Tt, Qo, vi, Pe, Zu, ar = !1, hi = [], Dr = null, mi = null, on = null, Yt = /* @__PURE__ */ new Map(), gl = /* @__PURE__ */ new Map(), $n = [], kr = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function wa(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        Dr = null;
        break;
      case "dragenter":
      case "dragleave":
        mi = null;
        break;
      case "mouseover":
      case "mouseout":
        on = null;
        break;
      case "pointerover":
      case "pointerout":
        Yt.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        gl.delete(r.pointerId);
    }
  }
  function au(n, r, l, o, c, d) {
    return n === null || n.nativeEvent !== d ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: o, nativeEvent: d, targetContainers: [c] }, r !== null && (r = _e(r), r !== null && Qo(r)), n) : (n.eventSystemFlags |= o, r = n.targetContainers, c !== null && r.indexOf(c) === -1 && r.push(c), n);
  }
  function Wo(n, r, l, o, c) {
    switch (r) {
      case "focusin":
        return Dr = au(Dr, n, r, l, o, c), !0;
      case "dragenter":
        return mi = au(mi, n, r, l, o, c), !0;
      case "mouseover":
        return on = au(on, n, r, l, o, c), !0;
      case "pointerover":
        var d = c.pointerId;
        return Yt.set(d, au(Yt.get(d) || null, n, r, l, o, c)), !0;
      case "gotpointercapture":
        return d = c.pointerId, gl.set(d, au(gl.get(d) || null, n, r, l, o, c)), !0;
    }
    return !1;
  }
  function Go(n) {
    var r = pu(n.target);
    if (r !== null) {
      var l = Ge(r);
      if (l !== null) {
        if (r = l.tag, r === 13) {
          if (r = Be(l), r !== null) {
            n.blockedOn = r, Zu(n.priority, function() {
              vi(l);
            });
            return;
          }
        } else if (r === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          n.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    n.blockedOn = null;
  }
  function Sl(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var l = to(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (l === null) {
        l = n.nativeEvent;
        var o = new l.constructor(l.type, l);
        Jt = o, l.target.dispatchEvent(o), Jt = null;
      } else return r = _e(l), r !== null && Qo(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function iu(n, r, l) {
    Sl(n) && l.delete(r);
  }
  function Wf() {
    ar = !1, Dr !== null && Sl(Dr) && (Dr = null), mi !== null && Sl(mi) && (mi = null), on !== null && Sl(on) && (on = null), Yt.forEach(iu), gl.forEach(iu);
  }
  function xa(n, r) {
    n.blockedOn === r && (n.blockedOn = null, ar || (ar = !0, q.unstable_scheduleCallback(q.unstable_NormalPriority, Wf)));
  }
  function Za(n) {
    function r(c) {
      return xa(c, n);
    }
    if (0 < hi.length) {
      xa(hi[0], n);
      for (var l = 1; l < hi.length; l++) {
        var o = hi[l];
        o.blockedOn === n && (o.blockedOn = null);
      }
    }
    for (Dr !== null && xa(Dr, n), mi !== null && xa(mi, n), on !== null && xa(on, n), Yt.forEach(r), gl.forEach(r), l = 0; l < $n.length; l++) o = $n[l], o.blockedOn === n && (o.blockedOn = null);
    for (; 0 < $n.length && (l = $n[0], l.blockedOn === null); ) Go(l), l.blockedOn === null && $n.shift();
  }
  var yi = vt.ReactCurrentBatchConfig, ba = !0;
  function Ju(n, r, l, o) {
    var c = kt, d = yi.transition;
    yi.transition = null;
    try {
      kt = 1, El(n, r, l, o);
    } finally {
      kt = c, yi.transition = d;
    }
  }
  function eo(n, r, l, o) {
    var c = kt, d = yi.transition;
    yi.transition = null;
    try {
      kt = 4, El(n, r, l, o);
    } finally {
      kt = c, yi.transition = d;
    }
  }
  function El(n, r, l, o) {
    if (ba) {
      var c = to(n, r, l, o);
      if (c === null) Sc(n, r, o, lu, l), wa(n, o);
      else if (Wo(c, n, r, l, o)) o.stopPropagation();
      else if (wa(n, o), r & 4 && -1 < kr.indexOf(n)) {
        for (; c !== null; ) {
          var d = _e(c);
          if (d !== null && Tt(d), d = to(n, r, l, o), d === null && Sc(n, r, o, lu, l), d === c) break;
          c = d;
        }
        c !== null && o.stopPropagation();
      } else Sc(n, r, o, null, l);
    }
  }
  var lu = null;
  function to(n, r, l, o) {
    if (lu = null, n = Bt(o), n = pu(n), n !== null) if (r = Ge(n), r === null) n = null;
    else if (l = r.tag, l === 13) {
      if (n = Be(r), n !== null) return n;
      n = null;
    } else if (l === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      n = null;
    } else r !== n && (n = null);
    return lu = n, null;
  }
  function no(n) {
    switch (n) {
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
        switch (Je()) {
          case qa:
            return 1;
          case tu:
            return 4;
          case nu:
          case vl:
            return 16;
          case Qu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Ja = null, h = null, C = null;
  function N() {
    if (C) return C;
    var n, r = h, l = r.length, o, c = "value" in Ja ? Ja.value : Ja.textContent, d = c.length;
    for (n = 0; n < l && r[n] === c[n]; n++) ;
    var m = l - n;
    for (o = 1; o <= m && r[l - o] === c[d - o]; o++) ;
    return C = c.slice(n, 1 < o ? 1 - o : void 0);
  }
  function F(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function X() {
    return !0;
  }
  function Oe() {
    return !1;
  }
  function re(n) {
    function r(l, o, c, d, m) {
      this._reactName = l, this._targetInst = c, this.type = o, this.nativeEvent = d, this.target = m, this.currentTarget = null;
      for (var E in n) n.hasOwnProperty(E) && (l = n[E], this[E] = l ? l(d) : d[E]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? X : Oe, this.isPropagationStopped = Oe, this;
    }
    return ne(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var l = this.nativeEvent;
      l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = X);
    }, stopPropagation: function() {
      var l = this.nativeEvent;
      l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = X);
    }, persist: function() {
    }, isPersistent: X }), r;
  }
  var Ne = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, ft = re(Ne), wt = ne({}, Ne, { view: 0, detail: 0 }), tn = re(wt), It, rt, Qt, vn = ne({}, wt, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Zf, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== Qt && (Qt && n.type === "mousemove" ? (It = n.screenX - Qt.screenX, rt = n.screenY - Qt.screenY) : rt = It = 0, Qt = n), It);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : rt;
  } }), Cl = re(vn), qo = ne({}, vn, { dataTransfer: 0 }), Pi = re(qo), Xo = ne({}, wt, { relatedTarget: 0 }), uu = re(Xo), Gf = ne({}, Ne, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), oc = re(Gf), qf = ne({}, Ne, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), ev = re(qf), Xf = ne({}, Ne, { data: 0 }), Kf = re(Xf), tv = {
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
  }, nv = {
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
  }, Wm = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Bi(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = Wm[n]) ? !!r[n] : !1;
  }
  function Zf() {
    return Bi;
  }
  var Jf = ne({}, wt, { key: function(n) {
    if (n.key) {
      var r = tv[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = F(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? nv[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Zf, charCode: function(n) {
    return n.type === "keypress" ? F(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? F(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), ed = re(Jf), td = ne({}, vn, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), rv = re(td), sc = ne({}, wt, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Zf }), av = re(sc), Ir = ne({}, Ne, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), $i = re(Ir), Ln = ne({}, vn, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Yi = re(Ln), nd = [9, 13, 27, 32], ro = Pt && "CompositionEvent" in window, Ko = null;
  Pt && "documentMode" in document && (Ko = document.documentMode);
  var Zo = Pt && "TextEvent" in window && !Ko, iv = Pt && (!ro || Ko && 8 < Ko && 11 >= Ko), lv = " ", cc = !1;
  function uv(n, r) {
    switch (n) {
      case "keyup":
        return nd.indexOf(r.keyCode) !== -1;
      case "keydown":
        return r.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function ov(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var ao = !1;
  function sv(n, r) {
    switch (n) {
      case "compositionend":
        return ov(r);
      case "keypress":
        return r.which !== 32 ? null : (cc = !0, lv);
      case "textInput":
        return n = r.data, n === lv && cc ? null : n;
      default:
        return null;
    }
  }
  function Gm(n, r) {
    if (ao) return n === "compositionend" || !ro && uv(n, r) ? (n = N(), C = h = Ja = null, ao = !1, n) : null;
    switch (n) {
      case "paste":
        return null;
      case "keypress":
        if (!(r.ctrlKey || r.altKey || r.metaKey) || r.ctrlKey && r.altKey) {
          if (r.char && 1 < r.char.length) return r.char;
          if (r.which) return String.fromCharCode(r.which);
        }
        return null;
      case "compositionend":
        return iv && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var qm = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function cv(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!qm[n.type] : r === "textarea";
  }
  function rd(n, r, l, o) {
    ji(o), r = as(r, "onChange"), 0 < r.length && (l = new ft("onChange", "change", null, l, o), n.push({ event: l, listeners: r }));
  }
  var gi = null, ou = null;
  function fv(n) {
    fu(n, 0);
  }
  function Jo(n) {
    var r = ti(n);
    if (wr(r)) return n;
  }
  function Xm(n, r) {
    if (n === "change") return r;
  }
  var dv = !1;
  if (Pt) {
    var ad;
    if (Pt) {
      var id = "oninput" in document;
      if (!id) {
        var pv = document.createElement("div");
        pv.setAttribute("oninput", "return;"), id = typeof pv.oninput == "function";
      }
      ad = id;
    } else ad = !1;
    dv = ad && (!document.documentMode || 9 < document.documentMode);
  }
  function vv() {
    gi && (gi.detachEvent("onpropertychange", hv), ou = gi = null);
  }
  function hv(n) {
    if (n.propertyName === "value" && Jo(ou)) {
      var r = [];
      rd(r, ou, n, Bt(n)), eu(fv, r);
    }
  }
  function Km(n, r, l) {
    n === "focusin" ? (vv(), gi = r, ou = l, gi.attachEvent("onpropertychange", hv)) : n === "focusout" && vv();
  }
  function mv(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return Jo(ou);
  }
  function Zm(n, r) {
    if (n === "click") return Jo(r);
  }
  function yv(n, r) {
    if (n === "input" || n === "change") return Jo(r);
  }
  function Jm(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var ei = typeof Object.is == "function" ? Object.is : Jm;
  function es(n, r) {
    if (ei(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var l = Object.keys(n), o = Object.keys(r);
    if (l.length !== o.length) return !1;
    for (o = 0; o < l.length; o++) {
      var c = l[o];
      if (!de.call(r, c) || !ei(n[c], r[c])) return !1;
    }
    return !0;
  }
  function gv(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function fc(n, r) {
    var l = gv(n);
    n = 0;
    for (var o; l; ) {
      if (l.nodeType === 3) {
        if (o = n + l.textContent.length, n <= r && o >= r) return { node: l, offset: r - n };
        n = o;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = gv(l);
    }
  }
  function Rl(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? Rl(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function ts() {
    for (var n = window, r = En(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var l = typeof r.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) n = r.contentWindow;
      else break;
      r = En(n.document);
    }
    return r;
  }
  function dc(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function io(n) {
    var r = ts(), l = n.focusedElem, o = n.selectionRange;
    if (r !== l && l && l.ownerDocument && Rl(l.ownerDocument.documentElement, l)) {
      if (o !== null && dc(l)) {
        if (r = o.start, n = o.end, n === void 0 && (n = r), "selectionStart" in l) l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var c = l.textContent.length, d = Math.min(o.start, c);
          o = o.end === void 0 ? d : Math.min(o.end, c), !n.extend && d > o && (c = o, o = d, d = c), c = fc(l, d);
          var m = fc(
            l,
            o
          );
          c && m && (n.rangeCount !== 1 || n.anchorNode !== c.node || n.anchorOffset !== c.offset || n.focusNode !== m.node || n.focusOffset !== m.offset) && (r = r.createRange(), r.setStart(c.node, c.offset), n.removeAllRanges(), d > o ? (n.addRange(r), n.extend(m.node, m.offset)) : (r.setEnd(m.node, m.offset), n.addRange(r)));
        }
      }
      for (r = [], n = l; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof l.focus == "function" && l.focus(), l = 0; l < r.length; l++) n = r[l], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var ey = Pt && "documentMode" in document && 11 >= document.documentMode, lo = null, ld = null, ns = null, ud = !1;
  function od(n, r, l) {
    var o = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    ud || lo == null || lo !== En(o) || (o = lo, "selectionStart" in o && dc(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), ns && es(ns, o) || (ns = o, o = as(ld, "onSelect"), 0 < o.length && (r = new ft("onSelect", "select", null, r, l), n.push({ event: r, listeners: o }), r.target = lo)));
  }
  function pc(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var su = { animationend: pc("Animation", "AnimationEnd"), animationiteration: pc("Animation", "AnimationIteration"), animationstart: pc("Animation", "AnimationStart"), transitionend: pc("Transition", "TransitionEnd") }, ir = {}, sd = {};
  Pt && (sd = document.createElement("div").style, "AnimationEvent" in window || (delete su.animationend.animation, delete su.animationiteration.animation, delete su.animationstart.animation), "TransitionEvent" in window || delete su.transitionend.transition);
  function vc(n) {
    if (ir[n]) return ir[n];
    if (!su[n]) return n;
    var r = su[n], l;
    for (l in r) if (r.hasOwnProperty(l) && l in sd) return ir[n] = r[l];
    return n;
  }
  var Sv = vc("animationend"), Ev = vc("animationiteration"), Cv = vc("animationstart"), Rv = vc("transitionend"), cd = /* @__PURE__ */ new Map(), hc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function _a(n, r) {
    cd.set(n, r), Ye(r, [n]);
  }
  for (var fd = 0; fd < hc.length; fd++) {
    var cu = hc[fd], ty = cu.toLowerCase(), ny = cu[0].toUpperCase() + cu.slice(1);
    _a(ty, "on" + ny);
  }
  _a(Sv, "onAnimationEnd"), _a(Ev, "onAnimationIteration"), _a(Cv, "onAnimationStart"), _a("dblclick", "onDoubleClick"), _a("focusin", "onFocus"), _a("focusout", "onBlur"), _a(Rv, "onTransitionEnd"), S("onMouseEnter", ["mouseout", "mouseover"]), S("onMouseLeave", ["mouseout", "mouseover"]), S("onPointerEnter", ["pointerout", "pointerover"]), S("onPointerLeave", ["pointerout", "pointerover"]), Ye("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Ye("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Ye("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Ye("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Ye("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Ye("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var rs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), dd = new Set("cancel close invalid load scroll toggle".split(" ").concat(rs));
  function mc(n, r, l) {
    var o = n.type || "unknown-event";
    n.currentTarget = l, he(o, r, void 0, n), n.currentTarget = null;
  }
  function fu(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var o = n[l], c = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (r) for (var m = o.length - 1; 0 <= m; m--) {
          var E = o[m], T = E.instance, z = E.currentTarget;
          if (E = E.listener, T !== d && c.isPropagationStopped()) break e;
          mc(c, E, z), d = T;
        }
        else for (m = 0; m < o.length; m++) {
          if (E = o[m], T = E.instance, z = E.currentTarget, E = E.listener, T !== d && c.isPropagationStopped()) break e;
          mc(c, E, z), d = T;
        }
      }
    }
    if (pi) throw n = R, pi = !1, R = null, n;
  }
  function jt(n, r) {
    var l = r[us];
    l === void 0 && (l = r[us] = /* @__PURE__ */ new Set());
    var o = n + "__bubble";
    l.has(o) || (Tv(r, n, 2, !1), l.add(o));
  }
  function yc(n, r, l) {
    var o = 0;
    r && (o |= 4), Tv(l, n, o, r);
  }
  var gc = "_reactListening" + Math.random().toString(36).slice(2);
  function uo(n) {
    if (!n[gc]) {
      n[gc] = !0, Rt.forEach(function(l) {
        l !== "selectionchange" && (dd.has(l) || yc(l, !1, n), yc(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[gc] || (r[gc] = !0, yc("selectionchange", !1, r));
    }
  }
  function Tv(n, r, l, o) {
    switch (no(r)) {
      case 1:
        var c = Ju;
        break;
      case 4:
        c = eo;
        break;
      default:
        c = El;
    }
    l = c.bind(null, r, l, n), c = void 0, !br || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (c = !0), o ? c !== void 0 ? n.addEventListener(r, l, { capture: !0, passive: c }) : n.addEventListener(r, l, !0) : c !== void 0 ? n.addEventListener(r, l, { passive: c }) : n.addEventListener(r, l, !1);
  }
  function Sc(n, r, l, o, c) {
    var d = o;
    if (!(r & 1) && !(r & 2) && o !== null) e: for (; ; ) {
      if (o === null) return;
      var m = o.tag;
      if (m === 3 || m === 4) {
        var E = o.stateNode.containerInfo;
        if (E === c || E.nodeType === 8 && E.parentNode === c) break;
        if (m === 4) for (m = o.return; m !== null; ) {
          var T = m.tag;
          if ((T === 3 || T === 4) && (T = m.stateNode.containerInfo, T === c || T.nodeType === 8 && T.parentNode === c)) return;
          m = m.return;
        }
        for (; E !== null; ) {
          if (m = pu(E), m === null) return;
          if (T = m.tag, T === 5 || T === 6) {
            o = d = m;
            continue e;
          }
          E = E.parentNode;
        }
      }
      o = o.return;
    }
    eu(function() {
      var z = d, I = Bt(l), W = [];
      e: {
        var Y = cd.get(n);
        if (Y !== void 0) {
          var se = ft, me = n;
          switch (n) {
            case "keypress":
              if (F(l) === 0) break e;
            case "keydown":
            case "keyup":
              se = ed;
              break;
            case "focusin":
              me = "focus", se = uu;
              break;
            case "focusout":
              me = "blur", se = uu;
              break;
            case "beforeblur":
            case "afterblur":
              se = uu;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              se = Cl;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              se = Pi;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              se = av;
              break;
            case Sv:
            case Ev:
            case Cv:
              se = oc;
              break;
            case Rv:
              se = $i;
              break;
            case "scroll":
              se = tn;
              break;
            case "wheel":
              se = Yi;
              break;
            case "copy":
            case "cut":
            case "paste":
              se = ev;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              se = rv;
          }
          var Se = (r & 4) !== 0, _n = !Se && n === "scroll", D = Se ? Y !== null ? Y + "Capture" : null : Y;
          Se = [];
          for (var x = z, L; x !== null; ) {
            L = x;
            var Q = L.stateNode;
            if (L.tag === 5 && Q !== null && (L = Q, D !== null && (Q = xr(x, D), Q != null && Se.push(oo(x, Q, L)))), _n) break;
            x = x.return;
          }
          0 < Se.length && (Y = new se(Y, me, null, l, I), W.push({ event: Y, listeners: Se }));
        }
      }
      if (!(r & 7)) {
        e: {
          if (Y = n === "mouseover" || n === "pointerover", se = n === "mouseout" || n === "pointerout", Y && l !== Jt && (me = l.relatedTarget || l.fromElement) && (pu(me) || me[Ii])) break e;
          if ((se || Y) && (Y = I.window === I ? I : (Y = I.ownerDocument) ? Y.defaultView || Y.parentWindow : window, se ? (me = l.relatedTarget || l.toElement, se = z, me = me ? pu(me) : null, me !== null && (_n = Ge(me), me !== _n || me.tag !== 5 && me.tag !== 6) && (me = null)) : (se = null, me = z), se !== me)) {
            if (Se = Cl, Q = "onMouseLeave", D = "onMouseEnter", x = "mouse", (n === "pointerout" || n === "pointerover") && (Se = rv, Q = "onPointerLeave", D = "onPointerEnter", x = "pointer"), _n = se == null ? Y : ti(se), L = me == null ? Y : ti(me), Y = new Se(Q, x + "leave", se, l, I), Y.target = _n, Y.relatedTarget = L, Q = null, pu(I) === z && (Se = new Se(D, x + "enter", me, l, I), Se.target = L, Se.relatedTarget = _n, Q = Se), _n = Q, se && me) t: {
              for (Se = se, D = me, x = 0, L = Se; L; L = Tl(L)) x++;
              for (L = 0, Q = D; Q; Q = Tl(Q)) L++;
              for (; 0 < x - L; ) Se = Tl(Se), x--;
              for (; 0 < L - x; ) D = Tl(D), L--;
              for (; x--; ) {
                if (Se === D || D !== null && Se === D.alternate) break t;
                Se = Tl(Se), D = Tl(D);
              }
              Se = null;
            }
            else Se = null;
            se !== null && wv(W, Y, se, Se, !1), me !== null && _n !== null && wv(W, _n, me, Se, !0);
          }
        }
        e: {
          if (Y = z ? ti(z) : window, se = Y.nodeName && Y.nodeName.toLowerCase(), se === "select" || se === "input" && Y.type === "file") var ye = Xm;
          else if (cv(Y)) if (dv) ye = yv;
          else {
            ye = mv;
            var Me = Km;
          }
          else (se = Y.nodeName) && se.toLowerCase() === "input" && (Y.type === "checkbox" || Y.type === "radio") && (ye = Zm);
          if (ye && (ye = ye(n, z))) {
            rd(W, ye, l, I);
            break e;
          }
          Me && Me(n, Y, z), n === "focusout" && (Me = Y._wrapperState) && Me.controlled && Y.type === "number" && ua(Y, "number", Y.value);
        }
        switch (Me = z ? ti(z) : window, n) {
          case "focusin":
            (cv(Me) || Me.contentEditable === "true") && (lo = Me, ld = z, ns = null);
            break;
          case "focusout":
            ns = ld = lo = null;
            break;
          case "mousedown":
            ud = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ud = !1, od(W, l, I);
            break;
          case "selectionchange":
            if (ey) break;
          case "keydown":
          case "keyup":
            od(W, l, I);
        }
        var ze;
        if (ro) e: {
          switch (n) {
            case "compositionstart":
              var Ve = "onCompositionStart";
              break e;
            case "compositionend":
              Ve = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Ve = "onCompositionUpdate";
              break e;
          }
          Ve = void 0;
        }
        else ao ? uv(n, l) && (Ve = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && (Ve = "onCompositionStart");
        Ve && (iv && l.locale !== "ko" && (ao || Ve !== "onCompositionStart" ? Ve === "onCompositionEnd" && ao && (ze = N()) : (Ja = I, h = "value" in Ja ? Ja.value : Ja.textContent, ao = !0)), Me = as(z, Ve), 0 < Me.length && (Ve = new Kf(Ve, n, null, l, I), W.push({ event: Ve, listeners: Me }), ze ? Ve.data = ze : (ze = ov(l), ze !== null && (Ve.data = ze)))), (ze = Zo ? sv(n, l) : Gm(n, l)) && (z = as(z, "onBeforeInput"), 0 < z.length && (I = new Kf("onBeforeInput", "beforeinput", null, l, I), W.push({ event: I, listeners: z }), I.data = ze));
      }
      fu(W, r);
    });
  }
  function oo(n, r, l) {
    return { instance: n, listener: r, currentTarget: l };
  }
  function as(n, r) {
    for (var l = r + "Capture", o = []; n !== null; ) {
      var c = n, d = c.stateNode;
      c.tag === 5 && d !== null && (c = d, d = xr(n, l), d != null && o.unshift(oo(n, d, c)), d = xr(n, r), d != null && o.push(oo(n, d, c))), n = n.return;
    }
    return o;
  }
  function Tl(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function wv(n, r, l, o, c) {
    for (var d = r._reactName, m = []; l !== null && l !== o; ) {
      var E = l, T = E.alternate, z = E.stateNode;
      if (T !== null && T === o) break;
      E.tag === 5 && z !== null && (E = z, c ? (T = xr(l, d), T != null && m.unshift(oo(l, T, E))) : c || (T = xr(l, d), T != null && m.push(oo(l, T, E)))), l = l.return;
    }
    m.length !== 0 && n.push({ event: r, listeners: m });
  }
  var xv = /\r\n?/g, ry = /\u0000|\uFFFD/g;
  function bv(n) {
    return (typeof n == "string" ? n : "" + n).replace(xv, `
`).replace(ry, "");
  }
  function Ec(n, r, l) {
    if (r = bv(r), bv(n) !== r && l) throw Error(A(425));
  }
  function wl() {
  }
  var is = null, du = null;
  function Cc(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var Rc = typeof setTimeout == "function" ? setTimeout : void 0, pd = typeof clearTimeout == "function" ? clearTimeout : void 0, _v = typeof Promise == "function" ? Promise : void 0, so = typeof queueMicrotask == "function" ? queueMicrotask : typeof _v < "u" ? function(n) {
    return _v.resolve(null).then(n).catch(Tc);
  } : Rc;
  function Tc(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function co(n, r) {
    var l = r, o = 0;
    do {
      var c = l.nextSibling;
      if (n.removeChild(l), c && c.nodeType === 8) if (l = c.data, l === "/$") {
        if (o === 0) {
          n.removeChild(c), Za(r);
          return;
        }
        o--;
      } else l !== "$" && l !== "$?" && l !== "$!" || o++;
      l = c;
    } while (l);
    Za(r);
  }
  function Si(n) {
    for (; n != null; n = n.nextSibling) {
      var r = n.nodeType;
      if (r === 1 || r === 3) break;
      if (r === 8) {
        if (r = n.data, r === "$" || r === "$!" || r === "$?") break;
        if (r === "/$") return null;
      }
    }
    return n;
  }
  function Dv(n) {
    n = n.previousSibling;
    for (var r = 0; n; ) {
      if (n.nodeType === 8) {
        var l = n.data;
        if (l === "$" || l === "$!" || l === "$?") {
          if (r === 0) return n;
          r--;
        } else l === "/$" && r++;
      }
      n = n.previousSibling;
    }
    return null;
  }
  var xl = Math.random().toString(36).slice(2), Ei = "__reactFiber$" + xl, ls = "__reactProps$" + xl, Ii = "__reactContainer$" + xl, us = "__reactEvents$" + xl, fo = "__reactListeners$" + xl, ay = "__reactHandles$" + xl;
  function pu(n) {
    var r = n[Ei];
    if (r) return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[Ii] || l[Ei]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null) for (n = Dv(n); n !== null; ) {
          if (l = n[Ei]) return l;
          n = Dv(n);
        }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function _e(n) {
    return n = n[Ei] || n[Ii], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function ti(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(A(33));
  }
  function hn(n) {
    return n[ls] || null;
  }
  var gt = [], Da = -1;
  function ka(n) {
    return { current: n };
  }
  function nn(n) {
    0 > Da || (n.current = gt[Da], gt[Da] = null, Da--);
  }
  function xe(n, r) {
    Da++, gt[Da] = n.current, n.current = r;
  }
  var Er = {}, Sn = ka(Er), Yn = ka(!1), Qr = Er;
  function Wr(n, r) {
    var l = n.type.contextTypes;
    if (!l) return Er;
    var o = n.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === r) return o.__reactInternalMemoizedMaskedChildContext;
    var c = {}, d;
    for (d in l) c[d] = r[d];
    return o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function Mn(n) {
    return n = n.childContextTypes, n != null;
  }
  function po() {
    nn(Yn), nn(Sn);
  }
  function kv(n, r, l) {
    if (Sn.current !== Er) throw Error(A(168));
    xe(Sn, r), xe(Yn, l);
  }
  function os(n, r, l) {
    var o = n.stateNode;
    if (r = r.childContextTypes, typeof o.getChildContext != "function") return l;
    o = o.getChildContext();
    for (var c in o) if (!(c in r)) throw Error(A(108, Ze(n) || "Unknown", c));
    return ne({}, l, o);
  }
  function Xn(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Er, Qr = Sn.current, xe(Sn, n), xe(Yn, Yn.current), !0;
  }
  function wc(n, r, l) {
    var o = n.stateNode;
    if (!o) throw Error(A(169));
    l ? (n = os(n, r, Qr), o.__reactInternalMemoizedMergedChildContext = n, nn(Yn), nn(Sn), xe(Sn, n)) : nn(Yn), xe(Yn, l);
  }
  var Ci = null, vo = !1, Qi = !1;
  function xc(n) {
    Ci === null ? Ci = [n] : Ci.push(n);
  }
  function bl(n) {
    vo = !0, xc(n);
  }
  function Ri() {
    if (!Qi && Ci !== null) {
      Qi = !0;
      var n = 0, r = kt;
      try {
        var l = Ci;
        for (kt = 1; n < l.length; n++) {
          var o = l[n];
          do
            o = o(!0);
          while (o !== null);
        }
        Ci = null, vo = !1;
      } catch (c) {
        throw Ci !== null && (Ci = Ci.slice(n + 1)), un(qa, Ri), c;
      } finally {
        kt = r, Qi = !1;
      }
    }
    return null;
  }
  var _l = [], Dl = 0, kl = null, Wi = 0, Nn = [], Oa = 0, fa = null, Ti = 1, wi = "";
  function vu(n, r) {
    _l[Dl++] = Wi, _l[Dl++] = kl, kl = n, Wi = r;
  }
  function Ov(n, r, l) {
    Nn[Oa++] = Ti, Nn[Oa++] = wi, Nn[Oa++] = fa, fa = n;
    var o = Ti;
    n = wi;
    var c = 32 - _r(o) - 1;
    o &= ~(1 << c), l += 1;
    var d = 32 - _r(r) + c;
    if (30 < d) {
      var m = c - c % 5;
      d = (o & (1 << m) - 1).toString(32), o >>= m, c -= m, Ti = 1 << 32 - _r(r) + c | l << c | o, wi = d + n;
    } else Ti = 1 << d | l << c | o, wi = n;
  }
  function bc(n) {
    n.return !== null && (vu(n, 1), Ov(n, 1, 0));
  }
  function _c(n) {
    for (; n === kl; ) kl = _l[--Dl], _l[Dl] = null, Wi = _l[--Dl], _l[Dl] = null;
    for (; n === fa; ) fa = Nn[--Oa], Nn[Oa] = null, wi = Nn[--Oa], Nn[Oa] = null, Ti = Nn[--Oa], Nn[Oa] = null;
  }
  var Gr = null, qr = null, fn = !1, La = null;
  function vd(n, r) {
    var l = Aa(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function Lv(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, Gr = n, qr = Si(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, Gr = n, qr = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = fa !== null ? { id: Ti, overflow: wi } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = Aa(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, Gr = n, qr = null, !0) : !1;
      default:
        return !1;
    }
  }
  function hd(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function md(n) {
    if (fn) {
      var r = qr;
      if (r) {
        var l = r;
        if (!Lv(n, r)) {
          if (hd(n)) throw Error(A(418));
          r = Si(l.nextSibling);
          var o = Gr;
          r && Lv(n, r) ? vd(o, l) : (n.flags = n.flags & -4097 | 2, fn = !1, Gr = n);
        }
      } else {
        if (hd(n)) throw Error(A(418));
        n.flags = n.flags & -4097 | 2, fn = !1, Gr = n;
      }
    }
  }
  function In(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    Gr = n;
  }
  function Dc(n) {
    if (n !== Gr) return !1;
    if (!fn) return In(n), fn = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !Cc(n.type, n.memoizedProps)), r && (r = qr)) {
      if (hd(n)) throw ss(), Error(A(418));
      for (; r; ) vd(n, r), r = Si(r.nextSibling);
    }
    if (In(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(A(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                qr = Si(n.nextSibling);
                break e;
              }
              r--;
            } else l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        qr = null;
      }
    } else qr = Gr ? Si(n.stateNode.nextSibling) : null;
    return !0;
  }
  function ss() {
    for (var n = qr; n; ) n = Si(n.nextSibling);
  }
  function Ol() {
    qr = Gr = null, fn = !1;
  }
  function Gi(n) {
    La === null ? La = [n] : La.push(n);
  }
  var iy = vt.ReactCurrentBatchConfig;
  function hu(n, r, l) {
    if (n = l.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (l._owner) {
        if (l = l._owner, l) {
          if (l.tag !== 1) throw Error(A(309));
          var o = l.stateNode;
        }
        if (!o) throw Error(A(147, n));
        var c = o, d = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === d ? r.ref : (r = function(m) {
          var E = c.refs;
          m === null ? delete E[d] : E[d] = m;
        }, r._stringRef = d, r);
      }
      if (typeof n != "string") throw Error(A(284));
      if (!l._owner) throw Error(A(290, n));
    }
    return n;
  }
  function kc(n, r) {
    throw n = Object.prototype.toString.call(r), Error(A(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function Mv(n) {
    var r = n._init;
    return r(n._payload);
  }
  function mu(n) {
    function r(D, x) {
      if (n) {
        var L = D.deletions;
        L === null ? (D.deletions = [x], D.flags |= 16) : L.push(x);
      }
    }
    function l(D, x) {
      if (!n) return null;
      for (; x !== null; ) r(D, x), x = x.sibling;
      return null;
    }
    function o(D, x) {
      for (D = /* @__PURE__ */ new Map(); x !== null; ) x.key !== null ? D.set(x.key, x) : D.set(x.index, x), x = x.sibling;
      return D;
    }
    function c(D, x) {
      return D = jl(D, x), D.index = 0, D.sibling = null, D;
    }
    function d(D, x, L) {
      return D.index = L, n ? (L = D.alternate, L !== null ? (L = L.index, L < x ? (D.flags |= 2, x) : L) : (D.flags |= 2, x)) : (D.flags |= 1048576, x);
    }
    function m(D) {
      return n && D.alternate === null && (D.flags |= 2), D;
    }
    function E(D, x, L, Q) {
      return x === null || x.tag !== 6 ? (x = Wd(L, D.mode, Q), x.return = D, x) : (x = c(x, L), x.return = D, x);
    }
    function T(D, x, L, Q) {
      var ye = L.type;
      return ye === Fe ? I(D, x, L.props.children, Q, L.key) : x !== null && (x.elementType === ye || typeof ye == "object" && ye !== null && ye.$$typeof === Dt && Mv(ye) === x.type) ? (Q = c(x, L.props), Q.ref = hu(D, x, L), Q.return = D, Q) : (Q = Hs(L.type, L.key, L.props, null, D.mode, Q), Q.ref = hu(D, x, L), Q.return = D, Q);
    }
    function z(D, x, L, Q) {
      return x === null || x.tag !== 4 || x.stateNode.containerInfo !== L.containerInfo || x.stateNode.implementation !== L.implementation ? (x = sf(L, D.mode, Q), x.return = D, x) : (x = c(x, L.children || []), x.return = D, x);
    }
    function I(D, x, L, Q, ye) {
      return x === null || x.tag !== 7 ? (x = el(L, D.mode, Q, ye), x.return = D, x) : (x = c(x, L), x.return = D, x);
    }
    function W(D, x, L) {
      if (typeof x == "string" && x !== "" || typeof x == "number") return x = Wd("" + x, D.mode, L), x.return = D, x;
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case be:
            return L = Hs(x.type, x.key, x.props, null, D.mode, L), L.ref = hu(D, null, x), L.return = D, L;
          case st:
            return x = sf(x, D.mode, L), x.return = D, x;
          case Dt:
            var Q = x._init;
            return W(D, Q(x._payload), L);
        }
        if (Gn(x) || Re(x)) return x = el(x, D.mode, L, null), x.return = D, x;
        kc(D, x);
      }
      return null;
    }
    function Y(D, x, L, Q) {
      var ye = x !== null ? x.key : null;
      if (typeof L == "string" && L !== "" || typeof L == "number") return ye !== null ? null : E(D, x, "" + L, Q);
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case be:
            return L.key === ye ? T(D, x, L, Q) : null;
          case st:
            return L.key === ye ? z(D, x, L, Q) : null;
          case Dt:
            return ye = L._init, Y(
              D,
              x,
              ye(L._payload),
              Q
            );
        }
        if (Gn(L) || Re(L)) return ye !== null ? null : I(D, x, L, Q, null);
        kc(D, L);
      }
      return null;
    }
    function se(D, x, L, Q, ye) {
      if (typeof Q == "string" && Q !== "" || typeof Q == "number") return D = D.get(L) || null, E(x, D, "" + Q, ye);
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case be:
            return D = D.get(Q.key === null ? L : Q.key) || null, T(x, D, Q, ye);
          case st:
            return D = D.get(Q.key === null ? L : Q.key) || null, z(x, D, Q, ye);
          case Dt:
            var Me = Q._init;
            return se(D, x, L, Me(Q._payload), ye);
        }
        if (Gn(Q) || Re(Q)) return D = D.get(L) || null, I(x, D, Q, ye, null);
        kc(x, Q);
      }
      return null;
    }
    function me(D, x, L, Q) {
      for (var ye = null, Me = null, ze = x, Ve = x = 0, Jn = null; ze !== null && Ve < L.length; Ve++) {
        ze.index > Ve ? (Jn = ze, ze = null) : Jn = ze.sibling;
        var Mt = Y(D, ze, L[Ve], Q);
        if (Mt === null) {
          ze === null && (ze = Jn);
          break;
        }
        n && ze && Mt.alternate === null && r(D, ze), x = d(Mt, x, Ve), Me === null ? ye = Mt : Me.sibling = Mt, Me = Mt, ze = Jn;
      }
      if (Ve === L.length) return l(D, ze), fn && vu(D, Ve), ye;
      if (ze === null) {
        for (; Ve < L.length; Ve++) ze = W(D, L[Ve], Q), ze !== null && (x = d(ze, x, Ve), Me === null ? ye = ze : Me.sibling = ze, Me = ze);
        return fn && vu(D, Ve), ye;
      }
      for (ze = o(D, ze); Ve < L.length; Ve++) Jn = se(ze, D, Ve, L[Ve], Q), Jn !== null && (n && Jn.alternate !== null && ze.delete(Jn.key === null ? Ve : Jn.key), x = d(Jn, x, Ve), Me === null ? ye = Jn : Me.sibling = Jn, Me = Jn);
      return n && ze.forEach(function(Pl) {
        return r(D, Pl);
      }), fn && vu(D, Ve), ye;
    }
    function Se(D, x, L, Q) {
      var ye = Re(L);
      if (typeof ye != "function") throw Error(A(150));
      if (L = ye.call(L), L == null) throw Error(A(151));
      for (var Me = ye = null, ze = x, Ve = x = 0, Jn = null, Mt = L.next(); ze !== null && !Mt.done; Ve++, Mt = L.next()) {
        ze.index > Ve ? (Jn = ze, ze = null) : Jn = ze.sibling;
        var Pl = Y(D, ze, Mt.value, Q);
        if (Pl === null) {
          ze === null && (ze = Jn);
          break;
        }
        n && ze && Pl.alternate === null && r(D, ze), x = d(Pl, x, Ve), Me === null ? ye = Pl : Me.sibling = Pl, Me = Pl, ze = Jn;
      }
      if (Mt.done) return l(
        D,
        ze
      ), fn && vu(D, Ve), ye;
      if (ze === null) {
        for (; !Mt.done; Ve++, Mt = L.next()) Mt = W(D, Mt.value, Q), Mt !== null && (x = d(Mt, x, Ve), Me === null ? ye = Mt : Me.sibling = Mt, Me = Mt);
        return fn && vu(D, Ve), ye;
      }
      for (ze = o(D, ze); !Mt.done; Ve++, Mt = L.next()) Mt = se(ze, D, Ve, Mt.value, Q), Mt !== null && (n && Mt.alternate !== null && ze.delete(Mt.key === null ? Ve : Mt.key), x = d(Mt, x, Ve), Me === null ? ye = Mt : Me.sibling = Mt, Me = Mt);
      return n && ze.forEach(function(vh) {
        return r(D, vh);
      }), fn && vu(D, Ve), ye;
    }
    function _n(D, x, L, Q) {
      if (typeof L == "object" && L !== null && L.type === Fe && L.key === null && (L = L.props.children), typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case be:
            e: {
              for (var ye = L.key, Me = x; Me !== null; ) {
                if (Me.key === ye) {
                  if (ye = L.type, ye === Fe) {
                    if (Me.tag === 7) {
                      l(D, Me.sibling), x = c(Me, L.props.children), x.return = D, D = x;
                      break e;
                    }
                  } else if (Me.elementType === ye || typeof ye == "object" && ye !== null && ye.$$typeof === Dt && Mv(ye) === Me.type) {
                    l(D, Me.sibling), x = c(Me, L.props), x.ref = hu(D, Me, L), x.return = D, D = x;
                    break e;
                  }
                  l(D, Me);
                  break;
                } else r(D, Me);
                Me = Me.sibling;
              }
              L.type === Fe ? (x = el(L.props.children, D.mode, Q, L.key), x.return = D, D = x) : (Q = Hs(L.type, L.key, L.props, null, D.mode, Q), Q.ref = hu(D, x, L), Q.return = D, D = Q);
            }
            return m(D);
          case st:
            e: {
              for (Me = L.key; x !== null; ) {
                if (x.key === Me) if (x.tag === 4 && x.stateNode.containerInfo === L.containerInfo && x.stateNode.implementation === L.implementation) {
                  l(D, x.sibling), x = c(x, L.children || []), x.return = D, D = x;
                  break e;
                } else {
                  l(D, x);
                  break;
                }
                else r(D, x);
                x = x.sibling;
              }
              x = sf(L, D.mode, Q), x.return = D, D = x;
            }
            return m(D);
          case Dt:
            return Me = L._init, _n(D, x, Me(L._payload), Q);
        }
        if (Gn(L)) return me(D, x, L, Q);
        if (Re(L)) return Se(D, x, L, Q);
        kc(D, L);
      }
      return typeof L == "string" && L !== "" || typeof L == "number" ? (L = "" + L, x !== null && x.tag === 6 ? (l(D, x.sibling), x = c(x, L), x.return = D, D = x) : (l(D, x), x = Wd(L, D.mode, Q), x.return = D, D = x), m(D)) : l(D, x);
    }
    return _n;
  }
  var Tn = mu(!0), ie = mu(!1), da = ka(null), Xr = null, ho = null, yd = null;
  function gd() {
    yd = ho = Xr = null;
  }
  function Sd(n) {
    var r = da.current;
    nn(da), n._currentValue = r;
  }
  function Ed(n, r, l) {
    for (; n !== null; ) {
      var o = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, o !== null && (o.childLanes |= r)) : o !== null && (o.childLanes & r) !== r && (o.childLanes |= r), n === l) break;
      n = n.return;
    }
  }
  function mn(n, r) {
    Xr = n, yd = ho = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & r && (Un = !0), n.firstContext = null);
  }
  function Ma(n) {
    var r = n._currentValue;
    if (yd !== n) if (n = { context: n, memoizedValue: r, next: null }, ho === null) {
      if (Xr === null) throw Error(A(308));
      ho = n, Xr.dependencies = { lanes: 0, firstContext: n };
    } else ho = ho.next = n;
    return r;
  }
  var yu = null;
  function Cd(n) {
    yu === null ? yu = [n] : yu.push(n);
  }
  function Rd(n, r, l, o) {
    var c = r.interleaved;
    return c === null ? (l.next = l, Cd(r)) : (l.next = c.next, c.next = l), r.interleaved = l, pa(n, o);
  }
  function pa(n, r) {
    n.lanes |= r;
    var l = n.alternate;
    for (l !== null && (l.lanes |= r), l = n, n = n.return; n !== null; ) n.childLanes |= r, l = n.alternate, l !== null && (l.childLanes |= r), l = n, n = n.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var va = !1;
  function Td(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Nv(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function qi(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function Ll(n, r, l) {
    var o = n.updateQueue;
    if (o === null) return null;
    if (o = o.shared, St & 2) {
      var c = o.pending;
      return c === null ? r.next = r : (r.next = c.next, c.next = r), o.pending = r, pa(n, l);
    }
    return c = o.interleaved, c === null ? (r.next = r, Cd(o)) : (r.next = c.next, c.next = r), o.interleaved = r, pa(n, l);
  }
  function Oc(n, r, l) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (l & 4194240) !== 0)) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, Vi(n, l);
    }
  }
  function zv(n, r) {
    var l = n.updateQueue, o = n.alternate;
    if (o !== null && (o = o.updateQueue, l === o)) {
      var c = null, d = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var m = { eventTime: l.eventTime, lane: l.lane, tag: l.tag, payload: l.payload, callback: l.callback, next: null };
          d === null ? c = d = m : d = d.next = m, l = l.next;
        } while (l !== null);
        d === null ? c = d = r : d = d.next = r;
      } else c = d = r;
      l = { baseState: o.baseState, firstBaseUpdate: c, lastBaseUpdate: d, shared: o.shared, effects: o.effects }, n.updateQueue = l;
      return;
    }
    n = l.lastBaseUpdate, n === null ? l.firstBaseUpdate = r : n.next = r, l.lastBaseUpdate = r;
  }
  function cs(n, r, l, o) {
    var c = n.updateQueue;
    va = !1;
    var d = c.firstBaseUpdate, m = c.lastBaseUpdate, E = c.shared.pending;
    if (E !== null) {
      c.shared.pending = null;
      var T = E, z = T.next;
      T.next = null, m === null ? d = z : m.next = z, m = T;
      var I = n.alternate;
      I !== null && (I = I.updateQueue, E = I.lastBaseUpdate, E !== m && (E === null ? I.firstBaseUpdate = z : E.next = z, I.lastBaseUpdate = T));
    }
    if (d !== null) {
      var W = c.baseState;
      m = 0, I = z = T = null, E = d;
      do {
        var Y = E.lane, se = E.eventTime;
        if ((o & Y) === Y) {
          I !== null && (I = I.next = {
            eventTime: se,
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          });
          e: {
            var me = n, Se = E;
            switch (Y = r, se = l, Se.tag) {
              case 1:
                if (me = Se.payload, typeof me == "function") {
                  W = me.call(se, W, Y);
                  break e;
                }
                W = me;
                break e;
              case 3:
                me.flags = me.flags & -65537 | 128;
              case 0:
                if (me = Se.payload, Y = typeof me == "function" ? me.call(se, W, Y) : me, Y == null) break e;
                W = ne({}, W, Y);
                break e;
              case 2:
                va = !0;
            }
          }
          E.callback !== null && E.lane !== 0 && (n.flags |= 64, Y = c.effects, Y === null ? c.effects = [E] : Y.push(E));
        } else se = { eventTime: se, lane: Y, tag: E.tag, payload: E.payload, callback: E.callback, next: null }, I === null ? (z = I = se, T = W) : I = I.next = se, m |= Y;
        if (E = E.next, E === null) {
          if (E = c.shared.pending, E === null) break;
          Y = E, E = Y.next, Y.next = null, c.lastBaseUpdate = Y, c.shared.pending = null;
        }
      } while (!0);
      if (I === null && (T = W), c.baseState = T, c.firstBaseUpdate = z, c.lastBaseUpdate = I, r = c.shared.interleaved, r !== null) {
        c = r;
        do
          m |= c.lane, c = c.next;
        while (c !== r);
      } else d === null && (c.shared.lanes = 0);
      ki |= m, n.lanes = m, n.memoizedState = W;
    }
  }
  function wd(n, r, l) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var o = n[r], c = o.callback;
      if (c !== null) {
        if (o.callback = null, o = l, typeof c != "function") throw Error(A(191, c));
        c.call(o);
      }
    }
  }
  var fs = {}, xi = ka(fs), ds = ka(fs), ps = ka(fs);
  function gu(n) {
    if (n === fs) throw Error(A(174));
    return n;
  }
  function xd(n, r) {
    switch (xe(ps, r), xe(ds, n), xe(xi, fs), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : oa(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = oa(r, n);
    }
    nn(xi), xe(xi, r);
  }
  function Su() {
    nn(xi), nn(ds), nn(ps);
  }
  function Uv(n) {
    gu(ps.current);
    var r = gu(xi.current), l = oa(r, n.type);
    r !== l && (xe(ds, n), xe(xi, l));
  }
  function Lc(n) {
    ds.current === n && (nn(xi), nn(ds));
  }
  var yn = ka(0);
  function Mc(n) {
    for (var r = n; r !== null; ) {
      if (r.tag === 13) {
        var l = r.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || l.data === "$?" || l.data === "$!")) return r;
      } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
        if (r.flags & 128) return r;
      } else if (r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === n) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === n) return null;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
    return null;
  }
  var vs = [];
  function De() {
    for (var n = 0; n < vs.length; n++) vs[n]._workInProgressVersionPrimary = null;
    vs.length = 0;
  }
  var ut = vt.ReactCurrentDispatcher, Ot = vt.ReactCurrentBatchConfig, Wt = 0, Lt = null, zn = null, Kn = null, Nc = !1, hs = !1, Eu = 0, $ = 0;
  function _t() {
    throw Error(A(321));
  }
  function Ae(n, r) {
    if (r === null) return !1;
    for (var l = 0; l < r.length && l < n.length; l++) if (!ei(n[l], r[l])) return !1;
    return !0;
  }
  function Ml(n, r, l, o, c, d) {
    if (Wt = d, Lt = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, ut.current = n === null || n.memoizedState === null ? Gc : Cs, n = l(o, c), hs) {
      d = 0;
      do {
        if (hs = !1, Eu = 0, 25 <= d) throw Error(A(301));
        d += 1, Kn = zn = null, r.updateQueue = null, ut.current = qc, n = l(o, c);
      } while (hs);
    }
    if (ut.current = xu, r = zn !== null && zn.next !== null, Wt = 0, Kn = zn = Lt = null, Nc = !1, r) throw Error(A(300));
    return n;
  }
  function ni() {
    var n = Eu !== 0;
    return Eu = 0, n;
  }
  function Cr() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Kn === null ? Lt.memoizedState = Kn = n : Kn = Kn.next = n, Kn;
  }
  function wn() {
    if (zn === null) {
      var n = Lt.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = zn.next;
    var r = Kn === null ? Lt.memoizedState : Kn.next;
    if (r !== null) Kn = r, zn = n;
    else {
      if (n === null) throw Error(A(310));
      zn = n, n = { memoizedState: zn.memoizedState, baseState: zn.baseState, baseQueue: zn.baseQueue, queue: zn.queue, next: null }, Kn === null ? Lt.memoizedState = Kn = n : Kn = Kn.next = n;
    }
    return Kn;
  }
  function Xi(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function Nl(n) {
    var r = wn(), l = r.queue;
    if (l === null) throw Error(A(311));
    l.lastRenderedReducer = n;
    var o = zn, c = o.baseQueue, d = l.pending;
    if (d !== null) {
      if (c !== null) {
        var m = c.next;
        c.next = d.next, d.next = m;
      }
      o.baseQueue = c = d, l.pending = null;
    }
    if (c !== null) {
      d = c.next, o = o.baseState;
      var E = m = null, T = null, z = d;
      do {
        var I = z.lane;
        if ((Wt & I) === I) T !== null && (T = T.next = { lane: 0, action: z.action, hasEagerState: z.hasEagerState, eagerState: z.eagerState, next: null }), o = z.hasEagerState ? z.eagerState : n(o, z.action);
        else {
          var W = {
            lane: I,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null
          };
          T === null ? (E = T = W, m = o) : T = T.next = W, Lt.lanes |= I, ki |= I;
        }
        z = z.next;
      } while (z !== null && z !== d);
      T === null ? m = o : T.next = E, ei(o, r.memoizedState) || (Un = !0), r.memoizedState = o, r.baseState = m, r.baseQueue = T, l.lastRenderedState = o;
    }
    if (n = l.interleaved, n !== null) {
      c = n;
      do
        d = c.lane, Lt.lanes |= d, ki |= d, c = c.next;
      while (c !== n);
    } else c === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function Cu(n) {
    var r = wn(), l = r.queue;
    if (l === null) throw Error(A(311));
    l.lastRenderedReducer = n;
    var o = l.dispatch, c = l.pending, d = r.memoizedState;
    if (c !== null) {
      l.pending = null;
      var m = c = c.next;
      do
        d = n(d, m.action), m = m.next;
      while (m !== c);
      ei(d, r.memoizedState) || (Un = !0), r.memoizedState = d, r.baseQueue === null && (r.baseState = d), l.lastRenderedState = d;
    }
    return [d, o];
  }
  function zc() {
  }
  function Uc(n, r) {
    var l = Lt, o = wn(), c = r(), d = !ei(o.memoizedState, c);
    if (d && (o.memoizedState = c, Un = !0), o = o.queue, ms(jc.bind(null, l, o, n), [n]), o.getSnapshot !== r || d || Kn !== null && Kn.memoizedState.tag & 1) {
      if (l.flags |= 2048, Ru(9, Fc.bind(null, l, o, c, r), void 0, null), Qn === null) throw Error(A(349));
      Wt & 30 || Ac(l, r, c);
    }
    return c;
  }
  function Ac(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = Lt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Lt.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
  }
  function Fc(n, r, l, o) {
    r.value = l, r.getSnapshot = o, Hc(r) && Vc(n);
  }
  function jc(n, r, l) {
    return l(function() {
      Hc(r) && Vc(n);
    });
  }
  function Hc(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var l = r();
      return !ei(n, l);
    } catch {
      return !0;
    }
  }
  function Vc(n) {
    var r = pa(n, 1);
    r !== null && Nr(r, n, 1, -1);
  }
  function Pc(n) {
    var r = Cr();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Xi, lastRenderedState: n }, r.queue = n, n = n.dispatch = wu.bind(null, Lt, n), [r.memoizedState, n];
  }
  function Ru(n, r, l, o) {
    return n = { tag: n, create: r, destroy: l, deps: o, next: null }, r = Lt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Lt.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (o = l.next, l.next = n, n.next = o, r.lastEffect = n)), n;
  }
  function Bc() {
    return wn().memoizedState;
  }
  function mo(n, r, l, o) {
    var c = Cr();
    Lt.flags |= n, c.memoizedState = Ru(1 | r, l, void 0, o === void 0 ? null : o);
  }
  function yo(n, r, l, o) {
    var c = wn();
    o = o === void 0 ? null : o;
    var d = void 0;
    if (zn !== null) {
      var m = zn.memoizedState;
      if (d = m.destroy, o !== null && Ae(o, m.deps)) {
        c.memoizedState = Ru(r, l, d, o);
        return;
      }
    }
    Lt.flags |= n, c.memoizedState = Ru(1 | r, l, d, o);
  }
  function $c(n, r) {
    return mo(8390656, 8, n, r);
  }
  function ms(n, r) {
    return yo(2048, 8, n, r);
  }
  function Yc(n, r) {
    return yo(4, 2, n, r);
  }
  function ys(n, r) {
    return yo(4, 4, n, r);
  }
  function Tu(n, r) {
    if (typeof r == "function") return n = n(), r(n), function() {
      r(null);
    };
    if (r != null) return n = n(), r.current = n, function() {
      r.current = null;
    };
  }
  function Ic(n, r, l) {
    return l = l != null ? l.concat([n]) : null, yo(4, 4, Tu.bind(null, r, n), l);
  }
  function gs() {
  }
  function Qc(n, r) {
    var l = wn();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && Ae(r, o[1]) ? o[0] : (l.memoizedState = [n, r], n);
  }
  function Wc(n, r) {
    var l = wn();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && Ae(r, o[1]) ? o[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function bd(n, r, l) {
    return Wt & 21 ? (ei(l, r) || (l = qu(), Lt.lanes |= l, ki |= l, n.baseState = !0), r) : (n.baseState && (n.baseState = !1, Un = !0), n.memoizedState = l);
  }
  function Ss(n, r) {
    var l = kt;
    kt = l !== 0 && 4 > l ? l : 4, n(!0);
    var o = Ot.transition;
    Ot.transition = {};
    try {
      n(!1), r();
    } finally {
      kt = l, Ot.transition = o;
    }
  }
  function _d() {
    return wn().memoizedState;
  }
  function Es(n, r, l) {
    var o = Oi(n);
    if (l = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null }, Kr(n)) Av(r, l);
    else if (l = Rd(n, r, l, o), l !== null) {
      var c = jn();
      Nr(l, n, o, c), Xt(l, r, o);
    }
  }
  function wu(n, r, l) {
    var o = Oi(n), c = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (Kr(n)) Av(r, c);
    else {
      var d = n.alternate;
      if (n.lanes === 0 && (d === null || d.lanes === 0) && (d = r.lastRenderedReducer, d !== null)) try {
        var m = r.lastRenderedState, E = d(m, l);
        if (c.hasEagerState = !0, c.eagerState = E, ei(E, m)) {
          var T = r.interleaved;
          T === null ? (c.next = c, Cd(r)) : (c.next = T.next, T.next = c), r.interleaved = c;
          return;
        }
      } catch {
      } finally {
      }
      l = Rd(n, r, c, o), l !== null && (c = jn(), Nr(l, n, o, c), Xt(l, r, o));
    }
  }
  function Kr(n) {
    var r = n.alternate;
    return n === Lt || r !== null && r === Lt;
  }
  function Av(n, r) {
    hs = Nc = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function Xt(n, r, l) {
    if (l & 4194240) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, Vi(n, l);
    }
  }
  var xu = { readContext: Ma, useCallback: _t, useContext: _t, useEffect: _t, useImperativeHandle: _t, useInsertionEffect: _t, useLayoutEffect: _t, useMemo: _t, useReducer: _t, useRef: _t, useState: _t, useDebugValue: _t, useDeferredValue: _t, useTransition: _t, useMutableSource: _t, useSyncExternalStore: _t, useId: _t, unstable_isNewReconciler: !1 }, Gc = { readContext: Ma, useCallback: function(n, r) {
    return Cr().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: Ma, useEffect: $c, useImperativeHandle: function(n, r, l) {
    return l = l != null ? l.concat([n]) : null, mo(
      4194308,
      4,
      Tu.bind(null, r, n),
      l
    );
  }, useLayoutEffect: function(n, r) {
    return mo(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return mo(4, 2, n, r);
  }, useMemo: function(n, r) {
    var l = Cr();
    return r = r === void 0 ? null : r, n = n(), l.memoizedState = [n, r], n;
  }, useReducer: function(n, r, l) {
    var o = Cr();
    return r = l !== void 0 ? l(r) : r, o.memoizedState = o.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, o.queue = n, n = n.dispatch = Es.bind(null, Lt, n), [o.memoizedState, n];
  }, useRef: function(n) {
    var r = Cr();
    return n = { current: n }, r.memoizedState = n;
  }, useState: Pc, useDebugValue: gs, useDeferredValue: function(n) {
    return Cr().memoizedState = n;
  }, useTransition: function() {
    var n = Pc(!1), r = n[0];
    return n = Ss.bind(null, n[1]), Cr().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, l) {
    var o = Lt, c = Cr();
    if (fn) {
      if (l === void 0) throw Error(A(407));
      l = l();
    } else {
      if (l = r(), Qn === null) throw Error(A(349));
      Wt & 30 || Ac(o, r, l);
    }
    c.memoizedState = l;
    var d = { value: l, getSnapshot: r };
    return c.queue = d, $c(jc.bind(
      null,
      o,
      d,
      n
    ), [n]), o.flags |= 2048, Ru(9, Fc.bind(null, o, d, l, r), void 0, null), l;
  }, useId: function() {
    var n = Cr(), r = Qn.identifierPrefix;
    if (fn) {
      var l = wi, o = Ti;
      l = (o & ~(1 << 32 - _r(o) - 1)).toString(32) + l, r = ":" + r + "R" + l, l = Eu++, 0 < l && (r += "H" + l.toString(32)), r += ":";
    } else l = $++, r = ":" + r + "r" + l.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, Cs = {
    readContext: Ma,
    useCallback: Qc,
    useContext: Ma,
    useEffect: ms,
    useImperativeHandle: Ic,
    useInsertionEffect: Yc,
    useLayoutEffect: ys,
    useMemo: Wc,
    useReducer: Nl,
    useRef: Bc,
    useState: function() {
      return Nl(Xi);
    },
    useDebugValue: gs,
    useDeferredValue: function(n) {
      var r = wn();
      return bd(r, zn.memoizedState, n);
    },
    useTransition: function() {
      var n = Nl(Xi)[0], r = wn().memoizedState;
      return [n, r];
    },
    useMutableSource: zc,
    useSyncExternalStore: Uc,
    useId: _d,
    unstable_isNewReconciler: !1
  }, qc = { readContext: Ma, useCallback: Qc, useContext: Ma, useEffect: ms, useImperativeHandle: Ic, useInsertionEffect: Yc, useLayoutEffect: ys, useMemo: Wc, useReducer: Cu, useRef: Bc, useState: function() {
    return Cu(Xi);
  }, useDebugValue: gs, useDeferredValue: function(n) {
    var r = wn();
    return zn === null ? r.memoizedState = n : bd(r, zn.memoizedState, n);
  }, useTransition: function() {
    var n = Cu(Xi)[0], r = wn().memoizedState;
    return [n, r];
  }, useMutableSource: zc, useSyncExternalStore: Uc, useId: _d, unstable_isNewReconciler: !1 };
  function ri(n, r) {
    if (n && n.defaultProps) {
      r = ne({}, r), n = n.defaultProps;
      for (var l in n) r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  function Dd(n, r, l, o) {
    r = n.memoizedState, l = l(o, r), l = l == null ? r : ne({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var Xc = { isMounted: function(n) {
    return (n = n._reactInternals) ? Ge(n) === n : !1;
  }, enqueueSetState: function(n, r, l) {
    n = n._reactInternals;
    var o = jn(), c = Oi(n), d = qi(o, c);
    d.payload = r, l != null && (d.callback = l), r = Ll(n, d, c), r !== null && (Nr(r, n, c, o), Oc(r, n, c));
  }, enqueueReplaceState: function(n, r, l) {
    n = n._reactInternals;
    var o = jn(), c = Oi(n), d = qi(o, c);
    d.tag = 1, d.payload = r, l != null && (d.callback = l), r = Ll(n, d, c), r !== null && (Nr(r, n, c, o), Oc(r, n, c));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var l = jn(), o = Oi(n), c = qi(l, o);
    c.tag = 2, r != null && (c.callback = r), r = Ll(n, c, o), r !== null && (Nr(r, n, o, l), Oc(r, n, o));
  } };
  function Fv(n, r, l, o, c, d, m) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(o, d, m) : r.prototype && r.prototype.isPureReactComponent ? !es(l, o) || !es(c, d) : !0;
  }
  function Kc(n, r, l) {
    var o = !1, c = Er, d = r.contextType;
    return typeof d == "object" && d !== null ? d = Ma(d) : (c = Mn(r) ? Qr : Sn.current, o = r.contextTypes, d = (o = o != null) ? Wr(n, c) : Er), r = new r(l, d), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = Xc, n.stateNode = r, r._reactInternals = n, o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = c, n.__reactInternalMemoizedMaskedChildContext = d), r;
  }
  function jv(n, r, l, o) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, o), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, o), r.state !== n && Xc.enqueueReplaceState(r, r.state, null);
  }
  function Rs(n, r, l, o) {
    var c = n.stateNode;
    c.props = l, c.state = n.memoizedState, c.refs = {}, Td(n);
    var d = r.contextType;
    typeof d == "object" && d !== null ? c.context = Ma(d) : (d = Mn(r) ? Qr : Sn.current, c.context = Wr(n, d)), c.state = n.memoizedState, d = r.getDerivedStateFromProps, typeof d == "function" && (Dd(n, r, d, l), c.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && Xc.enqueueReplaceState(c, c.state, null), cs(n, l, c, o), c.state = n.memoizedState), typeof c.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function bu(n, r) {
    try {
      var l = "", o = r;
      do
        l += at(o), o = o.return;
      while (o);
      var c = l;
    } catch (d) {
      c = `
Error generating stack: ` + d.message + `
` + d.stack;
    }
    return { value: n, source: r, stack: c, digest: null };
  }
  function kd(n, r, l) {
    return { value: n, source: null, stack: l ?? null, digest: r ?? null };
  }
  function Od(n, r) {
    try {
      console.error(r.value);
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  var Zc = typeof WeakMap == "function" ? WeakMap : Map;
  function Hv(n, r, l) {
    l = qi(-1, l), l.tag = 3, l.payload = { element: null };
    var o = r.value;
    return l.callback = function() {
      To || (To = !0, ku = o), Od(n, r);
    }, l;
  }
  function Ld(n, r, l) {
    l = qi(-1, l), l.tag = 3;
    var o = n.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var c = r.value;
      l.payload = function() {
        return o(c);
      }, l.callback = function() {
        Od(n, r);
      };
    }
    var d = n.stateNode;
    return d !== null && typeof d.componentDidCatch == "function" && (l.callback = function() {
      Od(n, r), typeof o != "function" && (Al === null ? Al = /* @__PURE__ */ new Set([this]) : Al.add(this));
      var m = r.stack;
      this.componentDidCatch(r.value, { componentStack: m !== null ? m : "" });
    }), l;
  }
  function Md(n, r, l) {
    var o = n.pingCache;
    if (o === null) {
      o = n.pingCache = new Zc();
      var c = /* @__PURE__ */ new Set();
      o.set(r, c);
    } else c = o.get(r), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(r, c));
    c.has(l) || (c.add(l), n = dy.bind(null, n, r, l), r.then(n, n));
  }
  function Vv(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function zl(n, r, l, o, c) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = c, n) : (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = qi(-1, 1), r.tag = 2, Ll(l, r, 1))), l.lanes |= 1), n);
  }
  var Ts = vt.ReactCurrentOwner, Un = !1;
  function lr(n, r, l, o) {
    r.child = n === null ? ie(r, null, l, o) : Tn(r, n.child, l, o);
  }
  function Zr(n, r, l, o, c) {
    l = l.render;
    var d = r.ref;
    return mn(r, c), o = Ml(n, r, l, o, d, c), l = ni(), n !== null && !Un ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, za(n, r, c)) : (fn && l && bc(r), r.flags |= 1, lr(n, r, o, c), r.child);
  }
  function _u(n, r, l, o, c) {
    if (n === null) {
      var d = l.type;
      return typeof d == "function" && !Qd(d) && d.defaultProps === void 0 && l.compare === null && l.defaultProps === void 0 ? (r.tag = 15, r.type = d, Xe(n, r, d, o, c)) : (n = Hs(l.type, null, o, r, r.mode, c), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (d = n.child, !(n.lanes & c)) {
      var m = d.memoizedProps;
      if (l = l.compare, l = l !== null ? l : es, l(m, o) && n.ref === r.ref) return za(n, r, c);
    }
    return r.flags |= 1, n = jl(d, o), n.ref = r.ref, n.return = r, r.child = n;
  }
  function Xe(n, r, l, o, c) {
    if (n !== null) {
      var d = n.memoizedProps;
      if (es(d, o) && n.ref === r.ref) if (Un = !1, r.pendingProps = o = d, (n.lanes & c) !== 0) n.flags & 131072 && (Un = !0);
      else return r.lanes = n.lanes, za(n, r, c);
    }
    return Pv(n, r, l, o, c);
  }
  function ws(n, r, l) {
    var o = r.pendingProps, c = o.children, d = n !== null ? n.memoizedState : null;
    if (o.mode === "hidden") if (!(r.mode & 1)) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, xe(Eo, ha), ha |= l;
    else {
      if (!(l & 1073741824)) return n = d !== null ? d.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, xe(Eo, ha), ha |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = d !== null ? d.baseLanes : l, xe(Eo, ha), ha |= o;
    }
    else d !== null ? (o = d.baseLanes | l, r.memoizedState = null) : o = l, xe(Eo, ha), ha |= o;
    return lr(n, r, c, l), r.child;
  }
  function Nd(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function Pv(n, r, l, o, c) {
    var d = Mn(l) ? Qr : Sn.current;
    return d = Wr(r, d), mn(r, c), l = Ml(n, r, l, o, d, c), o = ni(), n !== null && !Un ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, za(n, r, c)) : (fn && o && bc(r), r.flags |= 1, lr(n, r, l, c), r.child);
  }
  function Bv(n, r, l, o, c) {
    if (Mn(l)) {
      var d = !0;
      Xn(r);
    } else d = !1;
    if (mn(r, c), r.stateNode === null) Na(n, r), Kc(r, l, o), Rs(r, l, o, c), o = !0;
    else if (n === null) {
      var m = r.stateNode, E = r.memoizedProps;
      m.props = E;
      var T = m.context, z = l.contextType;
      typeof z == "object" && z !== null ? z = Ma(z) : (z = Mn(l) ? Qr : Sn.current, z = Wr(r, z));
      var I = l.getDerivedStateFromProps, W = typeof I == "function" || typeof m.getSnapshotBeforeUpdate == "function";
      W || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (E !== o || T !== z) && jv(r, m, o, z), va = !1;
      var Y = r.memoizedState;
      m.state = Y, cs(r, o, m, c), T = r.memoizedState, E !== o || Y !== T || Yn.current || va ? (typeof I == "function" && (Dd(r, l, I, o), T = r.memoizedState), (E = va || Fv(r, l, E, o, Y, T, z)) ? (W || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = o, r.memoizedState = T), m.props = o, m.state = T, m.context = z, o = E) : (typeof m.componentDidMount == "function" && (r.flags |= 4194308), o = !1);
    } else {
      m = r.stateNode, Nv(n, r), E = r.memoizedProps, z = r.type === r.elementType ? E : ri(r.type, E), m.props = z, W = r.pendingProps, Y = m.context, T = l.contextType, typeof T == "object" && T !== null ? T = Ma(T) : (T = Mn(l) ? Qr : Sn.current, T = Wr(r, T));
      var se = l.getDerivedStateFromProps;
      (I = typeof se == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (E !== W || Y !== T) && jv(r, m, o, T), va = !1, Y = r.memoizedState, m.state = Y, cs(r, o, m, c);
      var me = r.memoizedState;
      E !== W || Y !== me || Yn.current || va ? (typeof se == "function" && (Dd(r, l, se, o), me = r.memoizedState), (z = va || Fv(r, l, z, o, Y, me, T) || !1) ? (I || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(o, me, T), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(o, me, T)), typeof m.componentDidUpdate == "function" && (r.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || E === n.memoizedProps && Y === n.memoizedState || (r.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || E === n.memoizedProps && Y === n.memoizedState || (r.flags |= 1024), r.memoizedProps = o, r.memoizedState = me), m.props = o, m.state = me, m.context = T, o = z) : (typeof m.componentDidUpdate != "function" || E === n.memoizedProps && Y === n.memoizedState || (r.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || E === n.memoizedProps && Y === n.memoizedState || (r.flags |= 1024), o = !1);
    }
    return xs(n, r, l, o, d, c);
  }
  function xs(n, r, l, o, c, d) {
    Nd(n, r);
    var m = (r.flags & 128) !== 0;
    if (!o && !m) return c && wc(r, l, !1), za(n, r, d);
    o = r.stateNode, Ts.current = r;
    var E = m && typeof l.getDerivedStateFromError != "function" ? null : o.render();
    return r.flags |= 1, n !== null && m ? (r.child = Tn(r, n.child, null, d), r.child = Tn(r, null, E, d)) : lr(n, r, E, d), r.memoizedState = o.state, c && wc(r, l, !0), r.child;
  }
  function go(n) {
    var r = n.stateNode;
    r.pendingContext ? kv(n, r.pendingContext, r.pendingContext !== r.context) : r.context && kv(n, r.context, !1), xd(n, r.containerInfo);
  }
  function $v(n, r, l, o, c) {
    return Ol(), Gi(c), r.flags |= 256, lr(n, r, l, o), r.child;
  }
  var Jc = { dehydrated: null, treeContext: null, retryLane: 0 };
  function zd(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function ef(n, r, l) {
    var o = r.pendingProps, c = yn.current, d = !1, m = (r.flags & 128) !== 0, E;
    if ((E = m) || (E = n !== null && n.memoizedState === null ? !1 : (c & 2) !== 0), E ? (d = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (c |= 1), xe(yn, c & 1), n === null)
      return md(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (r.mode & 1 ? n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824 : r.lanes = 1, null) : (m = o.children, n = o.fallback, d ? (o = r.mode, d = r.child, m = { mode: "hidden", children: m }, !(o & 1) && d !== null ? (d.childLanes = 0, d.pendingProps = m) : d = Hl(m, o, 0, null), n = el(n, o, l, null), d.return = r, n.return = r, d.sibling = n, r.child = d, r.child.memoizedState = zd(l), r.memoizedState = Jc, n) : Ud(r, m));
    if (c = n.memoizedState, c !== null && (E = c.dehydrated, E !== null)) return Yv(n, r, m, o, E, c, l);
    if (d) {
      d = o.fallback, m = r.mode, c = n.child, E = c.sibling;
      var T = { mode: "hidden", children: o.children };
      return !(m & 1) && r.child !== c ? (o = r.child, o.childLanes = 0, o.pendingProps = T, r.deletions = null) : (o = jl(c, T), o.subtreeFlags = c.subtreeFlags & 14680064), E !== null ? d = jl(E, d) : (d = el(d, m, l, null), d.flags |= 2), d.return = r, o.return = r, o.sibling = d, r.child = o, o = d, d = r.child, m = n.child.memoizedState, m = m === null ? zd(l) : { baseLanes: m.baseLanes | l, cachePool: null, transitions: m.transitions }, d.memoizedState = m, d.childLanes = n.childLanes & ~l, r.memoizedState = Jc, o;
    }
    return d = n.child, n = d.sibling, o = jl(d, { mode: "visible", children: o.children }), !(r.mode & 1) && (o.lanes = l), o.return = r, o.sibling = null, n !== null && (l = r.deletions, l === null ? (r.deletions = [n], r.flags |= 16) : l.push(n)), r.child = o, r.memoizedState = null, o;
  }
  function Ud(n, r) {
    return r = Hl({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function bs(n, r, l, o) {
    return o !== null && Gi(o), Tn(r, n.child, null, l), n = Ud(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function Yv(n, r, l, o, c, d, m) {
    if (l)
      return r.flags & 256 ? (r.flags &= -257, o = kd(Error(A(422))), bs(n, r, m, o)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (d = o.fallback, c = r.mode, o = Hl({ mode: "visible", children: o.children }, c, 0, null), d = el(d, c, m, null), d.flags |= 2, o.return = r, d.return = r, o.sibling = d, r.child = o, r.mode & 1 && Tn(r, n.child, null, m), r.child.memoizedState = zd(m), r.memoizedState = Jc, d);
    if (!(r.mode & 1)) return bs(n, r, m, null);
    if (c.data === "$!") {
      if (o = c.nextSibling && c.nextSibling.dataset, o) var E = o.dgst;
      return o = E, d = Error(A(419)), o = kd(d, o, void 0), bs(n, r, m, o);
    }
    if (E = (m & n.childLanes) !== 0, Un || E) {
      if (o = Qn, o !== null) {
        switch (m & -m) {
          case 4:
            c = 2;
            break;
          case 16:
            c = 8;
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
            c = 32;
            break;
          case 536870912:
            c = 268435456;
            break;
          default:
            c = 0;
        }
        c = c & (o.suspendedLanes | m) ? 0 : c, c !== 0 && c !== d.retryLane && (d.retryLane = c, pa(n, c), Nr(o, n, c, -1));
      }
      return Id(), o = kd(Error(A(421))), bs(n, r, m, o);
    }
    return c.data === "$?" ? (r.flags |= 128, r.child = n.child, r = py.bind(null, n), c._reactRetry = r, null) : (n = d.treeContext, qr = Si(c.nextSibling), Gr = r, fn = !0, La = null, n !== null && (Nn[Oa++] = Ti, Nn[Oa++] = wi, Nn[Oa++] = fa, Ti = n.id, wi = n.overflow, fa = r), r = Ud(r, o.children), r.flags |= 4096, r);
  }
  function Ad(n, r, l) {
    n.lanes |= r;
    var o = n.alternate;
    o !== null && (o.lanes |= r), Ed(n.return, r, l);
  }
  function Or(n, r, l, o, c) {
    var d = n.memoizedState;
    d === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: o, tail: l, tailMode: c } : (d.isBackwards = r, d.rendering = null, d.renderingStartTime = 0, d.last = o, d.tail = l, d.tailMode = c);
  }
  function bi(n, r, l) {
    var o = r.pendingProps, c = o.revealOrder, d = o.tail;
    if (lr(n, r, o.children, l), o = yn.current, o & 2) o = o & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && n.flags & 128) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && Ad(n, l, r);
        else if (n.tag === 19) Ad(n, l, r);
        else if (n.child !== null) {
          n.child.return = n, n = n.child;
          continue;
        }
        if (n === r) break e;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === r) break e;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
      o &= 1;
    }
    if (xe(yn, o), !(r.mode & 1)) r.memoizedState = null;
    else switch (c) {
      case "forwards":
        for (l = r.child, c = null; l !== null; ) n = l.alternate, n !== null && Mc(n) === null && (c = l), l = l.sibling;
        l = c, l === null ? (c = r.child, r.child = null) : (c = l.sibling, l.sibling = null), Or(r, !1, c, l, d);
        break;
      case "backwards":
        for (l = null, c = r.child, r.child = null; c !== null; ) {
          if (n = c.alternate, n !== null && Mc(n) === null) {
            r.child = c;
            break;
          }
          n = c.sibling, c.sibling = l, l = c, c = n;
        }
        Or(r, !0, l, null, d);
        break;
      case "together":
        Or(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function Na(n, r) {
    !(r.mode & 1) && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function za(n, r, l) {
    if (n !== null && (r.dependencies = n.dependencies), ki |= r.lanes, !(l & r.childLanes)) return null;
    if (n !== null && r.child !== n.child) throw Error(A(153));
    if (r.child !== null) {
      for (n = r.child, l = jl(n, n.pendingProps), r.child = l, l.return = r; n.sibling !== null; ) n = n.sibling, l = l.sibling = jl(n, n.pendingProps), l.return = r;
      l.sibling = null;
    }
    return r.child;
  }
  function _s(n, r, l) {
    switch (r.tag) {
      case 3:
        go(r), Ol();
        break;
      case 5:
        Uv(r);
        break;
      case 1:
        Mn(r.type) && Xn(r);
        break;
      case 4:
        xd(r, r.stateNode.containerInfo);
        break;
      case 10:
        var o = r.type._context, c = r.memoizedProps.value;
        xe(da, o._currentValue), o._currentValue = c;
        break;
      case 13:
        if (o = r.memoizedState, o !== null)
          return o.dehydrated !== null ? (xe(yn, yn.current & 1), r.flags |= 128, null) : l & r.child.childLanes ? ef(n, r, l) : (xe(yn, yn.current & 1), n = za(n, r, l), n !== null ? n.sibling : null);
        xe(yn, yn.current & 1);
        break;
      case 19:
        if (o = (l & r.childLanes) !== 0, n.flags & 128) {
          if (o) return bi(n, r, l);
          r.flags |= 128;
        }
        if (c = r.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), xe(yn, yn.current), o) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, ws(n, r, l);
    }
    return za(n, r, l);
  }
  var Ua, An, Iv, Qv;
  Ua = function(n, r) {
    for (var l = r.child; l !== null; ) {
      if (l.tag === 5 || l.tag === 6) n.appendChild(l.stateNode);
      else if (l.tag !== 4 && l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === r) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === r) return;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
  }, An = function() {
  }, Iv = function(n, r, l, o) {
    var c = n.memoizedProps;
    if (c !== o) {
      n = r.stateNode, gu(xi.current);
      var d = null;
      switch (l) {
        case "input":
          c = tr(n, c), o = tr(n, o), d = [];
          break;
        case "select":
          c = ne({}, c, { value: void 0 }), o = ne({}, o, { value: void 0 }), d = [];
          break;
        case "textarea":
          c = Bn(n, c), o = Bn(n, o), d = [];
          break;
        default:
          typeof c.onClick != "function" && typeof o.onClick == "function" && (n.onclick = wl);
      }
      ln(l, o);
      var m;
      l = null;
      for (z in c) if (!o.hasOwnProperty(z) && c.hasOwnProperty(z) && c[z] != null) if (z === "style") {
        var E = c[z];
        for (m in E) E.hasOwnProperty(m) && (l || (l = {}), l[m] = "");
      } else z !== "dangerouslySetInnerHTML" && z !== "children" && z !== "suppressContentEditableWarning" && z !== "suppressHydrationWarning" && z !== "autoFocus" && (Ke.hasOwnProperty(z) ? d || (d = []) : (d = d || []).push(z, null));
      for (z in o) {
        var T = o[z];
        if (E = c != null ? c[z] : void 0, o.hasOwnProperty(z) && T !== E && (T != null || E != null)) if (z === "style") if (E) {
          for (m in E) !E.hasOwnProperty(m) || T && T.hasOwnProperty(m) || (l || (l = {}), l[m] = "");
          for (m in T) T.hasOwnProperty(m) && E[m] !== T[m] && (l || (l = {}), l[m] = T[m]);
        } else l || (d || (d = []), d.push(
          z,
          l
        )), l = T;
        else z === "dangerouslySetInnerHTML" ? (T = T ? T.__html : void 0, E = E ? E.__html : void 0, T != null && E !== T && (d = d || []).push(z, T)) : z === "children" ? typeof T != "string" && typeof T != "number" || (d = d || []).push(z, "" + T) : z !== "suppressContentEditableWarning" && z !== "suppressHydrationWarning" && (Ke.hasOwnProperty(z) ? (T != null && z === "onScroll" && jt("scroll", n), d || E === T || (d = [])) : (d = d || []).push(z, T));
      }
      l && (d = d || []).push("style", l);
      var z = d;
      (r.updateQueue = z) && (r.flags |= 4);
    }
  }, Qv = function(n, r, l, o) {
    l !== o && (r.flags |= 4);
  };
  function Ds(n, r) {
    if (!fn) switch (n.tailMode) {
      case "hidden":
        r = n.tail;
        for (var l = null; r !== null; ) r.alternate !== null && (l = r), r = r.sibling;
        l === null ? n.tail = null : l.sibling = null;
        break;
      case "collapsed":
        l = n.tail;
        for (var o = null; l !== null; ) l.alternate !== null && (o = l), l = l.sibling;
        o === null ? r || n.tail === null ? n.tail = null : n.tail.sibling = null : o.sibling = null;
    }
  }
  function Zn(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, l = 0, o = 0;
    if (r) for (var c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags & 14680064, o |= c.flags & 14680064, c.return = n, c = c.sibling;
    else for (c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags, o |= c.flags, c.return = n, c = c.sibling;
    return n.subtreeFlags |= o, n.childLanes = l, r;
  }
  function Wv(n, r, l) {
    var o = r.pendingProps;
    switch (_c(r), r.tag) {
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
        return Zn(r), null;
      case 1:
        return Mn(r.type) && po(), Zn(r), null;
      case 3:
        return o = r.stateNode, Su(), nn(Yn), nn(Sn), De(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (n === null || n.child === null) && (Dc(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, La !== null && (Ou(La), La = null))), An(n, r), Zn(r), null;
      case 5:
        Lc(r);
        var c = gu(ps.current);
        if (l = r.type, n !== null && r.stateNode != null) Iv(n, r, l, o, c), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!o) {
            if (r.stateNode === null) throw Error(A(166));
            return Zn(r), null;
          }
          if (n = gu(xi.current), Dc(r)) {
            o = r.stateNode, l = r.type;
            var d = r.memoizedProps;
            switch (o[Ei] = r, o[ls] = d, n = (r.mode & 1) !== 0, l) {
              case "dialog":
                jt("cancel", o), jt("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                jt("load", o);
                break;
              case "video":
              case "audio":
                for (c = 0; c < rs.length; c++) jt(rs[c], o);
                break;
              case "source":
                jt("error", o);
                break;
              case "img":
              case "image":
              case "link":
                jt(
                  "error",
                  o
                ), jt("load", o);
                break;
              case "details":
                jt("toggle", o);
                break;
              case "input":
                Vn(o, d), jt("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!d.multiple }, jt("invalid", o);
                break;
              case "textarea":
                yr(o, d), jt("invalid", o);
            }
            ln(l, d), c = null;
            for (var m in d) if (d.hasOwnProperty(m)) {
              var E = d[m];
              m === "children" ? typeof E == "string" ? o.textContent !== E && (d.suppressHydrationWarning !== !0 && Ec(o.textContent, E, n), c = ["children", E]) : typeof E == "number" && o.textContent !== "" + E && (d.suppressHydrationWarning !== !0 && Ec(
                o.textContent,
                E,
                n
              ), c = ["children", "" + E]) : Ke.hasOwnProperty(m) && E != null && m === "onScroll" && jt("scroll", o);
            }
            switch (l) {
              case "input":
                kn(o), si(o, d, !0);
                break;
              case "textarea":
                kn(o), On(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof d.onClick == "function" && (o.onclick = wl);
            }
            o = c, r.updateQueue = o, o !== null && (r.flags |= 4);
          } else {
            m = c.nodeType === 9 ? c : c.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = gr(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = m.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof o.is == "string" ? n = m.createElement(l, { is: o.is }) : (n = m.createElement(l), l === "select" && (m = n, o.multiple ? m.multiple = !0 : o.size && (m.size = o.size))) : n = m.createElementNS(n, l), n[Ei] = r, n[ls] = o, Ua(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (m = qn(l, o), l) {
                case "dialog":
                  jt("cancel", n), jt("close", n), c = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  jt("load", n), c = o;
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < rs.length; c++) jt(rs[c], n);
                  c = o;
                  break;
                case "source":
                  jt("error", n), c = o;
                  break;
                case "img":
                case "image":
                case "link":
                  jt(
                    "error",
                    n
                  ), jt("load", n), c = o;
                  break;
                case "details":
                  jt("toggle", n), c = o;
                  break;
                case "input":
                  Vn(n, o), c = tr(n, o), jt("invalid", n);
                  break;
                case "option":
                  c = o;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!o.multiple }, c = ne({}, o, { value: void 0 }), jt("invalid", n);
                  break;
                case "textarea":
                  yr(n, o), c = Bn(n, o), jt("invalid", n);
                  break;
                default:
                  c = o;
              }
              ln(l, c), E = c;
              for (d in E) if (E.hasOwnProperty(d)) {
                var T = E[d];
                d === "style" ? Zt(n, T) : d === "dangerouslySetInnerHTML" ? (T = T ? T.__html : void 0, T != null && ci(n, T)) : d === "children" ? typeof T == "string" ? (l !== "textarea" || T !== "") && J(n, T) : typeof T == "number" && J(n, "" + T) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Ke.hasOwnProperty(d) ? T != null && d === "onScroll" && jt("scroll", n) : T != null && Qe(n, d, T, m));
              }
              switch (l) {
                case "input":
                  kn(n), si(n, o, !1);
                  break;
                case "textarea":
                  kn(n), On(n);
                  break;
                case "option":
                  o.value != null && n.setAttribute("value", "" + tt(o.value));
                  break;
                case "select":
                  n.multiple = !!o.multiple, d = o.value, d != null ? Cn(n, !!o.multiple, d, !1) : o.defaultValue != null && Cn(
                    n,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof c.onClick == "function" && (n.onclick = wl);
              }
              switch (l) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  o = !!o.autoFocus;
                  break e;
                case "img":
                  o = !0;
                  break e;
                default:
                  o = !1;
              }
            }
            o && (r.flags |= 4);
          }
          r.ref !== null && (r.flags |= 512, r.flags |= 2097152);
        }
        return Zn(r), null;
      case 6:
        if (n && r.stateNode != null) Qv(n, r, n.memoizedProps, o);
        else {
          if (typeof o != "string" && r.stateNode === null) throw Error(A(166));
          if (l = gu(ps.current), gu(xi.current), Dc(r)) {
            if (o = r.stateNode, l = r.memoizedProps, o[Ei] = r, (d = o.nodeValue !== l) && (n = Gr, n !== null)) switch (n.tag) {
              case 3:
                Ec(o.nodeValue, l, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && Ec(o.nodeValue, l, (n.mode & 1) !== 0);
            }
            d && (r.flags |= 4);
          } else o = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(o), o[Ei] = r, r.stateNode = o;
        }
        return Zn(r), null;
      case 13:
        if (nn(yn), o = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (fn && qr !== null && r.mode & 1 && !(r.flags & 128)) ss(), Ol(), r.flags |= 98560, d = !1;
          else if (d = Dc(r), o !== null && o.dehydrated !== null) {
            if (n === null) {
              if (!d) throw Error(A(318));
              if (d = r.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(A(317));
              d[Ei] = r;
            } else Ol(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
            Zn(r), d = !1;
          } else La !== null && (Ou(La), La = null), d = !0;
          if (!d) return r.flags & 65536 ? r : null;
        }
        return r.flags & 128 ? (r.lanes = l, r) : (o = o !== null, o !== (n !== null && n.memoizedState !== null) && o && (r.child.flags |= 8192, r.mode & 1 && (n === null || yn.current & 1 ? bn === 0 && (bn = 3) : Id())), r.updateQueue !== null && (r.flags |= 4), Zn(r), null);
      case 4:
        return Su(), An(n, r), n === null && uo(r.stateNode.containerInfo), Zn(r), null;
      case 10:
        return Sd(r.type._context), Zn(r), null;
      case 17:
        return Mn(r.type) && po(), Zn(r), null;
      case 19:
        if (nn(yn), d = r.memoizedState, d === null) return Zn(r), null;
        if (o = (r.flags & 128) !== 0, m = d.rendering, m === null) if (o) Ds(d, !1);
        else {
          if (bn !== 0 || n !== null && n.flags & 128) for (n = r.child; n !== null; ) {
            if (m = Mc(n), m !== null) {
              for (r.flags |= 128, Ds(d, !1), o = m.updateQueue, o !== null && (r.updateQueue = o, r.flags |= 4), r.subtreeFlags = 0, o = l, l = r.child; l !== null; ) d = l, n = o, d.flags &= 14680066, m = d.alternate, m === null ? (d.childLanes = 0, d.lanes = n, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = m.childLanes, d.lanes = m.lanes, d.child = m.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = m.memoizedProps, d.memoizedState = m.memoizedState, d.updateQueue = m.updateQueue, d.type = m.type, n = m.dependencies, d.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), l = l.sibling;
              return xe(yn, yn.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          d.tail !== null && qe() > Ro && (r.flags |= 128, o = !0, Ds(d, !1), r.lanes = 4194304);
        }
        else {
          if (!o) if (n = Mc(m), n !== null) {
            if (r.flags |= 128, o = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), Ds(d, !0), d.tail === null && d.tailMode === "hidden" && !m.alternate && !fn) return Zn(r), null;
          } else 2 * qe() - d.renderingStartTime > Ro && l !== 1073741824 && (r.flags |= 128, o = !0, Ds(d, !1), r.lanes = 4194304);
          d.isBackwards ? (m.sibling = r.child, r.child = m) : (l = d.last, l !== null ? l.sibling = m : r.child = m, d.last = m);
        }
        return d.tail !== null ? (r = d.tail, d.rendering = r, d.tail = r.sibling, d.renderingStartTime = qe(), r.sibling = null, l = yn.current, xe(yn, o ? l & 1 | 2 : l & 1), r) : (Zn(r), null);
      case 22:
      case 23:
        return Yd(), o = r.memoizedState !== null, n !== null && n.memoizedState !== null !== o && (r.flags |= 8192), o && r.mode & 1 ? ha & 1073741824 && (Zn(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : Zn(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(A(156, r.tag));
  }
  function tf(n, r) {
    switch (_c(r), r.tag) {
      case 1:
        return Mn(r.type) && po(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return Su(), nn(Yn), nn(Sn), De(), n = r.flags, n & 65536 && !(n & 128) ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return Lc(r), null;
      case 13:
        if (nn(yn), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(A(340));
          Ol();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return nn(yn), null;
      case 4:
        return Su(), null;
      case 10:
        return Sd(r.type._context), null;
      case 22:
      case 23:
        return Yd(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var ks = !1, Rr = !1, ly = typeof WeakSet == "function" ? WeakSet : Set, pe = null;
  function So(n, r) {
    var l = n.ref;
    if (l !== null) if (typeof l == "function") try {
      l(null);
    } catch (o) {
      dn(n, r, o);
    }
    else l.current = null;
  }
  function nf(n, r, l) {
    try {
      l();
    } catch (o) {
      dn(n, r, o);
    }
  }
  var Gv = !1;
  function qv(n, r) {
    if (is = ba, n = ts(), dc(n)) {
      if ("selectionStart" in n) var l = { start: n.selectionStart, end: n.selectionEnd };
      else e: {
        l = (l = n.ownerDocument) && l.defaultView || window;
        var o = l.getSelection && l.getSelection();
        if (o && o.rangeCount !== 0) {
          l = o.anchorNode;
          var c = o.anchorOffset, d = o.focusNode;
          o = o.focusOffset;
          try {
            l.nodeType, d.nodeType;
          } catch {
            l = null;
            break e;
          }
          var m = 0, E = -1, T = -1, z = 0, I = 0, W = n, Y = null;
          t: for (; ; ) {
            for (var se; W !== l || c !== 0 && W.nodeType !== 3 || (E = m + c), W !== d || o !== 0 && W.nodeType !== 3 || (T = m + o), W.nodeType === 3 && (m += W.nodeValue.length), (se = W.firstChild) !== null; )
              Y = W, W = se;
            for (; ; ) {
              if (W === n) break t;
              if (Y === l && ++z === c && (E = m), Y === d && ++I === o && (T = m), (se = W.nextSibling) !== null) break;
              W = Y, Y = W.parentNode;
            }
            W = se;
          }
          l = E === -1 || T === -1 ? null : { start: E, end: T };
        } else l = null;
      }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (du = { focusedElem: n, selectionRange: l }, ba = !1, pe = r; pe !== null; ) if (r = pe, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, pe = n;
    else for (; pe !== null; ) {
      r = pe;
      try {
        var me = r.alternate;
        if (r.flags & 1024) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (me !== null) {
              var Se = me.memoizedProps, _n = me.memoizedState, D = r.stateNode, x = D.getSnapshotBeforeUpdate(r.elementType === r.type ? Se : ri(r.type, Se), _n);
              D.__reactInternalSnapshotBeforeUpdate = x;
            }
            break;
          case 3:
            var L = r.stateNode.containerInfo;
            L.nodeType === 1 ? L.textContent = "" : L.nodeType === 9 && L.documentElement && L.removeChild(L.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(A(163));
        }
      } catch (Q) {
        dn(r, r.return, Q);
      }
      if (n = r.sibling, n !== null) {
        n.return = r.return, pe = n;
        break;
      }
      pe = r.return;
    }
    return me = Gv, Gv = !1, me;
  }
  function Os(n, r, l) {
    var o = r.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var c = o = o.next;
      do {
        if ((c.tag & n) === n) {
          var d = c.destroy;
          c.destroy = void 0, d !== void 0 && nf(r, l, d);
        }
        c = c.next;
      } while (c !== o);
    }
  }
  function Ls(n, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & n) === n) {
          var o = l.create;
          l.destroy = o();
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function Fd(n) {
    var r = n.ref;
    if (r !== null) {
      var l = n.stateNode;
      switch (n.tag) {
        case 5:
          n = l;
          break;
        default:
          n = l;
      }
      typeof r == "function" ? r(n) : r.current = n;
    }
  }
  function rf(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, rf(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[Ei], delete r[ls], delete r[us], delete r[fo], delete r[ay])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function Ms(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function Ki(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || Ms(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function _i(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.nodeType === 8 ? l.parentNode.insertBefore(n, r) : l.insertBefore(n, r) : (l.nodeType === 8 ? (r = l.parentNode, r.insertBefore(n, l)) : (r = l, r.appendChild(n)), l = l._reactRootContainer, l != null || r.onclick !== null || (r.onclick = wl));
    else if (o !== 4 && (n = n.child, n !== null)) for (_i(n, r, l), n = n.sibling; n !== null; ) _i(n, r, l), n = n.sibling;
  }
  function Di(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.insertBefore(n, r) : l.appendChild(n);
    else if (o !== 4 && (n = n.child, n !== null)) for (Di(n, r, l), n = n.sibling; n !== null; ) Di(n, r, l), n = n.sibling;
  }
  var xn = null, Lr = !1;
  function Mr(n, r, l) {
    for (l = l.child; l !== null; ) Xv(n, r, l), l = l.sibling;
  }
  function Xv(n, r, l) {
    if (Yr && typeof Yr.onCommitFiberUnmount == "function") try {
      Yr.onCommitFiberUnmount(hl, l);
    } catch {
    }
    switch (l.tag) {
      case 5:
        Rr || So(l, r);
      case 6:
        var o = xn, c = Lr;
        xn = null, Mr(n, r, l), xn = o, Lr = c, xn !== null && (Lr ? (n = xn, l = l.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(l) : n.removeChild(l)) : xn.removeChild(l.stateNode));
        break;
      case 18:
        xn !== null && (Lr ? (n = xn, l = l.stateNode, n.nodeType === 8 ? co(n.parentNode, l) : n.nodeType === 1 && co(n, l), Za(n)) : co(xn, l.stateNode));
        break;
      case 4:
        o = xn, c = Lr, xn = l.stateNode.containerInfo, Lr = !0, Mr(n, r, l), xn = o, Lr = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Rr && (o = l.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          c = o = o.next;
          do {
            var d = c, m = d.destroy;
            d = d.tag, m !== void 0 && (d & 2 || d & 4) && nf(l, r, m), c = c.next;
          } while (c !== o);
        }
        Mr(n, r, l);
        break;
      case 1:
        if (!Rr && (So(l, r), o = l.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = l.memoizedProps, o.state = l.memoizedState, o.componentWillUnmount();
        } catch (E) {
          dn(l, r, E);
        }
        Mr(n, r, l);
        break;
      case 21:
        Mr(n, r, l);
        break;
      case 22:
        l.mode & 1 ? (Rr = (o = Rr) || l.memoizedState !== null, Mr(n, r, l), Rr = o) : Mr(n, r, l);
        break;
      default:
        Mr(n, r, l);
    }
  }
  function Kv(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var l = n.stateNode;
      l === null && (l = n.stateNode = new ly()), r.forEach(function(o) {
        var c = lh.bind(null, n, o);
        l.has(o) || (l.add(o), o.then(c, c));
      });
    }
  }
  function ai(n, r) {
    var l = r.deletions;
    if (l !== null) for (var o = 0; o < l.length; o++) {
      var c = l[o];
      try {
        var d = n, m = r, E = m;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 5:
              xn = E.stateNode, Lr = !1;
              break e;
            case 3:
              xn = E.stateNode.containerInfo, Lr = !0;
              break e;
            case 4:
              xn = E.stateNode.containerInfo, Lr = !0;
              break e;
          }
          E = E.return;
        }
        if (xn === null) throw Error(A(160));
        Xv(d, m, c), xn = null, Lr = !1;
        var T = c.alternate;
        T !== null && (T.return = null), c.return = null;
      } catch (z) {
        dn(c, r, z);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) jd(r, n), r = r.sibling;
  }
  function jd(n, r) {
    var l = n.alternate, o = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (ai(r, n), Jr(n), o & 4) {
          try {
            Os(3, n, n.return), Ls(3, n);
          } catch (Se) {
            dn(n, n.return, Se);
          }
          try {
            Os(5, n, n.return);
          } catch (Se) {
            dn(n, n.return, Se);
          }
        }
        break;
      case 1:
        ai(r, n), Jr(n), o & 512 && l !== null && So(l, l.return);
        break;
      case 5:
        if (ai(r, n), Jr(n), o & 512 && l !== null && So(l, l.return), n.flags & 32) {
          var c = n.stateNode;
          try {
            J(c, "");
          } catch (Se) {
            dn(n, n.return, Se);
          }
        }
        if (o & 4 && (c = n.stateNode, c != null)) {
          var d = n.memoizedProps, m = l !== null ? l.memoizedProps : d, E = n.type, T = n.updateQueue;
          if (n.updateQueue = null, T !== null) try {
            E === "input" && d.type === "radio" && d.name != null && Pn(c, d), qn(E, m);
            var z = qn(E, d);
            for (m = 0; m < T.length; m += 2) {
              var I = T[m], W = T[m + 1];
              I === "style" ? Zt(c, W) : I === "dangerouslySetInnerHTML" ? ci(c, W) : I === "children" ? J(c, W) : Qe(c, I, W, z);
            }
            switch (E) {
              case "input":
                $r(c, d);
                break;
              case "textarea":
                Ya(c, d);
                break;
              case "select":
                var Y = c._wrapperState.wasMultiple;
                c._wrapperState.wasMultiple = !!d.multiple;
                var se = d.value;
                se != null ? Cn(c, !!d.multiple, se, !1) : Y !== !!d.multiple && (d.defaultValue != null ? Cn(
                  c,
                  !!d.multiple,
                  d.defaultValue,
                  !0
                ) : Cn(c, !!d.multiple, d.multiple ? [] : "", !1));
            }
            c[ls] = d;
          } catch (Se) {
            dn(n, n.return, Se);
          }
        }
        break;
      case 6:
        if (ai(r, n), Jr(n), o & 4) {
          if (n.stateNode === null) throw Error(A(162));
          c = n.stateNode, d = n.memoizedProps;
          try {
            c.nodeValue = d;
          } catch (Se) {
            dn(n, n.return, Se);
          }
        }
        break;
      case 3:
        if (ai(r, n), Jr(n), o & 4 && l !== null && l.memoizedState.isDehydrated) try {
          Za(r.containerInfo);
        } catch (Se) {
          dn(n, n.return, Se);
        }
        break;
      case 4:
        ai(r, n), Jr(n);
        break;
      case 13:
        ai(r, n), Jr(n), c = n.child, c.flags & 8192 && (d = c.memoizedState !== null, c.stateNode.isHidden = d, !d || c.alternate !== null && c.alternate.memoizedState !== null || (Pd = qe())), o & 4 && Kv(n);
        break;
      case 22:
        if (I = l !== null && l.memoizedState !== null, n.mode & 1 ? (Rr = (z = Rr) || I, ai(r, n), Rr = z) : ai(r, n), Jr(n), o & 8192) {
          if (z = n.memoizedState !== null, (n.stateNode.isHidden = z) && !I && n.mode & 1) for (pe = n, I = n.child; I !== null; ) {
            for (W = pe = I; pe !== null; ) {
              switch (Y = pe, se = Y.child, Y.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Os(4, Y, Y.return);
                  break;
                case 1:
                  So(Y, Y.return);
                  var me = Y.stateNode;
                  if (typeof me.componentWillUnmount == "function") {
                    o = Y, l = Y.return;
                    try {
                      r = o, me.props = r.memoizedProps, me.state = r.memoizedState, me.componentWillUnmount();
                    } catch (Se) {
                      dn(o, l, Se);
                    }
                  }
                  break;
                case 5:
                  So(Y, Y.return);
                  break;
                case 22:
                  if (Y.memoizedState !== null) {
                    Ns(W);
                    continue;
                  }
              }
              se !== null ? (se.return = Y, pe = se) : Ns(W);
            }
            I = I.sibling;
          }
          e: for (I = null, W = n; ; ) {
            if (W.tag === 5) {
              if (I === null) {
                I = W;
                try {
                  c = W.stateNode, z ? (d = c.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none") : (E = W.stateNode, T = W.memoizedProps.style, m = T != null && T.hasOwnProperty("display") ? T.display : null, E.style.display = At("display", m));
                } catch (Se) {
                  dn(n, n.return, Se);
                }
              }
            } else if (W.tag === 6) {
              if (I === null) try {
                W.stateNode.nodeValue = z ? "" : W.memoizedProps;
              } catch (Se) {
                dn(n, n.return, Se);
              }
            } else if ((W.tag !== 22 && W.tag !== 23 || W.memoizedState === null || W === n) && W.child !== null) {
              W.child.return = W, W = W.child;
              continue;
            }
            if (W === n) break e;
            for (; W.sibling === null; ) {
              if (W.return === null || W.return === n) break e;
              I === W && (I = null), W = W.return;
            }
            I === W && (I = null), W.sibling.return = W.return, W = W.sibling;
          }
        }
        break;
      case 19:
        ai(r, n), Jr(n), o & 4 && Kv(n);
        break;
      case 21:
        break;
      default:
        ai(
          r,
          n
        ), Jr(n);
    }
  }
  function Jr(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var l = n.return; l !== null; ) {
            if (Ms(l)) {
              var o = l;
              break e;
            }
            l = l.return;
          }
          throw Error(A(160));
        }
        switch (o.tag) {
          case 5:
            var c = o.stateNode;
            o.flags & 32 && (J(c, ""), o.flags &= -33);
            var d = Ki(n);
            Di(n, d, c);
            break;
          case 3:
          case 4:
            var m = o.stateNode.containerInfo, E = Ki(n);
            _i(n, E, m);
            break;
          default:
            throw Error(A(161));
        }
      } catch (T) {
        dn(n, n.return, T);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function uy(n, r, l) {
    pe = n, Hd(n);
  }
  function Hd(n, r, l) {
    for (var o = (n.mode & 1) !== 0; pe !== null; ) {
      var c = pe, d = c.child;
      if (c.tag === 22 && o) {
        var m = c.memoizedState !== null || ks;
        if (!m) {
          var E = c.alternate, T = E !== null && E.memoizedState !== null || Rr;
          E = ks;
          var z = Rr;
          if (ks = m, (Rr = T) && !z) for (pe = c; pe !== null; ) m = pe, T = m.child, m.tag === 22 && m.memoizedState !== null ? Vd(c) : T !== null ? (T.return = m, pe = T) : Vd(c);
          for (; d !== null; ) pe = d, Hd(d), d = d.sibling;
          pe = c, ks = E, Rr = z;
        }
        Zv(n);
      } else c.subtreeFlags & 8772 && d !== null ? (d.return = c, pe = d) : Zv(n);
    }
  }
  function Zv(n) {
    for (; pe !== null; ) {
      var r = pe;
      if (r.flags & 8772) {
        var l = r.alternate;
        try {
          if (r.flags & 8772) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              Rr || Ls(5, r);
              break;
            case 1:
              var o = r.stateNode;
              if (r.flags & 4 && !Rr) if (l === null) o.componentDidMount();
              else {
                var c = r.elementType === r.type ? l.memoizedProps : ri(r.type, l.memoizedProps);
                o.componentDidUpdate(c, l.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var d = r.updateQueue;
              d !== null && wd(r, d, o);
              break;
            case 3:
              var m = r.updateQueue;
              if (m !== null) {
                if (l = null, r.child !== null) switch (r.child.tag) {
                  case 5:
                    l = r.child.stateNode;
                    break;
                  case 1:
                    l = r.child.stateNode;
                }
                wd(r, m, l);
              }
              break;
            case 5:
              var E = r.stateNode;
              if (l === null && r.flags & 4) {
                l = E;
                var T = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    T.autoFocus && l.focus();
                    break;
                  case "img":
                    T.src && (l.src = T.src);
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
              if (r.memoizedState === null) {
                var z = r.alternate;
                if (z !== null) {
                  var I = z.memoizedState;
                  if (I !== null) {
                    var W = I.dehydrated;
                    W !== null && Za(W);
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
              throw Error(A(163));
          }
          Rr || r.flags & 512 && Fd(r);
        } catch (Y) {
          dn(r, r.return, Y);
        }
      }
      if (r === n) {
        pe = null;
        break;
      }
      if (l = r.sibling, l !== null) {
        l.return = r.return, pe = l;
        break;
      }
      pe = r.return;
    }
  }
  function Ns(n) {
    for (; pe !== null; ) {
      var r = pe;
      if (r === n) {
        pe = null;
        break;
      }
      var l = r.sibling;
      if (l !== null) {
        l.return = r.return, pe = l;
        break;
      }
      pe = r.return;
    }
  }
  function Vd(n) {
    for (; pe !== null; ) {
      var r = pe;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var l = r.return;
            try {
              Ls(4, r);
            } catch (T) {
              dn(r, l, T);
            }
            break;
          case 1:
            var o = r.stateNode;
            if (typeof o.componentDidMount == "function") {
              var c = r.return;
              try {
                o.componentDidMount();
              } catch (T) {
                dn(r, c, T);
              }
            }
            var d = r.return;
            try {
              Fd(r);
            } catch (T) {
              dn(r, d, T);
            }
            break;
          case 5:
            var m = r.return;
            try {
              Fd(r);
            } catch (T) {
              dn(r, m, T);
            }
        }
      } catch (T) {
        dn(r, r.return, T);
      }
      if (r === n) {
        pe = null;
        break;
      }
      var E = r.sibling;
      if (E !== null) {
        E.return = r.return, pe = E;
        break;
      }
      pe = r.return;
    }
  }
  var oy = Math.ceil, Ul = vt.ReactCurrentDispatcher, Du = vt.ReactCurrentOwner, ur = vt.ReactCurrentBatchConfig, St = 0, Qn = null, Fn = null, or = 0, ha = 0, Eo = ka(0), bn = 0, zs = null, ki = 0, Co = 0, af = 0, Us = null, ea = null, Pd = 0, Ro = 1 / 0, ma = null, To = !1, ku = null, Al = null, lf = !1, Zi = null, As = 0, Fl = 0, wo = null, Fs = -1, Tr = 0;
  function jn() {
    return St & 6 ? qe() : Fs !== -1 ? Fs : Fs = qe();
  }
  function Oi(n) {
    return n.mode & 1 ? St & 2 && or !== 0 ? or & -or : iy.transition !== null ? (Tr === 0 && (Tr = qu()), Tr) : (n = kt, n !== 0 || (n = window.event, n = n === void 0 ? 16 : no(n.type)), n) : 1;
  }
  function Nr(n, r, l, o) {
    if (50 < Fl) throw Fl = 0, wo = null, Error(A(185));
    Hi(n, l, o), (!(St & 2) || n !== Qn) && (n === Qn && (!(St & 2) && (Co |= l), bn === 4 && ii(n, or)), ta(n, o), l === 1 && St === 0 && !(r.mode & 1) && (Ro = qe() + 500, vo && Ri()));
  }
  function ta(n, r) {
    var l = n.callbackNode;
    ru(n, r);
    var o = Ka(n, n === Qn ? or : 0);
    if (o === 0) l !== null && rr(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = o & -o, n.callbackPriority !== r) {
      if (l != null && rr(l), r === 1) n.tag === 0 ? bl(Bd.bind(null, n)) : xc(Bd.bind(null, n)), so(function() {
        !(St & 6) && Ri();
      }), l = null;
      else {
        switch (Ku(o)) {
          case 1:
            l = qa;
            break;
          case 4:
            l = tu;
            break;
          case 16:
            l = nu;
            break;
          case 536870912:
            l = Qu;
            break;
          default:
            l = nu;
        }
        l = oh(l, uf.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function uf(n, r) {
    if (Fs = -1, Tr = 0, St & 6) throw Error(A(327));
    var l = n.callbackNode;
    if (xo() && n.callbackNode !== l) return null;
    var o = Ka(n, n === Qn ? or : 0);
    if (o === 0) return null;
    if (o & 30 || o & n.expiredLanes || r) r = of(n, o);
    else {
      r = o;
      var c = St;
      St |= 2;
      var d = eh();
      (Qn !== n || or !== r) && (ma = null, Ro = qe() + 500, Ji(n, r));
      do
        try {
          th();
          break;
        } catch (E) {
          Jv(n, E);
        }
      while (!0);
      gd(), Ul.current = d, St = c, Fn !== null ? r = 0 : (Qn = null, or = 0, r = bn);
    }
    if (r !== 0) {
      if (r === 2 && (c = yl(n), c !== 0 && (o = c, r = js(n, c))), r === 1) throw l = zs, Ji(n, 0), ii(n, o), ta(n, qe()), l;
      if (r === 6) ii(n, o);
      else {
        if (c = n.current.alternate, !(o & 30) && !sy(c) && (r = of(n, o), r === 2 && (d = yl(n), d !== 0 && (o = d, r = js(n, d))), r === 1)) throw l = zs, Ji(n, 0), ii(n, o), ta(n, qe()), l;
        switch (n.finishedWork = c, n.finishedLanes = o, r) {
          case 0:
          case 1:
            throw Error(A(345));
          case 2:
            Mu(n, ea, ma);
            break;
          case 3:
            if (ii(n, o), (o & 130023424) === o && (r = Pd + 500 - qe(), 10 < r)) {
              if (Ka(n, 0) !== 0) break;
              if (c = n.suspendedLanes, (c & o) !== o) {
                jn(), n.pingedLanes |= n.suspendedLanes & c;
                break;
              }
              n.timeoutHandle = Rc(Mu.bind(null, n, ea, ma), r);
              break;
            }
            Mu(n, ea, ma);
            break;
          case 4:
            if (ii(n, o), (o & 4194240) === o) break;
            for (r = n.eventTimes, c = -1; 0 < o; ) {
              var m = 31 - _r(o);
              d = 1 << m, m = r[m], m > c && (c = m), o &= ~d;
            }
            if (o = c, o = qe() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * oy(o / 1960)) - o, 10 < o) {
              n.timeoutHandle = Rc(Mu.bind(null, n, ea, ma), o);
              break;
            }
            Mu(n, ea, ma);
            break;
          case 5:
            Mu(n, ea, ma);
            break;
          default:
            throw Error(A(329));
        }
      }
    }
    return ta(n, qe()), n.callbackNode === l ? uf.bind(null, n) : null;
  }
  function js(n, r) {
    var l = Us;
    return n.current.memoizedState.isDehydrated && (Ji(n, r).flags |= 256), n = of(n, r), n !== 2 && (r = ea, ea = l, r !== null && Ou(r)), n;
  }
  function Ou(n) {
    ea === null ? ea = n : ea.push.apply(ea, n);
  }
  function sy(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var l = r.updateQueue;
        if (l !== null && (l = l.stores, l !== null)) for (var o = 0; o < l.length; o++) {
          var c = l[o], d = c.getSnapshot;
          c = c.value;
          try {
            if (!ei(d(), c)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (l = r.child, r.subtreeFlags & 16384 && l !== null) l.return = r, r = l;
      else {
        if (r === n) break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === n) return !0;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
    }
    return !0;
  }
  function ii(n, r) {
    for (r &= ~af, r &= ~Co, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - _r(r), o = 1 << l;
      n[l] = -1, r &= ~o;
    }
  }
  function Bd(n) {
    if (St & 6) throw Error(A(327));
    xo();
    var r = Ka(n, 0);
    if (!(r & 1)) return ta(n, qe()), null;
    var l = of(n, r);
    if (n.tag !== 0 && l === 2) {
      var o = yl(n);
      o !== 0 && (r = o, l = js(n, o));
    }
    if (l === 1) throw l = zs, Ji(n, 0), ii(n, r), ta(n, qe()), l;
    if (l === 6) throw Error(A(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, Mu(n, ea, ma), ta(n, qe()), null;
  }
  function $d(n, r) {
    var l = St;
    St |= 1;
    try {
      return n(r);
    } finally {
      St = l, St === 0 && (Ro = qe() + 500, vo && Ri());
    }
  }
  function Lu(n) {
    Zi !== null && Zi.tag === 0 && !(St & 6) && xo();
    var r = St;
    St |= 1;
    var l = ur.transition, o = kt;
    try {
      if (ur.transition = null, kt = 1, n) return n();
    } finally {
      kt = o, ur.transition = l, St = r, !(St & 6) && Ri();
    }
  }
  function Yd() {
    ha = Eo.current, nn(Eo);
  }
  function Ji(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, pd(l)), Fn !== null) for (l = Fn.return; l !== null; ) {
      var o = l;
      switch (_c(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && po();
          break;
        case 3:
          Su(), nn(Yn), nn(Sn), De();
          break;
        case 5:
          Lc(o);
          break;
        case 4:
          Su();
          break;
        case 13:
          nn(yn);
          break;
        case 19:
          nn(yn);
          break;
        case 10:
          Sd(o.type._context);
          break;
        case 22:
        case 23:
          Yd();
      }
      l = l.return;
    }
    if (Qn = n, Fn = n = jl(n.current, null), or = ha = r, bn = 0, zs = null, af = Co = ki = 0, ea = Us = null, yu !== null) {
      for (r = 0; r < yu.length; r++) if (l = yu[r], o = l.interleaved, o !== null) {
        l.interleaved = null;
        var c = o.next, d = l.pending;
        if (d !== null) {
          var m = d.next;
          d.next = c, o.next = m;
        }
        l.pending = o;
      }
      yu = null;
    }
    return n;
  }
  function Jv(n, r) {
    do {
      var l = Fn;
      try {
        if (gd(), ut.current = xu, Nc) {
          for (var o = Lt.memoizedState; o !== null; ) {
            var c = o.queue;
            c !== null && (c.pending = null), o = o.next;
          }
          Nc = !1;
        }
        if (Wt = 0, Kn = zn = Lt = null, hs = !1, Eu = 0, Du.current = null, l === null || l.return === null) {
          bn = 1, zs = r, Fn = null;
          break;
        }
        e: {
          var d = n, m = l.return, E = l, T = r;
          if (r = or, E.flags |= 32768, T !== null && typeof T == "object" && typeof T.then == "function") {
            var z = T, I = E, W = I.tag;
            if (!(I.mode & 1) && (W === 0 || W === 11 || W === 15)) {
              var Y = I.alternate;
              Y ? (I.updateQueue = Y.updateQueue, I.memoizedState = Y.memoizedState, I.lanes = Y.lanes) : (I.updateQueue = null, I.memoizedState = null);
            }
            var se = Vv(m);
            if (se !== null) {
              se.flags &= -257, zl(se, m, E, d, r), se.mode & 1 && Md(d, z, r), r = se, T = z;
              var me = r.updateQueue;
              if (me === null) {
                var Se = /* @__PURE__ */ new Set();
                Se.add(T), r.updateQueue = Se;
              } else me.add(T);
              break e;
            } else {
              if (!(r & 1)) {
                Md(d, z, r), Id();
                break e;
              }
              T = Error(A(426));
            }
          } else if (fn && E.mode & 1) {
            var _n = Vv(m);
            if (_n !== null) {
              !(_n.flags & 65536) && (_n.flags |= 256), zl(_n, m, E, d, r), Gi(bu(T, E));
              break e;
            }
          }
          d = T = bu(T, E), bn !== 4 && (bn = 2), Us === null ? Us = [d] : Us.push(d), d = m;
          do {
            switch (d.tag) {
              case 3:
                d.flags |= 65536, r &= -r, d.lanes |= r;
                var D = Hv(d, T, r);
                zv(d, D);
                break e;
              case 1:
                E = T;
                var x = d.type, L = d.stateNode;
                if (!(d.flags & 128) && (typeof x.getDerivedStateFromError == "function" || L !== null && typeof L.componentDidCatch == "function" && (Al === null || !Al.has(L)))) {
                  d.flags |= 65536, r &= -r, d.lanes |= r;
                  var Q = Ld(d, E, r);
                  zv(d, Q);
                  break e;
                }
            }
            d = d.return;
          } while (d !== null);
        }
        rh(l);
      } catch (ye) {
        r = ye, Fn === l && l !== null && (Fn = l = l.return);
        continue;
      }
      break;
    } while (!0);
  }
  function eh() {
    var n = Ul.current;
    return Ul.current = xu, n === null ? xu : n;
  }
  function Id() {
    (bn === 0 || bn === 3 || bn === 2) && (bn = 4), Qn === null || !(ki & 268435455) && !(Co & 268435455) || ii(Qn, or);
  }
  function of(n, r) {
    var l = St;
    St |= 2;
    var o = eh();
    (Qn !== n || or !== r) && (ma = null, Ji(n, r));
    do
      try {
        cy();
        break;
      } catch (c) {
        Jv(n, c);
      }
    while (!0);
    if (gd(), St = l, Ul.current = o, Fn !== null) throw Error(A(261));
    return Qn = null, or = 0, bn;
  }
  function cy() {
    for (; Fn !== null; ) nh(Fn);
  }
  function th() {
    for (; Fn !== null && !Wa(); ) nh(Fn);
  }
  function nh(n) {
    var r = uh(n.alternate, n, ha);
    n.memoizedProps = n.pendingProps, r === null ? rh(n) : Fn = r, Du.current = null;
  }
  function rh(n) {
    var r = n;
    do {
      var l = r.alternate;
      if (n = r.return, r.flags & 32768) {
        if (l = tf(l, r), l !== null) {
          l.flags &= 32767, Fn = l;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          bn = 6, Fn = null;
          return;
        }
      } else if (l = Wv(l, r, ha), l !== null) {
        Fn = l;
        return;
      }
      if (r = r.sibling, r !== null) {
        Fn = r;
        return;
      }
      Fn = r = n;
    } while (r !== null);
    bn === 0 && (bn = 5);
  }
  function Mu(n, r, l) {
    var o = kt, c = ur.transition;
    try {
      ur.transition = null, kt = 1, fy(n, r, l, o);
    } finally {
      ur.transition = c, kt = o;
    }
    return null;
  }
  function fy(n, r, l, o) {
    do
      xo();
    while (Zi !== null);
    if (St & 6) throw Error(A(327));
    l = n.finishedWork;
    var c = n.finishedLanes;
    if (l === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, l === n.current) throw Error(A(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var d = l.lanes | l.childLanes;
    if (Qf(n, d), n === Qn && (Fn = Qn = null, or = 0), !(l.subtreeFlags & 2064) && !(l.flags & 2064) || lf || (lf = !0, oh(nu, function() {
      return xo(), null;
    })), d = (l.flags & 15990) !== 0, l.subtreeFlags & 15990 || d) {
      d = ur.transition, ur.transition = null;
      var m = kt;
      kt = 1;
      var E = St;
      St |= 4, Du.current = null, qv(n, l), jd(l, n), io(du), ba = !!is, du = is = null, n.current = l, uy(l), Ga(), St = E, kt = m, ur.transition = d;
    } else n.current = l;
    if (lf && (lf = !1, Zi = n, As = c), d = n.pendingLanes, d === 0 && (Al = null), Io(l.stateNode), ta(n, qe()), r !== null) for (o = n.onRecoverableError, l = 0; l < r.length; l++) c = r[l], o(c.value, { componentStack: c.stack, digest: c.digest });
    if (To) throw To = !1, n = ku, ku = null, n;
    return As & 1 && n.tag !== 0 && xo(), d = n.pendingLanes, d & 1 ? n === wo ? Fl++ : (Fl = 0, wo = n) : Fl = 0, Ri(), null;
  }
  function xo() {
    if (Zi !== null) {
      var n = Ku(As), r = ur.transition, l = kt;
      try {
        if (ur.transition = null, kt = 16 > n ? 16 : n, Zi === null) var o = !1;
        else {
          if (n = Zi, Zi = null, As = 0, St & 6) throw Error(A(331));
          var c = St;
          for (St |= 4, pe = n.current; pe !== null; ) {
            var d = pe, m = d.child;
            if (pe.flags & 16) {
              var E = d.deletions;
              if (E !== null) {
                for (var T = 0; T < E.length; T++) {
                  var z = E[T];
                  for (pe = z; pe !== null; ) {
                    var I = pe;
                    switch (I.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Os(8, I, d);
                    }
                    var W = I.child;
                    if (W !== null) W.return = I, pe = W;
                    else for (; pe !== null; ) {
                      I = pe;
                      var Y = I.sibling, se = I.return;
                      if (rf(I), I === z) {
                        pe = null;
                        break;
                      }
                      if (Y !== null) {
                        Y.return = se, pe = Y;
                        break;
                      }
                      pe = se;
                    }
                  }
                }
                var me = d.alternate;
                if (me !== null) {
                  var Se = me.child;
                  if (Se !== null) {
                    me.child = null;
                    do {
                      var _n = Se.sibling;
                      Se.sibling = null, Se = _n;
                    } while (Se !== null);
                  }
                }
                pe = d;
              }
            }
            if (d.subtreeFlags & 2064 && m !== null) m.return = d, pe = m;
            else e: for (; pe !== null; ) {
              if (d = pe, d.flags & 2048) switch (d.tag) {
                case 0:
                case 11:
                case 15:
                  Os(9, d, d.return);
              }
              var D = d.sibling;
              if (D !== null) {
                D.return = d.return, pe = D;
                break e;
              }
              pe = d.return;
            }
          }
          var x = n.current;
          for (pe = x; pe !== null; ) {
            m = pe;
            var L = m.child;
            if (m.subtreeFlags & 2064 && L !== null) L.return = m, pe = L;
            else e: for (m = x; pe !== null; ) {
              if (E = pe, E.flags & 2048) try {
                switch (E.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ls(9, E);
                }
              } catch (ye) {
                dn(E, E.return, ye);
              }
              if (E === m) {
                pe = null;
                break e;
              }
              var Q = E.sibling;
              if (Q !== null) {
                Q.return = E.return, pe = Q;
                break e;
              }
              pe = E.return;
            }
          }
          if (St = c, Ri(), Yr && typeof Yr.onPostCommitFiberRoot == "function") try {
            Yr.onPostCommitFiberRoot(hl, n);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        kt = l, ur.transition = r;
      }
    }
    return !1;
  }
  function ah(n, r, l) {
    r = bu(l, r), r = Hv(n, r, 1), n = Ll(n, r, 1), r = jn(), n !== null && (Hi(n, 1, r), ta(n, r));
  }
  function dn(n, r, l) {
    if (n.tag === 3) ah(n, n, l);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        ah(r, n, l);
        break;
      } else if (r.tag === 1) {
        var o = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Al === null || !Al.has(o))) {
          n = bu(l, n), n = Ld(r, n, 1), r = Ll(r, n, 1), n = jn(), r !== null && (Hi(r, 1, n), ta(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function dy(n, r, l) {
    var o = n.pingCache;
    o !== null && o.delete(r), r = jn(), n.pingedLanes |= n.suspendedLanes & l, Qn === n && (or & l) === l && (bn === 4 || bn === 3 && (or & 130023424) === or && 500 > qe() - Pd ? Ji(n, 0) : af |= l), ta(n, r);
  }
  function ih(n, r) {
    r === 0 && (n.mode & 1 ? (r = ca, ca <<= 1, !(ca & 130023424) && (ca = 4194304)) : r = 1);
    var l = jn();
    n = pa(n, r), n !== null && (Hi(n, r, l), ta(n, l));
  }
  function py(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), ih(n, l);
  }
  function lh(n, r) {
    var l = 0;
    switch (n.tag) {
      case 13:
        var o = n.stateNode, c = n.memoizedState;
        c !== null && (l = c.retryLane);
        break;
      case 19:
        o = n.stateNode;
        break;
      default:
        throw Error(A(314));
    }
    o !== null && o.delete(r), ih(n, l);
  }
  var uh;
  uh = function(n, r, l) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || Yn.current) Un = !0;
    else {
      if (!(n.lanes & l) && !(r.flags & 128)) return Un = !1, _s(n, r, l);
      Un = !!(n.flags & 131072);
    }
    else Un = !1, fn && r.flags & 1048576 && Ov(r, Wi, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var o = r.type;
        Na(n, r), n = r.pendingProps;
        var c = Wr(r, Sn.current);
        mn(r, l), c = Ml(null, r, o, n, c, l);
        var d = ni();
        return r.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, Mn(o) ? (d = !0, Xn(r)) : d = !1, r.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, Td(r), c.updater = Xc, r.stateNode = c, c._reactInternals = r, Rs(r, o, n, l), r = xs(null, r, o, !0, d, l)) : (r.tag = 0, fn && d && bc(r), lr(null, r, c, l), r = r.child), r;
      case 16:
        o = r.elementType;
        e: {
          switch (Na(n, r), n = r.pendingProps, c = o._init, o = c(o._payload), r.type = o, c = r.tag = hy(o), n = ri(o, n), c) {
            case 0:
              r = Pv(null, r, o, n, l);
              break e;
            case 1:
              r = Bv(null, r, o, n, l);
              break e;
            case 11:
              r = Zr(null, r, o, n, l);
              break e;
            case 14:
              r = _u(null, r, o, ri(o.type, n), l);
              break e;
          }
          throw Error(A(
            306,
            o,
            ""
          ));
        }
        return r;
      case 0:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ri(o, c), Pv(n, r, o, c, l);
      case 1:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ri(o, c), Bv(n, r, o, c, l);
      case 3:
        e: {
          if (go(r), n === null) throw Error(A(387));
          o = r.pendingProps, d = r.memoizedState, c = d.element, Nv(n, r), cs(r, o, null, l);
          var m = r.memoizedState;
          if (o = m.element, d.isDehydrated) if (d = { element: o, isDehydrated: !1, cache: m.cache, pendingSuspenseBoundaries: m.pendingSuspenseBoundaries, transitions: m.transitions }, r.updateQueue.baseState = d, r.memoizedState = d, r.flags & 256) {
            c = bu(Error(A(423)), r), r = $v(n, r, o, l, c);
            break e;
          } else if (o !== c) {
            c = bu(Error(A(424)), r), r = $v(n, r, o, l, c);
            break e;
          } else for (qr = Si(r.stateNode.containerInfo.firstChild), Gr = r, fn = !0, La = null, l = ie(r, null, o, l), r.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Ol(), o === c) {
              r = za(n, r, l);
              break e;
            }
            lr(n, r, o, l);
          }
          r = r.child;
        }
        return r;
      case 5:
        return Uv(r), n === null && md(r), o = r.type, c = r.pendingProps, d = n !== null ? n.memoizedProps : null, m = c.children, Cc(o, c) ? m = null : d !== null && Cc(o, d) && (r.flags |= 32), Nd(n, r), lr(n, r, m, l), r.child;
      case 6:
        return n === null && md(r), null;
      case 13:
        return ef(n, r, l);
      case 4:
        return xd(r, r.stateNode.containerInfo), o = r.pendingProps, n === null ? r.child = Tn(r, null, o, l) : lr(n, r, o, l), r.child;
      case 11:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ri(o, c), Zr(n, r, o, c, l);
      case 7:
        return lr(n, r, r.pendingProps, l), r.child;
      case 8:
        return lr(n, r, r.pendingProps.children, l), r.child;
      case 12:
        return lr(n, r, r.pendingProps.children, l), r.child;
      case 10:
        e: {
          if (o = r.type._context, c = r.pendingProps, d = r.memoizedProps, m = c.value, xe(da, o._currentValue), o._currentValue = m, d !== null) if (ei(d.value, m)) {
            if (d.children === c.children && !Yn.current) {
              r = za(n, r, l);
              break e;
            }
          } else for (d = r.child, d !== null && (d.return = r); d !== null; ) {
            var E = d.dependencies;
            if (E !== null) {
              m = d.child;
              for (var T = E.firstContext; T !== null; ) {
                if (T.context === o) {
                  if (d.tag === 1) {
                    T = qi(-1, l & -l), T.tag = 2;
                    var z = d.updateQueue;
                    if (z !== null) {
                      z = z.shared;
                      var I = z.pending;
                      I === null ? T.next = T : (T.next = I.next, I.next = T), z.pending = T;
                    }
                  }
                  d.lanes |= l, T = d.alternate, T !== null && (T.lanes |= l), Ed(
                    d.return,
                    l,
                    r
                  ), E.lanes |= l;
                  break;
                }
                T = T.next;
              }
            } else if (d.tag === 10) m = d.type === r.type ? null : d.child;
            else if (d.tag === 18) {
              if (m = d.return, m === null) throw Error(A(341));
              m.lanes |= l, E = m.alternate, E !== null && (E.lanes |= l), Ed(m, l, r), m = d.sibling;
            } else m = d.child;
            if (m !== null) m.return = d;
            else for (m = d; m !== null; ) {
              if (m === r) {
                m = null;
                break;
              }
              if (d = m.sibling, d !== null) {
                d.return = m.return, m = d;
                break;
              }
              m = m.return;
            }
            d = m;
          }
          lr(n, r, c.children, l), r = r.child;
        }
        return r;
      case 9:
        return c = r.type, o = r.pendingProps.children, mn(r, l), c = Ma(c), o = o(c), r.flags |= 1, lr(n, r, o, l), r.child;
      case 14:
        return o = r.type, c = ri(o, r.pendingProps), c = ri(o.type, c), _u(n, r, o, c, l);
      case 15:
        return Xe(n, r, r.type, r.pendingProps, l);
      case 17:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ri(o, c), Na(n, r), r.tag = 1, Mn(o) ? (n = !0, Xn(r)) : n = !1, mn(r, l), Kc(r, o, c), Rs(r, o, c, l), xs(null, r, o, !0, n, l);
      case 19:
        return bi(n, r, l);
      case 22:
        return ws(n, r, l);
    }
    throw Error(A(156, r.tag));
  };
  function oh(n, r) {
    return un(n, r);
  }
  function vy(n, r, l, o) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Aa(n, r, l, o) {
    return new vy(n, r, l, o);
  }
  function Qd(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function hy(n) {
    if (typeof n == "function") return Qd(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === xt) return 11;
      if (n === bt) return 14;
    }
    return 2;
  }
  function jl(n, r) {
    var l = n.alternate;
    return l === null ? (l = Aa(n.tag, r, n.key, n.mode), l.elementType = n.elementType, l.type = n.type, l.stateNode = n.stateNode, l.alternate = n, n.alternate = l) : (l.pendingProps = r, l.type = n.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = n.flags & 14680064, l.childLanes = n.childLanes, l.lanes = n.lanes, l.child = n.child, l.memoizedProps = n.memoizedProps, l.memoizedState = n.memoizedState, l.updateQueue = n.updateQueue, r = n.dependencies, l.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, l.sibling = n.sibling, l.index = n.index, l.ref = n.ref, l;
  }
  function Hs(n, r, l, o, c, d) {
    var m = 2;
    if (o = n, typeof n == "function") Qd(n) && (m = 1);
    else if (typeof n == "string") m = 5;
    else e: switch (n) {
      case Fe:
        return el(l.children, c, d, r);
      case rn:
        m = 8, c |= 8;
        break;
      case Ft:
        return n = Aa(12, l, r, c | 2), n.elementType = Ft, n.lanes = d, n;
      case ke:
        return n = Aa(13, l, r, c), n.elementType = ke, n.lanes = d, n;
      case Ut:
        return n = Aa(19, l, r, c), n.elementType = Ut, n.lanes = d, n;
      case Ee:
        return Hl(l, c, d, r);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case Kt:
            m = 10;
            break e;
          case an:
            m = 9;
            break e;
          case xt:
            m = 11;
            break e;
          case bt:
            m = 14;
            break e;
          case Dt:
            m = 16, o = null;
            break e;
        }
        throw Error(A(130, n == null ? n : typeof n, ""));
    }
    return r = Aa(m, l, r, c), r.elementType = n, r.type = o, r.lanes = d, r;
  }
  function el(n, r, l, o) {
    return n = Aa(7, n, o, r), n.lanes = l, n;
  }
  function Hl(n, r, l, o) {
    return n = Aa(22, n, o, r), n.elementType = Ee, n.lanes = l, n.stateNode = { isHidden: !1 }, n;
  }
  function Wd(n, r, l) {
    return n = Aa(6, n, null, r), n.lanes = l, n;
  }
  function sf(n, r, l) {
    return r = Aa(4, n.children !== null ? n.children : [], n.key, r), r.lanes = l, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function sh(n, r, l, o, c) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Xu(0), this.expirationTimes = Xu(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Xu(0), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function cf(n, r, l, o, c, d, m, E, T) {
    return n = new sh(n, r, l, E, T), r === 1 ? (r = 1, d === !0 && (r |= 8)) : r = 0, d = Aa(3, null, null, r), n.current = d, d.stateNode = n, d.memoizedState = { element: o, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Td(d), n;
  }
  function my(n, r, l) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: st, key: o == null ? null : "" + o, children: n, containerInfo: r, implementation: l };
  }
  function Gd(n) {
    if (!n) return Er;
    n = n._reactInternals;
    e: {
      if (Ge(n) !== n || n.tag !== 1) throw Error(A(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (Mn(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(A(171));
    }
    if (n.tag === 1) {
      var l = n.type;
      if (Mn(l)) return os(n, l, r);
    }
    return r;
  }
  function ch(n, r, l, o, c, d, m, E, T) {
    return n = cf(l, o, !0, n, c, d, m, E, T), n.context = Gd(null), l = n.current, o = jn(), c = Oi(l), d = qi(o, c), d.callback = r ?? null, Ll(l, d, c), n.current.lanes = c, Hi(n, c, o), ta(n, o), n;
  }
  function ff(n, r, l, o) {
    var c = r.current, d = jn(), m = Oi(c);
    return l = Gd(l), r.context === null ? r.context = l : r.pendingContext = l, r = qi(d, m), r.payload = { element: n }, o = o === void 0 ? null : o, o !== null && (r.callback = o), n = Ll(c, r, m), n !== null && (Nr(n, c, m, d), Oc(n, c, m)), m;
  }
  function df(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function qd(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function pf(n, r) {
    qd(n, r), (n = n.alternate) && qd(n, r);
  }
  function fh() {
    return null;
  }
  var Nu = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function Xd(n) {
    this._internalRoot = n;
  }
  vf.prototype.render = Xd.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(A(409));
    ff(n, r, null, null);
  }, vf.prototype.unmount = Xd.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      Lu(function() {
        ff(null, n, null, null);
      }), r[Ii] = null;
    }
  };
  function vf(n) {
    this._internalRoot = n;
  }
  vf.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = Pe();
      n = { blockedOn: null, target: n, priority: r };
      for (var l = 0; l < $n.length && r !== 0 && r < $n[l].priority; l++) ;
      $n.splice(l, 0, n), l === 0 && Go(n);
    }
  };
  function Kd(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function hf(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function dh() {
  }
  function yy(n, r, l, o, c) {
    if (c) {
      if (typeof o == "function") {
        var d = o;
        o = function() {
          var z = df(m);
          d.call(z);
        };
      }
      var m = ch(r, o, n, 0, null, !1, !1, "", dh);
      return n._reactRootContainer = m, n[Ii] = m.current, uo(n.nodeType === 8 ? n.parentNode : n), Lu(), m;
    }
    for (; c = n.lastChild; ) n.removeChild(c);
    if (typeof o == "function") {
      var E = o;
      o = function() {
        var z = df(T);
        E.call(z);
      };
    }
    var T = cf(n, 0, !1, null, null, !1, !1, "", dh);
    return n._reactRootContainer = T, n[Ii] = T.current, uo(n.nodeType === 8 ? n.parentNode : n), Lu(function() {
      ff(r, T, l, o);
    }), T;
  }
  function Vs(n, r, l, o, c) {
    var d = l._reactRootContainer;
    if (d) {
      var m = d;
      if (typeof c == "function") {
        var E = c;
        c = function() {
          var T = df(m);
          E.call(T);
        };
      }
      ff(r, m, n, c);
    } else m = yy(l, r, n, c, o);
    return df(m);
  }
  Tt = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = Xa(r.pendingLanes);
          l !== 0 && (Vi(r, l | 1), ta(r, qe()), !(St & 6) && (Ro = qe() + 500, Ri()));
        }
        break;
      case 13:
        Lu(function() {
          var o = pa(n, 1);
          if (o !== null) {
            var c = jn();
            Nr(o, n, 1, c);
          }
        }), pf(n, 1);
    }
  }, Qo = function(n) {
    if (n.tag === 13) {
      var r = pa(n, 134217728);
      if (r !== null) {
        var l = jn();
        Nr(r, n, 134217728, l);
      }
      pf(n, 134217728);
    }
  }, vi = function(n) {
    if (n.tag === 13) {
      var r = Oi(n), l = pa(n, r);
      if (l !== null) {
        var o = jn();
        Nr(l, n, r, o);
      }
      pf(n, r);
    }
  }, Pe = function() {
    return kt;
  }, Zu = function(n, r) {
    var l = kt;
    try {
      return kt = n, r();
    } finally {
      kt = l;
    }
  }, $t = function(n, r, l) {
    switch (r) {
      case "input":
        if ($r(n, l), r = l.name, l.type === "radio" && r != null) {
          for (l = n; l.parentNode; ) l = l.parentNode;
          for (l = l.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < l.length; r++) {
            var o = l[r];
            if (o !== n && o.form === n.form) {
              var c = hn(o);
              if (!c) throw Error(A(90));
              wr(o), $r(o, c);
            }
          }
        }
        break;
      case "textarea":
        Ya(n, l);
        break;
      case "select":
        r = l.value, r != null && Cn(n, !!l.multiple, r, !1);
    }
  }, Jl = $d, dl = Lu;
  var gy = { usingClientEntryPoint: !1, Events: [_e, ti, hn, ji, Zl, $d] }, Ps = { findFiberByHostInstance: pu, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, ph = { bundleType: Ps.bundleType, version: Ps.version, rendererPackageName: Ps.rendererPackageName, rendererConfig: Ps.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: vt.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = Rn(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: Ps.findFiberByHostInstance || fh, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Vl.isDisabled && Vl.supportsFiber) try {
      hl = Vl.inject(ph), Yr = Vl;
    } catch {
    }
  }
  return Ba.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = gy, Ba.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Kd(r)) throw Error(A(200));
    return my(n, r, null, l);
  }, Ba.createRoot = function(n, r) {
    if (!Kd(n)) throw Error(A(299));
    var l = !1, o = "", c = Nu;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (o = r.identifierPrefix), r.onRecoverableError !== void 0 && (c = r.onRecoverableError)), r = cf(n, 1, !1, null, null, l, !1, o, c), n[Ii] = r.current, uo(n.nodeType === 8 ? n.parentNode : n), new Xd(r);
  }, Ba.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(A(188)) : (n = Object.keys(n).join(","), Error(A(268, n)));
    return n = Rn(r), n = n === null ? null : n.stateNode, n;
  }, Ba.flushSync = function(n) {
    return Lu(n);
  }, Ba.hydrate = function(n, r, l) {
    if (!hf(r)) throw Error(A(200));
    return Vs(null, n, r, !0, l);
  }, Ba.hydrateRoot = function(n, r, l) {
    if (!Kd(n)) throw Error(A(405));
    var o = l != null && l.hydratedSources || null, c = !1, d = "", m = Nu;
    if (l != null && (l.unstable_strictMode === !0 && (c = !0), l.identifierPrefix !== void 0 && (d = l.identifierPrefix), l.onRecoverableError !== void 0 && (m = l.onRecoverableError)), r = ch(r, null, n, 1, l ?? null, c, !1, d, m), n[Ii] = r.current, uo(n), o) for (n = 0; n < o.length; n++) l = o[n], c = l._getVersion, c = c(l._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [l, c] : r.mutableSourceEagerHydrationData.push(
      l,
      c
    );
    return new vf(r);
  }, Ba.render = function(n, r, l) {
    if (!hf(r)) throw Error(A(200));
    return Vs(null, n, r, !1, l);
  }, Ba.unmountComponentAtNode = function(n) {
    if (!hf(n)) throw Error(A(40));
    return n._reactRootContainer ? (Lu(function() {
      Vs(null, null, n, !1, function() {
        n._reactRootContainer = null, n[Ii] = null;
      });
    }), !0) : !1;
  }, Ba.unstable_batchedUpdates = $d, Ba.unstable_renderSubtreeIntoContainer = function(n, r, l, o) {
    if (!hf(l)) throw Error(A(200));
    if (n == null || n._reactInternals === void 0) throw Error(A(38));
    return Vs(n, r, l, !1, o);
  }, Ba.version = "18.3.1-next-f1338f8080-20240426", Ba;
}
var $a = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rT;
function tD() {
  return rT || (rT = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var K = Ra, q = iT(), A = K.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Rt = !1;
    function Ke(e) {
      Rt = e;
    }
    function Ye(e) {
      if (!Rt) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        Pt("warn", e, a);
      }
    }
    function S(e) {
      if (!Rt) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        Pt("error", e, a);
      }
    }
    function Pt(e, t, a) {
      {
        var i = A.ReactDebugCurrentFrame, u = i.getStackAddendum();
        u !== "" && (t += "%s", a = a.concat([u]));
        var s = a.map(function(f) {
          return String(f);
        });
        s.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var de = 0, ve = 1, ot = 2, ee = 3, Ce = 4, ue = 5, Ie = 6, yt = 7, pt = 8, cn = 9, dt = 10, Qe = 11, vt = 12, be = 13, st = 14, Fe = 15, rn = 16, Ft = 17, Kt = 18, an = 19, xt = 21, ke = 22, Ut = 23, bt = 24, Dt = 25, Ee = !0, Z = !1, Re = !1, ne = !1, _ = !1, V = !0, je = !0, Ue = !0, at = !0, et = /* @__PURE__ */ new Set(), Ze = {}, tt = {};
    function it(e, t) {
      Vt(e, t), Vt(e + "Capture", t);
    }
    function Vt(e, t) {
      Ze[e] && S("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Ze[e] = t;
      {
        var a = e.toLowerCase();
        tt[a] = e, e === "onDoubleClick" && (tt.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        et.add(t[i]);
    }
    var kn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", wr = Object.prototype.hasOwnProperty;
    function En(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function tr(e) {
      try {
        return Vn(e), !1;
      } catch {
        return !0;
      }
    }
    function Vn(e) {
      return "" + e;
    }
    function Pn(e, t) {
      if (tr(e))
        return S("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, En(e)), Vn(e);
    }
    function $r(e) {
      if (tr(e))
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", En(e)), Vn(e);
    }
    function si(e, t) {
      if (tr(e))
        return S("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, En(e)), Vn(e);
    }
    function ua(e, t) {
      if (tr(e))
        return S("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, En(e)), Vn(e);
    }
    function Gn(e) {
      if (tr(e))
        return S("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", En(e)), Vn(e);
    }
    function Cn(e) {
      if (tr(e))
        return S("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", En(e)), Vn(e);
    }
    var Bn = 0, yr = 1, Ya = 2, On = 3, gr = 4, oa = 5, Ia = 6, ci = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", J = ci + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Te = new RegExp("^[" + ci + "][" + J + "]*$"), nt = {}, At = {};
    function Zt(e) {
      return wr.call(At, e) ? !0 : wr.call(nt, e) ? !1 : Te.test(e) ? (At[e] = !0, !0) : (nt[e] = !0, S("Invalid attribute name: `%s`", e), !1);
    }
    function pn(e, t, a) {
      return t !== null ? t.type === Bn : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function ln(e, t, a, i) {
      if (a !== null && a.type === Bn)
        return !1;
      switch (typeof t) {
        case "function":
        case "symbol":
          return !0;
        case "boolean": {
          if (i)
            return !1;
          if (a !== null)
            return !a.acceptsBooleans;
          var u = e.toLowerCase().slice(0, 5);
          return u !== "data-" && u !== "aria-";
        }
        default:
          return !1;
      }
    }
    function qn(e, t, a, i) {
      if (t === null || typeof t > "u" || ln(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case On:
            return !t;
          case gr:
            return t === !1;
          case oa:
            return isNaN(t);
          case Ia:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function Jt(e) {
      return $t.hasOwnProperty(e) ? $t[e] : null;
    }
    function Bt(e, t, a, i, u, s, f) {
      this.acceptsBooleans = t === Ya || t === On || t === gr, this.attributeName = i, this.attributeNamespace = u, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = s, this.removeEmptyString = f;
    }
    var $t = {}, sa = [
      "children",
      "dangerouslySetInnerHTML",
      // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      "defaultValue",
      "defaultChecked",
      "innerHTML",
      "suppressContentEditableWarning",
      "suppressHydrationWarning",
      "style"
    ];
    sa.forEach(function(e) {
      $t[e] = new Bt(
        e,
        Bn,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
      var t = e[0], a = e[1];
      $t[t] = new Bt(
        t,
        yr,
        !1,
        // mustUseProperty
        a,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        Ya,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        Ya,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "allowFullScreen",
      "async",
      // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      // Microdata
      "itemScope"
    ].forEach(function(e) {
      $t[e] = new Bt(
        e,
        On,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "checked",
      // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      "multiple",
      "muted",
      "selected"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      $t[e] = new Bt(
        e,
        On,
        !0,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "capture",
      "download"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      $t[e] = new Bt(
        e,
        gr,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "cols",
      "rows",
      "size",
      "span"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      $t[e] = new Bt(
        e,
        Ia,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["rowSpan", "start"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        oa,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var Sr = /[\-\:]([a-z])/g, Ta = function(e) {
      return e[1].toUpperCase();
    };
    [
      "accent-height",
      "alignment-baseline",
      "arabic-form",
      "baseline-shift",
      "cap-height",
      "clip-path",
      "clip-rule",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "dominant-baseline",
      "enable-background",
      "fill-opacity",
      "fill-rule",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "glyph-name",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "horiz-adv-x",
      "horiz-origin-x",
      "image-rendering",
      "letter-spacing",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "overline-position",
      "overline-thickness",
      "paint-order",
      "panose-1",
      "pointer-events",
      "rendering-intent",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "strikethrough-position",
      "strikethrough-thickness",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "underline-position",
      "underline-thickness",
      "unicode-bidi",
      "unicode-range",
      "units-per-em",
      "v-alphabetic",
      "v-hanging",
      "v-ideographic",
      "v-mathematical",
      "vector-effect",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "writing-mode",
      "xmlns:xlink",
      "x-height"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Sr, Ta);
      $t[t] = new Bt(
        t,
        yr,
        !1,
        // mustUseProperty
        e,
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Sr, Ta);
      $t[t] = new Bt(
        t,
        yr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/1999/xlink",
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(Sr, Ta);
      $t[t] = new Bt(
        t,
        yr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        yr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var ji = "xlinkHref";
    $t[ji] = new Bt(
      "xlinkHref",
      yr,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      $t[e] = new Bt(
        e,
        yr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !0,
        // sanitizeURL
        !0
      );
    });
    var Zl = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Jl = !1;
    function dl(e) {
      !Jl && Zl.test(e) && (Jl = !0, S("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function pl(e, t, a, i) {
      if (i.mustUseProperty) {
        var u = i.propertyName;
        return e[u];
      } else {
        Pn(a, t), i.sanitizeURL && dl("" + a);
        var s = i.attributeName, f = null;
        if (i.type === gr) {
          if (e.hasAttribute(s)) {
            var p = e.getAttribute(s);
            return p === "" ? !0 : qn(t, a, i, !1) ? p : p === "" + a ? a : p;
          }
        } else if (e.hasAttribute(s)) {
          if (qn(t, a, i, !1))
            return e.getAttribute(s);
          if (i.type === On)
            return a;
          f = e.getAttribute(s);
        }
        return qn(t, a, i, !1) ? f === null ? a : f : f === "" + a ? a : f;
      }
    }
    function eu(e, t, a, i) {
      {
        if (!Zt(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var u = e.getAttribute(t);
        return Pn(a, t), u === "" + a ? a : u;
      }
    }
    function xr(e, t, a, i) {
      var u = Jt(t);
      if (!pn(t, u, i)) {
        if (qn(t, a, u, i) && (a = null), i || u === null) {
          if (Zt(t)) {
            var s = t;
            a === null ? e.removeAttribute(s) : (Pn(a, t), e.setAttribute(s, "" + a));
          }
          return;
        }
        var f = u.mustUseProperty;
        if (f) {
          var p = u.propertyName;
          if (a === null) {
            var v = u.type;
            e[p] = v === On ? !1 : "";
          } else
            e[p] = a;
          return;
        }
        var y = u.attributeName, g = u.attributeNamespace;
        if (a === null)
          e.removeAttribute(y);
        else {
          var b = u.type, w;
          b === On || b === gr && a === !0 ? w = "" : (Pn(a, y), w = "" + a, u.sanitizeURL && dl(w.toString())), g ? e.setAttributeNS(g, y, w) : e.setAttribute(y, w);
        }
      }
    }
    var br = Symbol.for("react.element"), nr = Symbol.for("react.portal"), fi = Symbol.for("react.fragment"), Qa = Symbol.for("react.strict_mode"), di = Symbol.for("react.profiler"), pi = Symbol.for("react.provider"), R = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), ae = Symbol.for("react.suspense"), he = Symbol.for("react.suspense_list"), Ge = Symbol.for("react.memo"), Be = Symbol.for("react.lazy"), ct = Symbol.for("react.scope"), lt = Symbol.for("react.debug_trace_mode"), Rn = Symbol.for("react.offscreen"), en = Symbol.for("react.legacy_hidden"), un = Symbol.for("react.cache"), rr = Symbol.for("react.tracing_marker"), Wa = Symbol.iterator, Ga = "@@iterator";
    function qe(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = Wa && e[Wa] || e[Ga];
      return typeof t == "function" ? t : null;
    }
    var Je = Object.assign, qa = 0, tu, nu, vl, Qu, hl, Yr, Io;
    function _r() {
    }
    _r.__reactDisabledLog = !0;
    function lc() {
      {
        if (qa === 0) {
          tu = console.log, nu = console.info, vl = console.warn, Qu = console.error, hl = console.group, Yr = console.groupCollapsed, Io = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: _r,
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
        qa++;
      }
    }
    function uc() {
      {
        if (qa--, qa === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Je({}, e, {
              value: tu
            }),
            info: Je({}, e, {
              value: nu
            }),
            warn: Je({}, e, {
              value: vl
            }),
            error: Je({}, e, {
              value: Qu
            }),
            group: Je({}, e, {
              value: hl
            }),
            groupCollapsed: Je({}, e, {
              value: Yr
            }),
            groupEnd: Je({}, e, {
              value: Io
            })
          });
        }
        qa < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Wu = A.ReactCurrentDispatcher, ml;
    function ca(e, t, a) {
      {
        if (ml === void 0)
          try {
            throw Error();
          } catch (u) {
            var i = u.stack.trim().match(/\n( *(at )?)/);
            ml = i && i[1] || "";
          }
        return `
` + ml + e;
      }
    }
    var Xa = !1, Ka;
    {
      var Gu = typeof WeakMap == "function" ? WeakMap : Map;
      Ka = new Gu();
    }
    function ru(e, t) {
      if (!e || Xa)
        return "";
      {
        var a = Ka.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      Xa = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var s;
      s = Wu.current, Wu.current = null, lc();
      try {
        if (t) {
          var f = function() {
            throw Error();
          };
          if (Object.defineProperty(f.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(f, []);
            } catch (U) {
              i = U;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (U) {
              i = U;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (U) {
            i = U;
          }
          e();
        }
      } catch (U) {
        if (U && i && typeof U.stack == "string") {
          for (var p = U.stack.split(`
`), v = i.stack.split(`
`), y = p.length - 1, g = v.length - 1; y >= 1 && g >= 0 && p[y] !== v[g]; )
            g--;
          for (; y >= 1 && g >= 0; y--, g--)
            if (p[y] !== v[g]) {
              if (y !== 1 || g !== 1)
                do
                  if (y--, g--, g < 0 || p[y] !== v[g]) {
                    var b = `
` + p[y].replace(" at new ", " at ");
                    return e.displayName && b.includes("<anonymous>") && (b = b.replace("<anonymous>", e.displayName)), typeof e == "function" && Ka.set(e, b), b;
                  }
                while (y >= 1 && g >= 0);
              break;
            }
        }
      } finally {
        Xa = !1, Wu.current = s, uc(), Error.prepareStackTrace = u;
      }
      var w = e ? e.displayName || e.name : "", M = w ? ca(w) : "";
      return typeof e == "function" && Ka.set(e, M), M;
    }
    function yl(e, t, a) {
      return ru(e, !0);
    }
    function qu(e, t, a) {
      return ru(e, !1);
    }
    function Xu(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function Hi(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ru(e, Xu(e));
      if (typeof e == "string")
        return ca(e);
      switch (e) {
        case ae:
          return ca("Suspense");
        case he:
          return ca("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case B:
            return qu(e.render);
          case Ge:
            return Hi(e.type, t, a);
          case Be: {
            var i = e, u = i._payload, s = i._init;
            try {
              return Hi(s(u), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function Qf(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case ue:
          return ca(e.type);
        case rn:
          return ca("Lazy");
        case be:
          return ca("Suspense");
        case an:
          return ca("SuspenseList");
        case de:
        case ot:
        case Fe:
          return qu(e.type);
        case Qe:
          return qu(e.type.render);
        case ve:
          return yl(e.type);
        default:
          return "";
      }
    }
    function Vi(e) {
      try {
        var t = "", a = e;
        do
          t += Qf(a), a = a.return;
        while (a);
        return t;
      } catch (i) {
        return `
Error generating stack: ` + i.message + `
` + i.stack;
      }
    }
    function kt(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var u = t.displayName || t.name || "";
      return u !== "" ? a + "(" + u + ")" : a;
    }
    function Ku(e) {
      return e.displayName || "Context";
    }
    function Tt(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case fi:
          return "Fragment";
        case nr:
          return "Portal";
        case di:
          return "Profiler";
        case Qa:
          return "StrictMode";
        case ae:
          return "Suspense";
        case he:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case R:
            var t = e;
            return Ku(t) + ".Consumer";
          case pi:
            var a = e;
            return Ku(a._context) + ".Provider";
          case B:
            return kt(e, e.render, "ForwardRef");
          case Ge:
            var i = e.displayName || null;
            return i !== null ? i : Tt(e.type) || "Memo";
          case Be: {
            var u = e, s = u._payload, f = u._init;
            try {
              return Tt(f(s));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Qo(e, t, a) {
      var i = t.displayName || t.name || "";
      return e.displayName || (i !== "" ? a + "(" + i + ")" : a);
    }
    function vi(e) {
      return e.displayName || "Context";
    }
    function Pe(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case bt:
          return "Cache";
        case cn:
          var i = a;
          return vi(i) + ".Consumer";
        case dt:
          var u = a;
          return vi(u._context) + ".Provider";
        case Kt:
          return "DehydratedFragment";
        case Qe:
          return Qo(a, a.render, "ForwardRef");
        case yt:
          return "Fragment";
        case ue:
          return a;
        case Ce:
          return "Portal";
        case ee:
          return "Root";
        case Ie:
          return "Text";
        case rn:
          return Tt(a);
        case pt:
          return a === Qa ? "StrictMode" : "Mode";
        case ke:
          return "Offscreen";
        case vt:
          return "Profiler";
        case xt:
          return "Scope";
        case be:
          return "Suspense";
        case an:
          return "SuspenseList";
        case Dt:
          return "TracingMarker";
        case ve:
        case de:
        case Ft:
        case ot:
        case st:
        case Fe:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var Zu = A.ReactDebugCurrentFrame, ar = null, hi = !1;
    function Dr() {
      {
        if (ar === null)
          return null;
        var e = ar._debugOwner;
        if (e !== null && typeof e < "u")
          return Pe(e);
      }
      return null;
    }
    function mi() {
      return ar === null ? "" : Vi(ar);
    }
    function on() {
      Zu.getCurrentStack = null, ar = null, hi = !1;
    }
    function Yt(e) {
      Zu.getCurrentStack = e === null ? null : mi, ar = e, hi = !1;
    }
    function gl() {
      return ar;
    }
    function $n(e) {
      hi = e;
    }
    function kr(e) {
      return "" + e;
    }
    function wa(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return Cn(e), e;
        default:
          return "";
      }
    }
    var au = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function Wo(e, t) {
      au[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || S("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || S("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function Go(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Sl(e) {
      return e._valueTracker;
    }
    function iu(e) {
      e._valueTracker = null;
    }
    function Wf(e) {
      var t = "";
      return e && (Go(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function xa(e) {
      var t = Go(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      Cn(e[t]);
      var i = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var u = a.get, s = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return u.call(this);
          },
          set: function(p) {
            Cn(p), i = "" + p, s.call(this, p);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var f = {
          getValue: function() {
            return i;
          },
          setValue: function(p) {
            Cn(p), i = "" + p;
          },
          stopTracking: function() {
            iu(e), delete e[t];
          }
        };
        return f;
      }
    }
    function Za(e) {
      Sl(e) || (e._valueTracker = xa(e));
    }
    function yi(e) {
      if (!e)
        return !1;
      var t = Sl(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = Wf(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function ba(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Ju = !1, eo = !1, El = !1, lu = !1;
    function to(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function no(e, t) {
      var a = e, i = t.checked, u = Je({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: i ?? a._wrapperState.initialChecked
      });
      return u;
    }
    function Ja(e, t) {
      Wo("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !eo && (S("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Dr() || "A component", t.type), eo = !0), t.value !== void 0 && t.defaultValue !== void 0 && !Ju && (S("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Dr() || "A component", t.type), Ju = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: wa(t.value != null ? t.value : i),
        controlled: to(t)
      };
    }
    function h(e, t) {
      var a = e, i = t.checked;
      i != null && xr(a, "checked", i, !1);
    }
    function C(e, t) {
      var a = e;
      {
        var i = to(t);
        !a._wrapperState.controlled && i && !lu && (S("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), lu = !0), a._wrapperState.controlled && !i && !El && (S("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), El = !0);
      }
      h(e, t);
      var u = wa(t.value), s = t.type;
      if (u != null)
        s === "number" ? (u === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != u) && (a.value = kr(u)) : a.value !== kr(u) && (a.value = kr(u));
      else if (s === "submit" || s === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? Oe(a, t.type, u) : t.hasOwnProperty("defaultValue") && Oe(a, t.type, wa(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function N(e, t, a) {
      var i = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var u = t.type, s = u === "submit" || u === "reset";
        if (s && (t.value === void 0 || t.value === null))
          return;
        var f = kr(i._wrapperState.initialValue);
        a || f !== i.value && (i.value = f), i.defaultValue = f;
      }
      var p = i.name;
      p !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, p !== "" && (i.name = p);
    }
    function F(e, t) {
      var a = e;
      C(a, t), X(a, t);
    }
    function X(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        Pn(a, "name");
        for (var u = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), s = 0; s < u.length; s++) {
          var f = u[s];
          if (!(f === e || f.form !== e.form)) {
            var p = Lh(f);
            if (!p)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            yi(f), C(f, p);
          }
        }
      }
    }
    function Oe(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || ba(e.ownerDocument) !== e) && (a == null ? e.defaultValue = kr(e._wrapperState.initialValue) : e.defaultValue !== kr(a) && (e.defaultValue = kr(a)));
    }
    var re = !1, Ne = !1, ft = !1;
    function wt(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? K.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || Ne || (Ne = !0, S("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (ft || (ft = !0, S("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !re && (S("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), re = !0);
    }
    function tn(e, t) {
      t.value != null && e.setAttribute("value", kr(wa(t.value)));
    }
    var It = Array.isArray;
    function rt(e) {
      return It(e);
    }
    var Qt;
    Qt = !1;
    function vn() {
      var e = Dr();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var Cl = ["value", "defaultValue"];
    function qo(e) {
      {
        Wo("select", e);
        for (var t = 0; t < Cl.length; t++) {
          var a = Cl[t];
          if (e[a] != null) {
            var i = rt(e[a]);
            e.multiple && !i ? S("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, vn()) : !e.multiple && i && S("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, vn());
          }
        }
      }
    }
    function Pi(e, t, a, i) {
      var u = e.options;
      if (t) {
        for (var s = a, f = {}, p = 0; p < s.length; p++)
          f["$" + s[p]] = !0;
        for (var v = 0; v < u.length; v++) {
          var y = f.hasOwnProperty("$" + u[v].value);
          u[v].selected !== y && (u[v].selected = y), y && i && (u[v].defaultSelected = !0);
        }
      } else {
        for (var g = kr(wa(a)), b = null, w = 0; w < u.length; w++) {
          if (u[w].value === g) {
            u[w].selected = !0, i && (u[w].defaultSelected = !0);
            return;
          }
          b === null && !u[w].disabled && (b = u[w]);
        }
        b !== null && (b.selected = !0);
      }
    }
    function Xo(e, t) {
      return Je({}, t, {
        value: void 0
      });
    }
    function uu(e, t) {
      var a = e;
      qo(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !Qt && (S("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Qt = !0);
    }
    function Gf(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? Pi(a, !!t.multiple, i, !1) : t.defaultValue != null && Pi(a, !!t.multiple, t.defaultValue, !0);
    }
    function oc(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var u = t.value;
      u != null ? Pi(a, !!t.multiple, u, !1) : i !== !!t.multiple && (t.defaultValue != null ? Pi(a, !!t.multiple, t.defaultValue, !0) : Pi(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function qf(e, t) {
      var a = e, i = t.value;
      i != null && Pi(a, !!t.multiple, i, !1);
    }
    var ev = !1;
    function Xf(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var i = Je({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: kr(a._wrapperState.initialValue)
      });
      return i;
    }
    function Kf(e, t) {
      var a = e;
      Wo("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !ev && (S("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Dr() || "A component"), ev = !0);
      var i = t.value;
      if (i == null) {
        var u = t.children, s = t.defaultValue;
        if (u != null) {
          S("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (s != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (rt(u)) {
              if (u.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              u = u[0];
            }
            s = u;
          }
        }
        s == null && (s = ""), i = s;
      }
      a._wrapperState = {
        initialValue: wa(i)
      };
    }
    function tv(e, t) {
      var a = e, i = wa(t.value), u = wa(t.defaultValue);
      if (i != null) {
        var s = kr(i);
        s !== a.value && (a.value = s), t.defaultValue == null && a.defaultValue !== s && (a.defaultValue = s);
      }
      u != null && (a.defaultValue = kr(u));
    }
    function nv(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function Wm(e, t) {
      tv(e, t);
    }
    var Bi = "http://www.w3.org/1999/xhtml", Zf = "http://www.w3.org/1998/Math/MathML", Jf = "http://www.w3.org/2000/svg";
    function ed(e) {
      switch (e) {
        case "svg":
          return Jf;
        case "math":
          return Zf;
        default:
          return Bi;
      }
    }
    function td(e, t) {
      return e == null || e === Bi ? ed(t) : e === Jf && t === "foreignObject" ? Bi : e;
    }
    var rv = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, u) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, u);
        });
      } : e;
    }, sc, av = rv(function(e, t) {
      if (e.namespaceURI === Jf && !("innerHTML" in e)) {
        sc = sc || document.createElement("div"), sc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = sc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), Ir = 1, $i = 3, Ln = 8, Yi = 9, nd = 11, ro = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === $i) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, Ko = {
      animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
      background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
      borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
      borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
      borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
      borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
      borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
      borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
      borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
      borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
      fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
      gap: ["columnGap", "rowGap"],
      grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
      wordWrap: ["overflowWrap"]
    }, Zo = {
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
      // SVG-related properties
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    };
    function iv(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var lv = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Zo).forEach(function(e) {
      lv.forEach(function(t) {
        Zo[iv(t, e)] = Zo[e];
      });
    });
    function cc(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(Zo.hasOwnProperty(e) && Zo[e]) ? t + "px" : (ua(t, e), ("" + t).trim());
    }
    var uv = /([A-Z])/g, ov = /^ms-/;
    function ao(e) {
      return e.replace(uv, "-$1").toLowerCase().replace(ov, "-ms-");
    }
    var sv = function() {
    };
    {
      var Gm = /^(?:webkit|moz|o)[A-Z]/, qm = /^-ms-/, cv = /-(.)/g, rd = /;\s*$/, gi = {}, ou = {}, fv = !1, Jo = !1, Xm = function(e) {
        return e.replace(cv, function(t, a) {
          return a.toUpperCase();
        });
      }, dv = function(e) {
        gi.hasOwnProperty(e) && gi[e] || (gi[e] = !0, S(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          Xm(e.replace(qm, "ms-"))
        ));
      }, ad = function(e) {
        gi.hasOwnProperty(e) && gi[e] || (gi[e] = !0, S("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, id = function(e, t) {
        ou.hasOwnProperty(t) && ou[t] || (ou[t] = !0, S(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(rd, "")));
      }, pv = function(e, t) {
        fv || (fv = !0, S("`NaN` is an invalid value for the `%s` css style property.", e));
      }, vv = function(e, t) {
        Jo || (Jo = !0, S("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      sv = function(e, t) {
        e.indexOf("-") > -1 ? dv(e) : Gm.test(e) ? ad(e) : rd.test(t) && id(e, t), typeof t == "number" && (isNaN(t) ? pv(e, t) : isFinite(t) || vv(e, t));
      };
    }
    var hv = sv;
    function Km(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var u = e[i];
            if (u != null) {
              var s = i.indexOf("--") === 0;
              t += a + (s ? i : ao(i)) + ":", t += cc(i, u, s), a = ";";
            }
          }
        return t || null;
      }
    }
    function mv(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var u = i.indexOf("--") === 0;
          u || hv(i, t[i]);
          var s = cc(i, t[i], u);
          i === "float" && (i = "cssFloat"), u ? a.setProperty(i, s) : a[i] = s;
        }
    }
    function Zm(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function yv(e) {
      var t = {};
      for (var a in e)
        for (var i = Ko[a] || [a], u = 0; u < i.length; u++)
          t[i[u]] = a;
      return t;
    }
    function Jm(e, t) {
      {
        if (!t)
          return;
        var a = yv(e), i = yv(t), u = {};
        for (var s in a) {
          var f = a[s], p = i[s];
          if (p && f !== p) {
            var v = f + "," + p;
            if (u[v])
              continue;
            u[v] = !0, S("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", Zm(e[f]) ? "Removing" : "Updating", f, p);
          }
        }
      }
    }
    var ei = {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0
      // NOTE: menuitem's close tag should be omitted, but that causes problems.
    }, es = Je({
      menuitem: !0
    }, ei), gv = "__html";
    function fc(e, t) {
      if (t) {
        if (es[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(gv in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && S("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function Rl(e, t) {
      if (e.indexOf("-") === -1)
        return typeof t.is == "string";
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
    var ts = {
      // HTML
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      // SVG
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, dc = {
      "aria-current": 0,
      // state
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      // state
      "aria-hidden": 0,
      // state
      "aria-invalid": 0,
      // state
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      // Widget Attributes
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      // Live Region Attributes
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      // Drag-and-Drop Attributes
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      // Relationship Attributes
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, io = {}, ey = new RegExp("^(aria)-[" + J + "]*$"), lo = new RegExp("^(aria)[A-Z][" + J + "]*$");
    function ld(e, t) {
      {
        if (wr.call(io, t) && io[t])
          return !0;
        if (lo.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = dc.hasOwnProperty(a) ? a : null;
          if (i == null)
            return S("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), io[t] = !0, !0;
          if (t !== i)
            return S("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), io[t] = !0, !0;
        }
        if (ey.test(t)) {
          var u = t.toLowerCase(), s = dc.hasOwnProperty(u) ? u : null;
          if (s == null)
            return io[t] = !0, !1;
          if (t !== s)
            return S("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, s), io[t] = !0, !0;
        }
      }
      return !0;
    }
    function ns(e, t) {
      {
        var a = [];
        for (var i in t) {
          var u = ld(e, i);
          u || a.push(i);
        }
        var s = a.map(function(f) {
          return "`" + f + "`";
        }).join(", ");
        a.length === 1 ? S("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e) : a.length > 1 && S("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e);
      }
    }
    function ud(e, t) {
      Rl(e, t) || ns(e, t);
    }
    var od = !1;
    function pc(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !od && (od = !0, e === "select" && t.multiple ? S("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : S("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var su = function() {
    };
    {
      var ir = {}, sd = /^on./, vc = /^on[^A-Z]/, Sv = new RegExp("^(aria)-[" + J + "]*$"), Ev = new RegExp("^(aria)[A-Z][" + J + "]*$");
      su = function(e, t, a, i) {
        if (wr.call(ir, t) && ir[t])
          return !0;
        var u = t.toLowerCase();
        if (u === "onfocusin" || u === "onfocusout")
          return S("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), ir[t] = !0, !0;
        if (i != null) {
          var s = i.registrationNameDependencies, f = i.possibleRegistrationNames;
          if (s.hasOwnProperty(t))
            return !0;
          var p = f.hasOwnProperty(u) ? f[u] : null;
          if (p != null)
            return S("Invalid event handler property `%s`. Did you mean `%s`?", t, p), ir[t] = !0, !0;
          if (sd.test(t))
            return S("Unknown event handler property `%s`. It will be ignored.", t), ir[t] = !0, !0;
        } else if (sd.test(t))
          return vc.test(t) && S("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), ir[t] = !0, !0;
        if (Sv.test(t) || Ev.test(t))
          return !0;
        if (u === "innerhtml")
          return S("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), ir[t] = !0, !0;
        if (u === "aria")
          return S("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), ir[t] = !0, !0;
        if (u === "is" && a !== null && a !== void 0 && typeof a != "string")
          return S("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), ir[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return S("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), ir[t] = !0, !0;
        var v = Jt(t), y = v !== null && v.type === Bn;
        if (ts.hasOwnProperty(u)) {
          var g = ts[u];
          if (g !== t)
            return S("Invalid DOM property `%s`. Did you mean `%s`?", t, g), ir[t] = !0, !0;
        } else if (!y && t !== u)
          return S("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, u), ir[t] = !0, !0;
        return typeof a == "boolean" && ln(t, a, v, !1) ? (a ? S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), ir[t] = !0, !0) : y ? !0 : ln(t, a, v, !1) ? (ir[t] = !0, !1) : ((a === "false" || a === "true") && v !== null && v.type === On && (S("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), ir[t] = !0), !0);
      };
    }
    var Cv = function(e, t, a) {
      {
        var i = [];
        for (var u in t) {
          var s = su(e, u, t[u], a);
          s || i.push(u);
        }
        var f = i.map(function(p) {
          return "`" + p + "`";
        }).join(", ");
        i.length === 1 ? S("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e) : i.length > 1 && S("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e);
      }
    };
    function Rv(e, t, a) {
      Rl(e, t) || Cv(e, t, a);
    }
    var cd = 1, hc = 2, _a = 4, fd = cd | hc | _a, cu = null;
    function ty(e) {
      cu !== null && S("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), cu = e;
    }
    function ny() {
      cu === null && S("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), cu = null;
    }
    function rs(e) {
      return e === cu;
    }
    function dd(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === $i ? t.parentNode : t;
    }
    var mc = null, fu = null, jt = null;
    function yc(e) {
      var t = Do(e);
      if (t) {
        if (typeof mc != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = Lh(a);
          mc(t.stateNode, t.type, i);
        }
      }
    }
    function gc(e) {
      mc = e;
    }
    function uo(e) {
      fu ? jt ? jt.push(e) : jt = [e] : fu = e;
    }
    function Tv() {
      return fu !== null || jt !== null;
    }
    function Sc() {
      if (fu) {
        var e = fu, t = jt;
        if (fu = null, jt = null, yc(e), t)
          for (var a = 0; a < t.length; a++)
            yc(t[a]);
      }
    }
    var oo = function(e, t) {
      return e(t);
    }, as = function() {
    }, Tl = !1;
    function wv() {
      var e = Tv();
      e && (as(), Sc());
    }
    function xv(e, t, a) {
      if (Tl)
        return e(t, a);
      Tl = !0;
      try {
        return oo(e, t, a);
      } finally {
        Tl = !1, wv();
      }
    }
    function ry(e, t, a) {
      oo = e, as = a;
    }
    function bv(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function Ec(e, t, a) {
      switch (e) {
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
          return !!(a.disabled && bv(t));
        default:
          return !1;
      }
    }
    function wl(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = Lh(a);
      if (i === null)
        return null;
      var u = i[t];
      if (Ec(t, e.type, i))
        return null;
      if (u && typeof u != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof u + "` type.");
      return u;
    }
    var is = !1;
    if (kn)
      try {
        var du = {};
        Object.defineProperty(du, "passive", {
          get: function() {
            is = !0;
          }
        }), window.addEventListener("test", du, du), window.removeEventListener("test", du, du);
      } catch {
        is = !1;
      }
    function Cc(e, t, a, i, u, s, f, p, v) {
      var y = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, y);
      } catch (g) {
        this.onError(g);
      }
    }
    var Rc = Cc;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var pd = document.createElement("react");
      Rc = function(t, a, i, u, s, f, p, v, y) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var g = document.createEvent("Event"), b = !1, w = !0, M = window.event, U = Object.getOwnPropertyDescriptor(window, "event");
        function j() {
          pd.removeEventListener(H, Le, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = M);
        }
        var le = Array.prototype.slice.call(arguments, 3);
        function Le() {
          b = !0, j(), a.apply(i, le), w = !1;
        }
        var we, Ct = !1, ht = !1;
        function k(O) {
          if (we = O.error, Ct = !0, we === null && O.colno === 0 && O.lineno === 0 && (ht = !0), O.defaultPrevented && we != null && typeof we == "object")
            try {
              we._suppressLogging = !0;
            } catch {
            }
        }
        var H = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", k), pd.addEventListener(H, Le, !1), g.initEvent(H, !1, !1), pd.dispatchEvent(g), U && Object.defineProperty(window, "event", U), b && w && (Ct ? ht && (we = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : we = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(we)), window.removeEventListener("error", k), !b)
          return j(), Cc.apply(this, arguments);
      };
    }
    var _v = Rc, so = !1, Tc = null, co = !1, Si = null, Dv = {
      onError: function(e) {
        so = !0, Tc = e;
      }
    };
    function xl(e, t, a, i, u, s, f, p, v) {
      so = !1, Tc = null, _v.apply(Dv, arguments);
    }
    function Ei(e, t, a, i, u, s, f, p, v) {
      if (xl.apply(this, arguments), so) {
        var y = us();
        co || (co = !0, Si = y);
      }
    }
    function ls() {
      if (co) {
        var e = Si;
        throw co = !1, Si = null, e;
      }
    }
    function Ii() {
      return so;
    }
    function us() {
      if (so) {
        var e = Tc;
        return so = !1, Tc = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function fo(e) {
      return e._reactInternals;
    }
    function ay(e) {
      return e._reactInternals !== void 0;
    }
    function pu(e, t) {
      e._reactInternals = t;
    }
    var _e = (
      /*                      */
      0
    ), ti = (
      /*                */
      1
    ), hn = (
      /*                    */
      2
    ), gt = (
      /*                       */
      4
    ), Da = (
      /*                */
      16
    ), ka = (
      /*                 */
      32
    ), nn = (
      /*                     */
      64
    ), xe = (
      /*                   */
      128
    ), Er = (
      /*            */
      256
    ), Sn = (
      /*                          */
      512
    ), Yn = (
      /*                     */
      1024
    ), Qr = (
      /*                      */
      2048
    ), Wr = (
      /*                    */
      4096
    ), Mn = (
      /*                   */
      8192
    ), po = (
      /*             */
      16384
    ), kv = (
      /*               */
      32767
    ), os = (
      /*                   */
      32768
    ), Xn = (
      /*                */
      65536
    ), wc = (
      /* */
      131072
    ), Ci = (
      /*                       */
      1048576
    ), vo = (
      /*                    */
      2097152
    ), Qi = (
      /*                 */
      4194304
    ), xc = (
      /*                */
      8388608
    ), bl = (
      /*               */
      16777216
    ), Ri = (
      /*              */
      33554432
    ), _l = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      gt | Yn | 0
    ), Dl = hn | gt | Da | ka | Sn | Wr | Mn, kl = gt | nn | Sn | Mn, Wi = Qr | Da, Nn = Qi | xc | vo, Oa = A.ReactCurrentOwner;
    function fa(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (hn | Wr)) !== _e && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === ee ? a : null;
    }
    function Ti(e) {
      if (e.tag === be) {
        var t = e.memoizedState;
        if (t === null) {
          var a = e.alternate;
          a !== null && (t = a.memoizedState);
        }
        if (t !== null)
          return t.dehydrated;
      }
      return null;
    }
    function wi(e) {
      return e.tag === ee ? e.stateNode.containerInfo : null;
    }
    function vu(e) {
      return fa(e) === e;
    }
    function Ov(e) {
      {
        var t = Oa.current;
        if (t !== null && t.tag === ve) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || S("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Pe(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var u = fo(e);
      return u ? fa(u) === u : !1;
    }
    function bc(e) {
      if (fa(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function _c(e) {
      var t = e.alternate;
      if (!t) {
        var a = fa(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var i = e, u = t; ; ) {
        var s = i.return;
        if (s === null)
          break;
        var f = s.alternate;
        if (f === null) {
          var p = s.return;
          if (p !== null) {
            i = u = p;
            continue;
          }
          break;
        }
        if (s.child === f.child) {
          for (var v = s.child; v; ) {
            if (v === i)
              return bc(s), e;
            if (v === u)
              return bc(s), t;
            v = v.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (i.return !== u.return)
          i = s, u = f;
        else {
          for (var y = !1, g = s.child; g; ) {
            if (g === i) {
              y = !0, i = s, u = f;
              break;
            }
            if (g === u) {
              y = !0, u = s, i = f;
              break;
            }
            g = g.sibling;
          }
          if (!y) {
            for (g = f.child; g; ) {
              if (g === i) {
                y = !0, i = f, u = s;
                break;
              }
              if (g === u) {
                y = !0, u = f, i = s;
                break;
              }
              g = g.sibling;
            }
            if (!y)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (i.alternate !== u)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (i.tag !== ee)
        throw new Error("Unable to find node on an unmounted component.");
      return i.stateNode.current === i ? e : t;
    }
    function Gr(e) {
      var t = _c(e);
      return t !== null ? qr(t) : null;
    }
    function qr(e) {
      if (e.tag === ue || e.tag === Ie)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = qr(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function fn(e) {
      var t = _c(e);
      return t !== null ? La(t) : null;
    }
    function La(e) {
      if (e.tag === ue || e.tag === Ie)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== Ce) {
          var a = La(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var vd = q.unstable_scheduleCallback, Lv = q.unstable_cancelCallback, hd = q.unstable_shouldYield, md = q.unstable_requestPaint, In = q.unstable_now, Dc = q.unstable_getCurrentPriorityLevel, ss = q.unstable_ImmediatePriority, Ol = q.unstable_UserBlockingPriority, Gi = q.unstable_NormalPriority, iy = q.unstable_LowPriority, hu = q.unstable_IdlePriority, kc = q.unstable_yieldValue, Mv = q.unstable_setDisableYieldValue, mu = null, Tn = null, ie = null, da = !1, Xr = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function ho(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return S("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        je && (e = Je({}, e, {
          getLaneLabelMap: yu,
          injectProfilingHooks: Ma
        })), mu = t.inject(e), Tn = t;
      } catch (a) {
        S("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function yd(e, t) {
      if (Tn && typeof Tn.onScheduleFiberRoot == "function")
        try {
          Tn.onScheduleFiberRoot(mu, e, t);
        } catch (a) {
          da || (da = !0, S("React instrumentation encountered an error: %s", a));
        }
    }
    function gd(e, t) {
      if (Tn && typeof Tn.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & xe) === xe;
          if (Ue) {
            var i;
            switch (t) {
              case Or:
                i = ss;
                break;
              case bi:
                i = Ol;
                break;
              case Na:
                i = Gi;
                break;
              case za:
                i = hu;
                break;
              default:
                i = Gi;
                break;
            }
            Tn.onCommitFiberRoot(mu, e, i, a);
          }
        } catch (u) {
          da || (da = !0, S("React instrumentation encountered an error: %s", u));
        }
    }
    function Sd(e) {
      if (Tn && typeof Tn.onPostCommitFiberRoot == "function")
        try {
          Tn.onPostCommitFiberRoot(mu, e);
        } catch (t) {
          da || (da = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function Ed(e) {
      if (Tn && typeof Tn.onCommitFiberUnmount == "function")
        try {
          Tn.onCommitFiberUnmount(mu, e);
        } catch (t) {
          da || (da = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function mn(e) {
      if (typeof kc == "function" && (Mv(e), Ke(e)), Tn && typeof Tn.setStrictMode == "function")
        try {
          Tn.setStrictMode(mu, e);
        } catch (t) {
          da || (da = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function Ma(e) {
      ie = e;
    }
    function yu() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < Eu; a++) {
          var i = Av(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function Cd(e) {
      ie !== null && typeof ie.markCommitStarted == "function" && ie.markCommitStarted(e);
    }
    function Rd() {
      ie !== null && typeof ie.markCommitStopped == "function" && ie.markCommitStopped();
    }
    function pa(e) {
      ie !== null && typeof ie.markComponentRenderStarted == "function" && ie.markComponentRenderStarted(e);
    }
    function va() {
      ie !== null && typeof ie.markComponentRenderStopped == "function" && ie.markComponentRenderStopped();
    }
    function Td(e) {
      ie !== null && typeof ie.markComponentPassiveEffectMountStarted == "function" && ie.markComponentPassiveEffectMountStarted(e);
    }
    function Nv() {
      ie !== null && typeof ie.markComponentPassiveEffectMountStopped == "function" && ie.markComponentPassiveEffectMountStopped();
    }
    function qi(e) {
      ie !== null && typeof ie.markComponentPassiveEffectUnmountStarted == "function" && ie.markComponentPassiveEffectUnmountStarted(e);
    }
    function Ll() {
      ie !== null && typeof ie.markComponentPassiveEffectUnmountStopped == "function" && ie.markComponentPassiveEffectUnmountStopped();
    }
    function Oc(e) {
      ie !== null && typeof ie.markComponentLayoutEffectMountStarted == "function" && ie.markComponentLayoutEffectMountStarted(e);
    }
    function zv() {
      ie !== null && typeof ie.markComponentLayoutEffectMountStopped == "function" && ie.markComponentLayoutEffectMountStopped();
    }
    function cs(e) {
      ie !== null && typeof ie.markComponentLayoutEffectUnmountStarted == "function" && ie.markComponentLayoutEffectUnmountStarted(e);
    }
    function wd() {
      ie !== null && typeof ie.markComponentLayoutEffectUnmountStopped == "function" && ie.markComponentLayoutEffectUnmountStopped();
    }
    function fs(e, t, a) {
      ie !== null && typeof ie.markComponentErrored == "function" && ie.markComponentErrored(e, t, a);
    }
    function xi(e, t, a) {
      ie !== null && typeof ie.markComponentSuspended == "function" && ie.markComponentSuspended(e, t, a);
    }
    function ds(e) {
      ie !== null && typeof ie.markLayoutEffectsStarted == "function" && ie.markLayoutEffectsStarted(e);
    }
    function ps() {
      ie !== null && typeof ie.markLayoutEffectsStopped == "function" && ie.markLayoutEffectsStopped();
    }
    function gu(e) {
      ie !== null && typeof ie.markPassiveEffectsStarted == "function" && ie.markPassiveEffectsStarted(e);
    }
    function xd() {
      ie !== null && typeof ie.markPassiveEffectsStopped == "function" && ie.markPassiveEffectsStopped();
    }
    function Su(e) {
      ie !== null && typeof ie.markRenderStarted == "function" && ie.markRenderStarted(e);
    }
    function Uv() {
      ie !== null && typeof ie.markRenderYielded == "function" && ie.markRenderYielded();
    }
    function Lc() {
      ie !== null && typeof ie.markRenderStopped == "function" && ie.markRenderStopped();
    }
    function yn(e) {
      ie !== null && typeof ie.markRenderScheduled == "function" && ie.markRenderScheduled(e);
    }
    function Mc(e, t) {
      ie !== null && typeof ie.markForceUpdateScheduled == "function" && ie.markForceUpdateScheduled(e, t);
    }
    function vs(e, t) {
      ie !== null && typeof ie.markStateUpdateScheduled == "function" && ie.markStateUpdateScheduled(e, t);
    }
    var De = (
      /*                         */
      0
    ), ut = (
      /*                 */
      1
    ), Ot = (
      /*                    */
      2
    ), Wt = (
      /*               */
      8
    ), Lt = (
      /*              */
      16
    ), zn = Math.clz32 ? Math.clz32 : hs, Kn = Math.log, Nc = Math.LN2;
    function hs(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (Kn(t) / Nc | 0) | 0;
    }
    var Eu = 31, $ = (
      /*                        */
      0
    ), _t = (
      /*                          */
      0
    ), Ae = (
      /*                        */
      1
    ), Ml = (
      /*    */
      2
    ), ni = (
      /*             */
      4
    ), Cr = (
      /*            */
      8
    ), wn = (
      /*                     */
      16
    ), Xi = (
      /*                */
      32
    ), Nl = (
      /*                       */
      4194240
    ), Cu = (
      /*                        */
      64
    ), zc = (
      /*                        */
      128
    ), Uc = (
      /*                        */
      256
    ), Ac = (
      /*                        */
      512
    ), Fc = (
      /*                        */
      1024
    ), jc = (
      /*                        */
      2048
    ), Hc = (
      /*                        */
      4096
    ), Vc = (
      /*                        */
      8192
    ), Pc = (
      /*                        */
      16384
    ), Ru = (
      /*                       */
      32768
    ), Bc = (
      /*                       */
      65536
    ), mo = (
      /*                       */
      131072
    ), yo = (
      /*                       */
      262144
    ), $c = (
      /*                       */
      524288
    ), ms = (
      /*                       */
      1048576
    ), Yc = (
      /*                       */
      2097152
    ), ys = (
      /*                            */
      130023424
    ), Tu = (
      /*                             */
      4194304
    ), Ic = (
      /*                             */
      8388608
    ), gs = (
      /*                             */
      16777216
    ), Qc = (
      /*                             */
      33554432
    ), Wc = (
      /*                             */
      67108864
    ), bd = Tu, Ss = (
      /*          */
      134217728
    ), _d = (
      /*                          */
      268435455
    ), Es = (
      /*               */
      268435456
    ), wu = (
      /*                        */
      536870912
    ), Kr = (
      /*                   */
      1073741824
    );
    function Av(e) {
      {
        if (e & Ae)
          return "Sync";
        if (e & Ml)
          return "InputContinuousHydration";
        if (e & ni)
          return "InputContinuous";
        if (e & Cr)
          return "DefaultHydration";
        if (e & wn)
          return "Default";
        if (e & Xi)
          return "TransitionHydration";
        if (e & Nl)
          return "Transition";
        if (e & ys)
          return "Retry";
        if (e & Ss)
          return "SelectiveHydration";
        if (e & Es)
          return "IdleHydration";
        if (e & wu)
          return "Idle";
        if (e & Kr)
          return "Offscreen";
      }
    }
    var Xt = -1, xu = Cu, Gc = Tu;
    function Cs(e) {
      switch (zl(e)) {
        case Ae:
          return Ae;
        case Ml:
          return Ml;
        case ni:
          return ni;
        case Cr:
          return Cr;
        case wn:
          return wn;
        case Xi:
          return Xi;
        case Cu:
        case zc:
        case Uc:
        case Ac:
        case Fc:
        case jc:
        case Hc:
        case Vc:
        case Pc:
        case Ru:
        case Bc:
        case mo:
        case yo:
        case $c:
        case ms:
        case Yc:
          return e & Nl;
        case Tu:
        case Ic:
        case gs:
        case Qc:
        case Wc:
          return e & ys;
        case Ss:
          return Ss;
        case Es:
          return Es;
        case wu:
          return wu;
        case Kr:
          return Kr;
        default:
          return S("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function qc(e, t) {
      var a = e.pendingLanes;
      if (a === $)
        return $;
      var i = $, u = e.suspendedLanes, s = e.pingedLanes, f = a & _d;
      if (f !== $) {
        var p = f & ~u;
        if (p !== $)
          i = Cs(p);
        else {
          var v = f & s;
          v !== $ && (i = Cs(v));
        }
      } else {
        var y = a & ~u;
        y !== $ ? i = Cs(y) : s !== $ && (i = Cs(s));
      }
      if (i === $)
        return $;
      if (t !== $ && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & u) === $) {
        var g = zl(i), b = zl(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          g >= b || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          g === wn && (b & Nl) !== $
        )
          return t;
      }
      (i & ni) !== $ && (i |= a & wn);
      var w = e.entangledLanes;
      if (w !== $)
        for (var M = e.entanglements, U = i & w; U > 0; ) {
          var j = Un(U), le = 1 << j;
          i |= M[j], U &= ~le;
        }
      return i;
    }
    function ri(e, t) {
      for (var a = e.eventTimes, i = Xt; t > 0; ) {
        var u = Un(t), s = 1 << u, f = a[u];
        f > i && (i = f), t &= ~s;
      }
      return i;
    }
    function Dd(e, t) {
      switch (e) {
        case Ae:
        case Ml:
        case ni:
          return t + 250;
        case Cr:
        case wn:
        case Xi:
        case Cu:
        case zc:
        case Uc:
        case Ac:
        case Fc:
        case jc:
        case Hc:
        case Vc:
        case Pc:
        case Ru:
        case Bc:
        case mo:
        case yo:
        case $c:
        case ms:
        case Yc:
          return t + 5e3;
        case Tu:
        case Ic:
        case gs:
        case Qc:
        case Wc:
          return Xt;
        case Ss:
        case Es:
        case wu:
        case Kr:
          return Xt;
        default:
          return S("Should have found matching lanes. This is a bug in React."), Xt;
      }
    }
    function Xc(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, u = e.pingedLanes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Un(f), v = 1 << p, y = s[p];
        y === Xt ? ((v & i) === $ || (v & u) !== $) && (s[p] = Dd(v, t)) : y <= t && (e.expiredLanes |= v), f &= ~v;
      }
    }
    function Fv(e) {
      return Cs(e.pendingLanes);
    }
    function Kc(e) {
      var t = e.pendingLanes & ~Kr;
      return t !== $ ? t : t & Kr ? Kr : $;
    }
    function jv(e) {
      return (e & Ae) !== $;
    }
    function Rs(e) {
      return (e & _d) !== $;
    }
    function bu(e) {
      return (e & ys) === e;
    }
    function kd(e) {
      var t = Ae | ni | wn;
      return (e & t) === $;
    }
    function Od(e) {
      return (e & Nl) === e;
    }
    function Zc(e, t) {
      var a = Ml | ni | Cr | wn;
      return (t & a) !== $;
    }
    function Hv(e, t) {
      return (t & e.expiredLanes) !== $;
    }
    function Ld(e) {
      return (e & Nl) !== $;
    }
    function Md() {
      var e = xu;
      return xu <<= 1, (xu & Nl) === $ && (xu = Cu), e;
    }
    function Vv() {
      var e = Gc;
      return Gc <<= 1, (Gc & ys) === $ && (Gc = Tu), e;
    }
    function zl(e) {
      return e & -e;
    }
    function Ts(e) {
      return zl(e);
    }
    function Un(e) {
      return 31 - zn(e);
    }
    function lr(e) {
      return Un(e);
    }
    function Zr(e, t) {
      return (e & t) !== $;
    }
    function _u(e, t) {
      return (e & t) === t;
    }
    function Xe(e, t) {
      return e | t;
    }
    function ws(e, t) {
      return e & ~t;
    }
    function Nd(e, t) {
      return e & t;
    }
    function Pv(e) {
      return e;
    }
    function Bv(e, t) {
      return e !== _t && e < t ? e : t;
    }
    function xs(e) {
      for (var t = [], a = 0; a < Eu; a++)
        t.push(e);
      return t;
    }
    function go(e, t, a) {
      e.pendingLanes |= t, t !== wu && (e.suspendedLanes = $, e.pingedLanes = $);
      var i = e.eventTimes, u = lr(t);
      i[u] = a;
    }
    function $v(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, i = t; i > 0; ) {
        var u = Un(i), s = 1 << u;
        a[u] = Xt, i &= ~s;
      }
    }
    function Jc(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function zd(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = $, e.pingedLanes = $, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, u = e.eventTimes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Un(f), v = 1 << p;
        i[p] = $, u[p] = Xt, s[p] = Xt, f &= ~v;
      }
    }
    function ef(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, u = a; u; ) {
        var s = Un(u), f = 1 << s;
        // Is this one of the newly entangled lanes?
        f & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[s] & t && (i[s] |= t), u &= ~f;
      }
    }
    function Ud(e, t) {
      var a = zl(t), i;
      switch (a) {
        case ni:
          i = Ml;
          break;
        case wn:
          i = Cr;
          break;
        case Cu:
        case zc:
        case Uc:
        case Ac:
        case Fc:
        case jc:
        case Hc:
        case Vc:
        case Pc:
        case Ru:
        case Bc:
        case mo:
        case yo:
        case $c:
        case ms:
        case Yc:
        case Tu:
        case Ic:
        case gs:
        case Qc:
        case Wc:
          i = Xi;
          break;
        case wu:
          i = Es;
          break;
        default:
          i = _t;
          break;
      }
      return (i & (e.suspendedLanes | t)) !== _t ? _t : i;
    }
    function bs(e, t, a) {
      if (Xr)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var u = lr(a), s = 1 << u, f = i[u];
          f.add(t), a &= ~s;
        }
    }
    function Yv(e, t) {
      if (Xr)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var u = lr(t), s = 1 << u, f = a[u];
          f.size > 0 && (f.forEach(function(p) {
            var v = p.alternate;
            (v === null || !i.has(v)) && i.add(p);
          }), f.clear()), t &= ~s;
        }
    }
    function Ad(e, t) {
      return null;
    }
    var Or = Ae, bi = ni, Na = wn, za = wu, _s = _t;
    function Ua() {
      return _s;
    }
    function An(e) {
      _s = e;
    }
    function Iv(e, t) {
      var a = _s;
      try {
        return _s = e, t();
      } finally {
        _s = a;
      }
    }
    function Qv(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function Ds(e, t) {
      return e > t ? e : t;
    }
    function Zn(e, t) {
      return e !== 0 && e < t;
    }
    function Wv(e) {
      var t = zl(e);
      return Zn(Or, t) ? Zn(bi, t) ? Rs(t) ? Na : za : bi : Or;
    }
    function tf(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var ks;
    function Rr(e) {
      ks = e;
    }
    function ly(e) {
      ks(e);
    }
    var pe;
    function So(e) {
      pe = e;
    }
    var nf;
    function Gv(e) {
      nf = e;
    }
    var qv;
    function Os(e) {
      qv = e;
    }
    var Ls;
    function Fd(e) {
      Ls = e;
    }
    var rf = !1, Ms = [], Ki = null, _i = null, Di = null, xn = /* @__PURE__ */ new Map(), Lr = /* @__PURE__ */ new Map(), Mr = [], Xv = [
      "mousedown",
      "mouseup",
      "touchcancel",
      "touchend",
      "touchstart",
      "auxclick",
      "dblclick",
      "pointercancel",
      "pointerdown",
      "pointerup",
      "dragend",
      "dragstart",
      "drop",
      "compositionend",
      "compositionstart",
      "keydown",
      "keypress",
      "keyup",
      "input",
      "textInput",
      // Intentionally camelCase
      "copy",
      "cut",
      "paste",
      "click",
      "change",
      "contextmenu",
      "reset",
      "submit"
    ];
    function Kv(e) {
      return Xv.indexOf(e) > -1;
    }
    function ai(e, t, a, i, u) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [i]
      };
    }
    function jd(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          Ki = null;
          break;
        case "dragenter":
        case "dragleave":
          _i = null;
          break;
        case "mouseover":
        case "mouseout":
          Di = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          xn.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          Lr.delete(i);
          break;
        }
      }
    }
    function Jr(e, t, a, i, u, s) {
      if (e === null || e.nativeEvent !== s) {
        var f = ai(t, a, i, u, s);
        if (t !== null) {
          var p = Do(t);
          p !== null && pe(p);
        }
        return f;
      }
      e.eventSystemFlags |= i;
      var v = e.targetContainers;
      return u !== null && v.indexOf(u) === -1 && v.push(u), e;
    }
    function uy(e, t, a, i, u) {
      switch (t) {
        case "focusin": {
          var s = u;
          return Ki = Jr(Ki, e, t, a, i, s), !0;
        }
        case "dragenter": {
          var f = u;
          return _i = Jr(_i, e, t, a, i, f), !0;
        }
        case "mouseover": {
          var p = u;
          return Di = Jr(Di, e, t, a, i, p), !0;
        }
        case "pointerover": {
          var v = u, y = v.pointerId;
          return xn.set(y, Jr(xn.get(y) || null, e, t, a, i, v)), !0;
        }
        case "gotpointercapture": {
          var g = u, b = g.pointerId;
          return Lr.set(b, Jr(Lr.get(b) || null, e, t, a, i, g)), !0;
        }
      }
      return !1;
    }
    function Hd(e) {
      var t = Ys(e.target);
      if (t !== null) {
        var a = fa(t);
        if (a !== null) {
          var i = a.tag;
          if (i === be) {
            var u = Ti(a);
            if (u !== null) {
              e.blockedOn = u, Ls(e.priority, function() {
                nf(a);
              });
              return;
            }
          } else if (i === ee) {
            var s = a.stateNode;
            if (tf(s)) {
              e.blockedOn = wi(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function Zv(e) {
      for (var t = qv(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < Mr.length && Zn(t, Mr[i].priority); i++)
        ;
      Mr.splice(i, 0, a), i === 0 && Hd(a);
    }
    function Ns(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = Co(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var u = e.nativeEvent, s = new u.constructor(u.type, u);
          ty(s), u.target.dispatchEvent(s), ny();
        } else {
          var f = Do(i);
          return f !== null && pe(f), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function Vd(e, t, a) {
      Ns(e) && a.delete(t);
    }
    function oy() {
      rf = !1, Ki !== null && Ns(Ki) && (Ki = null), _i !== null && Ns(_i) && (_i = null), Di !== null && Ns(Di) && (Di = null), xn.forEach(Vd), Lr.forEach(Vd);
    }
    function Ul(e, t) {
      e.blockedOn === t && (e.blockedOn = null, rf || (rf = !0, q.unstable_scheduleCallback(q.unstable_NormalPriority, oy)));
    }
    function Du(e) {
      if (Ms.length > 0) {
        Ul(Ms[0], e);
        for (var t = 1; t < Ms.length; t++) {
          var a = Ms[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      Ki !== null && Ul(Ki, e), _i !== null && Ul(_i, e), Di !== null && Ul(Di, e);
      var i = function(p) {
        return Ul(p, e);
      };
      xn.forEach(i), Lr.forEach(i);
      for (var u = 0; u < Mr.length; u++) {
        var s = Mr[u];
        s.blockedOn === e && (s.blockedOn = null);
      }
      for (; Mr.length > 0; ) {
        var f = Mr[0];
        if (f.blockedOn !== null)
          break;
        Hd(f), f.blockedOn === null && Mr.shift();
      }
    }
    var ur = A.ReactCurrentBatchConfig, St = !0;
    function Qn(e) {
      St = !!e;
    }
    function Fn() {
      return St;
    }
    function or(e, t, a) {
      var i = af(t), u;
      switch (i) {
        case Or:
          u = ha;
          break;
        case bi:
          u = Eo;
          break;
        case Na:
        default:
          u = bn;
          break;
      }
      return u.bind(null, t, a, e);
    }
    function ha(e, t, a, i) {
      var u = Ua(), s = ur.transition;
      ur.transition = null;
      try {
        An(Or), bn(e, t, a, i);
      } finally {
        An(u), ur.transition = s;
      }
    }
    function Eo(e, t, a, i) {
      var u = Ua(), s = ur.transition;
      ur.transition = null;
      try {
        An(bi), bn(e, t, a, i);
      } finally {
        An(u), ur.transition = s;
      }
    }
    function bn(e, t, a, i) {
      St && zs(e, t, a, i);
    }
    function zs(e, t, a, i) {
      var u = Co(e, t, a, i);
      if (u === null) {
        xy(e, t, i, ki, a), jd(e, i);
        return;
      }
      if (uy(u, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (jd(e, i), t & _a && Kv(e)) {
        for (; u !== null; ) {
          var s = Do(u);
          s !== null && ly(s);
          var f = Co(e, t, a, i);
          if (f === null && xy(e, t, i, ki, a), f === u)
            break;
          u = f;
        }
        u !== null && i.stopPropagation();
        return;
      }
      xy(e, t, i, null, a);
    }
    var ki = null;
    function Co(e, t, a, i) {
      ki = null;
      var u = dd(i), s = Ys(u);
      if (s !== null) {
        var f = fa(s);
        if (f === null)
          s = null;
        else {
          var p = f.tag;
          if (p === be) {
            var v = Ti(f);
            if (v !== null)
              return v;
            s = null;
          } else if (p === ee) {
            var y = f.stateNode;
            if (tf(y))
              return wi(f);
            s = null;
          } else f !== s && (s = null);
        }
      }
      return ki = s, null;
    }
    function af(e) {
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
          return Or;
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
          return bi;
        case "message": {
          var t = Dc();
          switch (t) {
            case ss:
              return Or;
            case Ol:
              return bi;
            case Gi:
            case iy:
              return Na;
            case hu:
              return za;
            default:
              return Na;
          }
        }
        default:
          return Na;
      }
    }
    function Us(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function ea(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function Pd(e, t, a, i) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: i
      }), a;
    }
    function Ro(e, t, a, i) {
      return e.addEventListener(t, a, {
        passive: i
      }), a;
    }
    var ma = null, To = null, ku = null;
    function Al(e) {
      return ma = e, To = As(), !0;
    }
    function lf() {
      ma = null, To = null, ku = null;
    }
    function Zi() {
      if (ku)
        return ku;
      var e, t = To, a = t.length, i, u = As(), s = u.length;
      for (e = 0; e < a && t[e] === u[e]; e++)
        ;
      var f = a - e;
      for (i = 1; i <= f && t[a - i] === u[s - i]; i++)
        ;
      var p = i > 1 ? 1 - i : void 0;
      return ku = u.slice(e, p), ku;
    }
    function As() {
      return "value" in ma ? ma.value : ma.textContent;
    }
    function Fl(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function wo() {
      return !0;
    }
    function Fs() {
      return !1;
    }
    function Tr(e) {
      function t(a, i, u, s, f) {
        this._reactName = a, this._targetInst = u, this.type = i, this.nativeEvent = s, this.target = f, this.currentTarget = null;
        for (var p in e)
          if (e.hasOwnProperty(p)) {
            var v = e[p];
            v ? this[p] = v(s) : this[p] = s[p];
          }
        var y = s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1;
        return y ? this.isDefaultPrevented = wo : this.isDefaultPrevented = Fs, this.isPropagationStopped = Fs, this;
      }
      return Je(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = wo);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = wo);
        },
        /**
         * We release all dispatched `SyntheticEvent`s after each event loop, adding
         * them back into the pool. This allows a way to hold onto a reference that
         * won't be added back into the pool.
         */
        persist: function() {
        },
        /**
         * Checks if this event should be released back into the pool.
         *
         * @return {boolean} True if this should not be released, false otherwise.
         */
        isPersistent: wo
      }), t;
    }
    var jn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Oi = Tr(jn), Nr = Je({}, jn, {
      view: 0,
      detail: 0
    }), ta = Tr(Nr), uf, js, Ou;
    function sy(e) {
      e !== Ou && (Ou && e.type === "mousemove" ? (uf = e.screenX - Ou.screenX, js = e.screenY - Ou.screenY) : (uf = 0, js = 0), Ou = e);
    }
    var ii = Je({}, Nr, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: dn,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (sy(e), uf);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : js;
      }
    }), Bd = Tr(ii), $d = Je({}, ii, {
      dataTransfer: 0
    }), Lu = Tr($d), Yd = Je({}, Nr, {
      relatedTarget: 0
    }), Ji = Tr(Yd), Jv = Je({}, jn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), eh = Tr(Jv), Id = Je({}, jn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), of = Tr(Id), cy = Je({}, jn, {
      data: 0
    }), th = Tr(cy), nh = th, rh = {
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
    }, Mu = {
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
    };
    function fy(e) {
      if (e.key) {
        var t = rh[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = Fl(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? Mu[e.keyCode] || "Unidentified" : "";
    }
    var xo = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function ah(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = xo[e];
      return i ? !!a[i] : !1;
    }
    function dn(e) {
      return ah;
    }
    var dy = Je({}, Nr, {
      key: fy,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: dn,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? Fl(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Fl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), ih = Tr(dy), py = Je({}, ii, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), lh = Tr(py), uh = Je({}, Nr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: dn
    }), oh = Tr(uh), vy = Je({}, jn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Aa = Tr(vy), Qd = Je({}, ii, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : (
          // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
          "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        );
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : (
          // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
          "wheelDeltaY" in e ? -e.wheelDeltaY : (
            // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
            "wheelDelta" in e ? -e.wheelDelta : 0
          )
        );
      },
      deltaZ: 0,
      // Browsers without "deltaMode" is reporting in raw wheel delta where one
      // notch on the scroll is always +/- 120, roughly equivalent to pixels.
      // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
      // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
      deltaMode: 0
    }), hy = Tr(Qd), jl = [9, 13, 27, 32], Hs = 229, el = kn && "CompositionEvent" in window, Hl = null;
    kn && "documentMode" in document && (Hl = document.documentMode);
    var Wd = kn && "TextEvent" in window && !Hl, sf = kn && (!el || Hl && Hl > 8 && Hl <= 11), sh = 32, cf = String.fromCharCode(sh);
    function my() {
      it("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), it("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), it("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), it("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var Gd = !1;
    function ch(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function ff(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function df(e, t) {
      return e === "keydown" && t.keyCode === Hs;
    }
    function qd(e, t) {
      switch (e) {
        case "keyup":
          return jl.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== Hs;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function pf(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function fh(e) {
      return e.locale === "ko";
    }
    var Nu = !1;
    function Xd(e, t, a, i, u) {
      var s, f;
      if (el ? s = ff(t) : Nu ? qd(t, i) && (s = "onCompositionEnd") : df(t, i) && (s = "onCompositionStart"), !s)
        return null;
      sf && !fh(i) && (!Nu && s === "onCompositionStart" ? Nu = Al(u) : s === "onCompositionEnd" && Nu && (f = Zi()));
      var p = gh(a, s);
      if (p.length > 0) {
        var v = new th(s, t, null, i, u);
        if (e.push({
          event: v,
          listeners: p
        }), f)
          v.data = f;
        else {
          var y = pf(i);
          y !== null && (v.data = y);
        }
      }
    }
    function vf(e, t) {
      switch (e) {
        case "compositionend":
          return pf(t);
        case "keypress":
          var a = t.which;
          return a !== sh ? null : (Gd = !0, cf);
        case "textInput":
          var i = t.data;
          return i === cf && Gd ? null : i;
        default:
          return null;
      }
    }
    function Kd(e, t) {
      if (Nu) {
        if (e === "compositionend" || !el && qd(e, t)) {
          var a = Zi();
          return lf(), Nu = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!ch(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return sf && !fh(t) ? null : t.data;
        default:
          return null;
      }
    }
    function hf(e, t, a, i, u) {
      var s;
      if (Wd ? s = vf(t, i) : s = Kd(t, i), !s)
        return null;
      var f = gh(a, "onBeforeInput");
      if (f.length > 0) {
        var p = new nh("onBeforeInput", "beforeinput", null, i, u);
        e.push({
          event: p,
          listeners: f
        }), p.data = s;
      }
    }
    function dh(e, t, a, i, u, s, f) {
      Xd(e, t, a, i, u), hf(e, t, a, i, u);
    }
    var yy = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    };
    function Vs(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!yy[e.type] : t === "textarea";
    }
    /**
     * Checks if an event is supported in the current execution environment.
     *
     * NOTE: This will not work correctly for non-generic events such as `change`,
     * `reset`, `load`, `error`, and `select`.
     *
     * Borrows from Modernizr.
     *
     * @param {string} eventNameSuffix Event name, e.g. "click".
     * @return {boolean} True if the event is supported.
     * @internal
     * @license Modernizr 3.0.0pre (Custom Build) | MIT
     */
    function gy(e) {
      if (!kn)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var i = document.createElement("div");
        i.setAttribute(t, "return;"), a = typeof i[t] == "function";
      }
      return a;
    }
    function Ps() {
      it("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function ph(e, t, a, i) {
      uo(i);
      var u = gh(t, "onChange");
      if (u.length > 0) {
        var s = new Oi("onChange", "change", null, a, i);
        e.push({
          event: s,
          listeners: u
        });
      }
    }
    var Vl = null, n = null;
    function r(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function l(e) {
      var t = [];
      ph(t, n, e, dd(e)), xv(o, t);
    }
    function o(e) {
      bE(e, 0);
    }
    function c(e) {
      var t = Cf(e);
      if (yi(t))
        return e;
    }
    function d(e, t) {
      if (e === "change")
        return t;
    }
    var m = !1;
    kn && (m = gy("input") && (!document.documentMode || document.documentMode > 9));
    function E(e, t) {
      Vl = e, n = t, Vl.attachEvent("onpropertychange", z);
    }
    function T() {
      Vl && (Vl.detachEvent("onpropertychange", z), Vl = null, n = null);
    }
    function z(e) {
      e.propertyName === "value" && c(n) && l(e);
    }
    function I(e, t, a) {
      e === "focusin" ? (T(), E(t, a)) : e === "focusout" && T();
    }
    function W(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return c(n);
    }
    function Y(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function se(e, t) {
      if (e === "click")
        return c(t);
    }
    function me(e, t) {
      if (e === "input" || e === "change")
        return c(t);
    }
    function Se(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || Oe(e, "number", e.value);
    }
    function _n(e, t, a, i, u, s, f) {
      var p = a ? Cf(a) : window, v, y;
      if (r(p) ? v = d : Vs(p) ? m ? v = me : (v = W, y = I) : Y(p) && (v = se), v) {
        var g = v(t, a);
        if (g) {
          ph(e, g, i, u);
          return;
        }
      }
      y && y(t, p, a), t === "focusout" && Se(p);
    }
    function D() {
      Vt("onMouseEnter", ["mouseout", "mouseover"]), Vt("onMouseLeave", ["mouseout", "mouseover"]), Vt("onPointerEnter", ["pointerout", "pointerover"]), Vt("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function x(e, t, a, i, u, s, f) {
      var p = t === "mouseover" || t === "pointerover", v = t === "mouseout" || t === "pointerout";
      if (p && !rs(i)) {
        var y = i.relatedTarget || i.fromElement;
        if (y && (Ys(y) || fp(y)))
          return;
      }
      if (!(!v && !p)) {
        var g;
        if (u.window === u)
          g = u;
        else {
          var b = u.ownerDocument;
          b ? g = b.defaultView || b.parentWindow : g = window;
        }
        var w, M;
        if (v) {
          var U = i.relatedTarget || i.toElement;
          if (w = a, M = U ? Ys(U) : null, M !== null) {
            var j = fa(M);
            (M !== j || M.tag !== ue && M.tag !== Ie) && (M = null);
          }
        } else
          w = null, M = a;
        if (w !== M) {
          var le = Bd, Le = "onMouseLeave", we = "onMouseEnter", Ct = "mouse";
          (t === "pointerout" || t === "pointerover") && (le = lh, Le = "onPointerLeave", we = "onPointerEnter", Ct = "pointer");
          var ht = w == null ? g : Cf(w), k = M == null ? g : Cf(M), H = new le(Le, Ct + "leave", w, i, u);
          H.target = ht, H.relatedTarget = k;
          var O = null, G = Ys(u);
          if (G === a) {
            var fe = new le(we, Ct + "enter", M, i, u);
            fe.target = k, fe.relatedTarget = ht, O = fe;
          }
          bT(e, H, O, w, M);
        }
      }
    }
    function L(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Q = typeof Object.is == "function" ? Object.is : L;
    function ye(e, t) {
      if (Q(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var u = 0; u < a.length; u++) {
        var s = a[u];
        if (!wr.call(t, s) || !Q(e[s], t[s]))
          return !1;
      }
      return !0;
    }
    function Me(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function ze(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function Ve(e, t) {
      for (var a = Me(e), i = 0, u = 0; a; ) {
        if (a.nodeType === $i) {
          if (u = i + a.textContent.length, i <= t && u >= t)
            return {
              node: a,
              offset: t - i
            };
          i = u;
        }
        a = Me(ze(a));
      }
    }
    function Jn(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var u = i.anchorNode, s = i.anchorOffset, f = i.focusNode, p = i.focusOffset;
      try {
        u.nodeType, f.nodeType;
      } catch {
        return null;
      }
      return Mt(e, u, s, f, p);
    }
    function Mt(e, t, a, i, u) {
      var s = 0, f = -1, p = -1, v = 0, y = 0, g = e, b = null;
      e: for (; ; ) {
        for (var w = null; g === t && (a === 0 || g.nodeType === $i) && (f = s + a), g === i && (u === 0 || g.nodeType === $i) && (p = s + u), g.nodeType === $i && (s += g.nodeValue.length), (w = g.firstChild) !== null; )
          b = g, g = w;
        for (; ; ) {
          if (g === e)
            break e;
          if (b === t && ++v === a && (f = s), b === i && ++y === u && (p = s), (w = g.nextSibling) !== null)
            break;
          g = b, b = g.parentNode;
        }
        g = w;
      }
      return f === -1 || p === -1 ? null : {
        start: f,
        end: p
      };
    }
    function Pl(e, t) {
      var a = e.ownerDocument || document, i = a && a.defaultView || window;
      if (i.getSelection) {
        var u = i.getSelection(), s = e.textContent.length, f = Math.min(t.start, s), p = t.end === void 0 ? f : Math.min(t.end, s);
        if (!u.extend && f > p) {
          var v = p;
          p = f, f = v;
        }
        var y = Ve(e, f), g = Ve(e, p);
        if (y && g) {
          if (u.rangeCount === 1 && u.anchorNode === y.node && u.anchorOffset === y.offset && u.focusNode === g.node && u.focusOffset === g.offset)
            return;
          var b = a.createRange();
          b.setStart(y.node, y.offset), u.removeAllRanges(), f > p ? (u.addRange(b), u.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), u.addRange(b));
        }
      }
    }
    function vh(e) {
      return e && e.nodeType === $i;
    }
    function hE(e, t) {
      return !e || !t ? !1 : e === t ? !0 : vh(e) ? !1 : vh(t) ? hE(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function oT(e) {
      return e && e.ownerDocument && hE(e.ownerDocument.documentElement, e);
    }
    function sT(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function mE() {
      for (var e = window, t = ba(); t instanceof e.HTMLIFrameElement; ) {
        if (sT(t))
          e = t.contentWindow;
        else
          return t;
        t = ba(e.document);
      }
      return t;
    }
    function Sy(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function cT() {
      var e = mE();
      return {
        focusedElem: e,
        selectionRange: Sy(e) ? dT(e) : null
      };
    }
    function fT(e) {
      var t = mE(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && oT(a)) {
        i !== null && Sy(a) && pT(a, i);
        for (var u = [], s = a; s = s.parentNode; )
          s.nodeType === Ir && u.push({
            element: s,
            left: s.scrollLeft,
            top: s.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var f = 0; f < u.length; f++) {
          var p = u[f];
          p.element.scrollLeft = p.left, p.element.scrollTop = p.top;
        }
      }
    }
    function dT(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = Jn(e), t || {
        start: 0,
        end: 0
      };
    }
    function pT(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : Pl(e, t);
    }
    var vT = kn && "documentMode" in document && document.documentMode <= 11;
    function hT() {
      it("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var mf = null, Ey = null, Zd = null, Cy = !1;
    function mT(e) {
      if ("selectionStart" in e && Sy(e))
        return {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      var t = e.ownerDocument && e.ownerDocument.defaultView || window, a = t.getSelection();
      return {
        anchorNode: a.anchorNode,
        anchorOffset: a.anchorOffset,
        focusNode: a.focusNode,
        focusOffset: a.focusOffset
      };
    }
    function yT(e) {
      return e.window === e ? e.document : e.nodeType === Yi ? e : e.ownerDocument;
    }
    function yE(e, t, a) {
      var i = yT(a);
      if (!(Cy || mf == null || mf !== ba(i))) {
        var u = mT(mf);
        if (!Zd || !ye(Zd, u)) {
          Zd = u;
          var s = gh(Ey, "onSelect");
          if (s.length > 0) {
            var f = new Oi("onSelect", "select", null, t, a);
            e.push({
              event: f,
              listeners: s
            }), f.target = mf;
          }
        }
      }
    }
    function gT(e, t, a, i, u, s, f) {
      var p = a ? Cf(a) : window;
      switch (t) {
        case "focusin":
          (Vs(p) || p.contentEditable === "true") && (mf = p, Ey = a, Zd = null);
          break;
        case "focusout":
          mf = null, Ey = null, Zd = null;
          break;
        case "mousedown":
          Cy = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Cy = !1, yE(e, i, u);
          break;
        case "selectionchange":
          if (vT)
            break;
        case "keydown":
        case "keyup":
          yE(e, i, u);
      }
    }
    function hh(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var yf = {
      animationend: hh("Animation", "AnimationEnd"),
      animationiteration: hh("Animation", "AnimationIteration"),
      animationstart: hh("Animation", "AnimationStart"),
      transitionend: hh("Transition", "TransitionEnd")
    }, Ry = {}, gE = {};
    kn && (gE = document.createElement("div").style, "AnimationEvent" in window || (delete yf.animationend.animation, delete yf.animationiteration.animation, delete yf.animationstart.animation), "TransitionEvent" in window || delete yf.transitionend.transition);
    function mh(e) {
      if (Ry[e])
        return Ry[e];
      if (!yf[e])
        return e;
      var t = yf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in gE)
          return Ry[e] = t[a];
      return e;
    }
    var SE = mh("animationend"), EE = mh("animationiteration"), CE = mh("animationstart"), RE = mh("transitionend"), TE = /* @__PURE__ */ new Map(), wE = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function bo(e, t) {
      TE.set(e, t), it(t, [e]);
    }
    function ST() {
      for (var e = 0; e < wE.length; e++) {
        var t = wE[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        bo(a, "on" + i);
      }
      bo(SE, "onAnimationEnd"), bo(EE, "onAnimationIteration"), bo(CE, "onAnimationStart"), bo("dblclick", "onDoubleClick"), bo("focusin", "onFocus"), bo("focusout", "onBlur"), bo(RE, "onTransitionEnd");
    }
    function ET(e, t, a, i, u, s, f) {
      var p = TE.get(t);
      if (p !== void 0) {
        var v = Oi, y = t;
        switch (t) {
          case "keypress":
            if (Fl(i) === 0)
              return;
          case "keydown":
          case "keyup":
            v = ih;
            break;
          case "focusin":
            y = "focus", v = Ji;
            break;
          case "focusout":
            y = "blur", v = Ji;
            break;
          case "beforeblur":
          case "afterblur":
            v = Ji;
            break;
          case "click":
            if (i.button === 2)
              return;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Lu;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = oh;
            break;
          case SE:
          case EE:
          case CE:
            v = eh;
            break;
          case RE:
            v = Aa;
            break;
          case "scroll":
            v = ta;
            break;
          case "wheel":
            v = hy;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = of;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = lh;
            break;
        }
        var g = (s & _a) !== 0;
        {
          var b = !g && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", w = wT(a, p, i.type, g, b);
          if (w.length > 0) {
            var M = new v(p, y, null, i, u);
            e.push({
              event: M,
              listeners: w
            });
          }
        }
      }
    }
    ST(), D(), Ps(), hT(), my();
    function CT(e, t, a, i, u, s, f) {
      ET(e, t, a, i, u, s);
      var p = (s & fd) === 0;
      p && (x(e, t, a, i, u), _n(e, t, a, i, u), gT(e, t, a, i, u), dh(e, t, a, i, u));
    }
    var Jd = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Ty = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Jd));
    function xE(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, Ei(i, t, void 0, e), e.currentTarget = null;
    }
    function RT(e, t, a) {
      var i;
      if (a)
        for (var u = t.length - 1; u >= 0; u--) {
          var s = t[u], f = s.instance, p = s.currentTarget, v = s.listener;
          if (f !== i && e.isPropagationStopped())
            return;
          xE(e, v, p), i = f;
        }
      else
        for (var y = 0; y < t.length; y++) {
          var g = t[y], b = g.instance, w = g.currentTarget, M = g.listener;
          if (b !== i && e.isPropagationStopped())
            return;
          xE(e, M, w), i = b;
        }
    }
    function bE(e, t) {
      for (var a = (t & _a) !== 0, i = 0; i < e.length; i++) {
        var u = e[i], s = u.event, f = u.listeners;
        RT(s, f, a);
      }
      ls();
    }
    function TT(e, t, a, i, u) {
      var s = dd(a), f = [];
      CT(f, e, i, a, s, t), bE(f, t);
    }
    function gn(e, t) {
      Ty.has(e) || S('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = J1(t), u = _T(e);
      i.has(u) || (_E(t, e, hc, a), i.add(u));
    }
    function wy(e, t, a) {
      Ty.has(e) && !t && S('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= _a), _E(a, e, i, t);
    }
    var yh = "_reactListening" + Math.random().toString(36).slice(2);
    function ep(e) {
      if (!e[yh]) {
        e[yh] = !0, et.forEach(function(a) {
          a !== "selectionchange" && (Ty.has(a) || wy(a, !1, e), wy(a, !0, e));
        });
        var t = e.nodeType === Yi ? e : e.ownerDocument;
        t !== null && (t[yh] || (t[yh] = !0, wy("selectionchange", !1, t)));
      }
    }
    function _E(e, t, a, i, u) {
      var s = or(e, t, a), f = void 0;
      is && (t === "touchstart" || t === "touchmove" || t === "wheel") && (f = !0), e = e, i ? f !== void 0 ? Pd(e, t, s, f) : ea(e, t, s) : f !== void 0 ? Ro(e, t, s, f) : Us(e, t, s);
    }
    function DE(e, t) {
      return e === t || e.nodeType === Ln && e.parentNode === t;
    }
    function xy(e, t, a, i, u) {
      var s = i;
      if (!(t & cd) && !(t & hc)) {
        var f = u;
        if (i !== null) {
          var p = i;
          e: for (; ; ) {
            if (p === null)
              return;
            var v = p.tag;
            if (v === ee || v === Ce) {
              var y = p.stateNode.containerInfo;
              if (DE(y, f))
                break;
              if (v === Ce)
                for (var g = p.return; g !== null; ) {
                  var b = g.tag;
                  if (b === ee || b === Ce) {
                    var w = g.stateNode.containerInfo;
                    if (DE(w, f))
                      return;
                  }
                  g = g.return;
                }
              for (; y !== null; ) {
                var M = Ys(y);
                if (M === null)
                  return;
                var U = M.tag;
                if (U === ue || U === Ie) {
                  p = s = M;
                  continue e;
                }
                y = y.parentNode;
              }
            }
            p = p.return;
          }
        }
      }
      xv(function() {
        return TT(e, t, a, s);
      });
    }
    function tp(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function wT(e, t, a, i, u, s) {
      for (var f = t !== null ? t + "Capture" : null, p = i ? f : t, v = [], y = e, g = null; y !== null; ) {
        var b = y, w = b.stateNode, M = b.tag;
        if (M === ue && w !== null && (g = w, p !== null)) {
          var U = wl(y, p);
          U != null && v.push(tp(y, U, g));
        }
        if (u)
          break;
        y = y.return;
      }
      return v;
    }
    function gh(e, t) {
      for (var a = t + "Capture", i = [], u = e; u !== null; ) {
        var s = u, f = s.stateNode, p = s.tag;
        if (p === ue && f !== null) {
          var v = f, y = wl(u, a);
          y != null && i.unshift(tp(u, y, v));
          var g = wl(u, t);
          g != null && i.push(tp(u, g, v));
        }
        u = u.return;
      }
      return i;
    }
    function gf(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== ue);
      return e || null;
    }
    function xT(e, t) {
      for (var a = e, i = t, u = 0, s = a; s; s = gf(s))
        u++;
      for (var f = 0, p = i; p; p = gf(p))
        f++;
      for (; u - f > 0; )
        a = gf(a), u--;
      for (; f - u > 0; )
        i = gf(i), f--;
      for (var v = u; v--; ) {
        if (a === i || i !== null && a === i.alternate)
          return a;
        a = gf(a), i = gf(i);
      }
      return null;
    }
    function kE(e, t, a, i, u) {
      for (var s = t._reactName, f = [], p = a; p !== null && p !== i; ) {
        var v = p, y = v.alternate, g = v.stateNode, b = v.tag;
        if (y !== null && y === i)
          break;
        if (b === ue && g !== null) {
          var w = g;
          if (u) {
            var M = wl(p, s);
            M != null && f.unshift(tp(p, M, w));
          } else if (!u) {
            var U = wl(p, s);
            U != null && f.push(tp(p, U, w));
          }
        }
        p = p.return;
      }
      f.length !== 0 && e.push({
        event: t,
        listeners: f
      });
    }
    function bT(e, t, a, i, u) {
      var s = i && u ? xT(i, u) : null;
      i !== null && kE(e, t, i, s, !1), u !== null && a !== null && kE(e, a, u, s, !0);
    }
    function _T(e, t) {
      return e + "__bubble";
    }
    var Fa = !1, np = "dangerouslySetInnerHTML", Sh = "suppressContentEditableWarning", _o = "suppressHydrationWarning", OE = "autoFocus", Bs = "children", $s = "style", Eh = "__html", by, Ch, rp, LE, Rh, ME, NE;
    by = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, Ch = function(e, t) {
      ud(e, t), pc(e, t), Rv(e, t, {
        registrationNameDependencies: Ze,
        possibleRegistrationNames: tt
      });
    }, ME = kn && !document.documentMode, rp = function(e, t, a) {
      if (!Fa) {
        var i = Th(a), u = Th(t);
        u !== i && (Fa = !0, S("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(u), JSON.stringify(i)));
      }
    }, LE = function(e) {
      if (!Fa) {
        Fa = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), S("Extra attributes from the server: %s", t);
      }
    }, Rh = function(e, t) {
      t === !1 ? S("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : S("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, NE = function(e, t) {
      var a = e.namespaceURI === Bi ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var DT = /\r\n?/g, kT = /\u0000|\uFFFD/g;
    function Th(e) {
      Gn(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(DT, `
`).replace(kT, "");
    }
    function wh(e, t, a, i) {
      var u = Th(t), s = Th(e);
      if (s !== u && (i && (Fa || (Fa = !0, S('Text content did not match. Server: "%s" Client: "%s"', s, u))), a && Ee))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function zE(e) {
      return e.nodeType === Yi ? e : e.ownerDocument;
    }
    function OT() {
    }
    function xh(e) {
      e.onclick = OT;
    }
    function LT(e, t, a, i, u) {
      for (var s in i)
        if (i.hasOwnProperty(s)) {
          var f = i[s];
          if (s === $s)
            f && Object.freeze(f), mv(t, f);
          else if (s === np) {
            var p = f ? f[Eh] : void 0;
            p != null && av(t, p);
          } else if (s === Bs)
            if (typeof f == "string") {
              var v = e !== "textarea" || f !== "";
              v && ro(t, f);
            } else typeof f == "number" && ro(t, "" + f);
          else s === Sh || s === _o || s === OE || (Ze.hasOwnProperty(s) ? f != null && (typeof f != "function" && Rh(s, f), s === "onScroll" && gn("scroll", t)) : f != null && xr(t, s, f, u));
        }
    }
    function MT(e, t, a, i) {
      for (var u = 0; u < t.length; u += 2) {
        var s = t[u], f = t[u + 1];
        s === $s ? mv(e, f) : s === np ? av(e, f) : s === Bs ? ro(e, f) : xr(e, s, f, i);
      }
    }
    function NT(e, t, a, i) {
      var u, s = zE(a), f, p = i;
      if (p === Bi && (p = ed(e)), p === Bi) {
        if (u = Rl(e, t), !u && e !== e.toLowerCase() && S("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var v = s.createElement("div");
          v.innerHTML = "<script><\/script>";
          var y = v.firstChild;
          f = v.removeChild(y);
        } else if (typeof t.is == "string")
          f = s.createElement(e, {
            is: t.is
          });
        else if (f = s.createElement(e), e === "select") {
          var g = f;
          t.multiple ? g.multiple = !0 : t.size && (g.size = t.size);
        }
      } else
        f = s.createElementNS(p, e);
      return p === Bi && !u && Object.prototype.toString.call(f) === "[object HTMLUnknownElement]" && !wr.call(by, e) && (by[e] = !0, S("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), f;
    }
    function zT(e, t) {
      return zE(t).createTextNode(e);
    }
    function UT(e, t, a, i) {
      var u = Rl(t, a);
      Ch(t, a);
      var s;
      switch (t) {
        case "dialog":
          gn("cancel", e), gn("close", e), s = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          gn("load", e), s = a;
          break;
        case "video":
        case "audio":
          for (var f = 0; f < Jd.length; f++)
            gn(Jd[f], e);
          s = a;
          break;
        case "source":
          gn("error", e), s = a;
          break;
        case "img":
        case "image":
        case "link":
          gn("error", e), gn("load", e), s = a;
          break;
        case "details":
          gn("toggle", e), s = a;
          break;
        case "input":
          Ja(e, a), s = no(e, a), gn("invalid", e);
          break;
        case "option":
          wt(e, a), s = a;
          break;
        case "select":
          uu(e, a), s = Xo(e, a), gn("invalid", e);
          break;
        case "textarea":
          Kf(e, a), s = Xf(e, a), gn("invalid", e);
          break;
        default:
          s = a;
      }
      switch (fc(t, s), LT(t, e, i, s, u), t) {
        case "input":
          Za(e), N(e, a, !1);
          break;
        case "textarea":
          Za(e), nv(e);
          break;
        case "option":
          tn(e, a);
          break;
        case "select":
          Gf(e, a);
          break;
        default:
          typeof s.onClick == "function" && xh(e);
          break;
      }
    }
    function AT(e, t, a, i, u) {
      Ch(t, i);
      var s = null, f, p;
      switch (t) {
        case "input":
          f = no(e, a), p = no(e, i), s = [];
          break;
        case "select":
          f = Xo(e, a), p = Xo(e, i), s = [];
          break;
        case "textarea":
          f = Xf(e, a), p = Xf(e, i), s = [];
          break;
        default:
          f = a, p = i, typeof f.onClick != "function" && typeof p.onClick == "function" && xh(e);
          break;
      }
      fc(t, p);
      var v, y, g = null;
      for (v in f)
        if (!(p.hasOwnProperty(v) || !f.hasOwnProperty(v) || f[v] == null))
          if (v === $s) {
            var b = f[v];
            for (y in b)
              b.hasOwnProperty(y) && (g || (g = {}), g[y] = "");
          } else v === np || v === Bs || v === Sh || v === _o || v === OE || (Ze.hasOwnProperty(v) ? s || (s = []) : (s = s || []).push(v, null));
      for (v in p) {
        var w = p[v], M = f != null ? f[v] : void 0;
        if (!(!p.hasOwnProperty(v) || w === M || w == null && M == null))
          if (v === $s)
            if (w && Object.freeze(w), M) {
              for (y in M)
                M.hasOwnProperty(y) && (!w || !w.hasOwnProperty(y)) && (g || (g = {}), g[y] = "");
              for (y in w)
                w.hasOwnProperty(y) && M[y] !== w[y] && (g || (g = {}), g[y] = w[y]);
            } else
              g || (s || (s = []), s.push(v, g)), g = w;
          else if (v === np) {
            var U = w ? w[Eh] : void 0, j = M ? M[Eh] : void 0;
            U != null && j !== U && (s = s || []).push(v, U);
          } else v === Bs ? (typeof w == "string" || typeof w == "number") && (s = s || []).push(v, "" + w) : v === Sh || v === _o || (Ze.hasOwnProperty(v) ? (w != null && (typeof w != "function" && Rh(v, w), v === "onScroll" && gn("scroll", e)), !s && M !== w && (s = [])) : (s = s || []).push(v, w));
      }
      return g && (Jm(g, p[$s]), (s = s || []).push($s, g)), s;
    }
    function FT(e, t, a, i, u) {
      a === "input" && u.type === "radio" && u.name != null && h(e, u);
      var s = Rl(a, i), f = Rl(a, u);
      switch (MT(e, t, s, f), a) {
        case "input":
          C(e, u);
          break;
        case "textarea":
          tv(e, u);
          break;
        case "select":
          oc(e, u);
          break;
      }
    }
    function jT(e) {
      {
        var t = e.toLowerCase();
        return ts.hasOwnProperty(t) && ts[t] || null;
      }
    }
    function HT(e, t, a, i, u, s, f) {
      var p, v;
      switch (p = Rl(t, a), Ch(t, a), t) {
        case "dialog":
          gn("cancel", e), gn("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          gn("load", e);
          break;
        case "video":
        case "audio":
          for (var y = 0; y < Jd.length; y++)
            gn(Jd[y], e);
          break;
        case "source":
          gn("error", e);
          break;
        case "img":
        case "image":
        case "link":
          gn("error", e), gn("load", e);
          break;
        case "details":
          gn("toggle", e);
          break;
        case "input":
          Ja(e, a), gn("invalid", e);
          break;
        case "option":
          wt(e, a);
          break;
        case "select":
          uu(e, a), gn("invalid", e);
          break;
        case "textarea":
          Kf(e, a), gn("invalid", e);
          break;
      }
      fc(t, a);
      {
        v = /* @__PURE__ */ new Set();
        for (var g = e.attributes, b = 0; b < g.length; b++) {
          var w = g[b].name.toLowerCase();
          switch (w) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              v.add(g[b].name);
          }
        }
      }
      var M = null;
      for (var U in a)
        if (a.hasOwnProperty(U)) {
          var j = a[U];
          if (U === Bs)
            typeof j == "string" ? e.textContent !== j && (a[_o] !== !0 && wh(e.textContent, j, s, f), M = [Bs, j]) : typeof j == "number" && e.textContent !== "" + j && (a[_o] !== !0 && wh(e.textContent, j, s, f), M = [Bs, "" + j]);
          else if (Ze.hasOwnProperty(U))
            j != null && (typeof j != "function" && Rh(U, j), U === "onScroll" && gn("scroll", e));
          else if (f && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof p == "boolean") {
            var le = void 0, Le = Jt(U);
            if (a[_o] !== !0) {
              if (!(U === Sh || U === _o || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              U === "value" || U === "checked" || U === "selected")) {
                if (U === np) {
                  var we = e.innerHTML, Ct = j ? j[Eh] : void 0;
                  if (Ct != null) {
                    var ht = NE(e, Ct);
                    ht !== we && rp(U, we, ht);
                  }
                } else if (U === $s) {
                  if (v.delete(U), ME) {
                    var k = Km(j);
                    le = e.getAttribute("style"), k !== le && rp(U, le, k);
                  }
                } else if (p && !_)
                  v.delete(U.toLowerCase()), le = eu(e, U, j), j !== le && rp(U, le, j);
                else if (!pn(U, Le, p) && !qn(U, j, Le, p)) {
                  var H = !1;
                  if (Le !== null)
                    v.delete(Le.attributeName), le = pl(e, U, j, Le);
                  else {
                    var O = i;
                    if (O === Bi && (O = ed(t)), O === Bi)
                      v.delete(U.toLowerCase());
                    else {
                      var G = jT(U);
                      G !== null && G !== U && (H = !0, v.delete(G)), v.delete(U);
                    }
                    le = eu(e, U, j);
                  }
                  var fe = _;
                  !fe && j !== le && !H && rp(U, le, j);
                }
              }
            }
          }
        }
      switch (f && // $FlowFixMe - Should be inferred as not undefined.
      v.size > 0 && a[_o] !== !0 && LE(v), t) {
        case "input":
          Za(e), N(e, a, !0);
          break;
        case "textarea":
          Za(e), nv(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && xh(e);
          break;
      }
      return M;
    }
    function VT(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function _y(e, t) {
      {
        if (Fa)
          return;
        Fa = !0, S("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function Dy(e, t) {
      {
        if (Fa)
          return;
        Fa = !0, S('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function ky(e, t, a) {
      {
        if (Fa)
          return;
        Fa = !0, S("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function Oy(e, t) {
      {
        if (t === "" || Fa)
          return;
        Fa = !0, S('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function PT(e, t, a) {
      switch (t) {
        case "input":
          F(e, a);
          return;
        case "textarea":
          Wm(e, a);
          return;
        case "select":
          qf(e, a);
          return;
      }
    }
    var ap = function() {
    }, ip = function() {
    };
    {
      var BT = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], UE = [
        "applet",
        "caption",
        "html",
        "table",
        "td",
        "th",
        "marquee",
        "object",
        "template",
        // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
        // TODO: Distinguish by namespace here -- for <title>, including it here
        // errs on the side of fewer warnings
        "foreignObject",
        "desc",
        "title"
      ], $T = UE.concat(["button"]), YT = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], AE = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      ip = function(e, t) {
        var a = Je({}, e || AE), i = {
          tag: t
        };
        return UE.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), $T.indexOf(t) !== -1 && (a.pTagInButtonScope = null), BT.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var IT = function(e, t) {
        switch (t) {
          case "select":
            return e === "option" || e === "optgroup" || e === "#text";
          case "optgroup":
            return e === "option" || e === "#text";
          case "option":
            return e === "#text";
          case "tr":
            return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
          case "tbody":
          case "thead":
          case "tfoot":
            return e === "tr" || e === "style" || e === "script" || e === "template";
          case "colgroup":
            return e === "col" || e === "template";
          case "table":
            return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
          case "head":
            return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
          case "html":
            return e === "head" || e === "body" || e === "frameset";
          case "frameset":
            return e === "frame";
          case "#document":
            return e === "html";
        }
        switch (e) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
          case "rp":
          case "rt":
            return YT.indexOf(t) === -1;
          case "body":
          case "caption":
          case "col":
          case "colgroup":
          case "frameset":
          case "frame":
          case "head":
          case "html":
          case "tbody":
          case "td":
          case "tfoot":
          case "th":
          case "thead":
          case "tr":
            return t == null;
        }
        return !0;
      }, QT = function(e, t) {
        switch (e) {
          case "address":
          case "article":
          case "aside":
          case "blockquote":
          case "center":
          case "details":
          case "dialog":
          case "dir":
          case "div":
          case "dl":
          case "fieldset":
          case "figcaption":
          case "figure":
          case "footer":
          case "header":
          case "hgroup":
          case "main":
          case "menu":
          case "nav":
          case "ol":
          case "p":
          case "section":
          case "summary":
          case "ul":
          case "pre":
          case "listing":
          case "table":
          case "hr":
          case "xmp":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t.pTagInButtonScope;
          case "form":
            return t.formTag || t.pTagInButtonScope;
          case "li":
            return t.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return t.dlItemTagAutoclosing;
          case "button":
            return t.buttonTagInScope;
          case "a":
            return t.aTagInScope;
          case "nobr":
            return t.nobrTagInScope;
        }
        return null;
      }, FE = {};
      ap = function(e, t, a) {
        a = a || AE;
        var i = a.current, u = i && i.tag;
        t != null && (e != null && S("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var s = IT(e, u) ? null : i, f = s ? null : QT(e, a), p = s || f;
        if (p) {
          var v = p.tag, y = !!s + "|" + e + "|" + v;
          if (!FE[y]) {
            FE[y] = !0;
            var g = e, b = "";
            if (e === "#text" ? /\S/.test(t) ? g = "Text nodes" : (g = "Whitespace text nodes", b = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : g = "<" + e + ">", s) {
              var w = "";
              v === "table" && e === "tr" && (w += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), S("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", g, v, b, w);
            } else
              S("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", g, v);
          }
        }
      };
    }
    var bh = "suppressHydrationWarning", _h = "$", Dh = "/$", lp = "$?", up = "$!", WT = "style", Ly = null, My = null;
    function GT(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case Yi:
        case nd: {
          t = i === Yi ? "#document" : "#fragment";
          var u = e.documentElement;
          a = u ? u.namespaceURI : td(null, "");
          break;
        }
        default: {
          var s = i === Ln ? e.parentNode : e, f = s.namespaceURI || null;
          t = s.tagName, a = td(f, t);
          break;
        }
      }
      {
        var p = t.toLowerCase(), v = ip(null, p);
        return {
          namespace: a,
          ancestorInfo: v
        };
      }
    }
    function qT(e, t, a) {
      {
        var i = e, u = td(i.namespace, t), s = ip(i.ancestorInfo, t);
        return {
          namespace: u,
          ancestorInfo: s
        };
      }
    }
    function oD(e) {
      return e;
    }
    function XT(e) {
      Ly = Fn(), My = cT();
      var t = null;
      return Qn(!1), t;
    }
    function KT(e) {
      fT(My), Qn(Ly), Ly = null, My = null;
    }
    function ZT(e, t, a, i, u) {
      var s;
      {
        var f = i;
        if (ap(e, null, f.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var p = "" + t.children, v = ip(f.ancestorInfo, e);
          ap(null, p, v);
        }
        s = f.namespace;
      }
      var y = NT(e, t, a, s);
      return cp(u, y), Vy(y, t), y;
    }
    function JT(e, t) {
      e.appendChild(t);
    }
    function e1(e, t, a, i, u) {
      switch (UT(e, t, a, i), t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!a.autoFocus;
        case "img":
          return !0;
        default:
          return !1;
      }
    }
    function t1(e, t, a, i, u, s) {
      {
        var f = s;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var p = "" + i.children, v = ip(f.ancestorInfo, t);
          ap(null, p, v);
        }
      }
      return AT(e, t, a, i);
    }
    function Ny(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function n1(e, t, a, i) {
      {
        var u = a;
        ap(null, e, u.ancestorInfo);
      }
      var s = zT(e, t);
      return cp(i, s), s;
    }
    function r1() {
      var e = window.event;
      return e === void 0 ? Na : af(e.type);
    }
    var zy = typeof setTimeout == "function" ? setTimeout : void 0, a1 = typeof clearTimeout == "function" ? clearTimeout : void 0, Uy = -1, jE = typeof Promise == "function" ? Promise : void 0, i1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof jE < "u" ? function(e) {
      return jE.resolve(null).then(e).catch(l1);
    } : zy;
    function l1(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function u1(e, t, a, i) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          return;
        case "img": {
          a.src && (e.src = a.src);
          return;
        }
      }
    }
    function o1(e, t, a, i, u, s) {
      FT(e, t, a, i, u), Vy(e, u);
    }
    function HE(e) {
      ro(e, "");
    }
    function s1(e, t, a) {
      e.nodeValue = a;
    }
    function c1(e, t) {
      e.appendChild(t);
    }
    function f1(e, t) {
      var a;
      e.nodeType === Ln ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && xh(a);
    }
    function d1(e, t, a) {
      e.insertBefore(t, a);
    }
    function p1(e, t, a) {
      e.nodeType === Ln ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function v1(e, t) {
      e.removeChild(t);
    }
    function h1(e, t) {
      e.nodeType === Ln ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function Ay(e, t) {
      var a = t, i = 0;
      do {
        var u = a.nextSibling;
        if (e.removeChild(a), u && u.nodeType === Ln) {
          var s = u.data;
          if (s === Dh)
            if (i === 0) {
              e.removeChild(u), Du(t);
              return;
            } else
              i--;
          else (s === _h || s === lp || s === up) && i++;
        }
        a = u;
      } while (a);
      Du(t);
    }
    function m1(e, t) {
      e.nodeType === Ln ? Ay(e.parentNode, t) : e.nodeType === Ir && Ay(e, t), Du(e);
    }
    function y1(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function g1(e) {
      e.nodeValue = "";
    }
    function S1(e, t) {
      e = e;
      var a = t[WT], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = cc("display", i);
    }
    function E1(e, t) {
      e.nodeValue = t;
    }
    function C1(e) {
      e.nodeType === Ir ? e.textContent = "" : e.nodeType === Yi && e.documentElement && e.removeChild(e.documentElement);
    }
    function R1(e, t, a) {
      return e.nodeType !== Ir || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function T1(e, t) {
      return t === "" || e.nodeType !== $i ? null : e;
    }
    function w1(e) {
      return e.nodeType !== Ln ? null : e;
    }
    function VE(e) {
      return e.data === lp;
    }
    function Fy(e) {
      return e.data === up;
    }
    function x1(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, u;
      return t && (a = t.dgst, i = t.msg, u = t.stck), {
        message: i,
        digest: a,
        stack: u
      };
    }
    function b1(e, t) {
      e._reactRetry = t;
    }
    function kh(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === Ir || t === $i)
          break;
        if (t === Ln) {
          var a = e.data;
          if (a === _h || a === up || a === lp)
            break;
          if (a === Dh)
            return null;
        }
      }
      return e;
    }
    function op(e) {
      return kh(e.nextSibling);
    }
    function _1(e) {
      return kh(e.firstChild);
    }
    function D1(e) {
      return kh(e.firstChild);
    }
    function k1(e) {
      return kh(e.nextSibling);
    }
    function O1(e, t, a, i, u, s, f) {
      cp(s, e), Vy(e, a);
      var p;
      {
        var v = u;
        p = v.namespace;
      }
      var y = (s.mode & ut) !== De;
      return HT(e, t, a, p, i, y, f);
    }
    function L1(e, t, a, i) {
      return cp(a, e), a.mode & ut, VT(e, t);
    }
    function M1(e, t) {
      cp(t, e);
    }
    function N1(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === Ln) {
          var i = t.data;
          if (i === Dh) {
            if (a === 0)
              return op(t);
            a--;
          } else (i === _h || i === up || i === lp) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function PE(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === Ln) {
          var i = t.data;
          if (i === _h || i === up || i === lp) {
            if (a === 0)
              return t;
            a--;
          } else i === Dh && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function z1(e) {
      Du(e);
    }
    function U1(e) {
      Du(e);
    }
    function A1(e) {
      return e !== "head" && e !== "body";
    }
    function F1(e, t, a, i) {
      var u = !0;
      wh(t.nodeValue, a, i, u);
    }
    function j1(e, t, a, i, u, s) {
      if (t[bh] !== !0) {
        var f = !0;
        wh(i.nodeValue, u, s, f);
      }
    }
    function H1(e, t) {
      t.nodeType === Ir ? _y(e, t) : t.nodeType === Ln || Dy(e, t);
    }
    function V1(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === Ir ? _y(a, t) : t.nodeType === Ln || Dy(a, t));
      }
    }
    function P1(e, t, a, i, u) {
      (u || t[bh] !== !0) && (i.nodeType === Ir ? _y(a, i) : i.nodeType === Ln || Dy(a, i));
    }
    function B1(e, t, a) {
      ky(e, t);
    }
    function $1(e, t) {
      Oy(e, t);
    }
    function Y1(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && ky(i, t);
      }
    }
    function I1(e, t) {
      {
        var a = e.parentNode;
        a !== null && Oy(a, t);
      }
    }
    function Q1(e, t, a, i, u, s) {
      (s || t[bh] !== !0) && ky(a, i);
    }
    function W1(e, t, a, i, u) {
      (u || t[bh] !== !0) && Oy(a, i);
    }
    function G1(e) {
      S("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function q1(e) {
      ep(e);
    }
    var Sf = Math.random().toString(36).slice(2), Ef = "__reactFiber$" + Sf, jy = "__reactProps$" + Sf, sp = "__reactContainer$" + Sf, Hy = "__reactEvents$" + Sf, X1 = "__reactListeners$" + Sf, K1 = "__reactHandles$" + Sf;
    function Z1(e) {
      delete e[Ef], delete e[jy], delete e[Hy], delete e[X1], delete e[K1];
    }
    function cp(e, t) {
      t[Ef] = e;
    }
    function Oh(e, t) {
      t[sp] = e;
    }
    function BE(e) {
      e[sp] = null;
    }
    function fp(e) {
      return !!e[sp];
    }
    function Ys(e) {
      var t = e[Ef];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[sp] || a[Ef], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var u = PE(e); u !== null; ) {
              var s = u[Ef];
              if (s)
                return s;
              u = PE(u);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function Do(e) {
      var t = e[Ef] || e[sp];
      return t && (t.tag === ue || t.tag === Ie || t.tag === be || t.tag === ee) ? t : null;
    }
    function Cf(e) {
      if (e.tag === ue || e.tag === Ie)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function Lh(e) {
      return e[jy] || null;
    }
    function Vy(e, t) {
      e[jy] = t;
    }
    function J1(e) {
      var t = e[Hy];
      return t === void 0 && (t = e[Hy] = /* @__PURE__ */ new Set()), t;
    }
    var $E = {}, YE = A.ReactDebugCurrentFrame;
    function Mh(e) {
      if (e) {
        var t = e._owner, a = Hi(e.type, e._source, t ? t.type : null);
        YE.setExtraStackFrame(a);
      } else
        YE.setExtraStackFrame(null);
    }
    function tl(e, t, a, i, u) {
      {
        var s = Function.call.bind(wr);
        for (var f in e)
          if (s(e, f)) {
            var p = void 0;
            try {
              if (typeof e[f] != "function") {
                var v = Error((i || "React class") + ": " + a + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw v.name = "Invariant Violation", v;
              }
              p = e[f](t, f, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (y) {
              p = y;
            }
            p && !(p instanceof Error) && (Mh(u), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, f, typeof p), Mh(null)), p instanceof Error && !(p.message in $E) && ($E[p.message] = !0, Mh(u), S("Failed %s type: %s", a, p.message), Mh(null));
          }
      }
    }
    var Py = [], Nh;
    Nh = [];
    var zu = -1;
    function ko(e) {
      return {
        current: e
      };
    }
    function na(e, t) {
      if (zu < 0) {
        S("Unexpected pop.");
        return;
      }
      t !== Nh[zu] && S("Unexpected Fiber popped."), e.current = Py[zu], Py[zu] = null, Nh[zu] = null, zu--;
    }
    function ra(e, t, a) {
      zu++, Py[zu] = e.current, Nh[zu] = a, e.current = t;
    }
    var By;
    By = {};
    var li = {};
    Object.freeze(li);
    var Uu = ko(li), Bl = ko(!1), $y = li;
    function Rf(e, t, a) {
      return a && $l(t) ? $y : Uu.current;
    }
    function IE(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Tf(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return li;
        var u = e.stateNode;
        if (u && u.__reactInternalMemoizedUnmaskedChildContext === t)
          return u.__reactInternalMemoizedMaskedChildContext;
        var s = {};
        for (var f in i)
          s[f] = t[f];
        {
          var p = Pe(e) || "Unknown";
          tl(i, s, "context", p);
        }
        return u && IE(e, t, s), s;
      }
    }
    function zh() {
      return Bl.current;
    }
    function $l(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function Uh(e) {
      na(Bl, e), na(Uu, e);
    }
    function Yy(e) {
      na(Bl, e), na(Uu, e);
    }
    function QE(e, t, a) {
      {
        if (Uu.current !== li)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        ra(Uu, t, e), ra(Bl, a, e);
      }
    }
    function WE(e, t, a) {
      {
        var i = e.stateNode, u = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var s = Pe(e) || "Unknown";
            By[s] || (By[s] = !0, S("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", s, s));
          }
          return a;
        }
        var f = i.getChildContext();
        for (var p in f)
          if (!(p in u))
            throw new Error((Pe(e) || "Unknown") + '.getChildContext(): key "' + p + '" is not defined in childContextTypes.');
        {
          var v = Pe(e) || "Unknown";
          tl(u, f, "child context", v);
        }
        return Je({}, a, f);
      }
    }
    function Ah(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || li;
        return $y = Uu.current, ra(Uu, a, e), ra(Bl, Bl.current, e), !0;
      }
    }
    function GE(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var u = WE(e, t, $y);
          i.__reactInternalMemoizedMergedChildContext = u, na(Bl, e), na(Uu, e), ra(Uu, u, e), ra(Bl, a, e);
        } else
          na(Bl, e), ra(Bl, a, e);
      }
    }
    function ew(e) {
      {
        if (!vu(e) || e.tag !== ve)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case ee:
              return t.stateNode.context;
            case ve: {
              var a = t.type;
              if ($l(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var Oo = 0, Fh = 1, Au = null, Iy = !1, Qy = !1;
    function qE(e) {
      Au === null ? Au = [e] : Au.push(e);
    }
    function tw(e) {
      Iy = !0, qE(e);
    }
    function XE() {
      Iy && Lo();
    }
    function Lo() {
      if (!Qy && Au !== null) {
        Qy = !0;
        var e = 0, t = Ua();
        try {
          var a = !0, i = Au;
          for (An(Or); e < i.length; e++) {
            var u = i[e];
            do
              u = u(a);
            while (u !== null);
          }
          Au = null, Iy = !1;
        } catch (s) {
          throw Au !== null && (Au = Au.slice(e + 1)), vd(ss, Lo), s;
        } finally {
          An(t), Qy = !1;
        }
      }
      return null;
    }
    var wf = [], xf = 0, jh = null, Hh = 0, Li = [], Mi = 0, Is = null, Fu = 1, ju = "";
    function nw(e) {
      return Ws(), (e.flags & Ci) !== _e;
    }
    function rw(e) {
      return Ws(), Hh;
    }
    function aw() {
      var e = ju, t = Fu, a = t & ~iw(t);
      return a.toString(32) + e;
    }
    function Qs(e, t) {
      Ws(), wf[xf++] = Hh, wf[xf++] = jh, jh = e, Hh = t;
    }
    function KE(e, t, a) {
      Ws(), Li[Mi++] = Fu, Li[Mi++] = ju, Li[Mi++] = Is, Is = e;
      var i = Fu, u = ju, s = Vh(i) - 1, f = i & ~(1 << s), p = a + 1, v = Vh(t) + s;
      if (v > 30) {
        var y = s - s % 5, g = (1 << y) - 1, b = (f & g).toString(32), w = f >> y, M = s - y, U = Vh(t) + M, j = p << M, le = j | w, Le = b + u;
        Fu = 1 << U | le, ju = Le;
      } else {
        var we = p << s, Ct = we | f, ht = u;
        Fu = 1 << v | Ct, ju = ht;
      }
    }
    function Wy(e) {
      Ws();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        Qs(e, a), KE(e, a, i);
      }
    }
    function Vh(e) {
      return 32 - zn(e);
    }
    function iw(e) {
      return 1 << Vh(e) - 1;
    }
    function Gy(e) {
      for (; e === jh; )
        jh = wf[--xf], wf[xf] = null, Hh = wf[--xf], wf[xf] = null;
      for (; e === Is; )
        Is = Li[--Mi], Li[Mi] = null, ju = Li[--Mi], Li[Mi] = null, Fu = Li[--Mi], Li[Mi] = null;
    }
    function lw() {
      return Ws(), Is !== null ? {
        id: Fu,
        overflow: ju
      } : null;
    }
    function uw(e, t) {
      Ws(), Li[Mi++] = Fu, Li[Mi++] = ju, Li[Mi++] = Is, Fu = t.id, ju = t.overflow, Is = e;
    }
    function Ws() {
      Ur() || S("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var zr = null, Ni = null, nl = !1, Gs = !1, Mo = null;
    function ow() {
      nl && S("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function ZE() {
      Gs = !0;
    }
    function sw() {
      return Gs;
    }
    function cw(e) {
      var t = e.stateNode.containerInfo;
      return Ni = D1(t), zr = e, nl = !0, Mo = null, Gs = !1, !0;
    }
    function fw(e, t, a) {
      return Ni = k1(t), zr = e, nl = !0, Mo = null, Gs = !1, a !== null && uw(e, a), !0;
    }
    function JE(e, t) {
      switch (e.tag) {
        case ee: {
          H1(e.stateNode.containerInfo, t);
          break;
        }
        case ue: {
          var a = (e.mode & ut) !== De;
          P1(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case be: {
          var i = e.memoizedState;
          i.dehydrated !== null && V1(i.dehydrated, t);
          break;
        }
      }
    }
    function eC(e, t) {
      JE(e, t);
      var a = h_();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= Da) : i.push(a);
    }
    function qy(e, t) {
      {
        if (Gs)
          return;
        switch (e.tag) {
          case ee: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case ue:
                var i = t.type;
                t.pendingProps, B1(a, i);
                break;
              case Ie:
                var u = t.pendingProps;
                $1(a, u);
                break;
            }
            break;
          }
          case ue: {
            var s = e.type, f = e.memoizedProps, p = e.stateNode;
            switch (t.tag) {
              case ue: {
                var v = t.type, y = t.pendingProps, g = (e.mode & ut) !== De;
                Q1(
                  s,
                  f,
                  p,
                  v,
                  y,
                  // TODO: Delete this argument when we remove the legacy root API.
                  g
                );
                break;
              }
              case Ie: {
                var b = t.pendingProps, w = (e.mode & ut) !== De;
                W1(
                  s,
                  f,
                  p,
                  b,
                  // TODO: Delete this argument when we remove the legacy root API.
                  w
                );
                break;
              }
            }
            break;
          }
          case be: {
            var M = e.memoizedState, U = M.dehydrated;
            if (U !== null) switch (t.tag) {
              case ue:
                var j = t.type;
                t.pendingProps, Y1(U, j);
                break;
              case Ie:
                var le = t.pendingProps;
                I1(U, le);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function tC(e, t) {
      t.flags = t.flags & ~Wr | hn, qy(e, t);
    }
    function nC(e, t) {
      switch (e.tag) {
        case ue: {
          var a = e.type;
          e.pendingProps;
          var i = R1(t, a);
          return i !== null ? (e.stateNode = i, zr = e, Ni = _1(i), !0) : !1;
        }
        case Ie: {
          var u = e.pendingProps, s = T1(t, u);
          return s !== null ? (e.stateNode = s, zr = e, Ni = null, !0) : !1;
        }
        case be: {
          var f = w1(t);
          if (f !== null) {
            var p = {
              dehydrated: f,
              treeContext: lw(),
              retryLane: Kr
            };
            e.memoizedState = p;
            var v = m_(f);
            return v.return = e, e.child = v, zr = e, Ni = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function Xy(e) {
      return (e.mode & ut) !== De && (e.flags & xe) === _e;
    }
    function Ky(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function Zy(e) {
      if (nl) {
        var t = Ni;
        if (!t) {
          Xy(e) && (qy(zr, e), Ky()), tC(zr, e), nl = !1, zr = e;
          return;
        }
        var a = t;
        if (!nC(e, t)) {
          Xy(e) && (qy(zr, e), Ky()), t = op(a);
          var i = zr;
          if (!t || !nC(e, t)) {
            tC(zr, e), nl = !1, zr = e;
            return;
          }
          eC(i, a);
        }
      }
    }
    function dw(e, t, a) {
      var i = e.stateNode, u = !Gs, s = O1(i, e.type, e.memoizedProps, t, a, e, u);
      return e.updateQueue = s, s !== null;
    }
    function pw(e) {
      var t = e.stateNode, a = e.memoizedProps, i = L1(t, a, e);
      if (i) {
        var u = zr;
        if (u !== null)
          switch (u.tag) {
            case ee: {
              var s = u.stateNode.containerInfo, f = (u.mode & ut) !== De;
              F1(
                s,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                f
              );
              break;
            }
            case ue: {
              var p = u.type, v = u.memoizedProps, y = u.stateNode, g = (u.mode & ut) !== De;
              j1(
                p,
                v,
                y,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                g
              );
              break;
            }
          }
      }
      return i;
    }
    function vw(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      M1(a, e);
    }
    function hw(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return N1(a);
    }
    function rC(e) {
      for (var t = e.return; t !== null && t.tag !== ue && t.tag !== ee && t.tag !== be; )
        t = t.return;
      zr = t;
    }
    function Ph(e) {
      if (e !== zr)
        return !1;
      if (!nl)
        return rC(e), nl = !0, !1;
      if (e.tag !== ee && (e.tag !== ue || A1(e.type) && !Ny(e.type, e.memoizedProps))) {
        var t = Ni;
        if (t)
          if (Xy(e))
            aC(e), Ky();
          else
            for (; t; )
              eC(e, t), t = op(t);
      }
      return rC(e), e.tag === be ? Ni = hw(e) : Ni = zr ? op(e.stateNode) : null, !0;
    }
    function mw() {
      return nl && Ni !== null;
    }
    function aC(e) {
      for (var t = Ni; t; )
        JE(e, t), t = op(t);
    }
    function bf() {
      zr = null, Ni = null, nl = !1, Gs = !1;
    }
    function iC() {
      Mo !== null && (Z0(Mo), Mo = null);
    }
    function Ur() {
      return nl;
    }
    function Jy(e) {
      Mo === null ? Mo = [e] : Mo.push(e);
    }
    var yw = A.ReactCurrentBatchConfig, gw = null;
    function Sw() {
      return yw.transition;
    }
    var rl = {
      recordUnsafeLifecycleWarnings: function(e, t) {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function(e, t) {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    };
    {
      var Ew = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & Wt && (t = a), a = a.return;
        return t;
      }, qs = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, dp = [], pp = [], vp = [], hp = [], mp = [], yp = [], Xs = /* @__PURE__ */ new Set();
      rl.recordUnsafeLifecycleWarnings = function(e, t) {
        Xs.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && dp.push(e), e.mode & Wt && typeof t.UNSAFE_componentWillMount == "function" && pp.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && vp.push(e), e.mode & Wt && typeof t.UNSAFE_componentWillReceiveProps == "function" && hp.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && mp.push(e), e.mode & Wt && typeof t.UNSAFE_componentWillUpdate == "function" && yp.push(e));
      }, rl.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        dp.length > 0 && (dp.forEach(function(w) {
          e.add(Pe(w) || "Component"), Xs.add(w.type);
        }), dp = []);
        var t = /* @__PURE__ */ new Set();
        pp.length > 0 && (pp.forEach(function(w) {
          t.add(Pe(w) || "Component"), Xs.add(w.type);
        }), pp = []);
        var a = /* @__PURE__ */ new Set();
        vp.length > 0 && (vp.forEach(function(w) {
          a.add(Pe(w) || "Component"), Xs.add(w.type);
        }), vp = []);
        var i = /* @__PURE__ */ new Set();
        hp.length > 0 && (hp.forEach(function(w) {
          i.add(Pe(w) || "Component"), Xs.add(w.type);
        }), hp = []);
        var u = /* @__PURE__ */ new Set();
        mp.length > 0 && (mp.forEach(function(w) {
          u.add(Pe(w) || "Component"), Xs.add(w.type);
        }), mp = []);
        var s = /* @__PURE__ */ new Set();
        if (yp.length > 0 && (yp.forEach(function(w) {
          s.add(Pe(w) || "Component"), Xs.add(w.type);
        }), yp = []), t.size > 0) {
          var f = qs(t);
          S(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, f);
        }
        if (i.size > 0) {
          var p = qs(i);
          S(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, p);
        }
        if (s.size > 0) {
          var v = qs(s);
          S(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, v);
        }
        if (e.size > 0) {
          var y = qs(e);
          Ye(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, y);
        }
        if (a.size > 0) {
          var g = qs(a);
          Ye(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, g);
        }
        if (u.size > 0) {
          var b = qs(u);
          Ye(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, b);
        }
      };
      var Bh = /* @__PURE__ */ new Map(), lC = /* @__PURE__ */ new Set();
      rl.recordLegacyContextWarning = function(e, t) {
        var a = Ew(e);
        if (a === null) {
          S("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!lC.has(e.type)) {
          var i = Bh.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], Bh.set(a, i)), i.push(e));
        }
      }, rl.flushLegacyContextWarning = function() {
        Bh.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(s) {
              i.add(Pe(s) || "Component"), lC.add(s.type);
            });
            var u = qs(i);
            try {
              Yt(a), S(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u);
            } finally {
              on();
            }
          }
        });
      }, rl.discardPendingWarnings = function() {
        dp = [], pp = [], vp = [], hp = [], mp = [], yp = [], Bh = /* @__PURE__ */ new Map();
      };
    }
    var eg, tg, ng, rg, ag, uC = function(e, t) {
    };
    eg = !1, tg = !1, ng = {}, rg = {}, ag = {}, uC = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = Pe(t) || "Component";
        rg[a] || (rg[a] = !0, S('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function Cw(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function gp(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & Wt || V) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== ve) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !Cw(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var u = Pe(e) || "Component";
          ng[u] || (S('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', u, i), ng[u] = !0);
        }
        if (a._owner) {
          var s = a._owner, f;
          if (s) {
            var p = s;
            if (p.tag !== ve)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            f = p.stateNode;
          }
          if (!f)
            throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
          var v = f;
          si(i, "ref");
          var y = "" + i;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === y)
            return t.ref;
          var g = function(b) {
            var w = v.refs;
            b === null ? delete w[y] : w[y] = b;
          };
          return g._stringRef = y, g;
        } else {
          if (typeof i != "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!a._owner)
            throw new Error("Element ref was specified as a string (" + i + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
        }
      }
      return i;
    }
    function $h(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function Yh(e) {
      {
        var t = Pe(e) || "Component";
        if (ag[t])
          return;
        ag[t] = !0, S("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function oC(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function sC(e) {
      function t(k, H) {
        if (e) {
          var O = k.deletions;
          O === null ? (k.deletions = [H], k.flags |= Da) : O.push(H);
        }
      }
      function a(k, H) {
        if (!e)
          return null;
        for (var O = H; O !== null; )
          t(k, O), O = O.sibling;
        return null;
      }
      function i(k, H) {
        for (var O = /* @__PURE__ */ new Map(), G = H; G !== null; )
          G.key !== null ? O.set(G.key, G) : O.set(G.index, G), G = G.sibling;
        return O;
      }
      function u(k, H) {
        var O = ic(k, H);
        return O.index = 0, O.sibling = null, O;
      }
      function s(k, H, O) {
        if (k.index = O, !e)
          return k.flags |= Ci, H;
        var G = k.alternate;
        if (G !== null) {
          var fe = G.index;
          return fe < H ? (k.flags |= hn, H) : fe;
        } else
          return k.flags |= hn, H;
      }
      function f(k) {
        return e && k.alternate === null && (k.flags |= hn), k;
      }
      function p(k, H, O, G) {
        if (H === null || H.tag !== Ie) {
          var fe = JS(O, k.mode, G);
          return fe.return = k, fe;
        } else {
          var oe = u(H, O);
          return oe.return = k, oe;
        }
      }
      function v(k, H, O, G) {
        var fe = O.type;
        if (fe === fi)
          return g(k, H, O.props.children, G, O.key);
        if (H !== null && (H.elementType === fe || // Keep this check inline so it only runs on the false path:
        vR(H, O) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof fe == "object" && fe !== null && fe.$$typeof === Be && oC(fe) === H.type)) {
          var oe = u(H, O.props);
          return oe.ref = gp(k, H, O), oe.return = k, oe._debugSource = O._source, oe._debugOwner = O._owner, oe;
        }
        var He = ZS(O, k.mode, G);
        return He.ref = gp(k, H, O), He.return = k, He;
      }
      function y(k, H, O, G) {
        if (H === null || H.tag !== Ce || H.stateNode.containerInfo !== O.containerInfo || H.stateNode.implementation !== O.implementation) {
          var fe = eE(O, k.mode, G);
          return fe.return = k, fe;
        } else {
          var oe = u(H, O.children || []);
          return oe.return = k, oe;
        }
      }
      function g(k, H, O, G, fe) {
        if (H === null || H.tag !== yt) {
          var oe = $o(O, k.mode, G, fe);
          return oe.return = k, oe;
        } else {
          var He = u(H, O);
          return He.return = k, He;
        }
      }
      function b(k, H, O) {
        if (typeof H == "string" && H !== "" || typeof H == "number") {
          var G = JS("" + H, k.mode, O);
          return G.return = k, G;
        }
        if (typeof H == "object" && H !== null) {
          switch (H.$$typeof) {
            case br: {
              var fe = ZS(H, k.mode, O);
              return fe.ref = gp(k, null, H), fe.return = k, fe;
            }
            case nr: {
              var oe = eE(H, k.mode, O);
              return oe.return = k, oe;
            }
            case Be: {
              var He = H._payload, We = H._init;
              return b(k, We(He), O);
            }
          }
          if (rt(H) || qe(H)) {
            var qt = $o(H, k.mode, O, null);
            return qt.return = k, qt;
          }
          $h(k, H);
        }
        return typeof H == "function" && Yh(k), null;
      }
      function w(k, H, O, G) {
        var fe = H !== null ? H.key : null;
        if (typeof O == "string" && O !== "" || typeof O == "number")
          return fe !== null ? null : p(k, H, "" + O, G);
        if (typeof O == "object" && O !== null) {
          switch (O.$$typeof) {
            case br:
              return O.key === fe ? v(k, H, O, G) : null;
            case nr:
              return O.key === fe ? y(k, H, O, G) : null;
            case Be: {
              var oe = O._payload, He = O._init;
              return w(k, H, He(oe), G);
            }
          }
          if (rt(O) || qe(O))
            return fe !== null ? null : g(k, H, O, G, null);
          $h(k, O);
        }
        return typeof O == "function" && Yh(k), null;
      }
      function M(k, H, O, G, fe) {
        if (typeof G == "string" && G !== "" || typeof G == "number") {
          var oe = k.get(O) || null;
          return p(H, oe, "" + G, fe);
        }
        if (typeof G == "object" && G !== null) {
          switch (G.$$typeof) {
            case br: {
              var He = k.get(G.key === null ? O : G.key) || null;
              return v(H, He, G, fe);
            }
            case nr: {
              var We = k.get(G.key === null ? O : G.key) || null;
              return y(H, We, G, fe);
            }
            case Be:
              var qt = G._payload, Nt = G._init;
              return M(k, H, O, Nt(qt), fe);
          }
          if (rt(G) || qe(G)) {
            var Wn = k.get(O) || null;
            return g(H, Wn, G, fe, null);
          }
          $h(H, G);
        }
        return typeof G == "function" && Yh(H), null;
      }
      function U(k, H, O) {
        {
          if (typeof k != "object" || k === null)
            return H;
          switch (k.$$typeof) {
            case br:
            case nr:
              uC(k, O);
              var G = k.key;
              if (typeof G != "string")
                break;
              if (H === null) {
                H = /* @__PURE__ */ new Set(), H.add(G);
                break;
              }
              if (!H.has(G)) {
                H.add(G);
                break;
              }
              S("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", G);
              break;
            case Be:
              var fe = k._payload, oe = k._init;
              U(oe(fe), H, O);
              break;
          }
        }
        return H;
      }
      function j(k, H, O, G) {
        for (var fe = null, oe = 0; oe < O.length; oe++) {
          var He = O[oe];
          fe = U(He, fe, k);
        }
        for (var We = null, qt = null, Nt = H, Wn = 0, zt = 0, Hn = null; Nt !== null && zt < O.length; zt++) {
          Nt.index > zt ? (Hn = Nt, Nt = null) : Hn = Nt.sibling;
          var ia = w(k, Nt, O[zt], G);
          if (ia === null) {
            Nt === null && (Nt = Hn);
            break;
          }
          e && Nt && ia.alternate === null && t(k, Nt), Wn = s(ia, Wn, zt), qt === null ? We = ia : qt.sibling = ia, qt = ia, Nt = Hn;
        }
        if (zt === O.length) {
          if (a(k, Nt), Ur()) {
            var Br = zt;
            Qs(k, Br);
          }
          return We;
        }
        if (Nt === null) {
          for (; zt < O.length; zt++) {
            var oi = b(k, O[zt], G);
            oi !== null && (Wn = s(oi, Wn, zt), qt === null ? We = oi : qt.sibling = oi, qt = oi);
          }
          if (Ur()) {
            var Ea = zt;
            Qs(k, Ea);
          }
          return We;
        }
        for (var Ca = i(k, Nt); zt < O.length; zt++) {
          var la = M(Ca, k, zt, O[zt], G);
          la !== null && (e && la.alternate !== null && Ca.delete(la.key === null ? zt : la.key), Wn = s(la, Wn, zt), qt === null ? We = la : qt.sibling = la, qt = la);
        }
        if (e && Ca.forEach(function(If) {
          return t(k, If);
        }), Ur()) {
          var Iu = zt;
          Qs(k, Iu);
        }
        return We;
      }
      function le(k, H, O, G) {
        var fe = qe(O);
        if (typeof fe != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          O[Symbol.toStringTag] === "Generator" && (tg || S("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), tg = !0), O.entries === fe && (eg || S("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), eg = !0);
          var oe = fe.call(O);
          if (oe)
            for (var He = null, We = oe.next(); !We.done; We = oe.next()) {
              var qt = We.value;
              He = U(qt, He, k);
            }
        }
        var Nt = fe.call(O);
        if (Nt == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Wn = null, zt = null, Hn = H, ia = 0, Br = 0, oi = null, Ea = Nt.next(); Hn !== null && !Ea.done; Br++, Ea = Nt.next()) {
          Hn.index > Br ? (oi = Hn, Hn = null) : oi = Hn.sibling;
          var Ca = w(k, Hn, Ea.value, G);
          if (Ca === null) {
            Hn === null && (Hn = oi);
            break;
          }
          e && Hn && Ca.alternate === null && t(k, Hn), ia = s(Ca, ia, Br), zt === null ? Wn = Ca : zt.sibling = Ca, zt = Ca, Hn = oi;
        }
        if (Ea.done) {
          if (a(k, Hn), Ur()) {
            var la = Br;
            Qs(k, la);
          }
          return Wn;
        }
        if (Hn === null) {
          for (; !Ea.done; Br++, Ea = Nt.next()) {
            var Iu = b(k, Ea.value, G);
            Iu !== null && (ia = s(Iu, ia, Br), zt === null ? Wn = Iu : zt.sibling = Iu, zt = Iu);
          }
          if (Ur()) {
            var If = Br;
            Qs(k, If);
          }
          return Wn;
        }
        for (var Xp = i(k, Hn); !Ea.done; Br++, Ea = Nt.next()) {
          var Kl = M(Xp, k, Br, Ea.value, G);
          Kl !== null && (e && Kl.alternate !== null && Xp.delete(Kl.key === null ? Br : Kl.key), ia = s(Kl, ia, Br), zt === null ? Wn = Kl : zt.sibling = Kl, zt = Kl);
        }
        if (e && Xp.forEach(function(W_) {
          return t(k, W_);
        }), Ur()) {
          var Q_ = Br;
          Qs(k, Q_);
        }
        return Wn;
      }
      function Le(k, H, O, G) {
        if (H !== null && H.tag === Ie) {
          a(k, H.sibling);
          var fe = u(H, O);
          return fe.return = k, fe;
        }
        a(k, H);
        var oe = JS(O, k.mode, G);
        return oe.return = k, oe;
      }
      function we(k, H, O, G) {
        for (var fe = O.key, oe = H; oe !== null; ) {
          if (oe.key === fe) {
            var He = O.type;
            if (He === fi) {
              if (oe.tag === yt) {
                a(k, oe.sibling);
                var We = u(oe, O.props.children);
                return We.return = k, We._debugSource = O._source, We._debugOwner = O._owner, We;
              }
            } else if (oe.elementType === He || // Keep this check inline so it only runs on the false path:
            vR(oe, O) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof He == "object" && He !== null && He.$$typeof === Be && oC(He) === oe.type) {
              a(k, oe.sibling);
              var qt = u(oe, O.props);
              return qt.ref = gp(k, oe, O), qt.return = k, qt._debugSource = O._source, qt._debugOwner = O._owner, qt;
            }
            a(k, oe);
            break;
          } else
            t(k, oe);
          oe = oe.sibling;
        }
        if (O.type === fi) {
          var Nt = $o(O.props.children, k.mode, G, O.key);
          return Nt.return = k, Nt;
        } else {
          var Wn = ZS(O, k.mode, G);
          return Wn.ref = gp(k, H, O), Wn.return = k, Wn;
        }
      }
      function Ct(k, H, O, G) {
        for (var fe = O.key, oe = H; oe !== null; ) {
          if (oe.key === fe)
            if (oe.tag === Ce && oe.stateNode.containerInfo === O.containerInfo && oe.stateNode.implementation === O.implementation) {
              a(k, oe.sibling);
              var He = u(oe, O.children || []);
              return He.return = k, He;
            } else {
              a(k, oe);
              break;
            }
          else
            t(k, oe);
          oe = oe.sibling;
        }
        var We = eE(O, k.mode, G);
        return We.return = k, We;
      }
      function ht(k, H, O, G) {
        var fe = typeof O == "object" && O !== null && O.type === fi && O.key === null;
        if (fe && (O = O.props.children), typeof O == "object" && O !== null) {
          switch (O.$$typeof) {
            case br:
              return f(we(k, H, O, G));
            case nr:
              return f(Ct(k, H, O, G));
            case Be:
              var oe = O._payload, He = O._init;
              return ht(k, H, He(oe), G);
          }
          if (rt(O))
            return j(k, H, O, G);
          if (qe(O))
            return le(k, H, O, G);
          $h(k, O);
        }
        return typeof O == "string" && O !== "" || typeof O == "number" ? f(Le(k, H, "" + O, G)) : (typeof O == "function" && Yh(k), a(k, H));
      }
      return ht;
    }
    var _f = sC(!0), cC = sC(!1);
    function Rw(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = ic(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = ic(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function Tw(e, t) {
      for (var a = e.child; a !== null; )
        c_(a, t), a = a.sibling;
    }
    var ig = ko(null), lg;
    lg = {};
    var Ih = null, Df = null, ug = null, Qh = !1;
    function Wh() {
      Ih = null, Df = null, ug = null, Qh = !1;
    }
    function fC() {
      Qh = !0;
    }
    function dC() {
      Qh = !1;
    }
    function pC(e, t, a) {
      ra(ig, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== lg && S("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = lg;
    }
    function og(e, t) {
      var a = ig.current;
      na(ig, t), e._currentValue = a;
    }
    function sg(e, t, a) {
      for (var i = e; i !== null; ) {
        var u = i.alternate;
        if (_u(i.childLanes, t) ? u !== null && !_u(u.childLanes, t) && (u.childLanes = Xe(u.childLanes, t)) : (i.childLanes = Xe(i.childLanes, t), u !== null && (u.childLanes = Xe(u.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && S("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function ww(e, t, a) {
      xw(e, t, a);
    }
    function xw(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var u = void 0, s = i.dependencies;
        if (s !== null) {
          u = i.child;
          for (var f = s.firstContext; f !== null; ) {
            if (f.context === t) {
              if (i.tag === ve) {
                var p = Ts(a), v = Hu(Xt, p);
                v.tag = qh;
                var y = i.updateQueue;
                if (y !== null) {
                  var g = y.shared, b = g.pending;
                  b === null ? v.next = v : (v.next = b.next, b.next = v), g.pending = v;
                }
              }
              i.lanes = Xe(i.lanes, a);
              var w = i.alternate;
              w !== null && (w.lanes = Xe(w.lanes, a)), sg(i.return, a, e), s.lanes = Xe(s.lanes, a);
              break;
            }
            f = f.next;
          }
        } else if (i.tag === dt)
          u = i.type === e.type ? null : i.child;
        else if (i.tag === Kt) {
          var M = i.return;
          if (M === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          M.lanes = Xe(M.lanes, a);
          var U = M.alternate;
          U !== null && (U.lanes = Xe(U.lanes, a)), sg(M, a, e), u = i.sibling;
        } else
          u = i.child;
        if (u !== null)
          u.return = i;
        else
          for (u = i; u !== null; ) {
            if (u === e) {
              u = null;
              break;
            }
            var j = u.sibling;
            if (j !== null) {
              j.return = u.return, u = j;
              break;
            }
            u = u.return;
          }
        i = u;
      }
    }
    function kf(e, t) {
      Ih = e, Df = null, ug = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (Zr(a.lanes, t) && Np(), a.firstContext = null);
      }
    }
    function er(e) {
      Qh && S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (ug !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (Df === null) {
          if (Ih === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          Df = a, Ih.dependencies = {
            lanes: $,
            firstContext: a
          };
        } else
          Df = Df.next = a;
      }
      return t;
    }
    var Ks = null;
    function cg(e) {
      Ks === null ? Ks = [e] : Ks.push(e);
    }
    function bw() {
      if (Ks !== null) {
        for (var e = 0; e < Ks.length; e++) {
          var t = Ks[e], a = t.interleaved;
          if (a !== null) {
            t.interleaved = null;
            var i = a.next, u = t.pending;
            if (u !== null) {
              var s = u.next;
              u.next = i, a.next = s;
            }
            t.pending = a;
          }
        }
        Ks = null;
      }
    }
    function vC(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, cg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Gh(e, i);
    }
    function _w(e, t, a, i) {
      var u = t.interleaved;
      u === null ? (a.next = a, cg(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
    }
    function Dw(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, cg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Gh(e, i);
    }
    function ja(e, t) {
      return Gh(e, t);
    }
    var kw = Gh;
    function Gh(e, t) {
      e.lanes = Xe(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = Xe(a.lanes, t)), a === null && (e.flags & (hn | Wr)) !== _e && cR(e);
      for (var i = e, u = e.return; u !== null; )
        u.childLanes = Xe(u.childLanes, t), a = u.alternate, a !== null ? a.childLanes = Xe(a.childLanes, t) : (u.flags & (hn | Wr)) !== _e && cR(e), i = u, u = u.return;
      if (i.tag === ee) {
        var s = i.stateNode;
        return s;
      } else
        return null;
    }
    var hC = 0, mC = 1, qh = 2, fg = 3, Xh = !1, dg, Kh;
    dg = !1, Kh = null;
    function pg(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: $
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function yC(e, t) {
      var a = t.updateQueue, i = e.updateQueue;
      if (a === i) {
        var u = {
          baseState: i.baseState,
          firstBaseUpdate: i.firstBaseUpdate,
          lastBaseUpdate: i.lastBaseUpdate,
          shared: i.shared,
          effects: i.effects
        };
        t.updateQueue = u;
      }
    }
    function Hu(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: hC,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function No(e, t, a) {
      var i = e.updateQueue;
      if (i === null)
        return null;
      var u = i.shared;
      if (Kh === u && !dg && (S("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), dg = !0), _b()) {
        var s = u.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), u.pending = t, kw(e, a);
      } else
        return Dw(e, u, t, a);
    }
    function Zh(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var u = i.shared;
        if (Ld(a)) {
          var s = u.lanes;
          s = Nd(s, e.pendingLanes);
          var f = Xe(s, a);
          u.lanes = f, ef(e, f);
        }
      }
    }
    function vg(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null) {
        var u = i.updateQueue;
        if (a === u) {
          var s = null, f = null, p = a.firstBaseUpdate;
          if (p !== null) {
            var v = p;
            do {
              var y = {
                eventTime: v.eventTime,
                lane: v.lane,
                tag: v.tag,
                payload: v.payload,
                callback: v.callback,
                next: null
              };
              f === null ? s = f = y : (f.next = y, f = y), v = v.next;
            } while (v !== null);
            f === null ? s = f = t : (f.next = t, f = t);
          } else
            s = f = t;
          a = {
            baseState: u.baseState,
            firstBaseUpdate: s,
            lastBaseUpdate: f,
            shared: u.shared,
            effects: u.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var g = a.lastBaseUpdate;
      g === null ? a.firstBaseUpdate = t : g.next = t, a.lastBaseUpdate = t;
    }
    function Ow(e, t, a, i, u, s) {
      switch (a.tag) {
        case mC: {
          var f = a.payload;
          if (typeof f == "function") {
            fC();
            var p = f.call(s, i, u);
            {
              if (e.mode & Wt) {
                mn(!0);
                try {
                  f.call(s, i, u);
                } finally {
                  mn(!1);
                }
              }
              dC();
            }
            return p;
          }
          return f;
        }
        case fg:
          e.flags = e.flags & ~Xn | xe;
        case hC: {
          var v = a.payload, y;
          if (typeof v == "function") {
            fC(), y = v.call(s, i, u);
            {
              if (e.mode & Wt) {
                mn(!0);
                try {
                  v.call(s, i, u);
                } finally {
                  mn(!1);
                }
              }
              dC();
            }
          } else
            y = v;
          return y == null ? i : Je({}, i, y);
        }
        case qh:
          return Xh = !0, i;
      }
      return i;
    }
    function Jh(e, t, a, i) {
      var u = e.updateQueue;
      Xh = !1, Kh = u.shared;
      var s = u.firstBaseUpdate, f = u.lastBaseUpdate, p = u.shared.pending;
      if (p !== null) {
        u.shared.pending = null;
        var v = p, y = v.next;
        v.next = null, f === null ? s = y : f.next = y, f = v;
        var g = e.alternate;
        if (g !== null) {
          var b = g.updateQueue, w = b.lastBaseUpdate;
          w !== f && (w === null ? b.firstBaseUpdate = y : w.next = y, b.lastBaseUpdate = v);
        }
      }
      if (s !== null) {
        var M = u.baseState, U = $, j = null, le = null, Le = null, we = s;
        do {
          var Ct = we.lane, ht = we.eventTime;
          if (_u(i, Ct)) {
            if (Le !== null) {
              var H = {
                eventTime: ht,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: _t,
                tag: we.tag,
                payload: we.payload,
                callback: we.callback,
                next: null
              };
              Le = Le.next = H;
            }
            M = Ow(e, u, we, M, t, a);
            var O = we.callback;
            if (O !== null && // If the update was already committed, we should not queue its
            // callback again.
            we.lane !== _t) {
              e.flags |= nn;
              var G = u.effects;
              G === null ? u.effects = [we] : G.push(we);
            }
          } else {
            var k = {
              eventTime: ht,
              lane: Ct,
              tag: we.tag,
              payload: we.payload,
              callback: we.callback,
              next: null
            };
            Le === null ? (le = Le = k, j = M) : Le = Le.next = k, U = Xe(U, Ct);
          }
          if (we = we.next, we === null) {
            if (p = u.shared.pending, p === null)
              break;
            var fe = p, oe = fe.next;
            fe.next = null, we = oe, u.lastBaseUpdate = fe, u.shared.pending = null;
          }
        } while (!0);
        Le === null && (j = M), u.baseState = j, u.firstBaseUpdate = le, u.lastBaseUpdate = Le;
        var He = u.shared.interleaved;
        if (He !== null) {
          var We = He;
          do
            U = Xe(U, We.lane), We = We.next;
          while (We !== He);
        } else s === null && (u.shared.lanes = $);
        Ip(U), e.lanes = U, e.memoizedState = M;
      }
      Kh = null;
    }
    function Lw(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function gC() {
      Xh = !1;
    }
    function em() {
      return Xh;
    }
    function SC(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u], f = s.callback;
          f !== null && (s.callback = null, Lw(f, a));
        }
    }
    var Sp = {}, zo = ko(Sp), Ep = ko(Sp), tm = ko(Sp);
    function nm(e) {
      if (e === Sp)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function EC() {
      var e = nm(tm.current);
      return e;
    }
    function hg(e, t) {
      ra(tm, t, e), ra(Ep, e, e), ra(zo, Sp, e);
      var a = GT(t);
      na(zo, e), ra(zo, a, e);
    }
    function Of(e) {
      na(zo, e), na(Ep, e), na(tm, e);
    }
    function mg() {
      var e = nm(zo.current);
      return e;
    }
    function CC(e) {
      nm(tm.current);
      var t = nm(zo.current), a = qT(t, e.type);
      t !== a && (ra(Ep, e, e), ra(zo, a, e));
    }
    function yg(e) {
      Ep.current === e && (na(zo, e), na(Ep, e));
    }
    var Mw = 0, RC = 1, TC = 1, Cp = 2, al = ko(Mw);
    function gg(e, t) {
      return (e & t) !== 0;
    }
    function Lf(e) {
      return e & RC;
    }
    function Sg(e, t) {
      return e & RC | t;
    }
    function Nw(e, t) {
      return e | t;
    }
    function Uo(e, t) {
      ra(al, t, e);
    }
    function Mf(e) {
      na(al, e);
    }
    function zw(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function rm(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === be) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || VE(i) || Fy(i))
              return t;
          }
        } else if (t.tag === an && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var u = (t.flags & xe) !== _e;
          if (u)
            return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e)
          return null;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var Ha = (
      /*   */
      0
    ), sr = (
      /* */
      1
    ), Yl = (
      /*  */
      2
    ), cr = (
      /*    */
      4
    ), Ar = (
      /*   */
      8
    ), Eg = [];
    function Cg() {
      for (var e = 0; e < Eg.length; e++) {
        var t = Eg[e];
        t._workInProgressVersionPrimary = null;
      }
      Eg.length = 0;
    }
    function Uw(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var ce = A.ReactCurrentDispatcher, Rp = A.ReactCurrentBatchConfig, Rg, Nf;
    Rg = /* @__PURE__ */ new Set();
    var Zs = $, Gt = null, fr = null, dr = null, am = !1, Tp = !1, wp = 0, Aw = 0, Fw = 25, P = null, zi = null, Ao = -1, Tg = !1;
    function Ht() {
      {
        var e = P;
        zi === null ? zi = [e] : zi.push(e);
      }
    }
    function te() {
      {
        var e = P;
        zi !== null && (Ao++, zi[Ao] !== e && jw(e));
      }
    }
    function zf(e) {
      e != null && !rt(e) && S("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", P, typeof e);
    }
    function jw(e) {
      {
        var t = Pe(Gt);
        if (!Rg.has(t) && (Rg.add(t), zi !== null)) {
          for (var a = "", i = 30, u = 0; u <= Ao; u++) {
            for (var s = zi[u], f = u === Ao ? e : s, p = u + 1 + ". " + s; p.length < i; )
              p += " ";
            p += f + `
`, a += p;
          }
          S(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function aa() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function wg(e, t) {
      if (Tg)
        return !1;
      if (t === null)
        return S("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", P), !1;
      e.length !== t.length && S(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, P, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!Q(e[a], t[a]))
          return !1;
      return !0;
    }
    function Uf(e, t, a, i, u, s) {
      Zs = s, Gt = t, zi = e !== null ? e._debugHookTypes : null, Ao = -1, Tg = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = $, e !== null && e.memoizedState !== null ? ce.current = IC : zi !== null ? ce.current = YC : ce.current = $C;
      var f = a(i, u);
      if (Tp) {
        var p = 0;
        do {
          if (Tp = !1, wp = 0, p >= Fw)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          p += 1, Tg = !1, fr = null, dr = null, t.updateQueue = null, Ao = -1, ce.current = QC, f = a(i, u);
        } while (Tp);
      }
      ce.current = ym, t._debugHookTypes = zi;
      var v = fr !== null && fr.next !== null;
      if (Zs = $, Gt = null, fr = null, dr = null, P = null, zi = null, Ao = -1, e !== null && (e.flags & Nn) !== (t.flags & Nn) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & ut) !== De && S("Internal React error: Expected static flag was missing. Please notify the React team."), am = !1, v)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return f;
    }
    function Af() {
      var e = wp !== 0;
      return wp = 0, e;
    }
    function wC(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & Lt) !== De ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = ws(e.lanes, a);
    }
    function xC() {
      if (ce.current = ym, am) {
        for (var e = Gt.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        am = !1;
      }
      Zs = $, Gt = null, fr = null, dr = null, zi = null, Ao = -1, P = null, jC = !1, Tp = !1, wp = 0;
    }
    function Il() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return dr === null ? Gt.memoizedState = dr = e : dr = dr.next = e, dr;
    }
    function Ui() {
      var e;
      if (fr === null) {
        var t = Gt.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = fr.next;
      var a;
      if (dr === null ? a = Gt.memoizedState : a = dr.next, a !== null)
        dr = a, a = dr.next, fr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        fr = e;
        var i = {
          memoizedState: fr.memoizedState,
          baseState: fr.baseState,
          baseQueue: fr.baseQueue,
          queue: fr.queue,
          next: null
        };
        dr === null ? Gt.memoizedState = dr = i : dr = dr.next = i;
      }
      return dr;
    }
    function bC() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function xg(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function bg(e, t, a) {
      var i = Il(), u;
      a !== void 0 ? u = a(t) : u = t, i.memoizedState = i.baseState = u;
      var s = {
        pending: null,
        interleaved: null,
        lanes: $,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      };
      i.queue = s;
      var f = s.dispatch = Bw.bind(null, Gt, s);
      return [i.memoizedState, f];
    }
    function _g(e, t, a) {
      var i = Ui(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = fr, f = s.baseQueue, p = u.pending;
      if (p !== null) {
        if (f !== null) {
          var v = f.next, y = p.next;
          f.next = y, p.next = v;
        }
        s.baseQueue !== f && S("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), s.baseQueue = f = p, u.pending = null;
      }
      if (f !== null) {
        var g = f.next, b = s.baseState, w = null, M = null, U = null, j = g;
        do {
          var le = j.lane;
          if (_u(Zs, le)) {
            if (U !== null) {
              var we = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: _t,
                action: j.action,
                hasEagerState: j.hasEagerState,
                eagerState: j.eagerState,
                next: null
              };
              U = U.next = we;
            }
            if (j.hasEagerState)
              b = j.eagerState;
            else {
              var Ct = j.action;
              b = e(b, Ct);
            }
          } else {
            var Le = {
              lane: le,
              action: j.action,
              hasEagerState: j.hasEagerState,
              eagerState: j.eagerState,
              next: null
            };
            U === null ? (M = U = Le, w = b) : U = U.next = Le, Gt.lanes = Xe(Gt.lanes, le), Ip(le);
          }
          j = j.next;
        } while (j !== null && j !== g);
        U === null ? w = b : U.next = M, Q(b, i.memoizedState) || Np(), i.memoizedState = b, i.baseState = w, i.baseQueue = U, u.lastRenderedState = b;
      }
      var ht = u.interleaved;
      if (ht !== null) {
        var k = ht;
        do {
          var H = k.lane;
          Gt.lanes = Xe(Gt.lanes, H), Ip(H), k = k.next;
        } while (k !== ht);
      } else f === null && (u.lanes = $);
      var O = u.dispatch;
      return [i.memoizedState, O];
    }
    function Dg(e, t, a) {
      var i = Ui(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = u.dispatch, f = u.pending, p = i.memoizedState;
      if (f !== null) {
        u.pending = null;
        var v = f.next, y = v;
        do {
          var g = y.action;
          p = e(p, g), y = y.next;
        } while (y !== v);
        Q(p, i.memoizedState) || Np(), i.memoizedState = p, i.baseQueue === null && (i.baseState = p), u.lastRenderedState = p;
      }
      return [p, s];
    }
    function sD(e, t, a) {
    }
    function cD(e, t, a) {
    }
    function kg(e, t, a) {
      var i = Gt, u = Il(), s, f = Ur();
      if (f) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        s = a(), Nf || s !== a() && (S("The result of getServerSnapshot should be cached to avoid an infinite loop"), Nf = !0);
      } else {
        if (s = t(), !Nf) {
          var p = t();
          Q(s, p) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), Nf = !0);
        }
        var v = Am();
        if (v === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Zc(v, Zs) || _C(i, t, s);
      }
      u.memoizedState = s;
      var y = {
        value: s,
        getSnapshot: t
      };
      return u.queue = y, sm(kC.bind(null, i, y, e), [e]), i.flags |= Qr, xp(sr | Ar, DC.bind(null, i, y, s, t), void 0, null), s;
    }
    function im(e, t, a) {
      var i = Gt, u = Ui(), s = t();
      if (!Nf) {
        var f = t();
        Q(s, f) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), Nf = !0);
      }
      var p = u.memoizedState, v = !Q(p, s);
      v && (u.memoizedState = s, Np());
      var y = u.queue;
      if (_p(kC.bind(null, i, y, e), [e]), y.getSnapshot !== t || v || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      dr !== null && dr.memoizedState.tag & sr) {
        i.flags |= Qr, xp(sr | Ar, DC.bind(null, i, y, s, t), void 0, null);
        var g = Am();
        if (g === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Zc(g, Zs) || _C(i, t, s);
      }
      return s;
    }
    function _C(e, t, a) {
      e.flags |= po;
      var i = {
        getSnapshot: t,
        value: a
      }, u = Gt.updateQueue;
      if (u === null)
        u = bC(), Gt.updateQueue = u, u.stores = [i];
      else {
        var s = u.stores;
        s === null ? u.stores = [i] : s.push(i);
      }
    }
    function DC(e, t, a, i) {
      t.value = a, t.getSnapshot = i, OC(t) && LC(e);
    }
    function kC(e, t, a) {
      var i = function() {
        OC(t) && LC(e);
      };
      return a(i);
    }
    function OC(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !Q(a, i);
      } catch {
        return !0;
      }
    }
    function LC(e) {
      var t = ja(e, Ae);
      t !== null && mr(t, e, Ae, Xt);
    }
    function lm(e) {
      var t = Il();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: $,
        dispatch: null,
        lastRenderedReducer: xg,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = $w.bind(null, Gt, a);
      return [t.memoizedState, i];
    }
    function Og(e) {
      return _g(xg);
    }
    function Lg(e) {
      return Dg(xg);
    }
    function xp(e, t, a, i) {
      var u = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, s = Gt.updateQueue;
      if (s === null)
        s = bC(), Gt.updateQueue = s, s.lastEffect = u.next = u;
      else {
        var f = s.lastEffect;
        if (f === null)
          s.lastEffect = u.next = u;
        else {
          var p = f.next;
          f.next = u, u.next = p, s.lastEffect = u;
        }
      }
      return u;
    }
    function Mg(e) {
      var t = Il();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function um(e) {
      var t = Ui();
      return t.memoizedState;
    }
    function bp(e, t, a, i) {
      var u = Il(), s = i === void 0 ? null : i;
      Gt.flags |= e, u.memoizedState = xp(sr | t, a, void 0, s);
    }
    function om(e, t, a, i) {
      var u = Ui(), s = i === void 0 ? null : i, f = void 0;
      if (fr !== null) {
        var p = fr.memoizedState;
        if (f = p.destroy, s !== null) {
          var v = p.deps;
          if (wg(s, v)) {
            u.memoizedState = xp(t, a, f, s);
            return;
          }
        }
      }
      Gt.flags |= e, u.memoizedState = xp(sr | t, a, f, s);
    }
    function sm(e, t) {
      return (Gt.mode & Lt) !== De ? bp(Ri | Qr | xc, Ar, e, t) : bp(Qr | xc, Ar, e, t);
    }
    function _p(e, t) {
      return om(Qr, Ar, e, t);
    }
    function Ng(e, t) {
      return bp(gt, Yl, e, t);
    }
    function cm(e, t) {
      return om(gt, Yl, e, t);
    }
    function zg(e, t) {
      var a = gt;
      return a |= Qi, (Gt.mode & Lt) !== De && (a |= bl), bp(a, cr, e, t);
    }
    function fm(e, t) {
      return om(gt, cr, e, t);
    }
    function MC(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var u = t;
        u.hasOwnProperty("current") || S("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(u).join(", ") + "}");
        var s = e();
        return u.current = s, function() {
          u.current = null;
        };
      }
    }
    function Ug(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, u = gt;
      return u |= Qi, (Gt.mode & Lt) !== De && (u |= bl), bp(u, cr, MC.bind(null, t, e), i);
    }
    function dm(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return om(gt, cr, MC.bind(null, t, e), i);
    }
    function Hw(e, t) {
    }
    var pm = Hw;
    function Ag(e, t) {
      var a = Il(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function vm(e, t) {
      var a = Ui(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (wg(i, s))
          return u[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function Fg(e, t) {
      var a = Il(), i = t === void 0 ? null : t, u = e();
      return a.memoizedState = [u, i], u;
    }
    function hm(e, t) {
      var a = Ui(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (wg(i, s))
          return u[0];
      }
      var f = e();
      return a.memoizedState = [f, i], f;
    }
    function jg(e) {
      var t = Il();
      return t.memoizedState = e, e;
    }
    function NC(e) {
      var t = Ui(), a = fr, i = a.memoizedState;
      return UC(t, i, e);
    }
    function zC(e) {
      var t = Ui();
      if (fr === null)
        return t.memoizedState = e, e;
      var a = fr.memoizedState;
      return UC(t, a, e);
    }
    function UC(e, t, a) {
      var i = !kd(Zs);
      if (i) {
        if (!Q(a, t)) {
          var u = Md();
          Gt.lanes = Xe(Gt.lanes, u), Ip(u), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, Np()), e.memoizedState = a, a;
    }
    function Vw(e, t, a) {
      var i = Ua();
      An(Qv(i, bi)), e(!0);
      var u = Rp.transition;
      Rp.transition = {};
      var s = Rp.transition;
      Rp.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (An(i), Rp.transition = u, u === null && s._updatedFibers) {
          var f = s._updatedFibers.size;
          f > 10 && Ye("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), s._updatedFibers.clear();
        }
      }
    }
    function Hg() {
      var e = lm(!1), t = e[0], a = e[1], i = Vw.bind(null, a), u = Il();
      return u.memoizedState = i, [t, i];
    }
    function AC() {
      var e = Og(), t = e[0], a = Ui(), i = a.memoizedState;
      return [t, i];
    }
    function FC() {
      var e = Lg(), t = e[0], a = Ui(), i = a.memoizedState;
      return [t, i];
    }
    var jC = !1;
    function Pw() {
      return jC;
    }
    function Vg() {
      var e = Il(), t = Am(), a = t.identifierPrefix, i;
      if (Ur()) {
        var u = aw();
        i = ":" + a + "R" + u;
        var s = wp++;
        s > 0 && (i += "H" + s.toString(32)), i += ":";
      } else {
        var f = Aw++;
        i = ":" + a + "r" + f.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function mm() {
      var e = Ui(), t = e.memoizedState;
      return t;
    }
    function Bw(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Po(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (HC(e))
        VC(t, u);
      else {
        var s = vC(e, t, u, i);
        if (s !== null) {
          var f = Sa();
          mr(s, e, i, f), PC(s, t, i);
        }
      }
      BC(e, i);
    }
    function $w(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Po(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (HC(e))
        VC(t, u);
      else {
        var s = e.alternate;
        if (e.lanes === $ && (s === null || s.lanes === $)) {
          var f = t.lastRenderedReducer;
          if (f !== null) {
            var p;
            p = ce.current, ce.current = il;
            try {
              var v = t.lastRenderedState, y = f(v, a);
              if (u.hasEagerState = !0, u.eagerState = y, Q(y, v)) {
                _w(e, t, u, i);
                return;
              }
            } catch {
            } finally {
              ce.current = p;
            }
          }
        }
        var g = vC(e, t, u, i);
        if (g !== null) {
          var b = Sa();
          mr(g, e, i, b), PC(g, t, i);
        }
      }
      BC(e, i);
    }
    function HC(e) {
      var t = e.alternate;
      return e === Gt || t !== null && t === Gt;
    }
    function VC(e, t) {
      Tp = am = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function PC(e, t, a) {
      if (Ld(a)) {
        var i = t.lanes;
        i = Nd(i, e.pendingLanes);
        var u = Xe(i, a);
        t.lanes = u, ef(e, u);
      }
    }
    function BC(e, t, a) {
      vs(e, t);
    }
    var ym = {
      readContext: er,
      useCallback: aa,
      useContext: aa,
      useEffect: aa,
      useImperativeHandle: aa,
      useInsertionEffect: aa,
      useLayoutEffect: aa,
      useMemo: aa,
      useReducer: aa,
      useRef: aa,
      useState: aa,
      useDebugValue: aa,
      useDeferredValue: aa,
      useTransition: aa,
      useMutableSource: aa,
      useSyncExternalStore: aa,
      useId: aa,
      unstable_isNewReconciler: Z
    }, $C = null, YC = null, IC = null, QC = null, Ql = null, il = null, gm = null;
    {
      var Pg = function() {
        S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, $e = function() {
        S("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      $C = {
        readContext: function(e) {
          return er(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", Ht(), zf(t), Ag(e, t);
        },
        useContext: function(e) {
          return P = "useContext", Ht(), er(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", Ht(), zf(t), sm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", Ht(), zf(a), Ug(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", Ht(), zf(t), Ng(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", Ht(), zf(t), zg(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", Ht(), zf(t);
          var a = ce.current;
          ce.current = Ql;
          try {
            return Fg(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", Ht();
          var i = ce.current;
          ce.current = Ql;
          try {
            return bg(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", Ht(), Mg(e);
        },
        useState: function(e) {
          P = "useState", Ht();
          var t = ce.current;
          ce.current = Ql;
          try {
            return lm(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", Ht(), void 0;
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", Ht(), jg(e);
        },
        useTransition: function() {
          return P = "useTransition", Ht(), Hg();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", Ht(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", Ht(), kg(e, t, a);
        },
        useId: function() {
          return P = "useId", Ht(), Vg();
        },
        unstable_isNewReconciler: Z
      }, YC = {
        readContext: function(e) {
          return er(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", te(), Ag(e, t);
        },
        useContext: function(e) {
          return P = "useContext", te(), er(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", te(), sm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", te(), Ug(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", te(), Ng(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", te(), zg(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", te();
          var a = ce.current;
          ce.current = Ql;
          try {
            return Fg(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", te();
          var i = ce.current;
          ce.current = Ql;
          try {
            return bg(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", te(), Mg(e);
        },
        useState: function(e) {
          P = "useState", te();
          var t = ce.current;
          ce.current = Ql;
          try {
            return lm(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", te(), void 0;
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", te(), jg(e);
        },
        useTransition: function() {
          return P = "useTransition", te(), Hg();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", te(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", te(), kg(e, t, a);
        },
        useId: function() {
          return P = "useId", te(), Vg();
        },
        unstable_isNewReconciler: Z
      }, IC = {
        readContext: function(e) {
          return er(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", te(), vm(e, t);
        },
        useContext: function(e) {
          return P = "useContext", te(), er(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", te(), _p(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", te(), dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", te(), cm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", te(), fm(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", te();
          var a = ce.current;
          ce.current = il;
          try {
            return hm(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", te();
          var i = ce.current;
          ce.current = il;
          try {
            return _g(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", te(), um();
        },
        useState: function(e) {
          P = "useState", te();
          var t = ce.current;
          ce.current = il;
          try {
            return Og(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", te(), pm();
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", te(), NC(e);
        },
        useTransition: function() {
          return P = "useTransition", te(), AC();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", te(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", te(), im(e, t);
        },
        useId: function() {
          return P = "useId", te(), mm();
        },
        unstable_isNewReconciler: Z
      }, QC = {
        readContext: function(e) {
          return er(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", te(), vm(e, t);
        },
        useContext: function(e) {
          return P = "useContext", te(), er(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", te(), _p(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", te(), dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", te(), cm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", te(), fm(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", te();
          var a = ce.current;
          ce.current = gm;
          try {
            return hm(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", te();
          var i = ce.current;
          ce.current = gm;
          try {
            return Dg(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", te(), um();
        },
        useState: function(e) {
          P = "useState", te();
          var t = ce.current;
          ce.current = gm;
          try {
            return Lg(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", te(), pm();
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", te(), zC(e);
        },
        useTransition: function() {
          return P = "useTransition", te(), FC();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", te(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", te(), im(e, t);
        },
        useId: function() {
          return P = "useId", te(), mm();
        },
        unstable_isNewReconciler: Z
      }, Ql = {
        readContext: function(e) {
          return Pg(), er(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", $e(), Ht(), Ag(e, t);
        },
        useContext: function(e) {
          return P = "useContext", $e(), Ht(), er(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", $e(), Ht(), sm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", $e(), Ht(), Ug(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", $e(), Ht(), Ng(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", $e(), Ht(), zg(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", $e(), Ht();
          var a = ce.current;
          ce.current = Ql;
          try {
            return Fg(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", $e(), Ht();
          var i = ce.current;
          ce.current = Ql;
          try {
            return bg(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", $e(), Ht(), Mg(e);
        },
        useState: function(e) {
          P = "useState", $e(), Ht();
          var t = ce.current;
          ce.current = Ql;
          try {
            return lm(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", $e(), Ht(), void 0;
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", $e(), Ht(), jg(e);
        },
        useTransition: function() {
          return P = "useTransition", $e(), Ht(), Hg();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", $e(), Ht(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", $e(), Ht(), kg(e, t, a);
        },
        useId: function() {
          return P = "useId", $e(), Ht(), Vg();
        },
        unstable_isNewReconciler: Z
      }, il = {
        readContext: function(e) {
          return Pg(), er(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", $e(), te(), vm(e, t);
        },
        useContext: function(e) {
          return P = "useContext", $e(), te(), er(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", $e(), te(), _p(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", $e(), te(), dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", $e(), te(), cm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", $e(), te(), fm(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", $e(), te();
          var a = ce.current;
          ce.current = il;
          try {
            return hm(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", $e(), te();
          var i = ce.current;
          ce.current = il;
          try {
            return _g(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", $e(), te(), um();
        },
        useState: function(e) {
          P = "useState", $e(), te();
          var t = ce.current;
          ce.current = il;
          try {
            return Og(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", $e(), te(), pm();
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", $e(), te(), NC(e);
        },
        useTransition: function() {
          return P = "useTransition", $e(), te(), AC();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", $e(), te(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", $e(), te(), im(e, t);
        },
        useId: function() {
          return P = "useId", $e(), te(), mm();
        },
        unstable_isNewReconciler: Z
      }, gm = {
        readContext: function(e) {
          return Pg(), er(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", $e(), te(), vm(e, t);
        },
        useContext: function(e) {
          return P = "useContext", $e(), te(), er(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", $e(), te(), _p(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", $e(), te(), dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", $e(), te(), cm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", $e(), te(), fm(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", $e(), te();
          var a = ce.current;
          ce.current = il;
          try {
            return hm(e, t);
          } finally {
            ce.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", $e(), te();
          var i = ce.current;
          ce.current = il;
          try {
            return Dg(e, t, a);
          } finally {
            ce.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", $e(), te(), um();
        },
        useState: function(e) {
          P = "useState", $e(), te();
          var t = ce.current;
          ce.current = il;
          try {
            return Lg(e);
          } finally {
            ce.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", $e(), te(), pm();
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", $e(), te(), zC(e);
        },
        useTransition: function() {
          return P = "useTransition", $e(), te(), FC();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", $e(), te(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", $e(), te(), im(e, t);
        },
        useId: function() {
          return P = "useId", $e(), te(), mm();
        },
        unstable_isNewReconciler: Z
      };
    }
    var Fo = q.unstable_now, WC = 0, Sm = -1, Dp = -1, Em = -1, Bg = !1, Cm = !1;
    function GC() {
      return Bg;
    }
    function Yw() {
      Cm = !0;
    }
    function Iw() {
      Bg = !1, Cm = !1;
    }
    function Qw() {
      Bg = Cm, Cm = !1;
    }
    function qC() {
      return WC;
    }
    function XC() {
      WC = Fo();
    }
    function $g(e) {
      Dp = Fo(), e.actualStartTime < 0 && (e.actualStartTime = Fo());
    }
    function KC(e) {
      Dp = -1;
    }
    function Rm(e, t) {
      if (Dp >= 0) {
        var a = Fo() - Dp;
        e.actualDuration += a, t && (e.selfBaseDuration = a), Dp = -1;
      }
    }
    function Wl(e) {
      if (Sm >= 0) {
        var t = Fo() - Sm;
        Sm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case ee:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case vt:
              var u = a.stateNode;
              u.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function Yg(e) {
      if (Em >= 0) {
        var t = Fo() - Em;
        Em = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case ee:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case vt:
              var u = a.stateNode;
              u !== null && (u.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function Gl() {
      Sm = Fo();
    }
    function Ig() {
      Em = Fo();
    }
    function Qg(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function ll(e, t) {
      if (e && e.defaultProps) {
        var a = Je({}, t), i = e.defaultProps;
        for (var u in i)
          a[u] === void 0 && (a[u] = i[u]);
        return a;
      }
      return t;
    }
    var Wg = {}, Gg, qg, Xg, Kg, Zg, ZC, Tm, Jg, eS, tS, kp;
    {
      Gg = /* @__PURE__ */ new Set(), qg = /* @__PURE__ */ new Set(), Xg = /* @__PURE__ */ new Set(), Kg = /* @__PURE__ */ new Set(), Jg = /* @__PURE__ */ new Set(), Zg = /* @__PURE__ */ new Set(), eS = /* @__PURE__ */ new Set(), tS = /* @__PURE__ */ new Set(), kp = /* @__PURE__ */ new Set();
      var JC = /* @__PURE__ */ new Set();
      Tm = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          JC.has(a) || (JC.add(a), S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, ZC = function(e, t) {
        if (t === void 0) {
          var a = Tt(e) || "Component";
          Zg.has(a) || (Zg.add(a), S("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(Wg, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(Wg);
    }
    function nS(e, t, a, i) {
      var u = e.memoizedState, s = a(i, u);
      {
        if (e.mode & Wt) {
          mn(!0);
          try {
            s = a(i, u);
          } finally {
            mn(!1);
          }
        }
        ZC(t, s);
      }
      var f = s == null ? u : Je({}, u, s);
      if (e.memoizedState = f, e.lanes === $) {
        var p = e.updateQueue;
        p.baseState = f;
      }
    }
    var rS = {
      isMounted: Ov,
      enqueueSetState: function(e, t, a) {
        var i = fo(e), u = Sa(), s = Po(i), f = Hu(u, s);
        f.payload = t, a != null && (Tm(a, "setState"), f.callback = a);
        var p = No(i, f, s);
        p !== null && (mr(p, i, s, u), Zh(p, i, s)), vs(i, s);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = fo(e), u = Sa(), s = Po(i), f = Hu(u, s);
        f.tag = mC, f.payload = t, a != null && (Tm(a, "replaceState"), f.callback = a);
        var p = No(i, f, s);
        p !== null && (mr(p, i, s, u), Zh(p, i, s)), vs(i, s);
      },
      enqueueForceUpdate: function(e, t) {
        var a = fo(e), i = Sa(), u = Po(a), s = Hu(i, u);
        s.tag = qh, t != null && (Tm(t, "forceUpdate"), s.callback = t);
        var f = No(a, s, u);
        f !== null && (mr(f, a, u, i), Zh(f, a, u)), Mc(a, u);
      }
    };
    function e0(e, t, a, i, u, s, f) {
      var p = e.stateNode;
      if (typeof p.shouldComponentUpdate == "function") {
        var v = p.shouldComponentUpdate(i, s, f);
        {
          if (e.mode & Wt) {
            mn(!0);
            try {
              v = p.shouldComponentUpdate(i, s, f);
            } finally {
              mn(!1);
            }
          }
          v === void 0 && S("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Tt(t) || "Component");
        }
        return v;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !ye(a, i) || !ye(u, s) : !0;
    }
    function Ww(e, t, a) {
      var i = e.stateNode;
      {
        var u = Tt(t) || "Component", s = i.render;
        s || (t.prototype && typeof t.prototype.render == "function" ? S("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", u) : S("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", u)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && S("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", u), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && S("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", u), i.propTypes && S("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", u), i.contextType && S("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", u), t.childContextTypes && !kp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Wt) === De && (kp.add(t), S(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), t.contextTypes && !kp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Wt) === De && (kp.add(t), S(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), i.contextTypes && S("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", u), t.contextType && t.contextTypes && !eS.has(t) && (eS.add(t), S("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", u)), typeof i.componentShouldUpdate == "function" && S("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", u), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && S("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Tt(t) || "A pure component"), typeof i.componentDidUnmount == "function" && S("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", u), typeof i.componentDidReceiveProps == "function" && S("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", u), typeof i.componentWillRecieveProps == "function" && S("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", u), typeof i.UNSAFE_componentWillRecieveProps == "function" && S("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", u);
        var f = i.props !== a;
        i.props !== void 0 && f && S("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", u, u), i.defaultProps && S("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", u, u), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !Xg.has(t) && (Xg.add(t), S("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Tt(t))), typeof i.getDerivedStateFromProps == "function" && S("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof i.getDerivedStateFromError == "function" && S("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof t.getSnapshotBeforeUpdate == "function" && S("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", u);
        var p = i.state;
        p && (typeof p != "object" || rt(p)) && S("%s.state: must be set to an object or null", u), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && S("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", u);
      }
    }
    function t0(e, t) {
      t.updater = rS, e.stateNode = t, pu(t, e), t._reactInternalInstance = Wg;
    }
    function n0(e, t, a) {
      var i = !1, u = li, s = li, f = t.contextType;
      if ("contextType" in t) {
        var p = (
          // Allow null for conditional declaration
          f === null || f !== void 0 && f.$$typeof === R && f._context === void 0
        );
        if (!p && !tS.has(t)) {
          tS.add(t);
          var v = "";
          f === void 0 ? v = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? v = " However, it is set to a " + typeof f + "." : f.$$typeof === pi ? v = " Did you accidentally pass the Context.Provider instead?" : f._context !== void 0 ? v = " Did you accidentally pass the Context.Consumer instead?" : v = " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", S("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Tt(t) || "Component", v);
        }
      }
      if (typeof f == "object" && f !== null)
        s = er(f);
      else {
        u = Rf(e, t, !0);
        var y = t.contextTypes;
        i = y != null, s = i ? Tf(e, u) : li;
      }
      var g = new t(a, s);
      if (e.mode & Wt) {
        mn(!0);
        try {
          g = new t(a, s);
        } finally {
          mn(!1);
        }
      }
      var b = e.memoizedState = g.state !== null && g.state !== void 0 ? g.state : null;
      t0(e, g);
      {
        if (typeof t.getDerivedStateFromProps == "function" && b === null) {
          var w = Tt(t) || "Component";
          qg.has(w) || (qg.add(w), S("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", w, g.state === null ? "null" : "undefined", w));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof g.getSnapshotBeforeUpdate == "function") {
          var M = null, U = null, j = null;
          if (typeof g.componentWillMount == "function" && g.componentWillMount.__suppressDeprecationWarning !== !0 ? M = "componentWillMount" : typeof g.UNSAFE_componentWillMount == "function" && (M = "UNSAFE_componentWillMount"), typeof g.componentWillReceiveProps == "function" && g.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? U = "componentWillReceiveProps" : typeof g.UNSAFE_componentWillReceiveProps == "function" && (U = "UNSAFE_componentWillReceiveProps"), typeof g.componentWillUpdate == "function" && g.componentWillUpdate.__suppressDeprecationWarning !== !0 ? j = "componentWillUpdate" : typeof g.UNSAFE_componentWillUpdate == "function" && (j = "UNSAFE_componentWillUpdate"), M !== null || U !== null || j !== null) {
            var le = Tt(t) || "Component", Le = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            Kg.has(le) || (Kg.add(le), S(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, le, Le, M !== null ? `
  ` + M : "", U !== null ? `
  ` + U : "", j !== null ? `
  ` + j : ""));
          }
        }
      }
      return i && IE(e, u, s), g;
    }
    function Gw(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (S("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Pe(e) || "Component"), rS.enqueueReplaceState(t, t.state, null));
    }
    function r0(e, t, a, i) {
      var u = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== u) {
        {
          var s = Pe(e) || "Component";
          Gg.has(s) || (Gg.add(s), S("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", s));
        }
        rS.enqueueReplaceState(t, t.state, null);
      }
    }
    function aS(e, t, a, i) {
      Ww(e, t, a);
      var u = e.stateNode;
      u.props = a, u.state = e.memoizedState, u.refs = {}, pg(e);
      var s = t.contextType;
      if (typeof s == "object" && s !== null)
        u.context = er(s);
      else {
        var f = Rf(e, t, !0);
        u.context = Tf(e, f);
      }
      {
        if (u.state === a) {
          var p = Tt(t) || "Component";
          Jg.has(p) || (Jg.add(p), S("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", p));
        }
        e.mode & Wt && rl.recordLegacyContextWarning(e, u), rl.recordUnsafeLifecycleWarnings(e, u);
      }
      u.state = e.memoizedState;
      var v = t.getDerivedStateFromProps;
      if (typeof v == "function" && (nS(e, t, v, a), u.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof u.getSnapshotBeforeUpdate != "function" && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (Gw(e, u), Jh(e, a, u, i), u.state = e.memoizedState), typeof u.componentDidMount == "function") {
        var y = gt;
        y |= Qi, (e.mode & Lt) !== De && (y |= bl), e.flags |= y;
      }
    }
    function qw(e, t, a, i) {
      var u = e.stateNode, s = e.memoizedProps;
      u.props = s;
      var f = u.context, p = t.contextType, v = li;
      if (typeof p == "object" && p !== null)
        v = er(p);
      else {
        var y = Rf(e, t, !0);
        v = Tf(e, y);
      }
      var g = t.getDerivedStateFromProps, b = typeof g == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      !b && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (s !== a || f !== v) && r0(e, u, a, v), gC();
      var w = e.memoizedState, M = u.state = w;
      if (Jh(e, a, u, i), M = e.memoizedState, s === a && w === M && !zh() && !em()) {
        if (typeof u.componentDidMount == "function") {
          var U = gt;
          U |= Qi, (e.mode & Lt) !== De && (U |= bl), e.flags |= U;
        }
        return !1;
      }
      typeof g == "function" && (nS(e, t, g, a), M = e.memoizedState);
      var j = em() || e0(e, t, s, a, w, M, v);
      if (j) {
        if (!b && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function") {
          var le = gt;
          le |= Qi, (e.mode & Lt) !== De && (le |= bl), e.flags |= le;
        }
      } else {
        if (typeof u.componentDidMount == "function") {
          var Le = gt;
          Le |= Qi, (e.mode & Lt) !== De && (Le |= bl), e.flags |= Le;
        }
        e.memoizedProps = a, e.memoizedState = M;
      }
      return u.props = a, u.state = M, u.context = v, j;
    }
    function Xw(e, t, a, i, u) {
      var s = t.stateNode;
      yC(e, t);
      var f = t.memoizedProps, p = t.type === t.elementType ? f : ll(t.type, f);
      s.props = p;
      var v = t.pendingProps, y = s.context, g = a.contextType, b = li;
      if (typeof g == "object" && g !== null)
        b = er(g);
      else {
        var w = Rf(t, a, !0);
        b = Tf(t, w);
      }
      var M = a.getDerivedStateFromProps, U = typeof M == "function" || typeof s.getSnapshotBeforeUpdate == "function";
      !U && (typeof s.UNSAFE_componentWillReceiveProps == "function" || typeof s.componentWillReceiveProps == "function") && (f !== v || y !== b) && r0(t, s, i, b), gC();
      var j = t.memoizedState, le = s.state = j;
      if (Jh(t, i, s, u), le = t.memoizedState, f === v && j === le && !zh() && !em() && !Re)
        return typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= gt), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= Yn), !1;
      typeof M == "function" && (nS(t, a, M, i), le = t.memoizedState);
      var Le = em() || e0(t, a, p, i, j, le, b) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      Re;
      return Le ? (!U && (typeof s.UNSAFE_componentWillUpdate == "function" || typeof s.componentWillUpdate == "function") && (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, le, b), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, le, b)), typeof s.componentDidUpdate == "function" && (t.flags |= gt), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= Yn)) : (typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= gt), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= Yn), t.memoizedProps = i, t.memoizedState = le), s.props = i, s.state = le, s.context = b, Le;
    }
    function Js(e, t) {
      return {
        value: e,
        source: t,
        stack: Vi(t),
        digest: null
      };
    }
    function iS(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function Kw(e, t) {
      return !0;
    }
    function lS(e, t) {
      try {
        var a = Kw(e, t);
        if (a === !1)
          return;
        var i = t.value, u = t.source, s = t.stack, f = s !== null ? s : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === ve)
            return;
          console.error(i);
        }
        var p = u ? Pe(u) : null, v = p ? "The above error occurred in the <" + p + "> component:" : "The above error occurred in one of your React components:", y;
        if (e.tag === ee)
          y = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var g = Pe(e) || "Anonymous";
          y = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + g + ".");
        }
        var b = v + `
` + f + `

` + ("" + y);
        console.error(b);
      } catch (w) {
        setTimeout(function() {
          throw w;
        });
      }
    }
    var Zw = typeof WeakMap == "function" ? WeakMap : Map;
    function a0(e, t, a) {
      var i = Hu(Xt, a);
      i.tag = fg, i.payload = {
        element: null
      };
      var u = t.value;
      return i.callback = function() {
        Yb(u), lS(e, t);
      }, i;
    }
    function uS(e, t, a) {
      var i = Hu(Xt, a);
      i.tag = fg;
      var u = e.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var s = t.value;
        i.payload = function() {
          return u(s);
        }, i.callback = function() {
          hR(e), lS(e, t);
        };
      }
      var f = e.stateNode;
      return f !== null && typeof f.componentDidCatch == "function" && (i.callback = function() {
        hR(e), lS(e, t), typeof u != "function" && Bb(this);
        var v = t.value, y = t.stack;
        this.componentDidCatch(v, {
          componentStack: y !== null ? y : ""
        }), typeof u != "function" && (Zr(e.lanes, Ae) || S("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Pe(e) || "Unknown"));
      }), i;
    }
    function i0(e, t, a) {
      var i = e.pingCache, u;
      if (i === null ? (i = e.pingCache = new Zw(), u = /* @__PURE__ */ new Set(), i.set(t, u)) : (u = i.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), i.set(t, u))), !u.has(a)) {
        u.add(a);
        var s = Ib.bind(null, e, t, a);
        Xr && Qp(e, a), t.then(s, s);
      }
    }
    function Jw(e, t, a, i) {
      var u = e.updateQueue;
      if (u === null) {
        var s = /* @__PURE__ */ new Set();
        s.add(a), e.updateQueue = s;
      } else
        u.add(a);
    }
    function ex(e, t) {
      var a = e.tag;
      if ((e.mode & ut) === De && (a === de || a === Qe || a === Fe)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function l0(e) {
      var t = e;
      do {
        if (t.tag === be && zw(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function u0(e, t, a, i, u) {
      if ((e.mode & ut) === De) {
        if (e === t)
          e.flags |= Xn;
        else {
          if (e.flags |= xe, a.flags |= wc, a.flags &= -52805, a.tag === ve) {
            var s = a.alternate;
            if (s === null)
              a.tag = Ft;
            else {
              var f = Hu(Xt, Ae);
              f.tag = qh, No(a, f, Ae);
            }
          }
          a.lanes = Xe(a.lanes, Ae);
        }
        return e;
      }
      return e.flags |= Xn, e.lanes = u, e;
    }
    function tx(e, t, a, i, u) {
      if (a.flags |= os, Xr && Qp(e, u), i !== null && typeof i == "object" && typeof i.then == "function") {
        var s = i;
        ex(a), Ur() && a.mode & ut && ZE();
        var f = l0(t);
        if (f !== null) {
          f.flags &= ~Er, u0(f, t, a, e, u), f.mode & ut && i0(e, s, u), Jw(f, e, s);
          return;
        } else {
          if (!jv(u)) {
            i0(e, s, u), VS();
            return;
          }
          var p = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = p;
        }
      } else if (Ur() && a.mode & ut) {
        ZE();
        var v = l0(t);
        if (v !== null) {
          (v.flags & Xn) === _e && (v.flags |= Er), u0(v, t, a, e, u), Jy(Js(i, a));
          return;
        }
      }
      i = Js(i, a), zb(i);
      var y = t;
      do {
        switch (y.tag) {
          case ee: {
            var g = i;
            y.flags |= Xn;
            var b = Ts(u);
            y.lanes = Xe(y.lanes, b);
            var w = a0(y, g, b);
            vg(y, w);
            return;
          }
          case ve:
            var M = i, U = y.type, j = y.stateNode;
            if ((y.flags & xe) === _e && (typeof U.getDerivedStateFromError == "function" || j !== null && typeof j.componentDidCatch == "function" && !lR(j))) {
              y.flags |= Xn;
              var le = Ts(u);
              y.lanes = Xe(y.lanes, le);
              var Le = uS(y, M, le);
              vg(y, Le);
              return;
            }
            break;
        }
        y = y.return;
      } while (y !== null);
    }
    function nx() {
      return null;
    }
    var Op = A.ReactCurrentOwner, ul = !1, oS, Lp, sS, cS, fS, ec, dS, wm, Mp;
    oS = {}, Lp = {}, sS = {}, cS = {}, fS = {}, ec = !1, dS = {}, wm = {}, Mp = {};
    function ya(e, t, a, i) {
      e === null ? t.child = cC(t, null, a, i) : t.child = _f(t, e.child, a, i);
    }
    function rx(e, t, a, i) {
      t.child = _f(t, e.child, null, i), t.child = _f(t, null, a, i);
    }
    function o0(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && tl(
          s,
          i,
          // Resolved props
          "prop",
          Tt(a)
        );
      }
      var f = a.render, p = t.ref, v, y;
      kf(t, u), pa(t);
      {
        if (Op.current = t, $n(!0), v = Uf(e, t, f, i, p, u), y = Af(), t.mode & Wt) {
          mn(!0);
          try {
            v = Uf(e, t, f, i, p, u), y = Af();
          } finally {
            mn(!1);
          }
        }
        $n(!1);
      }
      return va(), e !== null && !ul ? (wC(e, t, u), Vu(e, t, u)) : (Ur() && y && Wy(t), t.flags |= ti, ya(e, t, v, u), t.child);
    }
    function s0(e, t, a, i, u) {
      if (e === null) {
        var s = a.type;
        if (o_(s) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var f = s;
          return f = Yf(s), t.tag = Fe, t.type = f, hS(t, s), c0(e, t, f, i, u);
        }
        {
          var p = s.propTypes;
          if (p && tl(
            p,
            i,
            // Resolved props
            "prop",
            Tt(s)
          ), a.defaultProps !== void 0) {
            var v = Tt(s) || "Unknown";
            Mp[v] || (S("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", v), Mp[v] = !0);
          }
        }
        var y = KS(a.type, null, i, t, t.mode, u);
        return y.ref = t.ref, y.return = t, t.child = y, y;
      }
      {
        var g = a.type, b = g.propTypes;
        b && tl(
          b,
          i,
          // Resolved props
          "prop",
          Tt(g)
        );
      }
      var w = e.child, M = CS(e, u);
      if (!M) {
        var U = w.memoizedProps, j = a.compare;
        if (j = j !== null ? j : ye, j(U, i) && e.ref === t.ref)
          return Vu(e, t, u);
      }
      t.flags |= ti;
      var le = ic(w, i);
      return le.ref = t.ref, le.return = t, t.child = le, le;
    }
    function c0(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = t.elementType;
        if (s.$$typeof === Be) {
          var f = s, p = f._payload, v = f._init;
          try {
            s = v(p);
          } catch {
            s = null;
          }
          var y = s && s.propTypes;
          y && tl(
            y,
            i,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            Tt(s)
          );
        }
      }
      if (e !== null) {
        var g = e.memoizedProps;
        if (ye(g, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (ul = !1, t.pendingProps = i = g, CS(e, u))
            (e.flags & wc) !== _e && (ul = !0);
          else return t.lanes = e.lanes, Vu(e, t, u);
      }
      return pS(e, t, a, i, u);
    }
    function f0(e, t, a) {
      var i = t.pendingProps, u = i.children, s = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || ne)
        if ((t.mode & ut) === De) {
          var f = {
            baseLanes: $,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = f, Fm(t, a);
        } else if (Zr(a, Kr)) {
          var b = {
            baseLanes: $,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = b;
          var w = s !== null ? s.baseLanes : a;
          Fm(t, w);
        } else {
          var p = null, v;
          if (s !== null) {
            var y = s.baseLanes;
            v = Xe(y, a);
          } else
            v = a;
          t.lanes = t.childLanes = Kr;
          var g = {
            baseLanes: v,
            cachePool: p,
            transitions: null
          };
          return t.memoizedState = g, t.updateQueue = null, Fm(t, v), null;
        }
      else {
        var M;
        s !== null ? (M = Xe(s.baseLanes, a), t.memoizedState = null) : M = a, Fm(t, M);
      }
      return ya(e, t, u, a), t.child;
    }
    function ax(e, t, a) {
      var i = t.pendingProps;
      return ya(e, t, i, a), t.child;
    }
    function ix(e, t, a) {
      var i = t.pendingProps.children;
      return ya(e, t, i, a), t.child;
    }
    function lx(e, t, a) {
      {
        t.flags |= gt;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var u = t.pendingProps, s = u.children;
      return ya(e, t, s, a), t.child;
    }
    function d0(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= Sn, t.flags |= vo);
    }
    function pS(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && tl(
          s,
          i,
          // Resolved props
          "prop",
          Tt(a)
        );
      }
      var f;
      {
        var p = Rf(t, a, !0);
        f = Tf(t, p);
      }
      var v, y;
      kf(t, u), pa(t);
      {
        if (Op.current = t, $n(!0), v = Uf(e, t, a, i, f, u), y = Af(), t.mode & Wt) {
          mn(!0);
          try {
            v = Uf(e, t, a, i, f, u), y = Af();
          } finally {
            mn(!1);
          }
        }
        $n(!1);
      }
      return va(), e !== null && !ul ? (wC(e, t, u), Vu(e, t, u)) : (Ur() && y && Wy(t), t.flags |= ti, ya(e, t, v, u), t.child);
    }
    function p0(e, t, a, i, u) {
      {
        switch (T_(t)) {
          case !1: {
            var s = t.stateNode, f = t.type, p = new f(t.memoizedProps, s.context), v = p.state;
            s.updater.enqueueSetState(s, v, null);
            break;
          }
          case !0: {
            t.flags |= xe, t.flags |= Xn;
            var y = new Error("Simulated error coming from DevTools"), g = Ts(u);
            t.lanes = Xe(t.lanes, g);
            var b = uS(t, Js(y, t), g);
            vg(t, b);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var w = a.propTypes;
          w && tl(
            w,
            i,
            // Resolved props
            "prop",
            Tt(a)
          );
        }
      }
      var M;
      $l(a) ? (M = !0, Ah(t)) : M = !1, kf(t, u);
      var U = t.stateNode, j;
      U === null ? (bm(e, t), n0(t, a, i), aS(t, a, i, u), j = !0) : e === null ? j = qw(t, a, i, u) : j = Xw(e, t, a, i, u);
      var le = vS(e, t, a, j, M, u);
      {
        var Le = t.stateNode;
        j && Le.props !== i && (ec || S("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Pe(t) || "a component"), ec = !0);
      }
      return le;
    }
    function vS(e, t, a, i, u, s) {
      d0(e, t);
      var f = (t.flags & xe) !== _e;
      if (!i && !f)
        return u && GE(t, a, !1), Vu(e, t, s);
      var p = t.stateNode;
      Op.current = t;
      var v;
      if (f && typeof a.getDerivedStateFromError != "function")
        v = null, KC();
      else {
        pa(t);
        {
          if ($n(!0), v = p.render(), t.mode & Wt) {
            mn(!0);
            try {
              p.render();
            } finally {
              mn(!1);
            }
          }
          $n(!1);
        }
        va();
      }
      return t.flags |= ti, e !== null && f ? rx(e, t, v, s) : ya(e, t, v, s), t.memoizedState = p.state, u && GE(t, a, !0), t.child;
    }
    function v0(e) {
      var t = e.stateNode;
      t.pendingContext ? QE(e, t.pendingContext, t.pendingContext !== t.context) : t.context && QE(e, t.context, !1), hg(e, t.containerInfo);
    }
    function ux(e, t, a) {
      if (v0(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, u = t.memoizedState, s = u.element;
      yC(e, t), Jh(t, i, null, a);
      var f = t.memoizedState;
      t.stateNode;
      var p = f.element;
      if (u.isDehydrated) {
        var v = {
          element: p,
          isDehydrated: !1,
          cache: f.cache,
          pendingSuspenseBoundaries: f.pendingSuspenseBoundaries,
          transitions: f.transitions
        }, y = t.updateQueue;
        if (y.baseState = v, t.memoizedState = v, t.flags & Er) {
          var g = Js(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return h0(e, t, p, a, g);
        } else if (p !== s) {
          var b = Js(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return h0(e, t, p, a, b);
        } else {
          cw(t);
          var w = cC(t, null, p, a);
          t.child = w;
          for (var M = w; M; )
            M.flags = M.flags & ~hn | Wr, M = M.sibling;
        }
      } else {
        if (bf(), p === s)
          return Vu(e, t, a);
        ya(e, t, p, a);
      }
      return t.child;
    }
    function h0(e, t, a, i, u) {
      return bf(), Jy(u), t.flags |= Er, ya(e, t, a, i), t.child;
    }
    function ox(e, t, a) {
      CC(t), e === null && Zy(t);
      var i = t.type, u = t.pendingProps, s = e !== null ? e.memoizedProps : null, f = u.children, p = Ny(i, u);
      return p ? f = null : s !== null && Ny(i, s) && (t.flags |= ka), d0(e, t), ya(e, t, f, a), t.child;
    }
    function sx(e, t) {
      return e === null && Zy(t), null;
    }
    function cx(e, t, a, i) {
      bm(e, t);
      var u = t.pendingProps, s = a, f = s._payload, p = s._init, v = p(f);
      t.type = v;
      var y = t.tag = s_(v), g = ll(v, u), b;
      switch (y) {
        case de:
          return hS(t, v), t.type = v = Yf(v), b = pS(null, t, v, g, i), b;
        case ve:
          return t.type = v = IS(v), b = p0(null, t, v, g, i), b;
        case Qe:
          return t.type = v = QS(v), b = o0(null, t, v, g, i), b;
        case st: {
          if (t.type !== t.elementType) {
            var w = v.propTypes;
            w && tl(
              w,
              g,
              // Resolved for outer only
              "prop",
              Tt(v)
            );
          }
          return b = s0(
            null,
            t,
            v,
            ll(v.type, g),
            // The inner type can have defaults too
            i
          ), b;
        }
      }
      var M = "";
      throw v !== null && typeof v == "object" && v.$$typeof === Be && (M = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + v + ". " + ("Lazy element type must resolve to a class or function." + M));
    }
    function fx(e, t, a, i, u) {
      bm(e, t), t.tag = ve;
      var s;
      return $l(a) ? (s = !0, Ah(t)) : s = !1, kf(t, u), n0(t, a, i), aS(t, a, i, u), vS(null, t, a, !0, s, u);
    }
    function dx(e, t, a, i) {
      bm(e, t);
      var u = t.pendingProps, s;
      {
        var f = Rf(t, a, !1);
        s = Tf(t, f);
      }
      kf(t, i);
      var p, v;
      pa(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var y = Tt(a) || "Unknown";
          oS[y] || (S("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", y, y), oS[y] = !0);
        }
        t.mode & Wt && rl.recordLegacyContextWarning(t, null), $n(!0), Op.current = t, p = Uf(null, t, a, u, s, i), v = Af(), $n(!1);
      }
      if (va(), t.flags |= ti, typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0) {
        var g = Tt(a) || "Unknown";
        Lp[g] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", g, g, g), Lp[g] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0
      ) {
        {
          var b = Tt(a) || "Unknown";
          Lp[b] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", b, b, b), Lp[b] = !0);
        }
        t.tag = ve, t.memoizedState = null, t.updateQueue = null;
        var w = !1;
        return $l(a) ? (w = !0, Ah(t)) : w = !1, t.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, pg(t), t0(t, p), aS(t, a, u, i), vS(null, t, a, !0, w, i);
      } else {
        if (t.tag = de, t.mode & Wt) {
          mn(!0);
          try {
            p = Uf(null, t, a, u, s, i), v = Af();
          } finally {
            mn(!1);
          }
        }
        return Ur() && v && Wy(t), ya(null, t, p, i), hS(t, a), t.child;
      }
    }
    function hS(e, t) {
      {
        if (t && t.childContextTypes && S("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = Dr();
          i && (a += `

Check the render method of \`` + i + "`.");
          var u = i || "", s = e._debugSource;
          s && (u = s.fileName + ":" + s.lineNumber), fS[u] || (fS[u] = !0, S("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var f = Tt(t) || "Unknown";
          Mp[f] || (S("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", f), Mp[f] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var p = Tt(t) || "Unknown";
          cS[p] || (S("%s: Function components do not support getDerivedStateFromProps.", p), cS[p] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var v = Tt(t) || "Unknown";
          sS[v] || (S("%s: Function components do not support contextType.", v), sS[v] = !0);
        }
      }
    }
    var mS = {
      dehydrated: null,
      treeContext: null,
      retryLane: _t
    };
    function yS(e) {
      return {
        baseLanes: e,
        cachePool: nx(),
        transitions: null
      };
    }
    function px(e, t) {
      var a = null;
      return {
        baseLanes: Xe(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function vx(e, t, a, i) {
      if (t !== null) {
        var u = t.memoizedState;
        if (u === null)
          return !1;
      }
      return gg(e, Cp);
    }
    function hx(e, t) {
      return ws(e.childLanes, t);
    }
    function m0(e, t, a) {
      var i = t.pendingProps;
      w_(t) && (t.flags |= xe);
      var u = al.current, s = !1, f = (t.flags & xe) !== _e;
      if (f || vx(u, e) ? (s = !0, t.flags &= ~xe) : (e === null || e.memoizedState !== null) && (u = Nw(u, TC)), u = Lf(u), Uo(t, u), e === null) {
        Zy(t);
        var p = t.memoizedState;
        if (p !== null) {
          var v = p.dehydrated;
          if (v !== null)
            return Ex(t, v);
        }
        var y = i.children, g = i.fallback;
        if (s) {
          var b = mx(t, y, g, a), w = t.child;
          return w.memoizedState = yS(a), t.memoizedState = mS, b;
        } else
          return gS(t, y);
      } else {
        var M = e.memoizedState;
        if (M !== null) {
          var U = M.dehydrated;
          if (U !== null)
            return Cx(e, t, f, i, U, M, a);
        }
        if (s) {
          var j = i.fallback, le = i.children, Le = gx(e, t, le, j, a), we = t.child, Ct = e.child.memoizedState;
          return we.memoizedState = Ct === null ? yS(a) : px(Ct, a), we.childLanes = hx(e, a), t.memoizedState = mS, Le;
        } else {
          var ht = i.children, k = yx(e, t, ht, a);
          return t.memoizedState = null, k;
        }
      }
    }
    function gS(e, t, a) {
      var i = e.mode, u = {
        mode: "visible",
        children: t
      }, s = SS(u, i);
      return s.return = e, e.child = s, s;
    }
    function mx(e, t, a, i) {
      var u = e.mode, s = e.child, f = {
        mode: "hidden",
        children: t
      }, p, v;
      return (u & ut) === De && s !== null ? (p = s, p.childLanes = $, p.pendingProps = f, e.mode & Ot && (p.actualDuration = 0, p.actualStartTime = -1, p.selfBaseDuration = 0, p.treeBaseDuration = 0), v = $o(a, u, i, null)) : (p = SS(f, u), v = $o(a, u, i, null)), p.return = e, v.return = e, p.sibling = v, e.child = p, v;
    }
    function SS(e, t, a) {
      return yR(e, t, $, null);
    }
    function y0(e, t) {
      return ic(e, t);
    }
    function yx(e, t, a, i) {
      var u = e.child, s = u.sibling, f = y0(u, {
        mode: "visible",
        children: a
      });
      if ((t.mode & ut) === De && (f.lanes = i), f.return = t, f.sibling = null, s !== null) {
        var p = t.deletions;
        p === null ? (t.deletions = [s], t.flags |= Da) : p.push(s);
      }
      return t.child = f, f;
    }
    function gx(e, t, a, i, u) {
      var s = t.mode, f = e.child, p = f.sibling, v = {
        mode: "hidden",
        children: a
      }, y;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (s & ut) === De && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== f
      ) {
        var g = t.child;
        y = g, y.childLanes = $, y.pendingProps = v, t.mode & Ot && (y.actualDuration = 0, y.actualStartTime = -1, y.selfBaseDuration = f.selfBaseDuration, y.treeBaseDuration = f.treeBaseDuration), t.deletions = null;
      } else
        y = y0(f, v), y.subtreeFlags = f.subtreeFlags & Nn;
      var b;
      return p !== null ? b = ic(p, i) : (b = $o(i, s, u, null), b.flags |= hn), b.return = t, y.return = t, y.sibling = b, t.child = y, b;
    }
    function xm(e, t, a, i) {
      i !== null && Jy(i), _f(t, e.child, null, a);
      var u = t.pendingProps, s = u.children, f = gS(t, s);
      return f.flags |= hn, t.memoizedState = null, f;
    }
    function Sx(e, t, a, i, u) {
      var s = t.mode, f = {
        mode: "visible",
        children: a
      }, p = SS(f, s), v = $o(i, s, u, null);
      return v.flags |= hn, p.return = t, v.return = t, p.sibling = v, t.child = p, (t.mode & ut) !== De && _f(t, e.child, null, u), v;
    }
    function Ex(e, t, a) {
      return (e.mode & ut) === De ? (S("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Ae) : Fy(t) ? e.lanes = Cr : e.lanes = Kr, null;
    }
    function Cx(e, t, a, i, u, s, f) {
      if (a)
        if (t.flags & Er) {
          t.flags &= ~Er;
          var k = iS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return xm(e, t, f, k);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= xe, null;
          var H = i.children, O = i.fallback, G = Sx(e, t, H, O, f), fe = t.child;
          return fe.memoizedState = yS(f), t.memoizedState = mS, G;
        }
      else {
        if (ow(), (t.mode & ut) === De)
          return xm(
            e,
            t,
            f,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (Fy(u)) {
          var p, v, y;
          {
            var g = x1(u);
            p = g.digest, v = g.message, y = g.stack;
          }
          var b;
          v ? b = new Error(v) : b = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var w = iS(b, p, y);
          return xm(e, t, f, w);
        }
        var M = Zr(f, e.childLanes);
        if (ul || M) {
          var U = Am();
          if (U !== null) {
            var j = Ud(U, f);
            if (j !== _t && j !== s.retryLane) {
              s.retryLane = j;
              var le = Xt;
              ja(e, j), mr(U, e, j, le);
            }
          }
          VS();
          var Le = iS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return xm(e, t, f, Le);
        } else if (VE(u)) {
          t.flags |= xe, t.child = e.child;
          var we = Qb.bind(null, e);
          return b1(u, we), null;
        } else {
          fw(t, u, s.treeContext);
          var Ct = i.children, ht = gS(t, Ct);
          return ht.flags |= Wr, ht;
        }
      }
    }
    function g0(e, t, a) {
      e.lanes = Xe(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = Xe(i.lanes, t)), sg(e.return, t, a);
    }
    function Rx(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === be) {
          var u = i.memoizedState;
          u !== null && g0(i, a, e);
        } else if (i.tag === an)
          g0(i, a, e);
        else if (i.child !== null) {
          i.child.return = i, i = i.child;
          continue;
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    function Tx(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && rm(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function wx(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !dS[e])
        if (dS[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              S('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          S('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function xx(e, t) {
      e !== void 0 && !wm[e] && (e !== "collapsed" && e !== "hidden" ? (wm[e] = !0, S('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (wm[e] = !0, S('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function S0(e, t) {
      {
        var a = rt(e), i = !a && typeof qe(e) == "function";
        if (a || i) {
          var u = a ? "array" : "iterable";
          return S("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", u, t, u), !1;
        }
      }
      return !0;
    }
    function bx(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (rt(e)) {
          for (var a = 0; a < e.length; a++)
            if (!S0(e[a], a))
              return;
        } else {
          var i = qe(e);
          if (typeof i == "function") {
            var u = i.call(e);
            if (u)
              for (var s = u.next(), f = 0; !s.done; s = u.next()) {
                if (!S0(s.value, f))
                  return;
                f++;
              }
          } else
            S('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function ES(e, t, a, i, u) {
      var s = e.memoizedState;
      s === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: u
      } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = i, s.tail = a, s.tailMode = u);
    }
    function E0(e, t, a) {
      var i = t.pendingProps, u = i.revealOrder, s = i.tail, f = i.children;
      wx(u), xx(s, u), bx(f, u), ya(e, t, f, a);
      var p = al.current, v = gg(p, Cp);
      if (v)
        p = Sg(p, Cp), t.flags |= xe;
      else {
        var y = e !== null && (e.flags & xe) !== _e;
        y && Rx(t, t.child, a), p = Lf(p);
      }
      if (Uo(t, p), (t.mode & ut) === De)
        t.memoizedState = null;
      else
        switch (u) {
          case "forwards": {
            var g = Tx(t.child), b;
            g === null ? (b = t.child, t.child = null) : (b = g.sibling, g.sibling = null), ES(
              t,
              !1,
              // isBackwards
              b,
              g,
              s
            );
            break;
          }
          case "backwards": {
            var w = null, M = t.child;
            for (t.child = null; M !== null; ) {
              var U = M.alternate;
              if (U !== null && rm(U) === null) {
                t.child = M;
                break;
              }
              var j = M.sibling;
              M.sibling = w, w = M, M = j;
            }
            ES(
              t,
              !0,
              // isBackwards
              w,
              null,
              // last
              s
            );
            break;
          }
          case "together": {
            ES(
              t,
              !1,
              // isBackwards
              null,
              // tail
              null,
              // last
              void 0
            );
            break;
          }
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function _x(e, t, a) {
      hg(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = _f(t, null, i, a) : ya(e, t, i, a), t.child;
    }
    var C0 = !1;
    function Dx(e, t, a) {
      var i = t.type, u = i._context, s = t.pendingProps, f = t.memoizedProps, p = s.value;
      {
        "value" in s || C0 || (C0 = !0, S("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var v = t.type.propTypes;
        v && tl(v, s, "prop", "Context.Provider");
      }
      if (pC(t, u, p), f !== null) {
        var y = f.value;
        if (Q(y, p)) {
          if (f.children === s.children && !zh())
            return Vu(e, t, a);
        } else
          ww(t, u, a);
      }
      var g = s.children;
      return ya(e, t, g, a), t.child;
    }
    var R0 = !1;
    function kx(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (R0 || (R0 = !0, S("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var u = t.pendingProps, s = u.children;
      typeof s != "function" && S("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), kf(t, a);
      var f = er(i);
      pa(t);
      var p;
      return Op.current = t, $n(!0), p = s(f), $n(!1), va(), t.flags |= ti, ya(e, t, p, a), t.child;
    }
    function Np() {
      ul = !0;
    }
    function bm(e, t) {
      (t.mode & ut) === De && e !== null && (e.alternate = null, t.alternate = null, t.flags |= hn);
    }
    function Vu(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), KC(), Ip(t.lanes), Zr(a, t.childLanes) ? (Rw(e, t), t.child) : null;
    }
    function Ox(e, t, a) {
      {
        var i = t.return;
        if (i === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, t === i.child)
          i.child = a;
        else {
          var u = i.child;
          if (u === null)
            throw new Error("Expected parent to have a child.");
          for (; u.sibling !== t; )
            if (u = u.sibling, u === null)
              throw new Error("Expected to find the previous sibling.");
          u.sibling = a;
        }
        var s = i.deletions;
        return s === null ? (i.deletions = [e], i.flags |= Da) : s.push(e), a.flags |= hn, a;
      }
    }
    function CS(e, t) {
      var a = e.lanes;
      return !!Zr(a, t);
    }
    function Lx(e, t, a) {
      switch (t.tag) {
        case ee:
          v0(t), t.stateNode, bf();
          break;
        case ue:
          CC(t);
          break;
        case ve: {
          var i = t.type;
          $l(i) && Ah(t);
          break;
        }
        case Ce:
          hg(t, t.stateNode.containerInfo);
          break;
        case dt: {
          var u = t.memoizedProps.value, s = t.type._context;
          pC(t, s, u);
          break;
        }
        case vt:
          {
            var f = Zr(a, t.childLanes);
            f && (t.flags |= gt);
            {
              var p = t.stateNode;
              p.effectDuration = 0, p.passiveEffectDuration = 0;
            }
          }
          break;
        case be: {
          var v = t.memoizedState;
          if (v !== null) {
            if (v.dehydrated !== null)
              return Uo(t, Lf(al.current)), t.flags |= xe, null;
            var y = t.child, g = y.childLanes;
            if (Zr(a, g))
              return m0(e, t, a);
            Uo(t, Lf(al.current));
            var b = Vu(e, t, a);
            return b !== null ? b.sibling : null;
          } else
            Uo(t, Lf(al.current));
          break;
        }
        case an: {
          var w = (e.flags & xe) !== _e, M = Zr(a, t.childLanes);
          if (w) {
            if (M)
              return E0(e, t, a);
            t.flags |= xe;
          }
          var U = t.memoizedState;
          if (U !== null && (U.rendering = null, U.tail = null, U.lastEffect = null), Uo(t, al.current), M)
            break;
          return null;
        }
        case ke:
        case Ut:
          return t.lanes = $, f0(e, t, a);
      }
      return Vu(e, t, a);
    }
    function T0(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return Ox(e, t, KS(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, u = t.pendingProps;
        if (i !== u || zh() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          ul = !0;
        else {
          var s = CS(e, a);
          if (!s && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & xe) === _e)
            return ul = !1, Lx(e, t, a);
          (e.flags & wc) !== _e ? ul = !0 : ul = !1;
        }
      } else if (ul = !1, Ur() && nw(t)) {
        var f = t.index, p = rw();
        KE(t, p, f);
      }
      switch (t.lanes = $, t.tag) {
        case ot:
          return dx(e, t, t.type, a);
        case rn: {
          var v = t.elementType;
          return cx(e, t, v, a);
        }
        case de: {
          var y = t.type, g = t.pendingProps, b = t.elementType === y ? g : ll(y, g);
          return pS(e, t, y, b, a);
        }
        case ve: {
          var w = t.type, M = t.pendingProps, U = t.elementType === w ? M : ll(w, M);
          return p0(e, t, w, U, a);
        }
        case ee:
          return ux(e, t, a);
        case ue:
          return ox(e, t, a);
        case Ie:
          return sx(e, t);
        case be:
          return m0(e, t, a);
        case Ce:
          return _x(e, t, a);
        case Qe: {
          var j = t.type, le = t.pendingProps, Le = t.elementType === j ? le : ll(j, le);
          return o0(e, t, j, Le, a);
        }
        case yt:
          return ax(e, t, a);
        case pt:
          return ix(e, t, a);
        case vt:
          return lx(e, t, a);
        case dt:
          return Dx(e, t, a);
        case cn:
          return kx(e, t, a);
        case st: {
          var we = t.type, Ct = t.pendingProps, ht = ll(we, Ct);
          if (t.type !== t.elementType) {
            var k = we.propTypes;
            k && tl(
              k,
              ht,
              // Resolved for outer only
              "prop",
              Tt(we)
            );
          }
          return ht = ll(we.type, ht), s0(e, t, we, ht, a);
        }
        case Fe:
          return c0(e, t, t.type, t.pendingProps, a);
        case Ft: {
          var H = t.type, O = t.pendingProps, G = t.elementType === H ? O : ll(H, O);
          return fx(e, t, H, G, a);
        }
        case an:
          return E0(e, t, a);
        case xt:
          break;
        case ke:
          return f0(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Ff(e) {
      e.flags |= gt;
    }
    function w0(e) {
      e.flags |= Sn, e.flags |= vo;
    }
    var x0, RS, b0, _0;
    x0 = function(e, t, a, i) {
      for (var u = t.child; u !== null; ) {
        if (u.tag === ue || u.tag === Ie)
          JT(e, u.stateNode);
        else if (u.tag !== Ce) {
          if (u.child !== null) {
            u.child.return = u, u = u.child;
            continue;
          }
        }
        if (u === t)
          return;
        for (; u.sibling === null; ) {
          if (u.return === null || u.return === t)
            return;
          u = u.return;
        }
        u.sibling.return = u.return, u = u.sibling;
      }
    }, RS = function(e, t) {
    }, b0 = function(e, t, a, i, u) {
      var s = e.memoizedProps;
      if (s !== i) {
        var f = t.stateNode, p = mg(), v = t1(f, a, s, i, u, p);
        t.updateQueue = v, v && Ff(t);
      }
    }, _0 = function(e, t, a, i) {
      a !== i && Ff(t);
    };
    function zp(e, t) {
      if (!Ur())
        switch (e.tailMode) {
          case "hidden": {
            for (var a = e.tail, i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? e.tail = null : i.sibling = null;
            break;
          }
          case "collapsed": {
            for (var u = e.tail, s = null; u !== null; )
              u.alternate !== null && (s = u), u = u.sibling;
            s === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : s.sibling = null;
            break;
          }
        }
    }
    function Fr(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = $, i = _e;
      if (t) {
        if ((e.mode & Ot) !== De) {
          for (var v = e.selfBaseDuration, y = e.child; y !== null; )
            a = Xe(a, Xe(y.lanes, y.childLanes)), i |= y.subtreeFlags & Nn, i |= y.flags & Nn, v += y.treeBaseDuration, y = y.sibling;
          e.treeBaseDuration = v;
        } else
          for (var g = e.child; g !== null; )
            a = Xe(a, Xe(g.lanes, g.childLanes)), i |= g.subtreeFlags & Nn, i |= g.flags & Nn, g.return = e, g = g.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & Ot) !== De) {
          for (var u = e.actualDuration, s = e.selfBaseDuration, f = e.child; f !== null; )
            a = Xe(a, Xe(f.lanes, f.childLanes)), i |= f.subtreeFlags, i |= f.flags, u += f.actualDuration, s += f.treeBaseDuration, f = f.sibling;
          e.actualDuration = u, e.treeBaseDuration = s;
        } else
          for (var p = e.child; p !== null; )
            a = Xe(a, Xe(p.lanes, p.childLanes)), i |= p.subtreeFlags, i |= p.flags, p.return = e, p = p.sibling;
        e.subtreeFlags |= i;
      }
      return e.childLanes = a, t;
    }
    function Mx(e, t, a) {
      if (mw() && (t.mode & ut) !== De && (t.flags & xe) === _e)
        return aC(t), bf(), t.flags |= Er | os | Xn, !1;
      var i = Ph(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (vw(t), Fr(t), (t.mode & Ot) !== De) {
            var u = a !== null;
            if (u) {
              var s = t.child;
              s !== null && (t.treeBaseDuration -= s.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (bf(), (t.flags & xe) === _e && (t.memoizedState = null), t.flags |= gt, Fr(t), (t.mode & Ot) !== De) {
            var f = a !== null;
            if (f) {
              var p = t.child;
              p !== null && (t.treeBaseDuration -= p.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return iC(), !0;
    }
    function D0(e, t, a) {
      var i = t.pendingProps;
      switch (Gy(t), t.tag) {
        case ot:
        case rn:
        case Fe:
        case de:
        case Qe:
        case yt:
        case pt:
        case vt:
        case cn:
        case st:
          return Fr(t), null;
        case ve: {
          var u = t.type;
          return $l(u) && Uh(t), Fr(t), null;
        }
        case ee: {
          var s = t.stateNode;
          if (Of(t), Yy(t), Cg(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), e === null || e.child === null) {
            var f = Ph(t);
            if (f)
              Ff(t);
            else if (e !== null) {
              var p = e.memoizedState;
              // Check if this is a client root
              (!p.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & Er) !== _e) && (t.flags |= Yn, iC());
            }
          }
          return RS(e, t), Fr(t), null;
        }
        case ue: {
          yg(t);
          var v = EC(), y = t.type;
          if (e !== null && t.stateNode != null)
            b0(e, t, y, i, v), e.ref !== t.ref && w0(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Fr(t), null;
            }
            var g = mg(), b = Ph(t);
            if (b)
              dw(t, v, g) && Ff(t);
            else {
              var w = ZT(y, i, v, g, t);
              x0(w, t, !1, !1), t.stateNode = w, e1(w, y, i, v) && Ff(t);
            }
            t.ref !== null && w0(t);
          }
          return Fr(t), null;
        }
        case Ie: {
          var M = i;
          if (e && t.stateNode != null) {
            var U = e.memoizedProps;
            _0(e, t, U, M);
          } else {
            if (typeof M != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var j = EC(), le = mg(), Le = Ph(t);
            Le ? pw(t) && Ff(t) : t.stateNode = n1(M, j, le, t);
          }
          return Fr(t), null;
        }
        case be: {
          Mf(t);
          var we = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var Ct = Mx(e, t, we);
            if (!Ct)
              return t.flags & Xn ? t : null;
          }
          if ((t.flags & xe) !== _e)
            return t.lanes = a, (t.mode & Ot) !== De && Qg(t), t;
          var ht = we !== null, k = e !== null && e.memoizedState !== null;
          if (ht !== k && ht) {
            var H = t.child;
            if (H.flags |= Mn, (t.mode & ut) !== De) {
              var O = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              O || gg(al.current, TC) ? Nb() : VS();
            }
          }
          var G = t.updateQueue;
          if (G !== null && (t.flags |= gt), Fr(t), (t.mode & Ot) !== De && ht) {
            var fe = t.child;
            fe !== null && (t.treeBaseDuration -= fe.treeBaseDuration);
          }
          return null;
        }
        case Ce:
          return Of(t), RS(e, t), e === null && q1(t.stateNode.containerInfo), Fr(t), null;
        case dt:
          var oe = t.type._context;
          return og(oe, t), Fr(t), null;
        case Ft: {
          var He = t.type;
          return $l(He) && Uh(t), Fr(t), null;
        }
        case an: {
          Mf(t);
          var We = t.memoizedState;
          if (We === null)
            return Fr(t), null;
          var qt = (t.flags & xe) !== _e, Nt = We.rendering;
          if (Nt === null)
            if (qt)
              zp(We, !1);
            else {
              var Wn = Ub() && (e === null || (e.flags & xe) === _e);
              if (!Wn)
                for (var zt = t.child; zt !== null; ) {
                  var Hn = rm(zt);
                  if (Hn !== null) {
                    qt = !0, t.flags |= xe, zp(We, !1);
                    var ia = Hn.updateQueue;
                    return ia !== null && (t.updateQueue = ia, t.flags |= gt), t.subtreeFlags = _e, Tw(t, a), Uo(t, Sg(al.current, Cp)), t.child;
                  }
                  zt = zt.sibling;
                }
              We.tail !== null && In() > q0() && (t.flags |= xe, qt = !0, zp(We, !1), t.lanes = bd);
            }
          else {
            if (!qt) {
              var Br = rm(Nt);
              if (Br !== null) {
                t.flags |= xe, qt = !0;
                var oi = Br.updateQueue;
                if (oi !== null && (t.updateQueue = oi, t.flags |= gt), zp(We, !0), We.tail === null && We.tailMode === "hidden" && !Nt.alternate && !Ur())
                  return Fr(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              In() * 2 - We.renderingStartTime > q0() && a !== Kr && (t.flags |= xe, qt = !0, zp(We, !1), t.lanes = bd);
            }
            if (We.isBackwards)
              Nt.sibling = t.child, t.child = Nt;
            else {
              var Ea = We.last;
              Ea !== null ? Ea.sibling = Nt : t.child = Nt, We.last = Nt;
            }
          }
          if (We.tail !== null) {
            var Ca = We.tail;
            We.rendering = Ca, We.tail = Ca.sibling, We.renderingStartTime = In(), Ca.sibling = null;
            var la = al.current;
            return qt ? la = Sg(la, Cp) : la = Lf(la), Uo(t, la), Ca;
          }
          return Fr(t), null;
        }
        case xt:
          break;
        case ke:
        case Ut: {
          HS(t);
          var Iu = t.memoizedState, If = Iu !== null;
          if (e !== null) {
            var Xp = e.memoizedState, Kl = Xp !== null;
            Kl !== If && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !ne && (t.flags |= Mn);
          }
          return !If || (t.mode & ut) === De ? Fr(t) : Zr(Xl, Kr) && (Fr(t), t.subtreeFlags & (hn | gt) && (t.flags |= Mn)), null;
        }
        case bt:
          return null;
        case Dt:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Nx(e, t, a) {
      switch (Gy(t), t.tag) {
        case ve: {
          var i = t.type;
          $l(i) && Uh(t);
          var u = t.flags;
          return u & Xn ? (t.flags = u & ~Xn | xe, (t.mode & Ot) !== De && Qg(t), t) : null;
        }
        case ee: {
          t.stateNode, Of(t), Yy(t), Cg();
          var s = t.flags;
          return (s & Xn) !== _e && (s & xe) === _e ? (t.flags = s & ~Xn | xe, t) : null;
        }
        case ue:
          return yg(t), null;
        case be: {
          Mf(t);
          var f = t.memoizedState;
          if (f !== null && f.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            bf();
          }
          var p = t.flags;
          return p & Xn ? (t.flags = p & ~Xn | xe, (t.mode & Ot) !== De && Qg(t), t) : null;
        }
        case an:
          return Mf(t), null;
        case Ce:
          return Of(t), null;
        case dt:
          var v = t.type._context;
          return og(v, t), null;
        case ke:
        case Ut:
          return HS(t), null;
        case bt:
          return null;
        default:
          return null;
      }
    }
    function k0(e, t, a) {
      switch (Gy(t), t.tag) {
        case ve: {
          var i = t.type.childContextTypes;
          i != null && Uh(t);
          break;
        }
        case ee: {
          t.stateNode, Of(t), Yy(t), Cg();
          break;
        }
        case ue: {
          yg(t);
          break;
        }
        case Ce:
          Of(t);
          break;
        case be:
          Mf(t);
          break;
        case an:
          Mf(t);
          break;
        case dt:
          var u = t.type._context;
          og(u, t);
          break;
        case ke:
        case Ut:
          HS(t);
          break;
      }
    }
    var O0 = null;
    O0 = /* @__PURE__ */ new Set();
    var _m = !1, jr = !1, zx = typeof WeakSet == "function" ? WeakSet : Set, ge = null, jf = null, Hf = null;
    function Ux(e) {
      xl(null, function() {
        throw e;
      }), us();
    }
    var Ax = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & Ot)
        try {
          Gl(), t.componentWillUnmount();
        } finally {
          Wl(e);
        }
      else
        t.componentWillUnmount();
    };
    function L0(e, t) {
      try {
        jo(cr, e);
      } catch (a) {
        sn(e, t, a);
      }
    }
    function TS(e, t, a) {
      try {
        Ax(e, a);
      } catch (i) {
        sn(e, t, i);
      }
    }
    function Fx(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        sn(e, t, i);
      }
    }
    function M0(e, t) {
      try {
        z0(e);
      } catch (a) {
        sn(e, t, a);
      }
    }
    function Vf(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var i;
          try {
            if (Ue && at && e.mode & Ot)
              try {
                Gl(), i = a(null);
              } finally {
                Wl(e);
              }
            else
              i = a(null);
          } catch (u) {
            sn(e, t, u);
          }
          typeof i == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Pe(e));
        } else
          a.current = null;
    }
    function Dm(e, t, a) {
      try {
        a();
      } catch (i) {
        sn(e, t, i);
      }
    }
    var N0 = !1;
    function jx(e, t) {
      XT(e.containerInfo), ge = t, Hx();
      var a = N0;
      return N0 = !1, a;
    }
    function Hx() {
      for (; ge !== null; ) {
        var e = ge, t = e.child;
        (e.subtreeFlags & _l) !== _e && t !== null ? (t.return = e, ge = t) : Vx();
      }
    }
    function Vx() {
      for (; ge !== null; ) {
        var e = ge;
        Yt(e);
        try {
          Px(e);
        } catch (a) {
          sn(e, e.return, a);
        }
        on();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, ge = t;
          return;
        }
        ge = e.return;
      }
    }
    function Px(e) {
      var t = e.alternate, a = e.flags;
      if ((a & Yn) !== _e) {
        switch (Yt(e), e.tag) {
          case de:
          case Qe:
          case Fe:
            break;
          case ve: {
            if (t !== null) {
              var i = t.memoizedProps, u = t.memoizedState, s = e.stateNode;
              e.type === e.elementType && !ec && (s.props !== e.memoizedProps && S("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Pe(e) || "instance"), s.state !== e.memoizedState && S("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Pe(e) || "instance"));
              var f = s.getSnapshotBeforeUpdate(e.elementType === e.type ? i : ll(e.type, i), u);
              {
                var p = O0;
                f === void 0 && !p.has(e.type) && (p.add(e.type), S("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Pe(e)));
              }
              s.__reactInternalSnapshotBeforeUpdate = f;
            }
            break;
          }
          case ee: {
            {
              var v = e.stateNode;
              C1(v.containerInfo);
            }
            break;
          }
          case ue:
          case Ie:
          case Ce:
          case Ft:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        on();
      }
    }
    function ol(e, t, a) {
      var i = t.updateQueue, u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var s = u.next, f = s;
        do {
          if ((f.tag & e) === e) {
            var p = f.destroy;
            f.destroy = void 0, p !== void 0 && ((e & Ar) !== Ha ? qi(t) : (e & cr) !== Ha && cs(t), (e & Yl) !== Ha && Wp(!0), Dm(t, a, p), (e & Yl) !== Ha && Wp(!1), (e & Ar) !== Ha ? Ll() : (e & cr) !== Ha && wd());
          }
          f = f.next;
        } while (f !== s);
      }
    }
    function jo(e, t) {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var u = i.next, s = u;
        do {
          if ((s.tag & e) === e) {
            (e & Ar) !== Ha ? Td(t) : (e & cr) !== Ha && Oc(t);
            var f = s.create;
            (e & Yl) !== Ha && Wp(!0), s.destroy = f(), (e & Yl) !== Ha && Wp(!1), (e & Ar) !== Ha ? Nv() : (e & cr) !== Ha && zv();
            {
              var p = s.destroy;
              if (p !== void 0 && typeof p != "function") {
                var v = void 0;
                (s.tag & cr) !== _e ? v = "useLayoutEffect" : (s.tag & Yl) !== _e ? v = "useInsertionEffect" : v = "useEffect";
                var y = void 0;
                p === null ? y = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof p.then == "function" ? y = `

It looks like you wrote ` + v + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + v + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : y = " You returned: " + p, S("%s must not return anything besides a function, which is used for clean-up.%s", v, y);
              }
            }
          }
          s = s.next;
        } while (s !== u);
      }
    }
    function Bx(e, t) {
      if ((t.flags & gt) !== _e)
        switch (t.tag) {
          case vt: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, u = i.id, s = i.onPostCommit, f = qC(), p = t.alternate === null ? "mount" : "update";
            GC() && (p = "nested-update"), typeof s == "function" && s(u, p, a, f);
            var v = t.return;
            e: for (; v !== null; ) {
              switch (v.tag) {
                case ee:
                  var y = v.stateNode;
                  y.passiveEffectDuration += a;
                  break e;
                case vt:
                  var g = v.stateNode;
                  g.passiveEffectDuration += a;
                  break e;
              }
              v = v.return;
            }
            break;
          }
        }
    }
    function $x(e, t, a, i) {
      if ((a.flags & kl) !== _e)
        switch (a.tag) {
          case de:
          case Qe:
          case Fe: {
            if (!jr)
              if (a.mode & Ot)
                try {
                  Gl(), jo(cr | sr, a);
                } finally {
                  Wl(a);
                }
              else
                jo(cr | sr, a);
            break;
          }
          case ve: {
            var u = a.stateNode;
            if (a.flags & gt && !jr)
              if (t === null)
                if (a.type === a.elementType && !ec && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Pe(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Pe(a) || "instance")), a.mode & Ot)
                  try {
                    Gl(), u.componentDidMount();
                  } finally {
                    Wl(a);
                  }
                else
                  u.componentDidMount();
              else {
                var s = a.elementType === a.type ? t.memoizedProps : ll(a.type, t.memoizedProps), f = t.memoizedState;
                if (a.type === a.elementType && !ec && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Pe(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Pe(a) || "instance")), a.mode & Ot)
                  try {
                    Gl(), u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    Wl(a);
                  }
                else
                  u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
              }
            var p = a.updateQueue;
            p !== null && (a.type === a.elementType && !ec && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Pe(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Pe(a) || "instance")), SC(a, p, u));
            break;
          }
          case ee: {
            var v = a.updateQueue;
            if (v !== null) {
              var y = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case ue:
                    y = a.child.stateNode;
                    break;
                  case ve:
                    y = a.child.stateNode;
                    break;
                }
              SC(a, v, y);
            }
            break;
          }
          case ue: {
            var g = a.stateNode;
            if (t === null && a.flags & gt) {
              var b = a.type, w = a.memoizedProps;
              u1(g, b, w);
            }
            break;
          }
          case Ie:
            break;
          case Ce:
            break;
          case vt: {
            {
              var M = a.memoizedProps, U = M.onCommit, j = M.onRender, le = a.stateNode.effectDuration, Le = qC(), we = t === null ? "mount" : "update";
              GC() && (we = "nested-update"), typeof j == "function" && j(a.memoizedProps.id, we, a.actualDuration, a.treeBaseDuration, a.actualStartTime, Le);
              {
                typeof U == "function" && U(a.memoizedProps.id, we, le, Le), Vb(a);
                var Ct = a.return;
                e: for (; Ct !== null; ) {
                  switch (Ct.tag) {
                    case ee:
                      var ht = Ct.stateNode;
                      ht.effectDuration += le;
                      break e;
                    case vt:
                      var k = Ct.stateNode;
                      k.effectDuration += le;
                      break e;
                  }
                  Ct = Ct.return;
                }
              }
            }
            break;
          }
          case be: {
            Kx(e, a);
            break;
          }
          case an:
          case Ft:
          case xt:
          case ke:
          case Ut:
          case Dt:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      jr || a.flags & Sn && z0(a);
    }
    function Yx(e) {
      switch (e.tag) {
        case de:
        case Qe:
        case Fe: {
          if (e.mode & Ot)
            try {
              Gl(), L0(e, e.return);
            } finally {
              Wl(e);
            }
          else
            L0(e, e.return);
          break;
        }
        case ve: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && Fx(e, e.return, t), M0(e, e.return);
          break;
        }
        case ue: {
          M0(e, e.return);
          break;
        }
      }
    }
    function Ix(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === ue) {
          if (a === null) {
            a = i;
            try {
              var u = i.stateNode;
              t ? y1(u) : S1(i.stateNode, i.memoizedProps);
            } catch (f) {
              sn(e, e.return, f);
            }
          }
        } else if (i.tag === Ie) {
          if (a === null)
            try {
              var s = i.stateNode;
              t ? g1(s) : E1(s, i.memoizedProps);
            } catch (f) {
              sn(e, e.return, f);
            }
        } else if (!((i.tag === ke || i.tag === Ut) && i.memoizedState !== null && i !== e)) {
          if (i.child !== null) {
            i.child.return = i, i = i.child;
            continue;
          }
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          a === i && (a = null), i = i.return;
        }
        a === i && (a = null), i.sibling.return = i.return, i = i.sibling;
      }
    }
    function z0(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case ue:
            i = a;
            break;
          default:
            i = a;
        }
        if (typeof t == "function") {
          var u;
          if (e.mode & Ot)
            try {
              Gl(), u = t(i);
            } finally {
              Wl(e);
            }
          else
            u = t(i);
          typeof u == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Pe(e));
        } else
          t.hasOwnProperty("current") || S("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Pe(e)), t.current = i;
      }
    }
    function Qx(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function U0(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, U0(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === ue) {
          var a = e.stateNode;
          a !== null && Z1(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function Wx(e) {
      for (var t = e.return; t !== null; ) {
        if (A0(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function A0(e) {
      return e.tag === ue || e.tag === ee || e.tag === Ce;
    }
    function F0(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || A0(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== ue && t.tag !== Ie && t.tag !== Kt; ) {
          if (t.flags & hn || t.child === null || t.tag === Ce)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & hn))
          return t.stateNode;
      }
    }
    function Gx(e) {
      var t = Wx(e);
      switch (t.tag) {
        case ue: {
          var a = t.stateNode;
          t.flags & ka && (HE(a), t.flags &= ~ka);
          var i = F0(e);
          xS(e, i, a);
          break;
        }
        case ee:
        case Ce: {
          var u = t.stateNode.containerInfo, s = F0(e);
          wS(e, s, u);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function wS(e, t, a) {
      var i = e.tag, u = i === ue || i === Ie;
      if (u) {
        var s = e.stateNode;
        t ? p1(a, s, t) : f1(a, s);
      } else if (i !== Ce) {
        var f = e.child;
        if (f !== null) {
          wS(f, t, a);
          for (var p = f.sibling; p !== null; )
            wS(p, t, a), p = p.sibling;
        }
      }
    }
    function xS(e, t, a) {
      var i = e.tag, u = i === ue || i === Ie;
      if (u) {
        var s = e.stateNode;
        t ? d1(a, s, t) : c1(a, s);
      } else if (i !== Ce) {
        var f = e.child;
        if (f !== null) {
          xS(f, t, a);
          for (var p = f.sibling; p !== null; )
            xS(p, t, a), p = p.sibling;
        }
      }
    }
    var Hr = null, sl = !1;
    function qx(e, t, a) {
      {
        var i = t;
        e: for (; i !== null; ) {
          switch (i.tag) {
            case ue: {
              Hr = i.stateNode, sl = !1;
              break e;
            }
            case ee: {
              Hr = i.stateNode.containerInfo, sl = !0;
              break e;
            }
            case Ce: {
              Hr = i.stateNode.containerInfo, sl = !0;
              break e;
            }
          }
          i = i.return;
        }
        if (Hr === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        j0(e, t, a), Hr = null, sl = !1;
      }
      Qx(a);
    }
    function Ho(e, t, a) {
      for (var i = a.child; i !== null; )
        j0(e, t, i), i = i.sibling;
    }
    function j0(e, t, a) {
      switch (Ed(a), a.tag) {
        case ue:
          jr || Vf(a, t);
        case Ie: {
          {
            var i = Hr, u = sl;
            Hr = null, Ho(e, t, a), Hr = i, sl = u, Hr !== null && (sl ? h1(Hr, a.stateNode) : v1(Hr, a.stateNode));
          }
          return;
        }
        case Kt: {
          Hr !== null && (sl ? m1(Hr, a.stateNode) : Ay(Hr, a.stateNode));
          return;
        }
        case Ce: {
          {
            var s = Hr, f = sl;
            Hr = a.stateNode.containerInfo, sl = !0, Ho(e, t, a), Hr = s, sl = f;
          }
          return;
        }
        case de:
        case Qe:
        case st:
        case Fe: {
          if (!jr) {
            var p = a.updateQueue;
            if (p !== null) {
              var v = p.lastEffect;
              if (v !== null) {
                var y = v.next, g = y;
                do {
                  var b = g, w = b.destroy, M = b.tag;
                  w !== void 0 && ((M & Yl) !== Ha ? Dm(a, t, w) : (M & cr) !== Ha && (cs(a), a.mode & Ot ? (Gl(), Dm(a, t, w), Wl(a)) : Dm(a, t, w), wd())), g = g.next;
                } while (g !== y);
              }
            }
          }
          Ho(e, t, a);
          return;
        }
        case ve: {
          if (!jr) {
            Vf(a, t);
            var U = a.stateNode;
            typeof U.componentWillUnmount == "function" && TS(a, t, U);
          }
          Ho(e, t, a);
          return;
        }
        case xt: {
          Ho(e, t, a);
          return;
        }
        case ke: {
          if (
            // TODO: Remove this dead flag
            a.mode & ut
          ) {
            var j = jr;
            jr = j || a.memoizedState !== null, Ho(e, t, a), jr = j;
          } else
            Ho(e, t, a);
          break;
        }
        default: {
          Ho(e, t, a);
          return;
        }
      }
    }
    function Xx(e) {
      e.memoizedState;
    }
    function Kx(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var u = i.memoizedState;
          if (u !== null) {
            var s = u.dehydrated;
            s !== null && U1(s);
          }
        }
      }
    }
    function H0(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new zx()), t.forEach(function(i) {
          var u = Wb.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), Xr)
              if (jf !== null && Hf !== null)
                Qp(Hf, jf);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(u, u);
          }
        });
      }
    }
    function Zx(e, t, a) {
      jf = a, Hf = e, Yt(t), V0(t, e), Yt(t), jf = null, Hf = null;
    }
    function cl(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u];
          try {
            qx(e, t, s);
          } catch (v) {
            sn(s, t, v);
          }
        }
      var f = gl();
      if (t.subtreeFlags & Dl)
        for (var p = t.child; p !== null; )
          Yt(p), V0(p, e), p = p.sibling;
      Yt(f);
    }
    function V0(e, t, a) {
      var i = e.alternate, u = e.flags;
      switch (e.tag) {
        case de:
        case Qe:
        case st:
        case Fe: {
          if (cl(t, e), ql(e), u & gt) {
            try {
              ol(Yl | sr, e, e.return), jo(Yl | sr, e);
            } catch (He) {
              sn(e, e.return, He);
            }
            if (e.mode & Ot) {
              try {
                Gl(), ol(cr | sr, e, e.return);
              } catch (He) {
                sn(e, e.return, He);
              }
              Wl(e);
            } else
              try {
                ol(cr | sr, e, e.return);
              } catch (He) {
                sn(e, e.return, He);
              }
          }
          return;
        }
        case ve: {
          cl(t, e), ql(e), u & Sn && i !== null && Vf(i, i.return);
          return;
        }
        case ue: {
          cl(t, e), ql(e), u & Sn && i !== null && Vf(i, i.return);
          {
            if (e.flags & ka) {
              var s = e.stateNode;
              try {
                HE(s);
              } catch (He) {
                sn(e, e.return, He);
              }
            }
            if (u & gt) {
              var f = e.stateNode;
              if (f != null) {
                var p = e.memoizedProps, v = i !== null ? i.memoizedProps : p, y = e.type, g = e.updateQueue;
                if (e.updateQueue = null, g !== null)
                  try {
                    o1(f, g, y, v, p, e);
                  } catch (He) {
                    sn(e, e.return, He);
                  }
              }
            }
          }
          return;
        }
        case Ie: {
          if (cl(t, e), ql(e), u & gt) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var b = e.stateNode, w = e.memoizedProps, M = i !== null ? i.memoizedProps : w;
            try {
              s1(b, M, w);
            } catch (He) {
              sn(e, e.return, He);
            }
          }
          return;
        }
        case ee: {
          if (cl(t, e), ql(e), u & gt && i !== null) {
            var U = i.memoizedState;
            if (U.isDehydrated)
              try {
                z1(t.containerInfo);
              } catch (He) {
                sn(e, e.return, He);
              }
          }
          return;
        }
        case Ce: {
          cl(t, e), ql(e);
          return;
        }
        case be: {
          cl(t, e), ql(e);
          var j = e.child;
          if (j.flags & Mn) {
            var le = j.stateNode, Le = j.memoizedState, we = Le !== null;
            if (le.isHidden = we, we) {
              var Ct = j.alternate !== null && j.alternate.memoizedState !== null;
              Ct || Mb();
            }
          }
          if (u & gt) {
            try {
              Xx(e);
            } catch (He) {
              sn(e, e.return, He);
            }
            H0(e);
          }
          return;
        }
        case ke: {
          var ht = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & ut
          ) {
            var k = jr;
            jr = k || ht, cl(t, e), jr = k;
          } else
            cl(t, e);
          if (ql(e), u & Mn) {
            var H = e.stateNode, O = e.memoizedState, G = O !== null, fe = e;
            if (H.isHidden = G, G && !ht && (fe.mode & ut) !== De) {
              ge = fe;
              for (var oe = fe.child; oe !== null; )
                ge = oe, eb(oe), oe = oe.sibling;
            }
            Ix(fe, G);
          }
          return;
        }
        case an: {
          cl(t, e), ql(e), u & gt && H0(e);
          return;
        }
        case xt:
          return;
        default: {
          cl(t, e), ql(e);
          return;
        }
      }
    }
    function ql(e) {
      var t = e.flags;
      if (t & hn) {
        try {
          Gx(e);
        } catch (a) {
          sn(e, e.return, a);
        }
        e.flags &= ~hn;
      }
      t & Wr && (e.flags &= ~Wr);
    }
    function Jx(e, t, a) {
      jf = a, Hf = t, ge = e, P0(e, t, a), jf = null, Hf = null;
    }
    function P0(e, t, a) {
      for (var i = (e.mode & ut) !== De; ge !== null; ) {
        var u = ge, s = u.child;
        if (u.tag === ke && i) {
          var f = u.memoizedState !== null, p = f || _m;
          if (p) {
            bS(e, t, a);
            continue;
          } else {
            var v = u.alternate, y = v !== null && v.memoizedState !== null, g = y || jr, b = _m, w = jr;
            _m = p, jr = g, jr && !w && (ge = u, tb(u));
            for (var M = s; M !== null; )
              ge = M, P0(
                M,
                // New root; bubble back up to here and stop.
                t,
                a
              ), M = M.sibling;
            ge = u, _m = b, jr = w, bS(e, t, a);
            continue;
          }
        }
        (u.subtreeFlags & kl) !== _e && s !== null ? (s.return = u, ge = s) : bS(e, t, a);
      }
    }
    function bS(e, t, a) {
      for (; ge !== null; ) {
        var i = ge;
        if ((i.flags & kl) !== _e) {
          var u = i.alternate;
          Yt(i);
          try {
            $x(t, u, i, a);
          } catch (f) {
            sn(i, i.return, f);
          }
          on();
        }
        if (i === e) {
          ge = null;
          return;
        }
        var s = i.sibling;
        if (s !== null) {
          s.return = i.return, ge = s;
          return;
        }
        ge = i.return;
      }
    }
    function eb(e) {
      for (; ge !== null; ) {
        var t = ge, a = t.child;
        switch (t.tag) {
          case de:
          case Qe:
          case st:
          case Fe: {
            if (t.mode & Ot)
              try {
                Gl(), ol(cr, t, t.return);
              } finally {
                Wl(t);
              }
            else
              ol(cr, t, t.return);
            break;
          }
          case ve: {
            Vf(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && TS(t, t.return, i);
            break;
          }
          case ue: {
            Vf(t, t.return);
            break;
          }
          case ke: {
            var u = t.memoizedState !== null;
            if (u) {
              B0(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, ge = a) : B0(e);
      }
    }
    function B0(e) {
      for (; ge !== null; ) {
        var t = ge;
        if (t === e) {
          ge = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, ge = a;
          return;
        }
        ge = t.return;
      }
    }
    function tb(e) {
      for (; ge !== null; ) {
        var t = ge, a = t.child;
        if (t.tag === ke) {
          var i = t.memoizedState !== null;
          if (i) {
            $0(e);
            continue;
          }
        }
        a !== null ? (a.return = t, ge = a) : $0(e);
      }
    }
    function $0(e) {
      for (; ge !== null; ) {
        var t = ge;
        Yt(t);
        try {
          Yx(t);
        } catch (i) {
          sn(t, t.return, i);
        }
        if (on(), t === e) {
          ge = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, ge = a;
          return;
        }
        ge = t.return;
      }
    }
    function nb(e, t, a, i) {
      ge = t, rb(t, e, a, i);
    }
    function rb(e, t, a, i) {
      for (; ge !== null; ) {
        var u = ge, s = u.child;
        (u.subtreeFlags & Wi) !== _e && s !== null ? (s.return = u, ge = s) : ab(e, t, a, i);
      }
    }
    function ab(e, t, a, i) {
      for (; ge !== null; ) {
        var u = ge;
        if ((u.flags & Qr) !== _e) {
          Yt(u);
          try {
            ib(t, u, a, i);
          } catch (f) {
            sn(u, u.return, f);
          }
          on();
        }
        if (u === e) {
          ge = null;
          return;
        }
        var s = u.sibling;
        if (s !== null) {
          s.return = u.return, ge = s;
          return;
        }
        ge = u.return;
      }
    }
    function ib(e, t, a, i) {
      switch (t.tag) {
        case de:
        case Qe:
        case Fe: {
          if (t.mode & Ot) {
            Ig();
            try {
              jo(Ar | sr, t);
            } finally {
              Yg(t);
            }
          } else
            jo(Ar | sr, t);
          break;
        }
      }
    }
    function lb(e) {
      ge = e, ub();
    }
    function ub() {
      for (; ge !== null; ) {
        var e = ge, t = e.child;
        if ((ge.flags & Da) !== _e) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var u = a[i];
              ge = u, cb(u, e);
            }
            {
              var s = e.alternate;
              if (s !== null) {
                var f = s.child;
                if (f !== null) {
                  s.child = null;
                  do {
                    var p = f.sibling;
                    f.sibling = null, f = p;
                  } while (f !== null);
                }
              }
            }
            ge = e;
          }
        }
        (e.subtreeFlags & Wi) !== _e && t !== null ? (t.return = e, ge = t) : ob();
      }
    }
    function ob() {
      for (; ge !== null; ) {
        var e = ge;
        (e.flags & Qr) !== _e && (Yt(e), sb(e), on());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, ge = t;
          return;
        }
        ge = e.return;
      }
    }
    function sb(e) {
      switch (e.tag) {
        case de:
        case Qe:
        case Fe: {
          e.mode & Ot ? (Ig(), ol(Ar | sr, e, e.return), Yg(e)) : ol(Ar | sr, e, e.return);
          break;
        }
      }
    }
    function cb(e, t) {
      for (; ge !== null; ) {
        var a = ge;
        Yt(a), db(a, t), on();
        var i = a.child;
        i !== null ? (i.return = a, ge = i) : fb(e);
      }
    }
    function fb(e) {
      for (; ge !== null; ) {
        var t = ge, a = t.sibling, i = t.return;
        if (U0(t), t === e) {
          ge = null;
          return;
        }
        if (a !== null) {
          a.return = i, ge = a;
          return;
        }
        ge = i;
      }
    }
    function db(e, t) {
      switch (e.tag) {
        case de:
        case Qe:
        case Fe: {
          e.mode & Ot ? (Ig(), ol(Ar, e, t), Yg(e)) : ol(Ar, e, t);
          break;
        }
      }
    }
    function pb(e) {
      switch (e.tag) {
        case de:
        case Qe:
        case Fe: {
          try {
            jo(cr | sr, e);
          } catch (a) {
            sn(e, e.return, a);
          }
          break;
        }
        case ve: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            sn(e, e.return, a);
          }
          break;
        }
      }
    }
    function vb(e) {
      switch (e.tag) {
        case de:
        case Qe:
        case Fe: {
          try {
            jo(Ar | sr, e);
          } catch (t) {
            sn(e, e.return, t);
          }
          break;
        }
      }
    }
    function hb(e) {
      switch (e.tag) {
        case de:
        case Qe:
        case Fe: {
          try {
            ol(cr | sr, e, e.return);
          } catch (a) {
            sn(e, e.return, a);
          }
          break;
        }
        case ve: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && TS(e, e.return, t);
          break;
        }
      }
    }
    function mb(e) {
      switch (e.tag) {
        case de:
        case Qe:
        case Fe:
          try {
            ol(Ar | sr, e, e.return);
          } catch (t) {
            sn(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var Up = Symbol.for;
      Up("selector.component"), Up("selector.has_pseudo_class"), Up("selector.role"), Up("selector.test_id"), Up("selector.text");
    }
    var yb = [];
    function gb() {
      yb.forEach(function(e) {
        return e();
      });
    }
    var Sb = A.ReactCurrentActQueue;
    function Eb(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function Y0() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && Sb.current !== null && S("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var Cb = Math.ceil, _S = A.ReactCurrentDispatcher, DS = A.ReactCurrentOwner, Vr = A.ReactCurrentBatchConfig, fl = A.ReactCurrentActQueue, pr = (
      /*             */
      0
    ), I0 = (
      /*               */
      1
    ), Pr = (
      /*                */
      2
    ), Ai = (
      /*                */
      4
    ), Pu = 0, Ap = 1, tc = 2, km = 3, Fp = 4, Q0 = 5, kS = 6, Et = pr, ga = null, Dn = null, vr = $, Xl = $, OS = ko($), hr = Pu, jp = null, Om = $, Hp = $, Lm = $, Vp = null, Va = null, LS = 0, W0 = 500, G0 = 1 / 0, Rb = 500, Bu = null;
    function Pp() {
      G0 = In() + Rb;
    }
    function q0() {
      return G0;
    }
    var Mm = !1, MS = null, Pf = null, nc = !1, Vo = null, Bp = $, NS = [], zS = null, Tb = 50, $p = 0, US = null, AS = !1, Nm = !1, wb = 50, Bf = 0, zm = null, Yp = Xt, Um = $, X0 = !1;
    function Am() {
      return ga;
    }
    function Sa() {
      return (Et & (Pr | Ai)) !== pr ? In() : (Yp !== Xt || (Yp = In()), Yp);
    }
    function Po(e) {
      var t = e.mode;
      if ((t & ut) === De)
        return Ae;
      if ((Et & Pr) !== pr && vr !== $)
        return Ts(vr);
      var a = Sw() !== gw;
      if (a) {
        if (Vr.transition !== null) {
          var i = Vr.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return Um === _t && (Um = Md()), Um;
      }
      var u = Ua();
      if (u !== _t)
        return u;
      var s = r1();
      return s;
    }
    function xb(e) {
      var t = e.mode;
      return (t & ut) === De ? Ae : Vv();
    }
    function mr(e, t, a, i) {
      qb(), X0 && S("useInsertionEffect must not schedule updates."), AS && (Nm = !0), go(e, a, i), (Et & Pr) !== $ && e === ga ? Zb(t) : (Xr && bs(e, t, a), Jb(t), e === ga && ((Et & Pr) === pr && (Hp = Xe(Hp, a)), hr === Fp && Bo(e, vr)), Pa(e, i), a === Ae && Et === pr && (t.mode & ut) === De && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !fl.isBatchingLegacy && (Pp(), XE()));
    }
    function bb(e, t, a) {
      var i = e.current;
      i.lanes = t, go(e, t, a), Pa(e, a);
    }
    function _b(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (Et & Pr) !== pr
      );
    }
    function Pa(e, t) {
      var a = e.callbackNode;
      Xc(e, t);
      var i = qc(e, e === ga ? vr : $);
      if (i === $) {
        a !== null && dR(a), e.callbackNode = null, e.callbackPriority = _t;
        return;
      }
      var u = zl(i), s = e.callbackPriority;
      if (s === u && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(fl.current !== null && a !== $S)) {
        a == null && s !== Ae && S("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && dR(a);
      var f;
      if (u === Ae)
        e.tag === Oo ? (fl.isBatchingLegacy !== null && (fl.didScheduleLegacyUpdate = !0), tw(J0.bind(null, e))) : qE(J0.bind(null, e)), fl.current !== null ? fl.current.push(Lo) : i1(function() {
          (Et & (Pr | Ai)) === pr && Lo();
        }), f = null;
      else {
        var p;
        switch (Wv(i)) {
          case Or:
            p = ss;
            break;
          case bi:
            p = Ol;
            break;
          case Na:
            p = Gi;
            break;
          case za:
            p = hu;
            break;
          default:
            p = Gi;
            break;
        }
        f = YS(p, K0.bind(null, e));
      }
      e.callbackPriority = u, e.callbackNode = f;
    }
    function K0(e, t) {
      if (Iw(), Yp = Xt, Um = $, (Et & (Pr | Ai)) !== pr)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = Yu();
      if (i && e.callbackNode !== a)
        return null;
      var u = qc(e, e === ga ? vr : $);
      if (u === $)
        return null;
      var s = !Zc(e, u) && !Hv(e, u) && !t, f = s ? Fb(e, u) : jm(e, u);
      if (f !== Pu) {
        if (f === tc) {
          var p = Kc(e);
          p !== $ && (u = p, f = FS(e, p));
        }
        if (f === Ap) {
          var v = jp;
          throw rc(e, $), Bo(e, u), Pa(e, In()), v;
        }
        if (f === kS)
          Bo(e, u);
        else {
          var y = !Zc(e, u), g = e.current.alternate;
          if (y && !kb(g)) {
            if (f = jm(e, u), f === tc) {
              var b = Kc(e);
              b !== $ && (u = b, f = FS(e, b));
            }
            if (f === Ap) {
              var w = jp;
              throw rc(e, $), Bo(e, u), Pa(e, In()), w;
            }
          }
          e.finishedWork = g, e.finishedLanes = u, Db(e, f, u);
        }
      }
      return Pa(e, In()), e.callbackNode === a ? K0.bind(null, e) : null;
    }
    function FS(e, t) {
      var a = Vp;
      if (tf(e)) {
        var i = rc(e, t);
        i.flags |= Er, G1(e.containerInfo);
      }
      var u = jm(e, t);
      if (u !== tc) {
        var s = Va;
        Va = a, s !== null && Z0(s);
      }
      return u;
    }
    function Z0(e) {
      Va === null ? Va = e : Va.push.apply(Va, e);
    }
    function Db(e, t, a) {
      switch (t) {
        case Pu:
        case Ap:
          throw new Error("Root did not complete. This is a bug in React.");
        case tc: {
          ac(e, Va, Bu);
          break;
        }
        case km: {
          if (Bo(e, a), bu(a) && // do not delay if we're inside an act() scope
          !pR()) {
            var i = LS + W0 - In();
            if (i > 10) {
              var u = qc(e, $);
              if (u !== $)
                break;
              var s = e.suspendedLanes;
              if (!_u(s, a)) {
                Sa(), Jc(e, s);
                break;
              }
              e.timeoutHandle = zy(ac.bind(null, e, Va, Bu), i);
              break;
            }
          }
          ac(e, Va, Bu);
          break;
        }
        case Fp: {
          if (Bo(e, a), Od(a))
            break;
          if (!pR()) {
            var f = ri(e, a), p = f, v = In() - p, y = Gb(v) - v;
            if (y > 10) {
              e.timeoutHandle = zy(ac.bind(null, e, Va, Bu), y);
              break;
            }
          }
          ac(e, Va, Bu);
          break;
        }
        case Q0: {
          ac(e, Va, Bu);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function kb(e) {
      for (var t = e; ; ) {
        if (t.flags & po) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var u = 0; u < i.length; u++) {
                var s = i[u], f = s.getSnapshot, p = s.value;
                try {
                  if (!Q(f(), p))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var v = t.child;
        if (t.subtreeFlags & po && v !== null) {
          v.return = t, t = v;
          continue;
        }
        if (t === e)
          return !0;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return !0;
    }
    function Bo(e, t) {
      t = ws(t, Lm), t = ws(t, Hp), $v(e, t);
    }
    function J0(e) {
      if (Qw(), (Et & (Pr | Ai)) !== pr)
        throw new Error("Should not already be working.");
      Yu();
      var t = qc(e, $);
      if (!Zr(t, Ae))
        return Pa(e, In()), null;
      var a = jm(e, t);
      if (e.tag !== Oo && a === tc) {
        var i = Kc(e);
        i !== $ && (t = i, a = FS(e, i));
      }
      if (a === Ap) {
        var u = jp;
        throw rc(e, $), Bo(e, t), Pa(e, In()), u;
      }
      if (a === kS)
        throw new Error("Root did not complete. This is a bug in React.");
      var s = e.current.alternate;
      return e.finishedWork = s, e.finishedLanes = t, ac(e, Va, Bu), Pa(e, In()), null;
    }
    function Ob(e, t) {
      t !== $ && (ef(e, Xe(t, Ae)), Pa(e, In()), (Et & (Pr | Ai)) === pr && (Pp(), Lo()));
    }
    function jS(e, t) {
      var a = Et;
      Et |= I0;
      try {
        return e(t);
      } finally {
        Et = a, Et === pr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !fl.isBatchingLegacy && (Pp(), XE());
      }
    }
    function Lb(e, t, a, i, u) {
      var s = Ua(), f = Vr.transition;
      try {
        return Vr.transition = null, An(Or), e(t, a, i, u);
      } finally {
        An(s), Vr.transition = f, Et === pr && Pp();
      }
    }
    function $u(e) {
      Vo !== null && Vo.tag === Oo && (Et & (Pr | Ai)) === pr && Yu();
      var t = Et;
      Et |= I0;
      var a = Vr.transition, i = Ua();
      try {
        return Vr.transition = null, An(Or), e ? e() : void 0;
      } finally {
        An(i), Vr.transition = a, Et = t, (Et & (Pr | Ai)) === pr && Lo();
      }
    }
    function eR() {
      return (Et & (Pr | Ai)) !== pr;
    }
    function Fm(e, t) {
      ra(OS, Xl, e), Xl = Xe(Xl, t);
    }
    function HS(e) {
      Xl = OS.current, na(OS, e);
    }
    function rc(e, t) {
      e.finishedWork = null, e.finishedLanes = $;
      var a = e.timeoutHandle;
      if (a !== Uy && (e.timeoutHandle = Uy, a1(a)), Dn !== null)
        for (var i = Dn.return; i !== null; ) {
          var u = i.alternate;
          k0(u, i), i = i.return;
        }
      ga = e;
      var s = ic(e.current, null);
      return Dn = s, vr = Xl = t, hr = Pu, jp = null, Om = $, Hp = $, Lm = $, Vp = null, Va = null, bw(), rl.discardPendingWarnings(), s;
    }
    function tR(e, t) {
      do {
        var a = Dn;
        try {
          if (Wh(), xC(), on(), DS.current = null, a === null || a.return === null) {
            hr = Ap, jp = t, Dn = null;
            return;
          }
          if (Ue && a.mode & Ot && Rm(a, !0), je)
            if (va(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              xi(a, i, vr);
            } else
              fs(a, t, vr);
          tx(e, a.return, a, t, vr), iR(a);
        } catch (u) {
          t = u, Dn === a && a !== null ? (a = a.return, Dn = a) : a = Dn;
          continue;
        }
        return;
      } while (!0);
    }
    function nR() {
      var e = _S.current;
      return _S.current = ym, e === null ? ym : e;
    }
    function rR(e) {
      _S.current = e;
    }
    function Mb() {
      LS = In();
    }
    function Ip(e) {
      Om = Xe(e, Om);
    }
    function Nb() {
      hr === Pu && (hr = km);
    }
    function VS() {
      (hr === Pu || hr === km || hr === tc) && (hr = Fp), ga !== null && (Rs(Om) || Rs(Hp)) && Bo(ga, vr);
    }
    function zb(e) {
      hr !== Fp && (hr = tc), Vp === null ? Vp = [e] : Vp.push(e);
    }
    function Ub() {
      return hr === Pu;
    }
    function jm(e, t) {
      var a = Et;
      Et |= Pr;
      var i = nR();
      if (ga !== e || vr !== t) {
        if (Xr) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Qp(e, vr), u.clear()), Yv(e, t);
        }
        Bu = Ad(), rc(e, t);
      }
      Su(t);
      do
        try {
          Ab();
          break;
        } catch (s) {
          tR(e, s);
        }
      while (!0);
      if (Wh(), Et = a, rR(i), Dn !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Lc(), ga = null, vr = $, hr;
    }
    function Ab() {
      for (; Dn !== null; )
        aR(Dn);
    }
    function Fb(e, t) {
      var a = Et;
      Et |= Pr;
      var i = nR();
      if (ga !== e || vr !== t) {
        if (Xr) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Qp(e, vr), u.clear()), Yv(e, t);
        }
        Bu = Ad(), Pp(), rc(e, t);
      }
      Su(t);
      do
        try {
          jb();
          break;
        } catch (s) {
          tR(e, s);
        }
      while (!0);
      return Wh(), rR(i), Et = a, Dn !== null ? (Uv(), Pu) : (Lc(), ga = null, vr = $, hr);
    }
    function jb() {
      for (; Dn !== null && !hd(); )
        aR(Dn);
    }
    function aR(e) {
      var t = e.alternate;
      Yt(e);
      var a;
      (e.mode & Ot) !== De ? ($g(e), a = PS(t, e, Xl), Rm(e, !0)) : a = PS(t, e, Xl), on(), e.memoizedProps = e.pendingProps, a === null ? iR(e) : Dn = a, DS.current = null;
    }
    function iR(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & os) === _e) {
          Yt(t);
          var u = void 0;
          if ((t.mode & Ot) === De ? u = D0(a, t, Xl) : ($g(t), u = D0(a, t, Xl), Rm(t, !1)), on(), u !== null) {
            Dn = u;
            return;
          }
        } else {
          var s = Nx(a, t);
          if (s !== null) {
            s.flags &= kv, Dn = s;
            return;
          }
          if ((t.mode & Ot) !== De) {
            Rm(t, !1);
            for (var f = t.actualDuration, p = t.child; p !== null; )
              f += p.actualDuration, p = p.sibling;
            t.actualDuration = f;
          }
          if (i !== null)
            i.flags |= os, i.subtreeFlags = _e, i.deletions = null;
          else {
            hr = kS, Dn = null;
            return;
          }
        }
        var v = t.sibling;
        if (v !== null) {
          Dn = v;
          return;
        }
        t = i, Dn = t;
      } while (t !== null);
      hr === Pu && (hr = Q0);
    }
    function ac(e, t, a) {
      var i = Ua(), u = Vr.transition;
      try {
        Vr.transition = null, An(Or), Hb(e, t, a, i);
      } finally {
        Vr.transition = u, An(i);
      }
      return null;
    }
    function Hb(e, t, a, i) {
      do
        Yu();
      while (Vo !== null);
      if (Xb(), (Et & (Pr | Ai)) !== pr)
        throw new Error("Should not already be working.");
      var u = e.finishedWork, s = e.finishedLanes;
      if (Cd(s), u === null)
        return Rd(), null;
      if (s === $ && S("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = $, u === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = _t;
      var f = Xe(u.lanes, u.childLanes);
      zd(e, f), e === ga && (ga = null, Dn = null, vr = $), ((u.subtreeFlags & Wi) !== _e || (u.flags & Wi) !== _e) && (nc || (nc = !0, zS = a, YS(Gi, function() {
        return Yu(), null;
      })));
      var p = (u.subtreeFlags & (_l | Dl | kl | Wi)) !== _e, v = (u.flags & (_l | Dl | kl | Wi)) !== _e;
      if (p || v) {
        var y = Vr.transition;
        Vr.transition = null;
        var g = Ua();
        An(Or);
        var b = Et;
        Et |= Ai, DS.current = null, jx(e, u), XC(), Zx(e, u, s), KT(e.containerInfo), e.current = u, ds(s), Jx(u, e, s), ps(), md(), Et = b, An(g), Vr.transition = y;
      } else
        e.current = u, XC();
      var w = nc;
      if (nc ? (nc = !1, Vo = e, Bp = s) : (Bf = 0, zm = null), f = e.pendingLanes, f === $ && (Pf = null), w || sR(e.current, !1), gd(u.stateNode, i), Xr && e.memoizedUpdaters.clear(), gb(), Pa(e, In()), t !== null)
        for (var M = e.onRecoverableError, U = 0; U < t.length; U++) {
          var j = t[U], le = j.stack, Le = j.digest;
          M(j.value, {
            componentStack: le,
            digest: Le
          });
        }
      if (Mm) {
        Mm = !1;
        var we = MS;
        throw MS = null, we;
      }
      return Zr(Bp, Ae) && e.tag !== Oo && Yu(), f = e.pendingLanes, Zr(f, Ae) ? (Yw(), e === US ? $p++ : ($p = 0, US = e)) : $p = 0, Lo(), Rd(), null;
    }
    function Yu() {
      if (Vo !== null) {
        var e = Wv(Bp), t = Ds(Na, e), a = Vr.transition, i = Ua();
        try {
          return Vr.transition = null, An(t), Pb();
        } finally {
          An(i), Vr.transition = a;
        }
      }
      return !1;
    }
    function Vb(e) {
      NS.push(e), nc || (nc = !0, YS(Gi, function() {
        return Yu(), null;
      }));
    }
    function Pb() {
      if (Vo === null)
        return !1;
      var e = zS;
      zS = null;
      var t = Vo, a = Bp;
      if (Vo = null, Bp = $, (Et & (Pr | Ai)) !== pr)
        throw new Error("Cannot flush passive effects while already rendering.");
      AS = !0, Nm = !1, gu(a);
      var i = Et;
      Et |= Ai, lb(t.current), nb(t, t.current, a, e);
      {
        var u = NS;
        NS = [];
        for (var s = 0; s < u.length; s++) {
          var f = u[s];
          Bx(t, f);
        }
      }
      xd(), sR(t.current, !0), Et = i, Lo(), Nm ? t === zm ? Bf++ : (Bf = 0, zm = t) : Bf = 0, AS = !1, Nm = !1, Sd(t);
      {
        var p = t.current.stateNode;
        p.effectDuration = 0, p.passiveEffectDuration = 0;
      }
      return !0;
    }
    function lR(e) {
      return Pf !== null && Pf.has(e);
    }
    function Bb(e) {
      Pf === null ? Pf = /* @__PURE__ */ new Set([e]) : Pf.add(e);
    }
    function $b(e) {
      Mm || (Mm = !0, MS = e);
    }
    var Yb = $b;
    function uR(e, t, a) {
      var i = Js(a, t), u = a0(e, i, Ae), s = No(e, u, Ae), f = Sa();
      s !== null && (go(s, Ae, f), Pa(s, f));
    }
    function sn(e, t, a) {
      if (Ux(a), Wp(!1), e.tag === ee) {
        uR(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === ee) {
          uR(i, e, a);
          return;
        } else if (i.tag === ve) {
          var u = i.type, s = i.stateNode;
          if (typeof u.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && !lR(s)) {
            var f = Js(a, e), p = uS(i, f, Ae), v = No(i, p, Ae), y = Sa();
            v !== null && (go(v, Ae, y), Pa(v, y));
            return;
          }
        }
        i = i.return;
      }
      S(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function Ib(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var u = Sa();
      Jc(e, a), e_(e), ga === e && _u(vr, a) && (hr === Fp || hr === km && bu(vr) && In() - LS < W0 ? rc(e, $) : Lm = Xe(Lm, a)), Pa(e, u);
    }
    function oR(e, t) {
      t === _t && (t = xb(e));
      var a = Sa(), i = ja(e, t);
      i !== null && (go(i, t, a), Pa(i, a));
    }
    function Qb(e) {
      var t = e.memoizedState, a = _t;
      t !== null && (a = t.retryLane), oR(e, a);
    }
    function Wb(e, t) {
      var a = _t, i;
      switch (e.tag) {
        case be:
          i = e.stateNode;
          var u = e.memoizedState;
          u !== null && (a = u.retryLane);
          break;
        case an:
          i = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      i !== null && i.delete(t), oR(e, a);
    }
    function Gb(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : Cb(e / 1960) * 1960;
    }
    function qb() {
      if ($p > Tb)
        throw $p = 0, US = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Bf > wb && (Bf = 0, zm = null, S("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function Xb() {
      rl.flushLegacyContextWarning(), rl.flushPendingUnsafeLifecycleWarnings();
    }
    function sR(e, t) {
      Yt(e), Hm(e, bl, hb), t && Hm(e, Ri, mb), Hm(e, bl, pb), t && Hm(e, Ri, vb), on();
    }
    function Hm(e, t, a) {
      for (var i = e, u = null; i !== null; ) {
        var s = i.subtreeFlags & t;
        i !== u && i.child !== null && s !== _e ? i = i.child : ((i.flags & t) !== _e && a(i), i.sibling !== null ? i = i.sibling : i = u = i.return);
      }
    }
    var Vm = null;
    function cR(e) {
      {
        if ((Et & Pr) !== pr || !(e.mode & ut))
          return;
        var t = e.tag;
        if (t !== ot && t !== ee && t !== ve && t !== de && t !== Qe && t !== st && t !== Fe)
          return;
        var a = Pe(e) || "ReactComponent";
        if (Vm !== null) {
          if (Vm.has(a))
            return;
          Vm.add(a);
        } else
          Vm = /* @__PURE__ */ new Set([a]);
        var i = ar;
        try {
          Yt(e), S("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? Yt(e) : on();
        }
      }
    }
    var PS;
    {
      var Kb = null;
      PS = function(e, t, a) {
        var i = gR(Kb, t);
        try {
          return T0(e, t, a);
        } catch (s) {
          if (sw() || s !== null && typeof s == "object" && typeof s.then == "function")
            throw s;
          if (Wh(), xC(), k0(e, t), gR(t, i), t.mode & Ot && $g(t), xl(null, T0, null, e, t, a), Ii()) {
            var u = us();
            typeof u == "object" && u !== null && u._suppressLogging && typeof s == "object" && s !== null && !s._suppressLogging && (s._suppressLogging = !0);
          }
          throw s;
        }
      };
    }
    var fR = !1, BS;
    BS = /* @__PURE__ */ new Set();
    function Zb(e) {
      if (hi && !Pw())
        switch (e.tag) {
          case de:
          case Qe:
          case Fe: {
            var t = Dn && Pe(Dn) || "Unknown", a = t;
            if (!BS.has(a)) {
              BS.add(a);
              var i = Pe(e) || "Unknown";
              S("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case ve: {
            fR || (S("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), fR = !0);
            break;
          }
        }
    }
    function Qp(e, t) {
      if (Xr) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          bs(e, i, t);
        });
      }
    }
    var $S = {};
    function YS(e, t) {
      {
        var a = fl.current;
        return a !== null ? (a.push(t), $S) : vd(e, t);
      }
    }
    function dR(e) {
      if (e !== $S)
        return Lv(e);
    }
    function pR() {
      return fl.current !== null;
    }
    function Jb(e) {
      {
        if (e.mode & ut) {
          if (!Y0())
            return;
        } else if (!Eb() || Et !== pr || e.tag !== de && e.tag !== Qe && e.tag !== Fe)
          return;
        if (fl.current === null) {
          var t = ar;
          try {
            Yt(e), S(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Pe(e));
          } finally {
            t ? Yt(e) : on();
          }
        }
      }
    }
    function e_(e) {
      e.tag !== Oo && Y0() && fl.current === null && S(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function Wp(e) {
      X0 = e;
    }
    var Fi = null, $f = null, t_ = function(e) {
      Fi = e;
    };
    function Yf(e) {
      {
        if (Fi === null)
          return e;
        var t = Fi(e);
        return t === void 0 ? e : t.current;
      }
    }
    function IS(e) {
      return Yf(e);
    }
    function QS(e) {
      {
        if (Fi === null)
          return e;
        var t = Fi(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = Yf(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: B,
                render: a
              };
              return e.displayName !== void 0 && (i.displayName = e.displayName), i;
            }
          }
          return e;
        }
        return t.current;
      }
    }
    function vR(e, t) {
      {
        if (Fi === null)
          return !1;
        var a = e.elementType, i = t.type, u = !1, s = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case ve: {
            typeof i == "function" && (u = !0);
            break;
          }
          case de: {
            (typeof i == "function" || s === Be) && (u = !0);
            break;
          }
          case Qe: {
            (s === B || s === Be) && (u = !0);
            break;
          }
          case st:
          case Fe: {
            (s === Ge || s === Be) && (u = !0);
            break;
          }
          default:
            return !1;
        }
        if (u) {
          var f = Fi(a);
          if (f !== void 0 && f === Fi(i))
            return !0;
        }
        return !1;
      }
    }
    function hR(e) {
      {
        if (Fi === null || typeof WeakSet != "function")
          return;
        $f === null && ($f = /* @__PURE__ */ new WeakSet()), $f.add(e);
      }
    }
    var n_ = function(e, t) {
      {
        if (Fi === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        Yu(), $u(function() {
          WS(e.current, i, a);
        });
      }
    }, r_ = function(e, t) {
      {
        if (e.context !== li)
          return;
        Yu(), $u(function() {
          Gp(t, e, null, null);
        });
      }
    };
    function WS(e, t, a) {
      {
        var i = e.alternate, u = e.child, s = e.sibling, f = e.tag, p = e.type, v = null;
        switch (f) {
          case de:
          case Fe:
          case ve:
            v = p;
            break;
          case Qe:
            v = p.render;
            break;
        }
        if (Fi === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var y = !1, g = !1;
        if (v !== null) {
          var b = Fi(v);
          b !== void 0 && (a.has(b) ? g = !0 : t.has(b) && (f === ve ? g = !0 : y = !0));
        }
        if ($f !== null && ($f.has(e) || i !== null && $f.has(i)) && (g = !0), g && (e._debugNeedsRemount = !0), g || y) {
          var w = ja(e, Ae);
          w !== null && mr(w, e, Ae, Xt);
        }
        u !== null && !g && WS(u, t, a), s !== null && WS(s, t, a);
      }
    }
    var a_ = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(u) {
          return u.current;
        }));
        return GS(e.current, i, a), a;
      }
    };
    function GS(e, t, a) {
      {
        var i = e.child, u = e.sibling, s = e.tag, f = e.type, p = null;
        switch (s) {
          case de:
          case Fe:
          case ve:
            p = f;
            break;
          case Qe:
            p = f.render;
            break;
        }
        var v = !1;
        p !== null && t.has(p) && (v = !0), v ? i_(e, a) : i !== null && GS(i, t, a), u !== null && GS(u, t, a);
      }
    }
    function i_(e, t) {
      {
        var a = l_(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case ue:
              t.add(i.stateNode);
              return;
            case Ce:
              t.add(i.stateNode.containerInfo);
              return;
            case ee:
              t.add(i.stateNode.containerInfo);
              return;
          }
          if (i.return === null)
            throw new Error("Expected to reach root first.");
          i = i.return;
        }
      }
    }
    function l_(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === ue)
          i = !0, t.add(a.stateNode);
        else if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
        if (a === e)
          return i;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e)
            return i;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
      return !1;
    }
    var qS;
    {
      qS = !1;
      try {
        var mR = Object.preventExtensions({});
      } catch {
        qS = !0;
      }
    }
    function u_(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = _e, this.subtreeFlags = _e, this.deletions = null, this.lanes = $, this.childLanes = $, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !qS && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var ui = function(e, t, a, i) {
      return new u_(e, t, a, i);
    };
    function XS(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function o_(e) {
      return typeof e == "function" && !XS(e) && e.defaultProps === void 0;
    }
    function s_(e) {
      if (typeof e == "function")
        return XS(e) ? ve : de;
      if (e != null) {
        var t = e.$$typeof;
        if (t === B)
          return Qe;
        if (t === Ge)
          return st;
      }
      return ot;
    }
    function ic(e, t) {
      var a = e.alternate;
      a === null ? (a = ui(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = _e, a.subtreeFlags = _e, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & Nn, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case ot:
        case de:
        case Fe:
          a.type = Yf(e.type);
          break;
        case ve:
          a.type = IS(e.type);
          break;
        case Qe:
          a.type = QS(e.type);
          break;
      }
      return a;
    }
    function c_(e, t) {
      e.flags &= Nn | hn;
      var a = e.alternate;
      if (a === null)
        e.childLanes = $, e.lanes = t, e.child = null, e.subtreeFlags = _e, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = _e, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var i = a.dependencies;
        e.dependencies = i === null ? null : {
          lanes: i.lanes,
          firstContext: i.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function f_(e, t, a) {
      var i;
      return e === Fh ? (i = ut, t === !0 && (i |= Wt, i |= Lt)) : i = De, Xr && (i |= Ot), ui(ee, null, null, i);
    }
    function KS(e, t, a, i, u, s) {
      var f = ot, p = e;
      if (typeof e == "function")
        XS(e) ? (f = ve, p = IS(p)) : p = Yf(p);
      else if (typeof e == "string")
        f = ue;
      else
        e: switch (e) {
          case fi:
            return $o(a.children, u, s, t);
          case Qa:
            f = pt, u |= Wt, (u & ut) !== De && (u |= Lt);
            break;
          case di:
            return d_(a, u, s, t);
          case ae:
            return p_(a, u, s, t);
          case he:
            return v_(a, u, s, t);
          case Rn:
            return yR(a, u, s, t);
          case en:
          case ct:
          case un:
          case rr:
          case lt:
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case pi:
                  f = dt;
                  break e;
                case R:
                  f = cn;
                  break e;
                case B:
                  f = Qe, p = QS(p);
                  break e;
                case Ge:
                  f = st;
                  break e;
                case Be:
                  f = rn, p = null;
                  break e;
              }
            var v = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var y = i ? Pe(i) : null;
              y && (v += `

Check the render method of \`` + y + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + v));
          }
        }
      var g = ui(f, a, t, u);
      return g.elementType = e, g.type = p, g.lanes = s, g._debugOwner = i, g;
    }
    function ZS(e, t, a) {
      var i = null;
      i = e._owner;
      var u = e.type, s = e.key, f = e.props, p = KS(u, s, f, i, t, a);
      return p._debugSource = e._source, p._debugOwner = e._owner, p;
    }
    function $o(e, t, a, i) {
      var u = ui(yt, e, i, t);
      return u.lanes = a, u;
    }
    function d_(e, t, a, i) {
      typeof e.id != "string" && S('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var u = ui(vt, e, i, t | Ot);
      return u.elementType = di, u.lanes = a, u.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, u;
    }
    function p_(e, t, a, i) {
      var u = ui(be, e, i, t);
      return u.elementType = ae, u.lanes = a, u;
    }
    function v_(e, t, a, i) {
      var u = ui(an, e, i, t);
      return u.elementType = he, u.lanes = a, u;
    }
    function yR(e, t, a, i) {
      var u = ui(ke, e, i, t);
      u.elementType = Rn, u.lanes = a;
      var s = {
        isHidden: !1
      };
      return u.stateNode = s, u;
    }
    function JS(e, t, a) {
      var i = ui(Ie, e, null, t);
      return i.lanes = a, i;
    }
    function h_() {
      var e = ui(ue, null, null, De);
      return e.elementType = "DELETED", e;
    }
    function m_(e) {
      var t = ui(Kt, null, null, De);
      return t.stateNode = e, t;
    }
    function eE(e, t, a) {
      var i = e.children !== null ? e.children : [], u = ui(Ce, i, e.key, t);
      return u.lanes = a, u.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, u;
    }
    function gR(e, t) {
      return e === null && (e = ui(ot, null, null, De)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function y_(e, t, a, i, u) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = Uy, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = _t, this.eventTimes = xs($), this.expirationTimes = xs(Xt), this.pendingLanes = $, this.suspendedLanes = $, this.pingedLanes = $, this.expiredLanes = $, this.mutableReadLanes = $, this.finishedLanes = $, this.entangledLanes = $, this.entanglements = xs($), this.identifierPrefix = i, this.onRecoverableError = u, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var s = this.pendingUpdatersLaneMap = [], f = 0; f < Eu; f++)
          s.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case Fh:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case Oo:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function SR(e, t, a, i, u, s, f, p, v, y) {
      var g = new y_(e, t, a, p, v), b = f_(t, s);
      g.current = b, b.stateNode = g;
      {
        var w = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        b.memoizedState = w;
      }
      return pg(b), g;
    }
    var tE = "18.3.1";
    function g_(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return $r(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: nr,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var nE, rE;
    nE = !1, rE = {};
    function ER(e) {
      if (!e)
        return li;
      var t = fo(e), a = ew(t);
      if (t.tag === ve) {
        var i = t.type;
        if ($l(i))
          return WE(t, i, a);
      }
      return a;
    }
    function S_(e, t) {
      {
        var a = fo(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var u = Gr(a);
        if (u === null)
          return null;
        if (u.mode & Wt) {
          var s = Pe(a) || "Component";
          if (!rE[s]) {
            rE[s] = !0;
            var f = ar;
            try {
              Yt(u), a.mode & Wt ? S("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s) : S("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s);
            } finally {
              f ? Yt(f) : on();
            }
          }
        }
        return u.stateNode;
      }
    }
    function CR(e, t, a, i, u, s, f, p) {
      var v = !1, y = null;
      return SR(e, t, v, y, a, i, u, s, f);
    }
    function RR(e, t, a, i, u, s, f, p, v, y) {
      var g = !0, b = SR(a, i, g, e, u, s, f, p, v);
      b.context = ER(null);
      var w = b.current, M = Sa(), U = Po(w), j = Hu(M, U);
      return j.callback = t ?? null, No(w, j, U), bb(b, U, M), b;
    }
    function Gp(e, t, a, i) {
      yd(t, e);
      var u = t.current, s = Sa(), f = Po(u);
      yn(f);
      var p = ER(a);
      t.context === null ? t.context = p : t.pendingContext = p, hi && ar !== null && !nE && (nE = !0, S(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Pe(ar) || "Unknown"));
      var v = Hu(s, f);
      v.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && S("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), v.callback = i);
      var y = No(u, v, f);
      return y !== null && (mr(y, u, f, s), Zh(y, u, f)), f;
    }
    function Pm(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case ue:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function E_(e) {
      switch (e.tag) {
        case ee: {
          var t = e.stateNode;
          if (tf(t)) {
            var a = Fv(t);
            Ob(t, a);
          }
          break;
        }
        case be: {
          $u(function() {
            var u = ja(e, Ae);
            if (u !== null) {
              var s = Sa();
              mr(u, e, Ae, s);
            }
          });
          var i = Ae;
          aE(e, i);
          break;
        }
      }
    }
    function TR(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = Bv(a.retryLane, t));
    }
    function aE(e, t) {
      TR(e, t);
      var a = e.alternate;
      a && TR(a, t);
    }
    function C_(e) {
      if (e.tag === be) {
        var t = Ss, a = ja(e, t);
        if (a !== null) {
          var i = Sa();
          mr(a, e, t, i);
        }
        aE(e, t);
      }
    }
    function R_(e) {
      if (e.tag === be) {
        var t = Po(e), a = ja(e, t);
        if (a !== null) {
          var i = Sa();
          mr(a, e, t, i);
        }
        aE(e, t);
      }
    }
    function wR(e) {
      var t = fn(e);
      return t === null ? null : t.stateNode;
    }
    var xR = function(e) {
      return null;
    };
    function T_(e) {
      return xR(e);
    }
    var bR = function(e) {
      return !1;
    };
    function w_(e) {
      return bR(e);
    }
    var _R = null, DR = null, kR = null, OR = null, LR = null, MR = null, NR = null, zR = null, UR = null;
    {
      var AR = function(e, t, a) {
        var i = t[a], u = rt(e) ? e.slice() : Je({}, e);
        return a + 1 === t.length ? (rt(u) ? u.splice(i, 1) : delete u[i], u) : (u[i] = AR(e[i], t, a + 1), u);
      }, FR = function(e, t) {
        return AR(e, t, 0);
      }, jR = function(e, t, a, i) {
        var u = t[i], s = rt(e) ? e.slice() : Je({}, e);
        if (i + 1 === t.length) {
          var f = a[i];
          s[f] = s[u], rt(s) ? s.splice(u, 1) : delete s[u];
        } else
          s[u] = jR(
            // $FlowFixMe number or string is fine here
            e[u],
            t,
            a,
            i + 1
          );
        return s;
      }, HR = function(e, t, a) {
        if (t.length !== a.length) {
          Ye("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              Ye("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return jR(e, t, a, 0);
      }, VR = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var u = t[a], s = rt(e) ? e.slice() : Je({}, e);
        return s[u] = VR(e[u], t, a + 1, i), s;
      }, PR = function(e, t, a) {
        return VR(e, t, 0, a);
      }, iE = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      _R = function(e, t, a, i) {
        var u = iE(e, t);
        if (u !== null) {
          var s = PR(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = Je({}, e.memoizedProps);
          var f = ja(e, Ae);
          f !== null && mr(f, e, Ae, Xt);
        }
      }, DR = function(e, t, a) {
        var i = iE(e, t);
        if (i !== null) {
          var u = FR(i.memoizedState, a);
          i.memoizedState = u, i.baseState = u, e.memoizedProps = Je({}, e.memoizedProps);
          var s = ja(e, Ae);
          s !== null && mr(s, e, Ae, Xt);
        }
      }, kR = function(e, t, a, i) {
        var u = iE(e, t);
        if (u !== null) {
          var s = HR(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = Je({}, e.memoizedProps);
          var f = ja(e, Ae);
          f !== null && mr(f, e, Ae, Xt);
        }
      }, OR = function(e, t, a) {
        e.pendingProps = PR(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = ja(e, Ae);
        i !== null && mr(i, e, Ae, Xt);
      }, LR = function(e, t) {
        e.pendingProps = FR(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = ja(e, Ae);
        a !== null && mr(a, e, Ae, Xt);
      }, MR = function(e, t, a) {
        e.pendingProps = HR(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = ja(e, Ae);
        i !== null && mr(i, e, Ae, Xt);
      }, NR = function(e) {
        var t = ja(e, Ae);
        t !== null && mr(t, e, Ae, Xt);
      }, zR = function(e) {
        xR = e;
      }, UR = function(e) {
        bR = e;
      };
    }
    function x_(e) {
      var t = Gr(e);
      return t === null ? null : t.stateNode;
    }
    function b_(e) {
      return null;
    }
    function __() {
      return ar;
    }
    function D_(e) {
      var t = e.findFiberByHostInstance, a = A.ReactCurrentDispatcher;
      return ho({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: _R,
        overrideHookStateDeletePath: DR,
        overrideHookStateRenamePath: kR,
        overrideProps: OR,
        overridePropsDeletePath: LR,
        overridePropsRenamePath: MR,
        setErrorHandler: zR,
        setSuspenseHandler: UR,
        scheduleUpdate: NR,
        currentDispatcherRef: a,
        findHostInstanceByFiber: x_,
        findFiberByHostInstance: t || b_,
        // React Refresh
        findHostInstancesForRefresh: a_,
        scheduleRefresh: n_,
        scheduleRoot: r_,
        setRefreshHandler: t_,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: __,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: tE
      });
    }
    var BR = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function lE(e) {
      this._internalRoot = e;
    }
    Bm.prototype.render = lE.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? S("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : $m(arguments[1]) ? S("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && S("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== Ln) {
          var i = wR(t.current);
          i && i.parentNode !== a && S("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      Gp(e, t, null, null);
    }, Bm.prototype.unmount = lE.prototype.unmount = function() {
      typeof arguments[0] == "function" && S("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        eR() && S("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), $u(function() {
          Gp(null, e, null, null);
        }), BE(t);
      }
    };
    function k_(e, t) {
      if (!$m(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      $R(e);
      var a = !1, i = !1, u = "", s = BR;
      t != null && (t.hydrate ? Ye("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === br && S(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var f = CR(e, Fh, null, a, i, u, s);
      Oh(f.current, e);
      var p = e.nodeType === Ln ? e.parentNode : e;
      return ep(p), new lE(f);
    }
    function Bm(e) {
      this._internalRoot = e;
    }
    function O_(e) {
      e && Zv(e);
    }
    Bm.prototype.unstable_scheduleHydration = O_;
    function L_(e, t, a) {
      if (!$m(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      $R(e), t === void 0 && S("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, u = a != null && a.hydratedSources || null, s = !1, f = !1, p = "", v = BR;
      a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (p = a.identifierPrefix), a.onRecoverableError !== void 0 && (v = a.onRecoverableError));
      var y = RR(t, null, e, Fh, i, s, f, p, v);
      if (Oh(y.current, e), ep(e), u)
        for (var g = 0; g < u.length; g++) {
          var b = u[g];
          Uw(y, b);
        }
      return new Bm(y);
    }
    function $m(e) {
      return !!(e && (e.nodeType === Ir || e.nodeType === Yi || e.nodeType === nd));
    }
    function qp(e) {
      return !!(e && (e.nodeType === Ir || e.nodeType === Yi || e.nodeType === nd || e.nodeType === Ln && e.nodeValue === " react-mount-point-unstable "));
    }
    function $R(e) {
      e.nodeType === Ir && e.tagName && e.tagName.toUpperCase() === "BODY" && S("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), fp(e) && (e._reactRootContainer ? S("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : S("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var M_ = A.ReactCurrentOwner, YR;
    YR = function(e) {
      if (e._reactRootContainer && e.nodeType !== Ln) {
        var t = wR(e._reactRootContainer.current);
        t && t.parentNode !== e && S("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = uE(e), u = !!(i && Do(i));
      u && !a && S("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Ir && e.tagName && e.tagName.toUpperCase() === "BODY" && S("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function uE(e) {
      return e ? e.nodeType === Yi ? e.documentElement : e.firstChild : null;
    }
    function IR() {
    }
    function N_(e, t, a, i, u) {
      if (u) {
        if (typeof i == "function") {
          var s = i;
          i = function() {
            var w = Pm(f);
            s.call(w);
          };
        }
        var f = RR(
          t,
          i,
          e,
          Oo,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          IR
        );
        e._reactRootContainer = f, Oh(f.current, e);
        var p = e.nodeType === Ln ? e.parentNode : e;
        return ep(p), $u(), f;
      } else {
        for (var v; v = e.lastChild; )
          e.removeChild(v);
        if (typeof i == "function") {
          var y = i;
          i = function() {
            var w = Pm(g);
            y.call(w);
          };
        }
        var g = CR(
          e,
          Oo,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          IR
        );
        e._reactRootContainer = g, Oh(g.current, e);
        var b = e.nodeType === Ln ? e.parentNode : e;
        return ep(b), $u(function() {
          Gp(t, g, a, i);
        }), g;
      }
    }
    function z_(e, t) {
      e !== null && typeof e != "function" && S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function Ym(e, t, a, i, u) {
      YR(a), z_(u === void 0 ? null : u, "render");
      var s = a._reactRootContainer, f;
      if (!s)
        f = N_(a, t, e, u, i);
      else {
        if (f = s, typeof u == "function") {
          var p = u;
          u = function() {
            var v = Pm(f);
            p.call(v);
          };
        }
        Gp(t, f, e, u);
      }
      return Pm(f);
    }
    var QR = !1;
    function U_(e) {
      {
        QR || (QR = !0, S("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = M_.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || S("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Tt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === Ir ? e : S_(e, "findDOMNode");
    }
    function A_(e, t, a) {
      if (S("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !qp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = fp(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return Ym(null, e, t, !0, a);
    }
    function F_(e, t, a) {
      if (S("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !qp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = fp(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return Ym(null, e, t, !1, a);
    }
    function j_(e, t, a, i) {
      if (S("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !qp(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !ay(e))
        throw new Error("parentComponent must be a valid React Component");
      return Ym(e, t, a, !1, i);
    }
    var WR = !1;
    function H_(e) {
      if (WR || (WR = !0, S("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !qp(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = fp(e) && e._reactRootContainer === void 0;
        t && S("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = uE(e), i = a && !Do(a);
          i && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return $u(function() {
          Ym(null, null, e, !1, function() {
            e._reactRootContainer = null, BE(e);
          });
        }), !0;
      } else {
        {
          var u = uE(e), s = !!(u && Do(u)), f = e.nodeType === Ir && qp(e.parentNode) && !!e.parentNode._reactRootContainer;
          s && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", f ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    Rr(E_), So(C_), Gv(R_), Os(Ua), Fd(Iv), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && S("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), gc(PT), ry(jS, Lb, $u);
    function V_(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!$m(t))
        throw new Error("Target container is not a DOM element.");
      return g_(e, t, null, a);
    }
    function P_(e, t, a, i) {
      return j_(e, t, a, i);
    }
    var oE = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [Do, Cf, Lh, uo, Sc, jS]
    };
    function B_(e, t) {
      return oE.usingClientEntryPoint || S('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), k_(e, t);
    }
    function $_(e, t, a) {
      return oE.usingClientEntryPoint || S('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), L_(e, t, a);
    }
    function Y_(e) {
      return eR() && S("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), $u(e);
    }
    var I_ = D_({
      findFiberByHostInstance: Ys,
      bundleType: 1,
      version: tE,
      rendererPackageName: "react-dom"
    });
    if (!I_ && kn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var GR = window.location.protocol;
      /^(https?|file):$/.test(GR) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (GR === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    $a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = oE, $a.createPortal = V_, $a.createRoot = B_, $a.findDOMNode = U_, $a.flushSync = Y_, $a.hydrate = A_, $a.hydrateRoot = $_, $a.render = F_, $a.unmountComponentAtNode = H_, $a.unstable_batchedUpdates = jS, $a.unstable_renderSubtreeIntoContainer = P_, $a.version = tE, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), $a;
}
function lT() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(lT);
    } catch (K) {
      console.error(K);
    }
  }
}
process.env.NODE_ENV === "production" ? (lT(), pE.exports = eD()) : pE.exports = tD();
var nD = pE.exports, vE, Qm = nD;
if (process.env.NODE_ENV === "production")
  vE = Qm.createRoot, Qm.hydrateRoot;
else {
  var aT = Qm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  vE = function(K, q) {
    aT.usingClientEntryPoint = !0;
    try {
      return Qm.createRoot(K, q);
    } finally {
      aT.usingClientEntryPoint = !1;
    }
  };
}
let uT = Ra.createContext(
  /** @type {any} */
  null
);
function rD() {
  let K = Ra.useContext(uT);
  if (!K) throw new Error("RenderContext not found");
  return K;
}
function aD() {
  return rD().model;
}
function iD(K) {
  let q = aD(), [A, Rt] = Ra.useState(q.get(K));
  return Ra.useEffect(() => {
    let Ke = () => Rt(q.get(K));
    return q.on(`change:${K}`, Ke), () => q.off(`change:${K}`, Ke);
  }, [q, K]), [
    A,
    (Ke) => {
      q.set(K, Ke), q.save_changes();
    }
  ];
}
function lD(K) {
  return ({ el: q, model: A, experimental: Rt }) => {
    let Ke = vE(q);
    return Ke.render(
      Ra.createElement(
        Ra.StrictMode,
        null,
        Ra.createElement(
          uT.Provider,
          { value: { model: A, experimental: Rt } },
          Ra.createElement(K)
        )
      )
    ), () => Ke.unmount();
  };
}
function uD() {
  const [K, q] = Ra.useState([]), [A, Rt] = Ra.useState("");
  iD("message"), Ra.useEffect(() => {
    typeof model < "u" && model.on("msg:custom", (Ye) => {
      Ye.type === "assistant_message" && q((S) => [...S, { role: "assistant", content: Ye.text }]);
    });
  }, []);
  const Ke = (Ye) => {
    Ye.preventDefault(), A.trim() && (q((S) => [...S, { role: "user", content: A }]), typeof model < "u" && model.send({ type: "user_message", text: A }), Rt(""));
  };
  return /* @__PURE__ */ Yo.jsxs("div", { style: {
    width: "100%",
    height: "400px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    fontFamily: "system-ui, sans-serif"
  }, children: [
    /* @__PURE__ */ Yo.jsx("div", { style: {
      flex: 1,
      padding: "16px",
      overflowY: "auto",
      backgroundColor: "#f9f9f9"
    }, children: K.length === 0 ? /* @__PURE__ */ Yo.jsx("div", { style: { color: "#666", fontStyle: "italic" }, children: "Start a conversation..." }) : K.map((Ye, S) => /* @__PURE__ */ Yo.jsxs("div", { style: {
      marginBottom: "12px",
      padding: "8px 12px",
      backgroundColor: Ye.role === "user" ? "#007bff" : "#fff",
      color: Ye.role === "user" ? "white" : "black",
      borderRadius: "8px",
      alignSelf: Ye.role === "user" ? "flex-end" : "flex-start",
      maxWidth: "80%"
    }, children: [
      /* @__PURE__ */ Yo.jsxs("strong", { children: [
        Ye.role === "user" ? "You" : "Assistant",
        ":"
      ] }),
      " ",
      Ye.content
    ] }, S)) }),
    /* @__PURE__ */ Yo.jsxs("form", { onSubmit: Ke, style: {
      padding: "16px",
      borderTop: "1px solid #eee",
      display: "flex",
      gap: "8px"
    }, children: [
      /* @__PURE__ */ Yo.jsx(
        "input",
        {
          type: "text",
          value: A,
          onChange: (Ye) => Rt(Ye.target.value),
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
      /* @__PURE__ */ Yo.jsx(
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
const fD = { render: lD(uD) };
export {
  fD as default
};
