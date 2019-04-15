import React from 'react';
import axios from "axios";
import {endpoints} from "../../config";

class Card extends React.Component {
  constructor() {
    super();
    
    this.state = {
      opened: false, liked: false,
    }
  }

    componentWillReceiveProps(nextProps){
        if(nextProps.like !== this.state.liked){
            this.setState({
                liked: nextProps.like
            });
        }
    }


    setLike = () => {
        this.setState(
            {liked: !this.state.liked}
        );
        const { title, setMovieLike } = this.props;
        setMovieLike(title, !this.state.liked)
    };


    render() {
    const {
      backgroundImage,
      title,
      releaseDate,
      score,
      votes,
      description,
    } = this.props;
    const { opened } = this.state;

    
    return (
      <div className="card">
        <div
          className="card__image"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
          }}
        />
    
        <div className="card__title">
          {title}
        </div>
    
        <div className="card__like">
            <i
                className={ this.state.liked ? "fa fa-heart" : "fa fa-heart-o"}
                onClick={ this.setLike }
            />
        </div>
    
        <div className="card__subtitle">
            <span>{releaseDate}</span>
            <span>{score} ({votes} votes)</span>
        </div>
    
        <div className="card-info">
        <div
          className="card-info__header"
          onClick={() => this.setState({ opened: !opened })}>
          Summary
        </div>
          
          {opened
            ? (
              <div className="card-info__description">
                {description}
              </div>
            )
            : null
          }
    </div>
</div>

    );
  }
}

export default Card;
