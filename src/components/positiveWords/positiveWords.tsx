import React from 'react'
import tools from '../../functions/tools'
import './positiveWords.css'

interface Props {
    allWords: {[index: string]: any};
}

const PositiveWords: React.FC <Props> = (props) => {
    const allWords = props.allWords;
    let positiveWords: {[index: string]: number} = {};
    let totalWords = 0;
    let totalPositiveWords = 0;

    //find positive words
    Object.keys(allWords).map(word => {
        totalWords += allWords[word]
        return tools.isPositive(word) && (
                totalPositiveWords += allWords[word],
                positiveWords[word] = allWords[word]
            )
    })

    //sort with highest at the top
    let sortable = [];
    for (let word in positiveWords) {
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
                    Positive Words make up {(totalPositiveWords / totalWords * 100).toFixed(2)}% of todays News
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

export default PositiveWords