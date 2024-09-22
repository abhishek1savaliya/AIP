'use client'
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname()

    console.log(pathname)

    const getLinkClass = (path) => {
        return pathname === path ? 'font-bold ' : '';
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-cyan-500 text-white">
            <div className="text-lg font-bold">
                <Link href="/" className="text-3xl cursor-pointer">AIP</Link>
            </div>
            <div className="hidden md:flex space-x-4">
                <Link href="/" className={`cursor-pointer text-2xl ${getLinkClass('/')}`}>Home</Link>
                <Link href="/docs" className={`cursor-pointer text-2xl  ${getLinkClass('/docs')} mb-2`}>Docs</Link>
                <Link href="/about" className={`cursor-pointer text-2xl ${getLinkClass('/about')}`}>About</Link>
                <Link href="/contact" className={`cursor-pointer text-2xl ${getLinkClass('/contact')}`}>Contact</Link>
            </div>
            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-cyan-500 p-4 md:hidden">
                    <Link href="/" className={`block  ${getLinkClass('/')} mb-2`}>Home</Link>
                    <Link href="/docs" className={`block  ${getLinkClass('/docs')} mb-2`}>Docs</Link>
                    <Link href="/about" className={`block ${getLinkClass('/about')} mb-2`}>About</Link>
                    <Link href="/contact" className={`block ${getLinkClass('/contact')}`}>Contact</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
