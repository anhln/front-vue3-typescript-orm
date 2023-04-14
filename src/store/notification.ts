import { defineStore } from "pinia";

export type NotificationType = "success" | "warning" | "error";

export interface Notification {
  message: string;
  type: NotificationType;
}

export const useNotificationStore = defineStore({
  id: "notification",
  state: () => ({
    notification: null as Notification | null,
    timeoutId: 0,
  }),
  actions: {
    set(notification: Notification, delay: number = 5000) {
      this.clear();
      this.notification = notification;
      this.timeoutId = setTimeout(() => {
        this.notification = null;
        this.timeoutId = 0;
      }, delay);
    },
    clear() {
      clearTimeout(this.timeoutId);
      this.notification = null;
      this.timeoutId = 0;
    },
  },
});
