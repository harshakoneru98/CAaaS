/**
 * We can use pages directory to define bootstrap components (components that actually get rendered to the DOM).
 * We should leverage the components created at src/Views here for better abstraction
 */

import HomeView from '../../src/views/home/home_view';


function Home() {
    return (
        <HomeView demo="demo prop" />
    )
}

export default Home;
