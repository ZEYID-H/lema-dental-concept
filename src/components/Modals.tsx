import React, { useState, useRef } from "react";
import { X, Upload, Calendar, Phone, CheckCircle2, Shield, Sparkles } from "lucide-react";
import { branches, treatments } from "../data";
import { cdnImg } from "../lib/img";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Booking Modal
export function BookingModal({ isOpen, onClose }: ModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "basaksehir",
    treatment: "smile-design",
    date: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 1500);
  };

  const selectedBranch = branches.find((b) => b.id === formData.branch);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-300 z-10">
        {/* Header background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-on-surface-variant hover:text-white p-2 rounded-full hover:bg-white/5 transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="p-8 relative">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-primary font-semibold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Luxury Concierge Service
              </span>
              <h3 className="font-serif text-2xl text-white">Book Free Consultation</h3>
              <p className="text-sm text-on-surface-variant mt-1">
                Begin your bespoke journey to a masterpiece smile.
              </p>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elizabeth Sterling"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. elizabeth@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +1 (416) 555-0199"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Preferred Location
                  </label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.city})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Treatment Goal
                  </label>
                  <select
                    value={formData.treatment}
                    onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  >
                    {treatments.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  Preferred Consult Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  Additional Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Share details about your expectations, dental history, or timeline."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-on-primary font-semibold py-4 rounded-xl text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                    Securing Suite Reservation...
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" /> Secure Consult Reservation
                  </>
                )}
              </button>
              <div className="flex items-center justify-center gap-1.5 text-xs text-on-surface-variant">
                <Shield className="w-3.5 h-3.5 text-primary/70" /> Private and encrypted consultation booking
              </div>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center relative flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">
              Suite Blocked Successfully
            </span>
            <h3 className="font-serif text-3xl text-white mb-3">Reservation Pending</h3>
            <p className="text-sm text-on-surface-variant max-w-sm mb-6">
              Thank you, <strong>{formData.name}</strong>. A dedicated concierge specialist from our <strong>{selectedBranch?.name}</strong> has been assigned to you.
            </p>
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-left space-y-2 mb-8 text-xs">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Reference ID:</span>
                <span className="font-mono text-white">LMA-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Assigned Clinic:</span>
                <span className="text-white font-medium">{selectedBranch?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Consultation Type:</span>
                <span className="text-white font-medium">Digital Smile Consult</span>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant/80">
              We will contact you via phone/WhatsApp at <strong>{formData.phone}</strong> within 15 minutes.
            </p>
            <button
              onClick={() => {
                setStep(1);
                onClose();
              }}
              className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-all"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Send X-Ray / Document Modal (supports drag-and-drop & simulated upload)
export function XRayModal({ isOpen, onClose }: ModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(-1); // -1 = idle, 0-100 = progress, 101 = completed
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (newFiles: File[]) => {
    // Only accept image / document types
    const validFiles = newFiles.filter(
      (f) =>
        f.type.startsWith("image/") ||
        f.name.endsWith(".dcm") ||
        f.name.endsWith(".pdf")
    );
    setFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 101; // Completed
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-300 z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-on-surface-variant hover:text-white p-2 rounded-full hover:bg-white/5 transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 relative">
          <div className="mb-6">
            <span className="text-xs uppercase tracking-widest text-primary font-semibold flex items-center gap-1.5 mb-1">
              <Upload className="w-3.5 h-3.5" /> SECURE TREATMENT MAPPING
            </span>
            <h3 className="font-serif text-2xl text-white">Send Your X-Ray</h3>
            <p className="text-sm text-on-surface-variant mt-1">
              Upload panoral scans or photographs for a preliminary, comprehensive dental plan.
            </p>
          </div>

          {uploadProgress === -1 ? (
            <div className="space-y-6">
              {/* Drag Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
                  isDragOver 
                    ? "border-primary bg-primary/5 scale-[0.99]" 
                    : "border-white/10 bg-white/5 hover:border-primary/40 hover:bg-white/10"
                }`}
              >
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  accept="image/*,.pdf,.dcm"
                />
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm text-white font-medium mb-1">
                  Drag and drop files here
                </p>
                <p className="text-xs text-on-surface-variant text-center max-w-[240px]">
                  Supports JPG, PNG, PDF or DICOM dental X-rays (max 20MB)
                </p>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                    Selected Documents ({files.length})
                  </h4>
                  <div className="max-h-32 overflow-y-auto space-y-1.5 pr-1">
                    {files.map((file, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white"
                      >
                        <span className="truncate max-w-[70%] font-medium">{file.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-on-surface-variant font-mono">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="text-on-surface-variant hover:text-red-400 p-1"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="button"
                disabled={files.length === 0}
                onClick={handleUpload}
                className="w-full bg-primary text-on-primary font-semibold py-4 rounded-xl text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Encrypt & Submit Files
              </button>
            </div>
          ) : uploadProgress <= 100 ? (
            <div className="py-12 flex flex-col items-center">
              <div className="relative w-24 h-24 flex items-center justify-center mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-white/5" />
                <div 
                  className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" 
                  style={{ animationDuration: "1.5s" }}
                />
                <span className="font-serif text-lg text-white font-medium">{uploadProgress}%</span>
              </div>
              <h4 className="font-serif text-xl text-white mb-2">Encrypting Transmission</h4>
              <p className="text-xs text-on-surface-variant max-w-xs text-center">
                Establishing a medical-grade end-to-end encrypted connection to our central diagnostics grid...
              </p>
              
              {/* Progress Bar Container */}
              <div className="w-full max-w-xs bg-white/5 h-1.5 rounded-full mt-8 overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-150" 
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 animate-pulse">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">
                Secure Uplink Complete
              </span>
              <h3 className="font-serif text-2xl text-white mb-3">Transmission Handover</h3>
              <p className="text-sm text-on-surface-variant max-w-sm mb-6">
                Your diagnostic documents have been safely received and stored on our HIPAA-compliant server.
              </p>
              <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-left mb-8 space-y-1 text-on-surface-variant">
                <div>• Review status: <strong className="text-primary font-medium">Under Diagnostic Consultation</strong></div>
                <div>• Expected response time: <strong className="text-white">2-4 Hours</strong></div>
                <div>• Case Coordinator notification sent via email.</div>
              </div>
              <button
                onClick={() => {
                  setFiles([]);
                  setUploadProgress(-1);
                  onClose();
                }}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-all"
              >
                Return to Clinic Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Call Back Request Modal
