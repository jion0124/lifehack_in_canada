'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MoreButton from './MoreButton';
import Image from 'next/image';
import SectionTitle from './SectionTitle';
import { format, toZonedTime } from 'date-fns-tz';
import { enUS } from 'date-fns/locale';

const TIME_ZONE = 'America/Vancouver';

const Calendar = dynamic<CalendarProps>(
  () => import('react-calendar').then((mod) => {
    if (typeof window !== 'undefined') {
      require('date-fns/locale/en-US');
    }
    return mod.Calendar;
  }),
  {
    ssr: false,
    loading: () => <div className="h-[300px] w-full bg-gray-100 animate-pulse" />
  }
);

function formatVancouverDate(date: Date): string {
  const zonedDate = toZonedTime(date, TIME_ZONE);
  return format(zonedDate, 'yyyy/MM/dd', { locale: enUS });
}

export default function TopWasabi() {
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const now = new Date();
    return new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds()
      )
    );
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (!value) return;
    
    // 型ガードを厳密化
    const processDate = (rawDate: Date | null): Date => {
      if (!rawDate) return new Date();
      return toZonedTime(rawDate, TIME_ZONE);
    };

    if (Array.isArray(value)) {
      setSelectedDate(processDate(value[0] as Date));
    } else {
      setSelectedDate(processDate(value as Date));
    }
  };

  const safeFormat = (date: Date | null, formatStr: string): string => {
    if (!date) return '';
    return format(date, formatStr, { locale: enUS });
  };

  if (!mounted) return null;

  return (
    <section className="w-full mx-auto bg-[#039877]  mt-12 py-12">
      <div className="text-white">
        <SectionTitle
          enTitle="COMMUNITY"
          jaTitle="コミュニティ"
          subTitle="「WASABI」"
          color="text-yellow-300"
        />

         <p className="text-base text-center mt-7">
          カナダ生活辞典は
          <br />
          日本人留学生の交流の場を作るために
          <br />
          コミュニティ「WASABI」を運営しています。
          <br />
          <br />
          言語交換会、パスタ、BBQ、ゲーム大会など
          <br />
          どなたでも気軽に国際交流ができます。
          <br />
          1人でも参加しやすいコミュニティ作りを
          <br />
          心がけています。
        </p>

        <div className="
          flex 
          gap-4 
          mt-6 
          overflow-x-auto 
          pb-4
          [-ms-overflow-style:none]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        ">
          <div className="relative min-w-[200px] h-[120px] flex-shrink-0">
            <Image
              src="/images/Wasabi1.png"
              alt="WASABI Image 1"
              fill
              className="object-cover border-2 border-gray-800 rounded-sm"
            />
          </div>
          <div className="relative min-w-[200px] h-[120px] flex-shrink-0">
            <Image
              src="/images/Wasabi2.png"
              alt="WASABI Image 2"
              fill
              className="object-cover border-2 border-gray-800 rounded-sm"
            />
          </div>
          <div className="relative min-w-[200px] h-[120px] flex-shrink-0">
            <Image
              src="/images/Wasabi3.png"
              alt="WASABI Image 3"
              fill
              className="object-cover border-2 border-gray-800 rounded-sm"
            />
          </div>
          <div className="relative min-w-[200px] h-[120px] flex-shrink-0">
            <Image
              src="/images/Wasabi4.png"
              alt="WASABI Image 4"
              fill
              className="object-cover border-2 border-gray-800 rounded-sm"
            />
          </div>
        </div>

        {/* <div className="mt-6 flex flex-col items-center text-gray-800">
          <Calendar
            value={selectedDate}
            onChange={handleDateChange}
            locale="en-US"
            formatShortWeekday={(_, date) =>
              safeFormat(date as Date, 'EEE')
            }
            formatMonthYear={(_, date) =>
              safeFormat(date as Date, 'MMMM yyyy')
            }
            formatDay={(_, date) =>
              safeFormat(date as Date, 'd')
            }
            prev2Label={null}
            next2Label={null}
            className="border-2 border-gray-200 rounded-lg p-2 bg-white min-w-[300px]"
            tileClassName={({ date }) =>
              date.toDateString() === selectedDate.toDateString()
                ? 'bg-blue-500 text-white rounded-full'
                : ''
            }
          />
        </div> */}
      </div>
          {/* <Mo// RelatedArticlesCard.tsx
          type RelatedArticlesCardProps = {
            currentArticleId: string
            category: JapaneseCategory // 適切な型が使用されている
            limit?: number
          } */}
    </section>
  );
}