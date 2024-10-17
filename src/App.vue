<template>
  <div id="app">
    <nav class="navbar">
      <div class="logo">Notification Hub</div>
      <ul class="nav-links">
        <li><a href="/">HOME</a></li>
      </ul>
      <NotificationIcon />
    </nav>
    <router-view />
  </div>
  <div class="notification-input-container" >
    <h1>Introducing Real-time Notification application using SignalR </h1>
      <div class="notification-input">
      <input v-model="notificationMessage" type="text" name="notificationMessage" placeholder="Enter your message" />
      <button @click="sendUserNotification">Send Notification</button>
    </div>
    </div>
</template>

<script>
import NotificationIcon from './components/NotificationIcon.vue';
import '@mdi/font/css/materialdesignicons.css' // Ensure you are importing the CSS
import 'vuetify/dist/vuetify.min.css' // Ensure you are importing Vuetify CSS

export default {
  data(){
    return{
      notifications: [],
      notificationMessage: '',
    };
  },
  name: "App",
  methods: {
    sendUserNotification() {
      const url = `https://localhost:44304/api/Notification?message=${this.notificationMessage}`;
      console.log(url);

      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
})
.then(response => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json(); // This parses the JSON body of the response
})
.then(data => {
  console.log('Notification sent:', data);
  // Handle successful notification send here, if necessary
})
.catch(error => {
  console.error('Error sending notification:', error);
});
  this.notificationMessage = '';
    },
  },
  components: {
    NotificationIcon,
  },
  
};
</script>

<style>
body {
  background: linear-gradient(419deg, #bdc9f3, #ffffff);
  min-height: 100vh; /* This makes sure that the gradient covers the full viewport height */
}

.navbar {
background: linear-gradient(135deg, #FFFFFF, #ced8f7);
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  box-shadow: 0 2px 23px rgba(0, 0, 0, 0.2);
}

.logo {
  font-size: 24px;
  color:grey;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
  color: #ced8f7;
}

.nav-links li {
  font-size: 18px;
}

.nav-links a {
  text-decoration: none;
  color: #3b3737;
}

.nav-links a:hover {
  text-decoration: underline;
}

.notification-input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh; /* Adjust as needed to center vertically */
}

.notification-input-container h1 {
margin-bottom: 60px;
}

.notification-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.notification-input {
  text-align: center;
}

.notification-input input {
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ced8f7;
  border-radius: 5px;
  font-size: 16px;
}

.notification-input button {
  padding: 10px 15px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.notification-input button:hover {
  background-color: #555;
}
</style>
