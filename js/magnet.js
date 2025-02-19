!function (e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).MagnetMouse = t() }(this, function () { "use strict"; function e(e, t) { for (var n = 0; n < t.length; n++) { var i = t[n]; i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i) } } function t(e, t, n) { return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e } function n(e, t) { var n = Object.keys(e); return Object.getOwnPropertySymbols && n.push.apply(n, Object.getOwnPropertySymbols(e)), t && (n = n.filter(function (t) { return Object.getOwnPropertyDescriptor(e, t).enumerable })), n } function i(e) { for (var i = 1; i < arguments.length; i++) { var o = null != arguments[i] ? arguments[i] : {}; i % 2 ? n(o, !0).forEach(function (n) { t(e, n, o[n]) }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : n(o).forEach(function (t) { Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t)) }) } return e } return function () { var t, n, o; function a(e) { !function e(t, n) { if (!(t instanceof n)) throw TypeError("Cannot call a class as a function") }(this, a); var t = { element: ".magnet-mouse", class: "magnet-mouse-active", enabled: !0, distance: 30, position: "center" }, n = { element: ".follow-mouse", class: "follow-mouse-active" }; this.config = i({}, { follow: n, magnet: t, throttle: 5, inCallback: null, outCallback: null }, {}, e, { magnet: i({}, t, {}, e.magnet), follow: i({}, n, {}, e.follow) }), this.elementMagnet = document.querySelectorAll(this.config.magnet.element), this.elementFollow = document.querySelectorAll(this.config.follow.element) } return t = a, n = [{ key: "getMousePosition", value: function e(t) { var n; return { x: t.pageX, y: t.pageY } } }, { key: "getElementsPosition", value: function e() { for (var t = [], n = 0; n < this.elementMagnet.length; n++) { var i = this.elementMagnet[n].getBoundingClientRect(), o = window.pageXOffset || document.documentElement.scrollLeft, a = window.pageYOffset || document.documentElement.scrollTop; t.push({ elem: { node: this.elementMagnet[n], width: i.width, height: i.height }, xMin: i.left + o - this.config.magnet.distance, xMax: i.left + o + i.width + this.config.magnet.distance, yMin: i.top + a - this.config.magnet.distance, yMax: i.top + a + i.height + this.config.magnet.distance }) } return t } }, { key: "getPosition", value: function e(t, n) { var i, o; switch (this.config.magnet.position) { case "top-left": i = n.x - (t.xMin + this.config.magnet.distance), o = n.y - (t.yMin + this.config.magnet.distance); break; case "top-right": i = n.x - (t.xMin + t.elem.width + this.config.magnet.distance), o = n.y - (t.yMin + this.config.magnet.distance); break; case "bottom-left": i = n.x - (t.xMin + this.config.magnet.distance), o = n.y - (t.yMin + t.elem.height + this.config.magnet.distance); break; case "bottom-right": i = n.x - (t.xMin + t.elem.width + this.config.magnet.distance), o = n.y - (t.yMin + t.elem.height + this.config.magnet.distance); break; case "top-center": i = n.x - (t.xMin + this.config.magnet.distance + t.elem.width / 2), o = n.y - (t.yMin + this.config.magnet.distance); break; case "bottom-center": i = n.x - (t.xMin + this.config.magnet.distance + t.elem.width / 2), o = n.y - (t.yMin + t.elem.height + this.config.magnet.distance); break; default: i = n.x - (t.xMin + this.config.magnet.distance + t.elem.width / 2), o = n.y - (t.yMin + this.config.magnet.distance + t.elem.height / 2) }return { x: i, y: o } } }, { key: "defaultAction", value: function e(t, n, i) { if ("onEnter" === t) { if (this.elementFollow.length > 0) for (var o = 0; o < this.elementFollow.length; o++)this.elementFollow[o].classList.add(this.config.follow.class); i.elem.node.style.transform = "translate3d(" + n.x + "px," + n.y + "px, 0)", i.elem.node.classList.add(this.config.magnet.class) } else if ("onLeave" === t) { if (this.elementFollow.length > 0) for (var a = 0; a < this.elementFollow.length; a++)this.elementFollow[a].classList.remove(this.config.follow.class); i.elem.node.style.transform = "", i.elem.node.classList.remove(this.config.magnet.class) } } }, { key: "magnetElement", value: function e(t, n) { for (var i = 0; i < t.length; i++) { var o = this.getPosition(t[i], n); if (t[i].xMin < n.x && t[i].xMax > n.x && t[i].yMin < n.y && t[i].yMax > n.y) { this.defaultAction("onEnter", o, t[i]), null !== this.config.inCallback && "function" == typeof this.config.inCallback && this.config.inCallback.call(this, t[i]); break } this.defaultAction("onLeave", o, t[i]), null !== this.config.outCallback && "function" == typeof this.config.outCallback && this.config.outCallback.call(this, t[i]) } } }, { key: "hoverElement", value: function e(t, n) { for (var i = 0; i < t.length; i++) { var o = t[i].elem.node; t[i].xMin < n.x && t[i].xMax > n.x && t[i].yMin < n.y && t[i].yMax > n.y ? o.classList.add(this.config.magnet.class) : o.classList.remove(this.config.magnet.class) } } }, { key: "init", value: function e() { var t, n, i = this; if (a.mobileAndTabletcheck()) for (var o = 0; o < this.elementFollow.length; o++)this.elementFollow[o].remove(); else this.resizeFunction = a.throttle(function () { n = i.getElementsPosition() }, this.config.throttle), this.mouseFunction = a.throttle(function (e) { if (t = i.getMousePosition(e), i.config.magnet.enabled ? i.magnetElement(n, t) : i.hoverElement(n, t), i.elementFollow.length > 0) for (var o = 0; o < i.elementFollow.length; o++)i.elementFollow[o].style.transform = "translate3d(" + (t.x - window.pageXOffset) + "px," + (t.y - window.pageYOffset) + "px, 0)" }, this.config.throttle), window.addEventListener("resize", this.resizeFunction), document.addEventListener("DOMContentLoaded", function () { n = i.getElementsPosition() }), window.addEventListener("mousemove", this.mouseFunction) } }, { key: "destroy", value: function e() { window.removeEventListener("mousemove", this.mouseFunction), window.removeEventListener("resize", this.resizeFunction); for (var t = 0; t < this.elementMagnet.length; t++)this.elementMagnet[t].classList.remove(this.config.magnet.class), this.elementMagnet[t].style.transform = ""; for (var n = 0; n < this.elementFollow.length; n++)this.elementFollow[n].style.opacity = 0 } }], o = [{ key: "throttle", value: function e(t, n) { var i, o; return function () { var e = this, a = +new Date, l = arguments; i && a < i + n ? (clearTimeout(o), o = setTimeout(function () { i = a, t.apply(e, l) }, n)) : (i = a, t.apply(e, l)) } } }, { key: "mobileAndTabletcheck", value: function e() { var t, n = !1; return t = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (n = !0), n } }], n && e(t.prototype, n), o && e(t, o), a }() });