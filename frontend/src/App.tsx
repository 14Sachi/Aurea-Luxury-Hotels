import { useState, useEffect, useRef, useCallback } from "react"
import {
  Search, MapPin, Calendar, Users, Star, Heart, ChevronRight,
  ChevronLeft, ArrowRight, Wifi, Car, Utensils, Waves, Dumbbell,
  Shield, CreditCard, Check, X, Menu, Bell, Settings, LogOut,
  Home, Compass, BookOpen, User, SlidersHorizontal,
  Plus, Minus, Download, Share2, Award, Globe, TrendingUp,
  BarChart3, DollarSign, Hotel, Bed, MessageSquare, Eye,
  ChevronDown, Sparkles, Phone, Mail, ArrowUpRight, CheckCircle2,
  Lock, Plane, ArrowLeft, Filter, Maximize2, ZoomIn,
  Coffee, Wind, Tv, Bath, Layers, Tag, BarChart2,
  PieChart, Activity, RefreshCw, Upload, Edit3, Trash2,
  Map, Info, Clock, AlertCircle, CheckSquare, ExternalLink,
  LayoutDashboard, Users2, BellRing, XCircle, Leaf, Sailboat
} from "lucide-react"

type View =
  | "splash" | "welcome" | "signin" | "signup"
  | "landing" | "hotels" | "hotel-detail"
  | "booking" | "payment" | "success"
  | "profile" | "admin" | "wishlist" | "trips" | "notifications"

// ─── Image Registry ────────────────────────────────────────────────────────────
const IMG = {
  hero:       "https://images.unsplash.com/photo-1769149255670-aa0ad6428dd6?w=1920&h=1080&fit=crop&auto=format",
  hero2:      "https://images.unsplash.com/photo-1778166143598-a71fda62b6fd?w=1920&h=1080&fit=crop&auto=format",
  hero3:      "https://images.unsplash.com/photo-1779083552684-f30d7163f651?w=1920&h=1080&fit=crop&auto=format",
  lobby:      "https://images.unsplash.com/photo-1677129667171-92abd8740fa3?w=1200&h=800&fit=crop&auto=format",
  pool:       "https://images.unsplash.com/photo-1769149255670-aa0ad6428dd6?w=1200&h=800&fit=crop&auto=format",
  pool2:      "https://images.unsplash.com/photo-1778166143598-a71fda62b6fd?w=1200&h=800&fit=crop&auto=format",
  room1:      "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=800&h=600&fit=crop&auto=format",
  room2:      "https://images.unsplash.com/photo-1731336478850-6bce7235e320?w=800&h=600&fit=crop&auto=format",
  room3:      "https://images.unsplash.com/photo-1595161695996-f746349f4945?w=800&h=600&fit=crop&auto=format",
  room4:      "https://images.unsplash.com/photo-1552858725-693709cc17c7?w=800&h=600&fit=crop&auto=format",
  spa:        "https://images.unsplash.com/photo-1488345979593-09db0f85545f?w=800&h=600&fit=crop&auto=format",
  restaurant: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&auto=format",
  dining:     "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&h=600&fit=crop&auto=format",
  coastal:    "https://images.unsplash.com/photo-1776761731098-86f6b57da863?w=800&h=600&fit=crop&auto=format",
  lounge:     "https://images.unsplash.com/photo-1782113274194-1a102c318890?w=800&h=600&fit=crop&auto=format",
  island:     "https://images.unsplash.com/photo-1763581527858-dce9d3f9efd9?w=1200&h=800&fit=crop&auto=format",
  city:       "https://images.unsplash.com/photo-1576487849666-e0b455f3a18d?w=800&h=600&fit=crop&auto=format",
}

const HOTELS = [
  { id:1, name:"Aurea Santorini",   location:"Oia, Santorini",      country:"Greece",    price:1240, rating:4.97, reviews:312, image:IMG.pool,    category:"Cliffside",  tags:["Infinity Pool","Sea View","Private Butler"],  badge:"Editor's Pick", liked:false },
  { id:2, name:"Aurea Maldives",    location:"North Malé Atoll",    country:"Maldives",  price:2150, rating:4.99, reviews:187, image:IMG.coastal,  category:"Overwater",  tags:["Overwater Villa","Coral Reef","Sunset Deck"],  badge:"Rare Find",     liked:true  },
  { id:3, name:"Aurea Kyoto",       location:"Higashiyama",         country:"Japan",     price:890,  rating:4.93, reviews:428, image:IMG.lobby,    category:"Ryokan",     tags:["Zen Garden","Tea Ceremony","Onsen"],           badge:null,            liked:false },
  { id:4, name:"Aurea Amalfi",      location:"Positano",            country:"Italy",     price:1680, rating:4.95, reviews:263, image:IMG.dining,   category:"Clifftop",   tags:["Terraced Gardens","Private Beach","Michelin Chef"], badge:"Trending",  liked:false },
  { id:5, name:"Aurea Bali",        location:"Ubud, Bali",          country:"Indonesia", price:740,  rating:4.91, reviews:519, image:IMG.spa,      category:"Jungle",     tags:["Jungle Villa","Balinese Spa","Yoga Pavilion"], badge:null,           liked:true  },
  { id:6, name:"Aurea Patagonia",   location:"Torres del Paine",    country:"Chile",     price:1920, rating:4.98, reviews:142, image:IMG.lounge,   category:"Wilderness", tags:["Glacier Views","Guided Treks","Fire Lounge"], badge:"New",           liked:false },
  { id:7, name:"Aurea Amalfi Mare", location:"Ravello",             country:"Italy",     price:1340, rating:4.90, reviews:201, image:IMG.pool2,    category:"Clifftop",   tags:["Sea Terrace","Wine Cave","Private Chef"],     badge:null,            liked:false },
  { id:8, name:"Aurea Phuket",      location:"Natai Beach",         country:"Thailand",  price:980,  rating:4.92, reviews:374, image:IMG.island,   category:"Beachfront", tags:["Private Beach","Water Sports","Sunset Bar"], badge:"New",            liked:false },
]

const ROOMS = [
  { id:1, name:"Deluxe Suite",       size:"65 m²",  capacity:2, price:1240, image:IMG.room1, amenities:["King Bed","Ocean View","Soaking Tub","Private Terrace"],            available:true  },
  { id:2, name:"Executive Suite",    size:"95 m²",  capacity:2, price:1680, image:IMG.room2, amenities:["King Bed","Panoramic View","Living Room","Butler Service"],          available:true  },
  { id:3, name:"Luxury Villa",       size:"140 m²", capacity:4, price:2150, image:IMG.room3, amenities:["2 Bedrooms","Private Pool","Full Kitchen","Dedicated Staff"],        available:true  },
  { id:4, name:"Presidential Suite", size:"220 m²", capacity:6, price:3800, image:IMG.room4, amenities:["3 Bedrooms","Rooftop Terrace","Private Chef","Helipad Access"],      available:false },
]

// ─── Toast System ─────────────────────────────────────────────────────────────
type Toast = { id: string; msg: string; type: "success"|"info"|"error" }
function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const add = useCallback((msg: string, type: Toast["type"] = "success") => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => [...prev, { id, msg, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])
  return { toasts, add }
}

