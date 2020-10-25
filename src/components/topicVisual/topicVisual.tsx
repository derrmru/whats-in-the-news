import React, { useState, useRef, useLayoutEffect } from 'react'
import './topicVisual.css'

interface Props {
    loading: boolean,
    result: [{[index: string]: any}] | undefined,
    topic: [string] | undefined
}

const TopicVisual: React.FC <Props> = (props) => {
    const result = props.result;
    const topic = props.topic;
    const [frequencyArr, setFrequencyArr] = useState<{[index: string]: number}>({});
    const totalTopic = useRef(0);

    //variables to be used in barheight calculation
    const [largest, setLargest] = useState(0);
    let unit = 400 / largest;

    //aggregate topic words from each document
    let tempArr: any = {};
    const topicOverTime = () => {
        (result !== undefined && topic !== undefined) && result.map((doc) => {
            console.log('bang')
            const wordcount: any = doc.wordcount;
            let topicCount = 0;
            let otherCount = 0;
            topic !== undefined && Object.keys(wordcount).map(word => {
                return topic.indexOf(word) >= 0 ? 
                    topicCount = topicCount + Number(wordcount[word]) :
                        otherCount = otherCount + Number(wordcount[word])
            })
            tempArr = frequencyArr;
            return tempArr !== undefined && tempArr[doc.scrape_date] ? 
                tempArr[doc.scrape_date] = tempArr[doc.scrape_date] + (topicCount / otherCount * 100) : 
                    tempArr[doc.scrape_date] = (topicCount / otherCount * 100);
        })
        setFrequencyArr(tempArr)
    }

    useLayoutEffect(() => {
        (result !== undefined && topic !== undefined) && topicOverTime();
        totalTopic.current = 0;
        Object.values(frequencyArr).map(num => {
            return totalTopic.current += num
        })
        console.log(totalTopic.current)
    })

    return (
        <div className="scatter-container">
            <h3>Relative Topic Dominance Over Time</h3>
            {
                props.loading ?
                        <div className="loading-icon">
                            Loading...
                        </div> : <>
                                    <div className="graph-top">
                                        <div className="y-axis">
                                            <p>Aggregate Percentage of News</p>
                                            <br />
                                        </div>

                                        <div className="graph">
                                            {Object.values(frequencyArr).map((value, i) => {
                                                if (value > largest) { setLargest(value) };
                                                return (
                                                    <div 
                                                        key={'datapoint' + i}
                                                        className="datapoint"
                                                        title={value.toString()}
                                                        style={{marginBottom: (Math.round(value * unit) + 'px')}}
                                                        >
                                                        </div>
                                                )
                                            })

                                            }
                                        </div>
                                        
                                        <div className="x-axis">
                                            {Object.keys(frequencyArr).map((date, i) => {
                                                return <div
                                                    key={"date" + i}
                                                    className="date-text"
                                                    >
                                                        {date}
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </>
            }
        </div>
    )
}

export default TopicVisual