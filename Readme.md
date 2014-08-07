
# json-xhr

  Promise-based library for working with JSON HTTP APIs

## Installation

  Install with [component(1)](http://component.io):

    $ component install RangerMauve/json-xhr

  You can build a UMD-compatible bundle for use in other applications with:

    $ component build -s json_xhr

## API

``` javascript
    var jshr = require("json-xhr");
    jshr.get("http://example.com/foobar.json").then(function(result){
        var foobar = result.response;
        // foobar is a JS object that was parsed from foobar.json
    }).catch(function(e){
        alert("Error:"+e.message);
        // e is an Error object with the added properties for the request/reponse data and status
    })
```

### json_xhr(varb,url,data)

Sends a `verb request to the specified URL.
If the verb is GET, it turns the data into a querystring which is appended to the URL.
Otherwise the data is stringified and sent as the body of the request.
The return value is a Promise (the then/promise implementation in this case) which resolves to an object that looks like:
``` javascript
    {
        status: "the status code of the response",
        response: "the JSON.parse'd response body or an empty object if there was no body",
        request: "the XMLHttpRequest instance used for the request"
    }
```

If there was an error it rejects with it, if the error was the result of an Error-like status code (4xx or 5xx),
then it will reject to an Error object with the following added properties:
``` javascript
    {
        status: "the status code of the response",
        response: "the JSON.parse'd response body or an empty object if there was no body",
        request: "the XMLHttpRequest instance used for the request"
    }
```

### json_xhr(verb, url)

Same as above, but the data is set to an empty object

### json_xhr(url, data)

Same as the first version, but it sets the verb to `GET`

### json_xhr[get, post, put, delete]

Shorthand for different verbs, acts the same as `json_xhr(url,data)`

## License

  The MIT License (MIT)

  Copyright (c) 2014 <copyright holders>

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
