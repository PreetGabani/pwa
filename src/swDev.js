export default function swDev() {

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

    function determineAppServerKey() {
        var vapidPublickey = 'BHQNF4DTagtyJjXyUfVg31SKJ33nZMZ0BldCDsD4D4RXUzPQ5Nv-OlTgC9uPodiKuJFVm8jAR5u5MFzTLPGL_Ek';
        return urlBase64ToUint8Array(vapidPublickey);
    }


    const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
    navigator.serviceWorker.register(swUrl).then((res) => {
        console.log("response", res);
        return res.pushManager.getSubscription()
            .then(function (Subscription) {
                return res.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: determineAppServerKey()
                })
            })
    })
}