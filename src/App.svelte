<script lang="ts">
  import { Router } from "svelte-router-spa";
  import { routes } from "./routes";
  import Notifications from "svelte-notifications";
  import CustomNotification from "./lib/components/NotificationPlugin/CustomNotification.svelte";
  import { authStore } from "$lib/stores/auth";
  import Loading from "./lib/components/ABS/Loading.svelte";
  import { onMount } from "svelte";
  import { getMeService } from "$lib/services/auth.service";
  authStore.update((s) => {
    if (localStorage.getItem("token")) {
      s.token = JSON.parse(localStorage.getItem("token") || "");
    }
    if (s.token && localStorage.getItem("user")) {
      s.user = JSON.parse(localStorage.getItem("user") || "");
    }

    return s;
  });
  onMount(async () => {
    if ($authStore.token && !$authStore.user) {
      try {
        const user = await getMeService();
        if (user) {
          $authStore.user = user;
          localStorage.setItem("user", JSON.stringify(user));
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
</script>

<Notifications item={CustomNotification}>
  <Router {routes} />
</Notifications>
<Loading />
