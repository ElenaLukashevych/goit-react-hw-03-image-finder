import ImageGalleryItem from "components/ImageGalleryItem";
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

function ImageGallery({ pictures, onClick }) { 
    return <ul className={s.ImageGallery}>
                {pictures.map(picture => <ImageGalleryItem key={picture.id}  onClick={() => onClick(picture)} webformatURL={picture.webformatURL} tags={picture.tags} />)}
             </ul>
    
}

ImageGallery.propTypes = {
    pictures: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default ImageGallery;