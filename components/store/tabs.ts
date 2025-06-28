import { create } from "zustand";

interface TabStore {
  currentTab: string;
  selectedBlogId: string | null;
  setTab: (tab: string, blogId?: string) => void;
}

const useTabStore = create<TabStore>((set) => ({
  currentTab: "blogs",
  selectedBlogId: null,
  setTab: (tab, blogId) =>
    set({ currentTab: tab, selectedBlogId: blogId || null }),
}));

export default useTabStore;
