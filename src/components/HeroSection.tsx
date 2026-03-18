import { Search, MapPin, CalendarDays, Users, Building2, Plane, Briefcase, Heart, Clock, Hotel, TrendingUp, Waves, Building, CalendarRange } from "lucide-react";
import { Button } from "../components/ui/button";
import { useEffect, useRef, useState } from "react";

const quickFilters = [
    { label: "Du lịch", icon: Plane },
    { label: "Công tác", icon: Briefcase },
    { label: "Gia đình", icon: Heart },
    { label: "Dài hạn", icon: Clock },
];

const stats = [
    { value: 500, suffix: "+", label: "Khách sạn", icon: Hotel },
    { value: 1200, suffix: "+", label: "Nhà trọ", icon: Building2 },
    { value: 50, suffix: "k+", label: "Khách hàng", icon: Users },
];

const trends = [
    { label: "Du lịch biển", desc: "Nha Trang, Đà Nẵng, Phú Quốc", icon: Waves, color: "from-primary/15 to-primary/5" },
    { label: "Công tác trung tâm", desc: "TP.HCM, Hà Nội — giá tốt", icon: Building, color: "from-accent/15 to-accent/5" },
    { label: "Thuê tháng dài hạn", desc: "Từ 2.5 triệu/tháng", icon: CalendarRange, color: "from-primary/10 to-accent/5" },
];

function useCountUp(target: number, duration = 1800) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const startTime = performance.now();
                    const animate = (now: number) => {
                        const progress = Math.min((now - startTime) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * target));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration]);

    return { count, ref };
}

const StatCard = ({ stat }: { stat: typeof stats[0] }) => {
    const { count, ref } = useCountUp(stat.value);
    const Icon = stat.icon;
    return (
        <div
            ref={ref}
            className="flex items-center gap-4 bg-card/80 backdrop-blur-sm rounded-2xl px-6 py-4 card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-0.5"
        >
            <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
                <p className="text-2xl lg:text-3xl font-extrabold text-foreground leading-none">
                    {count.toLocaleString()}{stat.suffix}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 font-medium">{stat.label}</p>
            </div>
        </div>
    );
};

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 hero-gradient" />
            <div className="absolute top-20 -right-40 w-[600px] h-[600px] rounded-full bg-primary/[0.05] blur-3xl" />
            <div className="absolute -bottom-20 -left-40 w-[500px] h-[500px] rounded-full bg-accent/[0.06] blur-3xl" />

            <div className="relative section-padding py-20 lg:py-28">
                {/* Title */}
                <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-up">
                    <p className="text-sm font-semibold text-primary tracking-wide uppercase mb-4 animate-fade-up">
                        Nền tảng đặt phòng #1 Việt Nam
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold text-foreground leading-[1.1] mb-5">
                        Tìm chỗ ở{" "}
                        <span className="hero-highlight relative inline-block">
                            hoàn hảo
                            <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 8C30 3 70 2 100 4C130 6 170 3 198 7" stroke="hsl(24 95% 56%)" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.5" />
                            </svg>
                        </span>{" "}
                        cho bạn
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed" style={{ animationDelay: "0.1s" }}>
                        Khách sạn, homestay hay nhà trọ thuê tháng — tất cả trong một nền tảng duy nhất, đơn giản và đáng tin cậy.
                    </p>
                </div>

                {/* Search bar - floating card */}
                <div className="max-w-4xl mx-auto animate-fade-up" style={{ animationDelay: "0.15s" }}>
                    <div className="bg-card rounded-[20px] shadow-xl border border-border/50 p-2.5">
                        <div className="flex flex-col lg:flex-row items-stretch">
                            {/* Địa điểm */}
                            <div className="group flex-1 flex items-center gap-3 px-5 py-3.5 rounded-2xl hover:bg-accent/50 transition-colors cursor-pointer border-b lg:border-b-0 lg:border-r border-border/60">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                                    <MapPin className="w-[18px] h-[18px] text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Địa điểm</p>
                                    <input
                                        type="text"
                                        placeholder="Bạn muốn đến đâu?"
                                        className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 outline-none w-full mt-0.5 font-medium focus:placeholder:text-muted-foreground/40 transition-colors"
                                    />
                                </div>
                            </div>
                            {/* Ngày */}
                            <div className="group flex-1 flex items-center gap-3 px-5 py-3.5 rounded-2xl hover:bg-accent/50 transition-colors cursor-pointer border-b lg:border-b-0 lg:border-r border-border/60">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                                    <CalendarDays className="w-[18px] h-[18px] text-primary" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Nhận — Trả phòng</p>
                                    <p className="text-sm text-muted-foreground/70 mt-0.5 font-medium">Chọn ngày</p>
                                </div>
                            </div>
                            {/* Số khách */}
                            <div className="group flex-1 flex items-center gap-3 px-5 py-3.5 rounded-2xl hover:bg-accent/50 transition-colors cursor-pointer border-b lg:border-b-0 lg:border-r border-border/60">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                                    <Users className="w-[18px] h-[18px] text-primary" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Số khách</p>
                                    <p className="text-sm text-muted-foreground/70 mt-0.5 font-medium">2 người lớn</p>
                                </div>
                            </div>
                            {/* Loại hình */}
                            <div className="group flex-1 flex items-center gap-3 px-5 py-3.5 rounded-2xl hover:bg-accent/50 transition-colors cursor-pointer">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                                    <Building2 className="w-[18px] h-[18px] text-primary" />
                                </div>
                                <div>
                                    <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Loại hình</p>
                                    <p className="text-sm text-muted-foreground/70 mt-0.5 font-medium">Tất cả</p>
                                </div>
                            </div>
                            {/* Button */}
                            <div className="p-1.5 flex items-center">
                                <Button className="w-full lg:w-auto h-12 px-7 rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                                    <Search className="w-4 h-4" />
                                    Tìm kiếm
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick filters */}
                <div className="flex flex-wrap justify-center gap-2.5 mt-7 animate-fade-up" style={{ animationDelay: "0.25s" }}>
                    {quickFilters.map((f) => (
                        <button
                            key={f.label}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-sm font-semibold text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-lg hover:shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <f.icon className="w-4 h-4" />
                            {f.label}
                        </button>
                    ))}
                </div>

                {/* Trending section */}
                <div className="max-w-3xl mx-auto mt-12 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                    <div className="flex items-center justify-center gap-2 mb-5">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <p className="text-sm font-bold text-foreground">Xu hướng tuần này</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {trends.map((t) => (
                            <div
                                key={t.label}
                                className={`group relative flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-br ${t.color} border border-border/30 hover:border-border/60 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md`}
                            >
                                <t.icon className="w-8 h-8 text-muted-foreground/60 group-hover:text-foreground/70 transition-colors shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-foreground">{t.label}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mt-14 animate-fade-up" style={{ animationDelay: "0.35s" }}>
                    {stats.map((s) => (
                        <StatCard key={s.label} stat={s} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
