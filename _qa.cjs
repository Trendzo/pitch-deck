const { chromium } = require('playwright-core');
const path = require('path');
const url = require('url');
const fs = require('fs');

const OUT = process.argv[2] || '_shots';

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch({ channel: 'chrome' });
  const p = await b.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  const errs = [];
  p.on('pageerror', (e) => errs.push(String(e)));
  p.on('requestfailed', (r) => errs.push('FAILED ' + r.url().split('/').pop()));

  await p.goto(url.pathToFileURL(path.join(process.cwd(), 'pitch-v2.html')).href);
  await p.waitForTimeout(2000);
  await p.addStyleTag({ content: '.slide [data-anim],.slide [data-rule]{opacity:1!important;transform:none!important;transition:none!important}' });

  const n = await p.evaluate(() => document.querySelectorAll('.slide').length);
  console.log('slides:', n);

  for (let i = 0; i < n; i++) {
    const r = await p.evaluate((idx) => {
      const s = document.querySelectorAll('.slide');
      s.forEach((x) => x.classList.remove('is-active'));
      s[idx].classList.add('is-active');
      const el = s[idx];
      const sr = el.getBoundingClientRect();
      let maxB = 0;
      let maxR = 0;
      el.querySelectorAll('*').forEach((c) => {
        if (c.closest('.art') || c.closest('.frame')) return;
        const cr = c.getBoundingClientRect();
        if (cr.height > 0) {
          if (cr.bottom - sr.top > maxB) maxB = cr.bottom - sr.top;
          if (cr.right - sr.left > maxR) maxR = cr.right - sr.left;
        }
      });
      const broken = [...el.querySelectorAll('img')]
        .filter((im) => !im.complete || im.naturalWidth === 0)
        .map((im) => im.getAttribute('src'));
      // gap between a shot frame and the image inside it (white band = bad crop)
      let gap = '';
      el.querySelectorAll('.shot .frame').forEach((f) => {
        const im = f.querySelector('img');
        if (!im) return;
        const g = Math.round(f.getBoundingClientRect().bottom - im.getBoundingClientRect().bottom);
        if (g > 2) gap += ' gap:' + g;
      });
      return { title: el.getAttribute('data-title'), maxB: Math.round(maxB), maxR: Math.round(maxR), broken, gap };
    }, i);
    const st = r.maxB > 720 ? '*** CLIP-V ***' : r.maxR > 1280 ? '*** CLIP-H ***' : r.maxB > 700 ? '~tight' : 'ok';
    console.log(
      String(i + 1).padStart(3) + '  ' + r.title.padEnd(26).slice(0, 26) +
      'b:' + String(r.maxB).padStart(4) + ' r:' + String(r.maxR).padStart(5) + '  ' + st.padEnd(15) +
      (r.broken.length ? 'BROKEN:' + r.broken.join(',') : '') + r.gap
    );
    await p.waitForTimeout(90);
    await p.locator('#stage').screenshot({
      path: path.join(OUT, String(i + 1).padStart(2, '0') + '-' + r.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase() + '.png'),
    });
  }
  console.log(errs.length ? '\nERRORS:\n' + errs.join('\n') : '\nno errors');
  await b.close();
})();
