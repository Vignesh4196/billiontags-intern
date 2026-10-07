import { useEffect, useRef, useState } from 'react';
import { subscribeToJob, cancelJob } from '../services';

// Starts a server job (backup / restore / export) and follows its 0–100% progress.
// `start` must return a promise resolving to { jobId }.
export function useJobProgress({ start, onComplete }) {
  const [percent, setPercent] = useState(1);
  const [error, setError] = useState(null);
  const jobIdRef = useRef(null);
  const finishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Safe to call more than once; does nothing after the job has finished.
  const cancel = () => {
    // A failed cancel (job already finished server-side, offline) must not surface as an unhandled rejection.
    if (jobIdRef.current && !finishedRef.current) Promise.resolve(cancelJob(jobIdRef.current)).catch(() => {});
    jobIdRef.current = null;
  };

  useEffect(() => {
    let active = true;
    let unsubscribe;
    start()
      .then(({ jobId }) => {
        if (!active) return;
        jobIdRef.current = jobId;
        unsubscribe = subscribeToJob(jobId, (value) => active && setPercent(Math.max(1, value)));
      })
      .catch((e) => active && setError(e));
    return () => {
      active = false;
      unsubscribe?.();
      // Leaving the screen any way (header back, hardware back) before 100% cancels the job.
      cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (percent < 100) return undefined;
    finishedRef.current = true;
    const jobId = jobIdRef.current;
    const timer = setTimeout(() => onCompleteRef.current?.(jobId), 400);
    return () => clearTimeout(timer);
  }, [percent]);

  return { percent, error, cancel };
}
