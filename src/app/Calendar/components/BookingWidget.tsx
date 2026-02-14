import React, { useState } from "react";
import { Calendar } from "./Calendar";
import { PeopleSelector } from "./PeopleSelector";
import { TimeSelector } from "./TimeSelector";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users, Clock } from "lucide-react";

type Step = "date" | "people" | "time";

export const BookingWidget = () => {
  const [step, setStep] = useState<Step>("date");
  const [date, setDate] = useState<Date | null>(null);
  const [people, setPeople] = useState<number>(2);
  const [time, setTime] = useState<string | null>(null);

  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    setStep("people");
  };

  const handlePeopleSelect = (num: number) => {
    setPeople(num);
    setStep("time");
  };

  const handleTimeSelect = async (selectedTime: string) => {
    setTime(selectedTime);

    // 🔥 ENVÍA REAL con DATE FIX
    try {
      console.log('📅 Enviando date:', date);  // Debug

      const res = await fetch("/api/reserva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: date ? format(date, "yyyy-MM-dd") : '',  // 🔥 FIX: ISO "2026-02-14"
          time: selectedTime,
          people,
          nom: "Cliente web",
          email: "mikeu171@gmail.com",
          telephone: "07 58 89 06 68",
        }),
      });

      const data = await res.json();
      console.log('📨 Response:', data);  // Debug

      if (res.ok) {
        alert(`✅ ${data.message || 'Reserva confirmada!'} Table ${data.mesa}`);
        // Reset widget
        setStep("date");
        setDate(null);
        setPeople(2);
        setTime(null);
      } else {
        alert(`❌ ${data.error || 'Error reserva'}`);
      }
    } catch (error) {
      console.error('Error fetch:', error);
      alert("❌ Error conexión. WhatsApp: 07 58 89 06 68");
    }
  };

  const TabButton = ({
    active,
    onClick,
    icon: Icon,
    label,
    value,
  }: {
    active: boolean;
    onClick: () => void;
    icon: any;
    label: string;
    value?: string;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 flex items-center justify-center gap-2 py-2 px-1 transition-all duration-200 relative overflow-hidden",
        active
          ? "text-green-700 bg-green-50"
          : "text-stone-400 hover:text-stone-600 hover:bg-stone-50"
      )}
    >
      <Icon className={cn("w-4 h-4", active ? "text-green-700" : "text-stone-400")} />
      <div className="flex flex-col items-start leading-none">
        <span className="text-[10px] uppercase tracking-wider font-semibold opacity-70">{label}</span>
        {value && <span className="text-xs font-medium truncate max-w-[60px]">{value}</span>}
      </div>
      {active && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-700" />
      )}
    </button>
  );

  return (
    <div className="w-full max-w-[450px] mx-auto bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-stone-200">
        <TabButton
          active={step === "date"}
          onClick={() => setStep("date")}
          icon={CalendarIcon}
          label="Date"
          value={date ? format(date, "MMM d") : undefined}
        />
        <div className="w-px bg-stone-200 my-2" />
        <TabButton
          active={step === "people"}
          onClick={() => setStep("people")}
          icon={Users}
          label="Guests"
          value={`${people} Pers.`}
        />
        <div className="w-px bg-stone-200 my-2" />
        <TabButton
          active={step === "time"}
          onClick={() => setStep("time")}
          icon={Clock}
          label="Time"
          value={time || undefined}
        />
      </div>
      
      {/* Content */}
      <div className="p-4 min-h-[380px] flex flex-col justify-center">
        {step === "date" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <Calendar selectedDate={date} onSelectDate={handleDateSelect} />
          </div>
        )}
        {step === "people" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <PeopleSelector
              selectedPeople={people}
              onSelectPeople={handlePeopleSelect}
            />
          </div>
        )}
        {step === "time" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <TimeSelector
              selectedTime={time}
              onSelectTime={handleTimeSelect}
            />
          </div>
        )}
      </div>
    </div>
  );
};
