import test from './sw.js'
function swregister(){
	let version = '1.0.0';
    if ('serviceWorker' in navigator) {
        // navigator.serviceWorker.register('./sw.js').then(function (reg) {
        //     if (localStorage.getItem('sw_version') !== version) {
        //         reg.update().then(function () {
        //             localStorage.setItem('sw_version', version)
        //         });
        //     }
        // });

        navigator.serviceWorker.register('./sw.js').then(function(registration) {
        // Registration was successful :)
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
        // registration failed :(
            console.log('ServiceWorker registration failed with error: ', err);
        });
    }
}

export default swregister
