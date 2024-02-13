<script lang="ts">
	import TitleText from '$lib/elements/titleText.svelte';
	import Body from '$lib/elements/body.svelte';
	import Box from '$lib/elements/box.svelte';
	import Header from '$lib/elements/header.svelte';

	import * as Pagination from "$lib/components/ui/pagination";

	import { Progress } from "$lib/components/ui/progress";
	import * as Tabs from "$lib/components/ui/tabs";
	import * as Card from "$lib/components/ui/card";
	import { Badge } from "$lib/components/ui/badge";

	import { onMount } from "svelte";
	import { writable, type Writable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';

	import { AlignJustify } from 'lucide-svelte';
	import { LibraryBig } from 'lucide-svelte';
	
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

// v6
export let fData = writable<Root>(defaultRootValue);

async function getMovies(page: string){
	fData = writable<Root>(defaultRootValue);

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

onMount(async () => {
	const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.toString()!=""){
		if(parseInt( urlParams.toString())){
			await getMovies(urlParams.toString()); 
		}
		else{
			console.log(urlParams.toString());
		}
    }
    else{
      console.log(urlParams.toString());
    }});

function isOnlyDigits(input: string) {
   for (let i = 0; i < input.length; i++) {
      var ascii = input.charCodeAt(i);
      if (ascii < 48 || ascii > 57) {
         return false;
      }
   }
   return true;
}

function goTo(string: String){
	window.location.href = "/movieList?"+string;
}
</script>

<div class="overflow-y:scroll;">
	<Header></Header>

	<Body>
		<TitleText>Trending Movies</TitleText>
		
		<hr class="my-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100"/>
		
		<Pagination.Root count={100} perPage={10} let:pages let:currentPage>
			<Pagination.Content>
			  {#each pages as page (page.key)}
				{#if page.type === "ellipsis"}
				  <Pagination.Item>
					<Pagination.Ellipsis />
				  </Pagination.Item>
				{:else}
				  <Pagination.Item>
					<Pagination.Link {page} isActive={currentPage == page.value} on:click={(() => goTo(page.value))}>
					  <p>{page.value}</p> 
					</Pagination.Link>
				  </Pagination.Item>
				{/if}
			  {/each}
			</Pagination.Content>
		  </Pagination.Root>

		<Tabs.Root value="cardView" class="">
			<Tabs.List>
			  <Tabs.Trigger value="cardView"><LibraryBig /></Tabs.Trigger>
			  <Tabs.Trigger value="listView"><AlignJustify /></Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="cardView">
			  
				<Box>
					{#if ($fData.total_results == 0)}
					<div class="flex w-full justify-center">
						<svg class="animate-spin max-w-[25%]" viewBox="0 0 20 20">       
							<image xlink:href="https://www.svgrepo.com/show/349636/spinner-3.svg" width="20" height="20"/>    
						</svg>
					</div>
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
						{/if}
					</div>
				</Box>

			</Tabs.Content>
			<Tabs.Content value="listView">
				
				<Box>
					{#if ($fData.total_results == 0)}
					<div class="flex w-full justify-center">
						<svg class="animate-spin max-w-[25%]" viewBox="0 0 20 20">       
							<image xlink:href="https://www.svgrepo.com/show/349636/spinner-3.svg" class="bg-primary" width="20" height="20"/>    
						</svg>
					</div>
					{/if}

					<Table.Root class="bg-transparant">
						<Table.Caption>Currently Treding Movies - Page _</Table.Caption>
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
				</Box>

			</Tabs.Content>
		  </Tabs.Root>
		
<br/>
	<hr class="my-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100"/>

	  <Pagination.Root count={100} perPage={10} let:pages let:currentPage>
		<Pagination.Content>
		<!-- {currentPage = parseInt(window.location.search.toString()[0])}; -->
		  {#each pages as page (page.key)}
			{#if page.type === "ellipsis"}
			  <Pagination.Item>
				<Pagination.Ellipsis />
			  </Pagination.Item>
			{:else}
			  <Pagination.Item >
				<Pagination.Link on:click={(() => getMovies(page.value))} {page} isActive={currentPage == page.value}>
				  <p>{page.value}</p> 
				</Pagination.Link>
			  </Pagination.Item>
			{/if}
		  {/each}
		</Pagination.Content>
	  </Pagination.Root>
	</Body>
	<br/>
</div>
