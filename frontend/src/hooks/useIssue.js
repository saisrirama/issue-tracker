import { useState, useEffect } from 'react';
import { getIssue } from '../api/issueApi';

export const useIssue = (issueId) => {
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const data = await getIssue(issueId);
        setIssue(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (issueId) {
      fetchIssue();
    }
  }, [issueId]);

  return { issue, loading, error };
};
