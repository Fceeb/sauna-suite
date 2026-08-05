/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, ue = I.ShadowRoot && (I.ShadyCSS === void 0 || I.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, de = Symbol(), _e = /* @__PURE__ */ new WeakMap();
let Ue = class {
  constructor(e, r, i) {
    if (this._$cssResult$ = !0, i !== de) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = r;
  }
  get styleSheet() {
    let e = this.o;
    const r = this.t;
    if (ue && e === void 0) {
      const i = r !== void 0 && r.length === 1;
      i && (e = _e.get(r)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && _e.set(r, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Xe = (t) => new Ue(typeof t == "string" ? t : t + "", void 0, de), ze = (t, ...e) => {
  const r = t.length === 1 ? t[0] : e.reduce((i, n, s) => i + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[s + 1], t[0]);
  return new Ue(r, t, de);
}, et = (t, e) => {
  if (ue) t.adoptedStyleSheets = e.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of e) {
    const i = document.createElement("style"), n = I.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = r.cssText, t.appendChild(i);
  }
}, be = ue ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let r = "";
  for (const i of e.cssRules) r += i.cssText;
  return Xe(r);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: tt, defineProperty: rt, getOwnPropertyDescriptor: it, getOwnPropertyNames: nt, getOwnPropertySymbols: st, getPrototypeOf: ot } = Object, b = globalThis, ve = b.trustedTypes, at = ve ? ve.emptyScript : "", Y = b.reactiveElementPolyfillSupport, H = (t, e) => t, W = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? at : null;
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
} }, ce = (t, e) => !tt(t, e), ye = { attribute: !0, type: String, converter: W, reflect: !1, useDefault: !1, hasChanged: ce };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), b.litPropertyMetadata ?? (b.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let A = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, r = ye) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(e, r), !r.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(e, i, r);
      n !== void 0 && rt(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, r, i) {
    const { get: n, set: s } = it(this.prototype, e) ?? { get() {
      return this[r];
    }, set(o) {
      this[r] = o;
    } };
    return { get: n, set(o) {
      const l = n == null ? void 0 : n.call(this);
      s == null || s.call(this, o), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ye;
  }
  static _$Ei() {
    if (this.hasOwnProperty(H("elementProperties"))) return;
    const e = ot(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(H("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(H("properties"))) {
      const r = this.properties, i = [...nt(r), ...st(r)];
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
      for (const n of i) r.unshift(be(n));
    } else e !== void 0 && r.push(be(e));
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
    return et(e, this.constructor.elementStyles), e;
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
      const o = (((s = i.converter) == null ? void 0 : s.toAttribute) !== void 0 ? i.converter : W).toAttribute(r, i.type);
      this._$Em = e, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(e, r) {
    var s, o;
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const l = i.getPropertyOptions(n), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((s = l.converter) == null ? void 0 : s.fromAttribute) !== void 0 ? l.converter : W;
      this._$Em = n;
      const d = a.fromAttribute(r, l.type);
      this[n] = d ?? ((o = this._$Ej) == null ? void 0 : o.get(n)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, r, i, n = !1, s) {
    var o;
    if (e !== void 0) {
      const l = this.constructor;
      if (n === !1 && (s = this[e]), i ?? (i = l.getPropertyOptions(e)), !((i.hasChanged ?? ce)(s, r) || i.useDefault && i.reflect && s === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(l._$Eu(e, i)))) return;
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
        const { wrapped: l } = o, a = this[s];
        l !== !0 || this._$AL.has(s) || a === void 0 || this.C(s, void 0, o, a);
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
A.elementStyles = [], A.shadowRootOptions = { mode: "open" }, A[H("elementProperties")] = /* @__PURE__ */ new Map(), A[H("finalized")] = /* @__PURE__ */ new Map(), Y == null || Y({ ReactiveElement: A }), (b.reactiveElementVersions ?? (b.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const U = globalThis, Te = (t) => t, K = U.trustedTypes, we = K ? K.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Fe = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, Le = "?" + _, lt = `<${Le}>`, E = document, z = () => E.createComment(""), F = (t) => t === null || typeof t != "object" && typeof t != "function", he = Array.isArray, ut = (t) => he(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", Q = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $e = /-->/g, Ee = />/g, y = RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Se = /'/g, Ae = /"/g, ke = /^(?:script|style|textarea|title)$/i, Be = (t) => (e, ...r) => ({ _$litType$: t, strings: e, values: r }), p = Be(1), xe = Be(2), D = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), De = /* @__PURE__ */ new WeakMap(), T = E.createTreeWalker(E, 129);
function Ze(t, e) {
  if (!he(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return we !== void 0 ? we.createHTML(e) : e;
}
const dt = (t, e) => {
  const r = t.length - 1, i = [];
  let n, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = O;
  for (let l = 0; l < r; l++) {
    const a = t[l];
    let d, c, u = -1, g = 0;
    for (; g < a.length && (o.lastIndex = g, c = o.exec(a), c !== null); ) g = o.lastIndex, o === O ? c[1] === "!--" ? o = $e : c[1] !== void 0 ? o = Ee : c[2] !== void 0 ? (ke.test(c[2]) && (n = RegExp("</" + c[2], "g")), o = y) : c[3] !== void 0 && (o = y) : o === y ? c[0] === ">" ? (o = n ?? O, u = -1) : c[1] === void 0 ? u = -2 : (u = o.lastIndex - c[2].length, d = c[1], o = c[3] === void 0 ? y : c[3] === '"' ? Ae : Se) : o === Ae || o === Se ? o = y : o === $e || o === Ee ? o = O : (o = y, n = void 0);
    const f = o === y && t[l + 1].startsWith("/>") ? " " : "";
    s += o === O ? a + lt : u >= 0 ? (i.push(d), a.slice(0, u) + Fe + a.slice(u) + _ + f) : a + _ + (u === -2 ? l : f);
  }
  return [Ze(t, s + (t[r] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class L {
  constructor({ strings: e, _$litType$: r }, i) {
    let n;
    this.parts = [];
    let s = 0, o = 0;
    const l = e.length - 1, a = this.parts, [d, c] = dt(e, r);
    if (this.el = L.createElement(d, i), T.currentNode = this.el.content, r === 2 || r === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (n = T.nextNode()) !== null && a.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const u of n.getAttributeNames()) if (u.endsWith(Fe)) {
          const g = c[o++], f = n.getAttribute(u).split(_), V = /([.?@])?(.*)/.exec(g);
          a.push({ type: 1, index: s, name: V[2], strings: f, ctor: V[1] === "." ? ht : V[1] === "?" ? pt : V[1] === "@" ? mt : q }), n.removeAttribute(u);
        } else u.startsWith(_) && (a.push({ type: 6, index: s }), n.removeAttribute(u));
        if (ke.test(n.tagName)) {
          const u = n.textContent.split(_), g = u.length - 1;
          if (g > 0) {
            n.textContent = K ? K.emptyScript : "";
            for (let f = 0; f < g; f++) n.append(u[f], z()), T.nextNode(), a.push({ type: 2, index: ++s });
            n.append(u[g], z());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Le) a.push({ type: 2, index: s });
      else {
        let u = -1;
        for (; (u = n.data.indexOf(_, u + 1)) !== -1; ) a.push({ type: 7, index: s }), u += _.length - 1;
      }
      s++;
    }
  }
  static createElement(e, r) {
    const i = E.createElement("template");
    return i.innerHTML = e, i;
  }
}
function M(t, e, r = t, i) {
  var o, l;
  if (e === D) return e;
  let n = i !== void 0 ? (o = r._$Co) == null ? void 0 : o[i] : r._$Cl;
  const s = F(e) ? void 0 : e._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== s && ((l = n == null ? void 0 : n._$AO) == null || l.call(n, !1), s === void 0 ? n = void 0 : (n = new s(t), n._$AT(t, r, i)), i !== void 0 ? (r._$Co ?? (r._$Co = []))[i] = n : r._$Cl = n), n !== void 0 && (e = M(t, n._$AS(t, e.values), n, i)), e;
}
class ct {
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
    T.currentNode = n;
    let s = T.nextNode(), o = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let d;
        a.type === 2 ? d = new Z(s, s.nextSibling, this, e) : a.type === 1 ? d = new a.ctor(s, a.name, a.strings, this, e) : a.type === 6 && (d = new gt(s, this, e)), this._$AV.push(d), a = i[++l];
      }
      o !== (a == null ? void 0 : a.index) && (s = T.nextNode(), o++);
    }
    return T.currentNode = E, n;
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
    e = M(this, e, r), F(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== D && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ut(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== h && F(this._$AH) ? this._$AA.nextSibling.data = e : this.T(E.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var s;
    const { values: r, _$litType$: i } = e, n = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = L.createElement(Ze(i.h, i.h[0]), this.options)), i);
    if (((s = this._$AH) == null ? void 0 : s._$AD) === n) this._$AH.p(r);
    else {
      const o = new ct(n, this), l = o.u(this.options);
      o.p(r), this.T(l), this._$AH = o;
    }
  }
  _$AC(e) {
    let r = De.get(e.strings);
    return r === void 0 && De.set(e.strings, r = new L(e)), r;
  }
  k(e) {
    he(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let i, n = 0;
    for (const s of e) n === r.length ? r.push(i = new Z(this.O(z()), this.O(z()), this, this.options)) : i = r[n], i._$AI(s), n++;
    n < r.length && (this._$AR(i && i._$AB.nextSibling, n), r.length = n);
  }
  _$AR(e = this._$AA.nextSibling, r) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, r); e !== this._$AB; ) {
      const n = Te(e).nextSibling;
      Te(e).remove(), e = n;
    }
  }
  setConnected(e) {
    var r;
    this._$AM === void 0 && (this._$Cv = e, (r = this._$AP) == null || r.call(this, e));
  }
}
class q {
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
    if (s === void 0) e = M(this, e, r, 0), o = !F(e) || e !== this._$AH && e !== D, o && (this._$AH = e);
    else {
      const l = e;
      let a, d;
      for (e = s[0], a = 0; a < s.length - 1; a++) d = M(this, l[i + a], r, a), d === D && (d = this._$AH[a]), o || (o = !F(d) || d !== this._$AH[a]), d === h ? e = h : e !== h && (e += (d ?? "") + s[a + 1]), this._$AH[a] = d;
    }
    o && !n && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ht extends q {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
class pt extends q {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== h);
  }
}
class mt extends q {
  constructor(e, r, i, n, s) {
    super(e, r, i, n, s), this.type = 5;
  }
  _$AI(e, r = this) {
    if ((e = M(this, e, r, 0) ?? h) === D) return;
    const i = this._$AH, n = e === h && i !== h || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, s = e !== h && (i === h || n);
    n && this.element.removeEventListener(this.name, this, i), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class gt {
  constructor(e, r, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    M(this, e);
  }
}
const X = U.litHtmlPolyfillSupport;
X == null || X(L, Z), (U.litHtmlVersions ?? (U.litHtmlVersions = [])).push("3.3.3");
const ft = (t, e, r) => {
  const i = (r == null ? void 0 : r.renderBefore) ?? e;
  let n = i._$litPart$;
  if (n === void 0) {
    const s = (r == null ? void 0 : r.renderBefore) ?? null;
    i._$litPart$ = n = new Z(e.insertBefore(z(), s), s, void 0, r ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const w = globalThis;
class $ extends A {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ft(r, this.renderRoot, this.renderOptions);
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
    return D;
  }
}
var He;
$._$litElement$ = !0, $.finalized = !0, (He = w.litElementHydrateSupport) == null || He.call(w, { LitElement: $ });
const ee = w.litElementPolyfillSupport;
ee == null || ee({ LitElement: $ });
(w.litElementVersions ?? (w.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pe = (t) => (e, r) => {
  r !== void 0 ? r.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _t = { attribute: !0, type: String, converter: W, reflect: !1, hasChanged: ce }, bt = (t = _t, e, r) => {
  const { kind: i, metadata: n } = r;
  let s = globalThis.litPropertyMetadata.get(n);
  if (s === void 0 && globalThis.litPropertyMetadata.set(n, s = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), s.set(r.name, t), i === "accessor") {
    const { name: o } = r;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(o, a, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, t, l), l;
    } };
  }
  if (i === "setter") {
    const { name: o } = r;
    return function(l) {
      const a = this[o];
      e.call(this, l), this.requestUpdate(o, a, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function P(t) {
  return (e, r) => typeof r == "object" ? bt(t, e, r) : ((i, n, s) => {
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
  return P({ ...t, state: !0, attribute: !1 });
}
const te = {
  nearTargetThreshold: 5,
  targetReachedTolerance: 2,
  aboveTargetThreshold: 2
}, vt = {
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
function Ve(t, e) {
  if (!(t === void 0 || e === void 0))
    return t - e;
}
function yt(t) {
  const e = re(
    t.nearTargetThreshold,
    te.nearTargetThreshold
  ), r = re(
    t.targetReachedTolerance,
    te.targetReachedTolerance
  );
  return {
    nearTargetThreshold: e,
    targetReachedTolerance: r,
    aboveTargetThreshold: Math.max(
      r,
      re(
        t.aboveTargetThreshold,
        te.aboveTargetThreshold
      )
    )
  };
}
function Tt(t, e, r) {
  const i = Ve(t, e);
  if (i === void 0)
    return "unavailable";
  const n = yt(r);
  return i < -20 ? "far_below" : i <= -n.nearTargetThreshold ? "heating" : i < 0 ? "near_target" : i <= n.aboveTargetThreshold ? "target_reached" : "above_target";
}
function wt(t, e) {
  return t === void 0 || e === void 0 || e <= 0 ? 0 : Math.min(Math.max(t / e, 0), 1);
}
function $t(t, e, r) {
  return {
    difference: Ve(t, e),
    progress: wt(t, e),
    status: Tt(t, e, r)
  };
}
function je(t) {
  return vt[t];
}
function re(t, e) {
  return t === void 0 || !Number.isFinite(t) ? e : Math.max(0, t);
}
var Et = Object.defineProperty, St = Object.getOwnPropertyDescriptor, J = (t, e, r, i) => {
  for (var n = i > 1 ? void 0 : i ? St(e, r) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, r, n) : o(n)) || n);
  return i && n && Et(e, r, n), n;
};
const At = "sauna-suite-temperature-trend";
let k = class extends $ {
  constructor() {
    super(...arguments), this.samples = [], this.status = "unavailable", this.emptyLabel = "No trend data available";
  }
  createRenderRoot() {
    return this;
  }
  render() {
    if (this.samples.length < 2)
      return p`<div class="trend-empty">${this.emptyLabel}</div>`;
    const t = je(this.status), e = this.createLinePath(), r = this.createAreaPath(e);
    return p`
      <svg class="trend" viewBox="0 0 240 80" role="img" aria-label=${this.emptyLabel}>
        <defs>
          <linearGradient id="sauna-suite-trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color=${t.line} stop-opacity="0.28"></stop>
            <stop offset="100%" stop-color=${t.line} stop-opacity="0.02"></stop>
          </linearGradient>
        </defs>
        ${xe`<path d=${r} fill="url(#sauna-suite-trend-fill)"></path>`}
        ${xe`<path d=${e} fill="none" stroke=${t.line} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`}
      </svg>
    `;
  }
  createLinePath() {
    const i = this.samples.map((a) => a.value), n = Math.min(...i), o = Math.max(...i) - n || 1, l = 224 / (this.samples.length - 1);
    return this.samples.map((a, d) => {
      const c = 8 + d * l, u = 72 - (a.value - n) / o * 64;
      return `${d === 0 ? "M" : "L"} ${c.toFixed(1)} ${u.toFixed(1)}`;
    }).join(" ");
  }
  createAreaPath(t) {
    return `${t} L 232 76 L 8 76 Z`;
  }
};
J([
  P({ attribute: !1 })
], k.prototype, "samples", 2);
J([
  P()
], k.prototype, "status", 2);
J([
  P({ attribute: "empty-label" })
], k.prototype, "emptyLabel", 2);
k = J([
  pe(At)
], k);
const me = "custom:sauna-suite-card", xt = "sauna-suite-card", Ge = "sauna-suite-editor", Ie = [
  "top",
  "middle",
  "bottom",
  "average",
  "weighted_average",
  "minimum",
  "maximum"
];
function le(t, e, r) {
  if (ie(t, "value"), ie(e, "minimum"), ie(r, "maximum"), e > r)
    throw new RangeError("minimum must be less than or equal to maximum");
  return Math.min(Math.max(t, e), r);
}
function ie(t, e) {
  if (!Number.isFinite(t))
    throw new RangeError(`${e} must be a finite number`);
}
const ne = 1, Dt = 5, Mt = 2, Ct = 2, Pt = 120, Ot = 5;
function We() {
  return {
    type: me,
    name: "Sauna Suite",
    control_temperature_mode: "average",
    weight_top: ne,
    weight_middle: ne,
    weight_bottom: ne,
    show_outside_temperature: !1,
    show_temperature_zones: !0,
    near_target_threshold: Dt,
    target_reached_tolerance: Mt,
    above_target_threshold: Ct,
    show_temperature_trend: !0,
    trend_history_minutes: Pt,
    trend_refresh_minutes: Ot,
    confirm_switch_on: !0
  };
}
function x(t) {
  const e = We(), r = oe(
    t.target_reached_tolerance,
    e.target_reached_tolerance
  );
  return {
    ...e,
    ...t,
    type: me,
    control_temperature_mode: Rt(t.control_temperature_mode),
    weight_top: se(t.weight_top, e.weight_top),
    weight_middle: se(t.weight_middle, e.weight_middle),
    weight_bottom: se(t.weight_bottom, e.weight_bottom),
    show_outside_temperature: j(
      t.show_outside_temperature,
      e.show_outside_temperature
    ),
    show_temperature_zones: j(
      t.show_temperature_zones,
      e.show_temperature_zones
    ),
    near_target_threshold: oe(
      t.near_target_threshold,
      e.near_target_threshold
    ),
    target_reached_tolerance: r,
    above_target_threshold: Math.max(
      r,
      oe(t.above_target_threshold, e.above_target_threshold)
    ),
    show_temperature_trend: j(
      t.show_temperature_trend,
      e.show_temperature_trend
    ),
    trend_history_minutes: Me(
      t.trend_history_minutes,
      e.trend_history_minutes,
      15,
      1440
    ),
    trend_refresh_minutes: Me(
      t.trend_refresh_minutes,
      e.trend_refresh_minutes,
      1,
      60
    ),
    confirm_switch_on: j(t.confirm_switch_on, e.confirm_switch_on)
  };
}
function Rt(t) {
  return typeof t == "string" && Ie.includes(t) ? t : We().control_temperature_mode;
}
function se(t, e) {
  return typeof t != "number" || !Number.isFinite(t) ? e : Math.max(0, t);
}
function j(t, e) {
  return typeof t == "boolean" ? t : e;
}
function oe(t, e) {
  return typeof t != "number" || !Number.isFinite(t) ? e : Math.max(0, t);
}
function Me(t, e, r, i) {
  return typeof t != "number" || !Number.isFinite(t) ? e : le(t, r, i);
}
function Ke(t) {
  return C(t) === "switch" || C(t) === "input_boolean";
}
function qe(t) {
  return C(t) === "number" || C(t) === "input_number";
}
function R(t) {
  return !t || t.state === "unavailable" || t.state === "unknown";
}
async function Nt(t, e, r) {
  if (!(t != null && t.callService))
    return { ok: !1, error: "Home Assistant service API is unavailable." };
  if (!Ke(e))
    return { ok: !1, error: "Unsupported switch entity domain." };
  const i = C(e), n = r ? "turn_on" : "turn_off";
  try {
    return await t.callService(i, n, { entity_id: e }), { ok: !0 };
  } catch (s) {
    return {
      ok: !1,
      error: s instanceof Error ? s.message : "Failed to update switch entity."
    };
  }
}
async function Ht(t, e, r, i) {
  if (!(t != null && t.callService))
    return { ok: !1, error: "Home Assistant service API is unavailable." };
  if (!qe(e))
    return { ok: !1, error: "Unsupported target temperature entity domain." };
  const n = C(e), s = Ut(r, i);
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
function Ce(t) {
  if (!t)
    return;
  const e = ae(t, "min"), r = ae(t, "max"), i = ae(t, "step");
  if (!(e === void 0 || r === void 0 || i === void 0 || i <= 0))
    return {
      minimum: e,
      maximum: r,
      step: i
    };
}
function Ut(t, e) {
  const r = le(t, e.minimum, e.maximum), i = Math.round((r - e.minimum) / e.step), n = e.minimum + i * e.step, s = zt(e.step);
  return Number(le(n, e.minimum, e.maximum).toFixed(s));
}
function C(t) {
  return (t == null ? void 0 : t.split(".")[0]) ?? "";
}
function ae(t, e) {
  const r = t.attributes[e], i = typeof r == "number" ? r : Number(r);
  return Number.isFinite(i) ? i : void 0;
}
function zt(t) {
  const [, e = ""] = t.toString().split(".");
  return e.length;
}
const Ft = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function Je(t) {
  if (t === void 0)
    return;
  if (typeof t == "number")
    return Number.isFinite(t) ? t : void 0;
  const e = t.trim().toLowerCase();
  if (Ft.has(e))
    return;
  const r = Number(t);
  return Number.isFinite(r) ? r : void 0;
}
function Lt(t) {
  const e = t.filter(Number.isFinite);
  return e.length === 0 ? void 0 : e.reduce((i, n) => i + n, 0) / e.length;
}
function kt(t, e) {
  const r = Ye(t).map((s) => ({
    value: t[s],
    weight: It(e[s])
  })).filter((s) => s.value !== void 0), i = r.reduce((s, o) => s + o.weight, 0);
  return r.length === 0 || i <= 0 ? void 0 : r.reduce((s, o) => s + o.value * o.weight, 0) / i;
}
function Bt(t) {
  const e = ge(t);
  return e.length > 0 ? Math.min(...e) : void 0;
}
function Zt(t) {
  const e = ge(t);
  return e.length > 0 ? Math.max(...e) : void 0;
}
function Vt(t, e, r) {
  switch (e) {
    case "top":
      return t.top;
    case "middle":
      return t.middle;
    case "bottom":
      return t.bottom;
    case "average":
      return Lt(ge(t));
    case "weighted_average":
      return kt(t, r);
    case "minimum":
      return Bt(t);
    case "maximum":
      return Zt(t);
  }
}
function jt(t) {
  if (!(t.top === void 0 || t.bottom === void 0))
    return t.top - t.bottom;
}
function Gt(t, e, r) {
  return {
    controlTemperature: Vt(t, e, r),
    stratification: jt(t)
  };
}
function ge(t) {
  return Ye(t).map((e) => t[e]).filter((e) => e !== void 0);
}
function Ye(t) {
  return ["top", "middle", "bottom"].filter((r) => t[r] !== void 0);
}
function It(t) {
  return Number.isFinite(t) ? Math.max(0, t) : 0;
}
async function Wt(t, e, r, i = 120) {
  if (!(t != null && t.callApi) || !e)
    return [];
  const n = /* @__PURE__ */ new Date(), s = new Date(n.getTime() - r * 6e4), o = new URLSearchParams({
    filter_entity_id: e,
    end_time: n.toISOString(),
    minimal_response: "1",
    no_attributes: "1"
  });
  try {
    const l = await t.callApi(
      "GET",
      `history/period/${s.toISOString()}?${o.toString()}`
    );
    return qt(Kt(l), i);
  } catch {
    return [];
  }
}
function Kt(t) {
  return t.flat().map((e) => {
    const r = Je(e.state), i = e.last_changed ?? e.last_updated, n = i ? Date.parse(i) : Number.NaN;
    if (!(r === void 0 || !Number.isFinite(n)))
      return {
        timestamp: n,
        value: r
      };
  }).filter((e) => e !== void 0);
}
function qt(t, e) {
  if (t.length <= e)
    return [...t];
  const r = Math.ceil(t.length / e);
  return t.filter((i, n) => n % r === 0).slice(0, e);
}
function Pe(t, e) {
  const r = {
    top: N(t, e.temperature_top_entity),
    middle: N(t, e.temperature_middle_entity),
    bottom: N(t, e.temperature_bottom_entity)
  }, i = {
    top: e.weight_top,
    middle: e.weight_middle,
    bottom: e.weight_bottom
  };
  return {
    zones: r,
    outsideTemperature: N(t, e.outside_temperature_entity),
    targetTemperature: N(t, e.target_temperature_entity),
    summary: Gt(r, e.control_temperature_mode, i)
  };
}
function N(t, e) {
  var r;
  if (!(!t || !e))
    return Je((r = t.states[e]) == null ? void 0 : r.state);
}
function G(t, e) {
  if (!(!t || !e))
    return t.states[e];
}
const Jt = ze`
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
`, Yt = { bottomTemperature: "Unten", confirmSwitchOn: "Sauna-Entitaet manuell einschalten?", controlTemperature: "Regeltemperatur", decreaseTarget: "Zieltemperatur verringern", earlyDevelopment: "Fruehe Entwicklung", increaseTarget: "Zieltemperatur erhoehen", middleTemperature: "Mitte", name: "Sauna Suite", notAvailable: "Nicht verfuegbar", outsideTemperature: "Aussen", pending: "Aktualisiere...", placeholder: "Nur manuelle Bedienung und Monitoring. Es ist keine automatische Heizungsregelung implementiert.", powerOff: "Aus", powerOn: "Ein", powerUnavailable: "Nicht verfuegbar", sliderUnavailable: "Slider nicht verfuegbar, weil min, max oder step fehlen.", stratification: "Temperaturschichtung", targetDifference: "Differenz zum Ziel", targetTemperature: "Ziel", temperatureTrend: "Temperaturverlauf", temperatureZones: "Temperaturzonen", togglePower: "Sauna-Power-Entitaet umschalten", topTemperature: "Oben", trendLoading: "Verlaufsdaten werden geladen", trendUnavailable: "Keine Verlaufsdaten verfuegbar" }, Qt = { aboveTargetThreshold: "Schwelle ueber Ziel", aboveTargetThresholdDescription: "Grad ueber Zieltemperatur, ab denen der Status als ueber Ziel gilt.", cardName: "Kartenname", cardNameDescription: "Titel im Kartenkopf.", confirmSwitchOn: "Einschalten bestaetigen", confirmSwitchOnDescription: "Vor dem manuellen Einschalten der konfigurierten Entitaet einen Dialog anzeigen.", controlTemperatureMode: "Modus fuer Regeltemperatur", controlTemperatureModeDescription: "Legt fest, welche Temperatur als zentrale Regeltemperatur angezeigt wird.", mainSwitchEntity: "Hauptschalter-Entitaet", mainSwitchEntityDescription: "Entitaet fuer den manuellen Power-Button. Unterstuetzt: switch und input_boolean.", nearTargetThreshold: "Nahe-Ziel-Schwelle", nearTargetThresholdDescription: "Grad unter Zieltemperatur, die als nahe am Ziel gelten.", outsideTemperatureEntity: "Aussentemperatur-Entitaet", outsideTemperatureEntityDescription: "Optionaler Aussentemperatur-Sensor.", sections: { display: "Anzeige", entities: "Entitaeten", general: "Allgemein", safety: "Sicherheit und Bestaetigung", temperatureCalculation: "Temperaturberechnung", trend: "Verlauf" }, showOutsideTemperature: "Aussentemperatur anzeigen", showOutsideTemperatureDescription: "Aussentemperatur anzeigen, wenn eine Entitaet konfiguriert ist.", showTemperatureTrend: "Temperaturverlauf anzeigen", showTemperatureTrendDescription: "Aktuelle Recorder-Historie fuer die ausgewaehlte Regeltemperatur laden.", showTemperatureZones: "Temperaturzonen anzeigen", showTemperatureZonesDescription: "Werte der Sensoren oben, Mitte und unten anzeigen.", targetReachedTolerance: "Ziel-erreicht-Toleranz", targetReachedToleranceDescription: "Grad ueber Zieltemperatur, die noch als Ziel erreicht gelten.", targetTemperatureEntity: "Zieltemperatur-Entitaet", targetTemperatureEntityDescription: "Entitaet fuer manuelle Zielwerte. Unterstuetzt: number und input_number.", temperatureBottomEntity: "Temperatur unten", temperatureBottomEntityDescription: "Temperatursensor unten in der Sauna.", temperatureMiddleEntity: "Temperatur Mitte", temperatureMiddleEntityDescription: "Temperatursensor in der Mitte der Sauna.", temperatureTopEntity: "Temperatur oben", temperatureTopEntityDescription: "Temperatursensor oben in der Sauna.", trendHistoryMinutes: "Verlauf in Minuten", trendHistoryMinutesDescription: "Zeitfenster aus dem Recorder. Erlaubt: 15 bis 1440 Minuten.", trendRefreshMinutes: "Aktualisierung in Minuten", trendRefreshMinutesDescription: "Intervall fuer die Verlaufsaktualisierung. Erlaubt: 1 bis 60 Minuten.", weightBottom: "Gewichtung unten", weightBottomDescription: "Gewichtung fuer den unteren Sensor beim gewichteten Durchschnitt.", weightMiddle: "Gewichtung Mitte", weightMiddleDescription: "Gewichtung fuer den mittleren Sensor beim gewichteten Durchschnitt.", weightTop: "Gewichtung oben", weightTopDescription: "Gewichtung fuer den oberen Sensor beim gewichteten Durchschnitt." }, Xt = { average: "Durchschnitt", bottom: "Unten", maximum: "Maximum", middle: "Mitte", minimum: "Minimum", top: "Oben", weighted_average: "Gewichteter Durchschnitt" }, er = { above_target: "Ueber Ziel", far_below: "Weit unter Ziel", heating: "Heizt", near_target: "Nahe am Ziel", target_reached: "Ziel erreicht", unavailable: "Temperatur nicht verfuegbar" }, tr = {
  card: Yt,
  editor: Qt,
  modes: Xt,
  status: er
}, rr = { bottomTemperature: "Bottom", confirmSwitchOn: "Switch the sauna entity on manually?", controlTemperature: "Control temperature", decreaseTarget: "Decrease target temperature", earlyDevelopment: "Early Development", increaseTarget: "Increase target temperature", middleTemperature: "Middle", name: "Sauna Suite", notAvailable: "Not available", outsideTemperature: "Outside", pending: "Updating...", placeholder: "Manual controls and monitoring only. No automatic heater regulation is implemented.", powerOff: "Off", powerOn: "On", powerUnavailable: "Unavailable", sliderUnavailable: "Slider unavailable because min, max or step is missing.", stratification: "Stratification", targetDifference: "Difference to target", targetTemperature: "Target", temperatureTrend: "Temperature trend", temperatureZones: "Temperature zones", togglePower: "Toggle sauna power entity", topTemperature: "Top", trendLoading: "Loading trend data", trendUnavailable: "No trend data available" }, ir = { aboveTargetThreshold: "Above-target threshold", aboveTargetThresholdDescription: "Degrees above target that should be treated as above target.", cardName: "Card name", cardNameDescription: "Title shown in the card header.", confirmSwitchOn: "Confirm before switching on", confirmSwitchOnDescription: "Require a confirmation dialog before the manual power button turns on the configured entity.", controlTemperatureMode: "Control temperature mode", controlTemperatureModeDescription: "Select which temperature is displayed as the main control temperature.", mainSwitchEntity: "Main switch entity", mainSwitchEntityDescription: "Manual power button entity. Supported domains: switch and input_boolean.", nearTargetThreshold: "Near-target threshold", nearTargetThresholdDescription: "Degrees below target that should be treated as near target.", outsideTemperatureEntity: "Outside temperature entity", outsideTemperatureEntityDescription: "Optional outside temperature sensor.", sections: { display: "Display", entities: "Entities", general: "General", safety: "Safety and confirmation", temperatureCalculation: "Temperature calculation", trend: "Trend" }, showOutsideTemperature: "Show outside temperature", showOutsideTemperatureDescription: "Display the outside temperature when an entity is configured.", showTemperatureTrend: "Show temperature trend", showTemperatureTrendDescription: "Load recent Recorder history for the selected control temperature.", showTemperatureZones: "Show temperature zones", showTemperatureZonesDescription: "Display top, middle and bottom sensor values.", targetReachedTolerance: "Target-reached tolerance", targetReachedToleranceDescription: "Degrees above target still considered target reached.", targetTemperatureEntity: "Target temperature entity", targetTemperatureEntityDescription: "Manual target setting entity. Supported domains: number and input_number.", temperatureBottomEntity: "Bottom temperature entity", temperatureBottomEntityDescription: "Bottom sauna temperature sensor.", temperatureMiddleEntity: "Middle temperature entity", temperatureMiddleEntityDescription: "Middle sauna temperature sensor.", temperatureTopEntity: "Top temperature entity", temperatureTopEntityDescription: "Top sauna temperature sensor.", trendHistoryMinutes: "Trend history minutes", trendHistoryMinutesDescription: "History window loaded from Recorder. Allowed range: 15 to 1440 minutes.", trendRefreshMinutes: "Trend refresh minutes", trendRefreshMinutesDescription: "How often the trend is refreshed. Allowed range: 1 to 60 minutes.", weightBottom: "Bottom weight", weightBottomDescription: "Weight for bottom sensor when weighted average is selected.", weightMiddle: "Middle weight", weightMiddleDescription: "Weight for middle sensor when weighted average is selected.", weightTop: "Top weight", weightTopDescription: "Weight for top sensor when weighted average is selected." }, nr = { average: "Average", bottom: "Bottom", maximum: "Maximum", middle: "Middle", minimum: "Minimum", top: "Top", weighted_average: "Weighted average" }, sr = { above_target: "Above target", far_below: "Far below target", heating: "Heating", near_target: "Near target", target_reached: "Target reached", unavailable: "Temperature unavailable" }, or = {
  card: rr,
  editor: ir,
  modes: nr,
  status: sr
}, Oe = {
  de: tr,
  en: or
};
function Qe(t, e) {
  const r = t != null && t.toLowerCase().startsWith("de") ? "de" : "en";
  return Re(Oe[r], e) ?? Re(Oe.en, e) ?? e;
}
function Re(t, e) {
  const r = e.split(".").reduce((i, n) => {
    if (!(typeof i != "object" || i === void 0))
      return i[n];
  }, t);
  return typeof r == "string" ? r : void 0;
}
var ar = Object.defineProperty, lr = Object.getOwnPropertyDescriptor, v = (t, e, r, i) => {
  for (var n = i > 1 ? void 0 : i ? lr(e, r) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, r, n) : o(n)) || n);
  return i && n && ar(e, r, n), n;
};
let m = class extends $ {
  constructor() {
    super(...arguments), this.config = x({}), this.switchPending = !1, this.targetPending = !1, this.historySamples = [], this.historyLoading = !1;
  }
  setConfig(t) {
    this.config = x(t), this.resetHistorySchedule();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.clearHistoryTimer(), this.clearTargetDebounceTimer();
  }
  getCardSize() {
    return 6;
  }
  static getConfigElement() {
    return document.createElement(Ge);
  }
  static getStubConfig() {
    return x({});
  }
  updated() {
    this.scheduleHistoryRefresh();
  }
  render() {
    const t = Pe(this.hass, this.config), e = $t(
      t.summary.controlTemperature,
      t.targetTemperature,
      {
        nearTargetThreshold: this.config.near_target_threshold,
        targetReachedTolerance: this.config.target_reached_tolerance,
        aboveTargetThreshold: this.config.above_target_threshold
      }
    ), r = je(e.status), i = G(this.hass, this.config.main_switch_entity), n = G(this.hass, this.config.target_temperature_entity);
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
                ${this.formatTemperature(t.summary.controlTemperature)}
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
                    ${this.renderMetric("card.topTemperature", t.zones.top)}
                    ${this.renderMetric("card.middleTemperature", t.zones.middle)}
                    ${this.renderMetric("card.bottomTemperature", t.zones.bottom)}
                  ` : void 0}
            ${this.config.show_outside_temperature && this.config.outside_temperature_entity ? this.renderMetric("card.outsideTemperature", t.outsideTemperature) : void 0}
            ${t.summary.stratification !== void 0 ? this.renderMetric("card.stratification", t.summary.stratification) : void 0}
          </section>

          ${this.config.show_temperature_trend ? p`
                  <section class="trend-panel" aria-label=${this.t("card.temperatureTrend")}>
                    <div class="label">${this.t("card.temperatureTrend")}</div>
                    <sauna-suite-temperature-trend
                      .samples=${this.historySamples}
                      .status=${e.status}
                      empty-label=${this.historyLoading ? this.t("card.trendLoading") : this.t("card.trendUnavailable")}
                    ></sauna-suite-temperature-trend>
                  </section>
                ` : void 0}
        </div>
      </ha-card>
    `;
  }
  renderPowerButton(t) {
    const e = this.switchPending || !Ke(this.config.main_switch_entity) || R(t), r = (t == null ? void 0 : t.state) === "on";
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
    const e = Ce(t), r = this.getEntityNumber(t), i = this.targetPending || !qe(this.config.target_temperature_entity) || R(t) || r === void 0;
    return p`
      <section class="target-control" aria-label=${this.t("card.targetTemperature")}>
        <div class="label">${this.t("card.targetTemperature")}</div>
        <div class=${this.valueClass(r)}>${this.formatTemperature(r)}</div>
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
  renderMetric(t, e) {
    return p`
      <div class="metric">
        <div class="label">${this.t(t)}</div>
        <div class=${this.valueClass(e)}>${this.formatTemperature(e)}</div>
      </div>
    `;
  }
  async handlePowerClick() {
    const t = G(this.hass, this.config.main_switch_entity);
    if (this.switchPending || R(t))
      return;
    const e = (t == null ? void 0 : t.state) !== "on";
    if (e && this.config.confirm_switch_on && !window.confirm(this.t("card.confirmSwitchOn")))
      return;
    this.switchPending = !0, this.serviceError = void 0;
    const r = await Nt(this.hass, this.config.main_switch_entity, e);
    this.switchPending = !1, this.serviceError = r.ok ? void 0 : r.error;
  }
  adjustTargetTemperature(t) {
    const e = G(this.hass, this.config.target_temperature_entity), r = Ce(e), i = this.getEntityNumber(e);
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
    const r = await Ht(
      this.hass,
      this.config.target_temperature_entity,
      t,
      e
    );
    this.targetPending = !1, this.serviceError = r.ok ? void 0 : r.error;
  }
  scheduleHistoryRefresh() {
    if (!this.config.show_temperature_trend || !this.hass) {
      this.clearHistoryTimer();
      return;
    }
    const t = Pe(this.hass, this.config), e = this.getTrendEntityId(), r = `${e ?? ""}:${this.config.trend_history_minutes}:${this.config.trend_refresh_minutes}`;
    if (!e || t.summary.controlTemperature === void 0) {
      this.historySamples = [], this.clearHistoryTimer();
      return;
    }
    this.lastHistoryFetchKey !== r && (this.lastHistoryFetchKey = r, this.loadHistory(e)), this.historyRefreshTimer === void 0 && (this.historyRefreshTimer = window.setInterval(() => {
      this.loadHistory(e);
    }, this.config.trend_refresh_minutes * 6e4));
  }
  async loadHistory(t) {
    this.historyLoading = !0, this.historySamples = await Wt(
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
  getTrendEntityId() {
    switch (this.config.control_temperature_mode) {
      case "top":
        return this.config.temperature_top_entity;
      case "middle":
        return this.config.temperature_middle_entity;
      case "bottom":
        return this.config.temperature_bottom_entity;
      default:
        return this.config.temperature_middle_entity ?? this.config.temperature_top_entity ?? this.config.temperature_bottom_entity;
    }
  }
  getSwitchStateLabel(t) {
    return R(t) ? this.t("card.powerUnavailable") : (t == null ? void 0 : t.state) === "on" ? this.t("card.powerOn") : this.t("card.powerOff");
  }
  getEntityNumber(t) {
    if (!t || R(t))
      return;
    const e = Number(t.state);
    return Number.isFinite(e) ? e : void 0;
  }
  valueClass(t) {
    return t === void 0 ? "metric-value unavailable" : "metric-value";
  }
  formatTemperature(t) {
    return t === void 0 ? this.t("card.notAvailable") : `${t.toFixed(1)} degC`;
  }
  formatTemperatureDelta(t) {
    return `${t > 0 ? "+" : ""}${t.toFixed(1)} degC`;
  }
  t(t) {
    var e, r;
    return Qe(((e = this.hass) == null ? void 0 : e.selectedLanguage) ?? ((r = this.hass) == null ? void 0 : r.language), t);
  }
};
m.styles = Jt;
v([
  P({ attribute: !1 })
], m.prototype, "hass", 2);
v([
  S()
], m.prototype, "config", 2);
v([
  S()
], m.prototype, "switchPending", 2);
v([
  S()
], m.prototype, "targetPending", 2);
v([
  S()
], m.prototype, "serviceError", 2);
v([
  S()
], m.prototype, "historySamples", 2);
v([
  S()
], m.prototype, "historyLoading", 2);
m = v([
  pe(xt)
], m);
const ur = ze`
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
var dr = Object.defineProperty, cr = Object.getOwnPropertyDescriptor, fe = (t, e, r, i) => {
  for (var n = i > 1 ? void 0 : i ? cr(e, r) : e, s = t.length - 1, o; s >= 0; s--)
    (o = t[s]) && (n = (i ? o(e, r, n) : o(n)) || n);
  return i && n && dr(e, r, n), n;
};
let B = class extends $ {
  constructor() {
    super(...arguments), this.config = x({}), this.computeLabel = (t) => t.label, this.computeHelper = (t) => t.description;
  }
  setConfig(t) {
    this.config = x(t);
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
            options: Ie.map((e) => ({
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
      ),
      this.numberField(
        "above_target_threshold",
        "editor.aboveTargetThreshold",
        "editor.aboveTargetThresholdDescription",
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
    this.config = x({
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
    return Qe(((e = this.hass) == null ? void 0 : e.selectedLanguage) ?? ((r = this.hass) == null ? void 0 : r.language), t);
  }
};
B.styles = ur;
fe([
  P({ attribute: !1 })
], B.prototype, "hass", 2);
fe([
  S()
], B.prototype, "config", 2);
B = fe([
  pe(Ge)
], B);
const Ne = {
  type: me,
  name: "Sauna Suite Card",
  description: "A placeholder card for the Sauna Suite Home Assistant project.",
  preview: !0
};
function hr(t = window) {
  t.customCards = t.customCards ?? [], t.customCards.some((r) => r.type === Ne.type) || t.customCards.push(Ne);
}
hr();
export {
  xt as CARD_TAG,
  me as CARD_TYPE,
  Ge as EDITOR_TAG
};
//# sourceMappingURL=sauna-suite.js.map
