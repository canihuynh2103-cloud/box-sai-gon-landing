import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path('/tmp/browser/consent')
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  for accepted,success in [(True,True),(True,False),(False,True)]:
   context=await browser.new_context()
   page=await context.new_page()
   gate=asyncio.Event(); started=asyncio.Event(); calls=[]
   await page.route('https://www.googletagmanager.com/**',lambda route:route.fulfill(content_type='text/javascript',body=''))
   async def backend(route):
    if route.request.method=='POST':
     calls.append(route.request.url); started.set()
     await gate.wait()
     if success: await route.fulfill(status=200,content_type='application/json',body='{}')
     else: await route.abort('failed')
    else: await route.continue_()
   await page.route('http://localhost:8080/**',backend)
   await page.goto('http://localhost:8080',wait_until='networkidle')
   panel=page.get_by_role('region',name='Lựa chọn quyền riêng tư')
   await panel.get_by_role('button',name='Chấp nhận' if accepted else 'Từ chối',exact=True).click()
   form=page.locator('#lien-he form')
   await form.locator('[name=name]').fill('Consent frontend test')
   await form.locator('[name=phone]').fill('0900000000')
   await form.locator('[name=service]').select_option(index=1)
   button=form.get_by_role('button',name='Gửi Yêu Cầu Báo Giá',exact=True)
   await button.click()
   await asyncio.wait_for(started.wait(),10)
   assert await page.evaluate('Array.from(dataLayer).filter(x=>x[1]==="conversion").length')==0
   assert await form.get_by_role('button',name='Đang gửi...').is_disabled()
   gate.set()
   if success: await form.get_by_text('Đã gửi yêu cầu thành công!',exact=False).wait_for()
   else: await form.locator('p.text-destructive').wait_for()
   assert len(calls)==1,calls
   conversions=await page.evaluate('Array.from(dataLayer).filter(x=>x[1]==="conversion").map(x=>x[2])')
   assert len(conversions)==(1 if accepted and success else 0),conversions
   if conversions: assert conversions[0]['send_to']=='AW-17877629629/67t4COLM5b0dEL3128xC'
   await form.screenshot(path=str(OUT/f'quote-{accepted}-{success}.png'))
   print('quote',accepted,success,'PASS: zero before response; after response',len(conversions),'conversion(s); mocked backend, no database writes')
   await context.close()
  await browser.close()
asyncio.run(main())
