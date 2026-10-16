import React from 'react';
import { Globe, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 text-neutral-600 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-neutral-200">
          {/* Column 1: Support */}
          <div>
            <h4 className="font-bold text-neutral-900 mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#help" className="hover:underline hover:text-neutral-900 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#aircover" className="hover:underline hover:text-neutral-900 transition-colors">
                  HavenStay Cover
                </a>
              </li>
              <li>
                <a href="#anti-discrimination" className="hover:underline hover:text-neutral-900 transition-colors">
                  Anti-discrimination
                </a>
              </li>
              <li>
                <a href="#disability" className="hover:underline hover:text-neutral-900 transition-colors">
                  Disability support
                </a>
              </li>
              <li>
                <a href="#cancellation" className="hover:underline hover:text-neutral-900 transition-colors">
                  Cancellation options
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Hosting */}
          <div>
            <h4 className="font-bold text-neutral-900 mb-4">Hosting</h4>
            <ul className="space-y-3">
              <li>
                <a href="/host" className="hover:underline hover:text-neutral-900 transition-colors">
                  HavenStay your home
                </a>
              </li>
              <li>
                <a href="/host" className="hover:underline hover:text-neutral-900 transition-colors">
                  Host Protection Guarantee
                </a>
              </li>
              <li>
                <a href="#hosting-resources" className="hover:underline hover:text-neutral-900 transition-colors">
                  Hosting resources
                </a>
              </li>
              <li>
                <a href="#community-forum" className="hover:underline hover:text-neutral-900 transition-colors">
                  Community forum
                </a>
              </li>
              <li>
                <a href="#hosting-responsibly" className="hover:underline hover:text-neutral-900 transition-colors">
                  Hosting responsibly
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Community */}
          <div>
            <h4 className="font-bold text-neutral-900 mb-4">Community</h4>
            <ul className="space-y-3">
              <li>
                <a href="#relief" className="hover:underline hover:text-neutral-900 transition-colors">
                  HavenStay.org: disaster relief
                </a>
              </li>
              <li>
                <a href="#diversity" className="hover:underline hover:text-neutral-900 transition-colors">
                  Combating discrimination
                </a>
              </li>
              <li>
                <a href="#stories" className="hover:underline hover:text-neutral-900 transition-colors">
                  Traveler stories
                </a>
              </li>
              <li>
                <a href="#initiatives" className="hover:underline hover:text-neutral-900 transition-colors">
                  Eco-friendly stays
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: HavenStay */}
          <div>
            <h4 className="font-bold text-neutral-900 mb-4">About HavenStay</h4>
            <ul className="space-y-3">
              <li>
                <a href="#newsroom" className="hover:underline hover:text-neutral-900 transition-colors">
                  Newsroom
                </a>
              </li>
              <li>
                <a href="#features" className="hover:underline hover:text-neutral-900 transition-colors">
                  New features & updates
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:underline hover:text-neutral-900 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#investors" className="hover:underline hover:text-neutral-900 transition-colors">
                  Investors & governance
                </a>
              </li>
              <li>
                <a href="#giftcards" className="hover:underline hover:text-neutral-900 transition-colors">
                  Gift cards
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex flex-wrap items-center gap-3">
            <span>&copy; {new Date().getFullYear()} HavenStay, Inc. All rights reserved.</span>
            <span>&middot;</span>
            <a href="#privacy" className="hover:underline">
              Privacy
            </a>
            <span>&middot;</span>
            <a href="#terms" className="hover:underline">
              Terms
            </a>
            <span>&middot;</span>
            <a href="#sitemap" className="hover:underline">
              Sitemap
            </a>
            <span>&middot;</span>
            <span className="inline-flex items-center gap-1 text-brand-coral font-medium">
              Demo Frontend Experience <Heart className="w-3 h-3 fill-current inline" />
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 hover:underline font-semibold text-neutral-800">
              <Globe className="w-4 h-4" />
              <span>English (US)</span>
            </button>
            <button className="font-semibold hover:underline text-neutral-800">
              $ USD
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
