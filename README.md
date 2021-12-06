# community-web-push-service
Community web push service

<div align="center">
    <img src="https://raw.githubusercontent.com/juanbautista0/community-web-push-service/main/src/assets/img/architectural_drawing_.png" alt="architectural_drawing"/>
</div>

# Client (Web Browser)
Add the code in the service worker file:

```js
self.addEventListener("push", (e)=> {
  const isJson = (str) => {
    try {
      JSON.parse(str);
    } catch (error) {
      console.log(str);
      return false;
    }
    return true;
  };
  if (typeof e.data === "undefined") return true;

  if (e.data !== null && isJson(e.data.text())) {
    var received = JSON.parse(e.data.text());
    var options = {
      body: received.notification.body,
      icon: received.notification.icon,
      vibrate: received.notification.vibrate,
      data: received.data,
      actions: received.notification.actions,
    };
    e.waitUntil(self.registration.showNotification(received.notification.title, options));
  }
});
```
