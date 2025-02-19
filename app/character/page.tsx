// app/characters/page.tsx
import { getAllCharacter } from '../api/articles';
import SectionTitle from '../components/SectionTitle';
import Wasabi from '../components/Wasabi';
import WriterCard from '../components/WriterCard';

export default async function CharactersPage() {
  const characters = await getAllCharacter();

  return (
    <>
    <main className="mx-auto mt-[52px] pt-3 pb-10 px-4">
      {/* ページタイトル */}
      <SectionTitle enTitle="CHARACTER" jaTitle="キャラクター" />
      
      {/* ライターカードのグリッドレイアウト */}
      <div className="grid grid-cols-1 gap-5 mt-1">
        {characters.map((writer) => (
          <WriterCard 
            key={writer.id} 
            writer={writer} 
          />
        ))}
      </div>

      {/* ライターがいない場合の表示 */}
      {characters.length === 0 && (
        <div className="text-center text-gray-500 py-12">
          現在登録されているキャラクターはいません
        </div>
      )}

    </main>
      <Wasabi />
    </>
  );
}