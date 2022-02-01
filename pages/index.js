import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../components/Seo";

const API_KEY = "7539a2083cc4f7d9dc5e72dc2d0091e4";

export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`);
  };
  const [movies, setMovies] = useState();
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/movies`);
      const { results } = await response.json();
      console.log(results);
      setMovies(results);
    })();
  }, []);
  return (
    <div className="container">
      <Seo title="Index"></Seo>
      {!movies && <h4>Loading...</h4>}
      {/* {movies?.map((movie) => ( client side render */}
      {results?.map((movie) => (
        <div
          onClick={() => onClick(movie.id, movie.original_title)}
          className="movie"
          key={movie.id}
        >
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <Link
            passHref
            href={`/movies/${movie.original_title}/${movie.id}`}
            key={movie.id}
          >
            <h4>
              <a>{movie.original_title}</a>
            </h4>
          </Link>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`http://localhost:3000/api/movies`);
  const { results } = await response.json();
  return {
    props: {
      results,
    },
  };
}
