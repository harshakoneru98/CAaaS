import LoginComponent from '../../components/login.component';

function LoginView() {
    return (
        <div className="auth-wrapper">
            <div className="auth-inner signin-inner">
                <LoginComponent />
            </div>
        </div>
    );
}

export default LoginView;
