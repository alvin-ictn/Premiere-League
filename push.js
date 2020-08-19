const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey":"BNVpdLTL8EK9Kl5n7F7oYHQPKlTLJU6l8mbw7vJcTP_23a37GSj-tPu5NBCVNMHvla7i7DEkzhR53xov4UFmbuY","privateKey":"9cki7GOUiRf77UNNUf4XNphks4cdwWXp9fkaYpt4s-g"
};

webPush.setVapidDetails(
   'mailto:alvin.ictn@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)

const pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eqAFxJbOKkc:APA91bEEPKFfW0bDNEs7Op-xLfCxmi91yE60Nuy9WZYo59s40pQ3YF1PuQzp2mVPaX4f-KgdDj78jJbOGN4fwyYDAN6GyNOeD_GOK92L3xg30CxH5XGOZnfakE8NaEmimaZ4T_eKN45t",
   "keys": {
       "p256dh": "BC/OIClOR1fipN+ml6yquDBPDlohK5AVxBZMeBmBX6jUtO73GTbYAzinf8YAXRol/0yrqqkZ/Di9tLMDe1CzO9g=",
       "auth": "Uwh08QT3VtTbQATNUaEpfw=="
   }
};

let payload = 'Yuk Lihat Perolehan Score masing - masing club!';
 
const options = {
   gcmAPIKey: '542495690503',
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
).then(x=>{
  console.log(x)
}).catch(err=>{
  console.error(err)
});