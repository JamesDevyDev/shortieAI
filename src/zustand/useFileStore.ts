import { create } from 'zustand'

interface FileStore {
    currentFile: any,
    setCurrentFile: (file: any) => Promise<void>

}

const useFileStore = create<FileStore>((set, get) => ({
    currentFile: '',
    setCurrentFile: async (file: any) => { set({ currentFile: file }) }
}))

export default useFileStore