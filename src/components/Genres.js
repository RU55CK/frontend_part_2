import React from 'react';
import {endpoints} from "../../config";

class Genres extends React.Component {

    change = () => {
        const { id, genreFunc } = this.props;
        genreFunc(id)
    }

    render() {
    const { name } = this.props;


        return (

            <button onClick={this.change}>{name}</button>
        );
    }
}

export default Genres;