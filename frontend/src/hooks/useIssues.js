import { useState, useEffect } from 'react';
import { getAllIssues } from '../api/issueApi';

export const useIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const data = await getAllIssues();
        setIssues(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  return { issues, loading, error, setIssues };
};
