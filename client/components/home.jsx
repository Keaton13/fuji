import React from 'react';
import Header from './header';
import Footer from './footer';
import Switch from 'react-switch';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      currentUser: null,
      search: '',
      checked: true
    };
    this.loadUserProfile = this.loadUserProfile.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/users', {
      method: 'GET'
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({
          users: json
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleChange(checked) {
    if (checked === true) {
      this.setState({
        checked: checked,
        buttonText: 'Explore Mode'
      });
      setTimeout(() => {
        this.props.setView('home');
      }, 500);
    } else {
      this.setState({
        checked: checked,
        buttonText: 'Home'
      });
      setTimeout(() => {
        this.props.setView('postHome');
      }, 500);
    }
  }

  loadUserProfile(user) {
    this.props.saveSelectedData(user);
    this.props.setView('profile');
  }

  renderUsers(user) {
    return (
      <li
        key={user.user_id}
        className='list-group-item w-100 my-auto listItem'
        onClick={() => this.loadUserProfile(user)}
      >
        {user.username}
      </li>
    );
  }

  onSearchChange(e) {
    this.setState({
      search: e.target.value
    });
  }

  render() {
    const search = this.state.search;
    const users = this.state.users;
    if (users !== null) {
      const filteredUsers = users.filter(user => {
        return user.username.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      });
      return (
        <div>
          <Header />
          <div className='container'>
            <div className='row mb-3'>
              <div className='col-8 mt-3'>
                <div className='input-group'>
                  <div className='input-group-prepend'></div>
                  <input
                    type='search'
                    className='form-control rounded-pill w-75'
                    aria-label='Search....'
                    placeholder='Search'
                    aria-describedby='inputGroup-sizing-default'
                    onChange={this.onSearchChange}
                  ></input>
                </div>
              </div>
              <div className='col-4'>
                <div className='text-center mt-1'>
                  <h6>Explore</h6>
                  <Switch
                    onChange={this.handleChange}
                    checked={this.state.checked}
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <h6>All Results</h6>
              </div>
            </div>
            <div className='row d-flex'>
              <ul className='list-group w-75 mx-auto'>
                {filteredUsers.map(user => {
                  return this.renderUsers(user);
                })}
              </ul>
            </div>
            <div className='row'>
              <Footer
                setView={this.props.setView}
                userParams={this.props.userParams}
                id='footer'
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'></div>
                  <input
                    type='search'
                    className='form-control rounded-pill'
                    aria-label='Search....'
                    placeholder='Search'
                    aria-describedby='inputGroup-sizing-default'
                    onChange={this.onChange}
                  ></input>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <h6>All Results</h6>
              </div>
            </div>
            <div className='row d-flex'>
              <ul className='list-group w-75 mx-auto'></ul>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Home;
