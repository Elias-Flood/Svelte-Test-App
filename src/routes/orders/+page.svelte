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
	import * as Table from '$lib/components/ui/table';
	import LogoText from '$lib/elements/logoText.svelte';

	import * as Pagination from "$lib/components/ui/pagination";

	import { buttonVariants } from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";

    import type { PageData } from './$types';
	
	export let data: PageData;

	export let pageNumber = 1;
	import { setPageNumber } from './$types';


// 	//import { setPageNumber } from '$routes/orders/page.ts';
// 	let allContent = ["hi", "bye", "lie", "tie", "fry", "cry", "pie", "my", "guy"];
//   let currentPage = 3; // Update this to simulate page change.
//   let postsPerPage = 2;
//   let allPosts = allContent;
//   let totalPosts = allPosts.length;
//   let totalPages = Math.ceil(totalPosts / postsPerPage);
//   $: postRangeHigh = currentPage * postsPerPage;
//   $: postRangeLow = postRangeHigh - postsPerPage;
// 	const setCurrentPage = (newPage: number) => {
// 		currentPage = newPage;
// 	}
</script>

<!-- {#each allPosts as post, i}
  {#if i >= postRangeLow && i < postRangeHigh}
    <h3>{post}</h3>
  {/if}
{/each}

<ul>
	{#if currentPage > 1}
	  <li><a href="/blog" on:click|preventDefault={() => setCurrentPage(1)}>first</a></li>
	  <li><a href="/blog/{currentPage - 1}" on:click|preventDefault={() => setCurrentPage(currentPage - 1)}>previous</a></li>
	{/if}
  {#each [3,2,1] as i}
    {#if currentPage - i > 0}
      <li><a href="/blog/{currentPage - i}" on:click|preventDefault={() => setCurrentPage(currentPage - i)}>{currentPage - i}</a></li>
    {/if}
  {/each}
  <li><span>{currentPage}</span></li>
  {#each Array(3) as _, i}
    {#if currentPage + (i+1) <= totalPages}
      <li><a href="/blog/{currentPage + (i+1)}" on:click|preventDefault={() => setCurrentPage(currentPage + (i+1))}>{currentPage + (i+1)}</a></li>
    {/if}
  {/each}
  {#if currentPage < totalPages}
	  <li><a href="/blog/{currentPage + 1}" on:click|preventDefault={() => setCurrentPage(currentPage + 1)}>next</a></li>
    <li><a href="/blog/{totalPages}" on:click|preventDefault={() => setCurrentPage(totalPages)}>last</li>
  {/if}
</ul> -->


<div class="bg-cover bg-center bg-scroll" style="background-image: url('https://image.tmdb.org/t/p/original/{data.results[0].backdrop_path}');">
	<Header>
		<div class="grid-rows-3">
			<Logo>Navbar</Logo>
			<a href="/"><Button variant="ghost">Navlink 1</Button></a>
			<Button variant="ghost">Navlink 2</Button>
			<Button variant="ghost">Navlink 3</Button>
		</div>
	</Header>

	<Body>
		<TitleText>Trending Movies</TitleText>
		
		<hr class="my-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100"/>

		<div class="grid grid-cols-5 grid-rows-4 grid-flow-rows gap-4">
			{#each {length: data.results.length} as obj, i}
			<div class="w-[100%]; hover:animate-wiggle">
				<Dialog.Root>
					<Dialog.Trigger>
						<img src="https://image.tmdb.org/t/p/original/{data.results[i].poster_path}" alt="Movie Poster"/>
					</Dialog.Trigger>
					<Dialog.Content class="sm:max-w-[70%] h-auto bg-cover bg-center" style="background-image: url('https://image.tmdb.org/t/p/original/{data.results[i].backdrop_path}');">
					  <Dialog.Header>
					  </Dialog.Header>
					  <div class="grid grid-cols-3 gap-4">
						<div class="col-span-1">
							<img class="border-solid border-2 border-stone-200 drop-shadow-xl shadow-2xl" src="https://image.tmdb.org/t/p/original/{data.results[i].poster_path}" alt="Movie Poster"/>
						</div>
						<div class="col-span-2">
							<Box>
								<div class=" w-[100%] h-auto">
									<TitleText>
										{data.results[i].title}
									</TitleText>
									<SubTitleText>
										{data.results[i].release_date}
									</SubTitleText>
									<BodyText>
										{data.results[i].overview}
									</BodyText>
								</div>
							</Box>
						</div>
					  </div>
					  <Dialog.Footer>
						{data.results[i].id}
					  </Dialog.Footer>
					</Dialog.Content>
				  </Dialog.Root>
				<!-- <Box>
					{i+1}. <p class="font-bold text-lg">{data.results[i].title}</p>
				</Box> -->
			</div>
			
			
			{/each}
			
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
