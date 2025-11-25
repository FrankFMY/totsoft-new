import { CheckCircle2, Clock, FileCheck, Shield, Users, Zap } from 'lucide-react';
import React from 'react';
import { COMPANY_INFO } from '../config/constants';
import { checkAccreditation } from '../utils/checkAccreditation';
import { downloadRequisites } from '../utils/downloadRequisites';

export const About: React.FC = () => {
  const benefits = [
    {
      title: 'Юридическая прозрачность',
      desc: 'Полный комплект документов. Аккредитация и лицензии. Финансовые гарантии.',
      icon: <Shield className="text-primary-400" />,
    },
    {
      title: 'Собственная методология',
      desc: 'Проверенные процессы разработки. Регулярная отчетность. Контроль качества на каждом этапе.',
      icon: <FileCheck className="text-blue-400" />,
    },
    {
      title: 'Опытные архитекторы',
      desc: 'Tech Lead на каждом проекте. Senior/Middle разработчики в штате. Средний опыт команды: 5+ лет.',
      icon: <Users className="text-green-400" />,
    },
    {
      title: 'Гарантия результата',
      desc: 'Прописанные SLA. Страхование рисков. Штрафные санкции за срыв сроков.',
      icon: <CheckCircle2 className="text-purple-400" />,
    },
    {
      title: 'Быстрый старт',
      desc: 'Формирование команды за 72 часа. Готовые шаблоны и решения. Параллельная работа над модулями.',
      icon: <Zap className="text-yellow-400" />,
    },
    {
      title: 'Долгосрочное партнерство',
      desc: 'Техподдержка после сдачи. Масштабирование команды. Накопление экспертизы в вашем домене.',
      icon: <Clock className="text-indigo-400" />,
    },
  ];

  return (
    <section id="about" className="py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Почему выбирают <span className="text-primary-500">Тотсофт</span>?
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            Мы закрываем возражения и усиливаем доверие. Каждое преимущество — это ответ на вопрос
            вашего потенциального клиента: «Почему им можно доверять?»
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="bg-white/5 border border-white/5 p-8 rounded-2xl hover:bg-white/10 transition-colors group"
            >
              <div className="w-12 h-12 bg-dark-800 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Legal Block */}
        <div className="relative rounded-3xl overflow-hidden bg-linear-to-br from-dark-800 to-dark-900 border border-white/10 p-8 md:p-12">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Юридическая прозрачность</h3>
              <p className="text-slate-400 mb-6 max-w-xl">
                Работаем официально, имеем государственную аккредитацию. Предоставляем полный пакет
                закрывающих документов. Гарантируем конфиденциальность (NDA) и чистоту прав на код.
              </p>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 text-sm font-mono text-slate-500">
                  <span className="px-3 py-1 bg-white/5 rounded">ИНН {COMPANY_INFO.inn}</span>
                  <span className="px-3 py-1 bg-white/5 rounded">КПП {COMPANY_INFO.kpp}</span>
                  <span
                    className="px-3 py-1 bg-white/5 rounded"
                    title={`от ${COMPANY_INFO.ogrn.date}`}
                  >
                    ОГРН {COMPANY_INFO.ogrn.number}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-500">
                  {COMPANY_INFO.okved.map((okved) => (
                    <span
                      key={okved.code}
                      className="px-3 py-1 bg-white/5 rounded"
                      title={okved.description}
                    >
                      ОКВЭД {okved.code}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={downloadRequisites}
                className="px-6 py-3 bg-white text-dark-900 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                aria-label="Скачать реквизиты компании"
              >
                Скачать реквизиты
              </button>
              <button
                type="button"
                onClick={checkAccreditation}
                className="px-6 py-3 border border-white/20 text-white font-medium rounded-xl hover:bg-white/5 transition-colors"
                aria-label="Проверить аккредитацию в реестре Минцифры"
              >
                Проверить аккредитацию
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
