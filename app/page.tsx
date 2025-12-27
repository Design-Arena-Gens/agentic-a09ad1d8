'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `🙏 Hello & Namaste! Medigo Medical Delivery Express में आपका स्वागत है.
मैं आपकी मदद के लिए यहाँ हूँ।

You can order medicines and medical products easily —
📍 From your preferred local medical store
🕒 Fast & safe delivery
💊 100% genuine medicines

Please बताइए, आपको कौन-सी medicine चाहिए?
और क्या आप बताना चाहेंगे कि medicine किस medical store से लेनी है?
If you're not sure, I can suggest nearby medical stores.

अगर prescription है तो आप यहाँ upload कर सकते हैं.
Delivery या charges से जुड़ा कोई भी सवाल हो, बेहिचक पूछिए.

Medigo Medical Delivery Express – आपकी सेहत, हमारी ज़िम्मेदारी ❤️`
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }]
        }),
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        height: '90vh',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
          borderRadius: '20px 20px 0 0'
        }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
            💊 Medigo Medical Delivery Express
          </h1>
          <p style={{ margin: '5px 0 0', fontSize: '14px', opacity: 0.9 }}>
            आपकी सेहत, हमारी ज़िम्मेदारी
          </p>
        </div>

        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  maxWidth: '70%',
                  padding: '12px 16px',
                  borderRadius: '18px',
                  background: message.role === 'user'
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : '#f0f0f0',
                  color: message.role === 'user' ? 'white' : '#333',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  fontSize: '15px',
                  lineHeight: '1.5'
                }}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                padding: '12px 16px',
                borderRadius: '18px',
                background: '#f0f0f0',
                color: '#999'
              }}>
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} style={{
          padding: '20px',
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          gap: '10px'
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '25px',
              border: '2px solid #e0e0e0',
              fontSize: '15px',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            style={{
              padding: '12px 24px',
              borderRadius: '25px',
              border: 'none',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
              opacity: isLoading || !input.trim() ? 0.6 : 1,
              transition: 'opacity 0.3s'
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
