"use client";

import React, { JSX, useState } from 'react';
import { useRouter } from 'next/navigation';
import Destination from './Destination';
import Dates from './Dates';
import styles from './wizard.module.css';
import { DateRange } from 'react-day-picker';
import { useTripPlanner } from '@/hooks/useTripPlanner';
import { Button } from '../ui/button';

export default function Wizard(): JSX.Element {
    const [step, setStep] = useState<number>(0);
    const [date, setDate] = useState<DateRange | undefined>()
    const [destination, setDestination] = useState<string | undefined>()
    const { createTrip } = useTripPlanner()
    const router = useRouter();


    const isStep0Valid = Boolean(destination);
    const isStep1Valid = Boolean(date?.from && date?.to && date.from <= date.to);

    return (
        <div className={ styles.container }>
            <h2 className={ styles.title }>Trip wizard</h2>

            <div className={ styles.card }>
                { renderStep() }
            </div>

            <div className={ styles.actions }>
                <Button
                    onClick={ () => goBack() }
                    className={ `${styles.buttonSecondary} ${step === 0 ? styles.disabled : ''}` }
                    disabled={ step === 0 }
                >
                    Back
                </Button>
                { step === 0 ? (
                    <Button onClick={ () => goNext() } className={ `${styles.buttonPrimary} ${!isStep0Valid ? styles.disabled : ''}` } disabled={ !isStep0Valid }>
                        Next
                    </Button>
                ) : (
                    <Button onClick={ () => finish() } className={ `${styles.buttonPrimary} ${!isStep1Valid ? styles.disabled : ''}` } disabled={ !isStep1Valid }>
                        Finish
                    </Button>
                ) }
            </div>
        </div>
    );

    function renderStep(): JSX.Element | null {
        switch (step) {
            case 0:
                return <Destination destination={ destination } setDestination={ setDestination } />;
            case 1:
                return <Dates setDate={ setDate } date={ date } />;
            default:
                return null;
        }
    }

    function goNext() {
        setStep(s => Math.min(1, s + 1));
    }

    function goBack() {
        setStep(s => Math.max(0, s - 1));
    }

    function finish() {
        if (date && destination) {
            createTrip({ date, destination })
            router.push('/plan')
        }
    }
}