import axios from 'axios';
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from "../../config/config";
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({media_type, id}) => {
    const [credits, setCredits] = React.useState([]);

    const items = credits.map((c) => (
        <div className="carousel">
          <img
            src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
            alt={c?.name}
            onDragStart={handleDragStart}
            className="carousel_img"
          />
          <b className="carousel_txt">{c?.name}</b>
        </div>
      ));

    const responsive = {
        0: {
            items: 3,
        },
        512: {
            items: 5,
        },
        1024: {
            items: 7,
        },
    };

    const fetchCredits = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setCredits(data.cast);
      };
    
      React.useEffect(() => {
        fetchCredits();
        // eslint-disable-next-line
      }, []);

  return (
    <AliceCarousel 
    autoPlay
    responsive={responsive}
    infinite
    disableButtonsControls
    disableDotsControls
    mouseTracking 
    items={items} />
  );
}

export default Carousel;