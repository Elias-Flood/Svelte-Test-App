<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import TitleText from '$lib/elements/titleText.svelte';
	import SubTitleText from '$lib/elements/subTitleText.svelte';
	import Body from '$lib/elements/body.svelte';
	import BodyText from '$lib/elements/bodyText.svelte';
	import Box from '$lib/elements/box.svelte';
	import Header from '$lib/elements/header.svelte';
	import Logo from '$lib/elements/logoText.svelte';
	import LogoText from '$lib/elements/logoText.svelte';

	import * as Pagination from "$lib/components/ui/pagination";

	import { buttonVariants } from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";

    import type { PageData, PageLoad } from './$types';

	import { onMount } from "svelte";
	import { writable, type Writable } from 'svelte/store';

interface Root {
  page: number
  results: Result[]
  total_pages: number
  total_results: number
}

interface Result {
  adult: boolean
  backdrop_path: string
  id: number
  title: string
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}



//v5
export let fData: Writable<Root> = writable();

async function getMovies(page: number){
	const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTdmYjc2NDVmOTkyZjZhNjk2Y2JkYmQwMWQ0OWJkMCIsInN1YiI6IjY1M2I5Yjc0NTE5YmJiMDBlMThiYjI4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oZHahhSLjQVe7D7zMK7ek4tqWkKJarg1qDrScvYwpXo'
		}
	};

	const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US&page='+ page, options)
		const fetchedData = await response.json();
		console.log(fetchedData);
		fData.set(fetchedData);

};

onMount(async () => {getMovies(1)});
</script>

<div class="h-screen bg-scroll bg-gradient-to-r from-purple-500 to-pink-500">
	<Header>
		<button on:click={(() => getMovies(1))}>Hello 1</button>
		<button on:click={(() => getMovies(2))}>Hello 2 </button>
		<button on:click={(() => getMovies(3))}>Hello 3</button>
		<div class="grid-rows-3">
			<Logo>Navbar</Logo>
			<a href="/"><Button variant="ghost">Navlink 1</Button></a>
			<Button variant="ghost">Navlink 2</Button>
			<Button variant="ghost">Navlink 3</Button>
		</div>

		<button id="my-button">Change color</button>
    	<div id="my-div"></div>
	</Header>

	<Body>
		<TitleText>Trending Movies</TitleText>
		
		<hr class="my-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100"/>

		<div class="grid grid-cols-5 grid-rows-4 grid-flow-rows gap-4">
			{#if ($fData.results)}
			{#each {length: $fData.results.length} as obj, i}
			<div class="w-[100%]; hover:animate-wiggle">
				<Dialog.Root>
					<Dialog.Trigger>
						<img src="https://image.tmdb.org/t/p/original/{$fData.results[i].poster_path}" alt="Movie Poster"/>
					</Dialog.Trigger>
					<Dialog.Content class="sm:max-w-[70%] h-auto bg-cover bg-center" style="background-image: url('https://image.tmdb.org/t/p/original/{$fData.results[i].backdrop_path}');">
					  <Dialog.Header>
					  </Dialog.Header>
					  <div class="grid grid-cols-3 gap-4">
						<div class="col-span-1">
							<img class="border-solid border-2 border-stone-200 drop-shadow-xl shadow-2xl" src="https://image.tmdb.org/t/p/original/{$fData.results[i].poster_path}" alt="Movie Poster"/>
						</div>
						<div class="col-span-2">
							<Box>
								<div class=" w-[100%] h-auto">
									<TitleText>
										{$fData.results[i].title}
									</TitleText>
									<SubTitleText>
										{$fData.results[i].release_date}
									</SubTitleText>
									<BodyText>
										{$fData.results[i].overview}
									</BodyText>
								</div>
							</Box>
						</div>
					  </div>
					  <Dialog.Footer>
						{$fData.results[i].id}
					  </Dialog.Footer>
					</Dialog.Content>
				  </Dialog.Root>
			</div>
			
			{/each}
			{:else}
			<div class="">
				<svg class="animate-spin" viewBox="0 0 20 20">       
					<image xlink:href="https://www.svgrepo.com/show/349636/spinner-3.svg" width="20" height="20"/>    
				</svg>
			</div>
			{/if}
		</div>
		<hr class="my-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100"/>

	  <Pagination.Root count={100} perPage={10} let:pages let:currentPage>
		<Pagination.Content>
		  <Pagination.Item>
			<Pagination.PrevButton />
		  </Pagination.Item>
		  {#each pages as page (page.key)}
			{#if page.type === "ellipsis"}
			  <Pagination.Item>
				<Pagination.Ellipsis />
			  </Pagination.Item>
			{:else}
			  <Pagination.Item>
				<Pagination.Link {page} isActive={currentPage == page.value}>
				  {page.value}
				</Pagination.Link>
			  </Pagination.Item>
			{/if}
		  {/each}
		  <Pagination.Item>
			<Pagination.NextButton />
		  </Pagination.Item>
		</Pagination.Content>
	  </Pagination.Root>
	</Body>
	<br/>
</div>
