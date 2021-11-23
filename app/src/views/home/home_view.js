import home from '../../../public/assets/images/home.jpeg';
import Visualisation1 from './visualisation_1';

function HomeView() {
    return (
        <div className="home-container">
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <p className="first-p">
                                Medical diagnosis is a category of medical tests
                                designed for disease or infection detection.
                                Machine learning in this field will improve
                                patient’s diagnosis with minimum costs and high
                                accuracies.
                            </p>
                            <p>
                                Use cases of Machine learning are making
                                near-perfect diagnoses, recommend best medicines
                                and identify high-risk patients.
                            </p>
                            <p>
                                These predictions are based on the past dataset
                                of anonymized patient records and symptoms
                                exhibited by a patient. Which make diagnosis
                                easy for patients, doctors, and researchers.
                            </p>
                            <hr />
                            <p>
                                70% of global severe cardiovascular disease
                                casualties occur in low and middle income
                                countries – <b>WHO</b>
                            </p>
                            <p>
                                The annual median total medical costs for heart
                                failure cure are estimated at $24,383 per
                                patient in United States translating to $351
                                Billion per year – <b>CDC</b>
                            </p>
                        </div>
                        <div className="col-md-6">
                            <img src={home.src} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Visualisation1 name="visual1" />
                        </div>
                        <div className="col-md-6">
                            <Visualisation1 name="visual2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeView;
