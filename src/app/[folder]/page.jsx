import { getContentById, getFolderParams } from '@/lib/content';

// unknown folders are a 404, in dev just like in the static export
export const dynamicParams = false;

export function generateStaticParams() {
  return getFolderParams();
}

export async function generateMetadata({ params }) {
  const { folder } = await params;
  const content = getContentById(folder);

  return { title: content?.title };
}

export default function FolderPage() {
  return null;
}
