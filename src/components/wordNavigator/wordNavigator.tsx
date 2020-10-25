import React from "react"
import './wordNavigator.css'

interface Props {
    showWord: string,
    showFrequency: [[string, number]]
}

const WordNavigator: React.FC <Props> = (props) => {
    return (
        <div className="word-navigator">
            <div className="sticky-word-nav">
                <h2>Today's Top 20 Words</h2>
                <div className="current-word">
                    <h3 className="frequency-title">{props.showWord}</h3>
                </div>
                <div className="current-word-list">
                    <h3>Frequency:</h3>
                    <ul>
                    {
                        props.showFrequency.map((arr, i) => {
                            return i !== 0 && <li key={'sharedWord' + i}>{arr[0]}: {arr[1]}</li>
                        })
                    }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default WordNavigator