"use client";

import React, { Dispatch, JSX } from 'react';
import styles from './wizard.module.css';

type Props = {
    destination?: string
    setDestination: Dispatch<React.SetStateAction<string | undefined>>
};

export default function Destination({ destination, setDestination }: Props): JSX.Element {
    return (
        <div className={ styles.field }>
            <label className={ styles.label }>Destination</label>
            <select
                value={ destination ?? '' }
                onChange={ e => setDestination(e.currentTarget.value) }
                className={ styles.select }
            >
                <option value="">Select a city</option>
                <option value="NYC">New York (NYC)</option>
                <option value="Paris">Paris</option>
                <option value="Rome">Rome</option>
                <option value="Tokyo">Tokyo</option>
                <option value="Barcelona">Barcelona</option>
            </select>
        </div>
    );
}
