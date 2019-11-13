import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import CompanyInfo from './CompanyInfo';
import NurseInfo from './NurseInfo';

class UserData extends Component {
  state = {
    user: {},
    loading: true,
    message: undefined,
  };

  async componentDidMount() {
    const { user } = this.props;
    console.log('TCL: UserData -> componentDidMount -> user', user);

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

  render() {
    const { user, loading, message } = this.state;
    return (
      <div>
        {message && <div>{message}</div>}
        {loading && <div>Loading...</div>}
        {!loading && (
          <>
            AQUI IRÁ LA INFO DEL USER:
            {user.company && (
              <>
                <CompanyInfo user={user} />
              </>
            )}
            {!user.company && (
              <>
                <NurseInfo user={user} />
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

export default withAuth(UserData);
