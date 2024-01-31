import type { PageLoad } from './$types';

export interface Root {
  page: number
  results: Result[]
  total_pages: number
  total_results: number
}
  
export interface Result {
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

export const load: PageLoad = async ({ fetch, params }) => {
	
  //   const options = {
  //       method: 'GET',
  //       headers: {
  //         accept: 'application/json',
  //         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTdmYjc2NDVmOTkyZjZhNjk2Y2JkYmQwMWQ0OWJkMCIsInN1YiI6IjY1M2I5Yjc0NTE5YmJiMDBlMThiYjI4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oZHahhSLjQVe7D7zMK7ek4tqWkKJarg1qDrScvYwpXo'
  //       }
  //     };
    
  //   const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options);
	// const item = await res.json();
  // console.log(res);

//   const options = {method: 'GET', headers: {accept: 'application/json'}};

// fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));
    
// 	return { };



  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTdmYjc2NDVmOTkyZjZhNjk2Y2JkYmQwMWQ0OWJkMCIsInN1YiI6IjY1M2I5Yjc0NTE5YmJiMDBlMThiYjI4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oZHahhSLjQVe7D7zMK7ek4tqWkKJarg1qDrScvYwpXo'
    }
  };
    
  const fetchData = () => {
    return fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        return response;
      });
  };

  return fetchData();
};

