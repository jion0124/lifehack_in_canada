// app/character/writer/[id]/page.tsx

import { WriterArticlesList } from '../../../components/WriterArticlesList';

type WriterPageProps = {
  params: { id: string };
};

export default async function WriterPage({ params }: WriterPageProps) {
  // 明示的に await することでエラーを解消
  const { id: writerId } = await Promise.resolve(params);
  return <WriterArticlesList writerId={writerId} />;
}
