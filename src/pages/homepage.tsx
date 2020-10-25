import React, { useState, useEffect, useRef } from 'react';
import OrgBars from '../components/orgBars/orgBars';
import Splatter from '../components/splatter/splatter';
import Sentiment from '../components/sentiment/sentiment';
import Topic from '../components/topic/topic';
import Footer from '../components/footer/footer';
import FindOutMore from '../components/findOutMore/findOutMore';
import './homepage.css';

const Homepage: React.FC = () => {
  const [data, setData] = useState<[{[index: string]: any}]>([{}]);
  const noRenders = useRef(0);

  useEffect(() => {

    //IMPORT THE DATA AT ROOT COMPONENT
      fetch('https://resonant-gorgeous-pearl.glitch.me')
        .then(response => response.json())
        .then(d => {
          console.log(d)
          setData(d)
        })
        noRenders.current += 1;
        console.log(noRenders.current)
  })

  return (
    <div className="Homepage">
      {
        data !== [{}] && 
        <>
        <Splatter key={'splatter' + noRenders.current} data={data} />
        <OrgBars key={'orgbars' + noRenders.current}  data={data} />
        <Sentiment key={'sentiment' + noRenders.current}  data={data} />
        <Topic />
        </>
      }
        <FindOutMore />
        <Footer />
    </div>
  );
}

export default Homepage;
