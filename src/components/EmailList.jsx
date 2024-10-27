import React from 'react';

export default function EmailList({
  emails,
  onEmailSelect,
  filter,
  onFilterChange,
  page,
  onPageChange,
}) {
  const filteredEmails = emails.filter((email) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !email.read;
    if (filter === 'read') return email.read;
    if (filter === 'favorites') return email.favorite === true;
    return true;
  });

  return (
    <div>
      <div className="mb-4">
        <span className="mr-2 text-[#636363]">Filter By:</span>
        <button
          className={`mr-2 px-2 py-1 rounded-full text-[#636363] hover:bg-[#E1E4EA] ${filter === 'all' ? 'bg-[#E1E4EA] rounded-full' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          Unread
        </button>
        <button
          className={`mr-2 px-2 py-1 rounded-full text-[#636363] hover:bg-[#E1E4EA] ${filter === 'read' ? 'bg-[#E1E4EA] rounded-full' : ''}`}
          onClick={() => onFilterChange('read')}
        >
          Read
        </button>
        <button
          className={`mr-2 px-2 py-1 rounded-full text-[#636363] hover:bg-[#E1E4EA] ${filter === 'favorites' ? 'bg-[#E1E4EA] rounded-full' : ''}`}
          onClick={() => onFilterChange('favorites')}
        >
          Favorites
        </button>
      </div>
      <div className="space-y-4">
        {filteredEmails.map((email) => (
          <div
            key={email.id}
            className={`p-4 border border-[#CFD2DC] hover:border-[#E54065] rounded cursor-pointer ${email.read ? 'bg-[#dedfe3]' : 'bg-white'}`}
            onClick={() => onEmailSelect(email)}
          >
            <div className="flex justify-between items-center text-[#636363]">
              <div className="flex">
                {/* Sender's initial */}
                <div className="w-10 h-10 rounded-full bg-[#E54065] text-white flex items-center justify-center mr-4">
                  {email.from.name[0].toUpperCase()}
                </div>
                <div>
                  {/* Display the 'From' and 'Subject' */}
                  <div>From: <span className="font-semibold"> {email.from.name} &lt;{email.from.email}&gt;</span></div>
                  <div>Subject: <span className="font-semibold">{email.subject}</span></div>
                  <div className="mt-2 text-sm">
                    {email.short_description}
                  </div>
                  <div className='flex gap-2'>

                    <div className=" mt-2 text-sm">
                      {new Date(email.date).toLocaleString('en-US', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                    {/* Show the favorite label if the email is marked as favorite */}
                    {email.favorite && (
                      <div className="mt-2 text-sm text-[#E54065] font-bold">Favorite</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={() => onPageChange(page + 1)}
          disabled={emails.length < 10}
        >
          Next
        </button>
      </div>
    </div>
  );
}
