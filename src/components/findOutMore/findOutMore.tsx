import React, { useState } from 'react'
import './findOutMore.css'

const FindOutMore: React.FC = () => {
    const [showFOM, setShowFOM] = useState<boolean>(false);

    return (
        <div 
            className="find-out-more"
            style={showFOM ? {backgroundColor: 'var(--the-white)', color: 'var(--main-color)'} : {}}
            onClick={() => setShowFOM(!showFOM)}
            >
            {
                showFOM ? 
                    <div className="main-text">
                        <div className="exit-button">|x|</div>
                        <h2>About</h2>
                        <p>Is the News bad for you? What kinds of ideas am I exposed to in the News? Is the News biased? Is the News too negative?</p>
                        <p>The above is a set of statistical tools to help answer these kinds of questions. This is a Proof Of Concept and requires considerably more data to provide any kind of comprehensive answer to these questions.</p>
                        <h3>About the data</h3>
                        <p>The data sources are four of the biggest News organisations. Textual data is scraped from these sources and visualised into meaningful categorisations.</p>
                        <p>Sentiment analysis categories are identified by crosschecking word lists written by others. These are not moderated or curated for this project.</p>
                    </div> : 
                        <div style={{textDecoration: 'underline'}}>Find Out More</div>
            }
        </div>
    )
}

export default FindOutMore