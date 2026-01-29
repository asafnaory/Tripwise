import type { JSX } from "react";
import styles from "./MoreInfo.module.css";

type MoreInfoProps = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    header: string;
    image?: string;
    text: string;
};

export function MoreInfo({ isOpen, setIsOpen, header, image, text }: MoreInfoProps): JSX.Element {
    return (
        <div className={ `${styles.sidebar} ${isOpen ? styles.open : ""}` } role="dialog" aria-label={ header ?? "Details" }>
            <div className={ styles.sidebarHeader }>
                <h3 className={ styles.title }>{ header }</h3>
                <button className={ styles.closeBtn } onClick={ () => setIsOpen(false) } aria-label="Close">×</button>
            </div>
            <div className={ styles.sidebarContent }>
                { image ? <img className={ styles.image } src={ image } alt={ header } /> : null }
                <p className={ styles.summary }>{ text ?? "No content available." }</p>
            </div>
        </div>
    );
}