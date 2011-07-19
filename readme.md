Placeholder.js is JavaScript script to emulate the placeholder tag in browsers that don't support it. If the browser supports placeholder, it will use the native function.

## Usage

Just drop placeholder.js (or placeholder.min.js for the minified version) into your project and add it to your page. Once the page loads, placeholder.js will find all input and textarea tags and emulate the placeholder tag.

### jQuery Version

Included is a jQuery version. To use this simply add the script to your page (placeholder.jquery.js or placeholder.jquery.min.js) and inside your $(document).ready function add

	$.placeholder();