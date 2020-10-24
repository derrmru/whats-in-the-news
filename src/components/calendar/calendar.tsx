import React, { useState } from 'react'
import './calendar.css'

interface Props {
    name: string,
    date: Date,
    updateCalendar: (calendar: string, date: Date) => void
}

//array of months for calendar UI
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//functional return of number of days in currently selected month - these are mapped out in the Calendar component
const monthDays = (currentMonth: number, currentYear: number) => {
    const limit: number = new Date(currentYear, currentMonth + 1, 0).getDate();
    let returnArr = [];
    for (let i = 1; i <= limit; i++) {
        returnArr.push(i)
    }
    return returnArr
}

const Calendar: React.FC <Props> = (props) => {
    const date = props.date;
    const [toggleCalendar, setToggleCalendar] = useState<boolean>(false);
    const [currentMonth, setCurrentMonth] = useState<number>(date.getMonth());
    const [currentYear, setCurrentYear] = useState<number>(date.getFullYear());

    //if incrementing through months take start and end of years into account
    const setCurrent = (num: number) => {
        if (num === 1) {
            if (currentMonth === 11) {
                setCurrentMonth(0)
                setCurrentYear(currentYear + 1)
            } else {
                setCurrentMonth(currentMonth + num)
            }
        }

        if (num === -1) {
            if (currentMonth === 0) {
                setCurrentMonth(11)
                setCurrentYear(currentYear - 1)
            } else {
                setCurrentMonth(currentMonth + num)
            }
        }
    }

    return (
        <div className="calendar">
            
            <input 
                className="calendar-field"
                value={date.toDateString()} 
                onClick={() => setToggleCalendar(!toggleCalendar)}
                readOnly
                />

            {
                toggleCalendar &&
                    <div className="cal-ui-container">
                        <div className="exit-container">
                            <button
                                className="exit-cal"
                                onClick={() => setToggleCalendar(!toggleCalendar)}
                                >
                                |X|
                            </button>
                        </div>
                        <hr />
                        <div className="cal-header">
                            <button
                                onClick={() => setCurrent(-1)}
                                >
                                -
                            </button>
                            
                            <div>{months[currentMonth] + ' ' + currentYear}</div>
                            
                            <button
                                onClick={() => setCurrent(1)}
                                >
                                +
                            </button>
                        </div>
                        <hr />
                        <div className="cal-days">
                            {
                                monthDays(currentMonth, currentYear).map((day, i) => {
                                    return <div 
                                                className="day"
                                                key={'day' + i}
                                                onClick={() => props.updateCalendar(props.name, new Date(currentYear, currentMonth, day))}
                                                style={ (day === date.getDate() && currentMonth === date.getMonth()) ? 
                                                            {backgroundColor: 'var(--the-white)', color: 'black'} : 
                                                                new Date(currentYear, currentMonth, day) > new Date() ?
                                                                    {color: '#999', backgroundColor: 'white', cursor: 'default'} :
                                                                    {width: '14%'}}
                                                >
                                                    {day}
                                                </div>
                                })   
                            }
                        </div>
                    </div>
            }
        
        </div>
    )
}

export default Calendar