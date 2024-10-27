import { useState, useEffect } from 'react';
import EmailList from './components/EmailList';
import EmailBody from './components/EmailBody';

export default function App() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchEmails();
  }, [page]);

  const fetchEmails = async () => {
    const response = await fetch(
      `https://flipkart-email-mock.now.sh/?page=${page}`
    );
    const data = await response.json();
    setEmails(data.list);
  };

  const handleEmailSelect = (email) => {
    // Mark the email as read
    const updatedEmails = emails.map((e) =>
      e.id === email.id ? { ...e, read: true } : e
    );
    setEmails(updatedEmails);
    setSelectedEmail(email);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleToggleFavorite = (emailId, isFavorite) => {
    const updatedEmails = emails.map((email) =>
      email.id === emailId ? { ...email, favorite: isFavorite } : email
    );
    setEmails(updatedEmails);

    // Update the selectedEmail if it's the current one being viewed
    if (selectedEmail && selectedEmail.id === emailId) {
      setSelectedEmail({ ...selectedEmail, favorite: isFavorite });
    }
  };

  return (
    <div className="flex bg-[#F4F5F9] w-full">
      <div className={`w-full p-4 `}>
        <EmailList
          emails={emails}
          onEmailSelect={handleEmailSelect}
          filter={filter}
          onFilterChange={handleFilterChange}
          page={page}
          onPageChange={handlePageChange}
        />
      </div>
      {selectedEmail && (
        <div className="w-5/6 p-4">
          <EmailBody
            email={selectedEmail}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      )}
    </div>
  );
}
