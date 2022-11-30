import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './ContentModal.css'
import axios from 'axios'
import {img_500, unavailable, unavailableLandscape} from '../../config/config'
import YouTubeIcon from "@material-ui/icons/YouTube";
import './ContentModal.css'
import Carousel from '../Carousel/Carousel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ContentModal({children, media_type, id}) {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState();
  const [video, setVideo] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fetchData = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setContent(data)
  } 
  const fetchVideo = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    setVideo(data.results[0]?.key)
  } 

  React.useEffect(()=>{
    fetchData()
    fetchVideo()
  }, [])

  return (
    <>
      <div onClick={handleOpen} className='media' color='inherit' style={{cursor: 'pointer'}}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {content && (
                <div className='ContentModal'>
                    <img src={content.poster_path?`${img_500}/${content.poster_path}`:unavailable} 
                        alt={content.name || content.title}
                        className='contentmodal_portrait'/>
                    <img src={content.backdrop_path?`${img_500}/${content.backdrop_path}`:unavailableLandscape} 
                        alt={content.name || content.title}
                        className='contentmodal_landscape'/>
                    <div className='contentmodal_about'>
                        <span className='contentmodal_title'>
                            {content.name || content.title} (
                            {(
                            content.first_air_date ||
                            content.release_date ||
                            "-----"
                            ).substring(0, 4)}
                            )
                        </span>
                        {content.tagline && (
                            <i className="tagline">{content.tagline}</i>
                        )}

                        <span className="contentModal__description">
                            {content.overview}
                        </span>

                        <div>
                            <Carousel media_type={media_type} id={id}/>
                        </div>

                        <Button
                            variant="contained"
                            startIcon={<YouTubeIcon />}
                            color="secondary"
                            target="__blank"
                            href={`https://www.youtube.com/watch?v=${video}`}
                        >
                            Watch the Trailer
                        </Button>
                    </div>
                </div>
            )}
            
          </Box>
        </Fade>
      </Modal>
    </>
  );
}