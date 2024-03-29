import React, {useState,useEffect} from 'react';
import axios from './axios';
import './Row.css';
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url="https://image.tmdb.org/t/p/original/";
function Row(title, fetchUrl, isLargeRow){

  const [movies,setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl]=useState("");

  useEffect(()=>{
      // if[] empty then run once and wont run again
      async function fetchData(){
        const request=await axios.get(fetchUrl);
        console.log(request.data.results);
        setMovies(request.data.results);
        return request;
      }
      fetchData();
  },[fetchUrl]);

  const opts={
      height:"390",
      width:"100%",
      playVars:{
          //https:developers.google.com/youtube/player_parameters
          autoplay: 1,
      },
  };
  
  const handleClick=(movie)=>{
      if (trailerUrl){
          setTrailerUrl('');
      }else{
          movieTrailer(movie?.name ||"")
          .then(url=>{
            const urlParams = new URLSearchParams((url).search);
           setTrailerUrl (urlParams.get('v'));
          }).catch((error)=>console.log(error));
      }
  }

  console.table(movies);
    return(
        <div className="row">
            <h2>Title</h2>
        <div className="row_posters">
            {movies.map(movie=>(
                <img 
                key={movie.id}
                onClick={()=>handleClick(movie)}
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                src={`${base_url}${isLargeRow? movie.poster.path: movie.backdrop_path}`} alt={movie.name}/>
            ))}

        </div>
        </div>
    );
}

export default Row