"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone, Mail } from "lucide-react";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSafariOpen, setMobileSafariOpen] = useState(false);
  const [mobileExperienceOpen, setMobileExperienceOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreDropdownOpen && !(event.target as Element).closest('.more-dropdown')) {
        setMoreDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [moreDropdownOpen]);

  const safariPackages = [
    { href: "/safaris/masai-mara", label: "Masai Mara Safari" },
    { href: "/safaris/serengeti", label: "Serengeti Adventure" },
    { href: "/safaris/kilimanjaro", label: "Kilimanjaro Trek" },
    { href: "/safaris/amboseli", label: "Amboseli Park" },
    { href: "/safaris/tsavo", label: "Tsavo Safari" },
  ];

  const experiencePackages = [
    { href: "/experience/kenya", label: "Kenya Experiences" },
    { href: "/experience/tanzania", label: "Tanzania Experiences" },
    { href: "/experience/uganda", label: "Uganda Experiences" },
  ];

  const additionalPages = [
    { href: "/itineraries", label: "Itineraries" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About Us" },
    { href: "/safaris", label: "All Safaris" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50">

        {/* ⭐ TOP BAR */}
        <div
          className={`w-full bg-green-700 text-white transition-all duration-300 overflow-hidden hidden sm:flex ${
            scrolled ? "py-1 text-xs" : "py-2 text-sm"
          }`}
        >
          <div className="container mx-auto px-4 flex justify-between items-center">

            {/* LEFT - CONTACT */}
            <div className="flex items-center gap-4">
              <a
                href="tel:+254111919898"
                className="flex items-center gap-1 hover:text-green-200"
              >
                <Phone size={14} />
                {!scrolled && <span>+254 111919898</span>}
              </a>

              <a
                href="mailto:gatorstoursandsafaris@gmail.com"
                className="flex items-center gap-1 hover:text-green-200"
              >
                <Mail size={14} />
                {!scrolled && <span>gatorstoursandsafaris@gmail.com</span>}
              </a>
            </div>

            {/* RIGHT - SOCIAL LINKS */}
            <div className="flex items-center gap-3">

              {/* Instagram */}
              <a
                href="https://instagram.com/gatorstoursandsafaris"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-125 transition transform text-pink-300 hover:text-pink-200"
              >
                <FaInstagram size={18} />
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER || '+254111919898').replace(/[^\d]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-125 transition transform text-green-300 hover:text-green-200"
              >
                <FaWhatsapp size={18} />
              </a>

              {/* TikTok */}
              <a
                href="https://facebook.com/gatorstoursandsafaris"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-125 transition transform text-white hover:text-gray-200"
              >
                <FaTiktok size={18} />
              </a>

              {/* ITINERARY BUTTON */}
              <button
                onClick={() => setOpenModal(true)}
                className="ml-3 bg-white text-green-700 px-3 py-1 rounded-full text-xs font-semibold hover:scale-105 transition"
              >
                Request Itinerary
              </button>

            </div>
          </div>
        </div>

        {/* ⭐ MAIN HEADER */}
        <div className="bg-white shadow-md">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center lg:grid lg:grid-cols-3">

            {/* LOGO */}
            <div className="flex justify-start">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Gators Safaris"
                  width={65}
                  height={45}
                />
                
              </Link>
            </div>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-8 justify-center">

              <Link href="/" className="text-gray-700 hover:text-green-600 font-medium">
                Home
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span className="cursor-pointer text-gray-700 hover:text-green-600 font-medium">
                    Safaris
                  </span>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 bg-white shadow-lg border z-50">
                  {safariPackages.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span className="cursor-pointer text-gray-700 hover:text-green-600 font-medium">
                    Experiences
                  </span>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56 bg-white shadow-lg border z-50">
                  {experiencePackages.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {additionalPages.slice(0, 3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-green-600 font-medium"
                >
                  {item.label}
                </Link>
              ))}

              <div className="relative more-dropdown">
                <button
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className="cursor-pointer text-gray-700 hover:text-green-600 font-medium focus:outline-none focus:text-green-600"
                >
                  More
                </button>

                {moreDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg border rounded-md z-50 py-2">
                    {additionalPages.slice(3).map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-green-600"
                        onClick={() => setMoreDropdownOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex justify-end">
              <Button asChild className="hidden lg:inline-flex bg-green-600 hover:bg-green-700 text-white">
                <Link href="/contact">Book Now</Link>
              </Button>
              <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>

          </nav>
        </div>

        {/* MOBILE NAV */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t p-4 flex flex-col justify-center min-h-[50vh] gap-3">
            <Link href="/" className="text-center hover:text-green-600">Home</Link>
            <button onClick={() => setMobileSafariOpen(!mobileSafariOpen)} className="text-center hover:bg-gray-100 p-2 rounded">
              Safaris {mobileSafariOpen ? '-' : '+'}
            </button>
            {mobileSafariOpen && (
              <div className="flex flex-col gap-2 pl-4">
                {safariPackages.map((item) => (
                  <Link key={item.href} href={item.href} className="text-center text-sm hover:text-green-600">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
            <button onClick={() => setMobileExperienceOpen(!mobileExperienceOpen)} className="text-center hover:bg-gray-100 p-2 rounded">
              Experiences {mobileExperienceOpen ? '-' : '+'}
            </button>
            {mobileExperienceOpen && (
              <div className="flex flex-col gap-2 pl-4">
                {experiencePackages.map((item) => (
                  <Link key={item.href} href={item.href} className="text-center text-sm hover:text-green-600">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
            {additionalPages.map((p) => (
              <Link key={p.href} href={p.href} className="block text-center">
                {p.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* ⭐ ITINERARY MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg relative">

            {/* CLOSE */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3"
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-4 text-green-700">
              Request Your Safari Itinerary
            </h2>

            <form className="space-y-3">
              <input className="w-full border p-2" placeholder="Full Name" />
              <input className="w-full border p-2" placeholder="Email Address" />
              <input className="w-full border p-2" placeholder="Destination (e.g Masai Mara)" />
              <textarea className="w-full border p-2" placeholder="Message..." />

              <Button className="w-full bg-green-600 text-white">
                Send Request
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}