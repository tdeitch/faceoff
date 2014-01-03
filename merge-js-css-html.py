import sys
import re

# look for external script and css etc tags and read in files and insert into output file
# this will probably be fairly brittle (ie will most likely only work for this app)
html=open(sys.argv[1])

js_re=re.compile(r'<script .*?src=[\'"]([^\'"]*?)[\'"].*?</script>')
css_re=re.compile(r'<link .*?href=[\'"]([^\'"]*?)[\'"].*?type=[\'"]text/css[\'"]/?>')

write=sys.stdout.write

for line in html:
    m=js_re.match(line)
    if m:
        js=open(m.group(1)).read()
        write('<script type="text/javascript">')
        write(js)
        write('</script>')
    else:
        m=css_re.match(line)
        if m:
            css=open(m.group(1)).read()
            write('<style type="text/css">')
            write(css)
            write('</style>')
        else:
            write(line.strip())
