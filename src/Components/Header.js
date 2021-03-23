import React from 'react';
import '../Styles/header.css';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '3px',
        backgroundColor: 'brown',
        border: 'solid 2px brown'
    }
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            isUserLoggedIn: false,
            userName: undefined
        }
    }

    Navigate = () => {
        this.props.history.push("/");
    }

    handleLogin = () => {
        this.setState({ loginModalIsOpen: true });
    }

    responseGoogle = (response) => {
        if (response && response.profileObj && response.profileObj.name) {
            this.setState({ loginModalIsOpen: false, isUserLoggedIn: true, userName: response.profileObj.name });
        } else {
            this.setState({ loginModalIsOpen: false });
        }
    }

    responseFacebook = (response) => {
        if (response && response.name) {
            this.setState({ loginModalIsOpen: false, isUserLoggedIn: true, userName: response.name });
        }
        else {
            this.setState({ loginModalIsOpen: false });
        }
    }

    handleLogout = () => {
        this.setState({ isUserLoggedIn: false, userName: undefined })
    }

    render() {
        const { loginModalIsOpen, isUserLoggedIn, userName } = this.state;
        return (
            <div style={{ backgroundColor: '#ce0505', height: '50px' }}>
                <div className="header-logo" onClick={this.Navigate}>
                    <p>e!</p>
                </div>
                {isUserLoggedIn ? <div style={{ float: 'right', marginTop: '10px' }}>
                    <div style={{ display: 'inline-block' }} className="header-login" >{userName}</div>
                    <div style={{ display: 'inline-block' }} className="header-account" onClick={this.handleLogout}>Logout</div>
                </div> :
                    <div style={{ float: 'right', marginTop: '10px' }}>
                        <div style={{ display: 'inline-block' }} className="header-login" onClick={this.handleLogin}>Login</div>
                        <div style={{ display: 'inline-block' }} className="header-account">Create an account</div>
                    </div>}
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <GoogleLogin
                            clientId="112008387642-186332k8f112grrkffiqgf7a24hbc8l7.apps.googleusercontent.com"
                            buttonText="Continue with Gmail"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        /><br />
                        <FacebookLogin
                            appId="303627837830083"
                            textButton="Continue with Facebook"
                            size="metro"
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            cssClass="btn-md fb"
                            icon="fa-facebook-square"
                        />
                    </div>
                </Modal>
            </div>
        )
    }
}

export default withRouter(Header);















