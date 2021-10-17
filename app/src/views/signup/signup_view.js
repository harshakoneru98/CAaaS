import SignUpComponent from '../../components/signup.component';
import Header from '../../components/header.component';

function SignUpView() {
    return (
        <div className="App">
            <Header />
            <div className="auth-wrapper signup-wrapper">
                <div className="auth-inner signup-inner">
                    <SignUpComponent />
                </div>
                <div className="signup-layout"></div>
            </div>
        </div>
    );
}

export default SignUpView;
