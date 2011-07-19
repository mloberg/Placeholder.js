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

(function($){
	$.placeholder = function(){
		var placeholderTest = document.createElement("input"),
			supportsPlaceholder = "placeholder" in placeholderTest;
		if(!supportsPlaceholder){
			var els = $("input, textarea");
			$.each(els, function(i, el){
				if($(el).attr("placeholder")){
					$(el).blur(function(){
						if($(this).val() === "") $(this).val($(this).attr("placeholder"));
					});
					$(el).focus(function(){
						if($(this).val() === $(this).attr("placeholder")) $(this).val("");
					});
					if($(el).val() === "") $(el).val($(el).attr("placeholder"));
				}
			});
		}
	};
})(jQuery);