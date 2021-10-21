import SignUpComponent from '../../components/signup.component';

function SignUpView() {
    return (
        <div className="auth-wrapper signup-wrapper">
            <div className="auth-inner signup-inner">
                <SignUpComponent />
            </div>
            <div className="signup-layout"></div>
        </div>
    );
}

export default SignUpView;
