import { useMemo, useState } from 'react';

type Row = { id: number; product: string; category: string; revenue: number; status: string };

const data: Row[] = [
  { id: 1, product: 'Analytics Pro', category: 'SaaS', revenue: 128400, status: 'Активен' },
  { id: 2, product: 'Retail Board', category: 'Dashboard', revenue: 96400, status: 'Активен' },
  { id: 3, product: 'Map Studio', category: 'GIS', revenue: 83700, status: 'Черновик' },
  { id: 4, product: 'Form Engine', category: 'UI Kit', revenue: 71200, status: 'Активен' },
  { id: 5, product: 'Report Hub', category: 'Automation', revenue: 68900, status: 'Архив' },
];

const money = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });

export default function App() {
  const [query, setQuery] = useState('');
  const [descending, setDescending] = useState(true);
  const [visible, setVisible] = useState({ category: true, revenue: true, status: true });

  const rows = useMemo(
    () =>
      data
        .filter((row) => row.product.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => (descending ? b.revenue - a.revenue : a.revenue - b.revenue)),
    [query, descending],
  );

  const total = rows.reduce((sum, row) => sum + row.revenue, 0);

  return (
    <main className="shell">
      <header>
        <div>
          <span className="eyebrow">UI BUILDER / PLAYGROUND</span>
          <h1>DataGrid Designer</h1>
          <p>Настраивайте колонки, фильтры и сортировку — результат обновляется сразу.</p>
        </div>
        <span className="badge">React · TypeScript</span>
      </header>

      <section className="workspace">
        <aside>
          <h2>Конфигурация</h2>
          <label>
            Поиск
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Название продукта" />
          </label>

          <fieldset>
            <legend>Колонки</legend>
            {Object.entries(visible).map(([key, checked]) => (
              <label className="check" key={key}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setVisible((current) => ({ ...current, [key]: !current[key as keyof typeof current] }))}
                />
                {key === 'category' ? 'Категория' : key === 'revenue' ? 'Выручка' : 'Статус'}
              </label>
            ))}
          </fieldset>

          <button type="button" onClick={() => setDescending((value) => !value)}>
            Выручка: {descending ? 'по убыванию' : 'по возрастанию'}
          </button>

          <div className="metric">
            <span>Итого по выборке</span>
            <strong>{money.format(total)}</strong>
          </div>
        </aside>

        <div className="preview">
          <div className="previewTitle">
            <div>
              <span className="eyebrow">ПРЕДПРОСМОТР</span>
              <h2>Продукты</h2>
            </div>
            <span>{rows.length} строк</span>
          </div>

          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>Продукт</th>
                  {visible.category && <th>Категория</th>}
                  {visible.revenue && <th>Выручка</th>}
                  {visible.status && <th>Статус</th>}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td><strong>{row.product}</strong></td>
                    {visible.category && <td>{row.category}</td>}
                    {visible.revenue && <td>{money.format(row.revenue)}</td>}
                    {visible.status && <td><span className={"status " + row.status.toLowerCase()}>{row.status}</span></td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
