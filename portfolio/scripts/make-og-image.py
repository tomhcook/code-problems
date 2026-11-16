from PIL import Image, ImageDraw, ImageFont
import sys
out = sys.argv[1]
W, H = 1200, 630
img = Image.new("RGB", (W, H), "#0d1117")
d = ImageDraw.Draw(img)
def font(size, bold=False):
    names = ["DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf", "LiberationSans-Bold.ttf" if bold else "LiberationSans-Regular.ttf"]
    for n in names:
        try: return ImageFont.truetype(n, size)
        except Exception: pass
    return ImageFont.load_default()
d.rectangle([0, 0, 12, H], fill="#39d353")
d.text((70, 70), "Thomas Cook", font=font(84, True), fill="#ffffff")
d.text((70, 175), "Software Engineer", font=font(44), fill="#58a6ff")
d.text((70, 240), "C#/.NET · React · Azure · AWS · Lincoln, UK", font=font(28), fill="#c9d1d9")
stats = [("60%", "faster API response times"), ("18.3%", "further gain after k6 rollout"), ("30+", "customer integrations delivered")]
x = 70
for big, label in stats:
    d.rounded_rectangle([x, 330, x + 340, 500], radius=14, fill="#161b22", outline="#38444d", width=2)
    d.text((x + 24, 346), big, font=font(64, True), fill="#39d353")
    d.text((x + 24, 438), label, font=font(21), fill="#c9d1d9")
    x += 365
d.text((70, 550), "tomhcook.github.io/code-problems/cv", font=font(28), fill="#919eab")
img.save(out, "PNG", optimize=True)
