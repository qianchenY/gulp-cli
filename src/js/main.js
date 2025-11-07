/* eslint-disable */
/*!
 * baguetteBox.js
 * @author  feimosi
 * @version 1.1.1
 * @url https://github.com/feimosi/baguetteBox.js
 */
var baguetteBox=function(){function t(t,n){L.transforms=f(),L.svg=p(),e(),D=document.querySelectorAll(t),[].forEach.call(D,function(t){var e=t.getElementsByTagName("a");e=[].filter.call(e,function(t){return j.test(t.href)});var o=S.length;S.push(e),S[o].options=n,[].forEach.call(S[o],function(t,e){h(t,"click",function(t){t.preventDefault?t.preventDefault():t.returnValue=!1,i(o),a(e)})})})}function e(){return(b=v("baguetteBox-overlay"))?(k=v("baguetteBox-slider"),w=v("previous-button"),C=v("next-button"),void(T=v("close-button"))):(b=y("div"),b.id="baguetteBox-overlay",document.getElementsByTagName("body")[0].appendChild(b),k=y("div"),k.id="baguetteBox-slider",b.appendChild(k),w=y("button"),w.id="previous-button",w.innerHTML=L.svg?E:"&lt;",b.appendChild(w),C=y("button"),C.id="next-button",C.innerHTML=L.svg?x:"&gt;",b.appendChild(C),T=y("button"),T.id="close-button",T.innerHTML=L.svg?B:"X",b.appendChild(T),w.className=C.className=T.className="baguetteBox-button",void n())}function n(){h(b,"click",function(t){t.target&&"IMG"!==t.target.nodeName&&"FIGCAPTION"!==t.target.nodeName&&s()}),h(w,"click",function(t){t.stopPropagation?t.stopPropagation():t.cancelBubble=!0,c()}),h(C,"click",function(t){t.stopPropagation?t.stopPropagation():t.cancelBubble=!0,u()}),h(T,"click",function(t){t.stopPropagation?t.stopPropagation():t.cancelBubble=!0,s()}),h(b,"touchstart",function(t){N=t.changedTouches[0].pageX}),h(b,"touchmove",function(t){H||(t.preventDefault?t.preventDefault():t.returnValue=!1,touch=t.touches[0]||t.changedTouches[0],touch.pageX-N>40?(H=!0,c()):touch.pageX-N<-40&&(H=!0,u()))}),h(b,"touchend",function(){H=!1}),h(document,"keydown",function(t){switch(t.keyCode){case 37:c();break;case 39:u();break;case 27:s()}})}function i(t){if(A!==t){for(A=t,o(S[t].options);k.firstChild;)k.removeChild(k.firstChild);X.length=0;for(var e,n=0;n<S[t].length;n++)e=y("div"),e.className="full-image",e.id="baguette-img-"+n,X.push(e),k.appendChild(X[n])}}function o(t){t||(t={});for(var e in P)I[e]=P[e],"undefined"!=typeof t[e]&&(I[e]=t[e]);k.style.transition=k.style.webkitTransition="fadeIn"===I.animation?"opacity .4s ease":"slideIn"===I.animation?"":"none","auto"===I.buttons&&("ontouchstart"in window||1===S[A].length)&&(I.buttons=!1),w.style.display=C.style.display=I.buttons?"":"none"}function a(t){"block"!==b.style.display&&(M=t,r(M,function(){g(M),m(M)}),d(),b.style.display="block",setTimeout(function(){b.className="visible"},50))}function s(){"none"!==b.style.display&&(b.className="",setTimeout(function(){b.style.display="none"},500))}function r(t,e){var n=X[t];if("undefined"!=typeof n){if(n.getElementsByTagName("img")[0])return void(e&&e());imageElement=S[A][t],imageCaption=imageElement.getAttribute("data-caption")||imageElement.title,imageSrc=l(imageElement);var i=y("figure"),o=y("img"),a=y("figcaption");n.appendChild(i),i.innerHTML='<div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>',o.onload=function(){var n=document.querySelector("#baguette-img-"+t+" .spinner");i.removeChild(n),!I.async&&e&&e()},o.setAttribute("src",imageSrc),i.appendChild(o),I.captions&&imageCaption&&(a.innerHTML=imageCaption,i.appendChild(a)),I.async&&e&&e()}}function l(t){var e=imageElement.href;if(t.dataset){var n=[];for(var i in t.dataset)"at-"!==i.substring(0,3)||isNaN(i.substring(3))||(n[i.replace("at-","")]=t.dataset[i]);keys=Object.keys(n).sort(function(t,e){return parseInt(t)<parseInt(e)?-1:1});for(var o=window.innerWidth*window.devicePixelRatio,a=0;a<keys.length-1&&keys[a]<o;)a++;e=n[keys[a]]||e}return e}function u(){M<=X.length-2?(M++,d(),g(M)):I.animation&&(k.className="bounce-from-right",setTimeout(function(){k.className=""},400))}function c(){M>=1?(M--,d(),m(M)):I.animation&&(k.className="bounce-from-left",setTimeout(function(){k.className=""},400))}function d(){var t=100*-M+"%";"fadeIn"===I.animation?(k.style.opacity=0,setTimeout(function(){L.transforms?k.style.transform=k.style.webkitTransform="translate3d("+t+",0,0)":k.style.left=t,k.style.opacity=1},400)):L.transforms?k.style.transform=k.style.webkitTransform="translate3d("+t+",0,0)":k.style.left=t}function f(){var t=y("div");return"undefined"!=typeof t.style.perspective||"undefined"!=typeof t.style.webkitPerspective}function p(){var t=y("div");return t.innerHTML="<svg/>","http://www.w3.org/2000/svg"==(t.firstChild&&t.firstChild.namespaceURI)}function g(t){t-M>=I.preload||r(t+1,function(){g(t+1)})}function m(t){M-t>=I.preload||r(t-1,function(){m(t-1)})}function h(t,e,n){t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent("on"+e,n)}function v(t){return document.getElementById(t)}function y(t){return document.createElement(t)}var b,k,w,C,T,N,E='<svg width="44" height="60"><polyline points="30 10 10 30 30 50" stroke="rgba(255,255,255,0.5)" stroke-width="4"stroke-linecap="butt" fill="none" stroke-linejoin="round"/></svg>',x='<svg width="44" height="60"><polyline points="14 10 34 30 14 50" stroke="rgba(255,255,255,0.5)" stroke-width="4"stroke-linecap="butt" fill="none" stroke-linejoin="round"/></svg>',B='<svg width="30" height="30"><g stroke="rgb(160, 160, 160)" stroke-width="4"><line x1="5" y1="5" x2="25" y2="25"/><line x1="5" y1="25" x2="25" y2="5"/></g></svg>',I={},P={captions:!0,buttons:"auto",async:!1,preload:2,animation:"slideIn"},L={},M=0,A=-1,H=!1,j=/.+\.(gif|jpe?g|png|webp)/i,D=[],S=[],X=[];return[].forEach||(Array.prototype.forEach=function(t,e){for(var n=0;n<this.length;n++)t.call(e,this[n],n,this)}),[].filter||(Array.prototype.filter=function(t,e,n,i,o){for(n=this,i=[],o=0;o<n.length;o++)t.call(e,n[o],o,n)&&i.push(n[o]);return i}),{run:t}}();


