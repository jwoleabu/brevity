import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Pencil, User } from 'lucide-react';
import { Autofill } from "../custom/autofill";
import { Profile } from "../custom/profile";

export function Navigation() {
  return (
    <Tabs defaultValue="autofill" className="w-full flex flex-col">
      <div className="bg-white sticky top-0 w-f pt-4 pb-4" >
      <TabsList className="w-full h-[2.5em]">
        <TabsTrigger value="autofill" className="w-full flex gap-2 text-sm data-[state=active]:text-[#6D5DCD]"><Pencil size={14}/> Autofill</TabsTrigger>
        <TabsTrigger value="profile" className="w-full flex gap-2 text-sm  data-[state=active]:text-[#6D5DCD]"><User size={14}/> Profile</TabsTrigger>
      </TabsList>
      </div>
      <TabsContent value="autofill">
        <Autofill savedMinutes={800}/>
      </TabsContent>
      <TabsContent value="profile">
        <Profile/>
      </TabsContent>
    </Tabs>
  )
}
