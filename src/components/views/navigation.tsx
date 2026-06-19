import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Pencil, User, ChartColumn } from "lucide-react";
import { Autofill } from "../custom/autofill";
import { Profile } from "../custom/profile";

export function Navigation() {
  return (
    <Tabs defaultValue="autofill" className="w-full flex flex-col">
      <div className="bg-white sticky top-0 w-f pt-4 pb-1 mb-1">
        <TabsList className="w-full h-[2.5em]">
          <TabsTrigger
            value="autofill"
            className="w-full flex gap-2 text-sm data-[state=active]:text-indigo-800"
          >
            <Pencil size={14} /> Autofill
          </TabsTrigger>
          <TabsTrigger
            value="profile"
            className="w-full flex gap-2 text-sm  data-[state=active]:text-indigo-800"
          >
            <User size={14} /> Profile
          </TabsTrigger>
        </TabsList>
        <div className="absolute -bottom-4 left-0 right-0 h-4 bg-linear-to-b from-white/60 to-transparent pointer-events-none" />
      </div>
      <TabsContent value="autofill">
        <Autofill savedMinutes={800} />
      </TabsContent>
      <TabsContent value="profile">
        <Profile />
      </TabsContent>
    </Tabs>
  );
}
