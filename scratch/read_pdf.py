import sys

try:
    import pypdf
    reader = pypdf.PdfReader(r"D:\onepws\imperrial\Imperial Essence Website Requirements Response Updated.pdf")
    for i, page in enumerate(reader.pages):
        print(f"--- PAGE {i+1} ---")
        print(page.extract_text())
except Exception as e:
    print("pypdf error:", e)
    try:
        import pdfplumber
        with pdfplumber.open(r"D:\onepws\imperrial\Imperial Essence Website Requirements Response Updated.pdf") as pdf:
            for i, page in enumerate(pdf.pages):
                print(f"--- PAGE {i+1} ---")
                print(page.extract_text())
    except Exception as e2:
        print("pdfplumber error:", e2)
