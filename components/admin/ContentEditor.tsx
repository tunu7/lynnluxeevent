"use client";

import { useActionState, useState } from "react";
import { ArrowDown, ArrowUp, Plus, X } from "lucide-react";
import { saveContentSection } from "@/app/admin/(dashboard)/content/actions";
import { navTargets, type Field, type Section } from "@/lib/site-content-schema";
import FormError from "./FormError";
import SubmitButton from "./SubmitButton";
import { CoverUpload } from "./ImageUpload";
import { buttons, card, field as fieldClass, label as labelClass } from "./styles";

type Values = Record<string, unknown>;
type Item = Record<string, string>;

export default function ContentEditor({ section, initial }: { section: Section; initial: Values }) {
  const [values, setValues] = useState<Values>(initial);
  const [state, action] = useActionState(saveContentSection, {});
  const set = (key: string, value: unknown) => setValues((current) => ({ ...current, [key]: value }));

  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="section" value={section.id} />
      <input type="hidden" name="data" value={JSON.stringify(values)} />

      <div className={`${card} divide-y divide-line`}>
        {section.fields.map((f) => (
          <div key={f.key} className="p-6">
            <FieldEditor field={f} value={values[f.key]} onChange={(v) => set(f.key, v)} />
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 -mx-4 flex flex-wrap items-center gap-3 border-t border-line bg-paper-2/95 px-4 py-4 backdrop-blur md:-mx-10 md:px-10">
        <SubmitButton>Save changes</SubmitButton>
        {state.savedAt && !state.error ? (
          <p role="status" className="text-sm text-emerald-800">
            Saved. The website is updated.
          </p>
        ) : null}
        <div className="w-full sm:w-auto sm:flex-1">
          <FormError message={state.error} />
        </div>
      </div>
    </form>
  );
}

function FieldEditor({ field, value, onChange }: { field: Field; value: unknown; onChange: (value: unknown) => void }) {
  const id = `f-${field.key}`;
  const help = field.help ? <p className="mt-1.5 text-xs leading-relaxed text-muted">{field.help}</p> : null;

  switch (field.type) {
    case "text":
    case "textarea": {
      const text = typeof value === "string" ? value : "";
      const Tag = field.type === "textarea" ? "textarea" : "input";
      return (
        <>
          <label htmlFor={id} className={labelClass}>
            {field.label}
          </label>
          <Tag
            id={id}
            value={text}
            maxLength={field.max}
            rows={field.type === "textarea" ? 3 : undefined}
            onChange={(e) => onChange(e.target.value)}
            className={`${fieldClass} ${field.type === "textarea" ? "resize-y" : ""}`}
          />
          <div className="flex justify-between gap-4">
            {help ?? <span />}
            {field.max ? (
              <span className="mt-1.5 shrink-0 text-xs tabular-nums text-muted">
                {text.length}/{field.max}
              </span>
            ) : null}
          </div>
        </>
      );
    }

    case "image":
      return (
        <>
          <p className={labelClass}>{field.label}</p>
          <div className="max-w-sm">
            <CoverUpload
              name={field.key}
              value={typeof value === "string" ? value : ""}
              onChange={onChange}
              noun={field.label.toLowerCase().includes("logo") ? "logo" : "photo"}
              contain={field.label.toLowerCase().includes("logo")}
            />
          </div>
          {value ? (
            <button type="button" onClick={() => onChange("")} className={`${buttons.ghost} mt-2`}>
              Remove image
            </button>
          ) : null}
          {help}
        </>
      );

    case "list": {
      const list = Array.isArray(value) ? (value as string[]) : [];
      return (
        <Repeater
          label={field.label}
          help={help}
          items={list}
          max={field.max}
          empty=""
          onChange={onChange}
          render={(item, update) => (
            <input
              value={item}
              aria-label={field.label}
              onChange={(e) => update(e.target.value)}
              className={fieldClass}
            />
          )}
        />
      );
    }

    case "items": {
      const list = Array.isArray(value) ? (value as Item[]) : [];
      const blank = Object.fromEntries(field.fields.map((sub) => [sub.key, ""]));
      return (
        <Repeater
          label={field.label}
          help={help}
          items={list}
          max={field.max}
          empty={blank}
          onChange={onChange}
          render={(item, update) => (
            <div className="grid gap-3">
              {field.fields.map((sub) => {
                const Tag = sub.multiline ? "textarea" : "input";
                return (
                  <label key={sub.key} className="block">
                    <span className="mb-1 block text-xs text-muted">{sub.label}</span>
                    <Tag
                      value={item[sub.key] ?? ""}
                      rows={sub.multiline ? 3 : undefined}
                      onChange={(e) => update({ ...item, [sub.key]: e.target.value })}
                      className={`${fieldClass} ${sub.multiline ? "resize-y" : ""}`}
                    />
                  </label>
                );
              })}
            </div>
          )}
        />
      );
    }

    case "nav": {
      const list = Array.isArray(value) ? (value as Item[]) : [];
      return (
        <Repeater
          label={field.label}
          help={help}
          items={list}
          max={8}
          empty={{ label: "", href: "/" }}
          onChange={onChange}
          render={(item, update) => (
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs text-muted">Label</span>
                <input
                  value={item.label ?? ""}
                  maxLength={30}
                  onChange={(e) => update({ ...item, label: e.target.value })}
                  className={fieldClass}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-muted">Goes to</span>
                <select
                  value={item.href ?? "/"}
                  onChange={(e) => update({ ...item, href: e.target.value })}
                  className={`${fieldClass} appearance-none`}
                >
                  {navTargets.map((target) => (
                    <option key={target.href} value={target.href}>
                      {target.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}
        />
      );
    }
  }
}

function Repeater<T>({
  label,
  help,
  items,
  max = 20,
  empty,
  onChange,
  render,
}: {
  label: string;
  help: React.ReactNode;
  items: T[];
  max?: number;
  empty: T;
  onChange: (items: T[]) => void;
  render: (item: T, update: (next: T) => void) => React.ReactNode;
}) {
  const update = (i: number, next: T) => onChange(items.map((item, j) => (j === i ? next : item)));
  const move = (from: number, to: number) => {
    const next = [...items];
    [next[from], next[to]] = [next[to], next[from]];
    onChange(next);
  };

  return (
    <fieldset>
      <legend className={labelClass}>{label}</legend>
      {help}
      <ol className="mt-3 space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3 rounded-sm border border-line bg-paper/60 p-3">
            <span className="mt-2.5 w-5 shrink-0 text-xs font-semibold tabular-nums text-muted">{i + 1}</span>
            <div className="min-w-0 flex-1">{render(item, (next) => update(i, next))}</div>
            <div className="flex shrink-0 flex-col gap-1">
              <button
                type="button"
                aria-label="Move up"
                disabled={i === 0}
                onClick={() => move(i, i - 1)}
                className={buttons.ghost}
              >
                <ArrowUp aria-hidden size={14} />
              </button>
              <button
                type="button"
                aria-label="Move down"
                disabled={i === items.length - 1}
                onClick={() => move(i, i + 1)}
                className={buttons.ghost}
              >
                <ArrowDown aria-hidden size={14} />
              </button>
              <button
                type="button"
                aria-label="Remove"
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className={`${buttons.ghost} hover:text-red-800!`}
              >
                <X aria-hidden size={14} />
              </button>
            </div>
          </li>
        ))}
      </ol>
      <button
        type="button"
        disabled={items.length >= max}
        onClick={() => onChange([...items, structuredClone(empty)])}
        className={`${buttons.secondary} mt-3`}
      >
        <Plus aria-hidden size={14} />
        Add
      </button>
    </fieldset>
  );
}
