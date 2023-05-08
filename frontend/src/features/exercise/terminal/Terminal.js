import React, { useEffect, useRef, useMemo } from 'react';
import { Terminal as Xterm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';

import 'xterm/css/xterm.css';
import './Terminal.css';

const Terminal = ({ onCommand }) => {
    const terminalRef = useRef(null);
    const xtermRef = useRef(null);
    const inputBuffer = useRef('');
    const commandHistory = useRef([]);

    const fitAddon = useMemo(() => new FitAddon(), []);
    const webLinksAddon = useMemo(() => new WebLinksAddon(), []);
    const customTheme = useMemo(
        () => ({
            background: '#0e0e0e',
            foreground: '#ffffff',
            select: '#DAE6E8',
            cursorion: 'rgba(255, 255, 255, 0.3)',
            textSize: '25px',
        }),
        [],
    );

    const writeToTerminal = (str, newLine = false) => {
        newLine ? xtermRef.current.writeln(str) : xtermRef.current.write(str);
    };

    const updatePrompt = () => {
        const currentDirectory = '➜ /home/demo';
        xtermRef.current.write(`\x1B[32m${currentDirectory}\x1B[m $ `);
    };

    // Initialize the terminal on component mount
    useEffect(() => {
        xtermRef.current = new Xterm({ cursorBlink: true, theme: customTheme });
        xtermRef.current.loadAddon(fitAddon);
        xtermRef.current.loadAddon(webLinksAddon);
        xtermRef.current.open(terminalRef.current);

        // writeToTerminal('\x1B[31mWelcome to Terminal Trainer!\x1B[m\r\n');
        updatePrompt();

        xtermRef.current.onKey(({ key, domEvent }) => {
            if (key === '\r') {
                // Enter key
                const output = onCommand(inputBuffer.current);
                writeToTerminal('', true);

                if (!output || !output.length) {
                    return updatePrompt();
                }

                writeToTerminal(output, true);
                commandHistory.current = [
                    ...commandHistory.current,
                    inputBuffer.current,
                ];
                inputBuffer.current = '';
                updatePrompt();
            } else if (key === '\x7F') {
                // Backspace key
                if (inputBuffer.current.length > 0) {
                    inputBuffer.current = inputBuffer.current.slice(0, -1);
                    writeToTerminal('\b \b');
                }
            } else {
                const keyCode = domEvent.keyCode;
                const isArrowKey = keyCode >= 37 && keyCode <= 40;

                if (!isArrowKey) {
                    inputBuffer.current += key;
                    writeToTerminal(key);
                }
            }
        });

        return () => {
            xtermRef.current.dispose();
        };
    }, []);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(() => {
                fitAddon.fit();
            });
        });

        resizeObserver.observe(terminalRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, [fitAddon]);

    return <div className='terminal-container' ref={terminalRef} />;
};

export default Terminal;
