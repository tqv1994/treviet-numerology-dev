<script lang="ts" context="module">
	export function getDataTreeView(data: AgentTreeView[], ref_code_agent: string | null): AgentTreeView[] {
		let results: AgentTreeView[] = [];
		const agents = data.filter((item) => item.ref_code_agent === ref_code_agent);
		if (agents.length > 0) {
			for (const agent of agents) {
				results.push({
					...agent,
					children: getDataTreeView(data, agent.ref_code_owner)
				});
			}
		}
		return results;
	}
</script>
<script lang="ts">
	import type { AgentTreeView } from '$lib/stores/agent';

	export let expanded: boolean = false;
	let trees: AgentTreeView[];
	export let agentTreeViews: AgentTreeView[];
	export let ref_code: string | null;
	let name: string;

	$: if (agentTreeViews && agentTreeViews.length > 0) {
		trees = getDataTreeView(agentTreeViews, ref_code);
	}

	function toggle() {
		expanded = !expanded;
	}

	function getType(agent: AgentTreeView) {
		if (agent.level === 0) {
			return 'danger';
		} else if (agent.level === 1) {
			return 'success';
		} else {
			return 'default';
		}
	}
</script>

{#if (trees || []).length > 0}
	{#each trees as tree}
		<div class="folder">
			<ul>
				<li class="text-{getType(tree)}">
					<svg
						width="15"
						height="16"
						viewBox="0 0 15 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="mr-2"
					>
						<path
							d="M5.03125 2.23828L6.08594 4.13672L5.03125 6H2.95703L1.9375 4.13672L2.95703 2.23828H5.03125ZM5.69922 0.761719H2.32422C2.16016 0.761719 2.04297 0.820313 1.97266 0.9375L0.320312 3.92578L0.25 4.13672L0.320312 4.34766L1.97266 7.30078C2.04297 7.44141 2.16016 7.51172 2.32422 7.51172H5.69922C5.83984 7.51172 5.94531 7.44141 6.01562 7.30078L7.66797 4.34766L7.73828 4.13672L7.66797 3.92578L6.01562 0.9375C5.94531 0.820313 5.83984 0.761719 5.69922 0.761719ZM11.957 6.38672L13.0117 8.25L11.957 10.1133H9.91797L8.86328 8.25L9.91797 6.38672H11.957ZM12.625 4.875H9.25C9.10938 4.875 9.00391 4.94531 8.93359 5.08594L7.24609 8.03906L7.17578 8.25L7.24609 8.46094L8.93359 11.4141C9.00391 11.5547 9.10938 11.625 9.25 11.625H12.625C12.7656 11.625 12.8711 11.5547 12.9414 11.4141L14.6289 8.46094L14.6992 8.25L14.6289 8.03906L12.9414 5.08594C12.8711 4.94531 12.7656 4.875 12.625 4.875ZM5.03125 10.5L6.08594 12.3633L5.03125 14.2617H2.95703L1.9375 12.3633L2.95703 10.5H5.03125ZM5.69922 8.98828H2.32422C2.16016 8.98828 2.04297 9.05859 1.97266 9.19922L0.320312 12.1523L0.25 12.3633L0.320312 12.5742L1.97266 15.5625C2.04297 15.6797 2.16016 15.7383 2.32422 15.7383H5.69922C5.83984 15.7383 5.94531 15.6797 6.01562 15.5625L7.66797 12.5742L7.73828 12.3633L7.66797 12.1523L6.01562 9.19922C5.94531 9.05859 5.83984 8.98828 5.69922 8.98828Z"
							fill="silver"
						/>
					</svg>
					{#if tree.children}
						<span on:click={toggle}>
							{`${tree.agentname} - ${tree.amount} - ${tree.numberOfReports} báo cáo đã xuất | ${
								tree.numOfTranferReports || 0
							} báo cáo đã chuyển`}
						</span>
						{#if expanded}
							<svelte:self {agentTreeViews} ref_code={tree.ref_code_owner} expanded={false} />
						{/if}
					{:else}
						<span on:click={toggle}>
							{`${tree.agentname} - ${tree.amount} - ${tree.numberOfReports} báo cáo đã xuất | ${
								tree.numOfTranferReports || 0
							} báo cáo đã chuyển`}
						</span>
					{/if}
				</li>
			</ul>
		</div>
	{/each}
{/if}

<style>
	ul {
		padding: 0.2em;
		margin: 0.2em 0.2em 0.2em 1.8em;
		list-style: none;
		border-left: 1px solid #eee;
	}

	li {
		cursor: pointer;
	}
</style>
