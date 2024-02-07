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

<Header></Header>

<Body>
    <Box>
        <TitleText>
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

        <div class="font-bold">Production Companies:</div>
        {#each $fData.production_companies as _productionCompany}
        <div class="">{_productionCompany.name}</div>

        {#if (_productionCompany.logo_path != null)}
        <img style="" src="https://image.tmdb.org/t/p/original/{_productionCompany.logo_path}" alt="Company Logo" width="200"/>
        {/if}
        
        {/each}

        
    </Box>
</Body>