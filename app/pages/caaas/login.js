/**
 * We can use pages directory to define bootstrap components (components that actually get rendered to the DOM).
 * We should leverage the components created at src/Views here for better abstraction
 */

 import LoginView from '../../src/views/login/login_view';


 function Login() {
     return (
         <LoginView />
     )
 }
 
 export default Login;
 