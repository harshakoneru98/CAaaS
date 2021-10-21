/**
 * We can use pages directory to define bootstrap components (components that actually get rendered to the DOM).
 * We should leverage the components created at src/Views here for better abstraction
 */

import LoginView from '../../src/views/login/login_view';
import Header from '../../src/components/header.component';

function Login() {
    return (
        <div className="App">
            <Header />
            <LoginView />
        </div>
    );
}

export default Login;
