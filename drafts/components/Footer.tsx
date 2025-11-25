import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../config/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">{COMPANY_INFO.name}</h3>
            <p className="text-slate-500 text-sm mb-4">{COMPANY_INFO.description}</p>
            <div className="text-slate-400 text-xs space-y-1">
              <p>ИНН: {COMPANY_INFO.inn}</p>
              <p>КПП: {COMPANY_INFO.kpp}</p>
              <p>ОГРН: {COMPANY_INFO.ogrn.number}</p>
              <p>ОКПО: {COMPANY_INFO.okpo}</p>
              <p>ОКТМО: {COMPANY_INFO.oktmo}</p>
              <p>ОКВЭД: {COMPANY_INFO.okved.map((item) => item.code).join(', ')}</p>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Контакты</h4>
            <div className="text-slate-400 text-sm space-y-2">
              {COMPANY_INFO.contacts.phones.map((phoneContact) => (
                <p key={phoneContact.phone}>
                  <a
                    href={`tel:${phoneContact.phone.replace(/\s/g, '')}`}
                    className="hover:text-white transition-colors"
                  >
                    {phoneContact.phone}
                  </a>
                  <span className="block text-xs text-slate-500 mt-1">{phoneContact.contact}</span>
                </p>
              ))}
              <p>
                <a
                  href={`mailto:${COMPANY_INFO.contacts.email}`}
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_INFO.contacts.email}
                </a>
              </p>
              <p>
                <a
                  href={`https://t.me/${COMPANY_INFO.contacts.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {COMPANY_INFO.contacts.telegram}
                </a>
              </p>
              <p className="text-xs text-slate-500 mt-3">{COMPANY_INFO.contacts.address}</p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Информация</h4>
            <div className="flex flex-col gap-2">
              <a
                href="#contact"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Тендеры
              </a>
              <Link
                to="/privacy"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Политика конфиденциальности
              </Link>
              <a
                href="#contact"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Контакты
              </a>
            </div>
          </div>

          {/* Bank Details */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Банковские реквизиты</h4>
            <div className="text-slate-400 text-xs space-y-1">
              <p>
                <span className="text-slate-500">Банк:</span> {COMPANY_INFO.bankDetails.bank}
              </p>
              <p>
                <span className="text-slate-500">Расчётный счет:</span>{' '}
                {COMPANY_INFO.bankDetails.account}
              </p>
              <p>
                <span className="text-slate-500">Корреспондентский счёт:</span>{' '}
                {COMPANY_INFO.bankDetails.correspondentAccount}
              </p>
              <p>
                <span className="text-slate-500">БИК:</span> {COMPANY_INFO.bankDetails.bik}
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5 text-center text-slate-500 text-sm">
          <p>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};
