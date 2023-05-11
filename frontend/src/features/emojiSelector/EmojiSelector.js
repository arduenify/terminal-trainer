import React, { useState } from 'react';
import './EmojiSelector.css';

const EmojiSelector = ({ onSelect }) => {
    const [selectedIcon, setSelectedIcon] = useState(null);

    const generateEmojiArray = (start, length) =>
        Array.from({ length }, (_, i) => String.fromCodePoint(start + i));

    const emojis = [].concat(
        generateEmojiArray(0x1f3c6, 7),
        generateEmojiArray(0x1f31f, 2),
        generateEmojiArray(0x1f3a9, 3),
        generateEmojiArray(0x1f947, 3),
        generateEmojiArray(0x1f4aa, 4),
        generateEmojiArray(0x1f38a, 5),
        generateEmojiArray(0x1f680, 5),
        generateEmojiArray(0x1f451, 1),
        generateEmojiArray(0x1f3c1, 1),
        generateEmojiArray(0x1f37b, 2),
        generateEmojiArray(0x1f37e, 3),
        generateEmojiArray(0x1f393, 1),
        generateEmojiArray(0x1f48e, 5),
        generateEmojiArray(0x1f3ae, 3),
        generateEmojiArray(0x1f4b0, 4),
        generateEmojiArray(0x1f6a9, 2),
        generateEmojiArray(0x1f9e8, 3),
        generateEmojiArray(0x1f4ab, 5),
        generateEmojiArray(0x1f4a5, 4),
        generateEmojiArray(0x1f9e1, 3),
        generateEmojiArray(0x1f9d9, 2),
    );

    const handleClick = (emoji, event) => {
        event.preventDefault();

        setSelectedIcon(emoji);
        onSelect(emoji);
    };

    return (
        <div>
            <div className='emoji-selector'>
                {emojis.map((emoji, index) => (
                    <button
                        key={index}
                        className={`emoji-button ${
                            emoji === selectedIcon ? 'selected' : ''
                        }`}
                        onClick={(event) => handleClick(emoji, event)}
                        aria-label={emoji + ' button'}
                    >
                        {emoji}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EmojiSelector;
