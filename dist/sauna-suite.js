/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const oe = globalThis, ke = oe.ShadowRoot && (oe.ShadyCSS === void 0 || oe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, De = Symbol(), Le = /* @__PURE__ */ new WeakMap();
let ft = class {
  constructor(e, i, r) {
    if (this._$cssResult$ = !0, r !== De) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (ke && e === void 0) {
      const r = i !== void 0 && i.length === 1;
      r && (e = Le.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Le.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Yt = (t) => new ft(typeof t == "string" ? t : t + "", void 0, De), _t = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce((r, n, a) => r + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[a + 1], t[0]);
  return new ft(i, t, De);
}, Qt = (t, e) => {
  if (ke) t.adoptedStyleSheets = e.map((i) => i instanceof CSSStyleSheet ? i : i.styleSheet);
  else for (const i of e) {
    const r = document.createElement("style"), n = oe.litNonce;
    n !== void 0 && r.setAttribute("nonce", n), r.textContent = i.cssText, t.appendChild(r);
  }
}, Be = ke ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const r of e.cssRules) i += r.cssText;
  return Yt(i);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Jt, defineProperty: Xt, getOwnPropertyDescriptor: ei, getOwnPropertyNames: ti, getOwnPropertySymbols: ii, getPrototypeOf: ri } = Object, A = globalThis, ze = A.trustedTypes, ni = ze ? ze.emptyScript : "", he = A.reactiveElementPolyfillSupport, K = (t, e) => t, de = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? ni : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, Me = (t, e) => !Jt(t, e), Ue = { attribute: !0, type: String, converter: de, reflect: !1, useDefault: !1, hasChanged: Me };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), A.litPropertyMetadata ?? (A.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let L = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = Ue) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const r = Symbol(), n = this.getPropertyDescriptor(e, r, i);
      n !== void 0 && Xt(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, i, r) {
    const { get: n, set: a } = ei(this.prototype, e) ?? { get() {
      return this[i];
    }, set(o) {
      this[i] = o;
    } };
    return { get: n, set(o) {
      const d = n == null ? void 0 : n.call(this);
      a == null || a.call(this, o), this.requestUpdate(e, d, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ue;
  }
  static _$Ei() {
    if (this.hasOwnProperty(K("elementProperties"))) return;
    const e = ri(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(K("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(K("properties"))) {
      const i = this.properties, r = [...ti(i), ...ii(i)];
      for (const n of r) this.createProperty(n, i[n]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [r, n] of i) this.elementProperties.set(r, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, r] of this.elementProperties) {
      const n = this._$Eu(i, r);
      n !== void 0 && this._$Eh.set(n, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const n of r) i.unshift(Be(n));
    } else e !== void 0 && i.push(Be(e));
    return i;
  }
  static _$Eu(e, i) {
    const r = i.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var e;
    this._$ES = new Promise((i) => this.enableUpdating = i), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (e = this.constructor.l) == null || e.forEach((i) => i(this));
  }
  addController(e) {
    var i;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(e), this.renderRoot !== void 0 && this.isConnected && ((i = e.hostConnected) == null || i.call(e));
  }
  removeController(e) {
    var i;
    (i = this._$EO) == null || i.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const r of i.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Qt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var e;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (e = this._$EO) == null || e.forEach((i) => {
      var r;
      return (r = i.hostConnected) == null ? void 0 : r.call(i);
    });
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var r;
      return (r = i.hostDisconnected) == null ? void 0 : r.call(i);
    });
  }
  attributeChangedCallback(e, i, r) {
    this._$AK(e, r);
  }
  _$ET(e, i) {
    var a;
    const r = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, r);
    if (n !== void 0 && r.reflect === !0) {
      const o = (((a = r.converter) == null ? void 0 : a.toAttribute) !== void 0 ? r.converter : de).toAttribute(i, r.type);
      this._$Em = e, o == null ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Em = null;
    }
  }
  _$AK(e, i) {
    var a, o;
    const r = this.constructor, n = r._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const d = r.getPropertyOptions(n), s = typeof d.converter == "function" ? { fromAttribute: d.converter } : ((a = d.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? d.converter : de;
      this._$Em = n;
      const l = s.fromAttribute(i, d.type);
      this[n] = l ?? ((o = this._$Ej) == null ? void 0 : o.get(n)) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, i, r, n = !1, a) {
    var o;
    if (e !== void 0) {
      const d = this.constructor;
      if (n === !1 && (a = this[e]), r ?? (r = d.getPropertyOptions(e)), !((r.hasChanged ?? Me)(a, i) || r.useDefault && r.reflect && a === ((o = this._$Ej) == null ? void 0 : o.get(e)) && !this.hasAttribute(d._$Eu(e, r)))) return;
      this.C(e, i, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: r, reflect: n, wrapped: a }, o) {
    r && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, o ?? i ?? this[e]), a !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (i = void 0), this._$AL.set(e, i)), n === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var r;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [a, o] of this._$Ep) this[a] = o;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [a, o] of n) {
        const { wrapped: d } = o, s = this[a];
        d !== !0 || this._$AL.has(a) || s === void 0 || this.C(a, void 0, o, s);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), (r = this._$EO) == null || r.forEach((n) => {
        var a;
        return (a = n.hostUpdate) == null ? void 0 : a.call(n);
      }), this.update(i)) : this._$EM();
    } catch (n) {
      throw e = !1, this._$EM(), n;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    var i;
    (i = this._$EO) == null || i.forEach((r) => {
      var n;
      return (n = r.hostUpdated) == null ? void 0 : n.call(r);
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
    this._$Eq && (this._$Eq = this._$Eq.forEach((i) => this._$ET(i, this[i]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
L.elementStyles = [], L.shadowRootOptions = { mode: "open" }, L[K("elementProperties")] = /* @__PURE__ */ new Map(), L[K("finalized")] = /* @__PURE__ */ new Map(), he == null || he({ ReactiveElement: L }), (A.reactiveElementVersions ?? (A.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis, Ie = (t) => t, le = Z.trustedTypes, Ve = le ? le.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, yt = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, bt = "?" + $, ai = `<${bt}>`, O = document, j = () => O.createComment(""), q = (t) => t === null || typeof t != "object" && typeof t != "function", Ne = Array.isArray, oi = (t) => Ne(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", ge = `[ 	
\f\r]`, G = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ge = /-->/g, We = />/g, M = RegExp(`>|${ge}(?:([^\\s"'>=/]+)(${ge}*=${ge}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ke = /'/g, Ze = /"/g, wt = /^(?:script|style|textarea|title)$/i, vt = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), h = vt(1), N = vt(2), z = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), je = /* @__PURE__ */ new WeakMap(), x = O.createTreeWalker(O, 129);
function St(t, e) {
  if (!Ne(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ve !== void 0 ? Ve.createHTML(e) : e;
}
const si = (t, e) => {
  const i = t.length - 1, r = [];
  let n, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = G;
  for (let d = 0; d < i; d++) {
    const s = t[d];
    let l, u, c = -1, b = 0;
    for (; b < s.length && (o.lastIndex = b, u = o.exec(s), u !== null); ) b = o.lastIndex, o === G ? u[1] === "!--" ? o = Ge : u[1] !== void 0 ? o = We : u[2] !== void 0 ? (wt.test(u[2]) && (n = RegExp("</" + u[2], "g")), o = M) : u[3] !== void 0 && (o = M) : o === M ? u[0] === ">" ? (o = n ?? G, c = -1) : u[1] === void 0 ? c = -2 : (c = o.lastIndex - u[2].length, l = u[1], o = u[3] === void 0 ? M : u[3] === '"' ? Ze : Ke) : o === Ze || o === Ke ? o = M : o === Ge || o === We ? o = G : (o = M, n = void 0);
    const v = o === M && t[d + 1].startsWith("/>") ? " " : "";
    a += o === G ? s + ai : c >= 0 ? (r.push(l), s.slice(0, c) + yt + s.slice(c) + $ + v) : s + $ + (c === -2 ? d : v);
  }
  return [St(t, a + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class Y {
  constructor({ strings: e, _$litType$: i }, r) {
    let n;
    this.parts = [];
    let a = 0, o = 0;
    const d = e.length - 1, s = this.parts, [l, u] = si(e, i);
    if (this.el = Y.createElement(l, r), x.currentNode = this.el.content, i === 2 || i === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (n = x.nextNode()) !== null && s.length < d; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const c of n.getAttributeNames()) if (c.endsWith(yt)) {
          const b = u[o++], v = n.getAttribute(c).split($), ee = /([.?@])?(.*)/.exec(b);
          s.push({ type: 1, index: a, name: ee[2], strings: v, ctor: ee[1] === "." ? li : ee[1] === "?" ? ci : ee[1] === "@" ? ui : ue }), n.removeAttribute(c);
        } else c.startsWith($) && (s.push({ type: 6, index: a }), n.removeAttribute(c));
        if (wt.test(n.tagName)) {
          const c = n.textContent.split($), b = c.length - 1;
          if (b > 0) {
            n.textContent = le ? le.emptyScript : "";
            for (let v = 0; v < b; v++) n.append(c[v], j()), x.nextNode(), s.push({ type: 2, index: ++a });
            n.append(c[b], j());
          }
        }
      } else if (n.nodeType === 8) if (n.data === bt) s.push({ type: 2, index: a });
      else {
        let c = -1;
        for (; (c = n.data.indexOf($, c + 1)) !== -1; ) s.push({ type: 7, index: a }), c += $.length - 1;
      }
      a++;
    }
  }
  static createElement(e, i) {
    const r = O.createElement("template");
    return r.innerHTML = e, r;
  }
}
function U(t, e, i = t, r) {
  var o, d;
  if (e === z) return e;
  let n = r !== void 0 ? (o = i._$Co) == null ? void 0 : o[r] : i._$Cl;
  const a = q(e) ? void 0 : e._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== a && ((d = n == null ? void 0 : n._$AO) == null || d.call(n, !1), a === void 0 ? n = void 0 : (n = new a(t), n._$AT(t, i, r)), r !== void 0 ? (i._$Co ?? (i._$Co = []))[r] = n : i._$Cl = n), n !== void 0 && (e = U(t, n._$AS(t, e.values), n, r)), e;
}
class di {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: r } = this._$AD, n = ((e == null ? void 0 : e.creationScope) ?? O).importNode(i, !0);
    x.currentNode = n;
    let a = x.nextNode(), o = 0, d = 0, s = r[0];
    for (; s !== void 0; ) {
      if (o === s.index) {
        let l;
        s.type === 2 ? l = new J(a, a.nextSibling, this, e) : s.type === 1 ? l = new s.ctor(a, s.name, s.strings, this, e) : s.type === 6 && (l = new hi(a, this, e)), this._$AV.push(l), s = r[++d];
      }
      o !== (s == null ? void 0 : s.index) && (a = x.nextNode(), o++);
    }
    return x.currentNode = O, n;
  }
  p(e) {
    let i = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, i), i += r.strings.length - 2) : r._$AI(e[i])), i++;
  }
}
class J {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, i, r, n) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = r, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = U(this, e, i), q(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== z && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : oi(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && q(this._$AH) ? this._$AA.nextSibling.data = e : this.T(O.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: i, _$litType$: r } = e, n = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = Y.createElement(St(r.h, r.h[0]), this.options)), r);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === n) this._$AH.p(i);
    else {
      const o = new di(n, this), d = o.u(this.options);
      o.p(i), this.T(d), this._$AH = o;
    }
  }
  _$AC(e) {
    let i = je.get(e.strings);
    return i === void 0 && je.set(e.strings, i = new Y(e)), i;
  }
  k(e) {
    Ne(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let r, n = 0;
    for (const a of e) n === i.length ? i.push(r = new J(this.O(j()), this.O(j()), this, this.options)) : r = i[n], r._$AI(a), n++;
    n < i.length && (this._$AR(r && r._$AB.nextSibling, n), i.length = n);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    var r;
    for ((r = this._$AP) == null ? void 0 : r.call(this, !1, !0, i); e !== this._$AB; ) {
      const n = Ie(e).nextSibling;
      Ie(e).remove(), e = n;
    }
  }
  setConnected(e) {
    var i;
    this._$AM === void 0 && (this._$Cv = e, (i = this._$AP) == null || i.call(this, e));
  }
}
class ue {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, r, n, a) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = i, this._$AM = n, this.options = a, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = m;
  }
  _$AI(e, i = this, r, n) {
    const a = this.strings;
    let o = !1;
    if (a === void 0) e = U(this, e, i, 0), o = !q(e) || e !== this._$AH && e !== z, o && (this._$AH = e);
    else {
      const d = e;
      let s, l;
      for (e = a[0], s = 0; s < a.length - 1; s++) l = U(this, d[r + s], i, s), l === z && (l = this._$AH[s]), o || (o = !q(l) || l !== this._$AH[s]), l === m ? e = m : e !== m && (e += (l ?? "") + a[s + 1]), this._$AH[s] = l;
    }
    o && !n && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class li extends ue {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
class ci extends ue {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
}
class ui extends ue {
  constructor(e, i, r, n, a) {
    super(e, i, r, n, a), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = U(this, e, i, 0) ?? m) === z) return;
    const r = this._$AH, n = e === m && r !== m || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, a = e !== m && (r === m || n);
    n && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var i;
    typeof this._$AH == "function" ? this._$AH.call(((i = this.options) == null ? void 0 : i.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class hi {
  constructor(e, i, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    U(this, e);
  }
}
const me = Z.litHtmlPolyfillSupport;
me == null || me(Y, J), (Z.litHtmlVersions ?? (Z.litHtmlVersions = [])).push("3.3.3");
const gi = (t, e, i) => {
  const r = (i == null ? void 0 : i.renderBefore) ?? e;
  let n = r._$litPart$;
  if (n === void 0) {
    const a = (i == null ? void 0 : i.renderBefore) ?? null;
    r._$litPart$ = n = new J(e.insertBefore(j(), a), a, void 0, i ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const C = globalThis;
class P extends L {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var i;
    const e = super.createRenderRoot();
    return (i = this.renderOptions).renderBefore ?? (i.renderBefore = e.firstChild), e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = gi(i, this.renderRoot, this.renderOptions);
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
    return z;
  }
}
var pt;
P._$litElement$ = !0, P.finalized = !0, (pt = C.litElementHydrateSupport) == null || pt.call(C, { LitElement: P });
const pe = C.litElementPolyfillSupport;
pe == null || pe({ LitElement: P });
(C.litElementVersions ?? (C.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const mi = { attribute: !0, type: String, converter: de, reflect: !1, hasChanged: Me }, pi = (t = mi, e, i) => {
  const { kind: r, metadata: n } = i;
  let a = globalThis.litPropertyMetadata.get(n);
  if (a === void 0 && globalThis.litPropertyMetadata.set(n, a = /* @__PURE__ */ new Map()), r === "setter" && ((t = Object.create(t)).wrapped = !0), a.set(i.name, t), r === "accessor") {
    const { name: o } = i;
    return { set(d) {
      const s = e.get.call(this);
      e.set.call(this, d), this.requestUpdate(o, s, t, !0, d);
    }, init(d) {
      return d !== void 0 && this.C(o, void 0, t, d), d;
    } };
  }
  if (r === "setter") {
    const { name: o } = i;
    return function(d) {
      const s = this[o];
      e.call(this, d), this.requestUpdate(o, s, t, !0, d);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function T(t) {
  return (e, i) => typeof i == "object" ? pi(t, e, i) : ((r, n, a) => {
    const o = n.hasOwnProperty(a);
    return n.constructor.createProperty(a, r), o ? Object.getOwnPropertyDescriptor(n, a) : void 0;
  })(t, e, i);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function _(t) {
  return T({ ...t, state: !0, attribute: !1 });
}
const qe = {
  nearTargetThreshold: 5,
  targetReachedTolerance: 2
}, fi = {
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
function Tt(t, e) {
  if (!(t === void 0 || e === void 0))
    return t - e;
}
function Et(t) {
  return {
    nearTargetThreshold: Ye(
      t.nearTargetThreshold,
      qe.nearTargetThreshold
    ),
    targetReachedTolerance: Ye(
      t.targetReachedTolerance,
      qe.targetReachedTolerance
    )
  };
}
function Rt(t, e, i) {
  const r = Tt(t, e);
  if (r === void 0)
    return "unavailable";
  const n = Et(i);
  return r < -20 ? "far_below" : r <= -n.nearTargetThreshold ? "heating" : r < -n.targetReachedTolerance ? "near_target" : r <= n.targetReachedTolerance ? "target_reached" : "above_target";
}
function _i(t, e) {
  return t === void 0 || e === void 0 || e <= 0 ? 0 : Math.min(Math.max(t / e, 0), 1);
}
function $t(t, e, i) {
  return {
    difference: Tt(t, e),
    progress: _i(t, e),
    status: Rt(t, e, i)
  };
}
function At(t) {
  return fi[t];
}
function Ye(t, e) {
  return t === void 0 || !Number.isFinite(t) ? e : Math.max(0, t);
}
const kt = "custom:sauna-suite-card", yi = "sauna-suite-card", bi = "sauna-suite-card", Dt = "sauna-suite-editor", wi = "fceeb-sauna-suite-temperature-trend";
function xe(t, e, i) {
  t.get(e) || t.define(e, i);
}
var vi = Object.defineProperty, F = (t, e, i, r) => {
  for (var n = void 0, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (n = o(e, i, n) || n);
  return n && vi(e, i, n), n;
};
const te = 240, ie = 80, S = 8;
class k extends P {
  constructor() {
    super(...arguments), this.samples = [], this.status = "unavailable", this.direction = "idle", this.emptyLabel = "No trend data available";
  }
  createRenderRoot() {
    return this;
  }
  render() {
    if (this.samples.length < 2)
      return h`<div class="trend-empty">${this.emptyLabel}</div>`;
    const e = this.getLineColor(), i = this.createLinePath(), r = this.createAreaPath(i), n = this.createTargetReferencePath(), a = this.createCurrentPoint();
    return h`
      <svg
        class=${`trend ${this.direction}`}
        viewBox="0 0 240 80"
        role="img"
        aria-label=${this.emptyLabel}
      >
        <defs>
          <linearGradient id="sauna-suite-trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color=${e} stop-opacity="0.24"></stop>
            <stop offset="100%" stop-color=${e} stop-opacity="0.01"></stop>
          </linearGradient>
        </defs>
        ${N`<path d=${r} fill="url(#sauna-suite-trend-fill)"></path>`}
        ${n ? N`<path class="target-reference-line" d=${n} fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 5" stroke-linecap="round"></path>` : void 0}
        ${N`<path class="trend-line" d=${i} fill="none" stroke=${e} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`}
        ${a ? N`<circle class="current-value-marker" cx=${String(a.x)} cy=${String(a.y)} r="4.2" fill=${e} stroke="currentColor" stroke-width="1.5"></circle>` : void 0}
        ${this.heatingRateLabel ? N`<text class="heating-rate-annotation" x="232" y="18" text-anchor="end">${this.heatingRateLabel}</text>` : void 0}
      </svg>
    `;
  }
  createLinePath() {
    return this.samples.map((e, i) => {
      const r = this.mapSampleToPoint(e, i);
      return `${i === 0 ? "M" : "L"} ${r.x.toFixed(1)} ${r.y.toFixed(1)}`;
    }).join(" ");
  }
  createTargetReferencePath() {
    if (this.targetValue === void 0 || !Number.isFinite(this.targetValue))
      return;
    const e = this.mapValueToY(this.targetValue);
    return `M ${S} ${e.toFixed(1)} L ${te - S} ${e.toFixed(1)}`;
  }
  createCurrentPoint() {
    if (!(this.currentValue === void 0 || !Number.isFinite(this.currentValue)))
      return {
        x: te - S,
        y: this.mapValueToY(this.currentValue)
      };
  }
  createAreaPath(e) {
    return `${e} L ${te - S} ${ie - S / 2} L ${S} ${ie - S / 2} Z`;
  }
  mapSampleToPoint(e, i) {
    const r = (te - S * 2) / (this.samples.length - 1);
    return {
      x: S + i * r,
      y: this.mapValueToY(e.value)
    };
  }
  mapValueToY(e) {
    const { minimum: i, range: r } = this.getValueRange();
    return ie - S - (e - i) / r * (ie - S * 2);
  }
  getValueRange() {
    const e = this.samples.map((n) => n.value);
    this.targetValue !== void 0 && Number.isFinite(this.targetValue) && e.push(this.targetValue), this.currentValue !== void 0 && Number.isFinite(this.currentValue) && e.push(this.currentValue);
    const i = Math.min(...e), r = Math.max(...e);
    return {
      minimum: i,
      range: r - i || 1
    };
  }
  getLineColor() {
    return this.direction === "cooling" ? "#4ea3ff" : At(this.status).line;
  }
}
F([
  T({ attribute: !1 })
], k.prototype, "samples");
F([
  T()
], k.prototype, "status");
F([
  T()
], k.prototype, "direction");
F([
  T({ attribute: "empty-label" })
], k.prototype, "emptyLabel");
F([
  T({ attribute: "target-value", type: Number })
], k.prototype, "targetValue");
F([
  T({ attribute: "current-value", type: Number })
], k.prototype, "currentValue");
F([
  T({ attribute: "heating-rate-label" })
], k.prototype, "heatingRateLabel");
xe(customElements, wi, k);
function I(t, e, i) {
  if (fe(t, "value"), fe(e, "minimum"), fe(i, "maximum"), e > i)
    throw new RangeError("minimum must be less than or equal to maximum");
  return Math.min(Math.max(t, e), i);
}
function fe(t, e) {
  if (!Number.isFinite(t))
    throw new RangeError(`${e} must be a finite number`);
}
const Si = 0.02, Ti = -0.02;
function Ei(t, e) {
  const i = t.filter(
    (a) => Number.isFinite(a.timestamp) && Number.isFinite(a.value) && a.timestamp >= 0
  ).sort((a, o) => a.timestamp - o.timestamp);
  if (i.length < e)
    return {
      validSampleCount: i.length,
      validSlopeCount: 0
    };
  const r = $i(i);
  if (r.length === 0)
    return {
      validSampleCount: i.length,
      validSlopeCount: 0
    };
  const n = Ai(r);
  return {
    rateCPerMinute: Ee(n),
    validSampleCount: i.length,
    validSlopeCount: n.length
  };
}
function Ri(t) {
  return t !== void 0 && Number.isFinite(t) && t >= Si;
}
function Qe(t) {
  return t !== void 0 && Number.isFinite(t) && t <= Ti;
}
function $i(t) {
  const e = [];
  for (let i = 1; i < t.length; i += 1) {
    const r = t[i - 1], n = t[i];
    if (!r || !n)
      continue;
    const a = (n.timestamp - r.timestamp) / 6e4;
    if (!Number.isFinite(a) || a <= 0)
      continue;
    const o = (n.value - r.value) / a;
    Number.isFinite(o) && e.push(o);
  }
  return e;
}
function Ai(t) {
  const e = Ee(t), i = t.map((o) => Math.abs(o - e)), r = Ee(i), n = Math.max(0.05, r * 3), a = t.filter((o) => Math.abs(o - e) <= n);
  return a.length > 0 ? a : [...t];
}
function Ee(t) {
  const e = [...t].sort((n, a) => n - a), i = Math.floor(e.length / 2), r = e[i] ?? 0;
  return e.length % 2 === 1 ? r : ((e[i - 1] ?? r) + r) / 2;
}
const ki = 20, Di = 0.85, Mi = 1.25, Ni = 0.75, xi = 1.5;
function Ci(t) {
  const e = Pi(
    t.outsideTemperature,
    t.outsideTemperatureWeight
  ), i = Oi(
    t.effectivePowerKw,
    t.nominalPowerKw
  );
  if (t.currentTemperature === void 0 || t.targetTemperature === void 0 || !Number.isFinite(t.currentTemperature) || !Number.isFinite(t.targetTemperature))
    return {
      outsideCorrectionFactor: e,
      powerCorrectionFactor: i,
      unavailableReason: "missing_temperature"
    };
  const r = t.targetTemperature - t.currentTemperature;
  if (r <= 0)
    return {
      outsideCorrectionFactor: e,
      powerCorrectionFactor: i,
      unavailableReason: "target_reached"
    };
  if (t.effectivePowerKw === 0)
    return {
      outsideCorrectionFactor: e,
      powerCorrectionFactor: i,
      unavailableReason: "heater_off"
    };
  if (t.effectivePowerKw === void 0 || !Number.isFinite(t.effectivePowerKw) || t.effectivePowerKw < 0)
    return {
      outsideCorrectionFactor: e,
      powerCorrectionFactor: i,
      unavailableReason: "missing_power"
    };
  if (t.hasInsufficientHistory)
    return {
      outsideCorrectionFactor: e,
      powerCorrectionFactor: i,
      unavailableReason: "insufficient_history"
    };
  const n = t.heatingRateCPerMinute;
  if (!Ri(n))
    return {
      outsideCorrectionFactor: e,
      powerCorrectionFactor: i,
      unavailableReason: "invalid_rate"
    };
  const o = r / n;
  return {
    etaMinutes: o * e * i,
    baseEtaMinutes: o,
    outsideCorrectionFactor: e,
    powerCorrectionFactor: i
  };
}
function Pi(t, e) {
  if (t === void 0 || !Number.isFinite(t))
    return 1;
  const r = 1 + Math.max(0, e) * ((ki - t) / 40);
  return I(r, Di, Mi);
}
function Oi(t, e) {
  return t === void 0 || !Number.isFinite(t) || t <= 0 || !Number.isFinite(e) || e <= 0 ? 1 : I(e / t, Ni, xi);
}
function Fi(t, e) {
  if (t === void 0 || !Number.isFinite(t) || t < 0)
    return;
  const i = Math.max(1, Math.round(t));
  if (i < 60)
    return `${e.readyIn} ${i} ${i === 1 ? e.minute : e.minutes}`;
  const r = Math.floor(i / 60), n = i % 60, a = r === 1 ? e.hour : e.hours;
  return n === 0 ? `${e.readyIn} ${r} ${a}` : `${e.readyIn} ${r} ${a} ${n} ${n === 1 ? e.minute : e.minutes}`;
}
function Hi(t, e, i) {
  if (t === void 0 || !Number.isFinite(t) || t < 0)
    return;
  const r = new Date(e.getTime() + t * 6e4);
  return new Intl.DateTimeFormat(i, {
    hour: "2-digit",
    minute: "2-digit"
  }).format(r);
}
const _e = {
  green: { red: 42, green: 202, blue: 116 },
  gold: { red: 238, green: 185, blue: 58 },
  red: { red: 232, green: 80, blue: 56 },
  blue: { red: 63, green: 140, blue: 255 },
  purple: { red: 158, green: 111, blue: 255 },
  white: { red: 255, green: 244, blue: 224 }
}, Je = { red: 63, green: 140, blue: 255 }, Xe = { red: 34, green: 199, blue: 216 }, et = { red: 47, green: 184, blue: 111 }, Li = { red: 235, green: 205, blue: 74 }, Bi = { red: 215, green: 179, blue: 57 }, zi = { red: 236, green: 134, blue: 50 }, Ui = { red: 228, green: 93, blue: 63 }, Ii = { red: 128, green: 128, blue: 128 };
function tt(t, e, i) {
  const r = $t(t, e, i), n = Et(i), a = r.difference === void 0 ? Ii : Wi(
    r.difference,
    n.nearTargetThreshold,
    n.targetReachedTolerance
  );
  return {
    rgb: a,
    hs: Mt(a),
    status: r.status
  };
}
function Vi(t) {
  return t && t in _e ? _e[t] : _e.green;
}
function X(t) {
  return {
    red: ye(t.red),
    green: ye(t.green),
    blue: ye(t.blue)
  };
}
function Gi(t) {
  const e = X(t);
  return [e.red, e.green, e.blue];
}
function Mt(t) {
  const e = X(t), i = e.red / 255, r = e.green / 255, n = e.blue / 255, a = Math.max(i, r, n), o = Math.min(i, r, n), d = a - o;
  if (d === 0)
    return { hue: 0, saturation: 0 };
  let s;
  return a === i ? s = (r - n) / d % 6 : a === r ? s = (n - i) / d + 2 : s = (i - r) / d + 4, s = Math.round(s * 60), s < 0 && (s += 360), {
    hue: s,
    saturation: Number((d / a * 100).toFixed(1))
  };
}
function Wi(t, e, i) {
  if (t < -20)
    return Je;
  if (t <= -e) {
    const r = Math.max(1, 20 - e), n = se((t + 20) / r);
    return n < 0.5 ? re(Je, Xe, n * 2) : re(Xe, et, (n - 0.5) * 2);
  }
  if (t < -i) {
    const r = Math.max(1, e - i);
    return re(et, Li, se((t + e) / r));
  }
  return t <= i ? Bi : re(zi, Ui, se((t - i) / 20));
}
function re(t, e, i) {
  const r = se(i);
  return {
    red: Math.round(t.red + (e.red - t.red) * r),
    green: Math.round(t.green + (e.green - t.green) * r),
    blue: Math.round(t.blue + (e.blue - t.blue) * r)
  };
}
function se(t) {
  return Number.isFinite(t) ? Math.min(Math.max(t, 0), 1) : 0;
}
function ye(t) {
  return t === void 0 || !Number.isFinite(t) ? 0 : Math.round(Math.min(Math.max(t, 0), 255));
}
function Re() {
  return {
    eligible: !0,
    ready: !1,
    acknowledged: !1
  };
}
function Ki(t, e) {
  if (!e.saunaOn)
    return {
      state: Re(),
      triggered: !1
    };
  const i = $e(e), r = Zi(e), n = r ? !0 : t.eligible, a = r ? !1 : t.acknowledged, o = i && n && !a && !t.ready;
  return {
    state: {
      eligible: o ? !1 : n,
      ready: i,
      acknowledged: a
    },
    triggered: o
  };
}
function $e(t) {
  return t.saunaOn ? Rt(t.controlTemperature, t.targetTemperature, t.thresholds) === "target_reached" : !1;
}
function Zi(t) {
  if (t.controlTemperature === void 0 || t.targetTemperature === void 0)
    return !1;
  const e = typeof t.thresholds.nearTargetThreshold == "number" && Number.isFinite(t.thresholds.nearTargetThreshold) ? Math.max(0, t.thresholds.nearTargetThreshold) : 5;
  return t.controlTemperature < t.targetTemperature - e;
}
const ji = [
  "input_button",
  "button",
  "input_boolean",
  "binary_sensor"
];
function Nt(t, e) {
  return e && (t === "card_only" || t === "card_or_entity");
}
function qi(t) {
  return t === "entity_only" || t === "card_or_entity";
}
function Ce(t) {
  const e = t == null ? void 0 : t.split(".")[0];
  return ji.includes(e) ? e : void 0;
}
function Yi(t, e, i) {
  return i ? i.acknowledged ? { acknowledged: !1, reason: "already_acknowledged" } : Nt(t, e) ? { acknowledged: !0, reason: "card" } : { acknowledged: !1, reason: "mode_disallows" } : { acknowledged: !1, reason: "missing_entity" };
}
function Qi(t, e, i, r, n) {
  if (!r || !i)
    return { acknowledged: !1, reason: "missing_entity" };
  if (r.acknowledged)
    return { acknowledged: !1, reason: "already_acknowledged" };
  if (!qi(t))
    return { acknowledged: !1, reason: "mode_disallows" };
  const a = Ce(e);
  if (!a)
    return { acknowledged: !1, reason: "unsupported_entity" };
  if (!n || n.entityId !== e || n.domain !== a)
    return { acknowledged: !1, reason: "stale_transition" };
  const o = Pe(i);
  return o === void 0 || o <= r.startedAt ? { acknowledged: !1, reason: "stale_transition" } : a === "input_button" || a === "button" ? o > (n.transitionTime ?? r.startedAt) ? { acknowledged: !0, reason: "entity" } : { acknowledged: !1, reason: "stale_transition" } : (a === "input_boolean" || a === "binary_sensor") && n.armedForOnEdge && n.state === "off" && i.state === "on" ? { acknowledged: !0, reason: "entity" } : { acknowledged: !1, reason: "stale_transition" };
}
function xt(t, e) {
  const i = Ce(t);
  if (!(!i || !t || !e))
    return {
      entityId: t,
      domain: i,
      state: e.state,
      transitionTime: Pe(e),
      armedForOnEdge: e.state === "off"
    };
}
function Ji(t, e, i) {
  const r = Ce(e);
  if (!(!r || !e || !i))
    return !t || t.entityId !== e || t.domain !== r ? xt(e, i) : (r === "input_boolean" || r === "binary_sensor") && i.state === "off" ? {
      ...t,
      state: "off",
      transitionTime: Pe(i),
      armedForOnEdge: !0
    } : t;
}
function Pe(t) {
  const e = Date.parse(t.last_changed || t.last_updated);
  return Number.isFinite(e) ? e : void 0;
}
function Xi(t, e) {
  return {
    id: t,
    startedAt: e,
    active: !0,
    acknowledged: !1,
    channels: {
      rgb: !1,
      media: !1
    },
    failures: {}
  };
}
function er(t, e) {
  return {
    ...t,
    active: !1,
    acknowledged: !0,
    acknowledgedAt: e,
    channels: {
      rgb: !1,
      media: !1
    }
  };
}
function it(t, e, i) {
  return {
    ...t,
    channels: {
      ...t.channels,
      [e]: i
    }
  };
}
function tr(t, e, i) {
  return {
    ...t,
    failures: {
      ...t.failures,
      [e]: i
    }
  };
}
function ir(t, e) {
  return t ? t.failures.rgb ? "rgb_unavailable" : t.failures.media ? "media_unavailable" : t.acknowledged ? "acknowledged" : e && t.active ? "waiting_for_acknowledgement" : t.channels.rgb || t.channels.media ? "signaling" : t.active ? "ready" : "none" : "none";
}
const Ct = [
  "top",
  "middle",
  "bottom",
  "average",
  "weighted_average",
  "minimum",
  "maximum"
], Pt = ["fixed", "general_power_sensor"], Ot = ["off", "temperature_gradient", "ready_only"], Ft = ["hold", "blink", "pulse"], Ht = ["green", "gold", "red", "blue", "purple", "white"], Lt = ["card_only", "entity_only", "card_or_entity"], Bt = ["tts", "media"], zt = "Sauna Suite", be = 1, rt = 9, rr = 0.15, nr = 5, ar = 30, or = 5, sr = 2, dr = 120, lr = 5, cr = 100, ur = 5, hr = 100, gr = 1, mr = 30, pr = 60, fr = "Sauna is ready.", _r = 0.5, yr = 60;
function D() {
  return {
    type: kt,
    name: zt,
    control_temperature_mode: "average",
    heating_power_mode: "fixed",
    fixed_heater_power_kw: rt,
    heater_rated_power_kw: rt,
    outside_temperature_weight: rr,
    weight_top: be,
    weight_middle: be,
    weight_bottom: be,
    show_outside_temperature: !1,
    show_temperature_zones: !0,
    show_eta: !0,
    show_ready_time: !0,
    show_heating_rate: !0,
    eta_minimum_samples: nr,
    eta_history_minutes: ar,
    near_target_threshold: or,
    target_reached_tolerance: sr,
    show_temperature_trend: !0,
    trend_history_minutes: dr,
    trend_refresh_minutes: lr,
    confirm_switch_on: !0,
    rgb_enabled: !1,
    rgb_mode: "temperature_gradient",
    rgb_brightness: cr,
    rgb_update_interval_seconds: ur,
    rgb_restore_previous_state: !0,
    rgb_only_when_sauna_on: !0,
    ready_signal_enabled: !0,
    ready_signal_mode: "hold",
    ready_signal_color: "green",
    ready_signal_brightness: hr,
    ready_signal_interval_seconds: gr,
    ready_signal_duration_seconds: mr,
    ready_signal_requires_acknowledgement: !1,
    ready_signal_repeat: !1,
    ready_signal_repeat_interval_seconds: pr,
    acknowledgement_mode: "card_or_entity",
    acknowledgement_reset_input_boolean: !1,
    show_acknowledge_button: !0,
    media_notification_enabled: !1,
    media_notification_mode: "tts",
    media_notification_message: fr,
    media_notification_volume: _r,
    media_notification_repeat: !1,
    media_notification_repeat_interval_seconds: yr,
    media_notification_stop_on_acknowledge: !0,
    media_notification_restore_volume: !0
  };
}
function B(t) {
  const e = D(), i = {
    type: kt,
    name: Ae(t.name, zt),
    control_temperature_mode: br(t.control_temperature_mode),
    heating_power_mode: wr(t.heating_power_mode),
    fixed_heater_power_kw: R(
      t.fixed_heater_power_kw,
      e.fixed_heater_power_kw,
      0,
      50
    ),
    heater_rated_power_kw: R(
      t.heater_rated_power_kw,
      e.heater_rated_power_kw,
      0,
      50
    ),
    outside_temperature_weight: R(
      t.outside_temperature_weight,
      e.outside_temperature_weight,
      0,
      1
    ),
    weight_top: we(t.weight_top, e.weight_top),
    weight_middle: we(t.weight_middle, e.weight_middle),
    weight_bottom: we(t.weight_bottom, e.weight_bottom),
    show_outside_temperature: g(
      t.show_outside_temperature,
      e.show_outside_temperature
    ),
    show_temperature_zones: g(
      t.show_temperature_zones,
      e.show_temperature_zones
    ),
    show_eta: g(t.show_eta, e.show_eta),
    show_ready_time: g(t.show_ready_time, e.show_ready_time),
    show_heating_rate: g(t.show_heating_rate, e.show_heating_rate),
    eta_minimum_samples: E(
      t.eta_minimum_samples,
      e.eta_minimum_samples,
      2,
      60
    ),
    eta_history_minutes: R(
      t.eta_history_minutes,
      e.eta_history_minutes,
      5,
      1440
    ),
    near_target_threshold: nt(
      t.near_target_threshold,
      e.near_target_threshold
    ),
    target_reached_tolerance: nt(
      t.target_reached_tolerance,
      e.target_reached_tolerance
    ),
    show_temperature_trend: g(
      t.show_temperature_trend,
      e.show_temperature_trend
    ),
    trend_history_minutes: R(
      t.trend_history_minutes,
      e.trend_history_minutes,
      15,
      1440
    ),
    trend_refresh_minutes: R(
      t.trend_refresh_minutes,
      e.trend_refresh_minutes,
      1,
      60
    ),
    confirm_switch_on: g(t.confirm_switch_on, e.confirm_switch_on),
    rgb_enabled: g(t.rgb_enabled, e.rgb_enabled),
    rgb_mode: vr(t.rgb_mode),
    rgb_brightness: E(t.rgb_brightness, e.rgb_brightness, 1, 100),
    rgb_update_interval_seconds: E(
      t.rgb_update_interval_seconds,
      e.rgb_update_interval_seconds,
      1,
      3600
    ),
    rgb_restore_previous_state: g(
      t.rgb_restore_previous_state,
      e.rgb_restore_previous_state
    ),
    rgb_only_when_sauna_on: g(
      t.rgb_only_when_sauna_on,
      e.rgb_only_when_sauna_on
    ),
    ready_signal_enabled: g(
      t.ready_signal_enabled,
      e.ready_signal_enabled
    ),
    ready_signal_mode: Sr(t.ready_signal_mode),
    ready_signal_color: Tr(t.ready_signal_color),
    ready_signal_brightness: E(
      t.ready_signal_brightness,
      e.ready_signal_brightness,
      1,
      100
    ),
    ready_signal_interval_seconds: E(
      t.ready_signal_interval_seconds,
      e.ready_signal_interval_seconds,
      1,
      3600
    ),
    ready_signal_duration_seconds: E(
      t.ready_signal_duration_seconds,
      e.ready_signal_duration_seconds,
      1,
      3600
    ),
    ready_signal_requires_acknowledgement: g(
      t.ready_signal_requires_acknowledgement,
      e.ready_signal_requires_acknowledgement
    ),
    ready_signal_repeat: g(t.ready_signal_repeat, e.ready_signal_repeat),
    ready_signal_repeat_interval_seconds: E(
      t.ready_signal_repeat_interval_seconds,
      e.ready_signal_repeat_interval_seconds,
      1,
      86400
    ),
    acknowledgement_mode: Er(t.acknowledgement_mode),
    acknowledgement_reset_input_boolean: g(
      t.acknowledgement_reset_input_boolean,
      e.acknowledgement_reset_input_boolean
    ),
    show_acknowledge_button: g(
      t.show_acknowledge_button,
      e.show_acknowledge_button
    ),
    media_notification_enabled: g(
      t.media_notification_enabled,
      e.media_notification_enabled
    ),
    media_notification_mode: Rr(t.media_notification_mode),
    media_notification_message: Ae(
      t.media_notification_message,
      e.media_notification_message
    ),
    media_notification_volume: R(
      t.media_notification_volume,
      e.media_notification_volume,
      0,
      1
    ),
    media_notification_repeat: g(
      t.media_notification_repeat,
      e.media_notification_repeat
    ),
    media_notification_repeat_interval_seconds: E(
      t.media_notification_repeat_interval_seconds,
      e.media_notification_repeat_interval_seconds,
      1,
      86400
    ),
    media_notification_stop_on_acknowledge: g(
      t.media_notification_stop_on_acknowledge,
      e.media_notification_stop_on_acknowledge
    ),
    media_notification_restore_volume: g(
      t.media_notification_restore_volume,
      e.media_notification_restore_volume
    )
  };
  return w(i, "main_switch_entity", t.main_switch_entity), w(i, "temperature_top_entity", t.temperature_top_entity), w(i, "temperature_middle_entity", t.temperature_middle_entity), w(i, "temperature_bottom_entity", t.temperature_bottom_entity), w(i, "outside_temperature_entity", t.outside_temperature_entity), w(i, "target_temperature_entity", t.target_temperature_entity), w(
    i,
    "general_power_sensor_entity",
    t.general_power_sensor_entity
  ), w(i, "rgb_light_entity", t.rgb_light_entity), w(i, "acknowledgement_entity", t.acknowledgement_entity), w(i, "media_player_entity", t.media_player_entity), w(
    i,
    "media_notification_media_id",
    t.media_notification_media_id
  ), w(i, "tts_entity", t.tts_entity), i;
}
function br(t) {
  return typeof t == "string" && Ct.includes(t) ? t : D().control_temperature_mode;
}
function wr(t) {
  return typeof t == "string" && Pt.includes(t) ? t : D().heating_power_mode;
}
function vr(t) {
  return typeof t == "string" && Ot.includes(t) ? t : D().rgb_mode;
}
function Sr(t) {
  return typeof t == "string" && Ft.includes(t) ? t : D().ready_signal_mode;
}
function Tr(t) {
  return typeof t == "string" && Ht.includes(t) ? t : D().ready_signal_color;
}
function Er(t) {
  return typeof t == "string" && Lt.includes(t) ? t : D().acknowledgement_mode;
}
function Rr(t) {
  return typeof t == "string" && Bt.includes(t) ? t : D().media_notification_mode;
}
function we(t, e) {
  return typeof t != "number" || !Number.isFinite(t) ? e : Math.max(0, t);
}
function g(t, e) {
  return typeof t == "boolean" ? t : e;
}
function nt(t, e) {
  return typeof t != "number" || !Number.isFinite(t) ? e : Math.max(0, t);
}
function Ae(t, e) {
  return typeof t == "string" ? t : e;
}
function w(t, e, i) {
  const r = Ae(i);
  r !== void 0 && (t[e] = r);
}
function R(t, e, i, r) {
  return typeof t != "number" || !Number.isFinite(t) ? e : I(t, i, r);
}
function E(t, e, i, r) {
  return Math.round(R(t, e, i, r));
}
function Ut(t) {
  return V(t) === "switch" || V(t) === "input_boolean";
}
function It(t) {
  return V(t) === "number" || V(t) === "input_number";
}
function ne(t) {
  return !t || t.state === "unavailable" || t.state === "unknown";
}
async function $r(t, e, i) {
  if (!(t != null && t.callService))
    return { ok: !1, error: "Home Assistant service API is unavailable." };
  if (!Ut(e))
    return { ok: !1, error: "Unsupported switch entity domain." };
  const r = V(e), n = i ? "turn_on" : "turn_off";
  try {
    return await t.callService(r, n, { entity_id: e }), { ok: !0 };
  } catch (a) {
    return {
      ok: !1,
      error: a instanceof Error ? a.message : "Failed to update switch entity."
    };
  }
}
async function Ar(t, e, i, r) {
  if (!(t != null && t.callService))
    return { ok: !1, error: "Home Assistant service API is unavailable." };
  if (!It(e))
    return { ok: !1, error: "Unsupported target temperature entity domain." };
  const n = V(e), a = kr(i, r);
  try {
    return await t.callService(n, "set_value", {
      entity_id: e,
      value: a
    }), { ok: !0 };
  } catch (o) {
    return {
      ok: !1,
      error: o instanceof Error ? o.message : "Failed to update target temperature."
    };
  }
}
function at(t) {
  if (!t)
    return;
  const e = ve(t, "min"), i = ve(t, "max"), r = ve(t, "step");
  if (!(e === void 0 || i === void 0 || r === void 0 || r <= 0))
    return {
      minimum: e,
      maximum: i,
      step: r
    };
}
function kr(t, e) {
  const i = I(t, e.minimum, e.maximum), r = Math.round((i - e.minimum) / e.step), n = e.minimum + r * e.step, a = Dr(e.step);
  return Number(I(n, e.minimum, e.maximum).toFixed(a));
}
function V(t) {
  return (t == null ? void 0 : t.split(".")[0]) ?? "";
}
function ve(t, e) {
  const i = t.attributes[e], r = typeof i == "number" ? i : Number(i);
  return Number.isFinite(r) ? r : void 0;
}
function Dr(t) {
  const [, e = ""] = t.toString().split(".");
  return e.length;
}
function Mr(t) {
  const e = typeof t == "number" ? t : Number(t);
  return Number.isFinite(e) ? e : void 0;
}
function Nr(t, e) {
  if (t === void 0 || !Number.isFinite(t))
    return;
  const i = e == null ? void 0 : e.trim().toLowerCase();
  if (i === "w")
    return t / 1e3;
  if (i === "kw" || i === void 0 || i === "")
    return t;
}
function ce(t) {
  if (!(t === void 0 || !Number.isFinite(t) || t < 0))
    return t;
}
function xr(t, e) {
  return ce(Nr(Mr(t), e));
}
function Cr(t, e) {
  const i = ce(t), r = ce(e);
  if (!(i === void 0 || r === void 0))
    return Math.min(i, r);
}
const Pr = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function Vt(t) {
  if (t === void 0)
    return;
  if (typeof t == "number")
    return Number.isFinite(t) ? t : void 0;
  const e = t.trim().toLowerCase();
  if (Pr.has(e))
    return;
  const i = Number(t);
  return Number.isFinite(i) ? i : void 0;
}
function Or(t) {
  const e = t.filter(Number.isFinite);
  return e.length === 0 ? void 0 : e.reduce((r, n) => r + n, 0) / e.length;
}
function Fr(t, e) {
  const i = Gt(t).map((a) => ({
    value: t[a],
    weight: Ir(e[a])
  })).filter((a) => a.value !== void 0), r = i.reduce((a, o) => a + o.weight, 0);
  return i.length === 0 || r <= 0 ? void 0 : i.reduce((a, o) => a + o.value * o.weight, 0) / r;
}
function Hr(t) {
  const e = Oe(t);
  return e.length > 0 ? Math.min(...e) : void 0;
}
function Lr(t) {
  const e = Oe(t);
  return e.length > 0 ? Math.max(...e) : void 0;
}
function Br(t, e, i) {
  switch (e) {
    case "top":
      return t.top;
    case "middle":
      return t.middle;
    case "bottom":
      return t.bottom;
    case "average":
      return Or(Oe(t));
    case "weighted_average":
      return Fr(t, i);
    case "minimum":
      return Hr(t);
    case "maximum":
      return Lr(t);
  }
}
function zr(t) {
  if (!(t.top === void 0 || t.bottom === void 0))
    return t.top - t.bottom;
}
function Ur(t, e, i) {
  return {
    controlTemperature: Br(t, e, i),
    stratification: zr(t)
  };
}
function Oe(t) {
  return Gt(t).map((e) => t[e]).filter((e) => e !== void 0);
}
function Gt(t) {
  return ["top", "middle", "bottom"].filter((i) => t[i] !== void 0);
}
function Ir(t) {
  return Number.isFinite(t) ? Math.max(0, t) : 0;
}
function H(t, e) {
  const i = {
    top: W(t, e.temperature_top_entity),
    middle: W(t, e.temperature_middle_entity),
    bottom: W(t, e.temperature_bottom_entity)
  }, r = {
    top: e.weight_top,
    middle: e.weight_middle,
    bottom: e.weight_bottom
  };
  return {
    zones: i,
    outsideTemperature: W(t, e.outside_temperature_entity),
    targetTemperature: W(t, e.target_temperature_entity),
    summary: Ur(i, e.control_temperature_mode, r)
  };
}
function W(t, e) {
  var i;
  if (!(!t || !e))
    return Vt((i = t.states[e]) == null ? void 0 : i.state);
}
function p(t, e) {
  if (!(!t || !e))
    return t.states[e];
}
function Vr(t, e) {
  const i = p(t, e.main_switch_entity), r = Kr(e);
  return (i == null ? void 0 : i.state) === "off" ? {
    effectivePowerKw: 0,
    nominalPowerKw: r,
    mode: e.heating_power_mode,
    approximate: e.heating_power_mode === "general_power_sensor"
  } : e.heating_power_mode === "general_power_sensor" ? {
    effectivePowerKw: Gr(t, e),
    nominalPowerKw: r,
    mode: e.heating_power_mode,
    approximate: !0
  } : {
    effectivePowerKw: ce(e.fixed_heater_power_kw),
    nominalPowerKw: r,
    mode: e.heating_power_mode,
    approximate: !1
  };
}
function Gr(t, e) {
  const i = p(t, e.general_power_sensor_entity), r = Wr(i);
  return Cr(r, e.heater_rated_power_kw);
}
function Wr(t) {
  if (!t || t.state === "unavailable" || t.state === "unknown")
    return;
  const e = t.attributes.unit_of_measurement;
  return xr(
    t.state,
    typeof e == "string" ? e : void 0
  );
}
function Kr(t) {
  return t.heating_power_mode === "general_power_sensor" ? t.heater_rated_power_kw : t.fixed_heater_power_kw;
}
class Zr {
  constructor() {
    this.lastCommandAt = 0;
  }
  async sync(e) {
    var u;
    if (!this.shouldBeActive(e.config, e.saunaOn, e.command))
      return this.release(e.hass);
    if (!((u = e.hass) != null && u.callService))
      return { ok: !0, active: !1, status: "inactive" };
    if (!Kt(e.config.rgb_light_entity))
      return {
        ok: !1,
        active: !1,
        status: "unsupported",
        error: "Unsupported light entity."
      };
    if (!e.light || e.light.state === "unavailable" || e.light.state === "unknown")
      return { ok: !1, active: !1, status: "unavailable", error: "Light unavailable." };
    const r = Yr(e.command), n = Wt(e.light);
    if (!r.off && !n.supported)
      return {
        ok: !1,
        active: !1,
        status: "unsupported",
        error: "Configured light does not support color control."
      };
    const a = e.config.rgb_light_entity;
    if (this.controlledEntityId && this.controlledEntityId !== a) {
      const c = await this.release(e.hass);
      if (!c.ok)
        return c;
    }
    const o = jr(a, n.capability, r), d = JSON.stringify(o), s = e.now ?? Date.now(), l = e.config.rgb_update_interval_seconds * 1e3;
    if (this.lastCommandKey === d)
      return { ok: !0, active: !0, status: "throttled" };
    if (this.lastCommandKey !== void 0 && !e.force && s - this.lastCommandAt < l)
      return { ok: !0, active: !0, status: "throttled" };
    this.captureStateOnce(e.config, e.light);
    try {
      return await e.hass.callService("light", r.off ? "turn_off" : "turn_on", o), this.controlledEntityId = a, this.lastCommandKey = d, this.lastCommandAt = s, { ok: !0, active: !0, status: "updated" };
    } catch (c) {
      return {
        ok: !1,
        active: !1,
        status: "unavailable",
        error: c instanceof Error ? c.message : "Failed to update RGB light."
      };
    }
  }
  async release(e) {
    if (this.lastCommandKey = void 0, this.lastCommandAt = 0, !this.capturedState || !this.controlledEntityId)
      return { ok: !0, active: !1, status: "inactive" };
    if (!(e != null && e.callService))
      return this.clearCapturedState(), { ok: !0, active: !1, status: "inactive" };
    const i = this.controlledEntityId, r = this.capturedState;
    this.clearCapturedState();
    try {
      return r.state === "on" ? await e.callService("light", "turn_on", Qr(i, r)) : await e.callService("light", "turn_off", { entity_id: i }), { ok: !0, active: !1, status: "restored" };
    } catch (n) {
      return {
        ok: !1,
        active: !1,
        status: "unavailable",
        error: n instanceof Error ? n.message : "Failed to restore RGB light."
      };
    }
  }
  reset() {
    this.clearCapturedState(), this.lastCommandKey = void 0, this.lastCommandAt = 0;
  }
  shouldBeActive(e, i, r) {
    return e.rgb_enabled && e.rgb_mode !== "off" && r !== void 0 && (!e.rgb_only_when_sauna_on || i);
  }
  captureStateOnce(e, i) {
    !e.rgb_restore_previous_state || this.capturedState || (this.capturedState = {
      state: i.state,
      brightness: ot(i, "brightness"),
      rgbColor: st(i, "rgb_color", 3),
      hsColor: st(i, "hs_color", 2),
      colorTemp: ot(i, "color_temp")
    });
  }
  clearCapturedState() {
    this.capturedState = void 0, this.controlledEntityId = void 0;
  }
}
function Wt(t) {
  if (!t || !Kt(t.entity_id))
    return { capability: "unsupported", supported: !1 };
  const e = Jr(t, "supported_color_modes"), i = Xr(t, "color_mode"), r = /* @__PURE__ */ new Set([...e, ...i ? [i] : []]);
  return r.has("rgb") || r.has("rgbw") || r.has("rgbww") || t.attributes.rgb_color ? { capability: "rgb_color", supported: !0 } : r.has("hs") || t.attributes.hs_color ? { capability: "hs_color", supported: !0 } : r.has("color_temp") || t.attributes.color_temp ? { capability: "color_temp", supported: !1 } : { capability: "unsupported", supported: !1 };
}
function Kt(t) {
  return (t == null ? void 0 : t.startsWith("light.")) === !0;
}
function jr(t, e, i) {
  const r = Zt(i.brightness), n = {
    entity_id: t
  };
  if (i.off)
    return n;
  const a = X(i.color ?? {});
  if (n.brightness_pct = r, e === "rgb_color")
    n.rgb_color = Gi(a);
  else if (e === "hs_color") {
    const o = Mt(a);
    n.hs_color = [o.hue, o.saturation];
  } else e === "color_temp" && (n.color_temp = qr(a));
  return n;
}
function qr(t) {
  const e = X(t), i = (e.red + e.green * 0.45 - e.blue * 0.55) / 369.75;
  return Math.round(370 - Math.min(Math.max(i, 0), 1) * 217);
}
function Yr(t) {
  return t != null && t.off ? { off: !0 } : {
    color: X((t == null ? void 0 : t.color) ?? {}),
    brightness: Zt(t == null ? void 0 : t.brightness)
  };
}
function Qr(t, e) {
  const i = { entity_id: t };
  return e.brightness !== void 0 && (i.brightness = e.brightness), e.rgbColor ? i.rgb_color = e.rgbColor : e.hsColor ? i.hs_color = e.hsColor : e.colorTemp !== void 0 && (i.color_temp = e.colorTemp), i;
}
function Zt(t) {
  return t === void 0 || !Number.isFinite(t) ? 100 : Math.round(Math.min(Math.max(t, 1), 100));
}
function Jr(t, e) {
  const i = t.attributes[e];
  return Array.isArray(i) ? i.filter((r) => typeof r == "string") : [];
}
function Xr(t, e) {
  const i = t.attributes[e];
  return typeof i == "string" ? i : void 0;
}
function ot(t, e) {
  const i = t.attributes[e];
  return typeof i == "number" && Number.isFinite(i) ? i : void 0;
}
function st(t, e, i) {
  const r = t.attributes[e];
  if (!(!Array.isArray(r) || r.length < i || !r.slice(0, i).every((n) => typeof n == "number" && Number.isFinite(n))))
    return i === 2 ? [r[0], r[1]] : [r[0], r[1], r[2]];
}
class en {
  async notify(e) {
    var i;
    if (!e.config.media_notification_enabled)
      return { ok: !0, active: !1 };
    if (!((i = e.hass) != null && i.callService))
      return { ok: !0, active: !1 };
    if (!dt(e.config.media_player_entity))
      return { ok: !1, active: !1, error: "Unsupported media player entity." };
    if (!e.mediaPlayer || e.mediaPlayer.state === "unavailable" || e.mediaPlayer.state === "unknown")
      return { ok: !1, active: !1, error: "Media player unavailable." };
    this.captureVolumeOnce(e.eventId, e.mediaPlayer);
    try {
      return await this.setNotificationVolume(e.hass, e.config), e.config.media_notification_mode === "media" ? await this.playMedia(e.hass, e.config) : await this.speak(e.hass, e.config, e.context), this.activeEventId = e.eventId, { ok: !0, active: !0 };
    } catch (r) {
      return {
        ok: !1,
        active: !1,
        error: r instanceof Error ? r.message : "Failed to play media notification."
      };
    }
  }
  async stop(e) {
    var i;
    if (!((i = e.hass) != null && i.callService) || e.eventId === void 0)
      return this.reset(), { ok: !0, active: !1 };
    if (this.activeEventId !== e.eventId)
      return { ok: !0, active: !1 };
    try {
      return e.config.media_notification_stop_on_acknowledge && await e.hass.callService("media_player", "media_stop", {
        entity_id: e.config.media_player_entity
      }), await this.restoreVolume(e.hass, e.config), this.reset(), { ok: !0, active: !1 };
    } catch (r) {
      return this.reset(), {
        ok: !1,
        active: !1,
        error: r instanceof Error ? r.message : "Failed to stop media notification."
      };
    }
  }
  async restoreVolume(e, i) {
    !i.media_notification_restore_volume || this.capturedVolume === void 0 || !(e != null && e.callService) || !dt(i.media_player_entity) || await e.callService("media_player", "volume_set", {
      entity_id: i.media_player_entity,
      volume_level: this.capturedVolume
    });
  }
  reset() {
    this.activeEventId = void 0, this.capturedVolumeEventId = void 0, this.capturedVolume = void 0;
  }
  captureVolumeOnce(e, i) {
    if (this.capturedVolumeEventId === e)
      return;
    const r = i.attributes.volume_level;
    this.capturedVolumeEventId = e, this.capturedVolume = typeof r == "number" && Number.isFinite(r) ? r : void 0;
  }
  async setNotificationVolume(e, i) {
    await Se(e)("media_player", "volume_set", {
      entity_id: i.media_player_entity,
      volume_level: I(i.media_notification_volume, 0, 1)
    });
  }
  async speak(e, i, r) {
    if (!tn(i.tts_entity))
      throw new Error("TTS entity is required for TTS notifications.");
    await Se(e)("tts", "speak", {
      entity_id: i.tts_entity,
      media_player_entity_id: i.media_player_entity,
      message: rn(i.media_notification_message, r)
    });
  }
  async playMedia(e, i) {
    if (!i.media_notification_media_id)
      throw new Error("Media ID is required for media notifications.");
    await Se(e)("media_player", "play_media", {
      entity_id: i.media_player_entity,
      media_content_id: i.media_notification_media_id,
      media_content_type: "music"
    });
  }
}
function Se(t) {
  if (!t.callService)
    throw new Error("Home Assistant service API is unavailable.");
  return t.callService;
}
function dt(t) {
  return (t == null ? void 0 : t.startsWith("media_player.")) === !0;
}
function tn(t) {
  return (t == null ? void 0 : t.startsWith("tts.")) === !0;
}
function rn(t, e) {
  const i = {
    temperature: lt(e.temperature),
    target: lt(e.target),
    eta: e.eta ?? "",
    ready_time: e.readyTime ?? ""
  };
  return t.replace(/\{(temperature|target|eta|ready_time)\}/g, (r, n) => i[n] ?? "");
}
function lt(t) {
  return t === void 0 || !Number.isFinite(t) ? "" : t.toFixed(1);
}
async function nn(t, e, i, r = 120) {
  if (!(t != null && t.callApi) || !e)
    return [];
  const n = /* @__PURE__ */ new Date(), a = new Date(n.getTime() - i * 6e4), o = new URLSearchParams({
    filter_entity_id: e,
    end_time: n.toISOString(),
    minimal_response: "1",
    no_attributes: "1"
  });
  try {
    const d = await t.callApi(
      "GET",
      `history/period/${a.toISOString()}?${o.toString()}`
    );
    return on(an(d), r);
  } catch {
    return [];
  }
}
function an(t) {
  return t.flat().map((e) => {
    const i = Vt(e.state), r = e.last_changed ?? e.last_updated, n = r ? Date.parse(r) : Number.NaN;
    if (!(i === void 0 || !Number.isFinite(n)))
      return {
        timestamp: n,
        value: i
      };
  }).filter((e) => e !== void 0);
}
function on(t, e) {
  if (t.length <= e)
    return [...t];
  const i = Math.ceil(t.length / e);
  return t.filter((r, n) => n % i === 0).slice(0, e);
}
const sn = /* @__PURE__ */ new Set(["top", "middle", "bottom"]);
function ct(t) {
  return sn.has(t);
}
function ut(t) {
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
const dn = _t`
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
  .trend-panel,
  .notification-status,
  .rgb-status {
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

  .rgb-status {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .notification-status {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .rgb-copy,
  .rgb-actions {
    align-items: center;
    display: flex;
    gap: 10px;
    min-width: 0;
  }

  .rgb-copy {
    flex: 1 1 auto;
  }

  .rgb-actions {
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .rgb-indicator {
    background: var(--sauna-rgb-color, var(--sauna-status-line));
    border-radius: 999px;
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--sauna-rgb-color) 18%, transparent);
    flex: 0 0 auto;
    height: 12px;
    width: 12px;
  }

  .ack-button {
    background: var(--primary-color);
    border: 0;
    border-radius: 999px;
    color: var(--text-primary-color, #fff);
    cursor: pointer;
    font: inherit;
    font-size: 13px;
    font-weight: 750;
    min-height: 34px;
    padding: 0 14px;
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

    .notification-status,
    .rgb-status,
    .rgb-actions {
      align-items: stretch;
      flex-direction: column;
    }

    .rgb-actions {
      justify-content: flex-start;
    }

    .ack-button {
      width: 100%;
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
`, ln = { bottomTemperature: "Unten", confirmSwitchOn: "Sauna-Entitaet manuell einschalten?", controlTemperature: "Regeltemperatur", decreaseTarget: "Zieltemperatur verringern", earlyDevelopment: "Fruehe Entwicklung", increaseTarget: "Zieltemperatur erhoehen", middleTemperature: "Mitte", name: "Sauna Suite", notAvailable: "Nicht verfuegbar", outsideTemperature: "Aussen", pending: "Aktualisiere...", placeholder: "Nur manuelle Bedienung und Monitoring. Es ist keine automatische Heizungsregelung implementiert.", powerOff: "Aus", powerOn: "Ein", powerUnavailable: "Nicht verfuegbar", sliderUnavailable: "Slider nicht verfuegbar, weil min, max oder step fehlen.", stratification: "Temperaturschichtung", targetDifference: "Differenz zum Ziel", targetTemperature: "Ziel", temperatureTrend: "Temperaturverlauf", temperatureZones: "Temperaturzonen", togglePower: "Sauna-Power-Entitaet umschalten", topTemperature: "Oben", trendDirectModesOnly: "Der Trend ist derzeit nur für direkte Sensormodi verfügbar.", trendLoading: "Verlaufsdaten werden geladen", trendUnavailable: "Keine Verlaufsdaten verfuegbar", effectivePower: "Heizleistung", estimatedPower: "Geschaetzte Heizleistung", etaUnavailable: "ETA nicht verfuegbar", heatingRate: "Heizrate", ready: "Bereit", readyAt: "Bereit um", rgbStatus: "RGB-Status", rgbLight: "RGB-Licht", rgbUnsupportedLight: "Konfiguriertes Licht unterstuetzt keine RGB- oder HS-Farbe.", rgbLightUnavailable: "RGB-Licht nicht verfuegbar.", acknowledgeReadySignal: "Quittieren", notificationStatus: "Bereit-Meldung" }, cn = { cardName: "Kartenname", cardNameDescription: "Titel im Kartenkopf.", confirmSwitchOn: "Einschalten bestaetigen", confirmSwitchOnDescription: "Vor dem manuellen Einschalten der konfigurierten Entitaet einen Dialog anzeigen.", controlTemperatureMode: "Modus fuer Regeltemperatur", controlTemperatureModeDescription: "Legt fest, welche Temperatur als zentrale Regeltemperatur angezeigt wird.", mainSwitchEntity: "Hauptschalter-Entitaet", mainSwitchEntityDescription: "Entitaet fuer den manuellen Power-Button. Unterstuetzt: switch und input_boolean.", nearTargetThreshold: "Nahe-Ziel-Schwelle", nearTargetThresholdDescription: "Grad unter Zieltemperatur, die als nahe am Ziel gelten.", outsideTemperatureEntity: "Aussentemperatur-Entitaet", outsideTemperatureEntityDescription: "Optionaler Aussentemperatur-Sensor.", sections: { display: "Anzeige", entities: "Entitaeten", general: "Allgemein", safety: "Sicherheit und Bestaetigung", temperatureCalculation: "Temperaturberechnung", trend: "Verlauf", heatingEta: "Heiz-ETA", rgbReadySignal: "RGB", acknowledgement: "Quittierung", mediaNotification: "Audio / Mediengeraet" }, showOutsideTemperature: "Aussentemperatur anzeigen", showOutsideTemperatureDescription: "Aussentemperatur anzeigen, wenn eine Entitaet konfiguriert ist.", showTemperatureTrend: "Temperaturverlauf anzeigen", showTemperatureTrendDescription: "Aktuelle Recorder-Historie fuer direkte Sensormodi oben, Mitte oder unten laden.", showTemperatureZones: "Temperaturzonen anzeigen", showTemperatureZonesDescription: "Werte der Sensoren oben, Mitte und unten anzeigen.", targetReachedTolerance: "Ziel-erreicht-Toleranz", targetReachedToleranceDescription: "Grad um die Zieltemperatur, die als Ziel erreicht gelten.", targetTemperatureEntity: "Zieltemperatur-Entitaet", targetTemperatureEntityDescription: "Entitaet fuer manuelle Zielwerte. Unterstuetzt: number und input_number.", temperatureBottomEntity: "Temperatur unten", temperatureBottomEntityDescription: "Temperatursensor unten in der Sauna.", temperatureMiddleEntity: "Temperatur Mitte", temperatureMiddleEntityDescription: "Temperatursensor in der Mitte der Sauna.", temperatureTopEntity: "Temperatur oben", temperatureTopEntityDescription: "Temperatursensor oben in der Sauna.", trendHistoryMinutes: "Verlauf in Minuten", trendHistoryMinutesDescription: "Zeitfenster aus dem Recorder. Erlaubt: 15 bis 1440 Minuten.", trendRefreshMinutes: "Aktualisierung in Minuten", trendRefreshMinutesDescription: "Intervall fuer die Verlaufsaktualisierung. Erlaubt: 1 bis 60 Minuten.", weightBottom: "Gewichtung unten", weightBottomDescription: "Gewichtung fuer den unteren Sensor beim gewichteten Durchschnitt.", weightMiddle: "Gewichtung Mitte", weightMiddleDescription: "Gewichtung fuer den mittleren Sensor beim gewichteten Durchschnitt.", weightTop: "Gewichtung oben", weightTopDescription: "Gewichtung fuer den oberen Sensor beim gewichteten Durchschnitt.", etaHistoryMinutes: "ETA-Verlauf in Minuten", etaHistoryMinutesDescription: "Recorder-Zeitfenster fuer ETA und Heizrate.", etaMinimumSamples: "ETA-Mindestanzahl Samples", etaMinimumSamplesDescription: "Mindestanzahl gueltiger Recorder-Samples fuer die ETA.", fixedHeaterPowerKw: "Feste Ofenleistung (kW)", fixedHeaterPowerKwDescription: "Nennleistung des Ofens fuer die ETA ohne Leistungssensor.", generalPowerSensorEntity: "Allgemeiner Leistungssensor", generalPowerSensorEntityDescription: "Ungefaehrer Gesamtleistungssensor. W und kW werden unterstuetzt.", heaterRatedPowerKw: "Ofen-Nennleistung (kW)", heaterRatedPowerKwDescription: "Maximaler Sauna-Anteil fuer die Schaetzung aus dem allgemeinen Leistungssensor.", heatingPowerMode: "Heizleistungsmodus", heatingPowerModeDescription: "Feste Ofenleistung oder ungefaehre Schaetzung aus einem allgemeinen Leistungssensor.", outsideTemperatureWeight: "Aussentemperatur-Gewichtung", outsideTemperatureWeightDescription: "Begrenzte ETA-Korrekturstaerke fuer die Aussentemperatur.", showEta: "ETA anzeigen", showEtaDescription: "Deterministische Aufheizschaetzung anzeigen, wenn genug Recorder-Daten vorhanden sind.", showHeatingRate: "Heizrate und Leistung anzeigen", showHeatingRateDescription: "Gemessene aktuelle Heizrate und effektive Heizleistung anzeigen.", showReadyTime: "Bereit-Uhrzeit anzeigen", showReadyTimeDescription: "Erwartete Uhrzeit anzeigen, wenn eine ETA verfuegbar ist.", rgbEnabled: "RGB-Licht aktivieren", rgbEnabledDescription: "Das konfigurierte Licht nur fuer visuelle Sauna-Statussignale nutzen.", rgbLightEntity: "RGB-Licht-Entitaet", rgbLightEntityDescription: "Home-Assistant-Light-Entitaet mit Farbunterstuetzung.", rgbMode: "RGB-Modus", rgbModeDescription: "Temperaturverlauf oder nur Bereit-Signal auswaehlen.", rgbBrightness: "RGB-Helligkeit", rgbBrightnessDescription: "Helligkeit in Prozent fuer Temperaturverlauf-Updates.", rgbUpdateIntervalSeconds: "RGB-Aktualisierungsintervall", rgbUpdateIntervalSecondsDescription: "Mindestabstand in Sekunden zwischen wiederholten RGB-Updates.", rgbRestorePreviousState: "Vorherigen Lichtzustand wiederherstellen", rgbRestorePreviousStateDescription: "Vorher erfassten Lichtzustand wiederherstellen, wenn Sauna Suite die Kontrolle beendet.", rgbOnlyWhenSaunaOn: "Nur wenn Sauna eingeschaltet ist", rgbOnlyWhenSaunaOnDescription: "RGB-Signale stoppen, wenn der konfigurierte Hauptschalter aus ist.", readySignalEnabled: "Bereit-Signal aktivieren", readySignalEnabledDescription: "Signalisieren, wenn die Sauna erstmals die Zieltemperatur erreicht.", readySignalMode: "Bereit-Signal-Modus", readySignalModeDescription: "Bereit-Farbe halten, blinken oder pulsieren.", readySignalColor: "Farbe", readySignalColorDescription: "Benannte Farbe fuer das Bereit-Signal.", readySignalBrightness: "Helligkeit", readySignalBrightnessDescription: "Helligkeit in Prozent fuer das Bereit-Signal.", readySignalIntervalSeconds: "Bereit-Signal-Intervall", readySignalIntervalSecondsDescription: "Sekunden zwischen Blink- oder Puls-Schritten. Minimum ist eine Sekunde.", readySignalDurationSeconds: "Bereit-Signal-Dauer", readySignalDurationSecondsDescription: "Dauer eines Bereit-Signals, bevor es stoppt.", readySignalRequiresAcknowledgement: "Quittierung erforderlich", readySignalRequiresAcknowledgementDescription: "Quittieren-Button anzeigen, solange das Bereit-Signal aktiv ist.", readySignalRepeat: "Bereit-Signal wiederholen", readySignalRepeatDescription: "Signal wiederholen, solange die Sauna bereit und nicht quittiert ist.", readySignalRepeatIntervalSeconds: "Wiederholungsintervall", readySignalRepeatIntervalSecondsDescription: "Sekunden bis zur Wiederholung eines nicht quittierten Bereit-Signals.", acknowledgementMode: "Quittierungsmodus", acknowledgementModeDescription: "Legt fest, ob Karte, externe Home-Assistant-Entitaet oder beide das Ready-Event quittieren duerfen.", acknowledgementEntity: "Quittier-Entitaet", acknowledgementEntityDescription: "Optionale input_button-, button-, input_boolean- oder binary_sensor-Entitaet fuer externe Quittierung.", acknowledgementResetInputBoolean: "input_boolean nach Quittierung zuruecksetzen", acknowledgementResetInputBooleanDescription: "Die konfigurierte input_boolean-Entitaet nach erfolgreicher Quittierung ausschalten.", showAcknowledgeButton: "Quittieren-Button anzeigen", showAcknowledgeButtonDescription: "Quittieren-Aktion in der Karte anzeigen, solange ein Ready-Event aktiv ist.", mediaNotificationEnabled: "Audio-Benachrichtigung aktivieren", mediaNotificationEnabledDescription: "Bereit-Benachrichtigung auf einem Home-Assistant-Mediengeraet abspielen.", mediaPlayerEntity: "Mediengeraet", mediaPlayerEntityDescription: "Home-Assistant-media_player fuer Bereit-Benachrichtigungen.", mediaNotificationMode: "Benachrichtigungsmodus", mediaNotificationModeDescription: "Sprachausgabe per TTS oder konfigurierte Medienquelle abspielen.", mediaNotificationMessage: "TTS-Nachricht", mediaNotificationMessageDescription: "Nachricht fuer die Sprachausgabe. Unterstuetzt {temperature}, {target}, {eta} und {ready_time}.", mediaNotificationMediaId: "Medien-ID", mediaNotificationMediaIdDescription: "Medienquelle, URL oder media-source-ID fuer den Medienmodus.", mediaNotificationVolume: "Lautstaerke", mediaNotificationVolumeDescription: "Lautstaerke fuer die Bereit-Benachrichtigung von 0.0 bis 1.0.", mediaNotificationRepeat: "Audio-Benachrichtigung wiederholen", mediaNotificationRepeatDescription: "Wiederholen, solange das aktuelle Ready-Event aktiv und nicht quittiert ist.", mediaNotificationRepeatIntervalSeconds: "Wiederholungsintervall", mediaNotificationRepeatIntervalSecondsDescription: "Sekunden zwischen wiederholten Audio-Benachrichtigungen.", mediaNotificationStopOnAcknowledge: "Audio bei Quittierung stoppen", mediaNotificationStopOnAcknowledgeDescription: "Wiedergabe bei Quittierung des Ready-Events nach Moeglichkeit stoppen.", mediaNotificationRestoreVolume: "Vorherige Lautstaerke wiederherstellen", mediaNotificationRestoreVolumeDescription: "Vor der Benachrichtigung erfasste Lautstaerke wiederherstellen.", ttsEntity: "TTS-Entitaet", ttsEntityDescription: "Home-Assistant-tts-Entitaet fuer den Standarddienst tts.speak." }, un = { average: "Durchschnitt", bottom: "Unten", maximum: "Maximum", middle: "Mitte", minimum: "Minimum", top: "Oben", weighted_average: "Gewichteter Durchschnitt" }, hn = { above_target: "Ueber Ziel", far_below: "Weit unter Ziel", heating: "Heizt", near_target: "Nahe am Ziel", target_reached: "Ziel erreicht", unavailable: "Temperatur nicht verfuegbar" }, gn = { readyIn: "Bereit in", hour: "h", hours: "h", minute: "min", minutes: "min" }, mn = { fixed: "Feste Ofenleistung", general_power_sensor: "Allgemeiner Leistungssensor" }, pn = { off: "Aus", temperature_gradient: "Temperaturverlauf", ready_only: "Nur Bereit-Signal" }, fn = { hold: "Halten", blink: "Blinken", pulse: "Pulsieren" }, _n = { green: "Gruen", gold: "Gold", red: "Rot", blue: "Blau", purple: "Violett", white: "Weiss" }, yn = { off: "Aus", temperature_gradient: "Temperaturverlauf", ready_signal_active: "Bereit-Signal aktiv", acknowledged: "Quittiert", light_unavailable: "Licht nicht verfuegbar" }, bn = { none: "Keine Meldung", ready: "Bereit", signaling: "Signalisierung aktiv", waiting_for_acknowledgement: "Warte auf Quittierung", acknowledged: "Quittiert", media_unavailable: "Mediengeraet nicht verfuegbar", rgb_unavailable: "RGB-Licht nicht verfuegbar" }, wn = { card_only: "Nur Karte", entity_only: "Nur Entitaet", card_or_entity: "Karte oder Entitaet" }, vn = { tts: "Sprachausgabe", media: "Medien" }, Sn = { off: "Aus", heating: "Heizt", slowly_heating: "Heizt langsam", near_target: "Nahe am Ziel", ready: "Bereit", above_target: "Ueber Ziel", cooling: "Kuehlt ab", data_unavailable: "Daten nicht verfuegbar" }, Tn = {
  card: ln,
  editor: cn,
  modes: un,
  status: hn,
  eta: gn,
  heatingPowerModes: mn,
  rgbModes: pn,
  readySignalModes: fn,
  readySignalColors: _n,
  rgbStatus: yn,
  notificationStatus: bn,
  acknowledgementModes: wn,
  mediaNotificationModes: vn,
  heatingStatus: Sn
}, En = { bottomTemperature: "Bottom", confirmSwitchOn: "Switch the sauna entity on manually?", controlTemperature: "Control temperature", decreaseTarget: "Decrease target temperature", earlyDevelopment: "Early Development", increaseTarget: "Increase target temperature", middleTemperature: "Middle", name: "Sauna Suite", notAvailable: "Not available", outsideTemperature: "Outside", pending: "Updating...", placeholder: "Manual controls and monitoring only. No automatic heater regulation is implemented.", powerOff: "Off", powerOn: "On", powerUnavailable: "Unavailable", sliderUnavailable: "Slider unavailable because min, max or step is missing.", stratification: "Stratification", targetDifference: "Difference to target", targetTemperature: "Target", temperatureTrend: "Temperature trend", temperatureZones: "Temperature zones", togglePower: "Toggle sauna power entity", topTemperature: "Top", trendDirectModesOnly: "Trend is currently available only for direct sensor modes.", trendLoading: "Loading trend data", trendUnavailable: "No trend data available", effectivePower: "Heating power", estimatedPower: "Estimated heating power", etaUnavailable: "ETA unavailable", heatingRate: "Heating rate", ready: "Ready", readyAt: "Ready at", rgbStatus: "RGB status", rgbLight: "RGB light", rgbUnsupportedLight: "Configured light does not support RGB or HS color.", rgbLightUnavailable: "RGB light unavailable.", acknowledgeReadySignal: "Acknowledge", notificationStatus: "Ready notification" }, Rn = { cardName: "Card name", cardNameDescription: "Title shown in the card header.", confirmSwitchOn: "Confirm before switching on", confirmSwitchOnDescription: "Require a confirmation dialog before the manual power button turns on the configured entity.", controlTemperatureMode: "Control temperature mode", controlTemperatureModeDescription: "Select which temperature is displayed as the main control temperature.", mainSwitchEntity: "Main switch entity", mainSwitchEntityDescription: "Manual power button entity. Supported domains: switch and input_boolean.", nearTargetThreshold: "Near-target threshold", nearTargetThresholdDescription: "Degrees below target that should be treated as near target.", outsideTemperatureEntity: "Outside temperature entity", outsideTemperatureEntityDescription: "Optional outside temperature sensor.", sections: { display: "Display", entities: "Entities", general: "General", safety: "Safety and confirmation", temperatureCalculation: "Temperature calculation", trend: "Trend", heatingEta: "Heating ETA", rgbReadySignal: "RGB", acknowledgement: "Acknowledgement", mediaNotification: "Audio / Media Player" }, showOutsideTemperature: "Show outside temperature", showOutsideTemperatureDescription: "Display the outside temperature when an entity is configured.", showTemperatureTrend: "Show temperature trend", showTemperatureTrendDescription: "Load recent Recorder history for top, middle or bottom direct sensor modes.", showTemperatureZones: "Show temperature zones", showTemperatureZonesDescription: "Display top, middle and bottom sensor values.", targetReachedTolerance: "Target-reached tolerance", targetReachedToleranceDescription: "Degrees around target that are considered target reached.", targetTemperatureEntity: "Target temperature entity", targetTemperatureEntityDescription: "Manual target setting entity. Supported domains: number and input_number.", temperatureBottomEntity: "Bottom temperature entity", temperatureBottomEntityDescription: "Bottom sauna temperature sensor.", temperatureMiddleEntity: "Middle temperature entity", temperatureMiddleEntityDescription: "Middle sauna temperature sensor.", temperatureTopEntity: "Top temperature entity", temperatureTopEntityDescription: "Top sauna temperature sensor.", trendHistoryMinutes: "Trend history minutes", trendHistoryMinutesDescription: "History window loaded from Recorder. Allowed range: 15 to 1440 minutes.", trendRefreshMinutes: "Trend refresh minutes", trendRefreshMinutesDescription: "How often the trend is refreshed. Allowed range: 1 to 60 minutes.", weightBottom: "Bottom weight", weightBottomDescription: "Weight for bottom sensor when weighted average is selected.", weightMiddle: "Middle weight", weightMiddleDescription: "Weight for middle sensor when weighted average is selected.", weightTop: "Top weight", weightTopDescription: "Weight for top sensor when weighted average is selected.", etaHistoryMinutes: "ETA history minutes", etaHistoryMinutesDescription: "Recorder history window used for ETA and heating-rate calculation.", etaMinimumSamples: "ETA minimum samples", etaMinimumSamplesDescription: "Minimum valid Recorder samples required before ETA is calculated.", fixedHeaterPowerKw: "Fixed heater power (kW)", fixedHeaterPowerKwDescription: "Rated heater power used for ETA when no power sensor is configured.", generalPowerSensorEntity: "General power sensor", generalPowerSensorEntityDescription: "Approximate total power sensor. W and kW units are supported.", heaterRatedPowerKw: "Heater rated power (kW)", heaterRatedPowerKwDescription: "Maximum sauna share used to cap the general power sensor estimate.", heatingPowerMode: "Heating power mode", heatingPowerModeDescription: "Choose fixed heater power or an approximate general power sensor estimate.", outsideTemperatureWeight: "Outside-temperature weight", outsideTemperatureWeightDescription: "Bounded ETA correction strength for outside temperature context.", showEta: "Show ETA", showEtaDescription: "Display the deterministic heat-up estimate when enough Recorder data exists.", showHeatingRate: "Show heating rate and power", showHeatingRateDescription: "Display recent measured heating rate and effective heater power.", showReadyTime: "Show ready time", showReadyTimeDescription: "Display the expected clock time when ETA is available.", rgbEnabled: "Enable RGB light", rgbEnabledDescription: "Use the configured light only for visual sauna status signaling.", rgbLightEntity: "RGB light entity", rgbLightEntityDescription: "Home Assistant light entity with color support.", rgbMode: "RGB mode", rgbModeDescription: "Choose continuous temperature gradient or ready-only signaling.", rgbBrightness: "RGB brightness", rgbBrightnessDescription: "Brightness percentage for temperature-gradient updates.", rgbUpdateIntervalSeconds: "RGB update interval", rgbUpdateIntervalSecondsDescription: "Minimum seconds between repeated RGB updates.", rgbRestorePreviousState: "Restore previous light state", rgbRestorePreviousStateDescription: "Restore the light state captured before Sauna Suite takes control.", rgbOnlyWhenSaunaOn: "Only while sauna is on", rgbOnlyWhenSaunaOnDescription: "Stop RGB signaling when the configured main switch is off.", readySignalEnabled: "Enable ready signal", readySignalEnabledDescription: "Signal when the sauna first reaches the target temperature.", readySignalMode: "Ready signal mode", readySignalModeDescription: "Hold, blink or pulse the configured ready color.", readySignalColor: "Ready signal color", readySignalColorDescription: "Named color used for the ready signal.", readySignalBrightness: "Ready signal brightness", readySignalBrightnessDescription: "Brightness percentage used by the ready signal.", readySignalIntervalSeconds: "Ready signal interval", readySignalIntervalSecondsDescription: "Seconds between blink or pulse steps. Minimum is one second.", readySignalDurationSeconds: "Ready signal duration", readySignalDurationSecondsDescription: "How long one ready signal runs before stopping.", readySignalRequiresAcknowledgement: "Require acknowledgement", readySignalRequiresAcknowledgementDescription: "Show an acknowledgement button while the ready signal is active.", readySignalRepeat: "Repeat ready signal", readySignalRepeatDescription: "Repeat the signal while the sauna remains ready and unacknowledged.", readySignalRepeatIntervalSeconds: "Repeat interval", readySignalRepeatIntervalSecondsDescription: "Seconds to wait before repeating an unacknowledged ready signal.", acknowledgementMode: "Acknowledgement mode", acknowledgementModeDescription: "Choose whether the card, an external Home Assistant entity or both may acknowledge the ready event.", acknowledgementEntity: "Acknowledgement entity", acknowledgementEntityDescription: "Optional input_button, button, input_boolean or binary_sensor used as an external acknowledgement control.", acknowledgementResetInputBoolean: "Reset input_boolean after acknowledgement", acknowledgementResetInputBooleanDescription: "Turn the configured input_boolean off after a successful acknowledgement.", showAcknowledgeButton: "Show acknowledge button", showAcknowledgeButtonDescription: "Show the card acknowledgement action while a ready event is active.", mediaNotificationEnabled: "Enable audio notification", mediaNotificationEnabledDescription: "Play a ready notification on a Home Assistant media_player entity.", mediaPlayerEntity: "Media player entity", mediaPlayerEntityDescription: "Home Assistant media_player entity used for ready notifications.", mediaNotificationMode: "Notification mode", mediaNotificationModeDescription: "Use TTS speech or play a configured media source.", mediaNotificationMessage: "TTS message", mediaNotificationMessageDescription: "Message spoken by TTS. Supports {temperature}, {target}, {eta} and {ready_time}.", mediaNotificationMediaId: "Media ID", mediaNotificationMediaIdDescription: "Media source, URL or media-source identifier for media mode.", mediaNotificationVolume: "Notification volume", mediaNotificationVolumeDescription: "Volume used for the ready notification, from 0.0 to 1.0.", mediaNotificationRepeat: "Repeat audio notification", mediaNotificationRepeatDescription: "Repeat while the current ready event remains active and unacknowledged.", mediaNotificationRepeatIntervalSeconds: "Repeat interval", mediaNotificationRepeatIntervalSecondsDescription: "Seconds between repeated audio notifications.", mediaNotificationStopOnAcknowledge: "Stop audio on acknowledgement", mediaNotificationStopOnAcknowledgeDescription: "Attempt to stop playback when the ready event is acknowledged.", mediaNotificationRestoreVolume: "Restore previous volume", mediaNotificationRestoreVolumeDescription: "Restore the media-player volume captured before the notification.", ttsEntity: "TTS entity", ttsEntityDescription: "Home Assistant tts entity used with the standard tts.speak service." }, $n = { average: "Average", bottom: "Bottom", maximum: "Maximum", middle: "Middle", minimum: "Minimum", top: "Top", weighted_average: "Weighted average" }, An = { above_target: "Above target", far_below: "Far below target", heating: "Heating", near_target: "Near target", target_reached: "Target reached", unavailable: "Temperature unavailable" }, kn = { readyIn: "Ready in", hour: "h", hours: "h", minute: "min", minutes: "min" }, Dn = { fixed: "Fixed heater power", general_power_sensor: "General power sensor" }, Mn = { off: "Off", temperature_gradient: "Temperature gradient", ready_only: "Ready only" }, Nn = { hold: "Hold", blink: "Blink", pulse: "Pulse" }, xn = { green: "Green", gold: "Gold", red: "Red", blue: "Blue", purple: "Purple", white: "White" }, Cn = { off: "Off", temperature_gradient: "Temperature gradient", ready_signal_active: "Ready signal active", acknowledged: "Acknowledged", light_unavailable: "Light unavailable" }, Pn = { none: "No notification", ready: "Ready", signaling: "Signaling", waiting_for_acknowledgement: "Waiting for acknowledgement", acknowledged: "Acknowledged", media_unavailable: "Media unavailable", rgb_unavailable: "RGB unavailable" }, On = { card_only: "Card only", entity_only: "Entity only", card_or_entity: "Card or entity" }, Fn = { tts: "Text to speech", media: "Media" }, Hn = { off: "Off", heating: "Heating", slowly_heating: "Slowly heating", near_target: "Near target", ready: "Ready", above_target: "Above target", cooling: "Cooling", data_unavailable: "Data unavailable" }, Ln = {
  card: En,
  editor: Rn,
  modes: $n,
  status: An,
  eta: kn,
  heatingPowerModes: Dn,
  rgbModes: Mn,
  readySignalModes: Nn,
  readySignalColors: xn,
  rgbStatus: Cn,
  notificationStatus: Pn,
  acknowledgementModes: On,
  mediaNotificationModes: Fn,
  heatingStatus: Hn
}, ht = {
  de: Tn,
  en: Ln
};
function jt(t, e) {
  const i = t != null && t.toLowerCase().startsWith("de") ? "de" : "en";
  return gt(ht[i], e) ?? gt(ht.en, e) ?? e;
}
function gt(t, e) {
  const i = e.split(".").reduce((r, n) => {
    if (!(typeof r != "object" || r === void 0))
      return r[n];
  }, t);
  return typeof i == "string" ? i : void 0;
}
var Bn = Object.defineProperty, y = (t, e, i, r) => {
  for (var n = void 0, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (n = o(e, i, n) || n);
  return n && Bn(e, i, n), n;
};
const Te = "°C", ae = "—", zn = 0.05, Fe = class Fe extends P {
  constructor() {
    super(...arguments), this.config = B({}), this.switchPending = !1, this.targetPending = !1, this.historySamples = [], this.historyLoading = !1, this.rgbStatus = "off", this.readySignalActive = !1, this.notificationStatus = "none", this.readySignalPhase = !0, this.nextReadyEventId = 1, this.readySignalDetectorState = Re(), this.rgbLightController = new Zr(), this.mediaNotificationController = new en(), this.handleReadyAcknowledgement = () => {
      this.acknowledgeReadyEvent();
    };
  }
  setConfig(e) {
    this.clearNotificationTimers(), this.stopMediaNotification(), this.releaseRgbControl(), this.readySignalDetectorState = Re(), this.acknowledgementEntityBaseline = void 0, this.readySignalActive = !1, this.notificationEvent = void 0, this.notificationStatus = "none", this.mediaNotificationController.reset(), this.config = B(e), this.resetHistorySchedule();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.clearHistoryTimer(), this.clearTargetDebounceTimer(), this.clearNotificationTimers(), this.stopMediaNotification(), this.releaseRgbControl();
  }
  getCardSize() {
    return 7;
  }
  static getConfigElement() {
    return document.createElement(Dt);
  }
  static getStubConfig() {
    return B({});
  }
  updated(e) {
    (e.has("hass") || e.has("config")) && (this.scheduleHistoryRefresh(), this.synchronizeReadyNotifications());
  }
  render() {
    const e = H(this.hass, this.config), i = $t(
      e.summary.controlTemperature,
      e.targetTemperature,
      {
        nearTargetThreshold: this.config.near_target_threshold,
        targetReachedTolerance: this.config.target_reached_tolerance
      }
    ), r = Ei(
      this.historySamples,
      this.config.eta_minimum_samples
    ), n = Vr(this.hass, this.config), a = Ci({
      currentTemperature: e.summary.controlTemperature,
      targetTemperature: e.targetTemperature,
      heatingRateCPerMinute: r.rateCPerMinute,
      outsideTemperature: e.outsideTemperature,
      outsideTemperatureWeight: this.config.outside_temperature_weight,
      effectivePowerKw: n.effectivePowerKw,
      nominalPowerKw: n.nominalPowerKw,
      hasInsufficientHistory: this.hasEtaHistoryConsumer() && r.rateCPerMinute === void 0
    }), o = At(i.status), d = tt(
      e.summary.controlTemperature,
      e.targetTemperature,
      {
        nearTargetThreshold: this.config.near_target_threshold,
        targetReachedTolerance: this.config.target_reached_tolerance
      }
    ), s = p(this.hass, this.config.main_switch_entity), l = p(this.hass, this.config.target_temperature_entity), u = this.getHeatingDashboardStatus(
      i.status,
      s,
      r,
      a
    );
    return h`
      <ha-card>
        <div
          class="content"
          style=${`--sauna-status-line: ${o.line}; --sauna-status-fill: ${o.fill};`}
        >
          <header class="header">
            <div class="brand-mark" aria-hidden="true">${this.renderHeatIcon()}</div>
            <div class="header-copy">
              <div class="title">${this.config.name}</div>
              <div class="state">${this.t(`heatingStatus.${u}`)}</div>
            </div>
            ${this.renderPowerButton(s)}
          </header>

          ${this.renderHero(
      e.summary.controlTemperature,
      e.targetTemperature,
      u,
      i.progress,
      i.difference,
      r,
      n,
      a
    )}
          ${this.renderTemperatureZones(
      e.zones.top,
      e.zones.middle,
      e.zones.bottom,
      e.outsideTemperature,
      e.summary.stratification
    )}
          ${this.renderTrend(
      i.status,
      e.summary.controlTemperature,
      e.targetTemperature,
      r
    )}
          ${this.renderNotificationStatus()} ${this.renderRgbStatus(d.rgb)}
          ${this.renderTargetControl(l)}
        </div>
      </ha-card>
    `;
  }
  renderNotificationStatus() {
    var i;
    if (!this.hasNotificationConfiguration() && !this.notificationEvent)
      return;
    const e = ((i = this.notificationEvent) == null ? void 0 : i.active) === !0 && !this.notificationEvent.acknowledged && Nt(this.config.acknowledgement_mode, this.config.show_acknowledge_button);
    return h`
      <section class="notification-status" aria-label=${this.t("card.notificationStatus")}>
        <div>
          <div class="label">${this.t("card.notificationStatus")}</div>
          <div class="status-line">${this.t(`notificationStatus.${this.notificationStatus}`)}</div>
          ${this.mediaWarning ? h`<div class="error">${this.mediaWarning}</div>` : void 0}
        </div>
        ${e ? h`
                <button class="ack-button" type="button" @click=${this.handleReadyAcknowledgement}>
                  ${this.t("card.acknowledgeReadySignal")}
                </button>
              ` : void 0}
      </section>
    `;
  }
  renderRgbStatus(e) {
    if (!this.config.rgb_light_entity)
      return;
    const i = `--sauna-rgb-color: rgb(${e.red}, ${e.green}, ${e.blue});`;
    return h`
      <section class="rgb-status" aria-label=${this.t("card.rgbStatus")}>
        <div class="rgb-copy">
          <span class="rgb-indicator" style=${i} aria-hidden="true"></span>
          <div>
            <div class="label">${this.t("card.rgbLight")}</div>
            <div class="status-line">${this.getLightLabel()}</div>
            ${this.rgbWarning ? h`<div class="error">${this.rgbWarning}</div>` : void 0}
          </div>
        </div>
        <div class="rgb-actions">
          <span class="status-chip">${this.t(`rgbStatus.${this.rgbStatus}`)}</span>
        </div>
      </section>
    `;
  }
  renderHero(e, i, r, n, a, o, d, s) {
    const l = this.getTemperatureParts(
      e,
      this.getControlTemperatureUnit()
    ), u = this.getTemperatureParts(
      i,
      this.getTemperatureUnit(this.config.target_temperature_entity)
    ), c = Math.round(Math.min(Math.max(n, 0), 1) * 360), b = this.getEtaLabel(s), v = this.getReadyTimeLabel(s);
    return h`
      <section class="hero" aria-label=${this.t("card.controlTemperature")}>
        <div class="hero-main">
          <div
            class="hero-gauge"
            style=${`--sauna-progress-degrees: ${c}deg;`}
            aria-hidden="true"
          >
            <div class="hero-gauge-center">
              <div class=${`hero-value ${l.unavailable ? "unavailable" : ""}`}>
                <span class="hero-number">${l.value}</span>
                <span class="hero-unit">${l.unit}</span>
              </div>
              <div class="hero-target">
                ${this.t("card.targetTemperature")} ${u.value}${u.unit}
              </div>
            </div>
          </div>
          <div class="hero-summary">
            <div class="label">${this.t("card.controlTemperature")}</div>
            <div class="hero-status">${this.t(`heatingStatus.${r}`)}</div>
            ${b ? h`<div class="eta-primary">${b}</div>` : h`<div class="eta-primary subdued">${this.t("card.etaUnavailable")}</div>`}
            ${v ? h`<div class="ready-time">${v}</div>` : void 0}
          </div>
        </div>

        <div class="hero-meta">
          <span class="status-chip">
            <span class="status-dot" aria-hidden="true"></span>
            ${this.t(`heatingStatus.${r}`)}
          </span>
          ${a !== void 0 ? h`<span class="difference">
                  ${this.t("card.targetDifference")}: ${this.formatTemperatureDelta(a)}
                </span>` : void 0}
        </div>

        <div class="hero-metrics">
          ${this.config.show_heating_rate ? h`
                  ${this.renderMetric(
      "card.heatingRate",
      this.formatHeatingRate(o.rateCPerMinute)
    )}
                  ${this.renderMetric(
      d.approximate ? "card.estimatedPower" : "card.effectivePower",
      this.formatPower(d.effectivePowerKw)
    )}
                ` : void 0}
        </div>
        ${this.serviceError ? h`<div class="error" role="alert">${this.serviceError}</div>` : void 0}
      </section>
    `;
  }
  renderMetric(e, i) {
    return h`
      <div class="metric">
        <span>${this.t(e)}</span>
        <strong>${i}</strong>
      </div>
    `;
  }
  renderTemperatureZones(e, i, r, n, a) {
    const o = this.config.show_temperature_zones, d = this.config.show_outside_temperature && this.config.outside_temperature_entity !== void 0;
    if (!(!o && !d && a === void 0))
      return h`
      <section class="zones" aria-label=${this.t("card.temperatureZones")}>
        ${o ? h`
                <div class="zone-grid">
                  ${this.renderTemperatureTile(
        "card.topTemperature",
        e,
        this.config.temperature_top_entity
      )}
                  ${this.renderTemperatureTile(
        "card.middleTemperature",
        i,
        this.config.temperature_middle_entity
      )}
                  ${this.renderTemperatureTile(
        "card.bottomTemperature",
        r,
        this.config.temperature_bottom_entity
      )}
                </div>
              ` : void 0}
        <div class="secondary-grid">
          ${d ? this.renderTemperatureTile(
        "card.outsideTemperature",
        n,
        this.config.outside_temperature_entity,
        "subtle"
      ) : void 0}
          ${a !== void 0 ? this.renderTemperatureTile(
        "card.stratification",
        a,
        void 0,
        "subtle"
      ) : void 0}
        </div>
      </section>
    `;
  }
  renderTemperatureTile(e, i, r, n = "zone") {
    const a = this.getTemperatureParts(i, this.getTemperatureUnit(r), !0);
    return h`
      <div class=${`temperature-tile ${n}`}>
        <div class="label">${this.t(e)}</div>
        <div class=${`tile-value ${a.unavailable ? "unavailable" : ""}`}>
          <span>${a.value}</span>
          <small>${a.unit}</small>
        </div>
      </div>
    `;
  }
  renderTrend(e, i, r, n) {
    if (!this.config.show_temperature_trend)
      return;
    const a = ct(this.config.control_temperature_mode);
    return h`
      <section class="trend-panel" aria-label=${this.t("card.temperatureTrend")}>
        <div class="section-heading">
          <div>
            <div class="label">${this.t("card.temperatureTrend")}</div>
          </div>
        </div>
        ${a ? h`
                <fceeb-sauna-suite-temperature-trend
                  .samples=${this.historySamples}
                  .status=${e}
                  .targetValue=${r}
                  .currentValue=${i}
                  .heatingRateLabel=${this.formatHeatingRate(n.rateCPerMinute)}
                  .direction=${this.getTrendDirection(n.rateCPerMinute)}
                  empty-label=${this.historyLoading ? this.t("card.trendLoading") : this.t("card.trendUnavailable")}
                ></fceeb-sauna-suite-temperature-trend>
              ` : h`<div class="trend-empty">${this.t("card.trendDirectModesOnly")}</div>`}
      </section>
    `;
  }
  renderPowerButton(e) {
    const i = this.switchPending || !Ut(this.config.main_switch_entity) || ne(e), r = (e == null ? void 0 : e.state) === "on", n = this.switchPending ? this.t("card.pending") : r ? this.t("card.powerOn") : this.t("card.powerOff");
    return h`
      <button
        class=${`power-button ${r ? "on" : "off"}`}
        type="button"
        ?disabled=${i}
        aria-label=${this.t("card.togglePower")}
        @click=${this.handlePowerClick}
      >
        <span class="power-icon" aria-hidden="true">${this.renderPowerIcon()}</span>
        <span>${n}</span>
      </button>
    `;
  }
  renderTargetControl(e) {
    const i = at(e), r = this.getEntityNumber(e), n = this.getTemperatureParts(
      r,
      this.getTemperatureUnit(this.config.target_temperature_entity)
    ), a = this.targetPending || !It(this.config.target_temperature_entity) || ne(e) || r === void 0;
    return h`
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
              ?disabled=${a}
              aria-label=${this.t("card.decreaseTarget")}
              @click=${() => this.adjustTargetTemperature(-1)}
            >
              -
            </button>
            <button
              class="step-button"
              type="button"
              ?disabled=${a}
              aria-label=${this.t("card.increaseTarget")}
              @click=${() => this.adjustTargetTemperature(1)}
            >
              +
            </button>
          </div>
        </div>
        ${i && r !== void 0 ? h`
                <input
                  type="range"
                  min=${i.minimum}
                  max=${i.maximum}
                  step=${i.step}
                  .value=${String(r)}
                  ?disabled=${a}
                  aria-label=${this.t("card.targetTemperature")}
                  @input=${(o) => this.handleTargetSliderInput(o, i)}
                />
              ` : h`<div class="status-line">${this.t("card.sliderUnavailable")}</div>`}
        ${this.targetPending ? h`<div class="status-line">${this.t("card.pending")}</div>` : void 0}
      </section>
    `;
  }
  renderHeatIcon() {
    return N`
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M8 20c-1.5-1.1-2.3-2.5-2.3-4.2 0-1.8.9-3.2 2.6-4.4 1.3-.9 2-2.1 2-3.4 0-1-.3-2-.9-3 2.3.9 3.8 2.7 3.8 5.1 0 1-.2 1.8-.6 2.6.9-.5 1.6-1.2 2.1-2.2 2.1 1.4 3.2 3.2 3.2 5.3 0 1.7-.8 3.1-2.3 4.2" />
        <path d="M9.5 20c-.6-.7-.9-1.5-.9-2.4 0-1.2.6-2.2 1.7-3 .9-.6 1.4-1.4 1.4-2.4 1.5 1 2.2 2.2 2.2 3.7 0 .6-.1 1.1-.4 1.6.5-.2.9-.6 1.3-1.1.7.7 1.1 1.5 1.1 2.4 0 .4-.1.8-.3 1.2" />
      </svg>
    `;
  }
  renderPowerIcon() {
    return N`
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M12 3v8" />
        <path d="M7.1 6.8a7 7 0 1 0 9.8 0" />
      </svg>
    `;
  }
  async handlePowerClick() {
    const e = p(this.hass, this.config.main_switch_entity);
    if (this.switchPending || ne(e))
      return;
    const i = (e == null ? void 0 : e.state) !== "on";
    if (i && this.config.confirm_switch_on && !window.confirm(this.t("card.confirmSwitchOn")))
      return;
    this.switchPending = !0, this.serviceError = void 0;
    const r = await $r(this.hass, this.config.main_switch_entity, i);
    this.switchPending = !1, this.serviceError = r.ok ? void 0 : r.error;
  }
  adjustTargetTemperature(e) {
    const i = p(this.hass, this.config.target_temperature_entity), r = at(i), n = this.getEntityNumber(i);
    !r || n === void 0 || this.targetPending || this.updateTargetTemperature(n + r.step * e, r);
  }
  handleTargetSliderInput(e, i) {
    const r = e.target, n = Number(r.value);
    Number.isFinite(n) && (this.clearTargetDebounceTimer(), this.targetDebounceTimer = window.setTimeout(() => {
      this.updateTargetTemperature(n, i);
    }, 400));
  }
  async updateTargetTemperature(e, i) {
    if (this.targetPending)
      return;
    this.targetPending = !0, this.serviceError = void 0;
    const r = await Ar(
      this.hass,
      this.config.target_temperature_entity,
      e,
      i
    );
    this.targetPending = !1, this.serviceError = r.ok ? void 0 : r.error;
  }
  async synchronizeReadyNotifications() {
    var o;
    if (!this.hass)
      return;
    const e = H(this.hass, this.config), i = p(this.hass, this.config.main_switch_entity), n = {
      saunaOn: (i == null ? void 0 : i.state) === "on",
      controlTemperature: e.summary.controlTemperature,
      targetTemperature: e.targetTemperature,
      thresholds: {
        nearTargetThreshold: this.config.near_target_threshold,
        targetReachedTolerance: this.config.target_reached_tolerance
      }
    }, a = Ki(this.readySignalDetectorState, n);
    this.readySignalDetectorState = a.state, !a.state.ready && ((o = this.notificationEvent) != null && o.active) && !this.readySignalActive && (this.clearNotificationTimers(), this.notificationEvent = void 0, this.notificationStatus = "none", await this.stopMediaNotification(), await this.releaseRgbControl()), a.triggered && await this.startReadyNotificationEvent(
      e.summary.controlTemperature,
      e.targetTemperature
    ), await this.checkAcknowledgementEntity(), await this.synchronizeRgbLighting(), this.refreshNotificationStatus();
  }
  async startReadyNotificationEvent(e, i) {
    this.clearNotificationTimers();
    const r = Xi(this.nextReadyEventId++, Date.now());
    this.notificationEvent = r, this.mediaWarning = void 0, this.acknowledgementEntityBaseline = xt(
      this.config.acknowledgement_entity,
      p(this.hass, this.config.acknowledgement_entity)
    ), this.config.ready_signal_enabled && this.config.rgb_enabled && this.config.rgb_mode !== "off" && (this.startReadySignal(), this.updateNotificationEvent(it(r, "rgb", !0))), this.config.media_notification_enabled && (await this.playMediaNotification(e, i), this.scheduleMediaNotificationRepeat()), this.refreshNotificationStatus();
  }
  async checkAcknowledgementEntity() {
    if (!this.notificationEvent || !this.config.acknowledgement_entity)
      return;
    const e = p(this.hass, this.config.acknowledgement_entity);
    if (Qi(
      this.config.acknowledgement_mode,
      this.config.acknowledgement_entity,
      e,
      this.notificationEvent,
      this.acknowledgementEntityBaseline
    ).acknowledged) {
      await this.acknowledgeReadyEvent(!0);
      return;
    }
    this.acknowledgementEntityBaseline = Ji(
      this.acknowledgementEntityBaseline,
      this.config.acknowledgement_entity,
      e
    );
  }
  async synchronizeRgbLighting(e = !1) {
    if (!this.hass)
      return;
    if (!this.config.rgb_light_entity) {
      this.stopReadySignal(!1);
      const u = await this.releaseRgbControl();
      this.setRgbRuntimeState("off", u.error);
      return;
    }
    const i = p(this.hass, this.config.rgb_light_entity), r = p(this.hass, this.config.main_switch_entity), n = (r == null ? void 0 : r.state) === "on", a = H(this.hass, this.config), o = tt(
      a.summary.controlTemperature,
      a.targetTemperature,
      {
        nearTargetThreshold: this.config.near_target_threshold,
        targetReachedTolerance: this.config.target_reached_tolerance
      }
    );
    if (!this.config.rgb_enabled || this.config.rgb_mode === "off" || this.config.rgb_only_when_sauna_on && !n) {
      this.stopReadySignal(!1);
      const u = await this.releaseRgbControl();
      this.setRgbRuntimeState("off", u.error);
      return;
    }
    const d = this.getRgbCommand(o.rgb);
    if (!d) {
      const u = await this.rgbLightController.sync({
        hass: this.hass,
        config: this.config,
        light: i,
        saunaOn: n,
        command: d,
        force: e
      });
      this.setRgbRuntimeState(this.getRgbStatusForCommand(), u.error);
      return;
    }
    if (!Wt(i).supported) {
      this.setRgbRuntimeState("light_unavailable", this.t("card.rgbUnsupportedLight"));
      return;
    }
    const l = await this.rgbLightController.sync({
      hass: this.hass,
      config: this.config,
      light: i,
      saunaOn: n,
      command: d,
      force: e
    });
    if (!l.ok) {
      this.setRgbRuntimeState(
        "light_unavailable",
        l.error ?? this.t("card.rgbLightUnavailable")
      );
      return;
    }
    this.setRgbRuntimeState(this.getRgbStatusForCommand(), void 0);
  }
  getRgbCommand(e) {
    if (this.readySignalActive)
      return this.getReadySignalCommand();
    if (this.config.rgb_mode === "temperature_gradient")
      return {
        color: e,
        brightness: this.config.rgb_brightness
      };
  }
  getReadySignalCommand() {
    if (this.config.ready_signal_mode === "blink" && !this.readySignalPhase)
      return { off: !0 };
    const e = this.config.ready_signal_mode === "pulse" && !this.readySignalPhase ? Math.max(10, Math.round(this.config.ready_signal_brightness * 0.35)) : this.config.ready_signal_brightness;
    return {
      color: Vi(this.config.ready_signal_color),
      brightness: e
    };
  }
  getRgbStatusForCommand() {
    return this.rgbStatus === "acknowledged" ? "acknowledged" : this.readySignalActive ? "ready_signal_active" : this.config.rgb_mode === "temperature_gradient" ? "temperature_gradient" : "off";
  }
  startReadySignal() {
    if (!this.readySignalActive) {
      if (this.clearReadySignalTimers(), this.readySignalActive = !0, this.readySignalPhase = !0, this.setRgbRuntimeState("ready_signal_active", void 0), this.synchronizeRgbLighting(!0), this.config.ready_signal_mode !== "hold") {
        const e = Math.max(1e3, this.config.ready_signal_interval_seconds * 1e3);
        this.readySignalStepTimer = window.setInterval(() => {
          this.readySignalPhase = !this.readySignalPhase, this.synchronizeRgbLighting(!0);
        }, e);
      }
      this.readySignalStopTimer = window.setTimeout(() => {
        this.stopReadySignal(!0);
      }, this.config.ready_signal_duration_seconds * 1e3);
    }
  }
  stopReadySignal(e) {
    !this.readySignalActive && this.readySignalStepTimer === void 0 || (this.readySignalActive = !1, this.clearReadySignalStepAndStopTimers(), this.synchronizeRgbLighting(!0), e && this.shouldRepeatReadySignal() && (this.readySignalRepeatTimer = window.setTimeout(() => {
      this.shouldRepeatReadySignal() && this.startReadySignal();
    }, this.config.ready_signal_repeat_interval_seconds * 1e3)));
  }
  shouldRepeatReadySignal() {
    const e = H(this.hass, this.config), i = p(this.hass, this.config.main_switch_entity);
    return this.config.ready_signal_repeat && this.config.ready_signal_enabled && !this.readySignalDetectorState.acknowledged && $e({
      saunaOn: (i == null ? void 0 : i.state) === "on",
      controlTemperature: e.summary.controlTemperature,
      targetTemperature: e.targetTemperature,
      thresholds: {
        nearTargetThreshold: this.config.near_target_threshold,
        targetReachedTolerance: this.config.target_reached_tolerance
      }
    });
  }
  async playMediaNotification(e, i) {
    var a;
    const r = this.notificationEvent;
    if (!r || !this.hass)
      return;
    const n = await this.mediaNotificationController.notify({
      hass: this.hass,
      config: this.config,
      mediaPlayer: p(this.hass, this.config.media_player_entity),
      eventId: r.id,
      context: {
        temperature: e,
        target: i,
        eta: this.t("card.etaUnavailable"),
        readyTime: ""
      }
    });
    ((a = this.notificationEvent) == null ? void 0 : a.id) === r.id && (this.mediaWarning = n.ok ? void 0 : n.error, this.updateNotificationEvent(
      tr(
        it(this.notificationEvent, "media", n.active),
        "media",
        !n.ok
      )
    ));
  }
  scheduleMediaNotificationRepeat() {
    if (this.clearMediaNotificationRepeatTimer(), !this.config.media_notification_repeat || !this.notificationEvent)
      return;
    const e = this.notificationEvent.id;
    this.mediaNotificationRepeatTimer = window.setTimeout(() => {
      var i;
      if (((i = this.notificationEvent) == null ? void 0 : i.id) === e && this.shouldRepeatMediaNotification()) {
        const r = H(this.hass, this.config);
        this.playMediaNotification(
          r.summary.controlTemperature,
          r.targetTemperature
        ), this.scheduleMediaNotificationRepeat();
      }
    }, this.config.media_notification_repeat_interval_seconds * 1e3);
  }
  shouldRepeatMediaNotification() {
    var r;
    const e = H(this.hass, this.config), i = p(this.hass, this.config.main_switch_entity);
    return this.config.media_notification_repeat && this.config.media_notification_enabled && ((r = this.notificationEvent) == null ? void 0 : r.active) === !0 && !this.notificationEvent.acknowledged && $e({
      saunaOn: (i == null ? void 0 : i.state) === "on",
      controlTemperature: e.summary.controlTemperature,
      targetTemperature: e.targetTemperature,
      thresholds: {
        nearTargetThreshold: this.config.near_target_threshold,
        targetReachedTolerance: this.config.target_reached_tolerance
      }
    });
  }
  async stopMediaNotification() {
    var r;
    const e = (r = this.notificationEvent) == null ? void 0 : r.id, i = await this.mediaNotificationController.stop({
      hass: this.hass,
      config: this.config,
      eventId: e
    });
    i.ok || (this.mediaWarning = i.error);
  }
  async acknowledgeReadyEvent(e = !1) {
    var n;
    const i = Yi(
      this.config.acknowledgement_mode,
      this.config.show_acknowledge_button,
      this.notificationEvent
    );
    if (!this.notificationEvent || this.notificationEvent.acknowledged || !e && !i.acknowledged)
      return;
    const r = this.notificationEvent.id;
    this.clearNotificationTimers(), this.readySignalDetectorState = {
      ...this.readySignalDetectorState,
      acknowledged: !0
    }, this.notificationEvent = er(this.notificationEvent, Date.now()), this.readySignalActive = !1, this.setRgbRuntimeState("acknowledged", void 0), await this.stopMediaNotification(), await this.releaseRgbControl(), await this.resetAcknowledgementInputBoolean(), ((n = this.notificationEvent) == null ? void 0 : n.id) === r && this.refreshNotificationStatus();
  }
  async resetAcknowledgementInputBoolean() {
    var e, i;
    if (!(!this.config.acknowledgement_reset_input_boolean || !((e = this.hass) != null && e.callService) || !((i = this.config.acknowledgement_entity) != null && i.startsWith("input_boolean."))))
      try {
        await this.hass.callService("input_boolean", "turn_off", {
          entity_id: this.config.acknowledgement_entity
        });
      } catch {
      }
  }
  async releaseRgbControl() {
    const e = await this.rgbLightController.release(this.hass);
    return { error: e.ok ? void 0 : e.error };
  }
  setRgbRuntimeState(e, i) {
    this.rgbStatus !== e && (this.rgbStatus = e), this.rgbWarning !== i && (this.rgbWarning = i);
  }
  scheduleHistoryRefresh() {
    if (!this.hasHistoryConsumer() || !this.hass || !ct(this.config.control_temperature_mode)) {
      this.clearHistorySamples(), this.lastHistoryFetchKey = void 0, this.clearHistoryTimer();
      return;
    }
    const e = ut(this.config), i = this.getHistoryMinutes(), r = `${e ?? ""}:${i}:${this.config.trend_refresh_minutes}`;
    if (!e) {
      this.clearHistorySamples(), this.lastHistoryFetchKey = void 0, this.clearHistoryTimer();
      return;
    }
    this.lastHistoryFetchKey === r && this.historyRefreshTimer !== void 0 || (this.lastHistoryFetchKey !== void 0 && this.lastHistoryFetchKey !== r && this.clearHistoryTimer(), this.historyRefreshTimer === void 0 && (this.historyRefreshTimer = window.setInterval(() => {
      this.loadHistory(e, i);
    }, this.config.trend_refresh_minutes * 6e4)), this.lastHistoryFetchKey !== r && (this.lastHistoryFetchKey = r, this.loadHistory(e, i)));
  }
  async loadHistory(e, i) {
    this.historyLoading = !0, this.historySamples = await nn(this.hass, e, i), this.historyLoading = !1;
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
  clearReadySignalTimers() {
    this.clearReadySignalStepAndStopTimers(), this.readySignalRepeatTimer !== void 0 && (window.clearTimeout(this.readySignalRepeatTimer), this.readySignalRepeatTimer = void 0);
  }
  clearNotificationTimers() {
    this.clearReadySignalTimers(), this.clearMediaNotificationRepeatTimer();
  }
  clearMediaNotificationRepeatTimer() {
    this.mediaNotificationRepeatTimer !== void 0 && (window.clearTimeout(this.mediaNotificationRepeatTimer), this.mediaNotificationRepeatTimer = void 0);
  }
  clearReadySignalStepAndStopTimers() {
    this.readySignalStepTimer !== void 0 && (window.clearInterval(this.readySignalStepTimer), this.readySignalStepTimer = void 0), this.readySignalStopTimer !== void 0 && (window.clearTimeout(this.readySignalStopTimer), this.readySignalStopTimer = void 0);
  }
  hasHistoryConsumer() {
    return this.config.show_temperature_trend || this.hasEtaHistoryConsumer();
  }
  hasEtaHistoryConsumer() {
    return this.config.show_eta || this.config.show_ready_time || this.config.show_heating_rate;
  }
  getHistoryMinutes() {
    const e = this.hasEtaHistoryConsumer() ? this.config.eta_history_minutes : 0, i = this.config.show_temperature_trend ? this.config.trend_history_minutes : 0;
    return Math.max(e, i);
  }
  getHeatingDashboardStatus(e, i, r, n) {
    return (i == null ? void 0 : i.state) === "off" || n.unavailableReason === "heater_off" ? "off" : e === "target_reached" || n.unavailableReason === "target_reached" ? "ready" : e === "above_target" ? "above_target" : e === "near_target" ? "near_target" : Qe(r.rateCPerMinute) ? "cooling" : r.rateCPerMinute === void 0 || n.unavailableReason === "missing_temperature" ? "data_unavailable" : r.rateCPerMinute > 0 && r.rateCPerMinute < zn ? "slowly_heating" : r.rateCPerMinute > 0 ? "heating" : "data_unavailable";
  }
  getTrendDirection(e) {
    return Qe(e) ? "cooling" : e !== void 0 && e > 0 ? "heating" : "idle";
  }
  getEtaLabel(e) {
    if (this.config.show_eta)
      return e.unavailableReason === "target_reached" ? this.t("card.ready") : Fi(e.etaMinutes, {
        readyIn: this.t("eta.readyIn"),
        hour: this.t("eta.hour"),
        hours: this.t("eta.hours"),
        minute: this.t("eta.minute"),
        minutes: this.t("eta.minutes")
      });
  }
  getReadyTimeLabel(e) {
    var r, n;
    if (!this.config.show_ready_time)
      return;
    const i = Hi(
      e.etaMinutes,
      /* @__PURE__ */ new Date(),
      ((r = this.hass) == null ? void 0 : r.selectedLanguage) ?? ((n = this.hass) == null ? void 0 : n.language)
    );
    return i ? `${this.t("card.readyAt")} ${i}` : void 0;
  }
  getControlTemperatureUnit() {
    return this.getTemperatureUnit(ut(this.config));
  }
  getEntityNumber(e) {
    if (!e || ne(e))
      return;
    const i = Number(e.state);
    return Number.isFinite(i) ? i : void 0;
  }
  getTemperatureUnit(e) {
    var r;
    const i = (r = p(this.hass, e)) == null ? void 0 : r.attributes.unit_of_measurement;
    return typeof i == "string" && i.trim().length > 0 ? i : Te;
  }
  getTemperatureParts(e, i, r = !1) {
    return {
      value: e === void 0 ? ae : e.toFixed(1),
      unit: e === void 0 ? "" : i,
      unavailable: e === void 0
    };
  }
  formatTemperatureDelta(e) {
    return `${e > 0 ? "+" : ""}${e.toFixed(1)} ${Te}`;
  }
  formatHeatingRate(e) {
    return e === void 0 || !Number.isFinite(e) ? ae : `${e > 0 ? "+" : ""}${e.toFixed(2)} ${Te}/min`;
  }
  formatPower(e) {
    return e === void 0 || !Number.isFinite(e) ? ae : `${e.toFixed(1)} kW`;
  }
  getLightLabel() {
    const e = p(this.hass, this.config.rgb_light_entity), i = e == null ? void 0 : e.attributes.friendly_name;
    return typeof i == "string" && i.length > 0 ? i : this.config.rgb_light_entity ?? this.t("card.notAvailable");
  }
  updateNotificationEvent(e) {
    this.notificationEvent = e, this.refreshNotificationStatus();
  }
  refreshNotificationStatus() {
    this.notificationStatus = ir(
      this.notificationEvent,
      this.isAcknowledgementExpected()
    );
  }
  isAcknowledgementExpected() {
    return this.config.acknowledgement_mode !== "card_only" || this.config.show_acknowledge_button || this.config.ready_signal_requires_acknowledgement;
  }
  hasNotificationConfiguration() {
    return this.config.rgb_enabled || this.config.media_notification_enabled || this.config.acknowledgement_entity !== void 0;
  }
  t(e) {
    var i, r;
    return jt(((i = this.hass) == null ? void 0 : i.selectedLanguage) ?? ((r = this.hass) == null ? void 0 : r.language), e);
  }
};
Fe.styles = dn;
let f = Fe;
y([
  T({ attribute: !1 })
], f.prototype, "hass");
y([
  _()
], f.prototype, "config");
y([
  _()
], f.prototype, "switchPending");
y([
  _()
], f.prototype, "targetPending");
y([
  _()
], f.prototype, "serviceError");
y([
  _()
], f.prototype, "historySamples");
y([
  _()
], f.prototype, "historyLoading");
y([
  _()
], f.prototype, "rgbStatus");
y([
  _()
], f.prototype, "rgbWarning");
y([
  _()
], f.prototype, "readySignalActive");
y([
  _()
], f.prototype, "notificationEvent");
y([
  _()
], f.prototype, "notificationStatus");
y([
  _()
], f.prototype, "mediaWarning");
xe(customElements, bi, f);
const Un = _t`
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
var In = Object.defineProperty, qt = (t, e, i, r) => {
  for (var n = void 0, a = t.length - 1, o; a >= 0; a--)
    (o = t[a]) && (n = o(e, i, n) || n);
  return n && In(e, i, n), n;
};
const He = class He extends P {
  constructor() {
    super(...arguments), this.config = B({}), this.computeLabel = (e) => e.label, this.computeHelper = (e) => e.description;
  }
  setConfig(e) {
    this.config = B(e);
  }
  render() {
    return h`
      <div class="form">
        ${this.sections.map(
      (e) => h`
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
    var d;
    const e = [
      {
        name: "control_temperature_mode",
        label: this.t("editor.controlTemperatureMode"),
        description: this.t("editor.controlTemperatureModeDescription"),
        selector: {
          select: {
            mode: "dropdown",
            options: Ct.map((s) => ({
              value: s,
              label: this.t(`modes.${s}`)
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
    const i = [
      {
        name: "heating_power_mode",
        label: this.t("editor.heatingPowerMode"),
        description: this.t("editor.heatingPowerModeDescription"),
        selector: {
          select: {
            mode: "dropdown",
            options: Pt.map((s) => ({
              value: s,
              label: this.t(`heatingPowerModes.${s}`)
            }))
          }
        }
      }
    ];
    this.config.heating_power_mode === "fixed" && i.push(
      this.numberField(
        "fixed_heater_power_kw",
        "editor.fixedHeaterPowerKw",
        "editor.fixedHeaterPowerKwDescription",
        0,
        50,
        0.1
      )
    ), this.config.heating_power_mode === "general_power_sensor" && i.push(
      this.entityField(
        "general_power_sensor_entity",
        "editor.generalPowerSensorEntity",
        "editor.generalPowerSensorEntityDescription",
        [{ domain: "sensor", device_class: "power" }]
      ),
      this.numberField(
        "heater_rated_power_kw",
        "editor.heaterRatedPowerKw",
        "editor.heaterRatedPowerKwDescription",
        0,
        50,
        0.1
      )
    ), i.push(
      this.numberField(
        "outside_temperature_weight",
        "editor.outsideTemperatureWeight",
        "editor.outsideTemperatureWeightDescription",
        0,
        1,
        0.01
      ),
      this.booleanField("show_eta", "editor.showEta", "editor.showEtaDescription"),
      this.booleanField(
        "show_ready_time",
        "editor.showReadyTime",
        "editor.showReadyTimeDescription"
      ),
      this.booleanField(
        "show_heating_rate",
        "editor.showHeatingRate",
        "editor.showHeatingRateDescription"
      ),
      this.numberField(
        "eta_minimum_samples",
        "editor.etaMinimumSamples",
        "editor.etaMinimumSamplesDescription",
        2,
        60,
        1
      ),
      this.numberField(
        "eta_history_minutes",
        "editor.etaHistoryMinutes",
        "editor.etaHistoryMinutesDescription",
        5,
        1440,
        5
      )
    );
    const r = [
      this.booleanField(
        "show_temperature_trend",
        "editor.showTemperatureTrend",
        "editor.showTemperatureTrendDescription"
      )
    ];
    this.config.show_temperature_trend && r.push(
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
    );
    const n = [
      this.booleanField("rgb_enabled", "editor.rgbEnabled", "editor.rgbEnabledDescription")
    ];
    this.config.rgb_enabled && (n.push(
      this.entityField(
        "rgb_light_entity",
        "editor.rgbLightEntity",
        "editor.rgbLightEntityDescription",
        [{ domain: "light" }]
      ),
      {
        name: "rgb_mode",
        label: this.t("editor.rgbMode"),
        description: this.t("editor.rgbModeDescription"),
        selector: {
          select: {
            mode: "dropdown",
            options: Ot.map((s) => ({
              value: s,
              label: this.t(`rgbModes.${s}`)
            }))
          }
        }
      },
      this.booleanField(
        "rgb_restore_previous_state",
        "editor.rgbRestorePreviousState",
        "editor.rgbRestorePreviousStateDescription"
      ),
      this.booleanField(
        "rgb_only_when_sauna_on",
        "editor.rgbOnlyWhenSaunaOn",
        "editor.rgbOnlyWhenSaunaOnDescription"
      )
    ), this.config.rgb_mode === "temperature_gradient" && n.push(
      this.numberField(
        "rgb_brightness",
        "editor.rgbBrightness",
        "editor.rgbBrightnessDescription",
        1,
        100,
        1
      ),
      this.numberField(
        "rgb_update_interval_seconds",
        "editor.rgbUpdateIntervalSeconds",
        "editor.rgbUpdateIntervalSecondsDescription",
        1,
        3600,
        1
      )
    ), n.push(
      this.booleanField(
        "ready_signal_enabled",
        "editor.readySignalEnabled",
        "editor.readySignalEnabledDescription"
      )
    ), this.config.ready_signal_enabled && (n.push(
      {
        name: "ready_signal_mode",
        label: this.t("editor.readySignalMode"),
        description: this.t("editor.readySignalModeDescription"),
        selector: {
          select: {
            mode: "dropdown",
            options: Ft.map((s) => ({
              value: s,
              label: this.t(`readySignalModes.${s}`)
            }))
          }
        }
      },
      {
        name: "ready_signal_color",
        label: this.t("editor.readySignalColor"),
        description: this.t("editor.readySignalColorDescription"),
        selector: {
          select: {
            mode: "dropdown",
            options: Ht.map((s) => ({
              value: s,
              label: this.t(`readySignalColors.${s}`)
            }))
          }
        }
      },
      this.numberField(
        "ready_signal_brightness",
        "editor.readySignalBrightness",
        "editor.readySignalBrightnessDescription",
        1,
        100,
        1
      ),
      this.numberField(
        "ready_signal_interval_seconds",
        "editor.readySignalIntervalSeconds",
        "editor.readySignalIntervalSecondsDescription",
        1,
        3600,
        1
      ),
      this.numberField(
        "ready_signal_duration_seconds",
        "editor.readySignalDurationSeconds",
        "editor.readySignalDurationSecondsDescription",
        1,
        3600,
        1
      ),
      this.booleanField(
        "ready_signal_requires_acknowledgement",
        "editor.readySignalRequiresAcknowledgement",
        "editor.readySignalRequiresAcknowledgementDescription"
      ),
      this.booleanField(
        "ready_signal_repeat",
        "editor.readySignalRepeat",
        "editor.readySignalRepeatDescription"
      )
    ), this.config.ready_signal_repeat && n.push(
      this.numberField(
        "ready_signal_repeat_interval_seconds",
        "editor.readySignalRepeatIntervalSeconds",
        "editor.readySignalRepeatIntervalSecondsDescription",
        1,
        86400,
        1
      )
    )));
    const a = [
      {
        name: "acknowledgement_mode",
        label: this.t("editor.acknowledgementMode"),
        description: this.t("editor.acknowledgementModeDescription"),
        selector: {
          select: {
            mode: "dropdown",
            options: Lt.map((s) => ({
              value: s,
              label: this.t(`acknowledgementModes.${s}`)
            }))
          }
        }
      }
    ];
    this.config.acknowledgement_mode !== "entity_only" && a.push(
      this.booleanField(
        "show_acknowledge_button",
        "editor.showAcknowledgeButton",
        "editor.showAcknowledgeButtonDescription"
      )
    ), this.config.acknowledgement_mode !== "card_only" && (a.push(
      this.entityField(
        "acknowledgement_entity",
        "editor.acknowledgementEntity",
        "editor.acknowledgementEntityDescription",
        [
          { domain: "input_button" },
          { domain: "button" },
          { domain: "input_boolean" },
          { domain: "binary_sensor" }
        ]
      )
    ), (d = this.config.acknowledgement_entity) != null && d.startsWith("input_boolean.") && a.push(
      this.booleanField(
        "acknowledgement_reset_input_boolean",
        "editor.acknowledgementResetInputBoolean",
        "editor.acknowledgementResetInputBooleanDescription"
      )
    ));
    const o = [
      this.booleanField(
        "media_notification_enabled",
        "editor.mediaNotificationEnabled",
        "editor.mediaNotificationEnabledDescription"
      )
    ];
    return this.config.media_notification_enabled && (o.push(
      this.entityField(
        "media_player_entity",
        "editor.mediaPlayerEntity",
        "editor.mediaPlayerEntityDescription",
        [{ domain: "media_player" }]
      ),
      {
        name: "media_notification_mode",
        label: this.t("editor.mediaNotificationMode"),
        description: this.t("editor.mediaNotificationModeDescription"),
        selector: {
          select: {
            mode: "dropdown",
            options: Bt.map((s) => ({
              value: s,
              label: this.t(`mediaNotificationModes.${s}`)
            }))
          }
        }
      },
      this.numberField(
        "media_notification_volume",
        "editor.mediaNotificationVolume",
        "editor.mediaNotificationVolumeDescription",
        0,
        1,
        0.05
      ),
      this.booleanField(
        "media_notification_restore_volume",
        "editor.mediaNotificationRestoreVolume",
        "editor.mediaNotificationRestoreVolumeDescription"
      )
    ), this.config.media_notification_mode === "tts" && o.push(
      this.entityField("tts_entity", "editor.ttsEntity", "editor.ttsEntityDescription", [
        { domain: "tts" }
      ]),
      this.textField(
        "media_notification_message",
        "editor.mediaNotificationMessage",
        "editor.mediaNotificationMessageDescription"
      )
    ), this.config.media_notification_mode === "media" && o.push(
      this.textField(
        "media_notification_media_id",
        "editor.mediaNotificationMediaId",
        "editor.mediaNotificationMediaIdDescription"
      )
    ), o.push(
      this.booleanField(
        "media_notification_repeat",
        "editor.mediaNotificationRepeat",
        "editor.mediaNotificationRepeatDescription"
      ),
      this.booleanField(
        "media_notification_stop_on_acknowledge",
        "editor.mediaNotificationStopOnAcknowledge",
        "editor.mediaNotificationStopOnAcknowledgeDescription"
      )
    ), this.config.media_notification_repeat && o.push(
      this.numberField(
        "media_notification_repeat_interval_seconds",
        "editor.mediaNotificationRepeatIntervalSeconds",
        "editor.mediaNotificationRepeatIntervalSecondsDescription",
        1,
        86400,
        1
      )
    )), [
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
        titleKey: "editor.sections.heatingEta",
        schema: i
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
        schema: r
      },
      {
        titleKey: "editor.sections.rgbReadySignal",
        schema: n
      },
      {
        titleKey: "editor.sections.acknowledgement",
        schema: a
      },
      {
        titleKey: "editor.sections.mediaNotification",
        schema: o
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
    this.config = B({
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
  textField(e, i, r) {
    return {
      name: e,
      label: this.t(i),
      description: this.t(r),
      selector: {
        text: {}
      }
    };
  }
  temperatureSensorField(e, i, r) {
    return this.entityField(e, i, r, [
      { domain: "sensor", device_class: "temperature" }
    ]);
  }
  entityField(e, i, r, n) {
    return {
      name: e,
      label: this.t(i),
      description: this.t(r),
      selector: {
        entity: {
          filter: n
        }
      }
    };
  }
  numberField(e, i, r, n, a, o) {
    return {
      name: e,
      label: this.t(i),
      description: this.t(r),
      selector: {
        number: {
          min: n,
          max: a,
          mode: "box",
          step: o
        }
      }
    };
  }
  booleanField(e, i, r) {
    return {
      name: e,
      label: this.t(i),
      description: this.t(r),
      selector: {
        boolean: {}
      }
    };
  }
  t(e) {
    var i, r;
    return jt(((i = this.hass) == null ? void 0 : i.selectedLanguage) ?? ((r = this.hass) == null ? void 0 : r.language), e);
  }
};
He.styles = Un;
let Q = He;
qt([
  T({ attribute: !1 })
], Q.prototype, "hass");
qt([
  _()
], Q.prototype, "config");
xe(customElements, Dt, Q);
const mt = {
  type: yi,
  name: "Sauna Suite",
  description: "A Home Assistant dashboard card for sauna monitoring and manual controls.",
  preview: !0
};
function Vn(t = window) {
  t.customCards = t.customCards ?? [], t.customCards.some((i) => i.type === mt.type) || t.customCards.push(mt);
}
Vn();
export {
  yi as CARD_PICKER_TYPE,
  bi as CARD_TAG,
  kt as CARD_TYPE,
  Dt as EDITOR_TAG,
  wi as TEMPERATURE_TREND_TAG
};
//# sourceMappingURL=sauna-suite.js.map
