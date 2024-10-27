import React, { useState, useEffect } from 'react';

export default function EmailBody({ email, onToggleFavorite }) {
  const [body, setBody] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchEmailBody();
    setIsFavorite(email.favorite || false);
  }, [email]);

  const fetchEmailBody = async () => {
    const response = await fetch(
      `https://flipkart-email-mock.now.sh/?id=${email.id}`
    );
    const data = await response.json();
    setBody(data.body);
  };

  const toggleFavorite = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    // Call the parent component's handler to update the email list
    onToggleFavorite(email.id, newFavoriteStatus);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className='flex justify-center items-center'>
          <div className="w-10 h-10 rounded-full bg-[#E54065] text-white flex items-center justify-center mr-4">
            {email.from.name[0].toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold">{email.subject}</h2>
        </div>
        <button
          className={`px-4 py-2 rounded-full ${isFavorite ? 'bg-[#E54065] text-white' : 'bg-[#E54065] text-white'}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? 'Favorited' : 'Mark as Favorite'}
        </button>
      </div>

      <div className="mb-4 ml-14">
        {new Date(email.date).toLocaleString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>

      <div className="prose ml-14" dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
}
