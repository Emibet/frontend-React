import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import userService from '../services/userService';

class NurseUpdate extends Component {
  state = {
    username: '',
    password: '',
    company: false,
    user: {},
    loading: true,
    message: undefined,
  };

  async componentDidMount() {
    // const {
    //   match: {
    //     params: { id },
    //   },
    // } = this.props;
    const { user } = this.props;
    console.log('PROPS NURSEUPDATE ComponentDidMount: ', this.props);
    console.log('PROPS NURSEUPDATE ComponentDidMount:Nurse Name ', user.nurse.name);
    try {
      this.setState({
        user,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      });
    }
  }

  handleChange = event => {
    const {
      user: { nurse },
      user,
    } = this.state;
    const { name, value } = event.target;
    this.setState({
      user: {
        ...user,
        nurse: {
          ...nurse,
          [name]: value,
        },
      },
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, password, company, user } = this.state;
    // this.props.handleUpdate({
    //   username,
    //   password,
    //   company,
    // });
    console.log('The USER to SEND: ', user);
    userService
      .updateUserNurse(user)
      .then(() => {
        this.setState({
          message: 'User Updated',
        });
      })
      .catch(() => {
        console.log('catch');
      });
  };

  render() {
    const { username, password, company, user, message, loading } = this.state;
    // const {
    //   user: { title, author, description, rating },
    //   loading,
    //   message,
    // } = this.state;
    console.log('PROPS: ', this.props);
    // console.log('TCL: Signup -> render -> contractor', contractor);
    console.log('TCL: Signup -> componentDidMount -> user', user);
    return (
      <div>
        NURSE UPDATE
        {username}
        {message && <div>{message}</div>}
        {loading && <div>Loading...</div>}
        {!loading && (
          <>
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" id="name" value={user.nurse.name} onChange={this.handleChange} />
              <label htmlFor="surname">LastName:</label>
              <input type="text" name="surname" id="surname" value={user.nurse.surname} onChange={this.handleChange} />
              <input type="submit" value="Update" />
            </form>
          </>
        )}
        {/* {user.nurse.name} */}
        {/* <form onSubmit={this.handleFormSubmit}>
          <input type="hidden" name="company" value={company} />
          <label>Username:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange} />
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          <input type="submit" value="Signup" />
        </form> */}
      </div>
    );
  }
}

export default withAuth(NurseUpdate);

// import React, { Component } from 'react';
// import bookService from '../../services/bookService';

// class BookUpdate extends Component {
//   state = {
//     book: {},
//     loading: true,
//     message: undefined
//   }

//   async componentDidMount() {
//     const { match: {params: { id }} } = this.props;
//     try {
//       const book = await bookService.getBookById(id)
//       this.setState({
//         book,
//         loading: false,
//       })
//     } catch (error) {
//       console.log(error);
//       this.setState({
//         loading: false,
//       })
//     }
//   }

//   handleChange = (e) => {
//     const { book } = this.state;
//     this.setState({
//       book: {
//         ...book,
//         [e.target.name]: e.target.value,
//       }
//     })
//   }

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const { book } = this.state;
//     const { history: { push }} = this.props;
//     console.log(book);
//     bookService.updateBook(book)
//       .then(() => {
//         // this.setState({
//         //   message: 'book updated',
//         // })
//         push(`/books/${book._id}`)
//       })
//       .catch(() => {})
//   }

//   render() {
//     const { book: { title, author, description, rating }, loading, message } = this.state;

//     return (
//       <div>
//         BookUpdate
//         {message && <div>{message}</div> }
//         {loading && <div>Loading...</div> }
//         {!loading && (
//           <>
//           <form onSubmit={this.handleSubmit}>
//             <label htmlFor="title">title</label>
//             <input type="text" name="title" id="title" value={title} onChange={this.handleChange}/>
//             <label htmlFor="author">author</label>
//             <input type="text" name="author" id="author" value={author} onChange={this.handleChange}/>
//             <label htmlFor="description">description</label>
//             <input type="text" name="description" id="description" value={description} onChange={this.handleChange}/>
//             <label htmlFor="rating">rating</label>
//             <input type="number" name="rating" id="rating" value={rating} onChange={this.handleChange}/>
//             <input type="submit" value="submit"/>
//           </form>
//           </>
//         ) }
//       </div>
//     );
//   }
// }

// export default BookUpdate;
