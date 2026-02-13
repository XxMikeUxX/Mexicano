"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";  // Calendario francés
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  nom: z.string().min(2, "Nom trop court"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(10, "Téléphone incomplet"),
  date_resa: z.date({ message: "Choisissez une date" }),
  heure: z.enum(["19:00", "21:00"], { message: "Service: 19h ou 21h (Ven/Sam seulement)" }),
  personnes: z.coerce.number().min(1, "Min 1 personne").max(20, "Max 20 personnes"),
  mesa_id: z.number({ message: "Sélectionnez une table disponible" }),
});

type FormData = z.infer<typeof formSchema>;

export default function PageReservas() {
  const [dateResa, setDateResa] = useState<Date>();
  const [mesasLibres, setMesasLibres] = useState<{ id: number; numero: number; capacite: number }[]>([]);
  const [chargement, setChargement] = useState(false);
  const [dispoOk, setDispoOk] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { heure: "19:00", personnes: 2 },
  });

  useEffect(() => {
    if (dateResa && form.watch("heure") && form.watch("personnes")) {
      verifierDisponibilite();
    }
  }, [dateResa, form.watch("heure"), form.watch("personnes")]);

  async function verifierDisponibilite() {
    const values = form.getValues();
    if (!dateResa) return;
    setChargement(true);
    const params = new URLSearchParams({
      date: dateResa.toISOString().split('T')[0],
      heure: values.heure,
      personnes: values.personnes.toString(),
    });
    const res = await fetch(`/api/disponibles?${params}`);
    const data = await res.json();
    setMesasLibres(data.mesas || []);
    setDispoOk(data.mesas && data.mesas.length > 0);
    setChargement(false);
  }

  async function onSubmit(values: FormData) {
    const res = await fetch("/api/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, date_resa: dateResa!.toISOString().split('T')[0] }),
    });
    if (res.ok) {
      alert("✅ Réservation confirmée! Nous vous contactons sous 24h. Merci! 🌮");
      form.reset();
      setMesasLibres([]);
    } else {
      alert("❌ Erreur: Table plus disponible. Vérifiez et réessayez.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-100 py-20 px-4">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-orange-200">
        <h1 className="text-5xl font-bold text-center mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Réservations
        </h1>
        <p className="text-center text-xl text-muted-foreground mb-12">
          Vendredis & Samedis • Services: 19h00 ou 21h00
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Nom complet</FormLabel>
                  <FormControl>
                    <Input className="text-lg h-14" placeholder="Dupont Jean" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Email</FormLabel>
                    <FormControl>
                      <Input className="h-14" type="email" placeholder="jean@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telephone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Téléphone</FormLabel>
                    <FormControl>
                      <Input className="h-14" placeholder="06 XX XX XX XX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="date_resa"
                render={() => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-lg font-semibold">Date (Ven/Sam)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full h-14 justify-start text-left font-normal text-lg",
                              !dateResa && "text-muted-foreground"
                            )}
                          >
                            {dateResa ? format(dateResa, "EEE d MMM", { locale: fr }) : <span>Choisir date</span>}
                            <CalendarIcon className="ml-auto h-6 w-6 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          locale={fr}
                          selected={dateResa}
                          onSelect={setDateResa}
                          initialFocus
                          className="p-3"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="heure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Service</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-14">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="19:00">🍽️ 19h00 (Premier service)</SelectItem>
                        <SelectItem value="21:00">🍽️ 21h00 (Deuxieme service)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="personnes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Nombre de personnes</FormLabel>
                  <Select onValueChange={(val) => field.onChange(parseInt(val))}>
                    <FormControl>
                      <SelectTrigger className="h-14">
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((p) => (
                        <SelectItem key={p} value={p}>{p} personne{p > 1 ? 's' : ''}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mesa_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Table disponible</FormLabel>
                  <Select onValueChange={(val) => field.onChange(parseInt(val))} disabled={!dispoOk}>
                    <FormControl>
                      <SelectTrigger className="h-14">
                        <SelectValue>
                          {mesasLibres.length > 0
                            ? `(${mesasLibres.length}) Tables libres`
                            : chargement
                            ? "Vérification..."
                            : "Vérifiez d'abord"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mesasLibres.map((mesa) => (
                        <SelectItem key={mesa.id} value={mesa.id}>
                          Table {mesa.numero} ({mesa.capacite} places)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              onClick={verifierDisponibilite}
              className="w-full h-14 text-lg font-semibold bg-orange-600 hover:bg-orange-700"
              disabled={chargement}
            >
              {chargement ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Vérification...
                </>
              ) : (
                "🔍 Vérifier Disponibilité"
              )}
            </Button>

            <Button
              type="submit"
              className="w-full h-16 text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700"
              disabled={!dispoOk || chargement || !form.formState.isValid}
            >
              ✅ Confirmer Réservation
            </Button>
          </form>
        </Form>

        <div className="mt-16 pt-12 border-t border-orange-200 text-center text-sm text-muted-foreground space-y-2">
          <p>📍 Mexican'o Lyon • 56 Av Paul Santy, 69008 Lyon</p>
          <p>📞 04 XX XX XX XX • T6 Arrêt Pressence</p>
          <p className="text-xs">* Confimation par téléphone sous 24h. Annulations gratuites.</p>
        </div>
      </div>
    </div>
  );
}