function ToastContainer({ toasts }: { toasts: Toast[] }) {
  if (!toasts.length) return null
  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2">
      {toasts.map(t => (
        <div key={t.id} className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium fade-up max-w-xs ${
          t.type === "success" ? "bg-[#111111] text-white"
          : t.type === "info"  ? "bg-white border border-[#E8E4DC] text-[#111111]"
          : "bg-red-50 border border-red-200 text-red-700"
        }`}>
          {t.type === "success" && <CheckCircle2 size={15} className="text-[#D4AF37] flex-shrink-0" />}
          {t.type === "info"    && <Info size={15} className="text-[#D4AF37] flex-shrink-0" />}
          {t.type === "error"   && <XCircle size={15} className="text-red-500 flex-shrink-0" />}
          {t.msg}
        </div>
      ))}
    </div>
  )
}

// ─── Shared Components ────────────────────────────────────────────────────────
function StarRating({ rating, size=12 }: { rating:number; size?:number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} className={i<=Math.round(rating) ? "text-[#D4AF37] fill-[#D4AF37]" : "text-[#E8E4DC] fill-[#E8E4DC]"} />
      ))}
    </div>
  )
}

function RatingBadge({ rating }: { rating:number }) {
  return (
    <div className="flex items-center gap-1 bg-[#111111] text-white px-2 py-1 rounded-lg text-[11px] font-bold">
      <Star size={9} className="fill-[#D4AF37] text-[#D4AF37]" />
      {rating}
    </div>
  )
}

function PrimaryBtn({ children, onClick, full=false, size="md", disabled=false, className="" }: {
  children: React.ReactNode; onClick?:()=>void; full?:boolean; size?:"sm"|"md"|"lg"; disabled?:boolean; className?:string
}) {
  const s = { sm:"px-4 py-2 text-xs", md:"px-6 py-3 text-sm", lg:"px-8 py-4 text-base" }[size]
  return (
    <button onClick={onClick} disabled={disabled}
      className={`gold-gradient text-[#111111] font-bold rounded-full transition-all duration-200 hover:opacity-90 active:scale-[0.97] gold-shadow disabled:opacity-40 disabled:cursor-not-allowed ${s} ${full?"w-full":""} ${className}`}>
      {children}
    </button>
  )
}

function SecondaryBtn({ children, onClick, full=false, className="" }: {
  children:React.ReactNode; onClick?:()=>void; full?:boolean; className?:string
}) {
  return (
    <button onClick={onClick}
      className={`border-2 border-[#111111] text-[#111111] font-semibold px-6 py-3 rounded-full text-sm transition-all duration-200 hover:bg-[#111111] hover:text-white active:scale-[0.97] ${full?"w-full":""} ${className}`}>
      {children}
    </button>
  )
}

function WishBtn({ liked, onToggle }: { liked:boolean; onToggle:()=>void }) {
  return (
    <button onClick={e => { e.stopPropagation(); onToggle() }}
      className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm">
      <Heart size={15} className={liked ? "fill-[#D4AF37] text-[#D4AF37]" : "text-[#555]"} />
    </button>
  )
}

function CategoryChip({ label, active, onClick }: { label:string; active?:boolean; onClick?:()=>void }) {
  return (
    <button onClick={onClick}
      className={`px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all duration-200 ${
        active ? "bg-[#111111] text-white shadow-sm" : "bg-white text-[#666] border border-[#E8E4DC] hover:border-[#999]"
      }`}>
      {label}
    </button>
  )
}

function HotelCard({ hotel, onView, onToggleLike }: {
  hotel: typeof HOTELS[0]; onView:()=>void; onToggleLike:()=>void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div className={`group bg-white rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${hovered?"card-shadow-hover -translate-y-1.5":"card-shadow"}`}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onClick={onView}>
      <div className="relative h-52 overflow-hidden bg-[#F0EDE8]">
        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          {hotel.badge && <span className="glass-dark text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide">{hotel.badge}</span>}
        </div>
        <div className="absolute top-3 right-3"><WishBtn liked={hotel.liked} onToggle={onToggleLike} /></div>
        <div className="absolute bottom-3 left-3">
          <span className="glass text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">{hotel.category}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-semibold text-[#111] text-[15px] leading-snug">{hotel.name}</h3>
          <RatingBadge rating={hotel.rating} />
        </div>
        <div className="flex items-center gap-1 text-[#888] text-xs mb-3">
          <MapPin size={11} /><span>{hotel.location}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hotel.tags.slice(0,2).map(tag => (
            <span key={tag} className="bg-[#F8F6F2] text-[#777] text-[10px] font-medium px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[18px] font-bold text-[#111]">${hotel.price.toLocaleString()}</span>
            <span className="text-[#999] text-xs"> / night</span>
          </div>
          <span className="text-[#bbb] text-xs">{hotel.reviews} reviews</span>
        </div>
      </div>
    </div>
  )
}

// ─── Mini Calendar ────────────────────────────────────────────────────────────
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"]
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]

function MiniCalendar({ checkin, checkout, onChange }: {
  checkin: Date|null; checkout: Date|null; onChange:(ci:Date,co:Date|null)=>void
}) {
  const [month, setMonth] = useState(new Date(2026,7,1))
  const today = new Date(2026,7,6)
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay()
  const daysInMonth = new Date(month.getFullYear(), month.getMonth()+1, 0).getDate()
  const cells: (number|null)[] = [...Array(firstDay).fill(null), ...Array.from({length:daysInMonth},(_,i)=>i+1)]
  while(cells.length % 7 !== 0) cells.push(null)

  const isCheckin = (d:number) => checkin && checkin.getFullYear()===month.getFullYear() && checkin.getMonth()===month.getMonth() && checkin.getDate()===d
  const isCheckout = (d:number) => checkout && checkout.getFullYear()===month.getFullYear() && checkout.getMonth()===month.getMonth() && checkout.getDate()===d
  const inRange = (d:number) => {
    if (!checkin || !checkout) return false
    const date = new Date(month.getFullYear(), month.getMonth(), d)
    return date > checkin && date < checkout
  }
  const isPast = (d:number) => new Date(month.getFullYear(), month.getMonth(), d) < today

  const pick = (d:number) => {
    const date = new Date(month.getFullYear(), month.getMonth(), d)
    if (!checkin || (checkin && checkout)) { onChange(date, null) }
    else if (date > checkin) { onChange(checkin, date) }
    else { onChange(date, null) }
  }

  return (
    <div className="select-none">
      <div className="flex items-center justify-between mb-3">
        <button onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()-1,1))} className="w-7 h-7 rounded-full hover:bg-[#F5F5F5] flex items-center justify-center transition-colors">
          <ChevronLeft size={14} />
        </button>
        <span className="text-sm font-bold text-[#111]">{MONTHS[month.getMonth()]} {month.getFullYear()}</span>
        <button onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()+1,1))} className="w-7 h-7 rounded-full hover:bg-[#F5F5F5] flex items-center justify-center transition-colors">
          <ChevronRight size={14} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {DAYS.map(d=><div key={d} className="text-center text-[10px] font-bold text-[#999] py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((d,i)=>{
          if (!d) return <div key={`e${i}`} />
          const ci = isCheckin(d), co = isCheckout(d), mid = inRange(d), past = isPast(d)
          return (
            <button key={d} disabled={past} onClick={()=>pick(d)}
              className={`h-8 w-full text-xs font-medium rounded-lg transition-all duration-150 ${
                ci||co ? "gold-gradient text-[#111] font-bold shadow-sm"
                : mid ? "bg-[#D4AF37]/15 text-[#111]"
                : past ? "text-[#CCC] cursor-not-allowed"
                : "hover:bg-[#F5F5F5] text-[#333]"
              }`}>
              {d}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Search Widget ────────────────────────────────────────────────────────────
function SearchWidget({ onSearch, glass=false }: { onSearch?:()=>void; glass?:boolean }) {
  const [loc, setLoc] = useState("")
  const [guests, setGuests] = useState(2)
  const [showCal, setShowCal] = useState(false)
  const [checkin, setCheckin] = useState<Date|null>(null)
  const [checkout, setCheckout] = useState<Date|null>(null)
  const calRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    const fn = (e:MouseEvent)=>{ if(calRef.current && !calRef.current.contains(e.target as Node)) setShowCal(false) }
    document.addEventListener("mousedown",fn); return ()=>document.removeEventListener("mousedown",fn)
  },[])

  const fmt = (d:Date|null) => d ? `${MONTHS[d.getMonth()].slice(0,3)} ${d.getDate()}` : ""
  const inputBase = glass
    ? "bg-white/10 border-white/25 text-white placeholder-white/40 focus:border-white/60"
    : "bg-[#F8F6F2] border-[#E8E4DC] text-[#111] placeholder-[#AAA] focus:border-[#D4AF37]"
  const labelC = glass ? "text-white/60" : "text-[#888]"
  const iconC = glass ? "text-white/50" : "text-[#BBBBBB]"

  return (
    <div className={`${glass?"glass":"bg-white card-shadow"} rounded-2xl p-4 md:p-5`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="md:col-span-1">
          <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1.5 ${labelC}`}>Destination</label>
          <div className="relative">
            <MapPin size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconC}`} />
            <input value={loc} onChange={e=>setLoc(e.target.value)} placeholder="Where to?" className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-sm outline-none transition-colors ${inputBase}`} />
          </div>
        </div>
        <div className="relative" ref={calRef}>
          <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1.5 ${labelC}`}>Dates</label>
          <button onClick={()=>setShowCal(!showCal)} className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm text-left transition-colors ${
            glass ? "bg-white/10 border-white/25 text-white hover:border-white/60" : "bg-[#F8F6F2] border-[#E8E4DC] text-[#111] hover:border-[#D4AF37]"
          }`}>
            <Calendar size={14} className={iconC} />
            <span className={checkin ? "" : (glass ? "text-white/40" : "text-[#AAA]")}>
              {checkin ? `${fmt(checkin)} → ${checkout ? fmt(checkout) : "?"}` : "Select dates"}
            </span>
          </button>
          {showCal && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl card-shadow-hover p-4 z-50 w-72">
              <MiniCalendar checkin={checkin} checkout={checkout} onChange={(ci,co)=>{setCheckin(ci);setCheckout(co)}} />
              {checkin && checkout && (
                <div className="mt-3 pt-3 border-t border-[#F5F5F5] flex justify-end">
                  <button onClick={()=>setShowCal(false)} className="px-4 py-1.5 bg-[#111] text-white text-xs font-semibold rounded-full">Done</button>
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1.5 ${labelC}`}>Guests</label>
          <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${
            glass ? "bg-white/10 border-white/25" : "bg-[#F8F6F2] border-[#E8E4DC]"
          }`}>
            <Users size={14} className={iconC} />
            <button onClick={()=>setGuests(g=>Math.max(1,g-1))} className={`w-5 h-5 rounded-full flex items-center justify-center ${glass?"text-white/60 hover:text-white":"text-[#999] hover:text-[#111]"} transition-colors`}><Minus size={10}/></button>
            <span className={`text-sm font-semibold flex-1 text-center ${glass?"text-white":"text-[#111]"}`}>{guests}</span>
            <button onClick={()=>setGuests(g=>Math.min(10,g+1))} className={`w-5 h-5 rounded-full flex items-center justify-center ${glass?"text-white/60 hover:text-white":"text-[#999] hover:text-[#111]"} transition-colors`}><Plus size={10}/></button>
          </div>
        </div>
        <div className="flex items-end">
          <button onClick={onSearch} className="gold-gradient w-full py-2.5 rounded-xl font-bold text-sm text-[#111] gold-shadow hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <Search size={15} /> Search
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Top Nav ──────────────────────────────────────────────────────────────────
function TopNav({ view, onNavigate, notifCount }: { view:View; onNavigate:(v:View)=>void; notifCount:number }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>50)
    window.addEventListener("scroll",fn); return ()=>window.removeEventListener("scroll",fn)
  },[])
  const isLanding = view==="landing"
  const dark = isLanding && !scrolled
  const bg = dark ? "bg-transparent" : "bg-white/96 backdrop-blur-lg border-b border-[#E8E4DC]"
  const tc = dark ? "text-white" : "text-[#111]"
  const mtc = dark ? "text-white/70 hover:text-white" : "text-[#666] hover:text-[#111]"
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${bg}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={()=>onNavigate("landing")} className={`font-serif text-[22px] font-bold tracking-wider ${tc} transition-colors`}>AUREA</button>
        <div className="hidden md:flex items-center gap-8">
          {[{l:"Discover",v:"hotels"},{l:"Collections",v:"hotels"},{l:"Experiences",v:"hotels"}].map(({l,v})=>(
            <button key={l} onClick={()=>onNavigate(v as View)} className={`text-[13px] font-medium transition-colors ${mtc}`}>{l}</button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button onClick={()=>onNavigate("notifications")} className={`relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors ${dark?"text-white":"text-[#666]"}`}>
            <Bell size={18} />
            {notifCount>0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#D4AF37] text-[#111] text-[9px] font-bold rounded-full flex items-center justify-center">{notifCount}</span>}
          </button>
          <button onClick={()=>onNavigate("admin")} className={`text-[13px] font-medium px-3 py-1.5 rounded-full transition-colors ${mtc}`}>Dashboard</button>
          <button onClick={()=>onNavigate("profile")} className="w-9 h-9 rounded-full gold-gradient flex items-center justify-center text-[#111] font-bold text-sm hover:opacity-90 transition-opacity shadow-sm">A</button>
        </div>
        <button className={`md:hidden ${dark?"text-white":"text-[#111]"}`} onClick={()=>setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#E8E4DC] px-6 py-4 space-y-1">
          {["Discover","Collections","Experiences","Notifications","Dashboard","Profile"].map(item=>(
            <button key={item} onClick={()=>{ setMobileOpen(false); onNavigate(item==="Profile"?"profile":item==="Dashboard"?"admin":item==="Notifications"?"notifications":"hotels") }}
              className="flex w-full text-left text-sm font-medium text-[#111] py-3 border-b border-[#F5F5F5] items-center gap-3">
              {item}
              {item==="Notifications" && notifCount>0 && <span className="w-5 h-5 bg-[#D4AF37] text-[#111] text-[10px] font-bold rounded-full flex items-center justify-center">{notifCount}</span>}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

function BottomNav({ view, onNavigate, notifCount }: { view:View; onNavigate:(v:View)=>void; notifCount:number }) {
  const tabs = [
    {icon:Home,label:"Home",t:"landing" as View},
    {icon:Compass,label:"Explore",t:"hotels" as View},
    {icon:Heart,label:"Saved",t:"wishlist" as View},
    {icon:BookOpen,label:"Trips",t:"trips" as View},
    {icon:User,label:"Profile",t:"profile" as View},
  ]
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E8E4DC] md:hidden">
      <div className="flex items-center justify-around px-2 h-[60px]">
        {tabs.map(({icon:Icon,label,t})=>{
          const active = view===t
          return (
            <button key={label} onClick={()=>onNavigate(t)} className="flex flex-col items-center gap-0.5 px-3 py-1.5">
              <div className="relative">
                <Icon size={20} className={active?"text-[#D4AF37]":"text-[#BBBBBB]"} />
                {label==="Profile" && notifCount>0 && <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#D4AF37] rounded-full flex items-center justify-center text-[8px] font-bold text-[#111]">{notifCount}</span>}
              </div>
              <span className={`text-[10px] font-semibold ${active?"text-[#D4AF37]":"text-[#BBBBBB]"}`}>{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

// ─── Splash Screen ────────────────────────────────────────────────────────────
function SplashScreen({ onDone }:{ onDone:()=>void }) {
  useEffect(()=>{ const t=setTimeout(onDone,2200); return ()=>clearTimeout(t) },[onDone])
  return (
    <div className="fixed inset-0 z-[200] bg-[#111111] flex flex-col items-center justify-center">
      <div className="absolute inset-0"><img src={IMG.hero} alt="" className="w-full h-full object-cover opacity-25" /></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111111]/60 to-[#111111]" />
      <div className="relative z-10 text-center animate-pulse-slow">
        <div className="font-serif text-6xl text-white tracking-[0.3em] mb-3">AUREA</div>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em]">Luxury Beyond Expectations</span>
          <div className="h-px w-12 bg-[#D4AF37]" />
        </div>
      </div>
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5">
        {[0,1,2].map(i=>(
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" style={{opacity:0.3+i*0.35}} />
        ))}
      </div>
    </div>
  )
}

// ─── Welcome Screen ───────────────────────────────────────────────────────────
function WelcomeScreen({ onNavigate }:{ onNavigate:(v:View)=>void }) {
  const [slide, setSlide] = useState(0)
  const slides = [
    { img:IMG.pool,   title:"Discover the World's Finest",  sub:"Curated sanctuaries across 48 countries, each one extraordinary." },
    { img:IMG.room2,  title:"Every Detail Considered",       sub:"From arrival to departure, every moment is thoughtfully designed." },
    { img:IMG.island, title:"Exclusively Yours",             sub:"Personalised service and hidden gems only AUREA members access." },
  ]
  useEffect(()=>{ const t=setInterval(()=>setSlide(s=>(s+1)%3),3000); return ()=>clearInterval(t) },[])
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col relative overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((s,i)=>(
          <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i===slide?"opacity-100":"opacity-0"}`}>
            <img src={s.img} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/40 via-transparent to-[#111111]/95" />
      </div>
      <div className="relative z-10 flex items-center justify-between px-6 pt-14">
        <div className="font-serif text-2xl text-white tracking-wider">AUREA</div>
      </div>
      <div className="relative z-10 flex-1 flex flex-col justify-end px-6 pb-14">
        <div className="mb-8">
          <div className="flex gap-1.5 mb-6">
            {slides.map((_,i)=>(
              <div key={i} className={`h-0.5 rounded-full transition-all duration-300 ${i===slide?"w-8 bg-[#D4AF37]":"w-2 bg-white/30"}`} />
            ))}
          </div>
          <h1 className="font-serif text-4xl text-white leading-tight mb-3">{slides[slide].title}</h1>
          <p className="text-white/65 text-sm leading-relaxed">{slides[slide].sub}</p>
        </div>
        <div className="space-y-3">
          <PrimaryBtn full size="lg" onClick={()=>onNavigate("signup")}>Create Your Account</PrimaryBtn>
          <button onClick={()=>onNavigate("signin")} className="w-full py-4 rounded-full border-2 border-white/30 text-white font-semibold text-base hover:border-white/60 transition-colors">
            Sign In
          </button>
          <button onClick={()=>onNavigate("landing")} className="w-full text-center text-white/40 text-sm py-2 hover:text-white/70 transition-colors">
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Sign In ──────────────────────────────────────────────────────────────────
function SignInScreen({ onNavigate, toast }:{ onNavigate:(v:View)=>void; toast:(m:string,t?:Toast["type"])=>void }) {
  const [email,setEmail]=useState("")
  const [pass,setPass]=useState("")
  const [loading,setLoading]=useState(false)
  const submit=()=>{
    if(!email||!pass){ toast("Please fill all fields","error"); return }
    setLoading(true)
    setTimeout(()=>{ setLoading(false); toast("Welcome back to AUREA","success"); onNavigate("landing") },1200)
  }
  return (
    <div className="min-h-screen bg-[#F8F6F2] flex flex-col md:flex-row">
      <div className="hidden md:block md:w-1/2 relative bg-[#111]">
        <img src={IMG.lobby} alt="" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111]/20" />
        <div className="absolute bottom-12 left-10">
          <div className="font-serif text-5xl text-white mb-2">AUREA</div>
          <div className="text-white/50 text-sm">Luxury Beyond Expectations</div>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-16 max-w-md mx-auto w-full">
        <button onClick={()=>onNavigate("welcome")} className="flex items-center gap-2 text-[#888] text-sm mb-10 hover:text-[#111] transition-colors self-start">
          <ArrowLeft size={16}/> Back
        </button>
        <div className="mb-8">
          <div className="font-serif text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase mb-2">Welcome Back</div>
          <h1 className="font-serif text-4xl text-[#111] mb-2">Sign In</h1>
          <p className="text-[#888] text-sm">Enter your credentials to continue your luxury journey.</p>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-bold text-[#666] uppercase tracking-wider mb-1.5">Email Address</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="your@email.com"
              className="w-full px-4 py-3.5 rounded-xl border-2 border-[#E8E4DC] bg-white text-sm outline-none focus:border-[#D4AF37] transition-colors" />
          </div>
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="text-xs font-bold text-[#666] uppercase tracking-wider">Password</label>
              <button onClick={()=>toast("If that email exists, a reset link has been sent","info")} className="text-xs text-[#D4AF37] font-semibold hover:opacity-80">Forgot password?</button>
            </div>
            <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="••••••••"
              className="w-full px-4 py-3.5 rounded-xl border-2 border-[#E8E4DC] bg-white text-sm outline-none focus:border-[#D4AF37] transition-colors" />
          </div>
        </div>
        <PrimaryBtn full size="lg" onClick={submit} disabled={loading}>
          {loading ? "Signing In…" : "Sign In"}
        </PrimaryBtn>
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-[#E8E4DC]" />
          <span className="text-xs text-[#BBB] font-medium">OR</span>
          <div className="flex-1 h-px bg-[#E8E4DC]" />
        </div>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {["Continue with Google","Continue with Apple"].map(l=>(
            <button key={l} onClick={()=>toast(`${l} isn't available in this demo`,"info")} className="py-3 border-2 border-[#E8E4DC] rounded-xl text-[13px] font-semibold text-[#333] hover:border-[#999] transition-colors">{l.split(" with ")[1]}</button>
          ))}
        </div>
        <p className="text-center text-sm text-[#888]">
          No account? <button onClick={()=>onNavigate("signup")} className="text-[#111] font-bold hover:text-[#D4AF37] transition-colors">Create one</button>
        </p>
      </div>
    </div>
  )
}

// ─── Sign Up ──────────────────────────────────────────────────────────────────
function SignUpScreen({ onNavigate, toast }:{ onNavigate:(v:View)=>void; toast:(m:string,t?:Toast["type"])=>void }) {
  const [step,setStep]=useState(1)
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [pass,setPass]=useState("")
  const [agree,setAgree]=useState(false); const [loading,setLoading]=useState(false)
  const submit=()=>{
    if(!name||!email||!pass){ toast("Please fill all fields","error"); return }
    if(!agree){ toast("Please accept the terms","error"); return }
    setLoading(true)
    setTimeout(()=>{ setLoading(false); toast("Welcome to AUREA — your luxury journey begins","success"); onNavigate("landing") },1400)
  }
  return (
    <div className="min-h-screen bg-[#F8F6F2] flex flex-col md:flex-row">
      <div className="hidden md:block md:w-1/2 relative bg-[#111]">
        <img src={IMG.pool2} alt="" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111]/30" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <div className="font-serif text-white/20 text-8xl leading-none mb-4">1%</div>
          <p className="text-white font-serif text-2xl mb-2">Join the world's most<br/>discerning travellers</p>
          <p className="text-white/50 text-sm">Access 320+ extraordinary properties, exclusive rates, and a community of like-minded explorers.</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-16 max-w-md mx-auto w-full">
        <button onClick={()=>onNavigate("welcome")} className="flex items-center gap-2 text-[#888] text-sm mb-10 hover:text-[#111] transition-colors self-start">
          <ArrowLeft size={16}/> Back
        </button>
        <div className="mb-8">
          <div className="font-serif text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase mb-2">Join AUREA</div>
          <h1 className="font-serif text-4xl text-[#111] mb-2">Create Account</h1>
          <p className="text-[#888] text-sm">Begin your journey to extraordinary stays.</p>
        </div>
        <div className="space-y-4 mb-5">
          <div>
            <label className="block text-xs font-bold text-[#666] uppercase tracking-wider mb-1.5">Full Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Alexandra Laurent"
              className="w-full px-4 py-3.5 rounded-xl border-2 border-[#E8E4DC] bg-white text-sm outline-none focus:border-[#D4AF37] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#666] uppercase tracking-wider mb-1.5">Email Address</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="your@email.com"
              className="w-full px-4 py-3.5 rounded-xl border-2 border-[#E8E4DC] bg-white text-sm outline-none focus:border-[#D4AF37] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#666] uppercase tracking-wider mb-1.5">Password</label>
            <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Min. 8 characters"
              className="w-full px-4 py-3.5 rounded-xl border-2 border-[#E8E4DC] bg-white text-sm outline-none focus:border-[#D4AF37] transition-colors" />
            {pass.length>0 && (
              <div className="flex gap-1 mt-2">
                {[1,2,3,4].map(i=>(
                  <div key={i} className={`flex-1 h-1 rounded-full ${i<=Math.min(4,Math.floor(pass.length/2))?"bg-[#D4AF37]":"bg-[#E8E4DC]"}`}/>
                ))}
              </div>
            )}
          </div>
        </div>
        <label className="flex items-start gap-3 mb-6 cursor-pointer">
          <div onClick={()=>setAgree(!agree)} className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-colors ${agree?"bg-[#D4AF37] border-[#D4AF37]":"border-[#CCC]"}`}>
            {agree && <Check size={11} className="text-[#111]" strokeWidth={3}/>}
          </div>
          <span className="text-xs text-[#888] leading-relaxed">I agree to the <span className="text-[#111] font-semibold underline underline-offset-2">Terms of Service</span> and <span className="text-[#111] font-semibold underline underline-offset-2">Privacy Policy</span></span>
        </label>
        <PrimaryBtn full size="lg" onClick={submit} disabled={loading}>
          {loading ? "Creating Account…" : "Create Account"}
        </PrimaryBtn>
        <p className="text-center text-sm text-[#888] mt-6">
          Already a member? <button onClick={()=>onNavigate("signin")} className="text-[#111] font-bold hover:text-[#D4AF37] transition-colors">Sign In</button>
        </p>
      </div>
    </div>
  )
}

// ─── Landing Page ─────────────────────────────────────────────────────────────
function LandingPage({ onNavigate, hotels, onToggleLike, toast }: {
  onNavigate:(v:View)=>void; hotels:typeof HOTELS; onToggleLike:(id:number)=>void; toast:(m:string,t?:Toast["type"])=>void
}) {
  const [activeCat, setActiveCat] = useState("All")
  const [heroSlide, setHeroSlide] = useState(0)
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const heroes = [IMG.hero, IMG.hero2, IMG.hero3]
  const cats = ["All","Cliffside","Overwater","Jungle","Wilderness","Ryokan","Clifftop","Beachfront"]

  useEffect(()=>{ const t=setInterval(()=>setHeroSlide(s=>(s+1)%heroes.length),5000); return()=>clearInterval(t) },[])

  const destinations = [
    {name:"Santorini",country:"Greece",count:12,img:IMG.pool},
    {name:"Maldives",country:"Indian Ocean",count:8,img:IMG.coastal},
    {name:"Kyoto",country:"Japan",count:15,img:IMG.lobby},
    {name:"Amalfi",country:"Italy",count:9,img:IMG.dining},
  ]
  const testimonials = [
    {text:"AUREA curated an experience that transcended hospitality. The attention to detail was extraordinary — every moment felt intentional.",author:"Isabella Chen",role:"Creative Director, London",stays:14},
    {text:"From first click to final departure, AUREA managed every detail flawlessly. I've never felt more cared for as a traveller.",author:"Marcus Vogt",role:"Architect, Berlin",stays:9},
    {text:"The curation is unmatched. AUREA finds hidden gems that even seasoned travellers haven't discovered.",author:"Sophie Marceau",role:"Fashion Editor, Paris",stays:22},
  ]
  const howItWorks = [
    {n:"01",title:"Discover",body:"Browse our curated collection of 320+ extraordinary properties, filtered by your vision of luxury.",icon:Search},
    {n:"02",title:"Personalise",body:"Set your dates, preferences, and guest requirements. Our concierge assists with every nuance.",icon:Edit3},
    {n:"03",title:"Arrive",body:"Check in to a property prepared specifically for you, with a dedicated host at every step.",icon:Sparkles},
  ]

  return (
    <div className="bg-[#F8F6F2]">
      {/* Hero */}
      <section className="relative h-screen min-h-[640px] overflow-hidden">
        {heroes.map((img,i)=>(
          <div key={i} className={`absolute inset-0 bg-[#111] transition-opacity duration-1000 ${i===heroSlide?"opacity-100":"opacity-0"}`}>
            <img src={img} alt="" className="w-full h-full object-cover" style={{opacity:0.88}}/>
          </div>
        ))}
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 flex flex-col justify-end h-full pb-20 md:pb-28 px-6 md:px-16 max-w-7xl mx-auto">
          <div className="fade-up">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-px bg-[#D4AF37]"/>
              <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em]">Luxury Beyond Expectations</span>
            </div>
            <h1 className="font-serif text-5xl md:text-[72px] text-white leading-[1.05] mb-4 max-w-2xl">
              Where the World's<br/>Finest Hotels Await
            </h1>
            <p className="text-white/65 text-base md:text-[17px] mb-10 max-w-lg leading-relaxed">
              Curated sanctuaries — from caldera cliff villas to overwater bungalows — reserved for those who expect the extraordinary.
            </p>
            <div className="max-w-3xl">
              <SearchWidget onSearch={()=>onNavigate("hotels")} glass />
            </div>
          </div>
        </div>
        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {heroes.map((_,i)=>(
            <button key={i} onClick={()=>setHeroSlide(i)} className={`h-0.5 rounded-full transition-all duration-300 ${i===heroSlide?"w-8 bg-[#D4AF37]":"w-2 bg-white/30"}`}/>
          ))}
        </div>
        <div className="absolute bottom-10 right-8 hidden md:block text-right">
          <div className="text-white/30 text-[10px] font-medium tracking-[0.2em] uppercase">Scroll to explore</div>
          <div className="w-px h-10 bg-white/20 ml-auto mt-2"/>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#111]">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:divide-x md:divide-white/10">
            {[{n:"320+",l:"Luxury Properties"},{n:"48",l:"Countries Covered"},{n:"99.4%",l:"Guest Satisfaction"},{n:"4.7M+",l:"Nights Booked"}].map(({n,l})=>(
              <div key={l} className="text-center md:px-8">
                <div className="font-serif text-3xl text-[#D4AF37] mb-1">{n}</div>
                <div className="text-white/40 text-[11px] font-semibold uppercase tracking-[0.15em]">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">Featured Destinations</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#111] leading-tight">The World's<br/>Most Coveted</h2>
          </div>
          <button onClick={()=>onNavigate("hotels")} className="hidden md:flex items-center gap-2 text-sm font-bold text-[#111] hover:text-[#D4AF37] transition-colors mt-4">
            View all <ArrowRight size={15}/>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {destinations.map((d,i)=>(
            <button key={d.name} onClick={()=>onNavigate("hotels")}
              className={`relative overflow-hidden rounded-2xl bg-[#111] cursor-pointer group ${i===0?"row-span-2 h-[480px]":"h-56"}`}>
              <img src={d.img} alt={d.name} className="w-full h-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-[1.06]"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#111]/75 to-transparent"/>
              <div className="absolute bottom-4 left-4 text-left">
                <div className="text-white font-bold text-lg leading-tight">{d.name}</div>
                <div className="text-white/55 text-xs">{d.count} properties</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">The Process</span>
            <h2 className="font-serif text-4xl text-[#111]">Simple. Exceptional. Yours.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {howItWorks.map(({n,title,body,icon:Icon})=>(
              <div key={n} className="relative">
                <div className="flex items-start gap-4">
                  <div>
                    <div className="font-serif text-5xl text-[#E8E4DC] leading-none mb-3">{n}</div>
                    <div className="w-10 h-10 rounded-xl bg-[#F8F6F2] flex items-center justify-center mb-3">
                      <Icon size={18} className="text-[#D4AF37]"/>
                    </div>
                    <h3 className="font-semibold text-xl text-[#111] mb-2">{title}</h3>
                    <p className="text-[#777] text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
                {n!=="03" && <div className="hidden md:block absolute top-12 right-0 w-1/3 h-px border-t-2 border-dashed border-[#E8E4DC]"/>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-12 md:py-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">Curated for You</span>
            <h2 className="font-serif text-4xl text-[#111]">Luxury Collections</h2>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0 overflow-x-auto pb-2 md:pb-0">
            {cats.map(c=><CategoryChip key={c} label={c} active={activeCat===c} onClick={()=>setActiveCat(c)}/>)}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {hotels.filter(h=>activeCat==="All"||h.category===activeCat).slice(0,8).map(h=>(
            <HotelCard key={h.id} hotel={h} onView={()=>onNavigate("hotel-detail")} onToggleLike={()=>onToggleLike(h.id)}/>
          ))}
        </div>
        <div className="text-center mt-10">
          <SecondaryBtn onClick={()=>onNavigate("hotels")}>Explore All Properties</SecondaryBtn>
        </div>
      </section>

      {/* Offer Banner */}
      <section className="mx-6 md:mx-auto max-w-7xl mb-16 md:mb-24">
        <div className="relative overflow-hidden rounded-3xl" style={{background:"linear-gradient(135deg,#111111 0%,#1e1a0e 100%)"}}>
          <div className="absolute inset-0 opacity-25"><img src={IMG.spa} alt="" className="w-full h-full object-cover"/></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#111]/90 via-[#111]/60 to-transparent"/>
          <div className="relative z-10 p-10 md:p-16 max-w-lg">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={14} className="text-[#D4AF37]"/>
              <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em]">Limited — 12 rooms</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">30% Off<br/>Maldives Week</h2>
            <p className="text-white/55 text-sm mb-8 leading-relaxed">Exclusive savings on overwater villas. Book before Aug 31 — stay any time within 12 months.</p>
            <div className="flex items-center gap-4">
              <PrimaryBtn onClick={()=>onNavigate("hotels")} size="lg">Claim Offer</PrimaryBtn>
              <div className="text-white/40 text-xs"><div className="font-bold text-white/60 text-lg">6</div>rooms left</div>
            </div>
          </div>
          <div className="absolute top-8 right-10 text-white/5 font-serif text-[180px] leading-none select-none hidden md:block">30</div>
          <div className="absolute bottom-8 right-12 hidden md:block">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10">
              <img src={IMG.coastal} alt="" className="w-full h-full object-cover"/>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] block mb-3">Guest Stories</span>
            <h2 className="font-serif text-4xl text-white">Extraordinary Moments</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(t=>(
              <div key={t.author} className="bg-white/[0.04] border border-white/10 rounded-2xl p-7 hover:border-[#D4AF37]/30 transition-all duration-300 hover:-translate-y-1 group">
                <StarRating rating={5} size={13}/>
                <p className="text-white/75 text-[15px] leading-relaxed mt-5 mb-7 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 border-t border-white/10 pt-5">
                  <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-[#111] font-bold text-sm flex-shrink-0">{t.author[0]}</div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">{t.author}</div>
                    <div className="text-white/35 text-xs">{t.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#D4AF37] font-bold">{t.stays}</div>
                    <div className="text-white/35 text-[10px]">stays</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-6 max-w-xl mx-auto text-center">
        <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] block mb-3">Members Only</span>
        <h2 className="font-serif text-4xl text-[#111] mb-3">First Access to<br/>Hidden Gems</h2>
        <p className="text-[#888] text-sm mb-8 leading-relaxed">Join 240,000+ discerning travellers receiving exclusive rates, early access, and curated itineraries.</p>
        <div className="flex gap-2">
          <input type="email" placeholder="Your email address" value={newsletterEmail} onChange={e=>setNewsletterEmail(e.target.value)}
            className="flex-1 px-5 py-3.5 rounded-full border-2 border-[#E8E4DC] bg-white text-sm outline-none focus:border-[#D4AF37] transition-colors"/>
          <PrimaryBtn onClick={()=>{
            if(!newsletterEmail){ toast("Please enter your email address","error"); return }
            toast("You're subscribed — welcome to the list","success")
            setNewsletterEmail("")
          }}>Subscribe</PrimaryBtn>
        </div>
        <p className="text-xs text-[#CCC] mt-3">No spam. Unsubscribe at any time.</p>
      </section>

      {/* Footer */}
      <footer className="bg-[#0E0E0E] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-white/[0.07]">
            <div className="col-span-2">
              <div className="font-serif text-2xl text-[#D4AF37] mb-3">AUREA</div>
              <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">Curating the world's most extraordinary hotel experiences. Est. 2019.</p>
              <div className="flex gap-3">
                {[Globe, Phone, Mail].map((Icon,i)=>(
                  <button key={i} onClick={()=>toast("Thanks for reaching out — our concierge team will be in touch","info")} className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-[#D4AF37] hover:text-[#111] flex items-center justify-center transition-all duration-200">
                    <Icon size={15}/>
                  </button>
                ))}
              </div>
            </div>
            {[
              {h:"Explore", links:["Destinations","Collections","Experiences","Offers","New Openings"]},
              {h:"Company", links:["About","Careers","Press","Partners","Blog"]},
              {h:"Support",  links:["Help Center","Cancellation","Trust & Safety","Contact","Accessibility"]},
            ].map(({h,links})=>(
              <div key={h}>
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30 mb-4">{h}</div>
                <ul className="space-y-2.5">
                  {links.map(l=><li key={l}><a href="#" className="text-white/50 text-sm hover:text-[#D4AF37] transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-6 gap-3">
            <div className="text-white/20 text-xs">© 2026 AUREA Holdings Ltd. All rights reserved.</div>
            <div className="flex gap-6">
              {["Privacy","Terms","Cookies","Sitemap"].map(l=><a key={l} href="#" className="text-white/25 text-xs hover:text-white/50 transition-colors">{l}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ─── Hotels Page ──────────────────────────────────────────────────────────────
function HotelsPage({ onNavigate, hotels, onToggleLike }: {
  onNavigate:(v:View)=>void; hotels:typeof HOTELS; onToggleLike:(id:number)=>void
}) {
  const [sortBy, setSortBy] = useState("Recommended")
  const [priceMax, setPriceMax] = useState(5000)
  const [priceMin, setPriceMin] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [activeCat, setActiveCat] = useState("All")
  const [searchQ, setSearchQ] = useState("")
  const [ratingMin, setRatingMin] = useState(0)
  const cats = ["All","Cliffside","Overwater","Jungle","Wilderness","Ryokan","Clifftop","Beachfront"]
  const amenities = ["Pool","Spa","Restaurant","Gym","Parking","WiFi","Beach Access","Butler","Yoga","Helipad"]

  const filtered = hotels.filter(h=>{
    const matchCat = activeCat==="All"||h.category===activeCat
    const matchPrice = h.price>=priceMin && h.price<=priceMax
    const matchSearch = !searchQ||h.name.toLowerCase().includes(searchQ.toLowerCase())||h.location.toLowerCase().includes(searchQ.toLowerCase())
    const matchRating = h.rating>=ratingMin
    return matchCat&&matchPrice&&matchSearch&&matchRating
  })

  const sorted = [...filtered].sort((a,b)=>{
    if(sortBy==="Price: Low to High") return a.price-b.price
    if(sortBy==="Price: High to Low") return b.price-a.price
    if(sortBy==="Rating") return b.rating-a.rating
    return 0
  })

  return (
    <div className="bg-[#F8F6F2] min-h-screen pt-20 pb-28 md:pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="py-8">
          <h1 className="font-serif text-4xl md:text-5xl text-[#111] mb-1">Luxury Hotels</h1>
          <p className="text-[#888] text-sm">{sorted.length} extraordinary properties worldwide</p>
        </div>
        <SearchWidget onSearch={()=>{}} />
        <div className="flex flex-col md:flex-row gap-3 mt-5 mb-4">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CCC]"/>
            <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Search destinations, hotels…"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E8E4DC] bg-white text-sm outline-none focus:border-[#D4AF37] transition-colors"/>
          </div>
          <button onClick={()=>setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-all ${showFilters?"bg-[#111] text-white border-[#111]":"bg-white border-[#E8E4DC] text-[#111] hover:border-[#999]"}`}>
            <SlidersHorizontal size={15}/> Filters {showFilters&&<span className="w-5 h-5 bg-[#D4AF37] text-[#111] text-[10px] font-bold rounded-full flex items-center justify-center">3</span>}
          </button>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
            className="px-4 py-3 rounded-xl border border-[#E8E4DC] bg-white text-sm text-[#111] outline-none focus:border-[#D4AF37]">
            {["Recommended","Price: Low to High","Price: High to Low","Rating","Newest"].map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {cats.map(c=><CategoryChip key={c} label={c} active={activeCat===c} onClick={()=>setActiveCat(c)}/>)}
        </div>
        <div className="flex gap-6">
          {showFilters && (
            <aside className="hidden md:block w-72 flex-shrink-0">
              <div className="bg-white rounded-2xl p-6 card-shadow sticky top-24">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-[#111]">Filters</h3>
                  <button onClick={()=>{ setPriceMax(5000); setPriceMin(0); setRatingMin(0) }} className="text-xs text-[#D4AF37] font-semibold">Reset</button>
                </div>
                <div className="mb-6 pb-6 border-b border-[#F5F5F5]">
                  <div className="flex justify-between mb-3">
                    <span className="text-sm font-semibold text-[#111]">Price per night</span>
                    <span className="text-sm text-[#D4AF37] font-bold">${priceMin.toLocaleString()} – ${priceMax.toLocaleString()}</span>
                  </div>
                  <input type="range" min={0} max={5000} step={100} value={priceMax} onChange={e=>setPriceMax(Number(e.target.value))} className="w-full mb-2"/>
                  <div className="flex justify-between text-xs text-[#CCC]"><span>$0</span><span>$5,000+</span></div>
                </div>
                <div className="mb-6 pb-6 border-b border-[#F5F5F5]">
                  <div className="text-sm font-semibold text-[#111] mb-3">Minimum Rating</div>
                  {[0,4,4.5,4.8,4.9].map(r=>(
                    <label key={r} className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                      <input type="radio" checked={ratingMin===r} onChange={()=>setRatingMin(r)} className="accent-[#D4AF37] w-4 h-4"/>
                      <span className="text-sm text-[#555]">{r===0?"Any rating":`${r}+ stars`}</span>
                      {r>0 && <StarRating rating={r} size={11}/>}
                    </label>
                  ))}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#111] mb-3">Amenities</div>
                  <div className="space-y-2">
                    {amenities.map(a=>(
                      <label key={a} className="flex items-center gap-2.5 cursor-pointer py-0.5">
                        <input type="checkbox" className="accent-[#D4AF37] w-4 h-4 rounded"/>
                        <span className="text-sm text-[#666]">{a}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}
          <div className="flex-1">
            {sorted.length===0 ? (
              <div className="text-center py-24">
                <div className="text-6xl mb-4">🏨</div>
                <h3 className="font-semibold text-[#111] mb-2">No properties found</h3>
                <p className="text-[#888] text-sm mb-5">Try adjusting your filters or search query</p>
                <SecondaryBtn onClick={()=>{ setActiveCat("All"); setSearchQ(""); setPriceMax(5000); setRatingMin(0) }}>Clear Filters</SecondaryBtn>
              </div>
            ) : (
              <div className={`grid gap-5 ${showFilters?"grid-cols-1 md:grid-cols-2":"grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}>
                {sorted.map(h=><HotelCard key={h.id} hotel={h} onView={()=>onNavigate("hotel-detail")} onToggleLike={()=>onToggleLike(h.id)}/>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Hotel Detail ─────────────────────────────────────────────────────────────
function HotelDetailPage({ onNavigate, toast }: { onNavigate:(v:View)=>void; toast:(m:string,t?:Toast["type"])=>void }) {
  const [activeTab, setActiveTab] = useState("Overview")
  const [galleryIdx, setGalleryIdx] = useState(0)
  const [liked, setLiked] = useState(false)
  const [lightbox, setLightbox] = useState(false)
  const tabs = ["Overview","Rooms","Amenities","Reviews","Map"]
  const gallery = [IMG.pool, IMG.lobby, IMG.room1, IMG.room2, IMG.spa, IMG.restaurant, IMG.dining, IMG.pool2]
  const amenityGroups = [
    {label:"Wellness",items:[{icon:Waves,name:"Infinity Pool"},{icon:Sparkles,name:"Full-Service Spa"},{icon:Dumbbell,name:"Fitness Center"},{icon:Leaf,name:"Yoga Pavilion"}]},
    {label:"Dining",items:[{icon:Utensils,name:"Fine Dining Restaurant"},{icon:Coffee,name:"Poolside Bar"},{icon:Utensils,name:"In-Room Dining 24h"},{icon:Utensils,name:"Chef's Table Experience"}]},
    {label:"Services",items:[{icon:Shield,name:"24/7 Concierge"},{icon:Car,name:"Airport Transfer"},{icon:Wifi,name:"High-Speed WiFi"},{icon:Tv,name:"Smart Home System"}]},
    {label:"Experiences",items:[{icon:Sailboat,name:"Sailing Excursion"},{icon:Globe,name:"Wine Cave Tour"},{icon:Sparkles,name:"Spa Ritual"},{icon:Compass,name:"Private Island Day"}]},
  ]
  const reviews = [
    {name:"James W.",role:"Verified Guest",rating:5,date:"June 2026",text:"Truly an exceptional stay. The suite was immaculate, the staff intuitive and warm. I've stayed at the finest hotels worldwide — Aurea Santorini rivals them all."},
    {name:"Mei L.",role:"Gold Member",rating:5,date:"May 2026",text:"The infinity pool at sunrise is a spiritual experience. Room service was impeccable — fresh flowers daily, turn-down ritual that felt genuinely thoughtful."},
    {name:"Pierre D.",role:"Verified Guest",rating:4,date:"April 2026",text:"Stunning property in an unbeatable location. The restaurant deserves its own accolades — the sea bass was a revelation."},
  ]

  return (
    <div className="bg-[#F8F6F2] min-h-screen pb-32 md:pb-8">
      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-[#000]/95 flex items-center justify-center" onClick={()=>setLightbox(false)}>
          <button onClick={()=>setLightbox(false)} className="absolute top-4 right-4 text-white/70 hover:text-white"><X size={28}/></button>
          <button onClick={e=>{e.stopPropagation();setGalleryIdx(i=>(i-1+gallery.length)%gallery.length)}} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <ChevronLeft size={22}/>
          </button>
          <img src={gallery[galleryIdx]} alt="" className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl" onClick={e=>e.stopPropagation()}/>
          <button onClick={e=>{e.stopPropagation();setGalleryIdx(i=>(i+1)%gallery.length)}} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <ChevronRight size={22}/>
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
            {gallery.map((_,i)=><button key={i} onClick={e=>{e.stopPropagation();setGalleryIdx(i)}} className={`w-2 h-2 rounded-full transition-all ${i===galleryIdx?"bg-[#D4AF37] w-5":"bg-white/30"}`}/>)}
          </div>
        </div>
      )}

      {/* Gallery */}
      <div className="relative h-[50vh] md:h-[62vh] bg-[#111] overflow-hidden pt-16">
        <img src={gallery[galleryIdx]} alt="Hotel" className="w-full h-full object-cover transition-opacity duration-500"/>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111]/50"/>
        {/* Thumbnails */}
        <div className="absolute top-20 right-4 flex flex-col gap-2 md:flex">
          {gallery.slice(0,5).map((img,i)=>(
            <button key={i} onClick={()=>setGalleryIdx(i)}
              className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${galleryIdx===i?"border-[#D4AF37] scale-105":"border-transparent opacity-70 hover:opacity-100"}`}>
              <img src={img} alt="" className="w-full h-full object-cover"/>
            </button>
          ))}
          <button onClick={()=>setLightbox(true)} className="glass w-14 h-10 rounded-lg flex items-center justify-center text-white text-[10px] font-bold">+{gallery.length-5}</button>
        </div>
        <div className="absolute bottom-4 left-4 flex gap-2">
          <button onClick={()=>setGalleryIdx(i=>(i-1+gallery.length)%gallery.length)} className="glass w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"><ChevronLeft size={16}/></button>
          <button onClick={()=>setGalleryIdx(i=>(i+1)%gallery.length)} className="glass w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"><ChevronRight size={16}/></button>
        </div>
        <button onClick={()=>setLightbox(true)} className="absolute bottom-4 right-4 glass text-white text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <Maximize2 size={12}/> View All Photos
        </button>
        <div className="absolute top-20 left-4 flex gap-2">
          <button onClick={()=>{ setLiked(!liked); toast(liked?"Removed from wishlist":"Saved to wishlist","info") }} className="glass w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <Heart size={15} className={liked?"fill-[#D4AF37] text-[#D4AF37]":""}/>
          </button>
          <button onClick={()=>{ navigator.clipboard?.writeText(window.location.href); toast("Link copied to clipboard","success") }} className="glass w-9 h-9 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"><Share2 size={15}/></button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="md:grid md:grid-cols-3 md:gap-10">
          <div className="md:col-span-2">
            <div className="py-6 border-b border-[#E8E4DC]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider">Cliffside Resort</span>
                    <span className="text-[#DDD]">·</span>
                    <span className="bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold px-2 py-0.5 rounded-full">Editor's Pick</span>
                  </div>
                  <h1 className="font-serif text-3xl md:text-4xl text-[#111] leading-tight mb-2">Aurea Santorini</h1>
                  <div className="flex items-center gap-2 text-[#888] text-sm">
                    <MapPin size={14}/><span>Oia, Santorini, Greece</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <StarRating rating={5} size={14}/>
                  <div className="font-bold text-2xl text-[#111] mt-1">4.97</div>
                  <div className="text-[#AAA] text-xs">312 reviews</div>
                </div>
              </div>
            </div>
            {/* Tabs */}
            <div className="flex border-b border-[#E8E4DC] overflow-x-auto">
              {tabs.map(tab=>(
                <button key={tab} onClick={()=>setActiveTab(tab)}
                  className={`px-4 py-3.5 text-sm font-semibold border-b-2 -mb-px whitespace-nowrap transition-all ${activeTab===tab?"border-[#D4AF37] text-[#111]":"border-transparent text-[#999] hover:text-[#111]"}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="py-6">
              {activeTab==="Overview" && (
                <div>
                  <p className="text-[#555] leading-relaxed mb-4 text-[15px]">Perched on the volcanic caldera of Santorini's iconic Oia village, Aurea Santorini is an intimate sanctuary of 24 private suites and villas. Each space has been individually curated with artisanal furnishings and panoramic views of the Aegean Sea.</p>
                  <p className="text-[#555] leading-relaxed mb-6 text-[15px]">The property's culinary offering — helmed by Michelin-starred Chef Elena Papadakis — draws from the rich tradition of Cycladic cuisine. Guests are welcomed with a private arrival by water taxi and assigned a dedicated host throughout their stay.</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {[{icon:Bed,l:"24 Suites"},{icon:Waves,l:"3 Pools"},{icon:Utensils,l:"2 Restaurants"},{icon:Award,l:"5 Star"}].map(({icon:Icon,l})=>(
                      <div key={l} className="bg-white rounded-xl p-3 card-shadow flex flex-col items-center gap-2 text-center">
                        <div className="w-9 h-9 rounded-full bg-[#F8F6F2] flex items-center justify-center"><Icon size={16} className="text-[#D4AF37]"/></div>
                        <span className="text-xs font-semibold text-[#333]">{l}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[IMG.room1, IMG.dining, IMG.spa].map((img,i)=>(
                      <button key={i} onClick={()=>{ setGalleryIdx(i+2); setLightbox(true) }} className="aspect-video rounded-xl overflow-hidden bg-[#F5F5F5] group">
                        <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {activeTab==="Rooms" && (
                <div className="space-y-4">
                  {ROOMS.map(room=>(
                    <div key={room.id} className={`bg-white rounded-2xl overflow-hidden card-shadow transition-all hover:card-shadow-hover ${!room.available?"opacity-60":""}`}>
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-52 h-44 md:h-auto flex-shrink-0 bg-[#F5F5F5] relative">
                          <img src={room.image} alt={room.name} className="w-full h-full object-cover"/>
                          {!room.available && <div className="absolute inset-0 bg-white/50 flex items-center justify-center"><span className="text-xs font-bold text-[#999] bg-white px-3 py-1 rounded-full">Unavailable</span></div>}
                        </div>
                        <div className="p-5 flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-[#111] text-lg">{room.name}</h3>
                              <div className="flex items-center gap-3 text-[#888] text-xs mt-1">
                                <span className="flex items-center gap-1"><Bed size={11}/>{room.size}</span>
                                <span className="flex items-center gap-1"><Users size={11}/>Up to {room.capacity}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-xl text-[#111]">${room.price.toLocaleString()}</div>
                              <div className="text-[#AAA] text-xs">per night</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {room.amenities.map(a=><span key={a} className="bg-[#F8F6F2] text-[#666] text-[11px] font-medium px-2 py-0.5 rounded-full">{a}</span>)}
                          </div>
                          {room.available ? <PrimaryBtn size="sm" onClick={()=>onNavigate("booking")}>Select This Room</PrimaryBtn>
                            : <span className="text-[#CCC] text-xs font-medium">Not available for selected dates</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab==="Amenities" && (
                <div className="space-y-6">
                  {amenityGroups.map(({label,items})=>(
                    <div key={label}>
                      <h4 className="font-bold text-[#111] mb-3 text-sm uppercase tracking-wider">{label}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {items.map(({icon:Icon,name})=>(
                          <div key={name} className="flex items-center gap-3 bg-white rounded-xl p-3.5 card-shadow">
                            <div className="w-9 h-9 rounded-full bg-[#FDF9EF] flex items-center justify-center flex-shrink-0"><Icon size={16} className="text-[#D4AF37]"/></div>
                            <span className="text-[13px] font-medium text-[#333] leading-tight">{name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab==="Reviews" && (
                <div>
                  <div className="flex items-center gap-6 mb-6 p-6 bg-white rounded-2xl card-shadow">
                    <div className="text-center flex-shrink-0">
                      <div className="font-serif text-5xl text-[#111]">4.97</div>
                      <StarRating rating={5} size={15}/>
                      <div className="text-[#AAA] text-xs mt-1">312 reviews</div>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[["Cleanliness",99],["Service",100],["Location",97],["Value",94],["Design",98]].map(([l,v])=>(
                        <div key={l as string} className="flex items-center gap-3">
                          <span className="text-xs text-[#888] w-20 flex-shrink-0">{l}</span>
                          <div className="flex-1 h-1.5 bg-[#F5F5F5] rounded-full overflow-hidden">
                            <div className="h-full bg-[#D4AF37] rounded-full transition-all" style={{width:`${v}%`}}/>
                          </div>
                          <span className="text-xs text-[#888] w-6 text-right">{((v as number)/20).toFixed(1)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {reviews.map(r=>(
                      <div key={r.name} className="bg-white rounded-2xl p-5 card-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-[#111] font-bold text-sm">{r.name[0]}</div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm text-[#111]">{r.name}</div>
                            <div className="text-[#AAA] text-xs">{r.role} · {r.date}</div>
                          </div>
                          <StarRating rating={r.rating} size={12}/>
                        </div>
                        <p className="text-[#555] text-sm leading-relaxed">{r.text}</p>
                      </div>
                    ))}
                    <button onClick={()=>toast("Loading more reviews","info")} className="w-full py-3 border-2 border-dashed border-[#E8E4DC] rounded-xl text-sm font-medium text-[#AAA] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors">
                      Load more reviews
                    </button>
                  </div>
                </div>
              )}
              {activeTab==="Map" && (
                <div className="relative rounded-2xl overflow-hidden bg-[#E8E4DC] h-64 flex items-center justify-center">
                  <img src={IMG.island} alt="Map" className="w-full h-full object-cover opacity-40"/>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center shadow-lg pulse-gold mb-3">
                      <MapPin size={20} className="text-[#111]"/>
                    </div>
                    <div className="bg-white rounded-xl px-4 py-2 card-shadow text-center">
                      <div className="font-semibold text-sm text-[#111]">Aurea Santorini</div>
                      <div className="text-xs text-[#888]">Oia, Santorini</div>
                    </div>
                  </div>
                  <button onClick={()=>window.open(`https://www.google.com/maps/search/?api=1&query=Aurea+Santorini`,"_blank")} className="absolute bottom-4 right-4 bg-white rounded-xl px-3 py-2 text-xs font-semibold text-[#111] card-shadow flex items-center gap-1.5 hover:bg-[#F8F6F2] transition-colors">
                    <ExternalLink size={12}/> Open in Maps
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Booking Card */}
          <div className="hidden md:block">
            <div className="sticky top-24 bg-white rounded-2xl p-6 card-shadow">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-bold text-2xl text-[#111]">$1,240</span>
                <span className="text-[#AAA] text-sm">/ night</span>
              </div>
              <div className="flex items-center gap-1 mb-4"><StarRating rating={5} size={12}/><span className="text-[#888] text-xs ml-1">4.97 (312)</span></div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="border-2 border-[#E8E4DC] rounded-xl p-3 hover:border-[#D4AF37] cursor-pointer transition-colors">
                  <div className="text-[9px] font-bold text-[#AAA] uppercase tracking-wider mb-1">Check In</div>
                  <div className="text-sm font-bold text-[#111]">Aug 15</div>
                </div>
                <div className="border-2 border-[#E8E4DC] rounded-xl p-3 hover:border-[#D4AF37] cursor-pointer transition-colors">
                  <div className="text-[9px] font-bold text-[#AAA] uppercase tracking-wider mb-1">Check Out</div>
                  <div className="text-sm font-bold text-[#111]">Aug 20</div>
                </div>
              </div>
              <div className="border-2 border-[#E8E4DC] rounded-xl p-3 mb-4 hover:border-[#D4AF37] cursor-pointer transition-colors">
                <div className="text-[9px] font-bold text-[#AAA] uppercase tracking-wider mb-1">Guests</div>
                <div className="text-sm font-bold text-[#111]">2 Adults</div>
              </div>
              <PrimaryBtn full size="lg" onClick={()=>onNavigate("booking")}>Reserve Now</PrimaryBtn>
              <p className="text-center text-xs text-[#AAA] mt-2">Free cancellation until Aug 10, 2026</p>
              <div className="border-t border-[#F5F5F5] mt-4 pt-4 space-y-2">
                {[["$1,240 × 5 nights","$6,200"],["Taxes & fees (12%)","$744"],["Service fee","$180"]].map(([l,v])=>(
                  <div key={l} className="flex justify-between text-sm"><span className="text-[#888]">{l}</span><span className="text-[#111]">{v}</span></div>
                ))}
                <div className="flex justify-between font-bold text-[#111] pt-2 border-t border-[#F5F5F5]">
                  <span>Total</span><span>$7,124</span>
                </div>
              </div>
              <button onClick={()=>{ toast("Added to wishlist","info") }} className="mt-4 w-full py-2.5 border border-[#E8E4DC] rounded-xl text-sm text-[#888] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors flex items-center justify-center gap-2">
                <Heart size={14}/> Save to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Reserve Bar */}
      <div className="fixed bottom-[60px] md:hidden left-0 right-0 bg-white border-t border-[#E8E4DC] px-6 py-3 flex items-center justify-between z-30">
        <div>
          <div className="font-bold text-lg text-[#111]">$1,240<span className="font-normal text-[#AAA] text-sm"> /night</span></div>
          <div className="text-[#3BA776] text-xs font-semibold">Free cancellation</div>
        </div>
        <PrimaryBtn onClick={()=>onNavigate("booking")}>Reserve Now</PrimaryBtn>
      </div>
    </div>
  )
}

// ─── Booking Page ─────────────────────────────────────────────────────────────
function BookingPage({ onNavigate, toast }: { onNavigate:(v:View)=>void; toast:(m:string,t?:Toast["type"])=>void }) {
  const [step, setStep] = useState(1)
  const [promo, setPromo] = useState(""); const [promoApplied, setPromoApplied] = useState(false)
  const [guests, setGuests] = useState(2); const [showCal, setShowCal] = useState(false)
  const [checkin, setCheckin] = useState<Date|null>(new Date(2026,7,15)); const [checkout, setCheckout] = useState<Date|null>(new Date(2026,7,20))
  const [specialReq, setSpecialReq] = useState("")
  const subtotal=6200, discount=promoApplied?1860:0, taxes=Math.round((subtotal-discount)*0.12), fee=180, total=subtotal-discount+taxes+fee
  const nights = checkin&&checkout ? Math.max(1,Math.round((checkout.getTime()-checkin.getTime())/(1000*60*60*24))) : 5
  const applyPromo=()=>{
    if(promo.toUpperCase()==="AUREA30"){ setPromoApplied(true); toast("30% discount applied! You save $1,860","success") }
    else toast("Invalid promo code","error")
  }
  return (
    <div className="bg-[#F8F6F2] min-h-screen pt-20 pb-32 md:pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="py-8">
          <button onClick={()=>onNavigate("hotel-detail")} className="flex items-center gap-2 text-[#888] text-sm mb-5 hover:text-[#111] transition-colors">
            <ArrowLeft size={15}/> Back to Hotel
          </button>
          <h1 className="font-serif text-3xl text-[#111]">Complete Your Booking</h1>
        </div>
        {/* Progress */}
        <div className="flex items-center gap-0 mb-8">
          {["Your Details","Stay Details","Review & Pay"].map((s,i)=>(
            <div key={s} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${i+1<=step?"gold-gradient text-[#111]":"bg-[#E8E4DC] text-[#AAA]"}`}>
                {i+1<step?<Check size={12}/>:i+1}
              </div>
              <div className="ml-2 hidden md:block">
                <div className={`text-[11px] font-bold ${i+1<=step?"text-[#111]":"text-[#BBB]"}`}>{s}</div>
              </div>
              {i<2&&<div className={`flex-1 h-px mx-3 ${i+1<step?"bg-[#D4AF37]":"bg-[#E8E4DC]"}`}/>}
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {/* Guest Info */}
            <div className="bg-white rounded-2xl p-6 card-shadow">
              <h3 className="font-bold text-[#111] mb-4">Guest Information</h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                {[["First Name","Alexandra"],["Last Name","Laurent"]].map(([l,v])=>(
                  <div key={l}>
                    <label className="block text-xs font-bold text-[#888] mb-1.5">{l}</label>
                    <input defaultValue={v} className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] text-sm outline-none focus:border-[#D4AF37] transition-colors"/>
                  </div>
                ))}
              </div>
              {[["Email Address","a.laurent@email.com","email"],["Phone Number","+33 6 12 34 56 78","tel"]].map(([l,v,t])=>(
                <div key={l} className="mb-3">
                  <label className="block text-xs font-bold text-[#888] mb-1.5">{l}</label>
                  <input defaultValue={v} type={t} className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] text-sm outline-none focus:border-[#D4AF37] transition-colors"/>
                </div>
              ))}
              <div>
                <label className="block text-xs font-bold text-[#888] mb-1.5">Special Requests <span className="text-[#CCC] font-normal">(optional)</span></label>
                <textarea rows={3} value={specialReq} onChange={e=>setSpecialReq(e.target.value)}
                  placeholder="Anniversary setup, dietary requirements, airport pickup time…"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] text-sm outline-none focus:border-[#D4AF37] transition-colors resize-none"/>
              </div>
            </div>
            {/* Stay Details */}
            <div className="bg-white rounded-2xl p-6 card-shadow">
              <h3 className="font-bold text-[#111] mb-4">Stay Details</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[[checkin,"Check In","3:00 PM"],[checkout,"Check Out","12:00 PM"]].map(([d,l,t])=>(
                  <div key={l as string} className="border-2 border-[#E8E4DC] rounded-xl p-3 hover:border-[#D4AF37] cursor-pointer transition-colors" onClick={()=>setShowCal(true)}>
                    <div className="text-[9px] font-bold text-[#AAA] uppercase tracking-wider mb-1">{l as string}</div>
                    <div className="font-bold text-[#111]">{d ? `${MONTHS[(d as Date).getMonth()].slice(0,3)} ${(d as Date).getDate()}, 2026` : "Select"}</div>
                    <div className="text-xs text-[#AAA]">{t as string}</div>
                  </div>
                ))}
              </div>
              {showCal && (
                <div className="mb-4 p-4 bg-[#F8F6F2] rounded-xl">
                  <MiniCalendar checkin={checkin} checkout={checkout} onChange={(ci,co)=>{ setCheckin(ci); setCheckout(co); if(co) setShowCal(false) }}/>
                </div>
              )}
              <div>
                <div className="text-xs font-bold text-[#888] mb-2">Number of Guests</div>
                <div className="flex items-center gap-4">
                  <button onClick={()=>setGuests(g=>Math.max(1,g-1))} className="w-9 h-9 rounded-full border-2 border-[#E8E4DC] flex items-center justify-center hover:border-[#111] transition-colors"><Minus size={14}/></button>
                  <span className="font-bold text-[#111] w-8 text-center text-lg">{guests}</span>
                  <button onClick={()=>setGuests(g=>Math.min(8,g+1))} className="w-9 h-9 rounded-full border-2 border-[#E8E4DC] flex items-center justify-center hover:border-[#111] transition-colors"><Plus size={14}/></button>
                  <span className="text-sm text-[#888]">Adults</span>
                </div>
              </div>
            </div>
            {/* Promo */}
            <div className="bg-white rounded-2xl p-6 card-shadow">
              <h3 className="font-bold text-[#111] mb-1">Promo Code</h3>
              <p className="text-xs text-[#AAA] mb-4">Try <span className="font-bold text-[#D4AF37]">AUREA30</span> for 30% off</p>
              <div className="flex gap-2">
                <input value={promo} onChange={e=>setPromo(e.target.value.toUpperCase())} placeholder="Enter promo code"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#E8E4DC] text-sm font-mono outline-none focus:border-[#D4AF37] transition-colors uppercase"/>
                <SecondaryBtn onClick={applyPromo}>Apply</SecondaryBtn>
              </div>
              {promoApplied && (
                <div className="flex items-center gap-2 mt-3 bg-[#3BA776]/10 text-[#3BA776] text-sm rounded-xl px-3 py-2">
                  <CheckCircle2 size={15}/> <span className="font-semibold">30% discount applied! You save $1,860.</span>
                </div>
              )}
            </div>
          </div>
          {/* Summary */}
          <div>
            <div className="bg-white rounded-2xl p-6 card-shadow sticky top-24">
              <h3 className="font-bold text-[#111] mb-4">Booking Summary</h3>
              <div className="flex gap-3 mb-4 pb-4 border-b border-[#F5F5F5]">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#F5F5F5]"><img src={IMG.pool} alt="" className="w-full h-full object-cover"/></div>
                <div>
                  <div className="font-bold text-sm text-[#111]">Aurea Santorini</div>
                  <div className="text-xs text-[#888]">Deluxe Suite</div>
                  <div className="flex items-center gap-1 mt-1"><Star size={10} className="fill-[#D4AF37] text-[#D4AF37]"/><span className="text-xs text-[#888]">4.97 · Oia, Greece</span></div>
                </div>
              </div>
              <div className="space-y-2 text-sm mb-5">
                <div className="flex justify-between"><span className="text-[#888]">$1,240 × {nights} nights</span><span>${(1240*nights).toLocaleString()}</span></div>
                {promoApplied&&<div className="flex justify-between text-[#3BA776]"><span>Promo (AUREA30)</span><span>−$1,860</span></div>}
                <div className="flex justify-between"><span className="text-[#888]">Taxes (12%)</span><span>${taxes.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-[#888]">Service fee</span><span>${fee}</span></div>
                <div className="flex justify-between font-bold text-[#111] pt-2 border-t border-[#F5F5F5] text-base"><span>Total</span><span>${total.toLocaleString()}</span></div>
              </div>
              <PrimaryBtn full onClick={()=>onNavigate("payment")}>Continue to Payment</PrimaryBtn>
              <div className="flex items-center justify-center gap-1.5 mt-3 text-[#CCC] text-xs"><Lock size={10}/> Secured by AUREA Pay</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Payment Page ─────────────────────────────────────────────────────────────
function PaymentPage({ onNavigate, toast }: { onNavigate:(v:View)=>void; toast:(m:string,t?:Toast["type"])=>void }) {
  const [method, setMethod] = useState("card")
  const [savedCard, setSavedCard] = useState(true)
  const [processing, setProcessing] = useState(false)
  const pay=()=>{
    setProcessing(true)
    setTimeout(()=>{ setProcessing(false); onNavigate("success") },1800)
  }
  const methods = [
    {id:"card",label:"Credit Card",icon:CreditCard},
    {id:"apple",label:"Apple Pay",icon:Phone},
    {id:"google",label:"Google Pay",icon:Globe},
    {id:"upi",label:"Bank Transfer",icon:ArrowUpRight},
  ]
  return (
    <div className="bg-[#F8F6F2] min-h-screen pt-20 pb-32 md:pb-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="py-8">
          <button onClick={()=>onNavigate("booking")} className="flex items-center gap-2 text-[#888] text-sm mb-5 hover:text-[#111] transition-colors"><ArrowLeft size={15}/>Back to Booking</button>
          <h1 className="font-serif text-3xl text-[#111]">Payment</h1>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl p-6 card-shadow">
              <h3 className="font-bold text-[#111] mb-4">Payment Method</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
                {methods.map(({id,label,icon:Icon})=>(
                  <button key={id} onClick={()=>setMethod(id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 text-xs font-bold transition-all ${method===id?"border-[#D4AF37] bg-[#FDF9EF] text-[#111]":"border-[#E8E4DC] text-[#888] hover:border-[#999]"}`}>
                    <Icon size={20} className={method===id?"text-[#D4AF37]":""}/>
                    {label}
                  </button>
                ))}
              </div>
              {method==="card" && (
                <div>
                  <label className="flex items-center gap-3 p-4 border-2 border-[#D4AF37] bg-[#FDF9EF] rounded-xl cursor-pointer mb-2">
                    <input type="radio" checked={savedCard} onChange={()=>setSavedCard(true)} className="accent-[#D4AF37]"/>
                    <CreditCard size={18} className="text-[#D4AF37]"/>
                    <div className="flex-1"><div className="text-sm font-bold text-[#111]">Visa •••• 4242</div><div className="text-xs text-[#888]">Expires 09/28</div></div>
                    <span className="text-[10px] bg-[#D4AF37]/15 text-[#D4AF37] font-bold px-2 py-0.5 rounded-full">Default</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border-2 border-[#E8E4DC] rounded-xl cursor-pointer mb-4">
                    <input type="radio" checked={!savedCard} onChange={()=>setSavedCard(false)} className="accent-[#D4AF37]"/>
                    <Plus size={18} className="text-[#AAA]"/>
                    <span className="text-sm text-[#888]">Add new card</span>
                  </label>
                  {!savedCard && (
                    <div className="space-y-3 p-4 bg-[#F8F6F2] rounded-xl">
                      <div><label className="block text-xs font-bold text-[#888] mb-1.5">Card Number</label>
                        <input placeholder="1234 5678 9012 3456" className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] bg-white text-sm outline-none focus:border-[#D4AF37] transition-colors font-mono"/></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="block text-xs font-bold text-[#888] mb-1.5">Expiry</label>
                          <input placeholder="MM / YY" className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] bg-white text-sm outline-none focus:border-[#D4AF37] transition-colors font-mono"/></div>
                        <div><label className="block text-xs font-bold text-[#888] mb-1.5">CVV</label>
                          <input type="password" placeholder="•••" className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] bg-white text-sm outline-none focus:border-[#D4AF37] transition-colors"/></div>
                      </div>
                      <div><label className="block text-xs font-bold text-[#888] mb-1.5">Name on Card</label>
                        <input placeholder="Alexandra Laurent" className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] bg-white text-sm outline-none focus:border-[#D4AF37] transition-colors"/></div>
                    </div>
                  )}
                </div>
              )}
              {(method==="apple"||method==="google") && (
                <div className="py-10 text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 ${method==="apple"?"bg-[#111]":"bg-white border-2 border-[#E8E4DC]"}`}>
                    {method==="apple"?<Phone size={28} className="text-white"/>:<Globe size={28} className="text-[#D4AF37]"/>}
                  </div>
                  <p className="text-[#888] text-sm">Tap "Pay Now" to authenticate with {method==="apple"?"Apple Pay":"Google Pay"}</p>
                </div>
              )}
              {method==="upi" && (
                <div className="p-4 bg-[#F8F6F2] rounded-xl space-y-3">
                  <div><label className="block text-xs font-bold text-[#888] mb-1.5">UPI ID</label>
                    <input placeholder="yourname@bank" className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] bg-white text-sm outline-none focus:border-[#D4AF37] transition-colors"/></div>
                </div>
              )}
            </div>
            {/* Billing */}
            <div className="bg-white rounded-2xl p-6 card-shadow">
              <h3 className="font-bold text-[#111] mb-4">Billing Address</h3>
              <div className="space-y-3">
                <div><label className="block text-xs font-bold text-[#888] mb-1.5">Country</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] text-sm text-[#111] outline-none focus:border-[#D4AF37]">
                    <option>France</option><option>United Kingdom</option><option>United States</option><option>Germany</option><option>Japan</option>
                  </select></div>
                <div><label className="block text-xs font-bold text-[#888] mb-1.5">Address</label>
                  <input defaultValue="12 Rue de la Paix" className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] text-sm outline-none focus:border-[#D4AF37] transition-colors"/></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-bold text-[#888] mb-1.5">City</label>
                    <input defaultValue="Paris" className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] text-sm outline-none focus:border-[#D4AF37] transition-colors"/></div>
                  <div><label className="block text-xs font-bold text-[#888] mb-1.5">Postal Code</label>
                    <input defaultValue="75001" className="w-full px-4 py-2.5 rounded-xl border border-[#E8E4DC] text-sm outline-none focus:border-[#D4AF37] transition-colors"/></div>
                </div>
              </div>
            </div>
          </div>
          {/* Payment Summary */}
          <div>
            <div className="bg-white rounded-2xl p-6 card-shadow sticky top-24">
              <h3 className="font-bold text-[#111] mb-4">Order Summary</h3>
              <div className="flex gap-3 mb-4 pb-4 border-b border-[#F5F5F5]">
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#F5F5F5]"><img src={IMG.pool} alt="" className="w-full h-full object-cover"/></div>
                <div><div className="font-bold text-sm text-[#111]">Aurea Santorini</div><div className="text-xs text-[#888]">Aug 15–20 · 2 Guests</div></div>
              </div>
              <div className="space-y-2 text-sm mb-5">
                <div className="flex justify-between"><span className="text-[#888]">Subtotal</span><span>$4,340</span></div>
                <div className="flex justify-between text-[#3BA776]"><span>Promo (AUREA30)</span><span>−$1,860</span></div>
                <div className="flex justify-between"><span className="text-[#888]">Taxes</span><span>$521</span></div>
                <div className="flex justify-between"><span className="text-[#888]">Service fee</span><span>$180</span></div>
                <div className="flex justify-between font-bold text-[#111] pt-2 border-t border-[#F5F5F5] text-base"><span>Total Due</span><span>$5,041</span></div>
              </div>
              <PrimaryBtn full size="lg" onClick={pay} disabled={processing}>
                {processing ? <span className="flex items-center justify-center gap-2"><RefreshCw size={15} className="animate-spin"/>Processing…</span> : "Pay $5,041"}
              </PrimaryBtn>
              <div className="flex items-center justify-center gap-4 mt-3">
                <div className="flex items-center gap-1 text-[#CCC] text-[10px]"><Lock size={9}/> 256-bit SSL</div>
                <div className="flex items-center gap-1 text-[#CCC] text-[10px]"><Shield size={9}/> PCI Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Booking Success ──────────────────────────────────────────────────────────
function SuccessPage({ onNavigate, toast }: { onNavigate:(v:View)=>void; toast:(m:string,t?:Toast["type"])=>void }) {
  return (
    <div className="bg-[#F8F6F2] min-h-screen pt-20 flex items-center justify-center px-6 pb-28 md:pb-8">
      <div className="max-w-md w-full text-center">
        <div className="relative w-28 h-28 mx-auto mb-8">
          <div className="absolute inset-0 gold-gradient rounded-full opacity-15 pulse-gold"/>
          <div className="absolute inset-2 gold-gradient rounded-full opacity-25"/>
          <div className="absolute inset-4 gold-gradient rounded-full flex items-center justify-center shadow-lg">
            <Check size={32} className="text-[#111]" strokeWidth={3}/>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-10 h-px bg-[#D4AF37]"/>
          <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em]">Booking Confirmed</span>
          <div className="w-10 h-px bg-[#D4AF37]"/>
        </div>
        <h1 className="font-serif text-4xl text-[#111] mb-3">Your Escape Awaits</h1>
        <p className="text-[#888] text-sm leading-relaxed mb-8">Your reservation at Aurea Santorini is confirmed. A personalised welcome from your dedicated host will arrive within 24 hours.</p>
        <div className="bg-white rounded-2xl p-6 card-shadow text-left mb-5">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#F5F5F5]">
            <div>
              <div className="text-[10px] font-bold text-[#AAA] uppercase tracking-wider mb-1">Booking Reference</div>
              <div className="font-bold text-[#111] text-xl tracking-widest">#AUR-2026-08142</div>
            </div>
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F5F5F5]"><img src={IMG.pool} alt="" className="w-full h-full object-cover"/></div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[["Hotel","Aurea Santorini"],["Room","Deluxe Suite"],["Check In","Aug 15, 2026"],["Check Out","Aug 20, 2026"],["Guests","2 Adults"],["Total Paid","$5,041"]].map(([l,v])=>(
              <div key={l}>
                <div className="text-[#AAA] text-xs mb-0.5">{l}</div>
                <div className={`font-bold ${l==="Total Paid"?"text-[#D4AF37]":"text-[#111]"}`}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mb-3">
          <button onClick={()=>toast("Invoice download isn't available in this demo","info")} className="flex-1 flex items-center justify-center gap-1.5 py-3 border-2 border-[#E8E4DC] rounded-full text-sm font-semibold text-[#666] hover:border-[#111] hover:text-[#111] transition-all">
            <Download size={14}/> Invoice
          </button>
          <button onClick={()=>onNavigate("trips")} className="flex-1 flex items-center justify-center gap-1.5 py-3 border-2 border-[#E8E4DC] rounded-full text-sm font-semibold text-[#666] hover:border-[#111] hover:text-[#111] transition-all">
            <Plane size={14}/> My Trips
          </button>
        </div>
        <PrimaryBtn full size="lg" onClick={()=>onNavigate("landing")}>Back to AUREA</PrimaryBtn>
      </div>
    </div>
  )
}

// ─── Notifications ────────────────────────────────────────────────────────────
type Notif = { id:number; title:string; body:string; time:string; read:boolean; type:"booking"|"offer"|"review"|"system" }
const initNotifs: Notif[] = [
  {id:1,title:"Booking Confirmed",body:"Your reservation at Aurea Santorini has been confirmed. Check-in: Aug 15, 2026.",time:"2 min ago",read:false,type:"booking"},
  {id:2,title:"Exclusive Offer",body:"30% off Maldives overwater villas this week only. 6 rooms remaining.",time:"1 hr ago",read:false,type:"offer"},
  {id:3,title:"New Review Response",body:"The Aurea Bali team has responded to your review. Thank you for staying with us.",time:"3 hrs ago",read:false,type:"review"},
  {id:4,title:"Loyalty Milestone",body:"Congratulations! You've reached 12,000 Gold Points — enough for a complimentary upgrade.",time:"Yesterday",read:true,type:"system"},
  {id:5,title:"Check-out Reminder",body:"Your stay at Aurea Bali ends tomorrow at 12:00 PM. Need a late check-out?",time:"2 days ago",read:true,type:"booking"},
  {id:6,title:"New Collection: Japan",body:"Discover 8 new ryokan properties added to our Japan collection.",time:"3 days ago",read:true,type:"offer"},
]
function NotificationsPage({ onNavigate }: { onNavigate:(v:View)=>void }) {
  const [notifs, setNotifs] = useState(initNotifs)
  const [filter, setFilter] = useState("All")
  const filters = ["All","Bookings","Offers","Reviews"]
  const markAll=()=>setNotifs(n=>n.map(x=>({...x,read:true})))
  const markOne=(id:number)=>setNotifs(n=>n.map(x=>x.id===id?{...x,read:true}:x))
  const del=(id:number)=>setNotifs(n=>n.filter(x=>x.id!==id))
  const visible = notifs.filter(n=>filter==="All"||(filter==="Bookings"&&n.type==="booking")||(filter==="Offers"&&n.type==="offer")||(filter==="Reviews"&&n.type==="review"))
  const typeIcon = (t:Notif["type"]) => {
    if(t==="booking") return <Plane size={14} className="text-[#D4AF37]"/>
    if(t==="offer")   return <Tag size={14} className="text-[#3BA776]"/>
    if(t==="review")  return <Star size={14} className="text-[#D4AF37]"/>
    return <Bell size={14} className="text-[#888]"/>
  }
  return (
    <div className="bg-[#F8F6F2] min-h-screen pt-20 pb-28 md:pb-8">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl text-[#111]">Notifications</h1>
            <p className="text-[#888] text-sm">{notifs.filter(n=>!n.read).length} unread</p>
          </div>
          <button onClick={markAll} className="text-xs font-semibold text-[#D4AF37] hover:opacity-80 transition-opacity">Mark all read</button>
        </div>
        <div className="flex gap-2 mb-6">
          {filters.map(f=><CategoryChip key={f} label={f} active={filter===f} onClick={()=>setFilter(f)}/>)}
        </div>
        {visible.length===0 ? (
          <div className="text-center py-20">
            <BellRing size={48} className="text-[#E8E4DC] mx-auto mb-4"/>
            <h3 className="font-semibold text-[#111] mb-2">All caught up</h3>
            <p className="text-[#888] text-sm">No notifications in this category</p>
          </div>
        ) : (
          <div className="space-y-2">
            {visible.map(n=>(
              <div key={n.id} onClick={()=>markOne(n.id)}
                className={`bg-white rounded-2xl p-4 card-shadow cursor-pointer hover:card-shadow-hover transition-all duration-200 ${!n.read?"border-l-2 border-[#D4AF37]":""}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${n.read?"bg-[#F5F5F5]":"bg-[#FDF9EF]"}`}>
                    {typeIcon(n.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className={`text-sm font-bold ${n.read?"text-[#666]":"text-[#111]"}`}>{n.title}</div>
                      <button onClick={e=>{e.stopPropagation();del(n.id)}} className="text-[#DDD] hover:text-[#999] transition-colors flex-shrink-0 mt-0.5"><X size={13}/></button>
                    </div>
                    <p className={`text-xs leading-relaxed mt-0.5 ${n.read?"text-[#AAA]":"text-[#666]"}`}>{n.body}</p>
                    <div className="text-[10px] text-[#CCC] mt-1.5 flex items-center gap-1"><Clock size={9}/>{n.time}</div>
                  </div>
                  {!n.read && <div className="w-2 h-2 rounded-full bg-[#D4AF37] flex-shrink-0 mt-2"/>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Profile Page ─────────────────────────────────────────────────────────────
function ProfilePage({ onNavigate, toast }: { onNavigate:(v:View)=>void; toast:(msg:string, type?: "success"|"info"|"error")=>void }) {
  const recentStays = [
    {name:"Aurea Bali",dates:"Jun 2026",img:IMG.spa,rating:5},
    {name:"Aurea Maldives",dates:"Mar 2026",img:IMG.coastal,rating:5},
    {name:"Aurea Kyoto",dates:"Jan 2026",img:IMG.lobby,rating:4},
  ]
  const menuGroups = [
    {label:"Account",items:[
      {icon:User,label:"Personal Information",action:()=>toast("Personal information editing is coming soon","info")},
      {icon:CreditCard,label:"Payment Methods",action:()=>toast("Payment methods management is coming soon","info")},
      {icon:Shield,label:"Privacy & Security",action:()=>toast("Privacy & security settings are coming soon","info")},
    ]},
    {label:"Travel",items:[
      {icon:BookOpen,label:"My Trips",action:()=>onNavigate("trips")},
      {icon:Heart,label:"Wishlist",action:()=>onNavigate("wishlist")},
      {icon:Award,label:"Loyalty & Rewards",action:()=>toast("Loyalty & rewards details are coming soon","info")},
    ]},
    {label:"Support",items:[
      {icon:MessageSquare,label:"Help Center",action:()=>toast("Help Center is coming soon","info")},
      {icon:Phone,label:"Contact Concierge",action:()=>toast("Your concierge request has been sent","success")},
      {icon:Settings,label:"App Settings",action:()=>toast("App settings are coming soon","info")},
      {icon:LogOut,label:"Sign Out",danger:true,action:()=>{ toast("You've been signed out","info"); onNavigate("welcome") }},
    ]},
  ]
  return (
    <div className="bg-[#F8F6F2] min-h-screen pt-20 pb-32 md:pb-8">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Gold Member Card */}
        <div className="relative overflow-hidden rounded-3xl p-6 mb-5" style={{background:"linear-gradient(135deg,#111 0%,#1e1a0a 60%,#111 100%)"}}>
          <div className="absolute inset-0 opacity-10"><img src={IMG.lobby} alt="" className="w-full h-full object-cover"/></div>
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/10"/>
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1.5 bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-bold px-3 py-1 rounded-full">
              <Award size={10}/> Gold Member
            </div>
          </div>
          <div className="relative z-10 flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center text-[#111] font-bold text-2xl font-serif">A</div>
              <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/50"/>
            </div>
            <div>
              <div className="text-white font-bold text-xl">Alexandra Laurent</div>
              <div className="text-white/40 text-xs mt-0.5">a.laurent@email.com</div>
              <div className="text-white/30 text-[10px] mt-1">Member since January 2022</div>
            </div>
          </div>
          <div className="relative z-10 grid grid-cols-4 gap-3 border-t border-white/10 pt-5">
            {[{v:"18",l:"Countries"},{v:"34",l:"Stays"},{v:"12,450",l:"Points"},{v:"Gold",l:"Tier"}].map(({v,l})=>(
              <div key={l} className="text-center">
                <div className="text-[#D4AF37] font-bold text-lg">{v}</div>
                <div className="text-white/30 text-[10px] font-medium uppercase tracking-wide mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Points Progress */}
        <div className="bg-white rounded-2xl p-5 card-shadow mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-bold text-[#111]">Points to Platinum</div>
            <div className="text-xs text-[#D4AF37] font-bold">2,550 more</div>
          </div>
          <div className="h-2 bg-[#F5F5F5] rounded-full overflow-hidden mb-2">
            <div className="h-full rounded-full gold-gradient" style={{width:"83%"}}/>
          </div>
          <div className="flex justify-between text-[10px] text-[#AAA]"><span>12,450 pts</span><span>15,000 pts</span></div>
        </div>
        {/* Recent Stays */}
        <div className="bg-white rounded-2xl p-5 card-shadow mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#111]">Recent Stays</h3>
            <button onClick={()=>onNavigate("trips")} className="text-xs text-[#D4AF37] font-bold hover:opacity-80">View all</button>
          </div>
          <div className="space-y-3">
            {recentStays.map(s=>(
              <div key={s.name} className="flex items-center gap-3 py-1">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[#F5F5F5]"><img src={s.img} alt={s.name} className="w-full h-full object-cover"/></div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-[#111]">{s.name}</div>
                  <div className="text-xs text-[#AAA]">{s.dates}</div>
                </div>
                <StarRating rating={s.rating} size={11}/>
              </div>
            ))}
          </div>
        </div>
        {/* Menu Groups */}
        {menuGroups.map(({label,items})=>(
          <div key={label} className="bg-white rounded-2xl card-shadow overflow-hidden mb-3">
            <div className="px-5 py-3 border-b border-[#F8F6F2]">
              <span className="text-[10px] font-bold text-[#CCC] uppercase tracking-[0.2em]">{label}</span>
            </div>
            {items.map(({icon:Icon,label:il,danger,action},i)=>(
              <button key={il} onClick={action}
                className={`w-full flex items-center gap-3 px-5 py-4 text-sm font-semibold transition-colors hover:bg-[#F8F6F2] ${i<items.length-1?"border-b border-[#F5F5F5]":""} ${danger?"text-red-500":"text-[#333]"}`}>
                <Icon size={17} className={danger?"text-red-400":"text-[#AAA]"}/>
                <span className="flex-1 text-left">{il}</span>
                {!danger&&<ChevronRight size={14} className="text-[#DDD]"/>}
              </button>
            ))}
          </div>
        ))}
        <div className="text-center text-[#CCC] text-xs mt-4">AUREA v3.2.0 · Build 2026.08</div>
      </div>
    </div>
  )
}

// ─── Wishlist ──────────────────────────────────────────────────────────────────
function WishlistPage({ onNavigate, hotels, onToggleLike }: {
  onNavigate:(v:View)=>void; hotels:typeof HOTELS; onToggleLike:(id:number)=>void
}) {
  const liked = hotels.filter(h=>h.liked)
  return (
    <div className="bg-[#F8F6F2] min-h-screen pt-20 pb-32 md:pb-8">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-4xl text-[#111] mb-1">Wishlist</h1>
            <p className="text-[#888] text-sm">{liked.length} saved {liked.length===1?"property":"properties"}</p>
          </div>
          {liked.length>0 && <SecondaryBtn onClick={()=>onNavigate("hotels")}>Discover More</SecondaryBtn>}
        </div>
        {liked.length===0 ? (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-full bg-white card-shadow mx-auto flex items-center justify-center mb-5"><Heart size={32} className="text-[#E8E4DC]"/></div>
            <h3 className="font-bold text-[#111] text-xl mb-2">Your wishlist is empty</h3>
            <p className="text-[#888] text-sm mb-6 max-w-xs mx-auto">Tap the heart on any property to save it here for later</p>
            <PrimaryBtn onClick={()=>onNavigate("hotels")}>Explore Properties</PrimaryBtn>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {liked.map(h=><HotelCard key={h.id} hotel={h} onView={()=>onNavigate("hotel-detail")} onToggleLike={()=>onToggleLike(h.id)}/>)}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── My Trips ─────────────────────────────────────────────────────────────────
function TripsPage({ onNavigate, toast }: { onNavigate:(v:View)=>void; toast:(m:string,t?:Toast["type"])=>void }) {
  const [activeTab, setActiveTab] = useState("Upcoming")
  const trips = {
    Upcoming:[{id:"AUR-2026-08142",name:"Aurea Santorini",location:"Oia, Greece",checkin:"Aug 15",checkout:"Aug 20",guests:2,nights:5,total:5041,img:IMG.pool,status:"Confirmed"}],
    Past:[
      {id:"AUR-2026-06321",name:"Aurea Bali",location:"Ubud, Indonesia",checkin:"Jun 2",checkout:"Jun 8",guests:2,nights:6,total:4440,img:IMG.spa,status:"Completed"},
      {id:"AUR-2026-03111",name:"Aurea Maldives",location:"North Malé Atoll",checkin:"Mar 10",checkout:"Mar 15",guests:2,nights:5,total:10750,img:IMG.coastal,status:"Completed"},
    ],
    Cancelled:[],
  }
  const current = trips[activeTab as keyof typeof trips]||[]
  return (
    <div className="bg-[#F8F6F2] min-h-screen pt-20 pb-32 md:pb-8">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <h1 className="font-serif text-4xl text-[#111] mb-6">My Trips</h1>
        <div className="flex border-b border-[#E8E4DC] mb-6">
          {Object.keys(trips).map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-bold border-b-2 -mb-px transition-all ${activeTab===tab?"border-[#D4AF37] text-[#111]":"border-transparent text-[#AAA] hover:text-[#666]"}`}>
              {tab} {trips[tab as keyof typeof trips].length>0&&<span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${activeTab===tab?"bg-[#D4AF37] text-[#111]":"bg-[#E8E4DC] text-[#888]"}`}>{trips[tab as keyof typeof trips].length}</span>}
            </button>
          ))}
        </div>
        {current.length===0 ? (
          <div className="text-center py-20">
            <Plane size={48} className="text-[#E8E4DC] mx-auto mb-4"/>
            <h3 className="font-bold text-[#111] mb-2">No {activeTab.toLowerCase()} trips</h3>
            <p className="text-[#888] text-sm mb-5">Ready for your next adventure?</p>
            <SecondaryBtn onClick={()=>onNavigate("hotels")}>Explore Hotels</SecondaryBtn>
          </div>
        ) : (
          <div className="space-y-4">
            {current.map(trip=>(
              <div key={trip.id} className="bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all">
                <div className="h-44 relative bg-[#F5F5F5]">
                  <img src={trip.img} alt={trip.name} className="w-full h-full object-cover"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111]/65 to-transparent"/>
                  <div className="absolute bottom-4 left-5 text-white">
                    <div className="font-bold text-lg leading-tight">{trip.name}</div>
                    <div className="text-white/60 text-xs flex items-center gap-1 mt-0.5"><MapPin size={10}/>{trip.location}</div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${trip.status==="Confirmed"?"bg-[#3BA776] text-white":"glass-dark text-white"}`}>{trip.status}</span>
                  </div>
                  <div className="absolute top-3 left-3 glass text-white text-[10px] font-bold px-2 py-1 rounded-full">#{trip.id}</div>
                </div>
                <div className="p-5">
                  <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                    {[[trip.checkin,"Check In"],[trip.checkout,"Check Out"],[`${trip.nights} nights`,"Duration"],[`$${trip.total.toLocaleString()}`,"Total"]].map(([v,l])=>(
                      <div key={l as string}>
                        <div className="text-[#AAA] text-[10px] mb-0.5">{l}</div>
                        <div className={`font-bold ${l==="Total"?"text-[#D4AF37]":"text-[#111]"}`}>{v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={()=>toast("Invoice download isn't available in this demo","info")} className="flex-1 py-2.5 rounded-xl border border-[#E8E4DC] text-xs font-bold text-[#666] hover:border-[#111] hover:text-[#111] transition-colors flex items-center justify-center gap-1.5">
                      <Download size={12}/>Invoice
                    </button>
                    {trip.status==="Completed"&&(
                      <button onClick={()=>toast("Thanks — review submission is coming soon","info")} className="flex-1 py-2.5 rounded-xl border border-[#E8E4DC] text-xs font-bold text-[#666] hover:border-[#111] hover:text-[#111] transition-colors flex items-center justify-center gap-1.5">
                        <Star size={12}/>Review
                      </button>
                    )}
                    {trip.status==="Confirmed"&&(
                      <button onClick={()=>toast("Booking management is coming soon","info")} className="flex-1 py-2.5 rounded-xl bg-[#111] text-white text-xs font-bold hover:bg-[#333] transition-colors">Manage</button>
                    )}
                    <button onClick={()=>{ navigator.clipboard?.writeText(`${trip.name} — ${trip.checkin} to ${trip.checkout}`); toast("Trip details copied to clipboard","success") }} className="flex-1 py-2.5 rounded-xl border border-[#E8E4DC] text-xs font-bold text-[#666] hover:border-[#111] hover:text-[#111] transition-colors flex items-center justify-center gap-1.5">
                      <Share2 size={12}/>Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Admin Dashboard ───────────────────────────────────────────────────────────
function AdminDashboard({ onNavigate, toast }: { onNavigate:(v:View)=>void; toast:(m:string,t?:Toast["type"])=>void }) {
  const [sidebar, setSidebar] = useState("Overview")
  const [period, setPeriod] = useState("30d")
  const [adminPage, setAdminPage] = useState(1)
  const sidebarItems = [
    {icon:LayoutDashboard,label:"Overview"},
    {icon:Hotel,label:"Hotels"},
    {icon:BookOpen,label:"Bookings"},
    {icon:Users2,label:"Guests"},
    {icon:DollarSign,label:"Revenue"},
    {icon:Star,label:"Reviews"},
    {icon:Settings,label:"Settings"},
  ]
  const kpis = [
    {l:"Total Revenue",v:"$2.4M",c:"+18.4%",up:true,icon:DollarSign,clr:"#D4AF37"},
    {l:"Bookings",v:"1,284",c:"+9.2%",up:true,icon:BookOpen,clr:"#3BA776"},
    {l:"Active Hotels",v:"47",c:"+3",up:true,icon:Hotel,clr:"#111111"},
    {l:"Avg Rating",v:"4.94",c:"+0.02",up:true,icon:Star,clr:"#D4AF37"},
    {l:"Occupancy",v:"87.3%",c:"+4.1%",up:true,icon:Bed,clr:"#3BA776"},
    {l:"New Guests",v:"3,241",c:"+22%",up:true,icon:Users2,clr:"#111111"},
    {l:"Avg Stay",v:"4.2 nights",c:"+0.3",up:true,icon:Clock,clr:"#D4AF37"},
    {l:"Cancellations",v:"2.1%",c:"-0.8%",up:true,icon:XCircle,clr:"#3BA776"},
  ]
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"]
  const revData = [180,220,195,280,310,265,390,420]
  const bookData = [120,155,138,200,230,185,285,310]
  const maxRev = Math.max(...revData)
  const bookings = [
    {id:"#AUR-2026-08142",guest:"Alexandra L.",hotel:"Aurea Santorini",checkin:"Aug 15",amount:"$5,041",status:"Confirmed"},
    {id:"#AUR-2026-08139",guest:"James W.",hotel:"Aurea Maldives",checkin:"Aug 18",amount:"$10,750",status:"Pending"},
    {id:"#AUR-2026-08127",guest:"Mei Ling C.",hotel:"Aurea Bali",checkin:"Aug 22",amount:"$4,440",status:"Confirmed"},
    {id:"#AUR-2026-08115",guest:"Pierre Dupont",hotel:"Aurea Amalfi",checkin:"Sep 1",amount:"$8,400",status:"Confirmed"},
    {id:"#AUR-2026-08102",guest:"Sophie M.",hotel:"Aurea Kyoto",checkin:"Sep 5",amount:"$3,560",status:"Cancelled"},
  ]
  const topHotels = [
    {name:"Aurea Santorini",bookings:342,revenue:"$424K",rating:4.97,occ:"91%"},
    {name:"Aurea Maldives",bookings:187,revenue:"$402K",rating:4.99,occ:"88%"},
    {name:"Aurea Amalfi",bookings:263,revenue:"$443K",rating:4.95,occ:"85%"},
    {name:"Aurea Bali",bookings:519,revenue:"$385K",rating:4.91,occ:"94%"},
    {name:"Aurea Kyoto",bookings:428,revenue:"$381K",rating:4.93,occ:"82%"},
  ]
  const sc = (s:string) => s==="Confirmed"?"bg-[#3BA776]/10 text-[#3BA776]":s==="Pending"?"bg-[#D4AF37]/10 text-[#D4AF37]":"bg-red-50 text-red-500"

  return (
    <div className="bg-[#F5F5F5] min-h-screen flex pt-16">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-[#E8E4DC] fixed left-0 top-16 bottom-0 z-30">
        <div className="px-5 py-4 border-b border-[#F5F5F5]">
          <div className="text-[10px] font-bold text-[#CCC] uppercase tracking-[0.25em]">Admin Console</div>
        </div>
        <nav className="flex-1 p-3 overflow-y-auto">
          {sidebarItems.map(({icon:Icon,label})=>(
            <button key={label} onClick={()=>{ setSidebar(label); if(label!=="Overview") toast(`${label} section is coming soon — showing Overview for now`,"info") }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all mb-1 ${sidebar===label?"bg-[#111] text-white":"text-[#666] hover:bg-[#F8F6F2] hover:text-[#111]"}`}>
              <Icon size={16}/>{label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[#F5F5F5]">
          <button onClick={()=>onNavigate("landing")} className="flex items-center gap-2 text-xs text-[#AAA] hover:text-[#111] transition-colors w-full">
            <ArrowLeft size={13}/>Return to Site
          </button>
        </div>
      </aside>
      {/* Main */}
      <main className="flex-1 md:ml-60 overflow-auto">
        <div className="px-6 py-6 max-w-[1400px]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-serif text-3xl text-[#111]">Dashboard</h1>
              <p className="text-[#888] text-sm">August 6, 2026 · All 47 Properties</p>
            </div>
            <div className="flex items-center gap-2">
              {["7d","30d","90d","1y"].map(p=>(
                <button key={p} onClick={()=>setPeriod(p)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${period===p?"bg-[#111] text-white":"bg-white text-[#888] border border-[#E8E4DC] hover:border-[#999]"}`}>
                  {p}
                </button>
              ))}
              <button onClick={()=>toast("No new admin notifications","info")} className="w-9 h-9 rounded-xl bg-white border border-[#E8E4DC] flex items-center justify-center hover:border-[#999] transition-colors ml-1">
                <Bell size={15} className="text-[#666]"/>
              </button>
            </div>
          </div>
          {/* KPI Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {kpis.slice(0,8).map(({l,v,c,up,icon:Icon,clr})=>(
              <div key={l} className="bg-white rounded-2xl p-4 card-shadow hover:card-shadow-hover transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{backgroundColor:`${clr}18`}}>
                    <Icon size={15} style={{color:clr}}/>
                  </div>
                  <span className={`text-[10px] font-bold ${up?"text-[#3BA776]":"text-red-500"}`}>{up?"↑":"↓"} {c}</span>
                </div>
                <div className="font-bold text-xl text-[#111] mb-0.5">{v}</div>
                <div className="text-[#AAA] text-xs">{l}</div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-5">
            {/* Revenue Chart */}
            <div className="md:col-span-2 bg-white rounded-2xl p-6 card-shadow">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-bold text-[#111]">Revenue & Bookings</h3>
                  <p className="text-[#AAA] text-xs mt-0.5">Monthly performance 2026</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-1.5 rounded-full gold-gradient"/><span className="text-[#888]">Revenue</span></div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-1.5 rounded-full bg-[#3BA776]"/><span className="text-[#888]">Bookings</span></div>
                </div>
              </div>
              <div className="flex items-end gap-1.5 h-44 px-2">
                {months.map((m,i)=>(
                  <div key={m} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex items-end gap-0.5" style={{height:"160px"}}>
                      <div className="flex-1 rounded-t-md transition-all duration-500" style={{
                        height:`${(revData[i]/maxRev)*100}%`,
                        background:i===months.length-1?"linear-gradient(180deg,#D4AF37,#F0D060)":"#F5F5F5"
                      }}/>
                      <div className="flex-1 rounded-t-md transition-all duration-500 bg-[#3BA776]/20" style={{height:`${(bookData[i]/Math.max(...bookData))*100}%`}}/>
                    </div>
                    <span className="text-[10px] text-[#CCC] mt-1">{m}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Top Hotels */}
            <div className="bg-white rounded-2xl p-5 card-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#111]">Top Properties</h3>
                <span className="text-[10px] text-[#AAA] font-medium">By Revenue</span>
              </div>
              <div className="space-y-3">
                {topHotels.map((h,i)=>(
                  <div key={h.name} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${i===0?"gold-gradient text-[#111]":"bg-[#F5F5F5] text-[#AAA]"}`}>{i+1}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold text-[#111] truncate">{h.name}</div>
                      <div className="text-[10px] text-[#AAA]">{h.bookings} bookings · {h.occ} occ.</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold text-[#111]">{h.revenue}</div>
                      <div className="flex items-center gap-0.5 justify-end"><Star size={9} className="fill-[#D4AF37] text-[#D4AF37]"/><span className="text-[10px] text-[#AAA]">{h.rating}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Bookings Table */}
          <div className="bg-white rounded-2xl card-shadow overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#F5F5F5]">
              <h3 className="font-bold text-[#111]">Recent Bookings</h3>
              <div className="flex items-center gap-2">
                <button onClick={()=>toast("Filter options are coming soon","info")} className="px-3 py-1.5 text-xs font-semibold text-[#888] bg-[#F5F5F5] rounded-full hover:bg-[#E8E4DC] transition-colors flex items-center gap-1.5"><Filter size={11}/> Filter</button>
                <button onClick={()=>toast("Full bookings list is coming soon","info")} className="text-xs font-bold text-[#D4AF37] hover:opacity-80 transition-opacity">View all</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#F5F5F5]">
                    {["Booking ID","Guest","Property","Check In","Amount","Status","Actions"].map(h=>(
                      <th key={h} className="px-5 py-3 text-left text-[10px] font-bold text-[#BBB] uppercase tracking-wider whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b,i)=>(
                    <tr key={b.id} className={`hover:bg-[#F8F6F2] transition-colors ${i<bookings.length-1?"border-b border-[#F9F9F9]":""}`}>
                      <td className="px-5 py-3.5 font-mono text-xs text-[#888]">{b.id}</td>
                      <td className="px-5 py-3.5 font-semibold text-[#111]">{b.guest}</td>
                      <td className="px-5 py-3.5 text-[#666]">{b.hotel}</td>
                      <td className="px-5 py-3.5 text-[#666]">{b.checkin}</td>
                      <td className="px-5 py-3.5 font-bold text-[#111]">{b.amount}</td>
                      <td className="px-5 py-3.5"><span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${sc(b.status)}`}>{b.status}</span></td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1">
                          <button onClick={()=>toast(`Viewing booking ${b.id}`,"info")} className="w-7 h-7 rounded-lg hover:bg-[#F5F5F5] flex items-center justify-center transition-colors"><Eye size={13} className="text-[#AAA]"/></button>
                          <button onClick={()=>toast(`Editing booking ${b.id} is coming soon`,"info")} className="w-7 h-7 rounded-lg hover:bg-[#F5F5F5] flex items-center justify-center transition-colors"><Edit3 size={13} className="text-[#AAA]"/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between px-6 py-3 border-t border-[#F5F5F5]">
              <span className="text-xs text-[#AAA]">Showing 5 of 1,284 bookings</span>
              <div className="flex items-center gap-1">
                {[1,2,3,"…",128].map((p,i)=>(
                  <button key={i} onClick={()=>typeof p==="number" ? setAdminPage(p) : toast("Jump to page is coming soon","info")} className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${p===adminPage?"bg-[#111] text-white":"text-[#888] hover:bg-[#F5F5F5]"}`}>{p}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// ─── App Root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [view, setView] = useState<View>("welcome")
  const [hotels, setHotels] = useState(HOTELS)
  const { toasts, add: addToast } = useToast()
  const [notifs, setNotifs] = useState(initNotifs)
  const unreadCount = notifs.filter(n=>!n.read).length

  const navigate = (v: View) => {
    setView(v)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const toggleLike = (id: number) => {
    const hotel = hotels.find(h=>h.id===id)
    setHotels(prev=>prev.map(h=>h.id===id?{...h,liked:!h.liked}:h))
    if (hotel) addToast(hotel.liked?"Removed from wishlist":"Saved to wishlist","info")
  }

  const isAdmin = view==="admin"
  const isAuth = ["splash","welcome","signin","signup"].includes(view)
  const showNav = !isAdmin && !isAuth

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      <ToastContainer toasts={toasts}/>
      {showSplash && <SplashScreen onDone={()=>setShowSplash(false)}/>}
      {!showSplash && (
        <>
          {isAdmin && (
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E8E4DC] h-16 flex items-center px-6 justify-between">
              <div className="flex items-center gap-3">
                <button onClick={()=>navigate("landing")} className="font-serif text-[20px] font-bold text-[#111]">AUREA</button>
                <span className="text-[10px] font-bold text-[#CCC] uppercase tracking-[0.25em]">Admin</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={()=>addToast("No new admin notifications","info")} className="w-8 h-8 rounded-xl bg-[#F5F5F5] flex items-center justify-center hover:bg-[#E8E4DC] transition-colors"><Bell size={15} className="text-[#666]"/></button>
                <button onClick={()=>navigate("profile")} className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-[#111] font-bold text-xs">A</button>
              </div>
            </nav>
          )}
          {showNav && <TopNav view={view} onNavigate={navigate} notifCount={unreadCount}/>}

          {view==="welcome"      && <WelcomeScreen onNavigate={navigate}/>}
          {view==="signin"       && <SignInScreen onNavigate={navigate} toast={addToast}/>}
          {view==="signup"       && <SignUpScreen onNavigate={navigate} toast={addToast}/>}
          {view==="landing"      && <LandingPage onNavigate={navigate} hotels={hotels} onToggleLike={toggleLike} toast={addToast}/>}
          {view==="hotels"       && <HotelsPage onNavigate={navigate} hotels={hotels} onToggleLike={toggleLike}/>}
          {view==="hotel-detail" && <HotelDetailPage onNavigate={navigate} toast={addToast}/>}
          {view==="booking"      && <BookingPage onNavigate={navigate} toast={addToast}/>}
          {view==="payment"      && <PaymentPage onNavigate={navigate} toast={addToast}/>}
          {view==="success"      && <SuccessPage onNavigate={navigate} toast={addToast}/>}
          {view==="profile"      && <ProfilePage onNavigate={navigate} toast={addToast}/>}
          {view==="wishlist"     && <WishlistPage onNavigate={navigate} hotels={hotels} onToggleLike={toggleLike}/>}
          {view==="trips"        && <TripsPage onNavigate={navigate} toast={addToast}/>}
          {view==="notifications"&& <NotificationsPage onNavigate={navigate}/>}
          {view==="admin"        && <AdminDashboard onNavigate={navigate} toast={addToast}/>}

          {showNav && <BottomNav view={view} onNavigate={navigate} notifCount={unreadCount}/>}
        </>
      )}
    </div>
  )
}
