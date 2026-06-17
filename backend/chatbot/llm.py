from decouple import config
from .rag import build_context

OPENAI_API_KEY = config("OPENAI_API_KEY", default="")

SYSTEM_PROMPT = """You are a helpful marketing assistant for WE ARE DIGITAL, a digital agency.
You answer questions about the company's services, projects, blog posts, and general inquiries.
Be concise, professional, and friendly. If you don't know something, suggest they contact the team.
Use the context provided below to answer questions accurately."""

def get_ai_response(message, history=None):
    if not OPENAI_API_KEY:
        return fallback_response(message)

    try:
        import openai
        client = openai.OpenAI(api_key=OPENAI_API_KEY)

        context = build_context(message)
        messages = [
            {"role": "system", "content": f"{SYSTEM_PROMPT}\n\nContext about WE ARE DIGITAL:\n{context}"},
        ]

        if history:
            for msg in history[-6:]:
                messages.append({"role": msg["role"], "content": msg["content"]})

        messages.append({"role": "user", "content": message})

        res = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            max_tokens=500,
            temperature=0.7,
        )
        return res.choices[0].message.content
    except Exception as e:
        return f"I'm having trouble connecting to my AI service right now. Please try again later or contact us directly. (Error: {str(e)})"

def fallback_response(message):
    msg = message.lower()
    if any(w in msg for w in ["hello", "hi", "hey", "good morning", "good evening"]):
        return "Hello! Welcome to WE ARE DIGITAL. How can I help you today? Feel free to ask about our services, projects, or anything else."
    if any(w in msg for w in ["service", "offer", "do you"]):
        return "We offer a range of digital services including web development, mobile apps, UI/UX design, digital marketing, and branding. Would you like more details on any specific service?"
    if any(w in msg for w in ["price", "cost", "pricing", "how much"]):
        return "Our pricing depends on the scope of your project. Could you tell me more about what you're looking for? I can connect you with our team for a custom quote."
    if any(w in msg for w in ["contact", "email", "phone", "reach"]):
        return "You can reach us through our contact page or email us directly. Would you like me to redirect you to the contact form?"
    if any(w in msg for w in ["project", "portfolio", "work"]):
        return "We've worked on various projects across different industries. Check out our Projects page to see our portfolio! Is there a particular type of project you're interested in?"
    if any(w in msg for w in ["blog", "article", "post"]):
        return "We have a blog with articles about digital trends, tips, and case studies. You can check it out on our Blog page!"
    return "Thank you for your message! I'd be happy to help you learn more about WE ARE DIGITAL. Could you tell me more about what you're looking for?"
