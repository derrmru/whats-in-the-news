import React, { useState, useEffect } from 'react';
import OrgBars from '../components/orgBars/orgBars';
import Splatter from '../components/splatter/splatter';
import Sentiment from '../components/sentiment/sentiment';
import Topic from '../components/topic/topic';
import Footer from '../components/footer/footer';
import FindOutMore from '../components/findOutMore/findOutMore';
import './homepage.css';

const Homepage: React.FC = () => {
  const [data, setData] = useState<[{[index: string]: any}]>([{}]);

  useEffect(() => {

    //IMPORT THE DATA AT ROOT COMPONENT
      fetch('http://localhost:8000')
        .then(response => response.json())
        .then(d => {
          console.log(d)
          setData(d)
        })

  })

  return (
    <div className="Homepage">
      {
        data !== [{}] && 
        <>
        <Splatter data={data} />
        <OrgBars data={data} />
        <Sentiment data={data} />
        <Topic />
        </>
      }
        <FindOutMore />
        <Footer />
    </div>
  );
}

export default Homepage;
