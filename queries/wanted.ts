import { useInfiniteQuery } from '@tanstack/react-query';

interface BonusCharacteristics {
  lifePoints: number;
  strength: number;
  wisdom: number;
  chance: number;
  agility: number;
  intelligence: number;
  earthResistance: number;
  fireResistance: number;
  waterResistance: number;
  airResistance: number;
  neutralResistance: number;
  // ... autres bonus si nécessaire
}

interface Grade {
  grade: number;
  level: number;
  lifePoints: number;
  actionPoints: number;
  movementPoints: number;
  wisdom: number;
  earthResistance: number;
  airResistance: number;
  fireResistance: number;
  waterResistance: number;
  neutralResistance: number;
  strength: number;
  intelligence: number;
  chance: number;
  agility: number;
  bonusCharacteristics: BonusCharacteristics;
  // ... autres propriétés si nécessaire
}

interface MonsterName {
  fr: string;
  en: string;
  es: string;
  de: string;
  pt: string;
}

export interface Monster {
  _id: string;
  id: number;
  name: MonsterName;
  grades: Grade[];
  img: string;
  level?: number; // Calculé à partir des grades
  // ... autres propriétés si nécessaire
}

interface ApiResponse {
  total: number;
  limit: number;
  skip: number;
  data: Monster[];
}

const LIMIT = 20;
const WANTED_RACES = [32, 147, 127, 90] as const;

interface SearchParams {
  races?: typeof WANTED_RACES[number][];
  maxLevel?: number;
  sortOrder?: 'asc' | 'desc';
}

const buildQueryString = (params: SearchParams, skip: number): string => {
  const queryParams = new URLSearchParams();

  // Paramètre de tri
  queryParams.append(
    '$sort[grades.0.level]',
    params.sortOrder === 'desc' ? '-1' : '1'
  );

  // Autres paramètres
  queryParams.append('$limit', LIMIT.toString());
  queryParams.append('$populate', 'false');
  queryParams.append('$skip', skip.toString());
  queryParams.append('lang', 'fr');

  // Filtre des races
  const races = params.races || WANTED_RACES;
  races.forEach(race => {
    queryParams.append('race[$in][]', race.toString());
  });
  // Filtre de niveau maximum
  if (params.maxLevel) {
    queryParams.append('grades.0.level[$lte]', params.maxLevel.toString());
  }

  return queryParams.toString();
};

const fetchWanted = async ({
                             pageParam,
                             searchParams,
                           }: {
  pageParam: number;
  searchParams: SearchParams;
}): Promise<ApiResponse> => {
  const queryString = buildQueryString(searchParams, pageParam);
  const response = await fetch(
    `https://api.dofusdb.fr/monsters?${queryString}`
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useWanted = (searchParams: SearchParams = {}) => {
  return useInfiniteQuery({
    queryKey: ['Wanted', searchParams],
    queryFn: (context) => fetchWanted({
      pageParam: context.pageParam,
      searchParams
    }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.length < LIMIT) return undefined;
      return pages.length * LIMIT;
    },
    initialPageParam: 0,
  });
};