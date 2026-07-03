import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260525_235050 from './20260525_235050';
import * as migration_20260527_012341 from './20260527_012341';
import * as migration_20260528_123717 from './20260528_123717';
import * as migration_20260529_175406 from './20260529_175406';
import * as migration_20260530_193940 from './20260530_193940';
import * as migration_20260531_181948 from './20260531_181948';
import * as migration_20260703_185236_puck_fields from './20260703_185236_puck_fields';
import * as migration_20260703_190500_backfill_page_versions from './20260703_190500_backfill_page_versions';
import * as migration_20260703_191600_fix_page_breadcrumbs from './20260703_191600_fix_page_breadcrumbs';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260525_235050.up,
    down: migration_20260525_235050.down,
    name: '20260525_235050',
  },
  {
    up: migration_20260527_012341.up,
    down: migration_20260527_012341.down,
    name: '20260527_012341',
  },
  {
    up: migration_20260528_123717.up,
    down: migration_20260528_123717.down,
    name: '20260528_123717',
  },
  {
    up: migration_20260529_175406.up,
    down: migration_20260529_175406.down,
    name: '20260529_175406',
  },
  {
    up: migration_20260530_193940.up,
    down: migration_20260530_193940.down,
    name: '20260530_193940',
  },
  {
    up: migration_20260531_181948.up,
    down: migration_20260531_181948.down,
    name: '20260531_181948',
  },
  {
    up: migration_20260703_185236_puck_fields.up,
    down: migration_20260703_185236_puck_fields.down,
    name: '20260703_185236_puck_fields'
  },
  {
    up: migration_20260703_190500_backfill_page_versions.up,
    down: migration_20260703_190500_backfill_page_versions.down,
    name: '20260703_190500_backfill_page_versions'
  },
  {
    up: migration_20260703_191600_fix_page_breadcrumbs.up,
    down: migration_20260703_191600_fix_page_breadcrumbs.down,
    name: '20260703_191600_fix_page_breadcrumbs'
  },
];
