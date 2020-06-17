window.wp = window.wp || {},
(jQuery);;
! function r(s, a, l) {
	function c(t, e) {
		if (!a[t]) {
			if (!s[t]) {
				var n = "function" == typeof require && require;
				if (!e && n) return n(t, !0);
				if (d) return d(t, !0);
				var i = new Error("Cannot find module '" + t + "'");
				throw i.code = "MODULE_NOT_FOUND", i
			}
			var o = a[t] = {
				exports: {}
			};
			s[t][0].call(o.exports, function (e) {
				return c(s[t][1][e] || e)
			}, o, o.exports, r, s, a, l)
		}
		return a[t].exports
	}
	for (var d = "function" == typeof require && require, e = 0; e < l.length; e++) c(l[e]);
	return c
}({
	1: [
		function (e, t, n) {
			"use strict";

			function g(e) {
				return (g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
					return typeof e
				} : function (e) {
					return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
				})(e)
			}
			var i;
			i = function () {
				function D() {
					R.log(2, "(COMPATIBILITY NOTICE) -> As of ScrollMagic 2.0.0 you need to use 'new ScrollMagic.Controller()' to create a new controller instance. Use 'new ScrollMagic.Scene()' to instance a scene.")
				}
				D.version = "2.0.7", window.addEventListener("mousewheel", function () {});
				var H = "data-scrollmagic-pin-spacer";
				D.Controller = function (e) {
					function t() {
						if (y && p) {
							var n = R.type.Array(p) ? p : u.slice(0);
							p = !1;
							var e = f,
								t = (f = c.scrollPos()) - e;
							0 != t && (h = 0 < t ? "FORWARD" : s), h === s && n.reverse(), n.forEach(function (e, t) {
								k(3, "updating Scene " + (t + 1) + "/" + n.length + " (" + u.length + " total)"), e.update(!0)
							}), 0 === n.length && 3 <= d.loglevel && k(3, "updating 0 Scenes (nothing added to controller)")
						}
					}

					function i() {
						n = R.rAF(t)
					}
					var n, o, r = "ScrollMagic.Controller",
						s = "REVERSE",
						a = "PAUSED",
						l = E.defaults,
						c = this,
						d = R.extend({}, l, e),
						u = [],
						p = !1,
						f = 0,
						h = a,
						v = !0,
						g = 0,
						y = !0,
						m = function () {
							0 < d.refreshInterval && (o = window.setTimeout(x, d.refreshInterval))
						},
						w = function () {
							return d.vertical ? R.get.scrollTop(d.container) : R.get.scrollLeft(d.container)
						},
						b = function () {
							return d.vertical ? R.get.height(d.container) : R.get.width(d.container)
						},
						T = this._setScrollPos = function (e) {
							d.vertical ? v ? window.scrollTo(R.get.scrollLeft(), e) : d.container.scrollTop = e : v ? window.scrollTo(e, R.get.scrollTop()) : d.container.scrollLeft = e
						},
						S = function (e) {
							k(3, "event fired causing an update:", e.type), "resize" == e.type && (g = b(), h = a), !0 !== p && (p = !0, i())
						},
						x = function () {
							if (!v && g != b()) {
								var t;
								try {
									t = new Event("resize", {
										bubbles: !1,
										cancelable: !1
									})
								} catch (e) {
									(t = document.createEvent("Event")).initEvent("resize", !1, !1)
								}
								d.container.dispatchEvent(t)
							}
							u.forEach(function (e, t) {
								e.refresh()
							}), m()
						},
						k = this._log = function (e, t) {
							d.loglevel >= e && (Array.prototype.splice.call(arguments, 1, 0, "(" + r + ") ->"), R.log.apply(window, arguments))
						};
					this._options = d;

					function C(e) {
						if (e.length <= 1) return e;
						var t = e.slice(0);
						return t.sort(function (e, t) {
							return e.scrollOffset() > t.scrollOffset() ? 1 : -1
						}), t
					}
					return this.addScene = function (e) {
							if (R.type.Array(e)) e.forEach(function (e, t) {
								c.addScene(e)
							});
							else if (e instanceof D.Scene) {
								if (e.controller() !== c) e.addTo(c);
								else if (u.indexOf(e) < 0) {
									for (var t in u.push(e), u = C(u), e.on("shift.controller_sort", function () {
										u = C(u)
									}), d.globalSceneOptions) e[t] && e[t].call(e, d.globalSceneOptions[t]);
									k(3, "adding Scene (now " + u.length + " total)")
								}
							} else k(1, "ERROR: invalid argument supplied for '.addScene()'");
							return c
						}, this.removeScene = function (e) {
							if (R.type.Array(e)) e.forEach(function (e, t) {
								c.removeScene(e)
							});
							else {
								var t = u.indexOf(e); - 1 < t && (e.off("shift.controller_sort"), u.splice(t, 1), k(3, "removing Scene (now " + u.length + " left)"), e.remove())
							}
							return c
						}, this.updateScene = function (e, n) {
							return R.type.Array(e) ? e.forEach(function (e, t) {
								c.updateScene(e, n)
							}) : n ? e.update(!0) : !0 !== p && e instanceof D.Scene && (-1 == (p = p || []).indexOf(e) && p.push(e), p = C(p), i()), c
						}, this.update = function (e) {
							return S({
								type: "resize"
							}), e && t(), c
						}, this.scrollTo = function (e, t) {
							if (R.type.Number(e)) T.call(d.container, e, t);
							else if (e instanceof D.Scene) e.controller() === c ? c.scrollTo(e.scrollOffset(), t) : k(2, "scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.", e);
							else if (R.type.Function(e)) T = e;
							else {
								var n = R.get.elements(e)[0];
								if (n) {
									for (; n.parentNode.hasAttribute(H);) n = n.parentNode;
									var i = d.vertical ? "top" : "left",
										o = R.get.offset(d.container),
										r = R.get.offset(n);
									v || (o[i] -= c.scrollPos()), c.scrollTo(r[i] - o[i], t)
								} else k(2, "scrollTo(): The supplied argument is invalid. Scroll cancelled.", e)
							}
							return c
						}, this.scrollPos = function (e) {
							return arguments.length ? (R.type.Function(e) ? w = e : k(2, "Provided value for method 'scrollPos' is not a function. To change the current scroll position use 'scrollTo()'."), c) : w.call(c)
						}, this.info = function (e) {
							var t = {
								size: g,
								vertical: d.vertical,
								scrollPos: f,
								scrollDirection: h,
								container: d.container,
								isDocument: v
							};
							return arguments.length ? void 0 !== t[e] ? t[e] : void k(1, 'ERROR: option "' + e + '" is not available') : t
						}, this.loglevel = function (e) {
							return arguments.length ? (d.loglevel != e && (d.loglevel = e), c) : d.loglevel
						}, this.enabled = function (e) {
							return arguments.length ? (y != e && (y = !!e, c.updateScene(u, !0)), c) : y
						}, this.destroy = function (e) {
							window.clearTimeout(o);
							for (var t = u.length; t--;) u[t].destroy(e);
							return d.container.removeEventListener("resize", S), d.container.removeEventListener("scroll", S), R.cAF(n), k(3, "destroyed " + r + " (reset: " + (e ? "true" : "false") + ")"), null
						},
						function () {
							for (var e in d) l.hasOwnProperty(e) || (k(2, 'WARNING: Unknown option "' + e + '"'), delete d[e]);
							if (d.container = R.get.elements(d.container)[0], !d.container) throw k(1, "ERROR creating object " + r + ": No valid scroll container supplied"), r + " init failed.";
							(v = d.container === window || d.container === document.body || !document.body.contains(d.container)) && (d.container = window), g = b(), d.container.addEventListener("resize", S), d.container.addEventListener("scroll", S);
							var t = parseInt(d.refreshInterval, 10);
							d.refreshInterval = R.type.Number(t) ? t : l.refreshInterval, m(), k(3, "added new " + r + " controller (v" + D.version + ")")
						}(), c
				};
				var E = {
					defaults: {
						container: window,
						vertical: !0,
						globalSceneOptions: {},
						loglevel: 2,
						refreshInterval: 100
					}
				};
				D.Controller.addOption = function (e, t) {
					E.defaults[e] = t
				}, D.Controller.extend = function (e) {
					var t = this;
					D.Controller = function () {
						return t.apply(this, arguments), this.$super = R.extend({}, this), e.apply(this, arguments) || this
					}, R.extend(D.Controller, t), D.Controller.prototype = t.prototype, D.Controller.prototype.constructor = D.Controller
				}, D.Scene = function (e) {
					var n, l, i = "ScrollMagic.Scene",
						c = "BEFORE",
						d = "DURING",
						u = "AFTER",
						o = M.defaults,
						p = this,
						f = R.extend({}, o, e),
						h = c,
						v = 0,
						a = {
							start: 0,
							end: 0
						},
						g = 0,
						r = !0,
						s = {};
					this.on = function (e, o) {
						return R.type.Function(o) ? (e = e.trim().split(" ")).forEach(function (e) {
							var t = e.split("."),
								n = t[0],
								i = t[1];
							"*" != n && (s[n] || (s[n] = []), s[n].push({
								namespace: i || "",
								callback: o
							}))
						}) : y(1, "ERROR when calling '.on()': Supplied callback for '" + e + "' is not a valid function!"), p
					}, this.off = function (e, r) {
						return e ? (e = e.trim().split(" ")).forEach(function (e, t) {
							var n = e.split("."),
								i = n[0],
								o = n[1] || "";
							("*" === i ? Object.keys(s) : [i]).forEach(function (e) {
								for (var t = s[e] || [], n = t.length; n--;) {
									var i = t[n];
									!i || o !== i.namespace && "*" !== o || r && r != i.callback || t.splice(n, 1)
								}
								t.length || delete s[e]
							})
						}) : y(1, "ERROR: Invalid event name supplied."), p
					}, this.trigger = function (e, n) {
						if (e) {
							var t = e.trim().split("."),
								i = t[0],
								o = t[1],
								r = s[i];
							y(3, "event fired:", i, n ? "->" : "", n || ""), r && r.forEach(function (e, t) {
								o && o !== e.namespace || e.callback.call(p, new D.Event(i, e.namespace, p, n))
							})
						} else y(1, "ERROR: Invalid event name supplied.");
						return p
					}, p.on("change.internal", function (e) {
						"loglevel" !== e.what && "tweenChanges" !== e.what && ("triggerElement" === e.what ? T() : "reverse" === e.what && p.update())
					}).on("shift.internal", function (e) {
						t(), p.update()
					});
					var y = this._log = function (e, t) {
						f.loglevel >= e && (Array.prototype.splice.call(arguments, 1, 0, "(" + i + ") ->"), R.log.apply(window, arguments))
					};
					this.addTo = function (e) {
						return e instanceof D.Controller ? l != e && (l && l.removeScene(p), l = e, k(), b(!0), T(!0), t(), l.info("container").addEventListener("resize", S), e.addScene(p), p.trigger("add", {
							controller: l
						}), y(3, "added " + i + " to controller"), p.update()) : y(1, "ERROR: supplied argument of 'addTo()' is not a valid ScrollMagic Controller"), p
					}, this.enabled = function (e) {
						return arguments.length ? (r != e && (r = !!e, p.update(!0)), p) : r
					}, this.remove = function () {
						if (l) {
							l.info("container").removeEventListener("resize", S);
							var e = l;
							l = void 0, e.removeScene(p), p.trigger("remove"), y(3, "removed " + i + " from controller")
						}
						return p
					}, this.destroy = function (e) {
						return p.trigger("destroy", {
							reset: e
						}), p.remove(), p.off("*.*"), y(3, "destroyed " + i + " (reset: " + (e ? "true" : "false") + ")"), null
					}, this.update = function (e) {
						if (l)
							if (e)
								if (l.enabled() && r) {
									var t, n = l.info("scrollPos");
									t = 0 < f.duration ? (n - a.start) / (a.end - a.start) : n >= a.start ? 1 : 0, p.trigger("update", {
										startPos: a.start,
										endPos: a.end,
										scrollPos: n
									}), p.progress(t)
								} else m && h === d && j(!0);
						else l.updateScene(p, !1);
						return p
					}, this.refresh = function () {
						return b(), T(), p
					}, this.progress = function (e) {
						if (arguments.length) {
							var t = !1,
								n = h,
								i = l ? l.info("scrollDirection") : "PAUSED",
								o = f.reverse || v <= e;
							if (0 === f.duration ? (t = v != e, h = 0 === (v = e < 1 && o ? 0 : 1) ? c : d) : e < 0 && h !== c && o ? (h = c, t = !(v = 0)) : 0 <= e && e < 1 && o ? (v = e, h = d, t = !0) : 1 <= e && h !== u ? (v = 1, h = u, t = !0) : h !== d || o || j(), t) {
								var r = {
										progress: v,
										state: h,
										scrollDirection: i
									},
									s = h != n,
									a = function (e) {
										p.trigger(e, r)
									};
								s && n !== d && (a("enter"), a(n === c ? "start" : "end")), a("progress"), s && h !== d && (a(h === c ? "start" : "end"), a("leave"))
							}
							return p
						}
						return v
					};
					var m, w, t = function () {
							a = {
								start: g + f.offset
							}, l && f.triggerElement && (a.start -= l.info("size") * f.triggerHook), a.end = a.start + f.duration
						},
						b = function (e) {
							if (n) {
								var t = "duration";
								C(t, n.call(p)) && !e && (p.trigger("change", {
									what: t,
									newval: f[t]
								}), p.trigger("shift", {
									reason: t
								}))
							}
						},
						T = function (e) {
							var t = 0,
								n = f.triggerElement;
							if (l && (n || 0 < g)) {
								if (n)
									if (n.parentNode) {
										for (var i = l.info(), o = R.get.offset(i.container), r = i.vertical ? "top" : "left"; n.parentNode.hasAttribute(H);) n = n.parentNode;
										var s = R.get.offset(n);
										i.isDocument || (o[r] -= l.scrollPos()), t = s[r] - o[r]
									} else y(2, "WARNING: triggerElement was removed from DOM and will be reset to", void 0), p.triggerElement(void 0);
								var a = t != g;
								g = t, a && !e && p.trigger("shift", {
									reason: "triggerElementPosition"
								})
							}
						},
						S = function (e) {
							0 < f.triggerHook && p.trigger("shift", {
								reason: "containerResize"
							})
						},
						x = R.extend(M.validate, {
							duration: function (t) {
								if (R.type.String(t) && t.match(/^(\.|\d)*\d+%$/)) {
									var e = parseFloat(t) / 100;
									t = function () {
										return l ? l.info("size") * e : 0
									}
								}
								if (R.type.Function(t)) {
									n = t;
									try {
										t = parseFloat(n.call(p))
									} catch (e) {
										t = -1
									}
								}
								if (t = parseFloat(t), !R.type.Number(t) || t < 0) throw n ? (n = void 0, ['Invalid return value of supplied function for option "duration":', t]) : ['Invalid value for option "duration":', t];
								return t
							}
						}),
						k = function (e) {
							(e = arguments.length ? [e] : Object.keys(x)).forEach(function (t, e) {
								var n;
								if (x[t]) try {
									n = x[t](f[t])
								} catch (e) {
									n = o[t];
									var i = R.type.String(e) ? [e] : e;
									R.type.Array(i) ? (i[0] = "ERROR: " + i[0], i.unshift(1), y.apply(this, i)) : y(1, "ERROR: Problem executing validation callback for option '" + t + "':", e.message)
								} finally {
									f[t] = n
								}
							})
						},
						C = function (e, t) {
							var n = !1,
								i = f[e];
							return f[e] != t && (f[e] = t, k(e), n = i != f[e]), n
						},
						E = function (t) {
							p[t] || (p[t] = function (e) {
								return arguments.length ? ("duration" === t && (n = void 0), C(t, e) && (p.trigger("change", {
									what: t,
									newval: f[t]
								}), -1 < M.shifts.indexOf(t) && p.trigger("shift", {
									reason: t
								})), p) : f[t]
							})
						};
					this.controller = function () {
						return l
					}, this.state = function () {
						return h
					}, this.scrollOffset = function () {
						return a.start
					}, this.triggerPosition = function () {
						var e = f.offset;
						return l && (f.triggerElement ? e += g : e += l.info("size") * p.triggerHook()), e
					}, p.on("shift.internal", function (e) {
						var t = "duration" === e.reason;
						(h === u && t || h === d && 0 === f.duration) && j(), t && P()
					}).on("progress.internal", function (e) {
						j()
					}).on("add.internal", function (e) {
						P()
					}).on("destroy.internal", function (e) {
						p.removePin(e.reset)
					});

					function $() {
						l && m && h === d && !l.info("isDocument") && j()
					}

					function A() {
						l && m && h === d && ((w.relSize.width || w.relSize.autoFullWidth) && R.get.width(window) != R.get.width(w.spacer.parentNode) || w.relSize.height && R.get.height(window) != R.get.height(w.spacer.parentNode)) && P()
					}

					function O(e) {
						l && m && h === d && !l.info("isDocument") && (e.preventDefault(), l._setScrollPos(l.info("scrollPos") - ((e.wheelDelta || e[l.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || 30 * -e.detail)))
					}
					var j = function (e) {
							if (m && l) {
								var t = l.info(),
									n = w.spacer.firstChild;
								if (e || h !== d) {
									var i = {
											position: w.inFlow ? "relative" : "absolute",
											top: 0,
											left: 0
										},
										o = R.css(n, "position") != i.position;
									w.pushFollowers ? 0 < f.duration && (h === u && 0 === parseFloat(R.css(w.spacer, "padding-top")) ? o = !0 : h === c && 0 === parseFloat(R.css(w.spacer, "padding-bottom")) && (o = !0)) : i[t.vertical ? "top" : "left"] = f.duration * v, R.css(n, i), o && P()
								} else {
									"fixed" != R.css(n, "position") && (R.css(n, {
										position: "fixed"
									}), P());
									var r = R.get.offset(w.spacer, !0),
										s = f.reverse || 0 === f.duration ? t.scrollPos - a.start : Math.round(v * f.duration * 10) / 10;
									r[t.vertical ? "top" : "left"] += s, R.css(w.spacer.firstChild, {
										top: r.top,
										left: r.left
									})
								}
							}
						},
						P = function () {
							if (m && l && w.inFlow) {
								var e = h === d,
									t = l.info("vertical"),
									n = w.spacer.firstChild,
									i = R.isMarginCollapseType(R.css(w.spacer, "display")),
									o = {};
								w.relSize.width || w.relSize.autoFullWidth ? e ? R.css(m, {
									width: R.get.width(w.spacer)
								}) : R.css(m, {
									width: "100%"
								}) : (o["min-width"] = R.get.width(t ? m : n, !0, !0), o.width = e ? o["min-width"] : "auto"), w.relSize.height ? e ? R.css(m, {
									height: R.get.height(w.spacer) - (w.pushFollowers ? f.duration : 0)
								}) : R.css(m, {
									height: "100%"
								}) : (o["min-height"] = R.get.height(t ? n : m, !0, !i), o.height = e ? o["min-height"] : "auto"), w.pushFollowers && (o["padding" + (t ? "Top" : "Left")] = f.duration * v, o["padding" + (t ? "Bottom" : "Right")] = f.duration * (1 - v)), R.css(w.spacer, o)
							}
						};
					this.setPin = function (e, t) {
						var n = t && t.hasOwnProperty("pushFollowers");
						if (t = R.extend({}, {
							pushFollowers: !0,
							spacerClass: "scrollmagic-pin-spacer"
						}, t), !(e = R.get.elements(e)[0])) return y(1, "ERROR calling method 'setPin()': Invalid pin element supplied."), p;
						if ("fixed" === R.css(e, "position")) return y(1, "ERROR calling method 'setPin()': Pin does not work with elements that are positioned 'fixed'."), p;
						if (m) {
							if (m === e) return p;
							p.removePin()
						}
						var i = (m = e).parentNode.style.display,
							o = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
						m.parentNode.style.display = "none";
						var r = "absolute" != R.css(m, "position"),
							s = R.css(m, o.concat(["display"])),
							a = R.css(m, ["width", "height"]);
						m.parentNode.style.display = i, !r && t.pushFollowers && (y(2, "WARNING: If the pinned element is positioned absolutely pushFollowers will be disabled."), t.pushFollowers = !1), window.setTimeout(function () {
							m && 0 === f.duration && n && t.pushFollowers && y(2, "WARNING: pushFollowers =", !0, "has no effect, when scene duration is 0.")
						}, 0);
						var l = m.parentNode.insertBefore(document.createElement("div"), m),
							c = R.extend(s, {
								position: r ? "relative" : "absolute",
								boxSizing: "content-box",
								mozBoxSizing: "content-box",
								webkitBoxSizing: "content-box"
							});
						if (r || R.extend(c, R.css(m, ["width", "height"])), R.css(l, c), l.setAttribute(H, ""), R.addClass(l, t.spacerClass), w = {
							spacer: l,
							relSize: {
								width: "%" === a.width.slice(-1),
								height: "%" === a.height.slice(-1),
								autoFullWidth: "auto" === a.width && r && R.isMarginCollapseType(s.display)
							},
							pushFollowers: t.pushFollowers,
							inFlow: r
						}, !m.___origStyle) {
							m.___origStyle = {};
							var d = m.style;
							o.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]).forEach(function (e) {
								m.___origStyle[e] = d[e] || ""
							})
						}
						return w.relSize.width && R.css(l, {
							width: a.width
						}), w.relSize.height && R.css(l, {
							height: a.height
						}), l.appendChild(m), R.css(m, {
							position: r ? "relative" : "absolute",
							margin: "auto",
							top: "auto",
							left: "auto",
							bottom: "auto",
							right: "auto"
						}), (w.relSize.width || w.relSize.autoFullWidth) && R.css(m, {
							boxSizing: "border-box",
							mozBoxSizing: "border-box",
							webkitBoxSizing: "border-box"
						}), window.addEventListener("scroll", $), window.addEventListener("resize", $), window.addEventListener("resize", A), m.addEventListener("mousewheel", O), m.addEventListener("DOMMouseScroll", O), y(3, "added pin"), j(), p
					}, this.removePin = function (e) {
						if (m) {
							if (h === d && j(!0), e || !l) {
								var t = w.spacer.firstChild;
								if (t.hasAttribute(H)) {
									var n = w.spacer.style,
										i = {};
									["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"].forEach(function (e) {
										i[e] = n[e] || ""
									}), R.css(t, i)
								}
								w.spacer.parentNode.insertBefore(t, w.spacer), w.spacer.parentNode.removeChild(w.spacer), m.parentNode.hasAttribute(H) || (R.css(m, m.___origStyle), delete m.___origStyle)
							}
							window.removeEventListener("scroll", $), window.removeEventListener("resize", $), window.removeEventListener("resize", A), m.removeEventListener("mousewheel", O), m.removeEventListener("DOMMouseScroll", O), m = void 0, y(3, "removed pin (reset: " + (e ? "true" : "false") + ")")
						}
						return p
					};
					var N, L = [];
					return p.on("destroy.internal", function (e) {
							p.removeClassToggle(e.reset)
						}), this.setClassToggle = function (e, t) {
							var n = R.get.elements(e);
							return 0 !== n.length && R.type.String(t) ? (0 < L.length && p.removeClassToggle(), N = t, L = n, p.on("enter.internal_class leave.internal_class", function (e) {
								var n = "enter" === e.type ? R.addClass : R.removeClass;
								L.forEach(function (e, t) {
									n(e, N)
								})
							})) : y(1, "ERROR calling method 'setClassToggle()': Invalid " + (0 === n.length ? "element" : "classes") + " supplied."), p
						}, this.removeClassToggle = function (e) {
							return e && L.forEach(function (e, t) {
								R.removeClass(e, N)
							}), p.off("start.internal_class end.internal_class"), N = void 0, L = [], p
						},
						function () {
							for (var e in f) o.hasOwnProperty(e) || (y(2, 'WARNING: Unknown option "' + e + '"'), delete f[e]);
							for (var t in o) E(t);
							k()
						}(), p
				};
				var M = {
					defaults: {
						duration: 0,
						offset: 0,
						triggerElement: void 0,
						triggerHook: .5,
						reverse: !0,
						loglevel: 2
					},
					validate: {
						offset: function (e) {
							if (e = parseFloat(e), !R.type.Number(e)) throw ['Invalid value for option "offset":', e];
							return e
						},
						triggerElement: function (e) {
							if (e = e || void 0) {
								var t = R.get.elements(e)[0];
								if (!t || !t.parentNode) throw ['Element defined in option "triggerElement" was not found:', e];
								e = t
							}
							return e
						},
						triggerHook: function (e) {
							var t = {
								onCenter: .5,
								onEnter: 1,
								onLeave: 0
							};
							if (R.type.Number(e)) e = Math.max(0, Math.min(parseFloat(e), 1));
							else {
								if (!(e in t)) throw ['Invalid value for option "triggerHook": ', e];
								e = t[e]
							}
							return e
						},
						reverse: function (e) {
							return !!e
						},
						loglevel: function (e) {
							if (e = parseInt(e), !R.type.Number(e) || e < 0 || 3 < e) throw ['Invalid value for option "loglevel":', e];
							return e
						}
					},
					shifts: ["duration", "offset", "triggerHook"]
				};
				D.Scene.addOption = function (e, t, n, i) {
					e in M.defaults ? D._util.log(1, "[static] ScrollMagic.Scene -> Cannot add Scene option '" + e + "', because it already exists.") : (M.defaults[e] = t, M.validate[e] = n, i && M.shifts.push(e))
				}, D.Scene.extend = function (e) {
					var t = this;
					D.Scene = function () {
						return t.apply(this, arguments), this.$super = R.extend({}, this), e.apply(this, arguments) || this
					}, R.extend(D.Scene, t), D.Scene.prototype = t.prototype, D.Scene.prototype.constructor = D.Scene
				}, D.Event = function (e, t, n, i) {
					for (var o in i = i || {}) this[o] = i[o];
					return this.type = e, this.target = this.currentTarget = n, this.namespace = t || "", this.timeStamp = this.timestamp = Date.now(), this
				};
				var R = D._util = function (s) {
					function a(e) {
						return parseFloat(e) || 0
					}

					function l(e) {
						return e.currentStyle ? e.currentStyle : s.getComputedStyle(e)
					}

					function i(e, t, n, i) {
						if ((t = t === document ? s : t) === s) i = !1;
						else if (!h.DomElement(t)) return 0;
						e = e.charAt(0).toUpperCase() + e.substr(1).toLowerCase();
						var o = (n ? t["offset" + e] || t["outer" + e] : t["client" + e] || t["inner" + e]) || 0;
						if (n && i) {
							var r = l(t);
							o += "Height" === e ? a(r.marginTop) + a(r.marginBottom) : a(r.marginLeft) + a(r.marginRight)
						}
						return o
					}

					function c(e) {
						return e.replace(/^[^a-z]+([a-z])/g, "$1").replace(/-([a-z])/g, function (e) {
							return e[1].toUpperCase()
						})
					}
					var n, e = {};
					e.extend = function (e) {
						for (e = e || {}, n = 1; n < arguments.length; n++)
							if (arguments[n])
								for (var t in arguments[n]) arguments[n].hasOwnProperty(t) && (e[t] = arguments[n][t]);
						return e
					}, e.isMarginCollapseType = function (e) {
						return -1 < ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(e)
					};
					var o = 0,
						t = ["ms", "moz", "webkit", "o"],
						r = s.requestAnimationFrame,
						d = s.cancelAnimationFrame;
					for (n = 0; !r && n < t.length; ++n) r = s[t[n] + "RequestAnimationFrame"], d = s[t[n] + "CancelAnimationFrame"] || s[t[n] + "CancelRequestAnimationFrame"];
					r = r || function (e) {
						var t = (new Date).getTime(),
							n = Math.max(0, 16 - (t - o)),
							i = s.setTimeout(function () {
								e(t + n)
							}, n);
						return o = t + n, i
					}, d = d || function (e) {
						s.clearTimeout(e)
					}, e.rAF = r.bind(s), e.cAF = d.bind(s);
					var u = ["error", "warn", "log"],
						p = s.console || {};
					for (p.log = p.log || function () {}, n = 0; n < u.length; n++) {
						var f = u[n];
						p[f] || (p[f] = p.log)
					}
					e.log = function (e) {
						(u.length < e || e <= 0) && (e = u.length);
						var t = new Date,
							n = ("0" + t.getHours()).slice(-2) + ":" + ("0" + t.getMinutes()).slice(-2) + ":" + ("0" + t.getSeconds()).slice(-2) + ":" + ("00" + t.getMilliseconds()).slice(-3),
							i = u[e - 1],
							o = Array.prototype.splice.call(arguments, 1),
							r = Function.prototype.bind.call(p[i], p);
						o.unshift(n), r.apply(p, o)
					};
					var h = e.type = function (e) {
						return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/, "$1").toLowerCase()
					};
					h.String = function (e) {
						return "string" === h(e)
					}, h.Function = function (e) {
						return "function" === h(e)
					}, h.Array = function (e) {
						return Array.isArray(e)
					}, h.Number = function (e) {
						return !h.Array(e) && 0 <= e - parseFloat(e) + 1
					}, h.DomElement = function (e) {
						return "object" === ("undefined" == typeof HTMLElement ? "undefined" : g(HTMLElement)) || "function" == typeof HTMLElement ? e instanceof HTMLElement || e instanceof SVGElement : e && "object" === g(e) && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName
					};
					var v = e.get = {};
					return v.elements = function (e) {
						var t = [];
						if (h.String(e)) try {
							e = document.querySelectorAll(e)
						} catch (e) {
							return t
						}
						if ("nodelist" === h(e) || h.Array(e) || e instanceof NodeList)
							for (var n = 0, i = t.length = e.length; n < i; n++) {
								var o = e[n];
								t[n] = h.DomElement(o) ? o : v.elements(o)
							} else !h.DomElement(e) && e !== document && e !== s || (t = [e]);
						return t
					}, v.scrollTop = function (e) {
						return e && "number" == typeof e.scrollTop ? e.scrollTop : s.pageYOffset || 0
					}, v.scrollLeft = function (e) {
						return e && "number" == typeof e.scrollLeft ? e.scrollLeft : s.pageXOffset || 0
					}, v.width = function (e, t, n) {
						return i("width", e, t, n)
					}, v.height = function (e, t, n) {
						return i("height", e, t, n)
					}, v.offset = function (e, t) {
						var n = {
							top: 0,
							left: 0
						};
						if (e && e.getBoundingClientRect) {
							var i = e.getBoundingClientRect();
							n.top = i.top, n.left = i.left, t || (n.top += v.scrollTop(), n.left += v.scrollLeft())
						}
						return n
					}, e.addClass = function (e, t) {
						t && (e.classList ? e.classList.add(t) : e.className += " " + t)
					}, e.removeClass = function (e, t) {
						t && (e.classList ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " "))
					}, e.css = function (e, t) {
						if (h.String(t)) return l(e)[c(t)];
						if (h.Array(t)) {
							var n = {},
								i = l(e);
							return t.forEach(function (e, t) {
								n[e] = i[c(e)]
							}), n
						}
						for (var o in t) {
							var r = t[o];
							r == parseFloat(r) && (r += "px"), e.style[c(o)] = r
						}
					}, e
				}(window || {});
				return D.Scene.prototype.addIndicators = function () {
					return D._util.log(1, "(ScrollMagic.Scene) -> ERROR calling addIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js"), this
				}, D.Scene.prototype.removeIndicators = function () {
					return D._util.log(1, "(ScrollMagic.Scene) -> ERROR calling removeIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js"), this
				}, D.Scene.prototype.setTween = function () {
					return D._util.log(1, "(ScrollMagic.Scene) -> ERROR calling setTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js"), this
				}, D.Scene.prototype.removeTween = function () {
					return D._util.log(1, "(ScrollMagic.Scene) -> ERROR calling removeTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js"), this
				}, D.Scene.prototype.setVelocity = function () {
					return D._util.log(1, "(ScrollMagic.Scene) -> ERROR calling setVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js"), this
				}, D.Scene.prototype.removeVelocity = function () {
					return D._util.log(1, "(ScrollMagic.Scene) -> ERROR calling removeVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js"), this
				}, D
			}, "function" == typeof define && define.amd ? define(i) : "object" === (void 0 === n ? "undefined" : g(n)) ? t.exports = i() : (void 0).ScrollMagic = i()
		}, {}
	],
	2: [
		function (e, t, n) {
			"use strict";

			function an(e) {
				return (an = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
					return typeof e
				} : function (e) {
					return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
				})(e)
			}
			var i, o;
			i = "undefined" != typeof window ? window : void 0, o = function (x, e) {
				function v(e) {
					return null != e && e === e.window
				}
				var t = [],
					k = x.document,
					i = Object.getPrototypeOf,
					a = t.slice,
					g = t.concat,
					l = t.push,
					o = t.indexOf,
					n = {},
					r = n.toString,
					y = n.hasOwnProperty,
					s = y.toString,
					c = s.call(Object),
					m = {},
					w = function (e) {
						return "function" == typeof e && "number" != typeof e.nodeType
					},
					d = {
						type: !0,
						src: !0,
						nonce: !0,
						noModule: !0
					};

				function b(e, t, n) {
					var i, o, r = (n = n || k).createElement("script");
					if (r.text = e, t)
						for (i in d)(o = t[i] || t.getAttribute && t.getAttribute(i)) && r.setAttribute(i, o);
					n.head.appendChild(r).parentNode.removeChild(r)
				}

				function T(e) {
					return null == e ? e + "" : "object" === an(e) || "function" == typeof e ? n[r.call(e)] || "object" : an(e)
				}
				var C = function e(t, n) {
						return new e.fn.init(t, n)
					},
					u = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

				function p(e) {
					var t = !!e && "length" in e && e.length,
						n = T(e);
					return !w(e) && !v(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
				}
				C.fn = C.prototype = {
					jquery: "3.4.1",
					constructor: C,
					length: 0,
					toArray: function () {
						return a.call(this)
					},
					get: function (e) {
						return null == e ? a.call(this) : e < 0 ? this[e + this.length] : this[e]
					},
					pushStack: function (e) {
						var t = C.merge(this.constructor(), e);
						return t.prevObject = this, t
					},
					each: function (e) {
						return C.each(this, e)
					},
					map: function (n) {
						return this.pushStack(C.map(this, function (e, t) {
							return n.call(e, t, e)
						}))
					},
					slice: function () {
						return this.pushStack(a.apply(this, arguments))
					},
					first: function () {
						return this.eq(0)
					},
					last: function () {
						return this.eq(-1)
					},
					eq: function (e) {
						var t = this.length,
							n = +e + (e < 0 ? t : 0);
						return this.pushStack(0 <= n && n < t ? [this[n]] : [])
					},
					end: function () {
						return this.prevObject || this.constructor()
					},
					push: l,
					sort: t.sort,
					splice: t.splice
				}, C.extend = C.fn.extend = function () {
					var e, t, n, i, o, r, s = arguments[0] || {},
						a = 1,
						l = arguments.length,
						c = !1;
					for ("boolean" == typeof s && (c = s, s = arguments[a] || {}, a++), "object" === an(s) || w(s) || (s = {}), a === l && (s = this, a--); a < l; a++)
						if (null != (e = arguments[a]))
							for (t in e) i = e[t], "__proto__" !== t && s !== i && (c && i && (C.isPlainObject(i) || (o = Array.isArray(i))) ? (n = s[t], r = o && !Array.isArray(n) ? [] : o || C.isPlainObject(n) ? n : {}, o = !1, s[t] = C.extend(c, r, i)) : void 0 !== i && (s[t] = i));
					return s
				}, C.extend({
					expando: "jQuery" + ("3.4.1" + Math.random()).replace(/\D/g, ""),
					isReady: !0,
					error: function (e) {
						throw new Error(e)
					},
					noop: function () {},
					isPlainObject: function (e) {
						var t, n;
						return !(!e || "[object Object]" !== r.call(e)) && (!(t = i(e)) || "function" == typeof (n = y.call(t, "constructor") && t.constructor) && s.call(n) === c)
					},
					isEmptyObject: function (e) {
						var t;
						for (t in e) return !1;
						return !0
					},
					globalEval: function (e, t) {
						b(e, {
							nonce: t && t.nonce
						})
					},
					each: function (e, t) {
						var n, i = 0;
						if (p(e))
							for (n = e.length; i < n && !1 !== t.call(e[i], i, e[i]); i++);
						else
							for (i in e)
								if (!1 === t.call(e[i], i, e[i])) break; return e
					},
					trim: function (e) {
						return null == e ? "" : (e + "").replace(u, "")
					},
					makeArray: function (e, t) {
						var n = t || [];
						return null != e && (p(Object(e)) ? C.merge(n, "string" == typeof e ? [e] : e) : l.call(n, e)), n
					},
					inArray: function (e, t, n) {
						return null == t ? -1 : o.call(t, e, n)
					},
					merge: function (e, t) {
						for (var n = +t.length, i = 0, o = e.length; i < n; i++) e[o++] = t[i];
						return e.length = o, e
					},
					grep: function (e, t, n) {
						for (var i = [], o = 0, r = e.length, s = !n; o < r; o++)!t(e[o], o) != s && i.push(e[o]);
						return i
					},
					map: function (e, t, n) {
						var i, o, r = 0,
							s = [];
						if (p(e))
							for (i = e.length; r < i; r++) null != (o = t(e[r], r, n)) && s.push(o);
						else
							for (r in e) null != (o = t(e[r], r, n)) && s.push(o);
						return g.apply([], s)
					},
					guid: 1,
					support: m
				}), "function" == typeof Symbol && (C.fn[Symbol.iterator] = t[Symbol.iterator]), C.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
					n["[object " + t + "]"] = t.toLowerCase()
				});
				var f = function (n) {
					function u(e, t, n) {
						var i = "0x" + t - 65536;
						return i != i || n ? t : i < 0 ? String.fromCharCode(65536 + i) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
					}

					function o() {
						S()
					}
					var e, f, b, r, s, h, p, v, T, l, c, S, x, a, k, g, d, y, m, C = "sizzle" + 1 * new Date,
						w = n.document,
						E = 0,
						i = 0,
						$ = le(),
						A = le(),
						O = le(),
						j = le(),
						P = function (e, t) {
							return e === t && (c = !0), 0
						},
						N = {}.hasOwnProperty,
						t = [],
						L = t.pop,
						D = t.push,
						H = t.push,
						M = t.slice,
						R = function (e, t) {
							for (var n = 0, i = e.length; n < i; n++)
								if (e[n] === t) return n;
							return -1
						},
						I = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
						q = "[\\x20\\t\\r\\n\\f]",
						z = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
						_ = "\\[" + q + "*(" + z + ")(?:" + q + "*([*^$|!~]?=)" + q + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + z + "))|)" + q + "*\\]",
						W = ":(" + z + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + _ + ")*)|.*)\\)|)",
						F = new RegExp(q + "+", "g"),
						B = new RegExp("^" + q + "+|((?:^|[^\\\\])(?:\\\\.)*)" + q + "+$", "g"),
						U = new RegExp("^" + q + "*," + q + "*"),
						Y = new RegExp("^" + q + "*([>+~]|" + q + ")" + q + "*"),
						X = new RegExp(q + "|>"),
						V = new RegExp(W),
						Q = new RegExp("^" + z + "$"),
						G = {
							ID: new RegExp("^#(" + z + ")"),
							CLASS: new RegExp("^\\.(" + z + ")"),
							TAG: new RegExp("^(" + z + "|[*])"),
							ATTR: new RegExp("^" + _),
							PSEUDO: new RegExp("^" + W),
							CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + q + "*(even|odd|(([+-]|)(\\d*)n|)" + q + "*(?:([+-]|)" + q + "*(\\d+)|))" + q + "*\\)|)", "i"),
							bool: new RegExp("^(?:" + I + ")$", "i"),
							needsContext: new RegExp("^" + q + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + q + "*((?:-\\d)?\\d*)" + q + "*\\)|)(?=[^-]|$)", "i")
						},
						J = /HTML$/i,
						K = /^(?:input|select|textarea|button)$/i,
						Z = /^h\d$/i,
						ee = /^[^{]+\{\s*\[native \w/,
						te = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
						ne = /[+~]/,
						ie = new RegExp("\\\\([\\da-f]{1,6}" + q + "?|(" + q + ")|.)", "ig"),
						oe = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
						re = function (e, t) {
							return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
						},
						se = be(function (e) {
							return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
						}, {
							dir: "parentNode",
							next: "legend"
						});
					try {
						H.apply(t = M.call(w.childNodes), w.childNodes), t[w.childNodes.length].nodeType
					} catch (e) {
						H = {
							apply: t.length ? function (e, t) {
								D.apply(e, M.call(t))
							} : function (e, t) {
								for (var n = e.length, i = 0; e[n++] = t[i++];);
								e.length = n - 1
							}
						}
					}

					function ae(t, e, n, i) {
						var o, r, s, a, l, c, d, u = e && e.ownerDocument,
							p = e ? e.nodeType : 9;
						if (n = n || [], "string" != typeof t || !t || 1 !== p && 9 !== p && 11 !== p) return n;
						if (!i && ((e ? e.ownerDocument || e : w) !== x && S(e), e = e || x, k)) {
							if (11 !== p && (l = te.exec(t)))
								if (o = l[1]) {
									if (9 === p) {
										if (!(s = e.getElementById(o))) return n;
										if (s.id === o) return n.push(s), n
									} else if (u && (s = u.getElementById(o)) && m(e, s) && s.id === o) return n.push(s), n
								} else {
									if (l[2]) return H.apply(n, e.getElementsByTagName(t)), n;
									if ((o = l[3]) && f.getElementsByClassName && e.getElementsByClassName) return H.apply(n, e.getElementsByClassName(o)), n
								}
							if (f.qsa && !j[t + " "] && (!g || !g.test(t)) && (1 !== p || "object" !== e.nodeName.toLowerCase())) {
								if (d = t, u = e, 1 === p && X.test(t)) {
									for ((a = e.getAttribute("id")) ? a = a.replace(oe, re) : e.setAttribute("id", a = C), r = (c = h(t)).length; r--;) c[r] = "#" + a + " " + we(c[r]);
									d = c.join(","), u = ne.test(t) && ye(e.parentNode) || e
								}
								try {
									return H.apply(n, u.querySelectorAll(d)), n
								} catch (e) {
									j(t, !0)
								} finally {
									a === C && e.removeAttribute("id")
								}
							}
						}
						return v(t.replace(B, "$1"), e, n, i)
					}

					function le() {
						var i = [];
						return function e(t, n) {
							return i.push(t + " ") > b.cacheLength && delete e[i.shift()], e[t + " "] = n
						}
					}

					function ce(e) {
						return e[C] = !0, e
					}

					function de(e) {
						var t = x.createElement("fieldset");
						try {
							return !!e(t)
						} catch (e) {
							return !1
						} finally {
							t.parentNode && t.parentNode.removeChild(t), t = null
						}
					}

					function ue(e, t) {
						for (var n = e.split("|"), i = n.length; i--;) b.attrHandle[n[i]] = t
					}

					function pe(e, t) {
						var n = t && e,
							i = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
						if (i) return i;
						if (n)
							for (; n = n.nextSibling;)
								if (n === t) return -1;
						return e ? 1 : -1
					}

					function fe(t) {
						return function (e) {
							return "input" === e.nodeName.toLowerCase() && e.type === t
						}
					}

					function he(n) {
						return function (e) {
							var t = e.nodeName.toLowerCase();
							return ("input" === t || "button" === t) && e.type === n
						}
					}

					function ve(t) {
						return function (e) {
							return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && se(e) === t : e.disabled === t : "label" in e && e.disabled === t
						}
					}

					function ge(s) {
						return ce(function (r) {
							return r = +r, ce(function (e, t) {
								for (var n, i = s([], e.length, r), o = i.length; o--;) e[n = i[o]] && (e[n] = !(t[n] = e[n]))
							})
						})
					}

					function ye(e) {
						return e && void 0 !== e.getElementsByTagName && e
					}
					for (e in f = ae.support = {}, s = ae.isXML = function (e) {
						var t = e.namespaceURI,
							n = (e.ownerDocument || e).documentElement;
						return !J.test(t || n && n.nodeName || "HTML")
					}, S = ae.setDocument = function (e) {
						var t, n, i = e ? e.ownerDocument || e : w;
						return i !== x && 9 === i.nodeType && i.documentElement && (a = (x = i).documentElement, k = !s(x), w !== x && (n = x.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", o, !1) : n.attachEvent && n.attachEvent("onunload", o)), f.attributes = de(function (e) {
							return e.className = "i", !e.getAttribute("className")
						}), f.getElementsByTagName = de(function (e) {
							return e.appendChild(x.createComment("")), !e.getElementsByTagName("*").length
						}), f.getElementsByClassName = ee.test(x.getElementsByClassName), f.getById = de(function (e) {
							return a.appendChild(e).id = C, !x.getElementsByName || !x.getElementsByName(C).length
						}), f.getById ? (b.filter.ID = function (e) {
							var t = e.replace(ie, u);
							return function (e) {
								return e.getAttribute("id") === t
							}
						}, b.find.ID = function (e, t) {
							if (void 0 !== t.getElementById && k) {
								var n = t.getElementById(e);
								return n ? [n] : []
							}
						}) : (b.filter.ID = function (e) {
							var n = e.replace(ie, u);
							return function (e) {
								var t = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
								return t && t.value === n
							}
						}, b.find.ID = function (e, t) {
							if (void 0 !== t.getElementById && k) {
								var n, i, o, r = t.getElementById(e);
								if (r) {
									if ((n = r.getAttributeNode("id")) && n.value === e) return [r];
									for (o = t.getElementsByName(e), i = 0; r = o[i++];)
										if ((n = r.getAttributeNode("id")) && n.value === e) return [r]
								}
								return []
							}
						}), b.find.TAG = f.getElementsByTagName ? function (e, t) {
							return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : f.qsa ? t.querySelectorAll(e) : void 0
						} : function (e, t) {
							var n, i = [],
								o = 0,
								r = t.getElementsByTagName(e);
							if ("*" !== e) return r;
							for (; n = r[o++];) 1 === n.nodeType && i.push(n);
							return i
						}, b.find.CLASS = f.getElementsByClassName && function (e, t) {
							if (void 0 !== t.getElementsByClassName && k) return t.getElementsByClassName(e)
						}, d = [], g = [], (f.qsa = ee.test(x.querySelectorAll)) && (de(function (e) {
							a.appendChild(e).innerHTML = "<a id='" + C + "'></a><select id='" + C + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && g.push("[*^$]=" + q + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || g.push("\\[" + q + "*(?:value|" + I + ")"), e.querySelectorAll("[id~=" + C + "-]").length || g.push("~="), e.querySelectorAll(":checked").length || g.push(":checked"), e.querySelectorAll("a#" + C + "+*").length || g.push(".#.+[+~]")
						}), de(function (e) {
							e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
							var t = x.createElement("input");
							t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && g.push("name" + q + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && g.push(":enabled", ":disabled"), a.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && g.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), g.push(",.*:")
						})), (f.matchesSelector = ee.test(y = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && de(function (e) {
							f.disconnectedMatch = y.call(e, "*"), y.call(e, "[s!='']:x"), d.push("!=", W)
						}), g = g.length && new RegExp(g.join("|")), d = d.length && new RegExp(d.join("|")), t = ee.test(a.compareDocumentPosition), m = t || ee.test(a.contains) ? function (e, t) {
							var n = 9 === e.nodeType ? e.documentElement : e,
								i = t && t.parentNode;
							return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
						} : function (e, t) {
							if (t)
								for (; t = t.parentNode;)
									if (t === e) return !0;
							return !1
						}, P = t ? function (e, t) {
							if (e === t) return c = !0, 0;
							var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
							return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !f.sortDetached && t.compareDocumentPosition(e) === n ? e === x || e.ownerDocument === w && m(w, e) ? -1 : t === x || t.ownerDocument === w && m(w, t) ? 1 : l ? R(l, e) - R(l, t) : 0 : 4 & n ? -1 : 1)
						} : function (e, t) {
							if (e === t) return c = !0, 0;
							var n, i = 0,
								o = e.parentNode,
								r = t.parentNode,
								s = [e],
								a = [t];
							if (!o || !r) return e === x ? -1 : t === x ? 1 : o ? -1 : r ? 1 : l ? R(l, e) - R(l, t) : 0;
							if (o === r) return pe(e, t);
							for (n = e; n = n.parentNode;) s.unshift(n);
							for (n = t; n = n.parentNode;) a.unshift(n);
							for (; s[i] === a[i];) i++;
							return i ? pe(s[i], a[i]) : s[i] === w ? -1 : a[i] === w ? 1 : 0
						}), x
					}, ae.matches = function (e, t) {
						return ae(e, null, null, t)
					}, ae.matchesSelector = function (e, t) {
						if ((e.ownerDocument || e) !== x && S(e), f.matchesSelector && k && !j[t + " "] && (!d || !d.test(t)) && (!g || !g.test(t))) try {
							var n = y.call(e, t);
							if (n || f.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
						} catch (e) {
							j(t, !0)
						}
						return 0 < ae(t, x, null, [e]).length
					}, ae.contains = function (e, t) {
						return (e.ownerDocument || e) !== x && S(e), m(e, t)
					}, ae.attr = function (e, t) {
						(e.ownerDocument || e) !== x && S(e);
						var n = b.attrHandle[t.toLowerCase()],
							i = n && N.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !k) : void 0;
						return void 0 !== i ? i : f.attributes || !k ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
					}, ae.escape = function (e) {
						return (e + "").replace(oe, re)
					}, ae.error = function (e) {
						throw new Error("Syntax error, unrecognized expression: " + e)
					}, ae.uniqueSort = function (e) {
						var t, n = [],
							i = 0,
							o = 0;
						if (c = !f.detectDuplicates, l = !f.sortStable && e.slice(0), e.sort(P), c) {
							for (; t = e[o++];) t === e[o] && (i = n.push(o));
							for (; i--;) e.splice(n[i], 1)
						}
						return l = null, e
					}, r = ae.getText = function (e) {
						var t, n = "",
							i = 0,
							o = e.nodeType;
						if (o) {
							if (1 === o || 9 === o || 11 === o) {
								if ("string" == typeof e.textContent) return e.textContent;
								for (e = e.firstChild; e; e = e.nextSibling) n += r(e)
							} else if (3 === o || 4 === o) return e.nodeValue
						} else
							for (; t = e[i++];) n += r(t);
						return n
					}, (b = ae.selectors = {
						cacheLength: 50,
						createPseudo: ce,
						match: G,
						attrHandle: {},
						find: {},
						relative: {
							">": {
								dir: "parentNode",
								first: !0
							},
							" ": {
								dir: "parentNode"
							},
							"+": {
								dir: "previousSibling",
								first: !0
							},
							"~": {
								dir: "previousSibling"
							}
						},
						preFilter: {
							ATTR: function (e) {
								return e[1] = e[1].replace(ie, u), e[3] = (e[3] || e[4] || e[5] || "").replace(ie, u), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
							},
							CHILD: function (e) {
								return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ae.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ae.error(e[0]), e
							},
							PSEUDO: function (e) {
								var t, n = !e[6] && e[2];
								return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && V.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
							}
						},
						filter: {
							TAG: function (e) {
								var t = e.replace(ie, u).toLowerCase();
								return "*" === e ? function () {
									return !0
								} : function (e) {
									return e.nodeName && e.nodeName.toLowerCase() === t
								}
							},
							CLASS: function (e) {
								var t = $[e + " "];
								return t || (t = new RegExp("(^|" + q + ")" + e + "(" + q + "|$)")) && $(e, function (e) {
									return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
								})
							},
							ATTR: function (n, i, o) {
								return function (e) {
									var t = ae.attr(e, n);
									return null == t ? "!=" === i : !i || (t += "", "=" === i ? t === o : "!=" === i ? t !== o : "^=" === i ? o && 0 === t.indexOf(o) : "*=" === i ? o && -1 < t.indexOf(o) : "$=" === i ? o && t.slice(-o.length) === o : "~=" === i ? -1 < (" " + t.replace(F, " ") + " ").indexOf(o) : "|=" === i && (t === o || t.slice(0, o.length + 1) === o + "-"))
								}
							},
							CHILD: function (h, e, t, v, g) {
								var y = "nth" !== h.slice(0, 3),
									m = "last" !== h.slice(-4),
									w = "of-type" === e;
								return 1 === v && 0 === g ? function (e) {
									return !!e.parentNode
								} : function (e, t, n) {
									var i, o, r, s, a, l, c = y != m ? "nextSibling" : "previousSibling",
										d = e.parentNode,
										u = w && e.nodeName.toLowerCase(),
										p = !n && !w,
										f = !1;
									if (d) {
										if (y) {
											for (; c;) {
												for (s = e; s = s[c];)
													if (w ? s.nodeName.toLowerCase() === u : 1 === s.nodeType) return !1;
												l = c = "only" === h && !l && "nextSibling"
											}
											return !0
										}
										if (l = [m ? d.firstChild : d.lastChild], m && p) {
											for (f = (a = (i = (o = (r = (s = d)[C] || (s[C] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[h] || [])[0] === E && i[1]) && i[2], s = a && d.childNodes[a]; s = ++a && s && s[c] || (f = a = 0) || l.pop();)
												if (1 === s.nodeType && ++f && s === e) {
													o[h] = [E, a, f];
													break
												}
										} else if (p && (f = a = (i = (o = (r = (s = e)[C] || (s[C] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[h] || [])[0] === E && i[1]), !1 === f)
											for (;
												(s = ++a && s && s[c] || (f = a = 0) || l.pop()) && ((w ? s.nodeName.toLowerCase() !== u : 1 !== s.nodeType) || !++f || (p && ((o = (r = s[C] || (s[C] = {}))[s.uniqueID] || (r[s.uniqueID] = {}))[h] = [E, f]), s !== e)););
										return (f -= g) === v || f % v == 0 && 0 <= f / v
									}
								}
							},
							PSEUDO: function (e, r) {
								var t, s = b.pseudos[e] || b.setFilters[e.toLowerCase()] || ae.error("unsupported pseudo: " + e);
								return s[C] ? s(r) : 1 < s.length ? (t = [e, e, "", r], b.setFilters.hasOwnProperty(e.toLowerCase()) ? ce(function (e, t) {
									for (var n, i = s(e, r), o = i.length; o--;) e[n = R(e, i[o])] = !(t[n] = i[o])
								}) : function (e) {
									return s(e, 0, t)
								}) : s
							}
						},
						pseudos: {
							not: ce(function (e) {
								var i = [],
									o = [],
									a = p(e.replace(B, "$1"));
								return a[C] ? ce(function (e, t, n, i) {
									for (var o, r = a(e, null, i, []), s = e.length; s--;)(o = r[s]) && (e[s] = !(t[s] = o))
								}) : function (e, t, n) {
									return i[0] = e, a(i, null, n, o), i[0] = null, !o.pop()
								}
							}),
							has: ce(function (t) {
								return function (e) {
									return 0 < ae(t, e).length
								}
							}),
							contains: ce(function (t) {
								return t = t.replace(ie, u),
									function (e) {
										return -1 < (e.textContent || r(e)).indexOf(t)
									}
							}),
							lang: ce(function (n) {
								return Q.test(n || "") || ae.error("unsupported lang: " + n), n = n.replace(ie, u).toLowerCase(),
									function (e) {
										var t;
										do {
											if (t = k ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
										} while ((e = e.parentNode) && 1 === e.nodeType);
										return !1
									}
							}),
							target: function (e) {
								var t = n.location && n.location.hash;
								return t && t.slice(1) === e.id
							},
							root: function (e) {
								return e === a
							},
							focus: function (e) {
								return e === x.activeElement && (!x.hasFocus || x.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
							},
							enabled: ve(!1),
							disabled: ve(!0),
							checked: function (e) {
								var t = e.nodeName.toLowerCase();
								return "input" === t && !!e.checked || "option" === t && !!e.selected
							},
							selected: function (e) {
								return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
							},
							empty: function (e) {
								for (e = e.firstChild; e; e = e.nextSibling)
									if (e.nodeType < 6) return !1;
								return !0
							},
							parent: function (e) {
								return !b.pseudos.empty(e)
							},
							header: function (e) {
								return Z.test(e.nodeName)
							},
							input: function (e) {
								return K.test(e.nodeName)
							},
							button: function (e) {
								var t = e.nodeName.toLowerCase();
								return "input" === t && "button" === e.type || "button" === t
							},
							text: function (e) {
								var t;
								return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
							},
							first: ge(function () {
								return [0]
							}),
							last: ge(function (e, t) {
								return [t - 1]
							}),
							eq: ge(function (e, t, n) {
								return [n < 0 ? n + t : n]
							}),
							even: ge(function (e, t) {
								for (var n = 0; n < t; n += 2) e.push(n);
								return e
							}),
							odd: ge(function (e, t) {
								for (var n = 1; n < t; n += 2) e.push(n);
								return e
							}),
							lt: ge(function (e, t, n) {
								for (var i = n < 0 ? n + t : t < n ? t : n; 0 <= --i;) e.push(i);
								return e
							}),
							gt: ge(function (e, t, n) {
								for (var i = n < 0 ? n + t : n; ++i < t;) e.push(i);
								return e
							})
						}
					}).pseudos.nth = b.pseudos.eq, {
						radio: !0,
						checkbox: !0,
						file: !0,
						password: !0,
						image: !0
					}) b.pseudos[e] = fe(e);
					for (e in {
						submit: !0,
						reset: !0
					}) b.pseudos[e] = he(e);

					function me() {}

					function we(e) {
						for (var t = 0, n = e.length, i = ""; t < n; t++) i += e[t].value;
						return i
					}

					function be(a, e, t) {
						var l = e.dir,
							c = e.next,
							d = c || l,
							u = t && "parentNode" === d,
							p = i++;
						return e.first ? function (e, t, n) {
							for (; e = e[l];)
								if (1 === e.nodeType || u) return a(e, t, n);
							return !1
						} : function (e, t, n) {
							var i, o, r, s = [E, p];
							if (n) {
								for (; e = e[l];)
									if ((1 === e.nodeType || u) && a(e, t, n)) return !0
							} else
								for (; e = e[l];)
									if (1 === e.nodeType || u)
										if (o = (r = e[C] || (e[C] = {}))[e.uniqueID] || (r[e.uniqueID] = {}), c && c === e.nodeName.toLowerCase()) e = e[l] || e;
										else {
											if ((i = o[d]) && i[0] === E && i[1] === p) return s[2] = i[2];
											if ((o[d] = s)[2] = a(e, t, n)) return !0
										} return !1
						}
					}

					function Te(o) {
						return 1 < o.length ? function (e, t, n) {
							for (var i = o.length; i--;)
								if (!o[i](e, t, n)) return !1;
							return !0
						} : o[0]
					}

					function Se(e, t, n, i, o) {
						for (var r, s = [], a = 0, l = e.length, c = null != t; a < l; a++)(r = e[a]) && (n && !n(r, i, o) || (s.push(r), c && t.push(a)));
						return s
					}

					function xe(f, h, v, g, y, e) {
						return g && !g[C] && (g = xe(g)), y && !y[C] && (y = xe(y, e)), ce(function (e, t, n, i) {
							var o, r, s, a = [],
								l = [],
								c = t.length,
								d = e || function (e, t, n) {
									for (var i = 0, o = t.length; i < o; i++) ae(e, t[i], n);
									return n
								}(h || "*", n.nodeType ? [n] : n, []),
								u = !f || !e && h ? d : Se(d, a, f, n, i),
								p = v ? y || (e ? f : c || g) ? [] : t : u;
							if (v && v(u, p, n, i), g)
								for (o = Se(p, l), g(o, [], n, i), r = o.length; r--;)(s = o[r]) && (p[l[r]] = !(u[l[r]] = s));
							if (e) {
								if (y || f) {
									if (y) {
										for (o = [], r = p.length; r--;)(s = p[r]) && o.push(u[r] = s);
										y(null, p = [], o, i)
									}
									for (r = p.length; r--;)(s = p[r]) && -1 < (o = y ? R(e, s) : a[r]) && (e[o] = !(t[o] = s))
								}
							} else p = Se(p === t ? p.splice(c, p.length) : p), y ? y(null, t, p, i) : H.apply(t, p)
						})
					}

					function ke(e) {
						for (var o, t, n, i = e.length, r = b.relative[e[0].type], s = r || b.relative[" "], a = r ? 1 : 0, l = be(function (e) {
							return e === o
						}, s, !0), c = be(function (e) {
							return -1 < R(o, e)
						}, s, !0), d = [
							function (e, t, n) {
								var i = !r && (n || t !== T) || ((o = t).nodeType ? l(e, t, n) : c(e, t, n));
								return o = null, i
							}
						]; a < i; a++)
							if (t = b.relative[e[a].type]) d = [be(Te(d), t)];
							else {
								if ((t = b.filter[e[a].type].apply(null, e[a].matches))[C]) {
									for (n = ++a; n < i && !b.relative[e[n].type]; n++);
									return xe(1 < a && Te(d), 1 < a && we(e.slice(0, a - 1).concat({
										value: " " === e[a - 2].type ? "*" : ""
									})).replace(B, "$1"), t, a < n && ke(e.slice(a, n)), n < i && ke(e = e.slice(n)), n < i && we(e))
								}
								d.push(t)
							}
						return Te(d)
					}
					return me.prototype = b.filters = b.pseudos, b.setFilters = new me, h = ae.tokenize = function (e, t) {
						var n, i, o, r, s, a, l, c = A[e + " "];
						if (c) return t ? 0 : c.slice(0);
						for (s = e, a = [], l = b.preFilter; s;) {
							for (r in n && !(i = U.exec(s)) || (i && (s = s.slice(i[0].length) || s), a.push(o = [])), n = !1, (i = Y.exec(s)) && (n = i.shift(), o.push({
								value: n,
								type: i[0].replace(B, " ")
							}), s = s.slice(n.length)), b.filter)!(i = G[r].exec(s)) || l[r] && !(i = l[r](i)) || (n = i.shift(), o.push({
								value: n,
								type: r,
								matches: i
							}), s = s.slice(n.length));
							if (!n) break
						}
						return t ? s.length : s ? ae.error(e) : A(e, a).slice(0)
					}, p = ae.compile = function (e, t) {
						var n, i = [],
							o = [],
							r = O[e + " "];
						if (!r) {
							for (n = (t = t || h(e)).length; n--;)(r = ke(t[n]))[C] ? i.push(r) : o.push(r);
							(r = O(e, function (g, y) {
								function e(e, t, n, i, o) {
									var r, s, a, l = 0,
										c = "0",
										d = e && [],
										u = [],
										p = T,
										f = e || w && b.find.TAG("*", o),
										h = E += null == p ? 1 : Math.random() || .1,
										v = f.length;
									for (o && (T = t === x || t || o); c !== v && null != (r = f[c]); c++) {
										if (w && r) {
											for (s = 0, t || r.ownerDocument === x || (S(r), n = !k); a = g[s++];)
												if (a(r, t || x, n)) {
													i.push(r);
													break
												}
											o && (E = h)
										}
										m && ((r = !a && r) && l--, e && d.push(r))
									}
									if (l += c, m && c !== l) {
										for (s = 0; a = y[s++];) a(d, u, t, n);
										if (e) {
											if (0 < l)
												for (; c--;) d[c] || u[c] || (u[c] = L.call(i));
											u = Se(u)
										}
										H.apply(i, u), o && !e && 0 < u.length && 1 < l + y.length && ae.uniqueSort(i)
									}
									return o && (E = h, T = p), d
								}
								var m = 0 < y.length,
									w = 0 < g.length;
								return m ? ce(e) : e
							}(o, i))).selector = e
						}
						return r
					}, v = ae.select = function (e, t, n, i) {
						var o, r, s, a, l, c = "function" == typeof e && e,
							d = !i && h(e = c.selector || e);
						if (n = n || [], 1 === d.length) {
							if (2 < (r = d[0] = d[0].slice(0)).length && "ID" === (s = r[0]).type && 9 === t.nodeType && k && b.relative[r[1].type]) {
								if (!(t = (b.find.ID(s.matches[0].replace(ie, u), t) || [])[0])) return n;
								c && (t = t.parentNode), e = e.slice(r.shift().value.length)
							}
							for (o = G.needsContext.test(e) ? 0 : r.length; o-- && (s = r[o], !b.relative[a = s.type]);)
								if ((l = b.find[a]) && (i = l(s.matches[0].replace(ie, u), ne.test(r[0].type) && ye(t.parentNode) || t))) {
									if (r.splice(o, 1), !(e = i.length && we(r))) return H.apply(n, i), n;
									break
								}
						}
						return (c || p(e, d))(i, t, !k, n, !t || ne.test(e) && ye(t.parentNode) || t), n
					}, f.sortStable = C.split("").sort(P).join("") === C, f.detectDuplicates = !!c, S(), f.sortDetached = de(function (e) {
						return 1 & e.compareDocumentPosition(x.createElement("fieldset"))
					}), de(function (e) {
						return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
					}) || ue("type|href|height|width", function (e, t, n) {
						if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
					}), f.attributes && de(function (e) {
						return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
					}) || ue("value", function (e, t, n) {
						if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
					}), de(function (e) {
						return null == e.getAttribute("disabled")
					}) || ue(I, function (e, t, n) {
						var i;
						if (!n) return !0 === e[t] ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
					}), ae
				}(x);
				C.find = f, C.expr = f.selectors, C.expr[":"] = C.expr.pseudos, C.uniqueSort = C.unique = f.uniqueSort, C.text = f.getText, C.isXMLDoc = f.isXML, C.contains = f.contains, C.escapeSelector = f.escape;

				function h(e, t, n) {
					for (var i = [], o = void 0 !== n;
						(e = e[t]) && 9 !== e.nodeType;)
						if (1 === e.nodeType) {
							if (o && C(e).is(n)) break;
							i.push(e)
						}
					return i
				}

				function S(e, t) {
					for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
					return n
				}
				var E = C.expr.match.needsContext;

				function $(e, t) {
					return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
				}
				var A = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

				function O(e, n, i) {
					return w(n) ? C.grep(e, function (e, t) {
						return !!n.call(e, t, e) !== i
					}) : n.nodeType ? C.grep(e, function (e) {
						return e === n !== i
					}) : "string" != typeof n ? C.grep(e, function (e) {
						return -1 < o.call(n, e) !== i
					}) : C.filter(n, e, i)
				}
				C.filter = function (e, t, n) {
					var i = t[0];
					return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? C.find.matchesSelector(i, e) ? [i] : [] : C.find.matches(e, C.grep(t, function (e) {
						return 1 === e.nodeType
					}))
				}, C.fn.extend({
					find: function (e) {
						var t, n, i = this.length,
							o = this;
						if ("string" != typeof e) return this.pushStack(C(e).filter(function () {
							for (t = 0; t < i; t++)
								if (C.contains(o[t], this)) return !0
						}));
						for (n = this.pushStack([]), t = 0; t < i; t++) C.find(e, o[t], n);
						return 1 < i ? C.uniqueSort(n) : n
					},
					filter: function (e) {
						return this.pushStack(O(this, e || [], !1))
					},
					not: function (e) {
						return this.pushStack(O(this, e || [], !0))
					},
					is: function (e) {
						return !!O(this, "string" == typeof e && E.test(e) ? C(e) : e || [], !1).length
					}
				});
				var j, P = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
				(C.fn.init = function (e, t, n) {
					var i, o;
					if (!e) return this;
					if (n = n || j, "string" != typeof e) return e.nodeType ? (this[0] = e, this.length = 1, this) : w(e) ? void 0 !== n.ready ? n.ready(e) : e(C) : C.makeArray(e, this);
					if (!(i = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : P.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
					if (i[1]) {
						if (t = t instanceof C ? t[0] : t, C.merge(this, C.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : k, !0)), A.test(i[1]) && C.isPlainObject(t))
							for (i in t) w(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
						return this
					}
					return (o = k.getElementById(i[2])) && (this[0] = o, this.length = 1), this
				}).prototype = C.fn, j = C(k);
				var N = /^(?:parents|prev(?:Until|All))/,
					L = {
						children: !0,
						contents: !0,
						next: !0,
						prev: !0
					};

				function D(e, t) {
					for (;
						(e = e[t]) && 1 !== e.nodeType;);
					return e
				}
				C.fn.extend({
					has: function (e) {
						var t = C(e, this),
							n = t.length;
						return this.filter(function () {
							for (var e = 0; e < n; e++)
								if (C.contains(this, t[e])) return !0
						})
					},
					closest: function (e, t) {
						var n, i = 0,
							o = this.length,
							r = [],
							s = "string" != typeof e && C(e);
						if (!E.test(e))
							for (; i < o; i++)
								for (n = this[i]; n && n !== t; n = n.parentNode)
									if (n.nodeType < 11 && (s ? -1 < s.index(n) : 1 === n.nodeType && C.find.matchesSelector(n, e))) {
										r.push(n);
										break
									}
						return this.pushStack(1 < r.length ? C.uniqueSort(r) : r)
					},
					index: function (e) {
						return e ? "string" == typeof e ? o.call(C(e), this[0]) : o.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
					},
					add: function (e, t) {
						return this.pushStack(C.uniqueSort(C.merge(this.get(), C(e, t))))
					},
					addBack: function (e) {
						return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
					}
				}), C.each({
					parent: function (e) {
						var t = e.parentNode;
						return t && 11 !== t.nodeType ? t : null
					},
					parents: function (e) {
						return h(e, "parentNode")
					},
					parentsUntil: function (e, t, n) {
						return h(e, "parentNode", n)
					},
					next: function (e) {
						return D(e, "nextSibling")
					},
					prev: function (e) {
						return D(e, "previousSibling")
					},
					nextAll: function (e) {
						return h(e, "nextSibling")
					},
					prevAll: function (e) {
						return h(e, "previousSibling")
					},
					nextUntil: function (e, t, n) {
						return h(e, "nextSibling", n)
					},
					prevUntil: function (e, t, n) {
						return h(e, "previousSibling", n)
					},
					siblings: function (e) {
						return S((e.parentNode || {}).firstChild, e)
					},
					children: function (e) {
						return S(e.firstChild)
					},
					contents: function (e) {
						return void 0 !== e.contentDocument ? e.contentDocument : ($(e, "template") && (e = e.content || e), C.merge([], e.childNodes))
					}
				}, function (i, o) {
					C.fn[i] = function (e, t) {
						var n = C.map(this, o, e);
						return "Until" !== i.slice(-5) && (t = e), t && "string" == typeof t && (n = C.filter(t, n)), 1 < this.length && (L[i] || C.uniqueSort(n), N.test(i) && n.reverse()), this.pushStack(n)
					}
				});
				var H = /[^\x20\t\r\n\f]+/g;

				function M(e) {
					return e
				}

				function R(e) {
					throw e
				}

				function I(e, t, n, i) {
					var o;
					try {
						e && w(o = e.promise) ? o.call(e).done(t).fail(n) : e && w(o = e.then) ? o.call(e, t, n) : t.apply(void 0, [e].slice(i))
					} catch (e) {
						n.apply(void 0, [e])
					}
				}
				C.Callbacks = function (i) {
					i = "string" == typeof i ? function (e) {
						var n = {};
						return C.each(e.match(H) || [], function (e, t) {
							n[t] = !0
						}), n
					}(i) : C.extend({}, i);

					function n() {
						for (r = r || i.once, t = o = !0; a.length; l = -1)
							for (e = a.shift(); ++l < s.length;)!1 === s[l].apply(e[0], e[1]) && i.stopOnFalse && (l = s.length, e = !1);
						i.memory || (e = !1), o = !1, r && (s = e ? [] : "")
					}
					var o, e, t, r, s = [],
						a = [],
						l = -1,
						c = {
							add: function () {
								return s && (e && !o && (l = s.length - 1, a.push(e)), function n(e) {
									C.each(e, function (e, t) {
										w(t) ? i.unique && c.has(t) || s.push(t) : t && t.length && "string" !== T(t) && n(t)
									})
								}(arguments), e && !o && n()), this
							},
							remove: function () {
								return C.each(arguments, function (e, t) {
									for (var n; - 1 < (n = C.inArray(t, s, n));) s.splice(n, 1), n <= l && l--
								}), this
							},
							has: function (e) {
								return e ? -1 < C.inArray(e, s) : 0 < s.length
							},
							empty: function () {
								return s = s && [], this
							},
							disable: function () {
								return r = a = [], s = e = "", this
							},
							disabled: function () {
								return !s
							},
							lock: function () {
								return r = a = [], e || o || (s = e = ""), this
							},
							locked: function () {
								return !!r
							},
							fireWith: function (e, t) {
								return r || (t = [e, (t = t || []).slice ? t.slice() : t], a.push(t), o || n()), this
							},
							fire: function () {
								return c.fireWith(this, arguments), this
							},
							fired: function () {
								return !!t
							}
						};
					return c
				}, C.extend({
					Deferred: function (e) {
						var r = [
								["notify", "progress", C.Callbacks("memory"), C.Callbacks("memory"), 2],
								["resolve", "done", C.Callbacks("once memory"), C.Callbacks("once memory"), 0, "resolved"],
								["reject", "fail", C.Callbacks("once memory"), C.Callbacks("once memory"), 1, "rejected"]
							],
							o = "pending",
							s = {
								state: function () {
									return o
								},
								always: function () {
									return a.done(arguments).fail(arguments), this
								},
								catch: function (e) {
									return s.then(null, e)
								},
								pipe: function () {
									var o = arguments;
									return C.Deferred(function (i) {
										C.each(r, function (e, t) {
											var n = w(o[t[4]]) && o[t[4]];
											a[t[1]](function () {
												var e = n && n.apply(this, arguments);
												e && w(e.promise) ? e.promise().progress(i.notify).done(i.resolve).fail(i.reject) : i[t[0] + "With"](this, n ? [e] : arguments)
											})
										}), o = null
									}).promise()
								},
								then: function (t, n, i) {
									var l = 0;

									function c(o, r, s, a) {
										return function () {
											function e() {
												var e, t;
												if (!(o < l)) {
													if ((e = s.apply(n, i)) === r.promise()) throw new TypeError("Thenable self-resolution");
													t = e && ("object" === an(e) || "function" == typeof e) && e.then, w(t) ? a ? t.call(e, c(l, r, M, a), c(l, r, R, a)) : (l++, t.call(e, c(l, r, M, a), c(l, r, R, a), c(l, r, M, r.notifyWith))) : (s !== M && (n = void 0, i = [e]), (a || r.resolveWith)(n, i))
												}
											}
											var n = this,
												i = arguments,
												t = a ? e : function () {
													try {
														e()
													} catch (e) {
														C.Deferred.exceptionHook && C.Deferred.exceptionHook(e, t.stackTrace), l <= o + 1 && (s !== R && (n = void 0, i = [e]), r.rejectWith(n, i))
													}
												};
											o ? t() : (C.Deferred.getStackHook && (t.stackTrace = C.Deferred.getStackHook()), x.setTimeout(t))
										}
									}
									return C.Deferred(function (e) {
										r[0][3].add(c(0, e, w(i) ? i : M, e.notifyWith)), r[1][3].add(c(0, e, w(t) ? t : M)), r[2][3].add(c(0, e, w(n) ? n : R))
									}).promise()
								},
								promise: function (e) {
									return null != e ? C.extend(e, s) : s
								}
							},
							a = {};
						return C.each(r, function (e, t) {
							var n = t[2],
								i = t[5];
							s[t[1]] = n.add, i && n.add(function () {
								o = i
							}, r[3 - e][2].disable, r[3 - e][3].disable, r[0][2].lock, r[0][3].lock), n.add(t[3].fire), a[t[0]] = function () {
								return a[t[0] + "With"](this === a ? void 0 : this, arguments), this
							}, a[t[0] + "With"] = n.fireWith
						}), s.promise(a), e && e.call(a, a), a
					},
					when: function (e) {
						function t(t) {
							return function (e) {
								o[t] = this, r[t] = 1 < arguments.length ? a.call(arguments) : e, --n || s.resolveWith(o, r)
							}
						}
						var n = arguments.length,
							i = n,
							o = Array(i),
							r = a.call(arguments),
							s = C.Deferred();
						if (n <= 1 && (I(e, s.done(t(i)).resolve, s.reject, !n), "pending" === s.state() || w(r[i] && r[i].then))) return s.then();
						for (; i--;) I(r[i], t(i), s.reject);
						return s.promise()
					}
				});
				var q = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
				C.Deferred.exceptionHook = function (e, t) {
					x.console && x.console.warn && e && q.test(e.name) && x.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
				}, C.readyException = function (e) {
					x.setTimeout(function () {
						throw e
					})
				};
				var z = C.Deferred();

				function _() {
					k.removeEventListener("DOMContentLoaded", _), x.removeEventListener("load", _), C.ready()
				}
				C.fn.ready = function (e) {
					return z.then(e).catch(function (e) {
						C.readyException(e)
					}), this
				}, C.extend({
					isReady: !1,
					readyWait: 1,
					ready: function (e) {
						(!0 === e ? --C.readyWait : C.isReady) || (C.isReady = !0) !== e && 0 < --C.readyWait || z.resolveWith(k, [C])
					}
				}), C.ready.then = z.then, "complete" === k.readyState || "loading" !== k.readyState && !k.documentElement.doScroll ? x.setTimeout(C.ready) : (k.addEventListener("DOMContentLoaded", _), x.addEventListener("load", _));

				function W(e, t, n, i, o, r, s) {
					var a = 0,
						l = e.length,
						c = null == n;
					if ("object" === T(n))
						for (a in o = !0, n) W(e, t, a, n[a], !0, r, s);
					else if (void 0 !== i && (o = !0, w(i) || (s = !0), c && (t = s ? (t.call(e, i), null) : (c = t, function (e, t, n) {
						return c.call(C(e), n)
					})), t))
						for (; a < l; a++) t(e[a], n, s ? i : i.call(e[a], a, t(e[a], n)));
					return o ? e : c ? t.call(e) : l ? t(e[0], n) : r
				}
				var F = /^-ms-/,
					B = /-([a-z])/g;

				function U(e, t) {
					return t.toUpperCase()
				}

				function Y(e) {
					return e.replace(F, "ms-").replace(B, U)
				}

				function X(e) {
					return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
				}

				function V() {
					this.expando = C.expando + V.uid++
				}
				V.uid = 1, V.prototype = {
					cache: function (e) {
						var t = e[this.expando];
						return t || (t = {}, X(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
							value: t,
							configurable: !0
						}))), t
					},
					set: function (e, t, n) {
						var i, o = this.cache(e);
						if ("string" == typeof t) o[Y(t)] = n;
						else
							for (i in t) o[Y(i)] = t[i];
						return o
					},
					get: function (e, t) {
						return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][Y(t)]
					},
					access: function (e, t, n) {
						return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
					},
					remove: function (e, t) {
						var n, i = e[this.expando];
						if (void 0 !== i) {
							if (void 0 !== t) {
								n = (t = Array.isArray(t) ? t.map(Y) : (t = Y(t)) in i ? [t] : t.match(H) || []).length;
								for (; n--;) delete i[t[n]]
							}
							void 0 !== t && !C.isEmptyObject(i) || (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
						}
					},
					hasData: function (e) {
						var t = e[this.expando];
						return void 0 !== t && !C.isEmptyObject(t)
					}
				};
				var Q = new V,
					G = new V,
					J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
					K = /[A-Z]/g;

				function Z(e, t, n) {
					var i;
					if (void 0 === n && 1 === e.nodeType)
						if (i = "data-" + t.replace(K, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(i))) {
							try {
								n = function (e) {
									return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : J.test(e) ? JSON.parse(e) : e)
								}(n)
							} catch (e) {}
							G.set(e, t, n)
						} else n = void 0;
					return n
				}
				C.extend({
					hasData: function (e) {
						return G.hasData(e) || Q.hasData(e)
					},
					data: function (e, t, n) {
						return G.access(e, t, n)
					},
					removeData: function (e, t) {
						G.remove(e, t)
					},
					_data: function (e, t, n) {
						return Q.access(e, t, n)
					},
					_removeData: function (e, t) {
						Q.remove(e, t)
					}
				}), C.fn.extend({
					data: function (n, e) {
						var t, i, o, r = this[0],
							s = r && r.attributes;
						if (void 0 !== n) return "object" === an(n) ? this.each(function () {
							G.set(this, n)
						}) : W(this, function (e) {
							var t;
							if (r && void 0 === e) return void 0 !== (t = G.get(r, n)) ? t : void 0 !== (t = Z(r, n)) ? t : void 0;
							this.each(function () {
								G.set(this, n, e)
							})
						}, null, e, 1 < arguments.length, null, !0);
						if (this.length && (o = G.get(r), 1 === r.nodeType && !Q.get(r, "hasDataAttrs"))) {
							for (t = s.length; t--;) s[t] && 0 === (i = s[t].name).indexOf("data-") && (i = Y(i.slice(5)), Z(r, i, o[i]));
							Q.set(r, "hasDataAttrs", !0)
						}
						return o
					},
					removeData: function (e) {
						return this.each(function () {
							G.remove(this, e)
						})
					}
				}), C.extend({
					queue: function (e, t, n) {
						var i;
						if (e) return t = (t || "fx") + "queue", i = Q.get(e, t), n && (!i || Array.isArray(n) ? i = Q.access(e, t, C.makeArray(n)) : i.push(n)), i || []
					},
					dequeue: function (e, t) {
						t = t || "fx";
						var n = C.queue(e, t),
							i = n.length,
							o = n.shift(),
							r = C._queueHooks(e, t);
						"inprogress" === o && (o = n.shift(), i--), o && ("fx" === t && n.unshift("inprogress"), delete r.stop, o.call(e, function () {
							C.dequeue(e, t)
						}, r)), !i && r && r.empty.fire()
					},
					_queueHooks: function (e, t) {
						var n = t + "queueHooks";
						return Q.get(e, n) || Q.access(e, n, {
							empty: C.Callbacks("once memory").add(function () {
								Q.remove(e, [t + "queue", n])
							})
						})
					}
				}), C.fn.extend({
					queue: function (t, n) {
						var e = 2;
						return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? C.queue(this[0], t) : void 0 === n ? this : this.each(function () {
							var e = C.queue(this, t, n);
							C._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && C.dequeue(this, t)
						})
					},
					dequeue: function (e) {
						return this.each(function () {
							C.dequeue(this, e)
						})
					},
					clearQueue: function (e) {
						return this.queue(e || "fx", [])
					},
					promise: function (e, t) {
						function n() {
							--o || r.resolveWith(s, [s])
						}
						var i, o = 1,
							r = C.Deferred(),
							s = this,
							a = this.length;
						for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;)(i = Q.get(s[a], e + "queueHooks")) && i.empty && (o++, i.empty.add(n));
						return n(), r.promise(t)
					}
				});
				var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
					te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
					ne = ["Top", "Right", "Bottom", "Left"],
					ie = k.documentElement,
					oe = function (e) {
						return C.contains(e.ownerDocument, e)
					},
					re = {
						composed: !0
					};
				ie.getRootNode && (oe = function (e) {
					return C.contains(e.ownerDocument, e) || e.getRootNode(re) === e.ownerDocument
				});

				function se(e, t, n, i) {
					var o, r, s = {};
					for (r in t) s[r] = e.style[r], e.style[r] = t[r];
					for (r in o = n.apply(e, i || []), t) e.style[r] = s[r];
					return o
				}
				var ae = function (e, t) {
					return "none" === (e = t || e).style.display || "" === e.style.display && oe(e) && "none" === C.css(e, "display")
				};

				function le(e, t, n, i) {
					var o, r, s = 20,
						a = i ? function () {
							return i.cur()
						} : function () {
							return C.css(e, t, "")
						},
						l = a(),
						c = n && n[3] || (C.cssNumber[t] ? "" : "px"),
						d = e.nodeType && (C.cssNumber[t] || "px" !== c && +l) && te.exec(C.css(e, t));
					if (d && d[3] !== c) {
						for (l /= 2, c = c || d[3], d = +l || 1; s--;) C.style(e, t, d + c), (1 - r) * (1 - (r = a() / l || .5)) <= 0 && (s = 0), d /= r;
						d *= 2, C.style(e, t, d + c), n = n || []
					}
					return n && (d = +d || +l || 0, o = n[1] ? d + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, i.start = d, i.end = o)), o
				}
				var ce = {};

				function de(e, t) {
					for (var n, i, o, r, s, a, l, c = [], d = 0, u = e.length; d < u; d++)(i = e[d]).style && (n = i.style.display, t ? ("none" === n && (c[d] = Q.get(i, "display") || null, c[d] || (i.style.display = "")), "" === i.style.display && ae(i) && (c[d] = (l = s = r = void 0, s = (o = i).ownerDocument, a = o.nodeName, (l = ce[a]) || (r = s.body.appendChild(s.createElement(a)), l = C.css(r, "display"), r.parentNode.removeChild(r), "none" === l && (l = "block"), ce[a] = l)))) : "none" !== n && (c[d] = "none", Q.set(i, "display", n)));
					for (d = 0; d < u; d++) null != c[d] && (e[d].style.display = c[d]);
					return e
				}
				C.fn.extend({
					show: function () {
						return de(this, !0)
					},
					hide: function () {
						return de(this)
					},
					toggle: function (e) {
						return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
							ae(this) ? C(this).show() : C(this).hide()
						})
					}
				});
				var ue = /^(?:checkbox|radio)$/i,
					pe = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
					fe = /^$|^module$|\/(?:java|ecma)script/i,
					he = {
						option: [1, "<select multiple='multiple'>", "</select>"],
						thead: [1, "<table>", "</table>"],
						col: [2, "<table><colgroup>", "</colgroup></table>"],
						tr: [2, "<table><tbody>", "</tbody></table>"],
						td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
						_default: [0, "", ""]
					};

				function ve(e, t) {
					var n;
					return n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [], void 0 === t || t && $(e, t) ? C.merge([e], n) : n
				}

				function ge(e, t) {
					for (var n = 0, i = e.length; n < i; n++) Q.set(e[n], "globalEval", !t || Q.get(t[n], "globalEval"))
				}
				he.optgroup = he.option, he.tbody = he.tfoot = he.colgroup = he.caption = he.thead, he.th = he.td;
				var ye, me, we = /<|&#?\w+;/;

				function be(e, t, n, i, o) {
					for (var r, s, a, l, c, d, u = t.createDocumentFragment(), p = [], f = 0, h = e.length; f < h; f++)
						if ((r = e[f]) || 0 === r)
							if ("object" === T(r)) C.merge(p, r.nodeType ? [r] : r);
							else if (we.test(r)) {
						for (s = s || u.appendChild(t.createElement("div")), a = (pe.exec(r) || ["", ""])[1].toLowerCase(), l = he[a] || he._default, s.innerHTML = l[1] + C.htmlPrefilter(r) + l[2], d = l[0]; d--;) s = s.lastChild;
						C.merge(p, s.childNodes), (s = u.firstChild).textContent = ""
					} else p.push(t.createTextNode(r));
					for (u.textContent = "", f = 0; r = p[f++];)
						if (i && -1 < C.inArray(r, i)) o && o.push(r);
						else if (c = oe(r), s = ve(u.appendChild(r), "script"), c && ge(s), n)
						for (d = 0; r = s[d++];) fe.test(r.type || "") && n.push(r);
					return u
				}
				ye = k.createDocumentFragment().appendChild(k.createElement("div")), (me = k.createElement("input")).setAttribute("type", "radio"), me.setAttribute("checked", "checked"), me.setAttribute("name", "t"), ye.appendChild(me), m.checkClone = ye.cloneNode(!0).cloneNode(!0).lastChild.checked, ye.innerHTML = "<textarea>x</textarea>", m.noCloneChecked = !!ye.cloneNode(!0).lastChild.defaultValue;
				var Te = /^key/,
					Se = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
					xe = /^([^.]*)(?:\.(.+)|)/;

				function ke() {
					return !0
				}

				function Ce() {
					return !1
				}

				function Ee(e, t) {
					return e === function () {
						try {
							return k.activeElement
						} catch (e) {}
					}() == ("focus" === t)
				}

				function $e(e, t, n, i, o, r) {
					var s, a;
					if ("object" === an(t)) {
						for (a in "string" != typeof n && (i = i || n, n = void 0), t) $e(e, a, n, i, t[a], r);
						return e
					}
					if (null == i && null == o ? (o = n, i = n = void 0) : null == o && ("string" == typeof n ? (o = i, i = void 0) : (o = i, i = n, n = void 0)), !1 === o) o = Ce;
					else if (!o) return e;
					return 1 === r && (s = o, (o = function (e) {
						return C().off(e), s.apply(this, arguments)
					}).guid = s.guid || (s.guid = C.guid++)), e.each(function () {
						C.event.add(this, t, o, i, n)
					})
				}

				function Ae(e, o, r) {
					r ? (Q.set(e, o, !1), C.event.add(e, o, {
						namespace: !1,
						handler: function (e) {
							var t, n, i = Q.get(this, o);
							if (1 & e.isTrigger && this[o]) {
								if (i.length)(C.event.special[o] || {}).delegateType && e.stopPropagation();
								else if (i = a.call(arguments), Q.set(this, o, i), t = r(this, o), this[o](), i !== (n = Q.get(this, o)) || t ? Q.set(this, o, !1) : n = {}, i !== n) return e.stopImmediatePropagation(), e.preventDefault(), n.value
							} else i.length && (Q.set(this, o, {
								value: C.event.trigger(C.extend(i[0], C.Event.prototype), i.slice(1), this)
							}), e.stopImmediatePropagation())
						}
					})) : void 0 === Q.get(e, o) && C.event.add(e, o, ke)
				}
				C.event = {
					global: {},
					add: function (t, e, n, i, o) {
						var r, s, a, l, c, d, u, p, f, h, v, g = Q.get(t);
						if (g)
							for (n.handler && (n = (r = n).handler, o = r.selector), o && C.find.matchesSelector(ie, o), n.guid || (n.guid = C.guid++), (l = g.events) || (l = g.events = {}), (s = g.handle) || (s = g.handle = function (e) {
								return void 0 !== C && C.event.triggered !== e.type ? C.event.dispatch.apply(t, arguments) : void 0
							}), c = (e = (e || "").match(H) || [""]).length; c--;) f = v = (a = xe.exec(e[c]) || [])[1], h = (a[2] || "").split(".").sort(), f && (u = C.event.special[f] || {}, f = (o ? u.delegateType : u.bindType) || f, u = C.event.special[f] || {}, d = C.extend({
								type: f,
								origType: v,
								data: i,
								handler: n,
								guid: n.guid,
								selector: o,
								needsContext: o && C.expr.match.needsContext.test(o),
								namespace: h.join(".")
							}, r), (p = l[f]) || ((p = l[f] = []).delegateCount = 0, u.setup && !1 !== u.setup.call(t, i, h, s) || t.addEventListener && t.addEventListener(f, s)), u.add && (u.add.call(t, d), d.handler.guid || (d.handler.guid = n.guid)), o ? p.splice(p.delegateCount++, 0, d) : p.push(d), C.event.global[f] = !0)
					},
					remove: function (e, t, n, i, o) {
						var r, s, a, l, c, d, u, p, f, h, v, g = Q.hasData(e) && Q.get(e);
						if (g && (l = g.events)) {
							for (c = (t = (t || "").match(H) || [""]).length; c--;)
								if (f = v = (a = xe.exec(t[c]) || [])[1], h = (a[2] || "").split(".").sort(), f) {
									for (u = C.event.special[f] || {}, p = l[f = (i ? u.delegateType : u.bindType) || f] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = r = p.length; r--;) d = p[r], !o && v !== d.origType || n && n.guid !== d.guid || a && !a.test(d.namespace) || i && i !== d.selector && ("**" !== i || !d.selector) || (p.splice(r, 1), d.selector && p.delegateCount--, u.remove && u.remove.call(e, d));
									s && !p.length && (u.teardown && !1 !== u.teardown.call(e, h, g.handle) || C.removeEvent(e, f, g.handle), delete l[f])
								} else
									for (f in l) C.event.remove(e, f + t[c], n, i, !0);
							C.isEmptyObject(l) && Q.remove(e, "handle events")
						}
					},
					dispatch: function (e) {
						var t, n, i, o, r, s, a = C.event.fix(e),
							l = new Array(arguments.length),
							c = (Q.get(this, "events") || {})[a.type] || [],
							d = C.event.special[a.type] || {};
						for (l[0] = a, t = 1; t < arguments.length; t++) l[t] = arguments[t];
						if (a.delegateTarget = this, !d.preDispatch || !1 !== d.preDispatch.call(this, a)) {
							for (s = C.event.handlers.call(this, a, c), t = 0;
								(o = s[t++]) && !a.isPropagationStopped();)
								for (a.currentTarget = o.elem, n = 0;
									(r = o.handlers[n++]) && !a.isImmediatePropagationStopped();) a.rnamespace && !1 !== r.namespace && !a.rnamespace.test(r.namespace) || (a.handleObj = r, a.data = r.data, void 0 !== (i = ((C.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, l)) && !1 === (a.result = i) && (a.preventDefault(), a.stopPropagation()));
							return d.postDispatch && d.postDispatch.call(this, a), a.result
						}
					},
					handlers: function (e, t) {
						var n, i, o, r, s, a = [],
							l = t.delegateCount,
							c = e.target;
						if (l && c.nodeType && !("click" === e.type && 1 <= e.button))
							for (; c !== this; c = c.parentNode || this)
								if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
									for (r = [], s = {}, n = 0; n < l; n++) void 0 === s[o = (i = t[n]).selector + " "] && (s[o] = i.needsContext ? -1 < C(o, this).index(c) : C.find(o, this, null, [c]).length), s[o] && r.push(i);
									r.length && a.push({
										elem: c,
										handlers: r
									})
								}
						return c = this, l < t.length && a.push({
							elem: c,
							handlers: t.slice(l)
						}), a
					},
					addProp: function (t, e) {
						Object.defineProperty(C.Event.prototype, t, {
							enumerable: !0,
							configurable: !0,
							get: w(e) ? function () {
								if (this.originalEvent) return e(this.originalEvent)
							} : function () {
								if (this.originalEvent) return this.originalEvent[t]
							},
							set: function (e) {
								Object.defineProperty(this, t, {
									enumerable: !0,
									configurable: !0,
									writable: !0,
									value: e
								})
							}
						})
					},
					fix: function (e) {
						return e[C.expando] ? e : new C.Event(e)
					},
					special: {
						load: {
							noBubble: !0
						},
						click: {
							setup: function (e) {
								var t = this || e;
								return ue.test(t.type) && t.click && $(t, "input") && Ae(t, "click", ke), !1
							},
							trigger: function (e) {
								var t = this || e;
								return ue.test(t.type) && t.click && $(t, "input") && Ae(t, "click"), !0
							},
							_default: function (e) {
								var t = e.target;
								return ue.test(t.type) && t.click && $(t, "input") && Q.get(t, "click") || $(t, "a")
							}
						},
						beforeunload: {
							postDispatch: function (e) {
								void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
							}
						}
					}
				}, C.removeEvent = function (e, t, n) {
					e.removeEventListener && e.removeEventListener(t, n)
				}, C.Event = function (e, t) {
					if (!(this instanceof C.Event)) return new C.Event(e, t);
					e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? ke : Ce, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && C.extend(this, t), this.timeStamp = e && e.timeStamp || Date.now(), this[C.expando] = !0
				}, C.Event.prototype = {
					constructor: C.Event,
					isDefaultPrevented: Ce,
					isPropagationStopped: Ce,
					isImmediatePropagationStopped: Ce,
					isSimulated: !1,
					preventDefault: function () {
						var e = this.originalEvent;
						this.isDefaultPrevented = ke, e && !this.isSimulated && e.preventDefault()
					},
					stopPropagation: function () {
						var e = this.originalEvent;
						this.isPropagationStopped = ke, e && !this.isSimulated && e.stopPropagation()
					},
					stopImmediatePropagation: function () {
						var e = this.originalEvent;
						this.isImmediatePropagationStopped = ke, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
					}
				}, C.each({
					altKey: !0,
					bubbles: !0,
					cancelable: !0,
					changedTouches: !0,
					ctrlKey: !0,
					detail: !0,
					eventPhase: !0,
					metaKey: !0,
					pageX: !0,
					pageY: !0,
					shiftKey: !0,
					view: !0,
					char: !0,
					code: !0,
					charCode: !0,
					key: !0,
					keyCode: !0,
					button: !0,
					buttons: !0,
					clientX: !0,
					clientY: !0,
					offsetX: !0,
					offsetY: !0,
					pointerId: !0,
					pointerType: !0,
					screenX: !0,
					screenY: !0,
					targetTouches: !0,
					toElement: !0,
					touches: !0,
					which: function (e) {
						var t = e.button;
						return null == e.which && Te.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && Se.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
					}
				}, C.event.addProp), C.each({
					focus: "focusin",
					blur: "focusout"
				}, function (e, t) {
					C.event.special[e] = {
						setup: function () {
							return Ae(this, e, Ee), !1
						},
						trigger: function () {
							return Ae(this, e), !0
						},
						delegateType: t
					}
				}), C.each({
					mouseenter: "mouseover",
					mouseleave: "mouseout",
					pointerenter: "pointerover",
					pointerleave: "pointerout"
				}, function (e, o) {
					C.event.special[e] = {
						delegateType: o,
						bindType: o,
						handle: function (e) {
							var t, n = e.relatedTarget,
								i = e.handleObj;
							return n && (n === this || C.contains(this, n)) || (e.type = i.origType, t = i.handler.apply(this, arguments), e.type = o), t
						}
					}
				}), C.fn.extend({
					on: function (e, t, n, i) {
						return $e(this, e, t, n, i)
					},
					one: function (e, t, n, i) {
						return $e(this, e, t, n, i, 1)
					},
					off: function (e, t, n) {
						var i, o;
						if (e && e.preventDefault && e.handleObj) return i = e.handleObj, C(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
						if ("object" !== an(e)) return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = Ce), this.each(function () {
							C.event.remove(this, e, n, t)
						});
						for (o in e) this.off(o, t, e[o]);
						return this
					}
				});
				var Oe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
					je = /<script|<style|<link/i,
					Pe = /checked\s*(?:[^=]|=\s*.checked.)/i,
					Ne = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

				function Le(e, t) {
					return $(e, "table") && $(11 !== t.nodeType ? t : t.firstChild, "tr") && C(e).children("tbody")[0] || e
				}

				function De(e) {
					return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
				}

				function He(e) {
					return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"), e
				}

				function Me(e, t) {
					var n, i, o, r, s, a, l, c;
					if (1 === t.nodeType) {
						if (Q.hasData(e) && (r = Q.access(e), s = Q.set(t, r), c = r.events))
							for (o in delete s.handle, s.events = {}, c)
								for (n = 0, i = c[o].length; n < i; n++) C.event.add(t, o, c[o][n]);
						G.hasData(e) && (a = G.access(e), l = C.extend({}, a), G.set(t, l))
					}
				}

				function Re(n, i, o, r) {
					i = g.apply([], i);
					var e, t, s, a, l, c, d = 0,
						u = n.length,
						p = u - 1,
						f = i[0],
						h = w(f);
					if (h || 1 < u && "string" == typeof f && !m.checkClone && Pe.test(f)) return n.each(function (e) {
						var t = n.eq(e);
						h && (i[0] = f.call(this, e, t.html())), Re(t, i, o, r)
					});
					if (u && (t = (e = be(i, n[0].ownerDocument, !1, n, r)).firstChild, 1 === e.childNodes.length && (e = t), t || r)) {
						for (a = (s = C.map(ve(e, "script"), De)).length; d < u; d++) l = e, d !== p && (l = C.clone(l, !0, !0), a && C.merge(s, ve(l, "script"))), o.call(n[d], l, d);
						if (a)
							for (c = s[s.length - 1].ownerDocument, C.map(s, He), d = 0; d < a; d++) l = s[d], fe.test(l.type || "") && !Q.access(l, "globalEval") && C.contains(c, l) && (l.src && "module" !== (l.type || "").toLowerCase() ? C._evalUrl && !l.noModule && C._evalUrl(l.src, {
								nonce: l.nonce || l.getAttribute("nonce")
							}) : b(l.textContent.replace(Ne, ""), l, c))
					}
					return n
				}

				function Ie(e, t, n) {
					for (var i, o = t ? C.filter(t, e) : e, r = 0; null != (i = o[r]); r++) n || 1 !== i.nodeType || C.cleanData(ve(i)), i.parentNode && (n && oe(i) && ge(ve(i, "script")), i.parentNode.removeChild(i));
					return e
				}
				C.extend({
					htmlPrefilter: function (e) {
						return e.replace(Oe, "<$1></$2>")
					},
					clone: function (e, t, n) {
						var i, o, r, s, a, l, c, d = e.cloneNode(!0),
							u = oe(e);
						if (!(m.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || C.isXMLDoc(e)))
							for (s = ve(d), i = 0, o = (r = ve(e)).length; i < o; i++) a = r[i], l = s[i], void 0, "input" === (c = l.nodeName.toLowerCase()) && ue.test(a.type) ? l.checked = a.checked : "input" !== c && "textarea" !== c || (l.defaultValue = a.defaultValue);
						if (t)
							if (n)
								for (r = r || ve(e), s = s || ve(d), i = 0, o = r.length; i < o; i++) Me(r[i], s[i]);
							else Me(e, d);
						return 0 < (s = ve(d, "script")).length && ge(s, !u && ve(e, "script")), d
					},
					cleanData: function (e) {
						for (var t, n, i, o = C.event.special, r = 0; void 0 !== (n = e[r]); r++)
							if (X(n)) {
								if (t = n[Q.expando]) {
									if (t.events)
										for (i in t.events) o[i] ? C.event.remove(n, i) : C.removeEvent(n, i, t.handle);
									n[Q.expando] = void 0
								}
								n[G.expando] && (n[G.expando] = void 0)
							}
					}
				}), C.fn.extend({
					detach: function (e) {
						return Ie(this, e, !0)
					},
					remove: function (e) {
						return Ie(this, e)
					},
					text: function (e) {
						return W(this, function (e) {
							return void 0 === e ? C.text(this) : this.empty().each(function () {
								1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
							})
						}, null, e, arguments.length)
					},
					append: function () {
						return Re(this, arguments, function (e) {
							1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Le(this, e).appendChild(e)
						})
					},
					prepend: function () {
						return Re(this, arguments, function (e) {
							if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
								var t = Le(this, e);
								t.insertBefore(e, t.firstChild)
							}
						})
					},
					before: function () {
						return Re(this, arguments, function (e) {
							this.parentNode && this.parentNode.insertBefore(e, this)
						})
					},
					after: function () {
						return Re(this, arguments, function (e) {
							this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
						})
					},
					empty: function () {
						for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (C.cleanData(ve(e, !1)), e.textContent = "");
						return this
					},
					clone: function (e, t) {
						return e = null != e && e, t = null == t ? e : t, this.map(function () {
							return C.clone(this, e, t)
						})
					},
					html: function (e) {
						return W(this, function (e) {
							var t = this[0] || {},
								n = 0,
								i = this.length;
							if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
							if ("string" == typeof e && !je.test(e) && !he[(pe.exec(e) || ["", ""])[1].toLowerCase()]) {
								e = C.htmlPrefilter(e);
								try {
									for (; n < i; n++) 1 === (t = this[n] || {}).nodeType && (C.cleanData(ve(t, !1)), t.innerHTML = e);
									t = 0
								} catch (e) {}
							}
							t && this.empty().append(e)
						}, null, e, arguments.length)
					},
					replaceWith: function () {
						var n = [];
						return Re(this, arguments, function (e) {
							var t = this.parentNode;
							C.inArray(this, n) < 0 && (C.cleanData(ve(this)), t && t.replaceChild(e, this))
						}, n)
					}
				}), C.each({
					appendTo: "append",
					prependTo: "prepend",
					insertBefore: "before",
					insertAfter: "after",
					replaceAll: "replaceWith"
				}, function (e, s) {
					C.fn[e] = function (e) {
						for (var t, n = [], i = C(e), o = i.length - 1, r = 0; r <= o; r++) t = r === o ? this : this.clone(!0), C(i[r])[s](t), l.apply(n, t.get());
						return this.pushStack(n)
					}
				});
				var qe, ze, _e, We, Fe, Be, Ue, Ye = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
					Xe = function (e) {
						var t = e.ownerDocument.defaultView;
						return t && t.opener || (t = x), t.getComputedStyle(e)
					},
					Ve = new RegExp(ne.join("|"), "i");

				function Qe() {
					if (Ue) {
						Be.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", Ue.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", ie.appendChild(Be).appendChild(Ue);
						var e = x.getComputedStyle(Ue);
						qe = "1%" !== e.top, Fe = 12 === Ge(e.marginLeft), Ue.style.right = "60%", We = 36 === Ge(e.right), ze = 36 === Ge(e.width), Ue.style.position = "absolute", _e = 12 === Ge(Ue.offsetWidth / 3), ie.removeChild(Be), Ue = null
					}
				}

				function Ge(e) {
					return Math.round(parseFloat(e))
				}

				function Je(e, t, n) {
					var i, o, r, s, a = e.style;
					return (n = n || Xe(e)) && ("" !== (s = n.getPropertyValue(t) || n[t]) || oe(e) || (s = C.style(e, t)), !m.pixelBoxStyles() && Ye.test(s) && Ve.test(t) && (i = a.width, o = a.minWidth, r = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, a.minWidth = o, a.maxWidth = r)), void 0 !== s ? s + "" : s
				}

				function Ke(e, t) {
					return {
						get: function () {
							if (!e()) return (this.get = t).apply(this, arguments);
							delete this.get
						}
					}
				}
				Be = k.createElement("div"), (Ue = k.createElement("div")).style && (Ue.style.backgroundClip = "content-box", Ue.cloneNode(!0).style.backgroundClip = "", m.clearCloneStyle = "content-box" === Ue.style.backgroundClip, C.extend(m, {
					boxSizingReliable: function () {
						return Qe(), ze
					},
					pixelBoxStyles: function () {
						return Qe(), We
					},
					pixelPosition: function () {
						return Qe(), qe
					},
					reliableMarginLeft: function () {
						return Qe(), Fe
					},
					scrollboxSize: function () {
						return Qe(), _e
					}
				}));
				var Ze = ["Webkit", "Moz", "ms"],
					et = k.createElement("div").style,
					tt = {};

				function nt(e) {
					var t = C.cssProps[e] || tt[e];
					return t || (e in et ? e : tt[e] = function (e) {
						for (var t = e[0].toUpperCase() + e.slice(1), n = Ze.length; n--;)
							if ((e = Ze[n] + t) in et) return e
					}(e) || e)
				}
				var it = /^(none|table(?!-c[ea]).+)/,
					ot = /^--/,
					rt = {
						position: "absolute",
						visibility: "hidden",
						display: "block"
					},
					st = {
						letterSpacing: "0",
						fontWeight: "400"
					};

				function at(e, t, n) {
					var i = te.exec(t);
					return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : t
				}

				function lt(e, t, n, i, o, r) {
					var s = "width" === t ? 1 : 0,
						a = 0,
						l = 0;
					if (n === (i ? "border" : "content")) return 0;
					for (; s < 4; s += 2) "margin" === n && (l += C.css(e, n + ne[s], !0, o)), i ? ("content" === n && (l -= C.css(e, "padding" + ne[s], !0, o)), "margin" !== n && (l -= C.css(e, "border" + ne[s] + "Width", !0, o))) : (l += C.css(e, "padding" + ne[s], !0, o), "padding" !== n ? l += C.css(e, "border" + ne[s] + "Width", !0, o) : a += C.css(e, "border" + ne[s] + "Width", !0, o));
					return !i && 0 <= r && (l += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - r - l - a - .5)) || 0), l
				}

				function ct(e, t, n) {
					var i = Xe(e),
						o = (!m.boxSizingReliable() || n) && "border-box" === C.css(e, "boxSizing", !1, i),
						r = o,
						s = Je(e, t, i),
						a = "offset" + t[0].toUpperCase() + t.slice(1);
					if (Ye.test(s)) {
						if (!n) return s;
						s = "auto"
					}
					return (!m.boxSizingReliable() && o || "auto" === s || !parseFloat(s) && "inline" === C.css(e, "display", !1, i)) && e.getClientRects().length && (o = "border-box" === C.css(e, "boxSizing", !1, i), (r = a in e) && (s = e[a])), (s = parseFloat(s) || 0) + lt(e, t, n || (o ? "border" : "content"), r, i, s) + "px"
				}

				function dt(e, t, n, i, o) {
					return new dt.prototype.init(e, t, n, i, o)
				}
				C.extend({
					cssHooks: {
						opacity: {
							get: function (e, t) {
								if (t) {
									var n = Je(e, "opacity");
									return "" === n ? "1" : n
								}
							}
						}
					},
					cssNumber: {
						animationIterationCount: !0,
						columnCount: !0,
						fillOpacity: !0,
						flexGrow: !0,
						flexShrink: !0,
						fontWeight: !0,
						gridArea: !0,
						gridColumn: !0,
						gridColumnEnd: !0,
						gridColumnStart: !0,
						gridRow: !0,
						gridRowEnd: !0,
						gridRowStart: !0,
						lineHeight: !0,
						opacity: !0,
						order: !0,
						orphans: !0,
						widows: !0,
						zIndex: !0,
						zoom: !0
					},
					cssProps: {},
					style: function (e, t, n, i) {
						if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
							var o, r, s, a = Y(t),
								l = ot.test(t),
								c = e.style;
							if (l || (t = nt(a)), s = C.cssHooks[t] || C.cssHooks[a], void 0 === n) return s && "get" in s && void 0 !== (o = s.get(e, !1, i)) ? o : c[t];
							"string" === (r = an(n)) && (o = te.exec(n)) && o[1] && (n = le(e, t, o), r = "number"), null != n && n == n && ("number" !== r || l || (n += o && o[3] || (C.cssNumber[a] ? "" : "px")), m.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), s && "set" in s && void 0 === (n = s.set(e, n, i)) || (l ? c.setProperty(t, n) : c[t] = n))
						}
					},
					css: function (e, t, n, i) {
						var o, r, s, a = Y(t);
						return ot.test(t) || (t = nt(a)), (s = C.cssHooks[t] || C.cssHooks[a]) && "get" in s && (o = s.get(e, !0, n)), void 0 === o && (o = Je(e, t, i)), "normal" === o && t in st && (o = st[t]), "" === n || n ? (r = parseFloat(o), !0 === n || isFinite(r) ? r || 0 : o) : o
					}
				}), C.each(["height", "width"], function (e, l) {
					C.cssHooks[l] = {
						get: function (e, t, n) {
							if (t) return !it.test(C.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? ct(e, l, n) : se(e, rt, function () {
								return ct(e, l, n)
							})
						},
						set: function (e, t, n) {
							var i, o = Xe(e),
								r = !m.scrollboxSize() && "absolute" === o.position,
								s = (r || n) && "border-box" === C.css(e, "boxSizing", !1, o),
								a = n ? lt(e, l, n, s, o) : 0;
							return s && r && (a -= Math.ceil(e["offset" + l[0].toUpperCase() + l.slice(1)] - parseFloat(o[l]) - lt(e, l, "border", !1, o) - .5)), a && (i = te.exec(t)) && "px" !== (i[3] || "px") && (e.style[l] = t, t = C.css(e, l)), at(0, t, a)
						}
					}
				}), C.cssHooks.marginLeft = Ke(m.reliableMarginLeft, function (e, t) {
					if (t) return (parseFloat(Je(e, "marginLeft")) || e.getBoundingClientRect().left - se(e, {
						marginLeft: 0
					}, function () {
						return e.getBoundingClientRect().left
					})) + "px"
				}), C.each({
					margin: "",
					padding: "",
					border: "Width"
				}, function (o, r) {
					C.cssHooks[o + r] = {
						expand: function (e) {
							for (var t = 0, n = {}, i = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) n[o + ne[t] + r] = i[t] || i[t - 2] || i[0];
							return n
						}
					}, "margin" !== o && (C.cssHooks[o + r].set = at)
				}), C.fn.extend({
					css: function (e, t) {
						return W(this, function (e, t, n) {
							var i, o, r = {},
								s = 0;
							if (Array.isArray(t)) {
								for (i = Xe(e), o = t.length; s < o; s++) r[t[s]] = C.css(e, t[s], !1, i);
								return r
							}
							return void 0 !== n ? C.style(e, t, n) : C.css(e, t)
						}, e, t, 1 < arguments.length)
					}
				}), ((C.Tween = dt).prototype = {
					constructor: dt,
					init: function (e, t, n, i, o, r) {
						this.elem = e, this.prop = n, this.easing = o || C.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = r || (C.cssNumber[n] ? "" : "px")
					},
					cur: function () {
						var e = dt.propHooks[this.prop];
						return e && e.get ? e.get(this) : dt.propHooks._default.get(this)
					},
					run: function (e) {
						var t, n = dt.propHooks[this.prop];
						return this.options.duration ? this.pos = t = C.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : dt.propHooks._default.set(this), this
					}
				}).init.prototype = dt.prototype, (dt.propHooks = {
					_default: {
						get: function (e) {
							var t;
							return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = C.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
						},
						set: function (e) {
							C.fx.step[e.prop] ? C.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !C.cssHooks[e.prop] && null == e.elem.style[nt(e.prop)] ? e.elem[e.prop] = e.now : C.style(e.elem, e.prop, e.now + e.unit)
						}
					}
				}).scrollTop = dt.propHooks.scrollLeft = {
					set: function (e) {
						e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
					}
				}, C.easing = {
					linear: function (e) {
						return e
					},
					swing: function (e) {
						return .5 - Math.cos(e * Math.PI) / 2
					},
					_default: "swing"
				}, C.fx = dt.prototype.init, C.fx.step = {};
				var ut, pt, ft, ht, vt = /^(?:toggle|show|hide)$/,
					gt = /queueHooks$/;

				function yt() {
					pt && (!1 === k.hidden && x.requestAnimationFrame ? x.requestAnimationFrame(yt) : x.setTimeout(yt, C.fx.interval), C.fx.tick())
				}

				function mt() {
					return x.setTimeout(function () {
						ut = void 0
					}), ut = Date.now()
				}

				function wt(e, t) {
					var n, i = 0,
						o = {
							height: e
						};
					for (t = t ? 1 : 0; i < 4; i += 2 - t) o["margin" + (n = ne[i])] = o["padding" + n] = e;
					return t && (o.opacity = o.width = e), o
				}

				function bt(e, t, n) {
					for (var i, o = (Tt.tweeners[t] || []).concat(Tt.tweeners["*"]), r = 0, s = o.length; r < s; r++)
						if (i = o[r].call(n, t, e)) return i
				}

				function Tt(r, e, t) {
					var n, s, i = 0,
						o = Tt.prefilters.length,
						a = C.Deferred().always(function () {
							delete l.elem
						}),
						l = function () {
							if (s) return !1;
							for (var e = ut || mt(), t = Math.max(0, c.startTime + c.duration - e), n = 1 - (t / c.duration || 0), i = 0, o = c.tweens.length; i < o; i++) c.tweens[i].run(n);
							return a.notifyWith(r, [c, n, t]), n < 1 && o ? t : (o || a.notifyWith(r, [c, 1, 0]), a.resolveWith(r, [c]), !1)
						},
						c = a.promise({
							elem: r,
							props: C.extend({}, e),
							opts: C.extend(!0, {
								specialEasing: {},
								easing: C.easing._default
							}, t),
							originalProperties: e,
							originalOptions: t,
							startTime: ut || mt(),
							duration: t.duration,
							tweens: [],
							createTween: function (e, t) {
								var n = C.Tween(r, c.opts, e, t, c.opts.specialEasing[e] || c.opts.easing);
								return c.tweens.push(n), n
							},
							stop: function (e) {
								var t = 0,
									n = e ? c.tweens.length : 0;
								if (s) return this;
								for (s = !0; t < n; t++) c.tweens[t].run(1);
								return e ? (a.notifyWith(r, [c, 1, 0]), a.resolveWith(r, [c, e])) : a.rejectWith(r, [c, e]), this
							}
						}),
						d = c.props;
					for (! function (e, t) {
						var n, i, o, r, s;
						for (n in e)
							if (o = t[i = Y(n)], r = e[n], Array.isArray(r) && (o = r[1], r = e[n] = r[0]), n !== i && (e[i] = r, delete e[n]), (s = C.cssHooks[i]) && "expand" in s)
								for (n in r = s.expand(r), delete e[i], r) n in e || (e[n] = r[n], t[n] = o);
							else t[i] = o
					}(d, c.opts.specialEasing); i < o; i++)
						if (n = Tt.prefilters[i].call(c, r, d, c.opts)) return w(n.stop) && (C._queueHooks(c.elem, c.opts.queue).stop = n.stop.bind(n)), n;
					return C.map(d, bt, c), w(c.opts.start) && c.opts.start.call(r, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), C.fx.timer(C.extend(l, {
						elem: r,
						anim: c,
						queue: c.opts.queue
					})), c
				}
				C.Animation = C.extend(Tt, {
					tweeners: {
						"*": [
							function (e, t) {
								var n = this.createTween(e, t);
								return le(n.elem, e, te.exec(t), n), n
							}
						]
					},
					tweener: function (e, t) {
						for (var n, i = 0, o = (e = w(e) ? (t = e, ["*"]) : e.match(H)).length; i < o; i++) n = e[i], Tt.tweeners[n] = Tt.tweeners[n] || [], Tt.tweeners[n].unshift(t)
					},
					prefilters: [
						function (e, t, n) {
							var i, o, r, s, a, l, c, d, u = "width" in t || "height" in t,
								p = this,
								f = {},
								h = e.style,
								v = e.nodeType && ae(e),
								g = Q.get(e, "fxshow");
							for (i in n.queue || (null == (s = C._queueHooks(e, "fx")).unqueued && (s.unqueued = 0, a = s.empty.fire, s.empty.fire = function () {
								s.unqueued || a()
							}), s.unqueued++, p.always(function () {
								p.always(function () {
									s.unqueued--, C.queue(e, "fx").length || s.empty.fire()
								})
							})), t)
								if (o = t[i], vt.test(o)) {
									if (delete t[i], r = r || "toggle" === o, o === (v ? "hide" : "show")) {
										if ("show" !== o || !g || void 0 === g[i]) continue;
										v = !0
									}
									f[i] = g && g[i] || C.style(e, i)
								}
							if ((l = !C.isEmptyObject(t)) || !C.isEmptyObject(f))
								for (i in u && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (c = g && g.display) && (c = Q.get(e, "display")), "none" === (d = C.css(e, "display")) && (c ? d = c : (de([e], !0), c = e.style.display || c, d = C.css(e, "display"), de([e]))), ("inline" === d || "inline-block" === d && null != c) && "none" === C.css(e, "float") && (l || (p.done(function () {
									h.display = c
								}), null == c && (d = h.display, c = "none" === d ? "" : d)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", p.always(function () {
									h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
								})), l = !1, f) l || (g ? "hidden" in g && (v = g.hidden) : g = Q.access(e, "fxshow", {
									display: c
								}), r && (g.hidden = !v), v && de([e], !0), p.done(function () {
									for (i in v || de([e]), Q.remove(e, "fxshow"), f) C.style(e, i, f[i])
								})), l = bt(v ? g[i] : 0, i, p), i in g || (g[i] = l.start, v && (l.end = l.start, l.start = 0))
						}
					],
					prefilter: function (e, t) {
						t ? Tt.prefilters.unshift(e) : Tt.prefilters.push(e)
					}
				}), C.speed = function (e, t, n) {
					var i = e && "object" === an(e) ? C.extend({}, e) : {
						complete: n || !n && t || w(e) && e,
						duration: e,
						easing: n && t || t && !w(t) && t
					};
					return C.fx.off ? i.duration = 0 : "number" != typeof i.duration && (i.duration in C.fx.speeds ? i.duration = C.fx.speeds[i.duration] : i.duration = C.fx.speeds._default), null != i.queue && !0 !== i.queue || (i.queue = "fx"), i.old = i.complete, i.complete = function () {
						w(i.old) && i.old.call(this), i.queue && C.dequeue(this, i.queue)
					}, i
				}, C.fn.extend({
					fadeTo: function (e, t, n, i) {
						return this.filter(ae).css("opacity", 0).show().end().animate({
							opacity: t
						}, e, n, i)
					},
					animate: function (t, e, n, i) {
						function o() {
							var e = Tt(this, C.extend({}, t), s);
							(r || Q.get(this, "finish")) && e.stop(!0)
						}
						var r = C.isEmptyObject(t),
							s = C.speed(e, n, i);
						return o.finish = o, r || !1 === s.queue ? this.each(o) : this.queue(s.queue, o)
					},
					stop: function (o, e, r) {
						function s(e) {
							var t = e.stop;
							delete e.stop, t(r)
						}
						return "string" != typeof o && (r = e, e = o, o = void 0), e && !1 !== o && this.queue(o || "fx", []), this.each(function () {
							var e = !0,
								t = null != o && o + "queueHooks",
								n = C.timers,
								i = Q.get(this);
							if (t) i[t] && i[t].stop && s(i[t]);
							else
								for (t in i) i[t] && i[t].stop && gt.test(t) && s(i[t]);
							for (t = n.length; t--;) n[t].elem !== this || null != o && n[t].queue !== o || (n[t].anim.stop(r), e = !1, n.splice(t, 1));
							!e && r || C.dequeue(this, o)
						})
					},
					finish: function (s) {
						return !1 !== s && (s = s || "fx"), this.each(function () {
							var e, t = Q.get(this),
								n = t[s + "queue"],
								i = t[s + "queueHooks"],
								o = C.timers,
								r = n ? n.length : 0;
							for (t.finish = !0, C.queue(this, s, []), i && i.stop && i.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === s && (o[e].anim.stop(!0), o.splice(e, 1));
							for (e = 0; e < r; e++) n[e] && n[e].finish && n[e].finish.call(this);
							delete t.finish
						})
					}
				}), C.each(["toggle", "show", "hide"], function (e, i) {
					var o = C.fn[i];
					C.fn[i] = function (e, t, n) {
						return null == e || "boolean" == typeof e ? o.apply(this, arguments) : this.animate(wt(i, !0), e, t, n)
					}
				}), C.each({
					slideDown: wt("show"),
					slideUp: wt("hide"),
					slideToggle: wt("toggle"),
					fadeIn: {
						opacity: "show"
					},
					fadeOut: {
						opacity: "hide"
					},
					fadeToggle: {
						opacity: "toggle"
					}
				}, function (e, i) {
					C.fn[e] = function (e, t, n) {
						return this.animate(i, e, t, n)
					}
				}), C.timers = [], C.fx.tick = function () {
					var e, t = 0,
						n = C.timers;
					for (ut = Date.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
					n.length || C.fx.stop(), ut = void 0
				}, C.fx.timer = function (e) {
					C.timers.push(e), C.fx.start()
				}, C.fx.interval = 13, C.fx.start = function () {
					pt || (pt = !0, yt())
				}, C.fx.stop = function () {
					pt = null
				}, C.fx.speeds = {
					slow: 600,
					fast: 200,
					_default: 400
				}, C.fn.delay = function (i, e) {
					return i = C.fx && C.fx.speeds[i] || i, e = e || "fx", this.queue(e, function (e, t) {
						var n = x.setTimeout(e, i);
						t.stop = function () {
							x.clearTimeout(n)
						}
					})
				}, ft = k.createElement("input"), ht = k.createElement("select").appendChild(k.createElement("option")), ft.type = "checkbox", m.checkOn = "" !== ft.value, m.optSelected = ht.selected, (ft = k.createElement("input")).value = "t", ft.type = "radio", m.radioValue = "t" === ft.value;
				var St, xt = C.expr.attrHandle;
				C.fn.extend({
					attr: function (e, t) {
						return W(this, C.attr, e, t, 1 < arguments.length)
					},
					removeAttr: function (e) {
						return this.each(function () {
							C.removeAttr(this, e)
						})
					}
				}), C.extend({
					attr: function (e, t, n) {
						var i, o, r = e.nodeType;
						if (3 !== r && 8 !== r && 2 !== r) return void 0 === e.getAttribute ? C.prop(e, t, n) : (1 === r && C.isXMLDoc(e) || (o = C.attrHooks[t.toLowerCase()] || (C.expr.match.bool.test(t) ? St : void 0)), void 0 !== n ? null === n ? void C.removeAttr(e, t) : o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : (e.setAttribute(t, n + ""), n) : o && "get" in o && null !== (i = o.get(e, t)) ? i : null == (i = C.find.attr(e, t)) ? void 0 : i)
					},
					attrHooks: {
						type: {
							set: function (e, t) {
								if (!m.radioValue && "radio" === t && $(e, "input")) {
									var n = e.value;
									return e.setAttribute("type", t), n && (e.value = n), t
								}
							}
						}
					},
					removeAttr: function (e, t) {
						var n, i = 0,
							o = t && t.match(H);
						if (o && 1 === e.nodeType)
							for (; n = o[i++];) e.removeAttribute(n)
					}
				}), St = {
					set: function (e, t, n) {
						return !1 === t ? C.removeAttr(e, n) : e.setAttribute(n, n), n
					}
				}, C.each(C.expr.match.bool.source.match(/\w+/g), function (e, t) {
					var s = xt[t] || C.find.attr;
					xt[t] = function (e, t, n) {
						var i, o, r = t.toLowerCase();
						return n || (o = xt[r], xt[r] = i, i = null != s(e, t, n) ? r : null, xt[r] = o), i
					}
				});
				var kt = /^(?:input|select|textarea|button)$/i,
					Ct = /^(?:a|area)$/i;

				function Et(e) {
					return (e.match(H) || []).join(" ")
				}

				function $t(e) {
					return e.getAttribute && e.getAttribute("class") || ""
				}

				function At(e) {
					return Array.isArray(e) ? e : "string" == typeof e && e.match(H) || []
				}
				C.fn.extend({
					prop: function (e, t) {
						return W(this, C.prop, e, t, 1 < arguments.length)
					},
					removeProp: function (e) {
						return this.each(function () {
							delete this[C.propFix[e] || e]
						})
					}
				}), C.extend({
					prop: function (e, t, n) {
						var i, o, r = e.nodeType;
						if (3 !== r && 8 !== r && 2 !== r) return 1 === r && C.isXMLDoc(e) || (t = C.propFix[t] || t, o = C.propHooks[t]), void 0 !== n ? o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : e[t] = n : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t]
					},
					propHooks: {
						tabIndex: {
							get: function (e) {
								var t = C.find.attr(e, "tabindex");
								return t ? parseInt(t, 10) : kt.test(e.nodeName) || Ct.test(e.nodeName) && e.href ? 0 : -1
							}
						}
					},
					propFix: {
						for: "htmlFor",
						class: "className"
					}
				}), m.optSelected || (C.propHooks.selected = {
					get: function (e) {
						var t = e.parentNode;
						return t && t.parentNode && t.parentNode.selectedIndex, null
					},
					set: function (e) {
						var t = e.parentNode;
						t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
					}
				}), C.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
					C.propFix[this.toLowerCase()] = this
				}), C.fn.extend({
					addClass: function (t) {
						var e, n, i, o, r, s, a, l = 0;
						if (w(t)) return this.each(function (e) {
							C(this).addClass(t.call(this, e, $t(this)))
						});
						if ((e = At(t)).length)
							for (; n = this[l++];)
								if (o = $t(n), i = 1 === n.nodeType && " " + Et(o) + " ") {
									for (s = 0; r = e[s++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
									o !== (a = Et(i)) && n.setAttribute("class", a)
								}
						return this
					},
					removeClass: function (t) {
						var e, n, i, o, r, s, a, l = 0;
						if (w(t)) return this.each(function (e) {
							C(this).removeClass(t.call(this, e, $t(this)))
						});
						if (!arguments.length) return this.attr("class", "");
						if ((e = At(t)).length)
							for (; n = this[l++];)
								if (o = $t(n), i = 1 === n.nodeType && " " + Et(o) + " ") {
									for (s = 0; r = e[s++];)
										for (; - 1 < i.indexOf(" " + r + " ");) i = i.replace(" " + r + " ", " ");
									o !== (a = Et(i)) && n.setAttribute("class", a)
								}
						return this
					},
					toggleClass: function (o, t) {
						var r = an(o),
							s = "string" === r || Array.isArray(o);
						return "boolean" == typeof t && s ? t ? this.addClass(o) : this.removeClass(o) : w(o) ? this.each(function (e) {
							C(this).toggleClass(o.call(this, e, $t(this), t), t)
						}) : this.each(function () {
							var e, t, n, i;
							if (s)
								for (t = 0, n = C(this), i = At(o); e = i[t++];) n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
							else void 0 !== o && "boolean" !== r || ((e = $t(this)) && Q.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === o ? "" : Q.get(this, "__className__") || ""))
						})
					},
					hasClass: function (e) {
						var t, n, i = 0;
						for (t = " " + e + " "; n = this[i++];)
							if (1 === n.nodeType && -1 < (" " + Et($t(n)) + " ").indexOf(t)) return !0;
						return !1
					}
				});
				var Ot = /\r/g;
				C.fn.extend({
					val: function (n) {
						var i, e, o, t = this[0];
						return arguments.length ? (o = w(n), this.each(function (e) {
							var t;
							1 === this.nodeType && (null == (t = o ? n.call(this, e, C(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = C.map(t, function (e) {
								return null == e ? "" : e + ""
							})), (i = C.valHooks[this.type] || C.valHooks[this.nodeName.toLowerCase()]) && "set" in i && void 0 !== i.set(this, t, "value") || (this.value = t))
						})) : t ? (i = C.valHooks[t.type] || C.valHooks[t.nodeName.toLowerCase()]) && "get" in i && void 0 !== (e = i.get(t, "value")) ? e : "string" == typeof (e = t.value) ? e.replace(Ot, "") : null == e ? "" : e : void 0
					}
				}), C.extend({
					valHooks: {
						option: {
							get: function (e) {
								var t = C.find.attr(e, "value");
								return null != t ? t : Et(C.text(e))
							}
						},
						select: {
							get: function (e) {
								var t, n, i, o = e.options,
									r = e.selectedIndex,
									s = "select-one" === e.type,
									a = s ? null : [],
									l = s ? r + 1 : o.length;
								for (i = r < 0 ? l : s ? r : 0; i < l; i++)
									if (((n = o[i]).selected || i === r) && !n.disabled && (!n.parentNode.disabled || !$(n.parentNode, "optgroup"))) {
										if (t = C(n).val(), s) return t;
										a.push(t)
									}
								return a
							},
							set: function (e, t) {
								for (var n, i, o = e.options, r = C.makeArray(t), s = o.length; s--;)((i = o[s]).selected = -1 < C.inArray(C.valHooks.option.get(i), r)) && (n = !0);
								return n || (e.selectedIndex = -1), r
							}
						}
					}
				}), C.each(["radio", "checkbox"], function () {
					C.valHooks[this] = {
						set: function (e, t) {
							if (Array.isArray(t)) return e.checked = -1 < C.inArray(C(e).val(), t)
						}
					}, m.checkOn || (C.valHooks[this].get = function (e) {
						return null === e.getAttribute("value") ? "on" : e.value
					})
				}), m.focusin = "onfocusin" in x;

				function jt(e) {
					e.stopPropagation()
				}
				var Pt = /^(?:focusinfocus|focusoutblur)$/;
				C.extend(C.event, {
					trigger: function (e, t, n, i) {
						var o, r, s, a, l, c, d, u, p = [n || k],
							f = y.call(e, "type") ? e.type : e,
							h = y.call(e, "namespace") ? e.namespace.split(".") : [];
						if (r = u = s = n = n || k, 3 !== n.nodeType && 8 !== n.nodeType && !Pt.test(f + C.event.triggered) && (-1 < f.indexOf(".") && (f = (h = f.split(".")).shift(), h.sort()), l = f.indexOf(":") < 0 && "on" + f, (e = e[C.expando] ? e : new C.Event(f, "object" === an(e) && e)).isTrigger = i ? 2 : 3, e.namespace = h.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : C.makeArray(t, [e]), d = C.event.special[f] || {}, i || !d.trigger || !1 !== d.trigger.apply(n, t))) {
							if (!i && !d.noBubble && !v(n)) {
								for (a = d.delegateType || f, Pt.test(a + f) || (r = r.parentNode); r; r = r.parentNode) p.push(r), s = r;
								s === (n.ownerDocument || k) && p.push(s.defaultView || s.parentWindow || x)
							}
							for (o = 0;
								(r = p[o++]) && !e.isPropagationStopped();) u = r, e.type = 1 < o ? a : d.bindType || f, (c = (Q.get(r, "events") || {})[e.type] && Q.get(r, "handle")) && c.apply(r, t), (c = l && r[l]) && c.apply && X(r) && (e.result = c.apply(r, t), !1 === e.result && e.preventDefault());
							return e.type = f, i || e.isDefaultPrevented() || d._default && !1 !== d._default.apply(p.pop(), t) || !X(n) || l && w(n[f]) && !v(n) && ((s = n[l]) && (n[l] = null), C.event.triggered = f, e.isPropagationStopped() && u.addEventListener(f, jt), n[f](), e.isPropagationStopped() && u.removeEventListener(f, jt), C.event.triggered = void 0, s && (n[l] = s)), e.result
						}
					},
					simulate: function (e, t, n) {
						var i = C.extend(new C.Event, n, {
							type: e,
							isSimulated: !0
						});
						C.event.trigger(i, null, t)
					}
				}), C.fn.extend({
					trigger: function (e, t) {
						return this.each(function () {
							C.event.trigger(e, t, this)
						})
					},
					triggerHandler: function (e, t) {
						var n = this[0];
						if (n) return C.event.trigger(e, t, n, !0)
					}
				}), m.focusin || C.each({
					focus: "focusin",
					blur: "focusout"
				}, function (n, i) {
					function o(e) {
						C.event.simulate(i, e.target, C.event.fix(e))
					}
					C.event.special[i] = {
						setup: function () {
							var e = this.ownerDocument || this,
								t = Q.access(e, i);
							t || e.addEventListener(n, o, !0), Q.access(e, i, (t || 0) + 1)
						},
						teardown: function () {
							var e = this.ownerDocument || this,
								t = Q.access(e, i) - 1;
							t ? Q.access(e, i, t) : (e.removeEventListener(n, o, !0), Q.remove(e, i))
						}
					}
				});
				var Nt = x.location,
					Lt = Date.now(),
					Dt = /\?/;
				C.parseXML = function (e) {
					var t;
					if (!e || "string" != typeof e) return null;
					try {
						t = (new x.DOMParser).parseFromString(e, "text/xml")
					} catch (e) {
						t = void 0
					}
					return t && !t.getElementsByTagName("parsererror").length || C.error("Invalid XML: " + e), t
				};
				var Ht = /\[\]$/,
					Mt = /\r?\n/g,
					Rt = /^(?:submit|button|image|reset|file)$/i,
					It = /^(?:input|select|textarea|keygen)/i;

				function qt(n, e, i, o) {
					var t;
					if (Array.isArray(e)) C.each(e, function (e, t) {
						i || Ht.test(n) ? o(n, t) : qt(n + "[" + ("object" === an(t) && null != t ? e : "") + "]", t, i, o)
					});
					else if (i || "object" !== T(e)) o(n, e);
					else
						for (t in e) qt(n + "[" + t + "]", e[t], i, o)
				}
				C.param = function (e, t) {
					function n(e, t) {
						var n = w(t) ? t() : t;
						o[o.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
					}
					var i, o = [];
					if (null == e) return "";
					if (Array.isArray(e) || e.jquery && !C.isPlainObject(e)) C.each(e, function () {
						n(this.name, this.value)
					});
					else
						for (i in e) qt(i, e[i], t, n);
					return o.join("&")
				}, C.fn.extend({
					serialize: function () {
						return C.param(this.serializeArray())
					},
					serializeArray: function () {
						return this.map(function () {
							var e = C.prop(this, "elements");
							return e ? C.makeArray(e) : this
						}).filter(function () {
							var e = this.type;
							return this.name && !C(this).is(":disabled") && It.test(this.nodeName) && !Rt.test(e) && (this.checked || !ue.test(e))
						}).map(function (e, t) {
							var n = C(this).val();
							return null == n ? null : Array.isArray(n) ? C.map(n, function (e) {
								return {
									name: t.name,
									value: e.replace(Mt, "\r\n")
								}
							}) : {
								name: t.name,
								value: n.replace(Mt, "\r\n")
							}
						}).get()
					}
				});
				var zt = /%20/g,
					_t = /#.*$/,
					Wt = /([?&])_=[^&]*/,
					Ft = /^(.*?):[ \t]*([^\r\n]*)$/gm,
					Bt = /^(?:GET|HEAD)$/,
					Ut = /^\/\//,
					Yt = {},
					Xt = {},
					Vt = "*/".concat("*"),
					Qt = k.createElement("a");

				function Gt(r) {
					return function (e, t) {
						"string" != typeof e && (t = e, e = "*");
						var n, i = 0,
							o = e.toLowerCase().match(H) || [];
						if (w(t))
							for (; n = o[i++];) "+" === n[0] ? (n = n.slice(1) || "*", (r[n] = r[n] || []).unshift(t)) : (r[n] = r[n] || []).push(t)
					}
				}

				function Jt(t, o, r, s) {
					var a = {},
						l = t === Xt;

					function c(e) {
						var i;
						return a[e] = !0, C.each(t[e] || [], function (e, t) {
							var n = t(o, r, s);
							return "string" != typeof n || l || a[n] ? l ? !(i = n) : void 0 : (o.dataTypes.unshift(n), c(n), !1)
						}), i
					}
					return c(o.dataTypes[0]) || !a["*"] && c("*")
				}

				function Kt(e, t) {
					var n, i, o = C.ajaxSettings.flatOptions || {};
					for (n in t) void 0 !== t[n] && ((o[n] ? e : i = i || {})[n] = t[n]);
					return i && C.extend(!0, e, i), e
				}
				Qt.href = Nt.href, C.extend({
					active: 0,
					lastModified: {},
					etag: {},
					ajaxSettings: {
						url: Nt.href,
						type: "GET",
						isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Nt.protocol),
						global: !0,
						processData: !0,
						async: !0,
						contentType: "application/x-www-form-urlencoded; charset=UTF-8",
						accepts: {
							"*": Vt,
							text: "text/plain",
							html: "text/html",
							xml: "application/xml, text/xml",
							json: "application/json, text/javascript"
						},
						contents: {
							xml: /\bxml\b/,
							html: /\bhtml/,
							json: /\bjson\b/
						},
						responseFields: {
							xml: "responseXML",
							text: "responseText",
							json: "responseJSON"
						},
						converters: {
							"* text": String,
							"text html": !0,
							"text json": JSON.parse,
							"text xml": C.parseXML
						},
						flatOptions: {
							url: !0,
							context: !0
						}
					},
					ajaxSetup: function (e, t) {
						return t ? Kt(Kt(e, C.ajaxSettings), t) : Kt(C.ajaxSettings, e)
					},
					ajaxPrefilter: Gt(Yt),
					ajaxTransport: Gt(Xt),
					ajax: function (e, t) {
						"object" === an(e) && (t = e, e = void 0), t = t || {};
						var d, u, p, n, f, i, h, v, o, r, g = C.ajaxSetup({}, t),
							y = g.context || g,
							m = g.context && (y.nodeType || y.jquery) ? C(y) : C.event,
							w = C.Deferred(),
							b = C.Callbacks("once memory"),
							T = g.statusCode || {},
							s = {},
							a = {},
							l = "canceled",
							S = {
								readyState: 0,
								getResponseHeader: function (e) {
									var t;
									if (h) {
										if (!n)
											for (n = {}; t = Ft.exec(p);) n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2]);
										t = n[e.toLowerCase() + " "]
									}
									return null == t ? null : t.join(", ")
								},
								getAllResponseHeaders: function () {
									return h ? p : null
								},
								setRequestHeader: function (e, t) {
									return null == h && (e = a[e.toLowerCase()] = a[e.toLowerCase()] || e, s[e] = t), this
								},
								overrideMimeType: function (e) {
									return null == h && (g.mimeType = e), this
								},
								statusCode: function (e) {
									var t;
									if (e)
										if (h) S.always(e[S.status]);
										else
											for (t in e) T[t] = [T[t], e[t]];
									return this
								},
								abort: function (e) {
									var t = e || l;
									return d && d.abort(t), c(0, t), this
								}
							};
						if (w.promise(S), g.url = ((e || g.url || Nt.href) + "").replace(Ut, Nt.protocol + "//"), g.type = t.method || t.type || g.method || g.type, g.dataTypes = (g.dataType || "*").toLowerCase().match(H) || [""], null == g.crossDomain) {
							i = k.createElement("a");
							try {
								i.href = g.url, i.href = i.href, g.crossDomain = Qt.protocol + "//" + Qt.host != i.protocol + "//" + i.host
							} catch (e) {
								g.crossDomain = !0
							}
						}
						if (g.data && g.processData && "string" != typeof g.data && (g.data = C.param(g.data, g.traditional)), Jt(Yt, g, t, S), h) return S;
						for (o in (v = C.event && g.global) && 0 == C.active++ && C.event.trigger("ajaxStart"), g.type = g.type.toUpperCase(), g.hasContent = !Bt.test(g.type), u = g.url.replace(_t, ""), g.hasContent ? g.data && g.processData && 0 === (g.contentType || "").indexOf("application/x-www-form-urlencoded") && (g.data = g.data.replace(zt, "+")) : (r = g.url.slice(u.length), g.data && (g.processData || "string" == typeof g.data) && (u += (Dt.test(u) ? "&" : "?") + g.data, delete g.data), !1 === g.cache && (u = u.replace(Wt, "$1"), r = (Dt.test(u) ? "&" : "?") + "_=" + Lt+++r), g.url = u + r), g.ifModified && (C.lastModified[u] && S.setRequestHeader("If-Modified-Since", C.lastModified[u]), C.etag[u] && S.setRequestHeader("If-None-Match", C.etag[u])), (g.data && g.hasContent && !1 !== g.contentType || t.contentType) && S.setRequestHeader("Content-Type", g.contentType), S.setRequestHeader("Accept", g.dataTypes[0] && g.accepts[g.dataTypes[0]] ? g.accepts[g.dataTypes[0]] + ("*" !== g.dataTypes[0] ? ", " + Vt + "; q=0.01" : "") : g.accepts["*"]), g.headers) S.setRequestHeader(o, g.headers[o]);
						if (g.beforeSend && (!1 === g.beforeSend.call(y, S, g) || h)) return S.abort();
						if (l = "abort", b.add(g.complete), S.done(g.success), S.fail(g.error), d = Jt(Xt, g, t, S)) {
							if (S.readyState = 1, v && m.trigger("ajaxSend", [S, g]), h) return S;
							g.async && 0 < g.timeout && (f = x.setTimeout(function () {
								S.abort("timeout")
							}, g.timeout));
							try {
								h = !1, d.send(s, c)
							} catch (e) {
								if (h) throw e;
								c(-1, e)
							}
						} else c(-1, "No Transport");

						function c(e, t, n, i) {
							var o, r, s, a, l, c = t;
							h || (h = !0, f && x.clearTimeout(f), d = void 0, p = i || "", S.readyState = 0 < e ? 4 : 0, o = 200 <= e && e < 300 || 304 === e, n && (a = function (e, t, n) {
								for (var i, o, r, s, a = e.contents, l = e.dataTypes;
									"*" === l[0];) l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
								if (i)
									for (o in a)
										if (a[o] && a[o].test(i)) {
											l.unshift(o);
											break
										}
								if (l[0] in n) r = l[0];
								else {
									for (o in n) {
										if (!l[0] || e.converters[o + " " + l[0]]) {
											r = o;
											break
										}
										s = s || o
									}
									r = r || s
								} if (r) return r !== l[0] && l.unshift(r), n[r]
							}(g, S, n)), a = function (e, t, n, i) {
								var o, r, s, a, l, c = {},
									d = e.dataTypes.slice();
								if (d[1])
									for (s in e.converters) c[s.toLowerCase()] = e.converters[s];
								for (r = d.shift(); r;)
									if (e.responseFields[r] && (n[e.responseFields[r]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = r, r = d.shift())
										if ("*" === r) r = l;
										else if ("*" !== l && l !== r) {
									if (!(s = c[l + " " + r] || c["* " + r]))
										for (o in c)
											if ((a = o.split(" "))[1] === r && (s = c[l + " " + a[0]] || c["* " + a[0]])) {
												!0 === s ? s = c[o] : !0 !== c[o] && (r = a[0], d.unshift(a[1]));
												break
											}
									if (!0 !== s)
										if (s && e.throws) t = s(t);
										else try {
											t = s(t)
										} catch (e) {
											return {
												state: "parsererror",
												error: s ? e : "No conversion from " + l + " to " + r
											}
										}
								}
								return {
									state: "success",
									data: t
								}
							}(g, a, S, o), o ? (g.ifModified && ((l = S.getResponseHeader("Last-Modified")) && (C.lastModified[u] = l), (l = S.getResponseHeader("etag")) && (C.etag[u] = l)), 204 === e || "HEAD" === g.type ? c = "nocontent" : 304 === e ? c = "notmodified" : (c = a.state, r = a.data, o = !(s = a.error))) : (s = c, !e && c || (c = "error", e < 0 && (e = 0))), S.status = e, S.statusText = (t || c) + "", o ? w.resolveWith(y, [r, c, S]) : w.rejectWith(y, [S, c, s]), S.statusCode(T), T = void 0, v && m.trigger(o ? "ajaxSuccess" : "ajaxError", [S, g, o ? r : s]), b.fireWith(y, [S, c]), v && (m.trigger("ajaxComplete", [S, g]), --C.active || C.event.trigger("ajaxStop")))
						}
						return S
					},
					getJSON: function (e, t, n) {
						return C.get(e, t, n, "json")
					},
					getScript: function (e, t) {
						return C.get(e, void 0, t, "script")
					}
				}), C.each(["get", "post"], function (e, o) {
					C[o] = function (e, t, n, i) {
						return w(t) && (i = i || n, n = t, t = void 0), C.ajax(C.extend({
							url: e,
							type: o,
							dataType: i,
							data: t,
							success: n
						}, C.isPlainObject(e) && e))
					}
				}), C._evalUrl = function (e, t) {
					return C.ajax({
						url: e,
						type: "GET",
						dataType: "script",
						cache: !0,
						async: !1,
						global: !1,
						converters: {
							"text script": function () {}
						},
						dataFilter: function (e) {
							C.globalEval(e, t)
						}
					})
				}, C.fn.extend({
					wrapAll: function (e) {
						var t;
						return this[0] && (w(e) && (e = e.call(this[0])), t = C(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
							for (var e = this; e.firstElementChild;) e = e.firstElementChild;
							return e
						}).append(this)), this
					},
					wrapInner: function (n) {
						return w(n) ? this.each(function (e) {
							C(this).wrapInner(n.call(this, e))
						}) : this.each(function () {
							var e = C(this),
								t = e.contents();
							t.length ? t.wrapAll(n) : e.append(n)
						})
					},
					wrap: function (t) {
						var n = w(t);
						return this.each(function (e) {
							C(this).wrapAll(n ? t.call(this, e) : t)
						})
					},
					unwrap: function (e) {
						return this.parent(e).not("body").each(function () {
							C(this).replaceWith(this.childNodes)
						}), this
					}
				}), C.expr.pseudos.hidden = function (e) {
					return !C.expr.pseudos.visible(e)
				}, C.expr.pseudos.visible = function (e) {
					return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
				}, C.ajaxSettings.xhr = function () {
					try {
						return new x.XMLHttpRequest
					} catch (e) {}
				};
				var Zt = {
						0: 200,
						1223: 204
					},
					en = C.ajaxSettings.xhr();
				m.cors = !!en && "withCredentials" in en, m.ajax = en = !!en, C.ajaxTransport(function (o) {
					var r, s;
					if (m.cors || en && !o.crossDomain) return {
						send: function (e, t) {
							var n, i = o.xhr();
							if (i.open(o.type, o.url, o.async, o.username, o.password), o.xhrFields)
								for (n in o.xhrFields) i[n] = o.xhrFields[n];
							for (n in o.mimeType && i.overrideMimeType && i.overrideMimeType(o.mimeType), o.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) i.setRequestHeader(n, e[n]);
							r = function (e) {
								return function () {
									r && (r = s = i.onload = i.onerror = i.onabort = i.ontimeout = i.onreadystatechange = null, "abort" === e ? i.abort() : "error" === e ? "number" != typeof i.status ? t(0, "error") : t(i.status, i.statusText) : t(Zt[i.status] || i.status, i.statusText, "text" !== (i.responseType || "text") || "string" != typeof i.responseText ? {
										binary: i.response
									} : {
										text: i.responseText
									}, i.getAllResponseHeaders()))
								}
							}, i.onload = r(), s = i.onerror = i.ontimeout = r("error"), void 0 !== i.onabort ? i.onabort = s : i.onreadystatechange = function () {
								4 === i.readyState && x.setTimeout(function () {
									r && s()
								})
							}, r = r("abort");
							try {
								i.send(o.hasContent && o.data || null)
							} catch (e) {
								if (r) throw e
							}
						},
						abort: function () {
							r && r()
						}
					}
				}), C.ajaxPrefilter(function (e) {
					e.crossDomain && (e.contents.script = !1)
				}), C.ajaxSetup({
					accepts: {
						script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
					},
					contents: {
						script: /\b(?:java|ecma)script\b/
					},
					converters: {
						"text script": function (e) {
							return C.globalEval(e), e
						}
					}
				}), C.ajaxPrefilter("script", function (e) {
					void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
				}), C.ajaxTransport("script", function (n) {
					var i, o;
					if (n.crossDomain || n.scriptAttrs) return {
						send: function (e, t) {
							i = C("<script>").attr(n.scriptAttrs || {}).prop({
								charset: n.scriptCharset,
								src: n.url
							}).on("load error", o = function (e) {
								i.remove(), o = null, e && t("error" === e.type ? 404 : 200, e.type)
							}), k.head.appendChild(i[0])
						},
						abort: function () {
							o && o()
						}
					}
				});
				var tn, nn = [],
					on = /(=)\?(?=&|$)|\?\?/;
				C.ajaxSetup({
					jsonp: "callback",
					jsonpCallback: function () {
						var e = nn.pop() || C.expando + "_" + Lt++;
						return this[e] = !0, e
					}
				}), C.ajaxPrefilter("json jsonp", function (e, t, n) {
					var i, o, r, s = !1 !== e.jsonp && (on.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && on.test(e.data) && "data");
					if (s || "jsonp" === e.dataTypes[0]) return i = e.jsonpCallback = w(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(on, "$1" + i) : !1 !== e.jsonp && (e.url += (Dt.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function () {
						return r || C.error(i + " was not called"), r[0]
					}, e.dataTypes[0] = "json", o = x[i], x[i] = function () {
						r = arguments
					}, n.always(function () {
						void 0 === o ? C(x).removeProp(i) : x[i] = o, e[i] && (e.jsonpCallback = t.jsonpCallback, nn.push(i)), r && w(o) && o(r[0]), r = o = void 0
					}), "script"
				}), m.createHTMLDocument = ((tn = k.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === tn.childNodes.length), C.parseHTML = function (e, t, n) {
					return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (m.createHTMLDocument ? ((i = (t = k.implementation.createHTMLDocument("")).createElement("base")).href = k.location.href, t.head.appendChild(i)) : t = k), r = !n && [], (o = A.exec(e)) ? [t.createElement(o[1])] : (o = be([e], t, r), r && r.length && C(r).remove(), C.merge([], o.childNodes)));
					var i, o, r
				}, C.fn.load = function (e, t, n) {
					var i, o, r, s = this,
						a = e.indexOf(" ");
					return -1 < a && (i = Et(e.slice(a)), e = e.slice(0, a)), w(t) ? (n = t, t = void 0) : t && "object" === an(t) && (o = "POST"), 0 < s.length && C.ajax({
						url: e,
						type: o || "GET",
						dataType: "html",
						data: t
					}).done(function (e) {
						r = arguments, s.html(i ? C("<div>").append(C.parseHTML(e)).find(i) : e)
					}).always(n && function (e, t) {
						s.each(function () {
							n.apply(this, r || [e.responseText, t, e])
						})
					}), this
				}, C.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
					C.fn[t] = function (e) {
						return this.on(t, e)
					}
				}), C.expr.pseudos.animated = function (t) {
					return C.grep(C.timers, function (e) {
						return t === e.elem
					}).length
				}, C.offset = {
					setOffset: function (e, t, n) {
						var i, o, r, s, a, l, c = C.css(e, "position"),
							d = C(e),
							u = {};
						"static" === c && (e.style.position = "relative"), a = d.offset(), r = C.css(e, "top"), l = C.css(e, "left"), o = ("absolute" === c || "fixed" === c) && -1 < (r + l).indexOf("auto") ? (s = (i = d.position()).top, i.left) : (s = parseFloat(r) || 0, parseFloat(l) || 0), w(t) && (t = t.call(e, n, C.extend({}, a))), null != t.top && (u.top = t.top - a.top + s), null != t.left && (u.left = t.left - a.left + o), "using" in t ? t.using.call(e, u) : d.css(u)
					}
				}, C.fn.extend({
					offset: function (t) {
						if (arguments.length) return void 0 === t ? this : this.each(function (e) {
							C.offset.setOffset(this, t, e)
						});
						var e, n, i = this[0];
						return i ? i.getClientRects().length ? (e = i.getBoundingClientRect(), n = i.ownerDocument.defaultView, {
							top: e.top + n.pageYOffset,
							left: e.left + n.pageXOffset
						}) : {
							top: 0,
							left: 0
						} : void 0
					},
					position: function () {
						if (this[0]) {
							var e, t, n, i = this[0],
								o = {
									top: 0,
									left: 0
								};
							if ("fixed" === C.css(i, "position")) t = i.getBoundingClientRect();
							else {
								for (t = this.offset(), n = i.ownerDocument, e = i.offsetParent || n.documentElement; e && (e === n.body || e === n.documentElement) && "static" === C.css(e, "position");) e = e.parentNode;
								e && e !== i && 1 === e.nodeType && ((o = C(e).offset()).top += C.css(e, "borderTopWidth", !0), o.left += C.css(e, "borderLeftWidth", !0))
							}
							return {
								top: t.top - o.top - C.css(i, "marginTop", !0),
								left: t.left - o.left - C.css(i, "marginLeft", !0)
							}
						}
					},
					offsetParent: function () {
						return this.map(function () {
							for (var e = this.offsetParent; e && "static" === C.css(e, "position");) e = e.offsetParent;
							return e || ie
						})
					}
				}), C.each({
					scrollLeft: "pageXOffset",
					scrollTop: "pageYOffset"
				}, function (t, o) {
					var r = "pageYOffset" === o;
					C.fn[t] = function (e) {
						return W(this, function (e, t, n) {
							var i;
							if (v(e) ? i = e : 9 === e.nodeType && (i = e.defaultView), void 0 === n) return i ? i[o] : e[t];
							i ? i.scrollTo(r ? i.pageXOffset : n, r ? n : i.pageYOffset) : e[t] = n
						}, t, e, arguments.length)
					}
				}), C.each(["top", "left"], function (e, n) {
					C.cssHooks[n] = Ke(m.pixelPosition, function (e, t) {
						if (t) return t = Je(e, n), Ye.test(t) ? C(e).position()[n] + "px" : t
					})
				}), C.each({
					Height: "height",
					Width: "width"
				}, function (s, a) {
					C.each({
						padding: "inner" + s,
						content: a,
						"": "outer" + s
					}, function (i, r) {
						C.fn[r] = function (e, t) {
							var n = arguments.length && (i || "boolean" != typeof e),
								o = i || (!0 === e || !0 === t ? "margin" : "border");
							return W(this, function (e, t, n) {
								var i;
								return v(e) ? 0 === r.indexOf("outer") ? e["inner" + s] : e.document.documentElement["client" + s] : 9 === e.nodeType ? (i = e.documentElement, Math.max(e.body["scroll" + s], i["scroll" + s], e.body["offset" + s], i["offset" + s], i["client" + s])) : void 0 === n ? C.css(e, t, o) : C.style(e, t, n, o)
							}, a, n ? e : void 0, n)
						}
					})
				}), C.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (e, n) {
					C.fn[n] = function (e, t) {
						return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
					}
				}), C.fn.extend({
					hover: function (e, t) {
						return this.mouseenter(e).mouseleave(t || e)
					}
				}), C.fn.extend({
					bind: function (e, t, n) {
						return this.on(e, null, t, n)
					},
					unbind: function (e, t) {
						return this.off(e, null, t)
					},
					delegate: function (e, t, n, i) {
						return this.on(t, e, n, i)
					},
					undelegate: function (e, t, n) {
						return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
					}
				}), C.proxy = function (e, t) {
					var n, i, o;
					if ("string" == typeof t && (n = e[t], t = e, e = n), w(e)) return i = a.call(arguments, 2), (o = function () {
						return e.apply(t || this, i.concat(a.call(arguments)))
					}).guid = e.guid = e.guid || C.guid++, o
				}, C.holdReady = function (e) {
					e ? C.readyWait++ : C.ready(!0)
				}, C.isArray = Array.isArray, C.parseJSON = JSON.parse, C.nodeName = $, C.isFunction = w, C.isWindow = v, C.camelCase = Y, C.type = T, C.now = Date.now, C.isNumeric = function (e) {
					var t = C.type(e);
					return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
				}, "function" == typeof define && define.amd && define("jquery", [], function () {
					return C
				});
				var rn = x.jQuery,
					sn = x.$;
				return C.noConflict = function (e) {
					return x.$ === C && (x.$ = sn), e && x.jQuery === C && (x.jQuery = rn), C
				}, e || (x.jQuery = x.$ = C), C
			}, "object" === (void 0 === t ? "undefined" : an(t)) && "object" === an(t.exports) ? t.exports = i.document ? o(i, !0) : function (e) {
				if (!e.document) throw new Error("jQuery requires a window with a document");
				return o(e)
			} : o(i)
		}, {}
	],
	3: [
		function (e, t, n) {
			"use strict";

			function a(e) {
				return (a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
					return typeof e
				} : function (e) {
					return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
				})(e)
			}
			var i;
			i = function (c) {
				var o, s = window.Slick || {};
				o = 0, (s = function (e, t) {
					var n, i = this;
					i.defaults = {
						accessibility: !0,
						adaptiveHeight: !1,
						appendArrows: c(e),
						appendDots: c(e),
						arrows: !0,
						asNavFor: null,
						prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
						nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
						autoplay: !1,
						autoplaySpeed: 3e3,
						centerMode: !1,
						centerPadding: "50px",
						cssEase: "ease",
						customPaging: function (e, t) {
							return c('<button type="button" />').text(t + 1)
						},
						dots: !1,
						dotsClass: "slick-dots",
						draggable: !0,
						easing: "linear",
						edgeFriction: .35,
						fade: !1,
						focusOnSelect: !1,
						focusOnChange: !1,
						infinite: !0,
						initialSlide: 0,
						lazyLoad: "ondemand",
						mobileFirst: !1,
						pauseOnHover: !0,
						pauseOnFocus: !0,
						pauseOnDotsHover: !1,
						respondTo: "window",
						responsive: null,
						rows: 1,
						rtl: !1,
						slide: "",
						slidesPerRow: 1,
						slidesToShow: 1,
						slidesToScroll: 1,
						speed: 500,
						swipe: !0,
						swipeToSlide: !1,
						touchMove: !0,
						touchThreshold: 5,
						useCSS: !0,
						useTransform: !0,
						variableWidth: !1,
						vertical: !1,
						verticalSwiping: !1,
						waitForAnimate: !0,
						zIndex: 1e3
					}, i.initials = {
						animating: !1,
						dragging: !1,
						autoPlayTimer: null,
						currentDirection: 0,
						currentLeft: null,
						currentSlide: 0,
						direction: 1,
						$dots: null,
						listWidth: null,
						listHeight: null,
						loadIndex: 0,
						$nextArrow: null,
						$prevArrow: null,
						scrolling: !1,
						slideCount: null,
						slideWidth: null,
						$slideTrack: null,
						$slides: null,
						sliding: !1,
						slideOffset: 0,
						swipeLeft: null,
						swiping: !1,
						$list: null,
						touchObject: {},
						transformsEnabled: !1,
						unslicked: !1
					}, c.extend(i, i.initials), i.activeBreakpoint = null, i.animType = null, i.animProp = null, i.breakpoints = [], i.breakpointSettings = [], i.cssTransitions = !1, i.focussed = !1, i.interrupted = !1, i.hidden = "hidden", i.paused = !0, i.positionProp = null, i.respondTo = null, i.rowCount = 1, i.shouldClick = !0, i.$slider = c(e), i.$slidesCache = null, i.transformType = null, i.transitionType = null, i.visibilityChange = "visibilitychange", i.windowWidth = 0, i.windowTimer = null, n = c(e).data("slick") || {}, i.options = c.extend({}, i.defaults, t, n), i.currentSlide = i.options.initialSlide, i.originalSettings = i.options, void 0 !== document.mozHidden ? (i.hidden = "mozHidden", i.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (i.hidden = "webkitHidden", i.visibilityChange = "webkitvisibilitychange"), i.autoPlay = c.proxy(i.autoPlay, i), i.autoPlayClear = c.proxy(i.autoPlayClear, i), i.autoPlayIterator = c.proxy(i.autoPlayIterator, i), i.changeSlide = c.proxy(i.changeSlide, i), i.clickHandler = c.proxy(i.clickHandler, i), i.selectHandler = c.proxy(i.selectHandler, i), i.setPosition = c.proxy(i.setPosition, i), i.swipeHandler = c.proxy(i.swipeHandler, i), i.dragHandler = c.proxy(i.dragHandler, i), i.keyHandler = c.proxy(i.keyHandler, i), i.instanceUid = o++, i.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, i.registerBreakpoints(), i.init(!0)
				}).prototype.activateADA = function () {
					this.$slideTrack.find(".slick-active").attr({
						"aria-hidden": "false"
					}).find("a, input, button, select").attr({
						tabindex: "0"
					})
				}, s.prototype.addSlide = s.prototype.slickAdd = function (e, t, n) {
					var i = this;
					if ("boolean" == typeof t) n = t, t = null;
					else if (t < 0 || t >= i.slideCount) return !1;
					i.unload(), "number" == typeof t ? 0 === t && 0 === i.$slides.length ? c(e).appendTo(i.$slideTrack) : n ? c(e).insertBefore(i.$slides.eq(t)) : c(e).insertAfter(i.$slides.eq(t)) : !0 === n ? c(e).prependTo(i.$slideTrack) : c(e).appendTo(i.$slideTrack), i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.append(i.$slides), i.$slides.each(function (e, t) {
						c(t).attr("data-slick-index", e)
					}), i.$slidesCache = i.$slides, i.reinit()
				}, s.prototype.animateHeight = function () {
					var e = this;
					if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
						var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
						e.$list.animate({
							height: t
						}, e.options.speed)
					}
				}, s.prototype.animateSlide = function (e, t) {
					var n = {},
						i = this;
					i.animateHeight(), !0 === i.options.rtl && !1 === i.options.vertical && (e = -e), !1 === i.transformsEnabled ? !1 === i.options.vertical ? i.$slideTrack.animate({
						left: e
					}, i.options.speed, i.options.easing, t) : i.$slideTrack.animate({
						top: e
					}, i.options.speed, i.options.easing, t) : !1 === i.cssTransitions ? (!0 === i.options.rtl && (i.currentLeft = -i.currentLeft), c({
						animStart: i.currentLeft
					}).animate({
						animStart: e
					}, {
						duration: i.options.speed,
						easing: i.options.easing,
						step: function (e) {
							e = Math.ceil(e), !1 === i.options.vertical ? n[i.animType] = "translate(" + e + "px, 0px)" : n[i.animType] = "translate(0px," + e + "px)", i.$slideTrack.css(n)
						},
						complete: function () {
							t && t.call()
						}
					})) : (i.applyTransition(), e = Math.ceil(e), !1 === i.options.vertical ? n[i.animType] = "translate3d(" + e + "px, 0px, 0px)" : n[i.animType] = "translate3d(0px," + e + "px, 0px)", i.$slideTrack.css(n), t && setTimeout(function () {
						i.disableTransition(), t.call()
					}, i.options.speed))
				}, s.prototype.getNavTarget = function () {
					var e = this.options.asNavFor;
					return e && null !== e && (e = c(e).not(this.$slider)), e
				}, s.prototype.asNavFor = function (t) {
					var e = this.getNavTarget();
					null !== e && "object" === a(e) && e.each(function () {
						var e = c(this).slick("getSlick");
						e.unslicked || e.slideHandler(t, !0)
					})
				}, s.prototype.applyTransition = function (e) {
					var t = this,
						n = {};
					!1 === t.options.fade ? n[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : n[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase, !1 === t.options.fade ? t.$slideTrack.css(n) : t.$slides.eq(e).css(n)
				}, s.prototype.autoPlay = function () {
					var e = this;
					e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed))
				}, s.prototype.autoPlayClear = function () {
					this.autoPlayTimer && clearInterval(this.autoPlayTimer)
				}, s.prototype.autoPlayIterator = function () {
					var e = this,
						t = e.currentSlide + e.options.slidesToScroll;
					e.paused || e.interrupted || e.focussed || (!1 === e.options.infinite && (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? e.direction = 0 : 0 === e.direction && (t = e.currentSlide - e.options.slidesToScroll, e.currentSlide - 1 == 0 && (e.direction = 1))), e.slideHandler(t))
				}, s.prototype.buildArrows = function () {
					var e = this;
					!0 === e.options.arrows && (e.$prevArrow = c(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = c(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), !0 !== e.options.infinite && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
						"aria-disabled": "true",
						tabindex: "-1"
					}))
				}, s.prototype.buildDots = function () {
					var e, t, n = this;
					if (!0 === n.options.dots && n.slideCount > n.options.slidesToShow) {
						for (n.$slider.addClass("slick-dotted"), t = c("<ul />").addClass(n.options.dotsClass), e = 0; e <= n.getDotCount(); e += 1) t.append(c("<li />").append(n.options.customPaging.call(this, n, e)));
						n.$dots = t.appendTo(n.options.appendDots), n.$dots.find("li").first().addClass("slick-active")
					}
				}, s.prototype.buildOut = function () {
					var e = this;
					e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, t) {
						c(t).attr("data-slick-index", e).data("originalStyling", c(t).attr("style") || "")
					}), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? c('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), !0 !== e.options.centerMode && !0 !== e.options.swipeToSlide || (e.options.slidesToScroll = 1), c("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), !0 === e.options.draggable && e.$list.addClass("draggable")
				}, s.prototype.buildRows = function () {
					var e, t, n, i, o, r, s, a = this;
					if (i = document.createDocumentFragment(), r = a.$slider.children(), 0 < a.options.rows) {
						for (s = a.options.slidesPerRow * a.options.rows, o = Math.ceil(r.length / s), e = 0; e < o; e++) {
							var l = document.createElement("div");
							for (t = 0; t < a.options.rows; t++) {
								var c = document.createElement("div");
								for (n = 0; n < a.options.slidesPerRow; n++) {
									var d = e * s + (t * a.options.slidesPerRow + n);
									r.get(d) && c.appendChild(r.get(d))
								}
								l.appendChild(c)
							}
							i.appendChild(l)
						}
						a.$slider.empty().append(i), a.$slider.children().children().children().css({
							width: 100 / a.options.slidesPerRow + "%",
							display: "inline-block"
						})
					}
				}, s.prototype.checkResponsive = function (e, t) {
					var n, i, o, r = this,
						s = !1,
						a = r.$slider.width(),
						l = window.innerWidth || c(window).width();
					if ("window" === r.respondTo ? o = l : "slider" === r.respondTo ? o = a : "min" === r.respondTo && (o = Math.min(l, a)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
						for (n in i = null, r.breakpoints) r.breakpoints.hasOwnProperty(n) && (!1 === r.originalSettings.mobileFirst ? o < r.breakpoints[n] && (i = r.breakpoints[n]) : o > r.breakpoints[n] && (i = r.breakpoints[n]));
						null !== i ? null !== r.activeBreakpoint && i === r.activeBreakpoint && !t || (r.activeBreakpoint = i, "unslick" === r.breakpointSettings[i] ? r.unslick(i) : (r.options = c.extend({}, r.originalSettings, r.breakpointSettings[i]), !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e)), s = i) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, !0 === e && (r.currentSlide = r.options.initialSlide), r.refresh(e), s = i), e || !1 === s || r.$slider.trigger("breakpoint", [r, s])
					}
				}, s.prototype.changeSlide = function (e, t) {
					var n, i, o = this,
						r = c(e.currentTarget);
					switch (r.is("a") && e.preventDefault(), r.is("li") || (r = r.closest("li")), n = o.slideCount % o.options.slidesToScroll != 0 ? 0 : (o.slideCount - o.currentSlide) % o.options.slidesToScroll, e.data.message) {
					case "previous":
						i = 0 == n ? o.options.slidesToScroll : o.options.slidesToShow - n, o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide - i, !1, t);
						break;
					case "next":
						i = 0 == n ? o.options.slidesToScroll : n, o.slideCount > o.options.slidesToShow && o.slideHandler(o.currentSlide + i, !1, t);
						break;
					case "index":
						var s = 0 === e.data.index ? 0 : e.data.index || r.index() * o.options.slidesToScroll;
						o.slideHandler(o.checkNavigable(s), !1, t), r.children().trigger("focus");
						break;
					default:
						return
					}
				}, s.prototype.checkNavigable = function (e) {
					var t, n;
					if (n = 0, e > (t = this.getNavigableIndexes())[t.length - 1]) e = t[t.length - 1];
					else
						for (var i in t) {
							if (e < t[i]) {
								e = n;
								break
							}
							n = t[i]
						}
					return e
				}, s.prototype.cleanUpEvents = function () {
					var e = this;
					e.options.dots && null !== e.$dots && (c("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", c.proxy(e.interrupt, e, !0)).off("mouseleave.slick", c.proxy(e.interrupt, e, !1)), !0 === e.options.accessibility && e.$dots.off("keydown.slick", e.keyHandler)), e.$slider.off("focus.slick blur.slick"), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler), e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), c(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), !0 === e.options.accessibility && e.$list.off("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && c(e.$slideTrack).children().off("click.slick", e.selectHandler), c(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), c(window).off("resize.slick.slick-" + e.instanceUid, e.resize), c("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), c(window).off("load.slick.slick-" + e.instanceUid, e.setPosition)
				}, s.prototype.cleanUpSlideEvents = function () {
					var e = this;
					e.$list.off("mouseenter.slick", c.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", c.proxy(e.interrupt, e, !1))
				}, s.prototype.cleanUpRows = function () {
					var e;
					0 < this.options.rows && ((e = this.$slides.children().children()).removeAttr("style"), this.$slider.empty().append(e))
				}, s.prototype.clickHandler = function (e) {
					!1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault())
				}, s.prototype.destroy = function (e) {
					var t = this;
					t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), c(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
						c(this).attr("style", c(this).data("originalStyling"))
					}), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
				}, s.prototype.disableTransition = function (e) {
					var t = {};
					t[this.transitionType] = "", !1 === this.options.fade ? this.$slideTrack.css(t) : this.$slides.eq(e).css(t)
				}, s.prototype.fadeSlide = function (e, t) {
					var n = this;
					!1 === n.cssTransitions ? (n.$slides.eq(e).css({
						zIndex: n.options.zIndex
					}), n.$slides.eq(e).animate({
						opacity: 1
					}, n.options.speed, n.options.easing, t)) : (n.applyTransition(e), n.$slides.eq(e).css({
						opacity: 1,
						zIndex: n.options.zIndex
					}), t && setTimeout(function () {
						n.disableTransition(e), t.call()
					}, n.options.speed))
				}, s.prototype.fadeSlideOut = function (e) {
					var t = this;
					!1 === t.cssTransitions ? t.$slides.eq(e).animate({
						opacity: 0,
						zIndex: t.options.zIndex - 2
					}, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({
						opacity: 0,
						zIndex: t.options.zIndex - 2
					}))
				}, s.prototype.filterSlides = s.prototype.slickFilter = function (e) {
					var t = this;
					null !== e && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit())
				}, s.prototype.focusHandler = function () {
					var n = this;
					n.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (e) {
						e.stopImmediatePropagation();
						var t = c(this);
						setTimeout(function () {
							n.options.pauseOnFocus && (n.focussed = t.is(":focus"), n.autoPlay())
						}, 0)
					})
				}, s.prototype.getCurrent = s.prototype.slickCurrentSlide = function () {
					return this.currentSlide
				}, s.prototype.getDotCount = function () {
					var e = this,
						t = 0,
						n = 0,
						i = 0;
					if (!0 === e.options.infinite)
						if (e.slideCount <= e.options.slidesToShow)++i;
					else
						for (; t < e.slideCount;)++i, t = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
					else if (!0 === e.options.centerMode) i = e.slideCount;
					else if (e.options.asNavFor)
						for (; t < e.slideCount;)++i, t = n + e.options.slidesToScroll, n += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
					else i = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
					return i - 1
				}, s.prototype.getLeft = function (e) {
					var t, n, i, o, r = this,
						s = 0;
					return r.slideOffset = 0, n = r.$slides.first().outerHeight(!0), !0 === r.options.infinite ? (r.slideCount > r.options.slidesToShow && (r.slideOffset = r.slideWidth * r.options.slidesToShow * -1, o = -1, !0 === r.options.vertical && !0 === r.options.centerMode && (2 === r.options.slidesToShow ? o = -1.5 : 1 === r.options.slidesToShow && (o = -2)), s = n * r.options.slidesToShow * o), r.slideCount % r.options.slidesToScroll != 0 && e + r.options.slidesToScroll > r.slideCount && r.slideCount > r.options.slidesToShow && (s = e > r.slideCount ? (r.slideOffset = (r.options.slidesToShow - (e - r.slideCount)) * r.slideWidth * -1, (r.options.slidesToShow - (e - r.slideCount)) * n * -1) : (r.slideOffset = r.slideCount % r.options.slidesToScroll * r.slideWidth * -1, r.slideCount % r.options.slidesToScroll * n * -1))) : e + r.options.slidesToShow > r.slideCount && (r.slideOffset = (e + r.options.slidesToShow - r.slideCount) * r.slideWidth, s = (e + r.options.slidesToShow - r.slideCount) * n), r.slideCount <= r.options.slidesToShow && (s = r.slideOffset = 0), !0 === r.options.centerMode && r.slideCount <= r.options.slidesToShow ? r.slideOffset = r.slideWidth * Math.floor(r.options.slidesToShow) / 2 - r.slideWidth * r.slideCount / 2 : !0 === r.options.centerMode && !0 === r.options.infinite ? r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2) - r.slideWidth : !0 === r.options.centerMode && (r.slideOffset = 0, r.slideOffset += r.slideWidth * Math.floor(r.options.slidesToShow / 2)), t = !1 === r.options.vertical ? e * r.slideWidth * -1 + r.slideOffset : e * n * -1 + s, !0 === r.options.variableWidth && (i = r.slideCount <= r.options.slidesToShow || !1 === r.options.infinite ? r.$slideTrack.children(".slick-slide").eq(e) : r.$slideTrack.children(".slick-slide").eq(e + r.options.slidesToShow), t = !0 === r.options.rtl ? i[0] ? -1 * (r.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, !0 === r.options.centerMode && (i = r.slideCount <= r.options.slidesToShow || !1 === r.options.infinite ? r.$slideTrack.children(".slick-slide").eq(e) : r.$slideTrack.children(".slick-slide").eq(e + r.options.slidesToShow + 1), t = !0 === r.options.rtl ? i[0] ? -1 * (r.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, t += (r.$list.width() - i.outerWidth()) / 2)), t
				}, s.prototype.getOption = s.prototype.slickGetOption = function (e) {
					return this.options[e]
				}, s.prototype.getNavigableIndexes = function () {
					var e, t = this,
						n = 0,
						i = 0,
						o = [];
					for (e = !1 === t.options.infinite ? t.slideCount : (n = -1 * t.options.slidesToScroll, i = -1 * t.options.slidesToScroll, 2 * t.slideCount); n < e;) o.push(n), n = i + t.options.slidesToScroll, i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
					return o
				}, s.prototype.getSlick = function () {
					return this
				}, s.prototype.getSlideCount = function () {
					var n, i, o = this;
					return i = !0 === o.options.centerMode ? o.slideWidth * Math.floor(o.options.slidesToShow / 2) : 0, !0 === o.options.swipeToSlide ? (o.$slideTrack.find(".slick-slide").each(function (e, t) {
						if (t.offsetLeft - i + c(t).outerWidth() / 2 > -1 * o.swipeLeft) return n = t, !1
					}), Math.abs(c(n).attr("data-slick-index") - o.currentSlide) || 1) : o.options.slidesToScroll
				}, s.prototype.goTo = s.prototype.slickGoTo = function (e, t) {
					this.changeSlide({
						data: {
							message: "index",
							index: parseInt(e)
						}
					}, t)
				}, s.prototype.init = function (e) {
					var t = this;
					c(t.$slider).hasClass("slick-initialized") || (c(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), !0 === t.options.accessibility && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
				}, s.prototype.initADA = function () {
					var i = this,
						n = Math.ceil(i.slideCount / i.options.slidesToShow),
						o = i.getNavigableIndexes().filter(function (e) {
							return 0 <= e && e < i.slideCount
						});
					i.$slides.add(i.$slideTrack.find(".slick-cloned")).attr({
						"aria-hidden": "true",
						tabindex: "-1"
					}).find("a, input, button, select").attr({
						tabindex: "-1"
					}), null !== i.$dots && (i.$slides.not(i.$slideTrack.find(".slick-cloned")).each(function (e) {
						var t = o.indexOf(e);
						if (c(this).attr({
							role: "tabpanel",
							id: "slick-slide" + i.instanceUid + e,
							tabindex: -1
						}), -1 !== t) {
							var n = "slick-slide-control" + i.instanceUid + t;
							c("#" + n).length && c(this).attr({
								"aria-describedby": n
							})
						}
					}), i.$dots.attr("role", "tablist").find("li").each(function (e) {
						var t = o[e];
						c(this).attr({
							role: "presentation"
						}), c(this).find("button").first().attr({
							role: "tab",
							id: "slick-slide-control" + i.instanceUid + e,
							"aria-controls": "slick-slide" + i.instanceUid + t,
							"aria-label": e + 1 + " of " + n,
							"aria-selected": null,
							tabindex: "-1"
						})
					}).eq(i.currentSlide).find("button").attr({
						"aria-selected": "true",
						tabindex: "0"
					}).end());
					for (var e = i.currentSlide, t = e + i.options.slidesToShow; e < t; e++) i.options.focusOnChange ? i.$slides.eq(e).attr({
						tabindex: "0"
					}) : i.$slides.eq(e).removeAttr("tabindex");
					i.activateADA()
				}, s.prototype.initArrowEvents = function () {
					var e = this;
					!0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.off("click.slick").on("click.slick", {
						message: "previous"
					}, e.changeSlide), e.$nextArrow.off("click.slick").on("click.slick", {
						message: "next"
					}, e.changeSlide), !0 === e.options.accessibility && (e.$prevArrow.on("keydown.slick", e.keyHandler), e.$nextArrow.on("keydown.slick", e.keyHandler)))
				}, s.prototype.initDotEvents = function () {
					var e = this;
					!0 === e.options.dots && e.slideCount > e.options.slidesToShow && (c("li", e.$dots).on("click.slick", {
						message: "index"
					}, e.changeSlide), !0 === e.options.accessibility && e.$dots.on("keydown.slick", e.keyHandler)), !0 === e.options.dots && !0 === e.options.pauseOnDotsHover && e.slideCount > e.options.slidesToShow && c("li", e.$dots).on("mouseenter.slick", c.proxy(e.interrupt, e, !0)).on("mouseleave.slick", c.proxy(e.interrupt, e, !1))
				}, s.prototype.initSlideEvents = function () {
					var e = this;
					e.options.pauseOnHover && (e.$list.on("mouseenter.slick", c.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", c.proxy(e.interrupt, e, !1)))
				}, s.prototype.initializeEvents = function () {
					var e = this;
					e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {
						action: "start"
					}, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {
						action: "move"
					}, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {
						action: "end"
					}, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {
						action: "end"
					}, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), c(document).on(e.visibilityChange, c.proxy(e.visibility, e)), !0 === e.options.accessibility && e.$list.on("keydown.slick", e.keyHandler), !0 === e.options.focusOnSelect && c(e.$slideTrack).children().on("click.slick", e.selectHandler), c(window).on("orientationchange.slick.slick-" + e.instanceUid, c.proxy(e.orientationChange, e)), c(window).on("resize.slick.slick-" + e.instanceUid, c.proxy(e.resize, e)), c("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), c(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), c(e.setPosition)
				}, s.prototype.initUI = function () {
					var e = this;
					!0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show()
				}, s.prototype.keyHandler = function (e) {
					var t = this;
					e.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === e.keyCode && !0 === t.options.accessibility ? t.changeSlide({
						data: {
							message: !0 === t.options.rtl ? "next" : "previous"
						}
					}) : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({
						data: {
							message: !0 === t.options.rtl ? "previous" : "next"
						}
					}))
				}, s.prototype.lazyLoad = function () {
					var e, t, n, r = this;

					function i(e) {
						c("img[data-lazy]", e).each(function () {
							var e = c(this),
								t = c(this).attr("data-lazy"),
								n = c(this).attr("data-srcset"),
								i = c(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
								o = document.createElement("img");
							o.onload = function () {
								e.animate({
									opacity: 0
								}, 100, function () {
									n && (e.attr("srcset", n), i && e.attr("sizes", i)), e.attr("src", t).animate({
										opacity: 1
									}, 200, function () {
										e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
									}), r.$slider.trigger("lazyLoaded", [r, e, t])
								})
							}, o.onerror = function () {
								e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, e, t])
							}, o.src = t
						})
					}
					if (!0 === r.options.centerMode ? n = !0 === r.options.infinite ? (t = r.currentSlide + (r.options.slidesToShow / 2 + 1)) + r.options.slidesToShow + 2 : (t = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), r.options.slidesToShow / 2 + 1 + 2 + r.currentSlide) : (t = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, n = Math.ceil(t + r.options.slidesToShow), !0 === r.options.fade && (0 < t && t--, n <= r.slideCount && n++)), e = r.$slider.find(".slick-slide").slice(t, n), "anticipated" === r.options.lazyLoad)
						for (var o = t - 1, s = n, a = r.$slider.find(".slick-slide"), l = 0; l < r.options.slidesToScroll; l++) o < 0 && (o = r.slideCount - 1), e = (e = e.add(a.eq(o))).add(a.eq(s)), o--, s++;
					i(e), r.slideCount <= r.options.slidesToShow ? i(r.$slider.find(".slick-slide")) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? i(r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow)) : 0 === r.currentSlide && i(r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow))
				}, s.prototype.loadSlider = function () {
					var e = this;
					e.setPosition(), e.$slideTrack.css({
						opacity: 1
					}), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad()
				}, s.prototype.next = s.prototype.slickNext = function () {
					this.changeSlide({
						data: {
							message: "next"
						}
					})
				}, s.prototype.orientationChange = function () {
					this.checkResponsive(), this.setPosition()
				}, s.prototype.pause = s.prototype.slickPause = function () {
					this.autoPlayClear(), this.paused = !0
				}, s.prototype.play = s.prototype.slickPlay = function () {
					var e = this;
					e.autoPlay(), e.options.autoplay = !0, e.paused = !1, e.focussed = !1, e.interrupted = !1
				}, s.prototype.postSlide = function (e) {
					var t = this;
					t.unslicked || (t.$slider.trigger("afterChange", [t, e]), t.animating = !1, t.slideCount > t.options.slidesToShow && t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), !0 === t.options.accessibility && (t.initADA(), t.options.focusOnChange && c(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()))
				}, s.prototype.prev = s.prototype.slickPrev = function () {
					this.changeSlide({
						data: {
							message: "previous"
						}
					})
				}, s.prototype.preventDefault = function (e) {
					e.preventDefault()
				}, s.prototype.progressiveLazyLoad = function (e) {
					e = e || 1;
					var t, n, i, o, r, s = this,
						a = c("img[data-lazy]", s.$slider);
					a.length ? (t = a.first(), n = t.attr("data-lazy"), i = t.attr("data-srcset"), o = t.attr("data-sizes") || s.$slider.attr("data-sizes"), (r = document.createElement("img")).onload = function () {
						i && (t.attr("srcset", i), o && t.attr("sizes", o)), t.attr("src", n).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === s.options.adaptiveHeight && s.setPosition(), s.$slider.trigger("lazyLoaded", [s, t, n]), s.progressiveLazyLoad()
					}, r.onerror = function () {
						e < 3 ? setTimeout(function () {
							s.progressiveLazyLoad(e + 1)
						}, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), s.$slider.trigger("lazyLoadError", [s, t, n]), s.progressiveLazyLoad())
					}, r.src = n) : s.$slider.trigger("allImagesLoaded", [s])
				}, s.prototype.refresh = function (e) {
					var t, n, i = this;
					n = i.slideCount - i.options.slidesToShow, !i.options.infinite && i.currentSlide > n && (i.currentSlide = n), i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0), t = i.currentSlide, i.destroy(!0), c.extend(i, i.initials, {
						currentSlide: t
					}), i.init(), e || i.changeSlide({
						data: {
							message: "index",
							index: t
						}
					}, !1)
				}, s.prototype.registerBreakpoints = function () {
					var e, t, n, i = this,
						o = i.options.responsive || null;
					if ("array" === c.type(o) && o.length) {
						for (e in i.respondTo = i.options.respondTo || "window", o)
							if (n = i.breakpoints.length - 1, o.hasOwnProperty(e)) {
								for (t = o[e].breakpoint; 0 <= n;) i.breakpoints[n] && i.breakpoints[n] === t && i.breakpoints.splice(n, 1), n--;
								i.breakpoints.push(t), i.breakpointSettings[t] = o[e].settings
							}
						i.breakpoints.sort(function (e, t) {
							return i.options.mobileFirst ? e - t : t - e
						})
					}
				}, s.prototype.reinit = function () {
					var e = this;
					e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), !0 === e.options.focusOnSelect && c(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
				}, s.prototype.resize = function () {
					var e = this;
					c(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () {
						e.windowWidth = c(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
					}, 50))
				}, s.prototype.removeSlide = s.prototype.slickRemove = function (e, t, n) {
					var i = this;
					if (e = "boolean" == typeof e ? !0 === (t = e) ? 0 : i.slideCount - 1 : !0 === t ? --e : e, i.slideCount < 1 || e < 0 || e > i.slideCount - 1) return !1;
					i.unload(), !0 === n ? i.$slideTrack.children().remove() : i.$slideTrack.children(this.options.slide).eq(e).remove(), i.$slides = i.$slideTrack.children(this.options.slide), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.append(i.$slides), i.$slidesCache = i.$slides, i.reinit()
				}, s.prototype.setCSS = function (e) {
					var t, n, i = this,
						o = {};
					!0 === i.options.rtl && (e = -e), t = "left" == i.positionProp ? Math.ceil(e) + "px" : "0px", n = "top" == i.positionProp ? Math.ceil(e) + "px" : "0px", o[i.positionProp] = e, !1 === i.transformsEnabled || (!(o = {}) === i.cssTransitions ? o[i.animType] = "translate(" + t + ", " + n + ")" : o[i.animType] = "translate3d(" + t + ", " + n + ", 0px)"), i.$slideTrack.css(o)
				}, s.prototype.setDimensions = function () {
					var e = this;
					!1 === e.options.vertical ? !0 === e.options.centerMode && e.$list.css({
						padding: "0px " + e.options.centerPadding
					}) : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({
						padding: e.options.centerPadding + " 0px"
					})), e.listWidth = e.$list.width(), e.listHeight = e.$list.height(), !1 === e.options.vertical && !1 === e.options.variableWidth ? (e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length))) : !0 === e.options.variableWidth ? e.$slideTrack.width(5e3 * e.slideCount) : (e.slideWidth = Math.ceil(e.listWidth), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
					var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
					!1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t)
				}, s.prototype.setFade = function () {
					var n, i = this;
					i.$slides.each(function (e, t) {
						n = i.slideWidth * e * -1, !0 === i.options.rtl ? c(t).css({
							position: "relative",
							right: n,
							top: 0,
							zIndex: i.options.zIndex - 2,
							opacity: 0
						}) : c(t).css({
							position: "relative",
							left: n,
							top: 0,
							zIndex: i.options.zIndex - 2,
							opacity: 0
						})
					}), i.$slides.eq(i.currentSlide).css({
						zIndex: i.options.zIndex - 1,
						opacity: 1
					})
				}, s.prototype.setHeight = function () {
					var e = this;
					if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
						var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
						e.$list.css("height", t)
					}
				}, s.prototype.setOption = s.prototype.slickSetOption = function () {
					var e, t, n, i, o, r = this,
						s = !1;
					if ("object" === c.type(arguments[0]) ? (n = arguments[0], s = arguments[1], o = "multiple") : "string" === c.type(arguments[0]) && (i = arguments[1], s = arguments[2], "responsive" === (n = arguments[0]) && "array" === c.type(arguments[1]) ? o = "responsive" : void 0 !== arguments[1] && (o = "single")), "single" === o) r.options[n] = i;
					else if ("multiple" === o) c.each(n, function (e, t) {
						r.options[e] = t
					});
					else if ("responsive" === o)
						for (t in i)
							if ("array" !== c.type(r.options.responsive)) r.options.responsive = [i[t]];
							else {
								for (e = r.options.responsive.length - 1; 0 <= e;) r.options.responsive[e].breakpoint === i[t].breakpoint && r.options.responsive.splice(e, 1), e--;
								r.options.responsive.push(i[t])
							}
					s && (r.unload(), r.reinit())
				}, s.prototype.setPosition = function () {
					var e = this;
					e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e])
				}, s.prototype.setProps = function () {
					var e = this,
						t = document.body.style;
					e.positionProp = !0 === e.options.vertical ? "top" : "left", "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"), void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition || !0 === e.options.useCSS && (e.cssTransitions = !0), e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : e.options.zIndex = e.defaults.zIndex), void 0 !== t.OTransform && (e.animType = "OTransform", e.transformType = "-o-transform", e.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.MozTransform && (e.animType = "MozTransform", e.transformType = "-moz-transform", e.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)), void 0 !== t.webkitTransform && (e.animType = "webkitTransform", e.transformType = "-webkit-transform", e.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)), void 0 !== t.msTransform && (e.animType = "msTransform", e.transformType = "-ms-transform", e.transitionType = "msTransition", void 0 === t.msTransform && (e.animType = !1)), void 0 !== t.transform && !1 !== e.animType && (e.animType = "transform", e.transformType = "transform", e.transitionType = "transition"), e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType
				}, s.prototype.setSlideClasses = function (e) {
					var t, n, i, o, r = this;
					if (n = r.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), r.$slides.eq(e).addClass("slick-current"), !0 === r.options.centerMode) {
						var s = r.options.slidesToShow % 2 == 0 ? 1 : 0;
						t = Math.floor(r.options.slidesToShow / 2), !0 === r.options.infinite && (t <= e && e <= r.slideCount - 1 - t ? r.$slides.slice(e - t + s, e + t + 1).addClass("slick-active").attr("aria-hidden", "false") : (i = r.options.slidesToShow + e, n.slice(i - t + 1 + s, i + t + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === e ? n.eq(n.length - 1 - r.options.slidesToShow).addClass("slick-center") : e === r.slideCount - 1 && n.eq(r.options.slidesToShow).addClass("slick-center")), r.$slides.eq(e).addClass("slick-center")
					} else 0 <= e && e <= r.slideCount - r.options.slidesToShow ? r.$slides.slice(e, e + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : n.length <= r.options.slidesToShow ? n.addClass("slick-active").attr("aria-hidden", "false") : (o = r.slideCount % r.options.slidesToShow, i = !0 === r.options.infinite ? r.options.slidesToShow + e : e, r.options.slidesToShow == r.options.slidesToScroll && r.slideCount - e < r.options.slidesToShow ? n.slice(i - (r.options.slidesToShow - o), i + o).addClass("slick-active").attr("aria-hidden", "false") : n.slice(i, i + r.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
					"ondemand" !== r.options.lazyLoad && "anticipated" !== r.options.lazyLoad || r.lazyLoad()
				}, s.prototype.setupInfinite = function () {
					var e, t, n, i = this;
					if (!0 === i.options.fade && (i.options.centerMode = !1), !0 === i.options.infinite && !1 === i.options.fade && (t = null, i.slideCount > i.options.slidesToShow)) {
						for (n = !0 === i.options.centerMode ? i.options.slidesToShow + 1 : i.options.slidesToShow, e = i.slideCount; e > i.slideCount - n; e -= 1) t = e - 1, c(i.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - i.slideCount).prependTo(i.$slideTrack).addClass("slick-cloned");
						for (e = 0; e < n + i.slideCount; e += 1) t = e, c(i.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + i.slideCount).appendTo(i.$slideTrack).addClass("slick-cloned");
						i.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
							c(this).attr("id", "")
						})
					}
				}, s.prototype.interrupt = function (e) {
					e || this.autoPlay(), this.interrupted = e
				}, s.prototype.selectHandler = function (e) {
					var t = c(e.target).is(".slick-slide") ? c(e.target) : c(e.target).parents(".slick-slide"),
						n = parseInt(t.attr("data-slick-index"));
					n = n || 0, this.slideCount <= this.options.slidesToShow ? this.slideHandler(n, !1, !0) : this.slideHandler(n)
				}, s.prototype.slideHandler = function (e, t, n) {
					var i, o, r, s, a, l, c = this;
					if (t = t || !1, !(!0 === c.animating && !0 === c.options.waitForAnimate || !0 === c.options.fade && c.currentSlide === e))
						if (!1 === t && c.asNavFor(e), i = e, a = c.getLeft(i), s = c.getLeft(c.currentSlide), c.currentLeft = null === c.swipeLeft ? s : c.swipeLeft, !1 === c.options.infinite && !1 === c.options.centerMode && (e < 0 || e > c.getDotCount() * c.options.slidesToScroll))!1 === c.options.fade && (i = c.currentSlide, !0 !== n && c.slideCount > c.options.slidesToShow ? c.animateSlide(s, function () {
						c.postSlide(i)
					}) : c.postSlide(i));
					else if (!1 === c.options.infinite && !0 === c.options.centerMode && (e < 0 || e > c.slideCount - c.options.slidesToScroll))!1 === c.options.fade && (i = c.currentSlide, !0 !== n && c.slideCount > c.options.slidesToShow ? c.animateSlide(s, function () {
						c.postSlide(i)
					}) : c.postSlide(i));
					else {
						if (c.options.autoplay && clearInterval(c.autoPlayTimer), o = i < 0 ? c.slideCount % c.options.slidesToScroll != 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + i : i >= c.slideCount ? c.slideCount % c.options.slidesToScroll != 0 ? 0 : i - c.slideCount : i, c.animating = !0, c.$slider.trigger("beforeChange", [c, c.currentSlide, o]), r = c.currentSlide, c.currentSlide = o, c.setSlideClasses(c.currentSlide), c.options.asNavFor && (l = (l = c.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(c.currentSlide), c.updateDots(), c.updateArrows(), !0 === c.options.fade) return !0 !== n ? (c.fadeSlideOut(r), c.fadeSlide(o, function () {
							c.postSlide(o)
						})) : c.postSlide(o), void c.animateHeight();
						!0 !== n && c.slideCount > c.options.slidesToShow ? c.animateSlide(a, function () {
							c.postSlide(o)
						}) : c.postSlide(o)
					}
				}, s.prototype.startLoad = function () {
					var e = this;
					!0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(), e.$slider.addClass("slick-loading")
				}, s.prototype.swipeDirection = function () {
					var e, t, n, i, o = this;
					return e = o.touchObject.startX - o.touchObject.curX, t = o.touchObject.startY - o.touchObject.curY, n = Math.atan2(t, e), (i = Math.round(180 * n / Math.PI)) < 0 && (i = 360 - Math.abs(i)), i <= 45 && 0 <= i ? !1 === o.options.rtl ? "left" : "right" : i <= 360 && 315 <= i ? !1 === o.options.rtl ? "left" : "right" : 135 <= i && i <= 225 ? !1 === o.options.rtl ? "right" : "left" : !0 === o.options.verticalSwiping ? 35 <= i && i <= 135 ? "down" : "up" : "vertical"
				}, s.prototype.swipeEnd = function (e) {
					var t, n, i = this;
					if (i.dragging = !1, i.swiping = !1, i.scrolling) return i.scrolling = !1;
					if (i.interrupted = !1, i.shouldClick = !(10 < i.touchObject.swipeLength), void 0 === i.touchObject.curX) return !1;
					if (!0 === i.touchObject.edgeHit && i.$slider.trigger("edge", [i, i.swipeDirection()]), i.touchObject.swipeLength >= i.touchObject.minSwipe) {
						switch (n = i.swipeDirection()) {
						case "left":
						case "down":
							t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide + i.getSlideCount()) : i.currentSlide + i.getSlideCount(), i.currentDirection = 0;
							break;
						case "right":
						case "up":
							t = i.options.swipeToSlide ? i.checkNavigable(i.currentSlide - i.getSlideCount()) : i.currentSlide - i.getSlideCount(), i.currentDirection = 1
						}
						"vertical" != n && (i.slideHandler(t), i.touchObject = {}, i.$slider.trigger("swipe", [i, n]))
					} else i.touchObject.startX !== i.touchObject.curX && (i.slideHandler(i.currentSlide), i.touchObject = {})
				}, s.prototype.swipeHandler = function (e) {
					var t = this;
					if (!(!1 === t.options.swipe || "ontouchend" in document && !1 === t.options.swipe || !1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))) switch (t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), e.data.action) {
					case "start":
						t.swipeStart(e);
						break;
					case "move":
						t.swipeMove(e);
						break;
					case "end":
						t.swipeEnd(e)
					}
				}, s.prototype.swipeMove = function (e) {
					var t, n, i, o, r, s, a = this;
					return r = void 0 !== e.originalEvent ? e.originalEvent.touches : null, !(!a.dragging || a.scrolling || r && 1 !== r.length) && (t = a.getLeft(a.currentSlide), a.touchObject.curX = void 0 !== r ? r[0].pageX : e.clientX, a.touchObject.curY = void 0 !== r ? r[0].pageY : e.clientY, a.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(a.touchObject.curX - a.touchObject.startX, 2))), s = Math.round(Math.sqrt(Math.pow(a.touchObject.curY - a.touchObject.startY, 2))), !a.options.verticalSwiping && !a.swiping && 4 < s ? !(a.scrolling = !0) : (!0 === a.options.verticalSwiping && (a.touchObject.swipeLength = s), n = a.swipeDirection(), void 0 !== e.originalEvent && 4 < a.touchObject.swipeLength && (a.swiping = !0, e.preventDefault()), o = (!1 === a.options.rtl ? 1 : -1) * (a.touchObject.curX > a.touchObject.startX ? 1 : -1), !0 === a.options.verticalSwiping && (o = a.touchObject.curY > a.touchObject.startY ? 1 : -1), i = a.touchObject.swipeLength, (a.touchObject.edgeHit = !1) === a.options.infinite && (0 === a.currentSlide && "right" === n || a.currentSlide >= a.getDotCount() && "left" === n) && (i = a.touchObject.swipeLength * a.options.edgeFriction, a.touchObject.edgeHit = !0), !1 === a.options.vertical ? a.swipeLeft = t + i * o : a.swipeLeft = t + i * (a.$list.height() / a.listWidth) * o, !0 === a.options.verticalSwiping && (a.swipeLeft = t + i * o), !0 !== a.options.fade && !1 !== a.options.touchMove && (!0 === a.animating ? (a.swipeLeft = null, !1) : void a.setCSS(a.swipeLeft))))
				}, s.prototype.swipeStart = function (e) {
					var t, n = this;
					if (n.interrupted = !0, 1 !== n.touchObject.fingerCount || n.slideCount <= n.options.slidesToShow) return !(n.touchObject = {});
					void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]), n.touchObject.startX = n.touchObject.curX = void 0 !== t ? t.pageX : e.clientX, n.touchObject.startY = n.touchObject.curY = void 0 !== t ? t.pageY : e.clientY, n.dragging = !0
				}, s.prototype.unfilterSlides = s.prototype.slickUnfilter = function () {
					var e = this;
					null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit())
				}, s.prototype.unload = function () {
					var e = this;
					c(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
				}, s.prototype.unslick = function (e) {
					this.$slider.trigger("unslick", [this, e]), this.destroy()
				}, s.prototype.updateArrows = function () {
					var e = this;
					Math.floor(e.options.slidesToShow / 2), !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && !0 === e.options.centerMode && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
				}, s.prototype.updateDots = function () {
					var e = this;
					null !== e.$dots && (e.$dots.find("li").removeClass("slick-active").end(), e.$dots.find("li").eq(Math.floor(e.currentSlide / e.options.slidesToScroll)).addClass("slick-active"))
				}, s.prototype.visibility = function () {
					this.options.autoplay && (document[this.hidden] ? this.interrupted = !0 : this.interrupted = !1)
				}, c.fn.slick = function () {
					var e, t, n = this,
						i = arguments[0],
						o = Array.prototype.slice.call(arguments, 1),
						r = n.length;
					for (e = 0; e < r; e++)
						if ("object" == a(i) || void 0 === i ? n[e].slick = new s(n[e], i) : t = n[e].slick[i].apply(n[e].slick, o), void 0 !== t) return t;
					return n
				}
			}, "function" == typeof define && define.amd ? define(["jquery"], i) : void 0 !== n ? t.exports = i(e("jquery")) : i(jQuery)
		}, {
			jquery: 2
		}
	],
	4: [
		function (e, t, n) {
			"use strict";

			function i(e) {
				return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
					return typeof e
				} : function (e) {
					return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
				})(e)
			}
			var o;
			o = function () {
				function i(e, t) {
					for (var n = 0; n < t.length; n++) {
						var i = t[n];
						i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
					}
				}
				var l, o, e = (o = {
					topSpacing: 0,
					bottomSpacing: 0,
					containerSelector: !(l = ".stickySidebar"),
					innerWrapperSelector: ".inner-wrapper-sticky",
					stickyClass: "is-affixed",
					resizeSensor: !0,
					minWidth: !1
				}, function (e, t, n) {
					return t && i(e.prototype, t), n && i(e, n), e
				}(c, [{
					key: "initialize",
					value: function () {
						var n = this;
						if (this._setSupportFeatures(), this.options.innerWrapperSelector && (this.sidebarInner = this.sidebar.querySelector(this.options.innerWrapperSelector), null === this.sidebarInner && (this.sidebarInner = !1)), !this.sidebarInner) {
							var e = document.createElement("div");
							for (e.setAttribute("class", "inner-wrapper-sticky"), this.sidebar.appendChild(e); this.sidebar.firstChild != e;) e.appendChild(this.sidebar.firstChild);
							this.sidebarInner = this.sidebar.querySelector(".inner-wrapper-sticky")
						}
						if (this.options.containerSelector) {
							var t = document.querySelectorAll(this.options.containerSelector);
							if ((t = Array.prototype.slice.call(t)).forEach(function (e, t) {
								e.contains(n.sidebar) && (n.container = e)
							}), !t.length) throw new Error("The container does not contains on the sidebar.")
						}
						"function" != typeof this.options.topSpacing && (this.options.topSpacing = parseInt(this.options.topSpacing) || 0), "function" != typeof this.options.bottomSpacing && (this.options.bottomSpacing = parseInt(this.options.bottomSpacing) || 0), this._widthBreakpoint(), this.calcDimensions(), this.stickyPosition(), this.bindEvents(), this._initialized = !0
					}
				}, {
					key: "bindEvents",
					value: function () {
						window.addEventListener("resize", this, {
							passive: !0,
							capture: !1
						}), window.addEventListener("scroll", this, {
							passive: !0,
							capture: !1
						}), this.sidebar.addEventListener("update" + l, this), this.options.resizeSensor && "undefined" != typeof ResizeSensor && (new ResizeSensor(this.sidebarInner, this.handleEvent), new ResizeSensor(this.container, this.handleEvent))
					}
				}, {
					key: "handleEvent",
					value: function (e) {
						this.updateSticky(e)
					}
				}, {
					key: "calcDimensions",
					value: function () {
						if (!this._breakpoint) {
							var e = this.dimensions;
							e.containerTop = c.offsetRelative(this.container).top, e.containerHeight = this.container.clientHeight, e.containerBottom = e.containerTop + e.containerHeight, e.sidebarHeight = this.sidebarInner.offsetHeight, e.sidebarWidth = this.sidebar.offsetWidth, e.viewportHeight = window.innerHeight, this._calcDimensionsWithScroll()
						}
					}
				}, {
					key: "_calcDimensionsWithScroll",
					value: function () {
						var e = this.dimensions;
						e.sidebarLeft = c.offsetRelative(this.sidebar).left, e.viewportTop = document.documentElement.scrollTop || document.body.scrollTop, e.viewportBottom = e.viewportTop + e.viewportHeight, e.viewportLeft = document.documentElement.scrollLeft || document.body.scrollLeft, e.topSpacing = this.options.topSpacing, e.bottomSpacing = this.options.bottomSpacing, "function" == typeof e.topSpacing && (e.topSpacing = parseInt(e.topSpacing(this.sidebar)) || 0), "function" == typeof e.bottomSpacing && (e.bottomSpacing = parseInt(e.bottomSpacing(this.sidebar)) || 0), "VIEWPORT-TOP" === this.affixedType ? e.topSpacing < e.lastTopSpacing && (e.translateY += e.lastTopSpacing - e.topSpacing, this._reStyle = !0) : "VIEWPORT-BOTTOM" === this.affixedType && e.bottomSpacing < e.lastBottomSpacing && (e.translateY += e.lastBottomSpacing - e.bottomSpacing, this._reStyle = !0), e.lastTopSpacing = e.topSpacing, e.lastBottomSpacing = e.bottomSpacing
					}
				}, {
					key: "isSidebarFitsViewport",
					value: function () {
						return this.dimensions.sidebarHeight < this.dimensions.viewportHeight
					}
				}, {
					key: "observeScrollDir",
					value: function () {
						var e = this.dimensions;
						if (e.lastViewportTop !== e.viewportTop) {
							var t = "down" === this.direction ? Math.min : Math.max;
							e.viewportTop === t(e.viewportTop, e.lastViewportTop) && (this.direction = "down" === this.direction ? "up" : "down")
						}
					}
				}, {
					key: "getAffixType",
					value: function () {
						var e = this.dimensions,
							t = !1;
						this._calcDimensionsWithScroll();
						var n = e.sidebarHeight + e.containerTop,
							i = e.viewportTop + e.topSpacing,
							o = e.viewportBottom - e.bottomSpacing;
						return "up" === this.direction ? i <= e.containerTop ? (e.translateY = 0, t = "STATIC") : i <= e.translateY + e.containerTop ? (e.translateY = i - e.containerTop, t = "VIEWPORT-TOP") : !this.isSidebarFitsViewport() && e.containerTop <= i && (t = "VIEWPORT-UNBOTTOM") : this.isSidebarFitsViewport() ? e.sidebarHeight + i >= e.containerBottom ? (e.translateY = e.containerBottom - n, t = "CONTAINER-BOTTOM") : i >= e.containerTop && (e.translateY = i - e.containerTop, t = "VIEWPORT-TOP") : e.containerBottom <= o ? (e.translateY = e.containerBottom - n, t = "CONTAINER-BOTTOM") : n + e.translateY <= o ? (e.translateY = o - n, t = "VIEWPORT-BOTTOM") : e.containerTop + e.translateY <= i && (t = "VIEWPORT-UNBOTTOM"), e.translateY = Math.max(0, e.translateY), e.translateY = Math.min(e.containerHeight, e.translateY), e.lastViewportTop = e.viewportTop, t
					}
				}, {
					key: "_getStyle",
					value: function (e) {
						if (void 0 !== e) {
							var t = {
									inner: {},
									outer: {}
								},
								n = this.dimensions;
							switch (e) {
							case "VIEWPORT-TOP":
								t.inner = {
									position: "fixed",
									top: n.topSpacing,
									left: n.sidebarLeft - n.viewportLeft,
									width: n.sidebarWidth
								};
								break;
							case "VIEWPORT-BOTTOM":
								t.inner = {
									position: "fixed",
									top: "auto",
									left: n.sidebarLeft,
									bottom: n.bottomSpacing,
									width: n.sidebarWidth
								};
								break;
							case "CONTAINER-BOTTOM":
							case "VIEWPORT-UNBOTTOM":
								var i = this._getTranslate(0, n.translateY + "px");
								t.inner = i ? {
									transform: i
								} : {
									position: "absolute",
									top: n.translateY,
									width: n.sidebarWidth
								}
							}
							switch (e) {
							case "VIEWPORT-TOP":
							case "VIEWPORT-BOTTOM":
							case "VIEWPORT-UNBOTTOM":
							case "CONTAINER-BOTTOM":
								t.outer = {
									height: n.sidebarHeight,
									position: "relative"
								}
							}
							return t.outer = c.extend({
								height: "",
								position: ""
							}, t.outer), t.inner = c.extend({
								position: "relative",
								top: "",
								left: "",
								bottom: "",
								width: "",
								transform: this._getTranslate()
							}, t.inner), t
						}
					}
				}, {
					key: "stickyPosition",
					value: function (e) {
						if (!this._breakpoint) {
							e = this._reStyle || e || !1;
							var t = this.getAffixType(),
								n = this._getStyle(t);
							if ((this.affixedType != t || e) && t) {
								var i = "affix." + t.toLowerCase().replace("viewport-", "") + l;
								for (var o in c.eventTrigger(this.sidebar, i), "STATIC" === t ? c.removeClass(this.sidebar, this.options.stickyClass) : c.addClass(this.sidebar, this.options.stickyClass), n.outer) this.sidebar.style[o] = n.outer[o];
								for (var r in n.inner) {
									var s = "number" == typeof n.inner[r] ? "px" : "";
									this.sidebarInner.style[r] = n.inner[r] + s
								}
								var a = "affixed." + t.toLowerCase().replace("viewport-", "") + l;
								c.eventTrigger(this.sidebar, a)
							} else this._initialized && (this.sidebarInner.style.left = n.inner.left);
							this.affixedType = t
						}
					}
				}, {
					key: "_widthBreakpoint",
					value: function () {
						window.innerWidth <= this.options.minWidth ? (this._breakpoint = !0, this.affixedType = "STATIC", this.sidebar.removeAttribute("style"), c.removeClass(this.sidebar, this.options.stickyClass), this.sidebarInner.removeAttribute("style")) : this._breakpoint = !1
					}
				}, {
					key: "updateSticky",
					value: function (e) {
						var t, n = this,
							i = 0 < arguments.length && void 0 !== e ? e : {};
						this._running || (this._running = !0, t = i.type, requestAnimationFrame(function () {
							switch (t) {
							case "scroll":
								n._calcDimensionsWithScroll(), n.observeScrollDir(), n.stickyPosition();
								break;
							case "resize":
							default:
								n._widthBreakpoint(), n.calcDimensions(), n.stickyPosition(!0)
							}
							n._running = !1
						}))
					}
				}, {
					key: "_setSupportFeatures",
					value: function () {
						var e = this.support;
						e.transform = c.supportTransform(), e.transform3d = c.supportTransform(!0)
					}
				}, {
					key: "_getTranslate",
					value: function (e, t, n) {
						var i = 0 < arguments.length && void 0 !== e ? e : 0,
							o = 1 < arguments.length && void 0 !== t ? t : 0,
							r = 2 < arguments.length && void 0 !== n ? n : 0;
						return this.support.transform3d ? "translate3d(" + i + ", " + o + ", " + r + ")" : !!this.support.translate && "translate(" + i + ", " + o + ")"
					}
				}, {
					key: "destroy",
					value: function () {
						window.removeEventListener("resize", this, {
							caption: !1
						}), window.removeEventListener("scroll", this, {
							caption: !1
						}), this.sidebar.classList.remove(this.options.stickyClass), this.sidebar.style.minHeight = "", this.sidebar.removeEventListener("update" + l, this);
						var e = {
							inner: {},
							outer: {}
						};
						for (var t in e.inner = {
							position: "",
							top: "",
							left: "",
							bottom: "",
							width: "",
							transform: ""
						}, e.outer = {
							height: "",
							position: ""
						}, e.outer) this.sidebar.style[t] = e.outer[t];
						for (var n in e.inner) this.sidebarInner.style[n] = e.inner[n];
						this.options.resizeSensor && "undefined" != typeof ResizeSensor && (ResizeSensor.detach(this.sidebarInner, this.handleEvent), ResizeSensor.detach(this.container, this.handleEvent))
					}
				}], [{
					key: "supportTransform",
					value: function (e) {
						var n = !1,
							t = e ? "perspective" : "transform",
							i = t.charAt(0).toUpperCase() + t.slice(1),
							o = document.createElement("support").style;
						return (t + " " + ["Webkit", "Moz", "O", "ms"].join(i + " ") + i).split(" ").forEach(function (e, t) {
							if (void 0 !== o[e]) return n = e, !1
						}), n
					}
				}, {
					key: "eventTrigger",
					value: function (e, t, n) {
						try {
							var i = new CustomEvent(t, {
								detail: n
							})
						} catch (e) {
							(i = document.createEvent("CustomEvent")).initCustomEvent(t, !0, !0, n)
						}
						e.dispatchEvent(i)
					}
				}, {
					key: "extend",
					value: function (e, t) {
						var n = {};
						for (var i in e) void 0 !== t[i] ? n[i] = t[i] : n[i] = e[i];
						return n
					}
				}, {
					key: "offsetRelative",
					value: function (e) {
						var t = {
							left: 0,
							top: 0
						};
						do {
							var n = e.offsetTop,
								i = e.offsetLeft;
							isNaN(n) || (t.top += n), isNaN(i) || (t.left += i), e = "BODY" === e.tagName ? e.parentElement : e.offsetParent
						} while (e);
						return t
					}
				}, {
					key: "addClass",
					value: function (e, t) {
						c.hasClass(e, t) || (e.classList ? e.classList.add(t) : e.className += " " + t)
					}
				}, {
					key: "removeClass",
					value: function (e, t) {
						c.hasClass(e, t) && (e.classList ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " "))
					}
				}, {
					key: "hasClass",
					value: function (e, t) {
						return e.classList ? e.classList.contains(t) : new RegExp("(^| )" + t + "( |$)", "gi").test(e.className)
					}
				}]), c);

				function c(e) {
					var t = this,
						n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
					if (function (e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, c), this.options = c.extend(o, n), this.sidebar = "string" == typeof e ? document.querySelector(e) : e, void 0 === this.sidebar) throw new Error("There is no specific sidebar element.");
					this.sidebarInner = !1, this.container = this.sidebar.parentElement, this.affixedType = "STATIC", this.direction = "down", this.support = {
						transform: !1,
						transform3d: !1
					}, this._initialized = !1, this._reStyle = !1, this._breakpoint = !1, this._resizeListeners = [], this.dimensions = {
						translateY: 0,
						topSpacing: 0,
						lastTopSpacing: 0,
						bottomSpacing: 0,
						lastBottomSpacing: 0,
						sidebarHeight: 0,
						sidebarWidth: 0,
						containerTop: 0,
						containerHeight: 0,
						viewportHeight: 0,
						viewportTop: 0,
						lastViewportTop: 0
					}, ["handleEvent"].forEach(function (e) {
						t[e] = t[e].bind(t)
					}), this.initialize()
				}
				return window.StickySidebar = e
			}, "object" === (void 0 === n ? "undefined" : i(n)) && void 0 !== t ? t.exports = o() : "function" == typeof define && define.amd ? define(o) : (void 0).StickySidebar = o()
		}, {}
	],
	5: [
		function (e, t, n) {
			"use strict";
			Object.defineProperty(n, "__esModule", {
				value: !0
			}), n.default = void 0;
			var i = o(e("sticky-sidebar"));
			o(e("jquery"));

			function o(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}

			function r(e, t) {
				for (var n = 0; n < t.length; n++) {
					var i = t[n];
					i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
				}
			}
			var s = function () {
				function t(e) {
					! function (e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, t), this.$dom = {
						container: e
					}, this.sidebar = null, this.sidebarClass = ".sticky-sidebar .sidebar__inner"
				}
				return function (e, t, n) {
					t && r(e.prototype, t), n && r(e, n)
				}(t, [{
					key: "handleStickyPanel",
					value: function () {
						window.matchMedia("(max-width: 767px)").matches ? this.sidebar && (this.sidebar.destroy(), this.sidebar = null, jQuery(this.sidebarClass).removeClass("is-sticky")) : this.sidebar ? this.sidebar.updateSticky() : (this.sidebar = new i.default(this.sidebarClass, {
							topSpacing: 160
						}), jQuery(this.sidebarClass).addClass("is-sticky"))
					}
				}, {
					key: "onResize",
					value: function () {
						var e = this,
							t = !1;
						jQuery(window).on("resize", function () {
							t || (t = !0, window.setTimeout(function () {
								e.handleStickyPanel(), t = !1
							}, 25))
						}), jQuery(window).trigger("resize")
					}
				}, {
					key: "init",
					value: function () {
						var e = this;
						jQuery(window).on("load", function () {
							e.onResize(), e.handleStickyPanel()
						})
					}
				}]), t
			}();
			n.default = s
		}, {
			jquery: 2,
			"sticky-sidebar": 4
		}
	],
	6: [
		function (e, t, n) {
			"use strict";
			Object.defineProperty(n, "__esModule", {
				value: !0
			}), n.default = void 0;
			var i;
			(i = e("jquery")) && i.__esModule;

			function o(e, t) {
				for (var n = 0; n < t.length; n++) {
					var i = t[n];
					i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
				}
			}
			var r = function () {
				function t(e) {
					! function (e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, t), this.$dom = {
						el: e
					}
				}
				return function (e, t, n) {
					t && o(e.prototype, t), n && o(e, n)
				}(t, [{
					key: "updateHeaderOnScroll",
					value: function () {
						var e = jQuery(this.$dom.el);
						100 <= jQuery(window).scrollTop() ? e.addClass("scrolled") : e.removeClass("scrolled")
					}
				}, {
					key: "handleMenuItemRelease",
					value: function () {
						var t = jQuery("body"),
							n = jQuery(this.$dom.el),
							e = jQuery(".menu-item a", n),
							i = jQuery(".btn-menu", n);
						e.on("click", function (e) {
							t.hasClass("menu-opened") && (n.removeClass("menu-active"), t.removeClass("menu-opened"), i.removeClass("active"))
						})
					}
				}, {
					key: "handleMenuButtonRelease",
					value: function () {
						var t = jQuery("body"),
							n = jQuery(this.$dom.el),
							i = jQuery(".btn-menu", n);
						i.on("click", function (e) {
							t.toggleClass("menu-opened"), t.hasClass("menu-opened") ? (i.addClass("active"), n.addClass("menu-active")) : (i.removeClass("active"), n.removeClass("menu-active"))
						})
					}
				}, {
					key: "onScroll",
					value: function () {
						var e = this,
							t = !1;
						jQuery(window).on("scroll", function () {
							t || (t = !0, window.setTimeout(function () {
								e.updateHeaderOnScroll(), t = !1
							}, 15))
						}), jQuery(document).trigger("scroll")
					}
				}, {
					key: "init",
					value: function () {
						this.onScroll(), this.handleMenuItemRelease(), this.handleMenuButtonRelease()
					}
				}]), t
			}();
			n.default = r
		}, {
			jquery: 2
		}
	],
	7: [
		function (e, t, n) {
			"use strict";
			Object.defineProperty(n, "__esModule", {
				value: !0
			}), n.default = void 0;
			var i, o = (i = e("jquery")) && i.__esModule ? i : {
				default: i
			};

			function r(e, t) {
				for (var n = 0; n < t.length; n++) {
					var i = t[n];
					i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
				}
			}
			var s = function () {
				function t(e) {
					! function (e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, t), this.$dom = {
						el: e
					}
				}
				return function (e, t, n) {
					t && r(e.prototype, t), n && r(e, n)
				}(t, [{
					key: "scrollToTop",
					value: function () {
						jQuery("body,html").animate({
							scrollTop: 0
						}, 750)
					}
				}, {
					key: "events",
					value: function () {
						(0, o.default)(this.$dom.el).on("click", o.default.proxy(this.scrollToTop, this))
					}
				}, {
					key: "init",
					value: function () {
						this.events()
					}
				}]), t
			}();
			n.default = s
		}, {
			jquery: 2
		}
	],
	8: [
		function (e, t, n) {
			"use strict";
			Object.defineProperty(n, "__esModule", {
				value: !0
			}), n.default = void 0;
			(i = e("jquery")) && i.__esModule;
			var i, r = function (e) {
				if (e && e.__esModule) return e;
				var t = s();
				if (t && t.has(e)) return t.get(e);
				var n = {};
				if (null != e) {
					var i = Object.defineProperty && Object.getOwnPropertyDescriptor;
					for (var o in e)
						if (Object.prototype.hasOwnProperty.call(e, o)) {
							var r = i ? Object.getOwnPropertyDescriptor(e, o) : null;
							r && (r.get || r.set) ? Object.defineProperty(n, o, r) : n[o] = e[o]
						}
				}
				n.default = e, t && t.set(e, n);
				return n
			}(e("ScrollMagic"));

			function s() {
				if ("function" != typeof WeakMap) return null;
				var e = new WeakMap;
				return s = function () {
					return e
				}, e
			}

			function o(e, t) {
				for (var n = 0; n < t.length; n++) {
					var i = t[n];
					i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
				}
			}
			var a = function () {
				function t(e) {
					! function (e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, t), this.$dom = {
						el: e
					}
				}
				return function (e, t, n) {
					t && o(e.prototype, t), n && o(e, n)
				}(t, [{
					key: "initScrollSlider",
					value: function () {
						var n = jQuery(this.$dom.el).find(".slider-panel .slider .item"),
							i = jQuery(this.$dom.el).find(".slider-panel .slider-dots li"),
							e = jQuery(this.$dom.el).outerHeight() * n.length,
							o = 0,
							kar= 0,
							t = new r.Controller({
								globalSceneOptions: {
									duration: e
								}
							});
						new r.Scene({
							triggerElement: this.$dom.el[0],
							triggerHook: 0
						}).setPin(jQuery(this.$dom.el)[0]).addTo(t).on("progress", function (e) {
							var t = n.length - 1;
							console.log(n.length, t, o);
							console.log(e.progress);
							console.log(Math.floor(e.progress *4* n.length));
							console.log("** "+kar++);
							
							e.progress < 1 && (t = Math.floor(e.progress * n.length)), t != o && (o = t, n.removeClass("active"), i.removeClass("slider-active"), jQuery(n[o]).addClass("active"), jQuery(i[o]).addClass("slider-active"))
						})
					}
				}, {
					key: "init",
					value: function () {
						this.initScrollSlider()
					}
				}]), t
			}();
			n.default = a
		}, {
			ScrollMagic: 1,
			jquery: 2
		}
	],
	9: [
		function (e, t, n) {
			"use strict";
			Object.defineProperty(n, "__esModule", {
				value: !0
			}), n.default = void 0;
			var i, o = (i = e("jquery")) && i.__esModule ? i : {
				default: i
			};

			function r(e, t) {
				for (var n = 0; n < t.length; n++) {
					var i = t[n];
					i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
				}
			}
			e("slick-carousel"), window.$ = window.jQuery = o.default;
			var s = function () {
				function t(e) {
					! function (e, t) {
						if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
					}(this, t), this.$dom = {
						el: e
					}
				}
				return function (e, t, n) {
					t && r(e.prototype, t), n && r(e, n)
				}(t, [{
					key: "initSlider",
					value: function () {
						var e = jQuery(this.$dom.el);
						e.length && e.each(jQuery.proxy(function (e, t) {
							var n = jQuery(t),
								i = (n.find(".slider-panel"), n.find(".slider")),
								o = n.find(".slider-nav");
							i.slick({
								adaptiveHeight: !1,
								arrows: !1,
								autoplay: !0,
								centerPadding: "0",
								centerMode: !0,
								fade: !0,
								dots: !0,
								draggable: !0,
								infinite: !0,
								nextArrow: jQuery(".slider-next", o),
								prevArrow: jQuery(".slider-prev", o),
								slidesToScroll: 1,
								slidesToShow: 1,
								speed: 600
							})
						}, this))
					}
				}, {
					key: "init",
					value: function () {
						this.initSlider()
					}
				}]), t
			}();
			n.default = s
		}, {
			jquery: 2,
			"slick-carousel": 3
		}
	],
	10: [
		function (e, t, n) {
			"use strict";
			var i = l(e("./components/MainNav")),
				o = l(e("./components/Testimonials")),
				r = l(e("./components/ScrollSlider")),
				s = l(e("./components/ReturnToTop")),
				a = l(e("./components/FloatingPanel"));

			function l(e) {
				return e && e.__esModule ? e : {
					default: e
				}
			}! function (e) {
				new i.default(e(".site-header")).init(), e(".block__testimonials").length && new o.default(e(".block__testimonials")).init();
				e(".block__scroll-slider").length && new r.default(e(".block__scroll-slider")).init();
				e(".btn-return-to-top").length && new s.default(e(".btn-return-to-top")).init();
				e(".sticky-sidebar").length && new a.default(e(".sticky-sidebar")).init()
			}(jQuery)
		}, {
			"./components/FloatingPanel": 5,
			"./components/MainNav": 6,
			"./components/ReturnToTop": 7,
			"./components/ScrollSlider": 8,
			"./components/Testimonials": 9
		}
	]
}, {}, [10]);
//# sourceMappingURL=modules.js.map
;
! function (a, b) {
	"use strict";

	function c() {
		if (!e) {
			e = !0;
			var a, c, d, f, g = -1 !== navigator.appVersion.indexOf("MSIE 10"),
				h = !!navigator.userAgent.match(/Trident.*rv:11\./),
				i = b.querySelectorAll("iframe.wp-embedded-content");
			for (c = 0; c < i.length; c++) {
				if (d = i[c], !d.getAttribute("data-secret")) f = Math.random().toString(36).substr(2, 10), d.src += "#?secret=" + f, d.setAttribute("data-secret", f);
				if (g || h) a = d.cloneNode(!0), a.removeAttribute("security"), d.parentNode.replaceChild(a, d)
			}
		}
	}
	var d = !1,
		e = !1;
	if (b.querySelector)
		if (a.addEventListener) d = !0;
	if (a.wp = a.wp || {}, !a.wp.receiveEmbedMessage)
		if (a.wp.receiveEmbedMessage = function (c) {
			var d = c.data;
			if (d)
				if (d.secret || d.message || d.value)
					if (!/[^a-zA-Z0-9]/.test(d.secret)) {
						var e, f, g, h, i, j = b.querySelectorAll('iframe[data-secret="' + d.secret + '"]'),
							k = b.querySelectorAll('blockquote[data-secret="' + d.secret + '"]');
						for (e = 0; e < k.length; e++) k[e].style.display = "none";
						for (e = 0; e < j.length; e++)
							if (f = j[e], c.source === f.contentWindow) {
								if (f.removeAttribute("style"), "height" === d.message) {
									if (g = parseInt(d.value, 10), g > 1e3) g = 1e3;
									else if (~~g < 200) g = 200;
									f.height = g
								}
								if ("link" === d.message)
									if (h = b.createElement("a"), i = b.createElement("a"), h.href = f.getAttribute("src"), i.href = d.value, i.host === h.host)
										if (b.activeElement === f) a.top.location.href = d.value
							} else;
					}
		}, d) a.addEventListener("message", a.wp.receiveEmbedMessage, !1), b.addEventListener("DOMContentLoaded", c, !1), a.addEventListener("load", c, !1)
}(window, document);