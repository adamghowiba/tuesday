type ColumnType = 'status' | 'date' | 'number' | 'short_text';

interface Column {
  type: ColumnType;
  name: string;
}

interface BoardTable {
  columns: Column[];
  items: any[];
}

export const MOCK_BOARD: BoardTable = {
  columns: [
    { name: 'person', type: 'short_text' },
    { name: 'status', type: 'status' },
    { name: 'date', type: 'date' },
    { name: 'next', type: 'status' },
  ],
  items: [
    {
      item: 'Add buttons to footer',
      person: 'Adam',
      status: 'active',
      date: '10/20',
      next: 'active',
    },
    {
      item: 'Implemented labels',
      person: 'Adam',
      status: 'active',
      date: '10/25',
      next: 'active',
    },
  ],
};

/*
  /board/1

  Board
  name String
  items JSON

  Item







  Board, Views,
*/

const bd = {
  pulses: [
    {
      id: 3430199814,
      updates_count: 0,
      last_update: {},
      checklist_counters: { tasks_count: 0, checked_tasks_count: 0 },
      is_archived: false,
      is_deleted: false,
      last_updated_data: {
        last_updated_at: 1666791979,
        last_updated_by: 35928361,
      },
      board_id: 3428632877,
      name: 'Send confirmation email for password updates',
      group_id: 'group_title',
      pos: 65536,
      column_values: { name: 'Send confirmation email for password updates' },
      created_by: 35928361,
      created_at: '2022-10-26T13:46:20Z',
      is_permitted: null,
      parent_item_link: null,
    },
    {
      id: 3429949758,
      updates_count: 0,
      last_update: {},
      checklist_counters: { tasks_count: 0, checked_tasks_count: 0 },
      is_archived: false,
      is_deleted: false,
      last_updated_data: {
        last_updated_at: 1666792332,
        last_updated_by: 35928361,
      },
      board_id: 3428632877,
      name: 'Close delete modal before it finishes',
      group_id: 'topics',
      pos: 262144,
      column_values: {
        status: {
          index: 1,
          post_id: null,
          changed_at: '2022-10-26T13:45:02.555Z',
        },
        priority: {
          index: 7,
          post_id: null,
          changed_at: '2022-10-26T13:52:11.202Z',
        },
        name: 'Close delete modal before it finishes',
      },
      created_by: 35928361,
      created_at: '2022-10-26T13:11:26Z',
      is_permitted: null,
      parent_item_link: null,
    },
    {
      id: 3429965352,
      updates_count: 0,
      last_update: {},
      checklist_counters: { tasks_count: 0, checked_tasks_count: 0 },
      is_archived: false,
      is_deleted: false,
      last_updated_data: {
        last_updated_at: 1666792333,
        last_updated_by: 35928361,
      },
      board_id: 3428632877,
      name: 'Deleting task causing issue in production',
      group_id: 'topics',
      pos: 327680,
      column_values: {
        status: {
          index: 1,
          post_id: null,
          changed_at: '2022-10-26T13:22:54.692Z',
        },
        priority: {
          index: 7,
          post_id: null,
          changed_at: '2022-10-26T13:52:12.202Z',
        },
        name: 'Deleting task causing issue in production',
      },
      created_by: 35928361,
      created_at: '2022-10-26T13:12:49Z',
      is_permitted: null,
      parent_item_link: null,
    },
    {
      id: 3430119400,
      updates_count: 0,
      last_update: {},
      checklist_counters: { tasks_count: 0, checked_tasks_count: 0 },
      is_archived: false,
      is_deleted: false,
      last_updated_data: {
        last_updated_at: 1666792335,
        last_updated_by: 35928361,
      },
      board_id: 3428632877,
      name: 'User Session not being activated when logging in',
      group_id: 'topics',
      pos: 393216,
      column_values: {
        status: {
          index: 1,
          post_id: null,
          changed_at: '2022-10-26T13:44:57.817Z',
        },
        priority: {
          index: 7,
          post_id: null,
          changed_at: '2022-10-26T13:52:13.581Z',
        },
        name: 'User Session not being activated when logging in',
      },
      created_by: 35928361,
      created_at: '2022-10-26T13:34:56Z',
      is_permitted: null,
      parent_item_link: null,
    },
    {
      id: 3430254316,
      updates_count: 0,
      last_update: {},
      checklist_counters: { tasks_count: 0, checked_tasks_count: 0 },
      is_archived: false,
      is_deleted: false,
      last_updated_data: {
        last_updated_at: 1666792488,
        last_updated_by: 35928361,
      },
      board_id: 3428632877,
      name: 'Invitation mangementt',
      group_id: 'group_title',
      pos: 131072,
      column_values: {
        long_text: {
          text: 'Allow admins to manage invitations\n- Revoke\n- Resend\netc',
          changed_at: '2022-10-26T13:53:50.958Z',
        },
        name: 'Invitation mangementt',
      },
      created_by: 35928361,
      created_at: '2022-10-26T13:53:30Z',
      is_permitted: null,
      parent_item_link: null,
    },
    {
      id: 3434152194,
      updates_count: 0,
      last_update: {},
      checklist_counters: { tasks_count: 0, checked_tasks_count: 0 },
      is_archived: false,
      is_deleted: false,
      last_updated_data: {
        last_updated_at: 1666841845,
        last_updated_by: 35928361,
      },
      board_id: 3428632877,
      name: 'Error pages',
      group_id: 'group_title',
      pos: 262144,
      column_values: { name: 'Error pages' },
      created_by: 35928361,
      created_at: '2022-10-27T03:37:25Z',
      is_permitted: null,
      parent_item_link: null,
    },
    {
      id: 3434149897,
      updates_count: 0,
      last_update: {},
      checklist_counters: { tasks_count: 0, checked_tasks_count: 0 },
      is_archived: false,
      is_deleted: false,
      last_updated_data: {
        last_updated_at: 1666841847,
        last_updated_by: 35928361,
      },
      board_id: 3428632877,
      name: 'Quick create',
      group_id: 'group_title',
      pos: 196608,
      column_values: {
        long_text: {
          text: 'User should be able to quick create modules. IE Contacts, FOrms\n',
          changed_at: '2022-10-27T03:37:09.663Z',
        },
        name: 'Quick create',
      },
      created_by: 35928361,
      created_at: '2022-10-27T03:36:38Z',
      is_permitted: null,
      parent_item_link: null,
    },
    {
      id: 3434152863,
      updates_count: 0,
      last_update: {},
      checklist_counters: { tasks_count: 0, checked_tasks_count: 0 },
      is_archived: false,
      is_deleted: false,
      last_updated_data: {
        last_updated_at: 1666842086,
        last_updated_by: 35928361,
      },
      board_id: 3428632877,
      name: 'Select input needs no data state',
      group_id: 'topics',
      pos: 458752,
      column_values: {
        status: {
          index: 5,
          post_id: null,
          changed_at: '2022-10-27T03:41:23.323Z',
        },
        name: 'Select input needs no data state',
      },
      created_by: 35928361,
      created_at: '2022-10-27T03:37:58Z',
      is_permitted: null,
      parent_item_link: null,
    },
    {
      id: 3434237348,
      updates_count: 0,
      last_update: {},
      checklist_counters: { tasks_count: 0, checked_tasks_count: 0 },
      is_archived: false,
      is_deleted: false,
      last_updated_data: {
        last_updated_at: 1666843976,
        last_updated_by: 35928361,
      },
      board_id: 3428632877,
      name: 'Overflow menu wont overflow table on Y axies',
      group_id: 'topics',
      pos: 524288,
      column_values: { name: 'Overflow menu wont overflow table on Y axies' },
      created_by: 35928361,
      created_at: '2022-10-27T04:12:56Z',
      is_permitted: null,
      parent_item_link: null,
    },
    {
      id: 3434933442,
      updates_count: 0,
      last_update: {},
      checklist_counters: { tasks_count: 0, checked_tasks_count: 0 },
      is_archived: false,
      is_deleted: false,
      last_updated_data: {
        last_updated_at: 1666859374,
        last_updated_by: 35928361,
      },
      board_id: 3428632877,
      name: 'Add error reporting intergration',
      group_id: 'group_title',
      pos: 327680,
      column_values: { name: 'Add error reporting intergration' },
      created_by: 35928361,
      created_at: '2022-10-27T08:29:34Z',
      is_permitted: null,
      parent_item_link: null,
    },
    {
      id: 3430191571,
      updates_count: 0,
      last_update: {},
      checklist_counters: { tasks_count: 0, checked_tasks_count: 0 },
      is_archived: false,
      is_deleted: false,
      last_updated_data: {
        last_updated_at: 1667137051,
        last_updated_by: 35928361,
      },
      board_id: 3428632877,
      name: 'Fix loading state for Data Tables',
      group_id: 'topics',
      pos: 65536,
      column_values: {
        status: {
          index: 1,
          post_id: null,
          changed_at: '2022-10-27T04:09:49.207Z',
        },
        priority: {
          index: 110,
          post_id: null,
          changed_at: '2022-10-26T13:52:08.111Z',
        },
        long_text: { text: 'wddawd', changed_at: '2022-10-30T13:37:28.733Z' },
        name: 'Fix loading state for Data Tables',
      },
      created_by: 35928361,
      created_at: '2022-10-26T13:45:26Z',
      is_permitted: null,
      parent_item_link: null,
    },
    {
      id: 3428632911,
      updates_count: 0,
      last_update: {},
      checklist_counters: { tasks_count: 0, checked_tasks_count: 0 },
      is_archived: false,
      is_deleted: false,
      last_updated_data: {
        last_updated_at: 1667137053,
        last_updated_by: 35928361,
      },
      board_id: 3428632877,
      name: 'Projects query function is broken',
      group_id: 'topics',
      pos: 196608,
      column_values: {
        status: {
          index: 1,
          post_id: null,
          changed_at: '2022-10-26T13:45:09.785Z',
        },
        priority: {
          index: 7,
          post_id: null,
          changed_at: '2022-10-26T13:52:10.120Z',
        },
        long_text: { text: 'dawd', changed_at: '2022-10-30T13:37:32.411Z' },
        date4: null,
        name: 'Projects query function is broken',
      },
      created_by: 35928361,
      created_at: '2022-10-26T08:36:46Z',
      is_permitted: null,
      parent_item_link: null,
    },
    {
      id: 3447374931,
      updates_count: 0,
      last_update: {},
      checklist_counters: { tasks_count: 0, checked_tasks_count: 0 },
      is_archived: false,
      is_deleted: false,
      last_updated_data: {
        last_updated_at: 1667137135,
        last_updated_by: 35928361,
      },
      board_id: 3428632877,
      name: 'dawd',
      group_id: 'topics',
      pos: 589824,
      column_values: { name: 'dawd' },
      created_by: 35928361,
      created_at: '2022-10-30T13:38:55Z',
      is_permitted: null,
      parent_item_link: null,
    },
  ],
  linkedPulses: [],
  removedItemsIds: [],
  removedLinkedItemsIds: [],
  resultsFetchTimestamp: 1667140350703,
};
