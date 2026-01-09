import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const response = new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'linear-gradient(to bottom, #1a1a1a, #0a0a0a)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px',
              maxWidth: '1200px',
            }}
          >
            <h1
              style={{
                fontSize: '80px',
                fontWeight: 'bold',
                color: '#ffffff',
                marginBottom: '20px',
                fontFamily: 'monospace',
                textAlign: 'center',
              }}
            >
              Power Adapters
            </h1>
            <p
              style={{
                fontSize: '32px',
                color: '#a0a0a0',
                marginBottom: '60px',
                textAlign: 'center',
              }}
            >
              Check plug types, voltage, and frequency for countries worldwide
            </p>
            <div
              style={{
                display: 'flex',
                gap: '20px',
                marginTop: '40px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '20px',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '12px',
                  border: '2px solid #333',
                }}
              >
                <div
                  style={{
                    fontSize: '48px',
                    marginBottom: '10px',
                  }}
                >
                  🔌
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    color: '#ffffff',
                    fontFamily: 'monospace',
                  }}
                >
                  Plug Types
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '20px',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '12px',
                  border: '2px solid #333',
                }}
              >
                <div
                  style={{
                    fontSize: '48px',
                    marginBottom: '10px',
                  }}
                >
                  ⚡
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    color: '#ffffff',
                    fontFamily: 'monospace',
                  }}
                >
                  Voltage
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '20px',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '12px',
                  border: '2px solid #333',
                }}
              >
                <div
                  style={{
                    fontSize: '48px',
                    marginBottom: '10px',
                  }}
                >
                  🌍
                </div>
                <div
                  style={{
                    fontSize: '24px',
                    color: '#ffffff',
                    fontFamily: 'monospace',
                  }}
                >
                  Countries
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
    
    // Add cache headers for long-term caching (1 day)
    response.headers.set('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800')
    
    return response
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
