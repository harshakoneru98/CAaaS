import LoginComponent from '../../components/login.component';
import Header from '../../components/header.component';

function LoginView() {
    return (
        <div className="App">
            <Header />
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <LoginComponent />
                </div>
            </div>
        </div>
    );
}

export default LoginView;
