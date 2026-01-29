"use client";

import * as React from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import styles from './wizard.module.css';
import { Calendar } from '../ui/calendar';
import { Dispatch } from 'react';

type Props = {
    setDate: Dispatch<React.SetStateAction<DateRange | undefined>>
    date: DateRange | undefined
};

export default function Dates({ setDate, date }: Props): React.JSX.Element {

    return (
        <div className={ styles.field }>
            <label className={ styles.label }>Travel dates</label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="justify-start bg-white text-black hover:bg-gray-100">
                        { date?.from ? (date.to ? `${format(date.from, 'LLL dd, y')} - ${format(date.to, 'LLL dd, y')}` : format(date.from, 'LLL dd, y')) : 'Pick dates' }
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <div>
                        <Calendar mode="range" required={ false } selected={ date } onSelect={ setDate } numberOfMonths={ 2 } disabled={ { before: new Date() } } />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
