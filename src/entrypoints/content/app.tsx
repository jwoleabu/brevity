import { Toaster } from "@/components/ui/sonner";
import "@/assets/styles.css";
import { Navigation } from "@/components/views/navigation";
import { Button } from "@/components/ui/button";
import { Settings, X } from "lucide-react";
import FilledIcon from "@/assets/filled_icon_no_color.svg?react";

import { MessageType } from "@/lib/message";

function Extension({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    browser.runtime.sendMessage({ type: MessageType.CONTENT_SCRIPT_MOUNTED });
    return () => {
      browser.runtime.sendMessage({
        type: MessageType.CONTENT_SCRIPT_UNMOUNTED,
      });
    };
  }, []);
  return (
    <div className="fixed top-0 right-0 m-3 max-h-[calc(100vh-32px)] w-full max-w-sm shadow-2xs border-2 border-indigo-50 bg-background rounded-md flex flex-col z-100000">
      <div className="flex flex-row items-center justify-between mt-5 px-4 pb-4">
        <div className="flex items-center gap-1">
          <FilledIcon className="w-6 h-6 text-indigo-400" />
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
      <div className="overflow-y-auto overscroll-contain px-4 pb-4 [scrollbar-gutter:stable_both-edges]">
        <Navigation />
      </div>
      <Toaster position="bottom-left" duration={1500} />
    </div>
  );
}

export default Extension;
