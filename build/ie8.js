!function(){Array.prototype.indexOf=function(t,e){for(var n=this.length,r=0>e?Math.max(0,n+e):e||0;n>r;r+=1)if(this[r]===t)return r;return-1},Array.prototype.forEach=function(t,e){var n=this.length>>>0;if("function"!=typeof t)throw new TypeError;for(var r=0;n>r;r+=1)t.call(e,this[r],r,this)},Array.prototype.filter=function(t,e){for(var n=[],r=0,o=this.length;o>r;r+=1){var i=this[r];t.call(e,i,r,this)&&n.push(i)}return n},Object.keyOf=function(t,e){for(var n in t)if(t[n]===e)return n},Date.now=function(){return+new Date},String.prototype.trim=function(){for(var t=this.replace(/^\s\s*/,""),e=/\s/,n=t.length;e.test(t.charAt(n-=1)););return t.slice(0,n+1)}}(),function(){var t=document;window.ie=8,t.defaultView=window;var e={focus:"focusin",blur:"focusout"},n=function(){return!0},r=function(){return!1},o="altKey ctrlKey metaKey shiftKey clientX clientY charCode keyCode".split(" "),i=function(t){for(var n,r=t.type,i=document,a=t.srcElement||i,s=(a.ownerDocument||i).documentElement,c=o.length;c--;)n=o[c],this[n]=t[n];"propertychange"===r&&(r="INPUT"===a.nodeName&&"text"!==a.type&&"password"!==a.type?"change":"input"),this.type=Object.keyOf(e,r)||r,this.target=a,this.pageX=t.clientX+s.scrollLeft,this.pageY=t.clientY+s.scrollTop,t.button&&(this.button=4&t.button?1:2&t.button?2:0,this.which=this.button+1),this.relatedTarget=t.fromElement===a?t.toElement:t.fromElement,this._event=t};i.prototype={constructor:i,isEvent:!0,preventDefault:function(){this.isDefaultPrevented=n,this._event.returnValue=!1},stopPropagation:function(){this.isPropagationStopped=n,this._event.cancelBubble=!0},isDefaultPrevented:r,isPropagationStopped:r},[t,Element.prototype].forEach(function(t){t.addEventListener=function(t,n){var r=n._ie_handleEvent||(n._ie_handleEvent=function(){var t=new i(window.event);"object"==typeof n?n.handleEvent(t):n.call(this,t)}),o=/paste|cut/.test(t)?this.body||this:this;n._ie_registeredCount=(n._ie_registeredCount||0)+1,o.attachEvent("on"+(e[t]||t),r)},t.addEventListener.isFake=!0,t.removeEventListener=function(t,n){var r=n._ie_handleEvent,o=/paste|cut/.test(t)?this.body||this:this;(n._ie_registeredCount-=1)||delete n._ie_handleEvent,r&&o.detachEvent("on"+(e[t]||t),r)},t.removeEventListener.isFake=!0}),t.defaultView.addEventListener=function(e,n,r){return t.addEventListener(e,n,r)},Object.defineProperty(Element.prototype,"textContent",{get:function(){return this.innerText},set:function(t){this.innerText=t}}),Element.prototype.compareDocumentPosition=function(t){1!==t.nodeType&&(t=t.parentNode);var e=this,n=e!==t,r=e.sourceIndex,o=t.sourceIndex;return(n&&e.contains(t)?16:0)+(n&&t.contains(e)?8:0)+(o>r?4:0)+(r>o?2:0)},HTMLDocument.prototype.normalize=function(){for(var t,e=this.childNodes,n=e.length;n--;)t=e[n],1===t.nodeType&&t.normalize()}}();var Range;!function(){var t=Array.prototype.indexOf,e=0,n=1,r=3,o=function(t,e){for(;e=e.parentNode;)if(t===e)return!0;return!1},i=function(t,e){var n,r,i,a,s;if(t===e||o(t,e))n=t;else if(o(e,t))n=e;else{for(r=[],i=[];t=t.parentNode;)r.push(t);for(;e=e.parentNode;)i.push(e);for(a=r.length,s=i.length;a--&&s--;)if(r[a]!==i[s]){n=r[a+1];break}n||(n=-1===a?r[0]:i[0])}return n};Range=function(t,e,n,r){t=t||document,e=e||0,this.startContainer=t,this.startOffset=e,this.endContainer=n||t,this.endOffset=void 0!==r?r:e,this._updateCollapsedAndAncestor()},Range.prototype={constructor:Range,_updateCollapsedAndAncestor:function(){this.collapsed=this.startContainer===this.endContainer&&this.startOffset===this.endOffset,this.commonAncestorContainer=i(this.startContainer,this.endContainer)},setStart:function(t,e){this.startContainer=t,this.startOffset=e,this._updateCollapsedAndAncestor()},setEnd:function(t,e){this.endContainer=t,this.endOffset=e,this._updateCollapsedAndAncestor()},setStartAfter:function(e){var n=e.parentNode;this.setStart(n,t.call(n.childNodes,e)+1)},setEndBefore:function(e){var n=e.parentNode;this.setEnd(n,t.call(n.childNodes,e))},selectNode:function(e){var n=e.parentNode,r=t.call(n.childNodes,e);this.setStart(n,r),this.setEnd(n,r+1)},selectNodeContents:function(t){this.setStart(t,0),this.setEnd(t,t.childNodes.length)},cloneRange:function(){return new Range(this.startContainer,this.startOffset,this.endContainer,this.endOffset)},collapse:function(t){t?this.setEnd(this.startContainer,this.startOffset):this.setStart(this.endContainer,this.endOffset)},compareBoundaryPoints:function(o,i){var a,s,c,d,f,u;if(o===e||o===r?(a=this.startContainer,s=this.startOffset):(a=this.endContainer,s=this.endOffset),o===e||o===n?(c=i.startContainer,d=i.startOffset):(c=i.endContainer,d=i.endOffset),a===c)return d>s?-1:s>d?1:0;for(f=a;u=f.parentNode;){if(u===c)return t.call(u.childNodes,f)<d?-1:1;f=u}for(f=c;u=f.parentNode;){if(u===a)return t.call(u.childNodes,f)<s?1:-1;f=u}return 1!==a.nodeType&&(a=a.parentNode),1!==c.nodeType&&(c=c.parentNode),a.sourceIndex<c.sourceIndex?-1:a.sourceIndex>c.sourceIndex?1:0}},document.createRange=function(){return new Range};var a=function(t,e){return t===e||o(t,e)},s=function(t){var e=t.nodeType;return 3===e||4===e||8===e},c=function(t,e){this.node=t,this.offset=e},d=function(t){var e,n,r,o,a=t.parentElement();return e=t.duplicate(),e.collapse(!0),n=e.parentElement(),e=t.duplicate(),e.collapse(!1),r=e.parentElement(),o=n===r?n:i(n,r),o===a?o:i(a,o)},f=function(e,n,r,o){var i=e.duplicate();i.collapse(r);var d=i.parentElement();if(a(n,d)||(d=n),!d.canHaveHTML)return new c(d.parentNode,t.call(d.parentNode.childNodes,d));var f,u,l,h,p,v=document.createElement("span"),m=r?"StartToStart":"StartToEnd";do d.insertBefore(v,v.previousSibling),i.moveToElementText(v),f=i.compareEndPoints(m,e);while(f>0&&v.previousSibling);if(p=v.nextSibling,-1===f&&p&&s(p)){i.setEndPoint(r?"EndToStart":"EndToEnd",e);var E;if(/[\r\n]/.test(p.data)||/[\r\n]/.test(i.text)){var g=i.duplicate(),y=g.text.replace(/\r\n/g,"\r").length;for(E=g.moveStart("character",y);-1===(f=g.compareEndPoints("StartToEnd",g));)E+=1,g.moveStart("character",1)}else E=i.text.length;h=new c(p,E)}else u=(o||!r)&&v.previousSibling,l=(o||r)&&v.nextSibling,h=l&&s(l)?new c(l,0):u&&s(u)?new c(u,u.data.length):new c(d,t.call(d.childNodes,v));return v.parentNode.removeChild(v),h},u=function(t,e){var n,r,o,i,a=t.offset,c=document,d=c.body.createTextRange(),f=s(t.node);return f?(n=t.node,r=n.parentNode):(i=t.node.childNodes,n=a<i.length?i[a]:null,r=t.node),o=c.createElement("span"),o.innerHTML="&#xfeff;",n?r.insertBefore(o,n):r.appendChild(o),d.moveToElementText(o),d.collapse(!e),r.removeChild(o),f&&d[e?"moveStart":"moveEnd"]("character",a),d},l=function(t){var e,n,r=d(t);return 0===t.compareEndPoints("StartToEnd",t)?e=n=f(t,r,!0,!0):(e=f(t,r,!0,!1),n=f(t,r,!1,!1)),new Range(e.node,e.offset,n.node,n.offset)},h=function(t){var e,n,r;return t.collapsed?e=u(new c(t.startContainer,t.startOffset),!0):(n=u(new c(t.startContainer,t.startOffset),!0),r=u(new c(t.endContainer,t.endOffset),!1),e=document.body.createTextRange(),e.setEndPoint("StartToStart",n),e.setEndPoint("EndToEnd",r)),e},p={rangeCount:0,getRangeAt:function(t){if(0!==t)return void 0;var e=document.selection.createRange();if(e.add){var n=document.createRange();n.moveToElementText(e.item(0)),n.collapse(!1),n.select(),e=n}return l(e)},removeAllRanges:function(){},addRange:function(t){h(t).select()}};document.attachEvent("onbeforeactivate",function(){p.rangeCount=1}),document.attachEvent("ondeactivate",function(){p.rangeCount=0}),window.getSelection=function(){return p}}();