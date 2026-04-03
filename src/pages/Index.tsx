import { useState } from "react";
import Icon from "@/components/ui/icon";

const SERVICES = [
  {
    icon: "Truck",
    title: "Городские перевозки",
    desc: "Квартирные и офисные переезды по Сыктывкару. Грузчики в комплекте.",
    price: "от 1 500 ₽",
  },
  {
    icon: "Package",
    title: "Межгород",
    desc: "Доставка грузов по Республике Коми и всей России. Сборные грузы.",
    price: "от 8 ₽/км",
  },
  {
    icon: "Building2",
    title: "Строительные грузы",
    desc: "Перевозка стройматериалов, спецтехники, негабарита.",
    price: "от 3 500 ₽",
  },
  {
    icon: "ShoppingCart",
    title: "Доставка для бизнеса",
    desc: "Регулярные рейсы для магазинов и предприятий. Договор, документы.",
    price: "от 2 000 ₽",
  },
];

const PRICES = [
  { name: "Газель (до 1.5 т)", city: "1 500", region: "8", inter: "12" },
  { name: "Бортовой (до 5 т)", city: "3 500", region: "14", inter: "18" },
  { name: "Фура (до 20 т)", city: "8 000", region: "28", inter: "38" },
  { name: "Рефрижератор", city: "4 500", region: "20", inter: "28" },
];

const REVIEWS = [
  {
    name: "Алексей М.",
    stars: 5,
    text: "Перевезли всю мебель из трёшки за 4 часа. Аккуратно, без царапин. Цена вышла точь-в-точь как в калькуляторе.",
    date: "15 марта 2026",
  },
  {
    name: "ООО «СевероСтрой»",
    stars: 5,
    text: "Сотрудничаем уже полтора года. Регулярные поставки стройматериалов — всегда вовремя и с документами.",
    date: "10 марта 2026",
  },
  {
    name: "Ирина К.",
    stars: 5,
    text: "Заказала переезд в другой город. Всё упаковали, доставили в срок. Рекомендую всем!",
    date: "5 марта 2026",
  },
];

const DISTANCES: Record<string, number> = {
  "В пределах города": 30,
  "До 100 км": 80,
  "100–300 км": 200,
  "300–600 км": 450,
  "Более 600 км": 800,
};

const TRUCKS: Record<string, { base: number; perKm: number; label: string }> = {
  gazel: { base: 1500, perKm: 8, label: "Газель (до 1.5 т)" },
  board5: { base: 3500, perKm: 14, label: "Бортовой (до 5 т)" },
  ref: { base: 4500, perKm: 20, label: "Рефрижератор" },
  fura: { base: 8000, perKm: 28, label: "Фура (до 20 т)" },
};

