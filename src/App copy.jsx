import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Target, 
  BarChart, Zap, CheckCircle2, 
  ChevronRight, Building2, Briefcase, 
  Wine, Stethoscope, GraduationCap, 
  Eye, X, Play, Activity, Hexagon, Layers,
  Menu
} from 'lucide-react';

/* --- CUSTOM HOOK & COMPONENT FOR SCROLL ANIMATIONS --- */
const Reveal = ({ children, className = '', delay = 0, type = 'fade-up', threshold = 0.1 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: threshold }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.disconnect(); };
  }, [threshold]);

  let initialStyles = 'opacity-0 ';
  if (type === 'fade-up') initialStyles += 'translate-y-12';
  else if (type === 'fade-left') initialStyles += 'translate-x-12';
  else if (type === 'fade-right') initialStyles += '-translate-x-12';
  else if (type === 'scale') initialStyles += 'scale-[0.95]';

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isVisible ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : initialStyles}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* --- MAIN APP --- */
const App = () => {
  const [currentPage, setCurrentPage] = useState('about');
  const [activeModal, setActiveModal] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Smooth scroll logic
  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  // Auto-scroll to top whenever currentPage changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [activeModal]);

  // Navbar blur effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0C1838] font-sans selection:bg-[#C5A059] selection:text-white">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .drop-cap:first-letter {
          float: left;
          font-size: 3.2rem;
          line-height: 0.85;
          padding-top: 4px;
          padding-right: 8px;
          padding-left: 0px;
          font-family: 'Playfair Display', serif;
          color: #C5A059;
          font-weight: 600;
        }
        .text-balance { text-wrap: balance; }
      `}} />

      {/* Navbar */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled ? 'bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#0C1838]/10 shadow-sm py-0' : 'bg-transparent py-2'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigateTo('about')}>
              <span className="text-2xl font-serif font-bold tracking-tight text-[#0C1838]">
                TrudieLab<span className="text-[#C5A059]">.</span>
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              <button onClick={() => navigateTo('about')} className={`text-xs tracking-widest uppercase font-semibold transition-colors ${currentPage === 'about' ? 'text-[#C5A059]' : 'text-[#0C1838]/60 hover:text-[#0C1838]'}`}>Giới Thiệu</button>
              <button onClick={() => navigateTo('experience')} className={`text-xs tracking-widest uppercase font-semibold transition-colors ${currentPage === 'experience' ? 'text-[#C5A059]' : 'text-[#0C1838]/60 hover:text-[#0C1838]'}`}>Hồ Sơ Năng Lực</button>
              <button onClick={() => navigateTo('contact')} className="px-6 py-3 bg-[#0C1838] text-white text-xs font-semibold tracking-widest uppercase hover:bg-[#C5A059] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300">
                Thẩm Định Hệ Thống
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#0C1838] hover:text-[#C5A059] transition-colors p-1">
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <div className={`md:hidden absolute top-full left-0 w-full bg-[#FAF9F6] border-b border-[#0C1838]/10 shadow-xl transition-all duration-300 origin-top overflow-hidden ${isMobileMenuOpen ? 'opacity-100 max-h-[400px]' : 'opacity-0 max-h-0 pointer-events-none'}`}>
            <div className="flex flex-col px-6 py-6 space-y-4">
              <button onClick={() => navigateTo('about')} className={`text-left text-sm tracking-widest uppercase font-bold transition-colors py-2 ${currentPage === 'about' ? 'text-[#C5A059]' : 'text-[#0C1838]'}`}>Giới Thiệu</button>
              <button onClick={() => navigateTo('experience')} className={`text-left text-sm tracking-widest uppercase font-bold transition-colors py-2 ${currentPage === 'experience' ? 'text-[#C5A059]' : 'text-[#0C1838]'}`}>Hồ Sơ Năng Lực</button>
              <button onClick={() => navigateTo('contact')} className="w-full py-4 bg-[#0C1838] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#C5A059] transition-colors mt-2">
                Thẩm Định Hệ Thống
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 md:pt-32 pb-12 md:pb-20">
        {currentPage === 'about' && <AboutPage navigateTo={navigateTo} setActiveModal={setActiveModal} />}
        {currentPage === 'experience' && <ExperiencePage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Footer */}
      <footer className="bg-[#0C1838] text-[#FAF9F6] pt-16 md:pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
            <Reveal type="fade-up" className="sm:col-span-2 md:col-span-2">
              <span className="text-2xl font-serif font-bold tracking-tight mb-4 md:mb-6 block">
                TrudieLab<span className="text-[#C5A059]">.</span>
              </span>
              <p className="text-white/60 text-sm max-w-sm leading-relaxed font-light">
                Cố vấn chiến lược và kiến trúc sư hệ thống AI Agent chuyên sâu. Chuyển giao sự phức tạp của vận hành cho máy học, trả lại sự tự do cho giới tinh hoa và lãnh đạo cấp cao.
              </p>
            </Reveal>
            <Reveal type="fade-up" delay={100}>
              <h4 className="font-serif text-lg text-[#C5A059] mb-3 md:mb-4">Trụ Sở</h4>
              <p className="text-white/60 text-sm font-light">Hồ Chí Minh, Vietnam<br/>Phục vụ đối tác toàn cầu.</p>
            </Reveal>
            <Reveal type="fade-up" delay={200}>
              <h4 className="font-serif text-lg text-[#C5A059] mb-3 md:mb-4">Liên Hệ</h4>
              <p className="text-white/60 text-sm font-light">ceo@trudielab.com<br/>Business Inquiries Only.</p>
            </Reveal>
          </div>
          <Reveal type="fade-in" delay={300} className="border-t border-white/10 pt-8 text-[10px] tracking-widest uppercase text-white/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p>© 2026 TRUDIELAB INC. KHANG & TRÚC.</p>
            <p>PRIVACY / TERMS</p>
          </Reveal>
        </div>
      </footer>

      {activeModal && <SolutionModal modalType={activeModal} closeModal={() => setActiveModal(null)} />}
    </div>
  );
};

