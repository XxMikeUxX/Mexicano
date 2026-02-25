import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

type TimeSelectorProps = {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
};

export const TimeSelector = ({ selectedDate, selectedTime, onSelectTime }: TimeSelectorProps) => {
  const defaultLunchSlots = ["12:00", "12:30", "13:00", "13:30", "14:00"];

  const defaultDinnerSlots = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];

  const friSatDinnerSlots = ["17:00", "21:00"]; // <-- solo viernes/sábado

  const { lunchSlots, dinnerSlots, isClosed } = useMemo(() => {
    if (!selectedDate) {
      return { lunchSlots: defaultLunchSlots, dinnerSlots: defaultDinnerSlots, isClosed: false };
    }

    const day = selectedDate.getDay(); // 0 dom ... 6 sáb

    // Lunes cerrado
    if (day === 1) {
      return { lunchSlots: [], dinnerSlots: [], isClosed: true };
    }

    // Viernes (5) o sábado (6): cena solo 17:00 y 21:00
    if (day === 5 || day === 6) {
      return { lunchSlots: defaultLunchSlots, dinnerSlots: friSatDinnerSlots, isClosed: false };
    }

    // Resto de días: normal
    return { lunchSlots: defaultLunchSlots, dinnerSlots: defaultDinnerSlots, isClosed: false };
  }, [selectedDate]);

  const SlotButton = ({ time }: { time: string }) => (
    <button
      type="button"
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

  if (isClosed) {
    return (
      <div className="w-full max-w-[390px] mx-auto">
        <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-center">
          <p className="font-semibold text-stone-800">Lundi Fermé</p>
          <p className="text-sm text-stone-600 mt-1">Veuillez choisir une autre date.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[390px] mx-auto flex flex-col gap-6">
      <div>
        <h3 className="text-center text-sm uppercase tracking-wider text-stone-500 mb-4 font-semibold">
          Déjeuner
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {lunchSlots.map((time) => (
            <SlotButton key={time} time={time} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-center text-sm uppercase tracking-wider text-stone-500 mb-4 font-semibold">
          Diner
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {dinnerSlots.map((time) => (
            <SlotButton key={time} time={time} />
          ))}
        </div>
      </div>
    </div>
  );
};
