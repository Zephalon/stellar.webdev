import { getContentById, getFileParams } from '@/lib/content';

// unknown files are a 404, in dev just like in the static export
export const dynamicParams = false;

export function generateStaticParams() {
  return getFileParams();
}

export async function generateMetadata({ params }) {
  const { file } = await params;
  const content = getContentById(file);

  return { title: content?.title };
}

export default function FilePage() {
  return null;
}
