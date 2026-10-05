"use client";

import React, { useId, useRef, useState } from "react";
import { useForm, useWatch, type FieldErrors, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CALIFORNIA_COMMUNITY_COLLEGES } from "./colleges";
import { INTEREST_OPTIONS, OTHER_COLLEGE, TSHIRT_SIZES, registrationSchema, type RegistrationFormData } from "./schema";
import { submitRegistration } from "./actions";
import { ApplicationReceived } from "./RegistrationReceivedCard";
import { TurnstileWidget } from "./TurnstileWidget";
import { caretAfterDigits, formatPhone } from "./phone";
import { Button } from "@/components/ui/Button";

type StepId = 1 | 2 | 3 | 4;

const STEPS: { id: StepId; title: string; fields: FieldPath<RegistrationFormData>[] }[] = [
  { id: 1, title: "About you", fields: ["name", "email", "phone", "college", "otherCollege", "ageCheck"] },
  { id: 2, title: "Interests", fields: ["interests", "isFirstTimer"] },
  { id: 3, title: "Logistics", fields: ["tshirtSize", "dietaryRestrictions"] },
  { id: 4, title: "Review and submit", fields: ["codeOfConduct"] },
];

/** The element to focus for each field when it has an error. */
const FIELD_FOCUS_ID: Record<string, string> = {
  name: "apply-name",
  email: "apply-email",
  phone: "apply-phone",
  college: "apply-college",
  otherCollege: "apply-other-college",
  ageCheck: "apply-age",
  interests: "apply-interest-0",
  tshirtSize: `apply-size-${TSHIRT_SIZES[0]}`,
  dietaryRestrictions: "apply-dietary",
  codeOfConduct: "apply-coc",
};

const CODE_OF_CONDUCT = [
  "Be respectful, welcoming, and collaborative. Harassment, discrimination, or abusive behavior means immediate removal.",
  "Write your project during the hackathon. Bringing in existing project code isn't allowed.",
  "Look out for each other and keep the event safe, inclusive, and fun.",
];

const inputBase =
  "w-full min-h-12 rounded-xl border-2 bg-night px-3.5 py-2.5 text-base text-cream placeholder:text-mist/60 " +
  "transition-colors duration-150 focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-action/25";

const inputClass = (invalid: boolean) =>
  `${inputBase} ${invalid ? "border-error focus:border-error" : "border-line-strong focus:border-action"}`;

const choiceClass =
  "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border-2 border-line-strong bg-night px-3.5 text-[15px] text-cream transition-colors duration-150 " +
  "hover:border-cream/70 has-[:checked]:border-action has-[:checked]:bg-action/10 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-action/25";

const describedBy = (...ids: (string | false | undefined)[]) => ids.filter(Boolean).join(" ") || undefined;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-[15px] font-medium text-error">
      <svg aria-hidden viewBox="0 0 20 20" className="mt-0.5 size-4 shrink-0 fill-current">
        <path d="M10 1.5 19 18H1L10 1.5Zm-1 6v5h2v-5H9Zm0 6.5v2h2v-2H9Z" />
      </svg>
      <span>
        <span className="sr-only">Error: </span>
        {message}
      </span>
    </p>
  );
}

function Label({ htmlFor, children, optional }: { htmlFor?: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-[15px] font-bold text-cream">
      {children}
      {optional && <span className="ml-1.5 font-normal text-mist">(optional)</span>}
    </label>
  );
}

function Hint({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1 text-sm text-mist">
      {children}
    </p>
  );
}

/** Search by name or by acronym ("OCC"), always offering "Other / Not Listed". */
function filterColleges(query: string): string[] {
  const q = query.toLowerCase().trim();
  const matches = CALIFORNIA_COMMUNITY_COLLEGES.filter(college => {
    if (!q) return true;
    if (college.toLowerCase().includes(q)) return true;
    const acronym = college
      .split(/\s+/)
      .map(word => word.replace(/[^a-zA-Z]/g, ""))
      .filter(Boolean)
      .map(word => word[0])
      .join("")
      .toLowerCase();
    return acronym.startsWith(q);
  });
  return [...matches, OTHER_COLLEGE];
}

