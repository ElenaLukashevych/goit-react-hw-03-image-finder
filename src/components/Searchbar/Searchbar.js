import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css';

class Searchbar extends Component {
    static propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
  state = {
    searchQuery : '',
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchQuery } = this.state;
    const { onSubmit } = this.props;

 if (searchQuery.trim() === '') {
      return toast.error('Sorry, there are no images matching your search query. Please try again.');
    }
    onSubmit(searchQuery);
    this.setState({ searchQuery: ''})
  }

  
  handleSearchQueryChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  render() {
    const { handleSubmit, handleSearchQueryChange } = this;
    const { searchQuery } = this.state;

      return (
      <header className={s.Searchbar}>
        <form onSubmit={handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchFormButton}>
            <ImSearch />

      <span className={s.SearchFormButtonLabel}>Search</span>
    </button>

            <input
      onChange={handleSearchQueryChange}
      className={s.SearchFormInput}
      value={searchQuery}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
    />
  </form>
</header>
    )
    }
}

export default Searchbar;
