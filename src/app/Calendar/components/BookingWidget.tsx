"use client";

import React, { useMemo, useState } from "react";
import { Calendar } from "./Calendar";
import { PeopleSelector } from "./PeopleSelector";
import { TimeSelector } from "./TimeSelector";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users, Clock } from "lucide-react";
import { z } from "zod";
import { fr } from "date-fns/locale";


type Step = "date" | "people" | "time";

const reservaSchema = z.object({
  date: z.date({ error: "Choisis une date" }),
  time: z.string().min(1, { error: "Choisis une heure" }),
  people: z.coerce.number().int().min(1).max(12),
  name: z.string().min(2, { error: "Ecris votre nom" }),
  phone: z
    .string()
    .min(6, { error: "Numéro de téléphone trop court" })
    .max(20, { error: "Numéro de téléphone trop long" })
    .regex(/^[0-9+().\s-]+$/, { error: "Numéro de téléphone invalide" }),
});

export const BookingWidget = () => {
  const [step, setStep] = useState<Step>("date");

  const [date, setDate] = useState<Date | null>(null);
  const [people, setPeople] = useState<number>(2);
  const [time, setTime] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canAskContact = useMemo(() => {
    return !!date && !!time && !!people;
  }, [date, time, people]);

  const handleDateSelect = (selectedDate: Date) => {
    setDate(selectedDate);
    setStep("people");
  };

  const handlePeopleSelect = (num: number) => {
    setPeople(num);
    setStep("time");
  };

  // IMPORTANTE: ya NO enviamos aquí; solo guardamos la hora
  const handleTimeSelect = (selectedTime: string) => {
    setTime(selectedTime);
  };

  const resetAll = () => {
    setStatus("idle");
    setErrorMsg(null);

    setStep("date");
    setDate(null);
    setPeople(2);
    setTime(null);

    setName("");
    setPhone("");
  };

  const submitReserva = async () => {
    setErrorMsg(null);

    const check = reservaSchema.safeParse({
      date: date ?? undefined,
      time: time ?? "",
      people,
      name,
      phone,
    });

    if (!check.success) {
      setErrorMsg(check.error.issues[0]?.message ?? "Données invalides");
      return;
    }

    try {
      setStatus("submitting");

      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: format(check.data.date, "yyyy-MM-dd"),
          time: check.data.time,
          people: check.data.people,
          nom: check.data.name,
          email: "mikeu1807@gmail.com", // si tu API lo requiere, lo dejamos fijo por ahora
          telephone: check.data.phone,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data?.error || "Erreur de réservation");
      }
    } catch (error) {
      console.error("Error fetch:", error);
      setStatus("error");
      setErrorMsg("Erreur de connexion. Veuillez réessayer.");
    }
  };

 if (status === "success") {
  return (
    <div className="rounded-xl border p-6 text-center bg-white">
      <h3 className="text-xl font-semibold">Merci de nous avoir choisis</h3>

      <p className="mt-2 text-muted-foreground">
        Nous avons bien reçu votre réservation pour{" "}
        <strong>
          {date ? format(date, "PPP", { locale: fr }) : "—"}
          {time ? ` à ${time}` : ""}
        </strong>
        .
      </p>

      <button
        type="button"
        onClick={resetAll}
        className="mt-5 w-full rounded-md bg-green-700 text-white py-2"
      >
        Faire une autre réservation
      </button>
    </div>
  );
}


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
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 flex items-center justify-center gap-2 py-2 px-1 transition-all duration-200 relative overflow-hidden",
        active ? "text-green-700 bg-green-50" : "text-stone-400 hover:text-stone-600 hover:bg-stone-50"
      )}
    >
      <Icon className={cn("w-4 h-4", active ? "text-green-700" : "text-stone-400")} />
      <div className="flex flex-col items-start leading-none">
        <span className="text-[10px] uppercase tracking-wider font-semibold opacity-70">{label}</span>
        {value && <span className="text-xs font-medium truncate max-w-[60px]">{value}</span>}
      </div>
      {active && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-700" />}
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
          value={date ? format(date, "d MMM", { locale: fr }) : undefined}

        />
        <div className="w-px bg-stone-200 my-2" />
        <TabButton
          active={step === "people"}
          onClick={() => setStep("people")}
          icon={Users}
          label="Personnes"
          value={`${people} Pers.`}
        />
        <div className="w-px bg-stone-200 my-2" />
        <TabButton
          active={step === "time"}
          onClick={() => setStep("time")}
          icon={Clock}
          label="Heure"
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
            <PeopleSelector selectedPeople={people} onSelectPeople={handlePeopleSelect} />
          </div>
        )}

        {step === "time" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-4">
            <TimeSelector
              selectedDate={date}
              selectedTime={time}
              onSelectTime={handleTimeSelect}
            />


            {/* Mini formulario: aparece SOLO cuando ya hay fecha + hora + personas */}
            {canAskContact && (
              <div className="space-y-3 pt-2">
                <input
                  className="w-full rounded-md border border-stone-200 px-3 py-2 outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  className="w-full rounded-md border border-stone-200 px-3 py-2 outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="+33 6..."
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

                <button
                  onClick={submitReserva}
                  disabled={status === "submitting"}
                  className="w-full rounded-md bg-green-700 text-white py-2 disabled:opacity-50"
                >
                  {status === "submitting" ? "Envoi en cours..." : "Confirmer la réservation"}
                </button>

                {status === "error" && (
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="w-full rounded-md border border-stone-200 py-2"
                  >
                    Essayer une autre date/heure
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
