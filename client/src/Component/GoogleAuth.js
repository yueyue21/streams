import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "302692230197-45tdhdfg0o2rgv4qdm85f7r17rgmsn6e.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          //immediately update the login state in our redux store
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    if (isSignedIn) {
      //call the action creater. In other words, dispatch the sinIn action
      this.props.signInProps(this.auth.currentUser.get().getId());
    } else {
      this.props.signOutProps(this.auth.currentUser.get().getId());
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };
  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedInProps === null) {
      return null;
    } else if (this.props.isSignedInProps) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In With Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedInProps: state.auth.isSignedIn };
};

const mapDispatchToProps = {
  signInProps: signIn,
  signOutProps: signOut
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleAuth);