/*! Lazy Load 1.9.3 - MIT license - Copyright 2010-2013 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)};if(c.parent("picture").length>0&&check_support_webp()){c.attr("data-"+j.data_attribute,c.prev().attr("srcset"))};a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}});function check_support_webp(){return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp')==0}}(jQuery,window,document);

// clientAnimate.js
$.fn.extend({clientAnimate:function(t){var i=$(this),n=$(window).height(),f=$(window).width(),o=$.extend({difference:60,toggle:false,className:"run",animatStop:992},t);i.each(function(t){var e=$(this).height(),i=$(this).offset().top;if(f>=o.animatStop?n>i:true){$(this).addClass(o.className)}});$(window).scroll(function(t){var e=$(this),a=e.scrollTop(),s=o.difference;i.each(function(t){var e=$(this).height(),i=$(this).offset().top;if(a+n>=i+s&&a<=i+e-s){if(!$(this).hasClass(o.className)){$(this).addClass(o.className)}}else if(a>i+e+s||a+n<i-s){if(o.toggle&&f>=o.animatStop){$(this).removeClass(o.className)}}})});return i}});$(function(){if(false&&$(window).innerWidth()>959){var e=["j-offset-top","j-offset-left","j-offset-right"];$(".f-box").each(function(){var t=$(this);if(!t.hasClass("no-animate")){t.addClass(e[Math.floor(e.length*Math.random())])}});$(".j-offset-top").clientAnimate();$(".j-offset-left").clientAnimate();$(".j-offset-right").clientAnimate()}$(".j-offset-top").clientAnimate();$(".j-offset-left").clientAnimate();$(".j-offset-right").clientAnimate();$(".j-fadein").clientAnimate()});


// placeholder.js
$(function(){if(!placeholderSupport()){$("[placeholder]").focus(function(){var l=$(this);if(l.val()==l.attr("placeholder")){l.val("");l.removeClass("placeholder")}}).blur(function(){var l=$(this);if(l.val()==""||l.val()==l.attr("placeholder")){l.addClass("placeholder");l.val(l.attr("placeholder"))}}).blur()}});function placeholderSupport(){return"placeholder"in document.createElement("input")}

// lunbo.js
(function (u) {
    u.fn.extend({
        DY_scroll: function (o) {
            var i = u(this);
            i.each(function () {
                var i = u(this),
                    _this = u(this);
                var l = u.extend({
                    prev: ".prev",
                    next: ".next",
                    list: "ul",
                    item: "li",
                    auto: false,
                    speed: 4,
                    num: 1,
                    toggle: true,
                    mClick: false,
                    mClickName: "",
                    loop: true,
                    cb: null,
                    showNum: false,
                    autoHeight: false
                }, o);

                l.prev= i.find(l.prev);
                l.next=i.find(l.next);
                l.list= i.find(l.list);

                var e = l.list.find(l.item),
                    t = l.list.find(l.item).outerWidth(true),
                    n = l.list.find(l.item).outerHeight(true),
                    count = 1,
                    total = Math.round(l.list.parent().outerWidth() / t) - 1,
                    s = e.length,
                    clientNum = getClientNum(),
                    scrollFX;

                if(l.autoHeight) initHeight(), changeHeight(0, clientNum, true);

				function initHeight(){
					e.each(function(){
						let _this =$(this),
							$img = _this.find('img'),
							$h = _this.outerHeight(true);

						_this.data('height', $h);

						if($img.length > 0){
							$img.each(function(){
								let img = $(this)[0];

								if(img.complete){
									$h = _this.outerHeight(true);
		
									_this.data('height', $h);
								}else{
									img.onload = function(){
										$h = _this.outerHeight(true);
		
										_this.data('height', $h);
									}
		
									img.onerror = function(){
										$h = _this.outerHeight(true);
		
										_this.data('height', $h);
									}
								}
							})

						}
					})
				}

				function changeHeight(start, clientNum, isImg){

					for(let i = start, height = 0; i < clientNum; i++){
						let $item = l.list.find(l.item).eq(i),
							$img = $item.find('img'),
							$h = $item.data('height');

							if($h > height){
								height = $h;
								l.list.css('height', height);
							}
					}
				}
				
				function getClientNum(){
					let $item = l.list.find(l.item),
						$w1 = l.list.parent().outerWidth(true),
						$w2 = 0,
						$page = 0;
					for(let i = 0; i < $item.length; i++){
						let _this = $item.eq(0),
							$w = _this.outerWidth(false);

						$w2 = $w2 + $w;

						if($w2 <= $w1){
							$page++;
						}else{
							return $page;
						}
					}
				}

                if (s >= l.num) {
                    if (l.toggle) {
                        l.next.click(function () {
                            runLeft();
                        });
                        l.prev.click(function () {
                            runRight();
                        })
                    } else {
                        t = l.list.find(l.item).outerHeight(true);
                        total = Math.round(l.list.parent().outerHeight() / t) - 1;
                        l.next.click(function () {
                            runTop();
                        });
                        l.prev.click(function () {
                            runBottom();
                        })
                    }

                    function runLeft(){
                        if (l.list.is(":animated")) {
                            return false
                        }
                        if (count >= s - total) {
                            if (!l.loop) {
                                return
                            }
                        } else {
                            count++
                        }
                        if(l.autoHeight) changeHeight(1, clientNum + 1, false);

                        t = l.list.find(l.item).outerWidth(true);
                        l.list.animate({
                            "margin-left": -t
                        }, function () {
                            l.list.find(l.item).eq(0).appendTo(l.list);
                            l.list.css({
                                "margin-left": 0
                            });
                            a(l.list, true);
                            l.cb && l.cb(l.list)
                        })
                    }

                    function runRight(){
                        if (l.list.is(":animated")) {
                            return false
                        }
                        if (count <= 1) {
                            if (!l.loop) {
                                return
                            }
                        } else {
                            count--
                        }
                        if(l.autoHeight) changeHeight(-1, clientNum - 1, false);

                        t = l.list.find(l.item).outerWidth(true);
                        l.list.find(l.item + ":last").prependTo(l.list);
                        l.list.css({
                            "margin-left": -t
                        });
                        l.list.animate({
                            "margin-left": 0
                        });
                        a(l.list, false);
                        l.cb && l.cb(l.list)
                    }

                    function runTop(){
                        l.prev.show();
                        if (l.list.is(":animated")) {
                            return false
                        }
                        if (!l.loop) {
                            if (count >= s - total - 1) {
                                l.next.hide()
                            }
                            if (count >= s - total) {
                                scrollFX = "prev";
                                return
                            } else {
                                count++
                            }
                        }
                        n = l.list.find(l.item).outerHeight(true);
                        l.list.animate({
                            "margin-top": -n
                        }, function () {
                            l.list.find(l.item).eq(0).appendTo(l.list);
                            l.list.css({
                                "margin-top": 0
                            });
                            a(l.list, true);
                            l.cb && l.cb(l.list)
                        })
                    }

                    function runBottom(){
                        l.next.show();
                        if (l.list.is(":animated")) {
                            return false
                        }
                        if (!l.loop) {
                            if (count <= 2) {
                                l.prev.hide()
                            }
                            if (count <= 1) {
                                scrollFX = "next";
                                return
                            } else {
                                count--
                            }
                        }
                        n = l.list.find(l.item).outerHeight(true);
                        l.list.find(l.item + ":last").prependTo(l.list);
                        l.list.css({
                            "margin-top": -n
                        });
                        l.list.animate({
                            "margin-top": 0
                        });
                        a(l.list, false);
                        l.cb && l.cb(l.list)
                    }

                    function a(i, e) {
                        if (l.mClick) {
                            if (l.mClickName) {
                                var t = i.find(".active").parents(l.item).index(),
                                    n = i.find(l.item).length - 1;
                                if (e) {
                                    i.find(l.item).eq(t >= n ? 0 : t + 1).find(l.mClickName).click()
                                } else {
                                    i.find(l.item).eq(t <= 0 ? 0 : t - 1).find(l.mClickName).click()
                                }
                            } else {
                                var t = i.find(".active").index(),
                                    n = i.find(l.item).length - 1;
                                if (e) {
                                    i.find(l.item).eq(t >= n ? 0 : t + 1).click()
                                } else {
                                    i.find(l.item).eq(t <= 0 ? 0 : t - 1).click()
                                }
                            }
                        }
                        if (l.showNum) {
                            _this.find(".num").text(l.list.find(l.item).eq(0).data("index"))
                        }
                    }
                    if (l.auto) {
                        var r = setInterval(c, l.speed * 1000);
                        i.hover(function () {
                            clearInterval(r)
                        }, function () {
                            r = setInterval(c, l.speed * 1000)
                        })
                    }

                    function c() {
                        if(l.toggle){
                            if (!l.loop) {
                                if (!scrollFX) {
                                    scrollFX = "next"
                                }
                                if (scrollFX == "next") {
                                    runLeft();
                                } else {
                                    if (scrollFX == "prev") {
                                        runRight();
                                    }
                                }
                            } else {
                                runLeft();
                            }
                        }else{
                            if (!l.loop) {
                                if (!scrollFX) {
                                    scrollFX = "next"
                                }
                                if (scrollFX == "next") {
                                    runTop();
                                } else {
                                    if (scrollFX == "prev") {
                                        runBottom();
                                    }
                                }
                            } else {
                                runTop();
                            }
                        }
                    }
                    if ("ontouchstart" in document || /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent) || u(window).innerWidth() <= 1024) {
                        var f = 0,
                            d = 0;
                        l.list[0].addEventListener("touchstart", function (i) {
                            f = i.targetTouches[0]
                        });
                        l.list[0].addEventListener("touchend", function (i) {
                            d = i.changedTouches[0];
                            var e = Math.abs(d.screenX - f.screenX),
                                t = Math.abs(d.screenY - f.screenY);
                            if (e > t && e >= 100) {
                                if (d.screenX - f.screenX > 0) {
                                    runRight();
                                } else {
                                    runLeft();
                                }
                            }
                        })
                    }
                }
            })
        }
    })
})($);

// lunbo2.js
(function(){$.fn.extend({DY_scroll2:function(e){var n=$(this),u=$.extend({auto:false,feed:3500,wheel:false,prev:".prev",next:".next"},e);n.each(function(){var e=$(this),t=e.find(".box-list"),a=e.find(".box-page"),s=t.find(".list-wp"),n=s.length,i=n,r=s.innerWidth(),c;for(var d=0;d<i;d++){a.append('<a class="page-item" href="javascript: void(0);" title=""></a>')}c=a.find(".page-item");c.eq(0).addClass("active");s.eq(0).addClass("show");c.click(function(e){e.preventDefault();var n=$(this),i=n.index();r=s.innerWidth();if(!t.is(":animated")){n.addClass("active").siblings().removeClass("active");t.animate({"margin-left":-i*r},550);s.eq(i).addClass("show").siblings().removeClass("show")}});e.find(u.prev).click(function(e){e.preventDefault();var n=$(this),i=a.find(".active").index();h(true,i)});e.find(u.next).click(function(e){e.preventDefault();var n=$(this),i=a.find(".active").index();h(false,i)});if(u.auto){var l=setInterval(v,u.feed);e.hover(function(){clearInterval(l)},function(){l=setInterval(v,u.feed)})}if(document.addEventListener&&u.wheel){t[0].addEventListener("mousewheel",function(e){e.preventDefault();var n=$(this),i=a.find(".active").index();h(e.wheelDelta>0,i)})}if("ontouchstart"in document||/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)||$(window).innerWidth()<=1024){var f=0,o=0;t.on("touchstart",function(e){f=e.originalEvent.targetTouches[0]});t.on("touchend",function(e){o=e.originalEvent.changedTouches[0];var n=Math.abs(o.screenX-f.screenX),i=Math.abs(o.screenY-f.screenY),t=a.find(".active").index();if(n>i&&n>=100){h(o.screenX-f.screenX>0,t)}})}function v(){var e=a.find(".active").index(),n=c.length-1;e=e<n?e+1:0;c.eq(e).click()}function h(e,n){if(e){n=n>0?n-1:c.length-1}else{n=n<c.length-1?n+1:0}if(!t.is(":animated")){c.eq(n).click()}}})}});$(".j-pagescroll").DY_scroll2()})($);

// tabJS.js
(function () {
    $.fn.extend({
        boxTab: function (time, event, hditem, bditem, cname) {
            var n = $(this);
            n.each(function () {
                var i = $(this),
                    n = i.find(hditem || ".tabhd-item"),
                    e = i.find(bditem || ".tabbd-item"),
					sl = i.find("select"),
                    s = cname || "active";
				
				sl.change(function(i){
                    var n = $(this),
                        t = n.val(),
                        a = e;

                    n.addClass(s).siblings().removeClass(s);
                    a.eq(t).show(time).siblings().hide(time)
                    
                })
                n[event](function (i) {
                    i.preventDefault();
                    var n = $(this),
                        t = n.index(),
                        a = e;
                    n.addClass(s).siblings().removeClass(s);
                    a.eq(t).show(time).siblings().hide(time);
                });
            })
        }
    });
    $(".j-boxtab").boxTab(500, "click");
    $(".j-boxtab1").boxTab(0, "click");
    $(".j-boxtab2").boxTab(0, "mouseenter");
})($);

// formcountry
$.fn.extend({
    country: function () {
        var n = $(this);
        n.each(function () {
            var _this = $(this),
                $ul = _this.find('ul'),
                $input = _this.find('input');
            
            _this.click(function(e){
                $(this).find("ul").show();
                e.stopPropagation();
            });
            
            $ul.on('mouseover mouseout', 'li' ,function(e){
                $(this).toggleClass("on");
                e.stopPropagation();
            });
            
            $ul.on('click', 'li' ,function(e){
                var _this = $(this),
                    val = _this.text();
                if ($input.data('portion') == 'portion') {
                    if (val.indexOf('--') != -1) 
                        val = val.substring(0, val.indexOf('--'));
                }
                $input.val(val);
                $ul.hide();
                e.stopPropagation();
            });
            
            $input.on('input', function(){
                var count = 0,
                    strValue = $input.val();
                if (strValue != "") {
                    $ul.children("li").each(function(i) {
                        var contentValue = $(this).text();
                        if (contentValue.toLowerCase().indexOf(strValue.toLowerCase()) < 0) {
                            $(this).hide();
                            count++;
                        } else {
                            $(this).show();
                        }
                        if (count == (i + 1)) {
                            $ul.hide();
                        } else {
                            $ul.show();
                        }
                    });
                } else {
                    $ul.children("li").each(function() {
                        $(this).show();
                    });
                }
            })

        });

        $(document).click(function(){
            n.find("ul").hide();
        });
    },
});
$('.m-formcountry').country();
// nav.js
(function() {
	// .m-mobilenav start
	$(".m-mobilenav").click(function(){
        var _this = $(this),
            $btn = _this.find(".mbnav-btn");

		_this.toggleClass("show");
    });
    
    $(".m-mobilenav .nextshow").click(function(e){
        e.preventDefault();

        var _this = $(this);

        if(_this.next().is(":hidden")){
            _this.text("-");
            _this.next().slideDown();
        }else{
            _this.text("+");
            _this.next().slideUp();
        }
    })
    $(".m-mobilenav .mbnav-fix").click(function(e){
        e.stopPropagation();
    })
	// .m-mobilenav end
})()