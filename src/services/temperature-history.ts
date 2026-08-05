import { readTemperatureValue } from '../core/temperature';
import type { HomeAssistant } from '../models/home-assistant';

export interface TemperatureHistorySample {
  timestamp: number;
  value: number;
}

interface HistoryApiState {
  state?: string;
  last_changed?: string;
  last_updated?: string;
}

export async function fetchTemperatureHistory(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
  historyMinutes: number,
  maxSamples = 120,
): Promise<TemperatureHistorySample[]> {
  if (!hass?.callApi || !entityId) {
    return [];
  }

  const endTime = new Date();
  const startTime = new Date(endTime.getTime() - historyMinutes * 60_000);
  const query = new URLSearchParams({
    filter_entity_id: entityId,
    end_time: endTime.toISOString(),
    minimal_response: '1',
    no_attributes: '1',
  });

  try {
    const response = await hass.callApi<HistoryApiState[][]>(
      'GET',
      `history/period/${startTime.toISOString()}?${query.toString()}`,
    );
    return reduceHistorySamples(parseHistorySamples(response), maxSamples);
  } catch {
    return [];
  }
}

export function parseHistorySamples(response: HistoryApiState[][]): TemperatureHistorySample[] {
  return response
    .flat()
    .map((item) => {
      const value = readTemperatureValue(item.state);
      const timestampSource = item.last_changed ?? item.last_updated;
      const timestamp = timestampSource ? Date.parse(timestampSource) : Number.NaN;

      if (value === undefined || !Number.isFinite(timestamp)) {
        return undefined;
      }

      return {
        timestamp,
        value,
      };
    })
    .filter((sample): sample is TemperatureHistorySample => sample !== undefined);
}

export function reduceHistorySamples(
  samples: readonly TemperatureHistorySample[],
  maxSamples: number,
): TemperatureHistorySample[] {
  if (samples.length <= maxSamples) {
    return [...samples];
  }

  const stride = Math.ceil(samples.length / maxSamples);
  return samples.filter((_, index) => index % stride === 0).slice(0, maxSamples);
}
