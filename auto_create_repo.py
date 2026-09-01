import asyncio
from playwright.async_api import async_playwright
import os

async def auto_create_and_push_repo():
    user_data_dir = "/home/idrees/.config/chromium"
    print("Launching Chromium to automate GitHub repo creation...")
    
    async with async_playwright() as p:
        try:
            browser = await p.chromium.launch_persistent_context(
                user_data_dir=user_data_dir,
                headless=True,
                args=["--no-sandbox", "--disable-dev-shm-usage"]
            )
            page = await browser.new_page()
            
            # Go to GitHub new repo page
            await page.goto("https://github.com/new", wait_until="networkidle", timeout=30000)
            await page.wait_for_timeout(3000)
            
            # Check if logged in
            current_url = page.url
            print("Current URL:", current_url)
            
            if "login" in current_url:
                print("Not logged in on Chromium session. Saving screenshot...")
                await page.screenshot(path="/home/idrees/personal_brand_site/github_login_check.png")
            else:
                print("Logged in! Filling repo creation form...")
                # Try finding repo name input
                repo_input = page.locator("input[aria-label*='Repository name'], input[name='name'], input[id*='repository_name']")
                if await repo_input.count() > 0:
                    await repo_input.first.fill("IdreesQurashi.github.io")
                    print("Filled repo name: IdreesQurashi.github.io")
                
                await page.wait_for_timeout(3000)
                
                # Click Create repository button
                create_btn = page.locator("button:has-text('Create repository'), button[type='submit']:has-text('Create')")
                if await create_btn.count() > 0:
                    await create_btn.first.click()
                    print("Clicked Create repository!")
                    await page.wait_for_timeout(6000)
                
                await page.screenshot(path="/home/idrees/personal_brand_site/github_repo_created.png")
                print("Final URL:", page.url)
                
            await browser.close()
        except Exception as e:
            print("Playwright error:", e)

if __name__ == "__main__":
    asyncio.run(auto_create_and_push_repo())
