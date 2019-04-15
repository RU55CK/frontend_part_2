import React from 'react';
import Card from './Card';
import axios from 'axios';
import { endpoints, getImageUrl } from '../../config';
import Genres from "./Genres";

class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      movieList: [],
      genresList: [],
      likedList: [],
    };
    
    this.getMovies();
    this.getGenres();

  }
  
  getMovies = () => {
    axios
      .get(endpoints.mostPopularMovies())
      .then((res) => this.setMovieList(res.data.results))
      .catch((error) => console.log(error));
  };

  getGenres = () => {
    axios
        .get(endpoints.genres())
        .then((res) => this.setGenresList(res.data.genres))
        .catch((error) => console.log(error));
  };

  getGenresbyId = (id) => {
    axios
        .get(endpoints.genreMovies(id))
        .then((res) => this.setMovieList(res.data.results))
        .catch((error) => console.log(error))
  }
  
  setMovieList = (list) => {
    this.setState({
      movieList: list,
    });
  };

  setGenresList = (list) => {
    this.setState({
      genresList: list,
    });


  };

  setMovieLike = (title, isliked) => {
    if(isliked) {
      this.state.likedList.push(title)
    } else {
      let index = this.state.likedList.indexOf(title);
      this.state.likedList.splice(index,1);
      //console.log(index)
    }
      ;
  }

  movieLikeStatus = (id) => {

    if(this.state.likedList.indexOf(id) !== -1) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { movieList } = this.state;
    const { genresList } = this.state;

    return (
      <div>

        <div className="genres">
            {genresList.map((listItem) =>
              <Genres
                id = {listItem.id}
                name={listItem.name}
                genreFunc={this.getGenresbyId}
              />
            )}
        </div>

        {movieList.map((listItem) => (
          <Card
            backgroundImage={getImageUrl(listItem.backdrop_path)}
            title={listItem.original_title}
            releaseDate={listItem.release_date}
            score={listItem.vote_average}
            votes={listItem.vote_count}
            description={listItem.overview}
            like={this.movieLikeStatus(listItem.title)}
            setMovieLike={this.setMovieLike}
          />
        ))}
      </div>
    );
  }
}

export default App;
