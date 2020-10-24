import React from "react"
import tools from '../../functions/tools'
import './superlatives.css'

interface Props {
    allWords: {[index: string]: any};
}

const Superlatives: React.FC <Props> = (props) => {
    let allWords = props.allWords;
    let superlatives: {[index: string]: any} = {};
    let totalWords = 0;
    let totalSuperlatives = 0;

    //find superlatives
    Object.keys(allWords).map(word => {
        totalWords += allWords[word]
        return tools.isSuperlative(word) && (
                totalSuperlatives += allWords[word],
                superlatives[word] = allWords[word]
            )
    })

    //sort with highest at the top
    let sortable = [];
    for (let word in superlatives) {
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
                    Superlatives make up {(totalSuperlatives / totalWords * 100).toFixed(2)}% of todays News
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

export default Superlatives