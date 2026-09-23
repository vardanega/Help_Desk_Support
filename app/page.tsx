"use client";

import { useMemo, useState } from "react";
import { BarChart3, Bell, CheckCircle2, Clock3, Headphones, Inbox, LayoutDashboard, MessageSquareText, Search, Settings, Sparkles, TicketCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type TicketStatus = "Open" | "Waiting" | "Resolved";

const tickets = [
  { id: "#2841", subject: "Unable to update billing details", customer: "Elena Costa", status: "Open" as TicketStatus, priority: "High", updated: "4 min" },
  { id: "#2840", subject: "Workspace invitation not received", customer: "Marcus Lee", status: "Waiting" as TicketStatus, priority: "Normal", updated: "18 min" },
  { id: "#2839", subject: "Export includes duplicate entries", customer: "Sofia Martins", status: "Open" as TicketStatus, priority: "Normal", updated: "31 min" },
  { id: "#2838", subject: "Question about annual plan", customer: "Noah Wilson", status: "Resolved" as TicketStatus, priority: "Low", updated: "1 hr" },
  { id: "#2837", subject: "Dashboard loading slowly", customer: "Priya Shah", status: "Waiting" as TicketStatus, priority: "High", updated: "2 hr" },
];

const stats = [
  { label: "Open tickets", value: "24", note: "6 need a reply", icon: TicketCheck, style: "bg-indigo-50 text-indigo-600" },
  { label: "First response", value: "12m", note: "4m faster this week", icon: Clock3, style: "bg-emerald-50 text-emerald-700" },
  { label: "Resolved today", value: "38", note: "86% resolution rate", icon: CheckCircle2, style: "bg-amber-50 text-amber-700" },
  { label: "Customer score", value: "4.8", note: "From 126 responses", icon: Users, style: "bg-rose-50 text-rose-700" },
];

const nav = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Inbox", icon: Inbox, count: 12 },
  { label: "Customers", icon: Users },
  { label: "Reports", icon: BarChart3 },
];