/* --- ABOUT PAGE (GIỚI THIỆU) --- */
const AboutPage = ({ navigateTo, setActiveModal }) => {
  return (
    <div className="animate-in fade-in duration-1000">
      
      {/* 1. Editorial Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-6 md:pt-12 pb-16 md:pb-24 border-b border-[#0C1838]/10 overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <Reveal type="fade-up" delay={0}>
              <div className="text-[#C5A059] text-[10px] font-bold tracking-[0.2em] uppercase mb-6 md:mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#C5A059]"></span> Tái thiết lập trật tự doanh nghiệp
              </div>
            </Reveal>
            
            <Reveal type="fade-up" delay={150}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-[#0C1838] leading-[1.3] md:leading-[1.25] mb-6 md:mb-8 text-balance">
                Chuyển giao sự phức tạp cho hệ thống máy học.<br/>
                <span className="italic text-[#C5A059] font-light">Giải phóng năng lực lãnh đạo.</span>
              </h1>
            </Reveal>
            
            <Reveal type="fade-up" delay={300}>
              <p className="text-sm md:text-base text-[#0C1838]/70 max-w-xl leading-relaxed mb-8 md:mb-12 font-light">
                Sự xa xỉ lớn nhất của một CEO là thời gian và khoảng không để tư duy chiến lược. Trudie Lab không bán công cụ phần mềm, chúng tôi thiết kế những <strong>"cỗ máy doanh thu tĩnh lặng"</strong>—nơi AI Agent tự động hóa toàn bộ vòng lặp tìm kiếm, đàm phán và chốt sales High-Ticket mà không cần sự can thiệp từ con người.
              </p>
            </Reveal>
            
            <Reveal type="fade-up" delay={450}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                <button onClick={() => navigateTo('contact')} className="px-6 md:px-8 py-4 bg-[#0C1838] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#C5A059] transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:-translate-y-1">
                  Đăng Ký Đánh Giá Doanh Nghiệp
                </button>
                <button onClick={() => navigateTo('experience')} className="text-[#0C1838] text-sm font-serif font-medium italic hover:text-[#C5A059] flex items-center justify-center gap-2 transition-colors py-2 group">
                  Xem thư viện Case Study <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </Reveal>
          </div>
          
          <div className="lg:col-span-5 relative hidden lg:block">
            <Reveal type="scale" delay={400}>
              <div className="aspect-[4/5] w-full bg-[#E5E0D8] p-3 relative shadow-2xl">
                <div className="w-full h-full border border-[#0C1838]/20 flex flex-col items-center justify-center text-center p-8 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-[#0C1838]/5 group-hover:bg-[#0C1838]/10 transition-colors duration-500"></div>
                   <div className="w-16 h-16 border border-[#0C1838]/20 rounded-full flex items-center justify-center mb-6 z-10 animate-pulse">
                     <Hexagon className="text-[#0C1838]/40 w-6 h-6 stroke-1" />
                   </div>
                   <p className="font-serif italic text-[#0C1838]/50 text-sm z-10">[ Conceptual Image: The intersection of human strategy and neural networks ]</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Triết lý Vận Hành (The Core Philosophy) */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 lg:px-8 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <Reveal type="fade-right">
            <div>
              <span className="text-[#C5A059] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">Triết lý Trudie Lab</span>
              <h2 className="text-3xl md:text-4xl font-serif text-[#0C1838] mb-6 md:mb-8 leading-snug">
                Nghệ thuật của sự <br/><span className="italic">Vận hành Tĩnh lặng.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal type="fade-left" delay={200}>
            <div>
              <p className="drop-cap text-[#0C1838]/80 text-sm leading-relaxed mb-6">
                Một hệ thống kinh doanh xuất chúng là một hệ thống mà bạn không cảm nhận được sự tồn tại của nó. Nó không gây ồn ào bằng những cuộc họp báo cáo tiến độ dài lê thê, không phụ thuộc vào cảm xúc của nhân viên sale, và không đứt gãy khi tăng tốc độ phủ thị trường.
              </p>
              <p className="text-[#0C1838]/80 text-sm leading-relaxed mb-6">
                Đó là khái niệm <strong>"Silent Operations"</strong> (Vận hành tĩnh lặng) mà Khang và Trúc theo đuổi. Bằng cách kết hợp giữa tư duy quản trị chiến lược (Business Base) và kiến trúc tự động hóa đa luồng (IT Base), chúng tôi tạo ra một lớp màng lọc công nghệ tàng hình. Màng lọc này âm thầm phân tích hàng vạn điểm dữ liệu, giao tiếp khéo léo với khách VIP và chuyển hóa thành dòng tiền ngay cả khi bạn đang ngủ.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Phương Pháp Luận (The Protocol) */}
      <section className="bg-[#0C1838] text-[#FAF9F6] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal type="fade-up">
            <div className="mb-12 md:mb-16 md:flex justify-between items-end border-b border-white/10 pb-8">
              <div className="max-w-2xl">
                 <span className="text-[#C5A059] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">Phương pháp luận</span>
                 <h2 className="text-3xl md:text-4xl font-serif mb-4">Giao thức Tái cấu trúc</h2>
                 <p className="text-white/60 font-light text-sm">Chúng tôi không cấp phát phần mềm. Chúng tôi can thiệp vào DNA của doanh nghiệp để thiết lập lại cách thức tạo ra doanh thu.</p>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-10 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <Reveal type="fade-up" delay={0} className="pt-8 md:pt-0 md:pr-12">
              <span className="text-[#C5A059] font-serif italic text-2xl mb-4 block hover:-translate-y-1 transition-transform cursor-default">01.</span>
              <h3 className="text-xl font-serif font-medium mb-4">Thẩm Định Mạch Máu</h3>
              <p className="text-white/60 text-sm font-light leading-relaxed">
                Phân tích toàn diện phễu khách hàng hiện tại. Xác định các điểm nghẽn (bottlenecks) đang gây rò rỉ dòng tiền, và những quy trình lặp lại đang tiêu tốn sức lao động con người một cách vô nghĩa.
              </p>
            </Reveal>
            
            <Reveal type="fade-up" delay={150} className="pt-8 md:pt-0 md:px-12">
              <span className="text-[#C5A059] font-serif italic text-2xl mb-4 block hover:-translate-y-1 transition-transform cursor-default">02.</span>
              <h3 className="text-xl font-serif font-medium mb-4">Kiến Trúc Hệ Sinh Thái</h3>
              <p className="text-white/60 text-sm font-light leading-relaxed">
                Khang và Trúc trực tiếp thiết kế các luồng AI Agent (N8N) rập khuôn theo đúng đặc thù ngành nghề của bạn. Từ khâu cào dữ liệu, phân loại Lead (Scoring) cho đến kịch bản đàm phán chốt sale High-Ticket.
              </p>
            </Reveal>

            <Reveal type="fade-up" delay={300} className="pt-8 md:pt-0 md:pl-12">
              <span className="text-[#C5A059] font-serif italic text-2xl mb-4 block hover:-translate-y-1 transition-transform cursor-default">03.</span>
              <h3 className="text-xl font-serif font-medium mb-4">Kích Hoạt Tĩnh Lặng</h3>
              <p className="text-white/60 text-sm font-light leading-relaxed">
                Triển khai hệ thống ngầm vào doanh nghiệp. Cỗ máy bắt đầu tự động thu thập data, nuôi dưỡng và chốt lịch hẹn. Founder chỉ việc nhìn vào bảng điều khiển (Dashboard) và tiếp nhận các kết quả đã được tinh lọc.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. Kiến trúc tự động hoá (The Solutions Modals) */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 lg:px-8 border-b border-[#0C1838]/10">
        <Reveal type="fade-up" className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-[#C5A059] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">Vũ khí công nghệ</span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#0C1838] mb-4">Hệ sinh thái AI Agent</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <Reveal type="fade-up" delay={0}>
            <div className="group cursor-pointer border border-[#0C1838]/10 p-6 md:p-8 hover:border-[#C5A059] transition-all duration-300 bg-white hover:-translate-y-2 hover:shadow-xl h-full flex flex-col" onClick={() => setActiveModal('core')}>
              <div className="mb-6"><Layers className="text-[#0C1838]/30 w-8 h-8 group-hover:text-[#C5A059] transition-colors duration-300" /></div>
              <h3 className="text-xl font-serif font-medium text-[#0C1838] mb-3 group-hover:text-[#C5A059] transition-colors">6 Luồng AI Core</h3>
              <p className="text-[#0C1838]/60 text-sm leading-relaxed mb-6 font-light flex-grow">
                Khung xương sống tự động thu thập dữ liệu, phân loại độ nóng của Lead và nuôi dưỡng đa kênh hoàn toàn tự động.
              </p>
              <span className="text-[#C5A059] text-xs font-bold uppercase tracking-widest flex items-center gap-2 mt-auto">
                Xem luồng lõi <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Reveal>

          <Reveal type="fade-up" delay={150}>
            <div className="group cursor-pointer border border-[#0C1838]/10 p-6 md:p-8 hover:border-[#C5A059] transition-all duration-300 bg-white hover:-translate-y-2 hover:shadow-xl h-full flex flex-col" onClick={() => setActiveModal('custom')}>
              <div className="mb-6"><Target className="text-[#0C1838]/30 w-8 h-8 group-hover:text-[#C5A059] transition-colors duration-300" /></div>
              <h3 className="text-xl font-serif font-medium text-[#0C1838] mb-3 group-hover:text-[#C5A059] transition-colors">15+ AI Chuyên Ngành</h3>
              <p className="text-[#0C1838]/60 text-sm leading-relaxed mb-6 font-light flex-grow">
                Các AI Agent được "fine-tune" kiến thức riêng cho F&B, BĐS, Thẩm mỹ để tư vấn và đàm phán như một chuyên gia.
              </p>
              <span className="text-[#C5A059] text-xs font-bold uppercase tracking-widest flex items-center gap-2 mt-auto">
                Xem luồng custom <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Reveal>

          <Reveal type="fade-up" delay={300}>
            <div className="group cursor-pointer border border-[#0C1838]/10 p-6 md:p-8 hover:border-[#C5A059] transition-all duration-300 bg-white hover:-translate-y-2 hover:shadow-xl h-full flex flex-col" onClick={() => setActiveModal('marketing')}>
              <div className="mb-6"><BarChart className="text-[#0C1838]/30 w-8 h-8 group-hover:text-[#C5A059] transition-colors duration-300" /></div>
              <h3 className="text-xl font-serif font-medium text-[#0C1838] mb-3 group-hover:text-[#C5A059] transition-colors">Marketing System</h3>
              <p className="text-[#0C1838]/60 text-sm leading-relaxed mb-6 font-light flex-grow">
                Tổ hợp Data-driven SEO, Performance Ads bằng Machine Learning và tối ưu tỷ lệ chuyển đổi (CRO Matrix) chuyên sâu.
              </p>
              <span className="text-[#C5A059] text-xs font-bold uppercase tracking-widest flex items-center gap-2 mt-auto">
                Khám phá <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Chân dung đối tác (Exclusivity) */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6 lg:px-8 overflow-hidden">
         <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
            <Reveal type="fade-right" className="md:col-span-5 relative order-2 md:order-1">
               <div className="w-full aspect-square border border-[#0C1838]/20 flex items-center justify-center p-8 md:p-12 text-center bg-[#FAF9F6] relative group">
                  <div className="absolute top-4 left-4 w-2 h-2 bg-[#C5A059] transition-transform duration-500 group-hover:scale-150"></div>
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-[#C5A059] transition-transform duration-500 group-hover:scale-150"></div>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl italic text-[#0C1838] leading-relaxed relative z-10">
                    "Chúng tôi bảo vệ tính độc bản của mình bằng cách nói 'Không' với những mô hình kinh doanh đại trà."
                  </h3>
               </div>
            </Reveal>
            
            <div className="md:col-span-7 order-1 md:order-2">
               <Reveal type="fade-left" delay={0}>
                 <span className="text-[#C5A059] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block">Tiêu chuẩn hợp tác</span>
                 <h2 className="text-3xl md:text-4xl font-serif text-[#0C1838] mb-6 md:mb-8 leading-snug">Chân Dung Khách Hàng<br/>Của Trudie Lab</h2>
                 <p className="text-[#0C1838]/70 text-sm leading-relaxed mb-8 font-light">
                   Hệ thống của chúng tôi là một khoản đầu tư mang tính chiến lược dài hạn, không phải là một công cụ cắt giảm chi phí ngắn hạn. Chúng tôi đặc biệt phù hợp và mang lại ROI (Tỷ suất hoàn vốn) cao nhất cho:
                 </p>
               </Reveal>
               
               <ul className="space-y-6">
                 <Reveal type="fade-up" delay={150}>
                   <li className="flex gap-4 items-start border-b border-[#0C1838]/10 pb-4 hover:pl-2 transition-all duration-300">
                      <span className="text-[#C5A059] font-mono font-bold text-sm">01</span>
                      <div>
                        <h4 className="font-serif font-medium text-[#0C1838] mb-1">Các doanh nghiệp phân khúc High-Ticket</h4>
                        <p className="text-[#0C1838]/60 text-xs font-light">Bán sản phẩm/dịch vụ giá trị cao, nơi mà uy tín, hình ảnh thương hiệu và sự tỉ mỉ trong từng điểm chạm (touchpoint) với khách hàng là yếu tố sống còn.</p>
                      </div>
                   </li>
                 </Reveal>
                 <Reveal type="fade-up" delay={300}>
                   <li className="flex gap-4 items-start border-b border-[#0C1838]/10 pb-4 hover:pl-2 transition-all duration-300">
                      <span className="text-[#C5A059] font-mono font-bold text-sm">02</span>
                      <div>
                        <h4 className="font-serif font-medium text-[#0C1838] mb-1">Founder / CEO có tư duy Scale-up</h4>
                        <p className="text-[#0C1838]/60 text-xs font-light">Đã vượt qua giai đoạn sống sót, đang khao khát nhân bản doanh thu (x5, x10) nhưng không muốn phình to bộ máy nhân sự cồng kềnh.</p>
                      </div>
                   </li>
                 </Reveal>
                 <Reveal type="fade-up" delay={450}>
                   <li className="flex gap-4 items-start hover:pl-2 transition-all duration-300">
                      <span className="text-[#C5A059] font-mono font-bold text-sm">03</span>
                      <div>
                        <h4 className="font-serif font-medium text-[#0C1838] mb-1">Giới chuyên gia (Coach, Agency, Consulting)</h4>
                        <p className="text-[#0C1838]/60 text-xs font-light">Muốn đóng gói tri thức thành sản phẩm số, thiết lập phễu tự động hóa để thoát khỏi việc bán thời gian lấy tiền.</p>
                      </div>
                   </li>
                 </Reveal>
               </ul>
            </div>
         </div>
      </section>

      {/* Quote / Founders */}
      <section className="bg-[#E5E0D8] text-[#0C1838] py-16 md:py-24 text-center border-t border-[#0C1838]/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C5A059] via-transparent to-transparent"></div>
        <Reveal type="scale" className="max-w-3xl mx-auto px-6 relative z-10">
          <p className="text-lg md:text-2xl font-serif leading-relaxed mb-6 italic">
            "Sự kết hợp không khoan nhượng giữa năng lực hệ thống máy học sâu thẳm và tư duy quản trị kinh doanh cấp độ CEO."
          </p>
          <div className="text-[#0C1838]/60 tracking-[0.2em] uppercase text-[10px] font-bold">Khang & Trúc — Founders</div>
        </Reveal>
      </section>

    </div>
  );
};

/* --- EDITORIAL MODALS (Giữ nguyên) --- */
const SolutionModal = ({ modalType, closeModal }) => {
  const content = {
    core: {
      title: "6 Luồng AI Core",
      subtitle: "Hệ thống tự động hoá tối thiểu",
      desc: "Nền tảng vận hành dành cho doanh nghiệp muốn tối ưu hoá dòng tiền và ngừng lãng phí tài nguyên nhân sự.",
      items: [
        { title: "Data Scraper Agent", text: "Rà quét, thu thập dữ liệu khách hàng tiềm năng trên các nền tảng mạng xã hội và web đối thủ." },
        { title: "Lead Scoring Matrix", text: "AI chấm điểm độ 'ấm/nóng' của khách hàng dựa trên hành vi để báo cho Sale vào việc." },
        { title: "Omnichannel Nurturing", text: "Tự động bám đuổi qua Zalo OA, Email, SMS theo đúng hành trình khách hàng." },
        { title: "Smart Appointment Setter", text: "Voicebot/Chatbot qualify khách và book lịch hẹn trực tiếp vào Google Calendar." },
        { title: "Low-Ticket Closer", text: "Hệ thống chốt đơn sản phẩm mồi không cần sự can thiệp của con người." },
        { title: "Automated CRM", text: "Tạo hồ sơ, xuất hoá đơn và gửi khảo sát/upsell tự động sau dịch vụ." }
      ]
    },
    custom: {
      title: "15+ AI Custom",
      subtitle: "Tinh chỉnh học thuật theo ngành",
      desc: "Hệ thống Agent được tuỳ biến sâu (Fine-tuned) với kiến thức chuyên ngành, khả năng đàm phán như một chuyên gia thực thụ.",
      items: [
        { title: "F&B Cao Cấp / Rượu Vang", text: "AI Sommelier tư vấn khẩu vị; Auto-inventory báo động thiếu hụt; Luồng CRM cho private tasting." },
        { title: "Spa & Thẩm Mỹ", text: "Phân tích ảnh da mặt lên phác đồ; AI Voicebot nhắc lịch; Upsell tự động gói liệu trình VIP." },
        { title: "Bất Động Sản", text: "AI Property Matcher; Auto-update tiến độ dự án; Luồng cảnh báo nhà đầu tư khi có tín hiệu." },
        { title: "Giáo Dục & Digital Product", text: "AI Tutor 24/7; Chấm điểm tự luận tự động; Hệ thống DRM chống lậu; Auto-funnel bán chéo." },
        { title: "Bán Lẻ High-Fashion", text: "AI Stylist; Nhắc nhở mua sắm định kỳ; Phễu membership hạng sang với kịch bản độc quyền." }
      ]
    },
    marketing: {
      title: "Marketing System",
      subtitle: "Ma trận thu hút Lead",
      desc: "Kiến trúc hệ sinh thái kết hợp giữa chiến lược Digital tinh anh và hệ thống Code thuật toán học sâu.",
      items: [
        { title: "Data-Driven SEO Network", text: "N8N tự động phân tích từ khoá, tạo hàng trăm bài viết chuẩn SEO Semantic và auto-publish." },
        { title: "Machine Learning Ads", text: "Kết nối API với Ads. Tự động tắt/mở chiến dịch, scale ngân sách theo chỉ số ROAS thời gian thực." },
        { title: "CRO Matrix", text: "Landing Page biến đổi nội dung (Dynamic Content) tuỳ theo người truy cập đến từ nguồn nào." },
        { title: "High-Ticket Sales Funnel", text: "Ma trận Video Sales Letter (VSL), Webinar giáo dục thị trường và chốt khách mức giá >100 triệu." }
      ]
    }
  };

  const data = content[modalType];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-[#0C1838]/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={closeModal}></div>
      <div className="relative bg-[#FAF9F6] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300 border border-[#0C1838]/10 flex flex-col">
        
        <div className="sticky top-0 bg-[#FAF9F6]/95 backdrop-blur border-b border-[#0C1838]/10 p-6 md:p-8 flex justify-between items-start z-10">
          <div>
            <span className="text-[#C5A059] uppercase tracking-widest text-[10px] font-bold mb-2 block">{data.subtitle}</span>
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#0C1838]">{data.title}</h2>
          </div>
          <button onClick={closeModal} className="p-2 text-[#0C1838]/50 hover:text-[#0C1838] transition-all border border-transparent hover:border-[#0C1838]/10 hover:rotate-90 flex-shrink-0 ml-4 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-12">
          <p className="text-[#0C1838]/80 text-sm md:text-base mb-8 md:mb-10 font-serif italic border-l-2 border-[#C5A059] pl-4 md:pl-6">
            {data.desc}
          </p>
          <div className="grid sm:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-8 md:gap-y-10">
            {data.items.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="text-[10px] font-bold text-[#C5A059] mb-2 font-mono transition-transform group-hover:translate-x-1 inline-block">{(idx + 1).toString().padStart(2, '0')} —</div>
                <h4 className="text-[#0C1838] font-medium mb-2 font-serif text-base md:text-lg">{item.title}</h4>
                <p className="text-[#0C1838]/60 text-xs md:text-sm leading-relaxed font-light">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- EXPERIENCE PAGE --- */
const ExperiencePage = () => {
  const [openImageGallery, setOpenImageGallery] = useState(null);

  return (
    <div className="animate-in fade-in duration-1000 max-w-7xl mx-auto px-6 lg:px-8">
      
      <Reveal type="fade-up" className="border-b border-[#0C1838]/10 pb-8 md:pb-10 mb-10 md:mb-16 pt-8 md:pt-12 text-center">
        <span className="uppercase tracking-[0.2em] text-[#C5A059] text-[10px] font-bold mb-4 block">Case Studies & Portfolios</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-[#0C1838] mb-4 md:mb-6 text-balance">Giải Phóng Nỗi Đau Vận Hành.</h1>
        <p className="text-sm md:text-base text-[#0C1838]/60 max-w-2xl mx-auto font-light leading-relaxed">
          Báo cáo phân tích chuyên sâu các mô hình kinh doanh đã được Trudie Lab tái cấu trúc. Sự giao thoa giữa Code N8N và Chiến lược định vị thương hiệu.
        </p>
      </Reveal>

      <div className="space-y-16 md:space-y-24 pb-12">
        
        {/* Industry 1: RƯỢU VANG */}
        <Reveal type="fade-up">
          <article className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3">
              <div className="border-t border-[#C5A059] pt-4 lg:sticky lg:top-32">
                <Wine className="text-[#C5A059] w-6 h-6 mb-4" />
                <h2 className="text-xl font-serif font-medium text-[#0C1838] mb-2">Doanh Nghiệp Rượu Vang</h2>
                <span className="text-[#0C1838]/50 text-[10px] font-bold uppercase tracking-widest">Phân khúc cao cấp</span>
              </div>
            </div>
            <div className="lg:col-span-9 bg-white p-6 sm:p-8 md:p-12 border border-[#0C1838]/5 shadow-sm hover:shadow-lg transition-shadow duration-500">
              <p className="drop-cap text-[#0C1838]/80 text-sm leading-relaxed mb-8">
                Giới tinh hoa thường vô cùng khắt khe trong trải nghiệm dịch vụ. Bài toán đặt ra là làm sao đội ngũ sale không bị nhầm lẫn trong tư vấn, quản lý tồn kho chính xác và chăm sóc khách hàng mượt mà.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-8">
                <div>
                  <h3 className="font-serif font-medium text-[#0C1838] text-base mb-4 border-b border-[#0C1838]/10 pb-2">Giải pháp Công nghệ (Khang)</h3>
                  <ul className="space-y-4 text-xs text-[#0C1838]/70 font-light list-none leading-relaxed">
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Luồng cào data giới tinh hoa theo hành vi chi tiêu.</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> AI Sommelier Chatbot: Phân tích khẩu vị, gợi ý vang 24/7.</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Auto-inventory: Đồng bộ kho, cảnh báo thiếu hụt.</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> CRM Alert: Báo động tức thì khi VIP xem bảng giá.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif font-medium text-[#0C1838] text-base mb-4 border-b border-[#0C1838]/10 pb-2">Chiến lược Kinh doanh (Trúc)</h3>
                  <ul className="space-y-4 text-xs text-[#0C1838]/70 font-light list-none leading-relaxed">
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Định vị: Không bán "rượu", bán "di sản & nghệ thuật".</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Xây dựng kịch bản Private Tasting cho giới siêu giàu.</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Đào tạo chuẩn dịch vụ High-fashion vào ngành F&B.</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-[#FAF9F6] border-l-2 border-[#C5A059] p-6 text-[#0C1838]">
                <span className="font-bold text-[10px] uppercase tracking-widest text-[#C5A059] block mb-2">Kết Quả Đạt Được</span>
                <p className="font-serif italic text-base mb-4">Tăng 30% tỷ lệ quay lại, chốt mượt mà các bill trên 50.000.000 VNĐ hoàn toàn qua tin nhắn tự động.</p>
                <button onClick={() => setOpenImageGallery('wine')} className="group text-[10px] font-bold uppercase tracking-widest text-[#0C1838] border border-[#0C1838]/20 px-4 py-2 hover:bg-[#0C1838] hover:text-white transition-all flex items-center gap-2 w-fit">
                  Xem Hình Ảnh Minh Hoạ <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Industry 2: SPA & THẨM MỸ */}
        <Reveal type="fade-up">
          <article className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3">
              <div className="border-t border-[#0C1838] pt-4 lg:sticky lg:top-32">
                <Stethoscope className="text-[#0C1838] w-6 h-6 mb-4" />
                <h2 className="text-xl font-serif font-medium text-[#0C1838] mb-2">Chuỗi Spa & Thẩm Mỹ</h2>
                <span className="text-[#0C1838]/50 text-[10px] font-bold uppercase tracking-widest">Trị liệu chuyên sâu</span>
              </div>
            </div>
            <div className="lg:col-span-9 bg-white p-6 sm:p-8 md:p-12 border border-[#0C1838]/5 shadow-sm hover:shadow-lg transition-shadow duration-500">
              <p className="drop-cap text-[#0C1838]/80 text-sm leading-relaxed mb-8">
                Khách hàng Spa cao cấp không mua "giảm giá", họ mua "sự cam kết". Nỗi đau tốn kém nhất của ngành này là chạy Ads ra quá nhiều data rác, đội ngũ telesale gọi điện bị từ chối liên tục, dẫn đến lãng phí thời gian và bỏ lỡ khách VIP.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-8">
                <div>
                  <h3 className="font-serif font-medium text-[#0C1838] text-base mb-4 border-b border-[#0C1838]/10 pb-2">Giải pháp Công nghệ (Khang)</h3>
                  <ul className="space-y-4 text-xs text-[#0C1838]/70 font-light list-none leading-relaxed">
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> AI Lead Scoring: Chấm điểm data từ Ads, loại bỏ ngay data rác.</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Zalo OA Automation: Nuôi dưỡng bằng kiến thức da liễu cá nhân hoá.</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> AI Voicebot: Thay sale gọi điện xác nhận lịch hẹn với kịch bản tinh tế.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif font-medium text-[#0C1838] text-base mb-4 border-b border-[#0C1838]/10 pb-2">Chiến lược Kinh doanh (Trúc)</h3>
                  <ul className="space-y-4 text-xs text-[#0C1838]/70 font-light list-none leading-relaxed">
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Chuyển đổi Phễu: Từ "Giảm giá mồi" sang "Thăm khám chuyên gia".</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Tái cấu trúc dịch vụ: Đóng gói các dịch vụ lẻ thành Liệu trình High-ticket.</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-[#FAF9F6] border-l-2 border-[#0C1838] p-6 text-[#0C1838]">
                <span className="font-bold text-[10px] uppercase tracking-widest text-[#0C1838]/50 block mb-2">Kết Quả Đạt Được</span>
                <p className="font-serif italic text-base mb-4">Giảm 80% thời gian sale cày data rác, x3 tỷ lệ khách hàng VIP có mặt tại cơ sở thực tế (Show-up rate).</p>
                <button onClick={() => setOpenImageGallery('spa')} className="group text-[10px] font-bold uppercase tracking-widest text-[#0C1838] border border-[#0C1838]/20 px-4 py-2 hover:bg-[#0C1838] hover:text-white transition-all flex items-center gap-2 w-fit">
                  Xem Hình Ảnh Minh Hoạ <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Industry 3: BẤT ĐỘNG SẢN */}
        <Reveal type="fade-up">
          <article className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3">
              <div className="border-t border-[#0C1838] pt-4 lg:sticky lg:top-32">
                <Building2 className="text-[#0C1838] w-6 h-6 mb-4" />
                <h2 className="text-xl font-serif font-medium text-[#0C1838] mb-2">Bất Động Sản Cao Cấp</h2>
                <span className="text-[#0C1838]/50 text-[10px] font-bold uppercase tracking-widest">Đầu tư & Nghỉ dưỡng</span>
              </div>
            </div>
            <div className="lg:col-span-9 bg-white p-6 sm:p-8 md:p-12 border border-[#0C1838]/5 shadow-sm hover:shadow-lg transition-shadow duration-500">
              <p className="drop-cap text-[#0C1838]/80 text-sm leading-relaxed mb-8">
                Hành trình ra quyết định của khách hàng đầu tư BĐS kéo dài từ vài tháng đến cả năm. Việc Sale quên follow-up dẫn đến tỷ lệ rơi rớt tệp khách VIP cực kỳ nghiêm trọng.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-8">
                <div>
                  <h3 className="font-serif font-medium text-[#0C1838] text-base mb-4 border-b border-[#0C1838]/10 pb-2">Giải pháp Công nghệ (Khang)</h3>
                  <ul className="space-y-4 text-xs text-[#0C1838]/70 font-light list-none leading-relaxed">
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Tự động thu thập thông tin dự án mới nhất.</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Phân loại độ ấm (Scoring): Báo sale chốt ngay khi khách mở mail 3 lần.</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Auto-gửi Báo cáo tiến độ cá nhân hoá cho từng nhà đầu tư.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif font-medium text-[#0C1838] text-base mb-4 border-b border-[#0C1838]/10 pb-2">Chiến lược Kinh doanh (Trúc)</h3>
                  <ul className="space-y-4 text-xs text-[#0C1838]/70 font-light list-none leading-relaxed">
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Xoá bỏ hoàn toàn kịch bản chèo kéo kiểu "cò đất".</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Định vị Cố vấn: Cấu trúc phễu "Nhận định thị trường".</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-[#FAF9F6] border-l-2 border-[#0C1838] p-6 text-[#0C1838]">
                <span className="font-bold text-[10px] uppercase tracking-widest text-[#0C1838]/50 block mb-2">Kết Quả Đạt Được</span>
                <p className="font-serif italic text-base mb-4">Zero-leakage (Không lọt bất kỳ lead VIP nào), rút ngắn 40% thời gian nuôi dưỡng ra deal.</p>
                <button onClick={() => setOpenImageGallery('bds')} className="group text-[10px] font-bold uppercase tracking-widest text-[#0C1838] border border-[#0C1838]/20 px-4 py-2 hover:bg-[#0C1838] hover:text-white transition-all flex items-center gap-2 w-fit">
                  Xem Hình Ảnh Minh Hoạ <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Industry 4: GIÁO DỤC / DIGITAL PRODUCT (NEW) */}
        <Reveal type="fade-up">
          <article className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3">
              <div className="border-t border-[#0C1838] pt-4 lg:sticky lg:top-32">
                <GraduationCap className="text-[#0C1838] w-6 h-6 mb-4" />
                <h2 className="text-xl font-serif font-medium text-[#0C1838] mb-2">Sản Phẩm Số & Giáo Dục</h2>
                <span className="text-[#0C1838]/50 text-[10px] font-bold uppercase tracking-widest">Định vị chuyên gia</span>
              </div>
            </div>
            <div className="lg:col-span-9 bg-white p-6 sm:p-8 md:p-12 border border-[#0C1838]/5 shadow-sm hover:shadow-lg transition-shadow duration-500">
              <p className="drop-cap text-[#0C1838]/80 text-sm leading-relaxed mb-8">
                Rào cản lớn nhất của mô hình sản phẩm số (Sách tích xanh, Khoá học) là vận hành cấp quyền thủ công, tốn quá nhiều nhân sự CSKH và đặc biệt khó khăn trong việc thiết lập phễu bán chéo các chương trình Coaching.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-8">
                <div>
                  <h3 className="font-serif font-medium text-[#0C1838] text-base mb-4 border-b border-[#0C1838]/10 pb-2">Giải pháp Công nghệ (Khang)</h3>
                  <ul className="space-y-4 text-xs text-[#0C1838]/70 font-light list-none leading-relaxed">
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Omnichannel Zero-Touch: Tự động kích hoạt tài khoản trong 5 giây sau chuyển khoản.</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Kiểm duyệt nội dung/bản quyền tự động bằng thuật toán AI.</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Hệ thống xuất hoá đơn và upsell hoàn toàn vắng mặt con người.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif font-medium text-[#0C1838] text-base mb-4 border-b border-[#0C1838]/10 pb-2">Chiến lược Kinh doanh (Trúc)</h3>
                  <ul className="space-y-4 text-xs text-[#0C1838]/70 font-light list-none leading-relaxed">
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Tái định vị: Từ "Bán tài liệu" sang "Bán sự chuyển đổi (Transformational)".</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Thiết lập cấu trúc Phễu: Sản phẩm mồi → Sản phẩm chủ lực → Coaching 1-1 High-Ticket.</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-[#FAF9F6] border-l-2 border-[#0C1838] p-6 text-[#0C1838]">
                <span className="font-bold text-[10px] uppercase tracking-widest text-[#0C1838]/50 block mb-2">Kết Quả Đạt Được</span>
                <p className="font-serif italic text-base mb-4">Hệ thống Scale-up đạt 2 tỷ VNĐ/3 tháng với bộ máy tinh gọn, Founder chỉ việc tập trung làm chuyên môn.</p>
                <button onClick={() => setOpenImageGallery('edu')} className="group text-[10px] font-bold uppercase tracking-widest text-[#0C1838] border border-[#0C1838]/20 px-4 py-2 hover:bg-[#0C1838] hover:text-white transition-all flex items-center gap-2 w-fit">
                  Xem Hình Ảnh Minh Hoạ <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Industry 5: CONTACT LENS (NEW) */}
        <Reveal type="fade-up">
          <article className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3">
              <div className="border-t border-[#C5A059] pt-4 lg:sticky lg:top-32">
                <Eye className="text-[#C5A059] w-6 h-6 mb-4" />
                <h2 className="text-xl font-serif font-medium text-[#0C1838] mb-2">Bán Lẻ Contact Lens</h2>
                <span className="text-[#0C1838]/50 text-[10px] font-bold uppercase tracking-widest">Định vị High-Fashion</span>
              </div>
            </div>
            <div className="lg:col-span-9 bg-white p-6 sm:p-8 md:p-12 border border-[#0C1838]/5 shadow-sm hover:shadow-lg transition-shadow duration-500">
              <p className="drop-cap text-[#0C1838]/80 text-sm leading-relaxed mb-8">
                Ngành bán lẻ bị mắc kẹt trong cuộc chiến giá rẻ. Tồn kho với hàng trăm dải độ khác nhau khiến việc quản lý thủ công trở thành thảm hoạ, và khách hàng thiếu đi sự trung thành với thương hiệu.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-8">
                <div>
                  <h3 className="font-serif font-medium text-[#0C1838] text-base mb-4 border-b border-[#0C1838]/10 pb-2">Giải pháp Công nghệ (Khang)</h3>
                  <ul className="space-y-4 text-xs text-[#0C1838]/70 font-light list-none leading-relaxed">
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> AI Chatbot lưu trữ thông số cận, chốt đơn lại trong 1 nốt nhạc.</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Nhắn tin nhắc hết hạn lens/ưu đãi sinh nhật hoàn toàn tự động.</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Dashboard theo dõi luân chuyển tồn kho.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif font-medium text-[#0C1838] text-base mb-4 border-b border-[#0C1838]/10 pb-2">Chiến lược Kinh doanh (Trúc)</h3>
                  <ul className="space-y-4 text-xs text-[#0C1838]/70 font-light list-none leading-relaxed">
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Tái định vị thương hiệu ở phân khúc đẳng cấp, thoát ly giá rẻ.</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Xây dựng Concept Cinematic và cá nhân hoá dịch vụ.</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Tối ưu nguồn vốn đầu tư 3-5 Tỷ VNĐ hiệu quả.</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-[#FAF9F6] border-l-2 border-[#C5A059] p-6 text-[#0C1838]">
                <span className="font-bold text-[10px] uppercase tracking-widest text-[#C5A059] block mb-2">Kết Quả Đạt Được</span>
                <p className="font-serif italic text-base mb-4">Tỷ lệ khách hàng quay lại mua (Retention rate) qua tin nhắn tự động đạt 65%.</p>
                <button onClick={() => setOpenImageGallery('lens')} className="group text-[10px] font-bold uppercase tracking-widest text-[#0C1838] border border-[#0C1838]/20 px-4 py-2 hover:bg-[#0C1838] hover:text-white transition-all flex items-center gap-2 w-fit">
                  Xem Hình Ảnh Minh Hoạ <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Industry 6: COACHING & AI AUTOMATION AGENCY (NEW) */}
        <Reveal type="fade-up">
          <article className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3">
              <div className="border-t border-[#0C1838] pt-4 lg:sticky lg:top-32">
                <Target className="text-[#0C1838] w-6 h-6 mb-4" />
                <h2 className="text-xl font-serif font-medium text-[#0C1838] mb-2">Coaching & AI Automation</h2>
                <span className="text-[#0C1838]/50 text-[10px] font-bold uppercase tracking-widest">Mô hình Doanh nghiệp B2B</span>
              </div>
            </div>
            <div className="lg:col-span-9 bg-white p-6 sm:p-8 md:p-12 border border-[#0C1838]/5 shadow-sm hover:shadow-lg transition-shadow duration-500">
              <p className="drop-cap text-[#0C1838]/80 text-sm leading-relaxed mb-8">
                Đối với các chuyên gia Coach và Agency B2B, bài toán khó nhất là chứng minh năng lực thực chiến và đóng gói kiến thức thành các dịch vụ High-Ticket. Sự phụ thuộc vào sức người trong việc tư vấn chiến lược khiến việc mở rộng quy mô (scale-up) gặp nút thắt lớn.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-8">
                <div>
                  <h3 className="font-serif font-medium text-[#0C1838] text-base mb-4 border-b border-[#0C1838]/10 pb-2">Giải pháp Công nghệ (Khang)</h3>
                  <ul className="space-y-4 text-xs text-[#0C1838]/70 font-light list-none leading-relaxed">
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Marketing & Sales System: Tự động hoá chiến dịch Ads đa kênh dựa trên Data-driven SEO.</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> AI High-Ticket Closer: Luồng Voicebot/Chatbot chuyên sâu qualify khách VIP, tự động book lịch hẹn.</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Ma trận CRO: Tối ưu tỷ lệ chuyển đổi trên từng điểm chạm của Landing Page.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif font-medium text-[#0C1838] text-base mb-4 border-b border-[#0C1838]/10 pb-2">Chiến lược Kinh doanh (Trúc)</h3>
                  <ul className="space-y-4 text-xs text-[#0C1838]/70 font-light list-none leading-relaxed">
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Thiết kế Phễu Bán Hàng: Đóng gói kiến thức thành các sản phẩm trị giá cao (High-Ticket).</li>
                    <li className="flex gap-3 hover:text-[#0C1838] transition-colors"><span className="text-[#C5A059] mt-0.5">→</span> Định vị Master Coach: Xây dựng thương hiệu cá nhân kết hợp sức mạnh AI Automation.</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-[#FAF9F6] border-l-2 border-[#0C1838] p-6 text-[#0C1838]">
                <span className="font-bold text-[10px] uppercase tracking-widest text-[#0C1838]/50 block mb-2">Kết Quả Đạt Được</span>
                <p className="font-serif italic text-base mb-4">Hoàn thiện mô hình tự động hoá quy trình chốt sales B2B, tối ưu chi phí vận hành và thiết lập chuẩn mực dịch vụ tư vấn cao cấp đạt mốc 2 Tỷ VNĐ/ 3 tháng.</p>
                <button onClick={() => setOpenImageGallery('coaching')} className="group text-[10px] font-bold uppercase tracking-widest text-[#0C1838] border border-[#0C1838]/20 px-4 py-2 hover:bg-[#0C1838] hover:text-white transition-all flex items-center gap-2 w-fit">
                  Xem Hình Ảnh Minh Hoạ <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </article>
        </Reveal>

      </div>

      {/* Modal: Image Gallery */}
      {openImageGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0C1838]/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setOpenImageGallery(null)}>
          <div className="relative bg-[#FAF9F6] w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl border border-[#0C1838]/10 animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
            
            <div className="sticky top-0 bg-[#FAF9F6]/95 backdrop-blur border-b border-[#0C1838]/10 p-6 flex justify-between items-center z-10">
              <div>
                <h3 className="text-xl font-serif font-medium text-[#0C1838]">Tài Liệu Minh Hoạ Hệ Thống</h3>
                <p className="text-[#0C1838]/60 text-xs font-light">Không gian dành cho IT cập nhật hình ảnh thực tế</p>
              </div>
              <button onClick={() => setOpenImageGallery(null)} className="p-2 text-[#0C1838]/50 hover:text-[#0C1838] transition-all bg-white border border-[#0C1838]/10 rounded-full hover:rotate-90">
                <X size={16} />
              </button>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                   <div className="aspect-[4/3] bg-[#E5E0D8] border border-dashed border-[#0C1838]/20 flex flex-col items-center justify-center text-center p-6 relative group cursor-pointer hover:border-[#C5A059] transition-colors">
                      <Play className="text-[#0C1838]/20 w-8 h-8 mb-3 group-hover:text-[#C5A059] transition-colors group-hover:scale-110 duration-300" />
                      <span className="font-mono text-[10px] text-[#0C1838]/50 group-hover:text-[#0C1838] transition-colors">[ IT: Chèn thẻ &lt;img&gt; chứa Flow N8N tại đây ]</span>
                   </div>
                   <p className="font-serif font-medium text-[#0C1838] text-center text-sm">Sơ đồ luồng tự động hoá (N8N Flow)</p>
                </div>
                
                <div className="space-y-3">
                   <div className="aspect-[4/3] bg-[#E5E0D8] border border-dashed border-[#0C1838]/20 flex flex-col items-center justify-center text-center p-6 relative group cursor-pointer hover:border-[#C5A059] transition-colors">
                      <BarChart className="text-[#0C1838]/20 w-8 h-8 mb-3 group-hover:text-[#C5A059] transition-colors group-hover:scale-110 duration-300" />
                      <span className="font-mono text-[10px] text-[#0C1838]/50 group-hover:text-[#0C1838] transition-colors">[ IT: Chèn thẻ &lt;img&gt; chứa UI/Báo cáo tại đây ]</span>
                   </div>
                   <p className="font-serif font-medium text-[#0C1838] text-center text-sm">Giao diện Dashboard / Báo cáo ROI</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

/* --- CONTACT PAGE --- */
const ContactPage = () => {
  return (
    <div className="animate-in fade-in duration-1000 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
      
      <Reveal type="fade-up" className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-[#0C1838] mb-4">Thẩm Định Hệ Thống</h1>
        <p className="text-[#0C1838]/70 text-sm font-light max-w-xl mx-auto">
          Vui lòng điền thông tin doanh nghiệp chi tiết. Hội đồng chiến lược của Trudie Lab sẽ tiếp nhận và phản hồi giải pháp thực tiễn trong vòng 24 giờ làm việc.
        </p>
      </Reveal>

      <Reveal type="fade-up" delay={150}>
        <div className="bg-white border border-[#0C1838]/10 p-6 sm:p-10 md:p-14 shadow-xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#C5A059]"></div>
          
          <form className="space-y-6 md:space-y-8" onSubmit={(e) => e.preventDefault()}>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2 group">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#0C1838]/60 group-focus-within:text-[#C5A059] transition-colors">Họ tên / Chức vụ <span className="text-[#C5A059]">*</span></label>
                <input type="text" className="w-full bg-transparent border-b border-[#0C1838]/20 px-0 py-2 text-[#0C1838] focus:outline-none focus:border-[#C5A059] transition-colors rounded-none font-serif text-base" placeholder="VD: Nguyễn Văn A - CEO" />
              </div>
              <div className="space-y-2 group">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#0C1838]/60 group-focus-within:text-[#C5A059] transition-colors">Email Doanh Nghiệp <span className="text-[#C5A059]">*</span></label>
                <input type="email" className="w-full bg-transparent border-b border-[#0C1838]/20 px-0 py-2 text-[#0C1838] focus:outline-none focus:border-[#C5A059] transition-colors rounded-none font-serif text-base" placeholder="ceo@company.com" />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#0C1838]/60 group-focus-within:text-[#C5A059] transition-colors">Lĩnh vực hoạt động</label>
              <input type="text" className="w-full bg-transparent border-b border-[#0C1838]/20 px-0 py-2 text-[#0C1838] focus:outline-none focus:border-[#C5A059] transition-colors rounded-none font-serif text-base" placeholder="VD: Bán lẻ, BĐS, F&B, Coaching..." />
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#0C1838]/60 mb-2 block group-focus-within:text-[#C5A059] transition-colors">Vấn đề cốt lõi cần giải quyết <span className="text-[#C5A059]">*</span></label>
              <div className="relative border border-[#0C1838]/20 p-1 bg-[#FAF9F6] focus-within:border-[#C5A059] transition-colors">
                <select className="w-full bg-transparent px-4 py-3 text-[#0C1838] focus:outline-none appearance-none font-serif text-sm cursor-pointer">
                  <option value="">-- Lựa chọn bài toán vận hành của bạn --</option>
                  <optgroup label="TÌM KIẾM & PHÂN LOẠI KHÁCH HÀNG" className="font-sans font-bold text-xs">
                    <option value="mkt_1" className="font-serif">Data chạy Ads nhiều nhưng toàn rác, khó chốt.</option>
                    <option value="mkt_2" className="font-serif">Chi phí lấy một khách VIP quá cao.</option>
                    <option value="mkt_5" className="font-serif">Tỷ lệ chuyển đổi (CRO) trên Website quá thấp.</option>
                  </optgroup>
                  <optgroup label="QUY TRÌNH CHỐT ĐƠN & SALE" className="font-sans font-bold text-xs">
                    <option value="sale_1" className="font-serif">Sale tốn thời gian trả lời những câu lặp lại.</option>
                    <option value="sale_2" className="font-serif">Khó chốt các hợp đồng High-Ticket vì sale thiếu kỹ năng.</option>
                    <option value="sale_3" className="font-serif">Rơi rớt khách vì sale quên Follow-up.</option>
                  </optgroup>
                  <optgroup label="CHIẾN LƯỢC & QUẢN TRỊ (CEO)" className="font-sans font-bold text-xs">
                    <option value="ceo_1" className="font-serif">Hệ thống rời rạc, không đồng bộ dữ liệu.</option>
                    <option value="ceo_2" className="font-serif">Founder đang làm thợ, thiếu thời gian hoạch định chiến lược.</option>
                    <option value="ceo_3" className="font-serif">Scale-up doanh thu nhưng sợ vỡ quy trình vận hành.</option>
                  </optgroup>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#C5A059] text-xs">▼</div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#0C1838]/60 block mb-2">Quy mô đầu tư dự kiến</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className="cursor-pointer">
                  <input type="radio" name="budget" className="peer sr-only" />
                  <div className="text-center p-3 border border-[#0C1838]/20 text-[#0C1838]/70 font-serif text-sm peer-checked:bg-[#0C1838] peer-checked:border-[#0C1838] peer-checked:text-white transition-all hover:bg-[#0C1838]/5">
                    &lt; 50 Triệu
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input type="radio" name="budget" className="peer sr-only" />
                  <div className="text-center p-3 border border-[#0C1838]/20 text-[#0C1838]/70 font-serif text-sm peer-checked:bg-[#0C1838] peer-checked:border-[#0C1838] peer-checked:text-white transition-all hover:bg-[#0C1838]/5">
                    50 - 200 Triệu
                  </div>
                </label>
                <label className="cursor-pointer relative">
                  <input type="radio" name="budget" className="peer sr-only" />
                  <div className="text-center p-3 border border-[#0C1838]/20 text-[#0C1838]/70 font-serif text-sm peer-checked:bg-[#0C1838] peer-checked:border-[#0C1838] peer-checked:text-white transition-all hover:bg-[#0C1838]/5">
                    &gt; 200 Triệu
                  </div>
                  <span className="absolute -top-2 -right-2 bg-[#C5A059] text-white text-[8px] font-bold px-2 py-0.5 uppercase tracking-wider shadow-sm z-10 animate-pulse">Premium</span>
                </label>
              </div>
            </div>

            <button className="w-full bg-[#0C1838] text-white text-xs font-bold uppercase tracking-widest py-4 mt-6 md:mt-8 hover:bg-[#C5A059] transition-all flex items-center justify-center gap-3 group shadow-lg hover:shadow-xl hover:-translate-y-1">
              Gửi Yêu Cầu Đánh Giá <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
            
          </form>
        </div>
      </Reveal>

    </div>
  );
};

export default App;