import React, { useEffect, useMemo, useRef, useState } from "react";

const services = [
  {
    groupId: "web",
    groupTitle: "Web Saytlar",
    groupIcon: "🌐",
    files: [
      {
        id: "sales-web",
        file: "sotuv-sayti.jsx",
        name: "Sotuv web sayti",
        slug: "sales_web",
        audience: "Do‘konlar, mahsulot sotuvchilar va buyurtma qabul qiluvchi bizneslar",
        result:
          "Mahsulot ko‘rsatish, buyurtma olish va boshqarish imkoniga ega savdo sahifasi",
        features: [
          "Mahsulot katalogi",
          "Buyurtma formasi",
          "Admin panel",
          "Telegram xabarnoma",
          "Kategoriya bo‘yicha ajratish",
          "Boshlang‘ich SEO sozlash",
        ],
        price: {
          model: "hybrid",
          start: "3 500 000 so‘mdan",
          depends: "mahsulot soni, admin funksiyalar, filtrlar, integratsiya",
          payment: "bosqichma-bosqich",
          warranty: "7 kun kuzatuv",
        },
        tech: ["React", "Express", "MongoDB", "Mongoose", "Telegram API"],
      },
      {
        id: "simple-web",
        file: "oddiy-sayt.jsx",
        name: "Oddiy web sayt",
        slug: "simple_web",
        audience:
          "Portfolio, shaxsiy brend yoki kichik xizmat sahifasi kerak bo‘lganlar",
        result:
          "Yengil, tez ochiladigan va telefonlarda ham toza ko‘rinadigan sayt",
        features: [
          "Asosiy sahifa tuzilmasi",
          "Moslashuvchan ekran ko‘rinishi",
          "Aloqa formasi",
          "Telegramga xabar yuborish",
          "Boshlang‘ich SEO tayyorlash",
        ],
        price: {
          model: "fixed",
          start: "1 500 000 so‘mdan",
          depends: "sahifalar soni, animatsiya darajasi, kontent hajmi",
          payment: "50% boshlashda, 50% topshirishda",
          warranty: "7 kun kuzatuv",
        },
        tech: ["React", "Vite", "CSS", "Telegram API", "Railway"],
      },
      {
        id: "business-web",
        file: "biznes-sayt.jsx",
        name: "Biznes web sayt",
        slug: "business_web",
        audience:
          "Kompaniya, servis markazi, o‘quv markazi yoki xizmat ko‘rsatuvchi biznes",
        result:
          "Ishonch beradigan, xizmatlarni tartibli ko‘rsatadigan rasmiy web sahifa",
        features: [
          "Premium landing struktura",
          "Xizmatlar bo‘limi",
          "Portfolio yoki keyslar",
          "Kontakt va xarita bloki",
          "Kontentni boshqarish qismi",
        ],
        price: {
          model: "fixed_plus_options",
          start: "2 500 000 so‘mdan",
          depends: "bo‘limlar, admin panel, kontent joylash, til soni",
          payment: "kelishuv asosida",
          warranty: "7 kun kuzatuv",
        },
        tech: ["React", "Node.js", "Express", "MongoDB", "Analytics"],
      },
      {
        id: "custom-web",
        file: "custom-platforma.jsx",
        name: "Custom platforma",
        slug: "custom_platform",
        audience:
          "Maxsus biznes jarayonini web tizimga aylantirmoqchi bo‘lganlar",
        result:
          "Sizning ish uslubingizga moslashtirilgan alohida raqamli platforma",
        features: [
          "Maxsus arxitektura",
          "Rol va ruxsatlar",
          "Dashboard logikasi",
          "API ulanishlar",
          "Real-time funksiyalar",
          "Deploy va monitoring",
        ],
        price: {
          model: "custom",
          start: "kelishiladi",
          depends: "texnik topshiriq, modul soni, xavfsizlik talabi",
          payment: "milestone asosida",
          warranty: "14 kun kuzatuv",
        },
        tech: ["React", "Node.js", "Socket.IO", "MongoDB", "JWT"],
      },
    ],
  },
  {
    groupId: "mobile",
    groupTitle: "Mobil Ilovalar",
    groupIcon: "📲",
    files: [
      {
        id: "client-mobile",
        file: "mijoz-ilovasi.jsx",
        name: "Mijoz ilovasi",
        slug: "client_mobile_app",
        audience:
          "Mijozlar buyurtma berishi, profil yuritishi yoki servisdan foydalanishi kerak bo‘lgan bizneslar",
        result: "Telefon ekraniga mos, tez ishlaydigan mijoz tomoni ilova",
        features: [
          "Mobil interfeys",
          "Profil oynasi",
          "Buyurtma oqimi",
          "Status kuzatish",
          "Bildirishnoma logikasi",
          "Backend bilan ulanish",
        ],
        price: {
          model: "custom",
          start: "6 000 000 so‘mdan",
          depends: "ekranlar soni, login turi, push, to‘lov, xarita",
          payment: "bosqichlarga bo‘lib",
          warranty: "14 kun kuzatuv",
        },
        tech: ["React Native", "Expo", "Node.js", "MongoDB", "Firebase"],
      },
      {
        id: "driver-mobile",
        file: "haydovchi-ilovasi.jsx",
        name: "Haydovchi ilovasi",
        slug: "driver_mobile_app",
        audience:
          "Taksi, yetkazib berish, logistika yoki xizmat xodimlarini boshqaruvchi tizimlar",
        result: "Online status, buyurtma qabul qilish va jonli lokatsiya oynasi",
        features: [
          "Online/offline holat",
          "Buyurtma qabul qilish",
          "Jonli lokatsiya",
          "Navbat tizimi",
          "Taksometr yoki ish statusi",
          "Admin monitoringga ulanish",
        ],
        price: {
          model: "custom",
          start: "8 000 000 so‘mdan",
          depends: "geolokatsiya aniqligi, realtime, xarita, xavfsizlik",
          payment: "modul bo‘yicha",
          warranty: "14 kun kuzatuv",
        },
        tech: [
          "React Native",
          "Socket.IO",
          "Geolocation API",
          "Express",
          "MongoDB",
        ],
      },
      {
        id: "delivery-mobile",
        file: "yetkazish-ilovasi.jsx",
        name: "Yetkazib berish ilovasi",
        slug: "delivery_mobile_app",
        audience:
          "Kuryer, restoran, do‘kon yoki ombor asosida ishlaydigan xizmatlar",
        result:
          "Buyurtma qabul qilishdan yetkazildi holatigacha bo‘lgan mobil oqim",
        features: [
          "Kuryer kabineti",
          "Buyurtma ro‘yxati",
          "Yo‘l xaritasi",
          "Holat almashtirish",
          "Mijozga xabar berish",
          "Admin panelga bog‘lash",
        ],
        price: {
          model: "custom",
          start: "7 000 000 so‘mdan",
          depends: "xarita, kuryer rollari, masofa hisoblash, SMS/push",
          payment: "kelishilgan bosqichlarda",
          warranty: "14 kun kuzatuv",
        },
        tech: ["React Native", "Maps API", "Socket.IO", "Node.js", "MongoDB"],
      },
      {
        id: "shop-mobile",
        file: "dokon-ilovasi.jsx",
        name: "Do‘kon mobil ilovasi",
        slug: "shop_mobile_app",
        audience:
          "Mahsulotlarini mobil katalog va buyurtma orqali sotmoqchi bo‘lgan do‘konlar",
        result:
          "Katalog, savat, profil va buyurtma oqimiga ega mobil savdo ilovasi",
        features: [
          "Mahsulot kartalari",
          "Savat",
          "Buyurtma tarixi",
          "Profil",
          "Admin bilan ulanish",
          "To‘lovga tayyor arxitektura",
        ],
        price: {
          model: "custom",
          start: "7 500 000 so‘mdan",
          depends: "to‘lov, kategoriya, ombor, chegirma, push xabarnoma",
          payment: "bosqichli",
          warranty: "14 kun kuzatuv",
        },
        tech: [
          "React Native",
          "Redux Toolkit",
          "Node.js",
          "MongoDB",
          "Payment SDK",
        ],
      },
    ],
  },
  {
    groupId: "miniapp",
    groupTitle: "PWA / Mini App",
    groupIcon: "📱",
    files: [
      {
        id: "telegram-mini",
        file: "telegram-miniapp.jsx",
        name: "Telegram Mini App",
        slug: "telegram_mini_app",
        audience:
          "Bot ichida ilovaga o‘xshash oynadan foydalanmoqchi bo‘lgan xizmatlar",
        result: "Telegram ichida ochiladigan mobil web app",
        features: [
          "Telegram WebApp ulanish",
          "Mobil UI",
          "Bot bilan sinxron ishlash",
          "User ID orqali aniqlash",
          "Admin panelga bog‘lash",
          "Realtime yangilanish",
        ],
        price: {
          model: "custom",
          start: "4 500 000 so‘mdan",
          depends: "bot logikasi, ekranlar soni, realtime, to‘lov",
          payment: "kelishuv asosida",
          warranty: "14 kun kuzatuv",
        },
        tech: [
          "React",
          "Telegram WebApp SDK",
          "Telegraf",
          "Express",
          "MongoDB",
        ],
      },
      {
        id: "install-pwa",
        file: "install-pwa.jsx",
        name: "O‘rnatiladigan PWA",
        slug: "installable_pwa",
        audience:
          "Mobil ilovasiz telefon ekraniga o‘rnatiladigan web app xohlaydigan bizneslar",
        result: "Brauzerdan o‘rnatiladigan, appga o‘xshab ishlaydigan web tizim",
        features: [
          "Install prompt",
          "Manifest",
          "Service worker",
          "Offline cache",
          "Mobil navigatsiya",
          "Icon va splash tayyorlash",
        ],
        price: {
          model: "feature_based",
          start: "3 000 000 so‘mdan",
          depends: "offline rejim, cache strategiya, push, sahifalar",
          payment: "kelishiladi",
          warranty: "7 kun kuzatuv",
        },
        tech: [
          "React",
          "Vite",
          "Service Worker",
          "Web Manifest",
          "IndexedDB",
        ],
      },
    ],
  },
  {
    groupId: "bot",
    groupTitle: "Telegram Bot",
    groupIcon: "✈️",
    files: [
      {
        id: "order-bot",
        file: "buyurtma-bot.js",
        name: "Buyurtma bot",
        slug: "order_bot",
        audience:
          "Telegram orqali buyurtma yig‘adigan do‘kon yoki servislar",
        result: "Tugmalar, forma va admin xabarnoma bilan ishlaydigan bot",
        features: [
          "Menu tugmalari",
          "Buyurtma formasi",
          "Admin xabarnoma",
          "Foydalanuvchi bazasi",
          "Status yuborish",
          "Mini appga ulanish",
        ],
        price: {
          model: "fixed_plus_options",
          start: "2 000 000 so‘mdan",
          depends: "tugmalar, baza, admin panel, mini app",
          payment: "kelishuv asosida",
          warranty: "7 kun kuzatuv",
        },
        tech: ["Node.js", "Telegraf", "MongoDB", "Webhook", "Railway"],
      },
      {
        id: "support-bot",
        file: "support-bot.js",
        name: "Support bot",
        slug: "support_bot",
        audience:
          "Mijoz savollarini tartiblash va operatorga yo‘naltirish kerak bo‘lgan jamoalar",
        result:
          "Murojaatlarni yig‘uvchi va admin tomonga uzatuvchi yordamchi bot",
        features: [
          "Savol kategoriyalari",
          "Operatorga yo‘naltirish",
          "Murojaat ID",
          "Javob statusi",
          "Admin xabarnoma",
          "Statistika",
        ],
        price: {
          model: "module_based",
          start: "2 500 000 so‘mdan",
          depends: "operatorlar soni, statuslar, hisobot, baza",
          payment: "kelishiladi",
          warranty: "7 kun kuzatuv",
        },
        tech: ["Telegraf", "Express", "MongoDB", "Session", "Admin API"],
      },
    ],
  },
  {
    groupId: "crm",
    groupTitle: "CRM / Panel",
    groupIcon: "🛡️",
    files: [
      {
        id: "shop-crm",
        file: "dokon-crm.js",
        name: "Do‘kon CRM",
        slug: "shop_crm",
        audience:
          "Savdo, ombor, qarz, kirim-chiqim va xodimlarni yuritadigan do‘konlar",
        result:
          "Kassa, mahsulot, mijoz va hisobotlarni bir joyda boshqaradigan tizim",
        features: [
          "Kassa oynasi",
          "Mahsulot bazasi",
          "Qarzlar ro‘yxati",
          "Kirim moduli",
          "Xodim rollari",
          "Kunlik hisobot",
        ],
        price: {
          model: "large_custom",
          start: "10 000 000 so‘mdan",
          depends: "modullar, rollar, ombor logikasi, hisobot chuqurligi",
          payment: "bosqichma-bosqich",
          warranty: "21 kun kuzatuv",
        },
        tech: ["Express", "EJS", "MongoDB", "Socket.IO", "Excel export"],
      },
    ],
  },
  {
    groupId: "realtime",
    groupTitle: "Real-time",
    groupIcon: "⚡",
    files: [
      {
        id: "taxi-system",
        file: "taxi-realtime.js",
        name: "Taksi realtime tizim",
        slug: "taxi_realtime_system",
        audience: "Haydovchi, mijoz va admin bir vaqtda ishlaydigan xizmatlar",
        result:
          "Buyurtma, navbat, lokatsiya va statuslarni jonli yangilaydigan tizim",
        features: [
          "Online haydovchilar",
          "Buyurtma tarqatish",
          "Navbat logikasi",
          "Lokatsiya kuzatish",
          "Admin monitoring",
          "Status xabarlari",
        ],
        price: {
          model: "large_custom",
          start: "12 000 000 so‘mdan",
          depends: "xarita, geolokatsiya, socket oqimi, rollar",
          payment: "milestone asosida",
          warranty: "21 kun kuzatuv",
        },
        tech: ["Socket.IO", "Express", "MongoDB", "Geolocation API", "PWA"],
      },
    ],
  },
  {
    groupId: "ai",
    groupTitle: "AI Integratsiya",
    groupIcon: "🧠",
    files: [
      {
        id: "doc-ai",
        file: "document-ai.ts",
        name: "Hujjat AI tahlili",
        slug: "document_ai",
        audience:
          "Shartnoma, taklif, hujjat yoki matnni avtomatik tahlil qilmoqchi bo‘lganlar",
        result:
          "Matnni o‘qib, xavfli joylarni ajratib, tushunarli xulosa beradigan AI modul",
        features: [
          "Matn ajratish",
          "AI tahlil",
          "Risk belgisi",
          "Xulosa chiqarish",
          "Tilga mos javob",
          "Limit nazorati",
        ],
        price: {
          model: "custom",
          start: "6 000 000 so‘mdan",
          depends: "model turi, token sarfi, fayl formati, admin nazorat",
          payment: "kelishiladi",
          warranty: "14 kun kuzatuv",
        },
        tech: [
          "Gemini API",
          "OpenAI API",
          "Node.js",
          "PDF parser",
          "Admin control",
        ],
      },
    ],
  },
  {
    groupId: "uiux",
    groupTitle: "UI/UX Dizayn",
    groupIcon: "✏️",
    files: [
      {
        id: "product-design",
        file: "product-design.fig",
        name: "Product dizayn",
        slug: "product_design",
        audience:
          "Sayt, CRM, mini app yoki mobil ilova uchun tartibli dizayn kerak bo‘lgan loyiha",
        result:
          "Developerga tushunarli, premium va ishlashga tayyor dizayn maketi",
        features: [
          "Wireframe",
          "UI konsept",
          "Design system",
          "Responsive holatlar",
          "Component layout",
          "Prototype oqimi",
        ],
        price: {
          model: "screen_based",
          start: "1 500 000 so‘mdan",
          depends: "ekranlar soni, animatsiya, komponent murakkabligi",
          payment: "kelishuv asosida",
          warranty: "dizayn topshirilgunga qadar",
        },
        tech: ["Figma", "Prototype", "Auto layout", "UI Kit", "Design handoff"],
      },
    ],
  },
];

