import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button";
import { createNewWorkspace } from "@/lib/db";
import { Message, MessageType } from "@/lib/message";
import {useForm} from "react-hook-form"

  type FormFields = {
    email: string;
    password: string;
  };

function App() {
  const [text, setText] = useState<string>("options");
  const form = useForm<FormFields>();

  useEffect(() => {
    browser.runtime.sendMessage({ type: MessageType.OPTIONS_PAGE_READY });

    const listener = (message: Message) => {
      if (message.type === MessageType.START_ONBOARDING) {
        setText("onboarding!");
      }
    };
    browser.runtime.onMessage.addListener(listener);
    return () => browser.runtime.onMessage.removeListener(listener);
  }, []);

  return (
    <div>
      <p className="text-9xl">{text}</p>
      <Button
        onClick={async () => {
          try{
            await createNewWorkspace("devops");
            browser.runtime.sendMessage({type: MessageType.WORKSPACES_UPDATED});
          }
          catch (err){
            console.error(err);
          }
        }}
      >
        Add devops to database
      </Button>

      <form>
      </form>
      <Button onClick={async () =>{

      }}>Create actual workspace</Button>
    </div>
  );
}

export default App;