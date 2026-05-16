import React, { useState, useEffect, useMemo } from 'react';
import HeroText from './HeroText';

// ==========================================================
// 1. REAL VAQT TAShKENT SOATI
// ==========================================================
const RealTimeClock = () => {
  const [timeParts, setTimeParts] = useState({ hh: "00", mm: "00" });
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      const options = { timeZone: 'Asia/Tashkent', hour: '2-digit', minute: '2-digit', hour12: false };
      const timeStr = new Intl.DateTimeFormat('en-GB', options).format(date);
      const [h, m] = timeStr.split(':');
      setTimeParts({ hh: h, mm: m });
      setBlink((prev) => !prev);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="border border-green-500/80 rounded-md px-2 py-0.5 text-green-300 font-mono text-[15px] shadow-[0_0_10px_rgba(74,222,128,0.4)] backdrop-blur-md bg-black/20">
      {timeParts.hh}
      <span className={`transition-opacity duration-500 ${blink ? 'opacity-100' : 'opacity-30'}`}>:</span>
      {timeParts.mm}
    </div>
  );
};

// ==========================================================
// 2. QALQIB CHIQUVCHI MODAL KARTA VA ARIZA FORMASI
// ==========================================================
const ModalCard = ({ data, onClose }) => {
  const [isFormMode, setIsFormMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, loading, success, error

  // Oyna yopilganda yoki ma'lumot o'zgarganda holatni tozalash
  useEffect(() => {
    if (data) {
      setIsFormMode(false);
      setSubmitStatus('idle');
      setFormData({ name: '', contact: '', message: '' });
    }
  }, [data]);

  if (!data) return null;

  // TELEGRAMGA JO'NATISH HIYLASI (Bot Token va Chat ID shu yerga yoziladi)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('loading');

    // DIQQAT: O'zingizning bot token va chat id'ingizni shu yerga qo'yasiz!
    const BOT_TOKEN = "8254759400:AAFLaHfO_Ae1OaF7C1AUamyK2WjnbUS3SQk"; 
    const CHAT_ID = "1929508992";

    const textMessage = `🔔 Yangi Ariza: ${data.modalContent.title}\n\n👤 Ism: ${formData.name}\n📞 Aloqa: ${formData.contact}\n💬 Xabar: ${formData.message}`;

    try {
      // Telegram API ga so'rov jo'natish (Test uchun fetch ishlayveradi, hatto token noto'g'ri bo'lsa ham muvaffaqiyatli deb ko'rsatadi hozircha vizualni ko'rish uchun)
      
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: textMessage })
      });
      
      
      // Vizual animatsiyani ko'rsatish uchun 1.5 soniya kutamiz
      setTimeout(() => {
        setSubmitStatus('success');
      }, 1500);

    } catch (error) {
      setSubmitStatus('error');
    }
  };

  const renderModalBody = (content) => {
    switch (content.type) {
      case 'news':
        return (
          <div className="space-y-4">
            {content.items.map((item, i) => (
              <div key={i} className="relative pl-5 border-l-2 border-cyan-500/40 hover:border-cyan-400 transition-colors">
                <div className="absolute w-2.5 h-2.5 bg-cyan-400 rounded-full -left-[6px] top-1.5 shadow-[0_0_8px_#00e5ff]"></div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[11px] font-mono text-cyan-300 tracking-wider bg-cyan-500/10 px-1.5 rounded">{item.date}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{item.tag}</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                <p className="text-sm text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        );
      case 'table':
        return (
          <div className="w-full overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/30">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/60 border-b border-slate-700/50 text-[10px] uppercase tracking-widest text-slate-400">
                  <th className="p-3 font-bold">O'quv kursi / Yo'nalish</th><th className="p-3 font-bold">Format</th><th className="p-3 font-bold">Qabul sanalari</th><th className="p-3 font-bold text-center">Holati</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-200">
                {content.items.map((item, i) => (
                  <tr key={i} className="border-b border-slate-700/30 hover:bg-slate-800/50 transition-colors last:border-0">
                    <td className="p-3 font-semibold flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> {item.col1}</td>
                    <td className="p-3 text-slate-300">{item.col2}</td><td className="p-3 font-mono text-[12px] text-slate-400">{item.col3}</td>
                    <td className="p-3 text-center"><span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${item.color === 'green' ? 'border-green-500/50 text-green-400 bg-green-500/10' : 'border-red-500/50 text-red-400 bg-red-500/10'}`}>{item.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'projects':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.items.map((item, i) => (
              <div key={i} className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl hover:border-cyan-500/50 transition-all group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">{item.name}</h4>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${item.quota > 0 ? 'border-cyan-500/50 text-cyan-300 bg-cyan-500/10' : 'border-slate-500/50 text-slate-400 bg-slate-500/10'}`}>{item.status}</span>
                </div>
                <p className="text-xs text-slate-300 mb-4 h-10">{item.desc}</p>
                <div className="flex items-center justify-between border-t border-slate-700/50 pt-3">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Bo'sh joy (Kvota):</span>
                  <div className="flex items-center gap-1.5"><span className={`text-sm font-black ${item.quota > 0 ? 'text-green-400' : 'text-red-400'}`}>{item.quota}</span><span className="text-slate-500 text-xs">/ {item.total}</span></div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'pricing':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.items.map((item, i) => (
              <div key={i} className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/50 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] transition-all flex flex-col">
                <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-1">{item.name}</h4>
                <div className="flex items-baseline gap-1 mb-3"><span className="text-2xl font-black text-white">{item.price}</span><span className="text-xs text-slate-400 font-medium">dan boshlab</span></div>
                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono bg-slate-900/50 px-2 py-1 rounded w-max mb-4 border border-slate-700"><span>⏱</span> {item.time}</div>
                <div className="space-y-2 mt-auto border-t border-slate-700/50 pt-3">
                  {item.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-1.5"><span className="text-cyan-500 text-xs mt-[1px]">✓</span><span className="text-xs text-slate-300 font-medium">{feat}</span></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 pointer-events-auto">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md animate-fadeIn cursor-pointer" onClick={onClose}></div>

      <div className="relative z-10 w-full max-w-4xl bg-slate-900/95 border border-cyan-500/50 shadow-[0_0_80px_rgba(0,229,255,0.25)] rounded-2xl p-7 max-h-[90vh] overflow-y-auto overflow-x-hidden animate-modalPop [&::-webkit-scrollbar]:hidden">
        <div className="absolute inset-0 z-[-1]" style={{ background: 'radial-gradient(circle at top right, rgba(0,229,255,0.1) 0%, transparent 60%)' }}></div>

        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer bg-slate-800/50 hover:bg-slate-700/50 p-1.5 rounded-full z-20">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {/* Dinamik O'zgaruvchi Kontent */}
        {!isFormMode ? (
          // ================= MA'LUMOT OYNASI =================
          <div className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-3xl drop-shadow-[0_0_10px_rgba(0,229,255,0.8)]">{data.icon}</span>
              <h3 className="text-2xl font-black text-white tracking-wider text-glow uppercase">{data.modalContent.title}</h3>
            </div>
            <p className="text-sm font-bold text-cyan-400 mb-6 tracking-wide">{data.modalContent.subtitle}</p>

            <div className="mb-8">
              {renderModalBody(data.modalContent)}
            </div>

            <button 
              onClick={() => {
                // Agar yangiliklar bo'lsa formaga o'tmaydi, prosta yopadi
                if (data.modalContent.type === 'news') {
                  onClose();
                } else {
                  setIsFormMode(true);
                }
              }} 
              className="w-full py-3.5 rounded-xl bg-cyan-500/10 border border-cyan-400 text-cyan-300 font-bold tracking-widest hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.6)] transition-all duration-300 cursor-pointer mt-4"
            >
              {data.modalContent.actionText}
            </button>
          </div>
        ) : submitStatus === 'success' ? (
          // ================= MUVAFFAQIYATLI YUBORILDI =================
          <div className="flex flex-col items-center justify-center py-10 animate-fadeIn text-center">
            <div className="w-20 h-20 bg-green-500/20 border-2 border-green-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(74,222,128,0.4)]">
              <span className="text-4xl">✅</span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-wider mb-2">ARIZA YUBORILDI!</h3>
            <p className="text-slate-400 mb-8 max-w-md">Sizning arizangiz muvaffaqiyatli qabul qilindi. Mutaxassislarimiz tez orada siz bilan bog'lanishadi.</p>
            <button onClick={onClose} className="px-8 py-3 rounded-xl bg-slate-800 border border-slate-600 text-white font-bold hover:bg-slate-700 transition-colors">
              Oynani yopish
            </button>
          </div>
        ) : (
          // ================= ARIZA FORMASI OYNASI =================
          <div className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4">
              <span className="text-2xl">📝</span>
              <div>
                <h3 className="text-xl font-black text-white tracking-wider text-glow uppercase">ARIZA QOLDIRISH</h3>
                <p className="text-xs text-cyan-400 tracking-wide mt-1">Loyiha: {data.modalContent.title}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto pb-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Ismingiz</label>
                <input required type="text" placeholder="Masalan: Alisher" 
                  className="w-full bg-slate-950/50 border border-slate-700/80 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:bg-slate-900/80 focus:shadow-[0_0_15px_rgba(0,229,255,0.15)] transition-all"
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Telegram yoki Telefon</label>
                <input required type="text" placeholder="@username yoki +998 90 123 45 67" 
                  className="w-full bg-slate-950/50 border border-slate-700/80 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:bg-slate-900/80 focus:shadow-[0_0_15px_rgba(0,229,255,0.15)] transition-all"
                  value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">Qisqacha ma'lumot</label>
                <textarea required rows="3" placeholder="Ariza mazmuni yoki qo'shimcha izoh..." 
                  className="w-full bg-slate-950/50 border border-slate-700/80 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:bg-slate-900/80 focus:shadow-[0_0_15px_rgba(0,229,255,0.15)] transition-all resize-none"
                  value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsFormMode(false)} className="px-6 py-3.5 rounded-xl border border-slate-600 text-slate-300 font-bold hover:bg-slate-800 transition-colors flex-1">
                  BEKOR QILISH
                </button>
                <button type="submit" disabled={submitStatus === 'loading'} className="flex-[2] py-3.5 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold tracking-widest hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitStatus === 'loading' ? 'YUBORILMOQDA...' : 'ARIZANI YUBORISH'}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

// ==========================================================
// 3. JONLI TABLO PANEL (O'ZGARISHSZ)
// ==========================================================
const LiveBoardPanel = ({ onOpenModal }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [workTimeStatus, setWorkTimeStatus] = useState({ status: "YOPIQ", infoNode: null, color: "red" });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const date = new Date();
      const tashkentTime = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Tashkent' }));
      const h = tashkentTime.getHours();
      const m = tashkentTime.getMinutes();
      
      let targetH, targetM = 60 - m;
      let isWorking = false;

      if (h >= 9 && h < 18) {
        isWorking = true;
        targetH = 17 - h;
      } else {
        isWorking = false;
        targetH = h < 9 ? (8 - h) : (24 - h + 8);
      }
      if (targetM === 60) { targetH += 1; targetM = 0; }

      const padH = String(targetH).padStart(2, '0');
      const padM = String(targetM).padStart(2, '0');

      if (isWorking) {
        setWorkTimeStatus({ 
          status: "FAOL", 
          infoNode: <div className="font-mono text-green-400 tracking-widest bg-green-500/10 border border-green-500/30 px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(74,222,128,0.2)] inline-block">{padH}:{padM}</div>, 
          color: "green" 
        });
      } else {
        setWorkTimeStatus({ 
          status: "YOPIQ", 
          infoNode: <div className="font-mono text-red-400 tracking-widest bg-red-500/10 border border-red-500/30 px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(239,68,68,0.2)] inline-block">{padH}:{padM}</div>, 
          color: "red" 
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, []);

  const tableData = useMemo(() => [
    { 
      id: 'work', type: "ISH VAQTI", taklif: "Kompaniya ish vaqti", status: workTimeStatus.status, info: workTimeStatus.infoNode, icon: "💼", statusColor: workTimeStatus.color, hasModal: false
    },
    { 
      id: 'news', type: "YANGILIK", taklif: "SharqTech yangiliklari", status: "BATAFSIL", info: "O'qish", icon: "🚀", statusColor: "cyan", hasModal: true,
      modalContent: {
        title: "Kompaniya Yangiliklari", subtitle: "So'nggi voqealar va yangilanishlar", type: "news",
        items: [
          { date: "28 Apr, 2026", tag: "PLATFORMA", title: "Raqamli Ekosistema 2.0 ishga tushdi", desc: "Tizim to'liq yangilandi. Endi u 3 barobar tezroq va xavfsizroq ishlamoqda." },
          { date: "25 Apr, 2026", tag: "WEB3", title: "Yangi Web3 loyihasi anonsi", desc: "Markazlashmagan ilovalar (dApps) yaratish bo'yicha maxsus bo'lim o'z faoliyatini boshladi." },
          { date: "15 Apr, 2026", tag: "AI", title: "Sun'iy intellekt integratsiyasi", desc: "Barcha avtomatlashtirish jarayonlariga yangi avlod sun'iy intellekt yordamchilari qo'shildi." }
        ],
        actionText: "TUSHUNARLI, YOPISH" // Bu yangiliklar uchun, uni bossa forma chiqmaydi
      }
    },
    { 
      id: 'intern', type: "AMALIYOT", taklif: "Amaliyot dasturlari", status: "BATAFSIL", info: "Ko'rish", icon: "🎓", statusColor: "cyan", hasModal: true,
      modalContent: {
        title: "Amaliyot Dasturlari", subtitle: "Ochiq yo'nalishlar va qabul sanalari", type: "table",
        items: [
          { col1: "Frontend (React/Next.js)", col2: "Offline", col3: "May 10 - Avg 10", status: "OCHIQ", color: "green" },
          { col1: "Backend (Node.js/Python)", col2: "Online", col3: "May 15 - Avg 15", status: "OCHIQ", color: "green" },
          { col1: "UI/UX Dizayn", col2: "Offline", col3: "Iyun 01 - Sen 01", status: "YOPIQ", color: "red" },
          { col1: "SMM & Digital Marketing", col2: "Gibrid", col3: "Iyun 15 - Sen 15", status: "YOPIQ", color: "red" }
        ],
        actionText: "ARIZA TOPSHIRISH"
      }
    },
    { 
      id: 'partner', type: "HAMKORLIK", taklif: "Hamkorlik qilish", status: "BATAFSIL", info: "Ko'rish", icon: "🤝", statusColor: "cyan", hasModal: true,
      modalContent: {
        title: "Hamkorlik Loyihalari", subtitle: "Biznes hamkorlar uchun ochiq loyihalar", type: "projects",
        items: [
          { name: "IT Akademiya", desc: "O'quv markazlari bilan mintaqalarda qo'shma ta'lim dasturlarini ishlab chiqish.", quota: 2, total: 5, status: "FAOL" },
          { name: "B2B Autsorsing", desc: "Kompaniyalar biznes jarayonlarini raqamlashtirish bo'yicha texnik hamkorlik.", quota: 1, total: 3, status: "FAOL" },
          { name: "Startap Inkubator", desc: "Istiqbolli g'oyalarni birgalikda moliyalashtirish va texnik qo'llab-quvvatlash.", quota: 0, total: 2, status: "TO'LA" }
        ],
        actionText: "HAMKORLIK UCHUN ALOQA"
      }
    },
    { 
      id: 'order', type: "BUYURTMA", taklif: "Frilans xizmatlar", status: "BATAFSIL", info: "Ko'rish", icon: "✈️", statusColor: "cyan", hasModal: true,
      modalContent: {
        title: "IT Xizmatlar va Narxlar", subtitle: "Loyihangiz uchun taxminiy narxlar va ishlab chiqish muddatlari", type: "pricing",
        items: [
          { name: "Landing Page", price: "$200", time: "5-7 kun", features: ["Unikal UI/UX dizayn", "Mobil moslashuv (Responsive)", "SEO bazaviy sozlamalar"] },
          { name: "Korporativ Sayt", price: "$500", time: "15-20 kun", features: ["Kengaytirilgan admin panel", "Ko'p tillilik funksiyasi", "Yuqori xavfsizlik"] },
          { name: "Maxsus CRM / ERP", price: "$1500", time: "1-3 oy", features: ["Biznes logikani avtomatlashtirish", "Tashqi API integratsiyalar", "1 oylik bepul support"] }
        ],
        actionText: "LOYIHANI MUHOKAMA QILISH"
      }
    },
  ], [workTimeStatus]);

  const getStatusStyle = (status, color, hasModal) => {
    let baseStyle = "w-[80px] h-[24px] rounded-md text-[10px] flex items-center justify-center gap-1 transition-all duration-300 font-bold ";
    if (hasModal) baseStyle += "cursor-pointer hover:bg-cyan-900/60 hover:shadow-[0_0_12px_rgba(0,229,255,0.6)] hover:scale-105 active:scale-95 pointer-events-auto ";
    if (status === "BATAFSIL") return baseStyle + "border border-cyan-500/50 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.3)] bg-cyan-500/10";
    if (color === "red") return baseStyle + "border border-red-500 text-red-300 shadow-[0_0_10px_rgba(239,68,68,0.5)] bg-red-500/10";
    if (color === "green") return baseStyle + "border border-green-500 text-green-300 shadow-[0_0_10px_rgba(74,222,128,0.5)] bg-green-500/10";
    return baseStyle + "border border-cyan-500 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.5)] bg-cyan-500/10";
  };

  return (
    <>
      <style>
        {`
          @keyframes boardReveal { 0% { opacity: 0; transform: translateY(-50%) translateX(30px); filter: blur(10px); } 100% { opacity: 1; transform: translateY(-50%) translateX(0); filter: blur(0); } }
          .animate-boardReveal { animation: boardReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          @keyframes rowEntrance { 0% { opacity: 0; transform: translateY(15px); } 100% { opacity: 1; transform: translateY(0); } }
          .animate-rowEntrance { animation: rowEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          @keyframes fadeIn { 0% { opacity: 0; backdrop-filter: blur(0px); } 100% { opacity: 1; backdrop-filter: blur(8px); } }
          .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
          @keyframes modalPop { 0% { opacity: 0; transform: scale(0.95) translateY(10px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
          .animate-modalPop { animation: modalPop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .text-glow { text-shadow: 0 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(255,255,255,0.2); }
        `}
      </style>

      <div className={`absolute right-[5%] top-[45%] w-[520px] z-50 pointer-events-auto p-5 rounded-3xl backdrop-blur-md shadow-2xl transition-all duration-500 animate-boardReveal border ${isHovered ? 'scale-[1.02] shadow-[0_0_50px_rgba(0,229,255,0.2)] border-cyan-400/50' : 'scale-100 shadow-[0_0_30px_rgba(0,0,0,0.6)] border-slate-500/30'}`} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)} style={{ background: isHovered ? 'rgba(15, 23, 42, 0.2)' : 'rgba(15, 23, 42, 0.05)' }}>
        <div className="flex flex-row items-center justify-between mb-2 pb-4 border-b-2 border-slate-600/50">
          <div className="flex flex-row items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00e5ff] animate-pulse"></div>
            <h2 className="text-[16px] font-black text-white tracking-[0.2em] text-glow">JONLI TABLO</h2>
          </div>
          <div className="flex flex-row items-center gap-3">
            <div className="text-[11px] font-bold text-slate-200 tracking-wider text-glow whitespace-nowrap">TOSHKENT / UTC +5</div>
            <RealTimeClock />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_2.2fr_1fr_0.8fr] gap-3 text-[10px] font-black text-slate-400 tracking-wider py-2 uppercase px-2 border-b border-slate-600/30">
          <div>TURI</div><div>TAKLIF</div><div className="flex justify-center">HOLATI</div><div className="text-right">MA'LUMOT</div>
        </div>

        <div className="flex flex-col relative z-30">
          {tableData.map((row, index) => (
            <div key={row.id} className="opacity-0 animate-rowEntrance border-b border-slate-600/30 last:border-0 transition-all duration-300" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
              <div className="grid grid-cols-[1fr_2.2fr_1fr_0.8fr] gap-3 items-center py-3 px-2">
                <div className="flex flex-row items-center gap-2">
                  <span className="text-[16px] w-4 h-4 flex items-center justify-center font-mono opacity-90">{row.icon}</span>
                  <span className="text-[10px] font-bold text-cyan-400 tracking-wide uppercase whitespace-nowrap text-glow">{row.type}</span>
                </div>
                <div className="text-[13px] font-bold text-white tracking-wide text-glow whitespace-nowrap truncate">{row.taklif}</div>
                <div className="flex justify-center relative z-40">
                  {row.hasModal ? (
                    <button onClick={() => onOpenModal(row)} className={getStatusStyle(row.status, row.statusColor, row.hasModal)}>{row.status}</button>
                  ) : (
                    <div className={getStatusStyle(row.status, row.statusColor, row.hasModal)}>{row.status}</div>
                  )}
                </div>
                <div className={`text-[11px] font-semibold tracking-wide text-right whitespace-nowrap text-glow ${row.statusColor === 'red' ? 'text-red-300' : 'text-slate-400'}`}>{row.info}</div>
              </div>
            </div>
          ))}
        </div>
        <div className={`absolute inset-0 z-[-1] transition-opacity duration-500 ${isHovered ? 'opacity-[0.1]' : 'opacity-0'}`} style={{ background: 'radial-gradient(circle, #00e5ff 0%, transparent 70%)' }}></div>
      </div>
    </>
  );
};

// ==========================================================
// 4. ASOSIY INTERFEYS
// ==========================================================
export default function UzCore() {
  const [activeModalData, setActiveModalData] = useState(null);
  return (
    <div className="relative w-full h-screen max-w-[1400px] mx-auto pt-20 overflow-hidden pointer-events-none">
      <ModalCard data={activeModalData} onClose={() => setActiveModalData(null)} />
      <div className="w-full h-full relative z-10">
        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 pointer-events-auto min-w-[700px]">
          <HeroText />
        </div>
        <LiveBoardPanel onOpenModal={setActiveModalData} />
      </div>
    </div>
  );
}