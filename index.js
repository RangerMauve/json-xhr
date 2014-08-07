var Promise = require("promise");
var querystring = require("query-string");
var _get = "GET";

module.exports = json_xhr;
["get", "post", "put", "delete"].forEach(function(verb) {
	json_xhr[verb] = json_xhr.bind(null, verb);
});

function json_xhr(verb, url, data) {
	if (arguments.length === 2) {
		if ((typeof url) === "string") return json_xhr(verb, url, {})
		else return json_xhr(_get, verb, url);
	} else if (arguments.length === 1) {
		return json_xhr(_get, verb, {});
	} else if (arguments.length === 0)
		return Promise.reject(new Error("Not Enough Arguments"))
	verb = verb.toUpperCase();
	return new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();
		var to_send;
		var qs = "";
		var is_get = (verb === _get);
		if (is_get) qs = querystring.stringify(data);
		else try {
			to_send = JSON.stringify(data);
		} catch (e) {
			return reject(e);
		}
		xhr.open(verb, url + qs);
		xhr.onreadystatechange = handle_complete;
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(to_send);

		function handle_complete() {
			if (xhr.readyState !== 4) return;
			var status = xhr.status
			var result = {};
			var response_text = xhr.responseText;
			if (response_text) try {
				result = JSON.parse(response_text)
			} catch (e) {
				return reject(e);
			}
			if ((status < 400) && status) return resolve({
				status: status,
				response: result,
				request: xhr
			});
			var error = new Error("Server responded with status of " + status);
			error.status = status;
			error.request = xhr;
			error.response = result;
			reject(error);
		}
	});
}
