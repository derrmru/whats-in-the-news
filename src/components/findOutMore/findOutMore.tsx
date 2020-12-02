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
                        <p>Is the News bad for you?</p>
                        <p>What kinds of ideas am I exposed to in the News?</p>
                        <p>Is the News biased?</p>
                        <p>Is the News too negative?</p>
                        <p>The above is a set of statistical tools to help answer these kinds of questions. This is a Proof Of Concept and would require considerably more data to provide any sort of final or comprehensive view on the subject.</p>
                        <h3>About the data</h3>
                        <p>The data sources are four of the biggest News organisations, the CNN, the BBC, AlJazeera and Euro News. Textual data is scraped from these sources and visualised into meaningful categorisations and patterns.</p>
                        <p>Sentiment analysis categories are identified by crosschecking word lists written by others. These lists are collected by third parties and are not moderated or curated for or by this project.</p>
                        <p>The top 20 words section does filter common 'neutral' words, which can be viewed via the <a href="https://github.com/derrmru/scrape-the-news/blob/master/functions/methods.js">repository</a>.</p>
                        <h3>Questions</h3>
                        <p>If you have any questions about this project, get in touch:</p>
                        <p><a href="https://thepetersweeney.com" target="_blank" rel="no-referrer">thepetersweeney.com</a></p>
                    </div> : 
                        <div style={{textDecoration: 'underline'}}>Find Out More</div>
            }
        </div>
    )
}

export default FindOutMore