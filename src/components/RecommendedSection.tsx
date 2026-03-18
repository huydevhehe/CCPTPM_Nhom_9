import { Heart, Star } from "lucide-react";
import { useState } from "react";
import hotel1 from "../assets/hotel-1.jpg";
import hotel2 from "../assets/hotel-2.jpg";
import hotel3 from "../assets/hotel-3.jpg";
import hotel4 from "../assets/hotel-4.jpg";
import hotel5 from "../assets/hotel-5.jpg";
import hotel6 from "../assets/hotel-6.jpg";

const listings = [
    { id: 1, image: hotel1, badge: "Khách sạn", name: "Sunrise Ocean View", address: "Quận 1, TP.HCM", rating: 4.8, reviews: 234, price: "850,000", unit: "đêm" },
    { id: 2, image: hotel2, badge: "Homestay", name: "Green Garden Homestay", address: "Hội An, Quảng Nam", rating: 4.9, reviews: 189, price: "620,000", unit: "đêm" },
    { id: 3, image: hotel5, badge: "Resort", name: "Paradise Pool Villa", address: "Cam Ranh, Khánh Hòa", rating: 4.7, reviews: 312, price: "2,400,000", unit: "đêm" },
    { id: 4, image: hotel6, badge: "Khách sạn", name: "Vietnam Boutique Hotel", address: "Ba Đình, Hà Nội", rating: 4.6, reviews: 178, price: "980,000", unit: "đêm" },
    { id: 5, image: hotel3, badge: "Căn hộ", name: "Skyline City Apartment", address: "Quận 7, TP.HCM", rating: 4.5, reviews: 96, price: "750,000", unit: "đêm" },
    { id: 6, image: hotel4, badge: "Homestay", name: "Cozy Studio Downtown", address: "Hải Châu, Đà Nẵng", rating: 4.8, reviews: 142, price: "450,000", unit: "đêm" },
];

const RecommendedSection = () => {
    const [favorites, setFavorites] = useState<Set<number>>(new Set());

    const toggleFav = (id: number) => {
        setFavorites((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    return (
        <section className="py-16 lg:py-20">
            <div className="section-padding">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Nổi bật hôm nay</h2>
                        <p className="text-muted-foreground">Được đánh giá cao nhất bởi khách hàng</p>
                    </div>
                    <button className="hidden sm:block text-sm font-semibold text-primary hover:underline">Xem tất cả →</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-card rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-semibold text-foreground">
                                    {item.badge}
                                </span>
                                <button
                                    onClick={() => toggleFav(item.id)}
                                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
                                >
                                    <Heart
                                        className={`w-4 h-4 transition-colors ${favorites.has(item.id) ? "fill-primary text-primary" : "text-foreground"
                                            }`}
                                    />
                                </button>
                            </div>
                            <div className="p-4">
                                <div className="flex items-center gap-1 mb-1">
                                    <Star className="w-4 h-4 fill-warning text-warning" />
                                    <span className="text-sm font-semibold text-foreground">{item.rating}</span>
                                    <span className="text-xs text-muted-foreground">({item.reviews} đánh giá)</span>
                                </div>
                                <h3 className="font-bold text-foreground mb-1">{item.name}</h3>
                                <p className="text-sm text-muted-foreground mb-3">{item.address}</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-lg font-bold text-primary">{item.price}₫</span>
                                    <span className="text-sm text-muted-foreground">/ {item.unit}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecommendedSection;
