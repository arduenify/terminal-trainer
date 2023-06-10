import React, { useEffect, useRef, useMemo } from 'react';
import { Terminal as Xterm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';

import 'xterm/css/xterm.css';
import './Terminal.css';

const Terminal = ({ onCommand, enabled, instruction }) => {
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
        xtermRef.current = new Xterm({
            cursorBlink: true,
            theme: customTheme,
            fontSize: 16.5,
            fontFamily: 'monospace',
            
        });
        xtermRef.current.loadAddon(fitAddon);
        xtermRef.current.loadAddon(webLinksAddon);
        xtermRef.current.open(terminalRef.current);

        // updatePrompt();

        xtermRef.current.onKey(({ key, domEvent }) => {
            if (key === '\r') {
                // Enter key
                const result = onCommand(inputBuffer.current);
                const currentInputBuffer = inputBuffer.current;

                commandHistory.current = [
                    ...commandHistory.current,
                    currentInputBuffer,
                ];

                inputBuffer.current = '';
                writeToTerminal('', true);

                // if (!result || !result.output || !result.output.length) {
                //     return updatePrompt();
                // }

                if (result?.output) writeToTerminal(result.output, true);

                if (result && result.nextInstruction) {
                    writeToTerminal(
                        `\x1b[34m${result.nextInstruction}\x1b[0m`,
                        false,
                    );
                    writeToTerminal('', true);
                }

                if (!result.finished) {
                    updatePrompt();
                }
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

    useEffect(() => {
        if (instruction) {
            writeToTerminal(`\x1b[34m${instruction}\x1b[0m`, true);
            updatePrompt();
        }
    }, [instruction]);

    return (
        <div
            className={
                enabled ? `terminal-container` : `terminal-container disabled`
            }
            ref={terminalRef}
        />
    );
};

export default Terminal;
