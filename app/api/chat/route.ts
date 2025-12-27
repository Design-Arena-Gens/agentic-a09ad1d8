import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are a support representative for Medigo Medical Delivery Express.

You should talk like a real human – friendly, caring, and trustworthy.
The customer should never feel they are talking to a machine.

Medigo is a fast and trusted medical delivery service that delivers medicines
and medical products from local medical stores to customers quickly.

Your responsibilities:
- Greet the customer politely in Hindi + English (Hinglish)
- Ask how you can help
- Ask for the medicine name
- Ask which medical store the customer wants the medicine from
- If the customer doesn't know the medical store, suggest nearby available stores
- Ask for prescription upload if the medicine requires one
- Ask for delivery location and landmark
- Give basic information about delivery time and charges
- If needed, guide the customer to senior/human support

You must NOT give medical advice.
Only help with order and delivery related information.
Always reply in short, clear, natural human language.

If customer says:
- "I need medicine / दवा चाहिए" → Ask medicine name + medical store
- "Any medical store" → Suggest nearby available medical stores (examples: Apollo Pharmacy, MedPlus, Local Medical Store)
- "Prescription" → Politely ask to upload prescription
- "Delivery time?" → Explain delivery may take 30–90 minutes depending on location
- "Charges?" → Explain charges depend on distance, medical store, and order value

Always respond like a caring human support person. Use Hinglish naturally.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Simple rule-based responses for demo
    const lastMessage = messages[messages.length - 1].content.toLowerCase()

    let response = ''

    if (lastMessage.includes('medicine') || lastMessage.includes('दवा') || lastMessage.includes('tablet')) {
      response = `Sure! बताइए, आपको कौन-सी medicine चाहिए?
और किस medical store से लेना चाहेंगे आप?

अगर आपको medical store का नाम नहीं पता, तो I can suggest nearby stores for you. 😊`
    } else if (lastMessage.includes('store') || lastMessage.includes('pharmacy')) {
      response = `Great! यहाँ कुछ nearby medical stores हैं:

📍 Apollo Pharmacy
📍 MedPlus
📍 Local Medical Store

आप किससे medicine लेना चाहेंगे?`
    } else if (lastMessage.includes('prescription') || lastMessage.includes('upload')) {
      response = `जी बिल्कुल! अगर medicine के लिए prescription चाहिए, तो please upload कर दीजिए.

आप prescription का photo भी भेज सकते हैं. 📄

क्या और कोई मदद चाहिए आपको?`
    } else if (lastMessage.includes('delivery') || lastMessage.includes('time') || lastMessage.includes('कितना')) {
      response = `Delivery time usually 30-90 minutes होता है, depending on:
- Your location
- Medical store distance
- Traffic conditions

हम जल्दी से जल्दी deliver करने की कोशिश करते हैं! 🚀

Delivery location और landmark बता दीजिए please?`
    } else if (lastMessage.includes('charge') || lastMessage.includes('cost') || lastMessage.includes('price') || lastMessage.includes('कितना')) {
      response = `Delivery charges depend करते हैं:
- Distance (कितनी दूर है)
- Medical store
- Order value

Usually ₹20-50 के बीच होता है for nearby locations.

Orders above ₹500 पर free delivery भी available है! 💰

कुछ और जानना चाहते हैं?`
    } else if (lastMessage.includes('hello') || lastMessage.includes('hi') || lastMessage.includes('namaste')) {
      response = `Hello! 🙏 Namaste!

मैं आपकी मदद के लिए यहाँ हूँ.
Please बताइए, आपको कौन-सी medicine चाहिए?`
    } else if (lastMessage.includes('thank') || lastMessage.includes('thanks') || lastMessage.includes('धन्यवाद')) {
      response = `You're most welcome! 😊

अगर कुछ और चाहिए तो बेझिझक पूछिए.
Medigo हमेशा आपकी सेवा में! ❤️`
    } else {
      response = `जी हाँ, मैं समझी.

क्या आप बता सकते हैं:
- कौन-सी medicine चाहिए?
- किस medical store से?
- कहाँ delivery करनी है?

Main यहाँ आपकी help के लिए हूँ! 😊`
    }

    return NextResponse.json({ message: response })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
