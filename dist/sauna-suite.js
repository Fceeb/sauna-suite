/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const D = globalThis, V = D.ShadowRoot && (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, W = Symbol(), Q = /* @__PURE__ */ new WeakMap();
let dt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== W) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (V && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Q.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Q.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const vt = (r) => new dt(typeof r == "string" ? r : r + "", void 0, W), pt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, o) => s + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[o + 1], r[0]);
  return new dt(e, r, W);
}, bt = (r, t) => {
  if (V) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = D.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, X = V ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return vt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Et, defineProperty: St, getOwnPropertyDescriptor: Ct, getOwnPropertyNames: wt, getOwnPropertySymbols: xt, getPrototypeOf: Pt } = Object, _ = globalThis, tt = _.trustedTypes, Ot = tt ? tt.emptyScript : "", L = _.reactiveElementPolyfillSupport, x = (r, t) => r, z = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Ot : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, Z = (r, t) => !Et(r, t), et = { attribute: !0, type: String, converter: z, reflect: !1, useDefault: !1, hasChanged: Z };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), _.litPropertyMetadata ?? (_.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let v = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = et) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && St(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: o } = Ct(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: i, set(n) {
      const h = i == null ? void 0 : i.call(this);
      o == null || o.call(this, n), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? et;
  }
  static _$Ei() {
    if (this.hasOwnProperty(x("elementProperties"))) return;
    const t = Pt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(x("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(x("properties"))) {
      const e = this.properties, s = [...wt(e), ...xt(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(X(i));
    } else t !== void 0 && e.push(X(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return bt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var o;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (((o = s.converter) == null ? void 0 : o.toAttribute) !== void 0 ? s.converter : z).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o, n;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const h = s.getPropertyOptions(i), a = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((o = h.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? h.converter : z;
      this._$Em = i;
      const c = a.fromAttribute(e, h.type);
      this[i] = c ?? ((n = this._$Ej) == null ? void 0 : n.get(i)) ?? c, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, o) {
    var n;
    if (t !== void 0) {
      const h = this.constructor;
      if (i === !1 && (o = this[t]), s ?? (s = h.getPropertyOptions(t)), !((s.hasChanged ?? Z)(o, e) || s.useDefault && s.reflect && o === ((n = this._$Ej) == null ? void 0 : n.get(t)) && !this.hasAttribute(h._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: o }, n) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), o !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, n] of this._$Ep) this[o] = n;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, n] of i) {
        const { wrapped: h } = n, a = this[o];
        h !== !0 || this._$AL.has(o) || a === void 0 || this.C(o, void 0, n, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
v.elementStyles = [], v.shadowRootOptions = { mode: "open" }, v[x("elementProperties")] = /* @__PURE__ */ new Map(), v[x("finalized")] = /* @__PURE__ */ new Map(), L == null || L({ ReactiveElement: v }), (_.reactiveElementVersions ?? (_.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis, st = (r) => r, j = P.trustedTypes, it = j ? j.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ut = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, $t = "?" + f, Ut = `<${$t}>`, A = document, O = () => A.createComment(""), U = (r) => r === null || typeof r != "object" && typeof r != "function", F = Array.isArray, Tt = (r) => F(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", k = `[ 	
\f\r]`, w = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, rt = /-->/g, nt = />/g, g = RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ot = /'/g, at = /"/g, ft = /^(?:script|style|textarea|title)$/i, Ht = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), _t = Ht(1), S = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), ht = /* @__PURE__ */ new WeakMap(), m = A.createTreeWalker(A, 129);
function gt(r, t) {
  if (!F(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return it !== void 0 ? it.createHTML(t) : t;
}
const Mt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = w;
  for (let h = 0; h < e; h++) {
    const a = r[h];
    let c, p, l = -1, u = 0;
    for (; u < a.length && (n.lastIndex = u, p = n.exec(a), p !== null); ) u = n.lastIndex, n === w ? p[1] === "!--" ? n = rt : p[1] !== void 0 ? n = nt : p[2] !== void 0 ? (ft.test(p[2]) && (i = RegExp("</" + p[2], "g")), n = g) : p[3] !== void 0 && (n = g) : n === g ? p[0] === ">" ? (n = i ?? w, l = -1) : p[1] === void 0 ? l = -2 : (l = n.lastIndex - p[2].length, c = p[1], n = p[3] === void 0 ? g : p[3] === '"' ? at : ot) : n === at || n === ot ? n = g : n === rt || n === nt ? n = w : (n = g, i = void 0);
    const $ = n === g && r[h + 1].startsWith("/>") ? " " : "";
    o += n === w ? a + Ut : l >= 0 ? (s.push(c), a.slice(0, l) + ut + a.slice(l) + f + $) : a + f + (l === -2 ? h : $);
  }
  return [gt(r, o + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class T {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let o = 0, n = 0;
    const h = t.length - 1, a = this.parts, [c, p] = Mt(t, e);
    if (this.el = T.createElement(c, s), m.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = m.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(ut)) {
          const u = p[n++], $ = i.getAttribute(l).split(f), R = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: o, name: R[2], strings: $, ctor: R[1] === "." ? Rt : R[1] === "?" ? Dt : R[1] === "@" ? zt : I }), i.removeAttribute(l);
        } else l.startsWith(f) && (a.push({ type: 6, index: o }), i.removeAttribute(l));
        if (ft.test(i.tagName)) {
          const l = i.textContent.split(f), u = l.length - 1;
          if (u > 0) {
            i.textContent = j ? j.emptyScript : "";
            for (let $ = 0; $ < u; $++) i.append(l[$], O()), m.nextNode(), a.push({ type: 2, index: ++o });
            i.append(l[u], O());
          }
        }
      } else if (i.nodeType === 8) if (i.data === $t) a.push({ type: 2, index: o });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(f, l + 1)) !== -1; ) a.push({ type: 7, index: o }), l += f.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const s = A.createElement("template");
    return s.innerHTML = t, s;
  }
}
function C(r, t, e = r, s) {
  var n, h;
  if (t === S) return t;
  let i = s !== void 0 ? (n = e._$Co) == null ? void 0 : n[s] : e._$Cl;
  const o = U(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((h = i == null ? void 0 : i._$AO) == null || h.call(i, !1), o === void 0 ? i = void 0 : (i = new o(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = C(r, i._$AS(r, t.values), i, s)), t;
}
class Nt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? A).importNode(e, !0);
    m.currentNode = i;
    let o = m.nextNode(), n = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (n === a.index) {
        let c;
        a.type === 2 ? c = new N(o, o.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (c = new jt(o, this, t)), this._$AV.push(c), a = s[++h];
      }
      n !== (a == null ? void 0 : a.index) && (o = m.nextNode(), n++);
    }
    return m.currentNode = A, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class N {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = C(this, t, e), U(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== S && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Tt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && U(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = T.createElement(gt(s.h, s.h[0]), this.options)), s);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i) this._$AH.p(e);
    else {
      const n = new Nt(i, this), h = n.u(this.options);
      n.p(e), this.T(h), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ht.get(t.strings);
    return e === void 0 && ht.set(t.strings, e = new T(t)), e;
  }
  k(t) {
    F(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const o of t) i === e.length ? e.push(s = new N(this.O(O()), this.O(O()), this, this.options)) : s = e[i], s._$AI(o), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = st(t).nextSibling;
      st(t).remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class I {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, o) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, i) {
    const o = this.strings;
    let n = !1;
    if (o === void 0) t = C(this, t, e, 0), n = !U(t) || t !== this._$AH && t !== S, n && (this._$AH = t);
    else {
      const h = t;
      let a, c;
      for (t = o[0], a = 0; a < o.length - 1; a++) c = C(this, h[s + a], e, a), c === S && (c = this._$AH[a]), n || (n = !U(c) || c !== this._$AH[a]), c === d ? t = d : t !== d && (t += (c ?? "") + o[a + 1]), this._$AH[a] = c;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Rt extends I {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Dt extends I {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class zt extends I {
  constructor(t, e, s, i, o) {
    super(t, e, s, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = C(this, t, e, 0) ?? d) === S) return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, o = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class jt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const B = P.litHtmlPolyfillSupport;
B == null || B(T, N), (P.litHtmlVersions ?? (P.litHtmlVersions = [])).push("3.3.3");
const It = (r, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new N(t.insertBefore(O(), o), o, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const y = globalThis;
class b extends v {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = It(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return S;
  }
}
var ct;
b._$litElement$ = !0, b.finalized = !0, (ct = y.litElementHydrateSupport) == null || ct.call(y, { LitElement: b });
const q = y.litElementPolyfillSupport;
q == null || q({ LitElement: b });
(y.litElementVersions ?? (y.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mt = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Lt = { attribute: !0, type: String, converter: z, reflect: !1, hasChanged: Z }, kt = (r = Lt, t, e) => {
  const { kind: s, metadata: i } = e;
  let o = globalThis.litPropertyMetadata.get(i);
  if (o === void 0 && globalThis.litPropertyMetadata.set(i, o = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), o.set(e.name, r), s === "accessor") {
    const { name: n } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(n, a, r, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(n, void 0, r, h), h;
    } };
  }
  if (s === "setter") {
    const { name: n } = e;
    return function(h) {
      const a = this[n];
      t.call(this, h), this.requestUpdate(n, a, r, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function G(r) {
  return (t, e) => typeof e == "object" ? kt(r, t, e) : ((s, i, o) => {
    const n = i.hasOwnProperty(o);
    return i.constructor.createProperty(o, s), n ? Object.getOwnPropertyDescriptor(i, o) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function yt(r) {
  return G({ ...r, state: !0, attribute: !1 });
}
const J = "custom:sauna-suite-card", Bt = "sauna-suite-card", At = "sauna-suite-editor";
function qt() {
  return {
    type: J,
    name: "Sauna Suite"
  };
}
function E(r) {
  return {
    ...qt(),
    ...r,
    type: J
  };
}
const Vt = pt`
  :host {
    display: block;
  }

  .content {
    display: grid;
    gap: 12px;
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
`;
var Wt = Object.defineProperty, Zt = Object.getOwnPropertyDescriptor, K = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Zt(t, e) : t, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (i = (s ? n(t, e, i) : n(i)) || i);
  return s && i && Wt(t, e, i), i;
};
let H = class extends b {
  constructor() {
    super(...arguments), this.config = E({});
  }
  setConfig(r) {
    this.config = E(r);
  }
  getCardSize() {
    return 2;
  }
  static getConfigElement() {
    return document.createElement(At);
  }
  static getStubConfig() {
    return E({});
  }
  render() {
    return _t`
      <ha-card header=${this.config.name}>
        <div class="content">
          <div class="eyebrow">Home Assistant custom card</div>
          <div class="title">Sauna Suite</div>
          <div class="description">
            Foundation placeholder. Sauna logic, alarms, control and optimization features are not
            implemented yet.
          </div>
        </div>
      </ha-card>
    `;
  }
};
H.styles = Vt;
K([
  G({ attribute: !1 })
], H.prototype, "hass", 2);
K([
  yt()
], H.prototype, "config", 2);
H = K([
  mt(Bt)
], H);
const Ft = pt`
  :host {
    display: block;
  }

  .form {
    display: grid;
    gap: 12px;
  }

  label {
    color: var(--primary-text-color);
    display: grid;
    font-size: 14px;
    gap: 6px;
  }

  input {
    background: var(--card-background-color);
    border: 1px solid var(--divider-color);
    border-radius: 6px;
    box-sizing: border-box;
    color: var(--primary-text-color);
    font: inherit;
    min-height: 40px;
    padding: 8px 10px;
    width: 100%;
  }
`;
var Gt = Object.defineProperty, Jt = Object.getOwnPropertyDescriptor, Y = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Jt(t, e) : t, o = r.length - 1, n; o >= 0; o--)
    (n = r[o]) && (i = (s ? n(t, e, i) : n(i)) || i);
  return s && i && Gt(t, e, i), i;
};
let M = class extends b {
  constructor() {
    super(...arguments), this.config = E({});
  }
  setConfig(r) {
    this.config = E(r);
  }
  render() {
    return _t`
      <div class="form">
        <label>
          Card name
          <input .value=${this.config.name ?? ""} @input=${this.handleNameInput} />
        </label>
      </div>
    `;
  }
  handleNameInput(r) {
    const t = r.target;
    this.updateConfig({ name: t.value });
  }
  updateConfig(r) {
    this.config = E({
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
};
M.styles = Ft;
Y([
  G({ attribute: !1 })
], M.prototype, "hass", 2);
Y([
  yt()
], M.prototype, "config", 2);
M = Y([
  mt(At)
], M);
const lt = {
  type: J,
  name: "Sauna Suite Card",
  description: "A placeholder card for the Sauna Suite Home Assistant project.",
  preview: !0
};
function Kt(r = window) {
  r.customCards = r.customCards ?? [], r.customCards.some((e) => e.type === lt.type) || r.customCards.push(lt);
}
Kt();
export {
  Bt as CARD_TAG,
  J as CARD_TYPE,
  At as EDITOR_TAG
};
//# sourceMappingURL=sauna-suite.js.map
