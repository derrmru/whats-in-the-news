import React from "react"
import './splatter.css'

interface Props {
    data: [{[index: string]: any}]
}

const Splatter: React.FC <Props> = (props) => {
    const data = props.data;
    let allWords: {[index: string]: number} = {};

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

        sortable.map(item => {
            let word = item[0];
            let frequency = item[1];
            return allWords[word] ? allWords[word] = allWords[word] + frequency : allWords[word] = frequency; 
        })

        if (sortedData !== undefined) {
            const orgSource = org.source;
            sortedData[orgSource] = sortable
        }
        return ""
    })

    const handleHover = (allWords: any, item: string, i: number) => {
        let annotation = document.createElement('div');
        annotation.innerHTML = '<div class="annotation">"' + item + '" appears ' + allWords[item] + (allWords[item] === 1 ? ' time ' : ' times ') + ' in the News today.</div>';
        document.getElementById((item + i))?.prepend(annotation)
    }

    const removeAnnotation = (e: any, item: string) => {
        e.target.innerHTML = item

    }

    return (
        <>
        <div className="splatter-banner">
            <h2>Today's News</h2>
        </div>
        <div className="splatter">
            {   
                allWords !== undefined &&
                        Object.keys(allWords).map((item, i) => {
                                const fonts = (allWords[item] * 20) + '%';
                                let top = Math.floor(Math.random() * Math.floor(90));
                                let left: number = Math.floor(Math.random() * Math.floor(100))
                                const zIndex = allWords[item] > 4 ? 500 : 0
                                    return <p 
                                            id={item + i}
                                            key={'word' + item + i} 
                                            style={{fontSize: fonts, top: (top + '%'), left: (left + '%'), zIndex: zIndex}}
                                            className="sized-word"
                                            title={item + ', appears ' + allWords[item] + (allWords[item] === 1 ? ' time ' : ' times ') + ' in the news today'}
                                            onMouseOver={() => allWords[item] > 2 && handleHover(allWords, item, i)}
                                            onMouseLeave={(e) => removeAnnotation(e, item)}
                                            >
                                                {item}
                                            </p>
                        }) 
            }
        </div>
        </>
    )
}

export default Splatter