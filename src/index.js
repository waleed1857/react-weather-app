import React from 'react';
import ReactDOM from 'react-dom/client';
import Weather from './App';
import './style.css';

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<Weather />);