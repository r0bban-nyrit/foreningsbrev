import { useId, useState } from 'react';

// Exempelpriser – justera till era riktiga priser.
const START_FEE = 1500; // kr per utskick: upplägg, text och layout
const OPTIONS = {
  digital: { label: 'Digitalt (e-post)', perRecipient: 0.5 },
  print: { label: 'Tryckt brev', perRecipient: 12 },
  both: { label: 'Tryckt + digitalt', perRecipient: 12.5 },
} as const;

type Channel = keyof typeof OPTIONS;

const sek = new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK', maximumFractionDigits: 0 });

export default function PriceCalculator() {
  const id = useId();
  const [channel, setChannel] = useState<Channel>('print');
  const [recipients, setRecipients] = useState(250);

  const variable = recipients * OPTIONS[channel].perRecipient;
  const total = START_FEE + variable;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h3 className="text-xl font-bold text-brand-900">Räkna på ert utskick</h3>
      <p className="mt-1 text-sm text-slate-600">En grov uppskattning – ni får alltid en offert innan något beställs.</p>

      <fieldset className="mt-6">
        <legend className="text-sm font-semibold text-slate-800">Typ av utskick</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {(Object.keys(OPTIONS) as Channel[]).map((key) => (
            <label
              key={key}
              className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                channel === key ? 'border-brand-600 bg-brand-50 text-brand-900' : 'border-slate-300 hover:border-brand-600'
              }`}
            >
              <input
                type="radio"
                name={`${id}-channel`}
                value={key}
                checked={channel === key}
                onChange={() => setChannel(key)}
                className="accent-brand-600"
              />
              {OPTIONS[key].label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <label htmlFor={`${id}-recipients`} className="flex items-baseline justify-between text-sm font-semibold text-slate-800">
          <span>Antal mottagare</span>
          <span className="text-lg text-brand-700">{recipients.toLocaleString('sv-SE')}</span>
        </label>
        <input
          id={`${id}-recipients`}
          type="range"
          min={25}
          max={2000}
          step={25}
          value={recipients}
          onChange={(e) => setRecipients(Number(e.target.value))}
          className="mt-2 w-full accent-brand-600"
        />
      </div>

      <dl className="mt-6 space-y-2 border-t border-slate-200 pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate-600">Startavgift (upplägg & layout)</dt>
          <dd>{sek.format(START_FEE)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-600">
            {recipients.toLocaleString('sv-SE')} × {OPTIONS[channel].perRecipient.toLocaleString('sv-SE', { minimumFractionDigits: 2 })} kr
          </dt>
          <dd>{sek.format(variable)}</dd>
        </div>
        <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-brand-900">
          <dt>Uppskattat totalt (exkl. moms)</dt>
          <dd aria-live="polite">{sek.format(total)}</dd>
        </div>
      </dl>
    </div>
  );
}
