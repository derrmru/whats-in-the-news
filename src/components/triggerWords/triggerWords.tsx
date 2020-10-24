import React from 'react'
import tools from '../../functions/tools'
import './triggerWords.css'

interface Props {
    allWords: {[index: string]: any};
}

const TriggerWords: React.FC <Props> = (props) => {
    const allWords = props.allWords;
    let triggerWords: {[index: string]: number} = {};
    let totalWords = 0;
    let totalTriggerWords = 0;

    //find negative words
    Object.keys(allWords).map(word => {
        totalWords += allWords[word]
        return tools.isATrigger(word) && (
                totalTriggerWords += allWords[word],
                triggerWords[word] = allWords[word]
            )
    })

    //sort with highest at the top
    let sortable = [];
    for (let word in triggerWords) {
        sortable.push([word, allWords[word]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    return (
        <div>
            <div 
                className="average-title"
                >
                    Negative Words make up {(totalTriggerWords / totalWords * 100).toFixed(2)}% of todays News
                </div>

            {sortable.map((word, i) => {
                return  <div key={'superlative' + i} className="word-row">
                            <div>{word[0]}</div>
                            <div>{word[1]}</div>
                        </div>
            })}
        </div>
    )
}

export default TriggerWords