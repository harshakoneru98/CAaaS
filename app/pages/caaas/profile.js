import ProfileView from '../../src/views/profile/profile_view';
import MainHeader from '../../src/components/mainHeader.component';

function Home() {
    return (
        <div className="App">
            <MainHeader />
            <ProfileView />
        </div>
    );
}

export default Home;
