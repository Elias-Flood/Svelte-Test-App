<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import Body from '$lib/elements/body.svelte';
	import Box from '$lib/elements/box.svelte';
	import Header from '$lib/elements/header.svelte';

	import { Progress } from "$lib/components/ui/progress";
	import * as Tabs from "$lib/components/ui/tabs";
	import * as Card from "$lib/components/ui/card";
	import { Badge } from "$lib/components/ui/badge";

	import { onMount } from "svelte";
	import { writable, type Writable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';

	import { AlignJustify } from 'lucide-svelte';
	import { LibraryBig } from 'lucide-svelte';
	import { Search } from 'lucide-svelte';


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

const defaultRootValue: Root = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0
};

//search v2
export let fData = writable<Root>(defaultRootValue);

let userSearchQuery = '';
async function searchMovies(searchQuery: string){
	const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTdmYjc2NDVmOTkyZjZhNjk2Y2JkYmQwMWQ0OWJkMCIsInN1YiI6IjY1M2I5Yjc0NTE5YmJiMDBlMThiYjI4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oZHahhSLjQVe7D7zMK7ek4tqWkKJarg1qDrScvYwpXo'
		}
	};

	const response = await fetch('https://api.themoviedb.org/3/search/movie?query='+ searchQuery +'&include_adult=false&language=en-US&page=1', options)
		const fetchedData = await response.json();
		fData.set(fetchedData);
};

onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.toString()!=""){
      await searchMovies(urlParams.toString()); 
    }
    else{
      console.log(urlParams.toString());
    }
});

</script>

<div>
	<Header></Header>

	<Body>
		<form class="flex w-full max-w-sm items-center space-x-2">
			<Input bind:value={userSearchQuery} class="bg-background"  type="text" placeholder="Search" />			<Button on:click={async () => {window.location.href = "/movieSearch?"+ userSearchQuery}} type="submit">Search <Search class="p-0.5"/></Button>
		</form>

		<hr class="my-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100"/>
		
		<Tabs.Root value="cardView" class="">
			<Tabs.List>
			  <Tabs.Trigger value="cardView"><LibraryBig /></Tabs.Trigger>
			  <Tabs.Trigger value="listView"><AlignJustify /></Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="cardView">
			  
				<Box>
					{#if ($fData.total_results==0)}
						<p class="text-center">No Results Found</p>
					{/if}
					<div class="grid grid-cols-5 grid-rows-4 grid-flow-rows gap-4">
						{#if ($fData.results)}
							{#each {length: $fData.results.length} as obj, i}
							<div class="w-[100%]; hover:animate-wiggle">
								<a href="/movieList/movie?{$fData.results[i].id}">
									<Card.Root class="w-[250px] h-[375px] p-2 bg-cover bg-center shadow-2xl"style="background-image: url(https://image.tmdb.org/t/p/original/{$fData.results[i].poster_path})">
										<Card.Content class="m-0 flex justify-end">
											<Badge variant="secondary">{Math.round(($fData.results[i].vote_average)*10)}% &#9733;</Badge>
										</Card.Content>
									</Card.Root>
								</a>
							</div>
							{/each}
						{:else}
						<div class="">
							<svg class="animate-spin" viewBox="0 0 20 20">       
								<image href="https://www.svgrepo.com/show/349636/spinner-3.svg" width="20" height="20"/>    
							</svg>
						</div>
						{/if}
					</div>
				</Box>

			</Tabs.Content>
			<Tabs.Content value="listView">
				
				<Box>
					<Table.Root class="bg-transparant">
						<Table.Header>
						  <Table.Row>
							<Table.Head class="w-[50%]">Title</Table.Head>
							<Table.Head class="w-[25%]">Score</Table.Head>
							<Table.Head class="w-[25%]">Release Date</Table.Head>
						  </Table.Row>
						</Table.Header>
						<Table.Body>
						{#each {length: $fData.results.length} as obj, i}
						  <Table.Row>
							<Table.Cell class="font-medium text-start">
								<a href="/movieList/movie?{$fData.results[i].id}">
									{$fData.results[i].title}
								</a>
							</Table.Cell>
							<Table.Cell>
								<Progress class="h-[10px]" value={($fData.results[i].vote_average)*10} />
							</Table.Cell>
							<Table.Cell>{$fData.results[i].release_date}</Table.Cell>
						  </Table.Row>
						{/each}
						</Table.Body>
					  </Table.Root>
					{#if ($fData.total_results==0)}
						<br/>		
						<p class="text-center">No Results Found</p>
					{/if}
				</Box>
			</Tabs.Content>
		  </Tabs.Root>
	</Body>
	<br/>
</div>
