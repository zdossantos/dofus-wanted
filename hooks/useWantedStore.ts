// stores/wanted-store.ts
import { create } from 'zustand'
import { SelectWanted } from '@/lib/db'

interface WantedStore {
	selectedWanted: SelectWanted | null
	setSelectedWanted: (wanted: SelectWanted | null) => void
}

export const useWantedStore = create<WantedStore>((set) => ({
	selectedWanted: null,
	setSelectedWanted: (wanted) => set({ selectedWanted: wanted }),
}))