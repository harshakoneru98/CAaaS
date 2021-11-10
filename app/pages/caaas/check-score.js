import ScoreView from '../../src/views/score/check_score_view';
import MainHeader from '../../src/components/mainHeader.component';

function Home() {
    return (
        <div className="App">
            <MainHeader />
            <ScoreView />
        </div>
    );
}

export default Home;
