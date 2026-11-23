"""Preview-only privacy regressions. Never sends quote data or writes the backend."""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path('/tmp/browser/consent')
OUT.mkdir(parents=True,exist_ok=True)
APP='http://localhost:8080'
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  for width,height in [(320,812),(1280,1800)]:
   context=await browser.new_context(viewport={'width':width,'height':height})
   await context.route('https://www.googletagmanager.com/**',lambda r:r.fulfill(content_type='text/javascript',body=''))
   page=await context.new_page()
   await page.goto(APP,wait_until='networkidle')
   panel=page.get_by_role('region',name='Lựa chọn quyền riêng tư')
   await panel.get_by_role('button',name='Cài đặt cookie',exact=True).click()
   await page.wait_for_timeout(100)
   assert await page.evaluate('document.documentElement.scrollWidth<=innerWidth')
   assert await panel.evaluate('(e)=>e.getBoundingClientRect().top>=0 && e.getBoundingClientRect().bottom<=innerHeight')
   await page.screenshot(path=str(OUT/f'settings-{width}.png'))
   await panel.get_by_role('button',name='Chấp nhận',exact=True).click()
   second=await context.new_page()
   await second.goto(APP,wait_until='networkidle')
   await page.get_by_role('button',name='Cài đặt cookie',exact=True).click()
   await panel.get_by_role('button',name='Từ chối',exact=True).click()
   await second.wait_for_function('Array.from(dataLayer).filter(x=>x[0]==="consent"&&x[1]==="update"&&x[2].ad_storage).at(-1)[2].ad_storage==="denied"')
   await page.evaluate('localStorage.clear()')
   await second.wait_for_timeout(2500)
   updates=await second.evaluate('Array.from(dataLayer).filter(x=>x[0]==="consent"&&x[1]==="update"&&x[2].ad_storage).map(x=>x[2])')
   assert updates[-1]['ad_storage']=='denied',updates
   await second.reload(wait_until='networkidle')
   assert await second.locator('script[data-saigon-ads]').count()==0
   print(width,'PASS layout and cross-tab withdrawal/cleared storage stays denied')
   await context.close()
  context=await browser.new_context()
  await context.route('https://www.googletagmanager.com/**',lambda r:r.fulfill(content_type='text/javascript',body=''))
  await context.add_init_script("if(location.origin==='http://localhost:8080') Object.defineProperty(Storage.prototype,'setItem',{value(){throw new Error('Storage blocked')}})")
  page=await context.new_page(); await page.goto(APP,wait_until='networkidle')
  panel=page.get_by_role('region',name='Lựa chọn quyền riêng tư')
  await panel.get_by_role('button',name='Chấp nhận',exact=True).click()
  await page.wait_for_function('document.querySelector("script[data-saigon-ads]")')
  await page.get_by_role('button',name='Cài đặt cookie',exact=True).click()
  await panel.get_by_role('button',name='Từ chối',exact=True).click()
  await page.reload(wait_until='networkidle'); await panel.wait_for()
  assert await page.locator('script[data-saigon-ads]').count()==0
  print('PASS blocked storage uses session choice, asks again after reload')
  await context.close()
  context=await browser.new_context()
  await context.add_init_script("Object.defineProperty(navigator,'globalPrivacyControl',{value:true})")
  page=await context.new_page(); await page.goto(APP,wait_until='networkidle')
  assert await page.get_by_role('region',name='Lựa chọn quyền riêng tư').count()==0
  await page.get_by_role('button',name='Cài đặt cookie',exact=True).click()
  panel=page.get_by_role('region',name='Lựa chọn quyền riêng tư')
  assert await panel.get_by_role('switch',name='Quảng cáo',exact=True).is_disabled()
  assert await panel.get_by_role('switch',name='Quảng cáo',exact=True).get_attribute('aria-checked')=='false'
  assert await page.locator('script[data-saigon-ads]').count()==0
  print('PASS Global Privacy Control keeps switches disabled and Ads off')
  await context.close(); await browser.close()
asyncio.run(main())
