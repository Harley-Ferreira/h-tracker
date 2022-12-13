import { NOTIFY } from './../store/mutatios-type';
import { NotificationType } from "@/interfaces/INotification"
import { store } from "@/store"

type Notifier = {
    notify: (type: NotificationType, title: string, text: string) => void
}

export default () : Notifier => {
    const notify = (type: NotificationType, title: string, text: string) : void => {
        store.commit(NOTIFY, {
            title, text, type,
        })
    }

    return {
        notify
    }
}