function StatusBadge({ status }: { status: TicketStatus }) {
  const styles = { Open: "bg-emerald-50 text-emerald-700", Waiting: "bg-amber-50 text-amber-700", Resolved: "bg-slate-100 text-slate-600" };
  return <Badge className={`border-0 ${styles[status]}`}>{status}</Badge>;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | TicketStatus>("All");
  const filtered = useMemo(() => tickets.filter((ticket) => {
    const text = `${ticket.id} ${ticket.subject} ${ticket.customer}`.toLowerCase();
    return (status === "All" || ticket.status === status) && text.includes(query.toLowerCase());
  }), [query, status]);

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-white/10 bg-[#171a2b] text-white">
        <SidebarHeader className="px-5 py-6">
          <div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-xl bg-[#7cf2c4] text-[#12251e]"><Headphones className="size-5" /></span><div><p className="font-semibold">PulseDesk</p><p className="text-xs text-white/45">Support workspace</p></div></div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup><SidebarGroupLabel className="px-3 text-[11px] uppercase tracking-[.16em] text-white/35">Workspace</SidebarGroupLabel><SidebarGroupContent><SidebarMenu className="gap-1.5">{nav.map((item) => <SidebarMenuItem key={item.label}><SidebarMenuButton isActive={item.active} className="h-10 px-3 text-white/65 hover:bg-white/10 hover:text-white data-[active=true]:bg-[#7cf2c4] data-[active=true]:text-[#14231d]"><item.icon /><span>{item.label}</span>{item.count ? <span className="ml-auto text-xs">{item.count}</span> : null}</SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarGroupContent></SidebarGroup>
          <SidebarGroup><SidebarGroupLabel className="px-3 text-[11px] uppercase tracking-[.16em] text-white/35">Manage</SidebarGroupLabel><SidebarGroupContent><SidebarMenu><SidebarMenuItem><SidebarMenuButton className="h-10 px-3 text-white/65 hover:bg-white/10 hover:text-white"><Settings /><span>Settings</span></SidebarMenuButton></SidebarMenuItem></SidebarMenu></SidebarGroupContent></SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="m-3 rounded-xl border border-white/10 bg-white/5 p-3"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full bg-[#ffcf9e] text-sm font-semibold text-[#5b2f08]">AM</span><div><p className="text-sm font-medium">Alex Morgan</p><p className="text-xs text-white/45">Support lead</p></div></div></SidebarFooter>
      </Sidebar>

      <SidebarInset className="min-w-0 bg-[#f5f6f8]">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-white/90 px-4 backdrop-blur md:px-7"><SidebarTrigger className="md:hidden" /><div className="relative hidden max-w-sm flex-1 sm:block"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tickets or customers" aria-label="Search tickets or customers" className="h-10 border-0 bg-slate-100 pl-10 shadow-none" /></div><div className="ml-auto flex items-center gap-2"><Button variant="ghost" size="icon" aria-label="Notifications"><Bell className="size-5" /></Button><Button className="hidden rounded-xl bg-[#5966f2] text-white hover:bg-[#4853d8] sm:inline-flex"><MessageSquareText className="size-4" /> New ticket</Button></div></header>

        <div className="mx-auto w-full max-w-[1500px] p-4 md:p-7 lg:p-9">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="mb-1 flex items-center gap-2 text-sm font-medium text-[#5966f2]"><Sparkles className="size-4" /> Monday, 23 September</p><h1 className="text-3xl font-semibold tracking-[-.04em] md:text-4xl">Support overview</h1><p className="mt-2 text-slate-500">Here is what needs your team’s attention today.</p></div><p className="flex items-center gap-2 text-sm text-slate-500"><span className="size-2 rounded-full bg-emerald-500" /> All systems operational</p></div>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Support metrics">{stats.map((metric) => <Card key={metric.label} className="gap-5 rounded-2xl border-slate-200 py-5 shadow-sm"><CardHeader className="flex-row items-center justify-between px-5"><CardTitle className="text-sm font-medium text-slate-500">{metric.label}</CardTitle><span className={`grid size-9 place-items-center rounded-xl ${metric.style}`}><metric.icon className="size-[18px]" /></span></CardHeader><CardContent className="px-5"><p className="text-3xl font-semibold tracking-[-.04em]">{metric.value}</p><p className="mt-1 text-sm text-slate-500">{metric.note}</p></CardContent></Card>)}</section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,.75fr)]">
            <Card className="rounded-2xl border-slate-200 py-0 shadow-sm"><CardHeader className="flex-row items-center justify-between border-b px-5 py-5"><div><CardTitle className="text-lg">Recent tickets</CardTitle><p className="mt-1 text-sm text-slate-500">Latest conversations across the team</p></div><Button variant="outline" className="rounded-xl">View inbox</Button></CardHeader><CardContent className="px-0 pb-1"><div className="flex gap-2 overflow-x-auto px-5 py-4">{(["All", "Open", "Waiting", "Resolved"] as const).map((option) => <Button key={option} size="sm" variant={status === option ? "default" : "outline"} className={status === option ? "bg-[#5966f2]" : ""} onClick={() => setStatus(option)}>{option}</Button>)}</div><Table><TableHeader><TableRow className="bg-slate-50 hover:bg-slate-50"><TableHead className="px-5">Ticket</TableHead><TableHead>Customer</TableHead><TableHead>Status</TableHead><TableHead>Priority</TableHead><TableHead className="pr-5 text-right">Updated</TableHead></TableRow></TableHeader><TableBody>{filtered.map((ticket) => <TableRow key={ticket.id} className="cursor-pointer hover:bg-slate-50"><TableCell className="max-w-[270px] px-5 py-4"><p className="truncate font-medium">{ticket.subject}</p><p className="text-xs text-slate-400">{ticket.id}</p></TableCell><TableCell className="text-slate-600">{ticket.customer}</TableCell><TableCell><StatusBadge status={ticket.status} /></TableCell><TableCell className={ticket.priority === "High" ? "font-medium text-red-600" : "text-slate-600"}>{ticket.priority}</TableCell><TableCell className="pr-5 text-right text-slate-500">{ticket.updated}</TableCell></TableRow>)}</TableBody></Table>{filtered.length === 0 ? <p className="px-5 py-12 text-center text-sm text-slate-500">No tickets match your search.</p> : null}</CardContent></Card>

            <Card className="rounded-2xl border-slate-200 shadow-sm"><CardHeader><CardTitle className="text-lg">Conversation volume</CardTitle><p className="text-sm text-slate-500">384 tickets in the last 7 days</p></CardHeader><CardContent><div className="flex h-56 items-end gap-3 border-b pb-1" aria-label="Weekly ticket volume chart">{[38, 52, 45, 66, 58, 74, 61].map((value, index) => <div key={index} className="flex h-full flex-1 flex-col justify-end gap-2"><div className="flex flex-1 items-end"><div className="w-full rounded-t-md bg-[#5966f2]" style={{ height: `${value}%` }} /></div><span className="text-center text-xs text-slate-400">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}</span></div>)}</div><div className="mt-6 rounded-xl bg-indigo-50 p-4"><p className="text-sm font-medium text-indigo-700">Peak time: 10:00–12:00</p><p className="mt-1 text-sm text-indigo-500">Schedule one more agent during the morning shift.</p></div></CardContent></Card>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
