import { createFetch, createSchema } from '@better-fetch/fetch';
import { StandardSchemaV1 } from '@standard-schema/spec';
import * as schema from '@wsh-2025/schema/src/api/schema';
import * as batshit from '@yornaath/batshit';

import { schedulePlugin } from '@wsh-2025/client/src/features/requests/schedulePlugin';

const $fetch = createFetch({
  baseURL: process.env['API_BASE_URL'] ?? '/api',
  plugins: [schedulePlugin],
  schema: createSchema({
    '/programs': {
      output: schema.getProgramsResponse,
      query: schema.getProgramsRequestQuery,
    },
    '/programs/:episodeId': {
      output: schema.getProgramByIdResponse,
      params: schema.getProgramByIdRequestParams,
    },
    '/programs/:programId/next': {
      output: schema.getProgramByIdResponse,
      params: schema.getProgramByIdRequestParams,
    },
  }),
  throw: true,
});

const immediateScheduler: batshit.BatcherScheduler = () => 'immediate';

const batcher = batshit.create({
  async fetcher(queries: { programId: string }[]) {
    const data = await $fetch('/programs', {
      query: {
        programIds: queries.map((q) => q.programId).join(','),
      },
    });
    return data;
  },
  resolver(items, query: { programId: string }) {
    const item = items.find((item) => item.id === query.programId);
    if (item == null) {
      throw new Error('Program is not found.');
    }
    return item;
  },
  scheduler: immediateScheduler,
});

interface ProgramService {
  fetchProgramById: (query: {
    programId: string;
  }) => Promise<StandardSchemaV1.InferOutput<typeof schema.getProgramByIdResponse>>;
  fetchPrograms: () => Promise<StandardSchemaV1.InferOutput<typeof schema.getProgramsResponse>>;
  fetchNextNextProgram: (query: {
    programId: string;
  }) => Promise<StandardSchemaV1.InferOutput<typeof schema.getProgramByIdResponse>>;
}

export const programService: ProgramService = {
  async fetchProgramById({ programId }) {
    const channel = await batcher.fetch({ programId });
    return channel;
  },
  async fetchPrograms() {
    const data = await $fetch('/programs', { query: {} });
    return data;
  },
  async fetchNextNextProgram({ programId }) {
    const data = await $fetch('/programs/:programId/next', {
      params: { programId },
    });
    return data;
  },
};
