import React from "react"
import tools from "../../functions/tools"
import './negativeWords.css'

interface Props {
    allWords: {[index: string]: any};
}

const NegativeWords: React.FC <Props> = (props) => {
    const allWords = props.allWords;
    let negativeWords: {[index: string]: number} = {};
    let totalWords = 0;
    let totalNegativeWords = 0;

    //find negative words
    Object.keys(allWords).map(word => {
        totalWords += allWords[word]
        return tools.isNegative(word) && (
                totalNegativeWords += allWords[word],
                negativeWords[word] = allWords[word]
            )
    })

    //sort with highest at the top
    let sortable = [];
    for (let word in negativeWords) {
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
                    Negative Words make up {(totalNegativeWords / totalWords * 100).toFixed(2)}% of todays News
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

export default NegativeWords