self.addEventListener("activate", (event) => {
        console.log(111)
    if (caches) {
        caches.keys().then((cacheNames) => {
            cacheNames.forEach((cacheName) => {
                caches.delete(cacheName);
            });
        });
    }
});



// window.ononline = (event) => {
//     console.log(event,'on');
//     useToast().toastSuccess('Back Online')
// };
//
// let request = new Request('https://api.liproj.com/api/City/GetCitiesByCountryId?pageNumber=1&count=11&countryId=3')
// caches.open('cacheName').then( cache => {
//     cache.add(request)
//     cache.match(request).then(settings => {
//         // console.log(settings);
//     })
// });