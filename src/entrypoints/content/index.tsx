import './styles.css'
import { Button } from '@/components/ui/button'
import { createRoot } from 'react-dom/client'

function App() {
  return (
    <div className="fixed top-0 right-0 m-3 max-h-[calc(100vh-24px)] w-full max-w-sm overflow-auto rounded-md border bg-white font-sans text-black shadow-md flex flex-col">
      <Button>Click me</Button>
    </div>
  )
}

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'inject-ui-app',
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        container.style.position = 'fixed'
        container.style.top = '0'
        container.style.right = '0'

        const root = createRoot(container)
        root.render(<App />)
        return root
      },
      onRemove: (root) => {
        root?.unmount()
      },
    })

    ui.mount()
  },
})