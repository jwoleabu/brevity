export default defineContentScript({
  matches: ["<all_urls>"],
  main() {
    let isOpen = false;
    browser.runtime.onMessage.addListener((msg) =>{
      if (msg?.action === 'togglePanel'){
        isOpen != isOpen;
        console.log('pong')
      }
    })
    console.log('Hello content.');
  },
});
