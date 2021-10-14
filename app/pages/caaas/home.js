/**
 * We can use pages directory to define bootstrap components (components that actually get rendered to the DOM).
 * We should leverage the components created at src/Views here for better abstraction
 */

import Main from '../../src/views/home/main';


function Home() {
    return (
        <Main demo="demo prop" />
    )
}

export default Home;
