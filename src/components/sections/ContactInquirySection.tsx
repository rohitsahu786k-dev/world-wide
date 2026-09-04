"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { siteData } from "@/data/siteData";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export function ContactInquirySection({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage();
  const whatsappUrl = `https://wa.me/${siteData.company.contact.whatsapp.replace(/[^0-9]/g, "")}`;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    country: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className={`${compact ? "py-16" : "py-24"} bg-slate-50 text-[#071321]`} id="contact-form">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto ${compact ? "mb-10" : "mb-16"} space-y-4`}>
          <span className="inline-block rounded-full bg-[#00A884]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#00A884]">
            {t("Business Inquiries", "Consultas Comerciales")}
          </span>
          <h2 className="text-3xl font-semibold sm:text-5xl text-[#071321] tracking-tight">
            {t("Connect with Worldwide Supply 28 SL", "Conéctese con Worldwide Supply 28 SL")}
          </h2>
          <p className="text-base text-slate-600">
            {t(
              "Send us your wholesale requirement or distribution proposal. Our executive team will respond promptly.",
              "Envíenos sus requisitos de compra al por mayor o propuesta de distribución. Nuestro equipo ejecutivo le responderá con rapidez."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Col 1: Contact Details & Info */}
          <div className="space-y-8 bg-[#071321] text-white p-8 sm:p-10 rounded-3xl border border-[#071321] flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t("Valencia Headquarters", "Sede Central en Valencia")}
                </h3>
                <p className="text-xs text-white/70">Worldwide Supply 28 SL</p>
              </div>

              <ul className="space-y-5 text-xs text-white/80">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#00A884] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-0.5">{t("Address", "Dirección")}</span>
                    <span>{siteData.company.location.address}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[#00A884] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-0.5">{t("WhatsApp & Mobile (24/7)", "WhatsApp y Móvil (24/7)")}</span>
                    <a href={`https://wa.me/${siteData.company.contact.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#00A884] font-bold block text-sm">
                      {siteData.company.contact.whatsapp} <span className="text-[10px] text-[#00A884] uppercase font-extrabold ml-1">(Main)</span>
                    </a>
                    {siteData.company.contact.whatsappSecondary && (
                      <a href={`https://wa.me/${siteData.company.contact.whatsappSecondary.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#00A884] text-xs text-white/80 block mt-1">
                        WhatsApp: {siteData.company.contact.whatsappSecondary}
                      </a>
                    )}
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#00A884] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-0.5">{t("Email", "Correo Electrónico")}</span>
                    <a href={`mailto:${siteData.company.contact.email}`} className="hover:text-[#00A884]">
                      {siteData.company.contact.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[#00A884] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-0.5">{t("Business Hours", "Horario Comercial")}</span>
                    <span>{t(siteData.company.contact.hours.en, siteData.company.contact.hours.es)}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-white/10 text-[11px] text-white/50 space-y-1">
              <p>Registered Company in Spain – Tax ID (CIF): <span className="text-white font-semibold">{siteData.company.cif}</span></p>
            </div>
          </div>

          {/* Col 2 & 3: Official Form */}
          <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-emerald-100 text-[#00A884] flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#071321]">
                  {t("Inquiry Received Successfully!", "¡Consulta Recibida con Éxito!")}
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  {t(
                    "Thank you for reaching out to Worldwide Supply 28 SL. Our team will review your inquiry and get back to you shortly.",
                    "Gracias por ponerse en contacto con Worldwide Supply 28 SL. Nuestro equipo revisará su consulta y le responderá a la brevedad."
                  )}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 rounded-full bg-[#071321] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#00A884] transition"
                >
                  {t("Submit Another Inquiry", "Enviar Otra Consulta")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      {t("Full Name", "Nombre Completo")} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexander Wright"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#071321] focus:border-[#00A884] focus:bg-white focus:outline-none transition"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      {t("Company Name", "Nombre de la Empresa")} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Prestige Retailers Group"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#071321] focus:border-[#00A884] focus:bg-white focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Country */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      {t("Country", "País")} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Spain / Europe / Asia"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#071321] focus:border-[#00A884] focus:bg-white focus:outline-none transition"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      {t("Email Address", "Correo Electrónico")} *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#071321] focus:border-[#00A884] focus:bg-white focus:outline-none transition"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      {t("Phone Number", "Teléfono")} *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+34 600 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#071321] focus:border-[#00A884] focus:bg-white focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    {t("Inquiry Message / Product Categories Required", "Mensaje de Consulta / Categorías Requeridas")} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your wholesale inquiry or sourcing requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#071321] focus:border-[#00A884] focus:bg-white focus:outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-[#00A884] px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition hover:bg-[#009272]"
                >
                  <Send className="h-4 w-4" />
                  <span>{t("Send Wholesale Inquiry", "Enviar Consulta Mayorista")}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
