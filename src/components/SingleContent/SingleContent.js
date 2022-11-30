import React from 'react'
import {img_300, unavailable} from '../../config/config'
import './SingleContent.css'
import { Badge } from '@material-ui/core'
import ContentModal from '../ContentModal/ContentModal'

const SingleContent = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average
}) => {

    const dt = new Date(date);
    const year = dt.getFullYear()
    vote_average = Math.round(vote_average * 10) / 10
    return (
    <ContentModal media_type={media_type} id={id}>
        <Badge badgeContent={vote_average} color={vote_average>=6?'primary':'secondary'}/>
        <img className='poster' src={poster ? `${img_300}/${poster}`:unavailable} alt={title}/>
        <b className='title'>{title}</b>
        <span className='subtitle'>
            {media_type === 'tv'? 'TV Series':'Movie'}
            <span className='subtitle'>{year}</span>
        </span>
        
    </ContentModal>
  )
}

export default SingleContent