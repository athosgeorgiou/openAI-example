import React, { useState, useEffect } from 'react';

const TextImprovementTool = () => {
    const [improvedText, setImprovedText] = useState(''); const [text, setText] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/improve', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        }); const data = await response.json(); setImprovedText(data.improvedText);
    };

    return (
        <>
            < h1 > Text Improvement Tool</h1 >
            < form onSubmit={handleSubmit} >
                < label htmlFor="textInput\">Enter some text:</label>
                <input type="text" id="textInput" name="text" required value={text} onChange={(e) => setText(e.target.value)} />
                <button type="submit">Improve</button>
            </form>
            <div>
                {improvedText}
            </div>
        </>
    );
}; export default TextImprovementTool;