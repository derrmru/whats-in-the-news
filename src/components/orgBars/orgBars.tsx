import React, { useState } from "react"
import WordNavigator from '../wordNavigator/wordNavigator'
import './orgBars.css'

interface Props {
    data: [{[index: string]: any}]
}

const OrgPies: React.FC <Props> = (props) => {
    const [showWord, setShowWord] = useState<string>("");
    const [showFrequency, setShowFrequency] = useState<[[string, number]]>([['first', 0]]) //currently initiated value and ignored when list is mapped out, sort out types so this isn't required in future

    const data = props.data;
    
    //calculate total words by organisation
    const wordTotalByOrg: {[index: string]: number} = {};
    data.map(org => {
        const wordcount = org.wordcount;
        return wordcount === null ? //IF wordcount is not null or undefined, iterate through orgs to calculate total words
                    null : wordcount === undefined ?
                        undefined : Object.keys(wordcount).map((word) => {
                            const key = org.source
                        return wordTotalByOrg[key] ? 
                            wordTotalByOrg[key] = wordTotalByOrg[key] + wordcount[word] : 
                            wordTotalByOrg[key] = wordcount[word];
        })
    })

    //sort each orgs wordcount
    let sortedData: {[index: string]: any[][]} = {};
    data.map(org => {
        const wordcount = org.wordcount;
        
        let sortable = [];
        for (let word in wordcount) {
            sortable.push([word, wordcount[word]]);
        }

        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });

        if (sortedData !== undefined) {
            const orgSource = org.source;
            sortedData[orgSource] = sortable
        }
        return ""
    })

    //keep selection in WordNavigator component
    const handleClick = (item: [string, number]) => {
        setShowWord(item[0])

        let sharedFrequency: [[string, number]] = [['first', 0]];
        Object.keys(sortedData).map(org => {
            for (let i = 0; i < 20; i++) {
                sortedData[org][i][0] === item[0] && sharedFrequency.push([org, sortedData[org][i][1]])
            }
            return ""
        })

        setShowFrequency(sharedFrequency)
    }

    return (
        <div className="bar-row-container">

            <WordNavigator 
                showWord={showWord}
                showFrequency={showFrequency}
                />


            <div className="bar-row">
            {
                Object.keys(sortedData).map((org, h) => {//iterate through news organisations datasets for today
                const wordcount = sortedData[org];//filter to wordcount object
                    return wordcount === null ? //IF wordcount is not null or undefined, return contents
                    null : wordcount === undefined ?
                        undefined : 
                        <div key={'org' + h} className="bar-container">
                            <h3>{org}</h3>{/*ORG TITLE*/}
                            <div className="bars">
                            {
                                wordcount.map((item: any, i) => {
                                    i++
                                    while (i <= 20) {
                                        const wordHeight = (228 - (228 / ((item[1] / 2) + 1))) + 'px';
                                        const wordWidth = (100 / 20) + "%";
                                        let sharedColor;
                                        if (item[0] === showWord) {
                                            sharedColor = "var(--second-color)"
                                        } else {
                                            sharedColor = "";
                                        }
                                        return (
                                            <div 
                                                className="word-bar" 
                                                key={'word' + i} 
                                                style={{height: wordHeight, width: wordWidth, backgroundColor: sharedColor}} 
                                                title={item[0] + ': ' + item[1]}
                                                onClick={() => handleClick(item)}
                                                onMouseOver={() => handleClick(item)}
                                                >
                                                </div>
                                        )
                                    }
                                    return ""
                                })
                            }
                            </div>
                        </div>
                })
            }
            </div>


        </div>
    )
}

export default OrgPies