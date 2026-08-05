/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, ae = W.ShadowRoot && (W.ShadyCSS === void 0 || W.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ue = Symbol(), ge = /* @__PURE__ */ new WeakMap();
let Le = class {
  constructor(e, r, i) {
    if (this._$cssResult$ = !0, i !== ue) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = r;
  }
  get styleSheet() {
    let e = this.o;
    const r = this.t;
    if (ae && e === void 0) {
      const i = r !== void 0 && r.length === 1;
      i && (e = ge.get(r)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ge.set(r, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const nt = (t) => new Le(typeof t == "string" ? t : t + "", void 0, ue), ke = (t, ...e) => {
  const r = t.length === 1 ? t[0] : e.reduce((i, n, s) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[s + 1], t[0]);
  return new Le(r, t, ue);
}, st = (t, e) => {
  if (ae) t.adoptedStyleSheets = e.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of e) {
    const i = document.createElement("style"), n = W.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = r.cssText, t.appendChild(i);
  }
}, fe = ae ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let r = "";
  for (const i of e.cssRules) r += i.cssText;
  return nt(r);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ot, defineProperty: at, getOwnPropertyDescriptor: ut, getOwnPropertyNames: dt, getOwnPropertySymbols: lt, getPrototypeOf: ct } = Object, y = globalThis, _e = y.trustedTypes, ht = _e ? _e.emptyScript : "", Q = y.reactiveElementPolyfillSupport, z = (t, e) => t, K = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? ht : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let r = t;
  switch (e) {
    case Boolean:
      r = t !== null;
      break;
    case Number:
      r = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        r = JSON.parse(t);
      } catch {
        r = null;
      }
  }
  return r;
} }, de = (t, e) => !ot(t, e), ye = { attribute: !0, type: String, converter: K, reflect: !1, useDefault: !1, hasChanged: de };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), y.litPropertyMetadata ?? (y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let x = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, r = ye) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(e, r), !r.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(e, i, r);
      n !== void 0 && at(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, r, i) {
    const { get: n, set: s } = ut(this.prototype, e) ?? { get() {
      return this[r];
    }, set(o) {
      this[r] = o;
    } };
    return { get: n, set(o) {
      const u = n == null ? void 0 : n.call(this);
      s == null || s.call(this, o), this.requestUpdate(e, u, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ye;
  }
  static _$Ei() {
    if (this.hasOwnProperty(z("elementProperties"))) return;
    const e = ct(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(z("properties"))) {
      const r = this.properties, i = [...dt(r), ...lt(r)];
      for (const n of i) this.createProperty(n, r[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const r = litPropertyMetadata.get(e);
      if (r !== void 0) for (const [i, n] of r) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [r, i] of this.elementProperties) {
      const n = this._$Eu(r, i);
      n !== void 0 && this._$Eh.set(n, r);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const r = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const n of i) r.unshift(fe(n));
    } else e !== void 0 && r.push(fe(e));
    return r;
  }
  static _$Eu(e, r) {
    const i = r.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((r) => this.enableUpdating = r), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((r) => r(this));
  }
  addController(e) {
    var r;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((r = e.hostConnected) == null || r.call(e));
  }
  removeController(e) {
    var r;
    (r = this._$EO) == null || r.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), r = this.constructor.elementProperties;
    for (const i of r.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return st(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((r) => {
      var i;
      return (i = r.hostConnected) == null ? void 0 : i.call(r);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((r) => {
      var i;
      return (i = r.hostDisconnected) == null ? void 0 : i.call(r);
    });
  }
  attributeChangedCallback(e, r, i) {
    this._$AK(e, i);
  }
  _$ET(e, r) {
    var s;
    const i = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, i);
    if (n !== void 0 && i.reflect === !0) {
      const o = (((s = i.converter) == null ? void 0 : s.toAttribute) !== void 0 ? i.converter : K).toAttribute(r, i.type);
      this._$Em = e, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(e, r) {
    var s, o;
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const u = i.getPropertyOptions(n), a = typeof u.converter == "function" ? { fromAttribute: u.converter } : ((s = u.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? u.converter : K;
      this._$Em = n;
      const l = a.fromAttribute(r, u.type);
      this[n] = l ?? ((o = this._$Ej) == null ? void 0 : o.get(n)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, r, i, n = !1, s) {
    var o;
    if (e !== void 0) {
      const u = this.constructor;
      if (n === !1 && (s = this[e]), i ?? (i = u.getPropertyOptions(e)), !((i.hasChanged ?? de)(s, r) || i.useDefault && i.reflect && s === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(u._$Eu(e, i)))) return;
      this.C(e, r, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, r, { useDefault: i, reflect: n, wrapped: s }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? r ?? this[e]), s !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (r = void 0), this._$AL.set(e, r)), n === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (r) {
      Promise.reject(r);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [s, o] of this._$Ep) this[s] = o;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [s, o] of n) {
        const { wrapped: u } = o, a = this[s];
        u !== !0 || this._$AL.has(s) || a === void 0 || this.C(s, void 0, o, a);
      }
    }
    let e = !1;
    const r = this._$AL;
    try {
      e = this.shouldUpdate(r), e ? (this.willUpdate(r), (i = this._$EO) == null || i.forEach((n) => {
        var s;
        return (s = n.hostUpdate) == null ? void 0 : s.call(n);
      }), this.update(r)) : this._$EM();
    } catch (n) {
      throw e = !1, this._$EM(), n;
    }
    e && this._$AE(r);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var r;
    (r = this._$EO) == null || r.forEach((i) => {
      var n;
      return (n = i.hostUpdated) == null ? void 0 : n.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((r) => this._$ET(r, this[r]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[z("elementProperties")] = /* @__PURE__ */ new Map(), x[z("finalized")] = /* @__PURE__ */ new Map(), Q == null || Q({ ReactiveElement: x }), (y.reactiveElementVersions ?? (y.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const F = globalThis, be = (t) => t, q = F.trustedTypes, ve = q ? q.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Be = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, Ve = "?" + _, pt = `<${Ve}>`, E = document, L = () => E.createComment(""), k = (t) => t === null || typeof t != "object" && typeof t != "function", le = Array.isArray, mt = (t) => le(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", X = `[ 	
\f\r]`, R = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $e = /-->/g, we = />/g, v = RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Te = /'/g, Ee = /"/g, je = /^(?:script|style|textarea|title)$/i, Ze = (t) => (e, ...r) => ({ _$litType$: t, strings: e, values: r }), p = Ze(1), Se = Ze(2), M = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), Ae = /* @__PURE__ */ new WeakMap(), $ = E.createTreeWalker(E, 129);
function Ie(t, e) {
  if (!le(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ve !== void 0 ? ve.createHTML(e) : e;
}
const gt = (t, e) => {
  const r = t.length - 1, i = [];
  let n, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = R;
  for (let u = 0; u < r; u++) {
    const a = t[u];
    let l, c, d = -1, g = 0;
    for (; g < a.length && (o.lastIndex = g, c = o.exec(a), c !== null); ) g = o.lastIndex, o === R ? c[1] === "!--" ? o = $e : c[1] !== void 0 ? o = we : c[2] !== void 0 ? (je.test(c[2]) && (n = RegExp("</" + c[2], "g")), o = v) : c[3] !== void 0 && (o = v) : o === v ? c[0] === ">" ? (o = n ?? R, d = -1) : c[1] === void 0 ? d = -2 : (d = o.lastIndex - c[2].length, l = c[1], o = c[3] === void 0 ? v : c[3] === '"' ? Ee : Te) : o === Ee || o === Te ? o = v : o === $e || o === we ? o = R : (o = v, n = void 0);
    const f = o === v && t[u + 1].startsWith("/>") ? " " : "";
    s += o === R ? a + pt : d >= 0 ? (i.push(l), a.slice(0, d) + Be + a.slice(d) + _ + f) : a + _ + (d === -2 ? u : f);
  }
  return [Ie(t, s + (t[r] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class B {
  constructor({ strings: e, _$litType$: r }, i) {
    let n;
    this.parts = [];
    let s = 0, o = 0;
    const u = e.length - 1, a = this.parts, [l, c] = gt(e, r);
    if (this.el = B.createElement(l, i), $.currentNode = this.el.content, r === 2 || r === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = $.nextNode()) !== null && a.length < u; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(Be)) {
          const g = c[o++], f = n.getAttribute(d).split(_), I = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: s, name: I[2], strings: f, ctor: I[1] === "." ? _t : I[1] === "?" ? yt : I[1] === "@" ? bt : J }), n.removeAttribute(d);
        } else d.startsWith(_) && (a.push({ type: 6, index: s }), n.removeAttribute(d));
        if (je.test(n.tagName)) {
          const d = n.textContent.split(_), g = d.length - 1;
          if (g > 0) {
            n.textContent = q ? q.emptyScript : "";
            for (let f = 0; f < g; f++) n.append(d[f], L()), $.nextNode(), a.push({ type: 2, index: ++s });
            n.append(d[g], L());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Ve) a.push({ type: 2, index: s });
      else {
        let d = -1;
        for (; (d = n.data.indexOf(_, d + 1)) !== -1; ) a.push({ type: 7, index: s }), d += _.length - 1;
      }
      s++;
    }
  }
  static createElement(e, r) {
    const i = E.createElement("template");
    return i.innerHTML = e, i;
  }
}
function C(t, e, r = t, i) {
  var o, u;
  if (e === M) return e;
  let n = i !== void 0 ? (o = r._$Co) == null ? void 0 : o[i] : r._$Cl;
  const s = k(e) ? void 0 : e._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== s && ((u = n == null ? void 0 : n._$AO) == null || u.call(n, !1), s === void 0 ? n = void 0 : (n = new s(t), n._$AT(t, r, i)), i !== void 0 ? (r._$Co ?? (r._$Co = []))[i] = n : r._$Cl = n), n !== void 0 && (e = C(t, n._$AS(t, e.values), n, i)), e;
}
class ft {
  constructor(e, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: r }, parts: i } = this._$AD, n = ((e == null ? void 0 : e.creationScope) ?? E).importNode(r, !0);
    $.currentNode = n;
    let s = $.nextNode(), o = 0, u = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let l;
        a.type === 2 ? l = new Z(s, s.nextSibling, this, e) : a.type === 1 ? l = new a.ctor(s, a.name, a.strings, this, e) : a.type === 6 && (l = new vt(s, this, e)), this._$AV.push(l), a = i[++u];
      }
      o !== (a == null ? void 0 : a.index) && (s = $.nextNode(), o++);
    }
    return $.currentNode = E, n;
  }
  p(e) {
    let r = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, r), r += i.strings.length - 2) : i._$AI(e[r])), r++;
  }
}
class Z {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, r, i, n) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = r, this._$AM = i, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = r.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, r = this) {
    e = C(this, e, r), k(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== M && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : mt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && k(this._$AH) ? this._$AA.nextSibling.data = e : this.T(E.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: r, _$litType$: i } = e, n = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = B.createElement(Ie(i.h, i.h[0]), this.options)), i);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === n) this._$AH.p(r);
    else {
      const o = new ft(n, this), u = o.u(this.options);
      o.p(r), this.T(u), this._$AH = o;
    }
  }
  _$AC(e) {
    let r = Ae.get(e.strings);
    return r === void 0 && Ae.set(e.strings, r = new B(e)), r;
  }
  k(e) {
    le(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let i, n = 0;
    for (const s of e) n === r.length ? r.push(i = new Z(this.O(L()), this.O(L()), this, this.options)) : i = r[n], i._$AI(s), n++;
    n < r.length && (this._$AR(i && i._$AB.nextSibling, n), r.length = n);
  }
  _$AR(e = this._$AA.nextSibling, r) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, r); e !== this._$AB; ) {
      const n = be(e).nextSibling;
      be(e).remove(), e = n;
    }
  }
  setConnected(e) {
    var r;
    this._$AM === void 0 && (this._$Cv = e, (r = this._$AP) == null || r.call(this, e));
  }
}
class J {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, r, i, n, s) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = r, this._$AM = n, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(e, r = this, i, n) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) e = C(this, e, r, 0), o = !k(e) || e !== this._$AH && e !== M, o && (this._$AH = e);
    else {
      const u = e;
      let a, l;
      for (e = s[0], a = 0; a < s.length - 1; a++) l = C(this, u[i + a], r, a), l === M && (l = this._$AH[a]), o || (o = !k(l) || l !== this._$AH[a]), l === h ? e = h : e !== h && (e += (l ?? "") + s[a + 1]), this._$AH[a] = l;
    }
    o && !n && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class _t extends J {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class yt extends J {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class bt extends J {
  constructor(e, r, i, n, s) {
    super(e, r, i, n, s), this.type = 5;
  }
  _$AI(e, r = this) {
    if ((e = C(this, e, r, 0) ?? h) === M) return;
    const i = this._$AH, n = e === h && i !== h || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== h && (i === h || n);
    n && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class vt {
  constructor(e, r, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    C(this, e);
  }
}
const ee = F.litHtmlPolyfillSupport;
ee == null || ee(B, Z), (F.litHtmlVersions ?? (F.litHtmlVersions = [])).push("3.3.3");
const $t = (t, e, r) => {
  const i = (r == null ? void 0 : r.renderBefore) ?? e;
  let n = i._$litPart$;
  if (n === void 0) {
    const s = (r == null ? void 0 : r.renderBefore) ?? null;
    i._$litPart$ = n = new Z(e.insertBefore(L(), s), s, void 0, r ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = globalThis;
class T extends x {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var r;
    const e = super.createRenderRoot();
    return (r = this.renderOptions).renderBefore ?? (r.renderBefore = e.firstChild), e;
  }
  update(e) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = $t(r, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var e;
    super.connectedCallback(), (e = this._$Do) == null || e.setConnected(!0);
  }
  disconnectedCallback() {
    var e;
    super.disconnectedCallback(), (e = this._$Do) == null || e.setConnected(!1);
  }
  render() {
    return M;
  }
}
var Fe;
T._$litElement$ = !0, T.finalized = !0, (Fe = w.litElementHydrateSupport) == null || Fe.call(w, { LitElement: T });
const te = w.litElementPolyfillSupport;
te == null || te({ LitElement: T });
(w.litElementVersions ?? (w.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ce = (t) => (e, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const wt = { attribute: !0, type: String, converter: K, reflect: !1, hasChanged: de }, Tt = (t = wt, e, r) => {
  const { kind: i, metadata: n } = r;
  let s = globalThis.litPropertyMetadata.get(n);
  if (s === void 0 && globalThis.litPropertyMetadata.set(n, s = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(r.name, t), i === "accessor") {
    const { name: o } = r;
    return { set(u) {
      const a = e.get.call(this);
      e.set.call(this, u), this.requestUpdate(o, a, t, !0, u);
    }, init(u) {
      return u !== void 0 && this.C(o, void 0, t, u), u;
    } };
  }
  if (i === "setter") {
    const { name: o } = r;
    return function(u) {
      const a = this[o];
      e.call(this, u), this.requestUpdate(o, a, t, !0, u);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function O(t) {
  return (e, r) => typeof r == "object" ? Tt(t, e, r) : ((i, n, s) => {
    const o = n.hasOwnProperty(s);
    return n.constructor.createProperty(s, i), o ? Object.getOwnPropertyDescriptor(n, s) : void 0;
  })(t, e, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function S(t) {
  return O({ ...t, state: !0, attribute: !1 });
}
const xe = {
  nearTargetThreshold: 5,
  targetReachedTolerance: 2
}, Et = {
  unavailable: {
    line: "var(--disabled-text-color)",
    fill: "rgba(128, 128, 128, 0.12)"
  },
  far_below: {
    line: "#3f8cff",
    fill: "rgba(63, 140, 255, 0.16)"
  },
  heating: {
    line: "#22c7d8",
    fill: "rgba(34, 199, 216, 0.16)"
  },
  near_target: {
    line: "#2fb86f",
    fill: "rgba(47, 184, 111, 0.16)"
  },
  target_reached: {
    line: "#d7b339",
    fill: "rgba(215, 179, 57, 0.18)"
  },
  above_target: {
    line: "#e45d3f",
    fill: "rgba(228, 93, 63, 0.18)"
  }
};
function Ge(t, e) {
  if (!(t === void 0 || e === void 0))
    return t - e;
}
function St(t) {
  return {
    nearTargetThreshold: De(
      t.nearTargetThreshold,
      xe.nearTargetThreshold
    ),
    targetReachedTolerance: De(
      t.targetReachedTolerance,
      xe.targetReachedTolerance
    )
  };
}
function At(t, e, r) {
  const i = Ge(t, e);
  if (i === void 0)
    return "unavailable";
  const n = St(r);
  return i < -20 ? "far_below" : i <= -n.nearTargetThreshold ? "heating" : i < -n.targetReachedTolerance ? "near_target" : i <= n.targetReachedTolerance ? "target_reached" : "above_target";
}
function xt(t, e) {
  return t === void 0 || e === void 0 || e <= 0 ? 0 : Math.min(Math.max(t / e, 0), 1);
}
function Dt(t, e, r) {
  return {
    difference: Ge(t, e),
    progress: xt(t, e),
    status: At(t, e, r)
  };
}
function We(t) {
  return Et[t];
}
function De(t, e) {
  return t === void 0 || !Number.isFinite(t) ? e : Math.max(0, t);
}
var Mt = Object.defineProperty, Ct = Object.getOwnPropertyDescriptor, Y = (t, e, r, i) => {
  for (var n = i > 1 ? void 0 : i ? Ct(e, r) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, r, n) : o(n)) || n);
  return i && n && Mt(e, r, n), n;
};
const Pt = "sauna-suite-temperature-trend";
let V = class extends T {
  constructor() {
    super(...arguments), this.samples = [], this.status = "unavailable", this.emptyLabel = "No trend data available";
  }
  createRenderRoot() {
    return this;
  }
  render() {
    if (this.samples.length < 2)
      return p`<div class="trend-empty">${this.emptyLabel}</div>`;
    const t = We(this.status), e = this.createLinePath(), r = this.createAreaPath(e);
    return p`
      <svg class="trend" viewBox="0 0 240 80" role="img" aria-label=${this.emptyLabel}>
        <defs>
          <linearGradient id="sauna-suite-trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color=${t.line} stop-opacity="0.28"></stop>
            <stop offset="100%" stop-color=${t.line} stop-opacity="0.02"></stop>
          </linearGradient>
        </defs>
        ${Se`<path d=${r} fill="url(#sauna-suite-trend-fill)"></path>`}
        ${Se`<path d=${e} fill="none" stroke=${t.line} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`}
      </svg>
    `;
  }
  createLinePath() {
    const i = this.samples.map((a) => a.value), n = Math.min(...i), o = Math.max(...i) - n || 1, u = 224 / (this.samples.length - 1);
    return this.samples.map((a, l) => {
      const c = 8 + l * u, d = 72 - (a.value - n) / o * 64;
      return `${l === 0 ? "M" : "L"} ${c.toFixed(1)} ${d.toFixed(1)}`;
    }).join(" ");
  }
  createAreaPath(t) {
    return `${t} L 232 76 L 8 76 Z`;
  }
};
Y([
  O({ attribute: !1 })
], V.prototype, "samples", 2);
Y([
  O()
], V.prototype, "status", 2);
Y([
  O({ attribute: "empty-label" })
], V.prototype, "emptyLabel", 2);
V = Y([
  ce(Pt)
], V);
const he = "custom:sauna-suite-card", Ot = "sauna-suite-card", Ke = "sauna-suite-editor", qe = [
  "top",
  "middle",
  "bottom",
  "average",
  "weighted_average",
  "minimum",
  "maximum"
];
function oe(t, e, r) {
  if (re(t, "value"), re(e, "minimum"), re(r, "maximum"), e > r)
    throw new RangeError("minimum must be less than or equal to maximum");
  return Math.min(Math.max(t, e), r);
}
function re(t, e) {
  if (!Number.isFinite(t))
    throw new RangeError(`${e} must be a finite number`);
}
const Je = "Sauna Suite", ie = 1, Rt = 5, Nt = 2, Ut = 120, Ht = 5;
function Ye() {
  return {
    type: he,
    name: Je,
    control_temperature_mode: "average",
    weight_top: ie,
    weight_middle: ie,
    weight_bottom: ie,
    show_outside_temperature: !1,
    show_temperature_zones: !0,
    near_target_threshold: Rt,
    target_reached_tolerance: Nt,
    show_temperature_trend: !0,
    trend_history_minutes: Ut,
    trend_refresh_minutes: Ht,
    confirm_switch_on: !0
  };
}
function D(t) {
  const e = Ye(), r = {
    type: he,
    name: Qe(t.name, Je),
    control_temperature_mode: zt(t.control_temperature_mode),
    weight_top: ne(t.weight_top, e.weight_top),
    weight_middle: ne(t.weight_middle, e.weight_middle),
    weight_bottom: ne(t.weight_bottom, e.weight_bottom),
    show_outside_temperature: G(
      t.show_outside_temperature,
      e.show_outside_temperature
    ),
    show_temperature_zones: G(
      t.show_temperature_zones,
      e.show_temperature_zones
    ),
    near_target_threshold: Me(
      t.near_target_threshold,
      e.near_target_threshold
    ),
    target_reached_tolerance: Me(
      t.target_reached_tolerance,
      e.target_reached_tolerance
    ),
    show_temperature_trend: G(
      t.show_temperature_trend,
      e.show_temperature_trend
    ),
    trend_history_minutes: Ce(
      t.trend_history_minutes,
      e.trend_history_minutes,
      15,
      1440
    ),
    trend_refresh_minutes: Ce(
      t.trend_refresh_minutes,
      e.trend_refresh_minutes,
      1,
      60
    ),
    confirm_switch_on: G(t.confirm_switch_on, e.confirm_switch_on)
  };
  return A(r, "main_switch_entity", t.main_switch_entity), A(r, "temperature_top_entity", t.temperature_top_entity), A(r, "temperature_middle_entity", t.temperature_middle_entity), A(r, "temperature_bottom_entity", t.temperature_bottom_entity), A(r, "outside_temperature_entity", t.outside_temperature_entity), A(r, "target_temperature_entity", t.target_temperature_entity), r;
}
function zt(t) {
  return typeof t == "string" && qe.includes(t) ? t : Ye().control_temperature_mode;
}
function ne(t, e) {
  return typeof t != "number" || !Number.isFinite(t) ? e : Math.max(0, t);
}
function G(t, e) {
  return typeof t == "boolean" ? t : e;
}
function Me(t, e) {
  return typeof t != "number" || !Number.isFinite(t) ? e : Math.max(0, t);
}
function Qe(t, e) {
  return typeof t == "string" ? t : e;
}
function A(t, e, r) {
  const i = Qe(r);
  i !== void 0 && (t[e] = i);
}
function Ce(t, e, r, i) {
  return typeof t != "number" || !Number.isFinite(t) ? e : oe(t, r, i);
}
function Xe(t) {
  return P(t) === "switch" || P(t) === "input_boolean";
}
function et(t) {
  return P(t) === "number" || P(t) === "input_number";
}
function N(t) {
  return !t || t.state === "unavailable" || t.state === "unknown";
}
async function Ft(t, e, r) {
  if (!(t != null && t.callService))
    return { ok: !1, error: "Home Assistant service API is unavailable." };
  if (!Xe(e))
    return { ok: !1, error: "Unsupported switch entity domain." };
  const i = P(e), n = r ? "turn_on" : "turn_off";
  try {
    return await t.callService(i, n, { entity_id: e }), { ok: !0 };
  } catch (s) {
    return {
      ok: !1,
      error: s instanceof Error ? s.message : "Failed to update switch entity."
    };
  }
}
async function Lt(t, e, r, i) {
  if (!(t != null && t.callService))
    return { ok: !1, error: "Home Assistant service API is unavailable." };
  if (!et(e))
    return { ok: !1, error: "Unsupported target temperature entity domain." };
  const n = P(e), s = kt(r, i);
  try {
    return await t.callService(n, "set_value", {
      entity_id: e,
      value: s
    }), { ok: !0 };
  } catch (o) {
    return {
      ok: !1,
      error: o instanceof Error ? o.message : "Failed to update target temperature."
    };
  }
}
function Pe(t) {
  if (!t)
    return;
  const e = se(t, "min"), r = se(t, "max"), i = se(t, "step");
  if (!(e === void 0 || r === void 0 || i === void 0 || i <= 0))
    return {
      minimum: e,
      maximum: r,
      step: i
    };
}
function kt(t, e) {
  const r = oe(t, e.minimum, e.maximum), i = Math.round((r - e.minimum) / e.step), n = e.minimum + i * e.step, s = Bt(e.step);
  return Number(oe(n, e.minimum, e.maximum).toFixed(s));
}
function P(t) {
  return (t == null ? void 0 : t.split(".")[0]) ?? "";
}
function se(t, e) {
  const r = t.attributes[e], i = typeof r == "number" ? r : Number(r);
  return Number.isFinite(i) ? i : void 0;
}
function Bt(t) {
  const [, e = ""] = t.toString().split(".");
  return e.length;
}
const Vt = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function tt(t) {
  if (t === void 0)
    return;
  if (typeof t == "number")
    return Number.isFinite(t) ? t : void 0;
  const e = t.trim().toLowerCase();
  if (Vt.has(e))
    return;
  const r = Number(t);
  return Number.isFinite(r) ? r : void 0;
}
function jt(t) {
  const e = t.filter(Number.isFinite);
  return e.length === 0 ? void 0 : e.reduce((i, n) => i + n, 0) / e.length;
}
function Zt(t, e) {
  const r = rt(t).map((s) => ({
    value: t[s],
    weight: Jt(e[s])
  })).filter((s) => s.value !== void 0), i = r.reduce((s, o) => s + o.weight, 0);
  return r.length === 0 || i <= 0 ? void 0 : r.reduce((s, o) => s + o.value * o.weight, 0) / i;
}
function It(t) {
  const e = pe(t);
  return e.length > 0 ? Math.min(...e) : void 0;
}
function Gt(t) {
  const e = pe(t);
  return e.length > 0 ? Math.max(...e) : void 0;
}
function Wt(t, e, r) {
  switch (e) {
    case "top":
      return t.top;
    case "middle":
      return t.middle;
    case "bottom":
      return t.bottom;
    case "average":
      return jt(pe(t));
    case "weighted_average":
      return Zt(t, r);
    case "minimum":
      return It(t);
    case "maximum":
      return Gt(t);
  }
}
function Kt(t) {
  if (!(t.top === void 0 || t.bottom === void 0))
    return t.top - t.bottom;
}
function qt(t, e, r) {
  return {
    controlTemperature: Wt(t, e, r),
    stratification: Kt(t)
  };
}
function pe(t) {
  return rt(t).map((e) => t[e]).filter((e) => e !== void 0);
}
function rt(t) {
  return ["top", "middle", "bottom"].filter((r) => t[r] !== void 0);
}
function Jt(t) {
  return Number.isFinite(t) ? Math.max(0, t) : 0;
}
async function Yt(t, e, r, i = 120) {
  if (!(t != null && t.callApi) || !e)
    return [];
  const n = /* @__PURE__ */ new Date(), s = new Date(n.getTime() - r * 6e4), o = new URLSearchParams({
    filter_entity_id: e,
    end_time: n.toISOString(),
    minimal_response: "1",
    no_attributes: "1"
  });
  try {
    const u = await t.callApi(
      "GET",
      `history/period/${s.toISOString()}?${o.toString()}`
    );
    return Xt(Qt(u), i);
  } catch {
    return [];
  }
}
function Qt(t) {
  return t.flat().map((e) => {
    const r = tt(e.state), i = e.last_changed ?? e.last_updated, n = i ? Date.parse(i) : Number.NaN;
    if (!(r === void 0 || !Number.isFinite(n)))
      return {
        timestamp: n,
        value: r
      };
  }).filter((e) => e !== void 0);
}
function Xt(t, e) {
  if (t.length <= e)
    return [...t];
  const r = Math.ceil(t.length / e);
  return t.filter((i, n) => n % r === 0).slice(0, e);
}
function er(t, e) {
  const r = {
    top: U(t, e.temperature_top_entity),
    middle: U(t, e.temperature_middle_entity),
    bottom: U(t, e.temperature_bottom_entity)
  }, i = {
    top: e.weight_top,
    middle: e.weight_middle,
    bottom: e.weight_bottom
  };
  return {
    zones: r,
    outsideTemperature: U(t, e.outside_temperature_entity),
    targetTemperature: U(t, e.target_temperature_entity),
    summary: qt(r, e.control_temperature_mode, i)
  };
}
function U(t, e) {
  var r;
  if (!(!t || !e))
    return tt((r = t.states[e]) == null ? void 0 : r.state);
}
function H(t, e) {
  if (!(!t || !e))
    return t.states[e];
}
const tr = /* @__PURE__ */ new Set(["top", "middle", "bottom"]);
function Oe(t) {
  return tr.has(t);
}
function Re(t) {
  switch (t.control_temperature_mode) {
    case "top":
      return t.temperature_top_entity;
    case "middle":
      return t.temperature_middle_entity;
    case "bottom":
      return t.temperature_bottom_entity;
    default:
      return;
  }
}
const rr = ke`
  :host {
    display: block;
  }

  .content {
    display: grid;
    gap: 16px;
    padding: 16px;
  }

  .header {
    align-items: center;
    display: grid;
    gap: 12px;
    grid-template-columns: 1fr auto;
  }

  .title {
    color: var(--primary-text-color);
    font-size: 22px;
    font-weight: 700;
    line-height: 1.25;
  }

  .state {
    color: var(--secondary-text-color);
    font-size: 13px;
    margin-top: 4px;
  }

  .power-button,
  .step-button {
    align-items: center;
    background: var(--primary-color);
    border: 0;
    border-radius: 999px;
    color: var(--text-primary-color, #fff);
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    font-weight: 700;
    justify-content: center;
  }

  .power-button {
    height: 54px;
    min-width: 120px;
    padding: 0 18px;
  }

  .power-button.off {
    background: var(--disabled-color);
  }

  .power-button:disabled,
  .step-button:disabled,
  input:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  .main {
    align-items: stretch;
    display: grid;
    gap: 16px;
    grid-template-columns: minmax(0, 1.3fr) minmax(220px, 0.7fr);
  }

  .hero-temperature {
    background: color-mix(in srgb, var(--primary-color) 10%, var(--card-background-color));
    border: 1px solid var(--divider-color);
    border-radius: 10px;
    display: grid;
    gap: 12px;
    padding: 18px;
  }

  .label {
    color: var(--secondary-text-color);
    font-size: 13px;
    line-height: 1.3;
  }

  .value {
    color: var(--primary-text-color);
    font-size: 40px;
    font-weight: 750;
    line-height: 1;
  }

  .value.unavailable {
    color: var(--secondary-text-color);
    font-size: 20px;
    font-weight: 550;
  }

  .progress-track {
    background: color-mix(in srgb, var(--primary-text-color) 12%, transparent);
    border-radius: 999px;
    height: 12px;
    overflow: hidden;
  }

  .progress-bar {
    border-radius: inherit;
    height: 100%;
    transition: width 160ms ease;
  }

  .status-line,
  .error {
    color: var(--secondary-text-color);
    font-size: 13px;
    line-height: 1.4;
  }

  .error {
    color: var(--error-color);
  }

  .grid {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
  }

  .metric,
  .target-control,
  .trend-panel {
    background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    display: grid;
    gap: 8px;
    padding: 12px;
  }

  .metric-value {
    color: var(--primary-text-color);
    font-size: 20px;
    font-weight: 650;
    line-height: 1.2;
  }

  .metric-value.unavailable {
    color: var(--secondary-text-color);
    font-size: 14px;
    font-weight: 500;
  }

  .target-actions {
    align-items: center;
    display: flex;
    gap: 10px;
  }

  .step-button {
    height: 40px;
    width: 40px;
  }

  input[type='range'] {
    accent-color: var(--primary-color);
    width: 100%;
  }

  .trend {
    display: block;
    height: 80px;
    width: 100%;
  }

  .trend-empty {
    color: var(--secondary-text-color);
    font-size: 13px;
    min-height: 48px;
  }

  @media (max-width: 640px) {
    .header,
    .main {
      grid-template-columns: 1fr;
    }

    .power-button {
      width: 100%;
    }
  }
`, ir = { bottomTemperature: "Unten", confirmSwitchOn: "Sauna-Entitaet manuell einschalten?", controlTemperature: "Regeltemperatur", decreaseTarget: "Zieltemperatur verringern", earlyDevelopment: "Fruehe Entwicklung", increaseTarget: "Zieltemperatur erhoehen", middleTemperature: "Mitte", name: "Sauna Suite", notAvailable: "Nicht verfuegbar", outsideTemperature: "Aussen", pending: "Aktualisiere...", placeholder: "Nur manuelle Bedienung und Monitoring. Es ist keine automatische Heizungsregelung implementiert.", powerOff: "Aus", powerOn: "Ein", powerUnavailable: "Nicht verfuegbar", sliderUnavailable: "Slider nicht verfuegbar, weil min, max oder step fehlen.", stratification: "Temperaturschichtung", targetDifference: "Differenz zum Ziel", targetTemperature: "Ziel", temperatureTrend: "Temperaturverlauf", temperatureZones: "Temperaturzonen", togglePower: "Sauna-Power-Entitaet umschalten", topTemperature: "Oben", trendDirectModesOnly: "Der Trend ist derzeit nur für direkte Sensormodi verfügbar.", trendLoading: "Verlaufsdaten werden geladen", trendUnavailable: "Keine Verlaufsdaten verfuegbar" }, nr = { cardName: "Kartenname", cardNameDescription: "Titel im Kartenkopf.", confirmSwitchOn: "Einschalten bestaetigen", confirmSwitchOnDescription: "Vor dem manuellen Einschalten der konfigurierten Entitaet einen Dialog anzeigen.", controlTemperatureMode: "Modus fuer Regeltemperatur", controlTemperatureModeDescription: "Legt fest, welche Temperatur als zentrale Regeltemperatur angezeigt wird.", mainSwitchEntity: "Hauptschalter-Entitaet", mainSwitchEntityDescription: "Entitaet fuer den manuellen Power-Button. Unterstuetzt: switch und input_boolean.", nearTargetThreshold: "Nahe-Ziel-Schwelle", nearTargetThresholdDescription: "Grad unter Zieltemperatur, die als nahe am Ziel gelten.", outsideTemperatureEntity: "Aussentemperatur-Entitaet", outsideTemperatureEntityDescription: "Optionaler Aussentemperatur-Sensor.", sections: { display: "Anzeige", entities: "Entitaeten", general: "Allgemein", safety: "Sicherheit und Bestaetigung", temperatureCalculation: "Temperaturberechnung", trend: "Verlauf" }, showOutsideTemperature: "Aussentemperatur anzeigen", showOutsideTemperatureDescription: "Aussentemperatur anzeigen, wenn eine Entitaet konfiguriert ist.", showTemperatureTrend: "Temperaturverlauf anzeigen", showTemperatureTrendDescription: "Aktuelle Recorder-Historie fuer direkte Sensormodi oben, Mitte oder unten laden.", showTemperatureZones: "Temperaturzonen anzeigen", showTemperatureZonesDescription: "Werte der Sensoren oben, Mitte und unten anzeigen.", targetReachedTolerance: "Ziel-erreicht-Toleranz", targetReachedToleranceDescription: "Grad um die Zieltemperatur, die als Ziel erreicht gelten.", targetTemperatureEntity: "Zieltemperatur-Entitaet", targetTemperatureEntityDescription: "Entitaet fuer manuelle Zielwerte. Unterstuetzt: number und input_number.", temperatureBottomEntity: "Temperatur unten", temperatureBottomEntityDescription: "Temperatursensor unten in der Sauna.", temperatureMiddleEntity: "Temperatur Mitte", temperatureMiddleEntityDescription: "Temperatursensor in der Mitte der Sauna.", temperatureTopEntity: "Temperatur oben", temperatureTopEntityDescription: "Temperatursensor oben in der Sauna.", trendHistoryMinutes: "Verlauf in Minuten", trendHistoryMinutesDescription: "Zeitfenster aus dem Recorder. Erlaubt: 15 bis 1440 Minuten.", trendRefreshMinutes: "Aktualisierung in Minuten", trendRefreshMinutesDescription: "Intervall fuer die Verlaufsaktualisierung. Erlaubt: 1 bis 60 Minuten.", weightBottom: "Gewichtung unten", weightBottomDescription: "Gewichtung fuer den unteren Sensor beim gewichteten Durchschnitt.", weightMiddle: "Gewichtung Mitte", weightMiddleDescription: "Gewichtung fuer den mittleren Sensor beim gewichteten Durchschnitt.", weightTop: "Gewichtung oben", weightTopDescription: "Gewichtung fuer den oberen Sensor beim gewichteten Durchschnitt." }, sr = { average: "Durchschnitt", bottom: "Unten", maximum: "Maximum", middle: "Mitte", minimum: "Minimum", top: "Oben", weighted_average: "Gewichteter Durchschnitt" }, or = { above_target: "Ueber Ziel", far_below: "Weit unter Ziel", heating: "Heizt", near_target: "Nahe am Ziel", target_reached: "Ziel erreicht", unavailable: "Temperatur nicht verfuegbar" }, ar = {
  card: ir,
  editor: nr,
  modes: sr,
  status: or
}, ur = { bottomTemperature: "Bottom", confirmSwitchOn: "Switch the sauna entity on manually?", controlTemperature: "Control temperature", decreaseTarget: "Decrease target temperature", earlyDevelopment: "Early Development", increaseTarget: "Increase target temperature", middleTemperature: "Middle", name: "Sauna Suite", notAvailable: "Not available", outsideTemperature: "Outside", pending: "Updating...", placeholder: "Manual controls and monitoring only. No automatic heater regulation is implemented.", powerOff: "Off", powerOn: "On", powerUnavailable: "Unavailable", sliderUnavailable: "Slider unavailable because min, max or step is missing.", stratification: "Stratification", targetDifference: "Difference to target", targetTemperature: "Target", temperatureTrend: "Temperature trend", temperatureZones: "Temperature zones", togglePower: "Toggle sauna power entity", topTemperature: "Top", trendDirectModesOnly: "Trend is currently available only for direct sensor modes.", trendLoading: "Loading trend data", trendUnavailable: "No trend data available" }, dr = { cardName: "Card name", cardNameDescription: "Title shown in the card header.", confirmSwitchOn: "Confirm before switching on", confirmSwitchOnDescription: "Require a confirmation dialog before the manual power button turns on the configured entity.", controlTemperatureMode: "Control temperature mode", controlTemperatureModeDescription: "Select which temperature is displayed as the main control temperature.", mainSwitchEntity: "Main switch entity", mainSwitchEntityDescription: "Manual power button entity. Supported domains: switch and input_boolean.", nearTargetThreshold: "Near-target threshold", nearTargetThresholdDescription: "Degrees below target that should be treated as near target.", outsideTemperatureEntity: "Outside temperature entity", outsideTemperatureEntityDescription: "Optional outside temperature sensor.", sections: { display: "Display", entities: "Entities", general: "General", safety: "Safety and confirmation", temperatureCalculation: "Temperature calculation", trend: "Trend" }, showOutsideTemperature: "Show outside temperature", showOutsideTemperatureDescription: "Display the outside temperature when an entity is configured.", showTemperatureTrend: "Show temperature trend", showTemperatureTrendDescription: "Load recent Recorder history for top, middle or bottom direct sensor modes.", showTemperatureZones: "Show temperature zones", showTemperatureZonesDescription: "Display top, middle and bottom sensor values.", targetReachedTolerance: "Target-reached tolerance", targetReachedToleranceDescription: "Degrees around target that are considered target reached.", targetTemperatureEntity: "Target temperature entity", targetTemperatureEntityDescription: "Manual target setting entity. Supported domains: number and input_number.", temperatureBottomEntity: "Bottom temperature entity", temperatureBottomEntityDescription: "Bottom sauna temperature sensor.", temperatureMiddleEntity: "Middle temperature entity", temperatureMiddleEntityDescription: "Middle sauna temperature sensor.", temperatureTopEntity: "Top temperature entity", temperatureTopEntityDescription: "Top sauna temperature sensor.", trendHistoryMinutes: "Trend history minutes", trendHistoryMinutesDescription: "History window loaded from Recorder. Allowed range: 15 to 1440 minutes.", trendRefreshMinutes: "Trend refresh minutes", trendRefreshMinutesDescription: "How often the trend is refreshed. Allowed range: 1 to 60 minutes.", weightBottom: "Bottom weight", weightBottomDescription: "Weight for bottom sensor when weighted average is selected.", weightMiddle: "Middle weight", weightMiddleDescription: "Weight for middle sensor when weighted average is selected.", weightTop: "Top weight", weightTopDescription: "Weight for top sensor when weighted average is selected." }, lr = { average: "Average", bottom: "Bottom", maximum: "Maximum", middle: "Middle", minimum: "Minimum", top: "Top", weighted_average: "Weighted average" }, cr = { above_target: "Above target", far_below: "Far below target", heating: "Heating", near_target: "Near target", target_reached: "Target reached", unavailable: "Temperature unavailable" }, hr = {
  card: ur,
  editor: dr,
  modes: lr,
  status: cr
}, Ne = {
  de: ar,
  en: hr
};
function it(t, e) {
  const r = t != null && t.toLowerCase().startsWith("de") ? "de" : "en";
  return Ue(Ne[r], e) ?? Ue(Ne.en, e) ?? e;
}
function Ue(t, e) {
  const r = e.split(".").reduce((i, n) => {
    if (!(typeof i != "object" || i === void 0))
      return i[n];
  }, t);
  return typeof r == "string" ? r : void 0;
}
var pr = Object.defineProperty, mr = Object.getOwnPropertyDescriptor, b = (t, e, r, i) => {
  for (var n = i > 1 ? void 0 : i ? mr(e, r) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, r, n) : o(n)) || n);
  return i && n && pr(e, r, n), n;
};
const He = "°C";
let m = class extends T {
  constructor() {
    super(...arguments), this.config = D({}), this.switchPending = !1, this.targetPending = !1, this.historySamples = [], this.historyLoading = !1;
  }
  setConfig(t) {
    this.config = D(t), this.resetHistorySchedule();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.clearHistoryTimer(), this.clearTargetDebounceTimer();
  }
  getCardSize() {
    return 6;
  }
  static getConfigElement() {
    return document.createElement(Ke);
  }
  static getStubConfig() {
    return D({});
  }
  updated() {
    this.scheduleHistoryRefresh();
  }
  render() {
    const t = er(this.hass, this.config), e = Dt(
      t.summary.controlTemperature,
      t.targetTemperature,
      {
        nearTargetThreshold: this.config.near_target_threshold,
        targetReachedTolerance: this.config.target_reached_tolerance
      }
    ), r = We(e.status), i = H(this.hass, this.config.main_switch_entity), n = H(this.hass, this.config.target_temperature_entity), s = Oe(this.config.control_temperature_mode);
    return p`
      <ha-card>
        <div class="content">
          <header class="header">
            <div>
              <div class="title">${this.config.name}</div>
              <div class="state">${this.getSwitchStateLabel(i)}</div>
            </div>
            ${this.renderPowerButton(i)}
          </header>

          <main class="main">
            <section class="hero-temperature" aria-label=${this.t("card.controlTemperature")}>
              <div class="label">${this.t("card.controlTemperature")}</div>
              <div class=${this.valueClass(t.summary.controlTemperature)}>
                ${this.formatTemperature(
      t.summary.controlTemperature,
      this.getControlTemperatureUnit()
    )}
              </div>
              <div class="progress-track" aria-hidden="true">
                <div
                  class="progress-bar"
                  style=${`width: ${Math.round(e.progress * 100)}%; background: linear-gradient(90deg, ${r.fill}, ${r.line});`}
                ></div>
              </div>
              <div class="status-line">${this.t(`status.${e.status}`)}</div>
              ${e.difference !== void 0 ? p`<div class="status-line">
                      ${this.t("card.targetDifference")}:
                      ${this.formatTemperatureDelta(e.difference)}
                    </div>` : void 0}
              ${this.serviceError ? p`<div class="error" role="alert">${this.serviceError}</div>` : void 0}
            </section>

            ${this.renderTargetControl(n)}
          </main>

          <section class="grid" aria-label=${this.t("card.temperatureZones")}>
            ${this.config.show_temperature_zones ? p`
                    ${this.renderMetric(
      "card.topTemperature",
      t.zones.top,
      this.config.temperature_top_entity
    )}
                    ${this.renderMetric(
      "card.middleTemperature",
      t.zones.middle,
      this.config.temperature_middle_entity
    )}
                    ${this.renderMetric(
      "card.bottomTemperature",
      t.zones.bottom,
      this.config.temperature_bottom_entity
    )}
                  ` : void 0}
            ${this.config.show_outside_temperature && this.config.outside_temperature_entity ? this.renderMetric(
      "card.outsideTemperature",
      t.outsideTemperature,
      this.config.outside_temperature_entity
    ) : void 0}
            ${t.summary.stratification !== void 0 ? this.renderMetric("card.stratification", t.summary.stratification) : void 0}
          </section>

          ${this.config.show_temperature_trend ? p`
                  <section class="trend-panel" aria-label=${this.t("card.temperatureTrend")}>
                    <div class="label">${this.t("card.temperatureTrend")}</div>
                    ${s ? p`
                            <sauna-suite-temperature-trend
                              .samples=${this.historySamples}
                              .status=${e.status}
                              empty-label=${this.historyLoading ? this.t("card.trendLoading") : this.t("card.trendUnavailable")}
                            ></sauna-suite-temperature-trend>
                          ` : p`<div class="trend-empty">
                            ${this.t("card.trendDirectModesOnly")}
                          </div>`}
                  </section>
                ` : void 0}
        </div>
      </ha-card>
    `;
  }
  renderPowerButton(t) {
    const e = this.switchPending || !Xe(this.config.main_switch_entity) || N(t), r = (t == null ? void 0 : t.state) === "on";
    return p`
      <button
        class=${`power-button ${r ? "on" : "off"}`}
        type="button"
        ?disabled=${e}
        aria-label=${this.t("card.togglePower")}
        @click=${this.handlePowerClick}
      >
        ${this.switchPending ? this.t("card.pending") : r ? this.t("card.powerOn") : this.t("card.powerOff")}
      </button>
    `;
  }
  renderTargetControl(t) {
    const e = Pe(t), r = this.getEntityNumber(t), i = this.targetPending || !et(this.config.target_temperature_entity) || N(t) || r === void 0;
    return p`
      <section class="target-control" aria-label=${this.t("card.targetTemperature")}>
        <div class="label">${this.t("card.targetTemperature")}</div>
        <div class=${this.valueClass(r)}>
          ${this.formatTemperature(r, this.getTemperatureUnit(this.config.target_temperature_entity))}
        </div>
        <div class="target-actions">
          <button
            class="step-button"
            type="button"
            ?disabled=${i}
            aria-label=${this.t("card.decreaseTarget")}
            @click=${() => this.adjustTargetTemperature(-1)}
          >
            -
          </button>
          <button
            class="step-button"
            type="button"
            ?disabled=${i}
            aria-label=${this.t("card.increaseTarget")}
            @click=${() => this.adjustTargetTemperature(1)}
          >
            +
          </button>
        </div>
        ${e && r !== void 0 ? p`
                <input
                  type="range"
                  min=${e.minimum}
                  max=${e.maximum}
                  step=${e.step}
                  .value=${String(r)}
                  ?disabled=${i}
                  aria-label=${this.t("card.targetTemperature")}
                  @input=${(n) => this.handleTargetSliderInput(n, e)}
                />
              ` : p`<div class="status-line">${this.t("card.sliderUnavailable")}</div>`}
        ${this.targetPending ? p`<div class="status-line">${this.t("card.pending")}</div>` : void 0}
      </section>
    `;
  }
  renderMetric(t, e, r) {
    return p`
      <div class="metric">
        <div class="label">${this.t(t)}</div>
        <div class=${this.valueClass(e)}>
          ${this.formatTemperature(e, this.getTemperatureUnit(r))}
        </div>
      </div>
    `;
  }
  async handlePowerClick() {
    const t = H(this.hass, this.config.main_switch_entity);
    if (this.switchPending || N(t))
      return;
    const e = (t == null ? void 0 : t.state) !== "on";
    if (e && this.config.confirm_switch_on && !window.confirm(this.t("card.confirmSwitchOn")))
      return;
    this.switchPending = !0, this.serviceError = void 0;
    const r = await Ft(this.hass, this.config.main_switch_entity, e);
    this.switchPending = !1, this.serviceError = r.ok ? void 0 : r.error;
  }
  adjustTargetTemperature(t) {
    const e = H(this.hass, this.config.target_temperature_entity), r = Pe(e), i = this.getEntityNumber(e);
    !r || i === void 0 || this.targetPending || this.updateTargetTemperature(i + r.step * t, r);
  }
  handleTargetSliderInput(t, e) {
    const r = t.target, i = Number(r.value);
    Number.isFinite(i) && (this.clearTargetDebounceTimer(), this.targetDebounceTimer = window.setTimeout(() => {
      this.updateTargetTemperature(i, e);
    }, 400));
  }
  async updateTargetTemperature(t, e) {
    if (this.targetPending)
      return;
    this.targetPending = !0, this.serviceError = void 0;
    const r = await Lt(
      this.hass,
      this.config.target_temperature_entity,
      t,
      e
    );
    this.targetPending = !1, this.serviceError = r.ok ? void 0 : r.error;
  }
  scheduleHistoryRefresh() {
    if (!this.config.show_temperature_trend || !this.hass || !Oe(this.config.control_temperature_mode)) {
      this.historySamples = [], this.lastHistoryFetchKey = void 0, this.clearHistoryTimer();
      return;
    }
    const t = Re(this.config), e = `${t ?? ""}:${this.config.trend_history_minutes}:${this.config.trend_refresh_minutes}`;
    if (!t) {
      this.historySamples = [], this.lastHistoryFetchKey = void 0, this.clearHistoryTimer();
      return;
    }
    this.lastHistoryFetchKey !== e && (this.lastHistoryFetchKey = e, this.loadHistory(t)), this.historyRefreshTimer === void 0 && (this.historyRefreshTimer = window.setInterval(() => {
      this.loadHistory(t);
    }, this.config.trend_refresh_minutes * 6e4));
  }
  async loadHistory(t) {
    this.historyLoading = !0, this.historySamples = await Yt(
      this.hass,
      t,
      this.config.trend_history_minutes
    ), this.historyLoading = !1;
  }
  resetHistorySchedule() {
    this.lastHistoryFetchKey = void 0, this.clearHistoryTimer();
  }
  clearHistoryTimer() {
    this.historyRefreshTimer !== void 0 && (window.clearInterval(this.historyRefreshTimer), this.historyRefreshTimer = void 0);
  }
  clearTargetDebounceTimer() {
    this.targetDebounceTimer !== void 0 && (window.clearTimeout(this.targetDebounceTimer), this.targetDebounceTimer = void 0);
  }
  getControlTemperatureUnit() {
    return this.getTemperatureUnit(Re(this.config));
  }
  getSwitchStateLabel(t) {
    return N(t) ? this.t("card.powerUnavailable") : (t == null ? void 0 : t.state) === "on" ? this.t("card.powerOn") : this.t("card.powerOff");
  }
  getEntityNumber(t) {
    if (!t || N(t))
      return;
    const e = Number(t.state);
    return Number.isFinite(e) ? e : void 0;
  }
  getTemperatureUnit(t) {
    var r;
    const e = (r = H(this.hass, t)) == null ? void 0 : r.attributes.unit_of_measurement;
    return typeof e == "string" && e.trim().length > 0 ? e : He;
  }
  valueClass(t) {
    return t === void 0 ? "metric-value unavailable" : "metric-value";
  }
  formatTemperature(t, e) {
    return t === void 0 ? this.t("card.notAvailable") : `${t.toFixed(1)} ${e}`;
  }
  formatTemperatureDelta(t) {
    return `${t > 0 ? "+" : ""}${t.toFixed(1)} ${He}`;
  }
  t(t) {
    var e, r;
    return it(((e = this.hass) == null ? void 0 : e.selectedLanguage) ?? ((r = this.hass) == null ? void 0 : r.language), t);
  }
};
m.styles = rr;
b([
  O({ attribute: !1 })
], m.prototype, "hass", 2);
b([
  S()
], m.prototype, "config", 2);
b([
  S()
], m.prototype, "switchPending", 2);
b([
  S()
], m.prototype, "targetPending", 2);
b([
  S()
], m.prototype, "serviceError", 2);
b([
  S()
], m.prototype, "historySamples", 2);
b([
  S()
], m.prototype, "historyLoading", 2);
m = b([
  ce(Ot)
], m);
const gr = ke`
  :host {
    display: block;
  }

  .form {
    display: grid;
    gap: 18px;
  }

  .section {
    display: grid;
    gap: 8px;
  }

  h3 {
    color: var(--primary-text-color);
    font-size: 14px;
    font-weight: 700;
    line-height: 1.3;
    margin: 0;
  }
`;
var fr = Object.defineProperty, _r = Object.getOwnPropertyDescriptor, me = (t, e, r, i) => {
  for (var n = i > 1 ? void 0 : i ? _r(e, r) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, r, n) : o(n)) || n);
  return i && n && fr(e, r, n), n;
};
let j = class extends T {
  constructor() {
    super(...arguments), this.config = D({}), this.computeLabel = (t) => t.label, this.computeHelper = (t) => t.description;
  }
  setConfig(t) {
    this.config = D(t);
  }
  render() {
    return p`
      <div class="form">
        ${this.sections.map(
      (t) => p`
            <section class="section">
              <h3>${this.t(t.titleKey)}</h3>
              <ha-form
                .hass=${this.hass}
                .data=${this.config}
                .schema=${t.schema}
                .computeLabel=${this.computeLabel}
                .computeHelper=${this.computeHelper}
                @value-changed=${this.handleValueChanged}
              ></ha-form>
            </section>
          `
    )}
      </div>
    `;
  }
  get sections() {
    const t = [
      {
        name: "control_temperature_mode",
        label: this.t("editor.controlTemperatureMode"),
        description: this.t("editor.controlTemperatureModeDescription"),
        selector: {
          select: {
            mode: "dropdown",
            options: qe.map((e) => ({
              value: e,
              label: this.t(`modes.${e}`)
            }))
          }
        }
      },
      this.numberField(
        "near_target_threshold",
        "editor.nearTargetThreshold",
        "editor.nearTargetThresholdDescription",
        0,
        50,
        0.5
      ),
      this.numberField(
        "target_reached_tolerance",
        "editor.targetReachedTolerance",
        "editor.targetReachedToleranceDescription",
        0,
        20,
        0.5
      )
    ];
    return this.config.control_temperature_mode === "weighted_average" && t.push(
      this.numberField(
        "weight_top",
        "editor.weightTop",
        "editor.weightTopDescription",
        0,
        10,
        0.1
      ),
      this.numberField(
        "weight_middle",
        "editor.weightMiddle",
        "editor.weightMiddleDescription",
        0,
        10,
        0.1
      ),
      this.numberField(
        "weight_bottom",
        "editor.weightBottom",
        "editor.weightBottomDescription",
        0,
        10,
        0.1
      )
    ), [
      {
        titleKey: "editor.sections.general",
        schema: [this.textField("name", "editor.cardName", "editor.cardNameDescription")]
      },
      {
        titleKey: "editor.sections.entities",
        schema: [
          this.entityField(
            "main_switch_entity",
            "editor.mainSwitchEntity",
            "editor.mainSwitchEntityDescription",
            [{ domain: "switch" }, { domain: "input_boolean" }]
          ),
          this.temperatureSensorField(
            "temperature_top_entity",
            "editor.temperatureTopEntity",
            "editor.temperatureTopEntityDescription"
          ),
          this.temperatureSensorField(
            "temperature_middle_entity",
            "editor.temperatureMiddleEntity",
            "editor.temperatureMiddleEntityDescription"
          ),
          this.temperatureSensorField(
            "temperature_bottom_entity",
            "editor.temperatureBottomEntity",
            "editor.temperatureBottomEntityDescription"
          ),
          this.entityField(
            "outside_temperature_entity",
            "editor.outsideTemperatureEntity",
            "editor.outsideTemperatureEntityDescription",
            [{ domain: "sensor", device_class: "temperature" }]
          ),
          this.entityField(
            "target_temperature_entity",
            "editor.targetTemperatureEntity",
            "editor.targetTemperatureEntityDescription",
            [{ domain: "number" }, { domain: "input_number" }]
          )
        ]
      },
      {
        titleKey: "editor.sections.temperatureCalculation",
        schema: t
      },
      {
        titleKey: "editor.sections.display",
        schema: [
          this.booleanField(
            "show_outside_temperature",
            "editor.showOutsideTemperature",
            "editor.showOutsideTemperatureDescription"
          ),
          this.booleanField(
            "show_temperature_zones",
            "editor.showTemperatureZones",
            "editor.showTemperatureZonesDescription"
          )
        ]
      },
      {
        titleKey: "editor.sections.trend",
        schema: [
          this.booleanField(
            "show_temperature_trend",
            "editor.showTemperatureTrend",
            "editor.showTemperatureTrendDescription"
          ),
          this.numberField(
            "trend_history_minutes",
            "editor.trendHistoryMinutes",
            "editor.trendHistoryMinutesDescription",
            15,
            1440,
            15
          ),
          this.numberField(
            "trend_refresh_minutes",
            "editor.trendRefreshMinutes",
            "editor.trendRefreshMinutesDescription",
            1,
            60,
            1
          )
        ]
      },
      {
        titleKey: "editor.sections.safety",
        schema: [
          this.booleanField(
            "confirm_switch_on",
            "editor.confirmSwitchOn",
            "editor.confirmSwitchOnDescription"
          )
        ]
      }
    ];
  }
  handleValueChanged(t) {
    this.updateConfig(t.detail.value);
  }
  updateConfig(t) {
    this.config = D({
      ...this.config,
      ...t
    }), this.dispatchEvent(
      new CustomEvent("config-changed", {
        bubbles: !0,
        composed: !0,
        detail: {
          config: this.config
        }
      })
    );
  }
  textField(t, e, r) {
    return {
      name: t,
      label: this.t(e),
      description: this.t(r),
      selector: {
        text: {}
      }
    };
  }
  temperatureSensorField(t, e, r) {
    return this.entityField(t, e, r, [
      { domain: "sensor", device_class: "temperature" }
    ]);
  }
  entityField(t, e, r, i) {
    return {
      name: t,
      label: this.t(e),
      description: this.t(r),
      selector: {
        entity: {
          filter: i
        }
      }
    };
  }
  numberField(t, e, r, i, n, s) {
    return {
      name: t,
      label: this.t(e),
      description: this.t(r),
      selector: {
        number: {
          min: i,
          max: n,
          mode: "box",
          step: s
        }
      }
    };
  }
  booleanField(t, e, r) {
    return {
      name: t,
      label: this.t(e),
      description: this.t(r),
      selector: {
        boolean: {}
      }
    };
  }
  t(t) {
    var e, r;
    return it(((e = this.hass) == null ? void 0 : e.selectedLanguage) ?? ((r = this.hass) == null ? void 0 : r.language), t);
  }
};
j.styles = gr;
me([
  O({ attribute: !1 })
], j.prototype, "hass", 2);
me([
  S()
], j.prototype, "config", 2);
j = me([
  ce(Ke)
], j);
const ze = {
  type: he,
  name: "Sauna Suite Card",
  description: "A placeholder card for the Sauna Suite Home Assistant project.",
  preview: !0
};
function yr(t = window) {
  t.customCards = t.customCards ?? [], t.customCards.some((r) => r.type === ze.type) || t.customCards.push(ze);
}
yr();
export {
  Ot as CARD_TAG,
  he as CARD_TYPE,
  Ke as EDITOR_TAG
};
//# sourceMappingURL=sauna-suite.js.map
