import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom'

import Navbar from '../Support Files/Navbar'

class Explore extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            searchBar: ''
        }
    }

    async componentDidMount() {
        try {
            let blogs = await axios.get(`/api/blog/all`);
            this.setState({
                data: blogs.data.payload
            });
            console.log("state:", this.state);
        } catch (err) {
            console.log("ERROR:", err);
        }
    }

    searchChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    addDefaultSrc(ev) {
        ev.target.src = 'https://ak.picdn.net/shutterstock/videos/1005609832/thumb/12.jpg?ip=x480'
    }

   render() {
        const reducedData = this.state.data.filter(
            element => {

            return element.id % 2 === 0;
            }
        );
        return (
            <div>
                <Navbar />
                <div className='masonry-holder'>
                    {
                        reducedData.map((element, i) => {
                            return (
                                <div key={i} className="masonry-blocks">
                                    <img onError={this.addDefaultSrc} src={element.file_src + `${i}`} alt='img' />
                                    {/* <a onClick={this.showStory.bind(this, element)}> */}
                                    <Link to={{
                                        pathname: '/storypage',
                                        state: {
                                            storyProps: element
                                        }
                                    }}>
                                        <h3>{element.story_title}</h3>
                                        <div className="block-content">
                                            <p>{element.caption}</p>
                                        </div>
                                    </Link>
                                    {/* </a> */}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
export default Explore;