"""Claude reads the photo and text and picks the department. Falls back to keywords."""
import base64
import json
import os
import re

DEPARTMENTS = {
    "roads": "Roads & Infrastructure",
    "water": "Water Supply & Sewerage",
    "power": "Electricity & Street Lighting",
    "sanitation": "Sanitation & Solid Waste",
    "drainage": "Drainage & Stormwater",
    "parks": "Parks & Horticulture",
    "traffic": "Traffic & Transport Police",
    "review": "Human review queue",
}
SLA_HOURS = {"High": 24, "Medium": 72, "Low": 168}

KEYWORDS = {
    "roads": ["pothole", "road", "crack", "footpath", "bridge"],
    "water": ["pipeline", "leak", "sewage", "manhole", "no water"],
    "power": ["streetlight", "street light", "wire", "pole", "transformer"],
    "sanitation": ["garbage", "trash", "waste", "dustbin", "dump"],
    "drainage": ["drain", "flood", "waterlogging", "gutter"],
    "parks": ["tree", "park", "garden", "branch"],
    "traffic": ["signal", "traffic", "parking", "encroachment"],
}


def _fallback(text: str) -> dict:
    t = (text or "").lower()
    best, top = "review", 0
    for dept, words in KEYWORDS.items():
        n = sum(w in t for w in words)
        if n > top:
            best, top = dept, n
    return {"dept": best, "priority": "Medium", "confidence": 60 if top else 0,
            "summary": "", "source": "keyword fallback"}


def classify(description: str, photo: bytes | None = None, mime: str | None = None) -> dict:
    key = os.getenv("ANTHROPIC_API_KEY")
    if not key:
        return _fallback(description)
    try:
        from anthropic import Anthropic
        content = []
        if photo and mime:
            content.append({"type": "image", "source": {
                "type": "base64", "media_type": mime, "data": base64.b64encode(photo).decode()}})
        routable = "; ".join(f"{k} = {v}" for k, v in DEPARTMENTS.items() if k != "review")
        content.append({"type": "text", "text": (
            "You triage citizen reports for a city civic issue system.\n"
            f"Departments (use the key): {routable}.\n"
            'Use "review" if the report is not a civic issue or is unclear.\n'
            f"Citizen description (may be in any language): {json.dumps(description or '(none, use the photo)')}\n"
            "Reply with JSON only, no other text:\n"
            '{"dept": key, "priority": "High|Medium|Low", "confidence": 0-100, "summary": "one short English sentence"}\n'
            "High means danger to people or an emergency (open manhole, live wire, flooding, large deep pothole on a busy road).")})
        res = Anthropic(api_key=key).messages.create(
            model=os.getenv("CLAUDE_MODEL", "claude-sonnet-5-5"),
            max_tokens=300, messages=[{"role": "user", "content": content}])
        text = "".join(b.text for b in res.content if b.type == "text")
        data = json.loads(re.search(r"\{.*\}", text, re.S).group(0))
        if data["dept"] not in DEPARTMENTS or data["priority"] not in SLA_HOURS:
            raise ValueError("bad AI output")
        conf = max(0, min(99, int(float(data.get("confidence", 0)))))
        dept = "review" if conf < 40 else data["dept"]       # unsure -> a person decides
        return {"dept": dept, "priority": data["priority"], "confidence": conf,
                "summary": str(data.get("summary", ""))[:300], "source": "claude"}
    except Exception as e:  # network error, bad JSON, bad key...
        print("AI classify failed:", e)
        return _fallback(description)