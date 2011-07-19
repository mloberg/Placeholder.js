/**
 * Placeholder.js is a JavaScript script to emulate the placeholder tag in browsers that don't support it (IE)
 * 
 * Author: Matthew Loberg
 * Author URL: http://mloberg.com/
 * Script URL: https://github.com/mloberg/Placeholder.js
 * License: MIT License
 *
 * Copyright (c) 2011 Matthew Loberg
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 */

(function(){
	var addLoadListener;
	var removeLoadListener;
	if(window.addEventListener){
		addLoadListener = function(func){
			window.addEventListener('DOMContentLoaded', func, false);
			window.addEventListener('load', func, false);
		}
		removeLoadListener = function(func){
			window.removeEventListener('DOMContentLoaded', func, false);
			window.removeEventListener('load', func, false);
		}
	}else if (document.attachEvent){
		addLoadListener = function(func){
			document.attachEvent('onreadystatechange', func);
			document.attachEvent('load', func);
		}
		removeLoadListener = function(func){
			document.detachEvent('onreadystatechange', func);
			document.detachEvent('load', func);
		}
	}
	
	var callbacks = null;
	var done = false;
	function __onReady(){
		done = true;
		removeLoadListener(__onReady);
		if(!callbacks) return
		for(var i = 0; i < callbacks.length; i++){
			callbacks[i]();
		}
		callbacks = null;
	}
	function onDomReady(func){
		if(done){
			func();
			return;
		}
		if(!callbacks){
			callbacks = [];
			addLoadListener(__onReady);
		}
		callbacks.push(func);
	}
	window.onDomReady = onDomReady;
})();

var xb = {
	evntHash: [],
	ieGetUniqueID: function(_elem){
		if(_elem === window){return "theWindow";}
		else if(_elem === document){return "theDocument";}
		else{return _elem.uniqueID;}
	},
	addEvent: function(_elem, _evntName, _fn, _useCapture){
		var self = this;
		if(typeof _useCapture === "undefined") _useCapture = false;
		if(typeof _elem.addEventListener !== "undefined"){
			_elem.addEventListener(_evntName, _fn, _useCapture);
		}else if(typeof _elem.attachEvent !== "undefined"){
			var key = "{FNKEY::obj_" + self.ieGetUniqueID(_elem) +
					  "::evnt_" + _evntName + "::fn_" + _fn + "}",
				f = self.evntHash[key];
			if(typeof f !== "undefined") return;
			f = function(){
				_fn.call(_elem);
			};
			
			self.evntHash[key] = f;
			_elem.attachEvent("on" + _evntName, f);
			
			window.attachEvent("onunload", function(){
				_elem.detachEvent("on" + _evntName, f);
			});
			key = null;
		}else{
			_elem["on" + _evntname] = _fn;
		}
	},
	removeEvent: function(_elem, _evntName, _fn, _useCapture){
		var self = this;
		if(typeof _elem.removeEventListener !== "undefined"){
			_elem.removeEventListener(_evntName, _fn, _useCapture);
		}else if(typeof _elem.detachEvent !== "undefined"){
			var key = "{FNKEY::obj_" + self.ieGetUniqueID(_elem) +
					  "::evnt_" + _evntName + "::fn_" + _fn + "}",
				f = self.evntHash[key];
			if(typeof f !== "undefined"){
				_elem.detachEvent("on" + _evntName, f);
				delete self.evntHash[key];
			}
			key = null;
		}
	}
};

onDomReady(function(){
	var placeholderTest = document.createElement("input");
	var supportsPlaceholder = "placeholder" in placeholderTest;
	if(!supportsPlaceholder){
		var els = document.getElementsByTagName("*");
		for(var i = 0; i < els.length; i++){
			if(els[i].nodeName.toLowerCase() === "input" || els[i].nodeName.toLowerCase() === "textarea"){
				var t = els[i];
				if(t.getAttribute("placeholder")){
					xb.addEvent(t, "blur", function(){
						if(this.value === "") this.value = this.getAttribute("placeholder");
					});
					xb.addEvent(t, "focus", function(){
						if(this.value === this.getAttribute("placeholder")) this.value = "";
					});
					if(t.value === "") t.value = t.getAttribute("placeholder");
				}
			}
		}
	}
});