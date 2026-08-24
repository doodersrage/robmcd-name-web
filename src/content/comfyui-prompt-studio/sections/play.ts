import { LIVE, p, page } from '../helpers'

export const playPages = [
  page(
    ['play', 'roleplay'],
    'Roleplay',
    'Cast a character, pick a beat, and queue stills or clips on `/roleplay`.',
    'Play',
    51,
    [
      ...p(
        'Roleplay (`/roleplay`) is the narrative production rail in **Play** workspace mode. Pick a character from Cast, choose a story beat, and queue a still or short clip without leaving the lean sidebar — Cast, Roleplay, Gallery, and Queue stay one click away.',
        '**Continue** extends a clip when the parent upload is Fal (or already on Fal): Fal extend-video chains the motion. Otherwise Continue falls back to last-frame I2V through your configured video engine. **Cut** encodes a film from queued clips; **Save to Cast** reuses that blob as a new look or reference on the character home.',
      ),
      { type: 'h2', text: 'Typical Roleplay flow' },
      {
        type: 'ol',
        items: [
          'Define or select a character in Cast (`/characters`)',
          'Switch to Play mode from the sidebar footer or Profile → Appearance',
          'Pick a beat and generate a still or clip (local ComfyUI or cloud engine)',
          'Continue, Cut, or Save to Cast to build episodic sequences',
        ],
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Cloud clips',
        text: 'Video on Fal, Replicate, Grok, or Gemini can queue T2V, I2V, and extend paths. Configure keys in Settings → Inference engine.',
      },
    ],
    { related: ['play/cast', 'media/video', 'introduction/workspace-modes'] },
  ),

  page(
    ['play', 'cast'],
    'Cast',
    'Character homes for looks, stills, clips, film cuts, and LoRA flywheel on `/characters`.',
    'Play',
    52,
    [
      ...p(
        'Cast (`/characters`) is the long-lived home for each character IP — not just a one-off bible row. Each cast member accumulates looks (reference stills), queued outputs, short clips, assembled film cuts, and optional LoRA training flywheel metadata as you iterate.',
        'Roleplay pulls from Cast when you pick a beat; Save to Cast pushes Roleplay or Gallery winners back into the character record. Compose **Isolate on white** for Image 1 produces clean character plates that Cast and Mobile Studio reuse for consistent identity.',
      ),
      { type: 'h2', text: 'Cast vs Character tool' },
      {
        type: 'ul',
        items: [
          'Character (`/character`) — generate solo/duo/sport prompts from traits and wardrobe',
          'Cast (`/characters`) — persistent home for looks, clips, films, and production history',
          'Studio campaigns and Topics still batch-generate; Cast organizes what ships',
        ],
      },
    ],
    { related: ['character/character-tool', 'play/roleplay', 'image-tools/compose-transfer'] },
  ),

  page(
    ['play', 'mobile-studio'],
    'Mobile Studio',
    'Phone companion at `/m` — capture plates, watch the queue, rate gallery, Play Roleplay from photo.',
    'Play',
    53,
    [
      ...p(
        'Mobile Studio (`/m`) is a phone-first companion route — not a stripped desktop UI. Capture a character plate with **isolate on white**, watch pending ComfyUI or cloud jobs, rate gallery stills with review focus, and launch **Play Roleplay from photo** for still-only beats when you are away from the desk.',
        'Plates captured on mobile sync into Cast looks and Compose Image 1 handoffs when the main instance indexes gallery exports. Queue status mirrors the dashboard so you can approve Draft batches or promote Final winners without opening the full sidebar.',
      ),
      { type: 'h2', text: 'Mobile capabilities' },
      {
        type: 'ul',
        items: [
          'Character plate capture with white isolation',
          'Live queue watch (pending / running / complete)',
          'Gallery rating in review focus layout',
          'Roleplay from photo — stills path on Play mode',
        ],
      },
      {
        type: 'links',
        items: [{ label: 'Open Mobile Studio (local)', href: `${LIVE}/m`, external: true }],
      },
    ],
    { related: ['play/roleplay', 'gallery/review-mode', 'play/cast'] },
  ),
]
