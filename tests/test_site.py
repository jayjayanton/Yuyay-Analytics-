from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import re
import unittest

ROOT=Path(__file__).resolve().parents[1]
PAGES=["index.html","services.html","projects.html","about.html","contact.html","publications.html","countries.html"]

class Links(HTMLParser):
    def __init__(self):
        super().__init__();self.links=[];self.ids=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag in ("a","img","script","link"):
            for key in ("href","src"):
                if a.get(key):self.links.append(a[key])
        if a.get("id"):self.ids.append(a["id"])

class SiteTests(unittest.TestCase):
    def test_main_pages_have_shared_design_and_translation(self):
        for page in PAGES:
            s=(ROOT/page).read_text(encoding="utf-8")
            with self.subTest(page=page):
                self.assertIn("css/site.css",s);self.assertIn("js/main.js",s)
                self.assertIn('id="language-toggle"',s)
                self.assertGreater(s.count("data-en="),5)
                self.assertEqual(s.count("data-en="),s.count("data-es="))
                self.assertIn('id="main"',s)
    def test_local_links_exist(self):
        deferred={"documents/Clemencia_Vela_Master_CV.pdf"}
        for page in PAGES:
            parser=Links();parser.feed((ROOT/page).read_text(encoding="utf-8"))
            self.assertEqual(len(parser.ids),len(set(parser.ids)),f"duplicate IDs in {page}")
            for href in parser.links:
                u=urlsplit(href)
                if u.scheme or u.netloc or href.startswith(("#","mailto:","tel:")):continue
                path=u.path
                if not path or path in deferred:continue
                self.assertTrue((ROOT/path).exists(),f"{page}: broken local ref {href}")
    def test_both_master_cvs(self):
        for page in ["index.html","about.html","contact.html"]:
            data=(ROOT/page).read_text(encoding="utf-8")
            self.assertIn("Clemencia_Vela_Master_CV.pdf",data)
            self.assertIn("Jay_Antonio_Oliver_CV.pdf",data)
    def test_no_predio_source_exposure(self):
        for name in PAGES+["js/projects.js"]:
            s=(ROOT/name).read_text(encoding="utf-8")
            self.assertNotIn("github.com/jayjayanton/Predio-AI",s)
    def test_cases_are_visible_not_flip_cards(self):
        js=(ROOT/"js/projects.js").read_text(encoding="utf-8")
        self.assertIn("work-card",js);self.assertNotIn("flip-card",js)
        self.assertIn("focusEs",js)
    def test_full_clemencia_cv_source(self):
        s=(ROOT/"documents/clemencia-master.html").read_text(encoding="utf-8")
        self.assertGreaterEqual(s.count('class="entry"'),55)
        for term in ["Global Peatlands Initiative","University of Aberdeen","Coca Codo Sinclair"]:
            self.assertIn(term,s)
        self.assertNotIn("Del Picaflor",s)

if __name__=="__main__":unittest.main()
