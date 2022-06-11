import { Component } from "react";
import { animateScroll as scroll } from "react-scroll";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ThreeDots } from 'react-loader-spinner';
import { ToastContainer} from 'react-toastify';
import Searchbar from 'components/Searchbar';
import ImageGallery from "components/ImageGallery";
import Button from "components/Button";
import Modal from "components/Modal";
import api from '../services/api';
import s from './App.module.css';

class App extends Component {
   state = {
     searchQuery: '',
     pictures: [],
     status: 'idle',
     error: null,
     page: 1,
     total: 0,
     showModal: false,
     modalImage: '',
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { searchQuery } = this.state;
    if (prevState.searchQuery !== searchQuery) {
    this.setState({
      status: 'pending',
      pictures: [],
       page: 1, 
    })
      this.getImages()
    }
    if (this.state.page !== prevState.page && this.state.page !== 1) {
      this.getImages()
       this.setState({
      status: 'pending',
       })
      scroll.scrollToBottom();
    }
  }

  async getImages() {
    const { searchQuery, page } = this.state;
    
try {
  const images = await api.getPictures(searchQuery, page);

  if (images.hits.length === 0) {
    this.setState({
      status: 'idle',
    })
    return toast.error(`${searchQuery} not found`)
  }
    
  this.setState( prevState  => ({
    pictures: [...prevState.pictures, ...images.hits],
    status: 'resolved',
    total: images.totalHits,
  }))
 
} catch (error) {
  this.setState({
  error,
  status: 'rejected',})
    }
  }

  handleButtonClick = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      }
    })
  }

    scrollToBottom = () => {
    scroll.scrollToBottom();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onClickImage = (image) => {
    this.toggleModal()
    this.setState({ modalImage: image })
  }
  
  render() {
    const { handleFormSubmit, handleButtonClick,toggleModal, onClickImage } = this;
    const { pictures, status, total, error, showModal, modalImage } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={handleFormSubmit} />
        {status === 'resolved' && <ImageGallery onClick={onClickImage} pictures={pictures} />}
        {status === 'idle' && <p className={s.text}>Type in your search query</p>}
        {pictures.length > 0 && pictures.length < total && <Button onClick={handleButtonClick} /> }
        {status === 'pending' && <div className={s.loading}>
               <ThreeDots color="#00BFFF" height={80} width={80} />
        </div>}
        {status === 'rejected' && <h2>{error.message}</h2>}
        {showModal && <Modal onClose={toggleModal}>
          <img src={ modalImage.largeImageURL } alt={ modalImage.tags } />
        </Modal>}
        <ToastContainer autoClose={3000} />
        </div>
    )
}
}

export default App;
