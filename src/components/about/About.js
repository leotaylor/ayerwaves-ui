import React from 'react';

import './About.css';

class About extends React.Component {

  render () {

    return (
      <div className="aboutDiv">
        <div className="col-sm-6 text-left">
          <div className="aboutus">
            <h1 className="history">AyerWaves History</h1>
            <p className="writing">
            AyerWaves was founded by Joshua Ayers in 2012 as "Josh's Underground".  It started as a radio show on WHAY 98.3FM in Whitley City, Kentucky. The two hour time slot was spent showcasing independent musicians from around the world.<br/>
    In 2015 the first AyerWaves live started as "Josh's Underground Acoustic Summer Concert Series". The event was held at Josh's yard in Oneida, Tennessee. The series consisted of seven concerts on 3 acres of land throughout the summer showcasing touring independent musicians and pairing them with a local performer. By the seventh concert the events were getting to large, so in 2015 Josh met with the owners of the Possum-Trot Western Themed Mountain Resort about bringing his event to their location. The two sides worked out a deal, and the AyerWaves became a small town Music Festival. <br/>
    The 2016 event known as the AyerWaves "1" was held on 46 acres with one stage outside in the town of Possum-Trot. The event had 20 performances over the two days. In 2017 AyerWaves "2"  rapidly expanded to 191 acres with four stages and 58 performances over four days headlined by <a href="http://www.darrellscott.com/" className="rainbow">Darrell Scott</a> and Home Grown Head. AyerWaves "3" was headlined by <a href="https://kellerwilliams.net/" className="rainbow">Keller Williams </a> and <a href="http://theemisunshine.com/" className="rainbow">Emi Sunshine</a>. AyerWaves "4" will surely entertain as the event continues to grow, and moves it primary location to middle Tennessee!<br/>
    AyerWaves Entertainment now helps organize and create for private, corporate, and community events. Joshua spends most of his time booking talent in Tennessee and Kentucky, and keeps a focus on sharing independent artist traveling the country. You can still hear the radio show every Monday night at 7pm EST on WHAY 98.3FM.
            </p>
          </div>
        </div>
        <div className="chairman col-sm-6 offset-sm-3">
          <img className="josh" src={require('../../images/josh.png')} alt="josh"></img>
          <p>Joshua Ayers - Founder/CEO/Chairman</p>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <h1>Press</h1>
            <div className="col-sm-6">
              <img className="mag" src={require('../../images/magcover.jpg')} alt="magcover"></img>
            </div>
            <div className="col-sm-6">
              <img className="mag" src={require('../../images/magin.jpg')} alt="magin"></img>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12'>
            <a href="https://www.ionindiemagazine.com/"><h2>IonIndie Magazine: </h2></a>
            <div className="col-sm-4">
              <img className="ind" src={require('../../images/ho.jpg')} alt="magin"></img>
            </div>
            <div className="col-sm-4">
              <img className="ind" src={require('../../images/suga.jpg')} alt="magin"></img>
            </div>
            <div className="col-sm-4">
              <img className="ind" src={require('../../images/mem.jpg')} alt="magin"></img>
            </div>
          </div>
        </div>
        <footer>
          <p>AyerWaves Entertainment © 2018 All Rights Reserved<br/>
          Contact: ayerwavesmusic@gmail.com<br/>
          </p>
          <p>
          A Sound Farm Events Production<br></br>
            <a href="https://soundfarm.us/">www.soundfarm.us</a>
          </p>
          <div>
            <a href="https://www.facebook.com/AyerWavesMusic/"><i className="fab fa-facebook-f icon"></i></a>
            <a href="https://www.youtube.com/channel/UCbzDiCYcUFJaULli4zTESwQ"><i className="fab fa-youtube icon"></i></a>
            <a href="https://www.instagram.com/ayerwavesmusic"><i className="fab fa-instagram icon"></i></a>
          </div>
        </footer>
      </div>
    );
  }
}

export default About;
