import SignUpView from '../../src/views/signup/signup_view';
import Header from '../../src/components/header.component';

function SignUp() {
    return (
        <div className="App">
            <Header />
            <SignUpView />
        </div>
    );
}

export default SignUp;
