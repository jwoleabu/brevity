import { Message, MessageType } from "@/lib/message";

function App() {
  const [text, setText] = useState<string>(("options"));

  useEffect(()=>{
    browser.runtime.sendMessage({type: MessageType.OPTIONS_PAGE_READY});

    const listener = (message: Message) => {
      if (message.type === MessageType.START_ONBOARDING){
        setText("onboarding!")
      }
    }

    browser.runtime.onMessage.addListener(listener);
    return () => browser.runtime.onMessage.removeListener(listener);
  }, []);

  return (
    <div>
        <p className="text-9xl">{text}</p>
    </div>
  );
}

export default App;