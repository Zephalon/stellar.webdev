'use client';

import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { content, getContentById } from '@/lib/content';
import SystemPlanetary from './SystemPlanetary';
import SystemSatellite from './SystemSatellite';
import SystemLunar from './SystemLunar';

// p5 touches `window` while loading, and the pages are prerendered at build time
const AnimationStack = dynamic(() => import('./AnimationStack'), { ssr: false });

export default function SolarSystem({ content_html }) {
  const router = useRouter();
  const pathname = usePathname();

  const [requested_folder, requested_file] = pathname.split('/').filter(Boolean);

  const system = requested_file ? 'lunar' : requested_folder ? 'satellites' : 'planetary';

  // Keep the current folder and file to allow animations: the system being left
  // has to stay mounted while it fades out, so the ids survive navigating upwards.
  // Adjusting the state during render keeps all four values in a single commit.
  const [navigation, setNavigation] = useState({
    system: system,
    last_system: null,
    open_folder_id: requested_folder ?? null,
    open_file_id: requested_file ?? null
  });

  if (
    navigation.system !== system ||
    (requested_folder && requested_folder !== navigation.open_folder_id) ||
    (requested_file && requested_file !== navigation.open_file_id)
  ) {
    setNavigation({
      system: system,
      last_system: navigation.system,
      open_folder_id: requested_folder ?? navigation.open_folder_id,
      open_file_id: requested_file ?? navigation.open_file_id
    });
  }

  const { last_system, open_folder_id, open_file_id } = navigation;

  // send visitors with an old `#/folder/file` bookmark to the real route
  const hash_checked = useRef(false);
  useEffect(() => {
    if (hash_checked.current) return;
    hash_checked.current = true;

    const hash = window.location.hash;
    if (!hash.startsWith('#/')) return;

    const target = hash.substring(2);
    router.replace(target ? '/' + target + '/' : '/');
  }, [router]);

  // open the planetary content (folder)
  const openPlanet = useCallback((id) => {
    const target = getContentById(id);

    if (target && ['folder', 'contact'].includes(target.type)) {
      router.push('/' + id + '/');
    } else {
      console.warn('Invalid Folder ID: ' + id);
    }
  }, [router]);

  // open the lunar content (file)
  const openMoon = useCallback((id) => {
    const target = getContentById(id);

    if (target && target.type === 'file') {
      router.push('/' + open_folder_id + '/' + id + '/');
    } else {
      console.warn('Invalid File ID: ' + id);
    }
  }, [router, open_folder_id]);

  // close the lunar content (file)
  const closeMoon = useCallback(() => {
    router.push('/' + open_folder_id + '/');
  }, [router, open_folder_id]);

  // close all content — replaces the entry, just like the old history.replaceState
  const reset = useCallback(() => {
    router.replace('/');
  }, [router]);

  const folder_content = open_folder_id ? getContentById(open_folder_id) : null;
  const file_content = open_file_id ? getContentById(open_file_id) : null;

  return (
    <main id="desktop" className={'desktop-' + system}>
      <div id="animations">
        <AnimationStack
          system={system}
          last_system={last_system}
          open_folder_id={open_folder_id}
          open_file_id={open_file_id}
          folder_content={folder_content}
          file_content={file_content}
        />
      </div>
      <div id="systems">
        <SystemPlanetary content={content} openPlanet={openPlanet} />

        {folder_content && (
          <SystemSatellite
            id={open_folder_id}
            files={folder_content.files}
            content={folder_content}
            openPlanet={openMoon}
            closePlanet={reset}
          />
        )}

        {file_content && (
          <SystemLunar
            id={open_file_id}
            file={open_file_id}
            content={file_content}
            html={content_html[open_file_id]}
            closeMoon={closeMoon}
          />
        )}
      </div>
    </main>
  );
}
