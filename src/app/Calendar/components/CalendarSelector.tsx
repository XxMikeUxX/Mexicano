"use client";

import { Controller } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface CalendarSelectorProps {
  control: any;
}

export default function CalendarSelector({ control }: CalendarSelectorProps) {
  return (
    <Controller
      control={control}
      name="date_resa"
      render={({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal h-14 rounded-xl border-2 border-gray-200 hover:border-orange-400",
                !field.value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-5 w-5" />
              {field.value ? format(field.value, "PPP", { locale: fr }) : "Choisir date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              locale={fr}
              className="rounded-md border-0"
            />
          </PopoverContent>
        </Popover>
      )}
    />
  );
}
