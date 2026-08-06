/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis, oe = G.ShadowRoot && (G.ShadyCSS === void 0 || G.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ae = Symbol(), ge = /* @__PURE__ */ new WeakMap();
let Fe = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== ae) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (oe && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ge.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ge.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const ot = (r) => new Fe(typeof r == "string" ? r : r + "", void 0, ae), Le = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, n, s) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[s + 1], r[0]);
  return new Fe(t, r, ae);
}, at = (r, e) => {
  if (oe) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), n = G.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = t.cssText, r.appendChild(i);
  }
}, fe = oe ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return ot(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ut, defineProperty: dt, getOwnPropertyDescriptor: lt, getOwnPropertyNames: ct, getOwnPropertySymbols: ht, getPrototypeOf: pt } = Object, y = globalThis, _e = y.trustedTypes, mt = _e ? _e.emptyScript : "", J = y.reactiveElementPolyfillSupport, z = (r, e) => r, K = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? mt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, ue = (r, e) => !ut(r, e), ye = { attribute: !0, type: String, converter: K, reflect: !1, useDefault: !1, hasChanged: ue };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), y.litPropertyMetadata ?? (y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let x = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ye) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(e, i, t);
      n !== void 0 && dt(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: n, set: s } = lt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
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
    const e = pt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(z("properties"))) {
      const t = this.properties, i = [...ct(t), ...ht(t)];
      for (const n of i) this.createProperty(n, t[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, n] of t) this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const n = this._$Eu(t, i);
      n !== void 0 && this._$Eh.set(n, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const n of i) t.unshift(fe(n));
    } else e !== void 0 && t.push(fe(e));
    return t;
  }
  static _$Eu(e, t) {
    const i = t.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((t) => t(this));
  }
  addController(e) {
    var t;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((t = e.hostConnected) == null || t.call(e));
  }
  removeController(e) {
    var t;
    (t = this._$EO) == null || t.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const i of t.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return at(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostConnected) == null ? void 0 : i.call(t);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((t) => {
      var i;
      return (i = t.hostDisconnected) == null ? void 0 : i.call(t);
    });
  }
  attributeChangedCallback(e, t, i) {
    this._$AK(e, i);
  }
  _$ET(e, t) {
    var s;
    const i = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, i);
    if (n !== void 0 && i.reflect === !0) {
      const o = (((s = i.converter) == null ? void 0 : s.toAttribute) !== void 0 ? i.converter : K).toAttribute(t, i.type);
      this._$Em = e, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var s, o;
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const u = i.getPropertyOptions(n), a = typeof u.converter == "function" ? { fromAttribute: u.converter } : ((s = u.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? u.converter : K;
      this._$Em = n;
      const l = a.fromAttribute(t, u.type);
      this[n] = l ?? ((o = this._$Ej) == null ? void 0 : o.get(n)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, n = !1, s) {
    var o;
    if (e !== void 0) {
      const u = this.constructor;
      if (n === !1 && (s = this[e]), i ?? (i = u.getPropertyOptions(e)), !((i.hasChanged ?? ue)(s, t) || i.useDefault && i.reflect && s === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(u._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: n, wrapped: s }, o) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), s !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), n === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
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
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((n) => {
        var s;
        return (s = n.hostUpdate) == null ? void 0 : s.call(n);
      }), this.update(t)) : this._$EM();
    } catch (n) {
      throw e = !1, this._$EM(), n;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
x.elementStyles = [], x.shadowRootOptions = { mode: "open" }, x[z("elementProperties")] = /* @__PURE__ */ new Map(), x[z("finalized")] = /* @__PURE__ */ new Map(), J == null || J({ ReactiveElement: x }), (y.reactiveElementVersions ?? (y.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k = globalThis, be = (r) => r, W = k.trustedTypes, ve = W ? W.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Be = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, Ve = "?" + _, gt = `<${Ve}>`, w = document, F = () => w.createComment(""), L = (r) => r === null || typeof r != "object" && typeof r != "function", de = Array.isArray, ft = (r) => de(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", Q = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Te = /-->/g, $e = />/g, b = RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), we = /'/g, Ee = /"/g, Ze = /^(?:script|style|textarea|title)$/i, je = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), p = je(1), Ae = je(2), M = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), Se = /* @__PURE__ */ new WeakMap(), v = w.createTreeWalker(w, 129);
function Ie(r, e) {
  if (!de(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ve !== void 0 ? ve.createHTML(e) : e;
}
const _t = (r, e) => {
  const t = r.length - 1, i = [];
  let n, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = O;
  for (let u = 0; u < t; u++) {
    const a = r[u];
    let l, c, d = -1, m = 0;
    for (; m < a.length && (o.lastIndex = m, c = o.exec(a), c !== null); ) m = o.lastIndex, o === O ? c[1] === "!--" ? o = Te : c[1] !== void 0 ? o = $e : c[2] !== void 0 ? (Ze.test(c[2]) && (n = RegExp("</" + c[2], "g")), o = b) : c[3] !== void 0 && (o = b) : o === b ? c[0] === ">" ? (o = n ?? O, d = -1) : c[1] === void 0 ? d = -2 : (d = o.lastIndex - c[2].length, l = c[1], o = c[3] === void 0 ? b : c[3] === '"' ? Ee : we) : o === Ee || o === we ? o = b : o === Te || o === $e ? o = O : (o = b, n = void 0);
    const f = o === b && r[u + 1].startsWith("/>") ? " " : "";
    s += o === O ? a + gt : d >= 0 ? (i.push(l), a.slice(0, d) + Be + a.slice(d) + _ + f) : a + _ + (d === -2 ? u : f);
  }
  return [Ie(r, s + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class B {
  constructor({ strings: e, _$litType$: t }, i) {
    let n;
    this.parts = [];
    let s = 0, o = 0;
    const u = e.length - 1, a = this.parts, [l, c] = _t(e, t);
    if (this.el = B.createElement(l, i), v.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = v.nextNode()) !== null && a.length < u; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const d of n.getAttributeNames()) if (d.endsWith(Be)) {
          const m = c[o++], f = n.getAttribute(d).split(_), j = /([.?@])?(.*)/.exec(m);
          a.push({ type: 1, index: s, name: j[2], strings: f, ctor: j[1] === "." ? bt : j[1] === "?" ? vt : j[1] === "@" ? Tt : q }), n.removeAttribute(d);
        } else d.startsWith(_) && (a.push({ type: 6, index: s }), n.removeAttribute(d));
        if (Ze.test(n.tagName)) {
          const d = n.textContent.split(_), m = d.length - 1;
          if (m > 0) {
            n.textContent = W ? W.emptyScript : "";
            for (let f = 0; f < m; f++) n.append(d[f], F()), v.nextNode(), a.push({ type: 2, index: ++s });
            n.append(d[m], F());
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
  static createElement(e, t) {
    const i = w.createElement("template");
    return i.innerHTML = e, i;
  }
}
function C(r, e, t = r, i) {
  var o, u;
  if (e === M) return e;
  let n = i !== void 0 ? (o = t._$Co) == null ? void 0 : o[i] : t._$Cl;
  const s = L(e) ? void 0 : e._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== s && ((u = n == null ? void 0 : n._$AO) == null || u.call(n, !1), s === void 0 ? n = void 0 : (n = new s(r), n._$AT(r, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = n : t._$Cl = n), n !== void 0 && (e = C(r, n._$AS(r, e.values), n, i)), e;
}
class yt {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: i } = this._$AD, n = ((e == null ? void 0 : e.creationScope) ?? w).importNode(t, !0);
    v.currentNode = n;
    let s = v.nextNode(), o = 0, u = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let l;
        a.type === 2 ? l = new Z(s, s.nextSibling, this, e) : a.type === 1 ? l = new a.ctor(s, a.name, a.strings, this, e) : a.type === 6 && (l = new $t(s, this, e)), this._$AV.push(l), a = i[++u];
      }
      o !== (a == null ? void 0 : a.index) && (s = v.nextNode(), o++);
    }
    return v.currentNode = w, n;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class Z {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, n) {
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = C(this, e, t), L(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== M && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ft(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && L(this._$AH) ? this._$AA.nextSibling.data = e : this.T(w.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: t, _$litType$: i } = e, n = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = B.createElement(Ie(i.h, i.h[0]), this.options)), i);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === n) this._$AH.p(t);
    else {
      const o = new yt(n, this), u = o.u(this.options);
      o.p(t), this.T(u), this._$AH = o;
    }
  }
  _$AC(e) {
    let t = Se.get(e.strings);
    return t === void 0 && Se.set(e.strings, t = new B(e)), t;
  }
  k(e) {
    de(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, n = 0;
    for (const s of e) n === t.length ? t.push(i = new Z(this.O(F()), this.O(F()), this, this.options)) : i = t[n], i._$AI(s), n++;
    n < t.length && (this._$AR(i && i._$AB.nextSibling, n), t.length = n);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const n = be(e).nextSibling;
      be(e).remove(), e = n;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class q {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, n, s) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = t, this._$AM = n, this.options = s, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = h;
  }
  _$AI(e, t = this, i, n) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) e = C(this, e, t, 0), o = !L(e) || e !== this._$AH && e !== M, o && (this._$AH = e);
    else {
      const u = e;
      let a, l;
      for (e = s[0], a = 0; a < s.length - 1; a++) l = C(this, u[i + a], t, a), l === M && (l = this._$AH[a]), o || (o = !L(l) || l !== this._$AH[a]), l === h ? e = h : e !== h && (e += (l ?? "") + s[a + 1]), this._$AH[a] = l;
    }
    o && !n && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class bt extends q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class vt extends q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class Tt extends q {
  constructor(e, t, i, n, s) {
    super(e, t, i, n, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = C(this, e, t, 0) ?? h) === M) return;
    const i = this._$AH, n = e === h && i !== h || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== h && (i === h || n);
    n && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class $t {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    C(this, e);
  }
}
const X = k.litHtmlPolyfillSupport;
X == null || X(B, Z), (k.litHtmlVersions ?? (k.litHtmlVersions = [])).push("3.3.3");
const wt = (r, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let n = i._$litPart$;
  if (n === void 0) {
    const s = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = n = new Z(e.insertBefore(F(), s), s, void 0, t ?? {});
  }
  return n._$AI(r), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const T = globalThis;
class $ extends x {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t;
    const e = super.createRenderRoot();
    return (t = this.renderOptions).renderBefore ?? (t.renderBefore = e.firstChild), e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = wt(t, this.renderRoot, this.renderOptions);
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
var ke;
$._$litElement$ = !0, $.finalized = !0, (ke = T.litElementHydrateSupport) == null || ke.call(T, { LitElement: $ });
const ee = T.litElementPolyfillSupport;
ee == null || ee({ LitElement: $ });
(T.litElementVersions ?? (T.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Et = { attribute: !0, type: String, converter: K, reflect: !1, hasChanged: ue }, At = (r = Et, e, t) => {
  const { kind: i, metadata: n } = t;
  let s = globalThis.litPropertyMetadata.get(n);
  if (s === void 0 && globalThis.litPropertyMetadata.set(n, s = /* @__PURE__ */ new Map()), i === "setter" && ((r = Object.create(r)).wrapped = !0), s.set(t.name, r), i === "accessor") {
    const { name: o } = t;
    return { set(u) {
      const a = e.get.call(this);
      e.set.call(this, u), this.requestUpdate(o, a, r, !0, u);
    }, init(u) {
      return u !== void 0 && this.C(o, void 0, r, u), u;
    } };
  }
  if (i === "setter") {
    const { name: o } = t;
    return function(u) {
      const a = this[o];
      e.call(this, u), this.requestUpdate(o, a, r, !0, u);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function R(r) {
  return (e, t) => typeof t == "object" ? At(r, e, t) : ((i, n, s) => {
    const o = n.hasOwnProperty(s);
    return n.constructor.createProperty(s, i), o ? Object.getOwnPropertyDescriptor(n, s) : void 0;
  })(r, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function E(r) {
  return R({ ...r, state: !0, attribute: !1 });
}
const xe = {
  nearTargetThreshold: 5,
  targetReachedTolerance: 2
}, St = {
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
function Ge(r, e) {
  if (!(r === void 0 || e === void 0))
    return r - e;
}
function xt(r) {
  return {
    nearTargetThreshold: De(
      r.nearTargetThreshold,
      xe.nearTargetThreshold
    ),
    targetReachedTolerance: De(
      r.targetReachedTolerance,
      xe.targetReachedTolerance
    )
  };
}
function Dt(r, e, t) {
  const i = Ge(r, e);
  if (i === void 0)
    return "unavailable";
  const n = xt(t);
  return i < -20 ? "far_below" : i <= -n.nearTargetThreshold ? "heating" : i < -n.targetReachedTolerance ? "near_target" : i <= n.targetReachedTolerance ? "target_reached" : "above_target";
}
function Mt(r, e) {
  return r === void 0 || e === void 0 || e <= 0 ? 0 : Math.min(Math.max(r / e, 0), 1);
}
function Ct(r, e, t) {
  return {
    difference: Ge(r, e),
    progress: Mt(r, e),
    status: Dt(r, e, t)
  };
}
function Ke(r) {
  return St[r];
}
function De(r, e) {
  return r === void 0 || !Number.isFinite(r) ? e : Math.max(0, r);
}
const We = "custom:sauna-suite-card", Pt = "sauna-suite-card", Rt = "sauna-suite-card", qe = "sauna-suite-editor", Ot = "fceeb-sauna-suite-temperature-trend";
function le(r, e, t) {
  r.get(e) || r.define(e, t);
}
var Nt = Object.defineProperty, ce = (r, e, t, i) => {
  for (var n = void 0, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = o(e, t, n) || n);
  return n && Nt(e, t, n), n;
};
class Y extends $ {
  constructor() {
    super(...arguments), this.samples = [], this.status = "unavailable", this.emptyLabel = "No trend data available";
  }
  createRenderRoot() {
    return this;
  }
  render() {
    if (this.samples.length < 2)
      return p`<div class="trend-empty">${this.emptyLabel}</div>`;
    const e = Ke(this.status), t = this.createLinePath(), i = this.createAreaPath(t);
    return p`
      <svg class="trend" viewBox="0 0 240 80" role="img" aria-label=${this.emptyLabel}>
        <defs>
          <linearGradient id="sauna-suite-trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color=${e.line} stop-opacity="0.28"></stop>
            <stop offset="100%" stop-color=${e.line} stop-opacity="0.02"></stop>
          </linearGradient>
        </defs>
        ${Ae`<path d=${i} fill="url(#sauna-suite-trend-fill)"></path>`}
        ${Ae`<path d=${t} fill="none" stroke=${e.line} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`}
      </svg>
    `;
  }
  createLinePath() {
    const n = this.samples.map((l) => l.value), s = Math.min(...n), u = Math.max(...n) - s || 1, a = 224 / (this.samples.length - 1);
    return this.samples.map((l, c) => {
      const d = 8 + c * a, m = 72 - (l.value - s) / u * 64;
      return `${c === 0 ? "M" : "L"} ${d.toFixed(1)} ${m.toFixed(1)}`;
    }).join(" ");
  }
  createAreaPath(e) {
    return `${e} L 232 76 L 8 76 Z`;
  }
}
ce([
  R({ attribute: !1 })
], Y.prototype, "samples");
ce([
  R()
], Y.prototype, "status");
ce([
  R({ attribute: "empty-label" })
], Y.prototype, "emptyLabel");
le(customElements, Ot, Y);
const Ye = [
  "top",
  "middle",
  "bottom",
  "average",
  "weighted_average",
  "minimum",
  "maximum"
];
function se(r, e, t) {
  if (te(r, "value"), te(e, "minimum"), te(t, "maximum"), e > t)
    throw new RangeError("minimum must be less than or equal to maximum");
  return Math.min(Math.max(r, e), t);
}
function te(r, e) {
  if (!Number.isFinite(r))
    throw new RangeError(`${e} must be a finite number`);
}
const Je = "Sauna Suite", re = 1, Ut = 5, Ht = 2, zt = 120, kt = 5;
function Qe() {
  return {
    type: We,
    name: Je,
    control_temperature_mode: "average",
    weight_top: re,
    weight_middle: re,
    weight_bottom: re,
    show_outside_temperature: !1,
    show_temperature_zones: !0,
    near_target_threshold: Ut,
    target_reached_tolerance: Ht,
    show_temperature_trend: !0,
    trend_history_minutes: zt,
    trend_refresh_minutes: kt,
    confirm_switch_on: !0
  };
}
function D(r) {
  const e = Qe(), t = {
    type: We,
    name: Xe(r.name, Je),
    control_temperature_mode: Ft(r.control_temperature_mode),
    weight_top: ie(r.weight_top, e.weight_top),
    weight_middle: ie(r.weight_middle, e.weight_middle),
    weight_bottom: ie(r.weight_bottom, e.weight_bottom),
    show_outside_temperature: I(
      r.show_outside_temperature,
      e.show_outside_temperature
    ),
    show_temperature_zones: I(
      r.show_temperature_zones,
      e.show_temperature_zones
    ),
    near_target_threshold: Me(
      r.near_target_threshold,
      e.near_target_threshold
    ),
    target_reached_tolerance: Me(
      r.target_reached_tolerance,
      e.target_reached_tolerance
    ),
    show_temperature_trend: I(
      r.show_temperature_trend,
      e.show_temperature_trend
    ),
    trend_history_minutes: Ce(
      r.trend_history_minutes,
      e.trend_history_minutes,
      15,
      1440
    ),
    trend_refresh_minutes: Ce(
      r.trend_refresh_minutes,
      e.trend_refresh_minutes,
      1,
      60
    ),
    confirm_switch_on: I(r.confirm_switch_on, e.confirm_switch_on)
  };
  return S(t, "main_switch_entity", r.main_switch_entity), S(t, "temperature_top_entity", r.temperature_top_entity), S(t, "temperature_middle_entity", r.temperature_middle_entity), S(t, "temperature_bottom_entity", r.temperature_bottom_entity), S(t, "outside_temperature_entity", r.outside_temperature_entity), S(t, "target_temperature_entity", r.target_temperature_entity), t;
}
function Ft(r) {
  return typeof r == "string" && Ye.includes(r) ? r : Qe().control_temperature_mode;
}
function ie(r, e) {
  return typeof r != "number" || !Number.isFinite(r) ? e : Math.max(0, r);
}
function I(r, e) {
  return typeof r == "boolean" ? r : e;
}
function Me(r, e) {
  return typeof r != "number" || !Number.isFinite(r) ? e : Math.max(0, r);
}
function Xe(r, e) {
  return typeof r == "string" ? r : e;
}
function S(r, e, t) {
  const i = Xe(t);
  i !== void 0 && (r[e] = i);
}
function Ce(r, e, t, i) {
  return typeof r != "number" || !Number.isFinite(r) ? e : se(r, t, i);
}
function et(r) {
  return P(r) === "switch" || P(r) === "input_boolean";
}
function tt(r) {
  return P(r) === "number" || P(r) === "input_number";
}
function N(r) {
  return !r || r.state === "unavailable" || r.state === "unknown";
}
async function Lt(r, e, t) {
  if (!(r != null && r.callService))
    return { ok: !1, error: "Home Assistant service API is unavailable." };
  if (!et(e))
    return { ok: !1, error: "Unsupported switch entity domain." };
  const i = P(e), n = t ? "turn_on" : "turn_off";
  try {
    return await r.callService(i, n, { entity_id: e }), { ok: !0 };
  } catch (s) {
    return {
      ok: !1,
      error: s instanceof Error ? s.message : "Failed to update switch entity."
    };
  }
}
async function Bt(r, e, t, i) {
  if (!(r != null && r.callService))
    return { ok: !1, error: "Home Assistant service API is unavailable." };
  if (!tt(e))
    return { ok: !1, error: "Unsupported target temperature entity domain." };
  const n = P(e), s = Vt(t, i);
  try {
    return await r.callService(n, "set_value", {
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
function Pe(r) {
  if (!r)
    return;
  const e = ne(r, "min"), t = ne(r, "max"), i = ne(r, "step");
  if (!(e === void 0 || t === void 0 || i === void 0 || i <= 0))
    return {
      minimum: e,
      maximum: t,
      step: i
    };
}
function Vt(r, e) {
  const t = se(r, e.minimum, e.maximum), i = Math.round((t - e.minimum) / e.step), n = e.minimum + i * e.step, s = Zt(e.step);
  return Number(se(n, e.minimum, e.maximum).toFixed(s));
}
function P(r) {
  return (r == null ? void 0 : r.split(".")[0]) ?? "";
}
function ne(r, e) {
  const t = r.attributes[e], i = typeof t == "number" ? t : Number(t);
  return Number.isFinite(i) ? i : void 0;
}
function Zt(r) {
  const [, e = ""] = r.toString().split(".");
  return e.length;
}
const jt = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function rt(r) {
  if (r === void 0)
    return;
  if (typeof r == "number")
    return Number.isFinite(r) ? r : void 0;
  const e = r.trim().toLowerCase();
  if (jt.has(e))
    return;
  const t = Number(r);
  return Number.isFinite(t) ? t : void 0;
}
function It(r) {
  const e = r.filter(Number.isFinite);
  return e.length === 0 ? void 0 : e.reduce((i, n) => i + n, 0) / e.length;
}
function Gt(r, e) {
  const t = it(r).map((s) => ({
    value: r[s],
    weight: Qt(e[s])
  })).filter((s) => s.value !== void 0), i = t.reduce((s, o) => s + o.weight, 0);
  return t.length === 0 || i <= 0 ? void 0 : t.reduce((s, o) => s + o.value * o.weight, 0) / i;
}
function Kt(r) {
  const e = he(r);
  return e.length > 0 ? Math.min(...e) : void 0;
}
function Wt(r) {
  const e = he(r);
  return e.length > 0 ? Math.max(...e) : void 0;
}
function qt(r, e, t) {
  switch (e) {
    case "top":
      return r.top;
    case "middle":
      return r.middle;
    case "bottom":
      return r.bottom;
    case "average":
      return It(he(r));
    case "weighted_average":
      return Gt(r, t);
    case "minimum":
      return Kt(r);
    case "maximum":
      return Wt(r);
  }
}
function Yt(r) {
  if (!(r.top === void 0 || r.bottom === void 0))
    return r.top - r.bottom;
}
function Jt(r, e, t) {
  return {
    controlTemperature: qt(r, e, t),
    stratification: Yt(r)
  };
}
function he(r) {
  return it(r).map((e) => r[e]).filter((e) => e !== void 0);
}
function it(r) {
  return ["top", "middle", "bottom"].filter((t) => r[t] !== void 0);
}
function Qt(r) {
  return Number.isFinite(r) ? Math.max(0, r) : 0;
}
async function Xt(r, e, t, i = 120) {
  if (!(r != null && r.callApi) || !e)
    return [];
  const n = /* @__PURE__ */ new Date(), s = new Date(n.getTime() - t * 6e4), o = new URLSearchParams({
    filter_entity_id: e,
    end_time: n.toISOString(),
    minimal_response: "1",
    no_attributes: "1"
  });
  try {
    const u = await r.callApi(
      "GET",
      `history/period/${s.toISOString()}?${o.toString()}`
    );
    return tr(er(u), i);
  } catch {
    return [];
  }
}
function er(r) {
  return r.flat().map((e) => {
    const t = rt(e.state), i = e.last_changed ?? e.last_updated, n = i ? Date.parse(i) : Number.NaN;
    if (!(t === void 0 || !Number.isFinite(n)))
      return {
        timestamp: n,
        value: t
      };
  }).filter((e) => e !== void 0);
}
function tr(r, e) {
  if (r.length <= e)
    return [...r];
  const t = Math.ceil(r.length / e);
  return r.filter((i, n) => n % t === 0).slice(0, e);
}
function rr(r, e) {
  const t = {
    top: U(r, e.temperature_top_entity),
    middle: U(r, e.temperature_middle_entity),
    bottom: U(r, e.temperature_bottom_entity)
  }, i = {
    top: e.weight_top,
    middle: e.weight_middle,
    bottom: e.weight_bottom
  };
  return {
    zones: t,
    outsideTemperature: U(r, e.outside_temperature_entity),
    targetTemperature: U(r, e.target_temperature_entity),
    summary: Jt(t, e.control_temperature_mode, i)
  };
}
function U(r, e) {
  var t;
  if (!(!r || !e))
    return rt((t = r.states[e]) == null ? void 0 : t.state);
}
function H(r, e) {
  if (!(!r || !e))
    return r.states[e];
}
const ir = /* @__PURE__ */ new Set(["top", "middle", "bottom"]);
function Re(r) {
  return ir.has(r);
}
function Oe(r) {
  switch (r.control_temperature_mode) {
    case "top":
      return r.temperature_top_entity;
    case "middle":
      return r.temperature_middle_entity;
    case "bottom":
      return r.temperature_bottom_entity;
    default:
      return;
  }
}
const nr = Le`
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
`, sr = { bottomTemperature: "Unten", confirmSwitchOn: "Sauna-Entitaet manuell einschalten?", controlTemperature: "Regeltemperatur", decreaseTarget: "Zieltemperatur verringern", earlyDevelopment: "Fruehe Entwicklung", increaseTarget: "Zieltemperatur erhoehen", middleTemperature: "Mitte", name: "Sauna Suite", notAvailable: "Nicht verfuegbar", outsideTemperature: "Aussen", pending: "Aktualisiere...", placeholder: "Nur manuelle Bedienung und Monitoring. Es ist keine automatische Heizungsregelung implementiert.", powerOff: "Aus", powerOn: "Ein", powerUnavailable: "Nicht verfuegbar", sliderUnavailable: "Slider nicht verfuegbar, weil min, max oder step fehlen.", stratification: "Temperaturschichtung", targetDifference: "Differenz zum Ziel", targetTemperature: "Ziel", temperatureTrend: "Temperaturverlauf", temperatureZones: "Temperaturzonen", togglePower: "Sauna-Power-Entitaet umschalten", topTemperature: "Oben", trendDirectModesOnly: "Der Trend ist derzeit nur für direkte Sensormodi verfügbar.", trendLoading: "Verlaufsdaten werden geladen", trendUnavailable: "Keine Verlaufsdaten verfuegbar" }, or = { cardName: "Kartenname", cardNameDescription: "Titel im Kartenkopf.", confirmSwitchOn: "Einschalten bestaetigen", confirmSwitchOnDescription: "Vor dem manuellen Einschalten der konfigurierten Entitaet einen Dialog anzeigen.", controlTemperatureMode: "Modus fuer Regeltemperatur", controlTemperatureModeDescription: "Legt fest, welche Temperatur als zentrale Regeltemperatur angezeigt wird.", mainSwitchEntity: "Hauptschalter-Entitaet", mainSwitchEntityDescription: "Entitaet fuer den manuellen Power-Button. Unterstuetzt: switch und input_boolean.", nearTargetThreshold: "Nahe-Ziel-Schwelle", nearTargetThresholdDescription: "Grad unter Zieltemperatur, die als nahe am Ziel gelten.", outsideTemperatureEntity: "Aussentemperatur-Entitaet", outsideTemperatureEntityDescription: "Optionaler Aussentemperatur-Sensor.", sections: { display: "Anzeige", entities: "Entitaeten", general: "Allgemein", safety: "Sicherheit und Bestaetigung", temperatureCalculation: "Temperaturberechnung", trend: "Verlauf" }, showOutsideTemperature: "Aussentemperatur anzeigen", showOutsideTemperatureDescription: "Aussentemperatur anzeigen, wenn eine Entitaet konfiguriert ist.", showTemperatureTrend: "Temperaturverlauf anzeigen", showTemperatureTrendDescription: "Aktuelle Recorder-Historie fuer direkte Sensormodi oben, Mitte oder unten laden.", showTemperatureZones: "Temperaturzonen anzeigen", showTemperatureZonesDescription: "Werte der Sensoren oben, Mitte und unten anzeigen.", targetReachedTolerance: "Ziel-erreicht-Toleranz", targetReachedToleranceDescription: "Grad um die Zieltemperatur, die als Ziel erreicht gelten.", targetTemperatureEntity: "Zieltemperatur-Entitaet", targetTemperatureEntityDescription: "Entitaet fuer manuelle Zielwerte. Unterstuetzt: number und input_number.", temperatureBottomEntity: "Temperatur unten", temperatureBottomEntityDescription: "Temperatursensor unten in der Sauna.", temperatureMiddleEntity: "Temperatur Mitte", temperatureMiddleEntityDescription: "Temperatursensor in der Mitte der Sauna.", temperatureTopEntity: "Temperatur oben", temperatureTopEntityDescription: "Temperatursensor oben in der Sauna.", trendHistoryMinutes: "Verlauf in Minuten", trendHistoryMinutesDescription: "Zeitfenster aus dem Recorder. Erlaubt: 15 bis 1440 Minuten.", trendRefreshMinutes: "Aktualisierung in Minuten", trendRefreshMinutesDescription: "Intervall fuer die Verlaufsaktualisierung. Erlaubt: 1 bis 60 Minuten.", weightBottom: "Gewichtung unten", weightBottomDescription: "Gewichtung fuer den unteren Sensor beim gewichteten Durchschnitt.", weightMiddle: "Gewichtung Mitte", weightMiddleDescription: "Gewichtung fuer den mittleren Sensor beim gewichteten Durchschnitt.", weightTop: "Gewichtung oben", weightTopDescription: "Gewichtung fuer den oberen Sensor beim gewichteten Durchschnitt." }, ar = { average: "Durchschnitt", bottom: "Unten", maximum: "Maximum", middle: "Mitte", minimum: "Minimum", top: "Oben", weighted_average: "Gewichteter Durchschnitt" }, ur = { above_target: "Ueber Ziel", far_below: "Weit unter Ziel", heating: "Heizt", near_target: "Nahe am Ziel", target_reached: "Ziel erreicht", unavailable: "Temperatur nicht verfuegbar" }, dr = {
  card: sr,
  editor: or,
  modes: ar,
  status: ur
}, lr = { bottomTemperature: "Bottom", confirmSwitchOn: "Switch the sauna entity on manually?", controlTemperature: "Control temperature", decreaseTarget: "Decrease target temperature", earlyDevelopment: "Early Development", increaseTarget: "Increase target temperature", middleTemperature: "Middle", name: "Sauna Suite", notAvailable: "Not available", outsideTemperature: "Outside", pending: "Updating...", placeholder: "Manual controls and monitoring only. No automatic heater regulation is implemented.", powerOff: "Off", powerOn: "On", powerUnavailable: "Unavailable", sliderUnavailable: "Slider unavailable because min, max or step is missing.", stratification: "Stratification", targetDifference: "Difference to target", targetTemperature: "Target", temperatureTrend: "Temperature trend", temperatureZones: "Temperature zones", togglePower: "Toggle sauna power entity", topTemperature: "Top", trendDirectModesOnly: "Trend is currently available only for direct sensor modes.", trendLoading: "Loading trend data", trendUnavailable: "No trend data available" }, cr = { cardName: "Card name", cardNameDescription: "Title shown in the card header.", confirmSwitchOn: "Confirm before switching on", confirmSwitchOnDescription: "Require a confirmation dialog before the manual power button turns on the configured entity.", controlTemperatureMode: "Control temperature mode", controlTemperatureModeDescription: "Select which temperature is displayed as the main control temperature.", mainSwitchEntity: "Main switch entity", mainSwitchEntityDescription: "Manual power button entity. Supported domains: switch and input_boolean.", nearTargetThreshold: "Near-target threshold", nearTargetThresholdDescription: "Degrees below target that should be treated as near target.", outsideTemperatureEntity: "Outside temperature entity", outsideTemperatureEntityDescription: "Optional outside temperature sensor.", sections: { display: "Display", entities: "Entities", general: "General", safety: "Safety and confirmation", temperatureCalculation: "Temperature calculation", trend: "Trend" }, showOutsideTemperature: "Show outside temperature", showOutsideTemperatureDescription: "Display the outside temperature when an entity is configured.", showTemperatureTrend: "Show temperature trend", showTemperatureTrendDescription: "Load recent Recorder history for top, middle or bottom direct sensor modes.", showTemperatureZones: "Show temperature zones", showTemperatureZonesDescription: "Display top, middle and bottom sensor values.", targetReachedTolerance: "Target-reached tolerance", targetReachedToleranceDescription: "Degrees around target that are considered target reached.", targetTemperatureEntity: "Target temperature entity", targetTemperatureEntityDescription: "Manual target setting entity. Supported domains: number and input_number.", temperatureBottomEntity: "Bottom temperature entity", temperatureBottomEntityDescription: "Bottom sauna temperature sensor.", temperatureMiddleEntity: "Middle temperature entity", temperatureMiddleEntityDescription: "Middle sauna temperature sensor.", temperatureTopEntity: "Top temperature entity", temperatureTopEntityDescription: "Top sauna temperature sensor.", trendHistoryMinutes: "Trend history minutes", trendHistoryMinutesDescription: "History window loaded from Recorder. Allowed range: 15 to 1440 minutes.", trendRefreshMinutes: "Trend refresh minutes", trendRefreshMinutesDescription: "How often the trend is refreshed. Allowed range: 1 to 60 minutes.", weightBottom: "Bottom weight", weightBottomDescription: "Weight for bottom sensor when weighted average is selected.", weightMiddle: "Middle weight", weightMiddleDescription: "Weight for middle sensor when weighted average is selected.", weightTop: "Top weight", weightTopDescription: "Weight for top sensor when weighted average is selected." }, hr = { average: "Average", bottom: "Bottom", maximum: "Maximum", middle: "Middle", minimum: "Minimum", top: "Top", weighted_average: "Weighted average" }, pr = { above_target: "Above target", far_below: "Far below target", heating: "Heating", near_target: "Near target", target_reached: "Target reached", unavailable: "Temperature unavailable" }, mr = {
  card: lr,
  editor: cr,
  modes: hr,
  status: pr
}, Ne = {
  de: dr,
  en: mr
};
function nt(r, e) {
  const t = r != null && r.toLowerCase().startsWith("de") ? "de" : "en";
  return Ue(Ne[t], e) ?? Ue(Ne.en, e) ?? e;
}
function Ue(r, e) {
  const t = e.split(".").reduce((i, n) => {
    if (!(typeof i != "object" || i === void 0))
      return i[n];
  }, r);
  return typeof t == "string" ? t : void 0;
}
var gr = Object.defineProperty, A = (r, e, t, i) => {
  for (var n = void 0, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = o(e, t, n) || n);
  return n && gr(e, t, n), n;
};
const He = "°C", pe = class pe extends $ {
  constructor() {
    super(...arguments), this.config = D({}), this.switchPending = !1, this.targetPending = !1, this.historySamples = [], this.historyLoading = !1;
  }
  setConfig(e) {
    this.config = D(e), this.resetHistorySchedule();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.clearHistoryTimer(), this.clearTargetDebounceTimer();
  }
  getCardSize() {
    return 6;
  }
  static getConfigElement() {
    return document.createElement(qe);
  }
  static getStubConfig() {
    return D({});
  }
  updated() {
    this.scheduleHistoryRefresh();
  }
  render() {
    const e = rr(this.hass, this.config), t = Ct(
      e.summary.controlTemperature,
      e.targetTemperature,
      {
        nearTargetThreshold: this.config.near_target_threshold,
        targetReachedTolerance: this.config.target_reached_tolerance
      }
    ), i = Ke(t.status), n = H(this.hass, this.config.main_switch_entity), s = H(this.hass, this.config.target_temperature_entity), o = Re(this.config.control_temperature_mode);
    return p`
      <ha-card>
        <div class="content">
          <header class="header">
            <div>
              <div class="title">${this.config.name}</div>
              <div class="state">${this.getSwitchStateLabel(n)}</div>
            </div>
            ${this.renderPowerButton(n)}
          </header>

          <main class="main">
            <section class="hero-temperature" aria-label=${this.t("card.controlTemperature")}>
              <div class="label">${this.t("card.controlTemperature")}</div>
              <div class=${this.valueClass(e.summary.controlTemperature)}>
                ${this.formatTemperature(
      e.summary.controlTemperature,
      this.getControlTemperatureUnit()
    )}
              </div>
              <div class="progress-track" aria-hidden="true">
                <div
                  class="progress-bar"
                  style=${`width: ${Math.round(t.progress * 100)}%; background: linear-gradient(90deg, ${i.fill}, ${i.line});`}
                ></div>
              </div>
              <div class="status-line">${this.t(`status.${t.status}`)}</div>
              ${t.difference !== void 0 ? p`<div class="status-line">
                      ${this.t("card.targetDifference")}:
                      ${this.formatTemperatureDelta(t.difference)}
                    </div>` : void 0}
              ${this.serviceError ? p`<div class="error" role="alert">${this.serviceError}</div>` : void 0}
            </section>

            ${this.renderTargetControl(s)}
          </main>

          <section class="grid" aria-label=${this.t("card.temperatureZones")}>
            ${this.config.show_temperature_zones ? p`
                    ${this.renderMetric(
      "card.topTemperature",
      e.zones.top,
      this.config.temperature_top_entity
    )}
                    ${this.renderMetric(
      "card.middleTemperature",
      e.zones.middle,
      this.config.temperature_middle_entity
    )}
                    ${this.renderMetric(
      "card.bottomTemperature",
      e.zones.bottom,
      this.config.temperature_bottom_entity
    )}
                  ` : void 0}
            ${this.config.show_outside_temperature && this.config.outside_temperature_entity ? this.renderMetric(
      "card.outsideTemperature",
      e.outsideTemperature,
      this.config.outside_temperature_entity
    ) : void 0}
            ${e.summary.stratification !== void 0 ? this.renderMetric("card.stratification", e.summary.stratification) : void 0}
          </section>

          ${this.config.show_temperature_trend ? p`
                  <section class="trend-panel" aria-label=${this.t("card.temperatureTrend")}>
                    <div class="label">${this.t("card.temperatureTrend")}</div>
                    ${o ? p`
                            <fceeb-sauna-suite-temperature-trend
                              .samples=${this.historySamples}
                              .status=${t.status}
                              empty-label=${this.historyLoading ? this.t("card.trendLoading") : this.t("card.trendUnavailable")}
                            ></fceeb-sauna-suite-temperature-trend>
                          ` : p`<div class="trend-empty">
                            ${this.t("card.trendDirectModesOnly")}
                          </div>`}
                  </section>
                ` : void 0}
        </div>
      </ha-card>
    `;
  }
  renderPowerButton(e) {
    const t = this.switchPending || !et(this.config.main_switch_entity) || N(e), i = (e == null ? void 0 : e.state) === "on";
    return p`
      <button
        class=${`power-button ${i ? "on" : "off"}`}
        type="button"
        ?disabled=${t}
        aria-label=${this.t("card.togglePower")}
        @click=${this.handlePowerClick}
      >
        ${this.switchPending ? this.t("card.pending") : i ? this.t("card.powerOn") : this.t("card.powerOff")}
      </button>
    `;
  }
  renderTargetControl(e) {
    const t = Pe(e), i = this.getEntityNumber(e), n = this.targetPending || !tt(this.config.target_temperature_entity) || N(e) || i === void 0;
    return p`
      <section class="target-control" aria-label=${this.t("card.targetTemperature")}>
        <div class="label">${this.t("card.targetTemperature")}</div>
        <div class=${this.valueClass(i)}>
          ${this.formatTemperature(
      i,
      this.getTemperatureUnit(this.config.target_temperature_entity)
    )}
        </div>
        <div class="target-actions">
          <button
            class="step-button"
            type="button"
            ?disabled=${n}
            aria-label=${this.t("card.decreaseTarget")}
            @click=${() => this.adjustTargetTemperature(-1)}
          >
            -
          </button>
          <button
            class="step-button"
            type="button"
            ?disabled=${n}
            aria-label=${this.t("card.increaseTarget")}
            @click=${() => this.adjustTargetTemperature(1)}
          >
            +
          </button>
        </div>
        ${t && i !== void 0 ? p`
                <input
                  type="range"
                  min=${t.minimum}
                  max=${t.maximum}
                  step=${t.step}
                  .value=${String(i)}
                  ?disabled=${n}
                  aria-label=${this.t("card.targetTemperature")}
                  @input=${(s) => this.handleTargetSliderInput(s, t)}
                />
              ` : p`<div class="status-line">${this.t("card.sliderUnavailable")}</div>`}
        ${this.targetPending ? p`<div class="status-line">${this.t("card.pending")}</div>` : void 0}
      </section>
    `;
  }
  renderMetric(e, t, i) {
    return p`
      <div class="metric">
        <div class="label">${this.t(e)}</div>
        <div class=${this.valueClass(t)}>
          ${this.formatTemperature(t, this.getTemperatureUnit(i))}
        </div>
      </div>
    `;
  }
  async handlePowerClick() {
    const e = H(this.hass, this.config.main_switch_entity);
    if (this.switchPending || N(e))
      return;
    const t = (e == null ? void 0 : e.state) !== "on";
    if (t && this.config.confirm_switch_on && !window.confirm(this.t("card.confirmSwitchOn")))
      return;
    this.switchPending = !0, this.serviceError = void 0;
    const i = await Lt(this.hass, this.config.main_switch_entity, t);
    this.switchPending = !1, this.serviceError = i.ok ? void 0 : i.error;
  }
  adjustTargetTemperature(e) {
    const t = H(this.hass, this.config.target_temperature_entity), i = Pe(t), n = this.getEntityNumber(t);
    !i || n === void 0 || this.targetPending || this.updateTargetTemperature(n + i.step * e, i);
  }
  handleTargetSliderInput(e, t) {
    const i = e.target, n = Number(i.value);
    Number.isFinite(n) && (this.clearTargetDebounceTimer(), this.targetDebounceTimer = window.setTimeout(() => {
      this.updateTargetTemperature(n, t);
    }, 400));
  }
  async updateTargetTemperature(e, t) {
    if (this.targetPending)
      return;
    this.targetPending = !0, this.serviceError = void 0;
    const i = await Bt(
      this.hass,
      this.config.target_temperature_entity,
      e,
      t
    );
    this.targetPending = !1, this.serviceError = i.ok ? void 0 : i.error;
  }
  scheduleHistoryRefresh() {
    if (!this.config.show_temperature_trend || !this.hass || !Re(this.config.control_temperature_mode)) {
      this.historySamples = [], this.lastHistoryFetchKey = void 0, this.clearHistoryTimer();
      return;
    }
    const e = Oe(this.config), t = `${e ?? ""}:${this.config.trend_history_minutes}:${this.config.trend_refresh_minutes}`;
    if (!e) {
      this.historySamples = [], this.lastHistoryFetchKey = void 0, this.clearHistoryTimer();
      return;
    }
    this.lastHistoryFetchKey !== t && (this.lastHistoryFetchKey = t, this.loadHistory(e)), this.historyRefreshTimer === void 0 && (this.historyRefreshTimer = window.setInterval(() => {
      this.loadHistory(e);
    }, this.config.trend_refresh_minutes * 6e4));
  }
  async loadHistory(e) {
    this.historyLoading = !0, this.historySamples = await Xt(
      this.hass,
      e,
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
    return this.getTemperatureUnit(Oe(this.config));
  }
  getSwitchStateLabel(e) {
    return N(e) ? this.t("card.powerUnavailable") : (e == null ? void 0 : e.state) === "on" ? this.t("card.powerOn") : this.t("card.powerOff");
  }
  getEntityNumber(e) {
    if (!e || N(e))
      return;
    const t = Number(e.state);
    return Number.isFinite(t) ? t : void 0;
  }
  getTemperatureUnit(e) {
    var i;
    const t = (i = H(this.hass, e)) == null ? void 0 : i.attributes.unit_of_measurement;
    return typeof t == "string" && t.trim().length > 0 ? t : He;
  }
  valueClass(e) {
    return e === void 0 ? "metric-value unavailable" : "metric-value";
  }
  formatTemperature(e, t) {
    return e === void 0 ? this.t("card.notAvailable") : `${e.toFixed(1)} ${t}`;
  }
  formatTemperatureDelta(e) {
    return `${e > 0 ? "+" : ""}${e.toFixed(1)} ${He}`;
  }
  t(e) {
    var t, i;
    return nt(((t = this.hass) == null ? void 0 : t.selectedLanguage) ?? ((i = this.hass) == null ? void 0 : i.language), e);
  }
};
pe.styles = nr;
let g = pe;
A([
  R({ attribute: !1 })
], g.prototype, "hass");
A([
  E()
], g.prototype, "config");
A([
  E()
], g.prototype, "switchPending");
A([
  E()
], g.prototype, "targetPending");
A([
  E()
], g.prototype, "serviceError");
A([
  E()
], g.prototype, "historySamples");
A([
  E()
], g.prototype, "historyLoading");
le(customElements, Rt, g);
const fr = Le`
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
var _r = Object.defineProperty, st = (r, e, t, i) => {
  for (var n = void 0, s = r.length - 1, o; s >= 0; s--)
    (o = r[s]) && (n = o(e, t, n) || n);
  return n && _r(e, t, n), n;
};
const me = class me extends $ {
  constructor() {
    super(...arguments), this.config = D({}), this.computeLabel = (e) => e.label, this.computeHelper = (e) => e.description;
  }
  setConfig(e) {
    this.config = D(e);
  }
  render() {
    return p`
      <div class="form">
        ${this.sections.map(
      (e) => p`
            <section class="section">
              <h3>${this.t(e.titleKey)}</h3>
              <ha-form
                .hass=${this.hass}
                .data=${this.config}
                .schema=${e.schema}
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
    const e = [
      {
        name: "control_temperature_mode",
        label: this.t("editor.controlTemperatureMode"),
        description: this.t("editor.controlTemperatureModeDescription"),
        selector: {
          select: {
            mode: "dropdown",
            options: Ye.map((t) => ({
              value: t,
              label: this.t(`modes.${t}`)
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
    return this.config.control_temperature_mode === "weighted_average" && e.push(
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
        schema: e
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
  handleValueChanged(e) {
    this.updateConfig(e.detail.value);
  }
  updateConfig(e) {
    this.config = D({
      ...this.config,
      ...e
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
  textField(e, t, i) {
    return {
      name: e,
      label: this.t(t),
      description: this.t(i),
      selector: {
        text: {}
      }
    };
  }
  temperatureSensorField(e, t, i) {
    return this.entityField(e, t, i, [
      { domain: "sensor", device_class: "temperature" }
    ]);
  }
  entityField(e, t, i, n) {
    return {
      name: e,
      label: this.t(t),
      description: this.t(i),
      selector: {
        entity: {
          filter: n
        }
      }
    };
  }
  numberField(e, t, i, n, s, o) {
    return {
      name: e,
      label: this.t(t),
      description: this.t(i),
      selector: {
        number: {
          min: n,
          max: s,
          mode: "box",
          step: o
        }
      }
    };
  }
  booleanField(e, t, i) {
    return {
      name: e,
      label: this.t(t),
      description: this.t(i),
      selector: {
        boolean: {}
      }
    };
  }
  t(e) {
    var t, i;
    return nt(((t = this.hass) == null ? void 0 : t.selectedLanguage) ?? ((i = this.hass) == null ? void 0 : i.language), e);
  }
};
me.styles = fr;
let V = me;
st([
  R({ attribute: !1 })
], V.prototype, "hass");
st([
  E()
], V.prototype, "config");
le(customElements, qe, V);
const ze = {
  type: Pt,
  name: "Sauna Suite",
  description: "A Home Assistant dashboard card for sauna monitoring and manual controls.",
  preview: !0
};
function yr(r = window) {
  r.customCards = r.customCards ?? [], r.customCards.some((t) => t.type === ze.type) || r.customCards.push(ze);
}
yr();
export {
  Pt as CARD_PICKER_TYPE,
  Rt as CARD_TAG,
  We as CARD_TYPE,
  qe as EDITOR_TAG,
  Ot as TEMPERATURE_TREND_TAG
};
//# sourceMappingURL=sauna-suite.js.map
