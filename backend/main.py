from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
from pathlib import Path
import os
import json

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI()

origins = [
    "http://localhost:5173",
    os.getenv("FRONTEND_URL", ""),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o for o in origins if o],  # filter out empty strings
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BrandInput(BaseModel):
    brandName: str
    brandDescription: str
    targetAudience: str
    campaignGoal: str

@app.post("/generate")
async def generate_strategy(input: BrandInput):
    prompt = f"""You are an expert brand strategist and creative director.

Analyze this brand and return a JSON object only. No markdown, no explanation, just raw JSON.

Brand Name: {input.brandName}
Brand Description: {input.brandDescription}
Target Audience: {input.targetAudience}
Campaign Goal: {input.campaignGoal}

Return exactly this JSON structure:
{{
  "archetype": "one word archetype e.g. Explorer",
  "confidence": 85,
  "coreValues": ["Value1", "Value2", "Value3"],
  "brandVoice": ["Tone1", "Tone2", "Tone3"],
  "audience": {{
    "type": "Audience type label",
    "age": "age range",
    "role": "role description",
    "motivations": ["motivation1", "motivation2", "motivation3"],
    "painPoints": ["pain1", "pain2"]
  }},
  "tagline": "Campaign tagline",
  "narrative": "Campaign narrative in poetic short lines separated by \\n\\n",
  "photography": ["style1", "style2", "style3"],
  "typography": ["type1", "type2"],
  "colors": ["#hexcode1", "#hexcode2", "#hexcode3", "#hexcode4"],
  "prompts": {{
    "instagram": "detailed instagram ad image prompt",
    "hero": "detailed hero image prompt",
    "video": "detailed video prompt"
  }}
}}"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
    )

    data = json.loads(response.choices[0].message.content)
    return data