function registerService(){
	if (!('serviceWorker' in navigator)) {
      console.log("Service worker tidak didukung browser ini.");
    } else {
      	window.addEventListener('load',() => {
			return navigator.serviceWorker.register('service-worker.js')
			.then(function (registration) {
				console.log('Registrasi service worker berhasil.');
				return registration;
			})
			.then(reg => {
				let serviceWorker;
				if (reg.installing) {
					serviceWorker = reg.installing;
					// console.log('Service worker installing');
				} else if (reg.waiting) {
					serviceWorker = reg.waiting;
					// console.log('Service worker installed & waiting');
				} else if (reg.active) {
					serviceWorker = reg.active;
					// console.log('Service worker active');
				}

				if (serviceWorker) {
					console.log("sw current state", serviceWorker.state);
					if (serviceWorker.state == "activated") {
						//If push subscription wasnt done yet have to do here
						console.log("sw already activated - Do watever needed here");
					}
					serviceWorker.addEventListener("statechange", function(e) {
						console.log("sw statechange : ", e.target.state);
						if (e.target.state == "activated") {
							// use pushManger for subscribing here.
							console.log("Just now activated. now we can subscribe for push notification")
							notifikasi(reg);
						}
					});
				}
			})
			.catch(function (err) {
				console.error('Registrasi service worker gagal.', err);
			});
		})
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function notifikasi(reg) {
	if ("Notification" in window) {
		Notification.requestPermission()
		.then(result => {
			if (result === "denied") {
					console.log("Pengguna tidak menginginkan Notifikasi");
				return;
			} else if (result === "default") {
				console.error("Kotak dialog ditutup");
				return;
			}

			if ('PushManager' in window) {
				reg.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: urlBase64ToUint8Array('BNVpdLTL8EK9Kl5n7F7oYHQPKlTLJU6l8mbw7vJcTP_23a37GSj-tPu5NBCVNMHvla7i7DEkzhR53xov4UFmbuY')
				})
				.then(subs => {
					console.log('Berhasil melakukan subscribe dengan');
					console.log('endpoint: ', subs.endpoint);
					console.log('p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subs.getKey('p256dh')))));
					console.log('auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subs.getKey('auth')))));
				})
				.catch(err => {
					console.error('Gagal melakukan subscribe ', err.message);
				});
			}
		});
	} else {
		console.error("Browser tidak mendukung fitur notifikasi.");
	}
}

export default registerService;