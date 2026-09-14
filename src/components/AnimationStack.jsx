'use client';

import AnimationBackground from './AnimationBackground';
import AnimationInteraction from './AnimationInteraction';
import AnimationPlanetary from './AnimationPlanetary';
import AnimationSatellites from './AnimationSatellites';
import AnimationLunar from './AnimationLunar';

// Single client-only entry point for everything that pulls in p5.
export default function AnimationStack({
  system,
  last_system,
  open_folder_id,
  open_file_id,
  folder_content,
  file_content
}) {
  return (
    <>
      {/* background */}
      <AnimationBackground />
      <AnimationInteraction />

      {/* home - system: planetary */}
      <AnimationPlanetary show={system === 'planetary'} />

      {/* open folder - system: satellites */}
      {folder_content && (
        <AnimationSatellites
          id={open_folder_id}
          content={folder_content}
          show={system === 'satellites'}
          move_sun={system !== 'lunar' && last_system !== 'lunar'}
        />
      )}

      {/* open file - system: lunar */}
      {file_content && <AnimationLunar id={open_file_id} show={system === 'lunar'} />}
    </>
  );
}
