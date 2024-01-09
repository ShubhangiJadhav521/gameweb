import React, { useState, useEffect } from 'react';
import Upi from '../../assets/upi24.png';
import Visa from '../../assets/visa.png';
import bitcoin from '../../assets/bitcoin@2.png';
import Matercard from '../../assets/mastercard.png';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';

function Gamingtable() {
  const [gameData, setgameData] = useState();
  const [loading, setLoading] = useState(true);
  const getGamedata = () => {
    axios
      .get('https://game-app-back.onrender.com/api/games')
      .then((res) => {
        console.log(res.data);
        let GameSortdata = res.data.slice().sort((a, b) => a.displayOrder - b.displayOrder || []) || [];
        // .slice().sort((a, b) =>  b.rating - a.rating)|| []
        setgameData(GameSortdata);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // In case of error, ensure loading is set to false
      });
  };
  useEffect(() => {
    getGamedata();
  }, []);

  return (
    <div>
      <table className="has-icons table table--btable">
        <thead>
          <tr>
            <th className="th-logo"> Gaming APP </th>
            <th className="th-offer"> BONUS </th>
            <th className="th-features"> PAYMENT OPTIONS </th>
            <th className="th-rating"> OUR RATING </th>
            <th className="th-claim"> CLAIM BONUS </th>
          </tr>
        </thead>

        <tbody>
          {loading
            ? /* Show Skeleton while loading */
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="btable-row logo-ribbon-addded">
                  {/* Skeleton for each row */}
                  <td>
                    <Skeleton variant="rectangular" width={100} height={30} />
                  </td>
                  <td>
                    <Skeleton variant="rectangular" width={100} height={30} />
                  </td>
                  <td>
                    <Skeleton variant="rectangular" width={100} height={30} />
                  </td>
                  <td>
                    <Skeleton variant="rectangular" width={100} height={30} />
                  </td>
                  <td>
                    <Skeleton variant="rectangular" width={100} height={30} />
                  </td>
                  {/* ... Add Skeleton components for other cells */}
                </tr>
              ))
            : gameData &&
              gameData.map((item, index) => (
                <tr key={index} className="btable-row  logo-ribbon-addded">
                  <td className="td-logo">
                    <div className="td-c td-logo-c ">
                      <a className="" href={item.getBonusURL} target="_blank" rel="noreferrer">
                        <div className="row-count">
                          <span>{index + 1}</span>
                        </div>
                        {item.ribbontext ? <div className="ribbon-1">{item.ribbontext}</div> : ''}

                        <img src={item.logoURL} alt="D11 logo" className="brand-logo" />
                      </a>
                      <div className="brand-score">
                        <strong>{item.rating}</strong> / 10
                      </div>
                      <div className="star-rating-mobile">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                      </div>
                    </div>
                  </td>
                  <td className="td-offer">
                    <div className="ribon-mobile">BONUS</div>
                    <div className="td-c td-offer-c">
                      <strong>{item.offers}</strong>
                      <div>PLAY IN ALL SPORTS</div>
                    </div>
                    <div className="offer-tc"> UPI & NETBANKING AVAILABLE </div>
                  </td>
                  <td className="td-features">
                    <div className="td-c td-features-c  ">
                      <div className="feature-icon-c">
                        <img
                          title=""
                          data-toggle="tooltip"
                          data-placement="top"
                          data-offset="-10, 35"
                          src={Upi}
                          alt="Upi"
                          className="feature-icon"
                          data-original-title="Upi"
                        />
                      </div>
                      <div className="feature-icon-c">
                        <img
                          title=""
                          data-toggle="tooltip"
                          data-placement="top"
                          data-offset="-10, 35"
                          src={Visa}
                          alt="Visa"
                          className="feature-icon"
                          data-original-title="Visa"
                        />
                      </div>
                      <div className="feature-icon-c">
                        <img
                          title=""
                          data-toggle="tooltip"
                          data-placement="top"
                          data-offset="-10, 35"
                          src={Matercard}
                          alt="MasterCard"
                          className="feature-icon"
                          data-original-title="MasterCard"
                        />
                      </div>
                      <div className="feature-icon-c">
                        <img
                          title=""
                          data-toggle="tooltip"
                          data-placement="top"
                          data-offset="-10, 35"
                          src={bitcoin}
                          alt="Bitcoin"
                          className="feature-icon"
                          data-original-title="Bitcoin"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="td-rating">
                    <div className="td-c td-rating-c" style={{ color: 'black', margin: '10px' }}>
                      <div className="brand-score">
                        <strong>{item.rating}</strong> / 10
                      </div>
                      <div className="star-rating">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                      </div>
                      <div className="rated"> Votes ({item.votes}) </div>
                    </div>
                  </td>

                  <td className="td-claim">
                    <div className="td-c td-claim-c">
                      <div>
                        <a
                          className="btn btn-cta "
                          style={{ color: 'white', textDecoration: 'none' }}
                          href={item.getBonusURL}
                          target="_blank"
                          rel="noreferrer"
                        >
                          GET BONUS{' '}
                        </a>
                      </div>
                      <div style={{ marginTop: '10px' }}>
                        <a className="visit-text " href={item.visitURL} target="_blank" rel="noreferrer">
                          Visit&nbsp;{item.gamename}
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default Gamingtable;
