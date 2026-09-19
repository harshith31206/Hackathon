        import React, { useState } from 'react';
        import { RegisterForm } from './components/RegisterForm';
        import { SnakeAndLadder } from './components/SnakeAndLadder';
        import { Tetris } from './components/Tetris';

        export default function App() {
                const [currentView, setCurrentView] = useState('tetris');

                return (
                        <div style={{ fontFamily: 'sans-serif', background: '#0f172a', color: '#f8fafc', minHeight: '100vh' }}>
                                <header style={{ background: '#1e293b', color: '#fff', padding: '16px', textAlign: 'center', borderBottom: '1px solid #334155' }}>
                                        <h1>Demo Task App</h1>
                                        <div style={{ marginTop: '12px' }}>
                                                <button
                                                        onClick={() => setCurrentView('tetris')}
                                                        style={{ marginRight: '8px', padding: '8px 16px', background: currentView === 'tetris' ? '#0284c7' : '#334155', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                                        Tetris
                                                </button>
                                                <button
                                                        onClick={() => setCurrentView('game')}
                                                        style={{ marginRight: '8px', padding: '8px 16px', background: currentView === 'game' ? '#0284c7' : '#334155', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                                        Snake & Ladder
                                                </button>
                                                <button
                                                        onClick={() => setCurrentView('register')}
                                                        style={{ padding: '8px 16px', background: currentView === 'register' ? '#0284c7' : '#334155', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                                        Register
                                                </button>
                                        </div>
                                </header>
                                <main style={{ padding: '20px' }}>
                                        {currentView === 'tetris' ? <Tetris /> : currentView === 'game' ? <SnakeAndLadder /> : <RegisterForm />}
                                </main>
                        </div>
                );
        }