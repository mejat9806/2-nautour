!(function () {
  let t, e, r;
  var n,
    o,
    i,
    s,
    a =
      'undefined' != typeof globalThis
        ? globalThis
        : 'undefined' != typeof self
          ? self
          : 'undefined' != typeof window
            ? window
            : 'undefined' != typeof global
              ? global
              : {};
  function u(t, e, r, n) {
    Object.defineProperty(t, e, {
      get: r,
      set: n,
      enumerable: !0,
      configurable: !0,
    });
  }
  var l = (function (t) {
    var e,
      r = Object.prototype,
      n = r.hasOwnProperty,
      o =
        Object.defineProperty ||
        function (t, e, r) {
          t[e] = r.value;
        },
      i = 'function' == typeof Symbol ? Symbol : {},
      s = i.iterator || '@@iterator',
      a = i.asyncIterator || '@@asyncIterator',
      u = i.toStringTag || '@@toStringTag';
    function l(t, e, r) {
      return (
        Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        }),
        t[e]
      );
    }
    try {
      l({}, '');
    } catch (t) {
      l = function (t, e, r) {
        return (t[e] = r);
      };
    }
    function f(t, r, n, i) {
      var s,
        a,
        u = Object.create((r && r.prototype instanceof g ? r : g).prototype);
      return (
        o(u, '_invoke', {
          value:
            ((s = new T(i || [])),
            (a = h),
            function (r, o) {
              if (a === p) throw Error('Generator is already running');
              if (a === d) {
                if ('throw' === r) throw o;
                return { value: e, done: !0 };
              }
              for (s.method = r, s.arg = o; ; ) {
                var i = s.delegate;
                if (i) {
                  var u = (function t(r, n) {
                    var o = n.method,
                      i = r.iterator[o];
                    if (i === e)
                      return (
                        (n.delegate = null),
                        ('throw' === o &&
                          r.iterator.return &&
                          ((n.method = 'return'),
                          (n.arg = e),
                          t(r, n),
                          'throw' === n.method)) ||
                          ('return' !== o &&
                            ((n.method = 'throw'),
                            (n.arg = TypeError(
                              "The iterator does not provide a '" +
                                o +
                                "' method",
                            )))),
                        y
                      );
                    var s = c(i, r.iterator, n.arg);
                    if ('throw' === s.type)
                      return (
                        (n.method = 'throw'),
                        (n.arg = s.arg),
                        (n.delegate = null),
                        y
                      );
                    var a = s.arg;
                    return a
                      ? a.done
                        ? ((n[r.resultName] = a.value),
                          (n.next = r.nextLoc),
                          'return' !== n.method &&
                            ((n.method = 'next'), (n.arg = e)),
                          (n.delegate = null),
                          y)
                        : a
                      : ((n.method = 'throw'),
                        (n.arg = TypeError('iterator result is not an object')),
                        (n.delegate = null),
                        y);
                  })(i, s);
                  if (u) {
                    if (u === y) continue;
                    return u;
                  }
                }
                if ('next' === s.method) s.sent = s._sent = s.arg;
                else if ('throw' === s.method) {
                  if (a === h) throw ((a = d), s.arg);
                  s.dispatchException(s.arg);
                } else 'return' === s.method && s.abrupt('return', s.arg);
                a = p;
                var l = c(t, n, s);
                if ('normal' === l.type) {
                  if (((a = s.done ? d : 'suspendedYield'), l.arg === y))
                    continue;
                  return { value: l.arg, done: s.done };
                }
                'throw' === l.type &&
                  ((a = d), (s.method = 'throw'), (s.arg = l.arg));
              }
            }),
        }),
        u
      );
    }
    function c(t, e, r) {
      try {
        return { type: 'normal', arg: t.call(e, r) };
      } catch (t) {
        return { type: 'throw', arg: t };
      }
    }
    t.wrap = f;
    var h = 'suspendedStart',
      p = 'executing',
      d = 'completed',
      y = {};
    function g() {}
    function m() {}
    function b() {}
    var w = {};
    l(w, s, function () {
      return this;
    });
    var E = Object.getPrototypeOf,
      v = E && E(E(U([])));
    v && v !== r && n.call(v, s) && (w = v);
    var O = (b.prototype = g.prototype = Object.create(w));
    function A(t) {
      ['next', 'throw', 'return'].forEach(function (e) {
        l(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function B(t, e) {
      var r;
      o(this, '_invoke', {
        value: function (o, i) {
          function s() {
            return new e(function (r, s) {
              !(function r(o, i, s, a) {
                var u = c(t[o], t, i);
                if ('throw' === u.type) a(u.arg);
                else {
                  var l = u.arg,
                    f = l.value;
                  return f && 'object' == typeof f && n.call(f, '__await')
                    ? e.resolve(f.__await).then(
                        function (t) {
                          r('next', t, s, a);
                        },
                        function (t) {
                          r('throw', t, s, a);
                        },
                      )
                    : e.resolve(f).then(
                        function (t) {
                          (l.value = t), s(l);
                        },
                        function (t) {
                          return r('throw', t, s, a);
                        },
                      );
                }
              })(o, i, r, s);
            });
          }
          return (r = r ? r.then(s, s) : s());
        },
      });
    }
    function R(t) {
      var e = { tryLoc: t[0] };
      1 in t && (e.catchLoc = t[1]),
        2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
        this.tryEntries.push(e);
    }
    function S(t) {
      var e = t.completion || {};
      (e.type = 'normal'), delete e.arg, (t.completion = e);
    }
    function T(t) {
      (this.tryEntries = [{ tryLoc: 'root' }]),
        t.forEach(R, this),
        this.reset(!0);
    }
    function U(t) {
      if (null != t) {
        var r = t[s];
        if (r) return r.call(t);
        if ('function' == typeof t.next) return t;
        if (!isNaN(t.length)) {
          var o = -1,
            i = function r() {
              for (; ++o < t.length; )
                if (n.call(t, o)) return (r.value = t[o]), (r.done = !1), r;
              return (r.value = e), (r.done = !0), r;
            };
          return (i.next = i);
        }
      }
      throw TypeError(typeof t + ' is not iterable');
    }
    return (
      (m.prototype = b),
      o(O, 'constructor', { value: b, configurable: !0 }),
      o(b, 'constructor', { value: m, configurable: !0 }),
      (m.displayName = l(b, u, 'GeneratorFunction')),
      (t.isGeneratorFunction = function (t) {
        var e = 'function' == typeof t && t.constructor;
        return (
          !!e && (e === m || 'GeneratorFunction' === (e.displayName || e.name))
        );
      }),
      (t.mark = function (t) {
        return (
          Object.setPrototypeOf
            ? Object.setPrototypeOf(t, b)
            : ((t.__proto__ = b), l(t, u, 'GeneratorFunction')),
          (t.prototype = Object.create(O)),
          t
        );
      }),
      (t.awrap = function (t) {
        return { __await: t };
      }),
      A(B.prototype),
      l(B.prototype, a, function () {
        return this;
      }),
      (t.AsyncIterator = B),
      (t.async = function (e, r, n, o, i) {
        void 0 === i && (i = Promise);
        var s = new B(f(e, r, n, o), i);
        return t.isGeneratorFunction(r)
          ? s
          : s.next().then(function (t) {
              return t.done ? t.value : s.next();
            });
      }),
      A(O),
      l(O, u, 'Generator'),
      l(O, s, function () {
        return this;
      }),
      l(O, 'toString', function () {
        return '[object Generator]';
      }),
      (t.keys = function (t) {
        var e = Object(t),
          r = [];
        for (var n in e) r.push(n);
        return (
          r.reverse(),
          function t() {
            for (; r.length; ) {
              var n = r.pop();
              if (n in e) return (t.value = n), (t.done = !1), t;
            }
            return (t.done = !0), t;
          }
        );
      }),
      (t.values = U),
      (T.prototype = {
        constructor: T,
        reset: function (t) {
          if (
            ((this.prev = 0),
            (this.next = 0),
            (this.sent = this._sent = e),
            (this.done = !1),
            (this.delegate = null),
            (this.method = 'next'),
            (this.arg = e),
            this.tryEntries.forEach(S),
            !t)
          )
            for (var r in this)
              't' === r.charAt(0) &&
                n.call(this, r) &&
                !isNaN(+r.slice(1)) &&
                (this[r] = e);
        },
        stop: function () {
          this.done = !0;
          var t = this.tryEntries[0].completion;
          if ('throw' === t.type) throw t.arg;
          return this.rval;
        },
        dispatchException: function (t) {
          if (this.done) throw t;
          var r = this;
          function o(n, o) {
            return (
              (a.type = 'throw'),
              (a.arg = t),
              (r.next = n),
              o && ((r.method = 'next'), (r.arg = e)),
              !!o
            );
          }
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var s = this.tryEntries[i],
              a = s.completion;
            if ('root' === s.tryLoc) return o('end');
            if (s.tryLoc <= this.prev) {
              var u = n.call(s, 'catchLoc'),
                l = n.call(s, 'finallyLoc');
              if (u && l) {
                if (this.prev < s.catchLoc) return o(s.catchLoc, !0);
                if (this.prev < s.finallyLoc) return o(s.finallyLoc);
              } else if (u) {
                if (this.prev < s.catchLoc) return o(s.catchLoc, !0);
              } else if (l) {
                if (this.prev < s.finallyLoc) return o(s.finallyLoc);
              } else throw Error('try statement without catch or finally');
            }
          }
        },
        abrupt: function (t, e) {
          for (var r = this.tryEntries.length - 1; r >= 0; --r) {
            var o = this.tryEntries[r];
            if (
              o.tryLoc <= this.prev &&
              n.call(o, 'finallyLoc') &&
              this.prev < o.finallyLoc
            ) {
              var i = o;
              break;
            }
          }
          i &&
            ('break' === t || 'continue' === t) &&
            i.tryLoc <= e &&
            e <= i.finallyLoc &&
            (i = null);
          var s = i ? i.completion : {};
          return ((s.type = t), (s.arg = e), i)
            ? ((this.method = 'next'), (this.next = i.finallyLoc), y)
            : this.complete(s);
        },
        complete: function (t, e) {
          if ('throw' === t.type) throw t.arg;
          return (
            'break' === t.type || 'continue' === t.type
              ? (this.next = t.arg)
              : 'return' === t.type
                ? ((this.rval = this.arg = t.arg),
                  (this.method = 'return'),
                  (this.next = 'end'))
                : 'normal' === t.type && e && (this.next = e),
            y
          );
        },
        finish: function (t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.finallyLoc === t)
              return this.complete(r.completion, r.afterLoc), S(r), y;
          }
        },
        catch: function (t) {
          for (var e = this.tryEntries.length - 1; e >= 0; --e) {
            var r = this.tryEntries[e];
            if (r.tryLoc === t) {
              var n = r.completion;
              if ('throw' === n.type) {
                var o = n.arg;
                S(r);
              }
              return o;
            }
          }
          throw Error('illegal catch attempt');
        },
        delegateYield: function (t, r, n) {
          return (
            (this.delegate = { iterator: U(t), resultName: r, nextLoc: n }),
            'next' === this.method && (this.arg = e),
            y
          );
        },
      }),
      t
    );
  })({});
  try {
    regeneratorRuntime = l;
  } catch (t) {
    'object' == typeof globalThis
      ? (globalThis.regeneratorRuntime = l)
      : Function('r', 'regeneratorRuntime = r')(l);
  }
  function f(t, e) {
    return function () {
      return t.apply(e, arguments);
    };
  }
  let { toString: c } = Object.prototype,
    { getPrototypeOf: h } = Object,
    p =
      ((t = Object.create(null)),
      (e) => {
        let r = c.call(e);
        return t[r] || (t[r] = r.slice(8, -1).toLowerCase());
      }),
    d = (t) => ((t = t.toLowerCase()), (e) => p(e) === t),
    y = (t) => (e) => typeof e === t,
    { isArray: g } = Array,
    m = y('undefined'),
    b = d('ArrayBuffer'),
    w = y('string'),
    E = y('function'),
    v = y('number'),
    O = (t) => null !== t && 'object' == typeof t,
    A = (t) => {
      if ('object' !== p(t)) return !1;
      let e = h(t);
      return (
        (null === e ||
          e === Object.prototype ||
          null === Object.getPrototypeOf(e)) &&
        !(Symbol.toStringTag in t) &&
        !(Symbol.iterator in t)
      );
    },
    B = d('Date'),
    R = d('File'),
    S = d('Blob'),
    T = d('FileList'),
    U = d('URLSearchParams');
  function x(t, e, { allOwnKeys: r = !1 } = {}) {
    let n, o;
    if (null != t) {
      if (('object' != typeof t && (t = [t]), g(t)))
        for (n = 0, o = t.length; n < o; n++) e.call(null, t[n], n, t);
      else {
        let o;
        let i = r ? Object.getOwnPropertyNames(t) : Object.keys(t),
          s = i.length;
        for (n = 0; n < s; n++) (o = i[n]), e.call(null, t[o], o, t);
      }
    }
  }
  function I(t, e) {
    let r;
    e = e.toLowerCase();
    let n = Object.keys(t),
      o = n.length;
    for (; o-- > 0; ) if (e === (r = n[o]).toLowerCase()) return r;
    return null;
  }
  let C =
      'undefined' != typeof globalThis
        ? globalThis
        : 'undefined' != typeof self
          ? self
          : 'undefined' != typeof window
            ? window
            : a,
    _ = (t) => !m(t) && t !== C,
    N =
      ((e = 'undefined' != typeof Uint8Array && h(Uint8Array)),
      (t) => e && t instanceof e),
    j = d('HTMLFormElement'),
    P = (
      ({ hasOwnProperty: t }) =>
      (e, r) =>
        t.call(e, r)
    )(Object.prototype),
    k = d('RegExp'),
    F = (t, e) => {
      let r = Object.getOwnPropertyDescriptors(t),
        n = {};
      x(r, (r, o) => {
        let i;
        !1 !== (i = e(r, o, t)) && (n[o] = i || r);
      }),
        Object.defineProperties(t, n);
    },
    D = 'abcdefghijklmnopqrstuvwxyz',
    M = '0123456789',
    q = { DIGIT: M, ALPHA: D, ALPHA_DIGIT: D + D.toUpperCase() + M },
    $ = d('AsyncFunction');
  var z = {
    isArray: g,
    isArrayBuffer: b,
    isBuffer: function (t) {
      return (
        null !== t &&
        !m(t) &&
        null !== t.constructor &&
        !m(t.constructor) &&
        E(t.constructor.isBuffer) &&
        t.constructor.isBuffer(t)
      );
    },
    isFormData: (t) => {
      let e;
      return (
        t &&
        (('function' == typeof FormData && t instanceof FormData) ||
          (E(t.append) &&
            ('formdata' === (e = p(t)) ||
              ('object' === e &&
                E(t.toString) &&
                '[object FormData]' === t.toString()))))
      );
    },
    isArrayBufferView: function (t) {
      return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
        ? ArrayBuffer.isView(t)
        : t && t.buffer && b(t.buffer);
    },
    isString: w,
    isNumber: v,
    isBoolean: (t) => !0 === t || !1 === t,
    isObject: O,
    isPlainObject: A,
    isUndefined: m,
    isDate: B,
    isFile: R,
    isBlob: S,
    isRegExp: k,
    isFunction: E,
    isStream: (t) => O(t) && E(t.pipe),
    isURLSearchParams: U,
    isTypedArray: N,
    isFileList: T,
    forEach: x,
    merge: function t() {
      let { caseless: e } = (_(this) && this) || {},
        r = {},
        n = (n, o) => {
          let i = (e && I(r, o)) || o;
          A(r[i]) && A(n)
            ? (r[i] = t(r[i], n))
            : A(n)
              ? (r[i] = t({}, n))
              : g(n)
                ? (r[i] = n.slice())
                : (r[i] = n);
        };
      for (let t = 0, e = arguments.length; t < e; t++)
        arguments[t] && x(arguments[t], n);
      return r;
    },
    extend: (t, e, r, { allOwnKeys: n } = {}) => (
      x(
        e,
        (e, n) => {
          r && E(e) ? (t[n] = f(e, r)) : (t[n] = e);
        },
        { allOwnKeys: n },
      ),
      t
    ),
    trim: (t) =>
      t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''),
    stripBOM: (t) => (65279 === t.charCodeAt(0) && (t = t.slice(1)), t),
    inherits: (t, e, r, n) => {
      (t.prototype = Object.create(e.prototype, n)),
        (t.prototype.constructor = t),
        Object.defineProperty(t, 'super', { value: e.prototype }),
        r && Object.assign(t.prototype, r);
    },
    toFlatObject: (t, e, r, n) => {
      let o, i, s;
      let a = {};
      if (((e = e || {}), null == t)) return e;
      do {
        for (i = (o = Object.getOwnPropertyNames(t)).length; i-- > 0; )
          (s = o[i]),
            (!n || n(s, t, e)) && !a[s] && ((e[s] = t[s]), (a[s] = !0));
        t = !1 !== r && h(t);
      } while (t && (!r || r(t, e)) && t !== Object.prototype);
      return e;
    },
    kindOf: p,
    kindOfTest: d,
    endsWith: (t, e, r) => {
      (t = String(t)),
        (void 0 === r || r > t.length) && (r = t.length),
        (r -= e.length);
      let n = t.indexOf(e, r);
      return -1 !== n && n === r;
    },
    toArray: (t) => {
      if (!t) return null;
      if (g(t)) return t;
      let e = t.length;
      if (!v(e)) return null;
      let r = Array(e);
      for (; e-- > 0; ) r[e] = t[e];
      return r;
    },
    forEachEntry: (t, e) => {
      let r;
      let n = (t && t[Symbol.iterator]).call(t);
      for (; (r = n.next()) && !r.done; ) {
        let n = r.value;
        e.call(t, n[0], n[1]);
      }
    },
    matchAll: (t, e) => {
      let r;
      let n = [];
      for (; null !== (r = t.exec(e)); ) n.push(r);
      return n;
    },
    isHTMLForm: j,
    hasOwnProperty: P,
    hasOwnProp: P,
    reduceDescriptors: F,
    freezeMethods: (t) => {
      F(t, (e, r) => {
        if (E(t) && -1 !== ['arguments', 'caller', 'callee'].indexOf(r))
          return !1;
        if (E(t[r])) {
          if (((e.enumerable = !1), 'writable' in e)) {
            e.writable = !1;
            return;
          }
          e.set ||
            (e.set = () => {
              throw Error("Can not rewrite read-only method '" + r + "'");
            });
        }
      });
    },
    toObjectSet: (t, e) => {
      let r = {};
      return (
        ((t) => {
          t.forEach((t) => {
            r[t] = !0;
          });
        })(g(t) ? t : String(t).split(e)),
        r
      );
    },
    toCamelCase: (t) =>
      t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (t, e, r) {
        return e.toUpperCase() + r;
      }),
    noop: () => {},
    toFiniteNumber: (t, e) => (Number.isFinite((t = +t)) ? t : e),
    findKey: I,
    global: C,
    isContextDefined: _,
    ALPHABET: q,
    generateString: (t = 16, e = q.ALPHA_DIGIT) => {
      let r = '',
        { length: n } = e;
      for (; t--; ) r += e[(Math.random() * n) | 0];
      return r;
    },
    isSpecCompliantForm: function (t) {
      return !!(
        t &&
        E(t.append) &&
        'FormData' === t[Symbol.toStringTag] &&
        t[Symbol.iterator]
      );
    },
    toJSONObject: (t) => {
      let e = Array(10),
        r = (t, n) => {
          if (O(t)) {
            if (e.indexOf(t) >= 0) return;
            if (!('toJSON' in t)) {
              e[n] = t;
              let o = g(t) ? [] : {};
              return (
                x(t, (t, e) => {
                  let i = r(t, n + 1);
                  m(i) || (o[e] = i);
                }),
                (e[n] = void 0),
                o
              );
            }
          }
          return t;
        };
      return r(t, 0);
    },
    isAsyncFn: $,
    isThenable: (t) => t && (O(t) || E(t)) && E(t.then) && E(t.catch),
  };
  function H(t, e, r, n, o) {
    Error.call(this),
      Error.captureStackTrace
        ? Error.captureStackTrace(this, this.constructor)
        : (this.stack = Error().stack),
      (this.message = t),
      (this.name = 'AxiosError'),
      e && (this.code = e),
      r && (this.config = r),
      n && (this.request = n),
      o && (this.response = o);
  }
  z.inherits(H, Error, {
    toJSON: function () {
      return {
        message: this.message,
        name: this.name,
        description: this.description,
        number: this.number,
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        config: z.toJSONObject(this.config),
        code: this.code,
        status:
          this.response && this.response.status ? this.response.status : null,
      };
    },
  });
  let G = H.prototype,
    J = {};
  [
    'ERR_BAD_OPTION_VALUE',
    'ERR_BAD_OPTION',
    'ECONNABORTED',
    'ETIMEDOUT',
    'ERR_NETWORK',
    'ERR_FR_TOO_MANY_REDIRECTS',
    'ERR_DEPRECATED',
    'ERR_BAD_RESPONSE',
    'ERR_BAD_REQUEST',
    'ERR_CANCELED',
    'ERR_NOT_SUPPORT',
    'ERR_INVALID_URL',
  ].forEach((t) => {
    J[t] = { value: t };
  }),
    Object.defineProperties(H, J),
    Object.defineProperty(G, 'isAxiosError', { value: !0 }),
    (H.from = (t, e, r, n, o, i) => {
      let s = Object.create(G);
      return (
        z.toFlatObject(
          t,
          s,
          function (t) {
            return t !== Error.prototype;
          },
          (t) => 'isAxiosError' !== t,
        ),
        H.call(s, t.message, e, r, n, o),
        (s.cause = t),
        (s.name = t.name),
        i && Object.assign(s, i),
        s
      );
    }),
    (n = function (t) {
      var e,
        r,
        n = (function (t) {
          var e = t.length;
          if (e % 4 > 0)
            throw Error('Invalid string. Length must be a multiple of 4');
          var r = t.indexOf('=');
          -1 === r && (r = e);
          var n = r === e ? 0 : 4 - (r % 4);
          return [r, n];
        })(t),
        o = n[0],
        i = n[1],
        s = new K(((o + i) * 3) / 4 - i),
        a = 0,
        u = i > 0 ? o - 4 : o;
      for (r = 0; r < u; r += 4)
        (e =
          (W[t.charCodeAt(r)] << 18) |
          (W[t.charCodeAt(r + 1)] << 12) |
          (W[t.charCodeAt(r + 2)] << 6) |
          W[t.charCodeAt(r + 3)]),
          (s[a++] = (e >> 16) & 255),
          (s[a++] = (e >> 8) & 255),
          (s[a++] = 255 & e);
      return (
        2 === i &&
          ((e = (W[t.charCodeAt(r)] << 2) | (W[t.charCodeAt(r + 1)] >> 4)),
          (s[a++] = 255 & e)),
        1 === i &&
          ((e =
            (W[t.charCodeAt(r)] << 10) |
            (W[t.charCodeAt(r + 1)] << 4) |
            (W[t.charCodeAt(r + 2)] >> 2)),
          (s[a++] = (e >> 8) & 255),
          (s[a++] = 255 & e)),
        s
      );
    }),
    (o = function (t) {
      for (
        var e, r = t.length, n = r % 3, o = [], i = 0, s = r - n;
        i < s;
        i += 16383
      )
        o.push(
          (function (t, e, r) {
            for (var n, o = [], i = e; i < r; i += 3)
              o.push(
                V[
                  ((n =
                    ((t[i] << 16) & 16711680) +
                    ((t[i + 1] << 8) & 65280) +
                    (255 & t[i + 2])) >>
                    18) &
                    63
                ] +
                  V[(n >> 12) & 63] +
                  V[(n >> 6) & 63] +
                  V[63 & n],
              );
            return o.join('');
          })(t, i, i + 16383 > s ? s : i + 16383),
        );
      return (
        1 === n
          ? o.push(V[(e = t[r - 1]) >> 2] + V[(e << 4) & 63] + '==')
          : 2 === n &&
            o.push(
              V[(e = (t[r - 2] << 8) + t[r - 1]) >> 10] +
                V[(e >> 4) & 63] +
                V[(e << 2) & 63] +
                '=',
            ),
        o.join('')
      );
    });
  for (
    var V = [],
      W = [],
      K = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
      Y = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      X = 0,
      Z = Y.length;
    X < Z;
    ++X
  )
    (V[X] = Y[X]), (W[Y.charCodeAt(X)] = X);
  (W['-'.charCodeAt(0)] = 62),
    (W['_'.charCodeAt(0)] = 63),
    (i = function (t, e, r, n, o) {
      var i,
        s,
        a = 8 * o - n - 1,
        u = (1 << a) - 1,
        l = u >> 1,
        f = -7,
        c = r ? o - 1 : 0,
        h = r ? -1 : 1,
        p = t[e + c];
      for (
        c += h, i = p & ((1 << -f) - 1), p >>= -f, f += a;
        f > 0;
        i = 256 * i + t[e + c], c += h, f -= 8
      );
      for (
        s = i & ((1 << -f) - 1), i >>= -f, f += n;
        f > 0;
        s = 256 * s + t[e + c], c += h, f -= 8
      );
      if (0 === i) i = 1 - l;
      else {
        if (i === u) return s ? NaN : (1 / 0) * (p ? -1 : 1);
        (s += Math.pow(2, n)), (i -= l);
      }
      return (p ? -1 : 1) * s * Math.pow(2, i - n);
    }),
    (s = function (t, e, r, n, o, i) {
      var s,
        a,
        u,
        l = 8 * i - o - 1,
        f = (1 << l) - 1,
        c = f >> 1,
        h = 23 === o ? 5960464477539062e-23 : 0,
        p = n ? 0 : i - 1,
        d = n ? 1 : -1,
        y = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
      for (
        isNaN((e = Math.abs(e))) || e === 1 / 0
          ? ((a = isNaN(e) ? 1 : 0), (s = f))
          : ((s = Math.floor(Math.log(e) / Math.LN2)),
            e * (u = Math.pow(2, -s)) < 1 && (s--, (u *= 2)),
            s + c >= 1 ? (e += h / u) : (e += h * Math.pow(2, 1 - c)),
            e * u >= 2 && (s++, (u /= 2)),
            s + c >= f
              ? ((a = 0), (s = f))
              : s + c >= 1
                ? ((a = (e * u - 1) * Math.pow(2, o)), (s += c))
                : ((a = e * Math.pow(2, c - 1) * Math.pow(2, o)), (s = 0)));
        o >= 8;
        t[r + p] = 255 & a, p += d, a /= 256, o -= 8
      );
      for (
        s = (s << o) | a, l += o;
        l > 0;
        t[r + p] = 255 & s, p += d, s /= 256, l -= 8
      );
      t[r + p - d] |= 128 * y;
    });
  let Q =
    'function' == typeof Symbol && 'function' == typeof Symbol.for
      ? Symbol.for('nodejs.util.inspect.custom')
      : null;
  function tt(t) {
    if (t > 2147483647)
      throw RangeError('The value "' + t + '" is invalid for option "size"');
    let e = new Uint8Array(t);
    return Object.setPrototypeOf(e, te.prototype), e;
  }
  function te(t, e, r) {
    if ('number' == typeof t) {
      if ('string' == typeof e)
        throw TypeError(
          'The "string" argument must be of type string. Received type number',
        );
      return to(t);
    }
    return tr(t, e, r);
  }
  function tr(t, e, r) {
    if ('string' == typeof t)
      return (function (t, e) {
        if (
          (('string' != typeof e || '' === e) && (e = 'utf8'),
          !te.isEncoding(e))
        )
          throw TypeError('Unknown encoding: ' + e);
        let r = 0 | tu(t, e),
          n = tt(r),
          o = n.write(t, e);
        return o !== r && (n = n.slice(0, o)), n;
      })(t, e);
    if (ArrayBuffer.isView(t))
      return (function (t) {
        if (tI(t, Uint8Array)) {
          let e = new Uint8Array(t);
          return ts(e.buffer, e.byteOffset, e.byteLength);
        }
        return ti(t);
      })(t);
    if (null == t)
      throw TypeError(
        'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
          typeof t,
      );
    if (
      tI(t, ArrayBuffer) ||
      (t && tI(t.buffer, ArrayBuffer)) ||
      ('undefined' != typeof SharedArrayBuffer &&
        (tI(t, SharedArrayBuffer) || (t && tI(t.buffer, SharedArrayBuffer))))
    )
      return ts(t, e, r);
    if ('number' == typeof t)
      throw TypeError(
        'The "value" argument must not be of type number. Received type number',
      );
    let n = t.valueOf && t.valueOf();
    if (null != n && n !== t) return te.from(n, e, r);
    let o = (function (t) {
      var e;
      if (te.isBuffer(t)) {
        let e = 0 | ta(t.length),
          r = tt(e);
        return 0 === r.length || t.copy(r, 0, 0, e), r;
      }
      return void 0 !== t.length
        ? 'number' != typeof t.length || (e = t.length) != e
          ? tt(0)
          : ti(t)
        : 'Buffer' === t.type && Array.isArray(t.data)
          ? ti(t.data)
          : void 0;
    })(t);
    if (o) return o;
    if (
      'undefined' != typeof Symbol &&
      null != Symbol.toPrimitive &&
      'function' == typeof t[Symbol.toPrimitive]
    )
      return te.from(t[Symbol.toPrimitive]('string'), e, r);
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' +
        typeof t,
    );
  }
  function tn(t) {
    if ('number' != typeof t)
      throw TypeError('"size" argument must be of type number');
    if (t < 0)
      throw RangeError('The value "' + t + '" is invalid for option "size"');
  }
  function to(t) {
    return tn(t), tt(t < 0 ? 0 : 0 | ta(t));
  }
  function ti(t) {
    let e = t.length < 0 ? 0 : 0 | ta(t.length),
      r = tt(e);
    for (let n = 0; n < e; n += 1) r[n] = 255 & t[n];
    return r;
  }
  function ts(t, e, r) {
    let n;
    if (e < 0 || t.byteLength < e)
      throw RangeError('"offset" is outside of buffer bounds');
    if (t.byteLength < e + (r || 0))
      throw RangeError('"length" is outside of buffer bounds');
    return (
      Object.setPrototypeOf(
        (n =
          void 0 === e && void 0 === r
            ? new Uint8Array(t)
            : void 0 === r
              ? new Uint8Array(t, e)
              : new Uint8Array(t, e, r)),
        te.prototype,
      ),
      n
    );
  }
  function ta(t) {
    if (t >= 2147483647)
      throw RangeError(
        'Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes',
      );
    return 0 | t;
  }
  function tu(t, e) {
    if (te.isBuffer(t)) return t.length;
    if (ArrayBuffer.isView(t) || tI(t, ArrayBuffer)) return t.byteLength;
    if ('string' != typeof t)
      throw TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
          typeof t,
      );
    let r = t.length,
      n = arguments.length > 2 && !0 === arguments[2];
    if (!n && 0 === r) return 0;
    let o = !1;
    for (;;)
      switch (e) {
        case 'ascii':
        case 'latin1':
        case 'binary':
          return r;
        case 'utf8':
        case 'utf-8':
          return tL(t).length;
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return 2 * r;
        case 'hex':
          return r >>> 1;
        case 'base64':
          return tU(t).length;
        default:
          if (o) return n ? -1 : tL(t).length;
          (e = ('' + e).toLowerCase()), (o = !0);
      }
  }
  function tl(t, e, r) {
    let n = !1;
    if (
      ((void 0 === e || e < 0) && (e = 0),
      e > this.length ||
        ((void 0 === r || r > this.length) && (r = this.length),
        r <= 0 || (r >>>= 0) <= (e >>>= 0)))
    )
      return '';
    for (t || (t = 'utf8'); ; )
      switch (t) {
        case 'hex':
          return (function (t, e, r) {
            let n = t.length;
            (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
            let o = '';
            for (let n = e; n < r; ++n) o += tC[t[n]];
            return o;
          })(this, e, r);
        case 'utf8':
        case 'utf-8':
          return tp(this, e, r);
        case 'ascii':
          return (function (t, e, r) {
            let n = '';
            r = Math.min(t.length, r);
            for (let o = e; o < r; ++o) n += String.fromCharCode(127 & t[o]);
            return n;
          })(this, e, r);
        case 'latin1':
        case 'binary':
          return (function (t, e, r) {
            let n = '';
            r = Math.min(t.length, r);
            for (let o = e; o < r; ++o) n += String.fromCharCode(t[o]);
            return n;
          })(this, e, r);
        case 'base64':
          var i, s;
          return (
            (i = e),
            (s = r),
            0 === i && s === this.length ? o(this) : o(this.slice(i, s))
          );
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return (function (t, e, r) {
            let n = t.slice(e, r),
              o = '';
            for (let t = 0; t < n.length - 1; t += 2)
              o += String.fromCharCode(n[t] + 256 * n[t + 1]);
            return o;
          })(this, e, r);
        default:
          if (n) throw TypeError('Unknown encoding: ' + t);
          (t = (t + '').toLowerCase()), (n = !0);
      }
  }
  function tf(t, e, r) {
    let n = t[e];
    (t[e] = t[r]), (t[r] = n);
  }
  function tc(t, e, r, n, o) {
    var i;
    if (0 === t.length) return -1;
    if (
      ('string' == typeof r
        ? ((n = r), (r = 0))
        : r > 2147483647
          ? (r = 2147483647)
          : r < -2147483648 && (r = -2147483648),
      (i = r = +r) != i && (r = o ? 0 : t.length - 1),
      r < 0 && (r = t.length + r),
      r >= t.length)
    ) {
      if (o) return -1;
      r = t.length - 1;
    } else if (r < 0) {
      if (!o) return -1;
      r = 0;
    }
    if (('string' == typeof e && (e = te.from(e, n)), te.isBuffer(e)))
      return 0 === e.length ? -1 : th(t, e, r, n, o);
    if ('number' == typeof e)
      return ((e &= 255), 'function' == typeof Uint8Array.prototype.indexOf)
        ? o
          ? Uint8Array.prototype.indexOf.call(t, e, r)
          : Uint8Array.prototype.lastIndexOf.call(t, e, r)
        : th(t, [e], r, n, o);
    throw TypeError('val must be string, number or Buffer');
  }
  function th(t, e, r, n, o) {
    let i,
      s = 1,
      a = t.length,
      u = e.length;
    if (
      void 0 !== n &&
      ('ucs2' === (n = String(n).toLowerCase()) ||
        'ucs-2' === n ||
        'utf16le' === n ||
        'utf-16le' === n)
    ) {
      if (t.length < 2 || e.length < 2) return -1;
      (s = 2), (a /= 2), (u /= 2), (r /= 2);
    }
    function l(t, e) {
      return 1 === s ? t[e] : t.readUInt16BE(e * s);
    }
    if (o) {
      let n = -1;
      for (i = r; i < a; i++)
        if (l(t, i) === l(e, -1 === n ? 0 : i - n)) {
          if ((-1 === n && (n = i), i - n + 1 === u)) return n * s;
        } else -1 !== n && (i -= i - n), (n = -1);
    } else
      for (r + u > a && (r = a - u), i = r; i >= 0; i--) {
        let r = !0;
        for (let n = 0; n < u; n++)
          if (l(t, i + n) !== l(e, n)) {
            r = !1;
            break;
          }
        if (r) return i;
      }
    return -1;
  }
  function tp(t, e, r) {
    r = Math.min(t.length, r);
    let n = [],
      o = e;
    for (; o < r; ) {
      let e = t[o],
        i = null,
        s = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
      if (o + s <= r) {
        let r, n, a, u;
        switch (s) {
          case 1:
            e < 128 && (i = e);
            break;
          case 2:
            (192 & (r = t[o + 1])) == 128 &&
              (u = ((31 & e) << 6) | (63 & r)) > 127 &&
              (i = u);
            break;
          case 3:
            (r = t[o + 1]),
              (n = t[o + 2]),
              (192 & r) == 128 &&
                (192 & n) == 128 &&
                (u = ((15 & e) << 12) | ((63 & r) << 6) | (63 & n)) > 2047 &&
                (u < 55296 || u > 57343) &&
                (i = u);
            break;
          case 4:
            (r = t[o + 1]),
              (n = t[o + 2]),
              (a = t[o + 3]),
              (192 & r) == 128 &&
                (192 & n) == 128 &&
                (192 & a) == 128 &&
                (u =
                  ((15 & e) << 18) |
                  ((63 & r) << 12) |
                  ((63 & n) << 6) |
                  (63 & a)) > 65535 &&
                u < 1114112 &&
                (i = u);
        }
      }
      null === i
        ? ((i = 65533), (s = 1))
        : i > 65535 &&
          ((i -= 65536),
          n.push(((i >>> 10) & 1023) | 55296),
          (i = 56320 | (1023 & i))),
        n.push(i),
        (o += s);
    }
    return (function (t) {
      let e = t.length;
      if (e <= 4096) return String.fromCharCode.apply(String, t);
      let r = '',
        n = 0;
      for (; n < e; )
        r += String.fromCharCode.apply(String, t.slice(n, (n += 4096)));
      return r;
    })(n);
  }
  function td(t, e, r) {
    if (t % 1 != 0 || t < 0) throw RangeError('offset is not uint');
    if (t + e > r) throw RangeError('Trying to access beyond buffer length');
  }
  function ty(t, e, r, n, o, i) {
    if (!te.isBuffer(t))
      throw TypeError('"buffer" argument must be a Buffer instance');
    if (e > o || e < i) throw RangeError('"value" argument is out of bounds');
    if (r + n > t.length) throw RangeError('Index out of range');
  }
  function tg(t, e, r, n, o) {
    tB(e, n, o, t, r, 7);
    let i = Number(e & BigInt(4294967295));
    (t[r++] = i),
      (i >>= 8),
      (t[r++] = i),
      (i >>= 8),
      (t[r++] = i),
      (i >>= 8),
      (t[r++] = i);
    let s = Number((e >> BigInt(32)) & BigInt(4294967295));
    return (
      (t[r++] = s),
      (s >>= 8),
      (t[r++] = s),
      (s >>= 8),
      (t[r++] = s),
      (s >>= 8),
      (t[r++] = s),
      r
    );
  }
  function tm(t, e, r, n, o) {
    tB(e, n, o, t, r, 7);
    let i = Number(e & BigInt(4294967295));
    (t[r + 7] = i),
      (i >>= 8),
      (t[r + 6] = i),
      (i >>= 8),
      (t[r + 5] = i),
      (i >>= 8),
      (t[r + 4] = i);
    let s = Number((e >> BigInt(32)) & BigInt(4294967295));
    return (
      (t[r + 3] = s),
      (s >>= 8),
      (t[r + 2] = s),
      (s >>= 8),
      (t[r + 1] = s),
      (s >>= 8),
      (t[r] = s),
      r + 8
    );
  }
  function tb(t, e, r, n, o, i) {
    if (r + n > t.length || r < 0) throw RangeError('Index out of range');
  }
  function tw(t, e, r, n, o) {
    return (
      (e = +e),
      (r >>>= 0),
      o || tb(t, e, r, 4, 34028234663852886e22, -34028234663852886e22),
      s(t, e, r, n, 23, 4),
      r + 4
    );
  }
  function tE(t, e, r, n, o) {
    return (
      (e = +e),
      (r >>>= 0),
      o || tb(t, e, r, 8, 17976931348623157e292, -17976931348623157e292),
      s(t, e, r, n, 52, 8),
      r + 8
    );
  }
  (te.TYPED_ARRAY_SUPPORT = (function () {
    try {
      let t = new Uint8Array(1),
        e = {
          foo: function () {
            return 42;
          },
        };
      return (
        Object.setPrototypeOf(e, Uint8Array.prototype),
        Object.setPrototypeOf(t, e),
        42 === t.foo()
      );
    } catch (t) {
      return !1;
    }
  })()),
    te.TYPED_ARRAY_SUPPORT ||
      'undefined' == typeof console ||
      'function' != typeof console.error ||
      console.error(
        'This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.',
      ),
    Object.defineProperty(te.prototype, 'parent', {
      enumerable: !0,
      get: function () {
        if (te.isBuffer(this)) return this.buffer;
      },
    }),
    Object.defineProperty(te.prototype, 'offset', {
      enumerable: !0,
      get: function () {
        if (te.isBuffer(this)) return this.byteOffset;
      },
    }),
    (te.poolSize = 8192),
    (te.from = function (t, e, r) {
      return tr(t, e, r);
    }),
    Object.setPrototypeOf(te.prototype, Uint8Array.prototype),
    Object.setPrototypeOf(te, Uint8Array),
    (te.alloc = function (t, e, r) {
      return (tn(t), t <= 0)
        ? tt(t)
        : void 0 !== e
          ? 'string' == typeof r
            ? tt(t).fill(e, r)
            : tt(t).fill(e)
          : tt(t);
    }),
    (te.allocUnsafe = function (t) {
      return to(t);
    }),
    (te.allocUnsafeSlow = function (t) {
      return to(t);
    }),
    (te.isBuffer = function (t) {
      return null != t && !0 === t._isBuffer && t !== te.prototype;
    }),
    (te.compare = function (t, e) {
      if (
        (tI(t, Uint8Array) && (t = te.from(t, t.offset, t.byteLength)),
        tI(e, Uint8Array) && (e = te.from(e, e.offset, e.byteLength)),
        !te.isBuffer(t) || !te.isBuffer(e))
      )
        throw TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
        );
      if (t === e) return 0;
      let r = t.length,
        n = e.length;
      for (let o = 0, i = Math.min(r, n); o < i; ++o)
        if (t[o] !== e[o]) {
          (r = t[o]), (n = e[o]);
          break;
        }
      return r < n ? -1 : n < r ? 1 : 0;
    }),
    (te.isEncoding = function (t) {
      switch (String(t).toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'latin1':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return !0;
        default:
          return !1;
      }
    }),
    (te.concat = function (t, e) {
      let r;
      if (!Array.isArray(t))
        throw TypeError('"list" argument must be an Array of Buffers');
      if (0 === t.length) return te.alloc(0);
      if (void 0 === e) for (r = 0, e = 0; r < t.length; ++r) e += t[r].length;
      let n = te.allocUnsafe(e),
        o = 0;
      for (r = 0; r < t.length; ++r) {
        let e = t[r];
        if (tI(e, Uint8Array))
          o + e.length > n.length
            ? (te.isBuffer(e) || (e = te.from(e)), e.copy(n, o))
            : Uint8Array.prototype.set.call(n, e, o);
        else if (te.isBuffer(e)) e.copy(n, o);
        else throw TypeError('"list" argument must be an Array of Buffers');
        o += e.length;
      }
      return n;
    }),
    (te.byteLength = tu),
    (te.prototype._isBuffer = !0),
    (te.prototype.swap16 = function () {
      let t = this.length;
      if (t % 2 != 0)
        throw RangeError('Buffer size must be a multiple of 16-bits');
      for (let e = 0; e < t; e += 2) tf(this, e, e + 1);
      return this;
    }),
    (te.prototype.swap32 = function () {
      let t = this.length;
      if (t % 4 != 0)
        throw RangeError('Buffer size must be a multiple of 32-bits');
      for (let e = 0; e < t; e += 4) tf(this, e, e + 3), tf(this, e + 1, e + 2);
      return this;
    }),
    (te.prototype.swap64 = function () {
      let t = this.length;
      if (t % 8 != 0)
        throw RangeError('Buffer size must be a multiple of 64-bits');
      for (let e = 0; e < t; e += 8)
        tf(this, e, e + 7),
          tf(this, e + 1, e + 6),
          tf(this, e + 2, e + 5),
          tf(this, e + 3, e + 4);
      return this;
    }),
    (te.prototype.toString = function () {
      let t = this.length;
      return 0 === t
        ? ''
        : 0 == arguments.length
          ? tp(this, 0, t)
          : tl.apply(this, arguments);
    }),
    (te.prototype.toLocaleString = te.prototype.toString),
    (te.prototype.equals = function (t) {
      if (!te.isBuffer(t)) throw TypeError('Argument must be a Buffer');
      return this === t || 0 === te.compare(this, t);
    }),
    (te.prototype.inspect = function () {
      let t = '';
      return (
        (t = this.toString('hex', 0, 50)
          .replace(/(.{2})/g, '$1 ')
          .trim()),
        this.length > 50 && (t += ' ... '),
        '<Buffer ' + t + '>'
      );
    }),
    Q && (te.prototype[Q] = te.prototype.inspect),
    (te.prototype.compare = function (t, e, r, n, o) {
      if (
        (tI(t, Uint8Array) && (t = te.from(t, t.offset, t.byteLength)),
        !te.isBuffer(t))
      )
        throw TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
            typeof t,
        );
      if (
        (void 0 === e && (e = 0),
        void 0 === r && (r = t ? t.length : 0),
        void 0 === n && (n = 0),
        void 0 === o && (o = this.length),
        e < 0 || r > t.length || n < 0 || o > this.length)
      )
        throw RangeError('out of range index');
      if (n >= o && e >= r) return 0;
      if (n >= o) return -1;
      if (e >= r) return 1;
      if (((e >>>= 0), (r >>>= 0), (n >>>= 0), (o >>>= 0), this === t))
        return 0;
      let i = o - n,
        s = r - e,
        a = Math.min(i, s),
        u = this.slice(n, o),
        l = t.slice(e, r);
      for (let t = 0; t < a; ++t)
        if (u[t] !== l[t]) {
          (i = u[t]), (s = l[t]);
          break;
        }
      return i < s ? -1 : s < i ? 1 : 0;
    }),
    (te.prototype.includes = function (t, e, r) {
      return -1 !== this.indexOf(t, e, r);
    }),
    (te.prototype.indexOf = function (t, e, r) {
      return tc(this, t, e, r, !0);
    }),
    (te.prototype.lastIndexOf = function (t, e, r) {
      return tc(this, t, e, r, !1);
    }),
    (te.prototype.write = function (t, e, r, n) {
      var o, i, s, a, u, l, f, c;
      if (void 0 === e) (n = 'utf8'), (r = this.length), (e = 0);
      else if (void 0 === r && 'string' == typeof e)
        (n = e), (r = this.length), (e = 0);
      else if (isFinite(e))
        (e >>>= 0),
          isFinite(r)
            ? ((r >>>= 0), void 0 === n && (n = 'utf8'))
            : ((n = r), (r = void 0));
      else
        throw Error(
          'Buffer.write(string, encoding, offset[, length]) is no longer supported',
        );
      let h = this.length - e;
      if (
        ((void 0 === r || r > h) && (r = h),
        (t.length > 0 && (r < 0 || e < 0)) || e > this.length)
      )
        throw RangeError('Attempt to write outside buffer bounds');
      n || (n = 'utf8');
      let p = !1;
      for (;;)
        switch (n) {
          case 'hex':
            return (function (t, e, r, n) {
              let o;
              r = Number(r) || 0;
              let i = t.length - r;
              n ? (n = Number(n)) > i && (n = i) : (n = i);
              let s = e.length;
              for (n > s / 2 && (n = s / 2), o = 0; o < n; ++o) {
                let n = parseInt(e.substr(2 * o, 2), 16);
                if (n != n) break;
                t[r + o] = n;
              }
              return o;
            })(this, t, e, r);
          case 'utf8':
          case 'utf-8':
            return (o = e), (i = r), tx(tL(t, this.length - o), this, o, i);
          case 'ascii':
          case 'latin1':
          case 'binary':
            return (
              (s = e),
              (a = r),
              tx(
                (function (t) {
                  let e = [];
                  for (let r = 0; r < t.length; ++r)
                    e.push(255 & t.charCodeAt(r));
                  return e;
                })(t),
                this,
                s,
                a,
              )
            );
          case 'base64':
            return (u = e), (l = r), tx(tU(t), this, u, l);
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return (
              (f = e),
              (c = r),
              tx(
                (function (t, e) {
                  let r, n;
                  let o = [];
                  for (let i = 0; i < t.length && !((e -= 2) < 0); ++i)
                    (n = (r = t.charCodeAt(i)) >> 8),
                      o.push(r % 256),
                      o.push(n);
                  return o;
                })(t, this.length - f),
                this,
                f,
                c,
              )
            );
          default:
            if (p) throw TypeError('Unknown encoding: ' + n);
            (n = ('' + n).toLowerCase()), (p = !0);
        }
    }),
    (te.prototype.toJSON = function () {
      return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    }),
    (te.prototype.slice = function (t, e) {
      let r = this.length;
      (t = ~~t),
        (e = void 0 === e ? r : ~~e),
        t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
        e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
        e < t && (e = t);
      let n = this.subarray(t, e);
      return Object.setPrototypeOf(n, te.prototype), n;
    }),
    (te.prototype.readUintLE = te.prototype.readUIntLE =
      function (t, e, r) {
        (t >>>= 0), (e >>>= 0), r || td(t, e, this.length);
        let n = this[t],
          o = 1,
          i = 0;
        for (; ++i < e && (o *= 256); ) n += this[t + i] * o;
        return n;
      }),
    (te.prototype.readUintBE = te.prototype.readUIntBE =
      function (t, e, r) {
        (t >>>= 0), (e >>>= 0), r || td(t, e, this.length);
        let n = this[t + --e],
          o = 1;
        for (; e > 0 && (o *= 256); ) n += this[t + --e] * o;
        return n;
      }),
    (te.prototype.readUint8 = te.prototype.readUInt8 =
      function (t, e) {
        return (t >>>= 0), e || td(t, 1, this.length), this[t];
      }),
    (te.prototype.readUint16LE = te.prototype.readUInt16LE =
      function (t, e) {
        return (
          (t >>>= 0), e || td(t, 2, this.length), this[t] | (this[t + 1] << 8)
        );
      }),
    (te.prototype.readUint16BE = te.prototype.readUInt16BE =
      function (t, e) {
        return (
          (t >>>= 0), e || td(t, 2, this.length), (this[t] << 8) | this[t + 1]
        );
      }),
    (te.prototype.readUint32LE = te.prototype.readUInt32LE =
      function (t, e) {
        return (
          (t >>>= 0),
          e || td(t, 4, this.length),
          (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
            16777216 * this[t + 3]
        );
      }),
    (te.prototype.readUint32BE = te.prototype.readUInt32BE =
      function (t, e) {
        return (
          (t >>>= 0),
          e || td(t, 4, this.length),
          16777216 * this[t] +
            ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
        );
      }),
    (te.prototype.readBigUInt64LE = t_(function (t) {
      tR((t >>>= 0), 'offset');
      let e = this[t],
        r = this[t + 7];
      (void 0 === e || void 0 === r) && tS(t, this.length - 8);
      let n = e + 256 * this[++t] + 65536 * this[++t] + 16777216 * this[++t],
        o = this[++t] + 256 * this[++t] + 65536 * this[++t] + 16777216 * r;
      return BigInt(n) + (BigInt(o) << BigInt(32));
    })),
    (te.prototype.readBigUInt64BE = t_(function (t) {
      tR((t >>>= 0), 'offset');
      let e = this[t],
        r = this[t + 7];
      (void 0 === e || void 0 === r) && tS(t, this.length - 8);
      let n = 16777216 * e + 65536 * this[++t] + 256 * this[++t] + this[++t],
        o = 16777216 * this[++t] + 65536 * this[++t] + 256 * this[++t] + r;
      return (BigInt(n) << BigInt(32)) + BigInt(o);
    })),
    (te.prototype.readIntLE = function (t, e, r) {
      (t >>>= 0), (e >>>= 0), r || td(t, e, this.length);
      let n = this[t],
        o = 1,
        i = 0;
      for (; ++i < e && (o *= 256); ) n += this[t + i] * o;
      return n >= (o *= 128) && (n -= Math.pow(2, 8 * e)), n;
    }),
    (te.prototype.readIntBE = function (t, e, r) {
      (t >>>= 0), (e >>>= 0), r || td(t, e, this.length);
      let n = e,
        o = 1,
        i = this[t + --n];
      for (; n > 0 && (o *= 256); ) i += this[t + --n] * o;
      return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)), i;
    }),
    (te.prototype.readInt8 = function (t, e) {
      return ((t >>>= 0), e || td(t, 1, this.length), 128 & this[t])
        ? -((255 - this[t] + 1) * 1)
        : this[t];
    }),
    (te.prototype.readInt16LE = function (t, e) {
      (t >>>= 0), e || td(t, 2, this.length);
      let r = this[t] | (this[t + 1] << 8);
      return 32768 & r ? 4294901760 | r : r;
    }),
    (te.prototype.readInt16BE = function (t, e) {
      (t >>>= 0), e || td(t, 2, this.length);
      let r = this[t + 1] | (this[t] << 8);
      return 32768 & r ? 4294901760 | r : r;
    }),
    (te.prototype.readInt32LE = function (t, e) {
      return (
        (t >>>= 0),
        e || td(t, 4, this.length),
        this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
      );
    }),
    (te.prototype.readInt32BE = function (t, e) {
      return (
        (t >>>= 0),
        e || td(t, 4, this.length),
        (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
      );
    }),
    (te.prototype.readBigInt64LE = t_(function (t) {
      tR((t >>>= 0), 'offset');
      let e = this[t],
        r = this[t + 7];
      return (
        (void 0 === e || void 0 === r) && tS(t, this.length - 8),
        (BigInt(
          this[t + 4] + 256 * this[t + 5] + 65536 * this[t + 6] + (r << 24),
        ) <<
          BigInt(32)) +
          BigInt(e + 256 * this[++t] + 65536 * this[++t] + 16777216 * this[++t])
      );
    })),
    (te.prototype.readBigInt64BE = t_(function (t) {
      tR((t >>>= 0), 'offset');
      let e = this[t],
        r = this[t + 7];
      return (
        (void 0 === e || void 0 === r) && tS(t, this.length - 8),
        (BigInt((e << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t]) <<
          BigInt(32)) +
          BigInt(16777216 * this[++t] + 65536 * this[++t] + 256 * this[++t] + r)
      );
    })),
    (te.prototype.readFloatLE = function (t, e) {
      return (t >>>= 0), e || td(t, 4, this.length), i(this, t, !0, 23, 4);
    }),
    (te.prototype.readFloatBE = function (t, e) {
      return (t >>>= 0), e || td(t, 4, this.length), i(this, t, !1, 23, 4);
    }),
    (te.prototype.readDoubleLE = function (t, e) {
      return (t >>>= 0), e || td(t, 8, this.length), i(this, t, !0, 52, 8);
    }),
    (te.prototype.readDoubleBE = function (t, e) {
      return (t >>>= 0), e || td(t, 8, this.length), i(this, t, !1, 52, 8);
    }),
    (te.prototype.writeUintLE = te.prototype.writeUIntLE =
      function (t, e, r, n) {
        if (((t = +t), (e >>>= 0), (r >>>= 0), !n)) {
          let n = Math.pow(2, 8 * r) - 1;
          ty(this, t, e, r, n, 0);
        }
        let o = 1,
          i = 0;
        for (this[e] = 255 & t; ++i < r && (o *= 256); )
          this[e + i] = (t / o) & 255;
        return e + r;
      }),
    (te.prototype.writeUintBE = te.prototype.writeUIntBE =
      function (t, e, r, n) {
        if (((t = +t), (e >>>= 0), (r >>>= 0), !n)) {
          let n = Math.pow(2, 8 * r) - 1;
          ty(this, t, e, r, n, 0);
        }
        let o = r - 1,
          i = 1;
        for (this[e + o] = 255 & t; --o >= 0 && (i *= 256); )
          this[e + o] = (t / i) & 255;
        return e + r;
      }),
    (te.prototype.writeUint8 = te.prototype.writeUInt8 =
      function (t, e, r) {
        return (
          (t = +t),
          (e >>>= 0),
          r || ty(this, t, e, 1, 255, 0),
          (this[e] = 255 & t),
          e + 1
        );
      }),
    (te.prototype.writeUint16LE = te.prototype.writeUInt16LE =
      function (t, e, r) {
        return (
          (t = +t),
          (e >>>= 0),
          r || ty(this, t, e, 2, 65535, 0),
          (this[e] = 255 & t),
          (this[e + 1] = t >>> 8),
          e + 2
        );
      }),
    (te.prototype.writeUint16BE = te.prototype.writeUInt16BE =
      function (t, e, r) {
        return (
          (t = +t),
          (e >>>= 0),
          r || ty(this, t, e, 2, 65535, 0),
          (this[e] = t >>> 8),
          (this[e + 1] = 255 & t),
          e + 2
        );
      }),
    (te.prototype.writeUint32LE = te.prototype.writeUInt32LE =
      function (t, e, r) {
        return (
          (t = +t),
          (e >>>= 0),
          r || ty(this, t, e, 4, 4294967295, 0),
          (this[e + 3] = t >>> 24),
          (this[e + 2] = t >>> 16),
          (this[e + 1] = t >>> 8),
          (this[e] = 255 & t),
          e + 4
        );
      }),
    (te.prototype.writeUint32BE = te.prototype.writeUInt32BE =
      function (t, e, r) {
        return (
          (t = +t),
          (e >>>= 0),
          r || ty(this, t, e, 4, 4294967295, 0),
          (this[e] = t >>> 24),
          (this[e + 1] = t >>> 16),
          (this[e + 2] = t >>> 8),
          (this[e + 3] = 255 & t),
          e + 4
        );
      }),
    (te.prototype.writeBigUInt64LE = t_(function (t, e = 0) {
      return tg(this, t, e, BigInt(0), BigInt('0xffffffffffffffff'));
    })),
    (te.prototype.writeBigUInt64BE = t_(function (t, e = 0) {
      return tm(this, t, e, BigInt(0), BigInt('0xffffffffffffffff'));
    })),
    (te.prototype.writeIntLE = function (t, e, r, n) {
      if (((t = +t), (e >>>= 0), !n)) {
        let n = Math.pow(2, 8 * r - 1);
        ty(this, t, e, r, n - 1, -n);
      }
      let o = 0,
        i = 1,
        s = 0;
      for (this[e] = 255 & t; ++o < r && (i *= 256); )
        t < 0 && 0 === s && 0 !== this[e + o - 1] && (s = 1),
          (this[e + o] = (((t / i) >> 0) - s) & 255);
      return e + r;
    }),
    (te.prototype.writeIntBE = function (t, e, r, n) {
      if (((t = +t), (e >>>= 0), !n)) {
        let n = Math.pow(2, 8 * r - 1);
        ty(this, t, e, r, n - 1, -n);
      }
      let o = r - 1,
        i = 1,
        s = 0;
      for (this[e + o] = 255 & t; --o >= 0 && (i *= 256); )
        t < 0 && 0 === s && 0 !== this[e + o + 1] && (s = 1),
          (this[e + o] = (((t / i) >> 0) - s) & 255);
      return e + r;
    }),
    (te.prototype.writeInt8 = function (t, e, r) {
      return (
        (t = +t),
        (e >>>= 0),
        r || ty(this, t, e, 1, 127, -128),
        t < 0 && (t = 255 + t + 1),
        (this[e] = 255 & t),
        e + 1
      );
    }),
    (te.prototype.writeInt16LE = function (t, e, r) {
      return (
        (t = +t),
        (e >>>= 0),
        r || ty(this, t, e, 2, 32767, -32768),
        (this[e] = 255 & t),
        (this[e + 1] = t >>> 8),
        e + 2
      );
    }),
    (te.prototype.writeInt16BE = function (t, e, r) {
      return (
        (t = +t),
        (e >>>= 0),
        r || ty(this, t, e, 2, 32767, -32768),
        (this[e] = t >>> 8),
        (this[e + 1] = 255 & t),
        e + 2
      );
    }),
    (te.prototype.writeInt32LE = function (t, e, r) {
      return (
        (t = +t),
        (e >>>= 0),
        r || ty(this, t, e, 4, 2147483647, -2147483648),
        (this[e] = 255 & t),
        (this[e + 1] = t >>> 8),
        (this[e + 2] = t >>> 16),
        (this[e + 3] = t >>> 24),
        e + 4
      );
    }),
    (te.prototype.writeInt32BE = function (t, e, r) {
      return (
        (t = +t),
        (e >>>= 0),
        r || ty(this, t, e, 4, 2147483647, -2147483648),
        t < 0 && (t = 4294967295 + t + 1),
        (this[e] = t >>> 24),
        (this[e + 1] = t >>> 16),
        (this[e + 2] = t >>> 8),
        (this[e + 3] = 255 & t),
        e + 4
      );
    }),
    (te.prototype.writeBigInt64LE = t_(function (t, e = 0) {
      return tg(
        this,
        t,
        e,
        -BigInt('0x8000000000000000'),
        BigInt('0x7fffffffffffffff'),
      );
    })),
    (te.prototype.writeBigInt64BE = t_(function (t, e = 0) {
      return tm(
        this,
        t,
        e,
        -BigInt('0x8000000000000000'),
        BigInt('0x7fffffffffffffff'),
      );
    })),
    (te.prototype.writeFloatLE = function (t, e, r) {
      return tw(this, t, e, !0, r);
    }),
    (te.prototype.writeFloatBE = function (t, e, r) {
      return tw(this, t, e, !1, r);
    }),
    (te.prototype.writeDoubleLE = function (t, e, r) {
      return tE(this, t, e, !0, r);
    }),
    (te.prototype.writeDoubleBE = function (t, e, r) {
      return tE(this, t, e, !1, r);
    }),
    (te.prototype.copy = function (t, e, r, n) {
      if (!te.isBuffer(t)) throw TypeError('argument should be a Buffer');
      if (
        (r || (r = 0),
        n || 0 === n || (n = this.length),
        e >= t.length && (e = t.length),
        e || (e = 0),
        n > 0 && n < r && (n = r),
        n === r || 0 === t.length || 0 === this.length)
      )
        return 0;
      if (e < 0) throw RangeError('targetStart out of bounds');
      if (r < 0 || r >= this.length) throw RangeError('Index out of range');
      if (n < 0) throw RangeError('sourceEnd out of bounds');
      n > this.length && (n = this.length),
        t.length - e < n - r && (n = t.length - e + r);
      let o = n - r;
      return (
        this === t && 'function' == typeof Uint8Array.prototype.copyWithin
          ? this.copyWithin(e, r, n)
          : Uint8Array.prototype.set.call(t, this.subarray(r, n), e),
        o
      );
    }),
    (te.prototype.fill = function (t, e, r, n) {
      let o;
      if ('string' == typeof t) {
        if (
          ('string' == typeof e
            ? ((n = e), (e = 0), (r = this.length))
            : 'string' == typeof r && ((n = r), (r = this.length)),
          void 0 !== n && 'string' != typeof n)
        )
          throw TypeError('encoding must be a string');
        if ('string' == typeof n && !te.isEncoding(n))
          throw TypeError('Unknown encoding: ' + n);
        if (1 === t.length) {
          let e = t.charCodeAt(0);
          (('utf8' === n && e < 128) || 'latin1' === n) && (t = e);
        }
      } else
        'number' == typeof t
          ? (t &= 255)
          : 'boolean' == typeof t && (t = Number(t));
      if (e < 0 || this.length < e || this.length < r)
        throw RangeError('Out of range index');
      if (r <= e) return this;
      if (
        ((e >>>= 0),
        (r = void 0 === r ? this.length : r >>> 0),
        t || (t = 0),
        'number' == typeof t)
      )
        for (o = e; o < r; ++o) this[o] = t;
      else {
        let i = te.isBuffer(t) ? t : te.from(t, n),
          s = i.length;
        if (0 === s)
          throw TypeError(
            'The value "' + t + '" is invalid for argument "value"',
          );
        for (o = 0; o < r - e; ++o) this[o + e] = i[o % s];
      }
      return this;
    });
  let tv = {};
  function tO(t, e, r) {
    tv[t] = class extends r {
      constructor() {
        super(),
          Object.defineProperty(this, 'message', {
            value: e.apply(this, arguments),
            writable: !0,
            configurable: !0,
          }),
          (this.name = `${this.name} [${t}]`),
          this.stack,
          delete this.name;
      }
      get code() {
        return t;
      }
      set code(t) {
        Object.defineProperty(this, 'code', {
          configurable: !0,
          enumerable: !0,
          value: t,
          writable: !0,
        });
      }
      toString() {
        return `${this.name} [${t}]: ${this.message}`;
      }
    };
  }
  function tA(t) {
    let e = '',
      r = t.length,
      n = '-' === t[0] ? 1 : 0;
    for (; r >= n + 4; r -= 3) e = `_${t.slice(r - 3, r)}${e}`;
    return `${t.slice(0, r)}${e}`;
  }
  function tB(t, e, r, n, o, i) {
    if (t > r || t < e) {
      let n;
      let o = 'bigint' == typeof e ? 'n' : '';
      throw (
        ((n =
          i > 3
            ? 0 === e || e === BigInt(0)
              ? `>= 0${o} and < 2${o} ** ${(i + 1) * 8}${o}`
              : `>= -(2${o} ** ${(i + 1) * 8 - 1}${o}) and < 2 ** ${(i + 1) * 8 - 1}${o}`
            : `>= ${e}${o} and <= ${r}${o}`),
        new tv.ERR_OUT_OF_RANGE('value', n, t))
      );
    }
    tR(o, 'offset'),
      (void 0 === n[o] || void 0 === n[o + i]) && tS(o, n.length - (i + 1));
  }
  function tR(t, e) {
    if ('number' != typeof t) throw new tv.ERR_INVALID_ARG_TYPE(e, 'number', t);
  }
  function tS(t, e, r) {
    if (Math.floor(t) !== t)
      throw (tR(t, r), new tv.ERR_OUT_OF_RANGE(r || 'offset', 'an integer', t));
    if (e < 0) throw new tv.ERR_BUFFER_OUT_OF_BOUNDS();
    throw new tv.ERR_OUT_OF_RANGE(
      r || 'offset',
      `>= ${r ? 1 : 0} and <= ${e}`,
      t,
    );
  }
  tO(
    'ERR_BUFFER_OUT_OF_BOUNDS',
    function (t) {
      return t
        ? `${t} is outside of buffer bounds`
        : 'Attempt to access memory outside buffer bounds';
    },
    RangeError,
  ),
    tO(
      'ERR_INVALID_ARG_TYPE',
      function (t, e) {
        return `The "${t}" argument must be of type number. Received type ${typeof e}`;
      },
      TypeError,
    ),
    tO(
      'ERR_OUT_OF_RANGE',
      function (t, e, r) {
        let n = `The value of "${t}" is out of range.`,
          o = r;
        return (
          Number.isInteger(r) && Math.abs(r) > 4294967296
            ? (o = tA(String(r)))
            : 'bigint' == typeof r &&
              ((o = String(r)),
              (r > BigInt(2) ** BigInt(32) || r < -(BigInt(2) ** BigInt(32))) &&
                (o = tA(o)),
              (o += 'n')),
          (n += ` It must be ${e}. Received ${o}`)
        );
      },
      RangeError,
    );
  let tT = /[^+/0-9A-Za-z-_]/g;
  function tL(t, e) {
    let r;
    e = e || 1 / 0;
    let n = t.length,
      o = null,
      i = [];
    for (let s = 0; s < n; ++s) {
      if ((r = t.charCodeAt(s)) > 55295 && r < 57344) {
        if (!o) {
          if (r > 56319 || s + 1 === n) {
            (e -= 3) > -1 && i.push(239, 191, 189);
            continue;
          }
          o = r;
          continue;
        }
        if (r < 56320) {
          (e -= 3) > -1 && i.push(239, 191, 189), (o = r);
          continue;
        }
        r = (((o - 55296) << 10) | (r - 56320)) + 65536;
      } else o && (e -= 3) > -1 && i.push(239, 191, 189);
      if (((o = null), r < 128)) {
        if ((e -= 1) < 0) break;
        i.push(r);
      } else if (r < 2048) {
        if ((e -= 2) < 0) break;
        i.push((r >> 6) | 192, (63 & r) | 128);
      } else if (r < 65536) {
        if ((e -= 3) < 0) break;
        i.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
      } else if (r < 1114112) {
        if ((e -= 4) < 0) break;
        i.push(
          (r >> 18) | 240,
          ((r >> 12) & 63) | 128,
          ((r >> 6) & 63) | 128,
          (63 & r) | 128,
        );
      } else throw Error('Invalid code point');
    }
    return i;
  }
  function tU(t) {
    return n(
      (function (t) {
        if ((t = (t = t.split('=')[0]).trim().replace(tT, '')).length < 2)
          return '';
        for (; t.length % 4 != 0; ) t += '=';
        return t;
      })(t),
    );
  }
  function tx(t, e, r, n) {
    let o;
    for (o = 0; o < n && !(o + r >= e.length) && !(o >= t.length); ++o)
      e[o + r] = t[o];
    return o;
  }
  function tI(t, e) {
    return (
      t instanceof e ||
      (null != t &&
        null != t.constructor &&
        null != t.constructor.name &&
        t.constructor.name === e.name)
    );
  }
  let tC = (function () {
    let t = '0123456789abcdef',
      e = Array(256);
    for (let r = 0; r < 16; ++r) {
      let n = 16 * r;
      for (let o = 0; o < 16; ++o) e[n + o] = t[r] + t[o];
    }
    return e;
  })();
  function t_(t) {
    return 'undefined' == typeof BigInt ? tN : t;
  }
  function tN() {
    throw Error('BigInt not supported');
  }
  function tj(t) {
    return z.isPlainObject(t) || z.isArray(t);
  }
  function tP(t) {
    return z.endsWith(t, '[]') ? t.slice(0, -2) : t;
  }
  function tk(t, e, r) {
    return t
      ? t
          .concat(e)
          .map(function (t, e) {
            return (t = tP(t)), !r && e ? '[' + t + ']' : t;
          })
          .join(r ? '.' : '')
      : e;
  }
  let tF = z.toFlatObject(z, {}, null, function (t) {
    return /^is[A-Z]/.test(t);
  });
  var tD = function (t, e, r) {
    if (!z.isObject(t)) throw TypeError('target must be an object');
    e = e || new FormData();
    let n = (r = z.toFlatObject(
        r,
        { metaTokens: !0, dots: !1, indexes: !1 },
        !1,
        function (t, e) {
          return !z.isUndefined(e[t]);
        },
      )).metaTokens,
      o = r.visitor || l,
      i = r.dots,
      s = r.indexes,
      a =
        (r.Blob || ('undefined' != typeof Blob && Blob)) &&
        z.isSpecCompliantForm(e);
    if (!z.isFunction(o)) throw TypeError('visitor must be a function');
    function u(t) {
      if (null === t) return '';
      if (z.isDate(t)) return t.toISOString();
      if (!a && z.isBlob(t))
        throw new H('Blob is not supported. Use a Buffer instead.');
      return z.isArrayBuffer(t) || z.isTypedArray(t)
        ? a && 'function' == typeof Blob
          ? new Blob([t])
          : te.from(t)
        : t;
    }
    function l(t, r, o) {
      let a = t;
      if (t && !o && 'object' == typeof t) {
        if (z.endsWith(r, '{}'))
          (r = n ? r : r.slice(0, -2)), (t = JSON.stringify(t));
        else {
          var l;
          if (
            (z.isArray(t) && ((l = t), z.isArray(l) && !l.some(tj))) ||
            ((z.isFileList(t) || z.endsWith(r, '[]')) && (a = z.toArray(t)))
          )
            return (
              (r = tP(r)),
              a.forEach(function (t, n) {
                z.isUndefined(t) ||
                  null === t ||
                  e.append(
                    !0 === s ? tk([r], n, i) : null === s ? r : r + '[]',
                    u(t),
                  );
              }),
              !1
            );
        }
      }
      return !!tj(t) || (e.append(tk(o, r, i), u(t)), !1);
    }
    let f = [],
      c = Object.assign(tF, {
        defaultVisitor: l,
        convertValue: u,
        isVisitable: tj,
      });
    if (!z.isObject(t)) throw TypeError('data must be an object');
    return (
      !(function t(r, n) {
        if (!z.isUndefined(r)) {
          if (-1 !== f.indexOf(r))
            throw Error('Circular reference detected in ' + n.join('.'));
          f.push(r),
            z.forEach(r, function (r, i) {
              !0 ===
                (!(z.isUndefined(r) || null === r) &&
                  o.call(e, r, z.isString(i) ? i.trim() : i, n, c)) &&
                t(r, n ? n.concat(i) : [i]);
            }),
            f.pop();
        }
      })(t),
      e
    );
  };
  function tM(t) {
    let e = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+',
      '%00': '\0',
    };
    return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function (t) {
      return e[t];
    });
  }
  function tq(t, e) {
    (this._pairs = []), t && tD(t, this, e);
  }
  let t$ = tq.prototype;
  function tz(t) {
    return encodeURIComponent(t)
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']');
  }
  function tH(t, e, r) {
    let n;
    if (!e) return t;
    let o = (r && r.encode) || tz,
      i = r && r.serialize;
    if (
      (n = i
        ? i(e, r)
        : z.isURLSearchParams(e)
          ? e.toString()
          : new tq(e, r).toString(o))
    ) {
      let e = t.indexOf('#');
      -1 !== e && (t = t.slice(0, e)),
        (t += (-1 === t.indexOf('?') ? '?' : '&') + n);
    }
    return t;
  }
  (t$.append = function (t, e) {
    this._pairs.push([t, e]);
  }),
    (t$.toString = function (t) {
      let e = t
        ? function (e) {
            return t.call(this, e, tM);
          }
        : tM;
      return this._pairs
        .map(function (t) {
          return e(t[0]) + '=' + e(t[1]);
        }, '')
        .join('&');
    });
  var tG = class {
      constructor() {
        this.handlers = [];
      }
      use(t, e, r) {
        return (
          this.handlers.push({
            fulfilled: t,
            rejected: e,
            synchronous: !!r && r.synchronous,
            runWhen: r ? r.runWhen : null,
          }),
          this.handlers.length - 1
        );
      }
      eject(t) {
        this.handlers[t] && (this.handlers[t] = null);
      }
      clear() {
        this.handlers && (this.handlers = []);
      }
      forEach(t) {
        z.forEach(this.handlers, function (e) {
          null !== e && t(e);
        });
      }
    },
    tJ = {
      silentJSONParsing: !0,
      forcedJSONParsing: !0,
      clarifyTimeoutError: !1,
    },
    tV = 'undefined' != typeof URLSearchParams ? URLSearchParams : tq,
    tW = 'undefined' != typeof FormData ? FormData : null,
    tK = 'undefined' != typeof Blob ? Blob : null,
    tY = {};
  u(tY, 'hasBrowserEnv', function () {
    return tX;
  }),
    u(tY, 'hasStandardBrowserEnv', function () {
      return tZ;
    }),
    u(tY, 'hasStandardBrowserWebWorkerEnv', function () {
      return tQ;
    });
  let tX = 'undefined' != typeof window && 'undefined' != typeof document,
    tZ =
      ((r = 'undefined' != typeof navigator && navigator.product),
      tX && 0 > ['ReactNative', 'NativeScript', 'NS'].indexOf(r)),
    tQ =
      'undefined' != typeof WorkerGlobalScope &&
      self instanceof WorkerGlobalScope &&
      'function' == typeof self.importScripts;
  var t0 = {
      ...tY,
      isBrowser: !0,
      classes: { URLSearchParams: tV, FormData: tW, Blob: tK },
      protocols: ['http', 'https', 'file', 'blob', 'url', 'data'],
    },
    t1 = function (t) {
      if (z.isFormData(t) && z.isFunction(t.entries)) {
        let e = {};
        return (
          z.forEachEntry(t, (t, r) => {
            !(function t(e, r, n, o) {
              let i = e[o++];
              if ('__proto__' === i) return !0;
              let s = Number.isFinite(+i),
                a = o >= e.length;
              return (
                ((i = !i && z.isArray(n) ? n.length : i), a)
                  ? z.hasOwnProp(n, i)
                    ? (n[i] = [n[i], r])
                    : (n[i] = r)
                  : ((n[i] && z.isObject(n[i])) || (n[i] = []),
                    t(e, r, n[i], o) &&
                      z.isArray(n[i]) &&
                      (n[i] = (function (t) {
                        let e, r;
                        let n = {},
                          o = Object.keys(t),
                          i = o.length;
                        for (e = 0; e < i; e++) n[(r = o[e])] = t[r];
                        return n;
                      })(n[i]))),
                !s
              );
            })(
              z
                .matchAll(/\w+|\[(\w*)]/g, t)
                .map((t) => ('[]' === t[0] ? '' : t[1] || t[0])),
              r,
              e,
              0,
            );
          }),
          e
        );
      }
      return null;
    };
  let t2 = {
    transitional: tJ,
    adapter: ['xhr', 'http'],
    transformRequest: [
      function (t, e) {
        let r;
        let n = e.getContentType() || '',
          o = n.indexOf('application/json') > -1,
          i = z.isObject(t);
        if ((i && z.isHTMLForm(t) && (t = new FormData(t)), z.isFormData(t)))
          return o ? JSON.stringify(t1(t)) : t;
        if (
          z.isArrayBuffer(t) ||
          z.isBuffer(t) ||
          z.isStream(t) ||
          z.isFile(t) ||
          z.isBlob(t)
        )
          return t;
        if (z.isArrayBufferView(t)) return t.buffer;
        if (z.isURLSearchParams(t))
          return (
            e.setContentType(
              'application/x-www-form-urlencoded;charset=utf-8',
              !1,
            ),
            t.toString()
          );
        if (i) {
          if (n.indexOf('application/x-www-form-urlencoded') > -1) {
            var s, a;
            return ((s = t),
            (a = this.formSerializer),
            tD(
              s,
              new t0.classes.URLSearchParams(),
              Object.assign(
                {
                  visitor: function (t, e, r, n) {
                    return t0.isNode && z.isBuffer(t)
                      ? (this.append(e, t.toString('base64')), !1)
                      : n.defaultVisitor.apply(this, arguments);
                  },
                },
                a,
              ),
            )).toString();
          }
          if ((r = z.isFileList(t)) || n.indexOf('multipart/form-data') > -1) {
            let e = this.env && this.env.FormData;
            return tD(
              r ? { 'files[]': t } : t,
              e && new e(),
              this.formSerializer,
            );
          }
        }
        return i || o
          ? (e.setContentType('application/json', !1),
            (function (t, e, r) {
              if (z.isString(t))
                try {
                  return (0, JSON.parse)(t), z.trim(t);
                } catch (t) {
                  if ('SyntaxError' !== t.name) throw t;
                }
              return (0, JSON.stringify)(t);
            })(t))
          : t;
      },
    ],
    transformResponse: [
      function (t) {
        let e = this.transitional || t2.transitional,
          r = e && e.forcedJSONParsing,
          n = 'json' === this.responseType;
        if (t && z.isString(t) && ((r && !this.responseType) || n)) {
          let r = e && e.silentJSONParsing;
          try {
            return JSON.parse(t);
          } catch (t) {
            if (!r && n) {
              if ('SyntaxError' === t.name)
                throw H.from(t, H.ERR_BAD_RESPONSE, this, null, this.response);
              throw t;
            }
          }
        }
        return t;
      },
    ],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: { FormData: t0.classes.FormData, Blob: t0.classes.Blob },
    validateStatus: function (t) {
      return t >= 200 && t < 300;
    },
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': void 0,
      },
    },
  };
  z.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (t) => {
    t2.headers[t] = {};
  });
  let t6 = z.toObjectSet([
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent',
  ]);
  var t5 = (t) => {
    let e, r, n;
    let o = {};
    return (
      t &&
        t.split('\n').forEach(function (t) {
          (n = t.indexOf(':')),
            (e = t.substring(0, n).trim().toLowerCase()),
            (r = t.substring(n + 1).trim()),
            !e ||
              (o[e] && t6[e]) ||
              ('set-cookie' === e
                ? o[e]
                  ? o[e].push(r)
                  : (o[e] = [r])
                : (o[e] = o[e] ? o[e] + ', ' + r : r));
        }),
      o
    );
  };
  let t8 = Symbol('internals');
  function t4(t) {
    return t && String(t).trim().toLowerCase();
  }
  function t3(t) {
    return !1 === t || null == t ? t : z.isArray(t) ? t.map(t3) : String(t);
  }
  let t7 = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
  function t9(t, e, r, n, o) {
    if (z.isFunction(n)) return n.call(this, e, r);
    if ((o && (e = r), z.isString(e))) {
      if (z.isString(n)) return -1 !== e.indexOf(n);
      if (z.isRegExp(n)) return n.test(e);
    }
  }
  class et {
    constructor(t) {
      t && this.set(t);
    }
    set(t, e, r) {
      let n = this;
      function o(t, e, r) {
        let o = t4(e);
        if (!o) throw Error('header name must be a non-empty string');
        let i = z.findKey(n, o);
        (i && void 0 !== n[i] && !0 !== r && (void 0 !== r || !1 === n[i])) ||
          (n[i || e] = t3(t));
      }
      let i = (t, e) => z.forEach(t, (t, r) => o(t, r, e));
      return (
        z.isPlainObject(t) || t instanceof this.constructor
          ? i(t, e)
          : z.isString(t) && (t = t.trim()) && !t7(t)
            ? i(t5(t), e)
            : null != t && o(e, t, r),
        this
      );
    }
    get(t, e) {
      if ((t = t4(t))) {
        let r = z.findKey(this, t);
        if (r) {
          let t = this[r];
          if (!e) return t;
          if (!0 === e)
            return (function (t) {
              let e;
              let r = Object.create(null),
                n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
              for (; (e = n.exec(t)); ) r[e[1]] = e[2];
              return r;
            })(t);
          if (z.isFunction(e)) return e.call(this, t, r);
          if (z.isRegExp(e)) return e.exec(t);
          throw TypeError('parser must be boolean|regexp|function');
        }
      }
    }
    has(t, e) {
      if ((t = t4(t))) {
        let r = z.findKey(this, t);
        return !!(r && void 0 !== this[r] && (!e || t9(this, this[r], r, e)));
      }
      return !1;
    }
    delete(t, e) {
      let r = this,
        n = !1;
      function o(t) {
        if ((t = t4(t))) {
          let o = z.findKey(r, t);
          o && (!e || t9(r, r[o], o, e)) && (delete r[o], (n = !0));
        }
      }
      return z.isArray(t) ? t.forEach(o) : o(t), n;
    }
    clear(t) {
      let e = Object.keys(this),
        r = e.length,
        n = !1;
      for (; r--; ) {
        let o = e[r];
        (!t || t9(this, this[o], o, t, !0)) && (delete this[o], (n = !0));
      }
      return n;
    }
    normalize(t) {
      let e = this,
        r = {};
      return (
        z.forEach(this, (n, o) => {
          let i = z.findKey(r, o);
          if (i) {
            (e[i] = t3(n)), delete e[o];
            return;
          }
          let s = t
            ? o
                .trim()
                .toLowerCase()
                .replace(/([a-z\d])(\w*)/g, (t, e, r) => e.toUpperCase() + r)
            : String(o).trim();
          s !== o && delete e[o], (e[s] = t3(n)), (r[s] = !0);
        }),
        this
      );
    }
    concat(...t) {
      return this.constructor.concat(this, ...t);
    }
    toJSON(t) {
      let e = Object.create(null);
      return (
        z.forEach(this, (r, n) => {
          null != r &&
            !1 !== r &&
            (e[n] = t && z.isArray(r) ? r.join(', ') : r);
        }),
        e
      );
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON())
        .map(([t, e]) => t + ': ' + e)
        .join('\n');
    }
    get [Symbol.toStringTag]() {
      return 'AxiosHeaders';
    }
    static from(t) {
      return t instanceof this ? t : new this(t);
    }
    static concat(t, ...e) {
      let r = new this(t);
      return e.forEach((t) => r.set(t)), r;
    }
    static accessor(t) {
      let e = (this[t8] = this[t8] = { accessors: {} }).accessors,
        r = this.prototype;
      function n(t) {
        let n = t4(t);
        e[n] ||
          (!(function (t, e) {
            let r = z.toCamelCase(' ' + e);
            ['get', 'set', 'has'].forEach((n) => {
              Object.defineProperty(t, n + r, {
                value: function (t, r, o) {
                  return this[n].call(this, e, t, r, o);
                },
                configurable: !0,
              });
            });
          })(r, t),
          (e[n] = !0));
      }
      return z.isArray(t) ? t.forEach(n) : n(t), this;
    }
  }
  function ee(t, e) {
    let r = this || t2,
      n = e || r,
      o = et.from(n.headers),
      i = n.data;
    return (
      z.forEach(t, function (t) {
        i = t.call(r, i, o.normalize(), e ? e.status : void 0);
      }),
      o.normalize(),
      i
    );
  }
  function er(t) {
    return !!(t && t.__CANCEL__);
  }
  function en(t, e, r) {
    H.call(this, null == t ? 'canceled' : t, H.ERR_CANCELED, e, r),
      (this.name = 'CanceledError');
  }
  et.accessor([
    'Content-Type',
    'Content-Length',
    'Accept',
    'Accept-Encoding',
    'User-Agent',
    'Authorization',
  ]),
    z.reduceDescriptors(et.prototype, ({ value: t }, e) => {
      let r = e[0].toUpperCase() + e.slice(1);
      return {
        get: () => t,
        set(t) {
          this[r] = t;
        },
      };
    }),
    z.freezeMethods(et),
    z.inherits(en, H, { __CANCEL__: !0 });
  var eo = t0.hasStandardBrowserEnv
    ? {
        write(t, e, r, n, o, i) {
          let s = [t + '=' + encodeURIComponent(e)];
          z.isNumber(r) && s.push('expires=' + new Date(r).toGMTString()),
            z.isString(n) && s.push('path=' + n),
            z.isString(o) && s.push('domain=' + o),
            !0 === i && s.push('secure'),
            (document.cookie = s.join('; '));
        },
        read(t) {
          let e = document.cookie.match(RegExp('(^|;\\s*)(' + t + ')=([^;]*)'));
          return e ? decodeURIComponent(e[3]) : null;
        },
        remove(t) {
          this.write(t, '', Date.now() - 864e5);
        },
      }
    : { write() {}, read: () => null, remove() {} };
  function ei(t, e) {
    return t && !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
      ? e
        ? t.replace(/\/?\/$/, '') + '/' + e.replace(/^\/+/, '')
        : t
      : e;
  }
  var es = t0.hasStandardBrowserEnv
      ? (function () {
          let t;
          let e = /(msie|trident)/i.test(navigator.userAgent),
            r = document.createElement('a');
          function n(t) {
            let n = t;
            return (
              e && (r.setAttribute('href', n), (n = r.href)),
              r.setAttribute('href', n),
              {
                href: r.href,
                protocol: r.protocol ? r.protocol.replace(/:$/, '') : '',
                host: r.host,
                search: r.search ? r.search.replace(/^\?/, '') : '',
                hash: r.hash ? r.hash.replace(/^#/, '') : '',
                hostname: r.hostname,
                port: r.port,
                pathname:
                  '/' === r.pathname.charAt(0) ? r.pathname : '/' + r.pathname,
              }
            );
          }
          return (
            (t = n(window.location.href)),
            function (e) {
              let r = z.isString(e) ? n(e) : e;
              return r.protocol === t.protocol && r.host === t.host;
            }
          );
        })()
      : function () {
          return !0;
        },
    ea = function (t, e) {
      let r;
      let n = Array((t = t || 10)),
        o = Array(t),
        i = 0,
        s = 0;
      return (
        (e = void 0 !== e ? e : 1e3),
        function (a) {
          let u = Date.now(),
            l = o[s];
          r || (r = u), (n[i] = a), (o[i] = u);
          let f = s,
            c = 0;
          for (; f !== i; ) (c += n[f++]), (f %= t);
          if (((i = (i + 1) % t) === s && (s = (s + 1) % t), u - r < e)) return;
          let h = l && u - l;
          return h ? Math.round((1e3 * c) / h) : void 0;
        }
      );
    };
  function eu(t, e) {
    let r = 0,
      n = ea(50, 250);
    return (o) => {
      let i = o.loaded,
        s = o.lengthComputable ? o.total : void 0,
        a = i - r,
        u = n(a);
      r = i;
      let l = {
        loaded: i,
        total: s,
        progress: s ? i / s : void 0,
        bytes: a,
        rate: u || void 0,
        estimated: u && s && i <= s ? (s - i) / u : void 0,
        event: o,
      };
      (l[e ? 'download' : 'upload'] = !0), t(l);
    };
  }
  let el = {
    http: null,
    xhr:
      'undefined' != typeof XMLHttpRequest &&
      function (t) {
        return new Promise(function (e, r) {
          let n,
            o,
            i = t.data,
            s = et.from(t.headers).normalize(),
            { responseType: a, withXSRFToken: u } = t;
          function l() {
            t.cancelToken && t.cancelToken.unsubscribe(n),
              t.signal && t.signal.removeEventListener('abort', n);
          }
          if (z.isFormData(i)) {
            if (t0.hasStandardBrowserEnv || t0.hasStandardBrowserWebWorkerEnv)
              s.setContentType(!1);
            else if (!1 !== (o = s.getContentType())) {
              let [t, ...e] = o
                ? o
                    .split(';')
                    .map((t) => t.trim())
                    .filter(Boolean)
                : [];
              s.setContentType([t || 'multipart/form-data', ...e].join('; '));
            }
          }
          let f = new XMLHttpRequest();
          if (t.auth) {
            let e = t.auth.username || '',
              r = t.auth.password
                ? unescape(encodeURIComponent(t.auth.password))
                : '';
            s.set('Authorization', 'Basic ' + btoa(e + ':' + r));
          }
          let c = ei(t.baseURL, t.url);
          function h() {
            if (!f) return;
            let n = et.from(
              'getAllResponseHeaders' in f && f.getAllResponseHeaders(),
            );
            !(function (t, e, r) {
              let n = r.config.validateStatus;
              !r.status || !n || n(r.status)
                ? t(r)
                : e(
                    new H(
                      'Request failed with status code ' + r.status,
                      [H.ERR_BAD_REQUEST, H.ERR_BAD_RESPONSE][
                        Math.floor(r.status / 100) - 4
                      ],
                      r.config,
                      r.request,
                      r,
                    ),
                  );
            })(
              function (t) {
                e(t), l();
              },
              function (t) {
                r(t), l();
              },
              {
                data:
                  a && 'text' !== a && 'json' !== a
                    ? f.response
                    : f.responseText,
                status: f.status,
                statusText: f.statusText,
                headers: n,
                config: t,
                request: f,
              },
            ),
              (f = null);
          }
          if (
            (f.open(
              t.method.toUpperCase(),
              tH(c, t.params, t.paramsSerializer),
              !0,
            ),
            (f.timeout = t.timeout),
            'onloadend' in f
              ? (f.onloadend = h)
              : (f.onreadystatechange = function () {
                  f &&
                    4 === f.readyState &&
                    (0 !== f.status ||
                      (f.responseURL &&
                        0 === f.responseURL.indexOf('file:'))) &&
                    setTimeout(h);
                }),
            (f.onabort = function () {
              f &&
                (r(new H('Request aborted', H.ECONNABORTED, t, f)), (f = null));
            }),
            (f.onerror = function () {
              r(new H('Network Error', H.ERR_NETWORK, t, f)), (f = null);
            }),
            (f.ontimeout = function () {
              let e = t.timeout
                  ? 'timeout of ' + t.timeout + 'ms exceeded'
                  : 'timeout exceeded',
                n = t.transitional || tJ;
              t.timeoutErrorMessage && (e = t.timeoutErrorMessage),
                r(
                  new H(
                    e,
                    n.clarifyTimeoutError ? H.ETIMEDOUT : H.ECONNABORTED,
                    t,
                    f,
                  ),
                ),
                (f = null);
            }),
            t0.hasStandardBrowserEnv &&
              (u && z.isFunction(u) && (u = u(t)), u || (!1 !== u && es(c))))
          ) {
            let e =
              t.xsrfHeaderName && t.xsrfCookieName && eo.read(t.xsrfCookieName);
            e && s.set(t.xsrfHeaderName, e);
          }
          void 0 === i && s.setContentType(null),
            'setRequestHeader' in f &&
              z.forEach(s.toJSON(), function (t, e) {
                f.setRequestHeader(e, t);
              }),
            z.isUndefined(t.withCredentials) ||
              (f.withCredentials = !!t.withCredentials),
            a && 'json' !== a && (f.responseType = t.responseType),
            'function' == typeof t.onDownloadProgress &&
              f.addEventListener('progress', eu(t.onDownloadProgress, !0)),
            'function' == typeof t.onUploadProgress &&
              f.upload &&
              f.upload.addEventListener('progress', eu(t.onUploadProgress)),
            (t.cancelToken || t.signal) &&
              ((n = (e) => {
                f &&
                  (r(!e || e.type ? new en(null, t, f) : e),
                  f.abort(),
                  (f = null));
              }),
              t.cancelToken && t.cancelToken.subscribe(n),
              t.signal &&
                (t.signal.aborted
                  ? n()
                  : t.signal.addEventListener('abort', n)));
          let p = (function (t) {
            let e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
            return (e && e[1]) || '';
          })(c);
          if (p && -1 === t0.protocols.indexOf(p)) {
            r(new H('Unsupported protocol ' + p + ':', H.ERR_BAD_REQUEST, t));
            return;
          }
          f.send(i || null);
        });
      },
  };
  z.forEach(el, (t, e) => {
    if (t) {
      try {
        Object.defineProperty(t, 'name', { value: e });
      } catch (t) {}
      Object.defineProperty(t, 'adapterName', { value: e });
    }
  });
  let ef = (t) => `- ${t}`,
    ec = (t) => z.isFunction(t) || null === t || !1 === t;
  var eh = (t) => {
    let e, r;
    let { length: n } = (t = z.isArray(t) ? t : [t]),
      o = {};
    for (let i = 0; i < n; i++) {
      let n;
      if (
        ((r = e = t[i]),
        !ec(e) && void 0 === (r = el[(n = String(e)).toLowerCase()]))
      )
        throw new H(`Unknown adapter '${n}'`);
      if (r) break;
      o[n || '#' + i] = r;
    }
    if (!r) {
      let t = Object.entries(o).map(
        ([t, e]) =>
          `adapter ${t} ` +
          (!1 === e
            ? 'is not supported by the environment'
            : 'is not available in the build'),
      );
      throw new H(
        'There is no suitable adapter to dispatch the request ' +
          (n
            ? t.length > 1
              ? 'since :\n' + t.map(ef).join('\n')
              : ' ' + ef(t[0])
            : 'as no adapter specified'),
        'ERR_NOT_SUPPORT',
      );
    }
    return r;
  };
  function ep(t) {
    if (
      (t.cancelToken && t.cancelToken.throwIfRequested(),
      t.signal && t.signal.aborted)
    )
      throw new en(null, t);
  }
  function ed(t) {
    return (
      ep(t),
      (t.headers = et.from(t.headers)),
      (t.data = ee.call(t, t.transformRequest)),
      -1 !== ['post', 'put', 'patch'].indexOf(t.method) &&
        t.headers.setContentType('application/x-www-form-urlencoded', !1),
      eh(t.adapter || t2.adapter)(t).then(
        function (e) {
          return (
            ep(t),
            (e.data = ee.call(t, t.transformResponse, e)),
            (e.headers = et.from(e.headers)),
            e
          );
        },
        function (e) {
          return (
            !er(e) &&
              (ep(t),
              e &&
                e.response &&
                ((e.response.data = ee.call(
                  t,
                  t.transformResponse,
                  e.response,
                )),
                (e.response.headers = et.from(e.response.headers)))),
            Promise.reject(e)
          );
        },
      )
    );
  }
  let ey = (t) => (t instanceof et ? { ...t } : t);
  function eg(t, e) {
    e = e || {};
    let r = {};
    function n(t, e, r) {
      return z.isPlainObject(t) && z.isPlainObject(e)
        ? z.merge.call({ caseless: r }, t, e)
        : z.isPlainObject(e)
          ? z.merge({}, e)
          : z.isArray(e)
            ? e.slice()
            : e;
    }
    function o(t, e, r) {
      return z.isUndefined(e)
        ? z.isUndefined(t)
          ? void 0
          : n(void 0, t, r)
        : n(t, e, r);
    }
    function i(t, e) {
      if (!z.isUndefined(e)) return n(void 0, e);
    }
    function s(t, e) {
      return z.isUndefined(e)
        ? z.isUndefined(t)
          ? void 0
          : n(void 0, t)
        : n(void 0, e);
    }
    function a(r, o, i) {
      return i in e ? n(r, o) : i in t ? n(void 0, r) : void 0;
    }
    let u = {
      url: i,
      method: i,
      data: i,
      baseURL: s,
      transformRequest: s,
      transformResponse: s,
      paramsSerializer: s,
      timeout: s,
      timeoutMessage: s,
      withCredentials: s,
      withXSRFToken: s,
      adapter: s,
      responseType: s,
      xsrfCookieName: s,
      xsrfHeaderName: s,
      onUploadProgress: s,
      onDownloadProgress: s,
      decompress: s,
      maxContentLength: s,
      maxBodyLength: s,
      beforeRedirect: s,
      transport: s,
      httpAgent: s,
      httpsAgent: s,
      cancelToken: s,
      socketPath: s,
      responseEncoding: s,
      validateStatus: a,
      headers: (t, e) => o(ey(t), ey(e), !0),
    };
    return (
      z.forEach(Object.keys(Object.assign({}, t, e)), function (n) {
        let i = u[n] || o,
          s = i(t[n], e[n], n);
        (z.isUndefined(s) && i !== a) || (r[n] = s);
      }),
      r
    );
  }
  let em = '1.6.8',
    eb = {};
  ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(
    (t, e) => {
      eb[t] = function (r) {
        return typeof r === t || 'a' + (e < 1 ? 'n ' : ' ') + t;
      };
    },
  );
  let ew = {};
  eb.transitional = function (t, e, r) {
    function n(t, e) {
      return (
        '[Axios v' +
        em +
        "] Transitional option '" +
        t +
        "'" +
        e +
        (r ? '. ' + r : '')
      );
    }
    return (r, o, i) => {
      if (!1 === t)
        throw new H(
          n(o, ' has been removed' + (e ? ' in ' + e : '')),
          H.ERR_DEPRECATED,
        );
      return (
        e &&
          !ew[o] &&
          ((ew[o] = !0),
          console.warn(
            n(
              o,
              ' has been deprecated since v' +
                e +
                ' and will be removed in the near future',
            ),
          )),
        !t || t(r, o, i)
      );
    };
  };
  var eE = {
    assertOptions: function (t, e, r) {
      if ('object' != typeof t)
        throw new H('options must be an object', H.ERR_BAD_OPTION_VALUE);
      let n = Object.keys(t),
        o = n.length;
      for (; o-- > 0; ) {
        let i = n[o],
          s = e[i];
        if (s) {
          let e = t[i],
            r = void 0 === e || s(e, i, t);
          if (!0 !== r)
            throw new H(
              'option ' + i + ' must be ' + r,
              H.ERR_BAD_OPTION_VALUE,
            );
          continue;
        }
        if (!0 !== r) throw new H('Unknown option ' + i, H.ERR_BAD_OPTION);
      }
    },
    validators: eb,
  };
  let ev = eE.validators;
  class eO {
    constructor(t) {
      (this.defaults = t),
        (this.interceptors = { request: new tG(), response: new tG() });
    }
    async request(t, e) {
      try {
        return await this._request(t, e);
      } catch (t) {
        if (t instanceof Error) {
          let e;
          Error.captureStackTrace
            ? Error.captureStackTrace((e = {}))
            : (e = Error());
          let r = e.stack ? e.stack.replace(/^.+\n/, '') : '';
          t.stack
            ? r &&
              !String(t.stack).endsWith(r.replace(/^.+\n.+\n/, '')) &&
              (t.stack += '\n' + r)
            : (t.stack = r);
        }
        throw t;
      }
    }
    _request(t, e) {
      let r, n;
      'string' == typeof t ? ((e = e || {}).url = t) : (e = t || {});
      let {
        transitional: o,
        paramsSerializer: i,
        headers: s,
      } = (e = eg(this.defaults, e));
      void 0 !== o &&
        eE.assertOptions(
          o,
          {
            silentJSONParsing: ev.transitional(ev.boolean),
            forcedJSONParsing: ev.transitional(ev.boolean),
            clarifyTimeoutError: ev.transitional(ev.boolean),
          },
          !1,
        ),
        null != i &&
          (z.isFunction(i)
            ? (e.paramsSerializer = { serialize: i })
            : eE.assertOptions(
                i,
                { encode: ev.function, serialize: ev.function },
                !0,
              )),
        (e.method = (e.method || this.defaults.method || 'get').toLowerCase());
      let a = s && z.merge(s.common, s[e.method]);
      s &&
        z.forEach(
          ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
          (t) => {
            delete s[t];
          },
        ),
        (e.headers = et.concat(a, s));
      let u = [],
        l = !0;
      this.interceptors.request.forEach(function (t) {
        ('function' != typeof t.runWhen || !1 !== t.runWhen(e)) &&
          ((l = l && t.synchronous), u.unshift(t.fulfilled, t.rejected));
      });
      let f = [];
      this.interceptors.response.forEach(function (t) {
        f.push(t.fulfilled, t.rejected);
      });
      let c = 0;
      if (!l) {
        let t = [ed.bind(this), void 0];
        for (
          t.unshift.apply(t, u),
            t.push.apply(t, f),
            n = t.length,
            r = Promise.resolve(e);
          c < n;

        )
          r = r.then(t[c++], t[c++]);
        return r;
      }
      n = u.length;
      let h = e;
      for (c = 0; c < n; ) {
        let t = u[c++],
          e = u[c++];
        try {
          h = t(h);
        } catch (t) {
          e.call(this, t);
          break;
        }
      }
      try {
        r = ed.call(this, h);
      } catch (t) {
        return Promise.reject(t);
      }
      for (c = 0, n = f.length; c < n; ) r = r.then(f[c++], f[c++]);
      return r;
    }
    getUri(t) {
      return tH(
        ei((t = eg(this.defaults, t)).baseURL, t.url),
        t.params,
        t.paramsSerializer,
      );
    }
  }
  z.forEach(['delete', 'get', 'head', 'options'], function (t) {
    eO.prototype[t] = function (e, r) {
      return this.request(
        eg(r || {}, { method: t, url: e, data: (r || {}).data }),
      );
    };
  }),
    z.forEach(['post', 'put', 'patch'], function (t) {
      function e(e) {
        return function (r, n, o) {
          return this.request(
            eg(o || {}, {
              method: t,
              headers: e ? { 'Content-Type': 'multipart/form-data' } : {},
              url: r,
              data: n,
            }),
          );
        };
      }
      (eO.prototype[t] = e()), (eO.prototype[t + 'Form'] = e(!0));
    });
  class eA {
    constructor(t) {
      let e;
      if ('function' != typeof t)
        throw TypeError('executor must be a function.');
      this.promise = new Promise(function (t) {
        e = t;
      });
      let r = this;
      this.promise.then((t) => {
        if (!r._listeners) return;
        let e = r._listeners.length;
        for (; e-- > 0; ) r._listeners[e](t);
        r._listeners = null;
      }),
        (this.promise.then = (t) => {
          let e;
          let n = new Promise((t) => {
            r.subscribe(t), (e = t);
          }).then(t);
          return (
            (n.cancel = function () {
              r.unsubscribe(e);
            }),
            n
          );
        }),
        t(function (t, n, o) {
          r.reason || ((r.reason = new en(t, n, o)), e(r.reason));
        });
    }
    throwIfRequested() {
      if (this.reason) throw this.reason;
    }
    subscribe(t) {
      if (this.reason) {
        t(this.reason);
        return;
      }
      this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
    }
    unsubscribe(t) {
      if (!this._listeners) return;
      let e = this._listeners.indexOf(t);
      -1 !== e && this._listeners.splice(e, 1);
    }
    static source() {
      let t;
      return {
        token: new eA(function (e) {
          t = e;
        }),
        cancel: t,
      };
    }
  }
  let eB = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511,
  };
  Object.entries(eB).forEach(([t, e]) => {
    eB[e] = t;
  });
  let eR = (function t(e) {
    let r = new eO(e),
      n = f(eO.prototype.request, r);
    return (
      z.extend(n, eO.prototype, r, { allOwnKeys: !0 }),
      z.extend(n, r, null, { allOwnKeys: !0 }),
      (n.create = function (r) {
        return t(eg(e, r));
      }),
      n
    );
  })(t2);
  (eR.Axios = eO),
    (eR.CanceledError = en),
    (eR.CancelToken = eA),
    (eR.isCancel = er),
    (eR.VERSION = em),
    (eR.toFormData = tD),
    (eR.AxiosError = H),
    (eR.Cancel = eR.CanceledError),
    (eR.all = function (t) {
      return Promise.all(t);
    }),
    (eR.spread = function (t) {
      return function (e) {
        return t.apply(null, e);
      };
    }),
    (eR.isAxiosError = function (t) {
      return z.isObject(t) && !0 === t.isAxiosError;
    }),
    (eR.mergeConfig = eg),
    (eR.AxiosHeaders = et),
    (eR.formToJSON = (t) => t1(z.isHTMLForm(t) ? new FormData(t) : t)),
    (eR.getAdapter = eh),
    (eR.HttpStatusCode = eB),
    (eR.default = eR);
  let {
      Axios: eS,
      AxiosError: eT,
      CanceledError: eL,
      isCancel: eU,
      CancelToken: ex,
      VERSION: eI,
      all: eC,
      Cancel: e_,
      isAxiosError: eN,
      spread: ej,
      toFormData: eP,
      AxiosHeaders: ek,
      HttpStatusCode: eF,
      formToJSON: eD,
      getAdapter: eM,
      mergeConfig: eq,
    } = eR,
    e$ = () => {
      let t = document.querySelector('.alert');
      t && t.parentElement.removeChild(t);
    },
    ez = (t, e) => {
      e$();
      let r = `<div class="alert alert--${t}">${e}</div>`;
      document.querySelector('body').insertAdjacentHTML('afterbegin', r),
        window.setTimeout(e$, 5e3);
    },
    eH = async (t, e) => {
      try {
        await eR({
          method: 'POST',
          url: '/api/v1/users/login',
          data: { email: t, password: e },
        }),
          ez('success', 'login ok'),
          window.setTimeout(() => {
            location.assign('/');
          }, 1500);
      } catch (t) {
        ez('error', t.response.data.message);
      }
    },
    eG = async () => {
      try {
        let t = await eR({ method: 'GET', url: '/api/v1/users/logout' });
        'success' === t.data.status &&
          (ez('success', 'Logged out successfully!'),
          window.setTimeout(() => {
            location.assign('/');
          }, 1500));
      } catch (t) {
        console.log(t.response), ez('error', 'please logout again');
      }
    },
    eJ = async (t, e) => {
      console.log(t, e);
      try {
        let r = await eR({
          method: 'PATCH',
          url: `/api/v1/users/${'user' === e ? 'updateYourData' : 'updateMyPassword'}`,
          data: t,
        });
        'success' === r.data.status &&
          (ez('success', 'update successfully '),
          window.setTimeout(() => {
            location.reload(!0);
          }, 100));
      } catch (t) {
        console.log(t), ez('error', t.response.data.message);
      }
    },
    eV = async (t) => {
      try {
        let e = await eR(`/api/v1/booking/checkout-session/${t}`, {
          params: { tourId: t },
        });
        window.location.assign(e.data.session.url);
      } catch (t) {
        console.log(t), ez('error', t);
      }
    },
    eW = document.getElementById('map'),
    eK = document.querySelector('.nav__el--logout'),
    eY = document.querySelector('.form--login'),
    eX = document.querySelector('.form-user-data'),
    eZ = document.querySelector('.form-user-password'),
    eQ = document.querySelector('#book-tour');
  eW &&
    ((t) => {
      let e = L.map('map', { zoomControl: !1 });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(e);
      let r = L.icon({
          iconUrl: '/img/pin.png',
          iconSize: [32, 40],
          iconAnchor: [16, 45],
          popupAnchor: [0, -50],
        }),
        n = [];
      t.forEach((t) => {
        n.push([t.coordinates[1], t.coordinates[0]]),
          L.marker([t.coordinates[1], t.coordinates[0]], { icon: r })
            .addTo(e)
            .bindPopup(`<p>Day ${t.day}: ${t.description}</p>`, {
              autoClose: !1,
              className: 'mapPopup',
            })
            .on('mouseover', function (t) {
              this.openPopup();
            })
            .on('mouseout', function (t) {
              this.closePopup();
            })
            .openPopup();
      });
      let o = L.latLngBounds(n);
      e.fitBounds(o), e.scrollWheelZoom.disable();
    })(JSON.parse(document.getElementById('map').dataset.locations)),
    eY &&
      eY.addEventListener('submit', (t) => {
        t.preventDefault(),
          eH(
            document.getElementById('email').value,
            document.getElementById('password').value,
          );
      }),
    eK && eK.addEventListener('click', eG),
    eX &&
      eX.addEventListener('submit', (t) => {
        t.preventDefault();
        let e = new FormData();
        e.append('name', document.getElementById('name').value),
          e.append('email', document.getElementById('email').value),
          e.append('photo', document.getElementById('photo').files[0]),
          console.log(e),
          eJ(e, 'user');
      }),
    eZ &&
      eZ.addEventListener('submit', async (t) => {
        t.preventDefault(),
          (document.querySelector('.btn--save-password').textContent =
            'updating');
        let e = document.getElementById('password-current').value,
          r = document.getElementById('password').value,
          n = document.getElementById('password-confirm').value;
        await eJ(
          { passwordCurrent: e, password: r, passwordConfirmed: n },
          'password',
        ),
          (document.getElementById('password-current').textContent = ''),
          (document.getElementById('password').textContent = ''),
          (document.getElementById('password-confirm').textContent = ''),
          (document.querySelector('.btn--save-password').textContent =
            'save password');
      }),
    eQ &&
      eQ.addEventListener('click', (t) => {
        t.target.textContent = 'Processing...';
        let e = t.target.dataset.tourid;
        try {
          eV(e);
        } catch (t) {
          console.log('error add book tour');
        }
      });
})();
//# sourceMappingURL=index.js.map
