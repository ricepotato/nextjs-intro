import { useEffect, useState } from "react";
import Seo from "../components/Seo";

const API_KEY = "7539a2083cc4f7d9dc5e72dc2d0091e4";

export default function Home() {
  const [movies, setMovies] = useState();
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      const { results } = await response.json();
      console.log(results);
      setMovies(results);
    })();
  }, []);
  return (
    <div>
      <Seo title="Index"></Seo>
      <h1>hello</h1>
      {!movies && <h4>Loading...</h4>}
      {movies?.map((movie) => (
        <div key={movie.id}>
          <h4>{movie.original_title}</h4>
        </div>
      ))}
    </div>
  );
}
