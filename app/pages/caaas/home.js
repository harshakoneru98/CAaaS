/**
 * We can use pages directory to define bootstrap components (components that actually get rendered to the DOM).
 * We should leverage the components created at src/Views here for better abstraction
 */

import HomeView from '../../src/views/home/home_view';
import MainHeader from '../../src/components/mainHeader.component';

function Home() {
    return (
        <div className="App">
            <MainHeader />
            <HomeView />
        </div>
    );
}

export default Home;