type FormApi = ReturnType<typeof useForm<RegistrationFormData>>;
type StepProps = { register: FormApi["register"]; errors: FieldErrors<RegistrationFormData> };

export function ApplyForm() {
  const [step, setStep] = useState<StepId>(1);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  // A ref, not state, so a fast double click can't start two submissions before React re-renders.
  const submittingRef = useRef(false);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    getFieldState,
    setError,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      interests: [],
      isFirstTimer: false,
      ageCheck: false,
      codeOfConduct: false,
      dietaryRestrictions: "",
    },
    // Validate a field when you leave it, then live as you fix it.
    mode: "onTouched",
    // Answers from earlier steps stay in the form when their inputs unmount.
    shouldUnregister: false,
  });

  const values = useWatch({ control });
  const current = STEPS[step - 1];

  const focusField = (field?: string) => {
    if (field) requestAnimationFrame(() => document.getElementById(FIELD_FOCUS_ID[field])?.focus());
  };

  const goTo = (target: StepId) => {
    setStep(target);
    setSubmitError(null);
    // Announce the new step to screen readers and bring it into view.
    requestAnimationFrame(() => {
      stepHeadingRef.current?.focus({ preventScroll: true });
      stepHeadingRef.current?.scrollIntoView({ block: "nearest" });
    });
  };

  /**
   * Validates one step. The schema's "Other college needs a name" rule only runs once every
   * field parses, so it is checked here too; otherwise step 1 would pass and the final submit
   * would fail on a field that is no longer on screen.
   */
  const validateStep = async (target: StepId) => {
    const fields = STEPS[target - 1].fields;
    let valid = await trigger(fields, { shouldFocus: false });
    if (target === 1 && getValues("college") === OTHER_COLLEGE && !getValues("otherCollege")?.trim()) {
      setError("otherCollege", { type: "required", message: "Enter the name of your college" });
      valid = false;
    }
    if (!valid) {
      // Mark the step's fields as touched so their errors update live while they're fixed.
      // Otherwise an error only clears on blur, and the layout shift under the cursor can
      // swallow the click on Continue.
      for (const field of fields) {
        setValue(field, getValues(field) as never, { shouldTouch: true, shouldValidate: false, shouldDirty: false });
      }
    }
    return valid;
  };

  const handleContinue = async () => {
    if (await validateStep(step)) {
      goTo((step + 1) as StepId);
    } else {
      focusField(current.fields.find(field => getFieldState(field).invalid));
    }
  };

  // If the final submit finds an error on an earlier step, take the applicant there.
  const onInvalid = (formErrors: FieldErrors<RegistrationFormData>) => {
    const target = STEPS.find(s => s.fields.some(field => formErrors[field as keyof RegistrationFormData]));
    if (!target) return;
    if (target.id !== step) {
      setStep(target.id);
      setSubmitError(`Please check the "${target.title}" step.`);
    }
    focusField(target.fields.find(field => formErrors[field as keyof RegistrationFormData]));
  };

  const onSubmit = async (data: RegistrationFormData) => {
    if (submittingRef.current) return;
    if (!turnstileToken) {
      setSubmitError("Complete the security check above the submit button, then try again.");
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitRegistration(data, turnstileToken);
      if (result.ok) {
        setSubmittedEmail(data.email);
        window.scrollTo({ top: 0 });
      } else {
        setSubmitError(result.error);
      }
    } catch {
      setSubmitError("We couldn't reach the server. Check your connection and try again. Your answers are still here.");
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
      // Turnstile tokens work once, so every attempt gets a fresh check.
      setTurnstileToken(null);
      setTurnstileKey(key => key + 1);
    }
  };

  if (submittedEmail) return <ApplicationReceived email={submittedEmail} />;

  return (
    <div>
      <nav aria-label="Application progress" className="[text-shadow:0_1px_3px_rgb(0_0_0/0.9),0_2px_12px_rgb(0_0_0/0.7)]">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-cream">
          Step {step} of {STEPS.length}
        </p>
        <ol className="mt-3 grid grid-cols-4 gap-2">
          {STEPS.map(s => {
            const done = s.id < step;
            const isCurrent = s.id === step;
            const bar = (
              <span
                aria-hidden
                className={`block h-2 rounded-full ${done ? "bg-action" : isCurrent ? "bg-action/70" : "bg-cream/30"}`}
              />
            );
            const label = (
              <span aria-hidden className={`mt-2 hidden text-sm sm:block ${isCurrent ? "font-bold text-cream" : "font-medium text-cream/85"}`}>
                {s.title}
              </span>
            );
            return (
              <li key={s.id} aria-current={isCurrent ? "step" : undefined}>
                {done ? (
                  <button
                    type="button"
                    onClick={() => goTo(s.id)}
                    className="block min-h-11 w-full text-left [&>span:nth-child(2)]:hover:text-cream"
                  >
                    {bar}
                    {label}
                    <span className="sr-only">{s.title}, completed. Go back to this step.</span>
                  </button>
                ) : (
                  <>
                    {bar}
                    {label}
                    <span className="sr-only">
                      {s.title}
                      {isCurrent ? ", current step" : ", not started"}
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <form
        onSubmit={e => void handleSubmit(onSubmit, onInvalid)(e)}
        noValidate
        aria-busy={isSubmitting}
        className="mt-6 rounded-2xl bg-[rgb(15_17_20/0.86)] p-5 shadow-[0_20px_60px_rgb(0_0_0/0.45)] ring-1 ring-cream/10 sm:p-8"
      >
        <h2 ref={stepHeadingRef} tabIndex={-1} className="scroll-mt-24 text-2xl font-bold text-cream focus:outline-none">
          {current.title}
        </h2>

        <div className="mt-6">
          {step === 1 && (
            <StepAboutYou register={register} errors={errors} setValue={setValue} trigger={trigger} college={values.college} />
          )}
          {step === 2 && <StepInterests register={register} errors={errors} />}
          {step === 3 && <StepLogistics register={register} errors={errors} />}
          {step === 4 && (
            <StepReview
              values={values}
              register={register}
              errors={errors}
              onEdit={goTo}
              turnstile={<TurnstileWidget key={turnstileKey} onToken={setTurnstileToken} />}
            />
          )}
        </div>

        {submitError && (
          <div role="alert" className="mt-6 rounded-xl border-2 border-error bg-error-bg px-4 py-3 text-[15px] text-error">
            <strong className="font-bold">Not submitted.</strong> {submitError}
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 1 ? (
            <Button variant="secondary" onClick={() => goTo((step - 1) as StepId)} disabled={isSubmitting}>
              Back
            </Button>
          ) : (
            <span className="hidden sm:block" />
          )}
          {step < 4 ? (
            <Button onClick={handleContinue} arrow>
              Continue
            </Button>
          ) : (
            <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
              {isSubmitting ? "Submitting…" : "Submit application"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

/* ── Step 1: About you ──────────────────────────────────────────────────── */

function StepAboutYou({
  register,
  errors,
  setValue,
  trigger,
  college,
}: StepProps & { setValue: FormApi["setValue"]; trigger: FormApi["trigger"]; college?: string }) {
  const phoneField = register("phone");
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="apply-name">Full name</Label>
        <input
          id="apply-name"
          type="text"
          autoComplete="name"
          maxLength={100}
          aria-invalid={!!errors.name}
          aria-describedby={describedBy(errors.name && "apply-name-error")}
          className={`mt-2 ${inputClass(!!errors.name)}`}
          {...register("name")}
        />
        <FieldError id="apply-name-error" message={errors.name?.message} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="apply-email">Email</Label>
          <Hint id="apply-email-hint">We&apos;ll send your decision here.</Hint>
          <input
            id="apply-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={254}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("apply-email-hint", errors.email && "apply-email-error")}
            className={`mt-2 ${inputClass(!!errors.email)}`}
            {...register("email")}
          />
          <FieldError id="apply-email-error" message={errors.email?.message} />
        </div>
        <div>
          <Label htmlFor="apply-phone">Phone number</Label>
          <Hint id="apply-phone-hint">For contact on the day, like 714-555-0199</Hint>
          <input
            id="apply-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            // No maxLength: it would cut a pasted "+1 (714) 555-0199" before formatPhone can tidy it; formatPhone caps at 10 digits
            placeholder="714-555-0199"
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("apply-phone-hint", errors.phone && "apply-phone-error")}
            className={`mt-2 tabular-nums ${inputClass(!!errors.phone)}`}
            {...phoneField}
            onChange={e => {
              // Digits only, at most 10, dashes added as you type; the caret stays after the digit you typed
              const el = e.target;
              const digitsBefore = el.value.slice(0, el.selectionStart ?? el.value.length).replace(/\D/g, "").length;
              const formatted = formatPhone(el.value);
              el.value = formatted;
              const caret = caretAfterDigits(formatted, digitsBefore);
              el.setSelectionRange(caret, caret);
              void phoneField.onChange(e);
            }}
          />
          <FieldError id="apply-phone-error" message={errors.phone?.message} />
        </div>
      </div>

      <CollegePicker
        value={college}
        invalid={!!errors.college}
        error={errors.college?.message}
        onSelect={name => {
          setValue("college", name as RegistrationFormData["college"], { shouldValidate: true, shouldTouch: true });
          if (name !== OTHER_COLLEGE) setValue("otherCollege", "");
        }}
        onBlur={() => void trigger("college")}
      />

      {college === OTHER_COLLEGE && (
        <div>
          <Label htmlFor="apply-other-college">College name</Label>
          <input
            id="apply-other-college"
            type="text"
            maxLength={150}
            autoComplete="organization"
            aria-invalid={!!errors.otherCollege}
            aria-describedby={describedBy(errors.otherCollege && "apply-other-college-error")}
            className={`mt-2 ${inputClass(!!errors.otherCollege)}`}
            {...register("otherCollege")}
          />
          <FieldError id="apply-other-college-error" message={errors.otherCollege?.message} />
        </div>
      )}

      <div>
        <label className="flex min-h-11 cursor-pointer items-start gap-3">
          <input
            id="apply-age"
            type="checkbox"
            aria-invalid={!!errors.ageCheck}
            aria-describedby={describedBy("apply-age-hint", errors.ageCheck && "apply-age-error")}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-action"
            {...register("ageCheck")}
          />
          <span>
            <span className="block text-[15px] font-bold text-cream">I&apos;ll be 18 or older by Fall 2026.</span>
            <span id="apply-age-hint" className="block text-sm text-mist">
              HackCC is an 18+ event.
            </span>
          </span>
        </label>
        <FieldError id="apply-age-error" message={errors.ageCheck?.message} />
      </div>
    </div>
  );
}

/** Accessible combobox: type to filter, arrow keys to move, Enter to choose, Escape to close. */
function CollegePicker({
  value,
  invalid,
  error,
  onSelect,
  onBlur,
}: {
  value?: string;
  invalid: boolean;
  error?: string;
  onSelect: (college: string) => void;
  onBlur: () => void;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listId = useId();
  const options = filterColleges(query);

  const choose = (college: string) => {
    onSelect(college);
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="relative">
      <Label htmlFor="apply-college">California community college</Label>
      <Hint id="apply-college-hint">
        Type a name or an acronym, like OCC. Not listed? Choose &ldquo;{OTHER_COLLEGE}&rdquo;.
      </Hint>
      <input
        id="apply-college"
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && options[active] ? `${listId}-opt-${active}` : undefined}
        aria-invalid={invalid}
        aria-describedby={describedBy("apply-college-hint", invalid && "apply-college-error")}
        autoComplete="off"
        value={open ? query : value ?? ""}
        onChange={e => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => {
          setQuery("");
          setActive(0);
          setOpen(true);
        }}
        onBlur={() => {
          // Let a click on an option land before closing.
          setTimeout(() => {
            setOpen(false);
            onBlur();
          }, 120);
        }}
        onKeyDown={e => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            setActive(i => Math.min(i + 1, options.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive(i => Math.max(i - 1, 0));
          } else if (e.key === "Enter" && open) {
            e.preventDefault();
            if (options[active]) choose(options[active]);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className={`mt-2 ${inputClass(invalid)}`}
      />
      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Colleges"
          className="absolute inset-x-0 top-full z-20 mt-1 max-h-72 overflow-y-auto rounded-xl border-2 border-line-strong bg-night py-1 shadow-[0_12px_32px_rgb(0_0_0/0.5)]"
        >
          {options.map((college, i) => {
            const selected = value === college;
            return (
              <li
                key={college}
                id={`${listId}-opt-${i}`}
                role="option"
                aria-selected={selected}
                onMouseDown={e => e.preventDefault()}
                onClick={() => choose(college)}
                onMouseEnter={() => setActive(i)}
                className={`flex min-h-11 cursor-pointer items-center justify-between gap-3 px-3.5 text-[15px] ${
                  i === active ? "bg-surface-raised" : ""
                } ${selected ? "font-bold text-action" : "text-cream"} ${college === OTHER_COLLEGE ? "border-t border-line" : ""}`}
              >
                {college}
                {selected && <span className="text-sm">Selected</span>}
              </li>
            );
          })}
        </ul>
      )}
      <FieldError id="apply-college-error" message={error} />
    </div>
  );
}

/* ── Step 2: Interests ──────────────────────────────────────────────────── */

function StepInterests({ register, errors }: StepProps) {
  return (
    <div className="space-y-8">
      <fieldset aria-describedby={describedBy("apply-interests-hint", errors.interests && "apply-interests-error")}>
        <legend className="text-[15px] font-bold text-cream">What are you interested in?</legend>
        <p id="apply-interests-hint" className="mt-1 text-sm text-mist">
          Choose at least one.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {INTEREST_OPTIONS.map((interest, i) => (
            <label key={interest} className={choiceClass}>
              <input
                id={`apply-interest-${i}`}
                type="checkbox"
                value={interest}
                className="size-5 shrink-0 cursor-pointer accent-action"
                {...register("interests")}
              />
              {interest}
            </label>
          ))}
        </div>
        <FieldError id="apply-interests-error" message={errors.interests?.message} />
      </fieldset>

      <label className="flex min-h-11 cursor-pointer items-start gap-3">
        <input type="checkbox" className="mt-0.5 size-5 shrink-0 cursor-pointer accent-action" {...register("isFirstTimer")} />
        <span>
          <span className="block text-[15px] font-bold text-cream">This will be my first hackathon</span>
          <span className="block text-sm text-mist">Optional. Beginners are welcome.</span>
        </span>
      </label>
    </div>
  );
}

/* ── Step 3: Logistics ──────────────────────────────────────────────────── */

function StepLogistics({ register, errors }: StepProps) {
  return (
    <div className="space-y-8">
      <fieldset aria-describedby={describedBy(errors.tshirtSize && "apply-size-error")}>
        <legend className="text-[15px] font-bold text-cream">T-shirt size</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {TSHIRT_SIZES.map(size => (
            <label key={size} className={`${choiceClass} min-w-16 justify-center font-bold`}>
              <input id={`apply-size-${size}`} type="radio" value={size} className="size-4 accent-action" {...register("tshirtSize")} />
              {size}
            </label>
          ))}
        </div>
        <FieldError id="apply-size-error" message={errors.tshirtSize?.message} />
      </fieldset>

      <div>
        <Label htmlFor="apply-dietary" optional>
          Dietary restrictions or allergies
        </Label>
        <Hint id="apply-dietary-hint">Leave blank if none.</Hint>
        <textarea
          id="apply-dietary"
          rows={3}
          maxLength={300}
          aria-invalid={!!errors.dietaryRestrictions}
          aria-describedby={describedBy("apply-dietary-hint", errors.dietaryRestrictions && "apply-dietary-error")}
          className={`mt-2 resize-y ${inputClass(!!errors.dietaryRestrictions)}`}
          {...register("dietaryRestrictions")}
        />
        <FieldError id="apply-dietary-error" message={errors.dietaryRestrictions?.message} />
      </div>
    </div>
  );
}

/* ── Step 4: Review and submit ──────────────────────────────────────────── */

function StepReview({
  values,
  register,
  errors,
  onEdit,
  turnstile,
}: StepProps & {
  values: Partial<RegistrationFormData>;
  onEdit: (step: StepId) => void;
  turnstile: React.ReactNode;
}) {
  const college = values.college === OTHER_COLLEGE ? values.otherCollege || OTHER_COLLEGE : values.college;
  const sections: { step: StepId; title: string; items: [string, string][] }[] = [
    {
      step: 1,
      title: "About you",
      items: [
        ["Name", values.name ?? ""],
        ["Email", values.email ?? ""],
        ["Phone", values.phone ?? ""],
        ["College", college ?? ""],
      ],
    },
    {
      step: 2,
      title: "Interests",
      items: [
        ["Interests", (values.interests ?? []).join(", ")],
        ["First hackathon", values.isFirstTimer ? "Yes" : "No"],
      ],
    },
    {
      step: 3,
      title: "Logistics",
      items: [
        ["T-shirt size", values.tshirtSize ?? ""],
        ["Dietary needs", values.dietaryRestrictions?.trim() || "None"],
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-5">
        {sections.map(section => (
          <section key={section.title} aria-label={section.title} className="border-b border-line pb-5">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-bold text-cream">{section.title}</h3>
              <button
                type="button"
                onClick={() => onEdit(section.step)}
                className="min-h-11 px-1 text-[15px] font-bold text-cream underline decoration-2 decoration-cream/45 underline-offset-4 hover:text-action hover:decoration-action"
              >
                Edit<span className="sr-only"> {section.title}</span>
              </button>
            </div>
            <dl className="mt-1 grid gap-x-6 gap-y-1 text-[15px] sm:grid-cols-[9rem_1fr]">
              {section.items.map(([term, detail]) => (
                <React.Fragment key={term}>
                  <dt className="text-mist">{term}</dt>
                  <dd className="break-words text-cream">{detail}</dd>
                </React.Fragment>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <div>
        <h3 className="font-bold text-cream">Code of Conduct</h3>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-mist">
          {CODE_OF_CONDUCT.map(rule => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-mist">
          We store only what&apos;s on this form. Only HackCC organizers can see it, and we delete it after the event.
        </p>
        <label className="mt-4 flex min-h-11 cursor-pointer items-start gap-3">
          <input
            id="apply-coc"
            type="checkbox"
            aria-invalid={!!errors.codeOfConduct}
            aria-describedby={describedBy(errors.codeOfConduct && "apply-coc-error")}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-action"
            {...register("codeOfConduct")}
          />
          <span className="text-[15px] font-bold text-cream">I agree to follow the HackCC Code of Conduct.</span>
        </label>
        <FieldError id="apply-coc-error" message={errors.codeOfConduct?.message} />
      </div>

      <div>
        <h3 className="font-bold text-cream">Security check</h3>
        <p className="mt-1 text-sm text-mist">This confirms you&apos;re not a bot. It usually completes on its own.</p>
        <div className="mt-3">{turnstile}</div>
      </div>
    </div>
  );
}
