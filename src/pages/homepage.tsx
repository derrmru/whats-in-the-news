import React, { useState, useEffect } from 'react';
import OrgBars from '../components/orgBars/orgBars';
import Splatter from '../components/splatter/splatter';
import Sentiment from '../components/sentiment/sentiment';
import Topic from '../components/topic/topic';
import Footer from '../components/footer/footer';
import FindOutMore from '../components/findOutMore/findOutMore';
import WakingUp from '../components/WakingUp/WakingUp';
import './homepage.css';

const Homepage: React.FC = () => {
  const [data, setData] = useState<[{[index: string]: any}]>([{}]);
  const [loading, setLoading] = useState(true);

  const fetchURL = async () => {
    await fetch('https://words-news-scraper.herokuapp.com/')
        .then(response => response.json())
        .then(d => {
          console.log(d)
          setData(d)
          setLoading(false)
        })
        .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchURL();
  }, [])

  return (
    <div className="Homepage">
      {//While server is waking up waking up overlay shows
        loading && <WakingUp />
      }

      {
        data !== [{}] && 
        <>
        <Splatter 
          data={data} 
          />

        <OrgBars 
          data={data} 
          />

        <Sentiment 
          data={data} 
          />
          
        <Topic />
        </>
      }
        <FindOutMore />
        <Footer />
    </div>
  );
}

export default Homepage;
