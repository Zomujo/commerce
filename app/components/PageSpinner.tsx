'use client';

export default function PageSpinner() {
  return (
    <div className="page-spinner-root" role="status" aria-label="Loading">
      <div className="page-spinner-ring" />
      <style jsx>{`
        .page-spinner-root {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .page-spinner-ring {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 4px solid var(--color-gray-200);
          border-top-color: var(--primary);
          border-right-color: var(--primary-400);
          animation: pageSpinnerSpin 0.85s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        @keyframes pageSpinnerSpin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
