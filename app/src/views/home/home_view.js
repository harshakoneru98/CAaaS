import home from '../../../public/assets/images/home.jpeg';
import Visualization1 from './visualization_1';
import Visualization2 from './visualization_2';
import Visualization3 from './visualization_3';
import Visualization4 from './visualization_4';

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
                                99% of hypertension and stroke instances were
                                detected by a simple screening using the model –
                                <b> McKinsey</b>
                            </p>
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

                    <hr className="hr-padding" />

                    <div className="row">
                        <div className="col-md-6 visualization1">
                            <Visualization1 />
                        </div>
                        <div className="col-md-6 visual-explain">
                            <h4>
                                How Is Smoking Related to Heart Disease and
                                Stroke?
                            </h4>
                            <p>
                                Smoking is a major cause of cardiovascular
                                disease (CVD) and causes one of every four
                                deaths from CVD. Smoking can:
                            </p>
                            <ul>
                                <li>Lower “good” cholesterol (HDL).</li>
                                <li>
                                    Make blood sticky and more likely to clot,
                                    which can block blood flow to the heart and
                                    brain.
                                </li>
                                <li>
                                    Increase the buildup of plaque (fat,
                                    cholesterol, calcium, and other substances)
                                    in blood vessels.
                                </li>
                                <li>
                                    Cause thickening and narrowing of blood
                                    vessels.
                                </li>
                            </ul>
                            <b>Source: </b>
                            <br />
                            <a
                                href="https://www.cdc.gov/tobacco/campaign/tips/diseases/heart-disease-stroke.html"
                                target="_blank"
                            >
                                https://www.cdc.gov/tobacco/campaign/tips/diseases/heart-disease-stroke.html
                            </a>
                        </div>
                    </div>

                    <hr className="hr-padding" />

                    <div className="row">
                        <div className="col-md-6 visual-explain">
                            <p>
                                The risk of having CVD increases with age, the
                                incidence doubling with each decade after the
                                age of 45 years and over 70% of all strokes
                                occur above the age of 65.
                            </p>
                            <p>
                                The overall lifetime risk for stroke in men has
                                been calculated to be 1 in 6 and 1 in 5 for
                                women, men having higher rates in younger years
                                and women in older ages.
                            </p>

                            <b>Source: </b>
                            <br />
                            <a
                                href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3006180/"
                                target="_blank"
                            >
                                https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3006180/
                            </a>
                        </div>
                        <div className="col-md-6 visualization2">
                            <Visualization2 />
                        </div>
                    </div>

                    <hr className="hr-padding" />

                    <div className="row">
                        <div className="col-md-6 visualization3">
                            <Visualization3 />
                        </div>
                        <div className="col-md-6 visual-explain">
                            <p>
                                Heart disease is the leading cause of death for
                                men, women, and people of most racial and ethnic
                                groups in the United States followed by Cancer
                                and cerebrovascular diseases.
                            </p>
                            <ul>
                                <li>
                                    One person dies every 36 seconds in the
                                    United States from cardiovascular disease.
                                </li>
                                <li>
                                    About 659,000 people in the United States
                                    die from heart disease each year—that’s 1 in
                                    every 4 deaths.
                                </li>
                            </ul>

                            <b>Source: </b>
                            <br />
                            <a
                                href="https://www.cdc.gov/heartdisease/facts.htm"
                                target="_blank"
                            >
                                https://www.cdc.gov/heartdisease/facts.htm
                            </a>
                        </div>
                    </div>

                    <hr className="hr-padding" />

                    <div className="row">
                        <div className="col-md-6 visual-explain">
                            <p>
                                The bar plot represents the top 15 states in the
                                United States of America with the highest stroke
                                mortality rates for the year 2019.{' '}
                            </p>
                            <b>Note: </b>
                            <br />
                            <p>
                                Although adjusted for differences in
                                age-distribution and population size, rankings
                                by state do not take into account other state
                                specific population characteristics that may
                                affect the level of mortality.
                            </p>

                            <b>Source: </b>
                            <br />
                            <a
                                href="https://www.cdc.gov/nchs/pressroom/sosmap/heart_disease_mortality/heart_disease.htm"
                                target="_blank"
                            >
                                https://www.cdc.gov/nchs/pressroom/sosmap/heart_disease_mortality/heart_disease.htm
                            </a>
                        </div>
                        <div className="col-md-6 visualization4">
                            <Visualization4 />
                        </div>
                    </div>

                    <hr className="hr-padding" />

                    <div className="row preventions">
                        <div className="col-md-8 offset-md-2 preventions-text">
                            <h3>
                                How Can Heart Disease and Stroke Be Prevented?
                            </h3>
                            <p>
                                A good place to start is with the ABCS of heart
                                health:
                            </p>
                            <ul>
                                <li>
                                    <b>Aspirin: </b>
                                    Aspirin may help reduce your risk for heart
                                    disease and stroke. But do not take aspirin
                                    if you think you are having a stroke. It can
                                    make some types of stroke worse. Before
                                    taking aspirin, talk to your doctor about
                                    whether aspirin is right for you.
                                </li>
                                <li>
                                    <b>Blood pressure: </b>
                                    Control your blood pressure.
                                </li>
                                <li>
                                    <b>Cholesterol: </b>
                                    Manage your cholesterol.
                                </li>
                                <li>
                                    <b>Smoking: </b>
                                    Quit smoking, or don’t start.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeView;
