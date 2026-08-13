import { p, page } from '../helpers'

export const characterPages = [
  page(
    ['character', 'character-tool'],
    'Character tool',
    'Solo, duo, and sport modes on `/character`.',
    'Character',
    20,
    [
      ...p(
        'Character (`/character`) builds persistent character bibles — name, appearance, wardrobe, personality snippets, and sport/duo configurations. Generations pull from the bible so episodic series stay on-model across FLUX exploration and SDXL delivery.',
        'Modes include solo person, duo/sport pairings, and subject + background compose hooks. Legacy URLs `/duo` redirect here. Combine with wardrobe catalog tokens and Topics campaigns for batch series.',
      ),
      { type: 'h2', text: 'Character workflow' },
      {
        type: 'ol',
        items: [
          'Define core traits and default wardrobe',
          'Attach sport preset or duo partner when needed',
          'Generate or compose into full scene prompts',
          'Lint before queue; review consistency in Gallery',
        ],
      },
    ],
    { related: ['character/wardrobe-catalog', 'character/scene-compose'] },
  ),

  page(
    ['character', 'pet-fantasy'],
    'Pet & fantasy archetypes',
    'Species-focused `/pet` and fantasy `/fantasy` prompts.',
    'Character',
    21,
    [
      ...p(
        'Pet (`/pet`) generates pet-focused prompts with scene pools — species-specific tags, anatomy-aware negatives, and environment variety without human subjects dominating the frame.',
        'Fantasy (`/fantasy`) covers fantasy character and scene prompts — archetypes, magical environments, and non-photoreal styling with family-appropriate lint. Both routes extend the character system rather than replacing it; combine with Background (`/background`) for full scenes.',
      ),
      { type: 'h2', text: 'Shared patterns' },
      {
        type: 'ul',
        items: [
          'Scene pools rotate environments while keeping subject identity',
          'Model-family-aware tag density (FLUX brevity vs SDXL richness)',
          'Link to Topics for campaign batch builds',
          'Negative blocks tuned for non-human anatomy where applicable',
        ],
      },
    ],
    { related: ['character/background-topics', 'format-and-lint/negative'] },
  ),

  page(
    ['character', 'background-topics'],
    'Background & topics',
    'Environment-only `/background` and batch `/topics` scaffolding.',
    'Character',
    22,
    [
      ...p(
        'Background (`/background`) generates environment-only prompts with no people — useful for plates, matte backgrounds, and scene establishment shots. Topics (`/topics`) maintains topic lists for batch prompt builds tied to Studio campaigns.',
        'Link topic rows to campaigns for scheduled series: one topic per episode, consistent character bible, Draft batches on weeknights, Final/Max promotion on winners. Background fills gaps in Compose without duplicating lighting language from character traits.',
      ),
      { type: 'h2', text: 'Campaign integration' },
      {
        type: 'ul',
        items: [
          'Topics → Studio campaign → scheduled ComfyUI queue',
          'Background plates paired with Character foreground compose',
          'Semantic search in Gallery filters by campaign/topic metadata',
        ],
      },
    ],
    { related: ['studio/campaigns-scheduled', 'character/scene-compose'] },
  ),

  page(
    ['character', 'scene-compose'],
    'Scene compose',
    'Layer character, environment, and action — `/compose` is more than character.',
    'Character',
    23,
    [
      ...p(
        'Compose (`/compose`) merges character bibles, background plates, and action beats with priority rules — character traits override generic tags; background fills environmental gaps without duplicating lighting clauses.',
        'The full Compose tool (`/compose`) supports multi-image transfer and edit with optional identity lock, regional edit, and gallery re-edit handoffs. Qwen multi-ref ReferenceLatent, Z-Image VAEEncode img2img, and Boogu TextEncodeBooguEdit paths are available from Refine and Compose flows.',
      ),
      { type: 'h2', text: 'Priority rules' },
      {
        type: 'ul',
        items: [
          'Character identity tokens win over generic scene tags',
          'Background supplies setting; Character supplies subject',
          'Action verbs and camera language appended last for video-safe ordering',
        ],
      },
    ],
    { related: ['image-tools/compose-transfer', 'character/character-tool'] },
  ),

  page(
    ['character', 'wardrobe-catalog'],
    'Wardrobe catalog',
    'Reusable outfit tokens across campaigns and characters.',
    'Character',
    24,
    [
      ...p(
        'Catalog entries are short tagged phrases — e.g. "red windbreaker, reflective trim" or "vintage letterman jacket, chenille patch". Attach to characters as defaults or swap per campaign beat without rewriting the full bible.',
        'Wardrobe tokens flow through Compose and Studio templates. Export catalog JSON for team sync; import community packs from the data catalogs documented in the repository.',
      ),
      { type: 'h2', text: 'Best practices' },
      {
        type: 'ul',
        items: [
          'Keep tokens concise — let Format expand for SDXL if needed',
          'Name catalogs by project or season for campaign filtering',
          'Pair wardrobe changes with Topics rows for episodic continuity',
        ],
      },
    ],
    { related: ['studio/templates-presets', 'character/character-tool'] },
  ),
]
