"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/drum-machine-reupload/index.html","13e6b5977c8cbf6aaaa30f14ecd215b1"],["/drum-machine-reupload/static/css/main.d71623d5.css","085fa375f90b4ac307dc0fe9be210e58"],["/drum-machine-reupload/static/js/main.b0808adb.js","1566c731b39e9b938f9de5d882ce6308"],["/drum-machine-reupload/static/media/Bass.0c786a14.wav","0c786a14b95d30049cee47aaca52deba"],["/drum-machine-reupload/static/media/Clap.6abb09d6.wav","6abb09d60a0d4b3d6f00253d2c8f3e78"],["/drum-machine-reupload/static/media/HiHat_Closed.d580ae47.wav","d580ae47f93078a05dde39a8d40592a1"],["/drum-machine-reupload/static/media/HiHat_Open.1c942038.wav","1c942038ef1bb88bfa847128bf289e67"],["/drum-machine-reupload/static/media/Note_Low.7c47df23.wav","7c47df23ea00e353bc48751e2c9ffe1f"],["/drum-machine-reupload/static/media/Snare.48f63ab7.wav","48f63ab744f57c7494de375cb5e1ce4b"],["/drum-machine-reupload/static/media/Tom_Hi.31140bbd.wav","31140bbd615b6f882619b7c3f5dae3ed"],["/drum-machine-reupload/static/media/Tom_Low.241bccf9.wav","241bccf9fa12c1830f680a37376ebce4"],["/drum-machine-reupload/static/media/logo.5d5d9eef.svg","5d5d9eefa31e5e13a6610d9fa7a283bb"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,a,t,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),r.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],n=new URL(a,self.location),r=createCacheKey(n,hashParamName,t,/\.\w{8}\./);return[n.toString(),r]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var n=new Request(t,{credentials:"same-origin"});return fetch(n).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),n="index.html";(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,n),a=urlsToCacheKeys.has(t));var r="/drum-machine-reupload/index.html";!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL(r,self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});