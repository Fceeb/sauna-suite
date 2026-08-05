/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, G = D.ShadowRoot && (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, K = Symbol(), ie = /* @__PURE__ */ new WeakMap();
let ye = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== K) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (G && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = ie.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ie.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ue = (r) => new ye(typeof r == "string" ? r : r + "", void 0, K), ve = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, s, o) => i + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + r[o + 1], r[0]);
  return new ye(t, r, K);
}, ze = (r, e) => {
  if (G) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), s = D.litNonce;
    s !== void 0 && i.setAttribute("nonce", s), i.textContent = t.cssText, r.appendChild(i);
  }
}, se = G ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return Ue(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ne, defineProperty: He, getOwnPropertyDescriptor: Re, getOwnPropertyNames: De, getOwnPropertySymbols: Le, getPrototypeOf: Fe } = Object, f = globalThis, oe = f.trustedTypes, je = oe ? oe.emptyScript : "", V = f.reactiveElementPolyfillSupport, C = (r, e) => r, F = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? je : null;
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
} }, J = (r, e) => !Ne(r, e), ne = { attribute: !0, type: String, converter: F, reflect: !1, useDefault: !1, hasChanged: J };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), f.litPropertyMetadata ?? (f.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let b = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = ne) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), s = this.getPropertyDescriptor(e, i, t);
      s !== void 0 && He(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: s, set: o } = Re(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: s, set(n) {
      const l = s == null ? void 0 : s.call(this);
      o == null || o.call(this, n), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? ne;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const e = Fe(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const t = this.properties, i = [...De(t), ...Le(t)];
      for (const s of i) this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [i, s] of t) this.elementProperties.set(i, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, i] of this.elementProperties) {
      const s = this._$Eu(t, i);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const s of i) t.unshift(se(s));
    } else e !== void 0 && t.push(se(e));
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
    return ze(e, this.constructor.elementStyles), e;
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
    var o;
    const i = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, i);
    if (s !== void 0 && i.reflect === !0) {
      const n = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : F).toAttribute(t, i.type);
      this._$Em = e, n == null ? this.removeAttribute(s) : this.setAttribute(s, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var o, n;
    const i = this.constructor, s = i._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const l = i.getPropertyOptions(s), a = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((o = l.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? l.converter : F;
      this._$Em = s;
      const u = a.fromAttribute(t, l.type);
      this[s] = u ?? ((n = this._$Ej) == null ? void 0 : n.get(s)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, s = !1, o) {
    var n;
    if (e !== void 0) {
      const l = this.constructor;
      if (s === !1 && (o = this[e]), i ?? (i = l.getPropertyOptions(e)), !((i.hasChanged ?? J)(o, t) || i.useDefault && i.reflect && o === ((n = this._$Ej) == null ? void 0 : n.get(e)) && !this.hasAttribute(l._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: s, wrapped: o }, n) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), o !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [o, n] of s) {
        const { wrapped: l } = n, a = this[o];
        l !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, n, a);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((s) => {
        var o;
        return (o = s.hostUpdate) == null ? void 0 : o.call(s);
      }), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var t;
    (t = this._$EO) == null || t.forEach((i) => {
      var s;
      return (s = i.hostUpdated) == null ? void 0 : s.call(i);
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
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[C("elementProperties")] = /* @__PURE__ */ new Map(), b[C("finalized")] = /* @__PURE__ */ new Map(), V == null || V({ ReactiveElement: b }), (f.reactiveElementVersions ?? (f.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const M = globalThis, ae = (r) => r, j = M.trustedTypes, le = j ? j.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, be = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, Ae = "?" + _, Be = `<${Ae}>`, v = document, P = () => v.createComment(""), O = (r) => r === null || typeof r != "object" && typeof r != "function", Y = Array.isArray, Ve = (r) => Y(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", k = `[ 	
\f\r]`, T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, he = /-->/g, ue = />/g, g = RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), de = /'/g, ce = /"/g, we = /^(?:script|style|textarea|title)$/i, ke = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), L = ke(1), E = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), pe = /* @__PURE__ */ new WeakMap(), $ = v.createTreeWalker(v, 129);
function Ee(r, e) {
  if (!Y(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return le !== void 0 ? le.createHTML(e) : e;
}
const Ie = (r, e) => {
  const t = r.length - 1, i = [];
  let s, o = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = T;
  for (let l = 0; l < t; l++) {
    const a = r[l];
    let u, c, h = -1, p = 0;
    for (; p < a.length && (n.lastIndex = p, c = n.exec(a), c !== null); ) p = n.lastIndex, n === T ? c[1] === "!--" ? n = he : c[1] !== void 0 ? n = ue : c[2] !== void 0 ? (we.test(c[2]) && (s = RegExp("</" + c[2], "g")), n = g) : c[3] !== void 0 && (n = g) : n === g ? c[0] === ">" ? (n = s ?? T, h = -1) : c[1] === void 0 ? h = -2 : (h = n.lastIndex - c[2].length, u = c[1], n = c[3] === void 0 ? g : c[3] === '"' ? ce : de) : n === ce || n === de ? n = g : n === he || n === ue ? n = T : (n = g, s = void 0);
    const m = n === g && r[l + 1].startsWith("/>") ? " " : "";
    o += n === T ? a + Be : h >= 0 ? (i.push(u), a.slice(0, h) + be + a.slice(h) + _ + m) : a + _ + (h === -2 ? l : m);
  }
  return [Ee(r, o + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class U {
  constructor({ strings: e, _$litType$: t }, i) {
    let s;
    this.parts = [];
    let o = 0, n = 0;
    const l = e.length - 1, a = this.parts, [u, c] = Ie(e, t);
    if (this.el = U.createElement(u, i), $.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (s = $.nextNode()) !== null && a.length < l; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const h of s.getAttributeNames()) if (h.endsWith(be)) {
          const p = c[n++], m = s.getAttribute(h).split(_), R = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: o, name: R[2], strings: m, ctor: R[1] === "." ? Ze : R[1] === "?" ? qe : R[1] === "@" ? Ge : B }), s.removeAttribute(h);
        } else h.startsWith(_) && (a.push({ type: 6, index: o }), s.removeAttribute(h));
        if (we.test(s.tagName)) {
          const h = s.textContent.split(_), p = h.length - 1;
          if (p > 0) {
            s.textContent = j ? j.emptyScript : "";
            for (let m = 0; m < p; m++) s.append(h[m], P()), $.nextNode(), a.push({ type: 2, index: ++o });
            s.append(h[p], P());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Ae) a.push({ type: 2, index: o });
      else {
        let h = -1;
        for (; (h = s.data.indexOf(_, h + 1)) !== -1; ) a.push({ type: 7, index: o }), h += _.length - 1;
      }
      o++;
    }
  }
  static createElement(e, t) {
    const i = v.createElement("template");
    return i.innerHTML = e, i;
  }
}
function S(r, e, t = r, i) {
  var n, l;
  if (e === E) return e;
  let s = i !== void 0 ? (n = t._$Co) == null ? void 0 : n[i] : t._$Cl;
  const o = O(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== o && ((l = s == null ? void 0 : s._$AO) == null || l.call(s, !1), o === void 0 ? s = void 0 : (s = new o(r), s._$AT(r, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = s : t._$Cl = s), s !== void 0 && (e = S(r, s._$AS(r, e.values), s, i)), e;
}
class We {
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
    const { el: { content: t }, parts: i } = this._$AD, s = ((e == null ? void 0 : e.creationScope) ?? v).importNode(t, !0);
    $.currentNode = s;
    let o = $.nextNode(), n = 0, l = 0, a = i[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let u;
        a.type === 2 ? u = new H(o, o.nextSibling, this, e) : a.type === 1 ? u = new a.ctor(o, a.name, a.strings, this, e) : a.type === 6 && (u = new Ke(o, this, e)), this._$AV.push(u), a = i[++l];
      }
      n !== (a == null ? void 0 : a.index) && (o = $.nextNode(), n++);
    }
    return $.currentNode = v, s;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class H {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, s) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = s, this._$Cv = (s == null ? void 0 : s.isConnected) ?? !0;
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
    e = S(this, e, t), O(e) ? e === d || e == null || e === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : e !== this._$AH && e !== E && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ve(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== d && O(this._$AH) ? this._$AA.nextSibling.data = e : this.T(v.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var o;
    const { values: t, _$litType$: i } = e, s = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = U.createElement(Ee(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === s) this._$AH.p(t);
    else {
      const n = new We(s, this), l = n.u(this.options);
      n.p(t), this.T(l), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = pe.get(e.strings);
    return t === void 0 && pe.set(e.strings, t = new U(e)), t;
  }
  k(e) {
    Y(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, s = 0;
    for (const o of e) s === t.length ? t.push(i = new H(this.O(P()), this.O(P()), this, this.options)) : i = t[s], i._$AI(o), s++;
    s < t.length && (this._$AR(i && i._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const s = ae(e).nextSibling;
      ae(e).remove(), e = s;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class B {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, s, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = d;
  }
  _$AI(e, t = this, i, s) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) e = S(this, e, t, 0), n = !O(e) || e !== this._$AH && e !== E, n && (this._$AH = e);
    else {
      const l = e;
      let a, u;
      for (e = o[0], a = 0; a < o.length - 1; a++) u = S(this, l[i + a], t, a), u === E && (u = this._$AH[a]), n || (n = !O(u) || u !== this._$AH[a]), u === d ? e = d : e !== d && (e += (u ?? "") + o[a + 1]), this._$AH[a] = u;
    }
    n && !s && this.j(e);
  }
  j(e) {
    e === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ze extends B {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === d ? void 0 : e;
  }
}
class qe extends B {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== d);
  }
}
class Ge extends B {
  constructor(e, t, i, s, o) {
    super(e, t, i, s, o), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = S(this, e, t, 0) ?? d) === E) return;
    const i = this._$AH, s = e === d && i !== d || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, o = e !== d && (i === d || s);
    s && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Ke {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    S(this, e);
  }
}
const I = M.litHtmlPolyfillSupport;
I == null || I(U, H), (M.litHtmlVersions ?? (M.litHtmlVersions = [])).push("3.3.3");
const Je = (r, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let s = i._$litPart$;
  if (s === void 0) {
    const o = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = s = new H(e.insertBefore(P(), o), o, void 0, t ?? {});
  }
  return s._$AI(r), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const y = globalThis;
class A extends b {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Je(t, this.renderRoot, this.renderOptions);
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
    return E;
  }
}
var $e;
A._$litElement$ = !0, A.finalized = !0, ($e = y.litElementHydrateSupport) == null || $e.call(y, { LitElement: A });
const W = y.litElementPolyfillSupport;
W == null || W({ LitElement: A });
(y.litElementVersions ?? (y.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Se = (r) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(r, e);
  }) : customElements.define(r, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ye = { attribute: !0, type: String, converter: F, reflect: !1, hasChanged: J }, Qe = (r = Ye, e, t) => {
  const { kind: i, metadata: s } = t;
  let o = globalThis.litPropertyMetadata.get(s);
  if (o === void 0 && globalThis.litPropertyMetadata.set(s, o = /* @__PURE__ */ new Map()), i === "setter" && ((r = Object.create(r)).wrapped = !0), o.set(t.name, r), i === "accessor") {
    const { name: n } = t;
    return { set(l) {
      const a = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(n, a, r, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, r, l), l;
    } };
  }
  if (i === "setter") {
    const { name: n } = t;
    return function(l) {
      const a = this[n];
      e.call(this, l), this.requestUpdate(n, a, r, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function Q(r) {
  return (e, t) => typeof t == "object" ? Qe(r, e, t) : ((i, s, o) => {
    const n = s.hasOwnProperty(o);
    return s.constructor.createProperty(o, i), n ? Object.getOwnPropertyDescriptor(s, o) : void 0;
  })(r, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Te(r) {
  return Q({ ...r, state: !0, attribute: !1 });
}
const X = "custom:sauna-suite-card", Xe = "sauna-suite-card", xe = "sauna-suite-editor", Ce = [
  "top",
  "middle",
  "bottom",
  "average",
  "weighted_average",
  "minimum",
  "maximum"
], Z = 1;
function Me() {
  return {
    type: X,
    name: "Sauna Suite",
    control_temperature_mode: "average",
    weight_top: Z,
    weight_middle: Z,
    weight_bottom: Z,
    show_outside_temperature: !1,
    show_temperature_zones: !0
  };
}
function w(r) {
  const e = Me();
  return {
    ...e,
    ...r,
    type: X,
    control_temperature_mode: et(r.control_temperature_mode),
    weight_top: q(r.weight_top, e.weight_top),
    weight_middle: q(r.weight_middle, e.weight_middle),
    weight_bottom: q(r.weight_bottom, e.weight_bottom),
    show_outside_temperature: me(
      r.show_outside_temperature,
      e.show_outside_temperature
    ),
    show_temperature_zones: me(
      r.show_temperature_zones,
      e.show_temperature_zones
    )
  };
}
function et(r) {
  return typeof r == "string" && Ce.includes(r) ? r : Me().control_temperature_mode;
}
function q(r, e) {
  return typeof r != "number" || !Number.isFinite(r) ? e : Math.max(0, r);
}
function me(r, e) {
  return typeof r == "boolean" ? r : e;
}
const tt = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function rt(r) {
  if (r === void 0)
    return;
  if (typeof r == "number")
    return Number.isFinite(r) ? r : void 0;
  const e = r.trim().toLowerCase();
  if (tt.has(e))
    return;
  const t = Number(r);
  return Number.isFinite(t) ? t : void 0;
}
function it(r) {
  const e = r.filter(Number.isFinite);
  return e.length === 0 ? void 0 : e.reduce((i, s) => i + s, 0) / e.length;
}
function st(r, e) {
  const t = Pe(r).map((o) => ({
    value: r[o],
    weight: ut(e[o])
  })).filter((o) => o.value !== void 0), i = t.reduce((o, n) => o + n.weight, 0);
  return t.length === 0 || i <= 0 ? void 0 : t.reduce((o, n) => o + n.value * n.weight, 0) / i;
}
function ot(r) {
  const e = ee(r);
  return e.length > 0 ? Math.min(...e) : void 0;
}
function nt(r) {
  const e = ee(r);
  return e.length > 0 ? Math.max(...e) : void 0;
}
function at(r, e, t) {
  switch (e) {
    case "top":
      return r.top;
    case "middle":
      return r.middle;
    case "bottom":
      return r.bottom;
    case "average":
      return it(ee(r));
    case "weighted_average":
      return st(r, t);
    case "minimum":
      return ot(r);
    case "maximum":
      return nt(r);
  }
}
function lt(r) {
  if (!(r.top === void 0 || r.bottom === void 0))
    return r.top - r.bottom;
}
function ht(r, e, t) {
  return {
    controlTemperature: at(r, e, t),
    stratification: lt(r)
  };
}
function ee(r) {
  return Pe(r).map((e) => r[e]).filter((e) => e !== void 0);
}
function Pe(r) {
  return ["top", "middle", "bottom"].filter((t) => r[t] !== void 0);
}
function ut(r) {
  return Number.isFinite(r) ? Math.max(0, r) : 0;
}
function dt(r, e) {
  const t = {
    top: x(r, e.temperature_top_entity),
    middle: x(r, e.temperature_middle_entity),
    bottom: x(r, e.temperature_bottom_entity)
  }, i = {
    top: e.weight_top,
    middle: e.weight_middle,
    bottom: e.weight_bottom
  };
  return {
    zones: t,
    outsideTemperature: x(r, e.outside_temperature_entity),
    targetTemperature: x(r, e.target_temperature_entity),
    summary: ht(t, e.control_temperature_mode, i)
  };
}
function x(r, e) {
  var t;
  if (!(!r || !e))
    return rt((t = r.states[e]) == null ? void 0 : t.state);
}
const ct = ve`
  :host {
    display: block;
  }

  .content {
    display: grid;
    gap: 14px;
    padding: 16px;
  }

  .eyebrow {
    color: var(--secondary-text-color);
    font-size: 12px;
    letter-spacing: 0;
    text-transform: uppercase;
  }

  .title {
    color: var(--primary-text-color);
    font-size: 20px;
    font-weight: 600;
    line-height: 1.3;
  }

  .description {
    color: var(--secondary-text-color);
    font-size: 14px;
    line-height: 1.5;
  }

  .grid {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }

  .metric {
    background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    display: grid;
    gap: 4px;
    min-height: 72px;
    padding: 10px 12px;
  }

  .metric-label {
    color: var(--secondary-text-color);
    font-size: 12px;
    line-height: 1.3;
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

  .status {
    align-items: center;
    color: var(--warning-color, #f4b740);
    display: flex;
    font-size: 13px;
    font-weight: 600;
    gap: 8px;
  }
`, pt = { bottomTemperature: "Unten", controlTemperature: "Regeltemperatur", earlyDevelopment: "Fruehe Entwicklung", middleTemperature: "Mitte", name: "Sauna Suite", notAvailable: "Nicht verfuegbar", outsideTemperature: "Aussen", placeholder: "Nur Monitoring-Anzeige. Es ist keine Sauna-Steuerlogik implementiert.", stratification: "Temperaturschichtung", targetTemperature: "Ziel", topTemperature: "Oben" }, mt = { cardName: "Kartenname", controlTemperatureMode: "Modus fuer Regeltemperatur", mainSwitchEntity: "Hauptschalter-Entitaet", outsideTemperatureEntity: "Aussentemperatur-Entitaet", showOutsideTemperature: "Aussentemperatur anzeigen", showTemperatureZones: "Temperaturzonen anzeigen", targetTemperatureEntity: "Zieltemperatur-Entitaet", temperatureBottomEntity: "Temperatur unten", temperatureMiddleEntity: "Temperatur Mitte", temperatureTopEntity: "Temperatur oben", weightBottom: "Gewichtung unten", weightMiddle: "Gewichtung Mitte", weightTop: "Gewichtung oben" }, _t = { average: "Durchschnitt", bottom: "Unten", maximum: "Maximum", middle: "Mitte", minimum: "Minimum", top: "Oben", weighted_average: "Gewichteter Durchschnitt" }, ft = {
  card: pt,
  editor: mt,
  modes: _t
}, gt = { bottomTemperature: "Bottom", controlTemperature: "Control temperature", earlyDevelopment: "Early Development", middleTemperature: "Middle", name: "Sauna Suite", notAvailable: "Not available", outsideTemperature: "Outside", placeholder: "Monitoring display only. No sauna control logic is implemented.", stratification: "Stratification", targetTemperature: "Target", topTemperature: "Top" }, $t = { cardName: "Card name", controlTemperatureMode: "Control temperature mode", mainSwitchEntity: "Main switch entity", outsideTemperatureEntity: "Outside temperature entity", showOutsideTemperature: "Show outside temperature", showTemperatureZones: "Show temperature zones", targetTemperatureEntity: "Target temperature entity", temperatureBottomEntity: "Bottom temperature entity", temperatureMiddleEntity: "Middle temperature entity", temperatureTopEntity: "Top temperature entity", weightBottom: "Bottom weight", weightMiddle: "Middle weight", weightTop: "Top weight" }, yt = { average: "Average", bottom: "Bottom", maximum: "Maximum", middle: "Middle", minimum: "Minimum", top: "Top", weighted_average: "Weighted average" }, vt = {
  card: gt,
  editor: $t,
  modes: yt
}, _e = {
  de: ft,
  en: vt
};
function Oe(r, e) {
  const t = r != null && r.toLowerCase().startsWith("de") ? "de" : "en";
  return fe(_e[t], e) ?? fe(_e.en, e) ?? e;
}
function fe(r, e) {
  const t = e.split(".").reduce((i, s) => {
    if (!(typeof i != "object" || i === void 0))
      return i[s];
  }, r);
  return typeof t == "string" ? t : void 0;
}
var bt = Object.defineProperty, At = Object.getOwnPropertyDescriptor, te = (r, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? At(e, t) : e, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && bt(e, t, s), s;
};
let z = class extends A {
  constructor() {
    super(...arguments), this.config = w({});
  }
  setConfig(r) {
    this.config = w(r);
  }
  getCardSize() {
    return 4;
  }
  static getConfigElement() {
    return document.createElement(xe);
  }
  static getStubConfig() {
    return w({});
  }
  render() {
    const r = dt(this.hass, this.config);
    return L`
      <ha-card header=${this.config.name}>
        <div class="content">
          <div class="eyebrow">${this.t("card.earlyDevelopment")}</div>
          <div class="title">${this.t("card.name")}</div>
          <div class="description">${this.t("card.placeholder")}</div>

          <div class="grid">
            ${this.config.show_temperature_zones ? L`
                    ${this.renderMetric("card.topTemperature", r.zones.top)}
                    ${this.renderMetric("card.middleTemperature", r.zones.middle)}
                    ${this.renderMetric("card.bottomTemperature", r.zones.bottom)}
                  ` : void 0}
            ${this.renderMetric("card.controlTemperature", r.summary.controlTemperature)}
            ${this.config.target_temperature_entity ? this.renderMetric("card.targetTemperature", r.targetTemperature) : void 0}
            ${this.config.show_outside_temperature && this.config.outside_temperature_entity ? this.renderMetric("card.outsideTemperature", r.outsideTemperature) : void 0}
            ${r.summary.stratification !== void 0 ? this.renderMetric("card.stratification", r.summary.stratification) : void 0}
          </div>
        </div>
      </ha-card>
    `;
  }
  renderMetric(r, e) {
    const t = e !== void 0;
    return L`
      <div class="metric">
        <div class="metric-label">${this.t(r)}</div>
        <div class=${t ? "metric-value" : "metric-value unavailable"}>
          ${t ? this.formatTemperature(e) : this.t("card.notAvailable")}
        </div>
      </div>
    `;
  }
  formatTemperature(r) {
    return `${r.toFixed(1)} °C`;
  }
  t(r) {
    var e, t;
    return Oe(((e = this.hass) == null ? void 0 : e.selectedLanguage) ?? ((t = this.hass) == null ? void 0 : t.language), r);
  }
};
z.styles = ct;
te([
  Q({ attribute: !1 })
], z.prototype, "hass", 2);
te([
  Te()
], z.prototype, "config", 2);
z = te([
  Se(Xe)
], z);
const wt = ve`
  :host {
    display: block;
  }

  .form {
    display: grid;
    gap: 16px;
  }

  .fallback {
    color: var(--secondary-text-color);
    font-size: 14px;
    line-height: 1.5;
  }
`;
var Et = Object.defineProperty, St = Object.getOwnPropertyDescriptor, re = (r, e, t, i) => {
  for (var s = i > 1 ? void 0 : i ? St(e, t) : e, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (s = (i ? n(e, t, s) : n(s)) || s);
  return i && s && Et(e, t, s), s;
};
let N = class extends A {
  constructor() {
    super(...arguments), this.config = w({}), this.computeLabel = (r) => r.label;
  }
  setConfig(r) {
    this.config = w(r);
  }
  render() {
    return L`
      <div class="form">
        <ha-form
          .hass=${this.hass}
          .data=${this.config}
          .schema=${this.schema}
          .computeLabel=${this.computeLabel}
          @value-changed=${this.handleValueChanged}
        ></ha-form>
      </div>
    `;
  }
  get schema() {
    const r = [
      this.textField("name", "editor.cardName"),
      this.entityField("main_switch_entity", "editor.mainSwitchEntity", [
        { domain: "switch" },
        { domain: "input_boolean" }
      ]),
      this.temperatureSensorField("temperature_top_entity", "editor.temperatureTopEntity"),
      this.temperatureSensorField("temperature_middle_entity", "editor.temperatureMiddleEntity"),
      this.temperatureSensorField("temperature_bottom_entity", "editor.temperatureBottomEntity"),
      this.entityField("outside_temperature_entity", "editor.outsideTemperatureEntity", [
        { domain: "sensor", device_class: "temperature" }
      ]),
      this.entityField("target_temperature_entity", "editor.targetTemperatureEntity", [
        { domain: "number" },
        { domain: "input_number" }
      ]),
      {
        name: "control_temperature_mode",
        label: this.t("editor.controlTemperatureMode"),
        selector: {
          select: {
            mode: "dropdown",
            options: Ce.map((e) => ({
              value: e,
              label: this.t(`modes.${e}`)
            }))
          }
        }
      }
    ];
    return this.config.control_temperature_mode === "weighted_average" && r.push(
      this.numberField("weight_top", "editor.weightTop"),
      this.numberField("weight_middle", "editor.weightMiddle"),
      this.numberField("weight_bottom", "editor.weightBottom")
    ), r.push(
      this.booleanField("show_outside_temperature", "editor.showOutsideTemperature"),
      this.booleanField("show_temperature_zones", "editor.showTemperatureZones")
    ), r;
  }
  handleValueChanged(r) {
    this.updateConfig(r.detail.value);
  }
  updateConfig(r) {
    this.config = w({
      ...this.config,
      ...r
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
  textField(r, e) {
    return {
      name: r,
      label: this.t(e),
      selector: {
        text: {}
      }
    };
  }
  temperatureSensorField(r, e) {
    return this.entityField(r, e, [{ domain: "sensor", device_class: "temperature" }]);
  }
  entityField(r, e, t) {
    return {
      name: r,
      label: this.t(e),
      selector: {
        entity: {
          filter: t
        }
      }
    };
  }
  numberField(r, e) {
    return {
      name: r,
      label: this.t(e),
      selector: {
        number: {
          min: 0,
          mode: "box",
          step: 0.1
        }
      }
    };
  }
  booleanField(r, e) {
    return {
      name: r,
      label: this.t(e),
      selector: {
        boolean: {}
      }
    };
  }
  t(r) {
    var e, t;
    return Oe(((e = this.hass) == null ? void 0 : e.selectedLanguage) ?? ((t = this.hass) == null ? void 0 : t.language), r);
  }
};
N.styles = wt;
re([
  Q({ attribute: !1 })
], N.prototype, "hass", 2);
re([
  Te()
], N.prototype, "config", 2);
N = re([
  Se(xe)
], N);
const ge = {
  type: X,
  name: "Sauna Suite Card",
  description: "A placeholder card for the Sauna Suite Home Assistant project.",
  preview: !0
};
function Tt(r = window) {
  r.customCards = r.customCards ?? [], r.customCards.some((t) => t.type === ge.type) || r.customCards.push(ge);
}
Tt();
export {
  Xe as CARD_TAG,
  X as CARD_TYPE,
  xe as EDITOR_TAG
};
//# sourceMappingURL=sauna-suite.js.map
