# Generates public/attachments/ifak-admissions-2026-2027.pdf
# Factual content only: school details, programmes and published contacts.
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.platypus import BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle

NAVY = colors.HexColor('#12283f')
NAVY_LIGHT = colors.HexColor('#1a3550')
GOLD = colors.HexColor('#c9a227')
INK = colors.HexColor('#22313f')
MUTED = colors.HexColor('#5d6d7e')

out = '/home/user/ifak/public/attachments/ifak-admissions-2026-2027.pdf'
doc = BaseDocTemplate(out, pagesize=A4, leftMargin=18*mm, rightMargin=18*mm, topMargin=16*mm, bottomMargin=16*mm,
                      title='IFAK Admissions 2026-2027 — Enquiry Guide', author='IFAK — Institut de Formation Apostolique de Kimihurura')

def header_footer(canvas, doc):
    canvas.saveState()
    # Header band
    canvas.setFillColor(NAVY)
    canvas.rect(0, A4[1] - 26*mm, A4[0], 26*mm, fill=1, stroke=0)
    canvas.setFillColor(GOLD)
    canvas.rect(0, A4[1] - 27.5*mm, A4[0], 1.5*mm, fill=1, stroke=0)
    canvas.setFillColor(colors.HexColor('#fdfaf0'))
    canvas.setFont('Times-Bold', 17)
    canvas.drawString(18*mm, A4[1] - 11*mm, 'IFAK — Institut de Formation Apostolique de Kimihurura')
    canvas.setFillColor(colors.HexColor('#e8cd7a'))
    canvas.setFont('Helvetica', 8.5)
    canvas.drawString(18*mm, A4[1] - 17*mm, 'SALESIAN DON BOSCO  ·  KIMIHURURA, GASABO, KIGALI  ·  FOUNDED 1964')
    # Footer
    canvas.setFillColor(MUTED)
    canvas.setFont('Helvetica', 7.5)
    canvas.drawCentredString(A4[0] / 2, 8*mm, 'IFAK Don Bosco Kimihurura  ·  KN 14 Ave 41, Kimihurura — Gasabo, Kigali  ·  info@ifakdonbosco.ac.rw  ·  +250 787 949 474')
    canvas.restoreState()

frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id='main')
doc.addPageTemplates([PageTemplate(id='all', frames=[frame], onPage=header_footer)])

h1 = ParagraphStyle('h1', fontName='Times-Bold', fontSize=21, leading=25, textColor=NAVY, spaceAfter=2*mm)
h2 = ParagraphStyle('h2', fontName='Times-Bold', fontSize=12.5, leading=16, textColor=NAVY_LIGHT, spaceBefore=5*mm, spaceAfter=2*mm)
body = ParagraphStyle('body', fontName='Helvetica', fontSize=10, leading=15, textColor=INK)
small = ParagraphStyle('small', fontName='Helvetica', fontSize=8.5, leading=12, textColor=MUTED)
center_small = ParagraphStyle('center_small', parent=small, alignment=TA_CENTER)

story = []
story.append(Paragraph('Admissions 2026–2027<br/>Enquiry Guide', h1))
story.append(Paragraph('Official information for parents and guardians interested in enrolling at IFAK', small))
story.append(Spacer(1, 3*mm))
story.append(HRFlowable(width='100%', thickness=1, color=GOLD))

story.append(Paragraph('About the school', h2))
story.append(Paragraph(
    'IFAK is a private Catholic secondary school located at Kimihurura sector, Gasabo District, in the City of Kigali. '
    'The school belongs to the Salesians of Don Bosco, a religious congregation registered as a legal entity under '
    '“Oeuvres de Don Bosco au Rwanda”. The school has been operating since 1964 and celebrated its golden jubilee in 2015. '
    'It is well known for its high expectations, strong academic results and its complete, holistic formation of young people.', body))

story.append(Paragraph('Programmes offered', h2))
story.append(Paragraph('<b>Ordinary Level (O-Level)</b> — Junior secondary: Senior 1 to Senior 3.', body))
story.append(Spacer(1, 1.5*mm))
story.append(Paragraph('<b>Advanced Level (A-Level)</b> — Five combinations:', body))
story.append(Spacer(1, 1.5*mm))
combo_table = Table([
    ['PCM', 'Physics – Chemistry – Mathematics'],
    ['MCB', 'Mathematics – Chemistry – Biology'],
    ['MCE', 'Mathematics – Computer Science – Economics'],
    ['MEG', 'Mathematics – Economics – Geography'],
    ['MPC', 'Mathematics – Physics – Computer Science'],
], colWidths=[28*mm, 130*mm])
combo_table.setStyle(TableStyle([
    ('FONTNAME', (0,0), (0,-1), 'Times-Bold'),
    ('FONTNAME', (1,0), (1,-1), 'Helvetica'),
    ('FONTSIZE', (0,0), (-1,-1), 9.5),
    ('TEXTCOLOR', (0,0), (0,-1), NAVY),
    ('TEXTCOLOR', (1,0), (1,-1), INK),
    ('ROWBACKGROUNDS', (0,0), (-1,-1), [colors.HexColor('#faf8f2'), colors.white]),
    ('BOX', (0,0), (-1,-1), 0.7, GOLD),
    ('INNERGRID', (0,0), (-1,-1), 0.4, colors.HexColor('#e7e3d8')),
    ('TOPPADDING', (0,0), (-1,-1), 4),
    ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ('LEFTPADDING', (0,0), (-1,-1), 6),
]))
story.append(combo_table)

story.append(Paragraph('How to enquire', h2))
story.append(Paragraph(
    'Admission requirements, fees, boarding and day scholar status, and the intake calendar are confirmed by the '
    'school administration for each academic year. Parents and guardians are encouraged to contact the school directly:', body))
story.append(Spacer(1, 2*mm))
story.append(Paragraph('<b>School office</b><br/>IFAK Don Bosco Kimihurura<br/>KN 14 Ave 41, Kimihurura — Gasabo, Kigali', body))
story.append(Spacer(1, 2*mm))
story.append(Paragraph('<b>Phone</b><br/>+250 787 949 474 &nbsp;·&nbsp; +250 788 519 195 &nbsp;·&nbsp; +250 782 379 300', body))
story.append(Spacer(1, 2*mm))
story.append(Paragraph('<b>Email</b><br/>info@ifakdonbosco.ac.rw', body))

story.append(Paragraph('Visit & open days', h2))
story.append(Paragraph(
    'Prospective families are welcome to visit the campus. Before coming, please call or write so the school office '
    'can arrange a guided visit with the admissions focal person.', body))

story.append(Paragraph('Important notes', h2))
story.append(Paragraph('• A girls’ dormitory is included in the school’s future development projects (announced February 2026, alongside a football pitch and gymnasium). Current boarding arrangements for girls will be communicated directly by the school office.<br/>• This guide is for enquiry purposes. Final admission decisions rest with the school administration and follow the national examination and registration calendar.<br/>• Always confirm dates, requirements and deadlines with the school office before acting.', body))

story.append(Spacer(1, 4*mm))
story.append(HRFlowable(width='100%', thickness=1, color=GOLD))
story.append(Spacer(1, 2*mm))
story.append(Paragraph('© 2026 Institut de Formation Apostolique de Kimihurura — IFAK Don Bosco Kimihurura. Contact the school office for the most current admissions information.', center_small))

doc.build(story)
print('written', out)
