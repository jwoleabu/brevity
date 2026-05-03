import { Zap } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

type AutofillProps = {
  savedMinutes: number;
};

function formatTime(minutes: number) {
  if (minutes <= 0) return null;

  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"}`;
  }

  const hours = Math.floor(minutes / 60);
  return `${hours} hour${hours === 1 ? "" : "s"}`;
}

export function Autofill({ savedMinutes }: AutofillProps) {
  const [loading, setLoading] = useState(false);
  const formatted = formatTime(savedMinutes);

  const handeClick = () => {
    const autofillPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 4000);
    });

    setLoading(true);

    autofillPromise.finally(() => {
      toast.success("Autofill completed!")
      setLoading(false);
    })
  };
  return (
    <div className="flex flex-col gap-2 p-3 rounded-md bg-muted">
      <p className="text-sm font-medium text-foreground">
        Autofill this job application!
      </p>
      <p className="text-sm text-muted-foreground">
        {" "}
        {formatted ? (
          <>
            You have saved <span className="font-semibold">{formatted}</span> by
            autofilling so far.
          </>
        ) : (
          "Start autofilling to save time on applications."
        )}
      </p>
      <Button
        size="sm"
        onClick={handeClick} disabled={loading}
      >
        <Zap className={loading ? "animate-spin" : ""}/>
        Autofill Page
      </Button>
    </div>
  );
}
