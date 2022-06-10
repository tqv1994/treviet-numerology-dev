<script lang="ts" context="module">
	export type DefaultNotificationOptions = {
		id?: string;
		text: string;
		position?:
			| 'top-left'
			| 'top-center'
			| 'top-right'
			| 'bottom-left'
			| 'bottom-center'
			| 'bottom-right';
		type?: 'success' | 'warning' | 'danger';
		removeAfter?: number;
	};
</script>

<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { getNotificationsContext } from 'svelte-notifications';
	const { addNotification } = getNotificationsContext();
	import { v4 as uuid } from '@lukeed/uuid';

	function generateId() {
		let newUuid = '';
		newUuid = uuid();
		return newUuid;
	}

	function notice(notification: DefaultNotificationOptions) {
		addNotification({
			id: generateId(),
			text: notification.text,
			position: notification.position || 'top-right',
			notifyClassNames: notification.notifyClassNames || 'top right',
			icon: 'ni ni-bell-55',
			type: notification.type || 'default',
			removeAfter: notification.removeAfter || 4000
		});
	}

	onMount(() => {
		window.notice = notice;
	});
</script>
