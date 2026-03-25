import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/** Tab / bookmark icon; matches admin “W on blue” mark. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#3b82f6',
          borderRadius: 7,
          fontSize: 19,
          fontWeight: 800,
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        W
      </div>
    ),
    { ...size },
  );
}
