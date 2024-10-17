import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
    return (
        <button
            className={`${styles.button} ${variant === 'primary' ? styles.primary : styles.secondary}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};  

export default Button;
