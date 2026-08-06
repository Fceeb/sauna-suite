/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const te = globalThis, fe = te.ShadowRoot && (te.ShadyCSS === void 0 || te.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, _e = Symbol(), xe = /* @__PURE__ */ new WeakMap();
let je = class {
  constructor(e, t, i) {
    if (this._$cssResult$ = !0, i !== _e) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (fe && e === void 0) {
      const i = t !== void 0 && t.length === 1;
      i && (e = xe.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), i && xe.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const gt = (r) => new je(typeof r == "string" ? r : r + "", void 0, _e), qe = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((i, n, a) => i + ((s) => {
    if (s._$cssResult$ === !0) return s.cssText;
    if (typeof s == "number") return s;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + s + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + r[a + 1], r[0]);
  return new je(t, r, _e);
}, ft = (r, e) => {
  if (fe) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const i = document.createElement("style"), n = te.litNonce;
    n !== void 0 && i.setAttribute("nonce", n), i.textContent = t.cssText, r.appendChild(i);
  }
}, Ae = fe ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const i of e.cssRules) t += i.cssText;
  return gt(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: _t, defineProperty: wt, getOwnPropertyDescriptor: vt, getOwnPropertyNames: yt, getOwnPropertySymbols: bt, getPrototypeOf: Tt } = Object, y = globalThis, Se = y.trustedTypes, $t = Se ? Se.emptyScript : "", se = y.reactiveElementPolyfillSupport, V = (r, e) => r, re = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? $t : null;
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
} }, we = (r, e) => !_t(r, e), Me = { attribute: !0, type: String, converter: re, reflect: !1, useDefault: !1, hasChanged: we };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), y.litPropertyMetadata ?? (y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let O = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ?? (this.l = [])).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Me) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(e, i, t);
      n !== void 0 && wt(this.prototype, e, n);
    }
  }
  static getPropertyDescriptor(e, t, i) {
    const { get: n, set: a } = vt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(s) {
      this[t] = s;
    } };
    return { get: n, set(s) {
      const o = n == null ? void 0 : n.call(this);
      a == null || a.call(this, s), this.requestUpdate(e, o, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Me;
  }
  static _$Ei() {
    if (this.hasOwnProperty(V("elementProperties"))) return;
    const e = Tt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(V("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(V("properties"))) {
      const t = this.properties, i = [...yt(t), ...bt(t)];
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
      for (const n of i) t.unshift(Ae(n));
    } else e !== void 0 && t.push(Ae(e));
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
    return ft(e, this.constructor.elementStyles), e;
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
    var a;
    const i = this.constructor.elementProperties.get(e), n = this.constructor._$Eu(e, i);
    if (n !== void 0 && i.reflect === !0) {
      const s = (((a = i.converter) == null ? void 0 : a.toAttribute) !== void 0 ? i.converter : re).toAttribute(t, i.type);
      this._$Em = e, s == null ? this.removeAttribute(n) : this.setAttribute(n, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    var a, s;
    const i = this.constructor, n = i._$Eh.get(e);
    if (n !== void 0 && this._$Em !== n) {
      const o = i.getPropertyOptions(n), u = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((a = o.converter) == null ? void 0 : a.fromAttribute) !== void 0 ? o.converter : re;
      this._$Em = n;
      const d = u.fromAttribute(t, o.type);
      this[n] = d ?? ((s = this._$Ej) == null ? void 0 : s.get(n)) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, t, i, n = !1, a) {
    var s;
    if (e !== void 0) {
      const o = this.constructor;
      if (n === !1 && (a = this[e]), i ?? (i = o.getPropertyOptions(e)), !((i.hasChanged ?? we)(a, t) || i.useDefault && i.reflect && a === ((s = this._$Ej) == null ? void 0 : s.get(e)) && !this.hasAttribute(o._$Eu(e, i)))) return;
      this.C(e, t, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: i, reflect: n, wrapped: a }, s) {
    i && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(e) && (this._$Ej.set(e, s ?? t ?? this[e]), a !== !0 || s !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (t = void 0), this._$AL.set(e, t)), n === !0 && this._$Em !== e && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(e));
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
        for (const [a, s] of this._$Ep) this[a] = s;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [a, s] of n) {
        const { wrapped: o } = s, u = this[a];
        o !== !0 || this._$AL.has(a) || u === void 0 || this.C(a, void 0, s, u);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), (i = this._$EO) == null || i.forEach((n) => {
        var a;
        return (a = n.hostUpdate) == null ? void 0 : a.call(n);
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
O.elementStyles = [], O.shadowRootOptions = { mode: "open" }, O[V("elementProperties")] = /* @__PURE__ */ new Map(), O[V("finalized")] = /* @__PURE__ */ new Map(), se == null || se({ ReactiveElement: O }), (y.reactiveElementVersions ?? (y.reactiveElementVersions = [])).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const K = globalThis, Pe = (r) => r, ie = K.trustedTypes, De = ie ? ie.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Ye = "$lit$", v = `lit$${Math.random().toFixed(9).slice(2)}$`, Je = "?" + v, Et = `<${Je}>`, R = document, B = () => R.createComment(""), W = (r) => r === null || typeof r != "object" && typeof r != "function", ve = Array.isArray, xt = (r) => ve(r) || typeof (r == null ? void 0 : r[Symbol.iterator]) == "function", oe = `[ 	
\f\r]`, L = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Re = /-->/g, Ce = />/g, T = RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), He = /'/g, Ne = /"/g, Xe = /^(?:script|style|textarea|title)$/i, Qe = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), c = Qe(1), A = Qe(2), k = Symbol.for("lit-noChange"), m = Symbol.for("lit-nothing"), Oe = /* @__PURE__ */ new WeakMap(), M = R.createTreeWalker(R, 129);
function et(r, e) {
  if (!ve(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return De !== void 0 ? De.createHTML(e) : e;
}
const At = (r, e) => {
  const t = r.length - 1, i = [];
  let n, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", s = L;
  for (let o = 0; o < t; o++) {
    const u = r[o];
    let d, h, l = -1, p = 0;
    for (; p < u.length && (s.lastIndex = p, h = s.exec(u), h !== null); ) p = s.lastIndex, s === L ? h[1] === "!--" ? s = Re : h[1] !== void 0 ? s = Ce : h[2] !== void 0 ? (Xe.test(h[2]) && (n = RegExp("</" + h[2], "g")), s = T) : h[3] !== void 0 && (s = T) : s === T ? h[0] === ">" ? (s = n ?? L, l = -1) : h[1] === void 0 ? l = -2 : (l = s.lastIndex - h[2].length, d = h[1], s = h[3] === void 0 ? T : h[3] === '"' ? Ne : He) : s === Ne || s === He ? s = T : s === Re || s === Ce ? s = L : (s = T, n = void 0);
    const g = s === T && r[o + 1].startsWith("/>") ? " " : "";
    a += s === L ? u + Et : l >= 0 ? (i.push(d), u.slice(0, l) + Ye + u.slice(l) + v + g) : u + v + (l === -2 ? o : g);
  }
  return [et(r, a + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
class Z {
  constructor({ strings: e, _$litType$: t }, i) {
    let n;
    this.parts = [];
    let a = 0, s = 0;
    const o = e.length - 1, u = this.parts, [d, h] = At(e, t);
    if (this.el = Z.createElement(d, i), M.currentNode = this.el.content, t === 2 || t === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (n = M.nextNode()) !== null && u.length < o; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes()) for (const l of n.getAttributeNames()) if (l.endsWith(Ye)) {
          const p = h[s++], g = n.getAttribute(l).split(v), Y = /([.?@])?(.*)/.exec(p);
          u.push({ type: 1, index: a, name: Y[2], strings: g, ctor: Y[1] === "." ? Mt : Y[1] === "?" ? Pt : Y[1] === "@" ? Dt : ae }), n.removeAttribute(l);
        } else l.startsWith(v) && (u.push({ type: 6, index: a }), n.removeAttribute(l));
        if (Xe.test(n.tagName)) {
          const l = n.textContent.split(v), p = l.length - 1;
          if (p > 0) {
            n.textContent = ie ? ie.emptyScript : "";
            for (let g = 0; g < p; g++) n.append(l[g], B()), M.nextNode(), u.push({ type: 2, index: ++a });
            n.append(l[p], B());
          }
        }
      } else if (n.nodeType === 8) if (n.data === Je) u.push({ type: 2, index: a });
      else {
        let l = -1;
        for (; (l = n.data.indexOf(v, l + 1)) !== -1; ) u.push({ type: 7, index: a }), l += v.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const i = R.createElement("template");
    return i.innerHTML = e, i;
  }
}
function z(r, e, t = r, i) {
  var s, o;
  if (e === k) return e;
  let n = i !== void 0 ? (s = t._$Co) == null ? void 0 : s[i] : t._$Cl;
  const a = W(e) ? void 0 : e._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== a && ((o = n == null ? void 0 : n._$AO) == null || o.call(n, !1), a === void 0 ? n = void 0 : (n = new a(r), n._$AT(r, t, i)), i !== void 0 ? (t._$Co ?? (t._$Co = []))[i] = n : t._$Cl = n), n !== void 0 && (e = z(r, n._$AS(r, e.values), n, i)), e;
}
class St {
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
    const { el: { content: t }, parts: i } = this._$AD, n = ((e == null ? void 0 : e.creationScope) ?? R).importNode(t, !0);
    M.currentNode = n;
    let a = M.nextNode(), s = 0, o = 0, u = i[0];
    for (; u !== void 0; ) {
      if (s === u.index) {
        let d;
        u.type === 2 ? d = new q(a, a.nextSibling, this, e) : u.type === 1 ? d = new u.ctor(a, u.name, u.strings, this, e) : u.type === 6 && (d = new Rt(a, this, e)), this._$AV.push(d), u = i[++o];
      }
      s !== (u == null ? void 0 : u.index) && (a = M.nextNode(), s++);
    }
    return M.currentNode = R, n;
  }
  p(e) {
    let t = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, t), t += i.strings.length - 2) : i._$AI(e[t])), t++;
  }
}
class q {
  get _$AU() {
    var e;
    return ((e = this._$AM) == null ? void 0 : e._$AU) ?? this._$Cv;
  }
  constructor(e, t, i, n) {
    this.type = 2, this._$AH = m, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = i, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
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
    e = z(this, e, t), W(e) ? e === m || e == null || e === "" ? (this._$AH !== m && this._$AR(), this._$AH = m) : e !== this._$AH && e !== k && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : xt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== m && W(this._$AH) ? this._$AA.nextSibling.data = e : this.T(R.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    var a;
    const { values: t, _$litType$: i } = e, n = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Z.createElement(et(i.h, i.h[0]), this.options)), i);
    if (((a = this._$AH) == null ? void 0 : a._$AD) === n) this._$AH.p(t);
    else {
      const s = new St(n, this), o = s.u(this.options);
      s.p(t), this.T(o), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = Oe.get(e.strings);
    return t === void 0 && Oe.set(e.strings, t = new Z(e)), t;
  }
  k(e) {
    ve(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let i, n = 0;
    for (const a of e) n === t.length ? t.push(i = new q(this.O(B()), this.O(B()), this, this.options)) : i = t[n], i._$AI(a), n++;
    n < t.length && (this._$AR(i && i._$AB.nextSibling, n), t.length = n);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, t); e !== this._$AB; ) {
      const n = Pe(e).nextSibling;
      Pe(e).remove(), e = n;
    }
  }
  setConnected(e) {
    var t;
    this._$AM === void 0 && (this._$Cv = e, (t = this._$AP) == null || t.call(this, e));
  }
}
class ae {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, i, n, a) {
    this.type = 1, this._$AH = m, this._$AN = void 0, this.element = e, this.name = t, this._$AM = n, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = m;
  }
  _$AI(e, t = this, i, n) {
    const a = this.strings;
    let s = !1;
    if (a === void 0) e = z(this, e, t, 0), s = !W(e) || e !== this._$AH && e !== k, s && (this._$AH = e);
    else {
      const o = e;
      let u, d;
      for (e = a[0], u = 0; u < a.length - 1; u++) d = z(this, o[i + u], t, u), d === k && (d = this._$AH[u]), s || (s = !W(d) || d !== this._$AH[u]), d === m ? e = m : e !== m && (e += (d ?? "") + a[u + 1]), this._$AH[u] = d;
    }
    s && !n && this.j(e);
  }
  j(e) {
    e === m ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Mt extends ae {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === m ? void 0 : e;
  }
}
class Pt extends ae {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== m);
  }
}
class Dt extends ae {
  constructor(e, t, i, n, a) {
    super(e, t, i, n, a), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = z(this, e, t, 0) ?? m) === k) return;
    const i = this._$AH, n = e === m && i !== m || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, a = e !== m && (i === m || n);
    n && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var t;
    typeof this._$AH == "function" ? this._$AH.call(((t = this.options) == null ? void 0 : t.host) ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Rt {
  constructor(e, t, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    z(this, e);
  }
}
const ue = K.litHtmlPolyfillSupport;
ue == null || ue(Z, q), (K.litHtmlVersions ?? (K.litHtmlVersions = [])).push("3.3.3");
const Ct = (r, e, t) => {
  const i = (t == null ? void 0 : t.renderBefore) ?? e;
  let n = i._$litPart$;
  if (n === void 0) {
    const a = (t == null ? void 0 : t.renderBefore) ?? null;
    i._$litPart$ = n = new q(e.insertBefore(B(), a), a, void 0, t ?? {});
  }
  return n._$AI(r), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis;
class D extends O {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Ct(t, this.renderRoot, this.renderOptions);
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
    return k;
  }
}
var Ge;
D._$litElement$ = !0, D.finalized = !0, (Ge = P.litElementHydrateSupport) == null || Ge.call(P, { LitElement: D });
const de = P.litElementPolyfillSupport;
de == null || de({ LitElement: D });
(P.litElementVersions ?? (P.litElementVersions = [])).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ht = { attribute: !0, type: String, converter: re, reflect: !1, hasChanged: we }, Nt = (r = Ht, e, t) => {
  const { kind: i, metadata: n } = t;
  let a = globalThis.litPropertyMetadata.get(n);
  if (a === void 0 && globalThis.litPropertyMetadata.set(n, a = /* @__PURE__ */ new Map()), i === "setter" && ((r = Object.create(r)).wrapped = !0), a.set(t.name, r), i === "accessor") {
    const { name: s } = t;
    return { set(o) {
      const u = e.get.call(this);
      e.set.call(this, o), this.requestUpdate(s, u, r, !0, o);
    }, init(o) {
      return o !== void 0 && this.C(s, void 0, r, o), o;
    } };
  }
  if (i === "setter") {
    const { name: s } = t;
    return function(o) {
      const u = this[s];
      e.call(this, o), this.requestUpdate(s, u, r, !0, o);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function w(r) {
  return (e, t) => typeof t == "object" ? Nt(r, e, t) : ((i, n, a) => {
    const s = n.hasOwnProperty(a);
    return n.constructor.createProperty(a, i), s ? Object.getOwnPropertyDescriptor(n, a) : void 0;
  })(r, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function C(r) {
  return w({ ...r, state: !0, attribute: !1 });
}
const Fe = {
  nearTargetThreshold: 5,
  targetReachedTolerance: 2
}, Ot = {
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
function tt(r, e) {
  if (!(r === void 0 || e === void 0))
    return r - e;
}
function Ft(r) {
  return {
    nearTargetThreshold: ke(
      r.nearTargetThreshold,
      Fe.nearTargetThreshold
    ),
    targetReachedTolerance: ke(
      r.targetReachedTolerance,
      Fe.targetReachedTolerance
    )
  };
}
function kt(r, e, t) {
  const i = tt(r, e);
  if (i === void 0)
    return "unavailable";
  const n = Ft(t);
  return i < -20 ? "far_below" : i <= -n.nearTargetThreshold ? "heating" : i < -n.targetReachedTolerance ? "near_target" : i <= n.targetReachedTolerance ? "target_reached" : "above_target";
}
function zt(r, e) {
  return r === void 0 || e === void 0 || e <= 0 ? 0 : Math.min(Math.max(r / e, 0), 1);
}
function Ut(r, e, t) {
  return {
    difference: tt(r, e),
    progress: zt(r, e),
    status: kt(r, e, t)
  };
}
function rt(r) {
  return Ot[r];
}
function ke(r, e) {
  return r === void 0 || !Number.isFinite(r) ? e : Math.max(0, r);
}
const it = "custom:sauna-suite-card", Lt = "sauna-suite-card", It = "sauna-suite-card", nt = "sauna-suite-editor", Vt = "fceeb-sauna-suite-temperature-trend";
function ye(r, e, t) {
  r.get(e) || r.define(e, t);
}
var Kt = Object.defineProperty, H = (r, e, t, i) => {
  for (var n = void 0, a = r.length - 1, s; a >= 0; a--)
    (s = r[a]) && (n = s(e, t, n) || n);
  return n && Kt(e, t, n), n;
};
const J = 240, X = 80, f = 8;
class b extends D {
  constructor() {
    super(...arguments), this.samples = [], this.status = "unavailable", this.direction = "idle", this.emptyLabel = "No trend data available";
  }
  createRenderRoot() {
    return this;
  }
  render() {
    if (this.samples.length < 2)
      return c`<div class="trend-empty">${this.emptyLabel}</div>`;
    const e = this.getLineColor(), t = this.createLinePath(), i = this.createAreaPath(t), n = this.createTargetReferencePath(), a = this.createCurrentPoint();
    return c`
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
        ${A`<path d=${i} fill="url(#sauna-suite-trend-fill)"></path>`}
        ${n ? A`<path class="target-reference-line" d=${n} fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="5 5" stroke-linecap="round"></path>` : void 0}
        ${A`<path class="trend-line" d=${t} fill="none" stroke=${e} stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`}
        ${a ? A`<circle class="current-value-marker" cx=${String(a.x)} cy=${String(a.y)} r="4.2" fill=${e} stroke="currentColor" stroke-width="1.5"></circle>` : void 0}
        ${this.heatingRateLabel ? A`<text class="heating-rate-annotation" x="232" y="18" text-anchor="end">${this.heatingRateLabel}</text>` : void 0}
      </svg>
    `;
  }
  createLinePath() {
    return this.samples.map((e, t) => {
      const i = this.mapSampleToPoint(e, t);
      return `${t === 0 ? "M" : "L"} ${i.x.toFixed(1)} ${i.y.toFixed(1)}`;
    }).join(" ");
  }
  createTargetReferencePath() {
    if (this.targetValue === void 0 || !Number.isFinite(this.targetValue))
      return;
    const e = this.mapValueToY(this.targetValue);
    return `M ${f} ${e.toFixed(1)} L ${J - f} ${e.toFixed(1)}`;
  }
  createCurrentPoint() {
    if (!(this.currentValue === void 0 || !Number.isFinite(this.currentValue)))
      return {
        x: J - f,
        y: this.mapValueToY(this.currentValue)
      };
  }
  createAreaPath(e) {
    return `${e} L ${J - f} ${X - f / 2} L ${f} ${X - f / 2} Z`;
  }
  mapSampleToPoint(e, t) {
    const i = (J - f * 2) / (this.samples.length - 1);
    return {
      x: f + t * i,
      y: this.mapValueToY(e.value)
    };
  }
  mapValueToY(e) {
    const { minimum: t, range: i } = this.getValueRange();
    return X - f - (e - t) / i * (X - f * 2);
  }
  getValueRange() {
    const e = this.samples.map((n) => n.value);
    this.targetValue !== void 0 && Number.isFinite(this.targetValue) && e.push(this.targetValue), this.currentValue !== void 0 && Number.isFinite(this.currentValue) && e.push(this.currentValue);
    const t = Math.min(...e), i = Math.max(...e);
    return {
      minimum: t,
      range: i - t || 1
    };
  }
  getLineColor() {
    return this.direction === "cooling" ? "#4ea3ff" : rt(this.status).line;
  }
}
H([
  w({ attribute: !1 })
], b.prototype, "samples");
H([
  w()
], b.prototype, "status");
H([
  w()
], b.prototype, "direction");
H([
  w({ attribute: "empty-label" })
], b.prototype, "emptyLabel");
H([
  w({ attribute: "target-value", type: Number })
], b.prototype, "targetValue");
H([
  w({ attribute: "current-value", type: Number })
], b.prototype, "currentValue");
H([
  w({ attribute: "heating-rate-label" })
], b.prototype, "heatingRateLabel");
ye(customElements, Vt, b);
function G(r, e, t) {
  if (le(r, "value"), le(e, "minimum"), le(t, "maximum"), e > t)
    throw new RangeError("minimum must be less than or equal to maximum");
  return Math.min(Math.max(r, e), t);
}
function le(r, e) {
  if (!Number.isFinite(r))
    throw new RangeError(`${e} must be a finite number`);
}
const Bt = 0.02, Wt = -0.02;
function Zt(r, e) {
  const t = r.filter(
    (a) => Number.isFinite(a.timestamp) && Number.isFinite(a.value) && a.timestamp >= 0
  ).sort((a, s) => a.timestamp - s.timestamp);
  if (t.length < e)
    return {
      validSampleCount: t.length,
      validSlopeCount: 0
    };
  const i = jt(t);
  if (i.length === 0)
    return {
      validSampleCount: t.length,
      validSlopeCount: 0
    };
  const n = qt(i);
  return {
    rateCPerMinute: ge(n),
    validSampleCount: t.length,
    validSlopeCount: n.length
  };
}
function Gt(r) {
  return r !== void 0 && Number.isFinite(r) && r >= Bt;
}
function ze(r) {
  return r !== void 0 && Number.isFinite(r) && r <= Wt;
}
function jt(r) {
  const e = [];
  for (let t = 1; t < r.length; t += 1) {
    const i = r[t - 1], n = r[t];
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
function qt(r) {
  const e = ge(r), t = r.map((s) => Math.abs(s - e)), i = ge(t), n = Math.max(0.05, i * 3), a = r.filter((s) => Math.abs(s - e) <= n);
  return a.length > 0 ? a : [...r];
}
function ge(r) {
  const e = [...r].sort((n, a) => n - a), t = Math.floor(e.length / 2), i = e[t] ?? 0;
  return e.length % 2 === 1 ? i : ((e[t - 1] ?? i) + i) / 2;
}
const Yt = 20, Jt = 0.85, Xt = 1.25, Qt = 0.75, er = 1.5;
function tr(r) {
  const e = rr(
    r.outsideTemperature,
    r.outsideTemperatureWeight
  ), t = ir(
    r.effectivePowerKw,
    r.nominalPowerKw
  );
  if (r.currentTemperature === void 0 || r.targetTemperature === void 0 || !Number.isFinite(r.currentTemperature) || !Number.isFinite(r.targetTemperature))
    return {
      outsideCorrectionFactor: e,
      powerCorrectionFactor: t,
      unavailableReason: "missing_temperature"
    };
  const i = r.targetTemperature - r.currentTemperature;
  if (i <= 0)
    return {
      outsideCorrectionFactor: e,
      powerCorrectionFactor: t,
      unavailableReason: "target_reached"
    };
  if (r.effectivePowerKw === 0)
    return {
      outsideCorrectionFactor: e,
      powerCorrectionFactor: t,
      unavailableReason: "heater_off"
    };
  if (r.effectivePowerKw === void 0 || !Number.isFinite(r.effectivePowerKw) || r.effectivePowerKw < 0)
    return {
      outsideCorrectionFactor: e,
      powerCorrectionFactor: t,
      unavailableReason: "missing_power"
    };
  if (r.hasInsufficientHistory)
    return {
      outsideCorrectionFactor: e,
      powerCorrectionFactor: t,
      unavailableReason: "insufficient_history"
    };
  const n = r.heatingRateCPerMinute;
  if (!Gt(n))
    return {
      outsideCorrectionFactor: e,
      powerCorrectionFactor: t,
      unavailableReason: "invalid_rate"
    };
  const s = i / n;
  return {
    etaMinutes: s * e * t,
    baseEtaMinutes: s,
    outsideCorrectionFactor: e,
    powerCorrectionFactor: t
  };
}
function rr(r, e) {
  if (r === void 0 || !Number.isFinite(r))
    return 1;
  const i = 1 + Math.max(0, e) * ((Yt - r) / 40);
  return G(i, Jt, Xt);
}
function ir(r, e) {
  return r === void 0 || !Number.isFinite(r) || r <= 0 || !Number.isFinite(e) || e <= 0 ? 1 : G(e / r, Qt, er);
}
function nr(r, e) {
  if (r === void 0 || !Number.isFinite(r) || r < 0)
    return;
  const t = Math.max(1, Math.round(r));
  if (t < 60)
    return `${e.readyIn} ${t} ${t === 1 ? e.minute : e.minutes}`;
  const i = Math.floor(t / 60), n = t % 60, a = i === 1 ? e.hour : e.hours;
  return n === 0 ? `${e.readyIn} ${i} ${a}` : `${e.readyIn} ${i} ${a} ${n} ${n === 1 ? e.minute : e.minutes}`;
}
function ar(r, e, t) {
  if (r === void 0 || !Number.isFinite(r) || r < 0)
    return;
  const i = new Date(e.getTime() + r * 6e4);
  return new Intl.DateTimeFormat(t, {
    hour: "2-digit",
    minute: "2-digit"
  }).format(i);
}
const at = [
  "top",
  "middle",
  "bottom",
  "average",
  "weighted_average",
  "minimum",
  "maximum"
], st = ["fixed", "general_power_sensor"], ot = "Sauna Suite", ce = 1, Ue = 9, sr = 0.15, or = 5, ur = 30, dr = 5, lr = 2, cr = 120, hr = 5;
function be() {
  return {
    type: it,
    name: ot,
    control_temperature_mode: "average",
    heating_power_mode: "fixed",
    fixed_heater_power_kw: Ue,
    heater_rated_power_kw: Ue,
    outside_temperature_weight: sr,
    weight_top: ce,
    weight_middle: ce,
    weight_bottom: ce,
    show_outside_temperature: !1,
    show_temperature_zones: !0,
    show_eta: !0,
    show_ready_time: !0,
    show_heating_rate: !0,
    eta_minimum_samples: or,
    eta_history_minutes: ur,
    near_target_threshold: dr,
    target_reached_tolerance: lr,
    show_temperature_trend: !0,
    trend_history_minutes: cr,
    trend_refresh_minutes: hr,
    confirm_switch_on: !0
  };
}
function F(r) {
  const e = be(), t = {
    type: it,
    name: ut(r.name, ot),
    control_temperature_mode: mr(r.control_temperature_mode),
    heating_power_mode: pr(r.heating_power_mode),
    fixed_heater_power_kw: x(
      r.fixed_heater_power_kw,
      e.fixed_heater_power_kw,
      0,
      50
    ),
    heater_rated_power_kw: x(
      r.heater_rated_power_kw,
      e.heater_rated_power_kw,
      0,
      50
    ),
    outside_temperature_weight: x(
      r.outside_temperature_weight,
      e.outside_temperature_weight,
      0,
      1
    ),
    weight_top: he(r.weight_top, e.weight_top),
    weight_middle: he(r.weight_middle, e.weight_middle),
    weight_bottom: he(r.weight_bottom, e.weight_bottom),
    show_outside_temperature: $(
      r.show_outside_temperature,
      e.show_outside_temperature
    ),
    show_temperature_zones: $(
      r.show_temperature_zones,
      e.show_temperature_zones
    ),
    show_eta: $(r.show_eta, e.show_eta),
    show_ready_time: $(r.show_ready_time, e.show_ready_time),
    show_heating_rate: $(r.show_heating_rate, e.show_heating_rate),
    eta_minimum_samples: gr(
      r.eta_minimum_samples,
      e.eta_minimum_samples,
      2,
      60
    ),
    eta_history_minutes: x(
      r.eta_history_minutes,
      e.eta_history_minutes,
      5,
      1440
    ),
    near_target_threshold: Le(
      r.near_target_threshold,
      e.near_target_threshold
    ),
    target_reached_tolerance: Le(
      r.target_reached_tolerance,
      e.target_reached_tolerance
    ),
    show_temperature_trend: $(
      r.show_temperature_trend,
      e.show_temperature_trend
    ),
    trend_history_minutes: x(
      r.trend_history_minutes,
      e.trend_history_minutes,
      15,
      1440
    ),
    trend_refresh_minutes: x(
      r.trend_refresh_minutes,
      e.trend_refresh_minutes,
      1,
      60
    ),
    confirm_switch_on: $(r.confirm_switch_on, e.confirm_switch_on)
  };
  return E(t, "main_switch_entity", r.main_switch_entity), E(t, "temperature_top_entity", r.temperature_top_entity), E(t, "temperature_middle_entity", r.temperature_middle_entity), E(t, "temperature_bottom_entity", r.temperature_bottom_entity), E(t, "outside_temperature_entity", r.outside_temperature_entity), E(t, "target_temperature_entity", r.target_temperature_entity), E(
    t,
    "general_power_sensor_entity",
    r.general_power_sensor_entity
  ), t;
}
function mr(r) {
  return typeof r == "string" && at.includes(r) ? r : be().control_temperature_mode;
}
function pr(r) {
  return typeof r == "string" && st.includes(r) ? r : be().heating_power_mode;
}
function he(r, e) {
  return typeof r != "number" || !Number.isFinite(r) ? e : Math.max(0, r);
}
function $(r, e) {
  return typeof r == "boolean" ? r : e;
}
function Le(r, e) {
  return typeof r != "number" || !Number.isFinite(r) ? e : Math.max(0, r);
}
function ut(r, e) {
  return typeof r == "string" ? r : e;
}
function E(r, e, t) {
  const i = ut(t);
  i !== void 0 && (r[e] = i);
}
function x(r, e, t, i) {
  return typeof r != "number" || !Number.isFinite(r) ? e : G(r, t, i);
}
function gr(r, e, t, i) {
  return Math.round(x(r, e, t, i));
}
function dt(r) {
  return U(r) === "switch" || U(r) === "input_boolean";
}
function lt(r) {
  return U(r) === "number" || U(r) === "input_number";
}
function Q(r) {
  return !r || r.state === "unavailable" || r.state === "unknown";
}
async function fr(r, e, t) {
  if (!(r != null && r.callService))
    return { ok: !1, error: "Home Assistant service API is unavailable." };
  if (!dt(e))
    return { ok: !1, error: "Unsupported switch entity domain." };
  const i = U(e), n = t ? "turn_on" : "turn_off";
  try {
    return await r.callService(i, n, { entity_id: e }), { ok: !0 };
  } catch (a) {
    return {
      ok: !1,
      error: a instanceof Error ? a.message : "Failed to update switch entity."
    };
  }
}
async function _r(r, e, t, i) {
  if (!(r != null && r.callService))
    return { ok: !1, error: "Home Assistant service API is unavailable." };
  if (!lt(e))
    return { ok: !1, error: "Unsupported target temperature entity domain." };
  const n = U(e), a = wr(t, i);
  try {
    return await r.callService(n, "set_value", {
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
function Ie(r) {
  if (!r)
    return;
  const e = me(r, "min"), t = me(r, "max"), i = me(r, "step");
  if (!(e === void 0 || t === void 0 || i === void 0 || i <= 0))
    return {
      minimum: e,
      maximum: t,
      step: i
    };
}
function wr(r, e) {
  const t = G(r, e.minimum, e.maximum), i = Math.round((t - e.minimum) / e.step), n = e.minimum + i * e.step, a = vr(e.step);
  return Number(G(n, e.minimum, e.maximum).toFixed(a));
}
function U(r) {
  return (r == null ? void 0 : r.split(".")[0]) ?? "";
}
function me(r, e) {
  const t = r.attributes[e], i = typeof t == "number" ? t : Number(t);
  return Number.isFinite(i) ? i : void 0;
}
function vr(r) {
  const [, e = ""] = r.toString().split(".");
  return e.length;
}
function yr(r) {
  const e = typeof r == "number" ? r : Number(r);
  return Number.isFinite(e) ? e : void 0;
}
function br(r, e) {
  if (r === void 0 || !Number.isFinite(r))
    return;
  const t = e == null ? void 0 : e.trim().toLowerCase();
  if (t === "w")
    return r / 1e3;
  if (t === "kw" || t === void 0 || t === "")
    return r;
}
function ne(r) {
  if (!(r === void 0 || !Number.isFinite(r) || r < 0))
    return r;
}
function Tr(r, e) {
  return ne(br(yr(r), e));
}
function $r(r, e) {
  const t = ne(r), i = ne(e);
  if (!(t === void 0 || i === void 0))
    return Math.min(t, i);
}
const Er = /* @__PURE__ */ new Set(["unavailable", "unknown", ""]);
function ct(r) {
  if (r === void 0)
    return;
  if (typeof r == "number")
    return Number.isFinite(r) ? r : void 0;
  const e = r.trim().toLowerCase();
  if (Er.has(e))
    return;
  const t = Number(r);
  return Number.isFinite(t) ? t : void 0;
}
function xr(r) {
  const e = r.filter(Number.isFinite);
  return e.length === 0 ? void 0 : e.reduce((i, n) => i + n, 0) / e.length;
}
function Ar(r, e) {
  const t = ht(r).map((a) => ({
    value: r[a],
    weight: Cr(e[a])
  })).filter((a) => a.value !== void 0), i = t.reduce((a, s) => a + s.weight, 0);
  return t.length === 0 || i <= 0 ? void 0 : t.reduce((a, s) => a + s.value * s.weight, 0) / i;
}
function Sr(r) {
  const e = Te(r);
  return e.length > 0 ? Math.min(...e) : void 0;
}
function Mr(r) {
  const e = Te(r);
  return e.length > 0 ? Math.max(...e) : void 0;
}
function Pr(r, e, t) {
  switch (e) {
    case "top":
      return r.top;
    case "middle":
      return r.middle;
    case "bottom":
      return r.bottom;
    case "average":
      return xr(Te(r));
    case "weighted_average":
      return Ar(r, t);
    case "minimum":
      return Sr(r);
    case "maximum":
      return Mr(r);
  }
}
function Dr(r) {
  if (!(r.top === void 0 || r.bottom === void 0))
    return r.top - r.bottom;
}
function Rr(r, e, t) {
  return {
    controlTemperature: Pr(r, e, t),
    stratification: Dr(r)
  };
}
function Te(r) {
  return ht(r).map((e) => r[e]).filter((e) => e !== void 0);
}
function ht(r) {
  return ["top", "middle", "bottom"].filter((t) => r[t] !== void 0);
}
function Cr(r) {
  return Number.isFinite(r) ? Math.max(0, r) : 0;
}
function Hr(r, e) {
  const t = {
    top: I(r, e.temperature_top_entity),
    middle: I(r, e.temperature_middle_entity),
    bottom: I(r, e.temperature_bottom_entity)
  }, i = {
    top: e.weight_top,
    middle: e.weight_middle,
    bottom: e.weight_bottom
  };
  return {
    zones: t,
    outsideTemperature: I(r, e.outside_temperature_entity),
    targetTemperature: I(r, e.target_temperature_entity),
    summary: Rr(t, e.control_temperature_mode, i)
  };
}
function I(r, e) {
  var t;
  if (!(!r || !e))
    return ct((t = r.states[e]) == null ? void 0 : t.state);
}
function S(r, e) {
  if (!(!r || !e))
    return r.states[e];
}
function Nr(r, e) {
  const t = S(r, e.main_switch_entity), i = kr(e);
  return (t == null ? void 0 : t.state) === "off" ? {
    effectivePowerKw: 0,
    nominalPowerKw: i,
    mode: e.heating_power_mode,
    approximate: e.heating_power_mode === "general_power_sensor"
  } : e.heating_power_mode === "general_power_sensor" ? {
    effectivePowerKw: Or(r, e),
    nominalPowerKw: i,
    mode: e.heating_power_mode,
    approximate: !0
  } : {
    effectivePowerKw: ne(e.fixed_heater_power_kw),
    nominalPowerKw: i,
    mode: e.heating_power_mode,
    approximate: !1
  };
}
function Or(r, e) {
  const t = S(r, e.general_power_sensor_entity), i = Fr(t);
  return $r(i, e.heater_rated_power_kw);
}
function Fr(r) {
  if (!r || r.state === "unavailable" || r.state === "unknown")
    return;
  const e = r.attributes.unit_of_measurement;
  return Tr(
    r.state,
    typeof e == "string" ? e : void 0
  );
}
function kr(r) {
  return r.heating_power_mode === "general_power_sensor" ? r.heater_rated_power_kw : r.fixed_heater_power_kw;
}
async function zr(r, e, t, i = 120) {
  if (!(r != null && r.callApi) || !e)
    return [];
  const n = /* @__PURE__ */ new Date(), a = new Date(n.getTime() - t * 6e4), s = new URLSearchParams({
    filter_entity_id: e,
    end_time: n.toISOString(),
    minimal_response: "1",
    no_attributes: "1"
  });
  try {
    const o = await r.callApi(
      "GET",
      `history/period/${a.toISOString()}?${s.toString()}`
    );
    return Lr(Ur(o), i);
  } catch {
    return [];
  }
}
function Ur(r) {
  return r.flat().map((e) => {
    const t = ct(e.state), i = e.last_changed ?? e.last_updated, n = i ? Date.parse(i) : Number.NaN;
    if (!(t === void 0 || !Number.isFinite(n)))
      return {
        timestamp: n,
        value: t
      };
  }).filter((e) => e !== void 0);
}
function Lr(r, e) {
  if (r.length <= e)
    return [...r];
  const t = Math.ceil(r.length / e);
  return r.filter((i, n) => n % t === 0).slice(0, e);
}
const Ir = /* @__PURE__ */ new Set(["top", "middle", "bottom"]);
function Ve(r) {
  return Ir.has(r);
}
function Ke(r) {
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
const Vr = qe`
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
`, Kr = { bottomTemperature: "Unten", confirmSwitchOn: "Sauna-Entitaet manuell einschalten?", controlTemperature: "Regeltemperatur", decreaseTarget: "Zieltemperatur verringern", earlyDevelopment: "Fruehe Entwicklung", increaseTarget: "Zieltemperatur erhoehen", middleTemperature: "Mitte", name: "Sauna Suite", notAvailable: "Nicht verfuegbar", outsideTemperature: "Aussen", pending: "Aktualisiere...", placeholder: "Nur manuelle Bedienung und Monitoring. Es ist keine automatische Heizungsregelung implementiert.", powerOff: "Aus", powerOn: "Ein", powerUnavailable: "Nicht verfuegbar", sliderUnavailable: "Slider nicht verfuegbar, weil min, max oder step fehlen.", stratification: "Temperaturschichtung", targetDifference: "Differenz zum Ziel", targetTemperature: "Ziel", temperatureTrend: "Temperaturverlauf", temperatureZones: "Temperaturzonen", togglePower: "Sauna-Power-Entitaet umschalten", topTemperature: "Oben", trendDirectModesOnly: "Der Trend ist derzeit nur für direkte Sensormodi verfügbar.", trendLoading: "Verlaufsdaten werden geladen", trendUnavailable: "Keine Verlaufsdaten verfuegbar", effectivePower: "Heizleistung", estimatedPower: "Geschaetzte Heizleistung", etaUnavailable: "ETA nicht verfuegbar", heatingRate: "Heizrate", ready: "Bereit", readyAt: "Bereit um" }, Br = { cardName: "Kartenname", cardNameDescription: "Titel im Kartenkopf.", confirmSwitchOn: "Einschalten bestaetigen", confirmSwitchOnDescription: "Vor dem manuellen Einschalten der konfigurierten Entitaet einen Dialog anzeigen.", controlTemperatureMode: "Modus fuer Regeltemperatur", controlTemperatureModeDescription: "Legt fest, welche Temperatur als zentrale Regeltemperatur angezeigt wird.", mainSwitchEntity: "Hauptschalter-Entitaet", mainSwitchEntityDescription: "Entitaet fuer den manuellen Power-Button. Unterstuetzt: switch und input_boolean.", nearTargetThreshold: "Nahe-Ziel-Schwelle", nearTargetThresholdDescription: "Grad unter Zieltemperatur, die als nahe am Ziel gelten.", outsideTemperatureEntity: "Aussentemperatur-Entitaet", outsideTemperatureEntityDescription: "Optionaler Aussentemperatur-Sensor.", sections: { display: "Anzeige", entities: "Entitaeten", general: "Allgemein", safety: "Sicherheit und Bestaetigung", temperatureCalculation: "Temperaturberechnung", trend: "Verlauf", heatingEta: "Heiz-ETA" }, showOutsideTemperature: "Aussentemperatur anzeigen", showOutsideTemperatureDescription: "Aussentemperatur anzeigen, wenn eine Entitaet konfiguriert ist.", showTemperatureTrend: "Temperaturverlauf anzeigen", showTemperatureTrendDescription: "Aktuelle Recorder-Historie fuer direkte Sensormodi oben, Mitte oder unten laden.", showTemperatureZones: "Temperaturzonen anzeigen", showTemperatureZonesDescription: "Werte der Sensoren oben, Mitte und unten anzeigen.", targetReachedTolerance: "Ziel-erreicht-Toleranz", targetReachedToleranceDescription: "Grad um die Zieltemperatur, die als Ziel erreicht gelten.", targetTemperatureEntity: "Zieltemperatur-Entitaet", targetTemperatureEntityDescription: "Entitaet fuer manuelle Zielwerte. Unterstuetzt: number und input_number.", temperatureBottomEntity: "Temperatur unten", temperatureBottomEntityDescription: "Temperatursensor unten in der Sauna.", temperatureMiddleEntity: "Temperatur Mitte", temperatureMiddleEntityDescription: "Temperatursensor in der Mitte der Sauna.", temperatureTopEntity: "Temperatur oben", temperatureTopEntityDescription: "Temperatursensor oben in der Sauna.", trendHistoryMinutes: "Verlauf in Minuten", trendHistoryMinutesDescription: "Zeitfenster aus dem Recorder. Erlaubt: 15 bis 1440 Minuten.", trendRefreshMinutes: "Aktualisierung in Minuten", trendRefreshMinutesDescription: "Intervall fuer die Verlaufsaktualisierung. Erlaubt: 1 bis 60 Minuten.", weightBottom: "Gewichtung unten", weightBottomDescription: "Gewichtung fuer den unteren Sensor beim gewichteten Durchschnitt.", weightMiddle: "Gewichtung Mitte", weightMiddleDescription: "Gewichtung fuer den mittleren Sensor beim gewichteten Durchschnitt.", weightTop: "Gewichtung oben", weightTopDescription: "Gewichtung fuer den oberen Sensor beim gewichteten Durchschnitt.", etaHistoryMinutes: "ETA-Verlauf in Minuten", etaHistoryMinutesDescription: "Recorder-Zeitfenster fuer ETA und Heizrate.", etaMinimumSamples: "ETA-Mindestanzahl Samples", etaMinimumSamplesDescription: "Mindestanzahl gueltiger Recorder-Samples fuer die ETA.", fixedHeaterPowerKw: "Feste Ofenleistung (kW)", fixedHeaterPowerKwDescription: "Nennleistung des Ofens fuer die ETA ohne Leistungssensor.", generalPowerSensorEntity: "Allgemeiner Leistungssensor", generalPowerSensorEntityDescription: "Ungefaehrer Gesamtleistungssensor. W und kW werden unterstuetzt.", heaterRatedPowerKw: "Ofen-Nennleistung (kW)", heaterRatedPowerKwDescription: "Maximaler Sauna-Anteil fuer die Schaetzung aus dem allgemeinen Leistungssensor.", heatingPowerMode: "Heizleistungsmodus", heatingPowerModeDescription: "Feste Ofenleistung oder ungefaehre Schaetzung aus einem allgemeinen Leistungssensor.", outsideTemperatureWeight: "Aussentemperatur-Gewichtung", outsideTemperatureWeightDescription: "Begrenzte ETA-Korrekturstaerke fuer die Aussentemperatur.", showEta: "ETA anzeigen", showEtaDescription: "Deterministische Aufheizschaetzung anzeigen, wenn genug Recorder-Daten vorhanden sind.", showHeatingRate: "Heizrate und Leistung anzeigen", showHeatingRateDescription: "Gemessene aktuelle Heizrate und effektive Heizleistung anzeigen.", showReadyTime: "Bereit-Uhrzeit anzeigen", showReadyTimeDescription: "Erwartete Uhrzeit anzeigen, wenn eine ETA verfuegbar ist." }, Wr = { average: "Durchschnitt", bottom: "Unten", maximum: "Maximum", middle: "Mitte", minimum: "Minimum", top: "Oben", weighted_average: "Gewichteter Durchschnitt" }, Zr = { above_target: "Ueber Ziel", far_below: "Weit unter Ziel", heating: "Heizt", near_target: "Nahe am Ziel", target_reached: "Ziel erreicht", unavailable: "Temperatur nicht verfuegbar" }, Gr = { readyIn: "Bereit in", hour: "h", hours: "h", minute: "min", minutes: "min" }, jr = { fixed: "Feste Ofenleistung", general_power_sensor: "Allgemeiner Leistungssensor" }, qr = { off: "Aus", heating: "Heizt", slowly_heating: "Heizt langsam", near_target: "Nahe am Ziel", ready: "Bereit", above_target: "Ueber Ziel", cooling: "Kuehlt ab", data_unavailable: "Daten nicht verfuegbar" }, Yr = {
  card: Kr,
  editor: Br,
  modes: Wr,
  status: Zr,
  eta: Gr,
  heatingPowerModes: jr,
  heatingStatus: qr
}, Jr = { bottomTemperature: "Bottom", confirmSwitchOn: "Switch the sauna entity on manually?", controlTemperature: "Control temperature", decreaseTarget: "Decrease target temperature", earlyDevelopment: "Early Development", increaseTarget: "Increase target temperature", middleTemperature: "Middle", name: "Sauna Suite", notAvailable: "Not available", outsideTemperature: "Outside", pending: "Updating...", placeholder: "Manual controls and monitoring only. No automatic heater regulation is implemented.", powerOff: "Off", powerOn: "On", powerUnavailable: "Unavailable", sliderUnavailable: "Slider unavailable because min, max or step is missing.", stratification: "Stratification", targetDifference: "Difference to target", targetTemperature: "Target", temperatureTrend: "Temperature trend", temperatureZones: "Temperature zones", togglePower: "Toggle sauna power entity", topTemperature: "Top", trendDirectModesOnly: "Trend is currently available only for direct sensor modes.", trendLoading: "Loading trend data", trendUnavailable: "No trend data available", effectivePower: "Heating power", estimatedPower: "Estimated heating power", etaUnavailable: "ETA unavailable", heatingRate: "Heating rate", ready: "Ready", readyAt: "Ready at" }, Xr = { cardName: "Card name", cardNameDescription: "Title shown in the card header.", confirmSwitchOn: "Confirm before switching on", confirmSwitchOnDescription: "Require a confirmation dialog before the manual power button turns on the configured entity.", controlTemperatureMode: "Control temperature mode", controlTemperatureModeDescription: "Select which temperature is displayed as the main control temperature.", mainSwitchEntity: "Main switch entity", mainSwitchEntityDescription: "Manual power button entity. Supported domains: switch and input_boolean.", nearTargetThreshold: "Near-target threshold", nearTargetThresholdDescription: "Degrees below target that should be treated as near target.", outsideTemperatureEntity: "Outside temperature entity", outsideTemperatureEntityDescription: "Optional outside temperature sensor.", sections: { display: "Display", entities: "Entities", general: "General", safety: "Safety and confirmation", temperatureCalculation: "Temperature calculation", trend: "Trend", heatingEta: "Heating ETA" }, showOutsideTemperature: "Show outside temperature", showOutsideTemperatureDescription: "Display the outside temperature when an entity is configured.", showTemperatureTrend: "Show temperature trend", showTemperatureTrendDescription: "Load recent Recorder history for top, middle or bottom direct sensor modes.", showTemperatureZones: "Show temperature zones", showTemperatureZonesDescription: "Display top, middle and bottom sensor values.", targetReachedTolerance: "Target-reached tolerance", targetReachedToleranceDescription: "Degrees around target that are considered target reached.", targetTemperatureEntity: "Target temperature entity", targetTemperatureEntityDescription: "Manual target setting entity. Supported domains: number and input_number.", temperatureBottomEntity: "Bottom temperature entity", temperatureBottomEntityDescription: "Bottom sauna temperature sensor.", temperatureMiddleEntity: "Middle temperature entity", temperatureMiddleEntityDescription: "Middle sauna temperature sensor.", temperatureTopEntity: "Top temperature entity", temperatureTopEntityDescription: "Top sauna temperature sensor.", trendHistoryMinutes: "Trend history minutes", trendHistoryMinutesDescription: "History window loaded from Recorder. Allowed range: 15 to 1440 minutes.", trendRefreshMinutes: "Trend refresh minutes", trendRefreshMinutesDescription: "How often the trend is refreshed. Allowed range: 1 to 60 minutes.", weightBottom: "Bottom weight", weightBottomDescription: "Weight for bottom sensor when weighted average is selected.", weightMiddle: "Middle weight", weightMiddleDescription: "Weight for middle sensor when weighted average is selected.", weightTop: "Top weight", weightTopDescription: "Weight for top sensor when weighted average is selected.", etaHistoryMinutes: "ETA history minutes", etaHistoryMinutesDescription: "Recorder history window used for ETA and heating-rate calculation.", etaMinimumSamples: "ETA minimum samples", etaMinimumSamplesDescription: "Minimum valid Recorder samples required before ETA is calculated.", fixedHeaterPowerKw: "Fixed heater power (kW)", fixedHeaterPowerKwDescription: "Rated heater power used for ETA when no power sensor is configured.", generalPowerSensorEntity: "General power sensor", generalPowerSensorEntityDescription: "Approximate total power sensor. W and kW units are supported.", heaterRatedPowerKw: "Heater rated power (kW)", heaterRatedPowerKwDescription: "Maximum sauna share used to cap the general power sensor estimate.", heatingPowerMode: "Heating power mode", heatingPowerModeDescription: "Choose fixed heater power or an approximate general power sensor estimate.", outsideTemperatureWeight: "Outside-temperature weight", outsideTemperatureWeightDescription: "Bounded ETA correction strength for outside temperature context.", showEta: "Show ETA", showEtaDescription: "Display the deterministic heat-up estimate when enough Recorder data exists.", showHeatingRate: "Show heating rate and power", showHeatingRateDescription: "Display recent measured heating rate and effective heater power.", showReadyTime: "Show ready time", showReadyTimeDescription: "Display the expected clock time when ETA is available." }, Qr = { average: "Average", bottom: "Bottom", maximum: "Maximum", middle: "Middle", minimum: "Minimum", top: "Top", weighted_average: "Weighted average" }, ei = { above_target: "Above target", far_below: "Far below target", heating: "Heating", near_target: "Near target", target_reached: "Target reached", unavailable: "Temperature unavailable" }, ti = { readyIn: "Ready in", hour: "h", hours: "h", minute: "min", minutes: "min" }, ri = { fixed: "Fixed heater power", general_power_sensor: "General power sensor" }, ii = { off: "Off", heating: "Heating", slowly_heating: "Slowly heating", near_target: "Near target", ready: "Ready", above_target: "Above target", cooling: "Cooling", data_unavailable: "Data unavailable" }, ni = {
  card: Jr,
  editor: Xr,
  modes: Qr,
  status: ei,
  eta: ti,
  heatingPowerModes: ri,
  heatingStatus: ii
}, Be = {
  de: Yr,
  en: ni
};
function mt(r, e) {
  const t = r != null && r.toLowerCase().startsWith("de") ? "de" : "en";
  return We(Be[t], e) ?? We(Be.en, e) ?? e;
}
function We(r, e) {
  const t = e.split(".").reduce((i, n) => {
    if (!(typeof i != "object" || i === void 0))
      return i[n];
  }, r);
  return typeof t == "string" ? t : void 0;
}
var ai = Object.defineProperty, N = (r, e, t, i) => {
  for (var n = void 0, a = r.length - 1, s; a >= 0; a--)
    (s = r[a]) && (n = s(e, t, n) || n);
  return n && ai(e, t, n), n;
};
const pe = "°C", ee = "—", si = 0.05, $e = class $e extends D {
  constructor() {
    super(...arguments), this.config = F({}), this.switchPending = !1, this.targetPending = !1, this.historySamples = [], this.historyLoading = !1;
  }
  setConfig(e) {
    this.config = F(e), this.resetHistorySchedule();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.clearHistoryTimer(), this.clearTargetDebounceTimer();
  }
  getCardSize() {
    return 7;
  }
  static getConfigElement() {
    return document.createElement(nt);
  }
  static getStubConfig() {
    return F({});
  }
  updated(e) {
    (e.has("hass") || e.has("config")) && this.scheduleHistoryRefresh();
  }
  render() {
    const e = Hr(this.hass, this.config), t = Ut(
      e.summary.controlTemperature,
      e.targetTemperature,
      {
        nearTargetThreshold: this.config.near_target_threshold,
        targetReachedTolerance: this.config.target_reached_tolerance
      }
    ), i = Zt(
      this.historySamples,
      this.config.eta_minimum_samples
    ), n = Nr(this.hass, this.config), a = tr({
      currentTemperature: e.summary.controlTemperature,
      targetTemperature: e.targetTemperature,
      heatingRateCPerMinute: i.rateCPerMinute,
      outsideTemperature: e.outsideTemperature,
      outsideTemperatureWeight: this.config.outside_temperature_weight,
      effectivePowerKw: n.effectivePowerKw,
      nominalPowerKw: n.nominalPowerKw,
      hasInsufficientHistory: this.hasEtaHistoryConsumer() && i.rateCPerMinute === void 0
    }), s = rt(t.status), o = S(this.hass, this.config.main_switch_entity), u = S(this.hass, this.config.target_temperature_entity), d = this.getHeatingDashboardStatus(
      t.status,
      o,
      i,
      a
    );
    return c`
      <ha-card>
        <div
          class="content"
          style=${`--sauna-status-line: ${s.line}; --sauna-status-fill: ${s.fill};`}
        >
          <header class="header">
            <div class="brand-mark" aria-hidden="true">${this.renderHeatIcon()}</div>
            <div class="header-copy">
              <div class="title">${this.config.name}</div>
              <div class="state">${this.t(`heatingStatus.${d}`)}</div>
            </div>
            ${this.renderPowerButton(o)}
          </header>

          ${this.renderHero(
      e.summary.controlTemperature,
      e.targetTemperature,
      d,
      t.progress,
      t.difference,
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
      t.status,
      e.summary.controlTemperature,
      e.targetTemperature,
      i
    )}
          ${this.renderTargetControl(u)}
        </div>
      </ha-card>
    `;
  }
  renderHero(e, t, i, n, a, s, o, u) {
    const d = this.getTemperatureParts(
      e,
      this.getControlTemperatureUnit()
    ), h = this.getTemperatureParts(
      t,
      this.getTemperatureUnit(this.config.target_temperature_entity)
    ), l = Math.round(Math.min(Math.max(n, 0), 1) * 360), p = this.getEtaLabel(u), g = this.getReadyTimeLabel(u);
    return c`
      <section class="hero" aria-label=${this.t("card.controlTemperature")}>
        <div class="hero-main">
          <div
            class="hero-gauge"
            style=${`--sauna-progress-degrees: ${l}deg;`}
            aria-hidden="true"
          >
            <div class="hero-gauge-center">
              <div class=${`hero-value ${d.unavailable ? "unavailable" : ""}`}>
                <span class="hero-number">${d.value}</span>
                <span class="hero-unit">${d.unit}</span>
              </div>
              <div class="hero-target">
                ${this.t("card.targetTemperature")} ${h.value}${h.unit}
              </div>
            </div>
          </div>
          <div class="hero-summary">
            <div class="label">${this.t("card.controlTemperature")}</div>
            <div class="hero-status">${this.t(`heatingStatus.${i}`)}</div>
            ${p ? c`<div class="eta-primary">${p}</div>` : c`<div class="eta-primary subdued">${this.t("card.etaUnavailable")}</div>`}
            ${g ? c`<div class="ready-time">${g}</div>` : void 0}
          </div>
        </div>

        <div class="hero-meta">
          <span class="status-chip">
            <span class="status-dot" aria-hidden="true"></span>
            ${this.t(`heatingStatus.${i}`)}
          </span>
          ${a !== void 0 ? c`<span class="difference">
                  ${this.t("card.targetDifference")}: ${this.formatTemperatureDelta(a)}
                </span>` : void 0}
        </div>

        <div class="hero-metrics">
          ${this.config.show_heating_rate ? c`
                  ${this.renderMetric(
      "card.heatingRate",
      this.formatHeatingRate(s.rateCPerMinute)
    )}
                  ${this.renderMetric(
      o.approximate ? "card.estimatedPower" : "card.effectivePower",
      this.formatPower(o.effectivePowerKw)
    )}
                ` : void 0}
        </div>
        ${this.serviceError ? c`<div class="error" role="alert">${this.serviceError}</div>` : void 0}
      </section>
    `;
  }
  renderMetric(e, t) {
    return c`
      <div class="metric">
        <span>${this.t(e)}</span>
        <strong>${t}</strong>
      </div>
    `;
  }
  renderTemperatureZones(e, t, i, n, a) {
    const s = this.config.show_temperature_zones, o = this.config.show_outside_temperature && this.config.outside_temperature_entity !== void 0;
    if (!(!s && !o && a === void 0))
      return c`
      <section class="zones" aria-label=${this.t("card.temperatureZones")}>
        ${s ? c`
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
  renderTemperatureTile(e, t, i, n = "zone") {
    const a = this.getTemperatureParts(t, this.getTemperatureUnit(i), !0);
    return c`
      <div class=${`temperature-tile ${n}`}>
        <div class="label">${this.t(e)}</div>
        <div class=${`tile-value ${a.unavailable ? "unavailable" : ""}`}>
          <span>${a.value}</span>
          <small>${a.unit}</small>
        </div>
      </div>
    `;
  }
  renderTrend(e, t, i, n) {
    if (!this.config.show_temperature_trend)
      return;
    const a = Ve(this.config.control_temperature_mode);
    return c`
      <section class="trend-panel" aria-label=${this.t("card.temperatureTrend")}>
        <div class="section-heading">
          <div>
            <div class="label">${this.t("card.temperatureTrend")}</div>
          </div>
        </div>
        ${a ? c`
                <fceeb-sauna-suite-temperature-trend
                  .samples=${this.historySamples}
                  .status=${e}
                  .targetValue=${i}
                  .currentValue=${t}
                  .heatingRateLabel=${this.formatHeatingRate(n.rateCPerMinute)}
                  .direction=${this.getTrendDirection(n.rateCPerMinute)}
                  empty-label=${this.historyLoading ? this.t("card.trendLoading") : this.t("card.trendUnavailable")}
                ></fceeb-sauna-suite-temperature-trend>
              ` : c`<div class="trend-empty">${this.t("card.trendDirectModesOnly")}</div>`}
      </section>
    `;
  }
  renderPowerButton(e) {
    const t = this.switchPending || !dt(this.config.main_switch_entity) || Q(e), i = (e == null ? void 0 : e.state) === "on", n = this.switchPending ? this.t("card.pending") : i ? this.t("card.powerOn") : this.t("card.powerOff");
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
    const t = Ie(e), i = this.getEntityNumber(e), n = this.getTemperatureParts(
      i,
      this.getTemperatureUnit(this.config.target_temperature_entity)
    ), a = this.targetPending || !lt(this.config.target_temperature_entity) || Q(e) || i === void 0;
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
        ${t && i !== void 0 ? c`
                <input
                  type="range"
                  min=${t.minimum}
                  max=${t.maximum}
                  step=${t.step}
                  .value=${String(i)}
                  ?disabled=${a}
                  aria-label=${this.t("card.targetTemperature")}
                  @input=${(s) => this.handleTargetSliderInput(s, t)}
                />
              ` : c`<div class="status-line">${this.t("card.sliderUnavailable")}</div>`}
        ${this.targetPending ? c`<div class="status-line">${this.t("card.pending")}</div>` : void 0}
      </section>
    `;
  }
  renderHeatIcon() {
    return A`
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M8 20c-1.5-1.1-2.3-2.5-2.3-4.2 0-1.8.9-3.2 2.6-4.4 1.3-.9 2-2.1 2-3.4 0-1-.3-2-.9-3 2.3.9 3.8 2.7 3.8 5.1 0 1-.2 1.8-.6 2.6.9-.5 1.6-1.2 2.1-2.2 2.1 1.4 3.2 3.2 3.2 5.3 0 1.7-.8 3.1-2.3 4.2" />
        <path d="M9.5 20c-.6-.7-.9-1.5-.9-2.4 0-1.2.6-2.2 1.7-3 .9-.6 1.4-1.4 1.4-2.4 1.5 1 2.2 2.2 2.2 3.7 0 .6-.1 1.1-.4 1.6.5-.2.9-.6 1.3-1.1.7.7 1.1 1.5 1.1 2.4 0 .4-.1.8-.3 1.2" />
      </svg>
    `;
  }
  renderPowerIcon() {
    return A`
      <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
        <path d="M12 3v8" />
        <path d="M7.1 6.8a7 7 0 1 0 9.8 0" />
      </svg>
    `;
  }
  async handlePowerClick() {
    const e = S(this.hass, this.config.main_switch_entity);
    if (this.switchPending || Q(e))
      return;
    const t = (e == null ? void 0 : e.state) !== "on";
    if (t && this.config.confirm_switch_on && !window.confirm(this.t("card.confirmSwitchOn")))
      return;
    this.switchPending = !0, this.serviceError = void 0;
    const i = await fr(this.hass, this.config.main_switch_entity, t);
    this.switchPending = !1, this.serviceError = i.ok ? void 0 : i.error;
  }
  adjustTargetTemperature(e) {
    const t = S(this.hass, this.config.target_temperature_entity), i = Ie(t), n = this.getEntityNumber(t);
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
    const i = await _r(
      this.hass,
      this.config.target_temperature_entity,
      e,
      t
    );
    this.targetPending = !1, this.serviceError = i.ok ? void 0 : i.error;
  }
  scheduleHistoryRefresh() {
    if (!this.hasHistoryConsumer() || !this.hass || !Ve(this.config.control_temperature_mode)) {
      this.clearHistorySamples(), this.lastHistoryFetchKey = void 0, this.clearHistoryTimer();
      return;
    }
    const e = Ke(this.config), t = this.getHistoryMinutes(), i = `${e ?? ""}:${t}:${this.config.trend_refresh_minutes}`;
    if (!e) {
      this.clearHistorySamples(), this.lastHistoryFetchKey = void 0, this.clearHistoryTimer();
      return;
    }
    this.lastHistoryFetchKey === i && this.historyRefreshTimer !== void 0 || (this.lastHistoryFetchKey !== void 0 && this.lastHistoryFetchKey !== i && this.clearHistoryTimer(), this.historyRefreshTimer === void 0 && (this.historyRefreshTimer = window.setInterval(() => {
      this.loadHistory(e, t);
    }, this.config.trend_refresh_minutes * 6e4)), this.lastHistoryFetchKey !== i && (this.lastHistoryFetchKey = i, this.loadHistory(e, t)));
  }
  async loadHistory(e, t) {
    this.historyLoading = !0, this.historySamples = await zr(this.hass, e, t), this.historyLoading = !1;
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
  hasHistoryConsumer() {
    return this.config.show_temperature_trend || this.hasEtaHistoryConsumer();
  }
  hasEtaHistoryConsumer() {
    return this.config.show_eta || this.config.show_ready_time || this.config.show_heating_rate;
  }
  getHistoryMinutes() {
    const e = this.hasEtaHistoryConsumer() ? this.config.eta_history_minutes : 0, t = this.config.show_temperature_trend ? this.config.trend_history_minutes : 0;
    return Math.max(e, t);
  }
  getHeatingDashboardStatus(e, t, i, n) {
    return (t == null ? void 0 : t.state) === "off" || n.unavailableReason === "heater_off" ? "off" : e === "target_reached" || n.unavailableReason === "target_reached" ? "ready" : e === "above_target" ? "above_target" : e === "near_target" ? "near_target" : ze(i.rateCPerMinute) ? "cooling" : i.rateCPerMinute === void 0 || n.unavailableReason === "missing_temperature" ? "data_unavailable" : i.rateCPerMinute > 0 && i.rateCPerMinute < si ? "slowly_heating" : i.rateCPerMinute > 0 ? "heating" : "data_unavailable";
  }
  getTrendDirection(e) {
    return ze(e) ? "cooling" : e !== void 0 && e > 0 ? "heating" : "idle";
  }
  getEtaLabel(e) {
    if (this.config.show_eta)
      return e.unavailableReason === "target_reached" ? this.t("card.ready") : nr(e.etaMinutes, {
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
    const t = ar(
      e.etaMinutes,
      /* @__PURE__ */ new Date(),
      ((i = this.hass) == null ? void 0 : i.selectedLanguage) ?? ((n = this.hass) == null ? void 0 : n.language)
    );
    return t ? `${this.t("card.readyAt")} ${t}` : void 0;
  }
  getControlTemperatureUnit() {
    return this.getTemperatureUnit(Ke(this.config));
  }
  getEntityNumber(e) {
    if (!e || Q(e))
      return;
    const t = Number(e.state);
    return Number.isFinite(t) ? t : void 0;
  }
  getTemperatureUnit(e) {
    var i;
    const t = (i = S(this.hass, e)) == null ? void 0 : i.attributes.unit_of_measurement;
    return typeof t == "string" && t.trim().length > 0 ? t : pe;
  }
  getTemperatureParts(e, t, i = !1) {
    return {
      value: e === void 0 ? ee : e.toFixed(1),
      unit: e === void 0 ? "" : t,
      unavailable: e === void 0
    };
  }
  formatTemperatureDelta(e) {
    return `${e > 0 ? "+" : ""}${e.toFixed(1)} ${pe}`;
  }
  formatHeatingRate(e) {
    return e === void 0 || !Number.isFinite(e) ? ee : `${e > 0 ? "+" : ""}${e.toFixed(2)} ${pe}/min`;
  }
  formatPower(e) {
    return e === void 0 || !Number.isFinite(e) ? ee : `${e.toFixed(1)} kW`;
  }
  t(e) {
    var t, i;
    return mt(((t = this.hass) == null ? void 0 : t.selectedLanguage) ?? ((i = this.hass) == null ? void 0 : i.language), e);
  }
};
$e.styles = Vr;
let _ = $e;
N([
  w({ attribute: !1 })
], _.prototype, "hass");
N([
  C()
], _.prototype, "config");
N([
  C()
], _.prototype, "switchPending");
N([
  C()
], _.prototype, "targetPending");
N([
  C()
], _.prototype, "serviceError");
N([
  C()
], _.prototype, "historySamples");
N([
  C()
], _.prototype, "historyLoading");
ye(customElements, It, _);
const oi = qe`
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
var ui = Object.defineProperty, pt = (r, e, t, i) => {
  for (var n = void 0, a = r.length - 1, s; a >= 0; a--)
    (s = r[a]) && (n = s(e, t, n) || n);
  return n && ui(e, t, n), n;
};
const Ee = class Ee extends D {
  constructor() {
    super(...arguments), this.config = F({}), this.computeLabel = (e) => e.label, this.computeHelper = (e) => e.description;
  }
  setConfig(e) {
    this.config = F(e);
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
            options: at.map((n) => ({
              value: n,
              label: this.t(`modes.${n}`)
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
      {
        name: "heating_power_mode",
        label: this.t("editor.heatingPowerMode"),
        description: this.t("editor.heatingPowerModeDescription"),
        selector: {
          select: {
            mode: "dropdown",
            options: st.map((n) => ({
              value: n,
              label: this.t(`heatingPowerModes.${n}`)
            }))
          }
        }
      }
    ];
    this.config.heating_power_mode === "fixed" && t.push(
      this.numberField(
        "fixed_heater_power_kw",
        "editor.fixedHeaterPowerKw",
        "editor.fixedHeaterPowerKwDescription",
        0,
        50,
        0.1
      )
    ), this.config.heating_power_mode === "general_power_sensor" && t.push(
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
    ), t.push(
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
    return this.config.show_temperature_trend && i.push(
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
        titleKey: "editor.sections.heatingEta",
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
        schema: i
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
    this.config = F({
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
  numberField(e, t, i, n, a, s) {
    return {
      name: e,
      label: this.t(t),
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
    return mt(((t = this.hass) == null ? void 0 : t.selectedLanguage) ?? ((i = this.hass) == null ? void 0 : i.language), e);
  }
};
Ee.styles = oi;
let j = Ee;
pt([
  w({ attribute: !1 })
], j.prototype, "hass");
pt([
  C()
], j.prototype, "config");
ye(customElements, nt, j);
const Ze = {
  type: Lt,
  name: "Sauna Suite",
  description: "A Home Assistant dashboard card for sauna monitoring and manual controls.",
  preview: !0
};
function di(r = window) {
  r.customCards = r.customCards ?? [], r.customCards.some((t) => t.type === Ze.type) || r.customCards.push(Ze);
}
di();
export {
  Lt as CARD_PICKER_TYPE,
  It as CARD_TAG,
  it as CARD_TYPE,
  nt as EDITOR_TAG,
  Vt as TEMPERATURE_TREND_TAG
};
//# sourceMappingURL=sauna-suite.js.map
