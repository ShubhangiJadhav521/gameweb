import React from 'react';
// import "./home.css";
import Inflag from "../../assets/inflag.png";
import Payout from "../../assets/15-payout.png";
import Review from "../../assets/trusted-reviews_yellow-2.png";
import Gamingtable from './Gamingtable';
import '../../assets/bootstrap.min.css'
import '../../assets/styles.css'
import '../../assets/css2.css'
import '../../assets/custom.css'
import '../../assets/custom-2.css'
import '../../assets/queries.css'
import '../../assets/new.css'

function Home() {

    return (

        <div id="page" className="site">

            <div id="content" className="site-content">
                <div id="primary" className="content-area">
                    <div className="container">
                        <div className="inner-body">

                            <div className="section section--welcome">
                                <div className="section-inner ">
                                    <h1 className="main-heading">
                                        BEST INDIAN ONLINE Gaming OFFERS <br />
                                        FOR 2023{" "}
                                    </h1>
                                    <div className="welcome-content-desktop">
                                        <p style={{ textAlign: "center" }}>
                                            <strong>
                                                Looking for the best online Gaming in India? We’ve got you
                                                covered.
                                            </strong>{" "}
                                            Our team of experts spend hours testing and reviewing every site out
                                            there, saving you the hard work. We are constantly updating our
                                            database so you have access to accurate information about the best
                                            new Gaming sites around!
                                        </p>
                                    </div>
                                    <div className="welcome-content-mobile" />
                                    <div className="top-mobile">
                                        <div className="icons-strip-c">
                                            <div className="icons-strip">
                                                <div className="icon-s-c">
                                                    <img src={Inflag} alt="" className="icon-s" /> INDIA
                                                    ACCEPTED
                                                </div>
                                                <div className="icon-s-c">
                                                    <img src={Payout} alt="" className="icon-s" />{" "}
                                                    FAST PAYOUTS 24/7
                                                </div>
                                                <div className="icon-s-c">
                                                    <img
                                                        src={Review}
                                                        alt=""
                                                        className="icon-s"
                                                    />{" "}
                                                    FULLY LICENSED
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tc-table" />
                                    </div>
                                </div>
                            </div>

                            <div className="section section--btable">
                                <div className="top-desktop" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div className="tc-table" />
                                    <div className="icons-strip-c">
                                        <div className="icons-strip">
                                            <div className="icon-s-c">
                                                <img src={Inflag} alt="" className="icon-s" /> INDIA
                                                ACCEPTED
                                            </div>
                                            <div className="icon-s-c">
                                                <img src={Payout} alt="" className="icon-s" /> FAST
                                                PAYOUTS 24/7
                                            </div>
                                            <div className="icon-s-c">
                                                <img
                                                    src={Review}
                                                    alt=""
                                                    className="icon-s"
                                                />{" "}
                                                FULLY LICENSED
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Gamingtable />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home