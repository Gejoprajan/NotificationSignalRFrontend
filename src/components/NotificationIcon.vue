<template>
  <div>

    <div class="notification-icon">
      <v-menu>
      <template v-slot:activator="{ props }">
       <v-btn v-bind="props" icon>
        <v-badge v-if="notificationsCount > 0" class="isBadge" :content="notificationsCount" color="red">
      <v-icon class="hover-icon"  icon="mdi-bell" @click="toggleNotifications" :class="{ 'glowing-icon': hasNewNotification }" classsize="x-large"></v-icon>
    </v-badge>
    <v-icon v-else class="hover-icon" icon="mdi-bell" @click="toggleNotifications" :class="{ 'glowing-icon': hasNewNotification }" size="x-large"></v-icon> </v-btn>
      </template>
      <v-list v-if="isenable">
        <v-list-item v-for="notification in notifications" :key="notification.date">
          <v-list-item-title>{{ notification.message }}</v-list-item-title>
      <v-list-item-subtitle>{{ formatDate(notification.date) }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-menu>
    </div>
  </div>
</template>

<script>
import * as signalR from "@microsoft/signalr";
import '@mdi/font/css/materialdesignicons.css' // Ensure you are importing the CSS
import 'vuetify/dist/vuetify.min.css' // Ensure you are importing Vuetify CSS

export default {
  data() {
    return {
      notificationsCount: 0,
      notifications: [],
      unreadMessages: 0,
      hasNewNotification: false, 
      hubConnection: null,
      isenable:false,
    };
  },

  methods: {
    toggleNotifications() {
      
      this.notifications.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });

      if(this.notificationsCount> 0){
        this.isenable=true;
      }
      //this.$emit('new-notification', this.notifications);
      this.unreadMessages = 0;
      this.calculateNotificationsCount();
      this.hasNewNotification=false;
    },
    calculateNotificationsCount() {
      // Update notificationsCount based on unreadMessages
      this.notificationsCount = this.unreadMessages;
    },
    formatDate(date) {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }).format(date);
    }
  },
  mounted() {
    // Connect to the SignalR hub
    this.hubConnection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:44304/notificationHub", {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
    withCredentials: true,
  })
  .build();

    this.hubConnection.start().then(() => {
      this.hubConnection.on("ReceiveNotification", (message) => {
        // Handle incoming notifications
    
      const newNotification = {
        message,
        date: new Date()
      };
        this.notifications.push(newNotification);
        console.log(message);
        this.unreadMessages += 1;
        this.hasNewNotification = true;
        this.calculateNotificationsCount();
      });
    });
  },
};
</script>

<style scoped>
::v-deep .v-overlay__content {
  top: 70px !important;
  right: 50px !important;
  left:auto !important;
  width: 416px !important;
}
.hover-icon{
  color: white;
}

.notification-icon {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.notification-icon i {
  font-size: 33px;
}
.badge {
  background-color: red;
  color: #fff;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  margin-left: 5px;
}
/* Define the glowing effect */
.glowing-icon {
  animation: glowing 1.5s ease infinite;
}

@keyframes glowing {
  0% {
    color: white;
  }
  50% {
    color: gold;
  }
  100% {
    color: white;
  }
}
.v-btn--icon {
  background-color: transparent !important; /* Force override */
  box-shadow: none !important; /* Remove any shadow if it's there */
}
</style>
