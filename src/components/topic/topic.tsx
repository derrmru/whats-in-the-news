import React, { useState, useEffect } from 'react'
import TopicNavigator from '../topicNavigator/topicNavigator'
import TopicVisual from '../topicVisual/topicVisual'
import './topic.css'

const Topic: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<any>();
    const [topic, setTopic] = useState<[string] | undefined>(['Climate']);
    const [refresh, setRefresh] = useState<boolean>(false)

    const toggleLoading = (bool: boolean) => {
        setLoading(bool)
    }

    const updateSearch = async (startDate: Date, endDate: Date, topicWords: [string] | undefined) => {

        //reset state
        setResult(undefined)
        console.log('crash')

        let url: string = 'https://resonant-gorgeous-pearl.glitch.me/datasearch/';

        //POST THE START AND END DATE PARAMETERS TO 
        await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                                    startDate: startDate.toISOString().split('T')[0], 
                                    endDate: endDate.toISOString().split('T')[0]
                                })
        })
        .then(response => response.json())
        .then(d => {
            console.log(d)
            setTopic(topicWords)
            setResult(d)
            setLoading(false)
            setRefresh(!refresh)
        })
    }

    useEffect(() => {
        const today = new Date();
        (result === undefined && loading === true) && updateSearch(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7), new Date(), topic)
    })

    return (
        <div className="topic-container">
            <div className="topic-banner">
                <h2>Create a Topic</h2>
            </div>

            <div className="topic-body">
                <TopicNavigator 
                    updateSearch={updateSearch}
                    toggleLoading={toggleLoading}
                    />

                <TopicVisual 
                    key={result}
                    loading={loading}
                    result={result}
                    topic={topic}
                    />
            </div>

        </div>
    )
}

export default Topic