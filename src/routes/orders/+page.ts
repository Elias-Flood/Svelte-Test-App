import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTdmYjc2NDVmOTkyZjZhNjk2Y2JkYmQwMWQ0OWJkMCIsInN1YiI6IjY1M2I5Yjc0NTE5YmJiMDBlMThiYjI4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oZHahhSLjQVe7D7zMK7ek4tqWkKJarg1qDrScvYwpXo'
    }
  };
  
 let pageNumber = 1;

  const fetchData = () => {
    return fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US&page='+pageNumber, options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        return response;
      });
  };

  return fetchData();
  
};
