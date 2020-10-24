import React from "react"
import Superlatives from '../superlatives/superlatives'
import PositiveWords from '../positiveWords/positiveWords'
import NegativeWords from '../negativeWords/negativeWords'
import TriggerWords from '../triggerWords/triggerWords'
import './sentiment.css'

interface Props {
    data: [{[index: string]: any}]
}

const Sentiment: React.FC <Props> = (props) => {
    const data = props.data;
    let allWords: {[index: string]: any} = {};

    //collate all data to one dataset: allWords
    data.map(org => {
        let wordcount: {[index: string]: number} = org.wordcount;

        return (wordcount !== undefined && wordcount !== null) && 
            Object.keys(wordcount).map(word => {
                return allWords[word] ? allWords[word] += wordcount[word] : allWords[word] = wordcount[word]
            })
    })

    return (
        <div className="sentiment-container">
            <div className="sentiment-banner">
                <h2>Today's Sentiment Analysis</h2>
            </div>
            <div className="pos-neg">
                <div className="sent-analysis-item">
                    <h3>Superlatives</h3>
                    <Superlatives allWords={allWords} />
                </div>
                <div className="sent-analysis-item">
                    <h3>Positive Words</h3>
                    <PositiveWords allWords={allWords} />
                </div>
                <div className="sent-analysis-item">
                    <h3>Negative Words</h3>
                    <NegativeWords allWords={allWords} />
                </div>
                <div className="sent-analysis-item">
                    <h3>Trigger or Offensive Words</h3>
                    <TriggerWords allWords={allWords} />
                </div>
            </div>
        </div>
    )
}

export default Sentiment