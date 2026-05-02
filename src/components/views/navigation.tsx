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
    <Tabs defaultValue="profile" className="w-full flex flex-col">
      <TabsList className="w-full h-[2.5em] mb-5">
        {/* <TabsTrigger value="autofill" className="w-full flex items-baseline gap-2 text-[0.875em] px-[0.75em] py-[0.375em]"><Pencil size={16}/> Autofill</TabsTrigger>
        <TabsTrigger value="profile" className="w-full flex items-baseline gap-2 text-[0.875em] px-[0.75em] py-[0.375em]"><User size={16}/> Profile</TabsTrigger> */}
        <TabsTrigger value="autofill" className="w-full flex gap-2 text-sm"><Pencil size={14}/> Autofill</TabsTrigger>
        <TabsTrigger value="profile" className="w-full flex gap-2 text-sm"><User size={14}/> Profile</TabsTrigger>
      </TabsList>
      <TabsContent value="autofill">
        <Autofill savedMinutes={800}/>
      </TabsContent>
      <TabsContent value="profile">
        <Profile/>
      </TabsContent>
    </Tabs>
  )
}
