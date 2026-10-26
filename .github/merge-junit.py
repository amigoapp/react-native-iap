import pathlib
import sys
import xml.etree.ElementTree as ET

output = pathlib.Path(sys.argv[2])
output.unlink(missing_ok=True)
reports = sorted(pathlib.Path(sys.argv[1]).glob("**/build/test-results/**/TEST-*.xml"))
if not reports:
    print("No Gradle JUnit reports were generated; no test counts will be inferred.")
    sys.exit(0)
merged = ET.Element("testsuites")
for path in reports:
    report = ET.parse(path).getroot()
    merged.extend([report] if report.tag == "testsuite" else list(report))
ET.ElementTree(merged).write(output, encoding="utf-8", xml_declaration=True)
