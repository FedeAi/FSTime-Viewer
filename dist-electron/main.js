import ye from "electron";
import Oe from "path";
import Pe from "fs/promises";
import "fs";
var Q = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ge(i) {
  if (i.__esModule) return i;
  var t = i.default;
  if (typeof t == "function") {
    var e = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    e.prototype = t.prototype;
  } else e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(i).forEach(function(r) {
    var n = Object.getOwnPropertyDescriptor(i, r);
    Object.defineProperty(e, r, n.get ? n : {
      enumerable: !0,
      get: function() {
        return i[r];
      }
    });
  }), e;
}
var mi = {};
const me = ye;
if (typeof me == "string")
  throw new TypeError("Not running in an Electron environment!");
const Ne = "ELECTRON_IS_DEV" in process.env, Fe = Number.parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
var Ue = Ne ? Fe : !me.app.isPackaged;
function lt(i, t, e, r) {
  if (e === "a" && !r) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? i !== t || !r : !t.has(i)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? r : e === "a" ? r.call(i) : r ? r.value : t.get(i);
}
function Pt(i, t, e, r, n) {
  if (r === "m") throw new TypeError("Private method is not writable");
  if (r === "a" && !n) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? i !== t || !n : !t.has(i)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return r === "a" ? n.call(i, e) : n ? n.value = e : t.set(i, e), e;
}
var xt, _t;
let He = class {
  constructor(t) {
    xt.set(this, void 0), _t.set(this, new ArrayBuffer(4096)), Pt(this, xt, t, "f");
  }
  async size() {
    return BigInt((await lt(this, xt, "f").stat()).size);
  }
  async read(t, e) {
    if (t > Number.MAX_SAFE_INTEGER || e > Number.MAX_SAFE_INTEGER)
      throw new Error(`Read too large: offset ${t}, length ${e}`);
    e > lt(this, _t, "f").byteLength && Pt(this, _t, new ArrayBuffer(Number(e * 2n)), "f");
    const r = await lt(this, xt, "f").read({
      buffer: new DataView(lt(this, _t, "f"), 0, Number(e)),
      position: Number(t)
    });
    if (r.bytesRead !== Number(e))
      throw new Error(`Read only ${r.bytesRead} bytes from offset ${t}, expected ${e}`);
    return new Uint8Array(r.buffer.buffer, r.buffer.byteOffset, r.bytesRead);
  }
};
xt = /* @__PURE__ */ new WeakMap(), _t = /* @__PURE__ */ new WeakMap();
var Rt, St;
class We {
  constructor(t) {
    Rt.set(this, void 0), St.set(this, 0), Pt(this, Rt, t, "f");
  }
  async write(t) {
    const e = await lt(this, Rt, "f").write(t);
    Pt(this, St, lt(this, St, "f") + e.bytesWritten, "f");
  }
  position() {
    return BigInt(lt(this, St, "f"));
  }
}
Rt = /* @__PURE__ */ new WeakMap(), St = /* @__PURE__ */ new WeakMap();
const ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FileHandleReadable: He,
  FileHandleWritable: We
}, Symbol.toStringTag, { value: "Module" })), Ve = /* @__PURE__ */ ge(ze);
function Ge({ polynomial: i, numTables: t }) {
  const e = new Uint32Array(256 * t);
  for (let r = 0; r < 256; r++) {
    let n = r;
    n = (n & 1) * i ^ n >>> 1, n = (n & 1) * i ^ n >>> 1, n = (n & 1) * i ^ n >>> 1, n = (n & 1) * i ^ n >>> 1, n = (n & 1) * i ^ n >>> 1, n = (n & 1) * i ^ n >>> 1, n = (n & 1) * i ^ n >>> 1, n = (n & 1) * i ^ n >>> 1, e[r] = n;
  }
  for (let r = 256; r < e.length; r++) {
    const n = e[r - 256];
    e[r] = e[n & 255] ^ n >>> 8;
  }
  return e;
}
const ht = Ge({ polynomial: 3988292384, numTables: 8 });
function Nt() {
  return -1;
}
function Y(i, t) {
  const e = t.byteLength, r = new DataView(t.buffer, t.byteOffset, e);
  let n = i, s = 0;
  const a = -r.byteOffset & 3;
  for (; s < a && s < e; s++)
    n = ht[(n ^ r.getUint8(s)) & 255] ^ n >>> 8;
  if (s === e)
    return n;
  s = a;
  let c = e - s;
  for (; c >= 8; s += 8, c -= 8) {
    n ^= r.getUint32(s, !0);
    const f = r.getUint32(s + 4, !0);
    n = ht[0 * 256 + (f >>> 24 & 255)] ^ ht[1 * 256 + (f >>> 16 & 255)] ^ ht[2 * 256 + (f >>> 8 & 255)] ^ ht[3 * 256 + (f >>> 0 & 255)] ^ ht[4 * 256 + (n >>> 24 & 255)] ^ ht[5 * 256 + (n >>> 16 & 255)] ^ ht[6 * 256 + (n >>> 8 & 255)] ^ ht[7 * 256 + (n >>> 0 & 255)];
  }
  for (let f = s; f < e; f++)
    n = ht[(n ^ r.getUint8(f)) & 255] ^ n >>> 8;
  return n;
}
function Ft(i) {
  return (i ^ -1) >>> 0;
}
function Lt(i) {
  return Ft(Y(Nt(), i));
}
var H = function(i, t, e, r) {
  function n(s) {
    return s instanceof e ? s : new e(function(a) {
      a(s);
    });
  }
  return new (e || (e = Promise))(function(s, a) {
    function c(o) {
      try {
        h(r.next(o));
      } catch (u) {
        a(u);
      }
    }
    function f(o) {
      try {
        h(r.throw(o));
      } catch (u) {
        a(u);
      }
    }
    function h(o) {
      o.done ? s(o.value) : n(o.value).then(c, f);
    }
    h((r = r.apply(i, t || [])).next());
  });
}, U = function(i, t) {
  var e = { label: 0, sent: function() {
    if (s[0] & 1) throw s[1];
    return s[1];
  }, trys: [], ops: [] }, r, n, s, a = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return a.next = c(0), a.throw = c(1), a.return = c(2), typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function c(h) {
    return function(o) {
      return f([h, o]);
    };
  }
  function f(h) {
    if (r) throw new TypeError("Generator is already executing.");
    for (; a && (a = 0, h[0] && (e = 0)), e; ) try {
      if (r = 1, n && (s = h[0] & 2 ? n.return : h[0] ? n.throw || ((s = n.return) && s.call(n), 0) : n.next) && !(s = s.call(n, h[1])).done) return s;
      switch (n = 0, s && (h = [h[0] & 2, s.value]), h[0]) {
        case 0:
        case 1:
          s = h;
          break;
        case 4:
          return e.label++, { value: h[1], done: !1 };
        case 5:
          e.label++, n = h[1], h = [0];
          continue;
        case 7:
          h = e.ops.pop(), e.trys.pop();
          continue;
        default:
          if (s = e.trys, !(s = s.length > 0 && s[s.length - 1]) && (h[0] === 6 || h[0] === 2)) {
            e = 0;
            continue;
          }
          if (h[0] === 3 && (!s || h[1] > s[0] && h[1] < s[3])) {
            e.label = h[1];
            break;
          }
          if (h[0] === 6 && e.label < s[1]) {
            e.label = s[1], s = h;
            break;
          }
          if (s && e.label < s[2]) {
            e.label = s[2], e.ops.push(h);
            break;
          }
          s[2] && e.ops.pop(), e.trys.pop();
          continue;
      }
      h = t.call(i, e);
    } catch (o) {
      h = [6, o], n = 0;
    } finally {
      r = s = 0;
    }
    if (h[0] & 5) throw h[1];
    return { value: h[0] ? h[1] : void 0, done: !0 };
  }
}, rt = function(i, t) {
  var e = typeof Symbol == "function" && i[Symbol.iterator];
  if (!e) return i;
  var r = e.call(i), n, s = [], a;
  try {
    for (; (t === void 0 || t-- > 0) && !(n = r.next()).done; ) s.push(n.value);
  } catch (c) {
    a = { error: c };
  } finally {
    try {
      n && !n.done && (e = r.return) && e.call(r);
    } finally {
      if (a) throw a.error;
    }
  }
  return s;
}, nt = function(i, t, e) {
  if (e || arguments.length === 2) for (var r = 0, n = t.length, s; r < n; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return i.concat(s || Array.prototype.slice.call(t));
}, re = function(i) {
  var t = typeof Symbol == "function" && Symbol.iterator, e = t && i[t], r = 0;
  if (e) return e.call(i);
  if (i && typeof i.length == "number") return {
    next: function() {
      return i && r >= i.length && (i = void 0), { value: i && i[r++], done: !i };
    }
  };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
(function() {
  function i(t) {
    t === void 0 && (t = i.minComparator);
    var e = this;
    this.compare = t, this.heapArray = [], this._limit = 0, this.offer = this.add, this.element = this.peek, this.poll = this.pop, this._invertedCompare = function(r, n) {
      return e.compare(r, n).then(function(s) {
        return -1 * s;
      });
    };
  }
  return i.getChildrenIndexOf = function(t) {
    return [t * 2 + 1, t * 2 + 2];
  }, i.getParentIndexOf = function(t) {
    if (t <= 0)
      return -1;
    var e = t % 2 ? 1 : 2;
    return Math.floor((t - e) / 2);
  }, i.getSiblingIndexOf = function(t) {
    if (t <= 0)
      return -1;
    var e = t % 2 ? 1 : -1;
    return t + e;
  }, i.minComparator = function(t, e) {
    return H(this, void 0, void 0, function() {
      return U(this, function(r) {
        return t > e ? [2, 1] : t < e ? [2, -1] : [2, 0];
      });
    });
  }, i.maxComparator = function(t, e) {
    return H(this, void 0, void 0, function() {
      return U(this, function(r) {
        return e > t ? [2, 1] : e < t ? [2, -1] : [2, 0];
      });
    });
  }, i.minComparatorNumber = function(t, e) {
    return H(this, void 0, void 0, function() {
      return U(this, function(r) {
        return [2, t - e];
      });
    });
  }, i.maxComparatorNumber = function(t, e) {
    return H(this, void 0, void 0, function() {
      return U(this, function(r) {
        return [2, e - t];
      });
    });
  }, i.defaultIsEqual = function(t, e) {
    return H(this, void 0, void 0, function() {
      return U(this, function(r) {
        return [2, t === e];
      });
    });
  }, i.print = function(t) {
    function e(o) {
      var u = i.getParentIndexOf(o);
      return Math.floor(Math.log2(u + 1));
    }
    function r(o, u) {
      for (var y = ""; u > 0; --u)
        y += o;
      return y;
    }
    for (var n = 0, s = [], a = e(t.length - 1) + 2, c = 0; n < t.length; ) {
      var f = e(n) + 1;
      n === 0 && (f = 0);
      var h = String(t.get(n));
      h.length > c && (c = h.length), s[f] = s[f] || [], s[f].push(h), n += 1;
    }
    return s.map(function(o, u) {
      var y = Math.pow(2, a - u) - 1;
      return r(" ", Math.floor(y / 2) * c) + o.map(function(l) {
        var d = (c - l.length) / 2;
        return r(" ", Math.ceil(d)) + l + r(" ", Math.floor(d));
      }).join(r(" ", y * c));
    }).join(`
`);
  }, i.heapify = function(t, e) {
    return H(this, void 0, void 0, function() {
      var r;
      return U(this, function(n) {
        switch (n.label) {
          case 0:
            return r = new i(e), r.heapArray = t, [4, r.init()];
          case 1:
            return n.sent(), [2, r];
        }
      });
    });
  }, i.heappop = function(t, e) {
    var r = new i(e);
    return r.heapArray = t, r.pop();
  }, i.heappush = function(t, e, r) {
    return H(this, void 0, void 0, function() {
      var n;
      return U(this, function(s) {
        switch (s.label) {
          case 0:
            return n = new i(r), n.heapArray = t, [4, n.push(e)];
          case 1:
            return s.sent(), [
              2
              /*return*/
            ];
        }
      });
    });
  }, i.heappushpop = function(t, e, r) {
    var n = new i(r);
    return n.heapArray = t, n.pushpop(e);
  }, i.heapreplace = function(t, e, r) {
    var n = new i(r);
    return n.heapArray = t, n.replace(e);
  }, i.heaptop = function(t, e, r) {
    e === void 0 && (e = 1);
    var n = new i(r);
    return n.heapArray = t, n.top(e);
  }, i.heapbottom = function(t, e, r) {
    e === void 0 && (e = 1);
    var n = new i(r);
    return n.heapArray = t, n.bottom(e);
  }, i.nlargest = function(t, e, r) {
    return H(this, void 0, void 0, function() {
      var n;
      return U(this, function(s) {
        switch (s.label) {
          case 0:
            return n = new i(r), n.heapArray = nt([], rt(e), !1), [4, n.init()];
          case 1:
            return s.sent(), [2, n.top(t)];
        }
      });
    });
  }, i.nsmallest = function(t, e, r) {
    return H(this, void 0, void 0, function() {
      var n;
      return U(this, function(s) {
        switch (s.label) {
          case 0:
            return n = new i(r), n.heapArray = nt([], rt(e), !1), [4, n.init()];
          case 1:
            return s.sent(), [2, n.bottom(t)];
        }
      });
    });
  }, i.prototype.add = function(t) {
    return H(this, void 0, void 0, function() {
      return U(this, function(e) {
        switch (e.label) {
          case 0:
            return [4, this._sortNodeUp(this.heapArray.push(t) - 1)];
          case 1:
            return e.sent(), this._applyLimit(), [2, !0];
        }
      });
    });
  }, i.prototype.addAll = function(t) {
    return H(this, void 0, void 0, function() {
      var e, r, n;
      return U(this, function(s) {
        switch (s.label) {
          case 0:
            e = this.length, (n = this.heapArray).push.apply(n, nt([], rt(t), !1)), r = this.length, s.label = 1;
          case 1:
            return e < r ? [4, this._sortNodeUp(e)] : [3, 4];
          case 2:
            s.sent(), s.label = 3;
          case 3:
            return ++e, [3, 1];
          case 4:
            return this._applyLimit(), [2, !0];
        }
      });
    });
  }, i.prototype.bottom = function() {
    return H(this, arguments, void 0, function(t) {
      return t === void 0 && (t = 1), U(this, function(e) {
        return this.heapArray.length === 0 || t <= 0 ? [2, []] : this.heapArray.length === 1 ? [2, [this.heapArray[0]]] : t >= this.heapArray.length ? [2, nt([], rt(this.heapArray), !1)] : [2, this._bottomN_push(~~t)];
      });
    });
  }, i.prototype.check = function() {
    return H(this, void 0, void 0, function() {
      var t, e, r, n, s, a, c, f, h;
      return U(this, function(o) {
        switch (o.label) {
          case 0:
            t = 0, o.label = 1;
          case 1:
            if (!(t < this.heapArray.length)) return [3, 10];
            e = this.heapArray[t], r = this.getChildrenOf(t), o.label = 2;
          case 2:
            o.trys.push([2, 7, 8, 9]), n = (f = void 0, re(r)), s = n.next(), o.label = 3;
          case 3:
            return s.done ? [3, 6] : (a = s.value, [4, this.compare(e, a)]);
          case 4:
            if (o.sent() > 0)
              return [2, e];
            o.label = 5;
          case 5:
            return s = n.next(), [3, 3];
          case 6:
            return [3, 9];
          case 7:
            return c = o.sent(), f = { error: c }, [3, 9];
          case 8:
            try {
              s && !s.done && (h = n.return) && h.call(n);
            } finally {
              if (f) throw f.error;
            }
            return [
              7
              /*endfinally*/
            ];
          case 9:
            return ++t, [3, 1];
          case 10:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }, i.prototype.clear = function() {
    this.heapArray = [];
  }, i.prototype.clone = function() {
    var t = new i(this.comparator());
    return t.heapArray = this.toArray(), t._limit = this._limit, t;
  }, i.prototype.comparator = function() {
    return this.compare;
  }, i.prototype.contains = function(t) {
    return H(this, arguments, void 0, function(e, r) {
      var n, s, a, c, f, h;
      return r === void 0 && (r = i.defaultIsEqual), U(this, function(o) {
        switch (o.label) {
          case 0:
            o.trys.push([0, 5, 6, 7]), n = re(this.heapArray), s = n.next(), o.label = 1;
          case 1:
            return s.done ? [3, 4] : (a = s.value, [4, r(a, e)]);
          case 2:
            if (o.sent())
              return [2, !0];
            o.label = 3;
          case 3:
            return s = n.next(), [3, 1];
          case 4:
            return [3, 7];
          case 5:
            return c = o.sent(), f = { error: c }, [3, 7];
          case 6:
            try {
              s && !s.done && (h = n.return) && h.call(n);
            } finally {
              if (f) throw f.error;
            }
            return [
              7
              /*endfinally*/
            ];
          case 7:
            return [2, !1];
        }
      });
    });
  }, i.prototype.init = function(t) {
    return H(this, void 0, void 0, function() {
      var e;
      return U(this, function(r) {
        switch (r.label) {
          case 0:
            t && (this.heapArray = nt([], rt(t), !1)), e = Math.floor(this.heapArray.length), r.label = 1;
          case 1:
            return e >= 0 ? [4, this._sortNodeDown(e)] : [3, 4];
          case 2:
            r.sent(), r.label = 3;
          case 3:
            return --e, [3, 1];
          case 4:
            return this._applyLimit(), [
              2
              /*return*/
            ];
        }
      });
    });
  }, i.prototype.isEmpty = function() {
    return this.length === 0;
  }, i.prototype.leafs = function() {
    if (this.heapArray.length === 0)
      return [];
    var t = i.getParentIndexOf(this.heapArray.length - 1);
    return this.heapArray.slice(t + 1);
  }, Object.defineProperty(i.prototype, "length", {
    /**
     * Length of the heap.
     * @return {Number}
     */
    get: function() {
      return this.heapArray.length;
    },
    enumerable: !1,
    configurable: !0
  }), Object.defineProperty(i.prototype, "limit", {
    /**
     * Get length limit of the heap.
     * @return {Number}
     */
    get: function() {
      return this._limit;
    },
    /**
     * Set length limit of the heap.
     * @return {Number}
     */
    set: function(t) {
      this._limit = ~~t, this._applyLimit();
    },
    enumerable: !1,
    configurable: !0
  }), i.prototype.peek = function() {
    return this.heapArray[0];
  }, i.prototype.pop = function() {
    return H(this, void 0, void 0, function() {
      var t;
      return U(this, function(e) {
        return t = this.heapArray.pop(), this.length > 0 && t !== void 0 ? [2, this.replace(t)] : [2, t];
      });
    });
  }, i.prototype.push = function() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t[e] = arguments[e];
    return H(this, void 0, void 0, function() {
      return U(this, function(r) {
        return t.length < 1 ? [2, !1] : t.length === 1 ? [2, this.add(t[0])] : [2, this.addAll(t)];
      });
    });
  }, i.prototype.pushpop = function(t) {
    return H(this, void 0, void 0, function() {
      var e;
      return U(this, function(r) {
        switch (r.label) {
          case 0:
            return [4, this.compare(this.heapArray[0], t)];
          case 1:
            return r.sent() < 0 ? (e = rt([this.heapArray[0], t], 2), t = e[0], this.heapArray[0] = e[1], [4, this._sortNodeDown(0)]) : [3, 3];
          case 2:
            r.sent(), r.label = 3;
          case 3:
            return [2, t];
        }
      });
    });
  }, i.prototype.remove = function(t) {
    return H(this, arguments, void 0, function(e, r) {
      var n, s, a, c = this;
      return r === void 0 && (r = i.defaultIsEqual), U(this, function(f) {
        switch (f.label) {
          case 0:
            return this.heapArray.length ? e !== void 0 ? [3, 2] : [4, this.pop()] : [2, !1];
          case 1:
            return f.sent(), [2, !0];
          case 2:
            n = [0], f.label = 3;
          case 3:
            return n.length ? (s = n.shift(), [4, r(this.heapArray[s], e)]) : [3, 13];
          case 4:
            return f.sent() ? s !== 0 ? [3, 6] : [4, this.pop()] : [3, 11];
          case 5:
            return f.sent(), [3, 10];
          case 6:
            return s !== this.heapArray.length - 1 ? [3, 7] : (this.heapArray.pop(), [3, 10]);
          case 7:
            return this.heapArray.splice(s, 1, this.heapArray.pop()), [4, this._sortNodeUp(s)];
          case 8:
            return f.sent(), [4, this._sortNodeDown(s)];
          case 9:
            f.sent(), f.label = 10;
          case 10:
            return [2, !0];
          case 11:
            a = i.getChildrenIndexOf(s).filter(function(h) {
              return h < c.heapArray.length;
            }), n.push.apply(n, nt([], rt(a), !1)), f.label = 12;
          case 12:
            return [3, 3];
          case 13:
            return [2, !1];
        }
      });
    });
  }, i.prototype.replace = function(t) {
    return H(this, void 0, void 0, function() {
      var e;
      return U(this, function(r) {
        switch (r.label) {
          case 0:
            return e = this.heapArray[0], this.heapArray[0] = t, [4, this._sortNodeDown(0)];
          case 1:
            return r.sent(), [2, e];
        }
      });
    });
  }, i.prototype.size = function() {
    return this.length;
  }, i.prototype.top = function() {
    return H(this, arguments, void 0, function(t) {
      return t === void 0 && (t = 1), U(this, function(e) {
        return this.heapArray.length === 0 || t <= 0 ? [2, []] : this.heapArray.length === 1 || t === 1 ? [2, [this.heapArray[0]]] : t >= this.heapArray.length ? [2, nt([], rt(this.heapArray), !1)] : [2, this._topN_push(~~t)];
      });
    });
  }, i.prototype.toArray = function() {
    return nt([], rt(this.heapArray), !1);
  }, i.prototype.toString = function() {
    return this.heapArray.toString();
  }, i.prototype.get = function(t) {
    return this.heapArray[t];
  }, i.prototype.getChildrenOf = function(t) {
    var e = this;
    return i.getChildrenIndexOf(t).map(function(r) {
      return e.heapArray[r];
    }).filter(function(r) {
      return r !== void 0;
    });
  }, i.prototype.getParentOf = function(t) {
    var e = i.getParentIndexOf(t);
    return this.heapArray[e];
  }, i.prototype[Symbol.iterator] = function() {
    return U(this, function(t) {
      switch (t.label) {
        case 0:
          return this.length ? [4, this.pop()] : [3, 2];
        case 1:
          return t.sent(), [3, 0];
        case 2:
          return [
            2
            /*return*/
          ];
      }
    });
  }, i.prototype.iterator = function() {
    return this;
  }, i.prototype._applyLimit = function() {
    if (this._limit && this._limit < this.heapArray.length)
      for (var t = this.heapArray.length - this._limit; t; )
        this.heapArray.pop(), --t;
  }, i.prototype._bottomN_push = function(t) {
    return H(this, void 0, void 0, function() {
      var e, r, n, s, c, a, c;
      return U(this, function(f) {
        switch (f.label) {
          case 0:
            return e = new i(this.compare), e.limit = t, e.heapArray = this.heapArray.slice(-t), [4, e.init()];
          case 1:
            for (f.sent(), r = this.heapArray.length - 1 - t, n = i.getParentIndexOf(r), s = [], c = r; c > n; --c)
              s.push(c);
            a = this.heapArray, f.label = 2;
          case 2:
            return s.length ? (c = s.shift(), [4, this.compare(a[c], e.peek())]) : [3, 6];
          case 3:
            return f.sent() > 0 ? [4, e.replace(a[c])] : [3, 5];
          case 4:
            f.sent(), c % 2 && s.push(i.getParentIndexOf(c)), f.label = 5;
          case 5:
            return [3, 2];
          case 6:
            return [2, e.toArray()];
        }
      });
    });
  }, i.prototype._moveNode = function(t, e) {
    var r;
    r = rt([this.heapArray[e], this.heapArray[t]], 2), this.heapArray[t] = r[0], this.heapArray[e] = r[1];
  }, i.prototype._sortNodeDown = function(t) {
    return H(this, void 0, void 0, function() {
      var e, r, n, s, a, c;
      return U(this, function(f) {
        switch (f.label) {
          case 0:
            e = this.heapArray.length, f.label = 1;
          case 1:
            return r = 2 * t + 1, n = r + 1, s = t, a = r < e, a ? [4, this.compare(this.heapArray[r], this.heapArray[s])] : [3, 3];
          case 2:
            a = f.sent() < 0, f.label = 3;
          case 3:
            return a && (s = r), c = n < e, c ? [4, this.compare(this.heapArray[n], this.heapArray[s])] : [3, 5];
          case 4:
            c = f.sent() < 0, f.label = 5;
          case 5:
            if (c && (s = n), s === t)
              return [3, 7];
            this._moveNode(t, s), t = s, f.label = 6;
          case 6:
            return [3, 1];
          case 7:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }, i.prototype._sortNodeUp = function(t) {
    return H(this, void 0, void 0, function() {
      var e;
      return U(this, function(r) {
        switch (r.label) {
          case 0:
            return t > 0 ? (e = i.getParentIndexOf(t), [4, this.compare(this.heapArray[t], this.heapArray[e])]) : [3, 2];
          case 1:
            if (r.sent() < 0)
              this._moveNode(t, e), t = e;
            else
              return [3, 2];
            return [3, 0];
          case 2:
            return [
              2
              /*return*/
            ];
        }
      });
    });
  }, i.prototype._topN_push = function(t) {
    return H(this, void 0, void 0, function() {
      var e, r, n, s;
      return U(this, function(a) {
        switch (a.label) {
          case 0:
            e = new i(this._invertedCompare), e.limit = t, r = [0], n = this.heapArray, a.label = 1;
          case 1:
            return r.length ? (s = r.shift(), s < n.length ? e.length < t ? [4, e.push(n[s])] : [3, 3] : [3, 6]) : [3, 7];
          case 2:
            return a.sent(), r.push.apply(r, nt([], rt(i.getChildrenIndexOf(s)), !1)), [3, 6];
          case 3:
            return [4, this.compare(n[s], e.peek())];
          case 4:
            return a.sent() < 0 ? [4, e.replace(n[s])] : [3, 6];
          case 5:
            a.sent(), r.push.apply(r, nt([], rt(i.getChildrenIndexOf(s)), !1)), a.label = 6;
          case 6:
            return [3, 1];
          case 7:
            return [2, e.toArray()];
        }
      });
    });
  }, i.prototype._topN_fill = function(t) {
    return H(this, void 0, void 0, function() {
      var e, r, n, s, a, a;
      return U(this, function(c) {
        switch (c.label) {
          case 0:
            return e = this.heapArray, r = new i(this._invertedCompare), r.limit = t, r.heapArray = e.slice(0, t), [4, r.init()];
          case 1:
            for (c.sent(), n = i.getParentIndexOf(t - 1) + 1, s = [], a = n; a < t; ++a)
              s.push.apply(s, nt([], rt(i.getChildrenIndexOf(a).filter(function(f) {
                return f < e.length;
              })), !1));
            (t - 1) % 2 && s.push(t), c.label = 2;
          case 2:
            return s.length ? (a = s.shift(), a < e.length ? [4, this.compare(e[a], r.peek())] : [3, 5]) : [3, 6];
          case 3:
            return c.sent() < 0 ? [4, r.replace(e[a])] : [3, 5];
          case 4:
            c.sent(), s.push.apply(s, nt([], rt(i.getChildrenIndexOf(a)), !1)), c.label = 5;
          case 5:
            return [3, 2];
          case 6:
            return [2, r.toArray()];
        }
      });
    });
  }, i.prototype._topN_heap = function(t) {
    return H(this, void 0, void 0, function() {
      var e, r, n, s, a;
      return U(this, function(c) {
        switch (c.label) {
          case 0:
            e = this.clone(), r = [], n = 0, c.label = 1;
          case 1:
            return n < t ? (a = (s = r).push, [4, e.pop()]) : [3, 4];
          case 2:
            a.apply(s, [c.sent()]), c.label = 3;
          case 3:
            return ++n, [3, 1];
          case 4:
            return [2, r];
        }
      });
    });
  }, i.prototype._topIdxOf = function(t) {
    return H(this, void 0, void 0, function() {
      var e, r, n, s;
      return U(this, function(a) {
        switch (a.label) {
          case 0:
            if (!t.length)
              return [2, -1];
            e = 0, r = t[e], n = 1, a.label = 1;
          case 1:
            return n < t.length ? [4, this.compare(t[n], r)] : [3, 4];
          case 2:
            s = a.sent(), s < 0 && (e = n, r = t[n]), a.label = 3;
          case 3:
            return ++n, [3, 1];
          case 4:
            return [2, e];
        }
      });
    });
  }, i.prototype._topOf = function() {
    for (var t = [], e = 0; e < arguments.length; e++)
      t[e] = arguments[e];
    return H(this, void 0, void 0, function() {
      var r;
      return U(this, function(n) {
        switch (n.label) {
          case 0:
            return r = new i(this.compare), [4, r.init(t)];
          case 1:
            return n.sent(), [2, r.peek()];
        }
      });
    });
  }, i;
})();
var je = function(i, t) {
  var e = { label: 0, sent: function() {
    if (s[0] & 1) throw s[1];
    return s[1];
  }, trys: [], ops: [] }, r, n, s, a = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return a.next = c(0), a.throw = c(1), a.return = c(2), typeof Symbol == "function" && (a[Symbol.iterator] = function() {
    return this;
  }), a;
  function c(h) {
    return function(o) {
      return f([h, o]);
    };
  }
  function f(h) {
    if (r) throw new TypeError("Generator is already executing.");
    for (; a && (a = 0, h[0] && (e = 0)), e; ) try {
      if (r = 1, n && (s = h[0] & 2 ? n.return : h[0] ? n.throw || ((s = n.return) && s.call(n), 0) : n.next) && !(s = s.call(n, h[1])).done) return s;
      switch (n = 0, s && (h = [h[0] & 2, s.value]), h[0]) {
        case 0:
        case 1:
          s = h;
          break;
        case 4:
          return e.label++, { value: h[1], done: !1 };
        case 5:
          e.label++, n = h[1], h = [0];
          continue;
        case 7:
          h = e.ops.pop(), e.trys.pop();
          continue;
        default:
          if (s = e.trys, !(s = s.length > 0 && s[s.length - 1]) && (h[0] === 6 || h[0] === 2)) {
            e = 0;
            continue;
          }
          if (h[0] === 3 && (!s || h[1] > s[0] && h[1] < s[3])) {
            e.label = h[1];
            break;
          }
          if (h[0] === 6 && e.label < s[1]) {
            e.label = s[1], s = h;
            break;
          }
          if (s && e.label < s[2]) {
            e.label = s[2], e.ops.push(h);
            break;
          }
          s[2] && e.ops.pop(), e.trys.pop();
          continue;
      }
      h = t.call(i, e);
    } catch (o) {
      h = [6, o], n = 0;
    } finally {
      r = s = 0;
    }
    if (h[0] & 5) throw h[1];
    return { value: h[0] ? h[1] : void 0, done: !0 };
  }
}, Z = function(i, t) {
  var e = typeof Symbol == "function" && i[Symbol.iterator];
  if (!e) return i;
  var r = e.call(i), n, s = [], a;
  try {
    for (; (t === void 0 || t-- > 0) && !(n = r.next()).done; ) s.push(n.value);
  } catch (c) {
    a = { error: c };
  } finally {
    try {
      n && !n.done && (e = r.return) && e.call(r);
    } finally {
      if (a) throw a.error;
    }
  }
  return s;
}, et = function(i, t, e) {
  if (e || arguments.length === 2) for (var r = 0, n = t.length, s; r < n; r++)
    (s || !(r in t)) && (s || (s = Array.prototype.slice.call(t, 0, r)), s[r] = t[r]);
  return i.concat(s || Array.prototype.slice.call(t));
}, be = (
  /** @class */
  function() {
    function i(t) {
      t === void 0 && (t = i.minComparator);
      var e = this;
      this.compare = t, this.heapArray = [], this._limit = 0, this.offer = this.add, this.element = this.peek, this.poll = this.pop, this.removeAll = this.clear, this._invertedCompare = function(r, n) {
        return -1 * e.compare(r, n);
      };
    }
    return i.getChildrenIndexOf = function(t) {
      return [t * 2 + 1, t * 2 + 2];
    }, i.getParentIndexOf = function(t) {
      if (t <= 0)
        return -1;
      var e = t % 2 ? 1 : 2;
      return Math.floor((t - e) / 2);
    }, i.getSiblingIndexOf = function(t) {
      if (t <= 0)
        return -1;
      var e = t % 2 ? 1 : -1;
      return t + e;
    }, i.minComparator = function(t, e) {
      return t > e ? 1 : t < e ? -1 : 0;
    }, i.maxComparator = function(t, e) {
      return e > t ? 1 : e < t ? -1 : 0;
    }, i.minComparatorNumber = function(t, e) {
      return t - e;
    }, i.maxComparatorNumber = function(t, e) {
      return e - t;
    }, i.defaultIsEqual = function(t, e) {
      return t === e;
    }, i.print = function(t) {
      function e(o) {
        var u = i.getParentIndexOf(o);
        return Math.floor(Math.log2(u + 1));
      }
      function r(o, u) {
        for (var y = ""; u > 0; --u)
          y += o;
        return y;
      }
      for (var n = 0, s = [], a = e(t.length - 1) + 2, c = 0; n < t.length; ) {
        var f = e(n) + 1;
        n === 0 && (f = 0);
        var h = String(t.get(n));
        h.length > c && (c = h.length), s[f] = s[f] || [], s[f].push(h), n += 1;
      }
      return s.map(function(o, u) {
        var y = Math.pow(2, a - u) - 1;
        return r(" ", Math.floor(y / 2) * c) + o.map(function(l) {
          var d = (c - l.length) / 2;
          return r(" ", Math.ceil(d)) + l + r(" ", Math.floor(d));
        }).join(r(" ", y * c));
      }).join(`
`);
    }, i.heapify = function(t, e) {
      var r = new i(e);
      return r.heapArray = t, r.init(), r;
    }, i.heappop = function(t, e) {
      var r = new i(e);
      return r.heapArray = t, r.pop();
    }, i.heappush = function(t, e, r) {
      var n = new i(r);
      n.heapArray = t, n.push(e);
    }, i.heappushpop = function(t, e, r) {
      var n = new i(r);
      return n.heapArray = t, n.pushpop(e);
    }, i.heapreplace = function(t, e, r) {
      var n = new i(r);
      return n.heapArray = t, n.replace(e);
    }, i.heaptop = function(t, e, r) {
      e === void 0 && (e = 1);
      var n = new i(r);
      return n.heapArray = t, n.top(e);
    }, i.heapbottom = function(t, e, r) {
      e === void 0 && (e = 1);
      var n = new i(r);
      return n.heapArray = t, n.bottom(e);
    }, i.nlargest = function(t, e, r) {
      var n = new i(r);
      return n.heapArray = et([], Z(e), !1), n.init(), n.top(t);
    }, i.nsmallest = function(t, e, r) {
      var n = new i(r);
      return n.heapArray = et([], Z(e), !1), n.init(), n.bottom(t);
    }, i.prototype.add = function(t) {
      return this._sortNodeUp(this.heapArray.push(t) - 1), this._applyLimit(), !0;
    }, i.prototype.addAll = function(t) {
      var e, r = this.length;
      (e = this.heapArray).push.apply(e, et([], Z(t), !1));
      for (var n = this.length; r < n; ++r)
        this._sortNodeUp(r);
      return this._applyLimit(), !0;
    }, i.prototype.bottom = function(t) {
      return t === void 0 && (t = 1), this.heapArray.length === 0 || t <= 0 ? [] : this.heapArray.length === 1 ? [this.heapArray[0]] : t >= this.heapArray.length ? et([], Z(this.heapArray), !1) : this._bottomN_push(~~t);
    }, i.prototype.check = function() {
      var t = this;
      return this.heapArray.find(function(e, r) {
        return !!t.getChildrenOf(r).find(function(n) {
          return t.compare(e, n) > 0;
        });
      });
    }, i.prototype.clear = function() {
      this.heapArray = [];
    }, i.prototype.clone = function() {
      var t = new i(this.comparator());
      return t.heapArray = this.toArray(), t._limit = this._limit, t;
    }, i.prototype.comparator = function() {
      return this.compare;
    }, i.prototype.contains = function(t, e) {
      return e === void 0 && (e = i.defaultIsEqual), this.indexOf(t, e) !== -1;
    }, i.prototype.init = function(t) {
      t && (this.heapArray = et([], Z(t), !1));
      for (var e = Math.floor(this.heapArray.length); e >= 0; --e)
        this._sortNodeDown(e);
      this._applyLimit();
    }, i.prototype.isEmpty = function() {
      return this.length === 0;
    }, i.prototype.indexOf = function(t, e) {
      if (e === void 0 && (e = i.defaultIsEqual), this.heapArray.length === 0)
        return -1;
      for (var r = [], n = 0; n < this.heapArray.length; ) {
        var s = this.heapArray[n];
        if (e(s, t))
          return n;
        this.compare(s, t) <= 0 && r.push.apply(r, et([], Z(i.getChildrenIndexOf(n)), !1)), n = r.shift() || this.heapArray.length;
      }
      return -1;
    }, i.prototype.indexOfEvery = function(t, e) {
      if (e === void 0 && (e = i.defaultIsEqual), this.heapArray.length === 0)
        return [];
      for (var r = [], n = [], s = 0; s < this.heapArray.length; ) {
        var a = this.heapArray[s];
        e(a, t) ? (n.push(s), r.push.apply(r, et([], Z(i.getChildrenIndexOf(s)), !1))) : this.compare(a, t) <= 0 && r.push.apply(r, et([], Z(i.getChildrenIndexOf(s)), !1)), s = r.shift() || this.heapArray.length;
      }
      return n;
    }, i.prototype.leafs = function() {
      if (this.heapArray.length === 0)
        return [];
      var t = i.getParentIndexOf(this.heapArray.length - 1);
      return this.heapArray.slice(t + 1);
    }, Object.defineProperty(i.prototype, "length", {
      /**
       * Length of the heap. Aliases: {@link size}.
       * @return {Number}
       * @see size
       */
      get: function() {
        return this.heapArray.length;
      },
      enumerable: !1,
      configurable: !0
    }), Object.defineProperty(i.prototype, "limit", {
      /**
       * Get length limit of the heap.
       * Use {@link setLimit} or {@link limit} to set the limit.
       * @return {Number}
       * @see setLimit
       */
      get: function() {
        return this._limit;
      },
      /**
       * Set length limit of the heap. Same as using {@link setLimit}.
       * @description If the heap is longer than the limit, the needed amount of leafs are removed.
       * @param {Number} _l Limit, defaults to 0 (no limit). Negative, Infinity, or NaN values set the limit to 0.
       * @see setLimit
       */
      set: function(t) {
        t < 0 || isNaN(t) ? this._limit = 0 : this._limit = ~~t, this._applyLimit();
      },
      enumerable: !1,
      configurable: !0
    }), i.prototype.setLimit = function(t) {
      return this.limit = t, t < 0 || isNaN(t) ? NaN : this._limit;
    }, i.prototype.peek = function() {
      return this.heapArray[0];
    }, i.prototype.pop = function() {
      var t = this.heapArray.pop();
      return this.length > 0 && t !== void 0 ? this.replace(t) : t;
    }, i.prototype.push = function() {
      for (var t = [], e = 0; e < arguments.length; e++)
        t[e] = arguments[e];
      return t.length < 1 ? !1 : t.length === 1 ? this.add(t[0]) : this.addAll(t);
    }, i.prototype.pushpop = function(t) {
      var e;
      return this.compare(this.heapArray[0], t) < 0 && (e = Z([this.heapArray[0], t], 2), t = e[0], this.heapArray[0] = e[1], this._sortNodeDown(0)), t;
    }, i.prototype.remove = function(t, e) {
      var r = this;
      if (e === void 0 && (e = i.defaultIsEqual), !this.heapArray.length)
        return !1;
      if (t === void 0)
        return this.pop(), !0;
      for (var n = [0]; n.length; ) {
        var s = n.shift();
        if (e(this.heapArray[s], t))
          return s === 0 ? this.pop() : s === this.heapArray.length - 1 ? this.heapArray.pop() : (this.heapArray.splice(s, 1, this.heapArray.pop()), this._sortNodeUp(s), this._sortNodeDown(s)), !0;
        if (this.compare(this.heapArray[s], t) <= 0) {
          var a = i.getChildrenIndexOf(s).filter(function(c) {
            return c < r.heapArray.length;
          });
          n.push.apply(n, et([], Z(a), !1));
        }
      }
      return !1;
    }, i.prototype.replace = function(t) {
      var e = this.heapArray[0];
      return this.heapArray[0] = t, this._sortNodeDown(0), e;
    }, i.prototype.size = function() {
      return this.length;
    }, i.prototype.top = function(t) {
      return t === void 0 && (t = 1), this.heapArray.length === 0 || t <= 0 ? [] : this.heapArray.length === 1 || t === 1 ? [this.heapArray[0]] : t >= this.heapArray.length ? et([], Z(this.heapArray), !1) : this._topN_push(~~t);
    }, i.prototype.toArray = function() {
      return et([], Z(this.heapArray), !1);
    }, i.prototype.toString = function() {
      return this.heapArray.toString();
    }, i.prototype.get = function(t) {
      return this.heapArray[t];
    }, i.prototype.getChildrenOf = function(t) {
      var e = this;
      return i.getChildrenIndexOf(t).map(function(r) {
        return e.heapArray[r];
      }).filter(function(r) {
        return r !== void 0;
      });
    }, i.prototype.getParentOf = function(t) {
      var e = i.getParentIndexOf(t);
      return this.heapArray[e];
    }, i.prototype[Symbol.iterator] = function() {
      return je(this, function(t) {
        switch (t.label) {
          case 0:
            return this.length ? [4, this.pop()] : [3, 2];
          case 1:
            return t.sent(), [3, 0];
          case 2:
            return [
              2
              /*return*/
            ];
        }
      });
    }, i.prototype.iterator = function() {
      return this.toArray();
    }, i.prototype._applyLimit = function() {
      if (this._limit > 0 && this._limit < this.heapArray.length)
        for (var t = this.heapArray.length - this._limit; t; )
          this.heapArray.pop(), --t;
    }, i.prototype._bottomN_push = function(t) {
      var e = new i(this.compare);
      e.limit = t, e.heapArray = this.heapArray.slice(-t), e.init();
      for (var r = this.heapArray.length - 1 - t, n = i.getParentIndexOf(r), s = [], a = r; a > n; --a)
        s.push(a);
      for (var c = this.heapArray; s.length; ) {
        var a = s.shift();
        this.compare(c[a], e.peek()) > 0 && (e.replace(c[a]), a % 2 && s.push(i.getParentIndexOf(a)));
      }
      return e.toArray();
    }, i.prototype._moveNode = function(t, e) {
      var r;
      r = Z([this.heapArray[e], this.heapArray[t]], 2), this.heapArray[t] = r[0], this.heapArray[e] = r[1];
    }, i.prototype._sortNodeDown = function(t) {
      for (var e = this.heapArray.length; ; ) {
        var r = 2 * t + 1, n = r + 1, s = t;
        if (r < e && this.compare(this.heapArray[r], this.heapArray[s]) < 0 && (s = r), n < e && this.compare(this.heapArray[n], this.heapArray[s]) < 0 && (s = n), s === t)
          break;
        this._moveNode(t, s), t = s;
      }
    }, i.prototype._sortNodeUp = function(t) {
      for (; t > 0; ) {
        var e = i.getParentIndexOf(t);
        if (this.compare(this.heapArray[t], this.heapArray[e]) < 0)
          this._moveNode(t, e), t = e;
        else
          break;
      }
    }, i.prototype._topN_push = function(t) {
      var e = new i(this._invertedCompare);
      e.limit = t;
      for (var r = [0], n = this.heapArray; r.length; ) {
        var s = r.shift();
        s < n.length && (e.length < t ? (e.push(n[s]), r.push.apply(r, et([], Z(i.getChildrenIndexOf(s)), !1))) : this.compare(n[s], e.peek()) < 0 && (e.replace(n[s]), r.push.apply(r, et([], Z(i.getChildrenIndexOf(s)), !1))));
      }
      return e.toArray();
    }, i.prototype._topN_fill = function(t) {
      var e = this.heapArray, r = new i(this._invertedCompare);
      r.limit = t, r.heapArray = e.slice(0, t), r.init();
      for (var n = i.getParentIndexOf(t - 1) + 1, s = [], a = n; a < t; ++a)
        s.push.apply(s, et([], Z(i.getChildrenIndexOf(a).filter(function(c) {
          return c < e.length;
        })), !1));
      for ((t - 1) % 2 && s.push(t); s.length; ) {
        var a = s.shift();
        a < e.length && this.compare(e[a], r.peek()) < 0 && (r.replace(e[a]), s.push.apply(s, et([], Z(i.getChildrenIndexOf(a)), !1)));
      }
      return r.toArray();
    }, i.prototype._topN_heap = function(t) {
      for (var e = this.clone(), r = [], n = 0; n < t; ++n)
        r.push(e.pop());
      return r;
    }, i.prototype._topIdxOf = function(t) {
      if (!t.length)
        return -1;
      for (var e = 0, r = t[e], n = 1; n < t.length; ++n) {
        var s = this.compare(t[n], r);
        s < 0 && (e = n, r = t[n]);
      }
      return e;
    }, i.prototype._topOf = function() {
      for (var t = [], e = 0; e < arguments.length; e++)
        t[e] = arguments[e];
      var r = new i(this.compare);
      return r.init(t), r.peek();
    }, i;
  }()
);
const qe = typeof DataView.prototype.getBigUint64 == "function" ? DataView.prototype.getBigUint64 : function(i, t) {
  const e = t === !0 ? this.getUint32(i, t) : this.getUint32(i + 4, t), r = t === !0 ? this.getUint32(i + 4, t) : this.getUint32(i, t);
  return BigInt(r) << 32n | BigInt(e);
};
class ie {
  constructor(t, e = 0) {
    this.textDecoder = new TextDecoder(), this.view = t, this.offset = e;
  }
  uint8() {
    const t = this.view.getUint8(this.offset);
    return this.offset += 1, t;
  }
  uint16() {
    const t = this.view.getUint16(this.offset, !0);
    return this.offset += 2, t;
  }
  uint32() {
    const t = this.view.getUint32(this.offset, !0);
    return this.offset += 4, t;
  }
  uint64() {
    const t = qe.call(this.view, this.offset, !0);
    return this.offset += 8, t;
  }
  string() {
    const t = this.uint32();
    if (this.offset + t > this.view.byteLength)
      throw new Error(`String length ${t} exceeds bounds of buffer`);
    const e = this.textDecoder.decode(new Uint8Array(this.view.buffer, this.view.byteOffset + this.offset, t));
    return this.offset += t, e;
  }
  keyValuePairs(t, e) {
    const r = this.uint32();
    if (this.offset + r > this.view.byteLength)
      throw new Error(`Key-value pairs length ${r} exceeds bounds of buffer`);
    const n = [], s = this.offset + r;
    try {
      for (; this.offset < s; )
        n.push([t(this), e(this)]);
    } catch (a) {
      throw new Error(`Error reading key-value pairs: ${a.message}`);
    }
    if (this.offset !== s)
      throw new Error(`Key-value pairs length (${this.offset - s + r}) greater than expected (${r})`);
    return n;
  }
  map(t, e) {
    const r = this.uint32();
    if (this.offset + r > this.view.byteLength)
      throw new Error(`Map length ${r} exceeds bounds of buffer`);
    const n = /* @__PURE__ */ new Map(), s = this.offset + r;
    try {
      for (; this.offset < s; ) {
        const a = t(this), c = e(this), f = n.get(a);
        if (f != null)
          throw new Error(`Duplicate key ${String(a)} (${String(f)} vs ${String(c)})`);
        n.set(a, c);
      }
    } catch (a) {
      throw new Error(`Error reading map: ${a.message}`);
    }
    if (this.offset !== s)
      throw new Error(`Map length (${this.offset - s + r}) greater than expected (${r})`);
    return n;
  }
}
const K = Object.freeze([137, 77, 67, 65, 80, 48, 13, 10]);
var D;
(function(i) {
  i[i.MIN = 1] = "MIN", i[i.HEADER = 1] = "HEADER", i[i.FOOTER = 2] = "FOOTER", i[i.SCHEMA = 3] = "SCHEMA", i[i.CHANNEL = 4] = "CHANNEL", i[i.MESSAGE = 5] = "MESSAGE", i[i.CHUNK = 6] = "CHUNK", i[i.MESSAGE_INDEX = 7] = "MESSAGE_INDEX", i[i.CHUNK_INDEX = 8] = "CHUNK_INDEX", i[i.ATTACHMENT = 9] = "ATTACHMENT", i[i.ATTACHMENT_INDEX = 10] = "ATTACHMENT_INDEX", i[i.STATISTICS = 11] = "STATISTICS", i[i.METADATA = 12] = "METADATA", i[i.METADATA_INDEX = 13] = "METADATA_INDEX", i[i.SUMMARY_OFFSET = 14] = "SUMMARY_OFFSET", i[i.DATA_END = 15] = "DATA_END", i[i.MAX = 15] = "MAX";
})(D || (D = {}));
function we(i) {
  return i >= D.MIN && i <= D.MAX;
}
const Ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MCAP_MAGIC: K,
  get Opcode() {
    return D;
  },
  isKnownOpcode: we
}, Symbol.toStringTag, { value: "Module" }));
function Bt(i, t) {
  if (t + K.length > i.byteLength)
    return { usedBytes: 0 };
  if (!K.every((e, r) => e === i.getUint8(t + r)))
    throw new Error(`Expected MCAP magic '${K.map((e) => e.toString(16).padStart(2, "0")).join(" ")}', found '${Array.from(K, (e, r) => i.getUint8(t + r).toString(16).padStart(2, "0")).join(" ")}'`);
  return {
    magic: { specVersion: "0" },
    usedBytes: K.length
  };
}
function at({ view: i, startOffset: t, validateCrcs: e }) {
  if (t + /*opcode*/
  1 + /*record content length*/
  8 >= i.byteLength)
    return { usedBytes: 0 };
  const r = new ie(i, t), n = r.uint8(), s = r.uint64();
  if (s > Number.MAX_SAFE_INTEGER)
    throw new Error(`Record content length ${s} is too large`);
  const a = r.offset + Number(s);
  if (a > i.byteLength)
    return { usedBytes: 0 };
  if (!we(n))
    return { record: {
      type: "Unknown",
      opcode: n,
      data: new Uint8Array(i.buffer, i.byteOffset + r.offset, Number(s))
    }, usedBytes: a - t };
  const c = new DataView(i.buffer, i.byteOffset + r.offset, Number(s)), f = new ie(c);
  switch (n) {
    case D.HEADER: {
      const h = f.string(), o = f.string();
      return { record: { type: "Header", profile: h, library: o }, usedBytes: a - t };
    }
    case D.FOOTER: {
      const h = f.uint64(), o = f.uint64(), u = f.uint32();
      return { record: {
        type: "Footer",
        summaryStart: h,
        summaryOffsetStart: o,
        summaryCrc: u
      }, usedBytes: a - t };
    }
    case D.SCHEMA: {
      const h = f.uint16(), o = f.string(), u = f.string(), y = f.uint32();
      if (f.offset + y > c.byteLength)
        throw new Error(`Schema data length ${y} exceeds bounds of record`);
      const l = new Uint8Array(c.buffer.slice(c.byteOffset + f.offset, c.byteOffset + f.offset + y));
      return f.offset += y, { record: {
        type: "Schema",
        id: h,
        encoding: u,
        name: o,
        data: l
      }, usedBytes: a - t };
    }
    case D.CHANNEL: {
      const h = f.uint16(), o = f.uint16(), u = f.string(), y = f.string(), l = f.map((p) => p.string(), (p) => p.string());
      return { record: {
        type: "Channel",
        id: h,
        schemaId: o,
        topic: u,
        messageEncoding: y,
        metadata: l
      }, usedBytes: a - t };
    }
    case D.MESSAGE: {
      const h = f.uint16(), o = f.uint32(), u = f.uint64(), y = f.uint64(), l = new Uint8Array(c.buffer.slice(c.byteOffset + f.offset, c.byteOffset + c.byteLength));
      return { record: {
        type: "Message",
        channelId: h,
        sequence: o,
        logTime: u,
        publishTime: y,
        data: l
      }, usedBytes: a - t };
    }
    case D.CHUNK: {
      const h = f.uint64(), o = f.uint64(), u = f.uint64(), y = f.uint32(), l = f.string(), d = Number(f.uint64());
      if (d + f.offset > c.byteLength)
        throw new Error("Chunk records length exceeds remaining record size");
      const p = new Uint8Array(c.buffer.slice(c.byteOffset + f.offset, c.byteOffset + f.offset + d));
      return { record: {
        type: "Chunk",
        messageStartTime: h,
        messageEndTime: o,
        compression: l,
        uncompressedSize: u,
        uncompressedCrc: y,
        records: p
      }, usedBytes: a - t };
    }
    case D.MESSAGE_INDEX: {
      const h = f.uint16(), o = f.keyValuePairs((y) => y.uint64(), (y) => y.uint64());
      return { record: {
        type: "MessageIndex",
        channelId: h,
        records: o
      }, usedBytes: a - t };
    }
    case D.CHUNK_INDEX: {
      const h = f.uint64(), o = f.uint64(), u = f.uint64(), y = f.uint64(), l = f.map((E) => E.uint16(), (E) => E.uint64()), d = f.uint64(), p = f.string(), g = f.uint64(), b = f.uint64();
      return { record: {
        type: "ChunkIndex",
        messageStartTime: h,
        messageEndTime: o,
        chunkStartOffset: u,
        chunkLength: y,
        messageIndexOffsets: l,
        messageIndexLength: d,
        compression: p,
        compressedSize: g,
        uncompressedSize: b
      }, usedBytes: a - t };
    }
    case D.ATTACHMENT: {
      const h = f.uint64(), o = f.uint64(), u = f.string(), y = f.string(), l = f.uint64();
      if (BigInt(c.byteOffset + f.offset) + l > Number.MAX_SAFE_INTEGER)
        throw new Error(`Attachment too large: ${l}`);
      if (f.offset + Number(l) + 4 > c.byteLength)
        throw new Error(`Attachment data length ${l} exceeds bounds of record`);
      const d = new Uint8Array(c.buffer.slice(c.byteOffset + f.offset, c.byteOffset + f.offset + Number(l)));
      f.offset += Number(l);
      const p = f.offset, g = f.uint32();
      if (e && g !== 0) {
        const A = Lt(new DataView(c.buffer, c.byteOffset, p));
        if (A !== g)
          throw new Error(`Attachment CRC32 mismatch: expected ${g}, actual ${A}`);
      }
      return { record: {
        type: "Attachment",
        logTime: h,
        createTime: o,
        name: u,
        mediaType: y,
        data: d
      }, usedBytes: a - t };
    }
    case D.ATTACHMENT_INDEX: {
      const h = f.uint64(), o = f.uint64(), u = f.uint64(), y = f.uint64(), l = f.uint64(), d = f.string(), p = f.string();
      return { record: {
        type: "AttachmentIndex",
        offset: h,
        length: o,
        logTime: u,
        createTime: y,
        dataSize: l,
        name: d,
        mediaType: p
      }, usedBytes: a - t };
    }
    case D.STATISTICS: {
      const h = f.uint64(), o = f.uint16(), u = f.uint32(), y = f.uint32(), l = f.uint32(), d = f.uint32(), p = f.uint64(), g = f.uint64(), b = f.map((E) => E.uint16(), (E) => E.uint64());
      return { record: {
        type: "Statistics",
        messageCount: h,
        schemaCount: o,
        channelCount: u,
        attachmentCount: y,
        metadataCount: l,
        chunkCount: d,
        messageStartTime: p,
        messageEndTime: g,
        channelMessageCounts: b
      }, usedBytes: a - t };
    }
    case D.METADATA: {
      const h = f.string();
      return { record: { type: "Metadata", metadata: f.map((y) => y.string(), (y) => y.string()), name: h }, usedBytes: a - t };
    }
    case D.METADATA_INDEX: {
      const h = f.uint64(), o = f.uint64(), u = f.string();
      return { record: {
        type: "MetadataIndex",
        offset: h,
        length: o,
        name: u
      }, usedBytes: a - t };
    }
    case D.SUMMARY_OFFSET: {
      const h = f.uint8(), o = f.uint64(), u = f.uint64();
      return { record: {
        type: "SummaryOffset",
        groupOpcode: h,
        groupStart: o,
        groupLength: u
      }, usedBytes: a - t };
    }
    case D.DATA_END:
      return { record: {
        type: "DataEnd",
        dataSectionCrc: f.uint32()
      }, usedBytes: a - t };
  }
}
function ne(i, t, e) {
  let r = 0, n = i.length;
  if (n === 0)
    return 0;
  const s = e(t);
  for (; r < n; ) {
    const a = r + n >>> 1;
    e(i[a][0]) < s ? r = a + 1 : n = a;
  }
  return n;
}
class Xe {
  constructor(t) {
    if (this.chunkIndex = t.chunkIndex, this.relevantChannels = t.relevantChannels, this.startTime = t.startTime, this.endTime = t.endTime, this.reverse = t.reverse, this.chunkIndex.messageIndexLength === 0n)
      throw new Error("Chunks without message indexes are not currently supported");
  }
  /**
   * Returns `< 0` if the callee's next available message logTime is earlier than `other`'s, `> 0`
   * for the opposite case. Never returns `0` because ties are broken by the chunks' offsets in the
   * file.
   *
   * Cursors that still need `loadMessageIndexes()` are sorted earlier so the caller can load them
   * and re-sort the cursors.
   */
  compare(t) {
    if (this.reverse !== t.reverse)
      throw new Error("Cannot compare a reversed ChunkCursor to a non-reversed ChunkCursor");
    let e = Number(this.getSortTime() - t.getSortTime());
    return e === 0 && (e = Number(this.chunkIndex.chunkStartOffset - t.chunkIndex.chunkStartOffset)), this.reverse ? -e : e;
  }
  /**
   * Returns true if there are more messages available in the chunk. Message indexes must have been
   * loaded before using this method.
   */
  hasMoreMessages() {
    if (!this.messageIndexCursors)
      throw new Error("loadMessageIndexes() must be called before hasMore()");
    return this.messageIndexCursors.size() > 0;
  }
  /**
   * Pop a message offset off of the chunk cursor. Message indexes must have been loaded before
   * using this method.
   */
  popMessage() {
    if (!this.messageIndexCursors)
      throw new Error("loadMessageIndexes() must be called before popMessage()");
    const t = this.messageIndexCursors.peek();
    if (!t)
      throw new Error(`Unexpected popMessage() call when no more messages are available, in chunk at offset ${this.chunkIndex.chunkStartOffset}`);
    const e = t.records[t.index], [r] = e;
    if (this.startTime != null && r < this.startTime)
      throw new Error(`Encountered message with logTime (${r}) prior to startTime (${this.startTime}) in chunk at offset ${this.chunkIndex.chunkStartOffset}`);
    if (this.endTime != null && r > this.endTime)
      throw new Error(`Encountered message with logTime (${r}) after endTime (${this.endTime}) in chunk at offset ${this.chunkIndex.chunkStartOffset}`);
    const n = t.records[t.index + 1];
    if (n && this.reverse) {
      if (this.startTime == null || n[0] >= this.startTime)
        return t.index++, this.messageIndexCursors.replace(t), e;
    } else if (n && (this.endTime == null || n[0] <= this.endTime))
      return t.index++, this.messageIndexCursors.replace(t), e;
    return this.messageIndexCursors.pop(), e;
  }
  /**
   * Returns true if message indexes have been loaded, false if `loadMessageIndexes()` needs to be
   * called.
   */
  hasMessageIndexes() {
    return this.messageIndexCursors != null;
  }
  async loadMessageIndexes(t) {
    const e = this.reverse;
    this.messageIndexCursors = new be((h, o) => {
      var l, d;
      const u = (l = h.records[h.index]) == null ? void 0 : l[0], y = (d = o.records[o.index]) == null ? void 0 : d[0];
      return e ? u == null ? -1 : y == null ? 1 : Number(y - u) : u == null ? 1 : y == null ? -1 : Number(u - y);
    });
    let r, n;
    for (const [h, o] of this.chunkIndex.messageIndexOffsets)
      (r == null || o < r) && (r = o), (!this.relevantChannels || this.relevantChannels.has(h)) && (n == null || o < n) && (n = o);
    if (r == null || n == null)
      return;
    const s = r + this.chunkIndex.messageIndexLength, a = await t.read(n, s - n), c = new DataView(a.buffer, a.byteOffset, a.byteLength);
    let f = 0;
    for (let h; h = at({ view: c, startOffset: f, validateCrcs: !0 }), h.record; f += h.usedBytes) {
      if (h.record.type !== "MessageIndex" || h.record.records.length === 0 || this.relevantChannels && !this.relevantChannels.has(h.record.channelId))
        continue;
      h.record.records.sort(([u], [y]) => Number(u - y)), e && h.record.records.reverse();
      for (let u = 0; u < h.record.records.length; u++) {
        const [y] = h.record.records[u];
        if (y < this.chunkIndex.messageStartTime)
          throw new Error(`Encountered message index entry in channel ${h.record.channelId} with logTime (${y}) earlier than chunk messageStartTime (${this.chunkIndex.messageStartTime}) in chunk at offset ${this.chunkIndex.chunkStartOffset}`);
        if (y > this.chunkIndex.messageEndTime)
          throw new Error(`Encountered message index entry in channel ${h.record.channelId} with logTime (${y}) later than chunk messageEndTime (${this.chunkIndex.messageEndTime}) in chunk at offset ${this.chunkIndex.chunkStartOffset}`);
      }
      let o = 0;
      if (e ? this.endTime != null && (o = ne(h.record.records, this.endTime, (u) => -u)) : this.startTime != null && (o = ne(h.record.records, this.startTime, (u) => u)), !(o >= h.record.records.length)) {
        if (e) {
          if (this.startTime != null && h.record.records[o][0] < this.startTime)
            continue;
        } else if (this.endTime != null && h.record.records[o][0] > this.endTime)
          continue;
        this.messageIndexCursors.push({
          index: o,
          channelId: h.record.channelId,
          records: h.record.records
        });
      }
    }
    if (f !== c.byteLength)
      throw new Error(`${c.byteLength - f} bytes remaining in message index section`);
  }
  getSortTime() {
    if (!this.messageIndexCursors)
      return this.reverse ? this.chunkIndex.messageEndTime : this.chunkIndex.messageStartTime;
    const t = this.messageIndexCursors.peek();
    if (!t)
      throw new Error(`Unexpected empty cursor for chunk at offset ${this.chunkIndex.chunkStartOffset}`);
    return t.records[t.index][0];
  }
}
let Ke = class Ae {
  constructor(t) {
    this.metadataIndexes = [], this.readable = t.readable, this.chunkIndexes = t.chunkIndexes, this.attachmentIndexes = t.attachmentIndexes, this.metadataIndexes = t.metadataIndexes, this.statistics = t.statistics, this.decompressHandlers = t.decompressHandlers, this.channelsById = t.channelsById, this.schemasById = t.schemasById, this.summaryOffsetsByOpcode = t.summaryOffsetsByOpcode, this.header = t.header, this.footer = t.footer;
    for (const e of t.chunkIndexes)
      (this.messageStartTime == null || e.messageStartTime < this.messageStartTime) && (this.messageStartTime = e.messageStartTime), (this.messageEndTime == null || e.messageEndTime > this.messageEndTime) && (this.messageEndTime = e.messageEndTime);
    for (const e of t.attachmentIndexes)
      (this.attachmentStartTime == null || e.logTime < this.attachmentStartTime) && (this.attachmentStartTime = e.logTime), (this.attachmentEndTime == null || e.logTime > this.attachmentEndTime) && (this.attachmentEndTime = e.logTime);
  }
  errorWithLibrary(t) {
    return new Error(`${t} [library=${this.header.library}]`);
  }
  static async Initialize({ readable: t, decompressHandlers: e }) {
    var T, B, M, S;
    const r = await t.size();
    let n;
    {
      const v = await t.read(0n, BigInt(K.length + /* Opcode.HEADER */
      1 + /* record content length */
      8)), R = new DataView(v.buffer, v.byteOffset, v.byteLength);
      Bt(R, 0);
      const V = R.getBigUint64(K.length + /* Opcode.HEADER */
      1, !0), F = await t.read(
        BigInt(K.length),
        /* Opcode.HEADER */
        1n + /* record content length */
        8n + V
      ), tt = at({
        view: new DataView(F.buffer, F.byteOffset, F.byteLength),
        startOffset: 0,
        validateCrcs: !0
      });
      if (((T = tt.record) == null ? void 0 : T.type) !== "Header")
        throw new Error(`Unable to read header at beginning of file; found ${((B = tt.record) == null ? void 0 : B.type) ?? "nothing"}`);
      if (tt.usedBytes !== F.byteLength)
        throw new Error(`${F.byteLength - tt.usedBytes} bytes remaining after parsing header`);
      n = tt.record;
    }
    function s(v) {
      return new Error(`${v} [library=${n.library}]`);
    }
    let a, c;
    {
      const v = BigInt(K.length + /* Opcode.HEADER */
      1 + /* record content length */
      8 + /* profile length */
      4 + /* library length */
      4), R = BigInt(
        /* Opcode.FOOTER */
        29 + K.length
      );
      if (r < v + R)
        throw s(`File size (${r}) is too small to be valid MCAP`);
      a = r - R;
      const V = await t.read(a, R);
      c = new DataView(V.buffer, V.byteOffset, V.byteLength);
    }
    try {
      Bt(c, c.byteLength - K.length);
    } catch (v) {
      throw s(v.message);
    }
    let f;
    {
      const v = at({
        view: c,
        startOffset: 0,
        validateCrcs: !0
      });
      if (((M = v.record) == null ? void 0 : M.type) !== "Footer")
        throw s(`Unable to read footer from end of file (offset ${a}); found ${((S = v.record) == null ? void 0 : S.type) ?? "nothing"}`);
      if (v.usedBytes !== c.byteLength - K.length)
        throw s(`${c.byteLength - K.length - v.usedBytes} bytes remaining after parsing footer`);
      f = v.record;
    }
    if (f.summaryStart === 0n)
      throw s("File is not indexed");
    const h = new Uint8Array(
      /* Opcode.FOOTER */
      25
    );
    h.set(new Uint8Array(c.buffer, c.byteOffset, h.byteLength));
    const o = await t.read(f.summaryStart, a - f.summaryStart);
    if (f.summaryCrc !== 0) {
      let v = Nt();
      if (v = Y(v, o), v = Y(v, h), v = Ft(v), v !== f.summaryCrc)
        throw s(`Incorrect summary CRC ${v} (expected ${f.summaryCrc})`);
    }
    const u = new DataView(o.buffer, o.byteOffset, o.byteLength), y = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), d = [], p = [], g = [], b = /* @__PURE__ */ new Map();
    let A, E = 0;
    for (let v; v = at({ view: u, startOffset: E, validateCrcs: !0 }), v.record; E += v.usedBytes)
      switch (v.record.type) {
        case "Schema":
          l.set(v.record.id, v.record);
          break;
        case "Channel":
          y.set(v.record.id, v.record);
          break;
        case "ChunkIndex":
          d.push(v.record);
          break;
        case "AttachmentIndex":
          p.push(v.record);
          break;
        case "MetadataIndex":
          g.push(v.record);
          break;
        case "Statistics":
          if (A)
            throw s("Duplicate Statistics record");
          A = v.record;
          break;
        case "SummaryOffset":
          b.set(v.record.groupOpcode, v.record);
          break;
        case "Header":
        case "Footer":
        case "Message":
        case "Chunk":
        case "MessageIndex":
        case "Attachment":
        case "Metadata":
        case "DataEnd":
          throw s(`${v.record.type} record not allowed in index section`);
      }
    if (E !== u.byteLength)
      throw s(`${u.byteLength - E} bytes remaining in index section`);
    return new Ae({
      readable: t,
      chunkIndexes: d,
      attachmentIndexes: p,
      metadataIndexes: g,
      statistics: A,
      decompressHandlers: e,
      channelsById: y,
      schemasById: l,
      summaryOffsetsByOpcode: b,
      header: n,
      footer: f
    });
  }
  async *readMessages(t = {}) {
    const { topics: e, startTime: r = this.messageStartTime, endTime: n = this.messageEndTime, reverse: s = !1, validateCrcs: a } = t;
    if (r == null || n == null)
      return;
    let c;
    if (e) {
      c = /* @__PURE__ */ new Set();
      for (const o of this.channelsById.values())
        e.includes(o.topic) && c.add(o.id);
    }
    const f = new be((o, u) => o.compare(u));
    for (const o of this.chunkIndexes)
      o.messageStartTime <= n && o.messageEndTime >= r && f.push(new Xe({ chunkIndex: o, relevantChannels: c, startTime: r, endTime: n, reverse: s }));
    const h = /* @__PURE__ */ new Map();
    for (let o; o = f.peek(); ) {
      if (!o.hasMessageIndexes()) {
        await o.loadMessageIndexes(this.readable), o.hasMoreMessages() ? f.replace(o) : f.pop();
        continue;
      }
      let u = h.get(o.chunkIndex.chunkStartOffset);
      u || (u = await this.loadChunkData(o.chunkIndex, {
        validateCrcs: a ?? !0
      }), h.set(o.chunkIndex.chunkStartOffset, u));
      const [y, l] = o.popMessage();
      if (l >= BigInt(u.byteLength))
        throw this.errorWithLibrary(`Message offset beyond chunk bounds (log time ${y}, offset ${l}, chunk data length ${u.byteLength}) in chunk at offset ${o.chunkIndex.chunkStartOffset}`);
      const d = at({
        view: u,
        startOffset: Number(l),
        validateCrcs: a ?? !0
      });
      if (!d.record)
        throw this.errorWithLibrary(`Unable to parse record at offset ${l} in chunk at offset ${o.chunkIndex.chunkStartOffset}`);
      if (d.record.type !== "Message")
        throw this.errorWithLibrary(`Unexpected record type ${d.record.type} in message index (time ${y}, offset ${l} in chunk at offset ${o.chunkIndex.chunkStartOffset})`);
      if (d.record.logTime !== y)
        throw this.errorWithLibrary(`Message log time ${d.record.logTime} did not match message index entry (${y} at offset ${l} in chunk at offset ${o.chunkIndex.chunkStartOffset})`);
      yield d.record, o.hasMoreMessages() ? f.replace(o) : (f.pop(), h.delete(o.chunkIndex.chunkStartOffset));
    }
  }
  async *readMetadata(t = {}) {
    var r, n;
    const { name: e } = t;
    for (const s of this.metadataIndexes) {
      if (e != null && s.name !== e)
        continue;
      const a = await this.readable.read(s.offset, s.length), c = at({
        view: new DataView(a.buffer, a.byteOffset, a.byteLength),
        startOffset: 0,
        validateCrcs: !1
      });
      if (((r = c.record) == null ? void 0 : r.type) !== "Metadata")
        throw this.errorWithLibrary(`Metadata data at offset ${s.offset} does not point to metadata record (found ${String((n = c.record) == null ? void 0 : n.type)})`);
      yield c.record;
    }
  }
  async *readAttachments(t = {}) {
    var c, f;
    const { name: e, mediaType: r, startTime: n = this.attachmentStartTime, endTime: s = this.attachmentEndTime, validateCrcs: a } = t;
    if (!(n == null || s == null))
      for (const h of this.attachmentIndexes) {
        if (e != null && h.name !== e || r != null && h.mediaType !== r || h.logTime > s || h.logTime < n)
          continue;
        const o = await this.readable.read(h.offset, h.length), u = at({
          view: new DataView(o.buffer, o.byteOffset, o.byteLength),
          startOffset: 0,
          validateCrcs: a ?? !0
        });
        if (((c = u.record) == null ? void 0 : c.type) !== "Attachment")
          throw this.errorWithLibrary(`Attachment data at offset ${h.offset} does not point to attachment record (found ${String((f = u.record) == null ? void 0 : f.type)})`);
        yield u.record;
      }
  }
  async loadChunkData(t, e) {
    var c, f, h;
    const r = await this.readable.read(t.chunkStartOffset, t.chunkLength), n = at({
      view: new DataView(r.buffer, r.byteOffset, r.byteLength),
      startOffset: 0,
      validateCrcs: (e == null ? void 0 : e.validateCrcs) ?? !0
    });
    if (((c = n.record) == null ? void 0 : c.type) !== "Chunk")
      throw this.errorWithLibrary(`Chunk start offset ${t.chunkStartOffset} does not point to chunk record (found ${String((f = n.record) == null ? void 0 : f.type)})`);
    const s = n.record;
    let a = s.records;
    if (s.compression !== "" && a.byteLength > 0) {
      const o = (h = this.decompressHandlers) == null ? void 0 : h[s.compression];
      if (!o)
        throw this.errorWithLibrary(`Unsupported compression ${s.compression}`);
      a = o(a, s.uncompressedSize);
    }
    if (s.uncompressedCrc !== 0 && (e == null ? void 0 : e.validateCrcs) !== !1) {
      const o = Lt(a);
      if (o !== s.uncompressedCrc)
        throw this.errorWithLibrary(`Incorrect chunk CRC ${o} (expected ${s.uncompressedCrc})`);
    }
    return new DataView(a.buffer, a.byteOffset, a.byteLength);
  }
};
class Ze {
  constructor(t = 0) {
    this.buffer = new ArrayBuffer(t), this.view = new DataView(this.buffer, 0, 0);
  }
  bytesRemaining() {
    return this.view.byteLength;
  }
  /** Mark some data as consumed, so the memory can be reused when new data is appended. */
  consume(t) {
    this.view = new DataView(this.buffer, this.view.byteOffset + t, this.view.byteLength - t);
  }
  /** Add data to the buffer, shifting existing data or reallocating if necessary. */
  append(t) {
    if (this.view.byteOffset + this.view.byteLength + t.byteLength <= this.buffer.byteLength)
      new Uint8Array(this.view.buffer, this.view.byteOffset).set(t, this.view.byteLength), this.view = new DataView(this.buffer, this.view.byteOffset, this.view.byteLength + t.byteLength);
    else if (this.view.byteLength + t.byteLength <= this.buffer.byteLength) {
      const e = new Uint8Array(this.buffer, this.view.byteOffset, this.view.byteLength), r = new Uint8Array(this.buffer);
      r.set(e, 0), r.set(t, e.byteLength), this.view = new DataView(this.buffer, 0, this.view.byteLength + t.byteLength);
    } else {
      const e = new Uint8Array(this.buffer, this.view.byteOffset, this.view.byteLength);
      this.buffer = new ArrayBuffer((this.view.byteLength + t.byteLength) * 2);
      const r = new Uint8Array(this.buffer);
      r.set(e, 0), r.set(t, e.byteLength), this.view = new DataView(this.buffer, 0, this.view.byteLength + t.byteLength);
    }
  }
}
let Je = class {
  constructor({ includeChunks: t = !1, decompressHandlers: e = {}, validateCrcs: r = !0, noMagicPrefix: n = !1 } = {}) {
    this.buffer = new Ze(K.length * 2), this.doneReading = !1, this.generator = this.read(), this.channelsById = /* @__PURE__ */ new Map(), this.includeChunks = t, this.decompressHandlers = e, this.validateCrcs = r, this.noMagicPrefix = n;
  }
  /** @returns True if a valid, complete mcap file has been parsed. */
  done() {
    return this.doneReading;
  }
  /** @returns The number of bytes that have been received by `append()` but not yet parsed. */
  bytesRemaining() {
    return this.buffer.bytesRemaining();
  }
  /**
   * Provide the reader with newly received bytes for it to process. After calling this function,
   * call `nextRecord()` again to parse any records that are now available.
   */
  append(t) {
    if (this.doneReading)
      throw new Error("Already done reading");
    this.buffer.append(t);
  }
  /**
   * Read the next record from the stream if possible. If not enough data is available to parse a
   * complete record, or if the reading has terminated with a valid footer, returns undefined.
   *
   * This function may throw any errors encountered during parsing. If an error is thrown, the
   * reader is in an unspecified state and should no longer be used.
   */
  nextRecord() {
    var e, r;
    if (this.doneReading)
      return;
    const t = this.generator.next();
    if (((e = t.value) == null ? void 0 : e.type) === "Channel") {
      const n = this.channelsById.get(t.value.id);
      if (this.channelsById.set(t.value.id, t.value), n && !Qe(n, t.value))
        throw new Error(`Channel record for id ${t.value.id} (topic: ${t.value.topic}) differs from previous channel record of the same id.`);
    } else if (((r = t.value) == null ? void 0 : r.type) === "Message") {
      const n = t.value.channelId;
      if (!this.channelsById.get(n))
        throw new Error(`Encountered message on channel ${n} without prior channel record`);
    }
    return t.done === !0 && (this.doneReading = !0), t.value;
  }
  *read() {
    if (!this.noMagicPrefix) {
      let r, n;
      for (; { magic: r, usedBytes: n } = Bt(this.buffer.view, 0), !r; )
        yield;
      this.buffer.consume(n);
    }
    let t;
    function e(r) {
      return new Error(`${r} ${t ? `[library=${t.library}]` : "[no header]"}`);
    }
    for (; ; ) {
      let r;
      {
        let n;
        for (; { record: r, usedBytes: n } = at({
          view: this.buffer.view,
          startOffset: 0,
          validateCrcs: this.validateCrcs
        }), !r; )
          yield;
        this.buffer.consume(n);
      }
      switch (r.type) {
        case "Unknown":
          break;
        case "Header":
          if (t)
            throw new Error(`Duplicate Header record: library=${t.library} profile=${t.profile} vs. library=${r.library} profile=${r.profile}`);
          t = r, yield r;
          break;
        case "Schema":
        case "Channel":
        case "Message":
        case "MessageIndex":
        case "ChunkIndex":
        case "Attachment":
        case "AttachmentIndex":
        case "Statistics":
        case "Metadata":
        case "MetadataIndex":
        case "SummaryOffset":
        case "DataEnd":
          yield r;
          break;
        case "Chunk": {
          this.includeChunks && (yield r);
          let n = r.records;
          if (r.compression !== "" && n.byteLength > 0) {
            const c = this.decompressHandlers[r.compression];
            if (!c)
              throw e(`Unsupported compression ${r.compression}`);
            n = c(n, r.uncompressedSize);
          }
          if (this.validateCrcs && r.uncompressedCrc !== 0) {
            const c = Lt(n);
            if (c !== r.uncompressedCrc)
              throw e(`Incorrect chunk CRC ${c} (expected ${r.uncompressedCrc})`);
          }
          const s = new DataView(n.buffer, n.byteOffset, n.byteLength);
          let a = 0;
          for (let c; c = at({
            view: s,
            startOffset: a,
            validateCrcs: this.validateCrcs
          }), c.record; a += c.usedBytes)
            switch (c.record.type) {
              case "Unknown":
                break;
              case "Header":
              case "Footer":
              case "Chunk":
              case "MessageIndex":
              case "ChunkIndex":
              case "Attachment":
              case "AttachmentIndex":
              case "Statistics":
              case "Metadata":
              case "MetadataIndex":
              case "SummaryOffset":
              case "DataEnd":
                throw e(`${c.record.type} record not allowed inside a chunk`);
              case "Schema":
              case "Channel":
              case "Message":
                yield c.record;
                break;
            }
          if (a !== n.byteLength)
            throw e(`${n.byteLength - a} bytes remaining in chunk`);
          break;
        }
        case "Footer":
          try {
            let n, s;
            for (; { magic: n, usedBytes: s } = Bt(this.buffer.view, 0), !n; )
              yield;
            this.buffer.consume(s);
          } catch (n) {
            throw e(n.message);
          }
          if (this.buffer.bytesRemaining() !== 0)
            throw e(`${this.buffer.bytesRemaining()} bytes remaining after MCAP footer and trailing magic`);
          return r;
      }
    }
  }
};
function Qe(i, t) {
  if (!(i.id === t.id && i.messageEncoding === t.messageEncoding && i.schemaId === t.schemaId && i.topic === t.topic && i.metadata.size === t.metadata.size))
    return !1;
  for (const [e, r] of i.metadata.entries()) {
    const n = t.metadata.get(e);
    if (r !== n)
      return !1;
  }
  return !0;
}
const mt = !0;
class tr {
  constructor() {
    this.fullBuffer = new Uint8Array(4096), this.textEncoder = new TextEncoder(), this.offset = 0, this.view = new DataView(this.fullBuffer.buffer);
  }
  /**
   * Length in bytes of the written buffer
   */
  get length() {
    return this.offset;
  }
  /** Returns a copy of the written data. */
  get buffer() {
    return this.fullBuffer.slice(0, this.offset);
  }
  /** Returns a temporary view into the underlying buffer (not a copy). */
  bufferView(t, e) {
    return new Uint8Array(this.fullBuffer.buffer, t, e);
  }
  int8(t) {
    return this.ensureAdditionalCapacity(1), this.view.setInt8(this.offset, t), this.offset += 1, this;
  }
  uint8(t) {
    return this.ensureAdditionalCapacity(1), this.view.setUint8(this.offset, t), this.offset += 1, this;
  }
  int16(t) {
    return this.ensureAdditionalCapacity(2), this.view.setInt16(this.offset, t, mt), this.offset += 2, this;
  }
  uint16(t) {
    return this.ensureAdditionalCapacity(2), this.view.setUint16(this.offset, t, mt), this.offset += 2, this;
  }
  int32(t) {
    return this.ensureAdditionalCapacity(4), this.view.setInt32(this.offset, t, mt), this.offset += 4, this;
  }
  uint32(t) {
    return this.ensureAdditionalCapacity(4), this.view.setUint32(this.offset, t, mt), this.offset += 4, this;
  }
  int64(t) {
    return this.ensureAdditionalCapacity(8), this.view.setBigInt64(this.offset, t, mt), this.offset += 8, this;
  }
  uint64(t) {
    return this.ensureAdditionalCapacity(8), this.view.setBigUint64(this.offset, t, mt), this.offset += 8, this;
  }
  string(t) {
    const e = this.textEncoder.encode(t);
    return this.ensureAdditionalCapacity(e.byteLength + 4), this.uint32(e.length), this.fullBuffer.set(e, this.offset), this.offset += e.length, this;
  }
  bytes(t) {
    return this.ensureAdditionalCapacity(t.byteLength), this.fullBuffer.set(t, this.offset), this.offset += t.length, this;
  }
  tupleArray(t, e, r) {
    const n = this.offset;
    this.uint32(0);
    for (const [c, f] of r)
      t.call(this, c), e.call(this, f);
    const s = this.offset;
    this.offset = n;
    const a = s - n - 4;
    return this.uint32(a), this.offset = s, this;
  }
  /**
   * Move the write head to offset bytes from the start of the buffer.
   *
   * If the buffer is smaller than the new offset location, the buffer expands.
   */
  seek(t) {
    return this.ensureCapacity(t), this.offset = t, this;
  }
  /**
   * reset the write head to the start of the buffer
   */
  reset() {
    return this.offset = 0, this;
  }
  ensureAdditionalCapacity(t) {
    this.ensureCapacity(this.offset + t);
  }
  ensureCapacity(t) {
    if (t > this.fullBuffer.byteLength) {
      const e = Math.max(this.fullBuffer.byteLength * 1.5, t), r = new Uint8Array(e);
      r.set(this.fullBuffer), this.fullBuffer = r, this.view = new DataView(this.fullBuffer.buffer);
    }
  }
}
class Qt {
  constructor(t) {
    this.options = t, this.bufferBuilder = new tr();
  }
  get length() {
    return this.bufferBuilder.length;
  }
  get buffer() {
    return this.bufferBuilder.buffer;
  }
  reset() {
    this.bufferBuilder.reset();
  }
  writeMagic() {
    this.bufferBuilder.bytes(new Uint8Array(K));
  }
  writeHeader(t) {
    var n;
    this.bufferBuilder.uint8(D.HEADER);
    const e = this.bufferBuilder.length;
    this.bufferBuilder.uint64(0n).string(t.profile).string(t.library), ((n = this.options) == null ? void 0 : n.padRecords) === !0 && this.bufferBuilder.uint8(1).uint8(255).uint8(255);
    const r = this.bufferBuilder.length;
    return this.bufferBuilder.seek(e).uint64(BigInt(r - e - 8)).seek(r), BigInt(r - e + 1);
  }
  writeFooter(t) {
    return this.bufferBuilder.uint8(D.FOOTER).uint64(20n).uint64(t.summaryStart).uint64(t.summaryOffsetStart).uint32(t.summaryCrc), 20n;
  }
  writeSchema(t) {
    var n;
    this.bufferBuilder.uint8(D.SCHEMA);
    const e = this.bufferBuilder.length;
    this.bufferBuilder.uint64(0n).uint16(t.id).string(t.name).string(t.encoding).uint32(t.data.byteLength).bytes(t.data), ((n = this.options) == null ? void 0 : n.padRecords) === !0 && this.bufferBuilder.uint8(1).uint8(255).uint8(255);
    const r = this.bufferBuilder.length;
    return this.bufferBuilder.seek(e).uint64(BigInt(r - e - 8)).seek(r), BigInt(r - e + 1);
  }
  writeChannel(t) {
    var n;
    this.bufferBuilder.uint8(D.CHANNEL);
    const e = this.bufferBuilder.length;
    this.bufferBuilder.uint64(0n).uint16(t.id).uint16(t.schemaId).string(t.topic).string(t.messageEncoding).tupleArray((s) => this.bufferBuilder.string(s), (s) => this.bufferBuilder.string(s), t.metadata), ((n = this.options) == null ? void 0 : n.padRecords) === !0 && this.bufferBuilder.uint8(1).uint8(255).uint8(255);
    const r = this.bufferBuilder.length;
    return this.bufferBuilder.seek(e).uint64(BigInt(r - e - 8)).seek(r), BigInt(r - e + 1);
  }
  writeMessage(t) {
    this.bufferBuilder.uint8(D.MESSAGE);
    const e = this.bufferBuilder.length;
    this.bufferBuilder.uint64(0n).uint16(t.channelId).uint32(t.sequence).uint64(t.logTime).uint64(t.publishTime).bytes(t.data);
    const r = this.bufferBuilder.length;
    this.bufferBuilder.seek(e).uint64(BigInt(r - e - 8)).seek(r);
  }
  writeAttachment(t) {
    var s;
    this.bufferBuilder.uint8(D.ATTACHMENT);
    const e = this.bufferBuilder.length;
    this.bufferBuilder.uint64(0n);
    const r = this.bufferBuilder.length;
    this.bufferBuilder.uint64(t.logTime).uint64(t.createTime).string(t.name).string(t.mediaType).uint64(BigInt(t.data.byteLength)).bytes(t.data), this.bufferBuilder.uint32(Lt(this.bufferBuilder.bufferView(r, this.bufferBuilder.length - r))), ((s = this.options) == null ? void 0 : s.padRecords) === !0 && this.bufferBuilder.uint8(1).uint8(255).uint8(255);
    const n = this.bufferBuilder.length;
    return this.bufferBuilder.seek(e).uint64(BigInt(n - e - 8)).seek(n), BigInt(n - e + 1);
  }
  writeAttachmentIndex(t) {
    var n;
    this.bufferBuilder.uint8(D.ATTACHMENT_INDEX);
    const e = this.bufferBuilder.length;
    this.bufferBuilder.uint64(0n).uint64(t.offset).uint64(t.length).uint64(t.logTime).uint64(t.createTime).uint64(t.dataSize).string(t.name).string(t.mediaType), ((n = this.options) == null ? void 0 : n.padRecords) === !0 && this.bufferBuilder.uint8(1).uint8(255).uint8(255);
    const r = this.bufferBuilder.length;
    return this.bufferBuilder.seek(e).uint64(BigInt(r - e - 8)).seek(r), BigInt(r - e + 1);
  }
  writeChunk(t) {
    this.bufferBuilder.uint8(D.CHUNK);
    const e = this.bufferBuilder.length;
    this.bufferBuilder.uint64(0n).uint64(t.messageStartTime).uint64(t.messageEndTime).uint64(t.uncompressedSize).uint32(t.uncompressedCrc).string(t.compression).uint64(BigInt(t.records.byteLength)).bytes(t.records);
    const r = this.bufferBuilder.length;
    return this.bufferBuilder.seek(e).uint64(BigInt(r - e - 8)).seek(r), BigInt(r - e + 1);
  }
  writeChunkIndex(t) {
    var n;
    this.bufferBuilder.uint8(D.CHUNK_INDEX);
    const e = this.bufferBuilder.length;
    this.bufferBuilder.uint64(0n).uint64(t.messageStartTime).uint64(t.messageEndTime).uint64(t.chunkStartOffset).uint64(t.chunkLength).uint32(t.messageIndexOffsets.size * 10);
    for (const [s, a] of t.messageIndexOffsets)
      this.bufferBuilder.uint16(s).uint64(a);
    this.bufferBuilder.uint64(t.messageIndexLength).string(t.compression).uint64(t.compressedSize).uint64(t.uncompressedSize), ((n = this.options) == null ? void 0 : n.padRecords) === !0 && this.bufferBuilder.uint8(1).uint8(255).uint8(255);
    const r = this.bufferBuilder.length;
    return this.bufferBuilder.seek(e).uint64(BigInt(r - e - 8)).seek(r), BigInt(r - e + 1);
  }
  writeMessageIndex(t) {
    var s;
    this.bufferBuilder.uint8(D.MESSAGE_INDEX);
    const e = this.bufferBuilder.length, r = t.records.length * 16;
    this.bufferBuilder.uint64(0n).uint16(t.channelId).uint32(r);
    for (const a of t.records)
      this.bufferBuilder.uint64(a[0]).uint64(a[1]);
    ((s = this.options) == null ? void 0 : s.padRecords) === !0 && this.bufferBuilder.uint8(1).uint8(255).uint8(255);
    const n = this.bufferBuilder.length;
    return this.bufferBuilder.seek(e).uint64(BigInt(n - e - 8)).seek(n), BigInt(n - e + 1);
  }
  writeMetadata(t) {
    var n;
    this.bufferBuilder.uint8(D.METADATA);
    const e = this.bufferBuilder.length;
    this.bufferBuilder.uint64(0n).string(t.name).tupleArray((s) => this.bufferBuilder.string(s), (s) => this.bufferBuilder.string(s), t.metadata), ((n = this.options) == null ? void 0 : n.padRecords) === !0 && this.bufferBuilder.uint8(1).uint8(255).uint8(255);
    const r = this.bufferBuilder.length;
    return this.bufferBuilder.seek(e).uint64(BigInt(r - e - 8)).seek(r), BigInt(r - e + 1);
  }
  writeMetadataIndex(t) {
    var n;
    this.bufferBuilder.uint8(D.METADATA_INDEX);
    const e = this.bufferBuilder.length;
    this.bufferBuilder.uint64(0n).uint64(t.offset).uint64(t.length).string(t.name), ((n = this.options) == null ? void 0 : n.padRecords) === !0 && this.bufferBuilder.uint8(1).uint8(255).uint8(255);
    const r = this.bufferBuilder.length;
    return this.bufferBuilder.seek(e).uint64(BigInt(r - e - 8)).seek(r), BigInt(r - e + 1);
  }
  writeSummaryOffset(t) {
    var n;
    this.bufferBuilder.uint8(D.SUMMARY_OFFSET);
    const e = this.bufferBuilder.length;
    this.bufferBuilder.uint64(0n).uint8(t.groupOpcode).uint64(t.groupStart).uint64(t.groupLength), ((n = this.options) == null ? void 0 : n.padRecords) === !0 && this.bufferBuilder.uint8(1).uint8(255).uint8(255);
    const r = this.bufferBuilder.length;
    return this.bufferBuilder.seek(e).uint64(BigInt(r - e - 8)).seek(r), BigInt(r - e + 1);
  }
  writeStatistics(t) {
    var n;
    this.bufferBuilder.uint8(D.STATISTICS);
    const e = this.bufferBuilder.length;
    this.bufferBuilder.uint64(0n).uint64(t.messageCount).uint16(t.schemaCount).uint32(t.channelCount).uint32(t.attachmentCount).uint32(t.metadataCount).uint32(t.chunkCount).uint64(t.messageStartTime).uint64(t.messageEndTime).tupleArray((s) => this.bufferBuilder.uint16(s), (s) => this.bufferBuilder.uint64(s), t.channelMessageCounts), ((n = this.options) == null ? void 0 : n.padRecords) === !0 && this.bufferBuilder.uint8(1).uint8(255).uint8(255);
    const r = this.bufferBuilder.length;
    return this.bufferBuilder.seek(e).uint64(BigInt(r - e - 8)).seek(r), BigInt(r - e + 1);
  }
  writeDataEnd(t) {
    var n;
    this.bufferBuilder.uint8(D.DATA_END);
    const e = this.bufferBuilder.length;
    this.bufferBuilder.uint64(0n).uint32(t.dataSectionCrc), ((n = this.options) == null ? void 0 : n.padRecords) === !0 && this.bufferBuilder.uint8(1).uint8(255).uint8(255);
    const r = this.bufferBuilder.length;
    return this.bufferBuilder.seek(e).uint64(BigInt(r - e - 8)).seek(r), BigInt(r - e + 1);
  }
}
class Ee {
  constructor({ useMessageIndex: t = !0 }) {
    this.recordWriter = new Qt(), this.totalMessageCount = 0, this.messageStartTime = 0n, this.messageEndTime = 0n, t && (this.messageIndices = /* @__PURE__ */ new Map());
  }
  get numMessages() {
    return this.totalMessageCount;
  }
  get buffer() {
    return this.recordWriter.buffer;
  }
  get byteLength() {
    return this.recordWriter.length;
  }
  get indices() {
    return this.messageIndices ? this.messageIndices.values() : [];
  }
  addSchema(t) {
    this.recordWriter.writeSchema(t);
  }
  addChannel(t) {
    this.messageIndices && !this.messageIndices.has(t.id) && this.messageIndices.set(t.id, {
      channelId: t.id,
      records: []
    }), this.recordWriter.writeChannel(t);
  }
  addMessage(t) {
    if ((this.totalMessageCount === 0 || t.logTime < this.messageStartTime) && (this.messageStartTime = t.logTime), (this.totalMessageCount === 0 || t.logTime > this.messageEndTime) && (this.messageEndTime = t.logTime), this.messageIndices) {
      let e = this.messageIndices.get(t.channelId);
      e || (e = {
        channelId: t.channelId,
        records: []
      }, this.messageIndices.set(t.channelId, e)), e.records.push([t.logTime, BigInt(this.recordWriter.length)]);
    }
    this.totalMessageCount += 1, this.recordWriter.writeMessage(t);
  }
  reset() {
    var t;
    this.messageStartTime = 0n, this.messageEndTime = 0n, this.totalMessageCount = 0, (t = this.messageIndices) == null || t.clear(), this.recordWriter.reset();
  }
}
class er {
  constructor(t) {
    this.nextChannelId = 0, this.nextSchemaId = 1, this.recordWriter = new Qt(), this.schemas = /* @__PURE__ */ new Map(), this.channels = /* @__PURE__ */ new Map(), this.writtenSchemaIds = /* @__PURE__ */ new Set(), this.writtenChannelIds = /* @__PURE__ */ new Set(), this.dataSectionCrc = Nt();
    const { writable: e, useStatistics: r = !0, useSummaryOffsets: n = !0, useChunks: s = !0, repeatSchemas: a = !0, repeatChannels: c = !0, useAttachmentIndex: f = !0, useMetadataIndex: h = !0, useMessageIndex: o = !0, useChunkIndex: u = !0, startChannelId: y = 0, chunkSize: l = 1024 * 1024, compressChunk: d } = t;
    this.writable = e, this.useSummaryOffsets = n, r && (this.statistics = {
      messageCount: 0n,
      schemaCount: 0,
      channelCount: 0,
      attachmentCount: 0,
      metadataCount: 0,
      chunkCount: 0,
      messageStartTime: 0n,
      messageEndTime: 0n,
      channelMessageCounts: /* @__PURE__ */ new Map()
    }), s && (this.chunkBuilder = new Ee({ useMessageIndex: o })), this.repeatSchemas = a, this.repeatChannels = c, f && (this.attachmentIndices = []), h && (this.metadataIndices = []), u && (this.chunkIndices = []), this.nextChannelId = y, this.chunkSize = l, this.compressChunk = d;
  }
  async start(t) {
    this.recordWriter.writeMagic(), this.recordWriter.writeHeader(t), this.dataSectionCrc = Y(this.dataSectionCrc, this.recordWriter.buffer), await this.writable.write(this.recordWriter.buffer), this.recordWriter.reset();
  }
  async end() {
    await this.finalizeChunk(), this.dataSectionCrc = Y(this.dataSectionCrc, this.recordWriter.buffer), await this.writable.write(this.recordWriter.buffer), this.recordWriter.reset(), this.recordWriter.writeDataEnd({ dataSectionCrc: Ft(this.dataSectionCrc) }), await this.writable.write(this.recordWriter.buffer), this.recordWriter.reset();
    const t = [], e = this.writable.position();
    let r = Nt();
    if (this.repeatSchemas) {
      const f = this.writable.position();
      let h = 0n;
      for (const o of this.schemas.values())
        h += this.recordWriter.writeSchema(o);
      t.push({
        groupOpcode: D.SCHEMA,
        groupStart: f,
        groupLength: h
      });
    }
    if (this.repeatChannels) {
      r = Y(r, this.recordWriter.buffer), await this.writable.write(this.recordWriter.buffer), this.recordWriter.reset();
      const f = this.writable.position();
      let h = 0n;
      for (const o of this.channels.values())
        h += this.recordWriter.writeChannel(o);
      t.push({
        groupOpcode: D.CHANNEL,
        groupStart: f,
        groupLength: h
      });
    }
    if (this.statistics) {
      r = Y(r, this.recordWriter.buffer), await this.writable.write(this.recordWriter.buffer), this.recordWriter.reset();
      const f = this.writable.position(), h = this.recordWriter.writeStatistics(this.statistics);
      t.push({
        groupOpcode: D.STATISTICS,
        groupStart: f,
        groupLength: h
      });
    }
    if (r = Y(r, this.recordWriter.buffer), await this.writable.write(this.recordWriter.buffer), this.recordWriter.reset(), this.metadataIndices) {
      r = Y(r, this.recordWriter.buffer), await this.writable.write(this.recordWriter.buffer), this.recordWriter.reset();
      const f = this.writable.position();
      let h = 0n;
      for (const o of this.metadataIndices)
        h += this.recordWriter.writeMetadataIndex(o);
      t.push({
        groupOpcode: D.METADATA_INDEX,
        groupStart: f,
        groupLength: h
      });
    }
    if (this.attachmentIndices) {
      r = Y(r, this.recordWriter.buffer), await this.writable.write(this.recordWriter.buffer), this.recordWriter.reset();
      const f = this.writable.position();
      let h = 0n;
      for (const o of this.attachmentIndices)
        h += this.recordWriter.writeAttachmentIndex(o);
      t.push({
        groupOpcode: D.ATTACHMENT_INDEX,
        groupStart: f,
        groupLength: h
      });
    }
    if (this.chunkIndices) {
      r = Y(r, this.recordWriter.buffer), await this.writable.write(this.recordWriter.buffer), this.recordWriter.reset();
      const f = this.writable.position();
      let h = 0n;
      for (const o of this.chunkIndices)
        h += this.recordWriter.writeChunkIndex(o);
      t.push({
        groupOpcode: D.CHUNK_INDEX,
        groupStart: f,
        groupLength: h
      });
    }
    r = Y(r, this.recordWriter.buffer), await this.writable.write(this.recordWriter.buffer), this.recordWriter.reset();
    const n = this.writable.position(), s = n - e;
    if (this.useSummaryOffsets)
      for (const f of t)
        f.groupLength !== 0n && this.recordWriter.writeSummaryOffset(f);
    r = Y(r, this.recordWriter.buffer);
    const a = {
      summaryStart: s === 0n ? 0n : e,
      summaryOffsetStart: this.useSummaryOffsets ? n : 0n,
      summaryCrc: 0
    }, c = new DataView(new ArrayBuffer(25));
    c.setUint8(0, D.FOOTER), c.setBigUint64(1, 8n + 8n + 4n, !0), c.setBigUint64(9, a.summaryStart, !0), c.setBigUint64(17, a.summaryOffsetStart, !0), r = Y(r, c), a.summaryCrc = Ft(r), this.recordWriter.writeFooter(a), this.recordWriter.writeMagic(), await this.writable.write(this.recordWriter.buffer), this.recordWriter.reset();
  }
  /**
   * Add a schema and return a generated schema id. The schema id is used when adding channels.
   */
  async registerSchema(t) {
    const e = this.nextSchemaId++;
    return this.schemas.set(e, { ...t, id: e }), this.statistics && ++this.statistics.schemaCount, e;
  }
  /**
   * Add a channel and return a generated channel id. The channel id is used when adding messages.
   */
  async registerChannel(t) {
    const e = this.nextChannelId++;
    return this.channels.set(e, { ...t, id: e }), this.statistics && ++this.statistics.channelCount, e;
  }
  async addMessage(t) {
    if (this.statistics && (this.statistics.messageCount === 0n ? (this.statistics.messageStartTime = t.logTime, this.statistics.messageEndTime = t.logTime) : (t.logTime < this.statistics.messageStartTime && (this.statistics.messageStartTime = t.logTime), t.logTime > this.statistics.messageEndTime && (this.statistics.messageEndTime = t.logTime)), this.statistics.channelMessageCounts.set(t.channelId, (this.statistics.channelMessageCounts.get(t.channelId) ?? 0n) + 1n), ++this.statistics.messageCount), !this.writtenChannelIds.has(t.channelId)) {
      const e = this.channels.get(t.channelId);
      if (!e)
        throw new Error(`McapWriter#addMessage failed: missing channel for id ${t.channelId}`);
      if (e.schemaId !== 0 && !this.writtenSchemaIds.has(e.schemaId)) {
        const r = this.schemas.get(e.schemaId);
        if (!r)
          throw new Error(`McapWriter#addMessage failed: missing schema for id ${e.schemaId}`);
        this.chunkBuilder ? this.chunkBuilder.addSchema(r) : this.recordWriter.writeSchema(r), this.writtenSchemaIds.add(e.schemaId);
      }
      this.chunkBuilder ? this.chunkBuilder.addChannel(e) : this.recordWriter.writeChannel(e), this.writtenChannelIds.add(t.channelId);
    }
    this.chunkBuilder ? this.chunkBuilder.addMessage(t) : this.recordWriter.writeMessage(t), this.chunkBuilder && this.chunkBuilder.byteLength > this.chunkSize && await this.finalizeChunk();
  }
  async addAttachment(t) {
    const e = this.recordWriter.writeAttachment(t);
    if (this.statistics && ++this.statistics.attachmentCount, this.attachmentIndices) {
      const r = this.writable.position();
      this.attachmentIndices.push({
        logTime: t.logTime,
        createTime: t.createTime,
        name: t.name,
        mediaType: t.mediaType,
        offset: r,
        dataSize: BigInt(t.data.byteLength),
        length: e
      });
    }
    this.dataSectionCrc = Y(this.dataSectionCrc, this.recordWriter.buffer), await this.writable.write(this.recordWriter.buffer), this.recordWriter.reset();
  }
  async addMetadata(t) {
    const e = this.recordWriter.writeMetadata(t);
    if (this.statistics && ++this.statistics.metadataCount, this.metadataIndices) {
      const r = this.writable.position();
      this.metadataIndices.push({
        name: t.name,
        offset: r,
        length: e
      });
    }
    this.dataSectionCrc = Y(this.dataSectionCrc, this.recordWriter.buffer), await this.writable.write(this.recordWriter.buffer), this.recordWriter.reset();
  }
  async finalizeChunk() {
    if (!this.chunkBuilder || this.chunkBuilder.numMessages === 0)
      return;
    this.statistics && ++this.statistics.chunkCount;
    const t = this.chunkBuilder.buffer, e = BigInt(t.length), r = Lt(t);
    let n = "", s = t;
    this.compressChunk && ({ compression: n, compressedData: s } = this.compressChunk(t));
    const a = {
      messageStartTime: this.chunkBuilder.messageStartTime,
      messageEndTime: this.chunkBuilder.messageEndTime,
      uncompressedSize: e,
      uncompressedCrc: r,
      compression: n,
      records: s
    }, c = this.writable.position(), f = this.recordWriter.writeChunk(a), h = this.chunkIndices ? /* @__PURE__ */ new Map() : void 0;
    this.dataSectionCrc = Y(this.dataSectionCrc, this.recordWriter.buffer), await this.writable.write(this.recordWriter.buffer), this.recordWriter.reset();
    const o = this.writable.position();
    let u = 0n;
    for (const y of this.chunkBuilder.indices)
      h == null || h.set(y.channelId, o + u), u += this.recordWriter.writeMessageIndex(y);
    this.chunkIndices && this.chunkIndices.push({
      messageStartTime: a.messageStartTime,
      messageEndTime: a.messageEndTime,
      chunkStartOffset: c,
      chunkLength: f,
      messageIndexOffsets: h,
      messageIndexLength: u,
      compression: a.compression,
      compressedSize: BigInt(a.records.byteLength),
      uncompressedSize: a.uncompressedSize
    }), this.chunkBuilder.reset(), this.dataSectionCrc = Y(this.dataSectionCrc, this.recordWriter.buffer), await this.writable.write(this.recordWriter.buffer), this.recordWriter.reset();
  }
}
const rr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
function ir(i) {
  return i.byteLength >= K.length && K.every((t, e) => t === i.getUint8(e));
}
const nr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  McapChunkBuilder: Ee,
  McapConstants: Ye,
  McapIndexedReader: Ke,
  McapRecordBuilder: Qt,
  McapStreamReader: Je,
  McapTypes: rr,
  McapWriter: er,
  hasMcapPrefix: ir,
  parseMagic: Bt,
  parseRecord: at
}, Symbol.toStringTag, { value: "Module" })), sr = /* @__PURE__ */ ge(nr);
var ve = { exports: {} };
(function(i) {
  (() => {
    var t = {
      /***/
      570: (
        /***/
        (s, a) => {
          Object.defineProperty(a, "__esModule", { value: !0 }), a.isMsgDefEqual = a.isMsgDefFieldEqual = void 0;
          function c(o, u) {
            if (Array.isArray(o) && Array.isArray(u)) {
              if (o.length !== u.length)
                return !1;
              for (let y = 0; y < o.length; y++)
                if (o[y] !== u[y])
                  return !1;
              return !0;
            }
            return o === u;
          }
          function f(o, u) {
            return o.type === u.type && o.name === u.name && (o.isComplex ?? !1) === (u.isComplex ?? !1) && (o.isArray ?? !1) === (u.isArray ?? !1) && o.arrayLength === u.arrayLength && (o.isConstant ?? !1) === (u.isConstant ?? !1) && o.value === u.value && o.valueText === u.valueText && o.upperBound === u.upperBound && o.arrayUpperBound === u.arrayUpperBound && c(o.defaultValue, u.defaultValue);
          }
          a.isMsgDefFieldEqual = f;
          function h(o, u) {
            return (o.name == null || u.name == null || o.name === u.name) && o.definitions.length === u.definitions.length && o.definitions.every((y, l) => f(y, u.definitions[l]));
          }
          a.isMsgDefEqual = h;
        }
      ),
      /***/
      767: (
        /***/
        function(s, a, c) {
          var f = this && this.__createBinding || (Object.create ? function(o, u, y, l) {
            l === void 0 && (l = y);
            var d = Object.getOwnPropertyDescriptor(u, y);
            (!d || ("get" in d ? !u.__esModule : d.writable || d.configurable)) && (d = { enumerable: !0, get: function() {
              return u[y];
            } }), Object.defineProperty(o, l, d);
          } : function(o, u, y, l) {
            l === void 0 && (l = y), o[l] = u[y];
          }), h = this && this.__exportStar || function(o, u) {
            for (var y in o) y !== "default" && !Object.prototype.hasOwnProperty.call(u, y) && f(u, o, y);
          };
          Object.defineProperty(a, "__esModule", { value: !0 }), h(c(726), a), h(c(570), a);
        }
      ),
      /***/
      726: (
        /***/
        (s, a) => {
          Object.defineProperty(a, "__esModule", { value: !0 });
        }
      ),
      /***/
      417: (
        /***/
        (s, a, c) => {
          c.r(a), c.d(a, {
            /* harmony export */
            Md5: () => (
              /* binding */
              f
            )
            /* harmony export */
          });
          var f = (
            /** @class */
            function() {
              function h() {
              }
              return h.AddUnsigned = function(o, u) {
                var y, l, d, p, g;
                return d = o & 2147483648, p = u & 2147483648, y = o & 1073741824, l = u & 1073741824, g = (o & 1073741823) + (u & 1073741823), y & l ? g ^ 2147483648 ^ d ^ p : y | l ? g & 1073741824 ? g ^ 3221225472 ^ d ^ p : g ^ 1073741824 ^ d ^ p : g ^ d ^ p;
              }, h.FF = function(o, u, y, l, d, p, g) {
                return o = this.AddUnsigned(o, this.AddUnsigned(this.AddUnsigned(this.F(u, y, l), d), g)), this.AddUnsigned(this.RotateLeft(o, p), u);
              }, h.GG = function(o, u, y, l, d, p, g) {
                return o = this.AddUnsigned(o, this.AddUnsigned(this.AddUnsigned(this.G(u, y, l), d), g)), this.AddUnsigned(this.RotateLeft(o, p), u);
              }, h.HH = function(o, u, y, l, d, p, g) {
                return o = this.AddUnsigned(o, this.AddUnsigned(this.AddUnsigned(this.H(u, y, l), d), g)), this.AddUnsigned(this.RotateLeft(o, p), u);
              }, h.II = function(o, u, y, l, d, p, g) {
                return o = this.AddUnsigned(o, this.AddUnsigned(this.AddUnsigned(this.I(u, y, l), d), g)), this.AddUnsigned(this.RotateLeft(o, p), u);
              }, h.ConvertToWordArray = function(o) {
                for (var u, y = o.length, l = y + 8, d = (l - l % 64) / 64, p = (d + 1) * 16, g = Array(p - 1), b = 0, A = 0; A < y; )
                  u = (A - A % 4) / 4, b = A % 4 * 8, g[u] = g[u] | o.charCodeAt(A) << b, A++;
                return u = (A - A % 4) / 4, b = A % 4 * 8, g[u] = g[u] | 128 << b, g[p - 2] = y << 3, g[p - 1] = y >>> 29, g;
              }, h.WordToHex = function(o) {
                var u = "", y = "", l, d;
                for (d = 0; d <= 3; d++)
                  l = o >>> d * 8 & 255, y = "0" + l.toString(16), u = u + y.substr(y.length - 2, 2);
                return u;
              }, h.Utf8Encode = function(o) {
                var u = "", y;
                o = o.replace(/\r\n/g, `
`);
                for (var l = 0; l < o.length; l++)
                  y = o.charCodeAt(l), y < 128 ? u += String.fromCharCode(y) : y > 127 && y < 2048 ? (u += String.fromCharCode(y >> 6 | 192), u += String.fromCharCode(y & 63 | 128)) : (u += String.fromCharCode(y >> 12 | 224), u += String.fromCharCode(y >> 6 & 63 | 128), u += String.fromCharCode(y & 63 | 128));
                return u;
              }, h.init = function(o) {
                var u;
                for (typeof o != "string" && (o = JSON.stringify(o)), this._string = this.Utf8Encode(o), this.x = this.ConvertToWordArray(this._string), this.a = 1732584193, this.b = 4023233417, this.c = 2562383102, this.d = 271733878, this.k = 0; this.k < this.x.length; this.k += 16)
                  this.AA = this.a, this.BB = this.b, this.CC = this.c, this.DD = this.d, this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k], this.S11, 3614090360), this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 1], this.S12, 3905402710), this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 2], this.S13, 606105819), this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 3], this.S14, 3250441966), this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 4], this.S11, 4118548399), this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 5], this.S12, 1200080426), this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 6], this.S13, 2821735955), this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 7], this.S14, 4249261313), this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 8], this.S11, 1770035416), this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 9], this.S12, 2336552879), this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 10], this.S13, 4294925233), this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 11], this.S14, 2304563134), this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 12], this.S11, 1804603682), this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 13], this.S12, 4254626195), this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 14], this.S13, 2792965006), this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 15], this.S14, 1236535329), this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 1], this.S21, 4129170786), this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 6], this.S22, 3225465664), this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 11], this.S23, 643717713), this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k], this.S24, 3921069994), this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 5], this.S21, 3593408605), this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 10], this.S22, 38016083), this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 15], this.S23, 3634488961), this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 4], this.S24, 3889429448), this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 9], this.S21, 568446438), this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 14], this.S22, 3275163606), this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 3], this.S23, 4107603335), this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 8], this.S24, 1163531501), this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 13], this.S21, 2850285829), this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 2], this.S22, 4243563512), this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 7], this.S23, 1735328473), this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 12], this.S24, 2368359562), this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 5], this.S31, 4294588738), this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 8], this.S32, 2272392833), this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 11], this.S33, 1839030562), this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 14], this.S34, 4259657740), this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 1], this.S31, 2763975236), this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 4], this.S32, 1272893353), this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 7], this.S33, 4139469664), this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 10], this.S34, 3200236656), this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 13], this.S31, 681279174), this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k], this.S32, 3936430074), this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 3], this.S33, 3572445317), this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 6], this.S34, 76029189), this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 9], this.S31, 3654602809), this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 12], this.S32, 3873151461), this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 15], this.S33, 530742520), this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 2], this.S34, 3299628645), this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k], this.S41, 4096336452), this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 7], this.S42, 1126891415), this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 14], this.S43, 2878612391), this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 5], this.S44, 4237533241), this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 12], this.S41, 1700485571), this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 3], this.S42, 2399980690), this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 10], this.S43, 4293915773), this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 1], this.S44, 2240044497), this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 8], this.S41, 1873313359), this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 15], this.S42, 4264355552), this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 6], this.S43, 2734768916), this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 13], this.S44, 1309151649), this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 4], this.S41, 4149444226), this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 11], this.S42, 3174756917), this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 2], this.S43, 718787259), this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 9], this.S44, 3951481745), this.a = this.AddUnsigned(this.a, this.AA), this.b = this.AddUnsigned(this.b, this.BB), this.c = this.AddUnsigned(this.c, this.CC), this.d = this.AddUnsigned(this.d, this.DD);
                return u = this.WordToHex(this.a) + this.WordToHex(this.b) + this.WordToHex(this.c) + this.WordToHex(this.d), u.toLowerCase();
              }, h.x = Array(), h.S11 = 7, h.S12 = 12, h.S13 = 17, h.S14 = 22, h.S21 = 5, h.S22 = 9, h.S23 = 14, h.S24 = 20, h.S31 = 4, h.S32 = 11, h.S33 = 16, h.S34 = 23, h.S41 = 6, h.S42 = 10, h.S43 = 15, h.S44 = 21, h.RotateLeft = function(o, u) {
                return o << u | o >>> 32 - u;
              }, h.F = function(o, u, y) {
                return o & u | ~o & y;
              }, h.G = function(o, u, y) {
                return o & y | u & ~y;
              }, h.H = function(o, u, y) {
                return o ^ u ^ y;
              }, h.I = function(o, u, y) {
                return u ^ (o | ~y);
              }, h;
            }()
          );
        }
      ),
      /***/
      271: (
        /***/
        function(s, a) {
          var c, f, h;
          (function(o, u) {
            f = [], c = u, h = typeof c == "function" ? c.apply(a, f) : c, h !== void 0 && (s.exports = h);
          })(this, function() {
            var o = Object.prototype.hasOwnProperty, u = Object.prototype.toString, y = typeof new RegExp().sticky == "boolean";
            function l(m) {
              return m && u.call(m) === "[object RegExp]";
            }
            function d(m) {
              return m && typeof m == "object" && !l(m) && !Array.isArray(m);
            }
            function p(m) {
              return m.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
            }
            function g(m) {
              var w = new RegExp("|" + m);
              return w.exec("").length - 1;
            }
            function b(m) {
              return "(" + m + ")";
            }
            function A(m) {
              if (!m.length) return "(?!)";
              var w = m.map(function(x) {
                return "(?:" + x + ")";
              }).join("|");
              return "(?:" + w + ")";
            }
            function E(m) {
              if (typeof m == "string")
                return "(?:" + p(m) + ")";
              if (l(m)) {
                if (m.ignoreCase) throw new Error("RegExp /i flag not allowed");
                if (m.global) throw new Error("RegExp /g flag is implied");
                if (m.sticky) throw new Error("RegExp /y flag is implied");
                if (m.multiline) throw new Error("RegExp /m flag is implied");
                return m.source;
              } else
                throw new Error("Not a pattern: " + m);
            }
            function T(m) {
              for (var w = Object.getOwnPropertyNames(m), x = [], C = 0; C < w.length; C++) {
                var L = w[C], I = m[L], k = [].concat(I);
                if (L === "include") {
                  for (var N = 0; N < k.length; N++)
                    x.push({ include: k[N] });
                  continue;
                }
                var z = [];
                k.forEach(function(_) {
                  d(_) ? (z.length && x.push(M(L, z)), x.push(M(L, _)), z = []) : z.push(_);
                }), z.length && x.push(M(L, z));
              }
              return x;
            }
            function B(m) {
              for (var w = [], x = 0; x < m.length; x++) {
                var C = m[x];
                if (C.include) {
                  for (var L = [].concat(C.include), I = 0; I < L.length; I++)
                    w.push({ include: L[I] });
                  continue;
                }
                if (!C.type)
                  throw new Error("Rule has no type: " + JSON.stringify(C));
                w.push(M(C.type, C));
              }
              return w;
            }
            function M(m, w) {
              if (d(w) || (w = { match: w }), w.include)
                throw new Error("Matching rules cannot also include states");
              var x = {
                defaultType: m,
                lineBreaks: !!w.error || !!w.fallback,
                pop: !1,
                next: null,
                push: null,
                error: !1,
                fallback: !1,
                value: null,
                type: null,
                shouldThrow: !1
              };
              for (var C in w)
                o.call(w, C) && (x[C] = w[C]);
              if (typeof x.type == "string" && m !== x.type)
                throw new Error("Type transform cannot be a string (type '" + x.type + "' for token '" + m + "')");
              var L = x.match;
              return x.match = Array.isArray(L) ? L : L ? [L] : [], x.match.sort(function(I, k) {
                return l(I) && l(k) ? 0 : l(k) ? -1 : l(I) ? 1 : k.length - I.length;
              }), x;
            }
            function S(m) {
              return Array.isArray(m) ? B(m) : T(m);
            }
            var v = M("error", { lineBreaks: !0, shouldThrow: !0 });
            function R(m, w) {
              for (var x = null, C = /* @__PURE__ */ Object.create(null), L = !0, I = null, k = [], N = [], z = 0; z < m.length; z++)
                m[z].fallback && (L = !1);
              for (var z = 0; z < m.length; z++) {
                var _ = m[z];
                if (_.include)
                  throw new Error("Inheritance is not allowed in stateless lexers");
                if (_.error || _.fallback) {
                  if (x)
                    throw !_.fallback == !x.fallback ? new Error("Multiple " + (_.fallback ? "fallback" : "error") + " rules not allowed (for token '" + _.defaultType + "')") : new Error("fallback and error are mutually exclusive (for token '" + _.defaultType + "')");
                  x = _;
                }
                var G = _.match.slice();
                if (L)
                  for (; G.length && typeof G[0] == "string" && G[0].length === 1; ) {
                    var ot = G.shift();
                    C[ot.charCodeAt(0)] = _;
                  }
                if (_.pop || _.push || _.next) {
                  if (!w)
                    throw new Error("State-switching options are not allowed in stateless lexers (for token '" + _.defaultType + "')");
                  if (_.fallback)
                    throw new Error("State-switching options are not allowed on fallback tokens (for token '" + _.defaultType + "')");
                }
                if (G.length !== 0) {
                  L = !1, k.push(_);
                  for (var q = 0; q < G.length; q++) {
                    var ft = G[q];
                    if (l(ft)) {
                      if (I === null)
                        I = ft.unicode;
                      else if (I !== ft.unicode && _.fallback === !1)
                        throw new Error("If one rule is /u then all must be");
                    }
                  }
                  var yt = A(G.map(E)), st = new RegExp(yt);
                  if (st.test(""))
                    throw new Error("RegExp matches empty string: " + st);
                  var wt = g(yt);
                  if (wt > 0)
                    throw new Error("RegExp has capture groups: " + st + `
Use (?: … ) instead`);
                  if (!_.lineBreaks && st.test(`
`))
                    throw new Error("Rule should declare lineBreaks: " + st);
                  N.push(b(yt));
                }
              }
              var gt = x && x.fallback, At = y && !gt ? "ym" : "gm", $t = y || gt ? "" : "|";
              I === !0 && (At += "u");
              var Re = new RegExp(A(N) + $t, At);
              return { regexp: Re, groups: k, fast: C, error: x || v };
            }
            function V(m) {
              var w = R(S(m));
              return new $({ start: w }, "start");
            }
            function F(m, w, x) {
              var C = m && (m.push || m.next);
              if (C && !x[C])
                throw new Error("Missing state '" + C + "' (in token '" + m.defaultType + "' of state '" + w + "')");
              if (m && m.pop && +m.pop != 1)
                throw new Error("pop must be 1 (in token '" + m.defaultType + "' of state '" + w + "')");
            }
            function tt(m, w) {
              var x = m.$all ? S(m.$all) : [];
              delete m.$all;
              var C = Object.getOwnPropertyNames(m);
              w || (w = C[0]);
              for (var L = /* @__PURE__ */ Object.create(null), I = 0; I < C.length; I++) {
                var k = C[I];
                L[k] = S(m[k]).concat(x);
              }
              for (var I = 0; I < C.length; I++)
                for (var k = C[I], N = L[k], z = /* @__PURE__ */ Object.create(null), _ = 0; _ < N.length; _++) {
                  var G = N[_];
                  if (G.include) {
                    var ot = [_, 1];
                    if (G.include !== k && !z[G.include]) {
                      z[G.include] = !0;
                      var q = L[G.include];
                      if (!q)
                        throw new Error("Cannot include nonexistent state '" + G.include + "' (in state '" + k + "')");
                      for (var ft = 0; ft < q.length; ft++) {
                        var yt = q[ft];
                        N.indexOf(yt) === -1 && ot.push(yt);
                      }
                    }
                    N.splice.apply(N, ot), _--;
                  }
                }
              for (var st = /* @__PURE__ */ Object.create(null), I = 0; I < C.length; I++) {
                var k = C[I];
                st[k] = R(L[k], !0);
              }
              for (var I = 0; I < C.length; I++) {
                for (var wt = C[I], gt = st[wt], At = gt.groups, _ = 0; _ < At.length; _++)
                  F(At[_], wt, st);
                for (var $t = Object.getOwnPropertyNames(gt.fast), _ = 0; _ < $t.length; _++)
                  F(gt.fast[$t[_]], wt, st);
              }
              return new $(st, w);
            }
            function ut(m) {
              for (var w = /* @__PURE__ */ Object.create(null), x = /* @__PURE__ */ Object.create(null), C = Object.getOwnPropertyNames(m), L = 0; L < C.length; L++) {
                var I = C[L], k = m[I], N = Array.isArray(k) ? k : [k];
                N.forEach(function(q) {
                  if ((x[q.length] = x[q.length] || []).push(q), typeof q != "string")
                    throw new Error("keyword must be string (in keyword '" + I + "')");
                  w[q] = I;
                });
              }
              function z(q) {
                return JSON.stringify(q);
              }
              var _ = "";
              _ += `switch (value.length) {
`;
              for (var G in x) {
                var ot = x[G];
                _ += "case " + G + `:
`, _ += `switch (value) {
`, ot.forEach(function(q) {
                  var ft = w[q];
                  _ += "case " + z(q) + ": return " + z(ft) + `
`;
                }), _ += `}
`;
              }
              return _ += `}
`, Function("value", _);
            }
            var $ = function(m, w) {
              this.startState = w, this.states = m, this.buffer = "", this.stack = [], this.reset();
            };
            $.prototype.reset = function(m, w) {
              return this.buffer = m || "", this.index = 0, this.line = w ? w.line : 1, this.col = w ? w.col : 1, this.queuedToken = w ? w.queuedToken : null, this.queuedThrow = w ? w.queuedThrow : null, this.setState(w ? w.state : this.startState), this.stack = w && w.stack ? w.stack.slice() : [], this;
            }, $.prototype.save = function() {
              return {
                line: this.line,
                col: this.col,
                state: this.state,
                stack: this.stack.slice(),
                queuedToken: this.queuedToken,
                queuedThrow: this.queuedThrow
              };
            }, $.prototype.setState = function(m) {
              if (!(!m || this.state === m)) {
                this.state = m;
                var w = this.states[m];
                this.groups = w.groups, this.error = w.error, this.re = w.regexp, this.fast = w.fast;
              }
            }, $.prototype.popState = function() {
              this.setState(this.stack.pop());
            }, $.prototype.pushState = function(m) {
              this.stack.push(this.state), this.setState(m);
            };
            var O = y ? function(m, w) {
              return m.exec(w);
            } : function(m, w) {
              var x = m.exec(w);
              return x[0].length === 0 ? null : x;
            };
            $.prototype._getGroup = function(m) {
              for (var w = this.groups.length, x = 0; x < w; x++)
                if (m[x + 1] !== void 0)
                  return this.groups[x];
              throw new Error("Cannot find token type for matched text");
            };
            function W() {
              return this.value;
            }
            if ($.prototype.next = function() {
              var m = this.index;
              if (this.queuedGroup) {
                var w = this._token(this.queuedGroup, this.queuedText, m);
                return this.queuedGroup = null, this.queuedText = "", w;
              }
              var x = this.buffer;
              if (m !== x.length) {
                var k = this.fast[x.charCodeAt(m)];
                if (k)
                  return this._token(k, x.charAt(m), m);
                var C = this.re;
                C.lastIndex = m;
                var L = O(C, x), I = this.error;
                if (L == null)
                  return this._token(I, x.slice(m, x.length), m);
                var k = this._getGroup(L), N = L[0];
                return I.fallback && L.index !== m ? (this.queuedGroup = k, this.queuedText = N, this._token(I, x.slice(m, L.index), m)) : this._token(k, N, m);
              }
            }, $.prototype._token = function(m, w, x) {
              var C = 0;
              if (m.lineBreaks) {
                var L = /\n/g, I = 1;
                if (w === `
`)
                  C = 1;
                else
                  for (; L.exec(w); )
                    C++, I = L.lastIndex;
              }
              var k = {
                type: typeof m.type == "function" && m.type(w) || m.defaultType,
                value: typeof m.value == "function" ? m.value(w) : w,
                text: w,
                toString: W,
                offset: x,
                lineBreaks: C,
                line: this.line,
                col: this.col
              }, N = w.length;
              if (this.index += N, this.line += C, C !== 0 ? this.col = N - I + 1 : this.col += N, m.shouldThrow)
                throw new Error(this.formatError(k, "invalid syntax"));
              return m.pop ? this.popState() : m.push ? this.pushState(m.push) : m.next && this.setState(m.next), k;
            }, typeof Symbol < "u" && Symbol.iterator) {
              var P = function(m) {
                this.lexer = m;
              };
              P.prototype.next = function() {
                var m = this.lexer.next();
                return { value: m, done: !m };
              }, P.prototype[Symbol.iterator] = function() {
                return this;
              }, $.prototype[Symbol.iterator] = function() {
                return new P(this);
              };
            }
            return $.prototype.formatError = function(m, w) {
              if (m == null)
                var x = this.buffer.slice(this.index), m = {
                  text: x,
                  offset: this.index,
                  lineBreaks: x.indexOf(`
`) === -1 ? 0 : 1,
                  line: this.line,
                  col: this.col
                };
              var C = Math.max(0, m.offset - m.col + 1), L = m.lineBreaks ? m.text.indexOf(`
`) : m.text.length, I = this.buffer.substring(C, m.offset + L);
              return w += " at line " + m.line + " col " + m.col + `:

`, w += "  " + I + `
`, w += "  " + Array(m.col).join(" ") + "^", w;
            }, $.prototype.clone = function() {
              return new $(this.states, this.state);
            }, $.prototype.has = function(m) {
              return !0;
            }, {
              compile: V,
              states: tt,
              error: Object.freeze({ error: !0 }),
              fallback: Object.freeze({ fallback: !0 }),
              keywords: ut
            };
          });
        }
      ),
      /***/
      558: (
        /***/
        (s, a, c) => {
          (function() {
            function f(l) {
              return l[0];
            }
            const o = c(271).compile({
              space: { match: /\s+/, lineBreaks: !0 },
              number: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
              comment: /#[^\n]*/,
              "[": "[",
              "]": "]",
              assignment: /=[^\n]*/,
              // Leading underscores are disallowed in field names, while constant names have no explicit restrictions.
              // So we are more lenient in lexing here, and the validation steps below are more strict.
              // See: https://github.com/ros/genmsg/blob/7d8b6ce6f43b6e39ea8261125d270f2d3062356f/src/genmsg/msg_loader.py#L188-L238
              fieldOrType: /[a-zA-Z_][a-zA-Z0-9_]*(?:\/[a-zA-Z][a-zA-Z0-9_]*)?/
            });
            function u(l) {
              return l.reduce((d, p) => ({ ...d, ...p }), {});
            }
            var y = {
              Lexer: o,
              ParserRules: [
                { name: "main$ebnf$1", symbols: ["comment"], postprocess: f },
                { name: "main$ebnf$1", symbols: [], postprocess: function(l) {
                  return null;
                } },
                { name: "main", symbols: ["_", "boolType", "arrayType", "__", "field", "_", "main$ebnf$1", "simple"], postprocess: function(l) {
                  return u(l);
                } },
                { name: "main$ebnf$2", symbols: ["comment"], postprocess: f },
                { name: "main$ebnf$2", symbols: [], postprocess: function(l) {
                  return null;
                } },
                { name: "main", symbols: ["_", "bigintType", "arrayType", "__", "field", "_", "main$ebnf$2", "simple"], postprocess: function(l) {
                  return u(l);
                } },
                { name: "main$ebnf$3", symbols: ["comment"], postprocess: f },
                { name: "main$ebnf$3", symbols: [], postprocess: function(l) {
                  return null;
                } },
                { name: "main", symbols: ["_", "numericType", "arrayType", "__", "field", "_", "main$ebnf$3", "simple"], postprocess: function(l) {
                  return u(l);
                } },
                { name: "main$ebnf$4", symbols: ["comment"], postprocess: f },
                { name: "main$ebnf$4", symbols: [], postprocess: function(l) {
                  return null;
                } },
                { name: "main", symbols: ["_", "stringType", "arrayType", "__", "field", "_", "main$ebnf$4", "simple"], postprocess: function(l) {
                  return u(l);
                } },
                { name: "main$ebnf$5", symbols: ["comment"], postprocess: f },
                { name: "main$ebnf$5", symbols: [], postprocess: function(l) {
                  return null;
                } },
                { name: "main", symbols: ["_", "timeType", "arrayType", "__", "field", "_", "main$ebnf$5", "simple"], postprocess: function(l) {
                  return u(l);
                } },
                { name: "main$ebnf$6", symbols: ["comment"], postprocess: f },
                { name: "main$ebnf$6", symbols: [], postprocess: function(l) {
                  return null;
                } },
                { name: "main", symbols: ["_", "customType", "arrayType", "__", "field", "_", "main$ebnf$6", "complex"], postprocess: function(l) {
                  return u(l);
                } },
                { name: "main$ebnf$7", symbols: ["comment"], postprocess: f },
                { name: "main$ebnf$7", symbols: [], postprocess: function(l) {
                  return null;
                } },
                { name: "main", symbols: ["_", "boolType", "__", "constantField", "_", "boolConstantValue", "_", "main$ebnf$7"], postprocess: function(l) {
                  return u(l);
                } },
                { name: "main$ebnf$8", symbols: ["comment"], postprocess: f },
                { name: "main$ebnf$8", symbols: [], postprocess: function(l) {
                  return null;
                } },
                { name: "main", symbols: ["_", "bigintType", "__", "constantField", "_", "bigintConstantValue", "_", "main$ebnf$8"], postprocess: function(l) {
                  return u(l);
                } },
                { name: "main$ebnf$9", symbols: ["comment"], postprocess: f },
                { name: "main$ebnf$9", symbols: [], postprocess: function(l) {
                  return null;
                } },
                { name: "main", symbols: ["_", "numericType", "__", "constantField", "_", "numericConstantValue", "_", "main$ebnf$9"], postprocess: function(l) {
                  return u(l);
                } },
                { name: "main$ebnf$10", symbols: ["comment"], postprocess: f },
                { name: "main$ebnf$10", symbols: [], postprocess: function(l) {
                  return null;
                } },
                { name: "main", symbols: ["_", "stringType", "__", "constantField", "_", "stringConstantValue", "_", "main$ebnf$10"], postprocess: function(l) {
                  return u(l);
                } },
                { name: "main", symbols: ["comment"], postprocess: function(l) {
                  return null;
                } },
                { name: "main", symbols: ["blankLine"], postprocess: function(l) {
                  return null;
                } },
                { name: "boolType", symbols: [{ literal: "bool" }], postprocess: function(l) {
                  return { type: l[0].value };
                } },
                { name: "bigintType$subexpression$1", symbols: [{ literal: "int64" }] },
                { name: "bigintType$subexpression$1", symbols: [{ literal: "uint64" }] },
                { name: "bigintType", symbols: ["bigintType$subexpression$1"], postprocess: function(l) {
                  return { type: l[0][0].value };
                } },
                { name: "numericType$subexpression$1", symbols: [{ literal: "byte" }] },
                { name: "numericType$subexpression$1", symbols: [{ literal: "char" }] },
                { name: "numericType$subexpression$1", symbols: [{ literal: "float32" }] },
                { name: "numericType$subexpression$1", symbols: [{ literal: "float64" }] },
                { name: "numericType$subexpression$1", symbols: [{ literal: "int8" }] },
                { name: "numericType$subexpression$1", symbols: [{ literal: "uint8" }] },
                { name: "numericType$subexpression$1", symbols: [{ literal: "int16" }] },
                { name: "numericType$subexpression$1", symbols: [{ literal: "uint16" }] },
                { name: "numericType$subexpression$1", symbols: [{ literal: "int32" }] },
                { name: "numericType$subexpression$1", symbols: [{ literal: "uint32" }] },
                { name: "numericType", symbols: ["numericType$subexpression$1"], postprocess: function(l) {
                  return { type: l[0][0].value };
                } },
                { name: "stringType", symbols: [{ literal: "string" }], postprocess: function(l) {
                  return { type: l[0].value };
                } },
                { name: "timeType$subexpression$1", symbols: [{ literal: "time" }] },
                { name: "timeType$subexpression$1", symbols: [{ literal: "duration" }] },
                { name: "timeType", symbols: ["timeType$subexpression$1"], postprocess: function(l) {
                  return { type: l[0][0].value };
                } },
                { name: "customType", symbols: [o.has("fieldOrType") ? { type: "fieldOrType" } : fieldOrType], postprocess: function(l, d, p) {
                  const g = ["bool", "byte", "char", "float32", "float64", "int8", "uint8", "int16", "uint16", "int32", "uint32", "int64", "uint64", "string", "time", "duration"], b = l[0].value;
                  return g.includes(b) ? p : { type: b };
                } },
                { name: "arrayType", symbols: [{ literal: "[" }, "_", { literal: "]" }], postprocess: function(l) {
                  return { isArray: !0 };
                } },
                { name: "arrayType", symbols: [{ literal: "[" }, "_", "number", "_", { literal: "]" }], postprocess: function(l) {
                  return { isArray: !0, arrayLength: l[2] };
                } },
                { name: "arrayType", symbols: ["_"], postprocess: function(l) {
                  return { isArray: !1 };
                } },
                { name: "field", symbols: [o.has("fieldOrType") ? { type: "fieldOrType" } : fieldOrType], postprocess: function(l, d, p) {
                  const g = l[0].value;
                  return g.match(/^[a-zA-Z][a-zA-Z0-9_]*$/) == null ? p : { name: g };
                } },
                { name: "constantField", symbols: [o.has("fieldOrType") ? { type: "fieldOrType" } : fieldOrType], postprocess: function(l, d, p) {
                  const g = l[0].value;
                  return g.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/) == null ? p : { name: g, isConstant: !0 };
                } },
                { name: "boolConstantValue", symbols: ["assignment"], postprocess: function(l, d, p) {
                  const g = l[0].split("#")[0].trim();
                  return g === "True" || g === "1" ? { value: !0, valueText: g } : g === "False" || g === "0" ? { value: !1, valueText: g } : p;
                } },
                { name: "numericConstantValue", symbols: ["assignment"], postprocess: function(l, d, p) {
                  const g = l[0].split("#")[0].trim(), b = parseFloat(g);
                  return isNaN(b) ? p : { value: b, valueText: g };
                } },
                { name: "bigintConstantValue", symbols: ["assignment"], postprocess: function(l, d, p) {
                  const g = l[0].split("#")[0].trim();
                  try {
                    return { value: BigInt(g), valueText: g };
                  } catch {
                    return p;
                  }
                } },
                { name: "stringConstantValue", symbols: ["assignment"], postprocess: function(l) {
                  return { value: l[0], valueText: l[0] };
                } },
                { name: "bool$subexpression$1", symbols: [{ literal: "True" }] },
                { name: "bool$subexpression$1", symbols: [{ literal: "1" }] },
                { name: "bool", symbols: ["bool$subexpression$1"], postprocess: function(l) {
                  return !0;
                } },
                { name: "bool$subexpression$2", symbols: [{ literal: "False" }] },
                { name: "bool$subexpression$2", symbols: [{ literal: "0" }] },
                { name: "bool", symbols: ["bool$subexpression$2"], postprocess: function(l) {
                  return !1;
                } },
                { name: "number", symbols: [o.has("number") ? { type: "number" } : number], postprocess: function(l) {
                  return parseFloat(l[0].value);
                } },
                { name: "assignment", symbols: [o.has("assignment") ? { type: "assignment" } : assignment], postprocess: function(l) {
                  return l[0].value.substr(1).trim();
                } },
                { name: "comment", symbols: [o.has("comment") ? { type: "comment" } : comment], postprocess: function(l) {
                  return null;
                } },
                { name: "blankLine", symbols: ["_"], postprocess: function(l) {
                  return null;
                } },
                { name: "_$subexpression$1", symbols: [] },
                { name: "_$subexpression$1", symbols: [o.has("space") ? { type: "space" } : space] },
                { name: "_", symbols: ["_$subexpression$1"], postprocess: function(l) {
                  return null;
                } },
                { name: "__", symbols: [o.has("space") ? { type: "space" } : space], postprocess: function(l) {
                  return null;
                } },
                { name: "simple", symbols: [], postprocess: function() {
                  return { isComplex: !1 };
                } },
                { name: "complex", symbols: [], postprocess: function() {
                  return { isComplex: !0 };
                } }
              ],
              ParserStart: "main"
            };
            typeof s.exports < "u" ? s.exports = y : window.grammar = y;
          })();
        }
      ),
      /***/
      654: (
        /***/
        function(s) {
          (function(a, c) {
            s.exports ? s.exports = c() : a.nearley = c();
          })(this, function() {
            function a(d, p, g) {
              return this.id = ++a.highestId, this.name = d, this.symbols = p, this.postprocess = g, this;
            }
            a.highestId = 0, a.prototype.toString = function(d) {
              var p = typeof d > "u" ? this.symbols.map(l).join(" ") : this.symbols.slice(0, d).map(l).join(" ") + " ● " + this.symbols.slice(d).map(l).join(" ");
              return this.name + " → " + p;
            };
            function c(d, p, g, b) {
              this.rule = d, this.dot = p, this.reference = g, this.data = [], this.wantedBy = b, this.isComplete = this.dot === d.symbols.length;
            }
            c.prototype.toString = function() {
              return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
            }, c.prototype.nextState = function(d) {
              var p = new c(this.rule, this.dot + 1, this.reference, this.wantedBy);
              return p.left = this, p.right = d, p.isComplete && (p.data = p.build(), p.right = void 0), p;
            }, c.prototype.build = function() {
              var d = [], p = this;
              do
                d.push(p.right.data), p = p.left;
              while (p.left);
              return d.reverse(), d;
            }, c.prototype.finish = function() {
              this.rule.postprocess && (this.data = this.rule.postprocess(this.data, this.reference, u.fail));
            };
            function f(d, p) {
              this.grammar = d, this.index = p, this.states = [], this.wants = {}, this.scannable = [], this.completed = {};
            }
            f.prototype.process = function(d) {
              for (var p = this.states, g = this.wants, b = this.completed, A = 0; A < p.length; A++) {
                var E = p[A];
                if (E.isComplete) {
                  if (E.finish(), E.data !== u.fail) {
                    for (var T = E.wantedBy, B = T.length; B--; ) {
                      var M = T[B];
                      this.complete(M, E);
                    }
                    if (E.reference === this.index) {
                      var S = E.rule.name;
                      (this.completed[S] = this.completed[S] || []).push(E);
                    }
                  }
                } else {
                  var S = E.rule.symbols[E.dot];
                  if (typeof S != "string") {
                    this.scannable.push(E);
                    continue;
                  }
                  if (g[S]) {
                    if (g[S].push(E), b.hasOwnProperty(S))
                      for (var v = b[S], B = 0; B < v.length; B++) {
                        var R = v[B];
                        this.complete(E, R);
                      }
                  } else
                    g[S] = [E], this.predict(S);
                }
              }
            }, f.prototype.predict = function(d) {
              for (var p = this.grammar.byName[d] || [], g = 0; g < p.length; g++) {
                var b = p[g], A = this.wants[d], E = new c(b, 0, this.index, A);
                this.states.push(E);
              }
            }, f.prototype.complete = function(d, p) {
              var g = d.nextState(p);
              this.states.push(g);
            };
            function h(d, p) {
              this.rules = d, this.start = p || this.rules[0].name;
              var g = this.byName = {};
              this.rules.forEach(function(b) {
                g.hasOwnProperty(b.name) || (g[b.name] = []), g[b.name].push(b);
              });
            }
            h.fromCompiled = function(b, p) {
              var g = b.Lexer;
              b.ParserStart && (p = b.ParserStart, b = b.ParserRules);
              var b = b.map(function(E) {
                return new a(E.name, E.symbols, E.postprocess);
              }), A = new h(b, p);
              return A.lexer = g, A;
            };
            function o() {
              this.reset("");
            }
            o.prototype.reset = function(d, p) {
              this.buffer = d, this.index = 0, this.line = p ? p.line : 1, this.lastLineBreak = p ? -p.col : 0;
            }, o.prototype.next = function() {
              if (this.index < this.buffer.length) {
                var d = this.buffer[this.index++];
                return d === `
` && (this.line += 1, this.lastLineBreak = this.index), { value: d };
              }
            }, o.prototype.save = function() {
              return {
                line: this.line,
                col: this.index - this.lastLineBreak
              };
            }, o.prototype.formatError = function(d, p) {
              var g = this.buffer;
              if (typeof g == "string") {
                var b = g.split(`
`).slice(
                  Math.max(0, this.line - 5),
                  this.line
                ), A = g.indexOf(`
`, this.index);
                A === -1 && (A = g.length);
                var E = this.index - this.lastLineBreak, T = String(this.line).length;
                return p += " at line " + this.line + " col " + E + `:

`, p += b.map(function(M, S) {
                  return B(this.line - b.length + S + 1, T) + " " + M;
                }, this).join(`
`), p += `
` + B("", T + E) + `^
`, p;
              } else
                return p + " at index " + (this.index - 1);
              function B(M, S) {
                var v = String(M);
                return Array(S - v.length + 1).join(" ") + v;
              }
            };
            function u(d, p, g) {
              if (d instanceof h)
                var b = d, g = p;
              else
                var b = h.fromCompiled(d, p);
              this.grammar = b, this.options = {
                keepHistory: !1,
                lexer: b.lexer || new o()
              };
              for (var A in g || {})
                this.options[A] = g[A];
              this.lexer = this.options.lexer, this.lexerState = void 0;
              var E = new f(b, 0);
              this.table = [E], E.wants[b.start] = [], E.predict(b.start), E.process(), this.current = 0;
            }
            u.fail = {}, u.prototype.feed = function(d) {
              var p = this.lexer;
              p.reset(d, this.lexerState);
              for (var g; ; ) {
                try {
                  if (g = p.next(), !g)
                    break;
                } catch (tt) {
                  var T = new f(this.grammar, this.current + 1);
                  this.table.push(T);
                  var b = new Error(this.reportLexerError(tt));
                  throw b.offset = this.current, b.token = tt.token, b;
                }
                var A = this.table[this.current];
                this.options.keepHistory || delete this.table[this.current - 1];
                var E = this.current + 1, T = new f(this.grammar, E);
                this.table.push(T);
                for (var B = g.text !== void 0 ? g.text : g.value, M = p.constructor === o ? g.value : g, S = A.scannable, v = S.length; v--; ) {
                  var R = S[v], V = R.rule.symbols[R.dot];
                  if (V.test ? V.test(M) : V.type ? V.type === g.type : V.literal === B) {
                    var F = R.nextState({ data: M, token: g, isToken: !0, reference: E - 1 });
                    T.states.push(F);
                  }
                }
                if (T.process(), T.states.length === 0) {
                  var b = new Error(this.reportError(g));
                  throw b.offset = this.current, b.token = g, b;
                }
                this.options.keepHistory && (A.lexerState = p.save()), this.current++;
              }
              return A && (this.lexerState = p.save()), this.results = this.finish(), this;
            }, u.prototype.reportLexerError = function(d) {
              var p, g, b = d.token;
              return b ? (p = "input " + JSON.stringify(b.text[0]) + " (lexer error)", g = this.lexer.formatError(b, "Syntax error")) : (p = "input (lexer error)", g = d.message), this.reportErrorCommon(g, p);
            }, u.prototype.reportError = function(d) {
              var p = (d.type ? d.type + " token: " : "") + JSON.stringify(d.value !== void 0 ? d.value : d), g = this.lexer.formatError(d, "Syntax error");
              return this.reportErrorCommon(g, p);
            }, u.prototype.reportErrorCommon = function(d, p) {
              var g = [];
              g.push(d);
              var b = this.table.length - 2, A = this.table[b], E = A.states.filter(function(B) {
                var M = B.rule.symbols[B.dot];
                return M && typeof M != "string";
              });
              if (E.length === 0)
                g.push("Unexpected " + p + `. I did not expect any more input. Here is the state of my parse table:
`), this.displayStateStack(A.states, g);
              else {
                g.push("Unexpected " + p + `. Instead, I was expecting to see one of the following:
`);
                var T = E.map(function(B) {
                  return this.buildFirstStateStack(B, []) || [B];
                }, this);
                T.forEach(function(B) {
                  var M = B[0], S = M.rule.symbols[M.dot], v = this.getSymbolDisplay(S);
                  g.push("A " + v + " based on:"), this.displayStateStack(B, g);
                }, this);
              }
              return g.push(""), g.join(`
`);
            }, u.prototype.displayStateStack = function(d, p) {
              for (var g, b = 0, A = 0; A < d.length; A++) {
                var E = d[A], T = E.rule.toString(E.dot);
                T === g ? b++ : (b > 0 && p.push("    ^ " + b + " more lines identical to this"), b = 0, p.push("    " + T)), g = T;
              }
            }, u.prototype.getSymbolDisplay = function(d) {
              return y(d);
            }, u.prototype.buildFirstStateStack = function(d, p) {
              if (p.indexOf(d) !== -1)
                return null;
              if (d.wantedBy.length === 0)
                return [d];
              var g = d.wantedBy[0], b = [d].concat(p), A = this.buildFirstStateStack(g, b);
              return A === null ? null : [d].concat(A);
            }, u.prototype.save = function() {
              var d = this.table[this.current];
              return d.lexerState = this.lexerState, d;
            }, u.prototype.restore = function(d) {
              var p = d.index;
              this.current = p, this.table[p] = d, this.table.splice(p + 1), this.lexerState = d.lexerState, this.results = this.finish();
            }, u.prototype.rewind = function(d) {
              if (!this.options.keepHistory)
                throw new Error("set option `keepHistory` to enable rewinding");
              this.restore(this.table[d]);
            }, u.prototype.finish = function() {
              var d = [], p = this.grammar.start, g = this.table[this.table.length - 1];
              return g.states.forEach(function(b) {
                b.rule.name === p && b.dot === b.rule.symbols.length && b.reference === 0 && b.data !== u.fail && d.push(b);
              }), d.map(function(b) {
                return b.data;
              });
            };
            function y(d) {
              var p = typeof d;
              if (p === "string")
                return d;
              if (p === "object") {
                if (d.literal)
                  return JSON.stringify(d.literal);
                if (d instanceof RegExp)
                  return "character matching " + d;
                if (d.type)
                  return d.type + " token";
                if (d.test)
                  return "token matching " + String(d.test);
                throw new Error("Unknown symbol type: " + d);
              }
            }
            function l(d) {
              var p = typeof d;
              if (p === "string")
                return d;
              if (p === "object") {
                if (d.literal)
                  return JSON.stringify(d.literal);
                if (d instanceof RegExp)
                  return d.toString();
                if (d.type)
                  return "%" + d.type;
                if (d.test)
                  return "<" + String(d.test) + ">";
                throw new Error("Unknown symbol type: " + d);
              }
            }
            return {
              Parser: u,
              Grammar: h,
              Rule: a
            };
          });
        }
      ),
      /***/
      515: (
        /***/
        (s, a) => {
          Object.defineProperty(a, "__esModule", { value: !0 }), a.buildRos2Type = void 0;
          const c = String.raw`(?<type>[a-zA-Z0-9_/]+)`, f = String.raw`(?:<=(?<stringBound>\d+))`, h = String.raw`(?:(?<unboundedArray>\[\])|\[(?<arrayLength>\d+)\]|\[<=(?<arrayBound>\d+)\])`, o = String.raw`(?<name>[a-zA-Z0-9_]+)`, u = String.raw`'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"`, y = String.raw`(?:${u}|(?:\\.|[^\s'"#\\])(?:\\.|[^#\\])*)`, l = String.raw`(?:${u}|(?:\\.|[^\s'"\],#\\])(?:\\.|[^\],#\\])*)`, d = String.raw`\s*=\s*(?<constantValue>${y}?)`, p = String.raw`\[(?:${l},)*${l}?\]`, g = String.raw`(?<defaultValue>${p}|${y})`, b = String.raw`(?:#.*)`, A = new RegExp(String.raw`^${c}${f}?${h}?\s+${o}(?:${d}|\s+${g})?\s*${b}?$`), E = String.raw`\\(?<char>['"abfnrtv\\])|\\(?<oct>[0-7]{1,3})|\\x(?<hex2>[a-fA-F0-9]{2})|\\u(?<hex4>[a-fA-F0-9]{4})|\\U(?<hex8>[a-fA-F0-9]{8})`, T = [
            "bool",
            "byte",
            "char",
            "float32",
            "float64",
            "int8",
            "uint8",
            "int16",
            "uint16",
            "int32",
            "uint32",
            "int64",
            "uint64",
            "string",
            "wstring",
            "time",
            "duration",
            "builtin_interfaces/Time",
            "builtin_interfaces/Duration",
            "builtin_interfaces/msg/Time",
            "builtin_interfaces/msg/Duration"
          ];
          function B($, O, W) {
            const P = BigInt($);
            if (P < O || P > W)
              throw new Error(`Number ${$} out of range [${O}, ${W}]`);
            return P;
          }
          function M($, O, W) {
            const P = parseInt($);
            if (Number.isNaN(P))
              throw new Error(`Invalid numeric literal: ${$}`);
            if (P < O || P > W)
              throw new Error(`Number ${$} out of range [${O}, ${W}]`);
            return P;
          }
          const S = new RegExp(l, "y"), v = /\s*(,)\s*|\s*$/y;
          function R($, O) {
            if (!O.startsWith("[") || !O.endsWith("]"))
              throw new Error("Array must start with [ and end with ]");
            const W = O.substring(1, O.length - 1);
            if ($ === "string" || $ === "wstring") {
              const P = [];
              let m = 0;
              for (; m < W.length; ) {
                if (W[m] === ",")
                  throw new Error("Expected array element before comma");
                S.lastIndex = m;
                let w = S.exec(W);
                if (w && (P.push(V(w[0])), m = S.lastIndex), v.lastIndex = m, w = v.exec(W), !w)
                  throw new Error("Expected comma or end of array");
                if (!w[1])
                  break;
                m = v.lastIndex;
              }
              return P;
            }
            return W.split(",").map((P) => F($, P.trim()));
          }
          function V($) {
            let O = "", W = $;
            for (const P of ["'", '"'])
              if ($.startsWith(P)) {
                if (!$.endsWith(P))
                  throw new Error(`Expected terminating ${P} in string literal: ${$}`);
                O = P, W = $.substring(P.length, $.length - P.length);
                break;
              }
            if (!new RegExp(String.raw`^(?:[^\\${O}]|${E})*$`).test(W) == null)
              throw new Error(`Invalid string literal: ${W}`);
            return W.replace(new RegExp(E, "g"), (...P) => {
              const { char: m, oct: w, hex2: x, hex4: C, hex8: L } = P[P.length - 1], I = x ?? C ?? L;
              if (m != null)
                return {
                  "'": "'",
                  '"': '"',
                  a: "\x07",
                  b: "\b",
                  f: "\f",
                  n: `
`,
                  r: "\r",
                  t: "	",
                  v: "\v",
                  "\\": "\\"
                }[m];
              if (w != null)
                return String.fromCodePoint(parseInt(w, 8));
              if (I != null)
                return String.fromCodePoint(parseInt(I, 16));
              throw new Error("Expected exactly one matched group");
            });
          }
          function F($, O) {
            switch ($) {
              case "bool":
                if (["true", "True", "1"].includes(O))
                  return !0;
                if (["false", "False", "0"].includes(O))
                  return !1;
                break;
              case "float32":
              case "float64": {
                const W = parseFloat(O);
                if (!Number.isNaN(W))
                  return W;
                break;
              }
              case "int8":
                return M(O, -128, 127);
              case "uint8":
                return M(O, 0, 255);
              case "int16":
                return M(O, -32768, 32767);
              case "uint16":
                return M(O, 0, 65535);
              case "int32":
                return M(O, -2147483648, 2147483647);
              case "uint32":
                return M(O, 0, 4294967295);
              case "int64":
                return B(O, ~0x7fffffffffffffffn, 0x7fffffffffffffffn);
              case "uint64":
                return B(O, 0n, 0xffffffffffffffffn);
              case "string":
              case "wstring":
                return V(O);
            }
            throw new Error(`Invalid literal of type ${$}: ${O}`);
          }
          function tt($) {
            switch ($) {
              case "char":
                return "uint8";
              case "byte":
                return "uint8";
              case "builtin_interfaces/Time":
              case "builtin_interfaces/msg/Time":
                return "time";
              case "builtin_interfaces/Duration":
              case "builtin_interfaces/msg/Duration":
                return "duration";
            }
            return $;
          }
          function ut($) {
            const O = [];
            let W;
            for (const { line: P } of $) {
              let m;
              if (!P.startsWith("#"))
                if (m = /^MSG: ([^ ]+)\s*(?:#.+)?$/.exec(P)) {
                  W = m[1];
                  continue;
                } else if (m = A.exec(P)) {
                  const { type: w, stringBound: x, unboundedArray: C, arrayLength: L, arrayBound: I, name: k, constantValue: N, defaultValue: z } = m.groups, _ = tt(w);
                  if (x != null && _ !== "string" && _ !== "wstring")
                    throw new Error(`Invalid string bound for type ${_}`);
                  if (N != null) {
                    if (!/^[A-Z](?:_?[A-Z0-9]+)*$/.test(k))
                      throw new Error(`Invalid constant name: ${k}`);
                  } else if (!/^[a-z](?:_?[a-z0-9]+)*$/.test(k))
                    throw new Error(`Invalid field name: ${k}`);
                  const G = !T.includes(_), ot = C != null || L != null || I != null;
                  O.push({
                    name: k,
                    type: _,
                    isComplex: N != null ? G || void 0 : G,
                    isConstant: N != null || void 0,
                    isArray: N != null ? ot || void 0 : ot,
                    arrayLength: L != null ? parseInt(L) : void 0,
                    arrayUpperBound: I != null ? parseInt(I) : void 0,
                    upperBound: x != null ? parseInt(x) : void 0,
                    defaultValue: z != null ? ot ? R(_, z.trim()) : F(_, z.trim()) : void 0,
                    value: N != null ? F(_, N.trim()) : void 0,
                    valueText: N == null ? void 0 : N.trim()
                  });
                } else
                  throw new Error(`Could not parse line: '${P}'`);
            }
            return { name: W, definitions: O };
          }
          a.buildRos2Type = ut;
        }
      ),
      /***/
      715: (
        /***/
        function(s, a, c) {
          var f = this && this.__createBinding || (Object.create ? function(o, u, y, l) {
            l === void 0 && (l = y);
            var d = Object.getOwnPropertyDescriptor(u, y);
            (!d || ("get" in d ? !u.__esModule : d.writable || d.configurable)) && (d = { enumerable: !0, get: function() {
              return u[y];
            } }), Object.defineProperty(o, l, d);
          } : function(o, u, y, l) {
            l === void 0 && (l = y), o[l] = u[y];
          }), h = this && this.__exportStar || function(o, u) {
            for (var y in o) y !== "default" && !Object.prototype.hasOwnProperty.call(u, y) && f(u, o, y);
          };
          Object.defineProperty(a, "__esModule", { value: !0 }), h(c(322), a), h(c(867), a), h(c(210), a);
        }
      ),
      /***/
      322: (
        /***/
        (s, a, c) => {
          Object.defineProperty(a, "__esModule", { value: !0 }), a.md5 = void 0;
          const f = c(417), h = /* @__PURE__ */ new Set([
            "int8",
            "uint8",
            "int16",
            "uint16",
            "int32",
            "uint32",
            "int64",
            "uint64",
            "float32",
            "float64",
            "string",
            "bool",
            "char",
            "byte",
            "time",
            "duration"
          ]);
          function o(l) {
            if (l.length === 0)
              throw new Error("Cannot produce md5sum for empty msgDefs");
            const d = /* @__PURE__ */ new Map();
            for (const g of l)
              g.name != null && d.set(g.name, g);
            const p = l[0];
            return u(p, d);
          }
          a.md5 = o;
          function u(l, d) {
            let p = "";
            const g = l.definitions.filter(({ isConstant: A }) => A), b = l.definitions.filter(({ isConstant: A }) => A == null || !A);
            for (const A of g)
              p += `${A.type} ${A.name}=${A.valueText ?? String(A.value)}
`;
            for (const A of b)
              if (y(A.type)) {
                const E = A.arrayLength != null ? String(A.arrayLength) : "", T = A.isArray === !0 ? `[${E}]` : "";
                p += `${A.type}${T} ${A.name}
`;
              } else {
                const E = d.get(A.type);
                if (E == null)
                  throw new Error(`Missing definition for submessage type "${A.type}"`);
                const T = u(E, d);
                p += `${T} ${A.name}
`;
              }
            return p = p.trimEnd(), f.Md5.init(p);
          }
          function y(l) {
            return h.has(l);
          }
        }
      ),
      /***/
      867: (
        /***/
        function(s, a, c) {
          var f = this && this.__importDefault || function(T) {
            return T && T.__esModule ? T : { default: T };
          };
          Object.defineProperty(a, "__esModule", { value: !0 }), a.normalizeType = a.fixupTypes = a.parse = void 0;
          const h = c(767), o = c(654), u = c(515), y = f(c(558)), l = o.Grammar.fromCompiled(y.default);
          function d(T, B = {}) {
            const M = T.split(`
`).map((F) => F.trim()).filter((F) => F);
            let S = [];
            const v = [];
            M.forEach((F) => {
              F.startsWith("#") || (F.startsWith("==") ? (v.push(B.ros2 === !0 ? (0, u.buildRos2Type)(S) : g(S, l)), S = []) : S.push({ line: F }));
            }), v.push(B.ros2 === !0 ? (0, u.buildRos2Type)(S) : g(S, l));
            const R = [], V = v.filter((F) => R.find((tt) => (0, h.isMsgDefEqual)(F, tt)) ? !1 : R.push(F));
            return B.skipTypeFixup !== !0 && p(V), V;
          }
          a.parse = d;
          function p(T) {
            T.forEach(({ definitions: B, name: M }) => {
              B.forEach((S) => {
                if (S.isComplex === !0) {
                  const v = M == null ? void 0 : M.split("/").slice(0, -1).join("/"), R = A(T, S.type, v).name;
                  if (R == null)
                    throw new Error(`Missing type definition for ${S.type}`);
                  S.type = R;
                }
              });
            });
          }
          a.fixupTypes = p;
          function g(T, B) {
            const M = [];
            let S;
            return T.forEach(({ line: v }) => {
              if (v.startsWith("MSG:")) {
                const [tt, ut] = b(v);
                S = ut == null ? void 0 : ut.trim();
                return;
              }
              const R = new o.Parser(B);
              R.feed(v);
              const V = R.finish();
              if (V.length === 0)
                throw new Error(`Could not parse line: '${v}'`);
              if (V.length > 1)
                throw new Error(`Ambiguous line: '${v}'`);
              const F = V[0];
              F != null && (F.type = E(F.type), M.push(F));
            }), { name: S, definitions: M };
          }
          function b(T) {
            return T.replace(/#.*/gi, "").split(" ").filter((B) => B);
          }
          function A(T, B, M) {
            const S = T.filter((v) => {
              const R = v.name ?? "";
              return B.length === 0 ? R.length === 0 : B.includes("/") ? R === B : B === "Header" ? R === "std_msgs/Header" : M ? R === `${M}/${B}` : R.endsWith(`/${B}`);
            });
            if (S[0] == null)
              throw new Error(`Expected 1 top level type definition for '${B}' but found ${S.length}`);
            if (S.length > 1)
              throw new Error(`Cannot unambiguously determine fully-qualified type name for '${B}'`);
            return S[0];
          }
          function E(T) {
            return T === "char" ? "uint8" : T === "byte" ? "int8" : T;
          }
          a.normalizeType = E;
        }
      ),
      /***/
      210: (
        /***/
        (s, a) => {
          Object.defineProperty(a, "__esModule", { value: !0 }), a.stringify = void 0;
          function c(h) {
            let o = "";
            for (let u = 0; u < h.length; u++) {
              const y = h[u], l = y.definitions.filter(({ isConstant: p }) => p), d = y.definitions.filter(({ isConstant: p }) => p == null || !p);
              u > 0 && (o += `
================================================================================
`, o += `MSG: ${y.name ?? ""}
`);
              for (const p of l)
                o += `${p.type} ${p.name} = ${p.valueText ?? String(p.value)}
`;
              if (d.length > 0) {
                o.length > 0 && (o += `
`);
                for (const p of d) {
                  const g = p.upperBound != null ? `<=${p.upperBound}` : "", b = p.arrayLength != null ? String(p.arrayLength) : p.arrayUpperBound != null ? `<=${p.arrayUpperBound}` : "", A = p.isArray === !0 ? `[${b}]` : "", E = p.defaultValue != null ? ` ${f(p.defaultValue)}` : "";
                  o += `${p.type}${g}${A} ${p.name}${E}
`;
                }
              }
            }
            return o.trimEnd();
          }
          a.stringify = c;
          function f(h) {
            return Array.isArray(h) ? `[${h.map((o) => typeof o == "bigint" ? o.toString() : JSON.stringify(o)).join(", ")}]` : typeof h == "bigint" ? h.toString() : JSON.stringify(h);
          }
        }
      )
      /******/
    }, e = {};
    function r(s) {
      var a = e[s];
      if (a !== void 0)
        return a.exports;
      var c = e[s] = {
        /******/
        // no module.id needed
        /******/
        // no module.loaded needed
        /******/
        exports: {}
        /******/
      };
      return t[s].call(c.exports, c, c.exports, r), c.exports;
    }
    r.d = (s, a) => {
      for (var c in a)
        r.o(a, c) && !r.o(s, c) && Object.defineProperty(s, c, { enumerable: !0, get: a[c] });
    }, r.o = (s, a) => Object.prototype.hasOwnProperty.call(s, a), r.r = (s) => {
      typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(s, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(s, "__esModule", { value: !0 });
    };
    var n = r(715);
    i.exports = n;
  })();
})(ve);
var ar = ve.exports, xe = {}, Vt = {}, te = {}, Gt = {}, Mt = {}, jt = {};
(function(i) {
  Object.defineProperty(i, "__esModule", { value: !0 }), i.EncapsulationKind = void 0, function(t) {
    t[t.CDR_BE = 0] = "CDR_BE", t[t.CDR_LE = 1] = "CDR_LE", t[t.PL_CDR_BE = 2] = "PL_CDR_BE", t[t.PL_CDR_LE = 3] = "PL_CDR_LE", t[t.CDR2_BE = 16] = "CDR2_BE", t[t.CDR2_LE = 17] = "CDR2_LE", t[t.PL_CDR2_BE = 18] = "PL_CDR2_BE", t[t.PL_CDR2_LE = 19] = "PL_CDR2_LE", t[t.DELIMITED_CDR2_BE = 20] = "DELIMITED_CDR2_BE", t[t.DELIMITED_CDR2_LE = 21] = "DELIMITED_CDR2_LE", t[t.RTPS_CDR2_BE = 6] = "RTPS_CDR2_BE", t[t.RTPS_CDR2_LE = 7] = "RTPS_CDR2_LE", t[t.RTPS_DELIMITED_CDR2_BE = 8] = "RTPS_DELIMITED_CDR2_BE", t[t.RTPS_DELIMITED_CDR2_LE = 9] = "RTPS_DELIMITED_CDR2_LE", t[t.RTPS_PL_CDR2_BE = 10] = "RTPS_PL_CDR2_BE", t[t.RTPS_PL_CDR2_LE = 11] = "RTPS_PL_CDR2_LE";
  }(i.EncapsulationKind || (i.EncapsulationKind = {}));
})(jt);
Object.defineProperty(Mt, "__esModule", { value: !0 });
Mt.getEncapsulationKindInfo = void 0;
const j = jt, or = (i) => {
  const t = i > j.EncapsulationKind.PL_CDR_LE, e = i === j.EncapsulationKind.CDR_LE || i === j.EncapsulationKind.PL_CDR_LE || i === j.EncapsulationKind.CDR2_LE || i === j.EncapsulationKind.PL_CDR2_LE || i === j.EncapsulationKind.DELIMITED_CDR2_LE || i === j.EncapsulationKind.RTPS_CDR2_LE || i === j.EncapsulationKind.RTPS_PL_CDR2_LE || i === j.EncapsulationKind.RTPS_DELIMITED_CDR2_LE, r = i === j.EncapsulationKind.DELIMITED_CDR2_BE || i === j.EncapsulationKind.DELIMITED_CDR2_LE || i === j.EncapsulationKind.RTPS_DELIMITED_CDR2_BE || i === j.EncapsulationKind.RTPS_DELIMITED_CDR2_LE, n = i === j.EncapsulationKind.PL_CDR2_BE || i === j.EncapsulationKind.PL_CDR2_LE || i === j.EncapsulationKind.RTPS_PL_CDR2_BE || i === j.EncapsulationKind.RTPS_PL_CDR2_LE, s = i === j.EncapsulationKind.PL_CDR_BE || i === j.EncapsulationKind.PL_CDR_LE;
  return {
    isCDR2: t,
    littleEndian: e,
    usesDelimiterHeader: r || n,
    usesMemberHeader: n || s
  };
};
Mt.getEncapsulationKindInfo = or;
var Dt = {};
Object.defineProperty(Dt, "__esModule", { value: !0 });
Dt.isBigEndian = void 0;
const _e = new Uint8Array(4), hr = new Uint32Array(_e.buffer);
hr[0] = 1;
function fr() {
  return _e[3] === 1;
}
Dt.isBigEndian = fr;
var dt = {};
Object.defineProperty(dt, "__esModule", { value: !0 });
dt.lengthCodeToObjectSizes = dt.getLengthCodeForObjectSize = void 0;
function ur(i) {
  let t;
  switch (i) {
    case 1:
      t = 0;
      break;
    case 2:
      t = 1;
      break;
    case 4:
      t = 2;
      break;
    case 8:
      t = 3;
      break;
  }
  if (t == null) {
    if (i > 4294967295)
      throw Error(`Object size ${i} for EMHEADER too large without specifying length code. Max size is ${4294967295}`);
    t = 4;
  }
  return t;
}
dt.getLengthCodeForObjectSize = ur;
dt.lengthCodeToObjectSizes = {
  0: 1,
  1: 2,
  2: 4,
  3: 8
};
var pt = {};
Object.defineProperty(pt, "__esModule", { value: !0 });
pt.SENTINEL_PID = pt.EXTENDED_PID = void 0;
pt.EXTENDED_PID = 16129;
pt.SENTINEL_PID = 16130;
Object.defineProperty(Gt, "__esModule", { value: !0 });
Gt.CdrReader = void 0;
const cr = Mt, lr = Dt, dr = dt, bt = pt, pr = new TextDecoder("utf8");
class yr {
  constructor(t) {
    if (this.origin = 0, t.byteLength < 4)
      throw new Error(`Invalid CDR data size ${t.byteLength}, must contain at least a 4-byte header`);
    this.view = new DataView(t.buffer, t.byteOffset, t.byteLength);
    const e = this.kind, { isCDR2: r, littleEndian: n, usesDelimiterHeader: s, usesMemberHeader: a } = (0, cr.getEncapsulationKindInfo)(e);
    this.usesDelimiterHeader = s, this.usesMemberHeader = a, this.littleEndian = n, this.hostLittleEndian = !(0, lr.isBigEndian)(), this.isCDR2 = r, this.eightByteAlignment = r ? 4 : 8, this.origin = 4, this.offset = 4;
  }
  get kind() {
    return this.view.getUint8(1);
  }
  get decodedBytes() {
    return this.offset;
  }
  get byteLength() {
    return this.view.byteLength;
  }
  int8() {
    const t = this.view.getInt8(this.offset);
    return this.offset += 1, t;
  }
  uint8() {
    const t = this.view.getUint8(this.offset);
    return this.offset += 1, t;
  }
  int16() {
    this.align(2);
    const t = this.view.getInt16(this.offset, this.littleEndian);
    return this.offset += 2, t;
  }
  uint16() {
    this.align(2);
    const t = this.view.getUint16(this.offset, this.littleEndian);
    return this.offset += 2, t;
  }
  int32() {
    this.align(4);
    const t = this.view.getInt32(this.offset, this.littleEndian);
    return this.offset += 4, t;
  }
  uint32() {
    this.align(4);
    const t = this.view.getUint32(this.offset, this.littleEndian);
    return this.offset += 4, t;
  }
  int64() {
    this.align(this.eightByteAlignment);
    const t = this.view.getBigInt64(this.offset, this.littleEndian);
    return this.offset += 8, t;
  }
  uint64() {
    this.align(this.eightByteAlignment);
    const t = this.view.getBigUint64(this.offset, this.littleEndian);
    return this.offset += 8, t;
  }
  uint16BE() {
    this.align(2);
    const t = this.view.getUint16(this.offset, !1);
    return this.offset += 2, t;
  }
  uint32BE() {
    this.align(4);
    const t = this.view.getUint32(this.offset, !1);
    return this.offset += 4, t;
  }
  uint64BE() {
    this.align(this.eightByteAlignment);
    const t = this.view.getBigUint64(this.offset, !1);
    return this.offset += 8, t;
  }
  float32() {
    this.align(4);
    const t = this.view.getFloat32(this.offset, this.littleEndian);
    return this.offset += 4, t;
  }
  float64() {
    this.align(this.eightByteAlignment);
    const t = this.view.getFloat64(this.offset, this.littleEndian);
    return this.offset += 8, t;
  }
  string(t) {
    const e = t ?? this.uint32();
    if (e <= 1)
      return this.offset += e, "";
    const r = new Uint8Array(this.view.buffer, this.view.byteOffset + this.offset, e - 1), n = pr.decode(r);
    return this.offset += e, n;
  }
  /** Reads the delimiter header which contains and returns the object size */
  dHeader() {
    return this.uint32();
  }
  /**
   * Reads the member header (EMHEADER) and returns the member ID, mustUnderstand flag, and object size with optional length code
   * The length code is only present in CDR2 and should prompt objectSize to be used in place of sequence length if applicable.
   * See Extensible and Dynamic Topic Types (DDS-XTypes) v1.3 @ `7.4.3.4.2` for more info about CDR2 EMHEADER composition.
   * If a sentinelHeader was read (PL_CDR v1), the readSentinelHeader flag is set to true.
   */
  emHeader() {
    return this.isCDR2 ? this.memberHeaderV2() : this.memberHeaderV1();
  }
  /** XCDR1 PL_CDR encapsulation parameter header*/
  memberHeaderV1() {
    this.align(4);
    const t = this.uint16(), e = (t & 16384) >> 14 === 1, r = (t & 32768) >> 15 === 1, n = (t & 16383) === bt.EXTENDED_PID;
    if ((t & 16383) === bt.SENTINEL_PID)
      return { id: bt.SENTINEL_PID, objectSize: 0, mustUnderstand: !1, readSentinelHeader: !0 };
    if ((t & 16383) > bt.SENTINEL_PID || r)
      throw new Error(`Unsupported parameter ID header ${t.toString(16)}`);
    n && this.uint16();
    const c = n ? this.uint32() : t & 16383, f = n ? this.uint32() : this.uint16();
    return this.resetOrigin(), { id: c, objectSize: f, mustUnderstand: e };
  }
  /** Sets the origin to the offset (DDS-XTypes Spec: `PUSH(ORIGIN = 0)`)*/
  resetOrigin() {
    this.origin = this.offset;
  }
  /** Reads the PID_SENTINEL value if encapsulation kind supports it (PL_CDR version 1)*/
  sentinelHeader() {
    if (!this.isCDR2) {
      this.align(4);
      const t = this.uint16();
      if (!((t & 16383) === bt.SENTINEL_PID))
        throw Error(`Expected SENTINEL_PID (${bt.SENTINEL_PID.toString(16)}) flag, but got ${t.toString(16)}`);
      this.uint16();
    }
  }
  memberHeaderV2() {
    const t = this.uint32(), e = Math.abs((t & 2147483648) >> 31) === 1, r = (t & 1879048192) >> 28, n = t & 268435455, s = this.emHeaderObjectSize(r);
    return { mustUnderstand: e, id: n, objectSize: s, lengthCode: r };
  }
  /** Uses the length code to derive the member object size in
   * the EMHEADER, sometimes reading NEXTINT (the next uint32
   * following the header) from the buffer */
  emHeaderObjectSize(t) {
    switch (t) {
      case 0:
      case 1:
      case 2:
      case 3:
        return dr.lengthCodeToObjectSizes[t];
      case 4:
      case 5:
        return this.uint32();
      case 6:
        return 4 * this.uint32();
      case 7:
        return 8 * this.uint32();
      default:
        throw new Error(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `Invalid length code ${t} in EMHEADER at offset ${this.offset - 4}`
        );
    }
  }
  sequenceLength() {
    return this.uint32();
  }
  int8Array(t = this.sequenceLength()) {
    const e = new Int8Array(this.view.buffer, this.view.byteOffset + this.offset, t);
    return this.offset += t, e;
  }
  uint8Array(t = this.sequenceLength()) {
    const e = new Uint8Array(this.view.buffer, this.view.byteOffset + this.offset, t);
    return this.offset += t, e;
  }
  int16Array(t = this.sequenceLength()) {
    return this.typedArray(Int16Array, "getInt16", t);
  }
  uint16Array(t = this.sequenceLength()) {
    return this.typedArray(Uint16Array, "getUint16", t);
  }
  int32Array(t = this.sequenceLength()) {
    return this.typedArray(Int32Array, "getInt32", t);
  }
  uint32Array(t = this.sequenceLength()) {
    return this.typedArray(Uint32Array, "getUint32", t);
  }
  int64Array(t = this.sequenceLength()) {
    return this.typedArray(BigInt64Array, "getBigInt64", t, this.eightByteAlignment);
  }
  uint64Array(t = this.sequenceLength()) {
    return this.typedArray(BigUint64Array, "getBigUint64", t, this.eightByteAlignment);
  }
  float32Array(t = this.sequenceLength()) {
    return this.typedArray(Float32Array, "getFloat32", t);
  }
  float64Array(t = this.sequenceLength()) {
    return this.typedArray(Float64Array, "getFloat64", t, this.eightByteAlignment);
  }
  stringArray(t = this.sequenceLength()) {
    const e = [];
    for (let r = 0; r < t; r++)
      e.push(this.string());
    return e;
  }
  /**
   * Seek the current read pointer a number of bytes relative to the current position. Note that
   * seeking before the four-byte header is invalid
   * @param relativeOffset A positive or negative number of bytes to seek
   */
  seek(t) {
    const e = this.offset + t;
    if (e < 4 || e >= this.view.byteLength)
      throw new Error(`seek(${t}) failed, ${e} is outside the data range`);
    this.offset = e;
  }
  /**
   * Seek to an absolute byte position in the data. Note that seeking before the four-byte header is
   * invalid
   * @param offset An absolute byte offset in the range of [4-byteLength)
   */
  seekTo(t) {
    if (t < 4 || t >= this.view.byteLength)
      throw new Error(`seekTo(${t}) failed, value is outside the data range`);
    this.offset = t;
  }
  align(t) {
    const e = (this.offset - this.origin) % t;
    e > 0 && (this.offset += t - e);
  }
  // Reads a given count of numeric values into a typed array.
  typedArray(t, e, r, n = t.BYTES_PER_ELEMENT) {
    if (r === 0)
      return new t();
    this.align(n);
    const s = this.view.byteOffset + this.offset;
    if (this.littleEndian !== this.hostLittleEndian)
      return this.typedArraySlow(t, e, r);
    if (s % t.BYTES_PER_ELEMENT === 0) {
      const a = new t(this.view.buffer, s, r);
      return this.offset += t.BYTES_PER_ELEMENT * r, a;
    } else
      return this.typedArrayUnaligned(t, e, r);
  }
  typedArrayUnaligned(t, e, r) {
    if (r < 10)
      return this.typedArraySlow(t, e, r);
    const n = t.BYTES_PER_ELEMENT * r, s = new Uint8Array(n);
    return s.set(new Uint8Array(this.view.buffer, this.view.byteOffset + this.offset, n)), this.offset += n, new t(s.buffer, s.byteOffset, r);
  }
  typedArraySlow(t, e, r) {
    const n = new t(r);
    let s = this.offset;
    for (let a = 0; a < r; a++)
      n[a] = this.view[e](s, this.littleEndian), s += t.BYTES_PER_ELEMENT;
    return this.offset = s, n;
  }
}
Gt.CdrReader = yr;
var qt = {};
Object.defineProperty(qt, "__esModule", { value: !0 });
qt.CdrSizeCalculator = void 0;
class gr {
  constructor() {
    this.offset = 4;
  }
  get size() {
    return this.offset;
  }
  int8() {
    return this.incrementAndReturn(1);
  }
  uint8() {
    return this.incrementAndReturn(1);
  }
  int16() {
    return this.incrementAndReturn(2);
  }
  uint16() {
    return this.incrementAndReturn(2);
  }
  int32() {
    return this.incrementAndReturn(4);
  }
  uint32() {
    return this.incrementAndReturn(4);
  }
  int64() {
    return this.incrementAndReturn(8);
  }
  uint64() {
    return this.incrementAndReturn(8);
  }
  float32() {
    return this.incrementAndReturn(4);
  }
  float64() {
    return this.incrementAndReturn(8);
  }
  string(t) {
    return this.uint32(), this.offset += t + 1, this.offset;
  }
  sequenceLength() {
    return this.uint32();
  }
  // Increments the offset by `byteCount` and any required padding bytes and
  // returns the new offset
  incrementAndReturn(t) {
    const e = (this.offset - 4) % t;
    return e > 0 && (this.offset += t - e), this.offset += t, this.offset;
  }
}
qt.CdrSizeCalculator = gr;
var Yt = {};
Object.defineProperty(Yt, "__esModule", { value: !0 });
Yt.CdrWriter = void 0;
const mr = jt, br = Mt, wr = Dt, se = dt, ae = pt, Ar = new TextEncoder();
class it {
  constructor(t = {}) {
    t.buffer != null ? this.buffer = t.buffer : t.size != null ? this.buffer = new ArrayBuffer(t.size) : this.buffer = new ArrayBuffer(it.DEFAULT_CAPACITY);
    const e = t.kind ?? mr.EncapsulationKind.CDR_LE, { isCDR2: r, littleEndian: n } = (0, br.getEncapsulationKindInfo)(e);
    this.isCDR2 = r, this.littleEndian = n, this.hostLittleEndian = !(0, wr.isBigEndian)(), this.eightByteAlignment = r ? 4 : 8, this.array = new Uint8Array(this.buffer), this.view = new DataView(this.buffer), this.resizeIfNeeded(4), this.view.setUint8(0, 0), this.view.setUint8(1, e), this.view.setUint16(2, 0, !1), this.offset = 4, this.origin = 4;
  }
  get data() {
    return new Uint8Array(this.buffer, 0, this.offset);
  }
  get size() {
    return this.offset;
  }
  get kind() {
    return this.view.getUint8(1);
  }
  int8(t) {
    return this.resizeIfNeeded(1), this.view.setInt8(this.offset, t), this.offset += 1, this;
  }
  uint8(t) {
    return this.resizeIfNeeded(1), this.view.setUint8(this.offset, t), this.offset += 1, this;
  }
  int16(t) {
    return this.align(2), this.view.setInt16(this.offset, t, this.littleEndian), this.offset += 2, this;
  }
  uint16(t) {
    return this.align(2), this.view.setUint16(this.offset, t, this.littleEndian), this.offset += 2, this;
  }
  int32(t) {
    return this.align(4), this.view.setInt32(this.offset, t, this.littleEndian), this.offset += 4, this;
  }
  uint32(t) {
    return this.align(4), this.view.setUint32(this.offset, t, this.littleEndian), this.offset += 4, this;
  }
  int64(t) {
    return this.align(this.eightByteAlignment, 8), this.view.setBigInt64(this.offset, t, this.littleEndian), this.offset += 8, this;
  }
  uint64(t) {
    return this.align(this.eightByteAlignment, 8), this.view.setBigUint64(this.offset, t, this.littleEndian), this.offset += 8, this;
  }
  uint16BE(t) {
    return this.align(2), this.view.setUint16(this.offset, t, !1), this.offset += 2, this;
  }
  uint32BE(t) {
    return this.align(4), this.view.setUint32(this.offset, t, !1), this.offset += 4, this;
  }
  uint64BE(t) {
    return this.align(this.eightByteAlignment, 8), this.view.setBigUint64(this.offset, t, !1), this.offset += 8, this;
  }
  float32(t) {
    return this.align(4), this.view.setFloat32(this.offset, t, this.littleEndian), this.offset += 4, this;
  }
  float64(t) {
    return this.align(this.eightByteAlignment, 8), this.view.setFloat64(this.offset, t, this.littleEndian), this.offset += 8, this;
  }
  // writeLength optional because it could already be included in a header
  string(t, e = !0) {
    const r = t.length;
    return e && this.uint32(r + 1), this.resizeIfNeeded(r + 1), Ar.encodeInto(t, new Uint8Array(this.buffer, this.offset, r)), this.view.setUint8(this.offset + r, 0), this.offset += r + 1, this;
  }
  /** Writes the delimiter header using object size
   * NOTE: changing endian-ness with a single CDR message is not supported
   */
  dHeader(t) {
    const e = t;
    return this.uint32(e), this;
  }
  /**
   * Writes the member header (EMHEADER)
   * Accomodates for PL_CDR and PL_CDR2 based on the CdrWriter constructor options
   *
   * @param mustUnderstand - Whether the member is required to be understood by the receiver
   * @param id - The member ID
   * @param objectSize - The size of the member in bytes
   * @param lengthCode - Optional length code for CDR2 emHeaders.
   * lengthCode values [5-7] allow the emHeader object size to take the place of the normally encoded member length.
   *
   * NOTE: Dynamically determines default value if not provided that does not affect serialization ie will use lengthCode values [0-4].
   *
   * From Extensible and Dynamic Topic Types in DDS-XTypes v1.3 @ `7.4.3.4.2`:
   * "EMHEADER1 with LC values 5 to 7 also affect the serialization/deserialization virtual machine in that they cause NEXTINT to be
   * reused also as part of the serialized member. This is useful because the serialization of certain members also starts with an
   * integer length, which would take exactly the same value as NEXTINT. Therefore the use of length codes 5 to 7 saves 4 bytes in
   * the serialization."
   * @returns - CdrWriter instance
   */
  emHeader(t, e, r, n) {
    return this.isCDR2 ? this.memberHeaderV2(t, e, r, n) : this.memberHeaderV1(t, e, r);
  }
  memberHeaderV1(t, e, r) {
    this.align(4);
    const n = t ? 16384 : 0;
    if (e > 16128 || r > 65535) {
      const a = n | ae.EXTENDED_PID;
      this.uint16(a), this.uint16(8), this.uint32(e), this.uint32(r);
    } else {
      const a = n | e;
      this.uint16(a);
      const c = r & 65535;
      this.uint16(c);
    }
    return this.resetOrigin(), this;
  }
  /** Sets the origin to the offset (DDS-XTypes Spec: `PUSH(ORIGIN = 0)`)*/
  resetOrigin() {
    this.origin = this.offset;
  }
  /** Writes the PID_SENTINEL value if encapsulation supports it*/
  sentinelHeader() {
    return this.isCDR2 || (this.align(4), this.uint16(ae.SENTINEL_PID), this.uint16(0)), this;
  }
  memberHeaderV2(t, e, r, n) {
    if (e > 268435455)
      throw Error(`Member ID ${e} is too large. Max value is 268435455`);
    const s = t ? 1 << 31 : 0, a = n ?? (0, se.getLengthCodeForObjectSize)(r), c = s | a << 28 | e;
    switch (this.uint32(c), a) {
      case 0:
      case 1:
      case 2:
      case 3: {
        const f = se.lengthCodeToObjectSizes[a];
        if (r !== f)
          throw new Error(`Cannot write a length code ${a} header with an object size not equal to ${f}`);
        break;
      }
      case 4:
      case 5:
        this.uint32(r);
        break;
      case 6:
        if (r % 4 !== 0)
          throw new Error("Cannot write a length code 6 header with an object size that is not a multiple of 4");
        this.uint32(r >> 2);
        break;
      case 7:
        if (r % 8 !== 0)
          throw new Error("Cannot write a length code 7 header with an object size that is not a multiple of 8");
        this.uint32(r >> 3);
        break;
      default:
        throw new Error(`Unexpected length code ${a}`);
    }
    return this;
  }
  sequenceLength(t) {
    return this.uint32(t);
  }
  int8Array(t, e) {
    return e === !0 && this.sequenceLength(t.length), this.resizeIfNeeded(t.length), this.array.set(t, this.offset), this.offset += t.length, this;
  }
  uint8Array(t, e) {
    return e === !0 && this.sequenceLength(t.length), this.resizeIfNeeded(t.length), this.array.set(t, this.offset), this.offset += t.length, this;
  }
  int16Array(t, e) {
    if (e === !0 && this.sequenceLength(t.length), t instanceof Int16Array && this.littleEndian === this.hostLittleEndian && t.length >= it.BUFFER_COPY_THRESHOLD)
      this.align(t.BYTES_PER_ELEMENT, t.byteLength), this.array.set(new Uint8Array(t.buffer, t.byteOffset, t.byteLength), this.offset), this.offset += t.byteLength;
    else
      for (const r of t)
        this.int16(r);
    return this;
  }
  uint16Array(t, e) {
    if (e === !0 && this.sequenceLength(t.length), t instanceof Uint16Array && this.littleEndian === this.hostLittleEndian && t.length >= it.BUFFER_COPY_THRESHOLD)
      this.align(t.BYTES_PER_ELEMENT, t.byteLength), this.array.set(new Uint8Array(t.buffer, t.byteOffset, t.byteLength), this.offset), this.offset += t.byteLength;
    else
      for (const r of t)
        this.uint16(r);
    return this;
  }
  int32Array(t, e) {
    if (e === !0 && this.sequenceLength(t.length), t instanceof Int32Array && this.littleEndian === this.hostLittleEndian && t.length >= it.BUFFER_COPY_THRESHOLD)
      this.align(t.BYTES_PER_ELEMENT, t.byteLength), this.array.set(new Uint8Array(t.buffer, t.byteOffset, t.byteLength), this.offset), this.offset += t.byteLength;
    else
      for (const r of t)
        this.int32(r);
    return this;
  }
  uint32Array(t, e) {
    if (e === !0 && this.sequenceLength(t.length), t instanceof Uint32Array && this.littleEndian === this.hostLittleEndian && t.length >= it.BUFFER_COPY_THRESHOLD)
      this.align(t.BYTES_PER_ELEMENT, t.byteLength), this.array.set(new Uint8Array(t.buffer, t.byteOffset, t.byteLength), this.offset), this.offset += t.byteLength;
    else
      for (const r of t)
        this.uint32(r);
    return this;
  }
  int64Array(t, e) {
    if (e === !0 && this.sequenceLength(t.length), t instanceof BigInt64Array && this.littleEndian === this.hostLittleEndian && t.length >= it.BUFFER_COPY_THRESHOLD)
      this.align(t.BYTES_PER_ELEMENT, t.byteLength), this.array.set(new Uint8Array(t.buffer, t.byteOffset, t.byteLength), this.offset), this.offset += t.byteLength;
    else
      for (const r of t)
        this.int64(BigInt(r));
    return this;
  }
  uint64Array(t, e) {
    if (e === !0 && this.sequenceLength(t.length), t instanceof BigUint64Array && this.littleEndian === this.hostLittleEndian && t.length >= it.BUFFER_COPY_THRESHOLD)
      this.align(t.BYTES_PER_ELEMENT, t.byteLength), this.array.set(new Uint8Array(t.buffer, t.byteOffset, t.byteLength), this.offset), this.offset += t.byteLength;
    else
      for (const r of t)
        this.uint64(BigInt(r));
    return this;
  }
  float32Array(t, e) {
    if (e === !0 && this.sequenceLength(t.length), t instanceof Float32Array && this.littleEndian === this.hostLittleEndian && t.length >= it.BUFFER_COPY_THRESHOLD)
      this.align(t.BYTES_PER_ELEMENT, t.byteLength), this.array.set(new Uint8Array(t.buffer, t.byteOffset, t.byteLength), this.offset), this.offset += t.byteLength;
    else
      for (const r of t)
        this.float32(r);
    return this;
  }
  float64Array(t, e) {
    if (e === !0 && this.sequenceLength(t.length), t instanceof Float64Array && this.littleEndian === this.hostLittleEndian && t.length >= it.BUFFER_COPY_THRESHOLD)
      this.align(t.BYTES_PER_ELEMENT, t.byteLength), this.array.set(new Uint8Array(t.buffer, t.byteOffset, t.byteLength), this.offset), this.offset += t.byteLength;
    else
      for (const r of t)
        this.float64(r);
    return this;
  }
  /**
   * Calculate the capacity needed to hold the given number of aligned bytes,
   * resize if needed, and write padding bytes for alignment
   * @param size Byte width to align to. If the current offset is 1 and `size`
   *   is 4, 3 bytes of padding will be written
   * @param bytesToWrite Optional, total amount of bytes that are intended to be
   *   written directly following the alignment. This can be used to avoid
   *   additional buffer resizes in the case of writing large blocks of aligned
   *   data such as arrays
   */
  align(t, e = t) {
    const r = (this.offset - this.origin) % t, n = r > 0 ? t - r : 0;
    this.resizeIfNeeded(n + e), this.array.fill(0, this.offset, this.offset + n), this.offset += n;
  }
  resizeIfNeeded(t) {
    const e = this.offset + t;
    if (this.buffer.byteLength < e) {
      const r = this.buffer.byteLength * 2, n = r > e ? r : e;
      this.resize(n);
    }
  }
  resize(t) {
    if (this.buffer.byteLength >= t)
      return;
    const e = new ArrayBuffer(t), r = new Uint8Array(e);
    r.set(this.array), this.buffer = e, this.array = r, this.view = new DataView(e);
  }
}
Yt.CdrWriter = it;
it.DEFAULT_CAPACITY = 16;
it.BUFFER_COPY_THRESHOLD = 10;
(function(i) {
  var t = Q && Q.__createBinding || (Object.create ? function(r, n, s, a) {
    a === void 0 && (a = s), Object.defineProperty(r, a, { enumerable: !0, get: function() {
      return n[s];
    } });
  } : function(r, n, s, a) {
    a === void 0 && (a = s), r[a] = n[s];
  }), e = Q && Q.__exportStar || function(r, n) {
    for (var s in r) s !== "default" && !Object.prototype.hasOwnProperty.call(n, s) && t(n, r, s);
  };
  Object.defineProperty(i, "__esModule", { value: !0 }), e(Gt, i), e(qt, i), e(Yt, i), e(jt, i);
})(te);
var Xt = {};
Object.defineProperty(Xt, "__esModule", { value: !0 });
Xt.messageDefinitionHasDataFields = Er;
function Er(i) {
  return i.some((t) => t.isConstant !== !0);
}
var Zt = Q && Q.__classPrivateFieldSet || function(i, t, e, r, n) {
  if (r === "m") throw new TypeError("Private method is not writable");
  if (r === "a" && !n) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? i !== t || !n : !t.has(i)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return r === "a" ? n.call(i, e) : n ? n.value = e : t.set(i, e), e;
}, ct = Q && Q.__classPrivateFieldGet || function(i, t, e, r) {
  if (e === "a" && !r) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? i !== t || !r : !t.has(i)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? r : e === "a" ? r.call(i) : r ? r.value : t.get(i);
}, Tt, Ot, Ut, Ct, Se;
Object.defineProperty(Vt, "__esModule", { value: !0 });
Vt.MessageReader = void 0;
const vr = te, xr = Xt;
let _r = class {
  constructor(t, e = {}) {
    Tt.add(this), Ot.set(this, void 0), Ut.set(this, void 0), Ct.set(this, void 0);
    const { timeType: r = "sec,nanosec" } = e, n = t.find((s) => !Sr(s));
    if (n == null)
      throw new Error("MessageReader initialized with no root MessageDefinition");
    Zt(this, Ot, n.definitions, "f"), Zt(this, Ut, new Map(t.map((s) => [s.name ?? "", s.definitions])), "f"), Zt(this, Ct, r === "sec,nsec", "f");
  }
  // We template on R here for call site type information if the class type information T is not
  // known or available
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  readMessage(t) {
    const e = new vr.CdrReader(t);
    return ct(this, Tt, "m", Se).call(this, ct(this, Ot, "f"), e);
  }
};
Vt.MessageReader = _r;
Ot = /* @__PURE__ */ new WeakMap(), Ut = /* @__PURE__ */ new WeakMap(), Ct = /* @__PURE__ */ new WeakMap(), Tt = /* @__PURE__ */ new WeakSet(), Se = function i(t, e) {
  const r = {};
  if (!(0, xr.messageDefinitionHasDataFields)(t))
    return e.uint8(), r;
  for (const n of t)
    if (n.isConstant !== !0)
      if (n.isComplex === !0) {
        const s = ct(this, Ut, "f").get(n.type);
        if (s == null)
          throw new Error(`Unrecognized complex type ${n.type}`);
        if (n.isArray === !0) {
          const a = n.arrayLength ?? e.sequenceLength(), c = [];
          for (let f = 0; f < a; f++)
            c.push(ct(this, Tt, "m", i).call(this, s, e));
          r[n.name] = c;
        } else
          r[n.name] = ct(this, Tt, "m", i).call(this, s, e);
      } else if (n.isArray === !0) {
        const s = (ct(this, Ct, "f") ? Tr : Te).get(n.type);
        if (s == null)
          throw new Error(`Unrecognized primitive array type ${n.type}[]`);
        const a = n.arrayLength ?? e.sequenceLength();
        r[n.name] = s(e, a);
      } else {
        const s = (ct(this, Ct, "f") ? Ir : Ie).get(n.type);
        if (s == null)
          throw new Error(`Unrecognized primitive type ${n.type}`);
        r[n.name] = s(e);
      }
  return r;
};
function Sr(i) {
  return i.definitions.length > 0 && i.definitions.every((t) => t.isConstant);
}
const Ie = /* @__PURE__ */ new Map([
  ["bool", (i) => !!i.int8()],
  ["int8", (i) => i.int8()],
  ["uint8", (i) => i.uint8()],
  ["int16", (i) => i.int16()],
  ["uint16", (i) => i.uint16()],
  ["int32", (i) => i.int32()],
  ["uint32", (i) => i.uint32()],
  ["int64", (i) => i.int64()],
  ["uint64", (i) => i.uint64()],
  ["float32", (i) => i.float32()],
  ["float64", (i) => i.float64()],
  ["string", (i) => i.string()],
  ["wstring", Ce],
  ["time", (i) => ({ sec: i.int32(), nanosec: i.uint32() })],
  ["duration", (i) => ({ sec: i.int32(), nanosec: i.uint32() })]
]), Ir = new Map([
  ...Ie,
  ["time", (i) => ({ sec: i.int32(), nsec: i.uint32() })],
  ["duration", (i) => ({ sec: i.int32(), nsec: i.uint32() })]
]), Te = /* @__PURE__ */ new Map([
  ["bool", Cr],
  ["int8", (i, t) => i.int8Array(t)],
  ["uint8", (i, t) => i.uint8Array(t)],
  ["int16", (i, t) => i.int16Array(t)],
  ["uint16", (i, t) => i.uint16Array(t)],
  ["int32", (i, t) => i.int32Array(t)],
  ["uint32", (i, t) => i.uint32Array(t)],
  ["int64", (i, t) => i.int64Array(t)],
  ["uint64", (i, t) => i.uint64Array(t)],
  ["float32", (i, t) => i.float32Array(t)],
  ["float64", (i, t) => i.float64Array(t)],
  ["string", Br],
  ["wstring", Ce],
  ["time", he],
  ["duration", he]
]), Tr = new Map([
  ...Te,
  ["time", oe],
  ["duration", oe]
]);
function Cr(i, t) {
  const e = new Array(t);
  for (let r = 0; r < t; r++)
    e[r] = !!i.int8();
  return e;
}
function Br(i, t) {
  const e = new Array(t);
  for (let r = 0; r < t; r++)
    e[r] = i.string();
  return e;
}
function oe(i, t) {
  const e = new Array(t);
  for (let r = 0; r < t; r++) {
    const n = i.int32(), s = i.uint32();
    e[r] = { sec: n, nsec: s };
  }
  return e;
}
function he(i, t) {
  const e = new Array(t);
  for (let r = 0; r < t; r++) {
    const n = i.int32(), s = i.uint32();
    e[r] = { sec: n, nanosec: s };
  }
  return e;
}
function Ce() {
  throw new Error("wstring is implementation-defined and therefore not supported");
}
var Kt = {}, fe = Q && Q.__classPrivateFieldSet || function(i, t, e, r, n) {
  if (r === "m") throw new TypeError("Private method is not writable");
  if (r === "a" && !n) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? i !== t || !n : !t.has(i)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return r === "a" ? n.call(i, e) : n ? n.value = e : t.set(i, e), e;
}, X = Q && Q.__classPrivateFieldGet || function(i, t, e, r) {
  if (e === "a" && !r) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? i !== t || !r : !t.has(i)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e === "m" ? r : e === "a" ? r.call(i) : r ? r.value : t.get(i);
}, J, It, Ht, Be, Le, Et, kt, ue, ce;
Object.defineProperty(Kt, "__esModule", { value: !0 });
Kt.MessageWriter = void 0;
const Lr = te, le = Xt, Mr = /* @__PURE__ */ new Map([
  ["bool", 1],
  ["int8", 1],
  ["uint8", 1],
  ["int16", 2],
  ["uint16", 2],
  ["int32", 4],
  ["uint32", 4],
  ["int64", 8],
  ["uint64", 8],
  ["float32", 4],
  ["float64", 8],
  // ["string", ...], // handled separately
  ["time", 8],
  ["duration", 8]
]), Dr = /* @__PURE__ */ new Map([
  ["bool", Or],
  ["int8", Pr],
  ["uint8", Me],
  ["int16", Nr],
  ["uint16", Fr],
  ["int32", Ur],
  ["uint32", Hr],
  ["int64", Wr],
  ["uint64", zr],
  ["float32", Vr],
  ["float64", Gr],
  ["string", jr],
  ["time", Wt],
  ["duration", Wt],
  ["wstring", ee]
]), $r = /* @__PURE__ */ new Map([
  ["bool", qr],
  ["int8", Yr],
  ["uint8", Xr],
  ["int16", Kr],
  ["uint16", Zr],
  ["int32", Jr],
  ["uint32", Qr],
  ["int64", ti],
  ["uint64", ei],
  ["float32", ri],
  ["float64", ii],
  ["string", ni],
  ["time", de],
  ["duration", de],
  ["wstring", ee]
]);
function ee() {
  throw new Error("wstring is implementation-defined and therefore not supported");
}
class kr {
  constructor(t) {
    J.add(this), It.set(this, void 0), Ht.set(this, void 0);
    const e = t.find((r) => !Rr(r));
    if (e == null)
      throw new Error("MessageReader initialized with no root MessageDefinition");
    fe(this, It, e.definitions, "f"), fe(this, Ht, new Map(t.map((r) => [r.name ?? "", r.definitions])), "f");
  }
  /** Calculates the byte size needed to write this message in bytes. */
  calculateByteSize(t) {
    return X(this, J, "m", Be).call(this, X(this, It, "f"), t, 4);
  }
  /**
   * Serializes a JavaScript object to CDR-encoded binary according to this
   * writer's message definition. If output is provided, it's byte length must
   * be equal or greater to the result of `calculateByteSize(message)`. If not
   * provided, a new Uint8Array will be allocated.
   */
  writeMessage(t, e) {
    const r = new Lr.CdrWriter({
      buffer: e,
      size: e ? void 0 : this.calculateByteSize(t)
    });
    return X(this, J, "m", Le).call(this, X(this, It, "f"), t, r), r.data;
  }
}
Kt.MessageWriter = kr;
It = /* @__PURE__ */ new WeakMap(), Ht = /* @__PURE__ */ new WeakMap(), J = /* @__PURE__ */ new WeakSet(), Be = function i(t, e, r) {
  const n = e;
  let s = r;
  if (!(0, le.messageDefinitionHasDataFields)(t))
    return r + X(this, J, "m", kt).call(this, "uint8");
  for (const a of t) {
    if (a.isConstant === !0)
      continue;
    const c = n == null ? void 0 : n[a.name];
    if (a.isArray === !0) {
      const f = a.arrayLength ?? Jt(c), o = Array.isArray(c) || ArrayBuffer.isView(c) ? c : [];
      if (a.arrayLength == null && (s += vt(s, 4), s += 4), a.isComplex === !0) {
        const u = X(this, J, "m", Et).call(this, a.type);
        for (let y = 0; y < f; y++) {
          const l = o[y] ?? {};
          s = X(this, J, "m", i).call(this, u, l, s);
        }
      } else if (a.type === "string")
        for (let u = 0; u < f; u++) {
          const y = o[u] ?? "";
          s += vt(s, 4), s += 4 + y.length + 1;
        }
      else {
        const u = X(this, J, "m", kt).call(this, a.type), y = a.type === "time" || a.type === "duration" ? 4 : u;
        s += vt(s, y), s += u * f;
      }
    } else if (a.isComplex === !0) {
      const f = X(this, J, "m", Et).call(this, a.type), h = c ?? {};
      s = X(this, J, "m", i).call(this, f, h, s);
    } else if (a.type === "string") {
      const f = typeof c == "string" ? c : "";
      s += vt(s, 4), s += 4 + f.length + 1;
    } else {
      const f = X(this, J, "m", kt).call(this, a.type), h = a.type === "time" || a.type === "duration" ? 4 : f;
      s += vt(s, h), s += f;
    }
  }
  return s;
}, Le = function i(t, e, r) {
  const n = e;
  if (!(0, le.messageDefinitionHasDataFields)(t)) {
    Me(0, 0, r);
    return;
  }
  for (const s of t) {
    if (s.isConstant === !0)
      continue;
    const a = n == null ? void 0 : n[s.name];
    if (s.isArray === !0) {
      const c = s.arrayLength ?? Jt(a), h = Array.isArray(a) || ArrayBuffer.isView(a) ? a : [];
      if (s.arrayLength == null && r.sequenceLength(c), s.arrayLength != null && a != null) {
        const o = Jt(a);
        if (o !== s.arrayLength)
          throw new Error(`Expected ${s.arrayLength} items for fixed-length array field ${s.name} but received ${o}`);
      }
      if (s.isComplex === !0) {
        const o = X(this, J, "m", Et).call(this, s.type);
        for (let u = 0; u < c; u++) {
          const y = h[u] ?? {};
          X(this, J, "m", i).call(this, o, y, r);
        }
      } else
        X(this, J, "m", ce).call(this, s.type)(a, s.defaultValue, r, s.arrayLength);
    } else if (s.isComplex === !0) {
      const c = X(this, J, "m", Et).call(this, s.type), f = a ?? {};
      X(this, J, "m", i).call(this, c, f, r);
    } else
      X(this, J, "m", ue).call(this, s.type)(a, s.defaultValue, r);
  }
}, Et = function(t) {
  const e = X(this, Ht, "f").get(t);
  if (e == null)
    throw new Error(`Unrecognized complex type ${t}`);
  return e;
}, kt = function(t) {
  const e = Mr.get(t);
  if (e == null)
    throw t === "wstring" && ee(), new Error(`Unrecognized primitive type ${t}`);
  return e;
}, ue = function(t) {
  const e = Dr.get(t);
  if (e == null)
    throw new Error(`Unrecognized primitive type ${t}`);
  return e;
}, ce = function(t) {
  const e = $r.get(t);
  if (e == null)
    throw new Error(`Unrecognized primitive type ${t}[]`);
  return e;
};
function Rr(i) {
  return i.definitions.length > 0 && i.definitions.every((t) => t.isConstant);
}
function Jt(i) {
  const t = i == null ? void 0 : i.length;
  return typeof t == "number" ? t : 0;
}
function Or(i, t, e) {
  const r = typeof i == "boolean" ? i : t ?? !1;
  e.int8(r ? 1 : 0);
}
function Pr(i, t, e) {
  e.int8(typeof i == "number" ? i : t ?? 0);
}
function Me(i, t, e) {
  e.uint8(typeof i == "number" ? i : t ?? 0);
}
function Nr(i, t, e) {
  e.int16(typeof i == "number" ? i : t ?? 0);
}
function Fr(i, t, e) {
  e.uint16(typeof i == "number" ? i : t ?? 0);
}
function Ur(i, t, e) {
  e.int32(typeof i == "number" ? i : t ?? 0);
}
function Hr(i, t, e) {
  e.uint32(typeof i == "number" ? i : t ?? 0);
}
function Wr(i, t, e) {
  typeof i == "bigint" ? e.int64(i) : typeof i == "number" ? e.int64(BigInt(i)) : e.int64(t ?? 0n);
}
function zr(i, t, e) {
  typeof i == "bigint" ? e.uint64(i) : typeof i == "number" ? e.uint64(BigInt(i)) : e.uint64(t ?? 0n);
}
function Vr(i, t, e) {
  e.float32(typeof i == "number" ? i : t ?? 0);
}
function Gr(i, t, e) {
  e.float64(typeof i == "number" ? i : t ?? 0);
}
function jr(i, t, e) {
  e.string(typeof i == "string" ? i : t ?? "");
}
function Wt(i, t, e) {
  if (i == null) {
    e.int32(0), e.uint32(0);
    return;
  }
  const r = i;
  e.int32(r.sec ?? 0), e.uint32(r.nsec ?? r.nanosec ?? 0);
}
function qr(i, t, e, r) {
  if (Array.isArray(i)) {
    const n = new Int8Array(i);
    e.int8Array(n);
  } else
    e.int8Array(t ?? new Int8Array(r ?? 0).fill(0));
}
function Yr(i, t, e, r) {
  if (i instanceof Int8Array)
    e.int8Array(i);
  else if (Array.isArray(i)) {
    const n = new Int8Array(i);
    e.int8Array(n);
  } else
    e.int8Array(t ?? new Int8Array(r ?? 0).fill(0));
}
function Xr(i, t, e, r) {
  if (i instanceof Uint8Array)
    e.uint8Array(i);
  else if (i instanceof Uint8ClampedArray)
    e.uint8Array(new Uint8Array(i));
  else if (Array.isArray(i)) {
    const n = new Uint8Array(i);
    e.uint8Array(n);
  } else
    e.uint8Array(t ?? new Uint8Array(r ?? 0).fill(0));
}
function Kr(i, t, e, r) {
  if (i instanceof Int16Array)
    e.int16Array(i);
  else if (Array.isArray(i)) {
    const n = new Int16Array(i);
    e.int16Array(n);
  } else
    e.int16Array(t ?? new Int16Array(r ?? 0).fill(0));
}
function Zr(i, t, e, r) {
  if (i instanceof Uint16Array)
    e.uint16Array(i);
  else if (Array.isArray(i)) {
    const n = new Uint16Array(i);
    e.uint16Array(n);
  } else
    e.uint16Array(t ?? new Uint16Array(r ?? 0).fill(0));
}
function Jr(i, t, e, r) {
  if (i instanceof Int32Array)
    e.int32Array(i);
  else if (Array.isArray(i)) {
    const n = new Int32Array(i);
    e.int32Array(n);
  } else
    e.int32Array(t ?? new Int32Array(r ?? 0).fill(0));
}
function Qr(i, t, e, r) {
  if (i instanceof Uint32Array)
    e.uint32Array(i);
  else if (Array.isArray(i)) {
    const n = new Uint32Array(i);
    e.uint32Array(n);
  } else
    e.uint32Array(t ?? new Uint32Array(r ?? 0).fill(0));
}
function ti(i, t, e, r) {
  if (i instanceof BigInt64Array)
    e.int64Array(i);
  else if (Array.isArray(i)) {
    const n = new BigInt64Array(i);
    e.int64Array(n);
  } else
    e.int64Array(t ?? new BigInt64Array(r ?? 0).fill(0n));
}
function ei(i, t, e, r) {
  if (i instanceof BigUint64Array)
    e.uint64Array(i);
  else if (Array.isArray(i)) {
    const n = new BigUint64Array(i);
    e.uint64Array(n);
  } else
    e.uint64Array(t ?? new BigUint64Array(r ?? 0).fill(0n));
}
function ri(i, t, e, r) {
  if (i instanceof Float32Array)
    e.float32Array(i);
  else if (Array.isArray(i)) {
    const n = new Float32Array(i);
    e.float32Array(n);
  } else
    e.float32Array(t ?? new Float32Array(r ?? 0).fill(0));
}
function ii(i, t, e, r) {
  if (i instanceof Float64Array)
    e.float64Array(i);
  else if (Array.isArray(i)) {
    const n = new Float64Array(i);
    e.float64Array(n);
  } else
    e.float64Array(t ?? new Float64Array(r ?? 0).fill(0));
}
function ni(i, t, e, r) {
  if (Array.isArray(i))
    for (const n of i)
      e.string(typeof n == "string" ? n : "");
  else {
    const n = t ?? new Array(r ?? 0).fill("");
    for (const s of n)
      e.string(s);
  }
}
function de(i, t, e, r) {
  if (Array.isArray(i))
    for (const n of i)
      Wt(n, void 0, e);
  else {
    const n = new Array(r).fill(void 0);
    for (const s of n)
      Wt(s, void 0, e);
  }
}
function vt(i, t) {
  const e = (i - 4) % t;
  return e > 0 ? t - e : 0;
}
(function(i) {
  var t = Q && Q.__createBinding || (Object.create ? function(r, n, s, a) {
    a === void 0 && (a = s);
    var c = Object.getOwnPropertyDescriptor(n, s);
    (!c || ("get" in c ? !n.__esModule : c.writable || c.configurable)) && (c = { enumerable: !0, get: function() {
      return n[s];
    } }), Object.defineProperty(r, a, c);
  } : function(r, n, s, a) {
    a === void 0 && (a = s), r[a] = n[s];
  }), e = Q && Q.__exportStar || function(r, n) {
    for (var s in r) s !== "default" && !Object.prototype.hasOwnProperty.call(n, s) && t(n, r, s);
  };
  Object.defineProperty(i, "__esModule", { value: !0 }), e(Vt, i), e(Kt, i);
})(xe);
const { app: zt, BrowserWindow: De, ipcMain: $e, shell: si, Menu: ai } = ye, oi = Oe, pe = Ue, { FileHandleReadable: hi } = Ve, { McapIndexedReader: fi, ReadableFile: Ei, McapStreamReader: vi, TypedMcapRecords: xi } = sr, { parse: ui, stringify: _i } = ar, { MessageReader: ci } = xe, { open: li } = Pe;
function ke() {
  const i = new De({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: !0,
      contextIsolation: !1
    }
  });
  i.loadURL(
    pe ? "http://localhost:5173" : `file://${oi.join(__dirname, "../index.html")}`
  ), pe && i.webContents.openDevTools(), ai.setApplicationMenu(null);
}
zt.whenReady().then(ke);
zt.on("window-all-closed", () => {
  process.platform !== "darwin" && zt.quit();
});
zt.on("activate", () => {
  De.getAllWindows().length === 0 && ke();
});
$e.handle("open-external", async (i, t) => {
  await si.openExternal(t);
});
$e.handle("parse-mcap", async (i, t, e) => {
  try {
    const r = await li(t, "r"), n = await fi.Initialize({
      readable: new hi(r)
      // decompressHandlers,
    }), s = n.channelsById, a = /* @__PURE__ */ new Map();
    for (const l of s.values())
      a.set(l.id.toString(), l);
    const c = /* @__PURE__ */ new Map();
    if (e)
      for (const [l, d] of n.schemasById.entries()) {
        const b = new TextDecoder().decode(d.data).replace(new RegExp("(?<!=)\\s\\d\\s*$", "gm"), "").replace(new RegExp("(?<!=)\\s(true|false)\\s*$", "gm"), ""), A = ui(b);
        c.set(l, A);
      }
    const f = /* @__PURE__ */ new Map();
    if (e)
      for (const [l, d] of c.entries())
        f.set(l, new ci(d, { timeType: "sec,nanosec" }));
    const h = /* @__PURE__ */ new Map();
    let o = 1 / 0, u = -1 / 0;
    for await (const l of n.readMessages()) {
      const d = a.get(l.channelId.toString());
      if (!d) continue;
      const p = d.topic;
      h.has(p) || h.set(p, []);
      const g = Number(l.logTime) / 1e9;
      let b;
      if (e)
        try {
          const E = f.get(l.channelId).readMessage(l.data);
          E.header && E.header.stamp && (b = E.header.stamp.sec + E.header.stamp.nanosec / 1e9);
        } catch {
        }
      const A = {
        timestamp: g,
        topic: p,
        headerStamp: b,
        data: l.data
      };
      h.get(p).push(A), o = Math.min(o, g), u = Math.max(u, g), b && (o = Math.min(o, b), u = Math.max(u, b));
    }
    const y = Array.from(h.entries()).map(
      ([l, d]) => ({
        name: l,
        messages: d.sort((p, g) => p.timestamp - g.timestamp),
        minTime: Math.min(...d.map((p) => p.timestamp)),
        maxTime: Math.max(...d.map(
          (p) => Math.max(p.timestamp, p.headerStamp || p.timestamp)
        ))
      })
    );
    return await r.close(), {
      topics: y,
      timeRange: { start: o, end: u }
    };
  } catch (r) {
    throw console.error("Error parsing MCAP file:", r), r;
  }
});
export {
  mi as default
};