export default function Index() {
  const [distance, setDistance] = useState("В пределах города");
  const [truck, setTruck] = useState("gazel");
  const [loaders, setLoaders] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    from: "",
    to: "",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const km = DISTANCES[distance];
  const t = TRUCKS[truck];
  const basePrice =
    km <= 30 ? t.base : Math.round(t.base + km * t.perKm);
  const priceWithLoaders = basePrice + (loaders ? 2000 : 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("https://functions.poehali.dev/09eadf23-2797-49d3-868d-a7e9a7961598", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        truck: TRUCKS[truck].label,
        distance,
        price: priceWithLoaders,
        loaders,
      }),
    });
    setSubmitted(true);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="font-golos bg-[#0d0f14] text-white min-h-screen overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0f14]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="font-oswald text-xl font-bold tracking-wider">
            <span className="text-[#FF6B1A]">СЕВЕР</span>
            <span className="text-white">ГРУЗ</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            {[
              ["hero", "Главная"],
              ["services", "Услуги"],
              ["prices", "Цены"],
              ["calc", "Заявка"],
              ["reviews", "Отзывы"],
              ["contacts", "Контакты"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="hover:text-[#FF6B1A] transition-colors duration-200"
              >
                {label}
              </button>
            ))}
          </div>
          <a
            href="tel:+78212000000"
            className="hidden md:flex items-center gap-2 bg-[#FF6B1A] text-white font-oswald font-semibold px-5 py-2 rounded-full text-sm hover:bg-[#e55e0f] transition-colors"
          >
            <Icon name="Phone" size={14} />
            8 (8212) 00-00-00
          </a>
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#0d0f14] border-t border-white/5 px-4 py-4 flex flex-col gap-4 text-sm">
            {[
              ["hero", "Главная"],
              ["services", "Услуги"],
              ["prices", "Цены"],
              ["calc", "Заявка"],
              ["reviews", "Отзывы"],
              ["contacts", "Контакты"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left text-white/70 hover:text-[#FF6B1A]"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://cdn.poehali.dev/projects/e2ae37cd-db92-46c9-83d6-6ed5ab037516/files/2e59e813-481f-4667-accf-876ebafdb470.jpg)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f14] via-[#0d0f14]/80 to-[#0d0f14]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-transparent to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="inline-flex items-center gap-2 bg-[#FF6B1A]/20 border border-[#FF6B1A]/40 text-[#FF6B1A] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Icon name="MapPin" size={14} />
            Сыктывкар и Республика Коми
          </div>
          <h1 className="font-oswald text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
            ГРУЗО
            <br />
            <span className="text-[#FF6B1A]">ПЕРЕВОЗКИ</span>
            <br />
            <span className="text-white/90 text-4xl sm:text-5xl md:text-6xl">
              БЕЗ ЛИШНИХ СЛОВ
            </span>
          </h1>
          <p className="text-white/60 text-lg sm:text-xl max-w-xl mb-10">
            Доставим любой груз по городу и России. Онлайн-расчёт за 30 секунд.
            Работаем с 7:00 до 23:00.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo("calc")}
              className="bg-[#FF6B1A] hover:bg-[#e55e0f] text-white font-oswald font-semibold text-lg px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Icon name="Calculator" size={20} />
              Рассчитать стоимость
            </button>
            <a
              href="tel:+78212000000"
              className="border border-white/20 hover:border-[#FF6B1A] text-white font-oswald font-semibold text-lg px-8 py-4 rounded-full transition-all duration-200 flex items-center justify-center gap-2 hover:text-[#FF6B1A]"
            >
              <Icon name="Phone" size={20} />
              Позвонить сейчас
            </a>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-6 max-w-lg">
            {[
              ["12+", "лет на рынке"],
              ["5 000+", "довольных клиентов"],
              ["24/7", "на связи"],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="font-oswald text-3xl sm:text-4xl font-bold text-[#FF6B1A]">
                  {num}
                </div>
                <div className="text-white/50 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-[#0d0f14]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <div className="text-[#FF6B1A] font-oswald text-sm tracking-widest uppercase mb-3">
              Что мы делаем
            </div>
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold">
              НАШИ УСЛУГИ
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-[#FF6B1A]/50 hover:bg-[#FF6B1A]/5 transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#FF6B1A]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#FF6B1A]/20 transition-colors">
                  <Icon name={s.icon} size={24} className="text-[#FF6B1A]" />
                </div>
                <h3 className="font-oswald text-xl font-semibold mb-2">
                  {s.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {s.desc}
                </p>
                <div className="font-oswald text-[#FF6B1A] font-bold text-lg">
                  {s.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-24 bg-[#111318]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <div className="text-[#FF6B1A] font-oswald text-sm tracking-widest uppercase mb-3">
              Прозрачные тарифы
            </div>
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold">
              ЦЕНЫ НА ПЕРЕВОЗКИ
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 pr-6 text-white/50 text-sm font-medium">
                    Транспорт
                  </th>
                  <th className="text-right py-4 px-4 text-white/50 text-sm font-medium">
                    По городу
                  </th>
                  <th className="text-right py-4 px-4 text-white/50 text-sm font-medium">
                    Регион (₽/км)
                  </th>
                  <th className="text-right py-4 pl-4 text-white/50 text-sm font-medium">
                    Межгород (₽/км)
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRICES.map((p, i) => (
                  <tr
                    key={p.name}
                    className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${i === 0 ? "bg-[#FF6B1A]/5" : ""}`}
                  >
                    <td className="py-5 pr-6">
                      <div className="flex items-center gap-3">
                        <Icon name="Truck" size={18} className="text-[#FF6B1A]" />
                        <span className="font-medium">{p.name}</span>
                        {i === 0 && (
                          <span className="bg-[#FF6B1A]/20 text-[#FF6B1A] text-xs px-2 py-0.5 rounded-full font-medium">
                            Популярное
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="text-right py-5 px-4 font-oswald text-lg font-semibold">
                      {p.city} ₽
                    </td>
                    <td className="text-right py-5 px-4 font-oswald text-lg">
                      {p.region} ₽
                    </td>
                    <td className="text-right py-5 pl-4 font-oswald text-lg">
                      {p.inter} ₽
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-white/30 text-sm mt-4">
            * Стоимость грузчиков — 2 000 ₽/чел дополнительно. Окончательная цена рассчитывается по калькулятору ниже.
          </p>
        </div>
      </section>

      {/* CALCULATOR / FORM */}
      <section id="calc" className="py-24 bg-[#0d0f14]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <div className="text-[#FF6B1A] font-oswald text-sm tracking-widest uppercase mb-3">
              Быстрый расчёт
            </div>
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold">
              ОНЛАЙН ЗАЯВКА
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Calculator */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
              <h3 className="font-oswald text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Calculator" size={22} className="text-[#FF6B1A]" />
                Калькулятор стоимости
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    Вид транспорта
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(TRUCKS).map(([key, val]) => (
                      <button
                        key={key}
                        onClick={() => setTruck(key)}
                        className={`py-3 px-4 rounded-xl text-sm font-medium text-left transition-all ${
                          truck === key
                            ? "bg-[#FF6B1A] text-white"
                            : "bg-white/5 border border-white/10 text-white/60 hover:border-[#FF6B1A]/40"
                        }`}
                      >
                        {val.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    Расстояние
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {Object.keys(DISTANCES).map((d) => (
                      <button
                        key={d}
                        onClick={() => setDistance(d)}
                        className={`py-3 px-4 rounded-xl text-sm font-medium text-left transition-all ${
                          distance === d
                            ? "bg-[#FF6B1A]/20 border border-[#FF6B1A] text-[#FF6B1A]"
                            : "bg-white/5 border border-white/10 text-white/60 hover:border-[#FF6B1A]/30"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => setLoaders(!loaders)}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-medium text-left transition-all flex items-center gap-3 ${
                      loaders
                        ? "bg-[#FF6B1A]/20 border border-[#FF6B1A] text-[#FF6B1A]"
                        : "bg-white/5 border border-white/10 text-white/60 hover:border-[#FF6B1A]/30"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${loaders ? "bg-[#FF6B1A] border-[#FF6B1A]" : "border-white/30"}`}
                    >
                      {loaders && <Icon name="Check" size={12} className="text-white" />}
                    </div>
                    Нужны грузчики (+2 000 ₽)
                  </button>
                </div>
              </div>

              {/* Result */}
              <div className="mt-8 bg-gradient-to-br from-[#FF6B1A]/20 to-[#FF6B1A]/5 border border-[#FF6B1A]/30 rounded-2xl p-6">
                <div className="text-white/60 text-sm mb-1">
                  Ориентировочная стоимость
                </div>
                <div className="font-oswald text-5xl font-bold text-white mb-1">
                  {priceWithLoaders.toLocaleString("ru-RU")} ₽
                </div>
                <div className="text-white/40 text-xs">
                  {TRUCKS[truck].label} · {distance}
                  {loaders ? " · С грузчиками" : ""}
                </div>
                <button
                  onClick={() => scrollTo("form")}
                  className="mt-4 w-full bg-[#FF6B1A] hover:bg-[#e55e0f] text-white font-oswald font-semibold py-3 rounded-xl transition-colors"
                >
                  Оформить заявку по этой цене
                </button>
              </div>
            </div>

            {/* Form */}
            <div
              id="form"
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-8"
            >
              <h3 className="font-oswald text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="ClipboardList" size={22} className="text-[#FF6B1A]" />
                Оставить заявку
              </h3>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-[#FF6B1A]/20 rounded-full flex items-center justify-center mb-4">
                    <Icon name="CheckCircle" size={32} className="text-[#FF6B1A]" />
                  </div>
                  <div className="font-oswald text-2xl font-bold mb-2">
                    Заявка принята!
                  </div>
                  <p className="text-white/50">
                    Мы свяжемся с вами в течение 15 минут.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/60 text-sm mb-1.5 block">
                        Ваше имя
                      </label>
                      <input
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Иван"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#FF6B1A]/60 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-sm mb-1.5 block">
                        Телефон
                      </label>
                      <input
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+7 (___) ___-__-__"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#FF6B1A]/60 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-1.5 block">
                      Откуда забрать
                    </label>
                    <input
                      value={formData.from}
                      onChange={(e) =>
                        setFormData({ ...formData, from: e.target.value })
                      }
                      placeholder="Адрес загрузки"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#FF6B1A]/60 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-1.5 block">
                      Куда доставить
                    </label>
                    <input
                      value={formData.to}
                      onChange={(e) =>
                        setFormData({ ...formData, to: e.target.value })
                      }
                      placeholder="Адрес выгрузки"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#FF6B1A]/60 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-1.5 block">
                      Комментарий (необязательно)
                    </label>
                    <textarea
                      value={formData.comment}
                      onChange={(e) =>
                        setFormData({ ...formData, comment: e.target.value })
                      }
                      placeholder="Тип груза, этаж, особые условия..."
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-[#FF6B1A]/60 focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  <div className="bg-[#FF6B1A]/10 border border-[#FF6B1A]/20 rounded-xl p-4 flex items-center gap-3">
                    <Icon name="Info" size={18} className="text-[#FF6B1A] shrink-0" />
                    <span className="text-white/60 text-sm">
                      Расчёт:{" "}
                      <span className="text-white font-semibold">
                        ~{priceWithLoaders.toLocaleString("ru-RU")} ₽
                      </span>{" "}
                      · {TRUCKS[truck].label}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#FF6B1A] hover:bg-[#e55e0f] text-white font-oswald font-semibold text-lg py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <Icon name="Send" size={18} />
                    Отправить заявку
                  </button>
                  <p className="text-white/30 text-xs text-center">
                    Нажимая кнопку, вы соглашаетесь с обработкой данных
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-[#111318]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <div className="text-[#FF6B1A] font-oswald text-sm tracking-widest uppercase mb-3">
              Что говорят клиенты
            </div>
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold">
              ОТЗЫВЫ
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-7 hover:border-[#FF6B1A]/30 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(r.stars)].map((_, i) => (
                    <span key={i} className="text-[#FF6B1A] text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-5">
                  "{r.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="font-oswald font-semibold">{r.name}</div>
                  <div className="text-white/30 text-xs">{r.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[#0d0f14]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <div className="text-[#FF6B1A] font-oswald text-sm tracking-widest uppercase mb-3">
              Мы рядом
            </div>
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold">
              КОНТАКТЫ
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "Phone",
                title: "Телефон",
                value: "8 (8212) 00-00-00",
                sub: "Звонки с 7:00 до 23:00",
                href: "tel:+78212000000",
              },
              {
                icon: "MessageCircle",
                title: "WhatsApp / Telegram",
                value: "+7 (912) 000-00-00",
                sub: "Отвечаем быстро",
                href: "#",
              },
              {
                icon: "Mail",
                title: "Email",
                value: "info@severgruz.ru",
                sub: "Для деловых запросов",
                href: "mailto:info@severgruz.ru",
              },
              {
                icon: "MapPin",
                title: "Офис",
                value: "Сыктывкар",
                sub: "ул. Коммунистическая, 1",
                href: "#",
              },
            ].map((c) => (
              <a
                key={c.title}
                href={c.href}
                className="group bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-[#FF6B1A]/40 hover:bg-[#FF6B1A]/5 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#FF6B1A]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#FF6B1A]/20 transition-colors">
                  <Icon name={c.icon} size={22} className="text-[#FF6B1A]" />
                </div>
                <div className="text-white/40 text-xs mb-1">{c.title}</div>
                <div className="font-oswald font-semibold text-lg leading-tight">
                  {c.value}
                </div>
                <div className="text-white/40 text-xs mt-1">{c.sub}</div>
              </a>
            ))}
          </div>

          {/* CTA Strip */}
          <div className="mt-12 bg-gradient-to-r from-[#FF6B1A] to-[#e55e0f] rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="font-oswald text-3xl sm:text-4xl font-bold text-white mb-2">
                ГОТОВЫ К ПЕРЕЕЗДУ?
              </div>
              <div className="text-white/80">
                Оставьте заявку — перезвоним за 15 минут
              </div>
            </div>
            <button
              onClick={() => scrollTo("calc")}
              className="bg-white text-[#FF6B1A] font-oswald font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform whitespace-nowrap"
            >
              Оставить заявку
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 bg-[#0a0b0f]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-oswald text-xl font-bold">
            <span className="text-[#FF6B1A]">СЕВЕР</span>
            <span className="text-white">ГРУЗ</span>
          </div>
          <div className="text-white/30 text-sm text-center">
            © 2026 СеверГруз · Грузоперевозки по Сыктывкару и России
          </div>
          <div className="text-white/30 text-sm">
            ИНН 1101000000 · ООО «СеверГруз»
          </div>
        </div>
      </footer>
    </div>
  );
}