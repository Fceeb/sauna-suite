/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ae = globalThis, Ee = ae.ShadowRoot && (ae.ShadyCSS === void 0 || ae.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Re = Symbol(), ke = /* @__PURE__ */ new WeakMap();
let lt = class {
  constructor(e, r, i) {
    if (this._$cssResult$ = !0, i !== Re) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = r;
  }
  get styleSheet() {
    let e = this.o;
    const r = this.t;
    if (Ee && e === void 0) {
      const i = r !== void 0 && r.length === 1;
      i && (e = ke.get(r)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && ke.set(r, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Ut = (t) => new lt(typeof t == "string" ? t : t + "", void 0, Re), dt = (t, ...e) => {
  const r = t.length === 1 ? t[0] : e.reduce((i, n, a) => i + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[a + 1], t[0]);
  return new lt(r, t, Re);
}, Bt = (t, e) => {
  if (Ee) t.adoptedStyleSheets = e.map((r) => r instanceof CSSStyleSheet ? r : r.styleSheet);
  else for (const r of e) {
    const i = document.createElement("style"), n = ae.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = r.cssText, t.appendChild(i);
  }
}, He = Ee ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let r = "";
  for (const i of e.cssRules) r += i.cssText;
  return Ut(r);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: It, defineProperty: Gt, getOwnPropertyDescriptor: Vt, getOwnPropertyNames: Kt, getOwnPropertySymbols: Wt, getPrototypeOf: Zt } = Object, E = globalThis, Ne = E.trustedTypes, jt = Ne ? Ne.emptyScript : "", ce = E.reactiveElementPolyfillSupport, V = (t, e) => t, oe = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? jt : null;
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
} }, Ae = (t, e) => !It(t, e), Oe = { attribute: !0, type: String, converter: oe, reflect: !1, useDefault: !1, hasChanged: Ae };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), E.litPropertyMetadata ?? (E.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let O = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, r = Oe) {
    if (r.state && (r.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((r = Object.create(r)).wrapped = !0), this.elementProperties.set(e, r), !r.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(e, i, r);
      n !== void 0 && Gt(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, r, i) {
    const { get: n, set: a } = Vt(this.prototype, e) ?? { get() {
      return this[r];
    }, set(s) {
      this[r] = s;
    } };
    return { get: n, set(s) {
      const l = n == null ? void 0 : n.call(this);
      a == null || a.call(this, s), this.requestUpdate(e, l, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Oe;
  }
  static _$Ei() {
    if (this.hasOwnProperty(V("elementProperties"))) return;
    const e = Zt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(V("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(V("properties"))) {
      const r = this.properties, i = [...Kt(r), ...Wt(r)];
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
      for (const n of i) r.unshift(He(n));
    } else e !== void 0 && r.push(He(e));
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
    return Bt(e, this.constructor.elementStyles), e;
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
    var a;
    const i = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, i);
    if (n !== void 0 && i.reflect === !0) {
      const s = (((a = i.converter) == null ? void 0 : a.toAttribute) !== void 0 ? i.converter : oe).toAttribute(r, i.type);
      this._$Em = e, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(e, r) {
    var a, s;
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const l = i.getPropertyOptions(n), o = typeof l.converter == "function" ? { fromAttribute: l.converter } : ((a = l.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? l.converter : oe;
      this._$Em = n;
      const d = o.fromAttribute(r, l.type);
      this[n] = d ?? ((s = this._$Ej) == null ? void 0 : s.get(n)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, r, i, n = !1, a) {
    var s;
    if (e !== void 0) {
      const l = this.constructor;
      if (n === !1 && (a = this[e]), i ?? (i = l.getPropertyOptions(e)), !((i.hasChanged ?? Ae)(a, r) || i.useDefault && i.reflect && a === ((s = this._$Ej) == null ? void 0 : s.get(e)) && !this.hasAttribute(l._$Eu(e, i)))) return;
      this.C(e, r, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, r, { useDefault: i, reflect: n, wrapped: a }, s) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, s ?? r ?? this[e]), a !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (r = void 0), this._$AL.set(e, r)), n === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [a, s] of this._$Ep) this[a] = s;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [a, s] of n) {
        const { wrapped: l } = s, o = this[a];
        l !== !0 || this._$AL.has(a) || o === void 0 || this.C(a, void 0, s, o);
      }
    }
    let e = !1;
    const r = this._$AL;
    try {
      e = this.shouldUpdate(r), e ? (this.willUpdate(r), (i = this._$EO) == null || i.forEach((n) => {
        var a;
        return (a = n.hostUpdate) == null ? void 0 : a.call(n);
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
O.elementStyles = [], O.shadowRootOptions = { mode: "open" }, O[V("elementProperties")] = /* @__PURE__ */ new Map(), O[V("finalized")] = /* @__PURE__ */ new Map(), ce == null || ce({ ReactiveElement: O }), (E.reactiveElementVersions ?? (E.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = globalThis, Le = (t) => t, le = K.trustedTypes, Fe = le ? le.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, ut = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, ct = "?" + $, qt = `<${ct}>`, H = document, W = () => H.createComment(""), Z = (t) => t === null || typeof t != "object" && typeof t != "function", xe = Array.isArray, Yt = (t) => xe(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", he = `[ 	
\f\r]`, I = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ze = /-->/g, Ue = />/g, A = RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Be = /'/g, Ie = /"/g, ht = /^(?:script|style|textarea|title)$/i, gt = (t) => (e, ...r) => ({ _$litType$: t, strings: e, values: r }), h = gt(1), M = gt(2), F = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), Ge = /* @__PURE__ */ new WeakMap(), C = H.createTreeWalker(H, 129);
function pt(t, e) {
  if (!xe(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Fe !== void 0 ? Fe.createHTML(e) : e;
}
const Qt = (t, e) => {
  const r = t.length - 1, i = [];
  let n, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = I;
  for (let l = 0; l < r; l++) {
    const o = t[l];
    let d, u, c = -1, _ = 0;
    for (; _ < o.length && (s.lastIndex = _, u = s.exec(o), u !== null); ) _ = s.lastIndex, s === I ? u[1] === "!--" ? s = ze : u[1] !== void 0 ? s = Ue : u[2] !== void 0 ? (ht.test(u[2]) && (n = RegExp("</" + u[2], "g")), s = A) : u[3] !== void 0 && (s = A) : s === A ? u[0] === ">" ? (s = n ?? I, c = -1) : u[1] === void 0 ? c = -2 : (c = s.lastIndex - u[2].length, d = u[1], s = u[3] === void 0 ? A : u[3] === '"' ? Ie : Be) : s === Ie || s === Be ? s = A : s === ze || s === Ue ? s = I : (s = A, n = void 0);
    const f = s === A && t[l + 1].startsWith("/>") ? " " : "";
    a += s === I ? o + qt : c >= 0 ? (i.push(d), o.slice(0, c) + ut + o.slice(c) + $ + f) : o + $ + (c === -2 ? l : f);
  }
  return [pt(t, a + (t[r] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class j {
  constructor({ strings: e, _$litType$: r }, i) {
    let n;
    this.parts = [];
    let a = 0, s = 0;
    const l = e.length - 1, o = this.parts, [d, u] = Qt(e, r);
    if (this.el = j.createElement(d, i), C.currentNode = this.el.content, r === 2 || r === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (n = C.nextNode()) !== null && o.length < l; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const c of n.getAttributeNames()) if (c.endsWith(ut)) {
          const _ = u[s++], f = n.getAttribute(c).split($), X = /([.?@])?(.*)/.exec(_);
          o.push({ type: 1, index: a, name: X[2], strings: f, ctor: X[1] === "." ? Xt : X[1] === "?" ? er : X[1] === "@" ? tr : ue }), n.removeAttribute(c);
        } else c.startsWith($) && (o.push({ type: 6, index: a }), n.removeAttribute(c));
        if (ht.test(n.tagName)) {
          const c = n.textContent.split($), _ = c.length - 1;
          if (_ > 0) {
            n.textContent = le ? le.emptyScript : "";
            for (let f = 0; f < _; f++) n.append(c[f], W()), C.nextNode(), o.push({ type: 2, index: ++a });
            n.append(c[_], W());
          }
        }
      } else if (n.nodeType === 8) if (n.data === ct) o.push({ type: 2, index: a });
      else {
        let c = -1;
        for (; (c = n.data.indexOf($, c + 1)) !== -1; ) o.push({ type: 7, index: a }), c += $.length - 1;
      }
      a++;
    }
  }
  static createElement(e, r) {
    const i = H.createElement("template");
    return i.innerHTML = e, i;
  }
}
function z(t, e, r = t, i) {
  var s, l;
  if (e === F) return e;
  let n = i !== void 0 ? (s = r._$Co) == null ? void 0 : s[i] : r._$Cl;
  const a = Z(e) ? void 0 : e._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== a && ((l = n == null ? void 0 : n._$AO) == null || l.call(n, !1), a === void 0 ? n = void 0 : (n = new a(t), n._$AT(t, r, i)), i !== void 0 ? (r._$Co ?? (r._$Co = []))[i] = n : r._$Cl = n), n !== void 0 && (e = z(t, n._$AS(t, e.values), n, i)), e;
}
class Jt {
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
    const { el: { content: r }, parts: i } = this._$AD, n = ((e == null ? void 0 : e.creationScope) ?? H).importNode(r, !0);
    C.currentNode = n;
    let a = C.nextNode(), s = 0, l = 0, o = i[0];
    for (; o !== void 0; ) {
      if (s === o.index) {
        let d;
        o.type === 2 ? d = new Q(a, a.nextSibling, this, e) : o.type === 1 ? d = new o.ctor(a, o.name, o.strings, this, e) : o.type === 6 && (d = new rr(a, this, e)), this._$AV.push(d), o = i[++l];
      }
      s !== (o == null ? void 0 : o.index) && (a = C.nextNode(), s++);
    }
    return C.currentNode = H, n;
  }
  p(e) {
    let r = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, r), r += i.strings.length - 2) : i._$AI(e[r])), r++;
  }
}
class Q {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, r, i, n) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = e, this._$AB = r, this._$AM = i, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
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
    e = z(this, e, r), Z(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== F && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Yt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && Z(this._$AH) ? this._$AA.nextSibling.data = e : this.T(H.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: r, _$litType$: i } = e, n = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = j.createElement(pt(i.h, i.h[0]), this.options)), i);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === n) this._$AH.p(r);
    else {
      const s = new Jt(n, this), l = s.u(this.options);
      s.p(r), this.T(l), this._$AH = s;
    }
  }
  _$AC(e) {
    let r = Ge.get(e.strings);
    return r === void 0 && Ge.set(e.strings, r = new j(e)), r;
  }
  k(e) {
    xe(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let i, n = 0;
    for (const a of e) n === r.length ? r.push(i = new Q(this.O(W()), this.O(W()), this, this.options)) : i = r[n], i._$AI(a), n++;
    n < r.length && (this._$AR(i && i._$AB.nextSibling, n), r.length = n);
  }
  _$AR(e = this._$AA.nextSibling, r) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, r); e !== this._$AB; ) {
      const n = Le(e).nextSibling;
      Le(e).remove(), e = n;
    }
  }
  setConnected(e) {
    var r;
    this._$AM === void 0 && (this._$Cv = e, (r = this._$AP) == null || r.call(this, e));
  }
}
class ue {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, r, i, n, a) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = r, this._$AM = n, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = g;
  }
  _$AI(e, r = this, i, n) {
    const a = this.strings;
    let s = !1;
    if (a === void 0) e = z(this, e, r, 0), s = !Z(e) || e !== this._$AH && e !== F, s && (this._$AH = e);
    else {
      const l = e;
      let o, d;
      for (e = a[0], o = 0; o < a.length - 1; o++) d = z(this, l[i + o], r, o), d === F && (d = this._$AH[o]), s || (s = !Z(d) || d !== this._$AH[o]), d === g ? e = g : e !== g && (e += (d ?? "") + a[o + 1]), this._$AH[o] = d;
    }
    s && !n && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Xt extends ue {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
class er extends ue {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
}
class tr extends ue {
  constructor(e, r, i, n, a) {
    super(e, r, i, n, a), this.type = 5;
  }
  _$AI(e, r = this) {
    if ((e = z(this, e, r, 0) ?? g) === F) return;
    const i = this._$AH, n = e === g && i !== g || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, a = e !== g && (i === g || n);
    n && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var r;
    typeof this._$AH == "function" ? this._$AH.call(((r = this.options) == null ? void 0 : r.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class rr {
  constructor(e, r, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    z(this, e);
  }
}
const ge = K.litHtmlPolyfillSupport;
ge == null || ge(j, Q), (K.litHtmlVersions ?? (K.litHtmlVersions = [])).push("3.3.3");
const ir = (t, e, r) => {
  const i = (r == null ? void 0 : r.renderBefore) ?? e;
  let n = i._$litPart$;
  if (n === void 0) {
    const a = (r == null ? void 0 : r.renderBefore) ?? null;
    i._$litPart$ = n = new Q(e.insertBefore(W(), a), a, void 0, r ?? {});
  }
  return n._$AI(t), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis;
class k extends O {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ir(r, this.renderRoot, this.renderOptions);
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
    return F;
  }
}
var ot;
k._$litElement$ = !0, k.finalized = !0, (ot = P.litElementHydrateSupport) == null || ot.call(P, { LitElement: k });
const pe = P.litElementPolyfillSupport;
pe == null || pe({ LitElement: k });
(P.litElementVersions ?? (P.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nr = { attribute: !0, type: String, converter: oe, reflect: !1, hasChanged: Ae }, ar = (t = nr, e, r) => {
  const { kind: i, metadata: n } = r;
  let a = globalThis.litPropertyMetadata.get(n);
  if (a === void 0 && globalThis.litPropertyMetadata.set(n, a = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), a.set(r.name, t), i === "accessor") {
    const { name: s } = r;
    return { set(l) {
      const o = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(s, o, t, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(s, void 0, t, l), l;
    } };
  }
  if (i === "setter") {
    const { name: s } = r;
    return function(l) {
      const o = this[s];
      e.call(this, l), this.requestUpdate(s, o, t, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function v(t) {
  return (e, r) => typeof r == "object" ? ar(t, e, r) : ((i, n, a) => {
    const s = n.hasOwnProperty(a);
    return n.constructor.createProperty(a, i), s ? Object.getOwnPropertyDescriptor(n, a) : void 0;
  })(t, e, r);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function w(t) {
  return v({ ...t, state: !0, attribute: !1 });
}
const Ve = {
  nearTargetThreshold: 5,
  targetReachedTolerance: 2
}, sr = {
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
function mt(t, e) {
  if (!(t === void 0 || e === void 0))
    return t - e;
}
function _t(t) {
  return {
    nearTargetThreshold: Ke(
      t.nearTargetThreshold,
      Ve.nearTargetThreshold
    ),
    targetReachedTolerance: Ke(
      t.targetReachedTolerance,
      Ve.targetReachedTolerance
    )
  };
}
function ft(t, e, r) {
  const i = mt(t, e);
  if (i === void 0)
    return "unavailable";
  const n = _t(r);
  return i < -20 ? "far_below" : i <= -n.nearTargetThreshold ? "heating" : i < -n.targetReachedTolerance ? "near_target" : i <= n.targetReachedTolerance ? "target_reached" : "above_target";
}
function or(t, e) {
  return t === void 0 || e === void 0 || e <= 0 ? 0 : Math.min(Math.max(t / e, 0), 1);
}
function bt(t, e, r) {
  return {
    difference: mt(t, e),
    progress: or(t, e),
    status: ft(t, e, r)
  };
}
function yt(t) {
  return sr[t];
}
function Ke(t, e) {
  return t === void 0 || !Number.isFinite(t) ? e : Math.max(0, t);
}
const vt = "custom:sauna-suite-card", lr = "sauna-suite-card", dr = "sauna-suite-card", wt = "sauna-suite-editor", ur = "fceeb-sauna-suite-temperature-trend";
function De(t, e, r) {
  t.get(e) || t.define(e, r);
}
var cr = Object.defineProperty, N = (t, e, r, i) => {
  for (var n = void 0, a = t.length - 1, s; a >= 0; a--)
    (s = t[a]) && (n = s(e, r, n) || n);
  return n && cr(e, r, n), n;
};
const ee = 240, te = 80, b = 8;
class R extends k {
  constructor() {
    super(...arguments), this.samples = [], this.status = "unavailable", this.direction = "idle", this.emptyLabel = "No trend data available";
  }
  createRenderRoot() {
    return this;
  }
  render() {
    if (this.samples.length < 2)
      return h`<div class="trend-empty">${this.emptyLabel}</div>`;
    const e = this.getLineColor(), r = this.createLinePath(), i = this.createAreaPath(r), n = this.createTargetReferencePath(), a = this.createCurrentPoint();
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
        ${M`<path d=${i} fill="url(#sauna-suite-trend-fill)"></path>`}
        ${n ? M`<path class="target-reference-line" d=${n} fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 5" stroke-linecap="round"></path>` : void 0}
        ${M`<path class="trend-line" d=${r} fill="none" stroke=${e} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`}
        ${a ? M`<circle class="current-value-marker" cx=${String(a.x)} cy=${String(a.y)} r="4.2" fill=${e} stroke="currentColor" stroke-width="1.5"></circle>` : void 0}
        ${this.heatingRateLabel ? M`<text class="heating-rate-annotation" x="232" y="18" text-anchor="end">${this.heatingRateLabel}</text>` : void 0}
      </svg>
    `;
  }
  createLinePath() {
    return this.samples.map((e, r) => {
      const i = this.mapSampleToPoint(e, r);
      return `${r === 0 ? "M" : "L"} ${i.x.toFixed(1)} ${i.y.toFixed(1)}`;
    }).join(" ");
  }
  createTargetReferencePath() {
    if (this.targetValue === void 0 || !Number.isFinite(this.targetValue))
      return;
    const e = this.mapValueToY(this.targetValue);
    return `M ${b} ${e.toFixed(1)} L ${ee - b} ${e.toFixed(1)}`;
  }
  createCurrentPoint() {
    if (!(this.currentValue === void 0 || !Number.isFinite(this.currentValue)))
      return {
        x: ee - b,
        y: this.mapValueToY(this.currentValue)
      };
  }
  createAreaPath(e) {
    return `${e} L ${ee - b} ${te - b / 2} L ${b} ${te - b / 2} Z`;
  }
  mapSampleToPoint(e, r) {
    const i = (ee - b * 2) / (this.samples.length - 1);
    return {
      x: b + r * i,
      y: this.mapValueToY(e.value)
    };
  }
  mapValueToY(e) {
    const { minimum: r, range: i } = this.getValueRange();
    return te - b - (e - r) / i * (te - b * 2);
  }
  getValueRange() {
    const e = this.samples.map((n) => n.value);
    this.targetValue !== void 0 && Number.isFinite(this.targetValue) && e.push(this.targetValue), this.currentValue !== void 0 && Number.isFinite(this.currentValue) && e.push(this.currentValue);
    const r = Math.min(...e), i = Math.max(...e);
    return {
      minimum: r,
      range: i - r || 1
    };
  }
  getLineColor() {
    return this.direction === "cooling" ? "#4ea3ff" : yt(this.status).line;
  }
}
N([
  v({ attribute: !1 })
], R.prototype, "samples");
N([
  v()
], R.prototype, "status");
N([
  v()
], R.prototype, "direction");
N([
  v({ attribute: "empty-label" })
], R.prototype, "emptyLabel");
N([
  v({ attribute: "target-value", type: Number })
], R.prototype, "targetValue");
N([
  v({ attribute: "current-value", type: Number })
], R.prototype, "currentValue");
N([
  v({ attribute: "heating-rate-label" })
], R.prototype, "heatingRateLabel");
De(customElements, ur, R);
function q(t, e, r) {
  if (me(t, "value"), me(e, "minimum"), me(r, "maximum"), e > r)
    throw new RangeError("minimum must be less than or equal to maximum");
  return Math.min(Math.max(t, e), r);
}
function me(t, e) {
  if (!Number.isFinite(t))
    throw new RangeError(`${e} must be a finite number`);
}
const hr = 0.02, gr = -0.02;
function pr(t, e) {
  const r = t.filter(
    (a) => Number.isFinite(a.timestamp) && Number.isFinite(a.value) && a.timestamp >= 0
  ).sort((a, s) => a.timestamp - s.timestamp);
  if (r.length < e)
    return {
      validSampleCount: r.length,
      validSlopeCount: 0
    };
  const i = _r(r);
  if (i.length === 0)
    return {
      validSampleCount: r.length,
      validSlopeCount: 0
    };
  const n = fr(i);
  return {
    rateCPerMinute: Se(n),
    validSampleCount: r.length,
    validSlopeCount: n.length
  };
}
function mr(t) {
  return t !== void 0 && Number.isFinite(t) && t >= hr;
}
function We(t) {
  return t !== void 0 && Number.isFinite(t) && t <= gr;
}
function _r(t) {
  const e = [];
  for (let r = 1; r < t.length; r += 1) {
    const i = t[r - 1], n = t[r];
    if (!i || !n)
      continue;
    const a = (n.timestamp - i.timestamp) / 6e4;
    if (!Number.isFinite(a) || a <= 0)
      continue;
    const s = (n.value - i.value) / a;
    Number.isFinite(s) && e.push(s);
  }
  return e;
}
function fr(t) {
  const e = Se(t), r = t.map((s) => Math.abs(s - e)), i = Se(r), n = Math.max(0.05, i * 3), a = t.filter((s) => Math.abs(s - e) <= n);
  return a.length > 0 ? a : [...t];
}
function Se(t) {
  const e = [...t].sort((n, a) => n - a), r = Math.floor(e.length / 2), i = e[r] ?? 0;
  return e.length % 2 === 1 ? i : ((e[r - 1] ?? i) + i) / 2;
}
const br = 20, yr = 0.85, vr = 1.25, wr = 0.75, Tr = 1.5;
function Sr(t) {
  const e = $r(
    t.outsideTemperature,
    t.outsideTemperatureWeight
  ), r = Er(
    t.effectivePowerKw,
    t.nominalPowerKw
  );
  if (t.currentTemperature === void 0 || t.targetTemperature === void 0 || !Number.isFinite(t.currentTemperature) || !Number.isFinite(t.targetTemperature))
    return {
      outsideCorrectionFactor: e,
      powerCorrectionFactor: r,
      unavailableReason: "missing_temperature"
    };
  const i = t.targetTemperature - t.currentTemperature;
  if (i <= 0)
    return {
      outsideCorrectionFactor: e,
      powerCorrectionFactor: r,
      unavailableReason: "target_reached"
    };
  if (t.effectivePowerKw === 0)
    return {
      outsideCorrectionFactor: e,
      powerCorrectionFactor: r,
      unavailableReason: "heater_off"
    };
  if (t.effectivePowerKw === void 0 || !Number.isFinite(t.effectivePowerKw) || t.effectivePowerKw < 0)
    return {
      outsideCorrectionFactor: e,
      powerCorrectionFactor: r,
      unavailableReason: "missing_power"
    };
  if (t.hasInsufficientHistory)
    return {
      outsideCorrectionFactor: e,
      powerCorrectionFactor: r,
      unavailableReason: "insufficient_history"
    };
  const n = t.heatingRateCPerMinute;
  if (!mr(n))
    return {
      outsideCorrectionFactor: e,
      powerCorrectionFactor: r,
      unavailableReason: "invalid_rate"
    };
  const s = i / n;
  return {
    etaMinutes: s * e * r,
    baseEtaMinutes: s,
    outsideCorrectionFactor: e,
    powerCorrectionFactor: r
  };
}
function $r(t, e) {
  if (t === void 0 || !Number.isFinite(t))
    return 1;
  const i = 1 + Math.max(0, e) * ((br - t) / 40);
  return q(i, yr, vr);
}
function Er(t, e) {
  return t === void 0 || !Number.isFinite(t) || t <= 0 || !Number.isFinite(e) || e <= 0 ? 1 : q(e / t, wr, Tr);
}
function Rr(t, e) {
  if (t === void 0 || !Number.isFinite(t) || t < 0)
    return;
  const r = Math.max(1, Math.round(t));
  if (r < 60)
    return `${e.readyIn} ${r} ${r === 1 ? e.minute : e.minutes}`;
  const i = Math.floor(r / 60), n = r % 60, a = i === 1 ? e.hour : e.hours;
  return n === 0 ? `${e.readyIn} ${i} ${a}` : `${e.readyIn} ${i} ${a} ${n} ${n === 1 ? e.minute : e.minutes}`;
}
function Ar(t, e, r) {
  if (t === void 0 || !Number.isFinite(t) || t < 0)
    return;
  const i = new Date(e.getTime() + t * 6e4);
  return new Intl.DateTimeFormat(r, {
    hour: "2-digit",
    minute: "2-digit"
  }).format(i);
}
const _e = {
  green: { red: 42, green: 202, blue: 116 },
  gold: { red: 238, green: 185, blue: 58 },
  red: { red: 232, green: 80, blue: 56 },
  blue: { red: 63, green: 140, blue: 255 },
  purple: { red: 158, green: 111, blue: 255 },
  white: { red: 255, green: 244, blue: 224 }
}, Ze = { red: 63, green: 140, blue: 255 }, je = { red: 34, green: 199, blue: 216 }, qe = { red: 47, green: 184, blue: 111 }, xr = { red: 235, green: 205, blue: 74 }, Dr = { red: 215, green: 179, blue: 57 }, Mr = { red: 236, green: 134, blue: 50 }, Cr = { red: 228, green: 93, blue: 63 }, Pr = { red: 128, green: 128, blue: 128 };
function Ye(t, e, r) {
  const i = bt(t, e, r), n = _t(r), a = i.difference === void 0 ? Pr : Nr(
    i.difference,
    n.nearTargetThreshold,
    n.targetReachedTolerance
  );
  return {
    rgb: a,
    hs: Tt(a),
    status: i.status
  };
}
function kr(t) {
  return t && t in _e ? _e[t] : _e.green;
}
function J(t) {
  return {
    red: fe(t.red),
    green: fe(t.green),
    blue: fe(t.blue)
  };
}
function Hr(t) {
  const e = J(t);
  return [e.red, e.green, e.blue];
}
function Tt(t) {
  const e = J(t), r = e.red / 255, i = e.green / 255, n = e.blue / 255, a = Math.max(r, i, n), s = Math.min(r, i, n), l = a - s;
  if (l === 0)
    return { hue: 0, saturation: 0 };
  let o;
  return a === r ? o = (i - n) / l % 6 : a === i ? o = (n - r) / l + 2 : o = (r - i) / l + 4, o = Math.round(o * 60), o < 0 && (o += 360), {
    hue: o,
    saturation: Number((l / a * 100).toFixed(1))
  };
}
function Nr(t, e, r) {
  if (t < -20)
    return Ze;
  if (t <= -e) {
    const i = Math.max(1, 20 - e), n = se((t + 20) / i);
    return n < 0.5 ? re(Ze, je, n * 2) : re(je, qe, (n - 0.5) * 2);
  }
  if (t < -r) {
    const i = Math.max(1, e - r);
    return re(qe, xr, se((t + e) / i));
  }
  return t <= r ? Dr : re(Mr, Cr, se((t - r) / 20));
}
function re(t, e, r) {
  const i = se(r);
  return {
    red: Math.round(t.red + (e.red - t.red) * i),
    green: Math.round(t.green + (e.green - t.green) * i),
    blue: Math.round(t.blue + (e.blue - t.blue) * i)
  };
}
function se(t) {
  return Number.isFinite(t) ? Math.min(Math.max(t, 0), 1) : 0;
}
function fe(t) {
  return t === void 0 || !Number.isFinite(t) ? 0 : Math.round(Math.min(Math.max(t, 0), 255));
}
function $e() {
  return {
    eligible: !0,
    ready: !1,
    acknowledged: !1
  };
}
function Or(t) {
  return {
    ...t,
    acknowledged: !0
  };
}
function Lr(t, e) {
  if (!e.saunaOn)
    return {
      state: $e(),
      triggered: !1
    };
  const r = St(e), i = Fr(e), n = i ? !0 : t.eligible, a = i ? !1 : t.acknowledged, s = r && n && !a && !t.ready;
  return {
    state: {
      eligible: s ? !1 : n,
      ready: r,
      acknowledged: a
    },
    triggered: s
  };
}
function St(t) {
  return t.saunaOn ? ft(t.controlTemperature, t.targetTemperature, t.thresholds) === "target_reached" : !1;
}
function Fr(t) {
  if (t.controlTemperature === void 0 || t.targetTemperature === void 0)
    return !1;
  const e = typeof t.thresholds.nearTargetThreshold == "number" && Number.isFinite(t.thresholds.nearTargetThreshold) ? Math.max(0, t.thresholds.nearTargetThreshold) : 5;
  return t.controlTemperature < t.targetTemperature - e;
}
const $t = [
  "top",
  "middle",
  "bottom",
  "average",
  "weighted_average",
  "minimum",
  "maximum"
], Et = ["fixed", "general_power_sensor"], Rt = ["off", "temperature_gradient", "ready_only"], At = ["hold", "blink", "pulse"], xt = ["green", "gold", "red", "blue", "purple", "white"], Dt = "Sauna Suite", be = 1, Qe = 9, zr = 0.15, Ur = 5, Br = 30, Ir = 5, Gr = 2, Vr = 120, Kr = 5, Wr = 100, Zr = 5, jr = 100, qr = 1, Yr = 30, Qr = 60;
function B() {
  return {
    type: vt,
    name: Dt,
    control_temperature_mode: "average",
    heating_power_mode: "fixed",
    fixed_heater_power_kw: Qe,
    heater_rated_power_kw: Qe,
    outside_temperature_weight: zr,
    weight_top: be,
    weight_middle: be,
    weight_bottom: be,
    show_outside_temperature: !1,
    show_temperature_zones: !0,
    show_eta: !0,
    show_ready_time: !0,
    show_heating_rate: !0,
    eta_minimum_samples: Ur,
    eta_history_minutes: Br,
    near_target_threshold: Ir,
    target_reached_tolerance: Gr,
    show_temperature_trend: !0,
    trend_history_minutes: Vr,
    trend_refresh_minutes: Kr,
    confirm_switch_on: !0,
    rgb_enabled: !1,
    rgb_mode: "temperature_gradient",
    rgb_brightness: Wr,
    rgb_update_interval_seconds: Zr,
    rgb_restore_previous_state: !0,
    rgb_only_when_sauna_on: !0,
    ready_signal_enabled: !0,
    ready_signal_mode: "hold",
    ready_signal_color: "green",
    ready_signal_brightness: jr,
    ready_signal_interval_seconds: qr,
    ready_signal_duration_seconds: Yr,
    ready_signal_requires_acknowledgement: !1,
    ready_signal_repeat: !1,
    ready_signal_repeat_interval_seconds: Qr
  };
}
function L(t) {
  const e = B(), r = {
    type: vt,
    name: Mt(t.name, Dt),
    control_temperature_mode: Jr(t.control_temperature_mode),
    heating_power_mode: Xr(t.heating_power_mode),
    fixed_heater_power_kw: D(
      t.fixed_heater_power_kw,
      e.fixed_heater_power_kw,
      0,
      50
    ),
    heater_rated_power_kw: D(
      t.heater_rated_power_kw,
      e.heater_rated_power_kw,
      0,
      50
    ),
    outside_temperature_weight: D(
      t.outside_temperature_weight,
      e.outside_temperature_weight,
      0,
      1
    ),
    weight_top: ye(t.weight_top, e.weight_top),
    weight_middle: ye(t.weight_middle, e.weight_middle),
    weight_bottom: ye(t.weight_bottom, e.weight_bottom),
    show_outside_temperature: p(
      t.show_outside_temperature,
      e.show_outside_temperature
    ),
    show_temperature_zones: p(
      t.show_temperature_zones,
      e.show_temperature_zones
    ),
    show_eta: p(t.show_eta, e.show_eta),
    show_ready_time: p(t.show_ready_time, e.show_ready_time),
    show_heating_rate: p(t.show_heating_rate, e.show_heating_rate),
    eta_minimum_samples: x(
      t.eta_minimum_samples,
      e.eta_minimum_samples,
      2,
      60
    ),
    eta_history_minutes: D(
      t.eta_history_minutes,
      e.eta_history_minutes,
      5,
      1440
    ),
    near_target_threshold: Je(
      t.near_target_threshold,
      e.near_target_threshold
    ),
    target_reached_tolerance: Je(
      t.target_reached_tolerance,
      e.target_reached_tolerance
    ),
    show_temperature_trend: p(
      t.show_temperature_trend,
      e.show_temperature_trend
    ),
    trend_history_minutes: D(
      t.trend_history_minutes,
      e.trend_history_minutes,
      15,
      1440
    ),
    trend_refresh_minutes: D(
      t.trend_refresh_minutes,
      e.trend_refresh_minutes,
      1,
      60
    ),
    confirm_switch_on: p(t.confirm_switch_on, e.confirm_switch_on),
    rgb_enabled: p(t.rgb_enabled, e.rgb_enabled),
    rgb_mode: ei(t.rgb_mode),
    rgb_brightness: x(t.rgb_brightness, e.rgb_brightness, 1, 100),
    rgb_update_interval_seconds: x(
      t.rgb_update_interval_seconds,
      e.rgb_update_interval_seconds,
      1,
      3600
    ),
    rgb_restore_previous_state: p(
      t.rgb_restore_previous_state,
      e.rgb_restore_previous_state
    ),
    rgb_only_when_sauna_on: p(
      t.rgb_only_when_sauna_on,
      e.rgb_only_when_sauna_on
    ),
    ready_signal_enabled: p(
      t.ready_signal_enabled,
      e.ready_signal_enabled
    ),
    ready_signal_mode: ti(t.ready_signal_mode),
    ready_signal_color: ri(t.ready_signal_color),
    ready_signal_brightness: x(
      t.ready_signal_brightness,
      e.ready_signal_brightness,
      1,
      100
    ),
    ready_signal_interval_seconds: x(
      t.ready_signal_interval_seconds,
      e.ready_signal_interval_seconds,
      1,
      3600
    ),
    ready_signal_duration_seconds: x(
      t.ready_signal_duration_seconds,
      e.ready_signal_duration_seconds,
      1,
      3600
    ),
    ready_signal_requires_acknowledgement: p(
      t.ready_signal_requires_acknowledgement,
      e.ready_signal_requires_acknowledgement
    ),
    ready_signal_repeat: p(t.ready_signal_repeat, e.ready_signal_repeat),
    ready_signal_repeat_interval_seconds: x(
      t.ready_signal_repeat_interval_seconds,
      e.ready_signal_repeat_interval_seconds,
      1,
      86400
    )
  };
  return S(r, "main_switch_entity", t.main_switch_entity), S(r, "temperature_top_entity", t.temperature_top_entity), S(r, "temperature_middle_entity", t.temperature_middle_entity), S(r, "temperature_bottom_entity", t.temperature_bottom_entity), S(r, "outside_temperature_entity", t.outside_temperature_entity), S(r, "target_temperature_entity", t.target_temperature_entity), S(
    r,
    "general_power_sensor_entity",
    t.general_power_sensor_entity
  ), S(r, "rgb_light_entity", t.rgb_light_entity), r;
}
function Jr(t) {
  return typeof t == "string" && $t.includes(t) ? t : B().control_temperature_mode;
}
function Xr(t) {
  return typeof t == "string" && Et.includes(t) ? t : B().heating_power_mode;
}
function ei(t) {
  return typeof t == "string" && Rt.includes(t) ? t : B().rgb_mode;
}
function ti(t) {
  return typeof t == "string" && At.includes(t) ? t : B().ready_signal_mode;
}
function ri(t) {
  return typeof t == "string" && xt.includes(t) ? t : B().ready_signal_color;
}
function ye(t, e) {
  return typeof t != "number" || !Number.isFinite(t) ? e : Math.max(0, t);
}
function p(t, e) {
  return typeof t == "boolean" ? t : e;
}
function Je(t, e) {
  return typeof t != "number" || !Number.isFinite(t) ? e : Math.max(0, t);
}
function Mt(t, e) {
  return typeof t == "string" ? t : e;
}
function S(t, e, r) {
  const i = Mt(r);
  i !== void 0 && (t[e] = i);
}
function D(t, e, r, i) {
  return typeof t != "number" || !Number.isFinite(t) ? e : q(t, r, i);
}
function x(t, e, r, i) {
  return Math.round(D(t, e, r, i));
}
function Ct(t) {
  return U(t) === "switch" || U(t) === "input_boolean";
}
function Pt(t) {
  return U(t) === "number" || U(t) === "input_number";
}
function ie(t) {
  return !t || t.state === "unavailable" || t.state === "unknown";
}
async function ii(t, e, r) {
  if (!(t != null && t.callService))
    return { ok: !1, error: "Home Assistant service API is unavailable." };
  if (!Ct(e))
    return { ok: !1, error: "Unsupported switch entity domain." };
  const i = U(e), n = r ? "turn_on" : "turn_off";
  try {
    return await t.callService(i, n, { entity_id: e }), { ok: !0 };
  } catch (a) {
    return {
      ok: !1,
      error: a instanceof Error ? a.message : "Failed to update switch entity."
    };
  }
}
async function ni(t, e, r, i) {
  if (!(t != null && t.callService))
    return { ok: !1, error: "Home Assistant service API is unavailable." };
  if (!Pt(e))
    return { ok: !1, error: "Unsupported target temperature entity domain." };
  const n = U(e), a = ai(r, i);
  try {
    return await t.callService(n, "set_value", {
      entity_id: e,
      value: a
    }), { ok: !0 };
  } catch (s) {
    return {
      ok: !1,
      error: s instanceof Error ? s.message : "Failed to update target temperature."
    };
  }
}
function Xe(t) {
  if (!t)
    return;
  const e = ve(t, "min"), r = ve(t, "max"), i = ve(t, "step");
  if (!(e === void 0 || r === void 0 || i === void 0 || i <= 0))
    return {
      minimum: e,
      maximum: r,
      step: i
    };
}
function ai(t, e) {
  const r = q(t, e.minimum, e.maximum), i = Math.round((r - e.minimum) / e.step), n = e.minimum + i * e.step, a = si(e.step);
  return Number(q(n, e.minimum, e.maximum).toFixed(a));
}
function U(t) {
  return (t == null ? void 0 : t.split(".")[0]) ?? "";
}
function ve(t, e) {
  const r = t.attributes[e], i = typeof r == "number" ? r : Number(r);
  return Number.isFinite(i) ? i : void 0;
}
function si(t) {
  const [, e = ""] = t.toString().split(".");
  return e.length;
}
function oi(t) {
  const e = typeof t == "number" ? t : Number(t);
  return Number.isFinite(e) ? e : void 0;
}
function li(t, e) {
  if (t === void 0 || !Number.isFinite(t))
    return;
  const r = e == null ? void 0 : e.trim().toLowerCase();
  if (r === "w")
    return t / 1e3;
  if (r === "kw" || r === void 0 || r === "")
    return t;
}
function de(t) {
  if (!(t === void 0 || !Number.isFinite(t) || t < 0))
    return t;
}
function di(t, e) {
  return de(li(oi(t), e));
}
function ui(t, e) {
  const r = de(t), i = de(e);
  if (!(r === void 0 || i === void 0))
    return Math.min(r, i);
}
const ci = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function kt(t) {
  if (t === void 0)
    return;
  if (typeof t == "number")
    return Number.isFinite(t) ? t : void 0;
  const e = t.trim().toLowerCase();
  if (ci.has(e))
    return;
  const r = Number(t);
  return Number.isFinite(r) ? r : void 0;
}
function hi(t) {
  const e = t.filter(Number.isFinite);
  return e.length === 0 ? void 0 : e.reduce((i, n) => i + n, 0) / e.length;
}
function gi(t, e) {
  const r = Ht(t).map((a) => ({
    value: t[a],
    weight: yi(e[a])
  })).filter((a) => a.value !== void 0), i = r.reduce((a, s) => a + s.weight, 0);
  return r.length === 0 || i <= 0 ? void 0 : r.reduce((a, s) => a + s.value * s.weight, 0) / i;
}
function pi(t) {
  const e = Me(t);
  return e.length > 0 ? Math.min(...e) : void 0;
}
function mi(t) {
  const e = Me(t);
  return e.length > 0 ? Math.max(...e) : void 0;
}
function _i(t, e, r) {
  switch (e) {
    case "top":
      return t.top;
    case "middle":
      return t.middle;
    case "bottom":
      return t.bottom;
    case "average":
      return hi(Me(t));
    case "weighted_average":
      return gi(t, r);
    case "minimum":
      return pi(t);
    case "maximum":
      return mi(t);
  }
}
function fi(t) {
  if (!(t.top === void 0 || t.bottom === void 0))
    return t.top - t.bottom;
}
function bi(t, e, r) {
  return {
    controlTemperature: _i(t, e, r),
    stratification: fi(t)
  };
}
function Me(t) {
  return Ht(t).map((e) => t[e]).filter((e) => e !== void 0);
}
function Ht(t) {
  return ["top", "middle", "bottom"].filter((r) => t[r] !== void 0);
}
function yi(t) {
  return Number.isFinite(t) ? Math.max(0, t) : 0;
}
function we(t, e) {
  const r = {
    top: G(t, e.temperature_top_entity),
    middle: G(t, e.temperature_middle_entity),
    bottom: G(t, e.temperature_bottom_entity)
  }, i = {
    top: e.weight_top,
    middle: e.weight_middle,
    bottom: e.weight_bottom
  };
  return {
    zones: r,
    outsideTemperature: G(t, e.outside_temperature_entity),
    targetTemperature: G(t, e.target_temperature_entity),
    summary: bi(r, e.control_temperature_mode, i)
  };
}
function G(t, e) {
  var r;
  if (!(!t || !e))
    return kt((r = t.states[e]) == null ? void 0 : r.state);
}
function y(t, e) {
  if (!(!t || !e))
    return t.states[e];
}
function vi(t, e) {
  const r = y(t, e.main_switch_entity), i = Si(e);
  return (r == null ? void 0 : r.state) === "off" ? {
    effectivePowerKw: 0,
    nominalPowerKw: i,
    mode: e.heating_power_mode,
    approximate: e.heating_power_mode === "general_power_sensor"
  } : e.heating_power_mode === "general_power_sensor" ? {
    effectivePowerKw: wi(t, e),
    nominalPowerKw: i,
    mode: e.heating_power_mode,
    approximate: !0
  } : {
    effectivePowerKw: de(e.fixed_heater_power_kw),
    nominalPowerKw: i,
    mode: e.heating_power_mode,
    approximate: !1
  };
}
function wi(t, e) {
  const r = y(t, e.general_power_sensor_entity), i = Ti(r);
  return ui(i, e.heater_rated_power_kw);
}
function Ti(t) {
  if (!t || t.state === "unavailable" || t.state === "unknown")
    return;
  const e = t.attributes.unit_of_measurement;
  return di(
    t.state,
    typeof e == "string" ? e : void 0
  );
}
function Si(t) {
  return t.heating_power_mode === "general_power_sensor" ? t.heater_rated_power_kw : t.fixed_heater_power_kw;
}
class $i {
  constructor() {
    this.lastCommandAt = 0;
  }
  async sync(e) {
    var u;
    if (!this.shouldBeActive(e.config, e.saunaOn, e.command))
      return this.release(e.hass, e.config);
    if (!((u = e.hass) != null && u.callService))
      return { ok: !0, active: !1, status: "inactive" };
    if (!Ot(e.config.rgb_light_entity))
      return {
        ok: !1,
        active: !1,
        status: "unsupported",
        error: "Unsupported light entity."
      };
    if (!e.light || e.light.state === "unavailable" || e.light.state === "unknown")
      return { ok: !1, active: !1, status: "unavailable", error: "Light unavailable." };
    const i = Ai(e.command), n = Nt(e.light);
    if (!i.off && !n.supported)
      return {
        ok: !1,
        active: !1,
        status: "unsupported",
        error: "Configured light does not support color control."
      };
    const a = e.config.rgb_light_entity, s = Ei(a, n.capability, i), l = JSON.stringify(s), o = e.now ?? Date.now(), d = e.config.rgb_update_interval_seconds * 1e3;
    if (!e.force && this.lastCommandKey === l && o - this.lastCommandAt < d)
      return { ok: !0, active: !0, status: "throttled" };
    this.captureStateOnce(e.config, e.light);
    try {
      return await e.hass.callService("light", i.off ? "turn_off" : "turn_on", s), this.controlledEntityId = a, this.lastCommandKey = l, this.lastCommandAt = o, { ok: !0, active: !0, status: "updated" };
    } catch (c) {
      return {
        ok: !1,
        active: !1,
        status: "unavailable",
        error: c instanceof Error ? c.message : "Failed to update RGB light."
      };
    }
  }
  async release(e, r) {
    if (this.lastCommandKey = void 0, this.lastCommandAt = 0, !this.capturedState || !this.controlledEntityId)
      return { ok: !0, active: !1, status: "inactive" };
    if (!r.rgb_restore_previous_state || !(e != null && e.callService))
      return this.clearCapturedState(), { ok: !0, active: !1, status: "inactive" };
    const i = this.controlledEntityId, n = this.capturedState;
    this.clearCapturedState();
    try {
      return n.state === "on" ? await e.callService("light", "turn_on", xi(i, n)) : await e.callService("light", "turn_off", { entity_id: i }), { ok: !0, active: !1, status: "restored" };
    } catch (a) {
      return {
        ok: !1,
        active: !1,
        status: "unavailable",
        error: a instanceof Error ? a.message : "Failed to restore RGB light."
      };
    }
  }
  reset() {
    this.clearCapturedState(), this.lastCommandKey = void 0, this.lastCommandAt = 0;
  }
  shouldBeActive(e, r, i) {
    return e.rgb_enabled && e.rgb_mode !== "off" && i !== void 0 && (!e.rgb_only_when_sauna_on || r);
  }
  captureStateOnce(e, r) {
    !e.rgb_restore_previous_state || this.capturedState || (this.capturedState = {
      state: r.state,
      brightness: et(r, "brightness"),
      rgbColor: tt(r, "rgb_color", 3),
      hsColor: tt(r, "hs_color", 2),
      colorTemp: et(r, "color_temp")
    });
  }
  clearCapturedState() {
    this.capturedState = void 0, this.controlledEntityId = void 0;
  }
}
function Nt(t) {
  if (!t || !Ot(t.entity_id))
    return { capability: "unsupported", supported: !1 };
  const e = Di(t, "supported_color_modes"), r = Mi(t, "color_mode"), i = /* @__PURE__ */ new Set([...e, ...r ? [r] : []]);
  return i.has("rgb") || i.has("rgbw") || i.has("rgbww") || t.attributes.rgb_color ? { capability: "rgb_color", supported: !0 } : i.has("hs") || t.attributes.hs_color ? { capability: "hs_color", supported: !0 } : i.has("color_temp") || t.attributes.color_temp ? { capability: "color_temp", supported: !0 } : { capability: "unsupported", supported: !1 };
}
function Ot(t) {
  return (t == null ? void 0 : t.startsWith("light.")) === !0;
}
function Ei(t, e, r) {
  const i = Lt(r.brightness), n = {
    entity_id: t
  };
  if (r.off)
    return n;
  const a = J(r.color ?? {});
  if (n.brightness_pct = i, e === "rgb_color")
    n.rgb_color = Hr(a);
  else if (e === "hs_color") {
    const s = Tt(a);
    n.hs_color = [s.hue, s.saturation];
  } else e === "color_temp" && (n.color_temp = Ri(a));
  return n;
}
function Ri(t) {
  const e = J(t), r = (e.red + e.green * 0.45 - e.blue * 0.55) / 369.75;
  return Math.round(370 - Math.min(Math.max(r, 0), 1) * 217);
}
function Ai(t) {
  return t != null && t.off ? { off: !0 } : {
    color: J((t == null ? void 0 : t.color) ?? {}),
    brightness: Lt(t == null ? void 0 : t.brightness)
  };
}
function xi(t, e) {
  const r = { entity_id: t };
  return e.brightness !== void 0 && (r.brightness = e.brightness), e.rgbColor ? r.rgb_color = e.rgbColor : e.hsColor ? r.hs_color = e.hsColor : e.colorTemp !== void 0 && (r.color_temp = e.colorTemp), r;
}
function Lt(t) {
  return t === void 0 || !Number.isFinite(t) ? 100 : Math.round(Math.min(Math.max(t, 1), 100));
}
function Di(t, e) {
  const r = t.attributes[e];
  return Array.isArray(r) ? r.filter((i) => typeof i == "string") : [];
}
function Mi(t, e) {
  const r = t.attributes[e];
  return typeof r == "string" ? r : void 0;
}
function et(t, e) {
  const r = t.attributes[e];
  return typeof r == "number" && Number.isFinite(r) ? r : void 0;
}
function tt(t, e, r) {
  const i = t.attributes[e];
  if (!(!Array.isArray(i) || i.length < r || !i.slice(0, r).every((n) => typeof n == "number" && Number.isFinite(n))))
    return r === 2 ? [i[0], i[1]] : [i[0], i[1], i[2]];
}
async function Ci(t, e, r, i = 120) {
  if (!(t != null && t.callApi) || !e)
    return [];
  const n = /* @__PURE__ */ new Date(), a = new Date(n.getTime() - r * 6e4), s = new URLSearchParams({
    filter_entity_id: e,
    end_time: n.toISOString(),
    minimal_response: "1",
    no_attributes: "1"
  });
  try {
    const l = await t.callApi(
      "GET",
      `history/period/${a.toISOString()}?${s.toString()}`
    );
    return ki(Pi(l), i);
  } catch {
    return [];
  }
}
function Pi(t) {
  return t.flat().map((e) => {
    const r = kt(e.state), i = e.last_changed ?? e.last_updated, n = i ? Date.parse(i) : Number.NaN;
    if (!(r === void 0 || !Number.isFinite(n)))
      return {
        timestamp: n,
        value: r
      };
  }).filter((e) => e !== void 0);
}
function ki(t, e) {
  if (t.length <= e)
    return [...t];
  const r = Math.ceil(t.length / e);
  return t.filter((i, n) => n % r === 0).slice(0, e);
}
const Hi = /* @__PURE__ */ new Set(["top", "middle", "bottom"]);
function rt(t) {
  return Hi.has(t);
}
function it(t) {
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
const Ni = dt`
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
`, Oi = { bottomTemperature: "Unten", confirmSwitchOn: "Sauna-Entitaet manuell einschalten?", controlTemperature: "Regeltemperatur", decreaseTarget: "Zieltemperatur verringern", earlyDevelopment: "Fruehe Entwicklung", increaseTarget: "Zieltemperatur erhoehen", middleTemperature: "Mitte", name: "Sauna Suite", notAvailable: "Nicht verfuegbar", outsideTemperature: "Aussen", pending: "Aktualisiere...", placeholder: "Nur manuelle Bedienung und Monitoring. Es ist keine automatische Heizungsregelung implementiert.", powerOff: "Aus", powerOn: "Ein", powerUnavailable: "Nicht verfuegbar", sliderUnavailable: "Slider nicht verfuegbar, weil min, max oder step fehlen.", stratification: "Temperaturschichtung", targetDifference: "Differenz zum Ziel", targetTemperature: "Ziel", temperatureTrend: "Temperaturverlauf", temperatureZones: "Temperaturzonen", togglePower: "Sauna-Power-Entitaet umschalten", topTemperature: "Oben", trendDirectModesOnly: "Der Trend ist derzeit nur für direkte Sensormodi verfügbar.", trendLoading: "Verlaufsdaten werden geladen", trendUnavailable: "Keine Verlaufsdaten verfuegbar", effectivePower: "Heizleistung", estimatedPower: "Geschaetzte Heizleistung", etaUnavailable: "ETA nicht verfuegbar", heatingRate: "Heizrate", ready: "Bereit", readyAt: "Bereit um", rgbStatus: "RGB-Status", rgbLight: "RGB-Licht", rgbUnsupportedLight: "Konfiguriertes Licht unterstuetzt keine Farbe.", rgbLightUnavailable: "RGB-Licht nicht verfuegbar.", acknowledgeReadySignal: "Quittieren" }, Li = { cardName: "Kartenname", cardNameDescription: "Titel im Kartenkopf.", confirmSwitchOn: "Einschalten bestaetigen", confirmSwitchOnDescription: "Vor dem manuellen Einschalten der konfigurierten Entitaet einen Dialog anzeigen.", controlTemperatureMode: "Modus fuer Regeltemperatur", controlTemperatureModeDescription: "Legt fest, welche Temperatur als zentrale Regeltemperatur angezeigt wird.", mainSwitchEntity: "Hauptschalter-Entitaet", mainSwitchEntityDescription: "Entitaet fuer den manuellen Power-Button. Unterstuetzt: switch und input_boolean.", nearTargetThreshold: "Nahe-Ziel-Schwelle", nearTargetThresholdDescription: "Grad unter Zieltemperatur, die als nahe am Ziel gelten.", outsideTemperatureEntity: "Aussentemperatur-Entitaet", outsideTemperatureEntityDescription: "Optionaler Aussentemperatur-Sensor.", sections: { display: "Anzeige", entities: "Entitaeten", general: "Allgemein", safety: "Sicherheit und Bestaetigung", temperatureCalculation: "Temperaturberechnung", trend: "Verlauf", heatingEta: "Heiz-ETA", rgbReadySignal: "RGB & Bereit-Signal" }, showOutsideTemperature: "Aussentemperatur anzeigen", showOutsideTemperatureDescription: "Aussentemperatur anzeigen, wenn eine Entitaet konfiguriert ist.", showTemperatureTrend: "Temperaturverlauf anzeigen", showTemperatureTrendDescription: "Aktuelle Recorder-Historie fuer direkte Sensormodi oben, Mitte oder unten laden.", showTemperatureZones: "Temperaturzonen anzeigen", showTemperatureZonesDescription: "Werte der Sensoren oben, Mitte und unten anzeigen.", targetReachedTolerance: "Ziel-erreicht-Toleranz", targetReachedToleranceDescription: "Grad um die Zieltemperatur, die als Ziel erreicht gelten.", targetTemperatureEntity: "Zieltemperatur-Entitaet", targetTemperatureEntityDescription: "Entitaet fuer manuelle Zielwerte. Unterstuetzt: number und input_number.", temperatureBottomEntity: "Temperatur unten", temperatureBottomEntityDescription: "Temperatursensor unten in der Sauna.", temperatureMiddleEntity: "Temperatur Mitte", temperatureMiddleEntityDescription: "Temperatursensor in der Mitte der Sauna.", temperatureTopEntity: "Temperatur oben", temperatureTopEntityDescription: "Temperatursensor oben in der Sauna.", trendHistoryMinutes: "Verlauf in Minuten", trendHistoryMinutesDescription: "Zeitfenster aus dem Recorder. Erlaubt: 15 bis 1440 Minuten.", trendRefreshMinutes: "Aktualisierung in Minuten", trendRefreshMinutesDescription: "Intervall fuer die Verlaufsaktualisierung. Erlaubt: 1 bis 60 Minuten.", weightBottom: "Gewichtung unten", weightBottomDescription: "Gewichtung fuer den unteren Sensor beim gewichteten Durchschnitt.", weightMiddle: "Gewichtung Mitte", weightMiddleDescription: "Gewichtung fuer den mittleren Sensor beim gewichteten Durchschnitt.", weightTop: "Gewichtung oben", weightTopDescription: "Gewichtung fuer den oberen Sensor beim gewichteten Durchschnitt.", etaHistoryMinutes: "ETA-Verlauf in Minuten", etaHistoryMinutesDescription: "Recorder-Zeitfenster fuer ETA und Heizrate.", etaMinimumSamples: "ETA-Mindestanzahl Samples", etaMinimumSamplesDescription: "Mindestanzahl gueltiger Recorder-Samples fuer die ETA.", fixedHeaterPowerKw: "Feste Ofenleistung (kW)", fixedHeaterPowerKwDescription: "Nennleistung des Ofens fuer die ETA ohne Leistungssensor.", generalPowerSensorEntity: "Allgemeiner Leistungssensor", generalPowerSensorEntityDescription: "Ungefaehrer Gesamtleistungssensor. W und kW werden unterstuetzt.", heaterRatedPowerKw: "Ofen-Nennleistung (kW)", heaterRatedPowerKwDescription: "Maximaler Sauna-Anteil fuer die Schaetzung aus dem allgemeinen Leistungssensor.", heatingPowerMode: "Heizleistungsmodus", heatingPowerModeDescription: "Feste Ofenleistung oder ungefaehre Schaetzung aus einem allgemeinen Leistungssensor.", outsideTemperatureWeight: "Aussentemperatur-Gewichtung", outsideTemperatureWeightDescription: "Begrenzte ETA-Korrekturstaerke fuer die Aussentemperatur.", showEta: "ETA anzeigen", showEtaDescription: "Deterministische Aufheizschaetzung anzeigen, wenn genug Recorder-Daten vorhanden sind.", showHeatingRate: "Heizrate und Leistung anzeigen", showHeatingRateDescription: "Gemessene aktuelle Heizrate und effektive Heizleistung anzeigen.", showReadyTime: "Bereit-Uhrzeit anzeigen", showReadyTimeDescription: "Erwartete Uhrzeit anzeigen, wenn eine ETA verfuegbar ist.", rgbEnabled: "RGB-Licht aktivieren", rgbEnabledDescription: "Das konfigurierte Licht nur fuer visuelle Sauna-Statussignale nutzen.", rgbLightEntity: "RGB-Licht-Entitaet", rgbLightEntityDescription: "Home-Assistant-Light-Entitaet mit Farbunterstuetzung.", rgbMode: "RGB-Modus", rgbModeDescription: "Temperaturverlauf oder nur Bereit-Signal auswaehlen.", rgbBrightness: "RGB-Helligkeit", rgbBrightnessDescription: "Helligkeit in Prozent fuer Temperaturverlauf-Updates.", rgbUpdateIntervalSeconds: "RGB-Aktualisierungsintervall", rgbUpdateIntervalSecondsDescription: "Mindestabstand in Sekunden zwischen wiederholten RGB-Updates.", rgbRestorePreviousState: "Vorherigen Lichtzustand wiederherstellen", rgbRestorePreviousStateDescription: "Vorher erfassten Lichtzustand wiederherstellen, wenn Sauna Suite die Kontrolle beendet.", rgbOnlyWhenSaunaOn: "Nur wenn Sauna eingeschaltet ist", rgbOnlyWhenSaunaOnDescription: "RGB-Signale stoppen, wenn der konfigurierte Hauptschalter aus ist.", readySignalEnabled: "Bereit-Signal aktivieren", readySignalEnabledDescription: "Signalisieren, wenn die Sauna erstmals die Zieltemperatur erreicht.", readySignalMode: "Bereit-Signal-Modus", readySignalModeDescription: "Bereit-Farbe halten, blinken oder pulsieren.", readySignalColor: "Farbe", readySignalColorDescription: "Benannte Farbe fuer das Bereit-Signal.", readySignalBrightness: "Helligkeit", readySignalBrightnessDescription: "Helligkeit in Prozent fuer das Bereit-Signal.", readySignalIntervalSeconds: "Bereit-Signal-Intervall", readySignalIntervalSecondsDescription: "Sekunden zwischen Blink- oder Puls-Schritten. Minimum ist eine Sekunde.", readySignalDurationSeconds: "Bereit-Signal-Dauer", readySignalDurationSecondsDescription: "Dauer eines Bereit-Signals, bevor es stoppt.", readySignalRequiresAcknowledgement: "Quittierung erforderlich", readySignalRequiresAcknowledgementDescription: "Quittieren-Button anzeigen, solange das Bereit-Signal aktiv ist.", readySignalRepeat: "Bereit-Signal wiederholen", readySignalRepeatDescription: "Signal wiederholen, solange die Sauna bereit und nicht quittiert ist.", readySignalRepeatIntervalSeconds: "Wiederholungsintervall", readySignalRepeatIntervalSecondsDescription: "Sekunden bis zur Wiederholung eines nicht quittierten Bereit-Signals." }, Fi = { average: "Durchschnitt", bottom: "Unten", maximum: "Maximum", middle: "Mitte", minimum: "Minimum", top: "Oben", weighted_average: "Gewichteter Durchschnitt" }, zi = { above_target: "Ueber Ziel", far_below: "Weit unter Ziel", heating: "Heizt", near_target: "Nahe am Ziel", target_reached: "Ziel erreicht", unavailable: "Temperatur nicht verfuegbar" }, Ui = { readyIn: "Bereit in", hour: "h", hours: "h", minute: "min", minutes: "min" }, Bi = { fixed: "Feste Ofenleistung", general_power_sensor: "Allgemeiner Leistungssensor" }, Ii = { off: "Aus", temperature_gradient: "Temperaturverlauf", ready_only: "Nur Bereit-Signal" }, Gi = { hold: "Halten", blink: "Blinken", pulse: "Pulsieren" }, Vi = { green: "Gruen", gold: "Gold", red: "Rot", blue: "Blau", purple: "Violett", white: "Weiss" }, Ki = { off: "Aus", temperature_gradient: "Temperaturverlauf", ready_signal_active: "Bereit-Signal aktiv", acknowledged: "Quittiert", light_unavailable: "Licht nicht verfuegbar" }, Wi = { off: "Aus", heating: "Heizt", slowly_heating: "Heizt langsam", near_target: "Nahe am Ziel", ready: "Bereit", above_target: "Ueber Ziel", cooling: "Kuehlt ab", data_unavailable: "Daten nicht verfuegbar" }, Zi = {
  card: Oi,
  editor: Li,
  modes: Fi,
  status: zi,
  eta: Ui,
  heatingPowerModes: Bi,
  rgbModes: Ii,
  readySignalModes: Gi,
  readySignalColors: Vi,
  rgbStatus: Ki,
  heatingStatus: Wi
}, ji = { bottomTemperature: "Bottom", confirmSwitchOn: "Switch the sauna entity on manually?", controlTemperature: "Control temperature", decreaseTarget: "Decrease target temperature", earlyDevelopment: "Early Development", increaseTarget: "Increase target temperature", middleTemperature: "Middle", name: "Sauna Suite", notAvailable: "Not available", outsideTemperature: "Outside", pending: "Updating...", placeholder: "Manual controls and monitoring only. No automatic heater regulation is implemented.", powerOff: "Off", powerOn: "On", powerUnavailable: "Unavailable", sliderUnavailable: "Slider unavailable because min, max or step is missing.", stratification: "Stratification", targetDifference: "Difference to target", targetTemperature: "Target", temperatureTrend: "Temperature trend", temperatureZones: "Temperature zones", togglePower: "Toggle sauna power entity", topTemperature: "Top", trendDirectModesOnly: "Trend is currently available only for direct sensor modes.", trendLoading: "Loading trend data", trendUnavailable: "No trend data available", effectivePower: "Heating power", estimatedPower: "Estimated heating power", etaUnavailable: "ETA unavailable", heatingRate: "Heating rate", ready: "Ready", readyAt: "Ready at", rgbStatus: "RGB status", rgbLight: "RGB light", rgbUnsupportedLight: "Configured light does not support color.", rgbLightUnavailable: "RGB light unavailable.", acknowledgeReadySignal: "Acknowledge" }, qi = { cardName: "Card name", cardNameDescription: "Title shown in the card header.", confirmSwitchOn: "Confirm before switching on", confirmSwitchOnDescription: "Require a confirmation dialog before the manual power button turns on the configured entity.", controlTemperatureMode: "Control temperature mode", controlTemperatureModeDescription: "Select which temperature is displayed as the main control temperature.", mainSwitchEntity: "Main switch entity", mainSwitchEntityDescription: "Manual power button entity. Supported domains: switch and input_boolean.", nearTargetThreshold: "Near-target threshold", nearTargetThresholdDescription: "Degrees below target that should be treated as near target.", outsideTemperatureEntity: "Outside temperature entity", outsideTemperatureEntityDescription: "Optional outside temperature sensor.", sections: { display: "Display", entities: "Entities", general: "General", safety: "Safety and confirmation", temperatureCalculation: "Temperature calculation", trend: "Trend", heatingEta: "Heating ETA", rgbReadySignal: "RGB & Ready Signal" }, showOutsideTemperature: "Show outside temperature", showOutsideTemperatureDescription: "Display the outside temperature when an entity is configured.", showTemperatureTrend: "Show temperature trend", showTemperatureTrendDescription: "Load recent Recorder history for top, middle or bottom direct sensor modes.", showTemperatureZones: "Show temperature zones", showTemperatureZonesDescription: "Display top, middle and bottom sensor values.", targetReachedTolerance: "Target-reached tolerance", targetReachedToleranceDescription: "Degrees around target that are considered target reached.", targetTemperatureEntity: "Target temperature entity", targetTemperatureEntityDescription: "Manual target setting entity. Supported domains: number and input_number.", temperatureBottomEntity: "Bottom temperature entity", temperatureBottomEntityDescription: "Bottom sauna temperature sensor.", temperatureMiddleEntity: "Middle temperature entity", temperatureMiddleEntityDescription: "Middle sauna temperature sensor.", temperatureTopEntity: "Top temperature entity", temperatureTopEntityDescription: "Top sauna temperature sensor.", trendHistoryMinutes: "Trend history minutes", trendHistoryMinutesDescription: "History window loaded from Recorder. Allowed range: 15 to 1440 minutes.", trendRefreshMinutes: "Trend refresh minutes", trendRefreshMinutesDescription: "How often the trend is refreshed. Allowed range: 1 to 60 minutes.", weightBottom: "Bottom weight", weightBottomDescription: "Weight for bottom sensor when weighted average is selected.", weightMiddle: "Middle weight", weightMiddleDescription: "Weight for middle sensor when weighted average is selected.", weightTop: "Top weight", weightTopDescription: "Weight for top sensor when weighted average is selected.", etaHistoryMinutes: "ETA history minutes", etaHistoryMinutesDescription: "Recorder history window used for ETA and heating-rate calculation.", etaMinimumSamples: "ETA minimum samples", etaMinimumSamplesDescription: "Minimum valid Recorder samples required before ETA is calculated.", fixedHeaterPowerKw: "Fixed heater power (kW)", fixedHeaterPowerKwDescription: "Rated heater power used for ETA when no power sensor is configured.", generalPowerSensorEntity: "General power sensor", generalPowerSensorEntityDescription: "Approximate total power sensor. W and kW units are supported.", heaterRatedPowerKw: "Heater rated power (kW)", heaterRatedPowerKwDescription: "Maximum sauna share used to cap the general power sensor estimate.", heatingPowerMode: "Heating power mode", heatingPowerModeDescription: "Choose fixed heater power or an approximate general power sensor estimate.", outsideTemperatureWeight: "Outside-temperature weight", outsideTemperatureWeightDescription: "Bounded ETA correction strength for outside temperature context.", showEta: "Show ETA", showEtaDescription: "Display the deterministic heat-up estimate when enough Recorder data exists.", showHeatingRate: "Show heating rate and power", showHeatingRateDescription: "Display recent measured heating rate and effective heater power.", showReadyTime: "Show ready time", showReadyTimeDescription: "Display the expected clock time when ETA is available.", rgbEnabled: "Enable RGB light", rgbEnabledDescription: "Use the configured light only for visual sauna status signaling.", rgbLightEntity: "RGB light entity", rgbLightEntityDescription: "Home Assistant light entity with color support.", rgbMode: "RGB mode", rgbModeDescription: "Choose continuous temperature gradient or ready-only signaling.", rgbBrightness: "RGB brightness", rgbBrightnessDescription: "Brightness percentage for temperature-gradient updates.", rgbUpdateIntervalSeconds: "RGB update interval", rgbUpdateIntervalSecondsDescription: "Minimum seconds between repeated RGB updates.", rgbRestorePreviousState: "Restore previous light state", rgbRestorePreviousStateDescription: "Restore the light state captured before Sauna Suite takes control.", rgbOnlyWhenSaunaOn: "Only while sauna is on", rgbOnlyWhenSaunaOnDescription: "Stop RGB signaling when the configured main switch is off.", readySignalEnabled: "Enable ready signal", readySignalEnabledDescription: "Signal when the sauna first reaches the target temperature.", readySignalMode: "Ready signal mode", readySignalModeDescription: "Hold, blink or pulse the configured ready color.", readySignalColor: "Ready signal color", readySignalColorDescription: "Named color used for the ready signal.", readySignalBrightness: "Ready signal brightness", readySignalBrightnessDescription: "Brightness percentage used by the ready signal.", readySignalIntervalSeconds: "Ready signal interval", readySignalIntervalSecondsDescription: "Seconds between blink or pulse steps. Minimum is one second.", readySignalDurationSeconds: "Ready signal duration", readySignalDurationSecondsDescription: "How long one ready signal runs before stopping.", readySignalRequiresAcknowledgement: "Require acknowledgement", readySignalRequiresAcknowledgementDescription: "Show an acknowledgement button while the ready signal is active.", readySignalRepeat: "Repeat ready signal", readySignalRepeatDescription: "Repeat the signal while the sauna remains ready and unacknowledged.", readySignalRepeatIntervalSeconds: "Repeat interval", readySignalRepeatIntervalSecondsDescription: "Seconds to wait before repeating an unacknowledged ready signal." }, Yi = { average: "Average", bottom: "Bottom", maximum: "Maximum", middle: "Middle", minimum: "Minimum", top: "Top", weighted_average: "Weighted average" }, Qi = { above_target: "Above target", far_below: "Far below target", heating: "Heating", near_target: "Near target", target_reached: "Target reached", unavailable: "Temperature unavailable" }, Ji = { readyIn: "Ready in", hour: "h", hours: "h", minute: "min", minutes: "min" }, Xi = { fixed: "Fixed heater power", general_power_sensor: "General power sensor" }, en = { off: "Off", temperature_gradient: "Temperature gradient", ready_only: "Ready only" }, tn = { hold: "Hold", blink: "Blink", pulse: "Pulse" }, rn = { green: "Green", gold: "Gold", red: "Red", blue: "Blue", purple: "Purple", white: "White" }, nn = { off: "Off", temperature_gradient: "Temperature gradient", ready_signal_active: "Ready signal active", acknowledged: "Acknowledged", light_unavailable: "Light unavailable" }, an = { off: "Off", heating: "Heating", slowly_heating: "Slowly heating", near_target: "Near target", ready: "Ready", above_target: "Above target", cooling: "Cooling", data_unavailable: "Data unavailable" }, sn = {
  card: ji,
  editor: qi,
  modes: Yi,
  status: Qi,
  eta: Ji,
  heatingPowerModes: Xi,
  rgbModes: en,
  readySignalModes: tn,
  readySignalColors: rn,
  rgbStatus: nn,
  heatingStatus: an
}, nt = {
  de: Zi,
  en: sn
};
function Ft(t, e) {
  const r = t != null && t.toLowerCase().startsWith("de") ? "de" : "en";
  return at(nt[r], e) ?? at(nt.en, e) ?? e;
}
function at(t, e) {
  const r = e.split(".").reduce((i, n) => {
    if (!(typeof i != "object" || i === void 0))
      return i[n];
  }, t);
  return typeof r == "string" ? r : void 0;
}
var on = Object.defineProperty, T = (t, e, r, i) => {
  for (var n = void 0, a = t.length - 1, s; a >= 0; a--)
    (s = t[a]) && (n = s(e, r, n) || n);
  return n && on(e, r, n), n;
};
const Te = "°C", ne = "—", ln = 0.05, Ce = class Ce extends k {
  constructor() {
    super(...arguments), this.config = L({}), this.switchPending = !1, this.targetPending = !1, this.historySamples = [], this.historyLoading = !1, this.rgbStatus = "off", this.readySignalActive = !1, this.readySignalPhase = !0, this.readySignalDetectorState = $e(), this.rgbLightController = new $i(), this.handleReadyAcknowledgement = () => {
      this.readySignalDetectorState = Or(this.readySignalDetectorState), this.setRgbRuntimeState("acknowledged", void 0), this.stopReadySignal(!1), this.releaseRgbControl();
    };
  }
  setConfig(e) {
    this.releaseRgbControl(), this.clearReadySignalTimers(), this.readySignalDetectorState = $e(), this.readySignalActive = !1, this.config = L(e), this.resetHistorySchedule();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.clearHistoryTimer(), this.clearTargetDebounceTimer(), this.clearReadySignalTimers(), this.releaseRgbControl();
  }
  getCardSize() {
    return 7;
  }
  static getConfigElement() {
    return document.createElement(wt);
  }
  static getStubConfig() {
    return L({});
  }
  updated(e) {
    (e.has("hass") || e.has("config")) && (this.scheduleHistoryRefresh(), this.synchronizeRgbLighting());
  }
  render() {
    const e = we(this.hass, this.config), r = bt(
      e.summary.controlTemperature,
      e.targetTemperature,
      {
        nearTargetThreshold: this.config.near_target_threshold,
        targetReachedTolerance: this.config.target_reached_tolerance
      }
    ), i = pr(
      this.historySamples,
      this.config.eta_minimum_samples
    ), n = vi(this.hass, this.config), a = Sr({
      currentTemperature: e.summary.controlTemperature,
      targetTemperature: e.targetTemperature,
      heatingRateCPerMinute: i.rateCPerMinute,
      outsideTemperature: e.outsideTemperature,
      outsideTemperatureWeight: this.config.outside_temperature_weight,
      effectivePowerKw: n.effectivePowerKw,
      nominalPowerKw: n.nominalPowerKw,
      hasInsufficientHistory: this.hasEtaHistoryConsumer() && i.rateCPerMinute === void 0
    }), s = yt(r.status), l = Ye(
      e.summary.controlTemperature,
      e.targetTemperature,
      {
        nearTargetThreshold: this.config.near_target_threshold,
        targetReachedTolerance: this.config.target_reached_tolerance
      }
    ), o = y(this.hass, this.config.main_switch_entity), d = y(this.hass, this.config.target_temperature_entity), u = this.getHeatingDashboardStatus(
      r.status,
      o,
      i,
      a
    );
    return h`
      <ha-card>
        <div
          class="content"
          style=${`--sauna-status-line: ${s.line}; --sauna-status-fill: ${s.fill};`}
        >
          <header class="header">
            <div class="brand-mark" aria-hidden="true">${this.renderHeatIcon()}</div>
            <div class="header-copy">
              <div class="title">${this.config.name}</div>
              <div class="state">${this.t(`heatingStatus.${u}`)}</div>
            </div>
            ${this.renderPowerButton(o)}
          </header>

          ${this.renderHero(
      e.summary.controlTemperature,
      e.targetTemperature,
      u,
      r.progress,
      r.difference,
      i,
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
      r.status,
      e.summary.controlTemperature,
      e.targetTemperature,
      i
    )}
          ${this.renderRgbStatus(l.rgb)} ${this.renderTargetControl(d)}
        </div>
      </ha-card>
    `;
  }
  renderRgbStatus(e) {
    if (!this.config.rgb_light_entity)
      return;
    const r = `--sauna-rgb-color: rgb(${e.red}, ${e.green}, ${e.blue});`;
    return h`
      <section class="rgb-status" aria-label=${this.t("card.rgbStatus")}>
        <div class="rgb-copy">
          <span class="rgb-indicator" style=${r} aria-hidden="true"></span>
          <div>
            <div class="label">${this.t("card.rgbLight")}</div>
            <div class="status-line">${this.getLightLabel()}</div>
            ${this.rgbWarning ? h`<div class="error">${this.rgbWarning}</div>` : void 0}
          </div>
        </div>
        <div class="rgb-actions">
          <span class="status-chip">${this.t(`rgbStatus.${this.rgbStatus}`)}</span>
          ${this.readySignalActive && this.config.ready_signal_requires_acknowledgement ? h`
                  <button
                    class="ack-button"
                    type="button"
                    @click=${this.handleReadyAcknowledgement}
                  >
                    ${this.t("card.acknowledgeReadySignal")}
                  </button>
                ` : void 0}
        </div>
      </section>
    `;
  }
  renderHero(e, r, i, n, a, s, l, o) {
    const d = this.getTemperatureParts(
      e,
      this.getControlTemperatureUnit()
    ), u = this.getTemperatureParts(
      r,
      this.getTemperatureUnit(this.config.target_temperature_entity)
    ), c = Math.round(Math.min(Math.max(n, 0), 1) * 360), _ = this.getEtaLabel(o), f = this.getReadyTimeLabel(o);
    return h`
      <section class="hero" aria-label=${this.t("card.controlTemperature")}>
        <div class="hero-main">
          <div
            class="hero-gauge"
            style=${`--sauna-progress-degrees: ${c}deg;`}
            aria-hidden="true"
          >
            <div class="hero-gauge-center">
              <div class=${`hero-value ${d.unavailable ? "unavailable" : ""}`}>
                <span class="hero-number">${d.value}</span>
                <span class="hero-unit">${d.unit}</span>
              </div>
              <div class="hero-target">
                ${this.t("card.targetTemperature")} ${u.value}${u.unit}
              </div>
            </div>
          </div>
          <div class="hero-summary">
            <div class="label">${this.t("card.controlTemperature")}</div>
            <div class="hero-status">${this.t(`heatingStatus.${i}`)}</div>
            ${_ ? h`<div class="eta-primary">${_}</div>` : h`<div class="eta-primary subdued">${this.t("card.etaUnavailable")}</div>`}
            ${f ? h`<div class="ready-time">${f}</div>` : void 0}
          </div>
        </div>

        <div class="hero-meta">
          <span class="status-chip">
            <span class="status-dot" aria-hidden="true"></span>
            ${this.t(`heatingStatus.${i}`)}
          </span>
          ${a !== void 0 ? h`<span class="difference">
                  ${this.t("card.targetDifference")}: ${this.formatTemperatureDelta(a)}
                </span>` : void 0}
        </div>

        <div class="hero-metrics">
          ${this.config.show_heating_rate ? h`
                  ${this.renderMetric(
      "card.heatingRate",
      this.formatHeatingRate(s.rateCPerMinute)
    )}
                  ${this.renderMetric(
      l.approximate ? "card.estimatedPower" : "card.effectivePower",
      this.formatPower(l.effectivePowerKw)
    )}
                ` : void 0}
        </div>
        ${this.serviceError ? h`<div class="error" role="alert">${this.serviceError}</div>` : void 0}
      </section>
    `;
  }
  renderMetric(e, r) {
    return h`
      <div class="metric">
        <span>${this.t(e)}</span>
        <strong>${r}</strong>
      </div>
    `;
  }
  renderTemperatureZones(e, r, i, n, a) {
    const s = this.config.show_temperature_zones, l = this.config.show_outside_temperature && this.config.outside_temperature_entity !== void 0;
    if (!(!s && !l && a === void 0))
      return h`
      <section class="zones" aria-label=${this.t("card.temperatureZones")}>
        ${s ? h`
                <div class="zone-grid">
                  ${this.renderTemperatureTile(
        "card.topTemperature",
        e,
        this.config.temperature_top_entity
      )}
                  ${this.renderTemperatureTile(
        "card.middleTemperature",
        r,
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
          ${l ? this.renderTemperatureTile(
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
  renderTemperatureTile(e, r, i, n = "zone") {
    const a = this.getTemperatureParts(r, this.getTemperatureUnit(i), !0);
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
  renderTrend(e, r, i, n) {
    if (!this.config.show_temperature_trend)
      return;
    const a = rt(this.config.control_temperature_mode);
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
                  .targetValue=${i}
                  .currentValue=${r}
                  .heatingRateLabel=${this.formatHeatingRate(n.rateCPerMinute)}
                  .direction=${this.getTrendDirection(n.rateCPerMinute)}
                  empty-label=${this.historyLoading ? this.t("card.trendLoading") : this.t("card.trendUnavailable")}
                ></fceeb-sauna-suite-temperature-trend>
              ` : h`<div class="trend-empty">${this.t("card.trendDirectModesOnly")}</div>`}
      </section>
    `;
  }
  renderPowerButton(e) {
    const r = this.switchPending || !Ct(this.config.main_switch_entity) || ie(e), i = (e == null ? void 0 : e.state) === "on", n = this.switchPending ? this.t("card.pending") : i ? this.t("card.powerOn") : this.t("card.powerOff");
    return h`
      <button
        class=${`power-button ${i ? "on" : "off"}`}
        type="button"
        ?disabled=${r}
        aria-label=${this.t("card.togglePower")}
        @click=${this.handlePowerClick}
      >
        <span class="power-icon" aria-hidden="true">${this.renderPowerIcon()}</span>
        <span>${n}</span>
      </button>
    `;
  }
  renderTargetControl(e) {
    const r = Xe(e), i = this.getEntityNumber(e), n = this.getTemperatureParts(
      i,
      this.getTemperatureUnit(this.config.target_temperature_entity)
    ), a = this.targetPending || !Pt(this.config.target_temperature_entity) || ie(e) || i === void 0;
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
        ${r && i !== void 0 ? h`
                <input
                  type="range"
                  min=${r.minimum}
                  max=${r.maximum}
                  step=${r.step}
                  .value=${String(i)}
                  ?disabled=${a}
                  aria-label=${this.t("card.targetTemperature")}
                  @input=${(s) => this.handleTargetSliderInput(s, r)}
                />
              ` : h`<div class="status-line">${this.t("card.sliderUnavailable")}</div>`}
        ${this.targetPending ? h`<div class="status-line">${this.t("card.pending")}</div>` : void 0}
      </section>
    `;
  }
  renderHeatIcon() {
    return M`
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M8 20c-1.5-1.1-2.3-2.5-2.3-4.2 0-1.8.9-3.2 2.6-4.4 1.3-.9 2-2.1 2-3.4 0-1-.3-2-.9-3 2.3.9 3.8 2.7 3.8 5.1 0 1-.2 1.8-.6 2.6.9-.5 1.6-1.2 2.1-2.2 2.1 1.4 3.2 3.2 3.2 5.3 0 1.7-.8 3.1-2.3 4.2" />
        <path d="M9.5 20c-.6-.7-.9-1.5-.9-2.4 0-1.2.6-2.2 1.7-3 .9-.6 1.4-1.4 1.4-2.4 1.5 1 2.2 2.2 2.2 3.7 0 .6-.1 1.1-.4 1.6.5-.2.9-.6 1.3-1.1.7.7 1.1 1.5 1.1 2.4 0 .4-.1.8-.3 1.2" />
      </svg>
    `;
  }
  renderPowerIcon() {
    return M`
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M12 3v8" />
        <path d="M7.1 6.8a7 7 0 1 0 9.8 0" />
      </svg>
    `;
  }
  async handlePowerClick() {
    const e = y(this.hass, this.config.main_switch_entity);
    if (this.switchPending || ie(e))
      return;
    const r = (e == null ? void 0 : e.state) !== "on";
    if (r && this.config.confirm_switch_on && !window.confirm(this.t("card.confirmSwitchOn")))
      return;
    this.switchPending = !0, this.serviceError = void 0;
    const i = await ii(this.hass, this.config.main_switch_entity, r);
    this.switchPending = !1, this.serviceError = i.ok ? void 0 : i.error;
  }
  adjustTargetTemperature(e) {
    const r = y(this.hass, this.config.target_temperature_entity), i = Xe(r), n = this.getEntityNumber(r);
    !i || n === void 0 || this.targetPending || this.updateTargetTemperature(n + i.step * e, i);
  }
  handleTargetSliderInput(e, r) {
    const i = e.target, n = Number(i.value);
    Number.isFinite(n) && (this.clearTargetDebounceTimer(), this.targetDebounceTimer = window.setTimeout(() => {
      this.updateTargetTemperature(n, r);
    }, 400));
  }
  async updateTargetTemperature(e, r) {
    if (this.targetPending)
      return;
    this.targetPending = !0, this.serviceError = void 0;
    const i = await ni(
      this.hass,
      this.config.target_temperature_entity,
      e,
      r
    );
    this.targetPending = !1, this.serviceError = i.ok ? void 0 : i.error;
  }
  async synchronizeRgbLighting(e = !1) {
    if (!this.hass || !this.config.rgb_light_entity)
      return;
    const r = y(this.hass, this.config.rgb_light_entity), i = y(this.hass, this.config.main_switch_entity), n = (i == null ? void 0 : i.state) === "on", a = we(this.hass, this.config), s = Ye(
      a.summary.controlTemperature,
      a.targetTemperature,
      {
        nearTargetThreshold: this.config.near_target_threshold,
        targetReachedTolerance: this.config.target_reached_tolerance
      }
    );
    if (this.updateReadyDetector(
      n,
      a.summary.controlTemperature,
      a.targetTemperature
    ), !this.config.rgb_enabled || this.config.rgb_mode === "off" || this.config.rgb_only_when_sauna_on && !n) {
      this.stopReadySignal(!1);
      const u = await this.releaseRgbControl();
      this.setRgbRuntimeState("off", u.error);
      return;
    }
    const l = this.getRgbCommand(s.rgb);
    if (!l) {
      const u = await this.rgbLightController.sync({
        hass: this.hass,
        config: this.config,
        light: r,
        saunaOn: n,
        command: l,
        force: e
      });
      this.setRgbRuntimeState(this.getRgbStatusForCommand(), u.error);
      return;
    }
    if (!Nt(r).supported) {
      this.setRgbRuntimeState("light_unavailable", this.t("card.rgbUnsupportedLight"));
      return;
    }
    const d = await this.rgbLightController.sync({
      hass: this.hass,
      config: this.config,
      light: r,
      saunaOn: n,
      command: l,
      force: e
    });
    if (!d.ok) {
      this.setRgbRuntimeState(
        "light_unavailable",
        d.error ?? this.t("card.rgbLightUnavailable")
      );
      return;
    }
    this.setRgbRuntimeState(this.getRgbStatusForCommand(), void 0);
  }
  updateReadyDetector(e, r, i) {
    const n = Lr(this.readySignalDetectorState, {
      saunaOn: e,
      controlTemperature: r,
      targetTemperature: i,
      thresholds: {
        nearTargetThreshold: this.config.near_target_threshold,
        targetReachedTolerance: this.config.target_reached_tolerance
      }
    });
    this.readySignalDetectorState = n.state, n.triggered && this.config.ready_signal_enabled && this.config.rgb_enabled && this.config.rgb_mode !== "off" && this.startReadySignal();
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
      color: kr(this.config.ready_signal_color),
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
    const e = we(this.hass, this.config), r = y(this.hass, this.config.main_switch_entity);
    return this.config.ready_signal_repeat && this.config.ready_signal_enabled && !this.readySignalDetectorState.acknowledged && St({
      saunaOn: (r == null ? void 0 : r.state) === "on",
      controlTemperature: e.summary.controlTemperature,
      targetTemperature: e.targetTemperature,
      thresholds: {
        nearTargetThreshold: this.config.near_target_threshold,
        targetReachedTolerance: this.config.target_reached_tolerance
      }
    });
  }
  async releaseRgbControl() {
    const e = await this.rgbLightController.release(this.hass, this.config);
    return { error: e.ok ? void 0 : e.error };
  }
  setRgbRuntimeState(e, r) {
    this.rgbStatus !== e && (this.rgbStatus = e), this.rgbWarning !== r && (this.rgbWarning = r);
  }
  scheduleHistoryRefresh() {
    if (!this.hasHistoryConsumer() || !this.hass || !rt(this.config.control_temperature_mode)) {
      this.clearHistorySamples(), this.lastHistoryFetchKey = void 0, this.clearHistoryTimer();
      return;
    }
    const e = it(this.config), r = this.getHistoryMinutes(), i = `${e ?? ""}:${r}:${this.config.trend_refresh_minutes}`;
    if (!e) {
      this.clearHistorySamples(), this.lastHistoryFetchKey = void 0, this.clearHistoryTimer();
      return;
    }
    this.lastHistoryFetchKey === i && this.historyRefreshTimer !== void 0 || (this.lastHistoryFetchKey !== void 0 && this.lastHistoryFetchKey !== i && this.clearHistoryTimer(), this.historyRefreshTimer === void 0 && (this.historyRefreshTimer = window.setInterval(() => {
      this.loadHistory(e, r);
    }, this.config.trend_refresh_minutes * 6e4)), this.lastHistoryFetchKey !== i && (this.lastHistoryFetchKey = i, this.loadHistory(e, r)));
  }
  async loadHistory(e, r) {
    this.historyLoading = !0, this.historySamples = await Ci(this.hass, e, r), this.historyLoading = !1;
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
    const e = this.hasEtaHistoryConsumer() ? this.config.eta_history_minutes : 0, r = this.config.show_temperature_trend ? this.config.trend_history_minutes : 0;
    return Math.max(e, r);
  }
  getHeatingDashboardStatus(e, r, i, n) {
    return (r == null ? void 0 : r.state) === "off" || n.unavailableReason === "heater_off" ? "off" : e === "target_reached" || n.unavailableReason === "target_reached" ? "ready" : e === "above_target" ? "above_target" : e === "near_target" ? "near_target" : We(i.rateCPerMinute) ? "cooling" : i.rateCPerMinute === void 0 || n.unavailableReason === "missing_temperature" ? "data_unavailable" : i.rateCPerMinute > 0 && i.rateCPerMinute < ln ? "slowly_heating" : i.rateCPerMinute > 0 ? "heating" : "data_unavailable";
  }
  getTrendDirection(e) {
    return We(e) ? "cooling" : e !== void 0 && e > 0 ? "heating" : "idle";
  }
  getEtaLabel(e) {
    if (this.config.show_eta)
      return e.unavailableReason === "target_reached" ? this.t("card.ready") : Rr(e.etaMinutes, {
        readyIn: this.t("eta.readyIn"),
        hour: this.t("eta.hour"),
        hours: this.t("eta.hours"),
        minute: this.t("eta.minute"),
        minutes: this.t("eta.minutes")
      });
  }
  getReadyTimeLabel(e) {
    var i, n;
    if (!this.config.show_ready_time)
      return;
    const r = Ar(
      e.etaMinutes,
      /* @__PURE__ */ new Date(),
      ((i = this.hass) == null ? void 0 : i.selectedLanguage) ?? ((n = this.hass) == null ? void 0 : n.language)
    );
    return r ? `${this.t("card.readyAt")} ${r}` : void 0;
  }
  getControlTemperatureUnit() {
    return this.getTemperatureUnit(it(this.config));
  }
  getEntityNumber(e) {
    if (!e || ie(e))
      return;
    const r = Number(e.state);
    return Number.isFinite(r) ? r : void 0;
  }
  getTemperatureUnit(e) {
    var i;
    const r = (i = y(this.hass, e)) == null ? void 0 : i.attributes.unit_of_measurement;
    return typeof r == "string" && r.trim().length > 0 ? r : Te;
  }
  getTemperatureParts(e, r, i = !1) {
    return {
      value: e === void 0 ? ne : e.toFixed(1),
      unit: e === void 0 ? "" : r,
      unavailable: e === void 0
    };
  }
  formatTemperatureDelta(e) {
    return `${e > 0 ? "+" : ""}${e.toFixed(1)} ${Te}`;
  }
  formatHeatingRate(e) {
    return e === void 0 || !Number.isFinite(e) ? ne : `${e > 0 ? "+" : ""}${e.toFixed(2)} ${Te}/min`;
  }
  formatPower(e) {
    return e === void 0 || !Number.isFinite(e) ? ne : `${e.toFixed(1)} kW`;
  }
  getLightLabel() {
    const e = y(this.hass, this.config.rgb_light_entity), r = e == null ? void 0 : e.attributes.friendly_name;
    return typeof r == "string" && r.length > 0 ? r : this.config.rgb_light_entity ?? this.t("card.notAvailable");
  }
  t(e) {
    var r, i;
    return Ft(((r = this.hass) == null ? void 0 : r.selectedLanguage) ?? ((i = this.hass) == null ? void 0 : i.language), e);
  }
};
Ce.styles = Ni;
let m = Ce;
T([
  v({ attribute: !1 })
], m.prototype, "hass");
T([
  w()
], m.prototype, "config");
T([
  w()
], m.prototype, "switchPending");
T([
  w()
], m.prototype, "targetPending");
T([
  w()
], m.prototype, "serviceError");
T([
  w()
], m.prototype, "historySamples");
T([
  w()
], m.prototype, "historyLoading");
T([
  w()
], m.prototype, "rgbStatus");
T([
  w()
], m.prototype, "rgbWarning");
T([
  w()
], m.prototype, "readySignalActive");
De(customElements, dr, m);
const dn = dt`
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
var un = Object.defineProperty, zt = (t, e, r, i) => {
  for (var n = void 0, a = t.length - 1, s; a >= 0; a--)
    (s = t[a]) && (n = s(e, r, n) || n);
  return n && un(e, r, n), n;
};
const Pe = class Pe extends k {
  constructor() {
    super(...arguments), this.config = L({}), this.computeLabel = (e) => e.label, this.computeHelper = (e) => e.description;
  }
  setConfig(e) {
    this.config = L(e);
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
    const e = [
      {
        name: "control_temperature_mode",
        label: this.t("editor.controlTemperatureMode"),
        description: this.t("editor.controlTemperatureModeDescription"),
        selector: {
          select: {
            mode: "dropdown",
            options: $t.map((a) => ({
              value: a,
              label: this.t(`modes.${a}`)
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
    const r = [
      {
        name: "heating_power_mode",
        label: this.t("editor.heatingPowerMode"),
        description: this.t("editor.heatingPowerModeDescription"),
        selector: {
          select: {
            mode: "dropdown",
            options: Et.map((a) => ({
              value: a,
              label: this.t(`heatingPowerModes.${a}`)
            }))
          }
        }
      }
    ];
    this.config.heating_power_mode === "fixed" && r.push(
      this.numberField(
        "fixed_heater_power_kw",
        "editor.fixedHeaterPowerKw",
        "editor.fixedHeaterPowerKwDescription",
        0,
        50,
        0.1
      )
    ), this.config.heating_power_mode === "general_power_sensor" && r.push(
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
    ), r.push(
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
    const i = [
      this.booleanField(
        "show_temperature_trend",
        "editor.showTemperatureTrend",
        "editor.showTemperatureTrendDescription"
      )
    ];
    this.config.show_temperature_trend && i.push(
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
    return this.config.rgb_enabled && (n.push(
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
            options: Rt.map((a) => ({
              value: a,
              label: this.t(`rgbModes.${a}`)
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
            options: At.map((a) => ({
              value: a,
              label: this.t(`readySignalModes.${a}`)
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
            options: xt.map((a) => ({
              value: a,
              label: this.t(`readySignalColors.${a}`)
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
    ))), [
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
        schema: r
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
        schema: i
      },
      {
        titleKey: "editor.sections.rgbReadySignal",
        schema: n
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
    this.config = L({
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
  textField(e, r, i) {
    return {
      name: e,
      label: this.t(r),
      description: this.t(i),
      selector: {
        text: {}
      }
    };
  }
  temperatureSensorField(e, r, i) {
    return this.entityField(e, r, i, [
      { domain: "sensor", device_class: "temperature" }
    ]);
  }
  entityField(e, r, i, n) {
    return {
      name: e,
      label: this.t(r),
      description: this.t(i),
      selector: {
        entity: {
          filter: n
        }
      }
    };
  }
  numberField(e, r, i, n, a, s) {
    return {
      name: e,
      label: this.t(r),
      description: this.t(i),
      selector: {
        number: {
          min: n,
          max: a,
          mode: "box",
          step: s
        }
      }
    };
  }
  booleanField(e, r, i) {
    return {
      name: e,
      label: this.t(r),
      description: this.t(i),
      selector: {
        boolean: {}
      }
    };
  }
  t(e) {
    var r, i;
    return Ft(((r = this.hass) == null ? void 0 : r.selectedLanguage) ?? ((i = this.hass) == null ? void 0 : i.language), e);
  }
};
Pe.styles = dn;
let Y = Pe;
zt([
  v({ attribute: !1 })
], Y.prototype, "hass");
zt([
  w()
], Y.prototype, "config");
De(customElements, wt, Y);
const st = {
  type: lr,
  name: "Sauna Suite",
  description: "A Home Assistant dashboard card for sauna monitoring and manual controls.",
  preview: !0
};
function cn(t = window) {
  t.customCards = t.customCards ?? [], t.customCards.some((r) => r.type === st.type) || t.customCards.push(st);
}
cn();
export {
  lr as CARD_PICKER_TYPE,
  dr as CARD_TAG,
  vt as CARD_TYPE,
  wt as EDITOR_TAG,
  ur as TEMPERATURE_TREND_TAG
};
//# sourceMappingURL=sauna-suite.js.map
