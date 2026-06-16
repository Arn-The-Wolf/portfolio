"""
Generate public/resume.pdf from the portfolio DOCX.
Reads the DOCX and produces a clean, professional PDF resume.
Run: python scripts/build-resume-pdf.py
"""
import sys
import os
import re
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCX_PATH = os.path.join(ROOT, "public", "RUYANGE-Arnold-Portfolio.docx")
OUT_PATH = os.path.join(ROOT, "public", "resume.pdf")

def extract_text_from_docx(path):
    paragraphs = []
    with zipfile.ZipFile(path) as z:
        with z.open("word/document.xml") as f:
            xml = f.read().decode("utf-8")
    # Extract paragraph text preserving runs
    para_re = re.compile(r"<w:p[ >].*?</w:p>", re.DOTALL)
    run_re = re.compile(r"<w:t[^>]*>(.*?)</w:t>", re.DOTALL)
    bold_re = re.compile(r"<w:b(?:\s|/>)")
    heading_re = re.compile(r'<w:pStyle w:val="([^"]+)"')
    for p_match in para_re.finditer(xml):
        p_xml = p_match.group(0)
        style_m = heading_re.search(p_xml)
        style = style_m.group(1) if style_m else "Normal"
        is_bold = bool(bold_re.search(p_xml))
        texts = run_re.findall(p_xml)
        text = "".join(texts).strip()
        text = re.sub(r"\s+", " ", text)
        if text:
            paragraphs.append({"text": text, "style": style, "bold": is_bold})
    return paragraphs

def build_pdf(paragraphs, out_path):
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib import colors
    from reportlab.lib.units import cm
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
    from reportlab.lib.enums import TA_LEFT, TA_CENTER

    DARK_BLUE = colors.HexColor("#2C3E50")
    MID_GRAY  = colors.HexColor("#555555")
    LIGHT     = colors.HexColor("#666666")

    doc = SimpleDocTemplate(
        out_path,
        pagesize=A4,
        leftMargin=1.8*cm,
        rightMargin=1.8*cm,
        topMargin=1.5*cm,
        bottomMargin=1.5*cm,
    )

    styles = getSampleStyleSheet()
    name_style = ParagraphStyle("Name", parent=styles["Heading1"],
        fontSize=22, textColor=DARK_BLUE, spaceAfter=2, spaceBefore=0,
        fontName="Helvetica-Bold", alignment=TA_CENTER)
    title_style = ParagraphStyle("Title", parent=styles["Normal"],
        fontSize=11, textColor=MID_GRAY, spaceAfter=4, alignment=TA_CENTER)
    contact_style = ParagraphStyle("Contact", parent=styles["Normal"],
        fontSize=8.5, textColor=LIGHT, spaceAfter=8, alignment=TA_CENTER)
    section_style = ParagraphStyle("Section", parent=styles["Normal"],
        fontSize=10.5, textColor=DARK_BLUE, spaceBefore=10, spaceAfter=3,
        fontName="Helvetica-Bold")
    body_style = ParagraphStyle("Body", parent=styles["Normal"],
        fontSize=9, textColor=MID_GRAY, spaceAfter=3, leading=13)
    bullet_style = ParagraphStyle("Bullet", parent=body_style,
        leftIndent=10, bulletIndent=0)
    bold_style  = ParagraphStyle("Bold", parent=body_style,
        fontName="Helvetica-Bold", textColor=colors.HexColor("#333333"))

    flowables = []
    name_done = False
    title_done = False
    skip_contact_prefix = {"CONTACT", "SKILLS", "LANGUAGES", "CERTIFICATIONS"}

    # Identify name: first non-empty paragraph that's all-caps or first short line
    for i, p in enumerate(paragraphs):
        t = p["text"]
        if not name_done and t and len(t) < 50:
            # Name is first content line
            flowables.append(Paragraph(t.title(), name_style))
            name_done = True
            continue
        if name_done and not title_done and t and len(t) < 60 and not any(c.isdigit() for c in t[:5]):
            flowables.append(Paragraph(t, title_style))
            title_done = True
            continue
        # Contact line heuristics
        if "@" in t or "github" in t.lower() or "arnold" in t.lower() and ("http" in t or "vercel" in t):
            flowables.append(Paragraph(t, contact_style))
            continue
        if t in skip_contact_prefix:
            flowables.append(HRFlowable(width="100%", thickness=0.5, color=DARK_BLUE, spaceAfter=3, spaceBefore=6))
            flowables.append(Paragraph(t, section_style))
            continue
        style_name = p.get("style", "Normal")
        if "Heading" in style_name or p.get("bold") and len(t) < 60 and t.isupper():
            flowables.append(HRFlowable(width="100%", thickness=0.5, color=DARK_BLUE, spaceAfter=3, spaceBefore=6))
            flowables.append(Paragraph(t, section_style))
        elif p.get("bold") and len(t) < 80:
            flowables.append(Paragraph(t, bold_style))
        elif t.startswith("•") or t.startswith("-"):
            flowables.append(Paragraph("• " + t.lstrip("•- "), bullet_style))
        else:
            flowables.append(Paragraph(t, body_style))

    doc.build(flowables)
    print(f"PDF written to {out_path} ({os.path.getsize(out_path):,} bytes)")

if __name__ == "__main__":
    if not os.path.exists(DOCX_PATH):
        print(f"ERROR: {DOCX_PATH} not found", file=sys.stderr)
        sys.exit(1)
    paragraphs = extract_text_from_docx(DOCX_PATH)
    build_pdf(paragraphs, OUT_PATH)
