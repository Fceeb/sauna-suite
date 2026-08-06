/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, ce = Y.ShadowRoot && (Y.ShadyCSS === void 0 || Y.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, he = Symbol(), be = /* @__PURE__ */ new WeakMap();
let Ze = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== he) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ce && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = be.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && be.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const dt = (r) => new Ze(typeof r == "string" ? r : r + "", void 0, he), je = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, n, s) => i + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[s + 1], r[0]);
  return new Ze(t, r, he);
}, ct = (r, e) => {
  if (ce) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), n = Y.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = t.cssText, r.appendChild(i);
  }
}, ye = ce ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return dt(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: ht, defineProperty: pt, getOwnPropertyDescriptor: mt, getOwnPropertyNames: gt, getOwnPropertySymbols: ft, getPrototypeOf: _t } = Object, b = globalThis, Te = b.trustedTypes, vt = Te ? Te.emptyScript : "", te = b.reactiveElementPolyfillSupport, F = (r, e) => r, J = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? vt : null;
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
} }, pe = (r, e) => !ht(r, e), $e = { attribute: !0, type: String, converter: J, reflect: !1, useDefault: !1, hasChanged: pe };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), b.litPropertyMetadata ?? (b.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let P = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = $e) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(e, i, t);
      n !== void 0 && pt(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: n, set: s } = mt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: n, set(a) {
      const o = n == null ? void 0 : n.call(this);
      s == null || s.call(this, a), this.requestUpdate(e, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? $e;
  }
  static _$Ei() {
    if (this.hasOwnProperty(F("elementProperties"))) return;
    const e = _t(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(F("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(F("properties"))) {
      const t = this.properties, i = [...gt(t), ...ft(t)];
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
      for (const n of i) t.unshift(ye(n));
    } else e !== void 0 && t.push(ye(e));
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
    return ct(e, this.constructor.elementStyles), e;
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
      const a = (((s = i.converter) == null ? void 0 : s.toAttribute) !== void 0 ? i.converter : J).toAttribute(t, i.type);
      this._$Em = e, a == null ? this.removeAttribute(n) : this.setAttribute(n, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var s, a;
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const o = i.getPropertyOptions(n), l = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((s = o.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? o.converter : J;
      this._$Em = n;
      const d = l.fromAttribute(t, o.type);
      this[n] = d ?? ((a = this._$Ej) == null ? void 0 : a.get(n)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, n = !1, s) {
    var a;
    if (e !== void 0) {
      const o = this.constructor;
      if (n === !1 && (s = this[e]), i ?? (i = o.getPropertyOptions(e)), !((i.hasChanged ?? pe)(s, t) || i.useDefault && i.reflect && s === ((a = this._$Ej) == null ? void 0 : a.get(e)) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: n, wrapped: s }, a) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), s !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), n === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [s, a] of this._$Ep) this[s] = a;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [s, a] of n) {
        const { wrapped: o } = a, l = this[s];
        o !== !0 || this._$AL.has(s) || l === void 0 || this.C(s, void 0, a, l);
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
P.elementStyles = [], P.shadowRootOptions = { mode: "open" }, P[F("elementProperties")] = /* @__PURE__ */ new Map(), P[F("finalized")] = /* @__PURE__ */ new Map(), te == null || te({ ReactiveElement: P }), (b.reactiveElementVersions ?? (b.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, we = (r) => r, Q = L.trustedTypes, Ee = Q ? Q.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Ie = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, Ke = "?" + v, bt = `<${Ke}>`, E = document, B = () => E.createComment(""), Z = (r) => r === null || typeof r != "object" && typeof r != "function", me = Array.isArray, yt = (r) => me(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", re = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, xe = /-->/g, Ae = />/g, y = RegExp(`>|${re}(?:([^\\s"'>=/]+)(${re}*=${re}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Se = /'/g, De = /"/g, Ge = /^(?:script|style|textarea|title)$/i, We = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), c = We(1), V = We(2), R = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), Me = /* @__PURE__ */ new WeakMap(), T = E.createTreeWalker(E, 129);
function qe(r, e) {
  if (!me(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ee !== void 0 ? Ee.createHTML(e) : e;
}
const Tt = (r, e) => {
  const t = r.length - 1, i = [];
  let n, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = O;
  for (let o = 0; o < t; o++) {
    const l = r[o];
    let d, p, u = -1, f = 0;
    for (; f < l.length && (a.lastIndex = f, p = a.exec(l), p !== null); ) f = a.lastIndex, a === O ? p[1] === "!--" ? a = xe : p[1] !== void 0 ? a = Ae : p[2] !== void 0 ? (Ge.test(p[2]) && (n = RegExp("</" + p[2], "g")), a = y) : p[3] !== void 0 && (a = y) : a === y ? p[0] === ">" ? (a = n ?? O, u = -1) : p[1] === void 0 ? u = -2 : (u = a.lastIndex - p[2].length, d = p[1], a = p[3] === void 0 ? y : p[3] === '"' ? De : Se) : a === De || a === Se ? a = y : a === xe || a === Ae ? a = O : (a = y, n = void 0);
    const _ = a === y && r[o + 1].startsWith("/>") ? " " : "";
    s += a === O ? l + bt : u >= 0 ? (i.push(d), l.slice(0, u) + Ie + l.slice(u) + v + _) : l + v + (u === -2 ? o : _);
  }
  return [qe(r, s + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class j {
  constructor({ strings: e, _$litType$: t }, i) {
    let n;
    this.parts = [];
    let s = 0, a = 0;
    const o = e.length - 1, l = this.parts, [d, p] = Tt(e, t);
    if (this.el = j.createElement(d, i), T.currentNode = this.el.content, t === 2 || t === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (n = T.nextNode()) !== null && l.length < o; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const u of n.getAttributeNames()) if (u.endsWith(Ie)) {
          const f = p[a++], _ = n.getAttribute(u).split(v), W = /([.?@])?(.*)/.exec(f);
          l.push({ type: 1, index: s, name: W[2], strings: _, ctor: W[1] === "." ? wt : W[1] === "?" ? Et : W[1] === "@" ? xt : X }), n.removeAttribute(u);
        } else u.startsWith(v) && (l.push({ type: 6, index: s }), n.removeAttribute(u));
        if (Ge.test(n.tagName)) {
          const u = n.textContent.split(v), f = u.length - 1;
          if (f > 0) {
            n.textContent = Q ? Q.emptyScript : "";
            for (let _ = 0; _ < f; _++) n.append(u[_], B()), T.nextNode(), l.push({ type: 2, index: ++s });
            n.append(u[f], B());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Ke) l.push({ type: 2, index: s });
      else {
        let u = -1;
        for (; (u = n.data.indexOf(v, u + 1)) !== -1; ) l.push({ type: 7, index: s }), u += v.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const i = E.createElement("template");
    return i.innerHTML = e, i;
  }
}
function N(r, e, t = r, i) {
  var a, o;
  if (e === R) return e;
  let n = i !== void 0 ? (a = t._$Co) == null ? void 0 : a[i] : t._$Cl;
  const s = Z(e) ? void 0 : e._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== s && ((o = n == null ? void 0 : n._$AO) == null || o.call(n, !1), s === void 0 ? n = void 0 : (n = new s(r), n._$AT(r, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = n : t._$Cl = n), n !== void 0 && (e = N(r, n._$AS(r, e.values), n, i)), e;
}
class $t {
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
    const { el: { content: t }, parts: i } = this._$AD, n = ((e == null ? void 0 : e.creationScope) ?? E).importNode(t, !0);
    T.currentNode = n;
    let s = T.nextNode(), a = 0, o = 0, l = i[0];
    for (; l !== void 0; ) {
      if (a === l.index) {
        let d;
        l.type === 2 ? d = new K(s, s.nextSibling, this, e) : l.type === 1 ? d = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (d = new At(s, this, e)), this._$AV.push(d), l = i[++o];
      }
      a !== (l == null ? void 0 : l.index) && (s = T.nextNode(), a++);
    }
    return T.currentNode = E, n;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class K {
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
    e = N(this, e, t), Z(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== R && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : yt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && Z(this._$AH) ? this._$AA.nextSibling.data = e : this.T(E.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: t, _$litType$: i } = e, n = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = j.createElement(qe(i.h, i.h[0]), this.options)), i);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === n) this._$AH.p(t);
    else {
      const a = new $t(n, this), o = a.u(this.options);
      a.p(t), this.T(o), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = Me.get(e.strings);
    return t === void 0 && Me.set(e.strings, t = new j(e)), t;
  }
  k(e) {
    me(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, n = 0;
    for (const s of e) n === t.length ? t.push(i = new K(this.O(B()), this.O(B()), this, this.options)) : i = t[n], i._$AI(s), n++;
    n < t.length && (this._$AR(i && i._$AB.nextSibling, n), t.length = n);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const n = we(e).nextSibling;
      we(e).remove(), e = n;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class X {
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
    let a = !1;
    if (s === void 0) e = N(this, e, t, 0), a = !Z(e) || e !== this._$AH && e !== R, a && (this._$AH = e);
    else {
      const o = e;
      let l, d;
      for (e = s[0], l = 0; l < s.length - 1; l++) d = N(this, o[i + l], t, l), d === R && (d = this._$AH[l]), a || (a = !Z(d) || d !== this._$AH[l]), d === h ? e = h : e !== h && (e += (d ?? "") + s[l + 1]), this._$AH[l] = d;
    }
    a && !n && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class wt extends X {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class Et extends X {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class xt extends X {
  constructor(e, t, i, n, s) {
    super(e, t, i, n, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = N(this, e, t, 0) ?? h) === R) return;
    const i = this._$AH, n = e === h && i !== h || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== h && (i === h || n);
    n && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class At {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    N(this, e);
  }
}
const ie = L.litHtmlPolyfillSupport;
ie == null || ie(j, K), (L.litHtmlVersions ?? (L.litHtmlVersions = [])).push("3.3.3");
const St = (r, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let n = i._$litPart$;
  if (n === void 0) {
    const s = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = n = new K(e.insertBefore(B(), s), s, void 0, t ?? {});
  }
  return n._$AI(r), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $ = globalThis;
class w extends P {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = St(t, this.renderRoot, this.renderOptions);
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
    return R;
  }
}
var Be;
w._$litElement$ = !0, w.finalized = !0, (Be = $.litElementHydrateSupport) == null || Be.call($, { LitElement: w });
const ne = $.litElementPolyfillSupport;
ne == null || ne({ LitElement: w });
($.litElementVersions ?? ($.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Dt = { attribute: !0, type: String, converter: J, reflect: !1, hasChanged: pe }, Mt = (r = Dt, e, t) => {
  const { kind: i, metadata: n } = t;
  let s = globalThis.litPropertyMetadata.get(n);
  if (s === void 0 && globalThis.litPropertyMetadata.set(n, s = /* @__PURE__ */ new Map()), i === "setter" && ((r = Object.create(r)).wrapped = !0), s.set(t.name, r), i === "accessor") {
    const { name: a } = t;
    return { set(o) {
      const l = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(a, l, r, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(a, void 0, r, o), o;
    } };
  }
  if (i === "setter") {
    const { name: a } = t;
    return function(o) {
      const l = this[a];
      e.call(this, o), this.requestUpdate(a, l, r, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function x(r) {
  return (e, t) => typeof t == "object" ? Mt(r, e, t) : ((i, n, s) => {
    const a = n.hasOwnProperty(s);
    return n.constructor.createProperty(s, i), a ? Object.getOwnPropertyDescriptor(n, s) : void 0;
  })(r, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function A(r) {
  return x({ ...r, state: !0, attribute: !1 });
}
const Pe = {
  nearTargetThreshold: 5,
  targetReachedTolerance: 2
}, Pt = {
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
function Ye(r, e) {
  if (!(r === void 0 || e === void 0))
    return r - e;
}
function Ct(r) {
  return {
    nearTargetThreshold: Ce(
      r.nearTargetThreshold,
      Pe.nearTargetThreshold
    ),
    targetReachedTolerance: Ce(
      r.targetReachedTolerance,
      Pe.targetReachedTolerance
    )
  };
}
function Rt(r, e, t) {
  const i = Ye(r, e);
  if (i === void 0)
    return "unavailable";
  const n = Ct(t);
  return i < -20 ? "far_below" : i <= -n.nearTargetThreshold ? "heating" : i < -n.targetReachedTolerance ? "near_target" : i <= n.targetReachedTolerance ? "target_reached" : "above_target";
}
function Nt(r, e) {
  return r === void 0 || e === void 0 || e <= 0 ? 0 : Math.min(Math.max(r / e, 0), 1);
}
function Ht(r, e, t) {
  return {
    difference: Ye(r, e),
    progress: Nt(r, e),
    status: Rt(r, e, t)
  };
}
function Je(r) {
  return Pt[r];
}
function Ce(r, e) {
  return r === void 0 || !Number.isFinite(r) ? e : Math.max(0, r);
}
const Qe = "custom:sauna-suite-card", Ot = "sauna-suite-card", Ut = "sauna-suite-card", Xe = "sauna-suite-editor", kt = "fceeb-sauna-suite-temperature-trend";
function ge(r, e, t) {
  r.get(e) || r.define(e, t);
}
var zt = Object.defineProperty, ee = (r, e, t, i) => {
  for (var n = void 0, s = r.length - 1, a; s >= 0; s--)
    (a = r[s]) && (n = a(e, t, n) || n);
  return n && zt(e, t, n), n;
};
const se = 240, D = 80, m = 8;
class G extends w {
  constructor() {
    super(...arguments), this.samples = [], this.status = "unavailable", this.emptyLabel = "No trend data available";
  }
  createRenderRoot() {
    return this;
  }
  render() {
    if (this.samples.length < 2)
      return c`<div class="trend-empty">${this.emptyLabel}</div>`;
    const e = Je(this.status), t = this.createLinePath(), i = this.createAreaPath(t), n = this.createTargetReferencePath();
    return c`
      <svg class="trend" viewBox="0 0 240 80" role="img" aria-label=${this.emptyLabel}>
        <defs>
          <linearGradient id="sauna-suite-trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color=${e.line} stop-opacity="0.24"></stop>
            <stop offset="100%" stop-color=${e.line} stop-opacity="0.01"></stop>
          </linearGradient>
        </defs>
        ${V`<path d=${i} fill="url(#sauna-suite-trend-fill)"></path>`}
        ${n ? V`<path class="target-reference-line" d=${n} fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 5" stroke-linecap="round"></path>` : void 0}
        ${V`<path class="trend-line" d=${t} fill="none" stroke=${e.line} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`}
      </svg>
    `;
  }
  createLinePath() {
    const { minimum: e, range: t } = this.getValueRange(), i = (se - m * 2) / (this.samples.length - 1);
    return this.samples.map((n, s) => {
      const a = m + s * i, o = D - m - (n.value - e) / t * (D - m * 2);
      return `${s === 0 ? "M" : "L"} ${a.toFixed(1)} ${o.toFixed(1)}`;
    }).join(" ");
  }
  createTargetReferencePath() {
    if (this.targetValue === void 0 || !Number.isFinite(this.targetValue))
      return;
    const { minimum: e, range: t } = this.getValueRange(), i = D - m - (this.targetValue - e) / t * (D - m * 2);
    return `M ${m} ${i.toFixed(1)} L ${se - m} ${i.toFixed(1)}`;
  }
  createAreaPath(e) {
    return `${e} L ${se - m} ${D - m / 2} L ${m} ${D - m / 2} Z`;
  }
  getValueRange() {
    const e = this.samples.map((n) => n.value);
    this.targetValue !== void 0 && Number.isFinite(this.targetValue) && e.push(this.targetValue);
    const t = Math.min(...e), i = Math.max(...e);
    return {
      minimum: t,
      range: i - t || 1
    };
  }
}
ee([
  x({ attribute: !1 })
], G.prototype, "samples");
ee([
  x()
], G.prototype, "status");
ee([
  x({ attribute: "empty-label" })
], G.prototype, "emptyLabel");
ee([
  x({ attribute: "target-value", type: Number })
], G.prototype, "targetValue");
ge(customElements, kt, G);
const et = [
  "top",
  "middle",
  "bottom",
  "average",
  "weighted_average",
  "minimum",
  "maximum"
];
function de(r, e, t) {
  if (ae(r, "value"), ae(e, "minimum"), ae(t, "maximum"), e > t)
    throw new RangeError("minimum must be less than or equal to maximum");
  return Math.min(Math.max(r, e), t);
}
function ae(r, e) {
  if (!Number.isFinite(r))
    throw new RangeError(`${e} must be a finite number`);
}
const tt = "Sauna Suite", oe = 1, Ft = 5, Lt = 2, Vt = 120, Bt = 5;
function rt() {
  return {
    type: Qe,
    name: tt,
    control_temperature_mode: "average",
    weight_top: oe,
    weight_middle: oe,
    weight_bottom: oe,
    show_outside_temperature: !1,
    show_temperature_zones: !0,
    near_target_threshold: Ft,
    target_reached_tolerance: Lt,
    show_temperature_trend: !0,
    trend_history_minutes: Vt,
    trend_refresh_minutes: Bt,
    confirm_switch_on: !0
  };
}
function C(r) {
  const e = rt(), t = {
    type: Qe,
    name: it(r.name, tt),
    control_temperature_mode: Zt(r.control_temperature_mode),
    weight_top: le(r.weight_top, e.weight_top),
    weight_middle: le(r.weight_middle, e.weight_middle),
    weight_bottom: le(r.weight_bottom, e.weight_bottom),
    show_outside_temperature: q(
      r.show_outside_temperature,
      e.show_outside_temperature
    ),
    show_temperature_zones: q(
      r.show_temperature_zones,
      e.show_temperature_zones
    ),
    near_target_threshold: Re(
      r.near_target_threshold,
      e.near_target_threshold
    ),
    target_reached_tolerance: Re(
      r.target_reached_tolerance,
      e.target_reached_tolerance
    ),
    show_temperature_trend: q(
      r.show_temperature_trend,
      e.show_temperature_trend
    ),
    trend_history_minutes: Ne(
      r.trend_history_minutes,
      e.trend_history_minutes,
      15,
      1440
    ),
    trend_refresh_minutes: Ne(
      r.trend_refresh_minutes,
      e.trend_refresh_minutes,
      1,
      60
    ),
    confirm_switch_on: q(r.confirm_switch_on, e.confirm_switch_on)
  };
  return M(t, "main_switch_entity", r.main_switch_entity), M(t, "temperature_top_entity", r.temperature_top_entity), M(t, "temperature_middle_entity", r.temperature_middle_entity), M(t, "temperature_bottom_entity", r.temperature_bottom_entity), M(t, "outside_temperature_entity", r.outside_temperature_entity), M(t, "target_temperature_entity", r.target_temperature_entity), t;
}
function Zt(r) {
  return typeof r == "string" && et.includes(r) ? r : rt().control_temperature_mode;
}
function le(r, e) {
  return typeof r != "number" || !Number.isFinite(r) ? e : Math.max(0, r);
}
function q(r, e) {
  return typeof r == "boolean" ? r : e;
}
function Re(r, e) {
  return typeof r != "number" || !Number.isFinite(r) ? e : Math.max(0, r);
}
function it(r, e) {
  return typeof r == "string" ? r : e;
}
function M(r, e, t) {
  const i = it(t);
  i !== void 0 && (r[e] = i);
}
function Ne(r, e, t, i) {
  return typeof r != "number" || !Number.isFinite(r) ? e : de(r, t, i);
}
function nt(r) {
  return H(r) === "switch" || H(r) === "input_boolean";
}
function st(r) {
  return H(r) === "number" || H(r) === "input_number";
}
function U(r) {
  return !r || r.state === "unavailable" || r.state === "unknown";
}
async function jt(r, e, t) {
  if (!(r != null && r.callService))
    return { ok: !1, error: "Home Assistant service API is unavailable." };
  if (!nt(e))
    return { ok: !1, error: "Unsupported switch entity domain." };
  const i = H(e), n = t ? "turn_on" : "turn_off";
  try {
    return await r.callService(i, n, { entity_id: e }), { ok: !0 };
  } catch (s) {
    return {
      ok: !1,
      error: s instanceof Error ? s.message : "Failed to update switch entity."
    };
  }
}
async function It(r, e, t, i) {
  if (!(r != null && r.callService))
    return { ok: !1, error: "Home Assistant service API is unavailable." };
  if (!st(e))
    return { ok: !1, error: "Unsupported target temperature entity domain." };
  const n = H(e), s = Kt(t, i);
  try {
    return await r.callService(n, "set_value", {
      entity_id: e,
      value: s
    }), { ok: !0 };
  } catch (a) {
    return {
      ok: !1,
      error: a instanceof Error ? a.message : "Failed to update target temperature."
    };
  }
}
function He(r) {
  if (!r)
    return;
  const e = ue(r, "min"), t = ue(r, "max"), i = ue(r, "step");
  if (!(e === void 0 || t === void 0 || i === void 0 || i <= 0))
    return {
      minimum: e,
      maximum: t,
      step: i
    };
}
function Kt(r, e) {
  const t = de(r, e.minimum, e.maximum), i = Math.round((t - e.minimum) / e.step), n = e.minimum + i * e.step, s = Gt(e.step);
  return Number(de(n, e.minimum, e.maximum).toFixed(s));
}
function H(r) {
  return (r == null ? void 0 : r.split(".")[0]) ?? "";
}
function ue(r, e) {
  const t = r.attributes[e], i = typeof t == "number" ? t : Number(t);
  return Number.isFinite(i) ? i : void 0;
}
function Gt(r) {
  const [, e = ""] = r.toString().split(".");
  return e.length;
}
const Wt = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function at(r) {
  if (r === void 0)
    return;
  if (typeof r == "number")
    return Number.isFinite(r) ? r : void 0;
  const e = r.trim().toLowerCase();
  if (Wt.has(e))
    return;
  const t = Number(r);
  return Number.isFinite(t) ? t : void 0;
}
function qt(r) {
  const e = r.filter(Number.isFinite);
  return e.length === 0 ? void 0 : e.reduce((i, n) => i + n, 0) / e.length;
}
function Yt(r, e) {
  const t = ot(r).map((s) => ({
    value: r[s],
    weight: rr(e[s])
  })).filter((s) => s.value !== void 0), i = t.reduce((s, a) => s + a.weight, 0);
  return t.length === 0 || i <= 0 ? void 0 : t.reduce((s, a) => s + a.value * a.weight, 0) / i;
}
function Jt(r) {
  const e = fe(r);
  return e.length > 0 ? Math.min(...e) : void 0;
}
function Qt(r) {
  const e = fe(r);
  return e.length > 0 ? Math.max(...e) : void 0;
}
function Xt(r, e, t) {
  switch (e) {
    case "top":
      return r.top;
    case "middle":
      return r.middle;
    case "bottom":
      return r.bottom;
    case "average":
      return qt(fe(r));
    case "weighted_average":
      return Yt(r, t);
    case "minimum":
      return Jt(r);
    case "maximum":
      return Qt(r);
  }
}
function er(r) {
  if (!(r.top === void 0 || r.bottom === void 0))
    return r.top - r.bottom;
}
function tr(r, e, t) {
  return {
    controlTemperature: Xt(r, e, t),
    stratification: er(r)
  };
}
function fe(r) {
  return ot(r).map((e) => r[e]).filter((e) => e !== void 0);
}
function ot(r) {
  return ["top", "middle", "bottom"].filter((t) => r[t] !== void 0);
}
function rr(r) {
  return Number.isFinite(r) ? Math.max(0, r) : 0;
}
async function ir(r, e, t, i = 120) {
  if (!(r != null && r.callApi) || !e)
    return [];
  const n = /* @__PURE__ */ new Date(), s = new Date(n.getTime() - t * 6e4), a = new URLSearchParams({
    filter_entity_id: e,
    end_time: n.toISOString(),
    minimal_response: "1",
    no_attributes: "1"
  });
  try {
    const o = await r.callApi(
      "GET",
      `history/period/${s.toISOString()}?${a.toString()}`
    );
    return sr(nr(o), i);
  } catch {
    return [];
  }
}
function nr(r) {
  return r.flat().map((e) => {
    const t = at(e.state), i = e.last_changed ?? e.last_updated, n = i ? Date.parse(i) : Number.NaN;
    if (!(t === void 0 || !Number.isFinite(n)))
      return {
        timestamp: n,
        value: t
      };
  }).filter((e) => e !== void 0);
}
function sr(r, e) {
  if (r.length <= e)
    return [...r];
  const t = Math.ceil(r.length / e);
  return r.filter((i, n) => n % t === 0).slice(0, e);
}
function ar(r, e) {
  const t = {
    top: k(r, e.temperature_top_entity),
    middle: k(r, e.temperature_middle_entity),
    bottom: k(r, e.temperature_bottom_entity)
  }, i = {
    top: e.weight_top,
    middle: e.weight_middle,
    bottom: e.weight_bottom
  };
  return {
    zones: t,
    outsideTemperature: k(r, e.outside_temperature_entity),
    targetTemperature: k(r, e.target_temperature_entity),
    summary: tr(t, e.control_temperature_mode, i)
  };
}
function k(r, e) {
  var t;
  if (!(!r || !e))
    return at((t = r.states[e]) == null ? void 0 : t.state);
}
function z(r, e) {
  if (!(!r || !e))
    return r.states[e];
}
const or = /* @__PURE__ */ new Set(["top", "middle", "bottom"]);
function Oe(r) {
  return or.has(r);
}
function Ue(r) {
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
const lr = je`
  :host {
    display: block;
  }

  ha-card {
    background: var(--ha-card-background, var(--card-background-color));
    border-radius: var(--ha-card-border-radius, 18px);
    box-shadow: var(--ha-card-box-shadow, 0 10px 28px rgba(0, 0, 0, 0.08));
    overflow: hidden;
  }

  .content {
    color: var(--primary-text-color);
    display: grid;
    gap: 14px;
    padding: 16px;
  }

  .header {
    align-items: center;
    display: grid;
    gap: 12px;
    grid-template-columns: auto minmax(0, 1fr) auto;
  }

  .brand-mark {
    align-items: center;
    background: color-mix(in srgb, var(--sauna-status-line) 14%, transparent);
    border-radius: 16px;
    color: var(--sauna-status-line);
    display: inline-flex;
    height: 44px;
    justify-content: center;
    width: 44px;
  }

  .brand-mark svg,
  .power-icon svg {
    display: block;
    fill: none;
    height: 22px;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.9;
    width: 22px;
  }

  .header-copy {
    min-width: 0;
  }

  .title {
    color: var(--primary-text-color);
    font-size: 20px;
    font-weight: 750;
    line-height: 1.2;
    overflow-wrap: anywhere;
  }

  .state,
  .label,
  .status-line,
  .difference,
  .error {
    color: var(--secondary-text-color);
    font-size: 13px;
    line-height: 1.35;
  }

  .state {
    margin-top: 3px;
  }

  .power-button,
  .step-button {
    align-items: center;
    border: 0;
    cursor: pointer;
    display: inline-flex;
    font: inherit;
    font-weight: 700;
    justify-content: center;
  }

  .power-button {
    background: color-mix(in srgb, var(--primary-color) 14%, transparent);
    border-radius: 999px;
    color: var(--primary-color);
    gap: 8px;
    min-height: 42px;
    min-width: 108px;
    padding: 0 14px;
  }

  .power-button.on {
    background: color-mix(in srgb, var(--accent-color, var(--primary-color)) 18%, transparent);
    color: var(--accent-color, var(--primary-color));
  }

  .power-button.off {
    background: color-mix(in srgb, var(--secondary-text-color) 10%, transparent);
    color: var(--secondary-text-color);
  }

  .power-button:disabled,
  .step-button:disabled,
  input:disabled {
    cursor: not-allowed;
    opacity: 0.48;
  }

  .hero,
  .target-control,
  .trend-panel {
    background:
      linear-gradient(135deg, var(--sauna-status-fill), transparent 46%),
      color-mix(in srgb, var(--primary-text-color) 4%, transparent);
    border-radius: 18px;
    display: grid;
    gap: 14px;
    padding: 16px;
  }

  .hero {
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--divider-color) 72%, transparent);
  }

  .hero-main {
    align-items: end;
    display: grid;
    gap: 16px;
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .hero-value,
  .target-value,
  .target-current,
  .tile-value {
    align-items: baseline;
    color: var(--primary-text-color);
    display: inline-flex;
    font-variant-numeric: tabular-nums;
    gap: 5px;
    letter-spacing: 0;
  }

  .hero-value {
    margin-top: 5px;
  }

  .hero-number {
    font-size: 58px;
    font-weight: 820;
    line-height: 0.95;
  }

  .hero-unit {
    color: var(--secondary-text-color);
    font-size: 24px;
    font-weight: 700;
  }

  .target-summary {
    background: color-mix(
      in srgb,
      var(--ha-card-background, var(--card-background-color)) 72%,
      transparent
    );
    border-radius: 16px;
    min-width: 116px;
    padding: 12px;
  }

  .target-value span,
  .target-current span {
    font-size: 28px;
    font-weight: 780;
  }

  .target-value small,
  .target-current small,
  .tile-value small {
    color: var(--secondary-text-color);
    font-size: 0.58em;
    font-weight: 650;
  }

  .unavailable {
    color: var(--secondary-text-color);
  }

  .progress-track {
    background: color-mix(in srgb, var(--primary-text-color) 10%, transparent);
    border-radius: 999px;
    height: 10px;
    overflow: hidden;
  }

  .progress-bar {
    background: linear-gradient(90deg, var(--sauna-status-fill), var(--sauna-status-line));
    border-radius: inherit;
    height: 100%;
    min-width: 6px;
    transition: width 160ms ease;
  }

  .hero-meta {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 8px 12px;
  }

  .status-chip {
    align-items: center;
    color: var(--primary-text-color);
    display: inline-flex;
    font-size: 13px;
    font-weight: 700;
    gap: 7px;
    line-height: 1.35;
  }

  .status-dot {
    background: var(--sauna-status-line);
    border-radius: 999px;
    box-shadow: 0 0 0 4px var(--sauna-status-fill);
    height: 8px;
    width: 8px;
  }

  .zones {
    display: grid;
    gap: 10px;
  }

  .zone-grid,
  .secondary-grid {
    display: grid;
    gap: 10px;
  }

  .zone-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .secondary-grid {
    grid-template-columns: repeat(auto-fit, minmax(132px, 1fr));
  }

  .temperature-tile {
    background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
    border-radius: 16px;
    display: grid;
    gap: 7px;
    min-width: 0;
    padding: 12px;
  }

  .temperature-tile.subtle {
    background: transparent;
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--divider-color) 64%, transparent);
  }

  .tile-value span {
    font-size: 21px;
    font-weight: 760;
    line-height: 1.05;
  }

  .trend-panel {
    gap: 10px;
    padding-bottom: 12px;
  }

  .section-heading {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .trend {
    color: color-mix(in srgb, var(--secondary-text-color) 72%, transparent);
    display: block;
    height: 78px;
    width: 100%;
  }

  .target-reference-line {
    opacity: 0.72;
  }

  .trend-empty {
    color: var(--secondary-text-color);
    font-size: 13px;
    min-height: 42px;
  }

  .target-control {
    background: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
  }

  .target-header {
    align-items: center;
    display: grid;
    gap: 12px;
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .target-actions {
    align-items: center;
    display: flex;
    gap: 8px;
  }

  .step-button {
    background: color-mix(in srgb, var(--primary-color) 13%, transparent);
    border-radius: 14px;
    color: var(--primary-color);
    font-size: 20px;
    height: 38px;
    line-height: 1;
    width: 42px;
  }

  input[type='range'] {
    accent-color: var(--primary-color);
    width: 100%;
  }

  .error {
    color: var(--error-color);
  }

  @media (max-width: 560px) {
    .content {
      gap: 12px;
      padding: 14px;
    }

    .header {
      grid-template-columns: auto minmax(0, 1fr);
    }

    .power-button {
      grid-column: 1 / -1;
      width: 100%;
    }

    .hero-main,
    .target-header {
      grid-template-columns: 1fr;
    }

    .target-summary {
      min-width: 0;
    }

    .hero-number {
      font-size: 48px;
    }

    .zone-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .progress-bar {
      transition: none;
    }
  }
`, ur = { bottomTemperature: "Unten", confirmSwitchOn: "Sauna-Entitaet manuell einschalten?", controlTemperature: "Regeltemperatur", decreaseTarget: "Zieltemperatur verringern", earlyDevelopment: "Fruehe Entwicklung", increaseTarget: "Zieltemperatur erhoehen", middleTemperature: "Mitte", name: "Sauna Suite", notAvailable: "Nicht verfuegbar", outsideTemperature: "Aussen", pending: "Aktualisiere...", placeholder: "Nur manuelle Bedienung und Monitoring. Es ist keine automatische Heizungsregelung implementiert.", powerOff: "Aus", powerOn: "Ein", powerUnavailable: "Nicht verfuegbar", sliderUnavailable: "Slider nicht verfuegbar, weil min, max oder step fehlen.", stratification: "Temperaturschichtung", targetDifference: "Differenz zum Ziel", targetTemperature: "Ziel", temperatureTrend: "Temperaturverlauf", temperatureZones: "Temperaturzonen", togglePower: "Sauna-Power-Entitaet umschalten", topTemperature: "Oben", trendDirectModesOnly: "Der Trend ist derzeit nur für direkte Sensormodi verfügbar.", trendLoading: "Verlaufsdaten werden geladen", trendUnavailable: "Keine Verlaufsdaten verfuegbar" }, dr = { cardName: "Kartenname", cardNameDescription: "Titel im Kartenkopf.", confirmSwitchOn: "Einschalten bestaetigen", confirmSwitchOnDescription: "Vor dem manuellen Einschalten der konfigurierten Entitaet einen Dialog anzeigen.", controlTemperatureMode: "Modus fuer Regeltemperatur", controlTemperatureModeDescription: "Legt fest, welche Temperatur als zentrale Regeltemperatur angezeigt wird.", mainSwitchEntity: "Hauptschalter-Entitaet", mainSwitchEntityDescription: "Entitaet fuer den manuellen Power-Button. Unterstuetzt: switch und input_boolean.", nearTargetThreshold: "Nahe-Ziel-Schwelle", nearTargetThresholdDescription: "Grad unter Zieltemperatur, die als nahe am Ziel gelten.", outsideTemperatureEntity: "Aussentemperatur-Entitaet", outsideTemperatureEntityDescription: "Optionaler Aussentemperatur-Sensor.", sections: { display: "Anzeige", entities: "Entitaeten", general: "Allgemein", safety: "Sicherheit und Bestaetigung", temperatureCalculation: "Temperaturberechnung", trend: "Verlauf" }, showOutsideTemperature: "Aussentemperatur anzeigen", showOutsideTemperatureDescription: "Aussentemperatur anzeigen, wenn eine Entitaet konfiguriert ist.", showTemperatureTrend: "Temperaturverlauf anzeigen", showTemperatureTrendDescription: "Aktuelle Recorder-Historie fuer direkte Sensormodi oben, Mitte oder unten laden.", showTemperatureZones: "Temperaturzonen anzeigen", showTemperatureZonesDescription: "Werte der Sensoren oben, Mitte und unten anzeigen.", targetReachedTolerance: "Ziel-erreicht-Toleranz", targetReachedToleranceDescription: "Grad um die Zieltemperatur, die als Ziel erreicht gelten.", targetTemperatureEntity: "Zieltemperatur-Entitaet", targetTemperatureEntityDescription: "Entitaet fuer manuelle Zielwerte. Unterstuetzt: number und input_number.", temperatureBottomEntity: "Temperatur unten", temperatureBottomEntityDescription: "Temperatursensor unten in der Sauna.", temperatureMiddleEntity: "Temperatur Mitte", temperatureMiddleEntityDescription: "Temperatursensor in der Mitte der Sauna.", temperatureTopEntity: "Temperatur oben", temperatureTopEntityDescription: "Temperatursensor oben in der Sauna.", trendHistoryMinutes: "Verlauf in Minuten", trendHistoryMinutesDescription: "Zeitfenster aus dem Recorder. Erlaubt: 15 bis 1440 Minuten.", trendRefreshMinutes: "Aktualisierung in Minuten", trendRefreshMinutesDescription: "Intervall fuer die Verlaufsaktualisierung. Erlaubt: 1 bis 60 Minuten.", weightBottom: "Gewichtung unten", weightBottomDescription: "Gewichtung fuer den unteren Sensor beim gewichteten Durchschnitt.", weightMiddle: "Gewichtung Mitte", weightMiddleDescription: "Gewichtung fuer den mittleren Sensor beim gewichteten Durchschnitt.", weightTop: "Gewichtung oben", weightTopDescription: "Gewichtung fuer den oberen Sensor beim gewichteten Durchschnitt." }, cr = { average: "Durchschnitt", bottom: "Unten", maximum: "Maximum", middle: "Mitte", minimum: "Minimum", top: "Oben", weighted_average: "Gewichteter Durchschnitt" }, hr = { above_target: "Ueber Ziel", far_below: "Weit unter Ziel", heating: "Heizt", near_target: "Nahe am Ziel", target_reached: "Ziel erreicht", unavailable: "Temperatur nicht verfuegbar" }, pr = {
  card: ur,
  editor: dr,
  modes: cr,
  status: hr
}, mr = { bottomTemperature: "Bottom", confirmSwitchOn: "Switch the sauna entity on manually?", controlTemperature: "Control temperature", decreaseTarget: "Decrease target temperature", earlyDevelopment: "Early Development", increaseTarget: "Increase target temperature", middleTemperature: "Middle", name: "Sauna Suite", notAvailable: "Not available", outsideTemperature: "Outside", pending: "Updating...", placeholder: "Manual controls and monitoring only. No automatic heater regulation is implemented.", powerOff: "Off", powerOn: "On", powerUnavailable: "Unavailable", sliderUnavailable: "Slider unavailable because min, max or step is missing.", stratification: "Stratification", targetDifference: "Difference to target", targetTemperature: "Target", temperatureTrend: "Temperature trend", temperatureZones: "Temperature zones", togglePower: "Toggle sauna power entity", topTemperature: "Top", trendDirectModesOnly: "Trend is currently available only for direct sensor modes.", trendLoading: "Loading trend data", trendUnavailable: "No trend data available" }, gr = { cardName: "Card name", cardNameDescription: "Title shown in the card header.", confirmSwitchOn: "Confirm before switching on", confirmSwitchOnDescription: "Require a confirmation dialog before the manual power button turns on the configured entity.", controlTemperatureMode: "Control temperature mode", controlTemperatureModeDescription: "Select which temperature is displayed as the main control temperature.", mainSwitchEntity: "Main switch entity", mainSwitchEntityDescription: "Manual power button entity. Supported domains: switch and input_boolean.", nearTargetThreshold: "Near-target threshold", nearTargetThresholdDescription: "Degrees below target that should be treated as near target.", outsideTemperatureEntity: "Outside temperature entity", outsideTemperatureEntityDescription: "Optional outside temperature sensor.", sections: { display: "Display", entities: "Entities", general: "General", safety: "Safety and confirmation", temperatureCalculation: "Temperature calculation", trend: "Trend" }, showOutsideTemperature: "Show outside temperature", showOutsideTemperatureDescription: "Display the outside temperature when an entity is configured.", showTemperatureTrend: "Show temperature trend", showTemperatureTrendDescription: "Load recent Recorder history for top, middle or bottom direct sensor modes.", showTemperatureZones: "Show temperature zones", showTemperatureZonesDescription: "Display top, middle and bottom sensor values.", targetReachedTolerance: "Target-reached tolerance", targetReachedToleranceDescription: "Degrees around target that are considered target reached.", targetTemperatureEntity: "Target temperature entity", targetTemperatureEntityDescription: "Manual target setting entity. Supported domains: number and input_number.", temperatureBottomEntity: "Bottom temperature entity", temperatureBottomEntityDescription: "Bottom sauna temperature sensor.", temperatureMiddleEntity: "Middle temperature entity", temperatureMiddleEntityDescription: "Middle sauna temperature sensor.", temperatureTopEntity: "Top temperature entity", temperatureTopEntityDescription: "Top sauna temperature sensor.", trendHistoryMinutes: "Trend history minutes", trendHistoryMinutesDescription: "History window loaded from Recorder. Allowed range: 15 to 1440 minutes.", trendRefreshMinutes: "Trend refresh minutes", trendRefreshMinutesDescription: "How often the trend is refreshed. Allowed range: 1 to 60 minutes.", weightBottom: "Bottom weight", weightBottomDescription: "Weight for bottom sensor when weighted average is selected.", weightMiddle: "Middle weight", weightMiddleDescription: "Weight for middle sensor when weighted average is selected.", weightTop: "Top weight", weightTopDescription: "Weight for top sensor when weighted average is selected." }, fr = { average: "Average", bottom: "Bottom", maximum: "Maximum", middle: "Middle", minimum: "Minimum", top: "Top", weighted_average: "Weighted average" }, _r = { above_target: "Above target", far_below: "Far below target", heating: "Heating", near_target: "Near target", target_reached: "Target reached", unavailable: "Temperature unavailable" }, vr = {
  card: mr,
  editor: gr,
  modes: fr,
  status: _r
}, ke = {
  de: pr,
  en: vr
};
function lt(r, e) {
  const t = r != null && r.toLowerCase().startsWith("de") ? "de" : "en";
  return ze(ke[t], e) ?? ze(ke.en, e) ?? e;
}
function ze(r, e) {
  const t = e.split(".").reduce((i, n) => {
    if (!(typeof i != "object" || i === void 0))
      return i[n];
  }, r);
  return typeof t == "string" ? t : void 0;
}
var br = Object.defineProperty, S = (r, e, t, i) => {
  for (var n = void 0, s = r.length - 1, a; s >= 0; s--)
    (a = r[s]) && (n = a(e, t, n) || n);
  return n && br(e, t, n), n;
};
const Fe = "°C", Le = "—", _e = class _e extends w {
  constructor() {
    super(...arguments), this.config = C({}), this.switchPending = !1, this.targetPending = !1, this.historySamples = [], this.historyLoading = !1;
  }
  setConfig(e) {
    this.config = C(e), this.resetHistorySchedule();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.clearHistoryTimer(), this.clearTargetDebounceTimer();
  }
  getCardSize() {
    return 6;
  }
  static getConfigElement() {
    return document.createElement(Xe);
  }
  static getStubConfig() {
    return C({});
  }
  updated(e) {
    (e.has("hass") || e.has("config")) && this.scheduleHistoryRefresh();
  }
  render() {
    const e = ar(this.hass, this.config), t = Ht(
      e.summary.controlTemperature,
      e.targetTemperature,
      {
        nearTargetThreshold: this.config.near_target_threshold,
        targetReachedTolerance: this.config.target_reached_tolerance
      }
    ), i = Je(t.status), n = z(this.hass, this.config.main_switch_entity), s = z(this.hass, this.config.target_temperature_entity);
    return c`
      <ha-card>
        <div
          class="content"
          style=${`--sauna-status-line: ${i.line}; --sauna-status-fill: ${i.fill};`}
        >
          <header class="header">
            <div class="brand-mark" aria-hidden="true">${this.renderHeatIcon()}</div>
            <div class="header-copy">
              <div class="title">${this.config.name}</div>
              <div class="state">${this.getSwitchStateLabel(n)}</div>
            </div>
            ${this.renderPowerButton(n)}
          </header>

          ${this.renderHero(
      e.summary.controlTemperature,
      e.targetTemperature,
      t.status,
      t.progress,
      t.difference
    )}
          ${this.renderTemperatureZones(
      e.zones.top,
      e.zones.middle,
      e.zones.bottom,
      e.outsideTemperature,
      e.summary.stratification
    )}
          ${this.renderTrend(t.status, e.targetTemperature)}
          ${this.renderTargetControl(s)}
        </div>
      </ha-card>
    `;
  }
  renderHero(e, t, i, n, s) {
    const a = this.getTemperatureParts(
      e,
      this.getControlTemperatureUnit()
    ), o = this.getTemperatureParts(
      t,
      this.getTemperatureUnit(this.config.target_temperature_entity)
    );
    return c`
      <section class="hero" aria-label=${this.t("card.controlTemperature")}>
        <div class="hero-main">
          <div>
            <div class="label">${this.t("card.controlTemperature")}</div>
            <div class=${`hero-value ${a.unavailable ? "unavailable" : ""}`}>
              <span class="hero-number">${a.value}</span>
              <span class="hero-unit">${a.unit}</span>
            </div>
          </div>
          <div class="target-summary" aria-label=${this.t("card.targetTemperature")}>
            <div class="label">${this.t("card.targetTemperature")}</div>
            <div class=${`target-value ${o.unavailable ? "unavailable" : ""}`}>
              <span>${o.value}</span>
              <small>${o.unit}</small>
            </div>
          </div>
        </div>

        <div class="progress-track" aria-hidden="true">
          <div class="progress-bar" style=${`width: ${Math.round(n * 100)}%;`}></div>
        </div>

        <div class="hero-meta">
          <span class="status-chip">
            <span class="status-dot" aria-hidden="true"></span>
            ${this.t(`status.${i}`)}
          </span>
          ${s !== void 0 ? c`<span class="difference">
                  ${this.t("card.targetDifference")}: ${this.formatTemperatureDelta(s)}
                </span>` : void 0}
        </div>
        ${this.serviceError ? c`<div class="error" role="alert">${this.serviceError}</div>` : void 0}
      </section>
    `;
  }
  renderTemperatureZones(e, t, i, n, s) {
    const a = this.config.show_temperature_zones, o = this.config.show_outside_temperature && this.config.outside_temperature_entity !== void 0;
    if (!(!a && !o && s === void 0))
      return c`
      <section class="zones" aria-label=${this.t("card.temperatureZones")}>
        ${a ? c`
                <div class="zone-grid">
                  ${this.renderTemperatureTile(
        "card.topTemperature",
        e,
        this.config.temperature_top_entity
      )}
                  ${this.renderTemperatureTile(
        "card.middleTemperature",
        t,
        this.config.temperature_middle_entity
      )}
                  ${this.renderTemperatureTile(
        "card.bottomTemperature",
        i,
        this.config.temperature_bottom_entity
      )}
                </div>
              ` : void 0}
        <div class="secondary-grid">
          ${o ? this.renderTemperatureTile(
        "card.outsideTemperature",
        n,
        this.config.outside_temperature_entity,
        "subtle"
      ) : void 0}
          ${s !== void 0 ? this.renderTemperatureTile(
        "card.stratification",
        s,
        void 0,
        "subtle"
      ) : void 0}
        </div>
      </section>
    `;
  }
  renderTemperatureTile(e, t, i, n = "zone") {
    const s = this.getTemperatureParts(t, this.getTemperatureUnit(i), !0);
    return c`
      <div class=${`temperature-tile ${n}`}>
        <div class="label">${this.t(e)}</div>
        <div class=${`tile-value ${s.unavailable ? "unavailable" : ""}`}>
          <span>${s.value}</span>
          <small>${s.unit}</small>
        </div>
      </div>
    `;
  }
  renderTrend(e, t) {
    if (!this.config.show_temperature_trend)
      return;
    const i = Oe(this.config.control_temperature_mode);
    return c`
      <section class="trend-panel" aria-label=${this.t("card.temperatureTrend")}>
        <div class="section-heading">
          <div>
            <div class="label">${this.t("card.temperatureTrend")}</div>
          </div>
        </div>
        ${i ? c`
                <fceeb-sauna-suite-temperature-trend
                  .samples=${this.historySamples}
                  .status=${e}
                  .targetValue=${t}
                  empty-label=${this.historyLoading ? this.t("card.trendLoading") : this.t("card.trendUnavailable")}
                ></fceeb-sauna-suite-temperature-trend>
              ` : c`<div class="trend-empty">${this.t("card.trendDirectModesOnly")}</div>`}
      </section>
    `;
  }
  renderPowerButton(e) {
    const t = this.switchPending || !nt(this.config.main_switch_entity) || U(e), i = (e == null ? void 0 : e.state) === "on", n = this.switchPending ? this.t("card.pending") : i ? this.t("card.powerOn") : this.t("card.powerOff");
    return c`
      <button
        class=${`power-button ${i ? "on" : "off"}`}
        type="button"
        ?disabled=${t}
        aria-label=${this.t("card.togglePower")}
        @click=${this.handlePowerClick}
      >
        <span class="power-icon" aria-hidden="true">${this.renderPowerIcon()}</span>
        <span>${n}</span>
      </button>
    `;
  }
  renderTargetControl(e) {
    const t = He(e), i = this.getEntityNumber(e), n = this.getTemperatureParts(
      i,
      this.getTemperatureUnit(this.config.target_temperature_entity)
    ), s = this.targetPending || !st(this.config.target_temperature_entity) || U(e) || i === void 0;
    return c`
      <section class="target-control" aria-label=${this.t("card.targetTemperature")}>
        <div class="target-header">
          <div>
            <div class="label">${this.t("card.targetTemperature")}</div>
            <div class=${`target-current ${n.unavailable ? "unavailable" : ""}`}>
              <span>${n.value}</span>
              <small>${n.unit}</small>
            </div>
          </div>
          <div class="target-actions">
            <button
              class="step-button"
              type="button"
              ?disabled=${s}
              aria-label=${this.t("card.decreaseTarget")}
              @click=${() => this.adjustTargetTemperature(-1)}
            >
              -
            </button>
            <button
              class="step-button"
              type="button"
              ?disabled=${s}
              aria-label=${this.t("card.increaseTarget")}
              @click=${() => this.adjustTargetTemperature(1)}
            >
              +
            </button>
          </div>
        </div>
        ${t && i !== void 0 ? c`
                <input
                  type="range"
                  min=${t.minimum}
                  max=${t.maximum}
                  step=${t.step}
                  .value=${String(i)}
                  ?disabled=${s}
                  aria-label=${this.t("card.targetTemperature")}
                  @input=${(a) => this.handleTargetSliderInput(a, t)}
                />
              ` : c`<div class="status-line">${this.t("card.sliderUnavailable")}</div>`}
        ${this.targetPending ? c`<div class="status-line">${this.t("card.pending")}</div>` : void 0}
      </section>
    `;
  }
  renderHeatIcon() {
    return V`
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M8 20c-1.5-1.1-2.3-2.5-2.3-4.2 0-1.8.9-3.2 2.6-4.4 1.3-.9 2-2.1 2-3.4 0-1-.3-2-.9-3 2.3.9 3.8 2.7 3.8 5.1 0 1-.2 1.8-.6 2.6.9-.5 1.6-1.2 2.1-2.2 2.1 1.4 3.2 3.2 3.2 5.3 0 1.7-.8 3.1-2.3 4.2" />
        <path d="M9.5 20c-.6-.7-.9-1.5-.9-2.4 0-1.2.6-2.2 1.7-3 .9-.6 1.4-1.4 1.4-2.4 1.5 1 2.2 2.2 2.2 3.7 0 .6-.1 1.1-.4 1.6.5-.2.9-.6 1.3-1.1.7.7 1.1 1.5 1.1 2.4 0 .4-.1.8-.3 1.2" />
      </svg>
    `;
  }
  renderPowerIcon() {
    return V`
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M12 3v8" />
        <path d="M7.1 6.8a7 7 0 1 0 9.8 0" />
      </svg>
    `;
  }
  async handlePowerClick() {
    const e = z(this.hass, this.config.main_switch_entity);
    if (this.switchPending || U(e))
      return;
    const t = (e == null ? void 0 : e.state) !== "on";
    if (t && this.config.confirm_switch_on && !window.confirm(this.t("card.confirmSwitchOn")))
      return;
    this.switchPending = !0, this.serviceError = void 0;
    const i = await jt(this.hass, this.config.main_switch_entity, t);
    this.switchPending = !1, this.serviceError = i.ok ? void 0 : i.error;
  }
  adjustTargetTemperature(e) {
    const t = z(this.hass, this.config.target_temperature_entity), i = He(t), n = this.getEntityNumber(t);
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
    const i = await It(
      this.hass,
      this.config.target_temperature_entity,
      e,
      t
    );
    this.targetPending = !1, this.serviceError = i.ok ? void 0 : i.error;
  }
  scheduleHistoryRefresh() {
    if (!this.config.show_temperature_trend || !this.hass || !Oe(this.config.control_temperature_mode)) {
      this.clearHistorySamples(), this.lastHistoryFetchKey = void 0, this.clearHistoryTimer();
      return;
    }
    const e = Ue(this.config), t = `${e ?? ""}:${this.config.trend_history_minutes}:${this.config.trend_refresh_minutes}`;
    if (!e) {
      this.clearHistorySamples(), this.lastHistoryFetchKey = void 0, this.clearHistoryTimer();
      return;
    }
    this.lastHistoryFetchKey === t && this.historyRefreshTimer !== void 0 || (this.lastHistoryFetchKey !== void 0 && this.lastHistoryFetchKey !== t && this.clearHistoryTimer(), this.historyRefreshTimer === void 0 && (this.historyRefreshTimer = window.setInterval(() => {
      this.loadHistory(e);
    }, this.config.trend_refresh_minutes * 6e4)), this.lastHistoryFetchKey !== t && (this.lastHistoryFetchKey = t, this.loadHistory(e)));
  }
  async loadHistory(e) {
    this.historyLoading = !0, this.historySamples = await ir(
      this.hass,
      e,
      this.config.trend_history_minutes
    ), this.historyLoading = !1;
  }
  resetHistorySchedule() {
    this.lastHistoryFetchKey = void 0, this.clearHistoryTimer();
  }
  clearHistorySamples() {
    this.historySamples.length > 0 && (this.historySamples = []);
  }
  clearHistoryTimer() {
    this.historyRefreshTimer !== void 0 && (window.clearInterval(this.historyRefreshTimer), this.historyRefreshTimer = void 0);
  }
  clearTargetDebounceTimer() {
    this.targetDebounceTimer !== void 0 && (window.clearTimeout(this.targetDebounceTimer), this.targetDebounceTimer = void 0);
  }
  getControlTemperatureUnit() {
    return this.getTemperatureUnit(Ue(this.config));
  }
  getSwitchStateLabel(e) {
    return U(e) ? this.t("card.powerUnavailable") : (e == null ? void 0 : e.state) === "on" ? this.t("card.powerOn") : this.t("card.powerOff");
  }
  getEntityNumber(e) {
    if (!e || U(e))
      return;
    const t = Number(e.state);
    return Number.isFinite(t) ? t : void 0;
  }
  getTemperatureUnit(e) {
    var i;
    const t = (i = z(this.hass, e)) == null ? void 0 : i.attributes.unit_of_measurement;
    return typeof t == "string" && t.trim().length > 0 ? t : Fe;
  }
  getTemperatureParts(e, t, i = !1) {
    return {
      value: e === void 0 ? Le : e.toFixed(1),
      unit: e === void 0 ? "" : t,
      unavailable: e === void 0
    };
  }
  formatTemperatureDelta(e) {
    return `${e > 0 ? "+" : ""}${e.toFixed(1)} ${Fe}`;
  }
  t(e) {
    var t, i;
    return lt(((t = this.hass) == null ? void 0 : t.selectedLanguage) ?? ((i = this.hass) == null ? void 0 : i.language), e);
  }
};
_e.styles = lr;
let g = _e;
S([
  x({ attribute: !1 })
], g.prototype, "hass");
S([
  A()
], g.prototype, "config");
S([
  A()
], g.prototype, "switchPending");
S([
  A()
], g.prototype, "targetPending");
S([
  A()
], g.prototype, "serviceError");
S([
  A()
], g.prototype, "historySamples");
S([
  A()
], g.prototype, "historyLoading");
ge(customElements, Ut, g);
const yr = je`
  :host {
    display: block;
  }

  .form {
    display: grid;
    gap: 14px;
  }

  .section {
    background: color-mix(in srgb, var(--primary-text-color) 4%, transparent);
    border-radius: 14px;
    padding: 10px 12px 12px;
  }

  summary {
    color: var(--primary-text-color);
    cursor: pointer;
    font-size: 14px;
    font-weight: 750;
    line-height: 1.3;
    margin-bottom: 8px;
  }

  summary:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 3px;
  }
`;
var Tr = Object.defineProperty, ut = (r, e, t, i) => {
  for (var n = void 0, s = r.length - 1, a; s >= 0; s--)
    (a = r[s]) && (n = a(e, t, n) || n);
  return n && Tr(e, t, n), n;
};
const ve = class ve extends w {
  constructor() {
    super(...arguments), this.config = C({}), this.computeLabel = (e) => e.label, this.computeHelper = (e) => e.description;
  }
  setConfig(e) {
    this.config = C(e);
  }
  render() {
    return c`
      <div class="form">
        ${this.sections.map(
      (e) => c`
            <details class="section" open>
              <summary>${this.t(e.titleKey)}</summary>
              <ha-form
                .hass=${this.hass}
                .data=${this.config}
                .schema=${e.schema}
                .computeLabel=${this.computeLabel}
                .computeHelper=${this.computeHelper}
                @value-changed=${this.handleValueChanged}
              ></ha-form>
            </details>
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
            options: et.map((i) => ({
              value: i,
              label: this.t(`modes.${i}`)
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
    this.config.control_temperature_mode === "weighted_average" && e.push(
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
    );
    const t = [
      this.booleanField(
        "show_temperature_trend",
        "editor.showTemperatureTrend",
        "editor.showTemperatureTrendDescription"
      )
    ];
    return this.config.show_temperature_trend && t.push(
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
        schema: t
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
    this.config = C({
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
  numberField(e, t, i, n, s, a) {
    return {
      name: e,
      label: this.t(t),
      description: this.t(i),
      selector: {
        number: {
          min: n,
          max: s,
          mode: "box",
          step: a
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
    return lt(((t = this.hass) == null ? void 0 : t.selectedLanguage) ?? ((i = this.hass) == null ? void 0 : i.language), e);
  }
};
ve.styles = yr;
let I = ve;
ut([
  x({ attribute: !1 })
], I.prototype, "hass");
ut([
  A()
], I.prototype, "config");
ge(customElements, Xe, I);
const Ve = {
  type: Ot,
  name: "Sauna Suite",
  description: "A Home Assistant dashboard card for sauna monitoring and manual controls.",
  preview: !0
};
function $r(r = window) {
  r.customCards = r.customCards ?? [], r.customCards.some((t) => t.type === Ve.type) || r.customCards.push(Ve);
}
$r();
export {
  Ot as CARD_PICKER_TYPE,
  Ut as CARD_TAG,
  Qe as CARD_TYPE,
  Xe as EDITOR_TAG,
  kt as TEMPERATURE_TREND_TAG
};
//# sourceMappingURL=sauna-suite.js.map
