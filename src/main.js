import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

// Import your router configuration
import router from './router'; // Adjust the path if necessary

const vuetify = createVuetify({
  components: {
    ...components,
  },
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

// Create the app and use both Vuetify and Vue Router
createApp(App)
  .use(vuetify)
  .use(router) // Use the router
  .mount('#app');
