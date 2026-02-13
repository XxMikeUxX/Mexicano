    import React from "react";
    import { cn } from "@/lib/utils";
    
    type TimeSelectorProps = {
    selectedTime: string | null;
    onSelectTime: (time: string) => void;
    };
    
    export const TimeSelector = ({
    selectedTime,
    onSelectTime,
    }: TimeSelectorProps) => {
    const lunchSlots = ["12:00", "12:30", "13:00", "13:30", "14:00"];
    const dinnerSlots = [
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    ];
    
    const SlotButton = ({ time }: { time: string }) => (
    <button
    onClick={() => onSelectTime(time)}
    className={cn(
    "py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 border border-stone-200",
    selectedTime === time
    ? "bg-green-700 text-white border-green-700 shadow-md"
    : "bg-white hover:border-green-700 hover:text-green-700 text-stone-700"
    )}
    >
    {time}
    </button>
    );
    
    return (
    <div className="w-full max-w-[390px] mx-auto flex flex-col gap-6">
    <div>
    <h3 className="text-center text-sm uppercase tracking-wider text-stone-500 mb-4 font-semibold">
    Lunch
    </h3>
    <div className="grid grid-cols-3 gap-3">
    {lunchSlots.map((time) => (
    <SlotButton key={time} time={time} />
    ))}
    </div>
    </div>
    <div>
    <h3 className="text-center text-sm uppercase tracking-wider text-stone-500 mb-4 font-semibold">
    Dinner
    </h3>
    <div className="grid grid-cols-3 gap-3">
    {dinnerSlots.map((time) => (
    <SlotButton key={time} time={time} />
    ))}
    </div>
    </div>
    </div>
    );
    }