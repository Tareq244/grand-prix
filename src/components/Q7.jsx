import { useState } from 'react';
import { Check } from 'lucide-react';

export default function FrenchSentencesChecklist() {
  const sentences = [
    { id: 'a', text: 'Il y a cinq garçons sur la rampe.' },
    { id: 'b', text: 'Ils se disent « Salut ».' },
    { id: 'c', text: 'Un garçon tombe.' },
    { id: 'd', text: 'Un autre garçon dit que son saut est horrible.' },
    { id: 'e', text: 'Il lui demande son nom.' },
    { id: 'f', text: 'Les noms des deux garçons sont Éric et Daniel' }
  ];

  const [checked, setChecked] = useState({});

  const toggleCheck = (id) => {
    setChecked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Les phrases françaises
        </h1>
        
        <div className="space-y-4">
          {sentences.map((sentence) => (
            <div
              key={sentence.id}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <button
                onClick={() => toggleCheck(sentence.id)}
                className={`flex-shrink-0 w-6 h-6 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                  checked[sentence.id]
                    ? 'bg-green-500 border-green-500'
                    : 'bg-white border-gray-300 hover:border-green-400'
                }`}
              >
                {checked[sentence.id] && (
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                )}
              </button>
              
              <div className="flex-1">
                <span className="font-semibold text-indigo-600 mr-2">
                  {sentence.id})
                </span>
                <span className="text-gray-700 text-lg">
                  {sentence.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}