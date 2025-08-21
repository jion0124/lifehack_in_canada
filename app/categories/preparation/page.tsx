import { CategoryArticleList } from '../../components/CategoryArticleList';
import path from 'path';
import { fileURLToPath } from 'url';
import { convertCategory, CATEGORY_MAPPING,JapaneseCategory } from '../../api/articles';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const categoryEn = path.basename(__dirname) as typeof CATEGORY_MAPPING[JapaneseCategory];
const categoryJa = convertCategory.toJa(categoryEn);

export default async function CategoryPage() {
  return (
    <CategoryArticleList
      jaCategoryName={categoryJa}
      enCategoryName={categoryEn}
    />
  );
}
