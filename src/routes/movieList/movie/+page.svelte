<script lang="ts">

export interface Root {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: any
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

// Default value for Root interface
const defaultRootValue: Root = {
  adult: false,
  backdrop_path: "",
  belongs_to_collection: null,
  budget: 0,
  genres: [],
  homepage: "",
  id: 0,
  imdb_id: "",
  original_language: "",
  original_title: "",
  overview: "",
  popularity: 0,
  poster_path: "",
  production_companies: [],
  production_countries: [],
  release_date: "",
  revenue: 0,
  runtime: 0,
  spoken_languages: [],
  status: "",
  tagline: "",
  title: "",
  video: false,
  vote_average: 0,
  vote_count: 0
};

import TitleText from '$lib/elements/titleText.svelte';
import SubTitleText from '$lib/elements/subTitleText.svelte';
import Body from '$lib/elements/body.svelte';
import BodyText from '$lib/elements/bodyText.svelte';
import Box from '$lib/elements/box.svelte';
import Header from '$lib/elements/header.svelte';
import * as Collapsible from "$lib/components/ui/collapsible";
import * as Table from "$lib/components/ui/table";
import * as Card from "$lib/components/ui/card";
import { Progress } from "$lib/components/ui/progress";
import { Badge } from "$lib/components/ui/badge";
import * as Tabs from "$lib/components/ui/tabs";
import Button from '$lib/components/ui/button/button.svelte';

import { writable, type Writable } from 'svelte/store';
import { onMount } from 'svelte';
	import type { Languages } from 'lucide-svelte';

export let fData = writable<Root>(defaultRootValue);

onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
 console.log(urlParams.toString());
    getSpecificMovies(urlParams.toString())
});

async function getSpecificMovies(movId:string){
	const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTdmYjc2NDVmOTkyZjZhNjk2Y2JkYmQwMWQ0OWJkMCIsInN1YiI6IjY1M2I5Yjc0NTE5YmJiMDBlMThiYjI4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oZHahhSLjQVe7D7zMK7ek4tqWkKJarg1qDrScvYwpXo'
		}
	};

	const response = await fetch('https://api.themoviedb.org/3/movie/'+movId+'?language=en-US', options)
		const fetchedData = await response.json();
		console.log(fetchedData);
		fData.set(fetchedData);
};

</script>
<div class="bg-no-repeat bg-cover bg-center h-screen" style="background-image: url(https://image.tmdb.org/t/p/original/{$fData.backdrop_path})">
<Header></Header>
<Body>
  <a class="" href="/movieList/"><Button>&#10094; Back</Button></a>
  <hr class="mt-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100"/>
    <Box>
      <div class="grid grid-cols-4 grid-rows-4 gap-4">
        <div class="row-span-4 col-span-1">
          <Card.Root class="w-[100%] h-[450px] p-0 bg-cover bg-center shadow-2xl"style="background-image: url(https://image.tmdb.org/t/p/original/{$fData.poster_path})">
            <Card.Content>
                <!-- <img style="" src="https://image.tmdb.org/t/p/original/{$fData.poster_path}" alt="Movie Poster" height="100%"/> -->
            </Card.Content>
          </Card.Root>
        </div>
        <div class="row-span-1 col-span-3 border border-10">
          <h1 class="font-bold text-5xl">{$fData.title}</h1>
        </div>
        <div class="row-span-2 col-span-2 border border-10 p-2">
          <h6 class="font-bold">"{$fData.tagline}"</h6>
          <p class="text-justify">{$fData.overview}</p>
        </div>
        <div class="row-span-4 col-span-1 border border-10 p-0">
          <Tabs.Root value="facts" class="w-[400px]">
            <Tabs.List>
              <Tabs.Trigger value="facts">Facts</Tabs.Trigger>
              <Tabs.Trigger value="metas">Meta Facts</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content class="my-0 px-2 py-0" value="facts">
              <div>Release Date: {$fData.release_date}</div>
              <div>Runt Time: {$fData.runtime}</div>
              <!-- <div>Status: {$fData.status}</div> -->

              <div class="font-bold">Spoken Languages:</div>
              <div>
              {#each $fData.spoken_languages as _language}
                <Badge class="rounded-sm m-1">{_language.english_name}</Badge>

                <!-- <div class="">{_language.english_name}</div> -->
              {/each}
            </div>
            <div class="align-bottom">
              <a href="https://www.imdb.com/title/{$fData.imdb_id}/"><Button class="text-black font-bold bg-yellow-400 hover:bg-yellow-500">IMDB Page</Button></a>
            </div>
            </Tabs.Content>
            <Tabs.Content class="my-0 px-2 py-0" value="metas">

              <div class="font-bold">Production Company:</div>
              {#each $fData.production_companies as _productionCompany}
                <div class="">{_productionCompany.name}</div>
              {/each}
              <div>Revenue: {$fData.revenue} $</div>
              <div>Budget: {$fData.budget} $</div>

              <a href="{$fData.homepage}"><Button>Movie Homepage</Button></a>
            </Tabs.Content>
          </Tabs.Root>
        </div>
        <div class="row-span-1 col-span-1 border border-5 p-2">
          <div class="grid grid-cols-2 grid-rows-2 gap-2">
            <div>
              <h2 class="align-middle font-bold text-l">Avrage User Score:</h2>
            </div>
            <div class="flex justify-end">
              <Badge class="bg-lime-700 align-middle">{Math.round(($fData.vote_average)*10)}% &#9733;</Badge>
            </div>
            <div class="col-span-2 align-middle">
              <Progress class="h-[10px]" value={($fData.vote_average)*10} />
            </div>
          </div>
        </div>
        <div class="row-span-1 col-span-1 border border-5 p-2">
          <div class="font-bold">Genres:</div>
          {#each $fData.genres as _genre}
          <Badge class="rounded-sm m-1">{_genre.name}</Badge>
          {/each}
        </div>
        
      </div>
      
      

      <!-- <TitleText>
          <h1>{$fData.title}</h1>
      </TitleText>
      {$fData.overview}
      <br>
      <div class="font-bold">{$fData.tagline}</div>

      <div class="">{$fData.status}</div>

      <div class="font-bold">Spoken Language:</div>
      {#each $fData.spoken_languages as _language}
      <div class="">{_language.english_name}</div>
      {/each}
      
      <div class="font-bold">Genres:</div>
      {#each $fData.genres as _genre}
      <div class="">{_genre.name}</div>
      {/each}

        <div class="grid grid-cols-2 gap-4">
          <Collapsible.Root>
            <Collapsible.Trigger><div class="font-bold">Production Companies:</div></Collapsible.Trigger>
            <Collapsible.Content>
              <Table.Root class="bg-transparant">
                <Table.Body>
                  {#each $fData.production_companies as _productionCompany}
                  <Table.Row>
                    <Table.Cell>
                      {#if (_productionCompany.name != null)}
                        <div class="">{_productionCompany.name}</div>
                      {/if}
                    </Table.Cell>

                    <Table.Cell>
                      {#if (_productionCompany.logo_path != null)}
                        <img style="" src="https://image.tmdb.org/t/p/original/{_productionCompany.logo_path}" alt="Company Logo" width="200"/>
                      {/if}
                    </Table.Cell>
                  </Table.Row>
                  {/each}
                </Table.Body>
              </Table.Root>
            </Collapsible.Content>
          </Collapsible.Root>
        </div> -->
        
    </Box>
</Body>
</div>