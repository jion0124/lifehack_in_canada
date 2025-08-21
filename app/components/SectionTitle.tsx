interface SectionTitleProps {
  enTitle: string;
  jaTitle: string;
  color?: string;
  subTitle?: string;
}

export default function SectionTitle({ 
  enTitle, 
  jaTitle, 
  color = 'text-red-600',
  subTitle 
}: SectionTitleProps) {
  return (
    <div className="text-center">
      <div className={`text-sm font-bestten ${color}`}>
        <p>{enTitle}</p>
      </div>
      <h2 className="text-[30px] font-nicomoji">
      <span className="block">{jaTitle}</span>
        {subTitle && (
          <span className="block leading-tight -mt-2">
            {subTitle}
          </span>
        )}
      </h2>
    </div>
  );
}