import { Toaster } from "@/components/ui/sonner";
import "@/assets/styles.css";
import { Navigation } from "@/components/views/navigation";
import { Button } from "@/components/ui/button";
import { Settings, X } from "lucide-react";
import icon from "@/assets/filled_icon.svg";
import { MessageType } from "@/lib/message";

function Extension({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed top-0 right-0 m-3 max-h-[calc(100vh-32px)] w-full max-w-sm bg-background pr-4 pl-4 pb-4 rounded-md flex flex-col overflow-y-scroll overscroll-contain z-100000">
      <div className="flex flex-row items-center justify-between mt-5">
        <div className="flex items-center gap-1">
          <img src={icon} className="w-6 h-6"></img>
          <p className="font-medium">Brevity</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={"ghost"}
            className="text-muted-foreground  hover:text-black p-1 transition-colors duration-150"
            onClick={() => {
              browser.runtime.sendMessage({ type: MessageType.OPEN_OPTIONS });
            }}
          >
            <Settings />
          </Button>
          <Button
            variant={"ghost"}
            className="text-muted-foreground  hover:text-black p-1 transition-colors duration-150"
            onClick={onClose}
          >
            <X />
          </Button>
        </div>
      </div>
      <Navigation />
      <Toaster position="bottom-left" duration={1500} />
    </div>
  );
}

export default Extension;
