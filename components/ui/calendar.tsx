import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, ...props }: CalendarProps) {
  return (
    <DayPicker
      className={cn("p-2", className)}
      classNames={{
        months: "flex flex-col gap-4",
        month: "space-y-2",
        caption: "flex justify-between items-center px-2",
        caption_label: "text-sm font-semibold text-[#1e293b]",
        nav: "flex items-center gap-1",
        nav_button:
          "h-8 w-8 rounded-full border border-[#e2e8f0] text-[#475569] hover:bg-[#eef2ff]",
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell: "w-9 text-xs text-[#94a3b8]",
        row: "flex w-full mt-2",
        cell: "relative h-9 w-9 text-center text-sm text-[#1e293b]",
        day: "h-9 w-9 rounded-full hover:bg-[#eef2ff]",
        day_selected: "bg-[#4f46e5] text-white hover:bg-[#4338ca]",
        day_today: "border border-[#6366f1]",
        day_outside: "text-[#cbd5f5]",
        ...classNames,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
