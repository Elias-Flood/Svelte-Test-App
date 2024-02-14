<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import TitleText from '$lib/elements/titleText.svelte';
	import Body from '$lib/elements/body.svelte';
	import Header from '$lib/elements/header.svelte';

	import { ArrowRightCircle } from 'lucide-svelte';
	import { Search } from 'lucide-svelte';
	import { goto } from '$app/navigation';

let userSearchQuery = '';
function goTo(string: String){
	window.location.href = "/movieSearch?"+string;
}
</script>

<div>
	<Header></Header>

	<Body>
		<div >
			<TitleText>Find a Movie</TitleText>
			<hr class="my-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100"/>
		</div>
		<form class="flex justify-center">
			<Input bind:value={userSearchQuery} class="bg-background w-[40%]"  type="text" placeholder="Search" />
			<Button on:click={() => {goTo(userSearchQuery.toString())}} class="w-[10%]" type="submit">Search <Search class="p-0.5"/></Button>
		</form>
		<p class="flex justify-center">or</p>
		<a href="/movieList?page=1" class="flex justify-center">
			<Button class="w-[50%]">See Trending Movies <ArrowRightCircle class="p-0.5"/></Button>
		</a>
	</Body>
	<br/>
</div>
