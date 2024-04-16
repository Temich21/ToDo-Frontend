import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ToDoDataResponse } from '../../models/ToDoData';
import correctColorSetting from '../../utils/correctColorSetting';

const localizer = momentLocalizer(moment)

interface Event extends ToDoDataResponse {
    title: string
    start: Date
    end: Date
    priority: number
}

const CalendarComponent = ({ todos, handleEventClick }: { todos: ToDoDataResponse[], handleEventClick: (todo: ToDoDataResponse) => void }) => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const transformedEvents = todos.map((todo: any) => ({
            ...todo,
            title: todo.title,
            start: moment(todo.deadline).toDate(),
            end: moment(todo.deadline).toDate(),
        }));

        setEvents(transformedEvents);
    }, [todos])

    const eventStyleGetter = (event: Event) => {
        const style = {
            backgroundColor: correctColorSetting(event.priority),
            color: 'white',
            borderRadius: '0px',
            border: 'none',
            cursor: 'pointer',
        };

        return {
            style: style
        }
    }


    return (
        <section className="flex justify-center">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ width: 1000, height: 500 }}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={handleEventClick}
                formats={{ timeGutterFormat: 'HH:mm' }}
            />
        </section>

    );
}

export default CalendarComponent