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
	import { Progress } from "$lib/components/ui/progress";
	import * as Collapsible from "$lib/components/ui/collapsible";
	import * as Tabs from "$lib/components/ui/tabs";
	import * as Card from "$lib/components/ui/card";
	import { Badge } from "$lib/components/ui/badge";

    import type { PageData, PageLoad } from './$types';

	import { onMount } from "svelte";
	import { writable, type Writable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';
	import * as HoverCard from "$lib/components/ui/hover-card";
	import TableBody from '$lib/components/ui/table/table-body.svelte';
	import { Root } from 'postcss';

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

//v5
export let fData = writable<Root>(defaultRootValue);

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

let m_boolean: boolean;

onMount(async () => {getMovies(1)});
</script>

<div>
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
					<Pagination.Link {page} isActive={currentPage == page.value}>
					  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					  <!-- svelte-ignore a11y-click-events-have-key-events -->
					  <p on:click={(() => getMovies(page.value))}>{page.value}</p> 
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
					<div class="grid grid-cols-5 grid-rows-4 grid-flow-rows gap-4">
						{#if ($fData.results)}
							{#each {length: $fData.results.length} as obj, i}
							<div class="w-[100%]; hover:animate-wiggle">
								<a href="/movieList/movie?{$fData.results[i].id}">
									<Card.Root class="w-[250px] h-[375px] p-2 bg-cover bg-center shadow-2xl"style="background-image: url(https://image.tmdb.org/t/p/original/{$fData.results[i].poster_path})">
										<Card.Content class="m-0 flex justify-end">
											<Badge variant="secondary">{Math.round(($fData.results[i].vote_average)*10)}% &#9733;</Badge>
											<!-- <img style="" src="https://image.tmdb.org/t/p/original/{$fData.poster_path}" alt="Movie Poster" height="100%"/> -->
											<!-- <Progress class="h-[5px] w-[30%]" value={($fData.results[i].vote_average)*10} /> -->
										</Card.Content>
									</Card.Root>
									<!-- <img src="https://image.tmdb.org/t/p/original/{$fData.results[i].poster_path}" alt="Movie Poster"/> -->
								</a>
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
				</Box>

			</Tabs.Content>
			<Tabs.Content value="listView">
				
				<Box>
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
		<!-- <Box>
			<div class="grid grid-cols-4 gap-4 w-full">
				<div class="col-span-2 bg-stone-300 p-2">Title</div>
				<div class="bg-stone-300 p-2">Popularity</div>
				<div class="bg-stone-300 p-2">Release Date</div>
			</div>
			
			

			<hr class="my-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100"/>
			{#each {length: $fData.results.length} as obj, i}
				<HoverCard.Root >
					<HoverCard.Trigger>
						<a href="/" on:click={() => {m_boolean = true;}} on:mouseleave={() => {m_boolean = false;}}>
							<div class="grid grid-cols-4 gap-4 w-full">
								<div  class="col-span-2  bg-stone-200 border-2 border-stone-300 py-1 mx-0">{$fData.results[i].title}</div>
								<div class="bg-stone-200 border-2 border-stone-300 py-1 mx-0">{$fData.results[i].popularity}</div>
								<div class="bg-stone-200 border-2 border-stone-300 py-1 mx-0">{$fData.results[i].release_date}</div>
							</div>
							
						</a>	
					</HoverCard.Trigger>
					<HoverCard.Content class="p-0">
						<div class="grid grid-cols-3 gap-4">
							<div>
								<img src="https://image.tmdb.org/t/p/original/{$fData.results[i].poster_path}"/>
							</div>
							<div class="col-span-2 m-4">
								<SubTitleText>{$fData.results[i].title}</SubTitleText>
								<div style="overflow-y: auto; max-height: 200px;">
									<p>{$fData.results[i].overview}</p>
								</div>
							</div>
						</div>
					</HoverCard.Content>
				  </HoverCard.Root>
			{/each}

			<HoverCard.Root >
				<HoverCard.Trigger>
					hello
				</HoverCard.Trigger>
				<HoverCard.Content>
					text here
				</HoverCard.Content>
			  </HoverCard.Root>
		</Box> -->
		<!-- <div class="grid grid-cols-5 grid-rows-4 grid-flow-rows gap-4">
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
		</div> -->
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
				<Pagination.Link {page} isActive={currentPage == page.value}>
				  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				  <!-- svelte-ignore a11y-click-events-have-key-events -->
				  <p on:click={(() => getMovies(page.value))}>{page.value}</p> 
				</Pagination.Link>
			  </Pagination.Item>
			{/if}
		  {/each}
		</Pagination.Content>
	  </Pagination.Root>
	</Body>
	<br/>
</div>