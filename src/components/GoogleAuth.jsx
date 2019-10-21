import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {

    componentDidMount() {
        new Promise((resolve, reject) => window.gapi.load('client:auth2', () => resolve(null)))
        .then(() => window.gapi.client.init({
            clientId: '1045611577829-p94c79t3hj8k12ulfchb4hcd4d6ell3u.apps.googleusercontent.com',
            scope: 'email'
        }))
        .then(() => {
            this.auth = window.gapi.auth2.getAuthInstance();
            this.onAuthChange(this.auth.isSignedIn.get());
            this.auth.isSignedIn.listen(this.onAuthChange.bind(this));
        });
    }

    onAuthChange(isSignedIn) {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign In with Google
                </button>
            );
        }
    }

    render() { 
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
};
 
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);