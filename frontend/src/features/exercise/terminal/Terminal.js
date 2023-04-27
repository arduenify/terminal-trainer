import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Terminal as Xterm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';

import 'xterm/css/xterm.css';
import './Terminal.css';

const Terminal = ({ onCommand }) => {
    const terminalRef = useRef(null);
    const xtermRef = useRef(null);

    // Initialize xterm addons
    const fitAddon = useMemo(() => new FitAddon(), []);
    const webLinksAddon = useMemo(() => new WebLinksAddon(), []);

    // Tracks the currently inputted command line
    const [inputBuffer, setInputBuffer] = useState('');

    // Tracks the input history (todo)
    const [history, setHistory] = useState([]);

    // Set custom terminal theme
    const customTheme = useMemo(
        () => ({
            background: '#0e0e0e',
            foreground: 'green',
            cursor: '#ffffff',
            selection: 'rgba(255, 255, 255, 0.3)',
        }),
        [],
    );

    // Wrapper function for writing to the terminal with optional new line
    const writeToTerminal = (str, newLine = false) => {
        if (newLine) {
            xtermRef.current.writeln(str);
        } else {
            xtermRef.current.write(str);
        }
    };

    const updatePrompt = () => {
        const currentDirectory = '/home/demo'; // todo
        xtermRef.current.write(`\x1B[32m${currentDirectory}\x1B[m $ `);
    };

    // Initialize the terminal on component mount
    useEffect(() => {
        xtermRef.current = new Xterm({ cursorBlink: true, theme: customTheme });

        xtermRef.current.loadAddon(fitAddon);
        xtermRef.current.loadAddon(webLinksAddon);
        xtermRef.current.open(terminalRef.current);

        writeToTerminal('\x1B[31mWelcome to Terminal Trainer!\x1B[m\r\n');
        updatePrompt();
        setInputBuffer('');

        // Handles reading input from the terminal
        xtermRef.current.onKey(({ key, domEvent }) => {
            if (key === '\r') {
                // Enter key pressed
                const output = onCommand(inputBuffer);

                // Output result on new line
                writeToTerminal('', true);
                writeToTerminal(output, true);

                // Reset the input buffer
                setInputBuffer('');

                // Add to history
                setHistory((prev) => [...prev, inputBuffer]);

                // Display the prompt again
                updatePrompt();
            } else if (key === '\x7F') {
                // Backspace key pressed
                if (inputBuffer.length > 0) {
                    setInputBuffer((prev) => prev.slice(0, -1));
                    writeToTerminal('\b \b');
                }
            } else {
                // Handle other keys
                const keyCode = domEvent.keyCode;
                const isArrowKey = keyCode >= 37 && keyCode <= 40;

                if (!isArrowKey) {
                    setInputBuffer((prev) => prev + key);
                    writeToTerminal(key);
                }
            }
        });

        // Clean up on unmount
        return () => {
            xtermRef.current.dispose();
        };
    }, []);

    // Handle terminal resizing
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(() => {
                fitAddon.fit();
            });
        });

        resizeObserver.observe(terminalRef.current);

        // Clean up on unmount
        return () => {
            resizeObserver.disconnect();
        };
    }, [fitAddon]);

    return <div className='terminal-container' ref={terminalRef} />;
};

export default Terminal;