const railIcons = [
  { label: "📁", active: true },
  { label: "⌁" },
  { label: "⑂" },
  { label: "◇" },
  { label: "▥" },
  { label: "♙" },
  { label: "⚙" },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeServiceCode(service) {
  return `const xizmat = {
  nomi: "${service.name}",
  auditoriya: "${service.audience}",
  natija: "${service.result}",
  ichida: [
${service.features.map((item) => `    "${item}"`).join(",\n")}
  ]
}`;
}

function makePriceCode(service) {
  return `{
  "hisoblash_turi": "${service.price.model}",
  "boshlangich_byudjet": "${service.price.start}",
  "ozgarish_sababi": "${service.price.depends}",
  "tolov_tartibi": "${service.price.payment}",
  "kafolat": "${service.price.warranty}"
}`;
}

function makeTechCode(service) {
  return `# Texnik asos

## Stack
${service.tech.map((item) => `- ${item}`).join("\n")}`;
}

function buildCodeByTab(service, activeTab) {
  if (!service) return "";
  if (activeTab === "price") return makePriceCode(service);
  if (activeTab === "tech") return makeTechCode(service);
  return makeServiceCode(service);
}

function renderTextTokens(text) {
  const parts = text.split(
    /(\bconst\b|\bxizmat\b|\bnomi\b|\bauditoriya\b|\bnatija\b|\bichida\b)/g
  );

  return parts.map((part, index) => {
    if (part === "const") {
      return (
        <span key={index} className="tok-purple">
          {part}
        </span>
      );
    }

    if (["xizmat", "nomi", "auditoriya", "natija", "ichida"].includes(part)) {
      return (
        <span key={index} className="tok-cyan">
          {part}
        </span>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

function renderHighlightedLine(line) {
  if (line.startsWith("##")) {
    return <span className="tok-yellow">{line}</span>;
  }

  if (line.startsWith("#")) {
    return <span className="tok-cyan">{line}</span>;
  }

  if (line.trim().startsWith("-")) {
    return (
      <>
        <span className="tok-white">- </span>
        <span className="tok-green">{line.replace(/^\s*-\s*/, "")}</span>
      </>
    );
  }

  const pieces = line.split(/("[^"]*")/g);

  return pieces.map((piece, index) => {
    if (piece.startsWith('"') && piece.endsWith('"')) {
      return (
        <span key={index} className="tok-yellow">
          {piece}
        </span>
      );
    }

    return (
      <React.Fragment key={index}>{renderTextTokens(piece)}</React.Fragment>
    );
  });
}

function AnimatedCode({ text, animationKey }) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function runTyping() {
      setTyped("");
      await sleep(240);

      let output = "";
      const wrongLetters = ["x", "q", "z", "k"];

      for (let i = 0; i < text.length; i += 1) {
        if (cancelled) return;

        const current = text[i];

        if (i > 24 && i % 73 === 0 && current !== "\n" && current !== " ") {
          const wrong = wrongLetters[i % wrongLetters.length];
          setTyped(output + wrong);
          await sleep(70);
          setTyped(output);
          await sleep(45);
        }

        output += current;
        setTyped(output);

        if (current === "\n") {
          await sleep(55);
        } else {
          await sleep(9 + (i % 5));
        }
      }
    }

    runTyping();

    return () => {
      cancelled = true;
    };
  }, [text, animationKey]);

  const lines = typed.split("\n");

  return (
    <div className="uz-code">
      {lines.map((line, index) => (
        <div className="uz-code-line" key={`${animationKey}-${index}`}>
          <span className="uz-line-no">{index + 1}</span>
          <span className="uz-line-code">{renderHighlightedLine(line)}</span>
        </div>
      ))}
      <span className="code-caret" />
    </div>
  );
}

function IntroLoader({ done }) {
  return (
    <div className={`boot-overlay ${done ? "hide" : ""}`}>
      <div className="boot-window">
        <div className="boot-window-top">
          <span className="boot-dot red" />
          <span className="boot-dot yellow" />
          <span className="boot-dot green" />
          <span className="boot-title">SharqTech Services Studio</span>
        </div>

        <div className="boot-window-body">
          <div className="boot-scan" />

          <div className="boot-line cyan">initializing workspace...</div>
          <div className="boot-line">loading explorer modules...</div>
          <div className="boot-line">starting code editor engine...</div>
          <div className="boot-line">preparing service terminal...</div>
          <div className="boot-line green">system ready</div>

          <div className="boot-progress">
            <div className="boot-progress-bar" />
          </div>
        </div>
      </div>
    </div>
  );
}

function WelcomeEditor() {
  return (
    <div className="vscode-empty-editor">
      <div className="vscode-watermark">
        <div className="vscode-empty-title">Xizmat faylini tanlang</div>

        <div className="vscode-empty-subtitle">
          Explorer panelidan kerakli xizmat turini oching va faylni tanlang.
          Fayl tanlangandan keyin editor ichida ma’lumotlar paydo bo‘ladi,
          terminal esa ariza qoldirish uchun avtomatik ochiladi.
        </div>

        <div className="vscode-shortcuts">
          <div className="vscode-shortcut-row">
            <span className="shortcut-key">Explorer</span>
            <span className="shortcut-text">
              chap paneldan xizmat yo‘nalishini oching
            </span>
          </div>

          <div className="vscode-shortcut-row">
            <span className="shortcut-key">File</span>
            <span className="shortcut-text">
              kerakli xizmat faylini tanlang
            </span>
          </div>

          <div className="vscode-shortcut-row">
            <span className="shortcut-key">Editor</span>
            <span className="shortcut-text">
              xizmat tavsifi kod ko‘rinishida chiqadi
            </span>
          </div>

          <div className="vscode-shortcut-row">
            <span className="shortcut-key">Terminal</span>
            <span className="shortcut-text">
              ism, telefon va user yozib ariza yuborasiz
            </span>
          </div>

          <div className="vscode-shortcut-row">
            <span className="shortcut-key">Enter</span>
            <span className="shortcut-text">
              barcha qadamlar faqat klaviatura orqali tasdiqlanadi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UzServices() {
  const [introDone, setIntroDone] = useState(false);

  const [openGroupId, setOpenGroupId] = useState("web");
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState("service");
  const [typingKey, setTypingKey] = useState(0);

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientSocial, setClientSocial] = useState("");
  const [terminalStep, setTerminalStep] = useState("name");
  const [terminalValue, setTerminalValue] = useState("");
  const [autoCommand, setAutoCommand] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [terminalLines, setTerminalLines] = useState([]);

  const terminalRef = useRef(null);
  const submitButtonRef = useRef(null);

  const selectedService = useMemo(() => {
    if (!selectedId) return null;

    for (const group of services) {
      const found = group.files.find((file) => file.id === selectedId);
      if (found) return found;
    }

    return null;
  }, [selectedId]);

  const activeGroup = useMemo(() => {
    if (!selectedId) return null;

    return services.find((group) =>
      group.files.some((file) => file.id === selectedId)
    );
  }, [selectedId]);

  const editorText = useMemo(() => {
    return buildCodeByTab(selectedService, activeTab);
  }, [selectedService, activeTab]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroDone(true);
    }, 1700);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (terminalStep === "ready" && submitButtonRef.current && !isSending) {
      submitButtonRef.current.focus();
    }
  }, [terminalStep, isSending]);

  function scrollTerminal() {
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 30);
  }

  function pushTerminal(lines) {
    setTerminalLines((prev) => [...prev, ...lines]);
    scrollTerminal();
  }

  function resetTerminalForService() {
    setClientName("");
    setClientPhone("");
    setClientSocial("");
    setTerminalValue("");
    setAutoCommand("");
    setTerminalStep("name");
    setIsSending(false);
    setTerminalLines([]);
    scrollTerminal();
  }

  async function typeAutoCommand(text) {
    setAutoCommand("");

    for (let i = 0; i <= text.length; i += 1) {
      setAutoCommand(text.slice(0, i));
      await sleep(42);
    }

    await sleep(320);
  }

  async function sendRequest() {
    if (!selectedService) return;

    const payload = {
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      serviceFile: selectedService.file,
      serviceSlug: selectedService.slug,
      groupId: activeGroup?.groupId || "",
      groupTitle: activeGroup?.groupTitle || "",
      name: clientName.trim(),
      phone: clientPhone.trim(),
      social: clientSocial.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/service-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("request_failed");
      }

      pushTerminal([
        { type: "success", text: "✓ request sent to telegram gateway" },
        { type: "success", text: "✓ arizangiz qabul qilindi" },
      ]);
    } catch (error) {
      pushTerminal([
        { type: "error", text: "✗ request failed" },
        {
          type: "warning",
          text: "server endpoint: /api/service-request tekshiring",
        },
      ]);
    }
  }

  async function runAutoSubmit() {
    setIsSending(true);
    pushTerminal([{ type: "muted", text: "request package preparing..." }]);

    await sleep(420);
    await typeAutoCommand("npm run dev");

    pushTerminal([
      { type: "run", text: "$ npm run dev" },
      { type: "process", text: "> sharqtech-request@1.0.0 dev" },
      { type: "process", text: "> terminal-request --send" },
    ]);

    await sleep(480);

    pushTerminal([
      { type: "process", text: "➜ validating contact fields" },
      { type: "process", text: "➜ compiling service request" },
      { type: "process", text: "➜ connecting telegram gateway" },
    ]);

    await sleep(650);
    await sendRequest();

    setAutoCommand("");
    setTerminalStep("done");
    setIsSending(false);
  }

  function handleTerminalSubmit(e) {
    e.preventDefault();

    if (isSending || !selectedService) return;

    if (terminalStep === "ready") {
      runAutoSubmit();
      return;
    }

    if (terminalStep === "done") {
      pushTerminal([
        { type: "hint", text: "new request uchun boshqa xizmat turini tanlang" },
      ]);
      setTerminalValue("");
      return;
    }

    const value = terminalValue.trim();

    if (!value) {
      pushTerminal([{ type: "warning", text: "empty field detected" }]);
      return;
    }

    if (terminalStep === "name") {
      setClientName(value);
      setTerminalValue("");
      setTerminalStep("phone");
      return;
    }

    if (terminalStep === "phone") {
      setClientPhone(value);
      setTerminalValue("");
      setTerminalStep("social");
      return;
    }

    if (terminalStep === "social") {
      setClientSocial(value);
      setTerminalValue("");
      setTerminalStep("ready");
    }
  }

  function handleSelectFile(file) {
    setSelectedId(file.id);
    setActiveTab("service");
    setTypingKey((prev) => prev + 1);
    resetTerminalForService();
  }

  function handleSelectTab(tab) {
    if (!selectedService) return;
    setActiveTab(tab);
    setTypingKey((prev) => prev + 1);
  }

  return (
    <section className="uz-services-page">
      <style>{`
        *{
          box-sizing:border-box;
        }

        .uz-services-page{
          position:absolute;
          inset:0;
          width:100%;
          height:100vh;
          overflow:hidden;
          background:transparent;
          z-index:6;
          pointer-events:none;
          font-family:Inter, Poppins, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color:#e5e7eb;
          font-size:12px;
        }

        .uz-window-wrap{
          position:absolute;
          top:96px;
          left:24px;
          right:24px;
          bottom:22px;
          pointer-events:auto;
        }

        .uz-studio-window{
          position:relative;
          width:100%;
          height:100%;
          border-radius:18px;
          overflow:hidden;
          display:grid;
          grid-template-columns:54px 252px minmax(0, 1fr);
          background:
            linear-gradient(135deg, rgba(0,216,255,.055), transparent 34%),
            linear-gradient(180deg, rgba(255,255,255,.075), rgba(255,255,255,.022)),
            rgba(4,12,24,.18);
          border:1px solid rgba(170,225,255,.26);
          box-shadow:
            0 22px 58px rgba(0,0,0,.32),
            inset 0 1px 0 rgba(255,255,255,.18),
            inset 0 0 110px rgba(0,216,255,.045);
          backdrop-filter: blur(30px) saturate(185%);
          -webkit-backdrop-filter: blur(30px) saturate(185%);
        }

        .uz-studio-window::before{
          content:"";
          position:absolute;
          inset:1px;
          pointer-events:none;
          border-radius:17px;
          background:
            radial-gradient(circle at 28% 18%, rgba(255,255,255,.075), transparent 28%),
            radial-gradient(circle at 78% 70%, rgba(0,216,255,.07), transparent 34%);
          opacity:.72;
          mix-blend-mode:screen;
          z-index:0;
        }

        .boot-overlay{
          position:absolute;
          inset:0;
          z-index:50;
          display:flex;
          align-items:center;
          justify-content:center;
          background:
            radial-gradient(circle at 50% 50%, rgba(0,216,255,.10), transparent 42%),
            rgba(2,8,16,.30);
          backdrop-filter:blur(16px) saturate(150%);
          -webkit-backdrop-filter:blur(16px) saturate(150%);
          opacity:1;
          visibility:visible;
          transition:opacity .5s ease, visibility .5s ease;
          pointer-events:auto;
        }

        .boot-overlay.hide{
          opacity:0;
          visibility:hidden;
          pointer-events:none;
        }

        .boot-window{
          width:min(760px, 72vw);
          border-radius:18px;
          overflow:hidden;
          border:1px solid rgba(110,199,255,.28);
          background:
            linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02)),
            rgba(5,12,22,.30);
          box-shadow:
            0 18px 60px rgba(0,0,0,.35),
            inset 0 1px 0 rgba(255,255,255,.12),
            0 0 30px rgba(0,216,255,.08);
        }

        .boot-window-top{
          height:40px;
          display:flex;
          align-items:center;
          gap:8px;
          padding:0 14px;
          background:rgba(255,255,255,.05);
          border-bottom:1px solid rgba(255,255,255,.08);
        }

        .boot-dot{
          width:10px;
          height:10px;
          border-radius:50%;
          flex:0 0 auto;
        }

        .boot-dot.red{ background:#fb7185; }
        .boot-dot.yellow{ background:#facc15; }
        .boot-dot.green{ background:#4ade80; }

        .boot-title{
          margin-left:8px;
          color:#d8e8f7;
          font-size:12px;
          font-weight:700;
          letter-spacing:.03em;
        }

        .boot-window-body{
          position:relative;
          padding:22px 20px 18px;
          min-height:220px;
          overflow:hidden;
          font-family:"Cascadia Code","Fira Code","JetBrains Mono",Consolas,"Courier New",monospace;
          background:
            linear-gradient(180deg, rgba(1,16,28,.48), rgba(1,10,20,.30)),
            rgba(0,0,0,.18);
        }

        .boot-window-body::before{
          content:"";
          position:absolute;
          inset:0;
          background:linear-gradient(
            to bottom,
            rgba(255,255,255,.03) 0px,
            rgba(255,255,255,0) 1px
          );
          background-size:100% 4px;
          opacity:.18;
          pointer-events:none;
        }

        .boot-scan{
          position:absolute;
          left:0;
          right:0;
          height:42px;
          background:linear-gradient(
            180deg,
            rgba(0,216,255,0),
            rgba(0,216,255,.14),
            rgba(0,216,255,0)
          );
          animation:bootScan 1.4s linear infinite;
          pointer-events:none;
        }

        @keyframes bootScan{
          0%{ top:-50px; }
          100%{ top:100%; }
        }

        .boot-line{
          position:relative;
          z-index:1;
          color:#d6e3ef;
          font-size:13px;
          line-height:1.8;
          margin-bottom:4px;
          animation:bootFade .45s ease forwards;
          opacity:0;
        }

        .boot-line:nth-child(2){ animation-delay:.10s; }
        .boot-line:nth-child(3){ animation-delay:.32s; }
        .boot-line:nth-child(4){ animation-delay:.54s; }
        .boot-line:nth-child(5){ animation-delay:.76s; }
        .boot-line:nth-child(6){ animation-delay:.98s; }

        .boot-line.cyan{ color:#67e8f9; }
        .boot-line.green{ color:#86efac; }

        @keyframes bootFade{
          from{
            opacity:0;
            transform:translateY(6px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }

        .boot-progress{
          position:relative;
          z-index:1;
          height:7px;
          margin-top:18px;
          border-radius:999px;
          background:rgba(255,255,255,.08);
          overflow:hidden;
          border:1px solid rgba(255,255,255,.08);
        }

        .boot-progress-bar{
          height:100%;
          width:38%;
          border-radius:999px;
          background:linear-gradient(90deg, #00d8ff, #67e8f9, #a5f3fc);
          box-shadow:0 0 20px rgba(0,216,255,.4);
          animation:bootProgress 1.5s ease-in-out infinite;
        }

        @keyframes bootProgress{
          0%{ width:0%; }
          50%{ width:72%; }
          100%{ width:100%; }
        }

        .uz-rail,
        .uz-explorer,
        .uz-main{
          position:relative;
          z-index:1;
        }

        .uz-rail,
        .uz-explorer,
        .uz-main,
        .uz-tabs,
        .uz-terminal,
        .uz-status{
          backdrop-filter: blur(24px) saturate(170%);
          -webkit-backdrop-filter: blur(24px) saturate(170%);
        }

        .uz-rail{
          background:rgba(3,10,20,.24);
          border-right:1px solid rgba(255,255,255,.085);
          display:flex;
          flex-direction:column;
          align-items:center;
          padding:10px 0;
          gap:9px;
          position:relative;
        }

        .uz-rail::before{
          content:"";
          position:absolute;
          left:0;
          top:62px;
          width:2px;
          height:40px;
          background:#00d8ff;
          box-shadow:0 0 14px rgba(0,216,255,.8);
        }

        .uz-rail-icons{
          width:100%;
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:8px;
        }

        .uz-rail-icon{
          width:36px;
          height:36px;
          display:grid;
          place-items:center;
          color:#b7c4d2;
          border-radius:10px;
          transition:.18s ease;
          font-size:15px;
        }

        .uz-rail-icon:hover{
          color:#ffffff;
          background:rgba(255,255,255,.075);
        }

        .uz-rail-icon.active{
          color:#e8fbff;
          background:rgba(0,216,255,.13);
          box-shadow:inset 0 0 0 1px rgba(0,216,255,.28);
        }

        .uz-rail-bottom{
          margin-top:auto;
          width:36px;
          height:36px;
          border-radius:11px;
          display:grid;
          place-items:center;
          background:rgba(0,216,255,.08);
          border:1px solid rgba(0,216,255,.22);
        }

        .uz-rail-mini-logo{
          width:21px;
          height:21px;
          border-radius:7px;
          border:2px solid #00d8ff;
          display:grid;
          place-items:center;
          color:#00d8ff;
          font-size:11px;
          font-weight:900;
          line-height:1;
        }

        .uz-explorer{
          min-width:0;
          min-height:0;
          display:flex;
          flex-direction:column;
          background:
            linear-gradient(180deg, rgba(8,18,34,.34), rgba(3,9,20,.18)),
            rgba(3,10,20,.18);
          border-right:1px solid rgba(255,255,255,.085);
        }

        .uz-panel-title{
          height:45px;
          flex:0 0 45px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:0 14px 0 16px;
          font-size:11px;
          font-weight:800;
          color:#ffffff;
          text-transform:uppercase;
          letter-spacing:.06em;
          border-bottom:1px solid rgba(255,255,255,.085);
          background:rgba(255,255,255,.035);
        }

        .uz-copy-icon{
          width:14px;
          height:14px;
          color:#c2d3e6;
        }

        .uz-tree{
          flex:1;
          min-height:0;
          padding:9px 8px 12px;
          overflow-y:auto;
          overflow-x:hidden;
          scrollbar-width:thin;
          scrollbar-color:rgba(0,216,255,.42) rgba(255,255,255,.04);
        }

        .uz-tree::-webkit-scrollbar,
        .uz-code-scroll::-webkit-scrollbar,
        .uz-terminal-body::-webkit-scrollbar{
          width:8px;
          height:8px;
        }

        .uz-tree::-webkit-scrollbar-thumb,
        .uz-code-scroll::-webkit-scrollbar-thumb,
        .uz-terminal-body::-webkit-scrollbar-thumb{
          background:rgba(0,216,255,.36);
          border-radius:999px;
        }

        .uz-tree::-webkit-scrollbar-track,
        .uz-code-scroll::-webkit-scrollbar-track,
        .uz-terminal-body::-webkit-scrollbar-track{
          background:rgba(255,255,255,.035);
          border-radius:999px;
        }

        .uz-tree-group{
          margin-bottom:4px;
        }

        .uz-tree-main{
          width:100%;
          border:0;
          background:transparent;
          color:#e9f4ff;
          display:flex;
          align-items:center;
          gap:8px;
          padding:7px 8px;
          border-radius:8px;
          cursor:pointer;
          font:inherit;
          text-align:left;
        }

        .uz-tree-main:hover{
          background:rgba(255,255,255,.075);
        }

        .uz-caret{
          width:12px;
          color:#d7e6f5;
          font-size:10px;
          flex:0 0 auto;
        }

        .uz-folder-icon{
          width:18px;
          font-size:13px;
          flex:0 0 auto;
        }

        .uz-tree-name{
          font-size:11.5px;
          font-weight:760;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }

        .uz-tree-files{
          margin-left:22px;
          padding-left:10px;
          border-left:1px solid rgba(255,255,255,.10);
          display:flex;
          flex-direction:column;
          gap:2px;
          margin-top:2px;
          margin-bottom:6px;
        }

        .uz-file-btn{
          width:100%;
          height:29px;
          border:0;
          background:transparent;
          color:#d7e0eb;
          display:flex;
          align-items:center;
          gap:8px;
          padding:0 10px;
          border-radius:8px;
          cursor:pointer;
          font:inherit;
          text-align:left;
          position:relative;
        }

        .uz-file-btn:hover{
          background:rgba(255,255,255,.08);
          color:#ffffff;
        }

        .uz-file-btn.selected{
          background:rgba(0,146,255,.24);
          color:#ffffff;
          box-shadow:
            inset 0 0 0 1px rgba(0,216,255,.18),
            0 0 18px rgba(0,216,255,.06);
        }

        .uz-file-btn.selected::after{
          content:"";
          position:absolute;
          right:10px;
          top:50%;
          width:6px;
          height:6px;
          border-radius:50%;
          background:#67e8f9;
          transform:translateY(-50%);
          box-shadow:0 0 10px rgba(103,232,249,.9);
        }

        .uz-file-icon{
          width:15px;
          height:15px;
          flex:0 0 auto;
          display:grid;
          place-items:center;
        }

        .uz-file-label{
          font-size:11.5px;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }

        .uz-js-badge{
          width:14px;
          height:14px;
          border-radius:3px;
          border:1px solid #facc15;
          color:#facc15;
          display:grid;
          place-items:center;
          font-size:7px;
          font-weight:800;
        }

        .uz-main{
          min-width:0;
          min-height:0;
          display:grid;
          grid-template-rows:minmax(0, 1fr) 224px 29px;
          background:
            linear-gradient(145deg, rgba(6,18,34,.18), rgba(2,6,14,.08)),
            rgba(2,6,14,.055);
        }

        .uz-main.no-terminal{
          grid-template-rows:minmax(0, 1fr) 29px;
        }

        .uz-editor{
          min-width:0;
          min-height:0;
          display:flex;
          flex-direction:column;
          border-bottom:1px solid rgba(255,255,255,.09);
          background:
            radial-gradient(circle at 70% 40%, rgba(0,216,255,.045), transparent 30%),
            rgba(255,255,255,.018);
        }

        .uz-tabs{
          height:43px;
          flex:0 0 43px;
          display:flex;
          align-items:stretch;
          background:
            linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.025)),
            rgba(4,10,20,.18);
          border-bottom:1px solid rgba(255,255,255,.09);
          overflow-x:auto;
          overflow-y:hidden;
          scrollbar-width:none;
        }

        .uz-tabs::-webkit-scrollbar{
          display:none;
        }

        .uz-tab{
          min-width:158px;
          max-width:218px;
          height:43px;
          border:0;
          border-right:1px solid rgba(255,255,255,.08);
          display:flex;
          align-items:center;
          gap:8px;
          padding:0 11px;
          color:#c6d3df;
          font-size:11.5px;
          font-weight:730;
          position:relative;
          background:rgba(255,255,255,.035);
          cursor:pointer;
          font-family:inherit;
          text-align:left;
        }

        .uz-tab.welcome-tab{
          min-width:190px;
          pointer-events:none;
          opacity:.92;
        }

        .uz-tab:hover{
          background:rgba(255,255,255,.08);
          color:#ffffff;
        }

        .uz-tab.active{
          background:
            linear-gradient(180deg, rgba(0,216,255,.075), rgba(255,255,255,.025)),
            rgba(2,12,24,.24);
          color:#ffffff;
        }

        .uz-tab.active::before{
          content:"";
          position:absolute;
          left:0;
          right:0;
          top:0;
          height:2px;
          background:#00d8ff;
          box-shadow:0 0 14px rgba(0,216,255,.7);
        }

        .uz-tab-icon{
          width:15px;
          display:grid;
          place-items:center;
          color:#38d8ff;
          font-size:13px;
          flex:0 0 auto;
        }

        .uz-tab-json{
          color:#facc15;
        }

        .uz-tab-close{
          margin-left:auto;
          color:#9db0c2;
          font-size:16px;
          line-height:1;
        }

        .uz-plus-tab{
          width:42px;
          height:43px;
          display:grid;
          place-items:center;
          color:#c6d3df;
          font-size:18px;
          border-right:1px solid rgba(255,255,255,.08);
          background:rgba(255,255,255,.025);
          flex:0 0 auto;
        }

        .uz-window-dots{
          margin-left:auto;
          height:43px;
          display:flex;
          align-items:center;
          gap:8px;
          padding:0 12px;
          background:rgba(255,255,255,.025);
          flex:0 0 auto;
        }

        .uz-dot{
          width:10px;
          height:10px;
          border-radius:50%;
        }

        .uz-dot.green{ background:#4ade80; box-shadow:0 0 10px rgba(74,222,128,.6); }
        .uz-dot.yellow{ background:#facc15; box-shadow:0 0 10px rgba(250,204,21,.55); }
        .uz-dot.red{ background:#fb7185; box-shadow:0 0 10px rgba(251,113,133,.55); }

        .uz-menu-dot{
          width:4px;
          height:4px;
          border-radius:50%;
          background:#d6e2ee;
          box-shadow:0 7px 0 #d6e2ee, 0 -7px 0 #d6e2ee;
          margin-left:6px;
        }

        .uz-code-area{
          flex:1;
          min-height:0;
          display:grid;
          grid-template-columns:minmax(0, 1fr) 88px;
          gap:8px;
          padding:8px 8px 8px 0;
          overflow:hidden;
          background:
            radial-gradient(circle at 50% 35%, rgba(0,216,255,.035), transparent 34%),
            linear-gradient(180deg, rgba(255,255,255,.032), rgba(255,255,255,.012)),
            rgba(0,0,0,.035);
        }

        .uz-code-area.welcome-mode{
          grid-template-columns:1fr;
          padding:0;
          background:
            radial-gradient(circle at 50% 45%, rgba(0,216,255,.05), transparent 34%),
            linear-gradient(180deg, rgba(255,255,255,.025), rgba(255,255,255,.008)),
            rgba(0,0,0,.02);
        }

        .uz-code-scroll{
          min-width:0;
          min-height:0;
          overflow:auto;
          padding-bottom:12px;
          background:
            linear-gradient(135deg, rgba(0,216,255,.032), transparent 35%),
            rgba(255,255,255,.015);
        }

        .uz-code{
          min-width:760px;
          font-family:"Cascadia Code","Fira Code","JetBrains Mono",Consolas,"Courier New",monospace;
          font-size:12px;
          line-height:1.56;
          color:#e5e7eb;
          padding-top:2px;
          text-shadow:0 0 8px rgba(0,0,0,.32);
        }

        .uz-code-line{
          display:grid;
          grid-template-columns:44px 1fr;
          min-height:19px;
          align-items:start;
        }

        .uz-line-no{
          color:rgba(166,184,205,.78);
          text-align:right;
          padding-right:14px;
          user-select:none;
        }

        .uz-line-code{
          color:#e5e7eb;
          white-space:pre;
        }

        .code-caret{
          display:inline-block;
          width:7px;
          height:14px;
          margin-left:48px;
          background:#facc15;
          animation:blinkCaret .8s infinite;
        }

        .tok-purple{ color:#d8b4fe; }
        .tok-cyan{ color:#67e8f9; }
        .tok-yellow{ color:#facc15; }
        .tok-green{ color:#86efac; }
        .tok-orange{ color:#fdba74; }
        .tok-white{ color:#e5e7eb; }

        .vscode-empty-editor{
          width:100%;
          height:100%;
          min-height:0;
          position:relative;
          display:grid;
          place-items:center;
          overflow:hidden;
          background:
            radial-gradient(circle at 50% 45%, rgba(0,216,255,.055), transparent 34%),
            linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.008)),
            rgba(0,0,0,.018);
        }

        .vscode-empty-editor::before{
          content:"";
          position:absolute;
          inset:0;
          background:
            linear-gradient(90deg, transparent 0%, rgba(255,255,255,.025) 50%, transparent 100%);
          opacity:.35;
          pointer-events:none;
        }

        .vscode-watermark{
          position:relative;
          z-index:1;
          width:min(620px, 78%);
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          text-align:center;
          opacity:.96;
          transform:translateY(-8px);
        }

        .vscode-empty-title{
          color:rgba(240,248,255,.96);
          font-size:28px;
          font-weight:800;
          letter-spacing:.01em;
          margin-bottom:12px;
          text-shadow:0 0 20px rgba(0,216,255,.14);
        }

        .vscode-empty-subtitle{
          max-width:560px;
          color:rgba(220,232,244,.84);
          font-size:14px;
          line-height:1.75;
          margin-bottom:28px;
        }

        .vscode-shortcuts{
          width:100%;
          max-width:520px;
          display:flex;
          flex-direction:column;
          gap:10px;
          font-family:"Cascadia Code","Fira Code","JetBrains Mono",Consolas,"Courier New",monospace;
        }

        .vscode-shortcut-row{
          min-height:30px;
          display:grid;
          grid-template-columns:104px 1fr;
          align-items:center;
          gap:14px;
          color:rgba(226,235,245,.82);
          font-size:12px;
        }

        .shortcut-key{
          height:26px;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          border-radius:7px;
          color:#86efff;
          background:rgba(0,216,255,.07);
          border:1px solid rgba(0,216,255,.18);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.06),
            0 0 14px rgba(0,216,255,.04);
          font-weight:700;
        }

        .shortcut-text{
          text-align:left;
          color:rgba(228,238,248,.86);
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }

        .vscode-shortcut-row:hover .shortcut-key{
          color:#bff8ff;
          border-color:rgba(0,216,255,.30);
          background:rgba(0,216,255,.11);
        }

        .vscode-shortcut-row:hover .shortcut-text{
          color:#ffffff;
        }

        .uz-minimap{
          border-left:1px solid rgba(255,255,255,.09);
          padding-left:9px;
          position:relative;
          opacity:.72;
          background:rgba(255,255,255,.012);
        }

        .uz-minimap-lines{
          width:52px;
          margin-top:8px;
          display:flex;
          flex-direction:column;
          gap:4px;
        }

        .uz-mini-line{
          height:2px;
          border-radius:6px;
          background:#67e8f9;
        }

        .uz-mini-line:nth-child(2n){ background:#facc15; width:76%; }
        .uz-mini-line:nth-child(3n){ background:#86efac; width:50%; }
        .uz-mini-line:nth-child(4n){ background:#d8b4fe; width:88%; }

        .uz-scrollbar{
          position:absolute;
          right:7px;
          top:10px;
          bottom:10px;
          width:4px;
          border-radius:999px;
          background:rgba(255,255,255,.065);
        }

        .uz-scrollbar::before{
          content:"";
          position:absolute;
          top:10px;
          left:0;
          right:0;
          height:58px;
          border-radius:999px;
          background:rgba(0,216,255,.46);
        }

        .uz-terminal{
          display:grid;
          grid-template-rows:37px minmax(0, 1fr);
          min-width:0;
          background:
            radial-gradient(circle at 80% 50%, rgba(0,216,255,.038), transparent 35%),
            linear-gradient(180deg, rgba(255,255,255,.028), rgba(255,255,255,.012)),
            rgba(2,6,14,.06);
          border-bottom:1px solid rgba(255,255,255,.085);
        }

        .uz-terminal-head{
          display:flex;
          align-items:center;
          gap:18px;
          padding:0 14px;
          background:rgba(255,255,255,.026);
          border-bottom:1px solid rgba(255,255,255,.085);
        }

        .uz-term-tab{
          height:37px;
          display:flex;
          align-items:center;
          color:#bdc8d6;
          font-size:10.5px;
          font-weight:800;
          position:relative;
          text-transform:uppercase;
          letter-spacing:.04em;
        }

        .uz-term-tab.active{
          color:#ffffff;
        }

        .uz-term-tab.active::after{
          content:"";
          position:absolute;
          left:0;
          right:0;
          bottom:0;
          height:2px;
          background:#00d8ff;
          box-shadow:0 0 12px rgba(0,216,255,.72);
        }

        .uz-terminal-tools{
          margin-left:auto;
          display:flex;
          align-items:center;
          gap:12px;
          color:#c6d3df;
          font-size:15px;
        }

        .uz-terminal-body{
          min-width:0;
          min-height:0;
          overflow:auto;
          padding:10px 16px 12px;
          background:
            linear-gradient(135deg, rgba(0,216,255,.022), transparent 38%),
            rgba(0,0,0,.025);
          font-family:"Cascadia Code","Fira Code","JetBrains Mono",Consolas,"Courier New",monospace;
          font-size:11.5px;
          line-height:1.52;
          text-shadow:0 0 8px rgba(0,0,0,.32);
        }

        .terminal-line{
          white-space:nowrap;
          margin-bottom:2px;
        }

        .terminal-line.muted{ color:#94a3b8; }
        .terminal-line.info{ color:#67e8f9; }
        .terminal-line.hint{ color:#fdba74; }
        .terminal-line.input{ color:#e5e7eb; }
        .terminal-line.run{ color:#ffffff; font-weight:900; }
        .terminal-line.process{ color:#c4b5fd; }
        .terminal-line.success{ color:#86efac; font-weight:900; }
        .terminal-line.error{ color:#fb7185; font-weight:900; }
        .terminal-line.warning{ color:#fdba74; font-weight:800; }

        .terminal-prefix{
          color:#22c55e;
          font-weight:900;
          margin-right:6px;
        }

        .terminal-code-form{
          min-width:720px;
          display:flex;
          flex-direction:column;
          gap:4px;
          margin-top:2px;
        }

        .terminal-code-row{
          min-height:24px;
          display:flex;
          align-items:center;
          white-space:nowrap;
          font-size:11.5px;
        }

        .terminal-code-row.active{
          background:rgba(0,216,255,.055);
          border-radius:6px;
          padding-left:4px;
          box-shadow:inset 0 0 0 1px rgba(0,216,255,.045);
        }

        .terminal-key{
          color:#67e8f9;
          font-weight:850;
          min-width:112px;
        }

        .terminal-colon{
          color:#e5e7eb;
          margin-right:8px;
        }

        .terminal-filled{
          color:#facc15;
          font-weight:750;
        }

        .terminal-inline-input{
          width:360px;
          border:0;
          outline:0;
          background:transparent;
          color:#ffffff;
          font:inherit;
          padding:0;
          caret-color:#facc15;
        }

        .terminal-inline-input::placeholder{
          color:rgba(255,255,255,.34);
        }

        .terminal-enter-line{
          min-height:25px;
          border:0;
          outline:0;
          background:transparent;
          display:flex;
          align-items:center;
          padding:0;
          margin-top:4px;
          cursor:pointer;
          font:inherit;
          text-align:left;
        }

        .terminal-enter-text{
          color:#86efac;
          font-weight:850;
          margin-left:4px;
        }

        .terminal-dots{
          display:inline-flex;
          width:28px;
          margin-left:4px;
          color:#facc15;
          font-weight:900;
        }

        .terminal-dots span{
          animation:terminalDot 1.25s infinite;
          opacity:.15;
        }

        .terminal-dots span:nth-child(1){ animation-delay:0s; }
        .terminal-dots span:nth-child(2){ animation-delay:.18s; }
        .terminal-dots span:nth-child(3){ animation-delay:.36s; }

        @keyframes terminalDot{
          0%, 20%{ opacity:.15; transform:translateY(0); }
          35%, 70%{ opacity:1; transform:translateY(-1px); }
          100%{ opacity:.15; transform:translateY(0); }
        }

        .terminal-command-line{
          min-width:720px;
          white-space:nowrap;
          margin:8px 0 2px;
        }

        .terminal-user{ color:#86efac; font-weight:900; }
        .terminal-at{ color:#e5e7eb; }
        .terminal-host{ color:#67e8f9; font-weight:900; }
        .terminal-path{ color:#c084fc; font-weight:800; }
        .terminal-symbol{ color:#facc15; font-weight:900; }
        .terminal-typed{ color:#ffffff; font-weight:850; }

        .terminal-caret{
          display:inline-block;
          width:7px;
          height:14px;
          margin-left:2px;
          background:#facc15;
          transform:translateY(2px);
          animation:blinkCaret .8s infinite;
        }

        @keyframes blinkCaret{
          0%, 45%{ opacity:1; }
          46%, 100%{ opacity:.1; }
        }

        .uz-status{
          display:grid;
          grid-template-columns:180px 90px 44px 44px 1fr 78px;
          align-items:center;
          background:
            linear-gradient(90deg, rgba(0,122,204,.72), rgba(0,122,204,.50)),
            rgba(255,255,255,.04);
          color:#ffffff;
          min-width:0;
        }

        .uz-status-cell{
          height:29px;
          min-width:0;
          display:flex;
          align-items:center;
          gap:8px;
          padding:0 10px;
          font-size:10.5px;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }

        .uz-status-right{
          justify-content:flex-end;
          gap:12px;
        }

        .uz-green-dot{
          width:7px;
          height:7px;
          border-radius:50%;
          background:#86efac;
          flex:0 0 auto;
          box-shadow:0 0 10px rgba(134,239,172,.55);
        }

        .uz-react-mini{
          font-size:13px;
        }

        @media (max-width: 1180px){
          .uz-window-wrap{
            top:92px;
            left:18px;
            right:18px;
            bottom:18px;
          }

          .uz-studio-window{
            grid-template-columns:52px 228px minmax(0, 1fr);
          }

          .uz-code{
            font-size:11.5px;
          }

          .uz-terminal-body{
            font-size:11px;
          }

          .boot-window{
            width:min(92vw, 720px);
          }
        }

        @media (max-width: 920px){
          .uz-window-wrap{
            top:82px;
            left:10px;
            right:10px;
            bottom:10px;
            overflow:auto;
          }

          .uz-studio-window{
            grid-template-columns:1fr;
            height:auto;
            min-height:calc(100vh - 92px);
          }

          .uz-rail{
            flex-direction:row;
            justify-content:flex-start;
            padding:9px;
            gap:8px;
            border-right:0;
            border-bottom:1px solid rgba(255,255,255,.075);
          }

          .uz-rail::before{
            display:none;
          }

          .uz-rail-icons{
            flex-direction:row;
            justify-content:flex-start;
            overflow:auto;
          }

          .uz-rail-bottom{
            margin-left:auto;
            margin-top:0;
          }

          .uz-explorer{
            border-right:0;
            border-bottom:1px solid rgba(255,255,255,.075);
            max-height:260px;
          }

          .uz-main,
          .uz-main.no-terminal{
            grid-template-rows:420px auto;
          }

          .uz-code-area{
            grid-template-columns:1fr;
          }

          .uz-minimap{
            display:none;
          }

          .terminal-code-form{
            min-width:0;
          }

          .terminal-command-line{
            min-width:0;
          }

          .terminal-inline-input{
            width:220px;
          }

          .uz-status{
            grid-template-columns:1fr;
          }

          .uz-status-cell{
            border-top:1px solid rgba(255,255,255,.14);
          }

          .uz-status-right{
            justify-content:flex-start;
          }

          .vscode-watermark{
            width:88%;
          }

          .vscode-shortcut-row{
            grid-template-columns:88px 1fr;
          }

          .shortcut-text{
            white-space:normal;
          }

          .boot-window{
            width:92vw;
          }
        }
      `}</style>

      <IntroLoader done={introDone} />

      <div className="uz-window-wrap">
        <div className="uz-studio-window">
          <aside className="uz-rail">
            <div className="uz-rail-icons">
              {railIcons.map((item, index) => (
                <div
                  key={index}
                  className={`uz-rail-icon ${item.active ? "active" : ""}`}
                >
                  {item.label}
                </div>
              ))}
            </div>

            <div className="uz-rail-bottom">
              <div className="uz-rail-mini-logo">S</div>
            </div>
          </aside>

          <aside className="uz-explorer">
            <div className="uz-panel-title">
              <span>Explorer</span>
              <svg className="uz-copy-icon" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 8V4h12v12h-4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 8h12v12H4z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="uz-tree">
              {services.map((group) => {
                const isOpen = group.groupId === openGroupId;
                const hasSelected = group.files.some(
                  (file) => file.id === selectedId
                );

                return (
                  <div className="uz-tree-group" key={group.groupId}>
                    <button
                      type="button"
                      className="uz-tree-main"
                      onClick={() => setOpenGroupId(isOpen ? "" : group.groupId)}
                    >
                      <span className="uz-caret">{isOpen ? "▼" : "▶"}</span>
                      <span className="uz-folder-icon">{group.groupIcon}</span>
                      <span
                        className="uz-tree-name"
                        style={{ color: hasSelected ? "#ffffff" : undefined }}
                      >
                        {group.groupTitle}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="uz-tree-files">
                        {group.files.map((file) => (
                          <button
                            type="button"
                            key={file.id}
                            className={`uz-file-btn ${
                              selectedId === file.id ? "selected" : ""
                            }`}
                            onClick={() => handleSelectFile(file)}
                          >
                            <span className="uz-file-icon">
                              {file.file.endsWith(".js") ? (
                                <span className="uz-js-badge">JS</span>
                              ) : file.file.endsWith(".ts") ? (
                                <span className="uz-js-badge">TS</span>
                              ) : file.file.endsWith(".fig") ? (
                                <span className="uz-js-badge">UI</span>
                              ) : (
                                <svg viewBox="0 0 24 24" fill="none">
                                  <path
                                    d="M6 3h8l4 4v14H6V3Z"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M14 3v5h5"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M9 13h6M9 17h6"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              )}
                            </span>
                            <span className="uz-file-label">{file.file}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>

          <section className={`uz-main ${selectedService ? "" : "no-terminal"}`}>
            <div className="uz-editor">
              <div className="uz-tabs">
                {selectedService ? (
                  <>
                    <button
                      type="button"
                      className={`uz-tab ${
                        activeTab === "service" ? "active" : ""
                      }`}
                      onClick={() => handleSelectTab("service")}
                    >
                      <span className="uz-tab-icon">⚛</span>
                      <span>{selectedService.file}</span>
                      <span className="uz-tab-close">×</span>
                    </button>

                    <button
                      type="button"
                      className={`uz-tab ${
                        activeTab === "price" ? "active" : ""
                      }`}
                      onClick={() => handleSelectTab("price")}
                    >
                      <span className="uz-tab-icon uz-tab-json">{"{}"}</span>
                      <span>narxlar.json</span>
                    </button>

                    <button
                      type="button"
                      className={`uz-tab ${
                        activeTab === "tech" ? "active" : ""
                      }`}
                      onClick={() => handleSelectTab("tech")}
                    >
                      <span className="uz-tab-icon">▣</span>
                      <span>texnologiyalar.md</span>
                    </button>
                  </>
                ) : (
                  <button type="button" className="uz-tab active welcome-tab">
                    <span className="uz-tab-icon">◇</span>
                    <span>get-started.md</span>
                  </button>
                )}

                <div className="uz-plus-tab">+</div>

                <div className="uz-window-dots">
                  <span className="uz-dot green" />
                  <span className="uz-dot yellow" />
                  <span className="uz-dot red" />
                  <span className="uz-menu-dot" />
                </div>
              </div>

              <div
                className={`uz-code-area ${
                  selectedService ? "" : "welcome-mode"
                }`}
              >
                {selectedService ? (
                  <>
                    <div className="uz-code-scroll">
                      <AnimatedCode
                        text={editorText}
                        animationKey={`${typingKey}-${activeTab}-${selectedService.id}`}
                      />
                    </div>

                    <div className="uz-minimap">
                      <div className="uz-minimap-lines">
                        {Array.from({ length: 22 }).map((_, i) => (
                          <div
                            key={i}
                            className="uz-mini-line"
                            style={{ width: `${34 + ((i * 13) % 48)}%` }}
                          />
                        ))}
                      </div>
                      <div className="uz-scrollbar" />
                    </div>
                  </>
                ) : (
                  <WelcomeEditor />
                )}
              </div>
            </div>

            {selectedService && (
              <div className="uz-terminal">
                <div className="uz-terminal-head">
                  <div className="uz-term-tab active">TERMINAL</div>
                  <div className="uz-term-tab">REQUEST</div>

                  <div className="uz-terminal-tools">
                    <span>+</span>
                    <span>▣</span>
                    <span>⌫</span>
                    <span>⌃</span>
                  </div>
                </div>

                <div className="uz-terminal-body" ref={terminalRef}>
                  {terminalLines.map((line, index) => (
                    <div key={index} className={`terminal-line ${line.type}`}>
                      <span className="terminal-prefix">&gt;</span>
                      {line.text}
                    </div>
                  ))}

                  {!isSending && terminalStep !== "done" && (
                    <form
                      className="terminal-code-form"
                      onSubmit={handleTerminalSubmit}
                    >
                      <div
                        className={`terminal-code-row ${
                          terminalStep === "name" ? "active" : ""
                        }`}
                      >
                        <span className="terminal-prefix">&gt;</span>
                        <span className="terminal-key">ism</span>
                        <span className="terminal-colon">:</span>

                        {terminalStep === "name" ? (
                          <input
                            className="terminal-inline-input"
                            value={terminalValue}
                            onChange={(e) => setTerminalValue(e.target.value)}
                            placeholder="ismingizni yozing"
                            autoFocus
                          />
                        ) : (
                          <span className="terminal-filled">
                            {clientName || "_"}
                          </span>
                        )}
                      </div>

                      <div
                        className={`terminal-code-row ${
                          terminalStep === "phone" ? "active" : ""
                        }`}
                      >
                        <span className="terminal-prefix">&gt;</span>
                        <span className="terminal-key">telefon</span>
                        <span className="terminal-colon">:</span>

                        {terminalStep === "phone" ? (
                          <input
                            className="terminal-inline-input"
                            value={terminalValue}
                            onChange={(e) => setTerminalValue(e.target.value)}
                            placeholder="+998 90 000 00 00"
                            autoFocus
                          />
                        ) : (
                          <span className="terminal-filled">
                            {clientPhone || "_"}
                          </span>
                        )}
                      </div>

                      <div
                        className={`terminal-code-row ${
                          terminalStep === "social" ? "active" : ""
                        }`}
                      >
                        <span className="terminal-prefix">&gt;</span>
                        <span className="terminal-key">telegram_user</span>
                        <span className="terminal-colon">:</span>

                        {terminalStep === "social" ? (
                          <input
                            className="terminal-inline-input"
                            value={terminalValue}
                            onChange={(e) => setTerminalValue(e.target.value)}
                            placeholder="@username yoki instagram"
                            autoFocus
                          />
                        ) : (
                          <span className="terminal-filled">
                            {clientSocial || "_"}
                          </span>
                        )}
                      </div>

                      <button
                        ref={submitButtonRef}
                        className="terminal-enter-line"
                        type="submit"
                      >
                        <span className="terminal-prefix">&gt;</span>
                        <span className="terminal-enter-text">
                          {terminalStep === "ready"
                            ? "Enter bosib arizani yuboring"
                            : "Enter bosib davom eting"}
                        </span>
                        <span className="terminal-dots">
                          <span>.</span>
                          <span>.</span>
                          <span>.</span>
                        </span>
                      </button>
                    </form>
                  )}

                  {(autoCommand || isSending) && (
                    <div className="terminal-command-line">
                      <span className="terminal-user">sharqtech</span>
                      <span className="terminal-at">@</span>
                      <span className="terminal-host">dev-studio</span>
                      <span className="terminal-path"> ~/services</span>
                      <span className="terminal-symbol"> $ </span>
                      <span className="terminal-typed">{autoCommand}</span>
                      <span className="terminal-caret" />
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="uz-status">
              <div className="uz-status-cell">
                <span className="uz-green-dot" />
                <span>SharqTech Dev Studio</span>
              </div>

              <div className="uz-status-cell">
                <span>⑂</span>
                <span>{activeGroup?.groupId || "services"}</span>
              </div>

              <div className="uz-status-cell">
                <span>ⓧ</span>
                <span>0</span>
              </div>

              <div className="uz-status-cell">
                <span>△</span>
                <span>0</span>
              </div>

              <div className="uz-status-cell uz-status-right">
                <span>{selectedService ? "Ln 1, Col 1" : "Get Started"}</span>
                <span>Spaces: 2</span>
                <span>UTF-8</span>
                <span>LF</span>
                <span>{selectedService ? "JSX" : "MD"}</span>
                <span className="uz-react-mini">⚛</span>
              </div>

              <div className="uz-status-cell">
                <span className="uz-green-dot" />
                <span>Online</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}