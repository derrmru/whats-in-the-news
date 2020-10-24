import React, { useState } from 'react'
import Calendar from '../calendar/calendar'
import './topicNavigator.css'

interface Props {
    updateSearch: (startDate: Date, endDate: Date, topicWords: [string] | undefined) => void,
    toggleLoading: (bool: boolean) => void
}

const today = new Date();

const TopicNavigator: React.FC<Props> = (props) => {
    const [startDate, setStartDate] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7));
    const [endDate, setEndDate] = useState<Date>(today);
    const [enterWord, setEnterWord] = useState('');
    const [topicWords, setTopicWords] = useState<[string] | undefined>(['Climate']);
    const [refresh, setRefresh] = useState<boolean>(false)

    //update Calendar function, passed as props to calendar component
    const updateCalendar = (calendar: string, date: Date) => {
        calendar === 'startDate' ? setStartDate(date) : setEndDate(date)
    }

    const handleClick = (e: any) => {
        e.preventDefault()
        let topicArr = topicWords;
        let theWord = enterWord;
        //format word so first letter is uppercase and the tail is lowercase
        theWord = theWord.charAt(0).toUpperCase() + theWord.slice(1).toLowerCase();

        topicArr !== undefined ? topicArr.push(theWord) : topicArr = [theWord];

        setTopicWords(topicArr);
        setEnterWord('');
    }

    const removeWord = (word: string) => {
        let topicArr = topicWords;

        topicArr !== undefined && topicArr.splice(topicArr.indexOf(word), 1)

        setTopicWords(topicArr)
        setRefresh(!refresh)
    }

    return (
        <div className="topic-navigator">
            <div className="sticky-topic-nav">

                <h4>Start Date</h4>
                <Calendar
                    name="startDate"
                    date={startDate}
                    updateCalendar={updateCalendar}
                    />

                <h4>End Date</h4>
                <Calendar
                    name="endDate"
                    date={endDate}
                    updateCalendar={updateCalendar}
                    />

                <hr />

                <h4>Create Your Topic</h4>
                <form>
                    <input 
                        type="text" 
                        value={enterWord} 
                        onChange={(e) => setEnterWord(e.target.value)} 
                        placeholder="Enter a Word" />

                    <button
                        onClick={(e) => handleClick(e)}>
                            Add to Topic
                    </button>
                </form>

                <div className="the-topic">
                    {(topicWords !== undefined && topicWords.length > 0) && 'Your Topic:'}
                    <ul>
                        {topicWords !== undefined && topicWords.map((word, i) => {
                            return <li 
                                        key={'topicWord' + i}
                                        value={word}
                                        onClick={() => removeWord(word)}>
                                            |x| - {word}
                                        </li>
                        })}
                    </ul>
                    <button
                        className="run-button"
                        onClick={(e) => {e.preventDefault(); props.updateSearch(startDate, endDate, topicWords); props.toggleLoading(true);}}
                        >
                        UPDATE
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TopicNavigator