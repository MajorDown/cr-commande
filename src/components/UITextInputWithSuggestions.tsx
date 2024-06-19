'use client';
import { useState } from 'react';

type UITextInputWithSuggestionsProps = {
    suggestionsData: string[];
    onChange: (value: string) => void;
};

/**
 * composant pour afficher un champ de texte avec des suggestions
 * @param {UITextInputWithSuggestionsProps} props
 * @returns {JSX.Element}
 */
const UITextInputWithSuggestions = ({ suggestionsData, onChange }: UITextInputWithSuggestionsProps) => {
    const [value, setValue] = useState('');
    const [suggestionsList, setSuggestionsList] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setValue(inputValue);
        onChange(inputValue);
        setSuggestionsList(suggestionsData.filter(s => s.toLowerCase().includes(inputValue.toLowerCase())));
    };

    const handleFocus = () => {
        if (value === '') {
            setSuggestionsList(suggestionsData);
        }
    };

    const handleSelect = (suggestion: string) => {
        setValue(suggestion);
        onChange(suggestion);
        setSuggestionsList([]);
    };

    return (
        <div className="uiTextInputWithSuggestions">
            <input
                type="text"
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
            />
            {suggestionsList.length > 0 && (
                <ul className="suggestionsList">
                    {suggestionsList.map(suggestion => (
                        <li key={suggestion} onClick={() => handleSelect(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UITextInputWithSuggestions;
