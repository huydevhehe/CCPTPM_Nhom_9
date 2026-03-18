import { Maximize2, Sofa, FileText, Heart } from "lucide-react";
import hotel3 from "../assets/hotel-3.jpg";
import hotel4 from "../assets/hotel-4.jpg";

const rentals = [
    {
        image: hotel3,
        name: "Căn hộ Studio Quận 7",
        price: "4,500,000",
        area: "30m²",
        furniture: "Đầy đủ nội thất",
        contract: "Tối thiểu 3 tháng",
        address: "Quận 7, TP.HCM",
    },
    {
        image: hotel4,
        name: "Phòng trọ cao cấp Bình Thạnh",
        price: "3,200,000",
        area: "25m²",
        furniture: "Nội thất cơ bản",
        contract: "Tối thiểu 6 tháng",
        address: "Bình Thạnh, TP.HCM",
    },
    {
        image: hotel3,
        name: "Mini apartment Tân Bình",
        price: "5,800,000",
        area: "35m²",
        furniture: "Đầy đủ nội thất",
        contract: "Linh hoạt",
        address: "Tân Bình, TP.HCM",
    },
    {
        image: hotel4,
        name: "Phòng trọ sinh viên Thủ Đức",
        price: "2,500,000",
        area: "20m²",
        furniture: "Nội thất cơ bản",
        contract: "Tối thiểu 1 tháng",
        address: "TP. Thủ Đức, TP.HCM",
    },
];

const MonthlyRentalSection = () => {
    return (
        <section className="py-16 lg:py-20 bg-secondary/50">
            <div className="section-padding">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Ở dài hạn — Thuê tháng</h2>
                        <p className="text-muted-foreground">Giải pháp lý tưởng cho sinh viên và người đi làm</p>
                    </div>
                    <button className="hidden sm:block text-sm font-semibold text-primary hover:underline">Xem tất cả →</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {rentals.map((item, i) => (
                        <div
                            key={i}
                            className="group bg-card rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">Thuê tháng</span>
                                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                                    <Heart className="w-4 h-4 text-foreground" />
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-foreground mb-1 truncate">{item.name}</h3>
                                <p className="text-sm text-muted-foreground mb-3">{item.address}</p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                                        <Maximize2 className="w-3 h-3" /> {item.area}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                                        <Sofa className="w-3 h-3" /> {item.furniture}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md">
                                        <FileText className="w-3 h-3" /> {item.contract}
                                    </span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-lg font-bold text-primary">{item.price}₫</span>
                                    <span className="text-sm text-muted-foreground">/ tháng</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MonthlyRentalSection;
