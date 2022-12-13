import { store } from '@/store';
import { NotificationType } from "@/interfaces/INotification"
import { NOTIFY } from "@/store/mutatios-type"

export const notifyMixin = {
    methods: {
        notify (type: NotificationType, title: string, text: string) {
            store.commit(NOTIFY, {
                title, text, type,
            })
          }
    },
}