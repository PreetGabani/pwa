let cacheData = "pwa";

this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                "/static/js/bundle.js",
                "/favicon.ico",
                "/ws",
                "/index.html",
                "/",
                "/record",
                "/todos",
                "/todos?_page=1&_limit=10",
            ])
        })
    )
})

this.addEventListener("fetch", (event) => {

    console.log("url",event.request.url);

    if (!navigator.onLine) {

        if (event.request.url === 'http://localhost:3000/static/js/bundle.js') {
            event.waitUntil(
                this.registration.showNotification("Notification", {
                    body: "Internet is not Working",
                })
            )
        }

        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) {
                    return resp
                }
                let requestUrl = event.request.clone();
                return fetch(requestUrl)
            })
        )
    }
})