export function CallBackModal({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-300 z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-on-surface-variant hover:text-white p-2 rounded-full hover:bg-white/5 transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 relative">
          {step === 1 ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-primary font-semibold flex items-center gap-1.5 mb-1">
                  <Phone className="w-3.5 h-3.5" /> Express Call-back
                </span>
                <h3 className="font-serif text-2xl text-white">Request Call Back</h3>
                <p className="text-sm text-on-surface-variant mt-1">
                  Leave your number and a medical consultant will contact you instantly.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sterling Hunt"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +90 533 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 bg-primary text-on-primary font-semibold py-4 rounded-xl text-sm flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "Connecting to Operator..." : "Call Me Back"}
              </button>
            </form>
          ) : (
            <div className="text-center flex flex-col items-center py-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 animate-ping" style={{ animationDuration: "2s" }}>
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-white mb-2">Request Lodged</h3>
              <p className="text-sm text-on-surface-variant max-w-xs mb-6">
                Thank you, <strong>{formData.name}</strong>. An available smile coordinator has been assigned to phone <strong>{formData.phone}</strong>.
              </p>
              <span className="text-xs text-primary font-medium px-4 py-2 bg-primary/10 rounded-full">
                Estimated call-back: Under 5 mins
              </span>
              <button
                onClick={onClose}
                className="mt-8 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold transition-all"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Lightbox modal for viewing locations / image showcase
interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
  description: string;
}

export function LightboxModal({ isOpen, onClose, image, title, description }: LightboxProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-pointer"
        onClick={onClose}
      />

      <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl animate-in fade-in zoom-in duration-300 z-10 flex flex-col md:flex-row">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-white bg-black/60 hover:bg-black p-2.5 rounded-full border border-white/10 transition-all z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image portion */}
        <div className="w-full md:w-3/5 aspect-video md:aspect-square relative bg-black flex items-center justify-center">
          <img
            src={cdnImg(image, 1024)}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info portion */}
        <div className="w-full md:w-2/5 p-8 flex flex-col justify-between bg-zinc-950">
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-1 block">
                LEMA LUXURY SUITES
              </span>
              <h3 className="font-serif text-3xl text-white">{title}</h3>
            </div>

            <p className="text-sm text-on-surface-variant leading-relaxed">
              {description}
            </p>

            <div className="border-t border-white/5 pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs">
                  ★
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">5.0 Star Accreditation</div>
                  <div className="text-[10px] text-on-surface-variant">Globally Certified Medical Facilities</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Multilingual Medical Concierge</div>
                  <div className="text-[10px] text-on-surface-variant">English, German, French, Italian & Arabic</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <button
              onClick={() => {
                onClose();
                // We'll let this trigger the appointment
                window.dispatchEvent(new CustomEvent("open-booking"));
              }}
              className="w-full bg-primary text-on-primary font-semibold py-4 rounded-xl text-xs flex items-center justify-center gap-2 hover:brightness-110 active:scale-98 transition-all"
            >
              Book Premium Tour & Consult
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
