import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path('/tmp/browser/consent')
async def run():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  for country in ['VN','DE','GB','CH','CA','US','unknown']:
   context=await browser.new_context(viewport={'width':375,'height':812})
   page=await context.new_page()
   errors=[]; loads=[]
   page.on('pageerror',lambda e:errors.append(str(e)))
   async def trace(route):
    if country=='unknown': await route.fulfill(status=404,body='')
    else: await route.fulfill(body=f'h=localhost\nloc={country}\n')
   await page.route('**/cdn-cgi/trace',trace)
   async def tag(route):
    loads.append(route.request.url)
    await route.fulfill(content_type='text/javascript',body='')
   await page.route('https://www.googletagmanager.com/**',tag)
   await page.goto('http://localhost:8080',wait_until='networkidle')
   panel=page.get_by_role('region',name='Lựa chọn quyền riêng tư')
   await panel.wait_for()
   assert len(loads)==0,(country,loads)
   assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth')
   if country=='VN': await panel.screenshot(path=str(OUT/'vn-banner.png'))
   await panel.get_by_role('button',name='Từ chối',exact=True).click()
   await page.reload(wait_until='networkidle')
   assert await panel.count()==0
   assert len(loads)==0
   await page.get_by_role('button',name='Cài đặt cookie',exact=True).click()
   await panel.wait_for()
   assert await panel.get_by_role('switch',name='Quảng cáo',exact=True).get_attribute('aria-checked')=='false'
   await panel.get_by_role('button',name='Chấp nhận',exact=True).click()
   await page.wait_for_function('document.querySelectorAll("script[data-saigon-ads]").length===1')
   await page.wait_for_timeout(150)
   assert len(loads)==1,(country,loads)
   assert await page.evaluate('Array.from(window.dataLayer).filter(x=>x[1]==="conversion").length')==0
   await page.get_by_role('button',name='Cài đặt cookie',exact=True).click()
   await panel.get_by_role('button',name='Chấp nhận',exact=True).click()
   await page.wait_for_timeout(100)
   assert len(loads)==1
   await page.reload(wait_until='networkidle')
   assert await panel.count()==0
   assert len(loads)==2
   await page.get_by_role('button',name='Cài đặt cookie',exact=True).click()
   if country=='VN': await panel.screenshot(path=str(OUT/'vn-settings.png'))
   await panel.get_by_role('button',name='Từ chối',exact=True).click()
   state=await page.evaluate('Array.from(dataLayer).filter(x=>x[0]==="consent"&&x[1]==="update").map(x=>x[2])')
   assert state[-1]['ad_storage']=='denied'
   await page.reload(wait_until='networkidle')
   assert len(loads)==2
   await page.evaluate('localStorage.setItem("saigonhandling.consent-notice",JSON.stringify({version:"old",at:Date.now()}));localStorage.setItem("cookie_consent_advertising",JSON.stringify({choice:"granted",at:Date.now()}))')
   await page.reload(wait_until='networkidle')
   await panel.wait_for()
   assert len(loads)==2
   assert not errors,errors
   print(country,'PASS accept/reject/reload/revoke/version/single-load/no-premature-conversion')
   await context.close()
  await browser.close()
asyncio.run(run())
