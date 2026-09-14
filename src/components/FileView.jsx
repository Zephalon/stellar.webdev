'use client';

import { useRouter } from 'next/navigation';

export default function FileView({ html }) {
  const router = useRouter();

  // the markdown contains internal links, which would otherwise reload the whole
  // page and restart every p5 sketch instead of animating between the systems
  const navigate = (event) => {
    const link = event.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || !href.startsWith('/') || link.target === '_blank') return;

    event.preventDefault();
    router.push(href);
  };

  return (
    <article className="file_view">
      <div className="file_view-inner" onClick={navigate} dangerouslySetInnerHTML={{ __html: html }}></div>
    </article>
  );
}
